import { Component, Host, h, Prop, Event, EventEmitter, Element, Method, Watch, State } from '@stencil/core';
import { DRAWER_POSITIONS, DRAWER_ANIMATIONS, DRAWER_OVERLAY_OPACITIES, DRAWER_SIZES } from '../../utils/types';
import type { DrawerPosition, DrawerAnimation, DrawerOverlayOpacity, DrawerSize } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { getSlottedFocusableElements, handleTabKeyWrap } from '../../utils/focus-management';
import { lockBodyScroll, unlockBodyScroll } from '../../utils/scroll-lock';
import { pushZIndex, popZIndex } from '../../utils/z-index-manager';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { generateId } from '../../utils/id-generator';

const TAG = 'aegov-drawer';
const ctx = (prop: string) => ({ component: TAG, prop });

/**
 * @slot - Drawer content
 */
@Component({
  tag: 'aegov-drawer',
  styleUrl: 'aegov-drawer.css',
  shadow: true,
})
export class AegovDrawer {
  @Element() el: HTMLElement;

  private triggerElement: HTMLElement | null = null;
  private focusableElements: HTMLElement[] = [];
  private drawerZIndex: number = 50;
  private movedToBody: boolean = false;

  /**
   * Unique ID for the drawer dialog element. Auto-generated if not provided.
   */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /**
   * Whether the drawer is currently open/visible
   */
  @Prop({ mutable: true, reflect: true }) isOpen: boolean = false;

  /**
   * Which edge the drawer slides from
   * @default 'right'
   */
  @Prop() position: DrawerPosition = 'right';

  /**
   * Animation strategy for open/close transitions
   * @default 'slide'
   */
  @Prop() animation: DrawerAnimation = 'slide';

  /**
   * Whether the drawer is pinned flush to edges (true) or has a gap with rounded corners (false)
   * @default true
   */
  @Prop() isPinned: boolean = true;

  /**
   * Whether to show a backdrop overlay behind the drawer
   * @default true
   */
  @Prop() isOverlay: boolean = true;

  /**
   * Backdrop overlay opacity level
   * @default 'base'
   */
  @Prop() overlayOpacity: DrawerOverlayOpacity = 'base';

  /**
   * Whether clicking the backdrop closes the drawer
   * @default true
   */
  @Prop() isCloseWithOverlay: boolean = true;

  /**
   * Whether to prevent body scroll when drawer is open
   * @default true
   */
  @Prop() isPreventScroll: boolean = true;

  /**
   * Whether the drawer relocates itself to `document.body` on connect, so it
   * stacks above the rest of the page.
   *
   * Set to `false` when the drawer is rendered inside another component's
   * shadow DOM and forwards a `<slot>` into its content: relocating would take
   * that slot out of its shadow tree, where it projects nothing. The panel and
   * backdrop are `position: fixed`, so they still cover the viewport in place —
   * unless an ancestor creates a containing block (`transform`, `filter`,
   * `contain`, `will-change`), in which case leave this on.
   * @default true
   */
  @Prop() isPortal: boolean = true;

  /**
   * Panel width for left/right drawers, or panel height for top/bottom drawers.
   * xs=320px · sm=384px · base=480px (default) · lg=640px · xl=800px · full=100vw/100dvh.
   * Also scales padding and, when `is-pinned="false"`, the edge gap and border-radius.
   * On viewports narrower than 640px all left/right sizes collapse to full width.
   * @default 'base'
   */
  @Prop() size: DrawerSize = 'base';

  /**
   * Whether to apply inner content padding. On by default; scales with size.
   * @default true
   */
  @Prop() isPadding: boolean = true;

  /**
   * Accessible label for the dialog. Passed as `aria-label` on the dialog element.
   * Required for screen readers unless you pass `aria-labelledby` pointing to a
   * heading rendered inside the drawer's slot.
   */
  @Prop() label?: string;

  // Note: aria-labelledby / aria-describedby can also be passed as host attributes
  // and are forwarded automatically via getPassThroughAttributes()

  /**
   * @internal State to manage animation
   */
  @State() animationState: 'closed' | 'opening' | 'open' | 'closing' = 'closed';

  /**
   * Emitted when drawer is opened
   */
  @Event() aegovDrawerOpen: EventEmitter<void>;

  /**
   * Emitted when drawer is closed
   */
  @Event() aegovDrawerClose: EventEmitter<void>;

  /**
   * Emitted before the drawer closes. Cancel by calling `preventDefault()` on the
   * event itself — matching `aegovModalBeforeClose`.
   */
  @Event({ cancelable: true }) aegovDrawerBeforeClose: EventEmitter<void>;

  /**
   * Emitted when backdrop is clicked
   */
  @Event() aegovDrawerBackdropClick: EventEmitter<MouseEvent>;

  /**
   * Emitted when ESC key is pressed
   */
  @Event() aegovDrawerEscapePress: EventEmitter<KeyboardEvent>;

  /**
   * Programmatically open the drawer
   */
  @Method()
  async show(): Promise<void> {
    this.isOpen = true;
  }

  /**
   * Programmatically close the drawer
   */
  @Method()
  async close(): Promise<void> {
    this.handleClose();
  }

  /**
   * Toggle drawer open/closed state
   */
  @Method()
  async toggle(): Promise<void> {
    this.isOpen = !this.isOpen;
  }

  @Watch('isOpen')
  handleOpenChange(newValue: boolean, oldValue: boolean) {
    if (newValue && !oldValue) {
      this.handleOpen();
    } else if (!newValue && oldValue) {
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
    if (!this.label && !this.el.getAttribute('aria-labelledby')) {
      console.warn('[aegov-drawer] Dialog has no accessible name. Provide a label prop.');
    }
  }

  @Watch('position')
  onPositionChange(v: unknown) { warnIfInvalidEnumProp(v, DRAWER_POSITIONS, 'right', ctx('position')); }

  @Watch('animation')
  onAnimationChange(v: unknown) { warnIfInvalidEnumProp(v, DRAWER_ANIMATIONS, 'slide', ctx('animation')); }

  @Watch('overlayOpacity')
  onOverlayOpacityChange(v: unknown) { warnIfInvalidEnumProp(v, DRAWER_OVERLAY_OPACITIES, 'base', ctx('overlayOpacity')); }

  @Watch('size')
  onSizeChange(v: unknown) { warnIfInvalidEnumProp(v, DRAWER_SIZES, 'base', ctx('size')); }

  connectedCallback() {
    // Move drawer to body for proper stacking. Guarded by movedToBody to
    // avoid re-entrant hydration loops: appendChild triggers a synchronous
    // disconnect/reconnect pair and Stencil's lazy hydration can fire
    // connectedCallback again before parent state stabilises.
    if (this.isPortal && !this.movedToBody && this.el.parentNode !== document.body) {
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

  private getAnimationDuration(): number {
    if (this.animation === 'none') return 0;
    return 300;
  }

  private handleOpen() {
    // Store the currently focused element
    this.triggerElement = document.activeElement as HTMLElement;

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

  private handleClose() {
    // Emit cancellable before-close event; consumer calls event.preventDefault() to cancel
    const beforeClose = this.aegovDrawerBeforeClose.emit();
    if (beforeClose.defaultPrevented) {
      return;
    }

    this.isOpen = false;
  }

  /**
   * Animate the closing transition then clean up.
   * Called from @Watch('open') so ALL close paths (close(), toggle(), open=false) animate.
   */
  private handleCloseAnimation() {
    this.animationState = 'closing';

    const duration = this.getAnimationDuration();
    setTimeout(() => {
      this.handleCloseComplete();
    }, duration);
  }

  private handleCloseComplete() {
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

  private handleBackdropClick = (event: MouseEvent) => {
    this.aegovDrawerBackdropClick.emit(event);

    if (event.target === event.currentTarget && this.isCloseWithOverlay) {
      this.handleClose();
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.aegovDrawerEscapePress.emit(event);
      // Escape must always close per SC 2.1.2 — bypass the cancellable beforeClose event
      this.isOpen = false;
    } else if (event.key === 'Tab') {
      this.handleTabKey(event);
    }
  };

  private setupFocusTrap() {
    const shadowRoot = this.el.shadowRoot;
    if (!shadowRoot) return;

    this.focusableElements = getSlottedFocusableElements(shadowRoot);

    if (this.focusableElements.length > 0) {
      this.focusableElements[0].focus();
    } else {
      // Fallback: focus the dialog container itself so AT announces it
      const dialogEl = shadowRoot.querySelector<HTMLElement>('[role="dialog"]');
      dialogEl?.focus();
    }
  }

  private handleTabKey(event: KeyboardEvent) {
    handleTabKeyWrap(event, this.focusableElements);
  }

  private getOverlayOpacityClass(): string {
    const overlayOpacity: DrawerOverlayOpacity = (DRAWER_OVERLAY_OPACITIES as readonly string[]).includes(this.overlayOpacity) ? this.overlayOpacity : 'base';
    const opacityClasses: Record<DrawerOverlayOpacity, string> = {
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
    const position: DrawerPosition = (DRAWER_POSITIONS as readonly string[]).includes(this.position) ? this.position : 'right';
    const size: DrawerSize = (DRAWER_SIZES as readonly string[]).includes(this.size) ? this.size : 'base';
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

    return (
      <Host data-state={this.animationState} style={{ '--drawer-z-index': this.drawerZIndex.toString() }}>
        {this.isOverlay && (
          <div
            class={`aegov-drawer-backdrop ${this.getOverlayOpacityClass()}`}
            data-state={this.animationState}
            data-animation={this.animation}
            onClick={this.handleBackdropClick}
          ></div>
        )}
        {!this.isOverlay && this.isCloseWithOverlay && (
          <div
            class="aegov-drawer-backdrop-invisible"
            onClick={this.handleBackdropClick}
          ></div>
        )}
        <div
          {...passThroughAttributes}
          id={this.fieldId}
          class={containerClasses}
          data-state={this.animationState}
          data-animation={this.animation}
          role="dialog"
          aria-modal="true"
          aria-label={this.label || undefined}
          tabindex={-1}
        >
          <div class={contentClasses}>
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
