var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AegovBreadcrumbsItem_1;
import { Component, Host, h, Prop, Event, Element, State, Watch } from '@stencil/core';
import { getPassThroughAttributes } from '../../utils/attributes';
/**
 * Breadcrumb item component
 *
 * **⚠️ IMPORTANT:** This component must be used inside `<aegov-breadcrumbs>` component.
 * Do not use this component standalone.
 *
 * @internal This component is designed to work only as a child of aegov-breadcrumbs
 * @slot - Content of the breadcrumb item
 */
let AegovBreadcrumbsItem = AegovBreadcrumbsItem_1 = class AegovBreadcrumbsItem {
    constructor() {
        this.slotContent = '';
        this.hasElementChildren = false;
        /**
         * Where to open the linked document
         */
        this.target = '_self';
        /**
         * Whether this is the last/current item in the breadcrumb trail
         * @internal - Set automatically by parent component
         */
        this.isLast = false;
        /**
         * Separator type to display after this item
         * @internal - Set automatically by parent component
         */
        this.separator = 'slash';
        /**
         * Whether to add schema.org microdata
         * @internal - Set automatically by parent component
         */
        this.isMicrodata = false;
        /**
         * Position in the breadcrumb list (1-indexed) for microdata
         * @internal - Set automatically by parent component
         */
        this.position = 1;
        this.handleClick = (event) => {
            this.aegovBreadcrumbItemClick.emit({
                href: this.href,
                event: event,
            });
            // Allow default navigation unless preventDefault is called on the event
        };
    }
    componentWillLoad() {
        var _a;
        // Validate that this component is inside aegov-breadcrumbs
        const parentBreadcrumbs = this.el.closest('aegov-breadcrumbs');
        if (!parentBreadcrumbs) {
            throw new Error('[aegov-breadcrumbs-item] This component must be used inside <aegov-breadcrumbs>. ' +
                'It cannot be used as a standalone component. ' +
                'Please wrap it with <aegov-breadcrumbs>...</aegov-breadcrumbs>');
        }
        // Check if there are element children (like SVG, icons, etc.)
        const childNodes = Array.from(this.el.childNodes);
        this.hasElementChildren = childNodes.some(node => node.nodeType === Node.ELEMENT_NODE);
        if (this.hasElementChildren) {
            // If there are element children (SVG, etc.), keep everything and render via slot
            // Don't remove anything - the slot will handle rendering both elements and text
        }
        else {
            // If only text content, capture it for truncation and remove the text nodes
            this.slotContent = ((_a = this.el.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
            childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.remove();
                }
            });
        }
    }
    handlePropChange() {
        // Force re-render when props change
    }
    truncateText(text) {
        if (!this.maxLength || text.length <= this.maxLength) {
            return text;
        }
        return text.substring(0, this.maxLength) + '…';
    }
    renderSeparator() {
        if (this.isLast) {
            return null;
        }
        if (this.separator === 'chevron') {
            return (h("svg", { class: "breadcrumb__separator", "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 256" },
                h("rect", { width: "256", height: "256", fill: "none" }),
                h("polyline", { points: "96 48 176 128 96 208", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "16" })));
        }
        // Default to slash separator
        return (h("span", { class: "breadcrumb__separator", "aria-hidden": "true" }, "/"));
    }
    render() {
        // If there are element children (SVG, icons, etc.), render the slot directly
        // Otherwise, render the truncated text
        const content = this.hasElementChildren ? h("slot", null) : this.truncateText(this.slotContent);
        const passThroughAttributes = getPassThroughAttributes(this.el, AegovBreadcrumbsItem_1.PASS_THROUGH_ATTRS);
        if (this.href) {
            return (h(Host, null,
                h("li", { class: "breadcrumb__item", itemProp: this.isMicrodata ? "itemListElement" : undefined, itemScope: this.isMicrodata ? true : undefined, itemType: this.isMicrodata ? "https://schema.org/ListItem" : undefined },
                    h("a", Object.assign({ href: this.href, target: this.target, onClick: this.handleClick, class: "breadcrumb-link", itemProp: this.isMicrodata ? "item" : undefined }, passThroughAttributes),
                        h("span", { itemProp: this.isMicrodata ? "name" : undefined }, content)),
                    this.isMicrodata && (h("meta", { itemProp: "position", content: this.position.toString() })),
                    h("span", null, this.renderSeparator()))));
        }
        return (h(Host, null,
            h("li", { class: "breadcrumb__item", itemProp: this.isMicrodata ? "itemListElement" : undefined, itemScope: this.isMicrodata ? true : undefined, itemType: this.isMicrodata ? "https://schema.org/ListItem" : undefined },
                h("span", Object.assign({ class: "breadcrumb-current", "aria-current": this.isLast ? 'page' : undefined, itemProp: this.isMicrodata ? "name" : undefined }, passThroughAttributes), content),
                this.isMicrodata && (h("meta", { itemProp: "position", content: this.position.toString() })),
                this.renderSeparator())));
    }
};
AegovBreadcrumbsItem.PASS_THROUGH_ATTRS = new Set(['title', 'hreflang', 'rel', 'referrerpolicy']);
__decorate([
    Element()
], AegovBreadcrumbsItem.prototype, "el", void 0);
__decorate([
    State()
], AegovBreadcrumbsItem.prototype, "slotContent", void 0);
__decorate([
    State()
], AegovBreadcrumbsItem.prototype, "hasElementChildren", void 0);
__decorate([
    Prop({ mutable: true })
], AegovBreadcrumbsItem.prototype, "href", void 0);
__decorate([
    Prop({ mutable: true })
], AegovBreadcrumbsItem.prototype, "target", void 0);
__decorate([
    Prop({ mutable: true })
], AegovBreadcrumbsItem.prototype, "isLast", void 0);
__decorate([
    Prop({ mutable: true })
], AegovBreadcrumbsItem.prototype, "maxLength", void 0);
__decorate([
    Prop({ mutable: true })
], AegovBreadcrumbsItem.prototype, "separator", void 0);
__decorate([
    Prop({ mutable: true })
], AegovBreadcrumbsItem.prototype, "isMicrodata", void 0);
__decorate([
    Prop({ mutable: true })
], AegovBreadcrumbsItem.prototype, "position", void 0);
__decorate([
    Event()
], AegovBreadcrumbsItem.prototype, "aegovBreadcrumbItemClick", void 0);
__decorate([
    Watch('href'),
    Watch('separator'),
    Watch('isLast'),
    Watch('maxLength'),
    Watch('isMicrodata'),
    Watch('position')
], AegovBreadcrumbsItem.prototype, "handlePropChange", null);
AegovBreadcrumbsItem = AegovBreadcrumbsItem_1 = __decorate([
    Component({
        tag: 'aegov-breadcrumbs-item',
        styleUrl: 'aegov-breadcrumbs-item.css',
        scoped: false,
    })
], AegovBreadcrumbsItem);
export { AegovBreadcrumbsItem };
