import { newE2EPage } from '@stencil/core/testing';

describe('aegov-popover (e2e)', () => {
  it('renders trigger with default ARIA', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-popover><button>Open</button></aegov-popover>');
    const trigger = await page.find('aegov-popover .aegov-popover-trigger');
    expect(trigger).not.toBeNull();
    // Per WCAG 4.1.2 the state goes on the focusable child, not the wrapper.
    const inner = await page.find('aegov-popover .aegov-popover-trigger button');
    expect(inner.getAttribute('aria-haspopup')).toBe('dialog');
    expect(inner.getAttribute('aria-expanded')).toBe('false');
  });

  it('opens portal content on trigger click', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-popover>
        <button>Open</button>
        <div slot="popover-content"><a href="#">Link</a></div>
      </aegov-popover>
    `);
    const el = await page.find('aegov-popover');
    const openSpy = await el.spyOnEvent('aegovPopoverOpen');
    const triggerBtn = await page.find('aegov-popover button');
    await triggerBtn.click();
    await page.waitForChanges();
    expect(openSpy).toHaveReceivedEventTimes(1);
    const portal = await page.find('.aegov-popover-portal .aegov-popover');
    expect(portal).not.toBeNull();
    expect(portal.getAttribute('role')).toBe('dialog');
  });

  // Regression coverage for #58. The portal div's own createPortal() util
  // never copies any dir attribute, so the panel (moved to document.body,
  // several levels outside any local dir="rtl" ancestor wrapper) reverted
  // to whatever <html>/<body> had instead of inheriting the local wrapper's
  // direction — the same portal-vs-dir gap already found and fixed in
  // aegov-datepicker (#37), aegov-dropdown (#41), and aegov-modal (#53).
  it('carries dir="rtl" from a local ancestor wrapper onto the portalled panel', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div dir="rtl">
        <aegov-popover>
          <button>Open</button>
          <div slot="popover-content"><a href="#">Link</a></div>
        </aegov-popover>
      </div>
    `);
    const triggerBtn = await page.find('aegov-popover button');
    await triggerBtn.click();
    await page.waitForChanges();

    const result = await page.evaluate(() => {
      const panel = document.querySelector('.aegov-popover-portal .aegov-popover');
      const portalDiv = panel?.closest('.aegov-popover-portal');
      return {
        portalDir: portalDiv?.getAttribute('dir'),
        panelDirection: panel ? getComputedStyle(panel).direction : null,
      };
    });
    expect(result.portalDir).toBe('rtl');
    expect(result.panelDirection).toBe('rtl');
  });

  it('defaults to dir="ltr" with no rtl ancestor', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-popover>
        <button>Open</button>
        <div slot="popover-content"><a href="#">Link</a></div>
      </aegov-popover>
    `);
    const triggerBtn = await page.find('aegov-popover button');
    await triggerBtn.click();
    await page.waitForChanges();

    const portalDir = await page.evaluate(() => document.querySelector('.aegov-popover-portal')?.getAttribute('dir'));
    expect(portalDir).toBe('ltr');
  });

  it('renders arrow element in portal', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-popover>
        <button>Open</button>
        <div slot="popover-content">Hi</div>
      </aegov-popover>
    `);
    const triggerBtn = await page.find('aegov-popover button');
    await triggerBtn.click();
    await page.waitForChanges();
    const arrow = await page.find('.aegov-popover-portal .aegov-popover__arrow');
    expect(arrow).not.toBeNull();
  });

  it('aria-expanded toggles when opened', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-popover>
        <button>Open</button>
        <div slot="popover-content">x</div>
      </aegov-popover>
    `);
    const triggerBtn = await page.find('aegov-popover button');
    await triggerBtn.click();
    await page.waitForChanges();
    const inner = await page.find('aegov-popover .aegov-popover-trigger button');
    expect(inner.getAttribute('aria-expanded')).toBe('true');
  });

  it('Escape closes the popover', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-popover>
        <button>Open</button>
        <div slot="popover-content"><a href="#">x</a></div>
      </aegov-popover>
    `);
    const el = await page.find('aegov-popover');
    const closeSpy = await el.spyOnEvent('aegovPopoverClose');
    const triggerBtn = await page.find('aegov-popover button');
    await triggerBtn.click();
    await page.waitForChanges();
    await page.keyboard.press('Escape');
    await page.waitForChanges();
    expect(closeSpy).toHaveReceivedEventTimes(1);
  });

  it('outside click closes the popover', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div>
        <aegov-popover>
          <button>Open</button>
          <div slot="popover-content"><a href="#">x</a></div>
        </aegov-popover>
        <p id="outside">x</p>
      </div>
    `);
    const el = await page.find('aegov-popover');
    const closeSpy = await el.spyOnEvent('aegovPopoverClose');
    const triggerBtn = await page.find('aegov-popover button');
    await triggerBtn.click();
    await page.waitForChanges();
    await page.click('#outside');
    await page.waitForChanges();
    expect(closeSpy).toHaveReceivedEventTimes(1);
  });

  it('disabled popover does not open on click', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-popover is-disabled="true">
        <button>Open</button>
        <div slot="popover-content">x</div>
      </aegov-popover>
    `);
    const el = await page.find('aegov-popover');
    const openSpy = await el.spyOnEvent('aegovPopoverOpen');
    const triggerBtn = await page.find('aegov-popover button');
    await triggerBtn.click();
    await page.waitForChanges();
    expect(openSpy).toHaveReceivedEventTimes(0);
  });

  it('moves slot content into portal on open and back on close', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-popover>
        <button>Open</button>
        <div slot="popover-content" id="pop-content"><a href="#">x</a></div>
      </aegov-popover>
    `);
    const triggerBtn = await page.find('aegov-popover button');
    await triggerBtn.click();
    await page.waitForChanges();
    const inPortal = await page.find('.aegov-popover-portal #pop-content');
    expect(inPortal).not.toBeNull();
    await page.keyboard.press('Escape');
    await page.waitForChanges();
    const stillInPortal = await page.find('.aegov-popover-portal #pop-content');
    expect(stillInPortal).toBeNull();
  });

  // Regression coverage for #60. The portal div itself (not just its content)
  // used to be created eagerly in componentDidLoad() and only ever have its
  // innerHTML cleared on close, leaving one permanent empty div in
  // document.body per popover instance for the component's whole lifetime.
  // Portal creation is now lazy (first open) and the div itself is removed
  // on close, mirroring disconnectedCallback()'s own teardown.
  it('does not create a portal div until first open, and removes it (not just its content) on close', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-popover>
        <button>Open</button>
        <div slot="popover-content"><a href="#">x</a></div>
      </aegov-popover>
    `);
    const beforeOpen = await page.evaluate(() => document.querySelectorAll('.aegov-popover-portal').length);
    expect(beforeOpen).toBe(0);

    const triggerBtn = await page.find('aegov-popover button');
    await triggerBtn.click();
    await page.waitForChanges();
    const afterOpen = await page.evaluate(() => document.querySelectorAll('.aegov-popover-portal').length);
    expect(afterOpen).toBe(1);

    await page.keyboard.press('Escape');
    await page.waitForChanges();
    const afterClose = await page.evaluate(() => document.querySelectorAll('.aegov-popover-portal').length);
    expect(afterClose).toBe(0);

    // Re-opening the same instance must recreate the div, not leave it gone.
    await triggerBtn.click();
    await page.waitForChanges();
    const afterReopen = await page.evaluate(() => document.querySelectorAll('.aegov-popover-portal').length);
    expect(afterReopen).toBe(1);
  });

  // aegov-button is shadow:true — a direct .focus() call on its host previously
  // silently no-op'd (no delegatesFocus, no reflected tabindex), dropping focus
  // to <body> instead of back to the trigger. Regression coverage for #66.
  it('restores focus to a shadow-DOM (aegov-button) trigger after Escape closes it', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-popover>
        <aegov-button>Open</aegov-button>
        <div slot="popover-content"><a href="#">Link</a></div>
      </aegov-popover>
    `);
    const triggerBtn = await page.find('aegov-popover aegov-button >>> button');
    await triggerBtn.click();
    await page.waitForChanges();
    await page.keyboard.press('Tab');
    await page.waitForChanges();
    await page.keyboard.press('Escape');
    await page.waitForChanges();

    const focusState = await page.evaluate(() => {
      const host = document.activeElement as (Element & { shadowRoot?: ShadowRoot }) | null;
      return { hostTag: host?.tagName, deepActiveTag: host?.shadowRoot?.activeElement?.tagName ?? null };
    });
    expect(focusState.hostTag).toBe('AEGOV-BUTTON');
    expect(focusState.deepActiveTag).toBe('BUTTON');
  });
});
