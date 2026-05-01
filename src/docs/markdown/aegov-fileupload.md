# aegov-fileupload

A file selection control with three layouts — a styled input, a button trigger, and a drag-and-drop dropzone — backed by a native `<input type="file">`. Handles client-side validation for accepted types, max file size, and max file count, and exposes the picked files via events and methods.

## Properties

### variant

Selects the layout.

- `default`: input-like field with a built-in browse button. Single selection slot — picking new files replaces the previous selection.
- `button`: a button trigger with the selected files listed below. Picks accumulate.
- `dropzone`: a drop area with a fallback browse button. Picks accumulate.

```html
<aegov-fileupload variant="default"></aegov-fileupload>
<aegov-fileupload variant="button"></aegov-fileupload>
<aegov-fileupload variant="dropzone"></aegov-fileupload>
```

### size

Token for control sizing. Accepts `xs`, `sm`, `base`, `lg`, `xl`, or a responsive string.

```html
<aegov-fileupload size="lg"></aegov-fileupload>
<aegov-fileupload size="sm md:base lg:lg"></aegov-fileupload>
```

### is-multiple

Allow selecting more than one file.

```html
<aegov-fileupload is-multiple></aegov-fileupload>
```

### accept

Comma-separated list of allowed types. Use file extensions (`.pdf`), MIME types (`application/pdf`), or wildcards (`image/*`).

```html
<aegov-fileupload accept=".pdf,.docx"></aegov-fileupload>
<aegov-fileupload accept="image/*"></aegov-fileupload>
```

### max-file-size

Maximum size in bytes. Files exceeding the limit emit `aegovFileuploadError` with `type: 'max-size'` and are excluded from selection.

```html
<aegov-fileupload max-file-size="2097152"></aegov-fileupload>
```

### max-files

Maximum number of files (multiple mode). Excess files emit `aegovFileuploadError` with `type: 'max-files'`.

```html
<aegov-fileupload is-multiple max-files="3"></aegov-fileupload>
```

### label / description / label-help / label-button

Visible text wrappers.

- `label`: rendered above the control, linked via `for`.
- `description`: subtitle line under the label.
- `label-help`: helper text under the control. Falls back to a friendly summary derived from `accept` if not provided.
- `label-button`: overrides the trigger button text.

```html
<aegov-fileupload
  label="Resume"
  description="PDF only, max 5 MB"
  label-help="Max 5 MB"
  label-button="Choose file"
  accept=".pdf"
></aegov-fileupload>
```

### is-disabled / is-required / name

```html
<aegov-fileupload is-disabled></aegov-fileupload>
<aegov-fileupload is-required label="Identification"></aegov-fileupload>
<aegov-fileupload name="documents" is-multiple></aegov-fileupload>
```

### field-id

Auto-generated as `aegov-fileupload-{n}` if not provided. Reflected onto the inner native input so labels can target it.

```html
<aegov-fileupload field-id="docs"></aegov-fileupload>
```

## Sizes

```html
<aegov-fileupload size="xs"></aegov-fileupload>
<aegov-fileupload size="sm"></aegov-fileupload>
<aegov-fileupload size="base"></aegov-fileupload>
<aegov-fileupload size="lg"></aegov-fileupload>
<aegov-fileupload size="xl"></aegov-fileupload>

<aegov-fileupload size="sm md:base lg:lg"></aegov-fileupload>
```

## Examples

### Default variant

```html
<aegov-fileupload label="Upload document" accept=".pdf,.docx"></aegov-fileupload>
```

### Button variant with multiple files and a max

```html
<aegov-fileupload
  variant="button"
  label="Attachments"
  is-multiple
  max-files="5"
  accept="image/*,.pdf"
></aegov-fileupload>
```

### Dropzone variant

```html
<aegov-fileupload
  variant="dropzone"
  label="Drop files here"
  description="Up to 10 MB each"
  is-multiple
  max-file-size="10485760"
></aegov-fileupload>
```

### Listening for events

```html
<aegov-fileupload id="up" variant="dropzone" is-multiple accept="image/*"></aegov-fileupload>
<script>
  const up = document.getElementById('up');
  up.addEventListener('aegovFileuploadChange', (e) => {
    console.log('current files', e.detail.files);
  });
  up.addEventListener('aegovFileuploadError', (e) => {
    console.warn('error', e.detail.type, e.detail.message);
  });
  up.addEventListener('aegovFileuploadRemove', (e) => {
    console.log('removed', e.detail.file.name);
  });
</script>
```

### Reading the current selection

```js
const up = document.querySelector('aegov-fileupload');
const files = await up.getFiles();
console.log(files.map(f => f.name));
```

## RTL Behavior

In `dir="rtl"` containers the trigger button moves to the start (right) edge in default variant; the file list, file icon, file name, file size, and remove button all use logical inline properties so they flip into a right-to-left reading order. The dropzone layout is centered and unaffected by direction.

## API Reference

### Properties

| Property       | Attribute        | Description                                              | Type                 | Default     |
| -------------- | ---------------- | -------------------------------------------------------- | -------------------- | ----------- |
| `fieldId`      | `field-id`       | Unique id (auto-generated if omitted).                   | `string`             | `undefined` |
| `variant`      | `variant`        | `'default' \| 'button' \| 'dropzone'`.                   | `FileuploadVariant`  | `'default'` |
| `size`         | `size`           | Size token (responsive supported).                       | `string`             | `'base'`    |
| `isMultiple`   | `is-multiple`    | Allow multiple file selection.                           | `boolean`            | `false`     |
| `accept`       | `accept`         | Allowed file types (comma list).                         | `string`             | `undefined` |
| `maxFileSize`  | `max-file-size`  | Max file size in bytes.                                  | `number`             | `undefined` |
| `maxFiles`     | `max-files`      | Max number of files.                                     | `number`             | `undefined` |
| `isDisabled`   | `is-disabled`    | Disables the control.                                    | `boolean`            | `false`     |
| `isRequired`   | `is-required`    | Marks the field required.                                | `boolean`            | `false`     |
| `name`         | `name`           | Form field name.                                         | `string`             | `undefined` |
| `label`        | `label`          | Label text above the control.                            | `string`             | `undefined` |
| `description`  | `description`    | Description text under the label.                        | `string`             | `undefined` |
| `labelHelp`    | `label-help`     | Helper text override (otherwise derived from `accept`).  | `string`             | `undefined` |
| `labelButton`  | `label-button`   | Trigger button text override.                            | `string`             | `undefined` |

### Pass-through Attributes

`aria-*`, `data-*`, plus the explicit list `capture`, `autofocus`, `form`, `tabindex`, `title`, `webkitdirectory` are forwarded to the inner native `<input type="file">`.

### Events

| Event                    | Description                                                              | Detail                                                                                |
| ------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| `aegovFileuploadChange`  | Fires whenever the selection changes (added or removed).                 | `{ files: File[] }`                                                                   |
| `aegovFileuploadRemove`  | Fires when a file is removed via the remove button.                      | `{ file: File; remaining: File[] }`                                                   |
| `aegovFileuploadError`   | Fires when a file fails validation.                                      | `{ type: 'max-size' \| 'max-files' \| 'invalid-type'; file?: File; message: string }` |

### Event listening example

```html
<aegov-fileupload id="up" variant="button" is-multiple accept=".pdf"></aegov-fileupload>
<script>
  const up = document.getElementById('up');
  up.addEventListener('aegovFileuploadChange', (e) => console.log('files', e.detail.files));
  up.addEventListener('aegovFileuploadError', (e) => console.warn(e.detail.message));
</script>
```

### Methods

| Method       | Description                                       |
| ------------ | ------------------------------------------------- |
| `getFiles()` | Resolves with a copy of the currently picked files. |
| `clear()`    | Empties the selection and resets the native input. |

```js
const up = document.querySelector('aegov-fileupload');
const files = await up.getFiles();
await up.clear();
```

## Accessibility

### Built-in

- The control is anchored on a real `<input type="file">`, so it is keyboard-focusable, screen-reader-friendly, and submits with native forms.
- The visible `<label>` is wired via `for` to the inner input's id.
- When helper text is shown, the input gets `aria-describedby="${fieldId}-helper"`.
- The button and dropzone variants render an aria-hidden, tabIndex `-1` file input behind a real `<button>` so keyboard users still trigger the OS picker through the button (Enter/Space).
- Each file in the list has an explicit `aria-label="Remove {filename}"` on its remove button.

### Developer responsibilities

- Always provide a meaningful `label` (or external `aegov-label`) so screen readers can announce the purpose of the upload.
- For dropzone use cases, supply a `description` clarifying the supported types and size limits — drag-and-drop is purely a visual enhancement; the button is the accessible fallback.
- Surface validation errors visibly when `aegovFileuploadError` fires (the component does not render an error state on its own).

### Notes

- The native input is reset to an empty value after each selection so picking the same file again still triggers `aegovFileuploadChange`.
- Default variant replaces the entire selection on each pick; button and dropzone variants accumulate. Use `clear()` to reset programmatically.
- `accept` is also enforced client-side in addition to the OS picker filter; the OS picker may still allow "All files".
