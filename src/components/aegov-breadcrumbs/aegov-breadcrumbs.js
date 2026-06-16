var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Host, h, Prop, Element, Watch } from '@stencil/core';
import { BREADCRUMB_SEPARATORS } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { generateId } from '../../utils/id-generator';
const TAG = 'aegov-breadcrumbs';
const ctx = (prop) => ({ component: TAG, prop });
/**
 * @slot - Breadcrumb items (aegov-breadcrumbs-item elements)
 */
let AegovBreadcrumbs = class AegovBreadcrumbs {
    constructor() {
        /**
         * The separator style to use between breadcrumb items
         */
        this.separator = 'slash';
        /**
         * Whether to add schema.org microdata for structured data
         * @default false
         */
        this.isMicrodata = false;
    }
    componentWillLoad() {
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-breadcrumbs');
        }
        warnIfInvalidEnumProp(this.separator, BREADCRUMB_SEPARATORS, 'slash', ctx('separator'));
    }
    onSeparatorChange(v) { warnIfInvalidEnumProp(v, BREADCRUMB_SEPARATORS, 'slash', ctx('separator')); }
    componentDidLoad() {
        this.updateItems();
    }
    componentDidUpdate() {
        this.updateItems();
    }
    updateItems() {
        // Query all slotted breadcrumb items
        const items = Array.from(this.el.querySelectorAll('aegov-breadcrumbs-item'));
        // Set properties on each item
        items.forEach((item, index) => {
            item.separator = this.separator;
            if (this.maxLength !== undefined) {
                item.maxLength = this.maxLength;
            }
            // Pass microdata property to children
            item.isMicrodata = this.isMicrodata;
            // Set position for microdata (1-indexed)
            item.position = index + 1;
            // Mark the last item
            item.isLast = index === items.length - 1;
        });
    }
    render() {
        const passThroughAttributes = getPassThroughAttributes(this.el);
        return (h(Host, null,
            h("nav", Object.assign({ "aria-label": "Breadcrumb", id: this.fieldId, class: "aegov-breadcrumbs" }, passThroughAttributes),
                h("ol", { class: "breadcrumb__list", itemScope: this.isMicrodata ? true : undefined, itemType: this.isMicrodata ? "https://schema.org/BreadcrumbList" : undefined },
                    h("slot", null)))));
    }
};
__decorate([
    Element()
], AegovBreadcrumbs.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovBreadcrumbs.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovBreadcrumbs.prototype, "separator", void 0);
__decorate([
    Prop()
], AegovBreadcrumbs.prototype, "maxLength", void 0);
__decorate([
    Prop()
], AegovBreadcrumbs.prototype, "isMicrodata", void 0);
__decorate([
    Watch('separator')
], AegovBreadcrumbs.prototype, "onSeparatorChange", null);
__decorate([
    Watch('separator'),
    Watch('maxLength'),
    Watch('isMicrodata')
], AegovBreadcrumbs.prototype, "updateItems", null);
AegovBreadcrumbs = __decorate([
    Component({
        tag: 'aegov-breadcrumbs',
        styleUrl: 'aegov-breadcrumbs.css',
        scoped: false,
    })
], AegovBreadcrumbs);
export { AegovBreadcrumbs };
