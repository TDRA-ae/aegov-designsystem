import { newE2EPage } from '@stencil/core/testing';

describe('aegov-banner e2e', () => {
  it('makes the host element display:block and position:relative (regression test for issue #21 — :host is dead CSS on a shadow:false/scoped:false component)', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-banner>Hello</aegov-banner>`);
    const styles = await page.evaluate(() => {
      const cs = getComputedStyle(document.querySelector('aegov-banner'));
      return { display: cs.display, position: cs.position };
    });
    expect(styles.display).toBe('block');
    expect(styles.position).toBe('relative');
  });

  it('renders the banner', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-banner>Hello</aegov-banner>`);
    const banner = await page.find('aegov-banner .aegov-banner');
    expect(banner).not.toBeNull();
  });

  it('sets role="alert" for error variant (aria-live is implicit — no explicit attribute needed)', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-banner variant="error">x</aegov-banner>`);
    const inner = await page.find('aegov-banner .aegov-banner');
    // APG alert example: "aria-live does not have to be declared — it is implicit in the alert role"
    expect(inner.getAttribute('role')).toBe('alert');
    expect(inner.getAttribute('aria-live')).toBeNull();
  });

  it('renders dismiss button by default', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-banner>x</aegov-banner>`);
    const btn = await page.find('aegov-banner .banner__dismiss');
    expect(btn).not.toBeNull();
    expect(btn.getAttribute('aria-label')).toBe('Close banner');
  });

  it('omits dismiss button when is-dismissible="false"', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-banner is-dismissible="false">x</aegov-banner>`);
    const btn = await page.find('aegov-banner .banner__dismiss');
    expect(btn).toBeNull();
  });

  it('emits aegovBannerDismiss on dismiss click', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-banner>x</aegov-banner>`);
    const host = await page.find('aegov-banner');
    const spy = await host.spyOnEvent('aegovBannerDismiss');
    const btn = await page.find('aegov-banner .banner__dismiss');
    await btn.click();
    // Animation timeout is 300ms
    await new Promise(resolve => setTimeout(resolve, 400));
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
  });

  it('applies variant class banner--success', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-banner variant="success">x</aegov-banner>`);
    const inner = await page.find('aegov-banner .aegov-banner');
    expect(inner.className).toContain('banner--success');
  });

  it('applies position="bottom" class', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-banner position="bottom">x</aegov-banner>`);
    const inner = await page.find('aegov-banner .aegov-banner');
    expect(inner.className).toContain('banner--bottom');
  });

  it('renders actions slot when content provided', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-banner>
        <span>message</span>
        <button slot="actions">Action</button>
      </aegov-banner>
    `);
    const actions = await page.find('aegov-banner .banner__actions');
    expect(actions).not.toBeNull();
  });

});
