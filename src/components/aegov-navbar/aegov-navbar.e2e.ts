import { newE2EPage } from '@stencil/core/testing';

describe('aegov-navbar e2e', () => {
  async function render(html: string) {
    const page = await newE2EPage();
    await page.setContent(html);
    return page;
  }

  const basicHtml = `
    <aegov-navbar>
      <aegov-navbar-item href="/a">A</aegov-navbar-item>
      <aegov-navbar-item href="/b">B</aegov-navbar-item>
      <aegov-navbar-item href="/c">C</aegov-navbar-item>
    </aegov-navbar>
  `;

  describe('basic rendering', () => {
    it('renders the nav element', async () => {
      const page = await render(basicHtml);
      const nav = await page.find('aegov-navbar nav.aegov-navbar');
      expect(nav).not.toBeNull();
      expect(await nav.getAttribute('aria-label')).toBe('Main navigation');
    });

    it('renders the ul list with items', async () => {
      const page = await render(basicHtml);
      const items = await page.findAll('aegov-navbar ul.aegov-navbar-list aegov-navbar-item');
      expect(items.length).toBe(3);
    });

    it('cascades size to children', async () => {
      const page = await render(`
        <aegov-navbar size="lg">
          <aegov-navbar-item href="/a">A</aegov-navbar-item>
          <aegov-navbar-item href="/b">B</aegov-navbar-item>
        </aegov-navbar>
      `);
      await page.waitForChanges();
      const item = await page.find('aegov-navbar-item');
      expect(await item.getProperty('size')).toBe('lg');
    });

    it('resolves a responsive size string against the active viewport', async () => {
      const page = await newE2EPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.setContent(`
        <aegov-navbar size="sm md:base lg:lg">
          <aegov-navbar-item href="/a">A</aegov-navbar-item>
        </aegov-navbar>
      `);
      await page.waitForChanges();
      const nav = await page.find('aegov-navbar nav.aegov-navbar');
      expect(nav).not.toBeNull();
      expect(nav.classList.contains('aegov-navbar-lg')).toBe(true);
      const item = await page.find('aegov-navbar-item');
      expect(await item.getProperty('size')).toBe('lg');
    });

    it('updates the resolved size on viewport resize', async () => {
      const page = await newE2EPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.setContent(`
        <aegov-navbar size="sm md:base lg:lg">
          <aegov-navbar-item href="/a">A</aegov-navbar-item>
        </aegov-navbar>
      `);
      await page.waitForChanges();
      let nav = await page.find('aegov-navbar nav.aegov-navbar');
      expect(nav.classList.contains('aegov-navbar-lg')).toBe(true);

      await page.setViewport({ width: 500, height: 800 });
      await page.waitForChanges();
      // Allow the watcher's resize listener to settle.
      await page.evaluate(
        () => new Promise(r => setTimeout(r, 100)),
      );
      await page.waitForChanges();
      nav = await page.find('aegov-navbar nav.aegov-navbar');
      expect(nav.classList.contains('aegov-navbar-sm')).toBe(true);
    });
  });

  describe('keyboard navigation', () => {
    it('ArrowRight moves focus to the next link', async () => {
      const page = await render(basicHtml);
      // Tab into the first link
      await page.keyboard.press('Tab');
      await page.waitForChanges();

      // Verify first link focused
      let focusedHref = await page.evaluate(() => (document.activeElement as HTMLAnchorElement).getAttribute('href'));
      expect(focusedHref).toBe('/a');

      await page.keyboard.press('ArrowRight');
      await page.waitForChanges();

      focusedHref = await page.evaluate(() => (document.activeElement as HTMLAnchorElement).getAttribute('href'));
      expect(focusedHref).toBe('/b');
    });

    it('ArrowLeft moves focus to the previous link', async () => {
      const page = await render(basicHtml);
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');
      await page.waitForChanges();
      await page.keyboard.press('ArrowLeft');
      await page.waitForChanges();
      const href = await page.evaluate(() => (document.activeElement as HTMLAnchorElement).getAttribute('href'));
      expect(href).toBe('/a');
    });

    it('ArrowRight wraps from last back to first', async () => {
      const page = await render(basicHtml);
      await page.keyboard.press('Tab');
      await page.keyboard.press('End');
      await page.waitForChanges();
      let href = await page.evaluate(() => (document.activeElement as HTMLAnchorElement).getAttribute('href'));
      expect(href).toBe('/c');

      await page.keyboard.press('ArrowRight');
      await page.waitForChanges();
      href = await page.evaluate(() => (document.activeElement as HTMLAnchorElement).getAttribute('href'));
      expect(href).toBe('/a');
    });

    it('Home jumps to the first link, End to the last', async () => {
      const page = await render(basicHtml);
      await page.keyboard.press('Tab');
      await page.keyboard.press('End');
      await page.waitForChanges();
      let href = await page.evaluate(() => (document.activeElement as HTMLAnchorElement).getAttribute('href'));
      expect(href).toBe('/c');

      await page.keyboard.press('Home');
      await page.waitForChanges();
      href = await page.evaluate(() => (document.activeElement as HTMLAnchorElement).getAttribute('href'));
      expect(href).toBe('/a');
    });

    it('reverses ArrowRight/ArrowLeft in RTL', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <div dir="rtl">
          <aegov-navbar>
            <aegov-navbar-item href="/a">A</aegov-navbar-item>
            <aegov-navbar-item href="/b">B</aegov-navbar-item>
          </aegov-navbar>
        </div>
      `);
      await page.keyboard.press('Tab');
      await page.waitForChanges();
      // First focusable in document order is /a
      await page.keyboard.press('ArrowLeft');
      await page.waitForChanges();
      const href = await page.evaluate(() => (document.activeElement as HTMLAnchorElement).getAttribute('href'));
      expect(href).toBe('/b');
    });
  });

  describe('with chevron + dropdown', () => {
    const dropdownHtml = `
      <aegov-navbar>
        <aegov-navbar-item href="/a">A</aegov-navbar-item>
        <aegov-navbar-item href="/products">
          Products
          <aegov-dropdown slot="dropdown" trigger-type="click">
            <a slot="dropdown-content" href="/p1">P1</a>
            <a slot="dropdown-content" href="/p2">P2</a>
          </aegov-dropdown>
        </aegov-navbar-item>
        <aegov-navbar-item href="/c">C</aegov-navbar-item>
      </aegov-navbar>
    `;

    it('injects a chevron button when aegov-dropdown is slotted', async () => {
      const page = await render(dropdownHtml);
      await page.waitForChanges();
      const chevron = await page.find('aegov-navbar-item button.aegov-navbar-item__chevron');
      expect(chevron).not.toBeNull();
    });

    it('keeps link and chevron as separate Tab stops', async () => {
      const page = await render(dropdownHtml);
      await page.waitForChanges();

      // Tab 1: first link /a
      await page.keyboard.press('Tab');
      let activeTag = await page.evaluate(() => document.activeElement.tagName);
      let activeHref = await page.evaluate(() => (document.activeElement as HTMLAnchorElement).getAttribute?.('href') || '');
      expect(activeTag).toBe('A');
      expect(activeHref).toBe('/a');

      // Tab 2: products link
      await page.keyboard.press('Tab');
      activeTag = await page.evaluate(() => document.activeElement.tagName);
      activeHref = await page.evaluate(() => (document.activeElement as HTMLAnchorElement).getAttribute?.('href') || '');
      expect(activeTag).toBe('A');
      expect(activeHref).toBe('/products');

      // Tab 3: chevron button
      await page.keyboard.press('Tab');
      activeTag = await page.evaluate(() => document.activeElement.tagName);
      const isChevron = await page.evaluate(() =>
        document.activeElement.classList.contains('aegov-navbar-item__chevron'),
      );
      expect(activeTag).toBe('BUTTON');
      expect(isChevron).toBe(true);

      // Tab 4: link /c
      await page.keyboard.press('Tab');
      activeHref = await page.evaluate(() => (document.activeElement as HTMLAnchorElement).getAttribute?.('href') || '');
      expect(activeHref).toBe('/c');
    });
  });

  describe('active state', () => {
    it('sets aria-current="page" on the active item link', async () => {
      const page = await render(`
        <aegov-navbar>
          <aegov-navbar-item href="/a" active>A</aegov-navbar-item>
          <aegov-navbar-item href="/b">B</aegov-navbar-item>
        </aegov-navbar>
      `);
      await page.waitForChanges();
      const link = await page.find('aegov-navbar-item[href="/a"] a');
      expect(await link.getAttribute('aria-current')).toBe('page');
    });
  });
});
