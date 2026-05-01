import { newE2EPage } from '@stencil/core/testing';

describe('aegov-dropdown (e2e)', () => {
  it('renders trigger wrapper with ARIA', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-dropdown><button>Open</button></aegov-dropdown>');
    const trigger = await page.find('aegov-dropdown .aegov-dropdown-trigger');
    expect(trigger).not.toBeNull();
    expect(trigger.getAttribute('aria-haspopup')).toBe('true');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('opens portal content on trigger click', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-dropdown>
        <button>Open</button>
        <div slot="dropdown-content"><a href="#">Item</a></div>
      </aegov-dropdown>
    `);
    const el = await page.find('aegov-dropdown');
    const openSpy = await el.spyOnEvent('aegovDropdownOpen');
    const triggerBtn = await page.find('aegov-dropdown button');
    await triggerBtn.click();
    await page.waitForChanges();
    expect(openSpy).toHaveReceivedEventTimes(1);
    const portal = await page.find('.aegov-dropdown-portal .aegov-dropdown');
    expect(portal).not.toBeNull();
    expect(portal.getAttribute('role')).toBe('menu');
  });

  it('aria-expanded toggles when opened', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-dropdown>
        <button>Open</button>
        <div slot="dropdown-content"><a href="#">Item</a></div>
      </aegov-dropdown>
    `);
    const triggerBtn = await page.find('aegov-dropdown button');
    await triggerBtn.click();
    await page.waitForChanges();
    const trigger = await page.find('aegov-dropdown .aegov-dropdown-trigger');
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('Escape closes the dropdown', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-dropdown>
        <button>Open</button>
        <div slot="dropdown-content"><a href="#">Item</a></div>
      </aegov-dropdown>
    `);
    const el = await page.find('aegov-dropdown');
    const closeSpy = await el.spyOnEvent('aegovDropdownClose');
    const triggerBtn = await page.find('aegov-dropdown button');
    await triggerBtn.click();
    await page.waitForChanges();
    await page.keyboard.press('Escape');
    await page.waitForChanges();
    expect(closeSpy).toHaveReceivedEventTimes(1);
  });

  it('outside click closes the dropdown', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div>
        <aegov-dropdown>
          <button>Open</button>
          <div slot="dropdown-content"><a href="#">Item</a></div>
        </aegov-dropdown>
        <p id="outside">elsewhere</p>
      </div>
    `);
    const el = await page.find('aegov-dropdown');
    const closeSpy = await el.spyOnEvent('aegovDropdownClose');
    const triggerBtn = await page.find('aegov-dropdown button');
    await triggerBtn.click();
    await page.waitForChanges();
    await page.click('#outside');
    await page.waitForChanges();
    expect(closeSpy).toHaveReceivedEventTimes(1);
  });

  it('disabled dropdown does not open on click', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-dropdown is-disabled="true">
        <button>Open</button>
        <div slot="dropdown-content"><a href="#">Item</a></div>
      </aegov-dropdown>
    `);
    const el = await page.find('aegov-dropdown');
    const openSpy = await el.spyOnEvent('aegovDropdownOpen');
    const triggerBtn = await page.find('aegov-dropdown button');
    await triggerBtn.click();
    await page.waitForChanges();
    expect(openSpy).toHaveReceivedEventTimes(0);
  });

  it('toggle() method opens and closes', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-dropdown>
        <button>Open</button>
        <div slot="dropdown-content"><a href="#">Item</a></div>
      </aegov-dropdown>
    `);
    const el = await page.find('aegov-dropdown');
    const openSpy = await el.spyOnEvent('aegovDropdownOpen');
    const closeSpy = await el.spyOnEvent('aegovDropdownClose');
    await el.callMethod('toggle');
    await page.waitForChanges();
    expect(openSpy).toHaveReceivedEventTimes(1);
    await el.callMethod('toggle');
    await page.waitForChanges();
    expect(closeSpy).toHaveReceivedEventTimes(1);
  });

  it('moves slot content into portal on open and back on close', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-dropdown>
        <button>Open</button>
        <div slot="dropdown-content" id="dd-content"><a href="#">Item</a></div>
      </aegov-dropdown>
    `);
    const el = await page.find('aegov-dropdown');
    await el.callMethod('toggle');
    await page.waitForChanges();
    const inPortal = await page.find('.aegov-dropdown-portal #dd-content');
    expect(inPortal).not.toBeNull();
    await el.callMethod('toggle');
    await page.waitForChanges();
    const stillInPortal = await page.find('.aegov-dropdown-portal #dd-content');
    expect(stillInPortal).toBeNull();
  });
});
