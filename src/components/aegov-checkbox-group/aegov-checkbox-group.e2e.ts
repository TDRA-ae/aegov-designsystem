import { newE2EPage } from '@stencil/core/testing';

describe('aegov-checkbox-group e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group>
        <aegov-checkbox label="A" value="a"></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    const el = await page.find('aegov-checkbox-group');
    expect(el).not.toBeNull();
  });

  it('renders legend when label provided', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group label="Pick options">
        <aegov-checkbox label="A" value="a"></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    const legend = await page.find('aegov-checkbox-group legend');
    expect(legend.textContent).toBe('Pick options');
  });

  it('check-all checks all checkboxes', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group>
        <aegov-checkbox check-all label="Select All"></aegov-checkbox>
        <aegov-checkbox label="A" value="a"></aegov-checkbox>
        <aegov-checkbox label="B" value="b"></aegov-checkbox>
        <aegov-checkbox label="C" value="c"></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    const checkAllInput = await page.find('aegov-checkbox[check-all] input');
    await checkAllInput.click();
    await page.waitForChanges();

    const inputA = await page.find('aegov-checkbox[value="a"] input');
    const inputB = await page.find('aegov-checkbox[value="b"] input');
    const inputC = await page.find('aegov-checkbox[value="c"] input');
    expect(await inputA.getProperty('checked')).toBe(true);
    expect(await inputB.getProperty('checked')).toBe(true);
    expect(await inputC.getProperty('checked')).toBe(true);
  });

  it('check-all unchecks all checkboxes', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group>
        <aegov-checkbox check-all label="Select All"></aegov-checkbox>
        <aegov-checkbox label="A" value="a" checked></aegov-checkbox>
        <aegov-checkbox label="B" value="b" checked></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    // First click sets check-all to checked (since all are checked, it toggles to uncheck)
    const checkAllInput = await page.find('aegov-checkbox[check-all] input');
    // All are already checked, check-all should be auto-checked after load
    await page.waitForChanges();
    // Now click to uncheck
    await checkAllInput.click();
    await page.waitForChanges();

    const inputA = await page.find('aegov-checkbox[value="a"] input');
    const inputB = await page.find('aegov-checkbox[value="b"] input');
    expect(await inputA.getProperty('checked')).toBe(false);
    expect(await inputB.getProperty('checked')).toBe(false);
  });

  it('partial selection sets check-all to indeterminate', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group>
        <aegov-checkbox check-all label="Select All"></aegov-checkbox>
        <aegov-checkbox label="A" value="a"></aegov-checkbox>
        <aegov-checkbox label="B" value="b"></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    const inputA = await page.find('aegov-checkbox[value="a"] input');
    await inputA.click();
    await page.waitForChanges();

    const checkAllInput = await page.find('aegov-checkbox[check-all] input');
    const isIndeterminate = await checkAllInput.getProperty('indeterminate');
    expect(isIndeterminate).toBe(true);
  });

  it('emits aegovCheckboxGroupChange with checked values', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group>
        <aegov-checkbox label="A" value="a"></aegov-checkbox>
        <aegov-checkbox label="B" value="b"></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    const group = await page.find('aegov-checkbox-group');
    const spy = await group.spyOnEvent('aegovCheckboxGroupChange');

    const inputA = await page.find('aegov-checkbox[value="a"] input');
    await inputA.click();
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventDetail({ values: ['a'] });
  });

  it('cards variant: clicking card toggles checkbox', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group variant="cards">
        <aegov-checkbox label="Card A" value="a"></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    const card = await page.find('.checkbox-group--cards .checkbox__wrapper');
    await card.click();
    await page.waitForChanges();

    const input = await page.find('aegov-checkbox[value="a"] input');
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('pills variant: clicking pill toggles checkbox', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group variant="pills">
        <aegov-checkbox label="Pill A" value="a"></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    const pill = await page.find('.checkbox-group--pills .checkbox__wrapper');
    await pill.click();
    await page.waitForChanges();

    const input = await page.find('aegov-checkbox[value="a"] input');
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('pills variant: checkbox input is visually hidden', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group variant="pills">
        <aegov-checkbox label="Pill A" value="a"></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    const input = await page.find('.checkbox-group--pills aegov-checkbox input');
    const styles = await input.getComputedStyle();
    // sr-only sets position: absolute and clips to 1px
    expect(styles.position).toBe('absolute');
  });

  it('disabled group disables all checkboxes', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group disabled>
        <aegov-checkbox label="A" value="a"></aegov-checkbox>
        <aegov-checkbox label="B" value="b"></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    const inputA = await page.find('aegov-checkbox[value="a"] input');
    await inputA.click();
    await page.waitForChanges();
    expect(await inputA.getProperty('checked')).toBe(false);
  });

  it('list variant renders with group class', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group variant="list">
        <aegov-checkbox label="A" value="a"></aegov-checkbox>
        <aegov-checkbox label="B" value="b"></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    const fieldset = await page.find('aegov-checkbox-group fieldset');
    expect(fieldset).toHaveClass('checkbox-group--list');
  });

  it('horizontal orientation applies class', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group orientation="horizontal">
        <aegov-checkbox label="A" value="a"></aegov-checkbox>
        <aegov-checkbox label="B" value="b"></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    const fieldset = await page.find('aegov-checkbox-group fieldset');
    expect(fieldset).toHaveClass('checkbox-group--horizontal');
  });

  it('check-all skips disabled individual checkboxes', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group>
        <aegov-checkbox check-all label="Select All"></aegov-checkbox>
        <aegov-checkbox label="A" value="a"></aegov-checkbox>
        <aegov-checkbox label="B" value="b" disabled></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    const checkAllInput = await page.find('aegov-checkbox[check-all] input');
    await checkAllInput.click();
    await page.waitForChanges();

    const inputA = await page.find('aegov-checkbox[value="a"] input');
    const inputB = await page.find('aegov-checkbox[value="b"] input');
    expect(await inputA.getProperty('checked')).toBe(true);
    expect(await inputB.getProperty('checked')).toBe(false);
  });

  it('checking all items individually sets check-all to checked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group>
        <aegov-checkbox check-all label="Select All"></aegov-checkbox>
        <aegov-checkbox label="A" value="a"></aegov-checkbox>
        <aegov-checkbox label="B" value="b"></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    const inputA = await page.find('aegov-checkbox[value="a"] input');
    const inputB = await page.find('aegov-checkbox[value="b"] input');

    await inputA.click();
    await page.waitForChanges();
    await inputB.click();
    await page.waitForChanges();

    const checkAllInput = await page.find('aegov-checkbox[check-all] input');
    expect(await checkAllInput.getProperty('checked')).toBe(true);
    expect(await checkAllInput.getProperty('indeterminate')).toBe(false);
  });

  it('group change event has correct values after multiple changes', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group>
        <aegov-checkbox label="A" value="a"></aegov-checkbox>
        <aegov-checkbox label="B" value="b"></aegov-checkbox>
        <aegov-checkbox label="C" value="c"></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    const group = await page.find('aegov-checkbox-group');
    const spy = await group.spyOnEvent('aegovCheckboxGroupChange');

    const inputA = await page.find('aegov-checkbox[value="a"] input');
    const inputC = await page.find('aegov-checkbox[value="c"] input');
    await inputA.click();
    await page.waitForChanges();
    await inputC.click();
    await page.waitForChanges();

    // Last event should have both a and c
    const lastEvent = spy.lastEvent;
    expect(lastEvent.detail.values).toEqual(['a', 'c']);
  });
});
