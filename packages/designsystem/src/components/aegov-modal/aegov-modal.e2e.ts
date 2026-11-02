import { newE2EPage } from '@stencil/core/testing';

describe('aegov-modal (e2e)', () => {
  it('does not render dialog when closed', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-modal></aegov-modal>');
    const dialog = await page.find('aegov-modal >>> [role="dialog"]');
    expect(dialog).toBeNull();
  });

  it('renders dialog with role and aria-modal when opened', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-modal is-open="true"><p>Body</p></aegov-modal>');
    const dialog = await page.find('aegov-modal >>> [role="dialog"]');
    expect(dialog).not.toBeNull();
    expect(dialog.getAttribute('aria-modal')).toBe('true');
  });

  it('show() opens the modal and emits aegovModalOpen', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-modal></aegov-modal>');
    const el = await page.find('aegov-modal');
    const spy = await el.spyOnEvent('aegovModalOpen');
    await el.callMethod('show');
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
  });

  it('close() emits aegovModalClose after animation', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-modal is-open="true"></aegov-modal>');
    const el = await page.find('aegov-modal');
    const spy = await el.spyOnEvent('aegovModalClose');
    await el.callMethod('close');
    await new Promise(resolve => setTimeout(resolve, 300));
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
  });

  it('Escape key closes the modal and emits aegovModalEscapePress', async () => {
    const page = await newE2EPage();
    // Open the modal via property change so the @Watch('isOpen') runs and
    // attaches the document-level keydown handler.
    await page.setContent('<aegov-modal><button>focus</button></aegov-modal>');
    const el = await page.find('aegov-modal');
    const escSpy = await el.spyOnEvent('aegovModalEscapePress');
    const closeSpy = await el.spyOnEvent('aegovModalClose');
    await el.setProperty('isOpen', true);
    await page.waitForChanges();
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.keyboard.press('Escape');
    await new Promise(resolve => setTimeout(resolve, 300));
    await page.waitForChanges();
    expect(escSpy).toHaveReceivedEventTimes(1);
    expect(closeSpy).toHaveReceivedEventTimes(1);
  });

  it('backdrop click closes the modal', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-modal is-open="true"></aegov-modal>');
    const el = await page.find('aegov-modal');
    const spy = await el.spyOnEvent('aegovModalBackdropClick');
    const backdrop = await page.find('aegov-modal >>> .aegov-modal-backdrop');
    await backdrop.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
  });

  it('does not close on backdrop when is-close-with-overlay is false', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-modal is-open="true" is-close-with-overlay="false"></aegov-modal>');
    const el = await page.find('aegov-modal');
    const closeSpy = await el.spyOnEvent('aegovModalClose');
    const backdrop = await page.find('aegov-modal >>> .aegov-modal-backdrop');
    await backdrop.click();
    await new Promise(resolve => setTimeout(resolve, 300));
    await page.waitForChanges();
    expect(closeSpy).toHaveReceivedEventTimes(0);
  });

  it('preventDefault on aegovModalBeforeClose cancels the close', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-modal is-open="true"></aegov-modal>');
    await page.evaluate(() => {
      const m = document.querySelector('aegov-modal') as HTMLElement;
      m.addEventListener('aegovModalBeforeClose', (e: Event) => e.preventDefault());
    });
    const el = await page.find('aegov-modal');
    const closeSpy = await el.spyOnEvent('aegovModalClose');
    await el.callMethod('close');
    await new Promise(resolve => setTimeout(resolve, 300));
    await page.waitForChanges();
    expect(closeSpy).toHaveReceivedEventTimes(0);
  });

  it('renders slotted content inside the dialog', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-modal is-open="true"><p id="x">hello</p></aegov-modal>');
    const slotted = await page.find('aegov-modal p#x');
    expect(slotted).not.toBeNull();
    expect(slotted.textContent).toBe('hello');
  });

  it('applies size class', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-modal is-open="true" size="sm"></aegov-modal>');
    const content = await page.find('aegov-modal >>> .modal-size-sm');
    expect(content).not.toBeNull();
  });

  // connectedCallback() unconditionally moves the modal to document.body for
  // proper stacking, detaching it from any dir="rtl" ancestor wrapper — the
  // same portal-vs-dir gap already found and fixed in aegov-datepicker (#37)
  // and aegov-dropdown (#41). Regression coverage for #53.
  it('carries dir="rtl" from a local ancestor wrapper after the move to document.body', async () => {
    const page = await newE2EPage();
    await page.setContent('<div dir="rtl"><aegov-modal><p>Body</p></aegov-modal></div>');
    const host = await page.find('aegov-modal');
    await host.callMethod('show');
    await page.waitForChanges();

    const result = await page.evaluate(() => {
      const modal = document.querySelector('aegov-modal')!;
      const dialog = modal.shadowRoot!.querySelector('[role="dialog"]');
      return {
        hostDir: modal.getAttribute('dir'),
        parentIsBody: modal.parentElement === document.body,
        dialogDirection: dialog ? getComputedStyle(dialog).direction : null,
      };
    });

    expect(result.parentIsBody).toBe(true);
    expect(result.hostDir).toBe('rtl');
    expect(result.dialogDirection).toBe('rtl');
  });

  it('defaults to dir="ltr" with no rtl ancestor', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-modal><p>Body</p></aegov-modal>');
    const host = await page.find('aegov-modal');
    await host.callMethod('show');
    await page.waitForChanges();

    const hostDir = await page.evaluate(() => document.querySelector('aegov-modal')!.getAttribute('dir'));
    expect(hostDir).toBe('ltr');
  });

  // aegov-button is shadow:true — a direct .focus() call on its host previously
  // silently no-op'd (no delegatesFocus, no reflected tabindex), dropping focus
  // to <body> instead of back to the trigger. Regression coverage for #66.
  it('restores focus to a shadow-DOM (aegov-button) trigger after close', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-button id="trigger">Open</aegov-button>
      <aegov-modal><p>Content</p></aegov-modal>
    `);
    const triggerBtn = await page.find('aegov-button#trigger >>> button');
    await triggerBtn.click();
    await page.waitForChanges();

    const modal = await page.find('aegov-modal');
    await modal.callMethod('show');
    await page.waitForChanges();
    await modal.callMethod('close');
    // close() schedules the actual isOpen=false (and the focus-restore it
    // triggers) behind a real 200ms setTimeout — waitForChanges() alone only
    // flushes Stencil's render queue, not real timers, so a missing wait here
    // previously made this test fail even though the real fix works (focus
    // was still correct, just not yet restored at the moment of the check).
    await new Promise(resolve => setTimeout(resolve, 300));
    await page.waitForChanges();

    const focusState = await page.evaluate(() => {
      const host = document.activeElement as (Element & { shadowRoot?: ShadowRoot }) | null;
      return { hostTag: host?.tagName, deepActiveTag: host?.shadowRoot?.activeElement?.tagName ?? null };
    });
    expect(focusState.hostTag).toBe('AEGOV-BUTTON');
    expect(focusState.deepActiveTag).toBe('BUTTON');
  });
});

describe('aegov-modal (e2e) nested', () => {
  it('Escape closes only the top modal of a nested pair', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-modal id="a" label="A"><button id="a1">a1</button></aegov-modal>
      <aegov-modal id="b" label="B"><button id="b1">b1</button></aegov-modal>`);
    await page.$eval('#a', (m: any) => m.show());
    await page.waitForChanges();
    await page.$eval('#b', (m: any) => m.show());
    await page.waitForChanges();
    await new Promise(r => setTimeout(r, 100));
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 400));
    await page.waitForChanges();
    expect(await page.$eval('#b', (m: any) => m.isOpen)).toBe(false);
    expect(await page.$eval('#a', (m: any) => m.isOpen)).toBe(true);
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 400));
    await page.waitForChanges();
    expect(await page.$eval('#a', (m: any) => m.isOpen)).toBe(false);
  });
});
