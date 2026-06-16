var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, Watch, State, Element, h, Host } from '@stencil/core';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import { TITLE_SIZES } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
/**
 * @slot default - The title content
 */
let AegovTitle = class AegovTitle {
    constructor() {
        /**
         * The size of the title text.
         * @default 'base'
         */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
    }
    componentWillLoad() {
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-title');
        }
        this._sizeWatcher = watchResponsiveProp(this.size, TITLE_SIZES, 'base', v => {
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
        this._sizeWatcher = watchResponsiveProp(this.size, TITLE_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    /**
     * Get the CSS classes based on component props
     */
    getTitleClasses() {
        const classes = ['font-bold!', 'mt-0!', 'mb-0!', 'font-inter!', 'rtl:font-alexandria!'];
        // Size classes — `!` forces override of global h1–h6 base styles.
        const sizeClasses = {
            sm: 'text-base!',
            base: 'text-lg!',
            lg: 'text-xl!',
            xl: 'text-2xl!',
            '2xl': 'text-3xl!'
        };
        const size = this._resolvedSize;
        classes.push(sizeClasses[size]);
        // Merge with custom classes if provided
        if (this.extraClass) {
            classes.push(this.extraClass);
        }
        return classes.join(' ');
    }
    render() {
        const passThroughAttributes = getPassThroughAttributes(this.el);
        const Tag = this.headingType || 'p';
        return (h(Host, null,
            h(Tag, Object.assign({ id: this.fieldId, class: this.getTitleClasses() }, passThroughAttributes),
                h("slot", null))));
    }
};
__decorate([
    Element()
], AegovTitle.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovTitle.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovTitle.prototype, "size", void 0);
__decorate([
    State()
], AegovTitle.prototype, "_resolvedSize", void 0);
__decorate([
    Prop()
], AegovTitle.prototype, "headingType", void 0);
__decorate([
    Prop()
], AegovTitle.prototype, "extraClass", void 0);
__decorate([
    Watch('size')
], AegovTitle.prototype, "onSizeChange", null);
AegovTitle = __decorate([
    Component({
        tag: 'aegov-title',
        styleUrl: 'aegov-title.css',
        scoped: false,
        shadow: false
    })
], AegovTitle);
export { AegovTitle };
