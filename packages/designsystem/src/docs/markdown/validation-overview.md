# Validation Surface

<p class="text-lg text-aeblack-500 mb-8">Every form component in the AEGOV Design System exposes the same validation surface: three properties, two slots, one event and two methods. That surface is built in and has no dependencies — you can drive it by hand, wire it to your own validation code, or hand it to the optional schema-driven companion package. This page is the single source of truth for the contract; each component page links back here.</p>

## Introduction

The design system deliberately does **not** ship a validation engine. It ships a *surface*: a uniform way to say "this field is invalid, here is why", and a uniform way to be told "the user did something, here is the current value and its validity". What decides whether a value is acceptable is your business logic — a regex, a server call, a schema library, or the browser's own constraint validation.

Thirteen components implement the surface:

`aegov-input`, `aegov-textarea`, `aegov-select`, `aegov-checkbox`, `aegov-checkbox-group`, `aegov-radio`, `aegov-radio-group`, `aegov-toggle`, `aegov-range`, `aegov-otp`, `aegov-fileupload`, `aegov-datepicker`, and the `aegov-form-field` wrapper.

```html
<aegov-input id="email" name="email" type="email" hint="We will send confirmation here"></aegov-input>

<script type="module">
  const input = document.querySelector('#email');

  input.addEventListener('aegovValidate', (e) => {
    if (e.detail.trigger !== 'blur') return;
    const ok = /\S+@\S+\.\S+/.test(e.detail.value);
    input.isInvalid = !ok;
    input.errorMessage = ok ? '' : 'Enter a valid email address';
  });
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-6">
    <aegov-input field-id="vo-demo-ok" name="email" type="email" hint="We will send confirmation here" placeholder="name@example.ae"></aegov-input>
    <aegov-input field-id="vo-demo-bad" name="email2" type="email" is-invalid="true" error-message="Enter a valid email address" value="not-an-email"></aegov-input>
  </div>
</div>

That is the whole contract. No framework, no library, no schema.

---

## Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `isInvalid` | `is-invalid` | Toggles the visual invalid state. Sets `aria-invalid="true"` on the inner control and adds the `is-invalid` class to the host element. | `boolean` | `false` |
| `errorMessage` | `error-message` | Inline error text rendered below the control while `is-invalid` is true. The `error` slot takes precedence when populated. | `string` | `''` |
| `hint` | `hint` | Helper text rendered below the control whenever no error is showing. The `hint` slot takes precedence when populated. | `string` | `''` |

Error and hint are mutually exclusive in the rendered output: while the component is invalid the error replaces the hint, and the hint returns when validity is restored. You do not need to clear the hint yourself.

---

## Slots

| Slot | Description |
| --- | --- |
| `error` | Custom error markup — icons, links, multi-line content. Rendered only while `is-invalid` is true. |
| `hint` | Custom hint markup. Rendered only when no error is showing. |

```html
<aegov-input field-id="username" name="username" is-invalid>
  <span slot="error">
    That username is taken. <a href="/help/usernames">Choose another</a>.
  </span>
</aegov-input>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-input field-id="vo-slot-error" name="username" is-invalid="true" value="ahmed">
      <span slot="error">That username is taken. <a href="#">Choose another</a>.</span>
    </aegov-input>
  </div>
</div>

When the `error` slot has content, `error-message` is ignored. The same applies to `hint` and the `hint` slot.

---

## The `aegovValidate` event

Fired on every interaction trigger, and by imperative `validate()` calls. This is how you learn that something happened and what the current value is.

```ts
event.detail: {
  name: string | null;                  // from the `name` attribute, null if unnamed
  value: T;                             // typed per component — see Value types below
  validity: AegovValidityState;         // native ValidityState shape; synthesized for custom controls
  validationMessage: string;            // human-readable message, '' when valid
  customError: string | null;           // message set via setCustomValidity(), else null
  trigger: 'input' | 'change' | 'blur' | 'submit' | 'manual';
}
```

### Triggers

| Trigger | Fired when |
| --- | --- |
| `input` | The value changes during typing, keystroke by keystroke. |
| `change` | The value is committed — a selection made, a checkbox toggled, a file chosen. |
| `blur` | The control loses focus. This is the point most validation should run. |
| `submit` | Full-form validation is running as part of a submit. |
| `manual` | Your code called `validate()`. |

Gate on the trigger rather than validating on every event. Validating while someone is still typing their email address tells them they are wrong before they have finished being right:

```js
input.addEventListener('aegovValidate', (e) => {
  if (e.detail.trigger === 'input') return;   // let them finish
  applyMyRules(e.detail);
});
```

### Validity flags

`detail.validity` mirrors the native [`ValidityState`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) shape. Components wrapping a native control report the browser's real flags; custom controls synthesize the equivalent, so the shape is identical either way.

| Flag | Meaning |
| --- | --- |
| `valueMissing` | Required, and empty. |
| `typeMismatch` | Wrong shape for the declared `type` — e.g. an email without `@`; on `aegov-fileupload`, a file whose type is not in `accept`. |
| `patternMismatch` | Fails the declared `pattern` — including the OTP pattern. |
| `tooLong` / `tooShort` | Outside the length bounds. On `aegov-fileupload`, `tooLong` reports a file exceeding `max-file-size`. |
| `rangeOverflow` / `rangeUnderflow` | Outside `min` / `max` — numeric inputs, range, datepicker. |
| `stepMismatch` | Not on a valid step increment. |
| `badInput` | The control cannot convert what the user entered into a value. |
| `customError` | A message was set via `setCustomValidity()`. |
| `valid` | `true` only when every other flag is false. Derived, never set directly. |

---

## Methods

| Method | Returns | Description |
| --- | --- | --- |
| `validate(trigger?)` | `Promise<AegovValidationResult>` | Re-runs validation now and emits `aegovValidate`. `trigger` defaults to `'manual'`. |
| `setCustomValidity(message)` | `Promise<void>` | Mirrors the native API. A non-empty message marks the control invalid and sets `error-message`; an empty string clears both. |

```ts
const result = await input.validate('submit');
// result: { valid: boolean; message?: string; validity?: AegovValidityState }

if (!result.valid) input.focus();
```

`setCustomValidity()` is the right tool for errors that come from outside the browser — a server rejection, a cross-field rule, a business constraint:

```js
const res = await api.checkEmiratesId(value);
await field.setCustomValidity(res.ok ? '' : res.reason);
```

---

## Form integration

All thirteen components participate in native `<form>` submission. `form.checkValidity()`, `form.reportValidity()`, the `:invalid` pseudo-class and `new FormData(form)` all behave as they would with native controls.

| Component | Mechanism |
| --- | --- |
| `aegov-input`, `aegov-textarea`, `aegov-checkbox`, `aegov-radio`, `aegov-toggle`, `aegov-range`, `aegov-select` (default appearance) | Inner native form control carrying the `name`. |
| `aegov-otp`, `aegov-fileupload`, `aegov-select` (listbox appearance), `aegov-datepicker` | Form-associated custom elements using `ElementInternals.setFormValue()`. |
| `aegov-checkbox-group`, `aegov-radio-group` | Pure aggregators — each child submits through its own native input. The group emits an aggregate `aegovValidate` but holds no form value of its own. |

The form-associated components are the reason Safari 16.4 is the support floor — `ElementInternals` is not available earlier.

### Value types

`detail.value` and the FormData payload differ per component. Both are listed here because they are not always the same shape.

| Component | JS value type | FormData payload |
| --- | --- | --- |
| `aegov-input`, `aegov-textarea`, `aegov-otp` | `string` | string |
| `aegov-checkbox`, `aegov-toggle` | `boolean` | `'on'` when checked, absent when not |
| `aegov-radio` | `string` (own value when checked) | own value when checked |
| `aegov-select` (single) | `string` | string |
| `aegov-select` (multiple) | `string[]` | one entry per selected value, all under `name` |
| `aegov-range` (single) | `number` | numeric string |
| `aegov-range` (range mode) | `{ low, high }` | `name-low` and `name-high` |
| `aegov-datepicker` (single) | `string` — ISO 8601 | ISO string |
| `aegov-datepicker` (range) | `{ start, end }` | `name-start` and `name-end` |
| `aegov-fileupload` | `File[]` | one entry per file, all under `name` |
| `aegov-checkbox-group` | `string[]` | each child submits individually |
| `aegov-radio-group` | `string \| undefined` | `name=value` of the selected child |

```js
const form = document.querySelector('#application');
const data = new FormData(form);

data.get('emiratesId');        // '784-1990-1234567-1'
data.getAll('documents');      // [File, File]
data.get('appointment-start'); // '2026-09-01'
```

---

## Accessibility built in

The components handle the ARIA wiring. You do not need to add any of this yourself:

- **`aria-invalid`** is set on the inner control whenever `is-invalid` is true, and removed when it is not.
- **`aria-describedby` is composed, not overwritten.** The component chains its own hint and error region IDs onto whatever IDs you supplied, plus any internal ones such as the textarea character counter. Your value is preserved.
- **The error region is announced once, at the right time.** The error region gains `role="alert"` only after the field's first blur — which carries live-region semantics, so the message is announced when it appears. Without that gate, a screen reader would announce a partial error on every keystroke as the user types. The gate lifts on first focus loss, or immediately on submit. No explicit `aria-live` is set: `role="alert"` already implies an assertive live region, and overriding it with `aria-live="polite"` produces inconsistent behaviour across screen readers.
- **The `is-invalid` class** is added to the host element so you can hook your own styling to invalid state without watching the property.

### Developer responsibilities

- **Write messages that say what to do**, not what went wrong. "Enter a date in the future" beats "Invalid date".
- **Do not rely on colour alone.** The error text is the accessible signal; the red border is decoration. This is why `error-message` (or the `error` slot) should always be populated when you set `is-invalid`.
- **Move focus to the first invalid field on failed submit.** The components do not steal focus for you.
- **Give every control a `name`** if you intend to read the form with `FormData`, and a label via `aegov-label` or the component's own `label` property.
- **Announce form-level failures separately.** A single field error is announced by the field; "3 problems with your application" belongs in an `aegov-callout` inside a live region at the top of the form.

---

## The `aegov-form-field` cascade

`aegov-form-field` can carry `is-invalid`, `error-message` and `hint` on behalf of the control it wraps. The values cascade down to the first form-control descendant — but only where that child has not set its own value. Author intent on the child always wins.

```html
<aegov-form-field is-invalid error-message="Enter your Emirates ID to continue">
  <aegov-label>Emirates ID</aegov-label>
  <aegov-input name="emiratesId"></aegov-input>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-form-field is-invalid="true" error-message="Enter your Emirates ID to continue">
      <aegov-label>Emirates ID</aegov-label>
      <aegov-input field-id="vo-ff-eid" name="emiratesId"></aegov-input>
    </aegov-form-field>
  </div>
</div>

The wrapper also adds `is-invalid` to its own `.aegov-form-field` element, so label and control can be styled together.

Use the cascade when the wrapper is the natural owner of the message — typically because your form code already tracks state per field rather than per component. Set the properties directly on the control when the control is the owner.

---

## Whole-form validation on submit

The pattern that covers most services: validate every control on submit, stop the submission if anything fails, focus the first offender.

```html
<form id="application" novalidate>
  <aegov-input name="fullName" is-required></aegov-input>
  <aegov-input name="email" type="email" is-required></aegov-input>
  <aegov-datepicker name="appointment" is-required></aegov-datepicker>
  <aegov-button type="submit" variant="primary">Submit</aegov-button>
</form>

<script type="module">
  const form = document.querySelector('#application');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const controls = form.querySelectorAll(
      'aegov-input, aegov-textarea, aegov-select, aegov-checkbox, aegov-checkbox-group, ' +
      'aegov-radio-group, aegov-toggle, aegov-range, aegov-otp, aegov-fileupload, aegov-datepicker'
    );

    const results = await Promise.all([...controls].map((c) => c.validate('submit')));
    const firstBad = [...controls].find((_, i) => !results[i].valid);

    if (firstBad) {
      firstBad.focus();
      return;
    }

    await api.submit(Object.fromEntries(new FormData(form)));
  });
</script>
```

`novalidate` on the form suppresses the browser's own error bubbles so your inline messages are the only ones shown. Constraint validation still runs — you are only turning off the native UI.

---

## Optional — schema-driven validation

Everything above works with no dependencies. If you would rather declare rules once as a schema than wire events per field, there is an **optional** companion package, `@aegov/designsystem-validation`. It is not required, the design system does not depend on it, and nothing in this page changes if you never install it.

What it does: listens for `aegovValidate` at the form root, runs your schema, and writes `is-invalid` and `error-message` back onto each component — exactly the surface documented above, driven for you.

```bash
npm install @aegov/designsystem-validation valibot
```

```html
<form id="login">
  <aegov-input name="email" type="email"></aegov-input>
  <aegov-input name="password" type="password" is-revealable></aegov-input>
  <aegov-button type="submit" variant="primary">Sign in</aegov-button>
</form>

<script type="module">
  import { createForm } from '@aegov/designsystem-validation';
  import { valibotAdapter } from '@aegov/designsystem-validation/adapters/valibot';
  import * as v from 'valibot';

  const schema = v.object({
    email: v.pipe(v.string(), v.email('Enter a valid email address')),
    password: v.pipe(v.string(), v.minLength(8, 'At least 8 characters')),
  });

  createForm(document.querySelector('#login'), schema, valibotAdapter(), {
    mode: 'onBlur',
    onValidSubmit: (values) => api.login(values),
  });
</script>
```

### Options

| Option | Default | Description |
| --- | --- | --- |
| `mode` | `'onBlur'` | When to validate a field first: `'onChange'`, `'onInput'`, `'onBlur'` or `'onSubmit'`. |
| `reValidateMode` | `'onChange'` | When to re-validate a field that has already errored. |
| `debounce` | `200` | Per-field debounce in milliseconds. |
| `onValidSubmit` | — | Called with typed values when full-form validation passes. |
| `messageResolver` | — | Maps an issue to a message — the hook for translated copy. |
| `scrollToError` | `true` | Focus the first invalid control on failed submit. |
| `hydrateProps` | `false` | Write `is-required`, `minlength`, `maxlength`, `pattern`, `min`, `max` onto components from the schema. Author-supplied attributes always win. |
| `dependencies` | — | Explicit cross-field dependency map, so changing one field re-validates another. |
| `onErrorsChange` | — | Called with the full errors map whenever it changes. |

`createForm` returns a `FormApi`: `validate()`, `validateField(path)`, `getValues()`, `setValue(path, value)`, `setValues(values)`, `reset()` and `destroy()`.

### Adapters

Four adapters ship as separate subpath imports, so you bundle only the one you use. Peer dependencies are optional — install just your engine.

```ts
import { valibotAdapter } from '@aegov/designsystem-validation/adapters/valibot';
import { zodAdapter } from '@aegov/designsystem-validation/adapters/zod';
import { vestAdapter } from '@aegov/designsystem-validation/adapters/vest';
import { nativeAdapter } from '@aegov/designsystem-validation/adapters/native';
```

Bringing your own is a three-method interface:

```ts
interface ValidatorAdapter<Schema = unknown> {
  validate(schema, value, context?): Promise<AdapterResult> | AdapterResult;
  validateField(schema, path, value, context?): Promise<AdapterResult> | AdapterResult;
  parseSchema?(schema): FieldDescriptor[];   // optional — enables hydrateProps and the dependency graph
}
```

### Submission behaviour

| Consumer | Behaviour on a valid submit |
| --- | --- |
| `createForm` without `onValidSubmit` | The native submit is re-dispatched, so `<form action="…">` keeps working. Progressive enhancement by default. |
| `createForm` with `onValidSubmit` | The callback runs; the native submit is suppressed. |
| React / Vue helpers | `handleSubmit(onValid)` is required and the callback runs. |
| Angular directive | `(submitValid)` emits. |

### Framework helpers

```ts
import { useAegovForm } from '@aegov/designsystem-validation/react';
import { useAegovForm } from '@aegov/designsystem-validation/vue';
import { AegovFormDirective } from '@aegov/designsystem-validation/angular';
```

Per-framework examples live in [Using with React](using-with-react.html), [Using with Vue](using-with-vue.html) and [Using with Angular](using-with-angular.html).

### Translated messages

English and Arabic message bundles ship with the package. Map adapter issue codes to your bundle through `messageResolver`:

```ts
import ar from '@aegov/designsystem-validation/i18n/ar';

createForm(form, schema, adapter, {
  messageResolver: (issue) => {
    const entry = ar[issue.code ?? 'invalid'];
    return typeof entry === 'function' ? entry(issue.params ?? {}) : (entry ?? issue.message);
  },
});
```

The native adapter deliberately never reads `el.validationMessage`, because the browser localises that string and you would lose control of the copy.

### Requirements

Each control needs a `name` attribute — the orchestrator keys its registry by `name` and matches it to the schema path. Controls without a `name` are ignored.

---

## Where to next

- [Bring Your Own Validator](validation-byo.html) — manual recipes with no extra package: per-field rules, cross-field rules, async server checks, i18n.
- Per-component pages — each form component's own **Validation** section covers the value type and the rules that make sense for that control.
- [Input](aegov-input.html), [Select](aegov-select.html), [Datepicker](aegov-datepicker.html), [File Upload](aegov-fileupload.html) — the components with the most validation surface area.
