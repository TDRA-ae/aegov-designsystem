# aegov-button



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                               | Type                              | Default    |
| ----------- | ------------ | ----------------------------------------- | --------------------------------- | ---------- |
| `disabled`  | `disabled`   | Whether the button is disabled            | `boolean`                         | `false`    |
| `fullWidth` | `full-width` | Whether the button should take full width | `boolean`                         | `false`    |
| `loading`   | `loading`    | Whether the button is in a loading state  | `boolean`                         | `false`    |
| `size`      | `size`       | The button size                           | `"base" \| "lg" \| "sm" \| "xs"`  | `'base'`   |
| `type`      | `type`       | The button type attribute                 | `"button" \| "reset" \| "submit"` | `'button'` |
| `variant`   | `variant`    | The button variant style                  | `"outline" \| "solid"`            | `'solid'`  |


## Events

| Event        | Description                            | Type                      |
| ------------ | -------------------------------------- | ------------------------- |
| `aegovBlur`  | Emitted when the button loses focus    | `CustomEvent<FocusEvent>` |
| `aegovClick` | Emitted when the button is clicked     | `CustomEvent<MouseEvent>` |
| `aegovFocus` | Emitted when the button receives focus | `CustomEvent<FocusEvent>` |


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
