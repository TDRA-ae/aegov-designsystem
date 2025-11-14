# aegov-text

A paragraph text component with consistent sizing and vertical rhythm for body copy.

## Features

- **3 Sizes**: SM (14px), Base (16px), and LG (18px)
- **Default Bottom Margin**: mb-8 (32px/2rem) for consistent vertical rhythm
- **Custom Classes**: Accepts additional Tailwind CSS classes
- **No Top Margin**: mt-0 for spacing control
- **Flexible**: Classes can override defaults, including margin

## Overview

The text component provides a standardized paragraph element with consistent sizing and spacing. It's ideal for body copy, descriptions, and any multi-line text content, automatically maintaining proper vertical rhythm between paragraphs.

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                  | Type                     | Default     |
| -------- | --------- | -------------------------------------------- | ------------------------ | ----------- |
| `class`  | `class`   | Additional CSS classes to apply to the text. | `string`                 | `undefined` |
| `size`   | `size`    | The size of the text.                        | `"base" \| "lg" \| "sm"` | `'base'`    |


## Slots

| Slot        | Description      |
| ----------- | ---------------- |
| `"default"` | The text content |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
