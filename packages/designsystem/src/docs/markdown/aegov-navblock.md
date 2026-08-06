# Navblock

<p class="text-lg text-aeblack-500 mb-8">A Navblock is vertical navigation for a sidebar — a section index, a settings menu, the contents of a long document. It supports nesting, so a parent item can hold its own children, and it offers two modes: collapsible groups that expand and collapse, or a flat tree where everything is always visible.</p>

## Introduction

`aegov-navblock` wraps `aegov-navblock-item` children in a `<nav>`. An item becomes a group simply by containing other items.

```html
<aegov-navblock block-title="Workspace" label-nav="Project sidebar">
  <aegov-navblock-item href="/" is-active>Dashboard</aegov-navblock-item>

  <aegov-navblock-item>
    Reports
    <aegov-navblock-item href="/reports/sales">Sales</aegov-navblock-item>
    <aegov-navblock-item href="/reports/users">Users</aegov-navblock-item>
  </aegov-navblock-item>

  <aegov-navblock-item href="/settings">Settings</aegov-navblock-item>
</aegov-navblock>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div style="max-width: 320px;">
    <aegov-navblock field-id="nbk-intro" block-title="Workspace" label-nav="Project sidebar">
      <aegov-navblock-item href="#" is-active>Dashboard</aegov-navblock-item>
      <aegov-navblock-item>
        Reports
        <aegov-navblock-item href="#">Sales</aegov-navblock-item>
        <aegov-navblock-item href="#">Users</aegov-navblock-item>
      </aegov-navblock-item>
      <aegov-navblock-item href="#">Settings</aegov-navblock-item>
    </aegov-navblock>
  </div>
</div>

An item with children and no `href` is a group header. An item with an `href` and children is both a link and a group — the parent link stays reachable, and the toggle is separate.

**Always set `labelNav`.** It names the `<nav>` landmark, which is how a screen reader user distinguishes this from the main navigation.

---

## Variant

The **markup is identical** between variants — switching `variant` is all that changes.

| Variant | Behaviour |
| --- | --- |
| `collapsible` | Default. Parent items expand and collapse. The active item gets a filled highlight. |
| `flat` | Everything is visible. Items with children become non-interactive bold group headers, and their children are always shown. The active item changes colour and weight only. |

```html
<aegov-navblock variant="collapsible" label-nav="Sidebar">…</aegov-navblock>
<aegov-navblock variant="flat" label-nav="Sidebar">…</aegov-navblock>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-10">
    <div style="width: 260px;">
      <p class="text-sm text-aeblack-500 mb-2">collapsible (default)</p>
      <aegov-navblock field-id="nbk-v1" variant="collapsible" label-nav="Collapsible sidebar">
        <aegov-navblock-item href="#" is-active>Overview</aegov-navblock-item>
        <aegov-navblock-item>
          Applications
          <aegov-navblock-item href="#">In progress</aegov-navblock-item>
          <aegov-navblock-item href="#">Submitted</aegov-navblock-item>
        </aegov-navblock-item>
        <aegov-navblock-item href="#">Documents</aegov-navblock-item>
      </aegov-navblock>
    </div>
    <div style="width: 260px;">
      <p class="text-sm text-aeblack-500 mb-2">flat</p>
      <aegov-navblock field-id="nbk-v2" variant="flat" label-nav="Flat sidebar">
        <aegov-navblock-item href="#" is-active>Overview</aegov-navblock-item>
        <aegov-navblock-item>
          Applications
          <aegov-navblock-item href="#">In progress</aegov-navblock-item>
          <aegov-navblock-item href="#">Submitted</aegov-navblock-item>
        </aegov-navblock-item>
        <aegov-navblock-item href="#">Documents</aegov-navblock-item>
      </aegov-navblock>
    </div>
  </div>
</div>

Use `flat` for short trees where hiding anything costs more than it saves, and for document contents where the user wants to see the whole structure. Use `collapsible` for long sidebars.

---

## Block title

`blockTitle` renders a heading above the list. The `title` slot takes markup instead.

```html
<aegov-navblock block-title="My account" label-nav="Account navigation">…</aegov-navblock>

<aegov-navblock label-nav="Account navigation">
  <span slot="title">My account <aegov-badge size="sm" variant="primary">3</aegov-badge></span>
  …
</aegov-navblock>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-10">
    <div style="width: 240px;">
      <aegov-navblock field-id="nbk-t1" block-title="My account" label-nav="Account navigation">
        <aegov-navblock-item href="#" is-active>Profile</aegov-navblock-item>
        <aegov-navblock-item href="#">Notifications</aegov-navblock-item>
      </aegov-navblock>
    </div>
    <div style="width: 240px;">
      <aegov-navblock field-id="nbk-t2" label-nav="Applications navigation">
        <span slot="title">Applications <aegov-badge size="sm" variant="primary">3</aegov-badge></span>
        <aegov-navblock-item href="#">In progress</aegov-navblock-item>
        <aegov-navblock-item href="#" is-active>Submitted</aegov-navblock-item>
      </aegov-navblock>
    </div>
  </div>
</div>

Note the title is a visual heading; it does **not** replace `labelNav`, which names the landmark itself.

---

## Nesting and open state

`isOpen` on an item controls whether its children are showing, and it is readable and writable from outside the element — so you can expand the branch containing the current page on load.

```html
<aegov-navblock label-nav="Sidebar">
  <aegov-navblock-item is-open>
    Applications
    <aegov-navblock-item href="/in-progress" is-active>In progress</aegov-navblock-item>
    <aegov-navblock-item href="/submitted">Submitted</aegov-navblock-item>
  </aegov-navblock-item>
</aegov-navblock>
```

```js
// Expand whichever branch contains the active item
for (const item of document.querySelectorAll('aegov-navblock-item')) {
  if (item.querySelector('aegov-navblock-item[is-active]')) item.isOpen = true;
}
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div style="max-width: 300px;">
    <aegov-navblock field-id="nbk-open" label-nav="Sidebar with open branch" block-title="Workspace">
      <aegov-navblock-item href="#">Dashboard</aegov-navblock-item>
      <aegov-navblock-item is-open>
        Applications
        <aegov-navblock-item href="#" is-active>In progress</aegov-navblock-item>
        <aegov-navblock-item href="#">Submitted</aegov-navblock-item>
        <aegov-navblock-item href="#">Archived</aegov-navblock-item>
      </aegov-navblock-item>
      <aegov-navblock-item>
        Reports
        <aegov-navblock-item href="#">Monthly</aegov-navblock-item>
        <aegov-navblock-item href="#">Annual</aegov-navblock-item>
      </aegov-navblock-item>
    </aegov-navblock>
  </div>
</div>

A sidebar that opens with the current page hidden inside a collapsed branch is disorienting — always expand the active branch.

### Single or multiple open

`isMultiple` on the navblock allows several branches open at once. By default opening one closes the others.

```html
<aegov-navblock is-multiple label-nav="Sidebar">…</aegov-navblock>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div style="max-width: 300px;">
    <aegov-navblock field-id="nbk-multi" is-multiple label-nav="Sidebar, multiple open">
      <aegov-navblock-item is-open>
        Applications
        <aegov-navblock-item href="#">In progress</aegov-navblock-item>
        <aegov-navblock-item href="#">Submitted</aegov-navblock-item>
      </aegov-navblock-item>
      <aegov-navblock-item is-open>
        Reports
        <aegov-navblock-item href="#">Monthly</aegov-navblock-item>
        <aegov-navblock-item href="#">Annual</aegov-navblock-item>
      </aegov-navblock-item>
    </aegov-navblock>
  </div>
</div>

---

## Icons

The `icon-start` slot on an item takes a leading icon.

```html
<aegov-navblock-item href="/dashboard" is-active>
  <svg slot="icon-start" class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">…</svg>
  Dashboard
</aegov-navblock-item>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div style="max-width: 280px;">
    <aegov-navblock field-id="nbk-icons" block-title="Workspace" label-nav="Sidebar with icons">
      <aegov-navblock-item href="#" is-active>
        <svg slot="icon-start" class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M4 4h5v5H4V4Zm7 0h5v5h-5V4ZM4 11h5v5H4v-5Zm7 0h5v5h-5v-5Z" /></svg>
        Dashboard
      </aegov-navblock-item>
      <aegov-navblock-item href="#">
        <svg slot="icon-start" class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.3a1.5 1.5 0 0 1 1.06.44l3.7 3.7A1.5 1.5 0 0 1 16 7.2v9.3a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 16.5v-13Z" /></svg>
        Documents
      </aegov-navblock-item>
      <aegov-navblock-item href="#">
        <svg slot="icon-start" class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8.34 1.8A1 1 0 0 1 9.32 1h1.36a1 1 0 0 1 .98.8l.3 1.48c.5.14.97.34 1.42.59l1.25-.84a1 1 0 0 1 1.26.13l.96.96a1 1 0 0 1 .13 1.26l-.84 1.25c.25.45.45.92.59 1.42l1.47.3a1 1 0 0 1 .8.97v1.36a1 1 0 0 1-.8.98l-1.47.3c-.14.5-.34.97-.59 1.42l.84 1.25a1 1 0 0 1-.13 1.26l-.96.96a1 1 0 0 1-1.26.13l-1.25-.84c-.45.25-.92.45-1.42.59l-.3 1.47a1 1 0 0 1-.98.8H9.32a1 1 0 0 1-.98-.8l-.3-1.47c-.5-.14-.97-.34-1.42-.59l-1.25.84a1 1 0 0 1-1.26-.13l-.96-.96a1 1 0 0 1-.13-1.26l.84-1.25c-.25-.45-.45-.92-.59-1.42l-1.47-.3A1 1 0 0 1 1 10.68V9.32a1 1 0 0 1 .8-.98l1.47-.3c.14-.5.34-.97.59-1.42l-.84-1.25a1 1 0 0 1 .13-1.26l.96-.96A1 1 0 0 1 5.38 3l1.25.84c.45-.25.92-.45 1.42-.59l.3-1.47ZM13 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" clip-rule="evenodd" /></svg>
        Settings
      </aegov-navblock-item>
    </aegov-navblock>
  </div>
</div>

Mark icons `aria-hidden="true"`.

---

## Appearance options

| Property | Effect |
| --- | --- |
| `icon` | Expand indicator on group items — `chevron` or `plus`. |
| `isBordered` | Border around the block. |
| `activeBorder` | Adds an edge marker to the active item. |
| `size` | Three tokens, cascaded to items. Accepts a responsive string. |

```html
<aegov-navblock icon="plus" is-bordered active-border label-nav="Sidebar">…</aegov-navblock>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-8">
    <div style="width: 240px;">
      <p class="text-sm text-aeblack-500 mb-2">icon="plus" · is-bordered</p>
      <aegov-navblock field-id="nbk-a1" icon="plus" is-bordered label-nav="Bordered sidebar">
        <aegov-navblock-item href="#" is-active>Overview</aegov-navblock-item>
        <aegov-navblock-item>
          Applications
          <aegov-navblock-item href="#">In progress</aegov-navblock-item>
        </aegov-navblock-item>
      </aegov-navblock>
    </div>
    <div style="width: 240px;">
      <p class="text-sm text-aeblack-500 mb-2">active-border</p>
      <aegov-navblock field-id="nbk-a2" active-border label-nav="Sidebar with active border">
        <aegov-navblock-item href="#" is-active>Overview</aegov-navblock-item>
        <aegov-navblock-item href="#">Documents</aegov-navblock-item>
      </aegov-navblock>
    </div>
    <div style="width: 240px;">
      <p class="text-sm text-aeblack-500 mb-2">size="sm"</p>
      <aegov-navblock field-id="nbk-a3" size="sm" label-nav="Small sidebar">
        <aegov-navblock-item href="#" is-active>Overview</aegov-navblock-item>
        <aegov-navblock-item href="#">Documents</aegov-navblock-item>
      </aegov-navblock>
    </div>
  </div>
</div>

Note `activeBorder` is spelled without the `is` prefix, unlike other booleans in the library.

---

## Reacting to toggles

```html
<aegov-navblock id="sidebar" label-nav="Sidebar">…</aegov-navblock>

<script type="module">
  document.querySelector('#sidebar').addEventListener('aegovNavblockItemToggle', (e) => {
    // e.target is the item, e.detail.open is its new state
    sessionStorage.setItem(`nav-${e.target.textContent.trim()}`, String(e.detail.open));
  });
</script>
```

Persisting the open branches is worth doing for a sidebar the user returns to repeatedly.

---

## Composite example — service dashboard sidebar

```html
<div class="flex gap-8">
  <aside class="w-64 shrink-0">
    <aegov-navblock block-title="My account" label-nav="Account navigation" is-multiple active-border>
      <aegov-navblock-item href="/dashboard" is-active>
        <svg slot="icon-start" class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">…</svg>
        Dashboard
      </aegov-navblock-item>

      <aegov-navblock-item is-open>
        Applications
        <aegov-navblock-item href="/applications/active">In progress</aegov-navblock-item>
        <aegov-navblock-item href="/applications/submitted">Submitted</aegov-navblock-item>
        <aegov-navblock-item href="/applications/archived">Archived</aegov-navblock-item>
      </aegov-navblock-item>

      <aegov-navblock-item href="/documents">Documents</aegov-navblock-item>
      <aegov-navblock-item href="/payments">Payments</aegov-navblock-item>
      <aegov-navblock-item href="/settings">Settings</aegov-navblock-item>
    </aegov-navblock>
  </aside>

  <main class="grow">…</main>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex gap-8">
    <aside style="width: 260px;" class="shrink-0">
      <aegov-navblock field-id="nbk-cx" block-title="My account" label-nav="Account navigation" is-multiple active-border>
        <aegov-navblock-item href="#" is-active>
          <svg slot="icon-start" class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M4 4h5v5H4V4Zm7 0h5v5h-5V4ZM4 11h5v5H4v-5Zm7 0h5v5h-5v-5Z" /></svg>
          Dashboard
        </aegov-navblock-item>
        <aegov-navblock-item is-open>
          Applications
          <aegov-navblock-item href="#">In progress</aegov-navblock-item>
          <aegov-navblock-item href="#">Submitted</aegov-navblock-item>
          <aegov-navblock-item href="#">Archived</aegov-navblock-item>
        </aegov-navblock-item>
        <aegov-navblock-item href="#">Documents</aegov-navblock-item>
        <aegov-navblock-item href="#">Payments</aegov-navblock-item>
        <aegov-navblock-item href="#">Settings</aegov-navblock-item>
      </aegov-navblock>
    </aside>
    <div class="grow">
      <p class="text-h5 font-bold mb-2">Dashboard</p>
      <p class="text-aeblack-500">You have 3 applications in progress.</p>
    </div>
  </div>
</div>

On narrow viewports, put the same navblock inside a [Drawer](aegov-drawer.html) rather than shrinking the sidebar — that is also the pattern for the mobile version of an [`aegov-navbar`](aegov-navbar.html).

---

## RTL Support

The navblock is direction-aware. In a `dir="rtl"` container the list aligns right, `icon-start` renders on the right, nesting indentation and the active edge marker move to the inline-start side, and the chevron rotates in the mirrored direction. Vertical arrow navigation is unaffected by direction.

```html
<div dir="rtl">
  <aegov-navblock block-title="حسابي" label-nav="تنقل الحساب" is-multiple active-border>
    <aegov-navblock-item href="#" is-active>لوحة المعلومات</aegov-navblock-item>
    <aegov-navblock-item is-open>
      الطلبات
      <aegov-navblock-item href="#">قيد الإنجاز</aegov-navblock-item>
      <aegov-navblock-item href="#">المُرسلة</aegov-navblock-item>
    </aegov-navblock-item>
    <aegov-navblock-item href="#">المستندات</aegov-navblock-item>
  </aegov-navblock>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-8">
    <div style="width: 260px;">
      <aegov-navblock field-id="nbk-rtl-1" block-title="حسابي" label-nav="تنقل الحساب" is-multiple active-border>
        <aegov-navblock-item href="#" is-active>لوحة المعلومات</aegov-navblock-item>
        <aegov-navblock-item is-open>
          الطلبات
          <aegov-navblock-item href="#">قيد الإنجاز</aegov-navblock-item>
          <aegov-navblock-item href="#">المُرسلة</aegov-navblock-item>
          <aegov-navblock-item href="#">المؤرشفة</aegov-navblock-item>
        </aegov-navblock-item>
        <aegov-navblock-item href="#">المستندات</aegov-navblock-item>
        <aegov-navblock-item href="#">الإعدادات</aegov-navblock-item>
      </aegov-navblock>
    </div>
    <div style="width: 260px;">
      <aegov-navblock field-id="nbk-rtl-2" variant="flat" label-nav="محتويات المستند" block-title="المحتويات">
        <aegov-navblock-item href="#" is-active>مقدمة</aegov-navblock-item>
        <aegov-navblock-item>
          الأهلية
          <aegov-navblock-item href="#">المتطلبات</aegov-navblock-item>
          <aegov-navblock-item href="#">الاستثناءات</aegov-navblock-item>
        </aegov-navblock-item>
      </aegov-navblock>
    </div>
  </div>
</div>

---

## API Reference

### aegov-navblock Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the `<nav>`. Auto-generated when omitted, reflected. | `string` | _generated_ |
| `labelNav` | `label-nav` | Accessible name for the `<nav>` landmark. **Set this.** | `string` | `''` |
| `blockTitle` | `block-title` | Visual heading above the list. The `title` slot takes precedence. | `string` | — |
| `variant` | `variant` | Collapsible groups, or a flat always-visible tree. Cascades to items. | `'collapsible' \| 'flat'` | `'collapsible'` |
| `isMultiple` | `is-multiple` | Allow several branches open at once. | `boolean` | `false` |
| `icon` | `icon` | Expand indicator on group items. Cascades to items. | `'chevron' \| 'plus'` | `'chevron'` |
| `size` | `size` | Size token or responsive string. Cascades to items. | `string` — `sm \| base \| lg` | `'base'` |
| `isBordered` | `is-bordered` | Border around the block. | `boolean` | `false` |
| `activeBorder` | `active-border` | Edge marker on the active item. Note: no `is` prefix. | `boolean` | `false` |

### aegov-navblock-item Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `href` | `href` | Destination. Omit to make the item a pure group header. | `string` | — |
| `target` | `target` | Native target. | `'_self' \| '_blank' \| '_parent' \| '_top'` | — |
| `rel` | `rel` | Native rel. | `string` | — |
| `isActive` | `is-active` | Marks the current page. Sets `aria-current="page"`. | `boolean` | `false` |
| `isDisabled` | `is-disabled` | Renders as non-navigating text with `aria-disabled`. | `boolean` | `false` |
| `isOpen` | `is-open` | Whether this item's children are showing. Mutable and readable from outside. | `boolean` | `false` |
| `icon`, `size`, `variant` | — | Cascaded from the navblock. | — | — |

### Slots

| Slot | On | Description |
| --- | --- | --- |
| _(default)_ | navblock | The `aegov-navblock-item` children. |
| `title` | navblock | Heading markup. Takes precedence over `blockTitle`. |
| _(default)_ | item | The item label, plus any nested `aegov-navblock-item` children. |
| `icon-start` | item | Leading icon. |
| `subnav` | item | Alternative slot for nested navigation content. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovNavblockItemToggle` | `{ open: boolean }` | A group item expanded or collapsed. Bubbles, so listen on the navblock. |

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the `<nav>` on the navblock, and to the link on an item. Prefer `labelNav` for the landmark name. |
| `data-*` | Yes | Forwarded. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host element. |

---

## Accessibility

### Built-in behaviour

- The block is a real `<nav>` landmark, named from `labelNav`, containing a real list.
- `isActive` sets `aria-current="page"` on the link — the programmatic signal for the current page.
- **Group items expose `aria-expanded`; leaf items do not.** The component uses the presence of that attribute to distinguish the two, so a toggle is never announced on a plain link.
- In `flat` variant, group headers are non-interactive rather than being focusable controls that do nothing.
- `isDisabled` produces a non-navigating element with `aria-disabled="true"`.
- Items are links, so native `Tab`, `Enter`, middle-click and right-click all work.
- Layout uses logical properties, so indentation, icons and the active marker mirror under `dir="rtl"`.

### Developer responsibilities

- **Always set `labelNav`.** A page often has several navigation landmarks; unnamed ones are indistinguishable in a screen reader's region list.
- **Expand the branch containing the active item** on load. A current page hidden inside a collapsed group is disorienting.
- **Set `isActive` on exactly one item.**
- **Do not rely on the active state being colour-only** (WCAG 2.2 SC 1.4.1). The built-in styling pairs colour with weight and, with `activeBorder`, an edge marker — keep that pairing.
- **Keep nesting to one level.** Two levels of collapsed navigation is very hard to operate.
- **Mark icons `aria-hidden="true"`.**
- **Use a [Drawer](aegov-drawer.html) on small viewports** rather than a squeezed sidebar.
- **Do not put actions in a navblock.** It is for destinations; commands belong in a [Button](aegov-button.html).
- **Give group headers meaningful labels.** "Applications" is useful; "More" is not.
- **Consider `flat` for document contents**, where seeing the whole structure is the point.

### Keyboard support

| Key | Action |
| --- | --- |
| `Tab` | Move focus to the next item or group toggle. |
| `Enter` | Follow the focused link, or toggle the focused group. |
| `Space` | Toggle the focused group. |
| `ArrowDown`, `ArrowUp` | Move between items. |

---

## Where to next

- [Navbar](aegov-navbar.html) — horizontal primary navigation.
- [Drawer](aegov-drawer.html) — the mobile container for a navblock.
- [Accordion](aegov-accordion.html) — the same collapse pattern for content rather than navigation.
- [Breadcrumbs](aegov-breadcrumbs.html) — hierarchy, alongside a sidebar.
