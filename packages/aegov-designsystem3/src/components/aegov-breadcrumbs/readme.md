# aegov-breadcrumbs



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                  | Type                   | Default     |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------- | ----------- |
| `fieldId`     | `field-id`     | Unique ID for the breadcrumbs nav element. Auto-generated if not provided.                                   | `string`               | `undefined` |
| `isMicrodata` | `is-microdata` | Whether to add schema.org microdata for structured data                                                      | `boolean`              | `false`     |
| `maxLength`   | `max-length`   | Maximum number of characters before truncating breadcrumb item text. If not set, text will not be truncated. | `number`               | `undefined` |
| `separator`   | `separator`    | The separator style to use between breadcrumb items                                                          | `"chevron" \| "slash"` | `'slash'`   |


## Slots

| Slot | Description                                        |
| ---- | -------------------------------------------------- |
|      | Breadcrumb items (aegov-breadcrumbs-item elements) |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
