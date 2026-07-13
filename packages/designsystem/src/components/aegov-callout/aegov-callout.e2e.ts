import { newE2EPage } from '@stencil/core/testing';

describe('aegov-callout (e2e)', () => {
  it('renders with default classes and role', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-callout><span>Hello</span></aegov-callout>');
    const root = await page.find('aegov-callout [data-aegov-callout]');
    expect(root).not.toBeNull();
    expect(root).toHaveClass('aegov-callout');
    expect(root.getAttribute('role')).toBe('alert');
  });

  it('applies variant class', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-callout variant="success"></aegov-callout>');
    const root = await page.find('aegov-callout [data-aegov-callout]');
    expect(root).toHaveClass('callout-success');
  });

  it('renders content slot', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-callout><p>Body</p></aegov-callout>');
    const el = await page.find('aegov-callout');
    expect(el.textContent).toContain('Body');
  });

  it('does not show dismiss button by default', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-callout></aegov-callout>');
    const btn = await page.find('aegov-callout button[aria-label="Close callout"]');
    expect(btn).toBeNull();
  });

  it('emits aegovCalloutDismiss when dismiss is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-callout is-dismissible="true"></aegov-callout>');
    const el = await page.find('aegov-callout');
    const spy = await el.spyOnEvent('aegovCalloutDismiss');
    const btn = await page.find('aegov-callout button[aria-label="Close callout"]');
    await btn.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
  });

  it('hides callout body after dismiss', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-callout is-dismissible="true"></aegov-callout>');
    const btn = await page.find('aegov-callout button[aria-label="Close callout"]');
    await btn.click();
    await page.waitForChanges();
    const root = await page.find('aegov-callout [data-aegov-callout]');
    expect(root).toBeNull();
  });

  it('renders actions slot wrapper when actions slotted', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-callout><span>Hi</span><button slot="actions">A</button></aegov-callout>');
    const wrap = await page.find('aegov-callout .callout__actions');
    expect(wrap).not.toBeNull();
  });
});
