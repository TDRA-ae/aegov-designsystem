# aegov-modal

A centered, full-screen overlay dialog for high-priority interactions that demand the user's full attention. Use a modal for confirmations, blocking forms, or content that should pause the surrounding workflow. Prefer `aegov-drawer` for side-attached panels, `aegov-popover` for contextual content anchored to a trigger, and avoid modals for low-priority notifications (use `aegov-toast` instead).

## Properties

### `is-open`
Controls visibility. The modal is hidden when `false` (default).

```html
<aegov-modal is-open="true">
  <h2>Confirm action</h2>
  <p>Are you sure?</p>
</aegov-modal>
```

### `position`
`'center'` (default), `'top'`, or `'bottom'`. Anchors the dialog vertically.

```html
<aegov-modal is-open="true" position="top">…</aegov-modal>
```

### `size`
`'sm'`, `'base'` (default), or `'lg'`. Controls inner padding and border-radius. Mirrors `aegov-card` sizing tokens.

```html
<aegov-modal is-open="true" size="lg">…</aegov-modal>
```

### `overlay-opacity`
`'light'`, `'base'` (default), or `'dark'`. Adjusts backdrop dimming.

```html
<aegov-modal is-open="true" overlay-opacity="dark">…</aegov-modal>
```

### `is-close-with-overlay`
`true` (default) closes the modal when the backdrop is clicked. Set to `false` to require explicit dismissal.

```html
<aegov-modal is-open="true" is-close-with-overlay="false">…</aegov-modal>
```

### `is-prevent-scroll`
`true` (default) locks body scroll while open. The lock is reference-counted and supports stacked overlays.

### `is-padding`
`true` (default) applies inner content padding. Set to `false` for full-bleed content (e.g. media or custom layout).

```html
<aegov-modal is-open="true" is-padding="false">
  <img src="hero.jpg" alt="" />
</aegov-modal>
```

### `field-id`
Optional unique ID for the dialog element. Auto-generated as `aegov-modal-{n}` if omitted.

## Sizes

```html
<aegov-modal is-open="true" size="sm">…</aegov-modal>
<aegov-modal is-open="true" size="base">…</aegov-modal>
<aegov-modal is-open="true" size="lg">…</aegov-modal>
```

## Examples

### Confirmation dialog

```html
<aegov-modal id="confirm" aria-labelledby="confirm-title">
  <h2 id="confirm-title">Delete this item?</h2>
  <p>This action cannot be undone.</p>
  <div>
    <aegov-button variant="ghost" id="cancel">Cancel</aegov-button>
    <aegov-button variant="primary" appearance="solid">Delete</aegov-button>
  </div>
</aegov-modal>

<aegov-button id="trigger">Open</aegov-button>
<script>
  const modal = document.getElementById('confirm');
  document.getElementById('trigger').addEventListener('click', () => modal.show());
  document.getElementById('cancel').addEventListener('click', () => modal.close());
</script>
```

### Bottom sheet on mobile

```html
<aegov-modal position="bottom" size="lg" aria-labelledby="sheet-title">
  <h2 id="sheet-title">Filters</h2>
  <p>Refine your results…</p>
</aegov-modal>
```

### Cancellable close

```html
<aegov-modal id="form-modal">
  <form>…</form>
</aegov-modal>
<script>
  document.getElementById('form-modal')
    .addEventListener('aegovModalBeforeClose', (e) => {
      if (formIsDirty) e.detail.preventDefault();
    });
</script>
```

## RTL Behavior

Modal layout is symmetric and unaffected by writing direction. Backdrop, overlay opacity, and centered positioning behave identically in LTR and RTL. Slotted content inherits the host document's `dir` attribute.

## API Reference

### Properties

| Property                | Attribute                  | Type                              | Default    |
| ----------------------- | -------------------------- | --------------------------------- | ---------- |
| `fieldId`               | `field-id`                 | `string`                          | auto       |
| `isOpen`                | `is-open`                  | `boolean`                         | `false`    |
| `isCloseWithOverlay`    | `is-close-with-overlay`    | `boolean`                         | `true`     |
| `isPreventScroll`       | `is-prevent-scroll`        | `boolean`                         | `true`     |
| `isPadding`             | `is-padding`               | `boolean`                         | `true`     |
| `overlayOpacity`        | `overlay-opacity`          | `'light' \| 'base' \| 'dark'`     | `'base'`   |
| `position`              | `position`                 | `'center' \| 'top' \| 'bottom'`   | `'center'` |
| `size`                  | `size`                     | `'sm' \| 'base' \| 'lg'`          | `'base'`   |

### Pass-through Attributes

`aria-label`, `aria-labelledby`, `aria-describedby`, and any `data-*` attributes are forwarded onto the dialog element.

### Events

| Event                     | Description                                        | Detail                              |
| ------------------------- | -------------------------------------------------- | ----------------------------------- |
| `aegovModalOpen`          | Fires when the modal opens.                        | `void`                              |
| `aegovModalClose`         | Fires after the close animation completes.         | `void`                              |
| `aegovModalBeforeClose`   | Fires before close — call `preventDefault` to cancel. | `{ preventDefault: () => void }` |
| `aegovModalBackdropClick` | Fires when the backdrop is clicked.                | `MouseEvent`                        |
| `aegovModalEscapePress`   | Fires when the user presses Escape.                | `KeyboardEvent`                     |

### Event listening example

```js
const modal = document.querySelector('aegov-modal');
modal.addEventListener('aegovModalOpen', () => console.log('opened'));
modal.addEventListener('aegovModalBeforeClose', (e) => {
  if (hasUnsavedChanges()) e.detail.preventDefault();
});
```

### Slots

| Slot      | Description           |
| --------- | --------------------- |
| (default) | Modal body content.   |

### Methods

| Method     | Description                                |
| ---------- | ------------------------------------------ |
| `show()`   | Open the modal programmatically.           |
| `close()`  | Close the modal (fires `aegovModalBeforeClose` first). |
| `toggle()` | Flip open/closed state.                    |

## Accessibility

**Built in**

- `role="dialog"` and `aria-modal="true"` are set on the dialog element.
- Escape always closes the modal (non-configurable, per WAI-ARIA dialog pattern).
- Focus moves to the first focusable element inside the dialog when it opens.
- Tab cycles within the dialog (focus trap).
- On close, focus returns to the trigger element that opened the modal.
- Body scroll is locked while open, with reference counting for stacked overlays.
- Z-index is managed by a shared overlay stack so multiple modals layer correctly.

**Developer responsibilities**

- Provide an accessible name via `aria-labelledby` (preferred — points at the heading) or `aria-label`.
- Supply a focusable trigger element so focus restoration works on close.
- Ensure interactive controls inside the modal are reachable by keyboard.

**Notes**

- The modal element is moved to `document.body` on connect to escape ancestor stacking contexts. This is one-shot per element.
- The modal uses Shadow DOM (`shadow: true`); style it via the slotted content rather than internal classes.
- A 200 ms close animation runs before `aegovModalClose` fires.
