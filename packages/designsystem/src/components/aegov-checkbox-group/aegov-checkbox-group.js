var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Host, h, Prop, State, Event, Element, Listen, Watch } from '@stencil/core';
import { CHECKBOX_GROUP_VARIANTS, CHECKBOX_GROUP_ORIENTATIONS, CHECKBOX_SIZES } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
const TAG = 'aegov-checkbox-group';
const ctx = (prop) => ({ component: TAG, prop });
let AegovCheckboxGroup = class AegovCheckboxGroup {
    constructor() {
        /** Visual variant for the group layout. */
        this.variant = 'default';
        /** Stack direction for checkbox items. */
        this.orientation = 'vertical';
        /** Size of all checkboxes in the group. Propagated to children. */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
        /** Disables all checkboxes within the group via native fieldset disabled. */
        this.isDisabled = false;
    }
    componentWillLoad() {
        warnIfInvalidEnumProp(this.variant, CHECKBOX_GROUP_VARIANTS, 'default', ctx('variant'));
        warnIfInvalidEnumProp(this.orientation, CHECKBOX_GROUP_ORIENTATIONS, 'vertical', ctx('orientation'));
        this._sizeWatcher = watchResponsiveProp(this.size, CHECKBOX_SIZES, 'base', v => {
            this._resolvedSize = v;
            if (this.el.isConnected) {
                this.syncChildren();
            }
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    componentDidLoad() {
        this.syncChildren();
        this.updateCheckAllState();
    }
    onVariantChange(v) { warnIfInvalidEnumProp(v, CHECKBOX_GROUP_VARIANTS, 'default', ctx('variant')); }
    onOrientationChange(v) { warnIfInvalidEnumProp(v, CHECKBOX_GROUP_ORIENTATIONS, 'vertical', ctx('orientation')); }
    disconnectedCallback() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    onSizeChange() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, CHECKBOX_SIZES, 'base', v => {
            this._resolvedSize = v;
            if (this.el.isConnected) {
                this.syncChildren();
            }
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    syncChildren() {
        const checkboxes = Array.from(this.el.querySelectorAll('aegov-checkbox'));
        checkboxes.forEach(cb => {
            cb.size = this._resolvedSize;
        });
    }
    getRegularCheckboxes() {
        return Array.from(this.el.querySelectorAll('aegov-checkbox')).filter(cb => !cb.isCheckAll);
    }
    getCheckAllCheckbox() {
        return this.el.querySelector('aegov-checkbox[is-check-all]');
    }
    handleCheckboxChange(event) {
        const target = event.target;
        if (target.isCheckAll) {
            this.handleCheckAllToggle(event.detail.checked);
        }
        else {
            this.updateCheckAllState();
        }
        this.emitGroupChange();
    }
    handleCheckAllToggle(checked) {
        const checkboxes = this.getRegularCheckboxes();
        checkboxes.forEach(cb => {
            if (!cb.isDisabled) {
                cb.isChecked = checked;
            }
        });
    }
    updateCheckAllState() {
        const checkAll = this.getCheckAllCheckbox();
        if (!checkAll)
            return;
        const checkboxes = this.getRegularCheckboxes();
        const enabledCheckboxes = checkboxes.filter(cb => !cb.isDisabled);
        const checkedCount = enabledCheckboxes.filter(cb => cb.isChecked).length;
        const total = enabledCheckboxes.length;
        if (total === 0)
            return;
        if (checkedCount === 0) {
            checkAll.isChecked = false;
            checkAll.isIndeterminate = false;
        }
        else if (checkedCount === total) {
            checkAll.isChecked = true;
            checkAll.isIndeterminate = false;
        }
        else {
            checkAll.isChecked = false;
            checkAll.isIndeterminate = true;
        }
    }
    emitGroupChange() {
        const checkboxes = this.getRegularCheckboxes();
        const values = checkboxes
            .filter(cb => cb.isChecked)
            .map(cb => cb.value)
            .filter((v) => v != null);
        this.aegovCheckboxGroupChange.emit({ values });
    }
    getGroupClasses() {
        const classes = ['aegov-checkbox-group'];
        const variant = CHECKBOX_GROUP_VARIANTS.includes(this.variant) ? this.variant : 'default';
        const orientation = CHECKBOX_GROUP_ORIENTATIONS.includes(this.orientation) ? this.orientation : 'vertical';
        if (variant !== 'default') {
            classes.push(`checkbox-group--${variant}`);
        }
        if (orientation === 'horizontal') {
            classes.push('checkbox-group--horizontal');
        }
        if (this.extraClass) {
            classes.push(this.extraClass);
        }
        return classes.join(' ');
    }
    render() {
        return (h(Host, null,
            h("fieldset", { class: this.getGroupClasses(), disabled: this.isDisabled },
                this.label && h("legend", { class: "checkbox-group__legend" }, this.label),
                h("div", { class: "checkbox-group__items" },
                    h("slot", null)))));
    }
};
__decorate([
    Element()
], AegovCheckboxGroup.prototype, "el", void 0);
__decorate([
    Prop()
], AegovCheckboxGroup.prototype, "variant", void 0);
__decorate([
    Prop()
], AegovCheckboxGroup.prototype, "orientation", void 0);
__decorate([
    Prop()
], AegovCheckboxGroup.prototype, "label", void 0);
__decorate([
    Prop()
], AegovCheckboxGroup.prototype, "size", void 0);
__decorate([
    State()
], AegovCheckboxGroup.prototype, "_resolvedSize", void 0);
__decorate([
    Prop()
], AegovCheckboxGroup.prototype, "isDisabled", void 0);
__decorate([
    Prop()
], AegovCheckboxGroup.prototype, "extraClass", void 0);
__decorate([
    Event()
], AegovCheckboxGroup.prototype, "aegovCheckboxGroupChange", void 0);
__decorate([
    Watch('variant')
], AegovCheckboxGroup.prototype, "onVariantChange", null);
__decorate([
    Watch('orientation')
], AegovCheckboxGroup.prototype, "onOrientationChange", null);
__decorate([
    Watch('size')
], AegovCheckboxGroup.prototype, "onSizeChange", null);
__decorate([
    Listen('aegovCheckboxChange')
], AegovCheckboxGroup.prototype, "handleCheckboxChange", null);
AegovCheckboxGroup = __decorate([
    Component({
        tag: 'aegov-checkbox-group',
        styleUrl: 'aegov-checkbox-group.css',
        scoped: false,
        shadow: false,
    })
], AegovCheckboxGroup);
export { AegovCheckboxGroup };
