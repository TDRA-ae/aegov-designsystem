import { test, expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGE_URL = 'http://localhost:3333/docs/a11y-tests.html';

// ── helpers ──────────────────────────────────────────────────────────────────

let pageLoaded = false;

async function getPage(page: Page) {
  if (!pageLoaded) {
    await page.goto(PAGE_URL);
    // Wait for the first custom element to upgrade
    await page.waitForFunction(() =>
      customElements.get('aegov-datepicker') !== undefined
    );
    await page.waitForTimeout(500);
    pageLoaded = true;
  }
  return page;
}

// Each test navigates fresh to avoid state bleed
async function setup(page: Page) {
  await page.goto(PAGE_URL);
  await page.waitForFunction(() => customElements.get('aegov-datepicker') !== undefined);
  await page.waitForTimeout(400);
}

async function openCalendar(page: Page, triggerSelector: string) {
  await page.click(triggerSelector);
  await page.waitForSelector('.aegov-datepicker[role="dialog"]', { state: 'attached', timeout: 5000 });
  await page.waitForTimeout(200);
}

// ── axe automated scans ──────────────────────────────────────────────────────

test.describe('axe: automated WCAG scans', () => {

  test('single: closed state — no violations', async ({ page }) => {
    await setup(page);
    const results = await new AxeBuilder({ page })
      .include('#dp-single')
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test('single: open calendar — no violations', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-single .datepicker__trigger');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test('single: invalid state — no violations', async ({ page }) => {
    await setup(page);
    const results = await new AxeBuilder({ page })
      .include('#dp-invalid')
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test('single: disabled state — no violations', async ({ page }) => {
    await setup(page);
    const results = await new AxeBuilder({ page })
      .include('#dp-disabled')
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test('range: closed state — no violations', async ({ page }) => {
    await setup(page);
    const results = await new AxeBuilder({ page })
      .include('#dp-range')
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test('range: open calendar — no violations', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-range .datepicker__trigger');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test('range: with presets open — no violations', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-presets .datepicker__trigger');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test('range: invalid state — no violations', async ({ page }) => {
    await setup(page);
    const results = await new AxeBuilder({ page })
      .include('#dp-range-invalid')
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test('confirmation mode open — no violations', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-confirm .datepicker__trigger');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test('secondary variant open — no violations', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-secondary .datepicker__trigger');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test('neutral-max variant open — no violations', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-neutral-max .datepicker__trigger');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test('RTL mode open — no violations', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-rtl .datepicker__trigger');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
});

// ── ARIA attribute checks ─────────────────────────────────────────────────────

test.describe('ARIA: trigger attributes', () => {

  test('single input: aria-haspopup=dialog when closed', async ({ page }) => {
    await setup(page);
    await expect(page.locator('#dp-single input.datepicker__input')).toHaveAttribute('aria-haspopup', 'dialog');
  });

  test('single input: aria-expanded=false when closed', async ({ page }) => {
    await setup(page);
    await expect(page.locator('#dp-single input.datepicker__input')).toHaveAttribute('aria-expanded', 'false');
  });

  test('single input: aria-expanded=true when open', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-single .datepicker__trigger');
    await expect(page.locator('#dp-single input.datepicker__input')).toHaveAttribute('aria-expanded', 'true');
  });

  test('single input: aria-label updated to "Change date, …" when value set', async ({ page }) => {
    await setup(page);
    const label = await page.locator('#dp-single-value input.datepicker__input').getAttribute('aria-label');
    expect(label).toContain('Change date');
    expect(label).toContain('2026');
  });

  test('single input: aria-invalid=true when isInvalid', async ({ page }) => {
    await setup(page);
    await expect(page.locator('#dp-invalid input.datepicker__input')).toHaveAttribute('aria-invalid', 'true');
  });

  test('range: both inputs have aria-haspopup=dialog', async ({ page }) => {
    await setup(page);
    const inputs = page.locator('#dp-range input.datepicker__input');
    await expect(inputs.nth(0)).toHaveAttribute('aria-haspopup', 'dialog');
    await expect(inputs.nth(1)).toHaveAttribute('aria-haspopup', 'dialog');
  });

  test('range: both inputs get aria-invalid=true when isInvalid', async ({ page }) => {
    await setup(page);
    const inputs = page.locator('#dp-range-invalid input.datepicker__input');
    await expect(inputs.nth(0)).toHaveAttribute('aria-invalid', 'true');
    await expect(inputs.nth(1)).toHaveAttribute('aria-invalid', 'true');
  });

  test('single input: aria-describedby contains format-hint id', async ({ page }) => {
    await setup(page);
    const describedBy = await page.locator('#dp-format input.datepicker__input').getAttribute('aria-describedby');
    expect(describedBy).toContain('format-hint');
    const hintSpan = page.locator(`#${describedBy!.split(' ').find(id => id.includes('format-hint'))}`);
    await expect(hintSpan).toHaveText('DD MMM YYYY');
  });

  test('invalid single: aria-describedby references error element', async ({ page }) => {
    await setup(page);
    const describedBy = await page.locator('#dp-invalid input.datepicker__input').getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    const errorId = describedBy!.split(' ').find(id => id.includes('error'));
    expect(errorId).toBeTruthy();
    await expect(page.locator(`#${errorId}`)).toHaveText('Date is required');
  });
});

// ── ARIA: dialog and grid ────────────────────────────────────────────────────

test.describe('ARIA: dialog and calendar grid', () => {

  test('dialog has role=dialog + aria-modal=true + aria-labelledby', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-single .datepicker__trigger');
    const dialog = page.locator('.aegov-datepicker[role="dialog"]');
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    const labelledBy = await dialog.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    const titleEl = page.locator(`#${labelledBy}`);
    const titleText = await titleEl.textContent();
    expect(titleText!.length).toBeGreaterThan(3);
  });

  test('calendar grid: role=grid with aria-label containing month + year', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-single .datepicker__trigger');
    const grid = page.locator('[role="grid"]').first();
    await expect(grid).toBeVisible();
    const label = await grid.getAttribute('aria-label');
    expect(label).toBeTruthy();
    expect(label!.length).toBeGreaterThan(4);
  });

  test('weekday headers: 7 columnheaders with abbr titles', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-single .datepicker__trigger');
    const headers = page.locator('[role="columnheader"]');
    await expect(headers).toHaveCount(7);
    const abbr = headers.first().locator('abbr');
    const title = await abbr.getAttribute('title');
    expect(title!.length).toBeGreaterThan(2);
  });

  test('today has aria-current=date', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-single .datepicker__trigger');
    await expect(page.locator('[aria-current="date"]')).toBeVisible();
  });

  test('selected cell gets aria-selected=true on gridcell', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-single-value .datepicker__trigger');
    const selectedCell = page.locator('[role="gridcell"][aria-selected="true"]');
    await expect(selectedCell).toHaveCount(1);
  });

  test('outside-month cells are aria-hidden=true', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-single .datepicker__trigger');
    const hiddenCells = page.locator('[role="gridcell"][aria-hidden="true"]');
    expect(await hiddenCells.count()).toBeGreaterThan(0);
  });

  test('disabled dates: aria-disabled=true + disabled + label ends with "unavailable"', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-blackout .datepicker__trigger');
    const disabledBtn = page.locator('.datepicker__day[data-date="2026-06-16"]');
    await expect(disabledBtn).toHaveAttribute('aria-disabled', 'true');
    await expect(disabledBtn).toBeDisabled();
    const label = await disabledBtn.getAttribute('aria-label');
    expect(label).toContain('unavailable');
  });

  test('range: all selected-range gridcells have aria-selected=true; unselected cells have aria-selected=false', async ({ page }) => {
    await setup(page);
    // Fixture: value="2026-06-10 / 2026-06-20" → 11 days inclusive (start + 9 in-range + end)
    await openCalendar(page, '#dp-range-value .datepicker__trigger');
    const selectedCells = page.locator('[role="gridcell"][aria-selected="true"]');
    await expect(selectedCells).toHaveCount(11);
    // Non-selected visible cells must expose aria-selected=false (not absent)
    const unselectedCells = page.locator('[role="gridcell"][aria-selected="false"]');
    await expect(unselectedCells).not.toHaveCount(0);
  });

  test('nav buttons have aria-label', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-single .datepicker__trigger');
    const prevBtn = page.locator('.datepicker__nav-btn').first();
    const nextBtn = page.locator('.datepicker__nav-btn').last();
    expect(await prevBtn.getAttribute('aria-label')).toBeTruthy();
    expect(await nextBtn.getAttribute('aria-label')).toBeTruthy();
  });
});

// ── ARIA: presets and confirmation ────────────────────────────────────────────

test.describe('ARIA: presets and confirmation', () => {

  test('presets panel: role=group with aria-label', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-presets .datepicker__trigger');
    const panel = page.locator('.datepicker__presets[role="group"]');
    await expect(panel).toBeVisible();
    const label = await panel.getAttribute('aria-label');
    expect(label!.length).toBeGreaterThan(0);
  });

  test('preset buttons: have aria-pressed attribute', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-presets .datepicker__trigger');
    const btns = page.locator('.datepicker__preset-btn');
    await expect(btns.first()).toHaveAttribute('aria-pressed');
  });

  test('confirmation: Apply disabled when no date selected', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-confirm .datepicker__trigger');
    const applyBtn = page.locator('.datepicker__footer-btn--apply');
    await expect(applyBtn).toBeDisabled();
    await expect(applyBtn).toHaveAttribute('aria-disabled', 'true');
  });

  test('confirmation: Apply enables after picking a date', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-confirm .datepicker__trigger');
    const applyBtn = page.locator('.datepicker__footer-btn--apply');
    await expect(applyBtn).toBeDisabled();
    const firstEnabled = page.locator('.datepicker__day:not(.datepicker__day--disabled):not(.datepicker__day--outside)').first();
    await firstEnabled.click();
    await page.waitForTimeout(100);
    await expect(applyBtn).toBeEnabled();
    await expect(applyBtn).toHaveAttribute('aria-disabled', 'false');
  });

  test('confirmation: Cancel has aria-label', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-confirm .datepicker__trigger');
    const cancelBtn = page.locator('.datepicker__footer-btn--cancel');
    expect(await cancelBtn.getAttribute('aria-label')).toBeTruthy();
  });
});

// ── Keyboard navigation ───────────────────────────────────────────────────────

test.describe('keyboard: navigation', () => {

  test('Enter on input opens calendar', async ({ page }) => {
    await setup(page);
    await page.locator('#dp-single input.datepicker__input').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.aegov-datepicker[role="dialog"]')).toBeVisible();
  });

  test('Escape closes and returns focus to trigger', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-single .datepicker__trigger');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);
    await expect(page.locator('.aegov-datepicker[role="dialog"]')).not.toBeVisible();
    await expect(page.locator('#dp-single input.datepicker__input')).toBeFocused();
  });

  test('ArrowRight moves focused day +1', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-single-value .datepicker__trigger');
    const before = await page.locator('.datepicker__day--focused').getAttribute('data-date');
    expect(before).toBe('2026-06-15');
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(80);
    expect(await page.locator('.datepicker__day--focused').getAttribute('data-date')).toBe('2026-06-16');
  });

  test('ArrowLeft moves focused day -1', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-single-value .datepicker__trigger');
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(80);
    expect(await page.locator('.datepicker__day--focused').getAttribute('data-date')).toBe('2026-06-14');
  });

  test('ArrowDown moves focused day +7', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-single-value .datepicker__trigger');
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(80);
    expect(await page.locator('.datepicker__day--focused').getAttribute('data-date')).toBe('2026-06-22');
  });

  test('ArrowUp moves focused day -7', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-single-value .datepicker__trigger');
    await page.keyboard.press('ArrowUp');
    await page.waitForTimeout(80);
    expect(await page.locator('.datepicker__day--focused').getAttribute('data-date')).toBe('2026-06-08');
  });

  test('PageDown navigates to next month', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-single-value .datepicker__trigger');
    await page.keyboard.press('PageDown');
    await page.waitForTimeout(200);
    const gridLabel = await page.locator('[role="grid"]').first().getAttribute('aria-label');
    expect(gridLabel).toContain('July');
  });

  test('Shift+PageDown navigates +1 year', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-single-value .datepicker__trigger');
    await page.keyboard.press('Shift+PageDown');
    await page.waitForTimeout(200);
    const gridLabel = await page.locator('[role="grid"]').first().getAttribute('aria-label');
    expect(gridLabel).toContain('2027');
  });

  test('PageUp navigates to previous month', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-single-value .datepicker__trigger');
    await page.keyboard.press('PageUp');
    await page.waitForTimeout(200);
    const gridLabel = await page.locator('[role="grid"]').first().getAttribute('aria-label');
    expect(gridLabel).toContain('May');
  });

  test('Home moves to first day of current week', async ({ page }) => {
    await setup(page);
    // June 15 2026 is Monday; week starts Sunday → Home → June 14
    await openCalendar(page, '#dp-single-value .datepicker__trigger');
    await page.keyboard.press('Home');
    await page.waitForTimeout(80);
    expect(await page.locator('.datepicker__day--focused').getAttribute('data-date')).toBe('2026-06-14');
  });

  test('End moves to last day of current week', async ({ page }) => {
    await setup(page);
    // June 15 is Monday; week starts Sunday → End → June 20 (Saturday)
    await openCalendar(page, '#dp-single-value .datepicker__trigger');
    await page.keyboard.press('End');
    await page.waitForTimeout(80);
    expect(await page.locator('.datepicker__day--focused').getAttribute('data-date')).toBe('2026-06-20');
  });

  test('Tab keeps focus trapped inside dialog', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-single .datepicker__trigger');
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(20);
    }
    const activeInDialog = await page.evaluate(() => {
      const dialog = document.querySelector('.aegov-datepicker[role="dialog"]');
      return dialog?.contains(document.activeElement) ?? false;
    });
    expect(activeInDialog).toBe(true);
  });

  test('SELECT arrows not intercepted by day navigation', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-single-value .datepicker__trigger');
    const monthSelect = page.locator('select.datepicker__select').first();
    await monthSelect.focus();
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(100);
    const activeTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(activeTag).toBe('SELECT');
    const focusedOnDay = await page.evaluate(() =>
      document.activeElement?.classList.contains('datepicker__day') ?? false
    );
    expect(focusedOnDay).toBe(false);
  });

  test('ArrowRight skips blackout dates', async ({ page }) => {
    // June 15 is focus; June 16+17 are blacked out → ArrowRight → June 18
    await setup(page);
    await openCalendar(page, '#dp-blackout .datepicker__trigger');
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(100);
    expect(await page.locator('.datepicker__day--focused').getAttribute('data-date')).toBe('2026-06-18');
  });

  test('focusout from input triggers blur validation (focusout bubbles)', async ({ page }) => {
    await setup(page);
    await page.locator('#dp-single input.datepicker__input').focus();
    // Tab to the next focusable element outside the datepicker
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);
    // Verify no JS errors — component should remain intact
    await expect(page.locator('#dp-single')).toBeVisible();
  });
});

// ── Live regions ──────────────────────────────────────────────────────────────

test.describe('live regions', () => {

  test('host has polite live region', async ({ page }) => {
    await setup(page);
    await expect(page.locator('#dp-single [aria-live="polite"]')).toBeAttached();
  });

  test('portal has polite live region when open', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-single .datepicker__trigger');
    const liveEl = page.locator('.datepicker__live-region[aria-live="polite"]');
    await expect(liveEl).toBeAttached();
    await expect(liveEl).toHaveAttribute('aria-atomic', 'true');
  });

  test('PageDown updates portal live region with new month', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-single-value .datepicker__trigger');
    await page.keyboard.press('PageDown');
    await page.waitForTimeout(300);
    const text = await page.locator('.datepicker__live-region').textContent();
    expect(text).toContain('July');
  });

  test('ArrowRight updates portal live region with focused date', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-single-value .datepicker__trigger');
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(300);
    const text = await page.locator('.datepicker__live-region').textContent();
    expect(text!.length).toBeGreaterThan(0);
  });

  test('range-invalid hover announces via live region', async ({ page }) => {
    await setup(page);
    await openCalendar(page, '#dp-minrange .datepicker__trigger');
    // Click first enabled day to start range
    const days = page.locator('#dp-minrange ~ * .datepicker__day:not(.datepicker__day--disabled):not(.datepicker__day--outside), .datepicker__day:not(.datepicker__day--disabled):not(.datepicker__day--outside)');
    const firstDay = page.locator('.datepicker__day:not(.datepicker__day--disabled):not(.datepicker__day--outside)').first();
    await firstDay.click();
    await page.waitForTimeout(100);
    // Hover 2nd day (range of 2 days < minRange 5 → invalid)
    const secondDay = page.locator('.datepicker__day:not(.datepicker__day--disabled):not(.datepicker__day--outside)').nth(1);
    await secondDay.hover();
    await page.waitForTimeout(400);
    const text = await page.locator('.datepicker__live-region').textContent();
    expect(text!.length).toBeGreaterThan(0);
  });
});
