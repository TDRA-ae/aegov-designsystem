var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Host, h, Prop, Element, State, Listen, Watch } from '@stencil/core';
import { TOOLTIP_POSITIONS, TOOLTIP_ALIGNS, TOOLTIP_TRIGGERS } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { getPassThroughAttributes } from '../../utils/attributes';
const TAG = 'aegov-tooltip';
const ctx = (prop) => ({ component: TAG, prop });
/**
 * Tooltip component that displays additional information on hover or click
 *
 * @slot - Trigger element (button, link, etc.)
 * @slot tooltip-content - Tooltip content (alternative to using content prop)
 */
let AegovTooltip = class AegovTooltip {
    constructor() {
        this.isVisible = false;
        this.hasContentSlot = false;
        this.positionUpdateScheduled = false;
        this.positionRetryCount = 0;
        this.MAX_POSITION_RETRIES = 10;
        /**
         * Position of the tooltip relative to the trigger element
         * @default 'top'
         */
        this.position = 'top';
        /**
         * Alignment of the tooltip
         * @default 'center'
         */
        this.align = 'center';
        /**
         * Trigger type for showing the tooltip
         * @default 'hover'
         */
        this.trigger = 'hover';
        /**
         * Gap between tooltip and trigger element (in pixels)
         * @default 8
         */
        this.gap = 8;
        /**
         * Additional offset for tooltip positioning (in pixels)
         * @default 0
         */
        this.offset = 0;
        /**
         * Whether the tooltip is disabled
         * @default false
         */
        this.isDisabled = false;
        /**
         * Delay before showing tooltip (in milliseconds)
         * @default 200
         */
        this.delayStart = 200;
        /**
         * Delay before hiding tooltip (in milliseconds)
         * @default 0
         */
        this.delayEnd = 0;
        this.showTooltip = () => {
            if (this.isDisabled)
                return;
            this.clearTimeouts();
            this.showTooltipTimeout = window.setTimeout(() => {
                this.isVisible = true;
            }, this.delayStart);
        };
        this.hideTooltip = () => {
            this.clearTimeouts();
            this.hideTimeout = window.setTimeout(() => {
                this.isVisible = false;
            }, this.delayEnd);
        };
        this.handleTriggerMouseEnter = () => {
            if (this.trigger === 'hover') {
                this.showTooltip();
            }
        };
        this.handleTriggerMouseLeave = () => {
            if (this.trigger === 'hover') {
                this.hideTooltip();
            }
        };
        this.handleTriggerClick = (event) => {
            if (this.trigger === 'click') {
                event.stopPropagation();
                this.isVisible = !this.isVisible;
            }
        };
    }
    componentWillLoad() {
        warnIfInvalidEnumProp(this.position, TOOLTIP_POSITIONS, 'top', ctx('position'));
        warnIfInvalidEnumProp(this.align, TOOLTIP_ALIGNS, 'center', ctx('align'));
        warnIfInvalidEnumProp(this.trigger, TOOLTIP_TRIGGERS, 'hover', ctx('trigger'));
        // Generate stable tooltip ID once
        this.tooltipId = `aegov-tooltip-${Math.random().toString(36).substr(2, 9)}`;
        // Check if tooltip-content slot has content
        this.checkSlotContent();
    }
    onPositionChange(v) { warnIfInvalidEnumProp(v, TOOLTIP_POSITIONS, 'top', ctx('position')); }
    onAlignChange(v) { warnIfInvalidEnumProp(v, TOOLTIP_ALIGNS, 'center', ctx('align')); }
    onTriggerChange(v) { warnIfInvalidEnumProp(v, TOOLTIP_TRIGGERS, 'hover', ctx('trigger')); }
    checkSlotContent() {
        var _a;
        const contentSlot = this.el.querySelector('[slot="tooltip-content"]');
        const hasSlot = contentSlot !== null && ((_a = contentSlot.textContent) === null || _a === void 0 ? void 0 : _a.trim().length) > 0;
        this.hasContentSlot = hasSlot;
    }
    handleVisibilityChange(newValue) {
        if (newValue) {
            // Reset retry count when showing tooltip
            this.positionRetryCount = 0;
            // Schedule position update after tooltip is rendered
            this.schedulePositionUpdate();
        }
        else {
            // Clear tooltip ref when hiding to prevent stale references
            this.tooltipRef = undefined;
            // Reset scheduled flag
            this.positionUpdateScheduled = false;
            this.positionRetryCount = 0;
        }
    }
    disconnectedCallback() {
        this.clearTimeouts();
    }
    clearTimeouts() {
        if (this.showTooltipTimeout) {
            window.clearTimeout(this.showTooltipTimeout);
        }
        if (this.hideTimeout) {
            window.clearTimeout(this.hideTimeout);
        }
    }
    handleWindowEvents() {
        if (this.isVisible) {
            this.schedulePositionUpdate();
        }
    }
    schedulePositionUpdate() {
        if (this.positionUpdateScheduled)
            return;
        // Only schedule if tooltip is actually visible
        if (!this.isVisible)
            return;
        this.positionUpdateScheduled = true;
        // Use double RAF to ensure tooltip is fully rendered and measured
        requestAnimationFrame(() => {
            // Check again if tooltip is still visible before second RAF
            if (!this.isVisible) {
                this.positionUpdateScheduled = false;
                return;
            }
            requestAnimationFrame(() => {
                // Final check before updating position
                if (this.isVisible && this.tooltipRef) {
                    this.updateTooltipPosition();
                }
                this.positionUpdateScheduled = false;
            });
        });
    }
    isRtl() {
        return getComputedStyle(this.el).direction === 'rtl';
    }
    updateTooltipPosition() {
        if (!this.tooltipRef || !this.triggerRef)
            return;
        const triggerRect = this.triggerRef.getBoundingClientRect();
        const tooltipRect = this.tooltipRef.getBoundingClientRect();
        // If tooltip hasn't been measured yet (width/height = 0), retry with limit
        if (tooltipRect.width === 0 || tooltipRect.height === 0) {
            // Prevent infinite loop by limiting retries
            if (this.positionRetryCount < this.MAX_POSITION_RETRIES) {
                this.positionRetryCount++;
                requestAnimationFrame(() => this.updateTooltipPosition());
            }
            else {
                // Max retries reached - tooltip content may be empty or hidden
                console.warn('Tooltip position update failed: Unable to measure tooltip dimensions after maximum retries');
            }
            return;
        }
        const rtl = this.isRtl();
        let top = 0;
        let left = 0;
        // In RTL, "left" and "right" positions are mirrored
        const effectivePosition = rtl
            ? this.position === 'left' ? 'right' : this.position === 'right' ? 'left' : this.position
            : this.position;
        // Calculate position based on placement
        switch (effectivePosition) {
            case 'top':
                top = triggerRect.top - tooltipRect.height - this.gap;
                left = this.calculateHorizontalPosition(triggerRect, tooltipRect);
                break;
            case 'bottom':
                top = triggerRect.bottom + this.gap;
                left = this.calculateHorizontalPosition(triggerRect, tooltipRect);
                break;
            case 'left':
                top = this.calculateVerticalPosition(triggerRect, tooltipRect);
                left = triggerRect.left - tooltipRect.width - this.gap;
                break;
            case 'right':
                top = this.calculateVerticalPosition(triggerRect, tooltipRect);
                left = triggerRect.right + this.gap;
                break;
        }
        // Apply offset (flip horizontal offset in RTL)
        if (this.position === 'top' || this.position === 'bottom') {
            left += rtl ? -this.offset : this.offset;
        }
        else {
            top += this.offset;
        }
        // Ensure tooltip stays within viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        if (left < 0) {
            left = 8;
        }
        else if (left + tooltipRect.width > viewportWidth) {
            left = viewportWidth - tooltipRect.width - 8;
        }
        if (top < 0) {
            top = 8;
        }
        else if (top + tooltipRect.height > viewportHeight) {
            top = viewportHeight - tooltipRect.height - 8;
        }
        // Apply styles directly to DOM to avoid triggering re-renders
        this.tooltipRef.style.top = `${top}px`;
        this.tooltipRef.style.left = `${left}px`;
        this.tooltipRef.style.visibility = 'visible';
    }
    calculateHorizontalPosition(triggerRect, tooltipRect) {
        const rtl = this.isRtl();
        // In RTL, 'start' means right edge and 'end' means left edge
        const effectiveAlign = rtl
            ? this.align === 'start' ? 'end' : this.align === 'end' ? 'start' : this.align
            : this.align;
        switch (effectiveAlign) {
            case 'start':
                return triggerRect.left;
            case 'end':
                return triggerRect.right - tooltipRect.width;
            case 'center':
            default:
                return triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        }
    }
    calculateVerticalPosition(triggerRect, tooltipRect) {
        switch (this.align) {
            case 'start':
                return triggerRect.top;
            case 'end':
                return triggerRect.bottom - tooltipRect.height;
            case 'center':
            default:
                return triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        }
    }
    handleDocumentClick(event) {
        if (this.trigger === 'click' && this.isVisible) {
            const target = event.target;
            if (!this.el.contains(target)) {
                this.isVisible = false;
            }
        }
    }
    handleKeyDown(event) {
        if (event.key === 'Escape' && this.isVisible) {
            this.isVisible = false;
        }
    }
    render() {
        const hasContent = this.hasContentSlot || this.content;
        const position = TOOLTIP_POSITIONS.includes(this.position) ? this.position : 'top';
        const passThroughAttributes = getPassThroughAttributes(this.el);
        return (h(Host, null,
            h("div", Object.assign({}, passThroughAttributes, { class: "aegov-tooltip-trigger", ref: (el) => (this.triggerRef = el), onMouseEnter: this.handleTriggerMouseEnter, onMouseLeave: this.handleTriggerMouseLeave, onClick: this.handleTriggerClick, "aria-describedby": this.isVisible ? this.tooltipId : undefined, "aria-expanded": this.trigger === 'click' ? this.isVisible.toString() : undefined }),
                h("slot", null)),
            hasContent && (h("div", { id: this.tooltipId, ref: (el) => (this.tooltipRef = el), class: {
                    'aegov-tooltip': true,
                    [`tooltip--${position}`]: true,
                    [`tooltip--align-${this.align}`]: true,
                }, style: { display: this.isVisible ? 'block' : 'none' }, role: "tooltip" },
                h("div", { class: "tooltip__content" }, this.hasContentSlot ? (h("slot", { name: "tooltip-content" })) : (this.content)),
                h("div", { class: "tooltip__arrow" })))));
    }
};
__decorate([
    Element()
], AegovTooltip.prototype, "el", void 0);
__decorate([
    State()
], AegovTooltip.prototype, "isVisible", void 0);
__decorate([
    State()
], AegovTooltip.prototype, "hasContentSlot", void 0);
__decorate([
    Prop()
], AegovTooltip.prototype, "content", void 0);
__decorate([
    Prop()
], AegovTooltip.prototype, "position", void 0);
__decorate([
    Prop()
], AegovTooltip.prototype, "align", void 0);
__decorate([
    Prop()
], AegovTooltip.prototype, "trigger", void 0);
__decorate([
    Prop()
], AegovTooltip.prototype, "gap", void 0);
__decorate([
    Prop()
], AegovTooltip.prototype, "offset", void 0);
__decorate([
    Prop()
], AegovTooltip.prototype, "isDisabled", void 0);
__decorate([
    Prop()
], AegovTooltip.prototype, "delayStart", void 0);
__decorate([
    Prop()
], AegovTooltip.prototype, "delayEnd", void 0);
__decorate([
    Watch('position')
], AegovTooltip.prototype, "onPositionChange", null);
__decorate([
    Watch('align')
], AegovTooltip.prototype, "onAlignChange", null);
__decorate([
    Watch('trigger')
], AegovTooltip.prototype, "onTriggerChange", null);
__decorate([
    Watch('isVisible')
], AegovTooltip.prototype, "handleVisibilityChange", null);
__decorate([
    Listen('scroll', { target: 'window', passive: true }),
    Listen('resize', { target: 'window', passive: true })
], AegovTooltip.prototype, "handleWindowEvents", null);
__decorate([
    Listen('click', { target: 'document' })
], AegovTooltip.prototype, "handleDocumentClick", null);
__decorate([
    Listen('keydown')
], AegovTooltip.prototype, "handleKeyDown", null);
AegovTooltip = __decorate([
    Component({
        tag: 'aegov-tooltip',
        styleUrl: 'aegov-tooltip.css',
        scoped: false,
    })
], AegovTooltip);
export { AegovTooltip };
