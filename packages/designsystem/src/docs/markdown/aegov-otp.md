# OTP

<p class="text-lg text-aeblack-500 mb-8">An OTP input collects a short code one character per cell — a one-time password from an SMS, an email verification code, a PIN. Splitting the code into cells makes it easy to read back and to check, and the component handles the auto-advance, paste, and backspace behaviour that users expect from this pattern.</p>

## Introduction

`aegov-otp` renders one input per character and keeps them in sync with a single value. It is a form-associated custom element, so the assembled code submits with the form under one `name`.

```html
<aegov-form-field>
  <aegov-label>Verification code</aegov-label>
  <aegov-otp name="code" length="6" hint="Enter the 6-digit code sent to your mobile"></aegov-otp>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-form-field>
      <aegov-label>Verification code</aegov-label>
      <aegov-otp field-id="otp-intro" name="code" length="6" hint="Enter the 6-digit code sent to your mobile"></aegov-otp>
    </aegov-form-field>
  </div>
</div>

Typing advances to the next cell automatically, backspace on an empty cell steps back, and pasting a full code fills every cell at once.

---

## Length

`length` sets the number of cells. Match it exactly to the code your service sends — a mismatch means the user cannot complete the field.

```html
<aegov-otp length="4" name="pin"></aegov-otp>
<aegov-otp length="5" name="code5"></aegov-otp>
<aegov-otp length="6" name="code6"></aegov-otp>
<aegov-otp length="8" name="code8"></aegov-otp>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-6">
    <div><p class="text-sm text-aeblack-500 mb-2">length="4"</p><aegov-otp field-id="otp-l-4" length="4"></aegov-otp></div>
    <div><p class="text-sm text-aeblack-500 mb-2">length="5" (default)</p><aegov-otp field-id="otp-l-5" length="5"></aegov-otp></div>
    <div><p class="text-sm text-aeblack-500 mb-2">length="6"</p><aegov-otp field-id="otp-l-6" length="6"></aegov-otp></div>
    <div><p class="text-sm text-aeblack-500 mb-2">length="8"</p><aegov-otp field-id="otp-l-8" length="8"></aegov-otp></div>
  </div>
</div>

Keep codes short. Beyond eight cells the pattern stops helping — the row wraps awkwardly and the cells become the harder thing to track, not the code.

---

## Appearance

`appearance` changes how the cells are grouped.

| Appearance | Look |
| --- | --- |
| `continuous` | Default. Cells joined into a single connected field. |
| `individual` | Separated cells with a divider, which reads as distinct characters. |

```html
<aegov-otp appearance="continuous" length="6"></aegov-otp>
<aegov-otp appearance="individual" length="6"></aegov-otp>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-6">
    <div><p class="text-sm text-aeblack-500 mb-2">continuous (default)</p><aegov-otp field-id="otp-ap-1" appearance="continuous" length="6" value="123456"></aegov-otp></div>
    <div><p class="text-sm text-aeblack-500 mb-2">individual</p><aegov-otp field-id="otp-ap-2" appearance="individual" length="6" value="123456"></aegov-otp></div>
  </div>
</div>

Note the property is `appearance`, not `style` — `style` is a reserved DOM property and cannot be used as a component property name.

---

## Sizes

Six tokens here, one more than the rest of the form family: OTP adds `2xl` for verification screens where the code is the only thing on the page.

```html
<aegov-otp size="xs" length="6"></aegov-otp>
<aegov-otp size="base" length="6"></aegov-otp>
<aegov-otp size="xl" length="6"></aegov-otp>
<aegov-otp size="2xl" length="6"></aegov-otp>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-6">
    <div><p class="text-sm text-aeblack-500 mb-2">xs</p><aegov-otp field-id="otp-s-xs" size="xs" length="6" value="123456"></aegov-otp></div>
    <div><p class="text-sm text-aeblack-500 mb-2">sm</p><aegov-otp field-id="otp-s-sm" size="sm" length="6" value="123456"></aegov-otp></div>
    <div><p class="text-sm text-aeblack-500 mb-2">base</p><aegov-otp field-id="otp-s-base" size="base" length="6" value="123456"></aegov-otp></div>
    <div><p class="text-sm text-aeblack-500 mb-2">lg</p><aegov-otp field-id="otp-s-lg" size="lg" length="6" value="123456"></aegov-otp></div>
    <div><p class="text-sm text-aeblack-500 mb-2">xl</p><aegov-otp field-id="otp-s-xl" size="xl" length="6" value="123456"></aegov-otp></div>
    <div><p class="text-sm text-aeblack-500 mb-2">2xl</p><aegov-otp field-id="otp-s-2xl" size="2xl" length="6" value="123456"></aegov-otp></div>
  </div>
</div>

### Responsive sizes

`size` accepts a responsive string with the prefixes `xs`, `sm`, `md`, `lg`, `xl` and `2xl`. This is worth using here — a six-cell row at `xl` does not fit a small phone.

```html
<aegov-otp size="base md:lg xl:2xl" length="6"></aegov-otp>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-otp field-id="otp-s-resp" size="base md:lg xl:2xl" length="6"></aegov-otp>
</div>

---

## Alphanumeric codes

By default only digits are accepted. `is-alphanumeric` allows letters as well.

```html
<aegov-otp length="6" name="numeric"></aegov-otp>
<aegov-otp length="6" name="alnum" is-alphanumeric></aegov-otp>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-6">
    <div><p class="text-sm text-aeblack-500 mb-2">Digits only (default)</p><aegov-otp field-id="otp-an-1" length="6"></aegov-otp></div>
    <div><p class="text-sm text-aeblack-500 mb-2">is-alphanumeric</p><aegov-otp field-id="otp-an-2" length="6" is-alphanumeric value="A7B2K9"></aegov-otp></div>
  </div>
</div>

Digits-only is the better default for SMS codes because it lets the numeric keypad appear on mobile. Only enable letters if your codes genuinely contain them, and say so in the hint.

---

## Pattern

`pattern` applies a regular expression to the assembled value, feeding the `patternMismatch` validity flag.

```html
<aegov-otp length="6" name="code" pattern="^\d{6}$" hint="6 digits"></aegov-otp>
<aegov-otp length="8" name="ref" is-alphanumeric pattern="^[A-Z0-9]{8}$" hint="8 characters, letters and digits"></aegov-otp>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-6">
    <aegov-otp field-id="otp-p-1" length="6" name="code" pattern="^\d{6}$" hint="6 digits"></aegov-otp>
    <aegov-otp field-id="otp-p-2" length="8" name="ref" is-alphanumeric pattern="^[A-Z0-9]{8}$" hint="8 characters, letters and digits"></aegov-otp>
  </div>
</div>

If you are migrating from an earlier version: there is no longer a separate `aegovOtpInvalid` event. A pattern failure now surfaces through the unified `aegovValidate` event as `validity.patternMismatch`. See [Validation](#validation).

---

## States

```html
<aegov-otp length="6" is-disabled value="123456"></aegov-otp>
<aegov-otp length="6" is-required></aegov-otp>
<aegov-otp length="6" is-invalid error-message="That code is incorrect or has expired" value="123456"></aegov-otp>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-6">
    <aegov-otp field-id="otp-st-1" length="6" is-disabled value="123456"></aegov-otp>
    <aegov-otp field-id="otp-st-2" length="6" is-required hint="Required"></aegov-otp>
    <aegov-otp field-id="otp-st-3" length="6" is-invalid error-message="That code is incorrect or has expired" value="123456"></aegov-otp>
    <aegov-otp field-id="otp-st-4" length="6" variant="secondary" value="123456"></aegov-otp>
  </div>
</div>

---

## Composite example — verification screen

The realistic shape: submit as soon as the code is complete, show the failure inline, and clear so the user can retry without deleting six characters by hand.

```html
<div class="max-w-sm text-center">
  <h2>Verify your mobile number</h2>
  <p class="text-aeblack-500">We sent a 6-digit code to +971 50 ••• 4567</p>

  <aegov-otp id="code" name="code" length="6" size="lg" pattern="^\d{6}$"></aegov-otp>

  <aegov-button id="verify" variant="primary" size="lg" is-full is-disabled>Verify</aegov-button>

  <aegov-button id="resend" appearance="link">Resend code</aegov-button>
</div>

<script type="module">
  const otp = document.querySelector('#code');
  const verify = document.querySelector('#verify');

  // Enable the button only once the code is complete
  otp.addEventListener('aegovOtpChange', (e) => {
    verify.isDisabled = e.detail.value.length !== 6;
  });

  // Auto-submit the moment the last cell is filled
  otp.addEventListener('aegovOtpComplete', () => submit());

  verify.addEventListener('aegovButtonClick', () => submit());

  async function submit() {
    verify.isLoading = true;
    try {
      await api.verifyCode(otp.value);
      location.assign('/application/next');
    } catch {
      await otp.setCustomValidity('That code is incorrect or has expired');
      await otp.clear();                 // clears the cells and refocuses the first
    } finally {
      verify.isLoading = false;
    }
  }
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-sm mx-auto text-center space-y-5">
    <p class="font-semibold text-lg">Verify your mobile number</p>
    <p class="text-sm text-aeblack-500">We sent a 6-digit code to +971 50 ••• 4567</p>
    <div class="flex justify-center"><aegov-otp field-id="otp-cx" name="code" length="6" size="lg"></aegov-otp></div>
    <aegov-button variant="primary" size="lg" is-full>Verify</aegov-button>
    <aegov-button appearance="link">Resend code</aegov-button>
  </div>
</div>

`clear()` is the important call here. Without it, a user whose code was rejected has to press backspace six times before they can try again.

---

## Listening for events

| Event | Fires |
| --- | --- |
| `aegovOtpChange` | On every change to the assembled value. |
| `aegovOtpComplete` | Once, when every cell is filled. |

```js
otp.addEventListener('aegovOtpChange', (e) => {
  console.log(e.detail.value);          // partial or full code
});

otp.addEventListener('aegovOtpComplete', (e) => {
  verifyCode(e.detail.value);           // all cells filled
});
```

`aegovOtpComplete` is what makes auto-submit possible, which is the behaviour users now expect from a verification screen. Pair it with a visible submit button — auto-submit alone is a trap if the request fails or the user pastes the wrong code.

---

## RTL Support

The cells lay out right to left in a `dir="rtl"` container, and auto-advance follows the visual order. Each cell's accessible label is translated automatically, so a screen reader announces the position in Arabic rather than English.

One thing the component does **not** do is reverse the code itself: the value is assembled in DOM order, so the first cell the user types into is the first character of the code regardless of direction. That is correct — a verification code is a sequence of characters, not text with a reading direction.

```html
<div dir="rtl">
  <aegov-form-field>
    <aegov-label>رمز التحقق</aegov-label>
    <aegov-otp name="code" length="6" size="lg" hint="أدخل الرمز المكوّن من ٦ أرقام المُرسل إلى هاتفك"></aegov-otp>
  </aegov-form-field>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-6">
    <aegov-form-field>
      <aegov-label>رمز التحقق</aegov-label>
      <aegov-otp field-id="otp-rtl-1" name="code" length="6" size="lg" hint="أدخل الرمز المكوّن من ٦ أرقام المُرسل إلى هاتفك"></aegov-otp>
    </aegov-form-field>
    <aegov-otp field-id="otp-rtl-2" length="6" appearance="individual" is-invalid error-message="الرمز غير صحيح أو منتهي الصلاحية" value="123456"></aegov-otp>
  </div>
</div>

Write hint text in Arabic-Indic numerals where the rest of your Arabic copy uses them — but note the cells accept Western digits, because that is what the numeric keypad produces and what SMS codes contain.

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the first cell, so a label click focuses it. Auto-generated when omitted, reflected. | `string` | _generated_ |
| `length` | `length` | Number of cells. | `number` | `5` |
| `appearance` | `appearance` | Cell grouping. Named `appearance` because `style` is reserved. | `'continuous' \| 'individual'` | `'continuous'` |
| `size` | `size` | Size token or responsive string. **Six tokens** — includes `2xl`. | `string` — `xs \| sm \| base \| lg \| xl \| 2xl` | `'base'` |
| `variant` | `variant` | Colour family. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `value` | `value` | The assembled code. Mutable. | `string` | `''` |
| `name` | `name` | Form field name. The whole code submits under this one name. | `string` | — |
| `isAlphanumeric` | `is-alphanumeric` | Allow letters as well as digits. | `boolean` | `false` |
| `pattern` | `pattern` | Regular expression applied to the assembled value. Feeds `patternMismatch`. | `string` | — |
| `isDisabled` | `is-disabled` | Disables every cell. Mutable. | `boolean` | `false` |
| `isRequired` | `is-required` | Marks the field required. | `boolean` | `false` |
| `isInvalid` | `is-invalid` | Invalid state. Mutable and reflected. | `boolean` | `false` |
| `errorMessage` | `error-message` | Error text shown while invalid. | `string` | `''` |
| `hint` | `hint` | Helper text shown when no error is showing. | `string` | `''` |
| `extraClass` | `extra-class` | Extra classes on the inner elements. | `string` | — |

### Slots

| Slot | Description |
| --- | --- |
| `hint` | Rich hint markup. Takes precedence over the `hint` property. |
| `error` | Rich error markup. Rendered only while `is-invalid`. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovOtpChange` | `{ value: string }` | The assembled value changed. |
| `aegovOtpComplete` | `{ value: string }` | Every cell is now filled. |
| `aegovValidate` | `AegovValidationDetail<string>` | Unified validation event — see [Validation Surface](validation-overview.html). |

There is no `aegovOtpInvalid` event. Pattern failures arrive through `aegovValidate` as `validity.patternMismatch`.

### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `clear()` | `Promise<void>` | Clears every cell, emits `aegovOtpChange` with an empty value, and focuses the first cell. |
| `validate(trigger?)` | `Promise<AegovValidationResult>` | Re-runs validation and emits `aegovValidate`. |
| `setCustomValidity(message)` | `Promise<void>` | Sets `error-message` and `is-invalid`, and writes the validity through `ElementInternals`. Empty string clears. |

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded — except the attributes the component owns. |
| `data-*` | Yes | Forwarded. |
| `aria-invalid`, `aria-describedby`, `aria-required`, `aria-label` on cells | Managed | Owned by the component. Each cell gets its own position label; `aria-describedby` is attached to the first cell and composes your value with the hint and error IDs. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host. Use `extra-class` for inner elements. |

### CSS classes

| Class | Element |
| --- | --- |
| `.aegov-otp` | The component wrapper. |
| `.otp__wrapper--continuous`, `.otp__wrapper--individual` | Appearance modifier. |
| `.otp__cell--{size}` | Size modifier on each cell. |
| `.otp__divider` | The separator in `individual` appearance. Marked `aria-hidden`. |
| `.is-invalid` | Added to the **host** while `is-invalid`. |

---

## Validation

### Surface

`aegov-otp` implements the shared contract, reporting a `string` value. It is a **form-associated custom element** using `ElementInternals.setFormValue()`, so the assembled code submits under a single `name` and `form.checkValidity()` accounts for it. This is why Safari 16.4 is the support floor. Full reference: [Validation Surface](validation-overview.html).

Relevant validity flags:

| Flag | Set when |
| --- | --- |
| `valueMissing` | `is-required` and the code is empty. |
| `patternMismatch` | The assembled value fails `pattern`. |
| `customError` | You called `setCustomValidity()` with a message. |

### Common recipes

Reject an incomplete code on submit:

```js
otp.addEventListener('aegovValidate', (e) => {
  if (e.detail.trigger === 'input') return;
  const complete = e.detail.value.length === 6;
  otp.isInvalid = !complete;
  otp.errorMessage = complete ? '' : 'Enter all 6 digits';
});
```

A server rejection — the common case, since the component cannot know whether a code is correct:

```js
try {
  await api.verifyCode(otp.value);
} catch (err) {
  await otp.setCustomValidity(
    err.expired ? 'That code has expired. Request a new one.' : 'That code is incorrect.'
  );
  await otp.clear();
}
```

More patterns in [Bring Your Own Validator](validation-byo.html).

### Use with `@aegov/designsystem-validation`

The **optional** companion package drives this surface from a schema.

```ts
import { createForm } from '@aegov/designsystem-validation';
import { valibotAdapter } from '@aegov/designsystem-validation/adapters/valibot';
import * as v from 'valibot';

createForm(form, v.object({
  code: v.pipe(v.string(), v.regex(/^\d{6}$/, 'Enter the 6-digit code')),
}), valibotAdapter());
```

---

## Accessibility

### Built-in behaviour

- Each cell is a real `<input>`, so typing, selection and the mobile numeric keypad come from the platform.
- The cells are wrapped in a `role="group"` labelled by the field's label, so assistive technology announces them as one field rather than six unrelated inputs.
- Each cell carries its own positional `aria-label`, translated in RTL contexts, so a screen reader user knows which character they are on.
- `aria-required` and `aria-describedby` are attached to the **first** cell only — repeating them on every cell would make the hint be read six times.
- `aria-describedby` is composed, preserving your own value alongside the hint and error region IDs.
- `field-id` lands on the first visible cell, so clicking the label focuses where typing should start.
- The divider in `individual` appearance is marked `aria-hidden="true"`.
- The error region takes `role="alert"` only after first blur.
- Paste strips all whitespace and fills from the first cell, so a code copied out of an SMS with spaces still works.
- The focus ring is a high-contrast camel outline held constant across variants, meeting the 3:1 requirement of WCAG 2.2 SC 1.4.11.

### Developer responsibilities

- **Always label the field**, via [`aegov-label`](aegov-label.html) inside [`aegov-form-field`](aegov-form-field.html). The group's accessible name comes from it.
- **Say where the code came from**, in the hint: "Enter the 6-digit code sent to +971 50 ••• 4567". A bare "Verification code" leaves the user hunting.
- **Match `length` to the real code length.** A six-cell field for a five-digit code cannot be completed.
- **Keep `is-alphanumeric` off for numeric codes**, so mobile users get the numeric keypad.
- **Add `autocomplete="one-time-code"`** as a pass-through attribute where the platform supports it — iOS and Android will then offer the code from the SMS directly.
- **Call `clear()` after a rejected code**, so retrying does not require six backspaces.
- **Provide a resend path** with a visible countdown. A verification screen with no way forward when the SMS never arrives is a dead end.
- **Do not auto-submit as the only route.** Keep a visible submit button for anyone who pastes a wrong code or whose request fails.
- **Never signal an error with colour alone** (WCAG 2.2 SC 1.4.1) — populate `error-message` or the `error` slot.

### Keyboard support

| Key | Action |
| --- | --- |
| `Tab` | Move focus into or out of the group. |
| Printable character | Fill the focused cell and advance to the next. |
| `Backspace` | Clear the focused cell, or step back to the previous cell when already empty. |
| `ArrowLeft`, `ArrowRight` | Move between cells. Follows visual order, so it reverses under `dir="rtl"`. |
| `Ctrl`/`Cmd` + `V` | Paste a full code — whitespace is stripped and the cells fill from the first. |

---

## Where to next

- [Input](aegov-input.html) — for ordinary single-line text.
- [Button](aegov-button.html) — the verify and resend actions, including the loading state.
- [Callout](aegov-callout.html) — for explaining a blocked verification at page level.
- [Validation Surface](validation-overview.html) and [Bring Your Own Validator](validation-byo.html).
