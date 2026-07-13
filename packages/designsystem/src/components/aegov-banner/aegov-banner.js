var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, Watch, Event, State, h, Element } from '@stencil/core';
import { CALLOUT_VARIANTS, CALLOUT_APPEARANCES, BANNER_POSITIONS, BANNER_DISPLAYS, BANNER_MODES, BANNER_SIZES, } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import { generateId } from '../../utils/id-generator';
const TAG = 'aegov-banner';
const ctx = (prop) => ({ component: TAG, prop });
/** Maps banner position to the body padding CSS property it controls. */
const BODY_PADDING_PROP = {
    top: 'padding-top',
    bottom: 'padding-bottom',
};
/**
 * @slot default - The main content of the banner
 * @slot actions - Action buttons (optional)
 * @slot icon - Custom icon (optional, has fallback variant-based icons)
 */
let AegovBanner = class AegovBanner {
    constructor() {
        /**
         * The variant of the banner. Determines the color scheme.
         */
        this.variant = 'default';
        /**
         * The appearance style of the banner.
         */
        this.appearance = 'soft';
        /**
         * Vertical position of the banner (top or bottom of viewport/page).
         */
        this.position = 'top';
        /**
         * CSS positioning strategy: fixed (stays in viewport), sticky (scrolls then sticks).
         */
        this.display = 'fixed';
        /**
         * Layout mode: push (takes up space in page flow), overlay (floats over content).
         */
        this.mode = 'push';
        /**
         * Whether the banner can be dismissed/closed.
         */
        this.isDismissible = true;
        /**
         * Size of the banner. Controls font size and vertical padding.
         * Accepts a plain value (`"sm"`, `"base"`, `"lg"`) or a responsive string
         * using Tailwind-style breakpoint prefixes (`"sm xl:lg"`).
         */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
        /**
         * Auto-focus the banner when mounted (for critical alerts only).
         */
        this.isFocusable = false;
        /**
         * Internal state to track visibility of the banner.
         */
        this.isVisible = true;
        /**
         * Internal state to track dismissing animation.
         */
        this.isDismissing = false;
        /**
         * Internal state to track if the actions slot has content.
         */
        this.hasActionsSlot = false;
        this.resizeObserver = null;
        /**
         * Handle the dismiss button click with animation.
         */
        this.handleDismiss = () => {
            this.isDismissing = true;
            // Wait for animation to complete (300ms)
            setTimeout(() => {
                this.isVisible = false;
                this.aegovBannerDismiss.emit();
                // Emit height 0 for overlay mode
                if (this.mode === 'overlay') {
                    this.aegovBannerHeightChange.emit(0);
                }
                // Clear body padding for push mode
                if (this.display === 'fixed' && this.mode === 'push') {
                    this.clearBodyPadding();
                }
            }, 300);
        };
        /**
         * Emit banner height for overlay mode
         */
        this.emitHeight = () => {
            if (this.mode === 'overlay' && this.isVisible) {
                const height = this.el.offsetHeight;
                this.aegovBannerHeightChange.emit(height);
            }
        };
        /**
         * Set body padding CSS variable for push mode with fixed positioning
         */
        this.setBodyPadding = () => {
            if (this.display === 'fixed' && this.mode === 'push' && this.isVisible) {
                // Measure the inner .aegov-banner div, not the host element
                const bannerDiv = this.el.querySelector('.aegov-banner');
                const height = bannerDiv ? bannerDiv.offsetHeight : this.el.offsetHeight;
                // Only set padding if height is valid (> 0)
                if (height > 0) {
                    document.body.style.setProperty(BODY_PADDING_PROP[(BANNER_POSITIONS.includes(this.position) ? this.position : 'top')], `${height}px`);
                }
                else {
                    // If height is still 0, try again after a short delay
                    setTimeout(() => this.setBodyPadding(), 50);
                }
            }
        };
        /**
         * Clear body padding CSS variable
         */
        this.clearBodyPadding = () => {
            document.body.style.removeProperty(BODY_PADDING_PROP[(BANNER_POSITIONS.includes(this.position) ? this.position : 'top')]);
        };
        /**
         * Check if the actions slot has content
         */
        this.checkActionsSlot = () => {
            const actionsElements = this.el.querySelectorAll('[slot="actions"]');
            this.hasActionsSlot = actionsElements.length > 0;
        };
    }
    /**
     * Get the ARIA role based on variant and pass-through `role` attribute.
     * If a `role` attribute is set on the host, it overrides the auto-computed value.
     */
    getRole() {
        // If user provided a role attribute on the host, use it
        const hostRole = this.el.getAttribute('role');
        if (hostRole) {
            return hostRole;
        }
        // Auto-compute based on variant
        if (this.variant === 'success' || this.variant === 'error') {
            return 'alert';
        }
        // Default to region for general notifications
        return 'region';
    }
    /**
     * Get aria-live value based on role
     */
    getAriaLive() {
        const role = this.getRole();
        if (role === 'alert') {
            return 'assertive';
        }
        if (role === 'status' || role === 'region') {
            return 'polite';
        }
        return 'off';
    }
    /**
     * Get the CSS classes based on component props
     */
    getBannerClasses() {
        const classes = ['aegov-banner'];
        const display = BANNER_DISPLAYS.includes(this.display) ? this.display : 'fixed';
        const position = BANNER_POSITIONS.includes(this.position) ? this.position : 'top';
        const mode = BANNER_MODES.includes(this.mode) ? this.mode : 'push';
        const appearance = CALLOUT_APPEARANCES.includes(this.appearance) ? this.appearance : 'soft';
        const variant = CALLOUT_VARIANTS.includes(this.variant) ? this.variant : 'default';
        // Display mode (positioning)
        classes.push(`banner--${display}`);
        // Position (top/bottom)
        classes.push(`banner--${position}`);
        // Mode (push/overlay)
        classes.push(`banner--${mode}`);
        // Appearance
        classes.push(`banner--${appearance}`);
        // Variant
        classes.push(`banner--${variant}`);
        // Size
        classes.push(`banner--${this._resolvedSize}`);
        // Dismissing state
        if (this.isDismissing) {
            classes.push('banner--dismissing');
        }
        return classes.join(' ');
    }
    componentWillLoad() {
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-banner');
        }
        warnIfInvalidEnumProp(this.variant, CALLOUT_VARIANTS, 'default', ctx('variant'));
        warnIfInvalidEnumProp(this.appearance, CALLOUT_APPEARANCES, 'soft', ctx('appearance'));
        warnIfInvalidEnumProp(this.position, BANNER_POSITIONS, 'top', ctx('position'));
        warnIfInvalidEnumProp(this.display, BANNER_DISPLAYS, 'fixed', ctx('display'));
        warnIfInvalidEnumProp(this.mode, BANNER_MODES, 'push', ctx('mode'));
        this._sizeWatcher = watchResponsiveProp(this.size, BANNER_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    onSizeChange() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, BANNER_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    onVariantChange(v) { warnIfInvalidEnumProp(v, CALLOUT_VARIANTS, 'default', ctx('variant')); }
    onAppearanceChange(v) { warnIfInvalidEnumProp(v, CALLOUT_APPEARANCES, 'soft', ctx('appearance')); }
    onPositionChange(v) { warnIfInvalidEnumProp(v, BANNER_POSITIONS, 'top', ctx('position')); }
    onDisplayChange(v) { warnIfInvalidEnumProp(v, BANNER_DISPLAYS, 'fixed', ctx('display')); }
    onModeChange(v) { warnIfInvalidEnumProp(v, BANNER_MODES, 'push', ctx('mode')); }
    /**
     * Lifecycle: Component loaded
     */
    componentDidLoad() {
        // Auto-focus for critical alerts
        if (this.isFocusable && this.getRole() === 'alert') {
            const banner = this.el.querySelector('[role]');
            banner === null || banner === void 0 ? void 0 : banner.focus();
        }
        const needsOverlayHeight = this.mode === 'overlay';
        const needsPushPadding = this.display === 'fixed' && this.mode === 'push';
        // Emit initial height for overlay mode
        if (needsOverlayHeight) {
            this.emitHeight();
        }
        // Set body padding for push mode with fixed positioning
        if (needsPushPadding) {
            // Use requestAnimationFrame to ensure element is fully rendered before measuring
            requestAnimationFrame(() => {
                this.setBodyPadding();
            });
        }
        // Single ResizeObserver handles both overlay height and push padding
        if ((needsOverlayHeight || needsPushPadding) && typeof ResizeObserver !== 'undefined') {
            this.resizeObserver = new ResizeObserver(() => {
                if (needsOverlayHeight) {
                    this.emitHeight();
                }
                if (needsPushPadding) {
                    this.setBodyPadding();
                }
            });
            this.resizeObserver.observe(this.el);
        }
    }
    /**
     * Lifecycle: Component will render
     */
    componentWillRender() {
        this.checkActionsSlot();
    }
    /**
     * Lifecycle: Component disconnected
     */
    disconnectedCallback() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        // Clean up ResizeObserver
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
        // Clear body padding when component is removed
        if (this.display === 'fixed' && this.mode === 'push') {
            this.clearBodyPadding();
        }
    }
    render() {
        if (!this.isVisible) {
            return null;
        }
        const role = this.getRole();
        const ariaLive = this.getAriaLive();
        const headingId = this.heading ? `${this.fieldId}-heading` : undefined;
        // Pass-through aria-* and data-* attributes; `role` is consumed by getRole() so omit from spread
        const passThroughAttributes = getPassThroughAttributes(this.el);
        delete passThroughAttributes['role'];
        return (h("div", Object.assign({ id: this.fieldId, class: this.getBannerClasses(), role: role, "aria-live": ariaLive, "aria-labelledby": headingId, tabindex: this.isFocusable ? -1 : undefined }, passThroughAttributes),
            h("div", { class: "banner__container" },
                h("div", { class: "banner__content" },
                    h("div", { class: `banner__text ${this.hasActionsSlot ? 'banner__text-left' : 'banner__text-center'}` },
                        h("slot", null)),
                    this.hasActionsSlot && (h("div", { class: "banner__actions" },
                        h("slot", { name: "actions" })))),
                this.isDismissible && (h("button", { type: "button", class: "banner__dismiss", onClick: this.handleDismiss, "aria-label": "Close banner" },
                    h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 256" },
                        h("rect", { width: "256", height: "256", fill: "none" }),
                        h("line", { x1: "200", y1: "56", x2: "56", y2: "200", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "24" }),
                        h("line", { x1: "200", y1: "200", x2: "56", y2: "56", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "24" })))))));
    }
};
__decorate([
    Element()
], AegovBanner.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovBanner.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovBanner.prototype, "variant", void 0);
__decorate([
    Prop()
], AegovBanner.prototype, "appearance", void 0);
__decorate([
    Prop()
], AegovBanner.prototype, "position", void 0);
__decorate([
    Prop()
], AegovBanner.prototype, "display", void 0);
__decorate([
    Prop()
], AegovBanner.prototype, "mode", void 0);
__decorate([
    Prop()
], AegovBanner.prototype, "isDismissible", void 0);
__decorate([
    Prop()
], AegovBanner.prototype, "heading", void 0);
__decorate([
    Prop()
], AegovBanner.prototype, "size", void 0);
__decorate([
    State()
], AegovBanner.prototype, "_resolvedSize", void 0);
__decorate([
    Prop()
], AegovBanner.prototype, "isFocusable", void 0);
__decorate([
    Event()
], AegovBanner.prototype, "aegovBannerDismiss", void 0);
__decorate([
    Event()
], AegovBanner.prototype, "aegovBannerHeightChange", void 0);
__decorate([
    State()
], AegovBanner.prototype, "isVisible", void 0);
__decorate([
    State()
], AegovBanner.prototype, "isDismissing", void 0);
__decorate([
    State()
], AegovBanner.prototype, "hasActionsSlot", void 0);
__decorate([
    Watch('size')
], AegovBanner.prototype, "onSizeChange", null);
__decorate([
    Watch('variant')
], AegovBanner.prototype, "onVariantChange", null);
__decorate([
    Watch('appearance')
], AegovBanner.prototype, "onAppearanceChange", null);
__decorate([
    Watch('position')
], AegovBanner.prototype, "onPositionChange", null);
__decorate([
    Watch('display')
], AegovBanner.prototype, "onDisplayChange", null);
__decorate([
    Watch('mode')
], AegovBanner.prototype, "onModeChange", null);
AegovBanner = __decorate([
    Component({
        tag: 'aegov-banner',
        styleUrl: 'aegov-banner.css',
        scoped: false,
        shadow: false
    })
], AegovBanner);
export { AegovBanner };
