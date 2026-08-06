# Toggle

<p class="text-lg text-aeblack-500 mb-8">A Toggle switches a setting on or off. It differs from a checkbox in intent rather than mechanics: a toggle reads as a control that takes effect now, while a checkbox reads as a value being collected for later submission. Use toggles for preferences and settings, and checkboxes for form answers and agreements.</p>

## Introduction

`aegov-toggle` renders a real `<input type="checkbox">` with `role="switch"` and a styled track and thumb. Set `label` and the component positions the label beside the switch.

```html
<aegov-toggle name="notifications" label="Email notifications" is-checked></aegov-toggle>
<aegov-toggle name="sms" label="SMS notifications"></aegov-toggle>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <aegov-toggle field-id="tg-intro-1" name="notifications" label="Email notifications" is-checked></aegov-toggle>
    <aegov-toggle field-id="tg-intro-2" name="sms" label="SMS notifications"></aegov-toggle>
  </div>
</div>

`role="switch"` is what makes the difference audible: a screen reader announces "on" or "off" rather than "checked" or "not checked", which matches how a user thinks about a setting.

---

## Toggle or checkbox?

| Use a **toggle** when | Use a **[checkbox](aegov-checkbox.html)** when |
| --- | --- |
| The change takes effect immediately. | The value is submitted with a form. |
| It is a setting or preference. | It is an answer or an agreement. |
| The two states are "on" and "off". | The two states are "selected" and "not selected". |
| There is no Save button involved. | A Save or Submit button applies the change. |

The practical test is whether a Save button exists. A toggle inside a form that needs submitting is a broken promise — it looks like it applied instantly and did not. In that situation, use a checkbox.

Consent and terms acceptance are always checkboxes, never toggles.

---

## Hint text

`hint` renders secondary text under the label, wired into the input's `aria-describedby`. Settings usually need it — a toggle label alone rarely says what turning it on actually does.

```html
<aegov-toggle
  name="dataSharing"
  label="Share my verified profile"
  hint="Lets other federal services pre-fill your details. You can withdraw consent at any time."
  is-checked
></aegov-toggle>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-lg space-y-5">
    <aegov-toggle field-id="tg-hint-1" name="dataSharing" label="Share my verified profile" hint="Lets other federal services pre-fill your details. You can withdraw consent at any time." is-checked></aegov-toggle>
    <aegov-toggle field-id="tg-hint-2" name="reminders" label="Renewal reminders" hint="We will notify you 30 days before your Emirates ID expires"></aegov-toggle>
  </div>
</div>

For rich content, use the `hint` slot:

```html
<aegov-toggle name="beta" label="Join the beta programme">
  <span slot="hint">Read the <a href="/beta">beta terms</a> first.</span>
</aegov-toggle>
```

---

## Sizes

Five tokens. The track, thumb and label scale together.

```html
<aegov-toggle size="xs" label="Extra small" is-checked></aegov-toggle>
<aegov-toggle size="sm" label="Small" is-checked></aegov-toggle>
<aegov-toggle size="base" label="Base" is-checked></aegov-toggle>
<aegov-toggle size="lg" label="Large" is-checked></aegov-toggle>
<aegov-toggle size="xl" label="Extra large" is-checked></aegov-toggle>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <aegov-toggle field-id="tg-s-xs" size="xs" label="Extra small" is-checked></aegov-toggle>
    <aegov-toggle field-id="tg-s-sm" size="sm" label="Small" is-checked></aegov-toggle>
    <aegov-toggle field-id="tg-s-base" size="base" label="Base" is-checked></aegov-toggle>
    <aegov-toggle field-id="tg-s-lg" size="lg" label="Large" is-checked></aegov-toggle>
    <aegov-toggle field-id="tg-s-xl" size="xl" label="Extra large" is-checked></aegov-toggle>
  </div>
</div>

### Responsive sizes

`size` accepts a responsive string with the prefixes `xs`, `sm`, `md`, `lg`, `xl` and `2xl`.

```html
<aegov-toggle size="sm md:base" label="Adapts to the viewport"></aegov-toggle>
```

---

## Icons inside the thumb

Two slots place an icon inside the moving thumb — `icon-checked` when on, `icon-unchecked` when off. This gives the state a second, non-colour signal, which is worth doing when the toggle controls something consequential.

```html
<aegov-toggle name="twoFactor" label="Two-factor authentication" is-checked>
  <svg slot="icon-checked" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 0 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z" clip-rule="evenodd" />
  </svg>
  <svg slot="icon-unchecked" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
  </svg>
</aegov-toggle>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <aegov-toggle field-id="tg-ic-1" name="twoFactor" label="Two-factor authentication" is-checked>
      <svg slot="icon-checked" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 0 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z" clip-rule="evenodd" /></svg>
      <svg slot="icon-unchecked" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" /></svg>
    </aegov-toggle>
    <aegov-toggle field-id="tg-ic-2" name="darkMode" label="Dark mode">
      <svg slot="icon-checked" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.46 2.4a.75.75 0 0 0-.98.98 7.5 7.5 0 0 0 9.14 9.14.75.75 0 0 0 .98-.98A9 9 0 0 1 7.46 2.4Z" clip-rule="evenodd" /></svg>
      <svg slot="icon-unchecked" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 2a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1A.75.75 0 0 1 10 2Zm0 12a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1A.75.75 0 0 1 10 14Zm4-4a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" /></svg>
    </aegov-toggle>
  </div>
</div>

Mark both icons `aria-hidden="true"`. The state is already announced through `role="switch"` and `aria-checked` — an announced icon would duplicate it.

---

## States

```html
<aegov-toggle label="Off"></aegov-toggle>
<aegov-toggle label="On" is-checked></aegov-toggle>
<aegov-toggle label="Disabled" is-disabled></aegov-toggle>
<aegov-toggle label="Disabled and on" is-disabled is-checked></aegov-toggle>
<aegov-toggle label="Invalid" is-invalid error-message="Enable notifications to continue"></aegov-toggle>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <aegov-toggle field-id="tg-st-1" label="Off"></aegov-toggle>
    <aegov-toggle field-id="tg-st-2" label="On" is-checked></aegov-toggle>
    <aegov-toggle field-id="tg-st-3" label="Disabled" is-disabled></aegov-toggle>
    <aegov-toggle field-id="tg-st-4" label="Disabled and on" is-disabled is-checked></aegov-toggle>
    <aegov-toggle field-id="tg-st-5" label="Renewal reminders" is-invalid error-message="Enable at least one notification method"></aegov-toggle>
  </div>
</div>

A disabled toggle should be accompanied by an explanation of what would enable it — a disabled setting with no reason given is a dead end.

---

## Variant

`variant` sets the colour of the track when on. The **focus ring stays camel** and the **error state stays aered** regardless.

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <aegov-toggle field-id="tg-v-1" variant="primary" label="Primary" is-checked></aegov-toggle>
    <aegov-toggle field-id="tg-v-2" variant="secondary" label="Secondary" is-checked></aegov-toggle>
    <aegov-toggle field-id="tg-v-3" variant="neutral-max" label="Neutral max" is-checked></aegov-toggle>
    <aegov-toggle field-id="tg-v-4" variant="neutral-min" label="Neutral min" is-checked></aegov-toggle>
  </div>
</div>

---

## Composite example — notification settings

Because a toggle implies immediate effect, the realistic pattern is to persist on change and handle failure by reverting.

```html
<div class="divide-y divide-aeblack-100">
  <div class="py-4">
    <aegov-toggle
      id="notify-email"
      name="email"
      label="Email notifications"
      hint="Sent to the address registered on your account"
      is-checked
    ></aegov-toggle>
  </div>
  <div class="py-4">
    <aegov-toggle
      id="notify-sms"
      name="sms"
      label="SMS notifications"
      hint="Sent to the mobile number on your Emirates ID"
    ></aegov-toggle>
  </div>
</div>

<script type="module">
  for (const toggle of document.querySelectorAll('aegov-toggle')) {
    toggle.addEventListener('aegovToggleChange', async (e) => {
      const { checked } = e.detail;
      toggle.isDisabled = true;

      try {
        await api.savePreference(toggle.name, checked);
        showToast('Preference saved');
      } catch {
        toggle.isChecked = !checked;         // revert — the change did not stick
        showToast('Could not save your preference', 'error');
      } finally {
        toggle.isDisabled = false;
      }
    });
  }
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-lg divide-y divide-aeblack-100">
    <div class="py-4">
      <aegov-toggle field-id="tg-cx-1" name="email" label="Email notifications" hint="Sent to the address registered on your account" is-checked></aegov-toggle>
    </div>
    <div class="py-4">
      <aegov-toggle field-id="tg-cx-2" name="sms" label="SMS notifications" hint="Sent to the mobile number on your Emirates ID"></aegov-toggle>
    </div>
    <div class="py-4">
      <aegov-toggle field-id="tg-cx-3" name="reminders" label="Renewal reminders" hint="Notify me 30 days before my Emirates ID expires" is-checked></aegov-toggle>
    </div>
    <div class="py-4">
      <aegov-toggle field-id="tg-cx-4" name="marketing" label="Service updates and newsletters" hint="Occasional updates about new government services"></aegov-toggle>
    </div>
  </div>
</div>

Reverting on failure is the part people forget. Without it the UI claims a setting is on when the server never accepted it.

---

## Listening for events

```html
<aegov-toggle id="dark-mode" name="darkMode" label="Dark mode"></aegov-toggle>

<script type="module">
  document.querySelector('#dark-mode').addEventListener('aegovToggleChange', (e) => {
    document.documentElement.classList.toggle('dark', e.detail.checked);
    localStorage.setItem('theme', e.detail.checked ? 'dark' : 'light');
  });
</script>
```

The detail carries `{ checked, value? }`. Because a toggle applies immediately, this handler is where the effect belongs — there is no submit step to defer to.

---

## RTL Support

The toggle is direction-aware. In a `dir="rtl"` container the switch moves to the right of its label, and the thumb travels in the mirrored direction — on is to the left. The component handles this with explicit direction rules, so no configuration is needed. Thumb icons follow the thumb.

```html
<div dir="rtl">
  <aegov-toggle name="notifications" label="إشعارات البريد الإلكتروني" hint="تُرسل إلى العنوان المسجل في حسابك" is-checked></aegov-toggle>
  <aegov-toggle name="sms" label="الرسائل النصية" hint="تُرسل إلى رقم الهاتف المسجل في هويتك الإماراتية"></aegov-toggle>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-lg space-y-5">
    <aegov-toggle field-id="tg-rtl-1" name="notifications" label="إشعارات البريد الإلكتروني" hint="تُرسل إلى العنوان المسجل في حسابك" is-checked></aegov-toggle>
    <aegov-toggle field-id="tg-rtl-2" name="sms" label="الرسائل النصية" hint="تُرسل إلى رقم الهاتف المسجل في هويتك الإماراتية"></aegov-toggle>
    <aegov-toggle field-id="tg-rtl-3" name="twoFactor" label="التحقق بخطوتين" is-checked>
      <svg slot="icon-checked" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 0 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z" clip-rule="evenodd" /></svg>
    </aegov-toggle>
    <aegov-toggle field-id="tg-rtl-4" name="marketing" label="التحديثات والرسائل الإخبارية" is-disabled></aegov-toggle>
  </div>
</div>

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the inner `<input>`. Auto-generated when omitted, reflected. | `string` | _generated_ |
| `name` | `name` | Form field name. | `string` | — |
| `value` | `value` | Value submitted when on. | `string` | — |
| `isChecked` | `is-checked` | On state. Mutable and reflected. | `boolean` | `false` |
| `label` | `label` | Inline label text. Renders the switch and label as one click target. | `string` | — |
| `hint` | `hint` | Secondary text under the label, added to `aria-describedby`. | `string` | — |
| `size` | `size` | Size token or responsive string. | `string` — `xs \| sm \| base \| lg \| xl` | `'base'` |
| `variant` | `variant` | Colour of the track when on. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `isDisabled` | `is-disabled` | Disables the toggle. Reflected. | `boolean` | `false` |
| `isRequired` | `is-required` | Marks the toggle required. | `boolean` | `false` |
| `isInvalid` | `is-invalid` | Invalid state. Mutable and reflected. | `boolean` | `false` |
| `errorMessage` | `error-message` | Error text shown while invalid. | `string` | `''` |

### Slots

| Slot | Description |
| --- | --- |
| `icon-checked` | Icon rendered inside the thumb while on. |
| `icon-unchecked` | Icon rendered inside the thumb while off. |
| `hint` | Rich hint markup. Takes precedence over the `hint` property. |
| `error` | Rich error markup. Rendered only while `is-invalid`. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovToggleChange` | `{ checked: boolean; value?: string }` | The toggle was switched. |
| `aegovValidate` | `AegovValidationDetail<boolean>` | Unified validation event — see [Validation Surface](validation-overview.html). |

### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `validate(trigger?)` | `Promise<AegovValidationResult>` | Re-runs validation and emits `aegovValidate`. |
| `setCustomValidity(message)` | `Promise<void>` | Sets `error-message` and `is-invalid`. Empty string clears. |

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `form`, `tabindex`, `autofocus`, `title` | Yes | Forwarded to the inner `<input>`. |
| `aria-*` | Yes | Forwarded — except `aria-invalid` and `aria-describedby`. |
| `data-*` | Yes | Forwarded to the inner `<input>`. |
| `aria-invalid`, `aria-describedby` | Managed | Owned by the component; `aria-describedby` composes your value with the hint and error IDs. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host. |

### CSS classes

| Class | Element |
| --- | --- |
| `.aegov-toggle` | The component wrapper. |
| `.toggle__track` | The track behind the thumb. Marked `aria-hidden`. |
| `.is-invalid` | Added to the **host** while `is-invalid`. |

---

## Validation

### Surface

`aegov-toggle` implements the shared contract, reporting a `boolean` value. In `FormData` it submits `'on'` when checked and is absent when not — native checkbox behaviour. Full reference: [Validation Surface](validation-overview.html).

Validation on a toggle is uncommon, because a setting is rarely invalid. The realistic case is a cross-field rule — at least one notification method must be enabled.

### Common recipes

"At least one of these must be on":

```js
const toggles = [...document.querySelectorAll('aegov-toggle[data-notify]')];

function checkAtLeastOne() {
  const anyOn = toggles.some((t) => t.isChecked);
  for (const t of toggles) {
    t.isInvalid = !anyOn;
    t.errorMessage = anyOn ? '' : 'Enable at least one notification method';
  }
}

for (const t of toggles) {
  t.addEventListener('aegovToggleChange', checkAtLeastOne);
}
```

Required opt-in:

```js
consent.addEventListener('aegovValidate', (e) => {
  const ok = e.detail.value === true;
  consent.isInvalid = !ok;
  consent.errorMessage = ok ? '' : 'You must enable data sharing to use this service';
});
```

If you find yourself writing that second one, reconsider the control — a required opt-in is an agreement, and agreements belong in a [checkbox](aegov-checkbox.html).

More patterns in [Bring Your Own Validator](validation-byo.html).

### Use with `@aegov/designsystem-validation`

The **optional** companion package drives this surface from a schema.

```ts
import { createForm } from '@aegov/designsystem-validation';
import { valibotAdapter } from '@aegov/designsystem-validation/adapters/valibot';
import * as v from 'valibot';

createForm(form, v.object({
  dataSharing: v.boolean(),
}), valibotAdapter());
```

---

## Accessibility

### Built-in behaviour

- The inner element is a real `<input type="checkbox">` carrying `role="switch"`, so a screen reader announces "on" / "off" rather than "checked" / "unchecked" — matching the mental model of a setting.
- `aria-checked` is kept in sync with the state.
- Setting `label` makes the switch and label a single click target, keeping the effective target size compliant with WCAG 2.2 SC 2.5.8 at every size token.
- `hint` is wired into the input's `aria-describedby`.
- The visual track is marked `aria-hidden="true"` — it is decoration over the real control, and would otherwise be announced twice.
- `aria-required` and `aria-invalid` are set from the corresponding properties.
- Thumb travel direction is mirrored under `dir="rtl"` through explicit direction rules.
- The error region takes `role="alert"` only after first blur.
- The focus ring is a high-contrast camel outline held constant across variants, meeting the 3:1 requirement of WCAG 2.2 SC 1.4.11.

### Developer responsibilities

- **Always give a toggle a `label`.** An unlabelled switch is unusable, and the label is also the click target.
- **Label the setting, not the action.** "Email notifications" is right; "Enable email notifications" reads as a button and becomes wrong once the toggle is on.
- **Do not rely on colour alone** to convey state (WCAG 2.2 SC 1.4.1). The `role="switch"` announcement covers assistive technology; for sighted users the thumb position is the primary cue, and the `icon-checked` / `icon-unchecked` slots strengthen it further.
- **Apply the change immediately**, and revert `isChecked` if the request fails. A toggle that silently did not persist is worse than a form that never claimed to save.
- **Confirm destructive toggles** before applying. Turning off two-factor authentication should open a [modal](aegov-modal.html), not just flip.
- **Explain a disabled toggle.** Say what would make it available.
- **Use a [checkbox](aegov-checkbox.html) inside forms** that have a Save button, and always for consent and terms.
- **Mark thumb icons `aria-hidden="true"`.**

### Keyboard support

| Key | Action |
| --- | --- |
| `Tab` | Move focus to the toggle. |
| `Shift` + `Tab` | Move focus to the previous focusable element. |
| `Space` | Switch the toggle on or off. |

`Enter` does not activate a switch — that is native checkbox behaviour, and it is why a toggle should never be the only way to submit something.

---

## Where to next

- [Checkbox](aegov-checkbox.html) — for form values, agreements and consent.
- [Radio](aegov-radio.html) — for one choice from a set.
- [Modal](aegov-modal.html) — for confirming a destructive toggle.
- [Toast](aegov-toast.html) — for confirming that a setting saved.
- [Validation Surface](validation-overview.html) and [Bring Your Own Validator](validation-byo.html).
