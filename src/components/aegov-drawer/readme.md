# aegov-drawer



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute               | Description                                                                                                                                                                                                                                           | Type                                     | Default     |
| -------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ----------- |
| `animation`          | `animation`             | Animation strategy for open/close transitions                                                                                                                                                                                                         | `"fade" \| "none" \| "slide"`            | `'slide'`   |
| `fieldId`            | `field-id`              | Unique ID for the drawer dialog element. Auto-generated if not provided.                                                                                                                                                                              | `string`                                 | `undefined` |
| `isCloseWithOverlay` | `is-close-with-overlay` | Whether clicking the backdrop closes the drawer                                                                                                                                                                                                       | `boolean`                                | `true`      |
| `isOpen`             | `is-open`               | Whether the drawer is currently open/visible                                                                                                                                                                                                          | `boolean`                                | `false`     |
| `isOverlay`          | `is-overlay`            | Whether to show a backdrop overlay behind the drawer                                                                                                                                                                                                  | `boolean`                                | `true`      |
| `isPadding`          | `is-padding`            | Whether to apply inner content padding. On by default; scales with size.                                                                                                                                                                              | `boolean`                                | `true`      |
| `isPinned`           | `is-pinned`             | Whether the drawer is pinned flush to edges (true) or has a gap with rounded corners (false)                                                                                                                                                          | `boolean`                                | `true`      |
| `isPreventScroll`    | `is-prevent-scroll`     | Whether to prevent body scroll when drawer is open                                                                                                                                                                                                    | `boolean`                                | `true`      |
| `overlayOpacity`     | `overlay-opacity`       | Backdrop overlay opacity level                                                                                                                                                                                                                        | `"base" \| "dark" \| "light"`            | `'base'`    |
| `position`           | `position`              | Which edge the drawer slides from                                                                                                                                                                                                                     | `"bottom" \| "left" \| "right" \| "top"` | `'right'`   |
| `size`               | `size`                  | Size: 'sm' (compact padding), 'base' (default), or 'lg' (generous padding). Mirrors aegov-card sizing tokens. When `is-pinned="false"`, size also drives the edge gap and border-radius. When pinned, no border-radius is applied regardless of size. | `"base" \| "lg" \| "sm"`                 | `'base'`    |


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
