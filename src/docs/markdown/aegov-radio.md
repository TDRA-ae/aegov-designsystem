# aegov-radio

A native radio button wrapped in a labeled, design-system-aligned control. Use radios for single-select choices among 2 or more mutually exclusive options. Pair with `aegov-radio-group` to share a `name`, propagate sizing, and emit a single change event when the selection changes.

## Properties

### field-id

Unique ID applied to the underlying `<input>`. Auto-generated as `aegov-radio-{n}` when omitted.

```html
<aegov-radio field-id="size-m" name="size" value="m" label="Medium"></aegov-radio>
```

### name / value

Standard form attributes forwarded to the native input. All radios that share a single selection scope must share the same `name`. When wrapped in `aegov-radio-group`, the group's `name` is propagated to every child automatically.

```html
<aegov-radio name="plan" value="basic" label="Basic"></aegov-radio>
<aegov-radio name="plan" value="pro" label="Pro"></aegov-radio>
```

### is-checked

Whether the radio is selected. Reflects to the host attribute and the native `checked` property.

```html
<aegov-radio name="plan" value="pro" is-checked label="Pro (default)"></aegov-radio>
```

### is-disabled

Disables the radio.

```html
<aegov-radio is-disabled label="Unavailable"></aegov-radio>
```

### is-required

Marks the radio as required and sets `aria-required="true"`.

```html
<aegov-radio is-required label="Required option"></aegov-radio>
```

### label

Renders an associated `<label>` element wrapping the input.

```html
<aegov-radio name="plan" value="basic" label="Basic plan"></aegov-radio>
```

### description

Helper text displayed below the label and exposed via `aria-describedby`. Only renders when `label` is also set.

```html
<aegov-radio
  name="plan"
  value="pro"
  label="Pro"
  description="Includes priority support."
></aegov-radio>
```

### size

Token: `xs`, `sm`, `base`, `lg`, `xl`. Also accepts a Tailwind-style responsive string.

```html
<aegov-radio size="lg" label="Large"></aegov-radio>
```

### extra-class

Additional classes merged onto the wrapper div.

```html
<aegov-radio extra-class="my-2" label="Custom"></aegov-radio>
```

## Sizes

`size` accepts a single token or a responsive string using Tailwind-style breakpoint prefixes (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`).

```html
<aegov-radio size="sm" label="Small"></aegov-radio>
<aegov-radio size="base" label="Base"></aegov-radio>
<aegov-radio size="lg" label="Large"></aegov-radio>

<!-- Responsive: small on mobile, base from md, large from lg -->
<aegov-radio size="sm md:base lg:lg" label="Responsive"></aegov-radio>
```

## Examples

### Default group

```html
<aegov-radio-group name="plan" label="Choose a plan">
  <aegov-radio value="basic" label="Basic"></aegov-radio>
  <aegov-radio value="pro" label="Pro"></aegov-radio>
  <aegov-radio value="enterprise" label="Enterprise"></aegov-radio>
</aegov-radio-group>
```

### Group with descriptions

```html
<aegov-radio-group name="plan" label="Choose a plan">
  <aegov-radio value="basic" label="Basic" description="Free forever."></aegov-radio>
  <aegov-radio value="pro" label="Pro" description="Priority support included."></aegov-radio>
</aegov-radio-group>
```

### Required in a form

```html
<form>
  <aegov-radio-group name="contact" label="Preferred contact method">
    <aegov-radio value="email" label="Email" is-required></aegov-radio>
    <aegov-radio value="phone" label="Phone"></aegov-radio>
  </aegov-radio-group>
</form>
```

### Group disabled

```html
<aegov-radio-group name="plan" label="Locked" is-disabled>
  <aegov-radio value="a" label="A" is-checked></aegov-radio>
  <aegov-radio value="b" label="B"></aegov-radio>
</aegov-radio-group>
```

### Horizontal group

```html
<aegov-radio-group name="lang" label="Language" orientation="horizontal">
  <aegov-radio value="en" label="English"></aegov-radio>
  <aegov-radio value="ar" label="Arabic"></aegov-radio>
</aegov-radio-group>
```

## RTL Behavior

The control is inline-flow and uses logical layout. When the document or container has `dir="rtl"`, the input switches to the right of the label automatically. Description text follows the label in reading order.

## API Reference

### Properties — `aegov-radio`

| Property      | Attribute      | Description                                                                | Type      | Default     |
| ------------- | -------------- | -------------------------------------------------------------------------- | --------- | ----------- |
| `fieldId`     | `field-id`     | Unique ID for the native input. Auto-generated if not provided.            | `string`  | auto        |
| `name`        | `name`         | Native input `name`. Required for native single-select grouping.           | `string`  | `undefined` |
| `value`       | `value`        | Native input `value`.                                                      | `string`  | `undefined` |
| `isChecked`   | `is-checked`   | Whether the radio is selected. Reflected.                                  | `boolean` | `false`     |
| `size`        | `size`         | Size token or responsive string.                                           | `string`  | `'base'`    |
| `isDisabled`  | `is-disabled`  | Disables the input. Reflected.                                             | `boolean` | `false`     |
| `isRequired`  | `is-required`  | Marks the input as required and sets `aria-required="true"`.               | `boolean` | `false`     |
| `label`       | `label`        | Visible label text.                                                        | `string`  | `undefined` |
| `description` | `description`  | Helper text linked via `aria-describedby`. Only rendered when `label` is set. | `string`  | `undefined` |
| `extraClass`  | `extra-class`  | Additional CSS classes on the wrapper.                                     | `string`  | `undefined` |

### Sub-component: aegov-radio-group

A `fieldset[role="radiogroup"]` that shares a single `name` across its children, propagates size, and centralizes selection.

#### Properties — `aegov-radio-group`

| Property      | Attribute     | Description                                                                | Type      | Default       |
| ------------- | ------------- | -------------------------------------------------------------------------- | --------- | ------------- |
| `variant`     | `variant`     | Visual variant: `default`, `list`, `cards`, `pills`.                       | `string`  | `'default'`   |
| `orientation` | `orientation` | Stack direction: `vertical` or `horizontal`.                               | `string`  | `'vertical'`  |
| `label`       | `label`       | Optional `<legend>` text for accessibility.                                | `string`  | `undefined`   |
| `size`        | `size`        | Size token or responsive string. Propagated to children.                   | `string`  | `'base'`      |
| `name`        | `name`        | **Required.** Shared `name` for all child radios.                          | `string`  | —             |
| `isDisabled`  | `is-disabled` | Disables every radio via `fieldset[disabled]`.                             | `boolean` | `false`       |
| `extraClass`  | `extra-class` | Additional classes on the rendered `fieldset`.                             | `string`  | `undefined`   |

The group enforces single-select by listening for `aegovRadioChange` and clearing `isChecked` on every other child when one is selected. The native `name` ensures the same behavior at the DOM level.

### Pass-through Attributes

`aria-*` and `data-*` attributes set on `aegov-radio` are forwarded to the underlying `<input>`. Additional forwarded attributes: `form`, `tabindex`, `autofocus`, `title`.

### Events

| Component             | Event                    | Detail                                          | Description                                                                                       |
| --------------------- | ------------------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `aegov-radio`         | `aegovRadioChange`       | `{ checked: boolean; value?: string }`          | Fires when the radio's checked state changes.                                                     |
| `aegov-radio-group`   | `aegovRadioGroupChange`  | `{ value: string \| undefined }`                | Fires when the selected value in the group changes. `value` is the newly selected radio's value.  |

#### Event listening example

```html
<aegov-radio-group id="plans" name="plan" label="Plan">
  <aegov-radio value="basic" label="Basic"></aegov-radio>
  <aegov-radio value="pro" label="Pro"></aegov-radio>
</aegov-radio-group>

<script>
  document.getElementById('plans').addEventListener('aegovRadioGroupChange', (e) => {
    console.log('selected:', e.detail.value);
  });
</script>
```

### Slots

| Component             | Slot      | Description                                          |
| --------------------- | --------- | ---------------------------------------------------- |
| `aegov-radio`         | (none)    | Use the `label` and `description` props for content. |
| `aegov-radio-group`   | (default) | One or more `aegov-radio` children.                  |

## Accessibility

### Built-in

- Uses a native `<input type="radio">` so screen readers and keyboards behave with no extra ARIA wiring.
- Wrapping `<label>` makes the entire label/description region clickable and announced.
- `description` is linked to the input via `aria-describedby`.
- `is-required` sets `aria-required="true"` in addition to native `required`.
- Groups render a `<fieldset role="radiogroup">` with an optional `<legend>` (when `label` is set) so the group is announced as a single labeled radio set.

### Developer responsibilities

- Always provide a `label`. Without one, the radio is reachable but unlabeled.
- Provide a `name` on the group (or matching `name`s on standalone radios) so single-select semantics work both at the DOM level and at submission time.
- Provide a `label` on the group so the `<legend>` describes the set.

### Notes

- Keyboard support is fully native within a radio group: Tab moves into/out of the group, Arrow keys move between radios and select on focus, Space activates the focused radio.
