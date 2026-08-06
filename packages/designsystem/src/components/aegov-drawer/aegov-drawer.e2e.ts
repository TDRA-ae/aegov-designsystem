import { newE2EPage } from '@stencil/core/testing';

describe('aegov-drawer (e2e)', () => {
  it('does not render dialog when closed', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-drawer></aegov-drawer>');
    const dialog = await page.find('aegov-drawer >>> [role="dialog"]');
    expect(dialog).toBeNull();
  });

  it('renders dialog with role and aria-modal when opened', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-drawer is-open="true"><p>Body</p></aegov-drawer>');
    const dialog = await page.find('aegov-drawer >>> [role="dialog"]');
    expect(dialog).not.toBeNull();
    expect(dialog.getAttribute('aria-modal')).toBe('true');
  });

  it('show() emits aegovDrawerOpen', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-drawer></aegov-drawer>');
    const el = await page.find('aegov-drawer');
    const spy = await el.spyOnEvent('aegovDrawerOpen');
    await el.callMethod('show');
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
  });

  it('close() emits aegovDrawerClose after animation', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-drawer is-open="true"></aegov-drawer>');
    const el = await page.find('aegov-drawer');
    const spy = await el.spyOnEvent('aegovDrawerClose');
    await el.callMethod('close');
    await new Promise(resolve => setTimeout(resolve, 400));
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
  });

  it('Escape key closes the drawer', async () => {
    const page = await newE2EPage();
    // Open the drawer via property change so the @Watch('isOpen') runs and
    // attaches the document-level keydown handler.
    await page.setContent('<aegov-drawer><button>x</button></aegov-drawer>');
    const el = await page.find('aegov-drawer');
    const escSpy = await el.spyOnEvent('aegovDrawerEscapePress');
    const closeSpy = await el.spyOnEvent('aegovDrawerClose');
    await el.setProperty('isOpen', true);
    await page.waitForChanges();
    await new Promise(resolve => setTimeout(resolve, 350));
    await page.keyboard.press('Escape');
    await new Promise(resolve => setTimeout(resolve, 350));
    await page.waitForChanges();
    expect(escSpy).toHaveReceivedEventTimes(1);
    expect(closeSpy).toHaveReceivedEventTimes(1);
  });

  it('backdrop click closes the drawer', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-drawer is-open="true"></aegov-drawer>');
    const el = await page.find('aegov-drawer');
    const spy = await el.spyOnEvent('aegovDrawerBackdropClick');
    const backdrop = await page.find('aegov-drawer >>> .aegov-drawer-backdrop');
    await backdrop.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
  });

  it('does not close on backdrop when is-close-with-overlay is false', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-drawer is-open="true" is-close-with-overlay="false"></aegov-drawer>');
    const el = await page.find('aegov-drawer');
    const closeSpy = await el.spyOnEvent('aegovDrawerClose');
    const backdrop = await page.find('aegov-drawer >>> .aegov-drawer-backdrop');
    await backdrop.click();
    await new Promise(resolve => setTimeout(resolve, 400));
    await page.waitForChanges();
    expect(closeSpy).toHaveReceivedEventTimes(0);
  });

  it('preventDefault on aegovDrawerBeforeClose cancels the close', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-drawer is-open="true"></aegov-drawer>');
    await page.evaluate(() => {
      const d = document.querySelector('aegov-drawer') as HTMLElement;
      d.addEventListener('aegovDrawerBeforeClose', (e: Event) => e.preventDefault());
    });
    const el = await page.find('aegov-drawer');
    const closeSpy = await el.spyOnEvent('aegovDrawerClose');
    await el.callMethod('close');
    await new Promise(resolve => setTimeout(resolve, 400));
    await page.waitForChanges();
    expect(closeSpy).toHaveReceivedEventTimes(0);
  });

  it('renders slotted content inside the drawer', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-drawer is-open="true"><p id="x">hi</p></aegov-drawer>');
    const slotted = await page.find('aegov-drawer p#x');
    expect(slotted).not.toBeNull();
  });

  it('applies position class', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-drawer is-open="true" position="left"></aegov-drawer>');
    const container = await page.find('aegov-drawer >>> .drawer-container--left');
    expect(container).not.toBeNull();
  });
});
