import { newE2EPage } from '@stencil/core/testing';

describe('aegov-radio (e2e)', () => {
  it('renders the native radio input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio label="A"></aegov-radio>');
    const input = await page.find('aegov-radio >>> input');
    expect(input).not.toBeNull();
    expect(await input.getProperty('type')).toBe('radio');
  });

  it('reflects is-checked to native checked', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio is-checked></aegov-radio>');
    const input = await page.find('aegov-radio >>> input');
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('clicking the label selects the radio', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio label="Pick me"></aegov-radio>');
    const labelText = await page.find('aegov-radio >>> .radio__label-text');
    await labelText.click();
    await page.waitForChanges();
    const input = await page.find('aegov-radio >>> input');
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('emits aegovRadioChange when toggled', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio value="v1" label="L"></aegov-radio>');
    const host = await page.find('aegov-radio');
    const spy = await host.spyOnEvent('aegovRadioChange');
    const input = await page.find('aegov-radio >>> input');
    await input.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
    expect(spy.lastEvent.detail).toEqual({ checked: true, value: 'v1' });
  });

  it('Space key selects the radio when focused', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio label="P"></aegov-radio>');
    const input = await page.find('aegov-radio >>> input');
    await input.focus();
    await page.keyboard.press('Space');
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('disabled radio does not toggle on click', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio is-disabled label="X"></aegov-radio>');
    const input = await page.find('aegov-radio >>> input');
    await input.click();
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(false);
    expect(await input.getProperty('disabled')).toBe(true);
  });

  it('forwards aria and data attributes to the input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio aria-label="opt" data-id="1"></aegov-radio>');
    const input = await page.find('aegov-radio >>> input');
    expect(input.getAttribute('aria-label')).toBe('opt');
    expect(input.getAttribute('data-id')).toBe('1');
  });

  // Disabled dimming is per item (#68 + follow-up) — see aegov-checkbox.e2e.ts.
  const effectiveOpacity = (page: any, id: string, selector: string) => page.evaluate((id: string, selector: string) => {
    let node: any = (document.getElementById(id) as any).shadowRoot.querySelector(selector);
    let o = 1;
    while (node) {
      if (node.nodeType === 1) o *= parseFloat(getComputedStyle(node).opacity);
      node = node.assignedSlot || node.parentNode || node.host;
    }
    return Math.round(o * 100) / 100;
  }, id, selector);

  it('a disabled group dims each item once (0.4, not 0.16) in every appearance (#68)', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group id="g-default" label="Default" is-disabled="true" name="g1">
        <aegov-radio id="grouped-default" label="Default" is-checked="true" value="a"></aegov-radio>
      </aegov-radio-group>
      <aegov-radio-group is-disabled="true" appearance="list" name="g2">
        <aegov-radio id="grouped-list" label="List" is-checked="true" value="a"></aegov-radio>
      </aegov-radio-group>
      <aegov-radio-group is-disabled="true" appearance="pills" name="g3">
        <aegov-radio id="grouped-pills" label="Pills" is-checked="true" value="a"></aegov-radio>
      </aegov-radio-group>
      <aegov-radio-group is-disabled="true" appearance="cards" name="g5">
        <aegov-radio id="grouped-cards" label="Cards" is-checked="true" value="a"></aegov-radio>
      </aegov-radio-group>
      <aegov-radio id="standalone" label="Standalone" is-checked="true" is-disabled="true" value="a" name="g4"></aegov-radio>
    `);
    await page.waitForChanges();

    for (const id of ['grouped-default', 'grouped-list', 'grouped-pills', 'grouped-cards', 'standalone']) {
      expect([id, await effectiveOpacity(page, id, '.radio__wrapper')]).toEqual([id, 0.4]);
    }
    expect(await effectiveOpacity(page, 'g-default', '.radio-group__legend')).toBe(0.4);
    // In a list the separator (a border on .aegov-radio) dims with the item.
    expect(await effectiveOpacity(page, 'grouped-list', '.aegov-radio')).toBe(0.4);
  });

  it('a single disabled item in an enabled group is dimmed; its siblings are not', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group label="Default" name="g1">
        <aegov-radio id="on" label="On" value="a"></aegov-radio>
        <aegov-radio id="off" label="Off" value="b" is-disabled="true"></aegov-radio>
      </aegov-radio-group>
    `);
    await page.waitForChanges();
    expect(await effectiveOpacity(page, 'on', '.radio__wrapper')).toBe(1);
    expect(await effectiveOpacity(page, 'off', '.radio__wrapper')).toBe(0.4);
  });

  it('a disabled radio without a label is dimmed', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio id="bare" aria-label="Bare" value="a" is-disabled="true"></aegov-radio>');
    await page.waitForChanges();
    expect(await effectiveOpacity(page, 'bare', 'input')).toBe(0.4);
  });

  it('a checked neutral-max card keeps its checked border on hover', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-radio-group appearance="cards" variant="neutral-max" name="g">
        <aegov-radio id="r" label="Card" value="a" is-checked="true"></aegov-radio>
      </aegov-radio-group>
    `);
    await page.waitForChanges();
    const border = () => page.$eval('#r', (el: any) => getComputedStyle(el.shadowRoot.querySelector('.radio__wrapper')).borderTopColor);
    const rest = await border();
    const wrapper = await page.find('aegov-radio >>> .radio__wrapper');
    await wrapper.hover();
    await page.waitForChanges();
    expect(await border()).toBe(rest);
  });
});
