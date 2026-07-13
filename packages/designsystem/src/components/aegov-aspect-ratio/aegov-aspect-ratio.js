var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, Watch, State, Element, Host, h } from '@stencil/core';
import { ASPECT_RATIO_FITS } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
const TAG = 'aegov-aspect-ratio';
const ctx = (prop) => ({ component: TAG, prop });
/**
 * Accepts named presets (`'auto'`, `'square'`, `'video'`) or any custom ratio
 * string such as `'5/4'`, `'21/9'`, `'2.35/1'`.
 */
const RATIO_PATTERN = /^[\d.]+\s*\/\s*[\d.]+$/;
const NAMED_RATIOS = new Set(['auto', 'square', 'video']);
function isValidRatio(value) {
    return NAMED_RATIOS.has(value) || RATIO_PATTERN.test(value);
}
/**
 * @component aegov-aspect-ratio
 * @description A layout component that enforces a specific aspect ratio on its
 * content. Supports images, videos, iframes, and arbitrary slotted content.
 * The `ratio` prop supports Tailwind-style breakpoint prefixes — e.g.
 * `ratio="square md:video lg:21/9"` switches the ratio at each breakpoint.
 */
let AegovAspectRatio = class AegovAspectRatio {
    constructor() {
        /**
         * The aspect ratio to apply. Accepts named presets (`'auto'`, `'square'`,
         * `'video'`) or any custom ratio string such as `'5/4'`, `'21/9'`,
         * `'2.35/1'`. Supports a Tailwind-style responsive string with breakpoint
         * prefixes, e.g. `"square md:video lg:21/9"`.
         * @default 'auto'
         */
        this.ratio = 'auto';
        /**
         * How slotted media (img, video, iframe) should fit within the aspect
         * ratio container.
         * @default 'cover'
         */
        this.fit = 'cover';
        this._resolvedRatio = 'auto';
        this._ratioWatcher = null;
    }
    componentWillLoad() {
        warnIfInvalidEnumProp(this.fit, ASPECT_RATIO_FITS, 'cover', ctx('fit'));
        this._ratioWatcher = watchResponsiveProp(this.ratio, isValidRatio, 'auto', v => {
            this._resolvedRatio = v;
        });
        this._resolvedRatio = this._ratioWatcher.current;
    }
    disconnectedCallback() {
        var _a;
        (_a = this._ratioWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    onFitChange(v) { warnIfInvalidEnumProp(v, ASPECT_RATIO_FITS, 'cover', ctx('fit')); }
    onRatioChange() {
        var _a;
        (_a = this._ratioWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._ratioWatcher = watchResponsiveProp(this.ratio, isValidRatio, 'auto', v => {
            this._resolvedRatio = v;
        });
        this._resolvedRatio = this._ratioWatcher.current;
    }
    resolveRatio() {
        const value = this._resolvedRatio;
        switch (value) {
            case 'auto':
                return 'auto';
            case 'square':
                return '1 / 1';
            case 'video':
                return '16 / 9';
            default:
                if (value.includes('/')) {
                    const parts = value.split('/').map(s => s.trim());
                    return `${parts[0]} / ${parts[1]}`;
                }
                return value;
        }
    }
    render() {
        const ratioStyle = { 'aspect-ratio': this.resolveRatio() };
        const fit = ASPECT_RATIO_FITS.includes(this.fit) ? this.fit : 'cover';
        const containerClass = ['aegov-aspect-ratio', this.extraClass || ''].filter(Boolean).join(' ');
        return (h(Host, null,
            h("div", { class: containerClass, style: ratioStyle, "data-fit": fit },
                h("slot", null))));
    }
};
__decorate([
    Element()
], AegovAspectRatio.prototype, "el", void 0);
__decorate([
    Prop()
], AegovAspectRatio.prototype, "ratio", void 0);
__decorate([
    Prop()
], AegovAspectRatio.prototype, "fit", void 0);
__decorate([
    Prop()
], AegovAspectRatio.prototype, "extraClass", void 0);
__decorate([
    State()
], AegovAspectRatio.prototype, "_resolvedRatio", void 0);
__decorate([
    Watch('fit')
], AegovAspectRatio.prototype, "onFitChange", null);
__decorate([
    Watch('ratio')
], AegovAspectRatio.prototype, "onRatioChange", null);
AegovAspectRatio = __decorate([
    Component({
        tag: 'aegov-aspect-ratio',
        styleUrl: 'aegov-aspect-ratio.css',
        scoped: false,
    })
], AegovAspectRatio);
export { AegovAspectRatio };
