import { EventEmitter } from '@stencil/core';
import type { FileuploadVariant } from '../../utils/types';
export declare class AegovFileupload {
    el: HTMLElement;
    private inputEl?;
    /** Native file-input attributes to pass through to the inner `<input type="file">`. */
    private static readonly PASS_THROUGH_ATTRS;
    /**
     * Unique field ID. Auto-generated if not provided.
     */
    fieldId?: string;
    /**
     * Variant style: 'default' (styled input + button), 'button' (hidden input, label-as-button),
     * or 'dropzone' (drag-and-drop area).
     */
    variant: FileuploadVariant;
    /**
     * Component size.
     */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /**
     * Allow multiple file selection.
     */
    isMultiple: boolean;
    /**
     * Accepted file types (e.g. ".pdf,.jpg,image/*").
     */
    accept?: string;
    /**
     * Maximum file size in bytes.
     */
    maxFileSize?: number;
    /**
     * Maximum number of files (multiple mode only). No limit by default.
     */
    maxFiles?: number;
    /**
     * Disables the file upload.
     */
    isDisabled: boolean;
    /**
     * Marks the field as required.
     */
    isRequired: boolean;
    /**
     * Form field name.
     */
    name?: string;
    /**
     * Label text displayed above the control.
     */
    label?: string;
    /**
     * Description text displayed below the label.
     */
    description?: string;
    /**
     * Custom helper text for allowed file types. Overrides auto-generated text from `accept`.
     */
    labelHelp?: string;
    /**
     * Custom text for the browse/trigger button.
     */
    labelButton?: string;
    selectedFiles: File[];
    isDragOver: boolean;
    /**
     * Emitted when the file selection changes.
     */
    aegovFileuploadChange: EventEmitter<{
        files: File[];
    }>;
    /**
     * Emitted when a file is removed from the list (button/dropzone variants).
     */
    aegovFileuploadRemove: EventEmitter<{
        file: File;
        remaining: File[];
    }>;
    /**
     * Emitted when a file fails validation (invalid type, size exceeded, or max files exceeded).
     */
    aegovFileuploadError: EventEmitter<{
        type: 'max-size' | 'max-files' | 'invalid-type';
        file?: File;
        message: string;
    }>;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    onVariantChange(v: unknown): void;
    onSizeChange(): void;
    /**
     * Returns the currently selected files.
     */
    getFiles(): Promise<File[]>;
    /**
     * Clears all selected files.
     */
    clear(): Promise<void>;
    private triggerFileDialog;
    private handleFileChange;
    private processFiles;
    private removeFile;
    private isValidFileType;
    private formatFileSize;
    private getDisplayText;
    private getHelperText;
    private getDefaultButtonText;
    private handleDragOver;
    private handleDragLeave;
    private handleDrop;
    private renderLabel;
    private renderDescription;
    private renderHelperText;
    private renderFileIcon;
    private renderRemoveButton;
    private renderFileList;
    private renderUploadIcon;
    private renderBtnUploadIcon;
    private renderDefault;
    private renderButton;
    private renderDropzone;
    render(): any;
}
