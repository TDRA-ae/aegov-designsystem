# Modal

<p class="text-lg text-aeblack-500 mb-8">A Modal is a dialog window that overlays the page to focus attention on a single, important task — confirming a destructive action, completing a short form, or surfacing a critical message. While the modal is open, the rest of the page is inert: scroll is locked, focus is trapped inside, and the user must complete or dismiss the task before continuing.</p>

## Introduction

The `aegov-modal` component renders a centred (or top/bottom) dialog over a backdrop. It uses Shadow DOM for full style isolation and is moved to `document.body` automatically so it always stacks above the rest of the page. Open and close it declaratively with `is-open`, or imperatively via the `show()`, `close()`, and `toggle()` methods. Body scroll is locked, ESC closes the dialog, and focus is returned to the element that opened it.

```html
<aegov-button id="open-confirm">Delete application</aegov-button>

<aegov-modal id="confirm-modal" aria-labelledby="confirm-title">
  <h3 id="confirm-title" class="text-xl font-bold mb-2">Delete this application?</h3>
  <p class="text-aeblack-500 mb-6">
    This will permanently remove your draft application for the Emirates ID renewal service. This action cannot be undone.
  </p>
  <div class="flex justify-end gap-3">
    <aegov-button variant="secondary" id="cancel-confirm">Cancel</aegov-button>
    <aegov-button variant="danger" id="confirm-delete">Delete</aegov-button>
  </div>
</aegov-modal>

<script>
  const modal = document.querySelector('#confirm-modal');
  document.querySelector('#open-confirm').addEventListener('click', () => modal.show());
  document.querySelector('#cancel-confirm').addEventListener('click', () => modal.close());
  document.querySelector('#confirm-delete').addEventListener('click', () => modal.close());
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button id="demo-open-confirm">Delete application</aegov-button>

  <aegov-modal id="demo-confirm-modal" aria-labelledby="demo-confirm-title">
    <h3 id="demo-confirm-title" class="text-xl font-bold mb-2">Delete this application?</h3>
    <p class="text-aeblack-500 mb-6">
      This will permanently remove your draft application for the Emirates ID renewal service. This action cannot be undone.
    </p>
    <div class="flex justify-end gap-3">
      <aegov-button variant="secondary" id="demo-cancel-confirm">Cancel</aegov-button>
      <aegov-button variant="danger" id="demo-confirm-delete">Delete</aegov-button>
    </div>
  </aegov-modal>

  <script>
    (function() {
      const modal = document.querySelector('#demo-confirm-modal');
      document.querySelector('#demo-open-confirm').addEventListener('click', () => modal.show());
      document.querySelector('#demo-cancel-confirm').addEventListener('click', () => modal.close());
      document.querySelector('#demo-confirm-delete').addEventListener('click', () => modal.close());
    })();
  </script>
</div>

---

## Opening and Closing

A modal can be controlled in two ways. Choose whichever fits your application's state model.

### Imperative — `show()` / `close()` / `toggle()`

Call these methods on the element directly. The component manages the `is-open` flag for you and emits the matching events.

```html
<aegov-button id="trigger">Open dialog</aegov-button>
<aegov-modal id="dialog" aria-labelledby="dialog-title">
  <h3 id="dialog-title" class="text-xl font-bold mb-4">Service notice</h3>
  <p class="mb-6">Online appointments will be unavailable on Friday between 02:00 and 04:00 for scheduled maintenance.</p>
  <div class="flex justify-end">
    <aegov-button id="ack">Acknowledged</aegov-button>
  </div>
</aegov-modal>

<script>
  const dialog = document.querySelector('#dialog');
  document.querySelector('#trigger').addEventListener('click', () => dialog.show());
  document.querySelector('#ack').addEventListener('click', () => dialog.close());
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button id="demo-trigger-imperative">Open dialog</aegov-button>
  <aegov-modal id="demo-dialog-imperative" aria-labelledby="demo-dialog-title-imperative">
    <h3 id="demo-dialog-title-imperative" class="text-xl font-bold mb-4">Service notice</h3>
    <p class="mb-6">Online appointments will be unavailable on Friday between 02:00 and 04:00 for scheduled maintenance.</p>
    <div class="flex justify-end">
      <aegov-button id="demo-ack-imperative">Acknowledged</aegov-button>
    </div>
  </aegov-modal>
  <script>
    (function() {
      const dialog = document.querySelector('#demo-dialog-imperative');
      document.querySelector('#demo-trigger-imperative').addEventListener('click', () => dialog.show());
      document.querySelector('#demo-ack-imperative').addEventListener('click', () => dialog.close());
    })();
  </script>
</div>

### Declarative — `is-open` attribute

Toggle the `is-open` attribute (or property) from your framework's reactive state. The watcher runs the same open/close sequence used by the methods.

```html
<aegov-modal is-open="true" aria-label="Welcome">
  <h3 class="text-xl font-bold mb-2">Welcome back</h3>
  <p>Your last sign-in was 3 days ago from a UAE-based device.</p>
</aegov-modal>
```

---

## Sizes

The `size` property scales padding and corner radius. `sm` suits short confirmations; `base` is the default; `lg` gives extra breathing room for forms or rich content; `xl` is extra-wide for complex layouts or data-heavy dialogs.

```html
<aegov-modal size="sm" is-open="true">…</aegov-modal>
<aegov-modal size="base" is-open="true">…</aegov-modal>
<aegov-modal size="lg" is-open="true">…</aegov-modal>
<aegov-modal size="xl" is-open="true">…</aegov-modal>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-3">
    <aegov-button id="demo-size-sm">Open small</aegov-button>
    <aegov-button id="demo-size-base">Open base</aegov-button>
    <aegov-button id="demo-size-lg">Open large</aegov-button>
    <aegov-button id="demo-size-xl">Open extra large</aegov-button>
  </div>

  <aegov-modal id="demo-modal-sm" size="sm" aria-label="Small modal">
    <h3 class="text-lg font-bold mb-2">Compact dialog</h3>
    <p class="mb-6">Small size is best for short yes/no confirmations.</p>
    <div class="flex justify-end"><aegov-button id="demo-close-sm" size="sm">Close</aegov-button></div>
  </aegov-modal>

  <aegov-modal id="demo-modal-base" size="base" aria-label="Base modal">
    <h3 class="text-xl font-bold mb-2">Standard dialog</h3>
    <p class="mb-6">Base size is the default and works for most cases — short forms, notices, and confirmations.</p>
    <div class="flex justify-end"><aegov-button id="demo-close-base">Close</aegov-button></div>
  </aegov-modal>

  <aegov-modal id="demo-modal-lg" size="lg" aria-label="Large modal">
    <h3 class="text-2xl font-bold mb-2">Spacious dialog</h3>
    <p class="mb-6">Large size offers generous padding for long-form content, multi-step flows, or service forms inside a dialog.</p>
    <div class="flex justify-end"><aegov-button id="demo-close-lg">Close</aegov-button></div>
  </aegov-modal>
 
  <aegov-modal id="demo-modal-xl" size="xl" aria-label="Extra large modal">
    <h3 class="text-2xl font-bold mb-2">Extra large dialog</h3>
    <p class="mb-6">Extra large size is suited for complex layouts, data tables, or multi-column content that needs maximum width.</p>
    <div class="flex justify-end"><aegov-button id="demo-close-xl">Close</aegov-button></div>
  </aegov-modal>

  <script>
    (function() {
      ['sm','base','lg','xl'].forEach(s => {
        const m = document.querySelector('#demo-modal-' + s);
        document.querySelector('#demo-size-' + s).addEventListener('click', () => m.show());
        document.querySelector('#demo-close-' + s).addEventListener('click', () => m.close());
      });
    })();
  </script>
</div>

---

## Position

Use `position` to dock the modal to the top, bottom, or centre of the viewport. Top is useful for system notices that should not steal full attention; bottom suits mobile-style action sheets.

```html
<aegov-modal position="center" is-open="true">…</aegov-modal>
<aegov-modal position="top" is-open="true">…</aegov-modal>
<aegov-modal position="bottom" is-open="true">…</aegov-modal>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-3">
    <aegov-button id="demo-pos-center">Centre</aegov-button>
    <aegov-button id="demo-pos-top">Top</aegov-button>
    <aegov-button id="demo-pos-bottom">Bottom</aegov-button>
  </div>

  <aegov-modal id="demo-modal-center" position="center" aria-label="Centre modal">
    <h3 class="text-xl font-bold mb-2">Centre position</h3>
    <p class="mb-6">The default — anchored to the centre of the viewport.</p>
    <div class="flex justify-end"><aegov-button id="demo-close-center">Close</aegov-button></div>
  </aegov-modal>

  <aegov-modal id="demo-modal-top" position="top" aria-label="Top modal">
    <h3 class="text-xl font-bold mb-2">Top position</h3>
    <p class="mb-6">Useful for non-blocking notices that appear near the page header.</p>
    <div class="flex justify-end"><aegov-button id="demo-close-top">Close</aegov-button></div>
  </aegov-modal>

  <aegov-modal id="demo-modal-bottom" position="bottom" aria-label="Bottom modal">
    <h3 class="text-xl font-bold mb-2">Bottom position</h3>
    <p class="mb-6">Mobile-friendly action sheet style — perfect for thumb-zone actions.</p>
    <div class="flex justify-end"><aegov-button id="demo-close-bottom">Close</aegov-button></div>
  </aegov-modal>

  <script>
    (function() {
      ['center','top','bottom'].forEach(p => {
        const m = document.querySelector('#demo-modal-' + p);
        document.querySelector('#demo-pos-' + p).addEventListener('click', () => m.show());
        document.querySelector('#demo-close-' + p).addEventListener('click', () => m.close());
      });
    })();
  </script>
</div>

---

## Overlay Opacity

`overlay-opacity` controls how much of the page behind the modal is dimmed — `light` for a subtle wash, `base` (default) for a balanced contrast, and `dark` for high-attention dialogs such as destructive confirmations.

```html
<aegov-modal overlay-opacity="light" is-open="true">…</aegov-modal>
<aegov-modal overlay-opacity="base" is-open="true">…</aegov-modal>
<aegov-modal overlay-opacity="dark" is-open="true">…</aegov-modal>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-3">
    <aegov-button id="demo-op-light">Light backdrop</aegov-button>
    <aegov-button id="demo-op-base">Base backdrop</aegov-button>
    <aegov-button id="demo-op-dark">Dark backdrop</aegov-button>
  </div>

  <aegov-modal id="demo-modal-light" overlay-opacity="light" aria-label="Light backdrop">
    <h3 class="text-xl font-bold mb-2">Light backdrop</h3>
    <p class="mb-6">A gentle dim, suitable for low-stakes notifications.</p>
    <div class="flex justify-end"><aegov-button id="demo-close-light">Close</aegov-button></div>
  </aegov-modal>

  <aegov-modal id="demo-modal-base-op" overlay-opacity="base" aria-label="Base backdrop">
    <h3 class="text-xl font-bold mb-2">Base backdrop</h3>
    <p class="mb-6">The default — clear separation from the page without being heavy.</p>
    <div class="flex justify-end"><aegov-button id="demo-close-base-op">Close</aegov-button></div>
  </aegov-modal>

  <aegov-modal id="demo-modal-dark" overlay-opacity="dark" aria-label="Dark backdrop">
    <h3 class="text-xl font-bold mb-2">Dark backdrop</h3>
    <p class="mb-6">High contrast — use for destructive confirmations or critical alerts.</p>
    <div class="flex justify-end"><aegov-button id="demo-close-dark">Close</aegov-button></div>
  </aegov-modal>

  <script>
    (function() {
      [['light','light'],['base','base-op'],['dark','dark']].forEach(([key, id]) => {
        const m = document.querySelector('#demo-modal-' + id);
        document.querySelector('#demo-op-' + key).addEventListener('click', () => m.show());
        document.querySelector('#demo-close-' + id).addEventListener('click', () => m.close());
      });
    })();
  </script>
</div>

---

## Dismiss Behaviour

By default, clicking the backdrop and pressing `Escape` both close the modal. Set `is-close-with-overlay="false"` to require an explicit action — useful for forms where an accidental click outside should not lose data. The `Escape` key always closes the modal for accessibility and cannot be disabled.

```html
<aegov-modal is-close-with-overlay="false" aria-labelledby="form-title">
  <h3 id="form-title" class="text-xl font-bold mb-4">Update mobile number</h3>
  <aegov-form-field>
    <aegov-label>New mobile number</aegov-label>
    <aegov-input field-id="mobile" type="tel" placeholder="+971 50 000 0000"></aegov-input>
  </aegov-form-field>
  <div class="flex justify-end gap-3 mt-6">
    <aegov-button variant="secondary" id="form-cancel">Cancel</aegov-button>
    <aegov-button id="form-save">Save</aegov-button>
  </div>
</aegov-modal>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button id="demo-form-open">Update mobile number</aegov-button>
  <aegov-modal id="demo-form-modal" is-close-with-overlay="false" aria-labelledby="demo-form-title">
    <h3 id="demo-form-title" class="text-xl font-bold mb-4">Update mobile number</h3>
    <aegov-form-field>
      <aegov-label>New mobile number</aegov-label>
      <aegov-input field-id="demo-form-mobile" type="tel" placeholder="+971 50 000 0000"></aegov-input>
    </aegov-form-field>
    <div class="flex justify-end gap-3 mt-6">
      <aegov-button variant="secondary" id="demo-form-cancel">Cancel</aegov-button>
      <aegov-button id="demo-form-save">Save</aegov-button>
    </div>
  </aegov-modal>
  <script>
    (function() {
      const m = document.querySelector('#demo-form-modal');
      document.querySelector('#demo-form-open').addEventListener('click', () => m.show());
      document.querySelector('#demo-form-cancel').addEventListener('click', () => m.close());
      document.querySelector('#demo-form-save').addEventListener('click', () => m.close());
    })();
  </script>
</div>

---

## Padding

The `is-padding` property controls whether the dialog applies inner padding. Turn padding off when the slot content provides its own (for example, a full-bleed image or a custom-styled card).

```html
<aegov-modal is-padding="false" is-open="true">
  <img src="/path/to/banner.jpg" alt="Service banner" class="w-full block">
  <div class="p-6">
    <h3 class="text-xl font-bold mb-2">New service available</h3>
    <p>The Emirates ID renewal service now supports same-day delivery.</p>
  </div>
</aegov-modal>
```

---

## Composite Example — Service Confirmation

A realistic confirmation flow combining a labelled trigger button, a titled dialog with an `aria-labelledby` link, and dual actions.

```html
<aegov-button id="open-submit">Submit application</aegov-button>

<aegov-modal id="submit-modal" size="lg" overlay-opacity="dark" aria-labelledby="submit-title" aria-describedby="submit-desc">
  <h3 id="submit-title" class="text-2xl font-bold mb-3">Submit your application?</h3>
  <p id="submit-desc" class="text-aeblack-500 mb-6">
    Once submitted, your application for the family book renewal will be sent to the General Directorate of Residency and Foreigners Affairs for review.
    You will receive a confirmation SMS with your reference number.
  </p>
  <div class="bg-aeblack-50 rounded-lg p-4 mb-6">
    <dl class="grid grid-cols-2 gap-2 text-sm">
      <dt class="font-semibold">Service</dt><dd>Family book renewal</dd>
      <dt class="font-semibold">Applicant</dt><dd>Ahmed Al Mansoori</dd>
      <dt class="font-semibold">Fee</dt><dd>AED 150</dd>
    </dl>
  </div>
  <div class="flex justify-end gap-3">
    <aegov-button variant="secondary" id="submit-cancel">Review again</aegov-button>
    <aegov-button id="submit-confirm">Confirm and submit</aegov-button>
  </div>
</aegov-modal>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button id="demo-open-submit">Submit application</aegov-button>

  <aegov-modal id="demo-submit-modal" size="lg" overlay-opacity="dark" aria-labelledby="demo-submit-title" aria-describedby="demo-submit-desc">
    <h3 id="demo-submit-title" class="text-2xl font-bold mb-3">Submit your application?</h3>
    <p id="demo-submit-desc" class="text-aeblack-500 mb-6">
      Once submitted, your application for the family book renewal will be sent to the General Directorate of Residency and Foreigners Affairs for review.
      You will receive a confirmation SMS with your reference number.
    </p>
    <div class="bg-aeblack-50 rounded-lg p-4 mb-6">
      <dl class="grid grid-cols-2 gap-2 text-sm">
        <dt class="font-semibold">Service</dt><dd>Family book renewal</dd>
        <dt class="font-semibold">Applicant</dt><dd>Ahmed Al Mansoori</dd>
        <dt class="font-semibold">Fee</dt><dd>AED 150</dd>
      </dl>
    </div>
    <div class="flex justify-end gap-3">
      <aegov-button variant="secondary" id="demo-submit-cancel">Review again</aegov-button>
      <aegov-button id="demo-submit-confirm">Confirm and submit</aegov-button>
    </div>
  </aegov-modal>

  <script>
    (function() {
      const m = document.querySelector('#demo-submit-modal');
      document.querySelector('#demo-open-submit').addEventListener('click', () => m.show());
      document.querySelector('#demo-submit-cancel').addEventListener('click', () => m.close());
      document.querySelector('#demo-submit-confirm').addEventListener('click', () => m.close());
    })();
  </script>
</div>

---

## RTL Support

The modal is direction-agnostic. Set `dir="rtl"` on the document or on a parent element and the layout, content alignment, and dismiss button positioning mirror automatically. Because the dialog uses Shadow DOM, the `dir` attribute is inherited from the host element — so applying it to `<aegov-modal>` (or its ancestor) is enough.

```html
<div dir="rtl">
  <aegov-button id="open-rtl">حذف الطلب</aegov-button>
  <aegov-modal id="rtl-modal" aria-labelledby="rtl-title">
    <h3 id="rtl-title" class="text-xl font-bold mb-2">حذف هذا الطلب؟</h3>
    <p class="text-aeblack-500 mb-6">
      سيتم حذف مسوّدة طلبك لخدمة تجديد الهوية الإماراتية بشكل دائم. لا يمكن التراجع عن هذا الإجراء.
    </p>
    <div class="flex justify-end gap-3">
      <aegov-button variant="secondary" id="rtl-cancel">إلغاء</aegov-button>
      <aegov-button variant="danger" id="rtl-confirm">حذف</aegov-button>
    </div>
  </aegov-modal>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button id="demo-rtl-open">حذف الطلب</aegov-button>
  <aegov-modal id="demo-rtl-modal" aria-labelledby="demo-rtl-title">
    <h3 id="demo-rtl-title" class="text-xl font-bold mb-2">حذف هذا الطلب؟</h3>
    <p class="text-aeblack-500 mb-6">
      سيتم حذف مسوّدة طلبك لخدمة تجديد الهوية الإماراتية بشكل دائم. لا يمكن التراجع عن هذا الإجراء.
    </p>
    <div class="flex justify-end gap-3">
      <aegov-button variant="secondary" id="demo-rtl-cancel">إلغاء</aegov-button>
      <aegov-button variant="danger" id="demo-rtl-confirm">حذف</aegov-button>
    </div>
  </aegov-modal>
  <script>
    (function() {
      const m = document.querySelector('#demo-rtl-modal');
      document.querySelector('#demo-rtl-open').addEventListener('click', () => m.show());
      document.querySelector('#demo-rtl-cancel').addEventListener('click', () => m.close());
      document.querySelector('#demo-rtl-confirm').addEventListener('click', () => m.close());
    })();
  </script>
</div>

---

## API Reference

### Properties

| Property              | Attribute                | Description                                                                          | Type                              | Default     |
| --------------------- | ------------------------ | ------------------------------------------------------------------------------------ | --------------------------------- | ----------- |
| `fieldId`             | `field-id`               | DOM `id` for the dialog content element. Auto-generated if omitted.                  | `string`                          | _generated_ |
| `isOpen`              | `is-open`                | Whether the modal is currently visible.                                              | `boolean`                         | `false`     |
| `isCloseWithOverlay`  | `is-close-with-overlay`  | Close the modal when the backdrop is clicked.                                        | `boolean`                         | `true`      |
| `isPreventScroll`     | `is-prevent-scroll`      | Lock body scroll while the modal is open.                                            | `boolean`                         | `true`      |
| `overlayOpacity`      | `overlay-opacity`        | Backdrop dim level.                                                                  | `'light' \| 'base' \| 'dark'`     | `'base'`    |
| `position`            | `position`               | Where the dialog is anchored on the viewport.                                        | `'center' \| 'top' \| 'bottom'`   | `'center'`  |
| `size`                | `size`                   | Padding and corner-radius scale.                                                     | `'sm' \| 'base' \| 'lg' \| 'xl'`  | `'base'`    |
| `isPadding`           | `is-padding`             | Apply inner content padding. Turn off for full-bleed content.                        | `boolean`                         | `true`      |
| `label`               | `label`                  | Accessible label for the dialog. Prefer `aria-labelledby` pointing at a heading inside the modal; use `label` only when no visible heading is present. | `string` | `undefined` |

### Slots

| Slot          | Description                                                                  |
| ------------- | ---------------------------------------------------------------------------- |
| _(default)_   | The dialog content — heading, body, and any action buttons. There is no separate header/body/footer slot; structure your content with regular HTML inside the default slot. |

### Events

| Event                      | Detail                                | Description                                                                                  |
| -------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------- |
| `aegovModalOpen`           | `void`                                | Fired after the modal has finished opening.                                                  |
| `aegovModalClose`          | `void`                                | Fired after the modal has finished closing and focus has been returned.                      |
| `aegovModalBeforeClose`    | `void`                                | Fired before the modal closes. The event is cancelable — call `event.preventDefault()` on the event to keep it open (e.g., unsaved data). |
| `aegovModalBackdropClick`  | `MouseEvent`                          | Fired when the backdrop receives a click, regardless of whether dismissal is allowed.        |
| `aegovModalEscapePress`    | `KeyboardEvent`                       | Fired when the user presses `Escape` while the modal is open.                                |

### Methods

| Method     | Returns          | Description                                              |
| ---------- | ---------------- | -------------------------------------------------------- |
| `show()`   | `Promise<void>`  | Open the modal.                                          |
| `close()`  | `Promise<void>`  | Close the modal (fires `aegovModalBeforeClose` first).   |
| `toggle()` | `Promise<void>`  | Flip the open state.                                     |

### Pass-through Attributes

ARIA attributes set on `<aegov-modal>` are forwarded onto the inner dialog element so screen readers receive the correct labelling. Always provide either `aria-label` or `aria-labelledby`.

| Attribute group          | Forwarded? | Where it lands                                                    |
| ------------------------ | ---------- | ----------------------------------------------------------------- |
| `aria-label`             | Yes        | Applied to the inner `[role="dialog"]` element.                   |
| `aria-labelledby`        | Yes        | Applied to the inner `[role="dialog"]` element.                   |
| `aria-describedby`       | Yes        | Applied to the inner `[role="dialog"]` element.                   |
| Other `aria-*`           | Yes        | Applied to the inner `[role="dialog"]` element.                   |
| `data-*`                 | Yes        | Applied to the inner `[role="dialog"]` element.                   |
| `id`                     | n/a        | Use `field-id` — sets the `id` of the dialog content element.    |
| `class`, `style`         | Allowed    | Applied to the host element (limited reach due to Shadow DOM).    |

> **Shadow DOM note.** Because `aegov-modal` uses Shadow DOM, page-level CSS does not reach the inner backdrop and dialog elements. Style customisation is limited to the host element and any CSS custom properties exposed by the component.

---

## Accessibility

### Built-in behaviour

- The dialog renders with `role="dialog"` and `aria-modal="true"`. `aria-modal="true"` tells modern assistive technology not to expose content behind the dialog in their reading modes.
- Focus is trapped inside the dialog while it is open. `Tab` and `Shift + Tab` cycle through focusable elements without escaping to the page behind.
- On open, the first focusable element in the dialog receives focus automatically. If the dialog contains no focusable children, the dialog container itself receives focus (`tabindex="-1"` is set) so assistive technology announces the dialog immediately.
- On close, focus is returned to the element that opened the dialog.
- Body scroll is locked while the dialog is open (reference-counted, so nested overlays keep scroll locked correctly).
- `Escape` always closes the dialog — this behaviour is not configurable.
- The component is moved to `document.body` automatically, ensuring it stacks above the rest of the page regardless of where it lives in your component tree.

### Developer responsibilities

- **Always label the dialog.** Provide either `aria-label` or `aria-labelledby` pointing at the visible heading inside the modal. Without one, screen readers announce only "dialog".
- Use `aria-describedby` to link supporting body text when the heading alone does not convey the action.
- For destructive confirmations (delete, cancel application), pair `overlay-opacity="dark"` with a `variant="danger"` confirmation button so the visual weight matches the action.
- Listen for `aegovModalBeforeClose` and call `preventDefault()` if the user has unsaved changes — then prompt them in-place rather than silently losing data.
- Keep modal content focused on a single task. If the workflow requires several steps, consider a dedicated page or a multi-step wizard rather than nesting forms inside a dialog.
- **Background isolation for older assistive technology.** `aria-modal="true"` is respected by all modern screen readers (NVDA 2021+, JAWS 2021+, VoiceOver macOS 12+). For environments where older AT is expected, add the `inert` attribute to all page siblings when the modal opens and remove it on close. This prevents virtual-cursor navigation into background content:
  ```js
  modal.addEventListener('aegovModalOpen', () => {
    document.body.querySelectorAll(':scope > :not(aegov-modal)').forEach(el => el.setAttribute('inert', ''));
  });
  modal.addEventListener('aegovModalClose', () => {
    document.body.querySelectorAll('[inert]').forEach(el => el.removeAttribute('inert'));
  });
  ```

### Keyboard support

| Key              | Action                                                          |
| ---------------- | --------------------------------------------------------------- |
| `Escape`         | Close the modal and return focus to the trigger element.        |
| `Tab`            | Move focus to the next focusable element inside the dialog.     |
| `Shift + Tab`    | Move focus to the previous focusable element inside the dialog. |
| `Enter`, `Space` | Activate the focused button or control.                         |
