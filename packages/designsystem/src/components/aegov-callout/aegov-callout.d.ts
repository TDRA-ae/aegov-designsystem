import { EventEmitter } from '@stencil/core';
import type { CalloutVariant, CalloutAppearance } from '../../utils/types';
/**
 * @slot default - The main content of the callout
 */
export declare class AegovCallout {
    el: HTMLElement;
    /**
     * Unique ID for the callout element. Auto-generated if not provided.
     */
    fieldId?: string;
    /**
     * The variant of the callout. Determines the color scheme.
     */
    variant: CalloutVariant;
    /**
     * The appearance style of the callout.
     */
    appearance: CalloutAppearance;
    /**
     * The size of the callout. Controls font size, icon size, and padding.
     * Accepts a plain value (`"sm"`, `"base"`, `"lg"`) or a responsive string
     * using Tailwind-style breakpoint prefixes (`"sm xl:lg"`).
     */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /**
     * Whether the callout can be dismissed/closed.
     */
    isDismissible: boolean;
    /**
     * Event emitted when the callout is dismissed.
     */
    aegovCalloutDismiss: EventEmitter<void>;
    /**
     * Internal state to track visibility of the callout.
     */
    isVisible: boolean;
    /**
     * Internal state to track if the actions slot has content.
     */
    hasActionsSlot: boolean;
    /**
     * Internal state to track if the icon slot has content.
     */
    hasIconSlot: boolean;
    /**
     * Handle the dismiss button click.
     */
    private handleDismiss;
    /**
     * Check if the actions slot has content
     * Note: Using scoped CSS, not Shadow DOM, so we check for elements with slot="actions"
     */
    private checkActionsSlot;
    /**
     * Check if the icon slot has content
     */
    private checkIconSlot;
    /**
     * Get the default icon based on variant
     */
    componentWillLoad(): void;
    disconnectedCallback(): void;
    onVariantChange(v: unknown): void;
    onAppearanceChange(v: unknown): void;
    onSizeChange(): void;
    /**
     * Lifecycle method called before each render
     */
    componentWillRender(): void;
    private static readonly PASS_THROUGH_ATTRS;
    /**
     * Get the CSS classes based on component props
     */
    private getCalloutClasses;
    private getIconSizeClass;
    render(): any;
}
