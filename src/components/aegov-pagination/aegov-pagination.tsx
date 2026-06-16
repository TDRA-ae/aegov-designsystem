import { Component, Element, Prop, State, Event, EventEmitter, h, Watch } from '@stencil/core';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import { PAGINATION_SIZES, PAGINATION_VARIANTS } from '../../utils/types';
import type { PaginationSize, PaginationVariant } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { generateId } from '../../utils/id-generator';
import { getPassThroughAttributes } from '../../utils/attributes';
import { isRtl } from '../../utils/rtl';

const STRINGS = {
  en: {
    prev: 'Previous',
    next: 'Next',
    first: 'First',
    last: 'Last',
    pagination: 'Pagination',
    goToFirst: 'Go to first page',
    goToPrev: 'Go to previous page',
    goToNext: 'Go to next page',
    goToLast: 'Go to last page',
    currentPage: (p: number) => `Page ${p}, current page`,
    goToPage: (p: number) => `Go to page ${p}`,
  },
  ar: {
    prev: 'السابق',
    next: 'التالي',
    first: 'الأول',
    last: 'الأخير',
    pagination: 'ترقيم الصفحات',
    goToFirst: 'الانتقال إلى الصفحة الأولى',
    goToPrev: 'الانتقال إلى الصفحة السابقة',
    goToNext: 'الانتقال إلى الصفحة التالية',
    goToLast: 'الانتقال إلى الصفحة الأخيرة',
    currentPage: (p: number) => `الصفحة ${p}، الصفحة الحالية`,
    goToPage: (p: number) => `الانتقال إلى الصفحة ${p}`,
  },
};

const TAG = 'aegov-pagination';
const ctx = (prop: string) => ({ component: TAG, prop });

@Component({
  tag: 'aegov-pagination',
  styleUrl: 'aegov-pagination.css',
  scoped: false,
})
export class AegovPagination {
  @Element() el: HTMLElement;

  /**
   * Unique ID for the pagination nav element. Auto-generated if not provided.
   */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /**
   * Total number of pages.
   */
  @Prop() pages: number = 1;

  /**
   * Currently active page (1-indexed).
   * This is a controlled prop — you must update it on every aegovPaginationPageChange event.
   */
  @Prop() pageCurrent: number = 1;

  /**
   * Show First and Last navigation buttons alongside Previous and Next.
   */
  @Prop() isEnabledFirstLast: boolean = false;

  /**
   * Number of sibling pages shown on each side of the current page.
   */
  @Prop() countSibling: number = 1;

  /**
   * Number of pages always visible at each boundary (start and end of the list).
   */
  @Prop() countBoundary: number = 1;

  /**
   * Display variant.
   * - 'default': shows page numbers, ellipsis, and prev/next buttons.
   * - 'compact': shows only prev/next buttons (and first/last when isEnabledFirstLast is true).
   */
  @Prop() variant: PaginationVariant = 'default';

  /**
   * Size variant of the pagination.
   */
  @Prop() size: string = 'base';

  @State() private _resolvedSize: PaginationSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /**
   * Disables all pagination interaction.
   */
  @Prop() isDisabled: boolean = false;

  /**
   * Label for the Previous page button. Empty defaults to localized text via isRtl.
   */
  @Prop() labelPrev: string = '';

  /**
   * Label for the Next page button. Empty defaults to localized text via isRtl.
   */
  @Prop() labelNext: string = '';

  /**
   * Label for the First page button (only shown when isEnabledFirstLast is true). Empty defaults to localized text via isRtl.
   */
  @Prop() labelFirst: string = '';

  /**
   * Label for the Last page button (only shown when isEnabledFirstLast is true). Empty defaults to localized text via isRtl.
   */
  @Prop() labelLast: string = '';

  /**
   * Emitted when a page is selected. The event detail is the new page number (1-indexed).
   * Update pageCurrent in response to this event.
   */
  @Event() aegovPaginationPageChange: EventEmitter<number>;

  componentWillLoad() {
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-pagination');
    }
    warnIfInvalidEnumProp(this.variant, PAGINATION_VARIANTS, 'default', ctx('variant'));
    this._sizeWatcher = watchResponsiveProp(this.size, PAGINATION_SIZES, 'base', v => {
      this._resolvedSize = v as PaginationSize;
    });
    this._resolvedSize = this._sizeWatcher.current as PaginationSize;
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, PAGINATION_VARIANTS, 'default', ctx('variant')); }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, PAGINATION_SIZES, 'base', v => {
      this._resolvedSize = v as PaginationSize;
    });
    this._resolvedSize = this._sizeWatcher.current as PaginationSize;
  }

  private handlePageClick(page: number): void {
    if (this.isDisabled || page === this.pageCurrent || page < 1 || page > this.pages) {
      return;
    }
    this.aegovPaginationPageChange.emit(page);
  }

  /**
   * Compute the list of page numbers (and ellipsis placeholders) to render.
   *
   * Algorithm:
   * - Always show `countBoundary` pages at each end.
   * - Always show `countSibling` pages on each side of `pageCurrent`.
   * - Replace gaps of > 1 with an ellipsis token.
   */
  private getPaginationRange(): Array<number | 'start-ellipsis' | 'end-ellipsis'> {
    const { pages, pageCurrent, countSibling, countBoundary } = this;

    if (pages <= 0) return [];
    if (pages === 1) return [1];

    // When the total is small enough that ellipsis would save fewer than 2 items,
    // just show everything.
    const minimumWithoutEllipsis = countBoundary * 2 + countSibling * 2 + 1;
    if (pages <= minimumWithoutEllipsis + 2) {
      return Array.from({ length: pages }, (_, i) => i + 1);
    }

    // Sibling range centred around pageCurrent, clamped so it never overlaps boundaries.
    const siblingsStart = Math.max(
      Math.min(
        pageCurrent - countSibling,
        pages - countBoundary - countSibling * 2 - 1,
      ),
      countBoundary + 2,
    );

    const siblingsEnd = Math.min(
      Math.max(
        pageCurrent + countSibling,
        countBoundary + countSibling * 2 + 2,
      ),
      pages - countBoundary - 1,
    );

    const showStartEllipsis = siblingsStart > countBoundary + 2;
    const showEndEllipsis = siblingsEnd < pages - countBoundary - 1;

    const startPages = Array.from({ length: countBoundary }, (_, i) => i + 1);
    const endPages = Array.from({ length: countBoundary }, (_, i) => pages - countBoundary + i + 1);
    const siblingPages = Array.from({ length: siblingsEnd - siblingsStart + 1 }, (_, i) => siblingsStart + i);

    return [
      ...startPages,
      ...(showStartEllipsis
        ? (['start-ellipsis'] as const)
        : Array.from({ length: siblingsStart - countBoundary - 1 }, (_, i) => countBoundary + i + 1)),
      ...siblingPages,
      ...(showEndEllipsis
        ? (['end-ellipsis'] as const)
        : Array.from({ length: pages - countBoundary - siblingsEnd }, (_, i) => siblingsEnd + i + 1)),
      ...endPages,
    ];
  }

  // ---------- Icon helpers ----------

  private renderIconPrev() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    );
  }

  private renderIconNext() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    );
  }

  private renderIconFirst() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="11 17 6 12 11 7" />
        <polyline points="18 17 13 12 18 7" />
      </svg>
    );
  }

  private renderIconLast() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="13 17 18 12 13 7" />
        <polyline points="6 17 11 12 6 7" />
      </svg>
    );
  }

  render() {
    if (this.pages <= 0) {
      return null;
    }

    const variant: PaginationVariant = (PAGINATION_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'default';
    const size: PaginationSize = this._resolvedSize;
    const range = variant === 'compact' ? [] : this.getPaginationRange();
    const isFirst = this.pageCurrent <= 1;
    const isLast = this.pageCurrent >= this.pages;
    const isCompact = variant === 'compact';
    const passThroughAttributes = getPassThroughAttributes(this.el);
    const t = isRtl(this.el) ? STRINGS.ar : STRINGS.en;

    return (
      <nav {...passThroughAttributes} aria-label={t.pagination} id={this.fieldId} class={`aegov-pagination pagination--${size}${isCompact ? ' pagination--compact' : ''}`}>
        <ul class="pagination__list">

          {/* First button */}
          {this.isEnabledFirstLast && (
            <li class="pagination__item">
              <button
                type="button"
                class={`pagination__btn pagination__btn--nav${(this.isDisabled || isFirst) ? ' pagination__btn--disabled' : ''}`}
                onClick={() => this.handlePageClick(1)}
                disabled={this.isDisabled || isFirst}
                aria-label={t.goToFirst}
                aria-disabled={(this.isDisabled || isFirst) ? 'true' : undefined}
              >
                <span class="pagination__icon pagination__icon--dir" aria-hidden="true">
                  {this.renderIconFirst()}
                </span>
                <span class="pagination__nav-label">{this.labelFirst || t.first}</span>
              </button>
            </li>
          )}

          {/* Previous button */}
          <li class="pagination__item">
            <button
              type="button"
              class={`pagination__btn pagination__btn--nav${(this.isDisabled || isFirst) ? ' pagination__btn--disabled' : ''}`}
              onClick={() => this.handlePageClick(this.pageCurrent - 1)}
              disabled={this.isDisabled || isFirst}
              aria-label={t.goToPrev}
              aria-disabled={(this.isDisabled || isFirst) ? 'true' : undefined}
            >
              <span class="pagination__icon pagination__icon--dir" aria-hidden="true">
                {this.renderIconPrev()}
              </span>
              <span class="pagination__nav-label">{this.labelPrev || t.prev}</span>
            </button>
          </li>

          {/* Compact: page indicator text */}
          {isCompact && (
            <li class="pagination__item">
              <span class="pagination__compact-indicator" aria-live="polite" aria-atomic="true">
                {this.pageCurrent} / {this.pages}
              </span>
            </li>
          )}

          {/* Page numbers and ellipsis (default variant only) */}
          {range.map(item => {
            if (item === 'start-ellipsis' || item === 'end-ellipsis') {
              return (
                <li key={item} class="pagination__item pagination__item--ellipsis">
                  <span class="pagination__ellipsis" aria-hidden="true">…</span>
                </li>
              );
            }

            const page = item as number;
            const isActive = page === this.pageCurrent;

            return (
              <li key={`page-${page}`} class="pagination__item">
                <button
                  type="button"
                  class={`pagination__btn pagination__btn--page${isActive ? ' pagination__btn--active' : ''}${this.isDisabled ? ' pagination__btn--disabled' : ''}`}
                  onClick={() => this.handlePageClick(page)}
                  disabled={this.isDisabled}
                  aria-label={isActive ? t.currentPage(page) : t.goToPage(page)}
                  aria-current={isActive ? 'page' : undefined}
                  aria-disabled={this.isDisabled ? 'true' : undefined}
                >
                  {page}
                </button>
              </li>
            );
          })}

          {/* Next button */}
          <li class="pagination__item">
            <button
              type="button"
              class={`pagination__btn pagination__btn--nav${(this.isDisabled || isLast) ? ' pagination__btn--disabled' : ''}`}
              onClick={() => this.handlePageClick(this.pageCurrent + 1)}
              disabled={this.isDisabled || isLast}
              aria-label={t.goToNext}
              aria-disabled={(this.isDisabled || isLast) ? 'true' : undefined}
            >
              <span class="pagination__nav-label">{this.labelNext || t.next}</span>
              <span class="pagination__icon pagination__icon--dir" aria-hidden="true">
                {this.renderIconNext()}
              </span>
            </button>
          </li>

          {/* Last button */}
          {this.isEnabledFirstLast && (
            <li class="pagination__item">
              <button
                type="button"
                class={`pagination__btn pagination__btn--nav${(this.isDisabled || isLast) ? ' pagination__btn--disabled' : ''}`}
                onClick={() => this.handlePageClick(this.pages)}
                disabled={this.isDisabled || isLast}
                aria-label={t.goToLast}
                aria-disabled={(this.isDisabled || isLast) ? 'true' : undefined}
              >
                <span class="pagination__nav-label">{this.labelLast || t.last}</span>
                <span class="pagination__icon pagination__icon--dir" aria-hidden="true">
                  {this.renderIconLast()}
                </span>
              </button>
            </li>
          )}

        </ul>
      </nav>
    );
  }
}
