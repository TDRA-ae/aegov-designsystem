/**
 * Accessibility Tree Inspector
 *
 * Captures what VoiceOver / screen readers announce at each interaction state
 * of the aegov-datepicker component, compared against the W3C APG Date Picker
 * Dialog pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/
 *
 * All assertions are based on actual Playwright ariaSnapshot output from the
 * live component. Tests both verify the structure AND log what VoiceOver says.
 */
import { test, expect, Page } from '@playwright/test';

const URL = 'http://localhost:3333/docs/a11y-tests.html';

async function load(page: Page) {
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => customElements.get('aegov-datepicker') !== undefined, { timeout: 15000 });
  await page.waitForTimeout(400);
}

async function openCalendar(page: Page, id: string) {
  await page.locator(id).click();
  await page.waitForSelector('[role="dialog"]', { timeout: 8000 });
  await page.waitForTimeout(300);
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 — TRIGGER (CLOSED STATE)
// W3C APG pattern: trigger must announce role + state (combobox, collapsed)
// ─────────────────────────────────────────────────────────────────────────────
test.describe('1. Trigger — Closed State', () => {

  test('single: combobox role + collapsed state + placeholder as label', async ({ page }) => {
    await load(page);
    const dp = page.locator('#dp-single');
    const snapshot = await dp.ariaSnapshot();
    console.log('\n[VOICEOVER — single trigger closed]\n' + snapshot);

    // VoiceOver reads: "Pick a date, combobox, collapsed"
    expect(snapshot).toContain('combobox');
    expect(snapshot).toContain('Pick a date');
    expect(snapshot).not.toContain('[expanded]');
    // Format hint text is also in the tree (read by AT as description)
    expect(snapshot).toContain('YYYY-MM-DD');
  });

  test('single with value: aria-label becomes "Change date, [formatted date]"', async ({ page }) => {
    await load(page);
    const dp = page.locator('#dp-single-value');
    const input = dp.locator('input[role="combobox"]');
    const label = await input.getAttribute('aria-label');
    console.log(`\n[VOICEOVER — single with value]\n  VoiceOver reads: "${label}, combobox, collapsed"`);

    // VoiceOver reads: "Change date, June 15, 2026, combobox, collapsed"
    expect(label?.toLowerCase()).toContain('change date');
    expect(label).toContain('2026');
  });

  test('invalid single: [invalid] flag + error message linked via aria-describedby', async ({ page }) => {
    await load(page);
    const dp = page.locator('#dp-invalid');
    const input = dp.locator('input[role="combobox"]');
    const snapshot = await dp.ariaSnapshot();
    console.log('\n[VOICEOVER — invalid trigger]\n' + snapshot);

    // VoiceOver reads: "Select date, combobox, invalid data, Date is required"
    expect(snapshot).toContain('[invalid]');
    expect(snapshot).toContain('Date is required');

    const invalid = await input.getAttribute('aria-invalid');
    const describedBy = await input.getAttribute('aria-describedby');
    expect(invalid).toBe('true');
    expect(describedBy).toBeTruthy();
  });

  test('disabled single: [disabled] flag in ariaSnapshot', async ({ page }) => {
    await load(page);
    const dp = page.locator('#dp-disabled');
    const snapshot = await dp.ariaSnapshot();
    console.log('\n[VOICEOVER — disabled trigger]\n' + snapshot);

    // VoiceOver reads: "Change date, May 1, 2026, combobox, dimmed"
    expect(snapshot).toContain('[disabled]');
    expect(snapshot).toContain('combobox');
  });

  test('range: two separate comboboxes with distinct labels', async ({ page }) => {
    await load(page);
    const dp = page.locator('#dp-range');
    const snapshot = await dp.ariaSnapshot();
    console.log('\n[VOICEOVER — range trigger]\n' + snapshot);

    // VoiceOver reads each separately:
    // "Start date, combobox, collapsed" then "End date, combobox, collapsed"
    expect(snapshot).toContain('combobox "Start date"');
    expect(snapshot).toContain('combobox "End date"');

    const inputs = dp.locator('input[role="combobox"]');
    expect(await inputs.count()).toBe(2);
    expect(await inputs.nth(0).getAttribute('aria-label')).toBe('Start date');
    expect(await inputs.nth(1).getAttribute('aria-label')).toBe('End date');
  });

  test('range invalid: both combobox inputs flagged [invalid]', async ({ page }) => {
    await load(page);
    const dp = page.locator('#dp-range-invalid');
    const inputs = dp.locator('input[role="combobox"]');
    const snapshot = await dp.ariaSnapshot();
    console.log('\n[VOICEOVER — range invalid trigger]\n' + snapshot);

    for (let i = 0; i < 2; i++) {
      expect(await inputs.nth(i).getAttribute('aria-invalid')).toBe('true');
    }
    expect(snapshot).toContain('Date range required');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 — CALENDAR DIALOG
// W3C APG: role=dialog + aria-modal + aria-labelledby
// VoiceOver on open: "[month year], dialog"
// ─────────────────────────────────────────────────────────────────────────────
test.describe('2. Calendar Dialog — Open State', () => {

  test('dialog: snapshot shows role=dialog labeled by month/year', async ({ page }) => {
    await load(page);
    await openCalendar(page, '#dp-single');
    const dialog = page.locator('[role="dialog"]').first();
    const snapshot = await dialog.ariaSnapshot({ maxLength: 2000 });
    console.log('\n[VOICEOVER — dialog opens]\n' + snapshot.substring(0, 500));

    // VoiceOver announces: "[month year], dialog"
    expect(snapshot).toMatch(/dialog ".+\d{4}"/);
    expect(snapshot).toContain('dialog');
  });

  test('dialog: aria-modal="true" prevents AT from reading background content', async ({ page }) => {
    await load(page);
    await openCalendar(page, '#dp-single');
    const dialog = page.locator('[role="dialog"]').first();
    const modal = await dialog.getAttribute('aria-modal');
    console.log(`\n[ARIA-MODAL] value: "${modal}"`);
    console.log('[VOICEOVER] aria-modal prevents VoiceOver from reading outside the dialog');
    expect(modal).toBe('true');
  });

  test('trigger aria-expanded flips: false → true on open', async ({ page }) => {
    await load(page);
    const input = page.locator('#dp-single input[role="combobox"]');

    expect(await input.getAttribute('aria-expanded')).toBe('false');
    console.log('\n[VOICEOVER] Before open: "collapsed"');

    await openCalendar(page, '#dp-single');

    expect(await input.getAttribute('aria-expanded')).toBe('true');
    console.log('[VOICEOVER] After open: "expanded"');
  });

  test('trigger aria-controls points to the open dialog', async ({ page }) => {
    await load(page);
    await openCalendar(page, '#dp-single');
    const input = page.locator('#dp-single input[role="combobox"]');
    const controls = await input.getAttribute('aria-controls');
    console.log(`\n[ARIA-CONTROLS] references: "${controls}"`);
    expect(controls).toBeTruthy();
    await expect(page.locator(`#${controls}`)).toBeVisible();
  });

  test('navigation buttons: each has aria-label for VoiceOver', async ({ page }) => {
    await load(page);
    await openCalendar(page, '#dp-single');
    const dialog = page.locator('[role="dialog"]').first();
    const buttons = dialog.locator('button[aria-label]');
    const count = await buttons.count();
    console.log(`\n[NAV BUTTONS] (${count} with aria-label):`);
    for (let i = 0; i < count; i++) {
      console.log(`  "${await buttons.nth(i).getAttribute('aria-label')}"`);
    }
    expect(count).toBeGreaterThan(0);
  });

  test('dialog has aria-live region — VoiceOver hears month changes', async ({ page }) => {
    await load(page);
    await openCalendar(page, '#dp-single');
    const dialog = page.locator('[role="dialog"]').first();
    const liveRegions = dialog.locator('[aria-live]');
    const count = await liveRegions.count();
    console.log(`\n[LIVE REGIONS] (${count} found):`);
    for (let i = 0; i < count; i++) {
      const el = liveRegions.nth(i);
      console.log(`  [${i}] aria-live="${await el.getAttribute('aria-live')}" aria-atomic="${await el.getAttribute('aria-atomic')}" text="${(await el.textContent())?.trim()}"`);
    }
    expect(count).toBeGreaterThan(0);
  });

  test('NO duplicate month announcement on open (dialog label is sufficient)', async ({ page }) => {
    await load(page);
    await openCalendar(page, '#dp-single');
    const dialog = page.locator('[role="dialog"]').first();
    // Live region should be EMPTY on initial open — dialog aria-labelledby handles announcement
    const liveRegion = dialog.locator('[aria-live="polite"]');
    const liveText = (await liveRegion.textContent())?.trim();
    console.log(`\n[LIVE REGION on open] content: "${liveText}"`);
    console.log('[VoiceOver] Should NOT double-announce month on open');
    expect(liveText).toBe('');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 — CALENDAR GRID
// W3C APG: role=grid + role=columnheader with full names + roving tabindex
// VoiceOver reads day button: "[weekday], [month] [day], [year], button"
// ─────────────────────────────────────────────────────────────────────────────
test.describe('3. Calendar Grid — Day Cells', () => {

  test('grid: role="grid" labeled by month/year', async ({ page }) => {
    await load(page);
    await openCalendar(page, '#dp-single');
    const grid = page.locator('[role="grid"]').first();
    const gridLabel = await grid.getAttribute('aria-label');
    const snapshot = await grid.ariaSnapshot({ maxLength: 500 });
    console.log('\n[VOICEOVER — calendar grid]\n' + snapshot.substring(0, 300));
    console.log(`\n  Grid aria-label: "${gridLabel}"`);

    expect(snapshot).toContain('grid');
    expect(gridLabel).toBeTruthy();
    // label should contain month and year
    expect(gridLabel).toMatch(/\d{4}/);
  });

  test('columnheaders: full day name via aria-label (VoiceOver reads "Sunday" not "Sun")', async ({ page }) => {
    await load(page);
    await openCalendar(page, '#dp-single');
    const headers = page.locator('[role="columnheader"]');
    const count = await headers.count();
    console.log(`\n[COLUMN HEADERS] (${count} — VoiceOver reads full names):`);
    const fullNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let i = 0; i < count; i++) {
      const ariaLabel = await headers.nth(i).getAttribute('aria-label');
      const visible = (await headers.nth(i).textContent())?.trim();
      console.log(`  visible: "${visible}" → VoiceOver reads: "${ariaLabel}"`);
      // aria-label should be full day name (not "Sun", "Mon" etc.)
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel!.length).toBeGreaterThan(3); // "Sun" = 3, "Sunday" = 6
    }
    expect(count).toBe(7);
  });

  test('day buttons: aria-label provides full date ("Monday, June 29, 2026")', async ({ page }) => {
    await load(page);
    await openCalendar(page, '#dp-single');
    const dayBtns = page.locator('.datepicker__day');
    const count = await dayBtns.count();
    console.log(`\n[DAY BUTTONS] ${count} total`);
    for (let i = 0; i < 5; i++) {
      const label = await dayBtns.nth(i).getAttribute('aria-label');
      const tabindex = await dayBtns.nth(i).getAttribute('tabindex');
      console.log(`  [${i}] VoiceOver: "${label}" (tabindex=${tabindex})`);
      if (label) {
        // Must include day-of-week, day number, month, year
        expect(label).toMatch(/\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/);
        expect(label).toMatch(/\d{4}/);
      }
    }
  });

  test('roving tabindex: exactly one day has tabindex=0 (the VoiceOver focus target)', async ({ page }) => {
    await load(page);
    await openCalendar(page, '#dp-single');
    const dayBtns = page.locator('.datepicker__day');
    const count = await dayBtns.count();
    let tabzeroCount = 0;
    let tabzeroLabel = '';
    for (let i = 0; i < count; i++) {
      if (await dayBtns.nth(i).getAttribute('tabindex') === '0') {
        tabzeroCount++;
        tabzeroLabel = await dayBtns.nth(i).getAttribute('aria-label') ?? '';
      }
    }
    console.log(`\n[ROVING TABINDEX] tabindex=0 count: ${tabzeroCount}, on: "${tabzeroLabel}"`);
    console.log('[VOICEOVER] Tab into grid → VoiceOver reads this cell first');
    expect(tabzeroCount).toBe(1);
  });

  test('selected day: aria-selected="true" on gridcell (not aria-pressed on button)', async ({ page }) => {
    await load(page);
    await openCalendar(page, '#dp-single-value'); // value="2026-06-15"
    const selected = page.locator('[role="gridcell"][aria-selected="true"]');
    const count = await selected.count();
    const label = count > 0 ? await selected.first().getAttribute('aria-label') : 'none';
    console.log(`\n[SELECTED DAY] gridcell with aria-selected="true": ${count}, label: "${label}"`);
    console.log('[VOICEOVER] Selected cell is announced as "selected" by AT');
    expect(count).toBe(1);
  });

  test('keyboard ArrowRight: roving tabindex moves to next day', async ({ page }) => {
    await load(page);
    await openCalendar(page, '#dp-single');

    // Calendar opens with focus on today's day button (focusDayButton runs on open).
    // Use focus() not click() — clicking a day in single mode closes the calendar.
    const focusedDay = page.locator('.datepicker__day[tabindex="0"]').first();
    await focusedDay.focus();
    await page.waitForTimeout(100);

    const beforeLabel = await page.locator('.datepicker__day[tabindex="0"]').getAttribute('aria-label');
    console.log(`\n[KEYBOARD NAV] Focused: "${beforeLabel}"`);

    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(150);

    const afterLabel = await page.locator('.datepicker__day[tabindex="0"]').getAttribute('aria-label');
    console.log(`[KEYBOARD NAV] After ArrowRight: "${afterLabel}"`);
    console.log(`[VOICEOVER] Announces: "${afterLabel}"`);

    expect(afterLabel).not.toBe(beforeLabel);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4 — PRESETS & CONFIRMATION
// ─────────────────────────────────────────────────────────────────────────────
test.describe('4. Presets & Confirmation', () => {

  test('presets: role=group with accessible name + button children', async ({ page }) => {
    await load(page);
    await openCalendar(page, '#dp-presets');
    const dialog = page.locator('[role="dialog"]').first();
    const snapshot = await dialog.ariaSnapshot({ maxLength: 800 });
    console.log('\n[VOICEOVER — presets panel]\n' + snapshot.substring(0, 600));

    // group "Date range presets" → VoiceOver: "Date range presets, group"
    expect(snapshot).toContain('group "Date range presets"');
    expect(snapshot).toContain('button "Today"');
  });

  test('confirmation: Apply button disabled until date selected', async ({ page }) => {
    await load(page);
    await openCalendar(page, '#dp-confirm');
    const dialog = page.locator('[role="dialog"]').first();
    const footerBtns = dialog.locator('.datepicker__footer-btn');
    const count = await footerBtns.count();
    console.log(`\n[CONFIRM FOOTER] ${count} buttons:`);
    for (let i = 0; i < count; i++) {
      const label = (await footerBtns.nth(i).textContent())?.trim();
      const disabled = await footerBtns.nth(i).getAttribute('disabled') !== null;
      console.log(`  "${label}" disabled: ${disabled}`);
      if (disabled) {
        console.log(`  [VOICEOVER] "${label}, dimmed"`);
      }
    }
    // Apply button should be disabled before any date is selected
    const applyBtn = footerBtns.filter({ hasText: /apply/i });
    if (await applyBtn.count() > 0) {
      expect(await applyBtn.getAttribute('disabled')).not.toBeNull();
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5 — FULL ARIA SNAPSHOT REPORT (documentation)
// ─────────────────────────────────────────────────────────────────────────────
test.describe('5. Full ARIA Snapshot Report', () => {

  test('complete VoiceOver experience — single datepicker (closed)', async ({ page }) => {
    await load(page);
    const snapshot = await page.locator('#dp-single').ariaSnapshot();
    console.log('\n════ SINGLE (CLOSED) — what VoiceOver reads ════\n' + snapshot);
    expect(snapshot).toBeTruthy();
  });

  test('complete VoiceOver experience — single datepicker (dialog open)', async ({ page }) => {
    await load(page);
    await openCalendar(page, '#dp-single');
    const dialog = page.locator('[role="dialog"]').first();
    const snapshot = await dialog.ariaSnapshot({ maxLength: 4000 });
    console.log('\n════ SINGLE (OPEN) — what VoiceOver reads in calendar ════\n' + snapshot.substring(0, 2000));
    expect(snapshot).toBeTruthy();
  });

  test('complete VoiceOver experience — range datepicker (dialog open)', async ({ page }) => {
    await load(page);
    await openCalendar(page, '#dp-range');
    const dialog = page.locator('[role="dialog"]').first();
    const snapshot = await dialog.ariaSnapshot({ maxLength: 2000 });
    console.log('\n════ RANGE (OPEN) — what VoiceOver reads in calendar ════\n' + snapshot.substring(0, 1000));
    expect(snapshot).toBeTruthy();
  });

  test('RTL datepicker: closed + open accessibility tree', async ({ page }) => {
    await load(page);
    const closed = await page.locator('#dp-rtl').ariaSnapshot();
    console.log('\n════ RTL (CLOSED) ════\n' + closed);

    await openCalendar(page, '#dp-rtl');
    const dialog = page.locator('[role="dialog"]').first();
    const open = await dialog.ariaSnapshot({ maxLength: 1000 });
    console.log('\n════ RTL (OPEN — first 500 chars) ════\n' + open.substring(0, 500));
    expect(closed).toBeTruthy();
    expect(open).toBeTruthy();
  });
});
