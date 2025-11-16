import { newE2EPage } from '@stencil/core/testing';

describe('aegov-link E2E', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test">Test Link</aegov-link>');

      const element = await page.find('aegov-link');
      expect(element).toBeTruthy();

      const anchor = await page.find('aegov-link a');
      expect(anchor).toBeTruthy();
    });

    it('should display slotted content', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test">Link Text</aegov-link>');

      const anchor = await page.find('aegov-link a');
      expect(anchor.textContent).toBe('Link Text');
    });

    it('should render with HTML content', async () => {
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
      const href = await anchor.getAttribute('href');
      expect(href).toBe('https://example.com');
    });

    it('should render with relative URL', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/about">About</aegov-link>');

      const anchor = await page.find('aegov-link a');
      const href = await anchor.getAttribute('href');
      expect(href).toBe('/about');
    });

    it('should render with anchor link', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="#section">Section</aegov-link>');

      const anchor = await page.find('aegov-link a');
      const href = await anchor.getAttribute('href');
      expect(href).toBe('#section');
    });
  });

  describe('title attribute', () => {
    it('should render title attribute', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test" title="Click me">Link</aegov-link>');

      const anchor = await page.find('aegov-link a');
      const title = await anchor.getAttribute('title');
      expect(title).toBe('Click me');
    });

    it('should not have title when not provided', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test">Link</aegov-link>');

      const anchor = await page.find('aegov-link a');
      const title = await anchor.getAttribute('title');
      expect(title).toBeNull();
    });
  });

  describe('target attribute', () => {
    it('should render with target="_blank"', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="https://example.com" target="_blank">External</aegov-link>');

      const anchor = await page.find('aegov-link a');
      const target = await anchor.getAttribute('target');
      expect(target).toBe('_blank');
    });

    it('should add rel="noopener noreferrer" for target="_blank"', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="https://example.com" target="_blank">External</aegov-link>');

      const anchor = await page.find('aegov-link a');
      const rel = await anchor.getAttribute('rel');
      expect(rel).toBe('noopener noreferrer');
    });

    it('should render with target="_self"', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test" target="_self">Link</aegov-link>');

      const anchor = await page.find('aegov-link a');
      const target = await anchor.getAttribute('target');
      expect(target).toBe('_self');
    });
  });

  describe('rel attribute', () => {
    it('should render with custom rel', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="https://example.com" rel="nofollow">Link</aegov-link>');

      const anchor = await page.find('aegov-link a');
      const rel = await anchor.getAttribute('rel');
      expect(rel).toBe('nofollow');
    });

    it('should allow custom rel to override default for target="_blank"', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="https://example.com" target="_blank" rel="noopener">Link</aegov-link>');

      const anchor = await page.find('aegov-link a');
      const rel = await anchor.getAttribute('rel');
      expect(rel).toBe('noopener');
    });
  });

  describe('data-* attributes', () => {
    it('should pass through data-testid', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test" data-testid="my-link">Link</aegov-link>');

      const anchor = await page.find('aegov-link a');
      const dataTestId = await anchor.getAttribute('data-testid');
      expect(dataTestId).toBe('my-link');
    });

    it('should pass through multiple data-* attributes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test" data-id="123" data-type="primary">Link</aegov-link>');

      const anchor = await page.find('aegov-link a');
      const dataId = await anchor.getAttribute('data-id');
      const dataType = await anchor.getAttribute('data-type');
      expect(dataId).toBe('123');
      expect(dataType).toBe('primary');
    });
  });

  describe('aria-* attributes', () => {
    it('should pass through aria-label', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test" aria-label="Go to test">Link</aegov-link>');

      const anchor = await page.find('aegov-link a');
      const ariaLabel = await anchor.getAttribute('aria-label');
      expect(ariaLabel).toBe('Go to test');
    });

    it('should pass through aria-current', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/current" aria-current="page">Current</aegov-link>');

      const anchor = await page.find('aegov-link a');
      const ariaCurrent = await anchor.getAttribute('aria-current');
      expect(ariaCurrent).toBe('page');
    });

    it('should pass through multiple aria-* attributes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test" aria-label="Test" aria-describedby="desc">Link</aegov-link>');

      const anchor = await page.find('aegov-link a');
      const ariaLabel = await anchor.getAttribute('aria-label');
      const ariaDescribedby = await anchor.getAttribute('aria-describedby');
      expect(ariaLabel).toBe('Test');
      expect(ariaDescribedby).toBe('desc');
    });
  });

  describe('click event', () => {
    it('should emit aegovLinkClick event when clicked', async () => {
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

    it('should have transition classes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test">Link</aegov-link>');

      const anchor = await page.find('aegov-link a');
      const classList = await anchor.getProperty('className');
      expect(classList).toContain('ease-in-out');
      expect(classList).toContain('duration-200');
    });

    it('should merge custom classes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test" class="custom-class">Link</aegov-link>');

      const anchor = await page.find('aegov-link a');
      const classList = await anchor.getProperty('className');
      expect(classList).toContain('custom-class');
      expect(classList).toContain('no-underline'); // Still has default
      expect(classList).toContain('transition-colors');
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
      expect(anchor.textContent).toContain('Visit Site');
    });
  });

  describe('accessibility', () => {
    it('should be keyboard accessible', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test">Link</aegov-link>');

      const anchor = await page.find('aegov-link a');
      expect(anchor).toBeTruthy();
      // Links are natively keyboard accessible via Tab and Enter keys
    });

    it('should support aria-label for screen readers', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-link href="/test" aria-label="Read more about tests">Learn More</aegov-link>');

      const anchor = await page.find('aegov-link a');
      const ariaLabel = await anchor.getAttribute('aria-label');
      expect(ariaLabel).toBe('Read more about tests');
    });
  });
});
