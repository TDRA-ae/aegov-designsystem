# aegov-progress



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                                                   | Type                  | Default     |
| --------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `counter`       | `counter`        | Counter placement. Hidden when not set.                                                                                       | `"top" \| "trailing"` | `undefined` |
| `counterSuffix` | `counter-suffix` | Suffix appended directly to the counter value. No automatic spacing.                                                          | `string`              | `''`        |
| `description`   | `description`    | Description text displayed below the progress bar.                                                                            | `string`              | `undefined` |
| `extraClass`    | `extra-class`    | Additional CSS classes.                                                                                                       | `string`              | `undefined` |
| `fieldId`       | `field-id`       | Unique ID for the native progress element. Auto-generated if not provided.                                                    | `string`              | `undefined` |
| `height`        | `height`         | Height using Tailwind spacing scale (1, 1.5, 2, 2.5, 3, 3.5, 4, etc.). Each unit = 0.25rem. Default "2" = h-2 = 0.5rem (8px). | `string`              | `'2'`       |
| `max`           | `max`            | Maximum value.                                                                                                                | `number`              | `100`       |
| `value`         | `value`          | Current value. When not set, shows indeterminate state.                                                                       | `number`              | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
