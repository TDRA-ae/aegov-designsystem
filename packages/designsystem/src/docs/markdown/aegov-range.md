# Range

<p class="text-lg text-aeblack-500 mb-8">A Range is a slider for choosing a numeric value or a numeric span between a minimum and a maximum. It is well suited to inputs where the magnitude is more meaningful than the exact figure — residency duration, age filters, fee brackets — and works equally well with mouse, touch, and keyboard.</p>

## Introduction

The `aegov-range` component is built on a native `<input type="range">` for full keyboard, screen-reader, and form support, with an extra interactive track-and-thumb layer for richer styling and dual-thumb selection. It supports single or dual modes, horizontal and vertical orientation, four value-display styles, and five sizes.

```html
<aegov-range
  label="Search radius (km)"
  min="1"
  max="50"
  value="10"
  display="tooltip"
></aegov-range>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-range
    label="Search radius (km)"
    min="1"
    max="50"
    value="10"
    display="tooltip"
  ></aegov-range>
</div>

---

## Single vs. range mode

Use `mode="single"` (default) for one thumb and one value, or `mode="range"` for two thumbs that select a low/high pair. In range mode, set `value-low` and `value-high` instead of `value`.

### Single mode (default)

```html
<aegov-range
  label="Monthly income (AED, thousands)"
  min="0"
  max="100"
  value="25"
  display="tooltip"
></aegov-range>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-range
    label="Monthly income (AED, thousands)"
    min="0"
    max="100"
    value="25"
    display="tooltip"
  ></aegov-range>
</div>

### Dual-thumb range

```html
<aegov-range
  label="Age of dependants"
  mode="range"
  min="0"
  max="80"
  value-low="18"
  value-high="65"
  display="full"
></aegov-range>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-range
    label="Age of dependants"
    mode="range"
    min="0"
    max="80"
    value-low="18"
    value-high="65"
    display="full"
  ></aegov-range>
</div>

---

## Min, max, and step

`min` and `max` define the bounds; `step` controls the granularity. Use a non-integer step for currency or fractional values, and a larger step (10, 50, 100) when fine precision is unnecessary.

```html
<aegov-range label="Years of UAE residency" min="0" max="40" step="1" value="5" display="tooltip"></aegov-range>
<aegov-range label="Service fee (AED)" min="0" max="500" step="25" value="200" display="full"></aegov-range>
<aegov-range label="Acceptance threshold" min="0" max="1" step="0.05" value="0.75" display="thumb"></aegov-range>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-col gap-8">
  <aegov-range label="Years of UAE residency" min="0" max="40" step="1" value="5" display="tooltip"></aegov-range>
  <aegov-range label="Service fee (AED)" min="0" max="500" step="25" value="200" display="full"></aegov-range>
  <aegov-range label="Acceptance threshold" min="0" max="1" step="0.05" value="0.75" display="thumb"></aegov-range>
</div>

---

## Value display

The `display` property controls how the current value is shown alongside the slider.

| Token     | Behaviour                                                            |
| --------- | -------------------------------------------------------------------- |
| `none`    | No on-screen value (default). The label or surrounding UI explains.  |
| `tooltip` | A small bubble appears above the active thumb on focus or drag.      |
| `thumb`   | The value sits inside the thumb itself, always visible.              |
| `full`    | Min and max labels at each end of the track, plus the value in-thumb.|

```html
<aegov-range label="display = none" value="40"></aegov-range>
<aegov-range label="display = tooltip" value="40" display="tooltip"></aegov-range>
<aegov-range label="display = thumb" value="40" display="thumb"></aegov-range>
<aegov-range label="display = full" value="40" display="full"></aegov-range>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-col gap-8">
  <aegov-range label="display = none" value="40"></aegov-range>
  <aegov-range label="display = tooltip" value="40" display="tooltip"></aegov-range>
  <aegov-range label="display = thumb" value="40" display="thumb"></aegov-range>
  <aegov-range label="display = full" value="40" display="full"></aegov-range>
</div>

---

## Sizes

The `size` property controls the height of the track. Five tokens are available — `xs`, `sm`, `base` (default), `lg`, and `xl`. The thumb size remains constant so it stays comfortably tappable on touch devices.

```html
<aegov-range size="xs" value="50"></aegov-range>
<aegov-range size="sm" value="50"></aegov-range>
<aegov-range size="base" value="50"></aegov-range>
<aegov-range size="lg" value="50"></aegov-range>
<aegov-range size="xl" value="50"></aegov-range>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-col gap-6">
  <aegov-range size="xs" value="50"></aegov-range>
  <aegov-range size="sm" value="50"></aegov-range>
  <aegov-range size="base" value="50"></aegov-range>
  <aegov-range size="lg" value="50"></aegov-range>
  <aegov-range size="xl" value="50"></aegov-range>
</div>

### Responsive sizes

The `size` property accepts a Tailwind-style responsive string with the breakpoint prefixes `xs`, `sm`, `md`, `lg`, `xl`, and `2xl`. Each segment overrides smaller breakpoints.

```html
<aegov-range size="sm md:base xl:lg" label="Resizes with the viewport" value="50" display="tooltip"></aegov-range>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-range size="sm md:base xl:lg" label="Resizes with the viewport" value="50" display="tooltip"></aegov-range>
</div>

---

## Variant

The `variant` property selects the colour family for the active fill segment of the track. The off-track stays `aeblack-200` and the thumb stays `aeblack-800` regardless of variant — both are constants for a consistent grip across colour families. The focus ring stays `primary-support-600` (camel) and error states stay `aered-600`.

- `primary` — primary-* family (default)
- `secondary` — secondary-* family
- `neutral-max` — strong neutral (aeblack-800 family)
- `neutral-min` — quiet neutral (aeblack-100 family). Active fill stays `aeblack-800` so the filled portion is still legible.

### Colour matrix

| Variant       | Track (constant) | Active fill     | Thumb (constant) | Hover accent    |
| ------------- | ---------------- | --------------- | ---------------- | --------------- |
| `primary`     | `aeblack-200`    | `primary-600`   | `aeblack-800`    | `primary-700`   |
| `secondary`   | `aeblack-200`    | `secondary-600` | `aeblack-800`    | `secondary-700` |
| `neutral-max` | `aeblack-200`    | `aeblack-800`   | `aeblack-800`    | `aeblack-800`   |
| `neutral-min` | `aeblack-200`    | `aeblack-800`   | `aeblack-800`    | `aeblack-700`   |

```html
<aegov-range variant="primary" value="50"></aegov-range>
<aegov-range variant="secondary" value="50"></aegov-range>
<aegov-range variant="neutral-max" value="50"></aegov-range>
<aegov-range variant="neutral-min" value="50"></aegov-range>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-col gap-6">
  <aegov-range variant="primary" label="Primary" value="50" display="tooltip"></aegov-range>
  <aegov-range variant="secondary" label="Secondary" value="50" display="tooltip"></aegov-range>
  <aegov-range variant="neutral-max" label="Neutral-max" value="50" display="tooltip"></aegov-range>
  <aegov-range variant="neutral-min" label="Neutral-min" value="50" display="tooltip"></aegov-range>
</div>

---

## Orientation

Set `orientation="vertical"` for a vertical slider. Vertical sliders are most appropriate for graphical equalisers, density controls, and tall side panels. Provide a fixed height on the wrapper — the component fills its container.

```html
<aegov-range
  orientation="vertical"
  value="60"
  display="tooltip"
  style="height: 200px"
></aegov-range>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex gap-8 items-end">
  <aegov-range orientation="vertical" value="20" display="tooltip" style="height: 200px"></aegov-range>
  <aegov-range orientation="vertical" value="60" display="tooltip" style="height: 200px"></aegov-range>
  <aegov-range orientation="vertical" value="90" display="tooltip" style="height: 200px"></aegov-range>
</div>

---

## Disabled

Set `is-disabled="true"` to prevent interaction. The track and thumb appear muted and the underlying input receives the native `disabled` attribute, removing it from the tab order and form submission.

```html
<aegov-range label="Disabled" value="40" is-disabled="true" display="tooltip"></aegov-range>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-range label="Disabled" value="40" is-disabled="true" display="tooltip"></aegov-range>
</div>

---

## Form integration

Provide `name` to participate in standard form submission. In single mode the value is submitted directly. In range mode, two fields are submitted using the suffixes `-low` and `-high` (for example `salary-low` and `salary-high`).

```html
<form>
  <aegov-range
    label="Acceptable processing fee (AED)"
    name="processing_fee"
    min="0"
    max="500"
    step="10"
    value="150"
    display="full"
  ></aegov-range>
</form>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-range
    label="Acceptable processing fee (AED)"
    name="processing_fee"
    min="0"
    max="500"
    step="10"
    value="150"
    display="full"
  ></aegov-range>
</div>

---

## Service-search example

A typical UAE Government scenario: a citizen filtering nearby service centres on the federal portal. A single-thumb radius slider plus a dual-thumb age band on the same panel is a common pairing.

```html
<aegov-range
  label="Service centres within (km)"
  min="1"
  max="50"
  value="10"
  display="tooltip"
></aegov-range>

<aegov-range
  label="Eligible age band"
  mode="range"
  min="0"
  max="80"
  value-low="21"
  value-high="60"
  display="full"
></aegov-range>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-col gap-10">
  <aegov-range
    label="Service centres within (km)"
    min="1"
    max="50"
    value="10"
    display="tooltip"
  ></aegov-range>
  <aegov-range
    label="Eligible age band"
    mode="range"
    min="0"
    max="80"
    value-low="21"
    value-high="60"
    display="full"
  ></aegov-range>
</div>

---

## RTL Support

The range is direction-agnostic. When the document or any ancestor is set to `dir="rtl"` the fill, min/max labels, and pointer mapping mirror automatically — `min` sits on the right, `max` on the left, and dragging right decreases the value.

```html
<div dir="rtl">
  <aegov-range
    label="نصف قطر البحث (كم)"
    min="1"
    max="50"
    value="10"
    display="full"
  ></aegov-range>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-range
    label="نصف قطر البحث (كم)"
    min="1"
    max="50"
    value="10"
    display="full"
  ></aegov-range>
</div>

A dual-thumb range in RTL:

```html
<div dir="rtl">
  <aegov-range
    label="الفئة العمرية المؤهلة"
    mode="range"
    min="0"
    max="80"
    value-low="21"
    value-high="60"
    display="full"
  ></aegov-range>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-range
    label="الفئة العمرية المؤهلة"
    mode="range"
    min="0"
    max="80"
    value-low="21"
    value-high="60"
    display="full"
  ></aegov-range>
</div>

---

## API Reference

### aegov-range Properties

| Property      | Attribute      | Description                                                                                       | Type                                       | Default     |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------ | ----------- |
| `fieldId`     | `field-id`     | DOM `id` for the underlying `<input type="range">`. Auto-generated if omitted.                     | `string`                                   | _generated_ |
| `name`        | `name`         | Form field name used during submission. In range mode, submitted as `name-low` and `name-high`.    | `string`                                   | `undefined` |
| `value`       | `value`        | Current value in single mode.                                                                      | `number`                                   | `50`        |
| `valueLow`    | `value-low`    | Low thumb value in range mode.                                                                     | `number`                                   | `25`        |
| `valueHigh`   | `value-high`   | High thumb value in range mode.                                                                    | `number`                                   | `75`        |
| `min`         | `min`          | Minimum value of the range.                                                                        | `number`                                   | `0`         |
| `max`         | `max`          | Maximum value of the range.                                                                        | `number`                                   | `100`       |
| `step`        | `step`         | Step increment.                                                                                    | `number`                                   | `1`         |
| `mode`        | `mode`         | Single thumb or dual thumb (range selection).                                                      | `'single' \| 'range'`                      | `'single'`  |
| `orientation` | `orientation`  | Slider layout direction.                                                                           | `'horizontal' \| 'vertical'`               | `'horizontal'`|
| `display`     | `display`      | How the current value is shown. See the Value display section.                                     | `'none' \| 'tooltip' \| 'thumb' \| 'full'` | `'none'`    |
| `size`        | `size`         | Track size token, or a responsive string.                                                          | `string`                                   | `'base'`    |
| `variant`     | `variant`      | Colour family for the active fill. Track and thumb stay neutral. Focus ring stays camel; error stays aered. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `isDisabled`  | `is-disabled`  | Disables the input and removes it from the tab order.                                              | `boolean`                                  | `false`     |
| `isRequired`   | `is-required`   | Marks the underlying input as required for form validation.                                        | `boolean`                                  | `false`     |
| `isInvalid`    | `is-invalid`    | Puts the component in an error state and shows the error message.                                  | `boolean`                                  | `false`     |
| `errorMessage` | `error-message` | Inline error text rendered below the slider when `isInvalid` is `true`.                            | `string`                                   | `''`        |
| `hint`         | `hint`          | Hint text rendered below the slider (hidden when `isInvalid` is `true`).                           | `string`                                   | `''`        |
| `label`        | `label`         | Optional label rendered above the slider.                                                          | `string`                                   | `undefined` |
| `extraClass`   | `extra-class`   | Additional CSS classes appended to the wrapper.                                                    | `string`                                   | `undefined` |

### Methods

| Method                       | Returns                          | Description                                                      |
| ---------------------------- | -------------------------------- | ---------------------------------------------------------------- |
| `validate(trigger?)`         | `Promise<AegovValidationResult>` | Re-runs validation and emits `aegovValidate`.                    |
| `setCustomValidity(message)` | `Promise<void>`                  | Sets a custom error message. Pass `''` to clear.                 |

### Slots

| Slot    | Description                                                                                      |
| ------- | ------------------------------------------------------------------------------------------------ |
| `hint`  | Shown when not in error state. Use for rich HTML hint markup (e.g. a link) instead of the hint prop. |
| `error` | Shown when `isInvalid` is true. Use for rich HTML error markup instead of the errorMessage prop. |

### Events

| Event              | Detail                                                              | Description                                                                  |
| ------------------ | ------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `aegovRangeInput`  | `{ value?: number; valueLow?: number; valueHigh?: number }`         | Fires continuously while a thumb is being dragged or a key changes the value.|
| `aegovRangeChange` | `{ value?: number; valueLow?: number; valueHigh?: number }`         | Fires once when the value is committed (mouse-up, touch-end, or keypress).   |
| `aegovValidate`    | `AegovValidationDetail<number \| { low: number; high: number }>`    | Unified validation event. Fires on blur, input, change, and `validate()`.    |

The detail object contains `value` in single mode, or `valueLow` and `valueHigh` in range mode.

#### Listening for changes

```html
<aegov-range id="radius" label="Search radius (km)" min="1" max="50" value="10"></aegov-range>

<script>
  const slider = document.querySelector('#radius');
  slider.addEventListener('aegovRangeInput', (e) => {
    console.log('Dragging:', e.detail.value);
  });
  slider.addEventListener('aegovRangeChange', (e) => {
    console.log('Committed:', e.detail.value);
  });
</script>
```

### Pass-through Attributes

The component forwards the attribute groups below onto the inner `<input type="range">`. In dual-thumb mode they are forwarded onto the single-thumb input only; dual inputs use the component's own derived ids and labels.

| Attribute group | Forwarded to inner `<input>` | Notes                                                                |
| --------------- | ---------------------------- | -------------------------------------------------------------------- |
| `aria-*`        | Yes                          | Augment ARIA semantics. The component already sets `aria-valuemin/max/now`.|
| `data-*`        | Yes                          | Useful for analytics or test selectors.                               |
| `form`          | Yes                          | Associates the input with a form by `id` when not nested inside it.   |
| `tabindex`      | Yes                          | Override default tab order.                                           |
| `autofocus`     | Yes                          | Focus the slider on initial page load.                                |
| `title`         | Yes                          | Native browser tooltip text.                                          |

---

## Validation

`aegov-range` exposes the unified [Validation Surface](validation-overview.html). Range-specific notes:

### Value type per mode

| Mode | `value` type | FormData payload |
| --- | --- | --- |
| `single` | `number` | numeric string |
| `range` | `{ low: number; high: number }` | two entries: `name-low` + `name-high` |

### Common recipes

**Bounded numeric range:**

```html
<aegov-range name="rating" min="0" max="10" step="1" hint="0–10"></aegov-range>
```

`min` / `max` / `step` enforce native validity; `rangeUnderflow` / `rangeOverflow` / `stepMismatch` flags fire automatically.

**Range mode with min span (3+ days):**

```html
<aegov-range mode="range" name="period" min="0" max="365"></aegov-range>
```

```js
range.addEventListener('aegovValidate', (e) => {
  const { low, high } = e.detail.value;
  if (high - low < 3) {
    range.setCustomValidity('Range must span at least 3 days');
  } else {
    range.setCustomValidity('');
  }
});
```

**Bind to another field:**

```js
priceRange.addEventListener('aegovValidate', (e) => {
  const { high } = e.detail.value;
  budget.value = String(high);
});
```

See [BYO Validator](validation-byo.html) for more patterns.

---

## Accessibility

### Built-in behaviour

- The component uses one or two real `<input type="range">` elements, so screen readers, the OS rotor, and assistive tech all treat it as a native slider.
- `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` are kept in sync as the user drags. In dual-thumb mode the low thumb's `aria-valuemax` clamps to the high thumb's value, and vice-versa, so each handle reports its own permitted range.
- When the `label` prop is used in single mode, the label is rendered as a `<label>` element with `for` pointing to the underlying `<input>`, so assistive technology announces it on focus. In range mode the label is rendered as a `<span>` with an `id`, and each thumb's `aria-label` incorporates the field label for full context — e.g. "Age of dependants — Range minimum".
- Each thumb in range mode receives a bilingual `aria-label` that includes the field label and the thumb role ("Range minimum" / "Range maximum" in English; "الحد الأدنى للنطاق" / "الحد الأقصى للنطاق" in Arabic). No developer translation is needed.
- Both thumbs in range mode have `aria-invalid` and `aria-describedby` kept in sync with the validation state, and both trigger the blur-gated error announcement independently.
- Pointer events are translated to value updates that respect the configured `step`, so all input methods snap to the same grid.

### Developer responsibilities

- Provide a `label` (or external `<aegov-label>`) that describes the unit (km, AED, years, etc.). A bare slider gives users no way to interpret the value.
- Pair sliders with a visible numeric readout when precision matters — set `display="tooltip"`, `display="thumb"`, or `display="full"`, or echo the value elsewhere on the page.
- Keep the value-range realistic. Sliders are poor inputs for values where a free-form number is required; pair with an `aegov-input type="number"` for those cases.
- For range mode, check that `value-low` and `value-high` always satisfy `value-low + step ≤ value-high` — the component enforces this on input but seeded values must respect it.

### Keyboard support

| Key                   | Action                                                |
| --------------------- | ----------------------------------------------------- |
| `Arrow Right` / `Arrow Up`  | Increase the value by one step.                  |
| `Arrow Left` / `Arrow Down` | Decrease the value by one step.                  |
| `Page Up`             | Increase the value by a larger increment (browser-defined).|
| `Page Down`           | Decrease the value by a larger increment (browser-defined).|
| `Home`                | Jump to `min`.                                        |
| `End`                 | Jump to `max`.                                        |
| `Tab`                 | Move focus to the next slider thumb or focusable element. |
| `Shift + Tab`         | Move focus to the previous slider thumb or focusable element. |
