import { Component, Element, Host, h, Prop, State, Watch } from '@stencil/core';
import { BENTO_GAPS, BENTO_FLOWS } from '../../utils/types';
import type { BentoGap, BentoFlow } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import { generateId } from '../../utils/id-generator';
import { getPassThroughAttributes } from '../../utils/attributes';

const TAG = 'aegov-bento-grid';
const ctx = (prop: string) => ({ component: TAG, prop });

const COLS_MIN = 1;
const COLS_MAX = 12;
const ROWS_MIN = 1;
const ROWS_MAX = 6;

const GAP_REM: Record<BentoGap, string> = {
  none: '0',
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
};

const isPositiveIntString = (v: string): boolean => /^[0-9]+$/.test(v) && parseInt(v, 10) >= 1;

/**
 * Bento grid layout container for grouping `aegov-card` elements into a
 * balanced-but-non-uniform arrangement.
 *
 * @slot - aegov-card elements (or any direct children) to arrange in the grid.
 */
@Component({
  tag: 'aegov-bento-grid',
  styleUrl: 'aegov-bento-grid.css',
  scoped: false,
})
export class AegovBentoGrid {
  @Element() el!: HTMLElement;

  /**
   * Optional id reflected on the inner wrapper. Auto-generated if not provided.
   */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /**
   * Number of columns. Tailwind-style breakpoint syntax supported,
   * e.g. `cols="1 md:2 lg:4"`. Use `cols="1 md:..."` to stack on mobile.
   */
  @Prop() cols: string = '1 md:2 lg:3';
  @State() private _resolvedCols: number = 1;
  private _colsWatcher: ResponsivePropWatcher | null = null;

  /**
   * Gap between cards. Named sizes: 'none', 'xs', 'sm', 'md', 'lg', 'xl'.
   * Responsive syntax supported: `gap="sm md:md lg:lg"`.
   */
  @Prop() gap: string = 'md';
  @State() private _resolvedGap: BentoGap = 'md';
  private _gapWatcher: ResponsivePropWatcher | null = null;

  /**
   * Auto-flow mode. 'dense' fills holes left by larger spans (bento packing),
   * 'row' keeps strict DOM order.
   */
  @Prop() flow: BentoFlow = 'dense';

  private _mutationObserver: MutationObserver | null = null;
  private _wrapper?: HTMLElement;

  componentWillLoad() {
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-bento-grid');
    }
    warnIfInvalidEnumProp(this.flow, BENTO_FLOWS, 'dense', ctx('flow'));

    this._colsWatcher = watchResponsiveProp(
      this.cols,
      isPositiveIntString,
      '1',
      v => {
        this._resolvedCols = this._clampCols(parseInt(v, 10));
        if (this.el.isConnected) {
          this.applyChildSpans();
        }
      },
    );
    this._resolvedCols = this._clampCols(parseInt(this._colsWatcher.current, 10) || 1);

    this._gapWatcher = watchResponsiveProp(
      this.gap,
      BENTO_GAPS,
      'md',
      v => {
        this._resolvedGap = v as BentoGap;
      },
    );
    this._resolvedGap = this._gapWatcher.current as BentoGap;
  }

  componentDidLoad() {
    this.applyChildSpans();
    this.observeChildAttributeChanges();
  }

  componentDidUpdate() {
    this.applyChildSpans();
  }

  disconnectedCallback() {
    this._colsWatcher?.destroy();
    this._gapWatcher?.destroy();
    this._mutationObserver?.disconnect();
    this._mutationObserver = null;
  }

  @Watch('cols')
  watchCols() {
    this._colsWatcher?.destroy();
    this._colsWatcher = watchResponsiveProp(
      this.cols,
      isPositiveIntString,
      '1',
      v => {
        this._resolvedCols = this._clampCols(parseInt(v, 10));
        if (this.el.isConnected) {
          this.applyChildSpans();
        }
      },
    );
    this._resolvedCols = this._clampCols(parseInt(this._colsWatcher.current, 10) || 1);
  }

  @Watch('gap')
  watchGap() {
    this._gapWatcher?.destroy();
    this._gapWatcher = watchResponsiveProp(
      this.gap,
      BENTO_GAPS,
      'md',
      v => {
        this._resolvedGap = v as BentoGap;
      },
    );
    this._resolvedGap = this._gapWatcher.current as BentoGap;
  }

  @Watch('flow')
  watchFlow(v: unknown) {
    warnIfInvalidEnumProp(v, BENTO_FLOWS, 'dense', ctx('flow'));
  }

  private _clampCols(n: number): number {
    if (!Number.isFinite(n) || n < COLS_MIN) return COLS_MIN;
    if (n > COLS_MAX) return COLS_MAX;
    return n;
  }

  private getDirectChildren(): HTMLElement[] {
    // Stencil's slot handling may move light-DOM children into the inner
    // wrapper. Look there first, then fall back to the host element if the
    // wrapper hasn't been mounted (e.g. before first render in spec env).
    const source = this._wrapper ?? this.el;
    return Array.from(source.children).filter(
      child =>
        child.tagName !== 'STYLE' &&
        child.tagName !== 'SCRIPT' &&
        child.tagName !== 'SLOT' &&
        // Exclude the inner wrapper itself if the host is the source
        !(source === this.el && child === this._wrapper),
    ) as HTMLElement[];
  }

  /**
   * Resolve a span data-attribute value (which may use responsive syntax)
   * at the current viewport, then clamp to the given range.
   */
  private resolveSpan(raw: string | null, max: number, min: number): number {
    if (!raw) return 1;
    const parts = raw.trim().split(/\s+/);
    let base = 1;
    let resolved = 1;
    let bestMinWidth = -1;

    for (const part of parts) {
      const colonIdx = part.indexOf(':');
      if (colonIdx === -1) {
        if (isPositiveIntString(part)) base = parseInt(part, 10);
        continue;
      }
      const bpName = part.slice(0, colonIdx);
      const val = part.slice(colonIdx + 1);
      if (!isPositiveIntString(val)) continue;
      const px = this.readBreakpointPx(bpName);
      if (px === null) continue;
      if (typeof window !== 'undefined' && window.matchMedia(`(min-width: ${px}px)`).matches) {
        if (px > bestMinWidth) {
          bestMinWidth = px;
          resolved = parseInt(val, 10);
        }
      }
    }

    const value = bestMinWidth === -1 ? base : resolved;
    if (value < min) return min;
    if (value > max) return max;
    return value;
  }

  private readBreakpointPx(name: string): number | null {
    if (typeof document === 'undefined') return null;
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue(`--breakpoint-${name}`)
      .trim();
    if (!raw) return null;
    const px = parseFloat(raw);
    return Number.isFinite(px) ? px : null;
  }

  private applyChildSpans() {
    const children = this.getDirectChildren();
    const colMax = Math.min(COLS_MAX, this._resolvedCols);

    children.forEach(child => {
      const colSpanRaw = child.getAttribute('data-col-span');
      const rowSpanRaw = child.getAttribute('data-row-span');

      const colSpan = this.resolveSpan(colSpanRaw, colMax, 1);
      const rowSpan = this.resolveSpan(rowSpanRaw, ROWS_MAX, ROWS_MIN);

      if (colSpan > 1) {
        child.style.gridColumn = `span ${colSpan} / span ${colSpan}`;
      } else {
        child.style.gridColumn = '';
      }

      if (rowSpan > 1) {
        child.style.gridRow = `span ${rowSpan} / span ${rowSpan}`;
      } else {
        child.style.gridRow = '';
      }
    });
  }

  private observeChildAttributeChanges() {
    if (typeof MutationObserver === 'undefined') return;
    this._mutationObserver = new MutationObserver(mutations => {
      const relevant = mutations.some(m => {
        if (m.type !== 'attributes') return m.type === 'childList';
        return m.attributeName === 'data-col-span' || m.attributeName === 'data-row-span';
      });
      if (relevant) this.applyChildSpans();
    });
    this._mutationObserver.observe(this.el, {
      attributes: true,
      attributeFilter: ['data-col-span', 'data-row-span'],
      childList: true,
      subtree: true,
    });
  }

  render() {
    const flow: BentoFlow = (BENTO_FLOWS as readonly string[]).includes(this.flow)
      ? this.flow
      : 'dense';

    const style = {
      '--bento-cols': String(this._resolvedCols),
      '--bento-gap': GAP_REM[this._resolvedGap] ?? GAP_REM.md,
      '--bento-flow': flow,
    } as { [key: string]: string };

    const passThroughAttributes = getPassThroughAttributes(this.el, new Set(['id']));

    return (
      <Host>
        <div
          {...passThroughAttributes}
          ref={el => (this._wrapper = el)}
          class="aegov-bento-grid"
          id={this.fieldId}
          role="group"
          style={style}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
