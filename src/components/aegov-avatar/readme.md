# aegov-avatar

A flexible avatar component for displaying user profile images, initials, or icons with status indicators.

## Features

- **2 Variants**: Square and Rounded shapes
- **7 Sizes**: From XS (24px) to 3XL (80px)
- **Status Indicators**: Online/Offline status with customizable positioning
- **Image Support**: Displays images with fallback to slot content
- **Fallback Content**: Slot for initials, icons, or placeholder when no image
- **Accessible**: Alt text support for screen readers

## Overview

Avatars represent users or entities in the interface. They can display profile pictures, initials, or icons, with optional status indicators to show online/offline state or other status information.

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description                                                                                     | Type                                         | Default     |
| ------------ | ------------ | ----------------------------------------------------------------------------------------------- | -------------------------------------------- | ----------- |
| `alt`        | `alt`        | Alternative text for the image (required for accessibility)                                     | `string`                                     | `undefined` |
| `appearance` | `appearance` | The avatar appearance (shape)                                                                   | `"rounded" \| "square"`                      | `'square'`  |
| `size`       | `size`       | The avatar size                                                                                 | `string`                                     | `'base'`    |
| `src`        | `src`        | The image source URL                                                                            | `string`                                     | `undefined` |
| `status`     | `status`     | Status indicator type. Set to 'online' or 'offline' to show indicator, or 'none'/false to hide. | `"none" \| "offline" \| "online" \| boolean` | `'none'`    |


## Slots

| Slot | Description                                   |
| ---- | --------------------------------------------- |
|      | Avatar content (used when no src is provided) |


## Shadow Parts

| Part       | Description                  |
| ---------- | ---------------------------- |
| `"avatar"` | The avatar container element |
| `"image"`  | The avatar image element     |
| `"status"` | The status indicator element |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
