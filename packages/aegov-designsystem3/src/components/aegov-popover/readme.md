# aegov-popover



<!-- Auto Generated Below -->


## Overview

Popover component that displays positioned content with an arrow marker

## Properties

| Property     | Attribute     | Description                                                                                                                                         | Type                                     | Default     |
| ------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ----------- |
| `align`      | `align`       | Alignment of the popover                                                                                                                            | `"center" \| "end" \| "start"`           | `'center'`  |
| `delayEnd`   | `delay-end`   | Delay before hiding popover on hover (in milliseconds)                                                                                              | `number`                                 | `0`         |
| `delayStart` | `delay-start` | Delay before showing popover on hover (in milliseconds)                                                                                             | `number`                                 | `200`       |
| `fieldId`    | `field-id`    | Unique ID for the popover element. Auto-generated if not provided. The trigger element receives a derived ID `${fieldId}-trigger` for ARIA linkage. | `string`                                 | `undefined` |
| `gap`        | `gap`         | Gap between popover and trigger element (in pixels)                                                                                                 | `number`                                 | `10`        |
| `isDisabled` | `is-disabled` | Whether the popover is disabled                                                                                                                     | `boolean`                                | `false`     |
| `offset`     | `offset`      | Additional offset for popover positioning (in pixels)                                                                                               | `number`                                 | `0`         |
| `position`   | `position`    | Position of the popover relative to the trigger element                                                                                             | `"bottom" \| "left" \| "right" \| "top"` | `'bottom'`  |
| `trigger`    | `trigger`     | Trigger type for showing the popover                                                                                                                | `"click" \| "hover"`                     | `'click'`   |


## Events

| Event               | Description                 | Type                |
| ------------------- | --------------------------- | ------------------- |
| `aegovPopoverClose` | Emitted when popover closes | `CustomEvent<void>` |
| `aegovPopoverOpen`  | Emitted when popover opens  | `CustomEvent<void>` |


## Methods

### `closePopover() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Slots

| Slot                | Description                           |
| ------------------- | ------------------------------------- |
|                     | Trigger element (button, link, etc.)  |
| `"popover-content"` | Popover content (any HTML/components) |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
