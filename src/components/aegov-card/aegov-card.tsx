import { Component, Host, h, Prop, Watch } from '@stencil/core';
import { CARD_BORDER_STYLES, CARD_BACKGROUNDS, CARD_HOVERS } from '../../utils/types';
import type { CardBorderWidth, CardBackground, CardHover, CardBorderStyle } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';

const TAG = 'aegov-card';
const ctx = (prop: string) => ({ component: TAG, prop });

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

  componentWillLoad() {
    warnIfInvalidEnumProp(this.borderStyle, CARD_BORDER_STYLES, 'standard', ctx('borderStyle'));
    warnIfInvalidEnumProp(this.background, CARD_BACKGROUNDS, 'white', ctx('background'));
    warnIfInvalidEnumProp(this.hover, CARD_HOVERS, 'off', ctx('hover'));
  }

  @Watch('borderStyle')
  onBorderStyleChange(v: unknown) { warnIfInvalidEnumProp(v, CARD_BORDER_STYLES, 'standard', ctx('borderStyle')); }

  @Watch('background')
  onBackgroundChange(v: unknown) { warnIfInvalidEnumProp(v, CARD_BACKGROUNDS, 'white', ctx('background')); }

  @Watch('hover')
  onHoverChange(v: unknown) { warnIfInvalidEnumProp(v, CARD_HOVERS, 'off', ctx('hover')); }

  render() {
    const borderStyle: CardBorderStyle = (CARD_BORDER_STYLES as readonly string[]).includes(this.borderStyle) ? this.borderStyle : 'standard';
    const background: CardBackground = (CARD_BACKGROUNDS as readonly string[]).includes(this.background) ? this.background : 'white';
    const hover: CardHover = (CARD_HOVERS as readonly string[]).includes(this.hover) ? this.hover : 'off';

    const classes = [
      'aegov-card',
      `card--border-${this.borderWidth}`,
      `card--border-${borderStyle}`,
      `card--bg-${background}`,
      `card--hover-${hover}`,
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
