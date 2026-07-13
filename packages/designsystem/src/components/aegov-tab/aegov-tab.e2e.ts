import { newE2EPage } from '@stencil/core/testing';

describe('aegov-tab (e2e)', () => {
  it('renders the tab button with role=tab', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-tab tab-id="one">Label</aegov-tab>`);
    const btn = await page.find('aegov-tab button');
    expect(btn).not.toBeNull();
    expect(btn.getAttribute('role')).toBe('tab');
    expect(btn.id).toBe('tab-one');
  });

  it('emits aegovTabSelect on click', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-tab tab-id="one">Label</aegov-tab>`);
    const tab = await page.find('aegov-tab');
    const spy = await tab.spyOnEvent('aegovTabSelect');
    const btn = await page.find('aegov-tab button');
    await btn.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
    expect(spy).toHaveReceivedEventDetail('one');
  });

  it('disabled tab does not emit on click', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-tab tab-id="one" is-disabled="true">Label</aegov-tab>`);
    const tab = await page.find('aegov-tab');
    const spy = await tab.spyOnEvent('aegovTabSelect');
    const btn = await page.find('aegov-tab button');
    await btn.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(0);
  });

  it('reflects active state via aria-selected', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-tab tab-id="one" active-tab-id="one">Label</aegov-tab>`);
    const btn = await page.find('aegov-tab button');
    expect(btn.getAttribute('aria-selected')).toBe('true');
  });

  it('renders icon slot content', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-tab tab-id="one"><span slot="icon" class="ic">I</span>Label</aegov-tab>`);
    const icon = await page.find('aegov-tab .ic');
    expect(icon).not.toBeNull();
  });
});
