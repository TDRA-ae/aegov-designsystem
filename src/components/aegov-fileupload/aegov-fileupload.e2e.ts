import { newE2EPage } from '@stencil/core/testing';

describe('aegov-fileupload e2e', () => {
  // --- Default variant rendering ---

  it('renders default variant in DOM', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload></aegov-fileupload>');
    const el = await page.find('aegov-fileupload');
    expect(el).not.toBeNull();
    const wrapper = await page.find('.fileupload__input-wrapper');
    expect(wrapper).not.toBeNull();
  });

  it('shows "No file chosen" initially', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload></aegov-fileupload>');
    const filename = await page.find('.fileupload__filename');
    expect(filename.textContent).toBe('No file chosen');
  });

  it('shows "Browse" button text', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload></aegov-fileupload>');
    const btn = await page.find('.fileupload__browse-btn');
    expect(btn.textContent).toBe('Browse');
  });

  // --- Button variant rendering ---

  it('renders button variant', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload variant="button"></aegov-fileupload>');
    const btn = await page.find('.fileupload__trigger-btn');
    expect(btn).not.toBeNull();
    expect(btn.textContent).toContain('Choose File');
  });

  it('renders button variant with multiple text', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload variant="button" multiple></aegov-fileupload>');
    const btn = await page.find('.fileupload__trigger-btn');
    expect(btn.textContent).toContain('Choose Files');
  });

  // --- Dropzone variant rendering ---

  it('renders dropzone variant', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload variant="dropzone"></aegov-fileupload>');
    const zone = await page.find('.fileupload__dropzone');
    expect(zone).not.toBeNull();
    const icon = await page.find('.fileupload__drop-icon');
    expect(icon).not.toBeNull();
    const text = await page.find('.fileupload__drop-text');
    expect(text.textContent).toContain('a file');
    const btn = await page.find('.fileupload__dropzone-btn');
    expect(btn.textContent).toBe('Browse Files');
  });

  it('renders dropzone with plural text when multiple', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload variant="dropzone" multiple></aegov-fileupload>');
    const text = await page.find('.fileupload__drop-text');
    expect(text.textContent).toContain('files');
  });

  // --- Sizes ---

  it('applies size classes', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload size="sm"></aegov-fileupload>');
    const wrapper = await page.find('.aegov-fileupload');
    expect(wrapper).toHaveClass('fileupload--sm');
  });

  it('applies lg size', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload size="lg"></aegov-fileupload>');
    const wrapper = await page.find('.aegov-fileupload');
    expect(wrapper).toHaveClass('fileupload--lg');
  });

  // --- Label, description, helper ---

  it('renders label text', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload label="Upload file"></aegov-fileupload>');
    const label = await page.find('.fileupload__label');
    expect(label.textContent).toContain('Upload file');
  });

  it('renders required asterisk', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload label="File" required></aegov-fileupload>');
    const asterisk = await page.find('.fileupload__required');
    expect(asterisk).not.toBeNull();
  });

  it('renders description', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload description="Select your documents"></aegov-fileupload>');
    const desc = await page.find('.fileupload__description');
    expect(desc.textContent).toBe('Select your documents');
  });

  it('auto-generates helper from accept', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload accept=".pdf,.jpg"></aegov-fileupload>');
    const helper = await page.find('.fileupload__helper');
    expect(helper.textContent).toBe('Allowed: PDF, JPG');
  });

  it('uses custom helper text', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload accept=".pdf" helper-text="PDFs only"></aegov-fileupload>');
    const helper = await page.find('.fileupload__helper');
    expect(helper.textContent).toBe('PDFs only');
  });

  it('uses custom button text', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload button-text="Upload"></aegov-fileupload>');
    const btn = await page.find('.fileupload__browse-btn');
    expect(btn.textContent).toBe('Upload');
  });

  // --- Disabled state ---

  it('applies disabled state', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload disabled></aegov-fileupload>');
    const wrapper = await page.find('.aegov-fileupload');
    expect(wrapper).toHaveClass('fileupload--disabled');
    const input = await page.find('input[type="file"]');
    const disabled = await input.getProperty('disabled');
    expect(disabled).toBe(true);
  });

  it('button variant disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload variant="button" disabled></aegov-fileupload>');
    const btn = await page.find('.fileupload__trigger-btn');
    const disabled = await btn.getProperty('disabled');
    expect(disabled).toBe(true);
  });

  // --- Field ID ---

  it('auto-generates field ID', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload></aegov-fileupload>');
    const input = await page.find('input[type="file"]');
    const id = await input.getProperty('id');
    expect(id).toMatch(/^aegov-fileupload-\d+$/);
  });

  it('uses custom field ID', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload field-id="my-upload"></aegov-fileupload>');
    const input = await page.find('input[type="file"]');
    const id = await input.getProperty('id');
    expect(id).toBe('my-upload');
  });

  // --- Methods ---

  it('clear() empties files via method', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload variant="button"></aegov-fileupload>');
    const el = await page.find('aegov-fileupload');

    // Use evaluate to set files and verify
    await page.evaluate(() => {
      const comp = document.querySelector('aegov-fileupload') as any;
      comp.selectedFiles = [new File(['x'], 'test.txt')];
    });
    await page.waitForChanges();

    await el.callMethod('clear');
    await page.waitForChanges();

    const list = await page.find('.fileupload__file-list');
    expect(list).toBeNull();
  });

  // --- Native input attributes ---

  it('passes accept to native input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload accept=".pdf,.docx"></aegov-fileupload>');
    const input = await page.find('input[type="file"]');
    expect(input.getAttribute('accept')).toBe('.pdf,.docx');
  });

  it('passes multiple to native input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload multiple></aegov-fileupload>');
    const input = await page.find('input[type="file"]');
    const multiple = await input.getProperty('multiple');
    expect(multiple).toBe(true);
  });

  it('passes name to native input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload name="documents"></aegov-fileupload>');
    const input = await page.find('input[type="file"]');
    const name = await input.getProperty('name');
    expect(name).toBe('documents');
  });

  // --- Accessibility ---

  it('native input is sr-only but still in DOM (default variant)', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload></aegov-fileupload>');
    const input = await page.find('.fileupload__native-input');
    expect(input).not.toBeNull();
    // Should still be part of tab order (no tabindex=-1)
    const tabIndex = await input.getProperty('tabIndex');
    expect(tabIndex).toBe(0);
  });

  it('hidden input is not focusable in button variant', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload variant="button"></aegov-fileupload>');
    const input = await page.find('.fileupload__hidden-input');
    const tabIndex = await input.getProperty('tabIndex');
    expect(tabIndex).toBe(-1);
    expect(input.getAttribute('aria-hidden')).toBe('true');
  });

  it('label for attribute links to input id', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload label="Docs" field-id="doc-upload"></aegov-fileupload>');
    const label = await page.find('.fileupload__label');
    expect(label.getAttribute('for')).toBe('doc-upload');
  });
});
