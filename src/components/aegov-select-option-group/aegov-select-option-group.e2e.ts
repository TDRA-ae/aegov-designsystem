import { newE2EPage } from '@stencil/core/testing';

describe('aegov-select-option-group e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-select-option-group label="Fruits">
        <aegov-select-option value="apple">Apple</aegov-select-option>
      </aegov-select-option-group>
    `);
    const el = await page.find('aegov-select-option-group');
    expect(el).not.toBeNull();
  });

  it('has role="group" attribute', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-select-option-group label="Fruits"></aegov-select-option-group>');
    const el = await page.find('aegov-select-option-group');
    expect(el.getAttribute('role')).toBe('group');
  });

  it('has aria-label from label prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-select-option-group label="Colors"></aegov-select-option-group>');
    const el = await page.find('aegov-select-option-group');
    expect(el.getAttribute('aria-label')).toBe('Colors');
  });

  it('has data-group-label attribute', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-select-option-group label="Sizes"></aegov-select-option-group>');
    const el = await page.find('aegov-select-option-group');
    expect(el.getAttribute('data-group-label')).toBe('Sizes');
  });

  it('works with grouped options inside aegov-select', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-select placeholder="Choose">
        <aegov-select-option-group label="Fruits">
          <aegov-select-option value="apple">Apple</aegov-select-option>
          <aegov-select-option value="banana">Banana</aegov-select-option>
        </aegov-select-option-group>
        <aegov-select-option-group label="Vegetables">
          <aegov-select-option value="carrot">Carrot</aegov-select-option>
        </aegov-select-option-group>
      </aegov-select>
    `);

    // Verify the groups are present in DOM
    const groups = await page.findAll('aegov-select-option-group');
    expect(groups.length).toBe(2);
    expect(groups[0].getAttribute('label')).toBe('Fruits');
    expect(groups[1].getAttribute('label')).toBe('Vegetables');

    // Verify options within groups
    const options = await page.findAll('aegov-select-option');
    expect(options.length).toBe(3);
  });
});
