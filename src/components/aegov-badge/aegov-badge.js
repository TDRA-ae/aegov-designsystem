var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Element, Prop, Watch, State, Event, h, Host } from '@stencil/core';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import { BADGE_APPEARANCES, BADGE_COLORS, BADGE_SIZES } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { generateId } from '../../utils/id-generator';
import { getPassThroughAttributes } from '../../utils/attributes';
const TAG = 'aegov-badge';
const ctx = (prop) => ({ component: TAG, prop });
/**
 * @slot default - The main content of the badge
 */
let AegovBadge = class AegovBadge {
    constructor() {
        /**
         * The appearance style of the badge.
         * @default 'soft'
         */
        this.appearance = 'soft';
        /**
         * The color variant of the badge.
         * @default 'default'
         */
        this.color = 'default';
        /**
         * Whether the badge can be dismissed/closed.
         * @default false
         */
        this.isDismissible = false;
        /**
         * The badge size
         * @default 'base'
         */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
        /**
         * Handle dismiss button click
         */
        this.handleBadgeDismissClick = (event) => {
            event.stopPropagation();
            this.aegovBadgeDismiss.emit();
        };
    }
    componentWillLoad() {
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-badge');
        }
        warnIfInvalidEnumProp(this.appearance, BADGE_APPEARANCES, 'soft', ctx('appearance'));
        warnIfInvalidEnumProp(this.color, BADGE_COLORS, 'default', ctx('color'));
        this._sizeWatcher = watchResponsiveProp(this.size, BADGE_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    disconnectedCallback() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    onAppearanceChange(v) { warnIfInvalidEnumProp(v, BADGE_APPEARANCES, 'soft', ctx('appearance')); }
    onColorChange(v) { warnIfInvalidEnumProp(v, BADGE_COLORS, 'default', ctx('color')); }
    onSizeChange() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, BADGE_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    /**
     * Get the CSS classes based on component props
     */
    getBadgeClasses() {
        const classes = [
            'aegov-badge'
        ];
        // Size classes (includes vertical padding)
        const sizeClasses = {
            sm: ['text-xs', 'py-0.5', 'px-1.5', 'rounded-sm'],
            base: ['text-sm', 'py-0.5', 'px-1.5', 'rounded-md'],
            lg: ['text-sm', 'py-1', 'px-2', 'rounded-md', 'font-medium']
        };
        const size = this._resolvedSize;
        classes.push(...sizeClasses[size]);
        // Appearance classes
        const appearanceClasses = {
            soft: ['badge-soft'],
            solid: ['badge-solid']
        };
        const appearance = BADGE_APPEARANCES.includes(this.appearance) ? this.appearance : 'soft';
        classes.push(...appearanceClasses[appearance]);
        // Color classes
        const colorClasses = {
            default: ['badge-default'],
            primary: ['badge-primary'],
            secondary: ['badge-secondary'],
            aegold: ['badge-aegold'],
            aered: ['badge-aered'],
            aegreen: ['badge-aegreen'],
            aeblack: ['badge-aeblack'],
            techblue: ['badge-techblue'],
            seablue: ['badge-seablue'],
            camel: ['badge-camel'],
            desert: ['badge-desert'],
            fuchsia: ['badge-fuchsia'],
            slate: ['badge-slate'],
            purple: ['badge-purple'],
            pink: ['badge-pink'],
            indigo: ['badge-indigo'],
            lime: ['badge-lime']
        };
        const color = BADGE_COLORS.includes(this.color) ? this.color : 'default';
        classes.push(...colorClasses[color]);
        return classes.join(' ');
    }
    render() {
        const passThroughAttributes = getPassThroughAttributes(this.el);
        return (h(Host, null,
            h("span", Object.assign({}, passThroughAttributes, { class: this.getBadgeClasses(), id: this.fieldId }),
                h("slot", null),
                this.isDismissible && (h("button", { type: "button", class: "badge-dismiss", onClick: this.handleBadgeDismissClick, "aria-label": "Badge dismiss button" },
                    h("svg", { class: "size-3", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" },
                        h("path", { d: "M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" })))))));
    }
};
__decorate([
    Element()
], AegovBadge.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovBadge.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovBadge.prototype, "appearance", void 0);
__decorate([
    Prop()
], AegovBadge.prototype, "color", void 0);
__decorate([
    Prop()
], AegovBadge.prototype, "isDismissible", void 0);
__decorate([
    Prop()
], AegovBadge.prototype, "size", void 0);
__decorate([
    State()
], AegovBadge.prototype, "_resolvedSize", void 0);
__decorate([
    Event()
], AegovBadge.prototype, "aegovBadgeDismiss", void 0);
__decorate([
    Watch('appearance')
], AegovBadge.prototype, "onAppearanceChange", null);
__decorate([
    Watch('color')
], AegovBadge.prototype, "onColorChange", null);
__decorate([
    Watch('size')
], AegovBadge.prototype, "onSizeChange", null);
AegovBadge = __decorate([
    Component({
        tag: 'aegov-badge',
        styleUrl: 'aegov-badge.css',
        scoped: false,
    })
], AegovBadge);
export { AegovBadge };
