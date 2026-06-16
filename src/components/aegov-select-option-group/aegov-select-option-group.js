var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Host, h, Prop } from '@stencil/core';
let AegovSelectOptionGroup = class AegovSelectOptionGroup {
    constructor() {
        /** The label for this option group. */
        this.label = '';
    }
    render() {
        return (h(Host, { role: "group", "aria-label": this.label, "data-group-label": this.label },
            h("slot", null)));
    }
};
__decorate([
    Prop()
], AegovSelectOptionGroup.prototype, "label", void 0);
AegovSelectOptionGroup = __decorate([
    Component({
        tag: 'aegov-select-option-group',
        styleUrl: 'aegov-select-option-group.css',
        scoped: false,
        shadow: false,
    })
], AegovSelectOptionGroup);
export { AegovSelectOptionGroup };
