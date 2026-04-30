# aegov-checkbox-group



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                            | Type                                        | Default      |
| ------------- | ------------- | ---------------------------------------------------------------------- | ------------------------------------------- | ------------ |
| `disabled`    | `disabled`    | Disables all checkboxes within the group via native fieldset disabled. | `boolean`                                   | `false`      |
| `extraClass`  | `extra-class` | Additional CSS classes to apply.                                       | `string`                                    | `undefined`  |
| `label`       | `label`       | Optional label rendered as a <legend> for accessibility.               | `string`                                    | `undefined`  |
| `orientation` | `orientation` | Stack direction for checkbox items.                                    | `"horizontal" \| "vertical"`                | `'vertical'` |
| `size`        | `size`        | Size of all checkboxes in the group. Propagated to children.           | `string`                                    | `'base'`     |
| `variant`     | `variant`     | Visual variant for the group layout.                                   | `"cards" \| "default" \| "list" \| "pills"` | `'default'`  |


## Events

| Event                      | Description                                                                            | Type                                 |
| -------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------ |
| `aegovCheckboxGroupChange` | Emitted when any checkbox in the group changes. Contains all currently checked values. | `CustomEvent<{ values: string[]; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
