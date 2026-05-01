import { EventEmitter } from '@stencil/core';
import type { PaginationVariant } from '../../utils/types';
export declare class AegovPagination {
    el: HTMLElement;
    /**
     * Unique ID for the pagination nav element. Auto-generated if not provided.
     */
    fieldId?: string;
    /**
     * Total number of pages.
     */
    pages: number;
    /**
     * Currently active page (1-indexed).
     * This is a controlled prop — you must update it on every aegovPaginationPageChange event.
     */
    pageCurrent: number;
    /**
     * Show First and Last navigation buttons alongside Previous and Next.
     */
    isEnabledFirstLast: boolean;
    /**
     * Number of sibling pages shown on each side of the current page.
     */
    countSibling: number;
    /**
     * Number of pages always visible at each boundary (start and end of the list).
     */
    countBoundary: number;
    /**
     * Display variant.
     * - 'default': shows page numbers, ellipsis, and prev/next buttons.
     * - 'compact': shows only prev/next buttons (and first/last when isEnabledFirstLast is true).
     */
    variant: PaginationVariant;
    /**
     * Size variant of the pagination.
     */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /**
     * Disables all pagination interaction.
     */
    isDisabled: boolean;
    /**
     * Label for the Previous page button.
     */
    labelPrev: string;
    /**
     * Label for the Next page button.
     */
    labelNext: string;
    /**
     * Label for the First page button (only shown when isEnabledFirstLast is true).
     */
    labelFirst: string;
    /**
     * Label for the Last page button (only shown when isEnabledFirstLast is true).
     */
    labelLast: string;
    /**
     * Emitted when a page is selected. The event detail is the new page number (1-indexed).
     * Update pageCurrent in response to this event.
     */
    aegovPaginationPageChange: EventEmitter<number>;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    onVariantChange(v: unknown): void;
    onSizeChange(): void;
    private handlePageClick;
    /**
     * Compute the list of page numbers (and ellipsis placeholders) to render.
     *
     * Algorithm:
     * - Always show `countBoundary` pages at each end.
     * - Always show `countSibling` pages on each side of `pageCurrent`.
     * - Replace gaps of > 1 with an ellipsis token.
     */
    private getPaginationRange;
    private renderIconPrev;
    private renderIconNext;
    private renderIconFirst;
    private renderIconLast;
    render(): any;
}
