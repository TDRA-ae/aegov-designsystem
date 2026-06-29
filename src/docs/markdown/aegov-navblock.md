# Navblock

<p class="text-lg text-aeblack-500 mb-8">The Navblock is the vertical, sidebar-style navigation companion to <code>aegov-navbar</code>. It composes one or more <code>aegov-navblock-item</code> children that can each be a plain link, a link with a leading icon, or a parent group containing nested sub-items. Parent items expand and collapse like an accordion — exactly the pattern most application sidebars use to organise sections by topic.</p>

## Introduction

The `aegov-navblock` component renders a `<nav>` landmark wrapping an optional title and a `<ul>` of `aegov-navblock-item` children. Each item is either:

- a **leaf** — renders as `<a>` (when `href` is set) or a `<button>`, becoming the current page when `is-active="true"`,
- or a **group** — any nested `aegov-navblock-item` children are auto-promoted into the collapsible sub-region. The whole row toggles open/closed.

Authors do not need to add `slot="subnav"` to nested items — the component does it automatically.

```html
<aegov-navblock block-title="Workspace" label-nav="Project sidebar">
  <aegov-navblock-item href="/" is-active="true">Dashboard</aegov-navblock-item>
  <aegov-navblock-item>
    Reports
    <aegov-navblock-item href="/r/sales">Sales</aegov-navblock-item>
    <aegov-navblock-item href="/r/users">Users</aegov-navblock-item>
  </aegov-navblock-item>
  <aegov-navblock-item href="/settings">Settings</aegov-navblock-item>
</aegov-navblock>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov" style="max-width: 320px;">
  <aegov-navblock block-title="Workspace" label-nav="Project sidebar">
    <aegov-navblock-item href="#" is-active="true">Dashboard</aegov-navblock-item>
    <aegov-navblock-item>
      Reports
      <aegov-navblock-item href="#">Sales</aegov-navblock-item>
      <aegov-navblock-item href="#">Users</aegov-navblock-item>
    </aegov-navblock-item>
    <aegov-navblock-item href="#">Settings</aegov-navblock-item>
  </aegov-navblock>
</div>

---

## Variants

The `variant` prop switches the visual mode of the entire tree — set it once on `aegov-navblock` and all descendant items adapt automatically. Two variants are available:

- **`collapsible`** (default) — parent items expand and collapse with an animated accordion. The active item receives a filled background highlight.
- **`flat`** — all items sit at the same indentation level. Items with children become non-interactive bold group headers; their children are always visible. The active item gets a colour and font-weight change only — no filled background.

> The markup is **identical** between variants. Switching `variant` from `"collapsible"` to `"flat"` is all that is needed.

### Collapsible (default)

```html
<aegov-navblock variant="collapsible" block-title="Workspace">
  <aegov-navblock-item href="#" is-active="true">
    <svg slot="icon-start" viewBox="0 0 256 256" aria-hidden="true"><rect width="256" height="256" fill="none"/><path d="M208 127.99v72a8 8 0 0 1-8 8h-56v-56h-32v56H56a8 8 0 0 1-8-8V128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/><path d="m24 136 95.996-96L216 136" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/></svg>
    Dashboard
  </aegov-navblock-item>
  <aegov-navblock-item href="#">
    <svg slot="icon-start" viewBox="0 0 256 256" aria-hidden="true"><rect width="256" height="256" fill="none"/><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/><line x1="40" y1="64" x2="216" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/><line x1="40" y1="192" x2="216" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/></svg>
    Transactions
  </aegov-navblock-item>
  <aegov-navblock-item>
    Account
    <aegov-navblock-item href="#">Profile</aegov-navblock-item>
    <aegov-navblock-item href="#">Settings</aegov-navblock-item>
    <aegov-navblock-item href="#">Billing</aegov-navblock-item>
  </aegov-navblock-item>
</aegov-navblock>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov" style="max-width: 320px;">
  <aegov-navblock variant="collapsible" block-title="Workspace">
    <aegov-navblock-item href="#" is-active="true">
      <svg slot="icon-start" viewBox="0 0 256 256" aria-hidden="true"><rect width="256" height="256" fill="none"/><path d="M208 127.99v72a8 8 0 0 1-8 8h-56v-56h-32v56H56a8 8 0 0 1-8-8V128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/><path d="m24 136 95.996-96L216 136" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/></svg>
      Dashboard
    </aegov-navblock-item>
    <aegov-navblock-item href="#">
      <svg slot="icon-start" viewBox="0 0 256 256" aria-hidden="true"><rect width="256" height="256" fill="none"/><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/><line x1="40" y1="64" x2="216" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/><line x1="40" y1="192" x2="216" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/></svg>
      Transactions
    </aegov-navblock-item>
    <aegov-navblock-item>
      Account
      <aegov-navblock-item href="#">Profile</aegov-navblock-item>
      <aegov-navblock-item href="#">Settings</aegov-navblock-item>
      <aegov-navblock-item href="#">Billing</aegov-navblock-item>
    </aegov-navblock-item>
  </aegov-navblock>
</div>

### Flat

All items share the same indentation level. Group headers (items with children) render as bold, non-interactive labels. No connector line is drawn between parent and children.

```html
<aegov-navblock variant="flat" block-title="Workspace">
  <aegov-navblock-item href="#" is-active="true">
    <svg slot="icon-start" viewBox="0 0 256 256" aria-hidden="true">…</svg>
    Dashboard
  </aegov-navblock-item>
  <aegov-navblock-item href="#">
    <svg slot="icon-start" viewBox="0 0 256 256" aria-hidden="true">…</svg>
    Transactions
  </aegov-navblock-item>
  <aegov-navblock-item>
    Account
    <aegov-navblock-item href="#">Profile</aegov-navblock-item>
    <aegov-navblock-item href="#">Settings</aegov-navblock-item>
    <aegov-navblock-item href="#">Billing</aegov-navblock-item>
  </aegov-navblock-item>
</aegov-navblock>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov" style="max-width: 320px;">
  <aegov-navblock variant="flat" block-title="Workspace">
    <aegov-navblock-item href="#" is-active="true">
      <svg slot="icon-start" viewBox="0 0 256 256" aria-hidden="true"><rect width="256" height="256" fill="none"/><path d="M208 127.99v72a8 8 0 0 1-8 8h-56v-56h-32v56H56a8 8 0 0 1-8-8V128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/><path d="m24 136 95.996-96L216 136" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/></svg>
      Dashboard
    </aegov-navblock-item>
    <aegov-navblock-item href="#">
      <svg slot="icon-start" viewBox="0 0 256 256" aria-hidden="true"><rect width="256" height="256" fill="none"/><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/><line x1="40" y1="64" x2="216" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/><line x1="40" y1="192" x2="216" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/></svg>
      Transactions
    </aegov-navblock-item>
    <aegov-navblock-item>
      Account
      <aegov-navblock-item href="#">Profile</aegov-navblock-item>
      <aegov-navblock-item href="#">Settings</aegov-navblock-item>
      <aegov-navblock-item href="#">Billing</aegov-navblock-item>
    </aegov-navblock-item>
  </aegov-navblock>
</div>

### Flat with active border

Add `active-border="true"` to apply the Flux sidebar pattern: a persistent light-gray border runs the full height of the list; the active top-level item's segment of that border changes to the primary colour, creating a merged active indicator.

```html
<aegov-navblock variant="flat" active-border="true" block-title="Workspace">
  …
</aegov-navblock>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov" style="max-width: 320px;">
  <aegov-navblock variant="flat" active-border="true" block-title="Workspace">
    <aegov-navblock-item href="#" is-active="true">
      <svg slot="icon-start" viewBox="0 0 256 256" aria-hidden="true"><rect width="256" height="256" fill="none"/><path d="M208 127.99v72a8 8 0 0 1-8 8h-56v-56h-32v56H56a8 8 0 0 1-8-8V128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/><path d="m24 136 95.996-96L216 136" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/></svg>
      Dashboard
    </aegov-navblock-item>
    <aegov-navblock-item href="#">
      <svg slot="icon-start" viewBox="0 0 256 256" aria-hidden="true"><rect width="256" height="256" fill="none"/><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/><line x1="40" y1="64" x2="216" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/><line x1="40" y1="192" x2="216" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/></svg>
      Transactions
    </aegov-navblock-item>
    <aegov-navblock-item>
      Account
      <aegov-navblock-item href="#">Profile</aegov-navblock-item>
      <aegov-navblock-item href="#" is-active="true">Settings</aegov-navblock-item>
      <aegov-navblock-item href="#">Billing</aegov-navblock-item>
    </aegov-navblock-item>
  </aegov-navblock>
</div>

---

## Block title

The `block-title` prop sets a short heading rendered above the items. Pass markup via the `title` slot to override the prop entirely (for example to embed an icon next to the title).

```html
<aegov-navblock block-title="Resources">
  <aegov-navblock-item href="/docs">Docs</aegov-navblock-item>
</aegov-navblock>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov" style="max-width: 320px;">
  <aegov-navblock block-title="Resources">
    <aegov-navblock-item href="#">Docs</aegov-navblock-item>
    <aegov-navblock-item href="#">API reference</aegov-navblock-item>
    <aegov-navblock-item href="#">Release notes</aegov-navblock-item>
  </aegov-navblock>
</div>

---

## Single open vs. multiple open

By default the block enforces single-open behaviour at every level — opening one parent collapses any other open parent that shares the same direct ancestor. Set `is-multiple="true"` to allow any number of parents to remain open at once.

```html
<aegov-navblock is-multiple="true">
  <aegov-navblock-item>
    Reports
    <aegov-navblock-item href="/r/sales">Sales</aegov-navblock-item>
  </aegov-navblock-item>
  <aegov-navblock-item>
    Users
    <aegov-navblock-item href="/u/admins">Admins</aegov-navblock-item>
  </aegov-navblock-item>
</aegov-navblock>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov" style="max-width: 320px;">
  <aegov-navblock is-multiple="true">
    <aegov-navblock-item>
      Reports
      <aegov-navblock-item href="#">Sales</aegov-navblock-item>
      <aegov-navblock-item href="#">Inventory</aegov-navblock-item>
    </aegov-navblock-item>
    <aegov-navblock-item>
      Users
      <aegov-navblock-item href="#">Admins</aegov-navblock-item>
      <aegov-navblock-item href="#">Members</aegov-navblock-item>
    </aegov-navblock-item>
  </aegov-navblock>
</div>

---

## Toggle icon

Switch the parent-row indicator with the `icon` prop: `chevron` (default) rotates 180° on open; `plus` rotates 45° to form a minus sign.

```html
<aegov-navblock icon="plus">
  <aegov-navblock-item>
    Reports
    <aegov-navblock-item href="/r/sales">Sales</aegov-navblock-item>
  </aegov-navblock-item>
</aegov-navblock>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov" style="max-width: 320px;">
  <aegov-navblock icon="plus">
    <aegov-navblock-item>
      Reports
      <aegov-navblock-item href="#">Sales</aegov-navblock-item>
      <aegov-navblock-item href="#">Inventory</aegov-navblock-item>
    </aegov-navblock-item>
  </aegov-navblock>
</div>

---

## Sizes

The `size` prop scales row typography and padding. Three tokens are available — `sm`, `base` (default), and `lg`. The parent navblock resolves the token and cascades it to every descendant item, so the whole tree always scales together. Tailwind-style responsive strings such as `"sm md:base xl:lg"` are also accepted.

```html
<aegov-navblock size="sm">…</aegov-navblock>
<aegov-navblock size="base">…</aegov-navblock>
<aegov-navblock size="lg">…</aegov-navblock>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex gap-6" style="align-items: flex-start;">
  <div style="min-width: 200px;">
    <aegov-navblock size="sm" block-title="Small">
      <aegov-navblock-item href="#" is-active="true">Home</aegov-navblock-item>
      <aegov-navblock-item href="#">Reports</aegov-navblock-item>
      <aegov-navblock-item href="#">Settings</aegov-navblock-item>
    </aegov-navblock>
  </div>
  <div style="min-width: 200px;">
    <aegov-navblock size="base" block-title="Base">
      <aegov-navblock-item href="#" is-active="true">Home</aegov-navblock-item>
      <aegov-navblock-item href="#">Reports</aegov-navblock-item>
      <aegov-navblock-item href="#">Settings</aegov-navblock-item>
    </aegov-navblock>
  </div>
  <div style="min-width: 200px;">
    <aegov-navblock size="lg" block-title="Large">
      <aegov-navblock-item href="#" is-active="true">Home</aegov-navblock-item>
      <aegov-navblock-item href="#">Reports</aegov-navblock-item>
      <aegov-navblock-item href="#">Settings</aegov-navblock-item>
    </aegov-navblock>
  </div>
</div>

---

## Leading icons and inline content

Each item supports a leading icon via `slot="icon-start"`. Anything else placed inside the item — including other components such as `aegov-badge` — appears inline next to the label, so authors can attach counts, status pills, or any other inline node without a dedicated meta slot.

```html
<aegov-navblock>
  <aegov-navblock-item href="/inbox" is-active="true">
    <svg slot="icon-start" viewBox="0 0 256 256" aria-hidden="true">
      <rect width="256" height="256" fill="none" />
      <path d="M32 96l96 64 96-64v96a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16Z"
            fill="none" stroke="currentColor" stroke-width="20" stroke-linejoin="round" />
    </svg>
    Inbox
    <aegov-badge color="primary">12</aegov-badge>
  </aegov-navblock-item>
  <aegov-navblock-item href="/sent">
    <svg slot="icon-start" viewBox="0 0 256 256" aria-hidden="true">
      <rect width="256" height="256" fill="none" />
      <path d="m48 56 176 72-176 72 32-72Z"
            fill="none" stroke="currentColor" stroke-width="20" stroke-linejoin="round" />
    </svg>
    Sent
  </aegov-navblock-item>
</aegov-navblock>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov" style="max-width: 320px;">
  <aegov-navblock>
    <aegov-navblock-item href="#" is-active="true">
      <svg slot="icon-start" viewBox="0 0 256 256" aria-hidden="true">
        <rect width="256" height="256" fill="none" />
        <path d="M32 96l96 64 96-64v96a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16Z" fill="none" stroke="currentColor" stroke-width="20" stroke-linejoin="round" />
      </svg>
      Inbox
      <aegov-badge color="primary">12</aegov-badge>
    </aegov-navblock-item>
    <aegov-navblock-item href="#">
      <svg slot="icon-start" viewBox="0 0 256 256" aria-hidden="true">
        <rect width="256" height="256" fill="none" />
        <path d="m48 56 176 72-176 72 32-72Z" fill="none" stroke="currentColor" stroke-width="20" stroke-linejoin="round" />
      </svg>
      Sent
    </aegov-navblock-item>
    <aegov-navblock-item href="#">
      <svg slot="icon-start" viewBox="0 0 256 256" aria-hidden="true">
        <rect width="256" height="256" fill="none" />
        <path d="M48 64h160v144H48Z" fill="none" stroke="currentColor" stroke-width="20" stroke-linejoin="round" />
      </svg>
      Drafts
      <aegov-badge color="aeblack" appearance="soft">2</aegov-badge>
    </aegov-navblock-item>
  </aegov-navblock>
</div>

---

## Deep nesting

Sub-items can themselves contain sub-items, recursively. When any descendant item is `is-active`, every ancestor is automatically expanded on the initial render so the active row is visible.

```html
<aegov-navblock>
  <aegov-navblock-item>
    Reports
    <aegov-navblock-item>
      Sales
      <aegov-navblock-item href="/r/sales/q1" is-active="true">Q1 — current</aegov-navblock-item>
      <aegov-navblock-item href="/r/sales/q2">Q2</aegov-navblock-item>
    </aegov-navblock-item>
    <aegov-navblock-item href="/r/users">Users</aegov-navblock-item>
  </aegov-navblock-item>
</aegov-navblock>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov" style="max-width: 320px;">
  <aegov-navblock>
    <aegov-navblock-item>
      Reports
      <aegov-navblock-item>
        Sales
        <aegov-navblock-item href="#" is-active="true">Q1 — current</aegov-navblock-item>
        <aegov-navblock-item href="#">Q2</aegov-navblock-item>
      </aegov-navblock-item>
      <aegov-navblock-item href="#">Users</aegov-navblock-item>
    </aegov-navblock-item>
    <aegov-navblock-item href="#">Settings</aegov-navblock-item>
  </aegov-navblock>
</div>

---

## Bordered

Use `is-bordered="true"` to wrap the block in a rounded border with internal padding — useful when the block sits directly on a coloured background without its own card frame.

```html
<aegov-navblock is-bordered="true" block-title="Workspace">
  <aegov-navblock-item href="/" is-active="true">Dashboard</aegov-navblock-item>
  <aegov-navblock-item href="/r">Reports</aegov-navblock-item>
</aegov-navblock>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov" style="max-width: 320px;">
  <aegov-navblock is-bordered="true" block-title="Workspace">
    <aegov-navblock-item href="#" is-active="true">Dashboard</aegov-navblock-item>
    <aegov-navblock-item href="#">Reports</aegov-navblock-item>
    <aegov-navblock-item href="#">Settings</aegov-navblock-item>
  </aegov-navblock>
</div>

---

## Disabled items

A disabled item is not focusable, is removed from arrow-key navigation, and renders with reduced opacity. Use it for items the user cannot reach in the current state — for example a workflow step waiting on prerequisites.

```html
<aegov-navblock>
  <aegov-navblock-item href="/" is-active="true">Step one</aegov-navblock-item>
  <aegov-navblock-item href="/two">Step two</aegov-navblock-item>
  <aegov-navblock-item href="/three" is-disabled>Step three (locked)</aegov-navblock-item>
</aegov-navblock>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov" style="max-width: 320px;">
  <aegov-navblock>
    <aegov-navblock-item href="#" is-active="true">Step one</aegov-navblock-item>
    <aegov-navblock-item href="#">Step two</aegov-navblock-item>
    <aegov-navblock-item href="#" is-disabled>Step three (locked)</aegov-navblock-item>
  </aegov-navblock>
</div>

---

## Properties

### `aegov-navblock`

| Property      | Attribute      | Description                                                          | Type                       | Default                  |
| ------------- | -------------- | -------------------------------------------------------------------- | -------------------------- | ------------------------ |
| `blockTitle`  | `block-title`  | Heading rendered above the items. Overridden by the `title` slot.   | `string \| undefined`      | `undefined`              |
| `labelNav`    | `label-nav`    | Accessible label for the `<nav>` landmark.                           | `string`                   | `'Sidebar navigation'`   |
| `isMultiple`  | `is-multiple`  | Allow multiple sibling parents to be open at once.                   | `boolean`                  | `false`                  |
| `icon`        | `icon`         | Expand/collapse indicator — `'chevron'` or `'plus'`.                 | `'chevron' \| 'plus'`      | `'chevron'`              |
| `size`        | `size`         | Size token. Accepts responsive strings (e.g. `"sm md:base lg:lg"`). | `string`                   | `'base'`                 |
| `isBordered`  | `is-bordered`  | Wrap the block in a bordered container.                              | `boolean`                  | `false`                  |
| `variant`     | `variant`      | Visual mode — `'collapsible'` (accordion) or `'flat'` (group headers, no indent).       | `'collapsible' \| 'flat'`  | `'collapsible'`          |
| `activeBorder`| `active-border`| When `true` and `variant="flat"`, active item gets a coloured inline-start border.      | `boolean`                  | `false`                  |
| `fieldId`     | `field-id`     | Unique ID for the wrapper. Auto-generated if not provided.           | `string \| undefined`      | (auto-generated)         |

### `aegov-navblock-item`

| Property      | Attribute      | Description                                                                              | Type                                    | Default         |
| ------------- | -------------- | ---------------------------------------------------------------------------------------- | --------------------------------------- | --------------- |
| `href`        | `href`         | Destination URL. Renders an `<a>` when present (and the item has no sub-items).          | `string \| undefined`                   | `undefined`     |
| `target`      | `target`       | Anchor target attribute.                                                                  | `'_blank' \| '_self' \| '_parent' \| '_top'` | `undefined` |
| `rel`         | `rel`          | Anchor `rel` attribute.                                                                   | `string \| undefined`                   | `undefined`     |
| `isActive`    | `is-active`    | Mark as the current page. Sets `aria-current="page"` and a highlight style.              | `boolean`                               | `false`         |
| `isDisabled`  | `is-disabled`  | Visually disabled, not focusable, removed from arrow-key navigation.                     | `boolean`                               | `false`         |
| `isOpen`      | `is-open`      | Sub-region open state. Set by the parent navblock; can also be authored directly.        | `boolean`                               | `false`         |
| `icon`        | `icon`         | Expand/collapse indicator. Cascades from the parent navblock.                            | `'chevron' \| 'plus'`                   | `'chevron'`     |
| `size`        | `size`         | Size token. Cascades from the parent navblock.                                            | `'sm' \| 'base' \| 'lg'`                | `'base'`        |
| `variant`     | `variant`      | Visual variant. Cascades automatically from the parent navblock — do not set manually.  | `'collapsible' \| 'flat'`               | `'collapsible'` |

### Slots

| Slot          | Description                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------ |
| `default`     | (Navblock) Top-level `aegov-navblock-item` children. (Item) Row content — label and any inline siblings.    |
| `title`       | (Navblock) Custom block title; overrides the `block-title` prop.                                             |
| `icon-start`  | (Item) Optional leading icon shown before the label.                                                          |
| `subnav`      | (Item) Nested sub-items. Auto-assigned for nested `aegov-navblock-item` children without an explicit slot. |

### Events

| Event                       | Description                                          | Payload                  |
| --------------------------- | ---------------------------------------------------- | ------------------------ |
| `aegovNavblockItemToggle`   | Fired by an item when it toggles its sub-region.     | `{ open: boolean }`      |

---

## Accessibility

- The block renders as a `<nav>` landmark with an `aria-label` from `label-nav`.
- Parent rows are real `<button>` elements with `aria-expanded` and `aria-controls` linking the trigger to the sub-region.
- Leaf rows are `<a>` elements when `href` is set, or `<button>` otherwise. The active leaf carries `aria-current="page"`.
- Disabled items use native `disabled` (button) or `aria-disabled="true"` (span) and are excluded from keyboard navigation.

### Keyboard

| Key            | Action                                                                       |
| -------------- | ---------------------------------------------------------------------------- |
| `Tab`          | Move focus to the navblock; subsequent `Tab` exits the block.                |
| `ArrowDown`    | Move focus to the next visible row.                                          |
| `ArrowUp`      | Move focus to the previous visible row.                                      |
| `Home`         | Move focus to the first visible row.                                          |
| `End`          | Move focus to the last visible row.                                           |
| `ArrowRight`   | Expand a closed parent row.                                                   |
| `ArrowLeft`    | Collapse an open parent row, or move focus to the parent row from a leaf.    |
| `Enter` / `Space` | Activate a leaf link, or toggle a parent row.                              |
