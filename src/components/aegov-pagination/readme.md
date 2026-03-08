# aegov-pagination



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute         | Description                                                                                                                                                               | Type                     | Default      |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------------ |
| `boundaryCount` | `boundary-count`  | Number of pages always visible at each boundary (start and end of the list).                                                                                              | `number`                 | `1`          |
| `currentPage`   | `current-page`    | Currently active page (1-indexed). This is a controlled prop — you must update it on every aegovPaginationPageChange event.                                               | `number`                 | `1`          |
| `disabled`      | `disabled`        | Disables all pagination interaction.                                                                                                                                      | `boolean`                | `false`      |
| `firstLabel`    | `first-label`     | Label for the First page button (only shown when showFirstLast is true).                                                                                                  | `string`                 | `'First'`    |
| `lastLabel`     | `last-label`      | Label for the Last page button (only shown when showFirstLast is true).                                                                                                   | `string`                 | `'Last'`     |
| `nextLabel`     | `next-label`      | Label for the Next page button.                                                                                                                                           | `string`                 | `'Next'`     |
| `prevLabel`     | `prev-label`      | Label for the Previous page button.                                                                                                                                       | `string`                 | `'Previous'` |
| `showFirstLast` | `show-first-last` | Show First and Last navigation buttons alongside Previous and Next.                                                                                                       | `boolean`                | `false`      |
| `siblingCount`  | `sibling-count`   | Number of sibling pages shown on each side of the current page.                                                                                                           | `number`                 | `1`          |
| `size`          | `size`            | Size variant of the pagination.                                                                                                                                           | `"base" \| "lg" \| "sm"` | `'base'`     |
| `totalPages`    | `total-pages`     | Total number of pages.                                                                                                                                                    | `number`                 | `1`          |
| `variant`       | `variant`         | Display variant. - 'default': shows page numbers, ellipsis, and prev/next buttons. - 'compact': shows only prev/next buttons (and first/last when showFirstLast is true). | `"compact" \| "default"` | `'default'`  |


## Events

| Event                       | Description                                                                                                                         | Type                  |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `aegovPaginationPageChange` | Emitted when a page is selected. The event detail is the new page number (1-indexed). Update currentPage in response to this event. | `CustomEvent<number>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
