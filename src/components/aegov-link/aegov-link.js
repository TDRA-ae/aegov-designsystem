var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AegovLink_1;
import { Component, Prop, Watch, Event, Element, h, Host } from '@stencil/core';
import { LINK_TARGETS } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { generateId } from '../../utils/id-generator';
const TAG = 'aegov-link';
const ctx = (prop) => ({ component: TAG, prop });
/**
 * @slot default - The link text content
 */
let AegovLink = AegovLink_1 = class AegovLink {
    constructor() {
        /**
         * Handle link click
         */
        this.handleClick = (event) => {
            // Emit custom event
            const customEvent = this.aegovLinkClick.emit({
                href: this.href,
                event
            });
            // If preventDefault was called on the custom event, stop default navigation
            if (customEvent.defaultPrevented) {
                event.preventDefault();
            }
            // If there are listeners on the custom event, they can call event.preventDefault()
            // to stop navigation and handle it themselves
        };
    }
    componentWillLoad() {
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-link');
        }
        if (this.target !== undefined) {
            warnIfInvalidEnumProp(this.target, LINK_TARGETS, '_self', ctx('target'));
        }
    }
    onTargetChange(v) {
        if (v === undefined)
            return;
        warnIfInvalidEnumProp(v, LINK_TARGETS, '_self', ctx('target'));
    }
    /**
     * Get the CSS classes based on component props
     */
    getLinkClasses() {
        const classes = [
            'no-underline',
            'ease-in-out',
            'transition-colors',
            'duration-200',
            'text-primary-600'
        ];
        // Merge with custom classes if provided
        if (this.extraClass) {
            classes.push(this.extraClass);
        }
        return classes.join(' ');
    }
    render() {
        const passThroughAttrs = getPassThroughAttributes(this.el, AegovLink_1.PASS_THROUGH_ATTRS);
        return (h(Host, null,
            h("a", Object.assign({ id: this.fieldId, href: this.href, target: this.target, rel: this.rel || (this.target === '_blank' ? 'noopener noreferrer' : undefined), class: this.getLinkClasses(), onClick: this.handleClick }, passThroughAttrs),
                h("slot", null))));
    }
};
AegovLink.PASS_THROUGH_ATTRS = new Set(['title', 'referrerpolicy', 'hreflang', 'rel', 'target', 'download', 'type']);
__decorate([
    Element()
], AegovLink.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovLink.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovLink.prototype, "href", void 0);
__decorate([
    Prop()
], AegovLink.prototype, "target", void 0);
__decorate([
    Watch('target')
], AegovLink.prototype, "onTargetChange", null);
__decorate([
    Prop()
], AegovLink.prototype, "rel", void 0);
__decorate([
    Prop()
], AegovLink.prototype, "extraClass", void 0);
__decorate([
    Event()
], AegovLink.prototype, "aegovLinkClick", void 0);
AegovLink = AegovLink_1 = __decorate([
    Component({
        tag: 'aegov-link',
        styleUrl: 'aegov-link.css',
        scoped: false,
    })
], AegovLink);
export { AegovLink };
