# Datepicker

<p class="text-lg text-aeblack-500 mb-8">A date and date-range picker for UAE Government service forms — date of birth, residency expiry, application window, leave request, appointment booking, and any other field that asks the user for one or two calendar dates. The component renders a read-only input trigger and opens a calendar in a portal attached to `document.body`, so the calendar is never clipped by overflow rules on the surrounding form. Single-date and range modes share one component, with full keyboard navigation and Arabic / English locale support out of the box.</p>

## Introduction

The `aegov-datepicker` component composes a styled trigger input with a portaled calendar popover. The trigger is `readOnly`, so users cannot type free-form text — every selection happens through the calendar dialog. Single mode commits as soon as the user clicks a day; range mode accumulates two clicks (start, then end) and commits when the second click lands on a valid day. Min/max constraints, blackout dates, range-length limits, presets, and an optional Apply / Cancel confirmation flow are all configurable via attributes.

> The calendar is rendered inside a portal at the end of `document.body`, similar to `aegov-dropdown` and `aegov-toast`. This keeps the calendar above any clipping ancestor (`overflow: hidden`, fixed cards, etc.) and lets it size itself freely.

```html
<aegov-datepicker
  placeholder="Select a date"
  format="DD MMM YYYY"
></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-datepicker
    placeholder="Select a date"
    format="DD MMM YYYY"
  ></aegov-datepicker>
</div>

---

## Single date

The default `appearance="single"` collects one date. Clicking a day commits the selection, fires `aegovDatepickerChange`, and closes the calendar.

```html
<aegov-datepicker
  placeholder="Date of birth"
  format="DD MMM YYYY"
  is-disable-future="true"
></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-datepicker
    placeholder="Date of birth"
    format="DD MMM YYYY"
    is-disable-future="true"
  ></aegov-datepicker>
</div>

---

## Date range

Set `appearance="range"` to render two trigger inputs — start and end — and a side-by-side two-month calendar in the popover. The first click marks the start, the second click marks the end. If the user clicks a day before the existing start, the dates are swapped automatically.

```html
<aegov-datepicker
  appearance="range"
  label-range-start="Check-in"
  label-range-end="Check-out"
  format="DD MMM YYYY"
></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-datepicker
    appearance="range"
    label-range-start="Check-in"
    label-range-end="Check-out"
    format="DD MMM YYYY"
  ></aegov-datepicker>
</div>

---

## Output format

The `format` property controls how the selected date is rendered into the trigger input and into the `value` string emitted with each change event. The default is `YYYY-MM-DD`.

| Token  | Output          | Example       |
| ------ | --------------- | ------------- |
| `YYYY` | 4-digit year    | `2026`        |
| `YY`   | 2-digit year    | `26`          |
| `MMMM` | Full month name | `May`         |
| `MMM`  | Short month     | `May`         |
| `MM`   | 2-digit month   | `05`          |
| `M`    | Numeric month   | `5`           |
| `DD`   | 2-digit day     | `01`          |
| `D`    | Numeric day     | `1`           |
| `dddd` | Full weekday    | `Friday`      |
| `ddd`  | Short weekday   | `Fri`         |

```html
<aegov-datepicker format="DD MMM YYYY" placeholder="DD MMM YYYY"></aegov-datepicker>
<aegov-datepicker format="MMMM D, YYYY" placeholder="MMMM D, YYYY"></aegov-datepicker>
<aegov-datepicker format="YYYY-MM-DD" placeholder="YYYY-MM-DD"></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-datepicker format="DD MMM YYYY" placeholder="DD MMM YYYY"></aegov-datepicker>
  <div class="my-4"></div>
  <aegov-datepicker format="MMMM D, YYYY" placeholder="MMMM D, YYYY"></aegov-datepicker>
  <div class="my-4"></div>
  <aegov-datepicker format="YYYY-MM-DD" placeholder="YYYY-MM-DD"></aegov-datepicker>
</div>

---

## Minimum and maximum dates

Use `min` and `max` to constrain the selectable range. Both accept an ISO date string (`YYYY-MM-DD`) or the literal `today`. The shorthand `is-disable-future="true"` is equivalent to `max="today"`, useful for date-of-birth or document-issue-date fields.

```html
<aegov-datepicker
  placeholder="Emirates ID issue date"
  is-disable-future="true"
  format="DD MMM YYYY"
></aegov-datepicker>

<aegov-datepicker
  placeholder="Appointment date"
  min="today"
  format="DD MMM YYYY"
></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-datepicker
    placeholder="Emirates ID issue date"
    is-disable-future="true"
    format="DD MMM YYYY"
  ></aegov-datepicker>
  <div class="my-4"></div>
  <aegov-datepicker
    placeholder="Appointment date"
    min="today"
    format="DD MMM YYYY"
  ></aegov-datepicker>
</div>

---

## Blackout dates

Pass a comma-separated list of ISO dates to `blackout`. Listed days are visually muted, marked `aria-disabled`, and cannot be picked — useful for closed days, public holidays, or fully booked slots.

```html
<aegov-datepicker
  placeholder="Service appointment"
  min="today"
  blackout="2026-12-02,2026-12-03,2026-01-01"
  format="DD MMM YYYY"
></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-datepicker
    placeholder="Service appointment"
    min="today"
    blackout="2026-12-02,2026-12-03,2026-01-01"
    format="DD MMM YYYY"
  ></aegov-datepicker>
</div>

---

## Range constraints

In range mode, `min-range` and `max-range` cap the number of days the user is allowed to span. The hover preview turns red while the user is dragging across an invalid range.

```html
<aegov-datepicker
  appearance="range"
  label-range-start="Leave start"
  label-range-end="Leave end"
  min-range="2"
  max-range="14"
  format="DD MMM YYYY"
></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-datepicker
    appearance="range"
    label-range-start="Leave start"
    label-range-end="Leave end"
    min-range="2"
    max-range="14"
    format="DD MMM YYYY"
  ></aegov-datepicker>
</div>

---

## Presets

In range mode, the `presets` property renders a sidebar of one-click range shortcuts. Pass a comma-separated list of preset ids; supported ids include `today`, `yesterday`, `tomorrow`, `thisWeek`, `lastWeek`, `nextWeek`, `last7Days`, `next7Days`, `last14Days`, `next14Days`, `last30Days`, `next30Days`, `thisMonth`, `lastMonth`, `nextMonth`, `last3Months`, `next3Months`, `last6Months`, `next6Months`, `thisQuarter`, `lastQuarter`, `nextQuarter`, `thisYear`, `lastYear`, `nextYear`, `yearToDate`, and `allTime`.

```html
<aegov-datepicker
  appearance="range"
  presets="today,yesterday,last7Days,thisMonth,lastMonth"
  label-range-start="From"
  label-range-end="To"
  format="DD MMM YYYY"
></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-datepicker
    appearance="range"
    presets="today,yesterday,last7Days,thisMonth,lastMonth"
    label-range-start="From"
    label-range-end="To"
    format="DD MMM YYYY"
  ></aegov-datepicker>
</div>

---

## Apply / Cancel confirmation

Set `is-with-confirmation="true"` to render Apply and Cancel buttons in the calendar footer. While the calendar is open the user's clicks build a pending selection that only commits to the trigger input on Apply. Cancel and outside-clicks discard the pending state without firing a change event.

```html
<aegov-datepicker
  appearance="range"
  is-with-confirmation="true"
  label-range-start="Start"
  label-range-end="End"
  format="DD MMM YYYY"
></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-datepicker
    appearance="range"
    is-with-confirmation="true"
    label-range-start="Start"
    label-range-end="End"
    format="DD MMM YYYY"
  ></aegov-datepicker>
</div>

---

## Week start day

The `start-day` property sets the first column of the calendar grid. `0` is Sunday (default), `1` is Monday, `6` is Saturday. UAE working-week conventions typically use `1` (Monday) or `6` (Saturday).

```html
<aegov-datepicker start-day="1" placeholder="Week starts Monday"></aegov-datepicker>
<aegov-datepicker start-day="6" placeholder="Week starts Saturday"></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-datepicker start-day="1" placeholder="Week starts Monday"></aegov-datepicker>
  <div class="my-4"></div>
  <aegov-datepicker start-day="6" placeholder="Week starts Saturday"></aegov-datepicker>
</div>

---

## Header style

`is-header-selectable` (default `true`) renders month and year `<select>` dropdowns in the calendar header so the user can jump months or years quickly. Set it to `false` to fall back to a static month-year label with only the chevron arrows for navigation.

```html
<aegov-datepicker is-header-selectable="false" placeholder="Static header"></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-datepicker is-header-selectable="false" placeholder="Static header"></aegov-datepicker>
</div>

To bound the year dropdown to a fixed range — useful when the field is meant to capture a date of birth — pair it with `year-range-start` and `year-range-end`.

```html
<aegov-datepicker
  placeholder="Date of birth"
  year-range-start="1925"
  year-range-end="2026"
  is-disable-future="true"
></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-datepicker
    placeholder="Date of birth"
    year-range-start="1925"
    year-range-end="2026"
    is-disable-future="true"
  ></aegov-datepicker>
</div>

---

## Disabled and required

Set `is-disabled="true"` to lock the trigger and prevent the calendar from opening. Set `is-required="true"` to mark the field as required and forward the `required` attribute to the inner native input.

```html
<aegov-datepicker is-required="true" placeholder="Application date"></aegov-datepicker>
<aegov-datepicker is-disabled="true" value="2026-05-01" format="DD MMM YYYY"></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-datepicker is-required="true" placeholder="Application date"></aegov-datepicker>
  <div class="my-4"></div>
  <aegov-datepicker is-disabled="true" value="2026-05-01" format="DD MMM YYYY"></aegov-datepicker>
</div>

---

## Sizes

The `size` property scales the trigger input. Tokens: `xs`, `sm`, `base` (default), `lg`, `xl`. Responsive strings (`sm md:base lg:lg`) work the same way as on `aegov-input`.

```html
<aegov-datepicker size="sm" placeholder="Small"></aegov-datepicker>
<aegov-datepicker size="base" placeholder="Base (default)"></aegov-datepicker>
<aegov-datepicker size="lg" placeholder="Large"></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-datepicker size="sm" placeholder="Small"></aegov-datepicker>
  <div class="my-4"></div>
  <aegov-datepicker size="base" placeholder="Base (default)"></aegov-datepicker>
  <div class="my-4"></div>
  <aegov-datepicker size="lg" placeholder="Large"></aegov-datepicker>
</div>

---

## Variant

The `variant` property selects the colour family for the trigger ring, the selected day fill in the calendar, the today indicator, and the hover bg. The focus ring stays `primary-support-600` (camel) and the error border stays `aered-600` regardless of variant. The selected-day glyph is always `whitely-50` for legibility on the filled cell.

- `primary` — primary-* family (default)
- `secondary` — secondary-* family
- `neutral-max` — strong neutral (aeblack-800 family)
- `neutral-min` — quiet neutral (aeblack-100 family). Selected day fill stays `aeblack-800`.

### Colour matrix

| Variant       | Trigger ring     | Selected day fill | Today indicator | Hover bg        |
| ------------- | ---------------- | ----------------- | --------------- | --------------- |
| `primary`     | `primary-400`    | `primary-600`     | `primary-700`   | `primary-50`    |
| `secondary`   | `secondary-400`  | `secondary-600`   | `secondary-700` | `secondary-50`  |
| `neutral-max` | `aeblack-400`    | `aeblack-800`     | `aeblack-800`   | `aeblack-50`    |
| `neutral-min` | `aeblack-200`    | `aeblack-800`     | `aeblack-700`   | `aeblack-50`    |

```html
<aegov-datepicker variant="primary" placeholder="Primary"></aegov-datepicker>
<aegov-datepicker variant="secondary" placeholder="Secondary"></aegov-datepicker>
<aegov-datepicker variant="neutral-max" placeholder="Neutral-max"></aegov-datepicker>
<aegov-datepicker variant="neutral-min" placeholder="Neutral-min"></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <aegov-datepicker variant="primary" placeholder="Primary"></aegov-datepicker>
    <aegov-datepicker variant="secondary" placeholder="Secondary"></aegov-datepicker>
    <aegov-datepicker variant="neutral-max" placeholder="Neutral-max"></aegov-datepicker>
    <aegov-datepicker variant="neutral-min" placeholder="Neutral-min"></aegov-datepicker>
  </div>
</div>

---

## Custom trigger

The `trigger` slot replaces the default input with any focusable element — useful for icon-only buttons or other custom launchers. The component still owns open / close state and positioning; the slotted element only needs to be focusable.

```html
<aegov-datepicker>
  <aegov-button slot="trigger" appearance="outline">
    Pick a date
  </aegov-button>
</aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-datepicker>
    <aegov-button slot="trigger" appearance="outline">
      Pick a date
    </aegov-button>
  </aegov-datepicker>
</div>

---

## Combined Example

A residency-renewal screen — required range with a Saturday week start, three quick presets, blackout days for the office closure, and Apply / Cancel confirmation.

```html
<aegov-datepicker
  appearance="range"
  is-required="true"
  is-with-confirmation="true"
  start-day="6"
  label-range-start="Renewal from"
  label-range-end="Renewal to"
  presets="today,next7Days,thisMonth,nextMonth"
  blackout="2026-12-02,2026-12-03"
  min="today"
  format="DD MMM YYYY"
></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-datepicker
    appearance="range"
    is-required="true"
    is-with-confirmation="true"
    start-day="6"
    label-range-start="Renewal from"
    label-range-end="Renewal to"
    presets="today,next7Days,thisMonth,nextMonth"
    blackout="2026-12-02,2026-12-03"
    min="today"
    format="DD MMM YYYY"
  ></aegov-datepicker>
</div>

---

## Listening for events

The component emits five custom events. `aegovDatepickerChange` is the most important — it carries both the formatted string and parsed `Date` objects.

```html
<aegov-datepicker id="dob" placeholder="Date of birth" format="DD MMM YYYY" is-disable-future="true"></aegov-datepicker>

<script>
  const dob = document.getElementById('dob');

  dob.addEventListener('aegovDatepickerChange', (e) => {
    console.log('value', e.detail.value, 'date', e.detail.date);
  });
  dob.addEventListener('aegovDatepickerOpen',  () => console.log('opened'));
  dob.addEventListener('aegovDatepickerClose', () => console.log('closed'));
  dob.addEventListener('aegovDatepickerClear', () => console.log('cleared'));
  dob.addEventListener('aegovDatepickerMonthChange', (e) => {
    console.log('viewing', e.detail.month, e.detail.year);
  });
</script>
```

---

## Programmatic access

```js
const dp = document.querySelector('aegov-datepicker');

await dp.open();                  // opens the calendar
await dp.close();                 // closes the calendar
await dp.clear();                 // clears the value
const value = await dp.getValue();        // formatted string
const start = await dp.getStartDate();    // range mode start (or false)
const end   = await dp.getEndDate();      // range mode end (or false)
const preset = await dp.getPreset();      // matching preset id (or false)
```

---

## RTL Support

The datepicker is direction-aware. When the host (or any ancestor) is set to `dir="rtl"`, the calendar inside the body portal flips its weekday columns, the previous / next month chevrons swap visual sides, and the trigger uses logical inline-start / inline-end for input alignment. Pair `dir="rtl"` with `locale="ar"` so month and weekday names render in Arabic. UAE conventions also typically use `start-day="6"` (Saturday) for the calendar's first column.

```html
<div dir="rtl">
  <aegov-datepicker
    locale="ar"
    start-day="6"
    placeholder="اختر تاريخاً"
    format="D MMMM YYYY"
  ></aegov-datepicker>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-datepicker
    locale="ar"
    start-day="6"
    placeholder="اختر تاريخاً"
    format="D MMMM YYYY"
  ></aegov-datepicker>
</div>

A range picker with Arabic presets in RTL:

```html
<div dir="rtl">
  <aegov-datepicker
    appearance="range"
    locale="ar"
    start-day="6"
    label-range-start="من"
    label-range-end="إلى"
    presets="today,last7Days,thisMonth,lastMonth"
    format="D MMMM YYYY"
  ></aegov-datepicker>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-datepicker
    appearance="range"
    locale="ar"
    start-day="6"
    label-range-start="من"
    label-range-end="إلى"
    presets="today,last7Days,thisMonth,lastMonth"
    format="D MMMM YYYY"
  ></aegov-datepicker>
</div>

---

## API Reference

### aegov-datepicker Properties

| Property              | Attribute              | Description                                                           | Type                  | Default          |
| --------------------- | ---------------------- | --------------------------------------------------------------------- | --------------------- | ---------------- |
| `appearance`             | `appearance`              | Selection mode — single date or date range.                            | `'single' \| 'range'` | `'single'`       |
| `value`               | `value`                | Pre-selected value. Range uses `"start / end"` format.                 | `string`              | `''`             |
| `format`              | `format`               | Output and display format using calendar tokens.                       | `string`              | `'YYYY-MM-DD'`   |
| `placeholder`         | `placeholder`          | Placeholder for single-mode input.                                     | `string`              | `'Select date'`  |
| `labelRangeStart`     | `label-range-start`    | Placeholder for the range-mode start input.                            | `string`              | `'Start date'`   |
| `labelRangeEnd`       | `label-range-end`      | Placeholder for the range-mode end input.                              | `string`              | `'End date'`     |
| `min`                 | `min`                  | Minimum selectable date (`YYYY-MM-DD` or `today`).                     | `string`              | `''`             |
| `max`                 | `max`                  | Maximum selectable date (`YYYY-MM-DD` or `today`).                     | `string`              | `''`             |
| `isDisableFuture`     | `is-disable-future`    | Shorthand for `max="today"`.                                           | `boolean`             | `false`          |
| `startDay`            | `start-day`            | First weekday column (0 = Sunday … 6 = Saturday).                      | `number`              | `0`              |
| `locale`              | `locale`               | BCP-47 locale used for month and weekday names.                         | `string`              | `'en'`           |
| `minRange`            | `min-range`            | Minimum number of days for range selection (0 = unconstrained).         | `number`              | `0`              |
| `maxRange`            | `max-range`            | Maximum number of days for range selection (0 = unlimited).             | `number`              | `0`              |
| `blackout`            | `blackout`             | Comma-separated list of ISO dates that cannot be selected.              | `string`              | `''`             |
| `presets`             | `presets`              | Comma-separated preset ids (range mode only).                           | `string`              | `''`             |
| `isDisabled`          | `is-disabled`          | Disables the trigger and prevents the calendar from opening.            | `boolean`             | `false`          |
| `isRequired`          | `is-required`          | Marks the inner input as required for native form validation.           | `boolean`             | `false`          |
| `isClearable`         | `is-clearable`         | Show a clear button when a value is set.                                | `boolean`             | `true`           |
| `isHeaderSelectable`  | `is-header-selectable` | Render month / year `<select>` dropdowns in the calendar header.        | `boolean`             | `true`           |
| `yearRangeStart`      | `year-range-start`     | First year in the year dropdown (0 = current year − 100).               | `number`              | `0`              |
| `yearRangeEnd`        | `year-range-end`       | Last year in the year dropdown (0 = current year + 100).                | `number`              | `0`              |
| `isWithConfirmation`  | `is-with-confirmation` | Render Apply / Cancel buttons; commits only on Apply.                   | `boolean`             | `false`          |
| `size`                | `size`                 | Trigger size token. Accepts a single token or a responsive string.       | `string`              | `'base'`         |
| `variant`             | `variant`              | Colour family for trigger ring, selected day fill, today indicator, and hover bg. Focus ring stays camel; error stays aered. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |

### Slots

| Slot      | Description                                                                                |
| --------- | ------------------------------------------------------------------------------------------ |
| `trigger` | Custom focusable element to replace the default input wrapper. The component owns open / close state. |

### Events

| Event                          | Detail                                  | Description                                                                                          |
| ------------------------------ | --------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `aegovDatepickerChange`        | `DatepickerChangeDetail`                | Fires when the value commits — single click in single mode, second click (or Apply) in range mode.    |
| `aegovDatepickerOpen`          | `void`                                  | Fires when the calendar opens.                                                                        |
| `aegovDatepickerClose`         | `void`                                  | Fires when the calendar closes.                                                                       |
| `aegovDatepickerClear`         | `void`                                  | Fires when the clear button is clicked or the `clear()` method is called.                             |
| `aegovDatepickerMonthChange`   | `{ month: number; year: number }`       | Fires whenever the visible month or year changes.                                                     |

`DatepickerChangeDetail` shape: `{ value: string; date: Date | null; startDate?: Date | null; endDate?: Date | null }`.

### Methods

| Method            | Returns                       | Description                                                                                |
| ----------------- | ----------------------------- | ------------------------------------------------------------------------------------------ |
| `open()`          | `Promise<void>`               | Opens the calendar (no-op when `is-disabled`).                                             |
| `close()`         | `Promise<void>`               | Closes the calendar.                                                                       |
| `clear()`         | `Promise<void>`               | Clears the value and emits `aegovDatepickerClear` and `aegovDatepickerChange`.             |
| `getValue()`      | `Promise<string>`             | Resolves with the current formatted value string.                                          |
| `getStartDate()`  | `Promise<string \| false>`    | Range mode: formatted start date string. `false` in single mode or when no start is set.   |
| `getEndDate()`    | `Promise<string \| false>`    | Range mode: formatted end date string. `false` in single mode or when no end is set.       |
| `getPreset()`     | `Promise<string \| false>`    | Range mode: the matching preset id for the current selection, or `false`.                  |

### Pass-through Attributes

`aria-*` and `data-*` attributes set on the host are forwarded to the inner native `<input>` element(s), plus the explicit list below. Note that `min` and `max` are component props (for date constraints), not pass-through attributes.

| Attribute group  | Forwarded to        | Notes                                                                                  |
| ---------------- | ------------------- | -------------------------------------------------------------------------------------- |
| `aria-*`         | inner `<input>`(s)  | Preserves `aria-label`, `aria-describedby`, etc. on the native input.                  |
| `data-*`         | inner `<input>`(s)  | Useful for analytics hooks and test selectors.                                         |
| `pattern`        | inner `<input>`(s)  | Native pattern attribute.                                                              |
| `minlength`      | inner `<input>`(s)  | Native minlength attribute.                                                            |
| `maxlength`      | inner `<input>`(s)  | Native maxlength attribute.                                                            |
| `step`           | inner `<input>`(s)  | Native step attribute.                                                                 |
| `autocomplete`   | inner `<input>`(s)  | Browser autofill hints.                                                                |
| `autofocus`      | inner `<input>`(s)  | Auto-focus on page load.                                                               |
| `inputmode`      | inner `<input>`(s)  | Hints the on-screen keyboard layout.                                                    |
| `list`           | inner `<input>`(s)  | Reference to a `<datalist>`.                                                            |
| `multiple`       | inner `<input>`(s)  | Native multiple attribute.                                                              |
| `accept`         | inner `<input>`(s)  | Native accept attribute.                                                                |
| `capture`        | inner `<input>`(s)  | Camera capture preference.                                                              |
| `spellcheck`     | inner `<input>`(s)  | Browser spell-check toggle.                                                             |
| `enterkeyhint`   | inner `<input>`(s)  | Hints the on-screen keyboard's Enter key label.                                         |
| `title`          | inner `<input>`(s)  | Native browser tooltip.                                                                 |
| `tabindex`       | inner `<input>`(s)  | Custom tab order.                                                                       |
| `form`           | inner `<input>`(s)  | Associates the input with a `<form>` element by id.                                     |
| `class`, `style` | host                | Stay on the `<aegov-datepicker>` element.                                               |

---

## Validation

`aegov-datepicker` exposes the unified [Validation Surface](validation-overview.html). Datepicker-specific notes:

### FormAssociated

The component participates in `<form>` via `ElementInternals` (no inner `<input name>`). `name` prop is required for form submission. In `range` appearance, two FormData entries submit as `name-start` and `name-end`.

### Validity flags surfaced

| Validity flag | When |
| --- | --- |
| `valueMissing` | `is-required` and no date selected |
| `tooShort` | `range` appearance, `min-range` set, selected days < min |
| `tooLong` | `range` appearance, `max-range` set, selected days > max |
| `customError` | `setCustomValidity('msg')` invoked |

### Common recipes

**Required birthdate (no future dates):**

```html
<aegov-datepicker
  name="dob"
  is-required
  is-disable-future
  hint="DD/MM/YYYY"
></aegov-datepicker>
```

**Date range with minimum 3 days:**

```html
<aegov-datepicker
  name="trip"
  appearance="range"
  min-range="3"
  max-range="30"
></aegov-datepicker>
```

**Cross-field min via another picker:**

```js
checkInPicker.addEventListener('aegovValidate', (e) => {
  // checkout cannot be earlier than checkin
  checkOutPicker.min = e.detail.value;
});
```

See [BYO Validator](validation-byo.html) for more patterns.

---

## Accessibility

### Built-in behaviour

- The trigger input has `aria-haspopup="dialog"` and reflects `aria-expanded` so screen readers announce the calendar relationship.
- The portal calendar renders as `role="dialog"` with `aria-modal="true"` and an `aria-label="Choose date"` description.
- A polite live region inside the portal announces the current month and year as the user navigates.
- Day buttons expose `aria-selected` for picked dates, `aria-current="date"` for today, and `aria-disabled` plus a disabled state for blackout / out-of-range dates.
- Focus is automatically moved into the calendar on open and returned to the original trigger on close.
- The trigger is `readOnly` so users cannot type free-form text and produce invalid dates; navigation always happens through the dialog.
- The calendar closes if the trigger scrolls off-screen, and re-positions on every scroll and resize.

### Developer responsibilities

- Provide a meaningful `placeholder` (single) or `label-range-start` / `label-range-end` (range) — these are also wired to `aria-label` on the inputs.
- For long-form labels, place the datepicker inside an `aegov-form-field` with an `aegov-label` referencing the trigger via the form-field's auto-link logic.
- If you supply a custom trigger via the `trigger` slot, ensure it is a focusable element with appropriate `aria-haspopup` and labelling.
- In Arabic locales pair `locale="ar"` with `dir="rtl"` on the host or an ancestor and set `start-day` to match the local convention (typically `6` — Saturday — in the UAE).

### Keyboard support

| Key                       | Action                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------- |
| `Enter`, `Space`          | Open the calendar from the trigger; pick the focused day inside the calendar.         |
| `Arrow Left` / `Right`    | Move the focused day by one column.                                                   |
| `Arrow Up` / `Down`       | Move the focused day by one week.                                                     |
| `PageUp` / `PageDown`     | Move the focused day by one month.                                                    |
| `Shift + PageUp` / `PageDown` | Move the focused day by one year.                                                 |
| `Home` / `End`            | Jump to the first / last day of the visible month.                                    |
| `Escape`                  | Close the calendar without committing (cancels pending state in confirmation mode).    |
| `Tab`                     | Cycle through interactive elements inside the calendar (selects, nav buttons, days).   |
