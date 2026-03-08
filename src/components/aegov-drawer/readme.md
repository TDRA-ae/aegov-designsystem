# aegov-drawer



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description                                                                                  | Type                                     | Default   |
| ------------------- | --------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------- | --------- |
| `animation`         | `animation`           | Animation strategy for open/close transitions                                                | `"fade" \| "none" \| "slide"`            | `'slide'` |
| `closeWithBackdrop` | `close-with-backdrop` | Whether clicking the backdrop closes the drawer                                              | `boolean`                                | `true`    |
| `open`              | `open`                | Whether the drawer is currently open/visible                                                 | `boolean`                                | `false`   |
| `overlay`           | `overlay`             | Whether to show a backdrop overlay behind the drawer                                         | `boolean`                                | `true`    |
| `overlayOpacity`    | `overlay-opacity`     | Backdrop overlay opacity level                                                               | `"base" \| "dark" \| "light"`            | `'base'`  |
| `pinned`            | `pinned`              | Whether the drawer is pinned flush to edges (true) or has a gap with rounded corners (false) | `boolean`                                | `true`    |
| `position`          | `position`            | Which edge the drawer slides from                                                            | `"bottom" \| "left" \| "right" \| "top"` | `'right'` |
| `preventBodyScroll` | `prevent-body-scroll` | Whether to prevent body scroll when drawer is open                                           | `boolean`                                | `true`    |


## Events

| Event                      | Description                                | Type                                           |
| -------------------------- | ------------------------------------------ | ---------------------------------------------- |
| `aegovDrawerBackdropClick` | Emitted when backdrop is clicked           | `CustomEvent<MouseEvent>`                      |
| `aegovDrawerBeforeClose`   | Emitted before drawer closes (cancellable) | `CustomEvent<{ preventDefault: () => void; }>` |
| `aegovDrawerClose`         | Emitted when drawer is closed              | `CustomEvent<void>`                            |
| `aegovDrawerEscapePress`   | Emitted when ESC key is pressed            | `CustomEvent<KeyboardEvent>`                   |
| `aegovDrawerOpen`          | Emitted when drawer is opened              | `CustomEvent<void>`                            |


## Methods

### `close() => Promise<void>`

Programmatically close the drawer

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Programmatically open the drawer

#### Returns

Type: `Promise<void>`



### `toggle() => Promise<void>`

Toggle drawer open/closed state

#### Returns

Type: `Promise<void>`




## Slots

| Slot | Description    |
| ---- | -------------- |
|      | Drawer content |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
