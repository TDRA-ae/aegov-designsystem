# Title

<p class="text-lg text-aeblack-500 mb-8">A typographic component for rendering visually-prominent titles that follow the design system's heading scale. Use it for section titles, card titles, and hero headings — and choose between a semantic heading tag (<code>h2</code>–<code>h6</code>) or a plain <code>p</code> when the title is purely decorative.</p>

## Introduction

The `aegov-title` component pairs the design system's title sizing with a flexible semantic wrapper. By default it renders a `<p>` so visual styling does not pollute the document outline; pass `heading-type` to render a real `h2`, `h3`, `h4`, `h5`, or `h6` when the title represents a true section heading. Sizes accept a single token or a responsive string, and the component automatically swaps to the Alexandria typeface in RTL contexts.

```html
<aegov-title heading-type="h2" size="xl">
  Ministry of Interior services
</aegov-title>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-title heading-type="h2" size="xl">
    Ministry of Interior services
  </aegov-title>
</div>

---

## Sizes

The `size` property sets the title typography. Numeric scale tokens (`xs` through `3xl`) cover component-level titles and hero headings. Semantic heading aliases (`text-h1` through `text-h6`) map to the design system's heading type scale.

### Numeric scale

| Token  | Tailwind class | Approximate size |
| ------ | -------------- | ---------------- |
| `xs`   | `text-sm!`     | 14 px            |
| `sm`   | `text-base!`   | 16 px            |
| `base` | `text-lg!`     | 18 px (default)  |
| `lg`   | `text-xl!`     | 20 px            |
| `xl`   | `text-2xl!`    | 24 px            |
| `2xl`  | `text-3xl!`    | 30 px            |
| `3xl`  | `text-4xl!`    | 36 px            |

```html
<aegov-title size="xs">Compact label</aegov-title>
<aegov-title size="sm">Card title</aegov-title>
<aegov-title size="base">Section subtitle</aegov-title>
<aegov-title size="lg">Sub-section heading</aegov-title>
<aegov-title size="xl">Page section</aegov-title>
<aegov-title size="2xl">Hero heading</aegov-title>
<aegov-title size="3xl">Display heading</aegov-title>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-title size="xs" extra-class="mb-3">Compact label (xs)</aegov-title>
  <aegov-title size="sm" extra-class="mb-3">Apply for Emirates ID (sm)</aegov-title>
  <aegov-title size="base" extra-class="mb-3">Renew your residence visa (base)</aegov-title>
  <aegov-title size="lg" extra-class="mb-3">Federal authority services (lg)</aegov-title>
  <aegov-title size="xl" extra-class="mb-3">Government services portal (xl)</aegov-title>
  <aegov-title size="2xl" extra-class="mb-3">Welcome to the United Arab Emirates (2xl)</aegov-title>
  <aegov-title size="3xl">UAE National Services (3xl)</aegov-title>
</div>

### Semantic heading aliases

Use the `text-h1`–`text-h6` tokens when you want the title to carry the design system's typographic heading scale exactly. These map to the design system's heading type ramp rather than the Tailwind numeric scale.

| Token      | Tailwind class | Approximate size |
| ---------- | -------------- | ---------------- |
| `text-h1`  | `text-h1!`     | 48 px            |
| `text-h2`  | `text-h2!`     | 40 px            |
| `text-h3`  | `text-h3!`     | 34 px            |
| `text-h4`  | `text-h4!`     | 28 px            |
| `text-h5`  | `text-h5!`     | 24 px            |
| `text-h6`  | `text-h6!`     | 20 px            |

```html
<aegov-title heading-type="h1" size="text-h1">Page title</aegov-title>
<aegov-title heading-type="h2" size="text-h2">Section heading</aegov-title>
<aegov-title heading-type="h3" size="text-h3">Sub-section</aegov-title>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-title heading-type="h2" size="text-h1" extra-class="mb-3">Page title (text-h1, 48 px)</aegov-title>
  <aegov-title heading-type="h2" size="text-h2" extra-class="mb-3">Section heading (text-h2, 40 px)</aegov-title>
  <aegov-title heading-type="h3" size="text-h3" extra-class="mb-3">Sub-section (text-h3, 34 px)</aegov-title>
  <aegov-title heading-type="h4" size="text-h4" extra-class="mb-3">Card heading (text-h4, 28 px)</aegov-title>
  <aegov-title heading-type="h5" size="text-h5" extra-class="mb-3">Label (text-h5, 24 px)</aegov-title>
  <aegov-title heading-type="h6" size="text-h6">Micro label (text-h6, 20 px)</aegov-title>
</div>

### Responsive sizes

`size` also accepts a Tailwind-style responsive string. Each segment overrides smaller breakpoints, so a single title can scale from compact on phones to a hero size on large displays.

```html
<aegov-title heading-type="h2" size="lg md:xl xl:2xl">
  Welcome to the UAE Government Services Portal
</aegov-title>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-title heading-type="h2" size="lg md:xl xl:2xl">
    Welcome to the UAE Government Services Portal
  </aegov-title>
  <aegov-text size="sm" extra-class="text-aeblack-500 mt-2">
    Resize the window to see the title scale across the <code>md</code> and <code>xl</code> breakpoints.
  </aegov-text>
</div>

---

## Heading Type

The `heading-type` property controls the semantic wrapper element. Use a real heading tag (`h2`–`h6`) whenever the title represents a section in the document outline; leave it unset or set it to `"p"` (both render a `<p>`) when the title is purely decorative or used as a card label that should not appear in a screen reader's heading list.

`h1` is intentionally excluded — pages should have exactly one `h1`, sourced from the page-level layout.

```html
<aegov-title heading-type="h2" size="xl">Latest news</aegov-title>
<aegov-title heading-type="h3" size="lg">Press releases</aegov-title>
<aegov-title heading-type="h4" size="base">Federal updates</aegov-title>
<aegov-title size="sm">Card label (renders as &lt;p&gt;)</aegov-title>
<!-- equivalent to leaving heading-type unset: -->
<aegov-title heading-type="p" size="sm">Card label</aegov-title>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-title heading-type="h2" size="xl" extra-class="mb-2">Latest news</aegov-title>
  <aegov-title heading-type="h3" size="lg" extra-class="mb-2">Press releases</aegov-title>
  <aegov-title heading-type="h4" size="base" extra-class="mb-2">Federal updates</aegov-title>
  <aegov-title size="sm">Issued today (renders as a paragraph, not a heading)</aegov-title>
</div>

---

## Field ID

Each title automatically receives a generated `id` attribute, which makes it straightforward to link a region's `aria-labelledby` to the title. Set `field-id` explicitly when you need a stable, predictable identifier — for example, when linking from in-page navigation.

```html
<aegov-title field-id="terms" heading-type="h3" size="lg">
  Terms and conditions
</aegov-title>
<aegov-link href="#terms">Jump to terms</aegov-link>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-title field-id="terms-demo" heading-type="h3" size="lg" extra-class="mb-2">
    Terms and conditions
  </aegov-title>
  <aegov-text size="sm">
    A stable <code>id</code> lets you anchor an in-page link or wire up <code>aria-labelledby</code> from a related region.
  </aegov-text>
</div>

---

## Custom Styling

Use `extra-class` to merge additional Tailwind utilities for colour, alignment, or spacing. The utility classes added by the component carry the `!` suffix to override global heading styles — your overrides should usually use plain utilities and will sit beside the defaults.

```html
<aegov-title size="2xl" extra-class="text-primary-700 text-center mb-4">
  Spirit of the Union
</aegov-title>
<aegov-text extra-class="text-center text-aeblack-600">
  Celebrating 50 years of progress and unity across the Emirates.
</aegov-text>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-title size="2xl" extra-class="text-primary-700 text-center mb-4">
    Spirit of the Union
  </aegov-title>
  <aegov-text extra-class="text-center text-aeblack-600">
    Celebrating 50 years of progress and unity across the Emirates.
  </aegov-text>
</div>

---

## Combined Example

A page section typically pairs an `aegov-title` heading with one or more `aegov-text` paragraphs. The example below uses a responsive `h2` followed by a lead paragraph and a smaller note.

```html
<aegov-title heading-type="h2" size="xl md:2xl" extra-class="mb-4">
  Apply for an Emirates ID
</aegov-title>
<aegov-text size="lg">
  All UAE nationals and residents are required to hold a valid Emirates ID.
  Apply online or at an authorised typing centre.
</aegov-text>
<aegov-text>
  Bring your passport, a recent photograph, and proof of address. Most
  applications are processed within five working days.
</aegov-text>
<aegov-text size="sm" extra-class="text-aeblack-500">
  Service fees apply. Payment is taken at the end of the application.
</aegov-text>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-title heading-type="h2" size="xl md:2xl" extra-class="mb-4">
    Apply for an Emirates ID
  </aegov-title>
  <aegov-text size="lg">
    All UAE nationals and residents are required to hold a valid Emirates ID. Apply online or at an authorised typing centre.
  </aegov-text>
  <aegov-text>
    Bring your passport, a recent photograph, and proof of address. Most applications are processed within five working days.
  </aegov-text>
  <aegov-text size="sm" extra-class="text-aeblack-500">
    Service fees apply. Payment is taken at the end of the application.
  </aegov-text>
</div>

---

## RTL Support

The component automatically swaps the heading typeface for RTL contexts: it applies `font-inter` for LTR and `font-alexandria` for RTL via Tailwind's `rtl:` variant. Wrap the page (or any ancestor) with `dir="rtl"` and the title font, alignment, and reading direction adjust automatically — no additional configuration is required.

```html
<div dir="rtl">
  <aegov-title heading-type="h2" size="xl md:2xl" extra-class="mb-4">
    تقديم طلب الهوية الإماراتية
  </aegov-title>
  <aegov-text size="lg">
    يُطلب من جميع المواطنين والمقيمين في دولة الإمارات الحصول على هوية إماراتية
    سارية المفعول. يمكنك التقديم عبر الإنترنت أو من خلال أحد مراكز الطباعة المعتمدة.
  </aegov-text>
  <aegov-text>
    أحضر جواز سفرك وصورة شخصية حديثة وإثبات عنوان السكن. تتم معالجة معظم الطلبات
    خلال خمسة أيام عمل.
  </aegov-text>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-title heading-type="h2" size="xl md:2xl" extra-class="mb-4">
    تقديم طلب الهوية الإماراتية
  </aegov-title>
  <aegov-text size="lg">
    يُطلب من جميع المواطنين والمقيمين في دولة الإمارات الحصول على هوية إماراتية سارية المفعول. يمكنك التقديم عبر الإنترنت أو من خلال أحد مراكز الطباعة المعتمدة.
  </aegov-text>
  <aegov-text>
    أحضر جواز سفرك وصورة شخصية حديثة وإثبات عنوان السكن. تتم معالجة معظم الطلبات خلال خمسة أيام عمل.
  </aegov-text>
  <aegov-text size="sm" extra-class="text-aeblack-500">
    تُطبَّق رسوم الخدمة. يتم الدفع في نهاية عملية التقديم.
  </aegov-text>
</div>

---

## API Reference

### Properties

| Property      | Attribute      | Description                                                                                              | Type                                              | Default                       |
| ------------- | -------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ----------------------------- |
| `fieldId`     | `field-id`     | DOM `id` for the rendered element. Auto-generated if omitted.                                            | `string`                                          | _generated_                   |
| `size`        | `size`         | Title typography size. Accepts a numeric scale token (`xs`–`3xl`), a semantic heading alias (`text-h1`–`text-h6`), or a Tailwind-style responsive string. | `string` | `'base'` |
| `headingType` | `heading-type` | Semantic wrapper element. Renders a real heading tag when set to `h2`–`h6`; `'p'` or omitted renders a `<p>`. | `'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'p'` | `undefined` (renders `<p>`) |
| `extraClass`  | `extra-class`  | Additional Tailwind / CSS classes merged onto the rendered element.                                      | `string`                                          | `undefined`                   |

### Slots

| Slot        | Description                       |
| ----------- | --------------------------------- |
| _(default)_ | The title text content to render. |

### Events

`aegov-title` emits no custom events.

### Pass-through Attributes

The host forwards `aria-*` and `data-*` attributes to the inner heading or paragraph element so you can wire up labelling and analytics without extra markup.

| Attribute group  | Forwarded? | Where it lands           |
| ---------------- | ---------- | ------------------------ |
| `aria-*`         | Yes        | Inner heading / `<p>`.   |
| `data-*`         | Yes        | Inner heading / `<p>`.   |
| `id`             | n/a        | Use `field-id` instead.  |
| `class`, `style` | Allowed    | Host element.            |

---

## Accessibility

### Built-in behaviour

- Renders a real heading tag (`h2`–`h6`) when `heading-type` is set, contributing to the document outline that assistive technology uses to navigate.
- An auto-generated `id` is always present, so the title can be referenced from `aria-labelledby` on a related region without extra wiring.
- The `font-bold` weight and explicit size classes ensure visual prominence is consistent across the system.

### Developer responsibilities

- Choose `heading-type` to match the page's heading hierarchy. Skipping levels (for example, `h2` directly to `h4`) breaks the document outline for screen reader users.
- When a title is decorative or used purely as a card label, leave `heading-type` unset so it renders a `<p>` and does not appear in heading navigation.
- Do not rely on `size` alone to communicate hierarchy — visual size and semantic level are independent. A small `h2` is still a section heading.
- Maintain sufficient colour contrast (at least 3 : 1 for large text, 4.5 : 1 for normal-size titles) when overriding colour via `extra-class`.

### Notes

- `heading-type` does not include `h1` — pages should have exactly one `h1`, owned by the page layout, not a reusable component.
