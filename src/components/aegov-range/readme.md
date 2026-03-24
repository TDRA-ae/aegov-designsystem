# aegov-range



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                   | Type                                       | Default        |
| ------------- | ------------- | ----------------------------------------------------------------------------- | ------------------------------------------ | -------------- |
| `class`       | `class`       | Additional CSS classes.                                                       | `string`                                   | `undefined`    |
| `disabled`    | `disabled`    | Whether the range is disabled.                                                | `boolean`                                  | `false`        |
| `display`     | `display`     | Value display mode.                                                           | `"full" \| "none" \| "thumb" \| "tooltip"` | `'none'`       |
| `fieldId`     | `field-id`    | Unique ID for the native range input element. Auto-generated if not provided. | `string`                                   | `undefined`    |
| `label`       | `label`       | Optional label text.                                                          | `string`                                   | `undefined`    |
| `max`         | `max`         | Maximum value.                                                                | `number`                                   | `100`          |
| `min`         | `min`         | Minimum value.                                                                | `number`                                   | `0`            |
| `mode`        | `mode`        | Single thumb or dual thumb (range selection).                                 | `"range" \| "single"`                      | `'single'`     |
| `name`        | `name`        | The name attribute for the range.                                             | `string`                                   | `undefined`    |
| `orientation` | `orientation` | Layout orientation.                                                           | `"horizontal" \| "vertical"`               | `'horizontal'` |
| `required`    | `required`    | Whether the range is required.                                                | `boolean`                                  | `false`        |
| `size`        | `size`        | Size of the range track. Thumb remains constant.                              | `"base" \| "lg" \| "sm" \| "xl" \| "xs"`   | `'base'`       |
| `step`        | `step`        | Step increment.                                                               | `number`                                   | `1`            |
| `value`       | `value`       | Current value (single mode).                                                  | `number`                                   | `50`           |
| `valueHigh`   | `value-high`  | High thumb value (range mode).                                                | `number`                                   | `75`           |
| `valueLow`    | `value-low`   | Low thumb value (range mode).                                                 | `number`                                   | `25`           |


## Events

| Event              | Description                                | Type                                                                      |
| ------------------ | ------------------------------------------ | ------------------------------------------------------------------------- |
| `aegovRangeChange` | Emitted on release (value committed).      | `CustomEvent<{ value?: number; valueLow?: number; valueHigh?: number; }>` |
| `aegovRangeInput`  | Emitted during drag on every value update. | `CustomEvent<{ value?: number; valueLow?: number; valueHigh?: number; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
