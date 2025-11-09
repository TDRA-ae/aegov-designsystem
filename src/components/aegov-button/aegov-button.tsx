import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import type { ButtonVariant, ButtonSize, ButtonType, ButtonAppearance } from '../../utils/types';

/**
 * @slot - Button content
 * @part button - The native button element
 */
@Component({
  tag: 'aegov-button',
  styleUrl: 'aegov-button.css',
  scoped: true,
})
export class AegovButton {
  /**
   * The button variant style
   * @default 'solid'
   */
  @Prop() variant: ButtonVariant = 'solid';

  /**
   * The button size
   * @default 'base'
   */
  @Prop() size: ButtonSize = 'base';

  /**
   * The button type attribute
   * @default 'button'
   */
  @Prop() type: ButtonType = 'button';

  /**
   * The button appearance (color scheme)
   * @default 'primary'
   */
  @Prop() appearance: ButtonAppearance = 'primary';

  /**
   * Whether the button is disabled
   * @default false
   */
  @Prop() disabled: boolean = false;

  /**
   * Whether the button is only an icon
   * @default false
   */
  @Prop() icon: boolean = false;

  /**
   * Whether the button should take full width
   * @default false
   */
  @Prop() full: boolean = false;

  /**
   * Whether the button is in a loading state
   * @default false
   */
  @Prop() loading: boolean = false;

  /**
   * Emitted when the button is clicked
   */
  @Event() aegovButtonClick: EventEmitter<MouseEvent>;

  /**
   * Emitted when the button receives focus
   */
  @Event() aegovButtonFocus: EventEmitter<FocusEvent>;

  /**
   * Emitted when the button loses focus
   */
  @Event() aegovButtonBlur: EventEmitter<FocusEvent>;

  private handleClick = (event: MouseEvent) => {
    if (!this.disabled && !this.loading) {
      this.aegovButtonClick.emit(event);
    }
  };

  private handleFocus = (event: FocusEvent) => {
    this.aegovButtonFocus.emit(event);
  };

  private handleBlur = (event: FocusEvent) => {
    this.aegovButtonBlur.emit(event);
  };

  /**
   * Get the CSS classes based on component props
   */
  private getButtonClasses(): string {
    const classes: string[] = [
      'aegov-btn'
    ];

    // Size classes
    const sizeClasses: Record<ButtonSize, string[]> = {
      xs: ['btn-xs'],
      sm: ['btn-sm'],
      base: ['btn-base'],
      lg: ['btn-lg'],
    };

    classes.push(...sizeClasses[this.size]);

    // Variant classes
    if (this.variant === 'solid') {
      classes.push(
        'btn-solid'
      );
    } else if (this.variant === 'outline') {
      classes.push(
        'btn-outline'
      );
    } else if (this.variant === 'soft') {
      classes.push(
        'btn-soft'
      );
    } else if (this.variant === 'link') {
      classes.push(
        'btn-link'
      );
    }

    // Appearance classes (color scheme)
    if (this.appearance === 'secondary') {
      classes.push('btn-secondary');
    }

    // Disabled state
    if (this.disabled || this.loading) {
      classes.push(
        'cursor-not-allowed',
        'pointer-events-none'
      );
    }

    // Icon only button
    if (this.icon) {
      classes.push(
        'btn-icon'
      );
    }

    // Full width
    if (this.full) {
      classes.push('w-full');
    }

    return classes.join(' ');
  }

  render() {
    return (
      <Host>
        <button
          part="button"
          type={this.type}
          class={this.getButtonClasses()}
          disabled={this.disabled || this.loading}
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          aria-disabled={this.disabled || this.loading ? 'true' : 'false'}
          aria-busy={this.loading ? 'true' : 'false'}
        >
          {this.loading && (
            <svg
              class="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          <slot></slot>
        </button>
      </Host>
    );
  }
}
