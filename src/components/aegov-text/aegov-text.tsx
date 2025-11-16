import { Component, Prop, h, Host } from '@stencil/core';
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
    return (
      <Host>
        <p class={this.getTextClasses()}>
          <slot />
        </p>
      </Host>
    );
  }
}
