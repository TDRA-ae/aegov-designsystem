# aegov-navbar-item



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                       | Type                                         | Default     |
| ---------- | ---------- | ----------------------------------------------------------------- | -------------------------------------------- | ----------- |
| `active`   | `active`   | Mark this item as the current page. Sets `aria-current="page"`.   | `boolean`                                    | `false`     |
| `disabled` | `disabled` | Visually disabled, not clickable, removed from arrow-key cycle.   | `boolean`                                    | `false`     |
| `href`     | `href`     | URL the item links to. If unset, item renders as a non-link span. | `string`                                     | `undefined` |
| `rel`      | `rel`      | Anchor rel attribute.                                             | `string`                                     | `undefined` |
| `size`     | `size`     | Size token. Set by parent aegov-navbar.                           | `"base" \| "lg" \| "sm"`                     | `'base'`    |
| `target`   | `target`   | Anchor target attribute.                                          | `"_blank" \| "_parent" \| "_self" \| "_top"` | `undefined` |


## Slots

| Slot           | Description                            |
| -------------- | -------------------------------------- |
|                | Item label.                            |
| `"dropdown"`   | Optional aegov-dropdown for a submenu. |
| `"icon-start"` | Optional prefix icon (SVG).            |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
