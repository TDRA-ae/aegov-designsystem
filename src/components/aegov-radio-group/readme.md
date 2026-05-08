# aegov-radio-group



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute       | Description                                                                        | Type                                        | Default      |
| ------------------- | --------------- | ---------------------------------------------------------------------------------- | ------------------------------------------- | ------------ |
| `appearance`        | `appearance`    | Visual appearance for the group layout.                                            | `"cards" \| "default" \| "list" \| "pills"` | `'default'`  |
| `errorMessage`      | `error-message` | Inline error message.                                                              | `string`                                    | `''`         |
| `extraClass`        | `extra-class`   | Additional CSS classes to apply.                                                   | `string`                                    | `undefined`  |
| `hint`              | `hint`          | Helper hint shown below the legend when not invalid.                               | `string`                                    | `''`         |
| `isDisabled`        | `is-disabled`   | Disables all radios within the group via native fieldset disabled.                 | `boolean`                                   | `false`      |
| `isInvalid`         | `is-invalid`    | Visual + a11y invalid state. See §2.3.                                             | `boolean`                                   | `false`      |
| `isRequired`        | `is-required`   | Group is required — at least one radio must be selected. Aggregate-level only.     | `boolean`                                   | `false`      |
| `label`             | `label`         | Optional label rendered as a <legend> for accessibility.                           | `string`                                    | `undefined`  |
| `name` _(required)_ | `name`          | The name shared by all radios in the group. Ensures native single-select behavior. | `string`                                    | `undefined`  |
| `orientation`       | `orientation`   | Stack direction for radio items.                                                   | `"horizontal" \| "vertical"`                | `'vertical'` |
| `size`              | `size`          | Size of all radios in the group. Propagated to children.                           | `string`                                    | `'base'`     |


## Events

| Event                   | Description                                                           | Type                                         |
| ----------------------- | --------------------------------------------------------------------- | -------------------------------------------- |
| `aegovRadioGroupChange` | Emitted when the selected radio changes. Contains the selected value. | `CustomEvent<{ value: string; }>`            |
| `aegovValidate`         | Unified validation event (group-level aggregate). See §2.3.           | `CustomEvent<AegovValidationDetail<string>>` |


## Methods

### `setCustomValidity(message: string) => Promise<void>`

Set a custom error message.

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
