# aegov-textarea

A styled wrapper around the native `<textarea>` element for collecting multi-line text. Supports design-system-aligned sizing, configurable resize behavior, an optional character counter, and an optional copy-to-clipboard button.

## Properties

### value

The current value of the textarea. Mutable — updated internally on `input`/`change`.

```html
<aegov-textarea value="Hello"></aegov-textarea>
```

### size

The font-size scale of the textarea. Accepts `xs`, `sm`, `base`, `lg`, `xl`. Also supports a Tailwind-style responsive string.

```html
<aegov-textarea size="lg"></aegov-textarea>
<aegov-textarea size="sm md:base lg:lg"></aegov-textarea>
```

### resize

Controls user-resize behavior. Accepts `none`, `vertical`, `horizontal`, `both`, or `auto`. With `auto`, the textarea automatically grows to fit its content (resize handle disabled).

```html
<aegov-textarea resize="none"></aegov-textarea>
<aegov-textarea resize="vertical"></aegov-textarea>
<aegov-textarea resize="auto"></aegov-textarea>
```

### placeholder

Placeholder text shown when empty.

```html
<aegov-textarea placeholder="Tell us more..."></aegov-textarea>
```

### name

The native `name` attribute used in form submission.

```html
<aegov-textarea name="comments"></aegov-textarea>
```

### field-id

The `id` of the rendered native `<textarea>`. Auto-generated as `aegov-textarea-{n}` if not provided.

```html
<aegov-textarea field-id="comments-ta"></aegov-textarea>
```

### is-disabled

Disables the textarea.

```html
<aegov-textarea is-disabled="true"></aegov-textarea>
```

### is-readonly

Marks the textarea as readonly. Required to enable `is-copyable`.

```html
<aegov-textarea is-readonly="true" value="System message"></aegov-textarea>
```

### is-required

Marks the field as required.

```html
<aegov-textarea is-required="true"></aegov-textarea>
```

### maxlength

Maximum number of characters. When set, a live character counter is rendered below the textarea and linked via `aria-describedby`.

```html
<aegov-textarea maxlength="280" placeholder="Up to 280 chars"></aegov-textarea>
```

### is-copyable

Adds a copy-to-clipboard button. Only takes effect when `is-readonly="true"`.

```html
<aegov-textarea is-readonly="true" is-copyable="true" value="Long text..."></aegov-textarea>
```

### extra-class

Additional CSS classes applied to the native `<textarea>`.

```html
<aegov-textarea extra-class="font-mono"></aegov-textarea>
```

## Sizes

`size` accepts a single token or a responsive string using Tailwind-style breakpoint prefixes (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`).

```html
<aegov-textarea size="xs"></aegov-textarea>
<aegov-textarea size="sm"></aegov-textarea>
<aegov-textarea size="base"></aegov-textarea>
<aegov-textarea size="lg"></aegov-textarea>
<aegov-textarea size="xl"></aegov-textarea>

<!-- Responsive -->
<aegov-textarea size="sm md:base lg:lg"></aegov-textarea>
```

## Examples

### Basic textarea

```html
<aegov-textarea placeholder="Add a comment"></aegov-textarea>
```

### With character counter

```html
<aegov-textarea
  maxlength="280"
  placeholder="What's happening?"
></aegov-textarea>
```

### Auto-resizing textarea

```html
<aegov-textarea resize="auto" placeholder="Grows as you type"></aegov-textarea>
```

### Readonly + copyable

```html
<aegov-textarea
  is-readonly="true"
  is-copyable="true"
  value="The quick brown fox jumps over the lazy dog."
></aegov-textarea>
```

### Inside an aegov-form-field

```html
<aegov-form-field>
  <aegov-label>Description</aegov-label>
  <aegov-textarea name="description" maxlength="500" rows="5"></aegov-textarea>
</aegov-form-field>
```

## RTL Behavior

`aegov-textarea` uses Tailwind logical properties for padding and the copy button position, so it lays out correctly when the surrounding container has `dir="rtl"`. The character counter renders below the field and follows the textual direction of the document.

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID for the native `<textarea>`. Auto-generated if not provided. | `string` | auto |
| `value` | `value` | Current value (mutable). | `string` | `''` |
| `size` | `size` | Size token or responsive string. | `string` | `'base'` |
| `resize` | `resize` | Resize behavior. | `'none' \| 'vertical' \| 'horizontal' \| 'both' \| 'auto'` | `'vertical'` |
| `placeholder` | `placeholder` | Placeholder text. | `string` | `undefined` |
| `name` | `name` | Native `name` attribute. | `string` | `undefined` |
| `isDisabled` | `is-disabled` | Disable the textarea. | `boolean` | `false` |
| `isReadonly` | `is-readonly` | Mark the textarea readonly. | `boolean` | `false` |
| `isRequired` | `is-required` | Mark the field as required. | `boolean` | `false` |
| `maxlength` | `maxlength` | Max characters; enables counter. | `number` | `undefined` |
| `isCopyable` | `is-copyable` | Show copy-to-clipboard button (only with `is-readonly`). | `boolean` | `false` |
| `extraClass` | `extra-class` | Additional CSS classes. | `string` | `undefined` |

### Pass-through Attributes

`aria-*` and `data-*` attributes set on the host are always forwarded to the native `<textarea>`. The following standard textarea attributes are also forwarded when set on the host:

| Attribute | Notes |
| --- | --- |
| `rows`, `cols` | Visible lines / characters per line |
| `minlength`, `maxlength` | Character count constraints (note: `maxlength` is also a typed prop and enables the counter) |
| `wrap` | `soft` / `hard` text wrapping |
| `autocomplete` | Autofill hints |
| `autofocus` | Focus on mount |
| `spellcheck` | Spellchecking on/off |
| `enterkeyhint` | Mobile keyboard "Enter" label |
| `title` | Native tooltip / validation message |
| `tabindex` | Custom tab order |
| `form` | Associate with a form by id |

### Events

| Event | Description | Detail |
| --- | --- | --- |
| `aegovTextareaChange` | Fires on commit (`change`). | `{ value: string; event: Event }` |
| `aegovTextareaInput` | Fires on every keystroke. | `{ value: string; event: Event }` |
| `aegovTextareaFocus` | Fires on focus. | `FocusEvent` |
| `aegovTextareaBlur` | Fires on blur. | `FocusEvent` |

### Event listening example

```html
<aegov-textarea id="bio"></aegov-textarea>
<script>
  const el = document.getElementById('bio');
  el.addEventListener('aegovTextareaInput', (e) => {
    console.log('Typed:', e.detail.value);
  });
</script>
```

### Slots

This component has no named slots — its content is entirely the textarea value. Set initial text via the `value` attribute.

## Accessibility

### Built-in

- Renders a native `<textarea>` for full keyboard, IME, and assistive-tech support.
- `is-required` sets the native `required` attribute.
- When `maxlength` is set, the counter is given a stable id (`{fieldId}-counter`), is announced via `aria-live="polite"`, and is referenced by `aria-describedby` on the textarea so screen readers report the limit and remaining characters.
- The copy button has an `aria-label` (`"Copy to clipboard"` / `"Copied"`) and `tabindex="-1"` to avoid extra tab stops.

### Developer responsibilities

- Provide a visible label via `aegov-label` (inside `aegov-form-field`), a sibling `<label for="...">`, or `aria-label` / `aria-labelledby` on the host.
- When error or hint text is shown nearby, link it with `aria-describedby`.

### Notes

- `is-copyable` only takes effect when `is-readonly="true"`.
- `resize="auto"` disables the manual resize handle and auto-grows the textarea on input.
- The character counter still renders when `charCount` exceeds `maxlength`, with a visual `--over` modifier; the native `maxlength` attribute (if provided via pass-through) will additionally cap input at the browser level.
