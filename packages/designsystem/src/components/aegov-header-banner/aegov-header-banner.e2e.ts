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

  // A11Y-FINAL-02: the collapsed panel's Close button must not be a Tab stop.
  describe('collapsed panel is out of the Tab order', () => {
    const deepFocus = (page) => page.evaluate(() => {
      let a: Element | null = document.activeElement;
      const path: string[] = [];
      while (a) { path.push(a.tagName.toLowerCase() + (a.id ? '#' + a.id : '')); a = (a as HTMLElement).shadowRoot?.activeElement ?? null; }
      return path.join(' > ');
    });

    it('Tab goes from "Learn more" to the next control, not to the hidden Close button', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-header-banner entity-name="Ministry" entity-domain="example.gov.ae"></aegov-header-banner>
        <button id="after">After</button>`);
      await page.waitForChanges();
      expect(await page.$eval('aegov-header-banner', (el: HTMLElement) => (el.shadowRoot.querySelector('#header-top-expand') as HTMLElement).inert)).toBe(true);
      await page.$eval('aegov-header-banner', (el: HTMLElement) => (el.shadowRoot.querySelector('a[aria-controls="header-top-expand"]') as HTMLElement).focus());
      await page.keyboard.press('Tab');
      expect(await deepFocus(page)).toBe('button#after');
    });

    it('opening moves focus to Close; closing returns it to "Learn more" and hides the panel again', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-header-banner entity-name="Ministry" entity-domain="example.gov.ae"></aegov-header-banner><button id="after">After</button>`);
      await page.waitForChanges();
      await page.$eval('aegov-header-banner', (el: HTMLElement) => (el.shadowRoot.querySelector('a[aria-controls="header-top-expand"]') as HTMLElement).focus());
      await page.keyboard.press('Enter');
      await page.waitForChanges();
      await new Promise(r => setTimeout(r, 100));
      expect(await deepFocus(page)).toContain('aegov-button');
      expect(await page.$eval('aegov-header-banner', (el: HTMLElement) => (el.shadowRoot.querySelector('#header-top-expand') as HTMLElement).inert)).toBe(false);
      await page.keyboard.press('Escape');
      await page.waitForChanges();
      expect(await deepFocus(page)).toBe('aegov-header-banner > a');
      expect(await page.$eval('aegov-header-banner', (el: HTMLElement) => (el.shadowRoot.querySelector('#header-top-expand') as HTMLElement).inert)).toBe(true);
      await page.keyboard.press('Tab');
      expect(await deepFocus(page)).toBe('button#after');
    });
  });
});
