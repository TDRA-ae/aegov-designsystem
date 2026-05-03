# aegov-datepicker



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute              | Description                                                                                      | Type                  | Default         |
| -------------------- | ---------------------- | ------------------------------------------------------------------------------------------------ | --------------------- | --------------- |
| `blackout`           | `blackout`             | Comma-separated ISO dates that cannot be selected                                                | `string`              | `''`            |
| `errorMessage`       | `error-message`        | Inline error message. Use `error` slot for rich markup.                                          | `string`              | `''`            |
| `fieldId`            | `field-id`             | Optional unique field ID. Used by aegov-form-field for label linking + error/hint id derivation. | `string`              | `undefined`     |
| `format`             | `format`               | Output format using tokens: YYYY, YY, MM, M, DD, D, MMM, MMMM, dd, ddd                           | `string`              | `'YYYY-MM-DD'`  |
| `hint`               | `hint`                 | Helper hint shown below the control. Hidden when an error is shown.                              | `string`              | `''`            |
| `isClearable`        | `is-clearable`         | Show clear button when value is set                                                              | `boolean`             | `true`          |
| `isDisableFuture`    | `is-disable-future`    | Disable all future dates (shorthand for max="today")                                             | `boolean`             | `false`         |
| `isDisabled`         | `is-disabled`          | Whether the datepicker is disabled                                                               | `boolean`             | `false`         |
| `isHeaderSelectable` | `is-header-selectable` | Show month/year select dropdowns in header                                                       | `boolean`             | `true`          |
| `isInvalid`          | `is-invalid`           | Visual + a11y invalid state. See §2.3.                                                           | `boolean`             | `false`         |
| `isRequired`         | `is-required`          | Marks the datepicker as required for form validation. Sets `required` on the inner input.        | `boolean`             | `false`         |
| `isWithConfirmation` | `is-with-confirmation` | Show Apply/Cancel buttons for confirming selection                                               | `boolean`             | `false`         |
| `labelRangeEnd`      | `label-range-end`      | Placeholder for range end input                                                                  | `string`              | `'End date'`    |
| `labelRangeStart`    | `label-range-start`    | Placeholder for range start input                                                                | `string`              | `'Start date'`  |
| `locale`             | `locale`               | Locale for day/month names (BCP 47, e.g., 'en', 'ar', 'fr')                                      | `string`              | `'en'`          |
| `max`                | `max`                  | Maximum selectable date (ISO string or "today")                                                  | `string`              | `''`            |
| `maxRange`           | `max-range`            | Maximum number of days for range selection (0 = unlimited)                                       | `number`              | `0`             |
| `min`                | `min`                  | Minimum selectable date (ISO string or "today")                                                  | `string`              | `''`            |
| `minRange`           | `min-range`            | Minimum number of days for range selection                                                       | `number`              | `0`             |
| `name`               | `name`                 | Form field name for FormAssociated submission (§2.5).                                            | `string`              | `undefined`     |
| `placeholder`        | `placeholder`          | Placeholder text for single mode input                                                           | `string`              | `'Select date'` |
| `presets`            | `presets`              | Comma-separated preset IDs for range mode (e.g., "today,last7Days,thisMonth")                    | `string`              | `''`            |
| `size`               | `size`                 | The size of the datepicker input.                                                                | `string`              | `'base'`        |
| `startDay`           | `start-day`            | Week start day: 0=Sunday, 1=Monday, ...6=Saturday                                                | `number`              | `0`             |
| `value`              | `value`                | Pre-selected value. Single: "YYYY-MM-DD". Range: "YYYY-MM-DD / YYYY-MM-DD"                       | `string`              | `''`            |
| `variant`            | `variant`              | Selection variant: single date or date range                                                     | `"range" \| "single"` | `'single'`      |
| `yearRangeEnd`       | `year-range-end`       | End year for the year dropdown (default: current year + 100)                                     | `number`              | `0`             |
| `yearRangeStart`     | `year-range-start`     | Start year for the year dropdown (default: current year - 100)                                   | `number`              | `0`             |


## Events

| Event                        | Description                         | Type                                                       |
| ---------------------------- | ----------------------------------- | ---------------------------------------------------------- |
| `aegovDatepickerChange`      |                                     | `CustomEvent<DatepickerChangeDetail>`                      |
| `aegovDatepickerClear`       |                                     | `CustomEvent<void>`                                        |
| `aegovDatepickerClose`       |                                     | `CustomEvent<void>`                                        |
| `aegovDatepickerMonthChange` |                                     | `CustomEvent<DatepickerMonthChangeDetail>`                 |
| `aegovDatepickerOpen`        |                                     | `CustomEvent<void>`                                        |
| `aegovValidate`              | Unified validation event. See §2.3. | `CustomEvent<AegovValidationDetail<AegovDatepickerValue>>` |


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



### `setCustomValidity(message: string) => Promise<void>`

Mirror of HTMLInputElement.setCustomValidity().

#### Parameters

| Name      | Type     | Description |
| --------- | -------- | ----------- |
| `message` | `string` |             |

#### Returns

Type: `Promise<void>`



### `validate(trigger?: AegovValidationTrigger) => Promise<AegovValidationResult>`

Imperatively re-run validation.

#### Parameters

| Name      | Type                                                    | Description |
| --------- | ------------------------------------------------------- | ----------- |
| `trigger` | `"input" \| "blur" \| "submit" \| "change" \| "manual"` |             |

#### Returns

Type: `Promise<AegovValidationResult>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
