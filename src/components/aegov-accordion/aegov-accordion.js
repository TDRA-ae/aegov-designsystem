var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Host, h, Prop, State, Element, Watch } from '@stencil/core';
import { ACCORDION_ICONS, ACCORDION_SIZES } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import { generateId } from '../../utils/id-generator';
const TAG = 'aegov-accordion';
const ctx = (prop) => ({ component: TAG, prop });
/**
 * Accordion component for collapsible content sections
 *
 * @slot - Accordion items (aegov-accordion-item elements)
 */
let AegovAccordion = class AegovAccordion {
    constructor() {
        this.itemListeners = new Map();
        this.cachedItems = [];
        /**
         * Whether multiple accordion items can be open at the same time
         */
        this.isMultiple = false;
        /**
         * Icon style for accordion items
         */
        this.icon = 'chevron';
        /**
         * Whether to show border around the accordion
         */
        this.isBordered = false;
        /**
         * Size of the accordion items — controls heading font size.
         * sm = 14px, base = 16px (default), lg = 18px
         */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
    }
    componentWillLoad() {
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-accordion');
        }
        warnIfInvalidEnumProp(this.icon, ACCORDION_ICONS, 'chevron', ctx('icon'));
        this._sizeWatcher = watchResponsiveProp(this.size, ACCORDION_SIZES, 'base', v => {
            this._resolvedSize = v;
            if (this.el.isConnected) {
                this.syncItemProps();
            }
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    componentDidLoad() {
        this.refreshItemCache();
        this.setupEventListeners();
        // Open default item if specified
        if (this.defaultOpen !== undefined) {
            const items = this.cachedItems;
            if (items[this.defaultOpen]) {
                items[this.defaultOpen].isOpen = true;
            }
        }
        // Set icon and position flags on all items
        this.syncItemProps();
    }
    disconnectedCallback() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this.removeEventListeners();
        this.cachedItems = [];
    }
    onIconChange(v) {
        warnIfInvalidEnumProp(v, ACCORDION_ICONS, 'chevron', ctx('icon'));
        this.syncItemProps();
    }
    onSizeChange() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, ACCORDION_SIZES, 'base', v => {
            this._resolvedSize = v;
            if (this.el.isConnected) {
                this.syncItemProps();
            }
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    refreshItemCache() {
        const allItems = Array.from(this.el.querySelectorAll('aegov-accordion-item'));
        this.cachedItems = allItems.filter((item) => {
            var _a;
            const parentAccordion = (_a = item.parentElement) === null || _a === void 0 ? void 0 : _a.closest('aegov-accordion');
            return parentAccordion === this.el;
        });
    }
    syncItemProps() {
        this.cachedItems.forEach((item, index) => {
            item.icon = this.icon;
            item.size = this._resolvedSize;
            item.isFirst = index === 0;
            item.isLast = index === this.cachedItems.length - 1;
        });
    }
    removeEventListeners() {
        this.itemListeners.forEach((listener, item) => {
            item.removeEventListener('aegovAccordionItemToggle', listener);
        });
        this.itemListeners.clear();
    }
    setupEventListeners() {
        this.removeEventListeners();
        const items = this.cachedItems;
        items.forEach((item, index) => {
            const listener = ((event) => {
                const eventTarget = event.target;
                const isDirectChild = items.includes(eventTarget);
                if (!isDirectChild) {
                    return;
                }
                event.stopPropagation();
                const shouldOpen = event.detail.open;
                if (shouldOpen && !this.isMultiple) {
                    items.forEach((otherItem, otherIndex) => {
                        if (otherIndex !== index) {
                            otherItem.isOpen = false;
                        }
                    });
                }
                item.isOpen = shouldOpen;
            });
            item.addEventListener('aegovAccordionItemToggle', listener);
            this.itemListeners.set(item, listener);
        });
    }
    render() {
        const classes = [
            'aegov-accordion',
            this.isBordered && 'aegov-accordion__bordered'
        ].filter(Boolean).join(' ');
        return (h(Host, null,
            h("div", { class: classes, id: this.fieldId },
                h("slot", null))));
    }
};
__decorate([
    Element()
], AegovAccordion.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovAccordion.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovAccordion.prototype, "isMultiple", void 0);
__decorate([
    Prop()
], AegovAccordion.prototype, "defaultOpen", void 0);
__decorate([
    Prop()
], AegovAccordion.prototype, "icon", void 0);
__decorate([
    Prop()
], AegovAccordion.prototype, "isBordered", void 0);
__decorate([
    Prop()
], AegovAccordion.prototype, "size", void 0);
__decorate([
    State()
], AegovAccordion.prototype, "_resolvedSize", void 0);
__decorate([
    Watch('icon')
], AegovAccordion.prototype, "onIconChange", null);
__decorate([
    Watch('size')
], AegovAccordion.prototype, "onSizeChange", null);
AegovAccordion = __decorate([
    Component({
        tag: 'aegov-accordion',
        styleUrl: 'aegov-accordion.css',
        scoped: false,
    })
], AegovAccordion);
export { AegovAccordion };
