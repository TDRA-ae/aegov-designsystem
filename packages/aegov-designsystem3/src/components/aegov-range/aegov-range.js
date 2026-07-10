var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AegovRange_1;
import { Component, Host, h, Prop, State, Event, Element, Watch } from '@stencil/core';
import { RANGE_SIZES, RANGE_DISPLAYS, RANGE_ORIENTATIONS, RANGE_MODES } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
const TAG = 'aegov-range';
const ctx = (prop) => ({ component: TAG, prop });
let AegovRange = AegovRange_1 = class AegovRange {
    constructor() {
        /** Current value (single mode). */
        this.value = 50;
        /** Low thumb value (range mode). */
        this.valueLow = 25;
        /** High thumb value (range mode). */
        this.valueHigh = 75;
        /** Minimum value. */
        this.min = 0;
        /** Maximum value. */
        this.max = 100;
        /** Step increment. */
        this.step = 1;
        /** Size of the range track. Thumb remains constant. */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
        /** Value display mode. */
        this.display = 'none';
        /** Layout orientation. */
        this.orientation = 'horizontal';
        /** Single thumb or dual thumb (range selection). */
        this.mode = 'single';
        /** Whether the range is disabled. */
        this.isDisabled = false;
        /** Whether the range is required. */
        this.isRequired = false;
        this.activeThumb = null;
        // ── Native input handlers (keyboard) ──
        this.handleSingleInput = (e) => {
            const input = e.target;
            this.value = this.snapToStep(parseFloat(input.value));
            this.emitInput();
        };
        this.handleSingleChange = (e) => {
            const input = e.target;
            this.value = this.snapToStep(parseFloat(input.value));
            this.emitChange();
        };
        this.handleLowInput = (e) => {
            const input = e.target;
            const newVal = this.snapToStep(Math.min(parseFloat(input.value), this.valueHigh - this.step));
            this.valueLow = newVal;
            input.value = String(newVal);
            this.emitInput();
        };
        this.handleLowChange = (e) => {
            const input = e.target;
            const newVal = this.snapToStep(Math.min(parseFloat(input.value), this.valueHigh - this.step));
            this.valueLow = newVal;
            input.value = String(newVal);
            this.emitChange();
        };
        this.handleHighInput = (e) => {
            const input = e.target;
            const newVal = this.snapToStep(Math.max(parseFloat(input.value), this.valueLow + this.step));
            this.valueHigh = newVal;
            input.value = String(newVal);
            this.emitInput();
        };
        this.handleHighChange = (e) => {
            const input = e.target;
            const newVal = this.snapToStep(Math.max(parseFloat(input.value), this.valueLow + this.step));
            this.valueHigh = newVal;
            input.value = String(newVal);
            this.emitChange();
        };
        this.handleThumbMouseDown = (e, which) => {
            if (this.isDisabled)
                return;
            e.preventDefault();
            this.activeThumb = which;
            this.focusNativeInput(which);
            const moveHandler = (moveEvent) => {
                this.updateValueFromPointer(moveEvent.clientX, moveEvent.clientY, which);
            };
            const upHandler = () => {
                this.activeThumb = null;
                document.removeEventListener('mousemove', moveHandler);
                document.removeEventListener('mouseup', upHandler);
                this.emitChange();
            };
            document.addEventListener('mousemove', moveHandler);
            document.addEventListener('mouseup', upHandler);
        };
        this.handleThumbTouchStart = (e, which) => {
            if (this.isDisabled)
                return;
            e.preventDefault();
            this.activeThumb = which;
            this.focusNativeInput(which);
            const moveHandler = (moveEvent) => {
                const touch = moveEvent.touches[0];
                this.updateValueFromPointer(touch.clientX, touch.clientY, which);
            };
            const endHandler = () => {
                this.activeThumb = null;
                document.removeEventListener('touchmove', moveHandler);
                document.removeEventListener('touchend', endHandler);
                this.emitChange();
            };
            document.addEventListener('touchmove', moveHandler, { passive: false });
            document.addEventListener('touchend', endHandler);
        };
        this.handleTrackClick = (e) => {
            if (this.isDisabled)
                return;
            // Determine which thumb to move in range mode (closest to click)
            if (this.mode === 'range') {
                const wrapper = this.trackWrapperEl;
                if (!wrapper)
                    return;
                const rect = wrapper.getBoundingClientRect();
                let percent;
                if (this.orientation === 'vertical') {
                    percent = 1 - (e.clientY - rect.top) / rect.height;
                }
                else {
                    const isRtl = getComputedStyle(this.el).direction === 'rtl';
                    percent = isRtl
                        ? 1 - (e.clientX - rect.left) / rect.width
                        : (e.clientX - rect.left) / rect.width;
                }
                percent = Math.max(0, Math.min(1, percent));
                const rawValue = this.min + percent * (this.max - this.min);
                const distLow = Math.abs(rawValue - this.valueLow);
                const distHigh = Math.abs(rawValue - this.valueHigh);
                const which = distLow <= distHigh ? 'low' : 'high';
                this.updateValueFromPointer(e.clientX, e.clientY, which);
                this.focusNativeInput(which);
                this.emitChange();
            }
            else {
                this.updateValueFromPointer(e.clientX, e.clientY, 'single');
                this.focusNativeInput('single');
                this.emitChange();
            }
        };
    }
    componentWillLoad() {
        this._sizeWatcher = watchResponsiveProp(this.size, RANGE_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
        warnIfInvalidEnumProp(this.display, RANGE_DISPLAYS, 'none', ctx('display'));
        warnIfInvalidEnumProp(this.orientation, RANGE_ORIENTATIONS, 'horizontal', ctx('orientation'));
        warnIfInvalidEnumProp(this.mode, RANGE_MODES, 'single', ctx('mode'));
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-range');
        }
    }
    disconnectedCallback() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    onSizeChange() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, RANGE_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    onDisplayChange(v) { warnIfInvalidEnumProp(v, RANGE_DISPLAYS, 'none', ctx('display')); }
    onOrientationChange(v) { warnIfInvalidEnumProp(v, RANGE_ORIENTATIONS, 'horizontal', ctx('orientation')); }
    onModeChange(v) { warnIfInvalidEnumProp(v, RANGE_MODES, 'single', ctx('mode')); }
    // ── Helpers ──
    getPercent(val) {
        const range = this.max - this.min;
        if (range === 0)
            return 0;
        return ((val - this.min) / range) * 100;
    }
    snapToStep(val) {
        const stepped = Math.round((val - this.min) / this.step) * this.step + this.min;
        return Math.min(this.max, Math.max(this.min, parseFloat(stepped.toFixed(10))));
    }
    emitInput() {
        if (this.mode === 'range') {
            this.aegovRangeInput.emit({ valueLow: this.valueLow, valueHigh: this.valueHigh });
        }
        else {
            this.aegovRangeInput.emit({ value: this.value });
        }
    }
    emitChange() {
        if (this.mode === 'range') {
            this.aegovRangeChange.emit({ valueLow: this.valueLow, valueHigh: this.valueHigh });
        }
        else {
            this.aegovRangeChange.emit({ value: this.value });
        }
    }
    // ── Pointer drag handlers ──
    updateValueFromPointer(clientX, clientY, which) {
        const wrapper = this.trackWrapperEl;
        if (!wrapper)
            return;
        const rect = wrapper.getBoundingClientRect();
        let percent;
        if (this.orientation === 'vertical') {
            // Bottom = min, top = max
            percent = 1 - (clientY - rect.top) / rect.height;
        }
        else {
            const isRtl = getComputedStyle(this.el).direction === 'rtl';
            percent = isRtl
                ? 1 - (clientX - rect.left) / rect.width
                : (clientX - rect.left) / rect.width;
        }
        percent = Math.max(0, Math.min(1, percent));
        const rawValue = this.min + percent * (this.max - this.min);
        const snapped = this.snapToStep(rawValue);
        if (which === 'single') {
            this.value = snapped;
        }
        else if (which === 'low') {
            this.valueLow = Math.min(snapped, this.valueHigh - this.step);
        }
        else {
            this.valueHigh = Math.max(snapped, this.valueLow + this.step);
        }
        this.emitInput();
    }
    focusNativeInput(which) {
        const wrapper = this.trackWrapperEl;
        if (!wrapper)
            return;
        let input;
        if (which === 'low') {
            input = wrapper.querySelector('.range__input--low');
        }
        else if (which === 'high') {
            input = wrapper.querySelector('.range__input--high');
        }
        else {
            input = wrapper.querySelector('.range__input');
        }
        if (input)
            input.focus();
    }
    // ── Render helpers ──
    renderThumb(which, showTooltip, showThumbValue) {
        const value = which === 'low' ? this.valueLow
            : which === 'high' ? this.valueHigh
                : this.value;
        const thumbClasses = [
            'range__thumb',
            `range__thumb--${which}`,
            showThumbValue ? 'range__thumb--display-thumb' : '',
            this.activeThumb === which ? 'range__thumb--active' : '',
        ].filter(Boolean).join(' ');
        const percent = this.getPercent(value);
        const posVar = which === 'low' ? '--range-thumb-low-percent'
            : which === 'high' ? '--range-thumb-high-percent'
                : '--range-thumb-percent';
        const posProperty = this.orientation === 'vertical' ? 'bottom' : 'inset-inline-start';
        return (h("div", { class: thumbClasses, style: { [posProperty]: `var(${posVar}, ${percent}%)` }, onMouseDown: (e) => this.handleThumbMouseDown(e, which), onTouchStart: (e) => this.handleThumbTouchStart(e, which) },
            showThumbValue && h("span", { class: "range__thumb-value" }, value),
            showTooltip && h("span", { class: "range__tooltip" }, value)));
    }
    render() {
        const passThroughAttrs = getPassThroughAttributes(this.el, AegovRange_1.PASS_THROUGH_ATTRS);
        const size = this._resolvedSize;
        const display = RANGE_DISPLAYS.includes(this.display) ? this.display : 'none';
        const orientation = RANGE_ORIENTATIONS.includes(this.orientation) ? this.orientation : 'horizontal';
        const mode = RANGE_MODES.includes(this.mode) ? this.mode : 'single';
        const isRange = mode === 'range';
        const percent = this.getPercent(this.value);
        const percentLow = isRange ? this.getPercent(this.valueLow) : 0;
        const percentHigh = isRange ? this.getPercent(this.valueHigh) : percent;
        const containerStyle = {
            '--range-fill-start': isRange ? `${percentLow}%` : '0%',
            '--range-fill-end': isRange ? `${percentHigh}%` : `${percent}%`,
            '--range-thumb-percent': `${percent}%`,
            '--range-thumb-low-percent': `${percentLow}%`,
            '--range-thumb-high-percent': `${percentHigh}%`,
        };
        const showTooltip = display === 'tooltip';
        const showThumbValue = display === 'thumb' || display === 'full';
        const showMinMax = display === 'full';
        const displayClass = (display === 'thumb' || display === 'full')
            ? `range--display-${display}`
            : '';
        const wrapperClasses = [
            'aegov-range',
            `range--${size}`,
            `range--${orientation}`,
            displayClass,
            this.isDisabled ? 'aegov-range--disabled' : '',
            this.extraClass || '',
        ].filter(Boolean).join(' ');
        const rangeContent = (h("div", { class: wrapperClasses },
            h("div", { class: "range__container", style: containerStyle },
                showMinMax && h("span", { class: "range__label-min" }, this.min),
                h("div", { class: "range__track-wrapper", ref: (el) => this.trackWrapperEl = el, onClick: this.handleTrackClick },
                    h("div", { class: "range__track" },
                        h("div", { class: "range__fill" })),
                    !isRange && this.renderThumb('single', showTooltip, showThumbValue),
                    isRange && this.renderThumb('low', showTooltip, showThumbValue),
                    isRange && this.renderThumb('high', showTooltip, showThumbValue),
                    !isRange && (h("input", Object.assign({ type: "range", class: "range__input", id: this.fieldId, name: this.name, min: this.min, max: this.max, step: this.step, value: this.value, disabled: this.isDisabled, required: this.isRequired, onInput: this.handleSingleInput, onChange: this.handleSingleChange, "aria-valuemin": this.min, "aria-valuemax": this.max, "aria-valuenow": this.value, "aria-orientation": orientation }, (orientation === 'vertical' ? { orient: 'vertical' } : {}), passThroughAttrs))),
                    isRange && [
                        h("input", Object.assign({ type: "range", class: "range__input range__input--low", id: `${this.fieldId}-low`, name: this.name ? `${this.name}-low` : undefined, min: this.min, max: this.max, step: this.step, value: this.valueLow, disabled: this.isDisabled, onInput: this.handleLowInput, onChange: this.handleLowChange, "aria-valuemin": this.min, "aria-valuemax": this.valueHigh, "aria-valuenow": this.valueLow, "aria-label": "Range minimum", "aria-orientation": orientation }, (orientation === 'vertical' ? { orient: 'vertical' } : {}))),
                        h("input", Object.assign({ type: "range", class: "range__input range__input--high", id: `${this.fieldId}-high`, name: this.name ? `${this.name}-high` : undefined, min: this.min, max: this.max, step: this.step, value: this.valueHigh, disabled: this.isDisabled, onInput: this.handleHighInput, onChange: this.handleHighChange, "aria-valuemin": this.valueLow, "aria-valuemax": this.max, "aria-valuenow": this.valueHigh, "aria-label": "Range maximum", "aria-orientation": orientation }, (orientation === 'vertical' ? { orient: 'vertical' } : {}))),
                    ]),
                showMinMax && h("span", { class: "range__label-max" }, this.max))));
        if (this.label) {
            return (h(Host, null,
                h("div", { class: "range__wrapper" },
                    h("span", { class: "range__label-text" }, this.label),
                    rangeContent)));
        }
        return h(Host, null, rangeContent);
    }
};
AegovRange.PASS_THROUGH_ATTRS = new Set([
    'tabindex', 'autofocus', 'title', 'form',
]);
__decorate([
    Element()
], AegovRange.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovRange.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovRange.prototype, "name", void 0);
__decorate([
    Prop({ mutable: true })
], AegovRange.prototype, "value", void 0);
__decorate([
    Prop({ mutable: true })
], AegovRange.prototype, "valueLow", void 0);
__decorate([
    Prop({ mutable: true })
], AegovRange.prototype, "valueHigh", void 0);
__decorate([
    Prop()
], AegovRange.prototype, "min", void 0);
__decorate([
    Prop()
], AegovRange.prototype, "max", void 0);
__decorate([
    Prop()
], AegovRange.prototype, "step", void 0);
__decorate([
    Prop()
], AegovRange.prototype, "size", void 0);
__decorate([
    State()
], AegovRange.prototype, "_resolvedSize", void 0);
__decorate([
    Prop()
], AegovRange.prototype, "display", void 0);
__decorate([
    Prop()
], AegovRange.prototype, "orientation", void 0);
__decorate([
    Prop()
], AegovRange.prototype, "mode", void 0);
__decorate([
    Prop({ reflect: true })
], AegovRange.prototype, "isDisabled", void 0);
__decorate([
    Prop()
], AegovRange.prototype, "isRequired", void 0);
__decorate([
    Prop()
], AegovRange.prototype, "label", void 0);
__decorate([
    Prop()
], AegovRange.prototype, "extraClass", void 0);
__decorate([
    State()
], AegovRange.prototype, "activeThumb", void 0);
__decorate([
    Event()
], AegovRange.prototype, "aegovRangeInput", void 0);
__decorate([
    Event()
], AegovRange.prototype, "aegovRangeChange", void 0);
__decorate([
    Watch('size')
], AegovRange.prototype, "onSizeChange", null);
__decorate([
    Watch('display')
], AegovRange.prototype, "onDisplayChange", null);
__decorate([
    Watch('orientation')
], AegovRange.prototype, "onOrientationChange", null);
__decorate([
    Watch('mode')
], AegovRange.prototype, "onModeChange", null);
AegovRange = AegovRange_1 = __decorate([
    Component({
        tag: 'aegov-range',
        styleUrl: 'aegov-range.css',
        scoped: false,
        shadow: false,
    })
], AegovRange);
export { AegovRange };
