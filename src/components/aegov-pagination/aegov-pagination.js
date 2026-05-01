var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Element, Prop, State, Event, h, Watch } from '@stencil/core';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import { PAGINATION_SIZES, PAGINATION_VARIANTS } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { generateId } from '../../utils/id-generator';
import { getPassThroughAttributes } from '../../utils/attributes';
const TAG = 'aegov-pagination';
const ctx = (prop) => ({ component: TAG, prop });
let AegovPagination = class AegovPagination {
    constructor() {
        /**
         * Total number of pages.
         */
        this.pages = 1;
        /**
         * Currently active page (1-indexed).
         * This is a controlled prop — you must update it on every aegovPaginationPageChange event.
         */
        this.pageCurrent = 1;
        /**
         * Show First and Last navigation buttons alongside Previous and Next.
         */
        this.isEnabledFirstLast = false;
        /**
         * Number of sibling pages shown on each side of the current page.
         */
        this.countSibling = 1;
        /**
         * Number of pages always visible at each boundary (start and end of the list).
         */
        this.countBoundary = 1;
        /**
         * Display variant.
         * - 'default': shows page numbers, ellipsis, and prev/next buttons.
         * - 'compact': shows only prev/next buttons (and first/last when isEnabledFirstLast is true).
         */
        this.variant = 'default';
        /**
         * Size variant of the pagination.
         */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
        /**
         * Disables all pagination interaction.
         */
        this.isDisabled = false;
        /**
         * Label for the Previous page button.
         */
        this.labelPrev = 'Previous';
        /**
         * Label for the Next page button.
         */
        this.labelNext = 'Next';
        /**
         * Label for the First page button (only shown when isEnabledFirstLast is true).
         */
        this.labelFirst = 'First';
        /**
         * Label for the Last page button (only shown when isEnabledFirstLast is true).
         */
        this.labelLast = 'Last';
    }
    componentWillLoad() {
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-pagination');
        }
        warnIfInvalidEnumProp(this.variant, PAGINATION_VARIANTS, 'default', ctx('variant'));
        this._sizeWatcher = watchResponsiveProp(this.size, PAGINATION_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    disconnectedCallback() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    onVariantChange(v) { warnIfInvalidEnumProp(v, PAGINATION_VARIANTS, 'default', ctx('variant')); }
    onSizeChange() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, PAGINATION_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    handlePageClick(page) {
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
    getPaginationRange() {
        const { pages, pageCurrent, countSibling, countBoundary } = this;
        if (pages <= 0)
            return [];
        if (pages === 1)
            return [1];
        // When the total is small enough that ellipsis would save fewer than 2 items,
        // just show everything.
        const minimumWithoutEllipsis = countBoundary * 2 + countSibling * 2 + 1;
        if (pages <= minimumWithoutEllipsis + 2) {
            return Array.from({ length: pages }, (_, i) => i + 1);
        }
        // Sibling range centred around pageCurrent, clamped so it never overlaps boundaries.
        const siblingsStart = Math.max(Math.min(pageCurrent - countSibling, pages - countBoundary - countSibling * 2 - 1), countBoundary + 2);
        const siblingsEnd = Math.min(Math.max(pageCurrent + countSibling, countBoundary + countSibling * 2 + 2), pages - countBoundary - 1);
        const showStartEllipsis = siblingsStart > countBoundary + 2;
        const showEndEllipsis = siblingsEnd < pages - countBoundary - 1;
        const startPages = Array.from({ length: countBoundary }, (_, i) => i + 1);
        const endPages = Array.from({ length: countBoundary }, (_, i) => pages - countBoundary + i + 1);
        const siblingPages = Array.from({ length: siblingsEnd - siblingsStart + 1 }, (_, i) => siblingsStart + i);
        return [
            ...startPages,
            ...(showStartEllipsis
                ? ['start-ellipsis']
                : Array.from({ length: siblingsStart - countBoundary - 1 }, (_, i) => countBoundary + i + 1)),
            ...siblingPages,
            ...(showEndEllipsis
                ? ['end-ellipsis']
                : Array.from({ length: pages - countBoundary - siblingsEnd }, (_, i) => siblingsEnd + i + 1)),
            ...endPages,
        ];
    }
    // ---------- Icon helpers ----------
    renderIconPrev() {
        return (h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" },
            h("polyline", { points: "15 18 9 12 15 6" })));
    }
    renderIconNext() {
        return (h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" },
            h("polyline", { points: "9 18 15 12 9 6" })));
    }
    renderIconFirst() {
        return (h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" },
            h("polyline", { points: "11 17 6 12 11 7" }),
            h("polyline", { points: "18 17 13 12 18 7" })));
    }
    renderIconLast() {
        return (h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" },
            h("polyline", { points: "13 17 18 12 13 7" }),
            h("polyline", { points: "6 17 11 12 6 7" })));
    }
    render() {
        if (this.pages <= 0) {
            return null;
        }
        const variant = PAGINATION_VARIANTS.includes(this.variant) ? this.variant : 'default';
        const size = this._resolvedSize;
        const range = variant === 'compact' ? [] : this.getPaginationRange();
        const isFirst = this.pageCurrent <= 1;
        const isLast = this.pageCurrent >= this.pages;
        const isCompact = variant === 'compact';
        const passThroughAttributes = getPassThroughAttributes(this.el);
        return (h("nav", Object.assign({}, passThroughAttributes, { "aria-label": "Pagination", id: this.fieldId, class: `aegov-pagination pagination--${size}${isCompact ? ' pagination--compact' : ''}` }),
            h("ul", { class: "pagination__list" },
                this.isEnabledFirstLast && (h("li", { class: "pagination__item" },
                    h("button", { type: "button", class: `pagination__btn pagination__btn--nav${(this.isDisabled || isFirst) ? ' pagination__btn--disabled' : ''}`, onClick: () => this.handlePageClick(1), disabled: this.isDisabled || isFirst, "aria-label": "Go to first page", "aria-disabled": (this.isDisabled || isFirst) ? 'true' : undefined },
                        h("span", { class: "pagination__icon pagination__icon--dir", "aria-hidden": "true" }, this.renderIconFirst()),
                        h("span", { class: "pagination__nav-label" }, this.labelFirst)))),
                h("li", { class: "pagination__item" },
                    h("button", { type: "button", class: `pagination__btn pagination__btn--nav${(this.isDisabled || isFirst) ? ' pagination__btn--disabled' : ''}`, onClick: () => this.handlePageClick(this.pageCurrent - 1), disabled: this.isDisabled || isFirst, "aria-label": "Go to previous page", "aria-disabled": (this.isDisabled || isFirst) ? 'true' : undefined },
                        h("span", { class: "pagination__icon pagination__icon--dir", "aria-hidden": "true" }, this.renderIconPrev()),
                        h("span", { class: "pagination__nav-label" }, this.labelPrev))),
                isCompact && (h("li", { class: "pagination__item" },
                    h("span", { class: "pagination__compact-indicator", "aria-live": "polite", "aria-atomic": "true" },
                        this.pageCurrent,
                        " / ",
                        this.pages))),
                range.map(item => {
                    if (item === 'start-ellipsis' || item === 'end-ellipsis') {
                        return (h("li", { key: item, class: "pagination__item pagination__item--ellipsis" },
                            h("span", { class: "pagination__ellipsis", "aria-hidden": "true" }, "\u2026")));
                    }
                    const page = item;
                    const isActive = page === this.pageCurrent;
                    return (h("li", { key: `page-${page}`, class: "pagination__item" },
                        h("button", { type: "button", class: `pagination__btn pagination__btn--page${isActive ? ' pagination__btn--active' : ''}${this.isDisabled ? ' pagination__btn--disabled' : ''}`, onClick: () => this.handlePageClick(page), disabled: this.isDisabled, "aria-label": isActive ? `Page ${page}, current page` : `Go to page ${page}`, "aria-current": isActive ? 'page' : undefined, "aria-disabled": this.isDisabled ? 'true' : undefined }, page)));
                }),
                h("li", { class: "pagination__item" },
                    h("button", { type: "button", class: `pagination__btn pagination__btn--nav${(this.isDisabled || isLast) ? ' pagination__btn--disabled' : ''}`, onClick: () => this.handlePageClick(this.pageCurrent + 1), disabled: this.isDisabled || isLast, "aria-label": "Go to next page", "aria-disabled": (this.isDisabled || isLast) ? 'true' : undefined },
                        h("span", { class: "pagination__nav-label" }, this.labelNext),
                        h("span", { class: "pagination__icon pagination__icon--dir", "aria-hidden": "true" }, this.renderIconNext()))),
                this.isEnabledFirstLast && (h("li", { class: "pagination__item" },
                    h("button", { type: "button", class: `pagination__btn pagination__btn--nav${(this.isDisabled || isLast) ? ' pagination__btn--disabled' : ''}`, onClick: () => this.handlePageClick(this.pages), disabled: this.isDisabled || isLast, "aria-label": "Go to last page", "aria-disabled": (this.isDisabled || isLast) ? 'true' : undefined },
                        h("span", { class: "pagination__nav-label" }, this.labelLast),
                        h("span", { class: "pagination__icon pagination__icon--dir", "aria-hidden": "true" }, this.renderIconLast())))))));
    }
};
__decorate([
    Element()
], AegovPagination.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovPagination.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovPagination.prototype, "pages", void 0);
__decorate([
    Prop()
], AegovPagination.prototype, "pageCurrent", void 0);
__decorate([
    Prop()
], AegovPagination.prototype, "isEnabledFirstLast", void 0);
__decorate([
    Prop()
], AegovPagination.prototype, "countSibling", void 0);
__decorate([
    Prop()
], AegovPagination.prototype, "countBoundary", void 0);
__decorate([
    Prop()
], AegovPagination.prototype, "variant", void 0);
__decorate([
    Prop()
], AegovPagination.prototype, "size", void 0);
__decorate([
    State()
], AegovPagination.prototype, "_resolvedSize", void 0);
__decorate([
    Prop()
], AegovPagination.prototype, "isDisabled", void 0);
__decorate([
    Prop()
], AegovPagination.prototype, "labelPrev", void 0);
__decorate([
    Prop()
], AegovPagination.prototype, "labelNext", void 0);
__decorate([
    Prop()
], AegovPagination.prototype, "labelFirst", void 0);
__decorate([
    Prop()
], AegovPagination.prototype, "labelLast", void 0);
__decorate([
    Event()
], AegovPagination.prototype, "aegovPaginationPageChange", void 0);
__decorate([
    Watch('variant')
], AegovPagination.prototype, "onVariantChange", null);
__decorate([
    Watch('size')
], AegovPagination.prototype, "onSizeChange", null);
AegovPagination = __decorate([
    Component({
        tag: 'aegov-pagination',
        styleUrl: 'aegov-pagination.css',
        scoped: false,
    })
], AegovPagination);
export { AegovPagination };
