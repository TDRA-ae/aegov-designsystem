# aegov-textarea



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                            | Type                                                         | Default      |
| -------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------ |
| `errorMessage` | `error-message` | Inline error message rendered below the control when `isInvalid` is true. Use `error` slot for richer markup.          | `string`                                                     | `''`         |
| `extraClass`   | `extra-class`   | Additional CSS classes to apply.                                                                                       | `string`                                                     | `undefined`  |
| `fieldId`      | `field-id`      | Unique ID for the native textarea element. Auto-generated if not provided.                                             | `string`                                                     | `undefined`  |
| `hint`         | `hint`          | Helper hint rendered below the control. Hidden when an error is shown. Use `hint` slot for richer markup.              | `string`                                                     | `''`         |
| `isCopyable`   | `is-copyable`   | Show a copy button to copy the textarea value to clipboard. Only applies when readonly.                                | `boolean`                                                    | `false`      |
| `isDisabled`   | `is-disabled`   | Whether the textarea is disabled.                                                                                      | `boolean`                                                    | `false`      |
| `isInvalid`    | `is-invalid`    | Visual + a11y invalid state. Toggles `aria-invalid` and `.is-invalid` host class. See validation-engine-addon.md §2.3. | `boolean`                                                    | `false`      |
| `isReadonly`   | `is-readonly`   | Whether the textarea is readonly.                                                                                      | `boolean`                                                    | `false`      |
| `isRequired`   | `is-required`   | Whether the textarea is required.                                                                                      | `boolean`                                                    | `false`      |
| `maxlength`    | `maxlength`     | Maximum number of characters. When set, a character counter is displayed.                                              | `number`                                                     | `undefined`  |
| `name`         | `name`          | The name attribute for the textarea.                                                                                   | `string`                                                     | `undefined`  |
| `placeholder`  | `placeholder`   | Placeholder text for the textarea.                                                                                     | `string`                                                     | `undefined`  |
| `resize`       | `resize`        | Resize behaviour of the textarea.                                                                                      | `"auto" \| "both" \| "horizontal" \| "none" \| "vertical"`   | `'vertical'` |
| `size`         | `size`          | The size of the textarea (affects font size only).                                                                     | `string`                                                     | `'base'`     |
| `value`        | `value`         | The current value of the textarea.                                                                                     | `string`                                                     | `''`         |
| `variant`      | `variant`       | Colour family. Drives idle ring, value text, and accent hover.                                                         | `"neutral-max" \| "neutral-min" \| "primary" \| "secondary"` | `'primary'`  |


## Events

| Event                 | Description                                                    | Type                                            |
| --------------------- | -------------------------------------------------------------- | ----------------------------------------------- |
| `aegovTextareaBlur`   | Emitted when the textarea loses focus.                         | `CustomEvent<FocusEvent>`                       |
| `aegovTextareaChange` | Emitted when the textarea value changes (on blur).             | `CustomEvent<{ value: string; event: Event; }>` |
| `aegovTextareaFocus`  | Emitted when the textarea gains focus.                         | `CustomEvent<FocusEvent>`                       |
| `aegovTextareaInput`  | Emitted on every keystroke.                                    | `CustomEvent<{ value: string; event: Event; }>` |
| `aegovValidate`       | Unified validation event. See validation-engine-addon.md §2.3. | `CustomEvent<AegovValidationDetail<string>>`    |


## Methods

### `setCustomValidity(message: string) => Promise<void>`

Mirror of `HTMLTextAreaElement.setCustomValidity()`.

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
