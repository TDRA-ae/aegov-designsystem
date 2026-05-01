# aegov-checkbox



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                                           | Type      | Default     |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------- | --------- | ----------- |
| `description`     | `description`      | Description text displayed below the label. Only rendered when label is provided.     | `string`  | `undefined` |
| `extraClass`      | `extra-class`      | Additional CSS classes to apply.                                                      | `string`  | `undefined` |
| `fieldId`         | `field-id`         | Unique ID for the native checkbox element. Auto-generated if not provided.            | `string`  | `undefined` |
| `isCheckAll`      | `is-check-all`     | Marks this checkbox as a "check all" controller within a checkbox group.              | `boolean` | `false`     |
| `isChecked`       | `is-checked`       | Whether the checkbox is checked.                                                      | `boolean` | `false`     |
| `isDisabled`      | `is-disabled`      | Whether the checkbox is disabled.                                                     | `boolean` | `false`     |
| `isIndeterminate` | `is-indeterminate` | Whether the checkbox is in an indeterminate state. Set by parent group for check-all. | `boolean` | `false`     |
| `isRequired`      | `is-required`      | Whether the checkbox is required.                                                     | `boolean` | `false`     |
| `label`           | `label`            | Label text for the checkbox. When provided, generates an associated <label> element.  | `string`  | `undefined` |
| `name`            | `name`             | The name attribute for the checkbox.                                                  | `string`  | `undefined` |
| `size`            | `size`             | The size of the checkbox.                                                             | `string`  | `'base'`    |
| `value`           | `value`            | The value attribute for the checkbox.                                                 | `string`  | `undefined` |


## Events

| Event                 | Description                                      | Type                                                 |
| --------------------- | ------------------------------------------------ | ---------------------------------------------------- |
| `aegovCheckboxChange` | Emitted when the checkbox checked state changes. | `CustomEvent<{ checked: boolean; value?: string; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
