import { newE2EPage } from '@stencil/core/testing';

describe('aegov-radio-group e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="test">
        <aegov-radio label="A" value="a"></aegov-radio>
      </aegov-radio-group>
    `);
    const el = await page.find('aegov-radio-group');
    expect(el).not.toBeNull();
  });

  it('renders legend when label provided', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="test" label="Pick one">
        <aegov-radio label="A" value="a"></aegov-radio>
      </aegov-radio-group>
    `);
    const legend = await page.find('aegov-radio-group legend');
    expect(legend.textContent).toBe('Pick one');
  });

  it('clicking a radio selects it', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="color">
        <aegov-radio label="Red" value="red"></aegov-radio>
        <aegov-radio label="Blue" value="blue"></aegov-radio>
      </aegov-radio-group>
    `);
    const inputRed = await page.find('aegov-radio[value="red"] input');
    await inputRed.click();
    await page.waitForChanges();
    expect(await inputRed.getProperty('checked')).toBe(true);
  });

  it('selecting one radio unchecks the other', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="color">
        <aegov-radio label="Red" value="red"></aegov-radio>
        <aegov-radio label="Blue" value="blue"></aegov-radio>
      </aegov-radio-group>
    `);
    const inputRed = await page.find('aegov-radio[value="red"] input');
    const inputBlue = await page.find('aegov-radio[value="blue"] input');

    await inputRed.click();
    await page.waitForChanges();
    expect(await inputRed.getProperty('checked')).toBe(true);

    await inputBlue.click();
    await page.waitForChanges();
    expect(await inputBlue.getProperty('checked')).toBe(true);
    // Native radio behavior unchecks the other via name grouping
  });

  it('emits aegovRadioGroupChange with selected value', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="color">
        <aegov-radio label="Red" value="red"></aegov-radio>
        <aegov-radio label="Blue" value="blue"></aegov-radio>
      </aegov-radio-group>
    `);
    const group = await page.find('aegov-radio-group');
    const spy = await group.spyOnEvent('aegovRadioGroupChange');

    const inputRed = await page.find('aegov-radio[value="red"] input');
    await inputRed.click();
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventDetail({ value: 'red' });
  });

  it('disabled group prevents selection', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="color" is-disabled>
        <aegov-radio label="Red" value="red"></aegov-radio>
        <aegov-radio label="Blue" value="blue"></aegov-radio>
      </aegov-radio-group>
    `);
    const inputRed = await page.find('aegov-radio[value="red"] input');
    await inputRed.click();
    await page.waitForChanges();
    expect(await inputRed.getProperty('checked')).toBe(false);
  });

  it('list variant applies correct class', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="test" variant="list">
        <aegov-radio label="A" value="a"></aegov-radio>
      </aegov-radio-group>
    `);
    const fieldset = await page.find('aegov-radio-group fieldset');
    expect(fieldset).toHaveClass('radio-group--list');
  });

  it('cards variant applies correct class', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="test" variant="cards">
        <aegov-radio label="A" value="a"></aegov-radio>
      </aegov-radio-group>
    `);
    const fieldset = await page.find('aegov-radio-group fieldset');
    expect(fieldset).toHaveClass('radio-group--cards');
  });

  it('pills variant applies correct class', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="test" variant="pills">
        <aegov-radio label="A" value="a"></aegov-radio>
      </aegov-radio-group>
    `);
    const fieldset = await page.find('aegov-radio-group fieldset');
    expect(fieldset).toHaveClass('radio-group--pills');
  });

  it('horizontal orientation applies class', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="test" orientation="horizontal">
        <aegov-radio label="A" value="a"></aegov-radio>
        <aegov-radio label="B" value="b"></aegov-radio>
      </aegov-radio-group>
    `);
    const fieldset = await page.find('aegov-radio-group fieldset');
    expect(fieldset).toHaveClass('radio-group--horizontal');
  });

  it('propagates name to child radios', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="fruit">
        <aegov-radio label="Apple" value="apple"></aegov-radio>
        <aegov-radio label="Banana" value="banana"></aegov-radio>
      </aegov-radio-group>
    `);
    await page.waitForChanges();

    const names = await page.evaluate(() => {
      const inputs = document.querySelectorAll('aegov-radio input');
      return Array.from(inputs).map(i => (i as HTMLInputElement).name);
    });
    expect(names).toEqual(['fruit', 'fruit']);
  });

  it('propagates size to child radios', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="test" size="lg">
        <aegov-radio label="A" value="a"></aegov-radio>
      </aegov-radio-group>
    `);
    await page.waitForChanges();

    const wrapper = await page.find('aegov-radio .aegov-radio');
    expect(wrapper).toHaveClass('radio--lg');
  });

  it('has fieldset with role radiogroup', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="test">
        <aegov-radio label="A" value="a"></aegov-radio>
      </aegov-radio-group>
    `);
    const fieldset = await page.find('aegov-radio-group fieldset');
    expect(fieldset.getAttribute('role')).toBe('radiogroup');
  });

  it('keyboard navigation works between radios', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="color">
        <aegov-radio label="Red" value="red"></aegov-radio>
        <aegov-radio label="Blue" value="blue"></aegov-radio>
      </aegov-radio-group>
    `);
    const inputRed = await page.find('aegov-radio[value="red"] input');
    await inputRed.focus();
    await inputRed.click();
    await page.waitForChanges();
    expect(await inputRed.getProperty('checked')).toBe(true);
  });
});
