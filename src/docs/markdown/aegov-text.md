# aegov-text

A simple paragraph wrapper for body copy. Use it whenever you need styled body text with a controlled, design-system-aligned size scale instead of raw `<p>` tags. Suitable for descriptions, supporting copy, and inline body content across the system.

## Properties

### size

Controls the text size. Accepts `sm`, `base`, or `lg`. Also supports a Tailwind-style responsive string with breakpoint prefixes.

```html
<aegov-text size="sm">Small body text</aegov-text>
<aegov-text size="base">Default body text</aegov-text>
<aegov-text size="lg">Large body text</aegov-text>
```

### extra-class

Additional classes merged onto the rendered `<p>`.

```html
<aegov-text extra-class="text-aeblack-700 italic">Italic emphasis</aegov-text>
```

## Sizes

`size` accepts a single token or a responsive string using Tailwind-style breakpoint prefixes. Recognized breakpoints come from the project's Tailwind theme (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`).

```html
<!-- Static -->
<aegov-text size="sm"></aegov-text>
<aegov-text size="base"></aegov-text>
<aegov-text size="lg"></aegov-text>

<!-- Responsive: small on mobile, base from md, large from lg -->
<aegov-text size="sm md:base lg:lg">Responsive body</aegov-text>
```

| Token | Tailwind class | Approximate size |
| ----- | -------------- | ---------------- |
| `sm`   | `text-sm`      | 14px |
| `base` | `text-base`    | 16px |
| `lg`   | `text-lg`      | 18px |

## Examples

### Basic body copy

```html
<aegov-text>The UAE Government Design System provides a consistent set of components.</aegov-text>
```

### Smaller helper text

```html
<aegov-text size="sm" extra-class="text-aeblack-600">
  This information is automatically saved.
</aegov-text>
```

### Large lead paragraph

```html
<aegov-text size="lg">
  This is a lead-in paragraph to introduce the section.
</aegov-text>
```

### Responsive sizing

```html
<aegov-text size="sm md:base lg:lg">
  Adjusts size as the viewport grows.
</aegov-text>
```

## RTL Behavior

`aegov-text` does not depend on directional layout — it renders a simple `<p>`. Text direction follows the `dir` attribute of the surrounding document or container. The system uses Tailwind logical properties (`start`/`end`) elsewhere; consumers can apply RTL-aware utilities via `extra-class` if alignment is needed.

## API Reference

### Properties

| Property      | Attribute      | Description                                               | Type     | Default  |
| ------------- | -------------- | --------------------------------------------------------- | -------- | -------- |
| `size`        | `size`         | Text size token (`sm`, `base`, `lg`) or responsive string | `string` | `'base'` |
| `extraClass`  | `extra-class`  | Additional CSS classes applied to the rendered `<p>`      | `string` | `undefined` |

### Pass-through Attributes

`aria-*` and `data-*` attributes set on the host are forwarded to the underlying `<p>` element.

### Slots

| Slot      | Description                |
| --------- | -------------------------- |
| (default) | The text content to render |

## Accessibility

### Built-in

- Renders a semantic `<p>` element so assistive technologies treat the content as a paragraph.
- Pass-through `aria-*` attributes allow consumers to add additional ARIA semantics (e.g. `aria-live`, `aria-label`) without wrapping markup.

### Developer responsibilities

- Provide meaningful, well-formed text content. Avoid using `aegov-text` for non-paragraph content (headings, lists).
- Ensure sufficient color contrast when overriding text color via `extra-class`.

### Notes

- The component always applies `mb-8 mt-0` margin utilities. Use `extra-class` if a different rhythm is required, or wrap inside a container that overrides these utilities.
