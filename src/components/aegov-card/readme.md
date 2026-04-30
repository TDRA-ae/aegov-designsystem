# aegov-card



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                                                                                                                                     | Type                                                 | Default      |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------ |
| `bg`          | `bg`           | Background style: 'white' (default) or 'subtle' (aeblack-50).                                                                                                                                                                   | `"subtle" \| "white"`                                | `'white'`    |
| `borderStyle` | `border-style` | Border style: 'standard' (solid primary-600), 'light' (solid primary-200), 'creative' (gradient from primary-400 to primary-800), or 'highlight' (solid aeblack-200 at rest, transitions to primary-300→700 gradient on hover). | `"creative" \| "highlight" \| "light" \| "standard"` | `'standard'` |
| `borderWidth` | `border-width` | Border thickness: 1, 2, or 3.                                                                                                                                                                                                   | `1 \| 2 \| 3`                                        | `2`          |
| `fieldId`     | `field-id`     | Unique ID for the card element. Auto-generated if not provided.                                                                                                                                                                 | `string`                                             | `undefined`  |
| `hover`       | `hover`        | Hover effect: 'off' (none), 'standard' (border color change), or 'glow' (shadow glow).                                                                                                                                          | `"glow" \| "off" \| "standard"`                      | `'off'`      |
| `isPadding`   | `is-padding`   | Whether to apply inner padding (1.5rem / 24px). On by default.                                                                                                                                                                  | `boolean`                                            | `true`       |
| `size`        | `size`         | Size: 'sm' (compact padding/radius), 'base' (default), or 'lg' (generous padding/radius). All sizes scale down responsively at md (768px) and xs (480px) breakpoints.                                                           | `"base" \| "lg" \| "sm"`                             | `'base'`     |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
