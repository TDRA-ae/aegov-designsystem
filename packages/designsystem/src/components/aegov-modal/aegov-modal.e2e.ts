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
});
