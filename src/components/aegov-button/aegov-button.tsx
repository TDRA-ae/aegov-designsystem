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
  shadow:false
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
   * @default true
   */
  @Prop() full: boolean = false;

  /**
   * Whether the button should have bold text or not
   * @default false
   */
  @Prop() bold: boolean = true;

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
      'aegov-btn',
      'relative',
      'inline-flex',
      'shrink-0',
      'cursor-pointer',
      'select-none',
      'flex-wrap',
      'items-center',
      'justify-center',
      'whitespace-nowrap',
      'no-underline',
      'transition-all',
      'duration-200',
      'ease-in-out',
      'disabled:cursor-default',
      'disabled:pointer-events-none'
    ];

    // Size classes
    const sizeClasses: Record<ButtonSize, string[]> = {
      xs: ['btn-xs','h-8','rounded','gap-2','px-2.5','text-sm'],
      sm: ['btn-sm','h-10','rounded-md','gap-2','px-3.5','text-base'],
      base: ['btn-base','h-12','rounded-lg','gap-2','px-4','text-base'],
      lg: ['btn-lg','h-13','rounded-lg','gap-3','px-4.5','text-lg']
    };

    classes.push(...sizeClasses[this.size]);
    
    if (this.variant === 'solid') {
      classes.push(
        'shadow-[inset_0px_1px_--theme(--color-whitely-50/.2)]', 
        'disabled:opacity-30',
        'text-whitely-50',
        'border-1',
        'focus:outline-offset-2',
        'focus:outline-3'
      );
    } else {
      classes.push(
        'disabled:opacity-50'
      );
    }
    if (this.variant === 'outline') {
      classes.push(
        'bg-transparent', 
        'border-2',
        'focus:-outline-offset-0',
        'focus:outline-2'
      );
    }
    if (this.variant === 'soft') {
      classes.push(
        'border-0',
        'focus:outline-offset-0',
        'focus:outline-3'
      );
    }
    if (this.variant === 'link') {
      classes.push(
        'bg-transparent', 
        'border-0',
        'hover:underline',
        'focus:outline-offset-0',
        'focus:outline-3'
      );
    }
    
    // Variant with appereance classes
    if (this.appearance === 'primary' && this.variant === 'solid') {
      classes.push(
        'bg-primary-600',
        'hover:bg-primary-500',
        'border-primary-600',
        'hover:border-primary-500'
      );
    } else if (this.appearance === 'primary' && this.variant === 'outline') {
      classes.push(
        'hover:bg-primary-50', 
        'text-primary-600', 
        'hover:text-primary-700', 
        'border-primary-600', 
        'hover:border-primary-700',
        'focus:border-primary-support-600'
      );
    } else if (this.appearance === 'primary' && this.variant === 'soft') {
      classes.push(
        'bg-primary-50', 
        'hover:bg-primary-100', 
        'text-primary-700', 
        'hover:text-primary-800'
      );
    } else if (this.appearance === 'primary' && this.variant === 'link') {
      classes.push(
        'text-primary-600', 
        'hover:text-primary-700'
      );
    } if (this.appearance === 'secondary' && this.variant === 'solid') {
      classes.push(
        'bg-secondary-800', 
        'hover:bg-secondary-700',
        'border-secondary-800',
        'hover:border-secondary-700'
      );
    } else if (this.appearance === 'secondary' && this.variant === 'outline') {
      classes.push(
        'hover:bg-secondary-50', 
        'text-secondary-800', 
        'hover:text-secondary-900',
        'border-secondary-800', 
        'hover:border-secondary-900',
        'focus:border-secondary-support-600',
      );
    } else if (this.appearance === 'secondary' && this.variant === 'soft') {
      classes.push(
        'bg-secondary-50', 
        'hover:bg-secondary-100', 
        'text-secondary-800', 
        'hover:text-secondary-900',
      );
    } else if (this.appearance === 'secondary' && this.variant === 'link') {
      classes.push(
        'text-secondary-800', 
        'hover:text-secondary-900'
      );
    }
    if (this.appearance === 'primary') {
      classes.push(
        'outline-primary-support-600'
      );
    } else if (this.appearance === 'secondary') {
      classes.push(
        'outline-secondary-support-600'
      );
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
        'btn-icon w-12 gap-0 px-0'
      );
    }

    // Full width
    if (this.full) {
      classes.push('w-full');
    }

    // bold management
    if (this.bold) {
      classes.push('font-medium');
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
            <svg class="mr-1 -ml-1 !size-5 animate-spin text-whitely-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          )}
          <slot></slot>
        </button>
      </Host>
    );
  }
}
