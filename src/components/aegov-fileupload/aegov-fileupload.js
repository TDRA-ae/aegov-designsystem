var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AegovFileupload_1;
import { Component, Host, h, Prop, State, Event, Element, Method, Watch } from '@stencil/core';
import { FILEUPLOAD_VARIANTS, FILEUPLOAD_SIZES } from '../../utils/types';
import { generateId } from '../../utils/id-generator';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import { getPassThroughAttributes } from '../../utils/attributes';
const TAG = 'aegov-fileupload';
const ctx = (prop) => ({ component: TAG, prop });
let AegovFileupload = AegovFileupload_1 = class AegovFileupload {
    constructor() {
        /**
         * Variant style: 'default' (styled input + button), 'button' (hidden input, label-as-button),
         * or 'dropzone' (drag-and-drop area).
         */
        this.variant = 'default';
        /**
         * Component size.
         */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
        /**
         * Allow multiple file selection.
         */
        this.isMultiple = false;
        /**
         * Disables the file upload.
         */
        this.isDisabled = false;
        /**
         * Marks the field as required.
         */
        this.isRequired = false;
        this.selectedFiles = [];
        this.isDragOver = false;
        this.handleFileChange = () => {
            var _a;
            if (!((_a = this.inputEl) === null || _a === void 0 ? void 0 : _a.files))
                return;
            const newFiles = Array.from(this.inputEl.files);
            this.processFiles(newFiles);
            // Reset so same file can be re-selected
            this.inputEl.value = '';
        };
        // --- Drag and drop ---
        this.handleDragOver = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!this.isDisabled) {
                this.isDragOver = true;
            }
        };
        this.handleDragLeave = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.isDragOver = false;
        };
        this.handleDrop = (e) => {
            var _a;
            e.preventDefault();
            e.stopPropagation();
            this.isDragOver = false;
            if (this.isDisabled || !((_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.files))
                return;
            const files = Array.from(e.dataTransfer.files);
            const filesToProcess = this.isMultiple ? files : [files[0]];
            this.processFiles(filesToProcess);
        };
    }
    componentWillLoad() {
        warnIfInvalidEnumProp(this.variant, FILEUPLOAD_VARIANTS, 'default', ctx('variant'));
        this._sizeWatcher = watchResponsiveProp(this.size, FILEUPLOAD_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-fileupload');
        }
    }
    disconnectedCallback() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    onVariantChange(v) { warnIfInvalidEnumProp(v, FILEUPLOAD_VARIANTS, 'default', ctx('variant')); }
    onSizeChange() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, FILEUPLOAD_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    /**
     * Returns the currently selected files.
     */
    async getFiles() {
        return [...this.selectedFiles];
    }
    /**
     * Clears all selected files.
     */
    async clear() {
        this.selectedFiles = [];
        if (this.inputEl) {
            this.inputEl.value = '';
        }
    }
    triggerFileDialog() {
        if (!this.isDisabled && this.inputEl) {
            this.inputEl.click();
        }
    }
    processFiles(newFiles) {
        const validFiles = [];
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
            }
            else {
                this.selectedFiles = validFiles;
            }
        }
        else {
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
            }
            else {
                this.selectedFiles = combined;
            }
        }
        this.aegovFileuploadChange.emit({ files: [...this.selectedFiles] });
    }
    removeFile(index) {
        const removed = this.selectedFiles[index];
        const remaining = this.selectedFiles.filter((_, i) => i !== index);
        this.selectedFiles = remaining;
        this.aegovFileuploadRemove.emit({ file: removed, remaining: [...remaining] });
        this.aegovFileuploadChange.emit({ files: [...remaining] });
    }
    isValidFileType(file) {
        if (!this.accept)
            return true;
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
    formatFileSize(bytes) {
        if (bytes === 0)
            return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }
    getDisplayText() {
        if (this.selectedFiles.length === 0)
            return 'No file chosen';
        if (this.selectedFiles.length === 1)
            return this.selectedFiles[0].name;
        return `${this.selectedFiles.length} files selected`;
    }
    getHelperText() {
        if (this.labelHelp)
            return this.labelHelp;
        if (!this.accept)
            return '';
        const types = this.accept.split(',').map(t => t.trim());
        const labels = types.map(t => {
            if (t.startsWith('.'))
                return t.substring(1).toUpperCase();
            if (t === 'image/*')
                return 'Images';
            if (t === 'video/*')
                return 'Videos';
            if (t === 'audio/*')
                return 'Audio';
            if (t === 'application/pdf')
                return 'PDF';
            return t;
        });
        return `Allowed: ${labels.join(', ')}`;
    }
    getDefaultButtonText() {
        if (this.labelButton)
            return this.labelButton;
        switch (this.variant) {
            case 'default': return 'Browse';
            case 'button': return this.isMultiple ? 'Choose Files' : 'Choose File';
            case 'dropzone': return 'Browse Files';
            default: return 'Browse';
        }
    }
    // --- Render helpers ---
    renderLabel() {
        if (!this.label)
            return null;
        return (h("label", { class: "fileupload__label", for: this.fieldId },
            this.label,
            this.isRequired && h("span", { class: "fileupload__required", "aria-hidden": "true" }, " *")));
    }
    renderDescription() {
        if (!this.description)
            return null;
        return h("p", { class: "fileupload__description" }, this.description);
    }
    renderHelperText() {
        const text = this.getHelperText();
        if (!text)
            return null;
        return h("p", { class: "fileupload__helper", id: `${this.fieldId}-helper` }, text);
    }
    renderFileIcon() {
        return (h("svg", { class: "fileupload__file-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.5", "aria-hidden": "true" },
            h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" })));
    }
    renderRemoveButton(index, fileName) {
        return (h("button", { type: "button", class: "fileupload__remove-btn", onClick: () => this.removeFile(index), "aria-label": `Remove ${fileName}` },
            h("svg", { viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" },
                h("path", { d: "M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" }))));
    }
    renderFileList() {
        if (this.selectedFiles.length === 0)
            return null;
        return (h("ul", { class: "fileupload__file-list", role: "list" }, this.selectedFiles.map((file, index) => (h("li", { class: "fileupload__file-item", key: `${file.name}-${file.size}-${index}` },
            this.renderFileIcon(),
            h("span", { class: "fileupload__file-name", title: file.name }, file.name),
            h("span", { class: "fileupload__file-size" }, this.formatFileSize(file.size)),
            this.renderRemoveButton(index, file.name))))));
    }
    renderUploadIcon() {
        return (h("svg", { class: "fileupload__drop-icon", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.5", "aria-hidden": "true" },
            h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" })));
    }
    renderBtnUploadIcon() {
        return (h("svg", { class: "fileupload__btn-icon", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" },
            h("path", { d: "M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636v8.614Z" }),
            h("path", { d: "M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" })));
    }
    // --- Variant renderers ---
    renderDefault(passThroughAttrs) {
        const helperText = this.getHelperText();
        return (h("div", { class: "fileupload__input-wrapper", onClick: () => this.triggerFileDialog() },
            h("input", Object.assign({ type: "file", ref: (el) => this.inputEl = el }, passThroughAttrs, { id: this.fieldId, name: this.name, accept: this.accept, multiple: this.isMultiple, disabled: this.isDisabled, required: this.isRequired, class: "fileupload__native-input", onChange: this.handleFileChange, "aria-describedby": helperText ? `${this.fieldId}-helper` : undefined })),
            h("span", { class: `fileupload__filename ${this.selectedFiles.length === 0 ? 'fileupload__filename--empty' : ''}` }, this.getDisplayText()),
            h("span", { class: "fileupload__browse-btn", "aria-hidden": "true" }, this.getDefaultButtonText())));
    }
    renderButton(passThroughAttrs) {
        return [
            h("input", Object.assign({ type: "file", ref: (el) => this.inputEl = el }, passThroughAttrs, { id: this.fieldId, name: this.name, accept: this.accept, multiple: this.isMultiple, disabled: this.isDisabled, required: this.isRequired, class: "fileupload__hidden-input", onChange: this.handleFileChange, tabIndex: -1, "aria-hidden": "true" })),
            h("button", { type: "button", class: "fileupload__trigger-btn", onClick: () => this.triggerFileDialog(), disabled: this.isDisabled },
                this.renderBtnUploadIcon(),
                this.getDefaultButtonText()),
            this.renderFileList(),
        ];
    }
    renderDropzone(passThroughAttrs) {
        const dropzoneClasses = [
            'fileupload__dropzone',
            this.isDragOver ? 'fileupload__dropzone--dragover' : '',
        ].filter(Boolean).join(' ');
        return [
            h("input", Object.assign({ type: "file", ref: (el) => this.inputEl = el }, passThroughAttrs, { id: this.fieldId, name: this.name, accept: this.accept, multiple: this.isMultiple, disabled: this.isDisabled, required: this.isRequired, class: "fileupload__hidden-input", onChange: this.handleFileChange, tabIndex: -1, "aria-hidden": "true" })),
            h("div", { class: dropzoneClasses, onDragOver: this.handleDragOver, onDragLeave: this.handleDragLeave, onDrop: this.handleDrop },
                h("div", { class: "fileupload__drop-prompt" },
                    this.renderUploadIcon(),
                    h("p", { class: "fileupload__drop-text" },
                        "Drag and drop ",
                        this.isMultiple ? 'files' : 'a file',
                        " here, or"),
                    h("button", { type: "button", class: "fileupload__dropzone-btn", onClick: () => this.triggerFileDialog(), disabled: this.isDisabled }, this.getDefaultButtonText())),
                this.renderFileList()),
        ];
    }
    render() {
        const variant = FILEUPLOAD_VARIANTS.includes(this.variant) ? this.variant : 'default';
        const classes = [
            'aegov-fileupload',
            `fileupload--${variant}`,
            `fileupload--${this._resolvedSize}`,
            this.isDisabled ? 'fileupload--disabled' : '',
        ].filter(Boolean).join(' ');
        const passThroughAttrs = getPassThroughAttributes(this.el, AegovFileupload_1.PASS_THROUGH_ATTRS);
        return (h(Host, null,
            h("div", { class: classes },
                this.renderLabel(),
                this.renderDescription(),
                variant === 'default' && this.renderDefault(passThroughAttrs),
                variant === 'button' && this.renderButton(passThroughAttrs),
                variant === 'dropzone' && this.renderDropzone(passThroughAttrs),
                this.renderHelperText())));
    }
};
/** Native file-input attributes to pass through to the inner `<input type="file">`. */
AegovFileupload.PASS_THROUGH_ATTRS = new Set([
    'capture', 'autofocus', 'form', 'tabindex', 'title', 'webkitdirectory',
]);
__decorate([
    Element()
], AegovFileupload.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovFileupload.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovFileupload.prototype, "variant", void 0);
__decorate([
    Prop()
], AegovFileupload.prototype, "size", void 0);
__decorate([
    State()
], AegovFileupload.prototype, "_resolvedSize", void 0);
__decorate([
    Prop()
], AegovFileupload.prototype, "isMultiple", void 0);
__decorate([
    Prop()
], AegovFileupload.prototype, "accept", void 0);
__decorate([
    Prop()
], AegovFileupload.prototype, "maxFileSize", void 0);
__decorate([
    Prop()
], AegovFileupload.prototype, "maxFiles", void 0);
__decorate([
    Prop({ reflect: true })
], AegovFileupload.prototype, "isDisabled", void 0);
__decorate([
    Prop()
], AegovFileupload.prototype, "isRequired", void 0);
__decorate([
    Prop()
], AegovFileupload.prototype, "name", void 0);
__decorate([
    Prop()
], AegovFileupload.prototype, "label", void 0);
__decorate([
    Prop()
], AegovFileupload.prototype, "description", void 0);
__decorate([
    Prop()
], AegovFileupload.prototype, "labelHelp", void 0);
__decorate([
    Prop()
], AegovFileupload.prototype, "labelButton", void 0);
__decorate([
    State()
], AegovFileupload.prototype, "selectedFiles", void 0);
__decorate([
    State()
], AegovFileupload.prototype, "isDragOver", void 0);
__decorate([
    Event()
], AegovFileupload.prototype, "aegovFileuploadChange", void 0);
__decorate([
    Event()
], AegovFileupload.prototype, "aegovFileuploadRemove", void 0);
__decorate([
    Event()
], AegovFileupload.prototype, "aegovFileuploadError", void 0);
__decorate([
    Watch('variant')
], AegovFileupload.prototype, "onVariantChange", null);
__decorate([
    Watch('size')
], AegovFileupload.prototype, "onSizeChange", null);
__decorate([
    Method()
], AegovFileupload.prototype, "getFiles", null);
__decorate([
    Method()
], AegovFileupload.prototype, "clear", null);
AegovFileupload = AegovFileupload_1 = __decorate([
    Component({
        tag: 'aegov-fileupload',
        styleUrl: 'aegov-fileupload.css',
        scoped: false,
    })
], AegovFileupload);
export { AegovFileupload };
