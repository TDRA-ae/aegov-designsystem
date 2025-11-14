# aegov-badge

A versatile badge component for displaying labels, status indicators, tags, and counts with multiple visual styles.

## Features

- **17 Color Variants**: Extensive color palette including UAE Government brand colors
- **2 Appearances**: Soft (subtle) and Solid (bold) styles
- **3 Sizes**: Small, Base, and Large
- **Dismissible**: Optional close button with custom event handling
- **Accessible**: Semantic HTML with proper ARIA attributes

## Overview

Badges are compact UI elements used to highlight important information, display status, show counts, or categorize content. They support a wide range of colors and can be customized to match different use cases.

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                | Type                                                                                                                                                                                                           | Default     |
| ------------- | ------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `appearance`  | `appearance`  | The appearance style of the badge.         | `"soft" \| "solid"`                                                                                                                                                                                            | `'soft'`    |
| `color`       | `color`       | The color variant of the badge.            | `"aeblack" \| "aegold" \| "aegreen" \| "aered" \| "camel" \| "default" \| "desert" \| "fuchsia" \| "indigo" \| "lime" \| "pink" \| "primary" \| "purple" \| "seablue" \| "secondary" \| "slate" \| "techblue"` | `'default'` |
| `dismissible` | `dismissible` | Whether the badge can be dismissed/closed. | `boolean`                                                                                                                                                                                                      | `false`     |
| `size`        | `size`        | The badge size                             | `"base" \| "lg" \| "sm"`                                                                                                                                                                                       | `'base'`    |


## Events

| Event               | Description                                 | Type                |
| ------------------- | ------------------------------------------- | ------------------- |
| `aegovBadgeDismiss` | Emitted when the dismiss button is clicked. | `CustomEvent<void>` |


## Slots

| Slot        | Description                   |
| ----------- | ----------------------------- |
| `"default"` | The main content of the badge |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
