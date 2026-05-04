# Radio

<p class="text-lg text-aeblack-500 mb-8">A Radio lets a user pick exactly one option from a small, fixed set — title, gender, payment method, preferred language, application type. Each instance is a real native <code>&lt;input type="radio"&gt;</code> styled to the design system, and the <code>aegov-radio-group</code> wrapper takes care of sharing the <code>name</code> attribute, propagating sizing, and emitting a single event when the selection changes.</p>

## Introduction

Radios are almost always used inside an `aegov-radio-group`. The group sets the shared `name` (required for native single-select behaviour), propagates `size` to every child, exposes a single `aegovRadioGroupChange` event with the currently selected value, and supports the same layout variants as the checkbox group.

```html
<aegov-radio-group name="title" label="Title">
  <aegov-radio value="mr" label="Mr" is-checked="true"></aegov-radio>
  <aegov-radio value="ms" label="Ms"></aegov-radio>
  <aegov-radio value="mrs" label="Mrs"></aegov-radio>
  <aegov-radio value="dr" label="Dr"></aegov-radio>
</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-radio-group name="title" label="Title">
    <aegov-radio value="mr" label="Mr" is-checked="true"></aegov-radio>
    <aegov-radio value="ms" label="Ms"></aegov-radio>
    <aegov-radio value="mrs" label="Mrs"></aegov-radio>
    <aegov-radio value="dr" label="Dr"></aegov-radio>
  </aegov-radio-group>
</div>

---

## Label and Description

When you set the `label` property on `aegov-radio`, the component renders a `<label>` element wrapping the input — the entire label area becomes a click target. Add the `description` property for additional helper text below the label, automatically associated via `aria-describedby`.

```html
<aegov-radio-group name="contact-method" label="Preferred contact method">
  <aegov-radio
    value="email"
    label="Email"
    description="We'll send updates to your registered email address."
    is-checked="true"
  ></aegov-radio>
  <aegov-radio
    value="sms"
    label="SMS"
    description="Short text alerts to your registered mobile number."
  ></aegov-radio>
  <aegov-radio
    value="call"
    label="Phone call"
    description="A representative will call you during working hours."
  ></aegov-radio>
</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-radio-group name="contact-method" label="Preferred contact method">
    <aegov-radio
      value="email"
      label="Email"
      description="We'll send updates to your registered email address."
      is-checked="true"
    ></aegov-radio>
    <aegov-radio
      value="sms"
      label="SMS"
      description="Short text alerts to your registered mobile number."
    ></aegov-radio>
    <aegov-radio
      value="call"
      label="Phone call"
      description="A representative will call you during working hours."
    ></aegov-radio>
  </aegov-radio-group>
</div>

---

## States

### Disabled

Disable an individual radio with `is-disabled="true"`, or disable the entire group via the group's `is-disabled` (which uses native `<fieldset disabled>`).

```html
<aegov-radio-group name="payment" label="Payment method">
  <aegov-radio value="card" label="Credit or debit card" is-checked="true"></aegov-radio>
  <aegov-radio value="bank" label="Direct bank transfer"></aegov-radio>
  <aegov-radio value="cash" label="Cash at service centre" is-disabled="true" description="Currently unavailable due to system maintenance."></aegov-radio>
</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-radio-group name="payment" label="Payment method">
    <aegov-radio value="card" label="Credit or debit card" is-checked="true"></aegov-radio>
    <aegov-radio value="bank" label="Direct bank transfer"></aegov-radio>
    <aegov-radio value="cash" label="Cash at service centre" is-disabled="true" description="Currently unavailable due to system maintenance."></aegov-radio>
  </aegov-radio-group>
</div>

### Required

Mark a radio as required to enforce that one option in the group must be selected before form submission. Place `is-required` on at least one option in the group (typically the first).

```html
<aegov-radio-group name="emirate" label="Emirate of residence">
  <aegov-radio value="abudhabi" label="Abu Dhabi" is-required="true"></aegov-radio>
  <aegov-radio value="dubai" label="Dubai" is-required="true"></aegov-radio>
  <aegov-radio value="sharjah" label="Sharjah" is-required="true"></aegov-radio>
  <aegov-radio value="ajman" label="Ajman" is-required="true"></aegov-radio>
  <aegov-radio value="rak" label="Ras Al Khaimah" is-required="true"></aegov-radio>
  <aegov-radio value="uaq" label="Umm Al Quwain" is-required="true"></aegov-radio>
  <aegov-radio value="fujairah" label="Fujairah" is-required="true"></aegov-radio>
</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-radio-group name="emirate" label="Emirate of residence">
    <aegov-radio value="abudhabi" label="Abu Dhabi" is-required="true"></aegov-radio>
    <aegov-radio value="dubai" label="Dubai" is-required="true"></aegov-radio>
    <aegov-radio value="sharjah" label="Sharjah" is-required="true"></aegov-radio>
    <aegov-radio value="ajman" label="Ajman" is-required="true"></aegov-radio>
    <aegov-radio value="rak" label="Ras Al Khaimah" is-required="true"></aegov-radio>
    <aegov-radio value="uaq" label="Umm Al Quwain" is-required="true"></aegov-radio>
    <aegov-radio value="fujairah" label="Fujairah" is-required="true"></aegov-radio>
  </aegov-radio-group>
</div>

---

## Sizes

Five sizes are available: `xs`, `sm`, `base` (default), `lg`, and `xl`. The size scales the radio circle, the label typography, and the click target. Set `size` on the group to propagate to every child.

```html
<aegov-radio-group name="size-sm" size="sm" label="Small">
  <aegov-radio value="a" label="Option A" is-checked="true"></aegov-radio>
  <aegov-radio value="b" label="Option B"></aegov-radio>
</aegov-radio-group>

<aegov-radio-group name="size-base" size="base" label="Base (default)">
  <aegov-radio value="a" label="Option A" is-checked="true"></aegov-radio>
  <aegov-radio value="b" label="Option B"></aegov-radio>
</aegov-radio-group>

<aegov-radio-group name="size-lg" size="lg" label="Large">
  <aegov-radio value="a" label="Option A" is-checked="true"></aegov-radio>
  <aegov-radio value="b" label="Option B"></aegov-radio>
</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-6">
    <aegov-radio-group name="size-sm" size="sm" label="Small">
      <aegov-radio value="a" label="Option A" is-checked="true"></aegov-radio>
      <aegov-radio value="b" label="Option B"></aegov-radio>
    </aegov-radio-group>
    <aegov-radio-group name="size-base" size="base" label="Base (default)">
      <aegov-radio value="a" label="Option A" is-checked="true"></aegov-radio>
      <aegov-radio value="b" label="Option B"></aegov-radio>
    </aegov-radio-group>
    <aegov-radio-group name="size-lg" size="lg" label="Large">
      <aegov-radio value="a" label="Option A" is-checked="true"></aegov-radio>
      <aegov-radio value="b" label="Option B"></aegov-radio>
    </aegov-radio-group>
  </div>
</div>

`size` also accepts a Tailwind-style responsive string (e.g. `sm md:base xl:lg`).

---

## Orientation

Set `orientation="horizontal"` on the group to lay items out in a row instead of the default vertical stack. Useful for short option lists like Yes/No or rating scales.

```html
<aegov-radio-group name="agreement" label="Do you agree with the proposed change?" orientation="horizontal">
  <aegov-radio value="yes" label="Yes"></aegov-radio>
  <aegov-radio value="no" label="No"></aegov-radio>
  <aegov-radio value="unsure" label="Not sure"></aegov-radio>
</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-radio-group name="agreement" label="Do you agree with the proposed change?" orientation="horizontal">
    <aegov-radio value="yes" label="Yes"></aegov-radio>
    <aegov-radio value="no" label="No"></aegov-radio>
    <aegov-radio value="unsure" label="Not sure"></aegov-radio>
  </aegov-radio-group>
</div>

---

## Variants

The `variant` property selects the visual treatment of the group: `default` (plain stack), `list` (dividers between items), `cards` (each item is a bordered card), or `pills` (toggle pill buttons with the native input visually hidden). All variants work with both vertical and horizontal orientation.

```html
<aegov-radio-group name="application-type" variant="list" label="Application type">
  <aegov-radio value="new" label="New application"></aegov-radio>
  <aegov-radio value="renewal" label="Renewal" is-checked="true"></aegov-radio>
  <aegov-radio value="replacement" label="Replacement"></aegov-radio>
  <aegov-radio value="amendment" label="Amendment"></aegov-radio>
</aegov-radio-group>

<aegov-radio-group name="processing" variant="cards" label="Processing speed">
  <aegov-radio
    value="standard"
    label="Standard — 5 working days"
    description="Free of charge for UAE nationals and residents."
    is-checked="true"
  ></aegov-radio>
  <aegov-radio
    value="express"
    label="Express — 2 working days"
    description="Additional fee of AED 100 applies."
  ></aegov-radio>
  <aegov-radio
    value="urgent"
    label="Urgent — same day"
    description="Additional fee of AED 250 applies. Subject to availability."
  ></aegov-radio>
</aegov-radio-group>

<aegov-radio-group name="frequency" variant="pills" orientation="horizontal" label="Reporting frequency">
  <aegov-radio value="daily" label="Daily"></aegov-radio>
  <aegov-radio value="weekly" label="Weekly" is-checked="true"></aegov-radio>
  <aegov-radio value="monthly" label="Monthly"></aegov-radio>
  <aegov-radio value="quarterly" label="Quarterly"></aegov-radio>
</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-8">
    <aegov-radio-group name="application-type" variant="list" label="Application type">
      <aegov-radio value="new" label="New application"></aegov-radio>
      <aegov-radio value="renewal" label="Renewal" is-checked="true"></aegov-radio>
      <aegov-radio value="replacement" label="Replacement"></aegov-radio>
      <aegov-radio value="amendment" label="Amendment"></aegov-radio>
    </aegov-radio-group>
    <aegov-radio-group name="processing" variant="cards" label="Processing speed">
      <aegov-radio
        value="standard"
        label="Standard — 5 working days"
        description="Free of charge for UAE nationals and residents."
        is-checked="true"
      ></aegov-radio>
      <aegov-radio
        value="express"
        label="Express — 2 working days"
        description="Additional fee of AED 100 applies."
      ></aegov-radio>
      <aegov-radio
        value="urgent"
        label="Urgent — same day"
        description="Additional fee of AED 250 applies. Subject to availability."
      ></aegov-radio>
    </aegov-radio-group>
    <aegov-radio-group name="frequency" variant="pills" orientation="horizontal" label="Reporting frequency">
      <aegov-radio value="daily" label="Daily"></aegov-radio>
      <aegov-radio value="weekly" label="Weekly" is-checked="true"></aegov-radio>
      <aegov-radio value="monthly" label="Monthly"></aegov-radio>
      <aegov-radio value="quarterly" label="Quarterly"></aegov-radio>
    </aegov-radio-group>
  </div>
</div>

---

## Group disabled

Setting `is-disabled="true"` on the group disables all child radios via the native `<fieldset disabled>` mechanism — no per-child changes needed.

```html
<aegov-radio-group name="locked" label="This section is locked while the application is under review" is-disabled="true">
  <aegov-radio value="a" label="Option A"></aegov-radio>
  <aegov-radio value="b" label="Option B" is-checked="true"></aegov-radio>
  <aegov-radio value="c" label="Option C"></aegov-radio>
</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-radio-group name="locked" label="This section is locked while the application is under review" is-disabled="true">
    <aegov-radio value="a" label="Option A"></aegov-radio>
    <aegov-radio value="b" label="Option B" is-checked="true"></aegov-radio>
    <aegov-radio value="c" label="Option C"></aegov-radio>
  </aegov-radio-group>
</div>

---

## Composite Example — Passport Application

A realistic snippet from a passport application form combining several groups in different variants.

```html
<form class="grid gap-8 max-w-xl">
  <aegov-form-field>
    <aegov-label is-required="true">Application type</aegov-label>
    <aegov-radio-group name="application-type" variant="list">
      <aegov-radio value="new" label="New passport" is-required="true"></aegov-radio>
      <aegov-radio value="renewal" label="Renewal" is-required="true"></aegov-radio>
      <aegov-radio value="replacement" label="Replacement (lost or damaged)" is-required="true"></aegov-radio>
    </aegov-radio-group>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label is-required="true">Processing speed</aegov-label>
    <aegov-radio-group name="processing" variant="cards">
      <aegov-radio
        value="standard"
        label="Standard — 5 working days"
        description="Free of charge for UAE nationals."
        is-checked="true"
        is-required="true"
      ></aegov-radio>
      <aegov-radio
        value="express"
        label="Express — 2 working days"
        description="Additional fee of AED 100 applies."
        is-required="true"
      ></aegov-radio>
      <aegov-radio
        value="urgent"
        label="Urgent — same day"
        description="Additional fee of AED 250 applies. Subject to availability."
        is-required="true"
      ></aegov-radio>
    </aegov-radio-group>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label is-required="true">Pickup or delivery?</aegov-label>
    <aegov-radio-group name="delivery" orientation="horizontal">
      <aegov-radio value="pickup" label="Pickup at service centre" is-required="true"></aegov-radio>
      <aegov-radio value="courier" label="Courier delivery" is-required="true"></aegov-radio>
    </aegov-radio-group>
  </aegov-form-field>
</form>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <form class="grid gap-8 max-w-xl">
    <aegov-form-field>
      <aegov-label is-required="true">Application type</aegov-label>
      <aegov-radio-group name="application-type" variant="list">
        <aegov-radio value="new" label="New passport" is-required="true"></aegov-radio>
        <aegov-radio value="renewal" label="Renewal" is-required="true"></aegov-radio>
        <aegov-radio value="replacement" label="Replacement (lost or damaged)" is-required="true"></aegov-radio>
      </aegov-radio-group>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label is-required="true">Processing speed</aegov-label>
      <aegov-radio-group name="processing" variant="cards">
        <aegov-radio
          value="standard"
          label="Standard — 5 working days"
          description="Free of charge for UAE nationals."
          is-checked="true"
          is-required="true"
        ></aegov-radio>
        <aegov-radio
          value="express"
          label="Express — 2 working days"
          description="Additional fee of AED 100 applies."
          is-required="true"
        ></aegov-radio>
        <aegov-radio
          value="urgent"
          label="Urgent — same day"
          description="Additional fee of AED 250 applies. Subject to availability."
          is-required="true"
        ></aegov-radio>
      </aegov-radio-group>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label is-required="true">Pickup or delivery?</aegov-label>
      <aegov-radio-group name="delivery" orientation="horizontal">
        <aegov-radio value="pickup" label="Pickup at service centre" is-required="true"></aegov-radio>
        <aegov-radio value="courier" label="Courier delivery" is-required="true"></aegov-radio>
      </aegov-radio-group>
    </aegov-form-field>
  </form>
</div>

---

## Listening for change events

Individual radios emit `aegovRadioChange`. The group emits `aegovRadioGroupChange` with the currently selected value.

```html
<aegov-radio-group id="processing" name="processing" label="Processing speed">
  <aegov-radio value="standard" label="Standard"></aegov-radio>
  <aegov-radio value="express" label="Express"></aegov-radio>
  <aegov-radio value="urgent" label="Urgent"></aegov-radio>
</aegov-radio-group>

<script>
  const group = document.getElementById('processing');
  group.addEventListener('aegovRadioGroupChange', (e) => {
    console.log('Selected:', e.detail.value);
    // e.g. 'express'
  });
</script>
```

---

## RTL Support

The radio uses CSS logical properties throughout. When the document or any ancestor is set to `dir="rtl"`, the circle swaps to the right of the label, the description aligns right, group dividers and card borders flip, and pill spacing follows the writing direction. No additional configuration is needed.

```html
<div dir="rtl">
  <aegov-radio-group name="processing-rtl" variant="cards" label="سرعة المعالجة">
    <aegov-radio
      value="standard"
      label="عادية — خلال 5 أيام عمل"
      description="مجاناً لمواطني دولة الإمارات."
      is-checked="true"
    ></aegov-radio>
    <aegov-radio
      value="express"
      label="سريعة — خلال يومي عمل"
      description="رسوم إضافية بقيمة 100 درهم."
    ></aegov-radio>
    <aegov-radio
      value="urgent"
      label="فورية — في نفس اليوم"
      description="رسوم إضافية بقيمة 250 درهماً. تخضع للتوفر."
    ></aegov-radio>
  </aegov-radio-group>

  <aegov-radio-group name="delivery-rtl" orientation="horizontal" label="الاستلام أم التوصيل؟">
    <aegov-radio value="pickup" label="الاستلام من مركز الخدمة"></aegov-radio>
    <aegov-radio value="courier" label="التوصيل عبر شركة الشحن"></aegov-radio>
  </aegov-radio-group>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-8">
    <aegov-radio-group name="processing-rtl" variant="cards" label="سرعة المعالجة">
      <aegov-radio
        value="standard"
        label="عادية — خلال 5 أيام عمل"
        description="مجاناً لمواطني دولة الإمارات."
        is-checked="true"
      ></aegov-radio>
      <aegov-radio
        value="express"
        label="سريعة — خلال يومي عمل"
        description="رسوم إضافية بقيمة 100 درهم."
      ></aegov-radio>
      <aegov-radio
        value="urgent"
        label="فورية — في نفس اليوم"
        description="رسوم إضافية بقيمة 250 درهماً. تخضع للتوفر."
      ></aegov-radio>
    </aegov-radio-group>
    <aegov-radio-group name="delivery-rtl" orientation="horizontal" label="الاستلام أم التوصيل؟">
      <aegov-radio value="pickup" label="الاستلام من مركز الخدمة"></aegov-radio>
      <aegov-radio value="courier" label="التوصيل عبر شركة الشحن"></aegov-radio>
    </aegov-radio-group>
  </div>
</div>

---

## API Reference

### aegov-radio Properties

| Property      | Attribute     | Description                                                                       | Type      | Default     |
| ------------- | ------------- | --------------------------------------------------------------------------------- | --------- | ----------- |
| `fieldId`     | `field-id`    | DOM `id` for the native `<input>`. Auto-generated as `aegov-radio-{n}` if omitted. | `string`  | _generated_ |
| `name`        | `name`        | Native `name` attribute. Set automatically by `aegov-radio-group`.                  | `string`  | `undefined` |
| `value`       | `value`       | Native `value` attribute. Identifies the option in form data and group events.       | `string`  | `undefined` |
| `isChecked`   | `is-checked`  | Whether the radio is selected. Mutable and reflected to the host.                    | `boolean` | `false`     |
| `size`        | `size`        | Size token or responsive string. Propagated by `aegov-radio-group`.                  | `string`  | `'base'`    |
| `isDisabled`  | `is-disabled` | Disable the individual radio. Reflected to the host.                                  | `boolean` | `false`     |
| `isRequired`  | `is-required` | Mark the field as required (sets native `required` and `aria-required`).               | `boolean` | `false`     |
| `label`       | `label`       | Label text. When set, renders a wrapping `<label>` element.                            | `string`  | `undefined` |
| `description` | `description` | Helper text shown below the label. Only rendered when `label` is also set.              | `string`  | `undefined` |
| `extraClass`  | `extra-class` | Additional CSS classes applied to the wrapper.                                            | `string`  | `undefined` |

### aegov-radio-group Properties

| Property      | Attribute     | Description                                                                  | Type                       | Default      |
| ------------- | ------------- | ---------------------------------------------------------------------------- | -------------------------- | ------------ |
| `name`        | `name`        | Shared `name` for all radios in the group. Required for native single-select.   | `string`                   | _required_   |
| `variant`     | `variant`     | Visual layout variant.                                                          | `RadioGroupVariant`        | `'default'`  |
| `orientation` | `orientation` | Stack direction for items.                                                      | `RadioGroupOrientation`    | `'vertical'` |
| `label`       | `label`       | Optional `<legend>` text for the underlying `<fieldset>`.                         | `string`                   | `undefined`  |
| `size`        | `size`        | Size token or responsive string. Propagated to all child radios.                  | `string`                   | `'base'`     |
| `isDisabled`  | `is-disabled` | Disable the entire group via native `<fieldset disabled>`.                        | `boolean`                  | `false`      |
| `extraClass`  | `extra-class` | Additional CSS classes applied to the `<fieldset>`.                                | `string`                   | `undefined`  |

`RadioGroupVariant` accepts: `default`, `list`, `cards`, `pills`. `RadioGroupOrientation` accepts: `vertical`, `horizontal`.

### Slots

| Component             | Slot        | Description                                                          |
| --------------------- | ----------- | -------------------------------------------------------------------- |
| `aegov-radio-group`   | _(default)_ | Place one or more `aegov-radio` children here.                        |

`aegov-radio` does not expose named slots — content is set through the `label` and `description` properties.

### Events

| Event                    | Component             | Detail                                       | Description                                                                |
| ------------------------ | --------------------- | -------------------------------------------- | -------------------------------------------------------------------------- |
| `aegovRadioChange`       | `aegov-radio`         | `{ checked: boolean; value?: string }`       | Fires when the individual radio state changes.                              |
| `aegovRadioGroupChange`  | `aegov-radio-group`   | `{ value: string \| undefined }`             | Fires when the selected value changes. `undefined` if no radio is selected. |

### Pass-through Attributes

`aria-*` and `data-*` attributes set on `<aegov-radio>` are always forwarded to the native `<input>`. The following standard attributes are also forwarded when set on the host:

| Attribute   | Description                       |
| ----------- | --------------------------------- |
| `form`      | Associate with a form by id.       |
| `tabindex`  | Custom tab order.                  |
| `autofocus` | Focus the radio when it mounts.    |
| `title`     | Native tooltip text.               |

> Reserved HTML attributes (`id`, `class`, `style`) cannot be used as props — `id` is replaced by `field-id`, and `class`/`style` are applied to the host as usual.

---

## Validation

`aegov-radio` exposes the unified [Validation Surface](validation-overview.html). Radio-specific notes:

> **Renamed:** the `description` prop was renamed to `hint`. CSS class `radio__description` → `radio__hint`.

Validation typically happens at the **group level** via `aegov-radio-group`. Standalone radios inherit form participation through the native `name` attribute.

### Common recipes

**Required group selection:**

```html
<aegov-radio-group name="size" is-required label="Size">
  <aegov-radio value="s">Small</aegov-radio>
  <aegov-radio value="m">Medium</aegov-radio>
  <aegov-radio value="l">Large</aegov-radio>
</aegov-radio-group>
```

The group emits `valueMissing` when `is-required` and no radio is checked.

**Default value via `is-checked`:**

```html
<aegov-radio-group name="plan" label="Plan">
  <aegov-radio value="basic" is-checked>Basic</aegov-radio>
  <aegov-radio value="pro">Pro</aegov-radio>
</aegov-radio-group>
```

**Per-radio custom error:**

```js
radio.setCustomValidity('This option is unavailable for your region');
```

See [BYO Validator](validation-byo.html) for more patterns.

---

## Accessibility

### Built-in behaviour

- Renders a real `<input type="radio">`, preserving native semantics, single-select behaviour, and keyboard handling.
- `field-id` is auto-generated and reflected to the host so external `<label for>` (or `aegov-label`) can associate reliably.
- When `label` is set, the entire label area is part of the click target via the wrapping `<label>` element.
- `description` is associated with the input via `aria-describedby`.
- `aegov-radio-group` renders a real `<fieldset>` with `role="radiogroup"` and an optional `<legend>`, giving screen-reader users a clear group label.
- The group sets the shared `name` on every child automatically, so native single-select behaviour and arrow-key navigation work without any extra wiring.

### Developer responsibilities

- Always provide either a visible `label`, a sibling `<label for>`, or `aria-label` / `aria-labelledby` on each radio. A bare radio with no label reads as just "radio button".
- Always wrap related radios in `aegov-radio-group` and set the group `label` — this gives screen-reader users the question being asked, not just the option text.
- Use radios only for genuinely mutually exclusive choices. For binary on/off, prefer `aegov-toggle`. For multi-select, use `aegov-checkbox-group`.
- Provide between two and seven options per group. For longer lists, use `aegov-select` instead.

### Keyboard support

Native browser radio-group semantics apply once `aegov-radio-group` shares the `name` across children:

| Key                                | Action                                                                              |
| ---------------------------------- | ----------------------------------------------------------------------------------- |
| `Tab`                              | Move focus to the selected radio in the group (or the first radio if none selected). |
| `Shift + Tab`                      | Move focus out of the group to the previous focusable element.                        |
| `Arrow Right`, `Arrow Down`        | Move focus to the next radio in the group and select it.                               |
| `Arrow Left`, `Arrow Up`           | Move focus to the previous radio in the group and select it.                           |
| `Space`                            | Select the focused radio.                                                              |
