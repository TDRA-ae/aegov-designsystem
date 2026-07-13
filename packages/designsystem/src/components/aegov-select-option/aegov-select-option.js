var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Host, h, Prop, Element, State } from '@stencil/core';
let AegovSelectOption = class AegovSelectOption {
    constructor() {
        /** The value of this option. */
        this.value = '';
        /** Whether this option is disabled. */
        this.isDisabled = false;
        /** Internal: label text captured from slot content. */
        this.slotContent = '';
    }
    componentWillLoad() {
        var _a;
        this.slotContent = ((_a = this.el.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
    }
    render() {
        return (h(Host, { role: "option", "data-value": this.value, "data-label": this.slotContent, "aria-disabled": this.isDisabled ? 'true' : null },
            h("slot", null)));
    }
};
__decorate([
    Element()
], AegovSelectOption.prototype, "el", void 0);
__decorate([
    Prop()
], AegovSelectOption.prototype, "value", void 0);
__decorate([
    Prop()
], AegovSelectOption.prototype, "isDisabled", void 0);
__decorate([
    State()
], AegovSelectOption.prototype, "slotContent", void 0);
AegovSelectOption = __decorate([
    Component({
        tag: 'aegov-select-option',
        styleUrl: 'aegov-select-option.css',
        scoped: false,
        shadow: false,
    })
], AegovSelectOption);
export { AegovSelectOption };
