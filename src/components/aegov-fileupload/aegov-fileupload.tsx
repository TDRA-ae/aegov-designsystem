import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Method, Watch } from '@stencil/core';
import { FILEUPLOAD_VARIANTS, FILEUPLOAD_SIZES } from '../../utils/types';
import type { FileuploadVariant, FileuploadSize } from '../../utils/types';
import { generateId } from '../../utils/id-generator';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';

const TAG = 'aegov-fileupload';
const ctx = (prop: string) => ({ component: TAG, prop });

@Component({
  tag: 'aegov-fileupload',
  styleUrl: 'aegov-fileupload.css',
  scoped: false,
})
export class AegovFileupload {
  @Element() el!: HTMLElement;
  private inputEl?: HTMLInputElement;

  /**
   * Unique field ID. Auto-generated if not provided.
   */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /**
   * Variant style: 'default' (styled input + button), 'button' (hidden input, label-as-button),
   * or 'dropzone' (drag-and-drop area).
   */
  @Prop() variant: FileuploadVariant = 'default';

  /**
   * Component size.
   */
  @Prop() size: string = 'base';
  @State() private _resolvedSize: FileuploadSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /**
   * Allow multiple file selection.
   */
  @Prop() multiple: boolean = false;

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
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * Marks the field as required.
   */
  @Prop() required: boolean = false;

  /**
   * Form field name.
   */
  @Prop() name?: string;

  /**
   * Label text displayed above the control.
   */
  @Prop() label?: string;

  /**
   * Description text displayed below the label.
   */
  @Prop() description?: string;

  /**
   * Custom helper text for allowed file types. Overrides auto-generated text from `accept`.
   */
  @Prop() helperText?: string;

  /**
   * Custom text for the browse/trigger button.
   */
  @Prop() buttonText?: string;

  @State() selectedFiles: File[] = [];
  @State() isDragOver: boolean = false;

  /**
   * Emitted when the file selection changes.
   */
  @Event() aegovFileuploadChange!: EventEmitter<{ files: File[] }>;

  /**
   * Emitted when a file is removed from the list (button/dropzone variants).
   */
  @Event() aegovFileuploadRemove!: EventEmitter<{ file: File; remaining: File[] }>;

  /**
   * Emitted when a file fails validation (invalid type, size exceeded, or max files exceeded).
   */
  @Event() aegovFileuploadError!: EventEmitter<{ type: 'max-size' | 'max-files' | 'invalid-type'; file?: File; message: string }>;

  componentWillLoad() {
    warnIfInvalidEnumProp(this.variant, FILEUPLOAD_VARIANTS, 'default', ctx('variant'));
    this._sizeWatcher = watchResponsiveProp(this.size, FILEUPLOAD_SIZES, 'base', v => {
      this._resolvedSize = v as FileuploadSize;
    });
    this._resolvedSize = this._sizeWatcher.current as FileuploadSize;
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-fileupload');
    }
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, FILEUPLOAD_VARIANTS, 'default', ctx('variant')); }

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
    if (this.inputEl) {
      this.inputEl.value = '';
    }
  }

  private triggerFileDialog() {
    if (!this.disabled && this.inputEl) {
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
    const validFiles: File[] = [];

    for (const file of newFiles) {
      if (this.accept && !this.isValidFileType(file)) {
        this.aegovFileuploadError.emit({
          type: 'invalid-type',
          file,
          message: `File "${file.name}" is not an allowed type.`,
        });
        continue;
      }

      if (this.maxFileSize && file.size > this.maxFileSize) {
        this.aegovFileuploadError.emit({
          type: 'max-size',
          file,
          message: `File "${file.name}" exceeds the maximum size of ${this.formatFileSize(this.maxFileSize)}.`,
        });
        continue;
      }

      validFiles.push(file);
    }

    if (this.variant === 'default') {
      // Default replaces selection each time
      if (this.maxFiles && validFiles.length > this.maxFiles) {
        this.aegovFileuploadError.emit({
          type: 'max-files',
          message: `Maximum ${this.maxFiles} file${this.maxFiles > 1 ? 's' : ''} allowed.`,
        });
        this.selectedFiles = validFiles.slice(0, this.maxFiles);
      } else {
        this.selectedFiles = validFiles;
      }
    } else {
      // Button/Dropzone accumulate files
      const combined = [...this.selectedFiles, ...validFiles];

      if (this.maxFiles && combined.length > this.maxFiles) {
        this.aegovFileuploadError.emit({
          type: 'max-files',
          message: `Maximum ${this.maxFiles} file${this.maxFiles > 1 ? 's' : ''} allowed.`,
        });
        const slotsAvailable = this.maxFiles - this.selectedFiles.length;
        if (slotsAvailable > 0) {
          this.selectedFiles = [...this.selectedFiles, ...validFiles.slice(0, slotsAvailable)];
        }
      } else {
        this.selectedFiles = combined;
      }
    }

    this.aegovFileuploadChange.emit({ files: [...this.selectedFiles] });
  }

  private removeFile(index: number) {
    const removed = this.selectedFiles[index];
    const remaining = this.selectedFiles.filter((_, i) => i !== index);
    this.selectedFiles = remaining;
    this.aegovFileuploadRemove.emit({ file: removed, remaining: [...remaining] });
    this.aegovFileuploadChange.emit({ files: [...remaining] });
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
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  private getDisplayText(): string {
    if (this.selectedFiles.length === 0) return 'No file chosen';
    if (this.selectedFiles.length === 1) return this.selectedFiles[0].name;
    return `${this.selectedFiles.length} files selected`;
  }

  private getHelperText(): string {
    if (this.helperText) return this.helperText;
    if (!this.accept) return '';
    const types = this.accept.split(',').map(t => t.trim());
    const labels = types.map(t => {
      if (t.startsWith('.')) return t.substring(1).toUpperCase();
      if (t === 'image/*') return 'Images';
      if (t === 'video/*') return 'Videos';
      if (t === 'audio/*') return 'Audio';
      if (t === 'application/pdf') return 'PDF';
      return t;
    });
    return `Allowed: ${labels.join(', ')}`;
  }

  private getDefaultButtonText(): string {
    if (this.buttonText) return this.buttonText;
    switch (this.variant) {
      case 'default': return 'Browse';
      case 'button': return this.multiple ? 'Choose Files' : 'Choose File';
      case 'dropzone': return 'Browse Files';
      default: return 'Browse';
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
    const filesToProcess = this.multiple ? files : [files[0]];
    this.processFiles(filesToProcess);
  };

  // --- Render helpers ---

  private renderLabel() {
    if (!this.label) return null;
    return (
      <label class="fileupload__label" {...{ for: this.fieldId }}>
        {this.label}
        {this.required && <span class="fileupload__required" aria-hidden="true"> *</span>}
      </label>
    );
  }

  private renderDescription() {
    if (!this.description) return null;
    return <p class="fileupload__description">{this.description}</p>;
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
        onClick={() => this.removeFile(index)}
        aria-label={`Remove ${fileName}`}
      >
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
        </svg>
      </button>
    );
  }

  private renderFileList() {
    if (this.selectedFiles.length === 0) return null;
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

  private renderDefault() {
    const helperText = this.getHelperText();
    return (
      <div class="fileupload__input-wrapper" onClick={() => this.triggerFileDialog()}>
        <input
          type="file"
          ref={(el) => this.inputEl = el as HTMLInputElement}
          id={this.fieldId}
          name={this.name}
          accept={this.accept}
          multiple={this.multiple}
          disabled={this.disabled}
          required={this.required}
          class="fileupload__native-input"
          onChange={this.handleFileChange}
          aria-describedby={helperText ? `${this.fieldId}-helper` : undefined}
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

  private renderButton() {
    return [
      <input
        type="file"
        ref={(el) => this.inputEl = el as HTMLInputElement}
        id={this.fieldId}
        name={this.name}
        accept={this.accept}
        multiple={this.multiple}
        disabled={this.disabled}
        required={this.required}
        class="fileupload__hidden-input"
        onChange={this.handleFileChange}
        tabIndex={-1}
        aria-hidden="true"
      />,
      <button
        type="button"
        class="fileupload__trigger-btn"
        onClick={() => this.triggerFileDialog()}
        disabled={this.disabled}
      >
        {this.renderBtnUploadIcon()}
        {this.getDefaultButtonText()}
      </button>,
      this.renderFileList(),
    ];
  }

  private renderDropzone() {
    const dropzoneClasses = [
      'fileupload__dropzone',
      this.isDragOver ? 'fileupload__dropzone--dragover' : '',
    ].filter(Boolean).join(' ');

    return [
      <input
        type="file"
        ref={(el) => this.inputEl = el as HTMLInputElement}
        id={this.fieldId}
        name={this.name}
        accept={this.accept}
        multiple={this.multiple}
        disabled={this.disabled}
        required={this.required}
        class="fileupload__hidden-input"
        onChange={this.handleFileChange}
        tabIndex={-1}
        aria-hidden="true"
      />,
      <div
        class={dropzoneClasses}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
      >
        <div class="fileupload__drop-prompt">
          {this.renderUploadIcon()}
          <p class="fileupload__drop-text">
            Drag and drop {this.multiple ? 'files' : 'a file'} here, or
          </p>
          <button
            type="button"
            class="fileupload__dropzone-btn"
            onClick={() => this.triggerFileDialog()}
            disabled={this.disabled}
          >
            {this.getDefaultButtonText()}
          </button>
        </div>
        {this.renderFileList()}
      </div>,
    ];
  }

  render() {
    const variant: FileuploadVariant = (FILEUPLOAD_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'default';
    const classes = [
      'aegov-fileupload',
      `fileupload--${variant}`,
      `fileupload--${this._resolvedSize}`,
      this.disabled ? 'fileupload--disabled' : '',
    ].filter(Boolean).join(' ');

    return (
      <Host>
        <div class={classes}>
          {this.renderLabel()}
          {this.renderDescription()}
          {variant === 'default' && this.renderDefault()}
          {variant === 'button' && this.renderButton()}
          {variant === 'dropzone' && this.renderDropzone()}
          {this.renderHelperText()}
        </div>
      </Host>
    );
  }
}
