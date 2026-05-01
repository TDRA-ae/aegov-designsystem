# aegov-radio-group



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute     | Description                                                                        | Type                                        | Default      |
| ------------------- | ------------- | ---------------------------------------------------------------------------------- | ------------------------------------------- | ------------ |
| `extraClass`        | `extra-class` | Additional CSS classes to apply.                                                   | `string`                                    | `undefined`  |
| `isDisabled`        | `is-disabled` | Disables all radios within the group via native fieldset disabled.                 | `boolean`                                   | `false`      |
| `label`             | `label`       | Optional label rendered as a <legend> for accessibility.                           | `string`                                    | `undefined`  |
| `name` _(required)_ | `name`        | The name shared by all radios in the group. Ensures native single-select behavior. | `string`                                    | `undefined`  |
| `orientation`       | `orientation` | Stack direction for radio items.                                                   | `"horizontal" \| "vertical"`                | `'vertical'` |
| `size`              | `size`        | Size of all radios in the group. Propagated to children.                           | `string`                                    | `'base'`     |
| `variant`           | `variant`     | Visual variant for the group layout.                                               | `"cards" \| "default" \| "list" \| "pills"` | `'default'`  |


## Events

| Event                   | Description                                                           | Type                              |
| ----------------------- | --------------------------------------------------------------------- | --------------------------------- |
| `aegovRadioGroupChange` | Emitted when the selected radio changes. Contains the selected value. | `CustomEvent<{ value: string; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
