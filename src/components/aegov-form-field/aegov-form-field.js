var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Host, h, Prop, Element } from '@stencil/core';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
let AegovFormField = class AegovFormField {
    componentWillLoad() {
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-form-field');
        }
    }
    componentDidLoad() {
        this.linkChildren();
    }
    componentDidUpdate() {
        this.linkChildren();
    }
    linkChildren() {
        const input = this.el.querySelector('aegov-input');
        const textarea = this.el.querySelector('aegov-textarea');
        const label = this.el.querySelector('aegov-label');
        const select = this.el.querySelector('aegov-select');
        const checkbox = this.el.querySelector('aegov-checkbox');
        const range = this.el.querySelector('aegov-range');
        const progress = this.el.querySelector('aegov-progress');
        const otp = this.el.querySelector('aegov-otp');
        if (label) {
            if (input && input.fieldId) {
                label.htmlFor = input.fieldId;
            }
            else if (textarea && textarea.fieldId) {
                label.htmlFor = textarea.fieldId;
            }
            else if (select && select.fieldId) {
                label.htmlFor = select.fieldId;
            }
            else if (checkbox && checkbox.fieldId) {
                label.htmlFor = checkbox.fieldId;
            }
            else if (range && range.fieldId) {
                label.htmlFor = range.fieldId;
            }
            else if (progress && progress.fieldId) {
                label.htmlFor = progress.fieldId;
            }
            else if (otp && otp.fieldId) {
                label.htmlFor = otp.fieldId;
            }
        }
    }
    getFieldClasses() {
        const classes = ['aegov-form-field'];
        if (this.extraClass) {
            classes.push(this.extraClass);
        }
        return classes.join(' ');
    }
    render() {
        const passThroughAttributes = getPassThroughAttributes(this.el);
        return (h(Host, null,
            h("div", Object.assign({ id: this.fieldId, class: this.getFieldClasses() }, passThroughAttributes),
                h("slot", null))));
    }
};
__decorate([
    Element()
], AegovFormField.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovFormField.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovFormField.prototype, "extraClass", void 0);
AegovFormField = __decorate([
    Component({
        tag: 'aegov-form-field',
        styleUrl: 'aegov-form-field.css',
        scoped: false,
        shadow: false,
    })
], AegovFormField);
export { AegovFormField };
