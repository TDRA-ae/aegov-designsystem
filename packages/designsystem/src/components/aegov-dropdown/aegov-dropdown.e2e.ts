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

  it('Escape closes a mouse-opened menu for a shadow-DOM (aegov-button) trigger', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-dropdown>
        <aegov-button>Open</aegov-button>
        <div slot="dropdown-content"><a href="#">Item</a></div>
      </aegov-dropdown>
    `);
    const el = await page.find('aegov-dropdown');
    const closeSpy = await el.spyOnEvent('aegovDropdownClose');
    const triggerBtn = await page.find('aegov-dropdown aegov-button >>> button');
    await triggerBtn.click();
    await page.waitForChanges();
    // Mouse-opened: focus deliberately stays on the trigger, not the menu.
    await page.keyboard.press('Escape');
    await page.waitForChanges();
    // Before the fix, the final containment guard compared getDeepActiveElement()
    // (which drills into aegov-button's shadow root to find the real inner
    // <button>) against triggerRef.contains() (plain, shadow-blind) — the deep
    // element was never seen as "contained", so the guard concluded focus wasn't
    // within this instance and silently swallowed Escape.
    expect(closeSpy).toHaveReceivedEventTimes(1);
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

  // Regression coverage for #40. `align` is logical (reading-direction-relative),
  // not physical: `start` must anchor to the trigger's reading-direction-start
  // edge (left in LTR, right in RTL) and `end` to its reading-direction-end edge.
  it("mirrors align='start'/'end' against the effective direction under dir=\"rtl\"", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <!-- left:400px leaves room for the panel; nearer the edge viewport clamping would mask the alignment -->
      <div dir="rtl" style="position:fixed; top:50px; left:400px;">
        <aegov-dropdown align="start">
          <button id="rtl-trigger">Open</button>
          <div slot="dropdown-content"><a href="#">Item</a></div>
        </aegov-dropdown>
      </div>
    `);
    const triggerBtn = await page.find('#rtl-trigger');
    await triggerBtn.click();
    await page.waitForChanges();

    const rects = await page.evaluate(() => {
      const trigger = document.getElementById('rtl-trigger').getBoundingClientRect();
      const panel = document.querySelector('.aegov-dropdown-portal .aegov-dropdown[data-state="open"]').getBoundingClientRect();
      return { triggerRight: trigger.right, panelRight: panel.right };
    });
    // Before the fix, calculateHorizontalPosition() switched purely on the
    // literal align value with no direction check, so align="start" stayed
    // pinned to the trigger's physical left edge even under dir="rtl".
    expect(Math.abs(rects.panelRight - rects.triggerRight)).toBeLessThan(1);
  });

  // Regression coverage for #41. The portal is appended directly to
  // document.body, outside the example's local dir="rtl" wrapper — without
  // renderPortalContent() setting dir explicitly, menu item text silently
  // renders flush-left instead of flush-right inside an RTL page.
  it('renders menu item text flush-right when opened inside a dir="rtl" ancestor', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div dir="rtl">
        <aegov-dropdown>
          <button id="rtl-items-trigger">Open</button>
          <div slot="dropdown-content">
            <a href="#" id="short">Short</a>
            <a href="#" id="longer">A much longer item label</a>
          </div>
        </aegov-dropdown>
      </div>
    `);
    const triggerBtn = await page.find('#rtl-items-trigger');
    await triggerBtn.click();
    await page.waitForChanges();

    const rects = await page.evaluate(() => {
      function textRect(el) {
        const range = document.createRange();
        range.selectNodeContents(el.firstChild);
        // Plain object: a DOMRect serializes to {} across page.evaluate.
        const { left, right } = range.getBoundingClientRect();
        return { left, right };
      }
      const portal = document.querySelector('.aegov-dropdown-portal');
      return {
        portalDir: portal.getAttribute('dir'),
        short: textRect(document.getElementById('short')),
        longer: textRect(document.getElementById('longer')),
      };
    });
    expect(rects.portalDir).toBe('rtl');
    // Before the fix, both items' text shared the same LEFT edge (flush-left).
    // Flush-right means they share the same RIGHT edge instead, with varying
    // left edges based on each label's length.
    expect(Math.abs(rects.short.right - rects.longer.right)).toBeLessThan(1);
    expect(Math.abs(rects.short.left - rects.longer.left)).toBeGreaterThan(1);
  });

  // Regression coverage for #42. Both handleTriggerMouseLeave (leaving the
  // nested trigger directly) and handleDropdownMouseLeave (leaving the nested
  // submenu's own panel) used to check `relatedTarget.closest('.aegov-dropdown-portal')`,
  // which matches ANY dropdown's portal — including an ANCESTOR's own portal
  // (e.g. an unrelated sibling item in the parent menu) — so a hover-opened
  // submenu stayed open indefinitely once the pointer left for anywhere else
  // in the parent menu.
  it('closes a hover-opened nested submenu when the pointer leaves its trigger for an unrelated sibling item, keeping the parent open', async () => {
    const page = await newE2EPage();
    await page.setContent(nestedHtml);
    const triggerBtn = await page.find('aegov-dropdown button');
    await triggerBtn.click();
    await page.waitForChanges();

    await page.hover('#visa-services');
    await page.waitForChanges();
    await new Promise(r => setTimeout(r, 250));
    await page.waitForChanges();
    expect(await page.evaluate(() => document.querySelectorAll('.aegov-dropdown-portal [role="menu"]').length)).toBe(2);

    await page.hover('#check-status');
    await new Promise(r => setTimeout(r, 200));
    await page.waitForChanges();

    const state = await page.evaluate(() => ({
      openMenus: document.querySelectorAll('.aegov-dropdown-portal [role="menu"]').length,
      visaAriaExpanded: document.getElementById('visa-services')?.getAttribute('aria-expanded'),
    }));
    expect(state.openMenus).toBe(1);
    expect(state.visaAriaExpanded).toBe('false');
  });

  it('closes a hover-opened nested submenu when the pointer leaves its own panel for an unrelated sibling item', async () => {
    const page = await newE2EPage();
    await page.setContent(nestedHtml);
    const triggerBtn = await page.find('aegov-dropdown button');
    await triggerBtn.click();
    await page.waitForChanges();

    await page.hover('#visa-services');
    await new Promise(r => setTimeout(r, 250));
    await page.waitForChanges();

    // Move INTO the submenu's own panel first (not just hovering the trigger)
    await page.hover('#visit-visa');
    await new Promise(r => setTimeout(r, 250));
    await page.waitForChanges();
    expect(await page.evaluate(() => document.querySelectorAll('.aegov-dropdown-portal [role="menu"]').length)).toBe(2);

    await page.hover('#check-status');
    await new Promise(r => setTimeout(r, 200));
    await page.waitForChanges();

    expect(await page.evaluate(() => document.querySelectorAll('.aegov-dropdown-portal [role="menu"]').length)).toBe(1);
  });
});
