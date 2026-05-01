# aegov-otp

A one-time-passcode input rendered as a row of focused cells. Auto-advances focus as the user types, supports paste-to-fill, optional alphanumeric mode, and pattern validation. Emits a single combined value through change/complete/invalid events.

## Properties

### variant

Visual layout. `continuous` renders a single bordered group with thin dividers between cells; `individual` renders fully separated bordered cells.

```html
<aegov-otp variant="continuous"></aegov-otp>
<aegov-otp variant="individual"></aegov-otp>
```

### length

Number of input cells. Defaults to `5`.

```html
<aegov-otp length="4"></aegov-otp>
<aegov-otp length="6"></aegov-otp>
```

### size

Controls cell typography size. Accepts `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, or a responsive string.

```html
<aegov-otp size="lg"></aegov-otp>
<aegov-otp size="sm md:base lg:lg"></aegov-otp>
```

### is-alphanumeric

When set, allows letters in addition to digits. Numeric only by default.

```html
<aegov-otp is-alphanumeric length="6"></aegov-otp>
```

### pattern

Regex string validated when all cells are filled. Pass without `/` delimiters. If validation fails, `aegovOtpInvalid` fires instead of `aegovOtpComplete`.

```html
<aegov-otp length="6" pattern="^[0-9]{6}$"></aegov-otp>
```

### is-disabled

Disables all cells.

```html
<aegov-otp is-disabled value="1234"></aegov-otp>
```

### value

Pre-fills cells. Setting it externally distributes characters across cells.

```html
<aegov-otp value="9087"></aegov-otp>
```

### name

Form field name written onto a hidden input that mirrors the joined value.

```html
<aegov-otp name="otp" length="6"></aegov-otp>
```

### field-id

Auto-generated as `aegov-otp-{n}` if not provided. Reflected onto the first cell so an `aegov-label` can target it via `for`.

```html
<aegov-otp field-id="login-otp"></aegov-otp>
```

## Sizes

```html
<aegov-otp size="xs"></aegov-otp>
<aegov-otp size="sm"></aegov-otp>
<aegov-otp size="base"></aegov-otp>
<aegov-otp size="lg"></aegov-otp>
<aegov-otp size="xl"></aegov-otp>
<aegov-otp size="2xl"></aegov-otp>

<!-- Responsive -->
<aegov-otp size="sm md:base lg:lg"></aegov-otp>
```

## Examples

### 4-digit numeric

```html
<aegov-otp length="4"></aegov-otp>
```

### 6-digit numeric, individual variant

```html
<aegov-otp length="6" variant="individual"></aegov-otp>
```

### Alphanumeric activation code

```html
<aegov-otp length="8" is-alphanumeric></aegov-otp>
```

### Pattern validation (must equal a fixed code)

```html
<aegov-otp length="6" pattern="^123456$"></aegov-otp>
<script>
  const otp = document.querySelector('aegov-otp');
  otp.addEventListener('aegovOtpComplete', (e) => console.log('valid', e.detail.value));
  otp.addEventListener('aegovOtpInvalid', (e) => console.log('invalid', e.detail.value));
</script>
```

### Inside a form with a label

```html
<aegov-form-field>
  <aegov-label slot="label">Verification code</aegov-label>
  <aegov-otp length="6" name="otp"></aegov-otp>
</aegov-form-field>
```

## RTL Behavior

OTP cells are rendered in source order. Under `dir="rtl"`, the first cell still represents the first character of the value but appears on the right edge. Arrow-key navigation maps to logical positions: `ArrowLeft` moves to the previous cell index, `ArrowRight` to the next, regardless of layout direction.

## API Reference

### Properties

| Property         | Attribute         | Description                                                | Type                            | Default       |
| ---------------- | ----------------- | ---------------------------------------------------------- | ------------------------------- | ------------- |
| `fieldId`        | `field-id`        | Unique ID for the first cell. Auto-generated if omitted.   | `string`                        | `undefined`   |
| `variant`        | `variant`         | `'continuous'` or `'individual'`.                          | `OtpVariant`                    | `'continuous'`|
| `length`         | `length`          | Number of cells.                                           | `number`                        | `5`           |
| `size`           | `size`            | Cell text size token (responsive supported).               | `string`                        | `'base'`      |
| `isAlphanumeric` | `is-alphanumeric` | Allow letters as well as digits.                           | `boolean`                       | `false`       |
| `pattern`        | `pattern`         | Regex applied when all cells are filled.                   | `string`                        | `undefined`   |
| `isDisabled`     | `is-disabled`     | Disables all cells.                                        | `boolean`                       | `false`       |
| `name`           | `name`            | Hidden input name for form submission.                     | `string`                        | `undefined`   |
| `value`          | `value`           | Combined value. Setter distributes chars across cells.     | `string`                        | `''`          |
| `extraClass`     | `extra-class`     | Additional CSS classes on the wrapper.                     | `string`                        | `undefined`   |

### Pass-through Attributes

`aria-*` and `data-*` attributes set on `<aegov-otp>` are forwarded to the inner `role="group"` wrapper.

### Events

| Event              | Description                                                            | Detail                                  |
| ------------------ | ---------------------------------------------------------------------- | --------------------------------------- |
| `aegovOtpChange`   | Fires on every character change.                                       | `{ value: string }`                     |
| `aegovOtpComplete` | Fires when all cells are filled and pattern (if any) validates.        | `{ value: string }`                     |
| `aegovOtpInvalid`  | Fires when all cells are filled but the pattern fails.                 | `{ value: string; pattern: string }`    |

### Event listening example

```html
<aegov-otp length="6" pattern="^[0-9]{6}$"></aegov-otp>
<script>
  const otp = document.querySelector('aegov-otp');
  otp.addEventListener('aegovOtpChange', (e) => console.log('partial', e.detail.value));
  otp.addEventListener('aegovOtpComplete', (e) => console.log('done', e.detail.value));
  otp.addEventListener('aegovOtpInvalid', (e) => console.log('invalid', e.detail));
</script>
```

### Methods

| Method     | Description                                          |
| ---------- | ---------------------------------------------------- |
| `clear()`  | Empties all cells, resets value, focuses first cell. |

```js
const otp = document.querySelector('aegov-otp');
await otp.clear();
```

## Accessibility

### Built-in

- The cell row is wrapped in `role="group"` so assistive tech announces it as a single composite control.
- Each cell carries `aria-label="Character N of M"` for unambiguous position context.
- The first cell sets `autocomplete="one-time-code"` so SMS auto-fill (iOS/Android) works; remaining cells set `autocomplete="off"` to avoid duplicate suggestions.
- `inputmode` is `numeric` by default, switching to `text` when `is-alphanumeric` is set, so mobile keyboards present the right layout.
- `Backspace`, `ArrowLeft`, and `ArrowRight` all move logical focus across cells.

### Developer responsibilities

- Provide a visible label via `aegov-form-field` + `aegov-label`, or pass `aria-label` on `<aegov-otp>` to describe the purpose (e.g. "Verification code").
- If you need a description (e.g. "We sent a code to your phone"), wire it via `aria-describedby` on the host or use `aegov-form-field`.

### Notes

- `pattern` validation only runs once **all** cells are filled. Partial values never trigger `aegovOtpInvalid`.
- Pasting more characters than `length` simply truncates; non-matching characters are skipped (filtered to digits or alphanumerics depending on mode).
