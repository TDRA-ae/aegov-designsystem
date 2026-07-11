import { newE2EPage } from '@stencil/core/testing';

describe('aegov-radio-group (e2e)', () => {
  it('renders fieldset with role="radiogroup" and legend', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio-group name="g" label="Pick"></aegov-radio-group>');
    const fieldset = await page.find('aegov-radio-group fieldset');
    expect(fieldset.getAttribute('role')).toBe('radiogroup');
    const legend = await page.find('aegov-radio-group legend');
    expect(legend.textContent).toContain('Pick');
  });

  it('disables all child radios when is-disabled is set', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="g" is-disabled="true">
        <aegov-radio label="A" value="a"></aegov-radio>
        <aegov-radio label="B" value="b"></aegov-radio>
      </aegov-radio-group>
    `);
    // The disabled state propagates via the native <fieldset disabled>;
    // descendant inputs match :disabled but do not reflect a JS-level
    // disabled property unless they have their own disabled attribute.
    const fieldset = await page.find('aegov-radio-group fieldset');
    expect(fieldset.getAttribute('disabled')).not.toBeNull();
    const allDisabled = await page.evaluate(() => {
      const inputs = document.querySelectorAll('aegov-radio-group aegov-radio input');
      return Array.from(inputs).every((i) => (i as HTMLInputElement).matches(':disabled'));
    });
    expect(allDisabled).toBe(true);
  });

  it('selecting one radio enforces single selection', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="g">
        <aegov-radio label="A" value="a"></aegov-radio>
        <aegov-radio label="B" value="b"></aegov-radio>
      </aegov-radio-group>
    `);
    const first = await page.find('aegov-radio[value="a"] input');
    await first.click();
    await page.waitForChanges();
    expect(await first.getProperty('checked')).toBe(true);

    const second = await page.find('aegov-radio[value="b"] input');
    await second.click();
    await page.waitForChanges();
    expect(await second.getProperty('checked')).toBe(true);
    expect(await first.getProperty('checked')).toBe(false);
  });

  it('emits aegovRadioGroupChange with the selected value', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="g">
        <aegov-radio label="A" value="a"></aegov-radio>
        <aegov-radio label="B" value="b"></aegov-radio>
      </aegov-radio-group>
    `);
    const group = await page.find('aegov-radio-group');
    const spy = await group.spyOnEvent('aegovRadioGroupChange');
    const input = await page.find('aegov-radio[value="b"] input');
    await input.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
    expect(spy.lastEvent.detail).toEqual({ value: 'b' });
  });

  it('propagates name to children', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="grp1">
        <aegov-radio label="A" value="a"></aegov-radio>
        <aegov-radio label="B" value="b"></aegov-radio>
      </aegov-radio-group>
    `);
    const inputs = await page.findAll('aegov-radio-group aegov-radio input');
    for (const i of inputs) {
      expect(await i.getProperty('name')).toBe('grp1');
    }
  });

  it('propagates size to children', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="g" size="sm">
        <aegov-radio label="A"></aegov-radio>
      </aegov-radio-group>
    `);
    const r = await page.find('aegov-radio-group aegov-radio div.aegov-radio');
    expect(r).toHaveClass('radio--sm');
  });
});
