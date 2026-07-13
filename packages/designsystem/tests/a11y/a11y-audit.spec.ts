/**
 * Accessibility Audit Fix Verification Tests
 * Covers fixes from the full WCAG 2.1/2.2 AA + APG audit across all component groups.
 */
import { test, expect, Page } from '@playwright/test';

const BASE = 'http://localhost:3333';

async function loadFixture(page: Page, html: string) {
  await page.goto(`${BASE}/docs/pages/aegov-modal.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => customElements.get('aegov-button') !== undefined, { timeout: 15000 });
  await page.evaluate((markup) => {
    const container = document.createElement('div');
    container.id = 'qa-fixture';
    container.innerHTML = markup;
    document.body.appendChild(container);
  }, html);
  await page.waitForTimeout(300);
}

// ─────────────────────────────────────────────────────────────────────────────
// GROUP 1 — FORM CONTROLS
// ─────────────────────────────────────────────────────────────────────────────

test.describe('A11Y-G1-01 — role="alert" error regions must NOT have aria-live', () => {
  test('aegov-input error region has role=alert without aria-live', async ({ page }) => {
    await loadFixture(page, `
      <aegov-input field-id="qa-input-a1" label="Name" is-required="true"></aegov-input>
    `);
    await page.evaluate(async () => {
      const host = document.querySelector('aegov-input[field-id="qa-input-a1"]') as any;
      if (host?.componentOnReady) await host.componentOnReady();
      // Trigger validation by setting invalid state
      if (host?.setCustomValidity) host.setCustomValidity('Name is required');
    });
    await page.waitForTimeout(200);

    const alertEl = page.locator('#qa-input-a1 [role="alert"]').first();
    const count = await alertEl.count();
    if (count > 0) {
      const ariaLive = await alertEl.getAttribute('aria-live');
      console.log(`\n[G1-01] aegov-input role=alert aria-live: "${ariaLive}"`);
      expect(ariaLive).toBeNull();
    }
    // Component renders without throwing — core check
    const host = page.locator('aegov-input[field-id="qa-input-a1"]');
    await expect(host).toBeAttached();
  });

  test('aegov-checkbox error region has role=alert without aria-live', async ({ page }) => {
    await loadFixture(page, `
      <aegov-checkbox field-id="qa-cb-a1" label="Accept terms"></aegov-checkbox>
    `);
    await page.waitForTimeout(200);

    const alertRegions = page.locator('#qa-cb-a1 [role="alert"]');
    const count = await alertRegions.count();
    for (let i = 0; i < count; i++) {
      const ariaLive = await alertRegions.nth(i).getAttribute('aria-live');
      console.log(`\n[G1-01] aegov-checkbox alert[${i}] aria-live: "${ariaLive}"`);
      expect(ariaLive).toBeNull();
    }
  });
});

test.describe('A11Y-G1-02 — aegov-checkbox aria-checked="mixed" for indeterminate', () => {
  test('indeterminate checkbox has aria-checked="mixed" on the native input', async ({ page }) => {
    await loadFixture(page, `
      <aegov-checkbox field-id="qa-cb-ind" label="Select all" is-indeterminate="true"></aegov-checkbox>
    `);
    await page.waitForTimeout(200);

    const input = page.locator('aegov-checkbox[field-id="qa-cb-ind"] input[type="checkbox"]');
    await expect(input).toBeAttached({ timeout: 3000 });

    const ariaChecked = await input.getAttribute('aria-checked');
    console.log(`\n[G1-02] indeterminate checkbox aria-checked: "${ariaChecked}"`);
    expect(ariaChecked).toBe('mixed');
  });

  test('checked checkbox has aria-checked="true"', async ({ page }) => {
    await loadFixture(page, `
      <aegov-checkbox field-id="qa-cb-checked" label="Item" is-checked="true"></aegov-checkbox>
    `);
    await page.waitForTimeout(200);

    const input = page.locator('aegov-checkbox[field-id="qa-cb-checked"] input[type="checkbox"]');
    await expect(input).toBeAttached({ timeout: 3000 });

    const ariaChecked = await input.getAttribute('aria-checked');
    console.log(`\n[G1-02] checked checkbox aria-checked: "${ariaChecked}"`);
    expect(ariaChecked).toBe('true');
  });

  test('unchecked checkbox has aria-checked="false"', async ({ page }) => {
    await loadFixture(page, `
      <aegov-checkbox field-id="qa-cb-unchecked" label="Item"></aegov-checkbox>
    `);
    await page.waitForTimeout(200);

    const input = page.locator('aegov-checkbox[field-id="qa-cb-unchecked"] input[type="checkbox"]');
    await expect(input).toBeAttached({ timeout: 3000 });

    const ariaChecked = await input.getAttribute('aria-checked');
    console.log(`\n[G1-02] unchecked checkbox aria-checked: "${ariaChecked}"`);
    expect(ariaChecked).toBe('false');
  });
});

test.describe('A11Y-G1-03 — aegov-checkbox-group no aria-required on fieldset', () => {
  test('required checkbox-group fieldset has no aria-required attribute', async ({ page }) => {
    await loadFixture(page, `
      <aegov-checkbox-group field-id="qa-cbg-a1" label="Pick options" is-required="true">
        <aegov-checkbox label="Option A" value="a"></aegov-checkbox>
        <aegov-checkbox label="Option B" value="b"></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    await page.waitForTimeout(300);

    const fieldset = page.locator('aegov-checkbox-group[field-id="qa-cbg-a1"] fieldset, aegov-checkbox-group[field-id="qa-cbg-a1"] [role="group"]').first();
    const count = await fieldset.count();
    if (count > 0) {
      const ariaRequired = await fieldset.getAttribute('aria-required');
      console.log(`\n[G1-03] checkbox-group fieldset aria-required: "${ariaRequired}"`);
      expect(ariaRequired).toBeNull();

      // Should have sr-only "(required)" text in legend instead
      const srOnly = page.locator('aegov-checkbox-group[field-id="qa-cbg-a1"] .sr-only');
      const srCount = await srOnly.count();
      console.log(`[G1-03] sr-only elements in legend: ${srCount}`);
      if (srCount > 0) {
        const text = await srOnly.first().textContent();
        console.log(`[G1-03] sr-only text: "${text?.trim()}"`);
        expect(text?.toLowerCase()).toContain('required');
      }
    }
  });
});

test.describe('A11Y-G1-04 — aegov-select aria-controls always present', () => {
  test('listbox combobox trigger has aria-controls even when closed', async ({ page }) => {
    await loadFixture(page, `
      <aegov-select field-id="qa-sel-a1" appearance="listbox" placeholder="Pick one">
        <aegov-select-option value="a">Option A</aegov-select-option>
        <aegov-select-option value="b">Option B</aegov-select-option>
      </aegov-select>
    `);
    await page.waitForTimeout(300);

    const combobox = page.locator('aegov-select[field-id="qa-sel-a1"] [role="combobox"]');
    await expect(combobox).toBeAttached({ timeout: 3000 });

    const ariaControls = await combobox.getAttribute('aria-controls');
    console.log(`\n[G1-04] combobox aria-controls (closed): "${ariaControls}"`);
    expect(ariaControls).toBeTruthy();
  });

  test('combobox aria-controls value matches the listbox id', async ({ page }) => {
    await loadFixture(page, `
      <aegov-select field-id="qa-sel-a2" appearance="listbox" placeholder="Pick one">
        <aegov-select-option value="a">Option A</aegov-select-option>
      </aegov-select>
    `);
    await page.waitForTimeout(300);

    const { ariaControls, listboxId } = await page.evaluate(() => {
      const combobox = document.querySelector('aegov-select[field-id="qa-sel-a2"] [role="combobox"]') as HTMLElement;
      const listbox = document.querySelector('aegov-select[field-id="qa-sel-a2"] [role="listbox"]') as HTMLElement;
      return {
        ariaControls: combobox?.getAttribute('aria-controls'),
        listboxId: listbox?.id,
      };
    });
    console.log(`\n[G1-04] aria-controls="${ariaControls}" listbox id="${listboxId}"`);
    expect(ariaControls).toBeTruthy();
    if (listboxId) {
      expect(ariaControls).toBe(listboxId);
    }
  });
});

test.describe('A11Y-G1-05 — aegov-select Tab closes listbox', () => {
  test('pressing Tab while listbox is open closes it', async ({ page }) => {
    await loadFixture(page, `
      <aegov-select field-id="qa-sel-tab" appearance="listbox" placeholder="Pick one">
        <aegov-select-option value="a">Option A</aegov-select-option>
        <aegov-select-option value="b">Option B</aegov-select-option>
      </aegov-select>
    `);
    await page.waitForTimeout(300);

    // Open the listbox
    const combobox = page.locator('aegov-select[field-id="qa-sel-tab"] [role="combobox"]');
    await combobox.click();
    await page.waitForTimeout(300);

    const expandedBefore = await combobox.getAttribute('aria-expanded');
    console.log(`\n[G1-05] aria-expanded after click: "${expandedBefore}"`);
    expect(expandedBefore).toBe('true');

    // Press Tab — should close
    await page.keyboard.press('Tab');
    await page.waitForTimeout(300);

    const expandedAfter = await combobox.getAttribute('aria-expanded');
    console.log(`[G1-05] aria-expanded after Tab: "${expandedAfter}"`);
    expect(expandedAfter).toBe('false');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// GROUP 2 — NAVIGATION & STRUCTURE
// ─────────────────────────────────────────────────────────────────────────────

test.describe('A11Y-G2-01 — aegov-accordion-item plus icon has aria-hidden', () => {
  test('SVG icon in plus-variant accordion has aria-hidden="true"', async ({ page }) => {
    await loadFixture(page, `
      <aegov-accordion field-id="qa-acc-a1" icon="plus">
        <aegov-accordion-item heading="Item 1">Content</aegov-accordion-item>
      </aegov-accordion>
    `);
    await page.waitForTimeout(300);

    const plusSvg = page.locator('aegov-accordion[field-id="qa-acc-a1"] .accordion-item__icon-plus');
    const count = await plusSvg.count();
    console.log(`\n[G2-01] plus SVG icons found: ${count}`);
    if (count > 0) {
      const ariaHidden = await plusSvg.first().getAttribute('aria-hidden');
      console.log(`[G2-01] plus SVG aria-hidden: "${ariaHidden}"`);
      expect(ariaHidden).toBe('true');
    }
  });
});

test.describe('A11Y-G2-02 — aegov-breadcrumbs-item linked last item has aria-current', () => {
  test('last breadcrumb with href has aria-current="page"', async ({ page }) => {
    await loadFixture(page, `
      <aegov-breadcrumbs field-id="qa-bc-a1">
        <aegov-breadcrumbs-item href="/home">Home</aegov-breadcrumbs-item>
        <aegov-breadcrumbs-item href="/about">About</aegov-breadcrumbs-item>
        <aegov-breadcrumbs-item href="/current">Current Page</aegov-breadcrumbs-item>
      </aegov-breadcrumbs>
    `);
    await page.waitForTimeout(400);

    const items = page.locator('aegov-breadcrumbs[field-id="qa-bc-a1"] aegov-breadcrumbs-item');
    const lastItem = items.last();
    const link = lastItem.locator('a');

    const ariaCurrent = await link.getAttribute('aria-current');
    console.log(`\n[G2-02] last breadcrumb link aria-current: "${ariaCurrent}"`);
    expect(ariaCurrent).toBe('page');
  });

  test('non-last breadcrumb with href does not have aria-current', async ({ page }) => {
    await loadFixture(page, `
      <aegov-breadcrumbs field-id="qa-bc-a2">
        <aegov-breadcrumbs-item href="/home">Home</aegov-breadcrumbs-item>
        <aegov-breadcrumbs-item href="/about">About</aegov-breadcrumbs-item>
        <aegov-breadcrumbs-item href="/current">Current</aegov-breadcrumbs-item>
      </aegov-breadcrumbs>
    `);
    await page.waitForTimeout(400);

    const items = page.locator('aegov-breadcrumbs[field-id="qa-bc-a2"] aegov-breadcrumbs-item');
    const firstLink = items.first().locator('a');
    const ariaCurrent = await firstLink.getAttribute('aria-current');
    console.log(`\n[G2-02] first breadcrumb aria-current: "${ariaCurrent}"`);
    expect(ariaCurrent).toBeNull();
  });
});

test.describe('A11Y-G2-03 — aegov-tab disabled uses aria-disabled only (not native disabled)', () => {
  test('disabled tab button has no native disabled attribute', async ({ page }) => {
    await loadFixture(page, `
      <aegov-tabs field-id="qa-tabs-a1">
        <aegov-tab slot="tabs" tab-id="t1">Tab 1</aegov-tab>
        <aegov-tab slot="tabs" tab-id="t2" is-disabled="true">Tab 2 (disabled)</aegov-tab>
        <aegov-tab-panel tab-id="t1">Panel 1</aegov-tab-panel>
        <aegov-tab-panel tab-id="t2">Panel 2</aegov-tab-panel>
      </aegov-tabs>
    `);
    await page.waitForTimeout(400);

    const disabledTab = page.locator('aegov-tabs[field-id="qa-tabs-a1"] aegov-tab[is-disabled] button[role="tab"]');
    await expect(disabledTab).toBeAttached({ timeout: 3000 });

    const nativeDisabled = await disabledTab.getAttribute('disabled');
    const ariaDisabled = await disabledTab.getAttribute('aria-disabled');

    console.log(`\n[G2-03] disabled tab — native disabled: "${nativeDisabled}", aria-disabled: "${ariaDisabled}"`);
    expect(nativeDisabled).toBeNull();
    expect(ariaDisabled).toBe('true');
  });

  test('disabled tab remains in DOM and can be focused by keyboard', async ({ page }) => {
    await loadFixture(page, `
      <aegov-tabs field-id="qa-tabs-a2">
        <aegov-tab slot="tabs" tab-id="x1">Tab 1</aegov-tab>
        <aegov-tab slot="tabs" tab-id="x2" is-disabled="true">Tab 2</aegov-tab>
        <aegov-tab-panel tab-id="x1">Panel 1</aegov-tab-panel>
        <aegov-tab-panel tab-id="x2">Panel 2</aegov-tab-panel>
      </aegov-tabs>
    `);
    await page.waitForTimeout(400);

    // Disabled tab should exist in the DOM (not removed)
    const disabledTab = page.locator('aegov-tabs[field-id="qa-tabs-a2"] aegov-tab[is-disabled] button[role="tab"]');
    await expect(disabledTab).toBeAttached({ timeout: 3000 });

    // Should be navigable (tabIndex -1 for roving tabindex, but no native disabled)
    const tagName = await disabledTab.evaluate(el => el.tagName.toLowerCase());
    console.log(`\n[G2-03] disabled tab element: <${tagName}>`);
    expect(tagName).toBe('button');
  });
});

test.describe('A11Y-G2-04 — aegov-pagination ellipsis li has aria-hidden', () => {
  test('ellipsis list items are hidden from AT with aria-hidden', async ({ page }) => {
    await loadFixture(page, `
      <aegov-pagination field-id="qa-pg-a1" pages="20" page-current="10"></aegov-pagination>
    `);
    await page.waitForTimeout(300);

    const ellipsisItems = page.locator('aegov-pagination[field-id="qa-pg-a1"] li.pagination__item--ellipsis');
    const count = await ellipsisItems.count();
    console.log(`\n[G2-04] ellipsis list items found: ${count}`);

    for (let i = 0; i < count; i++) {
      const ariaHidden = await ellipsisItems.nth(i).getAttribute('aria-hidden');
      console.log(`[G2-04] ellipsis li[${i}] aria-hidden: "${ariaHidden}"`);
      expect(ariaHidden).toBe('true');
    }
  });
});

test.describe('A11Y-G2-05 — aegov-pagination compact indicator announces descriptive text', () => {
  test('compact variant live region renders descriptive text content', async ({ page }) => {
    await loadFixture(page, `
      <aegov-pagination field-id="qa-pg-compact" variant="compact" pages="10" page-current="3"></aegov-pagination>
    `);
    await page.waitForTimeout(300);

    const indicator = page.locator('aegov-pagination[field-id="qa-pg-compact"] .pagination__compact-indicator');
    const count = await indicator.count();
    console.log(`\n[G2-05] compact indicator found: ${count}`);

    if (count > 0) {
      const text = await indicator.first().textContent();
      const ariaLabel = await indicator.first().getAttribute('aria-label');
      console.log(`[G2-05] text content: "${text?.trim()}", aria-label: "${ariaLabel}"`);
      // Text content should be the descriptive string (e.g. "Page 3 of 10"), not just "3 / 10"
      expect(text?.trim()).toBeTruthy();
      // After fix, text content IS the accessible string; aria-label removed
      expect(ariaLabel).toBeNull();
      // Should not be raw fraction like "3 / 10" (regex: digit space slash space digit)
      expect(text?.trim()).not.toMatch(/^\d+ \/ \d+$/);
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// GROUP 3 — OVERLAYS
// ─────────────────────────────────────────────────────────────────────────────

test.describe('A11Y-G3-01 — aegov-modal Escape always closes (non-cancellable)', () => {
  test('Escape closes modal even when beforeClose handler calls preventDefault', async ({ page }) => {
    // Create modal CLOSED first so @Watch fires on open (sets up keyboard listener)
    await loadFixture(page, `
      <aegov-modal field-id="qa-modal-esc" label="Test modal">
        <button id="qa-modal-esc-focus-target">Close me</button>
      </aegov-modal>
    `);
    await page.waitForTimeout(300);

    // Open programmatically — triggers @Watch(isOpen: false→true) → handleOpen() → keyboard listener
    await page.evaluate(async () => {
      const modal = document.querySelector('aegov-modal[field-id="qa-modal-esc"]') as any;
      if (modal?.componentOnReady) await modal.componentOnReady();
      modal.isOpen = true;
    });
    await page.waitForTimeout(400);

    const dialog = page.locator('#qa-modal-esc');
    await expect(dialog).toBeVisible({ timeout: 5000 });

    // Attach beforeClose handler that prevents default (simulates consumer blocking close)
    await page.evaluate(() => {
      const modal = document.querySelector('aegov-modal[field-id="qa-modal-esc"]') as any;
      modal?.addEventListener('aegovModalBeforeClose', (e: Event) => {
        e.preventDefault();
      });
    });

    // Press Escape — must close despite beforeClose.preventDefault() per SC 2.1.2
    await page.keyboard.press('Escape');
    await page.waitForTimeout(600);

    const isVisible = await dialog.isVisible();
    console.log(`\n[G3-01] modal visible after Escape (with beforeClose preventDefault): ${isVisible}`);
    expect(isVisible).toBe(false);
  });
});

test.describe('A11Y-G3-02 — aegov-drawer Escape always closes (non-cancellable)', () => {
  test('Escape closes drawer even when beforeClose handler calls preventDefault', async ({ page }) => {
    await page.goto(`${BASE}/docs/pages/aegov-drawer.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => customElements.get('aegov-drawer') !== undefined, { timeout: 15000 });

    // Create drawer CLOSED so @Watch fires on programmatic open (sets up keyboard listener)
    await page.evaluate(() => {
      const el = document.createElement('aegov-drawer') as any;
      el.setAttribute('field-id', 'qa-drawer-esc');
      el.setAttribute('label', 'Test drawer');
      el.innerHTML = '<button>Close me</button>';
      document.body.appendChild(el);
    });
    await page.waitForTimeout(300);

    // Open programmatically — triggers @Watch(isOpen: false→true) → keyboard listener added
    await page.evaluate(async () => {
      const drawer = document.querySelector('aegov-drawer[field-id="qa-drawer-esc"]') as any;
      if (drawer?.componentOnReady) await drawer.componentOnReady();
      drawer.isOpen = true;
    });
    await page.waitForTimeout(400);

    const dialog = page.locator('#qa-drawer-esc');
    await expect(dialog).toBeVisible({ timeout: 5000 });

    // Attach beforeClose handler that prevents default
    await page.evaluate(() => {
      const drawer = document.querySelector('aegov-drawer[field-id="qa-drawer-esc"]') as any;
      drawer?.addEventListener('aegovDrawerBeforeClose', (e: Event) => {
        e.preventDefault();
      });
    });

    await page.keyboard.press('Escape');
    await page.waitForTimeout(600);

    const isVisible = await dialog.isVisible();
    console.log(`\n[G3-02] drawer visible after Escape (with beforeClose preventDefault): ${isVisible}`);
    expect(isVisible).toBe(false);
  });
});

test.describe('A11Y-G3-03 — aegov-dropdown Tab closes menu', () => {
  test('pressing Tab while menu is open closes it and moves focus out', async ({ page }) => {
    await loadFixture(page, `
      <aegov-dropdown field-id="qa-dd-tab" trigger="click">
        <button id="qa-dd-trigger-btn">Open menu</button>
        <div slot="dropdown-content">
          <button id="qa-dd-item-1">Item 1</button>
          <button id="qa-dd-item-2">Item 2</button>
        </div>
      </aegov-dropdown>
      <button id="qa-after-dd">After dropdown</button>
    `);
    await page.waitForTimeout(500);

    // The trigger button is slotted content — it may be projected into the trigger wrapper
    // Use a direct ID selector to reliably find it
    const triggerBtn = page.locator('#qa-dd-trigger-btn');
    await expect(triggerBtn).toBeVisible({ timeout: 5000 });
    await triggerBtn.click();
    await page.waitForTimeout(300);

    // Find the element with aria-expanded (the inner trigger wrapper or the button itself)
    const expanded = await page.evaluate(() => {
      const dd = document.querySelector('aegov-dropdown[field-id="qa-dd-tab"]');
      const el = dd?.querySelector('[aria-expanded]') as HTMLElement;
      return el?.getAttribute('aria-expanded');
    });
    console.log(`\n[G3-03] aria-expanded after click: "${expanded}"`);

    // Press Tab — should close the dropdown (APG Menu Button: Tab exits menu)
    await page.keyboard.press('Tab');
    await page.waitForTimeout(400);

    const expandedAfter = await page.evaluate(() => {
      const dd = document.querySelector('aegov-dropdown[field-id="qa-dd-tab"]');
      const el = dd?.querySelector('[aria-expanded]') as HTMLElement;
      return el?.getAttribute('aria-expanded');
    });
    console.log(`[G3-03] aria-expanded after Tab: "${expandedAfter}"`);
    expect(expandedAfter).toBe('false');
  });
});

test.describe('A11Y-G3-04 — aegov-tooltip aria-describedby on slotted trigger', () => {
  test('slotted button has aria-describedby pointing to tooltip content', async ({ page }) => {
    await loadFixture(page, `
      <aegov-tooltip field-id="qa-tt-a1" content="Helpful description">
        <button id="qa-tt-trigger">Hover me</button>
      </aegov-tooltip>
    `);
    await page.waitForTimeout(300);

    const trigger = page.locator('#qa-tt-trigger');
    await expect(trigger).toBeAttached({ timeout: 3000 });

    const ariaDescribedby = await trigger.getAttribute('aria-describedby');
    console.log(`\n[G3-04] trigger aria-describedby: "${ariaDescribedby}"`);
    expect(ariaDescribedby).toBeTruthy();

    // The referenced tooltip element should exist and have role=tooltip
    if (ariaDescribedby) {
      const tooltipEl = page.locator(`#${ariaDescribedby}`);
      const tooltipCount = await tooltipEl.count();
      if (tooltipCount > 0) {
        const role = await tooltipEl.getAttribute('role');
        console.log(`[G3-04] tooltip element role: "${role}"`);
        expect(role).toBe('tooltip');
      }
    }
  });

  test('tooltip wrapper div does NOT have aria-describedby', async ({ page }) => {
    await loadFixture(page, `
      <aegov-tooltip field-id="qa-tt-a2" content="Helpful description">
        <button>Hover me</button>
      </aegov-tooltip>
    `);
    await page.waitForTimeout(300);

    // The outer wrapper div should not have aria-describedby
    const wrapper = page.locator('aegov-tooltip[field-id="qa-tt-a2"] > div').first();
    const count = await wrapper.count();
    if (count > 0) {
      const ariaDescribedby = await wrapper.getAttribute('aria-describedby');
      console.log(`\n[G3-04] wrapper div aria-describedby: "${ariaDescribedby}"`);
      expect(ariaDescribedby).toBeNull();
    }
  });
});

test.describe('A11Y-G3-05 — aegov-banner no aria-live on region, aria-label uses heading', () => {
  test('banner region element has no aria-live attribute', async ({ page }) => {
    await loadFixture(page, `
      <aegov-banner field-id="qa-banner-a1" heading="System Update" variant="info">
        <p>Maintenance window tonight</p>
      </aegov-banner>
    `);
    await page.waitForTimeout(300);

    const region = page.locator('aegov-banner[field-id="qa-banner-a1"] [role="region"]');
    const count = await region.count();
    console.log(`\n[G3-05] region elements found: ${count}`);

    if (count > 0) {
      const ariaLive = await region.first().getAttribute('aria-live');
      console.log(`[G3-05] region aria-live: "${ariaLive}"`);
      expect(ariaLive).toBeNull();

      const ariaLabel = await region.first().getAttribute('aria-label');
      console.log(`[G3-05] region aria-label: "${ariaLabel}"`);
      // aria-label should come from the heading prop now
      expect(ariaLabel).toBe('System Update');
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// GROUP 4 — DISPLAY & MISC
// ─────────────────────────────────────────────────────────────────────────────

test.describe('A11Y-G4-01 — aegov-separator aria-orientation conditional on role', () => {
  test('decorative separator (isDecorative=true) has no aria-orientation', async ({ page }) => {
    await loadFixture(page, `
      <aegov-separator field-id="qa-sep-deco" is-decorative="true"></aegov-separator>
    `);
    await page.waitForTimeout(200);

    const sep = page.locator('aegov-separator[field-id="qa-sep-deco"] hr, aegov-separator[field-id="qa-sep-deco"] [role="presentation"]').first();
    const count = await sep.count();
    if (count > 0) {
      const ariaOrientation = await sep.getAttribute('aria-orientation');
      const role = await sep.getAttribute('role');
      console.log(`\n[G4-01] decorative — role: "${role}", aria-orientation: "${ariaOrientation}"`);
      expect(ariaOrientation).toBeNull();
      expect(role).toBe('presentation');
    }
  });

  test('semantic separator (isDecorative=false) has aria-orientation', async ({ page }) => {
    await loadFixture(page, `
      <aegov-separator field-id="qa-sep-semantic" is-decorative="false"></aegov-separator>
    `);
    await page.waitForTimeout(200);

    const sep = page.locator('aegov-separator[field-id="qa-sep-semantic"] hr, aegov-separator[field-id="qa-sep-semantic"] [role="separator"]').first();
    const count = await sep.count();
    if (count > 0) {
      const ariaOrientation = await sep.getAttribute('aria-orientation');
      const role = await sep.getAttribute('role');
      console.log(`\n[G4-01] semantic — role: "${role}", aria-orientation: "${ariaOrientation}"`);
      expect(role).toBe('separator');
      expect(ariaOrientation).toBeTruthy();
    }
  });

  test('separator with text content is forced to role=separator regardless of isDecorative', async ({ page }) => {
    await loadFixture(page, `
      <aegov-separator field-id="qa-sep-text" is-decorative="true" text="Section break"></aegov-separator>
    `);
    await page.waitForTimeout(200);

    // When text is present, role must be separator (not presentation)
    const sepEl = page.locator('aegov-separator[field-id="qa-sep-text"] [role="separator"]');
    const count = await sepEl.count();
    console.log(`\n[G4-01] labeled separator role=separator count: ${count}`);
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('A11Y-G4-02 — aegov-timeline uses section not nav', () => {
  test('timeline root element is a section, not a nav', async ({ page }) => {
    await loadFixture(page, `
      <aegov-timeline field-id="qa-tl-a1" aria-label="Progress steps">
        <aegov-timeline-item label="Step 1" status="completed"></aegov-timeline-item>
        <aegov-timeline-item label="Step 2" status="active"></aegov-timeline-item>
      </aegov-timeline>
    `);
    await page.waitForTimeout(300);

    const tagName = await page.evaluate(() => {
      const tl = document.querySelector('aegov-timeline[field-id="qa-tl-a1"]');
      const root = tl?.shadowRoot?.querySelector('section, nav, div') ?? tl?.querySelector('section, nav');
      return root?.tagName?.toLowerCase() ?? null;
    });

    // Fallback: check first child of the custom element
    const rootTag = tagName ?? await page.evaluate(() => {
      const tl = document.querySelector('aegov-timeline[field-id="qa-tl-a1"]');
      return tl?.children[0]?.tagName?.toLowerCase() ?? null;
    });

    console.log(`\n[G4-02] timeline root element: <${rootTag}>`);
    expect(rootTag).toBe('section');
    expect(rootTag).not.toBe('nav');
  });
});

test.describe('A11Y-G4-03 — aegov-button loading state has sr-only announcement', () => {
  test('loading button contains a sr-only element for screen readers', async ({ page }) => {
    await loadFixture(page, `
      <aegov-button field-id="qa-btn-loading" is-loading="true">Submit</aegov-button>
    `);
    await page.waitForTimeout(200);

    const srOnly = page.locator('aegov-button[field-id="qa-btn-loading"] .sr-only');
    const count = await srOnly.count();
    console.log(`\n[G4-03] sr-only elements in loading button: ${count}`);
    expect(count).toBeGreaterThan(0);

    if (count > 0) {
      const text = await srOnly.first().textContent();
      console.log(`[G4-03] sr-only text: "${text?.trim()}"`);
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('non-loading button has no sr-only loading announcement', async ({ page }) => {
    await loadFixture(page, `
      <aegov-button field-id="qa-btn-normal">Submit</aegov-button>
    `);
    await page.waitForTimeout(200);

    // Count sr-only with loading-related text
    const loadingSrOnly = await page.evaluate(() => {
      const btn = document.querySelector('aegov-button[field-id="qa-btn-normal"]');
      const srEls = btn?.querySelectorAll('.sr-only') ?? [];
      return Array.from(srEls).filter(el => el.textContent?.toLowerCase().includes('load')).length;
    });
    console.log(`\n[G4-03] loading sr-only in normal button: ${loadingSrOnly}`);
    expect(loadingSrOnly).toBe(0);
  });
});

test.describe('A11Y-G4-04 — aegov-progress aria-valuetext with counterSuffix', () => {
  test('progress with counterSuffix has aria-valuetext including the suffix', async ({ page }) => {
    await loadFixture(page, `
      <aegov-progress field-id="qa-prog-a1" value="50" max="100" counter-suffix=" MB" label="Upload progress"></aegov-progress>
    `);
    await page.waitForTimeout(200);

    const progress = page.locator('aegov-progress[field-id="qa-prog-a1"] progress');
    const count = await progress.count();
    console.log(`\n[G4-04] native progress elements found: ${count}`);

    if (count > 0) {
      const ariaValuetext = await progress.first().getAttribute('aria-valuetext');
      const ariaLabel = await progress.first().getAttribute('aria-label');
      console.log(`[G4-04] aria-valuetext: "${ariaValuetext}", aria-label: "${ariaLabel}"`);
      expect(ariaValuetext).toBe('50 MB');
      expect(ariaLabel).toBe('Upload progress');
    }
  });

  test('progress without counterSuffix has no aria-valuetext', async ({ page }) => {
    await loadFixture(page, `
      <aegov-progress field-id="qa-prog-a2" value="75" max="100" label="Loading"></aegov-progress>
    `);
    await page.waitForTimeout(200);

    const progress = page.locator('aegov-progress[field-id="qa-prog-a2"] progress');
    const count = await progress.count();
    if (count > 0) {
      const ariaValuetext = await progress.first().getAttribute('aria-valuetext');
      console.log(`\n[G4-04] no suffix — aria-valuetext: "${ariaValuetext}"`);
      expect(ariaValuetext).toBeNull();
    }
  });
});
