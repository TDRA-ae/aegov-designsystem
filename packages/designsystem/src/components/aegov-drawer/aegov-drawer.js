var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Host, h, Prop, Event, Element, Method, Watch, State } from '@stencil/core';
import { DRAWER_POSITIONS, DRAWER_ANIMATIONS, DRAWER_OVERLAY_OPACITIES, DRAWER_SIZES } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { getSlottedFocusableElements, handleTabKeyWrap } from '../../utils/focus-management';
import { lockBodyScroll, unlockBodyScroll } from '../../utils/scroll-lock';
import { pushZIndex, popZIndex } from '../../utils/z-index-manager';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { generateId } from '../../utils/id-generator';
const TAG = 'aegov-drawer';
const ctx = (prop) => ({ component: TAG, prop });
/**
 * @slot - Drawer content
 */
let AegovDrawer = class AegovDrawer {
    constructor() {
        this.triggerElement = null;
        this.focusableElements = [];
        this.drawerZIndex = 50;
        this.movedToBody = false;
        /**
         * Whether the drawer is currently open/visible
         */
        this.isOpen = false;
        /**
         * Which edge the drawer slides from
         * @default 'right'
         */
        this.position = 'right';
        /**
         * Animation strategy for open/close transitions
         * @default 'slide'
         */
        this.animation = 'slide';
        /**
         * Whether the drawer is pinned flush to edges (true) or has a gap with rounded corners (false)
         * @default true
         */
        this.isPinned = true;
        /**
         * Whether to show a backdrop overlay behind the drawer
         * @default true
         */
        this.isOverlay = true;
        /**
         * Backdrop overlay opacity level
         * @default 'base'
         */
        this.overlayOpacity = 'base';
        /**
         * Whether clicking the backdrop closes the drawer
         * @default true
         */
        this.isCloseWithOverlay = true;
        /**
         * Whether to prevent body scroll when drawer is open
         * @default true
         */
        this.isPreventScroll = true;
        /**
         * Size: 'sm' (compact padding), 'base' (default), or 'lg' (generous padding). Mirrors aegov-card sizing tokens. When `is-pinned="false"`, size also drives the edge gap and border-radius. When pinned, no border-radius is applied regardless of size.
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
        /**
         * @internal State to manage animation
         */
        this.animationState = 'closed';
        this.handleBackdropClick = (event) => {
            this.aegovDrawerBackdropClick.emit(event);
            if (event.target === event.currentTarget && this.isCloseWithOverlay) {
                this.handleClose();
            }
        };
        this.handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                this.aegovDrawerEscapePress.emit(event);
                this.handleClose();
            }
            else if (event.key === 'Tab') {
                this.handleTabKey(event);
            }
        };
    }
    /**
     * Programmatically open the drawer
     */
    async show() {
        this.isOpen = true;
    }
    /**
     * Programmatically close the drawer
     */
    async close() {
        this.handleClose();
    }
    /**
     * Toggle drawer open/closed state
     */
    async toggle() {
        this.isOpen = !this.isOpen;
    }
    handleOpenChange(newValue, oldValue) {
        if (newValue && !oldValue) {
            this.handleOpen();
        }
        else if (!newValue && oldValue) {
            this.handleCloseAnimation();
        }
    }
    componentWillLoad() {
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-drawer');
        }
        warnIfInvalidEnumProp(this.position, DRAWER_POSITIONS, 'right', ctx('position'));
        warnIfInvalidEnumProp(this.animation, DRAWER_ANIMATIONS, 'slide', ctx('animation'));
        warnIfInvalidEnumProp(this.overlayOpacity, DRAWER_OVERLAY_OPACITIES, 'base', ctx('overlayOpacity'));
        warnIfInvalidEnumProp(this.size, DRAWER_SIZES, 'base', ctx('size'));
    }
    onPositionChange(v) { warnIfInvalidEnumProp(v, DRAWER_POSITIONS, 'right', ctx('position')); }
    onAnimationChange(v) { warnIfInvalidEnumProp(v, DRAWER_ANIMATIONS, 'slide', ctx('animation')); }
    onOverlayOpacityChange(v) { warnIfInvalidEnumProp(v, DRAWER_OVERLAY_OPACITIES, 'base', ctx('overlayOpacity')); }
    onSizeChange(v) { warnIfInvalidEnumProp(v, DRAWER_SIZES, 'base', ctx('size')); }
    connectedCallback() {
        // Move drawer to body for proper stacking. Guarded by movedToBody to
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
    getAnimationDuration() {
        if (this.animation === 'none')
            return 0;
        return 300;
    }
    handleOpen() {
        // Store the currently focused element
        this.triggerElement = document.activeElement;
        // Assign z-index for this drawer
        this.drawerZIndex = pushZIndex();
        // Phase 1: Render at off-screen / invisible position.
        // CSS transitions need a painted "from" state before they can animate to a "to" state.
        this.animationState = 'closed';
        // Lock body scroll
        if (this.isPreventScroll) {
            lockBodyScroll();
        }
        // Add keyboard listener
        document.addEventListener('keydown', this.handleKeyDown);
        // Emit open event
        this.aegovDrawerOpen.emit();
        // Phase 2: After browser paints the off-screen element, transition to on-screen.
        requestAnimationFrame(() => {
            // Double rAF ensures the first paint (off-screen) is committed before we transition
            requestAnimationFrame(() => {
                this.animationState = 'opening';
                // Phase 3: After transition completes, finalize state and set up focus trap
                const duration = this.getAnimationDuration();
                setTimeout(() => {
                    this.setupFocusTrap();
                    this.animationState = 'open';
                }, duration > 0 ? duration : 50);
            });
        });
    }
    handleClose() {
        // Emit before close event (cancellable)
        let cancelled = false;
        const event = {
            preventDefault: () => {
                cancelled = true;
            },
        };
        this.aegovDrawerBeforeClose.emit(event);
        if (cancelled) {
            return;
        }
        this.isOpen = false;
    }
    /**
     * Animate the closing transition then clean up.
     * Called from @Watch('open') so ALL close paths (close(), toggle(), open=false) animate.
     */
    handleCloseAnimation() {
        this.animationState = 'closing';
        const duration = this.getAnimationDuration();
        setTimeout(() => {
            this.handleCloseComplete();
        }, duration);
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
        this.aegovDrawerClose.emit();
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
    getOverlayOpacityClass() {
        const overlayOpacity = DRAWER_OVERLAY_OPACITIES.includes(this.overlayOpacity) ? this.overlayOpacity : 'base';
        const opacityClasses = {
            light: 'drawer-backdrop--light',
            base: 'drawer-backdrop--base',
            dark: 'drawer-backdrop--dark',
        };
        return opacityClasses[overlayOpacity];
    }
    render() {
        if (!this.isOpen && this.animationState === 'closed') {
            return null;
        }
        const passThroughAttributes = getPassThroughAttributes(this.el);
        const position = DRAWER_POSITIONS.includes(this.position) ? this.position : 'right';
        const size = DRAWER_SIZES.includes(this.size) ? this.size : 'base';
        const containerClasses = [
            'aegov-drawer-container',
            `drawer-container--${position}`,
            `drawer-size-${size}`,
            !this.isPinned ? 'drawer-container--unpinned' : '',
        ].filter(Boolean).join(' ');
        const contentClasses = [
            'aegov-drawer-content',
            `drawer-size-${size}`,
            this.isPadding ? 'drawer--padded' : '',
        ].filter(Boolean).join(' ');
        return (h(Host, { "data-state": this.animationState, style: { '--drawer-z-index': this.drawerZIndex.toString() } },
            this.isOverlay && (h("div", { class: `aegov-drawer-backdrop ${this.getOverlayOpacityClass()}`, "data-state": this.animationState, "data-animation": this.animation, onClick: this.handleBackdropClick })),
            !this.isOverlay && this.isCloseWithOverlay && (h("div", { class: "aegov-drawer-backdrop-invisible", onClick: this.handleBackdropClick })),
            h("div", Object.assign({ id: this.fieldId, class: containerClasses, "data-state": this.animationState, "data-animation": this.animation, role: "dialog", "aria-modal": "true" }, passThroughAttributes),
                h("div", { class: contentClasses },
                    h("slot", null)))));
    }
};
__decorate([
    Element()
], AegovDrawer.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovDrawer.prototype, "fieldId", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovDrawer.prototype, "isOpen", void 0);
__decorate([
    Prop()
], AegovDrawer.prototype, "position", void 0);
__decorate([
    Prop()
], AegovDrawer.prototype, "animation", void 0);
__decorate([
    Prop()
], AegovDrawer.prototype, "isPinned", void 0);
__decorate([
    Prop()
], AegovDrawer.prototype, "isOverlay", void 0);
__decorate([
    Prop()
], AegovDrawer.prototype, "overlayOpacity", void 0);
__decorate([
    Prop()
], AegovDrawer.prototype, "isCloseWithOverlay", void 0);
__decorate([
    Prop()
], AegovDrawer.prototype, "isPreventScroll", void 0);
__decorate([
    Prop()
], AegovDrawer.prototype, "size", void 0);
__decorate([
    Prop()
], AegovDrawer.prototype, "isPadding", void 0);
__decorate([
    State()
], AegovDrawer.prototype, "animationState", void 0);
__decorate([
    Event()
], AegovDrawer.prototype, "aegovDrawerOpen", void 0);
__decorate([
    Event()
], AegovDrawer.prototype, "aegovDrawerClose", void 0);
__decorate([
    Event()
], AegovDrawer.prototype, "aegovDrawerBeforeClose", void 0);
__decorate([
    Event()
], AegovDrawer.prototype, "aegovDrawerBackdropClick", void 0);
__decorate([
    Event()
], AegovDrawer.prototype, "aegovDrawerEscapePress", void 0);
__decorate([
    Method()
], AegovDrawer.prototype, "show", null);
__decorate([
    Method()
], AegovDrawer.prototype, "close", null);
__decorate([
    Method()
], AegovDrawer.prototype, "toggle", null);
__decorate([
    Watch('isOpen')
], AegovDrawer.prototype, "handleOpenChange", null);
__decorate([
    Watch('position')
], AegovDrawer.prototype, "onPositionChange", null);
__decorate([
    Watch('animation')
], AegovDrawer.prototype, "onAnimationChange", null);
__decorate([
    Watch('overlayOpacity')
], AegovDrawer.prototype, "onOverlayOpacityChange", null);
__decorate([
    Watch('size')
], AegovDrawer.prototype, "onSizeChange", null);
AegovDrawer = __decorate([
    Component({
        tag: 'aegov-drawer',
        styleUrl: 'aegov-drawer.css',
        shadow: true,
    })
], AegovDrawer);
export { AegovDrawer };
