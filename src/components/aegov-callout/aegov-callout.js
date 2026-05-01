var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AegovCallout_1;
import { Component, Prop, Watch, Event, State, h, Element } from '@stencil/core';
import { CALLOUT_VARIANTS, CALLOUT_APPEARANCES, CALLOUT_SIZES } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { getVariantIcon } from '../../utils/icons';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import { generateId } from '../../utils/id-generator';
const TAG = 'aegov-callout';
const ctx = (prop) => ({ component: TAG, prop });
/**
 * @slot default - The main content of the callout
 */
let AegovCallout = AegovCallout_1 = class AegovCallout {
    constructor() {
        /**
         * The variant of the callout. Determines the color scheme.
         */
        this.variant = 'default';
        /**
         * The appearance style of the callout.
         */
        this.appearance = 'soft';
        /**
         * The size of the callout. Controls font size, icon size, and padding.
         * Accepts a plain value (`"sm"`, `"base"`, `"lg"`) or a responsive string
         * using Tailwind-style breakpoint prefixes (`"sm xl:lg"`).
         */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
        /**
         * Whether the callout can be dismissed/closed.
         */
        this.isDismissible = false;
        /**
         * Internal state to track visibility of the callout.
         */
        this.isVisible = true;
        /**
         * Internal state to track if the actions slot has content.
         */
        this.hasActionsSlot = false;
        /**
         * Internal state to track if the icon slot has content.
         */
        this.hasIconSlot = false;
        /**
         * Handle the dismiss button click.
         */
        this.handleDismiss = () => {
            this.isVisible = false;
            this.aegovCalloutDismiss.emit();
        };
        /**
         * Check if the actions slot has content
         * Note: Using scoped CSS, not Shadow DOM, so we check for elements with slot="actions"
         */
        this.checkActionsSlot = () => {
            // For scoped components, check if there are children with slot="actions" attribute
            const actionsElements = this.el.querySelectorAll('[slot="actions"]');
            this.hasActionsSlot = actionsElements.length > 0;
        };
        /**
         * Check if the icon slot has content
         */
        this.checkIconSlot = () => {
            const iconElements = this.el.querySelectorAll('[slot="icon"]');
            this.hasIconSlot = iconElements.length > 0;
        };
    }
    /**
     * Get the default icon based on variant
     */
    componentWillLoad() {
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-callout');
        }
        warnIfInvalidEnumProp(this.variant, CALLOUT_VARIANTS, 'default', ctx('variant'));
        warnIfInvalidEnumProp(this.appearance, CALLOUT_APPEARANCES, 'soft', ctx('appearance'));
        this._sizeWatcher = watchResponsiveProp(this.size, CALLOUT_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    disconnectedCallback() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    onVariantChange(v) { warnIfInvalidEnumProp(v, CALLOUT_VARIANTS, 'default', ctx('variant')); }
    onAppearanceChange(v) { warnIfInvalidEnumProp(v, CALLOUT_APPEARANCES, 'soft', ctx('appearance')); }
    onSizeChange() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, CALLOUT_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    /**
     * Lifecycle method called before each render
     */
    componentWillRender() {
        this.checkActionsSlot();
        this.checkIconSlot();
    }
    /**
     * Get the CSS classes based on component props
     */
    getCalloutClasses() {
        const classes = [
            'aegov-callout flex items-start gap-4 rounded-sm border-0'
        ];
        const appearance = CALLOUT_APPEARANCES.includes(this.appearance) ? this.appearance : 'soft';
        const variant = CALLOUT_VARIANTS.includes(this.variant) ? this.variant : 'default';
        const size = this._resolvedSize;
        // Size classes (font size + padding)
        const sizeClasses = {
            sm: ['callout-sm', 'text-sm', 'px-4', 'py-3'],
            base: ['callout-base', 'text-base', 'px-5', 'py-4'],
            lg: ['callout-lg', 'text-lg', 'px-6', 'py-5'],
        };
        classes.push(...sizeClasses[size]);
        // Appearance classes
        const appearanceClasses = {
            soft: ['callout-soft'],
            solid: ['callout-solid']
        };
        classes.push(...appearanceClasses[appearance]);
        // Variant classes
        const variantClasses = {
            default: ['callout-default'],
            error: ['callout-error'],
            success: ['callout-success'],
            warning: ['callout-warning'],
            info: ['callout-info']
        };
        classes.push(...variantClasses[variant]);
        return classes.join(' ');
    }
    getIconSizeClass() {
        const size = this._resolvedSize;
        const iconSizes = { sm: 'size-5', base: 'size-6', lg: 'size-7' };
        return iconSizes[size];
    }
    render() {
        if (!this.isVisible) {
            return null;
        }
        const passThroughAttributes = getPassThroughAttributes(this.el, AegovCallout_1.PASS_THROUGH_ATTRS);
        return (h("div", Object.assign({ "data-aegov-callout": true, class: this.getCalloutClasses(), role: "alert", id: this.fieldId }, passThroughAttributes),
            h("div", { class: "callout__icon" }, this.hasIconSlot ? (h("slot", { name: "icon" })) : (getVariantIcon(this.variant, this.getIconSizeClass()))),
            h("div", { class: "callout__content" },
                h("slot", { name: "content" }),
                this.hasActionsSlot && (h("div", { class: "callout__actions" },
                    h("slot", { name: "actions" })))),
            h("div", { class: "callout__right" },
                h("slot", { name: "link" }),
                this.isDismissible && (h("button", { type: "button", onClick: this.handleDismiss, "aria-label": "Close callout" },
                    h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "size-4", width: "20", height: "20", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" },
                        h("path", { d: "M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" })))))));
    }
};
AegovCallout.PASS_THROUGH_ATTRS = new Set();
__decorate([
    Element()
], AegovCallout.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovCallout.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovCallout.prototype, "variant", void 0);
__decorate([
    Prop()
], AegovCallout.prototype, "appearance", void 0);
__decorate([
    Prop()
], AegovCallout.prototype, "size", void 0);
__decorate([
    State()
], AegovCallout.prototype, "_resolvedSize", void 0);
__decorate([
    Prop()
], AegovCallout.prototype, "isDismissible", void 0);
__decorate([
    Event()
], AegovCallout.prototype, "aegovCalloutDismiss", void 0);
__decorate([
    State()
], AegovCallout.prototype, "isVisible", void 0);
__decorate([
    State()
], AegovCallout.prototype, "hasActionsSlot", void 0);
__decorate([
    State()
], AegovCallout.prototype, "hasIconSlot", void 0);
__decorate([
    Watch('variant')
], AegovCallout.prototype, "onVariantChange", null);
__decorate([
    Watch('appearance')
], AegovCallout.prototype, "onAppearanceChange", null);
__decorate([
    Watch('size')
], AegovCallout.prototype, "onSizeChange", null);
AegovCallout = AegovCallout_1 = __decorate([
    Component({
        tag: 'aegov-callout',
        styleUrl: 'aegov-callout.css',
        scoped: false,
        shadow: false
    })
], AegovCallout);
export { AegovCallout };
