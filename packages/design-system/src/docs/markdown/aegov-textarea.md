# Textarea

<p class="text-lg text-aeblack-500 mb-8">A Textarea collects multi-line text — feedback, addresses, complaint descriptions, justifications, or any free-form content that won't fit on a single line. The component wraps a native HTML textarea so spell-check, autofill, and assistive technology continue to work, while layering on design-system sizing, resize controls, character counting, and copy-to-clipboard.</p>

## Introduction

The `aegov-textarea` component renders a real `<textarea>` styled to the design system. Use it directly when you only need the field, or pair it with `aegov-form-field` and `aegov-label` to wire up label, helper text, and error messaging.

```html
<aegov-form-field>
  <aegov-label is-required="true">Describe your enquiry</aegov-label>
  <aegov-textarea
    name="enquiry"
    placeholder="Tell us how we can help..."
    rows="5"
    is-required="true"
  ></aegov-textarea>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label is-required="true">Describe your enquiry</aegov-label>
    <aegov-textarea
      name="enquiry"
      placeholder="Tell us how we can help..."
      rows="5"
      is-required="true"
    ></aegov-textarea>
  </aegov-form-field>
</div>

---

## Rows

Use the native `rows` attribute to set the initial visible height of the textarea. The browser uses this as the default height; users can still resize the field unless `resize="none"`.

```html
<aegov-textarea rows="3" placeholder="Three rows"></aegov-textarea>
<aegov-textarea rows="6" placeholder="Six rows"></aegov-textarea>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-4 max-w-xl">
    <aegov-textarea rows="3" placeholder="Three rows"></aegov-textarea>
    <aegov-textarea rows="6" placeholder="Six rows"></aegov-textarea>
  </div>
</div>

---

## Resize Behaviour

The `resize` property controls whether and how the user can drag the textarea handle. Five values are available: `vertical` (default), `horizontal`, `both`, `none`, and `auto`. The `auto` value disables manual resizing and instead grows the textarea to fit its content as the user types.

```html
<aegov-textarea resize="vertical" placeholder="Default — vertical resize"></aegov-textarea>
<aegov-textarea resize="none" placeholder="No resize handle"></aegov-textarea>
<aegov-textarea resize="auto" placeholder="Grows as you type"></aegov-textarea>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-4 max-w-xl">
    <aegov-textarea resize="vertical" placeholder="Default — drag the bottom-right handle to resize vertically"></aegov-textarea>
    <aegov-textarea resize="none" placeholder="No resize handle — fixed height"></aegov-textarea>
    <aegov-textarea resize="auto" placeholder="Grows as you type"></aegov-textarea>
  </div>
</div>

---

## Sizes

The `size` property scales the font size and padding. Five tokens are available: `xs`, `sm`, `base` (default), `lg`, and `xl`. Match the textarea size to surrounding inputs for visual consistency.

```html
<aegov-textarea size="sm" rows="3" placeholder="Small"></aegov-textarea>
<aegov-textarea size="base" rows="3" placeholder="Base (default)"></aegov-textarea>
<aegov-textarea size="lg" rows="3" placeholder="Large"></aegov-textarea>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-4 max-w-xl">
    <aegov-textarea size="sm" rows="3" placeholder="Small"></aegov-textarea>
    <aegov-textarea size="base" rows="3" placeholder="Base (default)"></aegov-textarea>
    <aegov-textarea size="lg" rows="3" placeholder="Large"></aegov-textarea>
  </div>
</div>

### Responsive sizes

`size` also accepts a Tailwind-style responsive string with the breakpoint prefixes `xs`, `sm`, `md`, `lg`, `xl`, and `2xl`.

```html
<aegov-textarea size="sm md:base xl:lg" rows="4" placeholder="Resizes with the viewport"></aegov-textarea>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-textarea size="sm md:base xl:lg" rows="4" placeholder="Resizes with the viewport"></aegov-textarea>
</div>

---

## Variant

The `variant` property selects the colour family for the idle ring/border, the value text, and the focus accent. The focus ring stays `primary-support-600` (camel) and the error border stays `aered-600` regardless of variant.

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
<aegov-textarea variant="primary" rows="3" placeholder="Primary"></aegov-textarea>
<aegov-textarea variant="secondary" rows="3" placeholder="Secondary"></aegov-textarea>
<aegov-textarea variant="neutral-max" rows="3" placeholder="Neutral-max"></aegov-textarea>
<aegov-textarea variant="neutral-min" rows="3" placeholder="Neutral-min"></aegov-textarea>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <aegov-textarea variant="primary" rows="3" placeholder="Primary"></aegov-textarea>
    <aegov-textarea variant="secondary" rows="3" placeholder="Secondary"></aegov-textarea>
    <aegov-textarea variant="neutral-max" rows="3" placeholder="Neutral-max"></aegov-textarea>
    <aegov-textarea variant="neutral-min" rows="3" placeholder="Neutral-min"></aegov-textarea>
  </div>
</div>

---

## Character Counter

Set `maxlength` to an integer to enable both the native length limit and a live character counter rendered below the field. The counter is announced to assistive technology via `aria-live="polite"` and switches to an over-limit colour when the count exceeds the limit (relevant when the value is set programmatically).

```html
<aegov-form-field>
  <aegov-label is-required="true">Reason for appeal</aegov-label>
  <aegov-textarea
    name="appeal-reason"
    maxlength="500"
    rows="6"
    placeholder="Briefly describe your reason for appealing this decision..."
    is-required="true"
  ></aegov-textarea>
  <span slot="hint">Provide as much detail as possible. Up to 500 characters.</span>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label is-required="true">Reason for appeal</aegov-label>
    <aegov-textarea
      name="appeal-reason"
      maxlength="500"
      rows="6"
      placeholder="Briefly describe your reason for appealing this decision..."
      is-required="true"
    ></aegov-textarea>
    <span slot="hint">Provide as much detail as possible. Up to 500 characters.</span>
  </aegov-form-field>
</div>

---

## States

### Disabled

```html
<aegov-textarea is-disabled="true" rows="3" value="This field is locked while the application is under review."></aegov-textarea>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-textarea is-disabled="true" rows="3" value="This field is locked while the application is under review."></aegov-textarea>
</div>

### Read-only

```html
<aegov-textarea is-readonly="true" rows="4" value="Approved by the Ministry of Interior on 14 February 2026. Reference: APP-2026-008421."></aegov-textarea>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-textarea is-readonly="true" rows="4" value="Approved by the Ministry of Interior on 14 February 2026. Reference: APP-2026-008421."></aegov-textarea>
</div>

### Read-only and copyable

Set `is-copyable="true"` together with `is-readonly="true"` to render a copy button in the top-right of the textarea. Useful for system-generated decisions, official correspondence, or audit logs.

```html
<aegov-textarea
  is-readonly="true"
  is-copyable="true"
  rows="5"
  value="Dear applicant, your residency permit application has been approved. Please collect your card from the Ministry of Interior office in Abu Dhabi within 30 days."
></aegov-textarea>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-textarea
    is-readonly="true"
    is-copyable="true"
    rows="5"
    value="Dear applicant, your residency permit application has been approved. Please collect your card from the Ministry of Interior office in Abu Dhabi within 30 days."
  ></aegov-textarea>
</div>

### Invalid (error state)

Validation styling is owned by the surrounding `aegov-form-field`. Set `is-invalid="true"` on the form field and provide an error message via the `error` slot.

```html
<aegov-form-field is-invalid="true">
  <aegov-label is-required="true">Describe the incident</aegov-label>
  <aegov-textarea rows="4"></aegov-textarea>
  <span slot="error">This field is required to submit the report.</span>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field is-invalid="true">
    <aegov-label is-required="true">Describe the incident</aegov-label>
    <aegov-textarea rows="4"></aegov-textarea>
    <span slot="error">This field is required to submit the report.</span>
  </aegov-form-field>
</div>

---

## Composite Example — Feedback Form

A realistic snippet from a service feedback form combining a labelled, required, character-limited textarea with helper text.

```html
<form class="grid gap-6 max-w-xl">
  <aegov-form-field>
    <aegov-label is-required="true">Your feedback</aegov-label>
    <aegov-textarea
      name="feedback"
      maxlength="1000"
      rows="6"
      resize="vertical"
      placeholder="Tell us about your experience with this service..."
      is-required="true"
    ></aegov-textarea>
    <span slot="hint">Up to 1000 characters. Please avoid sharing personal data such as Emirates ID numbers.</span>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>Additional details (optional)</aegov-label>
    <aegov-textarea
      name="extra"
      rows="4"
      resize="auto"
      placeholder="Anything else you would like us to know?"
    ></aegov-textarea>
  </aegov-form-field>
</form>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <form class="grid gap-6 max-w-xl">
    <aegov-form-field>
      <aegov-label is-required="true">Your feedback</aegov-label>
      <aegov-textarea
        name="feedback"
        maxlength="1000"
        rows="6"
        resize="vertical"
        placeholder="Tell us about your experience with this service..."
        is-required="true"
      ></aegov-textarea>
      <span slot="hint">Up to 1000 characters. Please avoid sharing personal data such as Emirates ID numbers.</span>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>Additional details (optional)</aegov-label>
      <aegov-textarea
        name="extra"
        rows="4"
        resize="auto"
        placeholder="Anything else you would like us to know?"
      ></aegov-textarea>
    </aegov-form-field>
  </form>
</div>

---

## Listening for value events

The component emits four events: `aegovTextareaInput` on every keystroke, `aegovTextareaChange` when the value commits (typically on blur), `aegovTextareaFocus`, and `aegovTextareaBlur`.

```html
<aegov-textarea id="feedback" rows="4"></aegov-textarea>

<script>
  const el = document.getElementById('feedback');
  el.addEventListener('aegovTextareaInput', (e) => {
    console.log('Length now:', e.detail.value.length);
  });
  el.addEventListener('aegovTextareaChange', (e) => {
    console.log('Final value:', e.detail.value);
  });
</script>
```

---

## RTL Support

The textarea uses CSS logical properties throughout. When the document or any ancestor is set to `dir="rtl"`, padding flips, the resize handle moves to the bottom-left, the copy button moves to the top-left, and the character counter aligns to the right end. No additional configuration is needed.

```html
<div dir="rtl">
  <aegov-form-field>
    <aegov-label is-required="true">سبب التظلم</aegov-label>
    <aegov-textarea
      maxlength="500"
      rows="6"
      placeholder="اشرح بإيجاز سبب تقديمك للتظلم على هذا القرار..."
      is-required="true"
    ></aegov-textarea>
    <span slot="hint">يرجى تقديم أكبر قدر ممكن من التفاصيل. حتى 500 حرف.</span>
  </aegov-form-field>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-form-field>
    <aegov-label is-required="true">سبب التظلم</aegov-label>
    <aegov-textarea
      maxlength="500"
      rows="6"
      placeholder="اشرح بإيجاز سبب تقديمك للتظلم على هذا القرار..."
      is-required="true"
    ></aegov-textarea>
    <span slot="hint">يرجى تقديم أكبر قدر ممكن من التفاصيل. حتى 500 حرف.</span>
  </aegov-form-field>
</div>

---

## API Reference

### aegov-textarea Properties

| Property      | Attribute      | Description                                                                                  | Type              | Default       |
| ------------- | -------------- | -------------------------------------------------------------------------------------------- | ----------------- | ------------- |
| `fieldId`     | `field-id`     | DOM `id` for the native `<textarea>`. Auto-generated as `aegov-textarea-{n}` if omitted.       | `string`          | _generated_   |
| `size`        | `size`         | Size token or responsive string (affects font size and padding).                               | `string`          | `'base'`      |
| `variant`     | `variant`      | Colour family for idle ring, value text, and hover accent. Focus ring stays camel; error stays aered. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `value`       | `value`        | Current value. Mutable — synced internally on `input` and `change`.                            | `string`          | `''`          |
| `placeholder` | `placeholder`  | Placeholder text shown when the field is empty.                                                | `string`          | `undefined`   |
| `name`        | `name`         | Native `name` attribute used during form submission.                                            | `string`          | `undefined`   |
| `isDisabled`  | `is-disabled`  | Disable the textarea.                                                                            | `boolean`         | `false`       |
| `isReadonly`  | `is-readonly`  | Mark the textarea as read-only.                                                                  | `boolean`         | `false`       |
| `isRequired`  | `is-required`  | Mark the field as required (sets native `required`).                                              | `boolean`         | `false`       |
| `resize`      | `resize`       | Resize handle behaviour. `auto` grows the field as the user types.                                | `TextareaResize`  | `'vertical'`  |
| `maxlength`   | `maxlength`    | Maximum character count. Setting this enables a live character counter below the field.            | `number`          | `undefined`   |
| `isCopyable`  | `is-copyable`  | Show a copy-to-clipboard button. Only takes effect with `is-readonly="true"`.                       | `boolean`         | `false`       |
| `extraClass`  | `extra-class`  | Additional CSS classes applied to the native `<textarea>`.                                          | `string`          | `undefined`   |

`TextareaResize` accepts: `none`, `vertical`, `horizontal`, `both`, `auto`.

### Slots

The textarea has no named slots. The textarea content is set through the `value` property, not via slot text.

### Events

| Event                  | Detail                              | Description                                                                  |
| ---------------------- | ----------------------------------- | ---------------------------------------------------------------------------- |
| `aegovTextareaInput`   | `{ value: string; event: Event }`   | Fires on every keystroke. Use for live validation and counter updates.        |
| `aegovTextareaChange`  | `{ value: string; event: Event }`   | Fires when the value commits (native `change`, typically on blur).            |
| `aegovTextareaFocus`   | `FocusEvent`                        | Fires when the textarea gains focus.                                           |
| `aegovTextareaBlur`    | `FocusEvent`                        | Fires when the textarea loses focus.                                           |

### Pass-through Attributes

`aria-*` and `data-*` attributes set on `<aegov-textarea>` are always forwarded to the native `<textarea>`. The following standard textarea attributes are also forwarded when set on the host:

| Attribute      | Description                                            |
| -------------- | ------------------------------------------------------ |
| `rows`         | Initial visible height in rows.                         |
| `cols`         | Initial visible width in characters.                    |
| `minlength`    | Minimum character count for native validation.          |
| `wrap`         | Line-wrap behaviour (`soft`, `hard`, `off`).            |
| `autocomplete` | Browser autofill hint (e.g. `street-address`, `off`).    |
| `autofocus`    | Focus the textarea when it mounts.                      |
| `spellcheck`   | Enable or disable spellchecking.                        |
| `enterkeyhint` | Mobile keyboard "Enter" key label.                      |
| `title`        | Native tooltip / validation message.                     |
| `tabindex`     | Custom tab order.                                        |
| `form`         | Associate with a form by id.                             |

> Reserved HTML attributes (`id`, `class`, `style`) cannot be used as props — `id` is replaced by `field-id`, and `class`/`style` are applied to the host as usual.

---

## Validation

`aegov-textarea` exposes the unified [Validation Surface](validation-overview.html). Textarea-specific notes only:

| Prop | Description |
| --- | --- |
| `is-invalid` | Toggles invalid state; sets `aria-invalid="true"` on the inner `<textarea>`. |
| `error-message` | Inline error text below the textarea. Use `error` slot for richer markup. |
| `hint` | Helper text below the textarea when no error is shown. |

### `aria-describedby` chain

When `maxlength` is set, the character counter ID is included automatically. Adding an error region appends its ID alongside the counter:

```text
aria-describedby="textarea-x-counter textarea-x-error"
```

### Common recipes

**Required + max length:**

```html
<aegov-textarea name="bio" is-required maxlength="500"></aegov-textarea>
```

**Custom server-side rejection:**

```js
textarea.setCustomValidity('Contains banned terms');
```

**Profanity filter (BYO):**

```js
textarea.addEventListener('aegovValidate', (e) => {
  const ok = !/(badword1|badword2)/i.test(e.detail.value);
  textarea.isInvalid = !ok;
  textarea.errorMessage = ok ? '' : 'Please remove inappropriate language';
});
```

See [BYO Validator](validation-byo.html) for more patterns.

---

## Accessibility

### Built-in behaviour

- Renders a real `<textarea>` element, preserving native semantics, keyboard handling, autofill, and assistive-technology behaviour.
- `field-id` is auto-generated and reflected to the host so external `<label for>` (or `aegov-label`) can associate reliably.
- `is-required` sets the native `required` attribute, exposing the requirement to assistive tech automatically.
- When `maxlength` is set, the native `maxlength` attribute is applied to the textarea (enforcing the hard limit and allowing AT to announce it in forms mode), and a live character counter is announced via `aria-live="polite"` and linked to the textarea with `aria-describedby`.
- The copy button (`is-copyable`) is keyboard-accessible; `Tab` moves focus to it after the textarea. Its `aria-label` is bilingual — `"Copy to clipboard"` / `"نسخ إلى الحافظة"` and `"Copied"` / `"تم النسخ"` — no developer translation needed.
- When wrapped in `aegov-form-field`, helper and error text are wired up via `aria-describedby` automatically.

### Developer responsibilities

- Always provide a visible label — `aegov-label` inside `aegov-form-field` is the preferred pattern. For unlabelled textareas, set `aria-label` on the host.
- When using `maxlength`, set a sensible limit: too low frustrates users, too high makes the counter meaningless. 500–1000 characters works well for most feedback fields.
- For copyable fields, ensure the value is safe to expose in clipboard history.

### Keyboard support

| Key                   | Action                                                                              |
| --------------------- | ----------------------------------------------------------------------------------- |
| `Tab`                 | Move focus to the textarea; when the copy button is present, one more `Tab` reaches it. |
| `Shift + Tab`         | Move focus to the previous focusable element.                                        |
| `Enter` (on copy btn) | Copy the textarea value to the clipboard.                                            |
| `Enter`               | Insert a new line within the textarea (does not submit the form).                    |
| Standard text editing | All native shortcuts apply — selection, cursor movement, cut/copy/paste.             |
