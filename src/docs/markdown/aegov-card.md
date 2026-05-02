# Card

<p class="text-lg text-aeblack-500 mb-8">A flexible bordered container for grouping related content — service tiles, summary panels, dashboard sections, profile snippets, and list items. Cards support several border styles, two background tones, three sizes, and optional hover effects. Their content is fully slotted, so any combination of headings, body copy, badges, or actions can be composed inside.</p>

## Introduction

The `aegov-card` component renders a single bordered surface with a default content slot. It exposes a small but expressive set of properties — border thickness, border style, background tone, hover effect, size, and inner padding — so the same primitive can adapt to a service tile, a feature highlight, a media card, or a quiet supporting panel.

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

## Border Style

The `border-style` property controls how the card outline is drawn. Four treatments are available, ranging from a quiet light outline to a bold gradient that activates on hover.

- `standard` — solid `primary-600` (default)
- `light` — solid `primary-200`
- `creative` — gradient from `primary-400` to `primary-800`
- `highlight` — solid `aeblack-200` at rest, transitions to a `primary-300 → 700` gradient on hover

```html
<aegov-card border-style="standard">Standard outline</aegov-card>
<aegov-card border-style="light">Light outline</aegov-card>
<aegov-card border-style="creative">Creative gradient</aegov-card>
<aegov-card border-style="highlight" hover="standard">Highlight on hover</aegov-card>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <aegov-card border-style="standard">
      <aegov-title level="4">Standard</aegov-title>
      <aegov-text size="sm">Solid primary-600 outline. Use as the default surface.</aegov-text>
    </aegov-card>
    <aegov-card border-style="light">
      <aegov-title level="4">Light</aegov-title>
      <aegov-text size="sm">Quieter primary-200 outline for grouped or supporting content.</aegov-text>
    </aegov-card>
    <aegov-card border-style="creative">
      <aegov-title level="4">Creative</aegov-title>
      <aegov-text size="sm">Gradient outline for featured or promotional cards.</aegov-text>
    </aegov-card>
    <aegov-card border-style="highlight" hover="standard">
      <aegov-title level="4">Highlight</aegov-title>
      <aegov-text size="sm">Hover to activate the gradient outline.</aegov-text>
    </aegov-card>
  </div>
</div>

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

Two background tones are available. `white` (default) is the neutral surface for most contexts. `subtle` switches to `aeblack-50` and is useful for nested or supporting panels that should sit visually below their surroundings.

```html
<aegov-card bg="white">Default white surface</aegov-card>
<aegov-card bg="subtle" border-style="light">Subtle aeblack-50 surface</aegov-card>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <aegov-card bg="white">
      <aegov-title level="4">White</aegov-title>
      <aegov-text size="sm">The default surface for primary cards.</aegov-text>
    </aegov-card>
    <aegov-card bg="subtle" border-style="light">
      <aegov-title level="4">Subtle</aegov-title>
      <aegov-text size="sm">A quieter aeblack-50 surface for nested panels.</aegov-text>
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

## Composite Examples

Cards combine well with other components — titles, text, badges, avatars, and buttons — to build service tiles, profile cards, and dashboard panels.

### Ministry service tile

```html
<aegov-card hover="glow" border-style="highlight">
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
  <aegov-card hover="glow" border-style="highlight">
    <div class="mb-3"><aegov-badge variant="success" size="sm">Active</aegov-badge></div>
    <aegov-title level="3">Renew vehicle registration</aegov-title>
    <aegov-text size="sm">Renew your vehicle registration through the Ministry of Interior portal — most renewals are processed within minutes.</aegov-text>
    <div class="mt-4"><aegov-button>Renew now</aegov-button></div>
  </aegov-card>
</div>

### Profile card

```html
<aegov-card border-style="light">
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
  <aegov-card border-style="light">
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
  <aegov-card size="sm" bg="subtle" border-style="light">
    <aegov-text size="sm">Pending applications</aegov-text>
    <aegov-title level="2">128</aegov-title>
  </aegov-card>
  <aegov-card size="sm" bg="subtle" border-style="light">
    <aegov-text size="sm">Approved this week</aegov-text>
    <aegov-title level="2">412</aegov-title>
  </aegov-card>
  <aegov-card size="sm" bg="subtle" border-style="light">
    <aegov-text size="sm">Average response time</aegov-text>
    <aegov-title level="2">1.4h</aegov-title>
  </aegov-card>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <aegov-card size="sm" bg="subtle" border-style="light">
      <aegov-text size="sm">Pending applications</aegov-text>
      <aegov-title level="2">128</aegov-title>
    </aegov-card>
    <aegov-card size="sm" bg="subtle" border-style="light">
      <aegov-text size="sm">Approved this week</aegov-text>
      <aegov-title level="2">412</aegov-title>
    </aegov-card>
    <aegov-card size="sm" bg="subtle" border-style="light">
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
  <aegov-card border-style="highlight" hover="standard">
    <aegov-title level="3">تجديد بطاقة الهوية الإماراتية</aegov-title>
    <aegov-text size="sm">
      جدّد بطاقة هويتك الإماراتية إلكترونياً من خلال خدمات الهيئة الاتحادية للهوية والجنسية. تتم معالجة معظم الطلبات خلال دقائق.
    </aegov-text>
    <aegov-button>ابدأ الطلب</aegov-button>
  </aegov-card>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-card border-style="highlight" hover="standard">
    <aegov-title level="3">تجديد بطاقة الهوية الإماراتية</aegov-title>
    <aegov-text size="sm">جدّد بطاقة هويتك الإماراتية إلكترونياً من خلال خدمات الهيئة الاتحادية للهوية والجنسية. تتم معالجة معظم الطلبات خلال دقائق.</aegov-text>
    <div class="mt-4"><aegov-button>ابدأ الطلب</aegov-button></div>
  </aegov-card>
</div>

A profile card in RTL — note that the avatar naturally moves to the right and the text aligns to the right edge:

```html
<div dir="rtl">
  <aegov-card border-style="light">
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
  <aegov-card border-style="light">
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
| `borderStyle` | `border-style`  | Border treatment.                                                            | `'standard' \| 'light' \| 'creative' \| 'highlight'` | `'standard'` |
| `bg`          | `bg`            | Background tone.                                                             | `'white' \| 'subtle'`                                 | `'white'`    |
| `hover`       | `hover`         | Hover effect.                                                                | `'off' \| 'standard' \| 'glow'`                       | `'off'`      |
| `size`        | `size`          | Size token controlling padding and corner radius.                            | `'sm' \| 'base' \| 'lg'`                              | `'base'`     |

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
- Ensure inner content meets colour-contrast requirements against the chosen `bg` and `border-style`.
- For media cards using `is-padding="false"`, supply alt text on every image and provide your own inner padding so headings and body copy do not touch the border.

### Notes

- Card sizes scale down automatically at `md` (768px) and `xs` (480px) breakpoints so dense card grids remain legible on small screens.
- The `highlight` border style is designed to be paired with `hover="standard"` — without a hover variant the gradient never activates.
