# aegov-range

A slider for choosing a numeric value or a numeric range. Built on the native `<input type="range">` for full keyboard, screen-reader, and form support, with an extra interactive track and thumb layer for richer styling and dual-thumb selection.

## Properties

### mode

`single` shows one thumb; `range` shows two thumbs (a low/high pair) for selecting a span.

```html
<aegov-range mode="single" value="40"></aegov-range>
<aegov-range mode="range" value-low="20" value-high="80"></aegov-range>
```

### min / max / step

Numeric bounds and increment.

```html
<aegov-range min="0" max="200" step="5" value="50"></aegov-range>
```

### value

Current value in single mode.

```html
<aegov-range value="35"></aegov-range>
```

### value-low / value-high

Low and high thumb values in range mode. The component clamps `valueLow` to at most `valueHigh - step` and `valueHigh` to at least `valueLow + step`.

```html
<aegov-range mode="range" min="0" max="100" value-low="25" value-high="75"></aegov-range>
```

### display

Controls how the current value is shown.

- `none` (default): no value display
- `tooltip`: small floating bubble over the thumb
- `thumb`: value rendered inside the thumb
- `full`: thumb value plus min/max labels at the ends of the track

```html
<aegov-range display="tooltip"></aegov-range>
<aegov-range display="full" min="0" max="100"></aegov-range>
```

### orientation

`horizontal` (default) or `vertical`.

```html
<aegov-range orientation="vertical" value="60"></aegov-range>
```

### size

Track size token. Accepts `xs`, `sm`, `base`, `lg`, `xl`, or a responsive string. Thumb size remains constant.

```html
<aegov-range size="lg"></aegov-range>
<aegov-range size="sm md:base lg:lg"></aegov-range>
```

### label

Optional label text rendered above the slider.

```html
<aegov-range label="Volume" value="40"></aegov-range>
```

### is-disabled / is-required

```html
<aegov-range is-disabled value="50"></aegov-range>
<aegov-range is-required label="Pick a number"></aegov-range>
```

### name

Form field name. In range mode, the two inputs are submitted as `${name}-low` and `${name}-high`.

```html
<aegov-range mode="range" name="price" value-low="100" value-high="500"></aegov-range>
```

### field-id

Auto-generated as `aegov-range-{n}`. In range mode, the inner inputs use `${fieldId}-low` and `${fieldId}-high`.

```html
<aegov-range field-id="rng-1"></aegov-range>
```

## Sizes

```html
<aegov-range size="xs"></aegov-range>
<aegov-range size="sm"></aegov-range>
<aegov-range size="base"></aegov-range>
<aegov-range size="lg"></aegov-range>
<aegov-range size="xl"></aegov-range>

<aegov-range size="sm md:base lg:lg"></aegov-range>
```

## Examples

### Single thumb

```html
<aegov-range min="0" max="100" value="40" label="Brightness"></aegov-range>
```

### Dual thumb (range)

```html
<aegov-range mode="range" min="0" max="1000" step="10" value-low="100" value-high="700" label="Price range"></aegov-range>
```

### With value display

```html
<aegov-range display="tooltip" value="60"></aegov-range>
<aegov-range display="thumb" value="60"></aegov-range>
<aegov-range display="full" min="0" max="100" value="60"></aegov-range>
```

### Listening to changes

```html
<aegov-range id="vol" min="0" max="100" value="20"></aegov-range>
<script>
  const r = document.getElementById('vol');
  r.addEventListener('aegovRangeInput', (e) => console.log('input', e.detail.value));
  r.addEventListener('aegovRangeChange', (e) => console.log('committed', e.detail.value));
</script>
```

### Vertical orientation

```html
<aegov-range orientation="vertical" min="0" max="100" value="50"></aegov-range>
```

## RTL Behavior

In `dir="rtl"` containers, the horizontal track is mirrored: the lower value sits at the right edge and increases toward the left. Pointer interaction is mapped logically (clicking near the start of the track always moves toward `min`). Native input semantics — including arrow-key direction — follow the browser's RTL behavior. Vertical orientation is unaffected by `dir`.

## API Reference

### Properties

| Property      | Attribute      | Description                                              | Type                | Default        |
| ------------- | -------------- | -------------------------------------------------------- | ------------------- | -------------- |
| `fieldId`     | `field-id`     | Unique id (auto-generated if omitted).                   | `string`            | `undefined`    |
| `name`        | `name`         | Form field name.                                         | `string`            | `undefined`    |
| `mode`        | `mode`         | `'single'` or `'range'`.                                 | `RangeMode`         | `'single'`     |
| `value`       | `value`        | Single-mode value.                                       | `number`            | `50`           |
| `valueLow`    | `value-low`    | Low thumb value in range mode.                           | `number`            | `25`           |
| `valueHigh`   | `value-high`   | High thumb value in range mode.                          | `number`            | `75`           |
| `min`         | `min`          | Minimum.                                                 | `number`            | `0`            |
| `max`         | `max`          | Maximum.                                                 | `number`            | `100`          |
| `step`        | `step`         | Step increment.                                          | `number`            | `1`            |
| `display`     | `display`      | `'none' \| 'tooltip' \| 'thumb' \| 'full'`.              | `RangeDisplay`      | `'none'`       |
| `orientation` | `orientation`  | `'horizontal' \| 'vertical'`.                            | `RangeOrientation`  | `'horizontal'` |
| `size`        | `size`         | Track size (responsive supported).                       | `string`            | `'base'`       |
| `label`       | `label`        | Optional label text.                                     | `string`            | `undefined`    |
| `isDisabled`  | `is-disabled`  | Disables the slider.                                     | `boolean`           | `false`        |
| `isRequired`  | `is-required`  | Marks single-mode input as required.                     | `boolean`           | `false`        |
| `extraClass`  | `extra-class`  | Additional CSS classes.                                  | `string`            | `undefined`    |

### Pass-through Attributes

`aria-*`, `data-*`, plus the explicit list `tabindex`, `autofocus`, `title`, `form` are forwarded to the inner native `<input type="range">` (single mode only).

### Events

| Event              | Description                                          | Detail                                                        |
| ------------------ | ---------------------------------------------------- | ------------------------------------------------------------- |
| `aegovRangeInput`  | Fires continuously during drag / on each keystroke.  | `{ value?: number; valueLow?: number; valueHigh?: number }`   |
| `aegovRangeChange` | Fires when the value is committed (release / change).| `{ value?: number; valueLow?: number; valueHigh?: number }`   |

### Event listening example

```html
<aegov-range id="r" min="0" max="100" value="20"></aegov-range>
<script>
  const r = document.getElementById('r');
  r.addEventListener('aegovRangeInput', (e) => {
    console.log('live', e.detail);
  });
  r.addEventListener('aegovRangeChange', (e) => {
    console.log('committed', e.detail);
  });
</script>
```

## Accessibility

### Built-in

- The slider uses the native `<input type="range">` element, so it is fully focusable, keyboard-operable (arrow keys, Home/End, Page Up/Down), and reported as a slider role to assistive tech.
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and `aria-orientation` are wired automatically.
- In range mode the two thumbs carry distinct `aria-label`s ("Range minimum" / "Range maximum") and are individually focusable.

### Developer responsibilities

- Provide a label via the `label` prop, an `aria-label` on the host, or an external `aegov-label` linked to `field-id` so screen readers announce what the slider controls.
- Consider adding `aria-valuetext` via pass-through if the numeric value benefits from a unit (e.g. "30 percent").

### Notes

- In dual-thumb mode the low and high inputs are constrained on every change so they cannot cross. If you set conflicting `value-low` / `value-high` props at runtime, the next user interaction snaps them back into a valid configuration.
- Both the visual layer and the underlying native input emit; `aegovRangeInput` fires for every step (including pointer drag), while `aegovRangeChange` fires once per commit.
