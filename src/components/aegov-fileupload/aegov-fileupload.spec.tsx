import { newSpecPage } from '@stencil/core/testing';
import { AegovFileupload } from './aegov-fileupload';

describe('aegov-fileupload', () => {
  // --- Rendering ---

  it('renders default variant', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload></aegov-fileupload>`,
    });
    const root = page.root;
    expect(root).toBeTruthy();
    const wrapper = root.querySelector('.aegov-fileupload');
    expect(wrapper).toHaveClass('fileupload--default');
    expect(wrapper).toHaveClass('fileupload--base');
    expect(root.querySelector('.fileupload__input-wrapper')).toBeTruthy();
    expect(root.querySelector('.fileupload__native-input')).toBeTruthy();
  });

  it('renders button variant', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload variant="button"></aegov-fileupload>`,
    });
    const root = page.root;
    const wrapper = root.querySelector('.aegov-fileupload');
    expect(wrapper).toHaveClass('fileupload--button');
    expect(root.querySelector('.fileupload__trigger-btn')).toBeTruthy();
    expect(root.querySelector('.fileupload__hidden-input')).toBeTruthy();
  });

  it('renders dropzone variant', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload variant="dropzone"></aegov-fileupload>`,
    });
    const root = page.root;
    const wrapper = root.querySelector('.aegov-fileupload');
    expect(wrapper).toHaveClass('fileupload--dropzone');
    expect(root.querySelector('.fileupload__dropzone')).toBeTruthy();
    expect(root.querySelector('.fileupload__drop-icon')).toBeTruthy();
    expect(root.querySelector('.fileupload__dropzone-btn')).toBeTruthy();
  });

  // --- Sizes ---

  it('applies sm size class', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload size="sm"></aegov-fileupload>`,
    });
    expect(page.root.querySelector('.aegov-fileupload')).toHaveClass('fileupload--sm');
  });

  it('applies lg size class', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload size="lg"></aegov-fileupload>`,
    });
    expect(page.root.querySelector('.aegov-fileupload')).toHaveClass('fileupload--lg');
  });

  // --- Props ---

  it('auto-generates field ID', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload></aegov-fileupload>`,
    });
    const input = page.root.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.id).toMatch(/^aegov-fileupload-\d+$/);
  });

  it('uses custom field ID', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload field-id="my-upload"></aegov-fileupload>`,
    });
    const input = page.root.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.id).toBe('my-upload');
  });

  it('passes accept attribute to native input', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload accept=".pdf,.jpg"></aegov-fileupload>`,
    });
    const input = page.root.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.getAttribute('accept')).toBe('.pdf,.jpg');
  });

  it('passes multiple attribute to native input', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload multiple></aegov-fileupload>`,
    });
    const input = page.root.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.multiple).toBe(true);
  });

  it('passes disabled state', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload disabled></aegov-fileupload>`,
    });
    const input = page.root.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(page.root.querySelector('.aegov-fileupload')).toHaveClass('fileupload--disabled');
  });

  it('passes name attribute', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload name="avatar"></aegov-fileupload>`,
    });
    const input = page.root.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.name).toBe('avatar');
  });

  it('passes required attribute', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload required></aegov-fileupload>`,
    });
    const input = page.root.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.required).toBe(true);
  });

  // --- Label, description, helper ---

  it('renders label', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload label="Upload photo"></aegov-fileupload>`,
    });
    const label = page.root.querySelector('.fileupload__label');
    expect(label).toBeTruthy();
    expect(label.textContent).toContain('Upload photo');
  });

  it('renders required asterisk on label', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload label="File" required></aegov-fileupload>`,
    });
    const asterisk = page.root.querySelector('.fileupload__required');
    expect(asterisk).toBeTruthy();
  });

  it('renders description', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload description="Max 5MB per file"></aegov-fileupload>`,
    });
    const desc = page.root.querySelector('.fileupload__description');
    expect(desc).toBeTruthy();
    expect(desc.textContent).toBe('Max 5MB per file');
  });

  it('auto-generates helper text from accept', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload accept=".pdf,.jpg,.png"></aegov-fileupload>`,
    });
    const helper = page.root.querySelector('.fileupload__helper');
    expect(helper).toBeTruthy();
    expect(helper.textContent).toBe('Allowed: PDF, JPG, PNG');
  });

  it('auto-generates helper text from MIME wildcard', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload accept="image/*"></aegov-fileupload>`,
    });
    const helper = page.root.querySelector('.fileupload__helper');
    expect(helper.textContent).toBe('Allowed: Images');
  });

  it('uses custom helper text over auto-generated', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload accept=".pdf" helper-text="Only PDF files are accepted"></aegov-fileupload>`,
    });
    const helper = page.root.querySelector('.fileupload__helper');
    expect(helper.textContent).toBe('Only PDF files are accepted');
  });

  it('does not render helper if no accept and no helperText', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload></aegov-fileupload>`,
    });
    expect(page.root.querySelector('.fileupload__helper')).toBeNull();
  });

  // --- Button text ---

  it('shows "Browse" for default variant', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload></aegov-fileupload>`,
    });
    expect(page.root.querySelector('.fileupload__browse-btn').textContent).toBe('Browse');
  });

  it('shows "Choose File" for button variant single', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload variant="button"></aegov-fileupload>`,
    });
    expect(page.root.querySelector('.fileupload__trigger-btn').textContent).toContain('Choose File');
  });

  it('shows "Choose Files" for button variant multiple', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload variant="button" multiple></aegov-fileupload>`,
    });
    expect(page.root.querySelector('.fileupload__trigger-btn').textContent).toContain('Choose Files');
  });

  it('shows "Browse Files" for dropzone variant', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload variant="dropzone"></aegov-fileupload>`,
    });
    expect(page.root.querySelector('.fileupload__dropzone-btn').textContent).toBe('Browse Files');
  });

  it('uses custom button text', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload button-text="Select"></aegov-fileupload>`,
    });
    expect(page.root.querySelector('.fileupload__browse-btn').textContent).toBe('Select');
  });

  // --- Default display ---

  it('shows "No file chosen" initially', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload></aegov-fileupload>`,
    });
    const filename = page.root.querySelector('.fileupload__filename');
    expect(filename.textContent).toBe('No file chosen');
    expect(filename).toHaveClass('fileupload__filename--empty');
  });

  // --- Dropzone text ---

  it('shows singular text when not multiple in dropzone', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload variant="dropzone"></aegov-fileupload>`,
    });
    const text = page.root.querySelector('.fileupload__drop-text');
    expect(text.textContent).toContain('a file');
  });

  it('shows plural text when multiple in dropzone', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload variant="dropzone" multiple></aegov-fileupload>`,
    });
    const text = page.root.querySelector('.fileupload__drop-text');
    expect(text.textContent).toContain('files');
  });

  // --- Methods ---

  it('clear() empties selection', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload variant="button"></aegov-fileupload>`,
    });
    const el = page.rootInstance as AegovFileupload;
    // Manually set state
    el['selectedFiles'] = [new File(['x'], 'test.txt')];
    await page.waitForChanges();
    expect(page.root.querySelector('.fileupload__file-list')).toBeTruthy();

    await el.clear();
    await page.waitForChanges();
    expect(page.root.querySelector('.fileupload__file-list')).toBeNull();
  });

  it('getFiles() returns current selection', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload></aegov-fileupload>`,
    });
    const el = page.rootInstance as AegovFileupload;
    const file = new File(['x'], 'test.txt');
    el['selectedFiles'] = [file];
    const files = await el.getFiles();
    expect(files).toHaveLength(1);
    expect(files[0].name).toBe('test.txt');
  });

  // --- File validation ---

  it('validates file extension', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload accept=".pdf"></aegov-fileupload>`,
    });
    const el = page.rootInstance as AegovFileupload;
    const pdfFile = new File(['x'], 'doc.pdf', { type: 'application/pdf' });
    const txtFile = new File(['x'], 'doc.txt', { type: 'text/plain' });
    expect(el['isValidFileType'](pdfFile)).toBe(true);
    expect(el['isValidFileType'](txtFile)).toBe(false);
  });

  it('validates MIME wildcard', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload accept="image/*"></aegov-fileupload>`,
    });
    const el = page.rootInstance as AegovFileupload;
    const imgFile = new File(['x'], 'photo.jpg', { type: 'image/jpeg' });
    const pdfFile = new File(['x'], 'doc.pdf', { type: 'application/pdf' });
    expect(el['isValidFileType'](imgFile)).toBe(true);
    expect(el['isValidFileType'](pdfFile)).toBe(false);
  });

  it('validates exact MIME type', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload accept="application/pdf"></aegov-fileupload>`,
    });
    const el = page.rootInstance as AegovFileupload;
    const pdfFile = new File(['x'], 'doc.pdf', { type: 'application/pdf' });
    expect(el['isValidFileType'](pdfFile)).toBe(true);
  });

  it('allows any file when no accept', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload></aegov-fileupload>`,
    });
    const el = page.rootInstance as AegovFileupload;
    expect(el['isValidFileType'](new File(['x'], 'any.xyz'))).toBe(true);
  });

  // --- Format file size ---

  it('formats file sizes correctly', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload></aegov-fileupload>`,
    });
    const el = page.rootInstance as AegovFileupload;
    expect(el['formatFileSize'](0)).toBe('0 B');
    expect(el['formatFileSize'](500)).toBe('500 B');
    expect(el['formatFileSize'](1024)).toBe('1 KB');
    expect(el['formatFileSize'](1536)).toBe('1.5 KB');
    expect(el['formatFileSize'](1048576)).toBe('1 MB');
    expect(el['formatFileSize'](1073741824)).toBe('1 GB');
  });

  // --- File processing ---

  it('emits error for invalid file type', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload accept=".pdf"></aegov-fileupload>`,
    });
    const el = page.rootInstance as AegovFileupload;
    const errorSpy = jest.fn();
    page.root.addEventListener('aegovFileuploadError', errorSpy);

    el['processFiles']([new File(['x'], 'test.txt', { type: 'text/plain' })]);
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy.mock.calls[0][0].detail.type).toBe('invalid-type');
  });

  it('emits error for oversized file', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload max-file-size="100"></aegov-fileupload>`,
    });
    const el = page.rootInstance as AegovFileupload;
    const errorSpy = jest.fn();
    page.root.addEventListener('aegovFileuploadError', errorSpy);

    // Create a file larger than 100 bytes
    const bigContent = 'x'.repeat(200);
    el['processFiles']([new File([bigContent], 'big.txt')]);
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy.mock.calls[0][0].detail.type).toBe('max-size');
  });

  it('emits error when max files exceeded (default variant)', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload max-files="1" multiple></aegov-fileupload>`,
    });
    const el = page.rootInstance as AegovFileupload;
    const errorSpy = jest.fn();
    page.root.addEventListener('aegovFileuploadError', errorSpy);

    el['processFiles']([
      new File(['a'], 'a.txt'),
      new File(['b'], 'b.txt'),
    ]);
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy.mock.calls[0][0].detail.type).toBe('max-files');
    // Should still accept up to the limit
    expect(el['selectedFiles']).toHaveLength(1);
  });

  it('accumulates files in button variant', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload variant="button" multiple></aegov-fileupload>`,
    });
    const el = page.rootInstance as AegovFileupload;
    el['processFiles']([new File(['a'], 'a.txt')]);
    expect(el['selectedFiles']).toHaveLength(1);
    el['processFiles']([new File(['b'], 'b.txt')]);
    expect(el['selectedFiles']).toHaveLength(2);
  });

  it('replaces files in default variant', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload multiple></aegov-fileupload>`,
    });
    const el = page.rootInstance as AegovFileupload;
    el['processFiles']([new File(['a'], 'a.txt')]);
    expect(el['selectedFiles']).toHaveLength(1);
    el['processFiles']([new File(['b'], 'b.txt'), new File(['c'], 'c.txt')]);
    expect(el['selectedFiles']).toHaveLength(2);
    expect(el['selectedFiles'][0].name).toBe('b.txt');
  });

  it('emits error when accumulated files exceed max (button variant)', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload variant="button" multiple max-files="2"></aegov-fileupload>`,
    });
    const el = page.rootInstance as AegovFileupload;
    const errorSpy = jest.fn();
    page.root.addEventListener('aegovFileuploadError', errorSpy);

    el['processFiles']([new File(['a'], 'a.txt')]);
    expect(errorSpy).not.toHaveBeenCalled();
    el['processFiles']([new File(['b'], 'b.txt'), new File(['c'], 'c.txt')]);
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(el['selectedFiles']).toHaveLength(2); // Only 1 more added
  });

  // --- Remove ---

  it('removes a file and emits events', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload variant="button" multiple></aegov-fileupload>`,
    });
    const el = page.rootInstance as AegovFileupload;
    const removeSpy = jest.fn();
    const changeSpy = jest.fn();
    page.root.addEventListener('aegovFileuploadRemove', removeSpy);
    page.root.addEventListener('aegovFileuploadChange', changeSpy);

    el['selectedFiles'] = [new File(['a'], 'a.txt'), new File(['b'], 'b.txt')];
    el['removeFile'](0);

    expect(removeSpy).toHaveBeenCalledTimes(1);
    expect(removeSpy.mock.calls[0][0].detail.file.name).toBe('a.txt');
    expect(removeSpy.mock.calls[0][0].detail.remaining).toHaveLength(1);
    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(el['selectedFiles']).toHaveLength(1);
    expect(el['selectedFiles'][0].name).toBe('b.txt');
  });

  // --- File list rendering ---

  it('renders file list in button variant', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload variant="button"></aegov-fileupload>`,
    });
    const el = page.rootInstance as AegovFileupload;
    el['selectedFiles'] = [new File(['hello'], 'test.txt')];
    await page.waitForChanges();

    const list = page.root.querySelector('.fileupload__file-list');
    expect(list).toBeTruthy();
    const item = page.root.querySelector('.fileupload__file-item');
    expect(item).toBeTruthy();
    expect(page.root.querySelector('.fileupload__file-name').textContent).toBe('test.txt');
    expect(page.root.querySelector('.fileupload__remove-btn')).toBeTruthy();
  });

  it('renders file list in dropzone variant', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload variant="dropzone"></aegov-fileupload>`,
    });
    const el = page.rootInstance as AegovFileupload;
    el['selectedFiles'] = [new File(['hello'], 'doc.pdf')];
    await page.waitForChanges();

    expect(page.root.querySelector('.fileupload__file-list')).toBeTruthy();
    expect(page.root.querySelector('.fileupload__file-name').textContent).toBe('doc.pdf');
  });

  it('does not render file list when no files', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload variant="button"></aegov-fileupload>`,
    });
    expect(page.root.querySelector('.fileupload__file-list')).toBeNull();
  });

  // --- Display text ---

  it('shows filename when one file selected (default)', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload></aegov-fileupload>`,
    });
    const el = page.rootInstance as AegovFileupload;
    el['selectedFiles'] = [new File(['x'], 'report.pdf')];
    await page.waitForChanges();

    const filename = page.root.querySelector('.fileupload__filename');
    expect(filename.textContent).toBe('report.pdf');
    expect(filename).not.toHaveClass('fileupload__filename--empty');
  });

  it('shows count when multiple files selected (default)', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload multiple></aegov-fileupload>`,
    });
    const el = page.rootInstance as AegovFileupload;
    el['selectedFiles'] = [new File(['a'], 'a.txt'), new File(['b'], 'b.txt'), new File(['c'], 'c.txt')];
    await page.waitForChanges();

    expect(page.root.querySelector('.fileupload__filename').textContent).toBe('3 files selected');
  });

  // --- Accessibility ---

  it('has aria-describedby linking to helper text', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload accept=".pdf"></aegov-fileupload>`,
    });
    const input = page.root.querySelector('.fileupload__native-input') as HTMLInputElement;
    const helper = page.root.querySelector('.fileupload__helper');
    expect(input.getAttribute('aria-describedby')).toBe(helper.id);
  });

  it('hidden input has aria-hidden in button variant', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload variant="button"></aegov-fileupload>`,
    });
    const input = page.root.querySelector('.fileupload__hidden-input');
    expect(input.getAttribute('aria-hidden')).toBe('true');
  });

  it('remove button has accessible label', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload variant="button"></aegov-fileupload>`,
    });
    const el = page.rootInstance as AegovFileupload;
    el['selectedFiles'] = [new File(['x'], 'my-file.pdf')];
    await page.waitForChanges();

    const removeBtn = page.root.querySelector('.fileupload__remove-btn');
    expect(removeBtn.getAttribute('aria-label')).toBe('Remove my-file.pdf');
  });
});
