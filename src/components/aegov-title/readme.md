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

| Property      | Attribute      | Description                                                                                                                                                                      | Type                                          | Default     |
| ------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ----------- |
| `extraClass`  | `extra-class`  | Additional CSS classes to apply to the title.                                                                                                                                    | `string`                                      | `undefined` |
| `headingType` | `heading-type` | The semantic wrapper tag for the title. When set, renders the title inside the specified heading tag (`h2`–`h6`) or a `p`. When omitted, the title renders as a `<p>` (default). | `"h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "p"` | `undefined` |
| `size`        | `size`         | The size of the title text.                                                                                                                                                      | `string`                                      | `'base'`    |


## Slots

| Slot        | Description       |
| ----------- | ----------------- |
| `"default"` | The title content |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
