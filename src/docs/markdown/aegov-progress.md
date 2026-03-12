# Progress

<p class="text-lg text-aeblack-500 mb-8">A progress bar visually communicates the completion status of a task or process. It provides users with immediate feedback on how much of an operation has been completed and how much remains.</p>

## Introduction

The `aegov-progress` component renders a horizontal bar that fills to represent progress toward a goal. It supports determinate mode (when a known value is provided) and indeterminate mode (when the duration is unknown). A hidden native `<progress>` element is included for full accessibility.

The component provides configurable **height**, **counter placement**, **counter suffix**, and a **description** slot — making it suitable for file uploads, multi-step forms, loading indicators, and data dashboards.

```html
<aegov-progress value="45" max="100"></aegov-progress>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-progress value="45" max="100"></aegov-progress>
</div>

---

## Value

The `value` property sets the current progress. It should be a number between `0` and `max`. The bar fills proportionally.

```html
<aegov-progress value="0" max="100"></aegov-progress>
<aegov-progress value="25" max="100"></aegov-progress>
<aegov-progress value="50" max="100"></aegov-progress>
<aegov-progress value="75" max="100"></aegov-progress>
<aegov-progress value="100" max="100"></aegov-progress>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-4 not-aegov">
  <aegov-progress value="0" max="100"></aegov-progress>
  <aegov-progress value="25" max="100"></aegov-progress>
  <aegov-progress value="50" max="100"></aegov-progress>
  <aegov-progress value="75" max="100"></aegov-progress>
  <aegov-progress value="100" max="100"></aegov-progress>
</div>

---

## Max

The `max` property defines the upper bound of the progress range. The default is `100`. You can set a custom max to match any scale.

```html
<aegov-progress value="3" max="5"></aegov-progress>
<aegov-progress value="150" max="200" counter="trailing" counter-suffix="/200"></aegov-progress>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-4 not-aegov">
  <aegov-progress value="3" max="5"></aegov-progress>
  <aegov-progress value="150" max="200" counter="trailing" counter-suffix="/200"></aegov-progress>
</div>

---

## Height

The `height` property controls the thickness of the progress bar using the Tailwind spacing scale. Each unit equals `0.25rem`. The default is `"2"` which renders at `0.5rem` (8px).

| Height value | Rendered size |
|-------------|---------------|
| `"1"`       | 0.25rem (4px) |
| `"1.5"`     | 0.375rem (6px) |
| `"2"`       | 0.5rem (8px) — default |
| `"3"`       | 0.75rem (12px) |
| `"4"`       | 1rem (16px) |

```html
<aegov-progress value="60" height="1"></aegov-progress>
<aegov-progress value="60" height="2"></aegov-progress>
<aegov-progress value="60" height="3"></aegov-progress>
<aegov-progress value="60" height="4"></aegov-progress>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-4 not-aegov">
  <aegov-progress value="60" height="1"></aegov-progress>
  <aegov-progress value="60" height="2"></aegov-progress>
  <aegov-progress value="60" height="3"></aegov-progress>
  <aegov-progress value="60" height="4"></aegov-progress>
</div>

---

## Counter

The `counter` property controls where a numeric counter is displayed. There are two placement options. The counter is hidden in indeterminate mode.

| Counter   | Description                                      |
|-----------|--------------------------------------------------|
| `top`     | Displays the value right-aligned above the bar.  |
| `trailing`| Displays the value inline to the right of the bar.|

### Top Counter

```html
<aegov-progress value="42" max="100" counter="top"></aegov-progress>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-progress value="42" max="100" counter="top"></aegov-progress>
</div>

### Trailing Counter

```html
<aegov-progress value="42" max="100" counter="trailing"></aegov-progress>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-progress value="42" max="100" counter="trailing"></aegov-progress>
</div>

---

## Counter Suffix

The `counterSuffix` property appends text directly after the counter value with no automatic spacing. Use it to add units such as `%`, `/100`, or `MB`.

```html
<aegov-progress value="72" max="100" counter="top" counter-suffix="%"></aegov-progress>
<aegov-progress value="3" max="10" counter="trailing" counter-suffix="/10"></aegov-progress>
<aegov-progress value="256" max="512" counter="trailing" counter-suffix="MB"></aegov-progress>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-4 not-aegov">
  <aegov-progress value="72" max="100" counter="top" counter-suffix="%"></aegov-progress>
  <aegov-progress value="3" max="10" counter="trailing" counter-suffix="/10"></aegov-progress>
  <aegov-progress value="256" max="512" counter="trailing" counter-suffix="MB"></aegov-progress>
</div>

---

## Description

The `description` property renders a small text line below the progress bar. Use it to provide context about what the progress represents.

```html
<aegov-progress value="65" max="100" counter="top" counter-suffix="%" description="Uploading document..."></aegov-progress>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-progress value="65" max="100" counter="top" counter-suffix="%" description="Uploading document..."></aegov-progress>
</div>

---

## Indeterminate State

When no `value` is provided, the progress bar enters an indeterminate state — a striped, animated bar that indicates ongoing activity without a known completion percentage. The counter is automatically hidden in this mode.

```html
<aegov-progress></aegov-progress>
<aegov-progress description="Loading, please wait..."></aegov-progress>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-4 not-aegov">
  <aegov-progress></aegov-progress>
  <aegov-progress description="Loading, please wait..."></aegov-progress>
</div>

---

## Combining Features

The component properties can be combined to create rich progress indicators tailored to your use case.

```html
<!-- File upload progress -->
<aegov-progress value="78" max="100" height="3" counter="top" counter-suffix="%" description="Uploading resume.pdf..."></aegov-progress>

<!-- Step progress -->
<aegov-progress value="2" max="5" counter="trailing" counter-suffix="/5" description="Step 2 of 5: Personal Details"></aegov-progress>

<!-- Thin subtle bar -->
<aegov-progress value="90" max="100" height="1"></aegov-progress>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-6 not-aegov">
  <aegov-progress value="78" max="100" height="3" counter="top" counter-suffix="%" description="Uploading resume.pdf..."></aegov-progress>
  <aegov-progress value="2" max="5" counter="trailing" counter-suffix="/5" description="Step 2 of 5: Personal Details"></aegov-progress>
  <aegov-progress value="90" max="100" height="1"></aegov-progress>
</div>

---

## API Reference

### Properties

| Property        | Attribute        | Description                                                                 | Type                        | Default  |
|-----------------|------------------|-----------------------------------------------------------------------------|-----------------------------|----------|
| `value`         | `value`          | Current progress value. Omit for indeterminate state.                       | `number \| undefined`       | —        |
| `max`           | `max`            | Maximum value of the progress range                                         | `number`                    | `100`    |
| `height`        | `height`         | Bar thickness using Tailwind spacing scale (each unit = 0.25rem)            | `string`                    | `'2'`    |
| `counter`       | `counter`        | Counter placement                                                           | `'top'` \| `'trailing'`    | —        |
| `counterSuffix` | `counter-suffix` | Text appended directly to the counter value                                 | `string`                    | `''`     |
| `description`   | `description`    | Description text displayed below the bar                                    | `string`                    | —        |
| `fieldId`       | `field-id`       | Unique ID for the native `<progress>` element. Auto-generated if not set.   | `string`                    | auto     |
| `class`         | `class`          | Additional CSS classes applied to the wrapper                               | `string`                    | —        |

### Events

This component does not emit custom events.

### Slots

This component does not use slots.

### CSS Classes

The component uses BEM-style CSS classes prefixed with `progress__` inside the `.aegov-progress` wrapper.

| Class                            | Description                                    |
|----------------------------------|------------------------------------------------|
| `.aegov-progress`                | Root wrapper element                           |
| `.progress__track`               | The background track bar                       |
| `.progress__fill`                | The colored fill bar                           |
| `.progress__track--indeterminate`| Applied when no value is set (animated stripes)|
| `.progress__counter`             | The numeric counter text                       |
| `.progress__counter--top`        | Counter positioned above the bar               |
| `.progress__counter--trailing`   | Counter positioned inline after the bar        |
| `.progress__description`         | Description text below the bar                 |
| `.progress__native`              | Visually hidden native `<progress>` element    |

### Pass-Through Attributes

The component forwards `aria-*`, `data-*`, `tabindex`, `title`, and `form` attributes from the host element to the native `<progress>` element.

```html
<aegov-progress value="50" aria-label="Upload progress" data-testid="upload-bar"></aegov-progress>
```

---

## Accessibility

The `aegov-progress` component is built with accessibility as a first-class concern.

### Built-in Features

- **Native `<progress>` element** — a visually hidden but semantically correct `<progress>` element is rendered inside the component. Screen readers announce it with `role="progressbar"` semantics automatically.
- **`aria-valuenow`** — the native `<progress>` element's `value` attribute communicates the current value to assistive technologies.
- **`aria-valuemax`** — the `max` attribute communicates the upper bound of the range.
- **Indeterminate state** — when no `value` is set, the native `<progress>` element omits the `value` attribute, which screen readers announce as an indeterminate or ongoing process.
- **Visual track is `aria-hidden`** — the decorative track and fill bar are hidden from the accessibility tree. Only the native `<progress>` element is exposed.
- **Pass-through attributes** — `aria-label`, `aria-labelledby`, and other ARIA attributes placed on the host are forwarded to the native element.

### Developer Responsibilities

1. **Provide a label.** The progress bar should be associated with a visible label or given an `aria-label` so screen readers can announce what the progress represents.

   ```html
   <aegov-progress value="50" aria-label="File upload progress"></aegov-progress>
   ```

2. **Use `aegov-form-field` for labelling.** When used inside a form, wrap the progress bar with an `aegov-form-field` and `aegov-label` so the label is programmatically associated via the `fieldId`.

3. **Keep descriptions meaningful.** When using the `description` property, ensure the text provides useful context. The description is visible but not programmatically linked to the native progress element — add `aria-label` if the description alone is insufficient.

---

## Notes

- The `value` property must be omitted (not set to `0`) to trigger the indeterminate state. Setting `value="0"` renders a determinate bar at 0%.
- The `height` property accepts any number on the Tailwind spacing scale. Fractional values such as `"1.5"` or `"2.5"` are valid.
- The `counterSuffix` is appended directly to the value with no space. If you need a space, include it in the suffix string (e.g. `counter-suffix=" MB"`).
- The fill bar transitions smoothly over 300ms when the value changes, providing a polished visual update.
- The indeterminate animation uses a repeating striped gradient with a continuous slide effect.
- The counter uses `font-variant-numeric: tabular-nums` so that digits maintain consistent width as values change, preventing layout shifts.
- The component sets `display: block` on the host element, so it fills the width of its container by default.
