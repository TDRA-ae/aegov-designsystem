# aegov-callout

A flexible alert/notification component for displaying important messages, warnings, errors, and informational content.

## Features

- **5 Variants**: Default, Error, Warning, Success, and Info with semantic color coding
- **2 Appearances**: Soft (subtle, with a coloured start-side border) and Solid (bold, no border)
- **Dismissible**: Optional close button with custom event handling
- **Rich Content**: Supports HTML content via default slot
- **Semantic HTML**: Uses `role="alert"` for accessibility

## Overview

Callouts (also known as alerts or notifications) draw attention to important information that requires user awareness or action. They use color and icons to communicate the type and urgency of the message.

<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                                                                                                                           | Type                                                       | Default     |
| --------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ----------- |
| `appearance`    | `appearance`     | The appearance style of the callout.                                                                                                                                                                  | `"soft" \| "solid"`                                        | `'soft'`    |
| `fieldId`       | `field-id`       | Unique ID for the callout element. Auto-generated if not provided.                                                                                                                                    | `string`                                                   | `undefined` |
| `isDismissible` | `is-dismissible` | Whether the callout can be dismissed/closed.                                                                                                                                                          | `boolean`                                                  | `false`     |
| `size`          | `size`           | The size of the callout. Controls font size, icon size, and padding. Accepts a plain value (`"sm"`, `"base"`, `"lg"`) or a responsive string using Tailwind-style breakpoint prefixes (`"sm xl:lg"`). | `string`                                                   | `'base'`    |
| `variant`       | `variant`        | The variant of the callout. Determines the color scheme.                                                                                                                                              | `"default" \| "error" \| "info" \| "success" \| "warning"` | `'default'` |


## Events

| Event                 | Description                                  | Type                |
| --------------------- | -------------------------------------------- | ------------------- |
| `aegovCalloutDismiss` | Event emitted when the callout is dismissed. | `CustomEvent<void>` |


## Slots

| Slot        | Description                                                                                                                |
| ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| `"actions"` | A group of buttons or links rendered below the content. Mutually exclusive with the link slot.                             |
| `"default"` | The main content of the callout                                                                                            |
| `"icon"`    | Custom icon replacing the default variant icon. Use an SVG or aegov-icon element.                                          |
| `"link"`    | A single aegov-link (or anchor) on the trailing side, before the dismiss button. Mutually exclusive with the actions slot. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
