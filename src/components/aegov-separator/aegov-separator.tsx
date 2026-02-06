import { Component, Host, h, Prop, Element } from '@stencil/core';

/**
 * A separator component for visually dividing sections of content
 *
 * @slot - Optional text label displayed at the center of the separator
 */
@Component({
  tag: 'aegov-separator',
  styleUrl: 'aegov-separator.css',
  scoped: true,
})
export class AegovSeparator {
  @Element() el: HTMLElement;
  /**
   * Orientation of the separator
   * @default 'horizontal'
   */
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Visual variant of the separator
   * @default 'default'
   */
  @Prop() variant: 'default' | 'subtle' = 'default';

  /**
   * Optional text label displayed at the center of the separator
   */
  @Prop() text?: string;

  /**
   * Whether the separator is purely decorative (no semantic meaning)
   * @default true
   */
  @Prop() decorative: boolean = true;

  render() {
    const hasText = this.text || this.el.textContent?.trim();
    const classes = {
      'separator': true,
      'separator--horizontal': this.orientation === 'horizontal',
      'separator--vertical': this.orientation === 'vertical',
      'separator--subtle': this.variant === 'subtle',
      'separator--with-text': !!hasText,
    };

    // If decorative, use presentational role, otherwise use separator role
    const role = this.decorative ? 'presentation' : 'separator';
    const ariaOrientation = this.orientation;

    if (hasText) {
      return (
        <Host>
          <div class={classes} role={role} aria-orientation={ariaOrientation}>
            <div class="separator__line"></div>
            <span class="separator__text">
              {this.text || <slot />}
            </span>
            <div class="separator__line"></div>
          </div>
        </Host>
      );
    }

    return (
      <Host>
        <hr class={classes} role={role} aria-orientation={ariaOrientation} />
      </Host>
    );
  }
}
