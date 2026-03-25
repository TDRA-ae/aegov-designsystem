# Select

<p class="text-lg text-aeblack-500 mb-8">A select component lets users choose one or more options from a predefined list. It supports a native browser select for simple use cases and a custom listbox variant with search, multiple selection, clearable state, and grouped options.</p>

## Introduction

The `aegov-select` component provides a flexible dropdown selection interface. In its **default** variant it renders a native HTML `<select>` element for maximum browser compatibility and accessibility. The **listbox** variant renders a custom dropdown with keyboard navigation, search filtering, multiple selection, option groups, and a clear button.

Options are defined declaratively using `aegov-select-option` child elements, and can be organised into labelled groups with `aegov-select-option-group`.

```html
<aegov-select placeholder="Choose a country">
  <aegov-select-option value="ae">United Arab Emirates</aegov-select-option>
  <aegov-select-option value="sa">Saudi Arabia</aegov-select-option>
  <aegov-select-option value="om">Oman</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-select placeholder="Choose a country">
    <aegov-select-option value="ae">United Arab Emirates</aegov-select-option>
    <aegov-select-option value="sa">Saudi Arabia</aegov-select-option>
    <aegov-select-option value="om">Oman</aegov-select-option>
  </aegov-select>
</div>

---

## Variants

### Default (Native Select)

The default variant renders a native `<select>` element styled to match the design system. This is the recommended choice for simple, single-selection use cases where you want maximum browser compatibility and built-in mobile optimisation.

```html
<aegov-select placeholder="Select a fruit">
  <aegov-select-option value="apple">Apple</aegov-select-option>
  <aegov-select-option value="banana">Banana</aegov-select-option>
  <aegov-select-option value="cherry">Cherry</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-select placeholder="Select a fruit">
    <aegov-select-option value="apple">Apple</aegov-select-option>
    <aegov-select-option value="banana">Banana</aegov-select-option>
    <aegov-select-option value="cherry">Cherry</aegov-select-option>
  </aegov-select>
</div>

### Listbox (Custom Dropdown)

Set `variant="listbox"` to render a custom dropdown with enhanced features: keyboard navigation, a chevron indicator that rotates when open, and a selected-option checkmark.

```html
<aegov-select variant="listbox" placeholder="Select a city">
  <aegov-select-option value="abudhabi">Abu Dhabi</aegov-select-option>
  <aegov-select-option value="dubai">Dubai</aegov-select-option>
  <aegov-select-option value="sharjah">Sharjah</aegov-select-option>
  <aegov-select-option value="ajman">Ajman</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-select variant="listbox" placeholder="Select a city">
    <aegov-select-option value="abudhabi">Abu Dhabi</aegov-select-option>
    <aegov-select-option value="dubai">Dubai</aegov-select-option>
    <aegov-select-option value="sharjah">Sharjah</aegov-select-option>
    <aegov-select-option value="ajman">Ajman</aegov-select-option>
  </aegov-select>
</div>

---

## Sizes

The `size` property controls the height, padding, and font size of the select trigger. Five sizes are available, matching `aegov-input` heights for consistent form layouts.

| Size   | Height | Font Size |
|--------|--------|-----------|
| `xs`   | 36px   | 14px      |
| `sm`   | 40px   | 14px      |
| `base` | 44px   | 16px      |
| `lg`   | 48px   | 18px      |
| `xl`   | 52px   | 18px      |

```html
<aegov-select size="xs" placeholder="Extra Small" variant="listbox">
  <aegov-select-option value="a">Option A</aegov-select-option>
  <aegov-select-option value="b">Option B</aegov-select-option>
</aegov-select>

<aegov-select size="sm" placeholder="Small" variant="listbox">
  <aegov-select-option value="a">Option A</aegov-select-option>
  <aegov-select-option value="b">Option B</aegov-select-option>
</aegov-select>

<aegov-select size="base" placeholder="Base (default)" variant="listbox">
  <aegov-select-option value="a">Option A</aegov-select-option>
  <aegov-select-option value="b">Option B</aegov-select-option>
</aegov-select>

<aegov-select size="lg" placeholder="Large" variant="listbox">
  <aegov-select-option value="a">Option A</aegov-select-option>
  <aegov-select-option value="b">Option B</aegov-select-option>
</aegov-select>

<aegov-select size="xl" placeholder="Extra Large" variant="listbox">
  <aegov-select-option value="a">Option A</aegov-select-option>
  <aegov-select-option value="b">Option B</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-select size="xs" placeholder="Extra Small" variant="listbox">
    <aegov-select-option value="a">Option A</aegov-select-option>
    <aegov-select-option value="b">Option B</aegov-select-option>
  </aegov-select>
  <aegov-select size="sm" placeholder="Small" variant="listbox">
    <aegov-select-option value="a">Option A</aegov-select-option>
    <aegov-select-option value="b">Option B</aegov-select-option>
  </aegov-select>
  <aegov-select size="base" placeholder="Base (default)" variant="listbox">
    <aegov-select-option value="a">Option A</aegov-select-option>
    <aegov-select-option value="b">Option B</aegov-select-option>
  </aegov-select>
  <aegov-select size="lg" placeholder="Large" variant="listbox">
    <aegov-select-option value="a">Option A</aegov-select-option>
    <aegov-select-option value="b">Option B</aegov-select-option>
  </aegov-select>
  <aegov-select size="xl" placeholder="Extra Large" variant="listbox">
    <aegov-select-option value="a">Option A</aegov-select-option>
    <aegov-select-option value="b">Option B</aegov-select-option>
  </aegov-select>
</div>

---

## Placeholder

The `placeholder` property displays hint text when no option is selected. For the native variant it renders as a disabled `<option>`. For the listbox variant it appears as muted text in the trigger button.

```html
<aegov-select placeholder="Please select an option">
  <aegov-select-option value="one">Option One</aegov-select-option>
  <aegov-select-option value="two">Option Two</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-select placeholder="Please select an option">
    <aegov-select-option value="one">Option One</aegov-select-option>
    <aegov-select-option value="two">Option Two</aegov-select-option>
  </aegov-select>
</div>

---

## Default Value

Set the `value` property to pre-select an option. The value must match one of the `aegov-select-option` values.

```html
<aegov-select value="banana" variant="listbox" placeholder="Select a fruit">
  <aegov-select-option value="apple">Apple</aegov-select-option>
  <aegov-select-option value="banana">Banana</aegov-select-option>
  <aegov-select-option value="cherry">Cherry</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-select value="banana" variant="listbox" placeholder="Select a fruit">
    <aegov-select-option value="apple">Apple</aegov-select-option>
    <aegov-select-option value="banana">Banana</aegov-select-option>
    <aegov-select-option value="cherry">Cherry</aegov-select-option>
  </aegov-select>
</div>

---

## Disabled State

Set the `disabled` attribute to prevent interaction. The select becomes visually muted and unclickable.

```html
<aegov-select disabled placeholder="Disabled select">
  <aegov-select-option value="a">Option A</aegov-select-option>
  <aegov-select-option value="b">Option B</aegov-select-option>
</aegov-select>

<aegov-select disabled variant="listbox" value="a" placeholder="Disabled listbox">
  <aegov-select-option value="a">Option A</aegov-select-option>
  <aegov-select-option value="b">Option B</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-select disabled placeholder="Disabled select">
    <aegov-select-option value="a">Option A</aegov-select-option>
    <aegov-select-option value="b">Option B</aegov-select-option>
  </aegov-select>
  <aegov-select disabled variant="listbox" value="a" placeholder="Disabled listbox">
    <aegov-select-option value="a">Option A</aegov-select-option>
    <aegov-select-option value="b">Option B</aegov-select-option>
  </aegov-select>
</div>

---

## Required

Set the `required` attribute for form validation. The native select will enforce browser validation, and the attribute is forwarded to the underlying element.

```html
<aegov-select required placeholder="Required field">
  <aegov-select-option value="yes">Yes</aegov-select-option>
  <aegov-select-option value="no">No</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-select required placeholder="Required field">
    <aegov-select-option value="yes">Yes</aegov-select-option>
    <aegov-select-option value="no">No</aegov-select-option>
  </aegov-select>
</div>

---

## Disabled Options

Individual options can be disabled by setting the `disabled` attribute on `aegov-select-option`. Disabled options are visually muted and cannot be selected.

```html
<aegov-select variant="listbox" placeholder="Some options are disabled">
  <aegov-select-option value="available">Available</aegov-select-option>
  <aegov-select-option value="unavailable" disabled>Unavailable</aegov-select-option>
  <aegov-select-option value="limited">Limited</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-select variant="listbox" placeholder="Some options are disabled">
    <aegov-select-option value="available">Available</aegov-select-option>
    <aegov-select-option value="unavailable" disabled>Unavailable</aegov-select-option>
    <aegov-select-option value="limited">Limited</aegov-select-option>
  </aegov-select>
</div>

---

## Option Groups

Use `aegov-select-option-group` with a `label` attribute to organise options into labelled groups. Groups are rendered as native `<optgroup>` in the default variant and as labelled sections in the listbox variant.

```html
<aegov-select variant="listbox" placeholder="Select a vehicle">
  <aegov-select-option-group label="Cars">
    <aegov-select-option value="sedan">Sedan</aegov-select-option>
    <aegov-select-option value="suv">SUV</aegov-select-option>
    <aegov-select-option value="coupe">Coupe</aegov-select-option>
  </aegov-select-option-group>
  <aegov-select-option-group label="Trucks">
    <aegov-select-option value="pickup">Pickup</aegov-select-option>
    <aegov-select-option value="semi">Semi</aegov-select-option>
  </aegov-select-option-group>
</aegov-select>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-select variant="listbox" placeholder="Select a vehicle">
    <aegov-select-option-group label="Cars">
      <aegov-select-option value="sedan">Sedan</aegov-select-option>
      <aegov-select-option value="suv">SUV</aegov-select-option>
      <aegov-select-option value="coupe">Coupe</aegov-select-option>
    </aegov-select-option-group>
    <aegov-select-option-group label="Trucks">
      <aegov-select-option value="pickup">Pickup</aegov-select-option>
      <aegov-select-option value="semi">Semi</aegov-select-option>
    </aegov-select-option-group>
  </aegov-select>
</div>

Option groups also work with the native default variant:

```html
<aegov-select placeholder="Select a vehicle">
  <aegov-select-option-group label="Cars">
    <aegov-select-option value="sedan">Sedan</aegov-select-option>
    <aegov-select-option value="suv">SUV</aegov-select-option>
  </aegov-select-option-group>
  <aegov-select-option-group label="Trucks">
    <aegov-select-option value="pickup">Pickup</aegov-select-option>
    <aegov-select-option value="semi">Semi</aegov-select-option>
  </aegov-select-option-group>
</aegov-select>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-select placeholder="Select a vehicle">
    <aegov-select-option-group label="Cars">
      <aegov-select-option value="sedan">Sedan</aegov-select-option>
      <aegov-select-option value="suv">SUV</aegov-select-option>
    </aegov-select-option-group>
    <aegov-select-option-group label="Trucks">
      <aegov-select-option value="pickup">Pickup</aegov-select-option>
      <aegov-select-option value="semi">Semi</aegov-select-option>
    </aegov-select-option-group>
  </aegov-select>
</div>

---

## Multiple Selection

Set the `multiple` attribute to allow users to select more than one option. This automatically forces the listbox variant regardless of the `variant` prop. Selected items display a count (e.g. "3 selected") in the trigger, and each option shows a checkbox indicator.

```html
<aegov-select multiple placeholder="Select languages">
  <aegov-select-option value="en">English</aegov-select-option>
  <aegov-select-option value="ar">Arabic</aegov-select-option>
  <aegov-select-option value="fr">French</aegov-select-option>
  <aegov-select-option value="hi">Hindi</aegov-select-option>
  <aegov-select-option value="zh">Chinese</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-select multiple placeholder="Select languages">
    <aegov-select-option value="en">English</aegov-select-option>
    <aegov-select-option value="ar">Arabic</aegov-select-option>
    <aegov-select-option value="fr">French</aegov-select-option>
    <aegov-select-option value="hi">Hindi</aegov-select-option>
    <aegov-select-option value="zh">Chinese</aegov-select-option>
  </aegov-select>
</div>

When using multiple selection, the `value` property holds a comma-separated string of selected values (e.g. `"en,ar,fr"`), and the `aegovSelectChange` event emits arrays for both `value` and `label`.

---

## Searchable

Set the `searchable` attribute to show a search input at the top of the listbox dropdown. Users can type to filter options by label text. Only available in the listbox variant.

```html
<aegov-select variant="listbox" searchable placeholder="Search countries...">
  <aegov-select-option value="ae">United Arab Emirates</aegov-select-option>
  <aegov-select-option value="sa">Saudi Arabia</aegov-select-option>
  <aegov-select-option value="om">Oman</aegov-select-option>
  <aegov-select-option value="kw">Kuwait</aegov-select-option>
  <aegov-select-option value="bh">Bahrain</aegov-select-option>
  <aegov-select-option value="qa">Qatar</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-select variant="listbox" searchable placeholder="Search countries...">
    <aegov-select-option value="ae">United Arab Emirates</aegov-select-option>
    <aegov-select-option value="sa">Saudi Arabia</aegov-select-option>
    <aegov-select-option value="om">Oman</aegov-select-option>
    <aegov-select-option value="kw">Kuwait</aegov-select-option>
    <aegov-select-option value="bh">Bahrain</aegov-select-option>
    <aegov-select-option value="qa">Qatar</aegov-select-option>
  </aegov-select>
</div>

### Custom Empty Message

When no options match the search query, the component displays "No results found" by default. Customise this text using the `empty-message` property.

```html
<aegov-select variant="listbox" searchable empty-message="No matching items" placeholder="Search...">
  <aegov-select-option value="a">Alpha</aegov-select-option>
  <aegov-select-option value="b">Bravo</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-select variant="listbox" searchable empty-message="No matching items" placeholder="Search...">
    <aegov-select-option value="a">Alpha</aegov-select-option>
    <aegov-select-option value="b">Bravo</aegov-select-option>
  </aegov-select>
</div>

---

## Clearable

Set the `clearable` attribute to show a small clear (X) button inside the trigger when an option is selected. Clicking the clear button resets the selection to empty.

```html
<aegov-select variant="listbox" clearable value="dubai" placeholder="Select a city">
  <aegov-select-option value="abudhabi">Abu Dhabi</aegov-select-option>
  <aegov-select-option value="dubai">Dubai</aegov-select-option>
  <aegov-select-option value="sharjah">Sharjah</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-select variant="listbox" clearable value="dubai" placeholder="Select a city">
    <aegov-select-option value="abudhabi">Abu Dhabi</aegov-select-option>
    <aegov-select-option value="dubai">Dubai</aegov-select-option>
    <aegov-select-option value="sharjah">Sharjah</aegov-select-option>
  </aegov-select>
</div>

---

## Visible Items

The `visible-items` property controls the maximum number of options visible in the dropdown before it starts scrolling. The default is `6`.

```html
<aegov-select variant="listbox" visible-items="3" placeholder="Only 3 visible at a time">
  <aegov-select-option value="1">Option 1</aegov-select-option>
  <aegov-select-option value="2">Option 2</aegov-select-option>
  <aegov-select-option value="3">Option 3</aegov-select-option>
  <aegov-select-option value="4">Option 4</aegov-select-option>
  <aegov-select-option value="5">Option 5</aegov-select-option>
  <aegov-select-option value="6">Option 6</aegov-select-option>
  <aegov-select-option value="7">Option 7</aegov-select-option>
  <aegov-select-option value="8">Option 8</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-select variant="listbox" visible-items="3" placeholder="Only 3 visible at a time">
    <aegov-select-option value="1">Option 1</aegov-select-option>
    <aegov-select-option value="2">Option 2</aegov-select-option>
    <aegov-select-option value="3">Option 3</aegov-select-option>
    <aegov-select-option value="4">Option 4</aegov-select-option>
    <aegov-select-option value="5">Option 5</aegov-select-option>
    <aegov-select-option value="6">Option 6</aegov-select-option>
    <aegov-select-option value="7">Option 7</aegov-select-option>
    <aegov-select-option value="8">Option 8</aegov-select-option>
  </aegov-select>
</div>

---

## Combined Features

The listbox variant supports combining multiple features together. Here is a searchable, clearable, multiple select with option groups:

```html
<aegov-select multiple searchable clearable placeholder="Select team members">
  <aegov-select-option-group label="Engineering">
    <aegov-select-option value="alice">Alice</aegov-select-option>
    <aegov-select-option value="bob">Bob</aegov-select-option>
    <aegov-select-option value="charlie">Charlie</aegov-select-option>
  </aegov-select-option-group>
  <aegov-select-option-group label="Design">
    <aegov-select-option value="diana">Diana</aegov-select-option>
    <aegov-select-option value="eve">Eve</aegov-select-option>
  </aegov-select-option-group>
</aegov-select>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-select multiple searchable clearable placeholder="Select team members">
    <aegov-select-option-group label="Engineering">
      <aegov-select-option value="alice">Alice</aegov-select-option>
      <aegov-select-option value="bob">Bob</aegov-select-option>
      <aegov-select-option value="charlie">Charlie</aegov-select-option>
    </aegov-select-option-group>
    <aegov-select-option-group label="Design">
      <aegov-select-option value="diana">Diana</aegov-select-option>
      <aegov-select-option value="eve">Eve</aegov-select-option>
    </aegov-select-option-group>
  </aegov-select>
</div>

---

## Usage with Form Field

Wrap a select inside `aegov-form-field` with `aegov-label` for consistent form styling, label association, and spacing with other form elements.

```html
<aegov-form-field>
  <aegov-label>Country of residence</aegov-label>
  <aegov-select placeholder="Select a country">
    <aegov-select-option value="ae">United Arab Emirates</aegov-select-option>
    <aegov-select-option value="sa">Saudi Arabia</aegov-select-option>
    <aegov-select-option value="om">Oman</aegov-select-option>
  </aegov-select>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>Country of residence</aegov-label>
    <aegov-select placeholder="Select a country">
      <aegov-select-option value="ae">United Arab Emirates</aegov-select-option>
      <aegov-select-option value="sa">Saudi Arabia</aegov-select-option>
      <aegov-select-option value="om">Oman</aegov-select-option>
    </aegov-select>
  </aegov-form-field>
</div>

Listbox variant inside a form field:

```html
<aegov-form-field>
  <aegov-label>Preferred language</aegov-label>
  <aegov-select variant="listbox" searchable placeholder="Search languages...">
    <aegov-select-option value="en">English</aegov-select-option>
    <aegov-select-option value="ar">Arabic</aegov-select-option>
    <aegov-select-option value="fr">French</aegov-select-option>
    <aegov-select-option value="de">German</aegov-select-option>
  </aegov-select>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>Preferred language</aegov-label>
    <aegov-select variant="listbox" searchable placeholder="Search languages...">
      <aegov-select-option value="en">English</aegov-select-option>
      <aegov-select-option value="ar">Arabic</aegov-select-option>
      <aegov-select-option value="fr">French</aegov-select-option>
      <aegov-select-option value="de">German</aegov-select-option>
    </aegov-select>
  </aegov-form-field>
</div>

---

## Events

### aegovSelectChange

Emitted when the selected value changes. The event detail contains the new `value` and `label`. For single selection these are strings; for multiple selection they are arrays.

```html
<aegov-select id="city-select" variant="listbox" placeholder="Select a city">
  <aegov-select-option value="abudhabi">Abu Dhabi</aegov-select-option>
  <aegov-select-option value="dubai">Dubai</aegov-select-option>
  <aegov-select-option value="sharjah">Sharjah</aegov-select-option>
</aegov-select>

<script>
  document.getElementById('city-select')
    .addEventListener('aegovSelectChange', (e) => {
      console.log('Value:', e.detail.value);
      console.log('Label:', e.detail.label);
    });
</script>
```

### aegovSelectOpen

Emitted when the listbox dropdown opens. Only fires for the listbox variant.

### aegovSelectClose

Emitted when the listbox dropdown closes. Only fires for the listbox variant.

```html
<aegov-select id="events-select" variant="listbox" placeholder="Open/close events">
  <aegov-select-option value="a">Option A</aegov-select-option>
  <aegov-select-option value="b">Option B</aegov-select-option>
</aegov-select>

<script>
  const select = document.getElementById('events-select');

  select.addEventListener('aegovSelectOpen', () => {
    console.log('Dropdown opened');
  });

  select.addEventListener('aegovSelectClose', () => {
    console.log('Dropdown closed');
  });
</script>
```

---

## RTL Support

The component fully supports right-to-left layouts. When the document or a parent element has `dir="rtl"`, the native select arrow repositions to the left side, and the listbox trigger, chevron, and dropdown all mirror correctly.

```html
<div dir="rtl">
  <aegov-select variant="listbox" placeholder="اختر مدينة">
    <aegov-select-option value="abudhabi">أبو ظبي</aegov-select-option>
    <aegov-select-option value="dubai">دبي</aegov-select-option>
    <aegov-select-option value="sharjah">الشارقة</aegov-select-option>
  </aegov-select>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-select variant="listbox" placeholder="اختر مدينة">
    <aegov-select-option value="abudhabi">أبو ظبي</aegov-select-option>
    <aegov-select-option value="dubai">دبي</aegov-select-option>
    <aegov-select-option value="sharjah">الشارقة</aegov-select-option>
  </aegov-select>
</div>

No additional configuration is needed -- the component reads the inherited `dir` attribute and adjusts automatically.

---

## API Reference

### aegov-select Properties

| Property       | Attribute        | Description                                                                                  | Type                              | Default              |
|----------------|------------------|----------------------------------------------------------------------------------------------|-----------------------------------|----------------------|
| `fieldId`      | `field-id`       | Unique ID for the select element. Auto-generated if not provided.                            | `string`                          | auto                 |
| `variant`      | `variant`        | The visual variant. `'default'` renders a native select; `'listbox'` renders a custom dropdown. | `'default'` \| `'listbox'`       | `'default'`          |
| `size`         | `size`           | The size of the select. Matches aegov-input heights.                                         | `'xs'` \| `'sm'` \| `'base'` \| `'lg'` \| `'xl'` | `'base'`             |
| `multiple`     | `multiple`       | Whether multiple selection is enabled. Forces listbox behaviour.                             | `boolean`                         | `false`              |
| `disabled`     | `disabled`       | Whether the select is disabled.                                                              | `boolean`                         | `false`              |
| `placeholder`  | `placeholder`    | Placeholder text shown when nothing is selected.                                             | `string`                          | `undefined`          |
| `value`        | `value`          | The current selected value. For multiple, a comma-separated string.                          | `string`                          | `''`                 |
| `name`         | `name`           | The name attribute for form submission.                                                      | `string`                          | `undefined`          |
| `required`     | `required`       | Whether the select is required for form validation.                                          | `boolean`                         | `false`              |
| `searchable`   | `searchable`     | Show a search input in the listbox dropdown to filter options. Listbox variant only.         | `boolean`                         | `false`              |
| `emptyMessage` | `empty-message`  | Message shown when search yields no results.                                                 | `string`                          | `'No results found'` |
| `visibleItems` | `visible-items`  | Max visible items in the dropdown before scrolling.                                          | `number`                          | `6`                  |
| `clearable`    | `clearable`      | Show a clear button to reset selection.                                                      | `boolean`                         | `false`              |
| `class`        | `class`          | Additional CSS classes to apply.                                                             | `string`                          | `undefined`          |

### aegov-select Events

| Event              | Description                                          | Detail Type                                          |
|--------------------|------------------------------------------------------|------------------------------------------------------|
| `aegovSelectChange` | Emitted when the selected value changes.            | `{ value: string \| string[], label: string \| string[] }` |
| `aegovSelectOpen`   | Emitted when the listbox dropdown opens.            | `void`                                               |
| `aegovSelectClose`  | Emitted when the listbox dropdown closes.           | `void`                                               |

### aegov-select-option Properties

| Property   | Attribute  | Description                          | Type      | Default     |
|------------|-----------|--------------------------------------|-----------|-------------|
| `value`    | `value`    | The value of this option.            | `string`  | `''`        |
| `disabled` | `disabled` | Whether this option is disabled.     | `boolean` | `false`     |

The label text is provided as the element's text content (default slot).

### aegov-select-option-group Properties

| Property | Attribute | Description                        | Type     | Default |
|----------|-----------|------------------------------------|----------|---------|
| `label`  | `label`   | The label for this option group.   | `string` | `''`    |

### Pass-Through Attributes

The `aegov-select` component forwards `aria-*` and `data-*` attributes from the host element to the underlying native `<select>` (default variant) or trigger `<button>` (listbox variant).

```html
<aegov-select aria-label="Country selection" data-tracking="country-select" placeholder="Select...">
  <aegov-select-option value="ae">UAE</aegov-select-option>
</aegov-select>
```

---

## Accessibility

The `aegov-select` component is built with accessibility as a first-class concern.

### Built-in Features

- **Native `<select>` in default variant** -- renders a semantic HTML select element that works with all assistive technologies out of the box.
- **`role="combobox"`** -- the listbox trigger button uses the combobox role for correct screen reader announcement.
- **`aria-expanded`** -- automatically toggled when the listbox dropdown opens and closes.
- **`aria-haspopup="listbox"`** -- informs assistive technologies that a listbox will appear.
- **`aria-controls`** -- links the trigger to the dropdown listbox element.
- **`aria-activedescendant`** -- tracks the currently focused option during keyboard navigation, so screen readers announce the focused item.
- **`role="listbox"` on dropdown** -- the options container has correct listbox semantics.
- **`role="option"` on items** -- each option has the correct role with `aria-selected` reflecting its state.
- **`aria-disabled`** -- set on disabled options to inform screen readers.
- **`aria-multiselectable`** -- set on the listbox when `multiple` is enabled.
- **`role="group"` with `aria-labelledby`** -- option groups are wrapped in semantic groups linked to their label for screen reader announcement.
- **`role="searchbox"`** -- the search input has the correct role with `aria-label` and `aria-controls`.
- **Focus indicators** -- clearly visible focus ring on keyboard navigation via the primary support colour.
- **Disabled state** -- applies reduced opacity and `pointer-events: none` so the select is both visually and functionally inert.
- **Keyboard navigation** -- full keyboard support including Arrow Up/Down for option navigation, Enter/Space to select, Escape to close, and Home/End to jump to first/last option.

### Developer Responsibilities

1. **Provide a label.** Always pair a select with an `aegov-label` inside an `aegov-form-field`, or provide an `aria-label` attribute on the select. A select without a label is inaccessible.

   ```html
   <aegov-form-field>
     <aegov-label>Country</aegov-label>
     <aegov-select placeholder="Select...">...</aegov-select>
   </aegov-form-field>
   ```

2. **Use meaningful option text.** Option labels should be clear and descriptive. Avoid abbreviations or codes that screen readers cannot interpret.

3. **Do not remove focus styles.** The built-in focus outlines are essential for keyboard navigation. Avoid overriding them with `outline: none`.

4. **Colour contrast.** All built-in colour combinations meet WCAG 2.1 AA contrast ratios. If you override colours, verify that the new colours maintain at least a **4.5:1** contrast ratio.

---

## Notes

- The `aegov-select` component reads its options from `aegov-select-option` children. These children are hidden from the DOM (`display: none`) and their content is parsed programmatically.
- Setting `multiple` to `true` automatically forces the listbox variant, regardless of the `variant` property value.
- The listbox dropdown positions itself above or below the trigger automatically based on available viewport space.
- The dropdown animates in with a subtle slide-in effect (150ms ease-out).
- The `value` property is mutable. For single selection it holds a plain string; for multiple selection it holds a comma-separated string of values (e.g. `"en,ar,fr"`).
- When the `name` property is set in listbox mode, the component renders a hidden `<input type="hidden">` for form submission compatibility.
- Clicking outside the listbox dropdown closes it automatically.
- The `fieldId` prop is auto-generated using a unique ID if not provided. To control the ID explicitly (e.g. for external label association), pass `field-id="my-id"`.
- The `searchable` and `clearable` features are only available in the listbox variant. They have no effect on the native default variant.
- The native default variant uses a custom SVG arrow background image that repositions in RTL mode.
