# aegov-callout

A flexible alert/notification component for displaying important messages, warnings, errors, and informational content.

## Features

- **5 Variants**: Default, Error, Warning, Success, and Info with semantic color coding
- **2 Appearances**: Soft (subtle) and Solid (bold) styles
- **Optional Border**: Add bordered style for additional emphasis
- **Dismissible**: Optional close button with custom event handling
- **Rich Content**: Supports HTML content via default slot
- **Semantic HTML**: Uses `role="alert"` for accessibility

## Overview

Callouts (also known as alerts or notifications) draw attention to important information that requires user awareness or action. They use color and icons to communicate the type and urgency of the message.

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                          | Type                                                       | Default     |
| ------------- | ------------- | -------------------------------------------------------------------- | ---------------------------------------------------------- | ----------- |
| `appearance`  | `appearance`  | The appearance style of the callout.                                 | `"soft" \| "solid"`                                        | `'soft'`    |
| `dismissible` | `dismissible` | Whether the callout can be dismissed/closed.                         | `boolean`                                                  | `false`     |
| `size`        | `size`        | The size of the callout. Controls font size, icon size, and padding. | `"base" \| "lg" \| "sm"`                                   | `'base'`    |
| `variant`     | `variant`     | The variant of the callout. Determines the color scheme.             | `"default" \| "error" \| "info" \| "success" \| "warning"` | `'default'` |


## Events

| Event                 | Description                                  | Type                |
| --------------------- | -------------------------------------------- | ------------------- |
| `aegovCalloutDismiss` | Event emitted when the callout is dismissed. | `CustomEvent<void>` |


## Slots

| Slot        | Description                     |
| ----------- | ------------------------------- |
| `"default"` | The main content of the callout |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
