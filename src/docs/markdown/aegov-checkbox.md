# Checkbox

<p class="text-lg text-aeblack-500 mb-8">A Checkbox lets a user select zero, one, or many options from a list — accepting terms, opting in to notifications, choosing service preferences, or filtering results. Each instance is a real native <code>&lt;input type="checkbox"&gt;</code> styled to the design system, and the optional <code>aegov-checkbox-group</code> wrapper handles grouping, sizing, layout appearances, and a "select all" controller.</p>

## Introduction

The `aegov-checkbox` component wraps a single native checkbox with a label, optional hint text, and consistent sizing. Use it standalone for one-off agreements (terms acceptance, marketing consent), or compose multiple checkboxes inside an `aegov-checkbox-group` to group related options and emit a unified change event with all currently selected values.

```html
<aegov-checkbox
  field-id="terms"
  name="terms"
  value="accepted"
  label="I accept the Terms of Service and the Privacy Policy"
  is-required="true"
></aegov-checkbox>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-checkbox
    field-id="terms"
    name="terms"
    value="accepted"
    label="I accept the Terms of Service and the Privacy Policy"
    is-required="true"
  ></aegov-checkbox>
</div>

---

## Label and Hint

When you set the `label` property, the component renders a `<label>` element wrapping the input — the entire label area becomes a click target. Add the `hint` property for additional helper text below the label, automatically associated via `aria-describedby`.

```html
<aegov-checkbox
  label="Receive SMS notifications"
  hint="We'll send updates about your application status to your registered mobile number."
></aegov-checkbox>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-checkbox
    label="Receive SMS notifications"
    hint="We'll send updates about your application status to your registered mobile number."
  ></aegov-checkbox>
</div>

---

## States

### Checked

Set `is-checked` to control the checked state. The property is mutable and reflects to the host as `is-checked`.

```html
<aegov-checkbox label="Pre-selected option" is-checked="true"></aegov-checkbox>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-checkbox label="Pre-selected option" is-checked="true"></aegov-checkbox>
</div>

### Disabled

```html
<aegov-checkbox label="This option is unavailable" is-disabled="true"></aegov-checkbox>
<aegov-checkbox label="Pre-selected and locked" is-checked="true" is-disabled="true"></aegov-checkbox>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-3">
    <aegov-checkbox label="This option is unavailable" is-disabled="true"></aegov-checkbox>
    <aegov-checkbox label="Pre-selected and locked" is-checked="true" is-disabled="true"></aegov-checkbox>
  </div>
</div>

### Required

```html
<aegov-checkbox label="I confirm the information provided is accurate" is-required="true"></aegov-checkbox>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-checkbox label="I confirm the information provided is accurate" is-required="true"></aegov-checkbox>
</div>

### Indeterminate

A checkbox can be in three visual states: unchecked, checked, or indeterminate (a horizontal bar). Indeterminate is used most often by a "select all" controller above a list when only some children are selected. The `aegov-checkbox-group` manages this automatically (see below); for ad-hoc use, set `is-indeterminate="true"` directly.

```html
<aegov-checkbox label="Some items selected" is-indeterminate="true"></aegov-checkbox>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-checkbox label="Some items selected" is-indeterminate="true"></aegov-checkbox>
</div>

---

## Sizes

Five sizes are available: `xs`, `sm`, `base` (default), `lg`, and `xl`. The size scales the checkbox box, the label typography, and the click target.

```html
<aegov-checkbox size="xs" label="Extra small"></aegov-checkbox>
<aegov-checkbox size="sm" label="Small"></aegov-checkbox>
<aegov-checkbox size="base" label="Base (default)"></aegov-checkbox>
<aegov-checkbox size="lg" label="Large"></aegov-checkbox>
<aegov-checkbox size="xl" label="Extra large"></aegov-checkbox>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-3">
    <aegov-checkbox size="xs" label="Extra small"></aegov-checkbox>
    <aegov-checkbox size="sm" label="Small"></aegov-checkbox>
    <aegov-checkbox size="base" label="Base (default)"></aegov-checkbox>
    <aegov-checkbox size="lg" label="Large"></aegov-checkbox>
    <aegov-checkbox size="xl" label="Extra large"></aegov-checkbox>
  </div>
</div>

`size` also accepts a Tailwind-style responsive string (e.g. `sm md:base xl:lg`).

---

## Variant

The `variant` property selects the colour family for the rest border, the checked fill, and the hover halo. The focus ring stays `primary-support-600` (camel) and the error border stays `aered-600` regardless of variant. The check glyph is always `whitely-50` for legibility on the filled control.

- `primary` — primary-* family (default)
- `secondary` — secondary-* family
- `neutral-max` — strong neutral (aeblack-800 family)
- `neutral-min` — quiet neutral (aeblack-100 family). Fill stays `aeblack-800` so checked controls remain legible.

### Colour matrix

| Variant       | Rest border      | Checked fill    | Checked border  | Hover halo      |
| ------------- | ---------------- | --------------- | --------------- | --------------- |
| `primary`     | `primary-200`    | `primary-600`   | `primary-600`   | `primary-700`   |
| `secondary`   | `secondary-200`  | `secondary-600` | `secondary-600` | `secondary-700` |
| `neutral-max` | `aeblack-300`    | `aeblack-800`   | `aeblack-800`   | `aeblack-800`   |
| `neutral-min` | `aeblack-100`    | `aeblack-800`   | `aeblack-800`   | `aeblack-700`   |

```html
<aegov-checkbox variant="primary" label="Primary"></aegov-checkbox>
<aegov-checkbox variant="secondary" label="Secondary"></aegov-checkbox>
<aegov-checkbox variant="neutral-max" label="Neutral-max"></aegov-checkbox>
<aegov-checkbox variant="neutral-min" label="Neutral-min"></aegov-checkbox>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <aegov-checkbox variant="primary" label="Primary — unchecked"></aegov-checkbox>
    <aegov-checkbox variant="primary" label="Primary — checked" is-checked="true"></aegov-checkbox>
    <aegov-checkbox variant="secondary" label="Secondary — unchecked"></aegov-checkbox>
    <aegov-checkbox variant="secondary" label="Secondary — checked" is-checked="true"></aegov-checkbox>
    <aegov-checkbox variant="neutral-max" label="Neutral-max — unchecked"></aegov-checkbox>
    <aegov-checkbox variant="neutral-max" label="Neutral-max — checked" is-checked="true"></aegov-checkbox>
    <aegov-checkbox variant="neutral-min" label="Neutral-min — unchecked"></aegov-checkbox>
    <aegov-checkbox variant="neutral-min" label="Neutral-min — checked" is-checked="true"></aegov-checkbox>
  </div>
</div>

### Group cascade

Setting `variant` on `aegov-checkbox-group` cascades to every child checkbox that does not declare its own `variant`. A child's explicit `variant` always wins.

```html
<aegov-checkbox-group variant="secondary" label="Languages spoken">
  <aegov-checkbox value="ar" label="Arabic"></aegov-checkbox>
  <aegov-checkbox value="en" label="English"></aegov-checkbox>
  <aegov-checkbox value="ur" label="Urdu" variant="neutral-max"></aegov-checkbox>
</aegov-checkbox-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-checkbox-group variant="secondary" label="Languages spoken">
    <aegov-checkbox value="ar" label="Arabic" is-checked="true"></aegov-checkbox>
    <aegov-checkbox value="en" label="English" is-checked="true"></aegov-checkbox>
    <aegov-checkbox value="ur" label="Urdu (override → neutral-max)" variant="neutral-max" is-checked="true"></aegov-checkbox>
  </aegov-checkbox-group>
</div>

---

## Checkbox Group

`aegov-checkbox-group` wraps multiple `aegov-checkbox` children to provide:

- A `<fieldset>` with optional `<legend>` for accessibility
- A single `aegovCheckboxGroupChange` event with the array of currently selected values
- Group-wide `size` and `is-disabled` (via native `<fieldset disabled>`) propagation
- Layout appearances and orientation control
- Automatic management of an optional "select all" checkbox

```html
<aegov-checkbox-group label="Notification preferences" name="prefs">
  <aegov-checkbox value="email" label="Email" is-checked="true"></aegov-checkbox>
  <aegov-checkbox value="sms" label="SMS"></aegov-checkbox>
  <aegov-checkbox value="push" label="Push notifications"></aegov-checkbox>
  <aegov-checkbox value="post" label="Post (mailed letter)"></aegov-checkbox>
</aegov-checkbox-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-checkbox-group label="Notification preferences" name="prefs">
    <aegov-checkbox value="email" label="Email" is-checked="true"></aegov-checkbox>
    <aegov-checkbox value="sms" label="SMS"></aegov-checkbox>
    <aegov-checkbox value="push" label="Push notifications"></aegov-checkbox>
    <aegov-checkbox value="post" label="Post (mailed letter)"></aegov-checkbox>
  </aegov-checkbox-group>
</div>

### Orientation

Set `orientation="horizontal"` to lay items out in a row instead of the default vertical stack.

```html
<aegov-checkbox-group label="Languages spoken" orientation="horizontal">
  <aegov-checkbox value="ar" label="Arabic"></aegov-checkbox>
  <aegov-checkbox value="en" label="English"></aegov-checkbox>
  <aegov-checkbox value="ur" label="Urdu"></aegov-checkbox>
  <aegov-checkbox value="hi" label="Hindi"></aegov-checkbox>
</aegov-checkbox-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-checkbox-group label="Languages spoken" orientation="horizontal">
    <aegov-checkbox value="ar" label="Arabic"></aegov-checkbox>
    <aegov-checkbox value="en" label="English"></aegov-checkbox>
    <aegov-checkbox value="ur" label="Urdu"></aegov-checkbox>
    <aegov-checkbox value="hi" label="Hindi"></aegov-checkbox>
  </aegov-checkbox-group>
</div>

### Variants

The `appearance` property selects the visual treatment of the group: `default` (plain stack), `list` (dividers between items), `cards` (each item is a bordered card), or `pills` (toggle pill buttons with the native input visually hidden). All appearances work with both vertical and horizontal orientation.

```html
<aegov-checkbox-group appearance="list" label="Documents to attach">
  <aegov-checkbox value="eid" label="Emirates ID (front and back)"></aegov-checkbox>
  <aegov-checkbox value="passport" label="Passport copy"></aegov-checkbox>
  <aegov-checkbox value="utility" label="Recent utility bill"></aegov-checkbox>
  <aegov-checkbox value="employment" label="Employment letter"></aegov-checkbox>
</aegov-checkbox-group>

<aegov-checkbox-group appearance="cards" label="Notification preferences">
  <aegov-checkbox value="email" label="Email" hint="Updates sent to your registered address."></aegov-checkbox>
  <aegov-checkbox value="sms" label="SMS" hint="Short text alerts to your mobile number."></aegov-checkbox>
  <aegov-checkbox value="push" label="Push" hint="In-app and browser notifications."></aegov-checkbox>
</aegov-checkbox-group>

<aegov-checkbox-group appearance="pills" orientation="horizontal" label="Filter by emirate">
  <aegov-checkbox value="abudhabi" label="Abu Dhabi"></aegov-checkbox>
  <aegov-checkbox value="dubai" label="Dubai"></aegov-checkbox>
  <aegov-checkbox value="sharjah" label="Sharjah"></aegov-checkbox>
  <aegov-checkbox value="ajman" label="Ajman"></aegov-checkbox>
  <aegov-checkbox value="rak" label="Ras Al Khaimah"></aegov-checkbox>
</aegov-checkbox-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-8">
    <aegov-checkbox-group appearance="list" label="Documents to attach">
      <aegov-checkbox value="eid" label="Emirates ID (front and back)"></aegov-checkbox>
      <aegov-checkbox value="passport" label="Passport copy"></aegov-checkbox>
      <aegov-checkbox value="utility" label="Recent utility bill"></aegov-checkbox>
      <aegov-checkbox value="employment" label="Employment letter"></aegov-checkbox>
    </aegov-checkbox-group>
    <aegov-checkbox-group appearance="cards" label="Notification preferences">
      <aegov-checkbox value="email" label="Email" hint="Updates sent to your registered address."></aegov-checkbox>
      <aegov-checkbox value="sms" label="SMS" hint="Short text alerts to your mobile number."></aegov-checkbox>
      <aegov-checkbox value="push" label="Push" hint="In-app and browser notifications."></aegov-checkbox>
    </aegov-checkbox-group>
    <aegov-checkbox-group appearance="pills" orientation="horizontal" label="Filter by emirate">
      <aegov-checkbox value="abudhabi" label="Abu Dhabi"></aegov-checkbox>
      <aegov-checkbox value="dubai" label="Dubai"></aegov-checkbox>
      <aegov-checkbox value="sharjah" label="Sharjah"></aegov-checkbox>
      <aegov-checkbox value="ajman" label="Ajman"></aegov-checkbox>
      <aegov-checkbox value="rak" label="Ras Al Khaimah"></aegov-checkbox>
    </aegov-checkbox-group>
  </div>
</div>

### Group disabled

Setting `is-disabled="true"` on the group disables all child checkboxes via the native `<fieldset disabled>` mechanism — no per-child changes needed.

```html
<aegov-checkbox-group label="This section is locked" is-disabled="true">
  <aegov-checkbox value="a" label="Option A"></aegov-checkbox>
  <aegov-checkbox value="b" label="Option B" is-checked="true"></aegov-checkbox>
  <aegov-checkbox value="c" label="Option C"></aegov-checkbox>
</aegov-checkbox-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-checkbox-group label="This section is locked" is-disabled="true">
    <aegov-checkbox value="a" label="Option A"></aegov-checkbox>
    <aegov-checkbox value="b" label="Option B" is-checked="true"></aegov-checkbox>
    <aegov-checkbox value="c" label="Option C"></aegov-checkbox>
  </aegov-checkbox-group>
</div>

---

## Select All

Set `is-check-all="true"` on a checkbox inside a group to make it the "select all" controller. The group automatically:

- Toggles every non-disabled regular checkbox when the controller changes
- Sets the controller to `checked` when every regular checkbox is selected
- Sets the controller to `indeterminate` when only some are selected
- Sets the controller to `unchecked` when none are selected

```html
<aegov-checkbox-group label="Documents to attach" name="docs">
  <aegov-checkbox is-check-all="true" label="Select all"></aegov-checkbox>
  <aegov-checkbox value="eid" label="Emirates ID (front and back)"></aegov-checkbox>
  <aegov-checkbox value="passport" label="Passport copy"></aegov-checkbox>
  <aegov-checkbox value="utility" label="Recent utility bill"></aegov-checkbox>
  <aegov-checkbox value="employment" label="Employment letter"></aegov-checkbox>
</aegov-checkbox-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-checkbox-group label="Documents to attach" name="docs">
    <aegov-checkbox is-check-all="true" label="Select all"></aegov-checkbox>
    <aegov-checkbox value="eid" label="Emirates ID (front and back)"></aegov-checkbox>
    <aegov-checkbox value="passport" label="Passport copy"></aegov-checkbox>
    <aegov-checkbox value="utility" label="Recent utility bill"></aegov-checkbox>
    <aegov-checkbox value="employment" label="Employment letter"></aegov-checkbox>
  </aegov-checkbox-group>
</div>

---

## Composite Example — Service Preferences

A realistic snippet from a profile-settings page combining several groups, appearances, and a required terms checkbox.

```html
<form class="grid gap-8 max-w-xl">
  <aegov-form-field>
    <aegov-label>Notification preferences</aegov-label>
    <aegov-checkbox-group appearance="cards" name="notifications">
      <aegov-checkbox value="email" label="Email" hint="Updates sent to your registered address." is-checked="true"></aegov-checkbox>
      <aegov-checkbox value="sms" label="SMS" hint="Short text alerts to your mobile number."></aegov-checkbox>
      <aegov-checkbox value="push" label="Push" hint="In-app and browser notifications."></aegov-checkbox>
    </aegov-checkbox-group>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>Languages spoken</aegov-label>
    <aegov-checkbox-group appearance="pills" orientation="horizontal" name="languages">
      <aegov-checkbox value="ar" label="Arabic" is-checked="true"></aegov-checkbox>
      <aegov-checkbox value="en" label="English" is-checked="true"></aegov-checkbox>
      <aegov-checkbox value="ur" label="Urdu"></aegov-checkbox>
      <aegov-checkbox value="hi" label="Hindi"></aegov-checkbox>
      <aegov-checkbox value="fr" label="French"></aegov-checkbox>
    </aegov-checkbox-group>
  </aegov-form-field>

  <aegov-checkbox
    name="terms"
    value="accepted"
    label="I confirm the information provided is accurate and I accept the Terms of Service"
    is-required="true"
  ></aegov-checkbox>
</form>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <form class="grid gap-8 max-w-xl">
    <aegov-form-field>
      <aegov-label>Notification preferences</aegov-label>
      <aegov-checkbox-group appearance="cards" name="notifications">
        <aegov-checkbox value="email" label="Email" hint="Updates sent to your registered address." is-checked="true"></aegov-checkbox>
        <aegov-checkbox value="sms" label="SMS" hint="Short text alerts to your mobile number."></aegov-checkbox>
        <aegov-checkbox value="push" label="Push" hint="In-app and browser notifications."></aegov-checkbox>
      </aegov-checkbox-group>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>Languages spoken</aegov-label>
      <aegov-checkbox-group appearance="pills" orientation="horizontal" name="languages">
        <aegov-checkbox value="ar" label="Arabic" is-checked="true"></aegov-checkbox>
        <aegov-checkbox value="en" label="English" is-checked="true"></aegov-checkbox>
        <aegov-checkbox value="ur" label="Urdu"></aegov-checkbox>
        <aegov-checkbox value="hi" label="Hindi"></aegov-checkbox>
        <aegov-checkbox value="fr" label="French"></aegov-checkbox>
      </aegov-checkbox-group>
    </aegov-form-field>
    <aegov-checkbox
      name="terms"
      value="accepted"
      label="I confirm the information provided is accurate and I accept the Terms of Service"
      is-required="true"
    ></aegov-checkbox>
  </form>
</div>

---

## Listening for change events

Individual checkboxes emit `aegovCheckboxChange`. The group emits `aegovCheckboxGroupChange` with the array of currently selected values.

```html
<aegov-checkbox-group id="docs" label="Documents to attach" name="docs">
  <aegov-checkbox value="eid" label="Emirates ID"></aegov-checkbox>
  <aegov-checkbox value="passport" label="Passport"></aegov-checkbox>
  <aegov-checkbox value="utility" label="Utility bill"></aegov-checkbox>
</aegov-checkbox-group>

<script>
  const group = document.getElementById('docs');
  group.addEventListener('aegovCheckboxGroupChange', (e) => {
    console.log('Selected:', e.detail.values);
    // e.g. ['eid', 'passport']
  });
</script>
```

---

## RTL Support

The checkbox uses CSS logical properties throughout. When the document or any ancestor is set to `dir="rtl"`, the box swaps to the right of the label, the hint aligns right, group dividers and card borders flip, and pill spacing follows the writing direction. No additional configuration is needed.

```html
<div dir="rtl">
  <aegov-checkbox-group appearance="cards" label="تفضيلات الإشعارات" name="prefs">
    <aegov-checkbox value="email" label="البريد الإلكتروني" hint="تصلك التحديثات على عنوانك المسجل." is-checked="true"></aegov-checkbox>
    <aegov-checkbox value="sms" label="الرسائل النصية" hint="تنبيهات قصيرة على رقم هاتفك المحمول."></aegov-checkbox>
    <aegov-checkbox value="push" label="الإشعارات الفورية" hint="إشعارات داخل التطبيق والمتصفح."></aegov-checkbox>
  </aegov-checkbox-group>

  <aegov-checkbox
    label="أؤكد أن المعلومات المقدمة صحيحة وأوافق على شروط الخدمة"
    is-required="true"
  ></aegov-checkbox>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-8">
    <aegov-checkbox-group appearance="cards" label="تفضيلات الإشعارات" name="prefs">
      <aegov-checkbox value="email" label="البريد الإلكتروني" hint="تصلك التحديثات على عنوانك المسجل." is-checked="true"></aegov-checkbox>
      <aegov-checkbox value="sms" label="الرسائل النصية" hint="تنبيهات قصيرة على رقم هاتفك المحمول."></aegov-checkbox>
      <aegov-checkbox value="push" label="الإشعارات الفورية" hint="إشعارات داخل التطبيق والمتصفح."></aegov-checkbox>
    </aegov-checkbox-group>
    <aegov-checkbox
      label="أؤكد أن المعلومات المقدمة صحيحة وأوافق على شروط الخدمة"
      is-required="true"
    ></aegov-checkbox>
  </div>
</div>

---

## API Reference

### aegov-checkbox Properties

| Property          | Attribute          | Description                                                                          | Type           | Default     |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------ | -------------- | ----------- |
| `fieldId`         | `field-id`         | DOM `id` for the native `<input>`. Auto-generated as `aegov-checkbox-{n}` if omitted. | `string`       | _generated_ |
| `name`            | `name`             | Native `name` attribute used during form submission.                                   | `string`       | `undefined` |
| `value`           | `value`            | Native `value` attribute. Identifies the option in form data and group events.         | `string`       | `undefined` |
| `isChecked`       | `is-checked`       | Whether the checkbox is checked. Mutable and reflected to the host.                    | `boolean`      | `false`     |
| `isIndeterminate` | `is-indeterminate` | Whether to show the indeterminate (mixed) state.                                        | `boolean`      | `false`     |
| `size`            | `size`             | Size token or responsive string. Propagated by `aegov-checkbox-group`.                  | `string`       | `'base'`    |
| `variant`         | `variant`          | Colour family for rest border, checked fill, and hover halo. Inherits from group if unset. Focus ring stays camel; error stays aered. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `isDisabled`      | `is-disabled`      | Disable the checkbox. Reflected to the host.                                             | `boolean`      | `false`     |
| `isRequired`      | `is-required`      | Mark the field as required (sets native `required` and `aria-required`).                  | `boolean`      | `false`     |
| `label`           | `label`            | Label text. When set, renders a wrapping `<label>` element.                              | `string`       | `undefined` |
| `hint`            | `hint`             | Helper text shown below the label. Only rendered when `label` is also set.                | `string`       | `undefined` |
| `isCheckAll`      | `is-check-all`     | Mark this checkbox as the "select all" controller within an `aegov-checkbox-group`.        | `boolean`      | `false`     |
| `extraClass`      | `extra-class`      | Additional CSS classes applied to the wrapper.                                              | `string`       | `undefined` |

### aegov-checkbox-group Properties

| Property      | Attribute     | Description                                                                  | Type                         | Default      |
| ------------- | ------------- | ---------------------------------------------------------------------------- | ---------------------------- | ------------ |
| `appearance`     | `appearance`     | Visual layout appearance.                                                        | `CheckboxGroupVariant`       | `'default'`  |
| `orientation` | `orientation` | Stack direction for items.                                                    | `CheckboxGroupOrientation`   | `'vertical'` |
| `label`       | `label`       | Optional `<legend>` text for the underlying `<fieldset>`.                       | `string`                     | `undefined`  |
| `size`        | `size`        | Size token or responsive string. Propagated to all child checkboxes.            | `string`                     | `'base'`     |
| `variant`     | `variant`     | Colour family. Cascades to children that have no explicit `variant`.            | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `isDisabled`  | `is-disabled` | Disable the entire group via native `<fieldset disabled>`.                      | `boolean`                    | `false`      |
| `extraClass`  | `extra-class` | Additional CSS classes applied to the `<fieldset>`.                              | `string`                     | `undefined`  |

`CheckboxGroupVariant` accepts: `default`, `list`, `cards`, `pills`. `CheckboxGroupOrientation` accepts: `vertical`, `horizontal`.

### Slots

| Component               | Slot        | Description                                                          |
| ----------------------- | ----------- | -------------------------------------------------------------------- |
| `aegov-checkbox-group`  | _(default)_ | Place one or more `aegov-checkbox` children here.                     |

`aegov-checkbox` does not expose named slots — content is set through the `label` and `hint` properties.

### Events

| Event                       | Component               | Detail                                       | Description                                                                                  |
| --------------------------- | ----------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `aegovCheckboxChange`       | `aegov-checkbox`        | `{ checked: boolean; value?: string }`       | Fires when the individual checkbox state changes.                                              |
| `aegovCheckboxGroupChange`  | `aegov-checkbox-group`  | `{ values: string[] }`                       | Fires when any child checkbox changes. Detail contains all currently checked non-controller values. |

### Pass-through Attributes

`aria-*` and `data-*` attributes set on `<aegov-checkbox>` are always forwarded to the native `<input>`. The following standard attributes are also forwarded when set on the host:

| Attribute   | Description                          |
| ----------- | ------------------------------------ |
| `form`      | Associate with a form by id.          |
| `tabindex`  | Custom tab order.                     |
| `autofocus` | Focus the checkbox when it mounts.    |
| `title`     | Native tooltip text.                  |

> Reserved HTML attributes (`id`, `class`, `style`) cannot be used as props — `id` is replaced by `field-id`, and `class`/`style` are applied to the host as usual.

---

## Validation

`aegov-checkbox` exposes the unified [Validation Surface](validation-overview.html). Checkbox-specific notes:

### Common recipes

**Required terms acceptance:**

```html
<aegov-checkbox name="terms" is-required label="I accept the terms"></aegov-checkbox>
```

`valueMissing` fires when `is-required` and unchecked.

**Check-all controller:**

```html
<aegov-checkbox-group>
  <aegov-checkbox is-check-all label="Select all"></aegov-checkbox>
  <aegov-checkbox value="a">Option A</aegov-checkbox>
  <aegov-checkbox value="b">Option B</aegov-checkbox>
  <aegov-checkbox value="c">Option C</aegov-checkbox>
</aegov-checkbox-group>
```

**Custom validation message:**

```js
checkbox.setCustomValidity('You must accept to continue');
```

See [BYO Validator](validation-byo.html) for more patterns.

---

## Accessibility

### Built-in behaviour

- Renders a real `<input type="checkbox">`, preserving native semantics, keyboard handling, and assistive-technology behaviour.
- `field-id` is auto-generated and reflected to the host so external `<label for>` (or `aegov-label`) can associate reliably.
- When `label` is set, the entire label area is part of the click target via the wrapping `<label>` element.
- `hint` text is associated with the input via `aria-describedby`.
- `is-required` sets the native `required` attribute and `aria-required="true"`.
- `aegov-checkbox-group` renders a real `<fieldset>` with an optional `<legend>`, giving screen-reader users a clear group label. Setting `is-required` on the group adds `aria-required="true"` to the `<fieldset>` so AT announces the group as required. Consumer `aria-*` attributes on the host are forwarded to the `<fieldset>` (e.g. `aria-labelledby` for external heading association).
- The "select all" indeterminate state is set on the native input via the `indeterminate` property, which assistive tech announces as "mixed".

### Developer responsibilities

- Always provide either a visible `label`, a sibling `<label for>`, or `aria-label` / `aria-labelledby` on the host. A bare checkbox with no label reads as just "checkbox".
- When using `aegov-checkbox-group`, prefer setting the group `label` prop (renders as `<legend>`) over labelling each item with the same group name. If you need to reference an external heading, use `aria-labelledby` on the group host — it forwards to the `<fieldset>`.
- Use `is-required` for genuine submission requirements (e.g. terms acceptance), not for "preferred" options.
- For dynamic check-all groups where children are added or removed at runtime, the group recomputes the controller state automatically — no extra wiring is required.

### Keyboard support

| Key             | Action                                                                                |
| --------------- | ------------------------------------------------------------------------------------- |
| `Tab`           | Move focus to the next checkbox.                                                       |
| `Shift + Tab`   | Move focus to the previous checkbox.                                                   |
| `Space`         | Toggle the focused checkbox.                                                           |
| `Enter`         | Submit the surrounding form (does not toggle the checkbox — native browser behaviour). |
