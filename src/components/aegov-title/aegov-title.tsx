import { Component, Prop, Element, h, Host } from '@stencil/core';
import type { TitleSize } from '../../utils/types';

/**
 * @slot default - The title content
 */
@Component({
  tag: 'aegov-title',
  styleUrl: 'aegov-title.css',
  scoped: false,
  shadow:false
})
export class AegovTitle {
  @Element() el: HTMLElement;

  /**
   * The size of the title text.
   * @default 'base'
   */
  @Prop() size: TitleSize = 'lg';

  /**
   * Additional CSS classes to apply to the title.
   */
  @Prop() class?: string;

  /**
   * Get aria-*, data-*, and id attributes from the host element to pass through to the paragraph
   */
  private getPassThroughAttributes(): { [key: string]: string } {
    const passThroughAttrs: { [key: string]: string } = {};

    // Get all attributes from the host element
    Array.from(this.el.attributes).forEach(attr => {
      // Pass through aria-*, data-*, and id attributes
      if (attr.name.startsWith('aria-') || attr.name.startsWith('data-') || attr.name === 'id') {
        passThroughAttrs[attr.name] = attr.value;
      }
    });

    return passThroughAttrs;
  }

  /**
   * Get the CSS classes based on component props
   */
  private getTitleClasses(): string {
    const classes: string[] = ['font-bold','mt-0'];

    // Size classes
    const sizeClasses: Record<TitleSize, string> = {
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
    };

    classes.push(sizeClasses[this.size]);

    // Merge with custom classes if provided
    if (this.class) {
      classes.push(this.class);
    }

    return classes.join(' ');
  }

  render() {
    const passThroughAttributes = this.getPassThroughAttributes();

    return (
      <Host>
        <p class={this.getTitleClasses()} {...passThroughAttributes}>
          <slot />
        </p>
      </Host>
    );
  }
}
