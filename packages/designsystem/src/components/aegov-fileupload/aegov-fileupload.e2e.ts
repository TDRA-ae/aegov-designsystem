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
  // DS-A11Y-fileupload-01: the visible label names the group and the trigger
  // button ("Choose File, <label>"), for both the button and dropzone appearances.
  const readNames = (page: any, id: string) => page.evaluate((id: string) => {
    const root = document.getElementById(id)!.shadowRoot!;
    const group = root.querySelector('[role="group"]')!;
    const labelledBy = group.getAttribute('aria-labelledby');
    const groupName = labelledBy ? root.getElementById(labelledBy)?.textContent?.replace(' *', '').trim() : group.getAttribute('aria-label');
    const button = root.querySelector('aegov-button')!.shadowRoot!.querySelector('button')!;
    return { group: groupName, button: button.getAttribute('aria-label') };
  }, id);

  it('button and dropzone: the label names the group and the trigger button', async () => {
    const page = await newE2EPage();
    await page.setContent(`<meta charset="utf-8">
      <aegov-fileupload id="b" appearance="button" label="Supporting documents" is-required></aegov-fileupload>
      <aegov-fileupload id="d" appearance="dropzone" label="Evidence files" is-multiple></aegov-fileupload>
      <div dir="rtl"><aegov-fileupload id="ar" appearance="button" label="المستندات"></aegov-fileupload></div>
      <aegov-fileupload id="none" appearance="button"></aegov-fileupload>`);
    await page.waitForChanges();
    expect(await readNames(page, 'b')).toEqual({ group: 'Supporting documents', button: 'Choose File, Supporting documents' });
    expect(await readNames(page, 'd')).toEqual({ group: 'Evidence files', button: 'Browse Files, Evidence files' });
    expect(await readNames(page, 'ar')).toEqual({ group: 'المستندات', button: 'اختر ملفاً، المستندات' });
    // No label: the button keeps just its visible text.
    expect(await readNames(page, 'none')).toEqual({ group: null, button: null });
  });

  it('inside aegov-form-field: the aegov-label text names the group and the button, and follows changes', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-form-field><aegov-label id="l">Trade licence</aegov-label><aegov-fileupload id="f" appearance="button"></aegov-fileupload></aegov-form-field>');
    await page.waitForChanges();
    expect(await readNames(page, 'f')).toEqual({ group: 'Trade licence', button: 'Choose File, Trade licence' });

    await page.evaluate(() => { document.getElementById('l')!.textContent = 'Trade licence copy'; });
    await page.waitForChanges();
    expect(await readNames(page, 'f')).toEqual({ group: 'Trade licence copy', button: 'Choose File, Trade licence copy' });
  });

  // DS-A11Y-fileupload-02: the focused button carries the allowed types, the
  // error and the hint (aria-description, as aria-describedby can't cross
  // into aegov-button's shadow root) and the invalid state; the group no
  // longer repeats them.
  const readDescription = (page: any, id: string) => page.evaluate((id: string) => {
    const root = document.getElementById(id)!.shadowRoot!;
    const group = root.querySelector('[role="group"]')!;
    const button = root.querySelector('aegov-button')!.shadowRoot!.querySelector('button')!;
    return {
      description: button.getAttribute('aria-description'),
      invalid: button.getAttribute('aria-invalid'),
      group: [group.getAttribute('aria-describedby'), group.getAttribute('aria-invalid')],
    };
  }, id);

  it('button and dropzone: the trigger describes the allowed types, error and hint, and is invalid with the field', async () => {
    const page = await newE2EPage();
    await page.setContent(`<meta charset="utf-8">
      <p id="ext">Scan both sides.</p>
      <aegov-fileupload id="b" appearance="button" label="Docs" hint="Up to 3 files" accept=".pdf,image/*"></aegov-fileupload>
      <aegov-fileupload id="d" appearance="dropzone" label="Lease" accept=".pdf" is-invalid error-message="The file must be a PDF" hint="Hidden while invalid"></aegov-fileupload>
      <aegov-fileupload id="x" appearance="button" label="ID" aria-describedby="ext"></aegov-fileupload>
      <aegov-fileupload id="s" appearance="dropzone" label="Photo" is-invalid><span slot="error">Photo is <b>too dark</b></span></aegov-fileupload>
      <div dir="rtl"><aegov-fileupload id="ar" appearance="button" label="المستندات" accept=".pdf" hint="حتى 3 ملفات"></aegov-fileupload></div>
      <aegov-fileupload id="none" appearance="button" label="Plain"></aegov-fileupload>`);
    await page.waitForChanges();
    expect(await readDescription(page, 'b')).toEqual({ description: 'Allowed: PDF, Images. Up to 3 files', invalid: null, group: [null, null] });
    expect(await readDescription(page, 'd')).toEqual({ description: 'Allowed: PDF. The file must be a PDF', invalid: 'true', group: [null, null] });
    expect((await readDescription(page, 'x')).description).toBe('Scan both sides.');
    expect(await readDescription(page, 's')).toEqual({ description: 'Photo is too dark', invalid: 'true', group: [null, null] });
    expect((await readDescription(page, 'ar')).description).toBe('المسموح به: PDF. حتى 3 ملفات');
    expect((await readDescription(page, 'none')).description).toBeNull();
  });

  // DS-A11Y-fileupload-03: "Required" is in every appearance's description
  // (button roles don't support aria-required), nothing is invalid before
  // interaction, and the form is still blocked while empty.
  it('required: described as "Required", not invalid on load, still blocks the form', async () => {
    const page = await newE2EPage();
    await page.setContent(`<meta charset="utf-8"><form id="f">
      <aegov-fileupload id="def" label="Emirates ID" is-required></aegov-fileupload>
      <aegov-fileupload id="b" appearance="button" label="Passport" accept=".pdf" is-required></aegov-fileupload>
      <div dir="rtl"><aegov-fileupload id="ar" appearance="dropzone" label="الجواز" is-required></aegov-fileupload></div>
    </form>`);
    await page.waitForChanges();
    const readDefault = () => page.evaluate(() => {
      const root = document.getElementById('def')!.shadowRoot!;
      const input = root.querySelector('input[type="file"]') as HTMLInputElement;
      const desc = (input.getAttribute('aria-describedby') || '').split(' ').map(id => root.getElementById(id)?.textContent?.trim()).filter(Boolean).join(' | ');
      return { required: input.required, matchesInvalid: input.matches(':invalid'), ariaInvalid: input.getAttribute('aria-invalid'), desc };
    });
    expect(await readDefault()).toEqual({ required: false, matchesInvalid: false, ariaInvalid: null, desc: 'Required.' });
    expect(await readDescription(page, 'b')).toEqual({ description: 'Required. Allowed: PDF', invalid: null, group: [null, null] });
    expect((await readDescription(page, 'ar')).description).toBe('مطلوب');

    // Empty required fields still block the form. When the app then shows
    // the "Required" error, it isn't said twice.
    expect(await page.evaluate(() => (document.getElementById('f') as HTMLFormElement).checkValidity())).toBe(false);
    await page.evaluate(() => ['def', 'b'].forEach(id => Object.assign(document.getElementById(id)!, { errorMessage: 'Required', isInvalid: true })));
    await page.waitForChanges();
    expect(await readDefault()).toEqual({ required: false, matchesInvalid: false, ariaInvalid: 'true', desc: 'Required' });
    expect(await readDescription(page, 'b')).toEqual({ description: 'Allowed: PDF. Required', invalid: 'true', group: [null, null] });
  });

  it('the trigger description and invalid state follow error and aria-describedby changes', async () => {
    const page = await newE2EPage();
    await page.setContent(`<p id="ext">Scan both sides</p>
      <aegov-fileupload id="b" appearance="button" label="Passport" hint="One file"></aegov-fileupload>`);
    await page.waitForChanges();
    expect(await readDescription(page, 'b')).toEqual({ description: 'One file', invalid: null, group: [null, null] });

    const host = await page.find('#b');
    host.setProperty('errorMessage', 'Upload a copy of your passport');
    host.setProperty('isInvalid', true);
    await page.waitForChanges();
    expect(await readDescription(page, 'b')).toEqual({ description: 'Upload a copy of your passport', invalid: 'true', group: [null, null] });

    host.setProperty('isInvalid', false);
    await page.evaluate(() => document.getElementById('b')!.setAttribute('aria-describedby', 'ext'));
    await page.waitForChanges();
    expect(await readDescription(page, 'b')).toEqual({ description: 'Scan both sides. One file', invalid: null, group: [null, null] });
  });

  // DS-A11Y-fileupload-13: the native input keeps the kept files, so a screen
  // reader on the focused input reads "a.pdf" / "2 files", not "No file
  // chosen". It is only emptied while the picker is open, so re-picking the
  // same (edited) file still fires change; cancel puts the selection back.
  const pickInto = (page: any, id: string, names: string[]) => page.evaluate((id: string, names: string[]) => {
    const input = document.getElementById(id)!.shadowRoot!.querySelector('input[type="file"]') as HTMLInputElement;
    input.click(); // what the user's click / Space does before the picker opens
    const dt = new DataTransfer();
    names.forEach(n => dt.items.add(new File(['x'], n, { type: n.endsWith('.pdf') ? 'application/pdf' : 'text/plain' })));
    input.files = dt.files;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }, id, names);
  const nativeFiles = (page: any, id: string) => page.evaluate((id: string) =>
    Array.from((document.getElementById(id)!.shadowRoot!.querySelector('input[type="file"]') as HTMLInputElement).files!).map(f => f.name), id);

  it('default: the native input holds the chosen files; empty only while the picker is open; cancel restores', async () => {
    const page = await newE2EPage();
    page.on('filechooser', () => undefined);
    await page.setContent('<aegov-fileupload id="f" label="Lease" accept=".pdf"></aegov-fileupload><aegov-fileupload id="m" label="Docs" is-multiple></aegov-fileupload>');
    await page.waitForChanges();
    expect(await nativeFiles(page, 'f')).toEqual([]);

    await pickInto(page, 'f', ['lease.pdf']);
    await page.waitForChanges();
    expect(await nativeFiles(page, 'f')).toEqual(['lease.pdf']);

    await pickInto(page, 'm', ['a.pdf', 'b.pdf']);
    await page.waitForChanges();
    expect(await nativeFiles(page, 'm')).toEqual(['a.pdf', 'b.pdf']);

    // Picker opened, then cancelled.
    const openThenCancel = await page.evaluate(() => {
      const input = document.getElementById('f')!.shadowRoot!.querySelector('input[type="file"]') as HTMLInputElement;
      input.click();
      const whileOpen = input.files!.length;
      input.dispatchEvent(new Event('cancel'));
      return { whileOpen, afterCancel: Array.from(input.files!).map(f => f.name) };
    });
    expect(openThenCancel).toEqual({ whileOpen: 0, afterCancel: ['lease.pdf'] });

    // Some Chrome builds clear the input and fire change (no files) on cancel:
    // the selection must survive that too.
    await page.evaluate(() => {
      const input = document.getElementById('f')!.shadowRoot!.querySelector('input[type="file"]') as HTMLInputElement;
      input.value = '';
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.waitForChanges();
    expect(await nativeFiles(page, 'f')).toEqual(['lease.pdf']);
    expect((await page.find('#f').then(h => h.callMethod('getFiles'))).length).toBe(1);

    // A rejected type is not kept in the input either.
    await pickInto(page, 'f', ['notes.txt']);
    await page.waitForChanges();
    expect(await nativeFiles(page, 'f')).toEqual([]);
  });

  // DS-A11Y-fileupload-16: like a native file input's value, the trigger
  // says what is selected, and follows adds and removals.
  it('button and dropzone: the trigger description starts with the selection', async () => {
    const page = await newE2EPage();
    await page.setContent(`<meta charset="utf-8">
      <aegov-fileupload id="b" appearance="button" label="Docs" accept=".pdf" is-required is-multiple></aegov-fileupload>
      <aegov-fileupload id="d" appearance="dropzone" label="Lease"></aegov-fileupload>
      <div dir="rtl"><aegov-fileupload id="ar" appearance="button" label="الجواز"></aegov-fileupload></div>`);
    await page.waitForChanges();
    expect((await readDescription(page, 'b')).description).toBe('Required. Allowed: PDF');

    await pickInto(page, 'b', ['a.pdf']);
    await page.waitForChanges();
    expect((await readDescription(page, 'b')).description).toBe('Selected: a.pdf. Required. Allowed: PDF');
    await pickInto(page, 'b', ['b.pdf']);
    await page.waitForChanges();
    expect((await readDescription(page, 'b')).description).toBe('2 files selected. Required. Allowed: PDF');

    await page.evaluate(() => (document.getElementById('b')!.shadowRoot!.querySelector('.fileupload__remove-btn') as HTMLButtonElement).click());
    await page.waitForChanges();
    expect((await readDescription(page, 'b')).description).toBe('Selected: b.pdf. Required. Allowed: PDF');
    await page.evaluate(() => (document.getElementById('b')!.shadowRoot!.querySelector('.fileupload__remove-btn') as HTMLButtonElement).click());
    await page.waitForChanges();
    expect((await readDescription(page, 'b')).description).toBe('Required. Allowed: PDF');

    await pickInto(page, 'd', ['lease.pdf']);
    await pickInto(page, 'ar', ['جواز.pdf']);
    await page.waitForChanges();
    expect((await readDescription(page, 'd')).description).toBe('Selected: lease.pdf');
    expect((await readDescription(page, 'ar')).description).toBe('الملف المختار: جواز.pdf');
  });

  it('button: the native input follows adding and removing files', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload id="b" appearance="button" label="Docs" is-multiple></aegov-fileupload>');
    await page.waitForChanges();
    await pickInto(page, 'b', ['a.pdf']);
    await page.waitForChanges();
    await pickInto(page, 'b', ['b.pdf']);
    await page.waitForChanges();
    expect(await nativeFiles(page, 'b')).toEqual(['a.pdf', 'b.pdf']);

    const removeFirst = () => page.evaluate(() => (document.getElementById('b')!.shadowRoot!.querySelector('.fileupload__remove-btn') as HTMLButtonElement).click());
    await removeFirst();
    await page.waitForChanges();
    expect(await nativeFiles(page, 'b')).toEqual(['b.pdf']);
    await removeFirst();
    await page.waitForChanges();
    expect(await nativeFiles(page, 'b')).toEqual([]);
  });
});
