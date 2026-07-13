import { test, expect, Page } from '@playwright/test';

const BASE = 'http://localhost:3333';

async function setup(page: Page) {
  await page.goto(`${BASE}/docs/a11y-tests-accordion.html`, { waitUntil: 'networkidle' });
  await page.waitForFunction(
    () => customElements.get('aegov-accordion') !== undefined,
    { timeout: 15000 }
  );
}

// All trigger buttons scoped to a specific accordion host id
const btns = (page: Page, accId: string) =>
  page.locator(`aegov-accordion[id="${accId}"] button.accordion-item__header`);

// All region panels scoped to a specific accordion host id
const panels = (page: Page, accId: string) =>
  page.locator(`aegov-accordion[id="${accId}"] div[role="region"]`);

// Content wrapper (height-animated div that carries the inert attribute)
const wrappers = (page: Page, accId: string) =>
  page.locator(`aegov-accordion[id="${accId}"] div.accordion-item__content-wrapper`);

// ---------------------------------------------------------------------------
// ARIA: structure
// ---------------------------------------------------------------------------
test.describe('ARIA: structure', () => {

  test('ACC-01: trigger has aria-expanded, aria-controls, and id', async ({ page }) => {
    await setup(page);
    const trigger = btns(page, 'acc-basic').first();
    await expect(trigger).toHaveAttribute('aria-expanded');
    await expect(trigger).toHaveAttribute('aria-controls');
    await expect(trigger).toHaveAttribute('id');
  });

  test('ACC-02: aria-controls on trigger matches the id of a role=region panel', async ({ page }) => {
    await setup(page);
    const trigger = btns(page, 'acc-basic').first();
    const panelId = await trigger.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();
    await expect(page.locator(`#${panelId}`)).toHaveAttribute('role', 'region');
  });

  test('ACC-03: panel aria-labelledby matches trigger id (cross-reference)', async ({ page }) => {
    await setup(page);
    const trigger = btns(page, 'acc-basic').first();
    const panelId = await trigger.getAttribute('aria-controls');
    const triggerId = await trigger.getAttribute('id');
    await expect(page.locator(`#${panelId}`)).toHaveAttribute('aria-labelledby', triggerId!);
  });

  test('ACC-04: trigger is inside a heading element (default level h3)', async ({ page }) => {
    await setup(page);
    const headingWrapper = page.locator('aegov-accordion[id="acc-basic"] .accordion-item__heading-wrapper').first();
    const tag = await headingWrapper.evaluate(el => el.tagName.toLowerCase());
    expect(tag).toBe('h3');
  });

  test('ACC-05: heading-level prop propagates — heading-level="2" renders h2 wrappers', async ({ page }) => {
    await setup(page);
    const wrapper = page.locator('aegov-accordion[id="acc-heading-h2"] .accordion-item__heading-wrapper').first();
    const tag = await wrapper.evaluate(el => el.tagName.toLowerCase());
    expect(tag).toBe('h2');
  });

  test('ACC-06: aria-expanded="false" on closed trigger', async ({ page }) => {
    await setup(page);
    await expect(btns(page, 'acc-basic').first()).toHaveAttribute('aria-expanded', 'false');
  });

  test('ACC-07: aria-expanded="true" on open trigger', async ({ page }) => {
    await setup(page);
    const trigger = btns(page, 'acc-basic').first();
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  test('ACC-08: closed panel has aria-hidden="true"', async ({ page }) => {
    await setup(page);
    await expect(panels(page, 'acc-basic').first()).toHaveAttribute('aria-hidden', 'true');
  });

  test('ACC-09: open panel does not have aria-hidden', async ({ page }) => {
    await setup(page);
    await btns(page, 'acc-basic').first().click();
    await expect(panels(page, 'acc-basic').first()).not.toHaveAttribute('aria-hidden');
  });

  test('ACC-10: closed panel content wrapper has inert attribute', async ({ page }) => {
    await setup(page);
    await expect(wrappers(page, 'acc-basic').first()).toHaveAttribute('inert');
  });

  test('ACC-11: open panel content wrapper has no inert attribute', async ({ page }) => {
    await setup(page);
    await btns(page, 'acc-basic').first().click();
    await expect(wrappers(page, 'acc-basic').first()).not.toHaveAttribute('inert');
  });

  test('ACC-12: disabled item trigger has aria-disabled="true"', async ({ page }) => {
    await setup(page);
    const disabledTrigger = btns(page, 'acc-disabled').nth(1);
    await expect(disabledTrigger).toHaveAttribute('aria-disabled', 'true');
  });

  test('ACC-13: disabled item stays collapsed after click (aria-expanded stays false)', async ({ page }) => {
    await setup(page);
    const disabledTrigger = btns(page, 'acc-disabled').nth(1);
    // force:true bypasses Playwright's aria-disabled actionability check so we can
    // verify the component itself ignores clicks on disabled items
    await disabledTrigger.click({ force: true });
    await expect(disabledTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('ACC-14: default-open item has aria-expanded="true" on initial render', async ({ page }) => {
    await setup(page);
    await expect(btns(page, 'acc-default-open').first()).toHaveAttribute('aria-expanded', 'true');
  });

  test('ACC-15: default-open panel has no aria-hidden on initial render', async ({ page }) => {
    await setup(page);
    await expect(panels(page, 'acc-default-open').first()).not.toHaveAttribute('aria-hidden');
  });

});

// ---------------------------------------------------------------------------
// keyboard: navigation (APG accordion pattern)
// ---------------------------------------------------------------------------
test.describe('keyboard: navigation', () => {

  test('ACC-16: ArrowDown moves focus to next trigger', async ({ page }) => {
    await setup(page);
    const allBtns = await btns(page, 'acc-basic').all();
    await allBtns[0].focus();
    await page.keyboard.press('ArrowDown');
    await expect(allBtns[1]).toBeFocused();
  });

  test('ACC-17: ArrowUp moves focus to previous trigger', async ({ page }) => {
    await setup(page);
    const allBtns = await btns(page, 'acc-basic').all();
    await allBtns[1].focus();
    await page.keyboard.press('ArrowUp');
    await expect(allBtns[0]).toBeFocused();
  });

  test('ACC-18: Home moves focus to first trigger', async ({ page }) => {
    await setup(page);
    const allBtns = await btns(page, 'acc-basic').all();
    await allBtns[2].focus();
    await page.keyboard.press('Home');
    await expect(allBtns[0]).toBeFocused();
  });

  test('ACC-19: End moves focus to last trigger', async ({ page }) => {
    await setup(page);
    const allBtns = await btns(page, 'acc-basic').all();
    await allBtns[0].focus();
    await page.keyboard.press('End');
    await expect(allBtns[2]).toBeFocused();
  });

  test('ACC-20: ArrowDown wraps from last trigger to first', async ({ page }) => {
    await setup(page);
    const allBtns = await btns(page, 'acc-basic').all();
    await allBtns[2].focus();
    await page.keyboard.press('ArrowDown');
    await expect(allBtns[0]).toBeFocused();
  });

  test('ACC-21: ArrowUp wraps from first trigger to last', async ({ page }) => {
    await setup(page);
    const allBtns = await btns(page, 'acc-basic').all();
    await allBtns[0].focus();
    await page.keyboard.press('ArrowUp');
    await expect(allBtns[2]).toBeFocused();
  });

  test('ACC-22: ArrowDown skips disabled triggers', async ({ page }) => {
    await setup(page);
    // acc-disabled layout: [Active 1, Disabled, Active 2]
    const allBtns = await btns(page, 'acc-disabled').all();
    await allBtns[0].focus(); // Active 1
    await page.keyboard.press('ArrowDown');
    // Should skip index 1 (disabled) and land on index 2 (Active 2)
    await expect(allBtns[2]).toBeFocused();
  });

  test('ACC-23: Enter on focused trigger opens the item', async ({ page }) => {
    await setup(page);
    const trigger = btns(page, 'acc-basic').first();
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

});

// ---------------------------------------------------------------------------
// single vs multiple open mode
// ---------------------------------------------------------------------------
test.describe('single vs multiple mode', () => {

  test('ACC-24: single mode — opening second item closes first', async ({ page }) => {
    await setup(page);
    const allBtns = await btns(page, 'acc-basic').all();
    await allBtns[0].click();
    await expect(allBtns[0]).toHaveAttribute('aria-expanded', 'true');
    await allBtns[1].click();
    await expect(allBtns[0]).toHaveAttribute('aria-expanded', 'false');
    await expect(allBtns[1]).toHaveAttribute('aria-expanded', 'true');
  });

  test('ACC-25: multiple mode — opening second item does not close first', async ({ page }) => {
    await setup(page);
    const allBtns = await btns(page, 'acc-multiple').all();
    await allBtns[0].click();
    await allBtns[1].click();
    await expect(allBtns[0]).toHaveAttribute('aria-expanded', 'true');
    await expect(allBtns[1]).toHaveAttribute('aria-expanded', 'true');
  });

});

// ---------------------------------------------------------------------------
// inert content: closed panels exclude content from tab order
// ---------------------------------------------------------------------------
test.describe('inert: closed panel content excluded from tab order', () => {

  test('ACC-26: link inside closed panel cannot be focused (inert parent)', async ({ page }) => {
    await setup(page);
    // Panel 1 of acc-basic is closed; its wrapper has inert
    const wrapper = wrappers(page, 'acc-basic').first();
    await expect(wrapper).toHaveAttribute('inert');
    // Verify the link cannot receive focus — inert makes focus() a no-op in the browser
    const gotFocus = await page.evaluate(() => {
      const link = document.getElementById('acc-link-in-panel') as HTMLElement;
      link.focus();
      return document.activeElement === link;
    });
    expect(gotFocus).toBe(false);
  });

  test('ACC-27: link inside open panel is interactive', async ({ page }) => {
    await setup(page);
    await btns(page, 'acc-basic').first().click();
    // After opening, inert is removed
    const wrapper = wrappers(page, 'acc-basic').first();
    await expect(wrapper).not.toHaveAttribute('inert');
    const link = page.locator('#acc-link-in-panel');
    await expect(link).toBeVisible();
  });

});

// ---------------------------------------------------------------------------
// nested accordion: heading level auto-increment
// ---------------------------------------------------------------------------
test.describe('nested accordion: heading levels', () => {

  test('ACC-28: nested accordion items auto-increment heading level (outer h3 → inner h4)', async ({ page }) => {
    await setup(page);
    // Open outer item 1 to make inner accordion interactive
    await btns(page, 'acc-outer').first().click();
    await page.waitForTimeout(300);
    // Inner accordion heading wrappers should be h4 (outer default is h3, inner = h3+1 = h4)
    const innerWrapper = page.locator('aegov-accordion[id="acc-inner"] .accordion-item__heading-wrapper').first();
    const tag = await innerWrapper.evaluate(el => el.tagName.toLowerCase());
    expect(tag).toBe('h4');
  });

  test('ACC-29: outer ArrowDown navigates outer triggers only (not into inner accordion)', async ({ page }) => {
    await setup(page);
    // Open outer item 1 so inner accordion becomes visible and interactive
    const outerBtns = page.locator('aegov-accordion[id="acc-outer"] h3.accordion-item__heading-wrapper > button.accordion-item__header');
    const [outerT1, outerT2] = await outerBtns.all();
    await outerT1.click();
    await page.waitForTimeout(300);
    await outerT1.focus();
    await page.keyboard.press('ArrowDown');
    // Outer ArrowDown should land on outer trigger 2, not inner trigger 1
    await expect(outerT2).toBeFocused();
  });

});
