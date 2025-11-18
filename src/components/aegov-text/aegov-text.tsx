import { Component, Prop, Element, h, Host } from '@stencil/core';
import type { TextSize } from '../../utils/types';

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
  private getTextClasses(): string {
    const classes: string[] = ['mb-8','mt-0'];

    // Size classes
    const sizeClasses: Record<TextSize, string> = {
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
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
        <p class={this.getTextClasses()} {...passThroughAttributes}>
          <slot />
        </p>
      </Host>
    );
  }
}
