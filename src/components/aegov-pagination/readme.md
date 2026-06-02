# aegov-pagination



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute               | Description                                                                                                                                                                    | Type                     | Default     |
| -------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ | ----------- |
| `countBoundary`      | `count-boundary`        | Number of pages always visible at each boundary (start and end of the list).                                                                                                   | `number`                 | `1`         |
| `countSibling`       | `count-sibling`         | Number of sibling pages shown on each side of the current page.                                                                                                                | `number`                 | `1`         |
| `fieldId`            | `field-id`              | Unique ID for the pagination nav element. Auto-generated if not provided.                                                                                                      | `string`                 | `undefined` |
| `isDisabled`         | `is-disabled`           | Disables all pagination interaction.                                                                                                                                           | `boolean`                | `false`     |
| `isEnabledFirstLast` | `is-enabled-first-last` | Show First and Last navigation buttons alongside Previous and Next.                                                                                                            | `boolean`                | `false`     |
| `labelFirst`         | `label-first`           | Label for the First page button (only shown when isEnabledFirstLast is true). Empty defaults to localized text via isRtl.                                                      | `string`                 | `''`        |
| `labelLast`          | `label-last`            | Label for the Last page button (only shown when isEnabledFirstLast is true). Empty defaults to localized text via isRtl.                                                       | `string`                 | `''`        |
| `labelNext`          | `label-next`            | Label for the Next page button. Empty defaults to localized text via isRtl.                                                                                                    | `string`                 | `''`        |
| `labelPrev`          | `label-prev`            | Label for the Previous page button. Empty defaults to localized text via isRtl.                                                                                                | `string`                 | `''`        |
| `pageCurrent`        | `page-current`          | Currently active page (1-indexed). This is a controlled prop — you must update it on every aegovPaginationPageChange event.                                                    | `number`                 | `1`         |
| `pages`              | `pages`                 | Total number of pages.                                                                                                                                                         | `number`                 | `1`         |
| `size`               | `size`                  | Size variant of the pagination.                                                                                                                                                | `string`                 | `'base'`    |
| `variant`            | `variant`               | Display variant. - 'default': shows page numbers, ellipsis, and prev/next buttons. - 'compact': shows only prev/next buttons (and first/last when isEnabledFirstLast is true). | `"compact" \| "default"` | `'default'` |


## Events

| Event                       | Description                                                                                                                         | Type                  |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `aegovPaginationPageChange` | Emitted when a page is selected. The event detail is the new page number (1-indexed). Update pageCurrent in response to this event. | `CustomEvent<number>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
