# aegov-progress

A progress bar for indicating completion of a task. Supports determinate values, an indeterminate (loading) state, an optional counter (top or trailing), and a description line. Renders a hidden native `<progress>` element for assistive technology.

## Properties

### value

Current progress value. When omitted, the component renders an indeterminate animated state.

```html
<aegov-progress value="40"></aegov-progress>
<aegov-progress></aegov-progress> <!-- indeterminate -->
```

### max

Maximum value. Defaults to `100`.

```html
<aegov-progress value="3" max="10"></aegov-progress>
```

### height

Track height using the Tailwind spacing scale (each unit = 0.25rem). Default `"2"` = `0.5rem` (8px).

```html
<aegov-progress value="50" height="1"></aegov-progress>   <!-- 4px -->
<aegov-progress value="50" height="2"></aegov-progress>   <!-- 8px (default) -->
<aegov-progress value="50" height="3"></aegov-progress>   <!-- 12px -->
<aegov-progress value="50" height="4"></aegov-progress>   <!-- 16px -->
```

### counter

Placement of the numeric counter. Accepts `top` or `trailing`. Hidden when not set, and always hidden in the indeterminate state.

```html
<aegov-progress value="50" counter="trailing"></aegov-progress>
<aegov-progress value="50" counter="top"></aegov-progress>
```

### counter-suffix

Suffix appended directly to the counter value with no spacing.

```html
<aegov-progress value="50" counter="trailing" counter-suffix="%"></aegov-progress>
<!-- renders: 50% -->

<aegov-progress value="3" max="10" counter="trailing" counter-suffix="/10"></aegov-progress>
<!-- renders: 3/10 -->
```

### description

Description text rendered as a paragraph below the bar.

```html
<aegov-progress value="40" description="Uploading your file..."></aegov-progress>
```

### field-id

ID applied to the hidden native `<progress>`. Auto-generated as `aegov-progress-{n}` if not provided.

```html
<aegov-progress value="40" field-id="upload-progress"></aegov-progress>
```

### extra-class

Additional CSS classes applied to the wrapper.

```html
<aegov-progress value="40" extra-class="my-4"></aegov-progress>
```

## Sizes

`aegov-progress` does not have a `size` prop. Use `height` (Tailwind spacing scale) to control the bar thickness:

```html
<aegov-progress value="50" height="1.5"></aegov-progress>
<aegov-progress value="50" height="2"></aegov-progress>
<aegov-progress value="50" height="3"></aegov-progress>
```

## Examples

### Basic determinate bar

```html
<aegov-progress value="60"></aegov-progress>
```

### With trailing counter and suffix

```html
<aegov-progress value="75" counter="trailing" counter-suffix="%"></aegov-progress>
```

### With top counter

```html
<aegov-progress value="3" max="10" counter="top" counter-suffix="/10"></aegov-progress>
```

### Indeterminate (loading)

```html
<aegov-progress description="Loading, please wait..."></aegov-progress>
```

### With description

```html
<aegov-progress
  value="40"
  counter="trailing"
  counter-suffix="%"
  description="Uploading 2 of 5 files"
></aegov-progress>
```

### Inside an aegov-form-field

```html
<aegov-form-field>
  <aegov-label>Profile completeness</aegov-label>
  <aegov-progress value="80" counter="trailing" counter-suffix="%"></aegov-progress>
</aegov-form-field>
```

## RTL Behavior

The progress fill animates from the start edge of the track, so it grows right-to-left in RTL contexts automatically. The `top` counter renders above the track and follows the document's text direction. The `trailing` counter sits at the end edge of the row and uses Tailwind logical spacing, naturally flipping in RTL.

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID for the hidden native `<progress>`. Auto-generated if not provided. | `string` | auto |
| `value` | `value` | Current progress value. Omit for indeterminate. | `number` | `undefined` |
| `max` | `max` | Maximum value. | `number` | `100` |
| `height` | `height` | Tailwind spacing-scale unit for track height. | `string` | `'2'` |
| `counter` | `counter` | Counter placement. | `'trailing' \| 'top'` | `undefined` |
| `counterSuffix` | `counter-suffix` | Suffix appended to the counter (no spacing). | `string` | `''` |
| `description` | `description` | Description paragraph below the bar. | `string` | `undefined` |
| `extraClass` | `extra-class` | Additional CSS classes on the wrapper. | `string` | `undefined` |

### Pass-through Attributes

`aria-*` and `data-*` attributes set on the host are forwarded to the hidden native `<progress>`. The following attributes are also forwarded when set on the host:

| Attribute | Notes |
| --- | --- |
| `tabindex` | Custom tab order |
| `title` | Native tooltip |
| `form` | Associate with a form by id |

### Events

`aegov-progress` does not emit any custom events.

### Event listening example

`aegov-progress` is a display component and emits no events. To react to progress changes, observe the `value` prop in your application code or listen to the underlying source of progress (e.g., a fetch / upload).

### Slots

`aegov-progress` does not expose any slots — the counter and description are configured via props.

## Accessibility

### Built-in

- A hidden native `<progress>` element with the same `value`/`max` is always rendered, providing semantic progress reporting to assistive technologies.
- The visual track is marked `aria-hidden="true"` so screen readers don't announce duplicate visuals.
- When `value` is omitted, the native `<progress>` is rendered without a `value` attribute, putting it into the indeterminate state.
- When a `description` is provided, it renders as a `<p>` adjacent to the track and can be associated with the progress via `aria-describedby` (set on the host through pass-through if needed).

### Developer responsibilities

- Provide a label for the progress bar via `aegov-label` (inside `aegov-form-field`), `aria-label`, or `aria-labelledby` so screen-reader users know what the progress represents.
- For long-running indeterminate operations, consider switching to a determinate value once known, so users can estimate completion.
- Use the `description` prop or a sibling element with `aria-live="polite"` to announce state changes (e.g., "Upload complete").

### Notes

- The visible counter is purely decorative — the percentage is also encoded in the native `<progress>` element. To customize what assistive tech announces, use `aria-valuetext` via pass-through (`aria-*` attributes are always forwarded).
- The `counter-suffix` is appended without spacing; include any leading space or unit yourself (e.g., `" MB"`).
- `height` accepts a Tailwind spacing-scale string (`"1"`, `"1.5"`, `"2"`, `"3"`, etc.); non-numeric values fall back to the default `0.5rem`.
