# File Upload

<p class="text-lg text-aeblack-500 mb-8">A file selection control for collecting documents and images from users — Emirates ID copies, passport photographs, supporting evidence for a service application, or any other attachment a UAE Government service may require. The component renders three layouts: a styled input with a built-in browse button, a stand-alone trigger button with an inline file list, and a drag-and-drop dropzone. Each layout is anchored on a real <code>&lt;input type="file"&gt;</code> so submissions, validation, and accessibility all behave like a native form control.</p>

## Introduction

The `aegov-fileupload` component wraps a native file input and adds client-side validation for accepted file types, maximum file size, and the maximum number of files. Picked files appear in a list with a remove button per file, and three custom events (`aegovFileuploadChange`, `aegovFileuploadRemove`, `aegovFileuploadError`) keep your form code informed of every change. The component never overrides the OS file picker — it only filters and formats what the user provides.

```html
<aegov-fileupload
  label="Upload your Emirates ID"
  description="Upload a clear, full-page scan of both sides as a single PDF."
  accept=".pdf"
  max-file-size="5242880"
></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-fileupload
    label="Upload your Emirates ID"
    description="Upload a clear, full-page scan of both sides as a single PDF."
    accept=".pdf" 
    label-button="Select Emirates ID" 
    max-file-size="5242880"
  ></aegov-fileupload>
</div>

---

## Variants

The `appearance` property selects the layout. All three appearances share the same validation, events, and form behaviour — only their visual presentation differs.

### Default

The default appearance looks like a styled text input with a Browse button on the trailing edge. Use it inside dense forms that already contain other input fields. Each new pick replaces the previous selection.

```html
<aegov-fileupload
  appearance="default"
  label="Passport bio-data page"
  accept="image/*,.pdf"
  max-file-size="5242880"
></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-fileupload
    appearance="default"
    label="Passport bio-data page"
    accept="image/*,.pdf"
    max-file-size="5242880"
  ></aegov-fileupload>
</div>

### Button

The button appearance renders a single trigger button. Picked files appear in a list below the button and accumulate across multiple picks until the user removes them or the maximum count is reached.

```html
<aegov-fileupload
  appearance="button"
  label="Supporting documents"
  description="Add any additional documents that support your application."
  is-multiple="true"
  max-files="5"
  accept=".pdf,.docx,image/*"
></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-fileupload
    appearance="button"
    label="Supporting documents"
    description="Add any additional documents that support your application."
    is-multiple="true"
    max-files="5"
    accept=".pdf,.docx,image/*"
  ></aegov-fileupload>
</div>

### Dropzone

The dropzone appearance renders a large drag-and-drop target with a fallback browse button. Best for high-volume document upload screens — for example, a service portal that asks the applicant to attach several scanned pages in one step. Picked files accumulate, just like the button appearance.

```html
<aegov-fileupload
  appearance="dropzone"
  label="Drop your supporting documents here"
  description="Accepted: PDF, JPG, PNG. Maximum 10 MB per file."
  is-multiple="true"
  max-file-size="10485760"
  accept=".pdf,image/*"
></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-fileupload
    appearance="dropzone"
    label="Drop your supporting documents here"
    description="Accepted: PDF, JPG, PNG. Maximum 10 MB per file."
    is-multiple="true"
    max-file-size="10485760"
    accept=".pdf,image/*"
  ></aegov-fileupload>
</div>

---

## Accepted file types

Set the `accept` property to a comma-separated list of file extensions (`.pdf`), MIME types (`application/pdf`), or wildcards (`image/*`). The component enforces this list both in the OS picker filter and after the user selects a file — the OS picker may still let the user choose &ldquo;All files&rdquo;, so the second check is important.

When `accept` is provided and `label-help` is omitted, the component generates a friendly summary line such as &ldquo;Allowed: PDF, JPG&rdquo;.

```html
<aegov-fileupload
  label="Passport photograph"
  accept="image/jpeg,image/png"
  max-file-size="2097152"
></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-fileupload
    label="Passport photograph"
    accept="image/jpeg,image/png"
    max-file-size="2097152"
  ></aegov-fileupload>
</div>

---

## Multiple files and maximum count

Set `is-multiple="true"` to allow the user to select more than one file. Pair it with `max-files` to cap the total. When the cap is reached, additional picks emit an `aegovFileuploadError` event with `type: 'max-files'` and are not added to the selection.

```html
<aegov-fileupload
  appearance="button"
  label="Vehicle registration documents"
  is-multiple="true"
  max-files="3"
  accept=".pdf,image/*"
></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-fileupload
    appearance="button"
    label="Vehicle registration documents"
    is-multiple="true"
    max-files="3"
    accept=".pdf,image/*"
  ></aegov-fileupload>
</div>

---

## Maximum file size

Set `max-file-size` in bytes. Files larger than the limit emit `aegovFileuploadError` with `type: 'max-size'` and are excluded from the selection. The default helper text reads only the `accept` list — surface size limits to the user via `description` or `label-help`.

```html
<aegov-fileupload
  appearance="dropzone"
  label="Tenancy contract"
  description="PDF only, maximum 5 MB."
  accept=".pdf"
  max-file-size="5242880"
></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-fileupload
    appearance="dropzone"
    label="Tenancy contract"
    description="PDF only, maximum 5 MB."
    accept=".pdf"
    max-file-size="5242880"
  ></aegov-fileupload>
</div>

---

## Sizes

The `size` property scales the input height for the default appearance and the button height for the button and dropzone appearances. Tokens: `xs`, `sm`, `base` (default), `lg`, `xl`. A Tailwind-style responsive string is also supported, e.g. `sm md:base lg:lg`.

```html
<aegov-fileupload size="sm" label="Small (sm)" accept=".pdf"></aegov-fileupload>
<aegov-fileupload size="base" label="Base (default)" accept=".pdf"></aegov-fileupload>
<aegov-fileupload size="lg" label="Large (lg)" accept=".pdf"></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-fileupload size="sm" label="Small (sm)" accept=".pdf"></aegov-fileupload>
  <div class="my-4"></div>
  <aegov-fileupload size="base" label="Base (default)" accept=".pdf"></aegov-fileupload>
  <div class="my-4"></div>
  <aegov-fileupload size="lg" label="Large (lg)" accept=".pdf"></aegov-fileupload>
</div>

### Responsive sizes

```html
<aegov-fileupload size="sm md:base xl:lg" label="Resizes with the viewport" accept=".pdf"></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-fileupload size="sm md:base xl:lg" label="Resizes with the viewport" accept=".pdf"></aegov-fileupload>
</div>

---

## Variant

The `variant` property selects the colour family for the default-appearance ring, the button-appearance fill, the dropzone-appearance border, and the file-name accent. The focus ring stays `primary-support-600` (camel) and the error border stays `aered-600` regardless of variant.

- `primary` — primary-* family (default)
- `secondary` — secondary-* family
- `neutral-max` — strong neutral (aeblack-800 family)
- `neutral-min` — quiet neutral (aeblack-100 family). Button fill stays `aeblack-800` so the button remains legible.

### Colour matrix

| Variant       | Default ring     | Button bg       | Dropzone border | File-name accent |
| ------------- | ---------------- | --------------- | --------------- | ---------------- |
| `primary`     | `primary-400`    | `primary-600`   | `primary-200`   | `primary-900`    |
| `secondary`   | `secondary-400`  | `secondary-600` | `secondary-200` | `secondary-900`  |
| `neutral-max` | `aeblack-400`    | `aeblack-800`   | `aeblack-300`   | `aeblack-900`    |
| `neutral-min` | `aeblack-200`    | `aeblack-800`   | `aeblack-100`   | `aeblack-900`    |

```html
<aegov-fileupload variant="primary" label="Primary" accept=".pdf"></aegov-fileupload>
<aegov-fileupload variant="secondary" label="Secondary" accept=".pdf"></aegov-fileupload>
<aegov-fileupload variant="neutral-max" label="Neutral-max" accept=".pdf"></aegov-fileupload>
<aegov-fileupload variant="neutral-min" label="Neutral-min" accept=".pdf"></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <aegov-fileupload variant="primary" label="Primary" accept=".pdf"></aegov-fileupload>
    <aegov-fileupload variant="secondary" label="Secondary" accept=".pdf"></aegov-fileupload>
    <aegov-fileupload variant="neutral-max" label="Neutral-max" accept=".pdf"></aegov-fileupload>
    <aegov-fileupload variant="neutral-min" label="Neutral-min" accept=".pdf"></aegov-fileupload>
  </div>
</div>

---

## Required and disabled

Set `is-required="true"` to mark the field as required — a red asterisk renders next to the label and the inner native input gains the `required` attribute, so it participates in native form validation. Set `is-disabled="true"` to lock the control and prevent any interaction.

```html
<aegov-fileupload
  label="Identification"
  is-required="true"
  accept=".pdf,image/*"
></aegov-fileupload>

<aegov-fileupload
  label="Pre-filled application (locked)"
  is-disabled="true"
  accept=".pdf"
></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-fileupload
    label="Identification"
    is-required="true"
    accept=".pdf,image/*"
  ></aegov-fileupload>
  <div class="my-4"></div>
  <aegov-fileupload
    label="Pre-filled application (locked)"
    is-disabled="true"
    accept=".pdf"
  ></aegov-fileupload>
</div>

---

## Custom labels and helper text

Four properties shape the visible text:

- `label`: rendered above the control.
- `description`: subtitle line under the label.
- `label-help`: helper line under the control. Overrides the auto-generated &ldquo;Allowed: …&rdquo; summary.
- `label-button`: replaces the trigger button text.

```html
<aegov-fileupload
  label="Salary certificate"
  description="Upload a stamped certificate from your employer issued within the last 30 days."
  label-help="PDF preferred. Maximum 5 MB."
  label-button="Choose file"
  accept=".pdf,.docx"
  max-file-size="5242880"
></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-fileupload
    label="Salary certificate"
    description="Upload a stamped certificate from your employer issued within the last 30 days."
    label-help="PDF preferred. Maximum 5 MB."
    label-button="Choose file"
    accept=".pdf,.docx"
    max-file-size="5242880"
  ></aegov-fileupload>
</div>

---

## Listening for events

The component emits three custom events. `aegovFileuploadChange` fires after every successful add or remove, `aegovFileuploadRemove` fires only on remove, and `aegovFileuploadError` fires on any validation failure (invalid type, oversized file, or count exceeded).

```html
<aegov-fileupload id="docs" appearance="dropzone" is-multiple="true" accept="image/*,.pdf" max-file-size="5242880"></aegov-fileupload>

<script>
  const docs = document.getElementById('docs');
  docs.addEventListener('aegovFileuploadChange', (e) => {
    console.log('current files', e.detail.files);
  });
  docs.addEventListener('aegovFileuploadRemove', (e) => {
    console.log('removed', e.detail.file.name, 'remaining', e.detail.remaining.length);
  });
  docs.addEventListener('aegovFileuploadError', (e) => {
    console.warn(e.detail.type, e.detail.message);
  });
</script>
```

---

## Programmatic access

Two methods are exposed on the host element. `getFiles()` returns a copy of the current selection; `clear()` empties the selection and resets the underlying native input.

```js
const upload = document.querySelector('aegov-fileupload');
const files = await upload.getFiles();
console.log(files.map(f => f.name));

await upload.clear();
```

---

## Combined Example

A complete supporting-documents step from a service application — a dropzone with multiple files, an explicit type and size limit, a custom helper line, and a required marker.

```html
<aegov-fileupload
  appearance="dropzone"
  label="Application supporting documents"
  description="Attach scans of your Emirates ID, passport bio-data page, and a recent utility bill."
  label-help="PDF or JPG. Maximum 10 MB per file. Up to 5 files."
  is-multiple="true"
  is-required="true"
  max-files="5"
  max-file-size="10485760"
  accept=".pdf,image/jpeg,image/png"
></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-fileupload
    appearance="dropzone"
    label="Application supporting documents"
    description="Attach scans of your Emirates ID, passport bio-data page, and a recent utility bill."
    label-help="PDF or JPG. Maximum 10 MB per file. Up to 5 files."
    is-multiple="true"
    is-required="true"
    max-files="5"
    max-file-size="10485760"
    accept=".pdf,image/jpeg,image/png"
  ></aegov-fileupload>
</div>

---

## RTL Support

The component is direction-agnostic. When the document or any ancestor is set to `dir="rtl"`, the browse button moves to the start (right) edge in the default appearance; the file list, file icon, file name, file size, and remove button all use logical inline properties so the row reads from right to left. The dropzone layout is centered and looks the same in both directions — only its label and helper text flip with the document direction.

```html
<div dir="rtl">
  <aegov-fileupload
    label="رفع الهوية الإماراتية"
    description="يرجى رفع نسخة واضحة من وجهي الهوية بصيغة PDF."
    label-button="اختر ملف"
    accept=".pdf"
    max-file-size="5242880"
  ></aegov-fileupload>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-fileupload
    label="رفع الهوية الإماراتية"
    description="يرجى رفع نسخة واضحة من وجهي الهوية بصيغة PDF."
    label-button="اختر ملف"
    accept=".pdf"
    max-file-size="5242880"
  ></aegov-fileupload>
</div>

The same component as a dropzone with multiple files in RTL:

```html
<div dir="rtl">
  <aegov-fileupload
    appearance="dropzone"
    label="المستندات الداعمة للطلب"
    description="أرفق صوراً ضوئية للهوية الإماراتية وجواز السفر وفاتورة حديثة."
    label-button="استعراض الملفات"
    is-multiple="true"
    max-files="5"
    max-file-size="10485760"
    accept=".pdf,image/*"
  ></aegov-fileupload>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-fileupload
    appearance="dropzone"
    label="المستندات الداعمة للطلب"
    description="أرفق صوراً ضوئية للهوية الإماراتية وجواز السفر وفاتورة حديثة."
    label-button="استعراض الملفات"
    is-multiple="true"
    max-files="5"
    max-file-size="10485760"
    accept=".pdf,image/*"
  ></aegov-fileupload>
</div>

---

## API Reference

### aegov-fileupload Properties

| Property        | Attribute         | Description                                                                  | Type                                       | Default     |
| --------------- | ----------------- | ---------------------------------------------------------------------------- | ------------------------------------------ | ----------- |
| `fieldId`       | `field-id`        | DOM `id` for the inner native `<input type="file">`. Auto-generated.          | `string`                                   | _generated_ |
| `appearance`       | `appearance`         | Layout — `default`, `button`, or `dropzone`.                                  | `'default' \| 'button' \| 'dropzone'`      | `'default'` |
| `size`          | `size`            | Control size token. Accepts a single token or a responsive string.            | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl'`   | `'base'`    |
| `variant`       | `variant`         | Colour family for default ring, button bg, dropzone border, and file-name accent. Focus ring stays camel; error stays aered. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `isMultiple`    | `is-multiple`     | Allow more than one file to be selected.                                      | `boolean`                                  | `false`     |
| `accept`        | `accept`          | Comma-separated list of allowed types (extensions, MIME, or wildcards).       | `string`                                   | `undefined` |
| `maxFileSize`   | `max-file-size`   | Maximum size of a single file in bytes.                                       | `number`                                   | `undefined` |
| `maxFiles`      | `max-files`       | Maximum number of files when `is-multiple` is set.                            | `number`                                   | `undefined` |
| `isDisabled`    | `is-disabled`     | Disables the control. Reflected to the host.                                  | `boolean`                                  | `false`     |
| `isRequired`    | `is-required`     | Marks the field as required and renders a red asterisk on the label.          | `boolean`                                  | `false`     |
| `name`          | `name`            | Form field name applied to the inner native input.                            | `string`                                   | `undefined` |
| `label`         | `label`           | Label text rendered above the control.                                        | `string`                                   | `undefined` |
| `description`   | `description`     | Subtitle line rendered under the label.                                       | `string`                                   | `undefined` |
| `labelHelp`     | `label-help`      | Helper text under the control. Overrides the auto-generated &ldquo;Allowed&rdquo; summary. | `string`                                   | `undefined` |
| `labelButton`   | `label-button`    | Custom text for the trigger / browse button.                                  | `string`                                   | `undefined` |

### Slots

The component does not expose any slots — labels and descriptions are configured through props.

### Events

| Event                     | Detail                                                                                  | Description                                                                                |
| ------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `aegovFileuploadChange`   | `{ files: File[] }`                                                                     | Fires after every successful add or remove. `files` is the full current selection.         |
| `aegovFileuploadRemove`   | `{ file: File; remaining: File[] }`                                                     | Fires when a file is removed via its remove button.                                         |
| `aegovFileuploadError`    | `{ type: 'max-size' \| 'max-files' \| 'invalid-type'; file?: File; message: string }`   | Fires when a file fails type, size, or count validation. The file is not added.            |

### Methods

| Method        | Returns          | Description                                                       |
| ------------- | ---------------- | ----------------------------------------------------------------- |
| `getFiles()`  | `Promise<File[]>` | Resolves with a copy of the currently selected files.             |
| `clear()`     | `Promise<void>`   | Empties the selection and resets the inner native input.          |

### Pass-through Attributes

The component forwards `aria-*` and `data-*` attributes to the inner native `<input type="file">`, plus the explicit list below. All other attributes (including `class` and `style`) stay on the host element.

| Attribute group       | Forwarded to                | Notes                                                                                  |
| --------------------- | --------------------------- | -------------------------------------------------------------------------------------- |
| `aria-*`              | inner `<input type="file">` | Preserves `aria-label`, `aria-describedby`, etc. on the native input.                  |
| `data-*`              | inner `<input type="file">` | Useful for analytics hooks and test selectors.                                         |
| `capture`             | inner `<input type="file">` | `user` or `environment` to prefer a camera on mobile devices.                          |
| `autofocus`           | inner `<input type="file">` | Auto-focus on page load.                                                               |
| `form`                | inner `<input type="file">` | Associates the control with a `<form>` element by id.                                  |
| `tabindex`            | inner `<input type="file">` | Custom tab order.                                                                      |
| `title`               | inner `<input type="file">` | Native browser tooltip.                                                                |
| `webkitdirectory`     | inner `<input type="file">` | Chromium/Webkit-only flag for directory selection.                                     |
| `class`, `style`      | host                        | Stay on the `<aegov-fileupload>` element.                                              |

---

## Validation

`aegov-fileupload` exposes the unified [Validation Surface](validation-overview.html). Fileupload-specific notes:

### FormAssociated

Uses `ElementInternals.setFormValue()` with FormData containing one entry per file (key = `name` prop, value = `File`). Multi-file forms submit cleanly without manual flattening.

> **Renamed:** the `description` prop was renamed to `hint`. CSS class `fileupload__description` → `fileupload__hint`.
>
> **Removed event:** `aegovFileuploadError` was removed in `0.2.0`. Errors now surface through the unified `aegovValidate` event with mapped validity flags:
>
> | Old `error.type` | New `validity` flag |
> | --- | --- |
> | `'max-size'` | `tooLong: true` |
> | `'invalid-type'` | `typeMismatch: true` |
> | `'max-files'` | `customError: true` |

### Common recipes

**Single PDF, max 5 MB:**

```html
<aegov-fileupload
  name="resume"
  is-required
  accept="application/pdf"
  max-file-size="5242880"
  hint="PDF only, up to 5 MB"
></aegov-fileupload>
```

`valueMissing` fires when `is-required` and no file selected. `typeMismatch` fires for non-PDF; `tooLong` fires when over size.

**Multiple images, up to 5:**

```html
<aegov-fileupload
  name="photos"
  appearance="dropzone"
  is-multiple
  accept="image/*"
  max-files="5"
  max-file-size="2097152"
></aegov-fileupload>
```

**Server-side rejection:**

```js
fileupload.addEventListener('aegovFileuploadChange', async (e) => {
  const res = await api.scanFiles(e.detail.files);
  if (!res.ok) {
    await fileupload.setCustomValidity(res.message);
  } else {
    await fileupload.setCustomValidity('');
  }
});
```

See [BYO Validator](validation-byo.html) for more patterns.

---

## Accessibility

### Built-in behaviour

- The control is anchored on a real `<input type="file">`, so it is keyboard-focusable, screen-reader-friendly, and submits with native forms.
- The visible `<label>` is wired via `for` to the inner input's id.
- Helper text is exposed via `aria-describedby="${fieldId}-helper"` when present.
- The button and dropzone appearances render an `aria-hidden`, `tabindex="-1"` file input behind a real `<button>` so keyboard users still trigger the OS picker through the button (Enter / Space).
- Each file in the list has an explicit `aria-label="Remove {filename}"` on its remove button.
- The native input is reset to an empty value after each selection so picking the same file again still triggers `aegovFileuploadChange`.

### Developer responsibilities

- Always provide a meaningful `label` (or external `aegov-label`) so screen readers can announce the purpose of the upload.
- For dropzone use cases, supply a `description` clarifying the supported types and size limits — drag-and-drop is purely a visual enhancement; the button is the accessible fallback.
- Surface validation errors visibly when `aegovFileuploadError` fires. The component does not render an error state on its own.
- Default appearance replaces the entire selection on each pick; button and dropzone appearances accumulate. Use `clear()` to reset programmatically.

### Keyboard support

| Key              | Action                                                                                |
| ---------------- | ------------------------------------------------------------------------------------- |
| `Tab`            | Move focus into the control or to the next file's remove button.                      |
| `Enter`, `Space` | Open the OS file picker when the trigger button is focused.                           |
| `Enter`, `Space` | Activate the focused remove button to remove its file.                                |
| `Shift + Tab`    | Move focus to the previous focusable element.                                         |
