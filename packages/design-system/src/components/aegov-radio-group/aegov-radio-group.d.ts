import { EventEmitter } from '@stencil/core';
import type { RadioGroupVariant, RadioGroupOrientation } from '../../utils/types';
export declare class AegovRadioGroup {
    el: HTMLElement;
    /** Visual variant for the group layout. */
    variant: RadioGroupVariant;
    /** Stack direction for radio items. */
    orientation: RadioGroupOrientation;
    /** Optional label rendered as a <legend> for accessibility. */
    label?: string;
    /** Size of all radios in the group. Propagated to children. */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /** The name shared by all radios in the group. Ensures native single-select behavior. */
    name: string;
    /** Disables all radios within the group via native fieldset disabled. */
    isDisabled: boolean;
    /** Additional CSS classes to apply. */
    extraClass?: string;
    /** Emitted when the selected radio changes. Contains the selected value. */
    aegovRadioGroupChange: EventEmitter<{
        value: string | undefined;
    }>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    onVariantChange(v: unknown): void;
    onOrientationChange(v: unknown): void;
    disconnectedCallback(): void;
    onSizeChange(): void;
    onNameChange(): void;
    private syncChildren;
    private getRadios;
    handleRadioChange(event: CustomEvent<{
        checked: boolean;
        value?: string;
    }>): void;
    private getGroupClasses;
    render(): any;
}
