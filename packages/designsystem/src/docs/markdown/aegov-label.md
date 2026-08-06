# Label

<p class="text-lg text-aeblack-500 mb-8">A Label names a form control. It is the single most important accessibility feature of any form: it gives the control an accessible name, and it gives sighted users a click target that focuses the field. <code>aegov-label</code> renders a real <code>&lt;label&gt;</code> and, when used inside <code>aegov-form-field</code>, has its <code>for</code> attribute wired to the control automatically.</p>

## Introduction

The normal way to use a label is to put it inside [`aegov-form-field`](aegov-form-field.html) next to a control. The wrapper finds both, reads the control's generated `field-id`, and sets the label's `for` — so the association exists without you inventing IDs.

```html
<aegov-form-field>
  <aegov-label>Email address</aegov-label>
  <aegov-input name="email" type="email"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-form-field>
      <aegov-label>Email address</aegov-label>
      <aegov-input field-id="lbl-intro" name="email" type="email"></aegov-input>
    </aegov-form-field>
  </div>
</div>

Click the label text in the preview above and the input takes focus. That is the association working.

---

## Standalone use

Outside `aegov-form-field` you must set `for` yourself, pointing at the control's `field-id`.

```html
<aegov-label for="applicant-name">Applicant name</aegov-label>
<aegov-input field-id="applicant-name" name="fullName"></aegov-input>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-label for="lbl-standalone">Applicant name</aegov-label>
    <aegov-input field-id="lbl-standalone" name="fullName"></aegov-input>
  </div>
</div>

Note the attribute is `for`, matching HTML — not `html-for`. In frameworks that resolve properties by name, the property is `htmlFor`:

```tsx
{/* React */}
<AegovLabel htmlFor="applicant-name">Applicant name</AegovLabel>
```

```html
<!-- Angular -->
<aegov-label htmlFor="applicant-name">Applicant name</aegov-label>
```

Prefer the wrapper. Hand-written IDs drift, and a `for` pointing at nothing is worse than no label at all — it looks correct in review and fails in a screen reader.

---

## Required fields

`aegov-label` has **no** `is-required` property. Required markers are content, so you author them in the slot. That keeps you in control of the marker, its colour, and — critically — what a screen reader announces.

```html
<aegov-form-field>
  <aegov-label>
    Emirates ID
    <span class="text-aered-600" aria-hidden="true">*</span>
    <span class="sr-only">(required)</span>
  </aegov-label>
  <aegov-input name="emiratesId" is-required></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <aegov-form-field>
      <aegov-label>
        Emirates ID
        <span class="text-aered-600" aria-hidden="true">*</span>
        <span class="sr-only">(required)</span>
      </aegov-label>
      <aegov-input field-id="lbl-req-1" name="emiratesId" is-required></aegov-input>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>Middle name <span class="text-aeblack-400 font-normal">(optional)</span></aegov-label>
      <aegov-input field-id="lbl-req-2" name="middleName"></aegov-input>
    </aegov-form-field>
  </div>
</div>

Two patterns, both valid — pick one and use it consistently across a service:

- **Mark the required fields.** An asterisk hidden from assistive technology, plus a visually hidden "(required)". The `is-required` property on the control is what actually tells a screen reader the field is required, so the asterisk is purely visual and should be `aria-hidden`.
- **Mark the optional fields.** When most fields are required, marking the few optional ones is less visual noise and reads better.

Do not rely on the asterisk alone with no `is-required` on the control — colour and a glyph are not a programmatic state (WCAG 2.2 SC 1.4.1).

---

## Labels with hint text

Keep the label short. Guidance belongs in the control's `hint`, which is associated through `aria-describedby` rather than becoming part of the field's name.

```html
<aegov-form-field>
  <aegov-label>Emirates ID</aegov-label>
  <aegov-input name="emiratesId" hint="15 digits, as printed on your card"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-form-field>
      <aegov-label>Emirates ID</aegov-label>
      <aegov-input field-id="lbl-hint" name="emiratesId" hint="15 digits, as printed on your card"></aegov-input>
    </aegov-form-field>
  </div>
</div>

A long label becomes the accessible name and is read out in full every time the field is focused. "Emirates ID" is a name; "Emirates ID, 15 digits as printed on your card, without spaces or dashes" is a name plus a hint that should have been a hint.

---

## Variant

`variant` sets the label's colour family so it matches the control it names. It cascades from [`aegov-form-field`](aegov-form-field.html), so setting it once on the wrapper covers the label and the control together.

```html
<aegov-label variant="primary">Primary</aegov-label>
<aegov-label variant="secondary">Secondary</aegov-label>
<aegov-label variant="neutral-max">Neutral max</aegov-label>
<aegov-label variant="neutral-min">Neutral min</aegov-label>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-2">
    <aegov-label variant="primary">Primary</aegov-label>
    <aegov-label variant="secondary">Secondary</aegov-label>
    <aegov-label variant="neutral-max">Neutral max</aegov-label>
    <aegov-label variant="neutral-min">Neutral min</aegov-label>
  </div>
</div>

---

## Which controls the wrapper links

Inside `aegov-form-field`, the label is linked to the first matching control it finds:

`aegov-input`, `aegov-textarea`, `aegov-select`, `aegov-checkbox`, `aegov-radio`, `aegov-toggle`, `aegov-range`, `aegov-progress`, `aegov-otp`, `aegov-fileupload`, `aegov-datepicker`.

```html
<aegov-form-field>
  <aegov-label>Preferred appointment date</aegov-label>
  <aegov-datepicker name="appointment"></aegov-datepicker>
</aegov-form-field>

<aegov-form-field>
  <aegov-label>Supporting documents</aegov-label>
  <aegov-fileupload name="documents" is-multiple></aegov-fileupload>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <aegov-form-field>
      <aegov-label>Preferred appointment date</aegov-label>
      <aegov-datepicker field-id="lbl-dp" name="appointment"></aegov-datepicker>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>Emirate of residence</aegov-label>
      <aegov-select field-id="lbl-sel" name="emirate" placeholder="Select an emirate">
        <aegov-select-option value="AZ">Abu Dhabi</aegov-select-option>
        <aegov-select-option value="DU">Dubai</aegov-select-option>
      </aegov-select>
    </aegov-form-field>
  </div>
</div>

Groups are the exception. [`aegov-checkbox-group`](aegov-checkbox.html) and [`aegov-radio-group`](aegov-radio.html) render their own `<fieldset>` and `<legend>`, so use the group's `label` property rather than an `aegov-label` — a `<label>` cannot name a group of controls.

```html
<!-- Correct: the group labels itself -->
<aegov-radio-group name="contactMethod" label="How should we contact you?">
  <aegov-radio value="email" label="Email"></aegov-radio>
  <aegov-radio value="sms" label="SMS"></aegov-radio>
</aegov-radio-group>
```

Similarly, [`aegov-checkbox`](aegov-checkbox.html), [`aegov-radio`](aegov-radio.html) and [`aegov-toggle`](aegov-toggle.html) each have their own `label` property that renders an inline label in the correct position. Use that instead of a separate `aegov-label` for those three.

---

## Composite example — labelled form section

```html
<form novalidate>
  <aegov-form-field>
    <aegov-label>
      Full name
      <span class="text-aered-600" aria-hidden="true">*</span>
      <span class="sr-only">(required)</span>
    </aegov-label>
    <aegov-input name="fullName" is-required hint="As printed on your Emirates ID"></aegov-input>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>Email address <span class="text-aered-600" aria-hidden="true">*</span><span class="sr-only">(required)</span></aegov-label>
    <aegov-input name="email" type="email" is-required autocomplete="email"></aegov-input>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>Middle name <span class="text-aeblack-400 font-normal">(optional)</span></aegov-label>
    <aegov-input name="middleName"></aegov-input>
  </aegov-form-field>
</form>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <aegov-form-field>
      <aegov-label>Full name <span class="text-aered-600" aria-hidden="true">*</span><span class="sr-only">(required)</span></aegov-label>
      <aegov-input field-id="lbl-cx-1" name="fullName" is-required hint="As printed on your Emirates ID"></aegov-input>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>Email address <span class="text-aered-600" aria-hidden="true">*</span><span class="sr-only">(required)</span></aegov-label>
      <aegov-input field-id="lbl-cx-2" name="email" type="email" is-required autocomplete="email"></aegov-input>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>Middle name <span class="text-aeblack-400 font-normal">(optional)</span></aegov-label>
      <aegov-input field-id="lbl-cx-3" name="middleName"></aegov-input>
    </aegov-form-field>
  </div>
</div>

---

## RTL Support

The label is direction-agnostic — it inherits text alignment from its container, and the heading font stack switches to Alexandria automatically in Arabic. A required-marker span placed after the label text renders on the inline-end side, which is the left in RTL, so the visual relationship holds without change.

```html
<div dir="rtl">
  <aegov-form-field>
    <aegov-label>
      الهوية الإماراتية
      <span class="text-aered-600" aria-hidden="true">*</span>
      <span class="sr-only">(مطلوب)</span>
    </aegov-label>
    <aegov-input name="emiratesId" is-required hint="١٥ رقمًا كما هي مكتوبة على البطاقة"></aegov-input>
  </aegov-form-field>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <aegov-form-field>
      <aegov-label>الهوية الإماراتية <span class="text-aered-600" aria-hidden="true">*</span><span class="sr-only">(مطلوب)</span></aegov-label>
      <aegov-input field-id="lbl-rtl-1" name="emiratesId" is-required hint="١٥ رقمًا كما هي مكتوبة على البطاقة"></aegov-input>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>الاسم الأوسط <span class="text-aeblack-400 font-normal">(اختياري)</span></aegov-label>
      <aegov-input field-id="lbl-rtl-2" name="middleName"></aegov-input>
    </aegov-form-field>
  </div>
</div>

Translate the visually hidden "(required)" note along with the label text — it is content, not chrome.

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the inner `<label>`. Auto-generated when omitted, reflected to the host. | `string` | _generated_ |
| `htmlFor` | `for` | ID of the control this label names. Set automatically by `aegov-form-field`. | `string` | — |
| `variant` | `variant` | Colour family. Cascades from `aegov-form-field`. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `extraClass` | `extra-class` | Extra classes appended to the inner `<label>`. | `string` | — |

There is deliberately no `isRequired` property — see [Required fields](#required-fields).

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | The label text, plus any required or optional marker markup. |

### Events

`aegov-label` emits no events.

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the inner `<label>`. |
| `data-*` | Yes | Forwarded to the inner `<label>`. |
| `for` | n/a | Use the `for` attribute directly — it maps to the `htmlFor` property. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host. Use `extra-class` to reach the inner `<label>`. |

### CSS classes

| Class | Element |
| --- | --- |
| `.aegov-label` | The inner `<label>`. |
| `.label-variant-*` | Variant modifier on the label. |

---

## Accessibility

### Built-in behaviour

- The inner element is a real `<label>`, so the browser handles the click-to-focus behaviour and the accessible-name computation natively — no ARIA substitute is involved.
- Inside [`aegov-form-field`](aegov-form-field.html), `for` is set from the control's generated `field-id`, so the association is correct even when you never write an ID.
- The wrapper also applies disabled styling to the label when the control it names is disabled, so the pair reads as one unit.
- The label participates in the form field's invalid styling through the wrapper's `is-invalid` class.

### Developer responsibilities

- **Every control needs a visible label.** A placeholder is not a label: it vanishes on the first keystroke, it is commonly below the 4.5:1 contrast minimum, and it is not reliably exposed as an accessible name.
- **Keep the label short.** It is read out in full on every focus. Put guidance in the control's `hint`.
- **Mark required state on the control**, with `is-required`, not only with an asterisk in the label. Then hide the asterisk from assistive technology with `aria-hidden="true"` and add a visually hidden "(required)" if you want it announced.
- **Verify `for` points at a real ID** when using a label standalone. A dangling `for` produces a control with no accessible name.
- **Use the group's own `label`** for [`aegov-checkbox-group`](aegov-checkbox.html) and [`aegov-radio-group`](aegov-radio.html) — a `<label>` cannot name a group.
- **Use the control's own `label` property** for [`aegov-checkbox`](aegov-checkbox.html), [`aegov-radio`](aegov-radio.html) and [`aegov-toggle`](aegov-toggle.html), which need the label inline beside the control.
- **Do not put interactive elements inside a label.** A link or button nested in a `<label>` creates two competing click targets; put it after the field instead.
- **Translate visually hidden markers** along with the label text.

### Keyboard support

The label is not a focus stop. Activating it — by click or tap — moves focus to the associated control, which is native `<label>` behaviour.

---

## Where to next

- [Form Field](aegov-form-field.html) — the wrapper that links labels to controls and cascades validation state.
- [Input](aegov-input.html), [Textarea](aegov-textarea.html), [Select](aegov-select.html) — the controls a label names.
- [Checkbox](aegov-checkbox.html), [Radio](aegov-radio.html), [Toggle](aegov-toggle.html) — controls with their own inline `label` property.
- [Validation Surface](validation-overview.html) — how hint and error text relate to the label.
