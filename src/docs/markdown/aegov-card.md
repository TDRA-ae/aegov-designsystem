# Card

<p class="text-lg text-aeblack-500 mb-8">A card is a flexible container component used to group and present related content. Cards provide visual structure through configurable borders, backgrounds, padding, and hover effects.</p>

## Introduction

Cards are one of the most versatile layout components in a design system. They serve as visual containers that group related information, making content easier to scan and interact with. Common use cases include product listings, profile summaries, dashboard widgets, and content previews.

The `aegov-card` component provides **4 border styles**, **2 backgrounds**, **3 border widths**, **3 sizes**, **2 hover effects**, and configurable padding out of the box.

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

The `border-style` property controls the visual style of the card's border. There are four border styles available.

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

### Highlight

A neutral solid border (aeblack-200) that transitions into a primary gradient (primary-300 → primary-700) when hovered. The hover transition is built-in and fires regardless of the `hover` prop. Useful for interactive cards that should feel quiet at rest and respond when targeted.

```html
<aegov-card border-style="highlight">
  <p>Highlight border — neutral at rest, gradient on hover.</p>
</aegov-card>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-card border-style="highlight">
    <p class="text-aeblack-600">Highlight border — hover to see the gradient transition.</p>
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

The `bg` property controls the card's background fill. There are two options.

| Background  | Description                              |
|-------------|------------------------------------------|
| `white`     | Default. Solid white background.         |
| `subtle`    | A light grey tint (aeblack-50).          |

```html
<aegov-card bg="white">White background</aegov-card>
<aegov-card bg="subtle">Subtle background</aegov-card>
```

<div class="grid grid-cols-2 gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-card bg="white">
    <p class="text-sm text-aeblack-600 font-medium">background="white"</p>
  </aegov-card>
  <aegov-card bg="subtle">
    <p class="text-sm text-aeblack-600 font-medium">background="subtle"</p>
  </aegov-card>
</div>

---

## Sizes

The `size` property scales both the inner padding and the border radius. All sizes respect the responsive breakpoint behaviour — radius shrinks at the **md** (≤768px) and **xs** (≤480px) breakpoints to match the smaller surface area on tablets and phones.

| Size     | Padding | Radius (≥md) | Radius (≤md) | Radius (≤xs) |
|----------|---------|--------------|--------------|--------------|
| `sm`     | 1rem    | 0.5rem       | 0.375rem     | 0.25rem      |
| `base`   | 1.5rem  | 0.75rem      | 0.5rem       | 0.375rem     |
| `lg`     | 2rem    | 1rem         | 0.75rem      | 0.5rem       |

`base` is the default and matches the original card sizing. `sm` is suited to dense layouts like list items or compact dashboards. `lg` is suited to feature cards, hero blocks, or any card that should feel generous and prominent.

```html
<aegov-card size="sm">Compact card</aegov-card>
<aegov-card size="base">Default card</aegov-card>
<aegov-card size="lg">Generous card</aegov-card>
```

<div class="grid grid-cols-3 gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-card size="sm">
    <p class="text-sm text-aeblack-600 font-medium">size="sm"</p>
  </aegov-card>
  <aegov-card size="base">
    <p class="text-sm text-aeblack-600 font-medium">size="base"</p>
  </aegov-card>
  <aegov-card size="lg">
    <p class="text-sm text-aeblack-600 font-medium">size="lg"</p>
  </aegov-card>
</div>

When `is-padding` is set, the size still controls the border radius — the padding is simply removed.

```html
<aegov-card size="lg" is-padding="false">
  <img src="..." alt="Full-bleed image" style="width:100%; display:block;">
</aegov-card>
```

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

By default, cards include 1.5rem (24px) of inner padding. Set the `is-padding` attribute to remove all inner padding — useful when embedding full-bleed images or custom layouts.

```html
<!-- With padding (default) -->
<aegov-card>
  <p>This card has 24px padding.</p>
</aegov-card>

<!-- Without padding -->
<aegov-card is-padding="false">
  <img src="..." alt="Full-bleed image" style="width:100%; display:block;">
</aegov-card>
```

<div class="grid grid-cols-2 gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-card>
    <p class="text-sm text-aeblack-600 font-medium">With padding (default)</p>
  </aegov-card>
  <aegov-card is-padding="false">
    <div style="padding: 1.5rem;">
      <p class="text-sm text-aeblack-600 font-medium">is-padding="false" (no inner padding)</p>
    </div>
  </aegov-card>
</div>

---

## Combining Options

Cards are designed to be composed from independent properties. Any combination of border style, border width, background, hover effect, and padding is valid.

```html
<aegov-card border-style="creative" border-width="2" bg="subtle" hover="glow">
  <h3>Featured Article</h3>
  <p>A card with creative gradient border, subtle background, and glow hover.</p>
</aegov-card>
```

<div class="grid grid-cols-2 gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-card border-style="creative" border-width="2" bg="white" hover="glow">
    <h3 class="text-base font-semibold mb-1">Creative + White + Glow</h3>
    <p class="text-sm text-aeblack-500">border-width="2"</p>
  </aegov-card>
  <aegov-card border-style="light" border-width="1" bg="subtle" hover="standard">
    <h3 class="text-base font-semibold mb-1">Light + Subtle + Standard</h3>
    <p class="text-sm text-aeblack-500">border-width="1"</p>
  </aegov-card>
  <aegov-card border-style="standard" border-width="3" bg="white" hover="glow">
    <h3 class="text-base font-semibold mb-1">Standard + White + Glow</h3>
    <p class="text-sm text-aeblack-500">border-width="3"</p>
  </aegov-card>
  <aegov-card border-style="creative" border-width="3" bg="subtle" hover="standard">
    <h3 class="text-base font-semibold mb-1">Creative + Subtle + Standard</h3>
    <p class="text-sm text-aeblack-500">border-width="3"</p>
  </aegov-card>
  <aegov-card border-style="highlight" border-width="2" bg="white">
    <h3 class="text-base font-semibold mb-1">Highlight + White</h3>
    <p class="text-sm text-aeblack-500">border-width="2"</p>
  </aegov-card>
  <aegov-card border-style="highlight" border-width="2" bg="subtle" hover="glow">
    <h3 class="text-base font-semibold mb-1">Highlight + Subtle + Glow</h3>
    <p class="text-sm text-aeblack-500">border-width="2"</p>
  </aegov-card>
</div>

---

## Layout

Cards have no built-in layout — they are block-level containers that fill the width of their parent. Use any layout primitive to arrange multiple cards. The two most common patterns are **flex** for one-dimensional rows or columns, and **grid** for two-dimensional matrices that wrap and reflow predictably.

### Flex Layout

Use a flex container to lay cards out one after another with consistent gaps. On wide viewports the cards sit side-by-side; on narrower viewports `flex-wrap` lets them stack.

```html
<div style="display: flex; flex-wrap: wrap; gap: 1.5rem;">
  <aegov-card style="flex: 1 1 280px;" border-style="light" hover="standard">
    <h3>Apply for Service</h3>
    <p>Submit a new application through our digital portal in a few quick steps.</p>
    <aegov-button size="sm" appearance="primary">Start Application</aegov-button>
  </aegov-card>
  <aegov-card style="flex: 1 1 280px;" border-style="light" hover="standard">
    <h3>Track Request</h3>
    <p>Check the live status of any application you have already submitted.</p>
    <aegov-button size="sm" appearance="primary">Track Now</aegov-button>
  </aegov-card>
  <aegov-card style="flex: 1 1 280px;" border-style="light" hover="standard">
    <h3>Get Support</h3>
    <p>Reach out to our support team for help with your account or services.</p>
    <aegov-button size="sm" appearance="primary">Contact Us</aegov-button>
  </aegov-card>
</div>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div style="display: flex; flex-wrap: wrap; gap: 1.5rem;">
    <aegov-card style="flex: 1 1 280px;" border-style="light" hover="standard">
      <h3 class="text-lg font-semibold mb-2">Apply for Service</h3>
      <p class="text-aeblack-600 mb-4">Submit a new application through our digital portal in a few quick steps.</p>
      <aegov-button size="sm" appearance="primary">Start Application</aegov-button>
    </aegov-card>
    <aegov-card style="flex: 1 1 280px;" border-style="light" hover="standard">
      <h3 class="text-lg font-semibold mb-2">Track Request</h3>
      <p class="text-aeblack-600 mb-4">Check the live status of any application you have already submitted.</p>
      <aegov-button size="sm" appearance="primary">Track Now</aegov-button>
    </aegov-card>
    <aegov-card style="flex: 1 1 280px;" border-style="light" hover="standard">
      <h3 class="text-lg font-semibold mb-2">Get Support</h3>
      <p class="text-aeblack-600 mb-4">Reach out to our support team for help with your account or services.</p>
      <aegov-button size="sm" appearance="primary">Contact Us</aegov-button>
    </aegov-card>
  </div>
</div>

### Grid Layout

Use a CSS grid for fixed-column layouts where each card occupies a single grid track. The example below uses three equal columns; switch to `repeat(auto-fit, minmax(280px, 1fr))` for a responsive grid that re-flows when there isn't enough space.

```html
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
  <aegov-card border-style="light" hover="standard">
    <h3>Apply for Service</h3>
    <p>Submit a new application through our digital portal in a few quick steps.</p>
    <aegov-button size="sm" appearance="primary">Start Application</aegov-button>
  </aegov-card>
  <aegov-card border-style="light" hover="standard">
    <h3>Track Request</h3>
    <p>Check the live status of any application you have already submitted.</p>
    <aegov-button size="sm" appearance="primary">Track Now</aegov-button>
  </aegov-card>
  <aegov-card border-style="light" hover="standard">
    <h3>Get Support</h3>
    <p>Reach out to our support team for help with your account or services.</p>
    <aegov-button size="sm" appearance="primary">Contact Us</aegov-button>
  </aegov-card>
</div>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
    <aegov-card border-style="light" hover="standard">
      <h3 class="text-lg font-semibold mb-2">Apply for Service with a longer title</h3>
      <p class="text-aeblack-600 mb-4">Submit a new application through our digital portal in a few quick steps.</p>
      <aegov-button size="sm" appearance="primary">Start Application</aegov-button>
    </aegov-card>
    <aegov-card border-style="light" hover="standard">
      <h3 class="text-lg font-semibold mb-2">Track Request</h3>
      <p class="text-aeblack-600 mb-4">Check the live status of any application you have already submitted.</p>
      <aegov-button size="sm" appearance="primary">Track Now</aegov-button>
    </aegov-card>
    <aegov-card border-style="light" hover="standard">
      <h3 class="text-lg font-semibold mb-2">Get Support</h3>
      <p class="text-aeblack-600 mb-4">Reach out to our support team for help.</p>
      <aegov-button size="sm" appearance="primary">Contact Us</aegov-button>
    </aegov-card>
  </div>
</div>

**Equal heights:** Cards stretch to fill their grid row or flex track automatically. This is built into the component — no parent-side height styling required. To opt out for a specific card, set `align-self: start` on that card's host element.

**Flex vs grid:** flex is best when card widths can vary or you want them to grow/shrink to fill the row. Grid is best when you need strict column alignment regardless of card content.

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
  <aegov-card border-style="light" bg="subtle">
    <p style="font-size: 2rem; font-weight: 700; margin: 0;">1,247</p>
    <p style="color: #6b7280; margin: 0;">Active Users</p>
  </aegov-card>
  <aegov-card border-style="light" bg="subtle">
    <p style="font-size: 2rem; font-weight: 700; margin: 0;">98.5%</p>
    <p style="color: #6b7280; margin: 0;">Uptime</p>
  </aegov-card>
  <aegov-card border-style="light" bg="subtle">
    <p style="font-size: 2rem; font-weight: 700; margin: 0;">3.2s</p>
    <p style="color: #6b7280; margin: 0;">Avg Response</p>
  </aegov-card>
</div>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
    <aegov-card border-style="light" bg="subtle">
      <p style="font-size: 2rem; font-weight: 700; margin: 0;">1,247</p>
      <p style="color: #6b7280; margin: 0;">Active Users</p>
    </aegov-card>
    <aegov-card border-style="light" bg="subtle">
      <p style="font-size: 2rem; font-weight: 700; margin: 0;">98.5%</p>
      <p style="color: #6b7280; margin: 0;">Uptime</p>
    </aegov-card>
    <aegov-card border-style="light" bg="subtle">
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
      <th class="p-3 border border-aeblack-100 font-semibold">Highlight</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium">White</td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-card border-style="standard" bg="white" border-width="2"><p class="text-xs text-aeblack-500">Standard + White</p></aegov-card></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-card border-style="light" bg="white" border-width="2"><p class="text-xs text-aeblack-500">Light + White</p></aegov-card></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-card border-style="creative" bg="white" border-width="2"><p class="text-xs text-aeblack-500">Creative + White</p></aegov-card></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-card border-style="highlight" bg="white" border-width="2"><p class="text-xs text-aeblack-500">Highlight + White</p></aegov-card></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium">Subtle</td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-card border-style="standard" bg="subtle" border-width="2"><p class="text-xs text-aeblack-500">Standard + Subtle</p></aegov-card></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-card border-style="light" bg="subtle" border-width="2"><p class="text-xs text-aeblack-500">Light + Subtle</p></aegov-card></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-card border-style="creative" bg="subtle" border-width="2"><p class="text-xs text-aeblack-500">Creative + Subtle</p></aegov-card></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-card border-style="highlight" bg="subtle" border-width="2"><p class="text-xs text-aeblack-500">Highlight + Subtle</p></aegov-card></td>
    </tr>
  </tbody>
</table>
</div>

---

## API Reference

### Properties

| Property          | Attribute          | Description                                                    | Type                                                              | Default       |
|-------------------|--------------------|----------------------------------------------------------------|-------------------------------------------------------------------|---------------|
| `borderStyle`     | `border-style`     | The visual style of the card border                           | `'standard'` \| `'light'` \| `'creative'` \| `'highlight'`        | `'standard'`  |
| `borderWidth`     | `border-width`     | The thickness of the border in pixels                         | `1` \| `2` \| `3`                                                 | `2`           |
| `bg`      | `bg`       | The background fill of the card                               | `'white'` \| `'subtle'`                                           | `'white'`     |
| `size`            | `size`             | Scales padding and border-radius (responsive at md/xs)        | `'sm'` \| `'base'` \| `'lg'`                                      | `'base'`      |
| `hover`           | `hover`            | The hover effect applied to the card                          | `'off'` \| `'standard'` \| `'glow'`                               | `'off'`       |
| `isPadding` | `is-padding` | Removes the default inner padding when set (size still controls radius) | `boolean`                                              | `false`       |

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
- **Hover effects are not conveyed to assistive technologies.** The `hover` property and the built-in highlight border transition are purely visual. Ensure that hover states are not the only means of conveying information.
- **Colour contrast.** Verify that text inside the card has at least a **4.5:1** contrast ratio against the chosen background (`white` or `subtle`).

---

## Notes

- The `aegov-card` component renders a `<div>` with the class `aegov-card` and modifier classes. It uses `scoped: false`, so styles are global and rely on the `aegov-card` class prefix.
- The `is-padding` attribute removes all inner padding. This is useful when embedding images or custom layouts that need to extend to the card's edges.
- The `creative` and `highlight` border styles use a double-background technique with `background-clip: padding-box, border-box` to create a gradient border. The background is set via `background-image` rather than `background-color` when using these border styles.
- The `highlight` border style transitions from a solid `aeblack-200` border to a `primary-300 → primary-700` gradient on hover. This transition is built-in and fires regardless of the `hover` prop. Combine with `hover="glow"` to also fire the shadow glow.
- Border radius is driven by the `size` prop and is responsive at the **md** (≤768px) and **xs** (≤480px) breakpoints. See the Sizes section for the per-size radius scale.
- The card has `overflow: hidden` applied, which means content that extends beyond the card boundaries will be clipped. This is particularly useful for full-bleed images.
- Hover transitions are smooth with a 300ms ease timing function applied to `border-color`, `box-shadow`, and `background-image`.
- The `glow` hover effect uses an OKLCH-based shadow for a warm, brand-aligned glow rather than a generic grey shadow.
