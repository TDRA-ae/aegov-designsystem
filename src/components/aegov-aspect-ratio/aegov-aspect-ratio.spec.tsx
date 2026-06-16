import { newSpecPage } from '@stencil/core/testing';
import { AegovAspectRatio } from './aegov-aspect-ratio';

describe('aegov-aspect-ratio', () => {
  it('renders with default ratio "auto"', async () => {
    const page = await newSpecPage({
      components: [AegovAspectRatio],
      html: `<aegov-aspect-ratio></aegov-aspect-ratio>`,
    });
    expect(page.root).toBeTruthy();
    const inner = page.root.querySelector('div.aegov-aspect-ratio') as HTMLElement;
    expect(inner).toBeTruthy();
    expect(inner.style.aspectRatio).toBe('auto');
  });

  it('applies square ratio (1 / 1)', async () => {
    const page = await newSpecPage({
      components: [AegovAspectRatio],
      html: `<aegov-aspect-ratio ratio="square"></aegov-aspect-ratio>`,
    });
    const inner = page.root.querySelector('div.aegov-aspect-ratio') as HTMLElement;
    expect(inner.style.aspectRatio).toBe('1 / 1');
  });

  it('applies video ratio (16 / 9)', async () => {
    const page = await newSpecPage({
      components: [AegovAspectRatio],
      html: `<aegov-aspect-ratio ratio="video"></aegov-aspect-ratio>`,
    });
    const inner = page.root.querySelector('div.aegov-aspect-ratio') as HTMLElement;
    expect(inner.style.aspectRatio).toBe('16 / 9');
  });

  it('applies a custom ratio like 21/9', async () => {
    const page = await newSpecPage({
      components: [AegovAspectRatio],
      html: `<aegov-aspect-ratio ratio="21/9"></aegov-aspect-ratio>`,
    });
    const inner = page.root.querySelector('div.aegov-aspect-ratio') as HTMLElement;
    expect(inner.style.aspectRatio).toBe('21 / 9');
  });

  it('falls back to "auto" for invalid base ratio', async () => {
    const page = await newSpecPage({
      components: [AegovAspectRatio],
      html: `<aegov-aspect-ratio ratio="not-a-ratio"></aegov-aspect-ratio>`,
    });
    const inner = page.root.querySelector('div.aegov-aspect-ratio') as HTMLElement;
    expect(inner.style.aspectRatio).toBe('auto');
  });

  it('reflects fit prop as data-fit', async () => {
    const page = await newSpecPage({
      components: [AegovAspectRatio],
      html: `<aegov-aspect-ratio fit="contain"></aegov-aspect-ratio>`,
    });
    const inner = page.root.querySelector('div.aegov-aspect-ratio') as HTMLElement;
    expect(inner.getAttribute('data-fit')).toBe('contain');
  });

  it('falls back to data-fit="cover" for invalid fit', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const page = await newSpecPage({
      components: [AegovAspectRatio],
      html: `<aegov-aspect-ratio fit="bogus"></aegov-aspect-ratio>`,
    });
    const inner = page.root.querySelector('div.aegov-aspect-ratio') as HTMLElement;
    expect(inner.getAttribute('data-fit')).toBe('cover');
    warnSpy.mockRestore();
  });

  it('appends extraClass to the inner container', async () => {
    const page = await newSpecPage({
      components: [AegovAspectRatio],
      html: `<aegov-aspect-ratio extra-class="my-extra"></aegov-aspect-ratio>`,
    });
    const inner = page.root.querySelector('div.aegov-aspect-ratio') as HTMLElement;
    expect(inner.classList.contains('my-extra')).toBe(true);
  });

  it('renders default slot content', async () => {
    const page = await newSpecPage({
      components: [AegovAspectRatio],
      html: `<aegov-aspect-ratio><img alt="x"/></aegov-aspect-ratio>`,
    });
    expect(page.root.querySelector('img')).toBeTruthy();
  });

  it('updates ratio style when ratio prop changes', async () => {
    const page = await newSpecPage({
      components: [AegovAspectRatio],
      html: `<aegov-aspect-ratio ratio="square"></aegov-aspect-ratio>`,
    });
    page.rootInstance.ratio = 'video';
    await page.waitForChanges();
    const inner = page.root.querySelector('div.aegov-aspect-ratio') as HTMLElement;
    expect(inner.style.aspectRatio).toBe('16 / 9');
  });
});
