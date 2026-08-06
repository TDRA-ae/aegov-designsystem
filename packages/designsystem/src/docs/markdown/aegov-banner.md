# Banner

<p class="text-lg text-aeblack-500 mb-8">A Banner announces something that applies to the whole site rather than to one page — a service outage, a policy change, a maintenance window, a cookie notice. It anchors to the top or bottom of the viewport and stays there while the user navigates, which is what separates it from an inline <a href="aegov-callout.html">Callout</a>.</p>

## Introduction

`aegov-banner` renders a full-width bar with a variant icon, a heading, a message and optional actions. It is dismissible by default.

```html
<aegov-banner variant="info" heading="Scheduled maintenance">
  This service will be unavailable on Friday 12 September between 22:00 and 02:00.
</aegov-banner>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="text-sm text-aeblack-500 mb-3">Shown inline here for illustration — in use, a banner anchors to the viewport edge.</p>
  <aegov-banner variant="info" display="sticky" heading="Scheduled maintenance">
    This service will be unavailable on Friday 12 September between 22:00 and 02:00.
  </aegov-banner>
</div>

Because a banner is viewport-anchored, the previews on this page use `display="sticky"` so they sit in the document rather than covering it. Real usage is normally `display="fixed"`.

---

## Banner, callout or toast?

| Component | Scope | Lifetime |
| --- | --- | --- |
| **Banner** | The whole site. Anchored to a viewport edge. | Persists across pages until dismissed or the situation ends. |
| [Callout](aegov-callout.html) | One part of one page. In the content flow. | Persists while the situation applies. |
| [Toast](aegov-toast.html) | One action the user just took. Floating. | Seconds. |

If the message would still be true on a different page, it is a banner.

---

## Position and display

`position` anchors the banner to the `top` or `bottom` edge. `display` decides whether it is `fixed` to the viewport or `sticky` within the document flow.

```html
<aegov-banner position="top" display="fixed" variant="info">…</aegov-banner>
<aegov-banner position="bottom" display="fixed" variant="info">…</aegov-banner>
```

| Combination | Behaviour |
| --- | --- |
| `top` + `fixed` | Pinned to the top of the viewport. The most common configuration. |
| `bottom` + `fixed` | Pinned to the bottom — conventional for cookie and consent notices. |
| `top` + `sticky` | Scrolls with the document until it reaches the top, then sticks. |

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <aegov-banner variant="info" display="sticky" position="top" heading="Top position">Anchored to the top edge.</aegov-banner>
    <aegov-banner variant="default" display="sticky" position="bottom" heading="Bottom position">Anchored to the bottom edge — conventional for consent notices.</aegov-banner>
  </div>
</div>

---

## Mode — push or overlay

This is the property that decides whether the banner covers your content or moves it.

| Mode | Behaviour |
| --- | --- |
| `push` | Default. The banner reserves space by setting padding on `<body>`, so page content shifts out from under it. |
| `overlay` | The banner floats over the content. Nothing shifts, and the component reports its height so you can compensate yourself. |

```html
<!-- Content shifts down; nothing is hidden -->
<aegov-banner mode="push" position="top" display="fixed" variant="warning">…</aegov-banner>

<!-- Banner floats above content -->
<aegov-banner mode="overlay" position="top" display="fixed" variant="warning">…</aegov-banner>
```

In `push` mode with `display="fixed"`, the component sets a CSS custom property for the relevant body padding and keeps it accurate with a `ResizeObserver` — so a banner whose text wraps to two lines on a phone still reserves the right amount of space. On dismiss the padding is removed.

Prefer `push`. An `overlay` banner covers whatever is beneath it, which on a top-anchored banner is usually the site header and the skip link.

### Reacting to the height yourself

In `overlay` mode the banner emits `aegovBannerHeightChange` whenever its height changes, including `{ height: 0 }` when dismissed. Use it when you need to offset something the component cannot know about, such as a sticky sub-navigation of your own.

```html
<aegov-banner id="notice" mode="overlay" position="top" display="fixed" variant="warning">
  Reduced service today.
</aegov-banner>

<script type="module">
  const banner = document.querySelector('#notice');
  const nav = document.querySelector('#sticky-nav');

  banner.addEventListener('aegovBannerHeightChange', (e) => {
    nav.style.top = `${e.detail.height}px`;
  });
</script>
```

---

## Variant

Five variants, matching [Callout](aegov-callout.html). As there, the variant decides the announcement politeness as well as the colour — `error` interrupts, everything else waits. See [Accessibility](#accessibility).

```html
<aegov-banner variant="default">…</aegov-banner>
<aegov-banner variant="info">…</aegov-banner>
<aegov-banner variant="success">…</aegov-banner>
<aegov-banner variant="warning">…</aegov-banner>
<aegov-banner variant="error">…</aegov-banner>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <aegov-banner variant="default" display="sticky" heading="Default">A neutral site-wide notice.</aegov-banner>
    <aegov-banner variant="info" display="sticky" heading="Information">Appointment booking now opens 60 days in advance.</aegov-banner>
    <aegov-banner variant="success" display="sticky" heading="Restored">Service has been restored. Thank you for your patience.</aegov-banner>
    <aegov-banner variant="warning" display="sticky" heading="Reduced service">Some services are running slowly while we complete maintenance.</aegov-banner>
    <aegov-banner variant="error" display="sticky" heading="Service unavailable">Payments are temporarily unavailable. Applications can still be saved as drafts.</aegov-banner>
  </div>
</div>

---

## Appearance and size

`appearance` switches between a tinted and a filled bar. `size` takes three tokens and accepts a responsive string.

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <aegov-banner variant="info" appearance="soft" display="sticky" heading="Soft">Tinted background.</aegov-banner>
    <aegov-banner variant="info" appearance="solid" display="sticky" heading="Solid">Filled background.</aegov-banner>
    <aegov-banner variant="warning" size="sm" display="sticky">Small size, no heading.</aegov-banner>
    <aegov-banner variant="warning" size="lg" display="sticky" heading="Large size">More padding and larger type.</aegov-banner>
  </div>
</div>

---

## Heading

`heading` renders a bold title **and** gives the banner its accessible name through `aria-labelledby`. It is worth setting for that reason alone — a `role="status"` region with no name tells the user a live area changed without saying what it was.

```html
<aegov-banner variant="warning" heading="Reduced service">
  Some services are running slowly while we complete maintenance.
</aegov-banner>
```

---

## Actions

The `actions` slot holds buttons or links.

```html
<aegov-banner variant="default" position="bottom" display="fixed" heading="Cookies on this service">
  We use essential cookies to make this service work. We would also like to set analytics
  cookies to help us improve it.
  <div slot="actions">
    <aegov-button size="sm" variant="primary">Accept analytics cookies</aegov-button>
    <aegov-button size="sm" appearance="outline">Reject analytics cookies</aegov-button>
    <aegov-link size="sm" appearance="link" href="/cookies">View cookie policy</aegov-link>
  </div>
</aegov-banner>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-banner variant="default" display="sticky" position="bottom" heading="Cookies on this service" is-dismissible="false">
    We use essential cookies to make this service work. We would also like to set analytics cookies to help us improve it.
    <div slot="actions">
      <aegov-button size="sm" variant="primary">Accept analytics cookies</aegov-button>
      <aegov-button size="sm" appearance="outline">Reject analytics cookies</aegov-button>
      <aegov-link size="sm" appearance="link" href="#">View cookie policy</aegov-link>
    </div>
  </aegov-banner>
</div>

Note `is-dismissible="false"` on the consent banner. A cookie notice needs an explicit choice — a close button that neither accepts nor rejects leaves consent undetermined.

---

## Custom icon

The `icon` slot replaces the variant's default icon.

```html
<aegov-banner variant="info" heading="New service">
  <svg slot="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M12 2v20M2 12h20" />
  </svg>
  Renew your vehicle registration online from today.
</aegov-banner>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-banner variant="info" display="sticky" heading="New service">
    <svg slot="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" /></svg>
    Renew your vehicle registration online from today.
  </aegov-banner>
</div>

---

## Dismissal

`isDismissible` is **on by default**. Set it to `false` for a banner the user must act on.

```html
<aegov-banner variant="info" is-dismissible>Dismissible (default)</aegov-banner>
<aegov-banner variant="error" is-dismissible="false">Cannot be dismissed</aegov-banner>
```

Dismissal animates out over 300ms, then emits `aegovBannerDismiss` and cleans up any body padding it had reserved.

```html
<aegov-banner id="notice" variant="info" heading="New feature">…</aegov-banner>

<script type="module">
  const banner = document.querySelector('#notice');

  // Remember the dismissal so it does not reappear on every page
  if (localStorage.getItem('notice-2026-09') === 'dismissed') {
    banner.remove();
  }

  banner.addEventListener('aegovBannerDismiss', () => {
    localStorage.setItem('notice-2026-09', 'dismissed');
  });
</script>
```

A site-wide banner that returns on every page load is one of the most reliable ways to make a service feel broken. Persist the dismissal.

---

## Focusable banners

`isFocusable` makes the banner itself focusable. Use it only when you need to move focus to the banner programmatically — for example after an error banner appears mid-task — and remember that a focusable non-interactive region is unusual, so do not enable it by default.

```js
banner.isFocusable = true;
banner.focus();
```

---

## Composite example — service outage

```html
<aegov-banner
  id="outage"
  variant="error"
  position="top"
  display="fixed"
  mode="push"
  heading="Payments are temporarily unavailable"
  is-dismissible="false"
>
  You can still complete and save your application as a draft. We will email you when
  payments are working again.
  <div slot="actions">
    <aegov-button size="sm" appearance="outline">Save as draft</aegov-button>
    <aegov-link size="sm" appearance="link" href="/service-status">Check service status</aegov-link>
  </div>
</aegov-banner>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-banner variant="error" display="sticky" mode="push" heading="Payments are temporarily unavailable" is-dismissible="false">
    You can still complete and save your application as a draft. We will email you when payments are working again.
    <div slot="actions">
      <aegov-button size="sm" appearance="outline">Save as draft</aegov-button>
      <aegov-link size="sm" appearance="link" href="#">Check service status</aegov-link>
    </div>
  </aegov-banner>
</div>

Note what this banner does well: it states the problem, says what the user *can* still do, and is not dismissible because the constraint has not gone away.

---

## RTL Support

The banner is direction-aware. In a `dir="rtl"` container the icon moves to the right, the dismiss button to the left, and the heading, message and actions align with the text direction. Body padding in `push` mode is a block-direction property, so it is unaffected by text direction. The dismiss button's `aria-label` is translated automatically.

```html
<div dir="rtl">
  <aegov-banner variant="warning" heading="خدمة محدودة">
    بعض الخدمات تعمل ببطء أثناء إكمال أعمال الصيانة.
    <div slot="actions">
      <aegov-button size="sm" appearance="outline">حالة الخدمة</aegov-button>
    </div>
  </aegov-banner>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <aegov-banner variant="info" display="sticky" heading="صيانة مجدولة">ستكون هذه الخدمة غير متاحة يوم الجمعة ١٢ سبتمبر بين الساعة ٢٢:٠٠ و٠٢:٠٠.</aegov-banner>
    <aegov-banner variant="error" display="sticky" heading="المدفوعات غير متاحة مؤقتًا" is-dismissible="false">
      لا يزال بإمكانك إكمال طلبك وحفظه كمسودة. سنراسلك عندما تعود المدفوعات للعمل.
      <div slot="actions">
        <aegov-button size="sm" appearance="outline">حفظ كمسودة</aegov-button>
        <aegov-link size="sm" appearance="link" href="#">حالة الخدمة</aegov-link>
      </div>
    </aegov-banner>
  </div>
</div>

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the banner. Auto-generated when omitted, reflected. Also used to build the heading's ID. | `string` | _generated_ |
| `variant` | `variant` | Semantic meaning. Also decides the live-region politeness. | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` |
| `appearance` | `appearance` | Visual treatment. | `'soft' \| 'solid'` | `'soft'` |
| `position` | `position` | Which viewport edge the banner anchors to. | `'top' \| 'bottom'` | `'top'` |
| `display` | `display` | Fixed to the viewport, or sticky within the document. | `'fixed' \| 'sticky'` | `'fixed'` |
| `mode` | `mode` | `push` reserves space via body padding; `overlay` floats above content. | `'push' \| 'overlay'` | `'push'` |
| `heading` | `heading` | Bold title. Also becomes the banner's accessible name via `aria-labelledby`. | `string` | — |
| `size` | `size` | Size token or responsive string. | `string` — `sm \| base \| lg` | `'base'` |
| `isDismissible` | `is-dismissible` | Renders a close button. **Defaults to on.** | `boolean` | `true` |
| `isFocusable` | `is-focusable` | Makes the banner itself focusable, for programmatic focus. | `boolean` | `false` |

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | The message. |
| `icon` | Replaces the variant's default icon. |
| `actions` | Buttons or links offering next steps. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovBannerDismiss` | `void` | Emitted after the 300ms dismiss animation completes and any reserved body padding has been cleared. |
| `aegovBannerHeightChange` | `{ height: number }` | Emitted in `overlay` mode whenever the height changes, and with `0` on dismiss. |

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the banner element. |
| `data-*` | Yes | Forwarded to the banner element. |
| `role` | **Override** | Setting `role` on the host overrides the auto-computed live role. Only do this deliberately — see below. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host element. |

---

## Accessibility

### Built-in behaviour

- **The live role is computed from the variant:**
  - `error` renders `role="alert"` — assertive, interrupting, because a blocking failure must not wait.
  - `default`, `info`, `success` and `warning` render `role="status"` — polite, announced when assistive technology is idle.
- **`role="region"` is deliberately not used.** A region is a navigation landmark with no live-region semantics, so a dynamically injected banner using it would never be announced at all. This is why the component picks `alert` or `status` instead.
- Setting `role` on the host overrides the computed value, for the rare case where you know better.
- `heading` is wired to the banner through `aria-labelledby`, giving the live region an accessible name.
- The variant icon is decorative and hidden from assistive technology.
- The dismiss button is a real `<button type="button">` with a translated `aria-label` and an `aria-hidden` icon.
- In `push` mode the reserved body padding is kept accurate by a `ResizeObserver`, so a wrapped banner never covers content — including the site header and skip link.
- Body padding is removed on dismiss, so the page does not keep a gap.

### Developer responsibilities

- **Set `heading`.** Without it the live region has no accessible name.
- **Prefer `mode="push"`.** An overlay banner covers the top of the page, which is where the skip link and primary navigation live — a genuine barrier, and one that also risks WCAG 2.2 SC 2.4.11 by obscuring focused elements.
- **Choose the variant for meaning.** `error` interrupts every screen reader user immediately; using it for a promotional notice is abusive.
- **Do not show more than one banner at a time.** Two live regions appearing together produce an unusable announcement queue, and two stacked bars consume the viewport.
- **Persist dismissal.** A banner that returns on every page load is worse than no banner.
- **Do not make a consent banner dismissible** with a plain close button — consent requires an explicit choice.
- **Do not put essential first-run instructions in a banner.** It is dismissible and viewport-anchored; instructions belong in the page.
- **Keep the text short.** A banner is a headline plus one sentence. Anything longer belongs on a page the banner links to.
- **Mark a custom `icon` as `aria-hidden="true"`.**
- **Test at 320px.** A banner with three actions and a heading is the most common source of reflow failures under WCAG 2.2 SC 1.4.10.

### Keyboard support

| Key | Action |
| --- | --- |
| `Tab` | Move focus through the actions, then to the dismiss button. |
| `Enter`, `Space` | Activate the focused control. |

The banner itself is not a focus stop unless `is-focusable` is set.

---

## Where to next

- [Callout](aegov-callout.html) — for messages inside the page flow.
- [Toast](aegov-toast.html) — for transient confirmations.
- [Header](aegov-header.html) — which coexists with a top-anchored banner.
- [Button](aegov-button.html) and [Link](aegov-link.html) — for the `actions` slot.
