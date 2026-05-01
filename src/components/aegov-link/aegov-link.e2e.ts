import { newE2EPage } from '@stencil/core/testing';

describe('aegov-link e2e', () => {
  it('renders host with anchor', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-link href="/x">Hello</aegov-link>`);
    const a = await page.find('aegov-link a');
    expect(a).not.toBeNull();
    expect(a.getAttribute('href')).toBe('/x');
  });

  it('auto-generates an id on the inner anchor', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-link href="/x">x</aegov-link>`);
    const a = await page.find('aegov-link a');
    expect(a.id).toMatch(/^aegov-link-\d+$/);
  });

  it('emits aegovLinkClick on click', async () => {
    const page = await newE2EPage();
    // Use a same-page hash so the click does not navigate away from the
    // test page and abort the run.
    await page.setContent(`<aegov-link href="#target">click me</aegov-link>`);
    const host = await page.find('aegov-link');
    const spy = await host.spyOnEvent('aegovLinkClick');
    const a = await page.find('aegov-link a');
    await a.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
    expect(spy.firstEvent.detail.href).toBe('#target');
  });

  it('sets rel=noopener noreferrer for target=_blank automatically', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-link href="/x" target="_blank">x</aegov-link>`);
    const a = await page.find('aegov-link a');
    expect(a.getAttribute('rel')).toBe('noopener noreferrer');
    expect(a.getAttribute('target')).toBe('_blank');
  });

  it('passes through title attribute', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-link href="/x" title="tooltip">x</aegov-link>`);
    const a = await page.find('aegov-link a');
    expect(a.getAttribute('title')).toBe('tooltip');
  });

  it('renders slot content', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-link href="/x">Visit page</aegov-link>`);
    const a = await page.find('aegov-link a');
    expect(a.textContent).toContain('Visit page');
  });
});
