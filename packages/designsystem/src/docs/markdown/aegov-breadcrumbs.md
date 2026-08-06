# Breadcrumbs

<p class="text-lg text-aeblack-500 mb-8">Breadcrumbs show where the current page sits in the site hierarchy and give the user a one-click route back up it. They matter most in government services, where people arrive deep in a site from search results and need to know what they landed in.</p>

## Introduction

`aegov-breadcrumbs` renders a `<nav>` containing an ordered list of `aegov-breadcrumbs-item` children. The parent tells each item its position, whether it is the last one, and which separator to draw — so you only declare the trail.

```html
<aegov-breadcrumbs>
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/services">Services</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/services/identity">Identity</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Renew Emirates ID</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-breadcrumbs field-id="bc-intro">
    <aegov-breadcrumbs-item href="#">Home</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="#">Services</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="#">Identity</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>Renew Emirates ID</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>

**Leave `href` off the last item.** It represents the current page, so it renders as text rather than a link, and the component marks it `aria-current="page"`.

---

## Separator

```html
<aegov-breadcrumbs separator="slash">…</aegov-breadcrumbs>
<aegov-breadcrumbs separator="chevron">…</aegov-breadcrumbs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <aegov-breadcrumbs field-id="bc-sep-1" separator="slash">
      <aegov-breadcrumbs-item href="#">Home</aegov-breadcrumbs-item>
      <aegov-breadcrumbs-item href="#">Services</aegov-breadcrumbs-item>
      <aegov-breadcrumbs-item>Renew Emirates ID</aegov-breadcrumbs-item>
    </aegov-breadcrumbs>
    <aegov-breadcrumbs field-id="bc-sep-2" separator="chevron">
      <aegov-breadcrumbs-item href="#">Home</aegov-breadcrumbs-item>
      <aegov-breadcrumbs-item href="#">Services</aegov-breadcrumbs-item>
      <aegov-breadcrumbs-item>Renew Emirates ID</aegov-breadcrumbs-item>
    </aegov-breadcrumbs>
  </div>
</div>

Both separators are marked `aria-hidden="true"`, so a screen reader reads the trail as a list rather than "Home slash Services slash".

---

## Truncating long labels

`maxLength` truncates each item's text, which keeps a deep trail on one line. It cascades from the parent to every item.

```html
<aegov-breadcrumbs max-length="18">
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/services">Government services</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/services/identity">Identity and citizenship</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Renew your Emirates ID card</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <p class="text-sm text-aeblack-500">Untruncated</p>
    <aegov-breadcrumbs field-id="bc-tr-1">
      <aegov-breadcrumbs-item href="#">Home</aegov-breadcrumbs-item>
      <aegov-breadcrumbs-item href="#">Government services</aegov-breadcrumbs-item>
      <aegov-breadcrumbs-item href="#">Identity and citizenship</aegov-breadcrumbs-item>
      <aegov-breadcrumbs-item>Renew your Emirates ID card</aegov-breadcrumbs-item>
    </aegov-breadcrumbs>
    <p class="text-sm text-aeblack-500 pt-2">max-length="18"</p>
    <aegov-breadcrumbs field-id="bc-tr-2" max-length="18">
      <aegov-breadcrumbs-item href="#">Home</aegov-breadcrumbs-item>
      <aegov-breadcrumbs-item href="#">Government services</aegov-breadcrumbs-item>
      <aegov-breadcrumbs-item href="#">Identity and citizenship</aegov-breadcrumbs-item>
      <aegov-breadcrumbs-item>Renew your Emirates ID card</aegov-breadcrumbs-item>
    </aegov-breadcrumbs>
  </div>
</div>

Use it sparingly. A truncated label the user cannot read defeats the purpose of the trail — prefer shorter page titles, or drop a middle level, over aggressive truncation.

---

## Structured data

`isMicrodata` adds schema.org `BreadcrumbList` microdata to the markup, which lets search engines show the trail in results. It cascades to every item, and the parent supplies each item's `position`.

```html
<aegov-breadcrumbs is-microdata>
  <aegov-breadcrumbs-item href="https://example.gov.ae/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="https://example.gov.ae/services">Services</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Renew Emirates ID</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-breadcrumbs field-id="bc-micro" is-microdata>
    <aegov-breadcrumbs-item href="#">Home</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="#">Services</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>Renew Emirates ID</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>

Use absolute URLs when you enable it — search engines need resolvable addresses, and a relative `href` in microdata is often ignored.

---

## Intercepting navigation

Each item emits `aegovBreadcrumbItemClick`, and the event bubbles, so one listener on the parent covers the trail. This is the hook for a client-side router.

```html
<aegov-breadcrumbs id="trail">…</aegov-breadcrumbs>

<script type="module">
  document.querySelector('#trail').addEventListener('aegovBreadcrumbItemClick', (e) => {
    const { href, event } = e.detail;
    if (!href) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;   // let the browser handle it

    event.preventDefault();
    router.navigate(href);
  });
</script>
```

Checking modifier keys matters — swallowing every click is what breaks "open in new tab".

---

## Composite example — deep service page

```html
<aegov-breadcrumbs separator="chevron" is-microdata>
  <aegov-breadcrumbs-item href="https://u.ae/">u.ae</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/services">Services</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/services/identity">Identity</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/services/identity/emirates-id">Emirates ID</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Renew</aegov-breadcrumbs-item>
</aegov-breadcrumbs>

<h1 class="mt-4">Renew your Emirates ID</h1>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-breadcrumbs field-id="bc-cx" separator="chevron" is-microdata>
    <aegov-breadcrumbs-item href="#">u.ae</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="#">Services</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="#">Identity</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="#">Emirates ID</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>Renew</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
  <p class="text-h4 font-bold mt-4">Renew your Emirates ID</p>
</div>

Breadcrumbs sit above the page's `<h1>` and are not a substitute for it. The trail says where you are in the hierarchy; the heading says what this page is.

---

## RTL Support

The trail is direction-aware. In a `dir="rtl"` container the items run right to left and the separators mirror — the chevron points left, matching the reading direction, with no configuration needed. The `<nav>`'s own accessible label is translated automatically ("مسار التنقل").

```html
<div dir="rtl">
  <aegov-breadcrumbs separator="chevron">
    <aegov-breadcrumbs-item href="#">الرئيسية</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="#">الخدمات</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="#">الهوية</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>تجديد الهوية الإماراتية</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <aegov-breadcrumbs field-id="bc-rtl-1" separator="chevron">
      <aegov-breadcrumbs-item href="#">الرئيسية</aegov-breadcrumbs-item>
      <aegov-breadcrumbs-item href="#">الخدمات</aegov-breadcrumbs-item>
      <aegov-breadcrumbs-item href="#">الهوية</aegov-breadcrumbs-item>
      <aegov-breadcrumbs-item>تجديد الهوية الإماراتية</aegov-breadcrumbs-item>
    </aegov-breadcrumbs>
    <aegov-breadcrumbs field-id="bc-rtl-2" separator="slash">
      <aegov-breadcrumbs-item href="#">الرئيسية</aegov-breadcrumbs-item>
      <aegov-breadcrumbs-item href="#">الخدمات</aegov-breadcrumbs-item>
      <aegov-breadcrumbs-item>حجز موعد</aegov-breadcrumbs-item>
    </aegov-breadcrumbs>
  </div>
</div>

---

## API Reference

### aegov-breadcrumbs Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the `<nav>`. Auto-generated when omitted, reflected. | `string` | _generated_ |
| `separator` | `separator` | Separator drawn between items. Cascades to children. | `'slash' \| 'chevron'` | `'slash'` |
| `maxLength` | `max-length` | Truncate each item's text to this many characters. Cascades to children. | `number` | — |
| `isMicrodata` | `is-microdata` | Add schema.org `BreadcrumbList` microdata. Cascades to children. | `boolean` | `false` |

### aegov-breadcrumbs-item Properties

The parent sets `isLast`, `position`, `separator`, `maxLength` and `isMicrodata` automatically. You normally set only `href`.

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `href` | `href` | Destination. **Omit on the last item** so it renders as the current page. | `string` | — |
| `target` | `target` | Native target. | `'_self' \| '_blank' \| '_parent' \| '_top'` | `'_self'` |
| `isLast` | `is-last` | Marks the current page. Set by the parent. | `boolean` | `false` |
| `position` | `position` | Microdata position. Set by the parent. | `number` | `1` |
| `separator`, `maxLength`, `isMicrodata` | — | Cascaded from the parent. | — | — |

### Slots

| Slot | On | Description |
| --- | --- | --- |
| _(default)_ | parent | The `aegov-breadcrumbs-item` children. |
| _(default)_ | item | The item's label text. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovBreadcrumbItemClick` | `{ href?: string; event: MouseEvent }` | An item was clicked. Bubbles, so listen on the parent. |

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the `<nav>`. Note the component sets its own `aria-label`. |
| `data-*` | Yes | Forwarded to the `<nav>`. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host element. |

---

## Accessibility

### Built-in behaviour

- The trail is a real `<nav>` with a translated `aria-label`, so it appears as a named landmark in a screen reader's list of regions.
- Items are a list, so assistive technology announces the trail's length and position.
- **Separators are marked `aria-hidden="true"`**, so the trail reads as items rather than punctuation.
- The last item is marked `aria-current="page"` and rendered as text rather than a link — a link to the page you are already on is a dead end.
- The chevron separator mirrors under `dir="rtl"` through logical styling.
- Microdata, when enabled, is applied without adding anything to the accessibility tree.

### Developer responsibilities

- **Omit `href` on the last item.** With one, the current page becomes a self-link and loses `aria-current`.
- **Keep the trail short.** Four or five levels is the practical maximum; beyond that the trail wraps and stops helping.
- **Match the trail to the real hierarchy**, not to the user's click path. Breadcrumbs are structural, not historical — for "back", the browser already has a button.
- **Use short labels.** Prefer editing the label over `max-length`, which can truncate to the point of uselessness.
- **Use absolute URLs with `is-microdata`.**
- **Do not put breadcrumbs inside the `<h1>`** or use them as the page title.
- **Respect modifier keys** when intercepting clicks for a router.
- **Do not rely on breadcrumbs as the only navigation.** They complement a [Navbar](aegov-navbar.html); they do not replace it.

### Keyboard support

| Key | Action |
| --- | --- |
| `Tab` | Move focus to the next link in the trail. |
| `Shift` + `Tab` | Move focus to the previous link. |
| `Enter` | Follow the focused link. |

The current-page item is not focusable, because it is not a link.

---

## Where to next

- [Navbar](aegov-navbar.html) — primary horizontal navigation.
- [Navblock](aegov-navblock.html) — sidebar navigation.
- [Link](aegov-link.html) — the underlying anchor behaviour.
- [Header](aegov-header.html) — where breadcrumbs usually sit just below.
