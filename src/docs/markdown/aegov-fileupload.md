# File Upload

<p class="text-lg text-aeblack-500 mb-8">A file upload component that lets users select files from their device via a traditional input, a styled button, or a drag-and-drop zone. Supports validation, multiple files, and file list management.</p>

## Introduction

The `aegov-fileupload` component provides three distinct upload experiences through its **variant** property: a classic styled file input (`default`), a standalone trigger button (`button`), and an interactive drag-and-drop area (`dropzone`). All three variants share the same validation logic, event system, and file list management.

The component supports **3 variants**, **3 sizes**, file type and size validation, multiple file selection, and built-in label/description/helper text.

```html
<aegov-fileupload label="Upload a file"></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-fileupload label="Upload a file"></aegov-fileupload>
</div>

---

## Variants

The `variant` property controls the visual presentation and interaction model. There are three variants available.

### Default

The default variant renders a styled input field with a "Browse" button. Clicking anywhere on the control opens the native file picker. The file name (or count) is displayed inline.

```html
<aegov-fileupload variant="default" label="Attachment"></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-fileupload variant="default" label="Attachment"></aegov-fileupload>
</div>

### Button

The `button` variant hides the native input entirely and presents a styled trigger button. Selected files appear in a list below the button, each with a remove control.

```html
<aegov-fileupload variant="button" label="Upload Documents"></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-fileupload variant="button" label="Upload Documents"></aegov-fileupload>
</div>

### Dropzone

The `dropzone` variant renders a large drag-and-drop area with an upload icon, instructional text, and a browse button. Users can drag files directly onto the zone or click the button. Selected files are listed inside the zone.

```html
<aegov-fileupload variant="dropzone" label="Upload Files"></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-fileupload variant="dropzone" label="Upload Files"></aegov-fileupload>
</div>

---

## Sizes

The `size` property controls the dimensions, font sizes, and padding of all internal elements. It applies consistently across all three variants.

| Size   | Input Height | Font Size | Description |
|--------|-------------|-----------|-------------|
| `sm`   | 40px        | 14px      | Compact layout for dense UIs. |
| `base` | 48px        | 16px      | Default. Balanced for most forms. |
| `lg`   | 52px        | 18px      | Large layout for prominent upload areas. |

```html
<aegov-fileupload size="sm" label="Small"></aegov-fileupload>
<aegov-fileupload size="base" label="Base (default)"></aegov-fileupload>
<aegov-fileupload size="lg" label="Large"></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-4 not-aegov">
  <aegov-fileupload size="sm" label="Small"></aegov-fileupload>
  <aegov-fileupload size="base" label="Base (default)"></aegov-fileupload>
  <aegov-fileupload size="lg" label="Large"></aegov-fileupload>
</div>

### Sizes with Button Variant

```html
<aegov-fileupload variant="button" size="sm" label="Small Button"></aegov-fileupload>
<aegov-fileupload variant="button" size="base" label="Base Button"></aegov-fileupload>
<aegov-fileupload variant="button" size="lg" label="Large Button"></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-4 not-aegov">
  <aegov-fileupload variant="button" size="sm" label="Small Button"></aegov-fileupload>
  <aegov-fileupload variant="button" size="base" label="Base Button"></aegov-fileupload>
  <aegov-fileupload variant="button" size="lg" label="Large Button"></aegov-fileupload>
</div>

### Sizes with Dropzone Variant

```html
<aegov-fileupload variant="dropzone" size="sm" label="Small Dropzone"></aegov-fileupload>
<aegov-fileupload variant="dropzone" size="lg" label="Large Dropzone"></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-4 not-aegov">
  <aegov-fileupload variant="dropzone" size="sm" label="Small Dropzone"></aegov-fileupload>
  <aegov-fileupload variant="dropzone" size="lg" label="Large Dropzone"></aegov-fileupload>
</div>

---

## Accepted File Types

Use the `accept` property to restrict which file types are allowed. The value follows the same format as the native HTML `accept` attribute: comma-separated file extensions (`.pdf`, `.jpg`) or MIME types (`image/*`, `application/pdf`).

When `accept` is set, the component automatically generates helper text listing the allowed types. Invalid files are rejected and an `aegovFileuploadError` event is emitted.

```html
<aegov-fileupload
  accept=".pdf,.doc,.docx"
  label="Documents only">
</aegov-fileupload>

<aegov-fileupload
  accept="image/*"
  label="Images only">
</aegov-fileupload>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-4 not-aegov">
  <aegov-fileupload accept=".pdf,.doc,.docx" label="Documents only"></aegov-fileupload>
  <aegov-fileupload accept="image/*" label="Images only"></aegov-fileupload>
</div>

---

## Multiple Files

Set the `multiple` attribute to allow the user to select more than one file at a time from the native file picker. In the `button` and `dropzone` variants, subsequent selections are accumulated into the list rather than replacing the previous selection.

```html
<aegov-fileupload multiple label="Select multiple files"></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-fileupload multiple label="Select multiple files"></aegov-fileupload>
</div>

### Multiple with Button Variant

```html
<aegov-fileupload variant="button" multiple label="Upload multiple files"></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-fileupload variant="button" multiple label="Upload multiple files"></aegov-fileupload>
</div>

### Multiple with Dropzone Variant

```html
<aegov-fileupload variant="dropzone" multiple label="Drop multiple files here"></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-fileupload variant="dropzone" multiple label="Drop multiple files here"></aegov-fileupload>
</div>

---

## Maximum File Size

The `max-file-size` property sets the maximum allowed size per file, in bytes. Files exceeding this limit are rejected, and an `aegovFileuploadError` event is emitted with `type: 'max-size'`.

The error message includes a human-readable file size (e.g. "5 MB").

```html
<!-- Max 5 MB per file -->
<aegov-fileupload
  max-file-size="5242880"
  label="Max 5 MB per file">
</aegov-fileupload>

<!-- Max 1 MB per file -->
<aegov-fileupload
  variant="dropzone"
  max-file-size="1048576"
  label="Max 1 MB per file"
  multiple>
</aegov-fileupload>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-4 not-aegov">
  <aegov-fileupload max-file-size="5242880" label="Max 5 MB per file"></aegov-fileupload>
  <aegov-fileupload variant="dropzone" max-file-size="1048576" label="Max 1 MB per file" multiple></aegov-fileupload>
</div>

---

## Maximum Number of Files

The `max-files` property limits the total number of files that can be selected. When the limit is reached, additional files are rejected and an `aegovFileuploadError` event is emitted with `type: 'max-files'`.

In the `default` variant, the selection is replaced each time. In the `button` and `dropzone` variants, files accumulate and the limit applies to the total.

```html
<aegov-fileupload
  variant="button"
  multiple
  max-files="3"
  label="Upload up to 3 files">
</aegov-fileupload>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-fileupload variant="button" multiple max-files="3" label="Upload up to 3 files"></aegov-fileupload>
</div>

---

## Disabled State

Set the `disabled` attribute to prevent all interaction. The component becomes visually muted and the native input is disabled.

```html
<aegov-fileupload disabled label="Disabled upload"></aegov-fileupload>
<aegov-fileupload variant="button" disabled label="Disabled button"></aegov-fileupload>
<aegov-fileupload variant="dropzone" disabled label="Disabled dropzone"></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-4 not-aegov">
  <aegov-fileupload disabled label="Disabled upload"></aegov-fileupload>
  <aegov-fileupload variant="button" disabled label="Disabled button"></aegov-fileupload>
  <aegov-fileupload variant="dropzone" disabled label="Disabled dropzone"></aegov-fileupload>
</div>

---

## Required Field

Set the `required` attribute to mark the field as mandatory. A red asterisk appears next to the label, and the native input receives the `required` attribute for browser validation.

```html
<aegov-fileupload required label="Required attachment"></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-fileupload required label="Required attachment"></aegov-fileupload>
</div>

---

## Label, Description, and Helper Text

The component includes built-in support for a label, a description paragraph below the label, and helper text below the control.

- **`label`** — displayed as a `<label>` element above the control.
- **`description`** — supplementary text between the label and the control.
- **`helper-text`** — text below the control. If not provided but `accept` is set, helper text is auto-generated from the accepted types.

```html
<aegov-fileupload
  label="Profile Photo"
  description="Upload a recent photo for your profile. Square images work best."
  helper-text="JPG or PNG, max 2 MB"
  accept=".jpg,.png"
  max-file-size="2097152">
</aegov-fileupload>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-fileupload
    label="Profile Photo"
    description="Upload a recent photo for your profile. Square images work best."
    helper-text="JPG or PNG, max 2 MB"
    accept=".jpg,.png"
    max-file-size="2097152">
  </aegov-fileupload>
</div>

### Auto-Generated Helper Text

When you set `accept` but do not provide `helper-text`, the component automatically generates a descriptive string.

```html
<aegov-fileupload
  label="Upload document"
  accept=".pdf,image/*,.docx">
</aegov-fileupload>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-fileupload label="Upload document" accept=".pdf,image/*,.docx"></aegov-fileupload>
</div>

---

## Custom Button Text

The `button-text` property overrides the default text shown on the browse/trigger button. Default values depend on the variant:

| Variant    | Default Text                          |
|------------|---------------------------------------|
| `default`  | "Browse"                              |
| `button`   | "Choose File" / "Choose Files" (multiple) |
| `dropzone` | "Browse Files"                        |

```html
<aegov-fileupload
  button-text="Select Document"
  label="Custom button text">
</aegov-fileupload>

<aegov-fileupload
  variant="dropzone"
  button-text="Pick from Computer"
  label="Custom dropzone button text">
</aegov-fileupload>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-4 not-aegov">
  <aegov-fileupload button-text="Select Document" label="Custom button text"></aegov-fileupload>
  <aegov-fileupload variant="dropzone" button-text="Pick from Computer" label="Custom dropzone button text"></aegov-fileupload>
</div>

---

## Drag and Drop

The `dropzone` variant supports native drag-and-drop. When files are dragged over the zone, it highlights with a visual cue (border and background colour change). Dropping files processes them through the same validation pipeline as manual selection.

If `multiple` is not set, only the first dropped file is accepted.

```html
<aegov-fileupload
  variant="dropzone"
  multiple
  accept="image/*"
  max-file-size="10485760"
  label="Drag images here"
  description="Drag and drop your images, or click the button below.">
</aegov-fileupload>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-fileupload
    variant="dropzone"
    multiple
    accept="image/*"
    max-file-size="10485760"
    label="Drag images here"
    description="Drag and drop your images, or click the button below.">
  </aegov-fileupload>
</div>

---

## File List and Removal

In the `button` and `dropzone` variants, selected files appear in a list showing the file name, size, and a remove button. Clicking the remove button:

1. Removes the file from the internal list.
2. Emits an `aegovFileuploadRemove` event with the removed file and the remaining files.
3. Emits an `aegovFileuploadChange` event with the updated file list.

The `default` variant does not show a file list — it displays the file name (or count) inline in the input area.

```html
<aegov-fileupload
  variant="button"
  multiple
  label="Files with remove buttons">
</aegov-fileupload>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-fileupload variant="button" multiple label="Files with remove buttons (select files to see the list)"></aegov-fileupload>
</div>

---

## Validation and Error Events

The component performs three types of validation. When a file fails validation, it is excluded from the selection and an `aegovFileuploadError` event is emitted.

| Error Type     | Trigger                                      | Event Detail `type`  |
|---------------|----------------------------------------------|----------------------|
| Invalid type  | File does not match the `accept` filter       | `'invalid-type'`     |
| Size exceeded | File exceeds `maxFileSize` bytes              | `'max-size'`         |
| Max files     | Selection exceeds `maxFiles` limit            | `'max-files'`        |

```html
<aegov-fileupload
  id="validated-upload"
  variant="dropzone"
  multiple
  accept=".pdf,.jpg"
  max-file-size="2097152"
  max-files="3"
  label="Validated upload"
  description="Only PDF and JPG, max 2 MB each, max 3 files.">
</aegov-fileupload>

<pre id="error-log" class="mt-4 p-3 bg-aeblack-100 rounded text-sm max-h-40 overflow-auto"></pre>

<script>
  document.getElementById('validated-upload')
    .addEventListener('aegovFileuploadError', (e) => {
      const log = document.getElementById('error-log');
      log.textContent += JSON.stringify(e.detail, null, 2) + '\n';
    });
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-fileupload
    id="validated-upload"
    variant="dropzone"
    multiple
    accept=".pdf,.jpg"
    max-file-size="2097152"
    max-files="3"
    label="Validated upload"
    description="Only PDF and JPG, max 2 MB each, max 3 files.">
  </aegov-fileupload>
  <pre id="error-log" class="mt-4 p-3 bg-aeblack-100 rounded text-sm max-h-40 overflow-auto font-mono"></pre>
  <script>
    document.getElementById('validated-upload')
      .addEventListener('aegovFileuploadError', function(e) {
        var log = document.getElementById('error-log');
        var msg = e.detail.type + ': ' + e.detail.message;
        log.textContent += msg + '\n';
      });
  </script>
</div>

---

## Public Methods

The component exposes two public methods that can be called programmatically.

### getFiles()

Returns a `Promise<File[]>` containing the currently selected files.

### clear()

Clears all selected files and resets the native input. Returns a `Promise<void>`.

```html
<aegov-fileupload
  id="method-demo"
  variant="button"
  multiple
  label="Method demo">
</aegov-fileupload>

<aegov-button id="clear-btn" variant="outline" size="sm" class="mt-3">Clear Files</aegov-button>
<aegov-button id="get-btn" variant="soft" size="sm" class="mt-3">Get Files</aegov-button>

<script>
  document.getElementById('clear-btn')
    .addEventListener('aegovButtonClick', async () => {
      await document.getElementById('method-demo').clear();
    });

  document.getElementById('get-btn')
    .addEventListener('aegovButtonClick', async () => {
      const files = await document.getElementById('method-demo').getFiles();
      alert('Selected files: ' + files.map(f => f.name).join(', '));
    });
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-fileupload id="method-demo" variant="button" multiple label="Method demo"></aegov-fileupload>
  <div class="flex gap-2 mt-3">
    <aegov-button id="clear-btn" variant="outline" size="sm">Clear Files</aegov-button>
    <aegov-button id="get-btn" variant="soft" size="sm">Get Files</aegov-button>
  </div>
  <script>
    document.getElementById('clear-btn')
      .addEventListener('aegovButtonClick', async function() {
        await document.getElementById('method-demo').clear();
      });
    document.getElementById('get-btn')
      .addEventListener('aegovButtonClick', async function() {
        var files = await document.getElementById('method-demo').getFiles();
        alert('Selected files: ' + (files.length > 0 ? files.map(function(f) { return f.name; }).join(', ') : '(none)'));
      });
  </script>
</div>

---

## Combined Example

A real-world example combining multiple features: dropzone variant, multiple files, file type restriction, size limit, max files, label, description, and custom button text.

```html
<aegov-fileupload
  variant="dropzone"
  multiple
  accept=".pdf,.doc,.docx,.xlsx"
  max-file-size="10485760"
  max-files="5"
  label="Supporting Documents"
  description="Upload your supporting documents for the application."
  helper-text="PDF, DOC, DOCX, or XLSX. Max 10 MB each. Up to 5 files."
  button-text="Browse Documents">
</aegov-fileupload>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-fileupload
    variant="dropzone"
    multiple
    accept=".pdf,.doc,.docx,.xlsx"
    max-file-size="10485760"
    max-files="5"
    label="Supporting Documents"
    description="Upload your supporting documents for the application."
    helper-text="PDF, DOC, DOCX, or XLSX. Max 10 MB each. Up to 5 files."
    button-text="Browse Documents">
  </aegov-fileupload>
</div>

---

## Listening to Events

All three events bubble and can be listened to on the host element.

```html
<aegov-fileupload id="events-demo" variant="button" multiple label="Event demo"></aegov-fileupload>

<script>
  const el = document.getElementById('events-demo');

  el.addEventListener('aegovFileuploadChange', (e) => {
    console.log('Files changed:', e.detail.files);
  });

  el.addEventListener('aegovFileuploadRemove', (e) => {
    console.log('File removed:', e.detail.file.name);
    console.log('Remaining:', e.detail.remaining);
  });

  el.addEventListener('aegovFileuploadError', (e) => {
    console.log('Error:', e.detail.type, e.detail.message);
  });
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-fileupload id="events-demo" variant="button" multiple label="Event demo (open console to see output)"></aegov-fileupload>
  <script>
    var evEl = document.getElementById('events-demo');
    evEl.addEventListener('aegovFileuploadChange', function(e) { console.log('aegovFileuploadChange:', e.detail.files); });
    evEl.addEventListener('aegovFileuploadRemove', function(e) { console.log('aegovFileuploadRemove:', e.detail.file.name, 'remaining:', e.detail.remaining.length); });
    evEl.addEventListener('aegovFileuploadError', function(e) { console.log('aegovFileuploadError:', e.detail.type, e.detail.message); });
  </script>
</div>

---

## RTL Support

The component fully supports right-to-left layouts. When the document or a parent element has `dir="rtl"`, the input layout, button position, file list, and dropzone all mirror automatically.

```html
<div dir="rtl">
  <aegov-fileupload label="رفع الملف" button-text="استعراض"></aegov-fileupload>

  <aegov-fileupload
    variant="dropzone"
    label="منطقة الإفلات"
    button-text="استعراض الملفات"
    multiple>
  </aegov-fileupload>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-4 not-aegov">
  <aegov-fileupload label="رفع الملف" button-text="استعراض"></aegov-fileupload>
  <aegov-fileupload variant="dropzone" label="منطقة الإفلات" button-text="استعراض الملفات" multiple></aegov-fileupload>
</div>

No additional configuration is needed — the component inherits the `dir` attribute and adjusts automatically.

---

## API Reference

### Properties

| Property      | Attribute       | Description                                                                 | Type                                        | Default      |
|---------------|-----------------|-----------------------------------------------------------------------------|---------------------------------------------|--------------|
| `variant`     | `variant`       | The visual style and interaction model                                      | `'default'` \| `'button'` \| `'dropzone'`  | `'default'`  |
| `size`        | `size`          | The component size                                                          | `'sm'` \| `'base'` \| `'lg'`               | `'base'`     |
| `multiple`    | `multiple`      | Allow selecting multiple files                                              | `boolean`                                    | `false`      |
| `accept`      | `accept`        | Accepted file types (e.g. `".pdf,.jpg,image/*"`)                            | `string`                                     | `undefined`  |
| `maxFileSize` | `max-file-size` | Maximum file size in bytes                                                  | `number`                                     | `undefined`  |
| `maxFiles`    | `max-files`     | Maximum number of files allowed                                             | `number`                                     | `undefined`  |
| `disabled`    | `disabled`      | Disables the file upload control                                            | `boolean`                                    | `false`      |
| `required`    | `required`      | Marks the field as required                                                 | `boolean`                                    | `false`      |
| `name`        | `name`          | Form field name for the native input                                        | `string`                                     | `undefined`  |
| `label`       | `label`         | Label text displayed above the control                                      | `string`                                     | `undefined`  |
| `description` | `description`   | Description text displayed below the label                                  | `string`                                     | `undefined`  |
| `helperText`  | `helper-text`   | Custom helper text below the control (overrides auto-generated text)        | `string`                                     | `undefined`  |
| `buttonText`  | `button-text`   | Custom text for the browse/trigger button                                   | `string`                                     | `undefined`  |
| `fieldId`     | `field-id`      | Unique field ID. Auto-generated if not provided.                            | `string`                                     | auto         |

### Events

| Event                    | Description                                                      | Detail Type                                                                |
|--------------------------|------------------------------------------------------------------|----------------------------------------------------------------------------|
| `aegovFileuploadChange`  | Emitted when the file selection changes                          | `{ files: File[] }`                                                        |
| `aegovFileuploadRemove`  | Emitted when a file is removed from the list                     | `{ file: File; remaining: File[] }`                                        |
| `aegovFileuploadError`   | Emitted when a file fails validation                             | `{ type: 'max-size' \| 'max-files' \| 'invalid-type'; file?: File; message: string }` |

### Methods

| Method     | Signature              | Description                          |
|------------|------------------------|--------------------------------------|
| `getFiles` | `getFiles(): Promise<File[]>` | Returns the currently selected files |
| `clear`    | `clear(): Promise<void>`      | Clears all selected files            |

### Slots

This component does not use slots. All content is configured via properties.

---

## Accessibility

The `aegov-fileupload` component includes the following accessibility features out of the box.

### Built-in Features

- **Semantic `<label>` element** — the `label` property renders a native `<label>` element associated with the file input via `for`/`id`, ensuring screen readers announce the field purpose.
- **Required indicator** — when `required` is set, a red asterisk is shown with `aria-hidden="true"` so screen readers rely on the native `required` attribute instead.
- **`aria-describedby`** — the native input is linked to the helper text element (when present) for additional context.
- **Hidden input accessibility** — in the `button` and `dropzone` variants, the native file input is visually hidden with `aria-hidden="true"` and `tabIndex="-1"`. The visible trigger button receives focus instead.
- **Remove button labels** — each file in the list has a remove button with `aria-label="Remove {filename}"` for clear screen reader announcements.
- **Decorative icons** — all SVG icons include `aria-hidden="true"` so they are ignored by assistive technologies.
- **Focus indicators** — visible focus rings on the default input wrapper (via `:has(:focus-visible)`), the trigger button, the dropzone browse button, and all remove buttons.
- **Keyboard navigation** — the default variant's native input, the button variant's trigger button, and all remove buttons are keyboard-focusable and activatable with Enter or Space.

### Developer Responsibilities

1. **Always provide a `label`.** The label associates with the native input and is essential for screen reader users. If you cannot use the built-in label, provide your own `<label>` element with a matching `for` attribute targeting the component's `field-id`.

2. **Communicate file requirements.** Use `description` or `helper-text` to inform users about allowed file types, size limits, and maximum file count before they attempt an upload.

3. **Handle error events.** The component emits validation errors but does not display them visually. Listen to `aegovFileuploadError` and display user-facing error messages in your application.

4. **Do not remove focus styles.** The built-in `focus-visible` outlines are essential for keyboard navigation.

---

## Notes

- The `default` variant replaces the file selection each time the user picks new files. The `button` and `dropzone` variants accumulate files across multiple selections.
- The native file input is always present in the DOM for form submission compatibility, even when visually hidden.
- When `multiple` is not set on the `dropzone` variant, only the first dropped file is processed.
- The `accept` property filters the native file picker dialog and is also enforced by the component's validation logic.
- File sizes are displayed in a human-readable format (B, KB, MB, GB) throughout the file list.
- The component resets the native input value after each selection, which allows the user to re-select the same file if needed.
- The `fieldId` property is auto-generated using a module-level counter if not explicitly provided, ensuring unique IDs when multiple instances exist on the same page.
- The `name` property is passed to the native input for standard form submission workflows.
