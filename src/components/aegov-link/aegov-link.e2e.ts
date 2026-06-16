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

  // ── Button-style mode ──────────────────────────────────────

  it('renders default text-link style when no button props supplied', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-link href="#a">x</aegov-link>`);
    const a = await page.find('aegov-link a');
    expect(a.className).not.toContain('aegov-btn');
    expect(a.className).toContain('text-primary-600');
  });

  it('applies button-style classes when variant + appearance + size supplied', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-link href="#a" variant="primary" appearance="solid" size="base">CTA</aegov-link>
    `);
    const a = await page.find('aegov-link a');
    expect(a.className).toContain('aegov-btn');
    expect(a.className).toContain('btn-primary');
    expect(a.className).toContain('btn-solid');
    expect(a.className).toContain('btn-base');
  });

  it('icon-only button style applies btn-icon class', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-link href="#a" variant="primary" appearance="outline" is-icon aria-label="Settings">⚙</aegov-link>
    `);
    const a = await page.find('aegov-link a');
    expect(a.className).toContain('btn-icon');
    expect(a.getAttribute('aria-label')).toBe('Settings');
  });

  it('isFull stretches the link to full width', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-link href="#a" variant="primary" appearance="solid" is-full>Apply now</aegov-link>
    `);
    const a = await page.find('aegov-link a');
    expect(a.className).toContain('w-full');
  });

  // ── Disabled polyfill ──────────────────────────────────────

  it('isDisabled strips href and target from the rendered <a>', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-link href="#a" target="_blank" variant="primary" appearance="solid" is-disabled>x</aegov-link>
    `);
    const a = await page.find('aegov-link a');
    expect(a.getAttribute('href')).toBeNull();
    expect(a.getAttribute('target')).toBeNull();
  });

  it('isDisabled sets aria-disabled="true" and tabindex="-1"', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-link href="#a" variant="primary" appearance="solid" is-disabled>x</aegov-link>
    `);
    const a = await page.find('aegov-link a');
    expect(a.getAttribute('aria-disabled')).toBe('true');
    expect(a.getAttribute('tabindex')).toBe('-1');
  });

  it('isDisabled blocks aegovLinkClick from firing on click', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-link href="#a" variant="primary" appearance="solid" is-disabled>x</aegov-link>
    `);
    const host = await page.find('aegov-link');
    const spy = await host.spyOnEvent('aegovLinkClick');
    const a = await page.find('aegov-link a');
    await a.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(0);
  });

  it('intercepting aegovLinkClick via preventDefault stops native navigation', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-link href="#after-click">x</aegov-link>`);
    await page.evaluate(() => {
      document
        .querySelector('aegov-link')!
        .addEventListener('aegovLinkClick', (e: any) => e.preventDefault());
    });
    const a = await page.find('aegov-link a');
    await a.click();
    await page.waitForChanges();
    // URL hash must NOT have been updated because preventDefault was called.
    const hash = await page.evaluate(() => window.location.hash);
    expect(hash).not.toBe('#after-click');
  });
});
