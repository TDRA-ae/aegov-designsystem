/**
 * Navbar + Dropdown — Trigger Variation Tests
 *
 * Tests three trigger modes for aegov-dropdown inside aegov-navbar:
 *   NAV-01 — trigger="hover": opens on mouseenter, closes on mouseleave
 *   NAV-02 — trigger="click": opens on chevron click/keyboard, hover does NOT open
 *   NAV-03 — combined: alternating hover and click triggers in one navbar
 *
 * Shared keyboard tests (both trigger types):
 *   - ArrowDown on chevron → opens + moves focus into menu
 *   - Escape → closes + returns focus to chevron
 */
import { test, expect, Page } from '@playwright/test';

const BASE = 'http://localhost:3333';

// ─── fixture helper ─────────────────────────────────────────────────────────
async function loadNavbarFixture(page: Page, html: string) {
  await page.goto(`${BASE}/docs/pages/aegov-navbar.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => customElements.get('aegov-navbar') !== undefined, { timeout: 15000 });
  await page.evaluate((markup) => {
    // Remove existing page content so our fixture is unambiguous
    const fixture = document.createElement('div');
    fixture.id = 'nav-fixture';
    fixture.style.cssText = 'padding: 40px 20px; position: relative; z-index: 100;';
    fixture.innerHTML = markup;
    document.body.prepend(fixture);
  }, html);
  await page.waitForTimeout(400);
}

// ─── shared fixture HTML ─────────────────────────────────────────────────────
const HOVER_NAV_HTML = `
<aegov-navbar id="nav-hover" label-nav="Hover-only navigation" gap="gap-6">
  <aegov-navbar-item href="#home-h" is-active="true">Home</aegov-navbar-item>
  <aegov-navbar-item href="#services-h">
    Services
    <aegov-dropdown slot="dropdown" trigger="hover" delay-start="0" delay-end="0">
      <div slot="dropdown-content">
        <a href="#visas-h">Visas</a>
        <a href="#passports-h">Passports</a>
        <a href="#customs-h">Customs</a>
      </div>
    </aegov-dropdown>
  </aegov-navbar-item>
  <aegov-navbar-item href="#about-h">
    About
    <aegov-dropdown slot="dropdown" trigger="hover" delay-start="0" delay-end="0">
      <div slot="dropdown-content">
        <a href="#vision-h">Vision</a>
        <a href="#leadership-h">Leadership</a>
      </div>
    </aegov-dropdown>
  </aegov-navbar-item>
  <aegov-navbar-item href="#contact-h">Contact</aegov-navbar-item>
</aegov-navbar>
`;

const CLICK_NAV_HTML = `
<aegov-navbar id="nav-click" label-nav="Click-only navigation" gap="gap-6">
  <aegov-navbar-item href="#home-c" is-active="true">Home</aegov-navbar-item>
  <aegov-navbar-item href="#services-c">
    Services
    <aegov-dropdown slot="dropdown" trigger="click">
      <div slot="dropdown-content">
        <a href="#visas-c">Visas</a>
        <a href="#passports-c">Passports</a>
        <a href="#customs-c">Customs</a>
      </div>
    </aegov-dropdown>
  </aegov-navbar-item>
  <aegov-navbar-item href="#about-c">
    About
    <aegov-dropdown slot="dropdown" trigger="click">
      <div slot="dropdown-content">
        <a href="#vision-c">Vision</a>
        <a href="#leadership-c">Leadership</a>
      </div>
    </aegov-dropdown>
  </aegov-navbar-item>
  <aegov-navbar-item href="#contact-c">Contact</aegov-navbar-item>
</aegov-navbar>
`;

const COMBINED_NAV_HTML = `
<aegov-navbar id="nav-combined" label-nav="Combined navigation" gap="gap-6">
  <aegov-navbar-item href="#home-x" is-active="true">Home</aegov-navbar-item>
  <aegov-navbar-item href="#services-x">
    Services (hover)
    <aegov-dropdown slot="dropdown" trigger="hover" delay-start="0" delay-end="0">
      <div slot="dropdown-content">
        <a href="#visas-x">Visas</a>
        <a href="#passports-x">Passports</a>
      </div>
    </aegov-dropdown>
  </aegov-navbar-item>
  <aegov-navbar-item href="#about-x">
    About (click)
    <aegov-dropdown slot="dropdown" trigger="click">
      <div slot="dropdown-content">
        <a href="#vision-x">Vision</a>
        <a href="#leadership-x">Leadership</a>
      </div>
    </aegov-dropdown>
  </aegov-navbar-item>
  <aegov-navbar-item href="#media-x">
    Media (hover)
    <aegov-dropdown slot="dropdown" trigger="hover" delay-start="0" delay-end="0">
      <div slot="dropdown-content">
        <a href="#news-x">News</a>
        <a href="#press-x">Press</a>
      </div>
    </aegov-dropdown>
  </aegov-navbar-item>
  <aegov-navbar-item href="#contact-x">Contact</aegov-navbar-item>
</aegov-navbar>
`;

// ─── helpers ─────────────────────────────────────────────────────────────────
async function getDropdownChevron(page: Page, navId: string, itemIndex: number) {
  // chevron is in aegov-dropdown light DOM (inserted by wireDropdown)
  return page.locator(`#${navId} aegov-navbar-item:nth-of-type(${itemIndex}) .aegov-navbar-item__chevron`);
}

async function isDropdownOpen(page: Page, navId: string, itemIndex: number): Promise<boolean> {
  const chevron = await getDropdownChevron(page, navId, itemIndex);
  const val = await chevron.getAttribute('aria-expanded');
  return val === 'true';
}

// ═══════════════════════════════════════════════════════════════════════════
// NAV-00 — ARIA semantics: link is plain nav link, chevron owns menu ARIA
// ═══════════════════════════════════════════════════════════════════════════
test.describe('NAV-00 — ARIA: link has no aria-haspopup, chevron owns menu ARIA', () => {

  test('Services link has no aria-haspopup (screen reader: "link, Services" not "menupopup, link, Services")', async ({ page }) => {
    await loadNavbarFixture(page, HOVER_NAV_HTML);

    const link = page.locator('#nav-hover aegov-navbar-item:nth-of-type(2) a.aegov-navbar-item__link');
    const haspopup = await link.getAttribute('aria-haspopup');
    const expanded  = await link.getAttribute('aria-expanded');
    console.log(`\n[NAV-00] Services link — aria-haspopup: "${haspopup}", aria-expanded: "${expanded}"`);
    expect(haspopup).toBeNull();
    expect(expanded).toBeNull();
  });

  test('chevron button has no aria-haspopup (disclosure pattern) and carries aria-expanded', async ({ page }) => {
    await loadNavbarFixture(page, HOVER_NAV_HTML);

    const chevron = page.locator('#nav-hover aegov-navbar-item:nth-of-type(2) .aegov-navbar-item__chevron');
    const haspopup = await chevron.getAttribute('aria-haspopup');
    const expanded  = await chevron.getAttribute('aria-expanded');
    console.log(`\n[NAV-00] chevron — aria-haspopup: "${haspopup}", aria-expanded: "${expanded}"`);
    // Disclosure pattern: chevron opens a nav panel, not a menu → no aria-haspopup
    expect(haspopup).toBeNull();
    expect(expanded).toBe('false');
  });

  test('chevron aria-expanded updates to "true" when dropdown opens', async ({ page }) => {
    await loadNavbarFixture(page, CLICK_NAV_HTML);

    const chevron = page.locator('#nav-click aegov-navbar-item:nth-of-type(2) .aegov-navbar-item__chevron');
    await chevron.click();
    await page.waitForTimeout(150);

    const expanded = await chevron.getAttribute('aria-expanded');
    console.log(`\n[NAV-00] chevron aria-expanded after open: "${expanded}"`);
    expect(expanded).toBe('true');

    // Link still has no aria-expanded
    const link = page.locator('#nav-click aegov-navbar-item:nth-of-type(2) a.aegov-navbar-item__link');
    const linkExpanded = await link.getAttribute('aria-expanded');
    expect(linkExpanded).toBeNull();
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// NAV-01 — trigger="hover"
// ═══════════════════════════════════════════════════════════════════════════
test.describe('NAV-01 — hover trigger', () => {

  test('hover on Services item opens the dropdown', async ({ page }) => {
    await loadNavbarFixture(page, HOVER_NAV_HTML);

    // Hover the aegov-dropdown trigger area (the wrapper rendered by dropdown)
    const servicesDropdown = page.locator('#nav-hover aegov-navbar-item:nth-of-type(2) aegov-dropdown');
    await servicesDropdown.hover();
    await page.waitForTimeout(150);

    const open = await isDropdownOpen(page, 'nav-hover', 2);
    console.log(`\n[NAV-01] hover opened Services dropdown: ${open}`);
    expect(open).toBe(true);
  });

  test('moving mouse away closes the dropdown', async ({ page }) => {
    await loadNavbarFixture(page, HOVER_NAV_HTML);

    const servicesDropdown = page.locator('#nav-hover aegov-navbar-item:nth-of-type(2) aegov-dropdown');
    await servicesDropdown.hover();
    await page.waitForTimeout(150);
    expect(await isDropdownOpen(page, 'nav-hover', 2)).toBe(true);

    // Move mouse to a neutral element (the Home link)
    const homeItem = page.locator('#nav-hover aegov-navbar-item:nth-of-type(1)');
    await homeItem.hover();
    await page.waitForTimeout(300);

    const open = await isDropdownOpen(page, 'nav-hover', 2);
    console.log(`\n[NAV-01] after mouse-leave Services dropdown open: ${open}`);
    expect(open).toBe(false);
  });

  test('ArrowDown on chevron opens the dropdown and focuses first menu item', async ({ page }) => {
    await loadNavbarFixture(page, HOVER_NAV_HTML);

    const chevron = await getDropdownChevron(page, 'nav-hover', 2);
    await chevron.focus();
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(150);

    expect(await isDropdownOpen(page, 'nav-hover', 2)).toBe(true);

    // First menu item should be focused
    const focused = await page.evaluate(() => (document.activeElement as HTMLElement)?.textContent?.trim());
    console.log(`\n[NAV-01] ArrowDown focused: "${focused}"`);
    expect(focused).toBe('Visas');
  });

  test('Escape closes the dropdown and returns focus to the chevron', async ({ page }) => {
    await loadNavbarFixture(page, HOVER_NAV_HTML);

    const chevron = await getDropdownChevron(page, 'nav-hover', 2);
    await chevron.focus();
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(150);
    expect(await isDropdownOpen(page, 'nav-hover', 2)).toBe(true);

    await page.keyboard.press('Escape');
    await page.waitForTimeout(150);

    expect(await isDropdownOpen(page, 'nav-hover', 2)).toBe(false);

    const activeEl = await page.evaluate(() => (document.activeElement as HTMLElement)?.className);
    console.log(`\n[NAV-01] after Escape, focused element class: "${activeEl}"`);
    expect(activeEl).toContain('aegov-navbar-item__chevron');
  });

  test('Tab from chevron (hover-open dropdown) enters the open menu', async ({ page }) => {
    await loadNavbarFixture(page, HOVER_NAV_HTML);

    // Open via ArrowDown (keyboard), which also moves focus to first item.
    // Then go back to chevron and try Tab.
    const chevron = await getDropdownChevron(page, 'nav-hover', 2);
    await chevron.focus();
    await page.keyboard.press('ArrowDown'); // opens and focuses Visas
    await page.waitForTimeout(100);

    // Close, go back, reopen via hover then Tab from chevron
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);

    // Hover to open (no keyboard, so focus stays on chevron)
    const servicesDropdown = page.locator('#nav-hover aegov-navbar-item:nth-of-type(2) aegov-dropdown');
    await servicesDropdown.hover();
    await page.waitForTimeout(200);
    expect(await isDropdownOpen(page, 'nav-hover', 2)).toBe(true);

    // Re-focus the chevron (hover doesn't move focus)
    await chevron.focus();

    // Tab from chevron → should enter menu
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);

    const focused = await page.evaluate(() => (document.activeElement as HTMLElement)?.textContent?.trim());
    console.log(`\n[NAV-01] Tab from chevron (hover-open) entered menu, focused: "${focused}"`);
    expect(focused).toBe('Visas');
  });

  test('Shift+Tab from first menu item (hover dropdown) returns focus to chevron', async ({ page }) => {
    await loadNavbarFixture(page, HOVER_NAV_HTML);

    const chevron = await getDropdownChevron(page, 'nav-hover', 2);
    await chevron.focus();
    await page.keyboard.press('ArrowDown'); // opens + focuses Visas
    await page.waitForTimeout(100);
    expect(await isDropdownOpen(page, 'nav-hover', 2)).toBe(true);

    await page.keyboard.press('Shift+Tab');
    await page.waitForTimeout(200);

    expect(await isDropdownOpen(page, 'nav-hover', 2)).toBe(false);
    const activeClass = await page.evaluate(() => (document.activeElement as HTMLElement)?.className);
    console.log(`\n[NAV-01] Shift+Tab from first menu item — focused class: "${activeClass}"`);
    expect(activeClass).toContain('aegov-navbar-item__chevron');
  });

  test('hover opens Services, then hover About — About opens, Services closes', async ({ page }) => {
    await loadNavbarFixture(page, HOVER_NAV_HTML);

    const servicesDropdown = page.locator('#nav-hover aegov-navbar-item:nth-of-type(2) aegov-dropdown');
    const aboutDropdown = page.locator('#nav-hover aegov-navbar-item:nth-of-type(3) aegov-dropdown');

    await servicesDropdown.hover();
    await page.waitForTimeout(150);
    expect(await isDropdownOpen(page, 'nav-hover', 2)).toBe(true);

    await aboutDropdown.hover();
    await page.waitForTimeout(300);

    const servicesOpen = await isDropdownOpen(page, 'nav-hover', 2);
    const aboutOpen = await isDropdownOpen(page, 'nav-hover', 3);
    console.log(`\n[NAV-01] single-open: services=${servicesOpen}, about=${aboutOpen}`);
    expect(aboutOpen).toBe(true);
    expect(servicesOpen).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// NAV-02 — trigger="click"
// ═══════════════════════════════════════════════════════════════════════════
test.describe('NAV-02 — click trigger', () => {

  test('hover on Services item does NOT open the dropdown', async ({ page }) => {
    await loadNavbarFixture(page, CLICK_NAV_HTML);

    const servicesDropdown = page.locator('#nav-click aegov-navbar-item:nth-of-type(2) aegov-dropdown');
    await servicesDropdown.hover();
    await page.waitForTimeout(300);

    const open = await isDropdownOpen(page, 'nav-click', 2);
    console.log(`\n[NAV-02] hover on click-trigger dropdown open: ${open}`);
    expect(open).toBe(false);
  });

  test('clicking the chevron opens the dropdown', async ({ page }) => {
    await loadNavbarFixture(page, CLICK_NAV_HTML);

    const chevron = await getDropdownChevron(page, 'nav-click', 2);
    await chevron.click();
    await page.waitForTimeout(150);

    const open = await isDropdownOpen(page, 'nav-click', 2);
    console.log(`\n[NAV-02] chevron click opened: ${open}`);
    expect(open).toBe(true);
  });

  test('clicking chevron again closes the dropdown (toggle)', async ({ page }) => {
    await loadNavbarFixture(page, CLICK_NAV_HTML);

    const chevron = await getDropdownChevron(page, 'nav-click', 2);
    await chevron.click();
    await page.waitForTimeout(150);
    expect(await isDropdownOpen(page, 'nav-click', 2)).toBe(true);

    await chevron.click();
    await page.waitForTimeout(150);

    const open = await isDropdownOpen(page, 'nav-click', 2);
    console.log(`\n[NAV-02] second chevron click closed: ${!open}`);
    expect(open).toBe(false);
  });

  test('Enter on chevron opens the dropdown', async ({ page }) => {
    await loadNavbarFixture(page, CLICK_NAV_HTML);

    const chevron = await getDropdownChevron(page, 'nav-click', 2);
    await chevron.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(150);

    const open = await isDropdownOpen(page, 'nav-click', 2);
    console.log(`\n[NAV-02] Enter on chevron opened: ${open}`);
    expect(open).toBe(true);
  });

  test('Space on chevron opens the dropdown', async ({ page }) => {
    await loadNavbarFixture(page, CLICK_NAV_HTML);

    const chevron = await getDropdownChevron(page, 'nav-click', 2);
    await chevron.focus();
    await page.keyboard.press('Space');
    await page.waitForTimeout(150);

    const open = await isDropdownOpen(page, 'nav-click', 2);
    console.log(`\n[NAV-02] Space on chevron opened: ${open}`);
    expect(open).toBe(true);
  });

  test('ArrowDown on chevron opens the dropdown and focuses first menu item', async ({ page }) => {
    await loadNavbarFixture(page, CLICK_NAV_HTML);

    const chevron = await getDropdownChevron(page, 'nav-click', 2);
    await chevron.focus();
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(150);

    expect(await isDropdownOpen(page, 'nav-click', 2)).toBe(true);

    const focused = await page.evaluate(() => (document.activeElement as HTMLElement)?.textContent?.trim());
    console.log(`\n[NAV-02] ArrowDown focused: "${focused}"`);
    expect(focused).toBe('Visas');
  });

  test('Escape closes the dropdown and returns focus to the chevron', async ({ page }) => {
    await loadNavbarFixture(page, CLICK_NAV_HTML);

    const chevron = await getDropdownChevron(page, 'nav-click', 2);
    await chevron.click();
    await page.waitForTimeout(150);
    expect(await isDropdownOpen(page, 'nav-click', 2)).toBe(true);

    await page.keyboard.press('Escape');
    await page.waitForTimeout(150);

    expect(await isDropdownOpen(page, 'nav-click', 2)).toBe(false);

    const activeEl = await page.evaluate(() => (document.activeElement as HTMLElement)?.className);
    console.log(`\n[NAV-02] after Escape, focused element class: "${activeEl}"`);
    expect(activeEl).toContain('aegov-navbar-item__chevron');
  });

  test('Tab from trigger (chevron) enters the open dropdown — focuses first menu item', async ({ page }) => {
    await loadNavbarFixture(page, CLICK_NAV_HTML);

    const chevron = await getDropdownChevron(page, 'nav-click', 2);
    await chevron.click();
    await page.waitForTimeout(150);
    expect(await isDropdownOpen(page, 'nav-click', 2)).toBe(true);

    // Tab forward from chevron → should enter the menu
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);

    const focused = await page.evaluate(() => (document.activeElement as HTMLElement)?.textContent?.trim());
    console.log(`\n[NAV-02] Tab from trigger entered menu, focused: "${focused}"`);
    expect(focused).toBe('Visas');
  });

  test('Tab through all menu items (APG disclosure-nav-hybrid: Tab stays in open menu)', async ({ page }) => {
    await loadNavbarFixture(page, CLICK_NAV_HTML);

    const chevron = await getDropdownChevron(page, 'nav-click', 2);
    await chevron.click();
    await page.waitForTimeout(150);

    // Tab into menu
    await page.keyboard.press('Tab');
    await page.waitForTimeout(50);
    const item1 = await page.evaluate(() => (document.activeElement as HTMLElement)?.textContent?.trim());
    expect(item1).toBe('Visas');

    await page.keyboard.press('Tab');
    await page.waitForTimeout(50);
    const item2 = await page.evaluate(() => (document.activeElement as HTMLElement)?.textContent?.trim());
    expect(item2).toBe('Passports');

    await page.keyboard.press('Tab');
    await page.waitForTimeout(50);
    const item3 = await page.evaluate(() => (document.activeElement as HTMLElement)?.textContent?.trim());
    console.log(`\n[NAV-02] Tab through all items: "${item1}" → "${item2}" → "${item3}"`);
    expect(item3).toBe('Customs');

    // Still inside menu (dropdown still open)
    expect(await isDropdownOpen(page, 'nav-click', 2)).toBe(true);
  });

  test('Tab from last menu item closes dropdown and moves focus to next nav item', async ({ page }) => {
    await loadNavbarFixture(page, CLICK_NAV_HTML);

    const chevron = await getDropdownChevron(page, 'nav-click', 2);
    await chevron.click();
    await page.waitForTimeout(150);

    // Tab through all 3 items (Visas, Passports, Customs) and then Tab off the last
    await page.keyboard.press('Tab'); // → Visas
    await page.keyboard.press('Tab'); // → Passports
    await page.keyboard.press('Tab'); // → Customs
    await page.keyboard.press('Tab'); // → should close and go to About nav item
    await page.waitForTimeout(200);

    expect(await isDropdownOpen(page, 'nav-click', 2)).toBe(false);

    const focused = await page.evaluate(() => (document.activeElement as HTMLElement)?.textContent?.trim());
    console.log(`\n[NAV-02] Tab off last item — dropdown closed, focused: "${focused}"`);
    // Focus should now be on the About item's link or chevron (next nav item)
    expect(focused).toBeTruthy();
    expect(['About', 'Vision', 'Leadership'].some(t => focused?.includes(t))).toBe(true);
  });

  test('Shift+Tab from first menu item closes dropdown and returns focus to chevron', async ({ page }) => {
    await loadNavbarFixture(page, CLICK_NAV_HTML);

    const chevron = await getDropdownChevron(page, 'nav-click', 2);
    await chevron.click();
    await page.waitForTimeout(150);

    // Tab into menu to first item
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
    expect(await page.evaluate(() => (document.activeElement as HTMLElement)?.textContent?.trim())).toBe('Visas');

    // Shift+Tab from first item → closes menu, focus returns to trigger
    await page.keyboard.press('Shift+Tab');
    await page.waitForTimeout(200);

    expect(await isDropdownOpen(page, 'nav-click', 2)).toBe(false);

    const activeClass = await page.evaluate(() => (document.activeElement as HTMLElement)?.className);
    console.log(`\n[NAV-02] Shift+Tab from first item — focused class: "${activeClass}"`);
    expect(activeClass).toContain('aegov-navbar-item__chevron');
  });

  test('Shift+Tab within menu moves to previous item', async ({ page }) => {
    await loadNavbarFixture(page, CLICK_NAV_HTML);

    const chevron = await getDropdownChevron(page, 'nav-click', 2);
    await chevron.click();
    await page.waitForTimeout(150);

    // Tab into menu, go to second item
    await page.keyboard.press('Tab'); // → Visas
    await page.keyboard.press('Tab'); // → Passports
    await page.waitForTimeout(50);

    // Shift+Tab → should go back to Visas
    await page.keyboard.press('Shift+Tab');
    await page.waitForTimeout(50);

    const focused = await page.evaluate(() => (document.activeElement as HTMLElement)?.textContent?.trim());
    console.log(`\n[NAV-02] Shift+Tab within menu — focused: "${focused}"`);
    expect(focused).toBe('Visas');
    // Dropdown should still be open
    expect(await isDropdownOpen(page, 'nav-click', 2)).toBe(true);
  });

  test('click-trigger: clicking outside closes the open dropdown', async ({ page }) => {
    await loadNavbarFixture(page, CLICK_NAV_HTML);

    const chevron = await getDropdownChevron(page, 'nav-click', 2);
    await chevron.click();
    await page.waitForTimeout(150);
    expect(await isDropdownOpen(page, 'nav-click', 2)).toBe(true);

    // Click somewhere else on the page
    await page.click('body', { position: { x: 10, y: 10 } });
    await page.waitForTimeout(150);

    const open = await isDropdownOpen(page, 'nav-click', 2);
    console.log(`\n[NAV-02] after outside click, dropdown open: ${open}`);
    expect(open).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// NAV-03 — combined (alternating hover + click)
// ═══════════════════════════════════════════════════════════════════════════
test.describe('NAV-03 — combined hover + click triggers', () => {

  test('hover opens the hover-trigger item (Services)', async ({ page }) => {
    await loadNavbarFixture(page, COMBINED_NAV_HTML);

    const servicesDropdown = page.locator('#nav-combined aegov-navbar-item:nth-of-type(2) aegov-dropdown');
    await servicesDropdown.hover();
    await page.waitForTimeout(150);

    const open = await isDropdownOpen(page, 'nav-combined', 2);
    console.log(`\n[NAV-03] hover opens Services (hover): ${open}`);
    expect(open).toBe(true);
  });

  test('hover does NOT open the click-trigger item (About)', async ({ page }) => {
    await loadNavbarFixture(page, COMBINED_NAV_HTML);

    const aboutDropdown = page.locator('#nav-combined aegov-navbar-item:nth-of-type(3) aegov-dropdown');
    await aboutDropdown.hover();
    await page.waitForTimeout(300);

    const open = await isDropdownOpen(page, 'nav-combined', 3);
    console.log(`\n[NAV-03] hover on About (click): ${open}`);
    expect(open).toBe(false);
  });

  test('click chevron opens the click-trigger item (About)', async ({ page }) => {
    await loadNavbarFixture(page, COMBINED_NAV_HTML);

    const chevron = await getDropdownChevron(page, 'nav-combined', 3);
    await chevron.click();
    await page.waitForTimeout(150);

    const open = await isDropdownOpen(page, 'nav-combined', 3);
    console.log(`\n[NAV-03] click opens About (click): ${open}`);
    expect(open).toBe(true);
  });

  test('opening hover item closes the previously-open click item (single-open)', async ({ page }) => {
    await loadNavbarFixture(page, COMBINED_NAV_HTML);

    // Open About (click trigger)
    const aboutChevron = await getDropdownChevron(page, 'nav-combined', 3);
    await aboutChevron.click();
    await page.waitForTimeout(150);
    expect(await isDropdownOpen(page, 'nav-combined', 3)).toBe(true);

    // Now hover Media (hover trigger) — should close About
    const mediaDropdown = page.locator('#nav-combined aegov-navbar-item:nth-of-type(4) aegov-dropdown');
    await mediaDropdown.hover();
    await page.waitForTimeout(300);

    const aboutOpen = await isDropdownOpen(page, 'nav-combined', 3);
    const mediaOpen = await isDropdownOpen(page, 'nav-combined', 4);
    console.log(`\n[NAV-03] single-open: about=${aboutOpen}, media=${mediaOpen}`);
    expect(mediaOpen).toBe(true);
    expect(aboutOpen).toBe(false);
  });

  test('both hover and click items support ArrowDown → focus first item', async ({ page }) => {
    await loadNavbarFixture(page, COMBINED_NAV_HTML);

    // Hover item (Services)
    const servicesChevron = await getDropdownChevron(page, 'nav-combined', 2);
    await servicesChevron.focus();
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(150);
    expect(await isDropdownOpen(page, 'nav-combined', 2)).toBe(true);

    const focusedInHover = await page.evaluate(() => (document.activeElement as HTMLElement)?.textContent?.trim());
    console.log(`\n[NAV-03] hover-item ArrowDown focused: "${focusedInHover}"`);
    expect(focusedInHover).toBe('Visas');

    // Escape back
    await page.keyboard.press('Escape');
    await page.waitForTimeout(150);

    // Click item (About)
    const aboutChevron = await getDropdownChevron(page, 'nav-combined', 3);
    await aboutChevron.focus();
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(150);
    expect(await isDropdownOpen(page, 'nav-combined', 3)).toBe(true);

    const focusedInClick = await page.evaluate(() => (document.activeElement as HTMLElement)?.textContent?.trim());
    console.log(`[NAV-03] click-item ArrowDown focused: "${focusedInClick}"`);
    expect(focusedInClick).toBe('Vision');
  });
});
