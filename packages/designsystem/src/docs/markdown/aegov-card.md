# Card

<p class="text-lg text-aeblack-500 mb-8">A Card groups related content into a bounded surface — a service in a list, a summary panel, a tile in a grid. It provides the border, padding and hover treatment; what goes inside is ordinary content, so a card composes with any other component.</p>

## Introduction

```html
<aegov-card>
  <aegov-title size="text-h5" heading-type="h3" extra-class="mb-2">Renew your Emirates ID</aegov-title>
  <aegov-text>Renew up to six months before your card expires.</aegov-text>
</aegov-card>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-sm">
    <aegov-card field-id="cd-intro">
      <aegov-title size="text-h5" heading-type="h3" extra-class="mb-2">Renew your Emirates ID</aegov-title>
      <aegov-text>Renew up to six months before your card expires.</aegov-text>
    </aegov-card>
  </div>
</div>

---

## Appearance

`appearance` sets the border treatment.

| Appearance | Border |
| --- | --- |
| `solid` | Default. A full-strength border in the chosen variant colour. |
| `light` | A lighter tint of the same colour — quieter, for grids of many cards. |
| `creative` | A gradient border, for a feature or hero tile. |

```html
<aegov-card appearance="solid">…</aegov-card>
<aegov-card appearance="light">…</aegov-card>
<aegov-card appearance="creative">…</aegov-card>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-4 sm:grid-cols-3">
    <aegov-card field-id="cd-a1" appearance="solid"><p class="font-semibold mb-1">Solid</p><aegov-text size="sm">Full-strength border.</aegov-text></aegov-card>
    <aegov-card field-id="cd-a2" appearance="light"><p class="font-semibold mb-1">Light</p><aegov-text size="sm">A quieter tint.</aegov-text></aegov-card>
    <aegov-card field-id="cd-a3" appearance="creative"><p class="font-semibold mb-1">Creative</p><aegov-text size="sm">Gradient border.</aegov-text></aegov-card>
  </div>
</div>

Use `light` when many cards sit together — a grid of solid borders becomes visually noisy. Reserve `creative` for one card per view.

---

## Variant

`variant` sets the colour family of the border.

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-4 sm:grid-cols-2">
    <aegov-card field-id="cd-v1" variant="primary"><p class="font-semibold">Primary</p></aegov-card>
    <aegov-card field-id="cd-v2" variant="secondary"><p class="font-semibold">Secondary</p></aegov-card>
    <aegov-card field-id="cd-v3" variant="neutral-max"><p class="font-semibold">Neutral max</p></aegov-card>
    <aegov-card field-id="cd-v4" variant="neutral-min"><p class="font-semibold">Neutral min</p></aegov-card>
  </div>
</div>

`neutral-min` with `appearance="light"` is the quietest combination and the right default for a large grid.

---

## Border width

`borderWidth` takes `1`, `2` or `3`.

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-4 sm:grid-cols-3">
    <aegov-card field-id="cd-b1" border-width="1"><p class="font-semibold">Width 1</p></aegov-card>
    <aegov-card field-id="cd-b2" border-width="2"><p class="font-semibold">Width 2 (default)</p></aegov-card>
    <aegov-card field-id="cd-b3" border-width="3"><p class="font-semibold">Width 3</p></aegov-card>
  </div>
</div>

---

## Hover

`hover` adds a hover treatment, which signals that the whole card is interactive.

| Value | Effect |
| --- | --- |
| `off` | Default. No hover response. |
| `standard` | A subtle lift and border change. |
| `glow` | A stronger glow. |

```html
<aegov-card hover="standard">…</aegov-card>
<aegov-card hover="glow">…</aegov-card>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-4 sm:grid-cols-3">
    <aegov-card field-id="cd-h1" hover="off"><p class="font-semibold mb-1">off</p><aegov-text size="sm">Static.</aegov-text></aegov-card>
    <aegov-card field-id="cd-h2" hover="standard"><p class="font-semibold mb-1">standard</p><aegov-text size="sm">Hover me.</aegov-text></aegov-card>
    <aegov-card field-id="cd-h3" hover="glow"><p class="font-semibold mb-1">glow</p><aegov-text size="sm">Hover me.</aegov-text></aegov-card>
  </div>
</div>

**Only set `hover` when the card is genuinely clickable.** A hover effect on a static card promises an interaction that does not exist. And note the card itself is not interactive — see [Clickable cards](#clickable-cards).

---

## Size and padding

`size` controls the internal padding — `sm`, `base` or `lg`. `isPadding` removes it entirely, for content that manages its own, such as a full-bleed image.

```html
<aegov-card size="sm">…</aegov-card>
<aegov-card size="lg">…</aegov-card>
<aegov-card is-padding="false">…</aegov-card>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-4 sm:grid-cols-2">
    <aegov-card field-id="cd-s1" size="sm"><p class="font-semibold">Small padding</p></aegov-card>
    <aegov-card field-id="cd-s2" size="lg"><p class="font-semibold">Large padding</p></aegov-card>
    <aegov-card field-id="cd-s3" is-padding="false" appearance="light">
      <aegov-aspect-ratio ratio="video">
        <div class="size-full bg-primary-100 flex items-center justify-center text-primary-800">Full-bleed media</div>
      </aegov-aspect-ratio>
      <div class="p-4">
        <p class="font-semibold mb-1">Padding removed</p>
        <aegov-text size="sm">The media reaches the card's edges; the text block supplies its own padding.</aegov-text>
      </div>
    </aegov-card>
  </div>
</div>

Note the pattern in the last card: with `is-padding="false"`, the media sits flush and a wrapper adds padding around the text. That is the only way to get a full-bleed image inside a card.

---

## Clickable cards

The card is a container, not a control — it has no `href`, no click event, and is not focusable. To make one navigable, put a real link inside it.

```html
<aegov-card hover="standard">
  <aegov-title size="text-h6" heading-type="h3" extra-class="mb-1">
    <aegov-link href="/services/emirates-id">Renew your Emirates ID</aegov-link>
  </aegov-title>
  <aegov-text size="sm">Renew up to six months before your card expires.</aegov-text>
</aegov-card>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-4 sm:grid-cols-2 max-w-2xl">
    <aegov-card field-id="cd-c1" hover="standard" appearance="light">
      <aegov-title size="text-h6" heading-type="h3" extra-class="mb-1"><aegov-link href="#">Renew your Emirates ID</aegov-link></aegov-title>
      <aegov-text size="sm">Renew up to six months before your card expires.</aegov-text>
    </aegov-card>
    <aegov-card field-id="cd-c2" hover="standard" appearance="light">
      <aegov-title size="text-h6" heading-type="h3" extra-class="mb-1"><aegov-link href="#">Renew your residency visa</aegov-link></aegov-title>
      <aegov-text size="sm">Applications open 30 days before expiry.</aegov-text>
    </aegov-card>
  </div>
</div>

Do not make the whole card clickable by wrapping it in an anchor and hiding the link text. That produces one enormous link whose accessible name is the entire card content, which is unusable with a screen reader. Keep the link on the title — a "card-wide" click target is a nice-to-have, not worth breaking navigation for.

If you do want the whole surface clickable, the accessible pattern is a link on the title plus a pseudo-element overlay, with the link remaining the only focusable element:

```css
aegov-card:has(a) { position: relative; }
aegov-card a::after { content: ''; position: absolute; inset: 0; }
```

---

## Cards in a grid

Cards are commonly laid out in a CSS grid, or in [`aegov-bento-grid`](aegov-bento-grid.html) for asymmetric layouts.

```html
<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <aegov-card appearance="light" hover="standard">…</aegov-card>
  <aegov-card appearance="light" hover="standard">…</aegov-card>
  <aegov-card appearance="light" hover="standard">…</aegov-card>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <aegov-card field-id="cd-g1" appearance="light" hover="standard" variant="neutral-min">
      <aegov-title size="text-h6" heading-type="h3" extra-class="mb-1"><aegov-link href="#">Emirates ID</aegov-link></aegov-title>
      <aegov-text size="sm">New cards, renewals and replacements.</aegov-text>
    </aegov-card>
    <aegov-card field-id="cd-g2" appearance="light" hover="standard" variant="neutral-min">
      <aegov-title size="text-h6" heading-type="h3" extra-class="mb-1"><aegov-link href="#">Residency</aegov-link></aegov-title>
      <aegov-text size="sm">Visa applications and renewals.</aegov-text>
    </aegov-card>
    <aegov-card field-id="cd-g3" appearance="light" hover="standard" variant="neutral-min">
      <aegov-title size="text-h6" heading-type="h3" extra-class="mb-1"><aegov-link href="#">Vehicles</aegov-link></aegov-title>
      <aegov-text size="sm">Registration, licences and fines.</aegov-text>
    </aegov-card>
  </div>
</div>

### Spanning cells in a bento grid

`dataColSpan` and `dataRowSpan` tell an `aegov-bento-grid` how many columns and rows a card should occupy. They are reflected as `data-col-span` and `data-row-span` attributes, which is how the grid reads them.

```html
<aegov-bento-grid cols="1 md:2 lg:4" gap="md">
  <aegov-card data-col-span="2" data-row-span="2" appearance="light">Hero tile</aegov-card>
  <aegov-card appearance="light">Tile</aegov-card>
  <aegov-card appearance="light">Tile</aegov-card>
  <aegov-card data-col-span="2" appearance="light">Wide tile</aegov-card>
</aegov-bento-grid>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-bento-grid field-id="cd-bento" cols="1 md:2 lg:4" gap="md">
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

In JSX and framework templates these are the camelCase properties `dataColSpan` / `dataRowSpan`; in plain HTML use the `data-col-span` / `data-row-span` attributes. Both reach the same place.

---

## Composite example — application summary card

```html
<aegov-card appearance="light" variant="neutral-min" size="lg">
  <div class="flex items-start justify-between gap-4 mb-4">
    <div>
      <aegov-title size="text-h6" heading-type="h3" extra-class="mb-1">
        <aegov-link href="/applications/41827">Emirates ID renewal</aegov-link>
      </aegov-title>
      <aegov-text size="sm" extra-class="text-aeblack-500">APP-2026-0041827</aegov-text>
    </div>
    <aegov-badge variant="camel">Under review</aegov-badge>
  </div>

  <aegov-progress value="3" max="5" height="2" label="Application progress"></aegov-progress>

  <aegov-separator gap="4"></aegov-separator>

  <div class="flex flex-wrap gap-2">
    <aegov-button size="sm" variant="primary">Continue</aegov-button>
    <aegov-button size="sm" appearance="outline">View details</aegov-button>
  </div>
</aegov-card>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-card field-id="cd-cx" appearance="light" variant="neutral-min" size="lg">
      <div class="flex items-start justify-between gap-4 mb-4">
        <div>
          <aegov-title size="text-h6" heading-type="h3" extra-class="mb-1"><aegov-link href="#">Emirates ID renewal</aegov-link></aegov-title>
          <aegov-text size="sm" extra-class="text-aeblack-500">APP-2026-0041827</aegov-text>
        </div>
        <aegov-badge variant="camel">Under review</aegov-badge>
      </div>
      <aegov-progress field-id="cd-cx-pg" value="3" max="5" height="2" label="Application progress"></aegov-progress>
      <aegov-separator gap="4"></aegov-separator>
      <div class="flex flex-wrap gap-2">
        <aegov-button size="sm" variant="primary">Continue</aegov-button>
        <aegov-button size="sm" appearance="outline">View details</aegov-button>
      </div>
    </aegov-card>
  </div>
</div>

---

## RTL Support

The card is direction-agnostic — its border, radius and padding are symmetrical, and the `creative` gradient border mirrors automatically. Everything directional comes from the content you put inside.

```html
<div dir="rtl">
  <aegov-card appearance="light" variant="neutral-min">
    <aegov-title size="text-h6" heading-type="h3" extra-class="mb-1">
      <aegov-link href="#">تجديد الهوية الإماراتية</aegov-link>
    </aegov-title>
    <aegov-text size="sm">جدّد قبل انتهاء صلاحية بطاقتك بستة أشهر.</aegov-text>
  </aegov-card>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-4 sm:grid-cols-2">
    <aegov-card field-id="cd-rtl-1" appearance="light" variant="neutral-min" hover="standard">
      <aegov-title size="text-h6" heading-type="h3" extra-class="mb-1"><aegov-link href="#">تجديد الهوية الإماراتية</aegov-link></aegov-title>
      <aegov-text size="sm">جدّد قبل انتهاء صلاحية بطاقتك بستة أشهر.</aegov-text>
    </aegov-card>
    <aegov-card field-id="cd-rtl-2" appearance="light" variant="neutral-min" size="lg">
      <div class="flex items-start justify-between gap-4 mb-3">
        <div>
          <aegov-title size="text-h6" heading-type="h3" extra-class="mb-1">تجديد الهوية</aegov-title>
          <aegov-text size="sm" extra-class="text-aeblack-500">APP-2026-0041827</aegov-text>
        </div>
        <aegov-badge variant="camel">قيد المراجعة</aegov-badge>
      </div>
      <aegov-progress field-id="cd-rtl-pg" value="3" max="5" height="2" label="تقدم الطلب"></aegov-progress>
    </aegov-card>
  </div>
</div>

Use logical utilities for anything you add inside — `ps-*`, `me-*`, `text-start` — so the content mirrors with the card.

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the card element. Auto-generated when omitted, reflected. | `string` | _generated_ |
| `appearance` | `appearance` | Border treatment. | `'solid' \| 'light' \| 'creative'` | `'solid'` |
| `variant` | `variant` | Border colour family. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `borderWidth` | `border-width` | Border thickness. | `1 \| 2 \| 3` | `2` |
| `hover` | `hover` | Hover treatment. Only use when the card is genuinely interactive. | `'off' \| 'standard' \| 'glow'` | `'off'` |
| `size` | `size` | Internal padding. | `'sm' \| 'base' \| 'lg'` | `'base'` |
| `isPadding` | `is-padding` | Applies the internal padding. Set to `false` for full-bleed content. | `boolean` | `true` |
| `dataColSpan` | `data-col-span` | Columns to span inside an `aegov-bento-grid`. Reflected. | `string` | — |
| `dataRowSpan` | `data-row-span` | Rows to span inside an `aegov-bento-grid`. Reflected. | `string` | — |

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | The card content. |

### Events

None. The card is a container — put a [Link](aegov-link.html) or [Button](aegov-button.html) inside it.

### Methods

None.

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the card element. |
| `data-*` | Yes | Forwarded. Note `data-col-span` and `data-row-span` are also properties. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host element. |

---

## Accessibility

### Built-in behaviour

- The card is a plain container with no ARIA role, so it adds nothing to the accessibility tree and does not interfere with the semantics of its content. That is deliberate: a card is a visual grouping, not a landmark.
- `fieldId` lands on the card element, so it can be referenced by `aria-labelledby` if you do give the card a role.
- Border, radius and padding are symmetrical, and the `creative` gradient mirrors under `dir="rtl"`.

### Developer responsibilities

- **Structure the content with real headings.** Use [Title](aegov-title.html) with `headingType` at the right level so a grid of cards is navigable by heading — this is how most screen reader users will move through it.
- **Do not wrap the whole card in a link.** The accessible name becomes the entire card content. Put the link on the title, and use a pseudo-element overlay if you need the full surface clickable.
- **Only set `hover` when the card is interactive.** A hover effect with nothing to click is a false affordance.
- **Do not rely on the border colour to convey meaning** (WCAG 2.2 SC 1.4.1). A card with a red border and no text saying what is wrong communicates nothing; pair it with a [Badge](aegov-badge.html) or [Callout](aegov-callout.html).
- **Give the card's own role only if it needs one.** A card containing a self-contained item may warrant `role="listitem"` inside a `role="list"`; most do not need anything.
- **Keep cards in a grid consistent.** Different appearances and border widths in one grid reads as unintentional.
- **Use logical utilities** for content spacing so the card mirrors in RTL.
- **Check contrast for tinted content**, particularly with `appearance="creative"`, where the gradient can sit close to the text.

### Keyboard support

The card is not a focus stop. Focusable content inside it — links, buttons, form fields — behaves normally, in document order.

---

## Where to next

- [Bento Grid](aegov-bento-grid.html) — asymmetric grids of cards, and the span attributes.
- [Aspect Ratio](aegov-aspect-ratio.html) — for media inside a card.
- [Title](aegov-title.html) and [Text](aegov-text.html) — the usual contents.
- [Badge](aegov-badge.html) and [Separator](aegov-separator.html) — for status and internal division.
