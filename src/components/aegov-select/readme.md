# aegov-select



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                     | Type                     | Default              |
| -------------- | --------------- | ----------------------------------------------------------------------------------------------- | ------------------------ | -------------------- |
| `emptyMessage` | `empty-message` | Message shown when search yields no results.                                                    | `string`                 | `'No results found'` |
| `extraClass`   | `extra-class`   | Additional CSS classes to apply.                                                                | `string`                 | `undefined`          |
| `fieldId`      | `field-id`      | Unique ID for the select element. Auto-generated if not provided.                               | `string`                 | `undefined`          |
| `isClearable`  | `is-clearable`  | Show a clear button to reset selection.                                                         | `boolean`                | `false`              |
| `isDisabled`   | `is-disabled`   | Whether the select is disabled.                                                                 | `boolean`                | `false`              |
| `isMultiple`   | `is-multiple`   | Whether multiple selection is enabled. Forces listbox behaviour.                                | `boolean`                | `false`              |
| `isRequired`   | `is-required`   | Whether the select is required.                                                                 | `boolean`                | `false`              |
| `isSearchable` | `is-searchable` | Show a search input in the listbox dropdown to filter options. Only works with listbox variant. | `boolean`                | `false`              |
| `name`         | `name`          | The name attribute for form submission.                                                         | `string`                 | `undefined`          |
| `placeholder`  | `placeholder`   | Placeholder text shown when nothing is selected.                                                | `string`                 | `undefined`          |
| `size`         | `size`          | The size of the select. Matches aegov-input height.                                             | `string`                 | `'base'`             |
| `value`        | `value`         | The current selected value. For multiple, a comma-separated string.                             | `string`                 | `''`                 |
| `variant`      | `variant`       | The visual variant. 'default' renders a native select; 'listbox' renders a custom dropdown.     | `"default" \| "listbox"` | `'default'`          |
| `visibleItems` | `visible-items` | Max visible items in the dropdown before scrolling.                                             | `number`                 | `6`                  |


## Events

| Event               | Description                                         | Type                              |
| ------------------- | --------------------------------------------------- | --------------------------------- |
| `aegovSelectChange` | Emitted when the selected value changes.            | `CustomEvent<SelectChangeDetail>` |
| `aegovSelectClose`  | Emitted when the dropdown closes (listbox variant). | `CustomEvent<void>`               |
| `aegovSelectOpen`   | Emitted when the dropdown opens (listbox variant).  | `CustomEvent<void>`               |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
