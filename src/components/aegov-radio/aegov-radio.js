var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AegovRadio_1;
import { Component, Host, h, Prop, State, Watch, Event, Element } from '@stencil/core';
import { RADIO_SIZES } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
let AegovRadio = AegovRadio_1 = class AegovRadio {
    constructor() {
        /** Whether the radio is checked. */
        this.isChecked = false;
        /** The size of the radio. */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
        /** Whether the radio is disabled. */
        this.isDisabled = false;
        /** Whether the radio is required. */
        this.isRequired = false;
        this.handleChange = (event) => {
            const input = event.target;
            this.isChecked = input.checked;
            this.aegovRadioChange.emit({ checked: this.isChecked, value: this.value });
        };
    }
    componentWillLoad() {
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-radio');
        }
        this._sizeWatcher = watchResponsiveProp(this.size, RADIO_SIZES, 'base', v => {
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
        this._sizeWatcher = watchResponsiveProp(this.size, RADIO_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    render() {
        const passThroughAttrs = getPassThroughAttributes(this.el, AegovRadio_1.PASS_THROUGH_ATTRS);
        const wrapperClasses = ['aegov-radio', `radio--${this._resolvedSize}`];
        if (this.extraClass)
            wrapperClasses.push(this.extraClass);
        const descriptionId = this.description ? `${this.fieldId}-desc` : undefined;
        const radioInput = (h("input", Object.assign({ type: "radio", id: this.fieldId, name: this.name, value: this.value, checked: this.isChecked, disabled: this.isDisabled, required: this.isRequired, "aria-required": this.isRequired ? 'true' : undefined, "aria-describedby": descriptionId, onChange: this.handleChange }, passThroughAttrs)));
        if (this.label) {
            return (h(Host, null,
                h("div", { class: wrapperClasses.join(' ') },
                    h("label", { class: "radio__wrapper" },
                        radioInput,
                        h("span", { class: "radio__text" },
                            h("span", { class: "radio__label-text" }, this.label),
                            this.description && (h("span", { id: descriptionId, class: "radio__description" }, this.description)))))));
        }
        return (h(Host, null,
            h("div", { class: wrapperClasses.join(' ') }, radioInput)));
    }
};
AegovRadio.PASS_THROUGH_ATTRS = new Set([
    'form', 'tabindex', 'autofocus', 'title',
]);
__decorate([
    Element()
], AegovRadio.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovRadio.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovRadio.prototype, "name", void 0);
__decorate([
    Prop()
], AegovRadio.prototype, "value", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovRadio.prototype, "isChecked", void 0);
__decorate([
    Prop()
], AegovRadio.prototype, "size", void 0);
__decorate([
    State()
], AegovRadio.prototype, "_resolvedSize", void 0);
__decorate([
    Prop({ reflect: true })
], AegovRadio.prototype, "isDisabled", void 0);
__decorate([
    Prop()
], AegovRadio.prototype, "isRequired", void 0);
__decorate([
    Prop()
], AegovRadio.prototype, "label", void 0);
__decorate([
    Prop()
], AegovRadio.prototype, "description", void 0);
__decorate([
    Prop()
], AegovRadio.prototype, "extraClass", void 0);
__decorate([
    Event()
], AegovRadio.prototype, "aegovRadioChange", void 0);
__decorate([
    Watch('size')
], AegovRadio.prototype, "onSizeChange", null);
AegovRadio = AegovRadio_1 = __decorate([
    Component({
        tag: 'aegov-radio',
        styleUrl: 'aegov-radio.css',
        scoped: false,
        shadow: false,
    })
], AegovRadio);
export { AegovRadio };
