# aegov-callout



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                              | Type                                                       | Default     |
| ------------- | ------------- | -------------------------------------------------------- | ---------------------------------------------------------- | ----------- |
| `appearance`  | `appearance`  | The appearance style of the callout.                     | `"soft" \| "solid"`                                        | `'soft'`    |
| `bordered`    | `bordered`    | Whether the callout should have a border                 | `boolean`                                                  | `false`     |
| `dismissible` | `dismissible` | Whether the callout can be dismissed/closed.             | `boolean`                                                  | `false`     |
| `variant`     | `variant`     | The variant of the callout. Determines the color scheme. | `"default" \| "error" \| "info" \| "success" \| "warning"` | `'default'` |


## Events

| Event                 | Description                                  | Type                |
| --------------------- | -------------------------------------------- | ------------------- |
| `aegovCalloutDismiss` | Event emitted when the callout is dismissed. | `CustomEvent<void>` |


## Slots

| Slot        | Description                     |
| ----------- | ------------------------------- |
| `"default"` | The main content of the callout |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
