# Breadcrumbs

<p class="text-lg text-aeblack-500 mb-8">Breadcrumbs provide a navigational trail that helps users understand their location within a website's hierarchy and navigate back to higher-level pages.</p>

## Introduction

The `aegov-breadcrumbs` component is a parent-child pair. The `<aegov-breadcrumbs>` wrapper manages layout, separator style, and text truncation, while each `<aegov-breadcrumbs-item>` represents a single step in the trail. Items with an `href` render as links; the last item (or any item without `href`) renders as plain text representing the current page.

The component outputs semantic HTML (`<nav>` wrapping an `<ol>`) and includes full ARIA support, RTL layout handling, and optional Schema.org microdata.

```html
<aegov-breadcrumbs>
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/products">Products</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Current Page</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-breadcrumbs>
    <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/products">Products</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>Current Page</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>

---

## Separator Styles

The `separator` property on the parent component controls the visual divider between breadcrumb items. Two styles are available.

### Slash (default)

A forward-slash character is rendered between each item. This is the default separator.

```html
<aegov-breadcrumbs separator="slash">
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/services">Services</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Digital Services</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-breadcrumbs separator="slash">
    <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services">Services</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>Digital Services</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>

### Chevron

An SVG chevron icon is rendered between each item. This style provides a stronger directional cue.

```html
<aegov-breadcrumbs separator="chevron">
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/services">Services</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Digital Services</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-breadcrumbs separator="chevron">
    <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services">Services</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>Digital Services</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>

---

## Text Truncation

Set the `max-length` property on the parent to truncate long breadcrumb text with an ellipsis. This is useful when breadcrumb labels may be long page titles.

```html
<aegov-breadcrumbs max-length="15">
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/services">Government Services Portal</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Telecommunication and Digital Regulatory Authority</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-breadcrumbs max-length="15">
    <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services">Government Services Portal</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>Telecommunication and Digital Regulatory Authority</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>

Without truncation for comparison:

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-breadcrumbs>
    <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services">Government Services Portal</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>Telecommunication and Digital Regulatory Authority</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>

---

## Link Targets

Each breadcrumb item supports a `target` attribute for controlling where the linked page opens. This works the same as the native HTML anchor `target` attribute.

```html
<aegov-breadcrumbs>
  <aegov-breadcrumbs-item href="/" target="_blank">Home (new tab)</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/about">About</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Contact</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-breadcrumbs>
    <aegov-breadcrumbs-item href="/" target="_blank">Home (new tab)</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/about">About</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>Contact</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>

---

## Current Page

The last item in the breadcrumb trail is automatically marked as the current page. It renders as a `<span>` with `aria-current="page"` and bold text instead of a link. You can also omit the `href` on any item to render it as plain text.

```html
<aegov-breadcrumbs separator="chevron">
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/docs">Documentation</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/docs/components">Components</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Breadcrumbs</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-breadcrumbs separator="chevron">
    <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/docs">Documentation</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/docs/components">Components</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>Breadcrumbs</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>

---

## Deep Navigation

Breadcrumbs are well-suited for deep page hierarchies. The component handles any number of items.

```html
<aegov-breadcrumbs separator="chevron">
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/government">Government</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/government/ministries">Ministries</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/government/ministries/digital">Digital Affairs</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/government/ministries/digital/services">Services</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Service Details</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-breadcrumbs separator="chevron">
    <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/government">Government</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/government/ministries">Ministries</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/government/ministries/digital">Digital Affairs</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/government/ministries/digital/services">Services</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>Service Details</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>

---

## Schema.org Microdata

Set the `is-microdata` attribute on the parent to add [Schema.org BreadcrumbList](https://schema.org/BreadcrumbList) structured data. This helps search engines understand your page hierarchy and can improve how your pages appear in search results.

```html
<aegov-breadcrumbs is-microdata>
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/services">Services</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Current Page</aegov-breadcrumbs-item>
</aegov-breadcrumbs>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-breadcrumbs is-microdata>
    <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services">Services</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>Current Page</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>

When enabled, the component adds `itemscope`, `itemtype`, and `itemprop` attributes to produce valid BreadcrumbList markup. Each item receives its `position` automatically.

---

## RTL Support

The component fully supports right-to-left layouts. When a parent element has `dir="rtl"`, the chevron separator automatically flips direction and the layout mirrors.

```html
<div dir="rtl">
  <aegov-breadcrumbs separator="chevron">
    <aegov-breadcrumbs-item href="/">الرئيسية</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services">الخدمات</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>الخدمات الرقمية</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-breadcrumbs separator="chevron">
    <aegov-breadcrumbs-item href="/">الرئيسية</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services">الخدمات</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>الخدمات الرقمية</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>

Slash separator in RTL:

<div dir="rtl" class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-breadcrumbs separator="slash">
    <aegov-breadcrumbs-item href="/">الرئيسية</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item href="/services">الخدمات</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>الخدمات الرقمية</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>

No additional configuration is needed — the component reads the inherited `dir` attribute and adjusts automatically.

---

## Listening to Events

Each breadcrumb item emits an `aegovBreadcrumbItemClick` event when clicked. The event detail includes the `href` and the original `MouseEvent`. You can use `event.preventDefault()` on the custom event to stop default navigation and implement custom routing.

```html
<aegov-breadcrumbs id="nav-breadcrumbs" separator="chevron">
  <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item href="/products">Products</aegov-breadcrumbs-item>
  <aegov-breadcrumbs-item>Details</aegov-breadcrumbs-item>
</aegov-breadcrumbs>

<script>
  document.getElementById('nav-breadcrumbs')
    .addEventListener('aegovBreadcrumbItemClick', (e) => {
      console.log('Breadcrumb clicked:', e.detail.href);
      // Call e.preventDefault() to stop navigation
    });
</script>
```

---

## API Reference

### `aegov-breadcrumbs` Properties

| Property    | Attribute    | Description                                                        | Type                       | Default   |
|-------------|--------------|--------------------------------------------------------------------|----------------------------|-----------|
| `separator` | `separator`  | The separator style between items                                  | `'slash'` \| `'chevron'`   | `'slash'` |
| `maxLength` | `max-length` | Maximum characters before truncating item text                     | `number`                   | —         |
| `is-microdata` | `is-microdata`  | Adds Schema.org BreadcrumbList structured data                     | `boolean`                  | `false`   |

### `aegov-breadcrumbs-item` Properties

| Property    | Attribute  | Description                                                            | Type                                               | Default   |
|-------------|------------|------------------------------------------------------------------------|------------------------------------------------------|-----------|
| `href`      | `href`     | The URL the item links to. If omitted, renders as plain text.          | `string`                                             | —         |
| `target`    | `target`   | Where to open the linked document                                      | `'_self'` \| `'_blank'` \| `'_parent'` \| `'_top'`  | `'_self'` |

> **Note:** The `isLast`, `separator`, `maxLength`, `is-microdata`, and `position` properties on `aegov-breadcrumbs-item` are managed internally by the parent component. Do not set them manually.

### Events

| Event                       | Description                               | Detail Type                                |
|-----------------------------|-------------------------------------------|--------------------------------------------|
| `aegovBreadcrumbItemClick`  | Emitted when a breadcrumb item is clicked | `{ href?: string; event: MouseEvent }`     |

### Slots

**`aegov-breadcrumbs`**

| Slot      | Description                                                      |
|-----------|------------------------------------------------------------------|
| (default) | One or more `<aegov-breadcrumbs-item>` elements.                |

**`aegov-breadcrumbs-item`**

| Slot      | Description                                                      |
|-----------|------------------------------------------------------------------|
| (default) | The text label or HTML content for the breadcrumb item.         |

---

## Accessibility

The `aegov-breadcrumbs` component follows the [WAI-ARIA Breadcrumb pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/) and is built with accessibility as a first-class concern.

### Built-in Features

- **`<nav>` landmark** — the breadcrumb trail is wrapped in a `<nav>` element with `aria-label="Breadcrumb"`, making it discoverable by screen readers as a navigation landmark.
- **Ordered list** — items are rendered inside an `<ol>` (ordered list), conveying the sequential nature of the trail to assistive technologies.
- **`aria-current="page"`** — automatically set on the last item when it has no `href`, informing screen readers that it represents the current page.
- **Decorative separators** — separator icons and characters are marked `aria-hidden="true"` so they are not announced by screen readers.
- **Keyboard navigation** — link items are native `<a>` elements, so they are keyboard-focusable and support Enter to activate.

### Developer Responsibilities

1. **Provide meaningful labels.** Each breadcrumb item should have clear, concise text that describes the linked page.

2. **Place breadcrumbs consistently.** Breadcrumbs should appear near the top of the page content, in the same position on every page, so users know where to find them.

3. **Do not use breadcrumbs as the only navigation.** Breadcrumbs are a secondary navigation aid. Always provide a primary navigation mechanism such as a sidebar or top menu.

---

## Notes

- The `aegov-breadcrumbs-item` component **must** be used inside `<aegov-breadcrumbs>`. Using it standalone will throw an error.
- The parent component sets `separator`, `maxLength`, `is-microdata`, `position`, and `isLast` on all child items automatically during lifecycle hooks. You do not need to set these props on individual items.
- Text truncation via `max-length` applies a Unicode ellipsis character at the cut point. It only affects text content — if the item contains HTML children (such as SVG icons), truncation is skipped and content is rendered via the slot.
- The last separator is never rendered, regardless of separator style.
- In RTL mode, the chevron separator is flipped horizontally using `transform: scaleX(-1)`. The slash separator is directionally neutral and does not change.
- Link items inherit styling from the design system's link colour palette (primary-600, hover: primary-500, visited: primary-700).
- The current page item is rendered with `font-semibold` and `aeblack-800` colour for visual distinction from the linked items.
