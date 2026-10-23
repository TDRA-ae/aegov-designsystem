import { newE2EPage } from '@stencil/core/testing';

describe('aegov-fileupload (e2e)', () => {
  it('renders default appearance', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload></aegov-fileupload>');
    const wrapper = await page.find('aegov-fileupload >>> .aegov-fileupload');
    expect(wrapper).not.toBeNull();
    expect(wrapper.className).toContain('fileupload--default');
    const input = await page.find('aegov-fileupload >>> input[type="file"]');
    expect(input).not.toBeNull();
  });

  it('renders button appearance with a trigger button', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload appearance="button"></aegov-fileupload>');
    const btn = await page.find('aegov-fileupload >>> aegov-button.fileupload__trigger-btn');
    expect(btn).not.toBeNull();
  });

  it('renders dropzone appearance with drop area', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload appearance="dropzone"></aegov-fileupload>');
    const dz = await page.find('aegov-fileupload >>> .fileupload__dropzone');
    expect(dz).not.toBeNull();
  });

  it('emits aegovFileuploadChange on file selection', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload></aegov-fileupload>');
    const host = await page.find('aegov-fileupload');
    const spy = await host.spyOnEvent('aegovFileuploadChange');

    await page.evaluate(() => {
      const input = document.querySelector('aegov-fileupload')!.shadowRoot!.querySelector('input[type="file"]') as HTMLInputElement;
      const dt = new DataTransfer();
      dt.items.add(new File(['hello'], 'a.txt', { type: 'text/plain' }));
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventTimes(1);
    expect(spy.lastEvent.detail.files.length).toBe(1);
  });

  it('emits aegovValidate with tooLong when a file exceeds the size limit (replaces aegovFileuploadError per §6.6)', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload max-file-size="5"></aegov-fileupload>');
    const host = await page.find('aegov-fileupload');
    const validateSpy = await host.spyOnEvent('aegovValidate');

    await page.evaluate(() => {
      const input = document.querySelector('aegov-fileupload')!.shadowRoot!.querySelector('input[type="file"]') as HTMLInputElement;
      const dt = new DataTransfer();
      dt.items.add(new File(['1234567890'], 'big.txt', { type: 'text/plain' }));
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.waitForChanges();

    const fired = validateSpy.events.filter((e: any) => e.detail?.validity?.tooLong === true);
    expect(fired.length).toBeGreaterThanOrEqual(1);
  });

  it('emits aegovValidate with typeMismatch when file does not match accept (replaces aegovFileuploadError per §6.6)', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload accept=".pdf"></aegov-fileupload>');
    const host = await page.find('aegov-fileupload');
    const validateSpy = await host.spyOnEvent('aegovValidate');

    await page.evaluate(() => {
      const input = document.querySelector('aegov-fileupload')!.shadowRoot!.querySelector('input[type="file"]') as HTMLInputElement;
      const dt = new DataTransfer();
      dt.items.add(new File(['x'], 'a.txt', { type: 'text/plain' }));
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.waitForChanges();

    const fired = validateSpy.events.filter((e: any) => e.detail?.validity?.typeMismatch === true);
    expect(fired.length).toBeGreaterThanOrEqual(1);
  });

  it('button appearance renders selected file and a remove button works', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload appearance="button"></aegov-fileupload>');
    const host = await page.find('aegov-fileupload');
    const removeSpy = await host.spyOnEvent('aegovFileuploadRemove');

    await page.evaluate(() => {
      const input = document.querySelector('aegov-fileupload')!.shadowRoot!.querySelector('input[type="file"]') as HTMLInputElement;
      const dt = new DataTransfer();
      dt.items.add(new File(['x'], 'a.txt', { type: 'text/plain' }));
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.waitForChanges();

    const item = await page.find('aegov-fileupload >>> .fileupload__file-item');
    expect(item).not.toBeNull();
    const removeBtn = await page.find('aegov-fileupload >>> .fileupload__remove-btn');
    await removeBtn.click();
    await page.waitForChanges();

    expect(removeSpy).toHaveReceivedEventTimes(1);
    const items = await page.findAll('aegov-fileupload >>> .fileupload__file-item');
    expect(items.length).toBe(0);
  });

  it('clear() method empties selected files', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload appearance="button"></aegov-fileupload>');
    const host = await page.find('aegov-fileupload');

    await page.evaluate(() => {
      const input = document.querySelector('aegov-fileupload')!.shadowRoot!.querySelector('input[type="file"]') as HTMLInputElement;
      const dt = new DataTransfer();
      dt.items.add(new File(['x'], 'a.txt', { type: 'text/plain' }));
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.waitForChanges();

    await host.callMethod('clear');
    await page.waitForChanges();

    const items = await page.findAll('aegov-fileupload >>> .fileupload__file-item');
    expect(items.length).toBe(0);
  });

  it('renders label and hint', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload label="Upload" hint="Pick a file"></aegov-fileupload>');
    const label = await page.find('aegov-fileupload >>> .fileupload__label');
    const hint = await page.find('aegov-fileupload >>> .fileupload__hint');
    expect(await label.getProperty('textContent')).toContain('Upload');
    expect(await hint.getProperty('textContent')).toBe('Pick a file');
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
    const input = await page.find('aegov-fileupload >>> input[type="file"]');
    expect(await input.getProperty('disabled')).toBe(true);
  });

  // Regression coverage for #43. The removed remove-button's own DOM node is
  // destroyed as part of the re-render selectedFiles triggers — with no focus
  // management, real keyboard/mouse focus silently fell back to <body> on
  // every single removal.
  async function selectFiles(page: Awaited<ReturnType<typeof newE2EPage>>, names: string[]) {
    await page.evaluate((names: string[]) => {
      const input = document.querySelector('aegov-fileupload')!.shadowRoot!.querySelector('input[type="file"]') as HTMLInputElement;
      const dt = new DataTransfer();
      names.forEach(n => dt.items.add(new File(['x'], n, { type: 'text/plain' })));
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }, names);
    await page.waitForChanges();
  }

  function activeAriaLabel(page: Awaited<ReturnType<typeof newE2EPage>>) {
    return page.evaluate(() => {
      const fu = document.querySelector('aegov-fileupload')!;
      return (fu.shadowRoot!.activeElement as HTMLElement | null)?.getAttribute('aria-label') ?? null;
    });
  }

  it('moves focus to the item that shifted into the removed slot (button appearance)', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload appearance="button" is-multiple></aegov-fileupload>');
    await selectFiles(page, ['alpha.txt', 'beta.txt', 'gamma.txt']);

    await page.evaluate(() => {
      const fu = document.querySelector('aegov-fileupload')!;
      (fu.shadowRoot!.querySelectorAll('.fileupload__remove-btn')[0] as HTMLElement).click();
    });
    await page.waitForChanges();

    // Before the fix, nothing ever received focus here — the removed button's
    // node was simply gone, and real focus silently fell back to <body>.
    expect(await activeAriaLabel(page)).toBe('Remove beta.txt');
  });

  it('moves focus to the new last item when the removed item was last (dropzone appearance)', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload appearance="dropzone" is-multiple></aegov-fileupload>');
    await selectFiles(page, ['alpha.txt', 'beta.txt']);

    await page.evaluate(() => {
      const fu = document.querySelector('aegov-fileupload')!;
      const btns = fu.shadowRoot!.querySelectorAll('.fileupload__remove-btn');
      (btns[btns.length - 1] as HTMLElement).click(); // remove "beta.txt" (last)
    });
    await page.waitForChanges();

    expect(await activeAriaLabel(page)).toBe('Remove alpha.txt');
  });

  it('returns focus to the upload trigger once the last file is removed (button appearance)', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload appearance="button" is-multiple></aegov-fileupload>');
    await selectFiles(page, ['alpha.txt']);

    await page.evaluate(() => {
      const fu = document.querySelector('aegov-fileupload')!;
      (fu.shadowRoot!.querySelector('.fileupload__remove-btn') as HTMLElement).click();
    });
    await page.waitForChanges();

    const active = await page.evaluate(() => {
      const fu = document.querySelector('aegov-fileupload')!;
      const el = fu.shadowRoot!.activeElement as HTMLElement | null;
      return { tag: el?.tagName, className: el?.className };
    });
    expect(active.tag).toBe('AEGOV-BUTTON');
    expect(active.className).toContain('fileupload__trigger-btn');
  });

  it('returns focus to the visible dropzone trigger button once the last file is removed (dropzone appearance)', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload appearance="dropzone" is-multiple></aegov-fileupload>');
    await selectFiles(page, ['alpha.txt']);

    await page.evaluate(() => {
      const fu = document.querySelector('aegov-fileupload')!;
      (fu.shadowRoot!.querySelector('.fileupload__remove-btn') as HTMLElement).click();
    });
    await page.waitForChanges();

    const active = await page.evaluate(() => {
      const fu = document.querySelector('aegov-fileupload')!;
      const el = fu.shadowRoot!.activeElement as HTMLElement | null;
      return { tag: el?.tagName, className: el?.className };
    });
    expect(active.tag).toBe('AEGOV-BUTTON');
    expect(active.className).toContain('fileupload__dropzone-btn');
  });

  // Regression coverage for #44. processFiles() only ever set isInvalid/
  // errorMessage on a bad selection — nothing cleared them back on a later,
  // fully valid one, so a stale error about a file no longer even selected
  // stuck around indefinitely.
  it('clears a stale validation error once a subsequent file selection is fully valid', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload appearance="dropzone" is-multiple max-file-size="10"></aegov-fileupload>');
    const host = await page.find('aegov-fileupload');

    await page.evaluate(() => {
      const input = document.querySelector('aegov-fileupload')!.shadowRoot!.querySelector('input[type="file"]') as HTMLInputElement;
      const dt = new DataTransfer();
      dt.items.add(new File(['way more than 10 bytes of content'], 'too-big.txt', { type: 'text/plain' }));
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.waitForChanges();
    expect(host.getAttribute('is-invalid')).not.toBeNull();

    await page.evaluate(() => {
      const input = document.querySelector('aegov-fileupload')!.shadowRoot!.querySelector('input[type="file"]') as HTMLInputElement;
      const dt = new DataTransfer();
      dt.items.add(new File(['ok'], 'valid.txt', { type: 'text/plain' }));
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.waitForChanges();

    expect(host.getAttribute('is-invalid')).toBeNull();
    const errorRegion = await page.find('aegov-fileupload >>> .aegov-fileupload__error');
    expect(errorRegion).toBeNull();
  });

  it('clears a stale "max files" error once removing a file drops the count back under the cap', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload appearance="button" is-multiple max-files="2"></aegov-fileupload>');
    const host = await page.find('aegov-fileupload');

    await page.evaluate(() => {
      const input = document.querySelector('aegov-fileupload')!.shadowRoot!.querySelector('input[type="file"]') as HTMLInputElement;
      const dt = new DataTransfer();
      dt.items.add(new File(['a'], 'a.txt', { type: 'text/plain' }));
      dt.items.add(new File(['b'], 'b.txt', { type: 'text/plain' }));
      dt.items.add(new File(['c'], 'c.txt', { type: 'text/plain' }));
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.waitForChanges();
    expect(host.getAttribute('is-invalid')).not.toBeNull();

    await page.evaluate(() => {
      const fu = document.querySelector('aegov-fileupload')!;
      (fu.shadowRoot!.querySelector('.fileupload__remove-btn') as HTMLElement).click();
    });
    await page.waitForChanges();

    // Before the fix, removeFile() never reset isInvalid/errorMessage, so
    // "Maximum 2 files allowed." stuck around even once the count (2) was
    // valid again.
    expect(host.getAttribute('is-invalid')).toBeNull();
  });
});
