import { Build, Component, Host, h, Prop, Event, EventEmitter, Element, Method, Watch, State } from '@stencil/core';
import { DRAWER_POSITIONS, DRAWER_ANIMATIONS, DRAWER_OVERLAY_OPACITIES, DRAWER_SIZES } from '../../utils/types';
import type { DrawerPosition, DrawerAnimation, DrawerOverlayOpacity, DrawerSize } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { getSlottedFocusableElements, handleTabKeyWrap, resolveFocusTarget } from '../../utils/focus-management';
import { lockBodyScroll, unlockBodyScroll } from '../../utils/scroll-lock';
import { pushZIndex, popZIndex } from '../../utils/z-index-manager';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { generateId } from '../../utils/id-generator';
import { forgetRelocatedHost, relocateHostToBody, restoreHostFromBody } from '../../utils/portal-manager';

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
  // True only while this component itself is moving its host to/from
  // document.body (see moveHost()); the synchronous disconnect/connect pair
  // that move fires is not a removal by the owner.
  private relocating: boolean = false;
  private didLoad: boolean = false;
  private overlayResourcesHeld: boolean = false;

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
   * Whether the drawer relocates itself to `document.body` while open, so it
   * stacks above the rest of the page. (It returns to where it was declared
   * when it closes, and leaves with its declared parent if that is removed.)
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
    if (!this.label && !this.el.getAttribute('aria-labelledby') && !this.el.getAttribute('aria-label')) {
      console.warn('[aegov-drawer] Dialog has no accessible name. Provide a label prop.');
    }
  }

  componentDidLoad() {
    // @Watch('isOpen') only fires on a SUBSEQUENT change, never for the prop's
    // initial value — so a drawer declared with is-open="true" from the start
    // (every documented example uses this pattern) would otherwise never run
    // handleOpen(): no scroll lock, no focus trap, and no Escape-key listener
    // (only ever attached inside handleOpen()), leaving it visible but
    // completely inert to the keyboard and unable to be dismissed.
    this.didLoad = true;
    if (this.isOpen) {
      this.handleOpen();
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
    if (this.relocating) return;
    // Re-inserted by its owner while still open (e.g. Vue <KeepAlive>
    // re-activation): the disconnect released the scroll lock / z-index /
    // Escape listener, so open again. Deferred so no DOM move happens from
    // inside this callback.
    if (this.didLoad && this.isOpen && !this.overlayResourcesHeld) {
      Promise.resolve().then(() => {
        if (this.el.isConnected && this.isOpen && !this.overlayResourcesHeld) this.handleOpen();
      });
    }
  }

  disconnectedCallback() {
    // A move, not a removal: our own move to/from document.body (or any other
    // move — when the callback runs the element is already connected again).
    // Releasing the scroll lock / z-index / Escape listener here would leave an
    // open overlay visible but inert.
    if (this.relocating || this.el.isConnected) return;
    // Note: never move or remove this.el from in here (nor from
    // connectedCallback) — doing that inside the callbacks is what caused the
    // old "Maximum call stack size exceeded" loop under Stencil's shadow-DOM
    // hydration. The body move happens in handleOpen()/handleCloseComplete().
    //
    // Covers a framework removing the element entirely while still open,
    // without ever calling close()/handleCloseComplete() — otherwise the
    // z-index stack leaks (popZIndex() never called to match the earlier
    // pushZIndex()) and every subsequently-opened overlay stacks one
    // increment higher than it should, forever.
    //
    // Guarded on overlayResourcesHeld, not this.isOpen: a declaratively
    // `is-open="true"` drawer can be disconnected before handleOpen() has ever
    // run — at that moment isOpen is already true but no lock/z-index was
    // ever acquired. A naive `if (this.isOpen)` guard would then call
    // unlockBodyScroll() for a lock this instance never took, decrementing the
    // shared ref-counted lock and potentially releasing scroll out from under
    // some OTHER genuinely-open overlay.
    if (this.overlayResourcesHeld) {
      this.overlayResourcesHeld = false;
      if (this.isPreventScroll) {
        unlockBodyScroll();
      }
      popZIndex();
    }
    document.removeEventListener('keydown', this.handleKeyDown);
    // Removed by its owner while relocated to body (e.g. `host.remove()`):
    // drop the placeholder left at the declared position.
    forgetRelocatedHost(this.el);
  }

  /**
   * Move the host to document.body while open (when isPortal), or back to
   * where it was declared on close (see relocateHostToBody in
   * utils/portal-manager). Moving only while open keeps a closed drawer where
   * its owner put it, so frameworks and SSR hydration find their node, and
   * removing an ancestor removes the drawer with it instead of orphaning it.
   */
  private moveHost(toBody: boolean) {
    // Never during server-side rendering (hydrate); spec tests also report isServer.
    if (Build.isServer && !Build.isTesting) return;
    if (toBody && !this.isPortal) return;
    this.relocating = true;
    try {
      if (toBody) relocateHostToBody(this.el);
      else restoreHostFromBody(this.el);
    } finally {
      this.relocating = false;
    }
  }

  private getAnimationDuration(): number {
    if (this.animation === 'none') return 0;
    return 300;
  }

  private handleOpen() {
    // Store the currently focused element
    this.triggerElement = document.activeElement as HTMLElement;

    // Portal to body for stacking (unless isPortal is off).
    this.moveHost(true);

    // Assign z-index for this drawer
    this.drawerZIndex = pushZIndex();
    this.overlayResourcesHeld = true;

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
    // Release the overlay stack slot and scroll lock — only if still held: a
    // disconnect while open/closing has already released them.
    if (this.overlayResourcesHeld) {
      this.overlayResourcesHeld = false;
      popZIndex();
      // Unlock body scroll (ref-counted, only unlocks when last overlay closes)
      if (this.isPreventScroll) {
        unlockBodyScroll();
      }
    }

    // Remove keyboard listener
    document.removeEventListener('keydown', this.handleKeyDown);

    // Return the host to where it was declared — unless it was reopened during
    // the close animation, in which case it must stay in body.
    if (!this.isOpen) this.moveHost(false);

    // Return focus to trigger element. resolveFocusTarget handles a shadow-DOM
    // trigger whose host isn't itself focusable — .focus() on it directly would
    // otherwise silently no-op, dropping focus to <body> (see #66).
    if (this.triggerElement && typeof this.triggerElement.focus === 'function') {
      resolveFocusTarget(this.triggerElement).focus();
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
    // passThroughAttributes already collected from a raw host aria-label
    // attribute — a literal `aria-label={undefined}` in the JSX below would
    // silently overwrite it. Merge once, before the JSX, instead.
    const dialogAriaLabel = this.label || passThroughAttributes['aria-label'];
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
          aria-label={dialogAriaLabel}
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
