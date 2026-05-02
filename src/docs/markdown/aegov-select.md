# Select

<p class="text-lg text-aeblack-500 mb-8">A Select lets users choose one or more options from a list. The AEGOV select supports two render modes — a real native <code>&lt;select&gt;</code> for simple cases and form submission, and a custom listbox for richer experiences with search, multi-select, grouped options, and a clear button. Options are declared as light DOM children using <code>aegov-select-option</code> and optionally wrapped in <code>aegov-select-option-group</code>.</p>

## Introduction

The `aegov-select` component composes a parent select with one or more `aegov-select-option` children. The default `variant="default"` renders a true native `<select>` (best for simple lists, mobile, and form submission). The `variant="listbox"` renders a styled custom dropdown panel that supports searching, multi-selection, and grouped options. Setting `is-multiple="true"` automatically forces the listbox variant.

```html
<aegov-select label="Ministry" placeholder="Select a ministry" name="ministry">
  <aegov-select-option value="moi">Ministry of Interior</aegov-select-option>
  <aegov-select-option value="mof">Ministry of Finance</aegov-select-option>
  <aegov-select-option value="moh">Ministry of Health and Prevention</aegov-select-option>
  <aegov-select-option value="moe">Ministry of Education</aegov-select-option>
  <aegov-select-option value="moj">Ministry of Justice</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-select placeholder="Select a ministry" name="ministry">
    <aegov-select-option value="moi">Ministry of Interior</aegov-select-option>
    <aegov-select-option value="mof">Ministry of Finance</aegov-select-option>
    <aegov-select-option value="moh">Ministry of Health and Prevention</aegov-select-option>
    <aegov-select-option value="moe">Ministry of Education</aegov-select-option>
    <aegov-select-option value="moj">Ministry of Justice</aegov-select-option>
  </aegov-select>
</div>

> The dropdown panel for the listbox variant is positioned beneath the trigger and dynamically chooses to open above or below depending on the available viewport space. It remains anchored to the trigger and closes automatically when focus leaves the component or the user presses `Escape`.

---

## Variants

The `variant` property switches the underlying rendering.

### Default — native `<select>`

The default variant renders a real `<select>` element. It is the right choice for simple lists, optimal mobile UX (the OS native picker is used), and unambiguous form submission. Searching and multi-selection are not available in this mode.

```html
<aegov-select placeholder="Select an emirate" name="emirate">
  <aegov-select-option value="ad">Abu Dhabi</aegov-select-option>
  <aegov-select-option value="dxb">Dubai</aegov-select-option>
  <aegov-select-option value="shj">Sharjah</aegov-select-option>
  <aegov-select-option value="ajm">Ajman</aegov-select-option>
  <aegov-select-option value="uaq">Umm Al Quwain</aegov-select-option>
  <aegov-select-option value="rak">Ras Al Khaimah</aegov-select-option>
  <aegov-select-option value="fuj">Fujairah</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-select placeholder="Select an emirate" name="emirate">
    <aegov-select-option value="ad">Abu Dhabi</aegov-select-option>
    <aegov-select-option value="dxb">Dubai</aegov-select-option>
    <aegov-select-option value="shj">Sharjah</aegov-select-option>
    <aegov-select-option value="ajm">Ajman</aegov-select-option>
    <aegov-select-option value="uaq">Umm Al Quwain</aegov-select-option>
    <aegov-select-option value="rak">Ras Al Khaimah</aegov-select-option>
    <aegov-select-option value="fuj">Fujairah</aegov-select-option>
  </aegov-select>
</div>

### Listbox — custom dropdown

The listbox variant renders a styled trigger button and a positioned dropdown panel. Use it when you need search, multi-selection, grouped options, or a clear button. The panel is anchored to the trigger and chooses its open direction based on viewport space.

```html
<aegov-select variant="listbox" placeholder="Select a service category">
  <aegov-select-option value="passport">Passport &amp; travel documents</aegov-select-option>
  <aegov-select-option value="visa">Visa &amp; residency</aegov-select-option>
  <aegov-select-option value="vehicle">Vehicle registration</aegov-select-option>
  <aegov-select-option value="health">Health insurance</aegov-select-option>
  <aegov-select-option value="education">Education &amp; training</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-select variant="listbox" placeholder="Select a service category">
    <aegov-select-option value="passport">Passport &amp; travel documents</aegov-select-option>
    <aegov-select-option value="visa">Visa &amp; residency</aegov-select-option>
    <aegov-select-option value="vehicle">Vehicle registration</aegov-select-option>
    <aegov-select-option value="health">Health insurance</aegov-select-option>
    <aegov-select-option value="education">Education &amp; training</aegov-select-option>
  </aegov-select>
</div>

---

## Sizes

The `size` property scales the trigger height to match aegov-input. Five tokens are available — `xs`, `sm`, `base` (default), `lg`, and `xl`.

```html
<aegov-select size="xs" placeholder="Extra small">…</aegov-select>
<aegov-select size="sm" placeholder="Small">…</aegov-select>
<aegov-select size="base" placeholder="Base (default)">…</aegov-select>
<aegov-select size="lg" placeholder="Large">…</aegov-select>
<aegov-select size="xl" placeholder="Extra large">…</aegov-select>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-col gap-4">
  <aegov-select size="xs" placeholder="Extra small (xs)">
    <aegov-select-option value="ad">Abu Dhabi</aegov-select-option>
    <aegov-select-option value="dxb">Dubai</aegov-select-option>
  </aegov-select>
  <aegov-select size="sm" placeholder="Small (sm)">
    <aegov-select-option value="ad">Abu Dhabi</aegov-select-option>
    <aegov-select-option value="dxb">Dubai</aegov-select-option>
  </aegov-select>
  <aegov-select size="base" placeholder="Base (default)">
    <aegov-select-option value="ad">Abu Dhabi</aegov-select-option>
    <aegov-select-option value="dxb">Dubai</aegov-select-option>
  </aegov-select>
  <aegov-select size="lg" placeholder="Large (lg)">
    <aegov-select-option value="ad">Abu Dhabi</aegov-select-option>
    <aegov-select-option value="dxb">Dubai</aegov-select-option>
  </aegov-select>
  <aegov-select size="xl" placeholder="Extra large (xl)">
    <aegov-select-option value="ad">Abu Dhabi</aegov-select-option>
    <aegov-select-option value="dxb">Dubai</aegov-select-option>
  </aegov-select>
</div>

---

## Searchable

Set `is-searchable="true"` on a listbox-variant select to add a search input above the option list. The list filters case-insensitively as the user types, and `empty-message` controls the text shown when nothing matches.

```html
<aegov-select
  variant="listbox"
  is-searchable="true"
  placeholder="Search and select your nationality"
  empty-message="No matching country"
>
  <aegov-select-option value="ae">United Arab Emirates</aegov-select-option>
  <aegov-select-option value="sa">Saudi Arabia</aegov-select-option>
  <aegov-select-option value="kw">Kuwait</aegov-select-option>
  <aegov-select-option value="qa">Qatar</aegov-select-option>
  <aegov-select-option value="bh">Bahrain</aegov-select-option>
  <aegov-select-option value="om">Oman</aegov-select-option>
  <aegov-select-option value="eg">Egypt</aegov-select-option>
  <aegov-select-option value="jo">Jordan</aegov-select-option>
  <aegov-select-option value="lb">Lebanon</aegov-select-option>
  <aegov-select-option value="sy">Syria</aegov-select-option>
  <aegov-select-option value="iq">Iraq</aegov-select-option>
  <aegov-select-option value="in">India</aegov-select-option>
  <aegov-select-option value="pk">Pakistan</aegov-select-option>
  <aegov-select-option value="ph">Philippines</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-select
    variant="listbox"
    is-searchable="true"
    placeholder="Search and select your nationality"
    empty-message="No matching country"
  >
    <aegov-select-option value="ae">United Arab Emirates</aegov-select-option>
    <aegov-select-option value="sa">Saudi Arabia</aegov-select-option>
    <aegov-select-option value="kw">Kuwait</aegov-select-option>
    <aegov-select-option value="qa">Qatar</aegov-select-option>
    <aegov-select-option value="bh">Bahrain</aegov-select-option>
    <aegov-select-option value="om">Oman</aegov-select-option>
    <aegov-select-option value="eg">Egypt</aegov-select-option>
    <aegov-select-option value="jo">Jordan</aegov-select-option>
    <aegov-select-option value="lb">Lebanon</aegov-select-option>
    <aegov-select-option value="sy">Syria</aegov-select-option>
    <aegov-select-option value="iq">Iraq</aegov-select-option>
    <aegov-select-option value="in">India</aegov-select-option>
    <aegov-select-option value="pk">Pakistan</aegov-select-option>
    <aegov-select-option value="ph">Philippines</aegov-select-option>
  </aegov-select>
</div>

---

## Multi-select

Set `is-multiple="true"` to allow more than one option to be selected. The trigger shows a count summary ("3 selected") and each option in the panel renders with a checkbox. Multi-select forces the listbox variant.

```html
<aegov-select
  is-multiple="true"
  is-searchable="true"
  placeholder="Choose languages you speak"
>
  <aegov-select-option value="ar">Arabic</aegov-select-option>
  <aegov-select-option value="en">English</aegov-select-option>
  <aegov-select-option value="ur">Urdu</aegov-select-option>
  <aegov-select-option value="hi">Hindi</aegov-select-option>
  <aegov-select-option value="fr">French</aegov-select-option>
  <aegov-select-option value="ru">Russian</aegov-select-option>
  <aegov-select-option value="zh">Chinese</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-select
    is-multiple="true"
    is-searchable="true"
    placeholder="Choose languages you speak"
  >
    <aegov-select-option value="ar">Arabic</aegov-select-option>
    <aegov-select-option value="en">English</aegov-select-option>
    <aegov-select-option value="ur">Urdu</aegov-select-option>
    <aegov-select-option value="hi">Hindi</aegov-select-option>
    <aegov-select-option value="fr">French</aegov-select-option>
    <aegov-select-option value="ru">Russian</aegov-select-option>
    <aegov-select-option value="zh">Chinese</aegov-select-option>
  </aegov-select>
</div>

---

## Grouped options

Wrap related options in `aegov-select-option-group` and provide a `label`. The group label is rendered as a non-interactive header above its options, in both the native and listbox variants.

```html
<aegov-select variant="listbox" is-searchable="true" placeholder="Select an emirate">
  <aegov-select-option-group label="Federal capital">
    <aegov-select-option value="ad">Abu Dhabi</aegov-select-option>
  </aegov-select-option-group>
  <aegov-select-option-group label="Northern Emirates">
    <aegov-select-option value="dxb">Dubai</aegov-select-option>
    <aegov-select-option value="shj">Sharjah</aegov-select-option>
    <aegov-select-option value="ajm">Ajman</aegov-select-option>
    <aegov-select-option value="uaq">Umm Al Quwain</aegov-select-option>
    <aegov-select-option value="rak">Ras Al Khaimah</aegov-select-option>
  </aegov-select-option-group>
  <aegov-select-option-group label="Eastern Coast">
    <aegov-select-option value="fuj">Fujairah</aegov-select-option>
  </aegov-select-option-group>
</aegov-select>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-select variant="listbox" is-searchable="true" placeholder="Select an emirate">
    <aegov-select-option-group label="Federal capital">
      <aegov-select-option value="ad">Abu Dhabi</aegov-select-option>
    </aegov-select-option-group>
    <aegov-select-option-group label="Northern Emirates">
      <aegov-select-option value="dxb">Dubai</aegov-select-option>
      <aegov-select-option value="shj">Sharjah</aegov-select-option>
      <aegov-select-option value="ajm">Ajman</aegov-select-option>
      <aegov-select-option value="uaq">Umm Al Quwain</aegov-select-option>
      <aegov-select-option value="rak">Ras Al Khaimah</aegov-select-option>
    </aegov-select-option-group>
    <aegov-select-option-group label="Eastern Coast">
      <aegov-select-option value="fuj">Fujairah</aegov-select-option>
    </aegov-select-option-group>
  </aegov-select>
</div>

---

## Clearable

Set `is-clearable="true"` to display a small "×" inside the trigger that clears the current selection when activated. Particularly useful in optional filters where users need to undo a choice without reopening the panel.

```html
<aegov-select
  variant="listbox"
  is-clearable="true"
  placeholder="Filter by service status"
>
  <aegov-select-option value="active">Active</aegov-select-option>
  <aegov-select-option value="pending">Pending review</aegov-select-option>
  <aegov-select-option value="rejected">Rejected</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-select
    variant="listbox"
    is-clearable="true"
    placeholder="Filter by service status"
  >
    <aegov-select-option value="active">Active</aegov-select-option>
    <aegov-select-option value="pending">Pending review</aegov-select-option>
    <aegov-select-option value="rejected">Rejected</aegov-select-option>
  </aegov-select>
</div>

---

## Disabled options and disabled select

An individual `aegov-select-option` can be disabled with `is-disabled="true"`; the option remains visible but is greyed out and not selectable. Set `is-disabled` on the parent `aegov-select` to disable the entire control.

```html
<aegov-select variant="listbox" placeholder="Select an appointment slot">
  <aegov-select-option value="0900">09:00 — Available</aegov-select-option>
  <aegov-select-option value="1000" is-disabled="true">10:00 — Fully booked</aegov-select-option>
  <aegov-select-option value="1100">11:00 — Available</aegov-select-option>
  <aegov-select-option value="1200" is-disabled="true">12:00 — Closed</aegov-select-option>
  <aegov-select-option value="1300">13:00 — Available</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-select variant="listbox" placeholder="Select an appointment slot">
    <aegov-select-option value="0900">09:00 — Available</aegov-select-option>
    <aegov-select-option value="1000" is-disabled="true">10:00 — Fully booked</aegov-select-option>
    <aegov-select-option value="1100">11:00 — Available</aegov-select-option>
    <aegov-select-option value="1200" is-disabled="true">12:00 — Closed</aegov-select-option>
    <aegov-select-option value="1300">13:00 — Available</aegov-select-option>
  </aegov-select>
</div>

```html
<aegov-select is-disabled="true" placeholder="Select a ministry (disabled)">
  <aegov-select-option value="moi">Ministry of Interior</aegov-select-option>
  <aegov-select-option value="mof">Ministry of Finance</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-select is-disabled="true" placeholder="Select a ministry (disabled)">
    <aegov-select-option value="moi">Ministry of Interior</aegov-select-option>
    <aegov-select-option value="mof">Ministry of Finance</aegov-select-option>
  </aegov-select>
</div>

---

## Visible items and pre-selected value

Use `visible-items` to control how many options fit in the panel before the list scrolls (default `6`). Pre-select a value with the `value` property — it must match the `value` attribute of one of the options.

```html
<aegov-select
  variant="listbox"
  is-searchable="true"
  visible-items="4"
  value="ad"
  placeholder="Select an emirate"
>
  <aegov-select-option value="ad">Abu Dhabi</aegov-select-option>
  <aegov-select-option value="dxb">Dubai</aegov-select-option>
  <aegov-select-option value="shj">Sharjah</aegov-select-option>
  <aegov-select-option value="ajm">Ajman</aegov-select-option>
  <aegov-select-option value="uaq">Umm Al Quwain</aegov-select-option>
  <aegov-select-option value="rak">Ras Al Khaimah</aegov-select-option>
  <aegov-select-option value="fuj">Fujairah</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-select
    variant="listbox"
    is-searchable="true"
    visible-items="4"
    value="ad"
    placeholder="Select an emirate"
  >
    <aegov-select-option value="ad">Abu Dhabi</aegov-select-option>
    <aegov-select-option value="dxb">Dubai</aegov-select-option>
    <aegov-select-option value="shj">Sharjah</aegov-select-option>
    <aegov-select-option value="ajm">Ajman</aegov-select-option>
    <aegov-select-option value="uaq">Umm Al Quwain</aegov-select-option>
    <aegov-select-option value="rak">Ras Al Khaimah</aegov-select-option>
    <aegov-select-option value="fuj">Fujairah</aegov-select-option>
  </aegov-select>
</div>

---

## Combined contact-form example

A typical UAE Government scenario: a citizen contact form on a federal portal asking for ministry, service category, preferred languages, and follow-up time. The example combines listbox, search, multi-select, grouped options, and a clear button.

```html
<aegov-select
  variant="listbox"
  is-searchable="true"
  is-clearable="true"
  placeholder="Choose the ministry"
  name="ministry"
>
  <aegov-select-option value="moi">Ministry of Interior</aegov-select-option>
  <aegov-select-option value="mof">Ministry of Finance</aegov-select-option>
  <aegov-select-option value="moh">Ministry of Health and Prevention</aegov-select-option>
  <aegov-select-option value="moe">Ministry of Education</aegov-select-option>
  <aegov-select-option value="moj">Ministry of Justice</aegov-select-option>
</aegov-select>

<aegov-select
  is-multiple="true"
  is-clearable="true"
  placeholder="Languages you can be contacted in"
>
  <aegov-select-option value="ar">Arabic</aegov-select-option>
  <aegov-select-option value="en">English</aegov-select-option>
  <aegov-select-option value="ur">Urdu</aegov-select-option>
  <aegov-select-option value="hi">Hindi</aegov-select-option>
</aegov-select>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-col gap-4">
  <aegov-select
    variant="listbox"
    is-searchable="true"
    is-clearable="true"
    placeholder="Choose the ministry"
    name="ministry"
  >
    <aegov-select-option value="moi">Ministry of Interior</aegov-select-option>
    <aegov-select-option value="mof">Ministry of Finance</aegov-select-option>
    <aegov-select-option value="moh">Ministry of Health and Prevention</aegov-select-option>
    <aegov-select-option value="moe">Ministry of Education</aegov-select-option>
    <aegov-select-option value="moj">Ministry of Justice</aegov-select-option>
  </aegov-select>
  <aegov-select
    is-multiple="true"
    is-clearable="true"
    placeholder="Languages you can be contacted in"
  >
    <aegov-select-option value="ar">Arabic</aegov-select-option>
    <aegov-select-option value="en">English</aegov-select-option>
    <aegov-select-option value="ur">Urdu</aegov-select-option>
    <aegov-select-option value="hi">Hindi</aegov-select-option>
  </aegov-select>
</div>

---

## RTL Support

The select is direction-agnostic. When the document or any ancestor is set to `dir="rtl"` the trigger, dropdown panel, search input, and option layout mirror automatically. Group labels and option labels accept Arabic content directly.

```html
<div dir="rtl">
  <aegov-select
    variant="listbox"
    is-searchable="true"
    placeholder="اختر الوزارة"
    empty-message="لا توجد نتائج مطابقة"
  >
    <aegov-select-option value="moi">وزارة الداخلية</aegov-select-option>
    <aegov-select-option value="mof">وزارة المالية</aegov-select-option>
    <aegov-select-option value="moh">وزارة الصحة ووقاية المجتمع</aegov-select-option>
    <aegov-select-option value="moe">وزارة التربية والتعليم</aegov-select-option>
    <aegov-select-option value="moj">وزارة العدل</aegov-select-option>
  </aegov-select>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-select
    variant="listbox"
    is-searchable="true"
    placeholder="اختر الوزارة"
    empty-message="لا توجد نتائج مطابقة"
  >
    <aegov-select-option value="moi">وزارة الداخلية</aegov-select-option>
    <aegov-select-option value="mof">وزارة المالية</aegov-select-option>
    <aegov-select-option value="moh">وزارة الصحة ووقاية المجتمع</aegov-select-option>
    <aegov-select-option value="moe">وزارة التربية والتعليم</aegov-select-option>
    <aegov-select-option value="moj">وزارة العدل</aegov-select-option>
  </aegov-select>
</div>

A grouped, multi-select example in RTL:

```html
<div dir="rtl">
  <aegov-select is-multiple="true" is-clearable="true" placeholder="اختر الإمارات">
    <aegov-select-option-group label="العاصمة الاتحادية">
      <aegov-select-option value="ad">أبوظبي</aegov-select-option>
    </aegov-select-option-group>
    <aegov-select-option-group label="الإمارات الشمالية">
      <aegov-select-option value="dxb">دبي</aegov-select-option>
      <aegov-select-option value="shj">الشارقة</aegov-select-option>
      <aegov-select-option value="ajm">عجمان</aegov-select-option>
      <aegov-select-option value="uaq">أم القيوين</aegov-select-option>
      <aegov-select-option value="rak">رأس الخيمة</aegov-select-option>
    </aegov-select-option-group>
    <aegov-select-option-group label="الساحل الشرقي">
      <aegov-select-option value="fuj">الفجيرة</aegov-select-option>
    </aegov-select-option-group>
  </aegov-select>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-select is-multiple="true" is-clearable="true" placeholder="اختر الإمارات">
    <aegov-select-option-group label="العاصمة الاتحادية">
      <aegov-select-option value="ad">أبوظبي</aegov-select-option>
    </aegov-select-option-group>
    <aegov-select-option-group label="الإمارات الشمالية">
      <aegov-select-option value="dxb">دبي</aegov-select-option>
      <aegov-select-option value="shj">الشارقة</aegov-select-option>
      <aegov-select-option value="ajm">عجمان</aegov-select-option>
      <aegov-select-option value="uaq">أم القيوين</aegov-select-option>
      <aegov-select-option value="rak">رأس الخيمة</aegov-select-option>
    </aegov-select-option-group>
    <aegov-select-option-group label="الساحل الشرقي">
      <aegov-select-option value="fuj">الفجيرة</aegov-select-option>
    </aegov-select-option-group>
  </aegov-select>
</div>

---

## API Reference

### aegov-select Properties

| Property        | Attribute        | Description                                                                                          | Type                       | Default              |
| --------------- | ---------------- | ---------------------------------------------------------------------------------------------------- | -------------------------- | -------------------- |
| `fieldId`       | `field-id`       | DOM `id` for the trigger or native select. Auto-generated if omitted.                                  | `string`                   | _generated_          |
| `variant`       | `variant`        | `default` renders a native `<select>`; `listbox` renders a custom dropdown panel.                       | `'default' \| 'listbox'`   | `'default'`          |
| `size`          | `size`           | Size token (`xs`, `sm`, `base`, `lg`, `xl`) or a responsive string. Matches aegov-input height.        | `string`                   | `'base'`             |
| `isMultiple`    | `is-multiple`    | Whether multiple selection is enabled. Forces listbox behaviour.                                       | `boolean`                  | `false`              |
| `isDisabled`    | `is-disabled`    | Disables the entire control.                                                                           | `boolean`                  | `false`              |
| `isRequired`    | `is-required`    | Marks the underlying input as required for form validation.                                            | `boolean`                  | `false`              |
| `placeholder`   | `placeholder`    | Text shown when nothing is selected.                                                                   | `string`                   | `undefined`          |
| `value`         | `value`          | Currently selected value. For multi-select, a comma-separated string.                                  | `string`                   | `''`                 |
| `name`          | `name`           | Form field name used during submission.                                                                | `string`                   | `undefined`          |
| `isSearchable`  | `is-searchable`  | Show a search input above the option list. Listbox variant only.                                       | `boolean`                  | `false`              |
| `emptyMessage`  | `empty-message`  | Text shown when search yields no results.                                                              | `string`                   | `'No results found'` |
| `visibleItems`  | `visible-items`  | Maximum number of options visible before scrolling.                                                    | `number`                   | `6`                  |
| `isClearable`   | `is-clearable`   | Show a clear button inside the trigger to reset selection.                                             | `boolean`                  | `false`              |
| `extraClass`    | `extra-class`    | Additional CSS classes appended to the wrapper.                                                        | `string`                   | `undefined`          |

### aegov-select-option Properties

| Property      | Attribute      | Description                                                | Type      | Default     |
| ------------- | -------------- | ---------------------------------------------------------- | --------- | ----------- |
| `value`       | `value`        | The value submitted or surfaced in events when selected.    | `string`  | `''`        |
| `isDisabled`  | `is-disabled`  | Disables this option so it cannot be selected.              | `boolean` | `false`     |

> The label of an option is its slot text content (e.g. `<aegov-select-option value="ad">Abu Dhabi</aegov-select-option>`). Options must be a child of `<aegov-select>` (optionally inside a group); using the component standalone throws an error.

### aegov-select-option-group Properties

| Property | Attribute | Description                                  | Type     | Default |
| -------- | --------- | -------------------------------------------- | -------- | ------- |
| `label`  | `label`   | Group label rendered above its options.       | `string` | `''`    |

### Slots

| Component                    | Slot         | Description                                                              |
| ---------------------------- | ------------ | ------------------------------------------------------------------------ |
| `aegov-select`               | _(default)_  | Place `aegov-select-option` and/or `aegov-select-option-group` here.      |
| `aegov-select-option`        | _(default)_  | The option's visible label.                                               |
| `aegov-select-option-group`  | _(default)_  | The grouped `aegov-select-option` elements.                               |

### Events

| Event                | Component       | Detail                                                                      | Description                                              |
| -------------------- | --------------- | --------------------------------------------------------------------------- | -------------------------------------------------------- |
| `aegovSelectChange`  | `aegov-select`  | `{ value: string \| string[]; label: string \| string[] }`                  | Fires when the selected value changes.                   |
| `aegovSelectOpen`    | `aegov-select`  | `void`                                                                      | Fires when the listbox dropdown opens (listbox variant only).|
| `aegovSelectClose`   | `aegov-select`  | `void`                                                                      | Fires when the listbox dropdown closes (listbox variant only).|

For multi-select, the event detail's `value` and `label` are arrays. For single select, both are strings.

#### Listening for changes

```html
<aegov-select id="ministry" placeholder="Select a ministry">
  <aegov-select-option value="moi">Ministry of Interior</aegov-select-option>
  <aegov-select-option value="mof">Ministry of Finance</aegov-select-option>
</aegov-select>

<script>
  document.querySelector('#ministry').addEventListener('aegovSelectChange', (e) => {
    console.log('Selected:', e.detail.value, '—', e.detail.label);
  });
</script>
```

### Pass-through Attributes

The component forwards the following attribute groups onto the inner `<select>` element when running in the default (native) variant. In the listbox variant, attributes are applied to the trigger button.

| Attribute group | Forwarded? | Notes                                                                        |
| --------------- | ---------- | ---------------------------------------------------------------------------- |
| `aria-*`        | Yes        | Use to extend ARIA semantics (e.g. `aria-labelledby`, `aria-describedby`).    |
| `data-*`        | Yes        | Useful for analytics or test selectors.                                       |
| `form`          | Yes        | Associates the element with a form by `id` when not nested inside it.         |
| `autofocus`     | Yes        | Focus the control on initial page load.                                       |

---

## Accessibility

### Built-in behaviour

- The default variant renders a real `<select>`, so it inherits all native accessibility — keyboard support, type-ahead, OS-level mobile pickers, and screen reader announcements.
- The listbox variant uses the WAI-ARIA combobox pattern: the trigger has `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded`, and `aria-controls` pointing at the panel; the panel has `role="listbox"`; each option has `role="option"` and `aria-selected`; and `aria-activedescendant` tracks the focused option as the user types.
- Grouped options use `role="group"` and `aria-labelledby` to associate the group header with its members.
- The search input declares `role="searchbox"` and links to the listbox with `aria-controls`.
- Disabled options are skipped during keyboard navigation and announce as disabled.

### Developer responsibilities

- Provide a meaningful `placeholder` and pair the select with an `aegov-label` linked via `field-id` so the control has a programmatic label.
- Use the default (native) variant whenever search and multi-select are unnecessary — it is faster, lighter, and gives the best mobile experience.
- For long lists (countries, services, time slots) prefer `is-searchable="true"` so users can filter with the keyboard.
- Keep option labels concise. The trigger truncates long single-select labels and shows a count for multi-select; hidden labels become invisible to mouse users.

### Keyboard support (listbox variant)

| Key                       | Action                                                          |
| ------------------------- | --------------------------------------------------------------- |
| `Enter`, `Space`, `↓`     | Open the dropdown when closed.                                  |
| `↑` / `↓`                 | Move focus to the previous / next enabled option.                |
| `Home` / `End`            | Jump to the first / last enabled option.                        |
| `Enter` / `Space`         | Select the focused option (in single mode this also closes the dropdown). |
| `Escape`                  | Close the dropdown and return focus to the trigger.             |
| Type characters           | Filter the list when `is-searchable` is enabled.                |
| `Tab` / `Shift + Tab`     | Move focus to the next / previous focusable element.            |

Default-variant keyboard support is provided by the browser's native `<select>` implementation.
