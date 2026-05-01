# aegov-navbar

Horizontal primary navigation container. Holds `aegov-navbar-item` children which render as plain links, links with prefix icons, or links paired with an `aegov-dropdown` submenu (chevron-triggered). The navbar fully owns keyboard navigation across its items (Arrow keys, Home, End) and cascades its resolved size to children.

## Properties

### size

Size token applied to all navbar items. Accepts a Tailwind-style responsive string (e.g. `"sm md:base lg:lg"`). Tokens: `sm`, `base` (default), `lg`.

```html
<aegov-navbar size="base">
  <aegov-navbar-item href="/">Home</aegov-navbar-item>
</aegov-navbar>

<aegov-navbar size="sm md:base lg:lg">
  <aegov-navbar-item href="/">Home</aegov-navbar-item>
</aegov-navbar>
```

### gap

Tailwind gap utility applied between items. Defaults to `gap-3`. Use any valid `gap-*` class.

```html
<aegov-navbar gap="gap-8">
  <aegov-navbar-item href="/">Home</aegov-navbar-item>
  <aegov-navbar-item href="/about">About</aegov-navbar-item>
</aegov-navbar>
```

### labelNav

Accessible label for the `<nav>` landmark. Defaults to `"Main navigation"`.

```html
<aegov-navbar label-nav="Site navigation">
  <aegov-navbar-item href="/">Home</aegov-navbar-item>
</aegov-navbar>
```

## Sizes

| Size | Use case |
|---|---|
| `sm` | Compact site shell or secondary navigation. |
| `base` | Default size for primary navigation. |
| `lg` | Marketing pages or wide layouts. |

```html
<aegov-navbar size="sm">…</aegov-navbar>
<aegov-navbar size="base">…</aegov-navbar>
<aegov-navbar size="lg">…</aegov-navbar>

<!-- Responsive -->
<aegov-navbar size="sm md:base lg:lg">…</aegov-navbar>
```

## Examples

### Plain links

```html
<aegov-navbar label-nav="Main navigation">
  <aegov-navbar-item href="/" is-active="true">Home</aegov-navbar-item>
  <aegov-navbar-item href="/services">Services</aegov-navbar-item>
  <aegov-navbar-item href="/news">News</aegov-navbar-item>
  <aegov-navbar-item href="/contact">Contact</aegov-navbar-item>
</aegov-navbar>
```

### With prefix icons

```html
<aegov-navbar gap="gap-6">
  <aegov-navbar-item href="/">
    <svg slot="icon-start" viewBox="0 0 24 24" width="16" height="16"><path d="M3 12l9-9 9 9"/></svg>
    Home
  </aegov-navbar-item>
  <aegov-navbar-item href="/news">
    <svg slot="icon-start" viewBox="0 0 24 24" width="16" height="16"><rect x="3" y="4" width="18" height="16" rx="2"/></svg>
    News
  </aegov-navbar-item>
</aegov-navbar>
```

### With submenu (dropdown)

```html
<aegov-navbar>
  <aegov-navbar-item href="/">Home</aegov-navbar-item>
  <aegov-navbar-item href="/products">
    Products
    <aegov-dropdown slot="dropdown" trigger="hover">
      <a slot="dropdown-content" href="/products/visas">Visas</a>
      <a slot="dropdown-content" href="/products/permits">Permits</a>
    </aegov-dropdown>
  </aegov-navbar-item>
</aegov-navbar>
```

When an `aegov-dropdown` is placed in the `dropdown` slot, the navbar item injects a chevron toggle button and routes the entire item-rect as the dropdown's trigger.

## RTL Behavior

The navbar reads `dir="rtl"` from the closest `[dir]` ancestor or the document root. In RTL, ArrowLeft / ArrowRight reverse direction (Right moves *backwards* in the visual order, matching user expectation in right-to-left UIs). Layout, gaps, and chevrons are mirrored automatically through Tailwind logical properties.

```html
<div dir="rtl">
  <aegov-navbar label-nav="التنقل الرئيسي">
    <aegov-navbar-item href="/" is-active="true">الرئيسية</aegov-navbar-item>
    <aegov-navbar-item href="/services">الخدمات</aegov-navbar-item>
    <aegov-navbar-item href="/contact">اتصل بنا</aegov-navbar-item>
  </aegov-navbar>
</div>
```

## Sub-component: aegov-navbar-item

A single navigation entry. Renders as `<a>` when `href` is set, as `<span>` when not (or when disabled). Optional prefix icon via `slot="icon-start"`. Optional submenu via `slot="dropdown"`.

| Property | Attribute | Description | Type | Default |
|---|---|---|---|---|
| `href` | `href` | Link URL. Omit to render a non-link span. | `string` | `undefined` |
| `target` | `target` | Anchor target. | `'_blank' \| '_self' \| '_parent' \| '_top'` | `undefined` |
| `rel` | `rel` | Anchor rel. | `string` | `undefined` |
| `isActive` | `is-active` | Marks the current page; sets `aria-current="page"`. | `boolean` | `false` |
| `isDisabled` | `is-disabled` | Visually disabled, removed from arrow-key cycle. | `boolean` | `false` |
| `size` | `size` | Size token. Cascaded by parent navbar. | `'sm' \| 'base' \| 'lg'` | `'base'` |

**Pass-through attributes:** `aria-*`, `data-*` are forwarded to the host `<li>`. The native anchor attributes `rel`, `referrerpolicy`, `target` are forwarded to the inner link element.

**Slots:**
- (default) — Item label.
- `icon-start` — Optional leading icon.
- `dropdown` — Optional `aegov-dropdown` submenu.

```html
<aegov-navbar-item href="/services" is-active="true">Services</aegov-navbar-item>

<aegov-navbar-item is-disabled="true">Coming soon</aegov-navbar-item>

<aegov-navbar-item href="/products">
  <svg slot="icon-start" viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="12" r="9"/></svg>
  Products
</aegov-navbar-item>
```

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
|---|---|---|---|---|
| `size` | `size` | Size token cascaded to all items (responsive). | `'sm' \| 'base' \| 'lg'` | `'base'` |
| `gap` | `gap` | Tailwind gap utility. | `string` | `'gap-3'` |
| `labelNav` | `label-nav` | Accessible label for the nav landmark. | `string` | `'Main navigation'` |

### Pass-through Attributes

The navbar itself does not pass attributes through; place them directly on the host. `aegov-navbar-item` forwards `aria-*` and `data-*` set on its host to its inner `<li>`.

### Events

This component emits no custom events. Listen for native events on the inner anchors as needed.

### Event listening example

```html
<aegov-navbar id="nav">
  <aegov-navbar-item href="/about">About</aegov-navbar-item>
</aegov-navbar>

<script>
  document.querySelectorAll('#nav aegov-navbar-item a').forEach((a) => {
    a.addEventListener('click', (e) => {
      console.log('Navigated to', a.href);
    });
  });
</script>
```

### Slots

| Slot | Description |
|---|---|
| (default) | Place `aegov-navbar-item` elements as direct children. |

### Keyboard

| Key | Behavior |
|---|---|
| `ArrowRight` | Move focus to the next item (or chevron). RTL: reversed. |
| `ArrowLeft` | Move focus to the previous item. RTL: reversed. |
| `Home` | Move focus to the first focusable item. |
| `End` | Move focus to the last focusable item. |

## Accessibility

### Built-in

- Renders as a `<nav>` with a configurable `aria-label` and an inner `<ul>` of `<li>` items.
- Roving focus among items via Arrow / Home / End keys.
- Active items are marked with `aria-current="page"`.
- Disabled items receive `aria-disabled="true"` and are skipped in keyboard navigation.

### Developer responsibilities

- Mark exactly one item as `is-active` per route.
- Provide a meaningful `labelNav` when you have more than one nav landmark on a page.
- Keep item labels short — long labels can break the horizontal layout.
- For dropdowns, follow the `aegov-dropdown` accessibility guidance (focus management is handled by the dropdown itself).

### Notes

- The size prop must be one of the allowed tokens; unknown values fall back to `base`.
- When an item has both a dropdown and an `href`, clicking the link navigates and the chevron toggles the menu — both behaviors coexist by design.
