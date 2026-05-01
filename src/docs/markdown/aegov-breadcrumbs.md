# aegov-breadcrumbs

Hierarchical navigation component that shows the user's location within the site structure. Renders a semantic `<nav>` landmark wrapping an ordered list of `<aegov-breadcrumbs-item>` children. The parent component cascades separator style, truncation length, and microdata flags down to its items.

## Properties

### fieldId

Unique ID for the `<nav>` element. Auto-generated as `aegov-breadcrumbs-{n}` if not provided. Reflected to the host attribute.

```html
<aegov-breadcrumbs field-id="primary-breadcrumbs">
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

### separator

Visual separator placed between items. One of `slash` (default) or `chevron`.

```html
<aegov-breadcrumbs separator="chevron">
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/products">Products</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Details</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

### maxLength

Maximum number of characters before each item's text is truncated with an ellipsis. Useful for long category names.

```html
<aegov-breadcrumbs max-length="12">
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>An Extremely Long Category Name</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

### isMicrodata

When `true`, adds schema.org `BreadcrumbList` / `ListItem` microdata for SEO and rich results.

```html
<aegov-breadcrumbs is-microdata="true">
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/blog">Blog</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Article</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

## Examples

### Basic trail

```html
<aegov-breadcrumbs>
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/services">Services</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Visa Renewal</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

### With chevron separator

```html
<aegov-breadcrumbs separator="chevron">
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/news">News</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>2026 Annual Report</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

### With icon inside an item

The item slot accepts inline elements like SVG icons. When element children are present, the truncation logic is skipped and the slot is rendered as-is.

```html
<aegov-breadcrumbs>
  <aegov-breadcrumbs-item href="/">
    <svg viewBox="0 0 24 24" width="16" height="16"><path d="M3 12l9-9 9 9"/></svg>
    Home
  </aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Page</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

## RTL Behavior

The component is built on Tailwind logical properties and inherits direction from the document or nearest `[dir]` ancestor. In RTL mode the trail visually flows right-to-left and the chevron separator naturally mirrors with the layout. No additional configuration is required.

```html
<div dir="rtl">
  <aegov-breadcrumbs separator="chevron">
    <aegov-breadcrumbs-item href="/">الرئيسية</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services">الخدمات</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>تجديد التأشيرة</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>
```

## Sub-component: aegov-breadcrumbs-item

`aegov-breadcrumbs-item` represents a single segment in the breadcrumb trail. It must be used as a direct child of `<aegov-breadcrumbs>` — using it standalone throws a runtime error.

| Property | Attribute | Description | Type | Default |
|---|---|---|---|---|
| `href` | `href` | URL to link to. Omit on the last (current) item. | `string` | `undefined` |
| `target` | `target` | Anchor target. | `'_blank' \| '_self' \| '_parent' \| '_top'` | `'_self'` |
| `isLast` | `is-last` | Set automatically by the parent. Suppresses the trailing separator and applies `aria-current="page"` to a non-link item. | `boolean` | `false` |
| `maxLength` | `max-length` | Set automatically by the parent. | `number` | `undefined` |
| `separator` | `separator` | Set automatically by the parent. | `'slash' \| 'chevron'` | `'slash'` |
| `isMicrodata` | `is-microdata` | Set automatically by the parent. | `boolean` | `false` |
| `position` | `position` | 1-indexed position in the list, used for microdata. Set automatically by the parent. | `number` | `1` |

**Pass-through attributes:** `aria-*`, `data-*`, `title`, `hreflang`, `rel`, `referrerpolicy`.

**Event:** `aegovBreadcrumbItemClick` — emitted when a linked item is clicked. Detail: `{ href?: string; event: MouseEvent }`. Allow default navigation unless you `preventDefault()` on the event.

```html
<aegov-breadcrumbs-item href="/services" rel="noopener">Services</aegov-breadcrumbs-item>
```

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
|---|---|---|---|---|
| `fieldId` | `field-id` | Unique ID for the nav (auto-generated). | `string` | `aegov-breadcrumbs-{n}` |
| `separator` | `separator` | Separator style cascaded to each item. | `'slash' \| 'chevron'` | `'slash'` |
| `maxLength` | `max-length` | Max characters per item before truncation. | `number` | `undefined` |
| `isMicrodata` | `is-microdata` | Adds schema.org microdata to the list and items. | `boolean` | `false` |

### Pass-through Attributes

All `aria-*` and `data-*` attributes set on the host are forwarded to the inner `<nav>` element.

### Events

The parent component emits no events. Listen for `aegovBreadcrumbItemClick` on individual items.

### Event listening example

```html
<aegov-breadcrumbs id="bc">
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/about">About</aegov-breadcrumbs-item>
</aegov-breadcrumbs>

<script>
  document.getElementById('bc').addEventListener('aegovBreadcrumbItemClick', (e) => {
    console.log('Clicked', e.detail.href);
  });
</script>
```

### Slots

| Slot | Description |
|---|---|
| (default) | Place `<aegov-breadcrumbs-item>` children here. |

## Accessibility

### Built-in

- Renders as a `<nav>` landmark with `aria-label="Breadcrumb"`.
- Wraps items in an ordered list (`<ol>`) so the trail order is meaningful to assistive tech.
- The last item is marked with `aria-current="page"` (when not a link).
- Separators are decorative — marked `aria-hidden="true"` so screen readers don't announce them.

### Developer responsibilities

- Omit `href` on the last (current) item so it renders as plain text.
- Keep labels short or set `max-length` so the trail does not wrap or push content.
- For SEO/rich results, prefer `is-microdata` over hand-rolled microdata.
- Do not nest interactive elements other than the link inside an item.

### Notes

- Items can contain inline element children (icons, badges) — they will render via the slot without truncation.
- Setting `target="_blank"` should also include `rel="noopener"` for security.
