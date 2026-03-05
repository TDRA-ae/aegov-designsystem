import { newE2EPage } from '@stencil/core/testing';

describe('aegov-label E2E', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-label>Email</aegov-label>`);
      const element = await page.find('aegov-label');
      expect(element).toBeTruthy();
    });

    it('should render a native label element', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-label>Email</aegov-label>`);
      const label = await page.find('aegov-label label');
      expect(label).toBeTruthy();
    });

    it('should render text content', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-label>Email Address</aegov-label>`);
      const label = await page.find('aegov-label label');
      expect(label.textContent).toBe('Email Address');
    });

    it('should have aegov-label class', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-label>Email</aegov-label>`);
      const label = await page.find('aegov-label label');
      expect(await label.getAttribute('class')).toContain('aegov-label');
    });
  });

  describe('for prop', () => {
    it('should set htmlFor on the label', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-label for="email-input">Email</aegov-label>`);
      const label = await page.find('aegov-label label');
      expect(await label.getAttribute('for')).toBe('email-input');
    });

    it('should focus linked input when label is clicked', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-label for="my-input">Email</aegov-label>
        <input id="my-input" type="text" />
      `);
      const label = await page.find('aegov-label label');
      await label.click();
      const activeId = await page.evaluate(() => document.activeElement?.id);
      expect(activeId).toBe('my-input');
    });
  });

  describe('custom class', () => {
    it('should merge custom class with defaults', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-label class="font-bold">Email</aegov-label>`);
      const label = await page.find('aegov-label label');
      const cls = await label.getAttribute('class');
      expect(cls).toContain('aegov-label');
      expect(cls).toContain('font-bold');
    });
  });
});
