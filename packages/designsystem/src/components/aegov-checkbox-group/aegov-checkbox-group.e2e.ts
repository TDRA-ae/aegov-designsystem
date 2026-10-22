import { newE2EPage } from '@stencil/core/testing';

describe('aegov-checkbox-group (e2e)', () => {
  it('renders fieldset and legend with label', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox-group label="Options"></aegov-checkbox-group>');
    const legend = await page.find('aegov-checkbox-group >>> legend');
    expect(legend).not.toBeNull();
    expect(legend.textContent).toContain('Options');
  });

  it('disables all child checkboxes when is-disabled is set', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group is-disabled="true">
        <aegov-checkbox label="A" value="a"></aegov-checkbox>
        <aegov-checkbox label="B" value="b"></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    // <fieldset disabled> propagates :disabled to descendants but does not
    // mirror to the input.disabled JS property — assert via :disabled match.
    const fieldset = await page.find('aegov-checkbox-group >>> fieldset');
    expect(fieldset.getAttribute('disabled')).not.toBeNull();
    const allDisabled = await page.evaluate(() => {
      const inputs = document.querySelectorAll('aegov-checkbox-group aegov-checkbox input');
      return Array.from(inputs).every((i) => (i as HTMLInputElement).matches(':disabled'));
    });
    expect(allDisabled).toBe(true);
  });

  it('check-all toggles all children', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group>
        <aegov-checkbox is-check-all label="All"></aegov-checkbox>
        <aegov-checkbox label="A" value="a"></aegov-checkbox>
        <aegov-checkbox label="B" value="b"></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    const allInput = await page.find('aegov-checkbox[is-check-all] >>> input');
    await allInput.click();
    await page.waitForChanges();
    const inputs = await page.findAll('aegov-checkbox:not([is-check-all]) >>> input');
    for (const i of inputs) {
      expect(await i.getProperty('checked')).toBe(true);
    }
  });

  it('emits aegovCheckboxGroupChange when a child changes', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group>
        <aegov-checkbox label="A" value="a"></aegov-checkbox>
        <aegov-checkbox label="B" value="b"></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    const group = await page.find('aegov-checkbox-group');
    const spy = await group.spyOnEvent('aegovCheckboxGroupChange');
    const firstInput = await page.find('aegov-checkbox[value="a"] >>> input');
    await firstInput.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
    expect(spy.lastEvent.detail).toEqual({ values: ['a'] });
  });

  it('check-all becomes indeterminate when some children are checked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group>
        <aegov-checkbox is-check-all label="All"></aegov-checkbox>
        <aegov-checkbox label="A" value="a"></aegov-checkbox>
        <aegov-checkbox label="B" value="b"></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    const firstInput = await page.find('aegov-checkbox[value="a"] >>> input');
    await firstInput.click();
    await page.waitForChanges();
    const allInput = await page.find('aegov-checkbox[is-check-all] >>> input');
    expect(await allInput.getProperty('indeterminate')).toBe(true);
    expect(await allInput.getProperty('checked')).toBe(false);
  });

  it('propagates size to children', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group size="lg">
        <aegov-checkbox label="A"></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    const cb = await page.find('aegov-checkbox-group aegov-checkbox >>> div.aegov-checkbox');
    expect(cb).toHaveClass('checkbox--lg');
  });

  // Regression coverage for #31. `variant` previously defaulted to 'primary',
  // the same string used for "explicitly chose primary" — so a child that
  // deliberately set variant="primary" was indistinguishable from one that
  // never touched it, and got silently overridden to match the group.
  it("does not override a child's explicit variant=\"primary\" (#31)", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group variant="secondary">
        <aegov-checkbox id="explicit-primary" variant="primary" value="a"></aegov-checkbox>
        <aegov-checkbox id="unset" value="b"></aegov-checkbox>
        <aegov-checkbox id="explicit-other" variant="neutral-max" value="c"></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    await page.waitForChanges();

    const explicitPrimary = await page.find('#explicit-primary');
    const unset = await page.find('#unset');
    const explicitOther = await page.find('#explicit-other');

    expect(await explicitPrimary.getProperty('variant')).toBe('primary');
    expect(await unset.getProperty('variant')).toBe('secondary');
    expect(await explicitOther.getProperty('variant')).toBe('neutral-max');
  });
});
