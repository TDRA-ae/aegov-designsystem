# Badge

<p class="text-lg text-aeblack-500 mb-8">A Badge is a small inline element used to label, classify, or count. Use it to show the status of a row, tag content with metadata, mark a count of unread items, or build removable filter chips. Badges are deliberately compact and read alongside the content they describe rather than standing alone.</p>

## Introduction

`aegov-badge` renders a single inline pill containing the slotted text. The full UAE Government palette is available through `variant`, and `appearance` tunes the badge to its surroundings. An optional dismiss button turns it into a removable chip.

```html
<aegov-badge>Default</aegov-badge>
<aegov-badge variant="primary">Primary</aegov-badge>
<aegov-badge variant="aegreen">Active</aegov-badge>
<aegov-badge variant="aered">Suspended</aegov-badge>
<aegov-badge variant="techblue">In review</aegov-badge>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-badge>Default</aegov-badge>
    <aegov-badge variant="primary">Primary</aegov-badge>
    <aegov-badge variant="aegreen">Active</aegov-badge>
    <aegov-badge variant="aered">Suspended</aegov-badge>
    <aegov-badge variant="techblue">In review</aegov-badge>
  </div>
</div>

---

## Appearance

`appearance` switches between two treatments. `soft` uses a tinted background with a darker, full-saturation label — quieter, suitable for tables and list rows. `solid` uses a filled panel with light text — louder, suitable for counters and critical statuses.

```html
<aegov-badge appearance="soft" variant="aegreen">Approved</aegov-badge>
<aegov-badge appearance="solid" variant="aegreen">Approved</aegov-badge>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3 mb-4">
    <aegov-badge appearance="soft" variant="aegreen">Approved</aegov-badge>
    <aegov-badge appearance="solid" variant="aegreen">Approved</aegov-badge>
    <aegov-badge appearance="soft" variant="aered">Rejected</aegov-badge>
    <aegov-badge appearance="solid" variant="aered">Rejected</aegov-badge>
  </div>
  <div class="flex flex-wrap items-center gap-3">
    <aegov-badge appearance="soft" variant="camel">Pending</aegov-badge>
    <aegov-badge appearance="solid" variant="camel">Pending</aegov-badge>
    <aegov-badge appearance="soft" variant="techblue">In review</aegov-badge>
    <aegov-badge appearance="solid" variant="techblue">In review</aegov-badge>
  </div>
</div>

---

## Variant — the colour palette

`variant` accepts every token in the UAE Design System palette. Use the brand colours for status aligned with platform identity, and the accent colours for richer category tagging.

```html
<aegov-badge variant="primary">Primary</aegov-badge>
<aegov-badge variant="secondary">Secondary</aegov-badge>
<aegov-badge variant="aegold">Aegold</aegov-badge>
<aegov-badge variant="aered">Aered</aegov-badge>
<aegov-badge variant="aegreen">Aegreen</aegov-badge>
<aegov-badge variant="aeblack">Aeblack</aegov-badge>
<aegov-badge variant="techblue">Techblue</aegov-badge>
<aegov-badge variant="seablue">Seablue</aegov-badge>
<aegov-badge variant="camel">Camel</aegov-badge>
<aegov-badge variant="desert">Desert</aegov-badge>
<aegov-badge variant="fuchsia">Fuchsia</aegov-badge>
<aegov-badge variant="slate">Slate</aegov-badge>
<aegov-badge variant="purple">Purple</aegov-badge>
<aegov-badge variant="pink">Pink</aegov-badge>
<aegov-badge variant="indigo">Indigo</aegov-badge>
<aegov-badge variant="lime">Lime</aegov-badge>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="font-medium mb-3">Soft appearance</p>
  <div class="flex flex-wrap items-center gap-2 mb-6">
    <aegov-badge variant="default">Default</aegov-badge>
    <aegov-badge variant="primary">Primary</aegov-badge>
    <aegov-badge variant="secondary">Secondary</aegov-badge>
    <aegov-badge variant="aegold">Aegold</aegov-badge>
    <aegov-badge variant="aered">Aered</aegov-badge>
    <aegov-badge variant="aegreen">Aegreen</aegov-badge>
    <aegov-badge variant="aeblack">Aeblack</aegov-badge>
    <aegov-badge variant="techblue">Techblue</aegov-badge>
    <aegov-badge variant="seablue">Seablue</aegov-badge>
    <aegov-badge variant="camel">Camel</aegov-badge>
    <aegov-badge variant="desert">Desert</aegov-badge>
    <aegov-badge variant="fuchsia">Fuchsia</aegov-badge>
    <aegov-badge variant="slate">Slate</aegov-badge>
    <aegov-badge variant="purple">Purple</aegov-badge>
    <aegov-badge variant="pink">Pink</aegov-badge>
    <aegov-badge variant="indigo">Indigo</aegov-badge>
    <aegov-badge variant="lime">Lime</aegov-badge>
  </div>
  <p class="font-medium mb-3">Solid appearance</p>
  <div class="flex flex-wrap items-center gap-2">
    <aegov-badge appearance="solid" variant="default">Default</aegov-badge>
    <aegov-badge appearance="solid" variant="primary">Primary</aegov-badge>
    <aegov-badge appearance="solid" variant="secondary">Secondary</aegov-badge>
    <aegov-badge appearance="solid" variant="aegold">Aegold</aegov-badge>
    <aegov-badge appearance="solid" variant="aered">Aered</aegov-badge>
    <aegov-badge appearance="solid" variant="aegreen">Aegreen</aegov-badge>
    <aegov-badge appearance="solid" variant="aeblack">Aeblack</aegov-badge>
    <aegov-badge appearance="solid" variant="techblue">Techblue</aegov-badge>
    <aegov-badge appearance="solid" variant="seablue">Seablue</aegov-badge>
    <aegov-badge appearance="solid" variant="camel">Camel</aegov-badge>
    <aegov-badge appearance="solid" variant="desert">Desert</aegov-badge>
    <aegov-badge appearance="solid" variant="fuchsia">Fuchsia</aegov-badge>
    <aegov-badge appearance="solid" variant="slate">Slate</aegov-badge>
    <aegov-badge appearance="solid" variant="purple">Purple</aegov-badge>
    <aegov-badge appearance="solid" variant="pink">Pink</aegov-badge>
    <aegov-badge appearance="solid" variant="indigo">Indigo</aegov-badge>
    <aegov-badge appearance="solid" variant="lime">Lime</aegov-badge>
  </div>
</div>

### A note on `color`

An older `color` property exists and is **deprecated**. It still works, and if you set both, `color` takes precedence over `variant` — which makes mixed usage confusing. Use `variant` and remove `color` from existing markup.

```html
<!-- Correct -->
<aegov-badge variant="aegreen">Active</aegov-badge>

<!-- Deprecated: still works, but overrides variant -->
<aegov-badge color="aegreen">Active</aegov-badge>
```

Note that on `aegov-badge`, unlike most components, `variant` selects a **palette colour** rather than one of the four semantic form variants. Badges are classification chrome, so the whole palette is legitimately in scope.

---

## Sizes

`size` controls font size, padding and corner radius. The `lg` token also raises the font weight slightly.

| Token | Font | Padding | Radius |
| --- | --- | --- | --- |
| `sm` | `text-xs` | `py-0.5 px-1.5` | `rounded-sm` |
| `base` | `text-sm` | `py-0.5 px-1.5` | `rounded-md` |
| `lg` | `text-sm` | `py-1 px-2` | `rounded-md`, medium weight |

```html
<aegov-badge size="sm" variant="primary">Small</aegov-badge>
<aegov-badge size="base" variant="primary">Base</aegov-badge>
<aegov-badge size="lg" variant="primary">Large</aegov-badge>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-badge size="sm" variant="primary">Small</aegov-badge>
    <aegov-badge size="base" variant="primary">Base</aegov-badge>
    <aegov-badge size="lg" variant="primary">Large</aegov-badge>
  </div>
</div>

### Responsive sizes

`size` accepts a responsive string with the prefixes `xs`, `sm`, `md`, `lg`, `xl` and `2xl`.

```html
<aegov-badge size="sm md:base xl:lg" variant="techblue">Resizes with the viewport</aegov-badge>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-badge size="sm md:base xl:lg" variant="techblue">Resizes with the viewport</aegov-badge>
</div>

---

## Dismissible badges

`is-dismissible` renders a close button at the trailing edge. Clicking it emits `aegovBadgeDismiss`. **The badge does not remove itself** — your application decides what happens, which is what makes it usable as a filter chip bound to real state.

```html
<aegov-badge variant="techblue" is-dismissible>Filter: Abu Dhabi</aegov-badge>
<aegov-badge variant="techblue" is-dismissible>Filter: Dubai</aegov-badge>

<script>
  document.querySelectorAll('aegov-badge[is-dismissible]').forEach((b) => {
    b.addEventListener('aegovBadgeDismiss', () => b.remove());
  });
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="text-sm text-aeblack-500 mb-3">Active filters</p>
  <div class="flex flex-wrap items-center gap-2">
    <aegov-badge variant="techblue" is-dismissible>Abu Dhabi</aegov-badge>
    <aegov-badge variant="techblue" is-dismissible>Dubai</aegov-badge>
    <aegov-badge variant="techblue" is-dismissible>Sharjah</aegov-badge>
    <aegov-badge variant="techblue" is-dismissible>Ajman</aegov-badge>
  </div>
</div>

The dismiss button's `aria-label` is **context-aware**: it includes the badge's own text, so a screen reader announces "Dismiss Abu Dhabi" rather than a generic "Close". With no text content it falls back to a translated "Dismiss badge".

---

## Badges with icons

Slot an inline `<svg>` before the label. The badge sizes leading media from the `size` token — `size-3` at `sm`, `size-3.5` at `base`, `size-4` at `lg` — so you do not declare dimensions.

```html
<aegov-badge variant="aegreen">
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 0 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z" clip-rule="evenodd" />
  </svg>
  Active
</aegov-badge>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3 mb-6">
    <aegov-badge variant="aegreen">
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 0 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z" clip-rule="evenodd" /></svg>
      Active
    </aegov-badge>
    <aegov-badge variant="camel">
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .2.08.39.22.53l3 3a.75.75 0 1 0 1.06-1.06L10.75 9.69V5Z" clip-rule="evenodd" /></svg>
      Pending
    </aegov-badge>
    <aegov-badge variant="aered">
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" /></svg>
      Rejected
    </aegov-badge>
    <aegov-badge appearance="solid" variant="aegold">
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10.87 2.88c-.32-.77-1.42-.77-1.74 0l-1.83 4.4-4.75.38c-.83.07-1.17 1.11-.54 1.65l3.62 3.1-1.1 4.64c-.2.81.69 1.46 1.4 1.02L10 15.59l4.07 2.49c.71.43 1.6-.21 1.4-1.02l-1.1-4.64 3.62-3.1c.63-.55.3-1.59-.54-1.65l-4.75-.38-1.83-4.4Z" /></svg>
      Featured
    </aegov-badge>
  </div>
  <div class="flex flex-wrap items-center gap-3">
    <aegov-badge variant="aegreen" size="sm">
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 0 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z" clip-rule="evenodd" /></svg>
      Small
    </aegov-badge>
    <aegov-badge variant="techblue" size="lg">
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0Zm-9-3a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm.75 3a.75.75 0 0 0 0 1.5v2.25a.75.75 0 0 0 1.5 0V10.75a.75.75 0 0 0-.75-.75h-.75Z" clip-rule="evenodd" /></svg>
      Large
    </aegov-badge>
  </div>
</div>

Mark decorative icons `aria-hidden="true"` — the badge text is the accessible label.

---

## Status indicators

The most common use: marking the state of a row in a service list. Pair colours consistently across a service so users learn the meaning at a glance.

```html
<aegov-badge variant="aegreen">Active</aegov-badge>
<aegov-badge variant="camel">Pending</aegov-badge>
<aegov-badge variant="aered">Expired</aegov-badge>
<aegov-badge variant="slate">Archived</aegov-badge>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <ul class="divide-y divide-aeblack-100">
    <li class="flex items-center justify-between py-3"><span>Emirates ID renewal</span><aegov-badge variant="aegreen">Active</aegov-badge></li>
    <li class="flex items-center justify-between py-3"><span>Driving licence transfer</span><aegov-badge variant="camel">Pending</aegov-badge></li>
    <li class="flex items-center justify-between py-3"><span>Vehicle registration</span><aegov-badge variant="aered">Expired</aegov-badge></li>
    <li class="flex items-center justify-between py-3"><span>Old passport application</span><aegov-badge variant="slate">Archived</aegov-badge></li>
  </ul>
</div>

---

## Counters

Small solid badges work as counters beside navigation items, tabs or icons. `size="sm"` is the usual footprint.

```html
<span class="inline-flex items-center gap-2">
  Inbox
  <aegov-badge appearance="solid" variant="aered" size="sm" aria-label="12 unread messages">12</aegov-badge>
</span>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-6">
    <span class="inline-flex items-center gap-2">Inbox <aegov-badge appearance="solid" variant="aered" size="sm" aria-label="12 unread messages">12</aegov-badge></span>
    <span class="inline-flex items-center gap-2">Notifications <aegov-badge appearance="solid" variant="primary" size="sm" aria-label="3 new notifications">3</aegov-badge></span>
    <span class="inline-flex items-center gap-2">Pending tasks <aegov-badge appearance="solid" variant="camel" size="sm" aria-label="5 pending tasks">5</aegov-badge></span>
    <span class="inline-flex items-center gap-2">Drafts <aegov-badge appearance="solid" variant="slate" size="sm" aria-label="2 drafts">2</aegov-badge></span>
  </div>
</div>

A bare number is meaningless out of context, so set `aria-label` on the host — it is forwarded to the rendered element — giving the count its subject: "12 unread messages".

---

## RTL Support

The badge is direction-agnostic. The dismiss button uses logical inline padding, so in a `dir="rtl"` container it renders on the inline-end edge — visually the left — with no configuration. Leading icons flip with the content. The dismiss button's fallback `aria-label` is translated automatically ("إغلاق الشارة").

```html
<div dir="rtl">
  <aegov-badge variant="aegreen">نشِط</aegov-badge>
  <aegov-badge variant="camel">قيد الانتظار</aegov-badge>
  <aegov-badge variant="aered">موقوف</aegov-badge>
  <aegov-badge variant="techblue" is-dismissible>تصنيف: أبوظبي</aegov-badge>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3 mb-6">
    <aegov-badge variant="aegreen">نشِط</aegov-badge>
    <aegov-badge variant="camel">قيد الانتظار</aegov-badge>
    <aegov-badge variant="aered">موقوف</aegov-badge>
    <aegov-badge variant="slate">مؤرشف</aegov-badge>
  </div>
  <p class="text-sm text-aeblack-500 mb-3">المُرشِّحات النشِطة</p>
  <div class="flex flex-wrap items-center gap-2">
    <aegov-badge variant="techblue" is-dismissible>أبوظبي</aegov-badge>
    <aegov-badge variant="techblue" is-dismissible>دبي</aegov-badge>
    <aegov-badge variant="techblue" is-dismissible>الشارقة</aegov-badge>
  </div>
</div>

Counter numerals are your content — use Arabic-Indic digits where the rest of your Arabic copy does.

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the inner `<span>`. Auto-generated when omitted. | `string` | _generated_ |
| `appearance` | `appearance` | Visual treatment. | `'soft' \| 'solid'` | `'soft'` |
| `variant` | `variant` | Palette colour token. | `'default' \| 'primary' \| 'secondary' \| 'aegold' \| 'aered' \| 'aegreen' \| 'aeblack' \| 'techblue' \| 'seablue' \| 'camel' \| 'desert' \| 'fuchsia' \| 'slate' \| 'purple' \| 'pink' \| 'indigo' \| 'lime'` | `'default'` |
| `color` | `color` | **Deprecated** — use `variant`. Overrides `variant` when set. | same as `variant` | — |
| `size` | `size` | Size token or responsive string. | `string` — `sm \| base \| lg` | `'base'` |
| `isDismissible` | `is-dismissible` | Renders a close button. | `boolean` | `false` |

An invalid `variant` falls back to `default` and logs a console warning in development.

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | The badge label — plain text, or an inline `<svg>` followed by text. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovBadgeDismiss` | `void` | The dismiss button was activated. The badge does **not** remove itself. |

```html
<aegov-badge id="filter-region" variant="techblue" is-dismissible>Region: Abu Dhabi</aegov-badge>

<script type="module">
  const badge = document.querySelector('#filter-region');
  badge.addEventListener('aegovBadgeDismiss', () => {
    removeFilter('region');
    badge.remove();
  });
</script>
```

### Pass-through Attributes

Attributes set on the host are forwarded to the inner `<span>`, so they land on the rendered badge rather than the wrapper.

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the inner `<span>` — this is how `aria-label` gives a counter its subject. |
| `data-*` | Yes | Forwarded for analytics or styling hooks. |
| `id` | n/a | Use `field-id`; the inner `<span>` reflects it. |
| `class`, `style` | Allowed | Applied to the host element only. |

---

## Accessibility

### Built-in behaviour

- The dismiss button is a real `<button type="button">` and is fully keyboard operable.
- Its `aria-label` is **context-aware**, incorporating the badge's own text so a screen reader announces "Dismiss Approved" rather than a generic label. With no text it falls back to a translated "Dismiss badge".
- The dismiss button has a minimum target of **24 × 24 CSS px** at every size token, satisfying WCAG 2.2 SC 2.5.8.
- The dismiss icon is marked `aria-hidden="true"` — all meaning is in the button's label.
- The dismiss handler calls `stopPropagation()`, so a click handler on a parent row does not also fire when the badge is dismissed.
- `aria-*` attributes on the host reach the rendered element.

### Developer responsibilities

- **Never rely on colour alone to convey status** (WCAG 2.2 SC 1.4.1). Pair the colour with an explicit word — "Active", "Pending", "Suspended". A green dot with no text is not a status.
- **Give counters an `aria-label`** on the host, so "12" is announced as "12 unread messages".
- **Wrap changing values in a live region** — the badge itself does not announce updates. A count that changes silently is invisible to a screen reader user.
- **Remove the badge yourself** after `aegovBadgeDismiss`; the component only reports the intent.
- **Mark decorative icons `aria-hidden="true"`.**
- **Do not use a badge as a button.** If it performs an action, use a [Button](aegov-button.html) — a badge is not focusable and has no role.
- **Keep labels short.** A badge that wraps to two lines is a [Callout](aegov-callout.html) in the wrong clothes.
- **Verify contrast if you diverge from the palette.** The built-in pairings are checked; a custom background is your responsibility (4.5:1 for text at these sizes).

### Keyboard support

| Key | Action |
| --- | --- |
| `Tab` | Move focus to the dismiss button, when present. The badge itself is not focusable. |
| `Enter`, `Space` | Activate the dismiss button. |

---

## Where to next

- [Callout](aegov-callout.html) — for a message that needs more than a word.
- [Banner](aegov-banner.html) — for page-level announcements.
- [Toast](aegov-toast.html) — for transient confirmations.
- [Button](aegov-button.html) — when the chip needs to be actionable.
