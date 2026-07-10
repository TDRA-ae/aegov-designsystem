/**
 * Standalone aegov-dropdown — keyboard interaction tests
 *
 * Validates that keyboard navigation matches the SDS (Singapore Design System)
 * dropdown pattern:
 *   - ArrowDown on trigger (closed) → opens + focuses first item
 *   - ArrowUp on trigger (closed)   → opens + focuses LAST item
 *   - ArrowDown inside menu         → next item (wraps at bottom)
 *   - ArrowUp inside menu           → previous item (wraps at top)
 *   - Enter on item                 → activates (closes menu)
 *   - Escape                        → closes, returns focus to trigger
 *   - Tab                           → closes, focus exits naturally (menu-button pattern)
 */
import { test, expect, Page } from '@playwright/test';

const BASE = 'http://localhost:3333';

async function loadFixture(page: Page, html: string) {
  await page.goto(`${BASE}/docs/pages/aegov-dropdown.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => customElements.get('aegov-dropdown') !== undefined, { timeout: 15000 });
  await page.evaluate((markup) => {
    const fixture = document.createElement('div');
    fixture.id = 'dd-fixture';
    fixture.style.cssText = 'padding: 60px 40px;';
    fixture.innerHTML = markup;
    document.body.prepend(fixture);
  }, html);
  // Wait for DLS components in the fixture to hydrate. Use waitForSelector
  // (MutationObserver-based, not polling) so Stencil's lazy loader isn't starved.
  if (html.includes('aegov-button')) {
    await page.waitForSelector('#dd-fixture aegov-button button', { timeout: 5000, state: 'attached' });
  }
  if (html.includes('aegov-link')) {
    await page.waitForSelector('#dd-fixture aegov-link a', { timeout: 5000, state: 'attached' });
  }
  await page.waitForTimeout(200);
}

// ─── shared fixtures ─────────────────────────────────────────────────────────
const DROPDOWN_3_LINKS = `
<aegov-dropdown field-id="dd-links" trigger="click">
  <aegov-button field-id="dd-btn" variant="secondary">Options</aegov-button>
  <div slot="dropdown-content">
    <aegov-link field-id="dd-opt1" href="#opt-1">Option 1</aegov-link>
    <aegov-link field-id="dd-opt2" href="#opt-2">Option 2</aegov-link>
    <aegov-link field-id="dd-opt3" href="#opt-3">Option 3</aegov-link>
  </div>
</aegov-dropdown>
<aegov-button field-id="after-dd" variant="secondary">After dropdown</aegov-button>
`;

const DROPDOWN_3_BUTTONS = `
<aegov-dropdown field-id="dd-btns" trigger="click">
  <aegov-button field-id="dd-btn-b" variant="secondary">Actions</aegov-button>
  <div slot="dropdown-content">
    <aegov-button field-id="dd-act1" variant="ghost">Edit</aegov-button>
    <aegov-button field-id="dd-act2" variant="ghost">Duplicate</aegov-button>
    <aegov-button field-id="dd-act3" variant="danger">Delete</aegov-button>
  </div>
</aegov-dropdown>
`;

// ─── helpers ─────────────────────────────────────────────────────────────────
async function isOpen(page: Page, fieldId: string): Promise<boolean> {
  return page.evaluate((id) => {
    const dd = document.querySelector(`aegov-dropdown[field-id="${id}"]`);
    const btn = dd?.querySelector('[aria-expanded]') as HTMLElement;
    return btn?.getAttribute('aria-expanded') === 'true';
  }, fieldId);
}

async function focusedText(page: Page): Promise<string> {
  return page.evaluate(() => (document.activeElement as HTMLElement)?.textContent?.trim() ?? '');
}

async function focusedId(page: Page): Promise<string> {
  return page.evaluate(() => (document.activeElement as HTMLElement)?.id ?? '');
}

// ═══════════════════════════════════════════════════════════════════════════
// DD-KB-01 — Opening with keyboard
// ═══════════════════════════════════════════════════════════════════════════
test.describe('DD-KB-01 — Opening with keyboard', () => {

  test('ArrowDown on trigger (closed) opens dropdown and focuses first item', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_LINKS);

    await page.locator('#dd-btn').focus();
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(150);

    expect(await isOpen(page, 'dd-links')).toBe(true);
    const focused = await focusedId(page);
    console.log(`\n[DD-KB-01] ArrowDown on trigger → focused: #${focused}`);
    expect(focused).toBe('dd-opt1');
  });

  test('ArrowUp on trigger (closed) opens dropdown and focuses LAST item', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_LINKS);

    await page.locator('#dd-btn').focus();
    await page.keyboard.press('ArrowUp');
    await page.waitForTimeout(200);

    expect(await isOpen(page, 'dd-links')).toBe(true);
    const focused = await focusedId(page);
    console.log(`\n[DD-KB-01] ArrowUp on trigger → focused: #${focused}`);
    expect(focused).toBe('dd-opt3');
  });

  test('Enter on trigger opens dropdown and focuses first item', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_LINKS);

    await page.locator('#dd-btn').focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(150);

    expect(await isOpen(page, 'dd-links')).toBe(true);
    // Enter on a <button> is keyboard (detail===0), so first item gets focus
    const focused = await focusedId(page);
    console.log(`\n[DD-KB-01] Enter on trigger → focused: #${focused}`);
    expect(focused).toBe('dd-opt1');
  });

  test('Space on trigger opens dropdown and focuses first item', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_LINKS);

    await page.locator('#dd-btn').focus();
    await page.keyboard.press('Space');
    await page.waitForTimeout(150);

    expect(await isOpen(page, 'dd-links')).toBe(true);
    const focused = await focusedId(page);
    console.log(`\n[DD-KB-01] Space on trigger → focused: #${focused}`);
    expect(focused).toBe('dd-opt1');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// DD-KB-02 — Arrow key navigation within open menu
// ═══════════════════════════════════════════════════════════════════════════
test.describe('DD-KB-02 — Arrow navigation inside menu', () => {

  test('ArrowDown moves focus to next item', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_LINKS);

    await page.locator('#dd-btn').focus();
    await page.keyboard.press('ArrowDown'); // opens + focuses opt1
    await page.waitForTimeout(150);
    expect(await focusedId(page)).toBe('dd-opt1');

    await page.keyboard.press('ArrowDown');
    const focused = await focusedId(page);
    console.log(`\n[DD-KB-02] ArrowDown → focused: #${focused}`);
    expect(focused).toBe('dd-opt2');
  });

  test('ArrowDown again moves to third item', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_LINKS);

    await page.locator('#dd-btn').focus();
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(150);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    const focused = await focusedId(page);
    console.log(`\n[DD-KB-02] ArrowDown ×3 → focused: #${focused}`);
    expect(focused).toBe('dd-opt3');
  });

  test('ArrowDown on LAST item wraps back to first (cyclic)', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_LINKS);

    await page.locator('#dd-btn').focus();
    await page.keyboard.press('ArrowDown'); // opt1
    await page.waitForTimeout(150);
    await page.keyboard.press('ArrowDown'); // opt2
    await page.keyboard.press('ArrowDown'); // opt3
    await page.keyboard.press('ArrowDown'); // wraps → opt1

    const focused = await focusedId(page);
    console.log(`\n[DD-KB-02] ArrowDown off last → wrapped to: #${focused}`);
    expect(focused).toBe('dd-opt1');
  });

  test('ArrowUp moves focus to previous item', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_LINKS);

    await page.locator('#dd-btn').focus();
    await page.keyboard.press('ArrowDown'); // opt1
    await page.waitForTimeout(150);
    await page.keyboard.press('ArrowDown'); // opt2
    await page.keyboard.press('ArrowUp');   // back to opt1

    const focused = await focusedId(page);
    console.log(`\n[DD-KB-02] ArrowUp → focused: #${focused}`);
    expect(focused).toBe('dd-opt1');
  });

  test('ArrowUp on FIRST item wraps to last (cyclic)', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_LINKS);

    await page.locator('#dd-btn').focus();
    await page.keyboard.press('ArrowDown'); // opt1
    await page.waitForTimeout(150);
    await page.keyboard.press('ArrowUp');   // wraps → opt3

    const focused = await focusedId(page);
    console.log(`\n[DD-KB-02] ArrowUp off first → wrapped to: #${focused}`);
    expect(focused).toBe('dd-opt3');
  });

  test('same behavior with <button> items', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_BUTTONS);

    await page.locator('#dd-btn-b').focus();
    await page.keyboard.press('ArrowDown'); // opens + focuses act1
    await page.waitForTimeout(150);

    const f1 = await focusedId(page);
    console.log(`\n[DD-KB-02] after 1st ArrowDown (open): #${f1}`);
    expect(f1).toBe('dd-act1');

    await page.keyboard.press('ArrowDown'); // act2
    const f2 = await focusedId(page);
    console.log(`[DD-KB-02] after 2nd ArrowDown: #${f2}`);
    expect(f2).toBe('dd-act2');

    await page.keyboard.press('ArrowDown'); // act3
    const f3 = await focusedId(page);
    console.log(`[DD-KB-02] after 3rd ArrowDown: #${f3}`);
    expect(f3).toBe('dd-act3');

    await page.keyboard.press('ArrowDown'); // wraps → act1
    await page.waitForTimeout(50);
    const f4 = await focusedId(page);
    console.log(`[DD-KB-02] after 4th ArrowDown (wrap): #${f4}`);
    expect(f4).toBe('dd-act1');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// DD-KB-03 — Closing the menu
// ═══════════════════════════════════════════════════════════════════════════
test.describe('DD-KB-03 — Closing', () => {

  test('Escape closes the dropdown and returns focus to the trigger', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_LINKS);

    await page.locator('#dd-btn').focus();
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(150);
    expect(await isOpen(page, 'dd-links')).toBe(true);

    await page.keyboard.press('Escape');
    await page.waitForTimeout(150);

    expect(await isOpen(page, 'dd-links')).toBe(false);
    const focused = await focusedId(page);
    console.log(`\n[DD-KB-03] Escape → focused: #${focused}`);
    expect(focused).toBe('dd-btn');
  });

  test('Tab closes dropdown (menu-button pattern) and moves focus out', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_LINKS);

    await page.locator('#dd-btn').focus();
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(150);
    expect(await isOpen(page, 'dd-links')).toBe(true);

    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);

    expect(await isOpen(page, 'dd-links')).toBe(false);
    const focused = await focusedId(page);
    console.log(`\n[DD-KB-03] Tab → closed, focused: #${focused}`);
    // Focus should have moved forward (out of dropdown) — not stuck on trigger
    expect(focused).not.toBe('dd-opt1');
    expect(focused).not.toBe('dd-opt2');
    expect(focused).not.toBe('dd-opt3');
  });

  test('Escape from trigger (already closed) does nothing', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_LINKS);

    await page.locator('#dd-btn').focus();
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);

    expect(await isOpen(page, 'dd-links')).toBe(false);
    const focused = await focusedId(page);
    expect(focused).toBe('dd-btn');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// DD-KB-04 — Mouse click trigger opens, keyboard navigates
// ═══════════════════════════════════════════════════════════════════════════
test.describe('DD-KB-04 — Mouse open + keyboard navigate', () => {

  test('mouse click opens dropdown; ArrowDown then navigates items', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_LINKS);

    // Mouse click (pointer open → focus stays on trigger, NOT moved into menu)
    await page.locator('#dd-btn').click();
    await page.waitForTimeout(150);
    expect(await isOpen(page, 'dd-links')).toBe(true);

    // After pointer-open, ArrowDown should move into menu
    await page.locator('#dd-btn').focus();
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(100);

    const focused = await focusedId(page);
    console.log(`\n[DD-KB-04] mouse open + ArrowDown → #${focused}`);
    expect(focused).toBe('dd-opt1');
  });

  test('mouse click opens; items are focusable via Tab (menu-button: Tab closes)', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_LINKS);

    await page.locator('#dd-btn').click();
    await page.waitForTimeout(150);
    expect(await isOpen(page, 'dd-links')).toBe(true);

    // Tab should close (menu-button pattern) — NOT navigate into menu
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);

    expect(await isOpen(page, 'dd-links')).toBe(false);
    console.log(`\n[DD-KB-04] mouse open + Tab → closed ✓`);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// DD-KB-05 — ARIA state correctness
// ═══════════════════════════════════════════════════════════════════════════
test.describe('DD-KB-05 — ARIA state', () => {

  test('trigger button has aria-haspopup="menu" and aria-expanded="false" initially', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_LINKS);

    const btn = page.locator('#dd-btn');
    const haspopup = await btn.getAttribute('aria-haspopup');
    const expanded = await btn.getAttribute('aria-expanded');
    console.log(`\n[DD-KB-05] initial: aria-haspopup="${haspopup}", aria-expanded="${expanded}"`);
    expect(haspopup).toBe('menu');
    expect(expanded).toBe('false');
  });

  test('aria-expanded becomes "true" when open, "false" when closed', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_LINKS);

    const btn = page.locator('#dd-btn');
    await btn.focus();
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(150);

    expect(await btn.getAttribute('aria-expanded')).toBe('true');

    await page.keyboard.press('Escape');
    await page.waitForTimeout(150);

    expect(await btn.getAttribute('aria-expanded')).toBe('false');
    console.log(`\n[DD-KB-05] aria-expanded toggled correctly ✓`);
  });

  test('menu items have role="menuitem"', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_LINKS);

    await page.locator('#dd-btn').focus();
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(150);

    const role1 = await page.locator('#dd-opt1').getAttribute('role');
    const role2 = await page.locator('#dd-opt2').getAttribute('role');
    const role3 = await page.locator('#dd-opt3').getAttribute('role');
    console.log(`\n[DD-KB-05] item roles: "${role1}", "${role2}", "${role3}"`);
    expect(role1).toBe('menuitem');
    expect(role2).toBe('menuitem');
    expect(role3).toBe('menuitem');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// DD-KB-06 — Home / End navigation
// ═══════════════════════════════════════════════════════════════════════════
test.describe('DD-KB-06 — Home / End navigation', () => {

  test('End jumps focus to last item from first item', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_LINKS);

    await page.locator('#dd-btn').focus();
    await page.keyboard.press('ArrowDown'); // opens + focuses opt1
    await page.waitForTimeout(150);
    expect(await focusedId(page)).toBe('dd-opt1');

    await page.keyboard.press('End');
    await page.waitForTimeout(50);

    const focused = await focusedId(page);
    console.log(`\n[DD-KB-06] End from first → focused: #${focused}`);
    expect(focused).toBe('dd-opt3');
  });

  test('Home jumps focus to first item from last item', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_LINKS);

    await page.locator('#dd-btn').focus();
    await page.keyboard.press('ArrowUp'); // opens + focuses last (opt3)
    await page.waitForTimeout(200);
    expect(await focusedId(page)).toBe('dd-opt3');

    await page.keyboard.press('Home');
    await page.waitForTimeout(50);

    const focused = await focusedId(page);
    console.log(`\n[DD-KB-06] Home from last → focused: #${focused}`);
    expect(focused).toBe('dd-opt1');
  });

  test('End then Home returns to first item', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_LINKS);

    await page.locator('#dd-btn').focus();
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(150);

    await page.keyboard.press('End');
    await page.waitForTimeout(50);
    expect(await focusedId(page)).toBe('dd-opt3');

    await page.keyboard.press('Home');
    await page.waitForTimeout(50);

    const focused = await focusedId(page);
    console.log(`\n[DD-KB-06] End then Home → focused: #${focused}`);
    expect(focused).toBe('dd-opt1');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// DD-KB-07 — Type-ahead navigation
// ═══════════════════════════════════════════════════════════════════════════
test.describe('DD-KB-07 — Type-ahead navigation', () => {

  test('pressing "d" from first item moves focus to next item starting with D', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_BUTTONS);

    await page.locator('#dd-btn-b').focus();
    await page.keyboard.press('ArrowDown'); // opens + focuses Edit (dd-act1)
    await page.waitForTimeout(150);
    expect(await focusedId(page)).toBe('dd-act1');

    await page.keyboard.press('d');
    await page.waitForTimeout(100);

    const focused = await focusedId(page);
    console.log(`\n[DD-KB-07] type "d" from Edit → focused: #${focused}`);
    // "Duplicate" comes after "Edit" in list and starts with 'd'
    expect(focused).toBe('dd-act2');
  });

  test('type-ahead wraps around: pressing "e" from last item finds first item', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_BUTTONS);

    await page.locator('#dd-btn-b').focus();
    await page.keyboard.press('ArrowUp'); // opens + focuses Delete (dd-act3, last item)
    await page.waitForTimeout(200);
    expect(await focusedId(page)).toBe('dd-act3');

    await page.keyboard.press('e');
    await page.waitForTimeout(100);

    const focused = await focusedId(page);
    console.log(`\n[DD-KB-07] type "e" from Delete (last) → wrapped to: #${focused}`);
    // Search forward from idx=2: wraps to idx=0 "Edit" which starts with 'e'
    expect(focused).toBe('dd-act1');
  });

  test('type-ahead buffer resets after 500ms; next key starts a fresh search', async ({ page }) => {
    await loadFixture(page, DROPDOWN_3_BUTTONS);

    await page.locator('#dd-btn-b').focus();
    await page.keyboard.press('ArrowDown'); // opens + focuses Edit (dd-act1)
    await page.waitForTimeout(150);

    await page.keyboard.press('d'); // buffer='d' → Duplicate (dd-act2)
    await page.waitForTimeout(100);
    expect(await focusedId(page)).toBe('dd-act2');

    await page.waitForTimeout(600); // buffer resets

    await page.keyboard.press('d'); // buffer='d' from Duplicate (idx=1) → Delete (idx=2)
    await page.waitForTimeout(100);

    const focused = await focusedId(page);
    console.log(`\n[DD-KB-07] "d" then (wait) "d" → focused: #${focused}`);
    expect(focused).toBe('dd-act3');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// DD-KB-08 — Disclosure pattern ARIA semantics
// ═══════════════════════════════════════════════════════════════════════════

const DROPDOWN_DISCLOSURE = `
<aegov-dropdown field-id="dd-disc" trigger="click" tab-behavior="disclosure">
  <aegov-button field-id="dd-disc-btn" variant="secondary">Nav Menu</aegov-button>
  <div slot="dropdown-content">
    <aegov-link field-id="dd-disc-link1" href="#svc">Services</aegov-link>
    <aegov-link field-id="dd-disc-link2" href="#prod">Products</aegov-link>
    <aegov-link field-id="dd-disc-link3" href="#about">About</aegov-link>
  </div>
</aegov-dropdown>
<aegov-button field-id="after-dd-disc" variant="secondary">After</aegov-button>
`;

test.describe('DD-KB-08 — Disclosure pattern ARIA semantics', () => {

  test('trigger has no aria-haspopup in disclosure mode', async ({ page }) => {
    await loadFixture(page, DROPDOWN_DISCLOSURE);

    const haspopup = await page.locator('#dd-disc-btn').getAttribute('aria-haspopup');
    console.log(`\n[DD-KB-08] disclosure trigger aria-haspopup: "${haspopup}"`);
    expect(haspopup).toBeNull();
  });

  test('open container has no role="menu" in disclosure mode', async ({ page }) => {
    await loadFixture(page, DROPDOWN_DISCLOSURE);

    await page.locator('#dd-disc-btn').click();
    await page.waitForTimeout(200);
    expect(await isOpen(page, 'dd-disc')).toBe(true);

    const role = await page.evaluate(() => {
      return document.getElementById('dd-disc')?.getAttribute('role') ?? null;
    });
    console.log(`\n[DD-KB-08] disclosure container role: "${role}"`);
    expect(role).toBeNull();
  });

  test('disclosure mode items have no role="menuitem"', async ({ page }) => {
    await loadFixture(page, DROPDOWN_DISCLOSURE);

    await page.locator('#dd-disc-btn').click();
    await page.waitForTimeout(200);

    const roles = await page.evaluate(() => {
      const container = document.getElementById('dd-disc');
      const links = Array.from(container?.querySelectorAll('a') ?? []);
      return links.map(a => a.getAttribute('role'));
    });
    console.log(`\n[DD-KB-08] disclosure item roles: ${JSON.stringify(roles)}`);
    expect(roles.some(r => r === 'menuitem')).toBe(false);
  });

  test('keyboard open in disclosure mode keeps focus on trigger (not first item)', async ({ page }) => {
    await loadFixture(page, DROPDOWN_DISCLOSURE);

    await page.locator('#dd-disc-btn').focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);

    expect(await isOpen(page, 'dd-disc')).toBe(true);
    const focused = await focusedId(page);
    console.log(`\n[DD-KB-08] keyboard open in disclosure → focused: #${focused}`);
    // APG Disclosure: focus stays on the trigger; Tab is the entry point
    expect(focused).toBe('dd-disc-btn');
  });

  test('Tab from trigger in disclosure mode moves focus into first menu item', async ({ page }) => {
    await loadFixture(page, DROPDOWN_DISCLOSURE);

    await page.locator('#dd-disc-btn').focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);
    expect(await isOpen(page, 'dd-disc')).toBe(true);

    await page.keyboard.press('Tab');
    await page.waitForTimeout(150);

    const focused = await focusedId(page);
    console.log(`\n[DD-KB-08] Tab from trigger in disclosure → focused: #${focused}`);
    expect(focused).toBe('dd-disc-link1');
  });

  test('Escape from inside disclosure menu closes it and returns focus to trigger', async ({ page }) => {
    await loadFixture(page, DROPDOWN_DISCLOSURE);

    await page.locator('#dd-disc-btn').focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);
    await page.keyboard.press('Tab'); // enter menu
    await page.waitForTimeout(100);

    await page.keyboard.press('Escape');
    await page.waitForTimeout(150);

    expect(await isOpen(page, 'dd-disc')).toBe(false);
    const focused = await focusedId(page);
    console.log(`\n[DD-KB-08] Escape from disclosure menu → focused: #${focused}`);
    expect(focused).toBe('dd-disc-btn');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// DD-KB-09 — Hover trigger keyboard support
// ═══════════════════════════════════════════════════════════════════════════
const DROPDOWN_HOVER = `
<aegov-dropdown field-id="dd-hover" trigger="hover">
  <aegov-button field-id="dd-hover-btn" variant="secondary">Hover Menu</aegov-button>
  <div slot="dropdown-content">
    <aegov-link field-id="dd-hover-opt1" href="#h1">Item 1</aegov-link>
    <aegov-link field-id="dd-hover-opt2" href="#h2">Item 2</aegov-link>
  </div>
</aegov-dropdown>
<aegov-button field-id="dd-hover-after" variant="secondary">After</aegov-button>
`;

test.describe('DD-KB-09 — Hover trigger keyboard support', () => {

  test('Enter on a hover-trigger button opens the dropdown', async ({ page }) => {
    await loadFixture(page, DROPDOWN_HOVER);

    await page.locator('#dd-hover-btn').focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);

    const open = await isOpen(page, 'dd-hover');
    console.log(`\n[DD-KB-09] Enter on hover trigger → open: ${open}`);
    expect(open).toBe(true);
  });

  test('Space on a hover-trigger button opens the dropdown', async ({ page }) => {
    await loadFixture(page, DROPDOWN_HOVER);

    await page.locator('#dd-hover-btn').focus();
    await page.keyboard.press('Space');
    await page.waitForTimeout(200);

    const open = await isOpen(page, 'dd-hover');
    console.log(`\n[DD-KB-09] Space on hover trigger → open: ${open}`);
    expect(open).toBe(true);
  });

  test('Enter on hover trigger focuses first item; ArrowDown then moves to second', async ({ page }) => {
    await loadFixture(page, DROPDOWN_HOVER);

    await page.locator('#dd-hover-btn').focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);

    // After Enter: focus should be on first item
    const focusedAfterEnter = await focusedId(page);
    console.log(`\n[DD-KB-09] Enter on hover trigger → focused: #${focusedAfterEnter}`);
    expect(focusedAfterEnter).toBe('dd-hover-opt1');

    // ArrowDown from first item moves to second
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(100);
    const focusedAfterArrow = await focusedId(page);
    console.log(`\n[DD-KB-09] ArrowDown → focused: #${focusedAfterArrow}`);
    expect(focusedAfterArrow).toBe('dd-hover-opt2');
  });

  test('Escape closes a keyboard-opened hover dropdown', async ({ page }) => {
    await loadFixture(page, DROPDOWN_HOVER);

    await page.locator('#dd-hover-btn').focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(200);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(150);

    const open = await isOpen(page, 'dd-hover');
    console.log(`\n[DD-KB-09] Escape closes hover-trigger dropdown → open: ${open}`);
    expect(open).toBe(false);
  });
});
