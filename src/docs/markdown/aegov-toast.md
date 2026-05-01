# aegov-toast

A transient, non-blocking notification that appears in a fixed corner of the viewport and auto-dismisses. Use a toast for asynchronous status updates ("Saved", "Connection lost"), confirmations, and undo affordances. For confirmations the user must acknowledge, use `aegov-modal`. For inline messages, use `aegov-callout`.

Toasts are rendered into a per-position portal container at `document.body`, so a single page can have multiple stacks (e.g. one in the top-right and one in the bottom-center).

## Properties

### `variant`
`'default'`, `'error'`, `'warning'`, `'success'`, or `'info'`. Controls the 4 px colored top border. `'default'` has no colored border.

```html
<aegov-toast variant="success">Saved</aegov-toast>
```

### `appearance`
`'soft'` (default, white background, dark text) or `'solid'` (dark background, white text).

```html
<aegov-toast appearance="solid">Update available</aegov-toast>
```

### `position`
Where the toast appears: `'top-right'` (default), `'top-left'`, `'top-center'`, `'bottom-right'`, `'bottom-left'`, or `'bottom-center'`.

### `duration`
Auto-dismiss timeout in milliseconds. `0` disables auto-dismiss. Default `5000`. Hovering the toast pauses the timer.

### `is-dismissible`
`true` (default) shows a close button.

### `mode`
`'stack'` (default) shows all toasts with a gap between them. `'rack'` collapses them into a single deck that expands on hover; older items peek behind the newest one and a count badge shows the total.

### `is-progress-enabled`
When `true` and `duration > 0`, renders a countdown progress bar. The bar pauses on hover.

## Examples

### Programmatic usage

Toasts are generally not declared in markup at the place they appear — instead, declare them anywhere in your DOM and call `show()`:

```html
<aegov-toast id="saved" variant="success" duration="3000">
  <span slot="title">Saved</span>
  Your changes were saved.
</aegov-toast>

<script>
  document.querySelector('#save-button').addEventListener('click', () => {
    document.getElementById('saved').show();
  });
</script>
```

### Toast with action

```html
<aegov-toast id="deleted" variant="default" duration="6000">
  <span slot="title">Item moved to trash</span>
  You can undo this action.
  <button slot="actions" type="button">Undo</button>
</aegov-toast>
```

### Custom icon

```html
<aegov-toast variant="info">
  <svg slot="icon" aria-hidden="true" width="20" height="20">…</svg>
  <span slot="title">Update available</span>
  Version 2.4 is ready to install.
</aegov-toast>
```

### Rack mode (collapsed deck)

```html
<aegov-toast mode="rack" position="bottom-right">First notification</aegov-toast>
<aegov-toast mode="rack" position="bottom-right">Second notification</aegov-toast>
<aegov-toast mode="rack" position="bottom-right">Third notification</aegov-toast>
```

## RTL Behavior

Position containers use logical CSS properties (`inset-inline-start`/`inset-inline-end`), so `top-right` and `bottom-right` resolve to the inline-end edge — that is, the left edge in RTL. Toast content inherits the host document's `dir`.

## API Reference

### Properties

| Property              | Attribute               | Type                                                                 | Default       |
| --------------------- | ----------------------- | -------------------------------------------------------------------- | ------------- |
| `variant`             | `variant`               | `'default' \| 'error' \| 'warning' \| 'success' \| 'info'`           | `'default'`   |
| `appearance`          | `appearance`            | `'soft' \| 'solid'`                                                  | `'soft'`      |
| `position`            | `position`              | `'top-right' \| 'top-left' \| 'top-center' \| 'bottom-right' \| 'bottom-left' \| 'bottom-center'` | `'top-right'` |
| `duration`            | `duration`              | `number`                                                             | `5000`        |
| `isDismissible`       | `is-dismissible`        | `boolean`                                                            | `true`        |
| `mode`                | `mode`                  | `'stack' \| 'rack'`                                                  | `'stack'`     |
| `isProgressEnabled`   | `is-progress-enabled`   | `boolean`                                                            | `false`       |

### Events

| Event                | Description                                                  | Detail |
| -------------------- | ------------------------------------------------------------ | ------ |
| `aegovToastOpen`     | Fires after the toast becomes visible.                       | `void` |
| `aegovToastClose`    | Fires after the close animation completes and DOM is removed. | `void` |
| `aegovToastDismiss`  | Fires when the user clicks the dismiss button.               | `void` |

### Event listening example

```js
const toast = document.querySelector('aegov-toast');
toast.addEventListener('aegovToastOpen', () => console.log('shown'));
toast.addEventListener('aegovToastClose', () => console.log('removed'));
```

### Slots

| Slot       | Description                                                |
| ---------- | ---------------------------------------------------------- |
| (default)  | Toast description text.                                    |
| `title`    | Toast title (rendered in bold above the description).      |
| `icon`     | Optional custom icon (no built-in variant icons).          |
| `actions`  | Action buttons or links rendered below the description.    |

### Methods

| Method     | Description                                                                |
| ---------- | -------------------------------------------------------------------------- |
| `show()`   | Display the toast. Moves it into the per-position portal container and starts the auto-close timer. |
| `close()`  | Begin exit animation, fire `aegovToastClose`, and remove from the DOM.     |

## Accessibility

**Built in**

- A persistent off-screen live region (`role="status"`, `aria-live="polite"`) is created at the document level. When `show()` is called, the toast's text content is announced through it — without re-mounting the live region, which would skip announcements.
- Hovering the toast pauses both the auto-close timer and the progress bar; leaving resumes them.
- The dismiss button has an aria-label that includes the variant (e.g. `"Close success notification"`).
- Stacked toasts render in source order; in rack mode, older toasts are visually demoted via `opacity` and `transform` only, leaving the live-region announcement intact.

**Developer responsibilities**

- Keep toast text short and self-contained — do not use a toast as the only place critical information appears.
- Provide an actionable label for any `slot="actions"` button.
- For critical errors that require acknowledgement, use `aegov-modal` instead — toasts can be missed.

**Notes**

- `scoped: true` encapsulation: events from inside the toast re-target correctly even after the toast is moved into the portal container.
- Containers are created lazily per position and removed when their last toast closes.
- A 300 ms exit animation runs before `aegovToastClose` fires and the element is removed.
