import { newSpecPage } from '@stencil/core/testing';
import { AegovBadge } from './aegov-badge';

describe('aegov-badge', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [AegovBadge],
      html: `<aegov-badge>New</aegov-badge>`,
    });
    const span = page.root.querySelector('span');
    expect(span).not.toBeNull();
    expect(span.className).toContain('aegov-badge');
    expect(span.className).toContain('badge-soft');
    expect(span.className).toContain('badge-default');
    expect(page.root.textContent).toContain('New');
  });

  it('auto-generates fieldId when not provided', async () => {
    const page = await newSpecPage({
      components: [AegovBadge],
      html: `<aegov-badge>Tag</aegov-badge>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-badge-\d+$/);
    const span = page.root.querySelector('span');
    expect(span.id).toBe(page.rootInstance.fieldId);
  });

  it('respects user-provided fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovBadge],
      html: `<aegov-badge field-id="my-badge">X</aegov-badge>`,
    });
    expect(page.rootInstance.fieldId).toBe('my-badge');
    expect(page.root.querySelector('span').id).toBe('my-badge');
  });

  it('applies appearance="solid" class', async () => {
    const page = await newSpecPage({
      components: [AegovBadge],
      html: `<aegov-badge appearance="solid">X</aegov-badge>`,
    });
    expect(page.root.querySelector('span').className).toContain('badge-solid');
  });

  it('applies color class', async () => {
    const page = await newSpecPage({
      components: [AegovBadge],
      html: `<aegov-badge color="aered">X</aegov-badge>`,
    });
    expect(page.root.querySelector('span').className).toContain('badge-aered');
  });

  it('applies size classes (base default)', async () => {
    const page = await newSpecPage({
      components: [AegovBadge],
      html: `<aegov-badge>X</aegov-badge>`,
    });
    const cls = page.root.querySelector('span').className;
    expect(cls).toContain('text-sm');
    expect(cls).toContain('rounded-md');
  });

  it('applies size="sm" classes', async () => {
    const page = await newSpecPage({
      components: [AegovBadge],
      html: `<aegov-badge size="sm">X</aegov-badge>`,
    });
    const cls = page.root.querySelector('span').className;
    expect(cls).toContain('text-xs');
    expect(cls).toContain('rounded-sm');
  });

  it('applies size="lg" classes', async () => {
    const page = await newSpecPage({
      components: [AegovBadge],
      html: `<aegov-badge size="lg">X</aegov-badge>`,
    });
    const cls = page.root.querySelector('span').className;
    expect(cls).toContain('font-medium');
  });

  it('does not render dismiss button by default', async () => {
    const page = await newSpecPage({
      components: [AegovBadge],
      html: `<aegov-badge>X</aegov-badge>`,
    });
    expect(page.root.querySelector('button.badge-dismiss')).toBeNull();
  });

  it('renders dismiss button when is-dismissible', async () => {
    const page = await newSpecPage({
      components: [AegovBadge],
      html: `<aegov-badge is-dismissible="true">X</aegov-badge>`,
    });
    const btn = page.root.querySelector('button.badge-dismiss');
    expect(btn).not.toBeNull();
    // The dismiss label is context-aware: it incorporates the badge's own text so screen
    // reader users hear which badge they are removing.
    expect(btn.getAttribute('aria-label')).toBe('Dismiss X');
  });

  it('emits aegovBadgeDismiss when dismiss clicked', async () => {
    const page = await newSpecPage({
      components: [AegovBadge],
      html: `<aegov-badge is-dismissible="true">X</aegov-badge>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovBadgeDismiss', spy);
    const btn = page.root.querySelector('button.badge-dismiss') as HTMLButtonElement;
    btn.click();
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('renders default slot content', async () => {
    const page = await newSpecPage({
      components: [AegovBadge],
      html: `<aegov-badge>Hello World</aegov-badge>`,
    });
    expect(page.root.textContent).toContain('Hello World');
  });

  it('forwards aria-* and data-* attributes', async () => {
    const page = await newSpecPage({
      components: [AegovBadge],
      html: `<aegov-badge aria-describedby="desc" data-test="x">Y</aegov-badge>`,
    });
    const span = page.root.querySelector('span');
    expect(span.getAttribute('aria-describedby')).toBe('desc');
    expect(span.getAttribute('data-test')).toBe('x');
  });
});
