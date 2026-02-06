# aegov-context-menu



<!-- Auto Generated Below -->


## Overview

Context menu component that displays positioned content on right-click

## Properties

| Property              | Attribute             | Description                                                    | Type      | Default     |
| --------------------- | --------------------- | -------------------------------------------------------------- | --------- | ----------- |
| `closeOnItemClick`    | `close-on-item-click` | Close menu when an item is clicked                             | `boolean` | `true`      |
| `disabled`            | `disabled`            | Whether the context menu is disabled                           | `boolean` | `false`     |
| `offset`              | `offset`              | Offset from cursor position (in pixels)                        | `number`  | `0`         |
| `target` _(required)_ | `target`              | CSS selector for target elements that trigger the context menu | `string`  | `undefined` |


## Events

| Event                   | Description                      | Type                                                                 |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------- |
| `aegovContextMenuClose` | Emitted when context menu closes | `CustomEvent<void>`                                                  |
| `aegovContextMenuOpen`  | Emitted when context menu opens  | `CustomEvent<{ x: number; y: number; targetElement: HTMLElement; }>` |


## Methods

### `close() => Promise<void>`

Public method to close the context menu

#### Returns

Type: `Promise<void>`



### `show(x: number, y: number) => Promise<void>`

Public method to show the context menu at specific coordinates

#### Parameters

| Name | Type     | Description |
| ---- | -------- | ----------- |
| `x`  | `number` |             |
| `y`  | `number` |             |

#### Returns

Type: `Promise<void>`




## Slots

| Slot | Description                        |
| ---- | ---------------------------------- |
|      | Menu content (any HTML/components) |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
