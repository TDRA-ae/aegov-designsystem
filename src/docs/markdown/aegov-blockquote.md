# aegov-blockquote

A semantic blockquote component for displaying pulled quotes, testimonials, or attributed statements. Use it whenever you need to visually emphasize a quoted passage with optional attribution. Supports a default appearance with a decorative quote icon, and a colored appearance for testimonial-style emphasis.

## Properties

### appearance

Visual style. Accepts `primary` (default, with quote icon) or `colored` / `coloured` (filled background with colored border, no icon).

```html
<aegov-blockquote appearance="primary">Quoted text...</aegov-blockquote>
<aegov-blockquote appearance="colored">Quoted text...</aegov-blockquote>
```

### cite

URL of the source. Reflected as the native `cite` attribute on the underlying `<blockquote>`.

```html
<aegov-blockquote cite="https://example.com/source">Quote</aegov-blockquote>
```

### author

Name of the quoted author. Rendered in the footer.

```html
<aegov-blockquote author="Sheikh Zayed bin Sultan Al Nahyan">
  ...quote text...
</aegov-blockquote>
```

### author-title

Author's title or position. Rendered in the footer below the author.

```html
<aegov-blockquote author="Jane Doe" author-title="Director, Operations">
  ...quote text...
</aegov-blockquote>
```

### extra-class

Additional CSS classes merged onto the blockquote element.

```html
<aegov-blockquote extra-class="my-8">...</aegov-blockquote>
```

## Examples

### Quote with quote icon (default)

```html
<aegov-blockquote>
  The future belongs to those who prepare for it today.
</aegov-blockquote>
```

### Colored testimonial

```html
<aegov-blockquote appearance="colored" author="Jane Doe" author-title="Director">
  The new design system has cut our build times in half.
</aegov-blockquote>
```

### Quote with citation source

```html
<aegov-blockquote cite="https://u.ae/about-the-uae">
  ...quote text...
</aegov-blockquote>
```

### Pull-quote with attribution

```html
<aegov-blockquote
  author="Sheikh Mohammed bin Rashid Al Maktoum"
  author-title="Vice President and Prime Minister of the UAE">
  We do not wait for change, we make change.
</aegov-blockquote>
```

## RTL Behavior

The component uses Tailwind logical-property utilities (`ps-*`, `pe-*`, `border-s-*`, `start-0`) so padding, the colored border, and the SVG icon's positioning all flip automatically in RTL contexts. The decorative SVG icon also includes `rtl:-scale-x-100` to mirror its visual direction. No manual adjustment is needed when used inside `dir="rtl"`.

## API Reference

### Properties

| Property      | Attribute      | Description                              | Type                                  | Default     |
| ------------- | -------------- | ---------------------------------------- | ------------------------------------- | ----------- |
| `appearance`  | `appearance`   | Visual style.                            | `"primary" \| "colored" \| "coloured"` | `'primary'` |
| `cite`        | `cite`         | URL of the source.                       | `string`                              | `undefined` |
| `author`      | `author`       | Author's name. Rendered in the footer.   | `string`                              | `undefined` |
| `authorTitle` | `author-title` | Author's title or role.                  | `string`                              | `undefined` |
| `extraClass`  | `extra-class`  | Additional CSS classes.                  | `string`                              | `undefined` |

### Pass-through Attributes

`aria-*` and `data-*` attributes set on the host are forwarded to the inner `<blockquote>`.

### Slots

| Slot      | Description                  |
| --------- | ---------------------------- |
| (default) | The quoted content.          |

### Parts

| Part         | Description                              |
| ------------ | ---------------------------------------- |
| `blockquote` | The native `<blockquote>` element.       |

## Accessibility

### Built-in

- Uses the native semantic `<blockquote>` element, so assistive technology recognizes the quoted content.
- The `cite` attribute is reflected onto the underlying element when provided, giving AT a programmatic source URL.
- The decorative quote icon renders as an inline SVG with no role or text alternative — it doesn't introduce noise for screen readers.

### Developer responsibilities

- Provide either `cite` (URL) or `author`/`author-title` so the source of the quote is discoverable.
- Keep quoted text faithful to the source. Long quotes should still be wrapped in `<p>` tags inside the slot if they contain multiple paragraphs.

### Notes

- `appearance` accepts both `colored` (US) and `coloured` (UK) spellings.
- The footer is only rendered when at least one of `author` or `authorTitle` is provided.
