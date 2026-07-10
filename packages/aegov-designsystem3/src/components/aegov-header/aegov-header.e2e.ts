import { newE2EPage } from '@stencil/core/testing';

describe('aegov-header e2e', () => {
  it('renders host with header element in shadow DOM', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-header entity-name="My Entity" entity-domain="https://my.gov.ae"></aegov-header>`);
    const header = await page.find('aegov-header >>> header');
    expect(header).not.toBeNull();
    expect(header.className).toContain('aegov-header');
  });

  it('renders nested aegov-header-banner with forwarded props', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-header entity-name="Ministry of Test" entity-domain="https://test.gov.ae"></aegov-header>`);
    const banner = await page.find('aegov-header >>> aegov-header-banner');
    expect(banner).not.toBeNull();
    expect(banner.getAttribute('entity-name')).toBe('Ministry of Test');
    expect(banner.getAttribute('entity-domain')).toBe('https://test.gov.ae');
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

  it('forwards skip-content-container so banner injects skip-link in body', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-header entity-name="N" entity-domain="https://x.gov.ae" skip-content-container="main"></aegov-header>
      <main id="main">Content</main>
    `);
    const skipExists = await page.evaluate(() => !!document.querySelector('.aegov-skip-content'));
    expect(skipExists).toBe(true);
  });
});
