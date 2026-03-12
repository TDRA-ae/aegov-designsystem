# Card

<p class="text-lg text-aeblack-500 mb-8">A card is a flexible container component used to group and present related content. Cards provide visual structure through configurable borders, backgrounds, padding, and hover effects.</p>

## Introduction

Cards are one of the most versatile layout components in a design system. They serve as visual containers that group related information, making content easier to scan and interact with. Common use cases include product listings, profile summaries, dashboard widgets, and content previews.

The `aegov-card` component provides **3 border styles**, **3 backgrounds**, **3 border widths**, **2 hover effects**, and configurable padding out of the box.

```html
<aegov-card>
  <h3>Card Title</h3>
  <p>This is a basic card with default settings.</p>
</aegov-card>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-card>
    <h3 class="text-lg font-semibold mb-2">Card Title</h3>
    <p class="text-aeblack-600">This is a basic card with default settings.</p>
  </aegov-card>
</div>

---

## Border Styles

The `border-style` property controls the visual style of the card's border. There are three border styles available.

### Standard

The default border style. A solid border using the primary brand colour (primary-600).

```html
<aegov-card border-style="standard">
  <p>Standard border — solid primary colour.</p>
</aegov-card>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-card border-style="standard">
    <p class="text-aeblack-600">Standard border — solid primary colour.</p>
  </aegov-card>
</div>

### Light

A softer, more subtle border using a lighter shade of the primary colour (primary-200).

```html
<aegov-card border-style="light">
  <p>Light border — subtle primary colour.</p>
</aegov-card>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-card border-style="light">
    <p class="text-aeblack-600">Light border — subtle primary colour.</p>
  </aegov-card>
</div>

### Creative

A gradient border that transitions from primary-400 to primary-800. This uses a double-background technique with a transparent border to achieve the gradient effect.

```html
<aegov-card border-style="creative">
  <p>Creative border — gradient from primary-400 to primary-800.</p>
</aegov-card>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-card border-style="creative">
    <p class="text-aeblack-600">Creative border — gradient from primary-400 to primary-800.</p>
  </aegov-card>
</div>

---

## Border Width

The `border-width` property controls the thickness of the card's border. Values range from 1 to 3 pixels.

| Value | Thickness |
|-------|-----------|
| `1`   | 1px       |
| `2`   | 2px       |
| `3`   | 3px       |

```html
<aegov-card border-width="1">1px border</aegov-card>
<aegov-card border-width="2">2px border</aegov-card>
<aegov-card border-width="3">3px border</aegov-card>
```

<div class="grid grid-cols-3 gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-card border-width="1">
    <p class="text-sm text-aeblack-600 font-medium">border-width="1"</p>
  </aegov-card>
  <aegov-card border-width="2">
    <p class="text-sm text-aeblack-600 font-medium">border-width="2"</p>
  </aegov-card>
  <aegov-card border-width="3">
    <p class="text-sm text-aeblack-600 font-medium">border-width="3"</p>
  </aegov-card>
</div>

---

## Backgrounds

The `background` property controls the card's background fill. There are three options.

| Background    | Description                              |
|---------------|------------------------------------------|
| `white`       | Default. Solid white background.         |
| `transparent` | No background fill.                      |
| `subtle`      | A light grey tint (slate-50).            |

```html
<aegov-card background="white">White background</aegov-card>
<aegov-card background="transparent">Transparent background</aegov-card>
<aegov-card background="subtle">Subtle background</aegov-card>
```

<div class="grid grid-cols-3 gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-card background="white">
    <p class="text-sm text-aeblack-600 font-medium">background="white"</p>
  </aegov-card>
  <aegov-card background="transparent">
    <p class="text-sm text-aeblack-600 font-medium">background="transparent"</p>
  </aegov-card>
  <aegov-card background="subtle">
    <p class="text-sm text-aeblack-600 font-medium">background="subtle"</p>
  </aegov-card>
</div>

---

## Hover Effects

The `hover` property adds interactive feedback when the user hovers over the card. There are two hover effects available, plus the default off state.

### Off (default)

No hover effect is applied.

### Standard

The border colour shifts to a lighter primary shade on hover. For creative borders, the gradient lightens.

```html
<aegov-card hover="standard">
  <p>Hover over me — border colour changes.</p>
</aegov-card>
```

<div class="grid grid-cols-2 gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-card hover="standard" border-style="standard">
    <p class="text-sm text-aeblack-600 font-medium">Standard border + standard hover</p>
  </aegov-card>
  <aegov-card hover="standard" border-style="light">
    <p class="text-sm text-aeblack-600 font-medium">Light border + standard hover</p>
  </aegov-card>
  <aegov-card hover="standard" border-style="creative">
    <p class="text-sm text-aeblack-600 font-medium">Creative border + standard hover</p>
  </aegov-card>
</div>

### Glow

A warm shadow glow appears beneath the card on hover. The border colour also shifts for standard and light border styles.

```html
<aegov-card hover="glow">
  <p>Hover over me — a glow appears.</p>
</aegov-card>
```

<div class="grid grid-cols-2 gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-card hover="glow" border-style="standard">
    <p class="text-sm text-aeblack-600 font-medium">Standard border + glow hover</p>
  </aegov-card>
  <aegov-card hover="glow" border-style="light">
    <p class="text-sm text-aeblack-600 font-medium">Light border + glow hover</p>
  </aegov-card>
  <aegov-card hover="glow" border-style="creative">
    <p class="text-sm text-aeblack-600 font-medium">Creative border + glow hover</p>
  </aegov-card>
</div>

---

## Padding

By default, cards include 1.5rem (24px) of inner padding. Set the `disallow-padding` attribute to remove all inner padding — useful when embedding full-bleed images or custom layouts.

```html
<!-- With padding (default) -->
<aegov-card>
  <p>This card has 24px padding.</p>
</aegov-card>

<!-- Without padding -->
<aegov-card disallow-padding>
  <img src="..." alt="Full-bleed image" style="width:100%; display:block;">
</aegov-card>
```

<div class="grid grid-cols-2 gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-card>
    <p class="text-sm text-aeblack-600 font-medium">With padding (default)</p>
  </aegov-card>
  <aegov-card disallow-padding>
    <div style="padding: 1.5rem;">
      <p class="text-sm text-aeblack-600 font-medium">disallow-padding (no inner padding)</p>
    </div>
  </aegov-card>
</div>

---

## Combining Options

Cards are designed to be composed from independent properties. Any combination of border style, border width, background, hover effect, and padding is valid.

```html
<aegov-card border-style="creative" border-width="2" background="subtle" hover="glow">
  <h3>Featured Article</h3>
  <p>A card with creative gradient border, subtle background, and glow hover.</p>
</aegov-card>
```

<div class="grid grid-cols-2 gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-card border-style="creative" border-width="2" background="white" hover="glow">
    <h3 class="text-base font-semibold mb-1">Creative + White + Glow</h3>
    <p class="text-sm text-aeblack-500">border-width="2"</p>
  </aegov-card>
  <aegov-card border-style="light" border-width="1" background="subtle" hover="standard">
    <h3 class="text-base font-semibold mb-1">Light + Subtle + Standard</h3>
    <p class="text-sm text-aeblack-500">border-width="1"</p>
  </aegov-card>
  <aegov-card border-style="standard" border-width="3" background="transparent" hover="glow">
    <h3 class="text-base font-semibold mb-1">Standard + Transparent + Glow</h3>
    <p class="text-sm text-aeblack-500">border-width="3"</p>
  </aegov-card>
  <aegov-card border-style="creative" border-width="3" background="subtle" hover="standard">
    <h3 class="text-base font-semibold mb-1">Creative + Subtle + Standard</h3>
    <p class="text-sm text-aeblack-500">border-width="3"</p>
  </aegov-card>
</div>

---

## Real-World Examples

### Profile Card

```html
<aegov-card border-style="light" hover="standard">
  <div style="display: flex; align-items: center; gap: 1rem;">
    <aegov-avatar size="lg">MK</aegov-avatar>
    <div>
      <h3 style="margin: 0; font-weight: 600;">Mohammed Al Kaabi</h3>
      <p style="margin: 0; color: #6b7280; font-size: 0.875rem;">Senior Developer</p>
    </div>
  </div>
</aegov-card>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov" style="max-width: 400px;">
  <aegov-card border-style="light" hover="standard">
    <div style="display: flex; align-items: center; gap: 1rem;">
      <aegov-avatar size="lg">MK</aegov-avatar>
      <div>
        <h3 style="margin: 0; font-weight: 600;">Mohammed Al Kaabi</h3>
        <p style="margin: 0; color: #6b7280; font-size: 0.875rem;">Senior Developer</p>
      </div>
    </div>
  </aegov-card>
</div>

### Content Card with Action

```html
<aegov-card border-style="creative" border-width="2" hover="glow">
  <h3>Digital Services Portal</h3>
  <p>Access government services online. Submit applications, track requests, and manage documents.</p>
  <aegov-button size="sm">Learn More</aegov-button>
</aegov-card>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov" style="max-width: 400px;">
  <aegov-card border-style="creative" border-width="2" hover="glow">
    <h3 class="text-lg font-semibold mb-2">Digital Services Portal</h3>
    <p class="text-aeblack-600 mb-4">Access government services online. Submit applications, track requests, and manage documents.</p>
    <aegov-button size="sm">Learn More</aegov-button>
  </aegov-card>
</div>

### Stats Cards

```html
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
  <aegov-card border-style="light" background="subtle">
    <p style="font-size: 2rem; font-weight: 700; margin: 0;">1,247</p>
    <p style="color: #6b7280; margin: 0;">Active Users</p>
  </aegov-card>
  <aegov-card border-style="light" background="subtle">
    <p style="font-size: 2rem; font-weight: 700; margin: 0;">98.5%</p>
    <p style="color: #6b7280; margin: 0;">Uptime</p>
  </aegov-card>
  <aegov-card border-style="light" background="subtle">
    <p style="font-size: 2rem; font-weight: 700; margin: 0;">3.2s</p>
    <p style="color: #6b7280; margin: 0;">Avg Response</p>
  </aegov-card>
</div>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
    <aegov-card border-style="light" background="subtle">
      <p style="font-size: 2rem; font-weight: 700; margin: 0;">1,247</p>
      <p style="color: #6b7280; margin: 0;">Active Users</p>
    </aegov-card>
    <aegov-card border-style="light" background="subtle">
      <p style="font-size: 2rem; font-weight: 700; margin: 0;">98.5%</p>
      <p style="color: #6b7280; margin: 0;">Uptime</p>
    </aegov-card>
    <aegov-card border-style="light" background="subtle">
      <p style="font-size: 2rem; font-weight: 700; margin: 0;">3.2s</p>
      <p style="color: #6b7280; margin: 0;">Avg Response</p>
    </aegov-card>
  </div>
</div>

---

## Complete Border Style x Background Matrix

The table below shows every combination of border style and background. All cards use `border-width="2"` for visibility.

<div class="overflow-x-auto my-6">
<table class="w-full text-sm border-collapse">
  <thead>
    <tr class="bg-aeblack-50">
      <th class="text-left p-3 border border-aeblack-100 font-semibold">Background</th>
      <th class="p-3 border border-aeblack-100 font-semibold">Standard</th>
      <th class="p-3 border border-aeblack-100 font-semibold">Light</th>
      <th class="p-3 border border-aeblack-100 font-semibold">Creative</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium">White</td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-card border-style="standard" background="white" border-width="2"><p class="text-xs text-aeblack-500">Standard + White</p></aegov-card></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-card border-style="light" background="white" border-width="2"><p class="text-xs text-aeblack-500">Light + White</p></aegov-card></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-card border-style="creative" background="white" border-width="2"><p class="text-xs text-aeblack-500">Creative + White</p></aegov-card></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium">Transparent</td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-card border-style="standard" background="transparent" border-width="2"><p class="text-xs text-aeblack-500">Standard + Transparent</p></aegov-card></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-card border-style="light" background="transparent" border-width="2"><p class="text-xs text-aeblack-500">Light + Transparent</p></aegov-card></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-card border-style="creative" background="transparent" border-width="2"><p class="text-xs text-aeblack-500">Creative + Transparent</p></aegov-card></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium">Subtle</td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-card border-style="standard" background="subtle" border-width="2"><p class="text-xs text-aeblack-500">Standard + Subtle</p></aegov-card></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-card border-style="light" background="subtle" border-width="2"><p class="text-xs text-aeblack-500">Light + Subtle</p></aegov-card></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-card border-style="creative" background="subtle" border-width="2"><p class="text-xs text-aeblack-500">Creative + Subtle</p></aegov-card></td>
    </tr>
  </tbody>
</table>
</div>

---

## API Reference

### Properties

| Property          | Attribute          | Description                                                    | Type                                          | Default       |
|-------------------|--------------------|----------------------------------------------------------------|-----------------------------------------------|---------------|
| `borderStyle`     | `border-style`     | The visual style of the card border                           | `'standard'` \| `'light'` \| `'creative'`     | `'standard'`  |
| `borderWidth`     | `border-width`     | The thickness of the border in pixels                         | `1` \| `2` \| `3`                             | `1`           |
| `background`      | `background`       | The background fill of the card                               | `'white'` \| `'transparent'` \| `'subtle'`    | `'white'`     |
| `hover`           | `hover`            | The hover effect applied to the card                          | `'off'` \| `'standard'` \| `'glow'`           | `'off'`       |
| `disallowPadding` | `disallow-padding` | Removes the default 1.5rem (24px) inner padding when set      | `boolean`                                      | `false`       |

### Slots

| Slot      | Description                                                                                      |
|-----------|--------------------------------------------------------------------------------------------------|
| (default) | The card content — any combination of text, images, components, or HTML elements.               |

---

## Accessibility

The `aegov-card` component is a presentational container. It does not carry any inherent semantic role — it renders a `<div>` wrapper around slotted content. Accessibility depends on the content placed inside the card.

### Guidelines

- **Use semantic headings.** When a card has a title, use an appropriate heading level (`<h2>`, `<h3>`, etc.) based on the page structure.
- **Image alt text.** If the card contains images, ensure they have descriptive `alt` attributes or are marked as decorative with `alt=""`.
- **Interactive cards.** If the entire card should be clickable, wrap the card content in an `<a>` element or add a link/button inside. Do not make the `aegov-card` host element clickable — it renders a `<div>`, not a `<button>` or `<a>`.
- **Hover effects are not conveyed to assistive technologies.** The `hover` property is purely visual. Ensure that hover states are not the only means of conveying information.
- **Colour contrast.** The `transparent` background may result in insufficient contrast depending on the parent container's background. Verify that text inside transparent cards has at least a **4.5:1** contrast ratio against the effective background.

---

## Notes

- The `aegov-card` component renders a `<div>` with the class `aegov-card` and modifier classes. It uses `scoped: false`, so styles are global and rely on the `aegov-card` class prefix.
- The `disallow-padding` attribute removes all inner padding. This is useful when embedding images or custom layouts that need to extend to the card's edges.
- The `creative` border style uses a double-background technique with `background-clip: padding-box, border-box` to create a gradient border. This means the background is set via `background-image` rather than `background-color` when using the creative border style.
- Border radius is responsive: 1rem on desktop, 0.75rem on tablets (below 768px), and 0.5rem on mobile (below 480px).
- The card has `overflow: hidden` applied, which means content that extends beyond the card boundaries will be clipped. This is particularly useful for full-bleed images.
- Hover transitions are smooth with a 300ms ease timing function applied to `border-color`, `box-shadow`, and `background-image`.
- The `glow` hover effect uses an OKLCH-based shadow for a warm, brand-aligned glow rather than a generic grey shadow.
