# aegov-button



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                               | Type                                       | Default     |
| ------------ | ------------ | ----------------------------------------- | ------------------------------------------ | ----------- |
| `appearance` | `appearance` | The button appearance (color scheme)      | `"primary" \| "secondary"`                 | `'primary'` |
| `disabled`   | `disabled`   | Whether the button is disabled            | `boolean`                                  | `false`     |
| `full`       | `full`       | Whether the button should take full width | `boolean`                                  | `false`     |
| `icon`       | `icon`       | Whether the button is only an icon        | `boolean`                                  | `false`     |
| `loading`    | `loading`    | Whether the button is in a loading state  | `boolean`                                  | `false`     |
| `size`       | `size`       | The button size                           | `"base" \| "lg" \| "sm" \| "xs"`           | `'base'`    |
| `type`       | `type`       | The button type attribute                 | `"button" \| "reset" \| "submit"`          | `'button'`  |
| `variant`    | `variant`    | The button variant style                  | `"link" \| "outline" \| "soft" \| "solid"` | `'solid'`   |


## Events

| Event              | Description                            | Type                      |
| ------------------ | -------------------------------------- | ------------------------- |
| `aegovButtonBlur`  | Emitted when the button loses focus    | `CustomEvent<FocusEvent>` |
| `aegovButtonClick` | Emitted when the button is clicked     | `CustomEvent<MouseEvent>` |
| `aegovButtonFocus` | Emitted when the button receives focus | `CustomEvent<FocusEvent>` |


## Slots

| Slot | Description    |
| ---- | -------------- |
|      | Button content |


## Shadow Parts

| Part       | Description               |
| ---------- | ------------------------- |
| `"button"` | The native button element |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
