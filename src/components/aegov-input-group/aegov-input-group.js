var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Host, h, Prop, State, Element, Watch } from '@stencil/core';
import { INPUT_SIZES } from '../../utils/types';
import { watchResponsiveProp } from '../../utils/responsive-prop';
let AegovInputGroup = class AegovInputGroup {
    constructor() {
        /** The size of the input group. Propagated to child aegov-input and aegov-button. */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
    }
    componentWillLoad() {
        this._sizeWatcher = watchResponsiveProp(this.size, INPUT_SIZES, 'base', v => {
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
        this._sizeWatcher = watchResponsiveProp(this.size, INPUT_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    componentDidLoad() {
        this.propagateSize();
    }
    componentDidUpdate() {
        this.propagateSize();
    }
    propagateSize() {
        const inputs = this.el.querySelectorAll('aegov-input');
        inputs.forEach((input) => {
            input.size = this._resolvedSize;
        });
        const buttons = this.el.querySelectorAll('aegov-button');
        buttons.forEach((btn) => {
            btn.size = this._resolvedSize;
        });
    }
    getGroupClasses() {
        const classes = ['aegov-input-group'];
        const sizeClasses = {
            xs: 'input-group--xs',
            sm: 'input-group--sm',
            base: 'input-group--base',
            lg: 'input-group--lg',
            xl: 'input-group--xl',
        };
        const size = this._resolvedSize;
        classes.push(sizeClasses[size]);
        if (this.extraClass) {
            classes.push(this.extraClass);
        }
        return classes.join(' ');
    }
    render() {
        return (h(Host, null,
            h("div", { class: this.getGroupClasses() },
                this.addonPrefix && h("span", { class: "input-group__addon input-group__addon--prefix" }, this.addonPrefix),
                h("slot", null),
                this.addonSuffix && h("span", { class: "input-group__addon input-group__addon--suffix" }, this.addonSuffix))));
    }
};
__decorate([
    Element()
], AegovInputGroup.prototype, "el", void 0);
__decorate([
    Prop()
], AegovInputGroup.prototype, "size", void 0);
__decorate([
    State()
], AegovInputGroup.prototype, "_resolvedSize", void 0);
__decorate([
    Prop()
], AegovInputGroup.prototype, "addonPrefix", void 0);
__decorate([
    Prop()
], AegovInputGroup.prototype, "addonSuffix", void 0);
__decorate([
    Prop()
], AegovInputGroup.prototype, "extraClass", void 0);
__decorate([
    Watch('size')
], AegovInputGroup.prototype, "onSizeChange", null);
AegovInputGroup = __decorate([
    Component({
        tag: 'aegov-input-group',
        styleUrl: 'aegov-input-group.css',
        scoped: false,
        shadow: false,
    })
], AegovInputGroup);
export { AegovInputGroup };
