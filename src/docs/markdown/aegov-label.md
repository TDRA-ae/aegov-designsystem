# Label

<p class="text-lg text-aeblack-500 mb-8">A Label is a semantic `<label>` wrapper used to caption form controls. Use it to associate visible text with an input, textarea, select, checkbox, radio, toggle, or any other form control. When placed inside `aegov-form-field`, the parent automatically wires the label's `for` attribute to the linked input — for standalone usage, set `for` manually so screen readers and click-to-focus behaviour work correctly.</p>

## Introduction

The `aegov-label` component renders a real native `<label>` element with an auto-generated `id`. It is intentionally minimal: it owns no styling beyond an `aegov-label` base class and forwards `aria-*` and `data-*` attributes to the underlying `<label>`. Inside `aegov-form-field`, the parent sets `htmlFor` for you so the label, input, error, and hint message all share the same id graph.

```html
<aegov-form-field>
  <aegov-label>Email address</aegov-label>
  <aegov-input type="email" placeholder="name@domain.ae"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label>Email address</aegov-label>
    <aegov-input type="email" placeholder="name@domain.ae"></aegov-input>
  </aegov-form-field>
</div>

---

## Standalone Usage

Outside `aegov-form-field` you must set the `for` attribute manually so the label points at the linked control's `field-id` (or native `id`). Clicking the label will then focus or toggle the control as expected.

### Paired with aegov-input

```html
<aegov-label for="emirates-id">Emirates ID number</aegov-label>
<aegov-input field-id="emirates-id" placeholder="784-XXXX-XXXXXXX-X"></aegov-input>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-label for="emirates-id">Emirates ID number</aegov-label>
  <aegov-input field-id="emirates-id" placeholder="784-XXXX-XXXXXXX-X"></aegov-input>
</div>

### Paired with a native input

```html
<aegov-label for="full-name">Full name as on passport</aegov-label>
<input id="full-name" type="text" class="aegov-input" />
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-label for="full-name-demo">Full name as on passport</aegov-label>
  <input id="full-name-demo" type="text" class="aegov-input" />
</div>

### Paired with a checkbox

```html
<div class="flex items-center gap-2">
  <aegov-checkbox field-id="terms"></aegov-checkbox>
  <aegov-label for="terms">I accept the terms and privacy notice</aegov-label>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex items-center gap-2">
    <aegov-checkbox field-id="terms"></aegov-checkbox>
    <aegov-label for="terms">I accept the terms and privacy notice</aegov-label>
  </div>
</div>

---

## Auto-wired inside aegov-form-field

When wrapped in `aegov-form-field`, the parent finds the first `aegov-label` and the first form control inside the slot, then writes the control's `field-id` onto the label's `htmlFor` automatically. You only need to author the visible text.

```html
<aegov-form-field>
  <aegov-label>Mobile number</aegov-label>
  <aegov-input type="tel" placeholder="+971 50 000 0000"></aegov-input>
</aegov-form-field>

<aegov-form-field>
  <aegov-label>Date of birth</aegov-label>
  <aegov-datepicker></aegov-datepicker>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label>Mobile number</aegov-label>
    <aegov-input type="tel" placeholder="+971 50 000 0000"></aegov-input>
  </aegov-form-field>
  <div class="mt-6"></div>
  <aegov-form-field>
    <aegov-label>Date of birth</aegov-label>
    <aegov-datepicker></aegov-datepicker>
  </aegov-form-field>
</div>

---

## Custom Styling

Use `extra-class` to apply additional Tailwind utilities — for example to emphasise a required-field label or to mute an optional one. The component does not introduce decorative markers; combine `extra-class` with the appropriate utility classes when needed.

```html
<aegov-label extra-class="font-semibold text-aeblack-900" for="passport-number">
  Passport number
</aegov-label>
<aegov-input field-id="passport-number"></aegov-input>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-label extra-class="font-semibold text-aeblack-900" for="passport-number">
    Passport number
  </aegov-label>
  <aegov-input field-id="passport-number"></aegov-input>
</div>

---

## RTL Support

The component renders a plain `<label>` element with no directional layout of its own. It inherits text alignment and writing direction from the surrounding container's `dir` attribute, so it works without any extra configuration in RTL contexts.

```html
<div dir="rtl">
  <aegov-form-field>
    <aegov-label>رقم الهوية الإماراتية</aegov-label>
    <aegov-input type="text" placeholder="784-XXXX-XXXXXXX-X"></aegov-input>
  </aegov-form-field>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label>رقم الهوية الإماراتية</aegov-label>
    <aegov-input type="text" placeholder="784-XXXX-XXXXXXX-X"></aegov-input>
  </aegov-form-field>
  <div class="mt-6"></div>
  <aegov-form-field>
    <aegov-label>رقم الجوال</aegov-label>
    <aegov-input type="tel" placeholder="+971 50 000 0000"></aegov-input>
  </aegov-form-field>
</div>

---

## API Reference

### Properties

| Property     | Attribute     | Description                                                                                 | Type     | Default     |
| ------------ | ------------- | ------------------------------------------------------------------------------------------- | -------- | ----------- |
| `htmlFor`    | `for`         | ID of the linked form control. Set automatically when used inside `aegov-form-field`.       | `string` | `undefined` |
| `fieldId`    | `field-id`    | DOM `id` for the label element. Auto-generated if omitted.                                  | `string` | _generated_ |
| `extraClass` | `extra-class` | Additional CSS classes merged onto the inner `<label>` element.                             | `string` | `undefined` |

### Slots

| Slot        | Description                                                                  |
| ----------- | ---------------------------------------------------------------------------- |
| _(default)_ | The visible label text. Accepts plain text or inline HTML such as `<strong>`. |

### Events

The component emits no custom events.

### Pass-through Attributes

| Attribute group  | Forwarded?                       | Where to apply                                                                  |
| ---------------- | -------------------------------- | ------------------------------------------------------------------------------- |
| `aria-*`         | Yes — to inner `<label>`         | Set on `<aegov-label>`; forwarded automatically.                                |
| `data-*`         | Yes — to inner `<label>`         | Set on `<aegov-label>`; forwarded automatically.                                |
| `title`          | Yes — to inner `<label>`         | Set on `<aegov-label>` to provide a tooltip on the inner element.                |
| `class`, `style` | Allowed — host element           | Use `extra-class` to add classes to the inner `<label>`.                         |
| `id`             | Use `field-id`                   | The inner `<label>` receives the value of `field-id` (auto-generated by default). |

---

## Accessibility

### Built-in behaviour

- Renders a real native `<label>` element. Clicking the label focuses or toggles the linked control by default — provided `for` matches a control's `id`.
- Auto-generates a unique `id` so other components (error messages, hint text) can reference the label via `aria-labelledby` or `aria-describedby` if needed.
- When used inside `aegov-form-field`, the parent wires `for` to the linked control automatically.

### Developer responsibilities

- Always set `for` (or rely on `aegov-form-field`) to associate the label with its control. Without this association, screen readers cannot announce the label when the input is focused, and clicking the label will not focus the control.
- Keep label text concise and descriptive. Avoid placeholder-only labels — placeholders disappear on input and do not satisfy WCAG label requirements.
- For required fields, mark the requirement clearly in the label text or via `aegov-form-field`'s required indicator. Do not rely on colour alone to communicate &ldquo;required&rdquo;.
- Avoid putting interactive elements (buttons, links) inside the label slot — clicks intended for the inner control will be intercepted.
