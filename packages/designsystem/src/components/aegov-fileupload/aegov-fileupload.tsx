import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Method, Watch, Listen, forceUpdate } from '@stencil/core';
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
import { HostAria } from '../../utils/host-aria';
import {
  buildValidationDetail, synthesizeValidity,
  withCustomError, setInternalsValidity, syncHostDisabled, composeDescribedBy,
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
    selectedFile: (name: string) => `Selected: ${name}`,
    allowed: (list: string) => `Allowed: ${list}`,
    images: 'Images',
    videos: 'Videos',
    audio: 'Audio',
    pdf: 'PDF',
    browse: 'Browse',
    chooseFile: 'Choose File',
    chooseFiles: 'Choose Files',
    browseFiles: 'Browse Files',
    nameSeparator: ', ',
    remove: (name: string) => `Remove ${name}`,
    filesAdded: (names: string[]) => `${names.join(', ')} added (${names.length} ${names.length === 1 ? 'file' : 'files'})`,
    fileRemoved: (name: string) => `${name} removed`,
    filesNotAdded: (names: string[], max: number) => `${names.join(', ')} not added: maximum ${max} ${max === 1 ? 'file' : 'files'}.`,
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
    selectedFile: (name: string) => `الملف المختار: ${name}`,
    allowed: (list: string) => `المسموح به: ${list}`,
    images: 'صور',
    videos: 'فيديوهات',
    audio: 'صوت',
    pdf: 'PDF',
    browse: 'تصفح',
    chooseFile: 'اختر ملفاً',
    chooseFiles: 'اختر ملفات',
    browseFiles: 'تصفح الملفات',
    nameSeparator: '، ',
    remove: (name: string) => `إزالة ${name}`,
    filesAdded: (names: string[]) => `تمت إضافة ${names.join('، ')} (${names.length === 1 ? 'ملف واحد' : `${names.length} ملفات`})`,
    fileRemoved: (name: string) => `تمت إزالة ${name}`,
    filesNotAdded: (names: string[], max: number) => `لم تتم إضافة ${names.join('، ')}: الحد الأقصى ${max === 1 ? 'ملف واحد' : `${max} ملفات`}.`,
    dragAndDrop: (multiple: boolean) => `اسحب وأفلت ${multiple ? 'الملفات' : 'الملف'} هنا، أو`,
    sizeUnits: ['بايت', 'ك.ب', 'م.ب', 'ج.ب'] as const,
    zeroBytes: '0 بايت',
  },
};

const TAG = 'aegov-fileupload';
const ctx = (prop: string) => ({ component: TAG, prop });
const normalizeText = (text?: string | null) => (text ?? '').replace(/\s+/g, ' ').trim();

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

  /** Colour family. Drives idle ring/border, selected/checked fill, and value/accent text. Focus ring follows the variant's support colour (camel for primary, desert for secondary, seablue for neutral-max/neutral-min); error stays aered regardless. */
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
   * Text of the polite status region: which files were just added or removed
   * (WCAG 4.1.3, DS-A11Y-fileupload-06). Focus stays where it is; screen
   * readers hear the change without the list having to be re-read.
   */
  @State() private fileStatus: string = '';

  /**
   * Visible note when files beyond max-files were not added. The files that
   * were kept are a valid selection, so this is information, not an error
   * (DS-A11Y-fileupload-11): before, the field stayed invalid and blocked the
   * form until the user removed a file.
   */
  @State() private fileNotice: string = '';
  private fileStatusTimer?: ReturnType<typeof setTimeout>;

  /** Empties the region first so the same text (e.g. adding the same file twice) is announced again. */
  private announceFiles(message: string) {
    clearTimeout(this.fileStatusTimer);
    this.fileStatus = '';
    this.fileStatusTimer = setTimeout(() => { this.fileStatus = message; }, 100);
  }

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
  private requiredId: string = '';
  private labelId: string = '';
  private browseId: string = '';

  /**
   * Bumped when the host's aria-label / aria-labelledby changes (aegov-form-field
   * sets aria-label with setAttribute, which does not re-render this component),
   * so the group and the trigger button pick up the new name.
   */
  @State() private hostNameVersion: number = 0;
  private hostNameObserver?: MutationObserver;

  private get t() {
    return isRtl(this.el) ? STRINGS.ar : STRINGS.en;
  }

  componentWillLoad() {
    if (this.isDisabled) syncHostDisabled(this.el, true);
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
    this.requiredId = `${this.fieldId}-required`;
    this.labelId = `${this.fieldId}-label`;
    this.browseId = `${this.fieldId}-browse`;

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
    this.hostAria?.refreshSoon();
    // Report the initial state (e.g. required and empty) to the form, as otp and
    // datepicker do — otherwise form.checkValidity() passes until the first interaction.
    this.runValidationSync();
  }

  // ── FormAssociated lifecycle ──
  formAssociatedCallback(_form: HTMLFormElement | null) { /* no-op */ }
  formDisabledCallback(disabled: boolean) { this.formDisabled = disabled; }

  /**
   * True while an ancestor `<fieldset disabled>` or the host's `disabled`
   * attribute disables the field. Kept apart from `isDisabled` so that
   * re-enabling the fieldset doesn't clear the field's own setting.
   */
  @State() private formDisabled: boolean = false;

  /** Disabled by its own `isDisabled` or by the form. */
  private get disabled(): boolean {
    return this.isDisabled || this.formDisabled;
  }

  /** Leave FormData and constraint validation while disabled, like a native control. */
  @Watch('isDisabled')
  onIsDisabledChange() {
    syncHostDisabled(this.el, this.isDisabled);
  }

  formResetCallback() {
    this.selectedFiles = [];
    this.clearRejection();
    this.errorMessage = '';
    this.isInvalid = false;
    this.customValidityMessage = '';
    if (this.inputEl) this.inputEl.value = '';
    this.runValidationSync();
  }

  /** Host aria-label / aria-labelledby / aria-describedby / labels, resolved for the inner control (DS-A11Y-input-01). */
  private hostAria?: HostAria;

  connectedCallback() {
    this.hostAria ??= new HostAria(this.el, { fieldId: () => this.fieldId, internals: () => this.internals, onChange: () => forceUpdate(this) });
    this.hostAria.connect();
    if (typeof MutationObserver === 'undefined' || this.hostNameObserver) return;
    this.hostNameObserver = new MutationObserver(() => { this.hostNameVersion++; });
    this.hostNameObserver.observe(this.el, { attributes: true, attributeFilter: ['aria-label', 'aria-labelledby', 'aria-describedby'] });
  }

  disconnectedCallback() {
    clearTimeout(this.fileStatusTimer);
    this.hostAria?.disconnect();
    this._sizeWatcher?.destroy();
    this.hostNameObserver?.disconnect();
    this.hostNameObserver = undefined;
  }

  /**
   * The field's label text: the `label` prop, else the host-level name
   * (aria-labelledby, aria-label set by aegov-form-field, <label for>).
   */
  private getFieldLabelText(): string {
    if (this.label?.trim()) return this.label.trim();
    // aria-labelledby, aria-label (aegov-form-field), then <label for> /
    // aegov-label for — the shared resolver in utils/host-aria.
    return this.hostAria?.name() ?? '';
  }

  /**
   * Whether to say "Required" in the control's description. A native file
   * input maps to role button (and the trigger is a button), which don't
   * support aria-required, so the description carries it instead. Skipped
   * while the visible error already says just that.
   */
  private announceRequired(showError: boolean): boolean {
    if (!this.isRequired) return false;
    return !(showError && !this.el.querySelector('[slot="error"]') && normalizeText(this.errorMessage) === this.t.required);
  }

  /** Text of the elements a host idref attribute (aria-labelledby / aria-describedby) points to. */
  private getHostIdrefText(attr: 'aria-labelledby' | 'aria-describedby'): string {
    const ids = this.el.getAttribute(attr)?.trim();
    if (!ids) return '';
    const root = this.el.getRootNode() as Document | ShadowRoot;
    return ids.split(/\s+/)
      .map(id => normalizeText(root.getElementById?.(id)?.textContent))
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Description for the trigger button. It starts with the current selection
   * ("Selected: a.pdf" / "2 files selected"): a native file input exposes that
   * as its value, which a button can't have, so it is read here, both when
   * focus returns from the picker and whenever the user comes back to the
   * button. Then, in the order the default appearance's native input uses:
   * the host's own aria-describedby, "Required", the allowed types, the
   * error, the hint. Those texts sit in this component's shadow root (or the
   * light DOM) and the button in aegov-button's, so aria-describedby can't
   * reach them; the text goes in aria-description, which aegov-button
   * forwards to its inner <button>.
   */
  private getTriggerDescription(showError: boolean, showHint: boolean): string | undefined {
    const slotText = (name: string) => normalizeText(this.el.querySelector(`[slot="${name}"]`)?.textContent);
    const count = this.selectedFiles.length;
    const parts = [
      count === 1 ? this.t.selectedFile(normalizeText(this.selectedFiles[0].name)) : count > 1 ? this.t.filesSelected(count) : '',
      this.getHostIdrefText('aria-describedby'),
      this.announceRequired(showError) ? this.t.required : '',
      normalizeText(this.getHelperText()),
      showError ? (slotText('error') || normalizeText(this.errorMessage)) : '',
      showHint ? (slotText('hint') || normalizeText(this.hint)) : '',
    ].filter(Boolean);
    if (!parts.length) return undefined;
    // Join as sentences so screen readers pause between them, without
    // doubling a full stop the text already ends with.
    return parts.reduce((out, part) => (/[.!?\u061F]$/.test(out) ? `${out} ${part}` : `${out}. ${part}`));
  }

  /**
   * Name for the group around the button / drop zone: the visible label
   * (same shadow root) when there is one, else the field label text.
   */
  private getGroupNameAttrs(): Record<string, string> {
    if (this.label?.trim()) return { 'aria-labelledby': this.labelId };
    const text = this.getFieldLabelText();
    return text ? { 'aria-label': text } : {};
  }

  /**
   * Name for the trigger button: its visible text first (so speech input
   * users can say what they see), then the field label, e.g.
   * "Choose File, Supporting documents". The button lives in aegov-button's
   * own shadow root, so aria-labelledby can't reach it; aegov-button forwards
   * aria-label to its inner <button>.
   */
  private getTriggerName(): string | undefined {
    const text = this.getFieldLabelText();
    return text ? `${this.getDefaultButtonText()}${this.t.nameSeparator}${text}` : undefined;
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
    // Disabled controls are barred from constraint validation, as native ones are.
    if (this.disabled) return { validity: synthesizeValidity({}), message: '' };
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

  /**
   * Where the browser puts focus (and its message) when a form submit finds
   * this field invalid: the visible trigger button in the button / dropzone
   * appearances — never the hidden, aria-hidden input (DS-A11Y-fileupload-04)
   * — and the native input itself in the default appearance, like a native
   * file input.
   */
  private validationAnchor(): HTMLElement | undefined {
    if (this.appearance !== 'default' && this.triggerBtnRef) {
      const inner = this.triggerBtnRef.shadowRoot?.querySelector<HTMLElement>('button');
      if (inner) return inner;
    }
    return this.inputEl;
  }

  private runValidationSync(transientFlags: Partial<AegovValidityState> = {}, transientMessage = '') {
    const { validity, message } = this.computeValidity(transientFlags);
    const finalMessage = transientMessage || message;
    setInternalsValidity(this.internals, validity, finalMessage, this.validationAnchor());
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
    if (!this.disabled && this.inputEl) {
      this.inputEl.click();
    }
  }

  private handleFileChange = () => {
    if (!this.inputEl?.files) return;
    const newFiles = Array.from(this.inputEl.files);
    // A picker can't return "no files" on purpose: an empty change is a
    // cancelled picker (some Chrome builds clear the input and fire change
    // instead of `cancel`). Keep the selection; files are removed only with
    // the remove buttons, clear() or a form reset.
    if (newFiles.length === 0) {
      this.syncNativeFiles();
      return;
    }
    this.processFiles(newFiles);
    // Hold the kept files, not the raw pick (rejected files are dropped).
    this.syncNativeFiles();
  };

  /**
   * Keep the native input's FileList equal to `selectedFiles`.
   *
   * In the default appearance the native input is the focusable control, so
   * screen readers read its value ("cert.png", "2 files", "No file chosen").
   * It used to be emptied right after every pick, so it always said "No file
   * chosen" next to a visible file name. While the file picker is open the
   * input is empty (see `handleNativeClick`), so picking the same file again,
   * e.g. after editing it, still fires `change`. Where DataTransfer can't be
   * constructed (very old browsers, test DOMs) the input is only emptied when
   * nothing is selected.
   */
  /**
   * The picker is about to open: empty the input so any pick fires `change`,
   * even the same path (browsers compare paths, so an edited file re-picked
   * under the same name would otherwise be ignored and its old content kept).
   * `cancel` (or focus returning without a pick) puts the selection back.
   */
  private handleNativeClick = () => {
    if (this.inputEl && !this.disabled) this.inputEl.value = '';
  };

  private handleNativeCancel = () => this.syncNativeFiles();

  /** Stencil's JSX types have no `onCancel` for inputs, so the picker's `cancel` event is wired here. */
  private setInputRef = (el?: HTMLInputElement) => {
    if (el && el !== this.inputEl) el.addEventListener('cancel', this.handleNativeCancel);
    this.inputEl = el;
  };

  private syncNativeFiles() {
    const input = this.inputEl;
    if (!input) return;
    const key = (f: File) => `${f.name}|${f.size}|${f.lastModified}`;
    const current = input.files ? Array.from(input.files) : [];
    if (current.length === this.selectedFiles.length && current.every((f, i) => key(f) === key(this.selectedFiles[i]))) return;
    try {
      const transfer = new DataTransfer();
      this.selectedFiles.forEach(file => transfer.items.add(file));
      input.files = transfer.files;
    } catch {
      if (this.selectedFiles.length === 0) input.value = '';
    }
  }

  private processFiles(newFiles: File[]) {
    this.hasInteractedOnce = true;
    const validFiles: File[] = [];

    let pendingFlag: Partial<AegovValidityState> = {};
    // Every rejected file gets its own reason, one per line; reporting only
    // the last one silently dropped the others (DS-A11Y-fileupload-05).
    const reasons: string[] = [];

    for (const file of newFiles) {
      if (this.accept && !this.isValidFileType(file)) {
        pendingFlag = { ...pendingFlag, typeMismatch: true };
        reasons.push(this.t.notAllowedType(file.name));
        continue;
      }

      if (this.maxFileSize && file.size > this.maxFileSize) {
        pendingFlag = { ...pendingFlag, tooLong: true };
        reasons.push(this.t.exceedsMaxSize(file.name, this.formatFileSize(this.maxFileSize)));
        continue;
      }

      validFiles.push(file);
    }
    let pendingMessage = reasons.join('\n');

    // Files beyond max-files are left out and reported in a notice; the kept
    // selection is valid (DS-A11Y-fileupload-11).
    let notAdded: File[] = [];
    if (this.appearance === 'default') {
      // Default replaces selection each time
      if (this.maxFiles && validFiles.length > this.maxFiles) {
        notAdded = validFiles.slice(this.maxFiles);
        this.selectedFiles = validFiles.slice(0, this.maxFiles);
      } else {
        this.selectedFiles = validFiles;
      }
    } else {
      // Button/Dropzone accumulate files. Picking a file that is already in the
      // list (same name) replaces that entry instead of adding it twice, so a
      // corrected re-pick updates it (DS-A11Y-fileupload-14).
      const sameFile = (a: File, b: File) => a.name === b.name;
      const replaced = this.selectedFiles.map(existing => validFiles.find(file => sameFile(file, existing)) ?? existing);
      const added = validFiles.filter(file => !this.selectedFiles.some(existing => sameFile(file, existing)));
      const combined = [...replaced, ...added];

      if (this.maxFiles && combined.length > this.maxFiles) {
        notAdded = combined.slice(this.maxFiles);
        this.selectedFiles = combined.slice(0, this.maxFiles);
      } else {
        this.selectedFiles = combined;
      }
    }
    this.fileNotice = notAdded.length && this.maxFiles ? this.t.filesNotAdded(notAdded.map(file => file.name), this.maxFiles) : '';

    this.rejection = Object.keys(pendingFlag).length > 0 ? { flags: pendingFlag, message: pendingMessage } : null;
    // Only files that actually made it into the list; rejections are announced by the error alert.
    const added = this.selectedFiles.filter(file => validFiles.includes(file));
    const announcement = [added.length ? this.t.filesAdded(added.map(file => file.name)) : '', this.fileNotice].filter(Boolean).join('. ');
    if (announcement) this.announceFiles(announcement);
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
    this.fileNotice = '';
    if (removed) this.announceFiles(this.t.fileRemoved(removed.name));
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
    // Constraint props (isRequired, …) changed after load must reach the form too.
    this.runValidationSync();
    // Covers every change to selectedFiles (pick, drop, remove, clear, reset)
    // and a native input re-created by an appearance change.
    this.syncNativeFiles();
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
    if (!this.disabled) {
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
    if (this.disabled || !e.dataTransfer?.files) return;

    const files = Array.from(e.dataTransfer.files);
    const filesToProcess = this.isMultiple ? files : [files[0]];
    this.processFiles(filesToProcess);
  };

  // --- Render helpers ---

  private renderLabel() {
    if (!this.label) return null;
    return (
      <label id={this.labelId} class="fileupload__label" {...{ for: this.fieldId }}>
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

  /**
   * Default appearance: the field shows a "Browse" button (an aria-hidden span),
   * so the input's name must contain that word too, after the label, e.g.
   * "Passport bio-data page Browse" (WCAG 2.5.3, DS-A11Y-fileupload-08) —
   * speech-input users can then say "click Browse". aria-labelledby may point
   * at the hidden span; both live in this shadow root.
   */
  private getDefaultInputNameAttrs(passThroughAttrs: Record<string, string | boolean>): Record<string, string> {
    const labelledBy = passThroughAttrs['aria-labelledby'];
    if (typeof labelledBy === 'string' && labelledBy.trim()) return { 'aria-labelledby': `${labelledBy} ${this.browseId}` };
    const label = passThroughAttrs['aria-label'];
    if (typeof label === 'string' && label.trim()) return { 'aria-label': `${label}${this.t.nameSeparator}${this.getDefaultButtonText()}` };
    if (this.label?.trim()) return { 'aria-labelledby': `${this.labelId} ${this.browseId}` };
    return {};
  }

  private renderDefault(passThroughAttrs: Record<string, string | boolean>, showError: boolean, showHint: boolean) {
    const helperText = this.getHelperText();
    const describedBy = composeDescribedBy(
      this.hostAria?.descriptionId(),
      this.announceRequired(showError) ? this.requiredId : null,
      helperText ? `${this.fieldId}-helper` : null,
      showError ? this.errorId : null,
      showHint ? this.hintId : null,
    );
    return (
      <div class="fileupload__input-wrapper" onClick={(e) => { if (e.target !== this.inputEl) this.triggerFileDialog(); }}>
        <input
          type="file"
          ref={this.setInputRef}
          {...passThroughAttrs}
          {...this.getDefaultInputNameAttrs(passThroughAttrs)}
          id={this.fieldId}
          name={this.name}
          accept={this.accept}
          multiple={this.isMultiple}
          disabled={this.disabled}
          class="fileupload__native-input"
          onChange={this.handleFileChange}
          onClick={this.handleNativeClick}
          onFocus={this.handleNativeCancel}
          aria-invalid={this.isInvalid ? 'true' : undefined}
          aria-describedby={describedBy}
        />
        <span class={`fileupload__filename ${this.selectedFiles.length === 0 ? 'fileupload__filename--empty' : ''}`}>
          {this.getDisplayText()}
        </span>
        <span id={this.browseId} class="fileupload__browse-btn" aria-hidden="true">
          {this.getDefaultButtonText()}
        </span>
      </div>
    );
  }

  private renderButton(passThroughAttrs: Record<string, string | boolean>, showError: boolean, showHint: boolean) {
    const description = this.getTriggerDescription(showError, showHint);
    return (
      <div
        role="group"
        {...this.getGroupNameAttrs()}
        class="fileupload__btn-group"
      >
        <aegov-button
          class="fileupload__trigger-btn"
          ref={(el) => (this.triggerBtnRef = el as HTMLElement)}
          variant={this.variant}
          size={this._resolvedSize}
          appearance="solid"
          is-disabled={this.disabled}
          aria-label={this.getTriggerName()}
          aria-description={description}
          aria-invalid={this.isInvalid ? 'true' : undefined}
          onClick={() => this.triggerFileDialog()}
        >
          {this.renderBtnUploadIcon()}
          {this.getDefaultButtonText()}
        </aegov-button>
        {this.renderFileList()}
        {/* After the trigger, so focusing the field (label click, delegatesFocus) lands on the button. */}
        <input
          type="file"
          ref={this.setInputRef}
          {...passThroughAttrs}
          id={this.fieldId}
          name={this.name}
          accept={this.accept}
          multiple={this.isMultiple}
          disabled={this.disabled}
          class="fileupload__hidden-input"
          onChange={this.handleFileChange}
          onClick={this.handleNativeClick}
          onFocus={this.handleNativeCancel}
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
    );
  }

  private renderDropzone(passThroughAttrs: Record<string, string | boolean>, showError: boolean, showHint: boolean) {
    const dropzoneClasses = [
      'fileupload__dropzone',
      this.isDragOver ? 'fileupload__dropzone--dragover' : '',
    ].filter(Boolean).join(' ');
    const description = this.getTriggerDescription(showError, showHint);

    return [
      <div
        role="group"
        {...this.getGroupNameAttrs()}
        class={dropzoneClasses}
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
            is-disabled={this.disabled}
            aria-label={this.getTriggerName()}
            aria-description={description}
            aria-invalid={this.isInvalid ? 'true' : undefined}
            onClick={() => this.triggerFileDialog()}
          >
            {this.getDefaultButtonText()}
          </aegov-button>
        </div>
        {this.renderFileList()}
      </div>,
      // After the drop zone, so focusing the field lands on its button.
      <input
        type="file"
        ref={this.setInputRef}
        {...passThroughAttrs}
        id={this.fieldId}
        name={this.name}
        accept={this.accept}
        multiple={this.isMultiple}
        disabled={this.disabled}
        class="fileupload__hidden-input"
        onChange={this.handleFileChange}
        onClick={this.handleNativeClick}
        onFocus={this.handleNativeCancel}
        tabIndex={-1}
        aria-hidden="true"
      />,
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
      this.disabled ? 'fileupload--disabled' : '',
    ].filter(Boolean).join(' ');
    const passThroughAttrs = this.hostAria ? this.hostAria.bridge(getPassThroughAttributes(this.el, AegovFileupload.PASS_THROUGH_ATTRS)) : getPassThroughAttributes(this.el, AegovFileupload.PASS_THROUGH_ATTRS);
    delete passThroughAttrs['aria-invalid'];
    delete passThroughAttrs['aria-describedby'];

    const hasErrorSlot = !!this.el.querySelector('[slot="error"]');
    const hasHintSlot = !!this.el.querySelector('[slot="hint"]');
    const showError = this.isInvalid && (hasErrorSlot || !!this.errorMessage);
    // The hint (e.g. the accepted types and limits) stays visible while an
    // error shows: that is exactly when it is needed (DS-A11Y-fileupload-11,
    // same as aegov-input DS-A11Y-input-08). The description reads error, then hint.
    const showHint = hasHintSlot || !!this.hint;
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
          {/* Referenced by the native input's aria-describedby; the full stop makes screen readers pause before the next text. */}
          {this.isRequired && <span id={this.requiredId} hidden>{`${this.t.required}.`}</span>}
          {appearance === 'default' && this.renderDefault(passThroughAttrs, showError, showHint)}
          {appearance === 'button' && this.renderButton(passThroughAttrs, showError, showHint)}
          {appearance === 'dropzone' && this.renderDropzone(passThroughAttrs, showError, showHint)}
          {this.renderHint(showHint, hasHintSlot)}
          {this.renderHelperText()}
          {this.fileNotice && <p class="fileupload__notice">{this.fileNotice}</p>}
          {errorRegion}
          <span
            class="fileupload__status"
            role="status"
            aria-live="polite"
            aria-atomic="true"
            style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}
          >
            {this.fileStatus}
          </span>
        </div>
        {this.hostAria?.renderDescription()}
      </Host>
    );
  }
}
