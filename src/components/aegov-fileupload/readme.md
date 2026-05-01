# aegov-fileupload



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute       | Description                                                                                                                     | Type                                  | Default     |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ----------- |
| `accept`      | `accept`        | Accepted file types (e.g. ".pdf,.jpg,image/*").                                                                                 | `string`                              | `undefined` |
| `description` | `description`   | Description text displayed below the label.                                                                                     | `string`                              | `undefined` |
| `fieldId`     | `field-id`      | Unique field ID. Auto-generated if not provided.                                                                                | `string`                              | `undefined` |
| `isDisabled`  | `is-disabled`   | Disables the file upload.                                                                                                       | `boolean`                             | `false`     |
| `isMultiple`  | `is-multiple`   | Allow multiple file selection.                                                                                                  | `boolean`                             | `false`     |
| `isRequired`  | `is-required`   | Marks the field as required.                                                                                                    | `boolean`                             | `false`     |
| `label`       | `label`         | Label text displayed above the control.                                                                                         | `string`                              | `undefined` |
| `labelButton` | `label-button`  | Custom text for the browse/trigger button.                                                                                      | `string`                              | `undefined` |
| `labelHelp`   | `label-help`    | Custom helper text for allowed file types. Overrides auto-generated text from `accept`.                                         | `string`                              | `undefined` |
| `maxFileSize` | `max-file-size` | Maximum file size in bytes.                                                                                                     | `number`                              | `undefined` |
| `maxFiles`    | `max-files`     | Maximum number of files (multiple mode only). No limit by default.                                                              | `number`                              | `undefined` |
| `name`        | `name`          | Form field name.                                                                                                                | `string`                              | `undefined` |
| `size`        | `size`          | Component size.                                                                                                                 | `string`                              | `'base'`    |
| `variant`     | `variant`       | Variant style: 'default' (styled input + button), 'button' (hidden input, label-as-button), or 'dropzone' (drag-and-drop area). | `"button" \| "default" \| "dropzone"` | `'default'` |


## Events

| Event                   | Description                                                                                | Type                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `aegovFileuploadChange` | Emitted when the file selection changes.                                                   | `CustomEvent<{ files: File[]; }>`                                                                   |
| `aegovFileuploadError`  | Emitted when a file fails validation (invalid type, size exceeded, or max files exceeded). | `CustomEvent<{ type: "max-size" \| "max-files" \| "invalid-type"; file?: File; message: string; }>` |
| `aegovFileuploadRemove` | Emitted when a file is removed from the list (button/dropzone variants).                   | `CustomEvent<{ file: File; remaining: File[]; }>`                                                   |


## Methods

### `clear() => Promise<void>`

Clears all selected files.

#### Returns

Type: `Promise<void>`



### `getFiles() => Promise<File[]>`

Returns the currently selected files.

#### Returns

Type: `Promise<File[]>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
