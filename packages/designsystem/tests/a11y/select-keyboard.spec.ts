/**
 * aegov-select — APG Combobox keyboard interaction & ARIA tests (listbox appearance)
 *
 * What these cover (not in existing tests):
 *   SEL-01: Trigger ARIA when closed: role=combobox, aria-expanded=false,
 *           aria-haspopup=listbox, aria-controls pointing at the listbox
 *   SEL-02: Opens on Enter key; aria-expanded becomes "true"
 *   SEL-03: Opens on Space key; aria-expanded becomes "true"
 *   SEL-04: Escape closes; focus returns to trigger; aria-expanded="false"
 *   SEL-05: ArrowDown opens closed select; focuses first option via aria-activedescendant
 *   SEL-06: ArrowDown/Up move the focused option sequentially
 *   SEL-07: Home/End jump to first/last enabled option
 *   SEL-08: Enter confirms focused option; closes listbox; trigger reflects selection
 *   SEL-09: Type-ahead single char navigates to first matching enabled option (wrapping)
 *   SEL-10: Type-ahead multi-char buffer accumulates within 500 ms
 *   SEL-11: Type-ahead skips options that carry is-disabled
 *   SEL-12: Multi-select: listbox has aria-multiselectable=true; Space toggles
 *           aria-selected without closing; trigger text updates
 *   SEL-13: Searchable: search input has role=combobox, aria-expanded=true,
 *           aria-haspopup=listbox, aria-controls pointing at the listbox
 *   SEL-14: Tab closes the listbox
 *
 * Already covered by other test files (not duplicated here):
 *   - Default (native <select>) appearance tests       → existing e2e / unit specs
 *   - Validation / error state ARIA                    → qa-fixes.spec.ts
 *   - Visual rendering / CSS                           → visual-audit.spec.ts
 */
import { test, expect, Page } from '@playwright/test';

const BASE = 'http://localhost:3333';

// ─── helpers ─────────────────────────────────────────────────────────────────

async function loadSelectFixture(page: Page, html: string) {
  await page.goto(`${BASE}/docs/pages/aegov-select.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(
    () => customElements.get('aegov-select') !== undefined,
    { timeout: 15000 }
  );
  await page.evaluate((markup) => {
    const fixture = document.createElement('div');
    fixture.id = 'select-fixture';
    fixture.style.cssText = 'padding: 40px; position: relative; z-index: 1;';
    fixture.innerHTML = markup;
    document.body.prepend(fixture);
  }, html);
  await page.waitForTimeout(400);
}

/** Focus the trigger button then press Enter to open. */
async function openViaKeyboard(page: Page, fieldId: string) {
  await page.locator(`aegov-select[field-id="${fieldId}"] button[role="combobox"]`).focus();
  await page.waitForTimeout(50);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(200);
}

const OPTION_ID = (fieldId: string, value: string) => `${fieldId}-listbox-opt-${value}`;

// ─── fixtures ────────────────────────────────────────────────────────────────

const BASIC_HTML = `
  <aegov-select field-id="qa-sel-basic" appearance="listbox" label="Fruit">
    <aegov-select-option value="apple">Apple</aegov-select-option>
    <aegov-select-option value="banana">Banana</aegov-select-option>
    <aegov-select-option value="cherry">Cherry</aegov-select-option>
    <aegov-select-option value="coconut">Coconut</aegov-select-option>
    <aegov-select-option value="elderberry">Elderberry</aegov-select-option>
  </aegov-select>
`;

const DISABLED_HTML = `
  <aegov-select field-id="qa-sel-disabled" appearance="listbox" label="Fruit">
    <aegov-select-option value="apple">Apple</aegov-select-option>
    <aegov-select-option value="banana">Banana</aegov-select-option>
    <aegov-select-option value="cherry">Cherry</aegov-select-option>
    <aegov-select-option value="date" is-disabled>Date</aegov-select-option>
    <aegov-select-option value="dragonfruit">Dragonfruit</aegov-select-option>
    <aegov-select-option value="elderberry">Elderberry</aegov-select-option>
  </aegov-select>
`;

const MULTI_HTML = `
  <aegov-select field-id="qa-sel-multi" appearance="listbox" is-multiple label="Tags">
    <aegov-select-option value="alpha">Alpha</aegov-select-option>
    <aegov-select-option value="beta">Beta</aegov-select-option>
    <aegov-select-option value="gamma">Gamma</aegov-select-option>
  </aegov-select>
`;

const SEARCH_HTML = `
  <aegov-select field-id="qa-sel-search" appearance="listbox" is-searchable label="Ministry">
    <aegov-select-option value="moi">Ministry of Interior</aegov-select-option>
    <aegov-select-option value="mof">Ministry of Finance</aegov-select-option>
    <aegov-select-option value="moh">Ministry of Health</aegov-select-option>
  </aegov-select>
`;

// ─── tests ───────────────────────────────────────────────────────────────────

test('SEL-01: trigger has correct ARIA attributes when closed', async ({ page }) => {
  await loadSelectFixture(page, BASIC_HTML);

  const trigger = page.locator('aegov-select[field-id="qa-sel-basic"] button[role="combobox"]');
  await expect(trigger).toHaveAttribute('role', 'combobox');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');

  // aria-controls must reference the listbox ID even when closed
  await expect(trigger).toHaveAttribute('aria-controls', 'qa-sel-basic-listbox');
});

test('SEL-02: Enter key opens listbox; aria-expanded becomes "true"', async ({ page }) => {
  await loadSelectFixture(page, BASIC_HTML);

  await page.locator('aegov-select[field-id="qa-sel-basic"] button[role="combobox"]').focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(200);

  const trigger = page.locator('aegov-select[field-id="qa-sel-basic"] button[role="combobox"]');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#qa-sel-basic-listbox')).toBeVisible();
});

test('SEL-03: Space key opens listbox; aria-expanded becomes "true"', async ({ page }) => {
  await loadSelectFixture(page, BASIC_HTML);

  await page.locator('aegov-select[field-id="qa-sel-basic"] button[role="combobox"]').focus();
  await page.keyboard.press(' ');
  await page.waitForTimeout(200);

  await expect(
    page.locator('aegov-select[field-id="qa-sel-basic"] button[role="combobox"]')
  ).toHaveAttribute('aria-expanded', 'true');
});

test('SEL-04: Escape closes listbox; focus returns to trigger', async ({ page }) => {
  await loadSelectFixture(page, BASIC_HTML);
  await openViaKeyboard(page, 'qa-sel-basic');

  await page.keyboard.press('Escape');
  await page.waitForTimeout(100);

  const trigger = page.locator('aegov-select[field-id="qa-sel-basic"] button[role="combobox"]');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toBeFocused();
});

test('SEL-05: ArrowDown on closed select opens it and points aria-activedescendant at first option', async ({ page }) => {
  await loadSelectFixture(page, BASIC_HTML);

  await page.locator('aegov-select[field-id="qa-sel-basic"] button[role="combobox"]').focus();
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(200);

  const trigger = page.locator('aegov-select[field-id="qa-sel-basic"] button[role="combobox"]');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');

  const activedescendant = await trigger.getAttribute('aria-activedescendant');
  expect(activedescendant).toBe(OPTION_ID('qa-sel-basic', 'apple'));

  const firstOption = page.locator(`#${OPTION_ID('qa-sel-basic', 'apple')}`);
  await expect(firstOption).toHaveClass(/select__option--focused/);
});

test('SEL-06: ArrowDown/Up move the focused option sequentially', async ({ page }) => {
  await loadSelectFixture(page, BASIC_HTML);
  await openViaKeyboard(page, 'qa-sel-basic');

  const trigger = page.locator('aegov-select[field-id="qa-sel-basic"] button[role="combobox"]');

  // Start: Apple (index 0) is focused on open
  await expect(trigger).toHaveAttribute('aria-activedescendant', OPTION_ID('qa-sel-basic', 'apple'));

  // ArrowDown → Banana
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(50);
  await expect(trigger).toHaveAttribute('aria-activedescendant', OPTION_ID('qa-sel-basic', 'banana'));

  // ArrowDown → Cherry
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(50);
  await expect(trigger).toHaveAttribute('aria-activedescendant', OPTION_ID('qa-sel-basic', 'cherry'));

  // ArrowUp → back to Banana
  await page.keyboard.press('ArrowUp');
  await page.waitForTimeout(50);
  await expect(trigger).toHaveAttribute('aria-activedescendant', OPTION_ID('qa-sel-basic', 'banana'));
});

test('SEL-07: Home/End jump to first and last option', async ({ page }) => {
  await loadSelectFixture(page, BASIC_HTML);
  await openViaKeyboard(page, 'qa-sel-basic');

  const trigger = page.locator('aegov-select[field-id="qa-sel-basic"] button[role="combobox"]');

  // Navigate to middle then press End → last option (Elderberry)
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(50);

  await page.keyboard.press('End');
  await page.waitForTimeout(50);
  await expect(trigger).toHaveAttribute('aria-activedescendant', OPTION_ID('qa-sel-basic', 'elderberry'));

  // Home → first option (Apple)
  await page.keyboard.press('Home');
  await page.waitForTimeout(50);
  await expect(trigger).toHaveAttribute('aria-activedescendant', OPTION_ID('qa-sel-basic', 'apple'));
});

test('SEL-08: Enter confirms selection and closes the listbox', async ({ page }) => {
  await loadSelectFixture(page, BASIC_HTML);
  await openViaKeyboard(page, 'qa-sel-basic');

  // Navigate to Banana (ArrowDown once from Apple)
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(50);

  await page.keyboard.press('Enter');
  await page.waitForTimeout(200);

  const trigger = page.locator('aegov-select[field-id="qa-sel-basic"] button[role="combobox"]');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  // Trigger text should reflect the selection
  await expect(trigger).toContainText('Banana');
});

test('SEL-09: type-ahead single char jumps to first matching option (wrapping search)', async ({ page }) => {
  await loadSelectFixture(page, BASIC_HTML);
  await openViaKeyboard(page, 'qa-sel-basic');

  // Focused on Apple (index 0). Press "b" → should land on Banana (index 1).
  await page.keyboard.press('b');
  await page.waitForTimeout(100);

  const trigger = page.locator('aegov-select[field-id="qa-sel-basic"] button[role="combobox"]');
  await expect(trigger).toHaveAttribute('aria-activedescendant', OPTION_ID('qa-sel-basic', 'banana'));
});

test('SEL-10: type-ahead multi-char accumulates within 500 ms', async ({ page }) => {
  await loadSelectFixture(page, BASIC_HTML);
  await openViaKeyboard(page, 'qa-sel-basic');

  // Options with two "c" entries: Cherry (idx 2) and Coconut (idx 3).
  // Press "c" → Cherry; then "o" within 500 ms → buffer="co" → Coconut.
  await page.keyboard.press('c');
  await page.waitForTimeout(80);
  await page.keyboard.press('o');
  await page.waitForTimeout(100);

  const trigger = page.locator('aegov-select[field-id="qa-sel-basic"] button[role="combobox"]');
  await expect(trigger).toHaveAttribute('aria-activedescendant', OPTION_ID('qa-sel-basic', 'coconut'));
});

test('SEL-11: type-ahead skips options with is-disabled', async ({ page }) => {
  await loadSelectFixture(page, DISABLED_HTML);
  await openViaKeyboard(page, 'qa-sel-disabled');

  // Enabled options: Apple(0), Banana(1), Cherry(2), Dragonfruit(3), Elderberry(4)
  // Date is disabled and excluded. Press "d" → should land on Dragonfruit (not Date).
  await page.keyboard.press('d');
  await page.waitForTimeout(100);

  const trigger = page.locator('aegov-select[field-id="qa-sel-disabled"] button[role="combobox"]');
  const activedescendant = await trigger.getAttribute('aria-activedescendant');
  expect(activedescendant).toBe(OPTION_ID('qa-sel-disabled', 'dragonfruit'));
  expect(activedescendant).not.toBe(OPTION_ID('qa-sel-disabled', 'date'));
});

test('SEL-12: multi-select listbox has aria-multiselectable; Space toggles aria-selected', async ({ page }) => {
  await loadSelectFixture(page, MULTI_HTML);
  await openViaKeyboard(page, 'qa-sel-multi');

  const listbox = page.locator('#qa-sel-multi-listbox');
  await expect(listbox).toHaveAttribute('aria-multiselectable', 'true');

  // Opened: Alpha (index 0) is focused. Press Space to select it.
  await page.keyboard.press(' ');
  await page.waitForTimeout(100);

  // Multi-select: listbox stays open
  const trigger = page.locator('aegov-select[field-id="qa-sel-multi"] button[role="combobox"]');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');

  // Alpha option should now have aria-selected=true
  const alphaOption = page.locator(`#${OPTION_ID('qa-sel-multi', 'alpha')}`);
  await expect(alphaOption).toHaveAttribute('aria-selected', 'true');

  // Press Space again to deselect
  await page.keyboard.press(' ');
  await page.waitForTimeout(100);
  await expect(alphaOption).toHaveAttribute('aria-selected', 'false');
});

test('SEL-13: searchable mode — search input has combobox ARIA', async ({ page }) => {
  await loadSelectFixture(page, SEARCH_HTML);
  await openViaKeyboard(page, 'qa-sel-search');

  // openDropdown focuses search input via rAF
  const searchInput = page.locator('aegov-select[field-id="qa-sel-search"] input[role="combobox"]');
  await expect(searchInput).toBeVisible();
  await expect(searchInput).toHaveAttribute('role', 'combobox');
  await expect(searchInput).toHaveAttribute('aria-expanded', 'true');
  await expect(searchInput).toHaveAttribute('aria-haspopup', 'listbox');
  await expect(searchInput).toHaveAttribute('aria-controls', 'qa-sel-search-listbox');
});

test('SEL-14: Tab closes the listbox', async ({ page }) => {
  await loadSelectFixture(page, BASIC_HTML);
  await openViaKeyboard(page, 'qa-sel-basic');

  await page.keyboard.press('Tab');
  await page.waitForTimeout(100);

  await expect(
    page.locator('aegov-select[field-id="qa-sel-basic"] button[role="combobox"]')
  ).toHaveAttribute('aria-expanded', 'false');
});
