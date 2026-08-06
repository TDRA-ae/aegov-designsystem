# Checkbox

<p class="text-lg text-aeblack-500 mb-8">A Checkbox lets the user turn a single option on or off, or pick any number of options from a set. Use one on its own for a binary agreement — accepting terms, opting into notifications — and use <code>aegov-checkbox-group</code> when several related options belong together, which adds a fieldset, four visual treatments, and an optional select-all control.</p>

## Introduction

`aegov-checkbox` renders a real `<input type="checkbox">`. Set `label` and the component renders the label inline in the correct position, which is the usual way to use it.

```html
<aegov-checkbox name="terms" label="I accept the terms of service"></aegov-checkbox>
<aegov-checkbox name="updates" label="Send me updates about my application" is-checked></aegov-checkbox>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-3">
    <aegov-checkbox field-id="cb-intro-1" name="terms" label="I accept the terms of service"></aegov-checkbox>
    <aegov-checkbox field-id="cb-intro-2" name="updates" label="Send me updates about my application" is-checked></aegov-checkbox>
  </div>
</div>

Prefer the `label` property over wrapping the checkbox in an [`aegov-label`](aegov-label.html) — the component positions the label beside the box and makes the whole thing a click target. Use the wrapper form only when the label needs markup, such as a link to the terms.

---

## Hint text

`hint` renders secondary text under the label, and is added to the input's `aria-describedby` so it is announced with the option rather than being purely visual.

```html
<aegov-checkbox
  name="dataSharing"
  label="Share my verified profile with other federal services"
  hint="This lets other services pre-fill your details. You can withdraw consent at any time."
></aegov-checkbox>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-lg space-y-4">
    <aegov-checkbox field-id="cb-hint-1" name="dataSharing" label="Share my verified profile with other federal services" hint="This lets other services pre-fill your details. You can withdraw consent at any time."></aegov-checkbox>
    <aegov-checkbox field-id="cb-hint-2" name="sms" label="SMS notifications" hint="Sent to the mobile number registered on your Emirates ID"></aegov-checkbox>
  </div>
</div>

For rich hint content use the `hint` slot instead:

```html
<aegov-checkbox name="terms" label="I accept the terms of service">
  <span slot="hint">Read the <a href="/terms">full terms</a> before continuing.</span>
</aegov-checkbox>
```

---

## Sizes

Five tokens. The box, the label text and the hint all scale together.

```html
<aegov-checkbox size="xs" label="Extra small"></aegov-checkbox>
<aegov-checkbox size="sm" label="Small"></aegov-checkbox>
<aegov-checkbox size="base" label="Base"></aegov-checkbox>
<aegov-checkbox size="lg" label="Large"></aegov-checkbox>
<aegov-checkbox size="xl" label="Extra large"></aegov-checkbox>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-3">
    <aegov-checkbox field-id="cb-s-xs" size="xs" label="Extra small" is-checked></aegov-checkbox>
    <aegov-checkbox field-id="cb-s-sm" size="sm" label="Small" is-checked></aegov-checkbox>
    <aegov-checkbox field-id="cb-s-base" size="base" label="Base" is-checked></aegov-checkbox>
    <aegov-checkbox field-id="cb-s-lg" size="lg" label="Large" is-checked></aegov-checkbox>
    <aegov-checkbox field-id="cb-s-xl" size="xl" label="Extra large" is-checked></aegov-checkbox>
  </div>
</div>

### Responsive sizes

`size` accepts a responsive string with the prefixes `xs`, `sm`, `md`, `lg`, `xl` and `2xl`.

```html
<aegov-checkbox size="sm md:base" label="Adapts to the viewport"></aegov-checkbox>
```

Note that the smaller tokens shrink the box below the 24 × 24 CSS px minimum target size of WCAG 2.2 SC 2.5.8 — but the clickable area is the whole label row, not just the box, so the target stays compliant as long as you provide a label.

---

## States

```html
<aegov-checkbox label="Unchecked"></aegov-checkbox>
<aegov-checkbox label="Checked" is-checked></aegov-checkbox>
<aegov-checkbox label="Indeterminate" is-indeterminate></aegov-checkbox>
<aegov-checkbox label="Disabled" is-disabled></aegov-checkbox>
<aegov-checkbox label="Disabled and checked" is-disabled is-checked></aegov-checkbox>
<aegov-checkbox label="Required" is-required></aegov-checkbox>
<aegov-checkbox label="Invalid" is-invalid error-message="You must accept the terms to continue"></aegov-checkbox>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-3">
    <aegov-checkbox field-id="cb-st-1" label="Unchecked"></aegov-checkbox>
    <aegov-checkbox field-id="cb-st-2" label="Checked" is-checked></aegov-checkbox>
    <aegov-checkbox field-id="cb-st-3" label="Indeterminate" is-indeterminate></aegov-checkbox>
    <aegov-checkbox field-id="cb-st-4" label="Disabled" is-disabled></aegov-checkbox>
    <aegov-checkbox field-id="cb-st-5" label="Disabled and checked" is-disabled is-checked></aegov-checkbox>
    <aegov-checkbox field-id="cb-st-6" label="Required" is-required></aegov-checkbox>
    <aegov-checkbox field-id="cb-st-7" label="I accept the terms of service" is-invalid error-message="You must accept the terms to continue"></aegov-checkbox>
  </div>
</div>

### Indeterminate

`is-indeterminate` shows the mixed state — neither checked nor unchecked. The native property can only be set from JavaScript, so the component syncs it onto the input for you and reports `aria-checked="mixed"`.

It is a **display** state, not a value: an indeterminate checkbox still submits according to its `checked` state. Use it for a select-all control that reflects a partial selection, which is exactly what `aegov-checkbox-group` does automatically.

---

## Variant

`variant` sets the colour of the checked fill. The **focus ring stays camel** and the **error state stays aered** regardless.

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-3">
    <aegov-checkbox field-id="cb-v-1" variant="primary" label="Primary" is-checked></aegov-checkbox>
    <aegov-checkbox field-id="cb-v-2" variant="secondary" label="Secondary" is-checked></aegov-checkbox>
    <aegov-checkbox field-id="cb-v-3" variant="neutral-max" label="Neutral max" is-checked></aegov-checkbox>
    <aegov-checkbox field-id="cb-v-4" variant="neutral-min" label="Neutral min" is-checked></aegov-checkbox>
  </div>
</div>

---

## Checkbox group

`aegov-checkbox-group` wraps several checkboxes in a real `<fieldset>` with the `label` rendered as its `<legend>`. This is the only correct way to name a set of checkboxes — a `<label>` cannot name a group.

```html
<aegov-checkbox-group label="Which services are you applying for?">
  <aegov-checkbox name="services" value="eid" label="Emirates ID renewal"></aegov-checkbox>
  <aegov-checkbox name="services" value="visa" label="Residency visa renewal"></aegov-checkbox>
  <aegov-checkbox name="services" value="licence" label="Driving licence renewal"></aegov-checkbox>
</aegov-checkbox-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-checkbox-group label="Which services are you applying for?">
      <aegov-checkbox name="services" value="eid" label="Emirates ID renewal"></aegov-checkbox>
      <aegov-checkbox name="services" value="visa" label="Residency visa renewal"></aegov-checkbox>
      <aegov-checkbox name="services" value="licence" label="Driving licence renewal"></aegov-checkbox>
    </aegov-checkbox-group>
  </div>
</div>

The group propagates its resolved `size` to every child, and cascades `variant` to children still on the default — so set both once on the group.

Give every child the **same `name`** and a distinct `value`. Each child submits through its own native input, so `FormData.getAll('services')` returns the checked values.

### Appearance

Four visual treatments, all with identical markup.

| Appearance | Look |
| --- | --- |
| `default` | A plain stack with no decoration. |
| `list` | Divider lines between items. |
| `cards` | A bordered card per item; the whole card is clickable and highlights when checked. |
| `pills` | The box is visually hidden and the label becomes a pill toggle that fills when checked. |

```html
<aegov-checkbox-group appearance="default" label="Default">…</aegov-checkbox-group>
<aegov-checkbox-group appearance="list" label="List">…</aegov-checkbox-group>
<aegov-checkbox-group appearance="cards" label="Cards">…</aegov-checkbox-group>
<aegov-checkbox-group appearance="pills" label="Pills">…</aegov-checkbox-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-8 max-w-md">
    <aegov-checkbox-group appearance="default" label="Default">
      <aegov-checkbox name="cb-ap-1" value="a" label="Emirates ID renewal"></aegov-checkbox>
      <aegov-checkbox name="cb-ap-1" value="b" label="Residency visa renewal"></aegov-checkbox>
    </aegov-checkbox-group>
    <aegov-checkbox-group appearance="list" label="List">
      <aegov-checkbox name="cb-ap-2" value="a" label="Emirates ID renewal"></aegov-checkbox>
      <aegov-checkbox name="cb-ap-2" value="b" label="Residency visa renewal"></aegov-checkbox>
      <aegov-checkbox name="cb-ap-2" value="c" label="Driving licence renewal"></aegov-checkbox>
    </aegov-checkbox-group>
    <aegov-checkbox-group appearance="cards" label="Cards">
      <aegov-checkbox name="cb-ap-3" value="a" label="Emirates ID renewal" hint="Takes 3 working days"></aegov-checkbox>
      <aegov-checkbox name="cb-ap-3" value="b" label="Residency visa renewal" hint="Takes 5 working days"></aegov-checkbox>
    </aegov-checkbox-group>
    <aegov-checkbox-group appearance="pills" label="Pills">
      <aegov-checkbox name="cb-ap-4" value="ar" label="Arabic"></aegov-checkbox>
      <aegov-checkbox name="cb-ap-4" value="en" label="English"></aegov-checkbox>
      <aegov-checkbox name="cb-ap-4" value="ur" label="Urdu"></aegov-checkbox>
    </aegov-checkbox-group>
  </div>
</div>

`cards` works well with `hint` text, because there is room for it. `pills` deliberately hides the box, so it suits short labels where the filled state alone is unambiguous — avoid it for consequential choices such as consent, where a visible checkbox is the clearer affordance.

### Orientation

```html
<aegov-checkbox-group orientation="vertical" label="Vertical">…</aegov-checkbox-group>
<aegov-checkbox-group orientation="horizontal" label="Horizontal">…</aegov-checkbox-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-8 max-w-lg">
    <aegov-checkbox-group orientation="horizontal" label="Horizontal (default appearance)">
      <aegov-checkbox name="cb-or-1" value="ar" label="Arabic"></aegov-checkbox>
      <aegov-checkbox name="cb-or-1" value="en" label="English"></aegov-checkbox>
      <aegov-checkbox name="cb-or-1" value="ur" label="Urdu"></aegov-checkbox>
    </aegov-checkbox-group>
    <aegov-checkbox-group orientation="horizontal" appearance="pills" label="Horizontal pills">
      <aegov-checkbox name="cb-or-2" value="ar" label="Arabic"></aegov-checkbox>
      <aegov-checkbox name="cb-or-2" value="en" label="English"></aegov-checkbox>
      <aegov-checkbox name="cb-or-2" value="ur" label="Urdu"></aegov-checkbox>
    </aegov-checkbox-group>
  </div>
</div>

Vertical is the default and the safer choice — a vertical list is easier to scan, and it reflows on narrow screens without the labels colliding.

### Select all

Add `is-check-all` to one checkbox in the group and it becomes a select-all control. The group handles everything:

- Toggling it checks or unchecks every other enabled checkbox.
- Changing any individual checkbox updates it to checked, unchecked, or indeterminate.
- Individually disabled checkboxes are skipped, so select-all never overrides a locked option.

```html
<aegov-checkbox-group label="Notification preferences">
  <aegov-checkbox is-check-all label="Select all"></aegov-checkbox>
  <aegov-checkbox name="notify" value="email" label="Email"></aegov-checkbox>
  <aegov-checkbox name="notify" value="sms" label="SMS"></aegov-checkbox>
  <aegov-checkbox name="notify" value="push" label="Push notifications"></aegov-checkbox>
  <aegov-checkbox name="notify" value="post" label="Post" is-disabled></aegov-checkbox>
</aegov-checkbox-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-checkbox-group label="Notification preferences" appearance="list">
      <aegov-checkbox field-id="cb-all-0" is-check-all label="Select all"></aegov-checkbox>
      <aegov-checkbox field-id="cb-all-1" name="notify" value="email" label="Email"></aegov-checkbox>
      <aegov-checkbox field-id="cb-all-2" name="notify" value="sms" label="SMS"></aegov-checkbox>
      <aegov-checkbox field-id="cb-all-3" name="notify" value="push" label="Push notifications"></aegov-checkbox>
      <aegov-checkbox field-id="cb-all-4" name="notify" value="post" label="Post (unavailable)" is-disabled></aegov-checkbox>
    </aegov-checkbox-group>
  </div>
</div>

The select-all checkbox should have no `name` or `value` — it is a control, not a value, and it is excluded from the group's reported values.

### Disabling the whole group

`is-disabled` on the group uses the native `<fieldset disabled>` mechanism, which disables every descendant control in one step.

```html
<aegov-checkbox-group label="Locked while under review" is-disabled>…</aegov-checkbox-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-checkbox-group label="This section is locked while your application is under review" is-disabled appearance="list">
      <aegov-checkbox name="cb-dis" value="a" label="Emirates ID renewal" is-checked></aegov-checkbox>
      <aegov-checkbox name="cb-dis" value="b" label="Residency visa renewal"></aegov-checkbox>
    </aegov-checkbox-group>
  </div>
</div>

---

## Composite example — application preferences

```html
<form id="preferences" novalidate>
  <aegov-checkbox-group
    label="Which services are you applying for?"
    appearance="cards"
    is-required
    hint="Select at least one service"
  >
    <aegov-checkbox name="services" value="eid" label="Emirates ID renewal" hint="AED 270 — 3 working days"></aegov-checkbox>
    <aegov-checkbox name="services" value="visa" label="Residency visa renewal" hint="AED 650 — 5 working days"></aegov-checkbox>
    <aegov-checkbox name="services" value="licence" label="Driving licence renewal" hint="AED 300 — same day"></aegov-checkbox>
  </aegov-checkbox-group>

  <aegov-checkbox-group label="How should we notify you?" appearance="list">
    <aegov-checkbox is-check-all label="Select all"></aegov-checkbox>
    <aegov-checkbox name="notify" value="email" label="Email"></aegov-checkbox>
    <aegov-checkbox name="notify" value="sms" label="SMS"></aegov-checkbox>
  </aegov-checkbox-group>

  <aegov-checkbox name="terms" is-required label="I confirm the information provided is accurate">
    <span slot="hint">Read the <a href="/terms">terms of service</a> before continuing.</span>
  </aegov-checkbox>

  <aegov-button type="submit" variant="primary" size="lg">Submit application</aegov-button>
</form>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-lg space-y-8">
    <aegov-checkbox-group label="Which services are you applying for?" appearance="cards" is-required hint="Select at least one service">
      <aegov-checkbox name="cx-services" value="eid" label="Emirates ID renewal" hint="AED 270 — 3 working days"></aegov-checkbox>
      <aegov-checkbox name="cx-services" value="visa" label="Residency visa renewal" hint="AED 650 — 5 working days"></aegov-checkbox>
      <aegov-checkbox name="cx-services" value="licence" label="Driving licence renewal" hint="AED 300 — same day"></aegov-checkbox>
    </aegov-checkbox-group>
    <aegov-checkbox-group label="How should we notify you?" appearance="list">
      <aegov-checkbox field-id="cb-cx-all" is-check-all label="Select all"></aegov-checkbox>
      <aegov-checkbox field-id="cb-cx-e" name="cx-notify" value="email" label="Email"></aegov-checkbox>
      <aegov-checkbox field-id="cb-cx-s" name="cx-notify" value="sms" label="SMS"></aegov-checkbox>
    </aegov-checkbox-group>
    <aegov-checkbox field-id="cb-cx-terms" name="terms" is-required label="I confirm the information provided is accurate">
      <span slot="hint">Read the <a href="#">terms of service</a> before continuing.</span>
    </aegov-checkbox>
    <aegov-button type="submit" variant="primary" size="lg">Submit application</aegov-button>
  </div>
</div>

---

## Listening for events

```html
<aegov-checkbox id="terms" name="terms" label="I accept the terms"></aegov-checkbox>

<aegov-checkbox-group id="services" label="Services">
  <aegov-checkbox name="services" value="eid" label="Emirates ID"></aegov-checkbox>
  <aegov-checkbox name="services" value="visa" label="Residency visa"></aegov-checkbox>
</aegov-checkbox-group>

<script type="module">
  document.querySelector('#terms').addEventListener('aegovCheckboxChange', (e) => {
    console.log(e.detail.checked, e.detail.value);
  });

  // The group reports the whole selection, excluding the select-all control
  document.querySelector('#services').addEventListener('aegovCheckboxGroupChange', (e) => {
    console.log(e.detail.values);          // ['eid', 'visa']
    submitButton.isDisabled = e.detail.values.length === 0;
  });
</script>
```

Individual `aegovCheckboxChange` events bubble through the group, so listening on the group for both is fine — but prefer `aegovCheckboxGroupChange` when you want the aggregate, because it already handles the select-all exclusion.

---

## RTL Support

Both components are direction-aware. In a `dir="rtl"` container the box moves to the right of its label, list dividers and card borders mirror, and pills lay out right to left. Legend, hint and error text align with the text direction.

```html
<div dir="rtl">
  <aegov-checkbox-group label="ما الخدمات التي تتقدم بطلبها؟" appearance="cards">
    <aegov-checkbox name="services" value="eid" label="تجديد الهوية الإماراتية" hint="٢٧٠ درهمًا — ٣ أيام عمل"></aegov-checkbox>
    <aegov-checkbox name="services" value="visa" label="تجديد تأشيرة الإقامة" hint="٦٥٠ درهمًا — ٥ أيام عمل"></aegov-checkbox>
  </aegov-checkbox-group>

  <aegov-checkbox name="terms" is-required label="أُقر بأن المعلومات المقدمة صحيحة"></aegov-checkbox>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-lg space-y-8">
    <aegov-checkbox-group label="ما الخدمات التي تتقدم بطلبها؟" appearance="cards">
      <aegov-checkbox name="rtl-services" value="eid" label="تجديد الهوية الإماراتية" hint="٢٧٠ درهمًا — ٣ أيام عمل"></aegov-checkbox>
      <aegov-checkbox name="rtl-services" value="visa" label="تجديد تأشيرة الإقامة" hint="٦٥٠ درهمًا — ٥ أيام عمل"></aegov-checkbox>
    </aegov-checkbox-group>
    <aegov-checkbox-group label="كيف نتواصل معك؟" appearance="list">
      <aegov-checkbox field-id="cb-rtl-all" is-check-all label="تحديد الكل"></aegov-checkbox>
      <aegov-checkbox field-id="cb-rtl-e" name="rtl-notify" value="email" label="البريد الإلكتروني"></aegov-checkbox>
      <aegov-checkbox field-id="cb-rtl-s" name="rtl-notify" value="sms" label="الرسائل النصية"></aegov-checkbox>
    </aegov-checkbox-group>
    <aegov-checkbox-group orientation="horizontal" appearance="pills" label="اللغات">
      <aegov-checkbox name="rtl-lang" value="ar" label="العربية"></aegov-checkbox>
      <aegov-checkbox name="rtl-lang" value="en" label="الإنجليزية"></aegov-checkbox>
    </aegov-checkbox-group>
    <aegov-checkbox field-id="cb-rtl-terms" name="terms" is-required label="أُقر بأن المعلومات المقدمة صحيحة" is-invalid error-message="يجب الموافقة على الشروط للمتابعة"></aegov-checkbox>
  </div>
</div>

The select-all label is your content, so translate it along with everything else — the component supplies no default text for it.

---

## API Reference

### aegov-checkbox Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the inner `<input>`. Auto-generated when omitted, reflected. | `string` | _generated_ |
| `name` | `name` | Form field name. Give every child in a group the same name. | `string` | — |
| `value` | `value` | Value submitted when checked. | `string` | — |
| `isChecked` | `is-checked` | Checked state. Mutable and reflected. | `boolean` | `false` |
| `isIndeterminate` | `is-indeterminate` | Mixed display state; reports `aria-checked="mixed"`. Mutable. | `boolean` | `false` |
| `isCheckAll` | `is-check-all` | Marks this checkbox as the group's select-all control. Reflected. | `boolean` | `false` |
| `size` | `size` | Size token or responsive string. Set by the group when inside one. | `string` — `xs \| sm \| base \| lg \| xl` | `'base'` |
| `variant` | `variant` | Colour of the checked fill. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `label` | `label` | Inline label text. Renders the box and label as one click target. | `string` | — |
| `hint` | `hint` | Secondary text under the label, added to `aria-describedby`. | `string` | — |
| `isDisabled` | `is-disabled` | Disables the checkbox. Reflected. | `boolean` | `false` |
| `isRequired` | `is-required` | Marks the checkbox required. | `boolean` | `false` |
| `isInvalid` | `is-invalid` | Invalid state. Mutable and reflected. | `boolean` | `false` |
| `errorMessage` | `error-message` | Error text shown while invalid. | `string` | `''` |
| `extraClass` | `extra-class` | Extra classes on the inner elements. | `string` | — |

### aegov-checkbox-group Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `label` | `label` | Group name, rendered as a `<legend>`. | `string` | — |
| `appearance` | `appearance` | Visual treatment. | `'default' \| 'list' \| 'cards' \| 'pills'` | `'default'` |
| `orientation` | `orientation` | Layout direction. | `'vertical' \| 'horizontal'` | `'vertical'` |
| `size` | `size` | Size token or responsive string. Propagated to all children. | `string` | `'base'` |
| `variant` | `variant` | Colour family. Cascades to children still on the default. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `isDisabled` | `is-disabled` | Disables every child via native `<fieldset disabled>`. | `boolean` | `false` |
| `isRequired` | `is-required` | Marks the group required, setting `aria-required` on the fieldset. | `boolean` | `false` |
| `isInvalid` | `is-invalid` | Invalid state for the group. Mutable and reflected. | `boolean` | `false` |
| `errorMessage` | `error-message` | Error text shown below the legend. | `string` | `''` |
| `hint` | `hint` | Hint text shown below the legend when not invalid. | `string` | `''` |
| `extraClass` | `extra-class` | Extra classes on the fieldset. | `string` | — |

### Slots

| Slot | On | Description |
| --- | --- | --- |
| _(default)_ | group | The `aegov-checkbox` children. |
| `hint` | both | Rich hint markup. Takes precedence over the `hint` property. |
| `error` | both | Rich error markup. Rendered only while invalid. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovCheckboxChange` | `{ checked: boolean; value?: string }` | Fired by an individual checkbox. Bubbles. |
| `aegovCheckboxGroupChange` | `{ values: string[] }` | Fired by the group with all checked values, excluding the select-all control. |
| `aegovValidate` | `AegovValidationDetail<boolean>` on the checkbox, `AegovValidationDetail<string[]>` on the group | Unified validation event — see [Validation Surface](validation-overview.html). |

### Methods

Both components expose:

| Method | Returns | Description |
| --- | --- | --- |
| `validate(trigger?)` | `Promise<AegovValidationResult>` | Re-runs validation and emits `aegovValidate`. |
| `setCustomValidity(message)` | `Promise<void>` | Sets `error-message` and the invalid state. Empty string clears. |

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `form`, `tabindex`, `autofocus`, `title` | Yes | Forwarded to the inner `<input>`. |
| `aria-*` | Yes | Forwarded — except `aria-invalid` and `aria-describedby`. |
| `data-*` | Yes | Forwarded to the inner `<input>`. |
| `aria-invalid`, `aria-describedby` | Managed | Owned by the component; `aria-describedby` composes your value with the hint and error IDs. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host. |

---

## Validation

### Surface

Both components implement the shared contract. The single checkbox reports a `boolean` value; the group reports a `string[]` of checked values. Full reference: [Validation Surface](validation-overview.html).

The group is a **pure aggregator** — it is not a form-associated element and holds no value of its own. Each child submits individually through its native input, so `FormData.getAll(name)` is what you read.

### Common recipes

Required agreement on a single checkbox:

```js
terms.addEventListener('aegovValidate', (e) => {
  const ok = e.detail.value === true;
  terms.isInvalid = !ok;
  terms.errorMessage = ok ? '' : 'You must accept the terms to continue';
});
```

"At least one" on a group:

```js
services.addEventListener('aegovValidate', (e) => {
  const ok = e.detail.value.length > 0;
  services.isInvalid = !ok;
  services.errorMessage = ok ? '' : 'Select at least one service';
});
```

A maximum number of selections:

```js
services.addEventListener('aegovCheckboxGroupChange', (e) => {
  const tooMany = e.detail.values.length > 3;
  services.isInvalid = tooMany;
  services.errorMessage = tooMany ? 'Select no more than three services' : '';
});
```

More patterns in [Bring Your Own Validator](validation-byo.html).

### Use with `@aegov/designsystem-validation`

The **optional** companion package drives this surface from a schema.

```ts
import { createForm } from '@aegov/designsystem-validation';
import { valibotAdapter } from '@aegov/designsystem-validation/adapters/valibot';
import * as v from 'valibot';

createForm(form, v.object({
  terms: v.literal(true, 'You must accept the terms to continue'),
  services: v.pipe(v.array(v.string()), v.minLength(1, 'Select at least one service')),
}), valibotAdapter());
```

---

## Accessibility

### Built-in behaviour

- The inner element is a real `<input type="checkbox">`, so the checkbox role, `Space` activation, focus behaviour and form participation come from the platform.
- Setting `label` renders the box and label as a single click target, which keeps the effective target size compliant with WCAG 2.2 SC 2.5.8 even at the smaller size tokens.
- `hint` is wired into the input's `aria-describedby`, so the secondary text is announced with the option.
- `aria-checked="mixed"` is reported while indeterminate, and the native `indeterminate` property is kept in sync — a detail that cannot be expressed in HTML alone.
- `aria-required` and `aria-invalid` are set from the corresponding properties.
- The group renders a real `<fieldset>` with the `label` as its `<legend>`, which is the only construct that correctly names a set of checkboxes.
- `is-disabled` on the group uses native `<fieldset disabled>`, so every descendant is genuinely disabled rather than only styled.
- The error region takes `role="alert"` only after first blur, avoiding announcements mid-interaction.
- Select-all skips individually disabled checkboxes, so a locked option is never silently changed.
- The focus ring is a high-contrast camel outline held constant across variants, meeting the 3:1 requirement of WCAG 2.2 SC 1.4.11.

### Developer responsibilities

- **Always give a checkbox a label**, via the `label` property or an [`aegov-label`](aegov-label.html) in a [form field](aegov-form-field.html). An unlabelled checkbox is unusable.
- **Always give a group a `label`.** It becomes the `<legend>`; without it, a screen reader user hears the options with no idea what question they answer.
- **Use the same `name` for all children** in a group, with distinct values, or `FormData` will not collect them together.
- **Leave `name` and `value` off the select-all checkbox** — it is a control, not a value.
- **Never signal an error with colour alone** (WCAG 2.2 SC 1.4.1) — populate `error-message` or the `error` slot.
- **Avoid `pills` for consent or other consequential choices.** It hides the box, and a filled pill is a weaker affordance than a visible checkmark.
- **Do not use a checkbox for an action.** If ticking it immediately does something, use a [Toggle](aegov-toggle.html) for a setting, or a [Button](aegov-button.html) for an action.
- **Prefer a checkbox group over a multiple [Select](aegov-select.html)** when the options fit on screen — no dropdown, no count string, and every option is visible at once.
- **Translate the select-all label** yourself.

### Keyboard support

| Key | Action |
| --- | --- |
| `Tab` | Move focus to the next checkbox. Every checkbox is its own tab stop. |
| `Shift` + `Tab` | Move focus to the previous checkbox. |
| `Space` | Toggle the focused checkbox. |

Arrow keys deliberately do not move between checkboxes. Unlike radios, checkboxes are independent controls and the expected pattern is one tab stop each. Contrast this with [Radio](aegov-radio.html), where arrow keys do move the selection.

---

## Where to next

- [Radio](aegov-radio.html) — for choosing exactly one option from a set.
- [Toggle](aegov-toggle.html) — for a setting that takes effect immediately.
- [Select](aegov-select.html) — for longer option lists.
- [Form Field](aegov-form-field.html) — the wrapper and its validation cascade.
- [Validation Surface](validation-overview.html) and [Bring Your Own Validator](validation-byo.html).
