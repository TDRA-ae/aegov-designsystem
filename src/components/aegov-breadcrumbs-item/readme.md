# aegov-breadcrumbs-item



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                                         | Type                                         | Default     |
| -------- | --------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ----------- |
| `href`   | `href`    | The URL that the breadcrumb item links to. If not provided, the item will be rendered as plain text (current page). | `string`                                     | `undefined` |
| `target` | `target`  | Where to open the linked document                                                                                   | `"_blank" \| "_parent" \| "_self" \| "_top"` | `'_self'`   |


## Events

| Event                      | Description                                 | Type                                                 |
| -------------------------- | ------------------------------------------- | ---------------------------------------------------- |
| `aegovBreadcrumbItemClick` | Emitted when the breadcrumb item is clicked | `CustomEvent<{ href?: string; event: MouseEvent; }>` |


## Slots

| Slot | Description                    |
| ---- | ------------------------------ |
|      | Content of the breadcrumb item |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
