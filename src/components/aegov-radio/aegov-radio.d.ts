import { EventEmitter } from '@stencil/core';
export declare class AegovRadio {
    el: HTMLElement;
    /** Unique ID for the native radio element. Auto-generated if not provided. */
    fieldId?: string;
    /** The name attribute for the radio. Required for native radio grouping. */
    name?: string;
    /** The value attribute for the radio. */
    value?: string;
    /** Whether the radio is checked. */
    isChecked: boolean;
    /** The size of the radio. */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /** Whether the radio is disabled. */
    isDisabled: boolean;
    /** Whether the radio is required. */
    isRequired: boolean;
    /** Label text for the radio. When provided, generates an associated <label> element. */
    label?: string;
    /** Description text displayed below the label. Only rendered when label is provided. */
    description?: string;
    /** Additional CSS classes to apply. */
    extraClass?: string;
    /** Emitted when the radio checked state changes. */
    aegovRadioChange: EventEmitter<{
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
