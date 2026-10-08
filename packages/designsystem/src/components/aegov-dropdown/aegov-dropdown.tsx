import { Component, Host, h, Prop, Element, State, Listen, Event, EventEmitter, Watch, Method } from '@stencil/core';
import { DROPDOWN_POSITIONS, DROPDOWN_ALIGNS, DROPDOWN_TRIGGERS } from '../../utils/types';
import type { DropdownPosition, DropdownAlign, DropdownTrigger } from '../../utils/types';
import { generateId } from '../../utils/id-generator';
import { getFocusableElements, getFocusableElementsDeep, getDeepActiveElement, resolveFocusTarget, FOCUSABLE_SELECTORS, cycleFocus } from '../../utils/focus-management';
import { createPortal, removePortal } from '../../utils/portal-manager';
import { createKeyboardHandler } from '../../utils/keyboard-handler';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { getPassThroughAttributes } from '../../utils/attributes';
import { isRtl } from '../../utils/rtl';

const TAG = 'aegov-dropdown';
const ctx = (prop: string) => ({ component: TAG, prop });

/**
 * Design token values used in portal-injected styles.
 * Portal elements live outside Stencil's scope, so Tailwind utilities aren't available —
 * these CSS values must be injected via JS. Keep in sync with the Tailwind theme.
 */
const PORTAL_TOKENS = {
  shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  radius: '0.5rem',
  transition: 'opacity 200ms ease-in-out, transform 200ms ease-in-out',
} as const;

/** CSS injected into the portal element (scoped CSS can't reach it).
 * Theme color vars from tailwind.css @theme are declared on :root, so they
 * inherit into the portal (document.body descendant). `.dark` on <html>
 * provides dark-mode overrides via the `.dark` selector branch below. */
const DROPDOWN_PORTAL_STYLES = `
  .aegov-dropdown-portal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    pointer-events: none;
  }

  [dir="rtl"] .aegov-dropdown-portal {
    text-align: right;
  }
  .aegov-dropdown-portal .aegov-dropdown {
    background: var(--color-whitely-50);
    color: var(--color-aeblack-800);
    border: 1px solid var(--color-aeblack-200);
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

  .dark .aegov-dropdown-portal .aegov-dropdown {
    background: var(--color-aeblack-900);
    color: var(--color-whitely-100);
    border-color: var(--color-aeblack-700);
  }

  .aegov-dropdown-portal .aegov-dropdown[data-state="open"] {
    visibility: visible;
    opacity: 1;
    transform: scale(1);
  }

  .aegov-dropdown-portal .aegov-dropdown hr {
    border: none;
    border-top: 1px solid var(--color-aeblack-100);
    margin: 0.5rem 0;
  }

  .dark .aegov-dropdown-portal .aegov-dropdown hr {
    border-top-color: var(--color-aeblack-700);
  }

  .aegov-dropdown-portal .aegov-dropdown a {
    display: block;
    margin-bottom: 8px;
    color: var(--color-primary-600);
  }
   .aegov-dropdown-portal .aegov-dropdown > div > a:last-child{
      margin-bottom: 0;
    }

  .dark .aegov-dropdown-portal .aegov-dropdown a {
    color: var(--color-primary-400);
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
let currentOpenDropdown: AegovDropdown | null = null;

/**
 * Dropdown component that displays positioned content on trigger interaction
 *
 * @slot - Trigger element (button, link, etc.)
 * @slot dropdown-content - Dropdown content (any HTML/components)
 */
@Component({
  tag: 'aegov-dropdown',
  styleUrl: 'aegov-dropdown.css',
  scoped: true,
})
export class AegovDropdown {
  @Element() el: HTMLElement;

  @State() isOpen: boolean = false;
  @State() hasContentSlot: boolean = false;

  private dropdownRef?: HTMLDivElement;
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
  private focusableElements: HTMLElement[] = [];
  private currentFocusIndex: number = -1;
  private triggerElement?: HTMLElement;
  /**
   * Whether the most recent open was triggered via keyboard. Drives the
   * decision to auto-focus the first menu item: keyboard opens move focus
   * into the menu (ARIA menu pattern), pointer opens leave focus where
   * the user put it.
   */
  private openedViaKeyboard: boolean = false;
  private _skipNextDocumentClick: boolean = false;

  /**
   * When true, setupFocusTrap will focus the LAST item instead of the first.
   * Set by the ArrowUp-on-closed-trigger path so both open + focus-last happen
   * in a single setTimeout (avoids a race between two competing timers).
   */
  private openFocusLast: boolean = false;

  /**
   * True when the open was triggered by an ArrowDown/ArrowUp key.
   * Arrow-key opens always move focus into the menu, even in disclosure mode,
   * because the user explicitly navigated toward the items.
   * Enter/Space opens in disclosure mode leave focus on the trigger (APG Disclosure).
   */
  private openedViaArrowKey: boolean = false;

  private typeaheadBuffer: string = '';
  private typeaheadTimer: ReturnType<typeof setTimeout> | null = null;

  /**
   * Unique ID for the dropdown menu element. Auto-generated if not provided.
   * The trigger element receives a derived ID `${fieldId}-trigger` for ARIA linkage.
   */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /**
   * Trigger type for showing the dropdown
   * @default 'click'
   */
  @Prop() trigger: DropdownTrigger = 'click';

  /**
   * Controls Tab key behaviour when the dropdown is open.
   *
   * - `'menu-button'` (default): Tab and Shift+Tab trap focus inside the open
   *   menu, cycling through its items with wraparound — identical to
   *   ArrowDown/ArrowUp. Use this for action menus, settings menus, and other
   *   non-navigation dropdowns.
   *
   * - `'disclosure'`: Tab moves focus through the links inside the open menu,
   *   then closes it when focus leaves the last item — follows the WAI-ARIA
   *   Disclosure Navigation Hybrid pattern. Set automatically by
   *   `aegov-navbar-item` when the dropdown is used as a nav sub-menu.
   *
   * @default 'menu-button'
   */
  @Prop() tabBehavior: 'menu-button' | 'disclosure' = 'menu-button';

  /**
   * Position of the dropdown relative to the trigger element
   * @default 'bottom'
   */
  @Prop() position: DropdownPosition = 'bottom';

  /**
   * Alignment of the dropdown
   * @default 'start'
   */
  @Prop() align: DropdownAlign = 'start';

  /**
   * Gap between dropdown and trigger element (in pixels)
   * @default 8
   */
  @Prop() gap: number = 8;

  /**
   * Additional offset for dropdown positioning (in pixels)
   * @default 0
   */
  @Prop() offset: number = 0;

  /**
   * Whether the dropdown is disabled
   * @default false
   */
  @Prop({ reflect: true }) isDisabled: boolean = false;

  /**
   * Delay before showing dropdown (in milliseconds)
   * @default 200
   */
  @Prop() delayStart: number = 200;

  /**
   * Delay before hiding dropdown (in milliseconds)
   * @default 0
   */
  @Prop() delayEnd: number = 0;

  /**
   * Emitted when dropdown opens
   */
  @Event() aegovDropdownOpen: EventEmitter<void>;

  /**
   * Emitted when dropdown closes
   */
  @Event() aegovDropdownClose: EventEmitter<void>;

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

  private get triggerId(): string {
    return `${this.fieldId}-trigger`;
  }

  /**
   * Sanitized `trigger` value — falls back to the documented default ('click')
   * for any invalid value. Every runtime branch below compares against this,
   * not the raw prop: an invalid `trigger` must still behave like the default,
   * not silently disable click-opening (the only comparison that isn't 'hover').
   */
  private get safeTrigger(): DropdownTrigger {
    return (DROPDOWN_TRIGGERS as readonly string[]).includes(this.trigger) ? this.trigger : 'click';
  }

  @Watch('trigger')
  onTriggerChange(v: unknown) { warnIfInvalidEnumProp(v, DROPDOWN_TRIGGERS, 'click', ctx('trigger')); }

  @Watch('position')
  onPositionChange(v: unknown) { warnIfInvalidEnumProp(v, DROPDOWN_POSITIONS, 'bottom', ctx('position')); }

  @Watch('align')
  onAlignChange(v: unknown) { warnIfInvalidEnumProp(v, DROPDOWN_ALIGNS, 'start', ctx('align')); }

  componentDidLoad() {
    // Create portal element for dropdown content
    this.createPortalElement();
    // Sync ARIA state to the focusable child inside the trigger wrapper
    this.syncTriggerAria();
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

  private checkSlotContent() {
    const contentSlot = this.el.querySelector('[slot="dropdown-content"]');
    const hasSlot = contentSlot !== null;
    this.hasContentSlot = hasSlot;
  }

  private createPortalElement() {
    if (!this.portalElement) {
      this.portalElement = createPortal('aegov-dropdown-portal');
    }
  }

  private removePortalElement() {
    this.portalElement = removePortal(this.portalElement);
  }

  private cleanupDropdownListeners() {
    if (this.dropdownRef) {
      this.dropdownRef.removeEventListener('mouseenter', this.handleDropdownMouseEnter);
      this.dropdownRef.removeEventListener('mouseleave', this.handleDropdownMouseLeave);
      this.dropdownRef.removeEventListener('click', this.handleMenuItemClick);
    }
  }

  // APG Menu pattern: activating a menuitem closes the menu.
  // Skip items that open a submenu (aria-haspopup present).
  private handleMenuItemClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const menuItem = target.closest<HTMLElement>('[role="menuitem"]');
    if (menuItem && !menuItem.getAttribute('aria-haspopup')) {
      this.isOpen = false;
    }
  };

  private syncTriggerAria() {
    if (!this.triggerRef) return;
    // ARIA state must live on the focusable element itself, not its wrapper div.
    // Pierce into any shadow root along the way — a trigger like aegov-button is
    // shadow:true, so its real inner <button> is unreachable by a plain
    // querySelector from this light-DOM wrapper.
    //
    // Priority: prefer <button> / [role="button"] over navigating <a> elements.
    // When both coexist inside the trigger (e.g. aegov-navbar-item injects a link
    // AND a chevron button), the button owns the menu ARIA — the link should stay
    // as a plain navigation link without aria-haspopup to avoid screen readers
    // announcing "menupopup, link, Services".
    const inner =
      getFocusableElementsDeep(this.triggerRef, 'button:not([aria-hidden="true"]), [role="button"]')[0] ??
      getFocusableElementsDeep(this.triggerRef, 'a, input, select, textarea, [tabindex]:not([tabindex="-1"])')[0];
    if (!inner) return;
    // Disclosure pattern uses aria-expanded only; aria-haspopup belongs to Menu Button.
    if (this.tabBehavior === 'menu-button') {
      inner.setAttribute('aria-haspopup', 'menu');
    }
    inner.setAttribute('aria-expanded', this.isOpen.toString());
    if (this.isOpen && this.fieldId) {
      inner.setAttribute('aria-controls', this.fieldId);
    } else {
      inner.removeAttribute('aria-controls');
    }
  }

  @Watch('isOpen')
  handleOpenChange(newValue: boolean) {
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
      this.outOfViewportStreak = 0;
      // Render portal content
      this.renderPortalContent();
      // Schedule position update after dropdown is rendered
      this.schedulePositionUpdate();
      // Emit open event
      this.aegovDropdownOpen.emit();
      // Store the trigger element for focus restoration
      this.triggerElement = document.activeElement as HTMLElement;
      // Always populate the focusable list so subsequent keyboard navigation
      // (Tab / Arrow keys) inside the menu works regardless of how it opened.
      // ArrowDown/ArrowUp always move focus — user navigated explicitly toward items.
      // Enter/Space in disclosure mode keep focus on the trigger (APG Disclosure pattern);
      // Enter/Space in menu-button mode move focus (ARIA menu pattern).
      const moveFocus = this.openedViaArrowKey || (this.tabBehavior !== 'disclosure' && this.openedViaKeyboard);
      const focusLast = this.openFocusLast;
      this.openFocusLast = false;
      this.openedViaArrowKey = false;
      setTimeout(() => this.setupFocusTrap(moveFocus, focusLast), 0);
    } else {
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
      // resolveFocusTarget handles a shadow:true trigger like aegov-button —
      // its host isn't itself focusable, so .focus() on it directly silently
      // no-ops, dropping focus to <body> instead of back to the trigger.
      if (this.triggerElement) {
        resolveFocusTarget(this.triggerElement).focus({ preventScroll: true });
      }
    }
    // Keep ARIA state on the inner focusable element in sync
    this.syncTriggerAria();
  }

  /**
   * Public method to close this dropdown
   * Used by other dropdowns to close this one when they open
   */
  @Method()
  async closeDropdown(): Promise<void> {
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
  @Method()
  async toggle(viaKeyboard: boolean = false, viaArrow: boolean = false): Promise<void> {
    if (this.isDisabled) return;
    this.openedViaKeyboard = viaKeyboard;
    this.openedViaArrowKey = viaArrow;
    if (!this.isOpen) {
      // Programmatic open has no stopPropagation on the caller's click event.
      // Skip the next document click so it doesn't immediately close the dropdown.
      this._skipNextDocumentClick = true;
    }
    this.isOpen = !this.isOpen;
  }

  private clearTimeouts() {
    if (this.showTimeout) {
      window.clearTimeout(this.showTimeout);
    }
    if (this.hideTimeout) {
      window.clearTimeout(this.hideTimeout);
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
      if (this.isOpen && this.dropdownRef) {
        this.updateDropdownPosition();
      }
      this.positionUpdateScheduled = false;
    });
  }

  private updateDropdownPosition() {
    if (!this.dropdownRef || !this.triggerRef) return;

    const triggerRect = this.triggerRef.getBoundingClientRect();
    const dropdownRect = this.dropdownRef.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Close dropdown if trigger has scrolled out of the viewport. Require two
    // consecutive out-of-viewport readings before actually closing: other concurrent
    // DOM activity (layout shifts, an in-flight transition, a momentary reflow) can
    // make a single rAF tick see a stale/transient rect even though the trigger is
    // genuinely still in view a frame later — closing on that first reading was
    // flipping the dropdown shut moments after it opened.
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
      requestAnimationFrame(() => this.updateDropdownPosition());
      return;
    }
    this.outOfViewportStreak = 0;

    // If dropdown hasn't been measured yet (width/height = 0), retry with limit
    if (dropdownRect.width === 0 || dropdownRect.height === 0) {
      if (this.positionRetryCount < this.MAX_POSITION_RETRIES) {
        this.positionRetryCount++;
        requestAnimationFrame(() => this.updateDropdownPosition());
      } else {
        console.warn('Dropdown position update failed: Unable to measure dropdown dimensions after maximum retries');
      }
      return;
    }

    let position: DropdownPosition = (DROPDOWN_POSITIONS as readonly string[]).includes(this.position) ? this.position : 'bottom';

    // Check if there's enough space in the preferred position, flip if needed
    if (position === 'bottom' && triggerRect.bottom + this.gap + dropdownRect.height > viewportHeight) {
      if (triggerRect.top - this.gap - dropdownRect.height > 0) {
        position = 'top';
      }
    } else if (position === 'top' && triggerRect.top - this.gap - dropdownRect.height < 0) {
      if (triggerRect.bottom + this.gap + dropdownRect.height < viewportHeight) {
        position = 'bottom';
      }
    } else if (position === 'right' && triggerRect.right + this.gap + dropdownRect.width > viewportWidth) {
      if (triggerRect.left - this.gap - dropdownRect.width > 0) {
        position = 'left';
      }
    } else if (position === 'left' && triggerRect.left - this.gap - dropdownRect.width < 0) {
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
    } else {
      top += this.offset;
    }

    // Ensure dropdown stays within viewport
    if (left < 8) {
      left = 8;
    } else if (left + dropdownRect.width > viewportWidth) {
      left = viewportWidth - dropdownRect.width - 8;
    }

    if (top < 8) {
      top = 8;
    } else if (top + dropdownRect.height > viewportHeight) {
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

  private calculateHorizontalPosition(triggerRect: DOMRect, dropdownRect: DOMRect): number {
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

  private calculateVerticalPosition(triggerRect: DOMRect, dropdownRect: DOMRect): number {
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

  private showDropdown = () => {
    if (this.isDisabled) return;

    this.clearTimeouts();

    this.showTimeout = window.setTimeout(() => {
      this.openedViaKeyboard = false;
      this.isOpen = true;
    }, this.delayStart);
  };

  /**
   * Minimum grace period (ms) for hover-triggered dropdowns.
   * Gives the cursor time to cross the gap between trigger and portal panel.
   */
  private static readonly HOVER_HIDE_GRACE = 100;

  private hideDropdown = () => {
    this.clearTimeouts();

    // For hover-triggered dropdowns, enforce a minimum grace period
    // so the cursor can cross the gap between trigger and dropdown panel.
    const delay = this.safeTrigger === 'hover'
      ? Math.max(this.delayEnd, AegovDropdown.HOVER_HIDE_GRACE)
      : this.delayEnd;

    this.hideTimeout = window.setTimeout(() => {
      // Re-check: if the mouse re-entered while we were waiting, don't close
      this.isOpen = false;
    }, delay);
  };

  private handleTriggerMouseEnter = () => {
    if (this.safeTrigger === 'hover') {
      this.showDropdown();
    }
  };

  private handleTriggerMouseLeave = (event: MouseEvent) => {
    if (this.safeTrigger === 'hover') {
      const relatedTarget = event.relatedTarget as HTMLElement;
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

  private handleTriggerClick = (event: MouseEvent) => {
    if (this.isDisabled) return;
    // Prevent the slotted trigger's own default action — the documented nested-
    // dropdown pattern uses a plain <a href="#"> as the trigger, and without
    // this, activating it (click or Enter) also navigates via its href,
    // scrolling the page back to the top and destroying all menu/focus state.
    // Harmless for a <button>/<aegov-button> trigger, which has no default
    // action to prevent.
    event.preventDefault();
    // Click events fired by keyboard activation (Enter/Space on a focused
    // button) have detail === 0; real mouse/touch clicks have detail >= 1.
    const isKeyboard = event.detail === 0;
    // Click trigger: always toggle. Hover trigger: toggle only on keyboard
    // activation so mouse users still rely on hover, but keyboard users get
    // Enter/Space support (WCAG 2.5.1).
    if (this.safeTrigger === 'click' || (this.safeTrigger === 'hover' && isKeyboard)) {
      event.stopPropagation();
      this.openedViaKeyboard = isKeyboard;
      this.isOpen = !this.isOpen;
    }
  };

  private handleDropdownMouseEnter = () => {
    if (this.safeTrigger === 'hover') {
      this.clearTimeouts();
    }
  };

  private handleDropdownMouseLeave = (event: MouseEvent) => {
    if (this.safeTrigger === 'hover') {
      const relatedTarget = event.relatedTarget as HTMLElement;

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
        if (targetDropdown && this.dropdownRef && this.dropdownRef.contains(targetDropdown as Node)) {
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

  /**
   * Check if any nested aegov-dropdown inside our dropdown panel is currently open.
   */
  private hasOpenNestedDropdown(): boolean {
    if (!this.dropdownRef) return false;
    const nestedDropdowns = this.dropdownRef.querySelectorAll('aegov-dropdown');
    for (let i = 0; i < nestedDropdowns.length; i++) {
      const nestedEl = nestedDropdowns[i] as any;
      if (nestedEl.isOpen) {
        return true;
      }
    }
    return false;
  }

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent) {
    if (this._skipNextDocumentClick) {
      this._skipNextDocumentClick = false;
      return;
    }
    if (this.isOpen) {
      const target = event.target as Node;

      // Close if click is outside both trigger and dropdown
      if (!this.el.contains(target) && this.portalElement && !this.portalElement.contains(target)) {
        this.isOpen = false;
      }
    }
  }

  private keyHandler = createKeyboardHandler({
    onEscape: () => { this.isOpen = false; },
    onArrowDown: () => { this.focusNextElement(false); },
    onArrowUp: () => { this.focusNextElement(true); },
  });

  @Listen('keydown', { target: 'document' })
  handleKeyDown(event: KeyboardEvent) {
    // A dropdown whose own host currently sits inside an ancestor's open portal
    // is acting as a submenu trigger (its content moved there along with the
    // rest of the ancestor's slotted dropdown-content when the ancestor opened).
    // Submenus use the APG pattern — ArrowRight/ArrowLeft (mirrored in RTL) to
    // open/close — so ArrowDown/ArrowUp stay free for the ancestor's own
    // sibling-item navigation instead of fighting over the same keys (#67).
    const isSubmenuTrigger = !!this.el.closest('.aegov-dropdown-portal');
    const rtl = isRtl(this.el);
    const submenuOpenKey = rtl ? 'ArrowLeft' : 'ArrowRight';
    const submenuCloseKey = rtl ? 'ArrowRight' : 'ArrowLeft';

    if (!this.isOpen) {
      // APG Menu Button (optional): ArrowDown opens menu to first item, ArrowUp to last item.
      // APG submenu: ArrowRight (ArrowLeft in RTL) opens to the first item.
      const opensClosedMenu = isSubmenuTrigger
        ? event.key === submenuOpenKey
        : (event.key === 'ArrowDown' || event.key === 'ArrowUp');
      if (opensClosedMenu) {
        const triggerFocusables = this.triggerRef
          ? getFocusableElementsDeep(this.triggerRef, 'button, a, [role="button"], [tabindex]:not([tabindex="-1"])')
          : [];
        const isTriggerFocused = triggerFocusables.some(el => el === getDeepActiveElement());
        if (isTriggerFocused && !this.isDisabled) {
          event.preventDefault();
          this.openedViaKeyboard = true;
          this.openedViaArrowKey = true;
          // ArrowUp → focus last item; ArrowDown → focus first item. (Submenu's
          // single open key always focuses the first item — never matches 'ArrowUp'.)
          // Set the flag BEFORE setting isOpen so setupFocusTrap picks it up.
          this.openFocusLast = event.key === 'ArrowUp';
          this.isOpen = true;
        }
      }
      return;
    }
    if (event.key === 'Tab') {
      if (this.tabBehavior === 'disclosure') {
        // APG Disclosure Navigation Hybrid: Tab moves through open menu items;
        // Tab off the last item closes the menu and moves to the next nav element.
        const isShift = event.shiftKey;
        const focusedEl = document.activeElement as HTMLElement;
        const isFocusInMenu = !!(this.dropdownRef?.contains(focusedEl));
        const isFocusOnTrigger = !!(this.triggerRef?.contains(focusedEl));

        if (isFocusInMenu) {
          if (this.focusableElements.length === 0 && this.dropdownRef) {
            this.focusableElements = this.getOwnFocusableElements();
          }
          const idx = this.focusableElements.indexOf(focusedEl);

          if (!isShift) {
            if (idx >= 0 && idx < this.focusableElements.length - 1) {
              event.preventDefault();
              this.currentFocusIndex = idx + 1;
              this.focusableElements[this.currentFocusIndex].focus();
            } else {
              // Last item — close menu, move to next focusable after trigger
              event.preventDefault();
              const nextEl = this.getNextFocusableAfterTrigger();
              this.isOpen = false;
              if (nextEl) {
                setTimeout(() => nextEl.focus(), 0);
              }
            }
          } else {
            if (idx > 0) {
              event.preventDefault();
              this.currentFocusIndex = idx - 1;
              this.focusableElements[this.currentFocusIndex].focus();
            } else {
              // First item — Shift+Tab: close menu, focus returns to trigger
              event.preventDefault();
              this.isOpen = false;
            }
          }
          return;
        }

        if (isFocusOnTrigger && !isShift) {
          // Tab forward from trigger into open menu
          if (this.focusableElements.length === 0 && this.dropdownRef) {
            this.focusableElements = this.getOwnFocusableElements();
          }
          if (this.focusableElements.length > 0) {
            event.preventDefault();
            this.currentFocusIndex = 0;
            this.focusableElements[0].focus();
            return;
          }
        }
      }

      // Default (menu-button pattern): trap Tab/Shift+Tab inside the open menu,
      // cycling with wraparound exactly like ArrowDown/ArrowUp — the same "trapped
      // focus" behavior aegov-popover already uses for its own Tab handling.
      // Previously this just closed the menu and left the browser to move focus
      // "naturally," but the menu content lives in a document.body portal — the
      // currently-focused item gets unmounted (returnPortalContent) as part of the
      // same isOpen=false update, before any native Tab default can run, so the
      // browser had nothing sensible to tab to and jumped to the very first
      // focusable element in the whole document instead of anywhere near the trigger.
      const tabFocusedEl = document.activeElement as HTMLElement;
      const isTabFocusInMenu = !!(this.dropdownRef?.contains(tabFocusedEl));
      const isTabFocusOnTrigger = !!(this.triggerRef?.contains(tabFocusedEl));

      if (isTabFocusInMenu) {
        event.preventDefault();
        this.focusNextElement(event.shiftKey);
        return;
      }
      if (isTabFocusOnTrigger && !event.shiftKey) {
        event.preventDefault();
        if (this.focusableElements.length === 0 && this.dropdownRef) {
          this.focusableElements = this.getOwnFocusableElements();
        }
        if (this.focusableElements.length > 0) {
          this.currentFocusIndex = 0;
          this.focusableElements[0].focus();
        }
        return;
      }

      // Focus is neither on the trigger nor inside the menu — shouldn't normally
      // happen while open, but close rather than leave a stale trapped state.
      this.isOpen = false;
      return;
    }

    // Home/End navigation within open menu (APG Menu Button pattern)
    if (event.key === 'Home' || event.key === 'End') {
      const focusedEl = document.activeElement as HTMLElement;
      if (this.dropdownRef?.contains(focusedEl) && this.focusableElements.length > 0) {
        event.preventDefault();
        if (event.key === 'Home') {
          this.currentFocusIndex = 0;
          this.focusableElements[0].focus();
        } else {
          this.currentFocusIndex = this.focusableElements.length - 1;
          this.focusableElements[this.currentFocusIndex].focus();
        }
        return;
      }
    }

    // Type-ahead: single printable character navigates to the next item whose
    // label prefix matches the accumulated buffer (500ms reset between keystrokes)
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const focusedEl = document.activeElement as HTMLElement;
      if (this.dropdownRef?.contains(focusedEl)) {
        event.preventDefault();
        this.handleTypeahead(event.key);
        return;
      }
    }

    // Arrow keys when dropdown is open and focus is on the trigger (not inside the menu).
    // This happens when the dropdown was opened by mouse and the user then uses keyboard.
    // ArrowDown → first item, ArrowUp → last item (mirrors the closed-state open behavior).
    // Submenu: ArrowRight (ArrowLeft in RTL) moves focus into the already-open menu.
    const entersOpenMenu = isSubmenuTrigger
      ? event.key === submenuOpenKey
      : (event.key === 'ArrowDown' || event.key === 'ArrowUp');
    if (entersOpenMenu) {
      const triggerFocusables = this.triggerRef
        ? getFocusableElementsDeep(this.triggerRef, 'button, a, [role="button"], [tabindex]:not([tabindex="-1"])')
        : [];
      const isTriggerFocused = triggerFocusables.some(el => el === getDeepActiveElement());
      if (isTriggerFocused) {
        event.preventDefault();
        if (this.focusableElements.length === 0 && this.dropdownRef) {
          this.focusableElements = this.getOwnFocusableElements();
        }
        if (this.focusableElements.length > 0) {
          this.currentFocusIndex = event.key === 'ArrowUp' ? this.focusableElements.length - 1 : 0;
          this.focusableElements[this.currentFocusIndex].focus();
        }
        return;
      }
    }

    // APG submenu: ArrowLeft (ArrowRight in RTL) closes an open submenu and
    // returns focus to its own trigger — the same action Escape already
    // performs, just reachable without leaving the keyboard's arrow cluster.
    if (isSubmenuTrigger && event.key === submenuCloseKey) {
      const focusedEl = document.activeElement as HTMLElement;
      if (this.dropdownRef?.contains(focusedEl)) {
        event.preventDefault();
        this.isOpen = false;
        return;
      }
    }

    // Disclosure mode: don't intercept arrow keys when focus is inside the panel.
    // Screen readers use arrow keys for their virtual reading cursor on plain links —
    // intercepting them here would break AT navigation. Escape still reaches keyHandler.
    if (this.tabBehavior === 'disclosure') {
      const focusedEl = document.activeElement as HTMLElement;
      if (this.dropdownRef?.contains(focusedEl) &&
          (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
        return;
      }
    }

    // Escape/Tab/ArrowDown/ArrowUp funnel through keyHandler below, which has no
    // per-instance awareness — a nested dropdown and its parent are both isOpen
    // at the same time (opening a nested dropdown deliberately doesn't close its
    // parent), and both independently listen for keydown at the document level.
    // Without this check, every open dropdown on the page reacts to the same
    // keypress: Escape would close all of them at once (confirmed: focus was
    // thrown all the way back to the outermost trigger instead of just the
    // innermost one), and arrow keys would silently mutate every ancestor's own
    // currentFocusIndex even though only the innermost one's focus change is
    // visible (whichever instance's .focus() call happens to run last wins).
    const activeEl = getDeepActiveElement() as HTMLElement | null;
    const isFocusWithinThisInstance = !!(this.dropdownRef?.contains(activeEl) || this.triggerRef?.contains(activeEl));
    if (!isFocusWithinThisInstance) return;

    this.keyHandler(event);
  }

  /**
   * Returns the next focusable element in document tab order after the trigger
   * (chevron / trigger button). Portal elements are excluded from the search
   * because they are not in the natural tab order.
   */
  private getNextFocusableAfterTrigger(): HTMLElement | null {
    const allFocusable = Array.from(
      document.querySelectorAll<HTMLElement>(
        'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), ' +
        'input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), ' +
        'textarea:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => !el.closest('.aegov-dropdown-portal'));

    if (!this.triggerElement) return null;
    const idx = allFocusable.indexOf(this.triggerElement);
    if (idx < 0) return null;
    return allFocusable[idx + 1] ?? null;
  }

  /**
   * Elements that live inside a NESTED <aegov-dropdown>'s own menu content
   * don't belong to this dropdown's own navigable item sequence — they're one
   * level deeper and only relevant once that nested instance is open on its
   * own terms. A plain querySelectorAll (what getFocusableElements does) has
   * no concept of that boundary: it finds a nested dropdown's menu items too,
   * even while that nested dropdown is closed, which corrupts this instance's
   * own currentFocusIndex-based navigation (wrong count, wrong neighbours —
   * Tab/ArrowDown/Up would silently "enter" a closed submenu instead of
   * moving to the next item at this level).
   *
   * A nested dropdown's own TRIGGER (its default-slotted content, always
   * rendered inside its own .aegov-dropdown-trigger wrapper div) is the
   * opposite — it IS a normal item at this level, representing that nested
   * dropdown's position in the list, and must stay included.
   *
   * Distinguishing the two via each candidate's closest <aegov-dropdown>
   * ancestor and whether that ancestor's own trigger wrapper contains it is
   * reliable regardless of open/closed state or render order (unlike relying
   * on the dropdown-content slot's `slot` attribute, which gets stripped the
   * moment a nested instance's own portal render runs). Recurses correctly to
   * any nesting depth, since each level only ever checks its own nearest
   * nested ancestor.
   */
  private getOwnFocusableElements(): HTMLElement[] {
    if (!this.dropdownRef) return [];
    return getFocusableElements(this.dropdownRef, FOCUSABLE_SELECTORS).filter(el => {
      const nestedHost = el.closest('aegov-dropdown');
      if (!nestedHost) return true;
      const triggerWrapper = nestedHost.querySelector(':scope > .aegov-dropdown-trigger');
      return !!(triggerWrapper && triggerWrapper.contains(el));
    });
  }

  private setupFocusTrap(moveFocus: boolean = true, focusLast: boolean = false) {
    if (!this.dropdownRef) return;

    this.focusableElements = this.getOwnFocusableElements();

    if (this.focusableElements.length > 0) {
      if (focusLast) {
        this.currentFocusIndex = this.focusableElements.length - 1;
      } else {
        this.currentFocusIndex = 0;
      }
      if (moveFocus) {
        this.focusableElements[this.currentFocusIndex].focus();
      }
    }
  }

  private focusNextElement(reverse: boolean = false) {
    this.currentFocusIndex = cycleFocus(this.focusableElements, this.currentFocusIndex, reverse);
  }

  private handleTypeahead(char: string) {
    this.typeaheadBuffer += char.toLowerCase();
    if (this.typeaheadTimer) clearTimeout(this.typeaheadTimer);
    this.typeaheadTimer = setTimeout(() => { this.typeaheadBuffer = ''; }, 500);
    if (this.focusableElements.length === 0 && this.dropdownRef) {
      this.focusableElements = this.getOwnFocusableElements();
    }
    const items = this.focusableElements;
    for (let i = 1; i <= items.length; i++) {
      const idx = (this.currentFocusIndex + i) % items.length;
      if ((items[idx].textContent?.trim() ?? '').toLowerCase().startsWith(this.typeaheadBuffer)) {
        this.currentFocusIndex = idx;
        items[idx].focus();
        return;
      }
    }
  }

  private renderPortalContent() {
    if (!this.portalElement || !this.hasContentSlot) return;

    // The portal is appended directly to document.body, outside the host's own
    // ancestor chain — so it never inherits dir="rtl" from a local wrapper the
    // way the (non-portaled) host does. Set it explicitly, fresh on every
    // render, so a nested dropdown's own isRtl(this.el) check (which walks its
    // CURRENT ancestor chain, i.e. this portal once its parent is open) resolves
    // correctly, and so CSS direction-dependent layout resolves correctly too
    // (same fix as aegov-datepicker's portal, #37).
    this.portalElement.setAttribute('dir', isRtl(this.el) ? 'rtl' : 'ltr');

    // Get content slot element
    const contentSlot = this.el.querySelector('[slot="dropdown-content"]') as HTMLElement;
    if (!contentSlot) return;

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
    dropdownContainer.setAttribute('data-state', 'open');

    // Menu Button pattern: role="menu" with accessible name + role="menuitem" on items.
    // Disclosure pattern: no menu semantics — items remain plain links/buttons.
    const isMenuPattern = this.tabBehavior !== 'disclosure';
    if (isMenuPattern) {
      dropdownContainer.setAttribute('role', 'menu');
      dropdownContainer.setAttribute('aria-labelledby', this.triggerId);
    }

    // Move the original element into the portal (not clone).
    // Cloning causes Stencil web components to double-render because
    // the clone captures already-hydrated DOM that Stencil re-initialises.
    contentSlot.removeAttribute('slot');
    dropdownContainer.appendChild(contentSlot);

    // Ensure focusable children have role="menuitem" for screen readers (menu pattern only)
    if (isMenuPattern) {
      const focusable = dropdownContainer.querySelectorAll('button, a, [tabindex]');
      focusable.forEach(el => {
        if (!el.getAttribute('role')) {
          el.setAttribute('role', 'menuitem');
        }
      });
    }

    // Add event listeners
    dropdownContainer.addEventListener('mouseenter', this.handleDropdownMouseEnter);
    dropdownContainer.addEventListener('mouseleave', this.handleDropdownMouseLeave);
    dropdownContainer.addEventListener('click', this.handleMenuItemClick);

    // Append to portal
    this.portalElement.appendChild(dropdownContainer);

    // Store reference
    this.dropdownRef = dropdownContainer;
  }

  /**
   * Moves the content slot element back into the host's hidden wrapper
   * so it is available for the next open cycle.
   */
  private returnPortalContent() {
    if (!this.contentSlotRef || !this.slotWrapperRef) return;

    // Restore the slot attribute so the element is recognised by the named slot
    this.contentSlotRef.setAttribute('slot', 'dropdown-content');
    this.slotWrapperRef.appendChild(this.contentSlotRef);
    this.contentSlotRef = undefined;
  }

  render() {
    const hasContent = this.hasContentSlot;
    const passThroughAttributes = getPassThroughAttributes(this.el);

    return (
      <Host>
        <div
          {...passThroughAttributes}
          class={{
            'aegov-dropdown-trigger': true,
          }}
          id={this.triggerId}
          ref={(el) => (this.triggerRef = el)}
          onMouseEnter={this.handleTriggerMouseEnter}
          onMouseLeave={this.handleTriggerMouseLeave}
          onClick={this.handleTriggerClick}
        >
          <slot />
        </div>

        {/* Content slot is hidden — the element is moved to the portal on open, back here on close */}
        {hasContent && (
          <div style={{ display: 'none' }} ref={(el) => (this.slotWrapperRef = el)}>
            <slot name="dropdown-content" />
          </div>
        )}
      </Host>
    );
  }
}
