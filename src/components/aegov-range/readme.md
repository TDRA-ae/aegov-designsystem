# aegov-range



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                   | Type                                       | Default        |
| ------------- | ------------- | ----------------------------------------------------------------------------- | ------------------------------------------ | -------------- |
| `display`     | `display`     | Value display mode.                                                           | `"full" \| "none" \| "thumb" \| "tooltip"` | `'none'`       |
| `extraClass`  | `extra-class` | Additional CSS classes.                                                       | `string`                                   | `undefined`    |
| `fieldId`     | `field-id`    | Unique ID for the native range input element. Auto-generated if not provided. | `string`                                   | `undefined`    |
| `isDisabled`  | `is-disabled` | Whether the range is disabled.                                                | `boolean`                                  | `false`        |
| `isRequired`  | `is-required` | Whether the range is required.                                                | `boolean`                                  | `false`        |
| `label`       | `label`       | Optional label text.                                                          | `string`                                   | `undefined`    |
| `max`         | `max`         | Maximum value.                                                                | `number`                                   | `100`          |
| `min`         | `min`         | Minimum value.                                                                | `number`                                   | `0`            |
| `mode`        | `mode`        | Single thumb or dual thumb (range selection).                                 | `"range" \| "single"`                      | `'single'`     |
| `name`        | `name`        | The name attribute for the range.                                             | `string`                                   | `undefined`    |
| `orientation` | `orientation` | Layout orientation.                                                           | `"horizontal" \| "vertical"`               | `'horizontal'` |
| `size`        | `size`        | Size of the range track. Thumb remains constant.                              | `string`                                   | `'base'`       |
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
