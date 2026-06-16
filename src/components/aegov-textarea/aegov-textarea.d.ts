import { EventEmitter } from '@stencil/core';
import type { TextareaResize } from '../../utils/types';
export declare class AegovTextarea {
    el: HTMLElement;
    /** Unique ID for the native textarea element. Auto-generated if not provided. */
    fieldId?: string;
    /** The size of the textarea (affects font size only). */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /** Whether the textarea is disabled. */
    isDisabled: boolean;
    /** Whether the textarea is readonly. */
    isReadonly: boolean;
    /** Placeholder text for the textarea. */
    placeholder?: string;
    /** The current value of the textarea. */
    value: string;
    /** The name attribute for the textarea. */
    name?: string;
    /** Whether the textarea is required. */
    isRequired: boolean;
    /** Resize behaviour of the textarea. */
    resize: TextareaResize;
    /** Maximum number of characters. When set, a character counter is displayed. */
    maxlength?: number;
    /** Show a copy button to copy the textarea value to clipboard. Only applies when readonly. */
    isCopyable: boolean;
    /** Additional CSS classes to apply. */
    extraClass?: string;
    /** Tracks whether the value was just copied (for visual feedback). */
    justCopied: boolean;
    /** Internal character count for the counter display. */
    charCount: number;
    private textareaEl?;
    /** Emitted when the textarea value changes (on blur). */
    aegovTextareaChange: EventEmitter<{
        value: string;
        event: Event;
    }>;
    /** Emitted on every keystroke. */
    aegovTextareaInput: EventEmitter<{
        value: string;
        event: Event;
    }>;
    /** Emitted when the textarea gains focus. */
    aegovTextareaFocus: EventEmitter<FocusEvent>;
    /** Emitted when the textarea loses focus. */
    aegovTextareaBlur: EventEmitter<FocusEvent>;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    onSizeChange(): void;
    onResizeChange(v: unknown): void;
    watchValue(newVal: string): void;
    /** Native textarea attributes to pass through. */
    private static readonly PASS_THROUGH_ATTRS;
    private get showCopy();
    private getTextareaClasses;
    private handleChange;
    private handleInput;
    private handleFocus;
    private handleBlur;
    private autoResize;
    private handleCopy;
    private renderCopyButton;
    private get counterId();
    private renderCharCounter;
    render(): any;
}
