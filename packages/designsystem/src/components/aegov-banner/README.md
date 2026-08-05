# aegov-banner



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                                                                                                                   | Type                                                       | Default     |
| --------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ----------- |
| `appearance`    | `appearance`     | The appearance style of the banner.                                                                                                                                                           | `"soft" \| "solid"`                                        | `'soft'`    |
| `display`       | `display`        | CSS positioning strategy: fixed (stays in viewport), sticky (scrolls then sticks).                                                                                                            | `"fixed" \| "sticky"`                                      | `'fixed'`   |
| `fieldId`       | `field-id`       | Unique ID for the banner element. Auto-generated if not provided. The heading element receives a derived ID `${fieldId}-heading` for ARIA labelledby.                                         | `string`                                                   | `undefined` |
| `isDismissible` | `is-dismissible` | Whether the banner can be dismissed/closed.                                                                                                                                                   | `boolean`                                                  | `true`      |
| `isFocusable`   | `is-focusable`   | Auto-focus the banner when mounted (for critical alerts only).                                                                                                                                | `boolean`                                                  | `false`     |
| `mode`          | `mode`           | Layout mode: push (takes up space in page flow), overlay (floats over content).                                                                                                               | `"overlay" \| "push"`                                      | `'push'`    |
| `position`      | `position`       | Vertical position of the banner (top or bottom of viewport/page).                                                                                                                             | `"bottom" \| "top"`                                        | `'top'`     |
| `size`          | `size`           | Size of the banner. Controls font size and vertical padding. Accepts a plain value (`"sm"`, `"base"`, `"lg"`) or a responsive string using Tailwind-style breakpoint prefixes (`"sm xl:lg"`). | `string`                                                   | `'base'`    |
| `variant`       | `variant`        | The variant of the banner. Determines the color scheme.                                                                                                                                       | `"default" \| "error" \| "info" \| "success" \| "warning"` | `'default'` |


## Events

| Event                     | Description                                                                                | Type                               |
| ------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------- |
| `aegovBannerDismiss`      | Event emitted when the banner is dismissed.                                                | `CustomEvent<void>`                |
| `aegovBannerHeightChange` | Event emitted when banner height changes (useful for overlay mode to adjust body padding). | `CustomEvent<{ height: number; }>` |


## Slots

| Slot        | Description                                              |
| ----------- | -------------------------------------------------------- |
| `"actions"` | Action buttons (optional)                                |
| `"default"` | The main content of the banner                           |
| `"icon"`    | Custom icon (optional, has fallback variant-based icons) |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
