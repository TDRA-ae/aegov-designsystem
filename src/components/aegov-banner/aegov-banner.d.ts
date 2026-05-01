import { EventEmitter } from '@stencil/core';
import type { CalloutVariant, CalloutAppearance, BannerPosition, BannerDisplay, BannerMode } from '../../utils/types';
/**
 * @slot default - The main content of the banner
 * @slot actions - Action buttons (optional)
 * @slot icon - Custom icon (optional, has fallback variant-based icons)
 */
export declare class AegovBanner {
    el: HTMLElement;
    /**
     * Unique ID for the banner element. Auto-generated if not provided.
     * The heading element receives a derived ID `${fieldId}-heading` for ARIA labelledby.
     */
    fieldId?: string;
    /**
     * The variant of the banner. Determines the color scheme.
     */
    variant: CalloutVariant;
    /**
     * The appearance style of the banner.
     */
    appearance: CalloutAppearance;
    /**
     * Vertical position of the banner (top or bottom of viewport/page).
     */
    position: BannerPosition;
    /**
     * CSS positioning strategy: fixed (stays in viewport), sticky (scrolls then sticks).
     */
    display: BannerDisplay;
    /**
     * Layout mode: push (takes up space in page flow), overlay (floats over content).
     */
    mode: BannerMode;
    /**
     * Whether the banner can be dismissed/closed.
     */
    isDismissible: boolean;
    /**
     * Banner heading for aria-labelledby attribute.
     */
    heading?: string;
    /**
     * Size of the banner. Controls font size and vertical padding.
     * Accepts a plain value (`"sm"`, `"base"`, `"lg"`) or a responsive string
     * using Tailwind-style breakpoint prefixes (`"sm xl:lg"`).
     */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /**
     * Auto-focus the banner when mounted (for critical alerts only).
     */
    isFocusable: boolean;
    /**
     * Event emitted when the banner is dismissed.
     */
    aegovBannerDismiss: EventEmitter<void>;
    /**
     * Event emitted when banner height changes (useful for overlay mode to adjust body padding).
     */
    aegovBannerHeightChange: EventEmitter<number>;
    /**
     * Internal state to track visibility of the banner.
     */
    isVisible: boolean;
    /**
     * Internal state to track dismissing animation.
     */
    isDismissing: boolean;
    /**
     * Internal state to track if the actions slot has content.
     */
    hasActionsSlot: boolean;
    private resizeObserver;
    /**
     * Get the ARIA role based on variant and pass-through `role` attribute.
     * If a `role` attribute is set on the host, it overrides the auto-computed value.
     */
    private getRole;
    /**
     * Get aria-live value based on role
     */
    private getAriaLive;
    /**
     * Handle the dismiss button click with animation.
     */
    private handleDismiss;
    /**
     * Emit banner height for overlay mode
     */
    private emitHeight;
    /**
     * Set body padding CSS variable for push mode with fixed positioning
     */
    private setBodyPadding;
    /**
     * Clear body padding CSS variable
     */
    private clearBodyPadding;
    /**
     * Check if the actions slot has content
     */
    private checkActionsSlot;
    /**
     * Get the CSS classes based on component props
     */
    private getBannerClasses;
    componentWillLoad(): void;
    onSizeChange(): void;
    onVariantChange(v: unknown): void;
    onAppearanceChange(v: unknown): void;
    onPositionChange(v: unknown): void;
    onDisplayChange(v: unknown): void;
    onModeChange(v: unknown): void;
    /**
     * Lifecycle: Component loaded
     */
    componentDidLoad(): void;
    /**
     * Lifecycle: Component will render
     */
    componentWillRender(): void;
    /**
     * Lifecycle: Component disconnected
     */
    disconnectedCallback(): void;
    render(): any;
}
