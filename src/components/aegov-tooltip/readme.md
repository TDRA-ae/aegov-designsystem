# aegov-tooltip



<!-- Auto Generated Below -->


## Overview

Tooltip component that displays additional information on hover or click

## Properties

| Property      | Attribute     | Description                                                                                                | Type                                     | Default     |
| ------------- | ------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ----------- |
| `align`       | `align`       | Alignment of the tooltip                                                                                   | `"center" \| "end" \| "start"`           | `'center'`  |
| `content`     | `content`     | Tooltip content text (alternative to using slot)                                                           | `string`                                 | `undefined` |
| `disabled`    | `disabled`    | Whether the tooltip is disabled                                                                            | `boolean`                                | `false`     |
| `gap`         | `gap`         | Gap between tooltip and trigger element (in pixels)                                                        | `number`                                 | `8`         |
| `hideDelay`   | `hide-delay`  | Delay before hiding tooltip (in milliseconds)                                                              | `number`                                 | `0`         |
| `interactive` | `interactive` | Whether the tooltip contains interactive content This adds ARIA attributes and prevents auto-hide on hover | `boolean`                                | `false`     |
| `offset`      | `offset`      | Additional offset for tooltip positioning (in pixels)                                                      | `number`                                 | `0`         |
| `position`    | `position`    | Position of the tooltip relative to the trigger element                                                    | `"bottom" \| "left" \| "right" \| "top"` | `'top'`     |
| `showDelay`   | `show-delay`  | Delay before showing tooltip (in milliseconds)                                                             | `number`                                 | `200`       |
| `trigger`     | `trigger`     | Trigger type for showing the tooltip                                                                       | `"click" \| "hover"`                     | `'hover'`   |


## Slots

| Slot                | Description                                         |
| ------------------- | --------------------------------------------------- |
|                     | Trigger element (button, link, etc.)                |
| `"tooltip-content"` | Tooltip content (alternative to using content prop) |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
