var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, Watch, Method, Event, State, h, Element } from '@stencil/core';
import { TOAST_VARIANTS, TOAST_APPEARANCES, TOAST_POSITIONS, TOAST_MODES } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
const TAG = 'aegov-toast';
const ctx = (prop) => ({ component: TAG, prop });
/* ============================================
   CSS CLASS CONSTANTS
   ============================================ */
const CSS = {
    container: 'aegov-toast-container',
    containerPosition: (pos) => `aegov-toast-container--${pos}`,
    containerRack: 'aegov-toast-container--rack',
    containerExpanded: 'aegov-toast-container--expanded',
    rackCount: 'aegov-toast-rack-count',
    rackCountBottom: 'aegov-toast-rack-count--bottom',
    liveRegionId: 'aegov-toast-live-region',
    rackStylesId: 'aegov-toast-rack-styles',
};
/* ============================================
   MODULE-LEVEL TOAST MANAGER
   ============================================ */
const toastContainers = new Map();
const activeToasts = new Map();
function getContainerStyles(position) {
    const base = 'position:fixed;z-index:9998;display:flex;flex-direction:column;gap:0.5rem;padding:1rem;pointer-events:none;max-height:100vh;overflow:visible;';
    switch (position) {
        case 'top-right':
            return base + 'top:0;inset-inline-end:0;align-items:flex-end;';
        case 'top-left':
            return base + 'top:0;inset-inline-start:0;align-items:flex-start;';
        case 'top-center':
            return base + 'top:0;left:50%;transform:translateX(-50%);align-items:center;';
        case 'bottom-right':
            return base + 'bottom:0;inset-inline-end:0;align-items:flex-end;flex-direction:column-reverse;';
        case 'bottom-left':
            return base + 'bottom:0;inset-inline-start:0;align-items:flex-start;flex-direction:column-reverse;';
        case 'bottom-center':
            return base + 'bottom:0;left:50%;transform:translateX(-50%);align-items:center;flex-direction:column-reverse;';
    }
}
function getOrCreateContainer(position) {
    let container = toastContainers.get(position);
    if (!container || !document.body.contains(container)) {
        container = document.createElement('div');
        container.className = `${CSS.container} ${CSS.containerPosition(position)}`;
        container.setAttribute('style', getContainerStyles(position));
        document.body.appendChild(container);
        toastContainers.set(position, container);
    }
    return container;
}
function registerToast(position, toast) {
    if (!activeToasts.has(position)) {
        activeToasts.set(position, new Set());
    }
    activeToasts.get(position).add(toast);
}
function unregisterToast(position, toast) {
    const toasts = activeToasts.get(position);
    if (toasts) {
        toasts.delete(toast);
        if (toasts.size === 0) {
            activeToasts.delete(position);
            const container = toastContainers.get(position);
            if (container && document.body.contains(container)) {
                document.body.removeChild(container);
            }
            toastContainers.delete(position);
            rackContainers.delete(position);
        }
    }
}
/* ============================================
   SCREEN READER LIVE REGION
   ============================================ */
let liveRegion = null;
function getOrCreateLiveRegion() {
    if (liveRegion && document.body.contains(liveRegion)) {
        return liveRegion;
    }
    liveRegion = document.createElement('div');
    liveRegion.id = CSS.liveRegionId;
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    // Visually hidden but accessible to screen readers
    liveRegion.setAttribute('style', 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;');
    document.body.appendChild(liveRegion);
    return liveRegion;
}
function announceToast(message) {
    const region = getOrCreateLiveRegion();
    // Clear then re-inject so screen readers detect the change
    region.textContent = '';
    requestAnimationFrame(() => {
        region.textContent = message;
    });
}
/* ============================================
   RACK MODE MANAGEMENT
   ============================================ */
const rackContainers = new Set();
let rackStylesInjected = false;
function injectRackStyles() {
    if (rackStylesInjected)
        return;
    rackStylesInjected = true;
    const style = document.createElement('style');
    style.id = CSS.rackStylesId;
    style.textContent = `
    /* Rack container overrides */
    .aegov-toast-container--rack {
      gap: 0 !important;
      pointer-events: auto !important;
      transition: gap 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Toast transitions in rack */
    .aegov-toast-container--rack aegov-toast {
      transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                  opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                  margin 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }

    /* ---- COLLAPSED: TOP positions ---- */
    /* Newest = first child (prepended) = at top. Older items below peek upward. */
    .aegov-toast-container--top-right.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="1"],
    .aegov-toast-container--top-left.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="1"],
    .aegov-toast-container--top-center.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="1"] {
      margin-top: -2.75rem;
      transform: scale(0.96);
      transform-origin: top center;
      opacity: 0.7;
      z-index: -1;
    }

    .aegov-toast-container--top-right.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="2"],
    .aegov-toast-container--top-left.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="2"],
    .aegov-toast-container--top-center.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="2"] {
      margin-top: -2.75rem;
      transform: scale(0.92);
      transform-origin: top center;
      opacity: 0.4;
      z-index: -2;
    }

    .aegov-toast-container--top-right.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="3"],
    .aegov-toast-container--top-left.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="3"],
    .aegov-toast-container--top-center.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="3"],
    .aegov-toast-container--top-right.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="4"],
    .aegov-toast-container--top-left.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="4"],
    .aegov-toast-container--top-center.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="4"],
    .aegov-toast-container--top-right.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="5"],
    .aegov-toast-container--top-left.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="5"],
    .aegov-toast-container--top-center.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="5"] {
      margin-top: -2.75rem;
      transform: scale(0.88);
      transform-origin: top center;
      opacity: 0;
      pointer-events: none;
      z-index: -3;
    }

    /* ---- COLLAPSED: BOTTOM positions ---- */
    /* column-reverse + prepend: newest = first child = at bottom (main-start). */
    /* Older items are above newest. margin-bottom collapses them downward. */
    .aegov-toast-container--bottom-right.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="1"],
    .aegov-toast-container--bottom-left.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="1"],
    .aegov-toast-container--bottom-center.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="1"] {
      margin-bottom: -2.75rem;
      transform: scale(0.96);
      transform-origin: bottom center;
      opacity: 0.7;
      z-index: -1;
    }

    .aegov-toast-container--bottom-right.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="2"],
    .aegov-toast-container--bottom-left.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="2"],
    .aegov-toast-container--bottom-center.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="2"] {
      margin-bottom: -2.75rem;
      transform: scale(0.92);
      transform-origin: bottom center;
      opacity: 0.4;
      z-index: -2;
    }

    .aegov-toast-container--bottom-right.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="3"],
    .aegov-toast-container--bottom-left.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="3"],
    .aegov-toast-container--bottom-center.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="3"],
    .aegov-toast-container--bottom-right.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="4"],
    .aegov-toast-container--bottom-left.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="4"],
    .aegov-toast-container--bottom-center.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="4"],
    .aegov-toast-container--bottom-right.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="5"],
    .aegov-toast-container--bottom-left.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="5"],
    .aegov-toast-container--bottom-center.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="5"] {
      margin-bottom: -2.75rem;
      transform: scale(0.88);
      transform-origin: bottom center;
      opacity: 0;
      pointer-events: none;
      z-index: -3;
    }

    /* ---- EXPANDED state (on hover) ---- */
    .aegov-toast-container--rack.aegov-toast-container--expanded {
      gap: 0.5rem !important;
    }

    .aegov-toast-container--rack.aegov-toast-container--expanded aegov-toast {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
      transform: scale(1) !important;
      opacity: 1 !important;
      pointer-events: auto !important;
      z-index: auto !important;
    }

    /* ---- Count badge ---- */
    .aegov-toast-rack-count {
      position: absolute;
      top: 0.125rem;
      inset-inline-end: 0.125rem;
      background: rgba(0, 0, 0, 0.65);
      color: white;
      font-size: 0.7rem;
      font-weight: 600;
      line-height: 1;
      padding: 0.2rem 0.45rem;
      border-radius: 9999px;
      z-index: 100;
      pointer-events: none;
      transition: opacity 0.3s ease;
      font-family: inherit;
    }

    .aegov-toast-container--expanded .aegov-toast-rack-count {
      opacity: 0;
    }

    .aegov-toast-rack-count--bottom {
      top: auto;
      bottom: 0.125rem;
    }

    .aegov-toast-rack-count[data-count="1"] {
      opacity: 0;
    }
  `;
    document.head.appendChild(style);
}
function setupRackContainer(container, position) {
    container.classList.add(CSS.containerRack);
    // Create count badge
    const badge = document.createElement('span');
    badge.className = CSS.rackCount;
    // Position badge near the screen edge (top for top-positions, bottom for bottom-positions)
    if (position.startsWith('bottom')) {
        badge.classList.add(CSS.rackCountBottom);
    }
    badge.setAttribute('data-count', '0');
    badge.textContent = '0';
    container.appendChild(badge);
    // Hover listeners for expand/collapse
    container.addEventListener('mouseenter', () => {
        container.classList.add(CSS.containerExpanded);
    });
    container.addEventListener('mouseleave', () => {
        container.classList.remove(CSS.containerExpanded);
    });
    rackContainers.add(position);
}
function updateRackIndices(position) {
    const container = toastContainers.get(position);
    if (!container)
        return;
    const toastElements = Array.from(container.querySelectorAll('aegov-toast'));
    const count = toastElements.length;
    // Rack always prepends: first child = index 0 (newest) for all positions
    for (let i = 0; i < count; i++) {
        toastElements[i].setAttribute('data-toast-index', String(i));
    }
    // Update count badge
    const badge = container.querySelector(`.${CSS.rackCount}`);
    if (badge) {
        badge.textContent = String(count);
        badge.setAttribute('data-count', String(count));
    }
}
/* ============================================
   TOAST COMPONENT
   ============================================ */
/**
 * @slot default - Toast description content
 * @slot title - Toast title text
 * @slot icon - Custom icon
 * @slot actions - Action buttons/links
 */
let AegovToast = class AegovToast {
    constructor() {
        /**
         * Semantic color variant of the toast.
         */
        this.variant = 'default';
        /**
         * Appearance style: soft (light bg) or solid (dark bg).
         */
        this.appearance = 'soft';
        /**
         * Screen position where the toast appears.
         */
        this.position = 'top-right';
        /**
         * Auto-dismiss duration in milliseconds. 0 = no auto-dismiss.
         */
        this.duration = 5000;
        /**
         * Whether the toast shows a close button.
         */
        this.isDismissible = true;
        /**
         * Display mode for multiple toasts at the same position.
         * 'stack' = all toasts visible with gap between them (default).
         * 'rack' = toasts collapse into a deck; hover to expand.
         */
        this.mode = 'stack';
        /**
         * Whether to show a countdown progress bar.
         */
        this.isProgressEnabled = false;
        this.isVisible = false;
        this.isEntering = false;
        this.isExiting = false;
        this.hasIconSlot = false;
        this.hasTitleSlot = false;
        this.hasActionsSlot = false;
        this.autoCloseTimer = null;
        this.isClosing = false;
        this.timerStartedAt = 0;
        this.timeRemaining = 0;
        this.isPaused = false;
        this.handleDismiss = () => {
            this.aegovToastDismiss.emit();
            this.close();
        };
        this.handleMouseEnter = () => {
            if (this.duration <= 0 || this.isClosing || !this.isVisible)
                return;
            this.isPaused = true;
            if (this.autoCloseTimer) {
                clearTimeout(this.autoCloseTimer);
                this.autoCloseTimer = null;
                const elapsed = Date.now() - this.timerStartedAt;
                this.timeRemaining = Math.max(0, this.timeRemaining - elapsed);
            }
        };
        this.handleMouseLeave = () => {
            if (this.duration <= 0 || this.isClosing || !this.isVisible)
                return;
            this.isPaused = false;
            if (this.timeRemaining > 0) {
                this.startAutoCloseTimer();
            }
            else {
                this.close();
            }
        };
        this.checkSlots = () => {
            this.hasIconSlot = !!this.el.querySelector('[slot="icon"]');
            this.hasTitleSlot = !!this.el.querySelector('[slot="title"]');
            this.hasActionsSlot = !!this.el.querySelector('[slot="actions"]');
        };
    }
    /**
     * Show the toast notification.
     */
    async show() {
        var _a;
        if (this.isVisible)
            return;
        // Move to portal container
        const container = getOrCreateContainer(this.position);
        const isBottom = this.position.startsWith('bottom');
        if (this.mode === 'rack') {
            // Rack: always prepend so newest = first child = closest to screen edge
            // (column: first child at top; column-reverse: first child at bottom)
            container.prepend(this.el);
        }
        else if (isBottom) {
            container.appendChild(this.el);
        }
        else {
            container.prepend(this.el);
        }
        registerToast(this.position, this.el);
        // Setup rack mode if needed
        if (this.mode === 'rack') {
            injectRackStyles();
            if (!rackContainers.has(this.position)) {
                setupRackContainer(container, this.position);
            }
            updateRackIndices(this.position);
        }
        // Trigger enter animation
        this.isEntering = true;
        this.isVisible = true;
        // Announce to screen readers via persistent live region
        const message = (_a = this.el.textContent) === null || _a === void 0 ? void 0 : _a.trim();
        if (message) {
            announceToast(message);
        }
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.isEntering = false;
                this.aegovToastOpen.emit();
            });
        });
        // Start auto-dismiss timer
        if (this.duration > 0) {
            this.timeRemaining = this.duration;
            this.startAutoCloseTimer();
        }
    }
    /**
     * Close the toast with exit animation and auto-remove from DOM.
     */
    async close() {
        if (this.isClosing || !this.isVisible)
            return;
        this.isClosing = true;
        // Clear auto-close timer
        if (this.autoCloseTimer) {
            clearTimeout(this.autoCloseTimer);
            this.autoCloseTimer = null;
        }
        // Trigger exit animation
        this.isExiting = true;
        setTimeout(() => {
            this.isVisible = false;
            this.isExiting = false;
            this.isClosing = false;
            const wasRack = this.mode === 'rack';
            // Unregister and emit
            unregisterToast(this.position, this.el);
            this.aegovToastClose.emit();
            // Auto-remove from DOM
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }
            // Recalculate rack indices after removal
            if (wasRack) {
                updateRackIndices(this.position);
            }
        }, 300);
    }
    startAutoCloseTimer() {
        this.timerStartedAt = Date.now();
        this.autoCloseTimer = setTimeout(() => {
            this.close();
        }, this.timeRemaining);
    }
    getPositionDirection() {
        if (this.position.endsWith('left'))
            return 'left';
        if (this.position.endsWith('center'))
            return 'center';
        return 'right';
    }
    getToastClasses() {
        const classes = ['aegov-toast'];
        const variant = TOAST_VARIANTS.includes(this.variant) ? this.variant : 'default';
        const appearance = TOAST_APPEARANCES.includes(this.appearance) ? this.appearance : 'soft';
        const position = TOAST_POSITIONS.includes(this.position) ? this.position : 'top-right';
        // Variant
        classes.push(`toast--${variant}`);
        // Appearance
        classes.push(`toast--${appearance}`);
        // Direction for animations
        const direction = this.getPositionDirection();
        classes.push(`toast--${direction}`);
        // Position vertical for center animations
        if (direction === 'center') {
            classes.push(position.startsWith('top') ? 'toast--top' : 'toast--bottom');
        }
        // Animation states
        if (this.isEntering) {
            classes.push('toast--entering');
        }
        else if (this.isExiting) {
            classes.push('toast--exiting');
        }
        else if (this.isVisible) {
            classes.push('toast--visible');
        }
        return classes.join(' ');
    }
    componentWillLoad() {
        warnIfInvalidEnumProp(this.variant, TOAST_VARIANTS, 'default', ctx('variant'));
        warnIfInvalidEnumProp(this.appearance, TOAST_APPEARANCES, 'soft', ctx('appearance'));
        warnIfInvalidEnumProp(this.position, TOAST_POSITIONS, 'top-right', ctx('position'));
        warnIfInvalidEnumProp(this.mode, TOAST_MODES, 'stack', ctx('mode'));
    }
    onVariantChange(v) { warnIfInvalidEnumProp(v, TOAST_VARIANTS, 'default', ctx('variant')); }
    onAppearanceChange(v) { warnIfInvalidEnumProp(v, TOAST_APPEARANCES, 'soft', ctx('appearance')); }
    onPositionChange(v) { warnIfInvalidEnumProp(v, TOAST_POSITIONS, 'top-right', ctx('position')); }
    onModeChange(v) { warnIfInvalidEnumProp(v, TOAST_MODES, 'stack', ctx('mode')); }
    componentDidLoad() {
        this.checkSlots();
    }
    disconnectedCallback() {
        if (this.autoCloseTimer) {
            clearTimeout(this.autoCloseTimer);
            this.autoCloseTimer = null;
        }
        this.isPaused = false;
    }
    render() {
        if (!this.isVisible) {
            return null;
        }
        return (h("div", { class: this.getToastClasses(), onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave },
            this.hasIconSlot && (h("div", { class: "toast__icon" },
                h("slot", { name: "icon" }))),
            h("div", { class: "toast__content" },
                this.hasTitleSlot && (h("div", { class: "toast__title" },
                    h("slot", { name: "title" }))),
                h("div", { class: "toast__description" },
                    h("slot", null)),
                this.hasActionsSlot && (h("div", { class: "toast__actions" },
                    h("slot", { name: "actions" })))),
            this.isDismissible && (h("button", { type: "button", class: "toast__dismiss", onClick: this.handleDismiss, "aria-label": `Close ${this.variant} notification` },
                h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "size-4", viewBox: "0 0 256 256", "aria-hidden": "true" },
                    h("rect", { width: "256", height: "256", fill: "none" }),
                    h("line", { x1: "200", y1: "56", x2: "56", y2: "200", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "16" }),
                    h("line", { x1: "200", y1: "200", x2: "56", y2: "56", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "16" })))),
            this.isProgressEnabled && this.duration > 0 && (h("div", { class: "toast__progress", style: {
                    animationDuration: `${this.duration}ms`,
                    animationPlayState: this.isPaused ? 'paused' : 'running',
                } }))));
    }
};
__decorate([
    Element()
], AegovToast.prototype, "el", void 0);
__decorate([
    Prop()
], AegovToast.prototype, "variant", void 0);
__decorate([
    Prop()
], AegovToast.prototype, "appearance", void 0);
__decorate([
    Prop()
], AegovToast.prototype, "position", void 0);
__decorate([
    Prop()
], AegovToast.prototype, "duration", void 0);
__decorate([
    Prop()
], AegovToast.prototype, "isDismissible", void 0);
__decorate([
    Prop()
], AegovToast.prototype, "mode", void 0);
__decorate([
    Prop()
], AegovToast.prototype, "isProgressEnabled", void 0);
__decorate([
    Event()
], AegovToast.prototype, "aegovToastOpen", void 0);
__decorate([
    Event()
], AegovToast.prototype, "aegovToastClose", void 0);
__decorate([
    Event()
], AegovToast.prototype, "aegovToastDismiss", void 0);
__decorate([
    State()
], AegovToast.prototype, "isVisible", void 0);
__decorate([
    State()
], AegovToast.prototype, "isEntering", void 0);
__decorate([
    State()
], AegovToast.prototype, "isExiting", void 0);
__decorate([
    State()
], AegovToast.prototype, "hasIconSlot", void 0);
__decorate([
    State()
], AegovToast.prototype, "hasTitleSlot", void 0);
__decorate([
    State()
], AegovToast.prototype, "hasActionsSlot", void 0);
__decorate([
    State()
], AegovToast.prototype, "isPaused", void 0);
__decorate([
    Method()
], AegovToast.prototype, "show", null);
__decorate([
    Method()
], AegovToast.prototype, "close", null);
__decorate([
    Watch('variant')
], AegovToast.prototype, "onVariantChange", null);
__decorate([
    Watch('appearance')
], AegovToast.prototype, "onAppearanceChange", null);
__decorate([
    Watch('position')
], AegovToast.prototype, "onPositionChange", null);
__decorate([
    Watch('mode')
], AegovToast.prototype, "onModeChange", null);
AegovToast = __decorate([
    Component({
        tag: 'aegov-toast',
        styleUrl: 'aegov-toast.css',
        scoped: true,
        shadow: false
    })
], AegovToast);
export { AegovToast };
