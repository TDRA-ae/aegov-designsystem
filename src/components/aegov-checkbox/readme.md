# aegov-checkbox



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                                                                                                         | Type                                                         | Default     |
| ----------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ----------- |
| `errorMessage`    | `error-message`    | Inline error message. Use `error` slot for rich markup.                                                                                             | `string`                                                     | `''`        |
| `extraClass`      | `extra-class`      | Additional CSS classes to apply.                                                                                                                    | `string`                                                     | `undefined` |
| `fieldId`         | `field-id`         | Unique ID for the native checkbox element. Auto-generated if not provided.                                                                          | `string`                                                     | `undefined` |
| `hint`            | `hint`             | Helper hint text displayed below the label. Only rendered when label is provided and no error is shown. Renamed from `description` (decision §6.6). | `string`                                                     | `undefined` |
| `isCheckAll`      | `is-check-all`     | Marks this checkbox as a "check all" controller within a checkbox group.                                                                            | `boolean`                                                    | `false`     |
| `isChecked`       | `is-checked`       | Whether the checkbox is checked.                                                                                                                    | `boolean`                                                    | `false`     |
| `isDisabled`      | `is-disabled`      | Whether the checkbox is disabled.                                                                                                                   | `boolean`                                                    | `false`     |
| `isIndeterminate` | `is-indeterminate` | Whether the checkbox is in an indeterminate state. Set by parent group for check-all.                                                               | `boolean`                                                    | `false`     |
| `isInvalid`       | `is-invalid`       | Visual + a11y invalid state. Toggles `aria-invalid` + `is-invalid` host class. See §2.3.                                                            | `boolean`                                                    | `false`     |
| `isRequired`      | `is-required`      | Whether the checkbox is required.                                                                                                                   | `boolean`                                                    | `false`     |
| `label`           | `label`            | Label text for the checkbox. When provided, generates an associated <label> element.                                                                | `string`                                                     | `undefined` |
| `name`            | `name`             | The name attribute for the checkbox.                                                                                                                | `string`                                                     | `undefined` |
| `size`            | `size`             | The size of the checkbox.                                                                                                                           | `string`                                                     | `'base'`    |
| `value`           | `value`            | The value attribute for the checkbox.                                                                                                               | `string`                                                     | `undefined` |
| `variant`         | `variant`          | Colour family. Drives rest border, checked bg/border. Focus ring stays camel; error stays aered.                                                    | `"neutral-max" \| "neutral-min" \| "primary" \| "secondary"` | `'primary'` |


## Events

| Event                 | Description                                      | Type                                                 |
| --------------------- | ------------------------------------------------ | ---------------------------------------------------- |
| `aegovCheckboxChange` | Emitted when the checkbox checked state changes. | `CustomEvent<{ checked: boolean; value?: string; }>` |
| `aegovValidate`       | Unified validation event. See §2.3.              | `CustomEvent<AegovValidationDetail<boolean>>`        |


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
