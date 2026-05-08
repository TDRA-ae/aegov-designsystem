# aegov-input



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                                                                                  | Type                                                                                                                                     | Default     |
| -------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `errorMessage` | `error-message` | Inline error message rendered below the control when `isInvalid` is true. Auto-wires `aria-describedby` on the inner input. Use the `error` slot for richer markup.          | `string`                                                                                                                                 | `''`        |
| `extraClass`   | `extra-class`   | Additional CSS classes to apply.                                                                                                                                             | `string`                                                                                                                                 | `undefined` |
| `fieldId`      | `field-id`      | Unique ID for the native input element. Auto-generated if not provided.                                                                                                      | `string`                                                                                                                                 | `undefined` |
| `hint`         | `hint`          | Helper hint rendered below the control. Hidden when an error is shown so the two text regions don't compete for the user's attention. Use the `hint` slot for richer markup. | `string`                                                                                                                                 | `''`        |
| `isCopyable`   | `is-copyable`   | Show a copy button to copy the input value to clipboard. Only applies when readonly.                                                                                         | `boolean`                                                                                                                                | `false`     |
| `isDisabled`   | `is-disabled`   | Whether the input is disabled.                                                                                                                                               | `boolean`                                                                                                                                | `false`     |
| `isInvalid`    | `is-invalid`    | Visual + a11y invalid state. Toggles `aria-invalid="true"` on the inner input and adds the `is-invalid` class on the host. See validation-engine-addon.md §2.3.              | `boolean`                                                                                                                                | `false`     |
| `isReadonly`   | `is-readonly`   | Whether the input is readonly.                                                                                                                                               | `boolean`                                                                                                                                | `false`     |
| `isRequired`   | `is-required`   | Whether the input is required.                                                                                                                                               | `boolean`                                                                                                                                | `false`     |
| `isRevealable` | `is-revealable` | Show a toggle button to reveal/hide password. Only applies when type="password".                                                                                             | `boolean`                                                                                                                                | `false`     |
| `name`         | `name`          | The name attribute for the input.                                                                                                                                            | `string`                                                                                                                                 | `undefined` |
| `placeholder`  | `placeholder`   | Placeholder text for the input.                                                                                                                                              | `string`                                                                                                                                 | `undefined` |
| `size`         | `size`          | The size of the input field.                                                                                                                                                 | `string`                                                                                                                                 | `'base'`    |
| `type`         | `type`          | The type of the input field.                                                                                                                                                 | `"date" \| "datetime-local" \| "email" \| "month" \| "number" \| "password" \| "search" \| "tel" \| "text" \| "time" \| "url" \| "week"` | `'text'`    |
| `value`        | `value`         | The current value of the input.                                                                                                                                              | `string`                                                                                                                                 | `''`        |
| `variant`      | `variant`       | Colour family. Drives idle ring, value text, and accent hover. Focus ring stays camel; error stays aered regardless.                                                         | `"neutral-max" \| "neutral-min" \| "primary" \| "secondary"`                                                                             | `'primary'` |


## Events

| Event              | Description                                                                                                                                                                               | Type                                            |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `aegovInputBlur`   | Emitted when the input loses focus.                                                                                                                                                       | `CustomEvent<FocusEvent>`                       |
| `aegovInputChange` | Emitted when the input value changes (on blur/enter).                                                                                                                                     | `CustomEvent<{ value: string; event: Event; }>` |
| `aegovInputFocus`  | Emitted when the input gains focus.                                                                                                                                                       | `CustomEvent<FocusEvent>`                       |
| `aegovInputInput`  | Emitted on every keystroke.                                                                                                                                                               | `CustomEvent<{ value: string; event: Event; }>` |
| `aegovValidate`    | Unified validation event emitted on input/change/blur/manual triggers. Carries full validity snapshot for orchestrators (Layer 2) and BYO consumers. See validation-engine-addon.md §2.3. | `CustomEvent<AegovValidationDetail<string>>`    |


## Methods

### `setCustomValidity(message: string) => Promise<void>`

Mirror of `HTMLInputElement.setCustomValidity()`. Setting a non-empty message
marks the field invalid AND surfaces the message in the error region.
Pass an empty string to clear.

#### Parameters

| Name      | Type     | Description |
| --------- | -------- | ----------- |
| `message` | `string` |             |

#### Returns

Type: `Promise<void>`



### `validate(trigger?: AegovValidationTrigger) => Promise<AegovValidationResult>`

Imperatively re-run validation. Emits `aegovValidate` and returns the result.

#### Parameters

| Name      | Type                                                    | Description                                            |
| --------- | ------------------------------------------------------- | ------------------------------------------------------ |
| `trigger` | `"input" \| "blur" \| "submit" \| "change" \| "manual"` | Reason for the validation run; defaults to `'manual'`. |

#### Returns

Type: `Promise<AegovValidationResult>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
