# Input

<p class="text-lg text-aeblack-500 mb-8">An Input collects a single line of text from the user. It is the most-used control in any government service, so it carries the most surface: twelve native types, five sizes, leading and trailing icons, a password reveal toggle, a copy-to-clipboard action, and the full validation contract shared by every form component.</p>

## Introduction

`aegov-input` renders a real `<input>` in the light DOM and manages the label association, hint and error regions, and ARIA wiring around it. Pair it with [`aegov-form-field`](aegov-form-field.html) and [`aegov-label`](aegov-label.html) for a complete, correctly-linked field.

```html
<aegov-form-field>
  <aegov-label>Full name</aegov-label>
  <aegov-input name="fullName" placeholder="As printed on your Emirates ID"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-form-field>
      <aegov-label>Full name</aegov-label>
      <aegov-input field-id="in-intro" name="fullName" placeholder="As printed on your Emirates ID"></aegov-input>
    </aegov-form-field>
  </div>
</div>

The wrapper links the label's `for` to the input's generated `field-id`, so clicking the label focuses the field without you writing an ID by hand.

---

## Input types

`type` maps to the native input type, which is what gives you the right mobile keyboard, the right browser validation, and the right autofill behaviour.

| Type | Use for |
| --- | --- |
| `text` | Default. Names, reference numbers, free text. |
| `email` | Email addresses. Browser validates the shape and offers an email keyboard. |
| `password` | Secrets. Pair with `is-revealable`. |
| `tel` | Phone numbers. Numeric keypad, no browser format validation. |
| `url` | Web addresses. |
| `number` | Numeric values where stepping makes sense. |
| `search` | Search queries. |
| `date`, `time`, `datetime-local`, `month`, `week` | Native date and time pickers. |

```html
<aegov-input type="text" placeholder="Text"></aegov-input>
<aegov-input type="email" placeholder="name@example.ae"></aegov-input>
<aegov-input type="password" placeholder="Password" is-revealable></aegov-input>
<aegov-input type="tel" placeholder="+971 50 123 4567"></aegov-input>
<aegov-input type="number" placeholder="0"></aegov-input>
<aegov-input type="date"></aegov-input>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-4">
    <aegov-input field-id="in-t-text" type="text" placeholder="Text"></aegov-input>
    <aegov-input field-id="in-t-email" type="email" placeholder="name@example.ae"></aegov-input>
    <aegov-input field-id="in-t-pass" type="password" placeholder="Password" is-revealable></aegov-input>
    <aegov-input field-id="in-t-tel" type="tel" placeholder="+971 50 123 4567"></aegov-input>
    <aegov-input field-id="in-t-num" type="number" placeholder="0"></aegov-input>
    <aegov-input field-id="in-t-date" type="date"></aegov-input>
  </div>
</div>

For a styled, fully-controlled calendar with ranges and presets, use [`aegov-datepicker`](aegov-datepicker.html) rather than `type="date"` — the native control cannot be themed and varies between browsers.

An unrecognised `type` falls back to `text` with a console warning in development.

---

## Sizes

`size` controls height, padding and font size. Five tokens are available, and they match the [Button](aegov-button.html) scale so controls line up when placed side by side.

| Token | Height |
| --- | --- |
| `xs` | 36px |
| `sm` | 40px |
| `base` | 44px |
| `lg` | 48px |
| `xl` | 52px |

```html
<aegov-input size="xs" placeholder="Extra small"></aegov-input>
<aegov-input size="sm" placeholder="Small"></aegov-input>
<aegov-input size="base" placeholder="Base"></aegov-input>
<aegov-input size="lg" placeholder="Large"></aegov-input>
<aegov-input size="xl" placeholder="Extra large"></aegov-input>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-4">
    <aegov-input field-id="in-s-xs" size="xs" placeholder="Extra small"></aegov-input>
    <aegov-input field-id="in-s-sm" size="sm" placeholder="Small"></aegov-input>
    <aegov-input field-id="in-s-base" size="base" placeholder="Base"></aegov-input>
    <aegov-input field-id="in-s-lg" size="lg" placeholder="Large"></aegov-input>
    <aegov-input field-id="in-s-xl" size="xl" placeholder="Extra large"></aegov-input>
  </div>
</div>

### Responsive sizes

`size` accepts a Tailwind-style responsive string. Prefixes are `xs`, `sm`, `md`, `lg`, `xl` and `2xl`, and the first token is the base value.

```html
<aegov-input size="base md:lg" placeholder="Grows on larger screens"></aegov-input>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-input field-id="in-s-resp" size="base md:lg" placeholder="Grows on larger screens"></aegov-input>
  </div>
</div>

Note the collision of vocabulary here: `xs` is both a size token and a breakpoint prefix. `size="xs md:base"` means "extra-small by default, base from 768px up".

---

## Variant

`variant` selects the colour family used for the idle ring, the value text and the accent on hover. Two things deliberately do not follow it: the **focus ring is always camel**, and the **error state is always aered** — so focus and failure remain instantly recognisable regardless of the field's colour.

```html
<aegov-input variant="primary" placeholder="Primary"></aegov-input>
<aegov-input variant="secondary" placeholder="Secondary"></aegov-input>
<aegov-input variant="neutral-max" placeholder="Neutral max"></aegov-input>
<aegov-input variant="neutral-min" placeholder="Neutral min"></aegov-input>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-4">
    <aegov-input field-id="in-v-p" variant="primary" placeholder="Primary" value="Primary"></aegov-input>
    <aegov-input field-id="in-v-s" variant="secondary" placeholder="Secondary" value="Secondary"></aegov-input>
    <aegov-input field-id="in-v-nx" variant="neutral-max" placeholder="Neutral max" value="Neutral max"></aegov-input>
    <aegov-input field-id="in-v-nm" variant="neutral-min" placeholder="Neutral min" value="Neutral min"></aegov-input>
  </div>
</div>

`variant` cascades from [`aegov-form-field`](aegov-form-field.html) and [`aegov-input-group`](#input-group), so you can set it once on the wrapper.

---

## States

### Disabled

```html
<aegov-input is-disabled value="Locked value"></aegov-input>
```

### Read-only

The value stays selectable and copyable but cannot be edited. Read-only fields **are** submitted with the form; disabled fields are not.

```html
<aegov-input is-readonly value="784-1990-1234567-1"></aegov-input>
```

### Required

`is-required` sets the native `required` attribute, so `valueMissing` is reported by the browser and `form.checkValidity()` accounts for it.

```html
<aegov-input is-required placeholder="Required field"></aegov-input>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-4">
    <aegov-input field-id="in-st-d" is-disabled value="Locked value"></aegov-input>
    <aegov-input field-id="in-st-r" is-readonly value="784-1990-1234567-1"></aegov-input>
    <aegov-input field-id="in-st-req" is-required placeholder="Required field"></aegov-input>
  </div>
</div>

Note that `is-required` does not add a visual asterisk. Mark required fields in the label text — see [Label](aegov-label.html).

### Invalid

`is-invalid` plus `error-message` is the full invalid state: red styling, `aria-invalid` on the input, and the message rendered in an associated error region.

```html
<aegov-input
  type="email"
  value="not-an-email"
  is-invalid
  error-message="Enter a valid email address"
></aegov-input>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-input field-id="in-st-inv" type="email" value="not-an-email" is-invalid error-message="Enter a valid email address"></aegov-input>
  </div>
</div>

See [Validation](#validation) below and [Validation Surface](validation-overview.html) for the whole contract.

---

## Hint text

`hint` renders helper text below the field and links it to the input through `aria-describedby`. The hint is replaced by the error while the field is invalid, so the two never compete — you do not need to clear it yourself.

```html
<aegov-input name="emiratesId" hint="15 digits, as printed on your card"></aegov-input>

<aegov-input name="username">
  <span slot="hint">Letters, numbers and underscores. <strong>No spaces.</strong></span>
</aegov-input>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-6">
    <aegov-input field-id="in-h-1" name="emiratesId" hint="15 digits, as printed on your card"></aegov-input>
    <aegov-input field-id="in-h-2" name="username">
      <span slot="hint">Letters, numbers and underscores. <strong>No spaces.</strong></span>
    </aegov-input>
  </div>
</div>

Use the `hint` slot when the text needs markup or a link; the `hint` property when it is plain text. The slot wins if both are present.

---

## Icons

Slot an inline `<svg>` into `icon-start` or `icon-end`. The component detects the slot, adds the padding needed to clear the glyph, and positions it — you do not need absolute positioning of your own.

```html
<aegov-input type="search" placeholder="Search services">
  <svg slot="icon-start" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
</aegov-input>

<aegov-input type="text" placeholder="Amount in AED">
  <span slot="icon-end" class="text-sm text-aeblack-400">AED</span>
</aegov-input>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-4">
    <aegov-input field-id="in-i-1" type="search" placeholder="Search services">
      <svg slot="icon-start" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
    </aegov-input>
    <aegov-input field-id="in-i-2" type="text" placeholder="Amount">
      <span slot="icon-end" class="text-sm text-aeblack-400">AED</span>
    </aegov-input>
    <aegov-input field-id="in-i-3" type="email" placeholder="name@example.ae">
      <svg slot="icon-start" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" /></svg>
    </aegov-input>
  </div>
</div>

Mark icons `aria-hidden="true"`. They are decoration — the label carries the meaning.

**The trailing slot yields to action buttons.** If `is-revealable` or `is-copyable` is active, the `icon-end` content is hidden, because the reveal and copy buttons occupy that position. Do not rely on both being visible at once.

---

## Password reveal

`is-revealable` adds a toggle button that switches the input between `password` and `text`. It only applies when `type="password"`.

```html
<aegov-input type="password" is-revealable placeholder="Enter your password"></aegov-input>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-input field-id="in-rev" type="password" is-revealable value="my-secret-password"></aegov-input>
  </div>
</div>

The button is a real `<button type="button">`, its icon is `aria-hidden`, and its `aria-label` alternates between "Show password" and "Hide password" — automatically translated to Arabic when the field sits inside a `dir="rtl"` container. It is disabled alongside the input.

---

## Copy to clipboard

`is-copyable` adds a copy button. It only applies when the field is also `is-readonly` — the pattern is for surfacing a generated value such as a reference number, not for copying user input mid-edit.

```html
<aegov-input
  is-readonly
  is-copyable
  value="APP-2026-0041827"
  hint="Quote this reference when contacting us"
></aegov-input>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-input field-id="in-copy" is-readonly is-copyable value="APP-2026-0041827" hint="Quote this reference when contacting us"></aegov-input>
  </div>
</div>

On click the value is written to the clipboard, the icon becomes a checkmark for two seconds, and a visually hidden `role="status"` live region announces "Copied" — so the confirmation reaches screen reader users, not just sighted ones. Both the label and the announcement are translated in RTL contexts. Where the async Clipboard API is unavailable the component falls back to selecting the text and using `document.execCommand('copy')`.

---

## Input group

`aegov-input-group` joins an input with text add-ons or buttons into one control. It propagates its resolved `size` to child `aegov-input` and `aegov-button` elements, and cascades `variant` to inputs that have not set their own.

```html
<aegov-input-group addon-prefix="https://" group-label="Website address">
  <aegov-input placeholder="example.ae"></aegov-input>
</aegov-input-group>

<aegov-input-group addon-suffix="AED" group-label="Declared amount">
  <aegov-input type="number" placeholder="0.00"></aegov-input>
</aegov-input-group>

<aegov-input-group addon-prefix="+971" group-label="Mobile number">
  <aegov-input type="tel" placeholder="50 123 4567"></aegov-input>
</aegov-input-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-4">
    <aegov-input-group addon-prefix="https://" group-label="Website address">
      <aegov-input field-id="in-g-1" placeholder="example.ae"></aegov-input>
    </aegov-input-group>
    <aegov-input-group addon-suffix="AED" group-label="Declared amount">
      <aegov-input field-id="in-g-2" type="number" placeholder="0.00"></aegov-input>
    </aegov-input-group>
    <aegov-input-group addon-prefix="+971" group-label="Mobile number">
      <aegov-input field-id="in-g-3" type="tel" placeholder="50 123 4567"></aegov-input>
    </aegov-input-group>
  </div>
</div>

Add-on text is not decoration — it changes the meaning of what the user types. The group gives each add-on an ID and adds it to the input's `aria-describedby` chain, so a screen reader announces "Mobile number, +971" rather than leaving the country code invisible.

### With a button

```html
<aegov-input-group group-label="Search services">
  <aegov-input type="search" placeholder="Search services"></aegov-input>
  <aegov-button variant="primary">Search</aegov-button>
</aegov-input-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-lg">
    <aegov-input-group group-label="Search services">
      <aegov-input field-id="in-g-btn" type="search" placeholder="Search services"></aegov-input>
      <aegov-button variant="primary">Search</aegov-button>
    </aegov-input-group>
  </div>
</div>

Set `size` on the group, not on the children — it cascades, and matching heights are the entire point of the component.

Always give the group a `group-label`. It renders `role="group"`, and an unnamed group tells the user there is a boundary without saying what it contains.

---

## Composite example — service application form

```html
<form id="residency-application" novalidate>
  <aegov-form-field>
    <aegov-label>Full name</aegov-label>
    <aegov-input name="fullName" is-required hint="As printed on your Emirates ID"></aegov-input>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>Emirates ID</aegov-label>
    <aegov-input name="emiratesId" is-required inputmode="numeric" maxlength="18" hint="15 digits"></aegov-input>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>Email address</aegov-label>
    <aegov-input name="email" type="email" is-required autocomplete="email"></aegov-input>
  </aegov-form-field>

  <aegov-input-group addon-prefix="+971" group-label="Mobile number">
    <aegov-input name="mobile" type="tel" is-required placeholder="50 123 4567"></aegov-input>
  </aegov-input-group>

  <aegov-button type="submit" variant="primary" size="lg">Submit application</aegov-button>
</form>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <aegov-form-field>
      <aegov-label>Full name</aegov-label>
      <aegov-input field-id="in-cx-1" name="fullName" is-required hint="As printed on your Emirates ID"></aegov-input>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>Emirates ID</aegov-label>
      <aegov-input field-id="in-cx-2" name="emiratesId" is-required inputmode="numeric" maxlength="18" hint="15 digits"></aegov-input>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>Email address</aegov-label>
      <aegov-input field-id="in-cx-3" name="email" type="email" is-required autocomplete="email"></aegov-input>
    </aegov-form-field>
    <div>
      <aegov-input-group addon-prefix="+971" group-label="Mobile number">
        <aegov-input field-id="in-cx-4" name="mobile" type="tel" is-required placeholder="50 123 4567"></aegov-input>
      </aegov-input-group>
    </div>
    <aegov-button type="submit" variant="primary" size="lg">Submit application</aegov-button>
  </div>
</div>

Note `inputmode`, `maxlength` and `autocomplete` — these are native attributes passed straight through to the inner input, and they do more for usability than any amount of custom JavaScript.

---

## Listening for value events

There are two value events, and picking the right one matters:

| Event | Fires |
| --- | --- |
| `aegovInputValue` | On every keystroke. Use for live affordances — character counts, search-as-you-type, strength meters. |
| `aegovInputChange` | When the value is committed — the native `change` event. Use for state you do not want updated mid-word. |

```html
<aegov-input id="search" type="search" placeholder="Search services"></aegov-input>

<script type="module">
  const input = document.querySelector('#search');

  // Live: every keystroke
  input.addEventListener('aegovInputValue', (e) => {
    renderSuggestions(e.detail.value);
  });

  // Committed
  input.addEventListener('aegovInputChange', (e) => {
    runSearch(e.detail.value);
  });
</script>
```

If you are migrating from an earlier version, note the keystroke event is `aegovInputValue`, not `aegovInputInput`.

---

## RTL Support

The input is fully direction-aware. In a `dir="rtl"` container the text aligns to the right, the `icon-start` slot renders on the right and `icon-end` on the left, and the reveal and copy buttons move to the inline-end edge. Input group add-ons swap sides too, so a `+971` prefix stays logically before the number.

The built-in control labels are translated automatically: "Show password" / "Hide password" become "إظهار كلمة المرور" / "إخفاء كلمة المرور", and the copy button and its live-region announcement become "نسخ إلى الحافظة" / "تم النسخ".

```html
<div dir="rtl">
  <aegov-form-field>
    <aegov-label>الاسم الكامل</aegov-label>
    <aegov-input name="fullName" is-required hint="كما هو مكتوب في الهوية الإماراتية"></aegov-input>
  </aegov-form-field>

  <aegov-input type="password" is-revealable placeholder="كلمة المرور"></aegov-input>

  <aegov-input-group addon-prefix="+971" group-label="رقم الهاتف المتحرك">
    <aegov-input type="tel" placeholder="50 123 4567"></aegov-input>
  </aegov-input-group>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <aegov-form-field>
      <aegov-label>الاسم الكامل</aegov-label>
      <aegov-input field-id="in-rtl-1" name="fullName" is-required hint="كما هو مكتوب في الهوية الإماراتية"></aegov-input>
    </aegov-form-field>
    <aegov-input field-id="in-rtl-2" type="password" is-revealable value="كلمة-المرور"></aegov-input>
    <aegov-input field-id="in-rtl-3" type="search" placeholder="ابحث عن الخدمات">
      <svg slot="icon-start" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
    </aegov-input>
    <div>
      <aegov-input-group addon-prefix="+971" group-label="رقم الهاتف المتحرك">
        <aegov-input field-id="in-rtl-4" type="tel" placeholder="50 123 4567"></aegov-input>
      </aegov-input-group>
    </div>
    <aegov-input field-id="in-rtl-5" is-readonly is-copyable value="APP-2026-0041827"></aegov-input>
  </div>
</div>

One thing to handle yourself: values that are inherently left-to-right inside Arabic copy — phone numbers, IBANs, reference codes, email addresses. Set `dir="ltr"` on that individual input so the digits do not reorder:

```html
<aegov-input dir="ltr" type="tel" name="mobile" placeholder="+971 50 123 4567"></aegov-input>
```

---

## API Reference

### aegov-input Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the inner `<input>`. Auto-generated when omitted, reflected to the host. | `string` | _generated_ |
| `type` | `type` | Native input type. | `'text' \| 'email' \| 'password' \| 'tel' \| 'url' \| 'number' \| 'search' \| 'date' \| 'time' \| 'datetime-local' \| 'month' \| 'week'` | `'text'` |
| `size` | `size` | Size token or responsive string. | `string` — `xs \| sm \| base \| lg \| xl` | `'base'` |
| `variant` | `variant` | Colour family for the idle ring, value text and accent. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `value` | `value` | Current value. Mutable — updated as the user types. | `string` | `''` |
| `name` | `name` | Form field name, used by `FormData`. | `string` | — |
| `placeholder` | `placeholder` | Placeholder text. Not a substitute for a label. | `string` | — |
| `isDisabled` | `is-disabled` | Disables the input. Not submitted with the form. | `boolean` | `false` |
| `isReadonly` | `is-readonly` | Value cannot be edited but is still submitted. | `boolean` | `false` |
| `isRequired` | `is-required` | Sets the native `required` attribute. | `boolean` | `false` |
| `isRevealable` | `is-revealable` | Adds a show/hide toggle. Only applies to `type="password"`. | `boolean` | `false` |
| `isCopyable` | `is-copyable` | Adds a copy-to-clipboard button. Only applies when `is-readonly`. | `boolean` | `false` |
| `isInvalid` | `is-invalid` | Invalid state — see [Validation](#validation). Reflected to the host. | `boolean` | `false` |
| `errorMessage` | `error-message` | Error text shown while invalid. | `string` | `''` |
| `hint` | `hint` | Helper text shown when no error is showing. | `string` | `''` |
| `extraClass` | `extra-class` | Extra classes appended to the inner `<input>`. | `string` | — |

### aegov-input-group Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `size` | `size` | Size token or responsive string. Propagated to child `aegov-input` and `aegov-button`. | `string` | `'base'` |
| `addonPrefix` | `addon-prefix` | Leading add-on text. Added to the input's `aria-describedby`. | `string` | — |
| `addonSuffix` | `addon-suffix` | Trailing add-on text. Added to the input's `aria-describedby`. | `string` | — |
| `groupLabel` | `group-label` | Accessible name for the `role="group"` wrapper. | `string` | — |
| `variant` | `variant` | Colour family. Cascades to child inputs that have not set their own. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `extraClass` | `extra-class` | Extra classes on the group wrapper. | `string` | — |

`prefix` and `suffix` are reserved DOM property names, which is why these are `addonPrefix` / `addonSuffix`.

### Slots

| Slot | Description |
| --- | --- |
| `icon-start` | Leading icon or short text. Rendered at the inline-start edge. |
| `icon-end` | Trailing icon or short text. **Hidden when `is-revealable` or `is-copyable` is active.** |
| `hint` | Rich hint markup. Takes precedence over the `hint` property. |
| `error` | Rich error markup. Takes precedence over `error-message`. Rendered only while `is-invalid`. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovInputValue` | `{ value: string; event: Event }` | Every keystroke. |
| `aegovInputChange` | `{ value: string; event: Event }` | Value committed (native `change`). |
| `aegovInputFocus` | `FocusEvent` | Input gained focus. |
| `aegovInputBlur` | `FocusEvent` | Input lost focus. |
| `aegovValidate` | `AegovValidationDetail<string>` | Unified validation event — see [Validation Surface](validation-overview.html). |

### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `validate(trigger?)` | `Promise<AegovValidationResult>` | Re-reads native validity, emits `aegovValidate`, returns the result. `trigger` defaults to `'manual'`. |
| `setCustomValidity(message)` | `Promise<void>` | Sets `error-message` and `is-invalid`, and mirrors onto the native input so `form.checkValidity()` agrees. Empty string clears. |

### Pass-through Attributes

Attributes on the host are forwarded to the inner `<input>`, which is how native behaviour that has no property equivalent still reaches the control.

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `pattern`, `min`, `max`, `minlength`, `maxlength`, `step` | Yes | Native constraints. They feed the `validity` flags in `aegovValidate`. |
| `autocomplete`, `inputmode`, `enterkeyhint`, `spellcheck`, `autofocus` | Yes | Native input behaviour and mobile keyboard hints. |
| `list`, `multiple`, `accept`, `capture` | Yes | Native datalist and file-adjacent attributes. |
| `title`, `tabindex`, `form` | Yes | Forwarded to the inner `<input>`. |
| `aria-*` | Yes | Forwarded — **except** `aria-invalid` and `aria-describedby`. |
| `data-*` | Yes | Forwarded to the inner `<input>`. |
| `aria-invalid` | **No** | Owned by the component and driven by `is-invalid`. A host-level value is stripped. |
| `aria-describedby` | Composed | Not overwritten: your value is **preserved** and the hint, error and add-on IDs are appended to it. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host. Use `extra-class` to reach the inner `<input>`. |
| `dir` | Yes | Useful for forcing LTR on phone numbers and reference codes inside Arabic pages. |

### CSS classes

| Class | Element |
| --- | --- |
| `.aegov-input` | The inner `<input>`. |
| `.input--xs` … `.input--xl` | Size modifier on the input. |
| `.input-variant-*` | Variant modifier on the input. |
| `.input--has-action` | Added when a reveal or copy button is present. |
| `.input--has-icon-start`, `.input--has-icon-end` | Added when the matching slot has content. |
| `.input__wrapper` | Positioning wrapper, rendered only when icons or action buttons exist. |
| `.aegov-input__error`, `.aegov-input__hint` | The error and hint regions. |
| `.is-invalid` | Added to the **host** while `is-invalid`. |

---

## Validation

### Surface

`aegov-input` implements the shared contract: `is-invalid`, `error-message` and `hint` properties, `error` and `hint` slots, the `aegovValidate` event, and `validate()` / `setCustomValidity()` methods. Because it wraps a native `<input>`, the `validity` flags in the event are the browser's real `ValidityState` — not a synthesized approximation. Full reference: [Validation Surface](validation-overview.html).

The value type is `string`, and the `FormData` payload is that same string.

### Common recipes

Let the browser decide and supply your own copy:

```js
const input = document.querySelector('#email');

input.addEventListener('aegovValidate', (e) => {
  if (e.detail.trigger === 'input') return;   // don't judge mid-typing

  const v = e.detail.validity;
  input.isInvalid = !v.valid;
  input.errorMessage =
    v.valueMissing ? 'Enter your email address' :
    v.typeMismatch ? 'Enter a valid email address' : '';
});
```

A format rule the browser cannot express:

```js
const eid = document.querySelector('#emirates-id');

eid.addEventListener('aegovValidate', (e) => {
  if (e.detail.trigger === 'input') return;
  const digits = String(e.detail.value).replace(/\D/g, '');
  const ok = digits.length === 15;
  eid.isInvalid = !ok;
  eid.errorMessage = ok ? '' : 'Emirates ID must be 15 digits';
});
```

A server-side check, using `setCustomValidity` so native form validity stays honest:

```js
const res = await api.checkEmiratesId(eid.value);
await eid.setCustomValidity(res.ok ? '' : res.reason);
```

More patterns — cross-field rules, async debouncing, error summaries — in [Bring Your Own Validator](validation-byo.html).

### Use with `@aegov/designsystem-validation`

The optional companion package drives exactly this surface from a schema. It is **not required**, and nothing here depends on it.

```ts
import { createForm } from '@aegov/designsystem-validation';
import { valibotAdapter } from '@aegov/designsystem-validation/adapters/valibot';
import * as v from 'valibot';

createForm(form, v.object({
  email: v.pipe(v.string(), v.email('Enter a valid email address')),
}), valibotAdapter(), { mode: 'onBlur' });
```

Each input needs a `name` for the orchestrator to match it to a schema path.

---

## Accessibility

### Built-in behaviour

- The inner element is a real `<input>`, so type-specific keyboards, autofill, native constraint validation and form participation all come from the platform.
- `aria-invalid="true"` is set on the input while `is-invalid`, and removed when it is not.
- **`aria-describedby` is composed, never clobbered.** Your own value is preserved, and the hint region, error region and input-group add-on IDs are appended to it.
- The error region takes `role="alert"` only **after the field's first blur**, so a partial error is not announced on every keystroke while the user is still typing.
- The reveal and copy buttons are real `<button type="button">` elements with `aria-hidden` icons and descriptive `aria-label`s that are translated in RTL contexts.
- Copy success is announced through a visually hidden `role="status" aria-live="polite"` region, so the confirmation is not purely visual.
- Every size token is at least 36 CSS px tall, above the WCAG 2.2 SC 2.5.8 minimum target size of 24 × 24, and the reveal and copy buttons meet it too.
- The focus ring is a high-contrast camel outline held constant across all variants so it always meets the 3:1 non-text contrast requirement of WCAG 2.2 SC 1.4.11.
- `aegov-input-group` renders `role="group"` and names it from `group-label`.

### Developer responsibilities

- **Always provide a visible label.** Use [`aegov-label`](aegov-label.html) inside [`aegov-form-field`](aegov-form-field.html), which links them for you. A placeholder is not a label — it disappears on first keystroke and typically fails contrast.
- **Mark required fields in the label text.** `is-required` sets the native attribute but renders no visual marker.
- **Choose the right `type`.** It determines the mobile keyboard and the browser's own validation; `type="text"` for an email address is a usability defect.
- **Add `autocomplete`.** For names, addresses, phone numbers and one-time codes this is a genuine accessibility win, and it is required for WCAG 2.2 SC 1.3.5 on identify-input-purpose.
- **Never signal an error with colour alone** (WCAG 2.2 SC 1.4.1) — always populate `error-message` or the `error` slot.
- **Mark slotted icons `aria-hidden="true"`.**
- **Set `dir="ltr"` on inputs holding LTR data** — phone numbers, IBANs, reference codes — inside Arabic pages.
- **Do not put both a trailing icon and a reveal or copy button** on one field; the icon will be hidden.
- **Keep hint text short and permanent.** If the guidance is only relevant while a field is empty, it probably belongs in the label.

### Keyboard support

| Key | Action |
| --- | --- |
| `Tab` | Move focus to the input, then to the reveal or copy button when present. |
| `Shift` + `Tab` | Move focus backwards. |
| `Enter` | Submit the surrounding form, if any. |
| `Enter`, `Space` | Activate the reveal or copy button when it has focus. |

Type-specific keys — arrow keys on `type="number"`, the native picker on `type="date"` — are handled by the browser.

---

## Where to next

- [Form Field](aegov-form-field.html) and [Label](aegov-label.html) — the wrapper and label that complete a field.
- [Textarea](aegov-textarea.html) — multi-line text, with a character counter.
- [Select](aegov-select.html) — choosing from a list.
- [Datepicker](aegov-datepicker.html) — a themed calendar instead of `type="date"`.
- [Validation Surface](validation-overview.html) and [Bring Your Own Validator](validation-byo.html).
