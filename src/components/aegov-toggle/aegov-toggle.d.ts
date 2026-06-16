import { EventEmitter } from '@stencil/core';
export declare class AegovToggle {
    el: HTMLElement;
    /** Unique ID for the native checkbox element. Auto-generated if not provided. */
    fieldId?: string;
    /** The name attribute for the toggle. */
    name?: string;
    /** The value attribute for the toggle. */
    value?: string;
    /** Whether the toggle is checked/on. */
    isChecked: boolean;
    /** The size of the toggle. */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /** Whether the toggle is disabled. */
    isDisabled: boolean;
    /** Whether the toggle is required. */
    isRequired: boolean;
    /** Label text for the toggle. Rendered at the end (inline-end). */
    label?: string;
    /** Description text displayed below the label. Only rendered when label is provided. */
    description?: string;
    /** Emitted when the toggle checked state changes. */
    aegovToggleChange: EventEmitter<{
        checked: boolean;
        value?: string;
    }>;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    onSizeChange(): void;
    private handleChange;
    private static readonly PASS_THROUGH_ATTRS;
    render(): any;
}
