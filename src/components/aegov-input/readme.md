# aegov-input



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                          | Type                                                                                                                                     | Default     |
| -------------- | --------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `extraClass`   | `extra-class`   | Additional CSS classes to apply.                                                     | `string`                                                                                                                                 | `undefined` |
| `fieldId`      | `field-id`      | Unique ID for the native input element. Auto-generated if not provided.              | `string`                                                                                                                                 | `undefined` |
| `isCopyable`   | `is-copyable`   | Show a copy button to copy the input value to clipboard. Only applies when readonly. | `boolean`                                                                                                                                | `false`     |
| `isDisabled`   | `is-disabled`   | Whether the input is disabled.                                                       | `boolean`                                                                                                                                | `false`     |
| `isReadonly`   | `is-readonly`   | Whether the input is readonly.                                                       | `boolean`                                                                                                                                | `false`     |
| `isRequired`   | `is-required`   | Whether the input is required.                                                       | `boolean`                                                                                                                                | `false`     |
| `isRevealable` | `is-revealable` | Show a toggle button to reveal/hide password. Only applies when type="password".     | `boolean`                                                                                                                                | `false`     |
| `name`         | `name`          | The name attribute for the input.                                                    | `string`                                                                                                                                 | `undefined` |
| `placeholder`  | `placeholder`   | Placeholder text for the input.                                                      | `string`                                                                                                                                 | `undefined` |
| `size`         | `size`          | The size of the input field.                                                         | `string`                                                                                                                                 | `'base'`    |
| `type`         | `type`          | The type of the input field.                                                         | `"date" \| "datetime-local" \| "email" \| "month" \| "number" \| "password" \| "search" \| "tel" \| "text" \| "time" \| "url" \| "week"` | `'text'`    |
| `value`        | `value`         | The current value of the input.                                                      | `string`                                                                                                                                 | `''`        |


## Events

| Event              | Description                                           | Type                                            |
| ------------------ | ----------------------------------------------------- | ----------------------------------------------- |
| `aegovInputBlur`   | Emitted when the input loses focus.                   | `CustomEvent<FocusEvent>`                       |
| `aegovInputChange` | Emitted when the input value changes (on blur/enter). | `CustomEvent<{ value: string; event: Event; }>` |
| `aegovInputFocus`  | Emitted when the input gains focus.                   | `CustomEvent<FocusEvent>`                       |
| `aegovInputInput`  | Emitted on every keystroke.                           | `CustomEvent<{ value: string; event: Event; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
