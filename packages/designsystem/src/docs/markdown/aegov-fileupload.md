# File Upload

<p class="text-lg text-aeblack-500 mb-8">A File Upload collects documents from the user — passport scans, tenancy contracts, stamped certificates. It ships three appearances from one API, enforces type, size and count limits before anything is sent, and lists what has been chosen so the user can remove a file before submitting.</p>

## Introduction

`aegov-fileupload` wraps a real `<input type="file">` and is a form-associated custom element, so the chosen files submit with the form under one `name`.

```html
<aegov-form-field>
  <aegov-label>Passport copy</aegov-label>
  <aegov-fileupload name="passport" accept=".pdf,.jpg,.png" max-file-size="5242880"></aegov-fileupload>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-form-field>
      <aegov-label>Passport copy</aegov-label>
      <aegov-fileupload field-id="fu-intro" name="passport" accept=".pdf,.jpg,.png" max-file-size="5242880"></aegov-fileupload>
    </aegov-form-field>
  </div>
</div>

Note the helper text under the field. The component generates it from `accept` — you did not have to write "Allowed: PDF, JPG, PNG" yourself.

---

## Appearance

Three renderings, one API.

| Appearance | Look | Use for |
| --- | --- | --- |
| `default` | A styled input with a Browse button. | A single required document in a form. |
| `button` | A trigger button plus a list of chosen files. | Compact layouts and optional attachments. |
| `dropzone` | A large drop target with drag-and-drop, plus a file list. | Multiple documents, and desktop-first flows. |

```html
<aegov-fileupload appearance="default" name="a" accept=".pdf"></aegov-fileupload>
<aegov-fileupload appearance="button" name="b" accept=".pdf"></aegov-fileupload>
<aegov-fileupload appearance="dropzone" name="c" accept=".pdf" is-multiple></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-8">
    <div><p class="text-sm text-aeblack-500 mb-2">default</p><aegov-fileupload field-id="fu-ap-1" name="fu-a" accept=".pdf,.jpg"></aegov-fileupload></div>
    <div><p class="text-sm text-aeblack-500 mb-2">button</p><aegov-fileupload field-id="fu-ap-2" appearance="button" name="fu-b" accept=".pdf,.jpg"></aegov-fileupload></div>
    <div><p class="text-sm text-aeblack-500 mb-2">dropzone</p><aegov-fileupload field-id="fu-ap-3" appearance="dropzone" name="fu-c" accept=".pdf,.jpg" is-multiple></aegov-fileupload></div>
  </div>
</div>

The appearances differ in one behaviour that matters: **`default` replaces the selection each time**, matching how a native file input works, while **`button` and `dropzone` accumulate** files across selections. Choose accordingly — accumulation is what you want for "attach supporting documents", replacement is what you want for "upload your passport".

A dropzone still opens the file picker on click, so it never depends on drag-and-drop alone.

---

## Multiple files

`is-multiple` allows more than one file per selection.

```html
<aegov-fileupload
  appearance="dropzone"
  name="documents"
  is-multiple
  accept=".pdf,.jpg,.png"
  max-files="5"
  max-file-size="5242880"
></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-fileupload field-id="fu-multi" appearance="dropzone" name="documents" is-multiple accept=".pdf,.jpg,.png" max-files="5" max-file-size="5242880"></aegov-fileupload>
  </div>
</div>

Each chosen file appears in a list with its name, size and a remove button. Removing a file emits `aegovFileuploadRemove` with both the removed file and the remaining set.

---

## Limits

Three limits, all enforced client-side before anything is sent.

| Property | Limits | Validity flag when exceeded |
| --- | --- | --- |
| `accept` | File types, using the same syntax as the native attribute. | `typeMismatch` |
| `maxFileSize` | Size **per file**, in bytes. | `tooLong` |
| `maxFiles` | Total number of files. | `customError` |

```html
<aegov-fileupload
  name="documents"
  is-multiple
  accept=".pdf,.jpg,.png"
  max-file-size="2097152"
  max-files="3"
></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-8">
    <div>
      <p class="text-sm text-aeblack-500 mb-2">accept=".pdf,.jpg,.png" · max 2 MB per file · max 3 files</p>
      <aegov-fileupload field-id="fu-lim-1" appearance="dropzone" name="fu-lim" is-multiple accept=".pdf,.jpg,.png" max-file-size="2097152" max-files="3"></aegov-fileupload>
    </div>
    <div>
      <p class="text-sm text-aeblack-500 mb-2">accept="image/*"</p>
      <aegov-fileupload field-id="fu-lim-2" name="fu-img" accept="image/*"></aegov-fileupload>
    </div>
  </div>
</div>

`maxFileSize` is in **bytes**, so 5 MB is `5242880`. The component formats it for display using localised size units, so you do not need to write "5 MB" anywhere.

Client-side limits are a usability feature, not a security control. Always enforce the same rules on the server.

Note that these limits no longer emit a separate error event. If you are migrating from an earlier version, `aegovFileuploadError` has been removed — the failures now arrive through the unified `aegovValidate` event with the flag shown in the table above. See [Validation](#validation).

---

## Auto-generated helper text

The component derives helper text from `accept` — ".pdf,.jpg" becomes "Allowed: PDF, JPG", and `image/*` becomes "Allowed: Images". Override it with `label-help` when you need to say something more specific.

```html
<aegov-fileupload name="a" accept=".pdf,.jpg"></aegov-fileupload>

<aegov-fileupload
  name="b"
  accept=".pdf"
  label-help="Stamped PDF from your employer, issued within the last 30 days"
></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-6">
    <aegov-fileupload field-id="fu-help-1" name="fu-h1" accept=".pdf,.jpg"></aegov-fileupload>
    <aegov-fileupload field-id="fu-help-2" name="fu-h2" accept=".pdf" label-help="Stamped PDF from your employer, issued within the last 30 days"></aegov-fileupload>
  </div>
</div>

`label-help` replaces the generated text; `hint` adds guidance in the standard hint region shared with every other form control. Use `hint` for the instruction and `label-help` for the constraint.

---

## Labels

Three label properties, each with a distinct job:

| Property | Renders |
| --- | --- |
| `label` | The field's own label, above the control. Appends a required asterisk when `is-required`. |
| `labelButton` | The text on the Browse or Choose button. |
| `labelHelp` | The constraint line, overriding the generated one. |

```html
<aegov-fileupload
  name="contract"
  label="Tenancy contract"
  label-button="Choose PDF"
  label-help="Attested contract, PDF only"
  accept=".pdf"
  is-required
></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-fileupload field-id="fu-labels" name="contract" label="Tenancy contract" label-button="Choose PDF" label-help="Attested contract, PDF only" accept=".pdf" is-required></aegov-fileupload>
  </div>
</div>

Use either `label` on the component or an [`aegov-label`](aegov-label.html) inside an [`aegov-form-field`](aegov-form-field.html) — not both, or the field is announced twice.

---

## Sizes

Five tokens, scaling the control, the button and the file list.

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-6">
    <aegov-fileupload field-id="fu-s-xs" size="xs" name="fu-sxs" accept=".pdf"></aegov-fileupload>
    <aegov-fileupload field-id="fu-s-sm" size="sm" name="fu-ssm" accept=".pdf"></aegov-fileupload>
    <aegov-fileupload field-id="fu-s-base" size="base" name="fu-sb" accept=".pdf"></aegov-fileupload>
    <aegov-fileupload field-id="fu-s-lg" size="lg" name="fu-slg" accept=".pdf"></aegov-fileupload>
    <aegov-fileupload field-id="fu-s-xl" size="xl" name="fu-sxl" accept=".pdf"></aegov-fileupload>
  </div>
</div>

### Responsive sizes

`size` accepts a responsive string with the prefixes `xs`, `sm`, `md`, `lg`, `xl` and `2xl`.

```html
<aegov-fileupload size="sm md:base" name="a" accept=".pdf"></aegov-fileupload>
```

---

## States

```html
<aegov-fileupload is-disabled name="a" accept=".pdf"></aegov-fileupload>
<aegov-fileupload is-required name="b" accept=".pdf" label="Passport copy"></aegov-fileupload>
<aegov-fileupload is-invalid error-message="Upload your passport copy to continue" name="c"></aegov-fileupload>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-6">
    <aegov-fileupload field-id="fu-st-1" is-disabled name="fu-st1" accept=".pdf" label="Disabled"></aegov-fileupload>
    <aegov-fileupload field-id="fu-st-2" is-required name="fu-st2" accept=".pdf" label="Passport copy"></aegov-fileupload>
    <aegov-fileupload field-id="fu-st-3" is-invalid error-message="Upload your passport copy to continue" name="fu-st3" accept=".pdf" label="Passport copy"></aegov-fileupload>
    <aegov-fileupload field-id="fu-st-4" variant="secondary" name="fu-st4" accept=".pdf" label="Secondary variant"></aegov-fileupload>
  </div>
</div>

---

## Composite example — supporting documents

```html
<form id="documents" novalidate>
  <aegov-form-field>
    <aegov-label>Passport copy</aegov-label>
    <aegov-fileupload
      name="passport"
      is-required
      accept=".pdf,.jpg,.png"
      max-file-size="5242880"
      hint="Full-page scan of both sides as a single file"
    ></aegov-fileupload>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>Emirates ID copy</aegov-label>
    <aegov-fileupload
      name="emiratesId"
      is-required
      accept=".pdf,.jpg,.png"
      max-file-size="5242880"
    ></aegov-fileupload>
  </aegov-form-field>

  <aegov-form-field>
    <aegov-label>Supporting documents</aegov-label>
    <aegov-fileupload
      id="supporting"
      appearance="dropzone"
      name="supporting"
      is-multiple
      accept=".pdf,.jpg,.png"
      max-files="5"
      max-file-size="5242880"
      hint="Anything else that supports your application"
    ></aegov-fileupload>
  </aegov-form-field>

  <aegov-button type="submit" variant="primary" size="lg">Submit documents</aegov-button>
</form>

<script type="module">
  const form = document.querySelector('#documents');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const uploads = [...form.querySelectorAll('aegov-fileupload')];
    const results = await Promise.all(uploads.map((u) => u.validate('submit')));
    const badIndex = results.findIndex((r) => !r.valid);

    if (badIndex !== -1) return uploads[badIndex].focus();

    // FormData carries one entry per file, all under the field's name
    await api.uploadDocuments(new FormData(form));
  });
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-6">
    <aegov-form-field>
      <aegov-label>Passport copy</aegov-label>
      <aegov-fileupload field-id="fu-cx-1" name="passport" is-required accept=".pdf,.jpg,.png" max-file-size="5242880" hint="Full-page scan of both sides as a single file"></aegov-fileupload>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>Emirates ID copy</aegov-label>
      <aegov-fileupload field-id="fu-cx-2" name="emiratesId" is-required accept=".pdf,.jpg,.png" max-file-size="5242880"></aegov-fileupload>
    </aegov-form-field>
    <aegov-form-field>
      <aegov-label>Supporting documents</aegov-label>
      <aegov-fileupload field-id="fu-cx-3" appearance="dropzone" name="supporting" is-multiple accept=".pdf,.jpg,.png" max-files="5" max-file-size="5242880" hint="Anything else that supports your application"></aegov-fileupload>
    </aegov-form-field>
    <aegov-button type="submit" variant="primary" size="lg">Submit documents</aegov-button>
  </div>
</div>

---

## Listening for events

```html
<aegov-fileupload id="docs" name="documents" is-multiple max-files="5"></aegov-fileupload>

<script type="module">
  const upload = document.querySelector('#docs');

  upload.addEventListener('aegovFileuploadChange', (e) => {
    console.log(e.detail.files);                    // File[]
    counter.textContent = `${e.detail.files.length} of 5 files`;
  });

  upload.addEventListener('aegovFileuploadRemove', (e) => {
    console.log(e.detail.file.name, e.detail.remaining.length);
  });

  // Limit failures arrive here, not on a separate error event
  upload.addEventListener('aegovValidate', (e) => {
    const v = e.detail.validity;
    if (v.typeMismatch) showToast('That file type is not accepted', 'error');
    if (v.tooLong)      showToast('That file is too large', 'error');
    if (v.customError)  showToast('Too many files', 'error');
  });
</script>
```

You can also read the current selection imperatively:

```js
const files = await upload.getFiles();
await upload.clear();
```

---

## RTL Support

The component is fully direction-aware, and it is the most thoroughly translated control in the library. In a `dir="rtl"` container the layout mirrors — the Browse button, the file icons, the remove buttons and the dropzone content all flip — and **every piece of built-in text switches to Arabic automatically**:

| Text | English | Arabic |
| --- | --- | --- |
| Empty state | "No file chosen" | "لم يتم اختيار ملف" |
| Multiple selection | "3 files selected" | "تم اختيار ٣ ملفات" |
| Generated constraint | "Allowed: PDF, JPG" | "المسموح به: PDF, JPG" |
| Browse button | "Browse" / "Choose File" | translated equivalents |
| Dropzone prompt | "Drag and drop files here, or" | translated equivalent |
| Remove button label | "Remove {filename}" | "إزالة {filename}" |
| Required marker | "Required" | "مطلوب" |
| Limit errors | "File … exceeds the maximum size of 5 MB." | "الملف … يتجاوز الحجم الأقصى ٥ ميجابايت." |

```html
<div dir="rtl">
  <aegov-form-field>
    <aegov-label>صورة جواز السفر</aegov-label>
    <aegov-fileupload
      name="passport"
      is-required
      accept=".pdf,.jpg,.png"
      max-file-size="5242880"
      hint="مسح كامل لكلا الوجهين في ملف واحد"
    ></aegov-fileupload>
  </aegov-form-field>

  <aegov-fileupload appearance="dropzone" name="supporting" is-multiple accept=".pdf,.jpg" max-files="5"></aegov-fileupload>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md space-y-6">
    <aegov-form-field>
      <aegov-label>صورة جواز السفر</aegov-label>
      <aegov-fileupload field-id="fu-rtl-1" name="passport" is-required accept=".pdf,.jpg,.png" max-file-size="5242880" hint="مسح كامل لكلا الوجهين في ملف واحد"></aegov-fileupload>
    </aegov-form-field>
    <aegov-fileupload field-id="fu-rtl-2" appearance="dropzone" name="supporting" is-multiple accept=".pdf,.jpg" max-files="5"></aegov-fileupload>
    <aegov-fileupload field-id="fu-rtl-3" appearance="button" name="other" accept=".pdf" is-invalid error-message="يجب إرفاق صورة جواز السفر للمتابعة"></aegov-fileupload>
  </div>
</div>

File **names** are not translated, obviously — and a name in Latin script inside an Arabic list is normal and correct. The component does not force a direction on them.

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the inner `<input>`. Auto-generated when omitted, reflected. | `string` | _generated_ |
| `appearance` | `appearance` | Rendering mode. `default` replaces the selection; `button` and `dropzone` accumulate. | `'default' \| 'button' \| 'dropzone'` | `'default'` |
| `size` | `size` | Size token or responsive string. | `string` — `xs \| sm \| base \| lg \| xl` | `'base'` |
| `variant` | `variant` | Colour family. | `'primary' \| 'secondary' \| 'neutral-max' \| 'neutral-min'` | `'primary'` |
| `name` | `name` | Form field name. All files submit under this one name. | `string` | — |
| `isMultiple` | `is-multiple` | Allow more than one file. | `boolean` | `false` |
| `accept` | `accept` | Allowed types, native `accept` syntax. Also drives the generated helper text. | `string` | — |
| `maxFileSize` | `max-file-size` | Maximum size **per file, in bytes**. | `number` | — |
| `maxFiles` | `max-files` | Maximum number of files. | `number` | — |
| `label` | `label` | The field's own label. Appends a required asterisk when `is-required`. | `string` | — |
| `labelButton` | `label-button` | Text on the Browse button. | `string` | — |
| `labelHelp` | `label-help` | Constraint line, overriding the text generated from `accept`. | `string` | — |
| `hint` | `hint` | Helper text in the standard hint region. | `string` | — |
| `isDisabled` | `is-disabled` | Disables the control. Reflected. | `boolean` | `false` |
| `isRequired` | `is-required` | Marks the field required. | `boolean` | `false` |
| `isInvalid` | `is-invalid` | Invalid state. Mutable and reflected. | `boolean` | `false` |
| `errorMessage` | `error-message` | Error text shown while invalid. | `string` | `''` |

### Slots

| Slot | Description |
| --- | --- |
| `hint` | Rich hint markup. Takes precedence over the `hint` property. |
| `error` | Rich error markup. Rendered only while `is-invalid`. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovFileuploadChange` | `{ files: File[] }` | The selection changed. Carries the full current set, not just the new files. |
| `aegovFileuploadRemove` | `{ file: File; remaining: File[] }` | A file was removed from the list. |
| `aegovValidate` | `AegovValidationDetail<File[]>` | Unified validation event — see [Validation](#validation). |

There is no `aegovFileuploadError` event. Limit failures arrive through `aegovValidate`.

### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `getFiles()` | `Promise<File[]>` | The current selection. |
| `clear()` | `Promise<void>` | Removes every file, resets the inner input, and re-runs validation. |
| `validate(trigger?)` | `Promise<AegovValidationResult>` | Re-runs validation and emits `aegovValidate`. |
| `setCustomValidity(message)` | `Promise<void>` | Sets `error-message` and `is-invalid`, and writes the validity through `ElementInternals`. Empty string clears. |

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `capture` | Yes | Native camera capture hint on mobile. |
| `webkitdirectory` | Yes | Directory selection, where supported. |
| `autofocus`, `form`, `tabindex`, `title` | Yes | Forwarded to the inner `<input>`. |
| `aria-*` | Yes | Forwarded — except `aria-invalid` and `aria-describedby`. |
| `data-*` | Yes | Forwarded to the inner `<input>`. |
| `aria-invalid`, `aria-describedby` | Managed | Owned by the component; `aria-describedby` composes your value with the hint, help and error IDs. |
| `accept`, `multiple` | n/a | Use the `accept` and `is-multiple` properties. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host. |

### CSS classes

| Class | Element |
| --- | --- |
| `.aegov-fileupload` | The component wrapper. |
| `.fileupload__file-list` | The list of chosen files. `role="list"`. |
| `.fileupload__file-icon` | Per-file icon. Marked `aria-hidden`. |
| `.fileupload__drop-icon` | Dropzone icon. Marked `aria-hidden`. |
| `.fileupload__required` | The asterisk added by `is-required`. Marked `aria-hidden`. |
| `.is-invalid` | Added to the **host** while `is-invalid`. |

---

## Validation

### Surface

`aegov-fileupload` implements the shared contract, reporting a `File[]` value. It is a **form-associated custom element** using `ElementInternals.setFormValue()`, appending one `FormData` entry per file under the field's `name`. This is why Safari 16.4 is the support floor. Full reference: [Validation Surface](validation-overview.html).

```js
new FormData(form).getAll('documents');   // [File, File, File]
```

### Validity flags

The three limits map onto standard flags, which is how they replaced the old dedicated error event:

| Flag | Set when |
| --- | --- |
| `valueMissing` | `is-required` and nothing has been chosen. |
| `typeMismatch` | A file's type is not permitted by `accept`. |
| `tooLong` | A file exceeds `maxFileSize`. |
| `customError` | More files than `maxFiles`, or a message set via `setCustomValidity()`. |

Note `tooLong` for an oversized file is a deliberate reuse of an existing flag rather than an invented one — it keeps `detail.validity` a genuine `ValidityState` shape that generic form code can consume.

### Common recipes

Surface limit failures as messages of your own:

```js
upload.addEventListener('aegovValidate', (e) => {
  const v = e.detail.validity;

  upload.isInvalid = !v.valid;
  upload.errorMessage =
    v.valueMissing ? 'Upload your passport copy to continue' :
    v.typeMismatch ? 'Only PDF, JPG and PNG files are accepted' :
    v.tooLong      ? 'Each file must be 5 MB or smaller' :
    v.customError  ? 'Upload no more than 5 files' : '';
});
```

A rule the component cannot know — total size across all files:

```js
upload.addEventListener('aegovFileuploadChange', async (e) => {
  const total = e.detail.files.reduce((sum, f) => sum + f.size, 0);
  const ok = total <= 20 * 1024 * 1024;
  await upload.setCustomValidity(ok ? '' : 'Your documents total more than 20 MB');
});
```

A server-side rejection after upload:

```js
try {
  await api.uploadDocuments(new FormData(form));
} catch (err) {
  await upload.setCustomValidity(err.message || 'We could not accept those documents');
}
```

More patterns in [Bring Your Own Validator](validation-byo.html).

### Use with `@aegov/designsystem-validation`

The **optional** companion package drives this surface from a schema.

```ts
import { createForm } from '@aegov/designsystem-validation';
import { valibotAdapter } from '@aegov/designsystem-validation/adapters/valibot';
import * as v from 'valibot';

createForm(form, v.object({
  passport: v.pipe(v.array(v.instance(File)), v.minLength(1, 'Upload your passport copy')),
}), valibotAdapter());
```

---

## Accessibility

### Built-in behaviour

- The control is built on a real `<input type="file">`, so the file picker, keyboard activation and platform integration come from the browser.
- The dropzone opens the picker on click and keyboard activation as well as accepting a drop, so drag-and-drop is never the only route — which is essential, since dragging is unavailable to many keyboard, screen reader and motor-impaired users.
- The file list is a real `role="list"`, and each remove button is a real `<button>` whose `aria-label` names the file it removes — "Remove passport-scan.pdf", not a generic "Remove".
- All decorative icons — file icons, the dropzone icon, the required asterisk — are marked `aria-hidden="true"`.
- `aria-describedby` is composed, preserving your own value alongside the hint, the generated help text and the error region.
- **Every built-in string is localised**, including limit error messages, size units and the required marker — see [RTL Support](#rtl-support).
- Helper text is generated from `accept`, so the permitted types are stated to the user rather than discovered by trial and error.
- The error region takes `role="alert"` only after first blur.
- The focus ring is a high-contrast camel outline held constant across variants, meeting the 3:1 requirement of WCAG 2.2 SC 1.4.11.

### Developer responsibilities

- **Always label the field**, using either the `label` property or an [`aegov-label`](aegov-label.html) in a [form field](aegov-form-field.html) — not both.
- **State what document you want, and in what form.** "Passport copy" is not enough; "Full-page scan of both sides as a single file" is.
- **Set `accept` and `maxFileSize`.** Without them the user discovers the rules by failing, and your server bears uploads it will reject.
- **Enforce every limit on the server too.** Client-side checks are usability, not security.
- **Announce upload progress and completion yourself.** The component manages selection, not transfer — use a [Progress](aegov-progress.html) bar in a live region, and a [Toast](aegov-toast.html) on success.
- **Never signal an error with colour alone** (WCAG 2.2 SC 1.4.1) — populate `error-message`, or map the validity flags to messages as shown above.
- **Choose the appearance for the job.** `default` replaces, `button` and `dropzone` accumulate; picking the wrong one produces a genuinely confusing field.
- **Do not rely on `dropzone` for mobile.** Drag-and-drop does not exist there; the picker is the real interaction.
- **Say what the file will be used for** when uploading identity documents. This is a privacy expectation in government services, not just good copy.

### Keyboard support

| Key | Action |
| --- | --- |
| `Tab` | Move focus to the control, then through each file's remove button. |
| `Enter`, `Space` | Open the file picker when the control or Browse button has focus. |
| `Enter`, `Space` | Remove a file when its remove button has focus. |

---

## Where to next

- [Progress](aegov-progress.html) — for reporting upload progress.
- [Toast](aegov-toast.html) — for confirming a successful upload.
- [Form Field](aegov-form-field.html) and [Label](aegov-label.html) — the wrapper and label.
- [Callout](aegov-callout.html) — for explaining document requirements above a form.
- [Validation Surface](validation-overview.html) and [Bring Your Own Validator](validation-byo.html).
