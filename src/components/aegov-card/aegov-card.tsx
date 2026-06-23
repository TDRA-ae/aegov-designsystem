import { Component, Element, Host, h, Prop, Watch } from '@stencil/core';
import { CARD_APPEARANCES, CARD_VARIANTS, CARD_HOVERS, CARD_SIZES } from '../../utils/types';
import type { CardBorderWidth, CardHover, CardAppearance, CardVariant, CardSize } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { generateId } from '../../utils/id-generator';
import { getPassThroughAttributes } from '../../utils/attributes';

const TAG = 'aegov-card';
const ctx = (prop: string) => ({ component: TAG, prop });

@Component({
  tag: 'aegov-card',
  styleUrl: 'aegov-card.css',
  scoped: false,
})
export class AegovCard {
  @Element() el: HTMLElement;

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
   * Appearance: 'solid' (full-strength border), 'light' (subtle low-contrast border), or 'creative' (gradient border via CSS mask). Border colour resolves from `variant`.
   */
  @Prop() appearance: CardAppearance = 'solid';

  /**
   * Variant: colour family applied to border + glow. 'primary' (default), 'secondary', 'neutral-max' (aeblack-800 family), or 'neutral-min' (aeblack-100 family).
   */
  @Prop() variant: CardVariant = 'primary';

  /**
   * Hover effect: 'off' (none), 'standard' (border color change), or 'glow' (shadow glow).
   */
  @Prop() hover: CardHover = 'off';

  /**
   * Size: 'sm' (compact padding/radius), 'base' (default), or 'lg' (generous padding/radius). All sizes scale down responsively at md (768px) and xs (480px) breakpoints.
   */
  @Prop() size: CardSize = 'base';

  /**
   * Number of grid columns this card should span inside an `aegov-bento-grid`.
   * Supports responsive syntax, e.g. `"1 md:2 lg:3"`. Reflected as the
   * `data-col-span` attribute so the parent grid can read it correctly even
   * when set via JSX camelCase (`dataColSpan`).
   */
  @Prop({ reflect: true }) dataColSpan?: string;

  /**
   * Number of grid rows this card should span inside an `aegov-bento-grid`.
   * Supports responsive syntax, e.g. `"1 md:2"`. Reflected as the
   * `data-row-span` attribute so the parent grid can read it correctly even
   * when set via JSX camelCase (`dataRowSpan`).
   */
  @Prop({ reflect: true }) dataRowSpan?: string;

  componentWillLoad() {
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-card');
    }
    warnIfInvalidEnumProp(this.appearance, CARD_APPEARANCES, 'solid', ctx('appearance'));
    warnIfInvalidEnumProp(this.variant, CARD_VARIANTS, 'primary', ctx('variant'));
    warnIfInvalidEnumProp(this.hover, CARD_HOVERS, 'off', ctx('hover'));
    warnIfInvalidEnumProp(this.size, CARD_SIZES, 'base', ctx('size'));
  }

  @Watch('appearance')
  onAppearanceChange(v: unknown) { warnIfInvalidEnumProp(v, CARD_APPEARANCES, 'solid', ctx('appearance')); }

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, CARD_VARIANTS, 'primary', ctx('variant')); }

  @Watch('hover')
  onHoverChange(v: unknown) { warnIfInvalidEnumProp(v, CARD_HOVERS, 'off', ctx('hover')); }

  @Watch('size')
  onSizeChange(v: unknown) { warnIfInvalidEnumProp(v, CARD_SIZES, 'base', ctx('size')); }

  render() {
    const appearance: CardAppearance = (CARD_APPEARANCES as readonly string[]).includes(this.appearance) ? this.appearance : 'solid';
    const variant: CardVariant = (CARD_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'primary';
    const hover: CardHover = (CARD_HOVERS as readonly string[]).includes(this.hover) ? this.hover : 'off';
    const size: CardSize = (CARD_SIZES as readonly string[]).includes(this.size) ? this.size : 'base';

    const outerClasses = [
      'aegov-card',
      `card-border-${this.borderWidth}`,
      `card-appearance-${appearance}`,
      `card-variant-${variant}`,
      `card__hover-${hover}`,
      `card-size-${size}`,
      this.isPadding ? 'card--padded' : '',
    ].filter(Boolean).join(' ');

    const passThroughAttributes = getPassThroughAttributes(this.el);

    return (
      <Host class={`card-size-host-${size}`}>
        <div {...passThroughAttributes} class={outerClasses} id={this.fieldId}>
          <div class="card__inner">
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
