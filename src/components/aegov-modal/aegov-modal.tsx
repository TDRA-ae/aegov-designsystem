import { Component, Host, h, Prop, Event, EventEmitter, Element, Method, Watch, State } from '@stencil/core';
import type { ModalPosition, ModalBackdropOpacity } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';

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
  private static openModals: number = 0;
  private static baseZIndex: number = 50;
  private modalZIndex: number = 50;

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

  connectedCallback() {
    // Move modal to body for proper stacking
    if (this.el.parentNode !== document.body) {
      document.body.appendChild(this.el);
    }
  }

  disconnectedCallback() {
    // Cleanup
    this.unlockBodyScroll();
    if (this.el.parentNode === document.body) {
      document.body.removeChild(this.el);
    }
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  private handleOpen() {
    // Store the currently focused element
    this.triggerElement = document.activeElement as HTMLElement;

    // Assign z-index for this modal
    AegovModal.openModals++;
    this.modalZIndex = AegovModal.baseZIndex + (AegovModal.openModals - 1) * 10;

    // Set animation state
    this.animationState = 'opening';

    // Lock body scroll
    this.lockBodyScroll();

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
    // Decrement open modals count
    AegovModal.openModals = Math.max(0, AegovModal.openModals - 1);

    // Only unlock body scroll if this is the last modal
    if (AegovModal.openModals === 0) {
      this.unlockBodyScroll();
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

  private lockBodyScroll() {
    if (!this.preventBodyScroll) return;

    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  private unlockBodyScroll() {
    if (!this.preventBodyScroll) return;

    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  private setupFocusTrap() {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    // Query within shadow root
    const shadowRoot = this.el.shadowRoot;
    if (!shadowRoot) return;

    const slot = shadowRoot.querySelector('slot');
    if (!slot) return;

    const slottedElements = slot.assignedElements({ flatten: true });
    this.focusableElements = [];

    slottedElements.forEach((element) => {
      const focusable = element.querySelectorAll(focusableSelectors);
      this.focusableElements.push(...Array.from(focusable) as HTMLElement[]);
    });

    // Set focus to first focusable element
    if (this.focusableElements.length > 0) {
      this.focusableElements[0].focus();
    }
  }

  private handleTabKey(event: KeyboardEvent) {
    if (!this.focusableElements.length) return;

    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[this.focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey) {
      // Shift + Tab
      if (activeElement === firstElement || !this.focusableElements.includes(activeElement as HTMLElement)) {
        lastElement.focus();
        event.preventDefault();
      }
    } else {
      // Tab
      if (activeElement === lastElement || !this.focusableElements.includes(activeElement as HTMLElement)) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  }

  private getPositionClass(): string {
    const positionClasses: Record<ModalPosition, string> = {
      center: 'modal-container--center',
      top: 'modal-container--top',
      bottom: 'modal-container--bottom',
    };
    return positionClasses[this.position];
  }

  private getBackdropOpacityClass(): string {
    const opacityClasses: Record<ModalBackdropOpacity, string> = {
      light: 'modal-backdrop--light',
      base: 'modal-backdrop--base',
      dark: 'modal-backdrop--dark',
    };
    return opacityClasses[this.backdropOpacity];
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
            class="aegov-modal-content"
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
