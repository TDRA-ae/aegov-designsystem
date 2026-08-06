# Range

<p class="text-lg text-aeblack-500 mb-8">A Range lets the user pick a number, or a span between two numbers, by dragging along a track. Use it when the approximate value matters more than the exact one — a search radius, a price ceiling, an age band. When the precise figure matters, a number input is the better control.</p>

## Introduction

`aegov-range` renders real `<input type="range">` elements behind a custom track and thumb, so keyboard behaviour and form participation come from the platform while the appearance is fully themed.

```html
<aegov-range name="radius" label="Search radius" min="0" max="50" value="15" display="full"></aegov-range>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-range field-id="rg-intro" name="radius" label="Search radius" min="0" max="50" value="15" display="full"></aegov-range>
  </div>
</div>

Unlike the other form controls, `aegov-range` renders its own `label` rather than relying on [`aegov-label`](aegov-label.html) — the label needs to sit alongside the value readout, so the component owns that layout.

---

## Mode

`mode` chooses between one thumb and two.

| Mode | Value properties | Use for |
| --- | --- | --- |
| `single` | `value` | A single number — a radius, a volume, a maximum. |
| `range` | `valueLow` and `valueHigh` | A span — a price band, an age range, a date window. |

```html
<aegov-range mode="single" name="radius" label="Search radius" min="0" max="50" value="15" display="full"></aegov-range>

<aegov-range
  mode="range"
  name="income"
  label="Household income band (AED)"
  min="0"
  max="50000"
  step="1000"
  value-low="10000"
  value-high="30000"
  display="full"
></aegov-range>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-10">
    <aegov-range field-id="rg-m-1" mode="single" name="radius" label="Search radius" min="0" max="50" value="15" display="full"></aegov-range>
    <aegov-range field-id="rg-m-2" mode="range" name="income" label="Household income band (AED)" min="0" max="50000" step="1000" value-low="10000" value-high="30000" display="full"></aegov-range>
  </div>
</div>

In range mode `value` is ignored — read and write `valueLow` and `valueHigh` instead.

---

## Value display

`display` controls where, and whether, the current value is shown.

| Value | Behaviour |
| --- | --- |
| `none` | Default. No readout. Only appropriate when the value is visible elsewhere. |
| `tooltip` | The value floats above the thumb while dragging. |
| `thumb` | The value sits permanently inside the thumb. |
| `full` | Min and max labels at the ends of the track, plus the current value. |

```html
<aegov-range display="none" label="No readout" value="40"></aegov-range>
<aegov-range display="tooltip" label="Tooltip on drag" value="40"></aegov-range>
<aegov-range display="thumb" label="Value in thumb" value="40"></aegov-range>
<aegov-range display="full" label="Full readout" value="40"></aegov-range>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-10">
    <aegov-range field-id="rg-d-1" display="none" label="none" value="40"></aegov-range>
    <aegov-range field-id="rg-d-2" display="tooltip" label="tooltip — drag to see it" value="40"></aegov-range>
    <aegov-range field-id="rg-d-3" display="thumb" label="thumb" value="40"></aegov-range>
    <aegov-range field-id="rg-d-4" display="full" label="full" value="40"></aegov-range>
  </div>
</div>

Prefer `full` for anything the user must get right. `none` leaves them guessing, and `tooltip` hides the value exactly when a keyboard user is not dragging — so if you use `tooltip`, make sure the value is also visible somewhere permanent.

---

## Min, max and step

`step` sets the granularity. Choose it to match how the value is actually used — a search radius in whole kilometres, a fee in hundreds.

```html
<aegov-range label="Radius (km)" min="0" max="50" step="5" value="20" display="full"></aegov-range>
<aegov-range label="Fee ceiling (AED)" min="0" max="5000" step="250" value="1500" display="full"></aegov-range>
<aegov-range label="Age" min="18" max="80" step="1" value="35" display="full"></aegov-range>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-10">
    <aegov-range field-id="rg-st-1" label="Radius (km)" min="0" max="50" step="5" value="20" display="full"></aegov-range>
    <aegov-range field-id="rg-st-2" label="Fee ceiling (AED)" min="0" max="5000" step="250" value="1500" display="full"></aegov-range>
    <aegov-range field-id="rg-st-3" label="Age" min="18" max="80" step="1" value="35" display="full"></aegov-range>
  </div>
</div>

A large range with `step="1"` is hard to operate — 500 keypresses to cross the track. Pick a step that makes the whole range reachable in a reasonable number of presses.

---

## Orientation

```html
<aegov-range orientation="horizontal" label="Horizontal" value="40" display="full"></aegov-range>
<aegov-range orientation="vertical" label="Vertical" value="40" display="thumb"></aegov-range>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex items-start gap-12">
    <div class="max-w-xs grow">
      <aegov-range field-id="rg-o-1" orientation="horizontal" label="Horizontal" value="40" display="full"></aegov-range>
    </div>
    <div style="height: 220px;">
      <aegov-range field-id="rg-o-2" orientation="vertical" label="Vertical" value="40" display="thumb"></aegov-range>
    </div>
  </div>
</div>

Vertical ranges need an explicit height on a wrapper — they have no intrinsic length. They also suit far fewer situations than horizontal; reach for them only where the value is genuinely vertical, such as a level or a volume.

---

## Sizes

Five tokens, scaling the track and thumb.

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-8">
    <aegov-range field-id="rg-s-xs" size="xs" label="Extra small" value="40"></aegov-range>
    <aegov-range field-id="rg-s-sm" size="sm" label="Small" value="40"></aegov-range>
    <aegov-range field-id="rg-s-base" size="base" label="Base" value="40"></aegov-range>
    <aegov-range field-id="rg-s-lg" size="lg" label="Large" value="40"></aegov-range>
    <aegov-range field-id="rg-s-xl" size="xl" label="Extra large" value="40"></aegov-range>
  </div>
</div>

### Responsive sizes

`size` accepts a responsive string with the prefixes `xs`, `sm`, `md`, `lg`, `xl` and `2xl`.

```html
<aegov-range size="sm md:base lg:lg" label="Adapts to the viewport" value="40"></aegov-range>
```

Larger tokens give a bigger drag target, which matters on touch. Do not go below `base` for a control the user is expected to drag precisely.

---

## States and variant

```html
<aegov-range label="Disabled" value="40" is-disabled></aegov-range>
<aegov-range label="Invalid" value="5" is-invalid error-message="Choose a radius of at least 10 km"></aegov-range>
<aegov-range label="With hint" value="40" hint="Results update as you drag"></aegov-range>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-10">
    <aegov-range field-id="rg-x-1" label="Disabled" value="40" is-disabled display="full"></aegov-range>
    <aegov-range field-id="rg-x-2" label="Search radius (km)" min="0" max="50" value="5" is-invalid error-message="Choose a radius of at least 10 km" display="full"></aegov-range>
    <aegov-range field-id="rg-x-3" label="Search radius (km)" min="0" max="50" value="20" hint="Results update as you drag" display="full"></aegov-range>
    <aegov-range field-id="rg-x-4" variant="secondary" label="Secondary variant" value="40" display="full"></aegov-range>
    <aegov-range field-id="rg-x-5" variant="neutral-max" label="Neutral max variant" value="40" display="full"></aegov-range>
  </div>
</div>

As everywhere in the form family, the **focus ring stays camel** and the **error state stays aered** regardless of variant.

---

## Composite example — service search filters

```html
<form id="filters">
  <aegov-range
    id="radius"
    name="radius"
    label="Search radius (km)"
    min="1"
    max="50"
    step="1"
    value="10"
    display="full"
    hint="Distance from your registered address"
  ></aegov-range>

  <aegov-range
    id="fee"
    mode="range"
    name="fee"
    label="Fee range (AED)"
    min="0"
    max="2000"
    step="50"
    value-low="0"
    value-high="1000"
    display="full"
  ></aegov-range>

  <p id="summary" class="text-sm text-aeblack-500" aria-live="polite"></p>
</form>

<script type="module">
  const radius = document.querySelector('#radius');
  const fee = document.querySelector('#fee');
  const summary = document.querySelector('#summary');

  function update() {
    summary.textContent =
      `Showing centres within ${radius.value} km, fees AED ${fee.valueLow}–${fee.valueHigh}`;
  }

  // While dragging — cheap UI updates only
  radius.addEventListener('aegovRangeInput', update);
  fee.addEventListener('aegovRangeInput', update);

  // On release — the expensive call
  radius.addEventListener('aegovRangeChange', () => runSearch());
  fee.addEventListener('aegovRangeChange', () => runSearch());

  update();
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-10">
    <aegov-range field-id="rg-cx-1" name="radius" label="Search radius (km)" min="1" max="50" step="1" value="10" display="full" hint="Distance from your registered address"></aegov-range>
    <aegov-range field-id="rg-cx-2" mode="range" name="fee" label="Fee range (AED)" min="0" max="2000" step="50" value-low="0" value-high="1000" display="full"></aegov-range>
  </div>
</div>

The two-event split is the point of this example. `aegovRangeInput` fires continuously while dragging — use it for the readout. `aegovRangeChange` fires on release — use it for anything expensive, such as a network request.

---

## Listening for events

| Event | Fires |
| --- | --- |
| `aegovRangeInput` | Continuously while dragging or on each keypress. |
| `aegovRangeChange` | When the interaction completes. |

```js
range.addEventListener('aegovRangeInput', (e) => {
  // single mode
  console.log(e.detail.value);
  // range mode
  console.log(e.detail.valueLow, e.detail.valueHigh);
});
```

The detail carries whichever properties apply to the current mode, so check the mode rather than assuming a shape.

---

## RTL Support

The range is direction-aware. In a `dir="rtl"` container the track fills from the right, the min and max labels swap ends, and arrow keys follow the visual order — `ArrowRight` decreases the value, matching what the user sees. Thumb tooltips and readouts mirror with the track.

The built-in accessible labels for the two thumbs in range mode are translated automatically: "Range minimum" and "Range maximum" become "الحد الأدنى للنطاق" and "الحد الأقصى للنطاق", prefixed with your `label` when you supply one.

```html
<div dir="rtl">
  <aegov-range
    name="radius"
    label="نطاق البحث (كم)"
    min="0"
    max="50"
    value="15"
    display="full"
    hint="المسافة من عنوانك المسجل"
  ></aegov-range>

  <aegov-range
    mode="range"
    name="fee"
    label="نطاق الرسوم (درهم)"
    min="0"
    max="2000"
    step="50"
    value-low="0"
    value-high="1000"
    display="full"
  ></aegov-range>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-10">
    <aegov-range field-id="rg-rtl-1" name="radius" label="نطاق البحث (كم)" min="0" max="50" value="15" display="full" hint="المسافة من عنوانك المسجل"></aegov-range>
    <aegov-range field-id="rg-rtl-2" mode="range" name="fee" label="نطاق الرسوم (درهم)" min="0" max="2000" step="50" value-low="0" value-high="1000" display="full"></aegov-range>
  </div>
</div>

Numerals are yours to decide. The component renders whatever the numeric value stringifies to, which is Western digits — if your Arabic pages use Arabic-Indic numerals elsewhere, format the readout yourself rather than relying on the built-in display.

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the inner input. Auto-generated when omitted, reflected. | `string` | _generated_ |
| `name` | `name` | Form field name. | `string` | — |
| `mode` | `mode` | One thumb or two. | `'single' \| 'range'` | `'single'` |
| `value` | `value` | Current value in `single` mode. Mutable. | `number` | `50` |
| `valueLow` | `value-low` | Lower value in `range` mode. Mutable. | `number` | `25` |
| `valueHigh` | `value-high` | Upper value in `range` mode. Mutable. | `number` | `75` |
| `min` | `min` | Minimum. | `number` | `0` |
| `max` | `max` | Maximum. | `number` | `100` |
| `step` | `step` | Increment. | `number` | `1` |
| `display` | `display` | Where the value is shown. | `'none' \| 'tooltip' \| 'thumb' \| 'full'` | `'none'` |
| `orientation` | `orientation` | Track direction. Vertical needs an explicit height on a wrapper. | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `size` | `size` | Size token or responsive string. | `string` — `xs \| sm \| base \| lg \| xl` | `'base'` |
| `variant` | `variant` | Colour family for the filled track and thumb. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `label` | `label` | Field label, rendered by the component itself. | `string` | — |
| `hint` | `hint` | Helper text shown when no error is showing. | `string` | `''` |
| `isDisabled` | `is-disabled` | Disables the control. Reflected. | `boolean` | `false` |
| `isRequired` | `is-required` | Marks the field required. | `boolean` | `false` |
| `isInvalid` | `is-invalid` | Invalid state. Mutable and reflected. | `boolean` | `false` |
| `errorMessage` | `error-message` | Error text shown while invalid. | `string` | `''` |
| `extraClass` | `extra-class` | Extra classes on the inner elements. | `string` | — |

### Slots

| Slot | Description |
| --- | --- |
| `hint` | Rich hint markup. Takes precedence over the `hint` property. |
| `error` | Rich error markup. Rendered only while `is-invalid`. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovRangeInput` | `{ value?: number; valueLow?: number; valueHigh?: number }` | Continuously during interaction. |
| `aegovRangeChange` | `{ value?: number; valueLow?: number; valueHigh?: number }` | When the interaction completes. |
| `aegovValidate` | `AegovValidationDetail<AegovRangeValue>` | Unified validation event — see [Validation Surface](validation-overview.html). |

### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `validate(trigger?)` | `Promise<AegovValidationResult>` | Re-runs validation and emits `aegovValidate`. |
| `setCustomValidity(message)` | `Promise<void>` | Sets `error-message` and `is-invalid`. Empty string clears. |

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `tabindex`, `autofocus`, `title`, `form` | Yes | Forwarded to the inner input. |
| `aria-*` | Yes | Forwarded — except the value and state attributes the component owns. |
| `data-*` | Yes | Forwarded to the inner input. |
| `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-orientation`, `aria-invalid`, `aria-describedby` | Managed | Owned by the component and derived from `min`, `max`, the current value, `orientation` and the validation state. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host. |

---

## Validation

### Surface

`aegov-range` implements the shared contract. The value type depends on the mode: a `number` in `single` mode, and `{ low, high }` in `range` mode. Full reference: [Validation Surface](validation-overview.html).

The `FormData` payload follows the same split:

| Mode | FormData |
| --- | --- |
| `single` | One entry under `name`, the value as a numeric string. |
| `range` | Two entries — `name-low` and `name-high`. |

```js
const data = new FormData(form);

data.get('radius');      // '15'
data.get('fee-low');     // '0'
data.get('fee-high');    // '1000'
```

A range is rarely invalid on its own, because `min` and `max` already bound it. The realistic rules are minimum spans and business floors.

### Common recipes

A business floor above the technical minimum:

```js
radius.addEventListener('aegovValidate', (e) => {
  const ok = Number(e.detail.value) >= 10;
  radius.isInvalid = !ok;
  radius.errorMessage = ok ? '' : 'Choose a radius of at least 10 km';
});
```

A minimum span in range mode:

```js
fee.addEventListener('aegovRangeChange', (e) => {
  const span = e.detail.valueHigh - e.detail.valueLow;
  const ok = span >= 200;
  fee.isInvalid = !ok;
  fee.errorMessage = ok ? '' : 'The fee range must span at least AED 200';
});
```

More patterns in [Bring Your Own Validator](validation-byo.html).

### Use with `@aegov/designsystem-validation`

The **optional** companion package drives this surface from a schema.

```ts
import { createForm } from '@aegov/designsystem-validation';
import { valibotAdapter } from '@aegov/designsystem-validation/adapters/valibot';
import * as v from 'valibot';

createForm(form, v.object({
  radius: v.pipe(v.number(), v.minValue(10, 'Choose a radius of at least 10 km')),
}), valibotAdapter());
```

---

## Accessibility

### Built-in behaviour

- The control is built on real `<input type="range">` elements, so the slider role, arrow-key stepping, `Home` / `End` and form participation come from the platform.
- `aria-valuemin`, `aria-valuemax` and `aria-valuenow` are set from `min`, `max` and the current value, so the value is announced as it changes.
- `aria-orientation` reflects the `orientation` property.
- The component's own `label` is associated through `aria-labelledby`.
- In `range` mode each thumb gets a distinct accessible name — "Range minimum" and "Range maximum", prefixed with your `label` and translated in RTL contexts — so the two thumbs are distinguishable without sight.
- In `range` mode the lower thumb's `aria-valuemax` is bounded by the current upper value, so the announced limits reflect the real constraint rather than the track's extremes.
- The visual track and thumb are decoration over the native inputs; the focusable element is the input itself.
- The error region takes `role="alert"` only after first blur.
- The focus ring is a high-contrast camel outline held constant across variants, meeting the 3:1 requirement of WCAG 2.2 SC 1.4.11.

### Developer responsibilities

- **Always set `label`.** It is the accessible name and the visible one.
- **Show the value.** `display="none"` leaves a sighted user guessing; `display="full"` or `display="thumb"` is almost always the right choice. `tooltip` alone hides the value from anyone using the keyboard.
- **Include the unit** in the label — "Search radius (km)", "Fee range (AED)". A bare number is ambiguous.
- **Choose a `step` that makes the range traversable** by keyboard in a sensible number of presses.
- **Do not use a range where precision matters.** If the user needs to enter exactly 37, give them a number input — or pair the range with one.
- **Debounce expensive work.** Use `aegovRangeInput` for the readout and `aegovRangeChange` for network calls.
- **Never signal an error with colour alone** (WCAG 2.2 SC 1.4.1) — populate `error-message` or the `error` slot.
- **Give vertical ranges an explicit height** on a wrapper element.
- **Format numerals yourself** if your Arabic pages use Arabic-Indic digits.

### Keyboard support

| Key | Action |
| --- | --- |
| `Tab` | Move focus to the slider. In `range` mode each thumb is its own tab stop. |
| `ArrowRight`, `ArrowUp` | Increase by one step. Follows visual order, so it reverses under `dir="rtl"`. |
| `ArrowLeft`, `ArrowDown` | Decrease by one step. |
| `Page Up`, `Page Down` | Increase or decrease by a larger increment. |
| `Home` | Jump to the minimum. |
| `End` | Jump to the maximum. |

---

## Where to next

- [Input](aegov-input.html) — `type="number"` for exact values.
- [Progress](aegov-progress.html) — for displaying a value the user cannot change.
- [Select](aegov-select.html) — for choosing from discrete bands rather than a continuum.
- [Validation Surface](validation-overview.html) and [Bring Your Own Validator](validation-byo.html).
