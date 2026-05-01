# aegov-tooltip

A short, non-interactive label that appears on hover or focus to clarify a control. Use a tooltip for icon-button labels, abbreviations, and brief disambiguating hints. For interactive content, rich descriptions, or anything the user needs to read carefully, use `aegov-popover`. For action menus, use `aegov-dropdown`.

## Properties

### `content`
String content for the tooltip. Use this for plain text. For richer content, use the `tooltip-content` slot.

```html
<aegov-tooltip content="Save the document">
  <aegov-button>Save</aegov-button>
</aegov-tooltip>
```

### `position`
`'top'` (default), `'right'`, `'bottom'`, or `'left'`. Placement relative to the trigger.

### `align`
`'start'`, `'center'` (default), or `'end'`. Cross-axis alignment.

### `trigger`
`'hover'` (default) or `'click'`. How the tooltip is shown.

### `gap`
Pixel distance between trigger and tooltip. Default `8`.

### `offset`
Additional cross-axis pixel offset. Default `0`.

### `is-disabled`
When `true`, the tooltip won't show.

### `delay-start`
Show delay (ms). Default `200`.

### `delay-end`
Hide delay (ms). Default `0`.

## Examples

### Icon button label

```html
<aegov-tooltip content="Settings">
  <aegov-button variant="ghost" aria-label="Settings">⚙</aegov-button>
</aegov-tooltip>
```

### Click tooltip with rich content

```html
<aegov-tooltip trigger="click" position="right">
  <aegov-button variant="ghost" size="sm">i</aegov-button>
  <span slot="tooltip-content">
    <strong>Tip:</strong> Press <kbd>⌘K</kbd> to search.
  </span>
</aegov-tooltip>
```

### Disabled tooltip when control is enabled

```html
<aegov-tooltip content="Already saved" is-disabled="true">
  <aegov-button>Save</aegov-button>
</aegov-tooltip>
```

## RTL Behavior

In RTL contexts, the tooltip mirrors `position="left"` and `position="right"` automatically. `align="start"` resolves to the inline-start edge — left in LTR, right in RTL. Horizontal `offset` is flipped automatically so positive values move the tooltip toward the inline-end edge.

## API Reference

### Properties

| Property      | Attribute      | Type                                     | Default    |
| ------------- | -------------- | ---------------------------------------- | ---------- |
| `content`     | `content`      | `string`                                 | —          |
| `position`    | `position`     | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'`    |
| `align`       | `align`        | `'start' \| 'center' \| 'end'`           | `'center'` |
| `trigger`     | `trigger`      | `'hover' \| 'click'`                     | `'hover'`  |
| `gap`         | `gap`          | `number`                                 | `8`        |
| `offset`      | `offset`       | `number`                                 | `0`        |
| `isDisabled`  | `is-disabled`  | `boolean`                                | `false`    |
| `delayStart`  | `delay-start`  | `number`                                 | `200`      |
| `delayEnd`    | `delay-end`    | `number`                                 | `0`        |

### Pass-through Attributes

`aria-*` and `data-*` attributes set on `<aegov-tooltip>` are forwarded onto the trigger wrapper.

### Events

The tooltip does not emit custom events.

### Slots

| Slot                | Description                                |
| ------------------- | ------------------------------------------ |
| (default)           | The trigger element.                       |
| `tooltip-content`   | Rich tooltip content (alternative to the `content` prop). |

## Accessibility

**Built in**

- Tooltip body has `role="tooltip"` with a stable, unique ID.
- When visible, the trigger gets `aria-describedby` pointing at the tooltip body, so screen readers announce it together with the trigger's accessible name.
- For `trigger="click"`, the trigger also gets `aria-expanded`.
- Escape hides a visible tooltip.
- For `trigger="click"`, an outside click hides the tooltip.
- Tooltip auto-repositions on scroll and resize.

**Developer responsibilities**

- The trigger slot must contain a focusable element so the tooltip can appear on keyboard focus (browser-managed via the underlying focusable child).
- Keep tooltip content short and non-interactive. For interactive content, switch to `aegov-popover`.
- The tooltip describes the trigger — it should not be the trigger's only accessible name. Provide a visible label or `aria-label` on the trigger for icon-only controls.

**Notes**

- `scoped: false` encapsulation: the tooltip body lives inside the host element (no portal). It uses fixed positioning and may be clipped by an ancestor with `overflow: hidden` and a transform. If clipping is an issue, prefer `aegov-popover`.
