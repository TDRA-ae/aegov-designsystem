import { Component, Host, h, Prop } from '@stencil/core';
import type { CardBorderWidth, CardBackground, CardHover, CardBorderStyle } from '../../utils/types';

@Component({
  tag: 'aegov-card',
  styleUrl: 'aegov-card.css',
  scoped: false,
})
export class AegovCard {
  /**
   * Disables inner padding (1.5rem / 24px). Padding is on by default.
   */
  @Prop() disallowPadding: boolean = false;

  /**
   * Border thickness: 1, 2, or 3.
   */
  @Prop() borderWidth: CardBorderWidth = 1;

  /**
   * Border style: 'standard' (solid primary-600), 'light' (solid primary-200), or 'creative' (gradient from primary-400 to primary-800).
   */
  @Prop() borderStyle: CardBorderStyle = 'standard';

  /**
   * Background style: 'white', 'transparent', or 'subtle' (slate-50).
   */
  @Prop() background: CardBackground = 'white';

  /**
   * Hover effect: 'off' (none), 'standard' (border color change), or 'glow' (shadow glow).
   */
  @Prop() hover: CardHover = 'off';

  render() {
    const classes = [
      'aegov-card',
      `card--border-${this.borderWidth}`,
      `card--border-${this.borderStyle}`,
      `card--bg-${this.background}`,
      `card--hover-${this.hover}`,
      !this.disallowPadding ? 'card--padded' : '',
    ].filter(Boolean).join(' ');

    return (
      <Host>
        <div class={classes}>
          <slot />
        </div>
      </Host>
    );
  }
}
