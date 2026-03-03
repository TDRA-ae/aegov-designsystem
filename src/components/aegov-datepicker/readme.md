# aegov-datepicker



<!-- Auto Generated Below -->


## Properties

| Property                | Attribute                 | Description                                                                   | Type                  | Default         |
| ----------------------- | ------------------------- | ----------------------------------------------------------------------------- | --------------------- | --------------- |
| `clearable`             | `clearable`               | Show clear button when value is set                                           | `boolean`             | `true`          |
| `disableFuture`         | `disable-future`          | Disable all future dates (shorthand for max="today")                          | `boolean`             | `false`         |
| `disabled`              | `disabled`                | Whether the datepicker is disabled                                            | `boolean`             | `false`         |
| `format`                | `format`                  | Output format using tokens: YYYY, YY, MM, M, DD, D, MMM, MMMM, dd, ddd        | `string`              | `'YYYY-MM-DD'`  |
| `locale`                | `locale`                  | Locale for day/month names (BCP 47, e.g., 'en', 'ar', 'fr')                   | `string`              | `'en'`          |
| `max`                   | `max`                     | Maximum selectable date (ISO string or "today")                               | `string`              | `''`            |
| `maxRange`              | `max-range`               | Maximum number of days for range selection (0 = unlimited)                    | `number`              | `0`             |
| `min`                   | `min`                     | Minimum selectable date (ISO string or "today")                               | `string`              | `''`            |
| `minRange`              | `min-range`               | Minimum number of days for range selection                                    | `number`              | `0`             |
| `mode`                  | `mode`                    | Selection mode: single date or date range                                     | `"range" \| "single"` | `'single'`      |
| `placeholder`           | `placeholder`             | Placeholder text for single mode input                                        | `string`              | `'Select date'` |
| `presets`               | `presets`                 | Comma-separated preset IDs for range mode (e.g., "today,last7Days,thisMonth") | `string`              | `''`            |
| `rangePlaceholderEnd`   | `range-placeholder-end`   | Placeholder for range end input                                               | `string`              | `'End date'`    |
| `rangePlaceholderStart` | `range-placeholder-start` | Placeholder for range start input                                             | `string`              | `'Start date'`  |
| `selectableHeader`      | `selectable-header`       | Show month/year select dropdowns in header                                    | `boolean`             | `true`          |
| `startDay`              | `start-day`               | Week start day: 0=Sunday, 1=Monday, ...6=Saturday                             | `number`              | `0`             |
| `unavailableDates`      | `unavailable-dates`       | Comma-separated ISO dates that cannot be selected                             | `string`              | `''`            |
| `value`                 | `value`                   | Pre-selected value. Single: "YYYY-MM-DD". Range: "YYYY-MM-DD / YYYY-MM-DD"    | `string`              | `''`            |
| `withConfirmation`      | `with-confirmation`       | Show Apply/Cancel buttons for confirming selection                            | `boolean`             | `false`         |
| `yearRangeEnd`          | `year-range-end`          | End year for the year dropdown (default: current year + 100)                  | `number`              | `0`             |
| `yearRangeStart`        | `year-range-start`        | Start year for the year dropdown (default: current year - 100)                | `number`              | `0`             |


## Events

| Event                        | Description | Type                                       |
| ---------------------------- | ----------- | ------------------------------------------ |
| `aegovDatepickerChange`      |             | `CustomEvent<DatepickerChangeDetail>`      |
| `aegovDatepickerClear`       |             | `CustomEvent<void>`                        |
| `aegovDatepickerClose`       |             | `CustomEvent<void>`                        |
| `aegovDatepickerMonthChange` |             | `CustomEvent<DatepickerMonthChangeDetail>` |
| `aegovDatepickerOpen`        |             | `CustomEvent<void>`                        |


## Methods

### `clear() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `getEndDate() => Promise<string | false>`

Returns formatted end date string in range mode, or false if not in range mode or no end date

#### Returns

Type: `Promise<string | false>`



### `getPreset() => Promise<string | false>`

Returns the preset ID that matches the current range selection, or false if none matches or not in range mode

#### Returns

Type: `Promise<string | false>`



### `getStartDate() => Promise<string | false>`

Returns formatted start date string in range mode, or false if not in range mode or no start date

#### Returns

Type: `Promise<string | false>`



### `getValue() => Promise<string>`



#### Returns

Type: `Promise<string>`



### `open() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
