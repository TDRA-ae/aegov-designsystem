import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Method, Watch, Listen } from '@stencil/core';
import { FILEUPLOAD_VARIANTS, FILEUPLOAD_SIZES, FORM_VARIANTS } from '../../utils/types';
import type {
  FileuploadVariant, FileuploadSize, FormVariant,
  AegovValidationDetail, AegovValidationResult, AegovValidationTrigger,
  AegovValidityState,
} from '../../utils/types';
import { generateId } from '../../utils/id-generator';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import { getPassThroughAttributes } from '../../utils/attributes';
import {
  buildValidationDetail, synthesizeValidity,
  withCustomError, setInternalsValidity, composeDescribedBy,
} from '../../utils/validation';
import type { InternalsHost } from '../../utils/validation';
import { isRtl } from '../../utils/rtl';
import { resolveFocusTarget } from '../../utils/focus-management';

const STRINGS = {
  en: {
    required: 'Required',
    invalidFile: 'Invalid file',
    notAllowedType: (name: string) => `File "${name}" is not an allowed type.`,
    exceedsMaxSize: (name: string, size: string) => `File "${name}" exceeds the maximum size of ${size}.`,
    maxFiles: (n: number) => `Maximum ${n} file${n > 1 ? 's' : ''} allowed.`,
    noFileChosen: 'No file chosen',
    filesSelected: (n: number) => `${n} files selected`,
    allowed: (list: string) => `Allowed: ${list}`,
    images: 'Images',
    videos: 'Videos',
    audio: 'Audio',
    pdf: 'PDF',
    browse: 'Browse',
    chooseFile: 'Choose File',
    chooseFiles: 'Choose Files',
    browseFiles: 'Browse Files',
    remove: (name: string) => `Remove ${name}`,
    dragAndDrop: (multiple: boolean) => `Drag and drop ${multiple ? 'files' : 'a file'} here, or`,
    sizeUnits: ['B', 'KB', 'MB', 'GB'] as const,
    zeroBytes: '0 B',
  },
  ar: {
    required: 'مطلوب',
    invalidFile: 'ملف غير صالح',
    notAllowedType: (name: string) => `الملف "${name}" ليس من النوع المسموح به.`,
    exceedsMaxSize: (name: string, size: string) => `الملف "${name}" يتجاوز الحجم الأقصى ${size}.`,
    maxFiles: (n: number) => `الحد الأقصى ${n} ${n > 1 ? 'ملفات' : 'ملف'} مسموح به.`,
    noFileChosen: 'لم يتم اختيار ملف',
    filesSelected: (n: number) => `تم اختيار ${n} ملفات`,
    allowed: (list: string) => `المسموح به: ${list}`,
    images: 'صور',
    videos: 'فيديوهات',
    audio: 'صوت',
    pdf: 'PDF',
    browse: 'تصفح',
    chooseFile: 'اختر ملفاً',
    chooseFiles: 'اختر ملفات',
    browseFiles: 'تصفح الملفات',
    remove: (name: string) => `إزالة ${name}`,
    dragAndDrop: (multiple: boolean) => `اسحب وأفلت ${multiple ? 'الملفات' : 'الملف'} هنا، أو`,
    sizeUnits: ['بايت', 'ك.ب', 'م.ب', 'ج.ب'] as const,
    zeroBytes: '0 بايت',
  },
};

const TAG = 'aegov-fileupload';
const ctx = (prop: string) => ({ component: TAG, prop });

@Component({
  tag: 'aegov-fileupload',
  styleUrl: 'aegov-fileupload.css',
  formAssociated: true, // §2.5: appearance abstraction needs ElementInternals to participate in <form>
  shadow: { delegatesFocus: true },
})
export class AegovFileupload {
  @Element() el!: HTMLElement;
  private inputEl?: HTMLInputElement;
  /** The visible upload trigger for the 'button'/'dropzone' appearances (the native
   * input is hidden/aria-hidden there) — focus fallback target once the file list
   * empties out, alongside `inputEl` for the 'default' appearance. */
  private triggerBtnRef?: HTMLElement;
  /** Remove-button refs for the current render, indexed to match `selectedFiles`. */
  private removeButtonRefs: HTMLButtonElement[] = [];

  /** Native file-input attributes to pass through to the inner `<input type="file">`. */
  private static readonly PASS_THROUGH_ATTRS = new Set([
    'capture', 'autofocus', 'form', 'tabindex', 'title', 'webkitdirectory',
  ]);

  /**
   * Unique field ID. Auto-generated if not provided.
   */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /**
   * Variant style: 'default' (styled input + button), 'button' (hidden input, label-as-button),
   * or 'dropzone' (drag-and-drop area).
   */
  @Prop() appearance: FileuploadVariant = 'default';

  /**
   * Component size.
   */
  @Prop() size: string = 'base';
  @State() private _resolvedSize: FileuploadSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /** Colour family. Drives idle ring/border, selected/checked fill, and value/accent text. Focus ring stays camel; error stays aered regardless. */
  @Prop() variant?: FormVariant;

  /**
   * Allow multiple file selection.
   */
  @Prop() isMultiple: boolean = false;

  /**
   * Accepted file types (e.g. ".pdf,.jpg,image/*").
   */
  @Prop() accept?: string;

  /**
   * Maximum file size in bytes.
   */
  @Prop() maxFileSize?: number;

  /**
   * Maximum number of files (multiple mode only). No limit by default.
   */
  @Prop() maxFiles?: number;

  /**
   * Disables the file upload.
   */
  @Prop({ mutable: true, reflect: true }) isDisabled: boolean = false;

  /**
   * Marks the field as required.
   */
  @Prop() isRequired: boolean = false;

  /** Visual + a11y invalid state. See §2.3. */
  @Prop({ mutable: true, reflect: true }) isInvalid: boolean = false;

  /** Inline error message. Use `error` slot for rich markup. */
  @Prop({ mutable: true }) errorMessage: string = '';

  /**
   * Form field name.
   */
  @Prop({ reflect: true }) name?: string;

  /**
   * Label text displayed above the control.
   */
  @Prop() label?: string;

  /**
   * Helper hint text displayed below the label. Renamed from `description` per §6.6
   * (pre-production rename, no compat shim). Hidden when an error is shown.
   */
  @Prop() hint?: string;

  /**
   * Custom helper text for allowed file types. Overrides auto-generated text from `accept`.
   * Shown alongside the hint, distinct from validation error text.
   */
  @Prop() labelHelp?: string;

  /**
   * Custom text for the browse/trigger button.
   */
  @Prop() labelButton?: string;

  @State() selectedFiles: File[] = [];
  @State() isDragOver: boolean = false;

  /**
   * Emitted when the file selection changes.
   */
  @Event() aegovFileuploadChange!: EventEmitter<{ files: File[] }>;

  /**
   * Emitted when a file is removed from the list (button/dropzone appearances).
   */
  @Event() aegovFileuploadRemove!: EventEmitter<{ file: File; remaining: File[] }>;

  // §6.6: aegovFileuploadError REMOVED — use aegovValidate with mapped validity flags
  // (tooLong = max-size, typeMismatch = invalid-type, customError = max-files).

  /** Unified validation event. See §2.3. */
  @Event() aegovValidate!: EventEmitter<AegovValidationDetail<File[]>>;

  @State() private hasInteractedOnce: boolean = false;

  private internals: ElementInternals | null = null;
  private errorId: string = '';
  private hintId: string = '';

  private get t() {
    return isRtl(this.el) ? STRINGS.ar : STRINGS.en;
  }

  componentWillLoad() {
    warnIfInvalidEnumProp(this.appearance, FILEUPLOAD_VARIANTS, 'default', ctx('appearance'));
    warnIfInvalidEnumProp(this.variant, FORM_VARIANTS, 'primary', ctx('variant'));
    this._sizeWatcher = watchResponsiveProp(this.size, FILEUPLOAD_SIZES, 'base', v => {
      this._resolvedSize = v as FileuploadSize;
    });
    this._resolvedSize = this._sizeWatcher.current as FileuploadSize;
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-fileupload');
    }
    this.errorId = `${this.fieldId}-error`;
    this.hintId = `${this.fieldId}-hint`;

    // Manual attachInternals per §6.8 fallback
    const host = this.el as unknown as InternalsHost;
    if (typeof host.attachInternals === 'function') {
      try {
        this.internals = host.attachInternals();
      } catch {
        this.internals = null;
      }
    }
  }

  componentDidLoad() {
    // Report the initial state (e.g. required and empty) to the form, as otp and
    // datepicker do — otherwise form.checkValidity() passes until the first interaction.
    this.runValidationSync();
  }

  // ── FormAssociated lifecycle ──
  formAssociatedCallback(_form: HTMLFormElement | null) { /* no-op */ }
  formDisabledCallback(disabled: boolean) { this.isDisabled = disabled; }
  formResetCallback() {
    this.selectedFiles = [];
    this.clearRejection();
    if (this.inputEl) this.inputEl.value = '';
    this.runValidationSync();
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  @Watch('appearance')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, FILEUPLOAD_VARIANTS, 'default', ctx('appearance')); }

  @Watch('variant')
  onColourVariantChange(v: unknown) { warnIfInvalidEnumProp(v, FORM_VARIANTS, 'primary', ctx('variant')); }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, FILEUPLOAD_SIZES, 'base', v => {
      this._resolvedSize = v as FileuploadSize;
    });
    this._resolvedSize = this._sizeWatcher.current as FileuploadSize;
  }

  /**
   * Returns the currently selected files.
   */
  @Method()
  async getFiles(): Promise<File[]> {
    return [...this.selectedFiles];
  }

  /**
   * Clears all selected files.
   */
  @Method()
  async clear(): Promise<void> {
    this.selectedFiles = [];
    this.clearRejection();
    if (this.inputEl) {
      this.inputEl.value = '';
    }
    this.runValidationSync();
  }

  /** The form found this field invalid during a submit or checkValidity() — start announcing errors. */
  @Listen('invalid')
  onInvalid() {
    this.hasInteractedOnce = true;
  }

  /** Imperatively re-run validation. */
  @Method()
  async validate(trigger: AegovValidationTrigger = 'manual'): Promise<AegovValidationResult> {
    if (trigger === 'submit') this.hasInteractedOnce = true;
    return this.runAndEmitValidation(trigger);
  }

  /** Mirror of HTMLInputElement.setCustomValidity(). */
  @Method()
  async setCustomValidity(message: string): Promise<void> {
    this.errorMessage = message;
    this.isInvalid = !!message;
    this.customValidityMessage = message;
    if (this.internals) {
      if (message) {
        setInternalsValidity(
          this.internals,
          synthesizeValidity({ customError: true }),
          message,
          this.inputEl,
        );
      } else {
        setInternalsValidity(this.internals, { valid: true }, '');
      }
    }
  }

  /** Message from setCustomValidity(), kept so recomputing validity does not drop it. */
  private customValidityMessage = '';

  /**
   * Why the last selection was (partly) rejected — wrong type, too large, too
   * many files. Kept for as long as its message is shown (until the next
   * selection, a removal, clear() or reset), so validate() and the form agree
   * with what the user sees instead of reporting valid on the next blur.
   */
  private rejection: { flags: Partial<AegovValidityState>; message: string } | null = null;

  /** Drop the rejection and, if its message is what's showing, the message too. */
  private clearRejection() {
    if (this.rejection && this.errorMessage === this.rejection.message) {
      this.isInvalid = false;
      this.errorMessage = '';
    }
    this.rejection = null;
  }

  private computeValidity(transientFlags: Partial<AegovValidityState> = {}): { validity: AegovValidityState; message: string } {
    return withCustomError(this.computeConstraintValidity(transientFlags), this.customValidityMessage);
  }

  private computeConstraintValidity(transientFlags: Partial<AegovValidityState>): { validity: AegovValidityState; message: string } {
    const flags = { ...(this.rejection?.flags ?? {}), ...transientFlags };
    if (this.isRequired && this.selectedFiles.length === 0) {
      return { validity: synthesizeValidity({ valueMissing: true, ...flags }), message: this.errorMessage || this.t.required };
    }
    if (Object.keys(flags).length > 0) {
      return { validity: synthesizeValidity(flags), message: this.errorMessage || this.rejection?.message || this.t.invalidFile };
    }
    return { validity: synthesizeValidity({}), message: '' };
  }

  private runValidationSync(transientFlags: Partial<AegovValidityState> = {}, transientMessage = '') {
    const { validity, message } = this.computeValidity(transientFlags);
    const finalMessage = transientMessage || message;
    setInternalsValidity(this.internals, validity, finalMessage, this.inputEl);
    try {
      if (this.internals && typeof this.internals.setFormValue === 'function') {
        // Build FormData payload — one entry per file (gap §7.3 canonical form)
        const fd = new FormData();
        if (this.name) {
          for (const f of this.selectedFiles) fd.append(this.name, f);
        }
        this.internals.setFormValue(fd);
      }
    } catch {
      // jsdom mock — ignore
    }
  }

  private async runAndEmitValidation(trigger: AegovValidationTrigger): Promise<AegovValidationResult> {
    this.runValidationSync();
    const { validity, message } = this.computeValidity();
    this.aegovValidate.emit(buildValidationDetail<File[]>(
      this.el as unknown as HTMLElement & { name?: string },
      [...this.selectedFiles], validity, message, this.errorMessage || null, trigger,
    ));
    return { valid: validity.valid, message, validity };
  }

  private emitValidateChange(transientFlags: Partial<AegovValidityState> = {}, transientMessage = '') {
    const { validity, message } = this.computeValidity(transientFlags);
    const finalMessage = transientMessage || message;
    this.aegovValidate.emit(buildValidationDetail<File[]>(
      this.el as unknown as HTMLElement & { name?: string },
      [...this.selectedFiles], validity, finalMessage, this.errorMessage || null, 'change',
    ));
  }

  private triggerFileDialog() {
    if (!this.isDisabled && this.inputEl) {
      this.inputEl.click();
    }
  }

  private handleFileChange = () => {
    if (!this.inputEl?.files) return;
    const newFiles = Array.from(this.inputEl.files);
    this.processFiles(newFiles);
    // Reset so same file can be re-selected
    this.inputEl.value = '';
  };

  private processFiles(newFiles: File[]) {
    this.hasInteractedOnce = true;
    const validFiles: File[] = [];

    let pendingFlag: Partial<AegovValidityState> = {};
    let pendingMessage = '';

    for (const file of newFiles) {
      if (this.accept && !this.isValidFileType(file)) {
        pendingFlag = { typeMismatch: true };
        pendingMessage = this.t.notAllowedType(file.name);
        continue;
      }

      if (this.maxFileSize && file.size > this.maxFileSize) {
        pendingFlag = { tooLong: true };
        pendingMessage = this.t.exceedsMaxSize(file.name, this.formatFileSize(this.maxFileSize));
        continue;
      }

      validFiles.push(file);
    }

    if (this.appearance === 'default') {
      // Default replaces selection each time
      if (this.maxFiles && validFiles.length > this.maxFiles) {
        pendingFlag = { customError: true };
        pendingMessage = this.t.maxFiles(this.maxFiles);
        this.selectedFiles = validFiles.slice(0, this.maxFiles);
      } else {
        this.selectedFiles = validFiles;
      }
    } else {
      // Button/Dropzone accumulate files
      const combined = [...this.selectedFiles, ...validFiles];

      if (this.maxFiles && combined.length > this.maxFiles) {
        pendingFlag = { customError: true };
        pendingMessage = this.t.maxFiles(this.maxFiles);
        const slotsAvailable = this.maxFiles - this.selectedFiles.length;
        if (slotsAvailable > 0) {
          this.selectedFiles = [...this.selectedFiles, ...validFiles.slice(0, slotsAvailable)];
        }
      } else {
        this.selectedFiles = combined;
      }
    }

    this.rejection = Object.keys(pendingFlag).length > 0 ? { flags: pendingFlag, message: pendingMessage } : null;
    this.aegovFileuploadChange.emit({ files: [...this.selectedFiles] });
    // Map all transient validation issues into the unified aegovValidate event (replaces aegovFileuploadError)
    this.runValidationSync(pendingFlag, pendingMessage);
    this.emitValidateChange(pendingFlag, pendingMessage);
    if (Object.keys(pendingFlag).length > 0) {
      this.isInvalid = true;
      if (pendingMessage) this.errorMessage = pendingMessage;
    } else {
      // A fully valid selection must clear any error left over from a
      // previous one (#44) — otherwise a stale message/aria-invalid about a
      // file that's no longer even selected sticks around indefinitely.
      this.isInvalid = false;
      this.errorMessage = '';
    }
  }

  /**
   * Set by `removeFile()`, consumed and cleared by `componentDidRender()` —
   * see that method's doc comment for why a `setTimeout`/rAF can't be used
   * here instead.
   */
  private pendingFocusAfterRemoval: { removedIndex: number; remainingCount: number } | null = null;

  private removeFile(index: number) {
    const removed = this.selectedFiles[index];
    const remaining = this.selectedFiles.filter((_, i) => i !== index);
    this.selectedFiles = remaining;
    this.aegovFileuploadRemove.emit({ file: removed, remaining: [...remaining] });
    this.aegovFileuploadChange.emit({ files: [...remaining] });
    // Same condition as the error-clearing below: once the message goes, so does the flag.
    if (!this.maxFiles || remaining.length <= this.maxFiles) this.rejection = null;
    this.runValidationSync();
    this.emitValidateChange();
    // A "Maximum N files allowed" error (#44) is tied directly to the file
    // count removeFile() just changed — clear it once the new count no
    // longer exceeds the cap, the same symmetry processFiles() now applies
    // on a fully valid selection.
    if (!this.maxFiles || remaining.length <= this.maxFiles) {
      this.isInvalid = false;
      this.errorMessage = '';
    }
    // The removed remove-button's own DOM node is destroyed as part of the
    // re-render this triggers — with no focus management, real keyboard/mouse
    // focus silently falls back to <body> on every single removal. Defer the
    // actual .focus() call to componentDidRender(), once the new DOM (with a
    // possibly-shorter removeButtonRefs array) actually exists.
    this.pendingFocusAfterRemoval = { removedIndex: index, remainingCount: remaining.length };
  }

  /**
   * Stencil schedules the re-render a `@State` mutation triggers via its own
   * internal `requestAnimationFrame`-based queue — there's no guarantee a
   * `setTimeout(fn, 0)` macrotask queued right after the mutation runs AFTER
   * that re-render actually lands in the DOM (confirmed live: it doesn't,
   * reliably landing one frame too early, before `removeButtonRefs` reflects
   * the new, shorter list — silently focusing nothing). `componentDidRender()`
   * is Stencil's own guaranteed-after-DOM-update hook, so performing the
   * actual focus move here (once, via a pending-state flag set by
   * `removeFile()`) lands correctly every time.
   */
  componentDidRender() {
    if (!this.pendingFocusAfterRemoval) return;
    const { removedIndex, remainingCount } = this.pendingFocusAfterRemoval;
    this.pendingFocusAfterRemoval = null;

    if (remainingCount === 0) {
      if (this.triggerBtnRef) {
        resolveFocusTarget(this.triggerBtnRef).focus();
      } else {
        this.inputEl?.focus();
      }
      return;
    }
    // Prefer the item that shifted into the removed slot; otherwise (the
    // removed item was last) the new last item.
    const nextIndex = Math.min(removedIndex, remainingCount - 1);
    this.removeButtonRefs[nextIndex]?.focus();
  }

  private isValidFileType(file: File): boolean {
    if (!this.accept) return true;
    const types = this.accept.split(',').map(t => t.trim().toLowerCase());
    return types.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type);
      }
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.replace('/*', '/'));
      }
      return file.type.toLowerCase() === type;
    });
  }

  private formatFileSize(bytes: number): string {
    const t = this.t;
    if (bytes === 0) return t.zeroBytes;
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + t.sizeUnits[i];
  }

  private getDisplayText(): string {
    if (this.selectedFiles.length === 0) return this.t.noFileChosen;
    if (this.selectedFiles.length === 1) return this.selectedFiles[0].name;
    return this.t.filesSelected(this.selectedFiles.length);
  }

  private getHelperText(): string {
    if (this.labelHelp) return this.labelHelp;
    if (!this.accept) return '';
    const t = this.t;
    const types = this.accept.split(',').map(s => s.trim());
    const labels = types.map(s => {
      if (s.startsWith('.')) return s.substring(1).toUpperCase();
      if (s === 'image/*') return t.images;
      if (s === 'video/*') return t.videos;
      if (s === 'audio/*') return t.audio;
      if (s === 'application/pdf') return t.pdf;
      return s;
    });
    return t.allowed(labels.join(', '));
  }

  private getDefaultButtonText(): string {
    if (this.labelButton) return this.labelButton;
    const t = this.t;
    switch (this.appearance) {
      case 'default': return t.browse;
      case 'button': return this.isMultiple ? t.chooseFiles : t.chooseFile;
      case 'dropzone': return t.browseFiles;
      default: return t.browse;
    }
  }

  // --- Drag and drop ---

  private handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isDisabled) {
      this.isDragOver = true;
    }
  };

  private handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this.isDragOver = false;
  };

  private handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this.isDragOver = false;
    if (this.isDisabled || !e.dataTransfer?.files) return;

    const files = Array.from(e.dataTransfer.files);
    const filesToProcess = this.isMultiple ? files : [files[0]];
    this.processFiles(filesToProcess);
  };

  // --- Render helpers ---

  private renderLabel() {
    if (!this.label) return null;
    return (
      <label class="fileupload__label" {...{ for: this.fieldId }}>
        {this.label}
        {this.isRequired && <span class="fileupload__required" aria-hidden="true"> *</span>}
      </label>
    );
  }

  private renderHint(showHint: boolean, hasHintSlot: boolean) {
    if (!showHint) return null;
    return (
      <p id={this.hintId} class="fileupload__hint">
        {hasHintSlot ? <slot name="hint" /> : this.hint}
      </p>
    );
  }

  private renderHelperText() {
    const text = this.getHelperText();
    if (!text) return null;
    return <p class="fileupload__helper" id={`${this.fieldId}-helper`}>{text}</p>;
  }

  private renderFileIcon() {
    return (
      <svg class="fileupload__file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    );
  }

  private renderRemoveButton(index: number, fileName: string) {
    return (
      <button
        type="button"
        class="fileupload__remove-btn"
        ref={(el) => (this.removeButtonRefs[index] = el as HTMLButtonElement)}
        onClick={() => this.removeFile(index)}
        aria-label={this.t.remove(fileName)}
      >
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
        </svg>
      </button>
    );
  }

  private renderFileList() {
    if (this.selectedFiles.length === 0) return null;
    // Rebuilt fresh every render so a shorter list (after a removal) doesn't
    // retain stale refs to now-destroyed button nodes at the tail end.
    this.removeButtonRefs = [];
    return (
      <ul class="fileupload__file-list" role="list">
        {this.selectedFiles.map((file, index) => (
          <li class="fileupload__file-item" key={`${file.name}-${file.size}-${index}`}>
            {this.renderFileIcon()}
            <span class="fileupload__file-name" title={file.name}>{file.name}</span>
            <span class="fileupload__file-size">{this.formatFileSize(file.size)}</span>
            {this.renderRemoveButton(index, file.name)}
          </li>
        ))}
      </ul>
    );
  }

  private renderUploadIcon() {
    return (
      <svg class="fileupload__drop-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
      </svg>
    );
  }

  private renderBtnUploadIcon() {
    return (
      <svg class="fileupload__btn-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636v8.614Z" />
        <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
      </svg>
    );
  }

  // --- Variant renderers ---

  private renderDefault(passThroughAttrs: Record<string, string | boolean>, showError: boolean, showHint: boolean) {
    const helperText = this.getHelperText();
    const describedBy = composeDescribedBy(
      helperText ? `${this.fieldId}-helper` : null,
      showError ? this.errorId : null,
      showHint ? this.hintId : null,
    );
    return (
      <div class="fileupload__input-wrapper" onClick={() => this.triggerFileDialog()}>
        <input
          type="file"
          ref={(el) => this.inputEl = el as HTMLInputElement}
          {...passThroughAttrs}
          id={this.fieldId}
          name={this.name}
          accept={this.accept}
          multiple={this.isMultiple}
          disabled={this.isDisabled}
          required={this.isRequired}
          class="fileupload__native-input"
          onChange={this.handleFileChange}
          aria-invalid={this.isInvalid ? 'true' : undefined}
          aria-required={this.isRequired ? 'true' : undefined}
          aria-describedby={describedBy}
        />
        <span class={`fileupload__filename ${this.selectedFiles.length === 0 ? 'fileupload__filename--empty' : ''}`}>
          {this.getDisplayText()}
        </span>
        <span class="fileupload__browse-btn" aria-hidden="true">
          {this.getDefaultButtonText()}
        </span>
      </div>
    );
  }

  private renderButton(passThroughAttrs: Record<string, string | boolean>, showError: boolean, showHint: boolean) {
    const describedBy = composeDescribedBy(
      showError ? this.errorId : null,
      showHint ? this.hintId : null,
    );
    return (
      <div
        role="group"
        aria-invalid={this.isInvalid ? 'true' : undefined}
        aria-describedby={describedBy || undefined}
        class="fileupload__btn-group"
      >
        <input
          type="file"
          ref={(el) => this.inputEl = el as HTMLInputElement}
          {...passThroughAttrs}
          id={this.fieldId}
          name={this.name}
          accept={this.accept}
          multiple={this.isMultiple}
          disabled={this.isDisabled}
          required={this.isRequired}
          class="fileupload__hidden-input"
          onChange={this.handleFileChange}
          tabIndex={-1}
          aria-hidden="true"
        />
        <aegov-button
          class="fileupload__trigger-btn"
          ref={(el) => (this.triggerBtnRef = el as HTMLElement)}
          variant={this.variant}
          size={this._resolvedSize}
          appearance="solid"
          is-disabled={this.isDisabled}
          onClick={() => this.triggerFileDialog()}
        >
          {this.renderBtnUploadIcon()}
          {this.getDefaultButtonText()}
        </aegov-button>
        {this.renderFileList()}
      </div>
    );
  }

  private renderDropzone(passThroughAttrs: Record<string, string | boolean>, showError: boolean, showHint: boolean) {
    const dropzoneClasses = [
      'fileupload__dropzone',
      this.isDragOver ? 'fileupload__dropzone--dragover' : '',
    ].filter(Boolean).join(' ');
    const describedBy = composeDescribedBy(
      showError ? this.errorId : null,
      showHint ? this.hintId : null,
    );

    return [
      <input
        type="file"
        ref={(el) => this.inputEl = el as HTMLInputElement}
        {...passThroughAttrs}
        id={this.fieldId}
        name={this.name}
        accept={this.accept}
        multiple={this.isMultiple}
        disabled={this.isDisabled}
        required={this.isRequired}
        class="fileupload__hidden-input"
        onChange={this.handleFileChange}
        tabIndex={-1}
        aria-hidden="true"
      />,
      <div
        role="group"
        class={dropzoneClasses}
        aria-invalid={this.isInvalid ? 'true' : undefined}
        aria-describedby={describedBy || undefined}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
      >
        <div class="fileupload__drop-prompt">
          {this.renderUploadIcon()}
          <p class="fileupload__drop-text">
            {this.t.dragAndDrop(this.isMultiple)}
          </p>
          <aegov-button
            class="fileupload__dropzone-btn"
            ref={(el) => (this.triggerBtnRef = el as HTMLElement)}
            variant={this.variant}
            size={this._resolvedSize}
            appearance="outline"
            is-disabled={this.isDisabled}
            onClick={() => this.triggerFileDialog()}
          >
            {this.getDefaultButtonText()}
          </aegov-button>
        </div>
        {this.renderFileList()}
      </div>,
    ];
  }

  render() {
    const appearance: FileuploadVariant = (FILEUPLOAD_VARIANTS as readonly string[]).includes(this.appearance) ? this.appearance : 'default';
    const variant: FormVariant = (FORM_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'primary';
    const classes = [
      'aegov-fileupload',
      `fileupload--${appearance}`,
      `fileupload--${this._resolvedSize}`,
      `fileupload-variant-${variant}`,
      this.isDisabled ? 'fileupload--disabled' : '',
    ].filter(Boolean).join(' ');
    const passThroughAttrs = getPassThroughAttributes(this.el, AegovFileupload.PASS_THROUGH_ATTRS);
    delete passThroughAttrs['aria-invalid'];
    delete passThroughAttrs['aria-describedby'];

    const hasErrorSlot = !!this.el.querySelector('[slot="error"]');
    const hasHintSlot = !!this.el.querySelector('[slot="hint"]');
    const showError = this.isInvalid && (hasErrorSlot || !!this.errorMessage);
    const showHint = !showError && (hasHintSlot || !!this.hint);
    const announceError = showError && this.hasInteractedOnce;

    const errorRegion = showError ? (
      <div
        id={this.errorId}
        class="aegov-fileupload__error"
        role={announceError ? 'alert' : null}
      >
        {hasErrorSlot ? <slot name="error" /> : this.errorMessage}
      </div>
    ) : null;

    return (
      <Host class={{ 'is-invalid': this.isInvalid }}>
        <div class={classes}>
          {this.renderLabel()}
          {appearance === 'default' && this.renderDefault(passThroughAttrs, showError, showHint)}
          {appearance === 'button' && this.renderButton(passThroughAttrs, showError, showHint)}
          {appearance === 'dropzone' && this.renderDropzone(passThroughAttrs, showError, showHint)}
          {this.renderHint(showHint, hasHintSlot)}
          {this.renderHelperText()}
          {errorRegion}
        </div>
      </Host>
    );
  }
}
