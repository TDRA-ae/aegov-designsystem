var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AegovTextarea_1;
import { Component, Host, h, Prop, State, Event, Element, Watch } from '@stencil/core';
import { TEXTAREA_SIZES, TEXTAREA_RESIZES } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
const TAG = 'aegov-textarea';
const ctx = (prop) => ({ component: TAG, prop });
let AegovTextarea = AegovTextarea_1 = class AegovTextarea {
    constructor() {
        /** The size of the textarea (affects font size only). */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
        /** Whether the textarea is disabled. */
        this.isDisabled = false;
        /** Whether the textarea is readonly. */
        this.isReadonly = false;
        /** The current value of the textarea. */
        this.value = '';
        /** Whether the textarea is required. */
        this.isRequired = false;
        /** Resize behaviour of the textarea. */
        this.resize = 'vertical';
        /** Show a copy button to copy the textarea value to clipboard. Only applies when readonly. */
        this.isCopyable = false;
        /** Tracks whether the value was just copied (for visual feedback). */
        this.justCopied = false;
        /** Internal character count for the counter display. */
        this.charCount = 0;
        this.handleChange = (event) => {
            const textarea = event.target;
            this.value = textarea.value;
            this.aegovTextareaChange.emit({ value: this.value, event });
        };
        this.handleInput = (event) => {
            const textarea = event.target;
            this.value = textarea.value;
            this.aegovTextareaInput.emit({ value: this.value, event });
            if (this.resize === 'auto') {
                this.autoResize();
            }
        };
        this.handleFocus = (event) => {
            this.aegovTextareaFocus.emit(event);
        };
        this.handleBlur = (event) => {
            this.aegovTextareaBlur.emit(event);
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
                const textarea = this.el.querySelector('textarea');
                if (textarea) {
                    textarea.select();
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
        this._sizeWatcher = watchResponsiveProp(this.size, TEXTAREA_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
        warnIfInvalidEnumProp(this.resize, TEXTAREA_RESIZES, 'vertical', ctx('resize'));
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-textarea');
        }
        this.charCount = (this.value || '').length;
    }
    disconnectedCallback() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    onSizeChange() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, TEXTAREA_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    onResizeChange(v) { warnIfInvalidEnumProp(v, TEXTAREA_RESIZES, 'vertical', ctx('resize')); }
    watchValue(newVal) {
        this.charCount = (newVal || '').length;
        if (this.resize === 'auto' && this.textareaEl) {
            this.autoResize();
        }
    }
    get showCopy() {
        return this.isReadonly && this.isCopyable;
    }
    getTextareaClasses() {
        const classes = ['aegov-textarea'];
        const sizeClasses = {
            xs: 'textarea--xs',
            sm: 'textarea--sm',
            base: 'textarea--base',
            lg: 'textarea--lg',
            xl: 'textarea--xl',
        };
        classes.push(sizeClasses[this._resolvedSize]);
        const resizeClasses = {
            none: 'textarea--resize-none',
            vertical: 'textarea--resize-vertical',
            horizontal: 'textarea--resize-horizontal',
            both: 'textarea--resize-both',
            auto: 'textarea--resize-none',
        };
        const resize = TEXTAREA_RESIZES.includes(this.resize) ? this.resize : 'vertical';
        classes.push(resizeClasses[resize]);
        if (this.showCopy) {
            classes.push('textarea--has-copy');
        }
        if (this.extraClass) {
            classes.push(this.extraClass);
        }
        return classes.join(' ');
    }
    autoResize() {
        const el = this.textareaEl;
        if (!el)
            return;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    }
    renderCopyButton() {
        if (!this.showCopy)
            return null;
        return (h("button", { type: "button", class: `textarea__copy-btn${this.justCopied ? ' textarea__copy-btn--copied' : ''}`, onClick: this.handleCopy, tabindex: -1, "aria-label": this.justCopied ? 'Copied' : 'Copy to clipboard' }, this.justCopied ? (h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" },
            h("polyline", { points: "20 6 9 17 4 12" }))) : (h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" },
            h("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }),
            h("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })))));
    }
    get counterId() {
        return `${this.fieldId}-counter`;
    }
    renderCharCounter() {
        if (this.maxlength === undefined || this.maxlength === null)
            return null;
        const isOver = this.charCount > this.maxlength;
        return (h("div", { id: this.counterId, class: `textarea__counter${isOver ? ' textarea__counter--over' : ''}`, "aria-live": "polite", "aria-atomic": "true" },
            this.charCount,
            " / ",
            this.maxlength));
    }
    render() {
        const passThroughAttributes = getPassThroughAttributes(this.el, AegovTextarea_1.PASS_THROUGH_ATTRS);
        const needsWrapper = this.showCopy;
        const hasCounter = this.maxlength !== undefined && this.maxlength !== null;
        const textarea = (h("textarea", Object.assign({ id: this.fieldId, class: this.getTextareaClasses(), disabled: this.isDisabled, readOnly: this.isReadonly, placeholder: this.placeholder, value: this.value, name: this.name, required: this.isRequired, "aria-describedby": hasCounter ? this.counterId : undefined, onChange: this.handleChange, onInput: this.handleInput, onFocus: this.handleFocus, onBlur: this.handleBlur, ref: (el) => this.textareaEl = el }, passThroughAttributes)));
        if (needsWrapper || hasCounter) {
            return (h(Host, null,
                h("div", { class: "textarea__wrapper" },
                    textarea,
                    this.renderCopyButton()),
                this.renderCharCounter()));
        }
        return (h(Host, null, textarea));
    }
};
/** Native textarea attributes to pass through. */
AegovTextarea.PASS_THROUGH_ATTRS = new Set([
    'rows', 'cols', 'minlength', 'maxlength', 'wrap',
    'autocomplete', 'autofocus', 'spellcheck', 'enterkeyhint',
    'title', 'tabindex', 'form',
]);
__decorate([
    Element()
], AegovTextarea.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovTextarea.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovTextarea.prototype, "size", void 0);
__decorate([
    State()
], AegovTextarea.prototype, "_resolvedSize", void 0);
__decorate([
    Prop()
], AegovTextarea.prototype, "isDisabled", void 0);
__decorate([
    Prop()
], AegovTextarea.prototype, "isReadonly", void 0);
__decorate([
    Prop()
], AegovTextarea.prototype, "placeholder", void 0);
__decorate([
    Prop({ mutable: true })
], AegovTextarea.prototype, "value", void 0);
__decorate([
    Prop()
], AegovTextarea.prototype, "name", void 0);
__decorate([
    Prop()
], AegovTextarea.prototype, "isRequired", void 0);
__decorate([
    Prop()
], AegovTextarea.prototype, "resize", void 0);
__decorate([
    Prop()
], AegovTextarea.prototype, "maxlength", void 0);
__decorate([
    Prop()
], AegovTextarea.prototype, "isCopyable", void 0);
__decorate([
    Prop()
], AegovTextarea.prototype, "extraClass", void 0);
__decorate([
    State()
], AegovTextarea.prototype, "justCopied", void 0);
__decorate([
    State()
], AegovTextarea.prototype, "charCount", void 0);
__decorate([
    Event()
], AegovTextarea.prototype, "aegovTextareaChange", void 0);
__decorate([
    Event()
], AegovTextarea.prototype, "aegovTextareaInput", void 0);
__decorate([
    Event()
], AegovTextarea.prototype, "aegovTextareaFocus", void 0);
__decorate([
    Event()
], AegovTextarea.prototype, "aegovTextareaBlur", void 0);
__decorate([
    Watch('size')
], AegovTextarea.prototype, "onSizeChange", null);
__decorate([
    Watch('resize')
], AegovTextarea.prototype, "onResizeChange", null);
__decorate([
    Watch('value')
], AegovTextarea.prototype, "watchValue", null);
AegovTextarea = AegovTextarea_1 = __decorate([
    Component({
        tag: 'aegov-textarea',
        styleUrl: 'aegov-textarea.css',
        scoped: false,
        shadow: false,
    })
], AegovTextarea);
export { AegovTextarea };
