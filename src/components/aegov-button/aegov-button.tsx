import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import type { ButtonVariant, ButtonSize, ButtonType } from '../../utils/types';

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
   * Whether the button is disabled
   * @default false
   */
  @Prop() disabled: boolean = false;

  /**
   * Whether the button should take full width
   * @default false
   */
  @Prop() fullWidth: boolean = false;

  /**
   * Whether the button is in a loading state
   * @default false
   */
  @Prop() loading: boolean = false;

  /**
   * Emitted when the button is clicked
   */
  @Event() aegovClick: EventEmitter<MouseEvent>;

  /**
   * Emitted when the button receives focus
   */
  @Event() aegovFocus: EventEmitter<FocusEvent>;

  /**
   * Emitted when the button loses focus
   */
  @Event() aegovBlur: EventEmitter<FocusEvent>;

  private handleClick = (event: MouseEvent) => {
    if (!this.disabled && !this.loading) {
      this.aegovClick.emit(event);
    }
  };

  private handleFocus = (event: FocusEvent) => {
    this.aegovFocus.emit(event);
  };

  private handleBlur = (event: FocusEvent) => {
    this.aegovBlur.emit(event);
  };

  /**
   * Get the CSS classes based on component props
   */
  private getButtonClasses(): string {
    const classes: string[] = [
      'aegov-button',
      'button-transition',
      'inline-flex',
      'items-center',
      'justify-center',
      'font-medium',
      'focus:outline-none',
      'transition-all',
      'duration-200',
      'ease-in-out',
    ];

    // Size classes
    const sizeClasses: Record<ButtonSize, string[]> = {
      xs: ['text-xs', 'px-2.5', 'py-1.5', 'gap-1', 'rounded'],
      sm: ['text-sm', 'px-3', 'py-2', 'gap-1.5', 'rounded-md'],
      base: ['text-base', 'px-4', 'py-2.5', 'gap-2', 'rounded-lg'],
      lg: ['text-lg', 'px-6', 'py-3', 'gap-2.5', 'rounded-lg'],
    };

    classes.push(...sizeClasses[this.size]);

    // Variant classes
    if (this.variant === 'solid') {
      classes.push(
        'bg-primary-600',
        'text-white',
        'border-2',
        'border-transparent',
        'hover:bg-primary-700',
        'active:bg-primary-800',
        'focus:ring-2',
        'focus:ring-primary-500',
        'focus:ring-offset-2'
      );
    } else if (this.variant === 'outline') {
      classes.push(
        'bg-transparent',
        'text-primary-700',
        'border-2',
        'border-primary-600',
        'hover:bg-primary-50',
        'hover:border-primary-700',
        'active:bg-primary-100',
        'focus:ring-2',
        'focus:ring-primary-500',
        'focus:ring-offset-2'
      );
    }

    // Disabled state
    if (this.disabled || this.loading) {
      classes.push(
        'opacity-50',
        'cursor-not-allowed',
        'pointer-events-none'
      );
    }

    // Full width
    if (this.fullWidth) {
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
