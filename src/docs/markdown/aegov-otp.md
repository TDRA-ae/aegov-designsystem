# OTP Input

<p class="text-lg text-aeblack-500 mb-8">A one-time password input that splits a code into individual character cells, making it easy for users to enter verification codes received via SMS, email, or authenticator apps.</p>

## Introduction

The `aegov-otp` component renders a row of individual input cells that together form a single OTP code. It handles keyboard navigation between cells, clipboard paste distribution, auto-completion detection, and optional pattern validation — all out of the box.

The component provides **2 variants**, **6 sizes**, and supports alphanumeric input, disabled state, form submission via a hidden input, and pattern-based validation.

```html
<aegov-otp></aegov-otp>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-otp></aegov-otp>
</div>

---

## Variants

The `variant` property controls the visual layout of the input cells. There are two variants available.

### Continuous

The default variant. All cells are grouped inside a single bordered container with thin dividers between them — giving the appearance of one unified input.

```html
<aegov-otp variant="continuous"></aegov-otp>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-otp variant="continuous"></aegov-otp>
</div>

### Individual

Each cell is rendered as a separate bordered box with spacing between them.

```html
<aegov-otp variant="individual"></aegov-otp>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-otp variant="individual"></aegov-otp>
</div>

---

## Length

The `length` property controls how many input cells are rendered. The default is **5**. Common values are 4, 5, and 6.

```html
<aegov-otp length="4"></aegov-otp>
<aegov-otp length="6"></aegov-otp>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div>
    <p class="text-sm font-semibold text-aeblack-600 mb-2">4 digits</p>
    <aegov-otp length="4"></aegov-otp>
  </div>
  <div>
    <p class="text-sm font-semibold text-aeblack-600 mb-2">5 digits (default)</p>
    <aegov-otp length="5"></aegov-otp>
  </div>
  <div>
    <p class="text-sm font-semibold text-aeblack-600 mb-2">6 digits</p>
    <aegov-otp length="6"></aegov-otp>
  </div>
</div>

---

## Sizes

The `size` property controls the width, height, and font size of each cell. There are six sizes available.

| Size   | Width  | Height | Font Size |
|--------|--------|--------|-----------|
| `xs`   | 32px   | 36px   | 12px      |
| `sm`   | 36px   | 40px   | 14px      |
| `base` | 40px   | 44px   | 16px      |
| `lg`   | 44px   | 48px   | 18px      |
| `xl`   | 48px   | 52px   | 20px      |
| `2xl`  | 64px   | 64px   | 24px      |

```html
<aegov-otp size="xs" length="4"></aegov-otp>
<aegov-otp size="sm" length="4"></aegov-otp>
<aegov-otp size="base" length="4"></aegov-otp>
<aegov-otp size="lg" length="4"></aegov-otp>
<aegov-otp size="xl" length="4"></aegov-otp>
<aegov-otp size="2xl" length="4"></aegov-otp>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div>
    <p class="text-sm font-semibold text-aeblack-600 mb-2">Extra Small (xs)</p>
    <aegov-otp size="xs" length="4"></aegov-otp>
  </div>
  <div>
    <p class="text-sm font-semibold text-aeblack-600 mb-2">Small (sm)</p>
    <aegov-otp size="sm" length="4"></aegov-otp>
  </div>
  <div>
    <p class="text-sm font-semibold text-aeblack-600 mb-2">Base (default)</p>
    <aegov-otp size="base" length="4"></aegov-otp>
  </div>
  <div>
    <p class="text-sm font-semibold text-aeblack-600 mb-2">Large (lg)</p>
    <aegov-otp size="lg" length="4"></aegov-otp>
  </div>
  <div>
    <p class="text-sm font-semibold text-aeblack-600 mb-2">Extra Large (xl)</p>
    <aegov-otp size="xl" length="4"></aegov-otp>
  </div>
  <div>
    <p class="text-sm font-semibold text-aeblack-600 mb-2">2X Large (2xl)</p>
    <aegov-otp size="2xl" length="4"></aegov-otp>
  </div>
</div>

### Responsive Size

The `size` prop accepts Tailwind-style responsive prefixes. Write a space-separated string where each token is either a plain value or `breakpoint:value`. The base value (no prefix) applies below the smallest specified breakpoint.

Available breakpoints: `xs` (480px), `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px), `3xl` (1680px).

```html
<aegov-otp size="sm xl:lg" length="4"></aegov-otp>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-otp size="sm xl:lg" length="4"></aegov-otp>
</div>

> **Graceful degradation:** Unknown breakpoint names and invalid values are silently ignored. An unrecognised base value falls back to the component default.

---

## Sizes with Individual Variant

The same six sizes are available for the individual variant.

```html
<aegov-otp variant="individual" size="sm" length="4"></aegov-otp>
<aegov-otp variant="individual" size="lg" length="4"></aegov-otp>
<aegov-otp variant="individual" size="2xl" length="4"></aegov-otp>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div>
    <p class="text-sm font-semibold text-aeblack-600 mb-2">Small Individual</p>
    <aegov-otp variant="individual" size="sm" length="4"></aegov-otp>
  </div>
  <div>
    <p class="text-sm font-semibold text-aeblack-600 mb-2">Large Individual</p>
    <aegov-otp variant="individual" size="lg" length="4"></aegov-otp>
  </div>
  <div>
    <p class="text-sm font-semibold text-aeblack-600 mb-2">2X Large Individual</p>
    <aegov-otp variant="individual" size="2xl" length="4"></aegov-otp>
  </div>
</div>

---

## Disabled State

Set the `disabled` attribute to prevent all interaction. The cells become visually muted with a grey background.

```html
<aegov-otp disabled></aegov-otp>
<aegov-otp variant="individual" disabled></aegov-otp>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div>
    <p class="text-sm font-semibold text-aeblack-600 mb-2">Disabled Continuous</p>
    <aegov-otp disabled></aegov-otp>
  </div>
  <div>
    <p class="text-sm font-semibold text-aeblack-600 mb-2">Disabled Individual</p>
    <aegov-otp variant="individual" disabled></aegov-otp>
  </div>
</div>

---

## Alphanumeric Mode

By default, only numeric digits (0-9) are accepted. Set the `alphanumeric` attribute to allow both letters and numbers.

```html
<!-- Numbers only (default) -->
<aegov-otp></aegov-otp>

<!-- Letters and numbers -->
<aegov-otp alphanumeric></aegov-otp>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div>
    <p class="text-sm font-semibold text-aeblack-600 mb-2">Numeric only (default) — try typing a letter</p>
    <aegov-otp length="4"></aegov-otp>
  </div>
  <div>
    <p class="text-sm font-semibold text-aeblack-600 mb-2">Alphanumeric — letters and numbers accepted</p>
    <aegov-otp length="4" alphanumeric></aegov-otp>
  </div>
</div>

---

## Pattern Validation

The `pattern` property accepts a regex string. When all cells are filled, the combined value is tested against the pattern. If the value does not match, the `aegovOtpInvalid` event fires instead of `aegovOtpComplete`.

```html
<!-- Only accept codes starting with "A" followed by 3 digits -->
<aegov-otp length="4" alphanumeric pattern="^A\d{3}$"></aegov-otp>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <p class="text-sm font-semibold text-aeblack-600 mb-2">Pattern: must start with "A" followed by 3 digits (e.g. A123)</p>
  <aegov-otp id="pattern-demo" length="4" alphanumeric pattern="^A\d{3}$"></aegov-otp>
  <p id="pattern-result" class="text-sm mt-3 text-aeblack-500"></p>
</div>

<script>
  (function() {
    var el = document.getElementById('pattern-demo');
    var result = document.getElementById('pattern-result');
    if (el && result) {
      el.addEventListener('aegovOtpComplete', function(e) {
        result.textContent = 'Valid code: ' + e.detail.value;
        result.className = 'text-sm mt-3 text-aegreen-600 font-semibold';
      });
      el.addEventListener('aegovOtpInvalid', function(e) {
        result.textContent = 'Invalid: "' + e.detail.value + '" does not match pattern ' + e.detail.pattern;
        result.className = 'text-sm mt-3 text-aered-600 font-semibold';
      });
    }
  })();
</script>

---

## Pre-filled Value

Use the `value` property to pre-fill the OTP cells. This is useful for auto-populating a code from a URL parameter or previous input.

```html
<aegov-otp value="12345"></aegov-otp>
<aegov-otp variant="individual" value="9876" length="4"></aegov-otp>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div>
    <p class="text-sm font-semibold text-aeblack-600 mb-2">Pre-filled continuous</p>
    <aegov-otp value="12345"></aegov-otp>
  </div>
  <div>
    <p class="text-sm font-semibold text-aeblack-600 mb-2">Pre-filled individual</p>
    <aegov-otp variant="individual" value="9876" length="4"></aegov-otp>
  </div>
</div>

---

## Paste Support

The component handles clipboard paste events intelligently. When a user pastes a code, the characters are distributed across all cells starting from the first cell. Whitespace is automatically stripped. Invalid characters (based on the `alphanumeric` setting) are skipped.

```html
<!-- Try pasting "12345" into any cell -->
<aegov-otp></aegov-otp>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <p class="text-sm font-semibold text-aeblack-600 mb-2">Try pasting a code like "12345" into any cell</p>
  <aegov-otp></aegov-otp>
</div>

---

## Keyboard Navigation

The component provides full keyboard navigation between cells:

- **Typing a character** — fills the current cell and moves focus to the next cell
- **Backspace** — clears the current cell. If the cell is already empty, moves focus to the previous cell and clears it
- **Arrow Left** — moves focus to the previous cell
- **Arrow Right** — moves focus to the next cell
- **Click or Focus** — selects the cell content for easy replacement

---

## Usage with Form Field

Wrap `aegov-otp` inside an `aegov-form-field` with an `aegov-label` for proper label association. The `fieldId` is automatically generated and linked to the label.

```html
<aegov-form-field>
  <aegov-label>Verification Code</aegov-label>
  <aegov-otp name="otp-code" length="6"></aegov-otp>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>Verification Code</aegov-label>
    <aegov-otp name="otp-code" length="6"></aegov-otp>
  </aegov-form-field>
</div>

---

## Form Submission

The component includes a hidden `<input>` element whose `name` and `value` are kept in sync with the OTP cells. This allows the OTP value to be submitted as part of a standard HTML form.

```html
<form id="otp-form">
  <aegov-form-field>
    <aegov-label>Enter OTP</aegov-label>
    <aegov-otp name="verification_code" length="6"></aegov-otp>
  </aegov-form-field>
  <aegov-button type="submit" class="mt-4">Verify</aegov-button>
</form>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <form id="otp-form-demo" onsubmit="return false;">
    <aegov-form-field>
      <aegov-label>Enter OTP</aegov-label>
      <aegov-otp name="verification_code" length="6"></aegov-otp>
    </aegov-form-field>
    <aegov-button type="button" class="mt-4" onclick="var fd = new FormData(document.getElementById('otp-form-demo')); document.getElementById('form-result').textContent = 'Form value: verification_code=' + (fd.get('verification_code') || '(empty)');">Submit</aegov-button>
    <p id="form-result" class="text-sm mt-3 text-aeblack-500"></p>
  </form>
</div>

---

## Events

The component emits three custom events to communicate state changes.

### aegovOtpChange

Fires on every character change (typing, deleting, pasting) with the current combined value.

### aegovOtpComplete

Fires when all cells are filled. If a `pattern` is set, this event only fires when the value matches the pattern.

### aegovOtpInvalid

Fires when all cells are filled but the value does not match the provided `pattern`.

```html
<aegov-otp id="event-demo" length="4"></aegov-otp>

<script>
  var el = document.getElementById('event-demo');

  el.addEventListener('aegovOtpChange', function(e) {
    console.log('Change:', e.detail.value);
  });

  el.addEventListener('aegovOtpComplete', function(e) {
    console.log('Complete:', e.detail.value);
  });
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-otp id="event-demo" length="4"></aegov-otp>
  <div id="event-log" class="mt-4 p-3 bg-white rounded border border-aeblack-200 text-sm font-mono max-h-40 overflow-y-auto text-aeblack-600">
    <p class="text-aeblack-400 italic">Type in the cells above to see events...</p>
  </div>
</div>

<script>
  (function() {
    var el = document.getElementById('event-demo');
    var log = document.getElementById('event-log');
    if (!el || !log) return;
    function addEntry(name, detail) {
      if (log.querySelector('p.italic')) log.innerHTML = '';
      var line = document.createElement('div');
      line.textContent = name + ': ' + JSON.stringify(detail);
      log.prepend(line);
    }
    el.addEventListener('aegovOtpChange', function(e) { addEntry('aegovOtpChange', e.detail); });
    el.addEventListener('aegovOtpComplete', function(e) { addEntry('aegovOtpComplete', e.detail); });
    el.addEventListener('aegovOtpInvalid', function(e) { addEntry('aegovOtpInvalid', e.detail); });
  })();
</script>

---

## Programmatic Clear

Use the `clear()` method to reset all cells and focus the first cell. This is useful after a failed verification attempt.

```html
<aegov-otp id="clearable-otp" length="4" value="1234"></aegov-otp>
<aegov-button id="clear-btn" variant="outline" size="sm">Clear</aegov-button>

<script>
  document.getElementById('clear-btn')
    .addEventListener('aegovButtonClick', function() {
      document.getElementById('clearable-otp').clear();
    });
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div class="flex items-end gap-4">
    <aegov-otp id="clearable-otp" length="4" value="1234"></aegov-otp>
    <aegov-button id="clear-btn" variant="outline" size="sm">Clear</aegov-button>
  </div>
</div>

<script>
  (function() {
    var btn = document.getElementById('clear-btn');
    var otp = document.getElementById('clearable-otp');
    if (btn && otp) {
      btn.addEventListener('click', function() { otp.clear(); });
    }
  })();
</script>

---

## RTL Support

The component supports right-to-left layouts. When a parent element has `dir="rtl"`, the cell order and keyboard navigation remain correct.

```html
<div dir="rtl">
  <aegov-otp length="4"></aegov-otp>
  <aegov-otp variant="individual" length="4"></aegov-otp>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div>
    <p class="text-sm font-semibold text-aeblack-600 mb-2">Continuous (RTL)</p>
    <aegov-otp length="4"></aegov-otp>
  </div>
  <div>
    <p class="text-sm font-semibold text-aeblack-600 mb-2">Individual (RTL)</p>
    <aegov-otp variant="individual" length="4"></aegov-otp>
  </div>
</div>

---

## API Reference

### Properties

| Property       | Attribute       | Description                                                                 | Type                                                          | Default        |
|----------------|-----------------|-----------------------------------------------------------------------------|---------------------------------------------------------------|----------------|
| `variant`      | `variant`       | Visual layout of the cells                                                  | `'continuous'` \| `'individual'`                              | `'continuous'` |
| `length`       | `length`        | Number of input cells                                                       | `number`                                                      | `5`            |
| `size`         | `size`          | Size of each cell. Supports responsive strings (e.g. `'sm xl:lg'`).        | `'xs'` \| `'sm'` \| `'base'` \| `'lg'` \| `'xl'` \| `'2xl'` | `'base'`       |
| `alphanumeric` | `alphanumeric`  | Accept letters and numbers when true; numbers only when false               | `boolean`                                                     | `false`        |
| `pattern`      | `pattern`       | Regex pattern string for validation when all cells are filled               | `string`                                                      | `undefined`    |
| `disabled`     | `disabled`      | Disables all input cells                                                    | `boolean`                                                     | `false`        |
| `name`         | `name`          | Form field name for the hidden input (used in form submission)              | `string`                                                      | `undefined`    |
| `value`        | `value`         | Current OTP value. Can be set externally to pre-fill cells                  | `string`                                                      | `''`           |
| `fieldId`      | `field-id`      | Unique ID for the first input cell. Auto-generated if not provided          | `string`                                                      | auto-generated |
| `class`        | `class`         | Additional CSS classes applied to the wrapper                               | `string`                                                      | `undefined`    |

### Events

| Event              | Description                                                              | Detail Type                            |
|--------------------|--------------------------------------------------------------------------|----------------------------------------|
| `aegovOtpChange`   | Fires on every character change with the current value                   | `{ value: string }`                    |
| `aegovOtpComplete` | Fires when all cells are filled (and pattern is valid, if set)           | `{ value: string }`                    |
| `aegovOtpInvalid`  | Fires when all cells are filled but the pattern validation fails         | `{ value: string; pattern: string }`   |

#### Listening to Events

```html
<aegov-otp id="my-otp" length="6"></aegov-otp>

<script>
  var otp = document.getElementById('my-otp');

  otp.addEventListener('aegovOtpChange', function(e) {
    console.log('Current value:', e.detail.value);
  });

  otp.addEventListener('aegovOtpComplete', function(e) {
    console.log('Code complete:', e.detail.value);
    // Submit the code to your API
  });

  otp.addEventListener('aegovOtpInvalid', function(e) {
    console.log('Invalid:', e.detail.value, 'pattern:', e.detail.pattern);
  });
</script>
```

### Methods

| Method   | Description                                    | Signature          |
|----------|------------------------------------------------|--------------------|
| `clear()` | Clears all cells, resets value, and focuses the first cell | `clear() => Promise<void>` |

#### Calling Methods

```html
<aegov-otp id="my-otp"></aegov-otp>

<script>
  // Clear the OTP input programmatically
  document.getElementById('my-otp').clear();
</script>
```

### Pass-Through Attributes

The component forwards all `aria-*` and `data-*` attributes from the host element to the inner wrapper `<div>` with `role="group"`. This allows you to provide an accessible group label or tracking attributes.

```html
<aegov-otp aria-label="Verification code" data-analytics="otp-input"></aegov-otp>
```

---

## Accessibility

The `aegov-otp` component is built with accessibility as a first-class concern. The following features are included out of the box.

### Built-in Features

- **`role="group"`** — the cell wrapper uses `role="group"` to communicate that the inputs belong together as a single logical field.
- **`aria-label` on each cell** — every input cell has an automatic `aria-label` of "Character N of M" (e.g. "Character 1 of 6") so screen readers can announce the position.
- **`inputMode`** — set to `"numeric"` by default (triggers numeric keyboard on mobile) or `"text"` when `alphanumeric` is enabled.
- **`autocomplete="one-time-code"`** — applied to the first cell, enabling browsers and mobile devices to suggest incoming OTP codes from SMS.
- **Keyboard navigation** — Arrow Left/Right to move between cells, Backspace to delete and move back. These follow common OTP input patterns.
- **Focus management** — clicking or tabbing into a cell selects its content, making it easy to replace.
- **Disabled state** — all cells receive the `disabled` attribute, preventing interaction and applying a muted visual style.
- **Pass-through `aria-*` attributes** — any `aria-*` attribute placed on the host element is forwarded to the group wrapper.

### Developer Responsibilities

1. **Provide a visible label.** Use `aegov-form-field` with `aegov-label` or a standalone `<label>` element pointing to the `fieldId` to describe the purpose of the OTP input.

   ```html
   <aegov-form-field>
     <aegov-label>SMS Verification Code</aegov-label>
     <aegov-otp length="6"></aegov-otp>
   </aegov-form-field>
   ```

2. **Communicate errors.** When validation fails (via the `aegovOtpInvalid` event), display a visible error message so users know what went wrong.

3. **Do not remove focus styles.** The built-in focus indicators (background highlight for continuous, ring for individual) are essential for keyboard navigation.

---

## Notes

- The `aegov-otp` component renders native `<input>` elements internally — one per cell plus a hidden input for form submission.
- Paste handling always fills from the **first cell** regardless of which cell is focused. This matches the most common OTP paste behaviour.
- When `alphanumeric` is `false` (the default), the `inputMode` is set to `numeric`, which triggers a numeric keyboard on mobile devices.
- The hidden `<input>` element's `name` and `value` are kept in sync, so the OTP value is automatically included in standard form submissions.
- The `fieldId` property is auto-generated if not provided. It is used by `aegov-form-field` to link the label to the first input cell via the `for` attribute.
- The `value` property is mutable and can be set from outside to pre-fill the cells. Changes to this property from outside the component will redistribute characters across all cells.
- The `clear()` method resets all cells, sets the value to an empty string, emits an `aegovOtpChange` event with an empty value, and focuses the first cell.
- When typing a character into a cell that already contains a value, the existing content is selected first so the new character replaces it rather than appending.
- Multi-character input (e.g. from browser autofill) is handled by distributing characters across cells starting from the current cell.
