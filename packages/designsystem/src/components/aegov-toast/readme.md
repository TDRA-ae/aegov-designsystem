# aegov-toast



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description                                                                                                                                                                 | Type                                                                                              | Default       |
| ------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------- |
| `appearance`        | `appearance`          | Appearance style: soft (light bg) or solid (dark bg).                                                                                                                       | `"soft" \| "solid"`                                                                               | `'soft'`      |
| `duration`          | `duration`            | Auto-dismiss duration in milliseconds. 0 = no auto-dismiss.                                                                                                                 | `number`                                                                                          | `5000`        |
| `isDismissible`     | `is-dismissible`      | Whether the toast shows a close button.                                                                                                                                     | `boolean`                                                                                         | `true`        |
| `isProgressEnabled` | `is-progress-enabled` | Whether to show a countdown progress bar.                                                                                                                                   | `boolean`                                                                                         | `false`       |
| `mode`              | `mode`                | Display mode for multiple toasts at the same position. 'stack' = all toasts visible with gap between them (default). 'rack' = toasts collapse into a deck; hover to expand. | `"rack" \| "stack"`                                                                               | `'stack'`     |
| `position`          | `position`            | Screen position where the toast appears.                                                                                                                                    | `"bottom-center" \| "bottom-left" \| "bottom-right" \| "top-center" \| "top-left" \| "top-right"` | `'top-right'` |
| `variant`           | `variant`             | Semantic color variant of the toast.                                                                                                                                        | `"default" \| "error" \| "info" \| "success" \| "warning"`                                        | `'default'`   |


## Events

| Event               | Description                                                               | Type                |
| ------------------- | ------------------------------------------------------------------------- | ------------------- |
| `aegovToastClose`   | Emitted after the toast close animation completes and element is removed. | `CustomEvent<void>` |
| `aegovToastDismiss` | Emitted when the user clicks the dismiss button.                          | `CustomEvent<void>` |
| `aegovToastOpen`    | Emitted after the toast becomes visible.                                  | `CustomEvent<void>` |


## Methods

### `close() => Promise<void>`

Close the toast with exit animation and auto-remove from DOM.

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Show the toast notification.

#### Returns

Type: `Promise<void>`




## Slots

| Slot        | Description               |
| ----------- | ------------------------- |
| `"actions"` | Action buttons/links      |
| `"default"` | Toast description content |
| `"icon"`    | Custom icon               |
| `"title"`   | Toast title text          |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
