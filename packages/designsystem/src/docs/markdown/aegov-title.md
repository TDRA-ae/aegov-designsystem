# Title

<p class="text-lg text-aeblack-500 mb-8">Title applies the design system's heading typography to a piece of text. It is a styling component rather than a semantic one: it renders a paragraph by default, and only becomes a heading when you tell it which level to use. That separation is deliberate — it lets you match a visual scale without disturbing your document outline.</p>

## Introduction

```html
<aegov-title size="text-h3" heading-type="h2">Renew your Emirates ID</aegov-title>
<aegov-text>Most renewals are processed within five working days.</aegov-text>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-title size="text-h3" heading-type="h2">Renew your Emirates ID</aegov-title>
  <aegov-text>Most renewals are processed within five working days.</aegov-text>
</div>

---

## It renders a paragraph by default

**Without `headingType`, `aegov-title` renders a `<p>`.** It looks like a heading and is not one — it will not appear in a screen reader's heading list, and it does not contribute to the document outline.

```html
<!-- A styled paragraph. Not a heading. -->
<aegov-title size="text-h4">Looks like a heading</aegov-title>

<!-- A real heading -->
<aegov-title size="text-h4" heading-type="h2">Is a heading</aegov-title>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <div>
      <p class="text-sm text-aeblack-500 mb-1">No heading-type — renders &lt;p&gt;</p>
      <aegov-title size="text-h4">Looks like a heading</aegov-title>
    </div>
    <div>
      <p class="text-sm text-aeblack-500 mb-1">heading-type="h2" — renders &lt;h2&gt;</p>
      <aegov-title size="text-h4" heading-type="h2">Is a heading</aegov-title>
    </div>
  </div>
</div>

This is useful when you want heading-sized text that is genuinely not a section heading — a large figure in a statistics card, a name in a profile panel. For anything that titles a section, **set `headingType`**.

### There is no h1

`headingType` accepts `h2` through `h6`, and `p`. It deliberately does not offer `h1`, because a page has exactly one `<h1>` and it should be authored directly:

```html
<h1 class="text-h1">Renew your Emirates ID</h1>
```

The global stylesheet already styles native `<h1>`–`<h6>` with the design system's scale, so a plain heading element needs no component at all. Reach for `aegov-title` when you need a size that differs from the level.

---

## Size

`size` accepts two families of token.

| Family | Tokens | Use for |
| --- | --- | --- |
| Heading scale | `text-h1`, `text-h2`, `text-h3`, `text-h4`, `text-h5`, `text-h6` | Matching the heading typography exactly. |
| Text scale | `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl` | Sizes between or below the heading steps. |

```html
<aegov-title size="text-h1" heading-type="h2">Heading 1 scale</aegov-title>
<aegov-title size="text-h3" heading-type="h2">Heading 3 scale</aegov-title>
<aegov-title size="text-h6" heading-type="h3">Heading 6 scale</aegov-title>
<aegov-title size="2xl" heading-type="h3">Text 2xl</aegov-title>
<aegov-title size="lg" heading-type="h4">Text lg</aegov-title>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-3">
    <aegov-title size="text-h1" heading-type="h2">Heading 1 scale — 48px</aegov-title>
    <aegov-title size="text-h2" heading-type="h2">Heading 2 scale — 40px</aegov-title>
    <aegov-title size="text-h3" heading-type="h2">Heading 3 scale — 34px</aegov-title>
    <aegov-title size="text-h4" heading-type="h3">Heading 4 scale — 28px</aegov-title>
    <aegov-title size="text-h5" heading-type="h3">Heading 5 scale — 24px</aegov-title>
    <aegov-title size="text-h6" heading-type="h4">Heading 6 scale — 20px</aegov-title>
    <aegov-title size="3xl" heading-type="h4">Text 3xl — 30px</aegov-title>
    <aegov-title size="2xl" heading-type="h4">Text 2xl — 24px</aegov-title>
    <aegov-title size="xl" heading-type="h5">Text xl — 20px</aegov-title>
    <aegov-title size="lg" heading-type="h5">Text lg — 18px</aegov-title>
    <aegov-title size="base" heading-type="h6">Text base — 16px</aegov-title>
  </div>
</div>

The heading scale is a minor-third progression rounded to even pixels, with line heights that tighten as size increases — which is why a large heading set in the text scale looks subtly wrong.

### Responsive sizes

`size` accepts a responsive string with the prefixes `xs`, `sm`, `md`, `lg`, `xl` and `2xl`. This is the cleanest way to scale a page title down on small screens.

```html
<aegov-title size="text-h4 md:text-h3 lg:text-h2" heading-type="h2">
  Adapts to the viewport
</aegov-title>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-title size="text-h4 md:text-h3 lg:text-h2" heading-type="h2">Adapts to the viewport</aegov-title>
</div>

Note the collision of vocabulary: `lg` is both a text-scale size and a breakpoint prefix, so `size="lg md:text-h4"` means "text-lg by default, heading-4 scale from 768px".

---

## Levels and sizes are independent

This is the point of the component. Choose `headingType` from the document structure and `size` from the visual design.

```html
<h1 class="text-h1">Emirates ID services</h1>

<aegov-title size="text-h3" heading-type="h2">Renew your card</aegov-title>
<aegov-text>…</aegov-text>

<aegov-title size="text-h5" heading-type="h3">Before you start</aegov-title>
<aegov-text>…</aegov-text>

<!-- A deep heading that needs to look prominent -->
<aegov-title size="text-h4" heading-type="h4">Fees</aegov-title>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-prose">
    <p class="text-h2 font-extrabold mb-4">Emirates ID services</p>
    <aegov-title size="text-h4" heading-type="h2" extra-class="mb-2">Renew your card</aegov-title>
    <aegov-text extra-class="mb-5">Renew up to six months before expiry. Most renewals are processed within five working days.</aegov-text>
    <aegov-title size="text-h5" heading-type="h3" extra-class="mb-2">Before you start</aegov-title>
    <aegov-text extra-class="mb-5">You will need a valid passport copy and your current Emirates ID.</aegov-text>
    <aegov-title size="text-h6" heading-type="h3" extra-class="mb-2">Fees</aegov-title>
    <aegov-text>AED 270, payable at the end of the application.</aegov-text>
  </div>
</div>

Never pick a level for its size. Heading level communicates structure to screen reader and keyboard users navigating by heading; jumping from `h2` to `h4` because `h4` looked right breaks that navigation for no visual benefit — `size` exists precisely so you do not have to.

---

## Extra classes

`extraClass` appends classes to the rendered element, which is how you add spacing, alignment or colour.

```html
<aegov-title size="text-h3" heading-type="h2" extra-class="mb-4 text-center">
  Centred with a margin
</aegov-title>

<aegov-title size="text-h5" heading-type="h3" extra-class="text-primary-700">
  Coloured heading
</aegov-title>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <aegov-title size="text-h4" heading-type="h2" extra-class="text-center">Centred</aegov-title>
    <aegov-title size="text-h5" heading-type="h3" extra-class="text-primary-700">Coloured</aegov-title>
    <aegov-title size="text-h5" heading-type="h3" extra-class="border-s-4 border-primary-600 ps-4">With an inline-start rule</aegov-title>
  </div>
</div>

Note `border-s-4` and `ps-4` in the last example — logical properties, so the rule stays on the reading-start side in both directions.

---

## Composite example — service page header

```html
<div class="max-w-prose">
  <aegov-breadcrumbs separator="chevron">
    <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>Emirates ID</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>

  <h1 class="text-h2 md:text-h1 mt-4">Renew your Emirates ID</h1>

  <aegov-text size="lg" extra-class="text-aeblack-500 mt-3">
    Renew up to six months before your card expires.
  </aegov-text>

  <aegov-title size="text-h4" heading-type="h2" extra-class="mt-10 mb-3">Before you start</aegov-title>
  <aegov-text>You will need a valid passport copy and your current Emirates ID.</aegov-text>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-prose">
    <aegov-breadcrumbs field-id="ti-cx-bc" separator="chevron">
      <aegov-breadcrumbs-item href="#">Home</aegov-breadcrumbs-item>
      <aegov-breadcrumbs-item>Emirates ID</aegov-breadcrumbs-item>
    </aegov-breadcrumbs>
    <p class="text-h3 md:text-h2 font-extrabold mt-4">Renew your Emirates ID</p>
    <aegov-text size="lg" extra-class="text-aeblack-500 mt-3">Renew up to six months before your card expires.</aegov-text>
    <aegov-title size="text-h5" heading-type="h2" extra-class="mt-8 mb-3">Before you start</aegov-title>
    <aegov-text>You will need a valid passport copy and your current Emirates ID.</aegov-text>
  </div>
</div>

---

## RTL Support

Title is direction-agnostic — it inherits alignment from its container, and the `base` stylesheet switches the heading font stack to Alexandria automatically in Arabic. Nothing needs configuring.

```html
<div dir="rtl">
  <aegov-title size="text-h3" heading-type="h2">تجديد الهوية الإماراتية</aegov-title>
  <aegov-text>تُعالج معظم عمليات التجديد خلال خمسة أيام عمل.</aegov-text>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-prose">
    <aegov-title size="text-h3" heading-type="h2" extra-class="mb-3">تجديد الهوية الإماراتية</aegov-title>
    <aegov-text extra-class="mb-6">تُعالج معظم عمليات التجديد خلال خمسة أيام عمل.</aegov-text>
    <aegov-title size="text-h5" heading-type="h3" extra-class="mb-2 border-s-4 border-primary-600 ps-4">قبل أن تبدأ</aegov-title>
    <aegov-text>ستحتاج إلى صورة جواز سفر صالح وهويتك الإماراتية الحالية.</aegov-text>
  </div>
</div>

Two things to watch in your own classes:

- **Use logical utilities** — `ps-*`, `pe-*`, `border-s-*`, `text-start` — so decoration follows the reading direction. `pl-4` and `text-left` do not mirror.
- **Do not justify text.** The UAE Design System typography guidance prohibits justified text in both English and Arabic, because it slows reading.

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `size` | `size` | Typography scale token, or a responsive string. | `string` — `xs \| sm \| base \| lg \| xl \| 2xl \| 3xl \| text-h1 … text-h6` | `'base'` |
| `headingType` | `heading-type` | Which element to render. **Omitting this renders a `<p>`.** | `'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'p'` | — (renders `p`) |
| `fieldId` | `field-id` | ID applied to the rendered element. Auto-generated when omitted, reflected. | `string` | _generated_ |
| `extraClass` | `extra-class` | Extra classes appended to the rendered element. | `string` | — |

There is deliberately no `h1` option — see [There is no h1](#there-is-no-h1).

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | The title text. |

### Events

None.

### Methods

None.

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the rendered element. |
| `data-*` | Yes | Forwarded to the rendered element. |
| `id` | n/a | Use `field-id` — useful for `aria-labelledby` references. |
| `class`, `style` | Allowed | Applied to the host. Use `extra-class` to reach the rendered element. |

---

## Accessibility

### Built-in behaviour

- The rendered element is a real `<h2>`–`<h6>` or `<p>`, so heading semantics come from the platform rather than from `role="heading"`.
- `fieldId` lands on the rendered element, so it can be referenced by `aria-labelledby` from a region, dialog or group.
- Font stacks switch to Alexandria for Arabic headings via the global stylesheet.
- The heading scale uses `rem` units with paired line heights, so it scales with the user's font-size preference and holds up at 200% zoom (WCAG 2.2 SC 1.4.4).

### Developer responsibilities

- **Set `headingType` for anything that titles a section.** Without it you get a styled paragraph, which is invisible to heading navigation — the single most common mistake with this component.
- **Choose the level from document structure, not size.** Do not skip levels; `h2` should be followed by `h3`, not `h4`. Use `size` to control appearance.
- **Use a native `<h1>` for the page title.** There is exactly one per page, and the global stylesheet already styles it.
- **Do not use `aegov-title` where a heading is not wanted** — for body copy use [Text](aegov-text.html).
- **Keep line length between 60 and 100 characters** for readable prose beneath a heading, per the design system's typography guidance.
- **Do not justify text**, in either language.
- **Add a paragraph margin of about twice the font size** after body copy; the design system bakes in line height but not block spacing.
- **Use logical spacing utilities** in `extraClass` so decoration mirrors in RTL.
- **Do not rely on size alone to convey hierarchy.** Two headings at the same size but different levels are indistinguishable visually; if the distinction matters to the reader, make it visible too.

---

## Where to next

- [Text](aegov-text.html) — body copy, and the sibling of this component.
- [Blockquote](aegov-blockquote.html) — quoted content with attribution.
- [Card](aegov-card.html) — where titles commonly sit.
- [Installation](installation.html) — the type scale and font stacks in the theme.
