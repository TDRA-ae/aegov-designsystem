import { Component, Host, h, Prop, Element, State, Listen, Event, EventEmitter, Watch, Method } from '@stencil/core';
import { POPOVER_POSITIONS, POPOVER_ALIGNS, POPOVER_TRIGGERS } from '../../utils/types';
import type { PopoverPosition, PopoverAlign, PopoverTrigger } from '../../utils/types';
import { generateId } from '../../utils/id-generator';
import { getFocusableElements, FOCUSABLE_SELECTORS, cycleFocus, resolveFocusTarget } from '../../utils/focus-management';
import { createPortal, removePortal } from '../../utils/portal-manager';
import { createKeyboardHandler } from '../../utils/keyboard-handler';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';

const TAG = 'aegov-popover';
const ctx = (prop: string) => ({ component: TAG, prop });

/**
 * Design token values used in portal-injected styles.
 * Portal elements live outside Stencil's scope, so Tailwind utilities aren't available.
 */
const PORTAL_TOKENS = {
  shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  radius: '0.5rem',
  transition: 'opacity 200ms ease-in-out, transform 200ms ease-in-out',
  arrowSize: '10px',
} as const;

/** CSS injected into the portal element (scoped CSS can't reach it).
 * Theme color vars from tailwind.css @theme cascade into the portal via :root.
 * `.dark` selector overrides apply via the <html class="dark"> ancestor. */
const POPOVER_PORTAL_STYLES = `
  .aegov-popover-portal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    pointer-events: none;
  }

  .aegov-popover-portal .aegov-popover {
    background: var(--color-whitely-50);
    color: var(--color-aeblack-800);
    border: 1px solid var(--color-aeblack-200);
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

  .dark .aegov-popover-portal .aegov-popover {
    background: var(--color-aeblack-900);
    color: var(--color-whitely-100);
    border-color: var(--color-aeblack-700);
  }

  .aegov-popover-portal .aegov-popover[data-state="open"] {
    opacity: 1;
    transform: scale(1);
  }

  .aegov-popover-portal .aegov-popover a {
    display: block;
    margin: 0;
    color: var(--color-primary-600);
  }

  .dark .aegov-popover-portal .aegov-popover a {
    color: var(--color-primary-400);
  }

  /* Arrow base */
  .aegov-popover-portal .aegov-popover__arrow {
    position: absolute;
    width: ${PORTAL_TOKENS.arrowSize};
    height: ${PORTAL_TOKENS.arrowSize};
    background: var(--color-whitely-50);
    border: 1px solid var(--color-aeblack-200);
    transform: rotate(45deg);
    z-index: -1;
  }

  .dark .aegov-popover-portal .aegov-popover__arrow {
    background: var(--color-aeblack-900);
    border-color: var(--color-aeblack-700);
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
let currentOpenPopover: AegovPopover | null = null;

/**
 * Popover component that displays positioned content with an arrow marker
 *
 * @slot - Trigger element (button, link, etc.)
 * @slot popover-content - Popover content (any HTML/components)
 */
@Component({
  tag: 'aegov-popover',
  styleUrl: 'aegov-popover.css',
  scoped: true,
})
export class AegovPopover {
  @Element() el: HTMLElement;

  @State() isOpen: boolean = false;
  @State() hasContentSlot: boolean = false;

  private popoverRef?: HTMLDivElement;
  private arrowRef?: HTMLDivElement;
  private triggerRef?: HTMLDivElement;
  private portalElement?: HTMLDivElement;
  private contentSlotRef?: HTMLElement;
  private slotWrapperRef?: HTMLDivElement;
  private hideTimeout?: number;
  private showTimeout?: number;
  private positionUpdateScheduled: boolean = false;
  private positionRetryCount: number = 0;
  private readonly MAX_POSITION_RETRIES = 10;
  private outOfViewportStreak: number = 0;
  private readonly OUT_OF_VIEWPORT_CLOSE_THRESHOLD = 2;
  private suppressFocusRestore: boolean = false;
  private focusableElements: HTMLElement[] = [];
  private currentFocusIndex: number = -1;
  private focusTrapPending: boolean = false;
  private triggerElement?: HTMLElement;

  /**
   * Unique ID for the popover element. Auto-generated if not provided.
   * The trigger element receives a derived ID `${fieldId}-trigger` for ARIA linkage.
   */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /**
   * Trigger type for showing the popover
   * @default 'click'
   */
  @Prop() trigger: PopoverTrigger = 'click';

  /**
   * Position of the popover relative to the trigger element
   * @default 'bottom'
   */
  @Prop() position: PopoverPosition = 'bottom';

  /**
   * Alignment of the popover
   * @default 'center'
   */
  @Prop() align: PopoverAlign = 'center';

  /**
   * Gap between popover and trigger element (in pixels)
   * @default 10
   */
  @Prop() gap: number = 10;

  /**
   * Additional offset for popover positioning (in pixels)
   * @default 0
   */
  @Prop() offset: number = 0;

  /**
   * Whether the popover is disabled
   * @default false
   */
  @Prop() isDisabled: boolean = false;

  /**
   * Delay before showing popover on hover (in milliseconds)
   * @default 200
   */
  @Prop() delayStart: number = 200;

  /**
   * Delay before hiding popover on hover (in milliseconds)
   * @default 0
   */
  @Prop() delayEnd: number = 0;

  /**
   * Emitted when popover opens
   */
  @Event() aegovPopoverOpen: EventEmitter<void>;

  /**
   * Emitted when popover closes
   */
  @Event() aegovPopoverClose: EventEmitter<void>;

  componentWillLoad() {
    warnIfInvalidEnumProp(this.trigger, POPOVER_TRIGGERS, 'click', ctx('trigger'));
    warnIfInvalidEnumProp(this.position, POPOVER_POSITIONS, 'bottom', ctx('position'));
    warnIfInvalidEnumProp(this.align, POPOVER_ALIGNS, 'center', ctx('align'));
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-popover');
    }
    this.checkSlotContent();
  }

  private get triggerId(): string {
    return `${this.fieldId}-trigger`;
  }

  /**
   * Sanitized `trigger` value — falls back to the documented default ('click') for any
   * invalid value. Every runtime branch below compares against this, not the raw prop:
   * an invalid `trigger` must still behave like the default, not silently disable both
   * the hover AND click code paths (each guarded by a bare `=== 'hover'`/`=== 'click'`) —
   * same bug class already fixed on aegov-dropdown and aegov-tooltip.
   */
  private get safeTrigger(): PopoverTrigger {
    return (POPOVER_TRIGGERS as readonly string[]).includes(this.trigger) ? this.trigger : 'click';
  }

  @Watch('trigger')
  onTriggerChange(v: unknown) { warnIfInvalidEnumProp(v, POPOVER_TRIGGERS, 'click', ctx('trigger')); }

  @Watch('position')
  onPositionChange(v: unknown) { warnIfInvalidEnumProp(v, POPOVER_POSITIONS, 'bottom', ctx('position')); }

  @Watch('align')
  onAlignChange(v: unknown) { warnIfInvalidEnumProp(v, POPOVER_ALIGNS, 'center', ctx('align')); }

  async componentDidLoad() {
    // Portal creation is lazy — see handleOpenChange() (#60). Eagerly
    // creating it here regardless of whether the popover is ever opened
    // left one permanent, empty <div> in document.body per mounted
    // instance, for the lifetime of the page.
    const inner = await this.getTriggerFocusableAsync();
    this.syncTriggerAria(inner);
  }

  connectedCallback() {
    // Only recreate on reconnect if we're supposed to be open right now —
    // isOpen is @State, so it survives a disconnect/reconnect pair (e.g.
    // the same kind aegov-modal's own connectedCallback comment describes).
    // A popover that was never opened, or was closed, stays portal-less
    // until it's actually opened again (#60).
    if (!this.portalElement && this.el.isConnected && this.isOpen) {
      this.createPortalElement();
    }
  }

  disconnectedCallback() {
    this.clearTimeouts();
    this.returnPortalContent();
    this.removePortalElement();
  }

  private checkSlotContent() {
    const contentSlot = this.el.querySelector('[slot="popover-content"]');
    this.hasContentSlot = contentSlot !== null;
  }

  private createPortalElement() {
    if (!this.portalElement) {
      this.portalElement = createPortal('aegov-popover-portal');
    }
  }

  private removePortalElement() {
    this.portalElement = removePortal(this.portalElement);
  }

  @Watch('isOpen')
  handleOpenChange(newValue: boolean) {
    if (newValue) {
      // Close any other open popover (singleton — no nesting)
      if (currentOpenPopover && currentOpenPopover !== this) {
        currentOpenPopover.closePopover();
      }
      currentOpenPopover = this;

      this.positionRetryCount = 0;
      this.outOfViewportStreak = 0;
      // Lazily (re-)create the portal div — the close branch below removes it
      // entirely rather than just clearing its content (#60), so a reopen
      // needs a fresh one. createPortalElement() is itself a no-op if one
      // already exists (e.g. a popover that's never been closed before).
      this.createPortalElement();
      this.renderPortalContent();
      this.schedulePositionUpdate();
      this.aegovPopoverOpen.emit();
      this.triggerElement = document.activeElement as HTMLElement;
      this.syncTriggerAria();
      // Deferred to updatePopoverPosition(), which runs the focus trap only once the
      // panel is actually visible: setupFocusTrap() calls .focus() unconditionally, but
      // the panel starts CSS `visibility: hidden` until positioning sets it visible, and
      // .focus() on an element inside a visibility:hidden ancestor is a silent no-op —
      // a setTimeout(0) here would race that rAF-scheduled visibility flip and could lose.
      //
      // Only for trigger="click" (dialog/menu semantics — the user explicitly activated
      // it, so moving focus into the resulting content is expected). trigger="hover" is a
      // tooltip/hovercard pattern (SC 2.1.1's keyboard-focus equivalent to hover): focus
      // must stay on the trigger so "closes on blur" is meaningful — handleTriggerFocusout
      // already keeps it open if the user voluntarily tabs on into the panel content.
      // Auto-stealing focus into the panel here would make every hover-triggered open
      // immediately blur the trigger via its own doing, closing itself right away.
      if (this.safeTrigger !== 'hover') {
        this.focusTrapPending = true;
      }
    } else {
      if (currentOpenPopover === this) {
        currentOpenPopover = null;
      }

      this.focusTrapPending = false;
      this.cleanupPopoverListeners();
      // returnPortalContent() first moves the real slotted content back to
      // its original position (same order disconnectedCallback() already
      // uses), so the portal div is safely empty by the time we remove it
      // entirely here, rather than leaving an empty, permanent <div> behind
      // in document.body for the lifetime of the component instance (#60).
      this.returnPortalContent();
      this.popoverRef = undefined;
      this.arrowRef = undefined;
      this.positionUpdateScheduled = false;
      this.positionRetryCount = 0;
      this.removePortalElement();

      this.aegovPopoverClose.emit();

      // Skip for a hover-trigger's own natural blur-away close: triggerElement IS the
      // element that was just blurred, so focusing it back would immediately re-fire
      // handleTriggerFocusin -> showPopover(), silently reopening the popover the
      // instant the user moved focus away from it. Escape/click-outside/scroll-away
      // closes still restore focus as normal.
      // resolveFocusTarget handles a shadow-DOM trigger whose host isn't itself
      // focusable — .focus() on it directly would otherwise silently no-op (#66).
      if (this.triggerElement && !this.suppressFocusRestore) {
        resolveFocusTarget(this.triggerElement).focus({ preventScroll: true });
      }
      this.suppressFocusRestore = false;

      this.syncTriggerAria();
    }
  }

  @Method()
  async closePopover(): Promise<void> {
    this.isOpen = false;
  }

  private clearTimeouts() {
    if (this.showTimeout) {
      window.clearTimeout(this.showTimeout);
    }
    if (this.hideTimeout) {
      window.clearTimeout(this.hideTimeout);
    }
  }

  private cleanupPopoverListeners() {
    if (this.popoverRef) {
      this.popoverRef.removeEventListener('mouseenter', this.handlePopoverMouseEnter);
      this.popoverRef.removeEventListener('mouseleave', this.handlePopoverMouseLeave);
    }
  }

  @Listen('scroll', { target: 'window', passive: true })
  @Listen('resize', { target: 'window', passive: true })
  handleWindowEvents() {
    if (this.isOpen) {
      this.schedulePositionUpdate();
    }
  }

  private schedulePositionUpdate() {
    if (this.positionUpdateScheduled) return;
    if (!this.isOpen) return;

    this.positionUpdateScheduled = true;
    requestAnimationFrame(() => {
      if (this.isOpen && this.popoverRef) {
        this.updatePopoverPosition();
      }
      this.positionUpdateScheduled = false;
    });
  }

  private updatePopoverPosition() {
    if (!this.popoverRef || !this.triggerRef) return;

    const triggerRect = this.triggerRef.getBoundingClientRect();
    const popoverRect = this.popoverRef.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Close if trigger has scrolled out of viewport. Require two consecutive
    // out-of-viewport readings before actually closing: other concurrent DOM activity
    // (layout shifts, in-flight CSS transitions, a momentary reflow) can make a single
    // rAF tick see a stale/transient rect even though the trigger is genuinely still in
    // view a frame later — closing on that first reading was flipping the popover shut
    // moments after it opened.
    if (
      triggerRect.bottom < 0 ||
      triggerRect.top > viewportHeight ||
      triggerRect.right < 0 ||
      triggerRect.left > viewportWidth
    ) {
      this.outOfViewportStreak++;
      if (this.outOfViewportStreak >= this.OUT_OF_VIEWPORT_CLOSE_THRESHOLD) {
        this.isOpen = false;
        return;
      }
      requestAnimationFrame(() => this.updatePopoverPosition());
      return;
    }
    this.outOfViewportStreak = 0;

    // Retry if not yet measured
    if (popoverRect.width === 0 || popoverRect.height === 0) {
      if (this.positionRetryCount < this.MAX_POSITION_RETRIES) {
        this.positionRetryCount++;
        requestAnimationFrame(() => this.updatePopoverPosition());
      }
      return;
    }

    let position: PopoverPosition = (POPOVER_POSITIONS as readonly string[]).includes(this.position) ? this.position : 'bottom';

    // Flip if not enough space
    if (position === 'bottom' && triggerRect.bottom + this.gap + popoverRect.height > viewportHeight) {
      if (triggerRect.top - this.gap - popoverRect.height > 0) position = 'top';
    } else if (position === 'top' && triggerRect.top - this.gap - popoverRect.height < 0) {
      if (triggerRect.bottom + this.gap + popoverRect.height < viewportHeight) position = 'bottom';
    } else if (position === 'right' && triggerRect.right + this.gap + popoverRect.width > viewportWidth) {
      if (triggerRect.left - this.gap - popoverRect.width > 0) position = 'left';
    } else if (position === 'left' && triggerRect.left - this.gap - popoverRect.width < 0) {
      if (triggerRect.right + this.gap + popoverRect.width < viewportWidth) position = 'right';
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
    } else {
      top += this.offset;
    }

    // Ensure within viewport
    if (left < 8) left = 8;
    else if (left + popoverRect.width > viewportWidth) left = viewportWidth - popoverRect.width - 8;
    if (top < 8) top = 8;
    else if (top + popoverRect.height > viewportHeight) top = viewportHeight - popoverRect.height - 8;

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

    // Only now is the panel actually focusable — see handleOpenChange() for why this
    // can't just run on open.
    if (this.focusTrapPending) {
      this.focusTrapPending = false;
      this.setupFocusTrap();
    }
  }

  private positionArrow(
    triggerRect: DOMRect,
    popoverTop: number,
    popoverLeft: number,
    popoverRect: DOMRect,
    position: PopoverPosition,
  ) {
    if (!this.arrowRef) return;

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
    } else {
      // Vertical: center arrow on trigger center, clamped to popover bounds
      const triggerCenterY = triggerRect.top + triggerRect.height / 2;
      let arrowTop = triggerCenterY - popoverTop - halfArrow;
      arrowTop = Math.max(minInset, Math.min(arrowTop, popoverRect.height - arrowSize - minInset));
      this.arrowRef.style.top = `${arrowTop}px`;
      this.arrowRef.style.left = '';
    }
  }

  private isRtl(): boolean {
    return getComputedStyle(this.el).direction === 'rtl';
  }

  private calculateHorizontalPosition(triggerRect: DOMRect, popoverRect: DOMRect): number {
    // In RTL, 'start' means the trigger's right edge and 'end' means its left edge —
    // documented explicitly ("align='start'/'end' follow the reading direction"), but
    // this switch used to ignore direction entirely.
    const rtl = this.isRtl();
    const effectiveAlign = rtl
      ? this.align === 'start' ? 'end' : this.align === 'end' ? 'start' : this.align
      : this.align;
    switch (effectiveAlign) {
      case 'start':
        return triggerRect.left;
      case 'end':
        return triggerRect.right - popoverRect.width;
      case 'center':
      default:
        return triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
    }
  }

  private calculateVerticalPosition(triggerRect: DOMRect, popoverRect: DOMRect): number {
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

  private showPopover = () => {
    if (this.isDisabled) return;
    this.clearTimeouts();
    // Re-entering hover/focus cancels any pending hide, so any suppress-focus-restore
    // intent from that cancelled hide is stale too.
    this.suppressFocusRestore = false;
    this.showTimeout = window.setTimeout(() => {
      this.isOpen = true;
    }, this.delayStart);
  };

  private static readonly HOVER_HIDE_GRACE = 100;

  private hidePopover = () => {
    this.clearTimeouts();
    const delay = this.safeTrigger === 'hover'
      ? Math.max(this.delayEnd, AegovPopover.HOVER_HIDE_GRACE)
      : this.delayEnd;

    this.hideTimeout = window.setTimeout(() => {
      this.isOpen = false;
    }, delay);
  };

  private handleTriggerMouseEnter = () => {
    if (this.safeTrigger === 'hover') {
      this.showPopover();
    }
  };

  private handleTriggerMouseLeave = (event: MouseEvent) => {
    if (this.safeTrigger === 'hover') {
      const relatedTarget = event.relatedTarget as HTMLElement;
      if (relatedTarget && this.portalElement && this.portalElement.contains(relatedTarget)) {
        return;
      }
      this.hidePopover();
    }
  };

  // SC 2.1.1: hover trigger must also open on keyboard focus
  private handleTriggerFocusin = () => {
    if (this.safeTrigger === 'hover') {
      this.showPopover();
    }
  };

  private handleTriggerFocusout = (event: FocusEvent) => {
    if (this.safeTrigger === 'hover') {
      const relatedTarget = event.relatedTarget as HTMLElement;
      // Keep open if focus moves into the popover content
      if (relatedTarget && this.portalElement && this.portalElement.contains(relatedTarget)) {
        return;
      }
      // The trigger is the element blurring here, so restoring focus to it on close
      // would immediately re-focus it and reopen via handleTriggerFocusin — see
      // handleOpenChange()'s close branch.
      this.suppressFocusRestore = true;
      this.hidePopover();
    }
  };

  private handleTriggerClick = (event: MouseEvent) => {
    if (this.safeTrigger === 'click' && !this.isDisabled) {
      event.stopPropagation();
      this.isOpen = !this.isOpen;
    }
  };

  private handlePopoverMouseEnter = () => {
    if (this.safeTrigger === 'hover') {
      this.clearTimeouts();
    }
  };

  private handlePopoverMouseLeave = (event: MouseEvent) => {
    if (this.safeTrigger === 'hover') {
      const relatedTarget = event.relatedTarget as HTMLElement;
      if (relatedTarget && this.triggerRef && this.triggerRef.contains(relatedTarget)) {
        return;
      }
      this.hidePopover();
    }
  };

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent) {
    if (this.isOpen) {
      const target = event.target as Node;
      if (!this.el.contains(target) && this.portalElement && !this.portalElement.contains(target)) {
        this.isOpen = false;
      }
    }
  }

  private keyHandler = createKeyboardHandler({
    onEscape: () => { this.isOpen = false; },
    onTab: (reverse) => { this.focusNextElement(reverse); },
    onArrowDown: () => { this.focusNextElement(false); },
    onArrowUp: () => { this.focusNextElement(true); },
  });

  @Listen('keydown', { target: 'document' })
  handleKeyDown(event: KeyboardEvent) {
    if (!this.isOpen) return;
    this.keyHandler(event);
  }

  private static readonly TRIGGER_FOCUSABLE_SELECTOR =
    'button, a, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  /**
   * Finds the trigger's real focusable element so ARIA state lands where AT actually
   * reads it. A plain light-DOM search covers native elements and non-shadow custom
   * elements (e.g. `aegov-link`), but a `shadow:true` trigger like `aegov-button` (used
   * as the trigger in every doc example) never reflects `tabindex`/role onto its own
   * host — its real `<button>` lives inside its shadow root, unreachable by a plain
   * `querySelector` from here. Fall back to checking each trigger descendant's
   * `shadowRoot` when the light-DOM search finds nothing (same fix already applied to
   * aegov-tooltip's `aria-describedby` wiring, same root cause).
   */
  private getTriggerFocusable(): HTMLElement | null {
    if (!this.triggerRef) return null;
    const direct = this.triggerRef.querySelector<HTMLElement>(AegovPopover.TRIGGER_FOCUSABLE_SELECTOR);
    if (direct) return direct;
    for (const child of Array.from(this.triggerRef.querySelectorAll<HTMLElement>('*'))) {
      if (child.shadowRoot) {
        const inner = child.shadowRoot.querySelector<HTMLElement>(AegovPopover.TRIGGER_FOCUSABLE_SELECTOR);
        if (inner) return inner;
      }
    }
    return null;
  }

  /**
   * Same search as `getTriggerFocusable`, but awaits a shadow-DOM candidate's own
   * `componentOnReady()` first. At `componentDidLoad()` time a nested Stencil component's
   * shadow root already exists (`attachShadow` runs synchronously on connection) but is
   * often still empty — its own render hasn't completed yet, since each component follows
   * its own independently-queued render cycle. Searching it immediately would find
   * nothing even though it becomes populated moments later.
   */
  private async getTriggerFocusableAsync(): Promise<HTMLElement | null> {
    if (!this.triggerRef) return null;
    const direct = this.triggerRef.querySelector<HTMLElement>(AegovPopover.TRIGGER_FOCUSABLE_SELECTOR);
    if (direct) return direct;
    for (const child of Array.from(this.triggerRef.querySelectorAll<HTMLElement>('*'))) {
      const maybeStencilEl = child as unknown as { componentOnReady?: () => Promise<unknown> };
      if (typeof maybeStencilEl.componentOnReady === 'function') {
        await maybeStencilEl.componentOnReady();
      }
      if (child.shadowRoot) {
        const inner = child.shadowRoot.querySelector<HTMLElement>(AegovPopover.TRIGGER_FOCUSABLE_SELECTOR);
        if (inner) return inner;
      }
    }
    return null;
  }

  // SC 4.1.2: propagate ARIA state to the first focusable child inside the trigger wrapper
  private syncTriggerAria(inner?: HTMLElement | null) {
    const el = inner !== undefined ? inner : this.getTriggerFocusable();
    if (!el) return;
    el.setAttribute('aria-haspopup', 'dialog');
    el.setAttribute('aria-expanded', this.isOpen.toString());
    if (this.isOpen && this.fieldId) {
      el.setAttribute('aria-controls', this.fieldId);
    } else {
      el.removeAttribute('aria-controls');
    }
  }

  private setupFocusTrap() {
    if (!this.popoverRef) return;
    this.focusableElements = getFocusableElements(this.popoverRef, FOCUSABLE_SELECTORS);
    if (this.focusableElements.length > 0) {
      this.currentFocusIndex = 0;
      this.focusableElements[0].focus();
    } else {
      // Fallback: focus the popover container itself so AT announces it
      this.popoverRef.focus();
    }
  }

  private focusNextElement(reverse: boolean = false) {
    this.currentFocusIndex = cycleFocus(this.focusableElements, this.currentFocusIndex, reverse);
  }

  private renderPortalContent() {
    if (!this.portalElement || !this.hasContentSlot) return;

    const contentSlot = this.el.querySelector('[slot="popover-content"]') as HTMLElement;
    if (!contentSlot) return;

    this.contentSlotRef = contentSlot;

    // The portal div is a child of document.body, several levels outside any
    // local dir="rtl" ancestor wrapper around the popover itself — direction
    // doesn't travel with the move the way position/alignment already do
    // (#58, the same portal-vs-dir gap already found and fixed in
    // aegov-datepicker/#37, aegov-dropdown/#41, and aegov-modal/#53). Set it
    // fresh on every render so it reflects the host's current resolved
    // direction, not just whatever it was when the portal div was created.
    this.portalElement.setAttribute('dir', this.isRtl() ? 'rtl' : 'ltr');

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
    popoverContainer.setAttribute('tabindex', '-1'); // fallback focus when content has no focusable children
    popoverContainer.setAttribute('data-state', 'open');
    popoverContainer.setAttribute('data-position', (POPOVER_POSITIONS as readonly string[]).includes(this.position) ? this.position : 'bottom');

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

  private returnPortalContent() {
    if (!this.contentSlotRef || !this.slotWrapperRef) return;
    this.contentSlotRef.setAttribute('slot', 'popover-content');
    this.slotWrapperRef.appendChild(this.contentSlotRef);
    this.contentSlotRef = undefined;
  }

  render() {
    const hasContent = this.hasContentSlot;

    return (
      <Host>
        <div
          class="aegov-popover-trigger"
          id={this.triggerId}
          ref={(el) => (this.triggerRef = el)}
          onMouseEnter={this.handleTriggerMouseEnter}
          onMouseLeave={this.handleTriggerMouseLeave}
          onClick={this.handleTriggerClick}
          onFocusin={this.handleTriggerFocusin}
          onFocusout={this.handleTriggerFocusout}
        >
          <slot />
        </div>

        {hasContent && (
          <div style={{ display: 'none' }} ref={(el) => (this.slotWrapperRef = el)}>
            <slot name="popover-content" />
          </div>
        )}
      </Host>
    );
  }
}
