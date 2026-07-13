# aegov-bento-grid



<!-- Auto Generated Below -->


## Overview

Bento grid layout container for grouping `aegov-card` elements into a
balanced-but-non-uniform arrangement.

## Properties

| Property  | Attribute  | Description                                                                                                                         | Type               | Default         |
| --------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------ | --------------- |
| `cols`    | `cols`     | Number of columns. Tailwind-style breakpoint syntax supported, e.g. `cols="1 md:2 lg:4"`. Use `cols="1 md:..."` to stack on mobile. | `string`           | `'1 md:2 lg:3'` |
| `fieldId` | `field-id` | Optional id reflected on the inner wrapper. Auto-generated if not provided.                                                         | `string`           | `undefined`     |
| `flow`    | `flow`     | Auto-flow mode. 'dense' fills holes left by larger spans (bento packing), 'row' keeps strict DOM order.                             | `"dense" \| "row"` | `'dense'`       |
| `gap`     | `gap`      | Gap between cards. Named sizes: 'none', 'xs', 'sm', 'md', 'lg', 'xl'. Responsive syntax supported: `gap="sm md:md lg:lg"`.          | `string`           | `'md'`          |


## Slots

| Slot | Description                                                          |
| ---- | -------------------------------------------------------------------- |
|      | aegov-card elements (or any direct children) to arrange in the grid. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
