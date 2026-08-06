# Navbar

<p class="text-lg text-aeblack-500 mb-8">A Navbar is the primary horizontal navigation for a site — the row of top-level destinations that usually sits directly under the header. It renders a real navigation landmark, marks the current page, and supports sub-navigation through a dropdown on any item.</p>

## Introduction

`aegov-navbar` wraps `aegov-navbar-item` children in a `<nav>` and cascades its resolved `size` to each of them.

```html
<aegov-navbar label-nav="Main navigation">
  <aegov-navbar-item href="/" is-active>Home</aegov-navbar-item>
  <aegov-navbar-item href="/services">Services</aegov-navbar-item>
  <aegov-navbar-item href="/open-data">Open data</aegov-navbar-item>
  <aegov-navbar-item href="/about">About us</aegov-navbar-item>
</aegov-navbar>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-navbar label-nav="Main navigation">
    <aegov-navbar-item href="#" is-active>Home</aegov-navbar-item>
    <aegov-navbar-item href="#">Services</aegov-navbar-item>
    <aegov-navbar-item href="#">Awareness centre</aegov-navbar-item>
    <aegov-navbar-item href="#">Open data</aegov-navbar-item>
    <aegov-navbar-item href="#">About us</aegov-navbar-item>
  </aegov-navbar>
</div>

**Always set `labelNav`.** It becomes the landmark's accessible name, which is how a screen reader user distinguishes this navigation from the breadcrumb trail, the footer navigation and any sidebar.

---

## Current page

`isActive` marks the item representing the current page. It applies the active styling **and** sets `aria-current="page"`.

```html
<aegov-navbar-item href="/services" is-active>Services</aegov-navbar-item>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-navbar label-nav="Main navigation">
    <aegov-navbar-item href="#">Home</aegov-navbar-item>
    <aegov-navbar-item href="#" is-active>Services</aegov-navbar-item>
    <aegov-navbar-item href="#">Open data</aegov-navbar-item>
  </aegov-navbar>
</div>

Set it on exactly one item. `aria-current` is the only signal a screen reader user gets about where they are, so an unset or duplicated value is a real loss.

---

## Sizes and spacing

`size` takes three tokens and cascades to every item. `gap` takes a Tailwind gap utility class, so you control spacing directly.

```html
<aegov-navbar size="sm" gap="gap-4" label-nav="Footer navigation">…</aegov-navbar>
<aegov-navbar size="base" gap="gap-6" label-nav="Main navigation">…</aegov-navbar>
<aegov-navbar size="lg" gap="gap-8" label-nav="Main navigation">…</aegov-navbar>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-6">
    <div><p class="text-sm text-aeblack-500 mb-2">sm · gap-4</p><aegov-navbar size="sm" gap="gap-4" label-nav="Small navigation"><aegov-navbar-item href="#" is-active>Home</aegov-navbar-item><aegov-navbar-item href="#">Services</aegov-navbar-item><aegov-navbar-item href="#">About</aegov-navbar-item></aegov-navbar></div>
    <div><p class="text-sm text-aeblack-500 mb-2">base · gap-6</p><aegov-navbar size="base" gap="gap-6" label-nav="Base navigation"><aegov-navbar-item href="#" is-active>Home</aegov-navbar-item><aegov-navbar-item href="#">Services</aegov-navbar-item><aegov-navbar-item href="#">About</aegov-navbar-item></aegov-navbar></div>
    <div><p class="text-sm text-aeblack-500 mb-2">lg · gap-8</p><aegov-navbar size="lg" gap="gap-8" label-nav="Large navigation"><aegov-navbar-item href="#" is-active>Home</aegov-navbar-item><aegov-navbar-item href="#">Services</aegov-navbar-item><aegov-navbar-item href="#">About</aegov-navbar-item></aegov-navbar></div>
  </div>
</div>

Note `gap` is a **class name**, not a token — `gap="gap-6"`, not `gap="6"`. Any Tailwind gap utility works, including responsive ones such as `gap="gap-3 md:gap-6"`.

### Responsive sizes

`size` accepts a responsive string with the prefixes `xs`, `sm`, `md`, `lg`, `xl` and `2xl`.

```html
<aegov-navbar size="sm lg:base" label-nav="Main navigation">…</aegov-navbar>
```

---

## Icons

`aegov-navbar-item` has an `icon-start` slot.

```html
<aegov-navbar-item href="/">
  <svg slot="icon-start" class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">…</svg>
  Home
</aegov-navbar-item>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-navbar label-nav="Main navigation with icons">
    <aegov-navbar-item href="#" is-active>
      <svg slot="icon-start" class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 2 2 8v9a1 1 0 0 0 1 1h4v-6h6v6h4a1 1 0 0 0 1-1V8l-8-6Z" /></svg>
      Home
    </aegov-navbar-item>
    <aegov-navbar-item href="#">
      <svg slot="icon-start" class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M4 3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4Zm2 4h8v1.5H6V7Zm0 4h5v1.5H6V11Z" clip-rule="evenodd" /></svg>
      Services
    </aegov-navbar-item>
    <aegov-navbar-item href="#">
      <svg slot="icon-start" class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm1-11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-1 3a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 10Z" clip-rule="evenodd" /></svg>
      About us
    </aegov-navbar-item>
  </aegov-navbar>
</div>

Mark icons `aria-hidden="true"` — the item's text is its accessible name.

---

## Sub-navigation

The `dropdown` slot turns an item into a disclosure with a chevron. The chevron is a separate control from the link, so the user can follow the parent link **or** open its sub-navigation — which matters when the parent is itself a real page.

```html
<aegov-navbar label-nav="Main navigation">
  <aegov-navbar-item href="/services">
    Services
    <aegov-dropdown slot="dropdown" tab-behavior="disclosure">
      <div slot="dropdown-content">
        <a href="/services/identity">Identity</a>
        <a href="/services/residency">Residency</a>
        <a href="/services/vehicles">Vehicles</a>
      </div>
    </aegov-dropdown>
  </aegov-navbar-item>
</aegov-navbar>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-navbar label-nav="Main navigation with sub-navigation">
    <aegov-navbar-item href="#" is-active>Home</aegov-navbar-item>
    <aegov-navbar-item href="#">
      Services
      <aegov-dropdown field-id="nb-dd-1" slot="dropdown" tab-behavior="disclosure">
        <div slot="dropdown-content">
          <a href="#">Identity</a>
          <a href="#">Residency</a>
          <a href="#">Vehicles</a>
          <a href="#">Business</a>
        </div>
      </aegov-dropdown>
    </aegov-navbar-item>
    <aegov-navbar-item href="#">
      Open data
      <aegov-dropdown field-id="nb-dd-2" slot="dropdown" tab-behavior="disclosure">
        <div slot="dropdown-content">
          <a href="#">Datasets</a>
          <a href="#">API documentation</a>
        </div>
      </aegov-dropdown>
    </aegov-navbar-item>
    <aegov-navbar-item href="#">About us</aegov-navbar-item>
  </aegov-navbar>
</div>

Use `tab-behavior="disclosure"` on the dropdown. Sub-navigation is a group of links, not a menu of commands — the disclosure pattern lets `Tab` move through the links and does not announce a menu that is really navigation. See [Dropdown](aegov-dropdown.html#tab-behaviour).

The chevron reports its own `aria-expanded`, so its state is exposed independently of the link beside it.

---

## States

```html
<aegov-navbar-item href="/services" is-active>Current page</aegov-navbar-item>
<aegov-navbar-item href="/coming-soon" is-disabled>Not yet available</aegov-navbar-item>
<aegov-navbar-item href="https://u.ae" target="_blank" rel="noopener">External</aegov-navbar-item>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-navbar label-nav="Navigation states">
    <aegov-navbar-item href="#" is-active>Current page</aegov-navbar-item>
    <aegov-navbar-item href="#">Normal</aegov-navbar-item>
    <aegov-navbar-item is-disabled>Not yet available</aegov-navbar-item>
    <aegov-navbar-item href="https://u.ae" target="_blank" rel="noopener noreferrer">u.ae</aegov-navbar-item>
  </aegov-navbar>
</div>

A disabled item renders as non-navigating text with `aria-disabled`. Prefer omitting an unavailable destination entirely — a permanently disabled navigation item is clutter.

For external links, set `target` and `rel` yourself and announce the new tab in the label or with a visually hidden note, as in [Link](aegov-link.html#opening-in-a-new-tab).

---

## Composite example — site shell

```html
<aegov-header entity-name="Ministry of Industry and Advanced Technology" entity-domain="https://moiat.gov.ae">
  …
</aegov-header>

<div class="aegov-container">
  <aegov-navbar label-nav="Main navigation" size="base" gap="gap-6">
    <aegov-navbar-item href="/" is-active>Home</aegov-navbar-item>
    <aegov-navbar-item href="/services">
      Services
      <aegov-dropdown slot="dropdown" tab-behavior="disclosure">
        <div slot="dropdown-content">
          <a href="/services/identity">Identity</a>
          <a href="/services/residency">Residency</a>
        </div>
      </aegov-dropdown>
    </aegov-navbar-item>
    <aegov-navbar-item href="/open-data">Open data</aegov-navbar-item>
    <aegov-navbar-item href="/about">About us</aegov-navbar-item>
  </aegov-navbar>

  <aegov-breadcrumbs separator="chevron" class="mt-4">
    <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>Services</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-navbar label-nav="Main navigation" size="base" gap="gap-6">
    <aegov-navbar-item href="#" is-active>Home</aegov-navbar-item>
    <aegov-navbar-item href="#">
      Services
      <aegov-dropdown field-id="nb-cx-dd" slot="dropdown" tab-behavior="disclosure">
        <div slot="dropdown-content"><a href="#">Identity</a><a href="#">Residency</a><a href="#">Vehicles</a></div>
      </aegov-dropdown>
    </aegov-navbar-item>
    <aegov-navbar-item href="#">Open data</aegov-navbar-item>
    <aegov-navbar-item href="#">About us</aegov-navbar-item>
  </aegov-navbar>
  <div class="mt-4">
    <aegov-breadcrumbs field-id="nb-cx-bc" separator="chevron">
      <aegov-breadcrumbs-item href="#">Home</aegov-breadcrumbs-item>
      <aegov-breadcrumbs-item>Services</aegov-breadcrumbs-item>
    </aegov-breadcrumbs>
  </div>
</div>

The navbar names the site's sections; the [breadcrumb trail](aegov-breadcrumbs.html) says where in them you are. Both are landmarks, which is why each needs its own label.

### Small viewports

`aegov-navbar` is a horizontal row and does not collapse into a hamburger menu on its own. On narrow viewports either let it wrap, or hide it and offer the same links in an [`aegov-drawer`](aegov-drawer.html) containing an [`aegov-navblock`](aegov-navblock.html) — the sidebar navigation component, which is designed for vertical lists and nesting.

```html
<div class="hidden md:block">
  <aegov-navbar label-nav="Main navigation">…</aegov-navbar>
</div>

<aegov-button class="md:hidden" is-icon aria-label="Open navigation menu"
  onclick="document.querySelector('#nav-drawer').show()">…</aegov-button>

<aegov-drawer id="nav-drawer" label="Navigation" position="left">
  <aegov-navblock label-nav="Main navigation">…</aegov-navblock>
</aegov-drawer>
```

Keep both lists in sync — two navigations that disagree is worse than one that wraps.

---

## RTL Support

The navbar is direction-aware. In a `dir="rtl"` container the items run right to left, the `icon-start` slot renders on the right, and sub-navigation dropdowns align to the reading-start edge. The chevron is a downward glyph, so it needs no mirroring.

```html
<div dir="rtl">
  <aegov-navbar label-nav="التنقل الرئيسي" gap="gap-6">
    <aegov-navbar-item href="#" is-active>الرئيسية</aegov-navbar-item>
    <aegov-navbar-item href="#">
      الخدمات
      <aegov-dropdown slot="dropdown" tab-behavior="disclosure">
        <div slot="dropdown-content">
          <a href="#">الهوية</a>
          <a href="#">الإقامة</a>
        </div>
      </aegov-dropdown>
    </aegov-navbar-item>
    <aegov-navbar-item href="#">البيانات المفتوحة</aegov-navbar-item>
  </aegov-navbar>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-navbar label-nav="التنقل الرئيسي" gap="gap-6">
    <aegov-navbar-item href="#" is-active>الرئيسية</aegov-navbar-item>
    <aegov-navbar-item href="#">
      الخدمات
      <aegov-dropdown field-id="nb-rtl-dd" slot="dropdown" tab-behavior="disclosure">
        <div slot="dropdown-content"><a href="#">الهوية</a><a href="#">الإقامة</a><a href="#">المركبات</a></div>
      </aegov-dropdown>
    </aegov-navbar-item>
    <aegov-navbar-item href="#">البيانات المفتوحة</aegov-navbar-item>
    <aegov-navbar-item href="#">من نحن</aegov-navbar-item>
  </aegov-navbar>
</div>

Remember that the dropdown's content is portalled to `document.body`, so **set `dir` on `<html>`** rather than only on a wrapper — see [Dropdown](aegov-dropdown.html#rtl-support).

---

## API Reference

### aegov-navbar Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `labelNav` | `label-nav` | Accessible name for the `<nav>` landmark. **Set this.** | `string` | `''` |
| `size` | `size` | Size token or responsive string. Cascades to items. | `string` — `sm \| base \| lg` | `'base'` |
| `gap` | `gap` | Tailwind gap **utility class** for spacing between items. | `string` | `'gap-3'` |

### aegov-navbar-item Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `href` | `href` | Destination. Omit for a non-navigating item. | `string` | — |
| `target` | `target` | Native target. | `'_self' \| '_blank' \| '_parent' \| '_top'` | — |
| `rel` | `rel` | Native rel. Set `noopener noreferrer` with `target="_blank"`. | `string` | — |
| `isActive` | `is-active` | Marks the current page. Sets `aria-current="page"`. | `boolean` | `false` |
| `isDisabled` | `is-disabled` | Renders as non-navigating text with `aria-disabled`. | `boolean` | `false` |
| `size` | `size` | Cascaded from the navbar. | `string` | `'base'` |

### Slots

| Slot | On | Description |
| --- | --- | --- |
| _(default)_ | navbar | The `aegov-navbar-item` children. |
| _(default)_ | item | The item label. |
| `icon-start` | item | Leading icon. |
| `dropdown` | item | An `aegov-dropdown` providing sub-navigation, with a chevron control. |

### Events

Neither component emits events of its own. Items are links, so use ordinary navigation — or intercept clicks for a router as shown in [Link](aegov-link.html#intercepting-navigation).

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the `<nav>` on the navbar, and to the link on an item. Prefer `labelNav` over `aria-label` for the landmark. |
| `data-*` | Yes | Forwarded. |
| `class`, `style` | Allowed | Applied to the host element. |

---

## Accessibility

### Built-in behaviour

- The navbar is a real `<nav>` landmark, named from `labelNav`, so it appears in a screen reader's list of regions.
- `isActive` sets `aria-current="page"` on the link — the programmatic signal for the current page, not just a style.
- `isDisabled` renders a non-navigating element with `aria-disabled="true"` rather than a link that goes nowhere.
- The sub-navigation chevron is a separate control from the parent link and reports its own `aria-expanded`, so a user can reach the parent page and its children independently.
- Items are links, so `Tab` and `Enter` behave natively and middle-click and right-click work as expected.
- Layout uses logical properties, so items and icons mirror under `dir="rtl"`.

### Developer responsibilities

- **Always set `labelNav`.** A page typically has several navigation landmarks — main, breadcrumb, footer, sidebar — and unnamed ones are indistinguishable.
- **Set `isActive` on exactly one item.**
- **Use `tab-behavior="disclosure"` on sub-navigation dropdowns.** Navigation links are not a menu of commands.
- **Provide a small-viewport route.** The navbar does not collapse itself; pair it with a [Drawer](aegov-drawer.html) + [Navblock](aegov-navblock.html), and keep both lists in sync.
- **Keep the top level short.** Five to seven destinations is the practical limit before scanning becomes work.
- **Mark icons `aria-hidden="true"`.**
- **Announce external links** and set `rel="noopener noreferrer"` with `target="_blank"`.
- **Set `dir` on `<html>`** when using sub-navigation dropdowns in RTL, since their content is portalled.
- **Do not put actions in the navbar.** It is for destinations; a command belongs in a [Button](aegov-button.html).
- **Ensure the active state is not colour-only** (WCAG 2.2 SC 1.4.1) — the built-in styling pairs colour with weight and an underline, so keep it rather than overriding with colour alone.

### Keyboard support

| Key | Action |
| --- | --- |
| `Tab` | Move focus to the next item, and to a sub-navigation chevron where present. |
| `Enter` | Follow the focused link, or open the sub-navigation from the chevron. |
| `Escape` | Close an open sub-navigation. |
| `ArrowDown`, `ArrowUp` | Move within an open sub-navigation — see [Dropdown](aegov-dropdown.html#keyboard-support). |

---

## Where to next

- [Navblock](aegov-navblock.html) — vertical sidebar navigation, and the mobile counterpart to this component.
- [Dropdown](aegov-dropdown.html) — the sub-navigation mechanism, including `tabBehavior`.
- [Breadcrumbs](aegov-breadcrumbs.html) — hierarchy below the navbar.
- [Header](aegov-header.html) — the band the navbar usually sits under.
