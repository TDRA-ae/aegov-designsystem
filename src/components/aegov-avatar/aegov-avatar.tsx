import { Component, Prop, Watch, h, Host, State } from '@stencil/core';
import { AVATAR_SIZES, AVATAR_APPEARANCES, AVATAR_STATUSES } from '../../utils/types';
import type { AvatarSize, AvatarAppearance, AvatarStatus } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';

const TAG = 'aegov-avatar';
const ctx = (prop: string) => ({ component: TAG, prop });

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
    }

    return classes.join(' ');
  }

  /**
   * Get the effective status type from the status prop, or null when hidden.
   */
  private getEffectiveStatus(): AvatarStatus | null {
    if (this.status === true) return 'online';
    if (this.status === false) return null;
    return (AVATAR_STATUSES as readonly string[]).includes(this.status as string)
      ? (this.status as AvatarStatus)
      : null;
  }

  /**
   * Get status indicator classes
   */
  private getStatusClasses(effectiveStatus: AvatarStatus): string {
    return `avatar-indicator avatar-${effectiveStatus}`;
  }

  render() {
    const showImage = this.src && !this.imageError;

    return (
      <Host>
        <div
          part="avatar"
          class={this.getAvatarClasses()}
          role="img"
          aria-label={this.alt || 'User avatar'}
        >
          {showImage ? (
            <img
              part="image"
              src={this.src}
              alt={this.alt || ''}
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

          {(() => {
            const effectiveStatus = this.getEffectiveStatus();
            return effectiveStatus && (
              <span
                part="status"
                class={this.getStatusClasses(effectiveStatus)}
                aria-label={`Status: ${effectiveStatus}`}
              ></span>
            );
          })()}
        </div>
      </Host>
    );
  }
}
