# Text

<p class="text-lg text-aeblack-500 mb-8">Text applies the design system's body typography to a block of copy. It is the counterpart to <a href="aegov-title.html">Title</a>: three sizes, the correct font stack for the page language, and line heights that meet the design system's text-spacing requirements.</p>

## Introduction

`aegov-text` renders a paragraph with the design system's body styling.

```html
<aegov-text>
  Most Emirates ID renewals are processed within five working days. You will be notified
  by email and SMS when a decision has been made.
</aegov-text>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-prose">
    <aegov-text>Most Emirates ID renewals are processed within five working days. You will be notified by email and SMS when a decision has been made.</aegov-text>
  </div>
</div>

Note that the global stylesheet already styles plain `<p>` elements with the body font and a `0` margin. `aegov-text` is for when you want an explicit size token, or want the size to be responsive.

---

## Size

Three tokens.

| Token | Size | Use for |
| --- | --- | --- |
| `sm` | 14px | Secondary information, captions, metadata. |
| `base` | 16px | Body copy. The default, and the design system's minimum for body text. |
| `lg` | 18px | Introductory paragraphs and standfirsts. |

```html
<aegov-text size="sm">Small — secondary information.</aegov-text>
<aegov-text size="base">Base — body copy.</aegov-text>
<aegov-text size="lg">Large — an introductory paragraph.</aegov-text>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-prose space-y-4">
    <aegov-text size="sm">Small — 14px. Use for captions, metadata and secondary notes.</aegov-text>
    <aegov-text size="base">Base — 16px. The default size for body copy, and the design system's minimum for readable text.</aegov-text>
    <aegov-text size="lg">Large — 18px. Use for the introductory paragraph that sits under a page title.</aegov-text>
  </div>
</div>

**Do not go below `base` for body copy.** The design system's typography guidance sets 16px as the default body size and treats going below it as an exception that needs a reason. `sm` is for genuinely secondary text.

### Responsive sizes

`size` accepts a responsive string with the prefixes `xs`, `sm`, `md`, `lg`, `xl` and `2xl`.

```html
<aegov-text size="base lg:lg">Grows on larger screens</aegov-text>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-prose">
    <aegov-text size="base lg:lg">This paragraph is 16px on small screens and 18px from 1024px up.</aegov-text>
  </div>
</div>

Note that `sm`, `lg` and so on are both size tokens and breakpoint prefixes, so `size="sm md:base"` means "small by default, base from 768px".

---

## Extra classes

`extraClass` appends classes to the rendered paragraph — for colour, spacing, alignment or weight.

```html
<aegov-text extra-class="text-aeblack-500">Muted</aegov-text>
<aegov-text extra-class="font-semibold">Emphasised</aegov-text>
<aegov-text extra-class="mb-6">With a bottom margin</aegov-text>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-prose space-y-3">
    <aegov-text extra-class="text-aeblack-500">Muted secondary text.</aegov-text>
    <aegov-text extra-class="font-semibold">Emphasised text.</aegov-text>
    <aegov-text extra-class="text-primary-700">Coloured text.</aegov-text>
    <aegov-text size="sm" extra-class="text-aeblack-400">Small and muted — for metadata.</aegov-text>
  </div>
</div>

For emphasis **within** a sentence, use real inline elements in the slot rather than styling the whole block:

```html
<aegov-text>
  Renew up to <strong>six months</strong> before your card expires.
  Fees are <em>non-refundable</em> once submitted.
</aegov-text>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-prose">
    <aegov-text>Renew up to <strong>six months</strong> before your card expires. Fees are <em>non-refundable</em> once submitted.</aegov-text>
  </div>
</div>

`<strong>` and `<em>` carry meaning that assistive technology can convey; `font-semibold` on the whole paragraph does not.

---

## Line length

Keep prose between **60 and 100 characters** per line, per the design system's typography guidance. `aegov-text` does not constrain width — that is your layout's job.

```html
<div class="max-w-prose">
  <aegov-text>…</aegov-text>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-6">
    <div>
      <p class="text-sm text-aeblack-500 mb-2">Constrained with max-w-prose — comfortable</p>
      <div class="max-w-prose"><aegov-text>Renew your Emirates ID up to six months before it expires. Most renewals are processed within five working days, and you will be notified by email and SMS when a decision has been made.</aegov-text></div>
    </div>
    <div>
      <p class="text-sm text-aeblack-500 mb-2">Unconstrained — hard to read on a wide screen</p>
      <aegov-text>Renew your Emirates ID up to six months before it expires. Most renewals are processed within five working days, and you will be notified by email and SMS when a decision has been made.</aegov-text>
    </div>
  </div>
</div>

`max-w-prose` is the simplest way to get this right. A full-width paragraph on a desktop monitor is measurably harder to read, because the eye loses its place returning to the start of the next line.

---

## Paragraph spacing

The global stylesheet sets `margin: 0` on paragraphs, so **you supply the spacing between them.** The design system's text-spacing requirement, aligned with WCAG 2.2 SC 1.4.12, is a paragraph margin of about twice the font size.

```html
<div class="max-w-prose space-y-4">
  <aegov-text>First paragraph.</aegov-text>
  <aegov-text>Second paragraph.</aegov-text>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-6">
    <div>
      <p class="text-sm text-aeblack-500 mb-2">With space-y-4 — correct</p>
      <div class="max-w-prose space-y-4">
        <aegov-text>Renew your Emirates ID up to six months before it expires.</aegov-text>
        <aegov-text>Most renewals are processed within five working days.</aegov-text>
      </div>
    </div>
    <div>
      <p class="text-sm text-aeblack-500 mb-2">Without spacing — paragraphs run together</p>
      <div class="max-w-prose">
        <aegov-text>Renew your Emirates ID up to six months before it expires.</aegov-text>
        <aegov-text>Most renewals are processed within five working days.</aegov-text>
      </div>
    </div>
  </div>
</div>

A `space-y-4` on the container is enough at `base` size. Do not indent paragraphs to separate them — vertical rhythm carries the separation, and indentation is explicitly discouraged by the typography guidance.

---

## Composite example — service description

```html
<div class="max-w-prose">
  <h1 class="text-h2">Renew your Emirates ID</h1>

  <aegov-text size="lg" extra-class="text-aeblack-500 mt-3">
    Renew up to six months before your card expires.
  </aegov-text>

  <aegov-title size="text-h5" heading-type="h2" extra-class="mt-8 mb-3">Before you start</aegov-title>

  <div class="space-y-4">
    <aegov-text>
      You will need a valid passport copy and your current Emirates ID. If either has
      expired, upload a current copy — expired documents will delay your application.
    </aegov-text>
    <aegov-text>
      The service fee is <strong>AED 270</strong> and is payable at the end of the
      application. Fees are non-refundable once an application has been submitted.
    </aegov-text>
  </div>

  <aegov-text size="sm" extra-class="text-aeblack-400 mt-6">
    Last updated 14 March 2026
  </aegov-text>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-prose">
    <p class="text-h3 font-extrabold">Renew your Emirates ID</p>
    <aegov-text size="lg" extra-class="text-aeblack-500 mt-3">Renew up to six months before your card expires.</aegov-text>
    <aegov-title size="text-h5" heading-type="h2" extra-class="mt-8 mb-3">Before you start</aegov-title>
    <div class="space-y-4">
      <aegov-text>You will need a valid passport copy and your current Emirates ID. If either has expired, upload a current copy — expired documents will delay your application.</aegov-text>
      <aegov-text>The service fee is <strong>AED 270</strong> and is payable at the end of the application. Fees are non-refundable once an application has been submitted.</aegov-text>
    </div>
    <aegov-text size="sm" extra-class="text-aeblack-400 mt-6">Last updated 14 March 2026</aegov-text>
  </div>
</div>

---

## RTL Support

Text is direction-agnostic — it inherits alignment from its container, and the `base` stylesheet switches the body font stack to Noto Kufi Arabic automatically in Arabic, along with a slightly more relaxed line height for Arabic paragraphs.

```html
<div dir="rtl">
  <aegov-text size="lg">جدّد هويتك الإماراتية قبل انتهاء صلاحيتها بستة أشهر.</aegov-text>
  <aegov-text>تُعالج معظم عمليات التجديد خلال خمسة أيام عمل، وسيتم إشعارك بالبريد الإلكتروني والرسائل النصية.</aegov-text>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-prose space-y-4">
    <aegov-text size="lg" extra-class="text-aeblack-500">جدّد هويتك الإماراتية قبل انتهاء صلاحيتها بستة أشهر.</aegov-text>
    <aegov-text>تُعالج معظم عمليات التجديد خلال خمسة أيام عمل، وسيتم إشعارك بالبريد الإلكتروني والرسائل النصية عند اتخاذ القرار.</aegov-text>
    <aegov-text>رسوم الخدمة <strong>٢٧٠ درهمًا</strong> وتُدفع في نهاية الطلب، وهي غير قابلة للاسترداد بعد إرسال الطلب.</aegov-text>
    <aegov-text size="sm" extra-class="text-aeblack-400">آخر تحديث ١٤ مارس ٢٠٢٦</aegov-text>
  </div>
</div>

Three things to handle yourself:

- **Use logical utilities** in `extraClass` — `text-start`, `ps-*`, `me-*` — so alignment and spacing mirror. `text-left` and `pl-4` do not.
- **Do not justify text.** The typography guidance prohibits it in both languages because it slows reading.
- **Mark inline language changes** with `lang` so a screen reader switches voice (WCAG 2.2 SC 3.1.2):

```html
<aegov-text>
  الخدمة متاحة على <span lang="en" dir="ltr">u.ae</span> على مدار الساعة.
</aegov-text>
```

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `size` | `size` | Size token, or a responsive string. | `string` — `sm \| base \| lg` | `'base'` |
| `extraClass` | `extra-class` | Extra classes appended to the rendered paragraph. | `string` | — |

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | The text content, including inline elements such as `<strong>`, `<em>`, `<a>` and `<span lang>`. |

### Events

None.

### Methods

None.

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the rendered paragraph. |
| `data-*` | Yes | Forwarded to the rendered paragraph. |
| `class`, `style` | Allowed | Applied to the host. Use `extra-class` to reach the paragraph. |
| `lang`, `dir` | Yes | Useful for marking language changes on a whole block. |

---

## Accessibility

### Built-in behaviour

- The rendered element is a real paragraph, so it participates in normal reading order and paragraph-by-paragraph screen reader navigation.
- Sizes are set in `rem` with paired line heights of at least 1.5 for body copy, meeting WCAG 2.2 SC 1.4.12 on text spacing and scaling correctly to 200% zoom (SC 1.4.4).
- Word spacing and letter spacing come from the Roboto and Noto Kufi Arabic metrics, which already satisfy the design system's spacing requirements.
- The Arabic font stack and a relaxed Arabic line height are applied automatically from the page direction.

### Developer responsibilities

- **Constrain line length** to 60–100 characters. `aegov-text` does not do this; use `max-w-prose` or an equivalent.
- **Add spacing between paragraphs** — roughly twice the font size. Paragraph margins are reset to `0` globally, so unspaced paragraphs run together.
- **Do not go below `base` for body copy.** Reserve `sm` for genuinely secondary text.
- **Use `<strong>` and `<em>` for inline emphasis**, not a font-weight class on the whole block — only the elements carry meaning.
- **Do not justify text.**
- **Do not indent paragraphs** to separate them.
- **Mark inline language changes** with `lang` and, where needed, `dir`.
- **Use logical utilities** so alignment and spacing mirror in RTL.
- **Check contrast when you tint text.** `text-aeblack-500` on white is fine for secondary copy, but lighter tints can fall below the 4.5:1 minimum required by WCAG 2.2 SC 1.4.3.
- **Do not use `aegov-text` for headings.** Use [Title](aegov-title.html) with `headingType`, or a native heading element.

---

## Where to next

- [Title](aegov-title.html) — headings, and the size-versus-level distinction.
- [Blockquote](aegov-blockquote.html) — quoted content with attribution.
- [Link](aegov-link.html) — inline links within body copy.
- [Installation](installation.html) — the type scale, font stacks and theme tokens.
