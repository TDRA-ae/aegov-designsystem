# Navbar

<p class="text-lg text-aeblack-500 mb-8">A horizontal primary navigation for websites and web applications. Holds plain links, links with prefix icons, and links with chevron-triggered submenus.</p>

## Introduction

The `aegov-navbar` component pairs with `aegov-navbar-item` children. The parent renders a semantic `<nav><ul>...</ul></nav>` landmark and cascades the `size` token to every item. Each item can be a plain link, carry a prefix icon via the `icon-start` slot, or expose a submenu by slotting an `aegov-dropdown`. When a dropdown is present the entire item becomes the dropdown trigger (so hover and positioning resolve to the full item rect), and a chevron button is injected as a separate Tab stop. Keyboard users open the submenu via `Enter`, `Space`, or `ArrowDown` while the chevron is focused; clicking the link follows it without toggling the submenu.

Arrow keys cycle focus along the navbar (reversed in RTL), `Home` and `End` jump to the first and last item.

```html
<aegov-navbar label-nav="Main navigation">
  <aegov-navbar-item href="/" is-active>Home</aegov-navbar-item>
  <aegov-navbar-item href="/services">Services</aegov-navbar-item>
  <aegov-navbar-item href="/products">
    Products
    <aegov-dropdown slot="dropdown">
      <div slot="dropdown-content">
        <a href="/products/digital">Digital</a>
        <a href="/products/physical">Physical</a>
      </div>
    </aegov-dropdown>
  </aegov-navbar-item>
  <aegov-navbar-item href="/contact">Contact</aegov-navbar-item>
</aegov-navbar>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-navbar label-nav="Main navigation">
    <aegov-navbar-item href="#" is-active>Home</aegov-navbar-item>
    <aegov-navbar-item href="#services">Services</aegov-navbar-item>
    <aegov-navbar-item href="#products">
      Products
      <aegov-dropdown slot="dropdown">
        <div slot="dropdown-content">
          <a href="#digital">Digital</a>
          <a href="#physical">Physical</a>
        </div>
      </aegov-dropdown>
    </aegov-navbar-item>
    <aegov-navbar-item href="#contact">Contact</aegov-navbar-item>
  </aegov-navbar>
</div>

---

## Sizes

The `size` prop accepts `sm`, `base`, or `lg`. Each size scales up at the `md` breakpoint (768px and above) so the bar feels comfortable on both compact viewports and large desktops.

### Small

```html
<aegov-navbar size="sm">
  <aegov-navbar-item href="#">Home</aegov-navbar-item>
  <aegov-navbar-item href="#">Services</aegov-navbar-item>
  <aegov-navbar-item href="#">Contact</aegov-navbar-item>
</aegov-navbar>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-navbar size="sm">
    <aegov-navbar-item href="#">Home</aegov-navbar-item>
    <aegov-navbar-item href="#">Services</aegov-navbar-item>
    <aegov-navbar-item href="#">Contact</aegov-navbar-item>
  </aegov-navbar>
</div>

### Base (default)

```html
<aegov-navbar size="base">
  <aegov-navbar-item href="#">Home</aegov-navbar-item>
  <aegov-navbar-item href="#">Services</aegov-navbar-item>
  <aegov-navbar-item href="#">Contact</aegov-navbar-item>
</aegov-navbar>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-navbar size="base">
    <aegov-navbar-item href="#">Home</aegov-navbar-item>
    <aegov-navbar-item href="#">Services</aegov-navbar-item>
    <aegov-navbar-item href="#">Contact</aegov-navbar-item>
  </aegov-navbar>
</div>

### Large

```html
<aegov-navbar size="lg">
  <aegov-navbar-item href="#">Home</aegov-navbar-item>
  <aegov-navbar-item href="#">Services</aegov-navbar-item>
  <aegov-navbar-item href="#">Contact</aegov-navbar-item>
</aegov-navbar>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-navbar size="lg">
    <aegov-navbar-item href="#">Home</aegov-navbar-item>
    <aegov-navbar-item href="#">Services</aegov-navbar-item>
    <aegov-navbar-item href="#">Contact</aegov-navbar-item>
  </aegov-navbar>
</div>

---

## Prefix Icons

Pass an SVG into the `icon-start` slot to render an icon before the label. Icon dimensions follow the `size` token automatically.

```html
<aegov-navbar>
  <aegov-navbar-item href="#">
    <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12 12 3l9 9"/><path d="M5 10v10h14V10"/></svg>
    Home
  </aegov-navbar-item>
  <aegov-navbar-item href="#">
    <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/></svg>
    Services
  </aegov-navbar-item>
</aegov-navbar>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-navbar>
    <aegov-navbar-item href="#">
      <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12 12 3l9 9"/><path d="M5 10v10h14V10"/></svg>
      Home
    </aegov-navbar-item>
    <aegov-navbar-item href="#">
      <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/></svg>
      Services
    </aegov-navbar-item>
    <aegov-navbar-item href="#">
      <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
      Locations
    </aegov-navbar-item>
  </aegov-navbar>
</div>

---

## Item with Submenu

Slot an `aegov-dropdown` with `slot="dropdown"` to attach a submenu to an item. The navbar-item itself becomes the dropdown's trigger so positioning resolves to the whole item rectangle, not just the chevron. A chevron button is injected automatically and toggles the submenu via mouse click, `Enter`, `Space`, or `ArrowDown`. The link remains a separate Tab stop and clicking it follows the link without toggling the submenu.

The dropdown's `trigger` is left to the consumer — set it to `hover` to open on cursor enter, or leave it as the default `click` to require an explicit chevron press.

### Link item with hover-triggered submenu

The whole item triggers the dropdown on hover. Clicking the link follows its `href`; the chevron lets keyboard users toggle without leaving the page.

```html
<aegov-navbar>
  <aegov-navbar-item href="/">Home</aegov-navbar-item>
  <aegov-navbar-item href="/products">
    Products
    <aegov-dropdown slot="dropdown" trigger="hover">
      <div slot="dropdown-content">
        <a href="/products/digital">Digital</a>
        <a href="/products/physical">Physical</a>
        <a href="/products/services">Services</a>
      </div>
    </aegov-dropdown>
  </aegov-navbar-item>
  <aegov-navbar-item href="/about">About</aegov-navbar-item>
</aegov-navbar>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-navbar>
    <aegov-navbar-item href="#">Home</aegov-navbar-item>
    <aegov-navbar-item href="#products">
      Products
      <aegov-dropdown slot="dropdown" trigger="hover">
        <div slot="dropdown-content">
          <a href="#digital">Digital</a>
          <a href="#physical">Physical</a>
          <a href="#services">Services</a>
        </div>
      </aegov-dropdown>
    </aegov-navbar-item>
    <aegov-navbar-item href="#about">About</aegov-navbar-item>
  </aegov-navbar>
</div>

### Non-link item with click-only submenu

Omit `href` to render a non-navigating label. With the default `trigger="click"`, the submenu only opens on chevron press — useful for grouping links under a category header that has no destination of its own.

```html
<aegov-navbar>
  <aegov-navbar-item href="/">Home</aegov-navbar-item>
  <aegov-navbar-item>
    Resources
    <aegov-dropdown slot="dropdown">
      <div slot="dropdown-content">
        <a href="/resources/docs">Documentation</a>
        <a href="/resources/guides">Guides</a>
        <a href="/resources/api">API Reference</a>
      </div>
    </aegov-dropdown>
  </aegov-navbar-item>
  <aegov-navbar-item href="/about">About</aegov-navbar-item>
</aegov-navbar>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-navbar>
    <aegov-navbar-item href="#">Home</aegov-navbar-item>
    <aegov-navbar-item>
      Resources
      <aegov-dropdown slot="dropdown">
        <div slot="dropdown-content">
          <a href="#docs">Documentation</a>
          <a href="#guides">Guides</a>
          <a href="#api">API Reference</a>
        </div>
      </aegov-dropdown>
    </aegov-navbar-item>
    <aegov-navbar-item href="#about">About</aegov-navbar-item>
  </aegov-navbar>
</div>

---

## Active State

Mark the current page with the `active` boolean prop. The link is styled with the primary colour, semi-bold weight, and a coloured underline. `aria-current="page"` is also set for screen readers.

```html
<aegov-navbar>
  <aegov-navbar-item href="/">Home</aegov-navbar-item>
  <aegov-navbar-item href="/services" is-active>Services</aegov-navbar-item>
  <aegov-navbar-item href="/contact">Contact</aegov-navbar-item>
</aegov-navbar>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-navbar>
    <aegov-navbar-item href="#home">Home</aegov-navbar-item>
    <aegov-navbar-item href="#services" is-active>Services</aegov-navbar-item>
    <aegov-navbar-item href="#contact">Contact</aegov-navbar-item>
  </aegov-navbar>
</div>

---

## Custom Gap

Pass any Tailwind gap utility class via the `gap` prop to control horizontal spacing between items. Defaults to `gap-6`.

```html
<aegov-navbar gap="gap-10">
  <aegov-navbar-item href="#">Home</aegov-navbar-item>
  <aegov-navbar-item href="#">Services</aegov-navbar-item>
  <aegov-navbar-item href="#">Contact</aegov-navbar-item>
</aegov-navbar>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-navbar gap="gap-10">
    <aegov-navbar-item href="#">Home</aegov-navbar-item>
    <aegov-navbar-item href="#">Services</aegov-navbar-item>
    <aegov-navbar-item href="#">Contact</aegov-navbar-item>
  </aegov-navbar>
</div>

---

## Disabled Items

Set `disabled` to render a non-interactive item. Disabled items render as a `<span>` with `aria-disabled="true"` and are skipped by arrow-key navigation.

```html
<aegov-navbar>
  <aegov-navbar-item href="#">Home</aegov-navbar-item>
  <aegov-navbar-item href="#" is-disabled>Reports (coming soon)</aegov-navbar-item>
  <aegov-navbar-item href="#">Contact</aegov-navbar-item>
</aegov-navbar>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-navbar>
    <aegov-navbar-item href="#">Home</aegov-navbar-item>
    <aegov-navbar-item href="#" is-disabled>Reports (coming soon)</aegov-navbar-item>
    <aegov-navbar-item href="#">Contact</aegov-navbar-item>
  </aegov-navbar>
</div>

---

## Keyboard Support

| Key | Action |
| --- | --- |
| `Tab` | Moves focus through links, then chevron buttons, in document order. |
| `Shift + Tab` | Reverse Tab traversal. |
| `Enter` | Follows the focused link, or opens the submenu when the chevron is focused. |
| `Space` | Opens the submenu when the chevron is focused. |
| `ArrowDown` | Opens the submenu when the chevron is focused. |
| `ArrowRight` | Moves focus to the next link or chevron (reversed in RTL). |
| `ArrowLeft` | Moves focus to the previous link or chevron (reversed in RTL). |
| `Home` | Moves focus to the first item. |
| `End` | Moves focus to the last item. |

---

## API

### `aegov-navbar` props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'sm' \| 'base' \| 'lg'` | `'base'` | Cascades to every child item. |
| `gap` | `string` | `'gap-6'` | Tailwind gap utility class applied to the `<ul>`. |
| `label-nav` | `string` | `'Main navigation'` | Accessible label for the nav landmark. |

### `aegov-navbar-item` props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `href` | `string` | – | URL the link points to. If omitted, item renders as a `<span>`. |
| `target` | `'_blank' \| '_self' \| '_parent' \| '_top'` | – | Anchor target. |
| `rel` | `string` | – | Anchor rel. |
| `active` | `boolean` | `false` | Adds `aria-current="page"` and active styling. |
| `disabled` | `boolean` | `false` | Renders a `<span aria-disabled="true">` and skips dropdown wiring. |
| `size` | `'sm' \| 'base' \| 'lg'` | `'base'` | Set automatically by parent. |

### Slots

| Slot | Element | Purpose |
| --- | --- | --- |
| (default) | `aegov-navbar` | `aegov-navbar-item` children. |
| (default) | `aegov-navbar-item` | Item label text. |
| `icon-start` | `aegov-navbar-item` | Optional prefix icon (SVG recommended). |
| `dropdown` | `aegov-navbar-item` | Optional `aegov-dropdown` for a submenu. |

---

## Notes

- `aegov-navbar-item` is intended to be used inside `aegov-navbar`. It will still render standalone but loses size cascading and arrow-key navigation.
- When a submenu is present, the link and chevron are injected as default-slot children of the slotted `aegov-dropdown`, so the dropdown's trigger element wraps the whole item. This means hover-trigger dropdowns open on hovering anywhere over the item, and positioning aligns to the full item rect rather than just the chevron.
- The chevron toggles the dropdown explicitly via `aegov-dropdown.toggle()`, so it works regardless of the dropdown's `trigger`. Clicking the link calls `stopPropagation` so a click-trigger dropdown does not toggle on link follow-through.
- Mobile collapse (hamburger drawer) is intentionally out of scope. Wrap the navbar in your own breakpoint logic if you need it.
- A vertical companion component (`aegov-navblock`) is planned. Until then, use `aegov-tabs` with `orientation="vertical"` for vertical menu use cases that do not need submenus.
