/**
 * aegov-modal + aegov-drawer — APG Dialog keyboard interaction & focus trap tests
 *
 * What these cover (not in any existing test):
 *   MOD-01: Focus moves to first focusable element on open
 *   MOD-02: Tab wraps from last item back to first (forward focus trap)
 *   MOD-03: Shift+Tab from first item wraps to last (backward focus trap)
 *   MOD-04: Tab cannot reach elements behind the open dialog
 *   MOD-05: Escape restores focus to the element that opened the dialog
 *   MOD-06: No focusable children → focus falls back to dialog container
 *   MOD-07: aria-labelledby passthrough names the dialog
 *
 *   DRW-01: Focus moves to first focusable element on open
 *   DRW-02: Tab wraps from last item back to first (forward focus trap)
 *   DRW-03: Shift+Tab from first item wraps to last (backward focus trap)
 *   DRW-04: Tab cannot reach elements behind the open drawer
 *   DRW-05: Escape restores focus to the element that opened the drawer
 *   DRW-06: No focusable children → focus falls back to dialog container
 *
 * Already covered by existing tests (not duplicated here):
 *   - Escape closes modal/drawer  → a11y-audit.spec.ts G3-01, G3-02
 *   - Backdrop click closes       → aegov-modal.e2e.ts, aegov-drawer.e2e.ts
 *   - role="dialog" + aria-modal  → unit specs + visual-audit.spec.ts
 *   - aria-label from label prop  → qa-fixes.spec.ts P0-02, P0-03
 */
import { test, expect, Page } from '@playwright/test';

const BASE = 'http://localhost:3333';

// ─── fixture loaders ─────────────────────────────────────────────────────────

async function loadModalFixture(page: Page, html: string) {
  await page.goto(`${BASE}/docs/pages/aegov-modal.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(
    () => customElements.get('aegov-modal') !== undefined,
    { timeout: 15000 }
  );
  await page.evaluate((markup) => {
    const fixture = document.createElement('div');
    fixture.id = 'modal-fixture';
    fixture.style.cssText = 'padding: 40px;';
    fixture.innerHTML = markup;
    document.body.prepend(fixture);
  }, html);
  await page.waitForTimeout(300);
}

async function loadDrawerFixture(page: Page, html: string) {
  await page.goto(`${BASE}/docs/pages/aegov-drawer.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(
    () => customElements.get('aegov-drawer') !== undefined,
    { timeout: 15000 }
  );
  await page.evaluate((markup) => {
    const fixture = document.createElement('div');
    fixture.id = 'drawer-fixture';
    fixture.style.cssText = 'padding: 40px;';
    fixture.innerHTML = markup;
    document.body.prepend(fixture);
  }, html);
  await page.waitForTimeout(300);
}

// ─── open helpers ─────────────────────────────────────────────────────────────

async function openModal(page: Page, fieldId: string, openerSelector?: string) {
  if (openerSelector) {
    // Focus the opener before opening so the component stores it for restoration
    await page.locator(openerSelector).focus();
    await page.waitForTimeout(50);
  }
  await page.evaluate(async (id) => {
    const el = document.querySelector(`aegov-modal[field-id="${id}"]`) as any;
    if (el?.componentOnReady) await el.componentOnReady();
    el.isOpen = true;
  }, fieldId);
  await page.waitForTimeout(450); // 200ms animation + rAF focus setup + margin
}

async function openDrawer(page: Page, fieldId: string, openerSelector?: string) {
  if (openerSelector) {
    await page.locator(openerSelector).focus();
    await page.waitForTimeout(50);
  }
  await page.evaluate(async (id) => {
    const el = document.querySelector(`aegov-drawer[field-id="${id}"]`) as any;
    if (el?.componentOnReady) await el.componentOnReady();
    el.isOpen = true;
  }, fieldId);
  await page.waitForTimeout(650); // 300ms slide animation + double-rAF + setTimeout(duration) + margin
}

// ─── shared helpers ───────────────────────────────────────────────────────────

async function focusedId(page: Page): Promise<string> {
  return page.evaluate(() => {
    const el = document.activeElement as HTMLElement;
    return el?.id ?? '';
  });
}

async function isModalOpen(page: Page, fieldId: string): Promise<boolean> {
  return page.evaluate((id) => {
    const el = document.querySelector(`aegov-modal[field-id="${id}"]`) as any;
    return el?.isOpen === true;
  }, fieldId);
}

async function isDrawerOpen(page: Page, fieldId: string): Promise<boolean> {
  return page.evaluate((id) => {
    const el = document.querySelector(`aegov-drawer[field-id="${id}"]`) as any;
    return el?.isOpen === true;
  }, fieldId);
}

// ─── fixtures ─────────────────────────────────────────────────────────────────

const MODAL_3_BTNS = `
<button id="qa-modal-opener" type="button">Open</button>
<aegov-modal field-id="qa-modal-trap" label="Focus trap test">
  <button id="qa-m-first" type="button">First</button>
  <button id="qa-m-second" type="button">Second</button>
  <button id="qa-m-last" type="button">Close</button>
</aegov-modal>
`;

const MODAL_EMPTY = `
<aegov-modal field-id="qa-modal-empty" label="Empty modal">
  <p>No interactive elements here.</p>
</aegov-modal>
`;

const MODAL_LABELLED = `
<h2 id="qa-modal-heading">Payment Details</h2>
<aegov-modal field-id="qa-modal-lbl" aria-labelledby="qa-modal-heading">
  <button id="qa-lbl-btn" type="button">Close</button>
</aegov-modal>
`;

const DRAWER_3_BTNS = `
<button id="qa-drawer-opener" type="button">Open</button>
<aegov-drawer field-id="qa-drawer-trap" label="Focus trap test" position="right">
  <button id="qa-d-first" type="button">First</button>
  <button id="qa-d-second" type="button">Second</button>
  <button id="qa-d-last" type="button">Close</button>
</aegov-drawer>
`;

const DRAWER_EMPTY = `
<aegov-drawer field-id="qa-drawer-empty" label="Empty drawer" position="right">
  <p>No interactive elements here.</p>
</aegov-drawer>
`;

// ═══════════════════════════════════════════════════════════════════════════════
// MODAL TESTS
// ═══════════════════════════════════════════════════════════════════════════════

test.describe('MOD-01 — aegov-modal: focus moves to first focusable element on open', () => {
  test('first slotted button receives focus when modal opens', async ({ page }) => {
    await loadModalFixture(page, MODAL_3_BTNS);
    await openModal(page, 'qa-modal-trap');

    const focused = await focusedId(page);
    console.log(`\n[MOD-01] focused element on open: "${focused}"`);
    expect(focused).toBe('qa-m-first');
  });
});

test.describe('MOD-02 — aegov-modal: Tab wraps from last item to first (forward trap)', () => {
  test('Tab from last button wraps back to first button', async ({ page }) => {
    await loadModalFixture(page, MODAL_3_BTNS);
    await openModal(page, 'qa-modal-trap');

    // Focus is on first button after open
    await page.keyboard.press('Tab'); // → second
    await page.keyboard.press('Tab'); // → last
    const beforeWrap = await focusedId(page);
    await page.keyboard.press('Tab'); // → should wrap to first
    const afterWrap = await focusedId(page);

    console.log(`\n[MOD-02] before wrap: "${beforeWrap}", after wrap: "${afterWrap}"`);
    expect(beforeWrap).toBe('qa-m-last');
    expect(afterWrap).toBe('qa-m-first');
  });
});

test.describe('MOD-03 — aegov-modal: Shift+Tab wraps from first item to last (backward trap)', () => {
  test('Shift+Tab from first button wraps to last button', async ({ page }) => {
    await loadModalFixture(page, MODAL_3_BTNS);
    await openModal(page, 'qa-modal-trap');

    // Focus is on first button after open
    const atFirst = await focusedId(page);
    await page.keyboard.press('Shift+Tab'); // → should wrap to last
    const afterWrap = await focusedId(page);

    console.log(`\n[MOD-03] started at: "${atFirst}", after Shift+Tab: "${afterWrap}"`);
    expect(atFirst).toBe('qa-m-first');
    expect(afterWrap).toBe('qa-m-last');
  });
});

test.describe('MOD-04 — aegov-modal: Tab cannot reach elements behind the dialog', () => {
  test('Tab cycling never reaches the opener button behind the modal', async ({ page }) => {
    await loadModalFixture(page, MODAL_3_BTNS);
    await openModal(page, 'qa-modal-trap');

    // Tab through 9 full presses (3 items × 3 cycles). The opener should never be reached.
    const focusHistory: string[] = [];
    for (let i = 0; i < 9; i++) {
      await page.keyboard.press('Tab');
      const id = await focusedId(page);
      focusHistory.push(id);
    }

    console.log(`\n[MOD-04] focus history over 9 Tabs: ${focusHistory.join(' → ')}`);
    expect(focusHistory).not.toContain('qa-modal-opener');
    // All focused elements must be the known modal buttons
    const allowed = new Set(['qa-m-first', 'qa-m-second', 'qa-m-last']);
    focusHistory.forEach((id) => expect(allowed.has(id)).toBe(true));
  });
});

test.describe('MOD-05 — aegov-modal: Escape restores focus to the opening element', () => {
  test('Escape closes modal and returns focus to the button that opened it', async ({ page }) => {
    await loadModalFixture(page, MODAL_3_BTNS);
    await openModal(page, 'qa-modal-trap', '#qa-modal-opener');

    // Confirm modal is open and focus is inside
    const focusedInside = await focusedId(page);
    expect(focusedInside).toBe('qa-m-first');

    await page.keyboard.press('Escape');
    await page.waitForTimeout(350); // animation out

    const open = await isModalOpen(page, 'qa-modal-trap');
    const restoredFocus = await focusedId(page);

    console.log(`\n[MOD-05] modal open after Escape: ${open}, focus restored to: "${restoredFocus}"`);
    expect(open).toBe(false);
    expect(restoredFocus).toBe('qa-modal-opener');
  });
});

test.describe('MOD-06 — aegov-modal: no focusable children → fallback to dialog container', () => {
  test('dialog container (tabindex=-1) receives focus when no focusable children exist', async ({ page }) => {
    await loadModalFixture(page, MODAL_EMPTY);
    await openModal(page, 'qa-modal-empty');

    // When focus lands inside a shadow root, document.activeElement is the shadow host.
    // The actual focused element is modal.shadowRoot.activeElement.
    const result = await page.evaluate(() => {
      const host = document.querySelector('aegov-modal[field-id="qa-modal-empty"]') as HTMLElement & { shadowRoot: ShadowRoot };
      const outerActive = document.activeElement?.tagName?.toLowerCase() ?? '';
      const shadowActive = (host?.shadowRoot?.activeElement as HTMLElement) ?? null;
      return {
        outerActiveTag: outerActive,
        shadowActiveRole: shadowActive?.getAttribute('role') ?? null,
        shadowActiveTabindex: shadowActive?.getAttribute('tabindex') ?? null,
      };
    });

    console.log(`\n[MOD-06] outer activeElement: <${result.outerActiveTag}>, shadow activeElement: role="${result.shadowActiveRole}", tabindex="${result.shadowActiveTabindex}"`);
    // document.activeElement is the host when focus is inside its shadow DOM — expected browser behaviour
    expect(result.outerActiveTag).toBe('aegov-modal');
    // The element with focus inside shadow DOM must be the role=dialog container
    expect(result.shadowActiveRole).toBe('dialog');
    expect(result.shadowActiveTabindex).toBe('-1');
  });
});

test.describe('MOD-07 — aegov-modal: aria-labelledby passthrough names the dialog', () => {
  test('aria-labelledby on host element is forwarded to the role=dialog element', async ({ page }) => {
    await loadModalFixture(page, MODAL_LABELLED);
    await openModal(page, 'qa-modal-lbl');

    const labelledBy = await page.evaluate(() => {
      const modal = document.querySelector('aegov-modal[field-id="qa-modal-lbl"]');
      const dialog = modal?.shadowRoot?.querySelector('[role="dialog"]');
      return dialog?.getAttribute('aria-labelledby') ?? null;
    });

    console.log(`\n[MOD-07] role=dialog aria-labelledby: "${labelledBy}"`);
    expect(labelledBy).toBe('qa-modal-heading');
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// DRAWER TESTS
// ═══════════════════════════════════════════════════════════════════════════════

test.describe('DRW-01 — aegov-drawer: focus moves to first focusable element on open', () => {
  test('first slotted button receives focus when drawer opens', async ({ page }) => {
    await loadDrawerFixture(page, DRAWER_3_BTNS);
    await openDrawer(page, 'qa-drawer-trap');

    const focused = await focusedId(page);
    console.log(`\n[DRW-01] focused element on open: "${focused}"`);
    expect(focused).toBe('qa-d-first');
  });
});

test.describe('DRW-02 — aegov-drawer: Tab wraps from last item to first (forward trap)', () => {
  test('Tab from last button wraps back to first button', async ({ page }) => {
    await loadDrawerFixture(page, DRAWER_3_BTNS);
    await openDrawer(page, 'qa-drawer-trap');

    await page.keyboard.press('Tab'); // → second
    await page.keyboard.press('Tab'); // → last
    const beforeWrap = await focusedId(page);
    await page.keyboard.press('Tab'); // → should wrap to first
    const afterWrap = await focusedId(page);

    console.log(`\n[DRW-02] before wrap: "${beforeWrap}", after wrap: "${afterWrap}"`);
    expect(beforeWrap).toBe('qa-d-last');
    expect(afterWrap).toBe('qa-d-first');
  });
});

test.describe('DRW-03 — aegov-drawer: Shift+Tab wraps from first item to last (backward trap)', () => {
  test('Shift+Tab from first button wraps to last button', async ({ page }) => {
    await loadDrawerFixture(page, DRAWER_3_BTNS);
    await openDrawer(page, 'qa-drawer-trap');

    const atFirst = await focusedId(page);
    await page.keyboard.press('Shift+Tab'); // → should wrap to last
    const afterWrap = await focusedId(page);

    console.log(`\n[DRW-03] started at: "${atFirst}", after Shift+Tab: "${afterWrap}"`);
    expect(atFirst).toBe('qa-d-first');
    expect(afterWrap).toBe('qa-d-last');
  });
});

test.describe('DRW-04 — aegov-drawer: Tab cannot reach elements behind the drawer', () => {
  test('Tab cycling never reaches the opener button behind the drawer', async ({ page }) => {
    await loadDrawerFixture(page, DRAWER_3_BTNS);
    await openDrawer(page, 'qa-drawer-trap');

    const focusHistory: string[] = [];
    for (let i = 0; i < 9; i++) {
      await page.keyboard.press('Tab');
      const id = await focusedId(page);
      focusHistory.push(id);
    }

    console.log(`\n[DRW-04] focus history over 9 Tabs: ${focusHistory.join(' → ')}`);
    expect(focusHistory).not.toContain('qa-drawer-opener');
    const allowed = new Set(['qa-d-first', 'qa-d-second', 'qa-d-last']);
    focusHistory.forEach((id) => expect(allowed.has(id)).toBe(true));
  });
});

test.describe('DRW-05 — aegov-drawer: Escape restores focus to the opening element', () => {
  test('Escape closes drawer and returns focus to the button that opened it', async ({ page }) => {
    await loadDrawerFixture(page, DRAWER_3_BTNS);
    await openDrawer(page, 'qa-drawer-trap', '#qa-drawer-opener');

    const focusedInside = await focusedId(page);
    expect(focusedInside).toBe('qa-d-first');

    await page.keyboard.press('Escape');
    await page.waitForTimeout(450); // animation out

    const open = await isDrawerOpen(page, 'qa-drawer-trap');
    const restoredFocus = await focusedId(page);

    console.log(`\n[DRW-05] drawer open after Escape: ${open}, focus restored to: "${restoredFocus}"`);
    expect(open).toBe(false);
    expect(restoredFocus).toBe('qa-drawer-opener');
  });
});

test.describe('DRW-06 — aegov-drawer: no focusable children → fallback to dialog container', () => {
  test('dialog container (tabindex=-1) receives focus when no focusable children exist', async ({ page }) => {
    await loadDrawerFixture(page, DRAWER_EMPTY);
    await openDrawer(page, 'qa-drawer-empty');

    // When focus lands inside a shadow root, document.activeElement is the shadow host.
    // The actual focused element is drawer.shadowRoot.activeElement.
    const result = await page.evaluate(() => {
      const host = document.querySelector('aegov-drawer[field-id="qa-drawer-empty"]') as HTMLElement & { shadowRoot: ShadowRoot };
      const outerActive = document.activeElement?.tagName?.toLowerCase() ?? '';
      const shadowActive = (host?.shadowRoot?.activeElement as HTMLElement) ?? null;
      return {
        outerActiveTag: outerActive,
        shadowActiveRole: shadowActive?.getAttribute('role') ?? null,
        shadowActiveTabindex: shadowActive?.getAttribute('tabindex') ?? null,
      };
    });

    console.log(`\n[DRW-06] outer activeElement: <${result.outerActiveTag}>, shadow activeElement: role="${result.shadowActiveRole}", tabindex="${result.shadowActiveTabindex}"`);
    expect(result.outerActiveTag).toBe('aegov-drawer');
    expect(result.shadowActiveRole).toBe('dialog');
    expect(result.shadowActiveTabindex).toBe('-1');
  });
});
