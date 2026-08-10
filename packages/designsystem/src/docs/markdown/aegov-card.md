# Card

<p class="text-lg text-aeblack-500 mb-8">A flexible bordered container for grouping related content — service tiles, summary panels, dashboard sections, profile snippets, and list items. Cards support three appearance treatments across four colour variants, three sizes, optional hover effects, and any Tailwind background utility for the surface colour. Their content is fully slotted, so any combination of headings, body copy, badges, or actions can be composed inside.</p>

## Introduction

The `aegov-card` component renders a single bordered surface with a default content slot. It exposes a small but expressive set of properties — border thickness, appearance, variant, hover effect, size, and inner padding — so the same primitive can adapt to a service tile, a feature highlight, a media card, or a quiet supporting panel. Surface colour is controlled with any Tailwind background utility on the host.

```html
<aegov-card>
  <aegov-title level="3">Apply for Emirates ID</aegov-title>
  <aegov-text size="sm">
    Renew, replace, or apply for an Emirates ID online through ICP services.
  </aegov-text>
  <aegov-button>Start application</aegov-button>
</aegov-card>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-card>
    <aegov-title level="3">Apply for Emirates ID</aegov-title>
    <aegov-text size="sm">Renew, replace, or apply for an Emirates ID online through ICP services.</aegov-text>
    <div class="mt-4">
      <aegov-button>Start application</aegov-button>
    </div>
  </aegov-card>
</div>

---

## Appearance

The `appearance` property controls how the card outline is drawn. Three treatments are available, ranging from a quiet light outline to a bold gradient. Border colour resolves from the `variant` property (default `primary`).

- `solid` — solid full-strength border (default)
- `light` — solid subtle low-contrast border
- `creative` — gradient border via the background-clip trick

```html
<aegov-card appearance="solid">Solid outline</aegov-card>
<aegov-card appearance="light">Light outline</aegov-card>
<aegov-card appearance="creative">Creative gradient</aegov-card>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <aegov-card appearance="solid">
      <aegov-title level="4">Solid</aegov-title>
      <aegov-text size="sm">Full-strength border. Use as the default surface.</aegov-text>
    </aegov-card>
    <aegov-card appearance="light">
      <aegov-title level="4">Light</aegov-title>
      <aegov-text size="sm">Quieter outline for grouped or supporting content.</aegov-text>
    </aegov-card>
    <aegov-card appearance="creative">
      <aegov-title level="4">Creative</aegov-title>
      <aegov-text size="sm">Gradient outline for featured or promotional cards.</aegov-text>
    </aegov-card>
  </div>
</div>

---

## Variant

The `variant` property selects the colour family for the border, hover state, and glow shadow. It composes with `appearance` to resolve the actual token values.

- `primary` — primary-* family (default)
- `secondary` — secondary-* family
- `neutral-max` — strong neutral (aeblack-800 family)
- `neutral-min` — quiet neutral (aeblack-100 family)

### Border colour matrix

| Variant       | Solid               | Light               | Creative gradient                   |
| ------------- | ------------------- | ------------------- | ----------------------------------- |
| `primary`     | `primary-600`       | `primary-200`       | `primary-400 → primary-800`         |
| `secondary`   | `secondary-600`     | `secondary-200`     | `secondary-400 → secondary-800`     |
| `neutral-max` | `aeblack-800`       | `aeblack-400`       | `aeblack-400 → aeblack-800`         |
| `neutral-min` | `aeblack-100`       | `aeblack-50`        | `aeblack-50 → aeblack-300`          |

Each cell below renders the matching `variant` + `appearance` combination.

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">

  <aegov-text size="sm" class="font-semibold mb-2 block">Primary</aegov-text>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <aegov-card variant="primary" appearance="solid">
      <aegov-title level="5">Primary · Solid</aegov-title>
      <aegov-text size="sm">border <code>primary-600</code></aegov-text>
    </aegov-card>
    <aegov-card variant="primary" appearance="light">
      <aegov-title level="5">Primary · Light</aegov-title>
      <aegov-text size="sm">border <code>primary-200</code></aegov-text>
    </aegov-card>
    <aegov-card variant="primary" appearance="creative">
      <aegov-title level="5">Primary · Creative</aegov-title>
      <aegov-text size="sm">gradient <code>primary-400 → 800</code></aegov-text>
    </aegov-card>
  </div>

  <aegov-text size="sm" class="font-semibold mb-2 block">Secondary</aegov-text>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <aegov-card variant="secondary" appearance="solid">
      <aegov-title level="5">Secondary · Solid</aegov-title>
      <aegov-text size="sm">border <code>secondary-600</code></aegov-text>
    </aegov-card>
    <aegov-card variant="secondary" appearance="light">
      <aegov-title level="5">Secondary · Light</aegov-title>
      <aegov-text size="sm">border <code>secondary-200</code></aegov-text>
    </aegov-card>
    <aegov-card variant="secondary" appearance="creative">
      <aegov-title level="5">Secondary · Creative</aegov-title>
      <aegov-text size="sm">gradient <code>secondary-400 → 800</code></aegov-text>
    </aegov-card>
  </div>

  <aegov-text size="sm" class="font-semibold mb-2 block">Neutral-max</aegov-text>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <aegov-card variant="neutral-max" appearance="solid">
      <aegov-title level="5">Neutral-max · Solid</aegov-title>
      <aegov-text size="sm">border <code>aeblack-800</code></aegov-text>
    </aegov-card>
    <aegov-card variant="neutral-max" appearance="light">
      <aegov-title level="5">Neutral-max · Light</aegov-title>
      <aegov-text size="sm">border <code>aeblack-400</code></aegov-text>
    </aegov-card>
    <aegov-card variant="neutral-max" appearance="creative">
      <aegov-title level="5">Neutral-max · Creative</aegov-title>
      <aegov-text size="sm">gradient <code>aeblack-400 → 800</code></aegov-text>
    </aegov-card>
  </div>

  <aegov-text size="sm" class="font-semibold mb-2 block">Neutral-min</aegov-text>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <aegov-card variant="neutral-min" appearance="solid">
      <aegov-title level="5">Neutral-min · Solid</aegov-title>
      <aegov-text size="sm">border <code>aeblack-100</code></aegov-text>
    </aegov-card>
    <aegov-card variant="neutral-min" appearance="light">
      <aegov-title level="5">Neutral-min · Light</aegov-title>
      <aegov-text size="sm">border <code>aeblack-50</code></aegov-text>
    </aegov-card>
    <aegov-card variant="neutral-min" appearance="creative">
      <aegov-title level="5">Neutral-min · Creative</aegov-title>
      <aegov-text size="sm">gradient <code>aeblack-50 → 300</code></aegov-text>
    </aegov-card>
  </div>

</div>

```html
<!-- Primary -->
<aegov-card variant="primary" appearance="solid">Primary solid</aegov-card>
<aegov-card variant="primary" appearance="light">Primary light</aegov-card>
<aegov-card variant="primary" appearance="creative">Primary creative</aegov-card>

<!-- Secondary -->
<aegov-card variant="secondary" appearance="solid">Secondary solid</aegov-card>
<aegov-card variant="secondary" appearance="light">Secondary light</aegov-card>
<aegov-card variant="secondary" appearance="creative">Secondary creative</aegov-card>

<!-- Neutral-max -->
<aegov-card variant="neutral-max" appearance="solid">Neutral-max solid</aegov-card>
<aegov-card variant="neutral-max" appearance="light">Neutral-max light</aegov-card>
<aegov-card variant="neutral-max" appearance="creative">Neutral-max creative</aegov-card>

<!-- Neutral-min -->
<aegov-card variant="neutral-min" appearance="solid">Neutral-min solid</aegov-card>
<aegov-card variant="neutral-min" appearance="light">Neutral-min light</aegov-card>
<aegov-card variant="neutral-min" appearance="creative">Neutral-min creative</aegov-card>
```

---

## Border Width

`border-width` accepts `1`, `2`, or `3` and controls the outline thickness in pixels. The default of `2` works well for most contexts; reach for `1` when the card sits next to many siblings, and `3` for hero or featured cards where extra emphasis is desired.

```html
<aegov-card border-width="1">Thin border</aegov-card>
<aegov-card border-width="2">Default border</aegov-card>
<aegov-card border-width="3">Thick border</aegov-card>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <aegov-card border-width="1">
      <aegov-text size="sm">1 px border — quiet emphasis.</aegov-text>
    </aegov-card>
    <aegov-card border-width="2">
      <aegov-text size="sm">2 px border — the default.</aegov-text>
    </aegov-card>
    <aegov-card border-width="3">
      <aegov-text size="sm">3 px border — strong emphasis.</aegov-text>
    </aegov-card>
  </div>
</div>

---

## Background

Cards default to a white surface. Override with any Tailwind background utility on the host element — designsystem token (`bg-aeblack-50`, `bg-aegreen-400`), arbitrary value (`bg-[oklch(50%_0.1_120)]`), or your own utility class. The `creative` appearance uses a nested-div geometry so the consumer-painted surface fills the card body while the variant gradient renders on the border ring.

```html
<aegov-card>Default white surface</aegov-card>
<aegov-card class="bg-aeblack-50" appearance="light">Subtle aeblack-50 surface</aegov-card>
<aegov-card class="bg-aegreen-400">Custom aegreen-400 surface</aegov-card>
<aegov-card class="bg-aegreen-400" appearance="creative" variant="primary">Creative gradient on aegreen surface</aegov-card>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <aegov-card>
      <aegov-title level="4">Default</aegov-title>
      <aegov-text size="sm">White surface — the default for primary cards.</aegov-text>
    </aegov-card>
    <aegov-card class="bg-aeblack-50" appearance="light">
      <aegov-title level="4">Subtle</aegov-title>
      <aegov-text size="sm">Class override <code>bg-aeblack-50</code> for nested panels.</aegov-text>
    </aegov-card>
    <aegov-card class="bg-aegreen-400">
      <aegov-title level="4">Custom — aegreen-400</aegov-title>
      <aegov-text size="sm">Any Tailwind <code>bg-*</code> utility paints the host.</aegov-text>
    </aegov-card>
    <aegov-card class="bg-aegreen-400" appearance="creative" variant="primary">
      <aegov-title level="4">Creative on coloured surface</aegov-title>
      <aegov-text size="sm">Inner div paints host colour, outer paints variant gradient as a ring.</aegov-text>
    </aegov-card>
  </div>
</div>

---

## Hover Effect

The `hover` property adds visual feedback when the user hovers over the card.

- `off` — no hover effect (default)
- `standard` — border colour shift
- `glow` — soft drop-shadow glow

Use `standard` for clickable tiles and `glow` for prominent links to a deeper page. Hover styles are visual only — focus styling lives on the focusable element inside the card.

```html
<aegov-card hover="off">No hover</aegov-card>
<aegov-card hover="standard">Border shift on hover</aegov-card>
<aegov-card hover="glow">Drop-shadow glow on hover</aegov-card>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <aegov-card hover="off">
      <aegov-title level="4">No hover</aegov-title>
      <aegov-text size="sm">Static surface — used for non-interactive cards.</aegov-text>
    </aegov-card>
    <aegov-card hover="standard">
      <aegov-title level="4">Standard</aegov-title>
      <aegov-text size="sm">Hover to see the border colour shift.</aegov-text>
    </aegov-card>
    <aegov-card hover="glow">
      <aegov-title level="4">Glow</aegov-title>
      <aegov-text size="sm">Hover for a soft drop-shadow glow.</aegov-text>
    </aegov-card>
  </div>
</div>

---

## Sizes

`size` controls the inner padding and corner radius. Three tokens are available — `sm`, `base` (default), and `lg`. All sizes scale down responsively at the `md` (768px) and `xs` (480px) breakpoints, so dense card grids remain legible on small screens.

```html
<aegov-card size="sm">Compact</aegov-card>
<aegov-card size="base">Default</aegov-card>
<aegov-card size="lg">Spacious</aegov-card>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <aegov-card size="sm">
      <aegov-title level="4">Small</aegov-title>
      <aegov-text size="sm">Compact padding and tighter corner radius.</aegov-text>
    </aegov-card>
    <aegov-card size="base">
      <aegov-title level="4">Base</aegov-title>
      <aegov-text size="sm">The default size — suitable for most cards.</aegov-text>
    </aegov-card>
    <aegov-card size="lg">
      <aegov-title level="4">Large</aegov-title>
      <aegov-text size="sm">Generous padding for hero or featured cards.</aegov-text>
    </aegov-card>
  </div>
</div>

---

## Padding

By default a card applies `1.5rem` (24px) of inner padding. Set `is-padding="false"` when you need edge-to-edge content — a media image, a data table, or any element that should bleed to the card border. Provide your own inner padding for the body content beneath.

```html
<aegov-card is-padding="false" hover="glow">
  <img src="https://i.pravatar.cc/600?img=15" alt="" style="display:block;width:100%;border-top-left-radius:inherit;border-top-right-radius:inherit;" />
  <div style="padding:1.25rem;">
    <aegov-title level="4">Smart Dubai initiative</aegov-title>
    <aegov-text size="sm">Edge-to-edge media with custom padding beneath.</aegov-text>
  </div>
</aegov-card>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-card is-padding="false" hover="glow">
    <img src="https://i.pravatar.cc/600?img=15" alt="" style="display:block;width:100%;height:200px;object-fit:cover;border-top-left-radius:inherit;border-top-right-radius:inherit;" />
    <div style="padding:1.25rem;">
      <aegov-title level="4">Smart Dubai initiative</aegov-title>
      <aegov-text size="sm">Edge-to-edge media with custom padding beneath the image.</aegov-text>
    </div>
  </aegov-card>
</div>

---

## Grid Spanning

`dataColSpan` and `dataRowSpan` control how many columns or rows the card spans when placed inside an `aegov-bento-grid` (or any CSS grid container that reads these attributes). Both accept a plain integer or a responsive syntax using Tailwind-style breakpoint prefixes.

- `data-col-span` — sets the number of CSS grid columns the card spans
- `data-row-span` — sets the number of CSS grid rows the card spans

```html
<!-- Span 2 columns at all breakpoints -->
<aegov-card data-col-span="2">Wide card</aegov-card>

<!-- Responsive: 1 column on mobile, 2 from md upward, 3 from lg upward -->
<aegov-card data-col-span="1 md:2 lg:3">Responsive spanning card</aegov-card>

<!-- Span 2 rows — tall card alongside normal single-row siblings -->
<aegov-card data-row-span="2">Tall card</aegov-card>
```

Both props default to `undefined`, meaning the card takes its natural grid-item size. They have no visual effect outside a grid context.

---

## Composite Examples

Cards combine well with other components — titles, text, badges, avatars, and buttons — to build service tiles, profile cards, and dashboard panels.

### Ministry service tile

```html
<aegov-card hover="glow" appearance="creative">
  <aegov-badge variant="success" size="sm">Active</aegov-badge>
  <aegov-title level="3">Renew vehicle registration</aegov-title>
  <aegov-text size="sm">
    Renew your vehicle registration through the Ministry of Interior portal — most
    renewals are processed within minutes.
  </aegov-text>
  <aegov-button>Renew now</aegov-button>
</aegov-card>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-card hover="glow" appearance="creative">
    <div class="mb-3"><aegov-badge variant="success" size="sm">Active</aegov-badge></div>
    <aegov-title level="3">Renew vehicle registration</aegov-title>
    <aegov-text size="sm">Renew your vehicle registration through the Ministry of Interior portal — most renewals are processed within minutes.</aegov-text>
    <div class="mt-4"><aegov-button>Renew now</aegov-button></div>
  </aegov-card>
</div>

### Profile card

```html
<aegov-card appearance="light">
  <div style="display:flex;gap:1rem;align-items:center;">
    <aegov-avatar
      src="https://i.pravatar.cc/150?img=12"
      alt="Khalid Al Mansoori"
      size="lg"
      appearance="rounded"
      status="online"
    ></aegov-avatar>
    <div>
      <aegov-title level="4">Khalid Al Mansoori</aegov-title>
      <aegov-text size="sm">Director, Digital Services — TDRA</aegov-text>
    </div>
  </div>
</aegov-card>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-card appearance="light">
    <div style="display:flex;gap:1rem;align-items:center;">
      <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="Khalid Al Mansoori" size="lg" appearance="rounded" status="online"></aegov-avatar>
      <div>
        <aegov-title level="4">Khalid Al Mansoori</aegov-title>
        <aegov-text size="sm">Director, Digital Services — TDRA</aegov-text>
      </div>
    </div>
  </aegov-card>
</div>

### Dashboard summary grid

```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <aegov-card size="sm" class="bg-aeblack-50" appearance="light">
    <aegov-text size="sm">Pending applications</aegov-text>
    <aegov-title level="2">128</aegov-title>
  </aegov-card>
  <aegov-card size="sm" class="bg-aeblack-50" appearance="light">
    <aegov-text size="sm">Approved this week</aegov-text>
    <aegov-title level="2">412</aegov-title>
  </aegov-card>
  <aegov-card size="sm" class="bg-aeblack-50" appearance="light">
    <aegov-text size="sm">Average response time</aegov-text>
    <aegov-title level="2">1.4h</aegov-title>
  </aegov-card>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <aegov-card size="sm" class="bg-aeblack-50" appearance="light">
      <aegov-text size="sm">Pending applications</aegov-text>
      <aegov-title level="2">128</aegov-title>
    </aegov-card>
    <aegov-card size="sm" class="bg-aeblack-50" appearance="light">
      <aegov-text size="sm">Approved this week</aegov-text>
      <aegov-title level="2">412</aegov-title>
    </aegov-card>
    <aegov-card size="sm" class="bg-aeblack-50" appearance="light">
      <aegov-text size="sm">Average response time</aegov-text>
      <aegov-title level="2">1.4h</aegov-title>
    </aegov-card>
  </div>
</div>

---

## RTL Support

The card itself is direction-agnostic — it is a simple bordered surface. Content rendered inside the default slot follows the document `dir` automatically, so headings, text, and inline icons mirror without any extra configuration. Use Tailwind logical properties (`ms-*` / `me-*`, `ps-*` / `pe-*`) on inner elements when you need direction-aware spacing.

```html
<div dir="rtl">
  <aegov-card appearance="creative" hover="standard">
    <aegov-title level="3">تجديد بطاقة الهوية الإماراتية</aegov-title>
    <aegov-text size="sm">
      جدّد بطاقة هويتك الإماراتية إلكترونياً من خلال خدمات الهيئة الاتحادية للهوية والجنسية. تتم معالجة معظم الطلبات خلال دقائق.
    </aegov-text>
    <aegov-button>ابدأ الطلب</aegov-button>
  </aegov-card>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-card appearance="creative" hover="standard">
    <aegov-title level="3">تجديد بطاقة الهوية الإماراتية</aegov-title>
    <aegov-text size="sm">جدّد بطاقة هويتك الإماراتية إلكترونياً من خلال خدمات الهيئة الاتحادية للهوية والجنسية. تتم معالجة معظم الطلبات خلال دقائق.</aegov-text>
    <div class="mt-4"><aegov-button>ابدأ الطلب</aegov-button></div>
  </aegov-card>
</div>

A profile card in RTL — note that the avatar naturally moves to the right and the text aligns to the right edge:

```html
<div dir="rtl">
  <aegov-card appearance="light">
    <div style="display:flex;gap:1rem;align-items:center;">
      <aegov-avatar
        src="https://i.pravatar.cc/150?img=32"
        alt="فاطمة الزعابي"
        size="lg"
        appearance="rounded"
        status="online"
      ></aegov-avatar>
      <div>
        <aegov-title level="4">فاطمة الزعابي</aegov-title>
        <aegov-text size="sm">مديرة الخدمات الرقمية — هيئة تنظيم الاتصالات</aegov-text>
      </div>
    </div>
  </aegov-card>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-card appearance="light">
    <div style="display:flex;gap:1rem;align-items:center;">
      <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="فاطمة الزعابي" size="lg" appearance="rounded" status="online"></aegov-avatar>
      <div>
        <aegov-title level="4">فاطمة الزعابي</aegov-title>
        <aegov-text size="sm">مديرة الخدمات الرقمية — هيئة تنظيم الاتصالات</aegov-text>
      </div>
    </div>
  </aegov-card>
</div>

---

## API Reference

### Properties

| Property      | Attribute       | Description                                                                  | Type                                                  | Default      |
| ------------- | --------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------- | ------------ |
| `fieldId`     | `field-id`      | DOM `id` reflected onto the inner `<div>`. Auto-generated if omitted.        | `string`                                              | _generated_  |
| `isPadding`   | `is-padding`    | Whether the card applies its standard inner padding (`1.5rem`).              | `boolean`                                             | `true`       |
| `borderWidth` | `border-width`  | Border thickness in pixels.                                                  | `1 \| 2 \| 3`                                         | `2`          |
| `appearance`  | `appearance`    | Border treatment. Colour resolves from `variant`.                            | `'solid' \| 'light' \| 'creative'`                    | `'solid'`    |
| `variant`     | `variant`       | Colour family for border, hover, and glow.                                   | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'`  |
| `hover`       | `hover`         | Hover effect.                                                                | `'off' \| 'standard' \| 'glow'`                       | `'off'`      |
| `size`        | `size`          | Size token controlling padding and corner radius.                            | `'sm' \| 'base' \| 'lg'`                              | `'base'`     |
| `dataColSpan` | `data-col-span` | Grid column span inside `aegov-bento-grid`. Supports responsive syntax, e.g. `"1 md:2 lg:3"`. | `string`                               | `undefined`  |
| `dataRowSpan` | `data-row-span` | Grid row span inside `aegov-bento-grid`. Supports responsive syntax, e.g. `"1 md:2"`.         | `string`                               | `undefined`  |

### Slots

| Slot        | Description                                                              |
| ----------- | ------------------------------------------------------------------------ |
| _(default)_ | Card content. Any markup or other AEGOV components are allowed here.      |

### Events

The card does not emit any custom events.

### Pass-through Attributes

`aria-*` and `data-*` attributes set on the host are forwarded to the inner `<div>` via `getPassThroughAttributes`. Apply roles (such as `region`) and labels here when the card represents a discrete landmark.

| Attribute group  | Forwarded? | Where it lands                                                       |
| ---------------- | ---------- | -------------------------------------------------------------------- |
| `aria-*`         | Yes        | Forwarded to the inner `<div>`.                                       |
| `data-*`         | Yes        | Forwarded to the inner `<div>`.                                       |
| `id`             | n/a        | Use `field-id` on `<aegov-card>` — it reflects to the inner `<div>`.  |
| `class`, `style` | Allowed    | Applied to the host element.                                          |

---

## Accessibility

### Built-in behaviour

- The card renders a single `<div>` and carries no implicit role, so it does not interfere with assistive-technology announcements of its inner content.
- Pass-through `aria-*` allows consumers to apply landmark roles (`region`, `article`) with an `aria-labelledby` reference when appropriate.
- Hover styles are visual only — they do not change the focus order or replace focus indicators.

### Developer responsibilities

- If the entire card should be interactive (a clickable tile), wrap its contents in a single focusable element such as `<a>` or `<button>`. Do not attach a click handler directly to the card host without a focusable element inside.
- When the card represents a labelled region, set `role="region"` and `aria-labelledby` (pointing at the heading inside) via host attributes.
- Ensure inner content meets colour-contrast requirements against the chosen background utility, `appearance`, and `variant`.
- For media cards using `is-padding="false"`, supply alt text on every image and provide your own inner padding so headings and body copy do not touch the border.

### Notes

- Card sizes scale down automatically at `md` (768px) and `xs` (480px) breakpoints so dense card grids remain legible on small screens.
