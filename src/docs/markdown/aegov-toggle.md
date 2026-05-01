# aegov-toggle

A switch-style on/off control built on a native checkbox with `role="switch"`. Use `aegov-toggle` for binary settings where the change takes effect immediately (e.g. enabling notifications, toggling a preference) — not for form submission choices that should map to checkboxes.

## Properties

### field-id

Unique ID applied to the underlying `<input>`. Auto-generated as `aegov-toggle-{n}` when omitted.

```html
<aegov-toggle field-id="notifications" label="Email notifications"></aegov-toggle>
```

### name / value

Standard form attributes forwarded to the native input.

```html
<aegov-toggle name="notify" value="on" label="Notifications"></aegov-toggle>
```

### is-checked

Whether the toggle is on. Reflects to the host attribute, the native `checked` property, and `aria-checked`.

```html
<aegov-toggle is-checked label="On by default"></aegov-toggle>
```

### is-disabled

Disables the toggle.

```html
<aegov-toggle is-disabled label="Locked"></aegov-toggle>
```

### is-required

Marks the toggle as required and sets `aria-required="true"`.

```html
<aegov-toggle is-required label="Must be on"></aegov-toggle>
```

### label

Visible label text rendered after the switch.

```html
<aegov-toggle label="Receive newsletters"></aegov-toggle>
```

### description

Helper text displayed below the label and exposed via `aria-describedby`. Only renders when `label` is also set.

```html
<aegov-toggle
  label="Push notifications"
  description="We will only ping you for important updates."
></aegov-toggle>
```

### size

Token: `xs`, `sm`, `base`, `lg`, `xl`. Also accepts a Tailwind-style responsive string.

```html
<aegov-toggle size="lg" label="Large"></aegov-toggle>
```

## Sizes

`size` accepts a single token or a responsive string using Tailwind-style breakpoint prefixes (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`).

```html
<aegov-toggle size="sm" label="Small"></aegov-toggle>
<aegov-toggle size="base" label="Base"></aegov-toggle>
<aegov-toggle size="lg" label="Large"></aegov-toggle>

<!-- Responsive: small on mobile, base from md, large from lg -->
<aegov-toggle size="sm md:base lg:lg" label="Responsive"></aegov-toggle>
```

## Examples

### Default

```html
<aegov-toggle label="Enable notifications"></aegov-toggle>
```

### With description

```html
<aegov-toggle
  label="Marketing emails"
  description="Receive product news roughly once a month."
></aegov-toggle>
```

### Pre-checked

```html
<aegov-toggle is-checked label="Auto-save"></aegov-toggle>
```

### Disabled

```html
<aegov-toggle is-disabled label="Beta features (coming soon)"></aegov-toggle>
```

### With icons inside the thumb

Provide icons via the `icon-checked` and `icon-unchecked` slots. Both slots are optional; supplying either one enables the icon area inside the thumb.

```html
<aegov-toggle label="Dark mode">
  <span slot="icon-unchecked">☼</span>
  <span slot="icon-checked">☾</span>
</aegov-toggle>
```

### In a form

```html
<form>
  <aegov-toggle name="newsletter" value="on" label="Subscribe to newsletter"></aegov-toggle>
</form>
```

## RTL Behavior

The control is inline-flow and uses logical layout. When the document or container has `dir="rtl"`, the switch and label automatically flip — the switch ends up on the right and the label on the left, with the thumb sliding in the appropriate direction. No props need to change.

## API Reference

### Properties

| Property       | Attribute      | Description                                                                          | Type      | Default     |
| -------------- | -------------- | ------------------------------------------------------------------------------------ | --------- | ----------- |
| `fieldId`      | `field-id`     | Unique ID for the native input. Auto-generated if not provided.                      | `string`  | auto        |
| `name`         | `name`         | Native input `name`.                                                                 | `string`  | `undefined` |
| `value`        | `value`        | Native input `value`.                                                                | `string`  | `undefined` |
| `isChecked`    | `is-checked`   | Whether the toggle is on. Reflected.                                                 | `boolean` | `false`     |
| `size`         | `size`         | Size token or responsive string.                                                     | `string`  | `'base'`    |
| `isDisabled`   | `is-disabled`  | Disables the input. Reflected.                                                       | `boolean` | `false`     |
| `isRequired`   | `is-required`  | Marks the input as required and sets `aria-required="true"`.                         | `boolean` | `false`     |
| `label`        | `label`        | Visible label text.                                                                  | `string`  | `undefined` |
| `description`  | `description`  | Helper text linked via `aria-describedby`. Only rendered when `label` is set.        | `string`  | `undefined` |

### Pass-through Attributes

`aria-*` and `data-*` attributes set on `aegov-toggle` are forwarded to the underlying `<input>`. Additional forwarded attributes: `form`, `tabindex`, `autofocus`, `title`.

### Events

| Event                | Detail                                       | Description                                       |
| -------------------- | -------------------------------------------- | ------------------------------------------------- |
| `aegovToggleChange`  | `{ checked: boolean; value?: string }`       | Fires whenever the toggle's state changes.        |

#### Event listening example

```html
<aegov-toggle id="notify" label="Notifications"></aegov-toggle>

<script>
  document.getElementById('notify').addEventListener('aegovToggleChange', (e) => {
    console.log('toggle is now', e.detail.checked ? 'on' : 'off');
  });
</script>
```

### Slots

| Slot              | Description                                                                |
| ----------------- | -------------------------------------------------------------------------- |
| `icon-unchecked`  | Icon shown inside the thumb when the toggle is off.                        |
| `icon-checked`    | Icon shown inside the thumb when the toggle is on.                         |

## Accessibility

### Built-in

- Uses a native `<input type="checkbox">` decorated with `role="switch"` so assistive tech announces it as a switch (e.g. "On" / "Off") rather than a generic checkbox.
- `aria-checked` is set explicitly to `"true"` or `"false"` and stays in sync with the native `checked` state.
- Wrapping `<label>` makes the switch and its label/description fully clickable and announced together.
- `description` is linked via `aria-describedby`.
- `is-required` sets `aria-required="true"` in addition to native `required`.
- Decorative track/thumb elements are marked `aria-hidden="true"`.

### Developer responsibilities

- Always provide a `label`. Without one, the switch is reachable but unlabeled.
- Use a toggle for immediate state changes — if a change requires confirmation or only takes effect on submit, prefer `aegov-checkbox`.

### Notes

- Keyboard support is fully native: focus the switch and press Space to flip it. Tab moves to the next focusable element.
