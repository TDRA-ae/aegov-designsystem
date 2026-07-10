import { Component, Host, h, Prop, Event, EventEmitter, Element, Method, Watch, State } from '@stencil/core';
import { MODAL_POSITIONS, MODAL_OVERLAY_OPACITIES, MODAL_SIZES } from '../../utils/types';
import type { ModalPosition, ModalOverlayOpacity, ModalSize } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { getSlottedFocusableElements, handleTabKeyWrap } from '../../utils/focus-management';
import { lockBodyScroll, unlockBodyScroll } from '../../utils/scroll-lock';
import { pushZIndex, popZIndex } from '../../utils/z-index-manager';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { generateId } from '../../utils/id-generator';

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
  private movedToBody: boolean = false;

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

  // Note: ARIA attributes (aria-label, aria-labelledby, aria-describedby)
  // are passed through automatically via getPassThroughAttributes()
  // No need for @Prop decorators to avoid TypeScript conflicts with Element interface

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
  @Event() aegovModalBeforeClose: EventEmitter<{ preventDefault: () => void }>;

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
  }

  @Watch('overlayOpacity')
  onOverlayOpacityChange(v: unknown) { warnIfInvalidEnumProp(v, MODAL_OVERLAY_OPACITIES, 'base', ctx('overlayOpacity')); }

  @Watch('position')
  onPositionChange(v: unknown) { warnIfInvalidEnumProp(v, MODAL_POSITIONS, 'center', ctx('position')); }

  @Watch('size')
  onSizeChange(v: unknown) { warnIfInvalidEnumProp(v, MODAL_SIZES, 'base', ctx('size')); }

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

  private handleOpen() {
    // Store the currently focused element
    this.triggerElement = document.activeElement as HTMLElement;

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

  private handleClose() {
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
      // ESC key always closes the modal (non-configurable for accessibility)
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

    return (
      <Host data-state={this.animationState} style={{ '--modal-z-index': this.modalZIndex.toString() }}>
        <div
          class={`aegov-modal-backdrop ${this.getOverlayOpacityClass()}`}
          data-state={this.animationState}
          onClick={this.handleBackdropClick}
        ></div>
        <div class={`aegov-modal-container ${this.getPositionClass()}`} onClick={this.handleBackdropClick}>
          <div
            id={this.fieldId}
            class={`aegov-modal-content ${this.getSizeClass()} ${this.isPadding ? 'modal--padded' : ''}`}
            data-state={this.animationState}
            role="dialog"
            aria-modal="true"
            tabindex={-1}
            {...passThroughAttributes}
          >
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
