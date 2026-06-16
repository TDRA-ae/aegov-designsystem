import { newSpecPage } from '@stencil/core/testing';
import { AegovText } from './aegov-text';

describe('aegov-text', () => {
  it('renders with default size base', async () => {
    const page = await newSpecPage({
      components: [AegovText],
      html: `<aegov-text>Hello</aegov-text>`,
    });
    expect(page.root).toBeTruthy();
    const p = page.root.querySelector('p');
    expect(p).toBeTruthy();
    expect(p.classList.contains('text-base')).toBe(true);
  });

  it('applies size="sm" class', async () => {
    const page = await newSpecPage({
      components: [AegovText],
      html: `<aegov-text size="sm">x</aegov-text>`,
    });
    expect(page.root.querySelector('p').classList.contains('text-sm')).toBe(true);
  });

  it('applies size="lg" class', async () => {
    const page = await newSpecPage({
      components: [AegovText],
      html: `<aegov-text size="lg">x</aegov-text>`,
    });
    expect(page.root.querySelector('p').classList.contains('text-lg')).toBe(true);
  });

  it('appends extraClass to the rendered <p>', async () => {
    const page = await newSpecPage({
      components: [AegovText],
      html: `<aegov-text extra-class="my-extra">x</aegov-text>`,
    });
    expect(page.root.querySelector('p').classList.contains('my-extra')).toBe(true);
  });

  it('passes through aria-* and data-* attributes', async () => {
    const page = await newSpecPage({
      components: [AegovText],
      html: `<aegov-text aria-label="hello" data-test="value">x</aegov-text>`,
    });
    const p = page.root.querySelector('p');
    expect(p.getAttribute('aria-label')).toBe('hello');
    expect(p.getAttribute('data-test')).toBe('value');
  });

  it('renders default slot content', async () => {
    const page = await newSpecPage({
      components: [AegovText],
      html: `<aegov-text>Slotted text</aegov-text>`,
    });
    expect(page.root.textContent).toContain('Slotted text');
  });

  it('updates resolved class when size prop changes', async () => {
    const page = await newSpecPage({
      components: [AegovText],
      html: `<aegov-text size="sm">x</aegov-text>`,
    });
    page.rootInstance.size = 'lg';
    await page.waitForChanges();
    expect(page.root.querySelector('p').classList.contains('text-lg')).toBe(true);
  });

  it('falls back to base class when size value is invalid', async () => {
    const page = await newSpecPage({
      components: [AegovText],
      html: `<aegov-text size="huge">x</aegov-text>`,
    });
    expect(page.root.querySelector('p').classList.contains('text-base')).toBe(true);
  });
});
