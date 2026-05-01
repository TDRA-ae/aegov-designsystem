var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Host, h, Prop, Element } from '@stencil/core';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
let AegovLabel = class AegovLabel {
    componentWillLoad() {
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-label');
        }
    }
    getLabelClasses() {
        const classes = ['aegov-label'];
        if (this.extraClass) {
            classes.push(this.extraClass);
        }
        return classes.join(' ');
    }
    render() {
        const passThroughAttributes = getPassThroughAttributes(this.el);
        return (h(Host, null,
            h("label", Object.assign({ id: this.fieldId, for: this.htmlFor, class: this.getLabelClasses() }, passThroughAttributes),
                h("slot", null))));
    }
};
__decorate([
    Element()
], AegovLabel.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovLabel.prototype, "fieldId", void 0);
__decorate([
    Prop({ mutable: true, attribute: 'for' })
], AegovLabel.prototype, "htmlFor", void 0);
__decorate([
    Prop()
], AegovLabel.prototype, "extraClass", void 0);
AegovLabel = __decorate([
    Component({
        tag: 'aegov-label',
        styleUrl: 'aegov-label.css',
        scoped: false,
        shadow: false,
    })
], AegovLabel);
export { AegovLabel };
