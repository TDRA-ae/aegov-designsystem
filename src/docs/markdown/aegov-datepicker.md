# aegov-datepicker

A date and date-range picker. Renders a read-only input trigger and opens a calendar in a portal attached to `document.body`. Supports single dates, ranges, presets, custom locales, blackout dates, min/max constraints, and an optional Apply/Cancel confirmation flow. Fully keyboard accessible.

## Properties

### variant

Selection mode.

```html
<aegov-datepicker variant="single"></aegov-datepicker>
<aegov-datepicker variant="range"></aegov-datepicker>
```

### value

Pre-selected value. Single mode uses one date string in `format`. Range mode uses two dates joined by ` / `.

```html
<aegov-datepicker value="2024-06-15"></aegov-datepicker>
<aegov-datepicker variant="range" value="2024-06-01 / 2024-06-15"></aegov-datepicker>
```

### format

Output and display format. Tokens: `YYYY`, `YY`, `MM`, `M`, `DD`, `D`, `MMM`, `MMMM`, `dd`, `ddd`.

```html
<aegov-datepicker format="DD MMM YYYY"></aegov-datepicker>
<aegov-datepicker format="MMMM D, YYYY"></aegov-datepicker>
```

### placeholder

Placeholder for single mode.

```html
<aegov-datepicker placeholder="Select a date"></aegov-datepicker>
```

### label-range-start / label-range-end

Placeholders for the two range-mode inputs.

```html
<aegov-datepicker variant="range" label-range-start="From" label-range-end="To"></aegov-datepicker>
```

### min / max

Minimum and maximum selectable dates (`YYYY-MM-DD` strings or the literal `today`).

```html
<aegov-datepicker min="2024-01-01" max="2024-12-31"></aegov-datepicker>
<aegov-datepicker min="today"></aegov-datepicker>
```

### is-disable-future

Shorthand for `max="today"`.

```html
<aegov-datepicker is-disable-future></aegov-datepicker>
```

### start-day

First day of the week. `0` = Sunday, `1` = Monday, ... `6` = Saturday.

```html
<aegov-datepicker start-day="1"></aegov-datepicker>
```

### locale

BCP-47 locale used for month and weekday names.

```html
<aegov-datepicker locale="ar"></aegov-datepicker>
<aegov-datepicker locale="fr"></aegov-datepicker>
```

### min-range / max-range

Minimum and maximum number of days for range selection. `0` means unconstrained.

```html
<aegov-datepicker variant="range" min-range="2" max-range="14"></aegov-datepicker>
```

### blackout

Comma-separated list of ISO dates that cannot be selected.

```html
<aegov-datepicker blackout="2024-12-25,2024-12-26,2025-01-01"></aegov-datepicker>
```

### presets

Comma-separated preset IDs (e.g. `today`, `yesterday`, `last7Days`, `thisMonth`, `lastMonth`). Renders a presets panel beside the calendar in range mode.

```html
<aegov-datepicker variant="range" presets="today,last7Days,thisMonth"></aegov-datepicker>
```

### is-disabled / is-required / is-clearable

```html
<aegov-datepicker is-disabled></aegov-datepicker>
<aegov-datepicker is-required></aegov-datepicker>
<!-- is-clearable defaults to true; set false to hide the clear button -->
<aegov-datepicker is-clearable="false" value="2024-06-15"></aegov-datepicker>
```

### is-header-selectable

When `true` (default), the header shows month and year `<select>` dropdowns; when `false`, it shows a static label.

```html
<aegov-datepicker is-header-selectable="false"></aegov-datepicker>
```

### year-range-start / year-range-end

Constrains the year dropdown to a fixed range. If not provided, the picker uses current year ± 100.

```html
<aegov-datepicker year-range-start="1950" year-range-end="2050"></aegov-datepicker>
```

### is-with-confirmation

Adds Apply and Cancel buttons. The user's clicks become "pending" until Apply is pressed.

```html
<aegov-datepicker is-with-confirmation></aegov-datepicker>
```

### size

Size of the trigger input (`xs`, `sm`, `base`, `lg`, `xl`, or responsive).

```html
<aegov-datepicker size="lg"></aegov-datepicker>
<aegov-datepicker size="sm md:base lg:lg"></aegov-datepicker>
```

## Sizes

```html
<aegov-datepicker size="xs"></aegov-datepicker>
<aegov-datepicker size="sm"></aegov-datepicker>
<aegov-datepicker size="base"></aegov-datepicker>
<aegov-datepicker size="lg"></aegov-datepicker>
<aegov-datepicker size="xl"></aegov-datepicker>
```

## Examples

### Single date

```html
<aegov-datepicker placeholder="Select a date" format="DD MMM YYYY"></aegov-datepicker>
```

### Date range with two-month calendar

```html
<aegov-datepicker variant="range" label-range-start="Check-in" label-range-end="Check-out"></aegov-datepicker>
```

### With presets

```html
<aegov-datepicker
  variant="range"
  presets="today,yesterday,last7Days,thisMonth,lastMonth"
></aegov-datepicker>
```

### With Apply / Cancel confirmation

```html
<aegov-datepicker is-with-confirmation variant="range"></aegov-datepicker>
```

### Disable future dates

```html
<aegov-datepicker is-disable-future placeholder="Date of birth"></aegov-datepicker>
```

### Blackout dates and constrained range

```html
<aegov-datepicker
  variant="range"
  min="2025-01-01"
  max="2025-12-31"
  blackout="2025-12-25,2026-01-01"
  min-range="3"
  max-range="14"
></aegov-datepicker>
```

### Custom locale and start day

```html
<aegov-datepicker locale="ar" start-day="6"></aegov-datepicker>
<aegov-datepicker locale="fr" start-day="1"></aegov-datepicker>
```

### Custom trigger via slot

```html
<aegov-datepicker>
  <button slot="trigger" class="my-button">Open calendar</button>
</aegov-datepicker>
```

## RTL Behavior

When the host (or any ancestor) has `dir="rtl"`, the calendar inside the body portal follows logical layout: weekday columns flip, the previous/next month buttons swap visual sides, and the input wrapper aligns its inputs and adornments using inline-start / inline-end. Month and weekday names use the configured `locale`, so set `locale="ar"` (or another RTL locale) along with `dir="rtl"` for fully localized output. The portal positioning logic always anchors the calendar to the trigger's start edge in both LTR and RTL.

## API Reference

### Properties

| Property              | Attribute               | Description                                              | Type              | Default       |
| --------------------- | ----------------------- | -------------------------------------------------------- | ----------------- | ------------- |
| `variant`             | `variant`               | `'single'` or `'range'`.                                 | `DatepickerMode`  | `'single'`    |
| `value`               | `value`                 | Current value (string).                                  | `string`          | `''`          |
| `format`              | `format`                | Output/display format.                                   | `string`          | `'YYYY-MM-DD'`|
| `placeholder`         | `placeholder`           | Placeholder for single mode.                             | `string`          | `'Select date'`|
| `labelRangeStart`     | `label-range-start`     | Placeholder for range start input.                       | `string`          | `'Start date'`|
| `labelRangeEnd`       | `label-range-end`       | Placeholder for range end input.                         | `string`          | `'End date'`  |
| `min`                 | `min`                   | Minimum date (`'YYYY-MM-DD'` or `'today'`).              | `string`          | `''`          |
| `max`                 | `max`                   | Maximum date (`'YYYY-MM-DD'` or `'today'`).              | `string`          | `''`          |
| `isDisableFuture`     | `is-disable-future`     | Shorthand for `max="today"`.                             | `boolean`         | `false`       |
| `startDay`            | `start-day`             | First weekday (0=Sun … 6=Sat).                           | `number`          | `0`           |
| `locale`              | `locale`                | BCP-47 locale for names.                                 | `string`          | `'en'`        |
| `minRange`            | `min-range`             | Minimum days in range.                                   | `number`          | `0`           |
| `maxRange`            | `max-range`             | Maximum days in range (0 = unlimited).                   | `number`          | `0`           |
| `blackout`            | `blackout`              | Comma-separated unselectable dates.                      | `string`          | `''`          |
| `presets`             | `presets`               | Comma-separated preset IDs.                              | `string`          | `''`          |
| `isDisabled`          | `is-disabled`           | Disables the trigger.                                    | `boolean`         | `false`       |
| `isRequired`          | `is-required`           | Marks the input as required.                             | `boolean`         | `false`       |
| `isClearable`         | `is-clearable`          | Show clear button when a value is set.                   | `boolean`         | `true`        |
| `isHeaderSelectable`  | `is-header-selectable`  | Use month/year selects in header.                        | `boolean`         | `true`        |
| `yearRangeStart`      | `year-range-start`      | First year in dropdown (0 = auto).                       | `number`          | `0`           |
| `yearRangeEnd`        | `year-range-end`        | Last year in dropdown (0 = auto).                        | `number`          | `0`           |
| `isWithConfirmation`  | `is-with-confirmation`  | Render Apply/Cancel buttons.                             | `boolean`         | `false`       |
| `size`                | `size`                  | Input size (responsive supported).                       | `string`          | `'base'`      |

### Pass-through Attributes

`aria-*`, `data-*`, plus the explicit list `pattern`, `minlength`, `maxlength`, `step`, `autocomplete`, `autofocus`, `inputmode`, `list`, `multiple`, `accept`, `capture`, `spellcheck`, `enterkeyhint`, `title`, `tabindex`, `form` are forwarded to the inner `<input>` element(s). Note: `min` and `max` are component props, not pass-through.

### Events

| Event                          | Description                                              | Detail                                                  |
| ------------------------------ | -------------------------------------------------------- | ------------------------------------------------------- |
| `aegovDatepickerChange`        | Fires when the value commits (single click or range pair / Apply). | `DatepickerChangeDetail`                                |
| `aegovDatepickerOpen`          | Fires when the calendar opens.                           | `void`                                                  |
| `aegovDatepickerClose`         | Fires when the calendar closes.                          | `void`                                                  |
| `aegovDatepickerClear`         | Fires when the clear button or `clear()` method is used. | `void`                                                  |
| `aegovDatepickerMonthChange`   | Fires whenever the visible month or year changes.        | `{ month: number; year: number }`                       |

`DatepickerChangeDetail` shape: `{ value: string; date: Date | null; startDate?: Date | null; endDate?: Date | null }`.

### Event listening example

```html
<aegov-datepicker id="dp" variant="range" presets="today,last7Days"></aegov-datepicker>
<script>
  const dp = document.getElementById('dp');
  dp.addEventListener('aegovDatepickerChange', (e) => {
    console.log('value', e.detail.value, 'startDate', e.detail.startDate, 'endDate', e.detail.endDate);
  });
  dp.addEventListener('aegovDatepickerOpen', () => console.log('opened'));
  dp.addEventListener('aegovDatepickerClose', () => console.log('closed'));
  dp.addEventListener('aegovDatepickerMonthChange', (e) => {
    console.log('viewing', e.detail.month, e.detail.year);
  });
</script>
```

### Slots

| Slot      | Description                                                                  |
| --------- | ---------------------------------------------------------------------------- |
| `trigger` | Custom trigger element. When provided, the default input wrapper is replaced. |

### Methods

| Method            | Description                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------ |
| `open()`          | Opens the calendar (no-op when `is-disabled`).                                             |
| `close()`         | Closes the calendar.                                                                       |
| `clear()`         | Clears the value and emits `aegovDatepickerClear` and `aegovDatepickerChange`.             |
| `getValue()`      | Resolves to the current formatted value string.                                            |
| `getStartDate()`  | Range mode: formatted start date string. `false` in single mode or when no start is set.   |
| `getEndDate()`    | Range mode: formatted end date string. `false` in single mode or when no end is set.       |
| `getPreset()`     | Range mode: the matching preset ID for the current selection, or `false`.                  |

```js
const dp = document.querySelector('aegov-datepicker');
await dp.open();
const value = await dp.getValue();
await dp.clear();
```

## Accessibility

### Built-in

- The trigger input has `aria-haspopup="dialog"` and reflects `aria-expanded` so screen readers announce the calendar relationship.
- The portal calendar renders as `role="dialog"` with `aria-modal="true"` and an `aria-label="Choose date"` description.
- A polite live region inside the portal announces the current month and year as the user navigates.
- Day buttons expose `aria-selected` for picked dates, `aria-current="date"` for today, and `aria-disabled` plus a disabled state for blackout / out-of-range dates.
- Full keyboard support: Arrow keys move the focused day by 1 / 7; PageUp / PageDown move by month (Shift adds the year); Home / End jump to first / last day of the month; Enter / Space picks the focused day; Escape closes the calendar.
- Focus is automatically moved into the calendar on open and returned to the original trigger on close.
- The trigger is `readOnly` so users cannot type free-form text and produce invalid dates; navigation always happens through the dialog.

### Developer responsibilities

- Provide a meaningful `placeholder` (single) or `label-range-start` / `label-range-end` (range) — these are also wired to `aria-label` on the inputs.
- For long-form labels, place the datepicker inside an `aegov-form-field` with an `aegov-label` and a `for` matching the trigger's auto-generated id.
- If you supply a custom trigger via the `trigger` slot, ensure it is a focusable element with appropriate `aria-haspopup` and labelling.

### Notes

- The calendar is portaled to `document.body`, so it ignores ancestor `overflow: hidden` clipping. The component re-positions on scroll/resize and closes if the trigger scrolls off-screen.
- In confirmation mode (`is-with-confirmation`), clicks build a pending selection that only commits on Apply; Cancel and outside-clicks discard the pending state without firing change.
- Locale defaults to `'en'`; for fully localized layouts pair `locale` with `dir="rtl"` on the host or an ancestor and set `start-day` to match the local convention.
