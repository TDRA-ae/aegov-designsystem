# Textarea

<p class="text-lg text-aeblack-500 mb-8">A multi-line text input for collecting longer-form content such as comments, descriptions, and messages. Supports sizing, character counting, auto-grow, resize control, and a read-only copy feature.</p>

## Introduction

The `aegov-textarea` component wraps a native `<textarea>` element with consistent styling, event handling, and accessibility support. It integrates seamlessly with `aegov-form-field` and `aegov-label` for structured form layouts.

The component provides **5 sizes**, **5 resize modes** (including auto-grow), an optional **character counter**, and a **copy-to-clipboard** button for read-only fields.

```html
<aegov-textarea placeholder="Enter your message..."></aegov-textarea>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-textarea placeholder="Enter your message..."></aegov-textarea>
</div>

---

## Sizes

The `size` property controls the font size and padding of the textarea. The height itself is determined by the native `rows` attribute.

| Size   | Font Size | Padding          |
|--------|-----------|------------------|
| `xs`   | 12px      | 6px 10px         |
| `sm`   | 14px      | 8px 12px         |
| `base` | 16px      | 10px 14px        |
| `lg`   | 18px      | 12px 16px        |
| `xl`   | 18px      | 14px 18px        |

```html
<aegov-textarea size="xs" placeholder="Extra small textarea"></aegov-textarea>
<aegov-textarea size="sm" placeholder="Small textarea"></aegov-textarea>
<aegov-textarea size="base" placeholder="Base textarea (default)"></aegov-textarea>
<aegov-textarea size="lg" placeholder="Large textarea"></aegov-textarea>
<aegov-textarea size="xl" placeholder="Extra large textarea"></aegov-textarea>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-textarea size="xs" placeholder="Extra small textarea"></aegov-textarea>
  <aegov-textarea size="sm" placeholder="Small textarea"></aegov-textarea>
  <aegov-textarea size="base" placeholder="Base textarea (default)"></aegov-textarea>
  <aegov-textarea size="lg" placeholder="Large textarea"></aegov-textarea>
  <aegov-textarea size="xl" placeholder="Extra large textarea"></aegov-textarea>
</div>

### Responsive Size

The `size` prop accepts Tailwind-style responsive prefixes. Write a space-separated string where each token is either a plain value or `breakpoint:value`. The base value (no prefix) applies below the smallest specified breakpoint.

Available breakpoints: `xs` (480px), `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px), `3xl` (1680px).

```html
<aegov-textarea size="sm xl:lg" placeholder="Responsive textarea"></aegov-textarea>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-textarea size="sm xl:lg" placeholder="Responsive textarea"></aegov-textarea>
</div>

> **Graceful degradation:** Unknown breakpoint names and invalid values are silently ignored. An unrecognised base value falls back to the component default.

---

## Rows

The native `rows` attribute controls the initial visible height. Pass it directly on the element — it is forwarded to the inner `<textarea>` via attribute pass-through.

```html
<aegov-textarea rows="3" placeholder="3 rows"></aegov-textarea>
<aegov-textarea rows="6" placeholder="6 rows"></aegov-textarea>
<aegov-textarea rows="10" placeholder="10 rows"></aegov-textarea>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-textarea rows="3" placeholder="3 rows"></aegov-textarea>
  <aegov-textarea rows="6" placeholder="6 rows"></aegov-textarea>
  <aegov-textarea rows="10" placeholder="10 rows"></aegov-textarea>
</div>

---

## Placeholder

Use the `placeholder` property to show hint text when the textarea is empty.

```html
<aegov-textarea placeholder="Tell us about your experience..."></aegov-textarea>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-textarea placeholder="Tell us about your experience..."></aegov-textarea>
</div>

---

## Value

Set the `value` property to pre-fill the textarea. The property is mutable and stays in sync with user input.

```html
<aegov-textarea value="This textarea has a pre-filled value."></aegov-textarea>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-textarea value="This textarea has a pre-filled value."></aegov-textarea>
</div>

---

## States

### Disabled

Set `disabled` to prevent interaction. The textarea becomes visually muted and unclickable.

```html
<aegov-textarea disabled value="This textarea is disabled."></aegov-textarea>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-textarea disabled value="This textarea is disabled."></aegov-textarea>
</div>

### Readonly

Set `readonly` to allow users to see and select text but not modify it.

```html
<aegov-textarea readonly value="This content is read-only. You can select and copy the text but cannot edit it."></aegov-textarea>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-textarea readonly value="This content is read-only. You can select and copy the text but cannot edit it."></aegov-textarea>
</div>

### Required

Set `required` to mark the textarea as a mandatory field. The native `required` attribute is forwarded to the inner element.

```html
<aegov-textarea required placeholder="This field is required"></aegov-textarea>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-textarea required placeholder="This field is required"></aegov-textarea>
</div>

---

## Resize Behaviour

The `resize` property controls how users can resize the textarea. There are five options.

| Value        | Behaviour                                            |
|--------------|------------------------------------------------------|
| `vertical`   | Default. The user can resize vertically only.        |
| `horizontal` | The user can resize horizontally only.               |
| `both`       | The user can resize in both directions.              |
| `none`       | Resizing is disabled entirely.                       |
| `auto`       | The textarea grows automatically to fit its content. |

```html
<aegov-textarea resize="vertical" placeholder="Vertical resize (default)"></aegov-textarea>
<aegov-textarea resize="horizontal" placeholder="Horizontal resize"></aegov-textarea>
<aegov-textarea resize="both" placeholder="Resize in both directions"></aegov-textarea>
<aegov-textarea resize="none" placeholder="No resize"></aegov-textarea>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-textarea resize="vertical" rows="3" placeholder="Vertical resize (default)"></aegov-textarea>
  <aegov-textarea resize="horizontal" rows="3" placeholder="Horizontal resize"></aegov-textarea>
  <aegov-textarea resize="both" rows="3" placeholder="Resize in both directions"></aegov-textarea>
  <aegov-textarea resize="none" rows="3" placeholder="No resize"></aegov-textarea>
</div>

---

## Auto-Grow

Set `resize="auto"` to make the textarea grow automatically as the user types. The textarea starts at the height defined by `rows` and expands vertically to fit the content. Manual resizing is disabled in this mode.

```html
<aegov-textarea resize="auto" rows="2" placeholder="Start typing — I will grow..."></aegov-textarea>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-textarea resize="auto" rows="2" placeholder="Start typing — I will grow..."></aegov-textarea>
</div>

---

## Character Counter

Set the `maxlength` property to display a character counter below the textarea. The counter shows the current character count against the maximum and turns red when exceeded.

The `maxlength` attribute is also forwarded to the native textarea, so the browser enforces the limit natively. The counter provides visual feedback.

```html
<aegov-textarea maxlength="100" placeholder="Maximum 100 characters"></aegov-textarea>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-textarea maxlength="100" placeholder="Maximum 100 characters"></aegov-textarea>
</div>

When the character count exceeds the limit, the counter text turns red and bold.

```html
<aegov-textarea maxlength="20" value="This text is longer than twenty characters"></aegov-textarea>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-textarea maxlength="20" value="This text is longer than twenty characters"></aegov-textarea>
</div>

---

## Copyable (Read-Only with Copy Button)

When both `readonly` and `copyable` are set, a copy button appears in the bottom-right corner of the textarea. Clicking it copies the textarea value to the clipboard and shows a brief checkmark confirmation.

```html
<aegov-textarea readonly copyable value="Click the copy button in the bottom-right corner to copy this text to your clipboard."></aegov-textarea>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-textarea readonly copyable value="Click the copy button in the bottom-right corner to copy this text to your clipboard."></aegov-textarea>
</div>

> **Note:** The `copyable` property only takes effect when `readonly` is also set. On a writable textarea, the copy button is not rendered.

---

## Usage with Form Field

The `aegov-textarea` component is designed to work inside `aegov-form-field` alongside `aegov-label`. The form field automatically links the label to the textarea for accessibility.

### Basic Form Field

```html
<aegov-form-field>
  <aegov-label>Description</aegov-label>
  <aegov-textarea placeholder="Enter a description..."></aegov-textarea>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>Description</aegov-label>
    <aegov-textarea placeholder="Enter a description..."></aegov-textarea>
  </aegov-form-field>
</div>

### With Helper Text

Add a helper `<span>` or `<p>` below the textarea for additional guidance.

```html
<aegov-form-field>
  <aegov-label>Bio</aegov-label>
  <aegov-textarea placeholder="Tell us about yourself..." maxlength="250" rows="4"></aegov-textarea>
  <span class="text-sm text-aeblack-400 mt-1">Write a short bio in 250 characters or less.</span>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>Bio</aegov-label>
    <aegov-textarea placeholder="Tell us about yourself..." maxlength="250" rows="4"></aegov-textarea>
    <span class="text-sm text-aeblack-400 mt-1">Write a short bio in 250 characters or less.</span>
  </aegov-form-field>
</div>

### Disabled Form Field

When the textarea is disabled inside a form field, the label is also visually dimmed.

```html
<aegov-form-field>
  <aegov-label>Notes</aegov-label>
  <aegov-textarea disabled value="This field is not available."></aegov-textarea>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>Notes</aegov-label>
    <aegov-textarea disabled value="This field is not available."></aegov-textarea>
  </aegov-form-field>
</div>

### Complete Form Example

```html
<aegov-form-field>
  <aegov-label>Feedback</aegov-label>
  <aegov-textarea
    required
    maxlength="500"
    rows="5"
    resize="auto"
    placeholder="Share your feedback with us..."
  ></aegov-textarea>
  <span class="text-sm text-aeblack-400 mt-1">Your feedback helps us improve our services.</span>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>Feedback</aegov-label>
    <aegov-textarea required maxlength="500" rows="5" resize="auto" placeholder="Share your feedback with us..."></aegov-textarea>
    <span class="text-sm text-aeblack-400 mt-1">Your feedback helps us improve our services.</span>
  </aegov-form-field>
</div>

---

## Events

The component emits four custom events. All events bubble and are composed.

```html
<aegov-textarea id="event-demo" placeholder="Type here to see events..." maxlength="50"></aegov-textarea>
<pre id="event-log" class="mt-4 text-sm bg-aeblack-800 text-whitely-50 p-4 rounded-lg h-32 overflow-auto"></pre>

<script>
  const textarea = document.getElementById('event-demo');
  const log = document.getElementById('event-log');

  function logEvent(name, detail) {
    const line = document.createElement('div');
    line.textContent = name + ': ' + JSON.stringify(detail).slice(0, 80);
    log.prepend(line);
  }

  textarea.addEventListener('aegovTextareaInput', (e) => {
    logEvent('aegovTextareaInput', { value: e.detail.value });
  });
  textarea.addEventListener('aegovTextareaChange', (e) => {
    logEvent('aegovTextareaChange', { value: e.detail.value });
  });
  textarea.addEventListener('aegovTextareaFocus', () => {
    logEvent('aegovTextareaFocus', {});
  });
  textarea.addEventListener('aegovTextareaBlur', () => {
    logEvent('aegovTextareaBlur', {});
  });
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-textarea id="event-demo-textarea" placeholder="Type here to see events..." maxlength="50"></aegov-textarea>
  <pre id="event-log-textarea" class="mt-4 text-sm bg-aeblack-800 text-whitely-50 p-4 rounded-lg h-32 overflow-auto"></pre>
  <script>
    (function() {
      var textarea = document.getElementById('event-demo-textarea');
      var log = document.getElementById('event-log-textarea');
      function logEvent(name, detail) {
        var line = document.createElement('div');
        line.textContent = name + ': ' + JSON.stringify(detail).slice(0, 80);
        log.prepend(line);
      }
      textarea.addEventListener('aegovTextareaInput', function(e) {
        logEvent('aegovTextareaInput', { value: e.detail.value });
      });
      textarea.addEventListener('aegovTextareaChange', function(e) {
        logEvent('aegovTextareaChange', { value: e.detail.value });
      });
      textarea.addEventListener('aegovTextareaFocus', function() {
        logEvent('aegovTextareaFocus', {});
      });
      textarea.addEventListener('aegovTextareaBlur', function() {
        logEvent('aegovTextareaBlur', {});
      });
    })();
  </script>
</div>

---

## RTL Support

The component fully supports right-to-left layouts. When the document or a parent element has `dir="rtl"`, text alignment, padding, the character counter, and the copy button position all mirror automatically.

```html
<div dir="rtl">
  <aegov-form-field>
    <aegov-label>الوصف</aegov-label>
    <aegov-textarea placeholder="أدخل الوصف هنا..." maxlength="200" rows="4"></aegov-textarea>
  </aegov-form-field>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-label>الوصف</aegov-label>
    <aegov-textarea placeholder="أدخل الوصف هنا..." maxlength="200" rows="4"></aegov-textarea>
  </aegov-form-field>
</div>

No additional configuration is needed — the component reads the inherited `dir` attribute and adjusts automatically.

---

## API Reference

### Properties

| Property      | Attribute      | Description                                                                 | Type                                                        | Default      |
|---------------|----------------|-----------------------------------------------------------------------------|-------------------------------------------------------------|--------------|
| `fieldId`     | `field-id`     | Unique ID for the native textarea. Auto-generated if not provided.          | `string`                                                    | auto         |
| `size`        | `size`         | The size of the textarea (controls font size and padding). Supports responsive strings (e.g. `'sm xl:lg'`). | `'xs'` \| `'sm'` \| `'base'` \| `'lg'` \| `'xl'`          | `'base'`     |
| `value`       | `value`        | The current value of the textarea                                           | `string`                                                    | `''`         |
| `placeholder` | `placeholder`  | Placeholder hint text                                                       | `string`                                                    | `undefined`  |
| `name`        | `name`         | The name attribute for form submission                                      | `string`                                                    | `undefined`  |
| `disabled`    | `disabled`     | Prevents interaction                                                        | `boolean`                                                   | `false`      |
| `readonly`    | `readonly`     | Allows selection but prevents editing                                       | `boolean`                                                   | `false`      |
| `required`    | `required`     | Marks the field as mandatory                                                | `boolean`                                                   | `false`      |
| `resize`      | `resize`       | Controls resize behaviour                                                   | `'none'` \| `'vertical'` \| `'horizontal'` \| `'both'` \| `'auto'` | `'vertical'` |
| `maxlength`   | `maxlength`    | Maximum character count. When set, displays a character counter.            | `number`                                                    | `undefined`  |
| `copyable`    | `copyable`     | Show a copy button (only when `readonly` is also set)                       | `boolean`                                                   | `false`      |
| `class`       | `class`        | Additional CSS classes to apply to the native textarea                      | `string`                                                    | `undefined`  |

### Events

| Event                  | Description                                      | Detail Type                            |
|------------------------|--------------------------------------------------|----------------------------------------|
| `aegovTextareaInput`   | Emitted on every keystroke                       | `{ value: string; event: Event }`      |
| `aegovTextareaChange`  | Emitted when the value changes (on blur)         | `{ value: string; event: Event }`      |
| `aegovTextareaFocus`   | Emitted when the textarea gains focus            | `FocusEvent`                           |
| `aegovTextareaBlur`    | Emitted when the textarea loses focus            | `FocusEvent`                           |

#### Listening to Events

```html
<aegov-textarea id="my-textarea"></aegov-textarea>

<script>
  document.getElementById('my-textarea')
    .addEventListener('aegovTextareaInput', (e) => {
      console.log('Current value:', e.detail.value);
    });
</script>
```

### Slots

This component does **not** use slots. All content is managed through the `value` property.

### Pass-Through Attributes

The component forwards a set of native textarea attributes from the host element to the inner `<textarea>`. This allows you to use standard HTML attributes without extra configuration.

| Attribute       | Purpose                                  |
|-----------------|------------------------------------------|
| `rows`          | Number of visible text lines             |
| `cols`          | Visible width in average character widths |
| `minlength`     | Minimum number of characters             |
| `maxlength`     | Maximum number of characters (also enables counter) |
| `wrap`          | How the text wraps (`soft`, `hard`)      |
| `autocomplete`  | Browser autocomplete hint                |
| `autofocus`     | Focus the textarea on page load          |
| `spellcheck`    | Enable/disable spell checking            |
| `enterkeyhint`  | Virtual keyboard enter key hint          |
| `title`         | Tooltip text                             |
| `tabindex`      | Tab order override                       |
| `form`          | Associate with a form by ID             |

In addition, all `aria-*` and `data-*` attributes are automatically forwarded.

```html
<aegov-textarea rows="5" spellcheck="false" data-testid="feedback-field" aria-label="Feedback"></aegov-textarea>
```

---

## Accessibility

The `aegov-textarea` component is built with accessibility as a first-class concern.

### Built-in Features

- **Native `<textarea>` element** — renders a semantic HTML textarea that is keyboard-focusable and announced correctly by screen readers.
- **Label association** — when used inside `aegov-form-field` with `aegov-label`, the label is automatically linked via `for`/`id` pairing.
- **Character counter with `aria-live`** — the counter uses `aria-live="polite"` and `aria-atomic="true"` so screen readers announce count changes without interrupting the user.
- **`aria-describedby`** — when a character counter is present, the textarea is linked to it via `aria-describedby` so assistive technologies can read the count.
- **Focus indicators** — clearly visible focus rings using `inset-ring` styles ensure the textarea is identifiable during keyboard navigation.
- **Disabled state** — adds `pointer-events: none`, `cursor-not-allowed`, and reduced opacity to make the textarea visually and functionally inert.
- **Pass-through `aria-*` attributes** — any `aria-*` attribute placed on the host element is forwarded to the native textarea.
- **Copy button labelling** — the copy button includes a dynamic `aria-label` that changes from "Copy to clipboard" to "Copied" on activation.

### Developer Responsibilities

1. **Always pair with a label.** Use `aegov-form-field` with `aegov-label` or provide an `aria-label` attribute if a visible label is not appropriate.

   ```html
   <aegov-textarea aria-label="Additional notes"></aegov-textarea>
   ```

2. **Provide error messages.** When validation fails, add an error message below the textarea and link it with `aria-describedby` for screen reader users.

3. **Colour contrast.** All built-in styles meet WCAG 2.1 AA contrast ratios. If you override colours using the `class` property, verify that the new colours maintain at least a **4.5:1** contrast ratio for text.

4. **Do not remove focus styles.** The built-in focus ring is essential for keyboard navigation. Avoid overriding it with `outline: none`.

---

## Notes

- The `aegov-textarea` component renders a native `<textarea>` element internally. It does **not** use Shadow DOM, so global styles can reach it.
- The `resize` property defaults to `vertical`. Set it to `auto` for auto-growing textareas that expand as the user types.
- When `resize="auto"` is set, the textarea adjusts its height on every input event and whenever the `value` property changes programmatically.
- The `copyable` property only takes effect when `readonly` is also `true`. On editable textareas, the copy button is never rendered.
- The character counter appears only when `maxlength` is set. It does **not** prevent the user from typing beyond the limit by default (native HTML `maxlength` handles enforcement). The counter provides visual feedback and turns red when exceeded.
- The `fieldId` property is auto-generated if not provided. If you need a stable ID (e.g. for testing), pass `field-id="my-textarea"` explicitly.
- The component emits `aegovTextareaInput` on every keystroke and `aegovTextareaChange` on blur. Use `aegovTextareaInput` for live validation or character counting, and `aegovTextareaChange` for final value submission.
- When used inside `aegov-form-field`, the parent component automatically links the `aegov-label` to the textarea via the `fieldId`. You do not need to set `for` manually on the label.
- Native attributes like `rows`, `cols`, `wrap`, `spellcheck`, `autofocus`, and `tabindex` are passed through to the inner textarea. Place them directly on the `aegov-textarea` element.
