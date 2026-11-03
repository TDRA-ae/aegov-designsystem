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

  // aegov-button is shadow:true — a direct .focus() call on its host previously
  // silently no-op'd (no delegatesFocus, no reflected tabindex), dropping focus
  // to <body> instead of back to the trigger. Regression coverage for #66.
  it('restores focus to a shadow-DOM (aegov-button) trigger after close', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-button id="trigger">Open</aegov-button>
      <aegov-drawer><p>Content</p></aegov-drawer>
    `);
    const triggerBtn = await page.find('aegov-button#trigger >>> button');
    await triggerBtn.click();
    await page.waitForChanges();

    const drawer = await page.find('aegov-drawer');
    await drawer.callMethod('show');
    await page.waitForChanges();
    await drawer.callMethod('close');
    await page.waitForChanges();

    const focusState = await page.evaluate(() => {
      const host = document.activeElement as (Element & { shadowRoot?: ShadowRoot }) | null;
      return { hostTag: host?.tagName, deepActiveTag: host?.shadowRoot?.activeElement?.tagName ?? null };
    });
    expect(focusState.hostTag).toBe('AEGOV-BUTTON');
    expect(focusState.deepActiveTag).toBe('BUTTON');
  });

  // Moving to document.body detaches the drawer from any dir="rtl" ancestor
  // wrapper, so it pins the direction it had where it was declared while open
  // (same as aegov-modal, #53) and removes it again on close.
  it('carries dir="rtl" from a local ancestor wrapper after the move to document.body, and drops it on close', async () => {
    const page = await newE2EPage();
    await page.setContent('<div dir="rtl"><aegov-drawer animation="none"><p>Body</p></aegov-drawer></div>');
    const host = await page.find('aegov-drawer');
    await host.callMethod('show');
    await page.waitForChanges();

    const open = await page.evaluate(() => {
      const drawer = document.querySelector('aegov-drawer')!;
      const content = drawer.shadowRoot!.querySelector('.aegov-drawer-content');
      return {
        hostDir: drawer.getAttribute('dir'),
        parentIsBody: drawer.parentElement === document.body,
        contentDirection: content ? getComputedStyle(content).direction : null,
      };
    });
    expect(open.parentIsBody).toBe(true);
    expect(open.hostDir).toBe('rtl');
    expect(open.contentDirection).toBe('rtl');

    await host.callMethod('close');
    await page.waitForFunction(() => document.querySelector('aegov-drawer')!.parentElement !== document.body);
    const closedDir = await page.evaluate(() => document.querySelector('aegov-drawer')!.getAttribute('dir'));
    expect(closedDir).toBeNull();
  });

  it('keeps an author-supplied dir on the host', async () => {
    const page = await newE2EPage();
    await page.setContent('<div dir="rtl"><aegov-drawer dir="ltr" animation="none"><p>Body</p></aegov-drawer></div>');
    const host = await page.find('aegov-drawer');
    await host.callMethod('show');
    await page.waitForChanges();
    expect(await page.evaluate(() => document.querySelector('aegov-drawer')!.getAttribute('dir'))).toBe('ltr');
  });
});
