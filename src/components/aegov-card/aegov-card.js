var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Element, Host, h, Prop, Watch } from '@stencil/core';
import { CARD_BORDER_STYLES, CARD_BGS, CARD_HOVERS, CARD_SIZES } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { generateId } from '../../utils/id-generator';
import { getPassThroughAttributes } from '../../utils/attributes';
const TAG = 'aegov-card';
const ctx = (prop) => ({ component: TAG, prop });
let AegovCard = class AegovCard {
    constructor() {
        /**
         * Whether to apply inner padding (1.5rem / 24px). On by default.
         */
        this.isPadding = true;
        /**
         * Border thickness: 1, 2, or 3.
         */
        this.borderWidth = 2;
        /**
         * Border style: 'standard' (solid primary-600), 'light' (solid primary-200), 'creative' (gradient from primary-400 to primary-800), or 'highlight' (solid aeblack-200 at rest, transitions to primary-300→700 gradient on hover).
         */
        this.borderStyle = 'standard';
        /**
         * Background style: 'white' (default) or 'subtle' (aeblack-50).
         */
        this.bg = 'white';
        /**
         * Hover effect: 'off' (none), 'standard' (border color change), or 'glow' (shadow glow).
         */
        this.hover = 'off';
        /**
         * Size: 'sm' (compact padding/radius), 'base' (default), or 'lg' (generous padding/radius). All sizes scale down responsively at md (768px) and xs (480px) breakpoints.
         */
        this.size = 'base';
    }
    componentWillLoad() {
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-card');
        }
        warnIfInvalidEnumProp(this.borderStyle, CARD_BORDER_STYLES, 'standard', ctx('borderStyle'));
        warnIfInvalidEnumProp(this.bg, CARD_BGS, 'white', ctx('bg'));
        warnIfInvalidEnumProp(this.hover, CARD_HOVERS, 'off', ctx('hover'));
        warnIfInvalidEnumProp(this.size, CARD_SIZES, 'base', ctx('size'));
    }
    onBorderStyleChange(v) { warnIfInvalidEnumProp(v, CARD_BORDER_STYLES, 'standard', ctx('borderStyle')); }
    onBgChange(v) { warnIfInvalidEnumProp(v, CARD_BGS, 'white', ctx('bg')); }
    onHoverChange(v) { warnIfInvalidEnumProp(v, CARD_HOVERS, 'off', ctx('hover')); }
    onSizeChange(v) { warnIfInvalidEnumProp(v, CARD_SIZES, 'base', ctx('size')); }
    render() {
        const borderStyle = CARD_BORDER_STYLES.includes(this.borderStyle) ? this.borderStyle : 'standard';
        const bg = CARD_BGS.includes(this.bg) ? this.bg : 'white';
        const hover = CARD_HOVERS.includes(this.hover) ? this.hover : 'off';
        const size = CARD_SIZES.includes(this.size) ? this.size : 'base';
        const classes = [
            'aegov-card',
            `card-border-${this.borderWidth}`,
            `card-border-${borderStyle}`,
            `card-bg-${bg}`,
            `card__hover-${hover}`,
            `card-size-${size}`,
            this.isPadding ? 'card--padded' : '',
        ].filter(Boolean).join(' ');
        const passThroughAttributes = getPassThroughAttributes(this.el);
        return (h(Host, null,
            h("div", Object.assign({}, passThroughAttributes, { class: classes, id: this.fieldId }),
                h("slot", null))));
    }
};
__decorate([
    Element()
], AegovCard.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovCard.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovCard.prototype, "isPadding", void 0);
__decorate([
    Prop()
], AegovCard.prototype, "borderWidth", void 0);
__decorate([
    Prop()
], AegovCard.prototype, "borderStyle", void 0);
__decorate([
    Prop()
], AegovCard.prototype, "bg", void 0);
__decorate([
    Prop()
], AegovCard.prototype, "hover", void 0);
__decorate([
    Prop()
], AegovCard.prototype, "size", void 0);
__decorate([
    Watch('borderStyle')
], AegovCard.prototype, "onBorderStyleChange", null);
__decorate([
    Watch('bg')
], AegovCard.prototype, "onBgChange", null);
__decorate([
    Watch('hover')
], AegovCard.prototype, "onHoverChange", null);
__decorate([
    Watch('size')
], AegovCard.prototype, "onSizeChange", null);
AegovCard = __decorate([
    Component({
        tag: 'aegov-card',
        styleUrl: 'aegov-card.css',
        scoped: false,
    })
], AegovCard);
export { AegovCard };
