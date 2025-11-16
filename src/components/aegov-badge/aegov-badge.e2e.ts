import { newE2EPage } from '@stencil/core/testing';

describe('aegov-badge E2E', () => {
  describe('rendering', () => {
    it('should render badge component', async () => {
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

      const span = await page.find('aegov-badge span');
      const strong = await span.find('strong');
      expect(strong).not.toBeNull();
      expect(strong.textContent).toBe('Bold');
    });
  });

  describe('size variants', () => {
    it('should render sm size correctly', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge size="sm">Small</aegov-badge>');

      const span = await page.find('aegov-badge span');
      const classList = await span.getProperty('className');
      expect(classList).toContain('text-xs');
      expect(classList).toContain('py-1');
    });

    it('should render base size correctly (default)', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge>Base</aegov-badge>');

      const span = await page.find('aegov-badge span');
      const classList = await span.getProperty('className');
      expect(classList).toContain('text-sm');
      expect(classList).toContain('py-1');
    });

    it('should render lg size correctly', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge size="lg">Large</aegov-badge>');

      const span = await page.find('aegov-badge span');
      const classList = await span.getProperty('className');
      expect(classList).toContain('text-sm');
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
      expect(classList).toContain('badge-primary');
    });

    it('should render solid appearance', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge appearance="solid" color="primary">Solid</aegov-badge>');

      const span = await page.find('aegov-badge span');
      const classList = await span.getProperty('className');
      expect(classList).toContain('badge-solid');
      expect(classList).toContain('badge-primary');
    });
  });

  describe('color variants - soft', () => {
    const colors = [
      { name: 'default', bg: 'slate' },
      { name: 'primary', bg: 'primary' },
      { name: 'secondary', bg: 'secondary' },
      { name: 'aegold', bg: 'aegold' },
      { name: 'aered', bg: 'aered' },
      { name: 'aegreen', bg: 'aegreen' },
      { name: 'aeblack', bg: 'aeblack' },
      { name: 'techblue', bg: 'techblue' },
      { name: 'seablue', bg: 'seablue' },
      { name: 'camel', bg: 'camel' },
      { name: 'desert', bg: 'desert' },
      { name: 'fuchsia', bg: 'fuchsia' },
      { name: 'slate', bg: 'slate' },
      { name: 'purple', bg: 'purple' },
      { name: 'pink', bg: 'pink' },
      { name: 'indigo', bg: 'indigo' },
      { name: 'lime', bg: 'lime' }
    ];

    colors.forEach(color => {
      it(`should render ${color.name} color with soft appearance`, async () => {
        const page = await newE2EPage();
        const colorAttr = color.name === 'default' ? '' : `color="${color.name}"`;
        await page.setContent(`<aegov-badge ${colorAttr}>${color.name}</aegov-badge>`);

        const span = await page.find('aegov-badge span');
        const classList = await span.getProperty('className');

        expect(classList).toContain('badge-soft');
        expect(classList).toContain(`badge-${color.name}`);
      });
    });
  });

  describe('color variants - solid', () => {
    const colors = [
      { name: 'default', bg: 'slate', bgShade: '700', text: 'slate' },
      { name: 'primary', bg: 'primary', bgShade: '600', text: 'whitely' },
      { name: 'secondary', bg: 'secondary', bgShade: '600', text: 'whitely' },
      { name: 'aegold', bg: 'aegold', bgShade: '600', text: 'whitely' },
      { name: 'aered', bg: 'aered', bgShade: '600', text: 'whitely' },
      { name: 'aegreen', bg: 'aegreen', bgShade: '600', text: 'whitely' },
      { name: 'aeblack', bg: 'aeblack', bgShade: '800', text: 'aeblack' },
      { name: 'techblue', bg: 'techblue', bgShade: '700', text: 'techblue' },
      { name: 'seablue', bg: 'seablue', bgShade: '600', text: 'whitely' },
      { name: 'camel', bg: 'camel', bgShade: '600', text: 'whitely' },
      { name: 'desert', bg: 'desert', bgShade: '600', text: 'whitely' },
      { name: 'fuchsia', bg: 'fuchsia', bgShade: '600', text: 'whitely' },
      { name: 'slate', bg: 'slate', bgShade: '700', text: 'slate' },
      { name: 'purple', bg: 'purple', bgShade: '600', text: 'whitely' },
      { name: 'pink', bg: 'pink', bgShade: '600', text: 'whitely' },
      { name: 'indigo', bg: 'indigo', bgShade: '600', text: 'whitely' },
      { name: 'lime', bg: 'lime', bgShade: '600', text: 'whitely' }
    ];

    colors.forEach(color => {
      it(`should render ${color.name} color with solid appearance`, async () => {
        const page = await newE2EPage();
        await page.setContent(`<aegov-badge appearance="solid" color="${color.name}">${color.name}</aegov-badge>`);

        const span = await page.find('aegov-badge span');
        const classList = await span.getProperty('className');

        expect(classList).toContain('badge-solid');
        expect(classList).toContain(`badge-${color.name}`);
      });
    });
  });

  describe('dismissible functionality', () => {
    it('should not show dismiss button by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge>Badge</aegov-badge>');

      const dismissButton = await page.find('aegov-badge .dismiss-button');
      expect(dismissButton).toBeNull();
    });

    it('should show dismiss button when dismissible', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge dismissible>Badge</aegov-badge>');

      const dismissButton = await page.find('aegov-badge .dismiss-button');
      expect(dismissButton).not.toBeNull();
    });

    it('should emit aegovBadgeDismiss event when dismiss button is clicked', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge dismissible>Badge</aegov-badge>');

      const dismissSpy = await page.spyOnEvent('aegovBadgeDismiss');
      const dismissButton = await page.find('aegov-badge .dismiss-button');
      await dismissButton.click();

      expect(dismissSpy).toHaveReceivedEvent();
    });

    it('should have aria-label on dismiss button', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge dismissible>Badge</aegov-badge>');

      const dismissButton = await page.find('aegov-badge .dismiss-button');
      const ariaLabel = await dismissButton.getAttribute('aria-label');
      expect(ariaLabel).toBe('Dismiss badge');
    });
  });

  describe('combined props', () => {
    it('should apply multiple props correctly', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge color="primary" appearance="solid" size="lg" dismissible>Large Primary</aegov-badge>');

      const span = await page.find('aegov-badge span');
      const classList = await span.getProperty('className');

      expect(classList).toContain('text-sm');
      expect(classList).toContain('py-1.5');
      expect(classList).toContain('badge-solid');
      expect(classList).toContain('badge-primary');

      const dismissButton = await page.find('aegov-badge .dismiss-button');
      expect(dismissButton).not.toBeNull();
    });
  });

  describe('accessibility', () => {
    it('should have proper structure', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge>Accessible</aegov-badge>');

      const span = await page.find('aegov-badge span');
      expect(span).not.toBeNull();
      expect(span.textContent).toBe('Accessible');
    });

    it('should hide dismiss icon from screen readers', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge dismissible>Badge</aegov-badge>');

      const dismissButton = await page.find('aegov-badge .dismiss-button');
      const svg = await dismissButton.find('svg');
      const ariaHidden = await svg.getAttribute('aria-hidden');
      expect(ariaHidden).toBe('true');
    });
  });
});
