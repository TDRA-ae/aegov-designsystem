var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AegovToggle_1;
import { Component, Host, h, Prop, Watch, State, Event, Element } from '@stencil/core';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import { TOGGLE_SIZES } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
let AegovToggle = AegovToggle_1 = class AegovToggle {
    constructor() {
        /** Whether the toggle is checked/on. */
        this.isChecked = false;
        /** The size of the toggle. */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
        /** Whether the toggle is disabled. */
        this.isDisabled = false;
        /** Whether the toggle is required. */
        this.isRequired = false;
        this.handleChange = (event) => {
            const input = event.target;
            this.isChecked = input.checked;
            this.aegovToggleChange.emit({ checked: this.isChecked, value: this.value });
        };
    }
    componentWillLoad() {
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-toggle');
        }
        this._sizeWatcher = watchResponsiveProp(this.size, TOGGLE_SIZES, 'base', v => {
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
        this._sizeWatcher = watchResponsiveProp(this.size, TOGGLE_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    render() {
        const passThroughAttrs = getPassThroughAttributes(this.el, AegovToggle_1.PASS_THROUGH_ATTRS);
        const size = this._resolvedSize;
        const wrapperClasses = ['aegov-toggle', `toggle--${size}`];
        const descriptionId = this.description ? `${this.fieldId}-desc` : undefined;
        const hasIconChecked = !!this.el.querySelector('[slot="icon-checked"]');
        const hasIconUnchecked = !!this.el.querySelector('[slot="icon-unchecked"]');
        const hasIcons = hasIconChecked || hasIconUnchecked;
        const toggle = (h("span", { class: "toggle__control" },
            h("input", Object.assign({ type: "checkbox", role: "switch", id: this.fieldId, name: this.name, value: this.value, checked: this.isChecked, disabled: this.isDisabled, required: this.isRequired, "aria-checked": this.isChecked ? 'true' : 'false', "aria-required": this.isRequired ? 'true' : undefined, "aria-describedby": descriptionId, onChange: this.handleChange, class: "toggle__input" }, passThroughAttrs)),
            h("span", { class: "toggle__track", "aria-hidden": "true" },
                h("span", { class: `toggle__thumb${hasIcons ? ' toggle__thumb--has-icon' : ''}` }, hasIcons && (h("span", { class: "toggle__icon" },
                    h("span", { class: `toggle__icon-item${this.isChecked ? '' : ' toggle__icon-item--active'}` },
                        h("slot", { name: "icon-unchecked" })),
                    h("span", { class: `toggle__icon-item${this.isChecked ? ' toggle__icon-item--active' : ''}` },
                        h("slot", { name: "icon-checked" }))))))));
        if (this.label) {
            return (h(Host, null,
                h("div", { class: wrapperClasses.join(' ') },
                    h("label", { class: "toggle__wrapper" },
                        toggle,
                        h("span", { class: "toggle__text" },
                            h("span", { class: "toggle__label-text" }, this.label),
                            this.description && (h("span", { id: descriptionId, class: "toggle__description" }, this.description)))))));
        }
        return (h(Host, null,
            h("div", { class: wrapperClasses.join(' ') }, toggle)));
    }
};
AegovToggle.PASS_THROUGH_ATTRS = new Set([
    'form', 'tabindex', 'autofocus', 'title',
]);
__decorate([
    Element()
], AegovToggle.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovToggle.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovToggle.prototype, "name", void 0);
__decorate([
    Prop()
], AegovToggle.prototype, "value", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovToggle.prototype, "isChecked", void 0);
__decorate([
    Prop()
], AegovToggle.prototype, "size", void 0);
__decorate([
    State()
], AegovToggle.prototype, "_resolvedSize", void 0);
__decorate([
    Prop({ reflect: true })
], AegovToggle.prototype, "isDisabled", void 0);
__decorate([
    Prop()
], AegovToggle.prototype, "isRequired", void 0);
__decorate([
    Prop()
], AegovToggle.prototype, "label", void 0);
__decorate([
    Prop()
], AegovToggle.prototype, "description", void 0);
__decorate([
    Event()
], AegovToggle.prototype, "aegovToggleChange", void 0);
__decorate([
    Watch('size')
], AegovToggle.prototype, "onSizeChange", null);
AegovToggle = AegovToggle_1 = __decorate([
    Component({
        tag: 'aegov-toggle',
        styleUrl: 'aegov-toggle.css',
        scoped: false,
        shadow: false,
    })
], AegovToggle);
export { AegovToggle };
