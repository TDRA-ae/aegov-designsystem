# Checkbox

<p class="text-lg text-aeblack-500 mb-8">A checkbox allows users to select one or more options from a set, or toggle a single option on and off. Checkboxes support labels, descriptions, indeterminate state, and can be grouped with shared behaviour.</p>

## Introduction

The `aegov-checkbox` component renders a styled native `<input type="checkbox">` with optional label text, description, and full accessibility support. When used inside an `aegov-checkbox-group`, checkboxes gain shared sizing, orientation control, group-level events, and advanced layout variants including cards and pills.

```html
<aegov-checkbox label="I agree to the terms and conditions"></aegov-checkbox>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-checkbox label="I agree to the terms and conditions"></aegov-checkbox>
</div>

---

## Checked State

Set the `checked` attribute to pre-select a checkbox. The property is mutable and reflects back to the attribute when toggled by the user.

```html
<aegov-checkbox label="Email notifications" is-checked></aegov-checkbox>
<aegov-checkbox label="SMS notifications"></aegov-checkbox>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-checkbox label="Email notifications" is-checked></aegov-checkbox>
  <aegov-checkbox label="SMS notifications"></aegov-checkbox>
</div>

---

## Indeterminate State

The `indeterminate` property displays a horizontal dash instead of a checkmark. This is typically used on a "check all" controller when only some children are checked. The indeterminate state is cleared automatically when the user clicks the checkbox.

```html
<aegov-checkbox label="Select all items" is-indeterminate></aegov-checkbox>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-checkbox label="Select all items" is-indeterminate></aegov-checkbox>
</div>

---

## Sizes

The `size` property controls the dimensions of the checkbox indicator, label font size, and description font size. Five sizes are available.

| Size   | Checkbox | Label Font | Description Font |
|--------|----------|------------|------------------|
| `xs`   | 14px     | text-xs    | text-xs          |
| `sm`   | 16px     | text-sm    | text-xs          |
| `base` | 18px     | text-base  | text-sm          |
| `lg`   | 20px     | text-lg    | text-base        |
| `xl`   | 22px     | text-xl    | text-lg          |

```html
<aegov-checkbox size="xs" label="Extra small checkbox"></aegov-checkbox>
<aegov-checkbox size="sm" label="Small checkbox"></aegov-checkbox>
<aegov-checkbox size="base" label="Base checkbox (default)"></aegov-checkbox>
<aegov-checkbox size="lg" label="Large checkbox"></aegov-checkbox>
<aegov-checkbox size="xl" label="Extra large checkbox"></aegov-checkbox>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-checkbox size="xs" label="Extra small checkbox"></aegov-checkbox>
  <aegov-checkbox size="sm" label="Small checkbox"></aegov-checkbox>
  <aegov-checkbox size="base" label="Base checkbox (default)"></aegov-checkbox>
  <aegov-checkbox size="lg" label="Large checkbox"></aegov-checkbox>
  <aegov-checkbox size="xl" label="Extra large checkbox"></aegov-checkbox>
</div>

### Responsive Size

The `size` prop accepts Tailwind-style responsive prefixes. Write a space-separated string where each token is either a plain value or `breakpoint:value`. The base value (no prefix) applies below the smallest specified breakpoint.

Available breakpoints: `xs` (480px), `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px), `3xl` (1680px).

```html
<aegov-checkbox size="sm xl:lg" label="Responsive checkbox"></aegov-checkbox>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-checkbox size="sm xl:lg" label="Responsive checkbox"></aegov-checkbox>
</div>

> **Graceful degradation:** Unknown breakpoint names and invalid values are silently ignored. An unrecognised base value falls back to the component default.

---

## Label and Description

When the `label` property is provided, the component renders a `<label>` element wrapping both the checkbox and the text. The optional `description` property adds helper text below the label, linked via `aria-describedby`.

```html
<aegov-checkbox
  label="Marketing emails"
  description="Receive updates about new features and promotions.">
</aegov-checkbox>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-checkbox label="Marketing emails" description="Receive updates about new features and promotions."></aegov-checkbox>
</div>

Without a label, the component renders only the bare checkbox input. Use this when providing your own external label.

```html
<aegov-checkbox></aegov-checkbox>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-checkbox></aegov-checkbox>
</div>

---

## Disabled State

Set the `disabled` attribute to prevent interaction. The checkbox and its label become visually muted and unclickable.

```html
<aegov-checkbox label="Unchecked disabled" is-disabled></aegov-checkbox>
<aegov-checkbox label="Checked disabled" is-checked is-disabled></aegov-checkbox>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-checkbox label="Unchecked disabled" is-disabled></aegov-checkbox>
  <aegov-checkbox label="Checked disabled" is-checked is-disabled></aegov-checkbox>
</div>

---

## Required

Set the `required` attribute for form validation. The component adds `aria-required="true"` to the native checkbox input.

```html
<aegov-checkbox label="I accept the privacy policy" is-required></aegov-checkbox>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-checkbox label="I accept the privacy policy" is-required></aegov-checkbox>
</div>

---

## Checkbox Group

The `aegov-checkbox-group` component wraps multiple `aegov-checkbox` elements, providing shared sizing, orientation, layout variants, and a single group-level change event.

### Basic Vertical Group

By default, checkboxes stack vertically with a gap between each item.

```html
<aegov-checkbox-group label="Preferred contact methods">
  <aegov-checkbox label="Email" value="email"></aegov-checkbox>
  <aegov-checkbox label="Phone" value="phone"></aegov-checkbox>
  <aegov-checkbox label="SMS" value="sms"></aegov-checkbox>
</aegov-checkbox-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-checkbox-group label="Preferred contact methods">
    <aegov-checkbox label="Email" value="email"></aegov-checkbox>
    <aegov-checkbox label="Phone" value="phone"></aegov-checkbox>
    <aegov-checkbox label="SMS" value="sms"></aegov-checkbox>
  </aegov-checkbox-group>
</div>

### Horizontal Orientation

Set `orientation="horizontal"` to lay out checkboxes in a row. Items wrap to the next line when space runs out.

```html
<aegov-checkbox-group label="Select your interests" orientation="horizontal">
  <aegov-checkbox label="Technology" value="tech"></aegov-checkbox>
  <aegov-checkbox label="Design" value="design"></aegov-checkbox>
  <aegov-checkbox label="Business" value="business"></aegov-checkbox>
  <aegov-checkbox label="Science" value="science"></aegov-checkbox>
</aegov-checkbox-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-checkbox-group label="Select your interests" orientation="horizontal">
    <aegov-checkbox label="Technology" value="tech"></aegov-checkbox>
    <aegov-checkbox label="Design" value="design"></aegov-checkbox>
    <aegov-checkbox label="Business" value="business"></aegov-checkbox>
    <aegov-checkbox label="Science" value="science"></aegov-checkbox>
  </aegov-checkbox-group>
</div>

---

## Group Variants

The `variant` property on the group controls the visual layout of its children. Four variants are available.

### Default

The standard layout with no additional styling. Checkboxes are stacked with a gap.

```html
<aegov-checkbox-group label="Notifications" variant="default">
  <aegov-checkbox label="Email" value="email" is-checked></aegov-checkbox>
  <aegov-checkbox label="Push" value="push"></aegov-checkbox>
  <aegov-checkbox label="SMS" value="sms"></aegov-checkbox>
</aegov-checkbox-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-checkbox-group label="Notifications" variant="default">
    <aegov-checkbox label="Email" value="email" is-checked></aegov-checkbox>
    <aegov-checkbox label="Push" value="push"></aegov-checkbox>
    <aegov-checkbox label="SMS" value="sms"></aegov-checkbox>
  </aegov-checkbox-group>
</div>

### List

Adds dividers between items. When horizontal, dividers appear as vertical separators between items instead.

```html
<aegov-checkbox-group label="Languages" variant="list">
  <aegov-checkbox label="English" value="en" is-checked></aegov-checkbox>
  <aegov-checkbox label="Arabic" value="ar"></aegov-checkbox>
  <aegov-checkbox label="French" value="fr"></aegov-checkbox>
  <aegov-checkbox label="Hindi" value="hi"></aegov-checkbox>
</aegov-checkbox-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-checkbox-group label="Languages" variant="list">
    <aegov-checkbox label="English" value="en" is-checked></aegov-checkbox>
    <aegov-checkbox label="Arabic" value="ar"></aegov-checkbox>
    <aegov-checkbox label="French" value="fr"></aegov-checkbox>
    <aegov-checkbox label="Hindi" value="hi"></aegov-checkbox>
  </aegov-checkbox-group>
</div>

Horizontal list variant:

```html
<aegov-checkbox-group label="Languages" variant="list" orientation="horizontal">
  <aegov-checkbox label="English" value="en" is-checked></aegov-checkbox>
  <aegov-checkbox label="Arabic" value="ar"></aegov-checkbox>
  <aegov-checkbox label="French" value="fr"></aegov-checkbox>
</aegov-checkbox-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-checkbox-group label="Languages" variant="list" orientation="horizontal">
    <aegov-checkbox label="English" value="en" is-checked></aegov-checkbox>
    <aegov-checkbox label="Arabic" value="ar"></aegov-checkbox>
    <aegov-checkbox label="French" value="fr"></aegov-checkbox>
  </aegov-checkbox-group>
</div>

### Cards

Wraps each checkbox in a bordered card with padding. Selected cards receive a highlighted border and background. The `check-all` checkbox is excluded from card styling and spans full width.

```html
<aegov-checkbox-group label="Select a plan" variant="cards">
  <aegov-checkbox label="Basic" value="basic" description="Free forever"></aegov-checkbox>
  <aegov-checkbox label="Pro" value="pro" description="$9/month" is-checked></aegov-checkbox>
  <aegov-checkbox label="Enterprise" value="enterprise" description="Contact us"></aegov-checkbox>
</aegov-checkbox-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-checkbox-group label="Select a plan" variant="cards">
    <aegov-checkbox label="Basic" value="basic" description="Free forever"></aegov-checkbox>
    <aegov-checkbox label="Pro" value="pro" description="$9/month" is-checked></aegov-checkbox>
    <aegov-checkbox label="Enterprise" value="enterprise" description="Contact us"></aegov-checkbox>
  </aegov-checkbox-group>
</div>

Horizontal cards:

```html
<aegov-checkbox-group label="Features" variant="cards" orientation="horizontal">
  <aegov-checkbox label="Analytics" value="analytics"></aegov-checkbox>
  <aegov-checkbox label="Reporting" value="reporting" is-checked></aegov-checkbox>
  <aegov-checkbox label="Exports" value="exports"></aegov-checkbox>
</aegov-checkbox-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-checkbox-group label="Features" variant="cards" orientation="horizontal">
    <aegov-checkbox label="Analytics" value="analytics"></aegov-checkbox>
    <aegov-checkbox label="Reporting" value="reporting" is-checked></aegov-checkbox>
    <aegov-checkbox label="Exports" value="exports"></aegov-checkbox>
  </aegov-checkbox-group>
</div>

### Pills

Transforms checkboxes into pill-shaped toggle buttons. The native checkbox input is visually hidden and the label becomes the clickable pill. Descriptions are hidden in this variant.

```html
<aegov-checkbox-group label="Tags" variant="pills" orientation="horizontal">
  <aegov-checkbox label="JavaScript" value="js" is-checked></aegov-checkbox>
  <aegov-checkbox label="TypeScript" value="ts"></aegov-checkbox>
  <aegov-checkbox label="Python" value="py"></aegov-checkbox>
  <aegov-checkbox label="Rust" value="rs"></aegov-checkbox>
</aegov-checkbox-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-checkbox-group label="Tags" variant="pills" orientation="horizontal">
    <aegov-checkbox label="JavaScript" value="js" is-checked></aegov-checkbox>
    <aegov-checkbox label="TypeScript" value="ts"></aegov-checkbox>
    <aegov-checkbox label="Python" value="py"></aegov-checkbox>
    <aegov-checkbox label="Rust" value="rs"></aegov-checkbox>
  </aegov-checkbox-group>
</div>

---

## Check All / Select All

Add the `check-all` attribute to one checkbox inside a group to make it act as a "select all" controller. When clicked, it toggles all non-disabled checkboxes in the group. The parent group automatically manages the controller's indeterminate state based on the checked status of its siblings.

```html
<aegov-checkbox-group label="Permissions">
  <aegov-checkbox label="Select all" is-check-all></aegov-checkbox>
  <aegov-checkbox label="Read" value="read" is-checked></aegov-checkbox>
  <aegov-checkbox label="Write" value="write"></aegov-checkbox>
  <aegov-checkbox label="Delete" value="delete"></aegov-checkbox>
</aegov-checkbox-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-checkbox-group label="Permissions">
    <aegov-checkbox label="Select all" is-check-all></aegov-checkbox>
    <aegov-checkbox label="Read" value="read" is-checked></aegov-checkbox>
    <aegov-checkbox label="Write" value="write"></aegov-checkbox>
    <aegov-checkbox label="Delete" value="delete"></aegov-checkbox>
  </aegov-checkbox-group>
</div>

The check-all checkbox transitions between three visual states:

- **Unchecked** — no children are checked
- **Indeterminate** (dash icon) — some children are checked
- **Checked** — all non-disabled children are checked

---

## Group Size

The `size` property on the group propagates to all child checkboxes, overriding any individual size.

```html
<aegov-checkbox-group label="Extra small group" size="xs">
  <aegov-checkbox label="Option A" value="a"></aegov-checkbox>
  <aegov-checkbox label="Option B" value="b"></aegov-checkbox>
</aegov-checkbox-group>

<aegov-checkbox-group label="Small group" size="sm">
  <aegov-checkbox label="Option A" value="a"></aegov-checkbox>
  <aegov-checkbox label="Option B" value="b"></aegov-checkbox>
</aegov-checkbox-group>

<aegov-checkbox-group label="Large group" size="lg">
  <aegov-checkbox label="Option A" value="a"></aegov-checkbox>
  <aegov-checkbox label="Option B" value="b"></aegov-checkbox>
</aegov-checkbox-group>

<aegov-checkbox-group label="Extra large group" size="xl">
  <aegov-checkbox label="Option A" value="a"></aegov-checkbox>
  <aegov-checkbox label="Option B" value="b"></aegov-checkbox>
</aegov-checkbox-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-checkbox-group label="Extra small group" size="xs">
    <aegov-checkbox label="Option A" value="a"></aegov-checkbox>
    <aegov-checkbox label="Option B" value="b"></aegov-checkbox>
  </aegov-checkbox-group>
  <aegov-checkbox-group label="Small group" size="sm">
    <aegov-checkbox label="Option A" value="a"></aegov-checkbox>
    <aegov-checkbox label="Option B" value="b"></aegov-checkbox>
  </aegov-checkbox-group>
  <aegov-checkbox-group label="Large group" size="lg">
    <aegov-checkbox label="Option A" value="a"></aegov-checkbox>
    <aegov-checkbox label="Option B" value="b"></aegov-checkbox>
  </aegov-checkbox-group>
  <aegov-checkbox-group label="Extra large group" size="xl">
    <aegov-checkbox label="Option A" value="a"></aegov-checkbox>
    <aegov-checkbox label="Option B" value="b"></aegov-checkbox>
  </aegov-checkbox-group>
</div>

---

## Disabled Group

Set `disabled` on the group to disable the entire fieldset, preventing interaction with all child checkboxes.

```html
<aegov-checkbox-group label="Disabled group" is-disabled>
  <aegov-checkbox label="Option A" value="a" is-checked></aegov-checkbox>
  <aegov-checkbox label="Option B" value="b"></aegov-checkbox>
  <aegov-checkbox label="Option C" value="c"></aegov-checkbox>
</aegov-checkbox-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-checkbox-group label="Disabled group" is-disabled>
    <aegov-checkbox label="Option A" value="a" is-checked></aegov-checkbox>
    <aegov-checkbox label="Option B" value="b"></aegov-checkbox>
    <aegov-checkbox label="Option C" value="c"></aegov-checkbox>
  </aegov-checkbox-group>
</div>

---

## Usage with Form Field

Wrap a checkbox group inside `aegov-form-field` to add a shared label, error messaging, and consistent spacing with other form elements.

```html
<aegov-form-field>
  <aegov-label>Dietary restrictions</aegov-label>
  <aegov-checkbox-group>
    <aegov-checkbox label="Vegetarian" value="vegetarian"></aegov-checkbox>
    <aegov-checkbox label="Vegan" value="vegan"></aegov-checkbox>
    <aegov-checkbox label="Gluten-free" value="gluten-free"></aegov-checkbox>
  </aegov-checkbox-group>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>Dietary restrictions</aegov-label>
    <aegov-checkbox-group>
      <aegov-checkbox label="Vegetarian" value="vegetarian"></aegov-checkbox>
      <aegov-checkbox label="Vegan" value="vegan"></aegov-checkbox>
      <aegov-checkbox label="Gluten-free" value="gluten-free"></aegov-checkbox>
    </aegov-checkbox-group>
  </aegov-form-field>
</div>

---

## Events

### aegovCheckboxChange

Emitted by an individual `aegov-checkbox` when its checked state changes. The event detail contains the new `checked` boolean and the checkbox `value`.

```html
<aegov-checkbox id="terms-cb" label="Accept terms" value="terms"></aegov-checkbox>

<script>
  document.getElementById('terms-cb')
    .addEventListener('aegovCheckboxChange', (e) => {
      console.log('Checked:', e.detail.checked);
      console.log('Value:', e.detail.value);
    });
</script>
```

### aegovCheckboxGroupChange

Emitted by `aegov-checkbox-group` whenever any child checkbox changes. The event detail contains an array of all currently checked `values` (strings). The check-all checkbox's value is excluded from this array.

```html
<aegov-checkbox-group id="interests-group" label="Interests">
  <aegov-checkbox label="Music" value="music"></aegov-checkbox>
  <aegov-checkbox label="Sports" value="sports"></aegov-checkbox>
  <aegov-checkbox label="Travel" value="travel"></aegov-checkbox>
</aegov-checkbox-group>

<script>
  document.getElementById('interests-group')
    .addEventListener('aegovCheckboxGroupChange', (e) => {
      console.log('Selected values:', e.detail.values);
    });
</script>
```

---

## RTL Support

The component fully supports right-to-left layouts. When the document or a parent element has `dir="rtl"`, the checkbox, label, and description mirror automatically. The hover ripple effect uses logical properties (`start`) so it centres correctly in both directions.

```html
<div dir="rtl">
  <aegov-checkbox-group label="اختر اللغات">
    <aegov-checkbox label="العربية" value="ar" is-checked></aegov-checkbox>
    <aegov-checkbox label="الإنجليزية" value="en"></aegov-checkbox>
    <aegov-checkbox label="الفرنسية" value="fr"></aegov-checkbox>
  </aegov-checkbox-group>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-checkbox-group label="اختر اللغات">
    <aegov-checkbox label="العربية" value="ar" is-checked></aegov-checkbox>
    <aegov-checkbox label="الإنجليزية" value="en"></aegov-checkbox>
    <aegov-checkbox label="الفرنسية" value="fr"></aegov-checkbox>
  </aegov-checkbox-group>
</div>

---

## API Reference

### aegov-checkbox Properties

| Property        | Attribute       | Description                                                                 | Type                             | Default     |
|-----------------|-----------------|-----------------------------------------------------------------------------|----------------------------------|-------------|
| `fieldId`       | `field-id`      | Unique ID for the native checkbox. Auto-generated if not provided.          | `string`                         | auto        |
| `name`          | `name`          | The name attribute for the checkbox.                                        | `string`                         | `undefined` |
| `value`         | `value`         | The value attribute for the checkbox.                                       | `string`                         | `undefined` |
| `isChecked`       | `is-checked`       | Whether the checkbox is checked.                                            | `boolean`                        | `false`     |
| `size`          | `size`          | The size of the checkbox. Supports responsive strings (e.g. `'sm xl:lg'`). | `'xs'` \| `'sm'` \| `'base'` \| `'lg'` \| `'xl'` | `'base'`    |
| `isDisabled`      | `is-disabled`      | Whether the checkbox is disabled.                                           | `boolean`                        | `false`     |
| `isRequired`      | `is-required`      | Whether the checkbox is required for form validation.                       | `boolean`                        | `false`     |
| `label`         | `label`         | Label text. When provided, wraps checkbox and text in a `<label>`.          | `string`                         | `undefined` |
| `description`   | `description`   | Helper text below the label. Only rendered when `label` is also provided.   | `string`                         | `undefined` |
| `isCheckAll`      | `is-check-all`     | Marks as a "check all" controller within a checkbox group.                  | `boolean`                        | `false`     |
| `isIndeterminate` | `is-indeterminate` | Displays the indeterminate dash icon. Managed by the parent group.          | `boolean`                        | `false`     |
| `class`         | `class`         | Additional CSS classes to apply to the wrapper.                             | `string`                         | `undefined` |

### aegov-checkbox Events

| Event                  | Description                                        | Detail Type                              |
|------------------------|----------------------------------------------------|------------------------------------------|
| `aegovCheckboxChange`  | Emitted when the checked state changes.            | `{ checked: boolean; value?: string }`   |

### aegov-checkbox-group Properties

| Property      | Attribute     | Description                                                                 | Type                                            | Default      |
|---------------|---------------|-----------------------------------------------------------------------------|-------------------------------------------------|--------------|
| `variant`     | `variant`     | Visual layout variant for the group.                                        | `'default'` \| `'list'` \| `'cards'` \| `'pills'` | `'default'`  |
| `orientation` | `orientation` | Stack direction for checkbox items.                                         | `'vertical'` \| `'horizontal'`                  | `'vertical'` |
| `label`       | `label`       | Optional label rendered as a `<legend>` for accessibility.                  | `string`                                        | `undefined`  |
| `size`        | `size`        | Size of all checkboxes in the group. Propagated to children. Supports responsive strings (e.g. `'sm xl:lg'`). | `'xs'` \| `'sm'` \| `'base'` \| `'lg'` \| `'xl'` | `'base'`     |
| `isDisabled`    | `is-disabled`    | Disables all checkboxes within the group via native fieldset disabled.      | `boolean`                                       | `false`      |
| `class`       | `class`       | Additional CSS classes to apply.                                            | `string`                                        | `undefined`  |

### aegov-checkbox-group Events

| Event                       | Description                                                        | Detail Type              |
|-----------------------------|--------------------------------------------------------------------|--------------------------|
| `aegovCheckboxGroupChange`  | Emitted when any child checkbox changes. Contains checked values.  | `{ values: string[] }`   |

### Pass-Through Attributes

The `aegov-checkbox` component forwards `aria-*`, `data-*`, `form`, `tabindex`, `autofocus`, and `title` attributes from the host element to the native `<input type="checkbox">`.

```html
<aegov-checkbox label="Subscribe" aria-label="Subscribe to newsletter" data-tracking="signup-cb"></aegov-checkbox>
```

---

## Accessibility

The `aegov-checkbox` component is built with accessibility as a first-class concern.

### Built-in Features

- **Native `<input type="checkbox">`** — renders a semantic HTML checkbox that is keyboard-focusable and announced correctly by screen readers.
- **`<label>` association** — when the `label` prop is provided, the checkbox is wrapped in a `<label>` element, creating an implicit association. Clicking the label text toggles the checkbox.
- **`aria-required`** — automatically set to `"true"` when the `required` prop is enabled.
- **`aria-describedby`** — when a `description` is provided, it is linked to the checkbox via `aria-describedby` so screen readers announce the helper text.
- **Indeterminate state** — the `indeterminate` property is set programmatically on the native input element, which assistive technologies announce as "mixed".
- **Focus indicators** — clearly visible focus rings using `focus:outline` styles with the primary support colour.
- **Disabled state** — applies reduced opacity and `pointer-events: none` so the checkbox is both visually and functionally inert. The native `disabled` attribute is set on the input.
- **Fieldset and legend** — the `aegov-checkbox-group` uses a native `<fieldset>` and `<legend>` for proper group semantics, allowing screen readers to announce the group label.

### Developer Responsibilities

1. **Provide a label for every checkbox.** Either use the `label` prop or associate an external `<label>` element with the checkbox's `fieldId`. A checkbox without any label is inaccessible to screen reader users.

2. **Use the group `label` prop.** When checkboxes are related, wrap them in `aegov-checkbox-group` with a descriptive `label` to create proper `<fieldset>` + `<legend>` semantics.

3. **Do not remove focus styles.** The built-in focus outlines are essential for keyboard navigation. Avoid overriding them with `outline: none`.

4. **Colour contrast.** All built-in colour combinations meet WCAG 2.1 AA contrast ratios. If you override colours, verify that the new colours maintain at least a **4.5:1** contrast ratio.

---

## Notes

- The `aegov-checkbox` component renders a native `<input type="checkbox">` internally. It does **not** use Shadow DOM, so styles from the design system CSS file apply directly.
- The `checked` property is mutable and reflects. When the user toggles the checkbox, the attribute on the host element updates to match.
- The `indeterminate` state is not an HTML attribute — it can only be set via JavaScript. The component handles this through the `indeterminate` prop and applies it to the native input in `componentDidRender()`.
- Inside a group with `variant="pills"`, the native checkbox is visually hidden (using `clip-path`) and the label becomes a clickable pill button. Description text is hidden in this variant.
- Inside a group with `variant="cards"`, the `check-all` checkbox is excluded from card styling and always spans the full width of the group.
- The `check-all` checkbox does not affect disabled children. Only non-disabled checkboxes are toggled when the select-all controller is clicked.
- The group's `aegovCheckboxGroupChange` event only includes values from regular checkboxes — the check-all checkbox's value is excluded from the emitted array.
- The group propagates its `size` to all child checkboxes on load and whenever the size changes. Individual `size` props on children are overridden by the group.
- The `fieldId` prop is auto-generated using a module-level counter if not provided. To control the ID explicitly (e.g. for external label association), pass `field-id="my-id"`.
