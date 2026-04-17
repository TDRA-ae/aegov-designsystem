import { newSpecPage } from '@stencil/core/testing';
import { AegovAspectRatio } from './aegov-aspect-ratio';

describe('aegov-aspect-ratio', () => {
  describe('rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `<aegov-aspect-ratio><img src="test.jpg" alt="test" /></aegov-aspect-ratio>`,
      });

      const container = page.root.querySelector('.aegov-aspect-ratio') as HTMLElement;
      expect(container).toBeTruthy();
      expect(container.getAttribute('data-fit')).toBe('cover');
      expect(container.style.aspectRatio).toBe('auto');
    });

    it('should render slotted image content', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `
          <aegov-aspect-ratio ratio="video">
            <img src="photo.jpg" alt="Photo" />
          </aegov-aspect-ratio>
        `,
      });

      const img = page.root.querySelector('img');
      expect(img).toBeTruthy();
      expect(img.getAttribute('src')).toBe('photo.jpg');
    });

    it('should render slotted video content', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `
          <aegov-aspect-ratio ratio="video">
            <video src="clip.mp4"></video>
          </aegov-aspect-ratio>
        `,
      });

      const video = page.root.querySelector('video');
      expect(video).toBeTruthy();
    });

    it('should render slotted iframe content', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `
          <aegov-aspect-ratio ratio="16/9">
            <iframe src="https://example.com"></iframe>
          </aegov-aspect-ratio>
        `,
      });

      const iframe = page.root.querySelector('iframe');
      expect(iframe).toBeTruthy();
    });

    it('should render arbitrary slotted content', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `
          <aegov-aspect-ratio ratio="square">
            <div class="custom-content">Hello</div>
          </aegov-aspect-ratio>
        `,
      });

      const content = page.root.querySelector('.custom-content');
      expect(content).toBeTruthy();
      expect(content.textContent).toBe('Hello');
    });

    it('should have aegov-aspect-ratio class on container', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `<aegov-aspect-ratio><img src="t.jpg" alt="" /></aegov-aspect-ratio>`,
      });

      const container = page.root.querySelector('.aegov-aspect-ratio') as HTMLElement;
      expect(container).toBeTruthy();
    });
  });

  describe('ratio prop', () => {
    it('should default to auto', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `<aegov-aspect-ratio><img src="t.jpg" alt="" /></aegov-aspect-ratio>`,
      });

      expect(page.rootInstance.ratio).toBe('auto');
      const container = page.root.querySelector('.aegov-aspect-ratio') as HTMLElement;
      expect(container.style.aspectRatio).toBe('auto');
    });

    it('should resolve "square" to "1 / 1"', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `<aegov-aspect-ratio ratio="square"><img src="t.jpg" alt="" /></aegov-aspect-ratio>`,
      });

      const container = page.root.querySelector('.aegov-aspect-ratio') as HTMLElement;
      expect(container.style.aspectRatio).toBe('1 / 1');
    });

    it('should resolve "video" to "16 / 9"', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `<aegov-aspect-ratio ratio="video"><img src="t.jpg" alt="" /></aegov-aspect-ratio>`,
      });

      const container = page.root.querySelector('.aegov-aspect-ratio') as HTMLElement;
      expect(container.style.aspectRatio).toBe('16 / 9');
    });

    it('should resolve "4/3" to "4 / 3"', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `<aegov-aspect-ratio ratio="4/3"><img src="t.jpg" alt="" /></aegov-aspect-ratio>`,
      });

      const container = page.root.querySelector('.aegov-aspect-ratio') as HTMLElement;
      expect(container.style.aspectRatio).toBe('4 / 3');
    });

    it('should resolve "3/2" to "3 / 2"', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `<aegov-aspect-ratio ratio="3/2"><img src="t.jpg" alt="" /></aegov-aspect-ratio>`,
      });

      const container = page.root.querySelector('.aegov-aspect-ratio') as HTMLElement;
      expect(container.style.aspectRatio).toBe('3 / 2');
    });

    it('should resolve "21/9" to "21 / 9"', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `<aegov-aspect-ratio ratio="21/9"><img src="t.jpg" alt="" /></aegov-aspect-ratio>`,
      });

      const container = page.root.querySelector('.aegov-aspect-ratio') as HTMLElement;
      expect(container.style.aspectRatio).toBe('21 / 9');
    });

    it('should handle custom ratio "5/4"', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `<aegov-aspect-ratio ratio="5/4"><img src="t.jpg" alt="" /></aegov-aspect-ratio>`,
      });

      const container = page.root.querySelector('.aegov-aspect-ratio') as HTMLElement;
      expect(container.style.aspectRatio).toBe('5 / 4');
    });

    it('should handle ratio with spaces "16 / 9"', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `<aegov-aspect-ratio ratio="16 / 9"><img src="t.jpg" alt="" /></aegov-aspect-ratio>`,
      });

      const container = page.root.querySelector('.aegov-aspect-ratio') as HTMLElement;
      expect(container.style.aspectRatio).toBe('16 / 9');
    });

    it('should pass through non-standard ratio values', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `<aegov-aspect-ratio ratio="2.35"><img src="t.jpg" alt="" /></aegov-aspect-ratio>`,
      });

      const container = page.root.querySelector('.aegov-aspect-ratio') as HTMLElement;
      expect(container.style.aspectRatio).toBe('2.35');
    });
  });

  describe('fit prop', () => {
    it('should default to cover', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `<aegov-aspect-ratio><img src="t.jpg" alt="" /></aegov-aspect-ratio>`,
      });

      expect(page.rootInstance.fit).toBe('cover');
      const container = page.root.querySelector('.aegov-aspect-ratio') as HTMLElement;
      expect(container.getAttribute('data-fit')).toBe('cover');
    });

    it('should accept contain', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `<aegov-aspect-ratio fit="contain"><img src="t.jpg" alt="" /></aegov-aspect-ratio>`,
      });

      const container = page.root.querySelector('.aegov-aspect-ratio') as HTMLElement;
      expect(container.getAttribute('data-fit')).toBe('contain');
    });

    it('should accept fill', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `<aegov-aspect-ratio fit="fill"><img src="t.jpg" alt="" /></aegov-aspect-ratio>`,
      });

      const container = page.root.querySelector('.aegov-aspect-ratio') as HTMLElement;
      expect(container.getAttribute('data-fit')).toBe('fill');
    });

    it('should accept none', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `<aegov-aspect-ratio fit="none"><img src="t.jpg" alt="" /></aegov-aspect-ratio>`,
      });

      const container = page.root.querySelector('.aegov-aspect-ratio') as HTMLElement;
      expect(container.getAttribute('data-fit')).toBe('none');
    });

    it('should accept scale-down', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `<aegov-aspect-ratio fit="scale-down"><img src="t.jpg" alt="" /></aegov-aspect-ratio>`,
      });

      const container = page.root.querySelector('.aegov-aspect-ratio') as HTMLElement;
      expect(container.getAttribute('data-fit')).toBe('scale-down');
    });
  });

  describe('inner-class prop', () => {
    it('should not add extra classes when inner-class is not set', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `<aegov-aspect-ratio><img src="t.jpg" alt="" /></aegov-aspect-ratio>`,
      });

      const container = page.root.querySelector('.aegov-aspect-ratio') as HTMLElement;
      expect(container.className).toBe('aegov-aspect-ratio');
    });

    it('should add inner-class to container', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `<aegov-aspect-ratio inner-class="rounded-lg shadow-md"><img src="t.jpg" alt="" /></aegov-aspect-ratio>`,
      });

      const container = page.root.querySelector('.aegov-aspect-ratio') as HTMLElement;
      expect(container.className).toContain('aegov-aspect-ratio');
      expect(container.className).toContain('rounded-lg');
      expect(container.className).toContain('shadow-md');
    });

    it('should support responsive breakpoint classes', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `<aegov-aspect-ratio inner-class="md:aspect-square lg:aspect-video"><img src="t.jpg" alt="" /></aegov-aspect-ratio>`,
      });

      const container = page.root.querySelector('.aegov-aspect-ratio') as HTMLElement;
      expect(container.className).toContain('md:aspect-square');
      expect(container.className).toContain('lg:aspect-video');
    });
  });

  describe('combined props', () => {
    it('should handle ratio + fit together', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `
          <aegov-aspect-ratio ratio="video" fit="contain">
            <img src="t.jpg" alt="" />
          </aegov-aspect-ratio>
        `,
      });

      const container = page.root.querySelector('.aegov-aspect-ratio') as HTMLElement;
      expect(container.style.aspectRatio).toBe('16 / 9');
      expect(container.getAttribute('data-fit')).toBe('contain');
    });

    it('should handle ratio + fit + inner-class together', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `
          <aegov-aspect-ratio ratio="square" fit="cover" inner-class="rounded-full bg-slate-100">
            <img src="t.jpg" alt="" />
          </aegov-aspect-ratio>
        `,
      });

      const container = page.root.querySelector('.aegov-aspect-ratio') as HTMLElement;
      expect(container.style.aspectRatio).toBe('1 / 1');
      expect(container.getAttribute('data-fit')).toBe('cover');
      expect(container.className).toContain('rounded-full');
      expect(container.className).toContain('bg-slate-100');
    });
  });

  describe('invalid prop values', () => {
    let warnSpy: jest.SpyInstance;

    beforeEach(() => {
      warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    });

    afterEach(() => {
      warnSpy.mockRestore();
    });

    it('falls back to default fit when invalid', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `<aegov-aspect-ratio fit="weird"></aegov-aspect-ratio>`,
      });
      const container = page.root.querySelector('.aegov-aspect-ratio') as HTMLElement;
      expect(container.getAttribute('data-fit')).toBe('cover');
    });

    it('warns with component name, prop name, invalid value, and fallback', async () => {
      await newSpecPage({
        components: [AegovAspectRatio],
        html: `<aegov-aspect-ratio fit="weird"></aegov-aspect-ratio>`,
      });
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const warn = messages.find(m => m.includes('[aegov-aspect-ratio]') && m.includes('"fit"'));
      expect(warn).toBeDefined();
      expect(warn).toContain('"weird"');
      expect(warn).toContain('cover');
    });

    it('does not warn when fit is valid', async () => {
      await newSpecPage({
        components: [AegovAspectRatio],
        html: `<aegov-aspect-ratio fit="contain"></aegov-aspect-ratio>`,
      });
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('warns again via @Watch when fit is updated to invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovAspectRatio],
        html: `<aegov-aspect-ratio fit="cover"></aegov-aspect-ratio>`,
      });
      page.root.setAttribute('fit', 'nope');
      await page.waitForChanges();
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const warn = messages.find(m => m.includes('[aegov-aspect-ratio]') && m.includes('"fit"'));
      expect(warn).toBeDefined();
    });
  });
});
