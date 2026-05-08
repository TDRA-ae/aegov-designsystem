# aegov-separator



<!-- Auto Generated Below -->


## Overview

A separator component for visually dividing sections of content

## Properties

| Property       | Attribute       | Description                                                                                                                                                       | Type                                                         | Default        |
| -------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | -------------- |
| `appearance`   | `appearance`    | Appearance: 'solid' (full-strength line) or 'light' (subtle low-contrast line). Colour resolves from `variant`.                                                   | `"light" \| "solid"`                                         | `'solid'`      |
| `extraClass`   | `extra-class`   | Additional CSS classes merged onto the inner separator element.                                                                                                   | `string`                                                     | `undefined`    |
| `isDecorative` | `is-decorative` | Whether the separator is purely decorative (no semantic meaning)                                                                                                  | `boolean`                                                    | `true`         |
| `orientation`  | `orientation`   | Orientation of the separator                                                                                                                                      | `"horizontal" \| "vertical"`                                 | `'horizontal'` |
| `text`         | `text`          | Optional text label displayed at the center of the separator                                                                                                      | `string`                                                     | `undefined`    |
| `variant`      | `variant`       | Variant: colour family applied to line + text label. 'primary' (default), 'secondary', 'neutral-max' (aeblack-800 family), or 'neutral-min' (aeblack-100 family). | `"neutral-max" \| "neutral-min" \| "primary" \| "secondary"` | `'primary'`    |


## Slots

| Slot | Description                                                  |
| ---- | ------------------------------------------------------------ |
|      | Optional text label displayed at the center of the separator |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
