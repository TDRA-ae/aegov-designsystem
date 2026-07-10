var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AegovProgress_1;
import { Component, Host, h, Prop, Element } from '@stencil/core';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
let AegovProgress = AegovProgress_1 = class AegovProgress {
    constructor() {
        /** Maximum value. */
        this.max = 100;
        /**
         * Height using Tailwind spacing scale (1, 1.5, 2, 2.5, 3, 3.5, 4, etc.).
         * Each unit = 0.25rem. Default "2" = h-2 = 0.5rem (8px).
         */
        this.height = '2';
        /** Suffix appended directly to the counter value. No automatic spacing. */
        this.counterSuffix = '';
    }
    componentWillLoad() {
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-progress');
        }
    }
    getHeightRem() {
        const val = parseFloat(this.height);
        if (isNaN(val))
            return '0.5rem';
        return `${val * 0.25}rem`;
    }
    getPercent() {
        if (this.value == null || this.max === 0)
            return 0;
        return Math.min(100, Math.max(0, (this.value / this.max) * 100));
    }
    isIndeterminate() {
        return this.value == null;
    }
    render() {
        const passThroughAttrs = getPassThroughAttributes(this.el, AegovProgress_1.PASS_THROUGH_ATTRS);
        const heightRem = this.getHeightRem();
        const percent = this.getPercent();
        const indeterminate = this.isIndeterminate();
        const showCounter = !!this.counter && !indeterminate;
        const counterValue = this.value != null ? `${this.value}${this.counterSuffix}` : '';
        const wrapperClasses = [
            'aegov-progress',
            this.extraClass || '',
        ].filter(Boolean).join(' ');
        return (h(Host, null,
            h("div", { class: wrapperClasses },
                this.counter === 'top' && showCounter && (h("div", { class: "progress__top-row" },
                    h("span", { class: "progress__counter progress__counter--top" }, counterValue))),
                h("div", { class: `progress__row${this.counter === 'trailing' ? ' progress__row--trailing' : ''}` },
                    h("div", { class: `progress__track${indeterminate ? ' progress__track--indeterminate' : ''}`, style: { height: heightRem }, "aria-hidden": "true" }, !indeterminate && (h("div", { class: "progress__fill", style: { width: `${percent}%` } }))),
                    this.counter === 'trailing' && showCounter && (h("span", { class: "progress__counter progress__counter--trailing" }, counterValue))),
                h("progress", Object.assign({ class: "progress__native", id: this.fieldId, value: indeterminate ? undefined : this.value, max: this.max }, passThroughAttrs), !indeterminate ? `${percent}%` : ''),
                this.description && (h("p", { class: "progress__description" }, this.description)))));
    }
};
AegovProgress.PASS_THROUGH_ATTRS = new Set([
    'tabindex', 'title', 'form',
]);
__decorate([
    Element()
], AegovProgress.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovProgress.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovProgress.prototype, "value", void 0);
__decorate([
    Prop()
], AegovProgress.prototype, "max", void 0);
__decorate([
    Prop()
], AegovProgress.prototype, "height", void 0);
__decorate([
    Prop()
], AegovProgress.prototype, "counter", void 0);
__decorate([
    Prop()
], AegovProgress.prototype, "counterSuffix", void 0);
__decorate([
    Prop()
], AegovProgress.prototype, "description", void 0);
__decorate([
    Prop()
], AegovProgress.prototype, "extraClass", void 0);
AegovProgress = AegovProgress_1 = __decorate([
    Component({
        tag: 'aegov-progress',
        styleUrl: 'aegov-progress.css',
        scoped: false,
    })
], AegovProgress);
export { AegovProgress };
