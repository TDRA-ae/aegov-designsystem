# aegov-accordion



<!-- Auto Generated Below -->


## Overview

Accordion component for collapsible content sections

## Properties

| Property      | Attribute      | Description                                                                                           | Type                  | Default     |
| ------------- | -------------- | ----------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `defaultOpen` | `default-open` | Index of the accordion item to open by default (0-based)                                              | `number`              | `undefined` |
| `fieldId`     | `field-id`     | Unique ID for the accordion wrapper element. Auto-generated if not provided.                          | `string`              | `undefined` |
| `icon`        | `icon`         | Icon style for accordion items                                                                        | `"chevron" \| "plus"` | `'chevron'` |
| `isBordered`  | `is-bordered`  | Whether to show border around the accordion                                                           | `boolean`             | `false`     |
| `isMultiple`  | `is-multiple`  | Whether multiple accordion items can be open at the same time                                         | `boolean`             | `false`     |
| `size`        | `size`         | Size of the accordion items — controls heading font size. sm = 14px, base = 16px (default), lg = 18px | `string`              | `'base'`    |


## Slots

| Slot | Description                                     |
| ---- | ----------------------------------------------- |
|      | Accordion items (aegov-accordion-item elements) |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
