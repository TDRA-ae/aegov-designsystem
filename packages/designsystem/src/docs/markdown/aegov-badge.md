# Badge

<p class="text-lg text-aeblack-500 mb-8">A Badge is a small inline element used to label, classify, or count items. Use it to communicate status, mark counts of unread notifications, tag list rows with metadata, or annotate content with short context. Badges are intentionally compact and read alongside the content they describe rather than standing alone.</p>

## Introduction

The `aegov-badge` component renders a single inline pill containing the slotted text. The full UAE Government colour palette is available through the `variant` property, and two visual treatments — `soft` and `solid` — let you tune the badge to its surroundings. An optional dismiss button turns the badge into a removable tag for filter chips and similar patterns.

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

The `appearance` property switches between two styles. `soft` (default) uses a tinted background with a darker, full-saturation label — quieter, suitable for tables and list rows. `solid` uses a fully filled colour panel with white text — louder, suitable for emphasised counters or critical statuses.

```html
<aegov-badge appearance="soft" variant="aegreen">Approved</aegov-badge>
<aegov-badge appearance="solid" variant="aegreen">Approved</aegov-badge>

<aegov-badge appearance="soft" variant="aered">Rejected</aegov-badge>
<aegov-badge appearance="solid" variant="aered">Rejected</aegov-badge>

<aegov-badge appearance="soft" variant="camel">Pending</aegov-badge>
<aegov-badge appearance="solid" variant="camel">Pending</aegov-badge>
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

## Color Palette

The `variant` property accepts every token in the UAE Design System palette. Use the brand colours (`primary`, `secondary`, `aegold`, `aered`, `aegreen`, `aeblack`) for status that aligns with platform identity, and the accent colours (`techblue`, `seablue`, `camel`, `desert`, `fuchsia`, `slate`, `purple`, `pink`, `indigo`, `lime`) for richer category tagging.

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

---

## Sizes

The `size` property controls font size, padding, and corner radius. Three tokens are available: `sm`, `base` (default), and `lg`. The `lg` token additionally bumps the font weight to medium for slightly stronger emphasis.

| Token  | Font      | Padding         | Radius        |
| ------ | --------- | --------------- | ------------- |
| `sm`   | `text-xs` | `py-0.5 px-1.5` | `rounded-sm`  |
| `base` | `text-sm` | `py-0.5 px-1.5` | `rounded-md`  |
| `lg`   | `text-sm` | `py-1 px-2`     | `rounded-md`, `font-medium` |

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

`size` also accepts a Tailwind-style responsive string with breakpoint prefixes `xs`, `sm`, `md`, `lg`, `xl`, and `2xl`. Each segment overrides smaller breakpoints.

```html
<aegov-badge size="sm md:base xl:lg" variant="techblue">
  Resizes with the viewport
</aegov-badge>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-badge size="sm md:base xl:lg" variant="techblue">Resizes with the viewport</aegov-badge>
</div>

---

## Dismissible Badge

Set `is-dismissible` to render a close button at the trailing edge of the badge. Clicking it emits the `aegovBadgeDismiss` event. The badge does not remove itself from the DOM — your application decides what to do (most commonly, remove the host element from a list of active filters).

```html
<aegov-badge variant="techblue" is-dismissible>
  Filter: Abu Dhabi
</aegov-badge>
<aegov-badge variant="techblue" is-dismissible>
  Filter: Dubai
</aegov-badge>
<aegov-badge variant="techblue" is-dismissible>
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
    <aegov-badge variant="techblue" is-dismissible>Abu Dhabi</aegov-badge>
    <aegov-badge variant="techblue" is-dismissible>Dubai</aegov-badge>
    <aegov-badge variant="techblue" is-dismissible>Sharjah</aegov-badge>
    <aegov-badge variant="techblue" is-dismissible>Ajman</aegov-badge>
  </div>
</div>

---

## Badges with Icons

Slot an inline `<svg>` or `<img>` before the label to reinforce meaning visually. The badge sizes leading media automatically based on the `size` prop — `size-3` for `sm`, `size-3.5` for `base`, `size-4` for `lg` — so you do not have to declare width/height on the element. Mark decorative icons with `aria-hidden="true"` so screen readers read only the text label.

```html
<aegov-badge variant="aegreen">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42L8.5 12.085l6.79-6.795a1 1 0 011.414 0z" clip-rule="evenodd" />
  </svg>
  Active
</aegov-badge>

<aegov-badge variant="camel">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .2.08.39.22.53l3 3a.75.75 0 101.06-1.06L10.75 9.69V5z" clip-rule="evenodd" />
  </svg>
  Pending
</aegov-badge>

<aegov-badge variant="aered">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M18 10A8 8 0 11.999 9.999 8 8 0 0118 10zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
  </svg>
  Rejected
</aegov-badge>

<aegov-badge variant="techblue">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M18 10A8 8 0 11.999 9.999 8 8 0 0118 10zM8.94 6.94a.75.75 0 11-1.06-1.06 3 3 0 014.55 3.9c-.27.42-.65.75-.97 1.03-.41.36-.59.55-.63.78-.05.4-.4.69-.78.65-.4-.04-.69-.4-.65-.78.13-1 .81-1.58 1.24-1.94l.18-.16c.62-.61.83-1.5.39-2.16a1.5 1.5 0 00-2.27-.25zM11 13a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd" />
  </svg>
  In review
</aegov-badge>

<aegov-badge appearance="solid" variant="aegreen">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42L8.5 12.085l6.79-6.795a1 1 0 011.414 0z" clip-rule="evenodd" />
  </svg>
  Verified
</aegov-badge>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="font-medium mb-3">Soft</p>
  <div class="flex flex-wrap items-center gap-3 mb-6">
    <aegov-badge variant="aegreen">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42L8.5 12.085l6.79-6.795a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
      Active
    </aegov-badge>
    <aegov-badge variant="camel">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .2.08.39.22.53l3 3a.75.75 0 101.06-1.06L10.75 9.69V5z" clip-rule="evenodd" />
      </svg>
      Pending
    </aegov-badge>
    <aegov-badge variant="aered">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M18 10A8 8 0 11.999 9.999 8 8 0 0118 10zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
      </svg>
      Rejected
    </aegov-badge>
    <aegov-badge variant="techblue">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M18 10A8 8 0 11.999 9.999 8 8 0 0118 10zM8.94 6.94a.75.75 0 11-1.06-1.06 3 3 0 014.55 3.9c-.27.42-.65.75-.97 1.03-.41.36-.59.55-.63.78-.05.4-.4.69-.78.65-.4-.04-.69-.4-.65-.78.13-1 .81-1.58 1.24-1.94l.18-.16c.62-.61.83-1.5.39-2.16a1.5 1.5 0 00-2.27-.25zM11 13a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd" />
      </svg>
      In review
    </aegov-badge>
    <aegov-badge variant="aegold">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.651l-4.752-.381-1.831-4.401z" />
      </svg>
      Featured
    </aegov-badge>
  </div>
  <div class="flex flex-wrap items-center gap-3 mb-6">
    <aegov-badge variant="aegreen" size="sm">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42L8.5 12.085l6.79-6.795a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
      Active
    </aegov-badge>
    <aegov-badge variant="camel" size="sm">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .2.08.39.22.53l3 3a.75.75 0 101.06-1.06L10.75 9.69V5z" clip-rule="evenodd" />
      </svg>
      Pending
    </aegov-badge>
    <aegov-badge variant="aered" size="sm">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M18 10A8 8 0 11.999 9.999 8 8 0 0118 10zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
      </svg>
      Rejected
    </aegov-badge>
    <aegov-badge variant="techblue" size="sm">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M18 10A8 8 0 11.999 9.999 8 8 0 0118 10zM8.94 6.94a.75.75 0 11-1.06-1.06 3 3 0 014.55 3.9c-.27.42-.65.75-.97 1.03-.41.36-.59.55-.63.78-.05.4-.4.69-.78.65-.4-.04-.69-.4-.65-.78.13-1 .81-1.58 1.24-1.94l.18-.16c.62-.61.83-1.5.39-2.16a1.5 1.5 0 00-2.27-.25zM11 13a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd" />
      </svg>
      In review
    </aegov-badge>
    <aegov-badge variant="aegold" size="sm">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.651l-4.752-.381-1.831-4.401z" />
      </svg>
      Featured
    </aegov-badge>
  </div>
  <p class="font-medium mb-3">Solid</p>
  <div class="flex flex-wrap items-center gap-3">
    <aegov-badge appearance="solid" variant="aegreen">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42L8.5 12.085l6.79-6.795a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
      Verified
    </aegov-badge>
    <aegov-badge appearance="solid" variant="aered">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
      </svg>
      Blocked
    </aegov-badge>
    <aegov-badge appearance="solid" variant="techblue">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
      </svg>
      Public
    </aegov-badge>
    <aegov-badge appearance="solid" variant="aegold">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.651l-4.752-.381-1.831-4.401z" clip-rule="evenodd" />
      </svg>
      Featured
    </aegov-badge>
  </div>
</div>

---

## Status Indicators

A common badge use is to mark the status of a row in a service list — application progress, account state, document validity, and so on. Pair colours consistently across your application so users learn the meaning at a glance.

```html
<aegov-badge variant="aegreen">Active</aegov-badge>
<aegov-badge variant="camel">Pending</aegov-badge>
<aegov-badge variant="aered">Suspended</aegov-badge>
<aegov-badge variant="slate">Archived</aegov-badge>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <ul class="divide-y divide-aeblack-100">
    <li class="flex items-center justify-between py-3">
      <span>Emirates ID renewal</span>
      <aegov-badge variant="aegreen">Active</aegov-badge>
    </li>
    <li class="flex items-center justify-between py-3">
      <span>Driving licence transfer</span>
      <aegov-badge variant="camel">Pending</aegov-badge>
    </li>
    <li class="flex items-center justify-between py-3">
      <span>Vehicle registration</span>
      <aegov-badge variant="aered">Expired</aegov-badge>
    </li>
    <li class="flex items-center justify-between py-3">
      <span>Old passport application</span>
      <aegov-badge variant="slate">Archived</aegov-badge>
    </li>
  </ul>
</div>

---

## Counters

Small solid badges work well as numerical counters next to navigation items, tabs, or icons. Use `size="sm"` for the most common counter footprint.

```html
<button class="relative">
  Inbox
  <aegov-badge appearance="solid" variant="aered" size="sm">12</aegov-badge>
</button>
<button class="relative">
  Notifications
  <aegov-badge appearance="solid" variant="primary" size="sm">3</aegov-badge>
</button>
<button class="relative">
  Pending tasks
  <aegov-badge appearance="solid" variant="camel" size="sm">5</aegov-badge>
</button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-6">
    <span class="inline-flex items-center gap-2">Inbox <aegov-badge appearance="solid" variant="aered" size="sm">12</aegov-badge></span>
    <span class="inline-flex items-center gap-2">Notifications <aegov-badge appearance="solid" variant="primary" size="sm">3</aegov-badge></span>
    <span class="inline-flex items-center gap-2">Pending tasks <aegov-badge appearance="solid" variant="camel" size="sm">5</aegov-badge></span>
    <span class="inline-flex items-center gap-2">Drafts <aegov-badge appearance="solid" variant="slate" size="sm">2</aegov-badge></span>
  </div>
</div>

---

## RTL Support

The badge is direction-agnostic. The dismiss button uses logical inline padding, so in `dir="rtl"` containers it automatically renders on the inline-end (visually the left side). No extra configuration is required — pass real Arabic content into the slot and the layout flips correctly.

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

---

## API Reference

### Properties

| Property        | Attribute        | Description                                                          | Type                                                                                                                                                                       | Default     |
| --------------- | ---------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `fieldId`       | `field-id`       | Unique ID for the badge element. Auto-generated if omitted.          | `string`                                                                                                                                                                   | _generated_ |
| `variant`       | `variant`        | Colour token from the UAE Design System palette.                     | `'default' \| 'primary' \| 'secondary' \| 'aegold' \| 'aered' \| 'aegreen' \| 'aeblack' \| 'techblue' \| 'seablue' \| 'camel' \| 'desert' \| 'fuchsia' \| 'slate' \| 'purple' \| 'pink' \| 'indigo' \| 'lime'` | `'default'` |
| `appearance`    | `appearance`     | Visual style — `soft` (tinted) or `solid` (filled).                  | `'soft' \| 'solid'`                                                                                                                                                        | `'soft'`    |
| `size`          | `size`           | Size token (`sm`, `base`, `lg`) or responsive string.                | `string`                                                                                                                                                                   | `'base'`    |
| `isDismissible` | `is-dismissible` | When `true`, renders a close button.                                 | `boolean`                                                                                                                                                                  | `false`     |
| `color`         | `color`          | **Deprecated** — use `variant` instead. Accepts the same colour tokens. | `'default' \| 'primary' \| 'secondary' \| 'aegold' \| 'aered' \| 'aegreen' \| 'aeblack' \| 'techblue' \| 'seablue' \| 'camel' \| 'desert' \| 'fuchsia' \| 'slate' \| 'purple' \| 'pink' \| 'indigo' \| 'lime'` | `undefined` |

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
<aegov-badge id="filter-region" variant="techblue" is-dismissible>
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

- The dismiss button is a real `<button type="button">` and is fully keyboard accessible.
- The dismiss button `aria-label` is **context-aware**: it automatically includes the badge text, so screen reader users hear `"Dismiss Error"`, `"Dismiss Approved"`, etc. rather than a generic label. When the badge has no text content it falls back to `"Dismiss badge"` (`"إغلاق الشارة"` in RTL).
- The dismiss button has a minimum touch target of **24 × 24 CSS px** on all sizes (sm, base, lg), satisfying WCAG SC 2.5.8.
- The dismiss SVG icon is marked `aria-hidden="true"` — all meaning is carried by the button's `aria-label`.
- The dismiss-click handler calls `event.stopPropagation()`, so a parent click handler does not also fire when the badge is dismissed.

### Developer responsibilities

- Provide meaningful text inside the badge — colour alone is not sufficient to convey status. Pair colour with explicit words such as "Active", "Pending", or "Suspended".
- For badges acting as numerical counters (e.g. unread messages), set a more descriptive `aria-label` on the host so the count is announced in context: `<aegov-badge aria-label="3 unread messages">3</aegov-badge>`.
- If the badge represents a value that changes over time, consider wrapping it (or its surrounding container) in an `aria-live="polite"` region so assistive technology announces the update.
- Removing the badge from the DOM after dismiss is the consumer's responsibility — the component emits `aegovBadgeDismiss` but does not auto-remove itself.
- Mark decorative inline icons with `aria-hidden="true"` — the badge text is the sole accessible label.

### Keyboard support

| Key              | Action                                           |
| ---------------- | ------------------------------------------------ |
| `Tab`            | Move focus to the dismiss button (when present). |
| `Enter`, `Space` | Activate the dismiss button.                     |
