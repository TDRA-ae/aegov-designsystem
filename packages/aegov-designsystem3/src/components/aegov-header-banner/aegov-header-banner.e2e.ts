import { newE2EPage } from '@stencil/core/testing';

describe('aegov-header-banner e2e', () => {
  it('renders host with banner element in shadow DOM', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-header-banner entity-name="My Entity" entity-domain="https://my.gov.ae"></aegov-header-banner>`);
    const banner = await page.find('aegov-header-banner >>> .aegov-header-banner');
    expect(banner).not.toBeNull();
  });

  it('renders error message when entity-name missing', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-header-banner entity-domain="https://x.gov.ae"></aegov-header-banner>`);
    const err = await page.find('aegov-header-banner >>> .aegov-header-banner--error');
    expect(err).not.toBeNull();
  });

  it('toggles expand panel when "Learn more" is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-header-banner entity-name="N" entity-domain="https://x.gov.ae"></aegov-header-banner>`);
    const trigger = await page.find('aegov-header-banner >>> a[aria-controls="header-top-expand"]');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    await trigger.click();
    await page.waitForChanges();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('shows entity name and domain in expanded panel', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-header-banner entity-name="Ministry of Test" entity-domain="https://test.gov.ae"></aegov-header-banner>`);
    const html = await page.evaluate(() => {
      const host = document.querySelector('aegov-header-banner');
      return host?.shadowRoot?.innerHTML || '';
    });
    expect(html).toContain('Ministry of Test');
    expect(html).toContain('https://test.gov.ae');
  });

  it('creates a skip-link in document body when skip-content-container is set', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-header-banner entity-name="N" entity-domain="https://x.gov.ae" skip-content-container="main"></aegov-header-banner>
      <main id="main">Content</main>
    `);
    const skipExists = await page.evaluate(() => !!document.querySelector('.aegov-skip-content'));
    expect(skipExists).toBe(true);
  });

  it('closes expand panel on Escape', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-header-banner entity-name="N" entity-domain="https://x.gov.ae"></aegov-header-banner>`);
    const trigger = await page.find('aegov-header-banner >>> a[aria-controls="header-top-expand"]');
    await trigger.click();
    await page.waitForChanges();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    await page.keyboard.press('Escape');
    await page.waitForChanges();
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });
});
