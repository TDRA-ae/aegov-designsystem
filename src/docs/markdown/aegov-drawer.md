# aegov-drawer

A side-anchored panel that slides in from the edge of the viewport. Use a drawer for navigation menus, filter panels, settings, and supplementary content that should remain accessible without leaving the current page. Prefer `aegov-modal` for centered, attention-blocking dialogs and `aegov-popover` for short, contextual content tied to a trigger.

## Properties

### `is-open`
Controls visibility. The drawer is hidden when `false` (default).

```html
<aegov-drawer is-open="true">
  <h2>Filters</h2>
</aegov-drawer>
```

### `position`
`'right'` (default), `'left'`, `'top'`, or `'bottom'`. The edge the drawer slides from.

```html
<aegov-drawer is-open="true" position="left">…</aegov-drawer>
```

### `size`
`'sm'`, `'base'` (default), or `'lg'`. Controls inner padding. When `is-pinned="false"` it also drives the edge gap and corner radius.

```html
<aegov-drawer is-open="true" size="lg">…</aegov-drawer>
```

### `animation`
`'slide'` (default), `'fade'`, or `'none'`. Selects the open/close transition.

```html
<aegov-drawer is-open="true" animation="fade">…</aegov-drawer>
```

### `is-pinned`
`true` (default) anchors the drawer flush against the viewport edge with no border-radius. `false` floats it with a gap and rounded corners.

```html
<aegov-drawer is-open="true" is-pinned="false">…</aegov-drawer>
```

### `is-overlay`
`true` (default) renders a dimmed backdrop. Set to `false` for a non-modal drawer (keeps page content visually unobscured).

### `overlay-opacity`
`'light'`, `'base'` (default), or `'dark'`. Backdrop dimming level.

### `is-close-with-overlay`
`true` (default) closes the drawer when the backdrop (or invisible click-catcher when `is-overlay="false"`) is clicked.

### `is-prevent-scroll`
`true` (default) locks body scroll while open. Reference-counted for stacked overlays.

### `is-padding`
`true` (default) applies inner content padding. Set to `false` for full-bleed content.

### `field-id`
Optional unique ID for the dialog element. Auto-generated if omitted.

## Sizes

```html
<aegov-drawer is-open="true" size="sm">…</aegov-drawer>
<aegov-drawer is-open="true" size="base">…</aegov-drawer>
<aegov-drawer is-open="true" size="lg">…</aegov-drawer>
```

## Examples

### Right-side filter panel

```html
<aegov-drawer id="filters" position="right" aria-labelledby="filters-title">
  <h2 id="filters-title">Filters</h2>
  <aegov-checkbox-group>…</aegov-checkbox-group>
</aegov-drawer>

<aegov-button id="open">Open filters</aegov-button>
<script>
  document.getElementById('open')
    .addEventListener('click', () => document.getElementById('filters').show());
</script>
```

### Floating drawer (unpinned)

```html
<aegov-drawer is-pinned="false" size="lg" position="right">
  <h2>Cart</h2>
  <p>3 items</p>
</aegov-drawer>
```

### Bottom sheet

```html
<aegov-drawer position="bottom" size="lg">
  <h2>Quick actions</h2>
</aegov-drawer>
```

### Non-modal drawer (no backdrop dim)

```html
<aegov-drawer is-overlay="false" position="right">
  <p>Inline help…</p>
</aegov-drawer>
```

## RTL Behavior

Drawer position is mirrored automatically by CSS logical properties: `position="right"` slides from the inline-end edge, which is the left edge in RTL. Use `left` and `right` as logical hints — the design system handles the flip.

## API Reference

### Properties

| Property                | Attribute                  | Type                                     | Default    |
| ----------------------- | -------------------------- | ---------------------------------------- | ---------- |
| `fieldId`               | `field-id`                 | `string`                                 | auto       |
| `isOpen`                | `is-open`                  | `boolean`                                | `false`    |
| `position`              | `position`                 | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'`  |
| `animation`             | `animation`                | `'slide' \| 'fade' \| 'none'`            | `'slide'`  |
| `size`                  | `size`                     | `'sm' \| 'base' \| 'lg'`                 | `'base'`   |
| `isPinned`              | `is-pinned`                | `boolean`                                | `true`     |
| `isOverlay`             | `is-overlay`               | `boolean`                                | `true`     |
| `overlayOpacity`        | `overlay-opacity`          | `'light' \| 'base' \| 'dark'`            | `'base'`   |
| `isCloseWithOverlay`    | `is-close-with-overlay`    | `boolean`                                | `true`     |
| `isPreventScroll`       | `is-prevent-scroll`        | `boolean`                                | `true`     |
| `isPadding`             | `is-padding`               | `boolean`                                | `true`     |

### Pass-through Attributes

`aria-label`, `aria-labelledby`, `aria-describedby`, and `data-*` attributes are forwarded onto the dialog element.

### Events

| Event                      | Description                                          | Detail                              |
| -------------------------- | ---------------------------------------------------- | ----------------------------------- |
| `aegovDrawerOpen`          | Fires when the drawer opens.                         | `void`                              |
| `aegovDrawerClose`         | Fires after the close animation completes.           | `void`                              |
| `aegovDrawerBeforeClose`   | Fires before close — call `preventDefault` to cancel. | `{ preventDefault: () => void }` |
| `aegovDrawerBackdropClick` | Fires when the backdrop is clicked.                  | `MouseEvent`                        |
| `aegovDrawerEscapePress`   | Fires when the user presses Escape.                  | `KeyboardEvent`                     |

### Event listening example

```js
const drawer = document.querySelector('aegov-drawer');
drawer.addEventListener('aegovDrawerOpen', () => analytics.track('drawer_open'));
drawer.addEventListener('aegovDrawerBeforeClose', (e) => {
  if (formIsDirty) e.detail.preventDefault();
});
```

### Slots

| Slot      | Description           |
| --------- | --------------------- |
| (default) | Drawer body content.  |

### Methods

| Method     | Description                               |
| ---------- | ----------------------------------------- |
| `show()`   | Open the drawer programmatically.         |
| `close()`  | Close the drawer (fires `aegovDrawerBeforeClose`). |
| `toggle()` | Flip open/closed state.                   |

## Accessibility

**Built in**

- `role="dialog"` and `aria-modal="true"` are set on the dialog element.
- Escape closes the drawer (non-configurable).
- Focus moves to the first focusable element on open and is trapped inside.
- On close, focus returns to the trigger element that opened the drawer.
- Body scroll is locked while open (reference-counted for stacked overlays).
- Z-index is managed via the shared overlay stack.

**Developer responsibilities**

- Provide an accessible name via `aria-labelledby` (preferred) or `aria-label`.
- Supply a focusable trigger element so focus restoration works on close.
- For non-modal drawers (`is-overlay="false"`), consider whether `aria-modal` is appropriate — by default it is set, which may not match a truly non-modal pattern.

**Notes**

- The drawer is moved to `document.body` on connect to escape ancestor stacking contexts.
- The drawer uses Shadow DOM (`shadow: true`).
- Open/close animation is ~300 ms (`animation="slide"` or `'fade'`); `'none'` finalises in ~50 ms.
