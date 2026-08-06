# Radio

<p class="text-lg text-aeblack-500 mb-8">A Radio group lets the user choose exactly one option from a set. Unlike a select, every option is visible at once, which makes it the right control whenever the choice matters and the list is short enough to read in full. Radios are almost never used alone — <code>aegov-radio-group</code> supplies the fieldset, the shared name, and the roving keyboard model that the pattern requires.</p>

## Introduction

Wrap `aegov-radio` children in an `aegov-radio-group`. The group's `name` is **required** — it is what makes the options mutually exclusive and what `FormData` reads.

```html
<aegov-radio-group name="contactMethod" label="How should we contact you?">
  <aegov-radio value="email" label="Email"></aegov-radio>
  <aegov-radio value="sms" label="SMS"></aegov-radio>
  <aegov-radio value="phone" label="Phone call"></aegov-radio>
</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-radio-group name="rd-intro" label="How should we contact you?">
      <aegov-radio value="email" label="Email"></aegov-radio>
      <aegov-radio value="sms" label="SMS"></aegov-radio>
      <aegov-radio value="phone" label="Phone call"></aegov-radio>
    </aegov-radio-group>
  </div>
</div>

The group renders a real `<fieldset role="radiogroup">` with the `label` as its `<legend>`, and propagates `name`, `size` and `variant` to every child.

Radios differ from [checkboxes](aegov-checkbox.html) in one way that matters for keyboard users: the whole group is a **single tab stop**, and arrow keys move the selection within it.

---

## Choosing radios over other controls

| Use | When |
| --- | --- |
| **Radio group** | One choice from 2–7 visible options, where seeing all of them helps the decision. |
| [Select](aegov-select.html) | One choice from a longer list, or where screen space is tight. |
| [Toggle](aegov-toggle.html) | An on/off setting that takes effect immediately. |
| [Checkbox](aegov-checkbox.html) | Any number of choices, including none. |

A radio group with two options that are really "yes" and "no" is often better as a single checkbox — but not always: an explicit "Yes / No" pair forces a deliberate answer, whereas an unchecked checkbox is ambiguous between "no" and "not read yet". For consequential declarations, prefer the explicit pair.

---

## Hint text

`hint` on an individual radio explains that option. `hint` on the group explains the question.

```html
<aegov-radio-group name="delivery" label="How would you like to receive your card?" hint="Delivery times are estimates">
  <aegov-radio value="courier" label="Courier to my address" hint="2–3 working days, AED 25"></aegov-radio>
  <aegov-radio value="collect" label="Collect from a service centre" hint="Ready the next working day, free"></aegov-radio>
</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-lg">
    <aegov-radio-group name="rd-hint" label="How would you like to receive your card?" hint="Delivery times are estimates">
      <aegov-radio value="courier" label="Courier to my address" hint="2–3 working days, AED 25"></aegov-radio>
      <aegov-radio value="collect" label="Collect from a service centre" hint="Ready the next working day, free"></aegov-radio>
    </aegov-radio-group>
  </div>
</div>

Each radio's `hint` is wired into that input's `aria-describedby`, so it is announced with the option rather than being purely visual.

---

## Appearance

Four visual treatments, all with identical markup.

| Appearance | Look |
| --- | --- |
| `default` | A plain stack with no decoration. |
| `list` | Divider lines between items. |
| `cards` | A bordered card per item; the whole card is clickable and highlights when selected. |
| `pills` | The circle is visually hidden and the label becomes a pill toggle that fills when selected. |

```html
<aegov-radio-group appearance="cards" name="delivery" label="Delivery method">…</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-8 max-w-md">
    <aegov-radio-group appearance="default" name="rd-ap-1" label="Default">
      <aegov-radio value="a" label="Email"></aegov-radio>
      <aegov-radio value="b" label="SMS"></aegov-radio>
    </aegov-radio-group>
    <aegov-radio-group appearance="list" name="rd-ap-2" label="List">
      <aegov-radio value="a" label="Email"></aegov-radio>
      <aegov-radio value="b" label="SMS"></aegov-radio>
      <aegov-radio value="c" label="Phone call"></aegov-radio>
    </aegov-radio-group>
    <aegov-radio-group appearance="cards" name="rd-ap-3" label="Cards">
      <aegov-radio value="a" label="Courier to my address" hint="2–3 working days, AED 25"></aegov-radio>
      <aegov-radio value="b" label="Collect from a service centre" hint="Next working day, free"></aegov-radio>
    </aegov-radio-group>
    <aegov-radio-group appearance="pills" orientation="horizontal" name="rd-ap-4" label="Pills">
      <aegov-radio value="ar" label="Arabic"></aegov-radio>
      <aegov-radio value="en" label="English"></aegov-radio>
    </aegov-radio-group>
  </div>
</div>

`cards` is the strongest choice when options need explanation — there is room for `hint` text, and the larger target is easier to hit on touch. `pills` suits short mutually-exclusive labels such as a language or a time filter.

---

## Orientation

```html
<aegov-radio-group orientation="vertical" name="a" label="Vertical">…</aegov-radio-group>
<aegov-radio-group orientation="horizontal" name="b" label="Horizontal">…</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-8 max-w-lg">
    <aegov-radio-group orientation="horizontal" name="rd-or-1" label="Horizontal">
      <aegov-radio value="y" label="Yes"></aegov-radio>
      <aegov-radio value="n" label="No"></aegov-radio>
    </aegov-radio-group>
    <aegov-radio-group orientation="horizontal" appearance="pills" name="rd-or-2" label="Horizontal pills">
      <aegov-radio value="d" label="Day"></aegov-radio>
      <aegov-radio value="w" label="Week"></aegov-radio>
      <aegov-radio value="m" label="Month"></aegov-radio>
    </aegov-radio-group>
  </div>
</div>

Vertical is the default and is easier to scan. Horizontal suits two short options — a yes/no pair — but avoid it for three or more long labels, which collide on narrow viewports.

---

## Sizes

Five tokens, propagated from the group to every child.

```html
<aegov-radio-group size="lg" name="x" label="Large">…</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-6 max-w-md">
    <aegov-radio-group size="xs" name="rd-s-1" label="Extra small"><aegov-radio value="a" label="Option A" is-checked></aegov-radio><aegov-radio value="b" label="Option B"></aegov-radio></aegov-radio-group>
    <aegov-radio-group size="sm" name="rd-s-2" label="Small"><aegov-radio value="a" label="Option A" is-checked></aegov-radio><aegov-radio value="b" label="Option B"></aegov-radio></aegov-radio-group>
    <aegov-radio-group size="base" name="rd-s-3" label="Base"><aegov-radio value="a" label="Option A" is-checked></aegov-radio><aegov-radio value="b" label="Option B"></aegov-radio></aegov-radio-group>
    <aegov-radio-group size="lg" name="rd-s-4" label="Large"><aegov-radio value="a" label="Option A" is-checked></aegov-radio><aegov-radio value="b" label="Option B"></aegov-radio></aegov-radio-group>
    <aegov-radio-group size="xl" name="rd-s-5" label="Extra large"><aegov-radio value="a" label="Option A" is-checked></aegov-radio><aegov-radio value="b" label="Option B"></aegov-radio></aegov-radio-group>
  </div>
</div>

### Responsive sizes

`size` accepts a responsive string with the prefixes `xs`, `sm`, `md`, `lg`, `xl` and `2xl`.

```html
<aegov-radio-group size="sm md:base" name="x" label="Adapts to the viewport">…</aegov-radio-group>
```

---

## States

```html
<aegov-radio-group name="s" label="States">
  <aegov-radio value="a" label="Unselected"></aegov-radio>
  <aegov-radio value="b" label="Selected" is-checked></aegov-radio>
  <aegov-radio value="c" label="Unavailable" is-disabled></aegov-radio>
</aegov-radio-group>

<aegov-radio-group name="d" label="Locked while under review" is-disabled>…</aegov-radio-group>

<aegov-radio-group name="e" label="Contact method" is-invalid error-message="Choose how we should contact you">…</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-8 max-w-md">
    <aegov-radio-group name="rd-st-1" label="Individual states">
      <aegov-radio value="a" label="Unselected"></aegov-radio>
      <aegov-radio value="b" label="Selected" is-checked></aegov-radio>
      <aegov-radio value="c" label="Unavailable — fully booked" is-disabled></aegov-radio>
    </aegov-radio-group>
    <aegov-radio-group name="rd-st-2" label="This section is locked while your application is under review" is-disabled appearance="list">
      <aegov-radio value="a" label="Email" is-checked></aegov-radio>
      <aegov-radio value="b" label="SMS"></aegov-radio>
    </aegov-radio-group>
    <aegov-radio-group name="rd-st-3" label="How should we contact you?" is-required is-invalid error-message="Choose how we should contact you">
      <aegov-radio value="a" label="Email"></aegov-radio>
      <aegov-radio value="b" label="SMS"></aegov-radio>
    </aegov-radio-group>
  </div>
</div>

`is-disabled` on the group uses native `<fieldset disabled>`, disabling every descendant in one step. `is-disabled` on an individual radio keeps the option visible but unselectable, which is the right way to show that a choice exists but is currently unavailable.

---

## Variant

`variant` sets the colour of the selected dot, and cascades from the group to children still on the default.

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-6 max-w-md">
    <aegov-radio-group variant="primary" name="rd-v-1" label="Primary"><aegov-radio value="a" label="Selected" is-checked></aegov-radio></aegov-radio-group>
    <aegov-radio-group variant="secondary" name="rd-v-2" label="Secondary"><aegov-radio value="a" label="Selected" is-checked></aegov-radio></aegov-radio-group>
    <aegov-radio-group variant="neutral-max" name="rd-v-3" label="Neutral max"><aegov-radio value="a" label="Selected" is-checked></aegov-radio></aegov-radio-group>
  </div>
</div>

As everywhere in the form family, the **focus ring stays camel** and the **error state stays aered** regardless of variant.

---

## Composite example — appointment preferences

```html
<form id="appointment" novalidate>
  <aegov-radio-group
    name="delivery"
    label="How would you like to receive your Emirates ID?"
    appearance="cards"
    is-required
  >
    <aegov-radio value="courier" label="Courier to my registered address" hint="2–3 working days · AED 25"></aegov-radio>
    <aegov-radio value="collect" label="Collect from a service centre" hint="Ready the next working day · Free"></aegov-radio>
    <aegov-radio value="pobox" label="Deliver to a PO Box" hint="Currently unavailable in your emirate" is-disabled></aegov-radio>
  </aegov-radio-group>

  <aegov-radio-group name="slot" label="Preferred time" appearance="pills" orientation="horizontal" is-required>
    <aegov-radio value="am" label="Morning"></aegov-radio>
    <aegov-radio value="pm" label="Afternoon"></aegov-radio>
    <aegov-radio value="any" label="No preference"></aegov-radio>
  </aegov-radio-group>

  <aegov-button type="submit" variant="primary" size="lg">Confirm appointment</aegov-button>
</form>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-lg space-y-8">
    <aegov-radio-group name="rd-cx-1" label="How would you like to receive your Emirates ID?" appearance="cards" is-required>
      <aegov-radio value="courier" label="Courier to my registered address" hint="2–3 working days · AED 25"></aegov-radio>
      <aegov-radio value="collect" label="Collect from a service centre" hint="Ready the next working day · Free"></aegov-radio>
      <aegov-radio value="pobox" label="Deliver to a PO Box" hint="Currently unavailable in your emirate" is-disabled></aegov-radio>
    </aegov-radio-group>
    <aegov-radio-group name="rd-cx-2" label="Preferred time" appearance="pills" orientation="horizontal" is-required>
      <aegov-radio value="am" label="Morning"></aegov-radio>
      <aegov-radio value="pm" label="Afternoon"></aegov-radio>
      <aegov-radio value="any" label="No preference"></aegov-radio>
    </aegov-radio-group>
    <aegov-button type="submit" variant="primary" size="lg">Confirm appointment</aegov-button>
  </div>
</div>

---

## Listening for events

```html
<aegov-radio-group id="delivery" name="delivery" label="Delivery method">
  <aegov-radio value="courier" label="Courier"></aegov-radio>
  <aegov-radio value="collect" label="Collect"></aegov-radio>
</aegov-radio-group>

<script type="module">
  const group = document.querySelector('#delivery');

  group.addEventListener('aegovRadioGroupChange', (e) => {
    console.log(e.detail.value);      // 'courier' | 'collect' | undefined
    courierFields.hidden = e.detail.value !== 'courier';
  });
</script>
```

Prefer `aegovRadioGroupChange` on the group over `aegovRadioChange` on each child. The group event reports the group's single current value, which is what a radio group means; the child event fires per radio and is rarely what you want.

Note the value can be `undefined` — a group with nothing selected yet has no value.

---

## RTL Support

Both components are direction-aware. In a `dir="rtl"` container the circle moves to the right of its label, list dividers and card borders mirror, and pills lay out right to left. Arrow-key navigation follows the visual order, so `ArrowRight` moves to the option that appears to the right — which is the *previous* option in an RTL layout. That is the correct platform behaviour and users expect it.

```html
<div dir="rtl">
  <aegov-radio-group name="delivery" label="كيف تريد استلام الهوية الإماراتية؟" appearance="cards" is-required>
    <aegov-radio value="courier" label="التوصيل إلى عنواني المسجل" hint="٢–٣ أيام عمل · ٢٥ درهمًا"></aegov-radio>
    <aegov-radio value="collect" label="الاستلام من مركز خدمة" hint="جاهزة في يوم العمل التالي · مجانًا"></aegov-radio>
  </aegov-radio-group>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-lg space-y-8">
    <aegov-radio-group name="rd-rtl-1" label="كيف تريد استلام الهوية الإماراتية؟" appearance="cards" is-required>
      <aegov-radio value="courier" label="التوصيل إلى عنواني المسجل" hint="٢–٣ أيام عمل · ٢٥ درهمًا"></aegov-radio>
      <aegov-radio value="collect" label="الاستلام من مركز خدمة" hint="جاهزة في يوم العمل التالي · مجانًا"></aegov-radio>
    </aegov-radio-group>
    <aegov-radio-group name="rd-rtl-2" label="الوقت المفضل" appearance="pills" orientation="horizontal">
      <aegov-radio value="am" label="صباحًا"></aegov-radio>
      <aegov-radio value="pm" label="بعد الظهر"></aegov-radio>
      <aegov-radio value="any" label="لا يوجد تفضيل"></aegov-radio>
    </aegov-radio-group>
    <aegov-radio-group name="rd-rtl-3" label="كيف نتواصل معك؟" is-required is-invalid error-message="اختر طريقة التواصل">
      <aegov-radio value="email" label="البريد الإلكتروني"></aegov-radio>
      <aegov-radio value="sms" label="الرسائل النصية"></aegov-radio>
    </aegov-radio-group>
  </div>
</div>

---

## API Reference

### aegov-radio-group Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `name` | `name` | **Required.** Shared form field name, propagated to every child. | `string` | — |
| `label` | `label` | Group name, rendered as a `<legend>`. | `string` | — |
| `appearance` | `appearance` | Visual treatment. | `'default' \| 'list' \| 'cards' \| 'pills'` | `'default'` |
| `orientation` | `orientation` | Layout direction. | `'vertical' \| 'horizontal'` | `'vertical'` |
| `size` | `size` | Size token or responsive string. Propagated to all children. | `string` — `xs \| sm \| base \| lg \| xl` | `'base'` |
| `variant` | `variant` | Colour family. Cascades to children still on the default. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `isDisabled` | `is-disabled` | Disables every child via native `<fieldset disabled>`. | `boolean` | `false` |
| `isRequired` | `is-required` | Marks the group required, setting `aria-required` on the fieldset. | `boolean` | `false` |
| `isInvalid` | `is-invalid` | Invalid state. Mutable and reflected. | `boolean` | `false` |
| `errorMessage` | `error-message` | Error text shown below the legend. | `string` | `''` |
| `hint` | `hint` | Hint text shown below the legend when not invalid. | `string` | `''` |
| `extraClass` | `extra-class` | Extra classes on the fieldset. | `string` | — |

In Angular, `name` is a required input — omitting it or writing it in kebab-case raises `NG8008`. See [Using with Angular](using-with-angular.html).

### aegov-radio Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the inner `<input>`. Auto-generated when omitted, reflected. | `string` | _generated_ |
| `value` | `value` | The value submitted when this option is selected. | `string` | — |
| `name` | `name` | Form field name. Set by the group — do not set it per radio. | `string` | — |
| `isChecked` | `is-checked` | Selected state. Mutable and reflected. | `boolean` | `false` |
| `label` | `label` | Inline label text. Renders the circle and label as one click target. | `string` | — |
| `hint` | `hint` | Secondary text under the label, added to `aria-describedby`. | `string` | — |
| `size` | `size` | Size token. Set by the group when inside one. | `string` | `'base'` |
| `variant` | `variant` | Colour of the selected dot. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `isDisabled` | `is-disabled` | Unselectable but still visible. Reflected. | `boolean` | `false` |
| `isRequired` | `is-required` | Marks the individual radio required. | `boolean` | `false` |
| `isInvalid` | `is-invalid` | Invalid state. Mutable and reflected. | `boolean` | `false` |
| `errorMessage` | `error-message` | Error text shown while invalid. | `string` | `''` |
| `extraClass` | `extra-class` | Extra classes on the inner elements. | `string` | — |

### Slots

| Slot | On | Description |
| --- | --- | --- |
| _(default)_ | group | The `aegov-radio` children. |
| `hint` | both | Rich hint markup. Takes precedence over the `hint` property. |
| `error` | both | Rich error markup. Rendered only while invalid. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovRadioGroupChange` | `{ value: string \| undefined }` | The group's selected value changed. **Prefer this one.** |
| `aegovRadioChange` | `{ checked: boolean; value?: string }` | Fired by an individual radio. Bubbles. |
| `aegovValidate` | `AegovValidationDetail<string \| undefined>` on the group, `AegovValidationDetail<boolean>` on the radio | Unified validation event — see [Validation Surface](validation-overview.html). |

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

Both components implement the shared contract. The group reports `string | undefined` — the selected value, or `undefined` when nothing is selected. Full reference: [Validation Surface](validation-overview.html).

The group is a **pure aggregator**: it is not a form-associated element, and the selected child submits through its own native input. `FormData.get(name)` returns the selected value.

### Common recipes

Required selection:

```js
delivery.addEventListener('aegovValidate', (e) => {
  const ok = !!e.detail.value;
  delivery.isInvalid = !ok;
  delivery.errorMessage = ok ? '' : 'Choose how you would like to receive your card';
});
```

A conditional rule based on the choice:

```js
delivery.addEventListener('aegovRadioGroupChange', async (e) => {
  addressFields.hidden = e.detail.value !== 'courier';

  // Clear a stale error on the now-hidden fields
  if (e.detail.value !== 'courier') {
    await address.setCustomValidity('');
  }
});
```

More patterns in [Bring Your Own Validator](validation-byo.html).

### Use with `@aegov/designsystem-validation`

The **optional** companion package drives this surface from a schema. Set the schema key to the group's `name`.

```ts
import { createForm } from '@aegov/designsystem-validation';
import { valibotAdapter } from '@aegov/designsystem-validation/adapters/valibot';
import * as v from 'valibot';

createForm(form, v.object({
  delivery: v.picklist(['courier', 'collect'], 'Choose a delivery method'),
}), valibotAdapter());
```

---

## Accessibility

### Built-in behaviour

- Each option is a real `<input type="radio">`, so mutual exclusion, arrow-key navigation, the single-tab-stop model and form participation all come from the platform.
- The group renders a real `<fieldset>` carrying `role="radiogroup"`, with the `label` as its `<legend>` — the only construct that correctly names a set of radios.
- `name` is propagated to every child, so the options are genuinely exclusive rather than only appearing so.
- Setting `label` on a radio makes the circle and label a single click target, keeping the effective target size compliant with WCAG 2.2 SC 2.5.8 at every size token.
- Each radio's `hint` is wired into its own `aria-describedby`.
- `aria-required` and `aria-invalid` are set on the fieldset from the group's properties.
- `is-disabled` on the group uses native `<fieldset disabled>`, so descendants are genuinely disabled.
- Individually disabled radios are skipped by arrow-key navigation.
- The error region takes `role="alert"` only after first blur.
- The focus ring is a high-contrast camel outline held constant across variants, meeting the 3:1 requirement of WCAG 2.2 SC 1.4.11.

### Developer responsibilities

- **Always set `name` on the group.** Without it the options are not exclusive — the single most damaging mistake available here.
- **Always give the group a `label`.** It becomes the `<legend>`; without it a screen reader user hears options with no question attached.
- **Give every radio a `label` and a distinct `value`.**
- **Do not preselect a default** unless it is genuinely the right answer for most people. A preselected option is easily missed, and for consequential choices it amounts to answering on the user's behalf. Where no default is appropriate, leave the group empty and mark it required.
- **Do not use radios for more than about seven options.** Beyond that, a [Select](aegov-select.html) is easier to scan.
- **Never signal an error with colour alone** (WCAG 2.2 SC 1.4.1) — populate `error-message` or the `error` slot.
- **Include an explicit escape option** where "none of these" is a valid answer — "No preference", "Prefer not to say". Radios cannot be deselected once chosen, so without one the user is trapped by their first click.
- **Avoid `pills` for consequential choices.** It hides the circle, and a filled pill is a weaker affordance.
- **Do not nest interactive content inside a radio's label.** A link inside the label competes with the option's own click target.

### Keyboard support

The group is a **single tab stop**. This is the main difference from [Checkbox](aegov-checkbox.html), where every box is its own stop.

| Key | Action |
| --- | --- |
| `Tab` | Move focus into the group, landing on the selected radio — or the first one if nothing is selected. |
| `Shift` + `Tab` | Move focus out of the group. |
| `ArrowDown`, `ArrowRight` | Select the next enabled option. Follows visual order, so it reverses under `dir="rtl"`. |
| `ArrowUp`, `ArrowLeft` | Select the previous enabled option. |
| `Space` | Select the focused option. |

Arrow keys both move focus **and** change the selection, which is native radio behaviour. It is why a radio group should not trigger destructive side effects on change — a keyboard user passing through the options will select each one on the way.

---

## Where to next

- [Checkbox](aegov-checkbox.html) — for any number of choices, and for select-all behaviour.
- [Select](aegov-select.html) — for longer option lists.
- [Toggle](aegov-toggle.html) — for an immediate on/off setting.
- [Form Field](aegov-form-field.html) — the wrapper and its validation cascade.
- [Validation Surface](validation-overview.html) and [Bring Your Own Validator](validation-byo.html).
