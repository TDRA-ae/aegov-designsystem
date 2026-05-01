# aegov-checkbox

A native checkbox wrapped in a labeled, design-system-aligned control. Use it for binary or multi-select form inputs. Pair it with `aegov-checkbox-group` to group related options, propagate sizing, and add an optional "select all" controller.

## Properties

### field-id

Unique ID applied to the underlying `<input>`. Auto-generated as `aegov-checkbox-{n}` when omitted, so every instance has a stable, label-linkable id without the consumer having to manage them.

```html
<aegov-checkbox field-id="terms" label="Accept the terms"></aegov-checkbox>
```

### name / value

Standard form attributes forwarded to the native input. Use `value` to identify which option a given checkbox represents when included in a form submission.

```html
<aegov-checkbox name="prefs" value="email" label="Email updates"></aegov-checkbox>
```

### is-checked

Controls the checked state. Reflects to the host attribute and the native `checked` property.

```html
<aegov-checkbox is-checked label="Pre-selected option"></aegov-checkbox>
```

### is-disabled

Disables the input and prevents interaction.

```html
<aegov-checkbox is-disabled label="Locked option"></aegov-checkbox>
```

### is-required

Marks the input as required and sets `aria-required="true"`.

```html
<aegov-checkbox is-required label="I agree"></aegov-checkbox>
```

### label

Renders an associated `<label>` element wrapping the input.

```html
<aegov-checkbox label="Subscribe to newsletter"></aegov-checkbox>
```

### description

Helper text displayed below the label and exposed via `aria-describedby`. Only renders when `label` is also set.

```html
<aegov-checkbox
  label="Marketing emails"
  description="Receive product updates roughly once a month."
></aegov-checkbox>
```

### is-check-all

Marks this checkbox as the "select all" controller for an enclosing `aegov-checkbox-group`. The group reads this flag via `[is-check-all]` and wires up bulk toggle plus indeterminate state.

```html
<aegov-checkbox-group label="Topics">
  <aegov-checkbox is-check-all label="Select all"></aegov-checkbox>
  <aegov-checkbox value="news" label="News"></aegov-checkbox>
  <aegov-checkbox value="events" label="Events"></aegov-checkbox>
</aegov-checkbox-group>
```

### is-indeterminate

Sets the native `indeterminate` flag on the input. Typically managed by `aegov-checkbox-group` for the check-all controller, but can also be set manually for tri-state UIs.

```html
<aegov-checkbox is-indeterminate label="Some selected"></aegov-checkbox>
```

### size

Token: `xs`, `sm`, `base`, `lg`, `xl`. Also accepts a Tailwind-style responsive string (see Sizes section).

```html
<aegov-checkbox size="lg" label="Large"></aegov-checkbox>
```

### extra-class

Additional classes merged onto the wrapper div.

```html
<aegov-checkbox extra-class="my-2" label="Custom"></aegov-checkbox>
```

## Sizes

`size` accepts a single token or a responsive string using Tailwind-style breakpoint prefixes (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`).

```html
<aegov-checkbox size="sm" label="Small"></aegov-checkbox>
<aegov-checkbox size="base" label="Base"></aegov-checkbox>
<aegov-checkbox size="lg" label="Large"></aegov-checkbox>

<!-- Responsive: small on mobile, base from md, large from lg -->
<aegov-checkbox size="sm md:base lg:lg" label="Responsive"></aegov-checkbox>
```

## Examples

### Default

```html
<aegov-checkbox label="Send me updates"></aegov-checkbox>
```

### With description

```html
<aegov-checkbox
  label="Marketing emails"
  description="No more than once a month. You can unsubscribe at any time."
></aegov-checkbox>
```

### Required in a form

```html
<form>
  <aegov-checkbox
    name="terms"
    value="accepted"
    is-required
    label="I accept the terms and conditions"
  ></aegov-checkbox>
</form>
```

### Group with select-all

```html
<aegov-checkbox-group label="Notification topics">
  <aegov-checkbox is-check-all label="Select all"></aegov-checkbox>
  <aegov-checkbox name="topics" value="news" label="News"></aegov-checkbox>
  <aegov-checkbox name="topics" value="events" label="Events"></aegov-checkbox>
  <aegov-checkbox name="topics" value="offers" label="Offers"></aegov-checkbox>
</aegov-checkbox-group>
```

### Group disabled

```html
<aegov-checkbox-group label="Locked options" is-disabled>
  <aegov-checkbox value="a" label="Option A" is-checked></aegov-checkbox>
  <aegov-checkbox value="b" label="Option B"></aegov-checkbox>
</aegov-checkbox-group>
```

### Horizontal group

```html
<aegov-checkbox-group label="Languages" orientation="horizontal">
  <aegov-checkbox value="en" label="English"></aegov-checkbox>
  <aegov-checkbox value="ar" label="Arabic"></aegov-checkbox>
</aegov-checkbox-group>
```

## RTL Behavior

The control is inline-flow and uses logical layout. When the document or container has `dir="rtl"`, the input switches to the right of the label automatically — no extra props are required. Description text follows the label in reading order.

## API Reference

### Properties — `aegov-checkbox`

| Property         | Attribute          | Description                                                                          | Type      | Default  |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------ | --------- | -------- |
| `fieldId`        | `field-id`         | Unique ID for the native input. Auto-generated if not provided.                      | `string`  | auto     |
| `name`           | `name`             | Native input `name`.                                                                 | `string`  | `undefined` |
| `value`          | `value`            | Native input `value`.                                                                | `string`  | `undefined` |
| `isChecked`      | `is-checked`       | Whether the checkbox is checked. Reflected.                                          | `boolean` | `false`  |
| `size`           | `size`             | Size token or responsive string.                                                     | `string`  | `'base'` |
| `isDisabled`     | `is-disabled`      | Disables the input. Reflected.                                                       | `boolean` | `false`  |
| `isRequired`     | `is-required`      | Marks the input as required and sets `aria-required="true"`.                         | `boolean` | `false`  |
| `label`          | `label`            | Visible label text.                                                                  | `string`  | `undefined` |
| `description`    | `description`      | Helper text linked via `aria-describedby`. Only rendered when `label` is set.        | `string`  | `undefined` |
| `isCheckAll`     | `is-check-all`     | Marks this checkbox as the "select all" controller for an enclosing group.           | `boolean` | `false`  |
| `isIndeterminate`| `is-indeterminate` | Sets the native `indeterminate` flag on the input.                                   | `boolean` | `false`  |
| `extraClass`     | `extra-class`      | Additional CSS classes on the wrapper.                                               | `string`  | `undefined` |

### Sub-component: aegov-checkbox-group

A `fieldset`-based group that propagates size, owns selection state, and (optionally) wires a check-all controller.

#### Properties — `aegov-checkbox-group`

| Property      | Attribute     | Description                                                                                       | Type     | Default       |
| ------------- | ------------- | ------------------------------------------------------------------------------------------------- | -------- | ------------- |
| `variant`     | `variant`     | Visual variant: `default`, `list`, `cards`, `pills`.                                              | `string` | `'default'`   |
| `orientation` | `orientation` | Stack direction: `vertical` or `horizontal`.                                                      | `string` | `'vertical'`  |
| `label`       | `label`       | Optional `<legend>` text for accessibility.                                                       | `string` | `undefined`   |
| `size`        | `size`        | Size token or responsive string. Propagated to children.                                          | `string` | `'base'`      |
| `isDisabled`  | `is-disabled` | Disables every checkbox via the native `fieldset[disabled]`.                                      | `boolean`| `false`       |
| `extraClass`  | `extra-class` | Additional classes on the rendered `fieldset`.                                                    | `string` | `undefined`   |

The group automatically detects a child marked with `is-check-all` and synchronizes its checked / indeterminate state from the regular (non-check-all) children. Disabled children are ignored when computing or applying the bulk toggle.

### Pass-through Attributes

`aria-*` and `data-*` attributes set on `aegov-checkbox` are forwarded to the underlying `<input>`. Additional forwarded attributes: `form`, `tabindex`, `autofocus`, `title`.

### Events

| Component               | Event                       | Detail                                       | Description                                       |
| ----------------------- | --------------------------- | -------------------------------------------- | ------------------------------------------------- |
| `aegov-checkbox`        | `aegovCheckboxChange`       | `{ checked: boolean; value?: string }`       | Fires whenever the checkbox state changes.         |
| `aegov-checkbox-group`  | `aegovCheckboxGroupChange`  | `{ values: string[] }`                       | Fires whenever any child changes; `values` is the list of currently checked (non-check-all) child values. |

#### Event listening example

```html
<aegov-checkbox-group id="prefs" label="Preferences">
  <aegov-checkbox is-check-all label="Select all"></aegov-checkbox>
  <aegov-checkbox value="news" label="News"></aegov-checkbox>
  <aegov-checkbox value="offers" label="Offers"></aegov-checkbox>
</aegov-checkbox-group>

<script>
  document.getElementById('prefs').addEventListener('aegovCheckboxGroupChange', (e) => {
    console.log('selected values:', e.detail.values);
  });
</script>
```

### Slots

| Component              | Slot      | Description                                              |
| ---------------------- | --------- | -------------------------------------------------------- |
| `aegov-checkbox`       | (none)    | Use the `label` and `description` props for content.     |
| `aegov-checkbox-group` | (default) | One or more `aegov-checkbox` children.                   |

## Accessibility

### Built-in

- Uses a native `<input type="checkbox">` so screen readers and keyboards behave with no extra ARIA wiring.
- Wrapping `<label>` makes the entire label/description region clickable and announced.
- `description` is linked to the input via `aria-describedby`.
- `is-required` sets `aria-required="true"` in addition to the native `required` attribute.
- The check-all child uses the native `indeterminate` property so assistive tech announces a "mixed" state when only some children are selected.
- Groups render a `<fieldset>` with an optional `<legend>` (when `label` is set) so the group is announced as a single labeled set.

### Developer responsibilities

- Always provide a `label`. Without one, no visible label is rendered and the input is reachable but unlabeled.
- For groups, provide a `label` so the `<legend>` describes the set.
- Match `name` across grouped checkboxes if you depend on native form submission semantics.

### Notes

- Keyboard support is fully native: focus the input and press Space to toggle. Tab moves between checkboxes — there is no roving tabindex (this matches HTML defaults; checkboxes are not single-select).
