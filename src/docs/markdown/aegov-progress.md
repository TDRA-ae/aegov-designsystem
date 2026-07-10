# Progress

<p class="text-lg text-aeblack-500 mb-8">A progress bar communicates the completion state of a task — uploading documents, processing a payment, completing a multi-step form. The <code>aegov-progress</code> component supports a determinate value, an indeterminate (loading) state, an optional numeric counter, and a description line. It always renders a hidden native <code>&lt;progress&gt;</code> element so assistive technology announces progress correctly.</p>

## Introduction

Use `aegov-progress` whenever a task takes long enough that users would otherwise be uncertain whether the system is responding. Set `value` for determinate progress (a known percentage); omit `value` for indeterminate progress (e.g. waiting on a server response of unknown duration). Use the `counter` and `counter-suffix` properties to show a textual percentage, and the `description` property to add a status line beneath the bar.

```html
<aegov-progress value="40"></aegov-progress>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-progress value="40"></aegov-progress>
</div>

---

## Determinate Value

Set `value` to a number between `0` and `max` (defaults to `100`) for a determinate bar. The fill width is calculated from `value / max`.

```html
<aegov-progress value="25"></aegov-progress>
<aegov-progress value="60"></aegov-progress>
<aegov-progress value="90"></aegov-progress>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-col gap-4">
    <aegov-progress value="25"></aegov-progress>
    <aegov-progress value="60"></aegov-progress>
    <aegov-progress value="90"></aegov-progress>
  </div>
</div>

### Custom max

Use `max` when reporting progress over a total other than 100 — for example, "3 of 10 documents uploaded".

```html
<aegov-progress value="3" max="10"></aegov-progress>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-progress value="3" max="10"></aegov-progress>
</div>

---

## Indeterminate (loading)

Omit the `value` property to render an indeterminate animated state. Use this while waiting for a background operation whose duration is unknown.

```html
<aegov-progress></aegov-progress>
<aegov-progress description="Submitting your application..."></aegov-progress>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-col gap-6">
    <aegov-progress></aegov-progress>
    <aegov-progress description="Submitting your application..."></aegov-progress>
  </div>
</div>

---

## Counter

The `counter` property places a numeric readout next to the bar. Two positions are available: `trailing` (after the bar on the same row) and `top` (above the bar). The counter is always hidden in the indeterminate state.

### Trailing counter

```html
<aegov-progress value="75" counter="trailing" counter-suffix="%"></aegov-progress>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-progress value="75" counter="trailing" counter-suffix="%"></aegov-progress>
</div>

### Top counter

```html
<aegov-progress value="3" max="10" counter="top" counter-suffix="/10"></aegov-progress>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-progress value="3" max="10" counter="top" counter-suffix="/10"></aegov-progress>
</div>

### Counter suffix

`counter-suffix` is appended directly to the value with no spacing. Use it to add a percent sign, a fraction denominator, or a unit. Include any leading space in the suffix yourself.

```html
<aegov-progress value="50" counter="trailing" counter-suffix="%"></aegov-progress>
<!-- renders: 50% -->

<aegov-progress value="3" max="10" counter="trailing" counter-suffix="/10"></aegov-progress>
<!-- renders: 3/10 -->

<aegov-progress value="120" max="500" counter="trailing" counter-suffix=" MB"></aegov-progress>
<!-- renders: 120 MB -->
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-col gap-4">
    <aegov-progress value="50" counter="trailing" counter-suffix="%"></aegov-progress>
    <aegov-progress value="3" max="10" counter="trailing" counter-suffix="/10"></aegov-progress>
    <aegov-progress value="120" max="500" counter="trailing" counter-suffix=" MB"></aegov-progress>
  </div>
</div>

---

## Description

The `description` property renders a `<p>` line beneath the bar. Use it for short status text such as the current step or the file currently being uploaded.

```html
<aegov-progress
  value="40"
  counter="trailing"
  counter-suffix="%"
  description="Uploading 2 of 5 files">
</aegov-progress>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-progress
    value="40"
    counter="trailing"
    counter-suffix="%"
    description="Uploading 2 of 5 files">
  </aegov-progress>
</div>

---

## Track Height

The `height` property controls the thickness of the bar using the Tailwind spacing scale (each unit = `0.25rem`). Default is `"2"` (`0.5rem` / 8 px). Reach for a thinner bar (`1` or `1.5`) for inline usage and a thicker bar (`3` or `4`) when the progress bar is the focal element on the screen.

```html
<aegov-progress value="50" height="1"></aegov-progress>     <!-- 4px -->
<aegov-progress value="50" height="1.5"></aegov-progress>   <!-- 6px -->
<aegov-progress value="50" height="2"></aegov-progress>     <!-- 8px (default) -->
<aegov-progress value="50" height="3"></aegov-progress>     <!-- 12px -->
<aegov-progress value="50" height="4"></aegov-progress>     <!-- 16px -->
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-col gap-4">
    <aegov-progress value="50" height="1"></aegov-progress>
    <aegov-progress value="50" height="1.5"></aegov-progress>
    <aegov-progress value="50" height="2"></aegov-progress>
    <aegov-progress value="50" height="3"></aegov-progress>
    <aegov-progress value="50" height="4"></aegov-progress>
  </div>
</div>

---

## Inside an aegov-form-field

Wrap the progress bar in `aegov-form-field` to associate it with an `aegov-label`. The label is announced to screen readers along with the progress value.

```html
<aegov-form-field>
  <aegov-label>Profile completeness</aegov-label>
  <aegov-progress value="80" counter="trailing" counter-suffix="%"></aegov-progress>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label>Profile completeness</aegov-label>
    <aegov-progress value="80" counter="trailing" counter-suffix="%"></aegov-progress>
  </aegov-form-field>
</div>

---

## Combined Example

A typical document-upload status: a determinate bar with a top counter, a description line, and a thicker track for visibility.

```html
<aegov-progress
  value="6"
  max="8"
  height="3"
  counter="top"
  counter-suffix="/8"
  description="Uploading supporting documents — please keep this tab open.">
</aegov-progress>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-progress
    value="6"
    max="8"
    height="3"
    counter="top"
    counter-suffix="/8"
    description="Uploading supporting documents — please keep this tab open.">
  </aegov-progress>
</div>

---

## RTL Support

The progress fill animates from the start edge of the track, so it grows right-to-left in RTL contexts automatically. The `top` counter follows the document's text direction. The `trailing` counter sits at the end edge of the row using logical spacing, so it naturally flips in RTL.

```html
<div dir="rtl">
  <aegov-progress
    value="6"
    max="8"
    height="3"
    counter="top"
    counter-suffix="/٨"
    description="جارٍ تحميل المستندات الداعمة — يرجى إبقاء هذه الصفحة مفتوحة.">
  </aegov-progress>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-progress
    value="6"
    max="8"
    height="3"
    counter="top"
    counter-suffix="/٨"
    description="جارٍ تحميل المستندات الداعمة — يرجى إبقاء هذه الصفحة مفتوحة.">
  </aegov-progress>
</div>

A trailing counter and a determinate bar in RTL:

```html
<div dir="rtl">
  <aegov-form-field>
    <aegov-label>اكتمال الملف الشخصي</aegov-label>
    <aegov-progress value="80" counter="trailing" counter-suffix="٪"></aegov-progress>
  </aegov-form-field>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label>اكتمال الملف الشخصي</aegov-label>
    <aegov-progress value="80" counter="trailing" counter-suffix="٪"></aegov-progress>
  </aegov-form-field>
</div>

An indeterminate bar in RTL:

```html
<div dir="rtl">
  <aegov-progress description="جارٍ تقديم طلبك، يرجى الانتظار..."></aegov-progress>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-progress description="جارٍ تقديم طلبك، يرجى الانتظار..."></aegov-progress>
</div>

---

## API Reference

### Properties

| Property        | Attribute        | Description                                                                                | Type                    | Default     |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------ | ----------------------- | ----------- |
| `fieldId`       | `field-id`       | DOM `id` for the hidden native `<progress>` element. Auto-generated if omitted.            | `string`                | _generated_ |
| `value`         | `value`          | Current progress value. Omit for indeterminate state.                                       | `number`                | `undefined` |
| `max`           | `max`            | Maximum value used to compute the fill percentage.                                          | `number`                | `100`       |
| `height`        | `height`         | Track thickness on the Tailwind spacing scale (each unit = `0.25rem`).                      | `string`                | `'2'`       |
| `counter`       | `counter`        | Counter placement. Hidden when not set, and always hidden in the indeterminate state.       | `'trailing' \| 'top'`   | `undefined` |
| `counterSuffix` | `counter-suffix` | Suffix appended directly to the counter value (no automatic spacing).                       | `string`                | `''`        |
| `description`   | `description`    | Description text rendered as a paragraph below the bar.                                     | `string`                | `undefined` |
| `extraClass`    | `extra-class`    | Additional CSS classes applied to the wrapper element.                                      | `string`                | `undefined` |

### Slots

`aegov-progress` does not expose any slots — the counter, suffix, and description are configured via properties.

### Events

`aegov-progress` does not emit any custom events. To react to progress changes, observe the underlying source of progress in your application code (e.g. a fetch / upload listener) and update the `value` prop accordingly.

### Pass-through Attributes

`aria-*` and `data-*` attributes set on the host are forwarded onto the hidden native `<progress>` element. The following additional attributes are also forwarded when set on the host:

| Attribute  | Forwarded to               | Notes                                          |
| ---------- | -------------------------- | ---------------------------------------------- |
| `aria-*`   | Hidden native `<progress>` | Use to add `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-valuetext`, etc. |
| `data-*`   | Hidden native `<progress>` | Custom data attributes for analytics or state tracking. |
| `tabindex` | Hidden native `<progress>` | Custom tab order for the progress element.     |
| `title`    | Hidden native `<progress>` | Native browser tooltip text.                   |
| `form`     | Hidden native `<progress>` | Associate with a form by its `id`.             |
| `class`, `style` | Host element        | Applied to the wrapper, alongside `extra-class`. |

---

## Accessibility

### Built-in behaviour

- A hidden native `<progress>` element with the same `value` / `max` is always rendered, providing semantic progress reporting to assistive technologies.
- The visual track is marked `aria-hidden="true"` so screen readers don't announce the duplicate visual.
- When `value` is omitted, the native `<progress>` is rendered without a `value` attribute, putting it into the indeterminate state.
- When the `description` prop is set, the description `<p>` receives an auto-generated `id` and is linked to the native `<progress>` via `aria-describedby`. Assistive technology announces the description when the user navigates to the progress bar.
- The hidden `<progress>` accepts pass-through `aria-*` attributes, so you can add `aria-label`, `aria-labelledby`, or `aria-describedby` directly on the host. A developer-supplied `aria-describedby` is composed with the internal description ID — both are announced.

### Developer responsibilities

- Provide a label for the progress bar via `aegov-label` (inside `aegov-form-field`), `aria-label`, or `aria-labelledby` so screen-reader users know what the progress represents.
- For long-running indeterminate operations, switch to a determinate value as soon as one is known so users can estimate completion.
- Use the `description` prop or a sibling element with `aria-live="polite"` to announce state changes (e.g. "Upload complete").
- The visible counter is decorative — for assistive-technology-only text, set `aria-valuetext` via pass-through (e.g. `aria-valuetext="6 of 8 documents uploaded"`).

### Notes

- `counter-suffix` is appended without spacing; include any leading space or unit yourself (e.g. `" MB"`).
- `height` accepts a Tailwind spacing-scale string (`"1"`, `"1.5"`, `"2"`, `"3"`, etc.); non-numeric values fall back to the default `0.5rem`.
- The component does not provide colour variants (e.g. success / error). Communicate status changes via the `description` text or a sibling `aegov-callout` rather than colouring the bar itself.
