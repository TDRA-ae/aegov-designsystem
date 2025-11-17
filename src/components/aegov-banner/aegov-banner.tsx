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
   * CSS positioning strategy: fixed (stays in viewport), sticky (scrolls then sticks).
   */
  @Prop() display: BannerDisplay = 'fixed';

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

      // Clear body padding for push mode
      if (this.display === 'fixed' && this.mode === 'push') {
        this.clearBodyPadding();
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
   * Set body padding CSS variable for push mode with fixed positioning
   */
  private setBodyPadding = () => {
    if (this.display === 'fixed' && this.mode === 'push' && this.isVisible) {
      // Measure the inner .aegov-banner div, not the host element
      const bannerDiv = this.el.querySelector('.aegov-banner') as HTMLElement;
      const height = bannerDiv ? bannerDiv.offsetHeight : this.el.offsetHeight;

      // Only set padding if height is valid (> 0)
      if (height > 0) {
        const cssVarName = this.position === 'top' ? 'padding-top' : 'padding-bottom';
        document.body.style.setProperty(cssVarName, `${height}px`);
      } else {
        // If height is still 0, try again after a short delay
        setTimeout(() => this.setBodyPadding(), 50);
      }
    }
  };

  /**
   * Clear body padding CSS variable
   */
  private clearBodyPadding = () => {
    const cssVarName = this.position === 'top' ? 'padding-top' : 'padding-bottom';
    document.body.style.removeProperty(cssVarName);
  };

  /**
   * Check if the actions slot has content
   */
  private checkActionsSlot = () => {
    const actionsElements = this.el.querySelectorAll('[slot="actions"]');
    this.hasActionsSlot = actionsElements.length > 0;
  };

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
    classes.push(`banner--${this.appearance}`);

    // Variant
    classes.push(`banner--${this.variant}`);

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

    // Set body padding for push mode with fixed positioning
    if (this.display === 'fixed' && this.mode === 'push') {
      // Use requestAnimationFrame to ensure element is fully rendered before measuring
      requestAnimationFrame(() => {
        this.setBodyPadding();
      });

      // Set up ResizeObserver to track height changes
      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(() => {
          this.setBodyPadding();
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

    // Clear body padding when component is removed
    if (this.display === 'fixed' && this.mode === 'push') {
      this.clearBodyPadding();
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
        <div class="banner__container">          
           <div class="banner__content">
            <div class={`banner__text ${this.hasActionsSlot ? 'banner__text-left' : 'banner__text-center'}`}>
              <slot />
            </div>
            {this.hasActionsSlot && (
            <div class="banner__actions">
              <slot name="actions" />
            </div>
            )}
          </div>

          {/* Dismiss button */}
          {this.dismissible && (
            <button
              type="button"
              class="banner__dismiss"
              onClick={this.handleDismiss}
              aria-label="Close banner"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="200" y1="56" x2="56" y2="200" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="200" y1="200" x2="56" y2="56" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
            </button>
          )}
        </div>
      </div>
    );
  }
}
