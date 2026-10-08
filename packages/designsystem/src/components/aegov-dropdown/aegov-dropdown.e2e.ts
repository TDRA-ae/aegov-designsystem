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

  // Nested dropdown regression coverage (#67). The documented nested pattern is
  // a plain <a href="#"> used as a submenu trigger, placed inside the parent's
  // dropdown-content.
  const nestedHtml = `
    <aegov-dropdown>
      <button>Apply for service</button>
      <div slot="dropdown-content">
        <a href="#new" id="new-application">New application</a>
        <aegov-dropdown trigger="hover" position="right">
          <a href="#" id="visa-services">Visa services</a>
          <div slot="dropdown-content">
            <a href="#visit" id="visit-visa">Visit visa</a>
            <a href="#work" id="work-visa">Work visa</a>
            <a href="#golden" id="golden-visa">Golden visa</a>
          </div>
        </aegov-dropdown>
        <a href="#status" id="check-status">Check application status</a>
      </div>
    </aegov-dropdown>
  `;

  it('activating a nested dropdown trigger does not navigate via its href', async () => {
    const page = await newE2EPage();
    await page.setContent(nestedHtml);
    const triggerBtn = await page.find('aegov-dropdown button');
    await triggerBtn.click();
    await page.waitForChanges();

    const visaTrigger = await page.find('#visa-services');
    await visaTrigger.click();
    await page.waitForChanges();

    const hash = await page.evaluate(() => location.hash);
    // Before the fix, activating the link also ran its default action,
    // navigating to href="#" and scrolling the page to the top.
    expect(hash).toBe('');
  });

  it("parent Tab/ArrowDown cycling skips a closed nested dropdown's own (hidden) items", async () => {
    const page = await newE2EPage();
    await page.setContent(nestedHtml);
    const triggerBtn = await page.find('aegov-dropdown button');
    await triggerBtn.click();
    await page.waitForChanges();

    const sequence: (string | undefined)[] = [];
    for (let i = 0; i < 4; i++) {
      await page.keyboard.press(i === 0 ? 'Tab' : 'ArrowDown');
      await page.waitForChanges();
      sequence.push(await page.evaluate(() => document.activeElement?.id));
    }
    // Before the fix, the parent's own focusableElements list was polluted with
    // the nested dropdown's (closed, hidden) menu items via a plain
    // querySelectorAll, corrupting currentFocusIndex-based navigation.
    expect(sequence).toEqual(['new-application', 'visa-services', 'check-status', 'new-application']);
  });

  it('ArrowRight opens a nested submenu to its first item; ArrowLeft closes it and returns focus to its trigger', async () => {
    const page = await newE2EPage();
    await page.setContent(nestedHtml);
    const triggerBtn = await page.find('aegov-dropdown button');
    await triggerBtn.click();
    await page.waitForChanges();
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement?.id)).toBe('visa-services');

    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement?.id)).toBe('visit-visa');

    await page.keyboard.press('ArrowLeft');
    await page.waitForChanges();
    const state = await page.evaluate(() => ({
      activeId: document.activeElement?.id,
      openMenus: document.querySelectorAll('.aegov-dropdown-portal .aegov-dropdown').length,
    }));
    expect(state.activeId).toBe('visa-services');
    expect(state.openMenus).toBe(1); // only the parent remains open
  });

  it('Escape inside a nested submenu closes only the submenu, not the parent', async () => {
    const page = await newE2EPage();
    await page.setContent(nestedHtml);
    const triggerBtn = await page.find('aegov-dropdown button');
    await triggerBtn.click();
    await page.waitForChanges();
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement?.id)).toBe('visit-visa');

    await page.keyboard.press('Escape');
    await page.waitForChanges();
    const state = await page.evaluate(() => ({
      activeId: document.activeElement?.id,
      openMenus: document.querySelectorAll('.aegov-dropdown-portal .aegov-dropdown').length,
    }));
    // Before the fix, Escape had no per-instance containment check, so both the
    // nested submenu AND its parent closed at once, throwing focus all the way
    // back to the outermost trigger instead of just the submenu's own trigger.
    expect(state.activeId).toBe('visa-services');
    expect(state.openMenus).toBe(1);
  });
});
