var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, Watch, State, Element, h, Host } from '@stencil/core';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import { TEXT_SIZES } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
/**
 * @slot default - The text content
 */
let AegovText = class AegovText {
    constructor() {
        /**
         * The size of the text.
         * @default 'base'
         */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
    }
    componentWillLoad() {
        this._sizeWatcher = watchResponsiveProp(this.size, TEXT_SIZES, 'base', v => {
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
        this._sizeWatcher = watchResponsiveProp(this.size, TEXT_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    /**
     * Get the CSS classes based on component props
     */
    getTextClasses() {
        const classes = ['mb-8', 'mt-0'];
        // Size classes
        const sizeClasses = {
            sm: 'text-sm',
            base: 'text-base',
            lg: 'text-lg',
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
        return (h(Host, null,
            h("p", Object.assign({ class: this.getTextClasses() }, passThroughAttributes),
                h("slot", null))));
    }
};
__decorate([
    Element()
], AegovText.prototype, "el", void 0);
__decorate([
    Prop()
], AegovText.prototype, "size", void 0);
__decorate([
    State()
], AegovText.prototype, "_resolvedSize", void 0);
__decorate([
    Prop()
], AegovText.prototype, "extraClass", void 0);
__decorate([
    Watch('size')
], AegovText.prototype, "onSizeChange", null);
AegovText = __decorate([
    Component({
        tag: 'aegov-text',
        styleUrl: 'aegov-text.css',
        scoped: false,
        shadow: false
    })
], AegovText);
export { AegovText };
