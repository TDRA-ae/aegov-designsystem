import { newE2EPage } from '@stencil/core/testing';

describe('aegov-link E2E', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test">Test Link</aegov-link>');
      const element = await page.find('aegov-link');
      expect(element).toBeTruthy();
    });

    it('should display slotted content', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test">Link Text</aegov-link>');
      const anchor = await page.find('aegov-link a');
      expect(anchor.textContent).toBe('Link Text');
    });

    it('should render HTML content in slot', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test"><strong>Bold</strong> Link</aegov-link>');
      const strong = await page.find('aegov-link strong');
      expect(strong).toBeTruthy();
      expect(strong.textContent).toBe('Bold');
    });
  });

  describe('href attribute', () => {
    it('should render with absolute URL', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="https://example.com">External</aegov-link>');
      const anchor = await page.find('aegov-link a');
      expect(await anchor.getAttribute('href')).toBe('https://example.com');
    });

    it('should render with relative URL', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/about">About</aegov-link>');
      const anchor = await page.find('aegov-link a');
      expect(await anchor.getAttribute('href')).toBe('/about');
    });

    it('should render with anchor link', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="#section">Section</aegov-link>');
      const anchor = await page.find('aegov-link a');
      expect(await anchor.getAttribute('href')).toBe('#section');
    });
  });

  describe('target attribute', () => {
    it('should render with target="_blank"', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="https://example.com" target="_blank">External</aegov-link>');
      const anchor = await page.find('aegov-link a');
      expect(await anchor.getAttribute('target')).toBe('_blank');
    });

    it('should add rel="noopener noreferrer" for target="_blank"', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="https://example.com" target="_blank">External</aegov-link>');
      const anchor = await page.find('aegov-link a');
      expect(await anchor.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('should render with target="_self"', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test" target="_self">Link</aegov-link>');
      const anchor = await page.find('aegov-link a');
      expect(await anchor.getAttribute('target')).toBe('_self');
    });
  });

  describe('rel attribute', () => {
    it('should render with custom rel', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="https://example.com" rel="nofollow">Link</aegov-link>');
      const anchor = await page.find('aegov-link a');
      expect(await anchor.getAttribute('rel')).toBe('nofollow');
    });

    it('should allow custom rel to override default for _blank', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="https://example.com" target="_blank" rel="noopener">Link</aegov-link>');
      const anchor = await page.find('aegov-link a');
      expect(await anchor.getAttribute('rel')).toBe('noopener');
    });
  });

  describe('pass-through attributes', () => {
    it('should pass through data-testid', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test" data-testid="my-link">Link</aegov-link>');
      const anchor = await page.find('aegov-link a');
      expect(await anchor.getAttribute('data-testid')).toBe('my-link');
    });

    it('should pass through multiple data-* attributes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test" data-id="123" data-type="primary">Link</aegov-link>');
      const anchor = await page.find('aegov-link a');
      expect(await anchor.getAttribute('data-id')).toBe('123');
      expect(await anchor.getAttribute('data-type')).toBe('primary');
    });

    it('should pass through aria-label', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test" aria-label="Go to test">Link</aegov-link>');
      const anchor = await page.find('aegov-link a');
      expect(await anchor.getAttribute('aria-label')).toBe('Go to test');
    });

    it('should pass through title attribute', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test" title="Click me">Link</aegov-link>');
      const anchor = await page.find('aegov-link a');
      expect(await anchor.getAttribute('title')).toBe('Click me');
    });
  });

  describe('click event', () => {
    it('should emit aegovLinkClick when clicked', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test">Link</aegov-link>');
      const clickSpy = await page.spyOnEvent('aegovLinkClick');
      const anchor = await page.find('aegov-link a');
      await anchor.click();
      expect(clickSpy).toHaveReceivedEvent();
    });

    it('should emit event with href in detail', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test-page">Link</aegov-link>');
      const clickSpy = await page.spyOnEvent('aegovLinkClick');
      const anchor = await page.find('aegov-link a');
      await anchor.click();
      expect(clickSpy).toHaveReceivedEvent();
      expect(clickSpy.firstEvent.detail.href).toBe('/test-page');
    });
  });

  describe('CSS styling', () => {
    it('should have default CSS classes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test">Link</aegov-link>');
      const anchor = await page.find('aegov-link a');
      const classList = await anchor.getProperty('className');
      expect(classList).toContain('no-underline');
      expect(classList).toContain('transition-colors');
    });

    it('should merge custom classes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test" class="custom-class">Link</aegov-link>');
      const anchor = await page.find('aegov-link a');
      const classList = await anchor.getProperty('className');
      expect(classList).toContain('custom-class');
      expect(classList).toContain('no-underline');
    });
  });

  describe('combined attributes', () => {
    it('should handle all attributes together', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-link
          href="https://example.com"
          title="Visit Example"
          target="_blank"
          data-id="link-1"
          aria-label="External link">
          Visit Site
        </aegov-link>
      `);
      const anchor = await page.find('aegov-link a');
      expect(await anchor.getAttribute('href')).toBe('https://example.com');
      expect(await anchor.getAttribute('title')).toBe('Visit Example');
      expect(await anchor.getAttribute('target')).toBe('_blank');
      expect(await anchor.getAttribute('rel')).toBe('noopener noreferrer');
      expect(await anchor.getAttribute('data-id')).toBe('link-1');
      expect(await anchor.getAttribute('aria-label')).toBe('External link');
    });
  });
});
