# aegov-navbar-item



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                                                                                                                                              | Type                                         | Default     |
| ------------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ----------- |
| `href`       | `href`        | URL the item links to. If unset, item renders as a non-link span.                                                                                                                        | `string`                                     | `undefined` |
| `isActive`   | `is-active`   | Mark this item as the current page. Sets `aria-current="page"`.                                                                                                                          | `boolean`                                    | `false`     |
| `isDisabled` | `is-disabled` | Visually disabled, not clickable, removed from arrow-key cycle.                                                                                                                          | `boolean`                                    | `false`     |
| `rel`        | `rel`         | Anchor rel attribute.                                                                                                                                                                    | `string`                                     | `undefined` |
| `size`       | `size`        | Size token. Accepts a Tailwind-style responsive string (e.g. `"sm md:base lg:lg"`). Parent aegov-navbar sets this to its resolved value; standalone use also supports breakpoint syntax. | `string`                                     | `'base'`    |
| `target`     | `target`      | Anchor target attribute.                                                                                                                                                                 | `"_blank" \| "_parent" \| "_self" \| "_top"` | `undefined` |


## Slots

| Slot           | Description                            |
| -------------- | -------------------------------------- |
|                | Item label.                            |
| `"dropdown"`   | Optional aegov-dropdown for a submenu. |
| `"icon-start"` | Optional prefix icon (SVG).            |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
