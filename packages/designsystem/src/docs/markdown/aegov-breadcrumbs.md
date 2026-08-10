# Breadcrumbs

<p class="text-lg text-aeblack-500 mb-8">Breadcrumbs are a hierarchical navigation aid that shows the user's current location within the site and offers a quick way back to any ancestor page. They are particularly useful in deep service journeys — a passport renewal nested under <em>Identity Services</em>, for example — where the user needs to understand context without losing their place.</p>

## Introduction

The `aegov-breadcrumbs` component composes a parent `<nav>` landmark wrapping an ordered list of `aegov-breadcrumbs-item` children. The parent owns shared configuration — separator style, truncation length, and schema.org microdata — and propagates it to every item automatically. Each item renders as a link except for the last (current) page, which is rendered as plain text and marked with `aria-current="page"`.

```html
<aegov-breadcrumbs>
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/services">Services</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/services/identity">Identity</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Passport renewal</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-breadcrumbs>
    <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services">Services</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services/identity">Identity</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>Passport renewal</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>

---

## Separator Style

The `separator` property controls the character drawn between items. `slash` (default) uses a typographic forward slash; `chevron` swaps it for a directional chevron icon that mirrors automatically in RTL.

### Slash (default)

```html
<aegov-breadcrumbs separator="slash">
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/services">Services</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Visa status</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-breadcrumbs separator="slash">
    <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services">Services</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>Visa status</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>

### Chevron

```html
<aegov-breadcrumbs separator="chevron">
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/news">News</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>2026 Annual Report</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-breadcrumbs separator="chevron">
    <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/news">News</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>2026 Annual Report</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>

---

## Current Page Indication

Omit the `href` attribute on the last item. The component renders it as plain text and adds `aria-current="page"` so screen readers announce it as the current location. Linked items are real `<a>` elements and behave like ordinary anchors — including middle-click, right-click, and `Ctrl/Cmd + click` to open in a new tab.

```html
<aegov-breadcrumbs>
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/services/business">Business services</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/services/business/licensing">Licensing</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Renew trade licence</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-breadcrumbs>
    <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services/business">Business services</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services/business/licensing">Licensing</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>Renew trade licence</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>

---

## Truncation

Long category names can push a trail onto a second line on narrow viewports. Set `max-length` on the parent to truncate every item's text to a fixed character count with an ellipsis. Items containing element children (icons, badges) are not truncated — only plain text segments are clipped.

```html
<aegov-breadcrumbs max-length="14">
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/services">Government Services Directory</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/services/health">Public Health Authority</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Vaccination Appointment Booking</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-breadcrumbs max-length="14">
    <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services">Government Services Directory</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services/health">Public Health Authority</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>Vaccination Appointment Booking</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>

---

## Item with an Icon

When an item contains element children (such as an inline SVG, a badge, or a flag), the component skips text truncation and renders the slot as-is. This is useful for highlighting the home root with a small house icon, or marking a step with a status indicator.

```html
<aegov-breadcrumbs separator="chevron">
  <aegov-breadcrumbs-item href="/">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-inline-end:6px"><path d="M3 12l9-9 9 9"/><path d="M5 10v10h14V10"/></svg>
    Home
  </aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/services/identity">Identity Services</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Emirates ID renewal</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-breadcrumbs separator="chevron">
    <aegov-breadcrumbs-item href="/">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-inline-end:6px"><path d="M3 12l9-9 9 9"/><path d="M5 10v10h14V10"/></svg>
      Home
    </aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services/identity">Identity Services</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>Emirates ID renewal</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>

---

## Schema.org Microdata

Set `is-microdata="true"` to add `BreadcrumbList` / `ListItem` microdata to the underlying `<ol>` and each `<li>`. Search engines use this to render breadcrumb-style result snippets and rich results. The visual output is unchanged — only the markup gains `itemscope`, `itemtype`, `itemprop`, and a `<meta itemprop="position">` per item.

```html
<aegov-breadcrumbs is-microdata="true">
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/news">News</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/news/2026">2026</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>National AI Strategy update</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-breadcrumbs is-microdata="true">
    <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/news">News</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/news/2026">2026</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>National AI Strategy update</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>

---

## Link Targets and Pass-through Attributes

Each item forwards `aria-*`, `data-*`, `title`, `hreflang`, `rel`, and `referrerpolicy` to the inner `<a>` element. Set `target="_blank"` to open the destination in a new tab — when you do, also include `rel="noopener"` for security.

```html
<aegov-breadcrumbs separator="chevron">
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item
    href="https://u.ae"
    target="_blank"
    rel="noopener"
    title="Open the UAE federal portal in a new tab"
  >
    UAE federal portal
  </aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Service catalogue</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-breadcrumbs separator="chevron">
    <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="https://u.ae" target="_blank" rel="noopener" title="Open the UAE federal portal in a new tab">UAE federal portal</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>Service catalogue</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>

---

## Listening for Item Clicks

Each item emits an `aegovBreadcrumbItemClick` event with the destination `href` and the underlying `MouseEvent`. Default navigation still happens unless the listener calls `event.preventDefault()` — useful for single-page-app routers that need to intercept link clicks.

```html
<aegov-breadcrumbs id="service-trail">
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/services">Services</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Driving licence</aegov-breadcrumbs-item>
</aegov-breadcrumbs>

<script>
  document.querySelector('#service-trail').addEventListener('aegovBreadcrumbItemClick', (e) => {
    console.log('Crumb clicked, href =', e.detail.href);
    // e.detail.event.preventDefault(); // intercept for SPA routing
  });
</script>
```

---

## RTL Support

The breadcrumbs are direction-agnostic. When the document or any ancestor has `dir="rtl"`, the trail flows right-to-left, the chevron separator mirrors automatically, and item padding and margins flip via CSS logical properties. No additional configuration is required — supply Arabic content and the layout adapts.

```html
<div dir="rtl">
  <aegov-breadcrumbs separator="chevron">
    <aegov-breadcrumbs-item href="/">الرئيسية</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services">الخدمات</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services/identity">خدمات الهوية</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>تجديد جواز السفر</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-breadcrumbs separator="chevron">
    <aegov-breadcrumbs-item href="/">الرئيسية</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services">الخدمات</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services/identity">خدمات الهوية</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>تجديد جواز السفر</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>

The same trail with the slash separator and a deeper service hierarchy:

```html
<div dir="rtl">
  <aegov-breadcrumbs>
    <aegov-breadcrumbs-item href="/">الرئيسية</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services/business">خدمات الأعمال</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services/business/licensing">الترخيص</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>تجديد الرخصة التجارية</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-breadcrumbs>
    <aegov-breadcrumbs-item href="/">الرئيسية</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services/business">خدمات الأعمال</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services/business/licensing">الترخيص</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>تجديد الرخصة التجارية</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>

---

## API Reference

### aegov-breadcrumbs Properties

| Property       | Attribute       | Description                                                                                  | Type                    | Default     |
| -------------- | --------------- | -------------------------------------------------------------------------------------------- | ----------------------- | ----------- |
| `fieldId`      | `field-id`      | DOM `id` for the inner `<nav>` element. Auto-generated as `aegov-breadcrumbs-{n}` if omitted. | `string`                | _generated_ |
| `separator`    | `separator`     | Visual separator between items.                                                              | `'slash' \| 'chevron'`  | `'slash'`   |
| `maxLength`    | `max-length`    | Maximum characters before each item's text is truncated with an ellipsis.                    | `number`                | `undefined` |
| `isMicrodata`  | `is-microdata`  | Adds schema.org `BreadcrumbList` / `ListItem` microdata to the markup.                       | `boolean`               | `false`     |

### aegov-breadcrumbs-item Properties

| Property       | Attribute       | Description                                                                                  | Type                                          | Default     |
| -------------- | --------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------- | ----------- |
| `href`         | `href`          | URL the item links to. Omit on the last (current) item to render plain text.                 | `string`                                      | `undefined` |
| `target`       | `target`        | Where to open the linked document.                                                           | `'_blank' \| '_self' \| '_parent' \| '_top'`  | `'_self'`   |
| `isLast`       | `is-last`       | _Set by the parent._ Suppresses the trailing separator on the last item.                     | `boolean`                                     | `false`     |
| `maxLength`    | `max-length`    | _Set by the parent._ Maximum characters before truncation.                                   | `number`                                      | `undefined` |
| `separator`    | `separator`     | _Set by the parent._ Separator style displayed after the item.                               | `'slash' \| 'chevron'`                        | `'slash'`   |
| `isMicrodata`  | `is-microdata`  | _Set by the parent._ Whether to emit schema.org microdata.                                   | `boolean`                                     | `false`     |
| `position`     | `position`      | _Set by the parent._ 1-indexed position used for microdata.                                  | `number`                                      | `1`         |

> Properties marked _Set by the parent_ are written automatically by `aegov-breadcrumbs`. Setting them on an item directly will be overridden on the next sync.

### Slots

| Component                  | Slot        | Description                                                              |
| -------------------------- | ----------- | ------------------------------------------------------------------------ |
| `aegov-breadcrumbs`        | _(default)_ | Place one or more `aegov-breadcrumbs-item` children here.                |
| `aegov-breadcrumbs-item`   | _(default)_ | Item label. Accepts plain text or inline elements (icons, badges).       |

### Events

| Event                        | Component                  | Detail                                          | Description                                                                                                  |
| ---------------------------- | -------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `aegovBreadcrumbItemClick`   | `aegov-breadcrumbs-item`   | `{ href?: string; event: MouseEvent }`          | Fired when a linked item is clicked. Listen for this event to intercept navigation. To prevent the browser from following the href, call `event.preventDefault()` on the original native click event (`e.detail.event.preventDefault()`), not on the custom event itself. The custom event detail contains `{ href, event }`. |

#### Listening for click events

```html
<aegov-breadcrumbs id="trail">
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/services">Services</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Tax filing</aegov-breadcrumbs-item>
</aegov-breadcrumbs>

<script>
  document.querySelector('#trail').addEventListener('aegovBreadcrumbItemClick', (e) => {
    console.log('User clicked', e.detail.href);
  });
</script>
```

### Pass-through Attributes

| Attribute group   | Forwarded to                                | Notes                                                                                                |
| ----------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `aria-*`          | `<nav>` (parent) / `<a>` or `<span>` (item) | Set on the host element you want them applied to.                                                    |
| `data-*`          | Same element as set                          | Useful for analytics hooks on individual items.                                                      |
| `title`           | `<a>` (item only)                            | Native browser tooltip on the link.                                                                  |
| `hreflang`        | `<a>` (item only)                            | Declares the language of the linked resource.                                                        |
| `rel`             | `<a>` (item only)                            | Always include `rel="noopener"` when using `target="_blank"`.                                        |
| `referrerpolicy`  | `<a>` (item only)                            | Controls the `Referer` header sent on navigation.                                                    |
| `id`              | n/a                                          | Use `field-id` on `<aegov-breadcrumbs>`. The host's `id` attribute is reflected by `field-id`.        |

> **Linked vs non-linked items:** Attributes listed as forwarded to `<a>` only apply to items that have an `href` attribute (linked items). Items without `href` — typically the last (current-page) item — render as a `<span>` instead of an `<a>`, and link-specific attributes such as `title`, `hreflang`, `rel`, and `referrerpolicy` are not forwarded to them.

---

## Accessibility

### Built-in behaviour

- The wrapper renders as a `<nav>` landmark with `aria-label="Breadcrumb"` (English) or `aria-label="مسار التنقل"` (Arabic, auto-detected via `dir="rtl"` on any ancestor). Consumers can still override with their own `aria-label` on the `<aegov-breadcrumbs>` host.
- Items are wrapped in an ordered list (`<ol>`) so screen readers announce position information ("2 of 3").
- The last item (no `href`) is marked with `aria-current="page"` so assistive technology announces it as the current location.
- Separators (slash and chevron) are `aria-hidden="true"` — screen readers skip them entirely.
- Linked items render as native `<a>` elements with full keyboard, middle-click, and context-menu support.

### Developer responsibilities

- Always omit `href` on the last item — this is what triggers `aria-current="page"` and removes the link affordance on the current page.
- Keep labels concise — long category names can wrap on narrow viewports. Use `max-length` if you cannot shorten the source text.
- When using `target="_blank"`, also set `rel="noopener"` for security and provide a visible cue (e.g. an icon or parenthetical text) so users know the link opens a new tab before they activate it.
- Do not nest interactive elements other than the link inside an item.
- `aegov-breadcrumbs-item` throws a runtime error if used outside `aegov-breadcrumbs` — always use the pair together.

### Keyboard support

| Key             | Action                                                            |
| --------------- | ----------------------------------------------------------------- |
| `Tab`           | Move focus to the next breadcrumb link.                           |
| `Shift + Tab`   | Move focus to the previous breadcrumb link.                       |
| `Enter`         | Activate the focused link (navigate to its `href`).               |
