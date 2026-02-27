import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
import type { PaginationSize } from '../../utils/types';

@Component({
  tag: 'aegov-pagination',
  styleUrl: 'aegov-pagination.css',
  scoped: true,
})
export class AegovPagination {
  /**
   * Total number of pages.
   */
  @Prop() totalPages: number = 1;

  /**
   * Currently active page (1-indexed).
   * This is a controlled prop — you must update it on every aegovPageChange event.
   */
  @Prop() currentPage: number = 1;

  /**
   * Show First and Last navigation buttons alongside Previous and Next.
   */
  @Prop() showFirstLast: boolean = false;

  /**
   * Number of sibling pages shown on each side of the current page.
   */
  @Prop() siblingCount: number = 1;

  /**
   * Number of pages always visible at each boundary (start and end of the list).
   */
  @Prop() boundaryCount: number = 1;

  /**
   * Size variant of the pagination.
   */
  @Prop() size: PaginationSize = 'base';

  /**
   * Disables all pagination interaction.
   */
  @Prop() disabled: boolean = false;

  /**
   * Label for the Previous page button.
   */
  @Prop() prevLabel: string = 'Previous';

  /**
   * Label for the Next page button.
   */
  @Prop() nextLabel: string = 'Next';

  /**
   * Label for the First page button (only shown when showFirstLast is true).
   */
  @Prop() firstLabel: string = 'First';

  /**
   * Label for the Last page button (only shown when showFirstLast is true).
   */
  @Prop() lastLabel: string = 'Last';

  /**
   * Emitted when a page is selected. The event detail is the new page number (1-indexed).
   * Update currentPage in response to this event.
   */
  @Event() aegovPageChange: EventEmitter<number>;

  private handlePageClick(page: number): void {
    if (this.disabled || page === this.currentPage || page < 1 || page > this.totalPages) {
      return;
    }
    this.aegovPageChange.emit(page);
  }

  /**
   * Compute the list of page numbers (and ellipsis placeholders) to render.
   *
   * Algorithm:
   * - Always show `boundaryCount` pages at each end.
   * - Always show `siblingCount` pages on each side of `currentPage`.
   * - Replace gaps of > 1 with an ellipsis token.
   */
  private getPaginationRange(): Array<number | 'start-ellipsis' | 'end-ellipsis'> {
    const { totalPages, currentPage, siblingCount, boundaryCount } = this;

    if (totalPages <= 0) return [];
    if (totalPages === 1) return [1];

    // When the total is small enough that ellipsis would save fewer than 2 items,
    // just show everything.
    const minimumWithoutEllipsis = boundaryCount * 2 + siblingCount * 2 + 1;
    if (totalPages <= minimumWithoutEllipsis + 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Sibling range centred around currentPage, clamped so it never overlaps boundaries.
    const siblingsStart = Math.max(
      Math.min(
        currentPage - siblingCount,
        totalPages - boundaryCount - siblingCount * 2 - 1,
      ),
      boundaryCount + 2,
    );

    const siblingsEnd = Math.min(
      Math.max(
        currentPage + siblingCount,
        boundaryCount + siblingCount * 2 + 2,
      ),
      totalPages - boundaryCount - 1,
    );

    const showStartEllipsis = siblingsStart > boundaryCount + 2;
    const showEndEllipsis = siblingsEnd < totalPages - boundaryCount - 1;

    const startPages = Array.from({ length: boundaryCount }, (_, i) => i + 1);
    const endPages = Array.from({ length: boundaryCount }, (_, i) => totalPages - boundaryCount + i + 1);
    const siblingPages = Array.from({ length: siblingsEnd - siblingsStart + 1 }, (_, i) => siblingsStart + i);

    return [
      ...startPages,
      ...(showStartEllipsis
        ? (['start-ellipsis'] as const)
        : Array.from({ length: siblingsStart - boundaryCount - 1 }, (_, i) => boundaryCount + i + 1)),
      ...siblingPages,
      ...(showEndEllipsis
        ? (['end-ellipsis'] as const)
        : Array.from({ length: totalPages - boundaryCount - siblingsEnd }, (_, i) => siblingsEnd + i + 1)),
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
    if (this.totalPages <= 0) {
      return null;
    }

    const range = this.getPaginationRange();
    const isFirst = this.currentPage <= 1;
    const isLast = this.currentPage >= this.totalPages;

    return (
      <nav aria-label="Pagination" class={`pagination pagination--${this.size}`}>
        <ul class="pagination__list">

          {/* First button */}
          {this.showFirstLast && (
            <li class="pagination__item">
              <button
                type="button"
                class={`pagination__btn pagination__btn--nav${(this.disabled || isFirst) ? ' pagination__btn--disabled' : ''}`}
                onClick={() => this.handlePageClick(1)}
                disabled={this.disabled || isFirst}
                aria-label="Go to first page"
                aria-disabled={(this.disabled || isFirst) ? 'true' : undefined}
              >
                <span class="pagination__icon pagination__icon--dir" aria-hidden="true">
                  {this.renderIconFirst()}
                </span>
                <span class="pagination__nav-label">{this.firstLabel}</span>
              </button>
            </li>
          )}

          {/* Previous button */}
          <li class="pagination__item">
            <button
              type="button"
              class={`pagination__btn pagination__btn--nav${(this.disabled || isFirst) ? ' pagination__btn--disabled' : ''}`}
              onClick={() => this.handlePageClick(this.currentPage - 1)}
              disabled={this.disabled || isFirst}
              aria-label="Go to previous page"
              aria-disabled={(this.disabled || isFirst) ? 'true' : undefined}
            >
              <span class="pagination__icon pagination__icon--dir" aria-hidden="true">
                {this.renderIconPrev()}
              </span>
              <span class="pagination__nav-label">{this.prevLabel}</span>
            </button>
          </li>

          {/* Page numbers and ellipsis */}
          {range.map(item => {
            if (item === 'start-ellipsis' || item === 'end-ellipsis') {
              return (
                <li key={item} class="pagination__item pagination__item--ellipsis">
                  <span class="pagination__ellipsis" aria-hidden="true">…</span>
                </li>
              );
            }

            const page = item as number;
            const isActive = page === this.currentPage;

            return (
              <li key={`page-${page}`} class="pagination__item">
                <button
                  type="button"
                  class={`pagination__btn pagination__btn--page${isActive ? ' pagination__btn--active' : ''}${this.disabled ? ' pagination__btn--disabled' : ''}`}
                  onClick={() => this.handlePageClick(page)}
                  disabled={this.disabled}
                  aria-label={isActive ? `Page ${page}, current page` : `Go to page ${page}`}
                  aria-current={isActive ? 'page' : undefined}
                  aria-disabled={this.disabled ? 'true' : undefined}
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
              class={`pagination__btn pagination__btn--nav${(this.disabled || isLast) ? ' pagination__btn--disabled' : ''}`}
              onClick={() => this.handlePageClick(this.currentPage + 1)}
              disabled={this.disabled || isLast}
              aria-label="Go to next page"
              aria-disabled={(this.disabled || isLast) ? 'true' : undefined}
            >
              <span class="pagination__nav-label">{this.nextLabel}</span>
              <span class="pagination__icon pagination__icon--dir" aria-hidden="true">
                {this.renderIconNext()}
              </span>
            </button>
          </li>

          {/* Last button */}
          {this.showFirstLast && (
            <li class="pagination__item">
              <button
                type="button"
                class={`pagination__btn pagination__btn--nav${(this.disabled || isLast) ? ' pagination__btn--disabled' : ''}`}
                onClick={() => this.handlePageClick(this.totalPages)}
                disabled={this.disabled || isLast}
                aria-label="Go to last page"
                aria-disabled={(this.disabled || isLast) ? 'true' : undefined}
              >
                <span class="pagination__nav-label">{this.lastLabel}</span>
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
