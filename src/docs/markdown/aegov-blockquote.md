# Blockquote

<p class="text-lg text-aeblack-500 mb-8">A blockquote highlights a quoted passage of text, optionally attributing it to an author. It is commonly used for testimonials, pull quotes, and editorial emphasis.</p>

## Introduction

The `aegov-blockquote` component renders a semantic HTML `<blockquote>` element with built-in styling for quoted content. It supports **2 variants** (primary and colored), optional **author attribution**, an **author title**, and a **citation URL**.

```html
<aegov-blockquote>Design is not just what it looks like and feels like. Design is how it works.</aegov-blockquote>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-blockquote>Design is not just what it looks like and feels like. Design is how it works.</aegov-blockquote>
</div>

---

## Variants

The `variant` property controls the visual style of the blockquote. There are two variants available.

### Primary (default)

The default variant displays a large decorative quote icon in the top-left corner. The quote text is rendered in a neutral dark colour with generous left padding to accommodate the icon.

```html
<aegov-blockquote variant="primary">
  The future belongs to those who believe in the beauty of their dreams.
</aegov-blockquote>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-blockquote variant="primary">The future belongs to those who believe in the beauty of their dreams.</aegov-blockquote>
</div>

### Colored

The colored variant replaces the quote icon with a bold left border and a tinted background using the primary colour palette. This style works well for pull quotes and editorial highlights.

```html
<aegov-blockquote variant="colored">
  Innovation distinguishes between a leader and a follower.
</aegov-blockquote>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-blockquote variant="colored">Innovation distinguishes between a leader and a follower.</aegov-blockquote>
</div>

> **Note:** The alternative spelling `coloured` is also accepted and behaves identically to `colored`.

### Side-by-Side Comparison

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div>
    <p class="text-sm font-semibold text-aeblack-500 mb-2">Primary</p>
    <aegov-blockquote variant="primary">Quality is not an act, it is a habit.</aegov-blockquote>
  </div>
  <div>
    <p class="text-sm font-semibold text-aeblack-500 mb-2">Colored</p>
    <aegov-blockquote variant="colored">Quality is not an act, it is a habit.</aegov-blockquote>
  </div>
</div>

---

## Author Attribution

Use the `author` property to display the name of the person being quoted. The author name appears below the quote text in a semibold style.

```html
<aegov-blockquote author="Steve Jobs">
  Stay hungry, stay foolish.
</aegov-blockquote>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-blockquote author="Steve Jobs">Stay hungry, stay foolish.</aegov-blockquote>
</div>

---

## Author Title

Use the `author-title` property alongside `author` to display the author's title, position, or organisation. The title renders below the author name in a lighter weight.

```html
<aegov-blockquote author="His Highness Sheikh Mohammed bin Rashid Al Maktoum" author-title="Vice President and Prime Minister of the UAE">
  The word impossible is not in the dictionary of leaders.
</aegov-blockquote>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-blockquote author="His Highness Sheikh Mohammed bin Rashid Al Maktoum" author-title="Vice President and Prime Minister of the UAE">The word impossible is not in the dictionary of leaders.</aegov-blockquote>
</div>

Author attribution works with both variants:

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-blockquote variant="colored" author="Albert Einstein" author-title="Theoretical Physicist">Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.</aegov-blockquote>
</div>

---

## Citation URL

Use the `cite` property to specify the source URL of the quotation. This sets the native HTML `cite` attribute on the `<blockquote>` element. The cite value is not visually displayed but provides semantic metadata for search engines and assistive technologies.

```html
<aegov-blockquote cite="https://example.com/source" author="Jane Doe">
  The only way to do great work is to love what you do.
</aegov-blockquote>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-blockquote cite="https://example.com/source" author="Jane Doe">The only way to do great work is to love what you do.</aegov-blockquote>
</div>

---

## Rich Content

The default slot accepts any HTML content, including paragraphs, lists, and inline formatting. This allows you to quote multi-paragraph passages or structured content.

```html
<aegov-blockquote author="Annual Report 2024">
  <p>Our digital transformation strategy delivered measurable results:</p>
  <ul>
    <li>98% of government services available online</li>
    <li>Customer satisfaction rating of 92%</li>
    <li>Processing time reduced by 60%</li>
  </ul>
</aegov-blockquote>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-blockquote author="Annual Report 2024">
    <p>Our digital transformation strategy delivered measurable results:</p>
    <ul>
      <li>98% of government services available online</li>
      <li>Customer satisfaction rating of 92%</li>
      <li>Processing time reduced by 60%</li>
    </ul>
  </aegov-blockquote>
</div>

Rich content with the colored variant:

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-blockquote variant="colored" author="Policy Document">
    <p>All government entities shall adhere to the following principles:</p>
    <ul>
      <li>Transparency in decision-making</li>
      <li>Citizen-centric service design</li>
      <li>Data-driven governance</li>
    </ul>
  </aegov-blockquote>
</div>

---

## RTL Support

The component supports right-to-left layouts. In the primary variant the decorative quote icon automatically mirrors horizontally using `rtl:-scale-x-100`.

```html
<div dir="rtl">
  <aegov-blockquote author="الشيخ زايد بن سلطان آل نهيان" author-title="المؤسس">
    إن الثروة الحقيقية هي ثروة الرجال وليست ثروة المال والنفط.
  </aegov-blockquote>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-blockquote author="الشيخ زايد بن سلطان آل نهيان" author-title="المؤسس">إن الثروة الحقيقية هي ثروة الرجال وليست ثروة المال والنفط.</aegov-blockquote>
</div>

RTL with the colored variant:

<div dir="rtl" class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-blockquote variant="colored" author="حكمة عربية">العلم نور والجهل ظلام.</aegov-blockquote>
</div>

---

## Complete Examples

### Testimonial

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-blockquote author="Sarah Al Hashemi" author-title="Director of Digital Services, Ministry of Interior">The AEGOV Design System has streamlined our development process and ensured a consistent, accessible experience across all our digital services.</aegov-blockquote>
</div>

### Pull Quote (Colored)

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-blockquote variant="colored">By 2031, the UAE aims to be among the top 10 countries globally in digital government services.</aegov-blockquote>
</div>

### Academic Citation

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-blockquote cite="https://doi.org/example" author="Dr. Ahmad Al Mansoori" author-title="UAE University, Department of Computer Science">User-centred design principles, when consistently applied across government portals, lead to a statistically significant improvement in task completion rates and citizen satisfaction.</aegov-blockquote>
</div>

---

## API Reference

### Properties

| Property      | Attribute      | Description                          | Type                                          | Default     |
|---------------|----------------|--------------------------------------|-----------------------------------------------|-------------|
| `variant`     | `variant`      | The visual style of the blockquote   | `'primary'` \| `'colored'` \| `'coloured'`    | `'primary'` |
| `cite`        | `cite`         | The citation source URL              | `string`                                       | `undefined` |
| `author`      | `author`       | The name of the quote's author       | `string`                                       | `undefined` |
| `authorTitle` | `author-title` | The author's title or position       | `string`                                       | `undefined` |

### Slots

| Slot      | Description                                                            |
|-----------|------------------------------------------------------------------------|
| (default) | The blockquote content — text, paragraphs, lists, or inline HTML.     |

### CSS Classes

The component uses the following CSS classes internally. Since the component uses `scoped: false`, these classes are available in the global scope.

| Class                  | Description                                                    |
|------------------------|----------------------------------------------------------------|
| `.aegov-blockquote`    | The base class applied to the `<blockquote>` element.          |
| `.blockquote--colored` | Applied when the variant is `colored` or `coloured`.           |
| `.blockquote__footer`  | The container for author and author title.                     |
| `.blockquote__author`  | The author name element.                                       |
| `.blockquote__title`   | The author title/position element.                             |

---

## Accessibility

The `aegov-blockquote` component is built with accessibility as a first-class concern.

### Built-in Features

- **Semantic `<blockquote>` element** — renders a native HTML blockquote, which is recognised by screen readers and assistive technologies as a quoted passage.
- **`cite` attribute** — when provided, the citation URL is placed on the native `cite` attribute, giving search engines and assistive technologies access to the source.
- **Decorative icon** — the quote icon in the primary variant is purely decorative and does not interfere with screen reader output.
- **Author attribution** — author and title information is rendered as visible text within the blockquote, ensuring it is announced alongside the quoted content.

### Developer Responsibilities

1. **Use meaningful quotations.** The `<blockquote>` element should only be used for actual quotations, not for visual indentation or styling purposes.

2. **Provide author attribution.** When quoting a specific person, always set the `author` property so the source of the quote is clear to all users.

3. **Colour contrast.** All built-in colour combinations meet WCAG 2.1 AA contrast ratios. If you override colours via CSS, verify that the new colours maintain at least a **4.5:1** contrast ratio for text.

---

## Notes

- The component renders a native `<blockquote>` element. Do **not** wrap it inside another `<blockquote>` — this creates invalid HTML.
- The `variant` property accepts both `colored` and `coloured` spellings. They are functionally identical.
- The decorative quote icon in the primary variant uses an inline SVG that automatically mirrors in RTL layouts via the `rtl:-scale-x-100` class.
- The `cite` property maps directly to the HTML `cite` attribute. It is not visually rendered — it provides metadata only.
- The `authorTitle` property uses the attribute name `author-title` in HTML (kebab-case), following StencilJS conventions for multi-word attributes.
- The host element uses `display: block` to ensure the blockquote renders correctly as a block-level element.
- Text colour inside the blockquote is automatically adjusted based on the variant: `text-aeblack-800` for primary, `text-primary-700` for colored.
