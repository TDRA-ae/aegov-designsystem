import { Component, Host, h, Prop, Watch, Element } from '@stencil/core';
import { SEPARATOR_ORIENTATIONS, SEPARATOR_APPEARANCES, SEPARATOR_VARIANTS } from '../../utils/types';
import type { SeparatorOrientation, SeparatorAppearance, SeparatorVariant } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';

const TAG = 'aegov-separator';
const ctx = (prop: string) => ({ component: TAG, prop });

/**
 * A separator component for visually dividing sections of content
 *
 * @slot - Optional text label displayed at the center of the separator
 */
@Component({
  tag: 'aegov-separator',
  styleUrl: 'aegov-separator.css',
  scoped: false,
})
export class AegovSeparator {
  @Element() el!: HTMLElement;

  /**
   * Orientation of the separator
   * @default 'horizontal'
   */
  @Prop() orientation: SeparatorOrientation = 'horizontal';

  /**
   * Appearance: 'solid' (full-strength line) or 'light' (subtle low-contrast line). Colour resolves from `variant`.
   * @default 'solid'
   */
  @Prop() appearance: SeparatorAppearance = 'solid';

  /**
   * Variant: colour family applied to line + text label. 'primary' (default), 'secondary', 'neutral-max' (aeblack-800 family), or 'neutral-min' (aeblack-100 family).
   * @default 'primary'
   */
  @Prop() variant: SeparatorVariant = 'primary';

  /**
   * Optional text label displayed at the center of the separator
   */
  @Prop() text?: string;

  /**
   * Whether the separator is purely decorative (no semantic meaning)
   * @default true
   */
  @Prop() isDecorative: boolean = true;

  /**
   * Additional CSS classes merged onto the inner separator element.
   */
  @Prop() extraClass?: string;

  componentWillLoad() {
    warnIfInvalidEnumProp(this.orientation, SEPARATOR_ORIENTATIONS, 'horizontal', ctx('orientation'));
    warnIfInvalidEnumProp(this.appearance, SEPARATOR_APPEARANCES, 'solid', ctx('appearance'));
    warnIfInvalidEnumProp(this.variant, SEPARATOR_VARIANTS, 'primary', ctx('variant'));
  }

  @Watch('orientation')
  onOrientationChange(v: unknown) { warnIfInvalidEnumProp(v, SEPARATOR_ORIENTATIONS, 'horizontal', ctx('orientation')); }

  @Watch('appearance')
  onAppearanceChange(v: unknown) { warnIfInvalidEnumProp(v, SEPARATOR_APPEARANCES, 'solid', ctx('appearance')); }

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, SEPARATOR_VARIANTS, 'primary', ctx('variant')); }

  render() {
    const orientation: SeparatorOrientation = (SEPARATOR_ORIENTATIONS as readonly string[]).includes(this.orientation) ? this.orientation : 'horizontal';
    const appearance: SeparatorAppearance = (SEPARATOR_APPEARANCES as readonly string[]).includes(this.appearance) ? this.appearance : 'solid';
    const variant: SeparatorVariant = (SEPARATOR_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'primary';

    const hasText = this.text || this.el.textContent?.trim();
    const classes = {
      'aegov-separator': true,
      [`separator--${orientation}`]: true,
      [`separator-appearance-${appearance}`]: true,
      [`separator-variant-${variant}`]: true,
      'separator--with-text': !!hasText,
      ...(this.extraClass ? { [this.extraClass]: true } : {}),
    };

    const role = this.isDecorative ? 'presentation' : 'separator';
    const ariaOrientation = orientation;

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
