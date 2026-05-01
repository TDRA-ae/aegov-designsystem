# aegov-card

A flexible bordered container for grouping related content — service tiles, summary panels, dashboard sections, list items, etc. Cards support several border styles, two background tones, three sizes, and optional hover effects. Their content is fully slotted, so any combination of headings, body copy, badges, or actions can be composed inside.

## Properties

### is-padding

Whether the card applies its standard inner padding (`1.5rem` / 24px). On by default. Disable when you need to render edge-to-edge content (media, tables) and provide your own padding inside.

```html
<aegov-card>Default padded card</aegov-card>
<aegov-card is-padding="false">Edge-to-edge card</aegov-card>
```

### border-width

Border thickness in pixels. Accepts `1`, `2`, or `3`. Defaults to `2`.

```html
<aegov-card border-width="1">Thin border</aegov-card>
<aegov-card border-width="3">Thick border</aegov-card>
```

### border-style

Sets how the border looks.

- `standard` — solid `primary-600`
- `light` — solid `primary-200`
- `creative` — gradient from `primary-400` to `primary-800`
- `highlight` — solid `aeblack-200` at rest, transitions to a `primary-300 → 700` gradient on hover

```html
<aegov-card border-style="creative">Creative</aegov-card>
<aegov-card border-style="highlight" hover="standard">Hover me</aegov-card>
```

### bg

Background tone.

- `white` — white surface (default)
- `subtle` — `aeblack-50` surface

```html
<aegov-card bg="subtle">On a subtle surface</aegov-card>
```

### hover

Hover treatment.

- `off` — no hover effect (default)
- `standard` — border colour shift
- `glow` — soft drop-shadow glow

```html
<aegov-card hover="glow">Glow on hover</aegov-card>
```

### size

Controls padding and corner radius. Accepts `sm`, `base`, or `lg`. All sizes scale down responsively at `md` (768px) and `xs` (480px) breakpoints.

```html
<aegov-card size="sm">Compact</aegov-card>
<aegov-card size="base">Default</aegov-card>
<aegov-card size="lg">Spacious</aegov-card>
```

### field-id

Unique identifier reflected onto the inner `<div>`. Auto-generated as `aegov-card-{n}` if not provided.

```html
<aegov-card field-id="service-card-1">…</aegov-card>
```

## Sizes

`size` accepts a single token. The size affects padding and corner radius; all sizes degrade at `md` and `xs` breakpoints automatically.

```html
<aegov-card size="sm">Compact</aegov-card>
<aegov-card size="base">Default</aegov-card>
<aegov-card size="lg">Spacious</aegov-card>
```

## Examples

### Basic content card

```html
<aegov-card>
  <aegov-title level="3">Service title</aegov-title>
  <aegov-text>Short description of the service offered to citizens.</aegov-text>
  <aegov-button>Get started</aegov-button>
</aegov-card>
```

### Highlight card with hover gradient

```html
<aegov-card border-style="highlight" hover="standard">
  <aegov-title level="4">Featured service</aegov-title>
  <aegov-text size="sm">Hover to see the highlight border activate.</aegov-text>
</aegov-card>
```

### Edge-to-edge media card

```html
<aegov-card is-padding="false" hover="glow">
  <img src="/banner.jpg" alt="" style="display:block;width:100%;" />
  <div style="padding:1.25rem">
    <aegov-title level="4">Media-led card</aegov-title>
    <aegov-text>Body content sits beneath the full-bleed image.</aegov-text>
  </div>
</aegov-card>
```

### Subtle background panel

```html
<aegov-card bg="subtle" border-style="light" border-width="1">
  <aegov-text>A quieter panel for nested or supporting content.</aegov-text>
</aegov-card>
```

## RTL Behavior

The card itself is direction-agnostic — it is a simple bordered surface. Content rendered inside the default slot follows the document `dir`. Use Tailwind logical properties (`ms-*` / `me-*`, `ps-*` / `pe-*`) on inner elements when you need direction-aware layout that automatically adapts to `dir="rtl"`.

## API Reference

### Properties

| Property      | Attribute       | Description                                                          | Type                                                          | Default      |
| ------------- | --------------- | -------------------------------------------------------------------- | ------------------------------------------------------------- | ------------ |
| `fieldId`     | `field-id`      | Unique ID for the card element. Auto-generated if not provided.      | `string`                                                      | `undefined`  |
| `isPadding`   | `is-padding`    | Whether to apply inner padding.                                      | `boolean`                                                     | `true`       |
| `borderWidth` | `border-width`  | Border thickness (1, 2, or 3).                                       | `1 \| 2 \| 3`                                                 | `2`          |
| `borderStyle` | `border-style`  | Border treatment.                                                    | `'standard' \| 'light' \| 'creative' \| 'highlight'`         | `'standard'` |
| `bg`          | `bg`            | Background tone.                                                     | `'white' \| 'subtle'`                                         | `'white'`    |
| `hover`       | `hover`         | Hover effect.                                                        | `'off' \| 'standard' \| 'glow'`                              | `'off'`      |
| `size`        | `size`          | Size token controlling padding and radius.                           | `'sm' \| 'base' \| 'lg'`                                     | `'base'`     |

### Pass-through Attributes

`aria-*` and `data-*` attributes set on the host are forwarded to the inner `<div>`.

### Slots

| Slot      | Description                              |
| --------- | ---------------------------------------- |
| (default) | The card's content (any markup allowed). |

## Accessibility

### Built-in

- The card renders a single `<div>` so it carries no implicit role and does not interfere with assistive-technology announcements of its inner content.
- Pass-through `aria-*` allows consumers to apply roles such as `region` (with `aria-labelledby`) when the card represents a discrete landmark.

### Developer responsibilities

- If the entire card is interactive (e.g. clickable tile), wrap the contents in a single `<a>` or `<button>` so that keyboard users can focus and activate it. Do not attach a click handler directly to the card host without a focusable element inside.
- When the card represents a labelled region, set `role="region"` and `aria-labelledby` (pointing at the heading inside) via host attributes.
- Ensure inner content meets colour-contrast requirements against the chosen `bg` and `border-style`.

### Notes

- The `hover` prop affects visual feedback only; it does not add focus styles. Focus styling lives on the focusable elements inside the card.
- Card sizes scale down automatically at `md` (768px) and `xs` (480px) breakpoints so dense card grids remain legible on small screens.
