# Input

<p class="text-lg text-aeblack-500 mb-8">An Input is the primary single-line control for collecting short text values across UAE Government service forms — names, email addresses, Emirates ID numbers, reference codes, passwords, and more. The component wraps a native HTML input so every browser feature, autofill behaviour, and assistive-technology hook keeps working, while the design system layers consistent sizing, four colour variants (`primary`, `secondary`, `neutral-max`, `neutral-min`), icons, password reveal, and copy-to-clipboard helpers on top.</p>

## Introduction

The `aegov-input` component renders a real `<input>` element styled to the design system. Use it directly when you only need the field, or pair it with `aegov-form-field` and `aegov-label` to wire up label, helper text, and error messaging. Sub-component `aegov-input-group` adds prefix and suffix add-ons (currency symbols, domains, search buttons) and propagates its `size` to nested inputs and buttons.

```html
<aegov-form-field>
  <aegov-label>Full name (as per Emirates ID)</aegov-label>
  <aegov-input name="full-name" placeholder="e.g. Mohammed Ali Al Mansoori" is-required="true"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label>Full name (as per Emirates ID)</aegov-label>
    <aegov-input name="full-name" placeholder="e.g. Mohammed Ali Al Mansoori" is-required="true"></aegov-input>
  </aegov-form-field>
</div>

---

## Input Types

The `type` property maps directly to the native HTML input type. Use `text` for general fields, `email` for addresses (triggers email keyboards on mobile), `tel` for phone numbers, `number` for fees and amounts, `password` for credentials, `search` for filter bars, and `url`/`date`/`time` for the obvious cases.

```html
<aegov-input type="text" placeholder="Full name"></aegov-input>
<aegov-input type="email" placeholder="you@example.gov.ae"></aegov-input>
<aegov-input type="tel" placeholder="+971 50 000 0000"></aegov-input>
<aegov-input type="number" placeholder="0"></aegov-input>
<aegov-input type="search" placeholder="Search services"></aegov-input>
<aegov-input type="url" placeholder="https://"></aegov-input>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-4 max-w-md">
    <aegov-input type="text" placeholder="Full name"></aegov-input>
    <aegov-input type="email" placeholder="you@example.gov.ae"></aegov-input>
    <aegov-input type="tel" placeholder="+971 50 000 0000"></aegov-input>
    <aegov-input type="number" placeholder="0"></aegov-input>
    <aegov-input type="search" placeholder="Search services"></aegov-input>
    <aegov-input type="url" placeholder="https://"></aegov-input>
  </div>
</div>

---

## Sizes

The `size` property scales the field height, padding, and font size. Five tokens are available: `xs`, `sm`, `base` (default), `lg`, and `xl`. Match the input size to surrounding controls — most government forms use `base`; dense administrative tables use `sm`; landing-page hero forms use `lg`.

```html
<aegov-input size="xs" placeholder="Extra small"></aegov-input>
<aegov-input size="sm" placeholder="Small"></aegov-input>
<aegov-input size="base" placeholder="Base (default)"></aegov-input>
<aegov-input size="lg" placeholder="Large"></aegov-input>
<aegov-input size="xl" placeholder="Extra large"></aegov-input>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-4 max-w-md">
    <aegov-input size="xs" placeholder="Extra small"></aegov-input>
    <aegov-input size="sm" placeholder="Small"></aegov-input>
    <aegov-input size="base" placeholder="Base (default)"></aegov-input>
    <aegov-input size="lg" placeholder="Large"></aegov-input>
    <aegov-input size="xl" placeholder="Extra large"></aegov-input>
  </div>
</div>

### Responsive sizes

`size` also accepts a Tailwind-style responsive string with the breakpoint prefixes `xs`, `sm`, `md`, `lg`, `xl`, and `2xl`. The example below renders `sm` on phones, `base` from the `md` breakpoint up, and `lg` from `xl` up.

```html
<aegov-input size="sm md:base xl:lg" placeholder="Resizes with the viewport"></aegov-input>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-input size="sm md:base xl:lg" placeholder="Resizes with the viewport"></aegov-input>
</div>

---

## Variant

The `variant` property selects the colour family for the idle ring/border, the value text, and the focus accent. The focus ring stays `primary-support-600` (camel) and the error border stays `aered-600` regardless of variant — both are accessibility constants.

- `primary` — primary-* family (default)
- `secondary` — secondary-* family
- `neutral-max` — strong neutral (aeblack-800 family)
- `neutral-min` — quiet neutral (aeblack-100 family)

### Colour matrix

| Variant       | Idle ring        | Value text      | Hover accent    | Subtle bg       |
| ------------- | ---------------- | --------------- | --------------- | --------------- |
| `primary`     | `primary-400`    | `primary-900`   | `primary-700`   | `primary-50`    |
| `secondary`   | `secondary-400`  | `secondary-900` | `secondary-700` | `secondary-50`  |
| `neutral-max` | `aeblack-400`    | `aeblack-900`   | `aeblack-800`   | `aeblack-50`    |
| `neutral-min` | `aeblack-200`    | `aeblack-900`   | `aeblack-700`   | `aeblack-50`    |

```html
<aegov-input variant="primary" placeholder="Primary"></aegov-input>
<aegov-input variant="secondary" placeholder="Secondary"></aegov-input>
<aegov-input variant="neutral-max" placeholder="Neutral-max"></aegov-input>
<aegov-input variant="neutral-min" placeholder="Neutral-min"></aegov-input>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <aegov-input variant="primary" placeholder="Primary"></aegov-input>
    <aegov-input variant="secondary" placeholder="Secondary"></aegov-input>
    <aegov-input variant="neutral-max" placeholder="Neutral-max"></aegov-input>
    <aegov-input variant="neutral-min" placeholder="Neutral-min"></aegov-input>
  </div>
</div>

---

## States

### Disabled

Set `is-disabled="true"` to prevent any interaction. Disabled fields keep their value but are removed from the tab order.

```html
<aegov-input is-disabled="true" value="784-1990-1234567-1"></aegov-input>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-input is-disabled="true" value="784-1990-1234567-1"></aegov-input>
</div>

### Read-only

Set `is-readonly="true"` to display a value the user cannot change but can still copy or focus. Use this for system-generated reference numbers or pre-filled details from a verified profile.

```html
<aegov-input is-readonly="true" value="APP-2026-008421"></aegov-input>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-input is-readonly="true" value="APP-2026-008421"></aegov-input>
</div>

### Required

Set `is-required="true"` to mark the field as mandatory. The native `required` attribute is added to the input, which exposes the requirement to assistive technology and triggers the browser's built-in validation on submit.

```html
<aegov-form-field>
  <aegov-label is-required="true">Emirates ID number</aegov-label>
  <aegov-input is-required="true" placeholder="784-YYYY-NNNNNNN-N"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label is-required="true">Emirates ID number</aegov-label>
    <aegov-input is-required="true" placeholder="784-YYYY-NNNNNNN-N"></aegov-input>
  </aegov-form-field>
</div>

### Invalid (error state)

Validation styling is owned by the surrounding `aegov-form-field`. Set `is-invalid="true"` on the form field and provide an error message via the `error` slot (or property). The input itself picks up the error border automatically.

```html
<aegov-form-field is-invalid="true">
  <aegov-label is-required="true">Email address</aegov-label>
  <aegov-input type="email" value="not-an-email"></aegov-input>
  <span slot="error">Enter a valid email in the format name@example.gov.ae.</span>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field is-invalid="true">
    <aegov-label is-required="true">Email address</aegov-label>
    <aegov-input type="email" value="not-an-email"></aegov-input>
    <span slot="error">Enter a valid email in the format name@example.gov.ae.</span>
  </aegov-form-field>
</div>

---

## Icons

Use the `icon-start` slot for a leading icon (search, mail, lock) and `icon-end` for a trailing icon (status, hint). Slot icons sit on the start/end edges and flip automatically in RTL.

```html
<aegov-input placeholder="Search services">
  <svg slot="icon-start" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="M21 21l-4.35-4.35"></path>
  </svg>
</aegov-input>

<aegov-input type="email" placeholder="you@example.gov.ae">
  <svg slot="icon-start" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2"></rect>
    <path d="m3 7 9 6 9-6"></path>
  </svg>
</aegov-input>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-4 max-w-md">
    <aegov-input placeholder="Search services">
      <svg slot="icon-start" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="M21 21l-4.35-4.35"></path>
      </svg>
    </aegov-input>
    <aegov-input type="email" placeholder="you@example.gov.ae">
      <svg slot="icon-start" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2"></rect>
        <path d="m3 7 9 6 9-6"></path>
      </svg>
    </aegov-input>
  </div>
</div>

---

## Password Reveal

Set `is-revealable="true"` together with `type="password"` to add an eye icon that toggles between hidden and visible characters. Use this on sign-in screens and password-creation flows where users frequently mistype.

```html
<aegov-form-field>
  <aegov-label is-required="true">Password</aegov-label>
  <aegov-input type="password" is-revealable="true" placeholder="Enter your password"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label is-required="true">Password</aegov-label>
    <aegov-input type="password" is-revealable="true" placeholder="Enter your password"></aegov-input>
  </aegov-form-field>
</div>

---

## Copy to Clipboard

Set `is-copyable="true"` together with `is-readonly="true"` to add a copy button that writes the current value to the clipboard. The button briefly switches to a check mark for visual feedback. Use this for application reference numbers, generated tokens, or confirmation codes.

```html
<aegov-form-field>
  <aegov-label>Application reference number</aegov-label>
  <aegov-input is-readonly="true" is-copyable="true" value="APP-2026-008421"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label>Application reference number</aegov-label>
    <aegov-input is-readonly="true" is-copyable="true" value="APP-2026-008421"></aegov-input>
  </aegov-form-field>
</div>

---

## Helper Text

Use the `helper` slot on `aegov-form-field` to provide guidance below the input — formatting hints, examples, or links to documentation. Helper text is automatically associated with the input via `aria-describedby`.

```html
<aegov-form-field>
  <aegov-label is-required="true">Emirates ID number</aegov-label>
  <aegov-input placeholder="784-YYYY-NNNNNNN-N" is-required="true"></aegov-input>
  <span slot="helper">15 digits in the format 784-YYYY-NNNNNNN-N. Found on the front of your ID card.</span>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label is-required="true">Emirates ID number</aegov-label>
    <aegov-input placeholder="784-YYYY-NNNNNNN-N" is-required="true"></aegov-input>
    <span slot="helper">15 digits in the format 784-YYYY-NNNNNNN-N. Found on the front of your ID card.</span>
  </aegov-form-field>
</div>

---

## Input Group with Add-ons

`aegov-input-group` wraps an `aegov-input` to add a static prefix and/or suffix. Use it for currency symbols, fixed domains, country codes, or unit suffixes. The group propagates its `size` to nested inputs and buttons so everything aligns.

```html
<aegov-input-group addon-prefix="AED">
  <aegov-input type="number" placeholder="0.00"></aegov-input>
</aegov-input-group>

<aegov-input-group addon-suffix=".gov.ae">
  <aegov-input placeholder="myservice"></aegov-input>
</aegov-input-group>

<aegov-input-group addon-prefix="https://" addon-suffix=".gov.ae">
  <aegov-input placeholder="myservice"></aegov-input>
</aegov-input-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-4 max-w-md">
    <aegov-input-group addon-prefix="AED">
      <aegov-input type="number" placeholder="0.00"></aegov-input>
    </aegov-input-group>
    <aegov-input-group addon-suffix=".gov.ae">
      <aegov-input placeholder="myservice"></aegov-input>
    </aegov-input-group>
    <aegov-input-group addon-prefix="https://" addon-suffix=".gov.ae">
      <aegov-input placeholder="myservice"></aegov-input>
    </aegov-input-group>
  </div>
</div>

### Search bar with button

Compose `aegov-input-group` with `aegov-input` and `aegov-button` to build a search bar. The group propagates the resolved size to both children automatically.

```html
<aegov-input-group size="lg">
  <aegov-input type="search" placeholder="Search services, forms, or documents"></aegov-input>
  <aegov-button variant="primary">Search</aegov-button>
</aegov-input-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-input-group size="lg">
    <aegov-input type="search" placeholder="Search services, forms, or documents"></aegov-input>
    <aegov-button variant="primary">Search</aegov-button>
  </aegov-input-group>
</div>

---

## Composite Example — Service Application Form

A realistic snippet from a residency permit application showing labels, helpers, required fields, and an error state.

```html
<form class="grid gap-6 max-w-xl">
  <aegov-form-field>
    <aegov-label is-required="true">Full name</aegov-label>
    <aegov-input name="full-name" placeholder="e.g. Fatima Hassan Al Marri" is-required="true"></aegov-input>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label is-required="true">Emirates ID number</aegov-label>
    <aegov-input name="eid" placeholder="784-YYYY-NNNNNNN-N" is-required="true"></aegov-input>
    <span slot="helper">15 digits, found on the front of your Emirates ID card.</span>
  </aegov-form-field>

  <aegov-form-field is-invalid="true">
    <aegov-label is-required="true">Email address</aegov-label>
    <aegov-input type="email" name="email" value="user@" is-required="true"></aegov-input>
    <span slot="error">Enter a valid email in the format name@example.gov.ae.</span>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label is-required="true">Mobile number</aegov-label>
    <aegov-input-group addon-prefix="+971">
      <aegov-input type="tel" name="mobile" placeholder="50 000 0000" is-required="true"></aegov-input>
    </aegov-input-group>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>Application reference (auto-generated)</aegov-label>
    <aegov-input is-readonly="true" is-copyable="true" value="APP-2026-008421"></aegov-input>
  </aegov-form-field>
</form>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <form class="grid gap-6 max-w-xl">
    <aegov-form-field>
      <aegov-label is-required="true">Full name</aegov-label>
      <aegov-input name="full-name" placeholder="e.g. Fatima Hassan Al Marri" is-required="true"></aegov-input>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label is-required="true">Emirates ID number</aegov-label>
      <aegov-input name="eid" placeholder="784-YYYY-NNNNNNN-N" is-required="true"></aegov-input>
      <span slot="helper">15 digits, found on the front of your Emirates ID card.</span>
    </aegov-form-field>
    <aegov-form-field is-invalid="true">
      <aegov-label is-required="true">Email address</aegov-label>
      <aegov-input type="email" name="email" value="user@" is-required="true"></aegov-input>
      <span slot="error">Enter a valid email in the format name@example.gov.ae.</span>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label is-required="true">Mobile number</aegov-label>
      <aegov-input-group addon-prefix="+971">
        <aegov-input type="tel" name="mobile" placeholder="50 000 0000" is-required="true"></aegov-input>
      </aegov-input-group>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>Application reference (auto-generated)</aegov-label>
      <aegov-input is-readonly="true" is-copyable="true" value="APP-2026-008421"></aegov-input>
    </aegov-form-field>
  </form>
</div>

---

## Listening for value events

The component emits four events: `aegovInputInput` on every keystroke, `aegovInputChange` when the value commits (typically on blur or Enter), `aegovInputFocus`, and `aegovInputBlur`. Use `input` for live validation hints and `change` for committed-value side effects.

```html
<aegov-input id="eid" placeholder="Emirates ID number"></aegov-input>

<script>
  const el = document.getElementById('eid');
  el.addEventListener('aegovInputInput', (e) => {
    console.log('Typed:', e.detail.value);
  });
  el.addEventListener('aegovInputChange', (e) => {
    console.log('Committed:', e.detail.value);
  });
</script>
```

---

## RTL Support

The input uses CSS logical properties throughout, so padding, slot icons, and the reveal/copy buttons swap sides automatically when the document or any ancestor is set to `dir="rtl"`. Add-ons in `aegov-input-group` flip too — `addon-prefix` ends up on the right and `addon-suffix` on the left.

```html
<div dir="rtl">
  <aegov-form-field>
    <aegov-label is-required="true">الاسم الكامل (كما في الهوية الإماراتية)</aegov-label>
    <aegov-input placeholder="مثال: محمد علي المنصوري" is-required="true"></aegov-input>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label is-required="true">رقم الهوية الإماراتية</aegov-label>
    <aegov-input placeholder="784-YYYY-NNNNNNN-N" is-required="true"></aegov-input>
    <span slot="helper">خمسة عشر رقماً موجودة على الجهة الأمامية من بطاقة الهوية.</span>
  </aegov-form-field>

  <aegov-input-group addon-prefix="+971">
    <aegov-input type="tel" placeholder="50 000 0000"></aegov-input>
  </aegov-input-group>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-6 max-w-xl">
    <aegov-form-field>
      <aegov-label is-required="true">الاسم الكامل (كما في الهوية الإماراتية)</aegov-label>
      <aegov-input placeholder="مثال: محمد علي المنصوري" is-required="true"></aegov-input>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label is-required="true">رقم الهوية الإماراتية</aegov-label>
      <aegov-input placeholder="784-YYYY-NNNNNNN-N" is-required="true"></aegov-input>
      <span slot="helper">خمسة عشر رقماً موجودة على الجهة الأمامية من بطاقة الهوية.</span>
    </aegov-form-field>
    <aegov-input-group addon-prefix="+971">
      <aegov-input type="tel" placeholder="50 000 0000"></aegov-input>
    </aegov-input-group>
  </div>
</div>

---

## API Reference

### aegov-input Properties

| Property       | Attribute       | Description                                                                                  | Type       | Default     |
| -------------- | --------------- | -------------------------------------------------------------------------------------------- | ---------- | ----------- |
| `fieldId`      | `field-id`      | DOM `id` for the native `<input>`. Auto-generated as `aegov-input-{n}` if omitted.            | `string`   | _generated_ |
| `type`         | `type`          | Native input type. See list below.                                                            | `InputType` | `'text'`   |
| `size`         | `size`          | Field size token or responsive string.                                                        | `string`   | `'base'`    |
| `variant`      | `variant`       | Colour family for idle ring, value text, and hover accent. Focus ring stays camel; error stays aered. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `value`        | `value`         | Current value. Mutable — synced internally on `input` and `change`.                            | `string`   | `''`        |
| `placeholder`  | `placeholder`   | Placeholder text shown when the field is empty.                                                | `string`   | `undefined` |
| `name`         | `name`          | Native `name` attribute used during form submission.                                            | `string`   | `undefined` |
| `isDisabled`   | `is-disabled`   | Disable the input.                                                                              | `boolean`  | `false`     |
| `isReadonly`   | `is-readonly`   | Mark the input as read-only.                                                                    | `boolean`  | `false`     |
| `isRequired`   | `is-required`   | Mark the field as required (sets native `required`).                                            | `boolean`  | `false`     |
| `isRevealable` | `is-revealable` | Show a password reveal toggle. Only takes effect with `type="password"`.                         | `boolean`  | `false`     |
| `isCopyable`   | `is-copyable`   | Show a copy-to-clipboard button. Only takes effect with `is-readonly="true"`.                    | `boolean`  | `false`     |
| `extraClass`   | `extra-class`   | Additional CSS classes applied to the native `<input>`.                                          | `string`   | `undefined` |

`InputType` accepts: `text`, `email`, `password`, `tel`, `url`, `number`, `search`, `date`, `time`, `datetime-local`, `month`, `week`.

### aegov-input-group Properties

| Property      | Attribute       | Description                                                          | Type     | Default     |
| ------------- | --------------- | -------------------------------------------------------------------- | -------- | ----------- |
| `size`        | `size`          | Group size, propagated to child `aegov-input` and `aegov-button`.    | `string` | `'base'`    |
| `variant`     | `variant`       | Colour family, cascades to inner `aegov-input` and shifts the addon stripe colour. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `addonPrefix` | `addon-prefix`  | Static text shown before the input (logical start).                   | `string` | `undefined` |
| `addonSuffix` | `addon-suffix`  | Static text shown after the input (logical end).                      | `string` | `undefined` |
| `extraClass`  | `extra-class`   | Additional CSS classes on the wrapper.                                | `string` | `undefined` |

### Slots

| Component           | Slot         | Description                                                                            |
| ------------------- | ------------ | -------------------------------------------------------------------------------------- |
| `aegov-input`       | `icon-start` | Icon shown before the input value (logical start).                                      |
| `aegov-input`       | `icon-end`   | Icon shown after the input value (hidden when a reveal/copy button is active).           |
| `aegov-input-group` | _(default)_  | Place an `aegov-input` (and optionally an `aegov-button`) here.                          |

### Events

| Event               | Component     | Detail                              | Description                                                                  |
| ------------------- | ------------- | ----------------------------------- | ---------------------------------------------------------------------------- |
| `aegovInputInput`   | `aegov-input` | `{ value: string; event: Event }`   | Fires on every keystroke. Use for live validation hints.                      |
| `aegovInputChange`  | `aegov-input` | `{ value: string; event: Event }`   | Fires when the value commits (native `change`, typically on blur or Enter).   |
| `aegovInputFocus`   | `aegov-input` | `FocusEvent`                        | Fires when the input gains focus.                                              |
| `aegovInputBlur`    | `aegov-input` | `FocusEvent`                        | Fires when the input loses focus.                                              |

### Pass-through Attributes

`aria-*` and `data-*` attributes set on `<aegov-input>` are always forwarded to the native `<input>`. The following standard input attributes are also forwarded when set on the host:

| Attribute      | Description                                            |
| -------------- | ------------------------------------------------------ |
| `pattern`      | Regular-expression validation pattern.                  |
| `min`, `max`   | Bounds for numeric and date types.                      |
| `step`         | Step granularity for numeric and date types.            |
| `minlength`    | Minimum character count.                                 |
| `maxlength`    | Maximum character count.                                 |
| `autocomplete` | Browser autofill hint (e.g. `email`, `tel`, `off`).      |
| `autofocus`    | Focus the input when it mounts.                         |
| `inputmode`    | On-screen keyboard hint (`numeric`, `tel`, etc.).       |
| `list`         | Reference a `<datalist>` element by id.                  |
| `multiple`     | Allow multiple comma-separated values (email/file).      |
| `accept`       | File-input MIME filter.                                  |
| `capture`      | File-input camera/microphone source.                    |
| `spellcheck`   | Enable or disable spellchecking.                        |
| `enterkeyhint` | Mobile keyboard "Enter" key label.                      |
| `title`        | Native tooltip / validation message.                     |
| `tabindex`     | Custom tab order.                                        |
| `form`         | Associate with a form by id.                             |

> Reserved HTML attributes (`id`, `class`, `style`) cannot be used as props — `id` is replaced by `field-id`, and `class`/`style` are applied to the host as usual.

---

## Validation

`aegov-input` exposes the unified validation surface described in [Validation Surface](validation-overview.html). The full contract (props, event payload, methods, value types, ARIA) lives there — only input-specific notes are here.

### Surface

| Prop | Description |
| --- | --- |
| `is-invalid` | Toggles invalid state; sets `aria-invalid="true"` on the inner `<input>`. |
| `error-message` | Inline error text below the input. Use `error` slot for richer markup. |
| `hint` | Helper text below the input when no error is shown. |

| Method | Description |
| --- | --- |
| `validate(trigger?)` | Re-runs validation; emits `aegovValidate`. |
| `setCustomValidity(message)` | Sets a custom error message; pass `''` to clear. |

| Event | Detail |
| --- | --- |
| `aegovValidate` | `{ name, value, validity, validationMessage, customError, trigger }` — `value` is `string`. |

### Common recipes

**Required + email validation:**

```html
<aegov-input name="email" type="email" is-required></aegov-input>
```

The native `type="email"` triggers `validity.typeMismatch`; `is-required` triggers `validity.valueMissing`. Both surface through the `aegovValidate` event.

**Min/max length:**

```html
<aegov-input name="zip" minlength="5" maxlength="5"></aegov-input>
```

**Pattern (regex):**

```html
<aegov-input name="phone" pattern="^\+971-?\d{9}$"></aegov-input>
```

**Custom server-side error:**

```js
input.setCustomValidity('Username already taken');
```

See the [Bring Your Own Validator](validation-byo.html) recipes for the full pattern catalog including async server checks and cross-field rules.

### Use with `@aegov/designsystem-validation`

```ts
import { createForm } from '@aegov/designsystem-validation';
import { valibotAdapter } from '@aegov/designsystem-validation/adapters/valibot';
import * as v from 'valibot';

const schema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
});
createForm(form, schema, valibotAdapter(), { onValidSubmit: console.log });
```

The orchestrator listens for `aegovValidate` events and writes back `is-invalid` / `error-message`. No per-component wiring required.

---

## Accessibility

### Built-in behaviour

- Renders a real `<input>` element, preserving native semantics, keyboard handling, autofill, and assistive-technology behaviour.
- `field-id` is auto-generated and reflected to the host so external `<label for>` (or `aegov-label`) can associate reliably.
- `is-required` sets the native `required` attribute, which exposes the requirement to assistive tech automatically.
- The reveal toggle and copy button each have descriptive `aria-label` text and `tabindex="-1"` so they don't interrupt the natural tab flow.
- Decorative SVG icons in the helper buttons use `aria-hidden="true"`.
- When wrapped in `aegov-form-field`, helper and error text are wired up via `aria-describedby` automatically.

### Developer responsibilities

- Always provide a visible label — `aegov-label` inside `aegov-form-field` is the preferred pattern. For unlabelled inputs (e.g. an icon-only search field), set `aria-label` on the host.
- Use the right `type` for the data being collected — it determines on-screen keyboards, autofill behaviour, and built-in validation.
- For password reveal, warn users about visibility when sharing screens; the toggle does not announce the change to other parties.
- For copyable fields, ensure the value is safe to expose in clipboard history.

### Keyboard support

| Key             | Action                                                                             |
| --------------- | ---------------------------------------------------------------------------------- |
| `Tab`           | Move focus to the input. Reveal/copy buttons are skipped (`tabindex="-1"`).         |
| `Shift + Tab`   | Move focus to the previous focusable element.                                        |
| `Enter`         | Commit the value (fires `aegovInputChange`) and submit the surrounding form.         |
| Standard text editing | All native shortcuts apply — selection, cursor movement, cut/copy/paste.        |
