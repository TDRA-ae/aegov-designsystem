import { newE2EPage } from '@stencil/core/testing';

describe('aegov-header e2e', () => {
  it('renders host with header element in shadow DOM', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-header entity-name="My Entity" entity-domain="https://my.gov.ae"></aegov-header>`);
    const header = await page.find('aegov-header >>> header');
    expect(header).not.toBeNull();
    expect(header.className).toContain('aegov-header');
  });

  it('renders error message when entity-name missing', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-header entity-domain="https://x.gov.ae"></aegov-header>`);
    const err = await page.find('aegov-header >>> .aegov-header--error');
    expect(err).not.toBeNull();
  });

  it('toggles expand panel when "Learn more" is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-header entity-name="N" entity-domain="https://x.gov.ae"></aegov-header>`);
    const trigger = await page.find('aegov-header >>> a[aria-controls="header-top-expand"]');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    await trigger.click();
    await page.waitForChanges();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('shows entity name and domain in expanded panel', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-header entity-name="Ministry of Test" entity-domain="https://test.gov.ae"></aegov-header>`);
    const headerHtml = await page.evaluate(() => {
      const host = document.querySelector('aegov-header');
      return host?.shadowRoot?.innerHTML || '';
    });
    expect(headerHtml).toContain('Ministry of Test');
    expect(headerHtml).toContain('https://test.gov.ae');
  });

  it('renders logo slot content', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-header entity-name="N" entity-domain="https://x.gov.ae">
      <img slot="logo" src="data:image/png;base64,x" alt="logo" />
    </aegov-header>`);
    const img = await page.find('aegov-header img[slot="logo"]');
    expect(img).not.toBeNull();
  });

  it('applies authority variant class', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-header variant="authority" entity-name="A" entity-domain="https://a.gov.ae"></aegov-header>`);
    const header = await page.find('aegov-header >>> header');
    expect(header.className).toContain('header--authority');
  });

  it('creates a skip-link in document body when skip-content-container is set', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-header entity-name="N" entity-domain="https://x.gov.ae" skip-content-container="main"></aegov-header>
      <main id="main">Content</main>
    `);
    const skipExists = await page.evaluate(() => !!document.querySelector('.aegov-skip-content'));
    expect(skipExists).toBe(true);
  });
});
