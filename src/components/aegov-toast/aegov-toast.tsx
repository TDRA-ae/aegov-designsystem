import { Component, Prop, Method, Event, EventEmitter, State, h, Element } from '@stencil/core';
import type { ToastVariant, ToastAppearance, ToastPosition } from '../../utils/types';

/* ============================================
   MODULE-LEVEL TOAST MANAGER
   ============================================ */

const toastContainers: Map<string, HTMLDivElement> = new Map();
const activeToasts: Map<string, Set<HTMLAegovToastElement>> = new Map();

function getContainerStyles(position: ToastPosition): string {
  const base = 'position:fixed;z-index:9998;display:flex;flex-direction:column;gap:0.5rem;padding:1rem;pointer-events:none;max-height:100vh;overflow:hidden;';

  switch (position) {
    case 'top-right':
      return base + 'top:0;right:0;align-items:flex-end;';
    case 'top-left':
      return base + 'top:0;left:0;align-items:flex-start;';
    case 'top-center':
      return base + 'top:0;left:50%;transform:translateX(-50%);align-items:center;';
    case 'bottom-right':
      return base + 'bottom:0;right:0;align-items:flex-end;flex-direction:column-reverse;';
    case 'bottom-left':
      return base + 'bottom:0;left:0;align-items:flex-start;flex-direction:column-reverse;';
    case 'bottom-center':
      return base + 'bottom:0;left:50%;transform:translateX(-50%);align-items:center;flex-direction:column-reverse;';
  }
}

function getOrCreateContainer(position: ToastPosition): HTMLDivElement {
  let container = toastContainers.get(position);
  if (!container || !document.body.contains(container)) {
    container = document.createElement('div');
    container.className = `aegov-toast-container aegov-toast-container--${position}`;
    container.setAttribute('style', getContainerStyles(position));
    document.body.appendChild(container);
    toastContainers.set(position, container);
  }
  return container;
}

function registerToast(position: ToastPosition, toast: HTMLAegovToastElement): void {
  if (!activeToasts.has(position)) {
    activeToasts.set(position, new Set());
  }
  activeToasts.get(position)!.add(toast);
}

function unregisterToast(position: ToastPosition, toast: HTMLAegovToastElement): void {
  const toasts = activeToasts.get(position);
  if (toasts) {
    toasts.delete(toast);
    // Clean up empty containers
    if (toasts.size === 0) {
      activeToasts.delete(position);
      const container = toastContainers.get(position);
      if (container && document.body.contains(container)) {
        document.body.removeChild(container);
      }
      toastContainers.delete(position);
    }
  }
}

function getActiveToasts(position: ToastPosition): Set<HTMLAegovToastElement> {
  return activeToasts.get(position) || new Set();
}

/* ============================================
   TOAST COMPONENT
   ============================================ */

/**
 * @slot default - Toast message content
 * @slot icon - Custom icon (overrides variant default)
 * @slot actions - Action buttons/links
 */
@Component({
  tag: 'aegov-toast',
  styleUrl: 'aegov-toast.css',
  scoped: true,
  shadow: false
})
export class AegovToast {
  @Element() el: HTMLAegovToastElement;

  /**
   * Semantic color variant of the toast.
   */
  @Prop() variant: ToastVariant = 'default';

  /**
   * Appearance style: soft (light bg) or solid (dark bg).
   */
  @Prop() appearance: ToastAppearance = 'soft';

  /**
   * Screen position where the toast appears.
   */
  @Prop() position: ToastPosition = 'top-right';

  /**
   * Auto-dismiss duration in milliseconds. 0 = no auto-dismiss.
   */
  @Prop() duration: number = 5000;

  /**
   * Whether the toast shows a close button.
   */
  @Prop() dismissible: boolean = true;

  /**
   * Whether multiple toasts can stack at the same position.
   * false = replaces previous toast at the same position (cross-fade).
   */
  @Prop() stackable: boolean = true;

  /**
   * Whether to show the variant-specific icon.
   */
  @Prop({ attribute: 'show-icon' }) showIcon: boolean = true;

  /**
   * Whether to show a countdown progress bar.
   */
  @Prop({ attribute: 'show-progress' }) showProgress: boolean = false;

  /**
   * Emitted after the toast becomes visible.
   */
  @Event() aegovToastOpen: EventEmitter<void>;

  /**
   * Emitted after the toast close animation completes and element is removed.
   */
  @Event() aegovToastClose: EventEmitter<void>;

  /**
   * Emitted when the user clicks the dismiss button.
   */
  @Event() aegovToastDismiss: EventEmitter<void>;

  @State() isVisible: boolean = false;
  @State() isEntering: boolean = false;
  @State() isExiting: boolean = false;
  @State() hasIconSlot: boolean = false;
  @State() hasActionsSlot: boolean = false;

  private autoCloseTimer: ReturnType<typeof setTimeout> | null = null;
  private isClosing: boolean = false;

  /**
   * Show the toast notification.
   */
  @Method()
  async show(): Promise<void> {
    if (this.isVisible) return;

    // Non-stackable: close existing toasts at same position
    if (!this.stackable) {
      const existing = getActiveToasts(this.position);
      existing.forEach(toast => {
        if (toast !== this.el) {
          toast.close();
        }
      });
    }

    // Move to portal container
    const container = getOrCreateContainer(this.position);
    const isBottom = this.position.startsWith('bottom');

    if (isBottom) {
      container.appendChild(this.el);
    } else {
      container.prepend(this.el);
    }

    registerToast(this.position, this.el);

    // Trigger enter animation
    this.isEntering = true;
    this.isVisible = true;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.isEntering = false;
        this.aegovToastOpen.emit();
      });
    });

    // Start auto-dismiss timer
    if (this.duration > 0) {
      this.autoCloseTimer = setTimeout(() => {
        this.close();
      }, this.duration);
    }
  }

  /**
   * Close the toast with exit animation and auto-remove from DOM.
   */
  @Method()
  async close(): Promise<void> {
    if (this.isClosing || !this.isVisible) return;
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

      // Unregister and emit
      unregisterToast(this.position, this.el);
      this.aegovToastClose.emit();

      // Auto-remove from DOM
      if (this.el.parentNode) {
        this.el.parentNode.removeChild(this.el);
      }
    }, 300);
  }

  private handleDismiss = () => {
    this.aegovToastDismiss.emit();
    this.close();
  };

  private checkSlots = () => {
    this.hasIconSlot = this.el.querySelectorAll('[slot="icon"]').length > 0;
    this.hasActionsSlot = this.el.querySelectorAll('[slot="actions"]').length > 0;
  };

  private getPositionDirection(): string {
    if (this.position.endsWith('left')) return 'left';
    if (this.position.endsWith('center')) return 'center';
    return 'right';
  }

  private getDefaultIcon() {
    const iconClass = 'size-5';

    switch (this.variant) {
      case 'error':
        return (
          <svg class={iconClass} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z"/></svg>
        );
      case 'warning':
        return (
          <svg class={iconClass} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z"/></svg>
        );
      case 'success':
        return (
          <svg class={iconClass} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"/></svg>
        );
      case 'info':
        return (
          <svg class={iconClass} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-4,48a12,12,0,1,1-12,12A12,12,0,0,1,124,72Zm12,112a16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40a8,8,0,0,1,0,16Z"/></svg>
        );
      default:
        return (
          <svg class={iconClass} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-2,36a12,12,0,1,1-12,12A12,12,0,0,1,126,60Zm10,124a16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40a8,8,0,0,1,0,16Z"/></svg>
        );
    }
  }

  private getToastClasses(): string {
    const classes = ['toast'];

    // Variant
    classes.push(`toast--${this.variant}`);

    // Appearance
    classes.push(`toast--${this.appearance}`);

    // Direction for animations
    const direction = this.getPositionDirection();
    classes.push(`toast--${direction}`);

    // Position vertical for center animations
    if (direction === 'center') {
      classes.push(this.position.startsWith('top') ? 'toast--top' : 'toast--bottom');
    }

    // Animation states
    if (this.isEntering) {
      classes.push('toast--entering');
    } else if (this.isExiting) {
      classes.push('toast--exiting');
    } else if (this.isVisible) {
      classes.push('toast--visible');
    }

    return classes.join(' ');
  }

  componentWillRender() {
    this.checkSlots();
  }

  disconnectedCallback() {
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
      this.autoCloseTimer = null;
    }
  }

  render() {
    if (!this.isVisible) {
      return null;
    }

    return (
      <div class={this.getToastClasses()} role="status" aria-live="polite">
        {this.showIcon && (
          <div class="toast__icon">
            {this.hasIconSlot ? (
              <slot name="icon" />
            ) : (
              this.getDefaultIcon()
            )}
          </div>
        )}
        <div class="toast__content">
          <slot />
          {this.hasActionsSlot && (
            <div class="toast__actions">
              <slot name="actions" />
            </div>
          )}
        </div>
        {this.dismissible && (
          <button
            type="button"
            class="toast__dismiss"
            onClick={this.handleDismiss}
            aria-label="Close toast"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 256 256" aria-hidden="true">
              <rect width="256" height="256" fill="none"/>
              <line x1="200" y1="56" x2="56" y2="200" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
              <line x1="200" y1="200" x2="56" y2="56" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
            </svg>
          </button>
        )}
        {this.showProgress && this.duration > 0 && (
          <div
            class="toast__progress"
            style={{ animationDuration: `${this.duration}ms` }}
          />
        )}
      </div>
    );
  }
}


