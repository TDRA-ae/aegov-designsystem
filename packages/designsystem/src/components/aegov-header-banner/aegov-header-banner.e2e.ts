import { newE2EPage, E2EPage } from '@stencil/core/testing';

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
  it('errors on a standalone banner next to aegov-header, which already embeds one', async () => {
    const page = await newE2EPage();
    const errors: string[] = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
    await page.setContent(`
      <aegov-header entity-name="Ministry" entity-domain="https://x.gov.ae"><div slot="mobile-content">m</div></aegov-header>
      <aegov-header-banner entity-name="Extra" entity-domain="https://y.gov.ae"></aegov-header-banner>
    `);
    await page.waitForChanges();
    // The standalone banner connects first; the header's own banner must still win.
    const embeddedRendered = await page.evaluate(() => {
      const nested = document.querySelector('aegov-header').shadowRoot.querySelector('aegov-header-banner');
      return !!nested.shadowRoot.querySelector('.header__top') && !nested.shadowRoot.querySelector('.aegov-header-banner--error');
    });
    expect(embeddedRendered).toBe(true);
    const standaloneErr = await page.find('body > aegov-header-banner >>> .aegov-header-banner--error');
    expect(standaloneErr).not.toBeNull();
    const standaloneTop = await page.find('body > aegov-header-banner >>> .header__top');
    expect(standaloneTop).toBeNull();
    expect(errors.some((t) => t.includes('Only one aegov-header-banner is allowed per page'))).toBe(true);
  });
  describe('text direction', () => {
    const prime = (page: E2EPage) => page.evaluate(() => {
      const nested = document.querySelector('aegov-header')?.shadowRoot?.querySelector('aegov-header-banner');
      const host = nested ?? document.querySelector('aegov-header-banner');
      return host.shadowRoot.querySelector('.header__top span').textContent;
    });

    it('switches copy and the skip link when <html dir> changes after render', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-header-banner entity-name="N" entity-domain="https://x.gov.ae" skip-content-container="main"></aegov-header-banner>
        <main id="main">Content</main>`);
      expect(await prime(page)).toContain('United Arab Emirates');
      await page.evaluate(() => document.documentElement.setAttribute('dir', 'rtl'));
      await page.waitForChanges();
      expect(await prime(page)).toContain('حكومة دولة الإمارات');
      expect(await page.evaluate(() => document.querySelector('.aegov-skip-content').textContent)).toBe('تخطي إلى المحتوى');
      await page.evaluate(() => document.documentElement.removeAttribute('dir'));
      await page.waitForChanges();
      expect(await prime(page)).toContain('United Arab Emirates');
      expect(await page.evaluate(() => document.querySelector('.aegov-skip-content').textContent)).toBe('Skip to content');
    });

    it('follows dir on a wrapper of aegov-header, across the shadow boundary', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <div id="wrap" dir="rtl">
          <aegov-header entity-name="N" entity-domain="https://x.gov.ae"><div slot="mobile-content">m</div></aegov-header>
        </div>`);
      expect(await prime(page)).toContain('حكومة دولة الإمارات');
      await page.evaluate(() => document.getElementById('wrap').setAttribute('dir', 'ltr'));
      await page.waitForChanges();
      expect(await prime(page)).toContain('United Arab Emirates');
    });

    it('picks up a dir added to an ancestor that had none', async () => {
      const page = await newE2EPage();
      await page.setContent(`<div id="wrap"><aegov-header-banner entity-name="N" entity-domain="https://x.gov.ae"></aegov-header-banner></div>`);
      expect(await prime(page)).toContain('United Arab Emirates');
      await page.evaluate(() => document.getElementById('wrap').setAttribute('dir', 'rtl'));
      await page.waitForChanges();
      expect(await prime(page)).toContain('حكومة دولة الإمارات');
    });
  });
});
