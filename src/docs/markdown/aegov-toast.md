# Toast

<p class="text-lg text-aeblack-500 mb-8">A Toast is a transient, non-blocking notification anchored to a corner of the viewport. Use it for asynchronous status updates such as &ldquo;Application submitted&rdquo;, save confirmations, connection warnings, and undo affordances. For confirmations the user must acknowledge use the modal component instead, and for inline page-level messages use the callout.</p>

## Introduction

The `aegov-toast` component is most often used imperatively. The design system exposes a global helper at `window.aegovToast` that creates, mounts, and shows a toast in one call. You can also declare a `<aegov-toast>` element in markup and call its `show()` method when needed. Multiple toasts at the same `position` stack into a single per-position portal container at `document.body`, and a persistent off-screen live region announces each toast's text content to screen readers.

```html
<aegov-button id="trigger-success" variant="primary">Submit application</aegov-button>

<script>
  document.getElementById('trigger-success').addEventListener('click', () => {
    window.aegovToast.show({
      message: 'Application submitted successfully.',
      variant: 'success',
      position: 'top-right',
      duration: 4000,
    });
  });
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button id="demo-toast-intro" variant="primary">Submit application</aegov-button>
  <script>
    document.getElementById('demo-toast-intro').addEventListener('click', () => {
      window.aegovToast.show({
        message: 'Application submitted successfully.',
        variant: 'success',
        position: 'top-right',
        duration: 4000,
      });
    });
  </script>
</div>

---

## Variants

The `variant` property sets the semantic colour of the 4 px top border on the toast. `default` (no border) is for neutral confirmations; `success`, `info`, `warning`, and `error` add a coloured top border in the corresponding palette.

```html
<aegov-toast variant="success">Profile updated.</aegov-toast>
<aegov-toast variant="info">A new policy update is available.</aegov-toast>
<aegov-toast variant="warning">Your session expires in 5 minutes.</aegov-toast>
<aegov-toast variant="error">Unable to save changes.</aegov-toast>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-3">
    <aegov-button id="demo-toast-default" appearance="outline">Default</aegov-button>
    <aegov-button id="demo-toast-success" variant="primary">Success</aegov-button>
    <aegov-button id="demo-toast-info" variant="secondary">Info</aegov-button>
    <aegov-button id="demo-toast-warning" appearance="outline">Warning</aegov-button>
    <aegov-button id="demo-toast-error" appearance="outline">Error</aegov-button>
  </div>
  <script>
    (function() {
      const map = {
        'demo-toast-default':  { variant: 'default', message: 'Your draft has been saved.' },
        'demo-toast-success':  { variant: 'success', message: 'Application submitted successfully.' },
        'demo-toast-info':     { variant: 'info',    message: 'A new policy update is available.' },
        'demo-toast-warning':  { variant: 'warning', message: 'Your session expires in 5 minutes.' },
        'demo-toast-error':    { variant: 'error',   message: 'Unable to save changes. Please try again.' },
      };
      Object.keys(map).forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', () => window.aegovToast.show({ ...map[id], position: 'top-right', duration: 4000 }));
      });
    })();
  </script>
</div>

---

## Appearance

`appearance` controls the surface treatment. `soft` (default) uses a white background with dark text — suitable for most cases. `solid` uses a dark background with white text and is useful when you want the toast to read as a system-level message regardless of page background.

```html
<aegov-toast appearance="soft" variant="success">Application submitted.</aegov-toast>
<aegov-toast appearance="solid" variant="success">Application submitted.</aegov-toast>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-3">
    <aegov-button id="demo-toast-soft" appearance="outline">Soft appearance</aegov-button>
    <aegov-button id="demo-toast-solid" variant="primary">Solid appearance</aegov-button>
  </div>
  <script>
    document.getElementById('demo-toast-soft').addEventListener('click', () => {
      window.aegovToast.show({ message: 'Application submitted.', variant: 'success', appearance: 'soft', position: 'top-right', duration: 4000 });
    });
    document.getElementById('demo-toast-solid').addEventListener('click', () => {
      window.aegovToast.show({ message: 'Application submitted.', variant: 'success', appearance: 'solid', position: 'top-right', duration: 4000 });
    });
  </script>
</div>

---

## Position

The `position` property controls which corner or edge of the viewport the toast appears at. Each position has its own portal container, so a single page can run multiple stacks simultaneously (for example a confirmation in the top-right and a connectivity warning in the bottom-center).

| Value           | Anchor                                              |
| --------------- | --------------------------------------------------- |
| `top-right`     | Default. Aligned to the inline-end of the viewport. |
| `top-left`      | Aligned to the inline-start of the viewport.        |
| `top-center`    | Centred along the top edge.                         |
| `bottom-right`  | Aligned to the inline-end at the bottom.            |
| `bottom-left`   | Aligned to the inline-start at the bottom.          |
| `bottom-center` | Centred along the bottom edge.                      |

```html
<script>
  window.aegovToast.show({
    message: 'Saved to drafts.',
    variant: 'success',
    position: 'bottom-center',
    duration: 4000,
  });
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid grid-cols-3 gap-3 max-w-md">
    <aegov-button id="pos-tl" appearance="outline" size="sm">Top left</aegov-button>
    <aegov-button id="pos-tc" appearance="outline" size="sm">Top center</aegov-button>
    <aegov-button id="pos-tr" appearance="outline" size="sm">Top right</aegov-button>
    <aegov-button id="pos-bl" appearance="outline" size="sm">Bottom left</aegov-button>
    <aegov-button id="pos-bc" appearance="outline" size="sm">Bottom center</aegov-button>
    <aegov-button id="pos-br" appearance="outline" size="sm">Bottom right</aegov-button>
  </div>
  <script>
    (function() {
      const positions = {
        'pos-tl': 'top-left', 'pos-tc': 'top-center', 'pos-tr': 'top-right',
        'pos-bl': 'bottom-left', 'pos-bc': 'bottom-center', 'pos-br': 'bottom-right',
      };
      Object.keys(positions).forEach(id => {
        document.getElementById(id).addEventListener('click', () => {
          window.aegovToast.show({
            message: 'Toast at ' + positions[id],
            variant: 'info',
            position: positions[id],
            duration: 4000,
          });
        });
      });
    })();
  </script>
</div>

---

## Title, Icon, and Actions Slots

A toast renders three optional slots in addition to the default description text:

- `title` — bold heading rendered above the description.
- `icon` — user-provided icon rendered to the left of the content. The toast does not ship built-in variant icons; pass any SVG or icon component.
- `actions` — buttons or links rendered below the description. Useful for inline undo, retry, or "view details" actions.

```html
<aegov-toast id="undo-toast" variant="default" duration="6000">
  <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
  </svg>
  <span slot="title">Application moved to trash</span>
  You can restore it within 30 days.
  <aegov-button slot="actions" appearance="ghost" size="sm">Undo</aegov-button>
</aegov-toast>

<aegov-button id="show-undo">Move to trash</aegov-button>

<script>
  document.getElementById('show-undo').addEventListener('click', () => {
    document.getElementById('undo-toast').show();
  });
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button id="show-undo-demo" appearance="outline">Move to trash</aegov-button>
  <script>
    document.getElementById('show-undo-demo').addEventListener('click', () => {
      const toast = document.createElement('aegov-toast');
      toast.variant = 'default';
      toast.duration = 6000;
      toast.position = 'top-right';
      toast.innerHTML = `
        <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
        </svg>
        <span slot="title">Application moved to trash</span>
        You can restore it within 30 days.
        <button slot="actions" type="button" style="background:transparent;border:0;font:inherit;color:#0066cc;cursor:pointer;padding:0;">Undo</button>
      `;
      document.body.appendChild(toast);
      toast.show();
    });
  </script>
</div>

---

## Duration and Auto-dismiss

`duration` is the auto-dismiss timeout in milliseconds. Hovering the toast pauses the timer, and leaving the toast resumes it from the remaining time. Set `duration="0"` to disable auto-dismiss entirely — the user must click the close button.

```html
<script>
  // Auto-dismiss after 8 seconds
  window.aegovToast.show({
    message: 'Document downloaded.',
    variant: 'success',
    duration: 8000,
  });

  // Persistent — never auto-dismiss
  window.aegovToast.show({
    message: 'You are offline. Some features may be unavailable.',
    variant: 'warning',
    duration: 0,
  });
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-3">
    <aegov-button id="demo-dur-fast" appearance="outline">Quick (2 s)</aegov-button>
    <aegov-button id="demo-dur-long" appearance="outline">Long (8 s)</aegov-button>
    <aegov-button id="demo-dur-persist" appearance="outline">Persistent</aegov-button>
  </div>
  <script>
    document.getElementById('demo-dur-fast').addEventListener('click', () => {
      window.aegovToast.show({ message: 'Quick confirmation.', variant: 'success', duration: 2000, position: 'top-right' });
    });
    document.getElementById('demo-dur-long').addEventListener('click', () => {
      window.aegovToast.show({ message: 'Document downloaded.', variant: 'success', duration: 8000, position: 'top-right' });
    });
    document.getElementById('demo-dur-persist').addEventListener('click', () => {
      window.aegovToast.show({ message: 'You are offline. Some features may be unavailable.', variant: 'warning', duration: 0, position: 'top-right' });
    });
  </script>
</div>

---

## Progress Bar

Set `is-progress-enabled="true"` to render a thin countdown bar across the bottom of the toast. The bar pauses when the user hovers the toast (matching the timer pause) and resumes on leave. Has no effect when `duration="0"`.

```html
<script>
  window.aegovToast.show({
    message: 'Application submitted to the Ministry of Interior.',
    variant: 'success',
    duration: 6000,
    isProgressEnabled: true,
  });
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button id="demo-progress" variant="primary">Submit with progress bar</aegov-button>
  <script>
    document.getElementById('demo-progress').addEventListener('click', () => {
      window.aegovToast.show({
        message: 'Application submitted to the Ministry of Interior.',
        variant: 'success',
        duration: 6000,
        isProgressEnabled: true,
        position: 'top-right',
      });
    });
  </script>
</div>

---

## Stack vs Rack Mode

When several toasts appear at the same `position`, the `mode` property controls how they are laid out.

- `stack` (default) — all toasts are visible with a small gap between them.
- `rack` — toasts collapse into a single deck. The newest is fully visible; older toasts peek behind it scaled and faded. A count badge shows the total. Hovering the deck expands it back into a stack.

```html
<script>
  // Fire several rack-mode toasts in quick succession
  for (let i = 1; i <= 4; i++) {
    setTimeout(() => {
      window.aegovToast.show({
        message: 'Notification ' + i,
        variant: 'info',
        mode: 'rack',
        position: 'bottom-right',
        duration: 0,
      });
    }, i * 200);
  }
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-3">
    <aegov-button id="demo-stack" appearance="outline">Fire 3 stacked toasts</aegov-button>
    <aegov-button id="demo-rack" variant="primary">Fire 4 racked toasts</aegov-button>
  </div>
  <script>
    document.getElementById('demo-stack').addEventListener('click', () => {
      ['Application received', 'Documents validated', 'Payment confirmed'].forEach((msg, i) => {
        setTimeout(() => window.aegovToast.show({ message: msg, variant: 'success', mode: 'stack', position: 'top-right', duration: 5000 }), i * 250);
      });
    });
    document.getElementById('demo-rack').addEventListener('click', () => {
      ['New application received', 'Document uploaded', 'Officer assigned', 'Status updated'].forEach((msg, i) => {
        setTimeout(() => window.aegovToast.show({ message: msg, variant: 'info', mode: 'rack', position: 'bottom-right', duration: 0 }), i * 200);
      });
    });
  </script>
</div>

---

## Composite Example

This example combines several features: a soft success toast with a title slot, a custom icon, an action button, a progress bar, and a 6-second duration — a typical post-submission confirmation pattern.

```html
<aegov-button id="submit-form">Submit form</aegov-button>

<script>
  document.getElementById('submit-form').addEventListener('click', () => {
    const toast = document.createElement('aegov-toast');
    toast.variant = 'success';
    toast.appearance = 'soft';
    toast.position = 'top-right';
    toast.duration = 6000;
    toast.isProgressEnabled = true;
    toast.innerHTML = `
      <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <span slot="title">Application submitted</span>
      Reference number <strong>APP-2026-00482</strong>. You will receive an SMS within 3 business days.
      <button slot="actions" type="button">View status</button>
    `;
    document.body.appendChild(toast);
    toast.show();
  });
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button id="demo-composite" variant="primary">Submit form</aegov-button>
  <script>
    document.getElementById('demo-composite').addEventListener('click', () => {
      const toast = document.createElement('aegov-toast');
      toast.variant = 'success';
      toast.appearance = 'soft';
      toast.position = 'top-right';
      toast.duration = 6000;
      toast.isProgressEnabled = true;
      toast.innerHTML = `
        <svg slot="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <span slot="title">Application submitted</span>
        Reference number <strong>APP-2026-00482</strong>. You will receive an SMS within 3 business days.
        <button slot="actions" type="button" style="background:transparent;border:0;font:inherit;color:#0066cc;cursor:pointer;padding:0;font-weight:600;">View status</button>
      `;
      document.body.appendChild(toast);
      toast.show();
    });
  </script>
</div>

---

## RTL Support

Toast containers use logical CSS properties (`inset-inline-start` / `inset-inline-end`), so positions ending in `-right` resolve to the inline-end edge of the viewport (the left edge in RTL) and positions ending in `-left` resolve to the inline-start edge. Toast content inherits the host document's `dir`, so Arabic text reads correctly without further configuration.

```html
<div dir="rtl">
  <aegov-button id="rtl-toast">إرسال الطلب</aegov-button>
  <script>
    document.getElementById('rtl-toast').addEventListener('click', () => {
      window.aegovToast.show({
        message: 'تم إرسال الطلب بنجاح. ستصلك رسالة نصية خلال 3 أيام عمل.',
        variant: 'success',
        position: 'top-right',
        duration: 5000,
      });
    });
  </script>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button id="demo-rtl-toast" variant="primary">إرسال الطلب</aegov-button>
  <script>
    document.getElementById('demo-rtl-toast').addEventListener('click', () => {
      window.aegovToast.show({
        message: 'تم إرسال الطلب بنجاح. ستصلك رسالة نصية خلال 3 أيام عمل.',
        variant: 'success',
        position: 'top-right',
        duration: 5000,
      });
    });
  </script>
</div>

The same pattern with a warning variant and a longer message in RTL:

```html
<div dir="rtl">
  <aegov-button id="rtl-warn">انتهاء الجلسة</aegov-button>
  <script>
    document.getElementById('rtl-warn').addEventListener('click', () => {
      window.aegovToast.show({
        message: 'ستنتهي جلستك خلال خمس دقائق. يرجى حفظ عملك.',
        variant: 'warning',
        appearance: 'solid',
        position: 'bottom-center',
        duration: 0,
      });
    });
  </script>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button id="demo-rtl-warn" appearance="outline">انتهاء الجلسة</aegov-button>
  <script>
    document.getElementById('demo-rtl-warn').addEventListener('click', () => {
      window.aegovToast.show({
        message: 'ستنتهي جلستك خلال خمس دقائق. يرجى حفظ عملك.',
        variant: 'warning',
        appearance: 'solid',
        position: 'bottom-center',
        duration: 0,
      });
    });
  </script>
</div>

---

## Imperative API

The global helper installed at `window.aegovToast` is the recommended way to fire toasts from application code. Calling `show()` creates an `<aegov-toast>` element, appends it to `document.body`, and starts the show sequence in a single call.

```js
window.aegovToast.show({
  message: 'Profile updated.',
  variant: 'success',
  appearance: 'soft',
  position: 'top-right',
  duration: 4000,
  isDismissible: true,
  mode: 'stack',
  isProgressEnabled: false,
});
```

The helper accepts the following options:

| Option              | Type                                                                                              | Default       |
| ------------------- | ------------------------------------------------------------------------------------------------- | ------------- |
| `message`           | `string` — supports HTML for inline `<strong>`, links, etc.                                       | _required_    |
| `variant`           | `'default' \| 'error' \| 'warning' \| 'success' \| 'info'`                                        | `'default'`   |
| `appearance`        | `'soft' \| 'solid'`                                                                               | `'soft'`      |
| `position`          | `'top-right' \| 'top-left' \| 'top-center' \| 'bottom-right' \| 'bottom-left' \| 'bottom-center'` | `'top-right'` |
| `duration`          | `number` — milliseconds. `0` disables auto-dismiss.                                               | `5000`        |
| `isDismissible`     | `boolean`                                                                                         | `true`        |
| `mode`              | `'stack' \| 'rack'`                                                                               | `'stack'`     |
| `isProgressEnabled` | `boolean`                                                                                         | `false`       |

The helper returns the created `HTMLAegovToastElement`, so you can also call `close()` on it later to dismiss it programmatically.

```js
const toast = window.aegovToast.show({
  message: 'Connecting…',
  variant: 'info',
  duration: 0,
});

// Later, after the connection succeeds
toast.close();
```

---

## API Reference

### Properties

| Property              | Attribute               | Description                                                                              | Type                                                                                            | Default       |
| --------------------- | ----------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------- |
| `variant`             | `variant`               | Semantic colour. Sets the 4 px coloured top border. `default` has no border.             | `'default' \| 'error' \| 'warning' \| 'success' \| 'info'`                                      | `'default'`   |
| `appearance`          | `appearance`            | Surface treatment.                                                                       | `'soft' \| 'solid'`                                                                             | `'soft'`      |
| `position`            | `position`              | Viewport corner or edge to anchor to. Each position has its own portal container.        | `'top-right' \| 'top-left' \| 'top-center' \| 'bottom-right' \| 'bottom-left' \| 'bottom-center'` | `'top-right'` |
| `duration`            | `duration`              | Auto-dismiss timeout in ms. `0` = persistent. Hovering pauses the timer.                | `number`                                                                                        | `5000`        |
| `isDismissible`       | `is-dismissible`        | Whether to render the close button.                                                      | `boolean`                                                                                       | `true`        |
| `mode`                | `mode`                  | Layout for multiple toasts at the same position.                                         | `'stack' \| 'rack'`                                                                             | `'stack'`     |
| `isProgressEnabled`   | `is-progress-enabled`   | When `true` and `duration > 0`, render a countdown progress bar at the foot of the toast. | `boolean`                                                                                       | `false`       |

### Slots

| Slot         | Description                                                                                          |
| ------------ | ---------------------------------------------------------------------------------------------------- |
| _(default)_  | Toast description text. Supports inline HTML.                                                        |
| `title`      | Bold heading rendered above the description.                                                         |
| `icon`       | User-provided icon, rendered to the left of the content. The component does not ship built-in icons. |
| `actions`    | Action buttons or links rendered below the description.                                              |

### Events

| Event                | Detail | Description                                                                       |
| -------------------- | ------ | --------------------------------------------------------------------------------- |
| `aegovToastOpen`     | `void` | Fired after the toast becomes visible (after the entry animation has been queued). |
| `aegovToastClose`    | `void` | Fired after the exit animation completes and the toast element is removed.        |
| `aegovToastDismiss`  | `void` | Fired when the user clicks the dismiss button (precedes `aegovToastClose`).       |

#### Listening for events

```js
const toast = document.querySelector('aegov-toast');
toast.addEventListener('aegovToastOpen', () => console.log('shown'));
toast.addEventListener('aegovToastDismiss', () => console.log('user dismissed'));
toast.addEventListener('aegovToastClose', () => console.log('removed from DOM'));
```

### Methods

| Method      | Returns         | Description                                                                                                                     |
| ----------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `show()`    | `Promise<void>` | Move the toast into its per-position portal container, run the entry animation, announce the message, and start the auto-close timer. |
| `close()`   | `Promise<void>` | Run the exit animation, fire `aegovToastClose`, and remove the toast from the DOM.                                              |

### Pass-through Attributes

The toast does not forward attributes to inner elements — set attributes directly on the host element where they are needed.

| Attribute group  | Forwarded? | Where to apply                                                                |
| ---------------- | ---------- | ----------------------------------------------------------------------------- |
| `aria-*`         | No         | Apply directly to `<aegov-toast>`. The component manages its own ARIA semantics. |
| `data-*`         | No         | Apply directly to `<aegov-toast>`.                                             |
| `id`             | n/a        | Apply directly to `<aegov-toast>` if you need a stable handle.                 |
| `class`, `style` | Allowed    | Applied to the host element.                                                   |

---

## Accessibility

### Built-in behaviour

- A persistent off-screen live region (`role="status"`, `aria-live="polite"`, `aria-atomic="true"`) is created at the document level and reused across all toasts. When `show()` is called, the toast's text content is announced through it without re-mounting the live region (which would skip announcements in some screen readers).
- The dismiss button has an `aria-label` that includes the variant, e.g. `"Close success notification"`.
- Hovering the toast pauses both the auto-close timer and the progress bar; the timer resumes from the remaining time on leave.
- Multiple toasts at the same position render in source order. In `rack` mode, older toasts are visually demoted via `opacity` and `transform` only — they are never removed from the DOM, so the live region announcement remains intact.
- A 300 ms exit animation runs before `aegovToastClose` fires and the element is removed.

### Developer responsibilities

- Keep toast text short and self-contained. Do not use a toast as the only place critical information appears — it can be missed.
- For confirmations the user must acknowledge, use `aegov-modal` instead.
- Provide an actionable, descriptive label for any button placed in `slot="actions"` (e.g. "Undo", "View status", "Retry").
- For destructive undo affordances, give the user enough time to react — set `duration` to at least 6000 ms.

### Keyboard support

| Key                  | Action                                                              |
| -------------------- | ------------------------------------------------------------------- |
| `Tab`                | Move focus into the toast — the action button(s) and dismiss button. |
| `Shift + Tab`        | Move focus to the previous focusable element.                       |
| `Enter`, `Space`     | Activate the focused button (action or dismiss).                    |

### Implementation notes

- `scoped: true` encapsulation: events from inside the toast re-target correctly even after the toast is moved into the portal container.
- Containers are created lazily per position and removed automatically when their last toast closes.
- Rack-mode styles are injected once into `<head>` on first use and reused across all rack containers.
