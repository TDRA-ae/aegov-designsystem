import { newSpecPage } from '@stencil/core/testing';
import { AegovTitle } from './aegov-title';

describe('aegov-title', () => {
  it('renders with default size and tag <p>', async () => {
    const page = await newSpecPage({
      components: [AegovTitle],
      html: `<aegov-title>Hello</aegov-title>`,
    });
    expect(page.root).toBeTruthy();
    const p = page.root.querySelector('p');
    expect(p).toBeTruthy();
    expect(p.classList.contains('text-lg!')).toBe(true);
  });

  it('auto-generates a fieldId when none provided', async () => {
    const page = await newSpecPage({
      components: [AegovTitle],
      html: `<aegov-title>Hello</aegov-title>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-title-\d+$/);
    const inner = page.root.querySelector('p');
    expect(inner.id).toBe(page.rootInstance.fieldId);
  });

  it('respects an explicit fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovTitle],
      html: `<aegov-title field-id="my-title">Hello</aegov-title>`,
    });
    expect(page.rootInstance.fieldId).toBe('my-title');
    expect(page.root.querySelector('p').id).toBe('my-title');
  });

  it('renders heading-type="h2" wrapper tag', async () => {
    const page = await newSpecPage({
      components: [AegovTitle],
      html: `<aegov-title heading-type="h2">x</aegov-title>`,
    });
    expect(page.root.querySelector('h2')).toBeTruthy();
    expect(page.root.querySelector('p')).toBeNull();
  });

  it('applies size="sm" class', async () => {
    const page = await newSpecPage({
      components: [AegovTitle],
      html: `<aegov-title size="sm">x</aegov-title>`,
    });
    expect(page.root.querySelector('p').classList.contains('text-base!')).toBe(true);
  });

  it('applies size="2xl" class', async () => {
    const page = await newSpecPage({
      components: [AegovTitle],
      html: `<aegov-title size="2xl">x</aegov-title>`,
    });
    expect(page.root.querySelector('p').classList.contains('text-3xl!')).toBe(true);
  });

  it('appends extraClass to the rendered tag', async () => {
    const page = await newSpecPage({
      components: [AegovTitle],
      html: `<aegov-title extra-class="my-extra">x</aegov-title>`,
    });
    expect(page.root.querySelector('p').classList.contains('my-extra')).toBe(true);
  });

  it('passes through aria-* and data-*', async () => {
    const page = await newSpecPage({
      components: [AegovTitle],
      html: `<aegov-title aria-label="hi" data-x="1">x</aegov-title>`,
    });
    const p = page.root.querySelector('p');
    expect(p.getAttribute('aria-label')).toBe('hi');
    expect(p.getAttribute('data-x')).toBe('1');
  });

  it('renders default slot content', async () => {
    const page = await newSpecPage({
      components: [AegovTitle],
      html: `<aegov-title>Slotted</aegov-title>`,
    });
    expect(page.root.textContent).toContain('Slotted');
  });

  it('updates classes when size prop changes', async () => {
    const page = await newSpecPage({
      components: [AegovTitle],
      html: `<aegov-title size="sm">x</aegov-title>`,
    });
    page.rootInstance.size = 'xl';
    await page.waitForChanges();
    expect(page.root.querySelector('p').classList.contains('text-2xl!')).toBe(true);
  });
});
