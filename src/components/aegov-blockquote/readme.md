# aegov-blockquote

A styled blockquote component for displaying quotations with optional author attribution and citations.

## Features

- **2 Variants**: Primary (with quote icon) and Colored (with background and border)
- **Alternative Spelling**: Supports both "colored" and "coloured" variants
- **Author Attribution**: Display author name and title/position
- **Citations**: Cite attribute for URL source attribution
- **Semantic HTML**: Uses proper `<blockquote>` element for accessibility
- **Quote Icon**: SVG quote mark in primary variant

## Overview

Blockquotes are used to emphasize quotations, testimonials, or excerpts from other sources. They provide visual distinction from regular text and can include attribution to the original author or source.

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                  | Type                                   | Default     |
| ------------- | -------------- | ---------------------------- | -------------------------------------- | ----------- |
| `author`      | `author`       | The author source            | `string`                               | `undefined` |
| `authorTitle` | `author-title` | The author's title/position  | `string`                               | `undefined` |
| `cite`        | `cite`         | The citation source          | `string`                               | `undefined` |
| `variant`     | `variant`      | The blockquote variant style | `"colored" \| "coloured" \| "primary"` | `'primary'` |


## Slots

| Slot | Description        |
| ---- | ------------------ |
|      | Blockquote content |


## Shadow Parts

| Part           | Description                   |
| -------------- | ----------------------------- |
| `"blockquote"` | The native blockquote element |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
