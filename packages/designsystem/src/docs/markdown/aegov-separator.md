# Separator

<p class="text-lg text-aeblack-500 mb-8">A Separator draws a dividing line between sections of content, optionally with a label in the middle. It defaults to being decorative — invisible to assistive technology — because most dividing lines are visual rhythm rather than structure.</p>

## Introduction

```html
<aegov-text>First section.</aegov-text>
<aegov-separator></aegov-separator>
<aegov-text>Second section.</aegov-text>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-text>Renew your Emirates ID up to six months before it expires.</aegov-text>
    <aegov-separator></aegov-separator>
    <aegov-text>The service fee is AED 270, payable at the end of the application.</aegov-text>
  </div>
</div>

---

## Orientation

```html
<aegov-separator orientation="horizontal"></aegov-separator>
<aegov-separator orientation="vertical"></aegov-separator>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-6">
    <div>
      <p class="text-sm text-aeblack-500 mb-2">horizontal (default)</p>
      <aegov-separator></aegov-separator>
    </div>
    <div>
      <p class="text-sm text-aeblack-500 mb-2">vertical — needs a height from its container</p>
      <div class="flex items-center gap-4 h-12">
        <aegov-text size="sm">Print</aegov-text>
        <aegov-separator orientation="vertical"></aegov-separator>
        <aegov-text size="sm">Download</aegov-text>
        <aegov-separator orientation="vertical"></aegov-separator>
        <aegov-text size="sm">Share</aegov-text>
      </div>
    </div>
  </div>
</div>

A vertical separator has no intrinsic height — it takes its height from a flex or grid parent. Inside a row of toolbar controls it works naturally; on its own in a block container it will be invisible.

---

## Appearance and variant

`appearance` chooses the line weight and `variant` chooses its colour family.

```html
<aegov-separator appearance="solid"></aegov-separator>
<aegov-separator appearance="light"></aegov-separator>

<aegov-separator variant="primary"></aegov-separator>
<aegov-separator variant="neutral-min"></aegov-separator>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-5 max-w-md">
    <div><p class="text-sm text-aeblack-500 mb-2">solid · primary</p><aegov-separator appearance="solid" variant="primary"></aegov-separator></div>
    <div><p class="text-sm text-aeblack-500 mb-2">light · primary</p><aegov-separator appearance="light" variant="primary"></aegov-separator></div>
    <div><p class="text-sm text-aeblack-500 mb-2">solid · secondary</p><aegov-separator appearance="solid" variant="secondary"></aegov-separator></div>
    <div><p class="text-sm text-aeblack-500 mb-2">light · neutral-min</p><aegov-separator appearance="light" variant="neutral-min"></aegov-separator></div>
    <div><p class="text-sm text-aeblack-500 mb-2">solid · neutral-max</p><aegov-separator appearance="solid" variant="neutral-max"></aegov-separator></div>
  </div>
</div>

`light` with `neutral-min` is the quietest and the right default inside dense content such as a list or a card. Save a `primary` solid line for a deliberate section break.

---

## Gap

`gap` adds spacing above and below — or either side, when vertical — as a number.

```html
<aegov-separator gap="0"></aegov-separator>
<aegov-separator gap="4"></aegov-separator>
<aegov-separator gap="8"></aegov-separator>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-text size="sm">Above</aegov-text>
    <aegov-separator gap="0"></aegov-separator>
    <aegov-text size="sm">gap="0" — no spacing</aegov-text>
    <aegov-separator gap="4"></aegov-separator>
    <aegov-text size="sm">gap="4"</aegov-text>
    <aegov-separator gap="8"></aegov-separator>
    <aegov-text size="sm">gap="8"</aegov-text>
  </div>
</div>

Using `gap` keeps the spacing with the separator, rather than scattering margins across the elements around it.

---

## Labelled separators

`text` puts a label in the middle of the line. The default slot does the same thing with markup.

```html
<aegov-separator text="or"></aegov-separator>

<aegov-separator>
  <span class="text-sm text-aeblack-500">Continue with</span>
</aegov-separator>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-8">
    <aegov-separator text="or"></aegov-separator>
    <aegov-separator text="Continue with another method" appearance="light" variant="neutral-min"></aegov-separator>
    <aegov-separator><span class="text-sm text-aeblack-500">14 March 2026</span></aegov-separator>
  </div>
</div>

The classic use is between two alternative routes — a sign-in form and a UAE Pass button, for instance:

```html
<aegov-button is-full variant="primary">Sign in with UAE Pass</aegov-button>

<aegov-separator text="or" gap="6"></aegov-separator>

<aegov-form-field>
  <aegov-label>Email address</aegov-label>
  <aegov-input type="email" name="email"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-sm">
    <aegov-button is-full variant="primary">Sign in with UAE Pass</aegov-button>
    <aegov-separator text="or" gap="6" appearance="light" variant="neutral-min"></aegov-separator>
    <aegov-form-field>
      <aegov-label>Email address</aegov-label>
      <aegov-input field-id="sep-email" type="email" name="email"></aegov-input>
    </aegov-form-field>
  </div>
</div>

---

## Decorative or semantic

This is the property that matters most, and the default is deliberate.

| `isDecorative` | Renders | Announced |
| --- | --- | --- |
| `true` (default) | `role="presentation"` | No — invisible to assistive technology. |
| `false` | `role="separator"` with `aria-orientation` | Yes — as a real thematic break. |

```html
<!-- Visual rhythm only — the default -->
<aegov-separator></aegov-separator>

<!-- A genuine change of topic -->
<aegov-separator is-decorative="false"></aegov-separator>
```

Most separators are decorative. A line between two rows of a list, or between a card's body and its actions, is spacing — announcing it adds noise for a screen reader user without adding information.

Set `is-decorative="false"` only where the line marks a real change of subject that a sighted reader would take meaning from — the boundary between two unrelated sections of a long page, for instance. This is the same distinction as a decorative `<img alt="">` versus a described one.

Note that `aria-orientation` is only emitted for `role="separator"`; it is deliberately omitted on `role="presentation"`, where it would be invalid.

---

## In lists and cards

Inside a repeated list, prefer a CSS divider such as `divide-y` over one separator per row — it is less markup and does not add elements to the accessibility tree at all.

```html
<!-- Preferred for repeated rows -->
<ul class="divide-y divide-aeblack-100">
  <li class="py-3">…</li>
  <li class="py-3">…</li>
</ul>

<!-- Separator suits a one-off division -->
<aegov-card>
  <p>Body content</p>
  <aegov-separator gap="4" appearance="light" variant="neutral-min"></aegov-separator>
  <aegov-button size="sm">Action</aegov-button>
</aegov-card>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-card field-id="sep-card" appearance="light" variant="neutral-min">
      <aegov-title size="text-h6" heading-type="h3" extra-class="mb-1">Emirates ID renewal</aegov-title>
      <aegov-text size="sm">Submitted 14 March 2026 · Under review</aegov-text>
      <aegov-separator gap="4" appearance="light" variant="neutral-min"></aegov-separator>
      <div class="flex gap-2">
        <aegov-button size="sm" variant="primary">View</aegov-button>
        <aegov-button size="sm" appearance="outline">Withdraw</aegov-button>
      </div>
    </aegov-card>
  </div>
</div>

Separators are also used inside [`aegov-dropdown`](aegov-dropdown.html) menus to group commands — the portal styles them specifically for that.

---

## RTL Support

The separator is direction-aware. A horizontal line is symmetrical and unaffected. A labelled separator centres its text, so it needs no mirroring either — but the label itself is content and should be translated. A vertical separator's `gap` uses logical inline spacing, so it mirrors correctly.

```html
<div dir="rtl">
  <aegov-button is-full variant="primary">تسجيل الدخول بالهوية الرقمية</aegov-button>
  <aegov-separator text="أو" gap="6"></aegov-separator>
  <aegov-form-field>
    <aegov-label>البريد الإلكتروني</aegov-label>
    <aegov-input type="email" name="email"></aegov-input>
  </aegov-form-field>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-sm">
    <aegov-button is-full variant="primary">تسجيل الدخول بالهوية الرقمية</aegov-button>
    <aegov-separator text="أو" gap="6" appearance="light" variant="neutral-min"></aegov-separator>
    <aegov-form-field>
      <aegov-label>البريد الإلكتروني</aegov-label>
      <aegov-input field-id="sep-rtl-email" type="email" name="email"></aegov-input>
    </aegov-form-field>
    <div class="flex items-center gap-4 h-12 mt-6">
      <aegov-text size="sm">طباعة</aegov-text>
      <aegov-separator orientation="vertical"></aegov-separator>
      <aegov-text size="sm">تحميل</aegov-text>
      <aegov-separator orientation="vertical"></aegov-separator>
      <aegov-text size="sm">مشاركة</aegov-text>
    </div>
  </div>
</div>

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `orientation` | `orientation` | Line direction. Vertical takes its height from the container. | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `appearance` | `appearance` | Line weight. | `'solid' \| 'light'` | `'solid'` |
| `variant` | `variant` | Colour family. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `text` | `text` | Label rendered in the middle of the line. The default slot takes precedence. | `string` | — |
| `gap` | `gap` | Spacing above and below, or either side when vertical. | `number` | `0` |
| `isDecorative` | `is-decorative` | `true` renders `role="presentation"`; `false` renders a semantic `role="separator"`. | `boolean` | `true` |
| `extraClass` | `extra-class` | Extra classes on the separator element. | `string` | — |

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | Optional label markup, rendered in the middle of the line. Takes precedence over `text`. |

### Events

None.

### Methods

None.

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the separator element. Note the component sets `role` and, when semantic, `aria-orientation`. |
| `data-*` | Yes | Forwarded. |
| `class`, `style` | Allowed | Applied to the host. Use `extra-class` for the separator element. |

### Rendered element

With no label, the component renders an `<hr>`. With a label, it renders a `<div>` containing the line segments and the text. Both carry the role determined by `isDecorative`.

---

## Accessibility

### Built-in behaviour

- **Decorative by default.** `role="presentation"` keeps the line out of the accessibility tree, which is correct for the large majority of dividers — they are visual rhythm, not structure.
- With `is-decorative="false"` the element becomes `role="separator"` and gains `aria-orientation`, so it is announced as a genuine thematic break.
- `aria-orientation` is omitted on `role="presentation"`, where it would be invalid — a detail that is easy to get wrong by hand.
- With no label the rendered element is a real `<hr>`, so the semantics come from the platform.
- Spacing uses logical properties, so a vertical separator's gap mirrors under `dir="rtl"`.

### Developer responsibilities

- **Leave `isDecorative` alone unless the line means something.** A page full of announced separators is noisy; save the semantic form for real topic changes.
- **Do not use a separator to convey grouping on its own** (WCAG 2.2 SC 1.4.1). If two sets of controls are different in kind, give them headings or labelled groups — a line between them is a visual hint, not a programmatic one.
- **Give a vertical separator a sized container.** Without a height from a flex or grid parent it renders as nothing.
- **Translate label text.**
- **Prefer `divide-y` for repeated rows.** One separator per row is more markup and more elements for no benefit.
- **Keep contrast in mind.** A separator is a non-text element; where it carries meaning it should meet the 3:1 non-text contrast requirement of WCAG 2.2 SC 1.4.11. `appearance="light"` on a tinted background can fall below that — check before using it as a meaningful boundary.
- **Do not use a separator as a heading substitute.** A line plus bold text is not a heading; use [Title](aegov-title.html) with `headingType`.

---

## Where to next

- [Card](aegov-card.html) — where separators commonly divide body from actions.
- [Dropdown](aegov-dropdown.html) — separators between groups of menu commands.
- [Title](aegov-title.html) — for real section headings.
- [Text](aegov-text.html) — paragraph spacing, which often removes the need for a separator.
