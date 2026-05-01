# aegov-label

A semantic `<label>` wrapper used to label form controls. Use it to associate visible text with an input, textarea, select, checkbox, radio, or any other form control. Inside `aegov-form-field`, the parent component automatically wires the label's `for` attribute to the linked input's `field-id`.

## Properties

### for

The ID of the form control this label points to. Reflected as the native `for` attribute. When used inside `aegov-form-field`, this is set automatically.

```html
<aegov-label for="email-input">Email address</aegov-label>
<aegov-input field-id="email-input"></aegov-input>
```

### field-id

Unique ID for the label element. Auto-generated if not provided.

```html
<aegov-label field-id="email-label" for="email-input">Email</aegov-label>
```

### extra-class

Additional CSS classes merged onto the label.

```html
<aegov-label extra-class="font-bold">Important field</aegov-label>
```

## Examples

### Standalone label paired with native input

```html
<aegov-label for="full-name">Full name</aegov-label>
<input id="full-name" type="text" />
```

### Label paired with aegov-input

```html
<aegov-label for="email">Email</aegov-label>
<aegov-input field-id="email" type="email"></aegov-input>
```

### Inside aegov-form-field (auto-wired)

```html
<aegov-form-field>
  <aegov-label>Email</aegov-label>
  <aegov-input type="email"></aegov-input>
</aegov-form-field>
```

### Decorating a checkbox

```html
<aegov-checkbox field-id="terms"></aegov-checkbox>
<aegov-label for="terms">I accept the terms</aegov-label>
```

## RTL Behavior

The component renders a plain `<label>` and contains no directional layout. It inherits text alignment and direction from its surrounding container's `dir` attribute.

## API Reference

### Properties

| Property      | Attribute     | Description                                                                | Type     | Default     |
| ------------- | ------------- | -------------------------------------------------------------------------- | -------- | ----------- |
| `htmlFor`     | `for`         | ID of the linked form control. Set automatically when used in `aegov-form-field`. | `string` | `undefined` |
| `fieldId`     | `field-id`    | Unique ID for the label element. Auto-generated if not provided.           | `string` | `undefined` |
| `extraClass`  | `extra-class` | Additional CSS classes.                                                    | `string` | `undefined` |

### Pass-through Attributes

`aria-*` and `data-*` attributes set on the host are forwarded to the inner `<label>`.

### Slots

| Slot      | Description           |
| --------- | --------------------- |
| (default) | The visible label text |

## Accessibility

### Built-in

- Renders a real `<label>` element. Clicking the label focuses or toggles the linked control (native HTML behavior) when the `for` attribute matches a control's `id`.
- The auto-generated `id` allows other components (e.g. error messages) to reference the label via `aria-describedby` or `aria-labelledby`.

### Developer responsibilities

- Always set `for` (or use `aegov-form-field` which sets it automatically) to link the label to its control. Without this association, screen readers cannot announce the label when the input is focused.
- Keep label text concise and descriptive. Avoid placeholder-only labels — use a visible `aegov-label` paired with the control.

### Notes

- Standalone (without `aegov-form-field`) requires you to set `for` manually to the control's `field-id` or native `id`.
