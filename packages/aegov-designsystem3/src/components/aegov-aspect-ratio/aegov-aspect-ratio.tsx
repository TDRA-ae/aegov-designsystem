import { Component, Prop, Watch, State, Element, Host, h } from '@stencil/core';
import { AspectRatioPreset, AspectRatioFit, ASPECT_RATIO_FITS } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';

const TAG = 'aegov-aspect-ratio';
const ctx = (prop: string) => ({ component: TAG, prop });

/**
 * Accepts named presets (`'auto'`, `'square'`, `'video'`) or any custom ratio
 * string such as `'5/4'`, `'21/9'`, `'2.35/1'`.
 */
const RATIO_PATTERN = /^[\d.]+\s*\/\s*[\d.]+$/;
const NAMED_RATIOS = new Set(['auto', 'square', 'video']);
function isValidRatio(value: string): boolean {
  return NAMED_RATIOS.has(value) || RATIO_PATTERN.test(value);
}

/**
 * @component aegov-aspect-ratio
 * @description A layout component that enforces a specific aspect ratio on its
 * content. Supports images, videos, iframes, and arbitrary slotted content.
 * The `ratio` prop supports Tailwind-style breakpoint prefixes — e.g.
 * `ratio="square md:video lg:21/9"` switches the ratio at each breakpoint.
 */
@Component({
  tag: 'aegov-aspect-ratio',
  styleUrl: 'aegov-aspect-ratio.css',
  scoped: false,
})
export class AegovAspectRatio {
  @Element() el!: HTMLElement;

  /**
   * The aspect ratio to apply. Accepts named presets (`'auto'`, `'square'`,
   * `'video'`) or any custom ratio string such as `'5/4'`, `'21/9'`,
   * `'2.35/1'`. Supports a Tailwind-style responsive string with breakpoint
   * prefixes, e.g. `"square md:video lg:21/9"`.
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
   * Additional CSS classes merged onto the inner aspect-ratio container.
   */
  @Prop() extraClass?: string;

  @State() private _resolvedRatio: string = 'auto';
  private _ratioWatcher: ResponsivePropWatcher | null = null;

  componentWillLoad() {
    warnIfInvalidEnumProp(this.fit, ASPECT_RATIO_FITS, 'cover', ctx('fit'));
    this._ratioWatcher = watchResponsiveProp(this.ratio, isValidRatio, 'auto', v => {
      this._resolvedRatio = v;
    });
    this._resolvedRatio = this._ratioWatcher.current;
  }

  componentDidLoad() {
    this.el.querySelectorAll('iframe').forEach(iframe => {
      if (!iframe.getAttribute('title')?.trim()) {
        console.warn('[aegov-aspect-ratio] Slotted <iframe> is missing a title attribute — add title="…" (WCAG SC 4.1.2).');
      }
    });
  }

  disconnectedCallback() {
    this._ratioWatcher?.destroy();
  }

  @Watch('fit')
  onFitChange(v: unknown) { warnIfInvalidEnumProp(v, ASPECT_RATIO_FITS, 'cover', ctx('fit')); }

  @Watch('ratio')
  onRatioChange() {
    this._ratioWatcher?.destroy();
    this._ratioWatcher = watchResponsiveProp(this.ratio, isValidRatio, 'auto', v => {
      this._resolvedRatio = v;
    });
    this._resolvedRatio = this._ratioWatcher.current;
  }

  private resolveRatio(): string {
    const value = this._resolvedRatio;
    switch (value) {
      case 'auto':
        return 'auto';
      case 'square':
        return '1 / 1';
      case 'video':
        return '16 / 9';
      default:
        if (value.includes('/')) {
          const parts = value.split('/').map(s => s.trim());
          return `${parts[0]} / ${parts[1]}`;
        }
        return value;
    }
  }

  render() {
    const ratioStyle = { 'aspect-ratio': this.resolveRatio() };
    const fit: AspectRatioFit = (ASPECT_RATIO_FITS as readonly string[]).includes(this.fit) ? this.fit : 'cover';
    const containerClass = ['aegov-aspect-ratio', this.extraClass || ''].filter(Boolean).join(' ');

    return (
      <Host>
        <div class={containerClass} style={ratioStyle} data-fit={fit}>
          <slot />
        </div>
      </Host>
    );
  }
}
