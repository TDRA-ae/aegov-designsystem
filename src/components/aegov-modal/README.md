# aegov-modal



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                 | Description                                       | Type                            | Default    |
| ---------------------- | ------------------------- | ------------------------------------------------- | ------------------------------- | ---------- |
| `backdropOpacity`      | `backdrop-opacity`        | Backdrop opacity level                            | `"base" \| "dark" \| "light"`   | `'base'`   |
| `closeOnBackdropClick` | `close-on-backdrop-click` | Whether clicking the backdrop closes the modal    | `boolean`                       | `true`     |
| `closeOnEscape`        | `close-on-escape`         | Whether pressing ESC closes the modal             | `boolean`                       | `true`     |
| `open`                 | `open`                    | Whether the modal is currently open/visible       | `boolean`                       | `false`    |
| `position`             | `position`                | Position of the modal on screen                   | `"bottom" \| "center" \| "top"` | `'center'` |
| `preventBodyScroll`    | `prevent-body-scroll`     | Whether to prevent body scroll when modal is open | `boolean`                       | `true`     |


## Events

| Event                     | Description                               | Type                                           |
| ------------------------- | ----------------------------------------- | ---------------------------------------------- |
| `aegovModalBackdropClick` | Emitted when backdrop is clicked          | `CustomEvent<MouseEvent>`                      |
| `aegovModalBeforeClose`   | Emitted before modal closes (cancellable) | `CustomEvent<{ preventDefault: () => void; }>` |
| `aegovModalClose`         | Emitted when modal is closed              | `CustomEvent<void>`                            |
| `aegovModalEscapePress`   | Emitted when ESC key is pressed           | `CustomEvent<KeyboardEvent>`                   |
| `aegovModalOpen`          | Emitted when modal is opened              | `CustomEvent<void>`                            |


## Methods

### `close() => Promise<void>`

Programmatically close the modal

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Programmatically open the modal

#### Returns

Type: `Promise<void>`



### `toggle() => Promise<void>`

Toggle modal open/closed state

#### Returns

Type: `Promise<void>`




## Slots

| Slot | Description   |
| ---- | ------------- |
|      | Modal content |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
