import { Component, Host, h, Prop, Event, EventEmitter, Element, Method, Watch, State } from '@stencil/core';
import { MODAL_POSITIONS, MODAL_BACKDROP_OPACITIES, MODAL_SIZES } from '../../utils/types';
import type { ModalPosition, ModalBackdropOpacity, ModalSize } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { getSlottedFocusableElements, handleTabKeyWrap } from '../../utils/focus-management';
import { lockBodyScroll, unlockBodyScroll } from '../../utils/scroll-lock';
import { pushZIndex, popZIndex } from '../../utils/z-index-manager';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';

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
   * Whether the modal is currently open/visible
   */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /**
   * Whether clicking the backdrop closes the modal
   * @default true
   */
  @Prop() closeWithBackdrop: boolean = true;

  /**
   * Whether to prevent body scroll when modal is open
   * @default true
   */
  @Prop() preventBodyScroll: boolean = true;

  /**
   * Backdrop opacity level
   * @default 'base'
   */
  @Prop() backdropOpacity: ModalBackdropOpacity = 'base';

  /**
   * Position of the modal on screen
   * @default 'center'
   */
  @Prop() position: ModalPosition = 'center';

  /**
   * Size: 'sm' (compact padding/radius), 'base' (default), or 'lg' (generous padding/radius). Mirrors aegov-card sizing tokens.
   * @default 'base'
   */
  @Prop() size: ModalSize = 'base';

  /**
   * Disables inner content padding. Padding is on by default and scales with size.
   * @default false
   */
  @Prop() disallowPadding: boolean = false;

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
    this.open = true;
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
    this.open = !this.open;
  }

  @Watch('open')
  handleOpenChange(newValue: boolean, oldValue: boolean) {
    if (newValue && !oldValue) {
      this.handleOpen();
    } else if (!newValue && oldValue) {
      this.handleCloseComplete();
    }
  }

  componentWillLoad() {
    warnIfInvalidEnumProp(this.backdropOpacity, MODAL_BACKDROP_OPACITIES, 'base', ctx('backdropOpacity'));
    warnIfInvalidEnumProp(this.position, MODAL_POSITIONS, 'center', ctx('position'));
    warnIfInvalidEnumProp(this.size, MODAL_SIZES, 'base', ctx('size'));
  }

  @Watch('backdropOpacity')
  onBackdropOpacityChange(v: unknown) { warnIfInvalidEnumProp(v, MODAL_BACKDROP_OPACITIES, 'base', ctx('backdropOpacity')); }

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
    if (this.preventBodyScroll && this.open) {
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
    if (this.preventBodyScroll) {
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
      this.open = false;
    }, 200);
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
    this.aegovModalClose.emit();
  }

  private handleBackdropClick = (event: MouseEvent) => {
    // Emit backdrop click event
    this.aegovModalBackdropClick.emit(event);

    // Only close if clicking directly on backdrop, not modal content
    if (event.target === event.currentTarget && this.closeWithBackdrop) {
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
    };
    return sizeClasses[size];
  }

  private getBackdropOpacityClass(): string {
    const backdropOpacity: ModalBackdropOpacity = (MODAL_BACKDROP_OPACITIES as readonly string[]).includes(this.backdropOpacity) ? this.backdropOpacity : 'base';
    const opacityClasses: Record<ModalBackdropOpacity, string> = {
      light: 'modal-backdrop--light',
      base: 'modal-backdrop--base',
      dark: 'modal-backdrop--dark',
    };
    return opacityClasses[backdropOpacity];
  }

  private static readonly PASS_THROUGH_ATTRS = new Set(['id']);

  render() {
    if (!this.open && this.animationState === 'closed') {
      return null;
    }

    const passThroughAttributes = getPassThroughAttributes(this.el, AegovModal.PASS_THROUGH_ATTRS);

    return (
      <Host data-state={this.animationState} style={{ '--modal-z-index': this.modalZIndex.toString() }}>
        <div
          class={`aegov-modal-backdrop ${this.getBackdropOpacityClass()}`}
          data-state={this.animationState}
          onClick={this.handleBackdropClick}
        ></div>
        <div class={`aegov-modal-container ${this.getPositionClass()}`} onClick={this.handleBackdropClick}>
          <div
            class={`aegov-modal-content ${this.getSizeClass()} ${!this.disallowPadding ? 'modal--padded' : ''}`}
            data-state={this.animationState}
            role="dialog"
            aria-modal="true"
            {...passThroughAttributes}
          >
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
