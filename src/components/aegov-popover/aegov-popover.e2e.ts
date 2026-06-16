import { newE2EPage } from '@stencil/core/testing';

describe('aegov-popover (e2e)', () => {
  it('renders trigger with default ARIA', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-popover><button>Open</button></aegov-popover>');
    const trigger = await page.find('aegov-popover .aegov-popover-trigger');
    expect(trigger).not.toBeNull();
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
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
    const trigger = await page.find('aegov-popover .aegov-popover-trigger');
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
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
});
