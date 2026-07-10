# aegov-select



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                                                 | Type                                                         | Default     |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ----------- |
| `appearance`   | `appearance`    | The visual appearance. 'default' renders a native select; 'listbox' renders a custom dropdown.                                              | `"default" \| "listbox"`                                     | `'default'` |
| `emptyMessage` | `empty-message` | Message shown when search yields no results. Empty string defaults to localized text via isRtl.                                             | `string`                                                     | `''`        |
| `errorMessage` | `error-message` | Inline error message. Use `error` slot for rich markup.                                                                                     | `string`                                                     | `''`        |
| `extraClass`   | `extra-class`   | Additional CSS classes to apply.                                                                                                            | `string`                                                     | `undefined` |
| `fieldId`      | `field-id`      | Unique ID for the select element. Auto-generated if not provided.                                                                           | `string`                                                     | `undefined` |
| `hint`         | `hint`          | Helper hint shown below the control. Hidden when an error is shown.                                                                         | `string`                                                     | `''`        |
| `isClearable`  | `is-clearable`  | Show a clear button to reset selection.                                                                                                     | `boolean`                                                    | `false`     |
| `isDisabled`   | `is-disabled`   | Whether the select is disabled.                                                                                                             | `boolean`                                                    | `false`     |
| `isInvalid`    | `is-invalid`    | Visual + a11y invalid state. See §2.3.                                                                                                      | `boolean`                                                    | `false`     |
| `isMultiple`   | `is-multiple`   | Whether multiple selection is enabled. Forces listbox behaviour.                                                                            | `boolean`                                                    | `false`     |
| `isRequired`   | `is-required`   | Whether the select is required.                                                                                                             | `boolean`                                                    | `false`     |
| `isSearchable` | `is-searchable` | Show a search input in the listbox dropdown to filter options. Only works with listbox appearance.                                          | `boolean`                                                    | `false`     |
| `name`         | `name`          | The name attribute for form submission.                                                                                                     | `string`                                                     | `undefined` |
| `placeholder`  | `placeholder`   | Placeholder text shown when nothing is selected.                                                                                            | `string`                                                     | `undefined` |
| `size`         | `size`          | The size of the select. Matches aegov-input height.                                                                                         | `string`                                                     | `'base'`    |
| `value`        | `value`         | The current selected value. For multiple, a comma-separated string.                                                                         | `string`                                                     | `''`        |
| `variant`      | `variant`       | Colour family. Drives idle ring/border, selected/checked fill, and value/accent text. Focus ring stays camel; error stays aered regardless. | `"neutral-max" \| "neutral-min" \| "primary" \| "secondary"` | `'primary'` |
| `visibleItems` | `visible-items` | Max visible items in the dropdown before scrolling.                                                                                         | `number`                                                     | `6`         |


## Events

| Event               | Description                                            | Type                                                   |
| ------------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| `aegovSelectChange` | Emitted when the selected value changes.               | `CustomEvent<SelectChangeDetail>`                      |
| `aegovSelectClose`  | Emitted when the dropdown closes (listbox appearance). | `CustomEvent<void>`                                    |
| `aegovSelectOpen`   | Emitted when the dropdown opens (listbox appearance).  | `CustomEvent<void>`                                    |
| `aegovValidate`     | Unified validation event. See §2.3.                    | `CustomEvent<AegovValidationDetail<AegovSelectValue>>` |


## Methods

### `setCustomValidity(message: string) => Promise<void>`

Mirror of HTMLSelectElement.setCustomValidity().

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
