# aegov-title

A simple, flexible title component for headings and emphasized text with customizable sizes.

## Features

- **4 Sizes**: Base (16px), LG (18px), XL (20px), and 2XL (24px)
- **Bold by Default**: Font-weight: bold for emphasis
- **Custom Classes**: Accepts additional Tailwind CSS classes
- **No Top Margin**: mt-0 for consistent spacing control
- **Flexible**: Renders as `<p>` element, works alongside semantic heading tags

## Overview

The title component provides a styled text element for headings and emphasized content. Unlike semantic HTML headings (`<h1>`, `<h2>`, etc.), it uses a `<p>` element for flexibility when heading hierarchy isn't needed or when you want visual emphasis without SEO implications.

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                   | Type                              | Default     |
| -------- | --------- | --------------------------------------------- | --------------------------------- | ----------- |
| `class`  | `class`   | Additional CSS classes to apply to the title. | `string`                          | `undefined` |
| `size`   | `size`    | The size of the title text.                   | `"2xl" \| "base" \| "lg" \| "xl"` | `'lg'`      |


## Slots

| Slot        | Description       |
| ----------- | ----------------- |
| `"default"` | The title content |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
