import { newE2EPage } from '@stencil/core/testing';

describe('aegov-badge E2E', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge>Test Badge</aegov-badge>');
      const element = await page.find('aegov-badge');
      expect(element).not.toBeNull();
    });

    it('should display slot content', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge>Badge Text</aegov-badge>');
      const span = await page.find('aegov-badge span');
      expect(span.textContent).toBe('Badge Text');
    });

    it('should render with HTML content', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge><strong>Bold</strong> Text</aegov-badge>');
      const strong = await page.find('aegov-badge strong');
      expect(strong).not.toBeNull();
    });
  });

  describe('size variants', () => {
    it('should render sm size', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge size="sm">Small</aegov-badge>');
      const span = await page.find('aegov-badge span');
      const classList = await span.getProperty('className');
      expect(classList).toContain('text-xs');
    });

    it('should render base size (default)', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge>Base</aegov-badge>');
      const span = await page.find('aegov-badge span');
      const classList = await span.getProperty('className');
      expect(classList).toContain('text-sm');
    });

    it('should render lg size', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge size="lg">Large</aegov-badge>');
      const span = await page.find('aegov-badge span');
      const classList = await span.getProperty('className');
      expect(classList).toContain('py-1.5');
    });
  });

  describe('appearance variants', () => {
    it('should render soft appearance by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge color="primary">Soft</aegov-badge>');
      const span = await page.find('aegov-badge span');
      const classList = await span.getProperty('className');
      expect(classList).toContain('badge-soft');
    });

    it('should render solid appearance', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge appearance="solid" color="primary">Solid</aegov-badge>');
      const span = await page.find('aegov-badge span');
      const classList = await span.getProperty('className');
      expect(classList).toContain('badge-solid');
    });
  });

  describe('color variants', () => {
    const colors = [
      'default', 'primary', 'secondary', 'aegold', 'aered', 'aegreen',
      'aeblack', 'techblue', 'seablue', 'camel', 'desert', 'fuchsia',
      'slate', 'purple', 'pink', 'indigo', 'lime',
    ];

    colors.forEach(color => {
      it(`should render ${color} color`, async () => {
        const page = await newE2EPage();
        await page.setContent(`<aegov-badge color="${color}">${color}</aegov-badge>`);
        const span = await page.find('aegov-badge span');
        const classList = await span.getProperty('className');
        expect(classList).toContain(`badge-${color}`);
      });
    });
  });

  describe('dismissible functionality', () => {
    it('should not show dismiss button by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge>Badge</aegov-badge>');
      const btn = await page.find('aegov-badge .badge-dismiss');
      expect(btn).toBeNull();
    });

    it('should show dismiss button when dismissible', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge dismissible>Badge</aegov-badge>');
      const btn = await page.find('aegov-badge .badge-dismiss');
      expect(btn).not.toBeNull();
    });

    it('should emit aegovBadgeDismiss on click', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge dismissible>Badge</aegov-badge>');
      const spy = await page.spyOnEvent('aegovBadgeDismiss');
      const btn = await page.find('aegov-badge .badge-dismiss');
      await btn.click();
      expect(spy).toHaveReceivedEvent();
    });

    it('should have aria-label on dismiss button', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge dismissible>Badge</aegov-badge>');
      const btn = await page.find('aegov-badge .badge-dismiss');
      expect(await btn.getAttribute('aria-label')).toBe('Badge dismiss button');
    });

    it('should hide dismiss SVG from screen readers', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge dismissible>Badge</aegov-badge>');
      const svg = await page.find('aegov-badge .badge-dismiss svg');
      expect(await svg.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('combined props', () => {
    it('should apply multiple props', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge color="primary" appearance="solid" size="lg" dismissible>Badge</aegov-badge>');
      const span = await page.find('aegov-badge span');
      const classList = await span.getProperty('className');
      expect(classList).toContain('badge-solid');
      expect(classList).toContain('badge-primary');

      const btn = await page.find('aegov-badge .badge-dismiss');
      expect(btn).not.toBeNull();
    });
  });
});
