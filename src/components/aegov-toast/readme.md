# aegov-toast



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                                | Type                                                                                              | Default       |
| -------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------- |
| `appearance`   | `appearance`    | Appearance style: soft (light bg) or solid (dark bg).                                                                      | `"soft" \| "solid"`                                                                               | `'soft'`      |
| `dismissible`  | `dismissible`   | Whether the toast shows a close button.                                                                                    | `boolean`                                                                                         | `true`        |
| `duration`     | `duration`      | Auto-dismiss duration in milliseconds. 0 = no auto-dismiss.                                                                | `number`                                                                                          | `5000`        |
| `position`     | `position`      | Screen position where the toast appears.                                                                                   | `"bottom-center" \| "bottom-left" \| "bottom-right" \| "top-center" \| "top-left" \| "top-right"` | `'top-right'` |
| `showIcon`     | `show-icon`     | Whether to show the variant-specific icon.                                                                                 | `boolean`                                                                                         | `true`        |
| `showProgress` | `show-progress` | Whether to show a countdown progress bar.                                                                                  | `boolean`                                                                                         | `false`       |
| `stackable`    | `stackable`     | Whether multiple toasts can stack at the same position. false = replaces previous toast at the same position (cross-fade). | `boolean`                                                                                         | `true`        |
| `variant`      | `variant`       | Semantic color variant of the toast.                                                                                       | `"default" \| "error" \| "info" \| "success" \| "warning"`                                        | `'default'`   |


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

| Slot        | Description                             |
| ----------- | --------------------------------------- |
| `"actions"` | Action buttons/links                    |
| `"default"` | Toast message content                   |
| `"icon"`    | Custom icon (overrides variant default) |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
