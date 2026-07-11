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

| Property      | Attribute      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Type                                     | Default         |
| ------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | --------------- |
| `align`       | `align`        | Alignment of the dropdown                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `"center" \| "end" \| "start"`           | `'start'`       |
| `delayEnd`    | `delay-end`    | Delay before hiding dropdown (in milliseconds)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `number`                                 | `0`             |
| `delayStart`  | `delay-start`  | Delay before showing dropdown (in milliseconds)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `number`                                 | `200`           |
| `fieldId`     | `field-id`     | Unique ID for the dropdown menu element. Auto-generated if not provided. The trigger element receives a derived ID `${fieldId}-trigger` for ARIA linkage.                                                                                                                                                                                                                                                                                                                                                                                                                     | `string`                                 | `undefined`     |
| `gap`         | `gap`          | Gap between dropdown and trigger element (in pixels)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `number`                                 | `8`             |
| `isDisabled`  | `is-disabled`  | Whether the dropdown is disabled                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `boolean`                                | `false`         |
| `offset`      | `offset`       | Additional offset for dropdown positioning (in pixels)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `number`                                 | `0`             |
| `position`    | `position`     | Position of the dropdown relative to the trigger element                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `"bottom" \| "left" \| "right" \| "top"` | `'bottom'`      |
| `tabBehavior` | `tab-behavior` | Controls Tab key behaviour when the dropdown is open.  - `'menu-button'` (default): Tab closes the menu and lets the browser move   focus to the next element — follows the WAI-ARIA Menu Button pattern.   Use this for action menus, settings menus, and other non-navigation dropdowns.  - `'disclosure'`: Tab moves focus through the links inside the open menu,   then closes it when focus leaves the last item — follows the WAI-ARIA   Disclosure Navigation Hybrid pattern. Set automatically by   `aegov-navbar-item` when the dropdown is used as a nav sub-menu. | `"disclosure" \| "menu-button"`          | `'menu-button'` |
| `trigger`     | `trigger`      | Trigger type for showing the dropdown                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `"click" \| "hover"`                     | `'click'`       |


## Events

| Event                | Description                  | Type                |
| -------------------- | ---------------------------- | ------------------- |
| `aegovDropdownClose` | Emitted when dropdown closes | `CustomEvent<void>` |
| `aegovDropdownOpen`  | Emitted when dropdown opens  | `CustomEvent<void>` |


## Methods

### `closeDropdown() => Promise<void>`

Public method to close this dropdown
Used by other dropdowns to close this one when they open

#### Returns

Type: `Promise<void>`



### `toggle(viaKeyboard?: boolean, viaArrow?: boolean) => Promise<void>`

Toggle the dropdown open/closed state regardless of triggerType.
Allows external triggers (e.g. a navbar-item chevron) to drive the
dropdown when triggerType is 'hover' or 'click'.

#### Parameters

| Name          | Type      | Description                                                                                                                                                                      |
| ------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `viaKeyboard` | `boolean` | When true and this call opens the dropdown, the first focusable item receives focus (ARIA menu pattern). Pass true from keyboard handlers and false from pointer/mouse handlers. |
| `viaArrow`    | `boolean` |                                                                                                                                                                                  |

#### Returns

Type: `Promise<void>`




## Slots

| Slot                 | Description                            |
| -------------------- | -------------------------------------- |
|                      | Trigger element (button, link, etc.)   |
| `"dropdown-content"` | Dropdown content (any HTML/components) |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
