import { newE2EPage } from '@stencil/core/testing';

describe('aegov-fileupload (e2e)', () => {
  it('renders default variant', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload></aegov-fileupload>');
    const wrapper = await page.find('aegov-fileupload .aegov-fileupload');
    expect(wrapper).not.toBeNull();
    expect(wrapper.className).toContain('fileupload--default');
    const input = await page.find('aegov-fileupload input[type="file"]');
    expect(input).not.toBeNull();
  });

  it('renders button variant with a trigger button', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload variant="button"></aegov-fileupload>');
    const btn = await page.find('aegov-fileupload button.fileupload__trigger-btn');
    expect(btn).not.toBeNull();
  });

  it('renders dropzone variant with drop area', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload variant="dropzone"></aegov-fileupload>');
    const dz = await page.find('aegov-fileupload .fileupload__dropzone');
    expect(dz).not.toBeNull();
  });

  it('emits aegovFileuploadChange on file selection', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload></aegov-fileupload>');
    const host = await page.find('aegov-fileupload');
    const spy = await host.spyOnEvent('aegovFileuploadChange');

    await page.evaluate(() => {
      const input = document.querySelector('aegov-fileupload input[type="file"]') as HTMLInputElement;
      const dt = new DataTransfer();
      dt.items.add(new File(['hello'], 'a.txt', { type: 'text/plain' }));
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventTimes(1);
    expect(spy.lastEvent.detail.files.length).toBe(1);
  });

  it('emits aegovFileuploadError of type max-size when a file exceeds the limit', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload max-file-size="5"></aegov-fileupload>');
    const host = await page.find('aegov-fileupload');
    const errSpy = await host.spyOnEvent('aegovFileuploadError');

    await page.evaluate(() => {
      const input = document.querySelector('aegov-fileupload input[type="file"]') as HTMLInputElement;
      const dt = new DataTransfer();
      dt.items.add(new File(['1234567890'], 'big.txt', { type: 'text/plain' }));
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.waitForChanges();

    expect(errSpy.events.length).toBeGreaterThanOrEqual(1);
    expect(errSpy.lastEvent.detail.type).toBe('max-size');
  });

  it('emits aegovFileuploadError of type invalid-type when file does not match accept', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload accept=".pdf"></aegov-fileupload>');
    const host = await page.find('aegov-fileupload');
    const errSpy = await host.spyOnEvent('aegovFileuploadError');

    await page.evaluate(() => {
      const input = document.querySelector('aegov-fileupload input[type="file"]') as HTMLInputElement;
      const dt = new DataTransfer();
      dt.items.add(new File(['x'], 'a.txt', { type: 'text/plain' }));
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.waitForChanges();

    expect(errSpy.events.length).toBeGreaterThanOrEqual(1);
    expect(errSpy.lastEvent.detail.type).toBe('invalid-type');
  });

  it('button variant renders selected file and a remove button works', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload variant="button"></aegov-fileupload>');
    const host = await page.find('aegov-fileupload');
    const removeSpy = await host.spyOnEvent('aegovFileuploadRemove');

    await page.evaluate(() => {
      const input = document.querySelector('aegov-fileupload input[type="file"]') as HTMLInputElement;
      const dt = new DataTransfer();
      dt.items.add(new File(['x'], 'a.txt', { type: 'text/plain' }));
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.waitForChanges();

    const item = await page.find('aegov-fileupload .fileupload__file-item');
    expect(item).not.toBeNull();
    const removeBtn = await page.find('aegov-fileupload .fileupload__remove-btn');
    await removeBtn.click();
    await page.waitForChanges();

    expect(removeSpy).toHaveReceivedEventTimes(1);
    const items = await page.findAll('aegov-fileupload .fileupload__file-item');
    expect(items.length).toBe(0);
  });

  it('clear() method empties selected files', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload variant="button"></aegov-fileupload>');
    const host = await page.find('aegov-fileupload');

    await page.evaluate(() => {
      const input = document.querySelector('aegov-fileupload input[type="file"]') as HTMLInputElement;
      const dt = new DataTransfer();
      dt.items.add(new File(['x'], 'a.txt', { type: 'text/plain' }));
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.waitForChanges();

    await host.callMethod('clear');
    await page.waitForChanges();

    const items = await page.findAll('aegov-fileupload .fileupload__file-item');
    expect(items.length).toBe(0);
  });

  it('renders label and description', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload label="Upload" description="Pick a file"></aegov-fileupload>');
    const label = await page.find('aegov-fileupload .fileupload__label');
    const desc = await page.find('aegov-fileupload .fileupload__description');
    expect(await label.getProperty('textContent')).toContain('Upload');
    expect(await desc.getProperty('textContent')).toBe('Pick a file');
  });

  it('forwards aria/data attributes to the host', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload data-testid="up"></aegov-fileupload>');
    const host = await page.find('aegov-fileupload');
    expect(host.getAttribute('data-testid')).toBe('up');
  });

  it('is-disabled disables the inner input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload is-disabled></aegov-fileupload>');
    const input = await page.find('aegov-fileupload input[type="file"]');
    expect(await input.getProperty('disabled')).toBe(true);
  });
});
