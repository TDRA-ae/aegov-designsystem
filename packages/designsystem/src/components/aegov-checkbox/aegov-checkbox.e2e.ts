import { newE2EPage } from '@stencil/core/testing';

describe('aegov-checkbox (e2e)', () => {
  it('renders the native checkbox input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox label="Accept"></aegov-checkbox>');
    const input = await page.find('aegov-checkbox >>> input');
    expect(input).not.toBeNull();
    expect(await input.getProperty('type')).toBe('checkbox');
  });

  it('reflects is-checked to native checked', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox is-checked></aegov-checkbox>');
    const input = await page.find('aegov-checkbox >>> input');
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('clicking the label toggles the checkbox', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox label="Toggle me"></aegov-checkbox>');
    const labelText = await page.find('aegov-checkbox >>> .checkbox__label-text');
    await labelText.click();
    await page.waitForChanges();
    const input = await page.find('aegov-checkbox >>> input');
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('emits aegovCheckboxChange when toggled', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox value="v1" label="L"></aegov-checkbox>');
    const host = await page.find('aegov-checkbox');
    const spy = await host.spyOnEvent('aegovCheckboxChange');
    const input = await page.find('aegov-checkbox >>> input');
    await input.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
    expect(spy.lastEvent.detail).toEqual({ checked: true, value: 'v1' });
  });

  it('Space key toggles the checkbox when input is focused', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox label="Press"></aegov-checkbox>');
    const input = await page.find('aegov-checkbox >>> input');
    await input.focus();
    await page.keyboard.press('Space');
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('disabled checkbox does not toggle on click', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox is-disabled label="Off"></aegov-checkbox>');
    const input = await page.find('aegov-checkbox >>> input');
    await input.click();
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(false);
    expect(await input.getProperty('disabled')).toBe(true);
  });

  it('reflects fieldId on the native input id', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox field-id="my-cb" label="X"></aegov-checkbox>');
    const input = await page.find('aegov-checkbox >>> input');
    expect(input.id).toBe('my-cb');
  });

  it('forwards aria and data attributes to the input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox aria-label="agree" data-id="1"></aegov-checkbox>');
    const input = await page.find('aegov-checkbox >>> input');
    expect(input.getAttribute('aria-label')).toBe('agree');
    expect(input.getAttribute('data-id')).toBe('1');
  });

  // Disabled dimming is per item (#68 + follow-up). Measured as the opacity
  // the user actually sees: the product of opacities up the flat tree (slots
  // and shadow hosts included), so a group dimming its container AND the item
  // dimming itself would show up as 0.16.
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
      <aegov-checkbox-group id="g-default" label="Default" is-disabled="true">
        <aegov-checkbox id="grouped-default" label="Default" is-checked="true"></aegov-checkbox>
      </aegov-checkbox-group>
      <aegov-checkbox-group is-disabled="true" appearance="list">
        <aegov-checkbox id="grouped-list" label="List" is-checked="true"></aegov-checkbox>
      </aegov-checkbox-group>
      <aegov-checkbox-group is-disabled="true" appearance="pills">
        <aegov-checkbox id="grouped-pills" label="Pills" is-checked="true"></aegov-checkbox>
      </aegov-checkbox-group>
      <aegov-checkbox-group is-disabled="true" appearance="cards">
        <aegov-checkbox id="grouped-cards" label="Cards" is-checked="true"></aegov-checkbox>
      </aegov-checkbox-group>
      <aegov-checkbox id="standalone" label="Standalone" is-checked="true" is-disabled="true"></aegov-checkbox>
    `);
    await page.waitForChanges();

    for (const id of ['grouped-default', 'grouped-list', 'grouped-pills', 'grouped-cards', 'standalone']) {
      expect([id, await effectiveOpacity(page, id, '.checkbox__wrapper')]).toEqual([id, 0.4]);
    }
    // The group's own legend dims too.
    expect(await effectiveOpacity(page, 'g-default', '.checkbox-group__legend')).toBe(0.4);
    // In a list the separator (a border on .aegov-checkbox) dims with the item.
    expect(await effectiveOpacity(page, 'grouped-list', '.aegov-checkbox')).toBe(0.4);
  });

  it('a single disabled item in an enabled default/list group is dimmed; its siblings are not', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group label="Default">
        <aegov-checkbox id="on" label="On"></aegov-checkbox>
        <aegov-checkbox id="off" label="Off" is-disabled="true"></aegov-checkbox>
      </aegov-checkbox-group>
      <aegov-checkbox-group label="List" appearance="list">
        <aegov-checkbox id="list-off" label="Off" is-disabled="true"></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    await page.waitForChanges();
    expect(await effectiveOpacity(page, 'on', '.checkbox__wrapper')).toBe(1);
    expect(await effectiveOpacity(page, 'off', '.checkbox__wrapper')).toBe(0.4);
    expect(await effectiveOpacity(page, 'list-off', '.checkbox__wrapper')).toBe(0.4);
  });

  it('a disabled checkbox without a label is dimmed', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox id="bare" aria-label="Bare" is-disabled="true"></aegov-checkbox>');
    await page.waitForChanges();
    expect(await effectiveOpacity(page, 'bare', 'input')).toBe(0.4);
  });

  it('re-enabling a disabled group restores full opacity', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group id="g" label="Group" is-disabled="true">
        <aegov-checkbox id="c" label="Item"></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    await page.waitForChanges();
    expect(await effectiveOpacity(page, 'c', '.checkbox__wrapper')).toBe(0.4);
    await page.$eval('#g', (el: any) => { el.isDisabled = false; });
    await page.waitForChanges();
    expect(await effectiveOpacity(page, 'c', '.checkbox__wrapper')).toBe(1);
    expect(await effectiveOpacity(page, 'g', '.checkbox-group__legend')).toBe(1);
  });

  it('a checked neutral-max card keeps its checked border on hover', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox-group appearance="cards" variant="neutral-max">
        <aegov-checkbox id="c" label="Card" is-checked="true"></aegov-checkbox>
      </aegov-checkbox-group>
    `);
    await page.waitForChanges();
    const border = () => page.$eval('#c', (el: any) => getComputedStyle(el.shadowRoot.querySelector('.checkbox__wrapper')).borderTopColor);
    const rest = await border();
    const wrapper = await page.find('aegov-checkbox >>> .checkbox__wrapper');
    await wrapper.hover();
    await page.waitForChanges();
    expect(await border()).toBe(rest);
  });
});
