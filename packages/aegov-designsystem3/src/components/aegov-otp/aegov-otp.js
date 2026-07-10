var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Host, h, Prop, State, Element, Event, Watch, Method } from '@stencil/core';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import { OTP_VARIANTS, OTP_SIZES } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
const TAG = 'aegov-otp';
const ctx = (prop) => ({ component: TAG, prop });
let AegovOtp = class AegovOtp {
    constructor() {
        /**
         * Visual variant. "continuous" = single bordered box with dividers between cells.
         * "individual" = separate bordered boxes per digit.
         * Note: named "variant" to avoid conflict with native HTML "style" attribute.
         */
        this.variant = 'continuous';
        /** Number of input cells (digits/characters expected). */
        this.length = 5;
        /** Size of the input cells. Maps to text size: xs, sm, base, lg, xl, 2xl. */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
        /** Allow letters and numbers when true. Numbers only when false. */
        this.isAlphanumeric = false;
        /** Disables all input cells. */
        this.isDisabled = false;
        /** Current OTP value. Can be set externally to pre-fill cells. */
        this.value = '';
        this.cellRefs = [];
        this.internalUpdate = false;
        this.handleInput = (index, e) => {
            var _a, _b, _c;
            const input = e.target;
            const val = input.value;
            if (val.length === 0) {
                this.emitChange();
                return;
            }
            // Multi-character: distribute across cells (handles autofill or overtype)
            if (val.length > 1) {
                const cleaned = val.replace(/\s/g, '');
                let ci = index;
                for (const ch of cleaned) {
                    if (ci >= this.length)
                        break;
                    if (this.isValidChar(ch)) {
                        this.cellRefs[ci].value = ch;
                        ci++;
                    }
                }
                input.value = ((_a = this.cellRefs[index]) === null || _a === void 0 ? void 0 : _a.value) || '';
                this.emitChange();
                const focusIdx = Math.min(ci, this.length - 1);
                (_b = this.cellRefs[focusIdx]) === null || _b === void 0 ? void 0 : _b.focus();
                return;
            }
            // Single character
            if (!this.isValidChar(val)) {
                input.value = '';
                return;
            }
            this.emitChange();
            if (index < this.length - 1) {
                (_c = this.cellRefs[index + 1]) === null || _c === void 0 ? void 0 : _c.focus();
            }
        };
        this.handleKeyDown = (index, e) => {
            if (e.key === 'Backspace') {
                const input = e.target;
                if (input.value === '' && index > 0) {
                    e.preventDefault();
                    this.cellRefs[index - 1].value = '';
                    this.cellRefs[index - 1].focus();
                    this.emitChange();
                }
            }
            else if (e.key === 'ArrowLeft' && index > 0) {
                e.preventDefault();
                this.cellRefs[index - 1].focus();
            }
            else if (e.key === 'ArrowRight' && index < this.length - 1) {
                e.preventDefault();
                this.cellRefs[index + 1].focus();
            }
            else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                // Ensure existing content is selected so new char replaces it
                const input = e.target;
                if (input.value) {
                    input.select();
                }
            }
        };
        this.handlePaste = (_index, e) => {
            var _a, _b;
            e.preventDefault();
            const pasted = (((_a = e.clipboardData) === null || _a === void 0 ? void 0 : _a.getData('text')) || '').replace(/\s/g, '');
            // Always fill from cell 0 on paste (most common OTP paste behavior)
            let ci = 0;
            for (const ch of pasted) {
                if (ci >= this.length)
                    break;
                if (this.isValidChar(ch)) {
                    this.cellRefs[ci].value = ch;
                    ci++;
                }
            }
            this.emitChange();
            const nextEmpty = this.cellRefs.findIndex(r => !(r === null || r === void 0 ? void 0 : r.value));
            const focusIdx = nextEmpty !== -1 ? nextEmpty : Math.min(ci, this.length - 1);
            (_b = this.cellRefs[focusIdx]) === null || _b === void 0 ? void 0 : _b.focus();
        };
        this.handleFocus = (e) => {
            e.target.select();
        };
        this.handleClick = (e) => {
            e.target.select();
        };
    }
    componentWillLoad() {
        warnIfInvalidEnumProp(this.variant, OTP_VARIANTS, 'continuous', ctx('variant'));
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-otp');
        }
        this._sizeWatcher = watchResponsiveProp(this.size, OTP_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    disconnectedCallback() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    onVariantChange(v) { warnIfInvalidEnumProp(v, OTP_VARIANTS, 'continuous', ctx('variant')); }
    onSizeChange() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, OTP_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    componentDidLoad() {
        if (this.value) {
            this.distributeValue(this.value);
        }
    }
    onValueChange(newVal) {
        if (this.internalUpdate) {
            this.internalUpdate = false;
            return;
        }
        this.distributeValue(newVal);
    }
    /** Clears all cells and focuses the first cell. */
    async clear() {
        var _a;
        for (const ref of this.cellRefs) {
            if (ref)
                ref.value = '';
        }
        this.internalUpdate = true;
        this.value = '';
        if (this.hiddenRef)
            this.hiddenRef.value = '';
        this.aegovOtpChange.emit({ value: '' });
        (_a = this.cellRefs[0]) === null || _a === void 0 ? void 0 : _a.focus();
    }
    distributeValue(val) {
        const clean = (val || '').replace(/\s/g, '');
        for (let i = 0; i < this.length; i++) {
            if (this.cellRefs[i]) {
                this.cellRefs[i].value = clean[i] || '';
            }
        }
    }
    collectValue() {
        return this.cellRefs.map(r => (r === null || r === void 0 ? void 0 : r.value) || '').join('');
    }
    isValidChar(char) {
        if (this.isAlphanumeric) {
            return /^[a-zA-Z0-9]$/.test(char);
        }
        return /^[0-9]$/.test(char);
    }
    emitChange() {
        const val = this.collectValue();
        this.internalUpdate = true;
        this.value = val;
        if (this.hiddenRef) {
            this.hiddenRef.value = val;
        }
        this.aegovOtpChange.emit({ value: val });
        const filled = this.cellRefs.filter(r => r === null || r === void 0 ? void 0 : r.value).length;
        if (filled === this.length) {
            if (this.pattern) {
                const regex = new RegExp(this.pattern);
                if (!regex.test(val)) {
                    this.aegovOtpInvalid.emit({ value: val, pattern: this.pattern });
                    return;
                }
            }
            this.aegovOtpComplete.emit({ value: val });
        }
    }
    render() {
        const passThroughAttrs = getPassThroughAttributes(this.el, new Set([]));
        const wrapperClasses = ['aegov-otp', this.extraClass || ''].filter(Boolean).join(' ');
        const cells = Array.from({ length: this.length }, (_, i) => i);
        const variant = OTP_VARIANTS.includes(this.variant) ? this.variant : 'continuous';
        const size = this._resolvedSize;
        return (h(Host, null,
            h("div", { class: wrapperClasses },
                h("div", Object.assign({ class: `otp__wrapper otp__wrapper--${variant}`, role: "group" }, passThroughAttrs), cells.map((index) => [
                    h("input", { ref: (el) => { this.cellRefs[index] = el; }, id: index === 0 ? this.fieldId : undefined, class: `otp__cell otp__cell--${size}`, type: "text", inputMode: this.isAlphanumeric ? 'text' : 'numeric', disabled: this.isDisabled, autocomplete: index === 0 ? 'one-time-code' : 'off', "aria-label": `Character ${index + 1} of ${this.length}`, onInput: (e) => this.handleInput(index, e), onKeyDown: (e) => this.handleKeyDown(index, e), onPaste: (e) => this.handlePaste(index, e), onFocus: (e) => this.handleFocus(e), onClick: (e) => this.handleClick(e) }),
                    variant === 'continuous' && index < this.length - 1 && (h("span", { class: "otp__divider", "aria-hidden": "true" })),
                ])),
                h("input", { ref: (el) => { this.hiddenRef = el; }, type: "hidden", name: this.name, value: this.value }))));
    }
};
__decorate([
    Element()
], AegovOtp.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovOtp.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovOtp.prototype, "variant", void 0);
__decorate([
    Prop()
], AegovOtp.prototype, "length", void 0);
__decorate([
    Prop()
], AegovOtp.prototype, "size", void 0);
__decorate([
    State()
], AegovOtp.prototype, "_resolvedSize", void 0);
__decorate([
    Prop()
], AegovOtp.prototype, "isAlphanumeric", void 0);
__decorate([
    Prop()
], AegovOtp.prototype, "pattern", void 0);
__decorate([
    Prop()
], AegovOtp.prototype, "isDisabled", void 0);
__decorate([
    Prop()
], AegovOtp.prototype, "name", void 0);
__decorate([
    Prop({ mutable: true })
], AegovOtp.prototype, "value", void 0);
__decorate([
    Prop()
], AegovOtp.prototype, "extraClass", void 0);
__decorate([
    Event()
], AegovOtp.prototype, "aegovOtpChange", void 0);
__decorate([
    Event()
], AegovOtp.prototype, "aegovOtpComplete", void 0);
__decorate([
    Event()
], AegovOtp.prototype, "aegovOtpInvalid", void 0);
__decorate([
    Watch('variant')
], AegovOtp.prototype, "onVariantChange", null);
__decorate([
    Watch('size')
], AegovOtp.prototype, "onSizeChange", null);
__decorate([
    Watch('value')
], AegovOtp.prototype, "onValueChange", null);
__decorate([
    Method()
], AegovOtp.prototype, "clear", null);
AegovOtp = __decorate([
    Component({
        tag: 'aegov-otp',
        styleUrl: 'aegov-otp.css',
        scoped: false,
    })
], AegovOtp);
export { AegovOtp };
