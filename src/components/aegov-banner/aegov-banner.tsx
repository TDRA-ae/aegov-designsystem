import { Component, Prop, Event, EventEmitter, State, h, Element } from '@stencil/core';
import type { CalloutVariant, CalloutAppearance, BannerPosition, BannerDisplay, BannerMode, BannerRole } from '../../utils/types';

/**
 * @slot default - The main content of the banner
 * @slot actions - Action buttons (optional)
 * @slot icon - Custom icon (optional, has fallback variant-based icons)
 */
@Component({
  tag: 'aegov-banner',
  styleUrl: 'aegov-banner.css',
  scoped: true,
  shadow: false
})
export class AegovBanner {
  @Element() el: HTMLElement;

  /**
   * The variant of the banner. Determines the color scheme.
   */
  @Prop() variant: CalloutVariant = 'default';

  /**
   * The appearance style of the banner.
   */
  @Prop() appearance: CalloutAppearance = 'soft';

  /**
   * Vertical position of the banner (top or bottom of viewport/page).
   */
  @Prop() position: BannerPosition = 'top';

  /**
   * CSS positioning strategy: static (default, takes up space), fixed (stays in viewport), sticky (scrolls then sticks).
   */
  @Prop() display: BannerDisplay = 'static';

  /**
   * Layout mode: push (takes up space in page flow), overlay (floats over content).
   */
  @Prop() mode: BannerMode = 'push';

  /**
   * Whether the banner can be dismissed/closed.
   */
  @Prop() dismissible: boolean = true;

  /**
   * ARIA role for accessibility. Auto-computed from variant if not specified.
   */
  @Prop() ariaRole?: BannerRole;

  /**
   * Banner title for aria-labelledby attribute.
   */
  @Prop() bannerTitle?: string;

  /**
   * Auto-focus the banner when mounted (for critical alerts only).
   */
  @Prop() autoFocus: boolean = false;

  /**
   * Event emitted when the banner is dismissed.
   */
  @Event() aegovBannerDismiss: EventEmitter<void>;

  /**
   * Event emitted when banner height changes (useful for overlay mode to adjust body padding).
   */
  @Event() aegovBannerHeightChange: EventEmitter<number>;

  /**
   * Internal state to track visibility of the banner.
   */
  @State() isVisible: boolean = true;

  /**
   * Internal state to track dismissing animation.
   */
  @State() isDismissing: boolean = false;

  /**
   * Internal state to track if the actions slot has content.
   */
  @State() hasActionsSlot: boolean = false;

  /**
   * Internal state to track if the icon slot has content.
   */
  @State() hasIconSlot: boolean = false;

  private resizeObserver: ResizeObserver | null = null;

  /**
   * Get the ARIA role based on variant and prop override
   */
  private getRole(): BannerRole {
    // If explicit role provided, use it
    if (this.ariaRole) {
      return this.ariaRole;
    }

    // Auto-compute based on variant
    if (this.variant === 'success' || this.variant === 'error') {
      return 'alert';
    }

    // Default to region for general notifications
    return 'region';
  }

  /**
   * Get aria-live value based on role
   */
  private getAriaLive(): 'polite' | 'assertive' | 'off' {
    const role = this.getRole();
    if (role === 'alert') {
      return 'assertive';
    }
    if (role === 'status' || role === 'region') {
      return 'polite';
    }
    return 'off';
  }

  /**
   * Handle the dismiss button click with animation.
   */
  private handleDismiss = () => {
    this.isDismissing = true;

    // Wait for animation to complete (300ms)
    setTimeout(() => {
      this.isVisible = false;
      this.aegovBannerDismiss.emit();

      // Emit height 0 for overlay mode
      if (this.mode === 'overlay') {
        this.aegovBannerHeightChange.emit(0);
      }
    }, 300);
  };

  /**
   * Emit banner height for overlay mode
   */
  private emitHeight = () => {
    if (this.mode === 'overlay' && this.isVisible) {
      const height = this.el.offsetHeight;
      this.aegovBannerHeightChange.emit(height);
    }
  };

  /**
   * Check if the actions slot has content
   */
  private checkActionsSlot = () => {
    const actionsElements = this.el.querySelectorAll('[slot="actions"]');
    this.hasActionsSlot = actionsElements.length > 0;
  };

  /**
   * Check if the icon slot has content
   */
  private checkIconSlot = () => {
    const iconElements = this.el.querySelectorAll('[slot="icon"]');
    this.hasIconSlot = iconElements.length > 0;
  };

  /**
   * Get the default icon based on variant (reuse from callout)
   */
  private getDefaultIcon() {
    const iconClass = "banner-icon";

    switch (this.variant) {
      case 'error':
        return (
          <svg class={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z"/></svg>
        );
      case 'warning':
        return (
          <svg class={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z"/></svg>
        );
      case 'success':
        return (
          <svg class={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"/></svg>
        );
      case 'info':
        return (
          <svg class={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-4,48a12,12,0,1,1-12,12A12,12,0,0,1,124,72Zm12,112a16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40a8,8,0,0,1,0,16Z"/></svg>
        );
      default: // 'default'
        return (
          <svg class={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="124" cy="84" r="16"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M120,124a8,8,0,0,1,8,8v36a8,8,0,0,0,8,8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
        );
    }
  }

  /**
   * Get the CSS classes based on component props
   */
  private getBannerClasses(): string {
    const classes: string[] = ['aegov-banner'];

    // Display mode (positioning)
    classes.push(`banner--${this.display}`);

    // Position (top/bottom)
    classes.push(`banner--${this.position}`);

    // Mode (push/overlay)
    classes.push(`banner--${this.mode}`);

    // Appearance
    classes.push(`banner-${this.appearance}`);

    // Variant
    classes.push(`banner-${this.variant}`);

    // Dismissing state
    if (this.isDismissing) {
      classes.push('banner--dismissing');
    }

    return classes.join(' ');
  }

  /**
   * Lifecycle: Component loaded
   */
  componentDidLoad() {
    // Auto-focus for critical alerts
    if (this.autoFocus && this.getRole() === 'alert') {
      const banner = this.el.querySelector('[role]') as HTMLElement;
      banner?.focus();
    }

    // Emit initial height for overlay mode
    if (this.mode === 'overlay') {
      this.emitHeight();

      // Set up ResizeObserver to track height changes (if available in browser)
      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(() => {
          this.emitHeight();
        });
        this.resizeObserver.observe(this.el);
      }
    }
  }

  /**
   * Lifecycle: Component will render
   */
  componentWillRender() {
    this.checkActionsSlot();
    this.checkIconSlot();
  }

  /**
   * Lifecycle: Component disconnected
   */
  disconnectedCallback() {
    // Clean up ResizeObserver
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  render() {
    if (!this.isVisible) {
      return null;
    }

    const role = this.getRole();
    const ariaLive = this.getAriaLive();
    const titleId = this.bannerTitle ? 'aegov-banner-title' : undefined;

    return (
      <div
        class={this.getBannerClasses()}
        role={role}
        aria-live={ariaLive}
        aria-labelledby={titleId}
        tabindex={this.autoFocus ? -1 : undefined}
      >
        <div class="banner-container">
          {/* Icon */}
          <div class="banner-icon-wrapper">
            {this.hasIconSlot ? (
              <slot name="icon" />
            ) : (
              this.getDefaultIcon()
            )}
          </div>

          {/* Content */}
          <div class="banner-content">
            {this.bannerTitle && (
              <div id={titleId} class="banner-title">
                {this.bannerTitle}
              </div>
            )}
            <div class="banner-text">
              <slot />
            </div>
            {this.hasActionsSlot && (
              <div class="banner-actions">
                <slot name="actions" />
              </div>
            )}
          </div>

          {/* Dismiss button */}
          {this.dismissible && (
            <button
              type="button"
              class="banner-dismiss"
              onClick={this.handleDismiss}
              aria-label="Close banner"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="banner-dismiss-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
}
