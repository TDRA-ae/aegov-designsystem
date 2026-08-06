# Bring Your Own Validator

<p class="text-lg text-aeblack-500 mb-8">The validation surface on every form component is deliberately engine-agnostic, so you never need an extra package to validate a form. This page is a set of working recipes built only on <code>is-invalid</code>, <code>error-message</code>, the <code>aegovValidate</code> event and the <code>validate()</code> / <code>setCustomValidity()</code> methods — single fields, whole forms, cross-field rules, async server checks, and translated messages.</p>

## Introduction

Read [Validation Surface](validation-overview.html) first for the contract itself. Everything below assumes you know those three properties, one event and two methods.

The shape of every recipe here is the same:

1. Listen for `aegovValidate`, or call `validate()` yourself.
2. Decide, in your own code, whether the value is acceptable.
3. Write the answer back with `isInvalid` + `errorMessage`, or `setCustomValidity()`.

```html
<aegov-input id="eid" name="emiratesId" hint="15 digits, as printed on your card"></aegov-input>

<script type="module">
  const eid = document.querySelector('#eid');

  eid.addEventListener('aegovValidate', (e) => {
    if (e.detail.trigger === 'input') return;

    const digits = String(e.detail.value).replace(/\D/g, '');
    const ok = digits.length === 15;

    eid.isInvalid = !ok;
    eid.errorMessage = ok ? '' : 'Emirates ID must be 15 digits';
  });
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-6">
    <aegov-input field-id="byo-eid-ok" name="emiratesId" hint="15 digits, as printed on your card" value="784199012345671"></aegov-input>
    <aegov-input field-id="byo-eid-bad" name="emiratesId2" is-invalid="true" error-message="Emirates ID must be 15 digits" value="78419901"></aegov-input>
  </div>
</div>

---

## Choosing when to validate

Gate on `detail.trigger`. The trigger tells you what the user just did, and validating at the wrong moment is the single most common cause of a form that feels hostile.

| Trigger | Validate here? | Why |
| --- | --- | --- |
| `input` | Rarely | Fires on every keystroke. Telling someone their email is invalid while they are typing it is noise. Use it only for live affordances such as a password strength meter or a character budget. |
| `change` | Sometimes | Good for discrete choices — a select, a checkbox, a date. The value is committed, so a verdict is fair. |
| `blur` | **Usually** | The user has finished with the field and moved on. This is the default moment to judge a text value. |
| `submit` | Always | Last line of defence. Validate everything, regardless of what the user touched. |
| `manual` | Your call | You called `validate()`, so you already know why. |

A useful default: validate on `blur`, then re-validate on `input` **only once the field has already errored**, so a correction clears the message immediately.

```js
let hasErrored = false;

field.addEventListener('aegovValidate', (e) => {
  const { trigger, value } = e.detail;
  if (trigger === 'input' && !hasErrored) return;

  const ok = myRule(value);
  hasErrored = !ok;

  field.isInvalid = !ok;
  field.errorMessage = ok ? '' : 'Enter a valid value';
});
```

---

## Recipe — a reusable field validator

Rather than repeating listeners, write one helper and point it at a rule.

```js
/**
 * Attach a synchronous rule to any aegov form component.
 * @param el   the aegov-* element
 * @param rule (value) => string | null   — return a message, or null when valid
 */
function attachRule(el, rule) {
  let errored = false;

  el.addEventListener('aegovValidate', (e) => {
    const { trigger, value } = e.detail;
    if (trigger === 'input' && !errored) return;

    const message = rule(value);
    errored = message !== null;

    el.isInvalid = errored;
    el.errorMessage = message ?? '';
  });
}
```

```js
attachRule(document.querySelector('#email'), (v) =>
  /\S+@\S+\.\S+/.test(v) ? null : 'Enter a valid email address');

attachRule(document.querySelector('#eid'), (v) =>
  String(v).replace(/\D/g, '').length === 15 ? null : 'Emirates ID must be 15 digits');

attachRule(document.querySelector('#mobile'), (v) =>
  /^(\+971|0)?5\d{8}$/.test(String(v).replace(/[\s-]/g, '')) ? null : 'Enter a UAE mobile number');

attachRule(document.querySelector('#terms'), (v) =>
  v === true ? null : 'You must accept the terms to continue');
```

Note the last one: `aegov-checkbox` reports a `boolean` value, not a string. Check the **Value types** table in [Validation Surface](validation-overview.html) before writing a rule — `aegov-range` in range mode gives you `{ low, high }`, `aegov-fileupload` gives you `File[]`, and `aegov-datepicker` in range mode gives you `{ start, end }`.

---

## Recipe — required fields without a library

`is-required` already gives you native constraint validation on the components that wrap a native control, and a synthesized `valueMissing` flag on the custom ones. So for required-ness you often only need to surface the flag rather than write a rule.

```js
field.addEventListener('aegovValidate', (e) => {
  if (e.detail.trigger === 'input') return;

  if (e.detail.validity.valueMissing) {
    field.isInvalid = true;
    field.errorMessage = 'This field is required';
    return;
  }

  field.isInvalid = false;
  field.errorMessage = '';
});
```

Reading `detail.validity` also means the browser does the work for `type="email"`, `type="url"` and numeric bounds:

```js
function messageFor(validity) {
  if (validity.valueMissing)   return 'This field is required';
  if (validity.typeMismatch)   return 'Enter a valid email address';
  if (validity.tooShort)       return 'Too short';
  if (validity.rangeUnderflow) return 'Choose a later date';
  if (validity.rangeOverflow)  return 'Choose an earlier date';
  if (validity.patternMismatch) return 'Use the required format';
  return '';
}

field.addEventListener('aegovValidate', (e) => {
  if (e.detail.trigger === 'input') return;
  const message = messageFor(e.detail.validity);
  field.isInvalid = !!message;
  field.errorMessage = message;
});
```

This is the cheapest useful validation in the system: no rules of your own, browser-accurate flags, your own copy.

---

## Recipe — whole-form validation on submit

Call `validate('submit')` on every control, collect the results, stop if anything failed, and move focus to the first offender.

```html
<form id="application" novalidate>
  <aegov-form-field>
    <aegov-label>Full name</aegov-label>
    <aegov-input name="fullName" is-required></aegov-input>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>Email address</aegov-label>
    <aegov-input name="email" type="email" is-required></aegov-input>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>Preferred appointment</aegov-label>
    <aegov-datepicker name="appointment" is-required></aegov-datepicker>
  </aegov-form-field>

  <aegov-checkbox name="terms" is-required label="I accept the terms of service"></aegov-checkbox>

  <aegov-button type="submit" variant="primary" size="lg">Submit application</aegov-button>
</form>

<script type="module">
  const FORM_CONTROLS = [
    'aegov-input', 'aegov-textarea', 'aegov-select',
    'aegov-checkbox', 'aegov-checkbox-group',
    'aegov-radio-group', 'aegov-toggle', 'aegov-range',
    'aegov-otp', 'aegov-fileupload', 'aegov-datepicker',
  ].join(', ');

  const form = document.querySelector('#application');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const controls = [...form.querySelectorAll(FORM_CONTROLS)];
    const results = await Promise.all(controls.map((c) => c.validate('submit')));

    const failedIndex = results.findIndex((r) => !r.valid);
    if (failedIndex !== -1) {
      controls[failedIndex].focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    await api.submitApplication(data);
  });
</script>
```

Two details worth keeping:

- **`novalidate` on the form.** Constraint validation still runs — you are only suppressing the browser's native error bubbles so your inline messages are the only ones the user sees.
- **`Promise.all`, not a loop with `await` inside.** Validation is async on every component; running them concurrently keeps submit responsive on long forms.

---

## Recipe — a form-level error summary

A single field announces its own error. A form with several failures needs a summary at the top — and government services are usually required to provide one.

```html
<div id="summary" hidden>
  <aegov-callout variant="error" role="alert">
    <p slot="title">There are problems with your application</p>
    <ul id="summary-list"></ul>
  </aegov-callout>
</div>
```

```js
async function validateAll(form) {
  const controls = [...form.querySelectorAll(FORM_CONTROLS)];
  const results = await Promise.all(controls.map((c) => c.validate('submit')));

  return controls
    .map((el, i) => ({ el, result: results[i] }))
    .filter(({ result }) => !result.valid);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const failures = await validateAll(form);
  const summary = document.querySelector('#summary');
  const list = document.querySelector('#summary-list');

  if (failures.length === 0) {
    summary.hidden = true;
    return api.submitApplication(Object.fromEntries(new FormData(form)));
  }

  list.replaceChildren(
    ...failures.map(({ el, result }) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${el.fieldId}`;
      a.textContent = result.message || 'This field needs attention';
      a.addEventListener('click', (ev) => { ev.preventDefault(); el.focus(); });
      li.append(a);
      return li;
    }),
  );

  summary.hidden = false;
  summary.scrollIntoView({ behavior: 'smooth', block: 'start' });
  summary.querySelector('aegov-callout').focus?.();
});
```

Each entry links to the field and moves focus on activation. `role="alert"` on the callout means the summary is announced when it appears.

---

## Recipe — cross-field rules

Cross-field rules belong on the field the user can fix, and they need to re-run when *either* field changes.

```html
<aegov-input id="password" name="password" type="password" is-revealable></aegov-input>
<aegov-input id="confirm" name="confirmPassword" type="password" is-revealable></aegov-input>
```

```js
const password = document.querySelector('#password');
const confirm = document.querySelector('#confirm');

function checkMatch() {
  if (!confirm.value) return;              // nothing to judge yet

  const ok = password.value === confirm.value;
  confirm.isInvalid = !ok;
  confirm.errorMessage = ok ? '' : 'Passwords do not match';
}

confirm.addEventListener('aegovValidate', (e) => {
  if (e.detail.trigger !== 'input') checkMatch();
});

// Re-check the confirmation when the source field changes
password.addEventListener('aegovValidate', () => checkMatch());
```

Date ranges follow the same shape. Note that `aegov-datepicker` in range mode gives you both ends in one value, so a single-field rule is enough there — this pattern is for two separate controls:

```js
function checkOrder() {
  const from = new Date(startDate.value);
  const to = new Date(endDate.value);
  if (!startDate.value || !endDate.value) return;

  const ok = to >= from;
  endDate.isInvalid = !ok;
  endDate.errorMessage = ok ? '' : 'The end date must be on or after the start date';
}

startDate.addEventListener('aegovValidate', () => checkOrder());
endDate.addEventListener('aegovValidate', (e) => {
  if (e.detail.trigger !== 'input') checkOrder();
});
```

---

## Recipe — async and server-side checks

Use `setCustomValidity()` for anything the browser cannot know. It marks the control invalid and populates `error-message` in one call, and an empty string clears it.

Debounce the request, and guard against out-of-order responses.

```js
const username = document.querySelector('#username');

let timer;
let requestId = 0;

username.addEventListener('aegovValidate', (e) => {
  if (e.detail.trigger === 'input') return;

  const value = String(e.detail.value).trim();
  clearTimeout(timer);

  if (!value) {
    username.setCustomValidity('');
    return;
  }

  const id = ++requestId;

  timer = setTimeout(async () => {
    username.hint = 'Checking availability…';

    try {
      const res = await fetch(`/api/username-available?u=${encodeURIComponent(value)}`);
      const { available } = await res.json();

      if (id !== requestId) return;                 // a newer check superseded this one

      await username.setCustomValidity(available ? '' : 'That username is already taken');
      username.hint = available ? 'This username is available' : '';
    } catch {
      if (id !== requestId) return;
      username.hint = '';
      await username.setCustomValidity('We could not check availability. Try again.');
    }
  }, 400);
});
```

For a server rejection that arrives after submit, write it back onto the offending field and move focus there:

```js
try {
  await api.submitApplication(data);
} catch (err) {
  if (err.fieldErrors) {
    for (const [name, message] of Object.entries(err.fieldErrors)) {
      const el = form.querySelector(`[name="${name}"]`);
      await el?.setCustomValidity(message);
    }
    form.querySelector(`[name="${Object.keys(err.fieldErrors)[0]}"]`)?.focus();
  }
}
```

### `setCustomValidity()` vs `isInvalid` + `errorMessage`

| Use | When |
| --- | --- |
| `setCustomValidity(message)` | The error comes from outside the browser — server response, async check, business rule. It also sets the `customError` validity flag and participates in `form.checkValidity()`, so native form validity stays honest. |
| `isInvalid` + `errorMessage` | You are driving the display directly from your own state, and you do not need the control to report itself invalid to the form. |

When in doubt, prefer `setCustomValidity()` — it keeps the DOM's own notion of validity in sync with what the user sees.

---

## Recipe — validating with the browser only

If your rules are expressible as HTML constraints, you can let the platform do all of the deciding and only supply the copy. `aegov-textarea` exposes `maxlength`; `aegov-otp` exposes `pattern`; numeric and date controls expose `min` / `max`.

```html
<aegov-textarea
  name="reason"
  maxlength="500"
  is-required
  hint="Up to 500 characters"
></aegov-textarea>

<aegov-otp name="code" length="6" pattern="^\d{6}$"></aegov-otp>

<aegov-datepicker name="appointment" min="2026-09-01" max="2026-12-31"></aegov-datepicker>
```

```js
for (const el of form.querySelectorAll(FORM_CONTROLS)) {
  el.addEventListener('aegovValidate', (e) => {
    if (e.detail.trigger === 'input') return;
    el.isInvalid = !e.detail.validity.valid;
    el.errorMessage = messageFor(e.detail.validity);
  });
}
```

Because the components are form-associated, `form.checkValidity()` also works as a single gate when you do not need per-field messages:

```js
if (!form.checkValidity()) return;   // something is invalid
```

---

## Recipe — translated messages

Keep messages in a lookup keyed by rule, not inline in the listener, so a second language is a data change rather than a code change.

```js
const MESSAGES = {
  en: {
    required: 'This field is required',
    email: 'Enter a valid email address',
    emiratesId: 'Emirates ID must be 15 digits',
    mobile: 'Enter a UAE mobile number',
    tooShort: ({ min }) => `Use at least ${min} characters`,
  },
  ar: {
    required: 'هذا الحقل مطلوب',
    email: 'أدخل بريدًا إلكترونيًا صحيحًا',
    emiratesId: 'يجب أن تكون الهوية الإماراتية ١٥ رقمًا',
    mobile: 'أدخل رقم هاتف متحرك إماراتي',
    tooShort: ({ min }) => `استخدم ${min} أحرف على الأقل`,
  },
};

function t(key, params) {
  const locale = document.documentElement.lang === 'ar' ? 'ar' : 'en';
  const entry = MESSAGES[locale][key];
  return typeof entry === 'function' ? entry(params ?? {}) : entry;
}
```

```js
attachRule(email, (v) => (/\S+@\S+\.\S+/.test(v) ? null : t('email')));
```

Do not read `el.validationMessage` for display. The browser localises that string to the *browser's* language, not your page's, so an Arabic page in an English browser would show English errors you never wrote.

---

## RTL considerations

Nothing in this page changes under `dir="rtl"` — the surface is behavioural, and the components handle mirroring themselves. Two things are worth attention:

- **Write real Arabic copy, not transliterations.** Error messages carry the whole accessible meaning of the invalid state, so a machine-translated string is a genuine accessibility problem, not a cosmetic one.
- **Numerals.** Arabic-Indic digits (`١٢٣`) read naturally in Arabic prose, but the value the user must type into an Emirates ID field is Western digits. Keep the input requirement in Western digits and only use Arabic-Indic numerals in prose.

---

## Accessibility

### Built in

The components already do this for you — do not re-implement it:

- `aria-invalid` on the inner control, driven by `is-invalid`.
- `aria-describedby` composed so your own IDs survive alongside the hint and error region IDs.
- The error region's `role="alert"` / `aria-live="polite"` gated behind first blur, so nothing is announced mid-typing.
- An `is-invalid` class on the host for your own styling hooks.

### Your responsibilities

- **Never signal an error with colour alone** (WCAG 2.2 SC 1.4.1). Always populate `error-message` or the `error` slot; the red border is decoration on top of the text, not a substitute for it.
- **Say what to do.** "Enter a date on or after 1 September 2026" beats "Invalid date".
- **Move focus to the first invalid control on failed submit.** The components will not do this for you.
- **Provide a form-level summary** for multi-field failures, in a live region, with links that focus the field.
- **Do not disable the submit button** while the form is invalid as the only feedback. A disabled control gives a keyboard or screen reader user nothing to act on and no explanation. Let them submit, then explain what failed.
- **Keep messages next to their field** in the DOM order, which the `error` slot does automatically.

---

## Optional — let a schema do it

Every recipe above is deliberately dependency-free. If your forms are large enough that hand-wiring becomes the bulk of the work, the **optional** `@aegov/designsystem-validation` package drives exactly this surface from a Valibot, Zod, Vest or native schema, including cross-field dependencies, debouncing, focus management and translated messages. It is not required, and nothing in the design system depends on it.

See the [optional package section](validation-overview.html) of the Validation Surface page for the full option list, adapter contract and framework helpers.

---

## Where to next

- [Validation Surface](validation-overview.html) — the contract, value types, form integration and the optional package.
- [Input](aegov-input.html), [Select](aegov-select.html), [Datepicker](aegov-datepicker.html), [File Upload](aegov-fileupload.html), [OTP](aegov-otp.html) — component-specific validation notes.
- [Form Field](aegov-form-field.html) — the wrapper and its cascade.
