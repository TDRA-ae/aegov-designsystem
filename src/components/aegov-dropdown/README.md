# aegov-dropdown

A flexible and accessible dropdown component with support for click or hover triggers, automatic positioning, keyboard navigation, and nested dropdowns.

## Features

- **Trigger Types**: Click or hover activation
- **Smart Positioning**: Auto-flips when space is limited (top, right, bottom, left)
- **Flexible Alignment**: Start, center, or end alignment
- **Auto-width**: Automatically adjusts to content width with configurable minimum
- **Nested Dropdowns**: Full support for multi-level dropdown menus
- **Keyboard Navigation**: Tab, Arrow keys, and Escape support
- **Focus Management**: Automatic focus trapping and restoration
- **Accessibility**: Full ARIA support with proper roles and attributes
- **Portal Rendering**: Content rendered to document.body to avoid z-index issues
- **Singleton Pattern**: Only one top-level dropdown open at a time (nested dropdowns exempt)

<!-- Auto Generated Below -->


## Overview

Dropdown component that displays positioned content on trigger interaction

## Properties

| Property      | Attribute      | Description                                              | Type                                     | Default    |
| ------------- | -------------- | -------------------------------------------------------- | ---------------------------------------- | ---------- |
| `align`       | `align`        | Alignment of the dropdown                                | `"center" \| "end" \| "start"`           | `'start'`  |
| `disabled`    | `disabled`     | Whether the dropdown is disabled                         | `boolean`                                | `false`    |
| `gap`         | `gap`          | Gap between dropdown and trigger element (in pixels)     | `number`                                 | `8`        |
| `hideDelay`   | `hide-delay`   | Delay before hiding dropdown (in milliseconds)           | `number`                                 | `0`        |
| `offset`      | `offset`       | Additional offset for dropdown positioning (in pixels)   | `number`                                 | `0`        |
| `position`    | `position`     | Position of the dropdown relative to the trigger element | `"bottom" \| "left" \| "right" \| "top"` | `'bottom'` |
| `showDelay`   | `show-delay`   | Delay before showing dropdown (in milliseconds)          | `number`                                 | `200`      |
| `triggerType` | `trigger-type` | Trigger type for showing the dropdown                    | `"click" \| "hover"`                     | `'click'`  |


## Events

| Event                | Description                  | Type                |
| -------------------- | ---------------------------- | ------------------- |
| `aegovDropdownClose` | Emitted when dropdown closes | `CustomEvent<void>` |
| `aegovDropdownOpen`  | Emitted when dropdown opens  | `CustomEvent<void>` |


## Slots

| Slot                 | Description                            |
| -------------------- | -------------------------------------- |
|                      | Trigger element (button, link, etc.)   |
| `"dropdown-content"` | Dropdown content (any HTML/components) |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
