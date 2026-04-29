import { newE2EPage } from '@stencil/core/testing';

describe('aegov-navbar-item e2e', () => {
  async function render(html: string) {
    const page = await newE2EPage();
    await page.setContent(html);
    return page;
  }

  describe('rendering', () => {
    it('renders as <a> when href is set', async () => {
      const page = await render(`
        <aegov-navbar>
          <aegov-navbar-item href="/x">X</aegov-navbar-item>
        </aegov-navbar>
      `);
      const link = await page.find('aegov-navbar-item a.aegov-navbar-item__link');
      expect(link).not.toBeNull();
      expect(await link.getAttribute('href')).toBe('/x');
    });

    it('renders as <span> when href is missing', async () => {
      const page = await render(`
        <aegov-navbar>
          <aegov-navbar-item>X</aegov-navbar-item>
        </aegov-navbar>
      `);
      const span = await page.find('aegov-navbar-item span.aegov-navbar-item__link');
      expect(span).not.toBeNull();
    });

    it('honours target and rel attributes', async () => {
      const page = await render(`
        <aegov-navbar>
          <aegov-navbar-item href="/x" target="_blank" rel="noopener">X</aegov-navbar-item>
        </aegov-navbar>
      `);
      const link = await page.find('aegov-navbar-item a.aegov-navbar-item__link');
      expect(await link.getAttribute('target')).toBe('_blank');
      expect(await link.getAttribute('rel')).toBe('noopener');
    });
  });

  describe('disabled state', () => {
    it('renders span with aria-disabled', async () => {
      const page = await render(`
        <aegov-navbar>
          <aegov-navbar-item href="/x" disabled>X</aegov-navbar-item>
        </aegov-navbar>
      `);
      const link = await page.find('aegov-navbar-item a.aegov-navbar-item__link');
      expect(link).toBeNull();
      const span = await page.find('aegov-navbar-item span.aegov-navbar-item__link');
      expect(await span.getAttribute('aria-disabled')).toBe('true');
    });

    it('does not inject a chevron when disabled', async () => {
      const page = await render(`
        <aegov-navbar>
          <aegov-navbar-item href="/x" disabled>
            X
            <aegov-dropdown slot="dropdown">
              <a slot="dropdown-content" href="/p1">P1</a>
            </aegov-dropdown>
          </aegov-navbar-item>
        </aegov-navbar>
      `);
      await page.waitForChanges();
      const chevron = await page.find('aegov-navbar-item button.aegov-navbar-item__chevron');
      expect(chevron).toBeNull();
    });
  });

  describe('icon-start slot', () => {
    it('renders icon wrapper when icon-start is present', async () => {
      const page = await render(`
        <aegov-navbar>
          <aegov-navbar-item href="/x">
            <svg slot="icon-start" data-test="icon"></svg>
            X
          </aegov-navbar-item>
        </aegov-navbar>
      `);
      const wrap = await page.find('aegov-navbar-item .aegov-navbar-item__icon');
      expect(wrap).not.toBeNull();
    });
  });

  describe('chevron + dropdown wiring', () => {
    const html = `
      <aegov-navbar>
        <aegov-navbar-item href="/products">
          Products
          <aegov-dropdown slot="dropdown" trigger-type="click">
            <a slot="dropdown-content" href="/p1">P1</a>
            <a slot="dropdown-content" href="/p2">P2</a>
          </aegov-dropdown>
        </aegov-navbar-item>
      </aegov-navbar>
    `;

    it('chevron click toggles the dropdown trigger aria-expanded', async () => {
      const page = await render(html);
      await page.waitForChanges();

      const trigger = await page.find('aegov-dropdown .aegov-dropdown-trigger');
      expect(await trigger.getAttribute('aria-expanded')).toBe('false');

      const chevron = await page.find('aegov-navbar-item button.aegov-navbar-item__chevron');
      await chevron.click();
      await page.waitForChanges();

      const triggerAfter = await page.find('aegov-dropdown .aegov-dropdown-trigger');
      expect(await triggerAfter.getAttribute('aria-expanded')).toBe('true');
    });

    it('opens dropdown on ArrowDown when chevron focused', async () => {
      const page = await render(html);
      await page.waitForChanges();

      // Tab to product link, then to chevron
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.waitForChanges();

      const isChevron = await page.evaluate(() =>
        document.activeElement.classList.contains('aegov-navbar-item__chevron'),
      );
      expect(isChevron).toBe(true);

      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();

      const trigger = await page.find('aegov-dropdown .aegov-dropdown-trigger');
      expect(await trigger.getAttribute('aria-expanded')).toBe('true');
    });
  });
});
