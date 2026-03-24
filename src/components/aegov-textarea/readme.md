# aegov-textarea



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                             | Type                                                       | Default      |
| ------------- | ------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------ |
| `class`       | `class`       | Additional CSS classes to apply.                                                        | `string`                                                   | `undefined`  |
| `copyable`    | `copyable`    | Show a copy button to copy the textarea value to clipboard. Only applies when readonly. | `boolean`                                                  | `false`      |
| `disabled`    | `disabled`    | Whether the textarea is disabled.                                                       | `boolean`                                                  | `false`      |
| `fieldId`     | `field-id`    | Unique ID for the native textarea element. Auto-generated if not provided.              | `string`                                                   | `undefined`  |
| `maxlength`   | `maxlength`   | Maximum number of characters. When set, a character counter is displayed.               | `number`                                                   | `undefined`  |
| `name`        | `name`        | The name attribute for the textarea.                                                    | `string`                                                   | `undefined`  |
| `placeholder` | `placeholder` | Placeholder text for the textarea.                                                      | `string`                                                   | `undefined`  |
| `readonly`    | `readonly`    | Whether the textarea is readonly.                                                       | `boolean`                                                  | `false`      |
| `required`    | `required`    | Whether the textarea is required.                                                       | `boolean`                                                  | `false`      |
| `resize`      | `resize`      | Resize behaviour of the textarea.                                                       | `"auto" \| "both" \| "horizontal" \| "none" \| "vertical"` | `'vertical'` |
| `size`        | `size`        | The size of the textarea (affects font size only).                                      | `"base" \| "lg" \| "sm" \| "xl" \| "xs"`                   | `'base'`     |
| `value`       | `value`       | The current value of the textarea.                                                      | `string`                                                   | `''`         |


## Events

| Event                 | Description                                        | Type                                            |
| --------------------- | -------------------------------------------------- | ----------------------------------------------- |
| `aegovTextareaBlur`   | Emitted when the textarea loses focus.             | `CustomEvent<FocusEvent>`                       |
| `aegovTextareaChange` | Emitted when the textarea value changes (on blur). | `CustomEvent<{ value: string; event: Event; }>` |
| `aegovTextareaFocus`  | Emitted when the textarea gains focus.             | `CustomEvent<FocusEvent>`                       |
| `aegovTextareaInput`  | Emitted on every keystroke.                        | `CustomEvent<{ value: string; event: Event; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
