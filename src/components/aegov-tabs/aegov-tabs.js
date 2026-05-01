var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, State, Event, Element, Listen, Watch, h } from '@stencil/core';
import { TAB_VARIANTS, TAB_SIZES, TAB_ORIENTATIONS } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import { generateId } from '../../utils/id-generator';
import { getPassThroughAttributes } from '../../utils/attributes';
const TAG = 'aegov-tabs';
const ctx = (prop) => ({ component: TAG, prop });
/**
 * @component aegov-tabs
 * @description Tab container that organizes content into panels.
 * Manages active tab state internally (uncontrolled) and wires up tab triggers
 * with their corresponding panels via matching tab-id attributes.
 *
 * @slot tabs   - Place aegov-tab elements here (use slot="tabs" on each)
 * @slot default - Place aegov-tab-panel elements here (no slot attribute needed)
 *
 * @example
 * <aegov-tabs default-open="overview" variant="simple">
 *   <aegov-tab slot="tabs" tab-id="overview">Overview</aegov-tab>
 *   <aegov-tab slot="tabs" tab-id="details">Details</aegov-tab>
 *   <aegov-tab-panel tab-id="overview">Overview content</aegov-tab-panel>
 *   <aegov-tab-panel tab-id="details">Details content</aegov-tab-panel>
 * </aegov-tabs>
 */
let AegovTabs = class AegovTabs {
    constructor() {
        /**
         * Visual style variant of the tabs.
         * - `simple`: Underline style (default)
         * - `segmented`: Button-group style, ideal for toggling views
         * - `pill`: Pill-shaped individual tabs
         */
        this.variant = 'simple';
        /**
         * The tab-id of the tab that should be active on initial render.
         * If not provided, the first non-disabled tab is activated.
         */
        this.defaultOpen = '';
        /**
         * Size of the tabs.
         */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
        /**
         * Enables horizontal scrolling when tabs overflow the container.
         * A faded gradient edge is shown to indicate scrollable content.
         */
        this.isScrollable = false;
        /**
         * Distributes tabs evenly to fill the full width of the container.
         * Each tab grows equally to occupy available space.
         */
        this.isStretchable = false;
        /**
         * Layout orientation of the tabs.
         * - `horizontal`: Tabs appear above the panels (default)
         * - `vertical`: Tabs appear to the side of the panels
         */
        this.orientation = 'horizontal';
        /**
         * Accessible label for the tablist element.
         * Provides context for screen readers about what the tabs control.
         */
        this.labelTablist = 'Tabs';
        /** Currently active tab id (internal uncontrolled state) */
        this.activeTabId = '';
    }
    componentWillLoad() {
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-tabs');
        }
        warnIfInvalidEnumProp(this.variant, TAB_VARIANTS, 'simple', ctx('variant'));
        warnIfInvalidEnumProp(this.orientation, TAB_ORIENTATIONS, 'horizontal', ctx('orientation'));
        this._sizeWatcher = watchResponsiveProp(this.size, TAB_SIZES, 'base', v => {
            this._resolvedSize = v;
            if (this.el.isConnected) {
                this.syncChildren();
            }
        });
        this._resolvedSize = this._sizeWatcher.current;
        if (this.defaultOpen) {
            this.activeTabId = this.defaultOpen;
        }
        else {
            const tabs = this.getTabElements();
            const first = tabs.find(t => !t.hasAttribute('is-disabled') && !t.hasAttribute('disabled'));
            if (first) {
                this.activeTabId = first.getAttribute('tab-id') || '';
            }
        }
    }
    componentDidLoad() {
        this.syncChildren();
        if (this.isScrollable && this.listEl) {
            this.checkScrollFade();
            this.scrollHandler = () => this.checkScrollFade();
            this.listEl.addEventListener('scroll', this.scrollHandler, { passive: true });
        }
    }
    disconnectedCallback() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        if (this.scrollHandler && this.listEl) {
            this.listEl.removeEventListener('scroll', this.scrollHandler);
        }
    }
    onActiveTabChange() {
        this.syncChildren();
        if (this.isScrollable && this.listEl) {
            this.checkScrollFade();
            const activeTab = this.el.querySelector(`aegov-tab[tab-id="${this.activeTabId}"]`);
            if (activeTab) {
                const scrollOpts = this.orientation === 'vertical'
                    ? { behavior: 'smooth', block: 'nearest', inline: 'start' }
                    : { behavior: 'smooth', block: 'nearest', inline: 'nearest' };
                activeTab.scrollIntoView(scrollOpts);
            }
        }
    }
    onVariantChange(v) {
        warnIfInvalidEnumProp(v, TAB_VARIANTS, 'simple', ctx('variant'));
        this.syncChildren();
    }
    onSizeChange() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, TAB_SIZES, 'base', v => {
            this._resolvedSize = v;
            if (this.el.isConnected) {
                this.syncChildren();
            }
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    onOrientationChange(v) {
        warnIfInvalidEnumProp(v, TAB_ORIENTATIONS, 'horizontal', ctx('orientation'));
        this.syncChildren();
    }
    handleTabSelect(event) {
        event.stopPropagation();
        this.activateTab(event.detail);
    }
    getTabElements() {
        return Array.from(this.el.querySelectorAll('aegov-tab'));
    }
    getPanelElements() {
        return Array.from(this.el.querySelectorAll('aegov-tab-panel'));
    }
    syncChildren() {
        const tabs = this.getTabElements();
        const panels = this.getPanelElements();
        tabs.forEach((tab) => {
            tab.activeTabId = this.activeTabId;
            tab.variant = this.variant;
            tab.size = this._resolvedSize;
            tab.orientation = this.orientation;
        });
        panels.forEach((panel) => {
            const tabId = panel.getAttribute('tab-id') || panel.tabId;
            panel.active = tabId === this.activeTabId;
        });
    }
    activateTab(tabId) {
        if (tabId === this.activeTabId)
            return;
        this.activeTabId = tabId;
        this.aegovTabChange.emit(tabId);
    }
    checkScrollFade() {
        if (!this.listEl || !this.listWrapperEl)
            return;
        if (this.orientation === 'vertical') {
            const { scrollTop, scrollHeight, clientHeight } = this.listEl;
            this.listWrapperEl.classList.toggle('has-start-fade', scrollTop > 4);
            this.listWrapperEl.classList.toggle('has-end-fade', scrollTop < scrollHeight - clientHeight - 4);
        }
        else {
            const { scrollLeft, scrollWidth, clientWidth } = this.listEl;
            // scrollLeft can be negative in RTL browsers
            const absScrollLeft = Math.abs(scrollLeft);
            this.listWrapperEl.classList.toggle('has-start-fade', absScrollLeft > 4);
            this.listWrapperEl.classList.toggle('has-end-fade', absScrollLeft < scrollWidth - clientWidth - 4);
        }
    }
    handleKeydown(event) {
        const target = event.target;
        // Only handle keyboard events originating from inside a tab button
        if (!target.closest('aegov-tab'))
            return;
        const allTabs = this.getTabElements();
        const enabledTabs = allTabs.filter(t => !t.hasAttribute('is-disabled') && !t.hasAttribute('disabled'));
        if (enabledTabs.length === 0)
            return;
        const currentIndex = enabledTabs.findIndex((t) => (t.getAttribute('tab-id') || t.tabId) === this.activeTabId);
        const isRtl = this.el.closest('[dir="rtl"]') !== null || document.documentElement.dir === 'rtl';
        let nextIndex = -1;
        const isVertical = this.orientation === 'vertical';
        switch (event.key) {
            case 'ArrowRight':
                if (!isVertical) {
                    nextIndex = isRtl
                        ? (currentIndex - 1 + enabledTabs.length) % enabledTabs.length
                        : (currentIndex + 1) % enabledTabs.length;
                }
                break;
            case 'ArrowLeft':
                if (!isVertical) {
                    nextIndex = isRtl
                        ? (currentIndex + 1) % enabledTabs.length
                        : (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
                }
                break;
            case 'ArrowDown':
                if (isVertical) {
                    nextIndex = (currentIndex + 1) % enabledTabs.length;
                }
                break;
            case 'ArrowUp':
                if (isVertical) {
                    nextIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
                }
                break;
            case 'Home':
                nextIndex = 0;
                break;
            case 'End':
                nextIndex = enabledTabs.length - 1;
                break;
            default:
                return;
        }
        if (nextIndex >= 0) {
            event.preventDefault();
            const nextTab = enabledTabs[nextIndex];
            const nextTabId = nextTab.getAttribute('tab-id') || nextTab.tabId;
            if (nextTabId) {
                this.activateTab(nextTabId);
                // Focus the button inside the aegov-tab
                const btnEl = nextTab.querySelector('button');
                if (btnEl)
                    btnEl.focus();
            }
        }
    }
    render() {
        const variant = TAB_VARIANTS.includes(this.variant) ? this.variant : 'simple';
        const size = this._resolvedSize;
        const orientation = TAB_ORIENTATIONS.includes(this.orientation) ? this.orientation : 'horizontal';
        const passThroughAttributes = getPassThroughAttributes(this.el);
        return (h("div", Object.assign({}, passThroughAttributes, { id: this.fieldId, class: `aegov-tabs tabs--${variant} tabs--${size}${this.isStretchable ? ' tabs--stretch' : ''}${orientation === 'vertical' ? ' tabs--vertical' : ''}` }),
            h("div", { class: `tabs__list-wrapper${this.isScrollable ? ' tabs__list-wrapper--scrollable' : ''}`, ref: el => (this.listWrapperEl = el) },
                h("div", { role: "tablist", "aria-label": this.labelTablist, "aria-orientation": orientation, class: "tabs__list", ref: el => (this.listEl = el) },
                    h("slot", { name: "tabs" }))),
            h("div", { class: "tabs__panels" },
                h("slot", null))));
    }
};
__decorate([
    Element()
], AegovTabs.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovTabs.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovTabs.prototype, "variant", void 0);
__decorate([
    Prop()
], AegovTabs.prototype, "defaultOpen", void 0);
__decorate([
    Prop()
], AegovTabs.prototype, "size", void 0);
__decorate([
    State()
], AegovTabs.prototype, "_resolvedSize", void 0);
__decorate([
    Prop()
], AegovTabs.prototype, "isScrollable", void 0);
__decorate([
    Prop()
], AegovTabs.prototype, "isStretchable", void 0);
__decorate([
    Prop()
], AegovTabs.prototype, "orientation", void 0);
__decorate([
    Prop()
], AegovTabs.prototype, "labelTablist", void 0);
__decorate([
    State()
], AegovTabs.prototype, "activeTabId", void 0);
__decorate([
    Event()
], AegovTabs.prototype, "aegovTabChange", void 0);
__decorate([
    Watch('activeTabId')
], AegovTabs.prototype, "onActiveTabChange", null);
__decorate([
    Watch('variant')
], AegovTabs.prototype, "onVariantChange", null);
__decorate([
    Watch('size')
], AegovTabs.prototype, "onSizeChange", null);
__decorate([
    Watch('orientation')
], AegovTabs.prototype, "onOrientationChange", null);
__decorate([
    Listen('aegovTabSelect')
], AegovTabs.prototype, "handleTabSelect", null);
__decorate([
    Listen('keydown')
], AegovTabs.prototype, "handleKeydown", null);
AegovTabs = __decorate([
    Component({
        tag: 'aegov-tabs',
        styleUrl: 'aegov-tabs.css',
        scoped: false,
        shadow: false,
    })
], AegovTabs);
export { AegovTabs };
