# aegov-range



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                                                 | Type                                                         | Default        |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | -------------- |
| `display`      | `display`       | Value display mode.                                                                                                                         | `"full" \| "none" \| "thumb" \| "tooltip"`                   | `'none'`       |
| `errorMessage` | `error-message` | Inline error message. Use `error` slot for rich markup.                                                                                     | `string`                                                     | `''`           |
| `extraClass`   | `extra-class`   | Additional CSS classes.                                                                                                                     | `string`                                                     | `undefined`    |
| `fieldId`      | `field-id`      | Unique ID for the native range input element. Auto-generated if not provided.                                                               | `string`                                                     | `undefined`    |
| `hint`         | `hint`          | Helper hint shown below the control. Hidden when an error is shown.                                                                         | `string`                                                     | `''`           |
| `isDisabled`   | `is-disabled`   | Whether the range is disabled.                                                                                                              | `boolean`                                                    | `false`        |
| `isInvalid`    | `is-invalid`    | Visual + a11y invalid state. See §2.3.                                                                                                      | `boolean`                                                    | `false`        |
| `isRequired`   | `is-required`   | Whether the range is required.                                                                                                              | `boolean`                                                    | `false`        |
| `label`        | `label`         | Optional label text.                                                                                                                        | `string`                                                     | `undefined`    |
| `max`          | `max`           | Maximum value.                                                                                                                              | `number`                                                     | `100`          |
| `min`          | `min`           | Minimum value.                                                                                                                              | `number`                                                     | `0`            |
| `mode`         | `mode`          | Single thumb or dual thumb (range selection).                                                                                               | `"range" \| "single"`                                        | `'single'`     |
| `name`         | `name`          | The name attribute for the range.                                                                                                           | `string`                                                     | `undefined`    |
| `orientation`  | `orientation`   | Layout orientation.                                                                                                                         | `"horizontal" \| "vertical"`                                 | `'horizontal'` |
| `size`         | `size`          | Size of the range track. Thumb remains constant.                                                                                            | `string`                                                     | `'base'`       |
| `step`         | `step`          | Step increment.                                                                                                                             | `number`                                                     | `1`            |
| `value`        | `value`         | Current value (single mode).                                                                                                                | `number`                                                     | `50`           |
| `valueHigh`    | `value-high`    | High thumb value (range mode).                                                                                                              | `number`                                                     | `75`           |
| `valueLow`     | `value-low`     | Low thumb value (range mode).                                                                                                               | `number`                                                     | `25`           |
| `variant`      | `variant`       | Colour family. Drives idle ring/border, selected/checked fill, and value/accent text. Focus ring stays camel; error stays aered regardless. | `"neutral-max" \| "neutral-min" \| "primary" \| "secondary"` | `'primary'`    |


## Events

| Event              | Description                                | Type                                                                      |
| ------------------ | ------------------------------------------ | ------------------------------------------------------------------------- |
| `aegovRangeChange` | Emitted on release (value committed).      | `CustomEvent<{ value?: number; valueLow?: number; valueHigh?: number; }>` |
| `aegovRangeInput`  | Emitted during drag on every value update. | `CustomEvent<{ value?: number; valueLow?: number; valueHigh?: number; }>` |
| `aegovValidate`    | Unified validation event. See §2.3.        | `CustomEvent<AegovValidationDetail<AegovRangeValue>>`                     |


## Methods

### `setCustomValidity(message: string) => Promise<void>`

Mirror of HTMLInputElement.setCustomValidity().

#### Parameters

| Name      | Type     | Description |
| --------- | -------- | ----------- |
| `message` | `string` |             |

#### Returns

Type: `Promise<void>`



### `validate(trigger?: AegovValidationTrigger) => Promise<AegovValidationResult>`

Imperatively re-run validation.

#### Parameters

| Name      | Type                                                    | Description |
| --------- | ------------------------------------------------------- | ----------- |
| `trigger` | `"input" \| "blur" \| "submit" \| "change" \| "manual"` |             |

#### Returns

Type: `Promise<AegovValidationResult>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
