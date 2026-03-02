import { Component, Prop, h, Host, State } from '@stencil/core';
import type { AvatarSize, AvatarVariant, AvatarStatus } from '../../utils/types';

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
  @Prop() size: AvatarSize = 'base';

  /**
   * The avatar variant (shape)
   * @default 'square'
   */
  @Prop() variant: AvatarVariant = 'square';

  /**
   * The image source URL
   */
  @Prop() src?: string;

  /**
   * Alternative text for the image (required for accessibility)
   */
  @Prop() alt?: string;

  /**
   * Status indicator visibility
   * @default false
   */
  @Prop() status: boolean = false;

  /**
   * Status indicator type
   * @default 'online'
   */
  @Prop() statusType: AvatarStatus = 'online';

  /**
   * Internal state to track image load error
   */
  @State() imageError: boolean = false;

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

    classes.push(sizeClasses[this.size]);

    // Variant classes
    if (this.variant === 'rounded') {
      classes.push('avatar-rounded');
    }

    // No user class (when no image is available)
    if (!this.src || this.imageError) {
      classes.push('no-user');
    }

    return classes.join(' ');
  }

  /**
   * Get status indicator classes
   */
  private getStatusClasses(): string {
    const classes: string[] = ['avatar-indicator'];

    if (this.statusType === 'online') {
      classes.push('avatar-online');
    } else if (this.statusType === 'offline') {
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

          {this.status && this.statusType !== 'none' && (
            <span
              part="status"
              class={this.getStatusClasses()}
              aria-label={`Status: ${this.statusType}`}
            ></span>
          )}
        </div>
      </Host>
    );
  }
}
