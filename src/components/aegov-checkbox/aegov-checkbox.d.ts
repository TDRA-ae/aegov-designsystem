import { EventEmitter } from '@stencil/core';
export declare class AegovCheckbox {
    el: HTMLElement;
    /** Unique ID for the native checkbox element. Auto-generated if not provided. */
    fieldId?: string;
    /** The name attribute for the checkbox. */
    name?: string;
    /** The value attribute for the checkbox. */
    value?: string;
    /** Whether the checkbox is checked. */
    isChecked: boolean;
    /** The size of the checkbox. */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /** Whether the checkbox is disabled. */
    isDisabled: boolean;
    /** Whether the checkbox is required. */
    isRequired: boolean;
    /** Label text for the checkbox. When provided, generates an associated <label> element. */
    label?: string;
    /** Description text displayed below the label. Only rendered when label is provided. */
    description?: string;
    /** Marks this checkbox as a "check all" controller within a checkbox group. */
    isCheckAll: boolean;
    /** Whether the checkbox is in an indeterminate state. Set by parent group for check-all. */
    isIndeterminate: boolean;
    /** Additional CSS classes to apply. */
    extraClass?: string;
    /** Emitted when the checkbox checked state changes. */
    aegovCheckboxChange: EventEmitter<{
        checked: boolean;
        value?: string;
    }>;
    private inputEl?;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    onSizeChange(): void;
    componentDidRender(): void;
    onIndeterminateChange(): void;
    private handleChange;
    private static readonly PASS_THROUGH_ATTRS;
    render(): any;
}
