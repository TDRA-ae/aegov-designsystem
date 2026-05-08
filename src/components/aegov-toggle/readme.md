# aegov-toggle



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                     | Type                                                         | Default     |
| -------------- | --------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ----------- |
| `errorMessage` | `error-message` | Inline error message. Use `error` slot for rich markup.                                                         | `string`                                                     | `''`        |
| `fieldId`      | `field-id`      | Unique ID for the native checkbox element. Auto-generated if not provided.                                      | `string`                                                     | `undefined` |
| `hint`         | `hint`          | Helper hint text displayed below the label. Renamed from `description` per §6.6. Hidden when an error is shown. | `string`                                                     | `undefined` |
| `isChecked`    | `is-checked`    | Whether the toggle is checked/on.                                                                               | `boolean`                                                    | `false`     |
| `isDisabled`   | `is-disabled`   | Whether the toggle is disabled.                                                                                 | `boolean`                                                    | `false`     |
| `isInvalid`    | `is-invalid`    | Visual + a11y invalid state. See §2.3.                                                                          | `boolean`                                                    | `false`     |
| `isRequired`   | `is-required`   | Whether the toggle is required.                                                                                 | `boolean`                                                    | `false`     |
| `label`        | `label`         | Label text for the toggle. Rendered at the end (inline-end).                                                    | `string`                                                     | `undefined` |
| `name`         | `name`          | The name attribute for the toggle.                                                                              | `string`                                                     | `undefined` |
| `size`         | `size`          | The size of the toggle.                                                                                         | `string`                                                     | `'base'`    |
| `value`        | `value`         | The value attribute for the toggle.                                                                             | `string`                                                     | `undefined` |
| `variant`      | `variant`       | Colour family. Drives ON track bg. OFF track stays aeblack-200. Focus ring stays camel; error stays aered.      | `"neutral-max" \| "neutral-min" \| "primary" \| "secondary"` | `'primary'` |


## Events

| Event               | Description                                    | Type                                                 |
| ------------------- | ---------------------------------------------- | ---------------------------------------------------- |
| `aegovToggleChange` | Emitted when the toggle checked state changes. | `CustomEvent<{ checked: boolean; value?: string; }>` |
| `aegovValidate`     | Unified validation event. See §2.3.            | `CustomEvent<AegovValidationDetail<boolean>>`        |


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
