# Datepicker

<p class="text-lg text-aeblack-500 mb-8">A feature-rich date selection component supporting single date and date range picking, with a calendar popup, format tokens, locale support, presets, min/max constraints, and full keyboard navigation.</p>

## Introduction

The `aegov-datepicker` component provides a complete date selection experience. It supports **single date** and **date range** modes, customisable display formats, locale-aware month and day names, min/max date constraints, unavailable dates, range presets, and an optional confirmation step with Apply/Cancel buttons.

The calendar popup is rendered as a **portal** appended to `document.body`, ensuring it is never clipped by parent overflow or stacking context issues.

```html
<aegov-datepicker></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-datepicker></aegov-datepicker>
</div>

---

## Single Date Selection

By default the datepicker operates in `single` mode. Click the input to open the calendar, then click a day to select it. The calendar closes automatically after selection.

```html
<aegov-datepicker placeholder="Choose a date"></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-datepicker placeholder="Choose a date"></aegov-datepicker>
</div>

---

## Pre-selected Value

Set the `value` attribute to pre-populate the datepicker. For single mode, use an ISO date string (or a string matching your `format`). For range mode, use the format `"start / end"`.

```html
<aegov-datepicker value="2026-03-15"></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-datepicker value="2026-03-15"></aegov-datepicker>
</div>

---

## Display Format

The `format` property controls how the selected date is displayed in the input. It uses token-based formatting.

| Token  | Output          | Example    |
|--------|-----------------|------------|
| `YYYY` | 4-digit year    | 2026       |
| `YY`   | 2-digit year    | 26         |
| `MMMM` | Full month name | March      |
| `MMM`  | Short month     | Mar        |
| `MM`   | 2-digit month   | 03         |
| `M`    | Month (no pad)  | 3          |
| `DD`   | 2-digit day     | 07         |
| `D`    | Day (no pad)    | 7          |
| `ddd`  | Full weekday    | Wednesday  |
| `dd`   | Short weekday   | Wed        |

```html
<!-- Default ISO format -->
<aegov-datepicker format="YYYY-MM-DD" value="2026-03-15"></aegov-datepicker>

<!-- Human-friendly format -->
<aegov-datepicker format="DD MMM YYYY" value="2026-03-15"></aegov-datepicker>

<!-- US-style format -->
<aegov-datepicker format="MM/DD/YYYY" value="2026-03-15"></aegov-datepicker>

<!-- With weekday name -->
<aegov-datepicker format="ddd, DD MMMM YYYY" value="2026-03-15"></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div>
    <p class="text-sm text-aeblack-500 mb-1">YYYY-MM-DD (default)</p>
    <aegov-datepicker format="YYYY-MM-DD" value="2026-03-15"></aegov-datepicker>
  </div>
  <div>
    <p class="text-sm text-aeblack-500 mb-1">DD MMM YYYY</p>
    <aegov-datepicker format="DD MMM YYYY" value="2026-03-15"></aegov-datepicker>
  </div>
  <div>
    <p class="text-sm text-aeblack-500 mb-1">MM/DD/YYYY</p>
    <aegov-datepicker format="MM/DD/YYYY" value="2026-03-15"></aegov-datepicker>
  </div>
  <div>
    <p class="text-sm text-aeblack-500 mb-1">ddd, DD MMMM YYYY</p>
    <aegov-datepicker format="ddd, DD MMMM YYYY" value="2026-03-15"></aegov-datepicker>
  </div>
</div>

---

## Sizes

The `size` property controls the height and padding of the datepicker input. There are 5 sizes available, matching the sizing of other form components such as `aegov-input`.

| Size   | Height | Text Size |
|--------|--------|-----------|
| `xs`   | 36px   | text-sm   |
| `sm`   | 40px   | text-sm   |
| `base` | 44px   | text-base |
| `lg`   | 48px   | text-lg   |
| `xl`   | 52px   | text-lg   |

```html
<aegov-datepicker size="xs" placeholder="Extra Small"></aegov-datepicker>
<aegov-datepicker size="sm" placeholder="Small"></aegov-datepicker>
<aegov-datepicker size="base" placeholder="Base (default)"></aegov-datepicker>
<aegov-datepicker size="lg" placeholder="Large"></aegov-datepicker>
<aegov-datepicker size="xl" placeholder="Extra Large"></aegov-datepicker>
```

<div class="flex flex-wrap items-center gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-datepicker size="xs" placeholder="Extra Small"></aegov-datepicker>
  <aegov-datepicker size="sm" placeholder="Small"></aegov-datepicker>
  <aegov-datepicker size="base" placeholder="Base"></aegov-datepicker>
  <aegov-datepicker size="lg" placeholder="Large"></aegov-datepicker>
  <aegov-datepicker size="xl" placeholder="Extra Large"></aegov-datepicker>
</div>

### Responsive Size

The `size` prop accepts Tailwind-style responsive prefixes. Write a space-separated string where each token is either a plain value or `breakpoint:value`. The base value (no prefix) applies below the smallest specified breakpoint.

Available breakpoints: `xs` (480px), `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px), `3xl` (1680px).

```html
<aegov-datepicker size="sm xl:lg" placeholder="Responsive datepicker"></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-datepicker size="sm xl:lg" placeholder="Responsive datepicker"></aegov-datepicker>
</div>

> **Graceful degradation:** Unknown breakpoint names and invalid values are silently ignored. An unrecognised base value falls back to the component default.

---

## Disabled State

Set the `disabled` attribute to prevent the user from opening the calendar or interacting with the input.

```html
<aegov-datepicker disabled placeholder="Cannot select"></aegov-datepicker>
<aegov-datepicker disabled value="2026-03-15"></aegov-datepicker>
```

<div class="flex flex-wrap items-center gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-datepicker disabled placeholder="Cannot select"></aegov-datepicker>
  <aegov-datepicker disabled value="2026-03-15"></aegov-datepicker>
</div>

---

## Placeholder

Use the `placeholder` property to customise the placeholder text shown when no date is selected.

```html
<aegov-datepicker placeholder="Pick your birthday"></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-datepicker placeholder="Pick your birthday"></aegov-datepicker>
</div>

---

## Min and Max Dates

Use `min` and `max` to constrain the selectable date range. Dates outside these bounds are visually dimmed and cannot be selected. Both accept ISO date strings or the special keyword `"today"`.

```html
<!-- Only allow dates from today onwards -->
<aegov-datepicker min="today" placeholder="Future dates only"></aegov-datepicker>

<!-- Only allow dates up to today -->
<aegov-datepicker max="today" placeholder="Past dates only"></aegov-datepicker>

<!-- Specific date range -->
<aegov-datepicker min="2026-01-01" max="2026-12-31" placeholder="Year 2026 only"></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div>
    <p class="text-sm text-aeblack-500 mb-1">Future dates only (min="today")</p>
    <aegov-datepicker min="today" placeholder="Future dates only"></aegov-datepicker>
  </div>
  <div>
    <p class="text-sm text-aeblack-500 mb-1">Past dates only (max="today")</p>
    <aegov-datepicker max="today" placeholder="Past dates only"></aegov-datepicker>
  </div>
  <div>
    <p class="text-sm text-aeblack-500 mb-1">Year 2026 only</p>
    <aegov-datepicker min="2026-01-01" max="2026-12-31" placeholder="Year 2026 only"></aegov-datepicker>
  </div>
</div>

---

## Disable Future Dates

The `disable-future` attribute is a convenient shorthand for `max="today"`. All dates after today are disabled.

```html
<aegov-datepicker disable-future placeholder="No future dates"></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-datepicker disable-future placeholder="No future dates"></aegov-datepicker>
</div>

---

## Unavailable Dates

Use `unavailable-dates` to provide a comma-separated list of specific ISO dates that cannot be selected. These dates appear dimmed in the calendar alongside any min/max constraints.

```html
<aegov-datepicker
  unavailable-dates="2026-03-10,2026-03-15,2026-03-20"
  placeholder="Some dates blocked"
></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-datepicker unavailable-dates="2026-03-10,2026-03-15,2026-03-20" value="2026-03-12" placeholder="Some dates blocked"></aegov-datepicker>
</div>

---

## Clearable

By default, the datepicker shows a clear button (X) when a value is selected. Set `clearable="false"` to hide it.

```html
<!-- Clearable (default) -->
<aegov-datepicker value="2026-03-15"></aegov-datepicker>

<!-- Not clearable -->
<aegov-datepicker value="2026-03-15" clearable="false"></aegov-datepicker>
```

<div class="flex flex-wrap items-center gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div>
    <p class="text-sm text-aeblack-500 mb-1">Clearable (default)</p>
    <aegov-datepicker value="2026-03-15"></aegov-datepicker>
  </div>
  <div>
    <p class="text-sm text-aeblack-500 mb-1">Not clearable</p>
    <aegov-datepicker value="2026-03-15" clearable="false"></aegov-datepicker>
  </div>
</div>

---

## Locale

The `locale` property accepts a BCP 47 language tag and controls the month names and weekday names displayed in the calendar. The component uses `Intl.DateTimeFormat` under the hood.

```html
<aegov-datepicker locale="en" placeholder="English"></aegov-datepicker>
<aegov-datepicker locale="ar" placeholder="Arabic"></aegov-datepicker>
<aegov-datepicker locale="fr" placeholder="French"></aegov-datepicker>
```

<div class="flex flex-wrap items-center gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-datepicker locale="en" placeholder="English"></aegov-datepicker>
  <aegov-datepicker locale="ar" placeholder="Arabic"></aegov-datepicker>
  <aegov-datepicker locale="fr" placeholder="French"></aegov-datepicker>
</div>

---

## First Day of Week

The `start-day` property controls which day of the week appears first in the calendar grid. The default is `0` (Sunday). Set `1` for Monday, `6` for Saturday, and so on.

```html
<!-- Monday start -->
<aegov-datepicker start-day="1" placeholder="Week starts Monday"></aegov-datepicker>

<!-- Saturday start -->
<aegov-datepicker start-day="6" placeholder="Week starts Saturday"></aegov-datepicker>
```

<div class="flex flex-wrap items-center gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-datepicker start-day="0" placeholder="Sunday (default)"></aegov-datepicker>
  <aegov-datepicker start-day="1" placeholder="Monday start"></aegov-datepicker>
  <aegov-datepicker start-day="6" placeholder="Saturday start"></aegov-datepicker>
</div>

---

## Month and Year Navigation

By default, the calendar header includes **month and year dropdown selects** (`selectable-header` is `true`). Set `selectable-header="false"` to show a simple text label instead.

The previous/next arrows always allow navigating one month at a time.

```html
<!-- Dropdowns (default) -->
<aegov-datepicker selectable-header="true"></aegov-datepicker>

<!-- Simple label -->
<aegov-datepicker selectable-header="false"></aegov-datepicker>
```

<div class="flex flex-wrap items-center gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div>
    <p class="text-sm text-aeblack-500 mb-1">With dropdown selects (default)</p>
    <aegov-datepicker></aegov-datepicker>
  </div>
  <div>
    <p class="text-sm text-aeblack-500 mb-1">Simple text label</p>
    <aegov-datepicker selectable-header="false"></aegov-datepicker>
  </div>
</div>

---

## Year Range

Use `year-range-start` and `year-range-end` to limit the years available in the dropdown select. By default the range spans 100 years before and after the current year.

```html
<aegov-datepicker year-range-start="2020" year-range-end="2030" placeholder="2020-2030 only"></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-datepicker year-range-start="2020" year-range-end="2030" placeholder="2020-2030 only"></aegov-datepicker>
</div>

---

## Date Range Selection

Set `mode="range"` to enable date range selection. The input shows two fields (start and end) separated by an arrow. Click the first date, then click the second to complete the range. In range mode the calendar displays **two months** side by side.

```html
<aegov-datepicker mode="range"></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-datepicker mode="range"></aegov-datepicker>
</div>

### Pre-selected Range

```html
<aegov-datepicker mode="range" value="2026-03-01 / 2026-03-15"></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-datepicker mode="range" value="2026-03-01 / 2026-03-15"></aegov-datepicker>
</div>

### Range Placeholders

Customise the placeholder text for start and end inputs using `range-placeholder-start` and `range-placeholder-end`.

```html
<aegov-datepicker
  mode="range"
  range-placeholder-start="Check-in"
  range-placeholder-end="Check-out"
></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-datepicker mode="range" range-placeholder-start="Check-in" range-placeholder-end="Check-out"></aegov-datepicker>
</div>

---

## Min/Max Range Length

In range mode, use `min-range` and `max-range` to constrain the number of days that can be selected. When hovering over dates that would create an invalid range, the preview turns red to indicate the constraint violation.

```html
<!-- Must select at least 3 days, at most 14 days -->
<aegov-datepicker mode="range" min-range="3" max-range="14"></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-datepicker mode="range" min-range="3" max-range="14" range-placeholder-start="Min 3 days" range-placeholder-end="Max 14 days"></aegov-datepicker>
</div>

---

## Range Presets

In range mode, the `presets` property adds a sidebar panel of quick-select buttons. Pass a comma-separated list of preset IDs.

**Available presets:**

| Preset ID | Label |
|-----------|-------|
| `today` | Today |
| `yesterday` | Yesterday |
| `tomorrow` | Tomorrow |
| `thisWeek` | This Week |
| `lastWeek` | Last Week |
| `nextWeek` | Next Week |
| `last7Days` | Last 7 Days |
| `next7Days` | Next 7 Days |
| `last14Days` | Last 14 Days |
| `next14Days` | Next 14 Days |
| `last30Days` | Last 30 Days |
| `next30Days` | Next 30 Days |
| `thisMonth` | This Month |
| `lastMonth` | Last Month |
| `nextMonth` | Next Month |
| `last3Months` | Last 3 Months |
| `next3Months` | Next 3 Months |
| `last6Months` | Last 6 Months |
| `next6Months` | Next 6 Months |
| `thisQuarter` | This Quarter |
| `lastQuarter` | Last Quarter |
| `nextQuarter` | Next Quarter |
| `thisYear` | This Year |
| `lastYear` | Last Year |
| `nextYear` | Next Year |
| `yearToDate` | Year to Date |
| `allTime` | All Time |

```html
<aegov-datepicker
  mode="range"
  presets="today,last7Days,last30Days,thisMonth,lastMonth,thisQuarter,thisYear"
></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-datepicker mode="range" presets="today,last7Days,last30Days,thisMonth,lastMonth,thisQuarter,thisYear"></aegov-datepicker>
</div>

---

## Confirmation Mode

Set `with-confirmation` to require the user to click **Apply** before the selection is committed. Clicking **Cancel** or pressing Escape discards the pending selection.

This is useful when you want to prevent accidental selections, especially in range mode with presets.

```html
<!-- Single mode with confirmation -->
<aegov-datepicker with-confirmation placeholder="Confirm before selecting"></aegov-datepicker>

<!-- Range mode with confirmation and presets -->
<aegov-datepicker
  mode="range"
  with-confirmation
  presets="today,last7Days,thisMonth,lastMonth"
></aegov-datepicker>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div>
    <p class="text-sm text-aeblack-500 mb-1">Single with confirmation</p>
    <aegov-datepicker with-confirmation placeholder="Confirm before selecting"></aegov-datepicker>
  </div>
  <div>
    <p class="text-sm text-aeblack-500 mb-1">Range with confirmation and presets</p>
    <aegov-datepicker mode="range" with-confirmation presets="today,last7Days,thisMonth,lastMonth"></aegov-datepicker>
  </div>
</div>

---

## Custom Trigger

Use the `trigger` slot to replace the default input with a custom element. The calendar popup still works the same way.

```html
<aegov-datepicker>
  <aegov-button slot="trigger" variant="outline" size="sm">
    Pick a Date
  </aegov-button>
</aegov-datepicker>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-datepicker>
    <aegov-button slot="trigger" variant="outline" size="sm">
      Pick a Date
    </aegov-button>
  </aegov-datepicker>
</div>

---

## Usage with Form Field

Wrap the datepicker inside `aegov-form-field` with `aegov-label` for consistent form layout and labelling.

```html
<aegov-form-field>
  <aegov-label>Date of Birth</aegov-label>
  <aegov-datepicker
    max="today"
    format="DD/MM/YYYY"
    placeholder="DD/MM/YYYY"
    year-range-start="1920"
    year-range-end="2026"
  ></aegov-datepicker>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>Date of Birth</aegov-label>
    <aegov-datepicker max="today" format="DD/MM/YYYY" placeholder="DD/MM/YYYY" year-range-start="1920" year-range-end="2026"></aegov-datepicker>
  </aegov-form-field>
</div>

---

## Events

The datepicker emits four custom events. Listen for them with `addEventListener`.

```html
<aegov-datepicker id="dp-events"></aegov-datepicker>
<pre id="dp-event-log" class="mt-4 p-3 bg-aeblack-100 rounded text-sm max-h-40 overflow-y-auto"></pre>

<script>
  const dp = document.getElementById('dp-events');
  const log = document.getElementById('dp-event-log');

  function logEvent(name, detail) {
    const line = document.createElement('div');
    line.textContent = `${name}: ${JSON.stringify(detail)}`;
    log.prepend(line);
  }

  dp.addEventListener('aegovDatepickerChange', (e) => logEvent('change', e.detail));
  dp.addEventListener('aegovDatepickerOpen', () => logEvent('open', {}));
  dp.addEventListener('aegovDatepickerClose', () => logEvent('close', {}));
  dp.addEventListener('aegovDatepickerClear', () => logEvent('clear', {}));
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-datepicker id="dp-events-demo"></aegov-datepicker>
  <pre id="dp-event-log-demo" class="mt-4 p-3 bg-aeblack-100 rounded text-sm max-h-40 overflow-y-auto font-mono text-xs"></pre>
  <script>
    (function() {
      var dp = document.getElementById('dp-events-demo');
      var log = document.getElementById('dp-event-log-demo');
      function logEv(name, detail) {
        var line = document.createElement('div');
        line.textContent = name + ': ' + JSON.stringify(detail);
        log.prepend(line);
      }
      dp.addEventListener('aegovDatepickerChange', function(e) { logEv('change', e.detail); });
      dp.addEventListener('aegovDatepickerOpen', function() { logEv('open', {}); });
      dp.addEventListener('aegovDatepickerClose', function() { logEv('close', {}); });
      dp.addEventListener('aegovDatepickerClear', function() { logEv('clear', {}); });
    })();
  </script>
</div>

---

## Programmatic Methods

The component exposes several async methods that can be called from JavaScript.

```html
<aegov-datepicker id="dp-methods"></aegov-datepicker>

<div class="mt-3 flex gap-2">
  <aegov-button id="dp-open-btn" size="sm" variant="outline">Open</aegov-button>
  <aegov-button id="dp-close-btn" size="sm" variant="outline">Close</aegov-button>
  <aegov-button id="dp-clear-btn" size="sm" variant="outline">Clear</aegov-button>
  <aegov-button id="dp-get-btn" size="sm" variant="outline">Get Value</aegov-button>
</div>

<script>
  const dp = document.getElementById('dp-methods');

  document.getElementById('dp-open-btn')
    .addEventListener('aegovButtonClick', () => dp.open());

  document.getElementById('dp-close-btn')
    .addEventListener('aegovButtonClick', () => dp.close());

  document.getElementById('dp-clear-btn')
    .addEventListener('aegovButtonClick', () => dp.clear());

  document.getElementById('dp-get-btn')
    .addEventListener('aegovButtonClick', async () => {
      const value = await dp.getValue();
      alert('Current value: ' + (value || '(empty)'));
    });
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-datepicker id="dp-methods-demo" value="2026-03-15"></aegov-datepicker>
  <div class="mt-3 flex gap-2">
    <aegov-button id="dp-open-btn-demo" size="sm" variant="outline">Open</aegov-button>
    <aegov-button id="dp-close-btn-demo" size="sm" variant="outline">Close</aegov-button>
    <aegov-button id="dp-clear-btn-demo" size="sm" variant="outline">Clear</aegov-button>
    <aegov-button id="dp-get-btn-demo" size="sm" variant="outline">Get Value</aegov-button>
  </div>
  <script>
    (function() {
      var dp = document.getElementById('dp-methods-demo');
      document.getElementById('dp-open-btn-demo').addEventListener('aegovButtonClick', function() { dp.open(); });
      document.getElementById('dp-close-btn-demo').addEventListener('aegovButtonClick', function() { dp.close(); });
      document.getElementById('dp-clear-btn-demo').addEventListener('aegovButtonClick', function() { dp.clear(); });
      document.getElementById('dp-get-btn-demo').addEventListener('aegovButtonClick', function() { dp.getValue().then(function(v) { alert('Current value: ' + (v || '(empty)')); }); });
    })();
  </script>
</div>

### Range-specific Methods

In range mode, additional methods let you retrieve the individual start and end dates, and check which preset matches the current selection.

```javascript
const dp = document.querySelector('aegov-datepicker[mode="range"]');

// Get formatted start date string, or false
const start = await dp.getStartDate();

// Get formatted end date string, or false
const end = await dp.getEndDate();

// Get the matching preset ID, or false
const preset = await dp.getPreset();
```

---

## RTL Support

The component fully supports right-to-left layouts. When the document or a parent element has `dir="rtl"`, the input, calendar navigation, and popup align correctly.

```html
<div dir="rtl">
  <aegov-datepicker locale="ar" placeholder="اختر تاريخ" start-day="6"></aegov-datepicker>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-datepicker locale="ar" placeholder="اختر تاريخ" start-day="6"></aegov-datepicker>
</div>

### RTL Range Mode

```html
<div dir="rtl">
  <aegov-datepicker
    mode="range"
    locale="ar"
    start-day="6"
    range-placeholder-start="تاريخ البداية"
    range-placeholder-end="تاريخ النهاية"
  ></aegov-datepicker>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-datepicker mode="range" locale="ar" start-day="6" range-placeholder-start="تاريخ البداية" range-placeholder-end="تاريخ النهاية"></aegov-datepicker>
</div>

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
|----------|-----------|-------------|------|---------|
| `mode` | `mode` | Selection mode | `'single'` \| `'range'` | `'single'` |
| `value` | `value` | Pre-selected value. Single: `"YYYY-MM-DD"`. Range: `"start / end"` | `string` | `''` |
| `format` | `format` | Output format using tokens (YYYY, MM, DD, etc.) | `string` | `'YYYY-MM-DD'` |
| `placeholder` | `placeholder` | Placeholder text for single mode input | `string` | `'Select date'` |
| `rangePlaceholderStart` | `range-placeholder-start` | Placeholder for range start input | `string` | `'Start date'` |
| `rangePlaceholderEnd` | `range-placeholder-end` | Placeholder for range end input | `string` | `'End date'` |
| `min` | `min` | Minimum selectable date (ISO string or `"today"`) | `string` | `''` |
| `max` | `max` | Maximum selectable date (ISO string or `"today"`) | `string` | `''` |
| `disableFuture` | `disable-future` | Disable all future dates (shorthand for `max="today"`) | `boolean` | `false` |
| `startDay` | `start-day` | Week start day: 0=Sun, 1=Mon, ... 6=Sat | `number` | `0` |
| `locale` | `locale` | BCP 47 locale for day/month names (e.g. `'en'`, `'ar'`, `'fr'`) | `string` | `'en'` |
| `minRange` | `min-range` | Minimum number of days for range selection | `number` | `0` |
| `maxRange` | `max-range` | Maximum number of days for range selection (0 = unlimited) | `number` | `0` |
| `unavailableDates` | `unavailable-dates` | Comma-separated ISO dates that cannot be selected | `string` | `''` |
| `presets` | `presets` | Comma-separated preset IDs for range mode sidebar | `string` | `''` |
| `disabled` | `disabled` | Whether the datepicker is disabled | `boolean` | `false` |
| `clearable` | `clearable` | Show clear button when a value is set | `boolean` | `true` |
| `selectableHeader` | `selectable-header` | Show month/year select dropdowns in calendar header | `boolean` | `true` |
| `yearRangeStart` | `year-range-start` | Start year for the year dropdown (0 = auto) | `number` | `0` |
| `yearRangeEnd` | `year-range-end` | End year for the year dropdown (0 = auto) | `number` | `0` |
| `withConfirmation` | `with-confirmation` | Show Apply/Cancel buttons for confirming selection | `boolean` | `false` |
| `size` | `size` | The size of the datepicker input. Supports responsive strings (e.g. `'sm xl:lg'`). | `'xs'` \| `'sm'` \| `'base'` \| `'lg'` \| `'xl'` | `'base'` |

### Events

| Event | Description | Detail Type |
|-------|-------------|-------------|
| `aegovDatepickerChange` | Emitted when the date selection changes | `DatepickerChangeDetail` |
| `aegovDatepickerOpen` | Emitted when the calendar popup opens | `void` |
| `aegovDatepickerClose` | Emitted when the calendar popup closes | `void` |
| `aegovDatepickerClear` | Emitted when the value is cleared | `void` |
| `aegovDatepickerMonthChange` | Emitted when the displayed month/year changes | `DatepickerMonthChangeDetail` |

#### DatepickerChangeDetail

```typescript
interface DatepickerChangeDetail {
  value: string;           // Formatted date string (or "start / end" for range)
  date: Date | null;       // Selected date (single mode only)
  startDate?: Date | null; // Range start date (range mode only)
  endDate?: Date | null;   // Range end date (range mode only)
}
```

#### DatepickerMonthChangeDetail

```typescript
interface DatepickerMonthChangeDetail {
  month: number; // 0-11
  year: number;
}
```

### Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `open()` | Opens the calendar popup | `Promise<void>` |
| `close()` | Closes the calendar popup | `Promise<void>` |
| `clear()` | Clears the selected value | `Promise<void>` |
| `getValue()` | Returns the formatted value string | `Promise<string>` |
| `getStartDate()` | Returns formatted start date (range mode) or `false` | `Promise<string \| false>` |
| `getEndDate()` | Returns formatted end date (range mode) or `false` | `Promise<string \| false>` |
| `getPreset()` | Returns matching preset ID or `false` | `Promise<string \| false>` |

### Slots

| Slot | Description |
|------|-------------|
| `trigger` | Custom trigger element to replace the default input. The calendar popup is toggled when the slotted element is clicked. |

---

## Accessibility

The `aegov-datepicker` component is built with keyboard navigation and screen reader support.

### Built-in Features

- **Dialog role** -- the calendar popup has `role="dialog"` and `aria-modal="true"` so screen readers announce it as a modal.
- **Grid role** -- the day grid uses `role="grid"` for proper table-like keyboard navigation.
- **`aria-selected`** -- applied to the currently selected date, range start, and range end.
- **`aria-current="date"`** -- marks today's date in the grid.
- **`aria-disabled`** -- applied to dates that cannot be selected (out of min/max range or in the unavailable list).
- **`aria-haspopup="dialog"`** -- on the input trigger to indicate a popup will appear.
- **`aria-expanded`** -- on the input trigger, reflects whether the calendar is open.
- **`aria-controls`** -- links the trigger to the popup dialog element.
- **`aria-label`** -- applied to navigation buttons ("Previous month", "Next month") and the month/year selects.
- **Live region** -- an `aria-live="polite"` region announces month changes to screen readers.
- **Focus management** -- when the calendar opens, focus moves to the selected date (or today). When it closes, focus returns to the trigger element.

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Open calendar (when trigger focused), select focused date (when calendar open) |
| `Escape` | Close calendar, discard pending selection in confirmation mode |
| `ArrowLeft` | Move focus to previous day |
| `ArrowRight` | Move focus to next day |
| `ArrowUp` | Move focus to same day in previous week |
| `ArrowDown` | Move focus to same day in next week |
| `PageUp` | Move focus to same day in previous month |
| `Shift + PageUp` | Move focus to same day in previous year |
| `PageDown` | Move focus to same day in next month |
| `Shift + PageDown` | Move focus to same day in next year |
| `Home` | Move focus to first day of the current month |
| `End` | Move focus to last day of the current month |
| `Tab` | Navigate between calendar controls (selects, nav buttons, day grid) |

### Developer Responsibilities

1. **Provide a label.** When used inside a form, wrap the datepicker in `aegov-form-field` with `aegov-label` so screen readers associate the label with the input.

2. **Custom triggers need an `aria-label`.** If you use the `trigger` slot with a custom button, ensure the slotted element has an `aria-label` describing its purpose.

---

## Notes

- The `aegov-datepicker` component uses `scoped: true` encapsulation. The calendar popup is rendered as a **portal** element (`div.aegov-datepicker-portal`) appended to `document.body`. Portal styles are injected via JavaScript since scoped CSS cannot reach outside the component host.
- The calendar popup automatically positions itself below the trigger. If there is not enough space below, it flips above. If the trigger scrolls out of the viewport, the popup closes automatically.
- In range mode, two calendar months are displayed side by side. The left calendar shows the current view month and the right shows the following month.
- When `with-confirmation` is enabled, date clicks update a **pending** selection that is only committed when the user clicks Apply. Clicking Cancel, pressing Escape, or clicking outside discards the pending selection.
- Range preset calculations respect the `start-day` property for week-based presets (e.g. "This Week", "Last Week").
- The `value` property is mutable -- the component updates it when the user selects a date. You can also set it programmatically to update the selection from outside.
- The input field is always `readOnly`. Users select dates only through the calendar popup, not by typing.
- The clear button emits both `aegovDatepickerClear` and `aegovDatepickerChange` (with an empty value) so you only need to listen to one event to track all changes.
