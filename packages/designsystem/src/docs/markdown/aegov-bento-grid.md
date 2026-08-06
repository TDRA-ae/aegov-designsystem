# Bento Grid

<p class="text-lg text-aeblack-500 mb-8">A Bento Grid arranges tiles in a responsive grid where individual tiles can span multiple columns or rows. Use it for a landing page's service overview, a dashboard of summary panels, or any layout where some items deserve more room than others.</p>

## Introduction

Put [`aegov-card`](aegov-card.html) elements — or any children — inside the grid, and set `data-col-span` or `data-row-span` on the ones that should be larger.

```html
<aegov-bento-grid cols="1 md:2 lg:4" gap="md">
  <aegov-card data-col-span="2" data-row-span="2" appearance="light">Hero tile</aegov-card>
  <aegov-card appearance="light">Tile 2</aegov-card>
  <aegov-card appearance="light">Tile 3</aegov-card>
  <aegov-card data-col-span="2" appearance="light">Wide tile</aegov-card>
  <aegov-card appearance="light">Tile 5</aegov-card>
</aegov-bento-grid>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-bento-grid field-id="bg-intro" cols="1 md:2 lg:4" gap="md">
    <aegov-card data-col-span="2" data-row-span="2" appearance="light" variant="neutral-min">
      <aegov-title size="text-h5" heading-type="h3" extra-class="mb-2">Hero tile</aegov-title>
      <aegov-text size="sm">Spans two columns and two rows on large screens.</aegov-text>
    </aegov-card>
    <aegov-card appearance="light" variant="neutral-min"><aegov-text size="sm">Tile 2</aegov-text></aegov-card>
    <aegov-card appearance="light" variant="neutral-min"><aegov-text size="sm">Tile 3</aegov-text></aegov-card>
    <aegov-card data-col-span="2" appearance="light" variant="neutral-min"><aegov-text size="sm">Wide tile</aegov-text></aegov-card>
    <aegov-card appearance="light" variant="neutral-min"><aegov-text size="sm">Tile 5</aegov-text></aegov-card>
  </aegov-bento-grid>
</div>

---

## Responsive columns

`cols` accepts either a single integer or a Tailwind-style responsive string. Values are clamped to 1–12.

```html
<aegov-bento-grid cols="3">…</aegov-bento-grid>
<aegov-bento-grid cols="1 md:2 lg:4">…</aegov-bento-grid>
<aegov-bento-grid cols="2 lg:3 2xl:6">…</aegov-bento-grid>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-8">
    <div>
      <p class="text-sm text-aeblack-500 mb-2">cols="3" — fixed</p>
      <aegov-bento-grid field-id="bg-c1" cols="3" gap="sm">
        <aegov-card appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">1</aegov-text></aegov-card>
        <aegov-card appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">2</aegov-text></aegov-card>
        <aegov-card appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">3</aegov-text></aegov-card>
      </aegov-bento-grid>
    </div>
    <div>
      <p class="text-sm text-aeblack-500 mb-2">cols="1 md:2 lg:4" — responsive</p>
      <aegov-bento-grid field-id="bg-c2" cols="1 md:2 lg:4" gap="sm">
        <aegov-card appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">1</aegov-text></aegov-card>
        <aegov-card appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">2</aegov-text></aegov-card>
        <aegov-card appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">3</aegov-text></aegov-card>
        <aegov-card appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">4</aegov-text></aegov-card>
      </aegov-bento-grid>
    </div>
  </div>
</div>

**Set the base value to `1`** so tiles stack on small screens. `cols="4"` with no responsive segments produces four columns at 320px, which is unusable and fails WCAG 2.2 SC 1.4.10 on reflow.

The breakpoint prefixes are `xs`, `sm`, `md`, `lg`, `xl` and `2xl`, resolved at runtime through `matchMedia` — so the column count changes live as the viewport changes.

---

## Gap

`gap` takes a size token rather than a raw value.

| Token | Spacing |
| --- | --- |
| `none` | No gap — tiles touch. |
| `xs` | Tightest. |
| `sm` | Compact. |
| `md` | Default. |
| `lg` | Roomy. |
| `xl` | Widest. |

```html
<aegov-bento-grid cols="3" gap="none">…</aegov-bento-grid>
<aegov-bento-grid cols="3" gap="lg">…</aegov-bento-grid>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-6">
    <div><p class="text-sm text-aeblack-500 mb-2">gap="xs"</p><aegov-bento-grid field-id="bg-g1" cols="3" gap="xs"><aegov-card appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">1</aegov-text></aegov-card><aegov-card appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">2</aegov-text></aegov-card><aegov-card appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">3</aegov-text></aegov-card></aegov-bento-grid></div>
    <div><p class="text-sm text-aeblack-500 mb-2">gap="md" (default)</p><aegov-bento-grid field-id="bg-g2" cols="3" gap="md"><aegov-card appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">1</aegov-text></aegov-card><aegov-card appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">2</aegov-text></aegov-card><aegov-card appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">3</aegov-text></aegov-card></aegov-bento-grid></div>
    <div><p class="text-sm text-aeblack-500 mb-2">gap="xl"</p><aegov-bento-grid field-id="bg-g3" cols="3" gap="xl"><aegov-card appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">1</aegov-text></aegov-card><aegov-card appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">2</aegov-text></aegov-card><aegov-card appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">3</aegov-text></aegov-card></aegov-bento-grid></div>
  </div>
</div>

Note this differs from [`aegov-navbar`](aegov-navbar.html), whose `gap` takes a Tailwind class name. Here it is a token.

---

## Spanning tiles

`data-col-span` and `data-row-span` on a child set how many cells it occupies. On `aegov-card` these are also available as the `dataColSpan` and `dataRowSpan` properties, which is what you use from JSX or a framework template.

```html
<aegov-bento-grid cols="1 md:2 lg:4" gap="md">
  <!-- 2 wide, 2 tall -->
  <aegov-card data-col-span="2" data-row-span="2">…</aegov-card>

  <!-- 2 wide -->
  <aegov-card data-col-span="2">…</aegov-card>

  <!-- 2 tall -->
  <aegov-card data-row-span="2">…</aegov-card>

  <!-- 1 × 1 -->
  <aegov-card>…</aegov-card>
</aegov-bento-grid>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-bento-grid field-id="bg-span" cols="1 md:2 lg:4" gap="md">
    <aegov-card data-col-span="2" data-row-span="2" appearance="light" variant="neutral-min"><aegov-text size="sm">2 × 2</aegov-text></aegov-card>
    <aegov-card data-col-span="2" appearance="light" variant="neutral-min"><aegov-text size="sm">2 wide</aegov-text></aegov-card>
    <aegov-card data-row-span="2" appearance="light" variant="neutral-min"><aegov-text size="sm">2 tall</aegov-text></aegov-card>
    <aegov-card appearance="light" variant="neutral-min"><aegov-text size="sm">1 × 1</aegov-text></aegov-card>
    <aegov-card appearance="light" variant="neutral-min"><aegov-text size="sm">1 × 1</aegov-text></aegov-card>
  </aegov-bento-grid>
</div>

A span larger than the current column count is clamped to the available width, so a `data-col-span="2"` tile still fits when the grid drops to a single column.

---

## Flow

`flow` controls how the browser fills gaps left by spanning tiles.

| Value | Behaviour |
| --- | --- |
| `dense` | Default. Later tiles backfill earlier gaps, so the grid has no holes. |
| `row` | Tiles are placed strictly in source order, leaving gaps where a tile does not fit. |

```html
<aegov-bento-grid flow="dense">…</aegov-bento-grid>
<aegov-bento-grid flow="row">…</aegov-bento-grid>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-8">
    <div>
      <p class="text-sm text-aeblack-500 mb-2">flow="dense" — gaps are backfilled</p>
      <aegov-bento-grid field-id="bg-f1" cols="3" gap="sm" flow="dense">
        <aegov-card data-col-span="2" appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">A (2 wide)</aegov-text></aegov-card>
        <aegov-card appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">B</aegov-text></aegov-card>
        <aegov-card data-col-span="2" appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">C (2 wide)</aegov-text></aegov-card>
        <aegov-card appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">D</aegov-text></aegov-card>
      </aegov-bento-grid>
    </div>
    <div>
      <p class="text-sm text-aeblack-500 mb-2">flow="row" — strict source order</p>
      <aegov-bento-grid field-id="bg-f2" cols="3" gap="sm" flow="row">
        <aegov-card data-col-span="2" appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">A (2 wide)</aegov-text></aegov-card>
        <aegov-card appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">B</aegov-text></aegov-card>
        <aegov-card data-col-span="2" appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">C (2 wide)</aegov-text></aegov-card>
        <aegov-card appearance="light" variant="neutral-min" size="sm"><aegov-text size="sm">D</aegov-text></aegov-card>
      </aegov-bento-grid>
    </div>
  </div>
</div>

`dense` produces a tidier layout but **can reorder tiles visually relative to the DOM**, which means the visual order no longer matches the reading and tab order. Where the order carries meaning — a ranked list, a sequence of steps — use `flow="row"` instead. This is a WCAG 2.2 SC 1.3.2 concern, not just an aesthetic one.

---

## Composite example — services overview

```html
<aegov-bento-grid cols="1 md:2 lg:3" gap="md" flow="row">
  <aegov-card data-col-span="2" appearance="creative" hover="standard">
    <aegov-title size="text-h4" heading-type="h2" extra-class="mb-2">
      <aegov-link href="/services/emirates-id">Emirates ID services</aegov-link>
    </aegov-title>
    <aegov-text>New cards, renewals, replacements and lost-card reports.</aegov-text>
  </aegov-card>

  <aegov-card appearance="light" hover="standard">
    <aegov-title size="text-h6" heading-type="h2" extra-class="mb-1">
      <aegov-link href="/services/residency">Residency</aegov-link>
    </aegov-title>
    <aegov-text size="sm">Visa applications and renewals.</aegov-text>
  </aegov-card>

  <aegov-card appearance="light" hover="standard">…</aegov-card>
  <aegov-card appearance="light" hover="standard">…</aegov-card>
  <aegov-card appearance="light" hover="standard">…</aegov-card>
</aegov-bento-grid>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-bento-grid field-id="bg-cx" cols="1 md:2 lg:3" gap="md" flow="row">
    <aegov-card data-col-span="2" appearance="creative" hover="standard">
      <aegov-title size="text-h5" heading-type="h2" extra-class="mb-2"><aegov-link href="#">Emirates ID services</aegov-link></aegov-title>
      <aegov-text>New cards, renewals, replacements and lost-card reports.</aegov-text>
    </aegov-card>
    <aegov-card appearance="light" variant="neutral-min" hover="standard">
      <aegov-title size="text-h6" heading-type="h2" extra-class="mb-1"><aegov-link href="#">Residency</aegov-link></aegov-title>
      <aegov-text size="sm">Visa applications and renewals.</aegov-text>
    </aegov-card>
    <aegov-card appearance="light" variant="neutral-min" hover="standard">
      <aegov-title size="text-h6" heading-type="h2" extra-class="mb-1"><aegov-link href="#">Vehicles</aegov-link></aegov-title>
      <aegov-text size="sm">Registration, licences and fines.</aegov-text>
    </aegov-card>
    <aegov-card appearance="light" variant="neutral-min" hover="standard">
      <aegov-title size="text-h6" heading-type="h2" extra-class="mb-1"><aegov-link href="#">Business</aegov-link></aegov-title>
      <aegov-text size="sm">Licensing and commercial registration.</aegov-text>
    </aegov-card>
    <aegov-card appearance="light" variant="neutral-min" hover="standard">
      <aegov-title size="text-h6" heading-type="h2" extra-class="mb-1"><aegov-link href="#">Open data</aegov-link></aegov-title>
      <aegov-text size="sm">Datasets and API documentation.</aegov-text>
    </aegov-card>
  </aegov-bento-grid>
</div>

---

## RTL Support

The grid is direction-aware. In a `dir="rtl"` container tiles are placed from the right, so the first tile in the DOM appears in the top-right cell and spans extend leftward. Nothing needs configuring — CSS Grid handles the inline axis logically.

```html
<div dir="rtl">
  <aegov-bento-grid cols="1 md:2 lg:3" gap="md" flow="row">
    <aegov-card data-col-span="2" appearance="creative">
      <aegov-title size="text-h5" heading-type="h2">خدمات الهوية الإماراتية</aegov-title>
    </aegov-card>
    <aegov-card appearance="light">
      <aegov-title size="text-h6" heading-type="h2">الإقامة</aegov-title>
    </aegov-card>
  </aegov-bento-grid>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-bento-grid field-id="bg-rtl" cols="1 md:2 lg:3" gap="md" flow="row">
    <aegov-card data-col-span="2" appearance="creative">
      <aegov-title size="text-h5" heading-type="h2" extra-class="mb-2"><aegov-link href="#">خدمات الهوية الإماراتية</aegov-link></aegov-title>
      <aegov-text>بطاقات جديدة، تجديد، بدل فاقد وتقارير الفقدان.</aegov-text>
    </aegov-card>
    <aegov-card appearance="light" variant="neutral-min">
      <aegov-title size="text-h6" heading-type="h2" extra-class="mb-1"><aegov-link href="#">الإقامة</aegov-link></aegov-title>
      <aegov-text size="sm">طلبات التأشيرات والتجديد.</aegov-text>
    </aegov-card>
    <aegov-card appearance="light" variant="neutral-min">
      <aegov-title size="text-h6" heading-type="h2" extra-class="mb-1"><aegov-link href="#">المركبات</aegov-link></aegov-title>
      <aegov-text size="sm">التسجيل والرخص والمخالفات.</aegov-text>
    </aegov-card>
  </aegov-bento-grid>
</div>

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the grid. Auto-generated when omitted, reflected. | `string` | _generated_ |
| `cols` | `cols` | Column count, or a responsive string. Clamped to 1–12. | `string` | `'1 md:2 lg:3'` |
| `gap` | `gap` | Spacing token between tiles. | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `flow` | `flow` | Whether later tiles backfill gaps. | `'dense' \| 'row'` | `'dense'` |

### Child attributes

Set these on the tiles, not the grid:

| Attribute | Description |
| --- | --- |
| `data-col-span` | Columns the tile occupies. Clamped to the current column count. |
| `data-row-span` | Rows the tile occupies. |

On `aegov-card` these are also the `dataColSpan` / `dataRowSpan` properties, for use from JSX and framework templates.

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | The tiles. Usually `aegov-card` elements, but any children work. |

### Events

None.

### Methods

None.

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the grid element, which carries `role="group"`. |
| `data-*` | Yes | Forwarded to the grid element. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host element. |

---

## Accessibility

### Built-in behaviour

- The grid element carries `role="group"`, so it is announced as a related set of tiles rather than as unconnected content.
- Layout is CSS Grid on the inline axis, so tile placement and spans mirror correctly under `dir="rtl"` without any configuration.
- Column resolution happens at runtime through `matchMedia`, so the layout responds to viewport changes and to zoom.

### Developer responsibilities

- **Name the group.** `role="group"` without an accessible name tells the user there is a boundary but not what it contains. Add `aria-label`, or `aria-labelledby` pointing at a visible heading above the grid.
- **Set the base column count to `1`.** A fixed multi-column grid does not reflow at 320px, failing WCAG 2.2 SC 1.4.10.
- **Use `flow="row"` when order matters.** `dense` backfilling can make the visual order diverge from the DOM order, breaking the correspondence that WCAG 2.2 SC 1.3.2 requires — and confusing keyboard users, whose tab order follows the DOM.
- **Keep the DOM order meaningful.** Put the most important tile first, rather than relying on a span to make it look first.
- **Structure tiles with real headings** so the grid is navigable by heading — see [Title](aegov-title.html).
- **Do not use a bento grid for tabular data.** A grid of tiles is not a table; if the content has rows and columns of comparable values, use a `<table>`.
- **Test at 320px and at 200% zoom.** Spanning tiles are the most common source of overflow in these layouts.

### Keyboard support

The grid is not interactive and is not a focus stop. Focusable content inside the tiles follows DOM order — which is exactly why `flow="dense"` needs care.

---

## Where to next

- [Card](aegov-card.html) — the usual tile, and the span properties.
- [Aspect Ratio](aegov-aspect-ratio.html) — for consistent media inside tiles.
- [Title](aegov-title.html) — heading structure inside tiles.
- [Installation](installation.html) — how responsive property strings are resolved.
