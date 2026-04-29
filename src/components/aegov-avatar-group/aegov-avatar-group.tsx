import { Component, Element, Event, EventEmitter, Host, h, Prop, State, Watch } from '@stencil/core';
import { AVATAR_GROUP_MODES, AVATAR_SIZES } from '../../utils/types';
import type { AvatarGroupMode, AvatarSize } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';

const TAG = 'aegov-avatar-group';
const ctx = (prop: string) => ({ component: TAG, prop });

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
  @Prop() size: string = 'base';
  @State() private _resolvedSize: AvatarSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

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

  componentWillLoad() {
    warnIfInvalidEnumProp(this.mode, AVATAR_GROUP_MODES, 'default', ctx('mode'));
    this._sizeWatcher = watchResponsiveProp(this.size, AVATAR_SIZES, 'base', v => {
      this._resolvedSize = v as AvatarSize;
      if (this.el.isConnected) { this.updateAvatars(); }
    });
    this._resolvedSize = this._sizeWatcher.current as AvatarSize;
  }

  componentDidLoad() {
    this.updateAvatars();
  }

  componentDidUpdate() {
    this.updateAvatars();
  }

  @Watch('mode')
  onModeChange(v: unknown) { warnIfInvalidEnumProp(v, AVATAR_GROUP_MODES, 'default', ctx('mode')); }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  @Watch('size')
  watchSize() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, AVATAR_SIZES, 'base', v => {
      this._resolvedSize = v as AvatarSize;
      if (this.el.isConnected) { this.updateAvatars(); }
    });
    this._resolvedSize = this._sizeWatcher.current as AvatarSize;
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
      avatar.size = this._resolvedSize;
      // Groups always use rounded avatars — override any individual variant setting
      avatar.variant = 'rounded';
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
    return `avatar-${this._resolvedSize}`;
  }

  render() {
    const size: AvatarSize = this._resolvedSize;
    const mode: AvatarGroupMode = (AVATAR_GROUP_MODES as readonly string[]).includes(this.mode) ? this.mode : 'default';
    const classes = {
      'aegov-avatar-group': true,
      'avatar-group--default': mode === 'default',
      'avatar-group--compact': mode === 'compact',
      [`avatar-group--${size}`]: true,
    };

    // More button is always rounded — groups only support rounded avatars
    const moreClasses = {
      'avatar-group__more': true,
      [this.getSizeClass()]: true,
      'avatar-rounded': true,
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
