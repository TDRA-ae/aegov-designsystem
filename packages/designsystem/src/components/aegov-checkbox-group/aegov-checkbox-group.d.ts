import { EventEmitter } from '@stencil/core';
import type { CheckboxGroupVariant, CheckboxGroupOrientation } from '../../utils/types';
export declare class AegovCheckboxGroup {
    el: HTMLElement;
    /** Visual variant for the group layout. */
    variant: CheckboxGroupVariant;
    /** Stack direction for checkbox items. */
    orientation: CheckboxGroupOrientation;
    /** Optional label rendered as a <legend> for accessibility. */
    label?: string;
    /** Size of all checkboxes in the group. Propagated to children. */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /** Disables all checkboxes within the group via native fieldset disabled. */
    isDisabled: boolean;
    /** Additional CSS classes to apply. */
    extraClass?: string;
    /** Emitted when any checkbox in the group changes. Contains all currently checked values. */
    aegovCheckboxGroupChange: EventEmitter<{
        values: string[];
    }>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    onVariantChange(v: unknown): void;
    onOrientationChange(v: unknown): void;
    disconnectedCallback(): void;
    onSizeChange(): void;
    private syncChildren;
    private getRegularCheckboxes;
    private getCheckAllCheckbox;
    handleCheckboxChange(event: CustomEvent<{
        checked: boolean;
        value?: string;
    }>): void;
    private handleCheckAllToggle;
    private updateCheckAllState;
    private emitGroupChange;
    private getGroupClasses;
    render(): any;
}
