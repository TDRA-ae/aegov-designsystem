# Text

<p class="text-lg text-aeblack-500 mb-8">A simple paragraph wrapper for body copy. Use it whenever you need styled body text with a controlled, designsystem-aligned size scale instead of raw <code>&lt;p&gt;</code> tags. Suitable for descriptions, supporting copy, programme summaries, and any inline body content across the system.</p>

## Introduction

The `aegov-text` component renders a `<p>` element with size tokens from the design system's typography scale. It removes the need to remember bespoke Tailwind utility combinations for body copy and gives you a single, consistent component to reach for whenever you need styled paragraph text. The size token can be a single value or a Tailwind-style responsive string, so the same paragraph can scale across breakpoints without extra markup.

```html
<aegov-text>
  The UAE Government Design System provides a unified set of components and patterns
  used across federal and local digital services to deliver a consistent citizen experience.
</aegov-text>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-text>
    The UAE Government Design System provides a unified set of components and patterns used across federal and local digital services to deliver a consistent citizen experience.
  </aegov-text>
</div>

---

## Sizes

The `size` property sets the body text size. Three tokens are available: `sm`, `base` (default), and `lg`. Use `sm` for helper or supporting copy, `base` for standard body text, and `lg` for lead-in paragraphs that introduce a section.

| Token  | Tailwind class | Approximate size |
| ------ | -------------- | ---------------- |
| `sm`   | `text-sm`      | 14 px            |
| `base` | `text-base`    | 16 px (default)  |
| `lg`   | `text-lg`      | 18 px            |

```html
<aegov-text size="sm">Helper text shown beneath a form field.</aegov-text>
<aegov-text size="base">Standard body copy used across most pages.</aegov-text>
<aegov-text size="lg">Lead-in paragraph for a section introduction.</aegov-text>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-text size="sm">Your application is automatically saved as you progress through each step.</aegov-text>
  <aegov-text size="base">Submit your Emirates ID and supporting documents to begin the verification process.</aegov-text>
  <aegov-text size="lg">The Ministry of Interior offers a wide range of digital services for UAE residents and visitors.</aegov-text>
</div>

### Responsive sizes

`size` also accepts a Tailwind-style responsive string with the breakpoint prefixes `xs`, `sm`, `md`, `lg`, `xl`, and `2xl`. Each segment overrides smaller breakpoints, so the example below is `sm` on phones, `base` from the `md` breakpoint up, and `lg` from `lg` up.

```html
<aegov-text size="sm md:base lg:lg">
  This paragraph scales with the viewport — small on phones, base from the medium breakpoint,
  and large on desktop.
</aegov-text>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-text size="sm md:base lg:lg">
    Resize your browser to see this paragraph scale across the <code>sm</code>, <code>md</code>, and <code>lg</code> breakpoints. Useful for hero descriptions and lead-in copy that should remain readable on every device.
  </aegov-text>
</div>

---

## Custom Styling

Use the `extra-class` property to merge additional Tailwind utilities onto the rendered `<p>`. This is the recommended way to adjust colour, weight, or alignment for a single instance without authoring component CSS.

```html
<aegov-text extra-class="text-aeblack-600 italic">
  All information submitted is encrypted in transit and at rest.
</aegov-text>

<aegov-text size="sm" extra-class="text-aered-600 font-medium">
  Please complete the marked fields before submitting.
</aegov-text>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-text extra-class="text-aeblack-600 italic">
    All information submitted is encrypted in transit and at rest, in line with UAE data protection guidelines.
  </aegov-text>
  <aegov-text size="sm" extra-class="text-aered-600 font-medium">
    Please complete the marked fields before submitting your application.
  </aegov-text>
</div>

---

## Combined Example

A typical service description block uses a large lead paragraph followed by standard body copy and a smaller note. `aegov-text` keeps the typographic rhythm consistent across all three.

```html
<aegov-text size="lg">
  Renew your vehicle registration online in a few simple steps.
</aegov-text>
<aegov-text>
  Submit your Emirates ID, vehicle details, and proof of insurance through the
  secure portal. Most renewals are processed within one business day.
</aegov-text>
<aegov-text size="sm" extra-class="text-aeblack-500">
  A service fee applies. Payment is taken after the application is reviewed.
</aegov-text>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-text size="lg">
    Renew your vehicle registration online in a few simple steps.
  </aegov-text>
  <aegov-text>
    Submit your Emirates ID, vehicle details, and proof of insurance through the secure portal. Most renewals are processed within one business day.
  </aegov-text>
  <aegov-text size="sm" extra-class="text-aeblack-500">
    A service fee applies. Payment is taken after the application is reviewed.
  </aegov-text>
</div>

---

## RTL Support

`aegov-text` is direction-agnostic. Because it renders a plain `<p>`, the text simply flows in the direction set by the surrounding `dir` attribute. No properties need to change between LTR and RTL — wrap any ancestor with `dir="rtl"` and the paragraph reads right-to-left automatically.

```html
<div dir="rtl">
  <aegov-text size="lg">
    يوفر نظام التصميم الحكومي الإماراتي مجموعة موحّدة من المكوّنات والأنماط
    المستخدمة عبر الخدمات الرقمية الاتحادية والمحلية.
  </aegov-text>
  <aegov-text>
    قدّم هويتك الإماراتية والمستندات الداعمة لبدء عملية التحقّق. تتم معالجة معظم
    الطلبات خلال يوم عمل واحد.
  </aegov-text>
  <aegov-text size="sm" extra-class="text-aeblack-500">
    قد تُطبَّق رسوم خدمة. يتم الدفع بعد مراجعة الطلب.
  </aegov-text>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-text size="lg">
    يوفر نظام التصميم الحكومي الإماراتي مجموعة موحّدة من المكوّنات والأنماط المستخدمة عبر الخدمات الرقمية الاتحادية والمحلية.
  </aegov-text>
  <aegov-text>
    قدّم هويتك الإماراتية والمستندات الداعمة لبدء عملية التحقّق. تتم معالجة معظم الطلبات خلال يوم عمل واحد.
  </aegov-text>
  <aegov-text size="sm" extra-class="text-aeblack-500">
    قد تُطبَّق رسوم خدمة. يتم الدفع بعد مراجعة الطلب.
  </aegov-text>
</div>

---

## API Reference

### Properties

| Property     | Attribute     | Description                                                                                            | Type     | Default     |
| ------------ | ------------- | ------------------------------------------------------------------------------------------------------ | -------- | ----------- |
| `size`       | `size`        | Body text size. Accepts a single token (`sm`, `base`, `lg`) or a Tailwind-style responsive string.     | `string` | `'base'`    |
| `extraClass` | `extra-class` | Additional Tailwind / CSS classes merged onto the rendered `<p>` element.                               | `string` | `undefined` |

### Slots

| Slot        | Description                            |
| ----------- | -------------------------------------- |
| _(default)_ | The text content rendered inside `<p>`. |

### Events

`aegov-text` emits no custom events.

### Pass-through Attributes

The host forwards `aria-*` and `data-*` attributes to the inner `<p>` element so you can add live-region or analytics hooks without extra markup.

| Attribute group  | Forwarded? | Where it lands       |
| ---------------- | ---------- | -------------------- |
| `aria-*`         | Yes        | Inner `<p>` element. |
| `data-*`         | Yes        | Inner `<p>` element. |
| `class`, `style` | Allowed    | Host element.        |
| Other attributes | No         | Apply to host.       |

---

## Accessibility

### Built-in behaviour

- Renders a semantic `<p>` element so assistive technologies treat the content as a paragraph.
- `aria-*` pass-through allows consumers to add live-region semantics (`aria-live`, `aria-atomic`) or labelling without wrapping markup.

### Developer responsibilities

- Use `aegov-text` only for paragraph content. Do not place it around headings, lists, or interactive elements.
- When overriding the colour via `extra-class`, ensure the contrast ratio against the background remains at least 4.5 : 1 for body text (WCAG 2.1 AA).
- Keep paragraph length comfortable to read — roughly 50 to 80 characters per line on desktop.

### Notes

- The component always applies `mb-8 mt-0` margin utilities. Override with `extra-class` (for example, `extra-class="mb-0"`) when stacking paragraphs in a tighter rhythm.
