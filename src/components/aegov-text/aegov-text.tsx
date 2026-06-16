import { Component, Prop, Watch, State, Element, h, Host } from '@stencil/core';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import { TEXT_SIZES } from '../../utils/types';
import type { TextSize } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';

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
  @Prop() size: string = 'base';

  @State() private _resolvedSize: TextSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /**
   * Additional CSS classes to apply to the text.
   */
  @Prop() extraClass?: string;

  componentWillLoad() {
    this._sizeWatcher = watchResponsiveProp(this.size, TEXT_SIZES, 'base', v => {
      this._resolvedSize = v as TextSize;
    });
    this._resolvedSize = this._sizeWatcher.current as TextSize;
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, TEXT_SIZES, 'base', v => {
      this._resolvedSize = v as TextSize;
    });
    this._resolvedSize = this._sizeWatcher.current as TextSize;
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

    const size: TextSize = this._resolvedSize;
    classes.push(sizeClasses[size]);

    // Merge with custom classes if provided
    if (this.extraClass) {
      classes.push(this.extraClass);
    }

    return classes.join(' ');
  }

  render() {
    const passThroughAttributes = getPassThroughAttributes(this.el);

    return (
      <Host>
        <p class={this.getTextClasses()} {...passThroughAttributes}>
          <slot />
        </p>
      </Host>
    );
  }
}
