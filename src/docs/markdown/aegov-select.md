# aegov-select

A flexible select control with two render modes. The default `variant` renders a real native `<select>` (best for simple lists, mobile, and form submission). The `listbox` variant renders a custom dropdown with rich features — option groups, search filtering, multi-select, and a clear button. Options are declared as light DOM children using `aegov-select-option` and optionally wrapped in `aegov-select-option-group`.

## Properties

### `variant`

`'default'` (native `<select>`) or `'listbox'` (custom dropdown). Setting `is-multiple="true"` automatically forces listbox behaviour.

```html
<aegov-select variant="listbox">
  <aegov-select-option value="a">Apple</aegov-select-option>
  <aegov-select-option value="b">Banana</aegov-select-option>
</aegov-select>
```

### `size`

`'xs'`, `'sm'`, `'base'` (default), `'lg'`, or `'xl'`. Matches `aegov-input` height. Accepts a responsive expression like `"sm md:base lg:lg"`.

```html
<aegov-select size="lg">…</aegov-select>
```

### `placeholder`

Text shown when nothing is selected. In the native variant it renders as a disabled first `<option value="">`. In the listbox variant it appears in the trigger.

```html
<aegov-select placeholder="Choose a fruit">…</aegov-select>
```

### `value`

The current selection. For `is-multiple`, this is a comma-separated string of values (the event detail uses a `string[]` form).

```html
<aegov-select value="b">…</aegov-select>
<aegov-select is-multiple="true" value="a,b">…</aegov-select>
```

### `name`

Form field name. In the listbox variant, a hidden `<input>` is rendered alongside the trigger so the value participates in form submission.

### `is-disabled`

Disables the control. The native variant disables the `<select>`; the listbox variant disables the trigger button and prevents opening.

### `is-required`

Applies the `required` attribute to the native `<select>`.

### `is-multiple`

Enables multi-select. Forces the listbox variant. Each option shows a checkbox indicator; clicking toggles selection without closing the dropdown.

```html
<aegov-select is-multiple="true" placeholder="Pick a few">
  <aegov-select-option value="a">Apple</aegov-select-option>
  <aegov-select-option value="b">Banana</aegov-select-option>
</aegov-select>
```

### `is-searchable`

Adds a search input above the option list (listbox variant only). Filters options by case-insensitive substring match against their label.

```html
<aegov-select variant="listbox" is-searchable="true">…</aegov-select>
```

### `is-clearable`

Shows a small clear (×) button inside the trigger when a value is set (listbox variant only). Clicking it resets the value and emits `aegovSelectChange` with an empty value.

### `empty-message`

Text shown inside the listbox when search filtering returns no results. Defaults to `'No results found'`.

### `visible-items`

Maximum number of visible items in the dropdown before scrolling. Defaults to `6`.

### `extra-class`

Additional CSS classes applied to the inner `<select>` (native) or trigger button (listbox).

### `field-id`

Optional unique ID. Auto-generated as `aegov-select-{n}` if omitted. Reflected to the host as `field-id` and applied to the inner `<select>` or trigger button.

### Sub-component: `aegov-select-option`

Declares a single option in the light DOM. The host element has `role="option"`.

| Prop          | Attribute      | Type      | Default | Description                         |
| ------------- | -------------- | --------- | ------- | ----------------------------------- |
| `value`       | `value`        | `string`  | `''`    | Option value passed to the parent.  |
| `isDisabled`  | `is-disabled`  | `boolean` | `false` | Disables this option.               |

Slot content is the visible label; it is captured at load time.

```html
<aegov-select-option value="a">Apple</aegov-select-option>
<aegov-select-option value="b" is-disabled="true">Banana</aegov-select-option>
```

### Sub-component: `aegov-select-option-group`

Wraps a group of options under a label. Renders an `<optgroup>` in the native variant and a labelled section (`role="group"`) in the listbox variant.

| Prop    | Attribute | Type     | Default | Description       |
| ------- | --------- | -------- | ------- | ----------------- |
| `label` | `label`   | `string` | `''`    | Group heading.    |

```html
<aegov-select-option-group label="Citrus">
  <aegov-select-option value="o">Orange</aegov-select-option>
  <aegov-select-option value="l">Lemon</aegov-select-option>
</aegov-select-option-group>
```

## Sizes

```html
<aegov-select size="xs">…</aegov-select>
<aegov-select size="sm">…</aegov-select>
<aegov-select size="base">…</aegov-select>
<aegov-select size="lg">…</aegov-select>
<aegov-select size="xl">…</aegov-select>
<!-- Responsive -->
<aegov-select size="sm md:base lg:lg">…</aegov-select>
```

## Examples

### Native variant (default)

```html
<aegov-select name="fruit" placeholder="Choose a fruit">
  <aegov-select-option value="a">Apple</aegov-select-option>
  <aegov-select-option value="b">Banana</aegov-select-option>
  <aegov-select-option value="c">Cherry</aegov-select-option>
</aegov-select>
```

### Listbox variant

```html
<aegov-select variant="listbox" placeholder="Choose a fruit">
  <aegov-select-option value="a">Apple</aegov-select-option>
  <aegov-select-option value="b">Banana</aegov-select-option>
  <aegov-select-option value="c">Cherry</aegov-select-option>
</aegov-select>
```

### With search

```html
<aegov-select variant="listbox" is-searchable="true" placeholder="Find a country">
  <aegov-select-option value="ae">United Arab Emirates</aegov-select-option>
  <aegov-select-option value="sa">Saudi Arabia</aegov-select-option>
  <aegov-select-option value="qa">Qatar</aegov-select-option>
  <aegov-select-option value="om">Oman</aegov-select-option>
</aegov-select>
```

### Multi-select

```html
<aegov-select is-multiple="true" placeholder="Choose toppings">
  <aegov-select-option value="cheese">Cheese</aegov-select-option>
  <aegov-select-option value="olives">Olives</aegov-select-option>
  <aegov-select-option value="mushrooms">Mushrooms</aegov-select-option>
</aegov-select>
```

### With option groups

```html
<aegov-select variant="listbox" placeholder="Pick a fruit">
  <aegov-select-option-group label="Citrus">
    <aegov-select-option value="o">Orange</aegov-select-option>
    <aegov-select-option value="l">Lemon</aegov-select-option>
  </aegov-select-option-group>
  <aegov-select-option-group label="Berries">
    <aegov-select-option value="s">Strawberry</aegov-select-option>
    <aegov-select-option value="r">Raspberry</aegov-select-option>
  </aegov-select-option-group>
</aegov-select>
```

### Clearable

```html
<aegov-select variant="listbox" is-clearable="true" value="a" placeholder="Choose a fruit">
  <aegov-select-option value="a">Apple</aegov-select-option>
  <aegov-select-option value="b">Banana</aegov-select-option>
</aegov-select>
```

### With placeholder only

```html
<aegov-select placeholder="Choose…">
  <aegov-select-option value="a">Apple</aegov-select-option>
</aegov-select>
```

## RTL Behavior

The trigger, search input, and option rows mirror under `[dir="rtl"]`. Inline icons (clear, dropdown chevron, selection check) are flipped or repositioned to the trailing edge automatically. Option labels inherit the host document's text direction.

## API Reference

### Properties — `aegov-select`

| Property        | Attribute        | Type                       | Default               |
| --------------- | ---------------- | -------------------------- | --------------------- |
| `variant`       | `variant`        | `'default' \| 'listbox'`   | `'default'`           |
| `size`          | `size`           | `string`                   | `'base'`              |
| `value`         | `value`          | `string`                   | `''`                  |
| `name`          | `name`           | `string`                   | —                     |
| `placeholder`   | `placeholder`    | `string`                   | —                     |
| `isMultiple`    | `is-multiple`    | `boolean`                  | `false`               |
| `isDisabled`    | `is-disabled`    | `boolean`                  | `false`               |
| `isRequired`    | `is-required`    | `boolean`                  | `false`               |
| `isSearchable`  | `is-searchable`  | `boolean`                  | `false`               |
| `isClearable`   | `is-clearable`   | `boolean`                  | `false`               |
| `emptyMessage`  | `empty-message`  | `string`                   | `'No results found'`  |
| `visibleItems`  | `visible-items`  | `number`                   | `6`                   |
| `extraClass`    | `extra-class`    | `string`                   | —                     |
| `fieldId`       | `field-id`       | `string`                   | auto                  |

### Properties — `aegov-select-option`

| Property      | Attribute      | Type      | Default |
| ------------- | -------------- | --------- | ------- |
| `value`       | `value`        | `string`  | `''`    |
| `isDisabled`  | `is-disabled`  | `boolean` | `false` |

### Properties — `aegov-select-option-group`

| Property | Attribute | Type     | Default |
| -------- | --------- | -------- | ------- |
| `label`  | `label`   | `string` | `''`    |

### Pass-through Attributes

`autofocus` and `form` are forwarded onto the inner native `<select>`. Any `aria-*` and `data-*` attributes set on the host are also forwarded onto the inner `<select>`. Pass-through applies only to the native variant — the listbox trigger does not receive these attributes.

### Events

| Event                 | Description                                         | Detail                                          |
| --------------------- | --------------------------------------------------- | ----------------------------------------------- |
| `aegovSelectChange`   | Fires when the selected value changes.              | `{ value: string \| string[]; label: string \| string[] }` |
| `aegovSelectOpen`     | Fires when the listbox dropdown opens.              | `void`                                          |
| `aegovSelectClose`    | Fires when the listbox dropdown closes.             | `void`                                          |

For single selection, `value` and `label` are strings. For `is-multiple`, both are arrays.

### Event listening example

```js
const select = document.querySelector('aegov-select');
select.addEventListener('aegovSelectChange', (e) => {
  console.log('selected', e.detail.value, e.detail.label);
});
```

### Slots

| Slot      | Description                                                       |
| --------- | ----------------------------------------------------------------- |
| (default) | One or more `aegov-select-option` and/or `aegov-select-option-group` elements. |

## Accessibility

**Built in**

- Listbox variant uses `role="combobox"` on the trigger with `aria-haspopup="listbox"` and `aria-expanded` reflecting open state.
- The popup has `role="listbox"`, `aria-multiselectable="true"` for multi-select, and is referenced via `aria-controls` from the trigger.
- The currently focused option is exposed via `aria-activedescendant` on the trigger (and on the search input when it has focus).
- Each option uses `role="option"` with `aria-selected` and, where applicable, `aria-disabled`.
- Option groups use `role="group"` and are labelled by the group heading via `aria-labelledby`.
- Keyboard support on the listbox: `ArrowDown` / `ArrowUp` move focus, `Home` / `End` jump to ends, `Enter` selects the focused option, `Space` selects (or types in the search input when searchable), `Escape` closes the dropdown and returns focus to the trigger.
- Clicking outside the component closes the dropdown.
- Native variant inherits all native `<select>` accessibility behaviours and submits with the surrounding form.

**Developer responsibilities**

- Provide an accessible name. Pair the select with `aegov-form-field`/`aegov-label`, or set `aria-label`/`aria-labelledby` on the host.
- When the listbox is closed and a placeholder is shown, ensure surrounding context conveys that a selection is required (e.g. via the form-field label and `is-required`).
- For `is-multiple`, communicate the count or selected items in surrounding UI — the trigger only shows `"N selected"`.

**Notes**

- The search input is decorated with `role="searchbox"` and `aria-label="Search options"`. If you need a localised label, override it via the form-field label or by wrapping with appropriate context — the built-in label is in English.
- When `is-multiple` is set, `variant` is effectively `'listbox'` regardless of the explicit value.
- The listbox flips above the trigger when there is insufficient space below; this is purely visual and does not affect roles or focus order.
