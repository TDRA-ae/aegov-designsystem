# aegov-navblock-item



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                                                                         | Type                                         | Default     |
| ------------ | ------------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ----------- |
| `href`       | `href`        | Destination URL. If set and the item has no sub-items, renders an `<a>`.                                            | `string`                                     | `undefined` |
| `isActive`   | `is-active`   | Mark as the current page. Sets `aria-current="page"` on the link.                                                   | `boolean`                                    | `false`     |
| `isDisabled` | `is-disabled` | Visually disabled, not focusable, click no-op.                                                                      | `boolean`                                    | `false`     |
| `isOpen`     | `is-open`     | Whether the sub-region is open. Set by parent navblock or parent navblock-item; mutable so the row can self-toggle. | `boolean`                                    | `false`     |
| `rel`        | `rel`         | Anchor rel.                                                                                                         | `string`                                     | `undefined` |
| `target`     | `target`      | Anchor target.                                                                                                      | `"_blank" \| "_parent" \| "_self" \| "_top"` | `undefined` |


## Events

| Event                     | Description                                  | Type                              |
| ------------------------- | -------------------------------------------- | --------------------------------- |
| `aegovNavblockItemToggle` | Emitted when the row toggles its sub-region. | `CustomEvent<{ open: boolean; }>` |


## Slots

| Slot           | Description                                                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------- |
|                | Row content (label + inline siblings such as aegov-badge).                                                                   |
| `"icon-start"` | Optional leading icon (SVG or element).                                                                                      |
| `"subnav"`     | Nested aegov-navblock-item children. Auto-assigned for         nested aegov-navblock-item elements without an explicit slot. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
