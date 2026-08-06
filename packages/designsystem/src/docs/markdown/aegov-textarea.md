# Textarea

<p class="text-lg text-aeblack-500 mb-8">A Textarea collects multiple lines of free text — a reason for appeal, a description of a complaint, additional details on an application. It adds three things a single-line input cannot offer: a controllable resize behaviour, automatic height growth, and a live character counter wired into the field's accessible description.</p>

## Introduction

`aegov-textarea` renders a real `<textarea>` and manages the hint, error and counter regions around it. Like every form control in the system it pairs with [`aegov-form-field`](aegov-form-field.html) and [`aegov-label`](aegov-label.html).

```html
<aegov-form-field>
  <aegov-label>Reason for appeal</aegov-label>
  <aegov-textarea name="reason" rows="4" placeholder="Tell us why you are appealing this decision"></aegov-textarea>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-form-field>
      <aegov-label>Reason for appeal</aegov-label>
      <aegov-textarea field-id="ta-intro" name="reason" rows="4" placeholder="Tell us why you are appealing this decision"></aegov-textarea>
    </aegov-form-field>
  </div>
</div>

`rows` is a native attribute passed straight through — use it to set the initial height in lines.

---

## Sizes

`size` controls the font size and internal padding. Five tokens, matching the rest of the form family.

| Token | Use for |
| --- | --- |
| `xs` | Dense admin interfaces. |
| `sm` | Secondary fields, compact forms. |
| `base` | Default. |
| `lg` | Primary path through a public service form. |
| `xl` | Large-type layouts and accessibility-first pages. |

```html
<aegov-textarea size="sm" rows="3" placeholder="Small"></aegov-textarea>
<aegov-textarea size="base" rows="3" placeholder="Base"></aegov-textarea>
<aegov-textarea size="lg" rows="3" placeholder="Large"></aegov-textarea>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-4">
    <aegov-textarea field-id="ta-s-xs" size="xs" rows="2" placeholder="Extra small"></aegov-textarea>
    <aegov-textarea field-id="ta-s-sm" size="sm" rows="2" placeholder="Small"></aegov-textarea>
    <aegov-textarea field-id="ta-s-base" size="base" rows="2" placeholder="Base"></aegov-textarea>
    <aegov-textarea field-id="ta-s-lg" size="lg" rows="2" placeholder="Large"></aegov-textarea>
    <aegov-textarea field-id="ta-s-xl" size="xl" rows="2" placeholder="Extra large"></aegov-textarea>
  </div>
</div>

Height comes from `rows`, not from `size` — the two are independent, so a `lg` textarea with `rows="2"` is short with large text.

### Responsive sizes

`size` accepts a responsive string with the prefixes `xs`, `sm`, `md`, `lg`, `xl` and `2xl`.

```html
<aegov-textarea size="sm md:base xl:lg" rows="4"></aegov-textarea>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-textarea field-id="ta-s-resp" size="sm md:base xl:lg" rows="3" placeholder="Type scales with the viewport"></aegov-textarea>
  </div>
</div>

---

## Resize behaviour

`resize` decides whether and how the user can change the field's size.

| Value | Behaviour |
| --- | --- |
| `vertical` | Default. The user can drag the height only. |
| `none` | Fixed size. No drag handle. |
| `horizontal` | Width only. Rarely appropriate — it usually breaks the form layout. |
| `both` | Free resize in both directions. |
| `auto` | No drag handle; the field grows to fit its content as the user types. |

```html
<aegov-textarea resize="vertical" rows="3" placeholder="Drag the bottom edge"></aegov-textarea>
<aegov-textarea resize="none" rows="3" placeholder="Fixed size"></aegov-textarea>
<aegov-textarea resize="auto" rows="2" placeholder="Grows as you type"></aegov-textarea>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-6">
    <div>
      <p class="text-sm text-aeblack-500 mb-2">vertical (default) — drag the bottom edge</p>
      <aegov-textarea field-id="ta-r-v" resize="vertical" rows="3"></aegov-textarea>
    </div>
    <div>
      <p class="text-sm text-aeblack-500 mb-2">none — fixed</p>
      <aegov-textarea field-id="ta-r-n" resize="none" rows="3"></aegov-textarea>
    </div>
    <div>
      <p class="text-sm text-aeblack-500 mb-2">auto — grows as you type</p>
      <aegov-textarea field-id="ta-r-a" resize="auto" rows="2" placeholder="Type several lines here"></aegov-textarea>
    </div>
  </div>
</div>

`resize="auto"` sets the element's height to its own scroll height on every input, so the field never shows an internal scrollbar. It is the friendliest option for long-form answers, at the cost of the page reflowing as the user types. Prefer `vertical` — the default — when the field sits above other content the user is referring to.

Avoid `none` unless the layout genuinely cannot tolerate growth. Removing the drag handle takes away a control that people with low vision use to see more of their own text at once.

---

## Character counter

Setting `maxlength` does two things: it enforces the limit natively, and it renders a live counter below the field. The counter's ID is added to the textarea's `aria-describedby`, so screen reader users hear the limit as part of the field description rather than never learning about it.

```html
<aegov-textarea
  name="reason"
  rows="4"
  maxlength="500"
  hint="Describe your reason for appealing this decision"
></aegov-textarea>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-6">
    <aegov-textarea field-id="ta-c-1" name="reason" rows="4" maxlength="500" hint="Describe your reason for appealing this decision"></aegov-textarea>
    <aegov-textarea field-id="ta-c-2" name="short" rows="2" maxlength="40" value="This value is close to the limit."></aegov-textarea>
  </div>
</div>

The counter takes a distinct over-limit style when the count exceeds the maximum, which can happen when a value is set programmatically or pre-filled from a server — native `maxlength` only blocks typing, it does not truncate an assigned value. Validate on submit rather than assuming the limit held.

---

## States

### Disabled and read-only

Disabled fields are not submitted with the form. Read-only fields are — the value is just not editable.

```html
<aegov-textarea is-disabled rows="3" value="This field is locked."></aegov-textarea>
<aegov-textarea is-readonly rows="3" value="Submitted 14 March 2026. This response cannot be edited."></aegov-textarea>
```

### Required

```html
<aegov-textarea is-required rows="3"></aegov-textarea>
```

### Invalid

```html
<aegov-textarea
  rows="3"
  is-invalid
  error-message="Tell us why you are appealing, in at least 20 characters"
></aegov-textarea>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-4">
    <aegov-textarea field-id="ta-st-d" is-disabled rows="2" value="This field is locked."></aegov-textarea>
    <aegov-textarea field-id="ta-st-r" is-readonly rows="2" value="Submitted 14 March 2026. This response cannot be edited."></aegov-textarea>
    <aegov-textarea field-id="ta-st-inv" rows="2" is-invalid error-message="Tell us why you are appealing, in at least 20 characters" value="Too short"></aegov-textarea>
  </div>
</div>

---

## Copy to clipboard

`is-copyable` adds a copy button, and applies only when the field is also `is-readonly` — the pattern is for surfacing a generated block of text, not for copying a draft mid-edit.

```html
<aegov-textarea
  is-readonly
  is-copyable
  rows="4"
  value="Application APP-2026-0041827 received on 14 March 2026. Decision expected within 5 working days."
></aegov-textarea>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-textarea field-id="ta-copy" is-readonly is-copyable rows="4" value="Application APP-2026-0041827 received on 14 March 2026. Decision expected within 5 working days."></aegov-textarea>
  </div>
</div>

---

## Variant

`variant` selects the colour family for the idle ring and value text. As with every form control, the **focus ring stays camel** and the **error state stays aered** regardless of variant, so those two signals never become ambiguous.

```html
<aegov-textarea variant="primary" rows="2"></aegov-textarea>
<aegov-textarea variant="secondary" rows="2"></aegov-textarea>
<aegov-textarea variant="neutral-max" rows="2"></aegov-textarea>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-4">
    <aegov-textarea field-id="ta-v-p" variant="primary" rows="2" value="Primary"></aegov-textarea>
    <aegov-textarea field-id="ta-v-s" variant="secondary" rows="2" value="Secondary"></aegov-textarea>
    <aegov-textarea field-id="ta-v-nx" variant="neutral-max" rows="2" value="Neutral max"></aegov-textarea>
  </div>
</div>

`variant` also cascades from [`aegov-form-field`](aegov-form-field.html).

---

## Composite example — appeal form

```html
<form id="appeal" novalidate>
  <aegov-form-field>
    <aegov-label>Reference number</aegov-label>
    <aegov-input name="reference" is-readonly is-copyable value="APP-2026-0041827"></aegov-input>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>Reason for appeal</aegov-label>
    <aegov-textarea
      name="reason"
      rows="5"
      maxlength="1000"
      minlength="20"
      is-required
      resize="auto"
      hint="Explain what you believe was decided incorrectly, and why"
    ></aegov-textarea>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>Anything else we should know?</aegov-label>
    <aegov-textarea name="notes" rows="3" maxlength="300" resize="vertical"></aegov-textarea>
  </aegov-form-field>

  <aegov-button type="submit" variant="primary" size="lg">Submit appeal</aegov-button>
</form>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <aegov-form-field>
      <aegov-label>Reference number</aegov-label>
      <aegov-input field-id="ta-cx-ref" name="reference" is-readonly is-copyable value="APP-2026-0041827"></aegov-input>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>Reason for appeal</aegov-label>
      <aegov-textarea field-id="ta-cx-reason" name="reason" rows="5" maxlength="1000" minlength="20" is-required resize="auto" hint="Explain what you believe was decided incorrectly, and why"></aegov-textarea>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>Anything else we should know?</aegov-label>
      <aegov-textarea field-id="ta-cx-notes" name="notes" rows="3" maxlength="300" resize="vertical"></aegov-textarea>
    </aegov-form-field>
    <aegov-button type="submit" variant="primary" size="lg">Submit appeal</aegov-button>
  </div>
</div>

`minlength` is a pass-through native attribute, so it feeds the `tooShort` validity flag without any code of yours.

---

## Listening for value events

| Event | Fires |
| --- | --- |
| `aegovTextareaInput` | On every keystroke. |
| `aegovTextareaChange` | When the value is committed (native `change`). |

```html
<aegov-textarea id="reason" name="reason" maxlength="500"></aegov-textarea>

<script type="module">
  const textarea = document.querySelector('#reason');

  textarea.addEventListener('aegovTextareaInput', (e) => {
    saveDraft(e.detail.value);          // autosave as they type
  });

  textarea.addEventListener('aegovTextareaChange', (e) => {
    commitAnswer(e.detail.value);
  });
</script>
```

Note the naming: the keystroke event here is `aegovTextareaInput`, whereas the equivalent on [`aegov-input`](aegov-input.html) is `aegovInputValue`. Check the event table when moving code between the two.

---

## RTL Support

The textarea is fully direction-aware. In a `dir="rtl"` container the text aligns right, the resize handle moves to the inline-start corner, and the character counter and hint or error regions align with the text. The copy button moves to the inline-end edge, and both its `aria-label` and its "Copied" live-region announcement are translated automatically.

```html
<div dir="rtl">
  <aegov-form-field>
    <aegov-label>سبب الاستئناف</aegov-label>
    <aegov-textarea
      name="reason"
      rows="4"
      maxlength="500"
      is-required
      hint="اشرح ما تعتقد أنه تم تقييمه بشكل غير صحيح، ولماذا"
    ></aegov-textarea>
  </aegov-form-field>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <aegov-form-field>
      <aegov-label>سبب الاستئناف</aegov-label>
      <aegov-textarea field-id="ta-rtl-1" name="reason" rows="4" maxlength="500" is-required hint="اشرح ما تعتقد أنه تم تقييمه بشكل غير صحيح، ولماذا"></aegov-textarea>
    </aegov-form-field>
    <aegov-textarea field-id="ta-rtl-2" is-readonly is-copyable rows="3" value="تم استلام الطلب APP-2026-0041827 بتاريخ ١٤ مارس ٢٠٢٦."></aegov-textarea>
  </div>
</div>

For mixed-direction content — a field where users may paste English text into an Arabic form — consider `dir="auto"` on the individual textarea so the browser picks the direction from the first strong character:

```html
<aegov-textarea dir="auto" name="notes" rows="3"></aegov-textarea>
```

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the inner `<textarea>`. Auto-generated when omitted, reflected to the host. | `string` | _generated_ |
| `size` | `size` | Size token or responsive string. Controls font size and padding, not height. | `string` — `xs \| sm \| base \| lg \| xl` | `'base'` |
| `variant` | `variant` | Colour family for the idle ring and value text. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `resize` | `resize` | Resize behaviour. `auto` grows the field to fit its content. | `'none' \| 'vertical' \| 'horizontal' \| 'both' \| 'auto'` | `'vertical'` |
| `maxlength` | `maxlength` | Maximum character count. **Renders a live counter when set.** | `number` | — |
| `value` | `value` | Current value. Mutable. | `string` | `''` |
| `name` | `name` | Form field name, used by `FormData`. | `string` | — |
| `placeholder` | `placeholder` | Placeholder text. Not a substitute for a label. | `string` | — |
| `isDisabled` | `is-disabled` | Disables the field. Not submitted. | `boolean` | `false` |
| `isReadonly` | `is-readonly` | Not editable, but still submitted. | `boolean` | `false` |
| `isRequired` | `is-required` | Sets the native `required` attribute. | `boolean` | `false` |
| `isCopyable` | `is-copyable` | Adds a copy button. Only applies when `is-readonly`. | `boolean` | `false` |
| `isInvalid` | `is-invalid` | Invalid state. Reflected to the host. | `boolean` | `false` |
| `errorMessage` | `error-message` | Error text shown while invalid. | `string` | `''` |
| `hint` | `hint` | Helper text shown when no error is showing. | `string` | `''` |
| `extraClass` | `extra-class` | Extra classes appended to the inner `<textarea>`. | `string` | — |

Note `maxlength` is a real property here — unlike on [`aegov-input`](aegov-input.html), where it is a pass-through attribute — because it also drives the counter.

### Slots

| Slot | Description |
| --- | --- |
| `hint` | Rich hint markup. Takes precedence over the `hint` property. |
| `error` | Rich error markup. Takes precedence over `error-message`. Rendered only while `is-invalid`. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovTextareaInput` | `{ value: string; event: Event }` | Every keystroke. |
| `aegovTextareaChange` | `{ value: string; event: Event }` | Value committed (native `change`). |
| `aegovTextareaFocus` | `FocusEvent` | Field gained focus. |
| `aegovTextareaBlur` | `FocusEvent` | Field lost focus. |
| `aegovValidate` | `AegovValidationDetail<string>` | Unified validation event — see [Validation Surface](validation-overview.html). |

### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `validate(trigger?)` | `Promise<AegovValidationResult>` | Re-reads native validity, emits `aegovValidate`, returns the result. |
| `setCustomValidity(message)` | `Promise<void>` | Sets `error-message` and `is-invalid`, and mirrors onto the native textarea. Empty string clears. |

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `rows`, `cols`, `wrap` | Yes | Native sizing and wrapping. `rows` is how you set the initial height. |
| `minlength` | Yes | Feeds the `tooShort` validity flag. |
| `autocomplete`, `autofocus`, `spellcheck`, `enterkeyhint` | Yes | Native behaviour and mobile keyboard hints. |
| `title`, `tabindex`, `form` | Yes | Forwarded to the inner `<textarea>`. |
| `aria-*` | Yes | Forwarded — **except** `aria-invalid` and `aria-describedby`. |
| `data-*` | Yes | Forwarded to the inner `<textarea>`. |
| `aria-invalid` | **No** | Owned by the component, driven by `is-invalid`. |
| `aria-describedby` | Composed | Your value is preserved; the hint, error and counter IDs are appended. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host. Use `extra-class` to reach the inner `<textarea>`. |
| `dir` | Yes | `dir="auto"` is useful for mixed-direction free text. |

### CSS classes

| Class | Element |
| --- | --- |
| `.aegov-textarea` | The inner `<textarea>`. |
| `.textarea__counter` | The character counter. |
| `.textarea__counter--over` | Added when the count exceeds `maxlength`. |
| `.is-invalid` | Added to the **host** while `is-invalid`. |

---

## Validation

### Surface

`aegov-textarea` implements the shared contract — `is-invalid`, `error-message`, `hint`, the `error` and `hint` slots, `aegovValidate`, and `validate()` / `setCustomValidity()`. Because it wraps a native `<textarea>`, the `validity` in the event is the browser's real `ValidityState`. Value type is `string`. Full reference: [Validation Surface](validation-overview.html).

### Common recipes

Length rules come free from `minlength` and `maxlength` — just supply the copy:

```js
const reason = document.querySelector('#reason');

reason.addEventListener('aegovValidate', (e) => {
  if (e.detail.trigger === 'input') return;

  const v = e.detail.validity;
  reason.isInvalid = !v.valid;
  reason.errorMessage =
    v.valueMissing ? 'Tell us your reason for appealing' :
    v.tooShort     ? 'Give us at least 20 characters so we can assess your appeal' : '';
});
```

A word-count rule, which native constraints cannot express:

```js
reason.addEventListener('aegovValidate', (e) => {
  if (e.detail.trigger === 'input') return;
  const words = String(e.detail.value).trim().split(/\s+/).filter(Boolean).length;
  const ok = words >= 10;
  reason.isInvalid = !ok;
  reason.errorMessage = ok ? '' : `Use at least 10 words — you have written ${words}`;
});
```

More patterns in [Bring Your Own Validator](validation-byo.html).

### Use with `@aegov/designsystem-validation`

The optional companion package drives this surface from a schema. It is **not required**.

```ts
import { createForm } from '@aegov/designsystem-validation';
import { valibotAdapter } from '@aegov/designsystem-validation/adapters/valibot';
import * as v from 'valibot';

createForm(form, v.object({
  reason: v.pipe(v.string(), v.minLength(20, 'Give us at least 20 characters')),
}), valibotAdapter());
```

---

## Accessibility

### Built-in behaviour

- The inner element is a real `<textarea>`, so text editing, selection, spellcheck and form participation come from the platform.
- `aria-invalid="true"` is set while `is-invalid`.
- **`aria-describedby` is composed from up to four sources** — your own value, the hint region, the error region and the character counter — without discarding any of them. This is why the character limit is announced as part of the field description.
- The error region takes `role="alert"` only after the field's first blur, so partial errors are not announced while typing.
- The copy button is a real `<button type="button">` with an `aria-hidden` icon, a translated `aria-label`, and a visually hidden `role="status"` announcement on success.
- The focus ring is a high-contrast camel outline held constant across variants, meeting the 3:1 non-text contrast requirement of WCAG 2.2 SC 1.4.11.

### Developer responsibilities

- **Always provide a visible label** via [`aegov-label`](aegov-label.html) inside [`aegov-form-field`](aegov-form-field.html).
- **State the limit in the hint as well**, when a `maxlength` is short enough to constrain what someone can say. The counter reports progress; the hint sets the expectation before they start.
- **Do not use `resize="none"` by default.** The drag handle is an accessibility affordance for anyone who needs to see more of their own text.
- **Set a generous `rows`.** A two-line box for a paragraph-length answer forces the user to compose inside a scrolling viewport.
- **Never signal an error with colour alone** (WCAG 2.2 SC 1.4.1) — populate `error-message` or the `error` slot.
- **Validate length on submit**, not only via `maxlength`. A programmatically-set or pasted value can exceed the limit.
- **Consider `dir="auto"`** for free-text fields on Arabic pages where users may write in either language.

### Keyboard support

| Key | Action |
| --- | --- |
| `Tab` | Move focus to the textarea, then to the copy button when present. |
| `Shift` + `Tab` | Move focus backwards. |
| `Enter` | Insert a line break. It does **not** submit the form — that is native textarea behaviour. |
| `Enter`, `Space` | Activate the copy button when it has focus. |

Because `Enter` inserts a newline, a form containing only a textarea needs an explicit submit button — there is no implicit submission.

---

## Where to next

- [Input](aegov-input.html) — single-line text, icons, password reveal.
- [Form Field](aegov-form-field.html) and [Label](aegov-label.html) — the wrapper and label.
- [File Upload](aegov-fileupload.html) — when the answer is a document rather than prose.
- [Validation Surface](validation-overview.html) and [Bring Your Own Validator](validation-byo.html).
