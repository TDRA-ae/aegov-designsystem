# Range

<p class="text-lg text-aeblack-500 mb-8">A range slider lets users select a numeric value or a numeric range within a defined minimum and maximum. It supports single and dual-thumb modes, multiple display styles, vertical orientation, and full keyboard and touch accessibility.</p>

## Introduction

The `aegov-range` component wraps a native `<input type="range">` in a custom visual layer that provides a consistent design-system appearance while keeping full keyboard, touch, and assistive-technology support. It offers **single** and **range** (dual-thumb) modes, **5 track sizes**, **4 value-display styles**, and both **horizontal** and **vertical** orientations.

```html
<aegov-range></aegov-range>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-range></aegov-range>
</div>

---

## Value, Min, Max, and Step

Use `value`, `min`, `max`, and `step` to control the slider's numeric range and granularity. The default range is 0 to 100 with a step of 1 and an initial value of 50.

```html
<aegov-range value="30" min="0" max="100" step="5"></aegov-range>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-range value="30" min="0" max="100" step="5"></aegov-range>
</div>

---

## Sizes

The `size` property controls the thickness of the track. The thumb remains a constant 24px circle. Five sizes are available.

| Size   | Track Height |
|--------|-------------|
| `xs`   | 3px         |
| `sm`   | 4px         |
| `base` | 6px         |
| `lg`   | 8px         |
| `xl`   | 10px        |

```html
<aegov-range size="xs"></aegov-range>
<aegov-range size="sm"></aegov-range>
<aegov-range size="base"></aegov-range>
<aegov-range size="lg"></aegov-range>
<aegov-range size="xl"></aegov-range>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div class="pb-8"><aegov-range size="xs" value="20"></aegov-range></div>
  <div class="pb-8"><aegov-range size="sm" value="30"></aegov-range></div>
  <div class="pb-8"><aegov-range size="base" value="50"></aegov-range></div>
  <div class="pb-8"><aegov-range size="lg" value="70"></aegov-range></div>
  <div class="pb-8"><aegov-range size="xl" value="90"></aegov-range></div>
</div>

### Responsive Size

The `size` prop accepts Tailwind-style responsive prefixes. Write a space-separated string where each token is either a plain value or `breakpoint:value`. The base value (no prefix) applies below the smallest specified breakpoint.

Available breakpoints: `xs` (480px), `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px), `3xl` (1680px).

```html
<aegov-range size="sm xl:lg" value="50"></aegov-range>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-range size="sm xl:lg" value="50"></aegov-range>
</div>

> **Graceful degradation:** Unknown breakpoint names and invalid values are silently ignored. An unrecognised base value falls back to the component default.

---

## Value Display

The `display` property controls how the current value is shown to the user. There are four modes.

| Display    | Description                                                    |
|------------|----------------------------------------------------------------|
| `none`     | Default. No value label is shown.                              |
| `tooltip`  | A dark tooltip floats above (or beside) the thumb.             |
| `thumb`    | The value is displayed inside a slightly larger thumb (32px).  |
| `full`     | The value is shown inside the thumb, and min/max labels appear at each end. |

### Tooltip

```html
<aegov-range display="tooltip" value="65"></aegov-range>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov" style="padding-top: 2.5rem;">
  <aegov-range display="tooltip" value="65"></aegov-range>
</div>

### Thumb

```html
<aegov-range display="thumb" value="42"></aegov-range>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-range display="thumb" value="42"></aegov-range>
</div>

### Full

```html
<aegov-range display="full" value="75"></aegov-range>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-range display="full" value="75"></aegov-range>
</div>

---

## Range Mode (Dual Thumb)

Set `mode="range"` to enable dual-thumb selection. Use `value-low` and `value-high` to define the selected interval. The two thumbs cannot cross each other — the low thumb is always constrained below the high thumb.

```html
<aegov-range mode="range" value-low="20" value-high="80"></aegov-range>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-range mode="range" value-low="20" value-high="80"></aegov-range>
</div>

### Range Mode with Tooltip

```html
<aegov-range mode="range" display="tooltip" value-low="30" value-high="70"></aegov-range>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov" style="padding-top: 2.5rem;">
  <aegov-range mode="range" display="tooltip" value-low="30" value-high="70"></aegov-range>
</div>

### Range Mode with Full Display

```html
<aegov-range mode="range" display="full" value-low="25" value-high="75"></aegov-range>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-range mode="range" display="full" value-low="25" value-high="75"></aegov-range>
</div>

---

## Label

Use the `label` property to render a text label above the range slider. The label is rendered as a `<span>` with the `range__label-text` class.

```html
<aegov-range label="Volume" value="60"></aegov-range>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-range label="Volume" value="60"></aegov-range>
</div>

### Label with Full Display

```html
<aegov-range label="Price Range" mode="range" display="full" min="0" max="500" value-low="100" value-high="400" step="10"></aegov-range>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-range label="Price Range" mode="range" display="full" min="0" max="500" value-low="100" value-high="400" step="10"></aegov-range>
</div>

---

## Vertical Orientation

Set `orientation="vertical"` to render the slider vertically. The track height defaults to 200px via the `--range-height` CSS variable.

```html
<aegov-range orientation="vertical" value="40"></aegov-range>
```

<div class="flex items-end gap-8 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov" style="height: 280px;">
  <aegov-range orientation="vertical" value="20" size="xs"></aegov-range>
  <aegov-range orientation="vertical" value="40" size="sm"></aegov-range>
  <aegov-range orientation="vertical" value="60" size="base"></aegov-range>
  <aegov-range orientation="vertical" value="80" size="lg"></aegov-range>
  <aegov-range orientation="vertical" value="90" size="xl"></aegov-range>
</div>

### Vertical with Tooltip

```html
<aegov-range orientation="vertical" display="tooltip" value="55"></aegov-range>
```

<div class="flex items-end gap-12 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov" style="height: 280px;">
  <aegov-range orientation="vertical" display="tooltip" value="55"></aegov-range>
  <aegov-range orientation="vertical" display="thumb" value="70"></aegov-range>
</div>

---

## Disabled State

Set the `disabled` attribute to make the slider non-interactive. The component becomes visually muted with reduced opacity and `pointer-events: none`.

```html
<aegov-range disabled value="40"></aegov-range>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-range disabled value="40"></aegov-range>
</div>

---

## Usage with Form Field

The range component can be used inside an `aegov-form-field` with an `aegov-label` for consistent form layout. The `field-id` property links the label to the native input.

```html
<aegov-form-field>
  <aegov-label>Brightness</aegov-label>
  <aegov-range value="70" display="full"></aegov-range>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>Brightness</aegov-label>
    <aegov-range value="70" display="full"></aegov-range>
  </aegov-form-field>
</div>

---

## Events

The component emits two custom events for tracking value changes.

| Event             | When                                  | Detail                                                                |
|-------------------|---------------------------------------|-----------------------------------------------------------------------|
| `aegovRangeInput` | On every value update during drag     | `{ value?: number; valueLow?: number; valueHigh?: number }`          |
| `aegovRangeChange`| When the user releases the thumb      | `{ value?: number; valueLow?: number; valueHigh?: number }`          |

In single mode, the detail contains `value`. In range mode, it contains `valueLow` and `valueHigh`.

#### Listening to Events

```html
<aegov-range id="my-range" display="tooltip"></aegov-range>
<p id="range-output">Value: 50</p>

<script>
  const range = document.getElementById('my-range');
  const output = document.getElementById('range-output');

  range.addEventListener('aegovRangeInput', (e) => {
    output.textContent = 'Value: ' + e.detail.value;
  });

  range.addEventListener('aegovRangeChange', (e) => {
    console.log('Committed value:', e.detail.value);
  });
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-range id="demo-range" display="tooltip"></aegov-range>
  <p id="demo-range-output" class="mt-3 text-sm text-aeblack-600 font-mono">Value: 50</p>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      var r = document.getElementById('demo-range');
      var o = document.getElementById('demo-range-output');
      if (r && o) {
        r.addEventListener('aegovRangeInput', function(e) {
          o.textContent = 'Value: ' + e.detail.value;
        });
      }
    });
  </script>
</div>

---

## RTL Support

The component fully supports right-to-left layouts. When the document or a parent element has `dir="rtl"`, the fill direction and thumb positioning automatically mirror. Pointer drag calculations account for RTL direction.

```html
<div dir="rtl">
  <aegov-range display="full" value="35"></aegov-range>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-range display="full" value="35" label="مستوى الصوت"></aegov-range>
</div>

No additional configuration is needed — the component reads the computed `direction` style and adjusts automatically.

---

## API Reference

### Properties

| Property      | Attribute      | Description                                          | Type                                                    | Default        |
|---------------|----------------|------------------------------------------------------|---------------------------------------------------------|----------------|
| `value`       | `value`        | Current value (single mode)                          | `number`                                                | `50`           |
| `valueLow`    | `value-low`    | Low thumb value (range mode)                         | `number`                                                | `25`           |
| `valueHigh`   | `value-high`   | High thumb value (range mode)                        | `number`                                                | `75`           |
| `min`         | `min`          | Minimum value                                        | `number`                                                | `0`            |
| `max`         | `max`          | Maximum value                                        | `number`                                                | `100`          |
| `step`        | `step`         | Step increment                                       | `number`                                                | `1`            |
| `size`        | `size`         | Track thickness. Supports responsive strings (e.g. `'sm xl:lg'`).           | `'xs'` \| `'sm'` \| `'base'` \| `'lg'` \| `'xl'`      | `'base'`       |
| `display`     | `display`      | Value display mode                                   | `'none'` \| `'tooltip'` \| `'thumb'` \| `'full'`       | `'none'`       |
| `orientation` | `orientation`  | Layout orientation                                   | `'horizontal'` \| `'vertical'`                          | `'horizontal'` |
| `mode`        | `mode`         | Single thumb or dual-thumb range                     | `'single'` \| `'range'`                                 | `'single'`     |
| `disabled`    | `disabled`     | Prevents interaction                                 | `boolean`                                               | `false`        |
| `required`    | `required`     | Marks the input as required                          | `boolean`                                               | `false`        |
| `label`       | `label`        | Optional text label above the slider                 | `string`                                                | `undefined`    |
| `fieldId`     | `field-id`     | ID for the native input. Auto-generated if omitted   | `string`                                                | auto-generated |
| `name`        | `name`         | Name attribute for the native range input            | `string`                                                | `undefined`    |
| `class`       | `class`        | Additional CSS classes                               | `string`                                                | `undefined`    |

### Events

| Event              | Description                           | Detail Type                                                   |
|--------------------|---------------------------------------|---------------------------------------------------------------|
| `aegovRangeInput`  | Emitted during drag on every update   | `{ value?: number; valueLow?: number; valueHigh?: number }`  |
| `aegovRangeChange` | Emitted when the user releases        | `{ value?: number; valueLow?: number; valueHigh?: number }`  |

Events are not emitted when the slider is `disabled`.

### Pass-Through Attributes

The component forwards `tabindex`, `autofocus`, `title`, `form`, and all `aria-*` and `data-*` attributes from the host element to the native `<input type="range">`.

```html
<aegov-range aria-label="Volume control" data-analytics="volume-slider"></aegov-range>
```

---

## Accessibility

The `aegov-range` component is built with accessibility as a first-class concern.

### Built-in Features

- **Native `<input type="range">`** — a semantic range input is rendered (visually hidden) and receives keyboard focus. All keyboard interactions (arrow keys, Home, End, Page Up/Down) work natively.
- **`role="slider"`** — the native input inherently has slider semantics, which screen readers announce correctly.
- **`aria-valuenow`** — automatically set to the current value for both single and dual-thumb modes.
- **`aria-valuemin` / `aria-valuemax`** — automatically set. In range mode, the low thumb's max is the high thumb's value, and the high thumb's min is the low thumb's value.
- **`aria-orientation`** — set to `"horizontal"` or `"vertical"` matching the `orientation` property.
- **`aria-label`** — in range mode, the low and high inputs are automatically labelled "Range minimum" and "Range maximum" respectively.
- **Focus indicators** — clearly visible focus rings appear on the thumb when the hidden input receives `focus-visible`, using the primary-support-600 colour.
- **Disabled state** — applies reduced opacity and `pointer-events: none` so the slider is both visually and functionally inert.
- **Touch support** — pointer and touch drag handlers provide a smooth mobile experience while maintaining native input as the keyboard-accessible fallback.

### Developer Responsibilities

1. **Provide a label.** Use the `label` property, an `aegov-label` inside `aegov-form-field`, or an `aria-label` attribute so screen readers can identify the slider's purpose.

   ```html
   <aegov-range label="Brightness"></aegov-range>
   <!-- or -->
   <aegov-range aria-label="Brightness level"></aegov-range>
   ```

2. **Colour contrast.** The built-in primary-600 fill colour meets WCAG 2.1 AA contrast requirements against the aeblack-200 track background. If you override colours via CSS, verify a minimum **3:1** contrast ratio for non-text UI elements.

3. **Do not remove focus styles.** The `focus-visible` outlines on the thumb are essential for keyboard navigation. Avoid overriding them with `outline: none`.

---

## Notes

- The component renders one or two native `<input type="range">` elements that are visually hidden but remain keyboard-accessible. The custom thumb and track are purely visual overlays.
- In range mode, clicking on the track moves the closest thumb to the clicked position.
- The `value`, `valueLow`, and `valueHigh` properties are mutable — the component updates them internally during user interaction.
- The `fieldId` property is auto-generated if not provided. In range mode, the two inputs receive IDs of `{fieldId}-low` and `{fieldId}-high`.
- Similarly, the `name` attribute in range mode produces `{name}-low` and `{name}-high` for form submission.
- The vertical orientation height defaults to 200px and can be customised using the `--range-height` CSS custom property on the component.
- The tooltip display mode shows a dark floating label above (horizontal) or beside (vertical) the thumb with a small arrow indicator.
- The `step` property is respected during both keyboard input and pointer drag — values always snap to the nearest valid step.
