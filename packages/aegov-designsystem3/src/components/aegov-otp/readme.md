# aegov-otp



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                                                                                 | Type                                                         | Default        |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | -------------- |
| `appearance`     | `appearance`      | Visual appearance. "continuous" = single bordered box with dividers between cells. "individual" = separate bordered boxes per digit.        | `"continuous" \| "individual"`                               | `'continuous'` |
| `errorMessage`   | `error-message`   | Inline error message. Use `error` slot for rich markup.                                                                                     | `string`                                                     | `''`           |
| `extraClass`     | `extra-class`     | Additional CSS classes.                                                                                                                     | `string`                                                     | `undefined`    |
| `fieldId`        | `field-id`        | Unique ID for the first input cell. Auto-generated if not provided. Used by aegov-label for linking.                                        | `string`                                                     | `undefined`    |
| `hint`           | `hint`            | Helper hint shown below the control. Hidden when an error is shown.                                                                         | `string`                                                     | `''`           |
| `isAlphanumeric` | `is-alphanumeric` | Allow letters and numbers when true. Numbers only when false.                                                                               | `boolean`                                                    | `false`        |
| `isDisabled`     | `is-disabled`     | Disables all input cells.                                                                                                                   | `boolean`                                                    | `false`        |
| `isInvalid`      | `is-invalid`      | Visual + a11y invalid state. See §2.3.                                                                                                      | `boolean`                                                    | `false`        |
| `isRequired`     | `is-required`     | Marks the field as required for form submission. Used by FormAssociated for `valueMissing`.                                                 | `boolean`                                                    | `false`        |
| `length`         | `length`          | Number of input cells (digits/characters expected).                                                                                         | `number`                                                     | `5`            |
| `name`           | `name`            | Form field name for FormAssociated submission.                                                                                              | `string`                                                     | `undefined`    |
| `pattern`        | `pattern`         | Regex pattern string for validation. Checked when all cells are filled.                                                                     | `string`                                                     | `undefined`    |
| `size`           | `size`            | Size of the input cells.                                                                                                                    | `string`                                                     | `'base'`       |
| `value`          | `value`           | Current OTP value. Can be set externally to pre-fill cells.                                                                                 | `string`                                                     | `''`           |
| `variant`        | `variant`         | Colour family. Drives idle ring/border, selected/checked fill, and value/accent text. Focus ring stays camel; error stays aered regardless. | `"neutral-max" \| "neutral-min" \| "primary" \| "secondary"` | `'primary'`    |


## Events

| Event              | Description                                                    | Type                                         |
| ------------------ | -------------------------------------------------------------- | -------------------------------------------- |
| `aegovOtpChange`   | Fires on every character change with the current value.        | `CustomEvent<{ value: string; }>`            |
| `aegovOtpComplete` | Fires when all cells are filled (and pattern is valid if set). | `CustomEvent<{ value: string; }>`            |
| `aegovValidate`    | Unified validation event. See §2.3.                            | `CustomEvent<AegovValidationDetail<string>>` |


## Methods

### `clear() => Promise<void>`

Clears all cells and focuses the first cell.

#### Returns

Type: `Promise<void>`



### `setCustomValidity(message: string) => Promise<void>`

Mirror of HTMLInputElement.setCustomValidity(). Marks field invalid + sets error message.

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
| `trigger` | `"manual" \| "input" \| "blur" \| "submit" \| "change"` |             |

#### Returns

Type: `Promise<AegovValidationResult>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
