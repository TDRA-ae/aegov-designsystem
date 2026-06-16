var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AegovCheckbox_1;
import { Component, Host, h, Prop, State, Event, Element, Watch } from '@stencil/core';
import { CHECKBOX_SIZES } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
let AegovCheckbox = AegovCheckbox_1 = class AegovCheckbox {
    constructor() {
        /** Whether the checkbox is checked. */
        this.isChecked = false;
        /** The size of the checkbox. */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
        /** Whether the checkbox is disabled. */
        this.isDisabled = false;
        /** Whether the checkbox is required. */
        this.isRequired = false;
        /** Marks this checkbox as a "check all" controller within a checkbox group. */
        this.isCheckAll = false;
        /** Whether the checkbox is in an indeterminate state. Set by parent group for check-all. */
        this.isIndeterminate = false;
        this.handleChange = (event) => {
            const input = event.target;
            this.isChecked = input.checked;
            this.isIndeterminate = false;
            this.aegovCheckboxChange.emit({ checked: this.isChecked, value: this.value });
        };
    }
    componentWillLoad() {
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-checkbox');
        }
        this._sizeWatcher = watchResponsiveProp(this.size, CHECKBOX_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    disconnectedCallback() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    onSizeChange() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, CHECKBOX_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    componentDidRender() {
        if (this.inputEl) {
            this.inputEl.indeterminate = this.isIndeterminate;
        }
    }
    onIndeterminateChange() {
        if (this.inputEl) {
            this.inputEl.indeterminate = this.isIndeterminate;
        }
    }
    render() {
        const passThroughAttrs = getPassThroughAttributes(this.el, AegovCheckbox_1.PASS_THROUGH_ATTRS);
        const wrapperClasses = ['aegov-checkbox', `checkbox--${this._resolvedSize}`];
        if (this.extraClass)
            wrapperClasses.push(this.extraClass);
        const descriptionId = this.description ? `${this.fieldId}-desc` : undefined;
        const checkboxInput = (h("input", Object.assign({ ref: (el) => this.inputEl = el, type: "checkbox", id: this.fieldId, name: this.name, value: this.value, checked: this.isChecked, disabled: this.isDisabled, required: this.isRequired, "aria-required": this.isRequired ? 'true' : undefined, "aria-describedby": descriptionId, onChange: this.handleChange }, passThroughAttrs)));
        if (this.label) {
            return (h(Host, null,
                h("div", { class: wrapperClasses.join(' ') },
                    h("label", { class: "checkbox__wrapper" },
                        checkboxInput,
                        h("span", { class: "checkbox__text" },
                            h("span", { class: "checkbox__label-text" }, this.label),
                            this.description && (h("span", { id: descriptionId, class: "checkbox__description" }, this.description)))))));
        }
        return (h(Host, null,
            h("div", { class: wrapperClasses.join(' ') }, checkboxInput)));
    }
};
AegovCheckbox.PASS_THROUGH_ATTRS = new Set([
    'form', 'tabindex', 'autofocus', 'title',
]);
__decorate([
    Element()
], AegovCheckbox.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovCheckbox.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovCheckbox.prototype, "name", void 0);
__decorate([
    Prop()
], AegovCheckbox.prototype, "value", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovCheckbox.prototype, "isChecked", void 0);
__decorate([
    Prop()
], AegovCheckbox.prototype, "size", void 0);
__decorate([
    State()
], AegovCheckbox.prototype, "_resolvedSize", void 0);
__decorate([
    Prop({ reflect: true })
], AegovCheckbox.prototype, "isDisabled", void 0);
__decorate([
    Prop()
], AegovCheckbox.prototype, "isRequired", void 0);
__decorate([
    Prop()
], AegovCheckbox.prototype, "label", void 0);
__decorate([
    Prop()
], AegovCheckbox.prototype, "description", void 0);
__decorate([
    Prop({ reflect: true })
], AegovCheckbox.prototype, "isCheckAll", void 0);
__decorate([
    Prop({ mutable: true })
], AegovCheckbox.prototype, "isIndeterminate", void 0);
__decorate([
    Prop()
], AegovCheckbox.prototype, "extraClass", void 0);
__decorate([
    Event()
], AegovCheckbox.prototype, "aegovCheckboxChange", void 0);
__decorate([
    Watch('size')
], AegovCheckbox.prototype, "onSizeChange", null);
__decorate([
    Watch('isIndeterminate')
], AegovCheckbox.prototype, "onIndeterminateChange", null);
AegovCheckbox = AegovCheckbox_1 = __decorate([
    Component({
        tag: 'aegov-checkbox',
        styleUrl: 'aegov-checkbox.css',
        scoped: false,
        shadow: false,
    })
], AegovCheckbox);
export { AegovCheckbox };
