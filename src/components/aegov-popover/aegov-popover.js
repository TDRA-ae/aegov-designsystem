var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AegovPopover_1;
import { Component, Host, h, Prop, Element, State, Listen, Event, Watch } from '@stencil/core';
import { POPOVER_POSITIONS, POPOVER_ALIGNS, POPOVER_TRIGGERS } from '../../utils/types';
import { generateId } from '../../utils/id-generator';
import { getFocusableElements, FOCUSABLE_SELECTORS, cycleFocus } from '../../utils/focus-management';
import { createPortal, removePortal } from '../../utils/portal-manager';
import { createKeyboardHandler } from '../../utils/keyboard-handler';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
const TAG = 'aegov-popover';
const ctx = (prop) => ({ component: TAG, prop });
/**
 * Design token values used in portal-injected styles.
 * Portal elements live outside Stencil's scope, so Tailwind utilities aren't available.
 */
const PORTAL_TOKENS = {
    borderColor: 'oklch(0.817 0.014 264.536)', // --color-slate-300
    shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    radius: '0.5rem',
    transition: 'opacity 200ms ease-in-out, transform 200ms ease-in-out',
    arrowSize: '10px',
    arrowBg: '#ffffff',
};
/** CSS injected into the portal element (scoped CSS can't reach it). */
const POPOVER_PORTAL_STYLES = `
  .aegov-popover-portal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    pointer-events: none;
  }

  .aegov-popover-portal .aegov-popover {
    background: ${PORTAL_TOKENS.arrowBg};
    border: 1px solid ${PORTAL_TOKENS.borderColor};
    border-radius: ${PORTAL_TOKENS.radius};
    box-shadow: ${PORTAL_TOKENS.shadow};
    position: fixed;
    visibility: hidden;
    pointer-events: auto;
    padding: 1rem;
    width: auto;
    min-width: 12rem;
    z-index: 9999;
    opacity: 0;
    transform: scale(0.95);
    transition: ${PORTAL_TOKENS.transition};
  }

  .aegov-popover-portal .aegov-popover[data-state="open"] {
    opacity: 1;
    transform: scale(1);
  }

  .aegov-popover-portal .aegov-popover a {
    display: block;
    margin: 0;
  }

  /* Arrow base */
  .aegov-popover-portal .aegov-popover__arrow {
    position: absolute;
    width: ${PORTAL_TOKENS.arrowSize};
    height: ${PORTAL_TOKENS.arrowSize};
    background: ${PORTAL_TOKENS.arrowBg};
    border: 1px solid ${PORTAL_TOKENS.borderColor};
    transform: rotate(45deg);
    z-index: -1;
  }

  /* Position-specific arrow: hide borders that face inside the popover */
  .aegov-popover-portal .aegov-popover[data-position="bottom"] .aegov-popover__arrow {
    top: -6px;
    border-bottom: none;
    border-right: none;
  }

  .aegov-popover-portal .aegov-popover[data-position="top"] .aegov-popover__arrow {
    bottom: -6px;
    border-top: none;
    border-left: none;
  }

  .aegov-popover-portal .aegov-popover[data-position="right"] .aegov-popover__arrow {
    left: -6px;
    border-right: none;
    border-top: none;
  }

  .aegov-popover-portal .aegov-popover[data-position="left"] .aegov-popover__arrow {
    right: -6px;
    border-left: none;
    border-bottom: none;
  }
`;
// Singleton to track currently open popover
let currentOpenPopover = null;
/**
 * Popover component that displays positioned content with an arrow marker
 *
 * @slot - Trigger element (button, link, etc.)
 * @slot popover-content - Popover content (any HTML/components)
 */
let AegovPopover = AegovPopover_1 = class AegovPopover {
    constructor() {
        this.isOpen = false;
        this.hasContentSlot = false;
        this.positionUpdateScheduled = false;
        this.positionRetryCount = 0;
        this.MAX_POSITION_RETRIES = 10;
        this.focusableElements = [];
        this.currentFocusIndex = -1;
        /**
         * Trigger type for showing the popover
         * @default 'click'
         */
        this.trigger = 'click';
        /**
         * Position of the popover relative to the trigger element
         * @default 'bottom'
         */
        this.position = 'bottom';
        /**
         * Alignment of the popover
         * @default 'center'
         */
        this.align = 'center';
        /**
         * Gap between popover and trigger element (in pixels)
         * @default 10
         */
        this.gap = 10;
        /**
         * Additional offset for popover positioning (in pixels)
         * @default 0
         */
        this.offset = 0;
        /**
         * Whether the popover is disabled
         * @default false
         */
        this.isDisabled = false;
        /**
         * Delay before showing popover on hover (in milliseconds)
         * @default 200
         */
        this.delayStart = 200;
        /**
         * Delay before hiding popover on hover (in milliseconds)
         * @default 0
         */
        this.delayEnd = 0;
        this.showPopover = () => {
            if (this.isDisabled)
                return;
            this.clearTimeouts();
            this.showTimeout = window.setTimeout(() => {
                this.isOpen = true;
            }, this.delayStart);
        };
        this.hidePopover = () => {
            this.clearTimeouts();
            const delay = this.trigger === 'hover'
                ? Math.max(this.delayEnd, AegovPopover_1.HOVER_HIDE_GRACE)
                : this.delayEnd;
            this.hideTimeout = window.setTimeout(() => {
                this.isOpen = false;
            }, delay);
        };
        this.handleTriggerMouseEnter = () => {
            if (this.trigger === 'hover') {
                this.showPopover();
            }
        };
        this.handleTriggerMouseLeave = (event) => {
            if (this.trigger === 'hover') {
                const relatedTarget = event.relatedTarget;
                if (relatedTarget && this.portalElement && this.portalElement.contains(relatedTarget)) {
                    return;
                }
                this.hidePopover();
            }
        };
        this.handleTriggerClick = (event) => {
            if (this.trigger === 'click' && !this.isDisabled) {
                event.stopPropagation();
                this.isOpen = !this.isOpen;
            }
        };
        this.handlePopoverMouseEnter = () => {
            if (this.trigger === 'hover') {
                this.clearTimeouts();
            }
        };
        this.handlePopoverMouseLeave = (event) => {
            if (this.trigger === 'hover') {
                const relatedTarget = event.relatedTarget;
                if (relatedTarget && this.triggerRef && this.triggerRef.contains(relatedTarget)) {
                    return;
                }
                this.hidePopover();
            }
        };
        this.keyHandler = createKeyboardHandler({
            onEscape: () => { this.isOpen = false; },
            onTab: (reverse) => { this.focusNextElement(reverse); },
            onArrowDown: () => { this.focusNextElement(false); },
            onArrowUp: () => { this.focusNextElement(true); },
        });
    }
    componentWillLoad() {
        warnIfInvalidEnumProp(this.trigger, POPOVER_TRIGGERS, 'click', ctx('trigger'));
        warnIfInvalidEnumProp(this.position, POPOVER_POSITIONS, 'bottom', ctx('position'));
        warnIfInvalidEnumProp(this.align, POPOVER_ALIGNS, 'center', ctx('align'));
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-popover');
        }
        this.checkSlotContent();
    }
    get triggerId() {
        return `${this.fieldId}-trigger`;
    }
    onTriggerChange(v) { warnIfInvalidEnumProp(v, POPOVER_TRIGGERS, 'click', ctx('trigger')); }
    onPositionChange(v) { warnIfInvalidEnumProp(v, POPOVER_POSITIONS, 'bottom', ctx('position')); }
    onAlignChange(v) { warnIfInvalidEnumProp(v, POPOVER_ALIGNS, 'center', ctx('align')); }
    componentDidLoad() {
        this.createPortalElement();
    }
    connectedCallback() {
        if (!this.portalElement && this.el.isConnected) {
            this.createPortalElement();
        }
    }
    disconnectedCallback() {
        this.clearTimeouts();
        this.returnPortalContent();
        this.removePortalElement();
    }
    checkSlotContent() {
        const contentSlot = this.el.querySelector('[slot="popover-content"]');
        this.hasContentSlot = contentSlot !== null;
    }
    createPortalElement() {
        if (!this.portalElement) {
            this.portalElement = createPortal('aegov-popover-portal');
        }
    }
    removePortalElement() {
        this.portalElement = removePortal(this.portalElement);
    }
    handleOpenChange(newValue) {
        if (newValue) {
            // Close any other open popover (singleton — no nesting)
            if (currentOpenPopover && currentOpenPopover !== this) {
                currentOpenPopover.closePopover();
            }
            currentOpenPopover = this;
            this.positionRetryCount = 0;
            this.renderPortalContent();
            this.schedulePositionUpdate();
            this.aegovPopoverOpen.emit();
            this.triggerElement = document.activeElement;
            setTimeout(() => this.setupFocusTrap(), 0);
        }
        else {
            if (currentOpenPopover === this) {
                currentOpenPopover = null;
            }
            this.cleanupPopoverListeners();
            this.returnPortalContent();
            this.popoverRef = undefined;
            this.arrowRef = undefined;
            this.positionUpdateScheduled = false;
            this.positionRetryCount = 0;
            if (this.portalElement) {
                this.portalElement.innerHTML = '';
            }
            this.aegovPopoverClose.emit();
            if (this.triggerElement) {
                this.triggerElement.focus({ preventScroll: true });
            }
        }
    }
    closePopover() {
        this.isOpen = false;
    }
    clearTimeouts() {
        if (this.showTimeout) {
            window.clearTimeout(this.showTimeout);
        }
        if (this.hideTimeout) {
            window.clearTimeout(this.hideTimeout);
        }
    }
    cleanupPopoverListeners() {
        if (this.popoverRef) {
            this.popoverRef.removeEventListener('mouseenter', this.handlePopoverMouseEnter);
            this.popoverRef.removeEventListener('mouseleave', this.handlePopoverMouseLeave);
        }
    }
    handleWindowEvents() {
        if (this.isOpen) {
            this.schedulePositionUpdate();
        }
    }
    schedulePositionUpdate() {
        if (this.positionUpdateScheduled)
            return;
        if (!this.isOpen)
            return;
        this.positionUpdateScheduled = true;
        requestAnimationFrame(() => {
            if (this.isOpen && this.popoverRef) {
                this.updatePopoverPosition();
            }
            this.positionUpdateScheduled = false;
        });
    }
    updatePopoverPosition() {
        if (!this.popoverRef || !this.triggerRef)
            return;
        const triggerRect = this.triggerRef.getBoundingClientRect();
        const popoverRect = this.popoverRef.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        // Close if trigger has scrolled out of viewport
        if (triggerRect.bottom < 0 ||
            triggerRect.top > viewportHeight ||
            triggerRect.right < 0 ||
            triggerRect.left > viewportWidth) {
            this.isOpen = false;
            return;
        }
        // Retry if not yet measured
        if (popoverRect.width === 0 || popoverRect.height === 0) {
            if (this.positionRetryCount < this.MAX_POSITION_RETRIES) {
                this.positionRetryCount++;
                requestAnimationFrame(() => this.updatePopoverPosition());
            }
            return;
        }
        let position = POPOVER_POSITIONS.includes(this.position) ? this.position : 'bottom';
        // Flip if not enough space
        if (position === 'bottom' && triggerRect.bottom + this.gap + popoverRect.height > viewportHeight) {
            if (triggerRect.top - this.gap - popoverRect.height > 0)
                position = 'top';
        }
        else if (position === 'top' && triggerRect.top - this.gap - popoverRect.height < 0) {
            if (triggerRect.bottom + this.gap + popoverRect.height < viewportHeight)
                position = 'bottom';
        }
        else if (position === 'right' && triggerRect.right + this.gap + popoverRect.width > viewportWidth) {
            if (triggerRect.left - this.gap - popoverRect.width > 0)
                position = 'left';
        }
        else if (position === 'left' && triggerRect.left - this.gap - popoverRect.width < 0) {
            if (triggerRect.right + this.gap + popoverRect.width < viewportWidth)
                position = 'right';
        }
        let top = 0;
        let left = 0;
        switch (position) {
            case 'top':
                top = triggerRect.top - popoverRect.height - this.gap;
                left = this.calculateHorizontalPosition(triggerRect, popoverRect);
                break;
            case 'bottom':
                top = triggerRect.bottom + this.gap;
                left = this.calculateHorizontalPosition(triggerRect, popoverRect);
                break;
            case 'left':
                top = this.calculateVerticalPosition(triggerRect, popoverRect);
                left = triggerRect.left - popoverRect.width - this.gap;
                break;
            case 'right':
                top = this.calculateVerticalPosition(triggerRect, popoverRect);
                left = triggerRect.right + this.gap;
                break;
        }
        // Apply offset
        if (position === 'top' || position === 'bottom') {
            left += this.offset;
        }
        else {
            top += this.offset;
        }
        // Ensure within viewport
        if (left < 8)
            left = 8;
        else if (left + popoverRect.width > viewportWidth)
            left = viewportWidth - popoverRect.width - 8;
        if (top < 8)
            top = 8;
        else if (top + popoverRect.height > viewportHeight)
            top = viewportHeight - popoverRect.height - 8;
        // Transform origin for animation
        const originX = position === 'left' ? '100%' : position === 'right' ? '0%' : '50%';
        const originY = position === 'top' ? '100%' : position === 'bottom' ? '0%' : '50%';
        this.popoverRef.style.top = `${top}px`;
        this.popoverRef.style.left = `${left}px`;
        this.popoverRef.style.transformOrigin = `${originX} ${originY}`;
        this.popoverRef.style.visibility = 'visible';
        this.popoverRef.setAttribute('data-position', position);
        // Position the arrow relative to the trigger center
        this.positionArrow(triggerRect, top, left, popoverRect, position);
    }
    positionArrow(triggerRect, popoverTop, popoverLeft, popoverRect, position) {
        if (!this.arrowRef)
            return;
        const arrowSize = 10;
        const halfArrow = arrowSize / 2;
        const minInset = 8; // keep arrow inside rounded corners
        if (position === 'top' || position === 'bottom') {
            // Horizontal: center arrow on trigger center, clamped to popover bounds
            const triggerCenterX = triggerRect.left + triggerRect.width / 2;
            let arrowLeft = triggerCenterX - popoverLeft - halfArrow;
            arrowLeft = Math.max(minInset, Math.min(arrowLeft, popoverRect.width - arrowSize - minInset));
            this.arrowRef.style.left = `${arrowLeft}px`;
            this.arrowRef.style.top = '';
        }
        else {
            // Vertical: center arrow on trigger center, clamped to popover bounds
            const triggerCenterY = triggerRect.top + triggerRect.height / 2;
            let arrowTop = triggerCenterY - popoverTop - halfArrow;
            arrowTop = Math.max(minInset, Math.min(arrowTop, popoverRect.height - arrowSize - minInset));
            this.arrowRef.style.top = `${arrowTop}px`;
            this.arrowRef.style.left = '';
        }
    }
    calculateHorizontalPosition(triggerRect, popoverRect) {
        switch (this.align) {
            case 'start':
                return triggerRect.left;
            case 'end':
                return triggerRect.right - popoverRect.width;
            case 'center':
            default:
                return triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
        }
    }
    calculateVerticalPosition(triggerRect, popoverRect) {
        switch (this.align) {
            case 'start':
                return triggerRect.top;
            case 'end':
                return triggerRect.bottom - popoverRect.height;
            case 'center':
            default:
                return triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
        }
    }
    handleDocumentClick(event) {
        if (this.isOpen) {
            const target = event.target;
            if (!this.el.contains(target) && this.portalElement && !this.portalElement.contains(target)) {
                this.isOpen = false;
            }
        }
    }
    handleKeyDown(event) {
        if (!this.isOpen)
            return;
        this.keyHandler(event);
    }
    setupFocusTrap() {
        if (!this.popoverRef)
            return;
        this.focusableElements = getFocusableElements(this.popoverRef, FOCUSABLE_SELECTORS);
        if (this.focusableElements.length > 0) {
            this.currentFocusIndex = 0;
            this.focusableElements[0].focus();
        }
    }
    focusNextElement(reverse = false) {
        this.currentFocusIndex = cycleFocus(this.focusableElements, this.currentFocusIndex, reverse);
    }
    renderPortalContent() {
        if (!this.portalElement || !this.hasContentSlot)
            return;
        const contentSlot = this.el.querySelector('[slot="popover-content"]');
        if (!contentSlot)
            return;
        this.contentSlotRef = contentSlot;
        // Clear portal
        this.portalElement.innerHTML = '';
        // Inject styles
        const styleElement = document.createElement('style');
        styleElement.textContent = POPOVER_PORTAL_STYLES;
        this.portalElement.appendChild(styleElement);
        // Create popover container
        const popoverContainer = document.createElement('div');
        popoverContainer.className = 'aegov-popover';
        popoverContainer.id = this.fieldId;
        popoverContainer.setAttribute('role', 'dialog');
        popoverContainer.setAttribute('aria-labelledby', this.triggerId);
        popoverContainer.setAttribute('data-state', 'open');
        popoverContainer.setAttribute('data-position', POPOVER_POSITIONS.includes(this.position) ? this.position : 'bottom');
        // Move the original slot element into the portal (not clone)
        contentSlot.removeAttribute('slot');
        popoverContainer.appendChild(contentSlot);
        // Create arrow element
        const arrowEl = document.createElement('div');
        arrowEl.className = 'aegov-popover__arrow';
        popoverContainer.appendChild(arrowEl);
        this.arrowRef = arrowEl;
        // Add event listeners
        popoverContainer.addEventListener('mouseenter', this.handlePopoverMouseEnter);
        popoverContainer.addEventListener('mouseleave', this.handlePopoverMouseLeave);
        this.portalElement.appendChild(popoverContainer);
        this.popoverRef = popoverContainer;
    }
    returnPortalContent() {
        if (!this.contentSlotRef || !this.slotWrapperRef)
            return;
        this.contentSlotRef.setAttribute('slot', 'popover-content');
        this.slotWrapperRef.appendChild(this.contentSlotRef);
        this.contentSlotRef = undefined;
    }
    render() {
        const hasContent = this.hasContentSlot;
        return (h(Host, null,
            h("div", { class: "aegov-popover-trigger", id: this.triggerId, ref: (el) => (this.triggerRef = el), onMouseEnter: this.handleTriggerMouseEnter, onMouseLeave: this.handleTriggerMouseLeave, onClick: this.handleTriggerClick, "aria-haspopup": "dialog", "aria-expanded": this.isOpen.toString(), "aria-controls": this.isOpen ? this.fieldId : undefined },
                h("slot", null)),
            hasContent && (h("div", { style: { display: 'none' }, ref: (el) => (this.slotWrapperRef = el) },
                h("slot", { name: "popover-content" })))));
    }
};
AegovPopover.HOVER_HIDE_GRACE = 100;
__decorate([
    Element()
], AegovPopover.prototype, "el", void 0);
__decorate([
    State()
], AegovPopover.prototype, "isOpen", void 0);
__decorate([
    State()
], AegovPopover.prototype, "hasContentSlot", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovPopover.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovPopover.prototype, "trigger", void 0);
__decorate([
    Prop()
], AegovPopover.prototype, "position", void 0);
__decorate([
    Prop()
], AegovPopover.prototype, "align", void 0);
__decorate([
    Prop()
], AegovPopover.prototype, "gap", void 0);
__decorate([
    Prop()
], AegovPopover.prototype, "offset", void 0);
__decorate([
    Prop()
], AegovPopover.prototype, "isDisabled", void 0);
__decorate([
    Prop()
], AegovPopover.prototype, "delayStart", void 0);
__decorate([
    Prop()
], AegovPopover.prototype, "delayEnd", void 0);
__decorate([
    Event()
], AegovPopover.prototype, "aegovPopoverOpen", void 0);
__decorate([
    Event()
], AegovPopover.prototype, "aegovPopoverClose", void 0);
__decorate([
    Watch('trigger')
], AegovPopover.prototype, "onTriggerChange", null);
__decorate([
    Watch('position')
], AegovPopover.prototype, "onPositionChange", null);
__decorate([
    Watch('align')
], AegovPopover.prototype, "onAlignChange", null);
__decorate([
    Watch('isOpen')
], AegovPopover.prototype, "handleOpenChange", null);
__decorate([
    Listen('scroll', { target: 'window', passive: true }),
    Listen('resize', { target: 'window', passive: true })
], AegovPopover.prototype, "handleWindowEvents", null);
__decorate([
    Listen('click', { target: 'document' })
], AegovPopover.prototype, "handleDocumentClick", null);
__decorate([
    Listen('keydown', { target: 'document' })
], AegovPopover.prototype, "handleKeyDown", null);
AegovPopover = AegovPopover_1 = __decorate([
    Component({
        tag: 'aegov-popover',
        styleUrl: 'aegov-popover.css',
        scoped: true,
    })
], AegovPopover);
export { AegovPopover };
