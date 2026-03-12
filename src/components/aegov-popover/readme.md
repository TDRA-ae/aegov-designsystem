# aegov-popover



<!-- Auto Generated Below -->


## Overview

Popover component that displays positioned content with an arrow marker

## Properties

| Property      | Attribute      | Description                                             | Type                                     | Default    |
| ------------- | -------------- | ------------------------------------------------------- | ---------------------------------------- | ---------- |
| `align`       | `align`        | Alignment of the popover                                | `"center" \| "end" \| "start"`           | `'center'` |
| `disabled`    | `disabled`     | Whether the popover is disabled                         | `boolean`                                | `false`    |
| `gap`         | `gap`          | Gap between popover and trigger element (in pixels)     | `number`                                 | `10`       |
| `hideDelay`   | `hide-delay`   | Delay before hiding popover on hover (in milliseconds)  | `number`                                 | `0`        |
| `offset`      | `offset`       | Additional offset for popover positioning (in pixels)   | `number`                                 | `0`        |
| `position`    | `position`     | Position of the popover relative to the trigger element | `"bottom" \| "left" \| "right" \| "top"` | `'bottom'` |
| `showDelay`   | `show-delay`   | Delay before showing popover on hover (in milliseconds) | `number`                                 | `200`      |
| `triggerType` | `trigger-type` | Trigger type for showing the popover                    | `"click" \| "hover"`                     | `'click'`  |


## Events

| Event               | Description                 | Type                |
| ------------------- | --------------------------- | ------------------- |
| `aegovPopoverClose` | Emitted when popover closes | `CustomEvent<void>` |
| `aegovPopoverOpen`  | Emitted when popover opens  | `CustomEvent<void>` |


## Slots

| Slot                | Description                           |
| ------------------- | ------------------------------------- |
|                     | Trigger element (button, link, etc.)  |
| `"popover-content"` | Popover content (any HTML/components) |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
