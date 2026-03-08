import { Component, Prop, Event, EventEmitter, Element, h, Host } from '@stencil/core';
import type { ButtonVariant, ButtonSize, ButtonType, ButtonAppearance, ButtonGroupOrientation, ButtonGroupPosition } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';

/**
 * @slot - Button content
 * @part button - The native button element
 */
@Component({
  tag: 'aegov-button',
  styleUrl: 'aegov-button.css',
  scoped: false,
  shadow:false
})
export class AegovButton {
  @Element() el: HTMLElement;
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
   * Internal: Position of this button within a button group
   * @internal
   */
  @Prop() groupPosition?: ButtonGroupPosition;

  /**
   * Internal: The orientation of the button group this button belongs to
   * @internal
   */
  @Prop() groupOrientation?: ButtonGroupOrientation;

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
      lg: ['btn-lg']
    };

    classes.push(...sizeClasses[this.size]);
    
    const variantClasses: Record<ButtonVariant, string[]> = {
      solid: ['btn-solid'],
      outline: ['btn-outline'],
      soft: ['btn-soft'],
      link: ['btn-link']
    };

    classes.push(...variantClasses[this.variant]);

    const appearanceClasses: Record<ButtonAppearance, string[]> = {
      primary: ['btn-primary'],
      secondary: ['btn-secondary'],
      danger: ['btn-danger'],
      neutralMin: ['btn-neutral-min'],
      neutralMax: ['btn-neutral-max']
    };

    classes.push(...appearanceClasses[this.appearance]);
    

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

    // bold management
    if (this.bold) {
      classes.push('font-medium');
    }

    // Button group styling
    if (this.groupPosition && this.groupOrientation) {
      const orient = this.groupOrientation;
      classes.push(`btn-grouped-${orient}`);

      if (this.groupPosition === 'single') {
        classes.push('btn-grouped-single');
      } else {
        classes.push(`btn-grouped-${this.groupPosition}-${orient}`);
      }
    }

    return classes.join(' ');
  }

  render() {
    const passThroughAttributes = getPassThroughAttributes(this.el);

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
          {...passThroughAttributes}
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
