import { Component, Prop, Watch, State, Element, h, Host } from '@stencil/core';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import { TITLE_SIZES } from '../../utils/types';
import type { TitleSize, TitleHeadingType } from '../../utils/types';
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
   * @default 'base'
   */
  @Prop() size: string = 'base';

  @State() private _resolvedSize: TitleSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /**
   * The semantic wrapper tag for the title. When set, renders the title
   * inside the specified heading tag (`h2`–`h6`) or a `p`. When omitted,
   * the title renders as a `<p>` (default).
   */
  @Prop() headingType?: TitleHeadingType;

  /**
   * Additional CSS classes to apply to the title.
   */
  @Prop() extraClass?: string;

  private static readonly PASS_THROUGH_ATTRS = new Set(['id']);

  componentWillLoad() {
    this._sizeWatcher = watchResponsiveProp(this.size, TITLE_SIZES, 'base', v => {
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
    this._sizeWatcher = watchResponsiveProp(this.size, TITLE_SIZES, 'base', v => {
      this._resolvedSize = v as TitleSize;
    });
    this._resolvedSize = this._sizeWatcher.current as TitleSize;
  }

  /**
   * Get the CSS classes based on component props
   */
  private getTitleClasses(): string {
    const classes: string[] = ['font-bold!', 'mt-0!', 'mb-0!','font-inter!','rtl:font-alexandria!'];

    // Size classes — `!` forces override of global h1–h6 base styles.
    const sizeClasses: Record<TitleSize, string> = {
      sm: 'text-base!',
      base: 'text-lg!',
      lg: 'text-xl!',
      xl: 'text-2xl!',
      '2xl': 'text-3xl!'
    };

    const size: TitleSize = this._resolvedSize;
    classes.push(sizeClasses[size]);

    // Merge with custom classes if provided
    if (this.extraClass) {
      classes.push(this.extraClass);
    }

    return classes.join(' ');
  }

  render() {
    const passThroughAttributes = getPassThroughAttributes(this.el, AegovTitle.PASS_THROUGH_ATTRS);
    const Tag: any = this.headingType || 'p';

    return (
      <Host>
        <Tag class={this.getTitleClasses()} {...passThroughAttributes}>
          <slot />
        </Tag>
      </Host>
    );
  }
}
