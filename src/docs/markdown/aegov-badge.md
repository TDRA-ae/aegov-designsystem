# Badge

<p class="text-lg text-aeblack-500 mb-8">A badge is a small, inline label used to highlight status, categories, or counts. Badges draw attention to new or important information within the context of surrounding content.</p>

## Introduction

The `aegov-badge` component renders a compact inline label. It supports **17 colour variants**, **2 appearances** (soft and solid), **3 sizes**, and an optional **dismissible** close button.

```html
<aegov-badge>Default</aegov-badge>
```

<div class="flex flex-wrap items-center gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-badge>Default</aegov-badge>
  <aegov-badge color="primary">Primary</aegov-badge>
  <aegov-badge color="aered">Error</aegov-badge>
  <aegov-badge color="aegreen">Success</aegov-badge>
  <aegov-badge color="techblue">Info</aegov-badge>
</div>

---

## Appearances

The `appearance` property controls the visual intensity of the badge. Two appearances are available.

### Soft (default)

A subtle, tinted background with darker text — ideal for non-intrusive labelling.

```html
<aegov-badge appearance="soft" color="primary">Soft</aegov-badge>
```

<div class="flex flex-wrap items-center gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-badge appearance="soft">Default</aegov-badge>
  <aegov-badge appearance="soft" color="primary">Primary</aegov-badge>
  <aegov-badge appearance="soft" color="secondary">Secondary</aegov-badge>
  <aegov-badge appearance="soft" color="aered">AERed</aegov-badge>
  <aegov-badge appearance="soft" color="aegreen">AEGreen</aegov-badge>
  <aegov-badge appearance="soft" color="techblue">TechBlue</aegov-badge>
  <aegov-badge appearance="soft" color="camel">Camel</aegov-badge>
  <aegov-badge appearance="soft" color="purple">Purple</aegov-badge>
</div>

### Solid

A bold, filled background with light text — use for high-emphasis labels.

```html
<aegov-badge appearance="solid" color="primary">Solid</aegov-badge>
```

<div class="flex flex-wrap items-center gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-badge appearance="solid">Default</aegov-badge>
  <aegov-badge appearance="solid" color="primary">Primary</aegov-badge>
  <aegov-badge appearance="solid" color="secondary">Secondary</aegov-badge>
  <aegov-badge appearance="solid" color="aered">AERed</aegov-badge>
  <aegov-badge appearance="solid" color="aegreen">AEGreen</aegov-badge>
  <aegov-badge appearance="solid" color="techblue">TechBlue</aegov-badge>
  <aegov-badge appearance="solid" color="camel">Camel</aegov-badge>
  <aegov-badge appearance="solid" color="purple">Purple</aegov-badge>
</div>

---

## Colours

The `color` property selects from 17 colour variants drawn from the UAE Government brand palette. Each colour works with both soft and solid appearances.

| Colour      | Soft Preview | Solid Preview |
|-------------|:---:|:---:|

<div class="overflow-x-auto my-6">
<table class="w-full text-sm border-collapse">
  <thead>
    <tr class="bg-aeblack-50">
      <th class="text-left p-3 border border-aeblack-100 font-semibold">Colour</th>
      <th class="p-3 border border-aeblack-100 font-semibold">Soft</th>
      <th class="p-3 border border-aeblack-100 font-semibold">Solid</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>default</code></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="soft">Default</aegov-badge></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="solid">Default</aegov-badge></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>primary</code></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="soft" color="primary">Primary</aegov-badge></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="solid" color="primary">Primary</aegov-badge></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>secondary</code></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="soft" color="secondary">Secondary</aegov-badge></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="solid" color="secondary">Secondary</aegov-badge></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>aegold</code></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="soft" color="aegold">AEGold</aegov-badge></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="solid" color="aegold">AEGold</aegov-badge></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>aered</code></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="soft" color="aered">AERed</aegov-badge></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="solid" color="aered">AERed</aegov-badge></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>aegreen</code></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="soft" color="aegreen">AEGreen</aegov-badge></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="solid" color="aegreen">AEGreen</aegov-badge></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>aeblack</code></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="soft" color="aeblack">AEBlack</aegov-badge></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="solid" color="aeblack">AEBlack</aegov-badge></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>techblue</code></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="soft" color="techblue">TechBlue</aegov-badge></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="solid" color="techblue">TechBlue</aegov-badge></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>seablue</code></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="soft" color="seablue">SeaBlue</aegov-badge></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="solid" color="seablue">SeaBlue</aegov-badge></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>camel</code></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="soft" color="camel">Camel</aegov-badge></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="solid" color="camel">Camel</aegov-badge></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>desert</code></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="soft" color="desert">Desert</aegov-badge></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="solid" color="desert">Desert</aegov-badge></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>fuchsia</code></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="soft" color="fuchsia">Fuchsia</aegov-badge></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="solid" color="fuchsia">Fuchsia</aegov-badge></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>slate</code></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="soft" color="slate">Slate</aegov-badge></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="solid" color="slate">Slate</aegov-badge></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>purple</code></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="soft" color="purple">Purple</aegov-badge></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="solid" color="purple">Purple</aegov-badge></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>pink</code></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="soft" color="pink">Pink</aegov-badge></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="solid" color="pink">Pink</aegov-badge></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>indigo</code></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="soft" color="indigo">Indigo</aegov-badge></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="solid" color="indigo">Indigo</aegov-badge></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>lime</code></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="soft" color="lime">Lime</aegov-badge></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-badge appearance="solid" color="lime">Lime</aegov-badge></td>
    </tr>
  </tbody>
</table>
</div>

---

## Sizes

The `size` property adjusts the font size and vertical padding.

| Size   | Font Size | Vertical Padding |
|--------|-----------|------------------|
| `sm`   | 12px (xs) | 4px              |
| `base` | 14px (sm) | 4px              |
| `lg`   | 14px (sm) | 6px              |

```html
<aegov-badge size="sm">Small</aegov-badge>
<aegov-badge size="base">Base</aegov-badge>
<aegov-badge size="lg">Large</aegov-badge>
```

<div class="flex flex-wrap items-center gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-badge size="sm" color="primary">Small</aegov-badge>
  <aegov-badge size="base" color="primary">Base</aegov-badge>
  <aegov-badge size="lg" color="primary">Large</aegov-badge>
</div>

All three sizes in solid appearance:

<div class="flex flex-wrap items-center gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-badge size="sm" color="techblue" appearance="solid">Small Solid</aegov-badge>
  <aegov-badge size="base" color="techblue" appearance="solid">Base Solid</aegov-badge>
  <aegov-badge size="lg" color="techblue" appearance="solid">Large Solid</aegov-badge>
</div>

### Responsive Size

The `size` prop accepts Tailwind-style responsive prefixes. Write a space-separated string where each token is either a plain value or `breakpoint:value`. The base value (no prefix) applies below the smallest specified breakpoint.

Available breakpoints: `xs` (480px), `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px), `3xl` (1680px).

```html
<aegov-badge size="sm xl:lg" color="primary">Responsive Badge</aegov-badge>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-badge size="sm xl:lg" color="primary">Responsive</aegov-badge>
</div>

> **Graceful degradation:** Unknown breakpoint names and invalid values are silently ignored. An unrecognised base value falls back to the component default.

---

## Dismissible

Set the `dismissible` attribute to show a close button inside the badge. Clicking the button emits the `aegovBadgeDismiss` event. The badge does **not** remove itself — you control visibility in your application logic.

```html
<aegov-badge dismissible color="primary">Dismissible</aegov-badge>
```

<div class="flex flex-wrap items-center gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-badge dismissible>Default</aegov-badge>
  <aegov-badge dismissible color="primary">Primary</aegov-badge>
  <aegov-badge dismissible color="aered">AERed</aegov-badge>
  <aegov-badge dismissible color="aegreen">AEGreen</aegov-badge>
  <aegov-badge dismissible color="techblue" appearance="solid">TechBlue Solid</aegov-badge>
  <aegov-badge dismissible color="purple" appearance="solid">Purple Solid</aegov-badge>
</div>

### Handling Dismiss Events

```html
<aegov-badge id="my-badge" dismissible color="aered">Remove Me</aegov-badge>

<script>
  const badge = document.getElementById('my-badge');
  badge.addEventListener('aegovBadgeDismiss', () => {
    badge.style.display = 'none';
  });
</script>
```

> **Important:** The badge is event-driven only. It does **not** auto-hide when dismissed. This gives you full control — use it to remove the element, update application state, or trigger an API call.

---

## Use Cases

### Status Labels

<div class="flex flex-wrap items-center gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-badge color="aegreen">Active</aegov-badge>
  <aegov-badge color="aered">Inactive</aegov-badge>
  <aegov-badge color="camel">Pending</aegov-badge>
  <aegov-badge color="techblue">In Review</aegov-badge>
  <aegov-badge color="aeblack">Archived</aegov-badge>
</div>

### Category Tags

<div class="flex flex-wrap items-center gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-badge color="purple" dismissible>Design</aegov-badge>
  <aegov-badge color="techblue" dismissible>Development</aegov-badge>
  <aegov-badge color="fuchsia" dismissible>Marketing</aegov-badge>
  <aegov-badge color="aegreen" dismissible>Operations</aegov-badge>
</div>

### Inline with Text

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <p class="text-base text-aeblack-700">Government Services Portal <aegov-badge color="primary" size="sm">New</aegov-badge></p>
  <p class="text-base text-aeblack-700 mt-2">Legacy System <aegov-badge color="aered" size="sm">Deprecated</aegov-badge></p>
  <p class="text-base text-aeblack-700 mt-2">API v3.2 <aegov-badge color="aegreen" size="sm">Stable</aegov-badge></p>
</div>

---

## RTL Support

The dismiss button margin automatically flips in RTL layouts using `rtl:ml-0 rtl:mr-1.5`.

<div dir="rtl" class="flex flex-wrap items-center gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-badge color="primary" dismissible>شارة أساسية</aegov-badge>
  <aegov-badge color="aegreen" dismissible>نشط</aegov-badge>
  <aegov-badge color="aered" appearance="solid" dismissible>خطأ</aegov-badge>
  <aegov-badge color="camel">قيد الانتظار</aegov-badge>
</div>

---

## API Reference

### Properties

| Property      | Attribute     | Description                       | Type                                                                                                                                                                                           | Default     |
|---------------|---------------|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| `appearance`  | `appearance`  | The visual intensity              | `'soft'` \| `'solid'`                                                                                                                                                                         | `'soft'`    |
| `color`       | `color`       | The colour variant                | `'default'` \| `'primary'` \| `'secondary'` \| `'aegold'` \| `'aered'` \| `'aegreen'` \| `'aeblack'` \| `'techblue'` \| `'seablue'` \| `'camel'` \| `'desert'` \| `'fuchsia'` \| `'slate'` \| `'purple'` \| `'pink'` \| `'indigo'` \| `'lime'` | `'default'` |
| `size`        | `size`        | The badge size. Supports responsive strings (e.g. `'sm xl:lg'`). | `'sm'` \| `'base'` \| `'lg'`                                                                                                                                                                  | `'base'`    |
| `dismissible` | `dismissible` | Shows a close button              | `boolean`                                                                                                                                                                                      | `false`     |

### Events

| Event              | Description                              | Detail Type |
|--------------------|------------------------------------------|-------------|
| `aegovBadgeDismiss` | Emitted when the dismiss button is clicked | `void`      |

The event is not emitted when `dismissible` is `false`.

#### Listening to Events

```html
<aegov-badge id="tag" dismissible color="primary">Tag</aegov-badge>

<script>
  document.getElementById('tag')
    .addEventListener('aegovBadgeDismiss', () => {
      console.log('Badge dismissed');
    });
</script>
```

### Slots

| Slot      | Description                                   |
|-----------|-----------------------------------------------|
| (default) | The badge label — text or inline HTML content. |

---

## Accessibility

### Built-in Features

- **Semantic `<span>` element** — the badge renders as an inline `<span>`, which is appropriate for non-interactive labels.
- **Dismiss button `aria-label`** — the close button includes `aria-label="Badge dismiss button"` for screen reader identification.
- **Focus indicator** — the dismiss button has a visible `focus-visible` outline matching the badge's colour scheme.
- **Keyboard accessible** — the dismiss button is a native `<button>` element, focusable and activatable with Enter or Space.

### Developer Responsibilities

1. **Provide context for screen readers.** If a badge conveys meaning through colour alone (e.g. green = success), add supporting text or `aria-label` to ensure the information is accessible to users who cannot perceive colour.

2. **Colour contrast.** All built-in colour combinations meet WCAG 2.1 AA contrast ratios for both soft and solid appearances. If you override colours via CSS, verify contrast is maintained.

3. **Do not use badges as the sole interactive element.** Badges are primarily informational. If you need a clickable chip or tag, consider wrapping the badge inside a button or using a dedicated interactive component.

---

## Notes

- The badge renders as a `<span>`, so it is an inline element suitable for placement within text, headings, or alongside other inline content.
- The `dismissible` property adds a close button but does **not** hide the badge automatically. You must handle the `aegovBadgeDismiss` event and control visibility yourself.
- The dismiss button uses `event.stopPropagation()`, so clicking it will not trigger click handlers on parent elements.
- The host element uses `display: inline-block` to ensure consistent sizing and alignment.
- All 17 colour variants have both soft and solid appearances, giving you 34 visual combinations.
- The dismiss button icon scales with the badge — it uses a fixed `size-3` (12px) SVG that works well across all three badge sizes.
- RTL support is built into the dismiss button margin using `rtl:ml-0 rtl:mr-1.5`.
