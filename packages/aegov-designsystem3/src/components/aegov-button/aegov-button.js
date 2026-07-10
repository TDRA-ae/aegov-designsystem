var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, Watch, State, Event, Element, h, Host } from '@stencil/core';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import { BUTTON_APPEARANCES, BUTTON_GROUP_ORIENTATIONS, BUTTON_GROUP_POSITIONS, BUTTON_SIZES, BUTTON_TYPES, BUTTON_VARIANTS, } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { generateId } from '../../utils/id-generator';
const TAG = 'aegov-button';
const ctx = (prop) => ({ component: TAG, prop });
/**
 * @slot - Button content
 * @part button - The native button element
 */
let AegovButton = class AegovButton {
    constructor() {
        /**
         * The button variant (color scheme)
         * @default 'primary'
         */
        this.variant = 'primary';
        /**
         * The button size
         * @default 'base'
         */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
        /**
         * The button type attribute
         * @default 'button'
         */
        this.type = 'button';
        /**
         * The button appearance (visual style)
         * @default 'solid'
         */
        this.appearance = 'solid';
        /**
         * Whether the button is disabled
         * @default false
         */
        this.isDisabled = false;
        /**
         * Whether the button is only an icon
         * @default false
         */
        this.isIcon = false;
        /**
         * Whether the button should take full width
         * @default false
         */
        this.isFull = false;
        /**
         * Whether the button should have bold text or not
         * @default true
         */
        this.isBold = true;
        /**
         * Whether the button is in a loading state
         * @default false
         */
        this.isLoading = false;
        this.handleClick = (event) => {
            if (!this.isDisabled && !this.isLoading) {
                this.aegovButtonClick.emit(event);
            }
        };
        this.handleFocus = (event) => {
            this.aegovButtonFocus.emit(event);
        };
        this.handleBlur = (event) => {
            this.aegovButtonBlur.emit(event);
        };
    }
    componentWillLoad() {
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-button');
        }
        warnIfInvalidEnumProp(this.variant, BUTTON_VARIANTS, 'primary', ctx('variant'));
        warnIfInvalidEnumProp(this.type, BUTTON_TYPES, 'button', ctx('type'));
        warnIfInvalidEnumProp(this.appearance, BUTTON_APPEARANCES, 'solid', ctx('appearance'));
        if (this.groupPosition !== undefined) {
            warnIfInvalidEnumProp(this.groupPosition, BUTTON_GROUP_POSITIONS, 'single', ctx('groupPosition'));
        }
        if (this.groupOrientation !== undefined) {
            warnIfInvalidEnumProp(this.groupOrientation, BUTTON_GROUP_ORIENTATIONS, 'horizontal', ctx('groupOrientation'));
        }
        this._sizeWatcher = watchResponsiveProp(this.size, BUTTON_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    disconnectedCallback() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    onVariantChange(v) { warnIfInvalidEnumProp(v, BUTTON_VARIANTS, 'primary', ctx('variant')); }
    onSizeChange() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, BUTTON_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    onTypeChange(v) { warnIfInvalidEnumProp(v, BUTTON_TYPES, 'button', ctx('type')); }
    onAppearanceChange(v) { warnIfInvalidEnumProp(v, BUTTON_APPEARANCES, 'solid', ctx('appearance')); }
    onGroupPositionChange(v) {
        if (v === undefined)
            return;
        warnIfInvalidEnumProp(v, BUTTON_GROUP_POSITIONS, 'single', ctx('groupPosition'));
    }
    onGroupOrientationChange(v) {
        if (v === undefined)
            return;
        warnIfInvalidEnumProp(v, BUTTON_GROUP_ORIENTATIONS, 'horizontal', ctx('groupOrientation'));
    }
    /**
     * Get the CSS classes based on component props
     */
    getButtonClasses() {
        const classes = [
            'aegov-btn relative inline-flex shrink-0 cursor-pointer select-none flex-wrap items-center justify-center whitespace-nowrap no-underline transition-all duration-200 ease-in-out focus-visible:outline-2  disabled:cursor-default disabled:pointer-events-none disabled:cursor-not-allowed'
        ];
        const size = this._resolvedSize;
        const variant = BUTTON_VARIANTS.includes(this.variant) ? this.variant : 'primary';
        const appearance = BUTTON_APPEARANCES.includes(this.appearance) ? this.appearance : 'solid';
        // Size classes
        const sizeClasses = {
            xs: ['btn-xs', 'h-9', 'rounded-md', 'gap-1.5', 'px-2.5', 'text-sm'],
            sm: ['btn-sm', 'h-10', 'rounded-md', 'gap-2', 'px-3', 'text-base'],
            base: ['btn-base', 'h-11', 'rounded-md', 'gap-2', 'px-3.5', 'text-base'],
            lg: ['btn-lg', 'h-12', 'rounded-lg', 'gap-3', 'px-4', 'text-lg'],
            xl: ['btn-lg', 'h-13', 'rounded-lg', 'gap-3', 'px-4.5', 'text-lg']
        };
        classes.push(...sizeClasses[size]);
        const variantClasses = {
            primary: ['btn-primary', 'outline-primary-support-600'],
            secondary: ['btn-secondary', 'outline-secondary-support-600'],
            danger: ['btn-danger', 'outline-camel-600'],
            neutralMin: ['btn-neutral-min', 'outline-seablue-600'],
            neutralMax: ['btn-neutral-max', 'outline-seablue-600']
        };
        classes.push(...variantClasses[variant]);
        const appearanceClasses = {
            solid: ['btn-solid', 'shadow-[inset_0px_1px_--theme(--color-whitely-50/.2)]', 'text-whitely-50', 'border-1', 'focus-visible:outline-offset-2', 'disabled:opacity-30'],
            outline: ['btn-outline', 'bg-transparent', 'border-2', 'focus-visible:outline-offset-0', 'disabled:opacity-50'],
            soft: ['btn-soft', 'border-0', 'focus-visible:outline-offset-2', 'disabled:opacity-50'],
            link: ['btn-link', 'bg-transparent', 'border-0', 'hover:underline', 'focus-visible:outline-offset-2', 'disabled:opacity-50']
        };
        classes.push(...appearanceClasses[appearance]);
        // Disabled state
        if (this.isDisabled || this.isLoading) {
            classes.push('cursor-not-allowed', 'pointer-events-none');
        }
        // Icon only button
        if (this.isIcon) {
            classes.push('btn-icon');
        }
        // Full width
        if (this.isFull) {
            classes.push('w-full');
        }
        // bold management
        if (this.isBold) {
            classes.push('font-semibold');
        }
        // Button group styling
        const groupOrientation = BUTTON_GROUP_ORIENTATIONS.includes(this.groupOrientation)
            ? this.groupOrientation
            : undefined;
        const groupPosition = BUTTON_GROUP_POSITIONS.includes(this.groupPosition)
            ? this.groupPosition
            : undefined;
        if (groupPosition && groupOrientation) {
            classes.push(`btn-grouped-${groupOrientation}`);
            if (groupPosition === 'single') {
                classes.push('btn-grouped-single');
            }
            else {
                classes.push(`btn-grouped-${groupPosition}-${groupOrientation}`);
            }
        }
        return classes.join(' ');
    }
    render() {
        const passThroughAttributes = getPassThroughAttributes(this.el);
        const type = BUTTON_TYPES.includes(this.type) ? this.type : 'button';
        return (h(Host, null,
            h("button", Object.assign({ part: "button", id: this.fieldId, type: type, class: this.getButtonClasses(), disabled: this.isDisabled || this.isLoading, onClick: this.handleClick, onFocus: this.handleFocus, onBlur: this.handleBlur, "aria-disabled": this.isDisabled || this.isLoading ? 'true' : 'false', "aria-busy": this.isLoading ? 'true' : 'false' }, passThroughAttributes),
                this.isLoading && (h("svg", { class: "mr-1 -ml-1 size-4! animate-spin text-whitely-50", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" },
                    h("circle", { class: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", "stroke-width": "4" }),
                    h("path", { class: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }))),
                h("slot", null))));
    }
};
__decorate([
    Element()
], AegovButton.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovButton.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovButton.prototype, "variant", void 0);
__decorate([
    Prop()
], AegovButton.prototype, "size", void 0);
__decorate([
    State()
], AegovButton.prototype, "_resolvedSize", void 0);
__decorate([
    Prop()
], AegovButton.prototype, "type", void 0);
__decorate([
    Prop()
], AegovButton.prototype, "appearance", void 0);
__decorate([
    Prop()
], AegovButton.prototype, "isDisabled", void 0);
__decorate([
    Prop()
], AegovButton.prototype, "isIcon", void 0);
__decorate([
    Prop()
], AegovButton.prototype, "isFull", void 0);
__decorate([
    Prop()
], AegovButton.prototype, "isBold", void 0);
__decorate([
    Prop()
], AegovButton.prototype, "isLoading", void 0);
__decorate([
    Prop()
], AegovButton.prototype, "groupPosition", void 0);
__decorate([
    Prop()
], AegovButton.prototype, "groupOrientation", void 0);
__decorate([
    Event()
], AegovButton.prototype, "aegovButtonClick", void 0);
__decorate([
    Event()
], AegovButton.prototype, "aegovButtonFocus", void 0);
__decorate([
    Event()
], AegovButton.prototype, "aegovButtonBlur", void 0);
__decorate([
    Watch('variant')
], AegovButton.prototype, "onVariantChange", null);
__decorate([
    Watch('size')
], AegovButton.prototype, "onSizeChange", null);
__decorate([
    Watch('type')
], AegovButton.prototype, "onTypeChange", null);
__decorate([
    Watch('appearance')
], AegovButton.prototype, "onAppearanceChange", null);
__decorate([
    Watch('groupPosition')
], AegovButton.prototype, "onGroupPositionChange", null);
__decorate([
    Watch('groupOrientation')
], AegovButton.prototype, "onGroupOrientationChange", null);
AegovButton = __decorate([
    Component({
        tag: 'aegov-button',
        styleUrl: 'aegov-button.css',
        scoped: false,
        shadow: false
    })
], AegovButton);
export { AegovButton };
