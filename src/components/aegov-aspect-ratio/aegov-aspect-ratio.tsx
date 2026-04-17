import { Component, Prop, Watch, Element, Host, h } from '@stencil/core';
import { AspectRatioPreset, AspectRatioFit, ASPECT_RATIO_FITS } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';

const TAG = 'aegov-aspect-ratio';
const ctx = (prop: string) => ({ component: TAG, prop });

/**
 * @component aegov-aspect-ratio
 * @description A layout component that enforces a specific aspect ratio on its
 * content. Supports images, videos, iframes, and arbitrary slotted content.
 * Responsive breakpoints can be applied via Tailwind utility classes on the
 * host element (e.g. `class="md:aspect-square lg:aspect-[21/9]"`).
 */
@Component({
  tag: 'aegov-aspect-ratio',
  styleUrl: 'aegov-aspect-ratio.css',
  scoped: false,
})
export class AegovAspectRatio {
  @Element() el!: HTMLElement;

  /**
   * The aspect ratio to apply. Accepts named presets ('auto', 'square',
   * 'video', '4/3', '3/2', '21/9') or any custom ratio string such as
   * '5/4' or '2.35/1'.
   * @default 'auto'
   */
  @Prop() ratio: AspectRatioPreset | string = 'auto';

  /**
   * How slotted media (img, video, iframe) should fit within the aspect
   * ratio container.
   * @default 'cover'
   */
  @Prop() fit: AspectRatioFit = 'cover';

  /**
   * Additional CSS classes to apply to the inner container. Useful for
   * responsive aspect-ratio overrides (e.g. 'md:aspect-square') or
   * background/border utilities.
   */
  @Prop({ attribute: 'inner-class' }) innerClass?: string;

  componentWillLoad() {
    warnIfInvalidEnumProp(this.fit, ASPECT_RATIO_FITS, 'cover', ctx('fit'));
  }

  @Watch('fit')
  onFitChange(v: unknown) { warnIfInvalidEnumProp(v, ASPECT_RATIO_FITS, 'cover', ctx('fit')); }

  private resolveRatio(): string {
    switch (this.ratio) {
      case 'auto':
        return 'auto';
      case 'square':
        return '1 / 1';
      case 'video':
        return '16 / 9';
      default:
        if (this.ratio.includes('/')) {
          const parts = this.ratio.split('/').map(s => s.trim());
          return `${parts[0]} / ${parts[1]}`;
        }
        return this.ratio;
    }
  }

  private getContainerClasses(): string {
    const classes = ['aegov-aspect-ratio'];
    if (this.innerClass) {
      classes.push(this.innerClass);
    }
    return classes.join(' ');
  }

  render() {
    const ratioStyle = { 'aspect-ratio': this.resolveRatio() };
    const fit: AspectRatioFit = (ASPECT_RATIO_FITS as readonly string[]).includes(this.fit) ? this.fit : 'cover';

    return (
      <Host>
        <div class={this.getContainerClasses()} style={ratioStyle} data-fit={fit}>
          <slot />
        </div>
      </Host>
    );
  }
}
