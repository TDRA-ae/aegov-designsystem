import { newSpecPage } from '@stencil/core/testing';
import { AegovLink } from './aegov-link';

describe('aegov-link', () => {
  describe('rendering', () => {
    it('should render with href', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test">Test Link</aegov-link>`,
      });

      expect(page.root).toBeTruthy();
      const anchor = page.root?.querySelector('a');
      expect(anchor).toBeTruthy();
      expect(anchor?.getAttribute('href')).toBe('/test');
    });

    it('should render with slot content', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test">Link Text</aegov-link>`,
      });

      const anchor = page.root?.querySelector('a');
      expect(anchor?.textContent).toContain('Link Text');
    });

    it('should render with HTML content in slot', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test"><strong>Bold</strong> Link</aegov-link>`,
      });

      const anchor = page.root?.querySelector('a');
      expect(anchor?.innerHTML).toContain('<strong>Bold</strong>');
    });
  });

  describe('href prop', () => {
    it('should render with absolute URL', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="https://example.com">External Link</aegov-link>`,
      });

      const anchor = page.root?.querySelector('a');
      expect(anchor?.getAttribute('href')).toBe('https://example.com');
    });

    it('should render with relative URL', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/about">About</aegov-link>`,
      });

      const anchor = page.root?.querySelector('a');
      expect(anchor?.getAttribute('href')).toBe('/about');
    });

    it('should render with anchor link', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="#section">Jump to Section</aegov-link>`,
      });

      const anchor = page.root?.querySelector('a');
      expect(anchor?.getAttribute('href')).toBe('#section');
    });
  });

  describe('title prop', () => {
    it('should render with title attribute', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test" title="Click here">Link</aegov-link>`,
      });

      const anchor = page.root?.querySelector('a');
      expect(anchor?.getAttribute('title')).toBe('Click here');
    });

    it('should not have title attribute when not provided', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test">Link</aegov-link>`,
      });

      const anchor = page.root?.querySelector('a');
      expect(anchor?.hasAttribute('title')).toBe(false);
    });
  });

  describe('target prop', () => {
    it('should render with target="_blank"', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="https://example.com" target="_blank">External</aegov-link>`,
      });

      const anchor = page.root?.querySelector('a');
      expect(anchor?.getAttribute('target')).toBe('_blank');
    });

    it('should automatically add rel="noopener noreferrer" for target="_blank"', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="https://example.com" target="_blank">External</aegov-link>`,
      });

      const anchor = page.root?.querySelector('a');
      expect(anchor?.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('should not have target attribute when not provided', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test">Link</aegov-link>`,
      });

      const anchor = page.root?.querySelector('a');
      expect(anchor?.hasAttribute('target')).toBe(false);
    });
  });

  describe('rel prop', () => {
    it('should render with custom rel attribute', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="https://example.com" rel="nofollow">Link</aegov-link>`,
      });

      const anchor = page.root?.querySelector('a');
      expect(anchor?.getAttribute('rel')).toBe('nofollow');
    });

    it('should override default rel for target="_blank"', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="https://example.com" target="_blank" rel="noopener">Link</aegov-link>`,
      });

      const anchor = page.root?.querySelector('a');
      expect(anchor?.getAttribute('rel')).toBe('noopener');
    });
  });

  describe('data-* attributes', () => {
    it('should pass through data-testid attribute', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test" data-testid="my-link">Link</aegov-link>`,
      });

      const anchor = page.root?.querySelector('a');
      expect(anchor?.getAttribute('data-testid')).toBe('my-link');
    });

    it('should pass through multiple data-* attributes', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test" data-id="123" data-type="primary" data-category="nav">Link</aegov-link>`,
      });

      const anchor = page.root?.querySelector('a');
      expect(anchor?.getAttribute('data-id')).toBe('123');
      expect(anchor?.getAttribute('data-type')).toBe('primary');
      expect(anchor?.getAttribute('data-category')).toBe('nav');
    });
  });

  describe('aria-* attributes', () => {
    it('should pass through aria-label attribute', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test" aria-label="Go to test page">Link</aegov-link>`,
      });

      const anchor = page.root?.querySelector('a');
      expect(anchor?.getAttribute('aria-label')).toBe('Go to test page');
    });

    it('should pass through aria-current attribute', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/current" aria-current="page">Current Page</aegov-link>`,
      });

      const anchor = page.root?.querySelector('a');
      expect(anchor?.getAttribute('aria-current')).toBe('page');
    });

    it('should pass through multiple aria-* attributes', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test" aria-label="Test link" aria-describedby="desc" aria-controls="panel">Link</aegov-link>`,
      });

      const anchor = page.root?.querySelector('a');
      expect(anchor?.getAttribute('aria-label')).toBe('Test link');
      expect(anchor?.getAttribute('aria-describedby')).toBe('desc');
      expect(anchor?.getAttribute('aria-controls')).toBe('panel');
    });
  });

  describe('combined attributes', () => {
    it('should handle data-* and aria-* attributes together', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test" data-id="123" aria-label="Test">Link</aegov-link>`,
      });

      const anchor = page.root?.querySelector('a');
      expect(anchor?.getAttribute('data-id')).toBe('123');
      expect(anchor?.getAttribute('aria-label')).toBe('Test');
    });
  });

  describe('click event', () => {
    it('should emit aegovLinkClick event when clicked', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test">Link</aegov-link>`,
      });

      const clickSpy = jest.fn();
      page.root?.addEventListener('aegovLinkClick', clickSpy);

      const anchor = page.root?.querySelector('a') as HTMLAnchorElement;
      anchor?.click();
      await page.waitForChanges();

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should emit event with href in detail', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test-page">Link</aegov-link>`,
      });

      let eventDetail: any;
      page.root?.addEventListener('aegovLinkClick', (e: any) => {
        eventDetail = e.detail;
      });

      const anchor = page.root?.querySelector('a') as HTMLAnchorElement;
      anchor?.click();
      await page.waitForChanges();

      expect(eventDetail).toBeTruthy();
      expect(eventDetail.href).toBe('/test-page');
    });
  });

  describe('CSS classes', () => {
    it('should apply default CSS classes', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test">Link</aegov-link>`,
      });

      const anchor = page.root?.querySelector('a');
      const classList = anchor?.className;
      expect(classList).toContain('no-underline');
      expect(classList).toContain('transition-colors');
      expect(classList).toContain('ease-in-out');
      expect(classList).toContain('duration-200');
    });

    it('should merge custom class prop', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test" class="custom-class">Link</aegov-link>`,
      });

      const component = page.rootInstance as AegovLink;
      expect(component.class).toBe('custom-class');

      const anchor = page.root?.querySelector('a');
      const classList = anchor?.className;
      expect(classList).toContain('custom-class');
      expect(classList).toContain('no-underline'); // Still has default classes
      expect(classList).toContain('transition-colors');
    });
  });

  describe('complete link', () => {
    it('should render complete link with all attributes', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `
          <aegov-link
            href="https://example.com"
            title="Visit Example"
            target="_blank"
            data-id="link-1"
            aria-label="External link to Example">
            Visit Example.com
          </aegov-link>
        `,
      });

      const anchor = page.root?.querySelector('a');
      expect(anchor?.getAttribute('href')).toBe('https://example.com');
      expect(anchor?.getAttribute('title')).toBe('Visit Example');
      expect(anchor?.getAttribute('target')).toBe('_blank');
      expect(anchor?.getAttribute('rel')).toBe('noopener noreferrer');
      expect(anchor?.getAttribute('data-id')).toBe('link-1');
      expect(anchor?.getAttribute('aria-label')).toBe('External link to Example');
      expect(anchor?.textContent).toContain('Visit Example.com');
    });
  });
});
