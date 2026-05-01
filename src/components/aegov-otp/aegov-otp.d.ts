import { EventEmitter } from '@stencil/core';
import type { OtpVariant } from '../../utils/types';
export declare class AegovOtp {
    el: HTMLElement;
    /** Unique ID for the first input cell. Auto-generated if not provided. Used by aegov-label for linking. */
    fieldId?: string;
    /**
     * Visual variant. "continuous" = single bordered box with dividers between cells.
     * "individual" = separate bordered boxes per digit.
     * Note: named "variant" to avoid conflict with native HTML "style" attribute.
     */
    variant: OtpVariant;
    /** Number of input cells (digits/characters expected). */
    length: number;
    /** Size of the input cells. Maps to text size: xs, sm, base, lg, xl, 2xl. */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /** Allow letters and numbers when true. Numbers only when false. */
    isAlphanumeric: boolean;
    /** Regex pattern string for validation. Checked when all cells are filled. */
    pattern?: string;
    /** Disables all input cells. */
    isDisabled: boolean;
    /** Form field name for the hidden input (used in form submission). */
    name?: string;
    /** Current OTP value. Can be set externally to pre-fill cells. */
    value: string;
    /** Additional CSS classes. */
    extraClass?: string;
    /** Fires on every character change with the current value. */
    aegovOtpChange: EventEmitter<{
        value: string;
    }>;
    /** Fires when all cells are filled (and pattern is valid if set). */
    aegovOtpComplete: EventEmitter<{
        value: string;
    }>;
    /** Fires when all cells are filled but pattern validation fails. */
    aegovOtpInvalid: EventEmitter<{
        value: string;
        pattern: string;
    }>;
    private cellRefs;
    private hiddenRef;
    private internalUpdate;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    onVariantChange(v: unknown): void;
    onSizeChange(): void;
    componentDidLoad(): void;
    onValueChange(newVal: string): void;
    /** Clears all cells and focuses the first cell. */
    clear(): Promise<void>;
    private distributeValue;
    private collectValue;
    private isValidChar;
    private emitChange;
    private handleInput;
    private handleKeyDown;
    private handlePaste;
    private handleFocus;
    private handleClick;
    render(): any;
}
