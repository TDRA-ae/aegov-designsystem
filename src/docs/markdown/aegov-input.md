# aegov-input

A styled wrapper around the native `<input>` element for collecting single-line text values. It provides design-system-aligned sizing, slot-based icons, optional password reveal and copy-to-clipboard helpers, and pass-through support for native input attributes.

## Properties

### type

The native input type. Accepts `text`, `email`, `password`, `tel`, `url`, `number`, `search`, `date`, `time`, `datetime-local`, `month`, or `week`.

```html
<aegov-input type="email" placeholder="you@example.com"></aegov-input>
```

### size

The visual size of the field. Accepts `xs`, `sm`, `base`, `lg`, `xl`. Also supports a Tailwind-style responsive string with breakpoint prefixes.

```html
<aegov-input size="lg"></aegov-input>
<aegov-input size="sm md:base lg:lg"></aegov-input>
```

### value

The current value of the input. Mutable — the component updates `value` internally on `input`/`change`.

```html
<aegov-input value="Hello"></aegov-input>
```

### placeholder

Placeholder text shown when the field is empty.

```html
<aegov-input placeholder="Enter your name"></aegov-input>
```

### name

The native `name` attribute used when the input participates in a form submission.

```html
<aegov-input name="email"></aegov-input>
```

### field-id

The `id` of the rendered native `<input>`. Auto-generated as `aegov-input-{n}` if not provided. Used by `aegov-form-field` and `aegov-label` for label association.

```html
<aegov-input field-id="email-input"></aegov-input>
```

### is-disabled

Disables the input.

```html
<aegov-input is-disabled="true" value="Locked"></aegov-input>
```

### is-readonly

Marks the input as readonly. Required to enable `is-copyable`.

```html
<aegov-input is-readonly="true" value="REF-12345"></aegov-input>
```

### is-required

Marks the field as required (sets the native `required` attribute).

```html
<aegov-input is-required="true"></aegov-input>
```

### is-revealable

Adds a password reveal/hide toggle button. Only takes effect when `type="password"`.

```html
<aegov-input type="password" is-revealable="true"></aegov-input>
```

### is-copyable

Adds a copy-to-clipboard button. Only takes effect when `is-readonly="true"`.

```html
<aegov-input is-readonly="true" is-copyable="true" value="API-KEY-123"></aegov-input>
```

### extra-class

Additional CSS classes applied to the native `<input>`.

```html
<aegov-input extra-class="font-mono"></aegov-input>
```

### Sub-component: aegov-input-group

`aegov-input-group` wraps an `aegov-input` (and optionally an `aegov-button`) to add prefix/suffix addons. It propagates its `size` to children.

```html
<aegov-input-group addon-prefix="$" size="base">
  <aegov-input type="number" placeholder="0.00"></aegov-input>
</aegov-input-group>

<aegov-input-group addon-suffix=".gov.ae">
  <aegov-input placeholder="username"></aegov-input>
</aegov-input-group>
```

| Property | Description | Default |
| --- | --- | --- |
| `size` | Group size, propagated to child `aegov-input` and `aegov-button`. | `'base'` |
| `addon-prefix` | Static text shown before the input. | `undefined` |
| `addon-suffix` | Static text shown after the input. | `undefined` |
| `extra-class` | Additional classes on the wrapper. | `undefined` |

## Sizes

`size` accepts a single token or a responsive string using Tailwind-style breakpoint prefixes (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`).

```html
<aegov-input size="xs"></aegov-input>
<aegov-input size="sm"></aegov-input>
<aegov-input size="base"></aegov-input>
<aegov-input size="lg"></aegov-input>
<aegov-input size="xl"></aegov-input>

<!-- Responsive: small on mobile, base from md, large from lg -->
<aegov-input size="sm md:base lg:lg"></aegov-input>
```

## Examples

### Basic input

```html
<aegov-input placeholder="Your name"></aegov-input>
```

### With start icon

```html
<aegov-input placeholder="Search">
  <svg slot="icon-start" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="M21 21l-4.35-4.35"></path>
  </svg>
</aegov-input>
```

### Password with reveal toggle

```html
<aegov-input type="password" is-revealable="true" placeholder="Password"></aegov-input>
```

### Read-only and copyable

```html
<aegov-input is-readonly="true" is-copyable="true" value="user-token-abc123"></aegov-input>
```

### Email with required + autocomplete

```html
<aegov-input
  type="email"
  is-required="true"
  autocomplete="email"
  placeholder="you@example.com"
></aegov-input>
```

### Inside an input-group with addons

```html
<aegov-input-group addon-prefix="https://" addon-suffix=".gov.ae">
  <aegov-input placeholder="myservice"></aegov-input>
</aegov-input-group>
```

### Inside an aegov-form-field with a label

```html
<aegov-form-field>
  <aegov-label>Email</aegov-label>
  <aegov-input type="email" name="email" is-required="true"></aegov-input>
</aegov-form-field>
```

## RTL Behavior

`aegov-input` uses Tailwind logical properties internally, so padding for icons and action buttons swaps automatically when the surrounding container has `dir="rtl"`. Slot icons (`icon-start` / `icon-end`) sit on the start and end edges respectively, naturally flipping in RTL. The reveal and copy buttons are positioned using logical inset, so they remain on the trailing edge of the input regardless of direction.

## API Reference

### Properties — aegov-input

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID for the native `<input>`. Auto-generated if not provided. Reflects to the host. | `string` | auto |
| `type` | `type` | Native input type. | `InputType` | `'text'` |
| `size` | `size` | Field size token or responsive string. | `string` | `'base'` |
| `value` | `value` | Current value (mutable). | `string` | `''` |
| `placeholder` | `placeholder` | Placeholder text. | `string` | `undefined` |
| `name` | `name` | Native `name` attribute. | `string` | `undefined` |
| `isDisabled` | `is-disabled` | Disable the input. | `boolean` | `false` |
| `isReadonly` | `is-readonly` | Mark the input readonly. | `boolean` | `false` |
| `isRequired` | `is-required` | Mark the field as required. | `boolean` | `false` |
| `isRevealable` | `is-revealable` | Show password reveal toggle (only with `type="password"`). | `boolean` | `false` |
| `isCopyable` | `is-copyable` | Show copy-to-clipboard button (only with `is-readonly`). | `boolean` | `false` |
| `extraClass` | `extra-class` | Additional CSS classes on the native `<input>`. | `string` | `undefined` |

### Properties — aegov-input-group

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `size` | `size` | Group size, propagated to child `aegov-input` and `aegov-button`. | `string` | `'base'` |
| `addonPrefix` | `addon-prefix` | Static prefix text. | `string` | `undefined` |
| `addonSuffix` | `addon-suffix` | Static suffix text. | `string` | `undefined` |
| `extraClass` | `extra-class` | Additional CSS classes on the wrapper. | `string` | `undefined` |

### Pass-through Attributes

`aria-*` and `data-*` attributes set on the host are always forwarded to the native `<input>`. The following standard input attributes are also forwarded when set on the host:

| Attribute | Notes |
| --- | --- |
| `pattern` | Regex validation pattern |
| `min`, `max`, `step` | For numeric/date inputs |
| `minlength`, `maxlength` | Character count constraints |
| `autocomplete` | Browser autofill hints |
| `autofocus` | Focus on mount |
| `inputmode` | On-screen keyboard hint |
| `list` | Reference a `<datalist>` |
| `multiple` | For email/file types |
| `accept`, `capture` | For file inputs |
| `spellcheck` | Spellchecking on/off |
| `enterkeyhint` | Mobile keyboard "Enter" label |
| `title` | Native tooltip / validation message |
| `tabindex` | Custom tab order |
| `form` | Associate with a form by id |

### Events

| Event | Description | Detail |
| --- | --- | --- |
| `aegovInputChange` | Fires when the value commits (native `change`, typically on blur or Enter). | `{ value: string; event: Event }` |
| `aegovInputInput` | Fires on every keystroke. | `{ value: string; event: Event }` |
| `aegovInputFocus` | Fires when the input gains focus. | `FocusEvent` |
| `aegovInputBlur` | Fires when the input loses focus. | `FocusEvent` |

### Event listening example

```html
<aegov-input id="email"></aegov-input>
<script>
  const el = document.getElementById('email');
  el.addEventListener('aegovInputInput', (e) => {
    console.log('Typed:', e.detail.value);
  });
  el.addEventListener('aegovInputChange', (e) => {
    console.log('Committed:', e.detail.value);
  });
</script>
```

### Slots

| Slot | Description |
| --- | --- |
| `icon-start` | Icon shown before the input value (logical start). |
| `icon-end` | Icon shown after the input value (hidden when a reveal/copy button is active). |

## Accessibility

### Built-in

- The component renders a real `<input>`, preserving native semantics, keyboard handling, and assistive-tech behavior.
- `is-required` sets the native `required` attribute, which exposes `aria-required`-like semantics automatically.
- `field-id` is auto-generated and reflected on the host so external `<label for>` (or `aegov-label`) can associate reliably.
- The reveal toggle and copy button each have `aria-label` text (`"Show password"` / `"Hide password"`, `"Copy to clipboard"` / `"Copied"`) and `tabindex="-1"` so they don't disrupt the natural tab flow.
- Decorative SVG icons in helper buttons use `aria-hidden="true"`.

### Developer responsibilities

- Provide a visible label via `aegov-label` (preferred, inside `aegov-form-field`), a sibling `<label for="...">`, or set `aria-label` / `aria-labelledby` on the host.
- When validation messages or hints are shown nearby, link them with `aria-describedby` referencing the helper element's id.
- For password fields with a reveal toggle, ensure the surrounding context warns users about visibility (e.g., when sharing screens).

### Notes

- `is-copyable` only takes effect when `is-readonly="true"` (you cannot copy from an editable field via the built-in button).
- `is-revealable` only takes effect when `type="password"`.
- The reveal/copy buttons are mouse-accessible only by design (`tabindex="-1"`) so they don't add extra tab stops next to the input.
