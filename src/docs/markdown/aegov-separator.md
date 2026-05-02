# Separator

<p class="text-lg text-aeblack-500 mb-8">A Separator is a thin visual divider used to break up sections of content, group related items, or signal a contextual boundary in an interface. Use it to separate form sections, divide list groups, mark a transition between two interaction paths, or insert an &ldquo;OR&rdquo;-style break between alternative actions. Separators support horizontal and vertical orientation, an optional inline label, and a subtle appearance for less visual weight.</p>

## Introduction

The `aegov-separator` component renders as a native `<hr>` when used without a label, or as a flex layout of line / text / line when a `text` value or slotted label is supplied. It exposes a small surface — `orientation`, `appearance`, `text`, and `is-decorative` — and uses logical CSS properties so it works identically in LTR and RTL contexts.

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

The `appearance` property tunes the visual weight. Use `default` (a slate-300 line) for clear section breaks, and `subtle` (slate-200) where the separator should recede behind the surrounding content.

```html
<aegov-separator appearance="default"></aegov-separator>
<aegov-separator appearance="subtle"></aegov-separator>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="text-sm text-aeblack-600 mb-2">Default</p>
  <aegov-separator appearance="default"></aegov-separator>
  <p class="text-sm text-aeblack-600 mt-6 mb-2">Subtle</p>
  <aegov-separator appearance="subtle"></aegov-separator>
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
  <aegov-separator appearance="subtle" extra-class="my-6"></aegov-separator>
  <h3>Contact information</h3>
  <!-- inputs -->
</form>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <h3 class="text-lg font-semibold mb-2">Personal details</h3>
  <p class="text-sm text-aeblack-600">Emirates ID, full name, date of birth.</p>
  <aegov-separator appearance="subtle" extra-class="my-6"></aegov-separator>
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
  <aegov-separator appearance="subtle"></aegov-separator>
  <p>بيانات التواصل</p>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="mb-4">البيانات الشخصية</p>
  <aegov-separator appearance="subtle"></aegov-separator>
  <p class="mt-4">بيانات التواصل</p>
</div>

---

## API Reference

### Properties

| Property       | Attribute        | Description                                                                                  | Type                         | Default        |
| -------------- | ---------------- | -------------------------------------------------------------------------------------------- | ---------------------------- | -------------- |
| `orientation`  | `orientation`    | Direction of the separator.                                                                  | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `appearance`   | `appearance`     | Visual weight.                                                                               | `'default' \| 'subtle'`      | `'default'`    |
| `text`         | `text`           | Inline label text rendered at the centre of the separator.                                   | `string`                     | `undefined`    |
| `isDecorative` | `is-decorative`  | When `true`, exposes `role="presentation"`. When `false`, exposes `role="separator"`.        | `boolean`                    | `true`         |
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
