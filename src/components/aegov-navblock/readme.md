# aegov-navblock



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                                                                                        | Type                  | Default                |
| ------------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ---------------------- |
| `blockTitle` | `block-title` | Block title text shown above items. The `title` slot overrides this.                                                               | `string`              | `undefined`            |
| `fieldId`    | `field-id`    | Unique ID for the block wrapper. Auto-generated if not provided.                                                                   | `string`              | `undefined`            |
| `icon`       | `icon`        | Expand/collapse icon style for items.                                                                                              | `"chevron" \| "plus"` | `'chevron'`            |
| `isBordered` | `is-bordered` | Wrap the block in a bordered container with padding.                                                                               | `boolean`             | `false`                |
| `isMultiple` | `is-multiple` | Allow multiple items to be open at the same level simultaneously.                                                                  | `boolean`             | `false`                |
| `labelNav`   | `label-nav`   | Accessible label for the navigation landmark.                                                                                      | `string`              | `'Sidebar navigation'` |
| `size`       | `size`        | Size token. Accepts a Tailwind-style responsive string (e.g. `"sm md:base lg:lg"`). Resolves at runtime and cascades to all items. | `string`              | `'base'`               |


## Slots

| Slot      | Description                                            |
| --------- | ------------------------------------------------------ |
|           | aegov-navblock-item top-level children.                |
| `"title"` | Custom title content. Overrides the `blockTitle` prop. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
