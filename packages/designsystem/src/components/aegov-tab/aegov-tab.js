var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, Watch, State, Event, Element, h } from '@stencil/core';
import { TAB_VARIANTS, TAB_SIZES, TAB_ORIENTATIONS } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
const TAG = 'aegov-tab';
const ctx = (prop) => ({ component: TAG, prop });
/**
 * @component aegov-tab
 * @description A single tab trigger. Must be placed inside an aegov-tabs component
 * with slot="tabs". Pairs with a corresponding aegov-tab-panel via matching tab-id.
 *
 * @slot default    - Tab label text
 * @slot icon       - Optional icon shown before the label
 * @slot icon-end   - Optional icon shown after the label
 *
 * @example
 * <aegov-tab slot="tabs" tab-id="profile">
 *   <svg slot="icon" ...></svg>
 *   Profile
 * </aegov-tab>
 */
let AegovTab = class AegovTab {
    constructor() {
        /**
         * Disables this tab and its associated panel.
         */
        this.isDisabled = false;
        /**
         * The currently active tab id. Set automatically by the parent aegov-tabs.
         */
        this.activeTabId = '';
        /**
         * Visual variant of the tabs. Set automatically by the parent aegov-tabs.
         */
        this.variant = 'simple';
        /**
         * Size of the tab. Set automatically by the parent aegov-tabs.
         */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
        /**
         * Orientation of the tabs. Set automatically by the parent aegov-tabs.
         */
        this.orientation = 'horizontal';
        this.hasIconSlot = false;
        this.hasIconEndSlot = false;
    }
    componentWillLoad() {
        warnIfInvalidEnumProp(this.variant, TAB_VARIANTS, 'simple', ctx('variant'));
        warnIfInvalidEnumProp(this.orientation, TAB_ORIENTATIONS, 'horizontal', ctx('orientation'));
        this.hasIconSlot = !!this.el.querySelector('[slot="icon"]');
        this.hasIconEndSlot = !!this.el.querySelector('[slot="icon-end"]');
        this._sizeWatcher = watchResponsiveProp(this.size, TAB_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    disconnectedCallback() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    onVariantChange(v) { warnIfInvalidEnumProp(v, TAB_VARIANTS, 'simple', ctx('variant')); }
    onSizeChange() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, TAB_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    onOrientationChange(v) { warnIfInvalidEnumProp(v, TAB_ORIENTATIONS, 'horizontal', ctx('orientation')); }
    handleClick() {
        if (this.isDisabled)
            return;
        this.aegovTabSelect.emit(this.tabId);
    }
    render() {
        const isActive = this.tabId === this.activeTabId;
        const variant = TAB_VARIANTS.includes(this.variant) ? this.variant : 'simple';
        const orientation = TAB_ORIENTATIONS.includes(this.orientation) ? this.orientation : 'horizontal';
        return (h("button", { role: "tab", id: `tab-${this.tabId}`, "aria-selected": String(isActive), "aria-controls": `panel-${this.tabId}`, "aria-disabled": this.isDisabled ? 'true' : undefined, disabled: this.isDisabled, tabIndex: isActive ? 0 : -1, class: {
                'aegov-tab': true,
                [`tab__btn--${variant}`]: true,
                [`tab__btn--${this._resolvedSize}`]: true,
                'tab__btn--vertical': orientation === 'vertical',
                'tab__btn--active': isActive,
                'tab__btn--disabled': this.isDisabled,
            }, onClick: () => this.handleClick() },
            this.hasIconSlot && h("slot", { name: "icon" }),
            h("span", { class: "tab__label" },
                h("slot", null)),
            this.hasIconEndSlot && h("slot", { name: "icon-end" })));
    }
};
__decorate([
    Element()
], AegovTab.prototype, "el", void 0);
__decorate([
    Prop()
], AegovTab.prototype, "tabId", void 0);
__decorate([
    Prop()
], AegovTab.prototype, "isDisabled", void 0);
__decorate([
    Prop()
], AegovTab.prototype, "activeTabId", void 0);
__decorate([
    Prop()
], AegovTab.prototype, "variant", void 0);
__decorate([
    Prop()
], AegovTab.prototype, "size", void 0);
__decorate([
    State()
], AegovTab.prototype, "_resolvedSize", void 0);
__decorate([
    Prop()
], AegovTab.prototype, "orientation", void 0);
__decorate([
    State()
], AegovTab.prototype, "hasIconSlot", void 0);
__decorate([
    State()
], AegovTab.prototype, "hasIconEndSlot", void 0);
__decorate([
    Event({ bubbles: true, composed: true })
], AegovTab.prototype, "aegovTabSelect", void 0);
__decorate([
    Watch('variant')
], AegovTab.prototype, "onVariantChange", null);
__decorate([
    Watch('size')
], AegovTab.prototype, "onSizeChange", null);
__decorate([
    Watch('orientation')
], AegovTab.prototype, "onOrientationChange", null);
AegovTab = __decorate([
    Component({
        tag: 'aegov-tab',
        styleUrl: 'aegov-tab.css',
        scoped: false,
        shadow: false,
    })
], AegovTab);
export { AegovTab };
