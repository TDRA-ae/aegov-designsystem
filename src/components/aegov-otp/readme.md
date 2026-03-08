# aegov-otp



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description                                                                                                                                                                                                   | Type                                              | Default        |
| -------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | -------------- |
| `alphanumeric` | `alphanumeric` | Allow letters and numbers when true. Numbers only when false.                                                                                                                                                 | `boolean`                                         | `false`        |
| `class`        | `class`        | Additional CSS classes.                                                                                                                                                                                       | `string`                                          | `undefined`    |
| `disabled`     | `disabled`     | Disables all input cells.                                                                                                                                                                                     | `boolean`                                         | `false`        |
| `fieldId`      | `field-id`     | Unique ID for the first input cell. Auto-generated if not provided. Used by aegov-label for linking.                                                                                                          | `string`                                          | `undefined`    |
| `length`       | `length`       | Number of input cells (digits/characters expected).                                                                                                                                                           | `number`                                          | `5`            |
| `name`         | `name`         | Form field name for the hidden input (used in form submission).                                                                                                                                               | `string`                                          | `undefined`    |
| `pattern`      | `pattern`      | Regex pattern string for validation. Checked when all cells are filled.                                                                                                                                       | `string`                                          | `undefined`    |
| `size`         | `size`         | Size of the input cells. Maps to text size: xs, sm, base, lg, xl, 2xl.                                                                                                                                        | `"2xl" \| "base" \| "lg" \| "sm" \| "xl" \| "xs"` | `'base'`       |
| `value`        | `value`        | Current OTP value. Can be set externally to pre-fill cells.                                                                                                                                                   | `string`                                          | `''`           |
| `variant`      | `variant`      | Visual variant. "continuous" = single bordered box with dividers between cells. "individual" = separate bordered boxes per digit. Note: named "variant" to avoid conflict with native HTML "style" attribute. | `"continuous" \| "individual"`                    | `'continuous'` |


## Events

| Event              | Description                                                    | Type                                               |
| ------------------ | -------------------------------------------------------------- | -------------------------------------------------- |
| `aegovOtpChange`   | Fires on every character change with the current value.        | `CustomEvent<{ value: string; }>`                  |
| `aegovOtpComplete` | Fires when all cells are filled (and pattern is valid if set). | `CustomEvent<{ value: string; }>`                  |
| `aegovOtpInvalid`  | Fires when all cells are filled but pattern validation fails.  | `CustomEvent<{ value: string; pattern: string; }>` |


## Methods

### `clear() => Promise<void>`

Clears all cells and focuses the first cell.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
