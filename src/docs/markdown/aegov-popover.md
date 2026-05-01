# aegov-popover

A floating dialog with a directional arrow, anchored to a trigger element. Use a popover for short, contextual content — help text, mini-forms, definitions, or controls that benefit from a visual connection to their trigger. Choose `aegov-tooltip` for short, hover-only labels, `aegov-dropdown` for action menus, and `aegov-modal` for blocking dialogs.

The popover content is rendered into a portal at `document.body` so it can escape ancestor clipping and stacking contexts.

## Properties

### `trigger`
`'click'` (default) or `'hover'`. Determines how the popover opens.

### `position`
`'top'`, `'right'`, `'bottom'` (default), or `'left'`. Preferred placement; auto-flips when the viewport doesn't have room.

### `align`
`'start'`, `'center'` (default), or `'end'`. Cross-axis alignment.

### `gap`
Pixel distance between trigger and popover panel. Default `10`.

### `offset`
Additional cross-axis pixel offset. Default `0`.

### `is-disabled`
When `true`, the popover won't open.

### `delay-start`
Open delay (ms). Default `200` — primarily for `trigger="hover"`.

### `delay-end`
Close delay (ms) on hover-out. Default `0`. A 100 ms grace period is enforced for hover triggers.

### `field-id`
Optional unique ID for the popover element. Auto-generated as `aegov-popover-{n}`. The trigger element receives `${fieldId}-trigger`.

## Examples

### Help popover

```html
<aegov-popover position="top">
  <aegov-button variant="ghost" size="sm">?</aegov-button>
  <div slot="popover-content">
    <p><strong>Tip:</strong> Use commas to separate values.</p>
  </div>
</aegov-popover>
```

### Hover popover with rich content

```html
<aegov-popover trigger="hover" position="right">
  <a href="/profile/jane">@jane</a>
  <div slot="popover-content">
    <aegov-avatar src="jane.jpg" alt="" />
    <strong>Jane Doe</strong>
    <p>Senior Designer</p>
  </div>
</aegov-popover>
```

### Mini-form

```html
<aegov-popover position="bottom" align="end">
  <aegov-button>Share</aegov-button>
  <div slot="popover-content">
    <aegov-input label="Email" type="email"></aegov-input>
    <aegov-button variant="primary">Send</aegov-button>
  </div>
</aegov-popover>
```

## RTL Behavior

`align="start"` resolves to the inline-start edge of the trigger — left in LTR, right in RTL. Position values (`top`/`bottom`/`left`/`right`) are physical and used as the preferred placement.

## API Reference

### Properties

| Property      | Attribute      | Type                                    | Default    |
| ------------- | -------------- | --------------------------------------- | ---------- |
| `fieldId`     | `field-id`     | `string`                                | auto       |
| `trigger`     | `trigger`      | `'click' \| 'hover'`                    | `'click'`  |
| `position`    | `position`     | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` |
| `align`       | `align`        | `'start' \| 'center' \| 'end'`          | `'center'` |
| `gap`         | `gap`          | `number`                                | `10`       |
| `offset`      | `offset`       | `number`                                | `0`        |
| `isDisabled`  | `is-disabled`  | `boolean`                               | `false`    |
| `delayStart`  | `delay-start`  | `number`                                | `200`      |
| `delayEnd`    | `delay-end`    | `number`                                | `0`        |

### Events

| Event                | Description                            | Detail |
| -------------------- | -------------------------------------- | ------ |
| `aegovPopoverOpen`   | Fires when the popover opens.          | `void` |
| `aegovPopoverClose`  | Fires when the popover closes.         | `void` |

### Event listening example

```js
const pop = document.querySelector('aegov-popover');
pop.addEventListener('aegovPopoverOpen', () => console.log('opened'));
```

### Slots

| Slot                | Description                                                          |
| ------------------- | -------------------------------------------------------------------- |
| (default)           | The trigger element.                                                 |
| `popover-content`   | The popover body. Anchors are reset to `display: block` in the portal. |

## Accessibility

**Built in**

- Trigger has `aria-haspopup="dialog"` and `aria-expanded` reflecting state; `aria-controls` points at the panel when open.
- The panel has `role="dialog"` and `aria-labelledby` pointing at the trigger.
- Escape closes the popover.
- Tab and Arrow Up/Down cycle focus through focusable items inside the popover.
- Focus moves into the popover on open and returns to the trigger on close (`preventScroll`, so the page doesn't jump).
- Only one popover is open at a time (no nesting).
- Auto-closes if the trigger scrolls out of the viewport.

**Developer responsibilities**

- The trigger slot must contain a focusable element.
- Provide an accessible name on the trigger.
- For dense informational content, prefer `aria-labelledby` on a heading inside the panel via additional ARIA wiring on your slotted content.

**Notes**

- `scoped: true` encapsulation: events from inside the panel re-target correctly through portal moves.
- The slot element is **moved** (not cloned) into the portal on open and moved back on close — preserves Stencil hydration for nested web components.
- The arrow element is positioned dynamically and clamped within the panel's rounded corners.
