# aegov-checkbox-group



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                                           | Type                                                         | Default      |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------ |
| `appearance`   | `appearance`    | Visual appearance for the group layout.                                                                                               | `"cards" \| "default" \| "list" \| "pills"`                  | `'default'`  |
| `errorMessage` | `error-message` | Inline error message rendered below the legend when `isInvalid`.                                                                      | `string`                                                     | `''`         |
| `extraClass`   | `extra-class`   | Additional CSS classes to apply.                                                                                                      | `string`                                                     | `undefined`  |
| `hint`         | `hint`          | Helper hint shown below the legend when not invalid.                                                                                  | `string`                                                     | `''`         |
| `isDisabled`   | `is-disabled`   | Disables all checkboxes within the group via native fieldset disabled.                                                                | `boolean`                                                    | `false`      |
| `isInvalid`    | `is-invalid`    | Visual + a11y invalid state. See §2.3.                                                                                                | `boolean`                                                    | `false`      |
| `isRequired`   | `is-required`   | Group is required — at least one child checkbox must be checked. Aggregate-level only.                                                | `boolean`                                                    | `false`      |
| `label`        | `label`         | Optional label rendered as a <legend> for accessibility.                                                                              | `string`                                                     | `undefined`  |
| `orientation`  | `orientation`   | Stack direction for checkbox items.                                                                                                   | `"horizontal" \| "vertical"`                                 | `'vertical'` |
| `size`         | `size`          | Size of all checkboxes in the group. Propagated to children.                                                                          | `string`                                                     | `'base'`     |
| `variant`      | `variant`       | Colour family. Cascades to child checkboxes (only if child has no own variant). Focus ring stays camel; error stays aered regardless. | `"neutral-max" \| "neutral-min" \| "primary" \| "secondary"` | `'primary'`  |


## Events

| Event                      | Description                                                                            | Type                                           |
| -------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `aegovCheckboxGroupChange` | Emitted when any checkbox in the group changes. Contains all currently checked values. | `CustomEvent<{ values: string[]; }>`           |
| `aegovValidate`            | Unified validation event (group-level aggregate). See §2.3.                            | `CustomEvent<AegovValidationDetail<string[]>>` |


## Methods

### `setCustomValidity(message: string) => Promise<void>`

Set a custom error message; clears with empty string.

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
