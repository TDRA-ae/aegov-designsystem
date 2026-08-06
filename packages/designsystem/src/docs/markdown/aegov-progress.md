# Progress

<p class="text-lg text-aeblack-500 mb-8">A Progress bar reports how far along a task is. Use it for anything with a measurable completion — an upload, a multi-step application, a document being processed — and use its indeterminate mode when work is happening but its duration is unknown. Progress is read-only: it displays a value the user cannot change.</p>

## Introduction

`aegov-progress` renders a real `<progress>` element for semantics, plus a styled track and fill for appearance. The native element carries the value, so assistive technology reads real progress rather than a decorative bar.

```html
<aegov-progress value="60" label="Application completeness"></aegov-progress>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-progress field-id="pg-intro" value="60" label="Application completeness"></aegov-progress>
  </div>
</div>

Note this is `<progress>`, not a slider — for a value the user *sets*, use [Range](aegov-range.html). The component was renamed from an earlier `aegov-progress` that showed step sequences; that pattern is now [Timeline](aegov-timeline.html).

---

## Value and max

`value` is the current amount and `max` is the total. Percentages are the common case, so `max` defaults to `100`.

```html
<aegov-progress value="25" label="25 per cent"></aegov-progress>
<aegov-progress value="60" label="60 per cent"></aegov-progress>
<aegov-progress value="100" label="Complete"></aegov-progress>

<!-- Counting real units instead of percentages -->
<aegov-progress value="3" max="7" label="Step 3 of 7"></aegov-progress>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <aegov-progress field-id="pg-v-1" value="25" label="25 per cent"></aegov-progress>
    <aegov-progress field-id="pg-v-2" value="60" label="60 per cent"></aegov-progress>
    <aegov-progress field-id="pg-v-3" value="100" label="Complete"></aegov-progress>
    <aegov-progress field-id="pg-v-4" value="3" max="7" label="Step 3 of 7"></aegov-progress>
  </div>
</div>

Using real units — `value="3" max="7"` — is better than pre-computing a percentage. The native element then reports the true numbers to assistive technology.

---

## Indeterminate

**Omit `value`** and the bar becomes indeterminate: a striped, pulsing track that says work is happening without claiming to know how much is left.

```html
<aegov-progress label="Processing your application"></aegov-progress>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <aegov-progress field-id="pg-ind-1" label="Processing your application"></aegov-progress>
    <aegov-progress field-id="pg-ind-2" label="Verifying documents" height="3"></aegov-progress>
  </div>
</div>

Setting `value` to `0` is **not** the same thing — that is a determinate bar showing no progress. To go from indeterminate to determinate, assign a number; to go back, set it to `undefined`.

```js
const bar = document.querySelector('aegov-progress');

bar.value = undefined;   // indeterminate
bar.value = 0;           // determinate, nothing done yet
bar.value = 45;          // determinate, 45%
```

The counter is hidden while indeterminate, because there is no number to show.

---

## Counter

`counter` shows the current value as text. Two positions:

| Value | Position |
| --- | --- |
| `top` | Above the track, right-aligned. |
| `trailing` | On the same row, after the track. |

`counterSuffix` is appended verbatim — including any space you want, since none is added for you.

```html
<aegov-progress value="60" counter="top" counter-suffix="%" label="Upload"></aegov-progress>
<aegov-progress value="60" counter="trailing" counter-suffix="%" label="Upload"></aegov-progress>
<aegov-progress value="3" max="7" counter="trailing" counter-suffix=" of 7" label="Steps"></aegov-progress>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-6">
    <aegov-progress field-id="pg-c-1" value="60" counter="top" counter-suffix="%" label="Upload progress"></aegov-progress>
    <aegov-progress field-id="pg-c-2" value="60" counter="trailing" counter-suffix="%" label="Upload progress"></aegov-progress>
    <aegov-progress field-id="pg-c-3" value="3" max="7" counter="trailing" counter-suffix=" of 7" label="Application steps"></aegov-progress>
    <aegov-progress field-id="pg-c-4" value="4194304" max="5242880" counter="top" counter-suffix=" bytes" label="Bytes uploaded"></aegov-progress>
  </div>
</div>

Note the last example: the counter prints the raw `value`, so it shows bytes rather than "4 MB". Format the number yourself and drive a text element beside the bar if you need friendly units.

When `counterSuffix` is set, it is also used as the native element's `aria-valuetext`, so a screen reader announces "60%" rather than a bare "60".

---

## Height

`height` takes a Tailwind spacing token, as a string. Default is `'2'` — `0.5rem`.

```html
<aegov-progress value="60" height="1"></aegov-progress>
<aegov-progress value="60" height="2"></aegov-progress>
<aegov-progress value="60" height="4"></aegov-progress>
<aegov-progress value="60" height="6"></aegov-progress>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <aegov-progress field-id="pg-h-1" value="60" height="1"></aegov-progress>
    <aegov-progress field-id="pg-h-2" value="60" height="2"></aegov-progress>
    <aegov-progress field-id="pg-h-3" value="60" height="4"></aegov-progress>
    <aegov-progress field-id="pg-h-4" value="60" height="6"></aegov-progress>
  </div>
</div>

Thin bars suit inline positions such as a card footer; thicker bars suit a page-level indicator that should be noticed.

---

## Description

`description` renders text below the bar and links it through `aria-describedby`.

```html
<aegov-progress
  value="60"
  counter="top"
  counter-suffix="%"
  label="Upload progress"
  description="Uploading 3 of 5 supporting documents. Please keep this tab open."
></aegov-progress>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-progress field-id="pg-desc" value="60" counter="top" counter-suffix="%" label="Upload progress" description="Uploading 3 of 5 supporting documents. Please keep this tab open."></aegov-progress>
  </div>
</div>

Use it to say what is happening and what the user should do — a bar with no context is just movement.

---

## With a label component

`aegov-progress` works inside [`aegov-form-field`](aegov-form-field.html), which links an [`aegov-label`](aegov-label.html) to it. Use the wrapper when the bar sits among form fields and should match their label styling; use the `label` property when it stands alone.

```html
<aegov-form-field>
  <aegov-label>Application completeness</aegov-label>
  <aegov-progress value="60" counter="trailing" counter-suffix="%"></aegov-progress>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-form-field>
      <aegov-label>Application completeness</aegov-label>
      <aegov-progress field-id="pg-ff" value="60" counter="trailing" counter-suffix="%"></aegov-progress>
    </aegov-form-field>
  </div>
</div>

Do not set both — the field would be announced twice.

---

## Updating from JavaScript

There are no events and no methods: assign to the properties.

```html
<aegov-progress id="upload" label="Upload progress" counter="top" counter-suffix="%"></aegov-progress>

<script type="module">
  const bar = document.querySelector('#upload');

  async function upload(file) {
    bar.value = undefined;                        // indeterminate while connecting
    bar.description = 'Connecting…';

    const res = await startUpload(file, (sent, total) => {
      bar.value = Math.round((sent / total) * 100);
      bar.description = `Uploading ${file.name}`;
    });

    bar.value = 100;
    bar.description = 'Upload complete';
    return res;
  }
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-6">
    <aegov-progress field-id="pg-js-1" label="Connecting" description="Connecting…"></aegov-progress>
    <aegov-progress field-id="pg-js-2" value="45" counter="top" counter-suffix="%" label="Upload progress" description="Uploading passport-scan.pdf"></aegov-progress>
    <aegov-progress field-id="pg-js-3" value="100" counter="top" counter-suffix="%" label="Upload progress" description="Upload complete"></aegov-progress>
  </div>
</div>

---

## Composite example — multi-step application

```html
<div class="rounded-lg border border-aeblack-100 p-5">
  <div class="flex items-baseline justify-between mb-3">
    <p class="font-semibold">Residency visa renewal</p>
    <p class="text-sm text-aeblack-500">Step 3 of 7</p>
  </div>

  <aegov-progress
    value="3"
    max="7"
    height="3"
    label="Application progress"
    description="Next: upload your supporting documents"
  ></aegov-progress>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md rounded-lg border border-aeblack-100 bg-whitely-50 p-5">
    <div class="flex items-baseline justify-between mb-3">
      <p class="font-semibold">Residency visa renewal</p>
      <p class="text-sm text-aeblack-500">Step 3 of 7</p>
    </div>
    <aegov-progress field-id="pg-cx" value="3" max="7" height="3" label="Application progress" description="Next: upload your supporting documents"></aegov-progress>
  </div>
</div>

For a step sequence where each stage needs its own label and status, use [Timeline](aegov-timeline.html) instead — it names the steps rather than reducing them to a fraction.

---

## RTL Support

The bar is direction-aware. In a `dir="rtl"` container the fill grows from the right, the counter and description align with the text direction, and the top counter moves to the opposite end. The indeterminate animation runs in the mirrored direction.

```html
<div dir="rtl">
  <aegov-progress
    value="60"
    counter="top"
    counter-suffix="٪"
    label="نسبة إكمال الطلب"
    description="التالي: إرفاق المستندات المؤيدة"
  ></aegov-progress>

  <aegov-progress label="جارٍ معالجة طلبك"></aegov-progress>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-6">
    <aegov-progress field-id="pg-rtl-1" value="60" counter="top" counter-suffix="٪" label="نسبة إكمال الطلب" description="التالي: إرفاق المستندات المؤيدة"></aegov-progress>
    <aegov-progress field-id="pg-rtl-2" value="3" max="7" counter="trailing" counter-suffix=" من ٧" label="خطوات الطلب"></aegov-progress>
    <aegov-progress field-id="pg-rtl-3" label="جارٍ معالجة طلبك"></aegov-progress>
  </div>
</div>

Numerals are yours to control. The counter prints `value` as-is, in Western digits — so on Arabic pages that use Arabic-Indic numerals, render your own formatted number beside the bar rather than relying on the built-in counter. Note the `counter-suffix` **can** carry an Arabic percent sign or unit, as above.

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the native `<progress>`. Auto-generated when omitted, reflected. | `string` | _generated_ |
| `value` | `value` | Current amount. **Omit for indeterminate.** | `number` | — |
| `max` | `max` | Total amount. | `number` | `100` |
| `height` | `height` | Track height as a Tailwind spacing token, passed as a string. | `string` | `'2'` |
| `counter` | `counter` | Where to show the value as text. Hidden while indeterminate. | `'top' \| 'trailing'` | — |
| `counterSuffix` | `counter-suffix` | Appended to the counter verbatim — include your own leading space if you want one. Also used as `aria-valuetext`. | `string` | `''` |
| `label` | `label` | Accessible name for the bar, applied as `aria-label` on the native element. | `string` | — |
| `description` | `description` | Text below the bar, linked via `aria-describedby`. | `string` | — |
| `extraClass` | `extra-class` | Extra classes on the wrapper. | `string` | — |

### Slots

None. All content is supplied through properties.

### Events

None. Update the properties directly.

### Methods

None.

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `tabindex`, `title`, `form` | Yes | Forwarded to the native `<progress>`. |
| `aria-*` | Yes | Forwarded to the native `<progress>`. |
| `data-*` | Yes | Forwarded to the native `<progress>`. |
| `aria-describedby` | Composed | Your value is preserved and the description region's ID is appended. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host. Use `extra-class` for the wrapper. |

### CSS classes

| Class | Element |
| --- | --- |
| `.aegov-progress` | The wrapper. |
| `.progress__track` | The visual track. Marked `aria-hidden`. |
| `.progress__track--indeterminate` | Added while indeterminate; carries the striped pulse animation. |
| `.progress__fill` | The filled portion. Transitions width over 300ms. |
| `.progress__row`, `.progress__row--trailing` | The track row, and its trailing-counter variant. |
| `.progress__top-row` | The row holding a `top` counter. |
| `.progress__counter--top`, `.progress__counter--trailing` | Counter position modifiers. |
| `.progress__description` | The description paragraph. |
| `.progress__native` | The native `<progress>`, visually hidden but present for semantics. |

---

## Accessibility

### Built-in behaviour

- A real `<progress>` element carries the value, so the progressbar role and the current, minimum and maximum values are exposed natively rather than through hand-written ARIA.
- The visual track and fill are marked `aria-hidden="true"` — they are decoration over the real element, and would otherwise be announced twice.
- `label` becomes the native element's `aria-label`, giving the bar an accessible name.
- `counterSuffix` becomes `aria-valuetext`, so a screen reader announces "60%" rather than "60".
- `description` is linked through `aria-describedby`, composed so that any value you supply yourself is preserved.
- Omitting `value` produces a genuinely indeterminate native element, which assistive technology reports as busy rather than as zero progress.
- The fill transitions smoothly rather than jumping, and the indeterminate animation is CSS-driven.

### Developer responsibilities

- **Always set `label`**, or wrap the bar in an [`aegov-form-field`](aegov-form-field.html) with an [`aegov-label`](aegov-label.html). An unnamed progress bar tells a screen reader user that something is at 60% without saying what.
- **Do not announce every update.** The native element reports the value on demand; wrapping the bar in an `aria-live` region would announce every percentage point and flood the user. If you need spoken progress, put a `aria-live="polite"` region beside the bar and update it at coarse milestones — 25%, 50%, 75% — not continuously.
- **Say what happens next** in `description`, especially for long operations. "Please keep this tab open" prevents a genuine failure.
- **Use real units** — `value` and `max` — rather than pre-computing a percentage.
- **Format numbers yourself** where the raw `value` is not human-friendly, such as bytes, or where Arabic-Indic numerals are expected.
- **Do not use progress for an unknown-length wait with no feedback.** An indeterminate bar that never resolves is worse than a message explaining the delay.
- **Provide a failure path.** If the operation can fail, show a [Callout](aegov-callout.html) or [Toast](aegov-toast.html) — a bar that simply stops moving communicates nothing.
- **Do not use this for user input.** For a value the user sets, use [Range](aegov-range.html); for a step sequence, use [Timeline](aegov-timeline.html).

### Keyboard support

Progress is not interactive and is not a focus stop. Nothing to operate.

---

## Where to next

- [Timeline](aegov-timeline.html) — for a named sequence of steps.
- [Range](aegov-range.html) — for a value the user sets.
- [File Upload](aegov-fileupload.html) — the most common source of real progress.
- [Toast](aegov-toast.html) and [Callout](aegov-callout.html) — for completion and failure messages.
