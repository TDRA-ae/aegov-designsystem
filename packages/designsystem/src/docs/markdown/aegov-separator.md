# Separator

<p class="text-lg text-aeblack-500 mb-8">A Separator is a thin visual divider used to break up sections of content, group related items, or signal a contextual boundary in an interface. Use it to separate form sections, divide list groups, mark a transition between two interaction paths, or insert an &ldquo;OR&rdquo;-style break between alternative actions. Separators support horizontal and vertical orientation, an optional inline label, two appearance treatments (`solid` / `light`), and four colour variants (`primary`, `secondary`, `neutral-max`, `neutral-min`).</p>

## Introduction

The `aegov-separator` component renders as a native `<hr>` when used without a label, or as a flex layout of line / text / line when a `text` value or slotted label is supplied. It exposes a small surface — `orientation`, `appearance`, `variant`, `text`, `gap`, `extra-class`, and `is-decorative` — and uses logical CSS properties so it works identically in LTR and RTL contexts.

```html
<aegov-separator></aegov-separator>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="mb-4">Above the separator.</p>
  <aegov-separator></aegov-separator>
  <p class="mt-4">Below the separator.</p>
</div>

---

## Orientation

Separators can be rendered horizontally or vertically. Horizontal is the default and fills the full width of its container. Vertical separators require a height context — either a parent with a defined height, or content of a fixed height around the separator.

### Horizontal (default)

```html
<aegov-separator></aegov-separator>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="mb-4">Personal details</p>
  <aegov-separator></aegov-separator>
  <p class="mt-4">Contact information</p>
</div>

### Vertical

Use a vertical separator inside a flex row of links or actions to create a clean visual divider.

```html
<div class="flex items-center gap-3 h-6">
  <aegov-link href="/edit">Edit</aegov-link>
  <aegov-separator orientation="vertical"></aegov-separator>
  <aegov-link href="/share">Share</aegov-link>
  <aegov-separator orientation="vertical"></aegov-separator>
  <aegov-link href="/delete">Delete</aegov-link>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex items-center gap-3 h-6">
    <aegov-link href="javascript:void(0)">Edit</aegov-link>
    <aegov-separator orientation="vertical"></aegov-separator>
    <aegov-link href="javascript:void(0)">Share</aegov-link>
    <aegov-separator orientation="vertical"></aegov-separator>
    <aegov-link href="javascript:void(0)">Delete</aegov-link>
  </div>
</div>

---

## Appearance

The `appearance` property tunes the line treatment. Use `solid` (full-strength) for clear section breaks, and `light` (subtle) where the separator should recede behind the surrounding content. The actual colour resolves from the `variant` property.

```html
<aegov-separator appearance="solid"></aegov-separator>
<aegov-separator appearance="light"></aegov-separator>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="text-sm text-aeblack-600 mb-2">Solid</p>
  <aegov-separator appearance="solid"></aegov-separator>
  <p class="text-sm text-aeblack-600 mt-6 mb-2">Light</p>
  <aegov-separator appearance="light"></aegov-separator>
</div>

---

## Variant

The `variant` property selects the colour family for the line and the optional text label.

- `primary` — primary-* family (default)
- `secondary` — secondary-* family
- `neutral-max` — strong neutral (aeblack-800 / aeblack-400 family)
- `neutral-min` — quiet neutral (aeblack-100 / aeblack-50 family)

### Colour matrix

| Variant       | Solid           | Light            |
| ------------- | --------------- | ---------------- |
| `primary`     | `primary-600`   | `primary-200`    |
| `secondary`   | `secondary-600` | `secondary-200`  |
| `neutral-max` | `aeblack-800`   | `aeblack-400`    |
| `neutral-min` | `aeblack-100`   | `aeblack-50`     |

```html
<aegov-separator variant="primary" appearance="solid"></aegov-separator>
<aegov-separator variant="secondary" appearance="light"></aegov-separator>
<aegov-separator variant="neutral-max" appearance="solid"></aegov-separator>
<aegov-separator variant="neutral-min" appearance="solid"></aegov-separator>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="text-sm text-aeblack-600 mb-2">Primary · Solid</p>
  <aegov-separator variant="primary" appearance="solid"></aegov-separator>
  <p class="text-sm text-aeblack-600 mt-6 mb-2">Primary · Light</p>
  <aegov-separator variant="primary" appearance="light"></aegov-separator>
  <p class="text-sm text-aeblack-600 mt-6 mb-2">Secondary · Solid</p>
  <aegov-separator variant="secondary" appearance="solid"></aegov-separator>
  <p class="text-sm text-aeblack-600 mt-6 mb-2">Secondary · Light</p>
  <aegov-separator variant="secondary" appearance="light"></aegov-separator>
  <p class="text-sm text-aeblack-600 mt-6 mb-2">Neutral-max · Solid</p>
  <aegov-separator variant="neutral-max" appearance="solid"></aegov-separator>
  <p class="text-sm text-aeblack-600 mt-6 mb-2">Neutral-max · Light</p>
  <aegov-separator variant="neutral-max" appearance="light"></aegov-separator>
  <p class="text-sm text-aeblack-600 mt-6 mb-2">Neutral-min · Solid</p>
  <aegov-separator variant="neutral-min" appearance="solid"></aegov-separator>
  <p class="text-sm text-aeblack-600 mt-6 mb-2">Neutral-min · Light</p>
  <aegov-separator variant="neutral-min" appearance="light"></aegov-separator>
</div>

The text label of a text-bearing separator follows the variant family too — `primary-700`, `secondary-700`, `aeblack-800` (neutral-max), `aeblack-600` (neutral-min for legibility).

```html
<aegov-separator variant="secondary" text="OR"></aegov-separator>
<aegov-separator variant="neutral-max" text="Section break"></aegov-separator>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-separator variant="secondary" text="OR"></aegov-separator>
  <aegov-separator variant="neutral-max" text="Section break"></aegov-separator>
  <aegov-separator variant="neutral-min" text="Quiet break"></aegov-separator>
</div>

---

## Gap

The `gap` property accepts any non-negative number and applies that many Tailwind spacing units of padding on either side of the separator line. One unit equals `0.25rem` (4px), so `gap="4"` produces `1rem` (16px) of padding-block on a horizontal separator — same scale as `py-4`.

- Horizontal orientation → padding-block (top + bottom)
- Vertical orientation → padding-inline (start + end)
- Default `0` → no padding

```html
<aegov-separator gap="1"></aegov-separator>
<aegov-separator gap="2"></aegov-separator>
<aegov-separator gap="4"></aegov-separator>
<aegov-separator gap="6"></aegov-separator>
<aegov-separator gap="8"></aegov-separator>
<aegov-separator gap="12"></aegov-separator>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="text-sm text-aeblack-600 mb-1">Content above</p>
  <aegov-separator variant="neutral-max" gap="0"></aegov-separator>
  <p class="text-sm text-aeblack-600 mb-1">gap="0" — no padding</p>
  <aegov-separator variant="neutral-max" gap="1"></aegov-separator>
  <p class="text-sm text-aeblack-600 mb-1">gap="1" — 0.25rem (4px)</p>
  <aegov-separator variant="neutral-max" gap="2"></aegov-separator>
  <p class="text-sm text-aeblack-600 mb-1">gap="2" — 0.5rem (8px)</p>
  <aegov-separator variant="neutral-max" gap="4"></aegov-separator>
  <p class="text-sm text-aeblack-600 mb-1">gap="4" — 1rem (16px)</p>
  <aegov-separator variant="neutral-max" gap="6"></aegov-separator>
  <p class="text-sm text-aeblack-600 mb-1">gap="6" — 1.5rem (24px)</p>
  <aegov-separator variant="neutral-max" gap="8"></aegov-separator>
  <p class="text-sm text-aeblack-600 mb-1">gap="8" — 2rem (32px)</p>
  <aegov-separator variant="neutral-max" gap="12"></aegov-separator>
  <p class="text-sm text-aeblack-600">Content below — gap="12" — 3rem (48px)</p>
</div>

### Gap with text label

```html
<aegov-separator gap="6" text="Section break" variant="neutral-max"></aegov-separator>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="text-sm text-aeblack-600">Personal details above</p>
  <aegov-separator gap="6" text="Contact information" variant="neutral-max"></aegov-separator>
  <p class="text-sm text-aeblack-600">Contact section below</p>
</div>

### Gap on vertical separator

For vertical orientation `gap` adds inline-start + inline-end padding.

```html
<div class="flex items-center h-6">
  <span>A</span>
  <aegov-separator orientation="vertical" gap="4" variant="neutral-max"></aegov-separator>
  <span>B</span>
  <aegov-separator orientation="vertical" gap="4" variant="neutral-max"></aegov-separator>
  <span>C</span>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex items-center h-6">
    <span>A</span>
    <aegov-separator orientation="vertical" gap="4" variant="neutral-max"></aegov-separator>
    <span>B</span>
    <aegov-separator orientation="vertical" gap="4" variant="neutral-max"></aegov-separator>
    <span>C</span>
  </div>
</div>

---

## Separator with Text

Set the `text` property to render an inline label centred between two lines. This pattern is common between two alternative sign-in methods or between a primary action and its alternatives.

```html
<aegov-separator text="OR"></aegov-separator>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button appearance="solid" extra-class="w-full">Sign in with Emirates ID</aegov-button>
  <aegov-separator text="OR"></aegov-separator>
  <aegov-button appearance="outline" extra-class="w-full">Sign in with UAE Pass</aegov-button>
</div>

The same pattern with a longer label:

```html
<aegov-separator text="Continue with another method"></aegov-separator>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-separator text="Continue with another method"></aegov-separator>
</div>

You can also pass the label as slotted content instead of using the `text` property — useful when the label needs richer markup such as an inline icon.

```html
<aegov-separator>
  <strong>Section break</strong>
</aegov-separator>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-separator>
    <strong>Section break</strong>
  </aegov-separator>
</div>

---

## Decorative vs. Semantic

By default the separator is decorative — it renders with `role="presentation"` so assistive technology ignores it. When the divider carries meaning (for example, separating two unrelated content groups in a list or marking a topic shift), set `is-decorative="false"` to expose `role="separator"` instead.

```html
<aegov-separator is-decorative="false"></aegov-separator>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="mb-3">Active applications</p>
  <aegov-separator is-decorative="false"></aegov-separator>
  <p class="mt-3">Archived applications</p>
</div>

---

## Common Patterns

### Form section divider

```html
<form>
  <h3>Personal details</h3>
  <!-- inputs -->
  <aegov-separator appearance="light" extra-class="my-6"></aegov-separator>
  <h3>Contact information</h3>
  <!-- inputs -->
</form>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <h3 class="text-lg font-semibold mb-2">Personal details</h3>
  <p class="text-sm text-aeblack-600">Emirates ID, full name, date of birth.</p>
  <aegov-separator appearance="light" extra-class="my-6"></aegov-separator>
  <h3 class="text-lg font-semibold mb-2">Contact information</h3>
  <p class="text-sm text-aeblack-600">Mobile number, email address, residential address.</p>
</div>

### Footer link list with vertical dividers

```html
<div class="flex items-center gap-3 h-5">
  <aegov-link href="/privacy">Privacy</aegov-link>
  <aegov-separator orientation="vertical"></aegov-separator>
  <aegov-link href="/terms">Terms</aegov-link>
  <aegov-separator orientation="vertical"></aegov-separator>
  <aegov-link href="/contact">Contact</aegov-link>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex items-center gap-3 h-5">
    <aegov-link href="javascript:void(0)">Privacy</aegov-link>
    <aegov-separator orientation="vertical"></aegov-separator>
    <aegov-link href="javascript:void(0)">Terms</aegov-link>
    <aegov-separator orientation="vertical"></aegov-separator>
    <aegov-link href="javascript:void(0)">Contact</aegov-link>
  </div>
</div>

---

## RTL Support

The separator is symmetric and direction-agnostic. The horizontal variant fills its container width identically in LTR and RTL. The text-bearing variant centres the label in either direction, with the lines on each side flipping naturally because the component uses flex layout — no manual adjustment is required.

```html
<div dir="rtl">
  <aegov-separator text="أو"></aegov-separator>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button appearance="solid" extra-class="w-full">تسجيل الدخول بالهوية الإماراتية</aegov-button>
  <aegov-separator text="أو"></aegov-separator>
  <aegov-button appearance="outline" extra-class="w-full">تسجيل الدخول عبر الهوية الرقمية</aegov-button>
</div>

A subtle horizontal divider between two Arabic sections:

```html
<div dir="rtl">
  <p>البيانات الشخصية</p>
  <aegov-separator appearance="light"></aegov-separator>
  <p>بيانات التواصل</p>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="mb-4">البيانات الشخصية</p>
  <aegov-separator appearance="light"></aegov-separator>
  <p class="mt-4">بيانات التواصل</p>
</div>

---

## API Reference

### Properties

| Property       | Attribute        | Description                                                                                  | Type                         | Default        |
| -------------- | ---------------- | -------------------------------------------------------------------------------------------- | ---------------------------- | -------------- |
| `orientation`  | `orientation`    | Direction of the separator.                                                                  | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `appearance`   | `appearance`     | Line treatment. Colour resolves from `variant`.                                              | `'solid' \| 'light'`          | `'solid'`      |
| `variant`      | `variant`        | Colour family for line and text label.                                                       | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `text`         | `text`           | Inline label text rendered at the centre of the separator.                                   | `string`                     | `undefined`    |
| `gap`          | `gap`            | Padding on either side of the line, in Tailwind spacing units (1 unit = 0.25rem = 4px). Horizontal → top + bottom; Vertical → start + end. | `number`                     | `0`            |
| `isDecorative` | `is-decorative`  | When `true`, exposes `role="presentation"`. When `false`, exposes `role="separator"`. **Note:** when the `text` prop (or slotted content) is present, the component overrides the presentation role regardless of this value — the presence of text content forces meaningful role semantics. | `boolean`                    | `true`         |
| `extraClass`   | `extra-class`    | Additional CSS classes merged onto the inner separator element.                              | `string`                     | `undefined`    |

### Slots

| Slot        | Description                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------ |
| _(default)_ | Optional inline label, used as an alternative to the `text` property. Accepts arbitrary HTML.                |

### Events

The component emits no custom events.

### Pass-through Attributes

| Attribute group  | Forwarded? | Where to apply                                                                  |
| ---------------- | ---------- | ------------------------------------------------------------------------------- |
| `aria-*`         | No         | Apply directly to `<aegov-separator>` — the host element receives them.         |
| `data-*`         | No         | Apply directly to `<aegov-separator>`.                                          |
| `class`, `style` | Allowed    | Applied to the host element. Use `extra-class` to add classes to the inner element. |
| `id`             | Allowed    | Applied to the host element.                                                    |

---

## Accessibility

### Built-in behaviour

- Defaults to `role="presentation"` so decorative dividers do not generate noise for screen readers.
- When `is-decorative="false"`, exposes `role="separator"` so assistive technology announces it as a structural divider.
- Sets `aria-orientation` to match the `orientation` property.
- Without a label, renders the native semantic `<hr>` element. With a label, renders a `<div>` with the appropriate role and aria attributes.

### Developer responsibilities

- Use the default decorative mode for purely visual breaks. Switch to `is-decorative="false"` only when the separator carries meaning for assistive technology — for example, separating two distinct content groups in a list of items.
- Vertical separators need a height context. Place them inside a parent with a defined height (e.g. a flex row with `h-6`) or set a height directly via `extra-class`.
- Keep label text short. Long labels in a text-bearing separator can wrap awkwardly on narrow viewports.
