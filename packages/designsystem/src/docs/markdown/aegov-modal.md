# Modal

<p class="text-lg text-aeblack-500 mb-8">A Modal interrupts the user to ask for a decision or show content that requires their full attention. It traps focus, blocks the page behind it, and must be dismissed before anything else can happen — which is precisely why it should be used sparingly. Every modal is an interruption you are choosing to impose.</p>

## Introduction

`aegov-modal` uses shadow DOM and moves itself to the end of `document.body` when it initialises, so it always renders above the page regardless of where you declared it. It is closed by default and opened imperatively or by setting `is-open`.

```html
<aegov-button id="open">Review submission</aegov-button>

<aegov-modal id="confirm" label="Confirm submission">
  <h2>Submit your application?</h2>
  <p>You will not be able to change your answers after submitting.</p>
  <aegov-button variant="primary">Submit application</aegov-button>
  <aegov-button appearance="outline">Keep editing</aegov-button>
</aegov-modal>

<script type="module">
  const modal = document.querySelector('#confirm');
  document.querySelector('#open').addEventListener('aegovButtonClick', () => modal.show());
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button id="md-demo-open">Review submission</aegov-button>
  <aegov-modal id="md-demo" label="Confirm submission">
    <h2 class="text-h5 font-bold mb-2">Submit your application?</h2>
    <p class="mb-5">You will not be able to change your answers after submitting.</p>
    <div class="flex flex-wrap gap-3">
      <aegov-button variant="primary" onclick="document.querySelector('#md-demo').close()">Submit application</aegov-button>
      <aegov-button appearance="outline" onclick="document.querySelector('#md-demo').close()">Keep editing</aegov-button>
    </div>
  </aegov-modal>
  <script>document.querySelector('#md-demo-open').addEventListener('aegovButtonClick', () => document.querySelector('#md-demo').show());</script>
</div>

Set `label` — it becomes the dialog's accessible name, and a modal without one is announced as an unnamed dialog.

---

## When not to use a modal

Modals are the most disruptive component in the library. Prefer an alternative when:

| Situation | Use instead |
| --- | --- |
| Showing supplementary detail | [Popover](aegov-popover.html) or [Drawer](aegov-drawer.html) |
| Confirming something reversible | Act immediately and offer Undo in a [Toast](aegov-toast.html) |
| Reporting an error | [Callout](aegov-callout.html) in the page |
| A form of more than a few fields | Its own page |
| Site-wide notice | [Banner](aegov-banner.html) |

A modal is right when the user genuinely cannot proceed without answering — a destructive confirmation, a required legal acceptance, a step that must complete atomically.

---

## Opening and closing

### Imperatively

Three async methods:

```js
await modal.show();
await modal.close();
await modal.toggle();
```

### Declaratively

`isOpen` is reflected, so you can drive it from state or markup.

```html
<aegov-modal is-open label="Session expiring">…</aegov-modal>
```

```js
modal.isOpen = true;
```

Both routes run the same animation and emit the same events. `isOpen` is also updated when the user closes the modal, so it stays an accurate reflection of state.

---

## Size

Four tokens controlling maximum width.

```html
<aegov-modal size="sm" label="Small">…</aegov-modal>
<aegov-modal size="base" label="Base">…</aegov-modal>
<aegov-modal size="lg" label="Large">…</aegov-modal>
<aegov-modal size="xl" label="Extra large">…</aegov-modal>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-3">
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#md-sm').show()">sm</aegov-button>
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#md-base').show()">base</aegov-button>
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#md-lg').show()">lg</aegov-button>
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#md-xl').show()">xl</aegov-button>
  </div>
  <aegov-modal id="md-sm" size="sm" label="Small modal"><h2 class="text-h6 font-bold mb-2">Small</h2><p class="mb-4">For a short confirmation.</p><aegov-button size="sm" onclick="document.querySelector('#md-sm').close()">Close</aegov-button></aegov-modal>
  <aegov-modal id="md-base" size="base" label="Base modal"><h2 class="text-h6 font-bold mb-2">Base</h2><p class="mb-4">The default width.</p><aegov-button size="sm" onclick="document.querySelector('#md-base').close()">Close</aegov-button></aegov-modal>
  <aegov-modal id="md-lg" size="lg" label="Large modal"><h2 class="text-h6 font-bold mb-2">Large</h2><p class="mb-4">For content with more structure.</p><aegov-button size="sm" onclick="document.querySelector('#md-lg').close()">Close</aegov-button></aegov-modal>
  <aegov-modal id="md-xl" size="xl" label="Extra large modal"><h2 class="text-h6 font-bold mb-2">Extra large</h2><p class="mb-4">Approaching the point where a page would be better.</p><aegov-button size="sm" onclick="document.querySelector('#md-xl').close()">Close</aegov-button></aegov-modal>
</div>

If you reach for `xl` because the content does not fit, the content probably wants a page or a [Drawer](aegov-drawer.html).

---

## Position

```html
<aegov-modal position="center" label="Centred">…</aegov-modal>
<aegov-modal position="top" label="Top">…</aegov-modal>
<aegov-modal position="bottom" label="Bottom">…</aegov-modal>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-3">
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#md-pc').show()">center</aegov-button>
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#md-pt').show()">top</aegov-button>
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#md-pb').show()">bottom</aegov-button>
  </div>
  <aegov-modal id="md-pc" position="center" label="Centred modal"><p class="mb-4">Centred — the default.</p><aegov-button size="sm" onclick="document.querySelector('#md-pc').close()">Close</aegov-button></aegov-modal>
  <aegov-modal id="md-pt" position="top" label="Top modal"><p class="mb-4">Anchored near the top.</p><aegov-button size="sm" onclick="document.querySelector('#md-pt').close()">Close</aegov-button></aegov-modal>
  <aegov-modal id="md-pb" position="bottom" label="Bottom modal"><p class="mb-4">Anchored near the bottom — reads as a sheet on mobile.</p><aegov-button size="sm" onclick="document.querySelector('#md-pb').close()">Close</aegov-button></aegov-modal>
</div>

`top` suits a tall modal that would otherwise be vertically cramped; `bottom` reads as a sheet on touch devices.

---

## Overlay

`overlayOpacity` sets how strongly the page behind is dimmed.

```html
<aegov-modal overlay-opacity="light" label="Light">…</aegov-modal>
<aegov-modal overlay-opacity="base" label="Base">…</aegov-modal>
<aegov-modal overlay-opacity="dark" label="Dark">…</aegov-modal>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-3">
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#md-ol').show()">light</aegov-button>
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#md-ob').show()">base</aegov-button>
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#md-od').show()">dark</aegov-button>
  </div>
  <aegov-modal id="md-ol" overlay-opacity="light" label="Light overlay"><p class="mb-4">Light overlay.</p><aegov-button size="sm" onclick="document.querySelector('#md-ol').close()">Close</aegov-button></aegov-modal>
  <aegov-modal id="md-ob" overlay-opacity="base" label="Base overlay"><p class="mb-4">Base overlay.</p><aegov-button size="sm" onclick="document.querySelector('#md-ob').close()">Close</aegov-button></aegov-modal>
  <aegov-modal id="md-od" overlay-opacity="dark" label="Dark overlay"><p class="mb-4">Dark overlay — strongest separation.</p><aegov-button size="sm" onclick="document.querySelector('#md-od').close()">Close</aegov-button></aegov-modal>
</div>

A darker overlay separates the modal more clearly, which helps comprehension. `light` is only appropriate when the user needs to refer to the content behind — and if they do, consider a [Drawer](aegov-drawer.html) with `is-overlay="false"` instead.

---

## Dismiss behaviour

| Property | Effect |
| --- | --- |
| `isCloseWithOverlay` | Clicking the overlay closes the modal. Default `true`. |
| `isPreventScroll` | Locks page scroll while open. Default `true`. |

```html
<!-- A destructive confirmation: force a deliberate choice -->
<aegov-modal
  label="Withdraw application"
  is-close-with-overlay="false"
>…</aegov-modal>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-3">
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#md-dis1').show()">Overlay closes (default)</aegov-button>
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#md-dis2').show()">Overlay does not close</aegov-button>
  </div>
  <aegov-modal id="md-dis1" label="Closes on overlay click"><p class="mb-4">Click the dimmed area to close.</p><aegov-button size="sm" onclick="document.querySelector('#md-dis1').close()">Close</aegov-button></aegov-modal>
  <aegov-modal id="md-dis2" label="Requires a choice" is-close-with-overlay="false"><p class="mb-4">Clicking outside will not close this. Use a button.</p><div class="flex gap-3"><aegov-button size="sm" variant="danger" onclick="document.querySelector('#md-dis2').close()">Withdraw</aegov-button><aegov-button size="sm" appearance="outline" onclick="document.querySelector('#md-dis2').close()">Cancel</aegov-button></div></aegov-modal>
</div>

Note that `Escape` always closes the modal, even with `is-close-with-overlay="false"` — that is deliberate, because a dialog with no keyboard escape is a trap. If you need to guard against accidental loss, use the before-close event rather than removing the escape route.

---

## Preventing close

`aegovModalBeforeClose` is a **cancellable event**. Call `preventDefault()` on the event to keep the modal open.

```html
<aegov-modal id="editor" label="Edit details">…</aegov-modal>

<script type="module">
  const modal = document.querySelector('#editor');

  modal.addEventListener('aegovModalBeforeClose', (e) => {
    if (hasUnsavedChanges()) {
      e.preventDefault();                        // cancel on the event itself
      showToast('Save or discard your changes first', 'warning');
    }
  });
</script>
```

[Drawer](aegov-drawer.html) uses the same contract, so a handler works unchanged on either:

```js
modal.addEventListener('aegovModalBeforeClose', (e) => e.preventDefault());
drawer.addEventListener('aegovDrawerBeforeClose', (e) => e.preventDefault());
```

Use this sparingly. A modal that refuses to close is a trap unless the user is given a clear, immediate way out.

---

## Padding

`isPadding` — on by default — applies the standard internal padding. Turn it off when the content manages its own, such as a full-bleed image or a table.

```html
<aegov-modal is-padding="false" label="Document preview">
  <img src="/document.jpg" alt="Scanned tenancy contract" class="w-full" />
</aegov-modal>
```

---

## Composite example — destructive confirmation

```html
<aegov-button id="withdraw-trigger" variant="danger" appearance="outline">Withdraw application</aegov-button>

<aegov-modal
  id="withdraw"
  size="sm"
  label="Withdraw application"
  is-close-with-overlay="false"
>
  <h2 class="text-h6 font-bold mb-2">Withdraw this application?</h2>
  <p class="mb-2">Application <strong>APP-2026-0041827</strong> will be withdrawn and cannot be reinstated.</p>
  <p class="mb-5 text-sm text-aeblack-500">Any fees already paid are non-refundable.</p>

  <div class="flex flex-wrap gap-3">
    <aegov-button id="confirm-withdraw" variant="danger">Yes, withdraw it</aegov-button>
    <aegov-button id="cancel-withdraw" appearance="outline">Keep my application</aegov-button>
  </div>
</aegov-modal>

<script type="module">
  const modal = document.querySelector('#withdraw');
  const confirm = document.querySelector('#confirm-withdraw');

  document.querySelector('#withdraw-trigger')
    .addEventListener('aegovButtonClick', () => modal.show());

  document.querySelector('#cancel-withdraw')
    .addEventListener('aegovButtonClick', () => modal.close());

  confirm.addEventListener('aegovButtonClick', async () => {
    confirm.isLoading = true;
    try {
      await api.withdraw('APP-2026-0041827');
      await modal.close();
      window.aegovToast.show({ message: 'Application withdrawn.', variant: 'success' });
    } catch {
      window.aegovToast.show({ message: 'We could not withdraw the application.', variant: 'error' });
    } finally {
      confirm.isLoading = false;
    }
  });
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button id="md-cx-trigger" variant="danger" appearance="outline">Withdraw application</aegov-button>
  <aegov-modal id="md-cx" size="sm" label="Withdraw application" is-close-with-overlay="false">
    <h2 class="text-h6 font-bold mb-2">Withdraw this application?</h2>
    <p class="mb-2">Application <strong>APP-2026-0041827</strong> will be withdrawn and cannot be reinstated.</p>
    <p class="mb-5 text-sm text-aeblack-500">Any fees already paid are non-refundable.</p>
    <div class="flex flex-wrap gap-3">
      <aegov-button variant="danger" onclick="document.querySelector('#md-cx').close()">Yes, withdraw it</aegov-button>
      <aegov-button appearance="outline" onclick="document.querySelector('#md-cx').close()">Keep my application</aegov-button>
    </div>
  </aegov-modal>
  <script>document.querySelector('#md-cx-trigger').addEventListener('aegovButtonClick', () => document.querySelector('#md-cx').show());</script>
</div>

Note the button labels. "Yes, withdraw it" and "Keep my application" describe outcomes; "OK" and "Cancel" force the user to re-read the question to work out which is which.

---

## RTL Support

The modal is direction-aware. Content, headings and action rows align with the text direction, and the close affordance moves to the inline-start corner in a `dir="rtl"` context.

Because the modal moves itself to `document.body`, **set `dir` on `<html>`** rather than on an inner wrapper — the modal will not inherit direction from the element you declared it inside.

```html
<html dir="rtl" lang="ar">
  <aegov-modal label="تأكيد الإرسال">
    <h2>هل تريد إرسال طلبك؟</h2>
    <p>لن تتمكن من تغيير إجاباتك بعد الإرسال.</p>
    <aegov-button variant="primary">إرسال الطلب</aegov-button>
    <aegov-button appearance="outline">متابعة التعديل</aegov-button>
  </aegov-modal>
</html>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button id="md-rtl-trigger">مراجعة الإرسال</aegov-button>
  <aegov-modal id="md-rtl" label="تأكيد الإرسال">
    <h2 class="text-h6 font-bold mb-2">هل تريد إرسال طلبك؟</h2>
    <p class="mb-5">لن تتمكن من تغيير إجاباتك بعد الإرسال.</p>
    <div class="flex flex-wrap gap-3">
      <aegov-button variant="primary" onclick="document.querySelector('#md-rtl').close()">إرسال الطلب</aegov-button>
      <aegov-button appearance="outline" onclick="document.querySelector('#md-rtl').close()">متابعة التعديل</aegov-button>
    </div>
  </aegov-modal>
  <script>document.querySelector('#md-rtl-trigger').addEventListener('aegovButtonClick', () => document.querySelector('#md-rtl').show());</script>
</div>

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the dialog content. Auto-generated when omitted, reflected. | `string` | _generated_ |
| `isOpen` | `is-open` | Open state. Mutable and reflected — updated when the user closes it. | `boolean` | `false` |
| `label` | `label` | Accessible name for the dialog. **Set this.** | `string` | — |
| `size` | `size` | Maximum width. | `'sm' \| 'base' \| 'lg' \| 'xl'` | `'base'` |
| `position` | `position` | Vertical placement. | `'center' \| 'top' \| 'bottom'` | `'center'` |
| `overlayOpacity` | `overlay-opacity` | How strongly the page behind is dimmed. | `'light' \| 'base' \| 'dark'` | `'base'` |
| `isCloseWithOverlay` | `is-close-with-overlay` | Clicking the overlay closes the modal. | `boolean` | `true` |
| `isPreventScroll` | `is-prevent-scroll` | Locks page scroll while open. | `boolean` | `true` |
| `isPadding` | `is-padding` | Applies standard internal padding. | `boolean` | `true` |

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | The dialog content — heading, body and actions. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovModalOpen` | `void` | The modal opened. |
| `aegovModalClose` | `void` | The modal closed. |
| `aegovModalBeforeClose` | `void` | **Cancellable.** Call `preventDefault()` on the event to keep it open. |
| `aegovModalBackdropClick` | `MouseEvent` | The overlay was clicked. Fires even when `is-close-with-overlay` is false. |
| `aegovModalEscapePress` | `KeyboardEvent` | `Escape` was pressed. |

### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `show()` | `Promise<void>` | Opens the modal. |
| `close()` | `Promise<void>` | Closes the modal, running the before-close event first. |
| `toggle()` | `Promise<void>` | Opens or closes. |

### Pass-through Attributes

The modal uses **shadow DOM**, so pass-through is how attributes reach the dialog element.

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the `role="dialog"` element. Use `aria-labelledby` here if you prefer referencing a visible heading over `label`. |
| `data-*` | Yes | Forwarded to the dialog element. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host only — they cannot restyle shadow internals. |

### Shadow DOM and stacking

- The component **relocates itself to the end of `document.body`** on initialisation, so it is never clipped or mis-stacked by an ancestor.
- Each open modal takes a z-index from a shared manager, so stacked modals layer correctly rather than fighting over a hardcoded value.
- Internals are in shadow DOM: `class` on the host does not reach the dialog, and there are no exposed parts. Style through the documented properties.
- In E2E tests, pierce the shadow root: `page.find('aegov-modal >>> [role="dialog"]')`.

---

## Accessibility

### Built-in behaviour

- The dialog element carries `role="dialog"` and `aria-modal="true"`, so assistive technology treats the rest of the page as unavailable.
- `label` becomes the dialog's accessible name via `aria-label`.
- **Focus is trapped** inside the modal while open. Focusable elements are collected from the slotted content, so your own buttons and fields participate.
- Focus moves into the dialog on open, and returns to the element that opened it on close.
- **`Escape` always closes**, even when overlay dismissal is disabled — a dialog with no keyboard exit is a trap.
- Page scroll is locked while open, using a reference-counted lock so nested overlays do not unlock each other prematurely.
- Z-index is assigned from a shared manager, so a modal opened from a modal stacks above it.
- The modal relocates to `document.body`, which prevents an ancestor's `overflow` or `transform` from clipping it — also avoiding WCAG 2.2 SC 2.4.11 failures where a focused control ends up hidden.

### Developer responsibilities

- **Always set `label`**, or supply `aria-labelledby` pointing at a visible heading inside the modal.
- **Include a visible heading** as the first content. The accessible name alone does not give sighted users a title.
- **Provide an explicit close control.** `Escape` and the overlay are not discoverable on their own, and on touch devices the overlay is the only alternative.
- **Label buttons with outcomes**, not "OK" and "Cancel".
- **Do not open a modal without user action.** An unprompted modal steals focus from whatever the user was doing.
- **Do not nest modals** unless genuinely unavoidable. Each one adds a focus trap the user must escape.
- **Keep content short.** If the user needs to scroll a modal, consider a page or a [Drawer](aegov-drawer.html).
- **Set `dir` on `<html>`** for RTL, since the modal lives on the body.
- **Do not cancel closing without explanation.** If you use `preventDefault()`, say why immediately and give the user a way out.
- **Return focus somewhere sensible** if the triggering element no longer exists after the action — for instance when the modal deleted the row that contained its own trigger.

### Keyboard support

| Key | Action |
| --- | --- |
| `Escape` | Close the modal. Always available. |
| `Tab` | Move to the next focusable element inside the modal, cycling at the end. |
| `Shift` + `Tab` | Move backwards, cycling at the start. |
| `Enter`, `Space` | Activate the focused control. |

---

## Where to next

- [Drawer](aegov-drawer.html) — the same pattern anchored to an edge, and better for longer content.
- [Popover](aegov-popover.html) — for supplementary detail that does not need to block.
- [Toast](aegov-toast.html) — for confirming the outcome after the modal closes.
- [Callout](aegov-callout.html) — for information that belongs in the page instead.
