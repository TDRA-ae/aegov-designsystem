# Form Field

<p class="text-lg text-aeblack-500 mb-8">A lightweight wrapper that groups a label with a form control — input, textarea, select, checkbox, range, progress, or one-time-password — and links them automatically. Use it on every field of a UAE Government service form to guarantee a correctly associated <code>&lt;label for="…"&gt;</code> without managing IDs by hand. The wrapper itself adds no spacing or visual styling beyond a single <code>aegov-form-field</code> block; surround it with your form's grid or stack rules as you would any other element.</p>

## Introduction

The `aegov-form-field` component watches its slotted children for an `aegov-label` and a supported control. When both are present it sets the label's `htmlFor` to the control's auto-generated `field-id`, producing a fully accessible label-input pairing. There is nothing to wire by hand — drop the children in, and the wrapper does the rest on mount and on every update.

```html
<aegov-form-field>
  <aegov-label>Full name as on Emirates ID</aegov-label>
  <aegov-input name="fullName" is-required="true"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label>Full name as on Emirates ID</aegov-label>
    <aegov-input name="fullName" is-required="true"></aegov-input>
  </aegov-form-field>
</div>

---

## Supported children

The form-field links the first matching child it finds in the priority below. Place exactly one label and one control inside each wrapper; if you need more than one input on a row, use multiple form-fields.

| Priority | Child element       | Linked via                       |
| -------- | ------------------- | -------------------------------- |
| 1        | `aegov-input`       | `label.htmlFor → input.fieldId`  |
| 2        | `aegov-textarea`    | `label.htmlFor → textarea.fieldId` |
| 3        | `aegov-select`      | `label.htmlFor → select.fieldId` |
| 4        | `aegov-checkbox`    | `label.htmlFor → checkbox.fieldId` |
| 5        | `aegov-range`       | `label.htmlFor → range.fieldId`  |
| 6        | `aegov-progress`    | `label.htmlFor → progress.fieldId` |
| 7        | `aegov-otp`         | `label.htmlFor → otp.fieldId`    |

### Input

```html
<aegov-form-field>
  <aegov-label>Mobile number</aegov-label>
  <aegov-input type="tel" placeholder="+971 5X XXX XXXX"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label>Mobile number</aegov-label>
    <aegov-input type="tel" placeholder="+971 5X XXX XXXX"></aegov-input>
  </aegov-form-field>
</div>

### Textarea

```html
<aegov-form-field>
  <aegov-label>Reason for application</aegov-label>
  <aegov-textarea
    placeholder="Briefly describe the purpose of your application."
    maxlength="500"
  ></aegov-textarea>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label>Reason for application</aegov-label>
    <aegov-textarea
      placeholder="Briefly describe the purpose of your application."
      maxlength="500"
    ></aegov-textarea>
  </aegov-form-field>
</div>

### Select

```html
<aegov-form-field>
  <aegov-label>Emirate of residence</aegov-label>
  <aegov-select placeholder="Select your emirate">
    <aegov-select-option value="abu-dhabi">Abu Dhabi</aegov-select-option>
    <aegov-select-option value="dubai">Dubai</aegov-select-option>
    <aegov-select-option value="sharjah">Sharjah</aegov-select-option>
    <aegov-select-option value="ajman">Ajman</aegov-select-option>
    <aegov-select-option value="umm-al-quwain">Umm Al Quwain</aegov-select-option>
    <aegov-select-option value="ras-al-khaimah">Ras Al Khaimah</aegov-select-option>
    <aegov-select-option value="fujairah">Fujairah</aegov-select-option>
  </aegov-select>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label>Emirate of residence</aegov-label>
    <aegov-select placeholder="Select your emirate">
      <aegov-select-option value="abu-dhabi">Abu Dhabi</aegov-select-option>
      <aegov-select-option value="dubai">Dubai</aegov-select-option>
      <aegov-select-option value="sharjah">Sharjah</aegov-select-option>
      <aegov-select-option value="ajman">Ajman</aegov-select-option>
      <aegov-select-option value="umm-al-quwain">Umm Al Quwain</aegov-select-option>
      <aegov-select-option value="ras-al-khaimah">Ras Al Khaimah</aegov-select-option>
      <aegov-select-option value="fujairah">Fujairah</aegov-select-option>
    </aegov-select>
  </aegov-form-field>
</div>

### Checkbox

```html
<aegov-form-field>
  <aegov-label>I confirm that the information provided is true and accurate</aegov-label>
  <aegov-checkbox></aegov-checkbox>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label>I confirm that the information provided is true and accurate</aegov-label>
    <aegov-checkbox></aegov-checkbox>
  </aegov-form-field>
</div>

### Range

```html
<aegov-form-field>
  <aegov-label>Number of dependants</aegov-label>
  <aegov-range min="0" max="10" value="2"></aegov-range>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label>Number of dependants</aegov-label>
    <aegov-range min="0" max="10" value="2"></aegov-range>
  </aegov-form-field>
</div>

### Progress

```html
<aegov-form-field>
  <aegov-label>Application progress</aegov-label>
  <aegov-progress value="65" counter="trailing" counter-suffix="%"></aegov-progress>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label>Application progress</aegov-label>
    <aegov-progress value="65" counter="trailing" counter-suffix="%"></aegov-progress>
  </aegov-form-field>
</div>

### One-time password

```html
<aegov-form-field>
  <aegov-label>Enter the code we sent to your registered mobile</aegov-label>
  <aegov-otp length="6"></aegov-otp>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label>Enter the code we sent to your registered mobile</aegov-label>
    <aegov-otp length="6"></aegov-otp>
  </aegov-form-field>
</div>

---

## Helper and error text

`aegov-form-field` is a layout wrapper, so any extra paragraph or message you place inside it renders below the control. Reference such text from the control with `aria-describedby` so screen readers announce it as part of the field.

```html
<aegov-form-field>
  <aegov-label>Email address</aegov-label>
  <aegov-input
    type="email"
    placeholder="name@example.ae"
    aria-describedby="email-help"
  ></aegov-input>
  <p id="email-help" class="text-sm text-aeblack-500 mt-2">
    We will use this address only to send service updates.
  </p>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label>Email address</aegov-label>
    <aegov-input
      type="email"
      placeholder="name@example.ae"
      aria-describedby="email-help"
    ></aegov-input>
    <p id="email-help" class="text-sm text-aeblack-500 mt-2">
      We will use this address only to send service updates.
    </p>
  </aegov-form-field>
</div>

---

## Required fields

Mark required fields on the inner control via `is-required="true"`. The `aegov-label` reads the linked control's required state and renders the asterisk automatically.

```html
<aegov-form-field>
  <aegov-label>Emirates ID number</aegov-label>
  <aegov-input
    name="eid"
    placeholder="784-XXXX-XXXXXXX-X"
    is-required="true"
  ></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label>Emirates ID number</aegov-label>
    <aegov-input
      name="eid"
      placeholder="784-XXXX-XXXXXXX-X"
      is-required="true"
    ></aegov-input>
  </aegov-form-field>
</div>

---

## Sizes

`aegov-form-field` has no `size` property — the wrapper is unstyled. Size the inner control directly using its own `size` prop, including responsive strings such as `sm md:base lg:lg`.

```html
<aegov-form-field>
  <aegov-label>Search the service catalogue</aegov-label>
  <aegov-input size="sm md:base lg:lg" placeholder="Type to search"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label>Search the service catalogue</aegov-label>
    <aegov-input size="sm md:base lg:lg" placeholder="Type to search"></aegov-input>
  </aegov-form-field>
</div>

---

## Variant

The `variant` property cascades to the first form-control descendant (the `aegov-label`, and the inner input/select/checkbox/etc.) when that descendant has no explicit `variant` of its own. A child's explicit `variant` always wins. Use this to keep a label, input, and any associated controls all in one colour family without setting `variant` on each child.

- `primary` — primary-* family (default)
- `secondary` — secondary-* family
- `neutral-max` — strong neutral (aeblack-800 family)
- `neutral-min` — quiet neutral (aeblack-100 family)

```html
<!-- Cascade: form-field → label + input both render in secondary -->
<aegov-form-field variant="secondary">
  <aegov-label>Email address</aegov-label>
  <aegov-input type="email" placeholder="name@domain.ae"></aegov-input>
</aegov-form-field>

<!-- Override: child variant wins over the cascade -->
<aegov-form-field variant="secondary">
  <aegov-label>Override</aegov-label>
  <aegov-input variant="primary" placeholder="Stays primary"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <aegov-form-field variant="primary">
      <aegov-label>Primary</aegov-label>
      <aegov-input placeholder="Inherits primary"></aegov-input>
    </aegov-form-field>
    <aegov-form-field variant="secondary">
      <aegov-label>Secondary</aegov-label>
      <aegov-input placeholder="Inherits secondary"></aegov-input>
    </aegov-form-field>
    <aegov-form-field variant="neutral-max">
      <aegov-label>Neutral-max</aegov-label>
      <aegov-input placeholder="Inherits neutral-max"></aegov-input>
    </aegov-form-field>
    <aegov-form-field variant="neutral-min">
      <aegov-label>Neutral-min</aegov-label>
      <aegov-input placeholder="Inherits neutral-min"></aegov-input>
    </aegov-form-field>
    <aegov-form-field variant="secondary">
      <aegov-label>Override (form-field=secondary, child=primary)</aegov-label>
      <aegov-input variant="primary" placeholder="Child wins → primary"></aegov-input>
    </aegov-form-field>
  </div>
</div>

---

## Custom IDs and class hooks

Set `field-id` to override the auto-generated id on the wrapper `<div>`. Use `extra-class` to add Tailwind utility classes to the wrapper without polluting the host with arbitrary classes.

```html
<aegov-form-field field-id="dob-field" extra-class="mb-6">
  <aegov-label>Date of birth</aegov-label>
  <aegov-input type="date" is-required="true"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field field-id="dob-field" extra-class="mb-6">
    <aegov-label>Date of birth</aegov-label>
    <aegov-input type="date" is-required="true"></aegov-input>
  </aegov-form-field>
</div>

---

## Combined Example

A short application step using three form-fields back-to-back. Each field handles its own label association — there is no `for=` to write by hand.

```html
<aegov-form-field>
  <aegov-label>Full name (as on Emirates ID)</aegov-label>
  <aegov-input is-required="true" placeholder="Your full legal name"></aegov-input>
</aegov-form-field>

<aegov-form-field>
  <aegov-label>Emirate of residence</aegov-label>
  <aegov-select placeholder="Select your emirate">
    <aegov-select-option value="abu-dhabi">Abu Dhabi</aegov-select-option>
    <aegov-select-option value="dubai">Dubai</aegov-select-option>
    <aegov-select-option value="sharjah">Sharjah</aegov-select-option>
  </aegov-select>
</aegov-form-field>

<aegov-form-field>
  <aegov-label>Comments</aegov-label>
  <aegov-textarea placeholder="Anything else we should know?" maxlength="500"></aegov-textarea>
</aegov-form-field>

<aegov-form-field>
  <aegov-label>I agree to the terms of the service</aegov-label>
  <aegov-checkbox is-required="true"></aegov-checkbox>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field extra-class="mb-6">
    <aegov-label>Full name (as on Emirates ID)</aegov-label>
    <aegov-input is-required="true" placeholder="Your full legal name"></aegov-input>
  </aegov-form-field>

  <aegov-form-field extra-class="mb-6">
    <aegov-label>Emirate of residence</aegov-label>
    <aegov-select placeholder="Select your emirate">
      <aegov-select-option value="abu-dhabi">Abu Dhabi</aegov-select-option>
      <aegov-select-option value="dubai">Dubai</aegov-select-option>
      <aegov-select-option value="sharjah">Sharjah</aegov-select-option>
    </aegov-select>
  </aegov-form-field>

  <aegov-form-field extra-class="mb-6">
    <aegov-label>Comments</aegov-label>
    <aegov-textarea placeholder="Anything else we should know?" maxlength="500"></aegov-textarea>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>I agree to the terms of the service</aegov-label>
    <aegov-checkbox is-required="true"></aegov-checkbox>
  </aegov-form-field>
</div>

---

## RTL Support

`aegov-form-field` is a thin block-level wrapper without horizontal directional styling, so it renders identically in LTR and RTL. The directionality of the inner controls follows their own behaviour and the surrounding `dir` attribute, so simply wrap the form (or its container) with `dir="rtl"` and every linked label, input, and helper text flips correctly.

```html
<div dir="rtl">
  <aegov-form-field>
    <aegov-label>الاسم الكامل كما في الهوية الإماراتية</aegov-label>
    <aegov-input is-required="true" placeholder="الاسم الكامل"></aegov-input>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>إمارة الإقامة</aegov-label>
    <aegov-select placeholder="اختر الإمارة">
      <aegov-select-option value="abu-dhabi">أبوظبي</aegov-select-option>
      <aegov-select-option value="dubai">دبي</aegov-select-option>
      <aegov-select-option value="sharjah">الشارقة</aegov-select-option>
    </aegov-select>
  </aegov-form-field>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field extra-class="mb-6">
    <aegov-label>الاسم الكامل كما في الهوية الإماراتية</aegov-label>
    <aegov-input is-required="true" placeholder="الاسم الكامل"></aegov-input>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>إمارة الإقامة</aegov-label>
    <aegov-select placeholder="اختر الإمارة">
      <aegov-select-option value="abu-dhabi">أبوظبي</aegov-select-option>
      <aegov-select-option value="dubai">دبي</aegov-select-option>
      <aegov-select-option value="sharjah">الشارقة</aegov-select-option>
    </aegov-select>
  </aegov-form-field>
</div>

---

## API Reference

### aegov-form-field Properties

| Property      | Attribute     | Description                                                                | Type     | Default     |
| ------------- | ------------- | -------------------------------------------------------------------------- | -------- | ----------- |
| `fieldId`     | `field-id`    | DOM `id` for the wrapper `<div>`. Auto-generated if omitted.                | `string` | _generated_ |
| `variant`     | `variant`     | Colour family. Cascades to the first `aegov-label` and form-control descendant if they have no explicit `variant`. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `extraClass`  | `extra-class` | Additional CSS classes appended to the wrapper.                             | `string` | `undefined` |

### Slots

| Slot         | Description                                                                                                                        |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| _(default)_  | One `aegov-label`, one supported control (`aegov-input`, `aegov-textarea`, `aegov-select`, `aegov-checkbox`, `aegov-range`, `aegov-progress`, or `aegov-otp`), and optional helper / error paragraphs. |

### Events

`aegov-form-field` does not emit any custom events. Listen for events directly on the inner control (`aegovInputChange`, `aegovSelectChange`, etc.).

```html
<aegov-form-field>
  <aegov-label>Email</aegov-label>
  <aegov-input id="email" type="email"></aegov-input>
</aegov-form-field>

<script>
  document.getElementById('email').addEventListener('aegovInputChange', (e) => {
    console.log('value', e.detail.value);
  });
</script>
```

### Pass-through Attributes

`aria-*` and `data-*` attributes set on the host are forwarded to the wrapper `<div>`. Use these for grouping semantics (e.g. `role="group"` plus `aria-labelledby`) or for analytics hooks.

| Attribute group  | Forwarded to       | Notes                                                                                  |
| ---------------- | ------------------ | -------------------------------------------------------------------------------------- |
| `aria-*`         | wrapper `<div>`    | Useful for `role="group"`, `aria-labelledby`, `aria-describedby` on the wrapper.        |
| `data-*`         | wrapper `<div>`    | For testing hooks, analytics tagging, or CSS targeting.                                 |
| `id`             | n/a                | Use `field-id` instead — `id` is reserved by the host.                                  |
| `class`, `style` | host               | Stay on the `<aegov-form-field>` element. Use `extra-class` to extend wrapper classes.  |

---

## Validation

`aegov-form-field` exposes the unified [Validation Surface](validation-overview.html) at the **wrapper level** and cascades to the first form-control descendant. Form-field-specific notes:

### Cascade rules

When `is-invalid` / `error-message` / `hint` are set on the wrapper:

- The wrapper finds the first `aegov-input | aegov-textarea | aegov-select | aegov-checkbox | aegov-checkbox-group | aegov-radio-group | aegov-toggle | aegov-range | aegov-otp | aegov-fileupload | aegov-datepicker` descendant.
- Each prop only fills the child's slot when the child has not authored its own value (author intent always wins).
- The wrapper itself gains the `is-invalid` class when `is-invalid` is true (style hook for label coloring etc.).

### Common recipes

**Wrapper-level error from external state (Redux/Vuex/server):**

```html
<aegov-form-field error-message="Email already registered" is-invalid="true">
  <aegov-label>Email</aegov-label>
  <aegov-input name="email" type="email"></aegov-input>
</aegov-form-field>
```

**Mixed wrapper + child errors (child wins):**

```html
<aegov-form-field error-message="Wrapper says A">
  <aegov-input name="x" error-message="Child says B"></aegov-input>
</aegov-form-field>
```

Inner control displays "Child says B" — wrapper does not overwrite.

**Wrapper hint, child error:**

```html
<aegov-form-field hint="At least 8 characters">
  <aegov-input name="pw" type="password" is-invalid="true" error-message="Too short"></aegov-input>
</aegov-form-field>
```

The hint cascades to the child; on `is-invalid`, the child shows its own error and hides the cascaded hint.

See [BYO Validator](validation-byo.html) for more patterns.

---

## Accessibility

### Built-in behaviour

- After mount and on every update, the form-field queries its slotted children for an `aegov-label` and a supported control. If both are present, the label's `htmlFor` is set to the control's `field-id`, producing a correctly associated `<label for="…">` pairing.
- The wrapper preserves user-set `aria-*` and `data-*` attributes via pass-through, allowing things like `aria-labelledby` or `role="group"` when grouping multiple inputs.
- The wrapper has no implicit ARIA role — assistive technology treats it as a plain `<div>`.

### Developer responsibilities

- Place exactly one `aegov-label` and one supported control inside each form-field. With multiple controls, only the first matching one (in this priority: input → textarea → select → checkbox → range → progress → otp) will receive the label association.
- For helper or error text, render it inside the form-field with a stable `id` and reference it from the control with `aria-describedby`.
- For required fields, set `is-required` on the inner control rather than relying on visual cues alone.
- If you are creating a fieldset/legend pattern (e.g. grouping radio buttons), add `role="group"` and `aria-labelledby` referencing the label's id.

### Keyboard support

`aegov-form-field` does not introduce any keyboard behaviour of its own. All keyboard interaction is handled by the inner control. Refer to the control's own documentation for its keyboard map.
