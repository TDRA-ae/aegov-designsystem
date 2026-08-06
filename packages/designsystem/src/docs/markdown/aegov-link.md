# Link

<p class="text-lg text-aeblack-500 mb-8">A Link navigates. Use it whenever activating the control changes the URL — moving to another page, jumping to an anchor, opening a document, or starting a download. <code>aegov-link</code> renders a real anchor, so users keep middle-click, right-click, "open in new tab" and "copy link address". It can also be styled to look exactly like a button when a navigation action needs button prominence.</p>

## Introduction

`aegov-link` has two modes, and it chooses between them for you. On its own it renders a plain text link. The moment you set any button-style property — `variant`, `appearance`, `size`, `is-icon`, `is-full`, `is-bold` or `is-disabled` — it switches to the shared button styling, so it is visually identical to [`aegov-button`](aegov-button.html) while keeping anchor semantics.

```html
<aegov-link href="/services">Browse all services</aegov-link>

<aegov-link href="/apply" variant="primary">Start application</aegov-link>
<aegov-link href="/guide" variant="secondary" appearance="outline">Read the guide</aegov-link>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-6">
    <aegov-link href="#">Browse all services</aegov-link>
    <aegov-link href="#" variant="primary">Start application</aegov-link>
    <aegov-link href="#" variant="secondary" appearance="outline">Read the guide</aegov-link>
  </div>
</div>

`href` is required. A link without a destination is not a link — if there is no URL, you want a [Button](aegov-button.html).

---

## Text links

With no button-style properties set, the component renders an inline anchor that inherits the design system's global link styling: primary colour, no underline at rest, underline on hover, and a high-contrast focus treatment.

```html
<p>
  Applications are processed within five working days. See the
  <aegov-link href="/service-charter">service charter</aegov-link>
  for full details, or
  <aegov-link href="/contact">contact us</aegov-link>
  if you need help.
</p>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="max-w-prose">
    Applications are processed within five working days. See the
    <aegov-link href="#">service charter</aegov-link>
    for full details, or
    <aegov-link href="#">contact us</aegov-link>
    if you need help.
  </p>
</div>

Text links inside a paragraph should describe their destination. "Service charter" tells the user where they are going; "click here" does not, and screen reader users often navigate by a list of links with no surrounding sentence.

---

## Button-styled links

Setting any button-style property switches the class output to the shared action styling. `variant`, `appearance` and `size` behave exactly as they do on [Button](aegov-button.html) — same five variants, same four appearances, same five sizes.

```html
<aegov-link href="/apply" variant="primary" size="lg">Start application</aegov-link>
<aegov-link href="/draft" variant="secondary" appearance="outline" size="lg">Resume draft</aegov-link>
<aegov-link href="/help" appearance="soft">Get help</aegov-link>
<aegov-link href="/terms" appearance="link">Terms of service</aegov-link>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3 mb-6">
    <aegov-link href="#" variant="primary" size="lg">Start application</aegov-link>
    <aegov-link href="#" variant="secondary" appearance="outline" size="lg">Resume draft</aegov-link>
    <aegov-link href="#" appearance="soft">Get help</aegov-link>
    <aegov-link href="#" appearance="link">Terms of service</aegov-link>
  </div>
  <div class="flex flex-wrap items-center gap-3">
    <aegov-link href="#" variant="danger" appearance="outline">Withdraw request</aegov-link>
    <aegov-link href="#" variant="neutral-max" appearance="outline">Back to dashboard</aegov-link>
    <aegov-link href="#" variant="neutral-min" appearance="soft">Skip for now</aegov-link>
  </div>
</div>

### Sizes

The same scale as Button, so a link and a button sitting side by side align exactly.

| Token | Height |
| --- | --- |
| `xs` | `h-9` (36px) |
| `sm` | `h-10` (40px) |
| `base` | `h-11` (44px) |
| `lg` | `h-12` (48px) |
| `xl` | `h-13` (52px) |

```html
<aegov-link href="/apply" variant="primary" size="sm">Small</aegov-link>
<aegov-link href="/apply" variant="primary" size="base">Base</aegov-link>
<aegov-link href="/apply" variant="primary" size="lg">Large</aegov-link>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-link href="#" variant="primary" size="xs">Extra small</aegov-link>
    <aegov-link href="#" variant="primary" size="sm">Small</aegov-link>
    <aegov-link href="#" variant="primary" size="base">Base</aegov-link>
    <aegov-link href="#" variant="primary" size="lg">Large</aegov-link>
    <aegov-link href="#" variant="primary" size="xl">Extra large</aegov-link>
  </div>
</div>

### Responsive sizes

`size` accepts the same responsive string form, with the prefixes `xs`, `sm`, `md`, `lg`, `xl` and `2xl`.

```html
<aegov-link href="/apply" variant="primary" size="sm md:base xl:lg">
  Start application
</aegov-link>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-link href="#" variant="primary" size="sm md:base xl:lg">Start application</aegov-link>
</div>

### Pairing a link with a button

This is the common case for a service call to action: navigation is the primary path, an action is secondary.

```html
<div class="flex flex-wrap items-center gap-3">
  <aegov-link href="/apply" variant="primary" size="lg">Start application</aegov-link>
  <aegov-button variant="secondary" appearance="outline" size="lg">Save for later</aegov-button>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-link href="#" variant="primary" size="lg">Start application</aegov-link>
    <aegov-button variant="secondary" appearance="outline" size="lg">Save for later</aegov-button>
  </div>
</div>

They match visually because both delegate to the same styling utility — but the link navigates and the button acts, which is the distinction that matters to assistive technology and to anyone who middle-clicks.

---

## Full width and icon-only

`is-full` stretches the link to the container width. `is-icon` makes it square — and, as with buttons, an icon-only link has no text to name it, so `aria-label` is required.

```html
<aegov-link href="/apply" variant="primary" size="lg" is-full>Continue to payment</aegov-link>

<aegov-link href="/settings" is-icon appearance="outline" aria-label="Account settings">
  <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">…</svg>
</aegov-link>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-sm mb-6">
    <aegov-link href="#" variant="primary" size="lg" is-full>Continue to payment</aegov-link>
  </div>
  <div class="flex flex-wrap items-center gap-3">
    <aegov-link href="#" is-icon appearance="outline" variant="neutral-max" aria-label="Account settings">
      <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8.34 1.804A1 1 0 0 1 9.32 1h1.36a1 1 0 0 1 .98.804l.295 1.473c.497.144.971.342 1.416.588l1.25-.834a1 1 0 0 1 1.262.125l.962.962a1 1 0 0 1 .125 1.262l-.834 1.25c.246.445.444.919.588 1.416l1.473.294a1 1 0 0 1 .804.98v1.362a1 1 0 0 1-.804.98l-1.473.295a6.95 6.95 0 0 1-.588 1.416l.834 1.25a1 1 0 0 1-.125 1.262l-.962.962a1 1 0 0 1-1.262.125l-1.25-.834a6.95 6.95 0 0 1-1.416.588l-.294 1.473a1 1 0 0 1-.98.804H9.32a1 1 0 0 1-.98-.804l-.295-1.473a6.95 6.95 0 0 1-1.416-.588l-1.25.834a1 1 0 0 1-1.262-.125l-.962-.962a1 1 0 0 1-.125-1.262l.834-1.25a6.95 6.95 0 0 1-.588-1.416l-1.473-.294A1 1 0 0 1 1 10.68V9.32a1 1 0 0 1 .804-.98l1.473-.295c.144-.497.342-.971.588-1.416l-.834-1.25a1 1 0 0 1 .125-1.262l.962-.962A1 1 0 0 1 5.38 3.03l1.25.834a6.95 6.95 0 0 1 1.416-.588l.294-1.473ZM13 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd" /></svg>
    </aegov-link>
    <aegov-link href="#" is-icon appearance="soft" aria-label="Download application form">
      <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.19L6.28 7.97a.75.75 0 0 0-1.06 1.06l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0-1.06-1.06l-2.97 2.97V2.75Z" /><path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" /></svg>
    </aegov-link>
  </div>
</div>

`is-full` also adds an `is-full` class to the host element, so the host itself stretches rather than leaving a shrink-wrapped wrapper around a full-width anchor.

---

## Font weight

Unlike Button, links are **not** bold by default — a bold text link inside a paragraph would fight the surrounding copy. Set `is-bold` when a button-styled link needs the same weight as a button.

```html
<aegov-link href="/apply" variant="primary">Regular weight (default)</aegov-link>
<aegov-link href="/apply" variant="primary" is-bold>Bold weight</aegov-link>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-link href="#" variant="primary">Regular weight (default)</aegov-link>
    <aegov-link href="#" variant="primary" is-bold>Bold weight</aegov-link>
  </div>
</div>

---

## Opening in a new tab

`target` maps to the native attribute. When you set `target="_blank"` and do not supply your own `rel`, the component adds `rel="noopener noreferrer"` for you — the standard protection against the opened page reaching back into yours.

```html
<aegov-link href="https://u.ae" target="_blank">
  The official UAE portal
  <svg class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">…</svg>
  <span class="sr-only">(opens in a new tab)</span>
</aegov-link>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-link href="https://u.ae" target="_blank">
    The official UAE portal
    <svg class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M12.5 3.5a.75.75 0 0 0 0 1.5h1.44l-5.22 5.22a.75.75 0 1 0 1.06 1.06L15 6.06V7.5a.75.75 0 0 0 1.5 0v-3.25a.75.75 0 0 0-.75-.75H12.5Z" /><path d="M4.5 5.5A2 2 0 0 0 2.5 7.5v8A2 2 0 0 0 4.5 17.5h8a2 2 0 0 0 2-2v-3a.75.75 0 0 0-1.5 0v3a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h3a.75.75 0 0 0 0-1.5h-3Z" /></svg>
    <span class="sr-only">(opens in a new tab)</span>
  </aegov-link>
</div>

Announce the new tab. A visually hidden note in the link text is the most reliable way — an icon alone does not reach screen readers, and an unexpected new tab is disorienting for anyone relying on browser history to go back.

Supplying your own `rel` overrides the automatic value, so include `noopener` yourself if you need to add other tokens:

```html
<aegov-link href="https://example.ae" target="_blank" rel="noopener external">External site</aegov-link>
```

---

## Downloads

`download` is a pass-through attribute, forwarded to the inner anchor. Give the file type and size in the link text so the user knows what they are committing to before it starts.

```html
<aegov-link href="/forms/residency-application.pdf" download appearance="outline">
  <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">…</svg>
  Download application form (PDF, 240 KB)
</aegov-link>

<aegov-link href="/data/statistics-2026.csv" download="statistics-2026.csv" appearance="soft">
  Download dataset (CSV, 1.2 MB)
</aegov-link>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-link href="#" download appearance="outline">
      <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.19L6.28 7.97a.75.75 0 0 0-1.06 1.06l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0-1.06-1.06l-2.97 2.97V2.75Z" /><path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" /></svg>
      Download application form (PDF, 240 KB)
    </aegov-link>
    <aegov-link href="#" download appearance="soft">Download dataset (CSV, 1.2 MB)</aegov-link>
  </div>
</div>

---

## Disabled links

Native anchors have no `disabled` attribute. `is-disabled` polyfills it: the `href` is removed so there is nothing to navigate to, `role="link"` is kept so the element still announces as a link, `aria-disabled="true"` communicates the state, `tabindex="-1"` takes it out of the tab order, and click navigation is blocked. Any `target`, `rel` or `download` you set is stripped, so a stale attribute cannot smuggle a navigation through.

```html
<aegov-link href="/step-3" variant="primary" is-disabled>
  Continue to payment
</aegov-link>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-link href="#" variant="primary" is-disabled>Continue to payment</aegov-link>
    <aegov-link href="#" appearance="outline" is-disabled>Not yet available</aegov-link>
    <aegov-link href="#" is-disabled>Disabled text link</aegov-link>
  </div>
</div>

Use this sparingly. A disabled link is a dead end with no explanation — usually the better pattern is to omit the link entirely, or to render it as plain text with a note about what needs to happen first. Where you do need it, say why nearby.

The host also receives an `is-disabled` class, so you can style surrounding layout in response.

---

## Loading state

There is deliberately no `is-loading` on `aegov-link`. A loading state means work is happening in place, which is button behaviour — navigation either happens or it does not. If activating the control kicks off an async process, use [`aegov-button`](aegov-button.html) with `is-loading` instead.

---

## Intercepting navigation

`aegovLinkClick` fires on click with the `href` and the original event. Calling `preventDefault()` on the **custom** event also cancels the anchor's native navigation — which is how you hand control to a client-side router.

```html
<aegov-link href="/services/emirates-id" id="nav-link">Emirates ID services</aegov-link>

<script type="module">
  document.querySelector('#nav-link').addEventListener('aegovLinkClick', (e) => {
    e.preventDefault();               // cancels the browser navigation too
    router.navigate(e.detail.href);
  });
</script>
```

For a whole page, delegate — the event bubbles:

```js
document.addEventListener('aegovLinkClick', (e) => {
  const { href, event } = e.detail;

  // Let the browser handle modified clicks and external URLs
  if (event.metaKey || event.ctrlKey || event.shiftKey) return;
  if (new URL(href, location.href).origin !== location.origin) return;

  e.preventDefault();
  router.navigate(href);
});
```

Checking for modifier keys matters. Swallowing every click is what breaks "open in new tab", and it is one of the most common accessibility regressions in single-page applications.

---

## Composite example — service page footer

```html
<div class="flex flex-wrap items-center justify-between gap-6">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-link href="/apply" variant="primary" size="lg">Start application</aegov-link>
    <aegov-link href="/eligibility" variant="secondary" appearance="outline" size="lg">
      Check eligibility
    </aegov-link>
  </div>

  <nav class="flex flex-wrap items-center gap-x-6 gap-y-2">
    <aegov-link href="/service-charter">Service charter</aegov-link>
    <aegov-link href="/forms/guide.pdf" download>Guide (PDF, 180 KB)</aegov-link>
    <aegov-link href="https://u.ae" target="_blank">
      u.ae <span class="sr-only">(opens in a new tab)</span>
    </aegov-link>
  </nav>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center justify-between gap-6">
    <div class="flex flex-wrap items-center gap-3">
      <aegov-link href="#" variant="primary" size="lg">Start application</aegov-link>
      <aegov-link href="#" variant="secondary" appearance="outline" size="lg">Check eligibility</aegov-link>
    </div>
    <nav class="flex flex-wrap items-center gap-x-6 gap-y-2">
      <aegov-link href="#">Service charter</aegov-link>
      <aegov-link href="#" download>Guide (PDF, 180 KB)</aegov-link>
      <aegov-link href="https://u.ae" target="_blank">u.ae <span class="sr-only">(opens in a new tab)</span></aegov-link>
    </nav>
  </div>
</div>

---

## RTL Support

The link is direction-agnostic. Text links flow with the surrounding paragraph, and button-styled links use the same logical spacing as Button, so slotted icons reverse automatically in a `dir="rtl"` container.

```html
<div dir="rtl">
  <p>
    تُعالَج الطلبات خلال خمسة أيام عمل. راجع
    <aegov-link href="/service-charter">ميثاق الخدمة</aegov-link>
    لمزيد من التفاصيل.
  </p>

  <aegov-link href="/apply" variant="primary" size="lg">ابدأ الطلب</aegov-link>
  <aegov-link href="/guide.pdf" download appearance="outline">تحميل الدليل (PDF، ١٨٠ كيلوبايت)</aegov-link>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="max-w-prose mb-6">
    تُعالَج الطلبات خلال خمسة أيام عمل. راجع
    <aegov-link href="#">ميثاق الخدمة</aegov-link>
    لمزيد من التفاصيل، أو
    <aegov-link href="#">اتصل بنا</aegov-link>
    إذا احتجت إلى مساعدة.
  </p>
  <div class="flex flex-wrap items-center gap-3">
    <aegov-link href="#" variant="primary" size="lg">ابدأ الطلب</aegov-link>
    <aegov-link href="#" variant="secondary" appearance="outline" size="lg">تحقق من الأهلية</aegov-link>
    <aegov-link href="#" download appearance="soft">تحميل الدليل (PDF، ١٨٠ كيلوبايت)</aegov-link>
  </div>
</div>

Two things to handle yourself:

- **Directional icons.** An "external link" arrow or a "next" chevron points the other way in Arabic. Swap the glyph per direction, or choose a symmetrical one.
- **"Opens in a new tab" notes** need translating along with the link text — the visually hidden span is content, not chrome.

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `href` | `href` | **Required.** Destination URL, applied to the inner `<a>`. Removed while `is-disabled`. | `string` | — |
| `fieldId` | `field-id` | ID applied to the inner `<a>`. Auto-generated when omitted, and reflected to the host. | `string` | _generated_ |
| `target` | `target` | Native target. With `_blank` and no explicit `rel`, `rel="noopener noreferrer"` is added automatically. | `'_self' \| '_blank' \| '_parent' \| '_top'` | — |
| `rel` | `rel` | Native rel. Overrides the automatic `_blank` value. | `string` | — |
| `extraClass` | `extra-class` | Extra classes appended to the inner `<a>`. | `string` | — |
| `variant` | `variant` | Button-style colour. **Setting this opts into button styling.** | `'primary' \| 'secondary' \| 'danger' \| 'neutral-min' \| 'neutral-max'` | — |
| `appearance` | `appearance` | Button-style treatment. **Setting this opts into button styling.** | `'solid' \| 'outline' \| 'soft' \| 'link'` | — |
| `size` | `size` | Button-style size token or responsive string. **Setting this opts into button styling.** | `string` | — |
| `isIcon` | `is-icon` | Square, icon-only rendering. Requires `aria-label`. | `boolean` | `false` |
| `isFull` | `is-full` | Stretches to the container width, and adds `is-full` to the host. | `boolean` | `false` |
| `isBold` | `is-bold` | Bold label. Note this defaults to `false`, unlike Button. | `boolean` | `false` |
| `isDisabled` | `is-disabled` | Blocks navigation, removes `href`, sets `aria-disabled` and `tabindex="-1"`, and adds `is-disabled` to the host. | `boolean` | `false` |

There is no `isLoading` — see [Loading state](#loading-state).

Invalid `target`, `variant` or `appearance` values fall back to the default and log a console warning in development.

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | The link text, plus optional inline `<svg>` icons and visually hidden notes. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovLinkClick` | `{ href: string; event: MouseEvent }` | Fired on click. Calling `preventDefault()` on this event also cancels the anchor's native navigation. Not emitted while `is-disabled`. |

### Pass-through Attributes

Pass-through attributes land on the inner `<a>`, which is where anchor attributes need to be to take effect.

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the inner `<a>` — this is how `aria-label` and `aria-current` reach the real link. |
| `data-*` | Yes | Forwarded to the inner `<a>`. |
| `download` | Yes | Forwarded. Stripped while `is-disabled`. |
| `title`, `hreflang`, `referrerpolicy`, `type` | Yes | Forwarded to the inner `<a>`. |
| `target`, `rel` | Yes | Also available as properties; the properties are the documented route. Both are stripped while `is-disabled`. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host. Use `extra-class` to reach the inner `<a>`. |

### Host classes

| Class | Applied when |
| --- | --- |
| `is-full` | `is-full` is set. |
| `is-disabled` | `is-disabled` is set. |

---

## Accessibility

### Built-in behaviour

- The inner element is a real `<a href>`, so the link role, `Enter` activation, browser history, middle-click, right-click context menu and "copy link address" all come from the platform.
- `target="_blank"` without an explicit `rel` automatically gets `rel="noopener noreferrer"`.
- `is-disabled` produces a coherent disabled state rather than a visual-only one: no `href`, `aria-disabled="true"`, `tabindex="-1"`, `role="link"` retained, click navigation blocked, and navigation-affecting pass-through attributes stripped.
- `aria-*` attributes on the host are forwarded to the anchor, so ARIA relationships apply to the focusable element.
- The global link styling provides a focus-visible treatment with its own background and outline, meeting the 3:1 non-text contrast requirement of WCAG 2.2 SC 1.4.11.
- Button-styled links use the same size scale as Button, so every token is at least 36 CSS px tall — above the 24 × 24 minimum of WCAG 2.2 SC 2.5.8.

### Developer responsibilities

- **Write link text that describes the destination.** "Service charter" works in a list of links read out of context; "click here", "more" and "read more" do not.
- **Announce a new tab** in the link text, typically with a visually hidden `(opens in a new tab)`. An icon is not announced.
- **State the file type and size for downloads**, in the link text, before the user commits to it.
- **Give icon-only links an `aria-label`**, and mark decorative icons `aria-hidden="true"`.
- **Use `aria-current="page"`** on the link representing the current page in a navigation list.
- **Do not use a link for an action.** If it does not change the URL, it belongs in a [Button](aegov-button.html) — otherwise middle-click opens a blank tab and the screen reader announcement is wrong.
- **Do not rely on colour alone** to mark text as a link inside body copy (WCAG 2.2 SC 1.4.1). The design system underlines links on hover and focus; keep that, or add your own persistent underline in dense prose.
- **Respect modifier keys** when intercepting `aegovLinkClick` for a client-side router.
- **Prefer omitting a link to disabling it**, and where you must disable it, explain what unlocks it.

### Keyboard support

| Key | Action |
| --- | --- |
| `Tab` | Move focus to the link. Skipped when `is-disabled`. |
| `Shift` + `Tab` | Move focus to the previous focusable element. |
| `Enter` | Follow the link. |

`Space` deliberately does not activate a link — that is button behaviour, and the difference is a cue that screen reader and keyboard users rely on to tell the two apart.

---

## Where to next

- [Button](aegov-button.html) — for actions, and the source of the shared styling.
- [Button Group](aegov-button-group.html) — joining related controls.
- [Breadcrumbs](aegov-breadcrumbs.html) and [Navbar](aegov-navbar.html) — navigation patterns with their own link handling.
- [Installation](installation.html) — global `<a>` styling and the CSS layer model.
