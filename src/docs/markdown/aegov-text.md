# Text

<p class="text-lg text-aeblack-500 mb-8">A simple paragraph component for rendering body copy with consistent sizing and vertical rhythm. It outputs a semantic <code>&lt;p&gt;</code> element styled with Tailwind utility classes.</p>

## Introduction

The `aegov-text` component standardises paragraph text across your application. It provides **3 sizes**, a built-in bottom margin for vertical rhythm, and accepts additional Tailwind classes for easy customisation.

By rendering a native `<p>` element, it preserves full semantic meaning while giving you design-system-level consistency without writing repetitive CSS.

```html
<aegov-text>This is a paragraph of text using the default settings.</aegov-text>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-text>This is a paragraph of text using the default settings.</aegov-text>
</div>

---

## Sizes

The `size` property controls the font size of the rendered paragraph. There are three sizes available.

| Size   | CSS Class   | Font Size |
|--------|-------------|-----------|
| `sm`   | `text-sm`   | 14px      |
| `base` | `text-base` | 16px      |
| `lg`   | `text-lg`   | 18px      |

### Small

Use `size="sm"` for secondary or supplementary text that should appear smaller than the main body copy.

```html
<aegov-text size="sm">This is small text at 14px.</aegov-text>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-text size="sm">This is small text at 14px. Use it for captions, footnotes, or helper text that accompanies a primary paragraph.</aegov-text>
</div>

### Base (default)

The default size. Standard body copy at 16px — suitable for the majority of paragraph content.

```html
<aegov-text size="base">This is base text at 16px.</aegov-text>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-text size="base">This is base text at 16px. It is the default size and works well for most body content across the site.</aegov-text>
</div>

### Large

Use `size="lg"` for introductory paragraphs or lead text that should have more visual weight.

```html
<aegov-text size="lg">This is large text at 18px.</aegov-text>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-text size="lg">This is large text at 18px. Use it for introductory paragraphs, hero descriptions, or any text that needs to stand out from standard body copy.</aegov-text>
</div>

### All Sizes Compared

```html
<aegov-text size="sm">Small (14px)</aegov-text>
<aegov-text size="base">Base (16px)</aegov-text>
<aegov-text size="lg">Large (18px)</aegov-text>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-text size="sm">Small text — 14px. Ideal for captions, metadata, and fine print.</aegov-text>
  <aegov-text size="base">Base text — 16px. The default size for standard body content.</aegov-text>
  <aegov-text size="lg">Large text — 18px. Best for lead paragraphs and introductions.</aegov-text>
</div>

### Responsive Size

The `size` prop accepts Tailwind-style responsive prefixes. Write a space-separated string where each token is either a plain value or `breakpoint:value`. The base value (no prefix) applies below the smallest specified breakpoint.

Available breakpoints: `xs` (480px), `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px), `3xl` (1680px).

```html
<aegov-text size="sm xl:lg">Responsive text that grows at wider viewports.</aegov-text>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-text size="sm xl:lg">Responsive text that grows at wider viewports.</aegov-text>
</div>

> **Graceful degradation:** Unknown breakpoint names and invalid values are silently ignored. An unrecognised base value falls back to the component default.

---

## Default Margin

Every `aegov-text` instance renders with `mb-8` (32px bottom margin) and `mt-0` (no top margin) by default. This provides consistent vertical rhythm between paragraphs without any additional configuration.

```html
<aegov-text>First paragraph with default 32px bottom margin.</aegov-text>
<aegov-text>Second paragraph — the spacing above comes from the first paragraph's margin.</aegov-text>
<aegov-text>Third paragraph continues the rhythm.</aegov-text>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-text>First paragraph with default 32px bottom margin.</aegov-text>
  <aegov-text>Second paragraph — the spacing above comes from the first paragraph's margin.</aegov-text>
  <aegov-text>Third paragraph continues the rhythm.</aegov-text>
</div>

---

## Custom Classes

The `class` property lets you pass additional Tailwind utility classes that are merged with the component defaults. This gives you full control over colour, weight, alignment, spacing, and any other Tailwind utility.

### Custom Colour

```html
<aegov-text extra-class="text-primary-600">Primary-coloured paragraph text.</aegov-text>
<aegov-text extra-class="text-aered-600">Red-coloured paragraph text for emphasis.</aegov-text>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-text extra-class="text-primary-600">Primary-coloured paragraph text.</aegov-text>
  <aegov-text extra-class="text-aered-600">Red-coloured paragraph text for emphasis.</aegov-text>
</div>

### Custom Font Weight

```html
<aegov-text extra-class="font-semibold">Semibold paragraph text.</aegov-text>
<aegov-text extra-class="font-light">Light-weight paragraph text.</aegov-text>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-text extra-class="font-semibold">Semibold paragraph text.</aegov-text>
  <aegov-text extra-class="font-light">Light-weight paragraph text.</aegov-text>
</div>

### Custom Alignment

```html
<aegov-text extra-class="text-center">Centre-aligned paragraph.</aegov-text>
<aegov-text extra-class="text-right">Right-aligned paragraph.</aegov-text>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-text extra-class="text-center">Centre-aligned paragraph.</aegov-text>
  <aegov-text extra-class="text-right">Right-aligned paragraph.</aegov-text>
</div>

---

## Overriding Default Margin

The default `mb-8` can be overridden by passing a different margin class. Because custom classes are appended after the defaults, Tailwind's last-class-wins behaviour applies.

```html
<aegov-text extra-class="mb-0">No bottom margin.</aegov-text>
<aegov-text extra-class="mb-2">Tight bottom margin (8px).</aegov-text>
<aegov-text extra-class="mb-16">Extra-large bottom margin (64px).</aegov-text>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-text extra-class="mb-0">No bottom margin — sits flush against the next element.</aegov-text>
  <aegov-text extra-class="mb-2">Tight bottom margin (8px) — for compact layouts.</aegov-text>
  <aegov-text extra-class="mb-16">Extra-large bottom margin (64px) — for section breaks.</aegov-text>
  <aegov-text>Back to default margin.</aegov-text>
</div>

---

## Rich Content

The default slot accepts any inline HTML, not just plain text. You can include links, bold, italic, code, and other inline elements.

```html
<aegov-text>
  This paragraph contains <strong>bold text</strong>, <em>italic text</em>,
  <code>inline code</code>, and a <a href="#">link</a> inside it.
</aegov-text>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-text>
    This paragraph contains <strong>bold text</strong>, <em>italic text</em>,
    <code>inline code</code>, and a <a href="#">link</a> inside it.
  </aegov-text>
</div>

---

## Pass-Through Attributes

The component forwards `id`, `aria-*`, and `data-*` attributes from the host element to the inner `<p>` element. This is useful for anchoring, accessibility, and analytics integrations.

```html
<aegov-text id="intro-paragraph" data-section="intro" aria-label="Introduction">
  This paragraph has an id, a data attribute, and an aria-label passed through.
</aegov-text>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-text id="intro-paragraph" data-section="intro">
    This paragraph has an id and a data attribute passed through to the inner element.
  </aegov-text>
</div>

---

## API Reference

### Properties

| Property | Attribute | Description                              | Type                            | Default  |
|----------|-----------|------------------------------------------|---------------------------------|----------|
| `size`   | `size`    | The font size of the text. Supports responsive strings (e.g. `'sm xl:lg'`). | `'sm'` \| `'base'` \| `'lg'`   | `'base'` |
| `class`  | `class`   | Additional Tailwind CSS classes to merge  | `string`                        | —        |

### Slots

| Slot      | Description                                                    |
|-----------|----------------------------------------------------------------|
| (default) | The text content — plain text, inline HTML, or mixed content. |

### Pass-Through Attributes

The component forwards `id`, `aria-*`, and `data-*` attributes from the host element to the inner `<p>` element.

```html
<aegov-text id="my-text" data-analytics="paragraph-1">
  Content here.
</aegov-text>
```

---

## Accessibility

The `aegov-text` component renders a semantic `<p>` element, which is natively accessible and requires no additional ARIA configuration for basic use.

### Built-in Features

- **Semantic `<p>` element** — screen readers and assistive technologies recognise paragraph elements by default. No additional roles or labels are needed.
- **Pass-through `aria-*` attributes** — any `aria-*` attribute placed on the host element is forwarded to the inner `<p>`, allowing custom labelling or descriptions when needed.
- **Consistent spacing** — the default bottom margin creates predictable visual separation between content blocks, which benefits users with cognitive disabilities.

### Developer Responsibilities

1. **Colour contrast.** When using custom classes to change text colour, ensure the colour maintains at least a **4.5:1** contrast ratio against its background (WCAG 2.1 AA).

2. **Do not use for headings.** The `aegov-text` component renders a `<p>` element. For headings, use native `<h1>`–`<h6>` elements or the `aegov-title` component to maintain proper document outline and heading hierarchy.

3. **Language attributes.** If a paragraph is in a different language from the rest of the page, add `lang` to the host element so screen readers use the correct pronunciation.

---

## Notes

- The `aegov-text` component renders a native `<p>` element. Do **not** nest it inside another `<p>` — this creates invalid HTML.
- The default classes applied to the inner `<p>` are `mb-8 mt-0` plus the size class (e.g. `text-base`). Custom classes are appended after these defaults.
- The host element uses `display: block`, which means the component will take the full width of its container by default.
- The `class` property merges with — not replaces — the default classes. To override a default (such as `mb-8`), pass the replacement class (e.g. `class="mb-0"`).
- This component has no events. It is a purely presentational wrapper around a `<p>` element.
- For title-like text that requires bold weight and larger sizes, use the `aegov-title` component instead.
