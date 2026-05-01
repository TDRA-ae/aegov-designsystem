import { EventEmitter } from '@stencil/core';
import type { ButtonAppearance, ButtonGroupOrientation, ButtonGroupPosition, ButtonType, ButtonVariant } from '../../utils/types';
/**
 * @slot - Button content
 * @part button - The native button element
 */
export declare class AegovButton {
    el: HTMLElement;
    /**
     * Unique ID for the button element. Auto-generated if not provided.
     */
    fieldId?: string;
    /**
     * The button variant (color scheme)
     * @default 'primary'
     */
    variant: ButtonVariant;
    /**
     * The button size
     * @default 'base'
     */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /**
     * The button type attribute
     * @default 'button'
     */
    type: ButtonType;
    /**
     * The button appearance (visual style)
     * @default 'solid'
     */
    appearance: ButtonAppearance;
    /**
     * Whether the button is disabled
     * @default false
     */
    isDisabled: boolean;
    /**
     * Whether the button is only an icon
     * @default false
     */
    isIcon: boolean;
    /**
     * Whether the button should take full width
     * @default false
     */
    isFull: boolean;
    /**
     * Whether the button should have bold text or not
     * @default true
     */
    isBold: boolean;
    /**
     * Whether the button is in a loading state
     * @default false
     */
    isLoading: boolean;
    /**
     * Internal: Position of this button within a button group
     * @internal
     */
    groupPosition?: ButtonGroupPosition;
    /**
     * Internal: The orientation of the button group this button belongs to
     * @internal
     */
    groupOrientation?: ButtonGroupOrientation;
    /**
     * Emitted when the button is clicked
     */
    aegovButtonClick: EventEmitter<MouseEvent>;
    /**
     * Emitted when the button receives focus
     */
    aegovButtonFocus: EventEmitter<FocusEvent>;
    /**
     * Emitted when the button loses focus
     */
    aegovButtonBlur: EventEmitter<FocusEvent>;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    onVariantChange(v: unknown): void;
    onSizeChange(): void;
    onTypeChange(v: unknown): void;
    onAppearanceChange(v: unknown): void;
    onGroupPositionChange(v: unknown): void;
    onGroupOrientationChange(v: unknown): void;
    private handleClick;
    private handleFocus;
    private handleBlur;
    /**
     * Get the CSS classes based on component props
     */
    private getButtonClasses;
    render(): any;
}
