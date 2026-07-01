# Toggle

<p class="text-lg text-aeblack-500 mb-8">A Toggle is a switch input that lets users turn a single setting on or off. It is the right choice for binary preferences that take effect immediately — notification channels, language preference, accessibility options — and provides clear visual and assistive-technology feedback for the current state.</p>

## Introduction

The `aegov-toggle` component renders a fully accessible switch built on a native `<input type="checkbox">` with `role="switch"`. It supports an optional inline label and description, five sizes, custom on/off icons via slots, and standard form integration through `name` and `value`. Use it for "on now" decisions; for choices that only apply after a Save action, prefer a checkbox.

```html
<aegov-toggle
  label="Enable SMS notifications"
  hint="Receive transactional updates on your registered UAE mobile number."
  is-checked="true"
></aegov-toggle>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-toggle
    label="Enable SMS notifications"
    hint="Receive transactional updates on your registered UAE mobile number."
    is-checked="true"
  ></aegov-toggle>
</div>

---

## Sizes

The `size` property scales the track, thumb, and label typography. Five tokens are available — `xs`, `sm`, `base` (default), `lg`, and `xl` — to match the surrounding control density.

```html
<aegov-toggle size="xs" label="Extra small"></aegov-toggle>
<aegov-toggle size="sm" label="Small"></aegov-toggle>
<aegov-toggle size="base" label="Base (default)"></aegov-toggle>
<aegov-toggle size="lg" label="Large"></aegov-toggle>
<aegov-toggle size="xl" label="Extra large"></aegov-toggle>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-col gap-4">
  <aegov-toggle size="xs" label="Extra small (xs)"></aegov-toggle>
  <aegov-toggle size="sm" label="Small (sm)"></aegov-toggle>
  <aegov-toggle size="base" label="Base (default)"></aegov-toggle>
  <aegov-toggle size="lg" label="Large (lg)"></aegov-toggle>
  <aegov-toggle size="xl" label="Extra large (xl)"></aegov-toggle>
</div>

### Responsive sizes

The `size` property accepts a Tailwind-style responsive string with the breakpoint prefixes `xs`, `sm`, `md`, `lg`, `xl`, and `2xl`. Each segment overrides smaller breakpoints.

```html
<aegov-toggle size="sm md:base xl:lg" label="Resizes with the viewport"></aegov-toggle>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-toggle size="sm md:base xl:lg" label="Resizes with the viewport"></aegov-toggle>
</div>

---

## Variant

The `variant` property selects the colour family of the **ON track**. The OFF track always stays `aeblack-200` for unambiguous visual contrast between states. The focus ring stays `primary-support-600` (camel) and the error border stays `aered-600` regardless of variant. The thumb glyph is always `whitely-50` for legibility.

- `primary` — primary-* family (default)
- `secondary` — secondary-* family
- `neutral-max` — strong neutral (aeblack-800 family)
- `neutral-min` — quiet neutral (aeblack-100 family). ON track stays `aeblack-800` so the toggle remains readable.

### Colour matrix

| Variant       | OFF track       | ON track        | Hover accent    |
| ------------- | --------------- | --------------- | --------------- |
| `primary`     | `aeblack-200`   | `primary-600`   | `primary-700`   |
| `secondary`   | `aeblack-200`   | `secondary-600` | `secondary-700` |
| `neutral-max` | `aeblack-200`   | `aeblack-800`   | `aeblack-800`   |
| `neutral-min` | `aeblack-200`   | `aeblack-800`   | `aeblack-700`   |

```html
<aegov-toggle variant="primary" label="Primary"></aegov-toggle>
<aegov-toggle variant="secondary" label="Secondary"></aegov-toggle>
<aegov-toggle variant="neutral-max" label="Neutral-max"></aegov-toggle>
<aegov-toggle variant="neutral-min" label="Neutral-min"></aegov-toggle>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <aegov-toggle variant="primary" label="Primary — OFF"></aegov-toggle>
    <aegov-toggle variant="primary" label="Primary — ON" is-checked="true"></aegov-toggle>
    <aegov-toggle variant="secondary" label="Secondary — OFF"></aegov-toggle>
    <aegov-toggle variant="secondary" label="Secondary — ON" is-checked="true"></aegov-toggle>
    <aegov-toggle variant="neutral-max" label="Neutral-max — OFF"></aegov-toggle>
    <aegov-toggle variant="neutral-max" label="Neutral-max — ON" is-checked="true"></aegov-toggle>
    <aegov-toggle variant="neutral-min" label="Neutral-min — OFF"></aegov-toggle>
    <aegov-toggle variant="neutral-min" label="Neutral-min — ON" is-checked="true"></aegov-toggle>
  </div>
</div>

---

## Label and hint

When a `label` is supplied, the toggle renders inside a `<label>` element so the entire row is clickable. Add `hint` to provide secondary helper text below the label — for example to explain consent implications or rate-limit consequences.

```html
<aegov-toggle
  label="Share my data with partner government entities"
  hint="Allows the Ministry to share verified profile data with other UAE federal services to pre-fill applications."
></aegov-toggle>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-toggle
    label="Share my data with partner government entities"
    hint="Allows the Ministry to share verified profile data with other UAE federal services to pre-fill applications."
  ></aegov-toggle>
</div>

A toggle without a label renders as a bare switch — useful inside cards or table rows where the label is provided by the surrounding context.

```html
<aegov-toggle is-checked="true"></aegov-toggle>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex items-center gap-3">
  <span class="text-aeblack-700">Email notifications</span>
  <aegov-toggle is-checked="true"></aegov-toggle>
</div>

---

## Checked and unchecked states

Use `is-checked` to set the initial state. The property is reflected back to the host attribute as the user interacts, so reading the attribute always reflects the current value.

```html
<aegov-toggle label="Off by default"></aegov-toggle>
<aegov-toggle label="On by default" is-checked="true"></aegov-toggle>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-col gap-4">
  <aegov-toggle label="Off by default"></aegov-toggle>
  <aegov-toggle label="On by default" is-checked="true"></aegov-toggle>
</div>

---

## Disabled

Set `is-disabled="true"` to prevent interaction. The track and thumb are visually muted and the underlying input receives the native `disabled` attribute, removing it from the tab order and form submission.

```html
<aegov-toggle label="Disabled (off)" is-disabled="true"></aegov-toggle>
<aegov-toggle label="Disabled (on)" is-disabled="true" is-checked="true"></aegov-toggle>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-col gap-4">
  <aegov-toggle label="Disabled (off)" is-disabled="true"></aegov-toggle>
  <aegov-toggle label="Disabled (on)" is-disabled="true" is-checked="true"></aegov-toggle>
</div>

---

## Custom on/off icons

Use the `icon-checked` and `icon-unchecked` slots to embed icons inside the thumb that swap as the toggle changes state. Keep glyphs small and high-contrast — they sit inside a small circular thumb.

```html
<aegov-toggle label="Dark mode" size="lg">
  <svg slot="icon-checked" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
  <svg slot="icon-unchecked" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="5"/>
  </svg>
</aegov-toggle>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-toggle label="Dark mode" size="lg">
    <svg slot="icon-checked" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
    <svg slot="icon-unchecked" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"/>
    </svg>
  </aegov-toggle>
</div>

---

## Form integration

Provide `name` and `value` to participate in standard form submission. When checked, the form payload will include the supplied value under the given name; when unchecked, the field is omitted (matching native checkbox behaviour).

```html
<form>
  <aegov-toggle
    name="marketing_consent"
    value="yes"
    label="I consent to receive service updates by email"
    is-required="true"
  ></aegov-toggle>
</form>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-toggle
    name="marketing_consent"
    value="yes"
    label="I consent to receive service updates by email"
    is-required="true"
  ></aegov-toggle>
</div>

---

## Notification preferences example

A typical UAE Government scenario: a citizen managing notification channels for service updates from a federal portal. Each channel is independent and toggling it takes effect immediately.

```html
<aegov-toggle label="SMS" hint="Status updates sent to your registered UAE mobile." is-checked="true"></aegov-toggle>
<aegov-toggle label="Email" hint="Receipts and renewal reminders." is-checked="true"></aegov-toggle>
<aegov-toggle label="Push notifications" hint="In-app alerts on the official UAE Pass mobile app."></aegov-toggle>
<aegov-toggle label="WhatsApp" hint="High-priority security alerts only." is-disabled="true"></aegov-toggle>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <aegov-toggle label="SMS" hint="Status updates sent to your registered UAE mobile." is-checked="true"></aegov-toggle>
    <aegov-toggle label="Email" hint="Receipts and renewal reminders." is-checked="true"></aegov-toggle>
    <aegov-toggle label="Push notifications" hint="In-app alerts on the official UAE Pass mobile app."></aegov-toggle>
    <aegov-toggle label="WhatsApp" hint="High-priority security alerts only." is-disabled="true"></aegov-toggle>
  </div>
</div>

---

## RTL Support

The toggle is direction-agnostic. When the document or any ancestor is set to `dir="rtl"` the label moves to the inline-end automatically and the thumb travels in the correct direction (right-to-left when checked).

```html
<div dir="rtl">
  <aegov-toggle
    label="تفعيل الإشعارات عبر الرسائل النصية"
    hint="استلام تحديثات الخدمة على رقم هاتفك المتحرك المسجل في دولة الإمارات."
    is-checked="true"
  ></aegov-toggle>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-toggle
    label="تفعيل الإشعارات عبر الرسائل النصية"
    hint="استلام تحديثات الخدمة على رقم هاتفك المتحرك المسجل في دولة الإمارات."
    is-checked="true"
  ></aegov-toggle>
</div>

A full preferences panel in RTL:

```html
<div dir="rtl">
  <aegov-toggle label="رسائل SMS" hint="تحديثات الحالة على رقم هاتفك." is-checked="true"></aegov-toggle>
  <aegov-toggle label="البريد الإلكتروني" hint="إيصالات وتذكيرات التجديد." is-checked="true"></aegov-toggle>
  <aegov-toggle label="إشعارات التطبيق" hint="تنبيهات داخل تطبيق الهوية الرقمية UAE Pass."></aegov-toggle>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <aegov-toggle label="رسائل SMS" hint="تحديثات الحالة على رقم هاتفك." is-checked="true"></aegov-toggle>
    <aegov-toggle label="البريد الإلكتروني" hint="إيصالات وتذكيرات التجديد." is-checked="true"></aegov-toggle>
    <aegov-toggle label="إشعارات التطبيق" hint="تنبيهات داخل تطبيق الهوية الرقمية UAE Pass."></aegov-toggle>
  </div>
</div>

---

## API Reference

### aegov-toggle Properties

| Property      | Attribute      | Description                                                                  | Type      | Default     |
| ------------- | -------------- | ---------------------------------------------------------------------------- | --------- | ----------- |
| `fieldId`     | `field-id`     | DOM `id` for the underlying `<input>`. Auto-generated if omitted.             | `string`  | _generated_ |
| `name`        | `name`         | Form field name used during submission.                                       | `string`  | `undefined` |
| `value`       | `value`        | Form value submitted when the toggle is checked.                              | `string`  | `undefined` |
| `isChecked`   | `is-checked`   | Whether the toggle is on. Reflected to the host attribute.                    | `boolean` | `false`     |
| `size`        | `size`         | Size token (`xs`, `sm`, `base`, `lg`, `xl`) or a responsive string.            | `string`  | `'base'`    |
| `variant`     | `variant`      | Colour family for the ON track. OFF track stays `aeblack-200`. Focus ring stays camel; error stays aered. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `isDisabled`  | `is-disabled`  | Disables the input and removes it from the tab order.                         | `boolean` | `false`     |
| `isRequired`  | `is-required`  | Marks the underlying input as required for form validation.                   | `boolean` | `false`     |
| `label`       | `label`        | Inline label text rendered after the switch.                                  | `string`  | `undefined` |
| `hint`        | `hint`         | Helper hint text shown below the label. Requires `label` to render.           | `string`  | `undefined` |

### Slots

| Slot              | Description                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------ |
| `icon-checked`    | Icon shown inside the thumb when the toggle is on. Keep dimensions ≤ 14×14 px.              |
| `icon-unchecked`  | Icon shown inside the thumb when the toggle is off. Keep dimensions ≤ 14×14 px.             |

### Events

| Event                 | Detail                                  | Description                                                |
| --------------------- | --------------------------------------- | ---------------------------------------------------------- |
| `aegovToggleChange`   | `{ checked: boolean; value?: string }`  | Fires after every state change with the new checked value. |

#### Listening for changes

```html
<aegov-toggle id="sms" label="SMS notifications"></aegov-toggle>

<script>
  document.querySelector('#sms').addEventListener('aegovToggleChange', (e) => {
    console.log('SMS toggle is now', e.detail.checked ? 'on' : 'off');
  });
</script>
```

### Pass-through Attributes

The component forwards the attribute groups below onto the inner `<input>`. Apply them on `<aegov-toggle>` and they will appear on the native input that participates in the focus order and form submission.

| Attribute group | Forwarded to inner `<input>` | Notes                                                            |
| --------------- | ---------------------------- | ---------------------------------------------------------------- |
| `aria-*`        | Yes                          | Use to extend ARIA semantics (e.g. `aria-labelledby`).            |
| `data-*`        | Yes                          | Useful for analytics or test selectors.                           |
| `form`          | Yes                          | Associates the input with a form by `id` when not nested inside it.|
| `tabindex`      | Yes                          | Override default tab order.                                       |
| `autofocus`     | Yes                          | Focus the toggle on initial page load.                            |
| `title`         | Yes                          | Native browser tooltip text.                                      |

---

## Validation

`aegov-toggle` exposes the unified [Validation Surface](validation-overview.html). Toggle-specific notes:

### Common recipes

**Required consent toggle:**

```html
<aegov-toggle name="newsletter" is-required label="I agree to receive emails"></aegov-toggle>
```

**Conditional dependent fields:**

```js
toggle.addEventListener('aegovValidate', (e) => {
  // Show extra fields only when toggle is on
  document.getElementById('details').hidden = !e.detail.value;
});
```

**Server-confirmed toggle (e.g. opt-in pending):**

```js
toggle.setCustomValidity('Confirmation pending — check your email');
```

See [BYO Validator](validation-byo.html) for more patterns.

---

## Accessibility

### Built-in behaviour

- The underlying control is a native `<input type="checkbox">` with `role="switch"` and an explicit `aria-checked` state, so assistive technology announces "switch, on" or "switch, off" rather than "checkbox, checked".
- When `hint` is provided, the input is linked to it via `aria-describedby` so screen readers read the helper text after the label.
- `is-required` sets both the native `required` attribute and `aria-required="true"`.
- The label wraps the switch, so the entire row — label and description included — is clickable and fires the same change event.

### Developer responsibilities

- Always provide a `label` (or an external `<aegov-label>` linked via `field-id`). A bare switch without an accessible name is opaque to screen reader users.
- Use a switch only for settings that take effect immediately. For "save later" choices, use a checkbox.
- Keep on/off icons decorative — the state is already announced via `aria-checked`. Do not encode the only meaning of the toggle in the icon.

### Keyboard support

| Key              | Action                                          |
| ---------------- | ----------------------------------------------- |
| `Space`          | Toggle the switch on or off.                    |
| `Tab`            | Move focus to the next focusable element.       |
| `Shift + Tab`    | Move focus to the previous focusable element.   |
