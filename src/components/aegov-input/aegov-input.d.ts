import { EventEmitter } from '@stencil/core';
import type { InputType } from '../../utils/types';
export declare class AegovInput {
    el: HTMLElement;
    /** Unique ID for the native input element. Auto-generated if not provided. */
    fieldId?: string;
    /** The type of the input field. */
    type: InputType;
    /** The size of the input field. */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /** Whether the input is disabled. */
    isDisabled: boolean;
    /** Whether the input is readonly. */
    isReadonly: boolean;
    /** Placeholder text for the input. */
    placeholder?: string;
    /** The current value of the input. */
    value: string;
    /** The name attribute for the input. */
    name?: string;
    /** Whether the input is required. */
    isRequired: boolean;
    /** Show a toggle button to reveal/hide password. Only applies when type="password". */
    isRevealable: boolean;
    /** Show a copy button to copy the input value to clipboard. Only applies when readonly. */
    isCopyable: boolean;
    /** Additional CSS classes to apply. */
    extraClass?: string;
    /** Tracks whether the password is currently visible. */
    passwordVisible: boolean;
    /** Tracks whether the value was just copied (for visual feedback). */
    justCopied: boolean;
    /** Emitted when the input value changes (on blur/enter). */
    aegovInputChange: EventEmitter<{
        value: string;
        event: Event;
    }>;
    /** Emitted on every keystroke. */
    aegovInputInput: EventEmitter<{
        value: string;
        event: Event;
    }>;
    /** Emitted when the input gains focus. */
    aegovInputFocus: EventEmitter<FocusEvent>;
    /** Emitted when the input loses focus. */
    aegovInputBlur: EventEmitter<FocusEvent>;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    onTypeChange(v: unknown): void;
    onSizeChange(): void;
    /** Native input attributes to pass through to the inner input element. */
    private static readonly PASS_THROUGH_ATTRS;
    private get showReveal();
    private get showCopy();
    private get hasActionButton();
    private get resolvedType();
    private getInputClasses;
    private handleChange;
    private handleInput;
    private handleFocus;
    private handleBlur;
    private handleRevealToggle;
    private handleCopy;
    private renderRevealButton;
    private renderCopyButton;
    render(): any;
}
