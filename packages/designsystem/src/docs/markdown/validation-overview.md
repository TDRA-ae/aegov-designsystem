# Validation Surface (Layer 1)

All form components in `@aegov/designsystem` expose a uniform validation surface — a set of props, slots, events, and methods you can use to display invalid state, render error messages, and respond to user input. This page is the single source of truth for the surface; per-component docs link back here.

The validation surface is intentionally **engine-agnostic**. Drive it manually, plug in your own predicate, or use the optional `@aegov/designsystem-validation` add-on package — see "Use a Validation Engine" at the bottom.

---

## What you get on every form component

Every form component (`aegov-input`, `aegov-textarea`, `aegov-select`, `aegov-checkbox`, `aegov-checkbox-group`, `aegov-radio`, `aegov-radio-group`, `aegov-toggle`, `aegov-range`, `aegov-otp`, `aegov-fileupload`, `aegov-datepicker`, `aegov-form-field`) ships with this surface.

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `is-invalid` | `boolean` | `false` | Toggles the visual invalid state. Sets `aria-invalid="true"` on the inner control and adds `is-invalid` to the host element. |
| `error-message` | `string` | `""` | Inline error message rendered below the control when `is-invalid` is true. The `error` slot takes precedence if provided. |
| `hint` | `string` | `""` | Helper hint rendered below the control when no error is shown. The `hint` slot takes precedence if provided. |

### Slots

| Slot | Use |
| --- | --- |
| `error` | Custom error markup (icons, links, multi-line content). Only rendered when `is-invalid` is true. |
| `hint` | Custom hint markup. Only rendered when no error is shown. |

### Event

`aegovValidate` fires on every interaction trigger and from imperative `validate()` calls.

```ts
event.detail: {
  name: string | null;        // from `name` attribute
  value: T;                   // typed per component (see Value Types below)
  validity: ValidityState;    // standard ValidityState shape — synthesized for custom controls
  validationMessage: string;
  customError: string | null;
  trigger: 'input' | 'change' | 'blur' | 'submit' | 'manual';
}
```

### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `validate(trigger?)` | `Promise<{ valid, message?, validity? }>` | Imperatively re-runs validation. Emits `aegovValidate`. |
| `setCustomValidity(message)` | `Promise<void>` | Mirrors native API. Non-empty message marks invalid + sets `error-message`. Empty string clears. |

### Accessibility

- `aria-invalid` set on the inner control automatically when `is-invalid` is true.
- `aria-describedby` is composed: it preserves any author-supplied IDs and appends the error/hint region IDs without clobbering.
- The error region's `role="alert"` and `aria-live="polite"` are gated by first blur — preventing assistive-tech spam during typing. They activate on first focus loss or on submit.

---

## Minimal example — manual validation

```html
<aegov-input id="email" name="email" type="email"></aegov-input>

<script type="module">
  const input = document.querySelector('#email');
  input.addEventListener('aegovValidate', (e) => {
    const ok = /\S+@\S+\.\S+/.test(e.detail.value);
    input.isInvalid = !ok && e.detail.trigger === 'blur';
    input.errorMessage = ok ? '' : 'Enter a valid email';
  });
</script>
```

That's the entire contract. No framework, no library, no schema — just three properties, one event, one method.

---

## Slot example — rich error markup

```html
<aegov-input id="user" name="user" is-invalid="true">
  <span slot="error">
    Username taken. <a href="/help">Get help</a>.
  </span>
</aegov-input>
```

The `error` slot is rendered whenever `is-invalid` is true. The `error-message` prop is ignored if the slot is populated.

---

## Form integration

Form components participate in native `<form>` submission:

| Component | Mechanism |
| --- | --- |
| `aegov-input`, `aegov-textarea`, `aegov-checkbox`, `aegov-radio`, `aegov-toggle`, `aegov-range`, `aegov-select` (native variant) | Inner native form control with `name` attribute |
| `aegov-otp`, `aegov-fileupload`, `aegov-select` (listbox variant), `aegov-datepicker` | `ElementInternals.setFormValue()` (FormAssociated custom element) |
| `aegov-checkbox-group`, `aegov-radio-group` | Pure aggregator — children submit individually via their own native inputs |

`<form>.checkValidity()` and `:invalid` pseudo-class work as expected for all variants.

### Value types per component

| Component | JS value type | FormData payload |
| --- | --- | --- |
| `aegov-input`, `aegov-textarea`, `aegov-otp` | `string` | string |
| `aegov-checkbox`, `aegov-toggle` | `boolean` | `'on'` if checked |
| `aegov-radio` | `string` (own value if checked) | own value if checked |
| `aegov-range` (single) | `number` | numeric string |
| `aegov-range` (range mode) | `{ low, high }` | `name-low`, `name-high` |
| `aegov-select` (single) | `string` | string |
| `aegov-select` (multiple) | `string[]` | per-value FormData entries |
| `aegov-datepicker` (single) | `string` (ISO 8601) | ISO string |
| `aegov-datepicker` (range) | `{ start, end }` | `name-start`, `name-end` |
| `aegov-fileupload` | `File[]` | per-file FormData entries |
| `aegov-checkbox-group` | `string[]` | each child submits individually |
| `aegov-radio-group` | `string \| undefined` | name=value of selected child |

---

## `aegov-form-field` cascade

Wrap any form component in `<aegov-form-field>` and the wrapper-level `is-invalid` / `error-message` / `hint` props cascade to the first form-control descendant — but only if the child has not set its own value. Author intent always wins.

```html
<aegov-form-field is-invalid="true" error-message="Required field">
  <aegov-label>Email</aegov-label>
  <aegov-input name="email" type="email"></aegov-input>
</aegov-form-field>
```

---

## Use a validation engine

If you want schema-driven validation (Valibot, Zod, Vest, native), reach for `@aegov/designsystem-validation`. It listens for `aegovValidate` events at form root, runs your schema, and writes `is-invalid` + `error-message` back to each component.

```ts
import { createForm } from '@aegov/designsystem-validation';
import { valibotAdapter } from '@aegov/designsystem-validation/adapters/valibot';
import * as v from 'valibot';

const schema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
  password: v.pipe(v.string(), v.minLength(8, 'Min 8 chars')),
});

createForm(document.querySelector('form'), schema, valibotAdapter(), {
  onValidSubmit: (values) => api.login(values),
});
```

The add-on package is **optional**. The Layer 1 surface is fully usable without it.

See the [BYO Validator recipe](validation-byo.html) for hand-rolled patterns without an engine.

---

## Cross-references

- Per-component validation specifics: each component's docs page has a "Validation" section linking back here.
- Implementation plan: [`validation-engine-addon.md`](https://github.com/aegov/designsystem/blob/main/validation-engine-addon.md) at repository root.
- Migration notes (renames, removed events): see "Known Gotchas" in `CLAUDE.md`.
