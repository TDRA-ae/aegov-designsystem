# aegov-title

A typographic component for rendering titled text with the design system's heading scale. Use it whenever you need a section title, card title, or visually-prominent label that should follow the system's title sizing — and optionally render as a semantic heading tag (`h2`–`h6`).

## Properties

### size

Controls title size. Accepts `sm`, `base`, `lg`, `xl`, or `2xl`. Also supports a Tailwind-style responsive string.

```html
<aegov-title size="base">Section title</aegov-title>
<aegov-title size="2xl">Hero title</aegov-title>
```

### heading-type

Sets the semantic wrapper element. Accepts `h2`, `h3`, `h4`, `h5`, `h6`, or `p`. When omitted, defaults to `<p>`.

```html
<aegov-title heading-type="h2" size="xl">Page section</aegov-title>
```

### field-id

Unique ID for the rendered element. Auto-generated if not provided.

```html
<aegov-title field-id="dashboard-title">Dashboard</aegov-title>
```

### extra-class

Additional CSS classes merged onto the rendered title.

```html
<aegov-title extra-class="text-primary-700">Branded title</aegov-title>
```

## Sizes

`size` accepts a single token or a responsive string using Tailwind-style breakpoint prefixes.

```html
<!-- Static -->
<aegov-title size="sm"></aegov-title>
<aegov-title size="base"></aegov-title>
<aegov-title size="lg"></aegov-title>
<aegov-title size="xl"></aegov-title>
<aegov-title size="2xl"></aegov-title>

<!-- Responsive -->
<aegov-title size="sm md:base lg:lg">Scales with viewport</aegov-title>
```

| Token | Tailwind class | Approximate size |
| ----- | -------------- | ---------------- |
| `sm`   | `text-base!` | 16px |
| `base` | `text-lg!`   | 18px |
| `lg`   | `text-xl!`   | 20px |
| `xl`   | `text-2xl!`  | 24px |
| `2xl`  | `text-3xl!`  | 30px |

The `!` suffix is required to override the global heading base styles set in `global.css`.

## Examples

### Section title (semantic h2)

```html
<aegov-title heading-type="h2" size="xl">Latest News</aegov-title>
```

### Card title (default p)

```html
<aegov-title size="base">Card title</aegov-title>
<aegov-text size="sm">Supporting description.</aegov-text>
```

### Hero title (responsive)

```html
<aegov-title heading-type="h2" size="xl md:2xl">
  Welcome to UAE Government
</aegov-title>
```

### Linked via id

```html
<aegov-title field-id="terms" heading-type="h3" size="lg">Terms</aegov-title>
<a href="#terms">Jump to terms</a>
```

## RTL Behavior

The component automatically swaps fonts for RTL contexts: it applies `font-inter` for LTR and `font-alexandria` for RTL via Tailwind's `rtl:` variant. No manual configuration is needed — wrap the page (or any ancestor) with `dir="rtl"` and the title font will switch.

## API Reference

### Properties

| Property      | Attribute      | Description                                                       | Type                                          | Default     |
| ------------- | -------------- | ----------------------------------------------------------------- | --------------------------------------------- | ----------- |
| `fieldId`     | `field-id`     | Unique ID for the rendered element. Auto-generated if not provided. | `string`                                    | `undefined` |
| `size`        | `size`         | Size token (`sm`, `base`, `lg`, `xl`, `2xl`) or responsive string. | `string`                                     | `'base'`    |
| `headingType` | `heading-type` | Semantic wrapper element.                                          | `"h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "p"` | `undefined` (renders `<p>`) |
| `extraClass`  | `extra-class`  | Additional classes applied to the rendered element.                | `string`                                     | `undefined` |

### Pass-through Attributes

`aria-*` and `data-*` attributes set on the host are forwarded to the rendered title element.

### Slots

| Slot      | Description           |
| --------- | --------------------- |
| (default) | The title text content |

## Accessibility

### Built-in

- Renders a real heading tag (`h2`–`h6`) when `heading-type` is set, contributing to the document outline.
- Auto-generated `id` allows the title to be referenced via `aria-labelledby` from related regions.

### Developer responsibilities

- Choose `heading-type` to match the page's heading hierarchy. Skipping levels (e.g. `h2` → `h4`) is discouraged.
- When using a title purely as visual styling (not a true heading), leave `heading-type` unset so it renders a `<p>`.
- Do not rely on `size` alone for screen reader hierarchy — visual size and semantic level are independent.

### Notes

- `heading-type` does not include `h1` because pages should typically have only one `h1`, sourced from page-level layout markup, not a reusable component.
