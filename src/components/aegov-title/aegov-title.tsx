import { Component, Prop, Watch, State, Element, h, Host } from '@stencil/core';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import { TITLE_SIZES } from '../../utils/types';
import type { TitleSize } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';

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
   * @default 'lg'
   */
  @Prop() size: string = 'lg';

  @State() private _resolvedSize: TitleSize = 'lg';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /**
   * Additional CSS classes to apply to the title.
   */
  @Prop() class?: string;

  private static readonly PASS_THROUGH_ATTRS = new Set(['id']);

  componentWillLoad() {
    this._sizeWatcher = watchResponsiveProp(this.size, TITLE_SIZES, 'lg', v => {
      this._resolvedSize = v as TitleSize;
    });
    this._resolvedSize = this._sizeWatcher.current as TitleSize;
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, TITLE_SIZES, 'lg', v => {
      this._resolvedSize = v as TitleSize;
    });
    this._resolvedSize = this._sizeWatcher.current as TitleSize;
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

    const size: TitleSize = this._resolvedSize;
    classes.push(sizeClasses[size]);

    // Merge with custom classes if provided
    if (this.class) {
      classes.push(this.class);
    }

    return classes.join(' ');
  }

  render() {
    const passThroughAttributes = getPassThroughAttributes(this.el, AegovTitle.PASS_THROUGH_ATTRS);

    return (
      <Host>
        <p class={this.getTitleClasses()} {...passThroughAttributes}>
          <slot />
        </p>
      </Host>
    );
  }
}
