# aegov-card



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute       | Description                                                                                                                                                                                                                                                       | Type                                                         | Default     |
| ------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ----------- |
| `appearance`  | `appearance`    | Appearance: 'solid' (full-strength border), 'light' (subtle low-contrast border), or 'creative' (gradient border via CSS mask). Border colour resolves from `variant`.                                                                                            | `"creative" \| "light" \| "solid"`                           | `'solid'`   |
| `borderWidth` | `border-width`  | Border thickness: 1, 2, or 3.                                                                                                                                                                                                                                     | `1 \| 2 \| 3`                                                | `2`         |
| `dataColSpan` | `data-col-span` | Number of grid columns this card should span inside an `aegov-bento-grid`. Supports responsive syntax, e.g. `"1 md:2 lg:3"`. Reflected as the `data-col-span` attribute so the parent grid can read it correctly even when set via JSX camelCase (`dataColSpan`). | `string`                                                     | `undefined` |
| `dataRowSpan` | `data-row-span` | Number of grid rows this card should span inside an `aegov-bento-grid`. Supports responsive syntax, e.g. `"1 md:2"`. Reflected as the `data-row-span` attribute so the parent grid can read it correctly even when set via JSX camelCase (`dataRowSpan`).         | `string`                                                     | `undefined` |
| `fieldId`     | `field-id`      | Unique ID for the card element. Auto-generated if not provided.                                                                                                                                                                                                   | `string`                                                     | `undefined` |
| `hover`       | `hover`         | Hover effect: 'off' (none), 'standard' (border color change), or 'glow' (shadow glow).                                                                                                                                                                            | `"glow" \| "off" \| "standard"`                              | `'off'`     |
| `isPadding`   | `is-padding`    | Whether to apply inner padding (1.5rem / 24px). On by default.                                                                                                                                                                                                    | `boolean`                                                    | `true`      |
| `size`        | `size`          | Size: 'sm' (compact padding/radius), 'base' (default), or 'lg' (generous padding/radius). All sizes scale down responsively at md (768px) and xs (480px) breakpoints.                                                                                             | `"base" \| "lg" \| "sm"`                                     | `'base'`    |
| `variant`     | `variant`       | Variant: colour family applied to border + glow. 'primary' (default), 'secondary', 'neutral-max' (aeblack-800 family), or 'neutral-min' (aeblack-100 family).                                                                                                     | `"neutral-max" \| "neutral-min" \| "primary" \| "secondary"` | `'primary'` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
