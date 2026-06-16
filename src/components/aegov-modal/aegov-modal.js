var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Host, h, Prop, Event, Element, Method, Watch, State } from '@stencil/core';
import { MODAL_POSITIONS, MODAL_OVERLAY_OPACITIES, MODAL_SIZES } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { getSlottedFocusableElements, handleTabKeyWrap } from '../../utils/focus-management';
import { lockBodyScroll, unlockBodyScroll } from '../../utils/scroll-lock';
import { pushZIndex, popZIndex } from '../../utils/z-index-manager';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { generateId } from '../../utils/id-generator';
const TAG = 'aegov-modal';
const ctx = (prop) => ({ component: TAG, prop });
/**
 * @slot - Modal content
 */
let AegovModal = class AegovModal {
    constructor() {
        this.triggerElement = null;
        this.focusableElements = [];
        this.modalZIndex = 50;
        this.movedToBody = false;
        /**
         * Whether the modal is currently open/visible
         */
        this.isOpen = false;
        /**
         * Whether clicking the overlay closes the modal
         * @default true
         */
        this.isCloseWithOverlay = true;
        /**
         * Whether to prevent body scroll when modal is open
         * @default true
         */
        this.isPreventScroll = true;
        /**
         * Overlay opacity level
         * @default 'base'
         */
        this.overlayOpacity = 'base';
        /**
         * Position of the modal on screen
         * @default 'center'
         */
        this.position = 'center';
        /**
         * Size: 'sm' (compact padding/radius), 'base' (default), or 'lg' (generous padding/radius). Mirrors aegov-card sizing tokens.
         * @default 'base'
         */
        this.size = 'base';
        /**
         * Whether to apply inner content padding. On by default; scales with size.
         * @default true
         */
        this.isPadding = true;
        // Note: ARIA attributes (aria-label, aria-labelledby, aria-describedby)
        // are passed through automatically via getPassThroughAttributes()
        // No need for @Prop decorators to avoid TypeScript conflicts with Element interface
        /**
         * @internal State to manage animation
         */
        this.animationState = 'closed';
        this.handleBackdropClick = (event) => {
            // Emit backdrop click event
            this.aegovModalBackdropClick.emit(event);
            // Only close if clicking directly on overlay, not modal content
            if (event.target === event.currentTarget && this.isCloseWithOverlay) {
                this.handleClose();
            }
        };
        this.handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                this.aegovModalEscapePress.emit(event);
                // ESC key always closes the modal (non-configurable for accessibility)
                this.handleClose();
            }
            else if (event.key === 'Tab') {
                this.handleTabKey(event);
            }
        };
    }
    /**
     * Programmatically open the modal
     */
    async show() {
        this.isOpen = true;
    }
    /**
     * Programmatically close the modal
     */
    async close() {
        this.handleClose();
    }
    /**
     * Toggle modal open/closed state
     */
    async toggle() {
        this.isOpen = !this.isOpen;
    }
    handleOpenChange(newValue, oldValue) {
        if (newValue && !oldValue) {
            this.handleOpen();
        }
        else if (!newValue && oldValue) {
            this.handleCloseComplete();
        }
    }
    componentWillLoad() {
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-modal');
        }
        warnIfInvalidEnumProp(this.overlayOpacity, MODAL_OVERLAY_OPACITIES, 'base', ctx('overlayOpacity'));
        warnIfInvalidEnumProp(this.position, MODAL_POSITIONS, 'center', ctx('position'));
        warnIfInvalidEnumProp(this.size, MODAL_SIZES, 'base', ctx('size'));
    }
    onOverlayOpacityChange(v) { warnIfInvalidEnumProp(v, MODAL_OVERLAY_OPACITIES, 'base', ctx('overlayOpacity')); }
    onPositionChange(v) { warnIfInvalidEnumProp(v, MODAL_POSITIONS, 'center', ctx('position')); }
    onSizeChange(v) { warnIfInvalidEnumProp(v, MODAL_SIZES, 'base', ctx('size')); }
    connectedCallback() {
        // Move modal to body for proper stacking. Guarded by movedToBody to
        // avoid re-entrant hydration loops: appendChild triggers a synchronous
        // disconnect/reconnect pair and Stencil's lazy hydration can fire
        // connectedCallback again before parent state stabilises.
        if (!this.movedToBody && this.el.parentNode !== document.body) {
            this.movedToBody = true;
            document.body.appendChild(this.el);
        }
    }
    disconnectedCallback() {
        // Cleanup. Note: we deliberately do NOT call body.removeChild(this.el)
        // here — the disconnect IS the removal, and re-removing inside the
        // callback caused a "Maximum call stack size exceeded" loop with
        // connectedCallback under Stencil's shadow-DOM hydration.
        if (this.isPreventScroll && this.isOpen) {
            unlockBodyScroll();
        }
        document.removeEventListener('keydown', this.handleKeyDown);
    }
    handleOpen() {
        // Store the currently focused element
        this.triggerElement = document.activeElement;
        // Assign z-index for this modal
        this.modalZIndex = pushZIndex();
        // Set animation state
        this.animationState = 'opening';
        // Lock body scroll
        if (this.isPreventScroll) {
            lockBodyScroll();
        }
        // Add keyboard listener
        document.addEventListener('keydown', this.handleKeyDown);
        // Setup focus trap after a short delay to allow rendering
        setTimeout(() => {
            this.setupFocusTrap();
            this.animationState = 'open';
        }, 50);
        // Emit open event
        this.aegovModalOpen.emit();
    }
    handleClose() {
        // Emit before close event (cancellable)
        let cancelled = false;
        const event = {
            preventDefault: () => {
                cancelled = true;
            },
        };
        this.aegovModalBeforeClose.emit(event);
        if (cancelled) {
            return;
        }
        // Start closing animation
        this.animationState = 'closing';
        // Wait for animation to complete
        setTimeout(() => {
            this.isOpen = false;
        }, 200);
    }
    handleCloseComplete() {
        // Decrement overlay stack
        popZIndex();
        // Unlock body scroll (ref-counted, only unlocks when last overlay closes)
        if (this.isPreventScroll) {
            unlockBodyScroll();
        }
        // Remove keyboard listener
        document.removeEventListener('keydown', this.handleKeyDown);
        // Return focus to trigger element
        if (this.triggerElement && typeof this.triggerElement.focus === 'function') {
            this.triggerElement.focus();
        }
        // Set animation state
        this.animationState = 'closed';
        // Emit close event
        this.aegovModalClose.emit();
    }
    setupFocusTrap() {
        const shadowRoot = this.el.shadowRoot;
        if (!shadowRoot)
            return;
        this.focusableElements = getSlottedFocusableElements(shadowRoot);
        if (this.focusableElements.length > 0) {
            this.focusableElements[0].focus();
        }
    }
    handleTabKey(event) {
        handleTabKeyWrap(event, this.focusableElements);
    }
    getPositionClass() {
        const position = MODAL_POSITIONS.includes(this.position) ? this.position : 'center';
        const positionClasses = {
            center: 'modal-container--center',
            top: 'modal-container--top',
            bottom: 'modal-container--bottom',
        };
        return positionClasses[position];
    }
    getSizeClass() {
        const size = MODAL_SIZES.includes(this.size) ? this.size : 'base';
        const sizeClasses = {
            sm: 'modal-size-sm',
            base: 'modal-size-base',
            lg: 'modal-size-lg',
        };
        return sizeClasses[size];
    }
    getOverlayOpacityClass() {
        const overlayOpacity = MODAL_OVERLAY_OPACITIES.includes(this.overlayOpacity) ? this.overlayOpacity : 'base';
        const opacityClasses = {
            light: 'modal-backdrop--light',
            base: 'modal-backdrop--base',
            dark: 'modal-backdrop--dark',
        };
        return opacityClasses[overlayOpacity];
    }
    render() {
        if (!this.isOpen && this.animationState === 'closed') {
            return null;
        }
        const passThroughAttributes = getPassThroughAttributes(this.el);
        return (h(Host, { "data-state": this.animationState, style: { '--modal-z-index': this.modalZIndex.toString() } },
            h("div", { class: `aegov-modal-backdrop ${this.getOverlayOpacityClass()}`, "data-state": this.animationState, onClick: this.handleBackdropClick }),
            h("div", { class: `aegov-modal-container ${this.getPositionClass()}`, onClick: this.handleBackdropClick },
                h("div", Object.assign({ id: this.fieldId, class: `aegov-modal-content ${this.getSizeClass()} ${this.isPadding ? 'modal--padded' : ''}`, "data-state": this.animationState, role: "dialog", "aria-modal": "true" }, passThroughAttributes),
                    h("slot", null)))));
    }
};
__decorate([
    Element()
], AegovModal.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovModal.prototype, "fieldId", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovModal.prototype, "isOpen", void 0);
__decorate([
    Prop()
], AegovModal.prototype, "isCloseWithOverlay", void 0);
__decorate([
    Prop()
], AegovModal.prototype, "isPreventScroll", void 0);
__decorate([
    Prop()
], AegovModal.prototype, "overlayOpacity", void 0);
__decorate([
    Prop()
], AegovModal.prototype, "position", void 0);
__decorate([
    Prop()
], AegovModal.prototype, "size", void 0);
__decorate([
    Prop()
], AegovModal.prototype, "isPadding", void 0);
__decorate([
    State()
], AegovModal.prototype, "animationState", void 0);
__decorate([
    Event()
], AegovModal.prototype, "aegovModalOpen", void 0);
__decorate([
    Event()
], AegovModal.prototype, "aegovModalClose", void 0);
__decorate([
    Event()
], AegovModal.prototype, "aegovModalBeforeClose", void 0);
__decorate([
    Event()
], AegovModal.prototype, "aegovModalBackdropClick", void 0);
__decorate([
    Event()
], AegovModal.prototype, "aegovModalEscapePress", void 0);
__decorate([
    Method()
], AegovModal.prototype, "show", null);
__decorate([
    Method()
], AegovModal.prototype, "close", null);
__decorate([
    Method()
], AegovModal.prototype, "toggle", null);
__decorate([
    Watch('isOpen')
], AegovModal.prototype, "handleOpenChange", null);
__decorate([
    Watch('overlayOpacity')
], AegovModal.prototype, "onOverlayOpacityChange", null);
__decorate([
    Watch('position')
], AegovModal.prototype, "onPositionChange", null);
__decorate([
    Watch('size')
], AegovModal.prototype, "onSizeChange", null);
AegovModal = __decorate([
    Component({
        tag: 'aegov-modal',
        styleUrl: 'aegov-modal.css',
        shadow: true,
    })
], AegovModal);
export { AegovModal };
