var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AegovInput_1;
import { Component, Host, h, Prop, State, Event, Element, Watch } from '@stencil/core';
import { INPUT_TYPES, INPUT_SIZES } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
const TAG = 'aegov-input';
const ctx = (prop) => ({ component: TAG, prop });
let AegovInput = AegovInput_1 = class AegovInput {
    constructor() {
        /** The type of the input field. */
        this.type = 'text';
        /** The size of the input field. */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
        /** Whether the input is disabled. */
        this.isDisabled = false;
        /** Whether the input is readonly. */
        this.isReadonly = false;
        /** The current value of the input. */
        this.value = '';
        /** Whether the input is required. */
        this.isRequired = false;
        /** Show a toggle button to reveal/hide password. Only applies when type="password". */
        this.isRevealable = false;
        /** Show a copy button to copy the input value to clipboard. Only applies when readonly. */
        this.isCopyable = false;
        /** Tracks whether the password is currently visible. */
        this.passwordVisible = false;
        /** Tracks whether the value was just copied (for visual feedback). */
        this.justCopied = false;
        this.handleChange = (event) => {
            const input = event.target;
            this.value = input.value;
            this.aegovInputChange.emit({ value: this.value, event });
        };
        this.handleInput = (event) => {
            const input = event.target;
            this.value = input.value;
            this.aegovInputInput.emit({ value: this.value, event });
        };
        this.handleFocus = (event) => {
            this.aegovInputFocus.emit(event);
        };
        this.handleBlur = (event) => {
            this.aegovInputBlur.emit(event);
        };
        this.handleRevealToggle = () => {
            this.passwordVisible = !this.passwordVisible;
        };
        this.handleCopy = async () => {
            if (!this.value)
                return;
            try {
                await navigator.clipboard.writeText(this.value);
                this.justCopied = true;
                setTimeout(() => {
                    this.justCopied = false;
                }, 2000);
            }
            catch (_a) {
                // Fallback for environments without clipboard API
                const input = this.el.querySelector('input');
                if (input) {
                    input.select();
                    document.execCommand('copy');
                    this.justCopied = true;
                    setTimeout(() => {
                        this.justCopied = false;
                    }, 2000);
                }
            }
        };
    }
    componentWillLoad() {
        warnIfInvalidEnumProp(this.type, INPUT_TYPES, 'text', ctx('type'));
        this._sizeWatcher = watchResponsiveProp(this.size, INPUT_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-input');
        }
    }
    disconnectedCallback() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    onTypeChange(v) { warnIfInvalidEnumProp(v, INPUT_TYPES, 'text', ctx('type')); }
    onSizeChange() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, INPUT_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    get showReveal() {
        return this.type === 'password' && this.isRevealable;
    }
    get showCopy() {
        return this.isReadonly && this.isCopyable;
    }
    get hasActionButton() {
        return this.showReveal || this.showCopy;
    }
    get resolvedType() {
        if (this.showReveal && this.passwordVisible) {
            return 'text';
        }
        return INPUT_TYPES.includes(this.type) ? this.type : 'text';
    }
    getInputClasses(hasIconStart, hasIconEnd) {
        const classes = ['aegov-input'];
        const sizeClasses = {
            xs: 'input--xs',
            sm: 'input--sm',
            base: 'input--base',
            lg: 'input--lg',
            xl: 'input--xl',
        };
        classes.push(sizeClasses[this._resolvedSize]);
        if (this.hasActionButton) {
            classes.push('input--has-action');
        }
        if (hasIconStart) {
            classes.push('input--has-icon-start');
        }
        if (hasIconEnd) {
            classes.push('input--has-icon-end');
        }
        if (this.extraClass) {
            classes.push(this.extraClass);
        }
        return classes.join(' ');
    }
    renderRevealButton() {
        if (!this.showReveal)
            return null;
        const sizeClasses = {
            xs: 'revealable--xs',
            sm: 'revealable--sm',
            base: 'revealable--base',
            lg: 'revealable--lg',
            xl: 'revealable--xl',
        };
        return (h("button", { type: "button", class: `input__revealable ${sizeClasses[this._resolvedSize]}`, onClick: this.handleRevealToggle, disabled: this.isDisabled, tabindex: -1, "aria-label": this.passwordVisible ? 'Hide password' : 'Show password' }, this.passwordVisible ? (
        // Eye-off icon
        h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" },
            h("path", { d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" }),
            h("path", { d: "M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" }),
            h("line", { x1: "1", y1: "1", x2: "23", y2: "23" }),
            h("path", { d: "M14.12 14.12a3 3 0 1 1-4.24-4.24" }))) : (
        // Eye icon
        h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" },
            h("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }),
            h("circle", { cx: "12", cy: "12", r: "3" })))));
    }
    renderCopyButton() {
        if (!this.showCopy)
            return null;
        const sizeClasses = {
            xs: 'copy-btn--xs',
            sm: 'copy-btn--sm',
            base: 'copy-btn--base',
            lg: 'copy-btn--lg',
            xl: 'copy-btn--xl',
        };
        return (h("button", { type: "button", class: `input__copy-btn ${sizeClasses[this._resolvedSize]}${this.justCopied ? ' input__copy-btn--copied' : ''}`, onClick: this.handleCopy, tabindex: -1, "aria-label": this.justCopied ? 'Copied' : 'Copy to clipboard' }, this.justCopied ? (
        // Checkmark icon
        h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" },
            h("polyline", { points: "20 6 9 17 4 12" }))) : (
        // Copy icon
        h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" },
            h("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }),
            h("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })))));
    }
    render() {
        const passThroughAttributes = getPassThroughAttributes(this.el, AegovInput_1.PASS_THROUGH_ATTRS);
        const hasIconStart = !!this.el.querySelector('[slot="icon-start"]');
        const hasIconEndContent = !!this.el.querySelector('[slot="icon-end"]');
        const hasIconEnd = hasIconEndContent && !this.hasActionButton;
        const needsWrapper = this.hasActionButton || hasIconStart || hasIconEnd || hasIconEndContent;
        const input = (h("input", Object.assign({ id: this.fieldId, type: this.resolvedType, class: this.getInputClasses(hasIconStart, hasIconEnd), disabled: this.isDisabled, readOnly: this.isReadonly, placeholder: this.placeholder, value: this.value, name: this.name, required: this.isRequired, onChange: this.handleChange, onInput: this.handleInput, onFocus: this.handleFocus, onBlur: this.handleBlur }, passThroughAttributes)));
        if (needsWrapper) {
            return (h(Host, null,
                h("div", { class: `input__wrapper input__wrapper--${this._resolvedSize}` },
                    hasIconStart && (h("span", { class: "input__icon input__icon--start" },
                        h("slot", { name: "icon-start" }))),
                    input,
                    hasIconEndContent && (h("span", { class: `input__icon input__icon--end${!hasIconEnd ? ' input__icon--hidden' : ''}` },
                        h("slot", { name: "icon-end" }))),
                    this.renderRevealButton(),
                    this.renderCopyButton())));
        }
        return (h(Host, null, input));
    }
};
/** Native input attributes to pass through to the inner input element. */
AegovInput.PASS_THROUGH_ATTRS = new Set([
    'pattern', 'min', 'max', 'minlength', 'maxlength', 'step',
    'autocomplete', 'autofocus', 'inputmode', 'list', 'multiple',
    'accept', 'capture', 'spellcheck', 'enterkeyhint', 'title',
    'tabindex', 'form',
]);
__decorate([
    Element()
], AegovInput.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovInput.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovInput.prototype, "type", void 0);
__decorate([
    Prop()
], AegovInput.prototype, "size", void 0);
__decorate([
    State()
], AegovInput.prototype, "_resolvedSize", void 0);
__decorate([
    Prop()
], AegovInput.prototype, "isDisabled", void 0);
__decorate([
    Prop()
], AegovInput.prototype, "isReadonly", void 0);
__decorate([
    Prop()
], AegovInput.prototype, "placeholder", void 0);
__decorate([
    Prop({ mutable: true })
], AegovInput.prototype, "value", void 0);
__decorate([
    Prop()
], AegovInput.prototype, "name", void 0);
__decorate([
    Prop()
], AegovInput.prototype, "isRequired", void 0);
__decorate([
    Prop()
], AegovInput.prototype, "isRevealable", void 0);
__decorate([
    Prop()
], AegovInput.prototype, "isCopyable", void 0);
__decorate([
    Prop()
], AegovInput.prototype, "extraClass", void 0);
__decorate([
    State()
], AegovInput.prototype, "passwordVisible", void 0);
__decorate([
    State()
], AegovInput.prototype, "justCopied", void 0);
__decorate([
    Event()
], AegovInput.prototype, "aegovInputChange", void 0);
__decorate([
    Event()
], AegovInput.prototype, "aegovInputInput", void 0);
__decorate([
    Event()
], AegovInput.prototype, "aegovInputFocus", void 0);
__decorate([
    Event()
], AegovInput.prototype, "aegovInputBlur", void 0);
__decorate([
    Watch('type')
], AegovInput.prototype, "onTypeChange", null);
__decorate([
    Watch('size')
], AegovInput.prototype, "onSizeChange", null);
AegovInput = AegovInput_1 = __decorate([
    Component({
        tag: 'aegov-input',
        styleUrl: 'aegov-input.css',
        scoped: false,
        shadow: false,
    })
], AegovInput);
export { AegovInput };
