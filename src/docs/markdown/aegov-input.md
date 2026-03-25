# Input

<p class="text-lg text-aeblack-500 mb-8">A text input lets users enter and edit short-form text data such as names, emails, passwords, and numbers. It is the foundational form control of the design system.</p>

## Introduction

The `aegov-input` component renders a native `<input>` element wrapped with design-system styling, size tokens, icon slots, a password reveal toggle, and a copy-to-clipboard button. It is designed to work standalone or inside the companion components `aegov-form-field` (label + helper/error linking) and `aegov-input-group` (prefix/suffix addons).

The input ships in **5 sizes**, supports **12 input types**, and includes built-in password reveal and copy-to-clipboard features.

```html
<aegov-input placeholder="Enter your name"></aegov-input>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-input placeholder="Enter your name"></aegov-input>
</div>

### With Label and Form Field

Wrap `aegov-label` and `aegov-input` inside `aegov-form-field` to automatically link the label to the input via the `for` attribute.

```html
<aegov-form-field>
  <aegov-label>Full Name</aegov-label>
  <aegov-input placeholder="Enter your full name"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>Full Name</aegov-label>
    <aegov-input placeholder="Enter your full name"></aegov-input>
  </aegov-form-field>
</div>

---

## Input Types

The `type` property supports 12 HTML input types. The input automatically adapts its behaviour, keyboard, and validation to the selected type.

| Type             | Description                              |
|------------------|------------------------------------------|
| `text`           | Default. General-purpose text input.     |
| `email`          | Email address with validation.           |
| `password`       | Masked text input for secrets.           |
| `tel`            | Telephone number (numeric keyboard on mobile). |
| `url`            | URL with validation.                     |
| `number`         | Numeric input with stepper controls.     |
| `search`         | Search field with clear button on some browsers. |
| `date`           | Date picker (browser-native).            |
| `time`           | Time picker (browser-native).            |
| `datetime-local` | Combined date and time picker.           |
| `month`          | Month and year picker.                   |
| `week`           | Week and year picker.                    |

```html
<aegov-input type="text" placeholder="Text"></aegov-input>
<aegov-input type="email" placeholder="email@example.com"></aegov-input>
<aegov-input type="password" placeholder="Password"></aegov-input>
<aegov-input type="number" placeholder="0"></aegov-input>
<aegov-input type="tel" placeholder="+971 50 000 0000"></aegov-input>
<aegov-input type="url" placeholder="https://example.com"></aegov-input>
<aegov-input type="search" placeholder="Search..."></aegov-input>
<aegov-input type="date"></aegov-input>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-input type="text" placeholder="Text"></aegov-input>
  <aegov-input type="email" placeholder="email@example.com"></aegov-input>
  <aegov-input type="password" placeholder="Password"></aegov-input>
  <aegov-input type="number" placeholder="0"></aegov-input>
  <aegov-input type="tel" placeholder="+971 50 000 0000"></aegov-input>
  <aegov-input type="url" placeholder="https://example.com"></aegov-input>
  <aegov-input type="search" placeholder="Search..."></aegov-input>
  <aegov-input type="date"></aegov-input>
</div>

---

## Sizes

The `size` property controls the height, padding, and font size of the input. All five sizes align with the corresponding button sizes so they can sit side-by-side in input groups.

| Size   | Height | Font Size | Padding        |
|--------|--------|-----------|----------------|
| `xs`   | 36px   | 14px      | 6px 10px       |
| `sm`   | 40px   | 14px      | 8px 12px       |
| `base` | 44px   | 16px      | 10px 14px      |
| `lg`   | 48px   | 18px      | 12px 16px      |
| `xl`   | 52px   | 18px      | 14px 18px      |

```html
<aegov-input size="xs" placeholder="Extra Small"></aegov-input>
<aegov-input size="sm" placeholder="Small"></aegov-input>
<aegov-input size="base" placeholder="Base (default)"></aegov-input>
<aegov-input size="lg" placeholder="Large"></aegov-input>
<aegov-input size="xl" placeholder="Extra Large"></aegov-input>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-input size="xs" placeholder="Extra Small"></aegov-input>
  <aegov-input size="sm" placeholder="Small"></aegov-input>
  <aegov-input size="base" placeholder="Base (default)"></aegov-input>
  <aegov-input size="lg" placeholder="Large"></aegov-input>
  <aegov-input size="xl" placeholder="Extra Large"></aegov-input>
</div>

---

## States

### Disabled

Set the `disabled` attribute to prevent interaction. The input becomes visually muted and unclickable.

```html
<aegov-input disabled placeholder="Disabled input" value="Cannot edit"></aegov-input>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>Disabled Field</aegov-label>
    <aegov-input disabled placeholder="Disabled input" value="Cannot edit"></aegov-input>
  </aegov-form-field>
</div>

### Readonly

Set the `readonly` attribute to display a value that the user cannot modify but can still select and copy.

```html
<aegov-input readonly value="Read-only value"></aegov-input>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>Readonly Field</aegov-label>
    <aegov-input readonly value="Read-only value"></aegov-input>
  </aegov-form-field>
</div>

### Required

Set the `required` attribute to mark the field as mandatory. This enables native browser validation.

```html
<aegov-form-field>
  <aegov-label>Email *</aegov-label>
  <aegov-input type="email" required placeholder="Required field"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>Email <span class="text-aered-500">*</span></aegov-label>
    <aegov-input type="email" required placeholder="Required field"></aegov-input>
  </aegov-form-field>
</div>

---

## Placeholder

Use the `placeholder` property to show hint text inside the input when it is empty. Placeholder text disappears as soon as the user begins typing.

```html
<aegov-input placeholder="e.g. John Doe"></aegov-input>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-input placeholder="e.g. John Doe"></aegov-input>
</div>

---

## Password Reveal

When `type="password"` and `revealable` is set, a toggle button appears inside the input that lets users show or hide the password text.

```html
<aegov-input type="password" revealable placeholder="Enter password"></aegov-input>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>Password</aegov-label>
    <aegov-input type="password" revealable placeholder="Enter password"></aegov-input>
  </aegov-form-field>
</div>

The eye icon toggles between show and hide states. The button carries an `aria-label` that updates to "Show password" or "Hide password" as appropriate.

---

## Copy to Clipboard

When `readonly` and `copyable` are both set, a copy button appears inside the input. Clicking it copies the current value to the clipboard and briefly shows a checkmark for visual feedback.

```html
<aegov-input readonly copyable value="AEGOV-REF-2026-001"></aegov-input>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>Reference Number</aegov-label>
    <aegov-input readonly copyable value="AEGOV-REF-2026-001"></aegov-input>
  </aegov-form-field>
</div>

---

## Icon Slots

The input provides two named slots -- `icon-start` and `icon-end` -- for placing icons inside the field. Icons are vertically centred and sized to match the current input size.

### Leading Icon

```html
<aegov-input placeholder="Search...">
  <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
       viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
</aegov-input>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-input placeholder="Search...">
    <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  </aegov-input>
</div>

### Trailing Icon

```html
<aegov-input placeholder="Enter amount">
  <svg slot="icon-end" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
       viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
  </svg>
</aegov-input>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-input placeholder="Enter amount">
    <svg slot="icon-end" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
  </aegov-input>
</div>

### Both Icons

```html
<aegov-input placeholder="Search users...">
  <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
       viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
  <svg slot="icon-end" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
       viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
</aegov-input>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-input placeholder="Search users...">
    <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    <svg slot="icon-end" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  </aegov-input>
</div>

> **Note:** When `revealable` or `copyable` is active, the `icon-end` slot is visually hidden to prevent overlap with the action button.

---

## Number Input with Min, Max, and Step

For `type="number"`, you can pass native attributes `min`, `max`, and `step` as pass-through attributes directly on the host element.

```html
<aegov-input type="number" min="0" max="100" step="5" placeholder="0-100"></aegov-input>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>Quantity (0-100, step 5)</aegov-label>
    <aegov-input type="number" min="0" max="100" step="5" placeholder="0"></aegov-input>
  </aegov-form-field>
</div>

---

## Helper Text and Error Messages

Use `aegov-form-field` to add helper text or error messages below the input. Place a `<small>` element after the input for helper text, and style error states with utility classes.

```html
<!-- Helper text -->
<aegov-form-field>
  <aegov-label>Username</aegov-label>
  <aegov-input placeholder="Choose a username"></aegov-input>
  <small class="text-sm text-aeblack-400 mt-1 block">
    Must be 3-20 characters, letters and numbers only.
  </small>
</aegov-form-field>

<!-- Error state -->
<aegov-form-field>
  <aegov-label>Email *</aegov-label>
  <aegov-input type="email" placeholder="Enter email"
               class="!inset-ring-aered-500"></aegov-input>
  <small class="text-sm text-aered-500 mt-1 block">
    Please enter a valid email address.
  </small>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>Username</aegov-label>
    <aegov-input placeholder="Choose a username"></aegov-input>
    <small class="text-sm text-aeblack-400 mt-1 block">Must be 3-20 characters, letters and numbers only.</small>
  </aegov-form-field>
  <aegov-form-field>
    <aegov-label>Email <span class="text-aered-500">*</span></aegov-label>
    <aegov-input type="email" placeholder="Enter email" class="!inset-ring-aered-500"></aegov-input>
    <small class="text-sm text-aered-500 mt-1 block">Please enter a valid email address.</small>
  </aegov-form-field>
</div>

---

## Input Group

The `aegov-input-group` component wraps an `aegov-input` with optional prefix/suffix text addons, buttons, or native `<select>` elements. The group provides a unified border and ring treatment around all children.

### Text Prefix and Suffix

Use the `addon-prefix` and `addon-suffix` properties to add static text before or after the input.

```html
<aegov-input-group addon-prefix="https://">
  <aegov-input placeholder="www.example.com"></aegov-input>
</aegov-input-group>

<aegov-input-group addon-suffix=".ae">
  <aegov-input placeholder="yoursite"></aegov-input>
</aegov-input-group>

<aegov-input-group addon-prefix="AED" addon-suffix=".00">
  <aegov-input type="number" placeholder="0"></aegov-input>
</aegov-input-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-input-group addon-prefix="https://">
    <aegov-input placeholder="www.example.com"></aegov-input>
  </aegov-input-group>
  <aegov-input-group addon-suffix=".ae">
    <aegov-input placeholder="yoursite"></aegov-input>
  </aegov-input-group>
  <aegov-input-group addon-prefix="AED" addon-suffix=".00">
    <aegov-input type="number" placeholder="0"></aegov-input>
  </aegov-input-group>
</div>

### With Button

Place an `aegov-button` inside the group alongside the input. The button loses its own border radius and takes the group border instead.

```html
<aegov-input-group>
  <aegov-input placeholder="Search..."></aegov-input>
  <aegov-button>Search</aegov-button>
</aegov-input-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-input-group>
    <aegov-input placeholder="Search..."></aegov-input>
    <aegov-button>Search</aegov-button>
  </aegov-input-group>
  <aegov-input-group>
    <aegov-input type="email" placeholder="Enter your email"></aegov-input>
    <aegov-button>Subscribe</aegov-button>
  </aegov-input-group>
</div>

### With Native Select

A native `<select>` element can be placed inside the group for combined input patterns such as phone numbers with country codes.

```html
<aegov-input-group>
  <select>
    <option>+971</option>
    <option>+966</option>
    <option>+973</option>
  </select>
  <aegov-input type="tel" placeholder="50 000 0000"></aegov-input>
</aegov-input-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-input-group>
    <select>
      <option>+971</option>
      <option>+966</option>
      <option>+973</option>
    </select>
    <aegov-input type="tel" placeholder="50 000 0000"></aegov-input>
  </aegov-input-group>
</div>

### Input Group Sizes

The `size` property on `aegov-input-group` propagates to child `aegov-input` and `aegov-button` components automatically.

```html
<aegov-input-group size="xs" addon-prefix="USD">
  <aegov-input type="number" placeholder="0.00"></aegov-input>
</aegov-input-group>

<aegov-input-group size="sm" addon-prefix="USD">
  <aegov-input type="number" placeholder="0.00"></aegov-input>
</aegov-input-group>

<aegov-input-group size="base" addon-prefix="USD">
  <aegov-input type="number" placeholder="0.00"></aegov-input>
</aegov-input-group>

<aegov-input-group size="lg" addon-prefix="USD">
  <aegov-input type="number" placeholder="0.00"></aegov-input>
</aegov-input-group>

<aegov-input-group size="xl" addon-prefix="USD">
  <aegov-input type="number" placeholder="0.00"></aegov-input>
</aegov-input-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-input-group size="xs" addon-prefix="$">
    <aegov-input type="number" placeholder="0.00"></aegov-input>
  </aegov-input-group>
  <aegov-input-group size="sm" addon-prefix="$">
    <aegov-input type="number" placeholder="0.00"></aegov-input>
  </aegov-input-group>
  <aegov-input-group size="base" addon-prefix="$">
    <aegov-input type="number" placeholder="0.00"></aegov-input>
  </aegov-input-group>
  <aegov-input-group size="lg" addon-prefix="$">
    <aegov-input type="number" placeholder="0.00"></aegov-input>
  </aegov-input-group>
  <aegov-input-group size="xl" addon-prefix="$">
    <aegov-input type="number" placeholder="0.00"></aegov-input>
  </aegov-input-group>
</div>

---

## Label Component

The `aegov-label` component renders a styled `<label>` element. When placed inside `aegov-form-field`, the `for` attribute is automatically linked to the companion input's ID.

```html
<aegov-form-field>
  <aegov-label>First Name</aegov-label>
  <aegov-input placeholder="Enter first name"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>First Name</aegov-label>
    <aegov-input placeholder="Enter first name"></aegov-input>
  </aegov-form-field>
</div>

### Required Indicator

Add a required indicator by including a styled asterisk inside the label slot.

```html
<aegov-form-field>
  <aegov-label>Email Address <span class="text-aered-500">*</span></aegov-label>
  <aegov-input type="email" required placeholder="you@example.com"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>Email Address <span class="text-aered-500">*</span></aegov-label>
    <aegov-input type="email" required placeholder="you@example.com"></aegov-input>
  </aegov-form-field>
</div>

### Optional Text

Similarly, add "(optional)" text to signal fields that are not required.

```html
<aegov-form-field>
  <aegov-label>Middle Name <span class="text-aeblack-300 font-normal">(optional)</span></aegov-label>
  <aegov-input placeholder="Enter middle name"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>Middle Name <span class="text-aeblack-300 font-normal">(optional)</span></aegov-label>
    <aegov-input placeholder="Enter middle name"></aegov-input>
  </aegov-form-field>
</div>

---

## Form Field Component

The `aegov-form-field` component is a structural wrapper that automatically links a child `aegov-label` to a child form control (`aegov-input`, `aegov-textarea`, `aegov-select`, `aegov-checkbox`, `aegov-range`, `aegov-progress`, or `aegov-otp`) by setting the label's `for` attribute to match the control's generated `fieldId`.

It also dims the label when the child input is disabled.

```html
<aegov-form-field>
  <aegov-label>Full Name *</aegov-label>
  <aegov-input required placeholder="Enter your full name"></aegov-input>
  <small class="text-sm text-aeblack-400 mt-1 block">
    As it appears on your Emirates ID.
  </small>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>Full Name <span class="text-aered-500">*</span></aegov-label>
    <aegov-input required placeholder="Enter your full name"></aegov-input>
    <small class="text-sm text-aeblack-400 mt-1 block">As it appears on your Emirates ID.</small>
  </aegov-form-field>
</div>

### Disabled Label Styling

When the child input has the `disabled` attribute, the label inside `aegov-form-field` is automatically dimmed.

```html
<aegov-form-field>
  <aegov-label>Disabled Field</aegov-label>
  <aegov-input disabled value="Cannot edit"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>Disabled Field</aegov-label>
    <aegov-input disabled value="Cannot edit"></aegov-input>
  </aegov-form-field>
</div>

---

## Complete Form Example

Combine `aegov-form-field`, `aegov-label`, `aegov-input`, and `aegov-input-group` to build a real-world form layout.

```html
<form class="space-y-4">
  <aegov-form-field>
    <aegov-label>Full Name *</aegov-label>
    <aegov-input required placeholder="John Doe"></aegov-input>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>Email *</aegov-label>
    <aegov-input type="email" required placeholder="john@example.com"></aegov-input>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>Password *</aegov-label>
    <aegov-input type="password" revealable required
                 placeholder="Enter password"></aegov-input>
    <small class="text-sm text-aeblack-400 mt-1 block">Minimum 8 characters.</small>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>Website</aegov-label>
    <aegov-input-group addon-prefix="https://">
      <aegov-input placeholder="www.example.com"></aegov-input>
    </aegov-input-group>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>Phone</aegov-label>
    <aegov-input-group>
      <select>
        <option>+971</option>
        <option>+966</option>
      </select>
      <aegov-input type="tel" placeholder="50 000 0000"></aegov-input>
    </aegov-input-group>
  </aegov-form-field>

  <aegov-button type="submit">Submit</aegov-button>
</form>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <form class="space-y-4" onsubmit="event.preventDefault();">
    <aegov-form-field>
      <aegov-label>Full Name <span class="text-aered-500">*</span></aegov-label>
      <aegov-input required placeholder="John Doe"></aegov-input>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>Email <span class="text-aered-500">*</span></aegov-label>
      <aegov-input type="email" required placeholder="john@example.com"></aegov-input>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>Password <span class="text-aered-500">*</span></aegov-label>
      <aegov-input type="password" revealable required placeholder="Enter password"></aegov-input>
      <small class="text-sm text-aeblack-400 mt-1 block">Minimum 8 characters.</small>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>Website</aegov-label>
      <aegov-input-group addon-prefix="https://">
        <aegov-input placeholder="www.example.com"></aegov-input>
      </aegov-input-group>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>Phone</aegov-label>
      <aegov-input-group>
        <select>
          <option>+971</option>
          <option>+966</option>
        </select>
        <aegov-input type="tel" placeholder="50 000 0000"></aegov-input>
      </aegov-input-group>
    </aegov-form-field>
    <aegov-button type="submit">Submit</aegov-button>
  </form>
</div>

---

## RTL Support

All input components fully support right-to-left layouts. When the document or a parent element has `dir="rtl"`, text alignment, icon positions, addon placement, and padding automatically mirror.

```html
<div dir="rtl">
  <aegov-form-field>
    <aegov-label>الاسم الكامل</aegov-label>
    <aegov-input placeholder="أدخل اسمك الكامل"></aegov-input>
  </aegov-form-field>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>الاسم الكامل</aegov-label>
    <aegov-input placeholder="أدخل اسمك الكامل"></aegov-input>
  </aegov-form-field>
  <aegov-form-field>
    <aegov-label>كلمة المرور</aegov-label>
    <aegov-input type="password" revealable placeholder="أدخل كلمة المرور"></aegov-input>
  </aegov-form-field>
  <aegov-input-group addon-prefix="https://">
    <aegov-input placeholder="www.example.ae"></aegov-input>
  </aegov-input-group>
</div>

No additional configuration is needed -- the components read the inherited `dir` attribute and adjust automatically using logical CSS properties (`padding-inline-start`, `padding-inline-end`, etc.).

---

## API Reference

### aegov-input Properties

| Property      | Attribute      | Description                                                                 | Type                                                                                                            | Default    |
|---------------|----------------|-----------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|------------|
| `fieldId`     | `field-id`     | Unique ID for the native input. Auto-generated if not provided.             | `string`                                                                                                        | auto       |
| `type`        | `type`         | The HTML input type                                                         | `'text'` `'email'` `'password'` `'tel'` `'url'` `'number'` `'search'` `'date'` `'time'` `'datetime-local'` `'month'` `'week'` | `'text'`   |
| `size`        | `size`         | The input size                                                              | `'xs'` `'sm'` `'base'` `'lg'` `'xl'`                                                                     | `'base'`   |
| `disabled`    | `disabled`     | Prevents interaction                                                        | `boolean`                                                                                                       | `false`    |
| `readonly`    | `readonly`     | Makes the input read-only                                                   | `boolean`                                                                                                       | `false`    |
| `placeholder` | `placeholder`  | Hint text shown when the input is empty                                     | `string`                                                                                                        | --         |
| `value`       | `value`        | The current value of the input                                              | `string`                                                                                                        | `''`       |
| `name`        | `name`         | The name attribute for form submission                                      | `string`                                                                                                        | --         |
| `required`    | `required`     | Marks the field as required for validation                                  | `boolean`                                                                                                       | `false`    |
| `revealable`  | `revealable`   | Shows a toggle to reveal/hide password (only when `type="password"`)        | `boolean`                                                                                                       | `false`    |
| `copyable`    | `copyable`     | Shows a copy button (only when `readonly` is set)                           | `boolean`                                                                                                       | `false`    |
| `class`       | `class`        | Additional CSS classes to apply to the native input                         | `string`                                                                                                        | --         |

### aegov-input Events

| Event              | Description                                     | Detail Type                          |
|--------------------|-------------------------------------------------|--------------------------------------|
| `aegovInputChange` | Emitted when the value changes (on blur/enter)  | `{ value: string; event: Event }`    |
| `aegovInputInput`  | Emitted on every keystroke                      | `{ value: string; event: Event }`    |
| `aegovInputFocus`  | Emitted when the input gains focus              | `FocusEvent`                         |
| `aegovInputBlur`   | Emitted when the input loses focus              | `FocusEvent`                         |

#### Listening to Events

```html
<aegov-input id="my-input" placeholder="Type here"></aegov-input>

<script>
  document.getElementById('my-input')
    .addEventListener('aegovInputInput', (e) => {
      console.log('Value:', e.detail.value);
    });

  document.getElementById('my-input')
    .addEventListener('aegovInputChange', (e) => {
      console.log('Committed value:', e.detail.value);
    });
</script>
```

### aegov-input Slots

| Slot         | Description                                                    |
|--------------|----------------------------------------------------------------|
| `icon-start` | Icon placed at the start (left in LTR, right in RTL) of the input. |
| `icon-end`   | Icon placed at the end (right in LTR, left in RTL) of the input. Hidden when `revealable` or `copyable` is active. |

### aegov-input Pass-Through Attributes

The component forwards `aria-*`, `data-*`, and the following native input attributes to the inner `<input>` element: `pattern`, `min`, `max`, `minlength`, `maxlength`, `step`, `autocomplete`, `autofocus`, `inputmode`, `list`, `multiple`, `accept`, `capture`, `spellcheck`, `enterkeyhint`, `title`, `tabindex`, `form`.

```html
<aegov-input type="number" min="1" max="10" step="1"
             autocomplete="off" inputmode="numeric"
             aria-describedby="help-text"
             data-analytics="quantity-field">
</aegov-input>
```

---

### aegov-input-group Properties

| Property       | Attribute       | Description                                                         | Type                            | Default  |
|----------------|-----------------|---------------------------------------------------------------------|---------------------------------|----------|
| `size`         | `size`          | The group size. Propagated to child `aegov-input` and `aegov-button`. | `'sm'` `'base'` `'lg'` | `'base'` |
| `addonPrefix`  | `addon-prefix`  | Static text displayed before the input                              | `string`                        | --       |
| `addonSuffix`  | `addon-suffix`  | Static text displayed after the input                               | `string`                        | --       |
| `class`        | `class`         | Additional CSS classes to apply                                     | `string`                        | --       |

### aegov-input-group Slots

| Slot      | Description                                                                      |
|-----------|----------------------------------------------------------------------------------|
| (default) | The group content -- typically `aegov-input`, `aegov-button`, or native `select`. |

---

### aegov-form-field Properties

| Property | Attribute | Description                      | Type     | Default |
|----------|-----------|----------------------------------|----------|---------|
| `class`  | `class`   | Additional CSS classes to apply  | `string` | --      |

### aegov-form-field Slots

| Slot      | Description                                                                                         |
|-----------|-----------------------------------------------------------------------------------------------------|
| (default) | The field content -- typically `aegov-label`, a form control, and optional helper text or error text. |

### aegov-form-field Behaviour

- Automatically sets the child `aegov-label`'s `for` attribute to match the child form control's `fieldId`.
- Supports linking to: `aegov-input`, `aegov-textarea`, `aegov-select`, `aegov-checkbox`, `aegov-range`, `aegov-progress`, `aegov-otp`.
- When a child input has the `disabled` attribute, the label text is automatically dimmed via CSS.

---

### aegov-label Properties

| Property  | Attribute | Description                                                                   | Type     | Default |
|-----------|-----------|-------------------------------------------------------------------------------|----------|---------|
| `htmlFor` | `for`     | The ID of the form control this label is for. Automatically set by `aegov-form-field`. | `string` | --      |
| `class`   | `class`   | Additional CSS classes to apply                                               | `string` | --      |

### aegov-label Slots

| Slot      | Description                                                          |
|-----------|----------------------------------------------------------------------|
| (default) | The label content -- text, required indicators, or optional markers.  |

---

## Accessibility

The `aegov-input` component and its companions are built with accessibility as a first-class concern.

### Built-in Features

- **Native input element** -- the component renders a semantic HTML input that is keyboard-focusable and announced correctly by screen readers.
- **Native label element** -- `aegov-label` renders a real `<label>` element. When used inside `aegov-form-field`, the `for` attribute is automatically linked to the input's `id`.
- **Focus indicators** -- clearly visible focus rings are applied via `focus-visible` / `focus-within` styles using the primary-support colour.
- **Disabled state** -- applies `pointer-events: none`, `cursor-not-allowed`, and reduced opacity so the input is both visually and functionally inert. The label is also dimmed.
- **Password reveal** -- the toggle button includes an `aria-label` that updates between "Show password" and "Hide password".
- **Copy button** -- the copy button includes an `aria-label` that updates between "Copy to clipboard" and "Copied".
- **Pass-through attributes** -- all `aria-*` and `data-*` attributes placed on the host element are forwarded to the native input.

### Developer Responsibilities

1. **Always pair inputs with labels.** Use `aegov-form-field` with `aegov-label` to ensure every input has an accessible label. If a visible label is not possible, provide `aria-label` on the `aegov-input` element.

2. **Error messages should be linked.** Use `aria-describedby` on the input pointing to the ID of the error message element so screen readers announce the error.

```html
<aegov-form-field>
  <aegov-label>Email</aegov-label>
  <aegov-input type="email" aria-describedby="email-error"></aegov-input>
  <small id="email-error" class="text-sm text-aered-500 mt-1 block">
    Please enter a valid email.
  </small>
</aegov-form-field>
```

3. **Required fields.** Use both the `required` attribute for native validation and a visible indicator (e.g. an asterisk) in the label for sighted users.

4. **Colour contrast.** All built-in colour combinations meet WCAG 2.1 AA contrast ratios. If you override colours via the `class` property, verify that the new colours maintain at least a **4.5:1** contrast ratio for text.

5. **Do not remove focus styles.** The built-in focus rings are essential for keyboard navigation. Avoid overriding them with `outline: none`.

---

## Notes

- The `aegov-input` component renders a native `<input>` element internally. Do **not** wrap it inside another `<input>` -- this creates invalid HTML.
- The `fieldId` property is auto-generated using a module-level counter to ensure uniqueness. You can override it by setting the `field-id` attribute explicitly.
- The `revealable` property only works when `type="password"`. It is ignored for all other input types.
- The `copyable` property only works when `readonly` is set. It is ignored otherwise.
- When both `revealable`/`copyable` and `icon-end` are present, the `icon-end` slot is hidden to prevent overlap with the action button.
- Inside an `aegov-input-group`, the input's own border ring and border radius are removed. The group provides a unified border treatment.
- The `size` property on `aegov-input-group` automatically propagates to child `aegov-input` and `aegov-button` components. You do not need to set the size on each child individually.
- Native attributes such as `min`, `max`, `step`, `pattern`, `minlength`, `maxlength`, `autocomplete`, `autofocus`, `inputmode`, `spellcheck`, `enterkeyhint`, `title`, `tabindex`, `list`, and `form` are passed through to the native input element automatically.
- The `aegov-form-field` component supports linking labels to multiple form control types beyond `aegov-input` -- including `aegov-textarea`, `aegov-select`, `aegov-checkbox`, `aegov-range`, `aegov-progress`, and `aegov-otp`.
