# aegov-toggle



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                       | Type      | Default     |
| ------------- | ------------- | --------------------------------------------------------------------------------- | --------- | ----------- |
| `description` | `description` | Description text displayed below the label. Only rendered when label is provided. | `string`  | `undefined` |
| `fieldId`     | `field-id`    | Unique ID for the native checkbox element. Auto-generated if not provided.        | `string`  | `undefined` |
| `isChecked`   | `is-checked`  | Whether the toggle is checked/on.                                                 | `boolean` | `false`     |
| `isDisabled`  | `is-disabled` | Whether the toggle is disabled.                                                   | `boolean` | `false`     |
| `isRequired`  | `is-required` | Whether the toggle is required.                                                   | `boolean` | `false`     |
| `label`       | `label`       | Label text for the toggle. Rendered at the end (inline-end).                      | `string`  | `undefined` |
| `name`        | `name`        | The name attribute for the toggle.                                                | `string`  | `undefined` |
| `size`        | `size`        | The size of the toggle.                                                           | `string`  | `'base'`    |
| `value`       | `value`       | The value attribute for the toggle.                                               | `string`  | `undefined` |


## Events

| Event               | Description                                    | Type                                                 |
| ------------------- | ---------------------------------------------- | ---------------------------------------------------- |
| `aegovToggleChange` | Emitted when the toggle checked state changes. | `CustomEvent<{ checked: boolean; value?: string; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
