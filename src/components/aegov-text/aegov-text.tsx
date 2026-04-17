import { Component, Prop, Watch, Element, h, Host } from '@stencil/core';
import { TEXT_SIZES } from '../../utils/types';
import type { TextSize } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';

const TAG = 'aegov-text';
const ctx = (prop: string) => ({ component: TAG, prop });

/**
 * @slot default - The text content
 */
@Component({
  tag: 'aegov-text',
  styleUrl: 'aegov-text.css',
  scoped: false,
  shadow:false
})
export class AegovText {
  @Element() el: HTMLElement;

  /**
   * The size of the text.
   * @default 'base'
   */
  @Prop() size: TextSize = 'base';

  /**
   * Additional CSS classes to apply to the text.
   */
  @Prop() class?: string;

  private static readonly PASS_THROUGH_ATTRS = new Set(['id']);

  componentWillLoad() {
    warnIfInvalidEnumProp(this.size, TEXT_SIZES, 'base', ctx('size'));
  }

  @Watch('size')
  onSizeChange(v: unknown) { warnIfInvalidEnumProp(v, TEXT_SIZES, 'base', ctx('size')); }

  /**
   * Get the CSS classes based on component props
   */
  private getTextClasses(): string {
    const classes: string[] = ['mb-8','mt-0'];

    // Size classes
    const sizeClasses: Record<TextSize, string> = {
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
    };

    const size: TextSize = (TEXT_SIZES as readonly string[]).includes(this.size) ? this.size : 'base';
    classes.push(sizeClasses[size]);

    // Merge with custom classes if provided
    if (this.class) {
      classes.push(this.class);
    }

    return classes.join(' ');
  }

  render() {
    const passThroughAttributes = getPassThroughAttributes(this.el, AegovText.PASS_THROUGH_ATTRS);

    return (
      <Host>
        <p class={this.getTextClasses()} {...passThroughAttributes}>
          <slot />
        </p>
      </Host>
    );
  }
}
