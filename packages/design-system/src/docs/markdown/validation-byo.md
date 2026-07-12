# Bring Your Own Validator

The Layer 1 validation surface in `@aegov/design-system` is engine-agnostic. You don't need `@aegov/design-system-validation` — you can drive validation manually with any predicate, regex, server response, or existing app-level validator.

This page shows the most common patterns. The full surface reference is in [Validation Surface](validation-overview.html).

---

## Pattern 1: Single field, simple predicate

```html
<aegov-input id="email" name="email" type="email"></aegov-input>

<script type="module">
  const input = document.querySelector('#email');
  input.addEventListener('aegovValidate', (e) => {
    if (e.detail.trigger !== 'blur') return; // only validate on blur
    const ok = /\S+@\S+\.\S+/.test(e.detail.value);
    input.isInvalid = !ok;
    input.errorMessage = ok ? '' : 'Enter a valid email';
  });
</script>
```

Notes:
- Filter by `trigger` so the user isn't told the input is invalid mid-typing.
- Setting `errorMessage = ''` clears the inline error region.

---

## Pattern 2: Cross-field rule (password confirmation)

```html
<aegov-input id="pw" name="password" type="password"></aegov-input>
<aegov-input id="confirm" name="confirm" type="password"></aegov-input>

<script type="module">
  const pw = document.querySelector('#pw');
  const confirm = document.querySelector('#confirm');

  function recheck() {
    const match = pw.value === confirm.value;
    confirm.isInvalid = confirm.value.length > 0 && !match;
    confirm.errorMessage = match ? '' : 'Passwords do not match';
  }

  pw.addEventListener('aegovValidate', recheck);
  confirm.addEventListener('aegovValidate', recheck);
</script>
```

Both fields drive a shared check that updates the confirm field's state.

---

## Pattern 3: Server-side validation via `setCustomValidity`

When validation must come from the server (uniqueness, business rules, fraud checks):

```html
<aegov-input id="username" name="username"></aegov-input>

<script type="module">
  const input = document.querySelector('#username');
  let abortCtl;

  input.addEventListener('aegovValidate', async (e) => {
    if (e.detail.trigger !== 'blur') return;
    const value = e.detail.value;
    if (!value) {
      await input.setCustomValidity('');
      return;
    }

    // Cancel any in-flight check
    abortCtl?.abort();
    abortCtl = new AbortController();
    input.dataset.validating = 'true';

    try {
      const res = await fetch(`/api/check-user?u=${encodeURIComponent(value)}`, { signal: abortCtl.signal });
      const { available } = await res.json();
      await input.setCustomValidity(available ? '' : 'Username taken');
    } catch (err) {
      if (err.name !== 'AbortError') {
        await input.setCustomValidity('Could not verify username');
      }
    } finally {
      delete input.dataset.validating;
    }
  });
</script>
```

`setCustomValidity` mirrors the native API. Pass an empty string to clear; pass a message to mark invalid.

---

## Pattern 4: Validate-on-submit using `validate()`

```html
<form id="f">
  <aegov-input name="email" id="email" is-required></aegov-input>
  <aegov-textarea name="bio" id="bio" maxlength="500"></aegov-textarea>
  <button type="submit">Submit</button>
</form>

<script type="module">
  const form = document.querySelector('#f');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Run validate() on every aegov form component inside the form
    const fields = form.querySelectorAll(
      'aegov-input, aegov-textarea, aegov-select, aegov-checkbox, ' +
      'aegov-radio-group, aegov-toggle, aegov-range, aegov-otp, ' +
      'aegov-fileupload, aegov-datepicker, aegov-checkbox-group'
    );
    const results = await Promise.all(
      [...fields].map((el) => (el).validate('submit'))
    );
    const allValid = results.every((r) => r.valid);
    if (!allValid) {
      // Optional: focus the first invalid field
      const firstInvalid = [...fields].find((_, i) => !results[i].valid);
      firstInvalid?.querySelector('input, textarea, select')?.focus();
      return;
    }

    // Submit values to the backend
    const data = new FormData(form);
    await fetch('/api/save', { method: 'POST', body: data });
  });
</script>
```

The native `FormData` constructor reads from each component's submitted value automatically — both inner-native-control components and FormAssociated components contribute correctly.

---

## Pattern 5: Show a spinner during async validation

The component sets `data-validating="true"` on its host while `setCustomValidity` is pending if you set it from your async handler — or you can set the flag yourself:

```html
<aegov-input id="user"></aegov-input>

<style>
  aegov-input[data-validating="true"]::after {
    content: '';
    /* spinner of your choice */
  }
</style>
```

---

## Pattern 6: Reset on form reset

`<form>.reset()` clears all native form controls automatically. To clear aegov-specific validation state:

```js
form.addEventListener('reset', () => {
  form.querySelectorAll('aegov-input, aegov-textarea, aegov-select').forEach(async (el) => {
    el.isInvalid = false;
    el.errorMessage = '';
    await el.setCustomValidity('');
  });
});
```

FormAssociated components respond to `<form>.reset()` automatically via their `formResetCallback()` — no extra wiring needed for `aegov-otp`, `aegov-fileupload`, `aegov-select` (listbox), and `aegov-datepicker`.

---

## When to graduate to `@aegov/design-system-validation`

Stick with manual validation when:
- Your form has 1–3 fields.
- Validation rules are mostly per-field with at most one cross-field check.
- You don't need schema reuse between client and server.
- You don't have an existing schema library in the project.

Reach for the engine package when:
- Your forms have 5+ fields.
- You want type-safe values (`useAegovForm<S>` infers the values shape from the schema).
- You're already using Valibot, Zod, or Vest elsewhere — you can share schemas.
- You need declarative async validation, debouncing, race-protection, and cross-field dependency graphs.

The two paths are not mutually exclusive — you can mix manual + engine in the same form.

---

## Cross-references

- [Validation Surface](validation-overview.html) — full surface contract
- Per-component docs — value types, slot conventions, event payloads
