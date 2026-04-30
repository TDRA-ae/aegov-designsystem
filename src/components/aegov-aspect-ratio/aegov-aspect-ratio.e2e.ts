import { newE2EPage } from '@stencil/core/testing';

describe('aegov-aspect-ratio E2E', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-aspect-ratio><img src="https://picsum.photos/400/300" alt="test" /></aegov-aspect-ratio>`);
      const element = await page.find('aegov-aspect-ratio');
      expect(element).not.toBeNull();
    });

    it('should render inner container with aegov-aspect-ratio class', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-aspect-ratio><img src="https://picsum.photos/400/300" alt="test" /></aegov-aspect-ratio>`);
      const container = await page.find('aegov-aspect-ratio .aegov-aspect-ratio');
      expect(container).toBeTruthy();
    });

    it('should render slotted image', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-aspect-ratio ratio="video">
          <img src="https://picsum.photos/400/300" alt="Photo" />
        </aegov-aspect-ratio>
      `);
      const img = await page.find('aegov-aspect-ratio img');
      expect(img).toBeTruthy();
      expect(img.getAttribute('alt')).toBe('Photo');
    });

    it('should render slotted video element', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-aspect-ratio ratio="video">
          <video><source src="clip.mp4" type="video/mp4" /></video>
        </aegov-aspect-ratio>
      `);
      const video = await page.find('aegov-aspect-ratio video');
      expect(video).toBeTruthy();
    });

    it('should render slotted iframe', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-aspect-ratio ratio="16/9">
          <iframe src="about:blank"></iframe>
        </aegov-aspect-ratio>
      `);
      const iframe = await page.find('aegov-aspect-ratio iframe');
      expect(iframe).toBeTruthy();
    });

    it('should render arbitrary slotted content', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-aspect-ratio ratio="square">
          <div class="my-content">Custom</div>
        </aegov-aspect-ratio>
      `);
      const content = await page.find('aegov-aspect-ratio .my-content');
      expect(content).toBeTruthy();
      expect(content.textContent).toBe('Custom');
    });
  });

  describe('ratio prop', () => {
    it('should apply auto aspect-ratio by default', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-aspect-ratio><img src="https://picsum.photos/400/300" alt="" /></aegov-aspect-ratio>`);
      const container = await page.find('aegov-aspect-ratio .aegov-aspect-ratio');
      const style = await container.getAttribute('style');
      expect(style).toContain('aspect-ratio: auto');
    });

    it('should apply 1/1 for square ratio', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-aspect-ratio ratio="square"><img src="https://picsum.photos/400/300" alt="" /></aegov-aspect-ratio>`);
      const container = await page.find('aegov-aspect-ratio .aegov-aspect-ratio');
      const style = await container.getAttribute('style');
      expect(style).toContain('1 / 1');
    });

    it('should apply 16/9 for video ratio', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-aspect-ratio ratio="video"><img src="https://picsum.photos/400/300" alt="" /></aegov-aspect-ratio>`);
      const container = await page.find('aegov-aspect-ratio .aegov-aspect-ratio');
      const style = await container.getAttribute('style');
      expect(style).toContain('16 / 9');
    });

    it('should apply 4/3 ratio', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-aspect-ratio ratio="4/3"><img src="https://picsum.photos/400/300" alt="" /></aegov-aspect-ratio>`);
      const container = await page.find('aegov-aspect-ratio .aegov-aspect-ratio');
      const style = await container.getAttribute('style');
      expect(style).toContain('4 / 3');
    });

    it('should apply 3/2 ratio', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-aspect-ratio ratio="3/2"><img src="https://picsum.photos/400/300" alt="" /></aegov-aspect-ratio>`);
      const container = await page.find('aegov-aspect-ratio .aegov-aspect-ratio');
      const style = await container.getAttribute('style');
      expect(style).toContain('3 / 2');
    });

    it('should apply 21/9 ultrawide ratio', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-aspect-ratio ratio="21/9"><img src="https://picsum.photos/400/300" alt="" /></aegov-aspect-ratio>`);
      const container = await page.find('aegov-aspect-ratio .aegov-aspect-ratio');
      const style = await container.getAttribute('style');
      expect(style).toContain('21 / 9');
    });

    it('should apply custom ratio "5/4"', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-aspect-ratio ratio="5/4"><img src="https://picsum.photos/400/300" alt="" /></aegov-aspect-ratio>`);
      const container = await page.find('aegov-aspect-ratio .aegov-aspect-ratio');
      const style = await container.getAttribute('style');
      expect(style).toContain('5 / 4');
    });
  });

  describe('fit prop', () => {
    it('should set data-fit to cover by default', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-aspect-ratio ratio="video"><img src="https://picsum.photos/400/300" alt="" /></aegov-aspect-ratio>`);
      const container = await page.find('aegov-aspect-ratio .aegov-aspect-ratio');
      expect(container.getAttribute('data-fit')).toBe('cover');
    });

    it('should set data-fit to contain', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-aspect-ratio ratio="video" fit="contain"><img src="https://picsum.photos/400/300" alt="" /></aegov-aspect-ratio>`);
      const container = await page.find('aegov-aspect-ratio .aegov-aspect-ratio');
      expect(container.getAttribute('data-fit')).toBe('contain');
    });

    it('should set data-fit to fill', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-aspect-ratio ratio="video" fit="fill"><img src="https://picsum.photos/400/300" alt="" /></aegov-aspect-ratio>`);
      const container = await page.find('aegov-aspect-ratio .aegov-aspect-ratio');
      expect(container.getAttribute('data-fit')).toBe('fill');
    });

    it('should set data-fit to none', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-aspect-ratio ratio="video" fit="none"><img src="https://picsum.photos/400/300" alt="" /></aegov-aspect-ratio>`);
      const container = await page.find('aegov-aspect-ratio .aegov-aspect-ratio');
      expect(container.getAttribute('data-fit')).toBe('none');
    });

    it('should set data-fit to scale-down', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-aspect-ratio ratio="video" fit="scale-down"><img src="https://picsum.photos/400/300" alt="" /></aegov-aspect-ratio>`);
      const container = await page.find('aegov-aspect-ratio .aegov-aspect-ratio');
      expect(container.getAttribute('data-fit')).toBe('scale-down');
    });

    it('should apply object-fit cover style to images', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-aspect-ratio ratio="square" fit="cover">
          <img src="https://picsum.photos/400/300" alt="" />
        </aegov-aspect-ratio>
      `);
      const img = await page.find('aegov-aspect-ratio img');
      const computedStyle = await img.getComputedStyle();
      expect(computedStyle['object-fit']).toBe('cover');
    });

    it('should apply object-fit contain style to images', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-aspect-ratio ratio="square" fit="contain">
          <img src="https://picsum.photos/400/300" alt="" />
        </aegov-aspect-ratio>
      `);
      const img = await page.find('aegov-aspect-ratio img');
      const computedStyle = await img.getComputedStyle();
      expect(computedStyle['object-fit']).toBe('contain');
    });
  });


  describe('host element', () => {
    it('should be a block-level element', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-aspect-ratio><img src="https://picsum.photos/400/300" alt="" /></aegov-aspect-ratio>`);
      const host = await page.find('aegov-aspect-ratio');
      const computedStyle = await host.getComputedStyle();
      expect(computedStyle.display).toBe('block');
    });
  });

  describe('combined usage', () => {

    it('should work with video inside square container', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-aspect-ratio ratio="square" fit="cover">
          <video><source src="clip.mp4" type="video/mp4" /></video>
        </aegov-aspect-ratio>
      `);
      const container = await page.find('aegov-aspect-ratio .aegov-aspect-ratio');
      const style = await container.getAttribute('style');
      expect(style).toContain('1 / 1');
      expect(container.getAttribute('data-fit')).toBe('cover');
    });
  });
});
