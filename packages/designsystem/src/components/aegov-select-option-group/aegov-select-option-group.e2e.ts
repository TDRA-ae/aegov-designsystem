import { newE2EPage } from '@stencil/core/testing';

describe('aegov-select-option-group (e2e)', () => {
  it('renders with role=group and aria-label from label prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-select-option-group label="Fruit"></aegov-select-option-group>`);
    const el = await page.find('aegov-select-option-group');
    expect(el).toEqualAttribute('role', 'group');
    expect(el).toEqualAttribute('aria-label', 'Fruit');
    expect(el).toEqualAttribute('data-group-label', 'Fruit');
  });

  it('renders slotted aegov-select-option children', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-select-option-group label="Fruit">
        <aegov-select-option value="a">Apple</aegov-select-option>
      </aegov-select-option-group>
    `);
    const child = await page.find('aegov-select-option-group aegov-select-option');
    expect(child).not.toBeNull();
    expect(await child.getProperty('textContent')).toBe('Apple');
  });

  it('updates aria-label when label prop changes', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-select-option-group label="Fruit"></aegov-select-option-group>`);
    const el = await page.find('aegov-select-option-group');
    el.setProperty('label', 'Vegetables');
    await page.waitForChanges();
    expect(el).toEqualAttribute('aria-label', 'Vegetables');
  });
});
