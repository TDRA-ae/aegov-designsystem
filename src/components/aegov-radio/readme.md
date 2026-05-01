# aegov-radio



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                       | Type      | Default     |
| ------------- | ------------- | --------------------------------------------------------------------------------- | --------- | ----------- |
| `description` | `description` | Description text displayed below the label. Only rendered when label is provided. | `string`  | `undefined` |
| `extraClass`  | `extra-class` | Additional CSS classes to apply.                                                  | `string`  | `undefined` |
| `fieldId`     | `field-id`    | Unique ID for the native radio element. Auto-generated if not provided.           | `string`  | `undefined` |
| `isChecked`   | `is-checked`  | Whether the radio is checked.                                                     | `boolean` | `false`     |
| `isDisabled`  | `is-disabled` | Whether the radio is disabled.                                                    | `boolean` | `false`     |
| `isRequired`  | `is-required` | Whether the radio is required.                                                    | `boolean` | `false`     |
| `label`       | `label`       | Label text for the radio. When provided, generates an associated <label> element. | `string`  | `undefined` |
| `name`        | `name`        | The name attribute for the radio. Required for native radio grouping.             | `string`  | `undefined` |
| `size`        | `size`        | The size of the radio.                                                            | `string`  | `'base'`    |
| `value`       | `value`       | The value attribute for the radio.                                                | `string`  | `undefined` |


## Events

| Event              | Description                                   | Type                                                 |
| ------------------ | --------------------------------------------- | ---------------------------------------------------- |
| `aegovRadioChange` | Emitted when the radio checked state changes. | `CustomEvent<{ checked: boolean; value?: string; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
