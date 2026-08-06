# Datepicker

<p class="text-lg text-aeblack-500 mb-8">A Datepicker collects a date, or a span between two dates, from a themed calendar. Use it instead of a native date input whenever the appearance must match the rest of the service, or when you need ranges, presets, blackout dates or minimum-span rules — none of which the native control offers.</p>

## Introduction

`aegov-datepicker` renders a trigger and a calendar panel. The panel is portalled to `document.body` so it is never clipped by a scrolling container, and the component is form-associated, so the chosen date submits with the form.

```html
<aegov-form-field>
  <aegov-label>Preferred appointment date</aegov-label>
  <aegov-datepicker name="appointment" placeholder="Select a date"></aegov-datepicker>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-form-field>
      <aegov-label>Preferred appointment date</aegov-label>
      <aegov-datepicker field-id="dp-intro" name="appointment" placeholder="Select a date"></aegov-datepicker>
    </aegov-form-field>
  </div>
</div>

For a date the user knows precisely — a birth date, an expiry printed on a card — a plain [`aegov-input`](aegov-input.html) with `type="date"` or three separate fields is often faster to complete than any calendar. Reach for the datepicker when the user is *choosing* rather than *transcribing*.

---

## Appearance

`appearance` chooses one date or a span.

| Appearance | Collects |
| --- | --- |
| `single` | One date. |
| `range` | A start and an end date. |

```html
<aegov-datepicker appearance="single" name="appointment" placeholder="Select a date"></aegov-datepicker>

<aegov-datepicker
  appearance="range"
  name="stay"
  label-range-start="Arrival"
  label-range-end="Departure"
></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-6">
    <aegov-datepicker field-id="dp-ap-1" appearance="single" name="dp-single" placeholder="Select a date"></aegov-datepicker>
    <aegov-datepicker field-id="dp-ap-2" appearance="range" name="dp-range" label-range-start="Arrival" label-range-end="Departure"></aegov-datepicker>
  </div>
</div>

If you are migrating from an earlier version, note this property was previously called `mode`. It is `appearance` now, matching the rest of the library.

`labelRangeStart` and `labelRangeEnd` name the two halves of a range. Set them — "Start" and "End" are rarely as clear as "Arrival" and "Departure".

---

## Format

`format` controls how the date is displayed **and** parsed, using tokens.

| Token | Produces | Example |
| --- | --- | --- |
| `YYYY` | 4-digit year | `2026` |
| `YY` | 2-digit year | `26` |
| `MMMM` | Full month name | `September` |
| `MMM` | Short month name | `Sep` |
| `MM` | 2-digit month | `09` |
| `M` | Month number | `9` |
| `DD` | 2-digit day | `01` |
| `D` | Day number | `1` |
| `ddd` | Full weekday name | `Tuesday` |
| `dd` | Short weekday name | `Tue` |

```html
<aegov-datepicker format="YYYY-MM-DD" value="2026-09-01"></aegov-datepicker>
<aegov-datepicker format="DD/MM/YYYY" value="2026-09-01"></aegov-datepicker>
<aegov-datepicker format="D MMMM YYYY" value="2026-09-01"></aegov-datepicker>
<aegov-datepicker format="ddd, D MMM YYYY" value="2026-09-01"></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-4">
    <aegov-datepicker field-id="dp-f-1" format="YYYY-MM-DD" value="2026-09-01"></aegov-datepicker>
    <aegov-datepicker field-id="dp-f-2" format="DD/MM/YYYY" value="2026-09-01"></aegov-datepicker>
    <aegov-datepicker field-id="dp-f-3" format="D MMMM YYYY" value="2026-09-01"></aegov-datepicker>
    <aegov-datepicker field-id="dp-f-4" format="ddd, D MMM YYYY" value="2026-09-01"></aegov-datepicker>
  </div>
</div>

Two things to watch:

- **`ddd` is the long weekday name and `dd` is the short one.** That is the reverse of some other date libraries, so check the table rather than assuming.
- **`value` is parsed with `format`**, except that ISO `YYYY-MM-DD` is always accepted directly. Keep your stored values ISO and use `format` purely for display, and the round trip stays unambiguous.

Month and weekday names come from `Intl`, so they follow `locale` rather than being hardcoded.

---

## Locale and first day of week

`locale` takes a BCP 47 tag and drives every month and weekday name in the calendar. `startDay` sets which day the week begins on, as a number where `0` is Sunday.

```html
<aegov-datepicker locale="en" start-day="0" format="D MMMM YYYY"></aegov-datepicker>
<aegov-datepicker locale="ar" start-day="6" format="D MMMM YYYY"></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-4">
    <aegov-datepicker field-id="dp-loc-1" locale="en" start-day="0" format="D MMMM YYYY" placeholder="English, week starts Sunday"></aegov-datepicker>
    <aegov-datepicker field-id="dp-loc-2" locale="ar" start-day="6" format="D MMMM YYYY" placeholder="عربي، يبدأ الأسبوع السبت"></aegov-datepicker>
  </div>
</div>

For UAE government services, `start-day="6"` — Saturday — matches the local working week and is usually the right choice for both languages. Set `locale` to match the page language, not the browser's.

---

## Bounds

Three independent ways to restrict which dates can be chosen.

| Property | Restricts |
| --- | --- |
| `min` / `max` | The earliest and latest selectable dates. |
| `isDisableFuture` | Blocks everything after today. |
| `blackout` | A comma-separated list of individual unavailable dates. |

```html
<!-- An appointment window -->
<aegov-datepicker name="appointment" min="2026-09-01" max="2026-12-31"></aegov-datepicker>

<!-- A birth date — never in the future -->
<aegov-datepicker name="dob" is-disable-future format="DD/MM/YYYY"></aegov-datepicker>

<!-- Public holidays and fully-booked days -->
<aegov-datepicker
  name="appointment"
  min="2026-09-01"
  blackout="2026-12-02,2026-12-03,2026-09-15"
></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-4">
    <aegov-datepicker field-id="dp-b-1" name="dp-b1" min="2026-09-01" max="2026-12-31" placeholder="Between Sep and Dec 2026"></aegov-datepicker>
    <aegov-datepicker field-id="dp-b-2" name="dp-b2" is-disable-future format="DD/MM/YYYY" placeholder="Date of birth"></aegov-datepicker>
    <aegov-datepicker field-id="dp-b-3" name="dp-b3" min="2026-09-01" blackout="2026-12-02,2026-12-03,2026-09-15" placeholder="Excludes public holidays"></aegov-datepicker>
  </div>
</div>

`blackout` dates must be written in the same `format` the component is using — or in ISO, which is always accepted. Use it for holidays and closures; use `min`/`max` for the overall window.

Blocked dates are unselectable **and** skipped by keyboard navigation, so a keyboard user cannot land on a date they cannot choose.

---

## Range constraints

In `range` appearance, `minRange` and `maxRange` bound the span in days. `0` means no limit.

```html
<!-- A stay of at least 2 and at most 30 nights -->
<aegov-datepicker
  appearance="range"
  name="stay"
  min-range="2"
  max-range="30"
  label-range-start="Arrival"
  label-range-end="Departure"
  hint="Between 2 and 30 nights"
></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-datepicker field-id="dp-rng" appearance="range" name="stay" min-range="2" max-range="30" label-range-start="Arrival" label-range-end="Departure" hint="Between 2 and 30 nights"></aegov-datepicker>
  </div>
</div>

State the rule in the `hint`. A user who discovers a maximum span only by having their click ignored will assume the calendar is broken.

---

## Presets

`presets` takes a comma-separated list of shortcut keys, rendered as buttons beside the calendar. They are most useful in `range` appearance for reporting and filtering.

```html
<aegov-datepicker
  appearance="range"
  name="period"
  presets="today,thisWeek,thisMonth,last30Days,thisQuarter,yearToDate"
></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-datepicker field-id="dp-preset" appearance="range" name="period" presets="today,thisWeek,thisMonth,last30Days,thisQuarter,yearToDate" placeholder="Select a period"></aegov-datepicker>
  </div>
</div>

### Available presets

All 27 keys:

| Group | Keys |
| --- | --- |
| Days | `today`, `yesterday`, `tomorrow` |
| Weeks | `thisWeek`, `lastWeek`, `nextWeek` |
| Rolling days | `last7Days`, `next7Days`, `last14Days`, `next14Days`, `last30Days`, `next30Days` |
| Months | `thisMonth`, `lastMonth`, `nextMonth` |
| Rolling months | `last3Months`, `next3Months`, `last6Months`, `next6Months` |
| Quarters | `thisQuarter`, `lastQuarter`, `nextQuarter` |
| Years | `thisYear`, `lastYear`, `nextYear`, `yearToDate` |
| Other | `allTime` |

Week-based presets respect `startDay`, so `thisWeek` on a Saturday-start calendar means Saturday to Friday.

An unrecognised key is ignored. Offer four to six presets — a long column of shortcuts is slower to scan than the calendar it was meant to shortcut.

Read which preset was used with `getPreset()`:

```js
const preset = await picker.getPreset();   // 'last30Days' | false
```

That returns `false` when the user picked dates by hand, which is how you tell "the last 30 days" from "1–30 September" for a saved report.

---

## Header navigation

`isHeaderSelectable` — on by default — turns the month and year in the calendar header into dropdowns, so a user can jump years instead of clicking through months.

```html
<aegov-datepicker is-header-selectable></aegov-datepicker>
<aegov-datepicker is-header-selectable="false"></aegov-datepicker>
```

`yearRangeStart` and `yearRangeEnd` bound the year dropdown. When both are `0` — the default — the list spans 100 years either side of today.

```html
<!-- A birth-date picker: no point offering 2130 -->
<aegov-datepicker
  name="dob"
  is-disable-future
  year-range-start="1930"
  year-range-end="2026"
  format="DD/MM/YYYY"
></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-4">
    <aegov-datepicker field-id="dp-hdr-1" name="dob" is-disable-future year-range-start="1930" year-range-end="2026" format="DD/MM/YYYY" placeholder="Date of birth"></aegov-datepicker>
    <aegov-datepicker field-id="dp-hdr-2" name="dp-h2" is-header-selectable="false" placeholder="Header dropdowns disabled"></aegov-datepicker>
  </div>
</div>

Always bound the years for a birth date. Clicking back through 1,200 months is a genuine accessibility barrier.

---

## Confirmation

`isWithConfirmation` adds Apply and Cancel buttons, so the selection is not committed until the user confirms.

```html
<aegov-datepicker
  appearance="range"
  name="period"
  is-with-confirmation
  presets="thisMonth,lastMonth,last30Days"
></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-datepicker field-id="dp-confirm" appearance="range" name="period2" is-with-confirmation presets="thisMonth,lastMonth,last30Days" placeholder="Select and apply"></aegov-datepicker>
  </div>
</div>

Use it when selecting a date triggers something expensive — a report re-running, a search reloading. Without confirmation, a range selection fires an intermediate change as soon as the start date is picked.

---

## Clearing

`isClearable` is **on by default**, showing a clear button once a date is selected. Turn it off for a required field where an empty value is not a valid state.

```html
<aegov-datepicker name="appointment" is-clearable="false" is-required></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-4">
    <aegov-datepicker field-id="dp-clr-1" name="dp-c1" value="2026-09-01" placeholder="Clearable (default)"></aegov-datepicker>
    <aegov-datepicker field-id="dp-clr-2" name="dp-c2" value="2026-09-01" is-clearable="false" is-required placeholder="Not clearable"></aegov-datepicker>
  </div>
</div>

---

## Custom trigger

The `trigger` slot replaces the default input-style trigger entirely, for cases where the date belongs behind a button or a compact control.

```html
<aegov-datepicker name="period" appearance="range" presets="last7Days,last30Days">
  <aegov-button slot="trigger" appearance="outline" size="sm">
    <svg class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">…</svg>
    Change period
  </aegov-button>
</aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-datepicker field-id="dp-trig" name="period3" appearance="range" presets="last7Days,last30Days,thisMonth">
    <aegov-button slot="trigger" appearance="outline" size="sm">
      <svg class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2ZM3.5 8.5v6.75c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25V8.5h-13Z" clip-rule="evenodd" /></svg>
      Change period
    </aegov-button>
  </aegov-datepicker>
</div>

With a custom trigger you own the accessible name — make sure the button says what it opens, and reflect the current selection in it or nearby so the value is visible without opening the calendar.

---

## States

```html
<aegov-datepicker is-disabled value="2026-09-01"></aegov-datepicker>
<aegov-datepicker is-required placeholder="Required"></aegov-datepicker>
<aegov-datepicker is-invalid error-message="Choose an appointment date to continue"></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-4">
    <aegov-datepicker field-id="dp-st-1" is-disabled value="2026-09-01"></aegov-datepicker>
    <aegov-datepicker field-id="dp-st-2" is-required placeholder="Required"></aegov-datepicker>
    <aegov-datepicker field-id="dp-st-3" is-invalid error-message="Choose an appointment date to continue" placeholder="Select a date"></aegov-datepicker>
    <aegov-datepicker field-id="dp-st-4" hint="Appointments are available from 1 September" placeholder="Select a date"></aegov-datepicker>
    <aegov-datepicker field-id="dp-st-5" variant="secondary" value="2026-09-01"></aegov-datepicker>
  </div>
</div>

Sizes follow the shared five-token scale, and `size` accepts a responsive string with the usual breakpoint prefixes.

---

## Composite example — appointment booking

```html
<form id="booking" novalidate>
  <aegov-form-field>
    <aegov-label>Appointment date</aegov-label>
    <aegov-datepicker
      id="date"
      name="appointment"
      is-required
      min="2026-09-01"
      max="2026-12-31"
      start-day="6"
      blackout="2026-12-02,2026-12-03"
      format="ddd, D MMMM YYYY"
      hint="Centres are closed on public holidays"
      placeholder="Select a date"
    ></aegov-datepicker>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>Time</aegov-label>
    <aegov-select id="time" name="time" is-required placeholder="Select a time" is-disabled>
    </aegov-select>
  </aegov-form-field>

  <aegov-button type="submit" variant="primary" size="lg">Confirm appointment</aegov-button>
</form>

<script type="module">
  const date = document.querySelector('#date');
  const time = document.querySelector('#time');

  date.addEventListener('aegovDatepickerChange', async (e) => {
    // detail carries both the formatted string and the Date object
    const slots = await api.availableSlots(e.detail.date);

    time.replaceChildren(...slots.map((s) => {
      const opt = document.createElement('aegov-select-option');
      opt.value = s.value;
      opt.textContent = s.label;
      return opt;
    }));

    time.value = '';
    time.isDisabled = slots.length === 0;
  });

  date.addEventListener('aegovDatepickerClear', () => {
    time.value = '';
    time.isDisabled = true;
  });
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <aegov-form-field>
      <aegov-label>Appointment date</aegov-label>
      <aegov-datepicker field-id="dp-cx-1" name="appointment" is-required min="2026-09-01" max="2026-12-31" start-day="6" blackout="2026-12-02,2026-12-03" format="ddd, D MMMM YYYY" hint="Centres are closed on public holidays" placeholder="Select a date"></aegov-datepicker>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>Time</aegov-label>
      <aegov-select field-id="dp-cx-2" name="time" is-required placeholder="Select a date first" is-disabled></aegov-select>
    </aegov-form-field>
    <aegov-button type="submit" variant="primary" size="lg">Confirm appointment</aegov-button>
  </div>
</div>

---

## Listening for events

| Event | Detail | Fires |
| --- | --- | --- |
| `aegovDatepickerChange` | `DatepickerChangeDetail` | A date or range was selected. |
| `aegovDatepickerOpen` | `void` | The calendar opened. |
| `aegovDatepickerClose` | `void` | The calendar closed. |
| `aegovDatepickerClear` | `void` | The selection was cleared. |
| `aegovDatepickerMonthChange` | `{ month: number; year: number }` | The visible month changed. |

`DatepickerChangeDetail` gives you both the display string and real `Date` objects, so you rarely need to parse anything:

```ts
{
  value: string;              // formatted, or "start / end" for a range
  date: Date | null;          // single appearance
  startDate?: Date | null;    // range appearance
  endDate?: Date | null;      // range appearance
}
```

`aegovDatepickerMonthChange` is the hook for loading availability a month at a time:

```js
picker.addEventListener('aegovDatepickerMonthChange', async (e) => {
  const unavailable = await api.fullyBookedDates(e.detail.year, e.detail.month);
  picker.blackout = unavailable.join(',');
});
```

### Methods

```js
await picker.open();
await picker.close();
await picker.clear();

await picker.getValue();       // 'Tue, 1 September 2026'
await picker.getStartDate();   // '2026-09-01' | false
await picker.getEndDate();     // '2026-09-30' | false
await picker.getPreset();      // 'last30Days' | false
```

The three range getters return `false` rather than `null` when there is nothing to report, so check with a strict comparison.

---

## RTL Support

The datepicker is direction-aware. In a `dir="rtl"` container the calendar grid runs right to left, the previous and next month buttons swap, the panel aligns to the trigger's inline-start edge, and the preset column moves to the opposite side. Arrow-key navigation follows the visual order.

Month and weekday names come from `Intl`, so setting `locale="ar"` gives you Arabic names — including Arabic-Indic day numerals, since that is what `Intl` produces for that locale.

```html
<div dir="rtl">
  <aegov-form-field>
    <aegov-label>تاريخ الموعد</aegov-label>
    <aegov-datepicker
      name="appointment"
      locale="ar"
      start-day="6"
      format="D MMMM YYYY"
      min="2026-09-01"
      is-required
      hint="المراكز مغلقة في العطل الرسمية"
      placeholder="اختر التاريخ"
    ></aegov-datepicker>
  </aegov-form-field>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-5">
    <aegov-form-field>
      <aegov-label>تاريخ الموعد</aegov-label>
      <aegov-datepicker field-id="dp-rtl-1" name="appointment" locale="ar" start-day="6" format="D MMMM YYYY" min="2026-09-01" is-required hint="المراكز مغلقة في العطل الرسمية" placeholder="اختر التاريخ"></aegov-datepicker>
    </aegov-form-field>
    <aegov-datepicker field-id="dp-rtl-2" appearance="range" locale="ar" start-day="6" name="stay-rtl" label-range-start="تاريخ الوصول" label-range-end="تاريخ المغادرة" format="D MMM YYYY"></aegov-datepicker>
  </div>
</div>

Two things you must supply yourself:

- **`locale`.** It defaults to `'en'`, so an Arabic page with the default gives you English month names inside a right-to-left calendar. Set it explicitly.
- **Preset labels.** The 27 built-in presets have English labels only. On Arabic pages, either omit `presets` and let users pick dates directly, or render your own shortcut buttons that call `picker.value = …` with the ranges you want.

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the trigger. Auto-generated when omitted, reflected. | `string` | _generated_ |
| `appearance` | `appearance` | One date or a span. Previously named `mode`. | `'single' \| 'range'` | `'single'` |
| `value` | `value` | Current value, parsed using `format` (ISO always accepted). For a range, `"start / end"`. Mutable. | `string` | `''` |
| `name` | `name` | Form field name. | `string` | — |
| `format` | `format` | Display and parse format — see [Format](#format). | `string` | `'YYYY-MM-DD'` |
| `locale` | `locale` | BCP 47 tag driving month and weekday names via `Intl`. | `string` | `'en'` |
| `startDay` | `start-day` | First day of the week. `0` is Sunday, `6` is Saturday. | `number` | `0` |
| `min` | `min` | Earliest selectable date. | `string` | `''` |
| `max` | `max` | Latest selectable date. | `string` | `''` |
| `isDisableFuture` | `is-disable-future` | Blocks every date after today. | `boolean` | `false` |
| `blackout` | `blackout` | Comma-separated unavailable dates. | `string` | `''` |
| `minRange` | `min-range` | Minimum span in days, `range` appearance. `0` means no limit. | `number` | `0` |
| `maxRange` | `max-range` | Maximum span in days, `range` appearance. `0` means no limit. | `number` | `0` |
| `presets` | `presets` | Comma-separated preset keys — see [Presets](#presets). | `string` | `''` |
| `labelRangeStart` | `label-range-start` | Label for the start half of a range. | `string` | `''` |
| `labelRangeEnd` | `label-range-end` | Label for the end half of a range. | `string` | `''` |
| `isHeaderSelectable` | `is-header-selectable` | Month and year dropdowns in the header. | `boolean` | `true` |
| `yearRangeStart` | `year-range-start` | First year in the dropdown. `0` with `yearRangeEnd` means ±100 years. | `number` | `0` |
| `yearRangeEnd` | `year-range-end` | Last year in the dropdown. | `number` | `0` |
| `isWithConfirmation` | `is-with-confirmation` | Adds Apply and Cancel buttons. | `boolean` | `false` |
| `isClearable` | `is-clearable` | Clear button once a date is chosen. **Defaults to on.** | `boolean` | `true` |
| `placeholder` | `placeholder` | Trigger text while empty. | `string` | `''` |
| `size` | `size` | Size token or responsive string. | `string` — `xs \| sm \| base \| lg \| xl` | `'base'` |
| `variant` | `variant` | Colour family. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `isDisabled` | `is-disabled` | Disables the control. | `boolean` | `false` |
| `isRequired` | `is-required` | Marks the field required. | `boolean` | `false` |
| `isInvalid` | `is-invalid` | Invalid state. Mutable and reflected. | `boolean` | `false` |
| `errorMessage` | `error-message` | Error text shown while invalid. | `string` | `''` |
| `hint` | `hint` | Helper text shown when no error is showing. | `string` | `''` |

### Slots

| Slot | Description |
| --- | --- |
| `trigger` | Replaces the default trigger entirely. You own the accessible name. |
| `hint` | Rich hint markup. Takes precedence over the `hint` property. |
| `error` | Rich error markup. Rendered only while `is-invalid`. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovDatepickerChange` | `DatepickerChangeDetail` | A date or range was selected. Carries the formatted string and `Date` objects. |
| `aegovDatepickerOpen` | `void` | The calendar opened. |
| `aegovDatepickerClose` | `void` | The calendar closed. |
| `aegovDatepickerClear` | `void` | The selection was cleared. |
| `aegovDatepickerMonthChange` | `{ month: number; year: number }` | The visible month changed. |
| `aegovValidate` | `AegovValidationDetail<AegovDatepickerValue>` | Unified validation event — see [Validation](#validation). |

### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `open()` | `Promise<void>` | Opens the calendar. |
| `close()` | `Promise<void>` | Closes the calendar. |
| `clear()` | `Promise<void>` | Clears the selection and emits `aegovDatepickerClear`. |
| `getValue()` | `Promise<string>` | The formatted value. |
| `getStartDate()` | `Promise<string \| false>` | Range start, or `false`. |
| `getEndDate()` | `Promise<string \| false>` | Range end, or `false`. |
| `getPreset()` | `Promise<string \| false>` | The preset key used, or `false` if dates were picked by hand. |
| `validate(trigger?)` | `Promise<AegovValidationResult>` | Re-runs validation and emits `aegovValidate`. |
| `setCustomValidity(message)` | `Promise<void>` | Sets `error-message` and `is-invalid`, and writes validity through `ElementInternals`. Empty string clears. |

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded — except `aria-invalid` and `aria-describedby`. |
| `data-*` | Yes | Forwarded to the trigger. |
| `aria-invalid`, `aria-describedby` | Managed | Owned by the component; `aria-describedby` composes your value with the hint and error IDs. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host. Note the calendar panel is portalled and cannot be reached by host styles. |

### The portal

The calendar is appended to `document.body` inside `.aegov-datepicker-portal`, not rendered inside the host. This keeps it above any `overflow: hidden` ancestor and out of the stacking context of a card or table. Consequences worth knowing:

- **Host styles do not reach the panel.** Styling the calendar means targeting `.aegov-datepicker-portal` globally.
- **`document.querySelector` inside your own container will not find the panel.** In tests, wait for `.aegov-datepicker-portal .aegov-datepicker`.
- **The panel inherits direction from the document**, not from your local wrapper — so set `dir` on `<html>` when the whole page is Arabic rather than only on a container.

---

## Validation

### Surface

`aegov-datepicker` implements the shared contract. It is a **form-associated custom element** using `ElementInternals.setFormValue()`, which is why Safari 16.4 is the support floor. Full reference: [Validation Surface](validation-overview.html).

| Appearance | JS value | FormData |
| --- | --- | --- |
| `single` | `string` — ISO 8601 | one entry under `name` |
| `range` | `{ start, end }` | `name-start` and `name-end` |

```js
const data = new FormData(form);

data.get('appointment');     // '2026-09-01'
data.get('stay-start');      // '2026-09-01'
data.get('stay-end');        // '2026-09-08'
```

Relevant validity flags: `valueMissing` when required and empty, `rangeUnderflow` and `rangeOverflow` for `min` and `max`, and `customError` for anything you set yourself.

### Common recipes

Required date:

```js
picker.addEventListener('aegovValidate', (e) => {
  const empty = !e.detail.value;
  picker.isInvalid = empty;
  picker.errorMessage = empty ? 'Choose an appointment date to continue' : '';
});
```

A rule the component cannot express — no weekends:

```js
picker.addEventListener('aegovDatepickerChange', async (e) => {
  const day = e.detail.date?.getDay();
  const isWeekend = day === 5 || day === 6;      // Fri/Sat
  await picker.setCustomValidity(isWeekend ? 'Choose a working day' : '');
});
```

Server-side availability:

```js
picker.addEventListener('aegovDatepickerChange', async (e) => {
  const free = await api.isDateAvailable(e.detail.date);
  await picker.setCustomValidity(free ? '' : 'That date is fully booked. Choose another.');
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
  appointment: v.pipe(v.string(), v.nonEmpty('Choose an appointment date')),
}), valibotAdapter());
```

---

## Accessibility

### Built-in behaviour

- The trigger reports its expanded state and the relationship to the calendar panel, so a screen reader user knows a calendar is available and whether it is open.
- The calendar is a grid with the current month announced, and the focused day tracked — arrow keys move between days, and blocked dates are skipped rather than being focusable dead ends.
- Blocked dates — outside `min`/`max`, in `blackout`, or beyond `isDisableFuture` — are marked unavailable, not merely styled.
- The panel is portalled to `document.body`, so a focused day is never clipped by a scrolling ancestor. This also addresses WCAG 2.2 SC 2.4.11, since the calendar cannot be hidden behind an overflow boundary.
- Focus returns to the trigger when the calendar closes, using `preventScroll` so the page does not jump.
- Clicking outside or pressing `Escape` closes the panel without committing a change.
- Month and weekday names are produced by `Intl` from `locale`, so they are correctly localised rather than translated by hand.
- `aria-describedby` is composed, preserving your own value alongside the hint and error region IDs.
- The error region takes `role="alert"` only after first blur.
- The focus ring is a high-contrast camel outline held constant across variants, meeting the 3:1 requirement of WCAG 2.2 SC 1.4.11.

### Developer responsibilities

- **Always label the field**, via [`aegov-label`](aegov-label.html) inside [`aegov-form-field`](aegov-form-field.html) — or by naming your own `trigger` slot content.
- **Set `locale` to match the page.** It defaults to `'en'`; an Arabic page left on the default shows English month names.
- **Set `start-day="6"`** for UAE services, so the calendar week matches the working week.
- **State the constraints in the `hint`.** Minimum spans, blackout reasons and available windows must be readable *before* the user tries a date and finds it inert.
- **Bound the year range** for birth dates. The default ±100 years makes header navigation impractical.
- **Provide a typed alternative** for dates the user already knows. A calendar is slower than typing for a birth date or a card expiry, and for some users it is much slower.
- **Never signal an error with colour alone** (WCAG 2.2 SC 1.4.1) — populate `error-message` or the `error` slot.
- **Supply your own Arabic shortcut buttons** if you need presets on Arabic pages; the built-in preset labels are English-only.
- **Set `dir` on `<html>`** for Arabic pages, because the portalled panel inherits direction from the document rather than from a local wrapper.
- **Use `isWithConfirmation`** when a selection triggers expensive work, so an intermediate range selection does not fire it.

### Keyboard support

| Key | Action |
| --- | --- |
| `Enter`, `Space` | Open the calendar from the trigger; select the focused day when open. |
| `Escape` | Close the calendar without committing, returning focus to the trigger. |
| `ArrowLeft`, `ArrowRight` | Move one day. Follows visual order, so it reverses under `dir="rtl"`. |
| `ArrowUp`, `ArrowDown` | Move one week. |
| `Home`, `End` | Move to the start or end of the week. |
| `Page Up`, `Page Down` | Move one month. |
| `Tab` | Move through the panel's controls — header dropdowns, presets, confirmation buttons — and out of the calendar. |

Blocked dates are skipped by all day-movement keys.

---

## Where to next

- [Input](aegov-input.html) — `type="date"` and typed date entry.
- [Select](aegov-select.html) — for a time slot beside the date.
- [Form Field](aegov-form-field.html) and [Label](aegov-label.html) — the wrapper and label.
- [Dropdown](aegov-dropdown.html) and [Popover](aegov-popover.html) — the other portalled components, with the same portal caveats.
- [Validation Surface](validation-overview.html) and [Bring Your Own Validator](validation-byo.html).
