import { Build, Component, Host, h, Prop, Event, EventEmitter, Element, Method, Watch, State } from '@stencil/core';
import { MODAL_POSITIONS, MODAL_OVERLAY_OPACITIES, MODAL_SIZES } from '../../utils/types';
import type { ModalPosition, ModalOverlayOpacity, ModalSize } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { getSlottedFocusableElements, handleTabKeyWrap, resolveFocusTarget } from '../../utils/focus-management';
import { lockBodyScroll, unlockBodyScroll } from '../../utils/scroll-lock';
import { pushZIndex, popZIndex } from '../../utils/z-index-manager';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { generateId } from '../../utils/id-generator';
import { isRtl } from '../../utils/rtl';
import { forgetRelocatedHost, relocateHostToBody, restoreHostFromBody } from '../../utils/portal-manager';

const TAG = 'aegov-modal';
const ctx = (prop: string) => ({ component: TAG, prop });

/**
 * @slot - Modal content
 */
@Component({
  tag: 'aegov-modal',
  styleUrl: 'aegov-modal.css',
  shadow: true,
})
export class AegovModal {
  @Element() el: HTMLElement;

  private triggerElement: HTMLElement | null = null;
  private focusableElements: HTMLElement[] = [];
  private modalZIndex: number = 50;
  // True only while this component itself is moving its host to/from
  // document.body (see moveHost()). Those moves fire a synchronous
  // disconnect/connect pair that must not be mistaken for the owner removing
  // or re-inserting the element.
  private relocating: boolean = false;
  private didLoad: boolean = false;
  // The `dir` value this component set on the host while open (null when it
  // set none, e.g. because the author supplied their own `dir`).
  private bakedDir: string | null = null;
  // Tracks whether THIS instance actually holds the shared scroll-lock/z-index
  // resources (i.e. handleOpen() ran and handleCloseComplete() hasn't undone it
  // yet). disconnectedCallback / handleCloseComplete can't just check
  // `this.isOpen`: that would call unlockBodyScroll()/popZIndex() for resources
  // this instance never acquired (or already released), corrupting the shared
  // counters for whatever OTHER overlay is genuinely open at that moment.
  private overlayResourcesHeld: boolean = false;

  /**
   * Unique ID for the modal dialog element. Auto-generated if not provided.
   */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /**
   * Whether the modal is currently open/visible
   */
  @Prop({ mutable: true, reflect: true }) isOpen: boolean = false;

  /**
   * Whether clicking the overlay closes the modal
   * @default true
   */
  @Prop() isCloseWithOverlay: boolean = true;

  /**
   * Whether to prevent body scroll when modal is open
   * @default true
   */
  @Prop() isPreventScroll: boolean = true;

  /**
   * Overlay opacity level
   * @default 'base'
   */
  @Prop() overlayOpacity: ModalOverlayOpacity = 'base';

  /**
   * Position of the modal on screen
   * @default 'center'
   */
  @Prop() position: ModalPosition = 'center';

  /**
  * Size: 'sm' (compact padding/radius), 'base' (default), 'lg' (generous padding/radius), or 'xl' (extra-wide). Mirrors aegov-card sizing tokens.
   * @default 'base'
   */
  @Prop() size: ModalSize = 'base';

  /**
   * Whether to apply inner content padding. On by default; scales with size.
   * @default true
   */
  @Prop() isPadding: boolean = true;

  /**
   * Accessible label for the dialog. Passed as `aria-label` on the dialog element.
   * Required for screen readers unless you pass `aria-labelledby` pointing to a
   * heading rendered inside the modal's slot.
   */
  @Prop() label?: string;

  // Note: aria-labelledby / aria-describedby can also be passed as host attributes
  // and are forwarded automatically via getPassThroughAttributes()

  /**
   * @internal State to manage animation
   */
  @State() animationState: 'closed' | 'opening' | 'open' | 'closing' = 'closed';

  /**
   * Emitted when modal is opened
   */
  @Event() aegovModalOpen: EventEmitter<void>;

  /**
   * Emitted when modal is closed
   */
  @Event() aegovModalClose: EventEmitter<void>;

  /**
   * Emitted before modal closes (cancellable)
   */
  @Event({ cancelable: true }) aegovModalBeforeClose: EventEmitter<void>;

  /**
   * Emitted when backdrop is clicked
   */
  @Event() aegovModalBackdropClick: EventEmitter<MouseEvent>;

  /**
   * Emitted when ESC key is pressed
   */
  @Event() aegovModalEscapePress: EventEmitter<KeyboardEvent>;

  /**
   * Programmatically open the modal
   */
  @Method()
  async show(): Promise<void> {
    this.isOpen = true;
  }

  /**
   * Programmatically close the modal
   */
  @Method()
  async close(): Promise<void> {
    this.handleClose();
  }

  /**
   * Toggle modal open/closed state
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
    if (!this.label && !this.el.getAttribute('aria-labelledby') && !this.el.getAttribute('aria-label')) {
      console.warn('[aegov-modal] Dialog has no accessible name. Provide a label prop.');
    }
  }

  componentDidLoad() {
    // @Watch('isOpen') only fires on a SUBSEQUENT change, never for the prop's
    // initial value — so a modal declared with is-open="true" from the start (the
    // docs' own declarative example) would otherwise never run handleOpen(): no
    // scroll lock, no focus trap, and critically no Escape-key listener (only ever
    // attached inside handleOpen()), leaving it visible but completely inert to
    // the keyboard and unable to be dismissed with Escape.
    this.didLoad = true;
    if (this.isOpen) {
      this.handleOpen();
    }
  }

  @Watch('overlayOpacity')
  onOverlayOpacityChange(v: unknown) { warnIfInvalidEnumProp(v, MODAL_OVERLAY_OPACITIES, 'base', ctx('overlayOpacity')); }

  @Watch('position')
  onPositionChange(v: unknown) { warnIfInvalidEnumProp(v, MODAL_POSITIONS, 'center', ctx('position')); }

  @Watch('size')
  onSizeChange(v: unknown) { warnIfInvalidEnumProp(v, MODAL_SIZES, 'base', ctx('size')); }

  connectedCallback() {
    if (this.relocating) return;
    // Re-inserted by its owner while still open (e.g. Vue <KeepAlive>
    // re-activation, or an app moving the element): the disconnect released the
    // scroll lock / z-index / Escape listener, so open again. Deferred so no DOM
    // move happens from inside this callback.
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
    // Covers a framework removing the element entirely (e.g. React unmounting
    // it) while still open, without ever calling close()/handleCloseComplete() —
    // otherwise the z-index stack leaks (popZIndex() never called to match the
    // earlier pushZIndex()) and every subsequently-opened overlay stacks one
    // increment higher than it should, forever.
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
    this.unbakeDir();
  }

  /**
   * Move the host to document.body while open, or back to where it was
   * declared on close (see relocateHostToBody in utils/portal-manager).
   *
   * Moving only while open — instead of permanently on connect, as before —
   * keeps a closed modal where its owner put it, so React / Angular / Vue /
   * SSR hydration find their node where they expect it, and removing an
   * ancestor removes the modal with it rather than orphaning it in body.
   */
  private moveHost(toBody: boolean) {
    // Never during server-side rendering (hydrate); spec tests also report isServer.
    if (Build.isServer && !Build.isTesting) return;
    this.relocating = true;
    try {
      if (toBody) relocateHostToBody(this.el);
      else restoreHostFromBody(this.el);
    } finally {
      this.relocating = false;
    }
  }

  /**
   * Pin the direction the modal had at its declared position onto the host
   * while it is open (#53): once moved to body it no longer inherits `dir`
   * from a local `<div dir="rtl">` wrapper. Resolved at open time, so a later
   * change of `<html dir>` is picked up on the next open, and removed again on
   * close. An author-supplied `dir` on the host is left alone.
   */
  private bakeDir() {
    if (this.el.hasAttribute('dir')) return;
    this.bakedDir = isRtl(this.el) ? 'rtl' : 'ltr';
    this.el.setAttribute('dir', this.bakedDir);
  }

  private unbakeDir() {
    if (this.bakedDir !== null && this.el.getAttribute('dir') === this.bakedDir) {
      this.el.removeAttribute('dir');
    }
    this.bakedDir = null;
  }

  private handleOpen() {
    // Store the currently focused element
    this.triggerElement = document.activeElement as HTMLElement;

    // Resolve direction at the declared position, then portal to body for stacking.
    this.bakeDir();
    this.moveHost(true);

    // Assign z-index for this modal
    this.modalZIndex = pushZIndex();
    this.overlayResourcesHeld = true;

    // Set animation state
    this.animationState = 'opening';

    // Lock body scroll
    if (this.isPreventScroll) {
      lockBodyScroll();
    }

    // Add keyboard listener
    document.addEventListener('keydown', this.handleKeyDown);

    // Use rAF instead of fixed timeout to allow rendering to complete before trapping focus
    requestAnimationFrame(() => {
      this.setupFocusTrap();
      this.animationState = 'open';
    });

    // Emit open event
    this.aegovModalOpen.emit();
  }

  private handleClose() {
    // Guard against a redundant close() while already closed/closing. Without this,
    // calling close() again (e.g. a consumer defensively "ensuring" it's closed, or a
    // double-click on a close button) would re-run the block below and re-arm
    // animationState = 'closing' with a setTimeout that sets isOpen = false — but
    // isOpen is ALREADY false, so @Watch('isOpen') never fires (no actual value
    // change), handleCloseComplete() never runs, and animationState gets stuck at
    // 'closing' forever. render() only returns null once BOTH !isOpen AND
    // animationState === 'closed', so the dialog would stay rendered in the DOM
    // permanently even though isOpen correctly reports false.
    if (!this.isOpen || this.animationState === 'closing') {
      return;
    }

    // Emit cancellable before-close event; consumer calls event.preventDefault() to cancel
    const beforeClose = this.aegovModalBeforeClose.emit();
    if (beforeClose.defaultPrevented) {
      return;
    }

    // Start closing animation
    this.animationState = 'closing';

    // Wait for animation to complete
    setTimeout(() => {
      this.isOpen = false;
    }, 200);
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

    // Return the host to where it was declared, and drop the pinned direction.
    this.moveHost(false);
    this.unbakeDir();

    // Return focus to trigger element. resolveFocusTarget handles a shadow-DOM
    // trigger whose host isn't itself focusable — .focus() on it directly would
    // otherwise silently no-op, dropping focus to <body> (see #66).
    if (this.triggerElement && typeof this.triggerElement.focus === 'function') {
      resolveFocusTarget(this.triggerElement).focus();
    }

    // Set animation state
    this.animationState = 'closed';

    // Emit close event
    this.aegovModalClose.emit();
  }

  private handleBackdropClick = (event: MouseEvent) => {
    // Emit backdrop click event
    this.aegovModalBackdropClick.emit(event);

    // Only close if clicking directly on overlay, not modal content
    if (event.target === event.currentTarget && this.isCloseWithOverlay) {
      this.handleClose();
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.aegovModalEscapePress.emit(event);
      // Escape must always close per SC 2.1.2 — bypass the cancellable beforeClose event
      this.animationState = 'closing';
      setTimeout(() => {
        this.isOpen = false;
      }, 200);
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

  private getPositionClass(): string {
    const position: ModalPosition = (MODAL_POSITIONS as readonly string[]).includes(this.position) ? this.position : 'center';
    const positionClasses: Record<ModalPosition, string> = {
      center: 'modal-container--center',
      top: 'modal-container--top',
      bottom: 'modal-container--bottom',
    };
    return positionClasses[position];
  }

  private getSizeClass(): string {
    const size: ModalSize = (MODAL_SIZES as readonly string[]).includes(this.size) ? this.size : 'base';
    const sizeClasses: Record<ModalSize, string> = {
      sm: 'modal-size-sm',
      base: 'modal-size-base',
      lg: 'modal-size-lg',
      xl: 'modal-size-xl',
    };
    return sizeClasses[size];
  }

  private getOverlayOpacityClass(): string {
    const overlayOpacity: ModalOverlayOpacity = (MODAL_OVERLAY_OPACITIES as readonly string[]).includes(this.overlayOpacity) ? this.overlayOpacity : 'base';
    const opacityClasses: Record<ModalOverlayOpacity, string> = {
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
    // The `label` prop wins when set; otherwise fall back to whatever
    // passThroughAttributes already collected from a raw host aria-label
    // attribute — a literal `aria-label={undefined}` in the JSX below would
    // otherwise override (erase) that spread value, since it's a later key in
    // the same merged attrs object.
    const dialogAriaLabel = this.label || passThroughAttributes['aria-label'];

    return (
      <Host data-state={this.animationState} style={{ '--modal-z-index': this.modalZIndex.toString() }}>
        <div
          class={`aegov-modal-backdrop ${this.getOverlayOpacityClass()}`}
          data-state={this.animationState}
          onClick={this.handleBackdropClick}
        ></div>
        <div class={`aegov-modal-container ${this.getPositionClass()}`} onClick={this.handleBackdropClick}>
          <div
            {...passThroughAttributes}
            id={this.fieldId}
            class={`aegov-modal-content ${this.getSizeClass()} ${this.isPadding ? 'modal--padded' : ''}`}
            data-state={this.animationState}
            role="dialog"
            aria-modal="true"
            aria-label={dialogAriaLabel}
            tabindex={-1}
          >
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
