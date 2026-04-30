import { newSpecPage } from '@stencil/core/testing';
import { AegovLink } from './aegov-link';

describe('aegov-link', () => {
  // ------------------------------------------------------------------ rendering
  describe('rendering', () => {
    it('renders an anchor element', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test">Test</aegov-link>`,
      });
      const a = page.root.querySelector('a');
      expect(a).not.toBeNull();
    });

    it('renders slot content inside anchor', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test">Link Text</aegov-link>`,
      });
      const a = page.root.querySelector('a');
      expect(a.textContent).toContain('Link Text');
    });

    it('renders HTML content in slot', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test"><strong>Bold</strong> Link</aegov-link>`,
      });
      const a = page.root.querySelector('a');
      expect(a.innerHTML).toContain('<strong>Bold</strong>');
    });
  });

  // ------------------------------------------------------------------ href prop
  describe('href prop', () => {
    it('renders absolute URL', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="https://example.com">External</aegov-link>`,
      });
      const a = page.root.querySelector('a');
      expect(a.getAttribute('href')).toBe('https://example.com');
    });

    it('renders relative URL', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/about">About</aegov-link>`,
      });
      const a = page.root.querySelector('a');
      expect(a.getAttribute('href')).toBe('/about');
    });

    it('renders anchor link', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="#section">Jump</aegov-link>`,
      });
      const a = page.root.querySelector('a');
      expect(a.getAttribute('href')).toBe('#section');
    });
  });

  // ------------------------------------------------------------------ target prop
  describe('target prop', () => {
    it('renders with target="_blank"', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="https://example.com" target="_blank">External</aegov-link>`,
      });
      const a = page.root.querySelector('a');
      expect(a.getAttribute('target')).toBe('_blank');
    });

    it('does not have target when not provided', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test">Link</aegov-link>`,
      });
      const a = page.root.querySelector('a');
      expect(a.hasAttribute('target')).toBe(false);
    });

    it('auto-adds rel="noopener noreferrer" for target="_blank"', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="https://example.com" target="_blank">External</aegov-link>`,
      });
      const a = page.root.querySelector('a');
      expect(a.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });

  // ------------------------------------------------------------------ rel prop
  describe('rel prop', () => {
    it('renders with custom rel', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="https://example.com" rel="nofollow">Link</aegov-link>`,
      });
      const a = page.root.querySelector('a');
      expect(a.getAttribute('rel')).toBe('nofollow');
    });

    it('custom rel overrides default for target="_blank"', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="https://example.com" target="_blank" rel="noopener">Link</aegov-link>`,
      });
      const a = page.root.querySelector('a');
      expect(a.getAttribute('rel')).toBe('noopener');
    });
  });

  // ------------------------------------------------------------------ pass-through attributes
  describe('pass-through attributes', () => {
    it('passes data-* attributes to anchor', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test" data-testid="my-link">Link</aegov-link>`,
      });
      const a = page.root.querySelector('a');
      expect(a.getAttribute('data-testid')).toBe('my-link');
    });

    it('passes multiple data-* attributes', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test" data-id="123" data-type="primary">Link</aegov-link>`,
      });
      const a = page.root.querySelector('a');
      expect(a.getAttribute('data-id')).toBe('123');
      expect(a.getAttribute('data-type')).toBe('primary');
    });

    it('passes aria-* attributes to anchor', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test" aria-label="Go to test page">Link</aegov-link>`,
      });
      const a = page.root.querySelector('a');
      expect(a.getAttribute('aria-label')).toBe('Go to test page');
    });

    it('passes multiple aria-* attributes', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test" aria-label="Test" aria-describedby="desc" aria-controls="panel">Link</aegov-link>`,
      });
      const a = page.root.querySelector('a');
      expect(a.getAttribute('aria-label')).toBe('Test');
      expect(a.getAttribute('aria-describedby')).toBe('desc');
      expect(a.getAttribute('aria-controls')).toBe('panel');
    });

    it('passes title attribute to anchor', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test" title="Click here">Link</aegov-link>`,
      });
      const a = page.root.querySelector('a');
      expect(a.getAttribute('title')).toBe('Click here');
    });

    it('passes id attribute to anchor', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test" id="main-link">Link</aegov-link>`,
      });
      const a = page.root.querySelector('a');
      expect(a.getAttribute('id')).toBe('main-link');
    });

    it('does not have title when not provided', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test">Link</aegov-link>`,
      });
      const a = page.root.querySelector('a');
      expect(a.hasAttribute('title')).toBe(false);
    });
  });

  // ------------------------------------------------------------------ CSS classes
  describe('CSS classes', () => {
    it('applies default CSS classes', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test">Link</aegov-link>`,
      });
      const a = page.root.querySelector('a');
      expect(a.className).toContain('no-underline');
      expect(a.className).toContain('transition-colors');
      expect(a.className).toContain('ease-in-out');
      expect(a.className).toContain('duration-200');
      expect(a.className).toContain('text-primary-600');
    });

    it('merges custom class prop', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test" extra-class="custom-class">Link</aegov-link>`,
      });
      const a = page.root.querySelector('a');
      expect(a.className).toContain('custom-class');
      expect(a.className).toContain('no-underline');
    });
  });

  // ------------------------------------------------------------------ click event
  describe('click event', () => {
    it('emits aegovLinkClick when clicked', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test">Link</aegov-link>`,
      });
      const clickSpy = jest.fn();
      page.root.addEventListener('aegovLinkClick', clickSpy);

      const a = page.root.querySelector('a') as HTMLAnchorElement;
      a.click();
      await page.waitForChanges();

      expect(clickSpy).toHaveBeenCalled();
    });

    it('emits event with href in detail', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test-page">Link</aegov-link>`,
      });
      let eventDetail: any;
      page.root.addEventListener('aegovLinkClick', (e: any) => {
        eventDetail = e.detail;
      });

      const a = page.root.querySelector('a') as HTMLAnchorElement;
      a.click();
      await page.waitForChanges();

      expect(eventDetail).toBeTruthy();
      expect(eventDetail.href).toBe('/test-page');
    });
  });

  // ------------------------------------------------------------------ complete link
  describe('complete link', () => {
    it('renders with all attributes together', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `
          <aegov-link
            href="https://example.com"
            title="Visit Example"
            target="_blank"
            data-id="link-1"
            aria-label="External link">
            Visit Site
          </aegov-link>
        `,
      });
      const a = page.root.querySelector('a');
      expect(a.getAttribute('href')).toBe('https://example.com');
      expect(a.getAttribute('title')).toBe('Visit Example');
      expect(a.getAttribute('target')).toBe('_blank');
      expect(a.getAttribute('rel')).toBe('noopener noreferrer');
      expect(a.getAttribute('data-id')).toBe('link-1');
      expect(a.getAttribute('aria-label')).toBe('External link');
      expect(a.textContent).toContain('Visit Site');
    });
  });

  // ------------------------------------------------------------------ invalid prop values
  describe('invalid prop values', () => {
    let warnSpy: jest.SpyInstance;

    beforeEach(() => {
      warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    });

    afterEach(() => {
      warnSpy.mockRestore();
    });

    it('still renders the anchor when target is invalid', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test" target="nowhere">Link</aegov-link>`,
      });
      const a = page.root.querySelector('a');
      expect(a).toBeTruthy();
    });

    it('warns with component name, prop name, and invalid value', async () => {
      await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test" target="nowhere">Link</aegov-link>`,
      });
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const targetWarn = messages.find(m => m.includes('[aegov-link]') && m.includes('"nowhere"'));
      expect(targetWarn).toBeDefined();
      expect(targetWarn).toContain('"target"');
    });

    it('does not warn when target is undefined', async () => {
      await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test">Link</aegov-link>`,
      });
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('does not warn when all props are valid', async () => {
      await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test" target="_blank">Link</aegov-link>`,
      });
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('warns again via @Watch when target is updated to an invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/test" target="_blank">Link</aegov-link>`,
      });
      expect(warnSpy).not.toHaveBeenCalled();

      page.root.setAttribute('target', 'nope');
      await page.waitForChanges();

      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const invalidWarn = messages.find(m => m.includes('[aegov-link]') && m.includes('"nope"'));
      expect(invalidWarn).toBeDefined();
      expect(invalidWarn).toContain('"target"');
    });
  });
});
