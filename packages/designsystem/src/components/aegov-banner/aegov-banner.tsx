import { Component, Prop, Watch, Event, EventEmitter, State, h, Element } from '@stencil/core';
import {
  CALLOUT_VARIANTS,
  CALLOUT_APPEARANCES,
  BANNER_POSITIONS,
  BANNER_DISPLAYS,
  BANNER_MODES,
  BANNER_SIZES,
} from '../../utils/types';
import type { CalloutVariant, CalloutAppearance, BannerPosition, BannerDisplay, BannerMode, BannerRole, BannerSize } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import { generateId } from '../../utils/id-generator';
import { isRtl } from '../../utils/rtl';
import { getVariantIcon } from '../../utils/icons';

const STRINGS = {
  en: { close: 'Close banner' },
  ar: { close: 'إغلاق الشريط' },
};

const TAG = 'aegov-banner';
const ctx = (prop: string) => ({ component: TAG, prop });

/** Maps banner position to the body padding CSS property it controls. */
const BODY_PADDING_PROP: Record<BannerPosition, string> = {
  top: 'padding-top',
  bottom: 'padding-bottom',
};

/**
 * @slot default - The main content of the banner
 * @slot actions - Action buttons (optional)
 * @slot icon - Custom icon (optional, has fallback variant-based icons)
 */
@Component({
  tag: 'aegov-banner',
  styleUrl: 'aegov-banner.css',
  scoped: false,
  shadow: false
})
export class AegovBanner {
  @Element() el!: HTMLElement;

  /**
   * Unique ID for the banner element. Auto-generated if not provided.
   * The heading element receives a derived ID `${fieldId}-heading` for ARIA labelledby.
   */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

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
  @Prop() isDismissible: boolean = true;

  /**
   * Optional visible heading label for the banner.
   * When provided, a `<span id="${fieldId}-heading">` is rendered inside the banner
   * and the wrapper receives `aria-labelledby="${fieldId}-heading"`.
   * Required for role="status" banners that need an accessible name.
   */
  @Prop() heading?: string;

  /**
   * Size of the banner. Controls font size and vertical padding.
   * Accepts a plain value (`"sm"`, `"base"`, `"lg"`) or a responsive string
   * using Tailwind-style breakpoint prefixes (`"sm xl:lg"`).
   */
  @Prop() size: string = 'base';

  @State() private _resolvedSize: BannerSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /**
   * Auto-focus the banner when mounted (for critical alerts only).
   */
  @Prop() isFocusable: boolean = false;

  /**
   * Event emitted when the banner is dismissed.
   */
  @Event() aegovBannerDismiss!: EventEmitter<void>;

  /**
   * Event emitted when banner height changes (useful for overlay mode to adjust body padding).
   */
  @Event() aegovBannerHeightChange!: EventEmitter<{ height: number }>;

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
   * Internal state to track if the icon slot has custom content.
   */
  @State() hasIconSlot: boolean = false;

  private resizeObserver: ResizeObserver | null = null;

  /**
   * Get the ARIA role based on variant and pass-through `role` attribute.
   * If a `role` attribute is set on the host, it overrides the auto-computed value.
   *
   * Role mapping (mirrors aegov-callout for consistency):
   *   error              → role="alert"  (assertive — blocking error, must interrupt)
   *   success, info,
   *   warning, default   → role="status" (polite — non-urgent, announce when AT is idle)
   *
   * role="region" is intentionally NOT used here: it is a navigation landmark with no
   * live-region semantics (WAI-ARIA 1.2 §5.3.4), so dynamically injected banners would
   * never be announced to AT.
   */
  private getRole(): BannerRole {
    // If user provided a role attribute on the host, use it
    const hostRole = this.el.getAttribute('role') as BannerRole | null;
    if (hostRole) {
      return hostRole;
    }
    // Auto-compute based on variant
    if (this.variant === 'error') {
      return 'alert';   // assertive — implicit aria-live="assertive" (WAI-ARIA 1.2)
    }
    return 'status';    // polite   — implicit aria-live="polite"     (WAI-ARIA 1.2)
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
        this.aegovBannerHeightChange.emit({ height: 0 });
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
      this.aegovBannerHeightChange.emit({ height });
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
        document.body.style.setProperty(BODY_PADDING_PROP[((BANNER_POSITIONS as readonly string[]).includes(this.position) ? this.position : 'top') as BannerPosition], `${height}px`);
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
    document.body.style.removeProperty(BODY_PADDING_PROP[((BANNER_POSITIONS as readonly string[]).includes(this.position) ? this.position : 'top') as BannerPosition]);
  };

  /**
   * Check slot content state before each render.
   */
  private checkActionsSlot = () => {
    this.hasActionsSlot = this.el.querySelectorAll('[slot="actions"]').length > 0;
    this.hasIconSlot = this.el.querySelectorAll('[slot="icon"]').length > 0;
  };

  /**
   * Get the CSS classes based on component props
   */
  private getBannerClasses(): string {
    const classes: string[] = ['aegov-banner'];

    const display: BannerDisplay = (BANNER_DISPLAYS as readonly string[]).includes(this.display) ? this.display : 'fixed';
    const position: BannerPosition = (BANNER_POSITIONS as readonly string[]).includes(this.position) ? this.position : 'top';
    const mode: BannerMode = (BANNER_MODES as readonly string[]).includes(this.mode) ? this.mode : 'push';
    const appearance: CalloutAppearance = (CALLOUT_APPEARANCES as readonly string[]).includes(this.appearance) ? this.appearance : 'soft';
    const variant: CalloutVariant = (CALLOUT_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'default';

    // Display mode (positioning)
    classes.push(`banner--${display}`);

    // Position (top/bottom)
    classes.push(`banner--${position}`);

    // Mode (push/overlay)
    classes.push(`banner--${mode}`);

    // Appearance
    classes.push(`banner--${appearance}`);

    // Variant
    classes.push(`banner--${variant}`);

    // Size
    classes.push(`banner--${this._resolvedSize}`);

    // Dismissing state
    if (this.isDismissing) {
      classes.push('banner--dismissing');
    }

    return classes.join(' ');
  }

  componentWillLoad() {
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-banner');
    }
    warnIfInvalidEnumProp(this.variant, CALLOUT_VARIANTS, 'default', ctx('variant'));
    warnIfInvalidEnumProp(this.appearance, CALLOUT_APPEARANCES, 'soft', ctx('appearance'));
    warnIfInvalidEnumProp(this.position, BANNER_POSITIONS, 'top', ctx('position'));
    warnIfInvalidEnumProp(this.display, BANNER_DISPLAYS, 'fixed', ctx('display'));
    warnIfInvalidEnumProp(this.mode, BANNER_MODES, 'push', ctx('mode'));
    this._sizeWatcher = watchResponsiveProp(this.size, BANNER_SIZES, 'base', v => {
      this._resolvedSize = v as BannerSize;
    });
    this._resolvedSize = this._sizeWatcher.current as BannerSize;
  }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, BANNER_SIZES, 'base', v => {
      this._resolvedSize = v as BannerSize;
    });
    this._resolvedSize = this._sizeWatcher.current as BannerSize;
  }

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, CALLOUT_VARIANTS, 'default', ctx('variant')); }

  @Watch('appearance')
  onAppearanceChange(v: unknown) { warnIfInvalidEnumProp(v, CALLOUT_APPEARANCES, 'soft', ctx('appearance')); }

  @Watch('position')
  onPositionChange(v: unknown) { warnIfInvalidEnumProp(v, BANNER_POSITIONS, 'top', ctx('position')); }

  @Watch('display')
  onDisplayChange(v: unknown) { warnIfInvalidEnumProp(v, BANNER_DISPLAYS, 'fixed', ctx('display')); }

  @Watch('mode')
  onModeChange(v: unknown) { warnIfInvalidEnumProp(v, BANNER_MODES, 'push', ctx('mode')); }

  /**
   * Lifecycle: Component loaded
   */
  componentDidLoad() {
    // Auto-focus for critical alerts
    if (this.isFocusable && this.getRole() === 'alert') {
      const banner = this.el.querySelector('.aegov-banner') as HTMLElement;
      banner?.focus();
    }

    const needsOverlayHeight = this.mode === 'overlay';
    const needsPushPadding = this.display === 'fixed' && this.mode === 'push';

    // Emit initial height for overlay mode
    if (needsOverlayHeight) {
      this.emitHeight();
    }

    // Set body padding for push mode with fixed positioning
    if (needsPushPadding) {
      // Use requestAnimationFrame to ensure element is fully rendered before measuring
      requestAnimationFrame(() => {
        this.setBodyPadding();
      });
    }

    // Single ResizeObserver handles both overlay height and push padding
    if ((needsOverlayHeight || needsPushPadding) && typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        if (needsOverlayHeight) {
          this.emitHeight();
        }
        if (needsPushPadding) {
          this.setBodyPadding();
        }
      });
      this.resizeObserver.observe(this.el);
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
    this._sizeWatcher?.destroy();

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
    // Pass-through aria-* and data-* attributes; `role` is consumed by getRole() so omit from spread
    const passThroughAttributes = getPassThroughAttributes(this.el);
    delete passThroughAttributes['role'];

    const iconSizeClasses: Record<BannerSize, string> = { sm: 'size-4', base: 'size-5', lg: 'size-6' };
    const iconSizeClass = iconSizeClasses[this._resolvedSize];
    const effectiveVariant = (CALLOUT_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'default';

    return (
      <div
        id={this.fieldId}
        class={this.getBannerClasses()}
        role={role}
        aria-labelledby={this.heading ? `${this.fieldId}-heading` : undefined}
        tabindex={this.isFocusable ? -1 : undefined}
        {...passThroughAttributes}
      >
        <div class="banner__container">
          <div class="banner__icon" aria-hidden="true">
            {this.hasIconSlot
              ? <slot name="icon" />
              : getVariantIcon(effectiveVariant, iconSizeClass)
            }
          </div>

          <div class="banner__content">
            {this.heading && (
              <span id={`${this.fieldId}-heading`} class="banner__heading">{this.heading}</span>
            )}
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
          {this.isDismissible && (
            <button
              type="button"
              class="banner__dismiss"
              onClick={this.handleDismiss}
              aria-label={isRtl(this.el) ? STRINGS.ar.close : STRINGS.en.close}
            >
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="200" y1="56" x2="56" y2="200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="200" y1="200" x2="56" y2="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            </button>
          )}
        </div>
      </div>
    );
  }
}
