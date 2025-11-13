import { newE2EPage } from '@stencil/core/testing';

describe('aegov-badge E2E', () => {
  describe('Rendering', () => {
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

  describe('Size Variants', () => {
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

  describe('Appearance Variants', () => {
    it('should render soft appearance by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge color="primary">Soft</aegov-badge>');

      const span = await page.find('aegov-badge span');
      const classList = await span.getProperty('className');
      expect(classList).toContain('bg-primary-50');
      expect(classList).toContain('text-primary-800');
    });

    it('should render solid appearance', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge appearance="solid" color="primary">Solid</aegov-badge>');

      const span = await page.find('aegov-badge span');
      const classList = await span.getProperty('className');
      expect(classList).toContain('bg-primary-700');
      expect(classList).toContain('text-primary-50');
    });
  });

  describe('Color Variants - Soft', () => {
    const colors = [
      'default', 'primary', 'secondary', 'aegold', 'aered', 'aegreen',
      'aeblack', 'techblue', 'seablue', 'camel', 'desert', 'fuchsia',
      'slate', 'purple', 'pink', 'indigo', 'lime'
    ];

    colors.forEach(color => {
      it(`should render ${color} color with soft appearance`, async () => {
        const page = await newE2EPage();
        const colorAttr = color === 'default' ? '' : `color="${color}"`;
        await page.setContent(`<aegov-badge ${colorAttr}>${color}</aegov-badge>`);

        const span = await page.find('aegov-badge span');
        const classList = await span.getProperty('className');

        const bgColorClass = color === 'default' ? 'slate' : color;
        expect(classList).toContain(`bg-${bgColorClass}-50`);
        expect(classList).toContain(`text-${bgColorClass}-800`);
      });
    });
  });

  describe('Color Variants - Solid', () => {
    const colors = [
      { name: 'default', bg: 'slate', text: 'whitely' },
      { name: 'primary', bg: 'primary', text: 'primary' },
      { name: 'aegold', bg: 'aegold', text: 'aegold' },
      { name: 'aered', bg: 'aered', text: 'aered' },
      { name: 'aegreen', bg: 'aegreen', text: 'aegreen' },
      { name: 'techblue', bg: 'techblue', text: 'techblue' },
      { name: 'seablue', bg: 'seablue', text: 'seablue' },
      { name: 'camel', bg: 'camel', text: 'camel' },
      { name: 'fuchsia', bg: 'fuchsia', text: 'fuchsia' },
      { name: 'purple', bg: 'purple', text: 'purple' },
      { name: 'lime', bg: 'lime', text: 'lime' },
    ];

    colors.forEach(({ name, bg, text }) => {
      it(`should render ${name} color with solid appearance`, async () => {
        const page = await newE2EPage();
        const colorAttr = name === 'default' ? '' : `color="${name}"`;
        await page.setContent(`<aegov-badge appearance="solid" ${colorAttr}>${name}</aegov-badge>`);

        const span = await page.find('aegov-badge span');
        const classList = await span.getProperty('className');

        expect(classList).toContain(`bg-${bg}-700`);
        expect(classList).toContain(`text-${text}-50`);
      });
    });
  });

  describe('Visual Appearance', () => {
    it('should have proper spacing and rounding', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge>Test</aegov-badge>');

      const span = await page.find('aegov-badge span');
      const classList = await span.getProperty('className');

      expect(classList).toContain('rounded-md');
      expect(classList).toContain('px-2');
      expect(classList).toContain('inline-flex');
      expect(classList).toContain('items-center');
    });

    it('should have proper typography', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge>Test</aegov-badge>');

      const span = await page.find('aegov-badge span');
      const classList = await span.getProperty('className');

      expect(classList).toContain('font-medium');
      expect(classList).toContain('whitespace-nowrap');
    });
  });

  describe('Prop Updates', () => {
    it('should update when size prop changes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge size="sm">Test</aegov-badge>');

      let span = await page.find('aegov-badge span');
      let classList = await span.getProperty('className');
      expect(classList).toContain('text-xs');

      const badge = await page.find('aegov-badge');
      badge.setProperty('size', 'lg');
      await page.waitForChanges();

      span = await page.find('aegov-badge span');
      classList = await span.getProperty('className');
      expect(classList).toContain('py-1.5');
    });

    it('should update when appearance prop changes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge color="primary" appearance="soft">Test</aegov-badge>');

      let span = await page.find('aegov-badge span');
      let classList = await span.getProperty('className');
      expect(classList).toContain('bg-primary-50');

      const badge = await page.find('aegov-badge');
      badge.setProperty('appearance', 'solid');
      await page.waitForChanges();

      span = await page.find('aegov-badge span');
      classList = await span.getProperty('className');
      expect(classList).toContain('bg-primary-700');
    });

    it('should update when color prop changes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge color="primary">Test</aegov-badge>');

      let span = await page.find('aegov-badge span');
      let classList = await span.getProperty('className');
      expect(classList).toContain('bg-primary-50');

      const badge = await page.find('aegov-badge');
      badge.setProperty('color', 'aegold');
      await page.waitForChanges();

      span = await page.find('aegov-badge span');
      classList = await span.getProperty('className');
      expect(classList).toContain('bg-aegold-50');
    });
  });

  describe('Accessibility', () => {
    it('should be accessible with proper content', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-badge>Status: Active</aegov-badge>');

      const element = await page.find('aegov-badge');
      expect(element).not.toBeNull();

      const span = await page.find('aegov-badge span');
      expect(span.textContent).toBe('Status: Active');
    });
  });

  describe('Multiple Badges', () => {
    it('should render multiple badges independently', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <div>
          <aegov-badge color="primary">Badge 1</aegov-badge>
          <aegov-badge color="aegold" appearance="solid">Badge 2</aegov-badge>
          <aegov-badge size="lg" color="aered">Badge 3</aegov-badge>
        </div>
      `);

      const badges = await page.findAll('aegov-badge');
      expect(badges.length).toBe(3);

      const span1 = await badges[0].find('span');
      const classList1 = await span1.getProperty('className');
      expect(classList1).toContain('bg-primary-50');

      const span2 = await badges[1].find('span');
      const classList2 = await span2.getProperty('className');
      expect(classList2).toContain('bg-aegold-700');

      const span3 = await badges[2].find('span');
      const classList3 = await span3.getProperty('className');
      expect(classList3).toContain('py-1.5');
    });
  });
});
