# OTP

<p class="text-lg text-aeblack-500 mb-8">An OTP (one-time passcode) input is a row of focused cells used to enter a short verification code received by SMS, email, or an authenticator app. It auto-advances focus as the user types, supports paste-to-fill, and can validate against an alphanumeric or pattern rule. Use it for multi-factor authentication, transaction confirmation, and identity verification flows.</p>

## Introduction

The `aegov-otp` component renders a configurable number of input cells as a single logical input. Auto-advance moves focus on each character; backspace returns focus and clears the previous cell; paste distributes the clipboard contents from the first cell. It emits a single combined value through change and complete events, and uses `ElementInternals` to participate in standard form submission as a single field.

```html
<aegov-otp length="6" name="otp_code"></aegov-otp>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-otp length="6" name="otp_code"></aegov-otp>
</div>

---

## Variants

The `appearance` property selects between two visual layouts.

### Continuous (default)

A single bordered group with thin dividers between cells. Best when the code is read as one logical token (typical SMS or authenticator OTP).

```html
<aegov-otp appearance="continuous" length="6"></aegov-otp>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-otp appearance="continuous" length="6"></aegov-otp>
</div>

### Individual

Each cell is rendered as a fully separated, bordered box. Useful when the code is read as discrete digits — for example PIN-style activation codes printed on a physical voucher.

```html
<aegov-otp appearance="individual" length="6"></aegov-otp>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-otp appearance="individual" length="6"></aegov-otp>
</div>

---

## Length

The `length` property sets the number of cells. Common values are `4` (PIN), `5` (default), `6` (most SMS / TOTP codes), or `8` (longer activation codes).

```html
<aegov-otp length="4"></aegov-otp>
<aegov-otp length="5"></aegov-otp>
<aegov-otp length="6"></aegov-otp>
<aegov-otp length="8"></aegov-otp>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-col gap-6">
  <aegov-otp length="4"></aegov-otp>
  <aegov-otp length="5"></aegov-otp>
  <aegov-otp length="6"></aegov-otp>
  <aegov-otp length="8"></aegov-otp>
</div>

---

## Sizes

The `size` property scales each cell. Six tokens are available — `xs`, `sm`, `base` (default), `lg`, `xl`, and `2xl`.

```html
<aegov-otp size="xs" length="6"></aegov-otp>
<aegov-otp size="sm" length="6"></aegov-otp>
<aegov-otp size="base" length="6"></aegov-otp>
<aegov-otp size="lg" length="6"></aegov-otp>
<aegov-otp size="xl" length="6"></aegov-otp>
<aegov-otp size="2xl" length="6"></aegov-otp>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-col gap-6">
  <aegov-otp size="xs" length="6"></aegov-otp>
  <aegov-otp size="sm" length="6"></aegov-otp>
  <aegov-otp size="base" length="6"></aegov-otp>
  <aegov-otp size="lg" length="6"></aegov-otp>
  <aegov-otp size="xl" length="6"></aegov-otp>
  <aegov-otp size="2xl" length="6"></aegov-otp>
</div>

### Responsive sizes

The `size` property accepts a Tailwind-style responsive string with the breakpoint prefixes `xs`, `sm`, `md`, `lg`, `xl`, and `2xl`.

```html
<aegov-otp size="sm md:base lg:lg" length="6"></aegov-otp>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-otp size="sm md:base lg:lg" length="6"></aegov-otp>
</div>

---

## Variant

The `variant` property selects the colour family for the idle cell border, the focused cell border, and the filled cell text. The focus ring uses the variant's support colour (`primary-support-400` for primary, `secondary-support-400` for secondary, `seablue-400` for neutral variants). The error border always stays `aered-600` regardless of variant.

- `primary` — primary-* family (default)
- `secondary` — secondary-* family
- `neutral-max` — strong neutral (aeblack-800 family)
- `neutral-min` — quiet neutral (aeblack-100 family)

### Colour matrix

| Variant       | Idle border       | Focused border          | Filled text      |
| ------------- | ----------------- | ----------------------- | ---------------- |
| `primary`     | `primary-600`     | `primary-support-400`   | `primary-900`    |
| `secondary`   | `secondary-600`   | `secondary-support-400` | `secondary-900`  |
| `neutral-max` | `aeblack-800`     | `seablue-400`           | `aeblack-950`    |
| `neutral-min` | `aeblack-300`     | `seablue-400`           | `aeblack-700`    |

```html
<aegov-otp variant="primary" length="6"></aegov-otp>
<aegov-otp variant="secondary" length="6"></aegov-otp>
<aegov-otp variant="neutral-max" length="6"></aegov-otp>
<aegov-otp variant="neutral-min" length="6"></aegov-otp>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-col gap-6">
  <aegov-otp variant="primary" length="6"></aegov-otp>
  <aegov-otp variant="secondary" length="6"></aegov-otp>
  <aegov-otp variant="neutral-max" length="6"></aegov-otp>
  <aegov-otp variant="neutral-min" length="6"></aegov-otp>
</div>

---

## Numeric vs. alphanumeric

By default the component accepts digits only (`0`–`9`) and presents the numeric keyboard on mobile via `inputmode="numeric"`. Set `is-alphanumeric="true"` to accept letters as well — useful for codes that mix digits and letters such as activation tokens.

### Numeric only (default)

```html
<aegov-otp length="6"></aegov-otp>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-otp length="6"></aegov-otp>
</div>

### Alphanumeric

```html
<aegov-otp length="8" is-alphanumeric="true"></aegov-otp>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-otp length="8" is-alphanumeric="true"></aegov-otp>
</div>

---

## Pattern validation

Use the `pattern` property to validate the assembled value. When the user fills the last cell, the component checks the regex; if it fails, `aegovValidate` is emitted with `validity.patternMismatch === true`. Combine with your own UI to surface an inline error.

```html
<!-- Six digits where the first must be 1, 2, or 3 -->
<aegov-otp length="6" pattern="^[1-3][0-9]{5}$"></aegov-otp>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-otp length="6" pattern="^[1-3][0-9]{5}$"></aegov-otp>
</div>

---

## Disabled

Set `is-disabled="true"` to disable every cell. The component appears muted and does not accept keyboard input or paste.

```html
<aegov-otp length="6" is-disabled="true" value="123"></aegov-otp>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-otp length="6" is-disabled="true" value="123"></aegov-otp>
</div>

---

## Pre-filled value

Set the `value` attribute to seed the cells. Setting the property programmatically also redistributes the value across cells.

```html
<aegov-otp length="6" value="478129"></aegov-otp>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-otp length="6" value="478129"></aegov-otp>
</div>

---

## Paste support

Paste the entire code into any cell — the component distributes characters from cell 0 onwards, ignores spaces, and rejects invalid characters according to the alphanumeric rule. It then focuses the first empty cell, or the last cell if the code is complete. This works equally well with autofill from SMS on iOS / Android (`autocomplete="one-time-code"`).

Try copying `123456` and pasting into the field below.

```html
<aegov-otp length="6"></aegov-otp>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-otp length="6"></aegov-otp>
</div>

---

## Form integration

Provide a `name` to participate in standard form submission. The component uses `ElementInternals` to submit the assembled value as a single field without adding a visible hidden input — `name` is the only requirement.

```html
<form>
  <aegov-otp length="6" name="mfa_code"></aegov-otp>
</form>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-otp length="6" name="mfa_code"></aegov-otp>
</div>

---

## UAE Pass MFA verification example

A typical UAE Government scenario: confirming a UAE Pass two-factor authentication code sent by SMS to the citizen's registered mobile number. The example wires the complete and invalid events to update an inline status message.

```html
<aegov-label field-id="mfa">
  Enter the 6-digit code sent to your UAE Pass mobile number
</aegov-label>
<aegov-otp id="mfa-otp" field-id="mfa" length="6" pattern="^[0-9]{6}$" name="mfa_code"></aegov-otp>
<p id="mfa-status" class="mt-3 text-sm text-aeblack-600">Waiting for code…</p>

<script>
  const otp = document.querySelector('#mfa-otp');
  const status = document.querySelector('#mfa-status');
  otp.addEventListener('aegovOtpComplete', (e) => {
    status.textContent = 'Verifying ' + e.detail.value + '…';
    status.className = 'mt-3 text-sm text-techblue-600';
  });
  otp.addEventListener('aegovValidate', (e) => {
    if (e.detail.validity.patternMismatch) {
      status.textContent = 'That code is not valid. Please try again.';
      status.className = 'mt-3 text-sm text-aered-600';
    }
  });
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-label field-id="mfa-uae">
    Enter the 6-digit code sent to your UAE Pass mobile number
  </aegov-label>
  <aegov-otp field-id="mfa-uae" length="6" pattern="^[0-9]{6}$"></aegov-otp>
</div>

---

## RTL Support

The component is direction-agnostic. When the document or any ancestor is set to `dir="rtl"` the cell row mirrors automatically. The first cell sits on the right, focus advances to the left as the user types, and paste continues to fill from the first cell (the rightmost cell in RTL).

```html
<div dir="rtl">
  <aegov-label field-id="mfa-ar">أدخل الرمز المكوّن من 6 أرقام المرسل إلى رقم هاتفك</aegov-label>
  <aegov-otp field-id="mfa-ar" length="6"></aegov-otp>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-label field-id="mfa-ar">أدخل الرمز المكوّن من 6 أرقام المرسل إلى رقم هاتفك</aegov-label>
  <aegov-otp field-id="mfa-ar" length="6"></aegov-otp>
</div>

The same field with the individual appearance in RTL:

```html
<div dir="rtl">
  <aegov-otp appearance="individual" length="4" size="lg"></aegov-otp>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-otp appearance="individual" length="4" size="lg"></aegov-otp>
</div>

---

## API Reference

### aegov-otp Properties

| Property         | Attribute         | Description                                                                                  | Type                          | Default       |
| ---------------- | ----------------- | -------------------------------------------------------------------------------------------- | ----------------------------- | ------------- |
| `fieldId`        | `field-id`        | DOM `id` for the first input cell. Used by `aegov-label` for linking. Auto-generated if omitted.| `string`                      | _generated_   |
| `appearance`        | `appearance`         | Visual layout. `continuous` is one bordered group; `individual` is separated cells.           | `'continuous' \| 'individual'`| `'continuous'`|
| `length`         | `length`          | Number of input cells.                                                                        | `number`                      | `5`           |
| `size`           | `size`            | Cell size token (`xs`, `sm`, `base`, `lg`, `xl`, `2xl`) or a responsive string.                | `string`                      | `'base'`      |
| `variant`        | `variant`         | Colour family for idle/focused cell border and filled cell accent. Focus ring stays camel; error stays aered. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `isAlphanumeric` | `is-alphanumeric` | Allow letters and numbers when `true`. Numbers only when `false`.                              | `boolean`                     | `false`       |
| `pattern`        | `pattern`         | Regex string checked when all cells are filled. Failure emits `aegovValidate` with `validity.patternMismatch === true`.    | `string`                      | `undefined`   |
| `isDisabled`     | `is-disabled`     | Disables all cells.                                                                            | `boolean`                     | `false`       |
| `isRequired`     | `is-required`     | Marks the field as required. `validity.valueMissing` is true when empty.                       | `boolean`                     | `false`       |
| `isInvalid`      | `is-invalid`      | Puts all cells in an error state and shows the error message.                                  | `boolean`                     | `false`       |
| `errorMessage`   | `error-message`   | Inline error text rendered below the cells when `isInvalid` is `true`.                         | `string`                      | `''`          |
| `hint`           | `hint`            | Hint text rendered below the cells (hidden when `isInvalid` is `true`).                        | `string`                      | `''`          |
| `name`           | `name`            | Form field name used when the component submits via `ElementInternals`.                        | `string`                      | `undefined`   |
| `value`          | `value`           | Current value. Setting this redistributes characters across cells.                             | `string`                      | `''`          |
| `extraClass`     | `extra-class`     | Additional CSS classes appended to the wrapper.                                                | `string`                      | `undefined`   |

### Methods

| Method                          | Returns                       | Description                                              |
| ------------------------------- | ----------------------------- | -------------------------------------------------------- |
| `clear()`                       | `Promise<void>`               | Clears every cell, emits `aegovOtpChange`, and focuses the first cell. |
| `validate(trigger?)`            | `Promise<AegovValidationResult>` | Re-runs validation and emits `aegovValidate`. |
| `setCustomValidity(message)`    | `Promise<void>`               | Sets a custom error message. Pass `''` to clear. |

```html
<aegov-otp id="mfa" length="6"></aegov-otp>
<button onclick="document.querySelector('#mfa').clear()">Reset code</button>
```

### Slots

| Slot    | Description                                                                                         |
| ------- | --------------------------------------------------------------------------------------------------- |
| `error` | Shown when `isInvalid` is true. Use for rich HTML error markup instead of the `errorMessage` prop.  |
| `hint`  | Shown when not in error state. Use for rich HTML hint markup instead of the `hint` prop.            |

### Events

| Event                | Detail                                  | Description                                                                                  |
| -------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------- |
| `aegovOtpChange`     | `{ value: string }`                     | Fires after every character change with the current assembled value.                         |
| `aegovOtpComplete`   | `{ value: string }`                     | Fires when all cells are filled and the optional `pattern` validates.                        |
| `aegovValidate`      | `AegovValidationDetail<string>`         | Unified validation event. `validity.patternMismatch` is `true` when `pattern` fails. See the Validation section below. |

#### Listening for completion and pattern failure

```html
<aegov-otp id="mfa" length="6" pattern="^[0-9]{6}$"></aegov-otp>

<script>
  const otp = document.querySelector('#mfa');
  otp.addEventListener('aegovOtpComplete', (e) => {
    console.log('Submitting code:', e.detail.value);
  });
  otp.addEventListener('aegovValidate', (e) => {
    if (e.detail.validity.patternMismatch) {
      console.warn('Code did not match pattern:', e.detail.value);
    }
  });
</script>
```

### Pass-through Attributes

The component forwards `aria-*` and `data-*` attributes onto the inner cell-group wrapper. Apply them on `<aegov-otp>` to extend the group's ARIA semantics or to add test selectors.

| Attribute group | Forwarded? | Where applied                                          |
| --------------- | ---------- | ------------------------------------------------------ |
| `aria-*`        | Yes        | The inner `role="group"` wrapper around the cells.     |
| `data-*`        | Yes        | The inner `role="group"` wrapper around the cells.     |
| `class`, `style`| Allowed    | The host element (use `extra-class` for cell wrapper).  |

To set the field's accessible label, pair the OTP with `<aegov-label field-id="...">` rather than relying on `aria-label` on the host.

---

## Validation

`aegov-otp` exposes the unified [Validation Surface](validation-overview.html). OTP-specific notes:

### FormAssociated

The component participates in `<form>` via `ElementInternals` (no inner hidden input). `name` prop is required for form submission.

> **Removed event:** `aegovOtpInvalid` was removed in `0.2.0` in favor of the unified `aegovValidate` event with `validity.patternMismatch === true`.

### Validity flags surfaced

| Validity flag | When |
| --- | --- |
| `valueMissing` | `is-required` and no characters entered |
| `tooShort` | partially filled but `value.length < length` |
| `patternMismatch` | filled value fails the `pattern` regex |
| `customError` | `setCustomValidity('msg')` invoked |

### Common recipes

**Required 6-digit OTP:**

```html
<aegov-otp name="code" length="6" is-required hint="Sent to your phone"></aegov-otp>
```

**Numeric pattern enforcement:**

```html
<aegov-otp name="pin" length="4" pattern="^\d{4}$"></aegov-otp>
```

**Server-rejected code:**

```js
otp.addEventListener('aegovOtpComplete', async (e) => {
  const res = await api.verifyOtp(e.detail.value);
  if (!res.ok) {
    await otp.setCustomValidity('Code expired or incorrect');
  } else {
    await otp.setCustomValidity('');
  }
});
```

See [BYO Validator](validation-byo.html) for more patterns.

---

## Accessibility

### Built-in behaviour

- Each cell is a real `<input type="text">` with `inputmode="numeric"` (or `text` when alphanumeric), so mobile devices show the correct keyboard.
- The first cell carries `autocomplete="one-time-code"` to enable iOS / Android SMS autofill.
- The cells are wrapped in a `role="group"` element so screen readers treat them as a single field. Each cell has an `aria-label` of the form "Character N of L" (Arabic: "حرف N من L") so users know their position regardless of reading direction.
- The first cell carries `aria-invalid="true"` (mirrored to all cells when `is-invalid` is set), `aria-required="true"` (when `is-required` is set), and `aria-describedby` pointing to the error and hint regions — so error and hint text are announced by assistive technology when the first cell is focused.
- Validation (`aria-live` error region) only activates after focus has left the entire OTP group, preventing premature announcements while the user is typing between cells.
- Focus auto-advances to the next cell after a valid character and returns to the previous cell on backspace when the current cell is empty.
- Paste fills from the first cell, ignores whitespace, and rejects characters that fail the alphanumeric rule.
- Form participation is handled via `ElementInternals` — the assembled value is submitted as a single form field without a visible hidden input.

### Developer responsibilities

- Pair the OTP with an `<aegov-label>` linked through `field-id` — the per-cell `aria-label` describes position, not purpose.
- Use the optional `pattern` only as a fast failure signal; always verify the code on the server.
- Set `is-invalid` and `error-message` (or use the `error` slot) to surface inline errors — the component's built-in `aria-live` region announces them automatically after the user leaves the OTP group.
- Provide a way to resend the code (a button or link) and a way to reset the field — call `.clear()` on the host element.

### Keyboard support

| Key                | Action                                                                  |
| ------------------ | ----------------------------------------------------------------------- |
| `0`–`9`, `A`–`Z`   | Enter a character. Auto-advances focus to the next cell.                |
| `Backspace`        | Clear the current cell, or step back to the previous cell when empty.    |
| `Arrow Left`       | Move focus to the previous cell.                                        |
| `Arrow Right`      | Move focus to the next cell.                                            |
| `Cmd/Ctrl + V`     | Paste the code; characters are distributed across cells from the start.  |
| `Tab`              | Move focus out of the OTP to the next focusable element.                 |
| `Shift + Tab`      | Move focus out of the OTP to the previous focusable element.             |
