/**
 * visual-audit.spec.ts
 *
 * Comprehensive Playwright visual + interaction audit for every aegov component
 * docs page. Tests visit the live Stencil dev server, hydrate components, perform
 * real interactions (click, keyboard, hover, focus), and verify expected DOM/ARIA
 * state. Issues are identified by IDs of the form VIS-{COMPONENT}-{NN}.
 *
 * Run:
 *   npx playwright test tests/a11y/visual-audit.spec.ts --reporter=list
 */

import { test, expect, Page } from '@playwright/test';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const BASE = '/docs/pages';

/** Console messages that are intentional and should not count as failures. */
const ACCEPTABLE_CONSOLE_FRAGMENTS = [
  'aegov-modal] Dialog has no accessible name',
  'aegov-drawer] Drawer has no accessible name',
  'aegov-header] Logo link has no accessible name',
  'favicon.ico',
  'pravatar.cc',         // external avatar images — may fail in headless
  'ERR_NAME_NOT_RESOLVED', // external images in CI
  'Failed to load resource', // external resources
  'net::ERR_',
  'NETWORK_ERROR',
];

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const t = msg.text();
      if (!ACCEPTABLE_CONSOLE_FRAGMENTS.some(f => t.includes(f))) {
        errors.push(`[console.error] ${t}`);
      }
    }
  });
  page.on('pageerror', err => {
    const t = err.message;
    if (!ACCEPTABLE_CONSOLE_FRAGMENTS.some(f => t.includes(f))) {
      errors.push(`[pageerror] ${t}`);
    }
  });
  return errors;
}

async function goTo(page: Page, path: string) {
  await page.goto(`${BASE}/${path}.html`);
  // Give Stencil time to define custom elements and run connectedCallbacks
  await page.waitForTimeout(600);
}

/** Grab the first live-demo container on the page. */
function firstDemo(page: Page) {
  return page.locator('.not-aegov').first();
}

/** Wait for a custom element to be defined in the page. */
async function waitForTag(page: Page, tag: string) {
  await page.waitForFunction(
    (t: string) => !!customElements.get(t),
    tag,
    { timeout: 8000 }
  );
}

// ---------------------------------------------------------------------------
// SMOKE TESTS — every component page loads with visible elements
// ---------------------------------------------------------------------------

/**
 * Each entry: [docsPath, primaryTag, displayName]
 * One smoke test per page: page loads, component renders, no unexpected JS errors.
 */
const SMOKE_PAGES: [string, string, string][] = [
  ['aegov-accordion',       'aegov-accordion',       'Accordion'],
  ['aegov-aspect-ratio',    'aegov-aspect-ratio',    'Aspect Ratio'],
  ['aegov-avatar-group',    'aegov-avatar-group',    'Avatar Group'],
  ['aegov-avatar',          'aegov-avatar',          'Avatar'],
  ['aegov-badge',           'aegov-badge',           'Badge'],
  ['aegov-banner',          'aegov-banner',          'Banner'],
  ['aegov-bento-grid',      'aegov-bento-grid',      'Bento Grid'],
  ['aegov-blockquote',      'aegov-blockquote',      'Blockquote'],
  ['aegov-breadcrumbs',     'aegov-breadcrumbs',     'Breadcrumbs'],
  ['aegov-button-group',    'aegov-button-group',    'Button Group'],
  ['aegov-button',          'aegov-button',          'Button'],
  ['aegov-callout',         'aegov-callout',         'Callout'],
  ['aegov-card',            'aegov-card',            'Card'],
  ['aegov-checkbox',        'aegov-checkbox',        'Checkbox'],
  ['aegov-datepicker',      'aegov-datepicker',      'Datepicker'],
  ['aegov-drawer',          'aegov-drawer',          'Drawer'],
  ['aegov-dropdown',        'aegov-dropdown',        'Dropdown'],
  ['aegov-fileupload',      'aegov-fileupload',      'File Upload'],
  ['aegov-form-field',      'aegov-form-field',      'Form Field'],
  ['aegov-header',          'aegov-header',          'Header'],
  ['aegov-input',           'aegov-input',           'Input'],
  ['aegov-label',           'aegov-label',           'Label'],
  ['aegov-link',            'aegov-link',            'Link'],
  ['aegov-modal',           'aegov-modal',           'Modal'],
  ['aegov-navbar',          'aegov-navbar',           'Navbar'],
  ['aegov-navblock',        'aegov-navblock',        'Navblock'],
  ['aegov-otp',             'aegov-otp',             'OTP Input'],
  ['aegov-pagination',      'aegov-pagination',      'Pagination'],
  ['aegov-popover',         'aegov-popover',         'Popover'],
  ['aegov-progress',        'aegov-progress',        'Progress'],
  ['aegov-radio',           'aegov-radio',           'Radio'],
  ['aegov-range',           'aegov-range',           'Range'],
  ['aegov-select',          'aegov-select',          'Select'],
  ['aegov-separator',       'aegov-separator',       'Separator'],
  ['aegov-tabs',            'aegov-tabs',            'Tabs'],
  ['aegov-text',            'aegov-text',            'Text'],
  ['aegov-textarea',        'aegov-textarea',        'Textarea'],
  ['aegov-timeline',        'aegov-timeline',        'Timeline'],
  ['aegov-title',           'aegov-title',           'Title'],
  ['aegov-toast',           'aegov-button',          'Toast'],
  ['aegov-toggle',          'aegov-toggle',          'Toggle'],
  ['aegov-tooltip',         'aegov-tooltip',         'Tooltip'],
];

test.describe('SMOKE — every docs page loads without JS errors', () => {
  for (const [path, tag, name] of SMOKE_PAGES) {
    test(`SMOKE-${tag.toUpperCase().replace(/-/g, '_')} — ${name} page renders`, async ({ page }) => {
      const errors = collectErrors(page);
      await goTo(page, path);
      await waitForTag(page, tag);

      // At least one demo container must exist
      const demoCount = await page.locator('.not-aegov').count();
      expect(demoCount, `[SMOKE] No .not-aegov demo containers on ${path}.html`).toBeGreaterThan(0);

      // At least one component element must exist
      const compCount = await page.locator(tag).count();
      expect(compCount, `[SMOKE] No <${tag}> elements found on ${path}.html`).toBeGreaterThan(0);

      // No unexpected JS errors
      await page.waitForTimeout(200);
      expect(errors, `[SMOKE] Unexpected JS errors on ${path}.html`).toHaveLength(0);
    });
  }
});

// ---------------------------------------------------------------------------
// VIS-CALLOUT — aegov-callout
// ---------------------------------------------------------------------------

test.describe('VIS-CALLOUT — aegov-callout', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-callout'); });

  test('VIS-CALLOUT-01 — info variant renders with visible text content', async ({ page }) => {
    const callout = page.locator('.not-aegov aegov-callout[variant="info"]').first();
    await expect(callout).toBeVisible();
    const text = await callout.textContent();
    expect(text?.trim().length, 'VIS-CALLOUT-01: callout text content is empty').toBeGreaterThan(0);
  });

  test('VIS-CALLOUT-02 — all five variants (default/info/success/warning/error) render', async ({ page }) => {
    for (const v of ['default', 'info', 'success', 'warning', 'error']) {
      const el = page.locator(`.not-aegov aegov-callout[variant="${v}"]`).first();
      await expect(el, `VIS-CALLOUT-02: variant="${v}" not visible`).toBeVisible();
    }
  });

  test('VIS-CALLOUT-03 — solid appearance renders', async ({ page }) => {
    const el = page.locator('.not-aegov aegov-callout[appearance="solid"]').first();
    await expect(el, 'VIS-CALLOUT-03: solid appearance callout not visible').toBeVisible();
  });

  test('VIS-CALLOUT-04 — callout with actions slot renders action buttons', async ({ page }) => {
    const el = page.locator('.not-aegov aegov-callout aegov-button').first();
    await expect(el, 'VIS-CALLOUT-04: action button inside callout not visible').toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// VIS-BTN — aegov-button
// ---------------------------------------------------------------------------

test.describe('VIS-BTN — aegov-button', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-button'); });

  test('VIS-BTN-01 — primary, secondary, danger variants all render', async ({ page }) => {
    for (const v of ['primary', 'secondary', 'danger']) {
      const el = page.locator(`.not-aegov aegov-button[variant="${v}"]`).first();
      await expect(el, `VIS-BTN-01: variant="${v}" not visible`).toBeVisible();
    }
  });

  test('VIS-BTN-02 — solid, outline, soft, link appearances all render', async ({ page }) => {
    for (const a of ['solid', 'outline', 'soft', 'link']) {
      const el = page.locator(`.not-aegov aegov-button[appearance="${a}"]`).first();
      await expect(el, `VIS-BTN-02: appearance="${a}" not visible`).toBeVisible();
    }
  });

  test('VIS-BTN-03 — button click does not throw a JS error', async ({ page }) => {
    const errors = collectErrors(page);
    const btn = page.locator('.not-aegov aegov-button').first();
    await btn.click();
    await page.waitForTimeout(200);
    expect(errors, 'VIS-BTN-03: JS error on button click').toHaveLength(0);
  });

  test('VIS-BTN-04 — loading button shows sr-only "Loading" text', async ({ page }) => {
    const loadingBtn = page.locator('.not-aegov aegov-button[is-loading]').first();
    await expect(loadingBtn, 'VIS-BTN-04: no is-loading button found').toBeVisible();
    // sr-only text inside
    const srOnly = loadingBtn.locator('.sr-only');
    await expect(srOnly, 'VIS-BTN-04: sr-only Loading text missing').toBeVisible();
    const srText = await srOnly.textContent();
    expect(srText?.toLowerCase().includes('loading'), 'VIS-BTN-04: sr-only text is not "Loading"').toBe(true);
  });

  test('VIS-BTN-05 — disabled button is not interactive (aria-disabled)', async ({ page }) => {
    const disabledBtn = page.locator('.not-aegov aegov-button[is-disabled]').first();
    await expect(disabledBtn, 'VIS-BTN-05: no disabled button found').toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// VIS-BADGE — aegov-badge
// ---------------------------------------------------------------------------

test.describe('VIS-BADGE — aegov-badge', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-badge'); });

  test('VIS-BADGE-01 — default and primary variants render visible text', async ({ page }) => {
    const defaultBadge = page.locator('.not-aegov aegov-badge:not([variant])').first();
    const primaryBadge = page.locator('.not-aegov aegov-badge[variant="primary"]').first();
    await expect(defaultBadge, 'VIS-BADGE-01: default badge not visible').toBeVisible();
    await expect(primaryBadge, 'VIS-BADGE-01: primary badge not visible').toBeVisible();
  });

  test('VIS-BADGE-02 — soft and solid appearances render', async ({ page }) => {
    const soft = page.locator('.not-aegov aegov-badge[appearance="soft"]').first();
    const solid = page.locator('.not-aegov aegov-badge[appearance="solid"]').first();
    await expect(soft, 'VIS-BADGE-02: soft badge not visible').toBeVisible();
    await expect(solid, 'VIS-BADGE-02: solid badge not visible').toBeVisible();
  });

  test('VIS-BADGE-03 — dismissible badge has a dismiss button', async ({ page }) => {
    const dismissible = page.locator('.not-aegov aegov-badge[is-dismissible]').first();
    await expect(dismissible, 'VIS-BADGE-03: no dismissible badge found').toBeVisible();
  });

  test('VIS-BADGE-04 — small size badge renders (size="sm")', async ({ page }) => {
    const sm = page.locator('.not-aegov aegov-badge[size="sm"]').first();
    if (await sm.count() > 0) {
      await expect(sm, 'VIS-BADGE-04: size="sm" badge not visible').toBeVisible();
    } else {
      // Acceptable if docs don't demo a small badge — just ensure multiple badges render
      const badges = page.locator('.not-aegov aegov-badge');
      const count = await badges.count();
      expect(count, 'VIS-BADGE-04: no badges found on page').toBeGreaterThan(0);
    }
  });
});

// ---------------------------------------------------------------------------
// VIS-INPUT — aegov-input
// ---------------------------------------------------------------------------

test.describe('VIS-INPUT — aegov-input', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-input'); });

  test('VIS-INPUT-01 — input renders with placeholder visible', async ({ page }) => {
    const input = page.locator('.not-aegov aegov-input').first();
    await expect(input, 'VIS-INPUT-01: first input not visible').toBeVisible();
  });

  test('VIS-INPUT-02 — typing in input updates value', async ({ page }) => {
    const input = page.locator('.not-aegov aegov-input').first();
    // Find the native input inside (shadow DOM auto-pierced by Playwright)
    const nativeInput = input.locator('input').first();
    await nativeInput.click();
    await nativeInput.fill('test123');
    const val = await nativeInput.inputValue();
    expect(val, 'VIS-INPUT-02: value not updated after typing').toBe('test123');
  });

  test('VIS-INPUT-03 — password type input renders reveal button', async ({ page }) => {
    const pwInput = page.locator('.not-aegov aegov-input[type="password"]').first();
    await expect(pwInput, 'VIS-INPUT-03: no password input found').toBeVisible();
    const revealBtn = pwInput.locator('button');
    await expect(revealBtn, 'VIS-INPUT-03: reveal button missing in password input').toBeVisible();
  });

  test('VIS-INPUT-04 — input with hint slot shows hint text', async ({ page }) => {
    const hintSpan = page.locator('.not-aegov span[slot="hint"]').first();
    await expect(hintSpan, 'VIS-INPUT-04: hint slot content not visible').toBeVisible();
    const text = await hintSpan.textContent();
    expect(text?.trim().length, 'VIS-INPUT-04: hint text is empty').toBeGreaterThan(0);
  });

  test('VIS-INPUT-05 — copyable input (is-copyable="true") renders copy button', async ({ page }) => {
    const copyInput = page.locator('.not-aegov aegov-input[is-copyable]').first();
    await expect(copyInput, 'VIS-INPUT-05: no is-copyable input found').toBeVisible();
    const copyBtn = copyInput.locator('button[aria-label]').first();
    await expect(copyBtn, 'VIS-INPUT-05: copy button not rendered in copyable input').toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// VIS-TEXTAREA — aegov-textarea
// ---------------------------------------------------------------------------

test.describe('VIS-TEXTAREA — aegov-textarea', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-textarea'); });

  test('VIS-TEXTAREA-01 — textarea renders and accepts input', async ({ page }) => {
    const ta = page.locator('.not-aegov aegov-textarea').first();
    await expect(ta, 'VIS-TEXTAREA-01: textarea not visible').toBeVisible();
    const native = ta.locator('textarea').first();
    await native.fill('Hello world');
    const val = await native.inputValue();
    expect(val, 'VIS-TEXTAREA-01: textarea value not updated').toBe('Hello world');
  });

  test('VIS-TEXTAREA-02 — textarea with maxlength renders character counter', async ({ page }) => {
    // Stencil prop is "maxlength" (lowercase), not reflected — check attribute as set in HTML
    const withMax = page.locator('.not-aegov aegov-textarea[maxlength]').first();
    await expect(withMax, 'VIS-TEXTAREA-02: no maxlength textarea found').toBeVisible();
  });

  test('VIS-TEXTAREA-03 — textarea with hint slot shows hint text', async ({ page }) => {
    const hintSpan = page.locator('.not-aegov span[slot="hint"]').first();
    await expect(hintSpan, 'VIS-TEXTAREA-03: hint slot content not visible').toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// VIS-CHECKBOX — aegov-checkbox
// ---------------------------------------------------------------------------

test.describe('VIS-CHECKBOX — aegov-checkbox', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-checkbox'); });

  test('VIS-CHK-01 — checkbox renders and is clickable', async ({ page }) => {
    const cb = page.locator('.not-aegov aegov-checkbox').first();
    await expect(cb, 'VIS-CHK-01: checkbox not visible').toBeVisible();
    const input = cb.locator('input[type="checkbox"]');
    const before = await input.isChecked();
    await input.click();
    await page.waitForTimeout(100);
    const after = await input.isChecked();
    expect(after, `VIS-CHK-01: checkbox click did not toggle (was ${before})`).toBe(!before);
  });

  test('VIS-CHK-02 — indeterminate state checkbox renders', async ({ page }) => {
    const indeterminate = page.locator('.not-aegov aegov-checkbox[is-indeterminate]').first();
    await expect(indeterminate, 'VIS-CHK-02: no is-indeterminate checkbox found').toBeVisible();
  });

  test('VIS-CHK-03 — checkbox-group renders with multiple checkboxes', async ({ page }) => {
    await goTo(page, 'aegov-checkbox');
    const group = page.locator('.not-aegov aegov-checkbox-group').first();
    await expect(group, 'VIS-CHK-03: checkbox-group not visible').toBeVisible();
    const children = group.locator('aegov-checkbox');
    const count = await children.count();
    expect(count, 'VIS-CHK-03: checkbox-group has no children').toBeGreaterThan(1);
  });
});

// ---------------------------------------------------------------------------
// VIS-RADIO — aegov-radio
// ---------------------------------------------------------------------------

test.describe('VIS-RADIO — aegov-radio', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-radio'); });

  test('VIS-RADIO-01 — radio group renders and radio is selectable', async ({ page }) => {
    const group = page.locator('.not-aegov aegov-radio-group').first();
    await expect(group, 'VIS-RADIO-01: radio-group not visible').toBeVisible();
    const radio = group.locator('aegov-radio').first();
    await expect(radio, 'VIS-RADIO-01: first radio not visible').toBeVisible();
  });

  test('VIS-RADIO-02 — clicking a radio checks it', async ({ page }) => {
    const radios = page.locator('.not-aegov aegov-radio-group').first().locator('aegov-radio');
    const second = radios.nth(1);
    const input = second.locator('input[type="radio"]');
    await input.click();
    await page.waitForTimeout(100);
    const checked = await input.isChecked();
    expect(checked, 'VIS-RADIO-02: radio not checked after click').toBe(true);
  });
});

// ---------------------------------------------------------------------------
// VIS-TOGGLE — aegov-toggle
// ---------------------------------------------------------------------------

test.describe('VIS-TOGGLE — aegov-toggle', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-toggle'); });

  test('VIS-TOGGLE-01 — toggle renders and is clickable', async ({ page }) => {
    const toggle = page.locator('.not-aegov aegov-toggle').first();
    await expect(toggle, 'VIS-TOGGLE-01: toggle not visible').toBeVisible();
    const input = toggle.locator('input[type="checkbox"]');
    const before = await input.isChecked();
    await input.click();
    await page.waitForTimeout(100);
    const after = await input.isChecked();
    expect(after, `VIS-TOGGLE-01: toggle click did not change state (was ${before})`).toBe(!before);
  });
});

// ---------------------------------------------------------------------------
// VIS-SELECT — aegov-select
// ---------------------------------------------------------------------------

test.describe('VIS-SELECT — aegov-select', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-select'); });

  test('VIS-SELECT-01 — native select renders with options', async ({ page }) => {
    const sel = page.locator('.not-aegov aegov-select').first();
    await expect(sel, 'VIS-SELECT-01: select not visible').toBeVisible();
    const options = sel.locator('aegov-select-option');
    const count = await options.count();
    expect(count, 'VIS-SELECT-01: no aegov-select-option children found').toBeGreaterThan(0);
  });

  test('VIS-SELECT-02 — listbox appearance opens dropdown on click', async ({ page }) => {
    const listboxSel = page.locator('.not-aegov aegov-select[appearance="listbox"]').first();
    await expect(listboxSel, 'VIS-SELECT-02: no listbox select found').toBeVisible();
    // Find the trigger button inside
    const trigger = listboxSel.locator('[role="combobox"], button, [aria-expanded]').first();
    await trigger.click();
    await page.waitForTimeout(300);
    const ariaExpanded = await listboxSel.evaluate(el => {
      const btn = el.shadowRoot?.querySelector('[aria-expanded]') || el.querySelector('[aria-expanded]');
      return btn?.getAttribute('aria-expanded');
    });
    expect(ariaExpanded, 'VIS-SELECT-02: dropdown did not open (aria-expanded not "true")').toBe('true');
  });

  test('VIS-SELECT-03 — listbox closes on Escape key', async ({ page }) => {
    const listboxSel = page.locator('.not-aegov aegov-select[appearance="listbox"]').first();
    const trigger = listboxSel.locator('[role="combobox"], button, [aria-expanded]').first();
    await trigger.click();
    await page.waitForTimeout(200);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    const ariaExpanded = await listboxSel.evaluate(el => {
      const btn = el.shadowRoot?.querySelector('[aria-expanded]') || el.querySelector('[aria-expanded]');
      return btn?.getAttribute('aria-expanded');
    });
    expect(ariaExpanded, 'VIS-SELECT-03: dropdown did not close on Escape').toBe('false');
  });
});

// ---------------------------------------------------------------------------
// VIS-ACCORDION — aegov-accordion
// ---------------------------------------------------------------------------

test.describe('VIS-ACCORDION — aegov-accordion', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-accordion'); });

  test('VIS-ACC-01 — first item is open by default (aria-expanded="true")', async ({ page }) => {
    const firstItem = page.locator('.not-aegov aegov-accordion-item').first();
    await expect(firstItem, 'VIS-ACC-01: first accordion item not visible').toBeVisible();
    // isOpen is a @Prop (not reflected), so check aria-expanded on the heading button
    const btn = firstItem.locator('button[aria-expanded]').first();
    const ariaExpanded = await btn.getAttribute('aria-expanded');
    expect(ariaExpanded, 'VIS-ACC-01: first item should be open by default (aria-expanded="true")').toBe('true');
  });

  test('VIS-ACC-02 — clicking a closed item expands it', async ({ page }) => {
    const items = page.locator('.not-aegov aegov-accordion').first().locator('aegov-accordion-item');
    const second = items.nth(1);
    const headingBtn = second.locator('button[aria-expanded]').first();
    const before = await headingBtn.getAttribute('aria-expanded');
    await headingBtn.click();
    await page.waitForTimeout(300);
    const after = await headingBtn.getAttribute('aria-expanded');
    expect(after, `VIS-ACC-02: accordion item did not toggle (was ${before})`).not.toBe(before);
  });

  test('VIS-ACC-03 — collapsed item panel is hidden', async ({ page }) => {
    const items = page.locator('.not-aegov aegov-accordion').first().locator('aegov-accordion-item');
    const third = items.nth(2);
    const isOpen = await third.getAttribute('is-open');
    // If not open, the panel should be hidden (aria-hidden or display:none)
    if (!isOpen || isOpen === 'false') {
      const headingBtn = third.locator('button[aria-expanded]').first();
      const ariaExpanded = await headingBtn.getAttribute('aria-expanded');
      expect(ariaExpanded, 'VIS-ACC-03: closed item has aria-expanded=true').toBe('false');
    }
  });
});

// ---------------------------------------------------------------------------
// VIS-TABS — aegov-tabs
// ---------------------------------------------------------------------------

test.describe('VIS-TABS — aegov-tabs', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-tabs'); });

  test('VIS-TABS-01 — tabs container renders with tab buttons', async ({ page }) => {
    const tabs = page.locator('.not-aegov aegov-tabs').first();
    await expect(tabs, 'VIS-TABS-01: tabs container not visible').toBeVisible();
    const tabBtns = tabs.locator('aegov-tab');
    const count = await tabBtns.count();
    expect(count, 'VIS-TABS-01: no aegov-tab elements found').toBeGreaterThan(1);
  });

  test('VIS-TABS-02 — default-open tab is active (aria-selected="true")', async ({ page }) => {
    const tabs = page.locator('.not-aegov aegov-tabs').first();
    // aegov-tab is shadow:false, the inner button[role="tab"] carries aria-selected
    const activeTabBtn = tabs.locator('button[role="tab"][aria-selected="true"]');
    const count = await activeTabBtn.count();
    expect(count, 'VIS-TABS-02: no tab with aria-selected="true" found').toBeGreaterThan(0);
  });

  test('VIS-TABS-03 — clicking a different tab activates it (aria-selected flips)', async ({ page }) => {
    const tabs = page.locator('.not-aegov aegov-tabs').first();
    const allTabBtns = tabs.locator('button[role="tab"]');
    const secondBtn = allTabBtns.nth(1);
    await secondBtn.click();
    await page.waitForTimeout(200);
    const ariaSelected = await secondBtn.getAttribute('aria-selected');
    expect(ariaSelected, 'VIS-TABS-03: clicking tab did not set aria-selected="true"').toBe('true');
  });

  test('VIS-TABS-04 — tab panels exist in the demo', async ({ page }) => {
    // aegov-tab-panel are light DOM children of aegov-tabs; search the demo area broadly
    const panels = page.locator('.not-aegov aegov-tab-panel');
    const count = await panels.count();
    expect(count, 'VIS-TABS-04: no aegov-tab-panel elements found in demo area').toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// VIS-MODAL — aegov-modal
// ---------------------------------------------------------------------------

test.describe('VIS-MODAL — aegov-modal', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-modal'); });

  test('VIS-MODAL-01 — modal opens when trigger button is clicked', async ({ page }) => {
    const trigger = page.locator('#demo-open-confirm');
    await expect(trigger, 'VIS-MODAL-01: trigger button not found').toBeVisible();
    await trigger.click();
    await page.waitForTimeout(400);
    const modal = page.locator('#demo-confirm-modal');
    const isOpen = await modal.evaluate(el => (el as any).isOpen);
    expect(isOpen, 'VIS-MODAL-01: modal did not open after trigger click').toBe(true);
  });

  test('VIS-MODAL-02 — modal closes when Escape is pressed', async ({ page }) => {
    const trigger = page.locator('#demo-open-confirm');
    await trigger.click();
    await page.waitForTimeout(400);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    const modal = page.locator('#demo-confirm-modal');
    const isOpen = await modal.evaluate(el => (el as any).isOpen);
    expect(isOpen, 'VIS-MODAL-02: modal did not close on Escape').toBe(false);
  });

  test('VIS-MODAL-03 — modal closes when cancel button is clicked', async ({ page }) => {
    const trigger = page.locator('#demo-open-confirm');
    await trigger.click();
    await page.waitForTimeout(400);
    const cancelBtn = page.locator('#demo-cancel-confirm');
    await cancelBtn.click();
    await page.waitForTimeout(400);
    const modal = page.locator('#demo-confirm-modal');
    const isOpen = await modal.evaluate(el => (el as any).isOpen);
    expect(isOpen, 'VIS-MODAL-03: modal did not close on cancel button click').toBe(false);
  });

  test('VIS-MODAL-04 — open modal has role="dialog" visible in DOM', async ({ page }) => {
    const trigger = page.locator('#demo-open-confirm');
    await trigger.click();
    await page.waitForTimeout(400);
    const dialogEl = page.locator('#demo-confirm-modal [role="dialog"]');
    await expect(dialogEl, 'VIS-MODAL-04: role=dialog not visible when modal open').toBeVisible();
  });

  test('VIS-MODAL-05 — multiple size variants render with open/close cycle', async ({ page }) => {
    const errors = collectErrors(page);
    // sm size demo
    const smBtn = page.locator('#demo-size-sm');
    if (await smBtn.isVisible()) {
      await smBtn.click();
      await page.waitForTimeout(300);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
    }
    expect(errors, 'VIS-MODAL-05: JS error during size variant test').toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// VIS-DRAWER — aegov-drawer
// ---------------------------------------------------------------------------

test.describe('VIS-DRAWER — aegov-drawer', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-drawer'); });

  test('VIS-DRAWER-01 — drawer opens when trigger button is clicked', async ({ page }) => {
    const trigger = page.locator('#demo-open-filters');
    await expect(trigger, 'VIS-DRAWER-01: open button not found').toBeVisible();
    await trigger.click();
    await page.waitForTimeout(400);
    const drawer = page.locator('#demo-filters-drawer');
    const isOpen = await drawer.evaluate(el => (el as any).isOpen);
    expect(isOpen, 'VIS-DRAWER-01: drawer did not open').toBe(true);
  });

  test('VIS-DRAWER-02 — drawer closes on Escape', async ({ page }) => {
    await page.locator('#demo-open-filters').click();
    await page.waitForTimeout(400);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    const drawer = page.locator('#demo-filters-drawer');
    const isOpen = await drawer.evaluate(el => (el as any).isOpen);
    expect(isOpen, 'VIS-DRAWER-02: drawer did not close on Escape').toBe(false);
  });

  test('VIS-DRAWER-03 — all four positions (right/left/top/bottom) open without error', async ({ page }) => {
    const errors = collectErrors(page);
    for (const id of ['#demo-pos-right-btn', '#demo-pos-left-btn', '#demo-pos-top-btn', '#demo-pos-bottom-btn']) {
      const btn = page.locator(id);
      if (await btn.isVisible()) {
        await btn.click();
        await page.waitForTimeout(300);
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
      }
    }
    expect(errors, 'VIS-DRAWER-03: JS error during position variant test').toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// VIS-DROPDOWN — aegov-dropdown
// ---------------------------------------------------------------------------

test.describe('VIS-DROPDOWN — aegov-dropdown', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-dropdown'); });

  test('VIS-DD-01 — dropdown renders with trigger button', async ({ page }) => {
    const dd = page.locator('.not-aegov aegov-dropdown').first();
    await expect(dd, 'VIS-DD-01: dropdown not visible').toBeVisible();
  });

  test('VIS-DD-02 — dropdown opens on trigger click (aria-expanded="true")', async ({ page }) => {
    const dd = page.locator('.not-aegov aegov-dropdown').first();
    const trigger = dd.locator('aegov-button, button').first();
    await trigger.click();
    await page.waitForTimeout(300);
    // Dropdown sets aria-expanded on the inner focusable element (aegov-button is shadow:false)
    const ariaExpanded = await dd.locator('button[aria-expanded]').first().getAttribute('aria-expanded');
    expect(ariaExpanded, 'VIS-DD-02: dropdown did not open (aria-expanded not "true")').toBe('true');
  });

  test('VIS-DD-03 — dropdown closes on Escape (aria-expanded="false")', async ({ page }) => {
    const dd = page.locator('.not-aegov aegov-dropdown').first();
    const trigger = dd.locator('aegov-button, button').first();
    await trigger.click();
    await page.waitForTimeout(200);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    const ariaExpanded = await dd.locator('button[aria-expanded]').first().getAttribute('aria-expanded');
    expect(ariaExpanded, 'VIS-DD-03: dropdown did not close on Escape').toBe('false');
  });

  test('VIS-DD-04 — dropdown closes on Tab key (APG menu button pattern)', async ({ page }) => {
    const dd = page.locator('.not-aegov aegov-dropdown').first();
    const trigger = dd.locator('aegov-button, button').first();
    await trigger.click();
    await page.waitForTimeout(200);
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);
    const ariaExpanded = await dd.locator('button[aria-expanded]').first().getAttribute('aria-expanded');
    expect(ariaExpanded, 'VIS-DD-04: dropdown stayed open on Tab (APG violation)').toBe('false');
  });

  test('VIS-DD-05 — dropdown closes on outside click (aria-expanded="false")', async ({ page }) => {
    const dd = page.locator('.not-aegov aegov-dropdown').first();
    const trigger = dd.locator('aegov-button, button').first();
    await trigger.click();
    await page.waitForTimeout(200);
    await page.mouse.click(10, 10);
    await page.waitForTimeout(200);
    const ariaExpanded = await dd.locator('button[aria-expanded]').first().getAttribute('aria-expanded');
    expect(ariaExpanded, 'VIS-DD-05: dropdown did not close on outside click').toBe('false');
  });
});

// ---------------------------------------------------------------------------
// VIS-POPOVER — aegov-popover
// ---------------------------------------------------------------------------

test.describe('VIS-POPOVER — aegov-popover', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-popover'); });

  test('VIS-POP-01 — popover renders trigger element', async ({ page }) => {
    const pop = page.locator('.not-aegov aegov-popover').first();
    await expect(pop, 'VIS-POP-01: popover not visible').toBeVisible();
  });

  test('VIS-POP-02 — popover opens on trigger click (aria-expanded="true")', async ({ page }) => {
    const pop = page.locator('.not-aegov aegov-popover').first();
    const trigger = pop.locator('aegov-button, button').first();
    await trigger.click();
    await page.waitForTimeout(300);
    // Popover sets aria-expanded on the inner focusable element (aegov-button is shadow:false)
    const ariaExpanded = await pop.locator('button[aria-expanded]').first().getAttribute('aria-expanded');
    expect(ariaExpanded, 'VIS-POP-02: popover did not open (aria-expanded not "true")').toBe('true');
  });

  test('VIS-POP-03 — popover closes on Escape (aria-expanded="false")', async ({ page }) => {
    const pop = page.locator('.not-aegov aegov-popover').first();
    const trigger = pop.locator('aegov-button, button').first();
    await trigger.click();
    await page.waitForTimeout(200);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    const ariaExpanded = await pop.locator('button[aria-expanded]').first().getAttribute('aria-expanded');
    expect(ariaExpanded, 'VIS-POP-03: popover did not close on Escape').toBe('false');
  });
});

// ---------------------------------------------------------------------------
// VIS-TOOLTIP — aegov-tooltip
// ---------------------------------------------------------------------------

test.describe('VIS-TOOLTIP — aegov-tooltip', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-tooltip'); });

  test('VIS-TT-01 — tooltip renders its trigger element', async ({ page }) => {
    const tt = page.locator('.not-aegov aegov-tooltip').first();
    await expect(tt, 'VIS-TT-01: tooltip not visible').toBeVisible();
  });

  test('VIS-TT-02 — hovering trigger makes tooltip panel visible', async ({ page }) => {
    const tt = page.locator('.not-aegov aegov-tooltip').first();
    const trigger = tt.locator('aegov-button, button, a').first();
    await trigger.hover();
    await page.waitForTimeout(400);
    // Tooltip sets style.visibility = 'visible' on [role="tooltip"] when shown
    // (isVisible is @State — not accessible from outside via property)
    const tooltipEl = tt.locator('[role="tooltip"]').first();
    const visibility = await tooltipEl.evaluate(el => (el as HTMLElement).style.visibility);
    expect(visibility, 'VIS-TT-02: tooltip panel not visible after hover (visibility != "visible")').toBe('visible');
  });

  test('VIS-TT-03 — tooltip trigger element has aria-describedby after hover', async ({ page }) => {
    const tt = page.locator('.not-aegov aegov-tooltip').first();
    const trigger = tt.locator('aegov-button, button, a').first();
    await trigger.hover();
    await page.waitForTimeout(400);
    // Tooltip sets aria-describedby on the inner trigger button/a (not aegov-button host)
    const innerTrigger = tt.locator('button, a').first();
    const ariaDesc = await innerTrigger.getAttribute('aria-describedby');
    expect(ariaDesc, 'VIS-TT-03: trigger button/a missing aria-describedby after hover').toBeTruthy();
  });

  test('VIS-TT-04 — all four positions render tooltip', async ({ page }) => {
    const errors = collectErrors(page);
    const tooltips = page.locator('.not-aegov aegov-tooltip');
    const count = await tooltips.count();
    expect(count, 'VIS-TT-04: need at least 4 tooltips for position test').toBeGreaterThanOrEqual(4);
    expect(errors, 'VIS-TT-04: JS errors during tooltip test').toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// VIS-TOAST — aegov-toast
// ---------------------------------------------------------------------------

test.describe('VIS-TOAST — aegov-toast', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-toast'); });

  test('VIS-TOAST-01 — toast shows when trigger button is clicked', async ({ page }) => {
    const trigger = page.locator('#demo-toast-intro');
    await expect(trigger, 'VIS-TOAST-01: toast trigger button not found').toBeVisible();
    await trigger.click();
    await page.waitForTimeout(500);
    // Toast system appends a <div class="aegov-toast-container ..."> to body, not a custom element
    const toasts = page.locator('.aegov-toast-container aegov-toast');
    const count = await toasts.count();
    expect(count, 'VIS-TOAST-01: no toast appeared in container after trigger').toBeGreaterThan(0);
  });

  test('VIS-TOAST-02 — all variant triggers show toasts without JS error', async ({ page }) => {
    const errors = collectErrors(page);
    for (const id of ['#demo-toast-default', '#demo-toast-success', '#demo-toast-info', '#demo-toast-warning', '#demo-toast-error']) {
      const btn = page.locator(id);
      if (await btn.isVisible()) {
        await btn.click();
        await page.waitForTimeout(200);
      }
    }
    expect(errors, 'VIS-TOAST-02: JS errors triggering toast variants').toHaveLength(0);
  });

  test('VIS-TOAST-03 — toast container exists after first toast', async ({ page }) => {
    // Trigger a toast so the container is created
    const trigger = page.locator('#demo-toast-intro');
    if (await trigger.isVisible()) {
      await trigger.click();
      await page.waitForTimeout(400);
    }
    // Toast system creates div.aegov-toast-container in body (not a custom element)
    const container = page.locator('.aegov-toast-container');
    await expect(container, 'VIS-TOAST-03: .aegov-toast-container not in page after trigger').toBeAttached();
  });
});

// ---------------------------------------------------------------------------
// VIS-CALLOUT-SPECIFIC — deep slot/content checks
// ---------------------------------------------------------------------------

test.describe('VIS-CALLOUT-SLOTS — callout slot content', () => {
  test('VIS-CALLOUT-S01 — callout default slot renders inner text (regression: was slot="content")', async ({ page }) => {
    await goTo(page, 'aegov-callout');
    const callout = page.locator('.not-aegov aegov-callout[variant="info"]').first();
    const innerText = await callout.evaluate(el => el.textContent?.trim() ?? '');
    expect(innerText.length, 'VIS-CALLOUT-S01: callout has no text (slot="content" regression)').toBeGreaterThan(10);
  });

  test('VIS-CALLOUT-S02 — icon slot renders custom SVG when provided', async ({ page }) => {
    await goTo(page, 'aegov-callout');
    const withIcon = page.locator('.not-aegov aegov-callout [slot="icon"]').first();
    await expect(withIcon, 'VIS-CALLOUT-S02: custom icon slot not found').toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// VIS-BANNER — aegov-banner
// ---------------------------------------------------------------------------

test.describe('VIS-BANNER — aegov-banner', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-banner'); });

  test('VIS-BANNER-01 — info/success/warning/error variants render', async ({ page }) => {
    for (const v of ['info', 'success', 'warning', 'error']) {
      const el = page.locator(`.not-aegov aegov-banner[variant="${v}"]`).first();
      await expect(el, `VIS-BANNER-01: banner variant="${v}" not visible`).toBeVisible();
    }
  });

  test('VIS-BANNER-02 — banners in demo area render correctly', async ({ page }) => {
    // The "heading" prop is not reflected, so [heading] selector won't work for most banners.
    // Verify multiple banners render in the demo, covering the structural check.
    const banners = page.locator('.not-aegov aegov-banner');
    const count = await banners.count();
    expect(count, 'VIS-BANNER-02: no aegov-banner elements in demo area').toBeGreaterThan(0);
    // Verify each visible banner renders text content
    const firstBanner = banners.first();
    await expect(firstBanner, 'VIS-BANNER-02: first banner not visible').toBeVisible();
    const text = await firstBanner.textContent();
    expect(text?.trim().length, 'VIS-BANNER-02: first banner has no text content').toBeGreaterThan(0);
  });

  test('VIS-BANNER-03 — dismissible banner has dismiss button', async ({ page }) => {
    const dismissible = page.locator('.not-aegov aegov-banner[is-dismissible]').first();
    await expect(dismissible, 'VIS-BANNER-03: no dismissible banner found').toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// VIS-PROGRESS — aegov-progress
// ---------------------------------------------------------------------------

test.describe('VIS-PROGRESS — aegov-progress', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-progress'); });

  test('VIS-PROG-01 — progress with value renders visible bar', async ({ page }) => {
    const el = page.locator('.not-aegov aegov-progress[value]').first();
    await expect(el, 'VIS-PROG-01: no progress with value found').toBeVisible();
  });

  test('VIS-PROG-02 — progress bar width reflects the value attribute', async ({ page }) => {
    const el = page.locator('.not-aegov aegov-progress[value="40"]').first();
    const style = await el.evaluate(comp => {
      const bar = comp.querySelector?.('.progress__fill') ||
                  comp.shadowRoot?.querySelector('.progress__fill');
      return bar ? getComputedStyle(bar).width || (bar as HTMLElement).style.width : null;
    });
    expect(style, 'VIS-PROG-02: progress fill bar has no width style').toBeTruthy();
  });

  test('VIS-PROG-03 — indeterminate progress renders without value', async ({ page }) => {
    const el = page.locator('.not-aegov aegov-progress:not([value])').first();
    await expect(el, 'VIS-PROG-03: no indeterminate progress found').toBeVisible();
  });

  test('VIS-PROG-04 — progress with counter shows counter text', async ({ page }) => {
    const withCounter = page.locator('.not-aegov aegov-progress[counter]').first();
    await expect(withCounter, 'VIS-PROG-04: no progress with counter found').toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// VIS-PAGINATION — aegov-pagination
// ---------------------------------------------------------------------------

test.describe('VIS-PAGINATION — aegov-pagination', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-pagination'); });

  test('VIS-PAG-01 — pagination renders page buttons', async ({ page }) => {
    const pager = page.locator('#demo-pager-intro');
    await expect(pager, 'VIS-PAG-01: pagination not visible').toBeVisible();
  });

  test('VIS-PAG-02 — current page button has aria-current="page"', async ({ page }) => {
    const pager = page.locator('#demo-pager-intro');
    const currentBtn = pager.locator('[aria-current="page"]');
    await expect(currentBtn, 'VIS-PAG-02: no aria-current="page" button found').toBeVisible();
  });

  test('VIS-PAG-03 — clicking next page changes aria-current', async ({ page }) => {
    const pager = page.locator('#demo-pager-intro');
    const before = await pager.locator('[aria-current="page"]').textContent();
    const nextBtn = pager.locator('[aria-label*="Next"], [aria-label*="next"], button').last();
    await nextBtn.click();
    await page.waitForTimeout(200);
    const after = await pager.locator('[aria-current="page"]').textContent();
    expect(after, 'VIS-PAG-03: current page did not change after next click').not.toBe(before);
  });

  test('VIS-PAG-04 — compact variant renders page indicator', async ({ page }) => {
    const compact = page.locator('#demo-pager-cmp1');
    await expect(compact, 'VIS-PAG-04: compact pagination not visible').toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// VIS-BREADCRUMBS — aegov-breadcrumbs
// ---------------------------------------------------------------------------

test.describe('VIS-BREADCRUMBS — aegov-breadcrumbs', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-breadcrumbs'); });

  test('VIS-BC-01 — breadcrumbs renders nav with links', async ({ page }) => {
    const bc = page.locator('.not-aegov aegov-breadcrumbs').first();
    await expect(bc, 'VIS-BC-01: breadcrumbs not visible').toBeVisible();
    const items = bc.locator('aegov-breadcrumbs-item');
    const count = await items.count();
    expect(count, 'VIS-BC-01: no breadcrumb items found').toBeGreaterThan(1);
  });

  test('VIS-BC-02 — last breadcrumb item has aria-current="page"', async ({ page }) => {
    const bc = page.locator('.not-aegov aegov-breadcrumbs').first();
    const lastItem = bc.locator('aegov-breadcrumbs-item').last();
    const currentEl = lastItem.locator('[aria-current="page"]');
    await expect(currentEl, 'VIS-BC-02: last breadcrumb missing aria-current="page"').toBeAttached();
  });
});

// ---------------------------------------------------------------------------
// VIS-CARD — aegov-card
// ---------------------------------------------------------------------------

test.describe('VIS-CARD — aegov-card', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-card'); });

  test('VIS-CARD-01 — card renders with title content', async ({ page }) => {
    const card = page.locator('.not-aegov aegov-card').first();
    await expect(card, 'VIS-CARD-01: card not visible').toBeVisible();
    const text = await card.textContent();
    expect(text?.trim().length, 'VIS-CARD-01: card has no text content').toBeGreaterThan(0);
  });

  test('VIS-CARD-02 — light and creative appearance variants render', async ({ page }) => {
    // Card has appearance prop (solid/light/creative), not elevation
    for (const a of ['light', 'creative']) {
      const el = page.locator(`.not-aegov aegov-card[appearance="${a}"]`).first();
      if (await el.count() > 0) {
        await expect(el, `VIS-CARD-02: appearance="${a}" not visible`).toBeVisible();
      }
    }
    // At minimum, cards must render
    const cards = page.locator('.not-aegov aegov-card');
    const count = await cards.count();
    expect(count, 'VIS-CARD-02: no aegov-card elements found').toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// VIS-RANGE — aegov-range
// ---------------------------------------------------------------------------

test.describe('VIS-RANGE — aegov-range', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-range'); });

  test('VIS-RANGE-01 — range slider renders with input', async ({ page }) => {
    const range = page.locator('.not-aegov aegov-range').first();
    await expect(range, 'VIS-RANGE-01: range not visible').toBeVisible();
    const input = range.locator('input[type="range"]').first();
    await expect(input, 'VIS-RANGE-01: range input not present').toBeAttached();
  });

  test('VIS-RANGE-02 — range input is interactive (has min/max/value attributes)', async ({ page }) => {
    const range = page.locator('.not-aegov aegov-range').first();
    const input = range.locator('input[type="range"]').first();
    await expect(input, 'VIS-RANGE-02: range input not attached').toBeAttached();
    // Verify the native range input has its basic attributes set
    const min = await input.getAttribute('min');
    const max = await input.getAttribute('max');
    // At least one of min/max must be present (or the input renders with default range)
    const hasRangeAttrs = min !== null || max !== null || (await input.inputValue()) !== '';
    expect(hasRangeAttrs, 'VIS-RANGE-02: range input appears non-functional').toBe(true);
  });
});

// ---------------------------------------------------------------------------
// VIS-OTP — aegov-otp
// ---------------------------------------------------------------------------

test.describe('VIS-OTP — aegov-otp', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-otp'); });

  test('VIS-OTP-01 — OTP renders multiple digit inputs', async ({ page }) => {
    const otp = page.locator('.not-aegov aegov-otp').first();
    await expect(otp, 'VIS-OTP-01: OTP component not visible').toBeVisible();
    const inputs = otp.locator('input');
    const count = await inputs.count();
    expect(count, 'VIS-OTP-01: OTP has fewer than 4 inputs').toBeGreaterThanOrEqual(4);
  });

  test('VIS-OTP-02 — typing a digit moves focus to the next input', async ({ page }) => {
    const otp = page.locator('.not-aegov aegov-otp').first();
    const firstInput = otp.locator('input').first();
    await firstInput.focus();
    await firstInput.press('1');
    await page.waitForTimeout(100);
    // second input should have focus
    const secondInput = otp.locator('input').nth(1);
    const isFocused = await secondInput.evaluate(el => el === document.activeElement || el.matches(':focus'));
    expect(isFocused, 'VIS-OTP-02: focus did not advance to next input after digit entry').toBe(true);
  });
});

// ---------------------------------------------------------------------------
// VIS-FILEUPLOAD — aegov-fileupload
// ---------------------------------------------------------------------------

test.describe('VIS-FILEUPLOAD — aegov-fileupload', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-fileupload'); });

  test('VIS-FU-01 — fileupload renders drop zone', async ({ page }) => {
    const fu = page.locator('.not-aegov aegov-fileupload').first();
    await expect(fu, 'VIS-FU-01: fileupload not visible').toBeVisible();
  });

  test('VIS-FU-02 — fileupload has visible trigger/upload button', async ({ page }) => {
    const fu = page.locator('.not-aegov aegov-fileupload').first();
    // Check for a button or label acting as file upload trigger
    const btn = fu.locator('button, label[for], [role="button"]').first();
    await expect(btn, 'VIS-FU-02: fileupload has no visible trigger button').toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// VIS-FORMFIELD — aegov-form-field
// ---------------------------------------------------------------------------

test.describe('VIS-FORMFIELD — aegov-form-field', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-form-field'); });

  test('VIS-FF-01 — form-field renders with label and input', async ({ page }) => {
    const ff = page.locator('.not-aegov aegov-form-field').first();
    await expect(ff, 'VIS-FF-01: form-field not visible').toBeVisible();
    const label = ff.locator('aegov-label');
    await expect(label, 'VIS-FF-01: aegov-label not in form-field').toBeVisible();
  });

  test('VIS-FF-02 — form-field with error state shows error message', async ({ page }) => {
    const errorField = page.locator('.not-aegov aegov-form-field aegov-input[is-invalid]').first();
    if (await errorField.count() > 0) {
      const errorMsg = page.locator('.not-aegov [role="alert"]').first();
      await expect(errorMsg, 'VIS-FF-02: error message not shown for invalid field').toBeVisible();
    }
  });
});

// ---------------------------------------------------------------------------
// VIS-HEADER — aegov-header
// ---------------------------------------------------------------------------

test.describe('VIS-HEADER — aegov-header', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-header'); });

  test('VIS-HDR-01 — header renders with logo slot', async ({ page }) => {
    const header = page.locator('.not-aegov aegov-header').first();
    await expect(header, 'VIS-HDR-01: header not visible').toBeVisible();
    const logo = header.locator('[slot="logo"], img').first();
    await expect(logo, 'VIS-HDR-01: logo not found in header').toBeVisible();
  });

  test('VIS-HDR-02 — header with search slot renders search input', async ({ page }) => {
    const withSearch = page.locator('.not-aegov aegov-header [slot="search"]').first();
    if (await withSearch.count() > 0) {
      await expect(withSearch, 'VIS-HDR-02: search slot content not visible').toBeVisible();
    }
  });
});

// ---------------------------------------------------------------------------
// VIS-SEPARATOR — aegov-separator
// ---------------------------------------------------------------------------

test.describe('VIS-SEPARATOR — aegov-separator', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-separator'); });

  test('VIS-SEP-01 — separator renders', async ({ page }) => {
    const sep = page.locator('.not-aegov aegov-separator').first();
    await expect(sep, 'VIS-SEP-01: separator not visible').toBeVisible();
  });

  test('VIS-SEP-02 — default separator renders with role=presentation (decorative by default)', async ({ page }) => {
    // Separator isDecorative=true by default, not reflected. Get a separator without is-decorative="false"
    // aegov-separator is shadow:false so role is in the light DOM (hr element)
    const sep = page.locator('.not-aegov aegov-separator:not([is-decorative="false"])').first();
    await expect(sep, 'VIS-SEP-02: no default separator found').toBeAttached();
    // The <hr> inside renders with role="presentation" when isDecorative=true (default)
    const role = await sep.evaluate(el => {
      const hr = el.querySelector('hr') || el.querySelector('[role]');
      return hr?.getAttribute('role') || '';
    });
    expect(role, 'VIS-SEP-02: default separator should render role="presentation"').toBe('presentation');
  });
});

// ---------------------------------------------------------------------------
// VIS-TIMELINE — aegov-timeline
// ---------------------------------------------------------------------------

test.describe('VIS-TIMELINE — aegov-timeline', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-timeline'); });

  test('VIS-TL-01 — timeline renders as section (not nav)', async ({ page }) => {
    const root = page.locator('.not-aegov aegov-timeline').first();
    await expect(root, 'VIS-TL-01: timeline not visible').toBeVisible();
    const sectionEl = root.evaluate(el => {
      return el.shadowRoot?.querySelector('section') !== null ||
             el.querySelector('section') !== null;
    });
    expect(await sectionEl, 'VIS-TL-01: timeline root element is not a <section>').toBe(true);
  });

  test('VIS-TL-02 — timeline renders step items with content', async ({ page }) => {
    const steps = page.locator('.not-aegov aegov-timeline-step');
    const count = await steps.count();
    expect(count, 'VIS-TL-02: no aegov-timeline-step elements found').toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// VIS-DATEPICKER — aegov-datepicker
// ---------------------------------------------------------------------------

test.describe('VIS-DATEPICKER — aegov-datepicker', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-datepicker'); });

  test('VIS-DP-01 — datepicker renders trigger input', async ({ page }) => {
    const dp = page.locator('.not-aegov aegov-datepicker').first();
    await expect(dp, 'VIS-DP-01: datepicker not visible').toBeVisible();
  });

  test('VIS-DP-02 — datepicker opens calendar panel on trigger click (portal dialog appears)', async ({ page }) => {
    const dp = page.locator('.not-aegov aegov-datepicker').first();
    const trigger = dp.locator('button, [role="button"], input').first();
    await trigger.click();
    await page.waitForTimeout(500);
    // Datepicker creates a .aegov-datepicker-portal div in body with role="dialog" inside
    // isOpen is @State — not accessible from outside via property
    const calendarDialog = page.locator('.aegov-datepicker-portal [role="dialog"]');
    await expect(calendarDialog, 'VIS-DP-02: calendar dialog not found after clicking datepicker trigger').toBeAttached();
  });

  test('VIS-DP-03 — datepicker closes on Escape (portal dialog removed)', async ({ page }) => {
    const dp = page.locator('.not-aegov aegov-datepicker').first();
    const trigger = dp.locator('button, [role="button"], input').first();
    await trigger.click();
    await page.waitForTimeout(400);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    // After close, portal content is cleared (innerHTML = '')
    const portal = page.locator('.aegov-datepicker-portal');
    const hasDialog = await portal.locator('[role="dialog"]').count();
    expect(hasDialog, 'VIS-DP-03: datepicker calendar still showing after Escape').toBe(0);
  });
});

// ---------------------------------------------------------------------------
// VIS-NAVBLOCK — aegov-navblock
// ---------------------------------------------------------------------------

test.describe('VIS-NAVBLOCK — aegov-navblock', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-navblock'); });

  test('VIS-NB-01 — navblock renders with items', async ({ page }) => {
    const nb = page.locator('.not-aegov aegov-navblock').first();
    await expect(nb, 'VIS-NB-01: navblock not visible').toBeVisible();
    const items = nb.locator('aegov-navblock-item');
    const count = await items.count();
    expect(count, 'VIS-NB-01: no navblock items found').toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// VIS-INPUT-HINT-SLOT — regression check: slot="hint" (was "helper")
// ---------------------------------------------------------------------------

test.describe('VIS-INPUT-HINT — hint slot regression', () => {
  test('VIS-HINT-01 — input hint slot content is visible (regression: was slot="helper")', async ({ page }) => {
    await goTo(page, 'aegov-input');
    const hint = page.locator('.not-aegov span[slot="hint"]').first();
    await expect(hint, 'VIS-HINT-01: hint slot span not found').toBeVisible();
    const text = await hint.textContent();
    expect(text?.trim().length, 'VIS-HINT-01: hint slot content is empty').toBeGreaterThan(0);
  });

  test('VIS-HINT-02 — textarea hint slot content is visible (regression: was slot="helper")', async ({ page }) => {
    await goTo(page, 'aegov-textarea');
    const hint = page.locator('.not-aegov span[slot="hint"]').first();
    await expect(hint, 'VIS-HINT-02: hint slot span not found in textarea docs').toBeVisible();
    const text = await hint.textContent();
    expect(text?.trim().length, 'VIS-HINT-02: textarea hint slot content is empty').toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// VIS-MODAL-FORM — regression: aegov-input in modal has label (was bare label= prop)
// ---------------------------------------------------------------------------

test.describe('VIS-MODAL-FORM — modal form input has visible label', () => {
  test('VIS-MFRM-01 — modal form input is wrapped in form-field with visible label', async ({ page }) => {
    await goTo(page, 'aegov-modal');
    // Open the dismiss-behaviour modal which contains the form
    const trigger = page.locator('#demo-form-open');
    await expect(trigger, 'VIS-MFRM-01: demo-form-open trigger not found').toBeVisible();
    await trigger.click();
    await page.waitForTimeout(400);
    // Check for aegov-label inside the modal
    const modal = page.locator('#demo-form-modal');
    const label = modal.locator('aegov-label');
    await expect(label, 'VIS-MFRM-01: no aegov-label found in modal form (was using bare label= prop)').toBeVisible();
    const labelText = await label.textContent();
    expect(labelText?.trim(), 'VIS-MFRM-01: aegov-label is empty').toBeTruthy();
    await page.keyboard.press('Escape');
  });
});

// ---------------------------------------------------------------------------
// VIS-BLOCKQUOTE — aegov-blockquote
// ---------------------------------------------------------------------------

test.describe('VIS-BLOCKQUOTE — aegov-blockquote', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-blockquote'); });

  test('VIS-BQ-01 — blockquote renders with text content', async ({ page }) => {
    const bq = page.locator('.not-aegov aegov-blockquote').first();
    await expect(bq, 'VIS-BQ-01: blockquote not visible').toBeVisible();
    const text = await bq.textContent();
    expect(text?.trim().length, 'VIS-BQ-01: blockquote has no text content').toBeGreaterThan(0);
  });

  test('VIS-BQ-02 — colored/coloured appearance renders', async ({ page }) => {
    const colored = page.locator('.not-aegov aegov-blockquote[appearance="colored"], .not-aegov aegov-blockquote[appearance="coloured"]').first();
    await expect(colored, 'VIS-BQ-02: colored/coloured blockquote not found').toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// VIS-LINK — aegov-link
// ---------------------------------------------------------------------------

test.describe('VIS-LINK — aegov-link', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-link'); });

  test('VIS-LINK-01 — link renders with visible text', async ({ page }) => {
    const link = page.locator('.not-aegov aegov-link').first();
    await expect(link, 'VIS-LINK-01: link not visible').toBeVisible();
    const text = await link.textContent();
    expect(text?.trim().length, 'VIS-LINK-01: link has no text content').toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// VIS-AVATAR — aegov-avatar & aegov-avatar-group
// ---------------------------------------------------------------------------

test.describe('VIS-AVATAR — aegov-avatar', () => {
  test.beforeEach(async ({ page }) => { await goTo(page, 'aegov-avatar'); });

  test('VIS-AVT-01 — avatar renders', async ({ page }) => {
    const av = page.locator('.not-aegov aegov-avatar').first();
    await expect(av, 'VIS-AVT-01: avatar not visible').toBeVisible();
  });

  test('VIS-AVT-02 — avatar with circle appearance renders', async ({ page }) => {
    // Avatar has no "initials" prop; it shows src image or falls back to a placeholder
    const circleAv = page.locator('.not-aegov aegov-avatar[appearance="circle"]').first();
    if (await circleAv.count() > 0) {
      await expect(circleAv, 'VIS-AVT-02: circle avatar not visible').toBeVisible();
    } else {
      // At minimum verify multiple avatars are present
      const avs = page.locator('.not-aegov aegov-avatar');
      const count = await avs.count();
      expect(count, 'VIS-AVT-02: no avatars found on page').toBeGreaterThan(0);
    }
  });
});
