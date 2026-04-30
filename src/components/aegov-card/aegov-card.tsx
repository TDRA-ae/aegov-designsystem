import { Component, Host, h, Prop, Watch } from '@stencil/core';
import { CARD_BORDER_STYLES, CARD_BGS, CARD_HOVERS, CARD_SIZES } from '../../utils/types';
import type { CardBorderWidth, CardBg, CardHover, CardBorderStyle, CardSize } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { generateId } from '../../utils/id-generator';

const TAG = 'aegov-card';
const ctx = (prop: string) => ({ component: TAG, prop });

@Component({
  tag: 'aegov-card',
  styleUrl: 'aegov-card.css',
  scoped: false,
})
export class AegovCard {
  /**
   * Unique ID for the card element. Auto-generated if not provided.
   */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /**
   * Whether to apply inner padding (1.5rem / 24px). On by default.
   */
  @Prop() isPadding: boolean = true;

  /**
   * Border thickness: 1, 2, or 3.
   */
  @Prop() borderWidth: CardBorderWidth = 2;

  /**
   * Border style: 'standard' (solid primary-600), 'light' (solid primary-200), 'creative' (gradient from primary-400 to primary-800), or 'highlight' (solid aeblack-200 at rest, transitions to primary-300→700 gradient on hover).
   */
  @Prop() borderStyle: CardBorderStyle = 'standard';

  /**
   * Background style: 'white' (default) or 'subtle' (aeblack-50).
   */
  @Prop() bg: CardBg = 'white';

  /**
   * Hover effect: 'off' (none), 'standard' (border color change), or 'glow' (shadow glow).
   */
  @Prop() hover: CardHover = 'off';

  /**
   * Size: 'sm' (compact padding/radius), 'base' (default), or 'lg' (generous padding/radius). All sizes scale down responsively at md (768px) and xs (480px) breakpoints.
   */
  @Prop() size: CardSize = 'base';

  componentWillLoad() {
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-card');
    }
    warnIfInvalidEnumProp(this.borderStyle, CARD_BORDER_STYLES, 'standard', ctx('borderStyle'));
    warnIfInvalidEnumProp(this.bg, CARD_BGS, 'white', ctx('bg'));
    warnIfInvalidEnumProp(this.hover, CARD_HOVERS, 'off', ctx('hover'));
    warnIfInvalidEnumProp(this.size, CARD_SIZES, 'base', ctx('size'));
  }

  @Watch('borderStyle')
  onBorderStyleChange(v: unknown) { warnIfInvalidEnumProp(v, CARD_BORDER_STYLES, 'standard', ctx('borderStyle')); }

  @Watch('bg')
  onBgChange(v: unknown) { warnIfInvalidEnumProp(v, CARD_BGS, 'white', ctx('bg')); }

  @Watch('hover')
  onHoverChange(v: unknown) { warnIfInvalidEnumProp(v, CARD_HOVERS, 'off', ctx('hover')); }

  @Watch('size')
  onSizeChange(v: unknown) { warnIfInvalidEnumProp(v, CARD_SIZES, 'base', ctx('size')); }

  render() {
    const borderStyle: CardBorderStyle = (CARD_BORDER_STYLES as readonly string[]).includes(this.borderStyle) ? this.borderStyle : 'standard';
    const bg: CardBg = (CARD_BGS as readonly string[]).includes(this.bg) ? this.bg : 'white';
    const hover: CardHover = (CARD_HOVERS as readonly string[]).includes(this.hover) ? this.hover : 'off';
    const size: CardSize = (CARD_SIZES as readonly string[]).includes(this.size) ? this.size : 'base';

    const classes = [
      'aegov-card',
      `card-border-${this.borderWidth}`,
      `card-border-${borderStyle}`,
      `card-bg-${bg}`,
      `card__hover-${hover}`,
      `card-size-${size}`,
      this.isPadding ? 'card--padded' : '',
    ].filter(Boolean).join(' ');

    return (
      <Host>
        <div class={classes} id={this.fieldId}>
          <slot />
        </div>
      </Host>
    );
  }
}
