import { Component, Element, Prop, Watch, h, Host, State } from '@stencil/core';
import { AVATAR_SIZES, AVATAR_APPEARANCES, AVATAR_STATUSES } from '../../utils/types';
import type { AvatarSize, AvatarAppearance, AvatarStatus } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp, parseResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
import { isRtl } from '../../utils/rtl';

const STATUS_AR: Record<string, string> = {
  online: 'متصل',
  offline: 'غير متصل',
  away: 'بعيد',
  unavailable: 'غير متاح',
  busy: 'مشغول',
};

const STRINGS = {
  en: {
    userAvatar: 'User avatar',
    status: (s: string) => `status: ${s}`,
  },
  ar: {
    userAvatar: 'الصورة الرمزية للمستخدم',
    status: (s: string) => `الحالة: ${STATUS_AR[s] || s}`,
  },
};

const TAG = 'aegov-avatar';
const ctx = (prop: string) => ({ component: TAG, prop });

/**
 * Rendered pixel width per size token — mirrors `aegov-avatar.css`'s
 * `.avatar-{size}` rules (`h-6`/`w-6` = 24px, through `h-20`/`w-20` = 80px).
 * Used to auto-compute a correct `sizes` attribute for `srcset` (see
 * `computeAutoSizes()`) — kept in sync with the CSS by hand, same as
 * `getAvatarClasses()`'s own `sizeClasses` map already is.
 */
const SIZE_PX: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  base: 40,
  lg: 48,
  xl: 56,
  '2xl': 64,
  '3xl': 80,
};

/**
 * @slot - Avatar content (used when no src is provided)
 * @part avatar - The avatar container element
 * @part image - The avatar image element
 * @part status - The status indicator element
 */
@Component({
  tag: 'aegov-avatar',
  styleUrl: 'aegov-avatar.css',
  scoped: false,
})
export class AegovAvatar {
  @Element() el: HTMLElement;

  /**
   * Native img attributes to pass through to the inner img element.
   * `sizes` is included so an author-supplied value always wins over the
   * auto-computed one from `computeAutoSizes()` — see `render()`.
   */
  private static readonly PASS_THROUGH_ATTRS = new Set([
    'loading', 'crossorigin', 'referrerpolicy', 'srcset', 'sizes',
  ]);

  /** Unique ID for the inner avatar element. Auto-generated if not provided. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /**
   * The avatar size
   * @default 'base'
   */
  @Prop() size: string = 'base';

  @State() private _resolvedSize: AvatarSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /**
   * The avatar appearance (shape)
   * @default 'square'
   */
  @Prop() appearance: AvatarAppearance = 'square';

  /**
   * The image source URL
   */
  @Prop() src?: string;

  /**
   * Alternative text for the image (required for accessibility)
   */
  @Prop() alt?: string;

  /**
   * Status indicator. Set to a status string to show the indicator, or `false` to hide it.
   * Accepts: `'online'`, `'offline'`, `'away'`, `'unavailable'`, `'busy'`, or boolean (`true` maps to `'online'`).
   * @default false
   */
  @Prop() status: AvatarStatus | boolean = false;

  /**
   * Internal state to track image load error
   */
  @State() imageError: boolean = false;

  componentWillLoad() {
    warnIfInvalidEnumProp(this.appearance, AVATAR_APPEARANCES, 'square', ctx('appearance'));
    this._sizeWatcher = watchResponsiveProp(this.size, AVATAR_SIZES, 'base', v => {
      this._resolvedSize = v as AvatarSize;
    });
    this._resolvedSize = this._sizeWatcher.current as AvatarSize;
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-avatar');
    }
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, AVATAR_SIZES, 'base', v => {
      this._resolvedSize = v as AvatarSize;
    });
    this._resolvedSize = this._sizeWatcher.current as AvatarSize;
  }

  @Watch('appearance')
  onAppearanceChange(v: unknown) { warnIfInvalidEnumProp(v, AVATAR_APPEARANCES, 'square', ctx('appearance')); }

  /**
   * Handle image load error
   */
  private handleImageError = () => {
    this.imageError = true;
  };

  /**
   * Get the CSS classes based on component props
   */
  private getAvatarClasses(): string {
    const classes: string[] = ['aegov-avatar'];

    const size: AvatarSize = this._resolvedSize;
    const appearance: AvatarAppearance = (AVATAR_APPEARANCES as readonly string[]).includes(this.appearance) ? this.appearance : 'square';

    // Size classes
    const sizeClasses: Record<AvatarSize, string> = {
      xs: 'avatar-xs',
      sm: 'avatar-sm',
      base: 'avatar-base',
      lg: 'avatar-lg',
      xl: 'avatar-xl',
      '2xl': 'avatar-2xl',
      '3xl': 'avatar-3xl',
    };

    classes.push(sizeClasses[size]);

    // Appearance classes
    if (appearance === 'rounded') {
      classes.push('avatar-rounded');
    }

    // No user class (when no image is available)
    if (!this.src || this.imageError) {
      classes.push('no-user');
    } else {
      classes.push('avatar--has-image');
    }

    return classes.join(' ');
  }

  /**
   * Get the effective status type from the status prop, or null when hidden.
   */
  private getEffectiveStatus(): AvatarStatus | null {
    // Stencil reflects a mixed string|boolean prop's HTML attribute as the raw
    // string 'true'/'false' rather than coercing to boolean — normalize both forms.
    const rawStatus = this.status as unknown;
    const status = rawStatus === 'true' ? true : rawStatus === 'false' ? false : this.status;
    if (status === true) return 'online';
    if (status === false) return null;
    return (AVATAR_STATUSES as readonly string[]).includes(status as string)
      ? (status as AvatarStatus)
      : null;
  }

  /**
   * Get status indicator classes
   */
  private getStatusClasses(effectiveStatus: AvatarStatus): string {
    return `avatar-indicator avatar-${effectiveStatus}`;
  }

  /**
   * Auto-compute a `sizes` attribute from the avatar's own `size` prop, so a
   * width-descriptor `srcset` resolves against the avatar's real rendered
   * width instead of the browser's 100vw fallback (see PASS_THROUGH_ATTRS'
   * own note — this is the default; an author-supplied `sizes` still wins).
   * `size` can itself be a responsive breakpoint string (same mechanism as
   * `watchResponsiveProp` above), so this mirrors every breakpoint as its
   * own `(min-width: …) …px` media condition, falling back to the base
   * value with no condition — exactly `sizes`' own expected syntax.
   */
  private computeAutoSizes(): string {
    const { base, breakpoints } = parseResponsiveProp(this.size, AVATAR_SIZES, 'base');
    const parts = breakpoints.map(bp => `(min-width: ${bp.minWidth}px) ${SIZE_PX[bp.value]}px`);
    parts.push(`${SIZE_PX[base]}px`);
    return parts.join(', ');
  }

  render() {
    const showImage = this.src && !this.imageError;
    const passThroughAttributes = getPassThroughAttributes(this.el, AegovAvatar.PASS_THROUGH_ATTRS);
    const effectiveStatus = this.getEffectiveStatus();
    const strings = isRtl(this.el) ? STRINGS.ar : STRINGS.en;
    const baseLabel = this.alt || strings.userAvatar;
    const ariaLabel = effectiveStatus
      ? `${baseLabel}, ${strings.status(effectiveStatus)}`
      : baseLabel;

    return (
      <Host>
        <div
          id={this.fieldId}
          part="avatar"
          class={this.getAvatarClasses()}
          role="img"
          aria-label={ariaLabel}
        >
          {showImage ? (
            <img
              part="image"
              sizes={this.el.hasAttribute('srcset') ? this.computeAutoSizes() : undefined}
              {...passThroughAttributes}
              src={this.src}
              alt=""
              aria-hidden="true"
              onError={this.handleImageError}
              class="avatar-image"
            />
          ) : (
            <div class="avatar-fallback">
              <slot>
                <svg
                  class="avatar-icon"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
              </slot>
            </div>
          )}

          {effectiveStatus && (
            <span
              part="status"
              class={this.getStatusClasses(effectiveStatus)}
              aria-hidden="true"
            ></span>
          )}
        </div>
      </Host>
    );
  }
}
