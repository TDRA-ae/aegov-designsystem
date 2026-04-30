# Title

<p class="text-lg text-aeblack-500 mb-8">A lightweight typography component for rendering bold, sized title text. Use it wherever you need a visually prominent heading-like label without enforcing a semantic heading level.</p>

## Introduction

The `aegov-title` component renders a `<p>` element by default, with bold text at one of five predefined sizes. When you need a semantic heading instead, set the `heading-type` property to `h2`–`h6` and the same visual styling will be applied to that wrapper. The component accepts additional Tailwind CSS classes that merge with its defaults, giving you full control over colour, spacing, and alignment.

```html
<aegov-title>Default Title</aegov-title>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-title>Default Title</aegov-title>
</div>

---

## Sizes

The `size` property controls the font size of the title text. Sizes map to the design system's heading scale so a title looks identical whether the wrapper is a `<p>` or an `<h*>`.

| Size   | CSS Class    | Font Size |
|--------|--------------|-----------|
| `sm`   | `text-base!` | 16px      |
| `base` | `text-lg!`   | 18px      |
| `lg`   | `text-xl!`   | 20px      |
| `xl`   | `text-2xl!`  | 24px      |
| `2xl`  | `text-3xl!`  | 30px      |

The default size is `base`.

```html
<aegov-title size="sm">SM Title (16px)</aegov-title>
<aegov-title size="base">Base Title (18px)</aegov-title>
<aegov-title size="lg">Large Title (20px)</aegov-title>
<aegov-title size="xl">Extra Large Title (24px)</aegov-title>
<aegov-title size="2xl">2XL Title (30px)</aegov-title>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-4 not-aegov">
  <aegov-title size="sm">SM Title (16px)</aegov-title>
  <aegov-title size="base">Base Title (18px)</aegov-title>
  <aegov-title size="lg">Large Title (20px)</aegov-title>
  <aegov-title size="xl">Extra Large Title (24px)</aegov-title>
  <aegov-title size="2xl">2XL Title (30px)</aegov-title>
</div>

### Responsive Size

The `size` prop accepts Tailwind-style responsive prefixes. Write a space-separated string where each token is either a plain value or `breakpoint:value`. The base value (no prefix) applies below the smallest specified breakpoint.

Available breakpoints: `xs` (480px), `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px), `3xl` (1680px).

Note: the default size is `lg`, not `base`.

```html
<aegov-title size="sm:sm md:base xl:xl">Responsive Title</aegov-title>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-title size="sm:sm md:base xl:xl">Resize the viewport to see the size change</aegov-title>
</div>

> **Graceful degradation:** Unknown breakpoint names and invalid values are silently ignored. An unrecognised base value falls back to the component default.

---

## Heading Type

By default, `aegov-title` renders a `<p>` element. Set the `heading-type` property to render the title inside a semantic heading tag (`h2`–`h6`) instead. The component's `size`, `font-bold`, and margin reset are applied with `!important` so the prop-driven typography always wins over the global heading defaults — meaning `<aegov-title size="lg">` and `<aegov-title heading-type="h3" size="lg">` look identical.

```html
<aegov-title heading-type="h2" size="xl">Section Heading</aegov-title>
<aegov-title heading-type="h3" size="lg">Sub-section</aegov-title>
<aegov-title heading-type="h4" size="base">Smaller heading</aegov-title>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-4 not-aegov">
  <aegov-title heading-type="h2" size="xl">Section Heading</aegov-title>
  <aegov-title heading-type="h3" size="lg">Sub-section</aegov-title>
  <aegov-title heading-type="h4" size="base">Smaller heading</aegov-title>
</div>

> **Tip:** Pick the heading level that fits your document outline. The component does not enforce a hierarchy — `heading-type` is purely about the rendered tag.

---

## Default Styling

Every `aegov-title` comes with `font-bold` and `mt-0` applied by default. This provides a consistent bold appearance with no top margin, making it easy to stack titles with other content.

```html
<aegov-title>This text is bold by default</aegov-title>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-title>This text is bold by default</aegov-title>
</div>

---

## Custom Classes

The `class` property accepts additional Tailwind CSS utility classes that are merged with the component defaults. This lets you customise colour, alignment, spacing, and more without needing to wrap the component in extra elements.

```html
<aegov-title class="text-primary-600">Primary Coloured Title</aegov-title>
<aegov-title class="text-aered-600">Red Title</aegov-title>
<aegov-title class="text-center">Centred Title</aegov-title>
<aegov-title class="italic text-aeblack-400">Italic Muted Title</aegov-title>
<aegov-title size="xl" class="mb-2 text-aegreen-700">Custom Spaced Green Title</aegov-title>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-4 not-aegov">
  <aegov-title class="text-primary-600">Primary Coloured Title</aegov-title>
  <aegov-title class="text-aered-600">Red Title</aegov-title>
  <aegov-title class="text-center">Centred Title</aegov-title>
  <aegov-title class="italic text-aeblack-400">Italic Muted Title</aegov-title>
  <aegov-title size="xl" class="mb-2 text-aegreen-700">Custom Spaced Green Title</aegov-title>
</div>

---

## Pairing with Text

The `aegov-title` and `aegov-text` components are designed to work together for structured content blocks. Use `aegov-title` for the heading and `aegov-text` for the body copy below it.

```html
<aegov-title size="2xl">Section Heading</aegov-title>
<aegov-text>
  This is the body text that follows the title. The aegov-text component
  provides consistent paragraph spacing with a default bottom margin.
</aegov-text>

<aegov-title size="xl">Another Section</aegov-title>
<aegov-text size="sm">
  Smaller body text for secondary content or captions.
</aegov-text>
```
<div class="not-aegov">
  <div class="p-6 bg-aeblack-50 rounded-lg">
    <aegov-title size="2xl">Section Heading</aegov-title>
    <aegov-text>
      This is the body text that follows the title. The aegov-text component
      provides consistent paragraph spacing with a default bottom margin.
    </aegov-text>
  </div>
  <div class="p-6 bg-aeblack-50 rounded-lg">
    <aegov-title size="xl">Another Section</aegov-title>
    <aegov-text size="sm">
      Smaller body text for secondary content or captions.
    </aegov-text>
  </div>
</div>

---

## Pass-Through Attributes

The component forwards `aria-*`, `data-*`, and `id` attributes from the host element to the inner `<p>` element. This allows you to add accessibility or tracking attributes without extra configuration.

```html
<aegov-title id="main-title" aria-label="Page title" data-section="hero">
  Welcome to the Design System
</aegov-title>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-title id="main-title" aria-label="Page title" data-section="hero">
    Welcome to the Design System
  </aegov-title>
</div>

---

## API Reference

### Properties

| Property      | Attribute      | Description                                    | Type                                       | Default |
|---------------|----------------|------------------------------------------------|--------------------------------------------|---------|
| `size`        | `size`         | The font size of the title. Supports responsive strings (e.g. `'sm md:lg xl:2xl'`). | `'sm'` \| `'base'` \| `'lg'` \| `'xl'` \| `'2xl'`  | `'base'`  |
| `headingType` | `heading-type` | The wrapper tag. When omitted, renders a `<p>`. | `'h2'` \| `'h3'` \| `'h4'` \| `'h5'` \| `'h6'` \| `'p'` | —       |
| `class`       | `class`        | Additional Tailwind CSS classes to merge        | `string`                                   | —       |

### Slots

| Slot      | Description             |
|-----------|-------------------------|
| (default) | The title text content. |

### Pass-Through Attributes

The component forwards the following attributes from the host element to the inner `<p>` element:

- All `aria-*` attributes
- All `data-*` attributes
- `id`

```html
<aegov-title id="section-title" data-testid="title-1">My Title</aegov-title>
```

---

## Accessibility

The `aegov-title` component is a presentational typography helper. Keep the following points in mind.

### Built-in Features

- **Pass-through `aria-*` attributes** — any `aria-*` attribute placed on the host element is forwarded to the inner `<p>` element, allowing you to add `aria-label`, `aria-describedby`, or other ARIA attributes as needed.
- **Pass-through `id`** — the `id` attribute is forwarded so other elements can reference the title via `aria-labelledby` or `aria-describedby`.
- **Block display** — the host element uses `display: block`, ensuring the title occupies its own line in the document flow and is announced as a distinct piece of content.

### Developer Responsibilities

1. **Use semantic headings for document structure.** By default `aegov-title` renders a `<p>`, which is purely presentational. If the title represents a structural heading in the document outline, set `heading-type` to the appropriate level so the rendered tag is a real heading.

   ```html
   <!-- For document structure, set heading-type to the semantic level -->
   <aegov-title heading-type="h2" size="xl">Section Title</aegov-title>

   <!-- Or keep the default <p> when the title is purely decorative -->
   <aegov-title size="xl">Decorative Title</aegov-title>
   ```

2. **Colour contrast.** When using the `class` property to change text colour, ensure the chosen colour maintains at least a **4.5:1** contrast ratio against the background for WCAG 2.1 AA compliance.

3. **Meaningful content.** The title text should be descriptive and meaningful. Avoid using the component for purely decorative text that carries no semantic meaning.

---

## Notes

- The `aegov-title` component renders a `<p>` element by default. Use the `heading-type` property to opt into a semantic heading wrapper (`<h2>`–`<h6>`) when needed. `h1` is excluded — page-level headings should remain a deliberate, explicit choice.
- The size and margin classes are applied with `!important` so the prop-driven typography overrides the global `<h1>`–`<h6>` styles defined in `global.css`. This guarantees the same visual result whether the wrapper is a `<p>` or an `<h*>`.
- Custom classes provided via the `class` property are **merged** with the default classes (`font-bold!`, `mt-0!`, `mb-0!`, and the size class). They do not replace them. To override a default, use a Tailwind class that targets the same CSS property with `!important` — for example, `class="font-normal!"` will override `font-bold!`.
- The component uses `scoped: false` and does not use Shadow DOM. Styles are applied via Tailwind utility classes directly on the rendered wrapper, making them easy to inspect and override.
