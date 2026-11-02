import { newE2EPage } from '@stencil/core/testing';

describe('aegov-radio-group (e2e)', () => {
  it('renders fieldset with role="radiogroup" and legend', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio-group name="g" label="Pick"></aegov-radio-group>');
    const fieldset = await page.find('aegov-radio-group >>> fieldset');
    expect(fieldset.getAttribute('role')).toBe('radiogroup');
    const legend = await page.find('aegov-radio-group >>> legend');
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
    const fieldset = await page.find('aegov-radio-group >>> fieldset');
    expect(fieldset.getAttribute('disabled')).not.toBeNull();
    const allDisabled = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('aegov-radio-group aegov-radio'))
        .map((r) => r.shadowRoot!.querySelector('input') as HTMLInputElement);
      return inputs.length > 0 && inputs.every((i) => i.matches(':disabled'));
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
    const first = await page.find('aegov-radio[value="a"] >>> input');
    await first.click();
    await page.waitForChanges();
    expect(await first.getProperty('checked')).toBe(true);

    const second = await page.find('aegov-radio[value="b"] >>> input');
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
    const input = await page.find('aegov-radio[value="b"] >>> input');
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
    // FACE owns submission: name lands on each child host, which ElementInternals submits.
    const radios = await page.findAll('aegov-radio-group aegov-radio');
    expect(radios.length).toBe(2);
    for (const r of radios) {
      expect(r.getAttribute('name')).toBe('grp1');
    }
    // The shadow-internal input also carries the name: without one the browser never
    // reports valueMissing, so a required radio could never be missing. Each input sits
    // in its own shadow root, so this joins no other radio and adds nothing to FormData.
    const inputs = await page.findAll('aegov-radio-group aegov-radio >>> input');
    expect(inputs.length).toBe(2);
    for (const i of inputs) {
      expect(i.getAttribute('name')).toBe('grp1');
    }
  });

  it('propagates size to children', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="g" size="sm">
        <aegov-radio label="A"></aegov-radio>
      </aegov-radio-group>
    `);
    const r = await page.find('aegov-radio-group aegov-radio >>> div.aegov-radio');
    expect(r).toHaveClass('radio--sm');
  });

  // Same sentinel-value bug as #31/#47/#49, fixed here too for consistency —
  // `variant` previously defaulted to 'primary', the same string used for
  // "explicitly chose primary", so a child that deliberately set
  // variant="primary" was indistinguishable from one that never touched it.
  it('does not override a child\'s explicit variant="primary"', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="g" variant="secondary">
        <aegov-radio id="explicit-primary" variant="primary" value="a"></aegov-radio>
        <aegov-radio id="unset" value="b"></aegov-radio>
      </aegov-radio-group>
    `);
    await page.waitForChanges();

    const explicitPrimary = await page.find('#explicit-primary');
    const unset = await page.find('#unset');

    expect(await explicitPrimary.getProperty('variant')).toBe('primary');
    expect(await unset.getProperty('variant')).toBe('secondary');
  });

  // Regression coverage for #62. The list-separator classes used to be
  // self-detected by aegov-radio reading the group's raw `appearance` DOM
  // attribute, which is never set when a consumer (e.g. the React wrapper)
  // assigns the prop only as a JS property.
  it('applies list separator classes when appearance="list" is set via JS property only, not a literal attribute', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="g">
        <aegov-radio label="A" value="a"></aegov-radio>
        <aegov-radio label="B" value="b"></aegov-radio>
      </aegov-radio-group>
    `);
    await page.evaluate(() => {
      const group = document.querySelector('aegov-radio-group') as HTMLAegovRadioGroupElement;
      (group as any).appearance = 'list';
    });
    await page.waitForChanges();

    const classes = await page.evaluate(() => {
      const radios = Array.from(document.querySelectorAll('aegov-radio-group aegov-radio'));
      return radios.map(r => ({
        inList: r.classList.contains('radio-in-list'),
        first: r.classList.contains('radio-list-first'),
        last: r.classList.contains('radio-list-last'),
      }));
    });
    expect(classes).toEqual([
      { inList: true, first: true, last: false },
      { inList: true, first: false, last: true },
    ]);
  });

  // Regression coverage for #61 — roving tabindex. Only the checked radio
  // (or the first, if none is checked) should ever be a real Tab stop; the
  // rest get tabindex="-1" on their native input so Tab/Shift+Tab skip
  // straight over them.
  it('makes only one radio a Tab stop at a time (roving tabindex)', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="g">
        <aegov-radio label="A" value="a"></aegov-radio>
        <aegov-radio label="B" value="b"></aegov-radio>
        <aegov-radio label="C" value="c"></aegov-radio>
      </aegov-radio-group>
    `);
    const tabIndexesBefore = await page.evaluate(() => Array.from(
      document.querySelectorAll('aegov-radio-group aegov-radio'),
      r => (r.shadowRoot!.querySelector('input[type="radio"]') as HTMLInputElement).tabIndex,
    ));
    expect(tabIndexesBefore).toEqual([0, -1, -1]);

    const second = await page.find('aegov-radio[value="b"] >>> input');
    await second.click();
    await page.waitForChanges();

    const tabIndexesAfter = await page.evaluate(() => Array.from(
      document.querySelectorAll('aegov-radio-group aegov-radio'),
      r => (r.shadowRoot!.querySelector('input[type="radio"]') as HTMLInputElement).tabIndex,
    ));
    expect(tabIndexesAfter).toEqual([-1, 0, -1]);
  });

  it('ArrowDown/ArrowRight move focus and selection to the next radio, wrapping at the end', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="g">
        <aegov-radio label="A" value="a"></aegov-radio>
        <aegov-radio label="B" value="b"></aegov-radio>
        <aegov-radio label="C" value="c"></aegov-radio>
      </aegov-radio-group>
    `);
    const first = await page.find('aegov-radio[value="a"] >>> input');
    await first.focus();
    await page.waitForChanges();

    await page.keyboard.press('ArrowDown');
    await page.waitForChanges();
    expect(await (await page.find('aegov-radio[value="b"] >>> input')).getProperty('checked')).toBe(true);

    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();
    expect(await (await page.find('aegov-radio[value="c"] >>> input')).getProperty('checked')).toBe(true);

    // Wraps back around to the first radio.
    await page.keyboard.press('ArrowDown');
    await page.waitForChanges();
    expect(await (await page.find('aegov-radio[value="a"] >>> input')).getProperty('checked')).toBe(true);
    expect(await (await page.find('aegov-radio[value="c"] >>> input')).getProperty('checked')).toBe(false);
  });

  it('ArrowUp/ArrowLeft move focus and selection to the previous radio, wrapping at the start', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="g">
        <aegov-radio label="A" value="a"></aegov-radio>
        <aegov-radio label="B" value="b"></aegov-radio>
      </aegov-radio-group>
    `);
    const first = await page.find('aegov-radio[value="a"] >>> input');
    await first.focus();
    await page.waitForChanges();

    // Wraps from the first radio to the last.
    await page.keyboard.press('ArrowUp');
    await page.waitForChanges();
    expect(await (await page.find('aegov-radio[value="b"] >>> input')).getProperty('checked')).toBe(true);

    await page.keyboard.press('ArrowLeft');
    await page.waitForChanges();
    expect(await (await page.find('aegov-radio[value="a"] >>> input')).getProperty('checked')).toBe(true);
  });

  it('arrow keys skip disabled radios', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="g">
        <aegov-radio label="A" value="a"></aegov-radio>
        <aegov-radio label="B" value="b" is-disabled="true"></aegov-radio>
        <aegov-radio label="C" value="c"></aegov-radio>
      </aegov-radio-group>
    `);
    const first = await page.find('aegov-radio[value="a"] >>> input');
    await first.focus();
    await page.waitForChanges();
    await page.keyboard.press('ArrowDown');
    await page.waitForChanges();
    expect(await (await page.find('aegov-radio[value="c"] >>> input')).getProperty('checked')).toBe(true);
  });

  it('arrow-key selection emits aegovRadioGroupChange, same as a click', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group name="g">
        <aegov-radio label="A" value="a"></aegov-radio>
        <aegov-radio label="B" value="b"></aegov-radio>
      </aegov-radio-group>
    `);
    const group = await page.find('aegov-radio-group');
    const spy = await group.spyOnEvent('aegovRadioGroupChange');
    const first = await page.find('aegov-radio[value="a"] >>> input');
    await first.focus();
    await page.waitForChanges();
    await page.keyboard.press('ArrowDown');
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
    expect(spy.lastEvent.detail).toEqual({ value: 'b' });
  });
});
