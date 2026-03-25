# Radio

<p class="text-lg text-aeblack-500 mb-8">A radio button allows users to select a single option from a set of mutually exclusive choices. Use radios when only one selection is permitted within a group.</p>

## Introduction

The `aegov-radio` component renders a styled native `<input type="radio">` with an optional label and description. When multiple radios share the same `name`, selecting one automatically deselects the others, providing standard single-select behaviour.

Wrap multiple `aegov-radio` elements inside an `aegov-radio-group` to manage shared properties like `name`, `size`, visual `variant`, and `orientation` from a single parent.

```html
<aegov-radio-group name="fruit" label="Choose a fruit">
  <aegov-radio label="Apple" value="apple"></aegov-radio>
  <aegov-radio label="Banana" value="banana"></aegov-radio>
  <aegov-radio label="Cherry" value="cherry"></aegov-radio>
</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-radio-group name="fruit-intro" label="Choose a fruit">
    <aegov-radio label="Apple" value="apple"></aegov-radio>
    <aegov-radio label="Banana" value="banana"></aegov-radio>
    <aegov-radio label="Cherry" value="cherry"></aegov-radio>
  </aegov-radio-group>
</div>

---

## Standalone Radio

A single `aegov-radio` can be used outside of a group. Provide `name` and `value` directly on the element.

```html
<aegov-radio name="standalone" value="yes" label="I agree to the terms"></aegov-radio>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-radio name="standalone" value="yes" label="I agree to the terms"></aegov-radio>
</div>

---

## Checked State

Set the `checked` attribute to pre-select a radio. Within a group, only one radio should be checked at a time.

```html
<aegov-radio-group name="colour" label="Favourite colour">
  <aegov-radio label="Red" value="red"></aegov-radio>
  <aegov-radio label="Green" value="green" checked></aegov-radio>
  <aegov-radio label="Blue" value="blue"></aegov-radio>
</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-radio-group name="colour-demo" label="Favourite colour">
    <aegov-radio label="Red" value="red"></aegov-radio>
    <aegov-radio label="Green" value="green" checked></aegov-radio>
    <aegov-radio label="Blue" value="blue"></aegov-radio>
  </aegov-radio-group>
</div>

---

## Disabled State

Set the `disabled` attribute on individual radios to prevent interaction. You can also set `disabled` on the `aegov-radio-group` to disable the entire group via the native `<fieldset>` disabled mechanism.

```html
<!-- Individual disabled radio -->
<aegov-radio-group name="plan" label="Select a plan">
  <aegov-radio label="Free" value="free"></aegov-radio>
  <aegov-radio label="Pro" value="pro" disabled></aegov-radio>
  <aegov-radio label="Enterprise" value="enterprise"></aegov-radio>
</aegov-radio-group>

<!-- Entire group disabled -->
<aegov-radio-group name="locked" label="This group is disabled" disabled>
  <aegov-radio label="Option A" value="a"></aegov-radio>
  <aegov-radio label="Option B" value="b" checked></aegov-radio>
</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-radio-group name="plan-demo" label="Select a plan">
    <aegov-radio label="Free" value="free"></aegov-radio>
    <aegov-radio label="Pro" value="pro" disabled></aegov-radio>
    <aegov-radio label="Enterprise" value="enterprise"></aegov-radio>
  </aegov-radio-group>

  <aegov-radio-group name="locked-demo" label="This group is disabled" disabled>
    <aegov-radio label="Option A" value="a"></aegov-radio>
    <aegov-radio label="Option B" value="b" checked></aegov-radio>
  </aegov-radio-group>
</div>

---

## Required

Set `required` on an `aegov-radio` to mark it as a mandatory field. This adds the native `required` attribute and sets `aria-required="true"` on the underlying `<input>`.

```html
<aegov-radio name="agree" value="yes" label="I accept the privacy policy" required></aegov-radio>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-radio name="agree-demo" value="yes" label="I accept the privacy policy" required></aegov-radio>
</div>

---

## Label and Description

The `label` prop generates a visible `<label>` element associated with the native input. The optional `description` prop renders helper text below the label -- useful for explaining each option in more detail.

```html
<aegov-radio-group name="shipping" label="Shipping method">
  <aegov-radio label="Standard" description="5-7 business days" value="standard"></aegov-radio>
  <aegov-radio label="Express" description="2-3 business days" value="express"></aegov-radio>
  <aegov-radio label="Overnight" description="Next business day" value="overnight"></aegov-radio>
</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-radio-group name="shipping-demo" label="Shipping method">
    <aegov-radio label="Standard" description="5-7 business days" value="standard"></aegov-radio>
    <aegov-radio label="Express" description="2-3 business days" value="express"></aegov-radio>
    <aegov-radio label="Overnight" description="Next business day" value="overnight"></aegov-radio>
  </aegov-radio-group>
</div>

> **Note:** The `description` is only rendered when a `label` is also provided. Without a label, the radio renders as a standalone input without wrapping markup.

---

## Sizes

The `size` property controls the dimensions of the radio button, label text, and description text. Set it on the `aegov-radio-group` to apply uniformly, or on individual `aegov-radio` elements.

| Size   | Radio   | Label Font | Description Font |
|--------|---------|------------|------------------|
| `xs`   | 14px    | text-xs    | text-2xs         |
| `sm`   | 16px    | text-sm    | text-xs          |
| `base` | 18px    | text-base  | text-sm          |
| `lg`   | 20px    | text-lg    | text-base        |
| `xl`   | 22px    | text-xl    | text-lg          |

```html
<aegov-radio-group name="size-xs" label="Extra Small (xs)" size="xs">
  <aegov-radio label="Option A" value="a"></aegov-radio>
  <aegov-radio label="Option B" value="b"></aegov-radio>
</aegov-radio-group>

<aegov-radio-group name="size-sm" label="Small (sm)" size="sm">
  <aegov-radio label="Option A" value="a"></aegov-radio>
  <aegov-radio label="Option B" value="b"></aegov-radio>
</aegov-radio-group>

<aegov-radio-group name="size-base" label="Base (default)" size="base">
  <aegov-radio label="Option A" value="a"></aegov-radio>
  <aegov-radio label="Option B" value="b"></aegov-radio>
</aegov-radio-group>

<aegov-radio-group name="size-lg" label="Large (lg)" size="lg">
  <aegov-radio label="Option A" value="a"></aegov-radio>
  <aegov-radio label="Option B" value="b"></aegov-radio>
</aegov-radio-group>

<aegov-radio-group name="size-xl" label="Extra Large (xl)" size="xl">
  <aegov-radio label="Option A" value="a"></aegov-radio>
  <aegov-radio label="Option B" value="b"></aegov-radio>
</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-radio-group name="size-xs-demo" label="Extra Small (xs)" size="xs">
    <aegov-radio label="Option A" description="Helper text" value="a"></aegov-radio>
    <aegov-radio label="Option B" description="Helper text" value="b"></aegov-radio>
  </aegov-radio-group>

  <aegov-radio-group name="size-sm-demo" label="Small (sm)" size="sm">
    <aegov-radio label="Option A" description="Helper text" value="a"></aegov-radio>
    <aegov-radio label="Option B" description="Helper text" value="b"></aegov-radio>
  </aegov-radio-group>

  <aegov-radio-group name="size-base-demo" label="Base (default)" size="base">
    <aegov-radio label="Option A" description="Helper text" value="a"></aegov-radio>
    <aegov-radio label="Option B" description="Helper text" value="b"></aegov-radio>
  </aegov-radio-group>

  <aegov-radio-group name="size-lg-demo" label="Large (lg)" size="lg">
    <aegov-radio label="Option A" description="Helper text" value="a"></aegov-radio>
    <aegov-radio label="Option B" description="Helper text" value="b"></aegov-radio>
  </aegov-radio-group>

  <aegov-radio-group name="size-xl-demo" label="Extra Large (xl)" size="xl">
    <aegov-radio label="Option A" description="Helper text" value="a"></aegov-radio>
    <aegov-radio label="Option B" description="Helper text" value="b"></aegov-radio>
  </aegov-radio-group>
</div>

---

## Radio Group

The `aegov-radio-group` component wraps multiple `aegov-radio` elements, managing the shared `name`, `size`, layout orientation, and visual variant. It renders a semantic `<fieldset>` with `role="radiogroup"`.

### Orientation

The `orientation` property controls the stacking direction. The default is `vertical`. Set `orientation="horizontal"` to lay out radios in a row.

```html
<aegov-radio-group name="orient-v" label="Vertical (default)" orientation="vertical">
  <aegov-radio label="Option A" value="a"></aegov-radio>
  <aegov-radio label="Option B" value="b"></aegov-radio>
  <aegov-radio label="Option C" value="c"></aegov-radio>
</aegov-radio-group>

<aegov-radio-group name="orient-h" label="Horizontal" orientation="horizontal">
  <aegov-radio label="Option A" value="a"></aegov-radio>
  <aegov-radio label="Option B" value="b"></aegov-radio>
  <aegov-radio label="Option C" value="c"></aegov-radio>
</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-radio-group name="orient-v-demo" label="Vertical (default)" orientation="vertical">
    <aegov-radio label="Option A" value="a"></aegov-radio>
    <aegov-radio label="Option B" value="b"></aegov-radio>
    <aegov-radio label="Option C" value="c"></aegov-radio>
  </aegov-radio-group>

  <aegov-radio-group name="orient-h-demo" label="Horizontal" orientation="horizontal">
    <aegov-radio label="Option A" value="a"></aegov-radio>
    <aegov-radio label="Option B" value="b"></aegov-radio>
    <aegov-radio label="Option C" value="c"></aegov-radio>
  </aegov-radio-group>
</div>

### Group Label

The `label` property renders a `<legend>` element inside the `<fieldset>`, which is essential for accessibility. Screen readers announce the legend text as the group's name.

```html
<aegov-radio-group name="contact" label="Preferred contact method">
  <aegov-radio label="Email" value="email"></aegov-radio>
  <aegov-radio label="Phone" value="phone"></aegov-radio>
  <aegov-radio label="SMS" value="sms"></aegov-radio>
</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-radio-group name="contact-demo" label="Preferred contact method">
    <aegov-radio label="Email" value="email"></aegov-radio>
    <aegov-radio label="Phone" value="phone"></aegov-radio>
    <aegov-radio label="SMS" value="sms"></aegov-radio>
  </aegov-radio-group>
</div>

---

## Group Variants

The `variant` property on `aegov-radio-group` controls the visual presentation of the group. There are four variants available.

### Default

The standard layout with no additional styling. Radios are stacked with consistent spacing.

```html
<aegov-radio-group name="var-default" label="Default variant" variant="default">
  <aegov-radio label="Option A" value="a"></aegov-radio>
  <aegov-radio label="Option B" value="b"></aegov-radio>
  <aegov-radio label="Option C" value="c"></aegov-radio>
</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-radio-group name="var-default-demo" label="Default variant" variant="default">
    <aegov-radio label="Option A" value="a"></aegov-radio>
    <aegov-radio label="Option B" value="b"></aegov-radio>
    <aegov-radio label="Option C" value="c"></aegov-radio>
  </aegov-radio-group>
</div>

### List

Adds horizontal dividers between items, creating a clean list appearance. Dividers are rendered via CSS border on each item.

```html
<aegov-radio-group name="var-list" label="List variant" variant="list">
  <aegov-radio label="Option A" description="First option" value="a"></aegov-radio>
  <aegov-radio label="Option B" description="Second option" value="b"></aegov-radio>
  <aegov-radio label="Option C" description="Third option" value="c"></aegov-radio>
</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-radio-group name="var-list-demo" label="List variant" variant="list">
    <aegov-radio label="Option A" description="First option" value="a"></aegov-radio>
    <aegov-radio label="Option B" description="Second option" value="b"></aegov-radio>
    <aegov-radio label="Option C" description="Third option" value="c"></aegov-radio>
  </aegov-radio-group>
</div>

The list variant also works with `orientation="horizontal"`, placing vertical dividers between items instead.

```html
<aegov-radio-group name="var-list-h" label="List horizontal" variant="list" orientation="horizontal">
  <aegov-radio label="Option A" value="a"></aegov-radio>
  <aegov-radio label="Option B" value="b"></aegov-radio>
  <aegov-radio label="Option C" value="c"></aegov-radio>
</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-radio-group name="var-list-h-demo" label="List horizontal" variant="list" orientation="horizontal">
    <aegov-radio label="Option A" value="a"></aegov-radio>
    <aegov-radio label="Option B" value="b"></aegov-radio>
    <aegov-radio label="Option C" value="c"></aegov-radio>
  </aegov-radio-group>
</div>

### Cards

Wraps each radio in a bordered card. The selected card receives a highlighted border and background. Cards are ideal when each option needs more visual weight or a description.

```html
<aegov-radio-group name="var-cards" label="Cards variant" variant="cards">
  <aegov-radio label="Starter" description="For individuals just getting started" value="starter"></aegov-radio>
  <aegov-radio label="Professional" description="For growing teams and businesses" value="pro"></aegov-radio>
  <aegov-radio label="Enterprise" description="For large organisations with custom needs" value="enterprise"></aegov-radio>
</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-radio-group name="var-cards-demo" label="Cards variant" variant="cards">
    <aegov-radio label="Starter" description="For individuals just getting started" value="starter"></aegov-radio>
    <aegov-radio label="Professional" description="For growing teams and businesses" value="pro"></aegov-radio>
    <aegov-radio label="Enterprise" description="For large organisations with custom needs" value="enterprise"></aegov-radio>
  </aegov-radio-group>
</div>

### Pills

Renders radios as pill-shaped toggle buttons. The native radio input is visually hidden but remains accessible. The selected pill receives a filled background. Descriptions are hidden in this variant.

```html
<aegov-radio-group name="var-pills" label="Pills variant" variant="pills" orientation="horizontal">
  <aegov-radio label="Daily" value="daily"></aegov-radio>
  <aegov-radio label="Weekly" value="weekly" checked></aegov-radio>
  <aegov-radio label="Monthly" value="monthly"></aegov-radio>
  <aegov-radio label="Yearly" value="yearly"></aegov-radio>
</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-radio-group name="var-pills-demo" label="Pills variant" variant="pills" orientation="horizontal">
    <aegov-radio label="Daily" value="daily"></aegov-radio>
    <aegov-radio label="Weekly" value="weekly" checked></aegov-radio>
    <aegov-radio label="Monthly" value="monthly"></aegov-radio>
    <aegov-radio label="Yearly" value="yearly"></aegov-radio>
  </aegov-radio-group>
</div>

Pills also support different sizes.

```html
<aegov-radio-group name="pills-xs" label="Extra small pills" variant="pills" orientation="horizontal" size="xs">
  <aegov-radio label="S" value="s"></aegov-radio>
  <aegov-radio label="M" value="m" checked></aegov-radio>
  <aegov-radio label="L" value="l"></aegov-radio>
</aegov-radio-group>

<aegov-radio-group name="pills-sm" label="Small pills" variant="pills" orientation="horizontal" size="sm">
  <aegov-radio label="S" value="s"></aegov-radio>
  <aegov-radio label="M" value="m" checked></aegov-radio>
  <aegov-radio label="L" value="l"></aegov-radio>
</aegov-radio-group>

<aegov-radio-group name="pills-lg" label="Large pills" variant="pills" orientation="horizontal" size="lg">
  <aegov-radio label="Small" value="s"></aegov-radio>
  <aegov-radio label="Medium" value="m"></aegov-radio>
  <aegov-radio label="Large" value="l" checked></aegov-radio>
</aegov-radio-group>

<aegov-radio-group name="pills-xl" label="Extra large pills" variant="pills" orientation="horizontal" size="xl">
  <aegov-radio label="Small" value="s"></aegov-radio>
  <aegov-radio label="Medium" value="m"></aegov-radio>
  <aegov-radio label="Large" value="l" checked></aegov-radio>
</aegov-radio-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-radio-group name="pills-xs-demo" label="Extra small pills" variant="pills" orientation="horizontal" size="xs">
    <aegov-radio label="S" value="s"></aegov-radio>
    <aegov-radio label="M" value="m" checked></aegov-radio>
    <aegov-radio label="L" value="l"></aegov-radio>
  </aegov-radio-group>

  <aegov-radio-group name="pills-sm-demo" label="Small pills" variant="pills" orientation="horizontal" size="sm">
    <aegov-radio label="S" value="s"></aegov-radio>
    <aegov-radio label="M" value="m" checked></aegov-radio>
    <aegov-radio label="L" value="l"></aegov-radio>
  </aegov-radio-group>

  <aegov-radio-group name="pills-lg-demo" label="Large pills" variant="pills" orientation="horizontal" size="lg">
    <aegov-radio label="Small" value="s"></aegov-radio>
    <aegov-radio label="Medium" value="m"></aegov-radio>
    <aegov-radio label="Large" value="l" checked></aegov-radio>
  </aegov-radio-group>

  <aegov-radio-group name="pills-xl-demo" label="Extra large pills" variant="pills" orientation="horizontal" size="xl">
    <aegov-radio label="Small" value="s"></aegov-radio>
    <aegov-radio label="Medium" value="m"></aegov-radio>
    <aegov-radio label="Large" value="l" checked></aegov-radio>
  </aegov-radio-group>
</div>

---

## Usage with aegov-form-field

The `aegov-radio-group` can be placed inside an `aegov-form-field` for consistent layout with other form components. The form field provides an outer label and optional error messaging.

```html
<aegov-form-field>
  <aegov-label>Notification preference</aegov-label>
  <aegov-radio-group name="notify" orientation="horizontal">
    <aegov-radio label="Email" value="email"></aegov-radio>
    <aegov-radio label="SMS" value="sms"></aegov-radio>
    <aegov-radio label="Push" value="push"></aegov-radio>
  </aegov-radio-group>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>Notification preference</aegov-label>
    <aegov-radio-group name="notify-demo" orientation="horizontal">
      <aegov-radio label="Email" value="email"></aegov-radio>
      <aegov-radio label="SMS" value="sms"></aegov-radio>
      <aegov-radio label="Push" value="push"></aegov-radio>
    </aegov-radio-group>
  </aegov-form-field>
</div>

---

## Events

### aegovRadioChange

Emitted by an individual `aegov-radio` when its checked state changes. The event detail contains the `checked` boolean and the radio's `value`.

### aegovRadioGroupChange

Emitted by the `aegov-radio-group` when the selected radio changes. The event detail contains the `value` of the newly selected radio, or `undefined` if a radio is unchecked.

```html
<aegov-radio-group name="event-demo" label="Pick one" id="event-group">
  <aegov-radio label="Alpha" value="alpha"></aegov-radio>
  <aegov-radio label="Beta" value="beta"></aegov-radio>
  <aegov-radio label="Gamma" value="gamma"></aegov-radio>
</aegov-radio-group>

<script>
  document.getElementById('event-group')
    .addEventListener('aegovRadioGroupChange', (e) => {
      console.log('Selected value:', e.detail.value);
    });
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-radio-group name="event-real-demo" label="Pick one" id="radio-event-group">
    <aegov-radio label="Alpha" value="alpha"></aegov-radio>
    <aegov-radio label="Beta" value="beta"></aegov-radio>
    <aegov-radio label="Gamma" value="gamma"></aegov-radio>
  </aegov-radio-group>
  <p class="mt-3 text-sm text-aeblack-500" id="radio-event-log">Selected: <em>none</em></p>
  <script>
    document.getElementById('radio-event-group')
      .addEventListener('aegovRadioGroupChange', function(e) {
        document.getElementById('radio-event-log').innerHTML =
          'Selected: <strong>' + (e.detail.value || 'none') + '</strong>';
      });
  </script>
</div>

---

## RTL Support

The component fully supports right-to-left layouts. When the document or a parent element has `dir="rtl"`, labels, descriptions, and spacing automatically mirror. The hover highlight on the radio also respects the logical `start` direction.

```html
<div dir="rtl">
  <aegov-radio-group name="rtl-demo" label="اختر خيارا">
    <aegov-radio label="الخيار الأول" description="وصف الخيار الأول" value="first"></aegov-radio>
    <aegov-radio label="الخيار الثاني" description="وصف الخيار الثاني" value="second"></aegov-radio>
    <aegov-radio label="الخيار الثالث" value="third"></aegov-radio>
  </aegov-radio-group>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-radio-group name="rtl-real-demo" label="اختر خيارا">
    <aegov-radio label="الخيار الأول" description="وصف الخيار الأول" value="first"></aegov-radio>
    <aegov-radio label="الخيار الثاني" description="وصف الخيار الثاني" value="second"></aegov-radio>
    <aegov-radio label="الخيار الثالث" value="third"></aegov-radio>
  </aegov-radio-group>
</div>

No additional configuration is needed -- the component reads the inherited `dir` attribute and adjusts automatically.

---

## API Reference

### aegov-radio Properties

| Property      | Attribute      | Description                                                                 | Type                            | Default     |
|---------------|----------------|-----------------------------------------------------------------------------|---------------------------------|-------------|
| `fieldId`     | `field-id`     | Unique ID for the native radio element. Auto-generated if not provided.     | `string`                        | auto        |
| `name`        | `name`         | The name attribute for the radio. Required for native radio grouping.       | `string`                        | `undefined` |
| `value`       | `value`        | The value attribute for the radio.                                          | `string`                        | `undefined` |
| `checked`     | `checked`      | Whether the radio is checked.                                               | `boolean`                       | `false`     |
| `size`        | `size`         | The size of the radio.                                                      | `'xs'` \| `'sm'` \| `'base'` \| `'lg'` \| `'xl'`   | `'base'`    |
| `disabled`    | `disabled`     | Whether the radio is disabled.                                              | `boolean`                       | `false`     |
| `required`    | `required`     | Whether the radio is required.                                              | `boolean`                       | `false`     |
| `label`       | `label`        | Label text for the radio. Generates an associated `<label>` element.        | `string`                        | `undefined` |
| `description` | `description`  | Description text displayed below the label. Only shown when label exists.   | `string`                        | `undefined` |
| `class`       | `class`        | Additional CSS classes to apply.                                            | `string`                        | `undefined` |

### aegov-radio Events

| Event              | Description                                        | Detail Type                                   |
|--------------------|----------------------------------------------------|-----------------------------------------------|
| `aegovRadioChange` | Emitted when the radio checked state changes.      | `{ checked: boolean; value?: string }`        |

### aegov-radio-group Properties

| Property      | Attribute      | Description                                                                 | Type                                                  | Default      |
|---------------|----------------|-----------------------------------------------------------------------------|-------------------------------------------------------|--------------|
| `variant`     | `variant`      | Visual variant for the group layout.                                        | `'default'` \| `'list'` \| `'cards'` \| `'pills'`    | `'default'`  |
| `orientation` | `orientation`  | Stack direction for radio items.                                            | `'vertical'` \| `'horizontal'`                        | `'vertical'` |
| `label`       | `label`        | Optional label rendered as a `<legend>` for accessibility.                  | `string`                                              | `undefined`  |
| `size`        | `size`         | Size of all radios in the group. Propagated to children.                    | `'xs'` \| `'sm'` \| `'base'` \| `'lg'` \| `'xl'`    | `'base'`     |
| `name`        | `name`         | The name shared by all radios in the group. Required.                       | `string`                                              | --           |
| `disabled`    | `disabled`     | Disables all radios within the group via native fieldset disabled.          | `boolean`                                             | `false`      |
| `class`       | `class`        | Additional CSS classes to apply.                                            | `string`                                              | `undefined`  |

### aegov-radio-group Events

| Event                   | Description                                                         | Detail Type                          |
|-------------------------|---------------------------------------------------------------------|--------------------------------------|
| `aegovRadioGroupChange` | Emitted when the selected radio changes. Contains the value.        | `{ value: string \| undefined }`     |

### Pass-Through Attributes

The `aegov-radio` component forwards `aria-*`, `data-*`, `form`, `tabindex`, `autofocus`, and `title` attributes from the host element to the inner native `<input>`.

```html
<aegov-radio name="demo" value="x" label="Option" aria-label="Custom label" data-analytics="radio-option"></aegov-radio>
```

---

## Accessibility

The `aegov-radio` and `aegov-radio-group` components are built with accessibility as a first-class concern.

### Built-in Features

- **Native `<input type="radio">`** -- renders a semantic HTML radio inside the component, which is keyboard-focusable and announced correctly by screen readers.
- **`<fieldset>` and `<legend>`** -- the radio group renders a `<fieldset>` with `role="radiogroup"` and a `<legend>` when a `label` is provided, giving screen readers full context about the group.
- **`aria-required`** -- automatically set to `"true"` when the radio has the `required` property.
- **`aria-describedby`** -- when a `description` is provided, the input is linked to the description text for screen reader announcement.
- **Label association** -- when the `label` prop is set, the label text and input are wrapped in a `<label>` element for implicit association.
- **Focus indicators** -- clearly visible focus rings are applied on keyboard navigation via the `focus:outline` styles using the primary-support colour.
- **Disabled state** -- applies `pointer-events: none` and reduces opacity so the radio is both visually and functionally inert.
- **Native keyboard behaviour** -- arrow keys move selection between radios in the same group, Tab moves focus in and out of the group.

### Developer Responsibilities

1. **Always provide a `label` or external `<label>`.** Every radio needs an accessible name. Use the `label` prop or associate an external `<label>` element via the `fieldId` attribute.

2. **Use `label` on `aegov-radio-group`.** The group's `label` renders a `<legend>` inside the `<fieldset>`. Without it, screen readers cannot announce the purpose of the group.

3. **Do not remove focus styles.** The built-in focus outlines are essential for keyboard navigation. Avoid overriding them with `outline: none`.

4. **Colour contrast.** All built-in colour combinations meet WCAG 2.1 AA contrast ratios. If you override colours via custom CSS, verify that the new colours maintain at least a **4.5:1** contrast ratio for text and **3:1** for non-text elements.

---

## Notes

- The `aegov-radio-group` component automatically propagates `name` and `size` to all child `aegov-radio` elements. You do not need to set them individually when using a group.
- The group listens for `aegovRadioChange` events from children and unchecks all other radios when one is selected, keeping the Stencil component state in sync with the native DOM state.
- In the **pills** variant, the native radio input is visually hidden using accessible hiding techniques (not `display: none`), so it remains focusable and operable via keyboard.
- In the **pills** variant, description text is hidden via CSS. Only the label text is displayed.
- In the **cards** variant, the selected card receives a `primary-600` border and `primary-50` background, providing clear visual feedback.
- The `disabled` prop on `aegov-radio-group` leverages the native `<fieldset disabled>` mechanism, which disables all form controls within it without needing JavaScript.
- The `name` property on `aegov-radio-group` is required (indicated by `!` in the component source). Ensure you always provide it for correct radio grouping behaviour.
- Each `aegov-radio` auto-generates a unique ID (prefixed `aegov-radio-`) when `fieldId` is not explicitly provided.
