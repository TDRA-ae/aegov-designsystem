import { Component, Prop, h, Host } from '@stencil/core';
import type { TitleSize } from '../../utils/types';

/**
 * @slot default - The title content
 */
@Component({
  tag: 'aegov-title',
  styleUrl: 'aegov-title.css',
  scoped: true,
})
export class AegovTitle {
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
    return (
      <Host>
        <p class={this.getTitleClasses()}>
          <slot />
        </p>
      </Host>
    );
  }
}
