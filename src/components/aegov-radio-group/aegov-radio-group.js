var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Host, h, Prop, State, Event, Element, Listen, Watch } from '@stencil/core';
import { RADIO_GROUP_VARIANTS, RADIO_GROUP_ORIENTATIONS, RADIO_SIZES } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
const TAG = 'aegov-radio-group';
const ctx = (prop) => ({ component: TAG, prop });
let AegovRadioGroup = class AegovRadioGroup {
    constructor() {
        /** Visual variant for the group layout. */
        this.variant = 'default';
        /** Stack direction for radio items. */
        this.orientation = 'vertical';
        /** Size of all radios in the group. Propagated to children. */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
        /** Disables all radios within the group via native fieldset disabled. */
        this.isDisabled = false;
    }
    componentWillLoad() {
        warnIfInvalidEnumProp(this.variant, RADIO_GROUP_VARIANTS, 'default', ctx('variant'));
        warnIfInvalidEnumProp(this.orientation, RADIO_GROUP_ORIENTATIONS, 'vertical', ctx('orientation'));
        this._sizeWatcher = watchResponsiveProp(this.size, RADIO_SIZES, 'base', v => {
            this._resolvedSize = v;
            if (this.el.isConnected) {
                this.syncChildren();
            }
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    componentDidLoad() {
        this.syncChildren();
    }
    onVariantChange(v) { warnIfInvalidEnumProp(v, RADIO_GROUP_VARIANTS, 'default', ctx('variant')); }
    onOrientationChange(v) { warnIfInvalidEnumProp(v, RADIO_GROUP_ORIENTATIONS, 'vertical', ctx('orientation')); }
    disconnectedCallback() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    onSizeChange() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, RADIO_SIZES, 'base', v => {
            this._resolvedSize = v;
            if (this.el.isConnected) {
                this.syncChildren();
            }
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    onNameChange() {
        this.syncChildren();
    }
    syncChildren() {
        const radios = this.getRadios();
        radios.forEach(radio => {
            radio.size = this._resolvedSize;
            radio.name = this.name;
        });
    }
    getRadios() {
        return Array.from(this.el.querySelectorAll('aegov-radio'));
    }
    handleRadioChange(event) {
        const target = event.target;
        if (event.detail.checked) {
            // Uncheck all other radios (sync Stencil state; native radio handles DOM)
            const radios = this.getRadios();
            radios.forEach(radio => {
                if (radio !== target) {
                    radio.isChecked = false;
                }
            });
        }
        this.aegovRadioGroupChange.emit({ value: event.detail.checked ? event.detail.value : undefined });
    }
    getGroupClasses() {
        const classes = ['aegov-radio-group'];
        const variant = RADIO_GROUP_VARIANTS.includes(this.variant) ? this.variant : 'default';
        const orientation = RADIO_GROUP_ORIENTATIONS.includes(this.orientation) ? this.orientation : 'vertical';
        if (variant !== 'default') {
            classes.push(`radio-group--${variant}`);
        }
        if (orientation === 'horizontal') {
            classes.push('radio-group--horizontal');
        }
        if (this.extraClass) {
            classes.push(this.extraClass);
        }
        return classes.join(' ');
    }
    render() {
        return (h(Host, null,
            h("fieldset", { class: this.getGroupClasses(), role: "radiogroup", disabled: this.isDisabled },
                this.label && h("legend", { class: "radio-group__legend" }, this.label),
                h("div", { class: "radio-group__items" },
                    h("slot", null)))));
    }
};
__decorate([
    Element()
], AegovRadioGroup.prototype, "el", void 0);
__decorate([
    Prop()
], AegovRadioGroup.prototype, "variant", void 0);
__decorate([
    Prop()
], AegovRadioGroup.prototype, "orientation", void 0);
__decorate([
    Prop()
], AegovRadioGroup.prototype, "label", void 0);
__decorate([
    Prop()
], AegovRadioGroup.prototype, "size", void 0);
__decorate([
    State()
], AegovRadioGroup.prototype, "_resolvedSize", void 0);
__decorate([
    Prop()
], AegovRadioGroup.prototype, "name", void 0);
__decorate([
    Prop()
], AegovRadioGroup.prototype, "isDisabled", void 0);
__decorate([
    Prop()
], AegovRadioGroup.prototype, "extraClass", void 0);
__decorate([
    Event()
], AegovRadioGroup.prototype, "aegovRadioGroupChange", void 0);
__decorate([
    Watch('variant')
], AegovRadioGroup.prototype, "onVariantChange", null);
__decorate([
    Watch('orientation')
], AegovRadioGroup.prototype, "onOrientationChange", null);
__decorate([
    Watch('size')
], AegovRadioGroup.prototype, "onSizeChange", null);
__decorate([
    Watch('name')
], AegovRadioGroup.prototype, "onNameChange", null);
__decorate([
    Listen('aegovRadioChange')
], AegovRadioGroup.prototype, "handleRadioChange", null);
AegovRadioGroup = __decorate([
    Component({
        tag: 'aegov-radio-group',
        styleUrl: 'aegov-radio-group.css',
        scoped: false,
        shadow: false,
    })
], AegovRadioGroup);
export { AegovRadioGroup };
