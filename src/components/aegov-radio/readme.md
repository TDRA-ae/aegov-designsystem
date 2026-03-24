# aegov-radio



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                       | Type                                     | Default     |
| ------------- | ------------- | --------------------------------------------------------------------------------- | ---------------------------------------- | ----------- |
| `checked`     | `checked`     | Whether the radio is checked.                                                     | `boolean`                                | `false`     |
| `class`       | `class`       | Additional CSS classes to apply.                                                  | `string`                                 | `undefined` |
| `description` | `description` | Description text displayed below the label. Only rendered when label is provided. | `string`                                 | `undefined` |
| `disabled`    | `disabled`    | Whether the radio is disabled.                                                    | `boolean`                                | `false`     |
| `fieldId`     | `field-id`    | Unique ID for the native radio element. Auto-generated if not provided.           | `string`                                 | `undefined` |
| `label`       | `label`       | Label text for the radio. When provided, generates an associated <label> element. | `string`                                 | `undefined` |
| `name`        | `name`        | The name attribute for the radio. Required for native radio grouping.             | `string`                                 | `undefined` |
| `required`    | `required`    | Whether the radio is required.                                                    | `boolean`                                | `false`     |
| `size`        | `size`        | The size of the radio.                                                            | `"base" \| "lg" \| "sm" \| "xl" \| "xs"` | `'base'`    |
| `value`       | `value`       | The value attribute for the radio.                                                | `string`                                 | `undefined` |


## Events

| Event              | Description                                   | Type                                                 |
| ------------------ | --------------------------------------------- | ---------------------------------------------------- |
| `aegovRadioChange` | Emitted when the radio checked state changes. | `CustomEvent<{ checked: boolean; value?: string; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
