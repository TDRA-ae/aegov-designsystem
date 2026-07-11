/**
 * QA Fix Verification Tests
 * Covers every P0 and P1 fix applied in the QA audit.
 *
 * P0-01 — build:prod includes build:copy-css (verified at build time, not runtime)
 * P0-02 — aegov-modal has aria-label on role=dialog
 * P0-03 — aegov-drawer has aria-label on role=dialog
 * P0-04 — aegov-callout default slot renders content
 * P1-01 — aegov-dropdown wrapper div has no duplicate ARIA attributes
 * P1-02 — aegov-select clear button is a native <button>, keyboard operable
 * P1-03 — aegov-badge variant prop works; legacy color prop still works
 * P1-04 — aegov-popover closePopover() is callable as @Method()
 * P1-05 — aegov-dropdown closeDropdown() is callable as @Method()
 */
import { test, expect, Page } from '@playwright/test';

const BASE = 'http://localhost:3333';

async function loadPage(page: Page, path: string) {
  await page.goto(`${BASE}${path}`, { waitUntil: 'domcontentloaded' });
  // Wait for Stencil custom elements to be defined
  await page.waitForFunction(() => customElements.get('aegov-button') !== undefined, { timeout: 15000 });
  await page.waitForTimeout(300);
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: inject an inline test fixture into a blank page
// ─────────────────────────────────────────────────────────────────────────────
async function loadFixture(page: Page, html: string) {
  await page.goto(`${BASE}/docs/pages/aegov-modal.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => customElements.get('aegov-modal') !== undefined, { timeout: 15000 });
  await page.evaluate((markup) => {
    const container = document.createElement('div');
    container.id = 'qa-fixture';
    container.innerHTML = markup;
    document.body.appendChild(container);
  }, html);
  await page.waitForTimeout(200);
}

// ─────────────────────────────────────────────────────────────────────────────
// P0-02 — aegov-modal: aria-label on dialog
// ─────────────────────────────────────────────────────────────────────────────
test.describe('P0-02 — aegov-modal aria-label', () => {
  test('dialog element carries aria-label from label prop', async ({ page }) => {
    await loadFixture(page, `
      <aegov-modal field-id="qa-modal-1" label="Confirm deletion" is-open="true">
        <p>Are you sure?</p>
      </aegov-modal>
    `);

    const dialog = page.locator('#qa-modal-1');
    await expect(dialog).toBeVisible({ timeout: 5000 });
    const ariaLabel = await dialog.getAttribute('aria-label');
    console.log(`\n[P0-02] aegov-modal aria-label: "${ariaLabel}"`);
    expect(ariaLabel).toBe('Confirm deletion');

    const role = await dialog.getAttribute('role');
    expect(role).toBe('dialog');

    const ariaModal = await dialog.getAttribute('aria-modal');
    expect(ariaModal).toBe('true');

    const snapshot = await dialog.ariaSnapshot();
    console.log(`[P0-02] ARIA snapshot: ${snapshot.substring(0, 200)}`);
    expect(snapshot).toContain('Confirm deletion');
  });

  test('dialog without label prop has no aria-label (consumer must pass aria-labelledby)', async ({ page }) => {
    await loadFixture(page, `
      <aegov-modal field-id="qa-modal-2" is-open="true">
        <h2 id="qa-modal-2-title">My heading</h2>
      </aegov-modal>
    `);
    const dialog = page.locator('#qa-modal-2');
    await expect(dialog).toBeVisible({ timeout: 5000 });
    const ariaLabel = await dialog.getAttribute('aria-label');
    console.log(`\n[P0-02] No label prop — aria-label: "${ariaLabel}"`);
    // Without label prop, aria-label should be absent (consumer passes aria-labelledby)
    expect(ariaLabel).toBeNull();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// P0-03 — aegov-drawer: aria-label on dialog
// ─────────────────────────────────────────────────────────────────────────────
test.describe('P0-03 — aegov-drawer aria-label', () => {
  test('dialog element carries aria-label from label prop', async ({ page }) => {
    await page.goto(`${BASE}/docs/pages/aegov-drawer.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => customElements.get('aegov-drawer') !== undefined, { timeout: 15000 });

    await page.evaluate(() => {
      const drawer = document.createElement('aegov-drawer') as any;
      drawer.setAttribute('field-id', 'qa-drawer-1');
      drawer.setAttribute('label', 'Navigation drawer');
      drawer.setAttribute('is-open', 'true');
      drawer.innerHTML = '<p>Drawer content</p>';
      document.body.appendChild(drawer);
    });
    await page.waitForTimeout(400);

    const dialog = page.locator('#qa-drawer-1');
    await expect(dialog).toBeVisible({ timeout: 5000 });
    const ariaLabel = await dialog.getAttribute('aria-label');
    console.log(`\n[P0-03] aegov-drawer aria-label: "${ariaLabel}"`);
    expect(ariaLabel).toBe('Navigation drawer');

    const role = await dialog.getAttribute('role');
    expect(role).toBe('dialog');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// P0-04 — aegov-callout: default slot renders content
// ─────────────────────────────────────────────────────────────────────────────
test.describe('P0-04 — aegov-callout default slot', () => {
  test('content placed inside <aegov-callout> without slot attr is rendered', async ({ page }) => {
    await loadPage(page, '/docs/pages/aegov-callout.html');
    await page.waitForFunction(() => customElements.get('aegov-callout') !== undefined, { timeout: 15000 });

    await page.evaluate(() => {
      const el = document.createElement('aegov-callout') as any;
      el.setAttribute('field-id', 'qa-callout-1');
      el.textContent = 'Default slot text is visible';
      document.body.appendChild(el);
    });
    await page.waitForTimeout(300);

    const callout = page.locator('#qa-callout-1');
    await expect(callout).toBeVisible();
    const text = await callout.textContent();
    console.log(`\n[P0-04] aegov-callout text content: "${text?.trim()}"`);
    expect(text).toContain('Default slot text is visible');
  });

  test('callout with variant=error renders as role=alert', async ({ page }) => {
    await loadPage(page, '/docs/pages/aegov-callout.html');
    await page.waitForFunction(() => customElements.get('aegov-callout') !== undefined, { timeout: 15000 });

    await page.evaluate(() => {
      const el = document.createElement('aegov-callout') as any;
      el.setAttribute('field-id', 'qa-callout-2');
      el.setAttribute('variant', 'error');
      el.textContent = 'Something went wrong';
      document.body.appendChild(el);
    });
    await page.waitForTimeout(300);

    // fieldId and role are on the same inner div — use attribute selector (no space)
    const callout = page.locator('#qa-callout-2[role="alert"]');
    await expect(callout).toBeVisible();
    const text = await callout.textContent();
    expect(text).toContain('Something went wrong');
    console.log(`\n[P0-04] role=alert content: "${text?.trim()}"`);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// P1-01 — aegov-dropdown: no duplicate ARIA on wrapper div
// ─────────────────────────────────────────────────────────────────────────────
test.describe('P1-01 — aegov-dropdown no duplicate ARIA on wrapper', () => {
  test('trigger wrapper div does NOT have aria-haspopup/aria-expanded/aria-controls', async ({ page }) => {
    await loadPage(page, '/docs/pages/aegov-dropdown.html');
    await page.waitForFunction(() => customElements.get('aegov-dropdown') !== undefined, { timeout: 15000 });

    // Pick the first dropdown on the page
    const dropdown = page.locator('aegov-dropdown').first();
    await expect(dropdown).toBeVisible();

    const triggerDiv = dropdown.locator('.aegov-dropdown-trigger').first();

    const haspopup = await triggerDiv.getAttribute('aria-haspopup');
    const expanded = await triggerDiv.getAttribute('aria-expanded');
    const controls = await triggerDiv.getAttribute('aria-controls');

    console.log(`\n[P1-01] wrapper div — aria-haspopup: "${haspopup}", aria-expanded: "${expanded}", aria-controls: "${controls}"`);

    expect(haspopup).toBeNull();
    expect(expanded).toBeNull();
    expect(controls).toBeNull();
  });

  test('ARIA attributes are on the inner focusable child, not the wrapper', async ({ page }) => {
    await loadPage(page, '/docs/pages/aegov-dropdown.html');
    await page.waitForFunction(() => customElements.get('aegov-dropdown') !== undefined, { timeout: 15000 });

    const dropdown = page.locator('aegov-dropdown').first();
    // Open it
    await dropdown.locator('.aegov-dropdown-trigger').first().click();
    await page.waitForTimeout(300);

    const triggerDiv = dropdown.locator('.aegov-dropdown-trigger').first();
    // The inner button/link should have aria-expanded=true
    const innerFocusable = triggerDiv.locator('button, a, [tabindex="0"]').first();
    const innerExpanded = await innerFocusable.getAttribute('aria-expanded');
    const innerHaspopup = await innerFocusable.getAttribute('aria-haspopup');
    console.log(`\n[P1-01] inner focusable — aria-haspopup: "${innerHaspopup}", aria-expanded: "${innerExpanded}"`);

    expect(innerHaspopup).toBe('menu');
    expect(innerExpanded).toBe('true');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// P1-02 — aegov-select: clear button is a native <button>
// ─────────────────────────────────────────────────────────────────────────────
test.describe('P1-02 — aegov-select clear button is native <button>', () => {
  test('clear button renders as <button> element, not <span>', async ({ page }) => {
    await loadPage(page, '/docs/pages/aegov-select.html');
    await page.waitForFunction(() => customElements.get('aegov-select') !== undefined, { timeout: 15000 });

    // Use appearance="listbox" to force the custom listbox render path (which has .select__clear)
    // The native render path (<select>) has no clear button
    await page.evaluate(() => {
      const container = document.createElement('div');
      container.id = 'qa-select-wrap';
      container.innerHTML = `
        <aegov-select field-id="qa-select-1" is-clearable="true" appearance="listbox" placeholder="Pick one">
          <aegov-select-option value="active">Active</aegov-select-option>
          <aegov-select-option value="closed">Closed</aegov-select-option>
        </aegov-select>
      `;
      document.body.appendChild(container);
    });
    // Wait for component to fully initialize before setting value prop
    // Use host element selector (field-id attribute, not id) so we get it before inner render
    await page.evaluate(async () => {
      const host = document.querySelector('aegov-select[field-id="qa-select-1"]') as any;
      if (host?.componentOnReady) await host.componentOnReady();
      if (host) host.value = 'active';
    });
    await page.waitForTimeout(400);

    const clearBtn = page.locator('#qa-select-1 .select__clear');
    await expect(clearBtn).toBeVisible({ timeout: 5000 });

    const tagName = await clearBtn.evaluate(el => el.tagName.toLowerCase());
    console.log(`\n[P1-02] clear button tag: <${tagName}>`);
    expect(tagName).toBe('button');

    const role = await clearBtn.getAttribute('role');
    console.log(`[P1-02] role attribute: "${role}"`);
    expect(role).toBeNull(); // native button, no role override needed

    const ariaLabel = await clearBtn.getAttribute('aria-label');
    console.log(`[P1-02] aria-label: "${ariaLabel}"`);
    expect(ariaLabel).toBeTruthy();
  });

  test('clear button is keyboard-focusable and can be activated to clear selection', async ({ page }) => {
    await loadPage(page, '/docs/pages/aegov-select.html');
    await page.waitForFunction(() => customElements.get('aegov-select') !== undefined, { timeout: 15000 });

    await page.evaluate(() => {
      const container = document.createElement('div');
      container.id = 'qa-select-wrap2';
      container.innerHTML = `
        <aegov-select field-id="qa-select-2" is-clearable="true" appearance="listbox" placeholder="Pick one">
          <aegov-select-option value="active">Active</aegov-select-option>
          <aegov-select-option value="closed">Closed</aegov-select-option>
        </aegov-select>
      `;
      document.body.appendChild(container);
    });
    await page.evaluate(async () => {
      const host = document.querySelector('aegov-select[field-id="qa-select-2"]') as any;
      if (host?.componentOnReady) await host.componentOnReady();
      if (host) host.value = 'active';
    });
    await page.waitForTimeout(400);

    const clearBtn = page.locator('#qa-select-2 .select__clear');
    await expect(clearBtn).toBeVisible({ timeout: 5000 });

    // Native <button> is keyboard-focusable by default (tabIndex >= 0)
    const tabIndex = await clearBtn.evaluate(el => (el as HTMLElement).tabIndex);
    console.log(`\n[P1-02] clear button tabIndex: ${tabIndex}`);
    expect(tabIndex).toBeGreaterThanOrEqual(0);

    // Activate via direct click to clear the selection
    await clearBtn.click();
    await page.waitForTimeout(300);

    // After clear, the button should disappear (no value selected)
    const visible = await clearBtn.isVisible();
    console.log(`[P1-02] clear button visible after click: ${visible}`);
    expect(visible).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// P1-03 — aegov-badge: variant prop + legacy color prop
// ─────────────────────────────────────────────────────────────────────────────
test.describe('P1-03 — aegov-badge variant prop', () => {
  test('variant prop applies correct color class', async ({ page }) => {
    await loadPage(page, '/docs/pages/aegov-badge.html');
    await page.waitForFunction(() => customElements.get('aegov-badge') !== undefined, { timeout: 15000 });

    await page.evaluate(() => {
      const el = document.createElement('aegov-badge') as any;
      el.setAttribute('field-id', 'qa-badge-variant');
      el.setAttribute('variant', 'aegreen');
      el.textContent = 'New';
      document.body.appendChild(el);
    });
    await page.waitForTimeout(300);

    // fieldId is set on the inner <span>, so #qa-badge-variant IS the span
    const badge = page.locator('span#qa-badge-variant');
    await expect(badge).toBeVisible();
    const classes = await badge.getAttribute('class');
    console.log(`\n[P1-03] badge classes with variant=aegreen: "${classes}"`);
    expect(classes).toContain('badge-aegreen');
  });

  test('legacy color prop still applies correct color class (backward compat)', async ({ page }) => {
    await loadPage(page, '/docs/pages/aegov-badge.html');
    await page.waitForFunction(() => customElements.get('aegov-badge') !== undefined, { timeout: 15000 });

    await page.evaluate(() => {
      const el = document.createElement('aegov-badge') as any;
      el.setAttribute('field-id', 'qa-badge-color');
      el.setAttribute('color', 'aered');
      el.textContent = 'Error';
      document.body.appendChild(el);
    });
    await page.waitForTimeout(300);

    const badge = page.locator('span#qa-badge-color');
    await expect(badge).toBeVisible();
    const classes = await badge.getAttribute('class');
    console.log(`\n[P1-03] badge classes with color=aered (legacy): "${classes}"`);
    expect(classes).toContain('badge-aered');
  });

  test('color prop takes precedence over variant when both set (color ?? variant)', async ({ page }) => {
    await loadPage(page, '/docs/pages/aegov-badge.html');
    await page.waitForFunction(() => customElements.get('aegov-badge') !== undefined, { timeout: 15000 });

    await page.evaluate(() => {
      const el = document.createElement('aegov-badge') as any;
      el.setAttribute('field-id', 'qa-badge-both');
      el.setAttribute('color', 'aered');
      el.setAttribute('variant', 'techblue');
      el.textContent = 'Both';
      document.body.appendChild(el);
    });
    await page.waitForTimeout(300);

    const badge = page.locator('span#qa-badge-both');
    await expect(badge).toBeVisible();
    const classes = await badge.getAttribute('class');
    console.log(`\n[P1-03] both set — classes: "${classes}"`);
    // color (aered) takes precedence via `color ?? variant`
    expect(classes).toContain('badge-aered');
    expect(classes).not.toContain('badge-techblue');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// P1-04 — aegov-popover: closePopover() callable as @Method()
// ─────────────────────────────────────────────────────────────────────────────
test.describe('P1-04 — aegov-popover closePopover() @Method', () => {
  test('closePopover() exists and closes the popover programmatically', async ({ page }) => {
    await loadPage(page, '/docs/pages/aegov-popover.html');
    await page.waitForFunction(() => customElements.get('aegov-popover') !== undefined, { timeout: 15000 });

    await page.evaluate(() => {
      const wrap = document.createElement('div');
      wrap.id = 'qa-popover-wrap';
      wrap.innerHTML = `
        <aegov-popover field-id="qa-popover-1" trigger="click">
          <button>Open popover</button>
          <div slot="popover-content">Popover content here</div>
        </aegov-popover>
      `;
      document.body.appendChild(wrap);
    });
    await page.waitForTimeout(400);

    // Click trigger to open
    await page.locator('#qa-popover-wrap button').first().click();
    await page.waitForTimeout(400);

    // isOpen is @State — verify via aria-expanded on the inner trigger
    const ariaExpanded = await page.locator('#qa-popover-wrap button').first().getAttribute('aria-expanded');
    console.log(`\n[P1-04] aria-expanded after click: "${ariaExpanded}"`);
    expect(ariaExpanded).toBe('true');

    // Verify @Method exists and closes — query host by field-id attr, then await componentOnReady
    const methodExists = await page.evaluate(async () => {
      const el = document.querySelector('aegov-popover[field-id="qa-popover-1"]') as any;
      if (el?.componentOnReady) await el.componentOnReady();
      if (typeof el?.closePopover !== 'function') return false;
      await el.closePopover();
      return true;
    });
    await page.waitForTimeout(300);

    console.log(`\n[P1-04] closePopover() is @Method and callable: ${methodExists}`);
    expect(methodExists).toBe(true);

    // After close — aria-expanded should be false (or absent)
    const ariaExpandedAfter = await page.locator('#qa-popover-wrap button').first().getAttribute('aria-expanded');
    console.log(`[P1-04] aria-expanded after closePopover(): "${ariaExpandedAfter}"`);
    expect(ariaExpandedAfter).not.toBe('true');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// P1-05 — aegov-dropdown: closeDropdown() callable as @Method()
// ─────────────────────────────────────────────────────────────────────────────
test.describe('P1-05 — aegov-dropdown closeDropdown() @Method', () => {
  test('closeDropdown() exists and closes the dropdown programmatically', async ({ page }) => {
    await loadPage(page, '/docs/pages/aegov-dropdown.html');
    await page.waitForFunction(() => customElements.get('aegov-dropdown') !== undefined, { timeout: 15000 });

    await page.evaluate(() => {
      const wrap = document.createElement('div');
      wrap.id = 'qa-dropdown-wrap';
      wrap.innerHTML = `
        <aegov-dropdown field-id="qa-dropdown-1" trigger="click">
          <button>Open menu</button>
          <div slot="dropdown-content">
            <ul role="menu">
              <li role="menuitem">Item 1</li>
            </ul>
          </div>
        </aegov-dropdown>
      `;
      document.body.appendChild(wrap);
    });
    await page.waitForTimeout(400);

    // Open via click
    await page.locator('#qa-dropdown-wrap button').first().click();
    await page.waitForTimeout(400);

    // isOpen is @State — verify via aria-expanded on the inner focusable trigger
    const ariaExpanded = await page.locator('#qa-dropdown-wrap button').first().getAttribute('aria-expanded');
    console.log(`\n[P1-05] aria-expanded after click: "${ariaExpanded}"`);
    expect(ariaExpanded).toBe('true');

    // Close via @Method — query host by field-id attr, then await componentOnReady
    const methodExists = await page.evaluate(async () => {
      const el = document.querySelector('aegov-dropdown[field-id="qa-dropdown-1"]') as any;
      if (el?.componentOnReady) await el.componentOnReady();
      if (typeof el?.closeDropdown !== 'function') return false;
      await el.closeDropdown();
      return true;
    });
    await page.waitForTimeout(300);

    console.log(`\n[P1-05] closeDropdown() is @Method and callable: ${methodExists}`);
    expect(methodExists).toBe(true);

    const ariaExpandedAfter = await page.locator('#qa-dropdown-wrap button').first().getAttribute('aria-expanded');
    console.log(`[P1-05] aria-expanded after closeDropdown(): "${ariaExpandedAfter}"`);
    expect(ariaExpandedAfter).toBe('false');
  });
});
