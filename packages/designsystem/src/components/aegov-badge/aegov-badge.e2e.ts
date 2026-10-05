import { newE2EPage } from '@stencil/core/testing';

describe('aegov-badge (e2e)', () => {
  it('renders with default classes', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-badge>New</aegov-badge>');
    const span = await page.find('aegov-badge span');
    expect(span).not.toBeNull();
    expect(span).toHaveClass('aegov-badge');
    expect(span).toHaveClass('badge-soft');
    expect(span).toHaveClass('badge-default');
  });

  it('renders the slot content', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-badge>Hello</aegov-badge>');
    const el = await page.find('aegov-badge');
    expect(el.textContent).toContain('Hello');
  });

  it('applies variant and appearance classes', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-badge variant="primary" appearance="solid">X</aegov-badge>');
    const span = await page.find('aegov-badge span');
    expect(span).toHaveClass('badge-solid');
    expect(span).toHaveClass('badge-primary');
  });

  it('does not show dismiss button by default', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-badge>X</aegov-badge>');
    const btn = await page.find('aegov-badge button.badge-dismiss');
    expect(btn).toBeNull();
  });

  it('shows dismiss button when is-dismissible', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-badge is-dismissible="true">X</aegov-badge>');
    const btn = await page.find('aegov-badge button.badge-dismiss');
    expect(btn).not.toBeNull();
  });

  it('emits aegovBadgeDismiss when dismiss is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-badge is-dismissible="true">X</aegov-badge>');
    const el = await page.find('aegov-badge');
    const spy = await el.spyOnEvent('aegovBadgeDismiss');
    const btn = await page.find('aegov-badge button.badge-dismiss');
    await btn.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
  });

  it('reflects fieldId to the inner span id', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-badge field-id="b1">X</aegov-badge>');
    const span = await page.find('aegov-badge span');
    expect(span.id).toBe('b1');
  });

  it('forwards aria and data attributes', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-badge aria-label="status" data-foo="bar">X</aegov-badge>');
    const span = await page.find('aegov-badge span');
    expect(span.getAttribute('aria-label')).toBe('status');
    expect(span.getAttribute('data-foo')).toBe('bar');
  });
});
