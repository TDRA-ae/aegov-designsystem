import { Component, Host, h, Prop, Event, EventEmitter, Element, Method, Watch, State } from '@stencil/core';
import type { DrawerPosition, DrawerAnimation, DrawerOverlayOpacity } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { getSlottedFocusableElements, handleTabKeyWrap } from '../../utils/focus-management';
import { lockBodyScroll, unlockBodyScroll } from '../../utils/scroll-lock';
import { pushZIndex, popZIndex } from '../../utils/z-index-manager';

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

  /**
   * Whether the drawer is currently open/visible
   */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

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
  @Prop() pinned: boolean = true;

  /**
   * Whether to show a backdrop overlay behind the drawer
   * @default true
   */
  @Prop() overlay: boolean = true;

  /**
   * Backdrop overlay opacity level
   * @default 'base'
   */
  @Prop() overlayOpacity: DrawerOverlayOpacity = 'base';

  /**
   * Whether clicking the backdrop closes the drawer
   * @default true
   */
  @Prop() closeWithBackdrop: boolean = true;

  /**
   * Whether to prevent body scroll when drawer is open
   * @default true
   */
  @Prop() preventBodyScroll: boolean = true;

  // Note: ARIA attributes (aria-label, aria-labelledby, aria-describedby)
  // are passed through automatically via getPassThroughAttributes()

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
   * Emitted before drawer closes (cancellable)
   */
  @Event() aegovDrawerBeforeClose: EventEmitter<{ preventDefault: () => void }>;

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
    this.open = true;
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
    this.open = !this.open;
  }

  @Watch('open')
  handleOpenChange(newValue: boolean, oldValue: boolean) {
    if (newValue && !oldValue) {
      this.handleOpen();
    } else if (!newValue && oldValue) {
      this.handleCloseAnimation();
    }
  }

  connectedCallback() {
    // Move drawer to body for proper stacking
    if (this.el.parentNode !== document.body) {
      document.body.appendChild(this.el);
    }
  }

  disconnectedCallback() {
    if (this.preventBodyScroll && this.open) {
      unlockBodyScroll();
    }
    if (this.el.parentNode === document.body) {
      document.body.removeChild(this.el);
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
    if (this.preventBodyScroll) {
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

    this.open = false;
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
    if (this.preventBodyScroll) {
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

    if (event.target === event.currentTarget && this.closeWithBackdrop) {
      this.handleClose();
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.aegovDrawerEscapePress.emit(event);
      this.handleClose();
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
    }
  }

  private handleTabKey(event: KeyboardEvent) {
    handleTabKeyWrap(event, this.focusableElements);
  }

  private getOverlayOpacityClass(): string {
    const opacityClasses: Record<DrawerOverlayOpacity, string> = {
      light: 'drawer-backdrop--light',
      base: 'drawer-backdrop--base',
      dark: 'drawer-backdrop--dark',
    };
    return opacityClasses[this.overlayOpacity];
  }

  private static readonly PASS_THROUGH_ATTRS = new Set(['id']);

  render() {
    if (!this.open && this.animationState === 'closed') {
      return null;
    }

    const passThroughAttributes = getPassThroughAttributes(this.el, AegovDrawer.PASS_THROUGH_ATTRS);
    const containerClasses = [
      'aegov-drawer-container',
      `drawer-container--${this.position}`,
      !this.pinned ? 'drawer-container--unpinned' : '',
    ].filter(Boolean).join(' ');

    return (
      <Host data-state={this.animationState} style={{ '--drawer-z-index': this.drawerZIndex.toString() }}>
        {this.overlay && (
          <div
            class={`aegov-drawer-backdrop ${this.getOverlayOpacityClass()}`}
            data-state={this.animationState}
            data-animation={this.animation}
            onClick={this.handleBackdropClick}
          ></div>
        )}
        {!this.overlay && this.closeWithBackdrop && (
          <div
            class="aegov-drawer-backdrop-invisible"
            onClick={this.handleBackdropClick}
          ></div>
        )}
        <div
          class={containerClasses}
          data-state={this.animationState}
          data-animation={this.animation}
          role="dialog"
          aria-modal="true"
          {...passThroughAttributes}
        >
          <div class="aegov-drawer-content">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
