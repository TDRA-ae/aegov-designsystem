# Separator

<p class="text-lg text-aeblack-500 mb-8">A separator is a visual divider used to create clear boundaries between sections of content. It helps organise layouts by providing horizontal or vertical lines, optionally with a centred text label.</p>

## Introduction

The `aegov-separator` component renders a thin rule to separate groups of related content. It supports **horizontal** and **vertical** orientations, a **subtle** variant for lighter visual weight, and an optional **text label** displayed at the centre of the line.

When no label is provided, the component renders a semantic `<hr>` element. When a label is present, it switches to a flex container with two lines flanking the text.

```html
<aegov-separator></aegov-separator>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <p class="mb-4 text-sm text-slate-600">Content above the separator</p>
  <aegov-separator></aegov-separator>
  <p class="mt-4 text-sm text-slate-600">Content below the separator</p>
</div>

---

## Orientation

The `orientation` property controls whether the separator runs horizontally or vertically.

### Horizontal

The default orientation. The separator spans the full width of its container.

```html
<aegov-separator orientation="horizontal"></aegov-separator>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <p class="mb-4 text-sm text-slate-600">Section A</p>
  <aegov-separator orientation="horizontal"></aegov-separator>
  <p class="mt-4 text-sm text-slate-600">Section B</p>
</div>

### Vertical

A vertical line that spans the full height of its container. Useful for separating items in a horizontal layout.

```html
<div style="display: flex; align-items: center; gap: 1rem; height: 3rem;">
  <span>Item 1</span>
  <aegov-separator orientation="vertical"></aegov-separator>
  <span>Item 2</span>
  <aegov-separator orientation="vertical"></aegov-separator>
  <span>Item 3</span>
</div>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div style="display: flex; align-items: center; gap: 1rem; height: 3rem;">
    <span class="text-sm text-slate-700">Item 1</span>
    <aegov-separator orientation="vertical"></aegov-separator>
    <span class="text-sm text-slate-700">Item 2</span>
    <aegov-separator orientation="vertical"></aegov-separator>
    <span class="text-sm text-slate-700">Item 3</span>
  </div>
</div>

---

## Variants

The `appearance` property controls the visual weight of the separator line.

### Default

The standard separator with a `slate-300` border colour.

```html
<aegov-separator></aegov-separator>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-separator></aegov-separator>
</div>

### Subtle

A lighter separator with a `slate-200` border colour — useful when you want a less prominent division.

```html
<aegov-separator appearance="subtle"></aegov-separator>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-separator appearance="subtle"></aegov-separator>
</div>

Comparison of both variants side by side:

<div class="p-6 bg-whitely-50 rounded-lg my-6 not-aegov space-y-6">
  <div>
    <p class="text-xs font-semibold text-slate-500 mb-2">Default</p>
    <aegov-separator></aegov-separator>
  </div>
  <div>
    <p class="text-xs font-semibold text-slate-500 mb-2">Subtle</p>
    <aegov-separator appearance="subtle"></aegov-separator>
  </div>
</div>

---

## Separator with Text Label

Add a centred text label using the `text` property. The line splits into two segments with the label in between. This is useful for dividing form sections, content groups, or providing contextual labels like "OR" between options.

```html
<aegov-separator text="OR"></aegov-separator>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-separator text="OR"></aegov-separator>
</div>

You can also provide label text via the default slot instead of the `text` property:

```html
<aegov-separator>Section 2</aegov-separator>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-separator>Section 2</aegov-separator>
</div>

### Text with Subtle Variant

The subtle variant also applies to the flanking lines when a text label is present.

```html
<aegov-separator text="Continue" appearance="subtle"></aegov-separator>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-separator text="Continue" appearance="subtle"></aegov-separator>
</div>

### Real-World Example: Login Form Divider

```html
<aegov-button full>Sign in with Email</aegov-button>
<aegov-separator text="OR"></aegov-separator>
<aegov-button full variant="outline">Sign in with Google</aegov-button>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov" style="max-width: 400px;">
  <aegov-button full>Sign in with Email</aegov-button>
  <aegov-separator text="OR"></aegov-separator>
  <aegov-button full variant="outline">Sign in with Google</aegov-button>
</div>

---

## Decorative vs Semantic

By default, the separator is decorative (`is-decorative="true"`) and receives `role="presentation"`, which tells assistive technologies to ignore it. When the separator conveys meaningful structure — for example, dividing distinct sections of a page — set `is-decorative="false"` to apply `role="separator"` instead.

```html
<!-- Decorative (default) — ignored by screen readers -->
<aegov-separator></aegov-separator>

<!-- Semantic — announced as a separator -->
<aegov-separator is-is-decorative="false"></aegov-separator>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov space-y-4">
  <div>
    <p class="text-xs font-semibold text-slate-500 mb-2">Decorative (role="presentation")</p>
    <aegov-separator></aegov-separator>
  </div>
  <div>
    <p class="text-xs font-semibold text-slate-500 mb-2">Semantic (role="separator")</p>
    <aegov-separator is-is-decorative="false"></aegov-separator>
  </div>
</div>

---

## Vertical Separator in a Toolbar

A common pattern is using vertical separators to group related actions in a horizontal toolbar.

```html
<div style="display: flex; align-items: center; gap: 0.75rem;">
  <aegov-button variant="soft" size="sm">Bold</aegov-button>
  <aegov-button variant="soft" size="sm">Italic</aegov-button>
  <aegov-separator orientation="vertical"></aegov-separator>
  <aegov-button variant="soft" size="sm">Left</aegov-button>
  <aegov-button variant="soft" size="sm">Center</aegov-button>
  <aegov-button variant="soft" size="sm">Right</aegov-button>
  <aegov-separator orientation="vertical"></aegov-separator>
  <aegov-button variant="soft" size="sm">Link</aegov-button>
</div>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div style="display: flex; align-items: center; gap: 0.75rem;">
    <aegov-button variant="soft" size="sm">Bold</aegov-button>
    <aegov-button variant="soft" size="sm">Italic</aegov-button>
    <aegov-separator orientation="vertical"></aegov-separator>
    <aegov-button variant="soft" size="sm">Left</aegov-button>
    <aegov-button variant="soft" size="sm">Center</aegov-button>
    <aegov-button variant="soft" size="sm">Right</aegov-button>
    <aegov-separator orientation="vertical"></aegov-separator>
    <aegov-button variant="soft" size="sm">Link</aegov-button>
  </div>
</div>

---

## API Reference

### Properties

| Property      | Attribute     | Description                                                        | Type                            | Default          |
|---------------|---------------|--------------------------------------------------------------------|---------------------------------|------------------|
| `orientation` | `orientation` | The direction of the separator line                                | `'horizontal'` \| `'vertical'` | `'horizontal'`   |
| `appearance`     | `appearance`     | The visual weight of the separator                                 | `'default'` \| `'subtle'`      | `'default'`      |
| `text`        | `text`        | Optional text label displayed at the centre of the separator       | `string`                        | `undefined`      |
| `is-decorative`  | `is-decorative`  | Whether the separator is purely decorative (no semantic meaning)   | `boolean`                       | `true`           |

### Slots

| Slot      | Description                                                                                   |
|-----------|-----------------------------------------------------------------------------------------------|
| (default) | Alternative way to provide a text label. Used when the `text` property is not set.            |

---

## Accessibility

The `aegov-separator` component provides appropriate ARIA semantics based on its configuration.

### Built-in Features

- **`role="presentation"`** — applied by default when `is-decorative` is `true`. Assistive technologies ignore the element, treating it as purely visual.
- **`role="separator"`** — applied when `is-decorative` is set to `false`, indicating a meaningful content boundary.
- **`aria-orientation`** — automatically set to `"horizontal"` or `"vertical"` to match the `orientation` property, allowing screen readers to announce the direction.
- **Semantic `<hr>` element** — when no text label is present, the component renders a native `<hr>` tag, which is inherently recognised as a thematic break by assistive technologies.

### Developer Responsibilities

1. **Use `is-decorative="false"` for meaningful dividers.** If the separator marks a significant boundary between distinct content sections (e.g. between a header and body), set `is-decorative="false"` so screen readers can announce it.

2. **Keep labels short.** When using the `text` property or default slot, keep the label concise (one or two words). Long labels reduce the visual impact of the separator line.

3. **Vertical separators need a sized container.** The vertical separator uses `height: 100%` and `min-height: 1rem`. Ensure the parent container has an explicit height or uses flexbox so the line is visible.

---

## Notes

- When no `text` property or slot content is provided, the component renders a native `<hr>` element. When a label is present, it renders a `<div>` with two lines and a centred `<span>`.
- The `text` property takes precedence over slot content. If both are provided, only the `text` value is displayed.
- Vertical separators render as an `inline-block` element with a left border. They require the parent to have an explicit height or use a flex/grid layout with `align-items` set.
- The component uses `scoped: false`, so its CSS class names (`.aegov-separator`, `.separator--horizontal`, etc.) are available globally. Avoid naming collisions in your own stylesheets.
- The subtle variant reduces the border colour from `slate-300` to `slate-200`. On very light backgrounds, the difference may be minimal — test in your specific context.
