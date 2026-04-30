import { Component, Prop, Watch, h, Host, State } from '@stencil/core';
import { AVATAR_SIZES, AVATAR_APPEARANCES } from '../../utils/types';
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
   * Status indicator type. Set to 'online' or 'offline' to show indicator, or 'none'/false to hide.
   * @default 'none'
   */
  @Prop() status: AvatarStatus | boolean = 'none';

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
   * Get the effective status type from the status prop
   */
  private getEffectiveStatus(): AvatarStatus {
    if (this.status === true || this.status === 'online') return 'online';
    if (this.status === 'offline') return 'offline';
    return 'none';
  }

  /**
   * Get status indicator classes
   */
  private getStatusClasses(): string {
    const classes: string[] = ['avatar-indicator'];
    const effectiveStatus = this.getEffectiveStatus();

    if (effectiveStatus === 'online') {
      classes.push('avatar-online');
    } else if (effectiveStatus === 'offline') {
      classes.push('avatar-offline');
    }

    return classes.join(' ');
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

          {this.getEffectiveStatus() !== 'none' && (
            <span
              part="status"
              class={this.getStatusClasses()}
              aria-label={`Status: ${this.getEffectiveStatus()}`}
            ></span>
          )}
        </div>
      </Host>
    );
  }
}
