import { newE2EPage } from '@stencil/core/testing';

const baseHtml = `
  <aegov-tabs default-open="one">
    <aegov-tab slot="tabs" tab-id="one">One</aegov-tab>
    <aegov-tab slot="tabs" tab-id="two">Two</aegov-tab>
    <aegov-tab slot="tabs" tab-id="three">Three</aegov-tab>
    <aegov-tab-panel tab-id="one">Panel One</aegov-tab-panel>
    <aegov-tab-panel tab-id="two">Panel Two</aegov-tab-panel>
    <aegov-tab-panel tab-id="three">Panel Three</aegov-tab-panel>
  </aegov-tabs>
`;

describe('aegov-tabs (e2e)', () => {
  it('renders tablist and panels', async () => {
    const page = await newE2EPage();
    await page.setContent(baseHtml);
    const tablist = await page.find('aegov-tabs [role="tablist"]');
    expect(tablist).not.toBeNull();
    const panels = await page.findAll('aegov-tabs aegov-tab-panel');
    expect(panels.length).toBe(3);
  });

  it('clicking a tab activates it and emits aegovTabChange', async () => {
    const page = await newE2EPage();
    await page.setContent(baseHtml);
    const tabsEl = await page.find('aegov-tabs');
    const spy = await tabsEl.spyOnEvent('aegovTabChange');

    const secondTabBtn = await page.find('aegov-tab[tab-id="two"] button');
    await secondTabBtn.click();
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventTimes(1);
    expect(spy).toHaveReceivedEventDetail('two');
    expect(secondTabBtn.getAttribute('aria-selected')).toBe('true');
  });

  it('only the active panel is visible', async () => {
    const page = await newE2EPage();
    await page.setContent(baseHtml);
    const panels = await page.findAll('aegov-tabs aegov-tab-panel [role="tabpanel"]');
    expect(panels[0].getAttribute('hidden')).toBeNull();
    expect(panels[1].getAttribute('hidden')).not.toBeNull();
  });

  it('disabled tab does not emit on click', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-tabs default-open="a">
        <aegov-tab slot="tabs" tab-id="a">A</aegov-tab>
        <aegov-tab slot="tabs" tab-id="b" is-disabled="true">B</aegov-tab>
        <aegov-tab-panel tab-id="a">A</aegov-tab-panel>
        <aegov-tab-panel tab-id="b">B</aegov-tab-panel>
      </aegov-tabs>
    `);
    const tabsEl = await page.find('aegov-tabs');
    const spy = await tabsEl.spyOnEvent('aegovTabChange');
    const btnB = await page.find('aegov-tab[tab-id="b"] button');
    await btnB.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(0);
  });

  it('ArrowRight cycles to next enabled tab', async () => {
    const page = await newE2EPage();
    await page.setContent(baseHtml);
    const firstBtn = await page.find('aegov-tab[tab-id="one"] button');
    await firstBtn.focus();
    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();
    const secondBtn = await page.find('aegov-tab[tab-id="two"] button');
    expect(secondBtn.getAttribute('aria-selected')).toBe('true');
  });

  it('ArrowLeft cycles to previous enabled tab and wraps', async () => {
    const page = await newE2EPage();
    await page.setContent(baseHtml);
    const firstBtn = await page.find('aegov-tab[tab-id="one"] button');
    await firstBtn.focus();
    await page.keyboard.press('ArrowLeft');
    await page.waitForChanges();
    const lastBtn = await page.find('aegov-tab[tab-id="three"] button');
    expect(lastBtn.getAttribute('aria-selected')).toBe('true');
  });

  it('Home jumps to first tab', async () => {
    const page = await newE2EPage();
    await page.setContent(baseHtml);
    const lastBtn = await page.find('aegov-tab[tab-id="three"] button');
    await lastBtn.focus();
    // first activate it
    await lastBtn.click();
    await page.waitForChanges();
    await page.keyboard.press('Home');
    await page.waitForChanges();
    const firstBtn = await page.find('aegov-tab[tab-id="one"] button');
    expect(firstBtn.getAttribute('aria-selected')).toBe('true');
  });

  it('End jumps to last tab', async () => {
    const page = await newE2EPage();
    await page.setContent(baseHtml);
    const firstBtn = await page.find('aegov-tab[tab-id="one"] button');
    await firstBtn.focus();
    await page.keyboard.press('End');
    await page.waitForChanges();
    const lastBtn = await page.find('aegov-tab[tab-id="three"] button');
    expect(lastBtn.getAttribute('aria-selected')).toBe('true');
  });

  it('vertical orientation uses ArrowDown/ArrowUp', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-tabs orientation="vertical" default-open="one">
        <aegov-tab slot="tabs" tab-id="one">One</aegov-tab>
        <aegov-tab slot="tabs" tab-id="two">Two</aegov-tab>
        <aegov-tab-panel tab-id="one">A</aegov-tab-panel>
        <aegov-tab-panel tab-id="two">B</aegov-tab-panel>
      </aegov-tabs>
    `);
    const firstBtn = await page.find('aegov-tab[tab-id="one"] button');
    await firstBtn.focus();
    await page.keyboard.press('ArrowDown');
    await page.waitForChanges();
    const secondBtn = await page.find('aegov-tab[tab-id="two"] button');
    expect(secondBtn.getAttribute('aria-selected')).toBe('true');
  });

  it('applies variant and orientation classes', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-tabs variant="segmented" orientation="vertical"></aegov-tabs>`);
    const root = await page.find('aegov-tabs .aegov-tabs');
    expect(root).toHaveClass('tabs--segmented');
    expect(root).toHaveClass('tabs--vertical');
  });
});
