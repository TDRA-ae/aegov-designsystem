import { newSpecPage } from '@stencil/core/testing';
import { AegovFileupload } from './aegov-fileupload';

describe('aegov-fileupload', () => {
  it('renders default appearance with native file input', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload></aegov-fileupload>`,
    });
    const wrapper = page.root.querySelector('.aegov-fileupload');
    expect(wrapper).not.toBeNull();
    expect(wrapper.className).toContain('fileupload--default');
    const input = page.root.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.className).toContain('fileupload__native-input');
  });

  it('renders button appearance with trigger button', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload appearance="button"></aegov-fileupload>`,
    });
    expect(page.root.querySelector('.aegov-fileupload').className).toContain('fileupload--button');
    expect(page.root.querySelector('aegov-button.fileupload__trigger-btn')).not.toBeNull();
    const input = page.root.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.className).toContain('fileupload__hidden-input');
  });

  it('renders dropzone appearance with drop area and button', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload appearance="dropzone"></aegov-fileupload>`,
    });
    expect(page.root.querySelector('.aegov-fileupload').className).toContain('fileupload--dropzone');
    expect(page.root.querySelector('.fileupload__dropzone')).not.toBeNull();
    expect(page.root.querySelector('aegov-button.fileupload__dropzone-btn')).not.toBeNull();
  });

  it('auto-generates fieldId when not provided', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload></aegov-fileupload>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-fileupload-\d+$/);
    const input = page.root.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.id).toBe(page.rootInstance.fieldId);
  });

  it('respects user-provided field-id', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload field-id="up-1"></aegov-fileupload>`,
    });
    expect(page.rootInstance.fieldId).toBe('up-1');
    const input = page.root.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.id).toBe('up-1');
  });

  it('forwards is-multiple, accept, name to the native input', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload is-multiple accept=".pdf,image/*" name="files"></aegov-fileupload>`,
    });
    const input = page.root.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.multiple).toBe(true);
    expect(input.accept).toBe('.pdf,image/*');
    expect(input.name).toBe('files');
  });

  it('renders label when provided and links it via for=fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload label="Upload" field-id="up-2"></aegov-fileupload>`,
    });
    const label = page.root.querySelector('label.fileupload__label') as HTMLLabelElement;
    expect(label).not.toBeNull();
    expect(label.textContent).toContain('Upload');
    expect(label.getAttribute('for')).toBe('up-2');
  });

  it('renders required marker when is-required and label set', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload label="X" is-required></aegov-fileupload>`,
    });
    expect(page.root.querySelector('.fileupload__required')).not.toBeNull();
    const input = page.root.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.required).toBe(true);
  });

  it('renders hint and helper text', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload label="L" hint="Pick file" label-help="PDF only"></aegov-fileupload>`,
    });
    expect(page.root.querySelector('.fileupload__hint').textContent).toBe('Pick file');
    expect(page.root.querySelector('.fileupload__helper').textContent).toBe('PDF only');
    const input = page.root.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.getAttribute('aria-describedby')).toContain('-helper');
  });

  it('auto-derives helper text from accept attribute', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload accept=".pdf,image/*"></aegov-fileupload>`,
    });
    const helper = page.root.querySelector('.fileupload__helper');
    expect(helper).not.toBeNull();
    expect(helper.textContent).toContain('PDF');
    expect(helper.textContent).toContain('Images');
  });

  it('is-disabled disables input and adds disabled class', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload is-disabled></aegov-fileupload>`,
    });
    const input = page.root.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(page.root.querySelector('.aegov-fileupload').className).toContain('fileupload--disabled');
  });

  it('label-button overrides the trigger button text', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload appearance="button" label-button="Upload doc"></aegov-fileupload>`,
    });
    const btn = page.root.querySelector('aegov-button.fileupload__trigger-btn');
    expect(btn.textContent).toContain('Upload doc');
  });

  it('default appearance shows "No file chosen" placeholder', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload></aegov-fileupload>`,
    });
    const filename = page.root.querySelector('.fileupload__filename');
    expect(filename.textContent).toContain('No file chosen');
    expect(filename.className).toContain('fileupload__filename--empty');
  });

  it('forwards passthrough attrs (title, tabindex, capture, form, webkitdirectory)', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload title="x" tabindex="2" capture="environment" form="f1"></aegov-fileupload>`,
    });
    const input = page.root.querySelector('input[type="file"]');
    expect(input.getAttribute('title')).toBe('x');
    expect(input.getAttribute('tabindex')).toBe('2');
    expect(input.getAttribute('capture')).toBe('environment');
    expect(input.getAttribute('form')).toBe('f1');
  });

  it('emits aegovFileuploadChange when files are selected (default appearance)', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload></aegov-fileupload>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovFileuploadChange', spy);
    const input = page.root.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['hello'], 'a.txt', { type: 'text/plain' });
    Object.defineProperty(input, 'files', { value: [file] });
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail.files.length).toBe(1);
    expect(spy.mock.calls[0][0].detail.files[0].name).toBe('a.txt');
  });

  it('emits aegovValidate with tooLong flag for max-size violation (replaces aegovFileuploadError per §6.6)', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload max-file-size="5"></aegov-fileupload>`,
    });
    const errSpy = jest.fn();
    page.root.addEventListener('aegovValidate', errSpy);
    const input = page.root.querySelector('input[type="file"]') as HTMLInputElement;
    const big = new File(['1234567890'], 'big.txt', { type: 'text/plain' });
    Object.defineProperty(input, 'files', { value: [big] });
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    expect(errSpy).toHaveBeenCalled();
    const detail = errSpy.mock.calls[errSpy.mock.calls.length - 1][0].detail;
    expect(detail.validity.tooLong).toBe(true);
  });

  it('emits aegovValidate with typeMismatch flag for invalid-type (replaces aegovFileuploadError per §6.6)', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload accept=".pdf"></aegov-fileupload>`,
    });
    const errSpy = jest.fn();
    page.root.addEventListener('aegovValidate', errSpy);
    const input = page.root.querySelector('input[type="file"]') as HTMLInputElement;
    const notPdf = new File(['x'], 'a.txt', { type: 'text/plain' });
    Object.defineProperty(input, 'files', { value: [notPdf] });
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    expect(errSpy).toHaveBeenCalled();
    const detail = errSpy.mock.calls[errSpy.mock.calls.length - 1][0].detail;
    expect(detail.validity.typeMismatch).toBe(true);
  });

  it('getFiles() returns a copy of selected files', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload></aegov-fileupload>`,
    });
    const input = page.root.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['x'], 'b.txt', { type: 'text/plain' });
    Object.defineProperty(input, 'files', { value: [file] });
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    const files = await page.rootInstance.getFiles();
    expect(files.length).toBe(1);
    expect(files[0].name).toBe('b.txt');
  });

  it('clear() empties selected files', async () => {
    const page = await newSpecPage({
      components: [AegovFileupload],
      html: `<aegov-fileupload></aegov-fileupload>`,
    });
    const input = page.root.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['x'], 'b.txt', { type: 'text/plain' });
    Object.defineProperty(input, 'files', { value: [file] });
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    await page.rootInstance.clear();
    await page.waitForChanges();
    const files = await page.rootInstance.getFiles();
    expect(files.length).toBe(0);
  });

  // Validation surface (Layer 1) — see validation-engine-addon.md §2.8
  describe('validation surface', () => {
    it('toggles host is-invalid class', async () => {
      const page = await newSpecPage({
        components: [AegovFileupload],
        html: `<aegov-fileupload is-invalid="true"></aegov-fileupload>`,
      });
      expect(page.root.classList.contains('is-invalid')).toBe(true);
    });

    it('renders errorMessage in error region', async () => {
      const page = await newSpecPage({
        components: [AegovFileupload],
        html: `<aegov-fileupload is-invalid="true" error-message="Pick file"></aegov-fileupload>`,
      });
      expect(page.root.querySelector('.aegov-fileupload__error').textContent).toBe('Pick file');
    });

    it('renders hint when not invalid', async () => {
      const page = await newSpecPage({
        components: [AegovFileupload],
        html: `<aegov-fileupload hint="Up to 10MB"></aegov-fileupload>`,
      });
      expect(page.root.querySelector('.fileupload__hint').textContent).toBe('Up to 10MB');
    });

    it('hides hint when error shown', async () => {
      const page = await newSpecPage({
        components: [AegovFileupload],
        html: `<aegov-fileupload hint="h" is-invalid="true" error-message="err"></aegov-fileupload>`,
      });
      expect(page.root.querySelector('.aegov-fileupload__error')).not.toBeNull();
      expect(page.root.querySelector('.fileupload__hint')).toBeNull();
    });

    it('validate() resolves valid for empty optional fileupload', async () => {
      const page = await newSpecPage({
        components: [AegovFileupload],
        html: `<aegov-fileupload></aegov-fileupload>`,
      });
      const r = await page.rootInstance.validate('manual');
      expect(r.valid).toBe(true);
    });

    it('setCustomValidity("msg") sets invalid + error', async () => {
      const page = await newSpecPage({
        components: [AegovFileupload],
        html: `<aegov-fileupload></aegov-fileupload>`,
      });
      await page.rootInstance.setCustomValidity('Server rejected file');
      await page.waitForChanges();
      expect(page.rootInstance.isInvalid).toBe(true);
      expect(page.rootInstance.errorMessage).toBe('Server rejected file');
    });

    it('setCustomValidity("") clears state', async () => {
      const page = await newSpecPage({
        components: [AegovFileupload],
        html: `<aegov-fileupload is-invalid="true" error-message="x"></aegov-fileupload>`,
      });
      await page.rootInstance.setCustomValidity('');
      await page.waitForChanges();
      expect(page.rootInstance.isInvalid).toBe(false);
      expect(page.rootInstance.errorMessage).toBe('');
    });

    it('aegovValidate fires with valueMissing when isRequired and empty', async () => {
      const page = await newSpecPage({
        components: [AegovFileupload],
        html: `<aegov-fileupload is-required></aegov-fileupload>`,
      });
      const r = await page.rootInstance.validate('manual');
      expect(r.valid).toBe(false);
      expect(r.validity.valueMissing).toBe(true);
    });
  });
});
