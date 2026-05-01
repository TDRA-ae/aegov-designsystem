var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AegovDropdown_1;
import { Component, Host, h, Prop, Element, State, Listen, Event, Watch, Method } from '@stencil/core';
import { DROPDOWN_POSITIONS, DROPDOWN_ALIGNS, DROPDOWN_TRIGGERS } from '../../utils/types';
import { generateId } from '../../utils/id-generator';
import { getFocusableElements, FOCUSABLE_SELECTORS, cycleFocus } from '../../utils/focus-management';
import { createPortal, removePortal } from '../../utils/portal-manager';
import { createKeyboardHandler } from '../../utils/keyboard-handler';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { getPassThroughAttributes } from '../../utils/attributes';
const TAG = 'aegov-dropdown';
const ctx = (prop) => ({ component: TAG, prop });
/**
 * Design token values used in portal-injected styles.
 * Portal elements live outside Stencil's scope, so Tailwind utilities aren't available —
 * these CSS values must be injected via JS. Keep in sync with the Tailwind theme.
 */
const PORTAL_TOKENS = {
    borderColor: 'oklch(0.817 0.014 264.536)', // --color-slate-300
    dividerColor: 'oklch(0.896 0.006 264.531)', // --color-slate-200
    shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    radius: '0.5rem',
    transition: 'opacity 200ms ease-in-out, transform 200ms ease-in-out',
};
/** CSS injected into the portal element (scoped CSS can't reach it). */
const DROPDOWN_PORTAL_STYLES = `
  .aegov-dropdown-portal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    pointer-events: none;
  }

  .aegov-dropdown-portal .aegov-dropdown {
    background: white;
    border: 1px solid ${PORTAL_TOKENS.borderColor};
    border-radius: ${PORTAL_TOKENS.radius};
    box-shadow: ${PORTAL_TOKENS.shadow};
    position: fixed;
    visibility: hidden;
    pointer-events: auto;
    padding: 0.5rem;
    width: auto;
    min-width: 12rem;
    z-index: 9999;
    opacity: 0;
    transform: scale(0.95);
    transition: ${PORTAL_TOKENS.transition};
  }

  .aegov-dropdown-portal .aegov-dropdown[data-state="open"] {
    opacity: 1;
    transform: scale(1);
  }

  .aegov-dropdown-portal .aegov-dropdown hr {
    border: none;
    border-top: 1px solid ${PORTAL_TOKENS.dividerColor};
    margin: 0.5rem 0;
  }

  .aegov-dropdown-portal .aegov-dropdown a {
    display: block;
    margin: 0;
  }

  .aegov-dropdown-portal .aegov-dropdown a[aria-disabled="true"],
  .aegov-dropdown-portal .aegov-dropdown button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .aegov-dropdown-portal .aegov-dropdown aegov-dropdown {
    display: block;
  }

  .aegov-dropdown-portal .aegov-dropdown aegov-dropdown .aegov-dropdown-trigger {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }
`;
// Singleton to track currently open dropdown
let currentOpenDropdown = null;
/**
 * Dropdown component that displays positioned content on trigger interaction
 *
 * @slot - Trigger element (button, link, etc.)
 * @slot dropdown-content - Dropdown content (any HTML/components)
 */
let AegovDropdown = AegovDropdown_1 = class AegovDropdown {
    constructor() {
        this.isOpen = false;
        this.hasContentSlot = false;
        this.positionUpdateScheduled = false;
        this.positionRetryCount = 0;
        this.MAX_POSITION_RETRIES = 10;
        this.focusableElements = [];
        this.currentFocusIndex = -1;
        /**
         * Whether the most recent open was triggered via keyboard. Drives the
         * decision to auto-focus the first menu item: keyboard opens move focus
         * into the menu (ARIA menu pattern), pointer opens leave focus where
         * the user put it.
         */
        this.openedViaKeyboard = false;
        /**
         * Trigger type for showing the dropdown
         * @default 'click'
         */
        this.trigger = 'click';
        /**
         * Position of the dropdown relative to the trigger element
         * @default 'bottom'
         */
        this.position = 'bottom';
        /**
         * Alignment of the dropdown
         * @default 'start'
         */
        this.align = 'start';
        /**
         * Gap between dropdown and trigger element (in pixels)
         * @default 8
         */
        this.gap = 8;
        /**
         * Additional offset for dropdown positioning (in pixels)
         * @default 0
         */
        this.offset = 0;
        /**
         * Whether the dropdown is disabled
         * @default false
         */
        this.isDisabled = false;
        /**
         * Delay before showing dropdown (in milliseconds)
         * @default 200
         */
        this.delayStart = 200;
        /**
         * Delay before hiding dropdown (in milliseconds)
         * @default 0
         */
        this.delayEnd = 0;
        this.showDropdown = () => {
            if (this.isDisabled)
                return;
            this.clearTimeouts();
            this.showTimeout = window.setTimeout(() => {
                this.openedViaKeyboard = false;
                this.isOpen = true;
            }, this.delayStart);
        };
        this.hideDropdown = () => {
            this.clearTimeouts();
            // For hover-triggered dropdowns, enforce a minimum grace period
            // so the cursor can cross the gap between trigger and dropdown panel.
            const delay = this.trigger === 'hover'
                ? Math.max(this.delayEnd, AegovDropdown_1.HOVER_HIDE_GRACE)
                : this.delayEnd;
            this.hideTimeout = window.setTimeout(() => {
                // Re-check: if the mouse re-entered while we were waiting, don't close
                this.isOpen = false;
            }, delay);
        };
        this.handleTriggerMouseEnter = () => {
            if (this.trigger === 'hover') {
                this.showDropdown();
            }
        };
        this.handleTriggerMouseLeave = (event) => {
            if (this.trigger === 'hover') {
                const relatedTarget = event.relatedTarget;
                if (relatedTarget) {
                    // Moving to our own dropdown content — don't hide
                    if (this.portalElement && this.portalElement.contains(relatedTarget)) {
                        return;
                    }
                    // Moving to any dropdown portal (e.g. our nested dropdown's portal) — don't hide
                    if (relatedTarget.closest && relatedTarget.closest('.aegov-dropdown-portal')) {
                        return;
                    }
                    // Moving to a nested dropdown trigger within the same tree — don't hide
                    if (relatedTarget.closest && relatedTarget.closest('aegov-dropdown')) {
                        return;
                    }
                }
                this.hideDropdown();
            }
        };
        this.handleTriggerClick = (event) => {
            if (this.trigger === 'click' && !this.isDisabled) {
                event.stopPropagation();
                // Click events fired by keyboard activation (Enter/Space on a focused
                // button) have detail === 0; real mouse/touch clicks have detail >= 1.
                this.openedViaKeyboard = event.detail === 0;
                this.isOpen = !this.isOpen;
            }
        };
        this.handleDropdownMouseEnter = () => {
            if (this.trigger === 'hover') {
                this.clearTimeouts();
            }
        };
        this.handleDropdownMouseLeave = (event) => {
            if (this.trigger === 'hover') {
                const relatedTarget = event.relatedTarget;
                if (relatedTarget) {
                    // Don't hide if moving to any dropdown portal (includes nested dropdown portals)
                    if (relatedTarget.closest && relatedTarget.closest('.aegov-dropdown-portal')) {
                        return;
                    }
                    // Don't hide if moving into our own portal element or a child within it
                    if (this.portalElement && this.portalElement.contains(relatedTarget)) {
                        return;
                    }
                    // Don't hide if moving to our trigger area
                    if (this.triggerRef && this.triggerRef.contains(relatedTarget)) {
                        return;
                    }
                    // Don't hide if moving to a nested aegov-dropdown component that's inside our dropdown
                    const targetDropdown = relatedTarget.closest && relatedTarget.closest('aegov-dropdown');
                    if (targetDropdown && this.dropdownRef && this.dropdownRef.contains(targetDropdown)) {
                        return;
                    }
                }
                // Check if a nested dropdown inside our panel is currently open.
                // The nested dropdown's panel lives in a separate portal, so the mouse may
                // have left our panel to enter it — relatedTarget can be null or the gap.
                if (this.hasOpenNestedDropdown()) {
                    return;
                }
                this.hideDropdown();
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
        warnIfInvalidEnumProp(this.trigger, DROPDOWN_TRIGGERS, 'click', ctx('trigger'));
        warnIfInvalidEnumProp(this.position, DROPDOWN_POSITIONS, 'bottom', ctx('position'));
        warnIfInvalidEnumProp(this.align, DROPDOWN_ALIGNS, 'start', ctx('align'));
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-dropdown');
        }
        // Check if dropdown-content slot has content
        this.checkSlotContent();
    }
    get triggerId() {
        return `${this.fieldId}-trigger`;
    }
    onTriggerChange(v) { warnIfInvalidEnumProp(v, DROPDOWN_TRIGGERS, 'click', ctx('trigger')); }
    onPositionChange(v) { warnIfInvalidEnumProp(v, DROPDOWN_POSITIONS, 'bottom', ctx('position')); }
    onAlignChange(v) { warnIfInvalidEnumProp(v, DROPDOWN_ALIGNS, 'start', ctx('align')); }
    componentDidLoad() {
        // Create portal element for dropdown content
        this.createPortalElement();
    }
    connectedCallback() {
        // Re-create the portal when this component is re-inserted into the DOM.
        // This happens when a parent dropdown moves its content (which contains
        // this nested dropdown) into a portal via appendChild — the browser fires
        // disconnectedCallback (destroying the portal) then connectedCallback.
        // componentDidLoad only runs once, so we must recreate the portal here.
        if (!this.portalElement && this.el.isConnected) {
            this.createPortalElement();
        }
    }
    disconnectedCallback() {
        this.clearTimeouts();
        this.cleanupDropdownListeners();
        this.returnPortalContent();
        this.removePortalElement();
    }
    checkSlotContent() {
        const contentSlot = this.el.querySelector('[slot="dropdown-content"]');
        const hasSlot = contentSlot !== null;
        this.hasContentSlot = hasSlot;
    }
    createPortalElement() {
        if (!this.portalElement) {
            this.portalElement = createPortal('aegov-dropdown-portal');
        }
    }
    removePortalElement() {
        this.portalElement = removePortal(this.portalElement);
    }
    cleanupDropdownListeners() {
        if (this.dropdownRef) {
            this.dropdownRef.removeEventListener('mouseenter', this.handleDropdownMouseEnter);
            this.dropdownRef.removeEventListener('mouseleave', this.handleDropdownMouseLeave);
        }
    }
    handleOpenChange(newValue) {
        if (newValue) {
            // Close any other open dropdown before opening this one
            // BUT: Don't close if the current dropdown is a parent of this dropdown (nested dropdown)
            if (currentOpenDropdown && currentOpenDropdown !== this) {
                // Check if this dropdown is nested inside the currently open dropdown
                const isNested = currentOpenDropdown.dropdownRef &&
                    currentOpenDropdown.dropdownRef.contains(this.el);
                if (!isNested) {
                    // Not a nested dropdown, close the current one
                    currentOpenDropdown.closeDropdown();
                }
            }
            // Set this as the currently open dropdown (even if nested, it becomes the "current")
            currentOpenDropdown = this;
            // Reset retry count when showing dropdown
            this.positionRetryCount = 0;
            // Render portal content
            this.renderPortalContent();
            // Schedule position update after dropdown is rendered
            this.schedulePositionUpdate();
            // Emit open event
            this.aegovDropdownOpen.emit();
            // Store the trigger element for focus restoration
            this.triggerElement = document.activeElement;
            // Always populate the focusable list so subsequent keyboard navigation
            // (Tab / Arrow keys) inside the menu works regardless of how it opened.
            // Only move focus into the menu when opened via keyboard (ARIA menu
            // pattern). Pointer opens leave focus where the user placed it.
            const moveFocus = this.openedViaKeyboard;
            setTimeout(() => this.setupFocusTrap(moveFocus), 0);
        }
        else {
            // Clear reference if this was the currently open dropdown
            if (currentOpenDropdown === this) {
                currentOpenDropdown = null;
            }
            // Remove event listeners before destroying DOM
            this.cleanupDropdownListeners();
            // Move content back into the host before clearing the portal
            this.returnPortalContent();
            // Clear dropdown ref when hiding
            this.dropdownRef = undefined;
            // Reset scheduled flag
            this.positionUpdateScheduled = false;
            this.positionRetryCount = 0;
            // Clear portal content
            if (this.portalElement) {
                this.portalElement.innerHTML = '';
            }
            // Emit close event
            this.aegovDropdownClose.emit();
            // Restore focus to trigger without scrolling the page.
            // When the dropdown closes because the trigger scrolled out of the
            // viewport, a plain .focus() would snap the page back to the trigger.
            if (this.triggerElement) {
                this.triggerElement.focus({ preventScroll: true });
            }
        }
    }
    /**
     * Public method to close this dropdown
     * Used by other dropdowns to close this one when they open
     */
    closeDropdown() {
        this.isOpen = false;
    }
    /**
     * Toggle the dropdown open/closed state regardless of triggerType.
     * Allows external triggers (e.g. a navbar-item chevron) to drive the
     * dropdown when triggerType is 'hover' or 'click'.
     *
     * @param viaKeyboard When true and this call opens the dropdown, the first
     *   focusable item receives focus (ARIA menu pattern). Pass true from
     *   keyboard handlers and false from pointer/mouse handlers.
     */
    async toggle(viaKeyboard = false) {
        if (this.isDisabled)
            return;
        this.openedViaKeyboard = viaKeyboard;
        this.isOpen = !this.isOpen;
    }
    clearTimeouts() {
        if (this.showTimeout) {
            window.clearTimeout(this.showTimeout);
        }
        if (this.hideTimeout) {
            window.clearTimeout(this.hideTimeout);
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
            if (this.isOpen && this.dropdownRef) {
                this.updateDropdownPosition();
            }
            this.positionUpdateScheduled = false;
        });
    }
    updateDropdownPosition() {
        if (!this.dropdownRef || !this.triggerRef)
            return;
        const triggerRect = this.triggerRef.getBoundingClientRect();
        const dropdownRect = this.dropdownRef.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        // Close dropdown if trigger has scrolled out of the viewport
        if (triggerRect.bottom < 0 ||
            triggerRect.top > viewportHeight ||
            triggerRect.right < 0 ||
            triggerRect.left > viewportWidth) {
            this.isOpen = false;
            return;
        }
        // If dropdown hasn't been measured yet (width/height = 0), retry with limit
        if (dropdownRect.width === 0 || dropdownRect.height === 0) {
            if (this.positionRetryCount < this.MAX_POSITION_RETRIES) {
                this.positionRetryCount++;
                requestAnimationFrame(() => this.updateDropdownPosition());
            }
            else {
                console.warn('Dropdown position update failed: Unable to measure dropdown dimensions after maximum retries');
            }
            return;
        }
        let position = DROPDOWN_POSITIONS.includes(this.position) ? this.position : 'bottom';
        // Check if there's enough space in the preferred position, flip if needed
        if (position === 'bottom' && triggerRect.bottom + this.gap + dropdownRect.height > viewportHeight) {
            if (triggerRect.top - this.gap - dropdownRect.height > 0) {
                position = 'top';
            }
        }
        else if (position === 'top' && triggerRect.top - this.gap - dropdownRect.height < 0) {
            if (triggerRect.bottom + this.gap + dropdownRect.height < viewportHeight) {
                position = 'bottom';
            }
        }
        else if (position === 'right' && triggerRect.right + this.gap + dropdownRect.width > viewportWidth) {
            if (triggerRect.left - this.gap - dropdownRect.width > 0) {
                position = 'left';
            }
        }
        else if (position === 'left' && triggerRect.left - this.gap - dropdownRect.width < 0) {
            if (triggerRect.right + this.gap + dropdownRect.width < viewportWidth) {
                position = 'right';
            }
        }
        let top = 0;
        let left = 0;
        // Calculate position based on placement
        switch (position) {
            case 'top':
                top = triggerRect.top - dropdownRect.height - this.gap;
                left = this.calculateHorizontalPosition(triggerRect, dropdownRect);
                break;
            case 'bottom':
                top = triggerRect.bottom + this.gap;
                left = this.calculateHorizontalPosition(triggerRect, dropdownRect);
                break;
            case 'left':
                top = this.calculateVerticalPosition(triggerRect, dropdownRect);
                left = triggerRect.left - dropdownRect.width - this.gap;
                break;
            case 'right':
                top = this.calculateVerticalPosition(triggerRect, dropdownRect);
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
        // Ensure dropdown stays within viewport
        if (left < 8) {
            left = 8;
        }
        else if (left + dropdownRect.width > viewportWidth) {
            left = viewportWidth - dropdownRect.width - 8;
        }
        if (top < 8) {
            top = 8;
        }
        else if (top + dropdownRect.height > viewportHeight) {
            top = viewportHeight - dropdownRect.height - 8;
        }
        // Set transform origin for animation based on final position
        const originX = position === 'left' ? '100%' : position === 'right' ? '0%' : '50%';
        const originY = position === 'top' ? '100%' : position === 'bottom' ? '0%' : '50%';
        // Apply styles directly to DOM
        this.dropdownRef.style.top = `${top}px`;
        this.dropdownRef.style.left = `${left}px`;
        this.dropdownRef.style.transformOrigin = `${originX} ${originY}`;
        this.dropdownRef.style.visibility = 'visible';
    }
    calculateHorizontalPosition(triggerRect, dropdownRect) {
        switch (this.align) {
            case 'start':
                return triggerRect.left;
            case 'end':
                return triggerRect.right - dropdownRect.width;
            case 'center':
            default:
                return triggerRect.left + (triggerRect.width - dropdownRect.width) / 2;
        }
    }
    calculateVerticalPosition(triggerRect, dropdownRect) {
        switch (this.align) {
            case 'start':
                return triggerRect.top;
            case 'end':
                return triggerRect.bottom - dropdownRect.height;
            case 'center':
            default:
                return triggerRect.top + (triggerRect.height - dropdownRect.height) / 2;
        }
    }
    /**
     * Check if any nested aegov-dropdown inside our dropdown panel is currently open.
     */
    hasOpenNestedDropdown() {
        if (!this.dropdownRef)
            return false;
        const nestedDropdowns = this.dropdownRef.querySelectorAll('aegov-dropdown');
        for (let i = 0; i < nestedDropdowns.length; i++) {
            const nestedEl = nestedDropdowns[i];
            if (nestedEl.isOpen) {
                return true;
            }
        }
        return false;
    }
    handleDocumentClick(event) {
        if (this.isOpen) {
            const target = event.target;
            // Close if click is outside both trigger and dropdown
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
    setupFocusTrap(moveFocus = true) {
        if (!this.dropdownRef)
            return;
        this.focusableElements = getFocusableElements(this.dropdownRef, FOCUSABLE_SELECTORS);
        if (this.focusableElements.length > 0) {
            this.currentFocusIndex = 0;
            if (moveFocus) {
                this.focusableElements[0].focus();
            }
        }
    }
    focusNextElement(reverse = false) {
        this.currentFocusIndex = cycleFocus(this.focusableElements, this.currentFocusIndex, reverse);
    }
    renderPortalContent() {
        if (!this.portalElement || !this.hasContentSlot)
            return;
        // Get content slot element
        const contentSlot = this.el.querySelector('[slot="dropdown-content"]');
        if (!contentSlot)
            return;
        // Store reference so we can move it back on close
        this.contentSlotRef = contentSlot;
        // Clear portal
        this.portalElement.innerHTML = '';
        // Inject styles for portal content (scoped CSS can't reach portal elements)
        const styleElement = document.createElement('style');
        styleElement.textContent = DROPDOWN_PORTAL_STYLES;
        this.portalElement.appendChild(styleElement);
        // Create dropdown container
        const dropdownContainer = document.createElement('div');
        dropdownContainer.className = 'aegov-dropdown';
        dropdownContainer.id = this.fieldId;
        dropdownContainer.setAttribute('role', 'menu');
        dropdownContainer.setAttribute('aria-labelledby', this.triggerId);
        dropdownContainer.setAttribute('data-state', 'open');
        // Move the original element into the portal (not clone).
        // Cloning causes Stencil web components to double-render because
        // the clone captures already-hydrated DOM that Stencil re-initialises.
        contentSlot.removeAttribute('slot');
        dropdownContainer.appendChild(contentSlot);
        // Ensure focusable children have role="menuitem" for screen readers
        const focusable = dropdownContainer.querySelectorAll('button, a, [tabindex]');
        focusable.forEach(el => {
            if (!el.getAttribute('role')) {
                el.setAttribute('role', 'menuitem');
            }
        });
        // Add event listeners
        dropdownContainer.addEventListener('mouseenter', this.handleDropdownMouseEnter);
        dropdownContainer.addEventListener('mouseleave', this.handleDropdownMouseLeave);
        // Append to portal
        this.portalElement.appendChild(dropdownContainer);
        // Store reference
        this.dropdownRef = dropdownContainer;
    }
    /**
     * Moves the content slot element back into the host's hidden wrapper
     * so it is available for the next open cycle.
     */
    returnPortalContent() {
        if (!this.contentSlotRef || !this.slotWrapperRef)
            return;
        // Restore the slot attribute so the element is recognised by the named slot
        this.contentSlotRef.setAttribute('slot', 'dropdown-content');
        this.slotWrapperRef.appendChild(this.contentSlotRef);
        this.contentSlotRef = undefined;
    }
    render() {
        const hasContent = this.hasContentSlot;
        const passThroughAttributes = getPassThroughAttributes(this.el);
        return (h(Host, null,
            h("div", Object.assign({}, passThroughAttributes, { class: "aegov-dropdown-trigger", id: this.triggerId, ref: (el) => (this.triggerRef = el), onMouseEnter: this.handleTriggerMouseEnter, onMouseLeave: this.handleTriggerMouseLeave, onClick: this.handleTriggerClick, "aria-haspopup": "true", "aria-expanded": this.isOpen.toString(), "aria-controls": this.isOpen ? this.fieldId : undefined }),
                h("slot", null)),
            hasContent && (h("div", { style: { display: 'none' }, ref: (el) => (this.slotWrapperRef = el) },
                h("slot", { name: "dropdown-content" })))));
    }
};
/**
 * Minimum grace period (ms) for hover-triggered dropdowns.
 * Gives the cursor time to cross the gap between trigger and portal panel.
 */
AegovDropdown.HOVER_HIDE_GRACE = 100;
__decorate([
    Element()
], AegovDropdown.prototype, "el", void 0);
__decorate([
    State()
], AegovDropdown.prototype, "isOpen", void 0);
__decorate([
    State()
], AegovDropdown.prototype, "hasContentSlot", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovDropdown.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovDropdown.prototype, "trigger", void 0);
__decorate([
    Prop()
], AegovDropdown.prototype, "position", void 0);
__decorate([
    Prop()
], AegovDropdown.prototype, "align", void 0);
__decorate([
    Prop()
], AegovDropdown.prototype, "gap", void 0);
__decorate([
    Prop()
], AegovDropdown.prototype, "offset", void 0);
__decorate([
    Prop()
], AegovDropdown.prototype, "isDisabled", void 0);
__decorate([
    Prop()
], AegovDropdown.prototype, "delayStart", void 0);
__decorate([
    Prop()
], AegovDropdown.prototype, "delayEnd", void 0);
__decorate([
    Event()
], AegovDropdown.prototype, "aegovDropdownOpen", void 0);
__decorate([
    Event()
], AegovDropdown.prototype, "aegovDropdownClose", void 0);
__decorate([
    Watch('trigger')
], AegovDropdown.prototype, "onTriggerChange", null);
__decorate([
    Watch('position')
], AegovDropdown.prototype, "onPositionChange", null);
__decorate([
    Watch('align')
], AegovDropdown.prototype, "onAlignChange", null);
__decorate([
    Watch('isOpen')
], AegovDropdown.prototype, "handleOpenChange", null);
__decorate([
    Method()
], AegovDropdown.prototype, "toggle", null);
__decorate([
    Listen('scroll', { target: 'window', passive: true }),
    Listen('resize', { target: 'window', passive: true })
], AegovDropdown.prototype, "handleWindowEvents", null);
__decorate([
    Listen('click', { target: 'document' })
], AegovDropdown.prototype, "handleDocumentClick", null);
__decorate([
    Listen('keydown', { target: 'document' })
], AegovDropdown.prototype, "handleKeyDown", null);
AegovDropdown = AegovDropdown_1 = __decorate([
    Component({
        tag: 'aegov-dropdown',
        styleUrl: 'aegov-dropdown.css',
        scoped: true,
    })
], AegovDropdown);
export { AegovDropdown };
