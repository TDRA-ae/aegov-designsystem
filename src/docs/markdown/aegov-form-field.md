# aegov-form-field

A wrapper that groups a label with a form control (input, textarea, select, checkbox, range, progress, or OTP). It auto-links the child `aegov-label`'s `for` attribute to the child control's `field-id`, removing the need to manage IDs manually.

## Properties

### field-id

The `id` applied to the wrapper `<div>`. Auto-generated as `aegov-form-field-{n}` if not provided.

```html
<aegov-form-field field-id="email-field">
  <aegov-label>Email</aegov-label>
  <aegov-input type="email"></aegov-input>
</aegov-form-field>
```

### extra-class

Additional CSS classes applied to the wrapper.

```html
<aegov-form-field extra-class="mb-6">
  <aegov-label>Phone</aegov-label>
  <aegov-input type="tel"></aegov-input>
</aegov-form-field>
```

## Sizes

`aegov-form-field` is a layout wrapper and does not expose a `size` prop. Sizing is controlled on the child control (e.g., `aegov-input`) via its own `size` prop, including responsive strings.

```html
<aegov-form-field>
  <aegov-label>Search</aegov-label>
  <aegov-input size="sm md:base lg:lg"></aegov-input>
</aegov-form-field>
```

## Examples

### Label + input

```html
<aegov-form-field>
  <aegov-label>Full name</aegov-label>
  <aegov-input name="name" is-required="true"></aegov-input>
</aegov-form-field>
```

### Label + textarea

```html
<aegov-form-field>
  <aegov-label>Comments</aegov-label>
  <aegov-textarea maxlength="500"></aegov-textarea>
</aegov-form-field>
```

### Label + select

```html
<aegov-form-field>
  <aegov-label>Country</aegov-label>
  <aegov-select>
    <aegov-select-option value="ae">United Arab Emirates</aegov-select-option>
    <aegov-select-option value="sa">Saudi Arabia</aegov-select-option>
  </aegov-select>
</aegov-form-field>
```

### Label + checkbox

```html
<aegov-form-field>
  <aegov-label>I agree to the terms</aegov-label>
  <aegov-checkbox></aegov-checkbox>
</aegov-form-field>
```

### Label + range

```html
<aegov-form-field>
  <aegov-label>Volume</aegov-label>
  <aegov-range min="0" max="100" value="40"></aegov-range>
</aegov-form-field>
```

### Label + progress

```html
<aegov-form-field>
  <aegov-label>Profile completion</aegov-label>
  <aegov-progress value="60" counter="trailing" counter-suffix="%"></aegov-progress>
</aegov-form-field>
```

### Label + OTP

```html
<aegov-form-field>
  <aegov-label>One-time code</aegov-label>
  <aegov-otp length="6"></aegov-otp>
</aegov-form-field>
```

### With helper / error text

```html
<aegov-form-field>
  <aegov-label>Email</aegov-label>
  <aegov-input type="email" aria-describedby="email-help"></aegov-input>
  <p id="email-help">We'll never share your address.</p>
</aegov-form-field>
```

## RTL Behavior

`aegov-form-field` is a thin block-level wrapper without horizontal directional styling, so it renders identically in LTR and RTL. The directionality of the inner controls follows their own behavior and the surrounding `dir` attribute.

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID for the wrapper `<div>`. Auto-generated if not provided. | `string` | auto |
| `extraClass` | `extra-class` | Additional CSS classes on the wrapper. | `string` | `undefined` |

### Pass-through Attributes

`aria-*` and `data-*` attributes set on the host are forwarded to the wrapper `<div>`. There are no additional pass-through attributes.

### Events

`aegov-form-field` does not emit any custom events. Listen for events on the inner control (`aegov-input`, `aegov-textarea`, etc.).

### Event listening example

```html
<aegov-form-field>
  <aegov-label>Email</aegov-label>
  <aegov-input id="email" type="email"></aegov-input>
</aegov-form-field>
<script>
  document.getElementById('email').addEventListener('aegovInputChange', (e) => {
    console.log(e.detail.value);
  });
</script>
```

### Slots

| Slot | Description |
| --- | --- |
| (default) | The label (`aegov-label`) and form control (`aegov-input`, `aegov-textarea`, `aegov-select`, `aegov-checkbox`, `aegov-range`, `aegov-progress`, `aegov-otp`) — and optionally helper or error text. |

## Accessibility

### Built-in

- After mount and on every update, the form-field queries its slotted children for an `aegov-label` and a supported control. If both are present, the label's `htmlFor` is set to the control's `field-id`, producing a correctly associated `<label for="...">`.
- The wrapper preserves user-set `aria-*` and `data-*` attributes via pass-through, allowing things like `aria-labelledby` or `role="group"` when grouping multiple inputs.

### Developer responsibilities

- Place exactly one `aegov-label` and one supported control inside each form-field. With multiple controls, only the first matching one (in this priority: input → textarea → select → checkbox → range → progress → otp) will receive the label association.
- For helper or error text, render it inside the form-field with a stable `id` and reference it from the control with `aria-describedby`.
- For required fields, set `is-required` on the inner control rather than relying on visual cues alone.

### Notes

- The form-field wrapper has no implicit ARIA role. If you are creating a fieldset/legend pattern (e.g., grouping radio buttons), consider adding `role="group"` and `aria-labelledby` referencing the label's id.
- Children are queried via `querySelector('aegov-{tag}')` — only the first matching descendant is linked to the label.
