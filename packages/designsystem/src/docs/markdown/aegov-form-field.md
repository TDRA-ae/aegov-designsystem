# Form Field

<p class="text-lg text-aeblack-500 mb-8">A Form Field is the wrapper that turns a label and a control into a correctly-associated field. It links the label to the control automatically, provides consistent vertical rhythm, and can carry validation state on the control's behalf — so a form's error handling can live at the field level rather than being threaded into every individual component.</p>

## Introduction

Put an [`aegov-label`](aegov-label.html) and a control inside `aegov-form-field`. The wrapper reads the control's generated `field-id` and sets the label's `for`, so the association exists without you writing any IDs.

```html
<aegov-form-field>
  <aegov-label>Email address</aegov-label>
  <aegov-input name="email" type="email" hint="We will send confirmation here"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-form-field>
      <aegov-label>Email address</aegov-label>
      <aegov-input field-id="ff-intro" name="email" type="email" hint="We will send confirmation here"></aegov-input>
    </aegov-form-field>
  </div>
</div>

Using the wrapper is the recommended default for every field in a form. It is the difference between a form that works with a screen reader and one that merely looks like it should.

---

## What the wrapper does

Three jobs, all automatic:

1. **Links the label.** Finds the first `aegov-label` and the first form control, then sets the label's `for` to the control's `field-id`.
2. **Lays the field out.** A vertical stack by default, switching to a horizontal row when the control is a checkbox so the box sits beside its label.
3. **Cascades validation and colour.** `is-invalid`, `error-message`, `hint` and `variant` set on the wrapper flow down to the control — without overwriting anything the control already declares.

The controls it recognises are:

`aegov-input`, `aegov-textarea`, `aegov-select`, `aegov-checkbox`, `aegov-checkbox-group`, `aegov-radio-group`, `aegov-toggle`, `aegov-range`, `aegov-otp`, `aegov-fileupload`, `aegov-datepicker`.

Label linking additionally covers `aegov-radio` and `aegov-progress`.

---

## Layout

By default the wrapper is a vertical flex column: label, control, then the control's own hint or error region.

When the field contains an `aegov-checkbox`, the wrapper switches to a horizontal row with top-aligned items, and the label loses its bottom margin and gains a pointer cursor — the layout a checkbox needs.

```html
<aegov-form-field>
  <aegov-label>Full name</aegov-label>
  <aegov-input name="fullName"></aegov-input>
</aegov-form-field>

<aegov-form-field>
  <aegov-label>I accept the terms of service</aegov-label>
  <aegov-checkbox name="terms"></aegov-checkbox>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <aegov-form-field>
      <aegov-label>Full name</aegov-label>
      <aegov-input field-id="ff-lay-1" name="fullName"></aegov-input>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>I accept the terms of service</aegov-label>
      <aegov-checkbox field-id="ff-lay-2" name="terms"></aegov-checkbox>
    </aegov-form-field>
  </div>
</div>

For a single checkbox, the simpler route is usually the checkbox's own `label` property, which renders the inline label itself:

```html
<aegov-checkbox name="terms" label="I accept the terms of service"></aegov-checkbox>
```

Use the wrapper form when you need the label to carry markup — a link to the terms, for instance.

---

## Hint text

The control owns its hint, and that is where hint text normally belongs. The wrapper can supply one instead, which is convenient when your form code tracks help text per field rather than per component.

```html
<!-- Hint on the control (usual) -->
<aegov-form-field>
  <aegov-label>Emirates ID</aegov-label>
  <aegov-input name="emiratesId" hint="15 digits, as printed on your card"></aegov-input>
</aegov-form-field>

<!-- Hint on the wrapper (cascades down) -->
<aegov-form-field hint="15 digits, as printed on your card">
  <aegov-label>Emirates ID</aegov-label>
  <aegov-input name="emiratesId"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <aegov-form-field>
      <aegov-label>Emirates ID (hint on control)</aegov-label>
      <aegov-input field-id="ff-h-1" name="emiratesId" hint="15 digits, as printed on your card"></aegov-input>
    </aegov-form-field>
    <aegov-form-field hint="15 digits, as printed on your card">
      <aegov-label>Emirates ID (hint on wrapper)</aegov-label>
      <aegov-input field-id="ff-h-2" name="emiratesId2"></aegov-input>
    </aegov-form-field>
  </div>
</div>

Both render identically, because the cascade sets the control's `hint` property — which means the text ends up in the control's own hint region and in its `aria-describedby` chain either way.

The wrapper also exposes a `hint` **slot** for markup that sits outside the control's own regions:

```html
<aegov-form-field>
  <aegov-label>Supporting documents</aegov-label>
  <aegov-fileupload name="documents" is-multiple></aegov-fileupload>
  <p slot="hint" class="text-sm text-aeblack-500">
    Accepted formats: PDF, JPG, PNG. See the <a href="/help/documents">document guide</a>.
  </p>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-form-field>
      <aegov-label>Supporting documents</aegov-label>
      <aegov-fileupload field-id="ff-h-slot" name="documents" is-multiple></aegov-fileupload>
      <p slot="hint" class="text-sm text-aeblack-500 mt-2">Accepted formats: PDF, JPG, PNG. See the <a href="#">document guide</a>.</p>
    </aegov-form-field>
  </div>
</div>

Note the trade-off: content in the wrapper's `hint` slot is **not** added to the control's `aria-describedby`. If the guidance is essential to completing the field, put it in the control's `hint` property or its `hint` slot instead, where it will be announced.

---

## Validation cascade

Set `is-invalid` and `error-message` on the wrapper and they flow to the control. The wrapper also adds `is-invalid` to its own element, so you can style the label and the control together.

```html
<aegov-form-field is-invalid error-message="Enter your Emirates ID to continue">
  <aegov-label>Emirates ID</aegov-label>
  <aegov-input name="emiratesId"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-form-field is-invalid error-message="Enter your Emirates ID to continue">
      <aegov-label>Emirates ID</aegov-label>
      <aegov-input field-id="ff-inv" name="emiratesId"></aegov-input>
    </aegov-form-field>
  </div>
</div>

### Precedence rules

The cascade is deliberately conservative — **the control's own values win**, so a wrapper-level default can never silently overwrite something you set explicitly on the field.

| Property | Rule |
| --- | --- |
| `errorMessage` | Cascades **only if** the control has no error message of its own. |
| `hint` | Cascades **only if** the control has no hint of its own. |
| `variant` | Cascades **only if** the control is still on the default `primary`. |
| `isInvalid` | A truthy wrapper value **always wins**, because a wrapper error message needs to be displayed to be useful. |

```html
<!-- The control's message wins -->
<aegov-form-field is-invalid error-message="Wrapper message">
  <aegov-label>Emirates ID</aegov-label>
  <aegov-input name="emiratesId" error-message="Emirates ID must be 15 digits"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-form-field is-invalid error-message="Wrapper message">
      <aegov-label>Emirates ID</aegov-label>
      <aegov-input field-id="ff-prec" name="emiratesId" error-message="Emirates ID must be 15 digits" value="78419"></aegov-input>
    </aegov-form-field>
  </div>
</div>

The cascade re-runs whenever `is-invalid`, `error-message`, `hint` or `variant` changes, so driving it from application state works as expected:

```js
const field = document.querySelector('#email-field');

field.isInvalid = true;
field.errorMessage = 'Enter a valid email address';

// later
field.isInvalid = false;
field.errorMessage = '';
```

Note that clearing the wrapper's `errorMessage` does not clear a message the control set for itself — by design. Whichever layer owns the state should be the layer that clears it.

### Which layer should own it

- **Control-level** is right when the control decides — a native validity flag, a rule attached to that one field. This is the common case.
- **Wrapper-level** is right when the field's error comes from outside the control: a server response keyed by field name, or a form-level state object your framework is rendering from.

Pick one per form and stay with it. Mixing both is where the precedence rules start to matter, and where surprises live.

---

## Variant

`variant` sets the colour family and cascades to both the label and the control, so a whole field changes together.

```html
<aegov-form-field variant="secondary">
  <aegov-label>Reference number</aegov-label>
  <aegov-input name="reference"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <aegov-form-field variant="primary">
      <aegov-label>Primary</aegov-label>
      <aegov-input field-id="ff-v-1" value="Primary"></aegov-input>
    </aegov-form-field>
    <aegov-form-field variant="secondary">
      <aegov-label>Secondary</aegov-label>
      <aegov-input field-id="ff-v-2" value="Secondary"></aegov-input>
    </aegov-form-field>
    <aegov-form-field variant="neutral-max">
      <aegov-label>Neutral max</aegov-label>
      <aegov-input field-id="ff-v-3" value="Neutral max"></aegov-input>
    </aegov-form-field>
  </div>
</div>

---

## Works with every control

The wrapper handles all form controls, not just text inputs.

```html
<aegov-form-field>
  <aegov-label>Emirate of residence</aegov-label>
  <aegov-select name="emirate" appearance="listbox" placeholder="Select an emirate">
    <aegov-select-option value="AZ">Abu Dhabi</aegov-select-option>
    <aegov-select-option value="DU">Dubai</aegov-select-option>
  </aegov-select>
</aegov-form-field>

<aegov-form-field>
  <aegov-label>Preferred appointment</aegov-label>
  <aegov-datepicker name="appointment"></aegov-datepicker>
</aegov-form-field>

<aegov-form-field>
  <aegov-label>Verification code</aegov-label>
  <aegov-otp name="code" length="6"></aegov-otp>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <aegov-form-field>
      <aegov-label>Emirate of residence</aegov-label>
      <aegov-select field-id="ff-c-sel" name="emirate" appearance="listbox" placeholder="Select an emirate">
        <aegov-select-option value="AZ">Abu Dhabi</aegov-select-option>
        <aegov-select-option value="DU">Dubai</aegov-select-option>
        <aegov-select-option value="SH">Sharjah</aegov-select-option>
      </aegov-select>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>Preferred appointment</aegov-label>
      <aegov-datepicker field-id="ff-c-dp" name="appointment"></aegov-datepicker>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>Verification code</aegov-label>
      <aegov-otp field-id="ff-c-otp" name="code" length="6"></aegov-otp>
    </aegov-form-field>
  </div>
</div>

### Groups are different

[`aegov-checkbox-group`](aegov-checkbox.html) and [`aegov-radio-group`](aegov-radio.html) render their own `<fieldset>` and `<legend>`. A `<label>` cannot name a group of controls, so use the group's `label` property and do not add an `aegov-label`:

```html
<!-- Correct -->
<aegov-radio-group name="contactMethod" label="How should we contact you?">
  <aegov-radio value="email" label="Email"></aegov-radio>
  <aegov-radio value="sms" label="SMS"></aegov-radio>
</aegov-radio-group>
```

The wrapper still recognises groups as controls for the **validation cascade**, so wrapping a group to carry `is-invalid` and `error-message` is valid and useful:

```html
<aegov-form-field is-invalid error-message="Choose how we should contact you">
  <aegov-radio-group name="contactMethod" label="How should we contact you?">
    <aegov-radio value="email" label="Email"></aegov-radio>
    <aegov-radio value="sms" label="SMS"></aegov-radio>
  </aegov-radio-group>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-form-field is-invalid error-message="Choose how we should contact you">
      <aegov-radio-group name="ff-contact" label="How should we contact you?">
        <aegov-radio value="email" label="Email"></aegov-radio>
        <aegov-radio value="sms" label="SMS"></aegov-radio>
      </aegov-radio-group>
    </aegov-form-field>
  </div>
</div>

---

## Composite example — server-driven errors

A common real-world shape: the server returns errors keyed by field name, and the wrapper is the natural place to put them.

```html
<form id="application" novalidate>
  <aegov-form-field data-field="fullName">
    <aegov-label>Full name <span class="text-aered-600" aria-hidden="true">*</span><span class="sr-only">(required)</span></aegov-label>
    <aegov-input name="fullName" is-required></aegov-input>
  </aegov-form-field>

  <aegov-form-field data-field="emiratesId">
    <aegov-label>Emirates ID <span class="text-aered-600" aria-hidden="true">*</span><span class="sr-only">(required)</span></aegov-label>
    <aegov-input name="emiratesId" is-required inputmode="numeric"></aegov-input>
  </aegov-form-field>

  <aegov-form-field data-field="email">
    <aegov-label>Email address <span class="text-aered-600" aria-hidden="true">*</span><span class="sr-only">(required)</span></aegov-label>
    <aegov-input name="email" type="email" is-required autocomplete="email"></aegov-input>
  </aegov-form-field>

  <aegov-button type="submit" variant="primary" size="lg">Submit application</aegov-button>
</form>

<script type="module">
  const form = document.querySelector('#application');

  function clearErrors() {
    form.querySelectorAll('aegov-form-field').forEach((field) => {
      field.isInvalid = false;
      field.errorMessage = '';
    });
  }

  function showErrors(fieldErrors) {
    for (const [name, message] of Object.entries(fieldErrors)) {
      const field = form.querySelector(`aegov-form-field[data-field="${name}"]`);
      if (!field) continue;
      field.isInvalid = true;
      field.errorMessage = message;
    }

    // Move focus to the first offending control
    const first = Object.keys(fieldErrors)[0];
    form.querySelector(`[name="${first}"]`)?.focus();
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    try {
      await api.submitApplication(Object.fromEntries(new FormData(form)));
    } catch (err) {
      if (err.fieldErrors) showErrors(err.fieldErrors);
    }
  });
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <aegov-form-field>
      <aegov-label>Full name <span class="text-aered-600" aria-hidden="true">*</span><span class="sr-only">(required)</span></aegov-label>
      <aegov-input field-id="ff-cx-1" name="fullName" is-required value="Ahmed Al Mansouri"></aegov-input>
    </aegov-form-field>
    <aegov-form-field is-invalid error-message="This Emirates ID is already registered against another application">
      <aegov-label>Emirates ID <span class="text-aered-600" aria-hidden="true">*</span><span class="sr-only">(required)</span></aegov-label>
      <aegov-input field-id="ff-cx-2" name="emiratesId" is-required inputmode="numeric" value="784199012345671"></aegov-input>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>Email address <span class="text-aered-600" aria-hidden="true">*</span><span class="sr-only">(required)</span></aegov-label>
      <aegov-input field-id="ff-cx-3" name="email" type="email" is-required value="ahmed@example.ae"></aegov-input>
    </aegov-form-field>
    <aegov-button type="submit" variant="primary" size="lg">Submit application</aegov-button>
  </div>
</div>

A `data-*` attribute on the wrapper is a clean way to key fields by name, and pass-through means it lands on the rendered element for your own selectors.

---

## RTL Support

The wrapper is direction-agnostic. It lays out with flexbox and logical spacing, so the vertical stack is unaffected by direction and the horizontal checkbox layout reverses automatically — the box moves to the right of its label in a `dir="rtl"` container. Cascaded hint and error text inherits the control's own RTL handling.

```html
<div dir="rtl">
  <aegov-form-field>
    <aegov-label>البريد الإلكتروني</aegov-label>
    <aegov-input name="email" type="email" hint="سنرسل التأكيد إلى هذا العنوان"></aegov-input>
  </aegov-form-field>

  <aegov-form-field is-invalid error-message="أدخل الهوية الإماراتية للمتابعة">
    <aegov-label>الهوية الإماراتية</aegov-label>
    <aegov-input name="emiratesId"></aegov-input>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>أوافق على شروط الخدمة</aegov-label>
    <aegov-checkbox name="terms"></aegov-checkbox>
  </aegov-form-field>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <aegov-form-field>
      <aegov-label>البريد الإلكتروني</aegov-label>
      <aegov-input field-id="ff-rtl-1" name="email" type="email" hint="سنرسل التأكيد إلى هذا العنوان"></aegov-input>
    </aegov-form-field>
    <aegov-form-field is-invalid error-message="أدخل الهوية الإماراتية للمتابعة">
      <aegov-label>الهوية الإماراتية</aegov-label>
      <aegov-input field-id="ff-rtl-2" name="emiratesId"></aegov-input>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>أوافق على شروط الخدمة</aegov-label>
      <aegov-checkbox field-id="ff-rtl-3" name="terms"></aegov-checkbox>
    </aegov-form-field>
  </div>
</div>

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the wrapper element. Auto-generated when omitted, reflected to the host. | `string` | _generated_ |
| `isInvalid` | `is-invalid` | Wrapper-level invalid state. A truthy value always cascades to the control, and adds `is-invalid` to the wrapper element. | `boolean` | `false` |
| `errorMessage` | `error-message` | Wrapper-level error text. Cascades **only if** the control has no error message of its own. | `string` | `''` |
| `hint` | `hint` | Wrapper-level hint text. Cascades **only if** the control has no hint of its own. | `string` | `''` |
| `variant` | `variant` | Colour family. Cascades to the label and to the control, each only if still on the default `primary`. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `extraClass` | `extra-class` | Extra classes appended to the wrapper element. | `string` | — |

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | The label and the control, in that order. |
| `hint` | Extra hint markup rendered after the control. **Not** added to the control's `aria-describedby` — use the control's own `hint` for content that must be announced. |

### Events

`aegov-form-field` emits no events. The control inside it emits its own, including `aegovValidate`, and those bubble through the wrapper.

### Methods

None. The wrapper has no imperative API — call `validate()` on the control itself.

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the wrapper element. |
| `data-*` | Yes | Forwarded to the wrapper element — useful for keying fields by name. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host. Use `extra-class` to reach the wrapper element. |

### CSS classes

| Class | Element |
| --- | --- |
| `.aegov-form-field` | The wrapper element. A vertical flex column by default. |
| `.is-invalid` | Added to the wrapper while `is-invalid`. |

The wrapper switches to a horizontal row layout when it contains an `aegov-checkbox`, via a `:has()` selector — no class or property of yours is involved.

---

## Validation

### Surface

The wrapper participates in the shared contract as a **carrier**: it exposes `is-invalid`, `error-message` and `hint`, and cascades them to the control it wraps. It does not validate anything itself and has no `validate()` method — call that on the control. Full reference: [Validation Surface](validation-overview.html).

### Common recipes

Whole-form validation, reading results back onto the wrappers:

```js
const FORM_CONTROLS = 'aegov-input, aegov-textarea, aegov-select, aegov-checkbox, ' +
  'aegov-checkbox-group, aegov-radio-group, aegov-toggle, aegov-range, ' +
  'aegov-otp, aegov-fileupload, aegov-datepicker';

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const controls = [...form.querySelectorAll(FORM_CONTROLS)];
  const results = await Promise.all(controls.map((c) => c.validate('submit')));

  let firstBad = null;

  controls.forEach((control, i) => {
    const field = control.closest('aegov-form-field');
    const { valid, message } = results[i];

    if (field) {
      field.isInvalid = !valid;
      field.errorMessage = valid ? '' : (message || 'Check this field');
    }
    if (!valid && !firstBad) firstBad = control;
  });

  if (firstBad) return firstBad.focus();

  await api.submit(Object.fromEntries(new FormData(form)));
});
```

More patterns — cross-field rules, async checks, error summaries — in [Bring Your Own Validator](validation-byo.html).

### Use with `@aegov/designsystem-validation`

The optional companion package writes to the **control**, not the wrapper. That is compatible with the cascade — the control's own values simply take precedence, which is exactly the intended outcome. Do not set wrapper-level errors for the same fields the orchestrator manages, or the two layers will disagree about who clears them.

```ts
import { createForm } from '@aegov/designsystem-validation';
import { valibotAdapter } from '@aegov/designsystem-validation/adapters/valibot';

createForm(form, schema, valibotAdapter(), { mode: 'onBlur' });
```

The package is **optional**; nothing in the design system depends on it.

---

## Accessibility

### Built-in behaviour

- **The label is programmatically associated with the control.** The wrapper sets the label's `for` from the control's generated `field-id`, which is the single highest-value thing it does.
- Cascaded `error-message` and `hint` land on the control's own properties, so they are rendered inside the control's regions and included in its composed `aria-describedby` — the association is real, not visual proximity.
- The `is-invalid` class on the wrapper lets the label and control be styled as one unit without duplicating state.
- The checkbox row layout is applied structurally, so the box and its label are adjacent in both the visual and DOM order.

### Developer responsibilities

- **One control per wrapper.** The wrapper links and cascades to the *first* control it finds; a second control in the same wrapper will be unlabelled and will not receive cascaded state.
- **Put the label first** in the DOM. The wrapper does not reorder content, and a control that precedes its label reads incorrectly in a screen reader's browse order.
- **Do not use `aegov-label` with a checkbox group or radio group.** Use the group's `label` property so it becomes a `<legend>`; a `<label>` cannot name a group.
- **Put essential guidance in the control's `hint`**, not the wrapper's `hint` slot — only the former is added to `aria-describedby`.
- **Always populate `error-message` when setting `is-invalid`.** An invalid field styled red with no message conveys nothing without colour vision (WCAG 2.2 SC 1.4.1).
- **Move focus to the first invalid control** on a failed submit. The wrapper does not manage focus.
- **Decide whether the wrapper or the control owns error state**, per form. Whichever sets it must be the one that clears it.
- **Mark required state on the control** with `is-required`; the asterisk in the label is decoration and should be `aria-hidden`.

---

## Where to next

- [Label](aegov-label.html) — the label component and required-marker patterns.
- [Input](aegov-input.html), [Textarea](aegov-textarea.html), [Select](aegov-select.html) — the controls this wraps.
- [Checkbox](aegov-checkbox.html) and [Radio](aegov-radio.html) — including the group components and their `label` property.
- [Validation Surface](validation-overview.html) — the cascade in the context of the full contract.
