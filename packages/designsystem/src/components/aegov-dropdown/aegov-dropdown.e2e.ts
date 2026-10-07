import { newE2EPage } from '@stencil/core/testing';

describe('aegov-dropdown (e2e)', () => {
  it('renders trigger wrapper with ARIA', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-dropdown><button>Open</button></aegov-dropdown>');
    const trigger = await page.find('aegov-dropdown .aegov-dropdown-trigger');
    expect(trigger).not.toBeNull();
    // Per WCAG 4.1.2 the state goes on the focusable child, and the menu-button pattern
    // uses aria-haspopup="menu".
    const inner = await page.find('aegov-dropdown .aegov-dropdown-trigger button');
    expect(inner.getAttribute('aria-haspopup')).toBe('menu');
    expect(inner.getAttribute('aria-expanded')).toBe('false');
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
    const inner = await page.find('aegov-dropdown .aegov-dropdown-trigger button');
    expect(inner.getAttribute('aria-expanded')).toBe('true');
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

  // aegov-button is shadow:true — its real inner <button> lives in its own shadow
  // root, unreachable by a plain querySelector from the dropdown's light-DOM
  // trigger wrapper. Every other test in this file uses a plain <button>, which
  // never exercises that path — regression coverage for #39.
  it('syncs aria-expanded/aria-haspopup onto a shadow-DOM (aegov-button) trigger', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-dropdown>
        <aegov-button>Open</aegov-button>
        <div slot="dropdown-content"><a href="#">Item</a></div>
      </aegov-dropdown>
    `);
    const readAria = () => page.evaluate(() => {
      const btn = document.querySelector('aegov-dropdown aegov-button').shadowRoot.querySelector('button');
      return { haspopup: btn.getAttribute('aria-haspopup'), expanded: btn.getAttribute('aria-expanded') };
    });

    expect(await readAria()).toEqual({ haspopup: 'menu', expanded: 'false' });

    const el = await page.find('aegov-dropdown');
    await el.callMethod('toggle');
    await page.waitForChanges();

    expect(await readAria()).toEqual({ haspopup: 'menu', expanded: 'true' });
  });

  it('ArrowDown after a mouse-opened menu focuses the first item for a shadow-DOM (aegov-button) trigger', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-dropdown>
        <aegov-button>Open</aegov-button>
        <div slot="dropdown-content">
          <a href="#" id="item-1">Item 1</a>
          <a href="#" id="item-2">Item 2</a>
        </div>
      </aegov-dropdown>
    `);
    const triggerBtn = await page.find('aegov-dropdown aegov-button >>> button');
    await triggerBtn.click();
    await page.waitForChanges();
    await page.keyboard.press('ArrowDown');
    await page.waitForChanges();
    const activeId = await page.evaluate(() => document.activeElement?.id);
    // Before the fix, isTriggerFocused was always false for a shadow-DOM trigger,
    // so this fell through to cycleFocus and landed on item-2 instead of item-1.
    expect(activeId).toBe('item-1');
  });
});
