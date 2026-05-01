var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Host, h, Prop, Element } from '@stencil/core';
/**
 * A separator component for visually dividing sections of content
 *
 * @slot - Optional text label displayed at the center of the separator
 */
let AegovSeparator = class AegovSeparator {
    constructor() {
        /**
         * Orientation of the separator
         * @default 'horizontal'
         */
        this.orientation = 'horizontal';
        /**
         * Visual appearance of the separator
         * @default 'default'
         */
        this.appearance = 'default';
        /**
         * Whether the separator is purely decorative (no semantic meaning)
         * @default true
         */
        this.isDecorative = true;
    }
    render() {
        var _a;
        const hasText = this.text || ((_a = this.el.textContent) === null || _a === void 0 ? void 0 : _a.trim());
        const classes = Object.assign({ 'aegov-separator': true, 'separator--horizontal': this.orientation === 'horizontal', 'separator--vertical': this.orientation === 'vertical', 'separator--subtle': this.appearance === 'subtle', 'separator--with-text': !!hasText }, (this.extraClass ? { [this.extraClass]: true } : {}));
        // If decorative, use presentational role, otherwise use separator role
        const role = this.isDecorative ? 'presentation' : 'separator';
        const ariaOrientation = this.orientation;
        if (hasText) {
            return (h(Host, null,
                h("div", { class: classes, role: role, "aria-orientation": ariaOrientation },
                    h("div", { class: "separator__line" }),
                    h("span", { class: "separator__text" }, this.text || h("slot", null)),
                    h("div", { class: "separator__line" }))));
        }
        return (h(Host, null,
            h("hr", { class: classes, role: role, "aria-orientation": ariaOrientation })));
    }
};
__decorate([
    Element()
], AegovSeparator.prototype, "el", void 0);
__decorate([
    Prop()
], AegovSeparator.prototype, "orientation", void 0);
__decorate([
    Prop()
], AegovSeparator.prototype, "appearance", void 0);
__decorate([
    Prop()
], AegovSeparator.prototype, "text", void 0);
__decorate([
    Prop()
], AegovSeparator.prototype, "isDecorative", void 0);
__decorate([
    Prop()
], AegovSeparator.prototype, "extraClass", void 0);
AegovSeparator = __decorate([
    Component({
        tag: 'aegov-separator',
        styleUrl: 'aegov-separator.css',
        scoped: false,
    })
], AegovSeparator);
export { AegovSeparator };
