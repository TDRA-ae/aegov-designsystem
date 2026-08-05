# Bento Grid

<p class="text-lg text-aeblack-500 mb-8">A layout container that arranges <code>aegov-card</code> children into a balanced-but-non-uniform &ldquo;bento box&rdquo; grid. It owns the column count, the gap between tiles, and the responsive stacking behaviour, while each card declares its own column and row span via simple data attributes.</p>

## Introduction

The `aegov-bento-grid` component wraps a group of `aegov-card` elements (or any direct children) and lays them out using CSS Grid. Use it for marketing landing pages, feature showcases, dashboards, or anywhere you need several cards composed into a deliberate, irregular pattern.

```html
<aegov-bento-grid cols="1 md:2 lg:4" gap="md">
  <aegov-card data-col-span="2" data-row-span="2" appearance="light">
    <aegov-title level="3">Hero tile</aegov-title>
    <aegov-text>Spans 2 columns × 2 rows on large screens.</aegov-text>
  </aegov-card>
  <aegov-card appearance="light"><aegov-text>Tile 2</aegov-text></aegov-card>
  <aegov-card appearance="light"><aegov-text>Tile 3</aegov-text></aegov-card>
  <aegov-card data-col-span="2" appearance="light"><aegov-text>Wide tile</aegov-text></aegov-card>
  <aegov-card appearance="light"><aegov-text>Tile 5</aegov-text></aegov-card>
</aegov-bento-grid>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-bento-grid cols="1 md:2 lg:4" gap="md">
    <aegov-card data-col-span="2" data-row-span="2" appearance="light">
      <aegov-title level="3">Hero tile</aegov-title>
      <aegov-text>Spans 2 columns × 2 rows on large screens.</aegov-text>
    </aegov-card>
    <aegov-card appearance="light"><aegov-text>Tile 2</aegov-text></aegov-card>
    <aegov-card appearance="light"><aegov-text>Tile 3</aegov-text></aegov-card>
    <aegov-card data-col-span="2" appearance="light"><aegov-text>Wide tile</aegov-text></aegov-card>
    <aegov-card appearance="light"><aegov-text>Tile 5</aegov-text></aegov-card>
  </aegov-bento-grid>
</div>

---

## Responsive Columns

The `cols` prop accepts a single positive integer (`cols="3"`) or a Tailwind-style responsive string (`cols="1 md:2 lg:4"`). Values are clamped to the range 1–12. The first token is the base value; each `bp:n` segment overrides it once the viewport meets the named breakpoint.

To stack cards vertically on small viewports, set the base value to `1`:

```html
<aegov-bento-grid cols="1 md:2 lg:3" gap="md">
  <aegov-card appearance="light"><aegov-text>One</aegov-text></aegov-card>
  <aegov-card appearance="light"><aegov-text>Two</aegov-text></aegov-card>
  <aegov-card appearance="light"><aegov-text>Three</aegov-text></aegov-card>
  <aegov-card appearance="light"><aegov-text>Four</aegov-text></aegov-card>
  <aegov-card appearance="light"><aegov-text>Five</aegov-text></aegov-card>
  <aegov-card appearance="light"><aegov-text>Six</aegov-text></aegov-card>
</aegov-bento-grid>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-bento-grid cols="1 md:2 lg:3" gap="md">
    <aegov-card appearance="light"><aegov-text>One</aegov-text></aegov-card>
    <aegov-card appearance="light"><aegov-text>Two</aegov-text></aegov-card>
    <aegov-card appearance="light"><aegov-text>Three</aegov-text></aegov-card>
    <aegov-card appearance="light"><aegov-text>Four</aegov-text></aegov-card>
    <aegov-card appearance="light"><aegov-text>Five</aegov-text></aegov-card>
    <aegov-card appearance="light"><aegov-text>Six</aegov-text></aegov-card>
  </aegov-bento-grid>
</div>

When the resolved column count drops below a card's `data-col-span`, the parent automatically clamps the span — at `cols="1"`, every tile occupies the full row.

---

## Per-Card Spans

Each direct child can opt into a larger footprint with two data attributes:

- `data-col-span="N"` — number of columns to occupy (1–12). Capped to the current `cols` value.
- `data-row-span="N"` — number of rows to occupy (1–6).

Both attributes also support responsive syntax, mirroring `cols`:

```html
<aegov-card data-col-span="1 md:2 lg:3" data-row-span="2">…</aegov-card>
```

Unset attributes fall back to span 1.

```html
<aegov-bento-grid cols="1 md:3" gap="md">
  <aegov-card data-col-span="2" data-row-span="2" appearance="light" hover="standard">
    <aegov-title level="3">Featured</aegov-title>
    <aegov-text size="sm">A larger tile draws the eye to the most important content.</aegov-text>
  </aegov-card>
  <aegov-card appearance="light"><aegov-text>Quick stat</aegov-text></aegov-card>
  <aegov-card appearance="light"><aegov-text>Quick stat</aegov-text></aegov-card>
  <aegov-card data-col-span="3" appearance="light"><aegov-text>Wide footer tile</aegov-text></aegov-card>
</aegov-bento-grid>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-bento-grid cols="1 md:3" gap="md">
    <aegov-card data-col-span="2" data-row-span="2" appearance="light" hover="standard">
      <aegov-title level="3">Featured</aegov-title>
      <aegov-text size="sm">A larger tile draws the eye to the most important content.</aegov-text>
    </aegov-card>
    <aegov-card appearance="light"><aegov-text>Quick stat</aegov-text></aegov-card>
    <aegov-card appearance="light"><aegov-text>Quick stat</aegov-text></aegov-card>
    <aegov-card data-col-span="3" appearance="light"><aegov-text>Wide footer tile</aegov-text></aegov-card>
  </aegov-bento-grid>
</div>

---

## Gap

The `gap` prop accepts a named size — `none`, `xs`, `sm`, `md` (default), `lg`, `xl` — and supports responsive syntax. Sizes map to a fixed token: `none=0`, `xs=0.25rem`, `sm=0.5rem`, `md=1rem`, `lg=1.5rem`, `xl=2rem`.

```html
<aegov-bento-grid cols="3" gap="sm">…</aegov-bento-grid>
<aegov-bento-grid cols="3" gap="md">…</aegov-bento-grid>
<aegov-bento-grid cols="3" gap="lg">…</aegov-bento-grid>
<aegov-bento-grid cols="3" gap="sm md:lg">…</aegov-bento-grid>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="mb-2 text-sm text-aeblack-500">gap="sm"</p>
  <aegov-bento-grid cols="3" gap="sm">
    <aegov-card appearance="light"><aegov-text>One</aegov-text></aegov-card>
    <aegov-card appearance="light"><aegov-text>Two</aegov-text></aegov-card>
    <aegov-card appearance="light"><aegov-text>Three</aegov-text></aegov-card>
  </aegov-bento-grid>

  <p class="mt-6 mb-2 text-sm text-aeblack-500">gap="md"</p>
  <aegov-bento-grid cols="3" gap="md">
    <aegov-card appearance="light"><aegov-text>One</aegov-text></aegov-card>
    <aegov-card appearance="light"><aegov-text>Two</aegov-text></aegov-card>
    <aegov-card appearance="light"><aegov-text>Three</aegov-text></aegov-card>
  </aegov-bento-grid>

  <p class="mt-6 mb-2 text-sm text-aeblack-500">gap="lg"</p>
  <aegov-bento-grid cols="3" gap="lg">
    <aegov-card appearance="light"><aegov-text>One</aegov-text></aegov-card>
    <aegov-card appearance="light"><aegov-text>Two</aegov-text></aegov-card>
    <aegov-card appearance="light"><aegov-text>Three</aegov-text></aegov-card>
  </aegov-bento-grid>
</div>

---

## Auto-flow — Dense vs. Row

The `flow` prop controls how the browser places tiles when spans leave gaps in the grid.

- `dense` (default) — the browser back-fills earlier holes with later, smaller tiles. This produces the classic bento packing where the grid is fully tessellated.
- `row` — strict DOM order. A larger tile that would not fit on the current row pushes to the next, leaving the gap behind it.

```html
<aegov-bento-grid cols="3" gap="md" flow="dense">…</aegov-bento-grid>
<aegov-bento-grid cols="3" gap="md" flow="row">…</aegov-bento-grid>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="mb-2 text-sm text-aeblack-500">flow="dense" — back-fills holes</p>
  <aegov-bento-grid cols="3" gap="md" flow="dense">
    <aegov-card data-col-span="2" appearance="light"><aegov-text>A (span 2)</aegov-text></aegov-card>
    <aegov-card appearance="light"><aegov-text>B</aegov-text></aegov-card>
    <aegov-card appearance="light"><aegov-text>C</aegov-text></aegov-card>
    <aegov-card data-col-span="2" appearance="light"><aegov-text>D (span 2)</aegov-text></aegov-card>
  </aegov-bento-grid>

  <p class="mt-6 mb-2 text-sm text-aeblack-500">flow="row" — strict order, may leave gaps</p>
  <aegov-bento-grid cols="3" gap="md" flow="row">
    <aegov-card data-col-span="2" appearance="light"><aegov-text>A (span 2)</aegov-text></aegov-card>
    <aegov-card appearance="light"><aegov-text>B</aegov-text></aegov-card>
    <aegov-card appearance="light"><aegov-text>C</aegov-text></aegov-card>
    <aegov-card data-col-span="2" appearance="light"><aegov-text>D (span 2)</aegov-text></aegov-card>
  </aegov-bento-grid>
</div>

---

## Stacking on Mobile

Bento grids should collapse to a single column on narrow viewports so cards stay readable. The recommended pattern is to start `cols` at `1` and step up at the appropriate breakpoint:

```html
<aegov-bento-grid cols="1 md:2 lg:4" gap="md">
  <aegov-card data-col-span="2" appearance="light">…</aegov-card>
  <aegov-card appearance="light">…</aegov-card>
  <aegov-card appearance="light">…</aegov-card>
</aegov-bento-grid>
```

Below `md`, the grid resolves to `cols="1"`, all `data-col-span` values are clamped to 1, and the cards stack vertically — no extra prop needed.

---

## API Reference

### Properties

| Property  | Attribute  | Description                                                                                                                  | Type                  | Default       |
| --------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------- |
| `cols`    | `cols`     | Number of columns. Accepts a single positive integer or a Tailwind-style responsive string. Clamped to 1–12.                  | `string`              | `'1 md:2 lg:3'` |
| `gap`     | `gap`      | Gap between tiles. Named sizes — `none`, `xs`, `sm`, `md`, `lg`, `xl`. Supports responsive syntax.                            | `string`              | `'md'`        |
| `flow`    | `flow`     | Auto-flow mode — `dense` (back-fills holes) or `row` (strict DOM order).                                                     | `'dense' \| 'row'`    | `'dense'`     |
| `fieldId` | `field-id` | Reflected `id` on the inner wrapper. Auto-generated if not provided.                                                         | `string`              | _generated_   |

### Per-Child Data Attributes

These are read by `aegov-bento-grid` and applied as inline grid spans on each direct child:

| Attribute        | Description                                                                       | Range        |
| ---------------- | --------------------------------------------------------------------------------- | ------------ |
| `data-col-span`  | Columns to span. Clamped to the resolved `cols` value. Supports responsive syntax. | `1`–`12`     |
| `data-row-span`  | Rows to span. Supports responsive syntax.                                         | `1`–`6`      |

### Slots

| Component          | Slot        | Description                                                                                |
| ------------------ | ----------- | ------------------------------------------------------------------------------------------ |
| `aegov-bento-grid` | _(default)_ | Place one or more `aegov-card` elements (or any direct children) here.                     |

### Pass-through Attributes

| Attribute group  | Forwarded? | Notes                                                                          |
| ---------------- | ---------- | ------------------------------------------------------------------------------ |
| `aria-*`         | Yes        | Forwarded to the inner grid wrapper. Use `aria-label` to describe the cluster. |
| `data-*`         | Yes        | Forwarded to the inner wrapper (excluding the per-child span attributes).      |
| `id`             | No         | Use `field-id` instead — the `id` HTML attribute is not forwarded through.     |

---

## Accessibility

### Built-in behaviour

- The inner wrapper has `role="group"` so assistive technologies announce the cluster as a single unit.
- Tab order follows DOM order. Cards remain individually focusable and operate exactly as outside a grid.
- The grid itself is a non-interactive container — there is no keyboard semantics layered on top of the cards.

### Developer responsibilities

- Provide an `aria-label` (or `aria-labelledby`) on the host when the cluster has a meaningful name (e.g. `aria-label="Service highlights"`). The default `role="group"` alone is generic.
- If a card is a clickable surface, ensure it is itself a focusable element (link or button) — the bento grid does not wrap children in a button.
- Avoid relying on visual ordering alone to communicate priority. Screen readers follow DOM order regardless of how `flow="dense"` re-shuffles the visual layout.

### Notes

- Per-card spans are applied as inline styles on each direct child (`grid-column`, `grid-row`). They are removed/cleared when the resolved span is `1`.
- The grid observes `data-col-span` / `data-row-span` attribute mutations on direct children, so dynamically updating spans (e.g. from JavaScript) re-applies layout automatically.
- Only direct children receive layout treatment. Nested `aegov-card` elements inside a tile are unaffected.
