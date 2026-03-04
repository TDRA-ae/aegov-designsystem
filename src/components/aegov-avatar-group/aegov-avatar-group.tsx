import { Component, Element, Event, EventEmitter, Host, h, Prop, Watch } from '@stencil/core';
import type { AvatarGroupMode, AvatarSize, AvatarVariant } from '../../utils/types';

/**
 * @slot - Avatar elements to be grouped together
 */
@Component({
  tag: 'aegov-avatar-group',
  styleUrl: 'aegov-avatar-group.css',
  scoped: false,
})
export class AegovAvatarGroup {
  @Element() el: HTMLElement;

  /**
   * The layout mode: 'default' (spaced) or 'compact' (overlapping)
   */
  @Prop() mode: AvatarGroupMode = 'default';

  /**
   * The size enforced on all child avatars
   */
  @Prop() size: AvatarSize = 'base';

  /**
   * The variant (shape) applied to the "more" indicator
   */
  @Prop() variant: AvatarVariant = 'rounded';

  /**
   * Number of additional users not shown. When > 0, displays "+N" indicator.
   */
  @Prop() moreCount: number = 0;

  /**
   * Custom text for the "more" indicator. Defaults to "{moreCount}+"
   */
  @Prop() moreText?: string;

  /**
   * Emitted when the "more" indicator button is clicked
   */
  @Event() aegovAvatarGroupMore: EventEmitter<void>;

  componentDidLoad() {
    this.updateAvatars();
  }

  componentDidUpdate() {
    this.updateAvatars();
  }

  @Watch('size')
  watchSize() {
    this.updateAvatars();
  }

  private getDirectChildAvatars(): HTMLAegovAvatarElement[] {
    const allAvatars = Array.from(
      this.el.querySelectorAll('aegov-avatar'),
    ) as HTMLAegovAvatarElement[];

    return allAvatars.filter(avatar => {
      const parentGroup = avatar.parentElement?.closest('aegov-avatar-group');
      return parentGroup === this.el;
    });
  }

  private updateAvatars() {
    const avatars = this.getDirectChildAvatars();
    avatars.forEach(avatar => {
      avatar.size = this.size;
    });
  }

  private handleMoreClick = () => {
    this.aegovAvatarGroupMore.emit();
  };

  private getMoreDisplayText(): string {
    if (this.moreText) {
      return this.moreText;
    }
    return `${this.moreCount}+`;
  }

  private getSizeClass(): string {
    return `avatar-${this.size}`;
  }

  render() {
    const classes = {
      'aegov-avatar-group': true,
      'avatar-group--default': this.mode === 'default',
      'avatar-group--compact': this.mode === 'compact',
      [`avatar-group--${this.size}`]: true,
    };

    const moreClasses = {
      'avatar-group__more': true,
      [this.getSizeClass()]: true,
      'avatar-rounded': this.variant === 'rounded',
    };

    return (
      <Host>
        <div class={classes} role="group" aria-label="Avatar group">
          <slot />
          {this.moreCount > 0 && (
            <button
              type="button"
              class={moreClasses}
              onClick={this.handleMoreClick}
              aria-label={`Show ${this.moreCount} more users`}
            >
              {this.getMoreDisplayText()}
            </button>
          )}
        </div>
      </Host>
    );
  }
}
