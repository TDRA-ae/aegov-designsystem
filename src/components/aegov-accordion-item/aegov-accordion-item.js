var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Host, h, Prop, Element, Event, Watch, State } from '@stencil/core';
/**
 * Accordion item component
 *
 * **⚠️ IMPORTANT:** This component must be used inside `<aegov-accordion>` component.
 * Do not use this component standalone.
 *
 * @internal This component is designed to work only as a child of aegov-accordion
 * @slot accordion-item-heading - Heading content for the accordion item
 * @slot accordion-item-content - Content that expands/collapses
 */
let AegovAccordionItem = class AegovAccordionItem {
    constructor() {
        this.contentHeight = 0;
        this.hasHeadingSlot = false;
        /**
         * Whether the accordion item is open
         * @internal - Set automatically by parent component
         */
        this.isOpen = false;
        /**
         * Whether the accordion item is disabled
         */
        this.isDisabled = false;
        /**
         * Icon style for the accordion item
         * @internal - Set automatically by parent component
         */
        this.icon = 'chevron';
        /**
         * Whether this is the first accordion item
         * @internal - Set automatically by parent component
         */
        this.isFirst = false;
        /**
         * Whether this is the last accordion item
         * @internal - Set automatically by parent component
         */
        this.isLast = false;
        /**
         * Size of the accordion item — controls heading font size.
         * @internal - Set automatically by parent component
         */
        this.size = 'base';
        this.handleToggle = () => {
            if (this.isDisabled) {
                return;
            }
            this.aegovAccordionItemToggle.emit({ open: !this.isOpen });
        };
        this.handleKeyDown = (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.handleToggle();
            }
        };
    }
    componentWillLoad() {
        var _a;
        // Generate a stable unique ID for ARIA linking
        this.itemId = `accordion-item-${Math.random().toString(36).substr(2, 9)}`;
        // Validate that this component is inside aegov-accordion
        const parentAccordion = this.el.closest('aegov-accordion');
        if (!parentAccordion) {
            throw new Error('[aegov-accordion-item] This component must be used inside <aegov-accordion>. ' +
                'It cannot be used as a standalone component. ' +
                'Please wrap it with <aegov-accordion>...</aegov-accordion>');
        }
        // Check if heading slot has content
        const headingSlot = this.el.querySelector('[slot="accordion-item-heading"]');
        this.hasHeadingSlot = headingSlot !== null && ((_a = headingSlot.textContent) === null || _a === void 0 ? void 0 : _a.trim().length) > 0;
    }
    componentDidLoad() {
        this.updateContentHeight();
        // Set up ResizeObserver to watch for content size changes (handles nested accordions)
        if (this.contentEl && typeof ResizeObserver !== 'undefined') {
            this.resizeObserver = new ResizeObserver(() => {
                // Only update if the accordion is open
                if (this.isOpen) {
                    this.updateContentHeight();
                }
            });
            this.resizeObserver.observe(this.contentEl);
        }
    }
    disconnectedCallback() {
        // Clean up ResizeObserver
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }
    handleOpenChange() {
        this.updateContentHeight();
    }
    updateContentHeight() {
        if (this.contentEl) {
            if (this.isOpen) {
                this.contentHeight = this.contentEl.scrollHeight;
            }
            else {
                this.contentHeight = 0;
            }
        }
    }
    render() {
        const classes = [
            'aegov-accordion-item',
            `accordion-item--${this.size}`,
            this.isOpen && 'accordion-item--open',
            this.isDisabled && 'accordion-item--disabled',
            this.isFirst && 'accordion-item__first',
            this.isLast && 'accordion-item__last'
        ].filter(Boolean).join(' ');
        return (h(Host, null,
            h("div", { class: classes },
                h("button", { class: "group accordion-item__header", onClick: this.handleToggle, onKeyDown: this.handleKeyDown, disabled: this.isDisabled, "aria-expanded": this.isOpen.toString(), "aria-controls": `${this.itemId}-content`, id: `${this.itemId}-trigger`, type: "button" },
                    h("div", { class: "accordion-item__heading" }, this.hasHeadingSlot ? (h("slot", { name: "accordion-item-heading" })) : (this.heading)),
                    this.icon === 'chevron' ? (h("svg", { class: "accordion-item__icon accordion-item__icon-chevron", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 256", "aria-hidden": "true" },
                        h("rect", { width: "256", height: "256", fill: "none" }),
                        h("polyline", { points: "208 96 128 176 48 96", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "24" }))) : (h("svg", { class: "accordion-item__icon accordion-item__icon-plus", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 256" },
                        h("rect", { width: "256", height: "256", fill: "none" }),
                        h("line", { x1: "40", y1: "128", x2: "216", y2: "128", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "24" }),
                        h("line", { x1: "128", y1: "40", x2: "128", y2: "216", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "24" })))),
                h("div", { class: "accordion-item__content-wrapper", style: { height: `${this.contentHeight}px` } },
                    h("div", { class: "accordion-item__content", id: `${this.itemId}-content`, role: "region", "aria-labelledby": `${this.itemId}-trigger`, ref: (el) => this.contentEl = el },
                        h("slot", null))))));
    }
};
__decorate([
    Element()
], AegovAccordionItem.prototype, "el", void 0);
__decorate([
    State()
], AegovAccordionItem.prototype, "contentHeight", void 0);
__decorate([
    State()
], AegovAccordionItem.prototype, "hasHeadingSlot", void 0);
__decorate([
    Prop()
], AegovAccordionItem.prototype, "heading", void 0);
__decorate([
    Prop({ mutable: true })
], AegovAccordionItem.prototype, "isOpen", void 0);
__decorate([
    Prop()
], AegovAccordionItem.prototype, "isDisabled", void 0);
__decorate([
    Prop({ mutable: true })
], AegovAccordionItem.prototype, "icon", void 0);
__decorate([
    Prop({ mutable: true })
], AegovAccordionItem.prototype, "isFirst", void 0);
__decorate([
    Prop({ mutable: true })
], AegovAccordionItem.prototype, "isLast", void 0);
__decorate([
    Prop({ mutable: true })
], AegovAccordionItem.prototype, "size", void 0);
__decorate([
    Event()
], AegovAccordionItem.prototype, "aegovAccordionItemToggle", void 0);
__decorate([
    Watch('isOpen')
], AegovAccordionItem.prototype, "handleOpenChange", null);
AegovAccordionItem = __decorate([
    Component({
        tag: 'aegov-accordion-item',
        styleUrl: 'aegov-accordion-item.css',
        scoped: false,
    })
], AegovAccordionItem);
export { AegovAccordionItem };
