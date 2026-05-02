# Badge

<p class="text-lg text-aeblack-500 mb-8">A Badge is a small inline element used to label, classify, or count items. Use it to communicate status, mark counts of unread notifications, tag list rows with metadata, or annotate content with short context. Badges are intentionally compact and read alongside the content they describe rather than standing alone.</p>

## Introduction

The `aegov-badge` component renders a single inline pill containing the slotted text. The full UAE Government colour palette is available through the `color` property, and two visual treatments — `soft` and `solid` — let you tune the badge to its surroundings. An optional dismiss button turns the badge into a removable tag for filter chips and similar patterns.

```html
<aegov-badge>Default</aegov-badge>
<aegov-badge color="primary">Primary</aegov-badge>
<aegov-badge color="aegreen">Active</aegov-badge>
<aegov-badge color="aered">Suspended</aegov-badge>
<aegov-badge color="techblue">In review</aegov-badge>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-badge>Default</aegov-badge>
    <aegov-badge color="primary">Primary</aegov-badge>
    <aegov-badge color="aegreen">Active</aegov-badge>
    <aegov-badge color="aered">Suspended</aegov-badge>
    <aegov-badge color="techblue">In review</aegov-badge>
  </div>
</div>

---

## Appearance

The `appearance` property switches between two styles. `soft` (default) uses a tinted background with a darker, full-saturation label — quieter, suitable for tables and list rows. `solid` uses a fully filled colour panel with white text — louder, suitable for emphasised counters or critical statuses.

```html
<aegov-badge appearance="soft" color="aegreen">Approved</aegov-badge>
<aegov-badge appearance="solid" color="aegreen">Approved</aegov-badge>

<aegov-badge appearance="soft" color="aered">Rejected</aegov-badge>
<aegov-badge appearance="solid" color="aered">Rejected</aegov-badge>

<aegov-badge appearance="soft" color="camel">Pending</aegov-badge>
<aegov-badge appearance="solid" color="camel">Pending</aegov-badge>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3 mb-4">
    <aegov-badge appearance="soft" color="aegreen">Approved</aegov-badge>
    <aegov-badge appearance="solid" color="aegreen">Approved</aegov-badge>
    <aegov-badge appearance="soft" color="aered">Rejected</aegov-badge>
    <aegov-badge appearance="solid" color="aered">Rejected</aegov-badge>
  </div>
  <div class="flex flex-wrap items-center gap-3">
    <aegov-badge appearance="soft" color="camel">Pending</aegov-badge>
    <aegov-badge appearance="solid" color="camel">Pending</aegov-badge>
    <aegov-badge appearance="soft" color="techblue">In review</aegov-badge>
    <aegov-badge appearance="solid" color="techblue">In review</aegov-badge>
  </div>
</div>

---

## Color Palette

The `color` property accepts every token in the UAE Design System palette. Use the brand colours (`primary`, `secondary`, `aegold`, `aered`, `aegreen`, `aeblack`) for status that aligns with platform identity, and the accent colours (`techblue`, `seablue`, `camel`, `desert`, `fuchsia`, `slate`, `purple`, `pink`, `indigo`, `lime`) for richer category tagging.

```html
<aegov-badge color="primary">Primary</aegov-badge>
<aegov-badge color="secondary">Secondary</aegov-badge>
<aegov-badge color="aegold">Aegold</aegov-badge>
<aegov-badge color="aered">Aered</aegov-badge>
<aegov-badge color="aegreen">Aegreen</aegov-badge>
<aegov-badge color="aeblack">Aeblack</aegov-badge>
<aegov-badge color="techblue">Techblue</aegov-badge>
<aegov-badge color="seablue">Seablue</aegov-badge>
<aegov-badge color="camel">Camel</aegov-badge>
<aegov-badge color="desert">Desert</aegov-badge>
<aegov-badge color="fuchsia">Fuchsia</aegov-badge>
<aegov-badge color="slate">Slate</aegov-badge>
<aegov-badge color="purple">Purple</aegov-badge>
<aegov-badge color="pink">Pink</aegov-badge>
<aegov-badge color="indigo">Indigo</aegov-badge>
<aegov-badge color="lime">Lime</aegov-badge>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="font-medium mb-3">Soft appearance</p>
  <div class="flex flex-wrap items-center gap-2 mb-6">
    <aegov-badge color="default">Default</aegov-badge>
    <aegov-badge color="primary">Primary</aegov-badge>
    <aegov-badge color="secondary">Secondary</aegov-badge>
    <aegov-badge color="aegold">Aegold</aegov-badge>
    <aegov-badge color="aered">Aered</aegov-badge>
    <aegov-badge color="aegreen">Aegreen</aegov-badge>
    <aegov-badge color="aeblack">Aeblack</aegov-badge>
    <aegov-badge color="techblue">Techblue</aegov-badge>
    <aegov-badge color="seablue">Seablue</aegov-badge>
    <aegov-badge color="camel">Camel</aegov-badge>
    <aegov-badge color="desert">Desert</aegov-badge>
    <aegov-badge color="fuchsia">Fuchsia</aegov-badge>
    <aegov-badge color="slate">Slate</aegov-badge>
    <aegov-badge color="purple">Purple</aegov-badge>
    <aegov-badge color="pink">Pink</aegov-badge>
    <aegov-badge color="indigo">Indigo</aegov-badge>
    <aegov-badge color="lime">Lime</aegov-badge>
  </div>
  <p class="font-medium mb-3">Solid appearance</p>
  <div class="flex flex-wrap items-center gap-2">
    <aegov-badge appearance="solid" color="default">Default</aegov-badge>
    <aegov-badge appearance="solid" color="primary">Primary</aegov-badge>
    <aegov-badge appearance="solid" color="secondary">Secondary</aegov-badge>
    <aegov-badge appearance="solid" color="aegold">Aegold</aegov-badge>
    <aegov-badge appearance="solid" color="aered">Aered</aegov-badge>
    <aegov-badge appearance="solid" color="aegreen">Aegreen</aegov-badge>
    <aegov-badge appearance="solid" color="aeblack">Aeblack</aegov-badge>
    <aegov-badge appearance="solid" color="techblue">Techblue</aegov-badge>
    <aegov-badge appearance="solid" color="seablue">Seablue</aegov-badge>
    <aegov-badge appearance="solid" color="camel">Camel</aegov-badge>
    <aegov-badge appearance="solid" color="desert">Desert</aegov-badge>
    <aegov-badge appearance="solid" color="fuchsia">Fuchsia</aegov-badge>
    <aegov-badge appearance="solid" color="slate">Slate</aegov-badge>
    <aegov-badge appearance="solid" color="purple">Purple</aegov-badge>
    <aegov-badge appearance="solid" color="pink">Pink</aegov-badge>
    <aegov-badge appearance="solid" color="indigo">Indigo</aegov-badge>
    <aegov-badge appearance="solid" color="lime">Lime</aegov-badge>
  </div>
</div>

---

## Sizes

The `size` property controls font size, padding, and corner radius. Three tokens are available: `sm`, `base` (default), and `lg`. The `lg` token additionally bumps the font weight to medium for slightly stronger emphasis.

| Token  | Font      | Padding         | Radius        |
| ------ | --------- | --------------- | ------------- |
| `sm`   | `text-xs` | `py-0.5 px-1.5` | `rounded-sm`  |
| `base` | `text-sm` | `py-0.5 px-1.5` | `rounded-md`  |
| `lg`   | `text-sm` | `py-1 px-2`     | `rounded-md`, `font-medium` |

```html
<aegov-badge size="sm" color="primary">Small</aegov-badge>
<aegov-badge size="base" color="primary">Base</aegov-badge>
<aegov-badge size="lg" color="primary">Large</aegov-badge>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-badge size="sm" color="primary">Small</aegov-badge>
    <aegov-badge size="base" color="primary">Base</aegov-badge>
    <aegov-badge size="lg" color="primary">Large</aegov-badge>
  </div>
</div>

### Responsive sizes

`size` also accepts a Tailwind-style responsive string with breakpoint prefixes `xs`, `sm`, `md`, `lg`, `xl`, and `2xl`. Each segment overrides smaller breakpoints.

```html
<aegov-badge size="sm md:base xl:lg" color="techblue">
  Resizes with the viewport
</aegov-badge>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-badge size="sm md:base xl:lg" color="techblue">Resizes with the viewport</aegov-badge>
</div>

---

## Dismissible Badge

Set `is-dismissible` to render a close button at the trailing edge of the badge. Clicking it emits the `aegovBadgeDismiss` event. The badge does not remove itself from the DOM — your application decides what to do (most commonly, remove the host element from a list of active filters).

```html
<aegov-badge color="techblue" is-dismissible>
  Filter: Abu Dhabi
</aegov-badge>
<aegov-badge color="techblue" is-dismissible>
  Filter: Dubai
</aegov-badge>
<aegov-badge color="techblue" is-dismissible>
  Filter: Sharjah
</aegov-badge>

<script>
  document.querySelectorAll('aegov-badge[is-dismissible]').forEach(b => {
    b.addEventListener('aegovBadgeDismiss', () => b.remove());
  });
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="text-sm text-aeblack-500 mb-3">Active filters</p>
  <div class="flex flex-wrap items-center gap-2">
    <aegov-badge color="techblue" is-dismissible>Abu Dhabi</aegov-badge>
    <aegov-badge color="techblue" is-dismissible>Dubai</aegov-badge>
    <aegov-badge color="techblue" is-dismissible>Sharjah</aegov-badge>
    <aegov-badge color="techblue" is-dismissible>Ajman</aegov-badge>
  </div>
</div>

---

## Status Indicators

A common badge use is to mark the status of a row in a service list — application progress, account state, document validity, and so on. Pair colours consistently across your application so users learn the meaning at a glance.

```html
<aegov-badge color="aegreen">Active</aegov-badge>
<aegov-badge color="camel">Pending</aegov-badge>
<aegov-badge color="aered">Suspended</aegov-badge>
<aegov-badge color="slate">Archived</aegov-badge>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <ul class="divide-y divide-aeblack-100">
    <li class="flex items-center justify-between py-3">
      <span>Emirates ID renewal</span>
      <aegov-badge color="aegreen">Active</aegov-badge>
    </li>
    <li class="flex items-center justify-between py-3">
      <span>Driving licence transfer</span>
      <aegov-badge color="camel">Pending</aegov-badge>
    </li>
    <li class="flex items-center justify-between py-3">
      <span>Vehicle registration</span>
      <aegov-badge color="aered">Expired</aegov-badge>
    </li>
    <li class="flex items-center justify-between py-3">
      <span>Old passport application</span>
      <aegov-badge color="slate">Archived</aegov-badge>
    </li>
  </ul>
</div>

---

## Counters

Small solid badges work well as numerical counters next to navigation items, tabs, or icons. Use `size="sm"` for the most common counter footprint.

```html
<button class="relative">
  Inbox
  <aegov-badge appearance="solid" color="aered" size="sm">12</aegov-badge>
</button>
<button class="relative">
  Notifications
  <aegov-badge appearance="solid" color="primary" size="sm">3</aegov-badge>
</button>
<button class="relative">
  Pending tasks
  <aegov-badge appearance="solid" color="camel" size="sm">5</aegov-badge>
</button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-6">
    <span class="inline-flex items-center gap-2">Inbox <aegov-badge appearance="solid" color="aered" size="sm">12</aegov-badge></span>
    <span class="inline-flex items-center gap-2">Notifications <aegov-badge appearance="solid" color="primary" size="sm">3</aegov-badge></span>
    <span class="inline-flex items-center gap-2">Pending tasks <aegov-badge appearance="solid" color="camel" size="sm">5</aegov-badge></span>
    <span class="inline-flex items-center gap-2">Drafts <aegov-badge appearance="solid" color="slate" size="sm">2</aegov-badge></span>
  </div>
</div>

---

## RTL Support

The badge is direction-agnostic. The dismiss button uses logical inline padding, so in `dir="rtl"` containers it automatically renders on the inline-end (visually the left side). No extra configuration is required — pass real Arabic content into the slot and the layout flips correctly.

```html
<div dir="rtl">
  <aegov-badge color="aegreen">نشِط</aegov-badge>
  <aegov-badge color="camel">قيد الانتظار</aegov-badge>
  <aegov-badge color="aered">موقوف</aegov-badge>
  <aegov-badge color="techblue" is-dismissible>تصنيف: أبوظبي</aegov-badge>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3 mb-6">
    <aegov-badge color="aegreen">نشِط</aegov-badge>
    <aegov-badge color="camel">قيد الانتظار</aegov-badge>
    <aegov-badge color="aered">موقوف</aegov-badge>
    <aegov-badge color="slate">مؤرشف</aegov-badge>
  </div>
  <p class="text-sm text-aeblack-500 mb-3">المُرشِّحات النشِطة</p>
  <div class="flex flex-wrap items-center gap-2">
    <aegov-badge color="techblue" is-dismissible>أبوظبي</aegov-badge>
    <aegov-badge color="techblue" is-dismissible>دبي</aegov-badge>
    <aegov-badge color="techblue" is-dismissible>الشارقة</aegov-badge>
  </div>
</div>

---

## API Reference

### Properties

| Property        | Attribute        | Description                                                          | Type                                                                                                                                                                       | Default     |
| --------------- | ---------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `fieldId`       | `field-id`       | Unique ID for the badge element. Auto-generated if omitted.          | `string`                                                                                                                                                                   | _generated_ |
| `appearance`    | `appearance`     | Visual style — `soft` (tinted) or `solid` (filled).                  | `'soft' \| 'solid'`                                                                                                                                                        | `'soft'`    |
| `color`         | `color`          | Colour token from the UAE Design System palette.                     | `'default' \| 'primary' \| 'secondary' \| 'aegold' \| 'aered' \| 'aegreen' \| 'aeblack' \| 'techblue' \| 'seablue' \| 'camel' \| 'desert' \| 'fuchsia' \| 'slate' \| 'purple' \| 'pink' \| 'indigo' \| 'lime'` | `'default'` |
| `size`          | `size`           | Size token (`sm`, `base`, `lg`) or responsive string.                | `string`                                                                                                                                                                   | `'base'`    |
| `isDismissible` | `is-dismissible` | When `true`, renders a close button.                                 | `boolean`                                                                                                                                                                  | `false`     |

### Slots

| Slot        | Description                                       |
| ----------- | ------------------------------------------------- |
| _(default)_ | The badge label. Plain text or simple inline HTML. |

### Events

| Event                | Detail | Description                                         |
| -------------------- | ------ | --------------------------------------------------- |
| `aegovBadgeDismiss`  | `void` | Fired when the dismiss button is clicked.           |

#### Listening for dismiss events

```html
<aegov-badge id="filter-region" color="techblue" is-dismissible>
  Region: Abu Dhabi
</aegov-badge>

<script>
  document.querySelector('#filter-region').addEventListener('aegovBadgeDismiss', () => {
    // Remove the badge from the DOM, or update application state
    document.querySelector('#filter-region').remove();
  });
</script>
```

### Pass-through Attributes

Pass-through attributes set on `<aegov-badge>` are forwarded to the inner `<span>` so they end up on the rendered badge element rather than the host wrapper.

| Attribute group  | Forwarded? | Notes                                                                  |
| ---------------- | ---------- | ---------------------------------------------------------------------- |
| `aria-*`         | Yes        | Forwarded to the inner `<span>` for accessibility annotations.         |
| `data-*`         | Yes        | Forwarded to the inner `<span>` for analytics or styling hooks.        |
| `id`             | n/a        | Use `field-id` on the host. The inner `<span>` reflects that value.    |
| `class`, `style` | Allowed    | Applied to the host element only.                                      |

---

## Accessibility

### Built-in behaviour

- The dismiss button is a real `<button type="button">` and is reachable with the keyboard.
- The dismiss button has `aria-label="Badge dismiss button"` so screen reader users know its purpose.
- The dismiss SVG is marked `aria-hidden="true"`.
- The dismiss-click handler calls `event.stopPropagation()`, so a parent click handler does not also fire when the badge is dismissed.

### Developer responsibilities

- Provide meaningful text inside the badge — colour alone is not sufficient to convey status. Pair colour with explicit words such as "Active", "Pending", or "Suspended".
- For badges acting as numerical counters (e.g. unread messages), set a more descriptive `aria-label` on the host so the count is announced in context: `<aegov-badge aria-label="3 unread messages">3</aegov-badge>`.
- If the badge represents a value that changes over time, consider wrapping it (or its surrounding container) in an `aria-live="polite"` region.
- Removing the badge from the DOM after dismiss is the consumer's responsibility — the component does not auto-remove itself.

### Keyboard support

| Key              | Action                                          |
| ---------------- | ----------------------------------------------- |
| `Tab`            | Move focus to the dismiss button (when present). |
| `Enter`, `Space` | Activate the dismiss button.                    |
