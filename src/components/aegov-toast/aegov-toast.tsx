import { Component, Prop, Method, Event, EventEmitter, State, h, Element } from '@stencil/core';
import type { ToastVariant, ToastAppearance, ToastPosition, ToastMode } from '../../utils/types';

/* ============================================
   MODULE-LEVEL TOAST MANAGER
   ============================================ */

const toastContainers: Map<string, HTMLDivElement> = new Map();
const activeToasts: Map<string, Set<HTMLAegovToastElement>> = new Map();

function getContainerStyles(position: ToastPosition): string {
  const base = 'position:fixed;z-index:9998;display:flex;flex-direction:column;gap:0.5rem;padding:1rem;pointer-events:none;max-height:100vh;overflow:visible;';

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
    if (toasts.size === 0) {
      activeToasts.delete(position);
      const container = toastContainers.get(position);
      if (container && document.body.contains(container)) {
        document.body.removeChild(container);
      }
      toastContainers.delete(position);
      rackContainers.delete(position);
    }
  }
}

/* ============================================
   SCREEN READER LIVE REGION
   ============================================ */

let liveRegion: HTMLDivElement | null = null;

function getOrCreateLiveRegion(): HTMLDivElement {
  if (liveRegion && document.body.contains(liveRegion)) {
    return liveRegion;
  }
  liveRegion = document.createElement('div');
  liveRegion.id = 'aegov-toast-live-region';
  liveRegion.setAttribute('role', 'status');
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');
  // Visually hidden but accessible to screen readers
  liveRegion.setAttribute('style',
    'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;'
  );
  document.body.appendChild(liveRegion);
  return liveRegion;
}

function announceToast(message: string): void {
  const region = getOrCreateLiveRegion();
  // Clear then re-inject so screen readers detect the change
  region.textContent = '';
  requestAnimationFrame(() => {
    region.textContent = message;
  });
}

/* ============================================
   RACK MODE MANAGEMENT
   ============================================ */

const rackContainers: Set<string> = new Set();
let rackStylesInjected = false;

function injectRackStyles(): void {
  if (rackStylesInjected) return;
  rackStylesInjected = true;

  const style = document.createElement('style');
  style.id = 'aegov-toast-rack-styles';
  style.textContent = `
    /* Rack container overrides */
    .aegov-toast-container--rack {
      gap: 0 !important;
      pointer-events: auto !important;
      transition: gap 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Toast transitions in rack */
    .aegov-toast-container--rack aegov-toast {
      transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                  opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                  margin 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }

    /* ---- COLLAPSED: TOP positions ---- */
    /* Newest = first child (prepended) = at top. Older items below peek upward. */
    .aegov-toast-container--top-right.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="1"],
    .aegov-toast-container--top-left.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="1"],
    .aegov-toast-container--top-center.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="1"] {
      margin-top: -2.75rem;
      transform: scale(0.96);
      transform-origin: top center;
      opacity: 0.7;
      z-index: -1;
    }

    .aegov-toast-container--top-right.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="2"],
    .aegov-toast-container--top-left.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="2"],
    .aegov-toast-container--top-center.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="2"] {
      margin-top: -2.75rem;
      transform: scale(0.92);
      transform-origin: top center;
      opacity: 0.4;
      z-index: -2;
    }

    .aegov-toast-container--top-right.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="3"],
    .aegov-toast-container--top-left.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="3"],
    .aegov-toast-container--top-center.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="3"],
    .aegov-toast-container--top-right.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="4"],
    .aegov-toast-container--top-left.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="4"],
    .aegov-toast-container--top-center.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="4"],
    .aegov-toast-container--top-right.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="5"],
    .aegov-toast-container--top-left.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="5"],
    .aegov-toast-container--top-center.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="5"] {
      margin-top: -2.75rem;
      transform: scale(0.88);
      transform-origin: top center;
      opacity: 0;
      pointer-events: none;
      z-index: -3;
    }

    /* ---- COLLAPSED: BOTTOM positions ---- */
    /* column-reverse + prepend: newest = first child = at bottom (main-start). */
    /* Older items are above newest. margin-bottom collapses them downward. */
    .aegov-toast-container--bottom-right.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="1"],
    .aegov-toast-container--bottom-left.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="1"],
    .aegov-toast-container--bottom-center.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="1"] {
      margin-bottom: -2.75rem;
      transform: scale(0.96);
      transform-origin: bottom center;
      opacity: 0.7;
      z-index: -1;
    }

    .aegov-toast-container--bottom-right.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="2"],
    .aegov-toast-container--bottom-left.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="2"],
    .aegov-toast-container--bottom-center.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="2"] {
      margin-bottom: -2.75rem;
      transform: scale(0.92);
      transform-origin: bottom center;
      opacity: 0.4;
      z-index: -2;
    }

    .aegov-toast-container--bottom-right.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="3"],
    .aegov-toast-container--bottom-left.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="3"],
    .aegov-toast-container--bottom-center.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="3"],
    .aegov-toast-container--bottom-right.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="4"],
    .aegov-toast-container--bottom-left.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="4"],
    .aegov-toast-container--bottom-center.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="4"],
    .aegov-toast-container--bottom-right.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="5"],
    .aegov-toast-container--bottom-left.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="5"],
    .aegov-toast-container--bottom-center.aegov-toast-container--rack:not(.aegov-toast-container--expanded) aegov-toast[data-toast-index="5"] {
      margin-bottom: -2.75rem;
      transform: scale(0.88);
      transform-origin: bottom center;
      opacity: 0;
      pointer-events: none;
      z-index: -3;
    }

    /* ---- EXPANDED state (on hover) ---- */
    .aegov-toast-container--rack.aegov-toast-container--expanded {
      gap: 0.5rem !important;
    }

    .aegov-toast-container--rack.aegov-toast-container--expanded aegov-toast {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
      transform: scale(1) !important;
      opacity: 1 !important;
      pointer-events: auto !important;
      z-index: auto !important;
    }

    /* ---- Count badge ---- */
    .aegov-toast-rack-count {
      position: absolute;
      top: 0.125rem;
      right: 0.125rem;
      background: rgba(0, 0, 0, 0.65);
      color: white;
      font-size: 0.7rem;
      font-weight: 600;
      line-height: 1;
      padding: 0.2rem 0.45rem;
      border-radius: 9999px;
      z-index: 100;
      pointer-events: none;
      transition: opacity 0.3s ease;
      font-family: inherit;
    }

    .aegov-toast-container--expanded .aegov-toast-rack-count {
      opacity: 0;
    }

    .aegov-toast-rack-count--bottom {
      top: auto;
      bottom: 0.125rem;
    }

    .aegov-toast-rack-count[data-count="1"] {
      opacity: 0;
    }
  `;
  document.head.appendChild(style);
}

function setupRackContainer(container: HTMLDivElement, position: ToastPosition): void {
  container.classList.add('aegov-toast-container--rack');

  // Create count badge
  const badge = document.createElement('span');
  badge.className = 'aegov-toast-rack-count';
  // Position badge near the screen edge (top for top-positions, bottom for bottom-positions)
  if (position.startsWith('bottom')) {
    badge.classList.add('aegov-toast-rack-count--bottom');
  }
  badge.setAttribute('data-count', '0');
  badge.textContent = '0';
  container.appendChild(badge);

  // Hover listeners for expand/collapse
  container.addEventListener('mouseenter', () => {
    container.classList.add('aegov-toast-container--expanded');
  });
  container.addEventListener('mouseleave', () => {
    container.classList.remove('aegov-toast-container--expanded');
  });

  rackContainers.add(position);
}

function updateRackIndices(position: ToastPosition): void {
  const container = toastContainers.get(position);
  if (!container) return;

  const toastElements = Array.from(container.querySelectorAll('aegov-toast'));
  const count = toastElements.length;

  // Rack always prepends: first child = index 0 (newest) for all positions
  for (let i = 0; i < count; i++) {
    toastElements[i].setAttribute('data-toast-index', String(i));
  }

  // Update count badge
  const badge = container.querySelector('.aegov-toast-rack-count');
  if (badge) {
    badge.textContent = String(count);
    badge.setAttribute('data-count', String(count));
  }
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
   * Display mode for multiple toasts at the same position.
   * 'stack' = all toasts visible with gap between them (default).
   * 'rack' = toasts collapse into a deck; hover to expand.
   */
  @Prop() mode: ToastMode = 'stack';

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
  private timerStartedAt: number = 0;
  private timeRemaining: number = 0;
  @State() isPaused: boolean = false;

  /**
   * Show the toast notification.
   */
  @Method()
  async show(): Promise<void> {
    if (this.isVisible) return;

    // Move to portal container
    const container = getOrCreateContainer(this.position);
    const isBottom = this.position.startsWith('bottom');

    if (this.mode === 'rack') {
      // Rack: always prepend so newest = first child = closest to screen edge
      // (column: first child at top; column-reverse: first child at bottom)
      container.prepend(this.el);
    } else if (isBottom) {
      container.appendChild(this.el);
    } else {
      container.prepend(this.el);
    }

    registerToast(this.position, this.el);

    // Setup rack mode if needed
    if (this.mode === 'rack') {
      injectRackStyles();
      if (!rackContainers.has(this.position)) {
        setupRackContainer(container, this.position);
      }
      updateRackIndices(this.position);
    }

    // Trigger enter animation
    this.isEntering = true;
    this.isVisible = true;

    // Announce to screen readers via persistent live region
    const message = this.el.textContent?.trim();
    if (message) {
      announceToast(message);
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.isEntering = false;
        this.aegovToastOpen.emit();
      });
    });

    // Start auto-dismiss timer
    if (this.duration > 0) {
      this.timeRemaining = this.duration;
      this.startAutoCloseTimer();
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

      const wasRack = this.mode === 'rack';

      // Unregister and emit
      unregisterToast(this.position, this.el);
      this.aegovToastClose.emit();

      // Auto-remove from DOM
      if (this.el.parentNode) {
        this.el.parentNode.removeChild(this.el);
      }

      // Recalculate rack indices after removal
      if (wasRack) {
        updateRackIndices(this.position);
      }
    }, 300);
  }

  private handleDismiss = () => {
    this.aegovToastDismiss.emit();
    this.close();
  };

  private startAutoCloseTimer(): void {
    this.timerStartedAt = Date.now();
    this.autoCloseTimer = setTimeout(() => {
      this.close();
    }, this.timeRemaining);
  }

  private handleMouseEnter = () => {
    if (this.duration <= 0 || this.isClosing || !this.isVisible) return;
    this.isPaused = true;
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
      this.autoCloseTimer = null;
      const elapsed = Date.now() - this.timerStartedAt;
      this.timeRemaining = Math.max(0, this.timeRemaining - elapsed);
    }
  };

  private handleMouseLeave = () => {
    if (this.duration <= 0 || this.isClosing || !this.isVisible) return;
    this.isPaused = false;
    if (this.timeRemaining > 0) {
      this.startAutoCloseTimer();
    } else {
      this.close();
    }
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
    const classes = ['aegov-toast'];

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
    this.isPaused = false;
  }

  render() {
    if (!this.isVisible) {
      return null;
    }

    return (
      <div class={this.getToastClasses()} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
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
            style={{
              animationDuration: `${this.duration}ms`,
              animationPlayState: this.isPaused ? 'paused' : 'running',
            }}
          />
        )}
      </div>
    );
  }
}
