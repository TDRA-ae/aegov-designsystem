import { newSpecPage } from '@stencil/core/testing';
import { AegovButton } from './aegov-button';

describe('aegov-button', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button>Click</aegov-button>`,
    });
    const btn = page.root.querySelector('button');
    expect(btn).not.toBeNull();
    expect(btn.className).toContain('aegov-btn');
    expect(btn.className).toContain('btn-primary');
    expect(btn.className).toContain('btn-solid');
    expect(btn.className).toContain('btn-base');
    expect(btn.getAttribute('type')).toBe('button');
    expect(page.root.textContent).toContain('Click');
  });

  it('auto-generates fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button>X</aegov-button>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-button-\d+$/);
    expect(page.root.querySelector('button').id).toBe(page.rootInstance.fieldId);
  });

  it('respects user-provided fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button field-id="my-btn">X</aegov-button>`,
    });
    expect(page.root.querySelector('button').id).toBe('my-btn');
  });

  it('applies variant class', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button variant="danger">X</aegov-button>`,
    });
    expect(page.root.querySelector('button').className).toContain('btn-danger');
  });

  it('applies appearance class', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button appearance="outline">X</aegov-button>`,
    });
    expect(page.root.querySelector('button').className).toContain('btn-outline');
  });

  it('applies size="sm" classes', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button size="sm">X</aegov-button>`,
    });
    expect(page.root.querySelector('button').className).toContain('btn-sm');
  });

  it('reflects native type attribute', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button type="submit">X</aegov-button>`,
    });
    expect(page.root.querySelector('button').getAttribute('type')).toBe('submit');
  });

  it('applies disabled state', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button is-disabled="true">X</aegov-button>`,
    });
    const btn = page.root.querySelector('button');
    expect(btn.hasAttribute('disabled')).toBe(true);
    expect(btn.getAttribute('aria-disabled')).toBe('true');
  });

  it('applies loading state with spinner and aria-busy', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button is-loading="true">X</aegov-button>`,
    });
    const btn = page.root.querySelector('button');
    expect(btn.hasAttribute('disabled')).toBe(true);
    expect(btn.getAttribute('aria-busy')).toBe('true');
    expect(btn.querySelector('svg')).not.toBeNull();
  });

  it('applies isFull class', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button is-full="true">X</aegov-button>`,
    });
    expect(page.root.querySelector('button').className).toContain('w-full');
  });

  it('applies isIcon class', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button is-icon="true" aria-label="A"><svg></svg></aegov-button>`,
    });
    expect(page.root.querySelector('button').className).toContain('btn-icon');
  });

  it('emits aegovButtonClick when clicked', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button>X</aegov-button>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovButtonClick', spy);
    page.root.querySelector('button').click();
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('does not emit aegovButtonClick when disabled', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button is-disabled="true">X</aegov-button>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovButtonClick', spy);
    page.root.querySelector('button').click();
    await page.waitForChanges();
    expect(spy).not.toHaveBeenCalled();
  });

  it('does not emit aegovButtonClick when loading', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button is-loading="true">X</aegov-button>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovButtonClick', spy);
    page.root.querySelector('button').click();
    await page.waitForChanges();
    expect(spy).not.toHaveBeenCalled();
  });

  it('forwards aria-* and data-* attributes', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button aria-label="L" data-x="1">X</aegov-button>`,
    });
    const btn = page.root.querySelector('button');
    expect(btn.getAttribute('aria-label')).toBe('L');
    expect(btn.getAttribute('data-x')).toBe('1');
  });

  it('applies group position classes when groupPosition + groupOrientation set', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button>X</aegov-button>`,
    });
    const host = page.root as HTMLAegovButtonElement;
    host.groupOrientation = 'horizontal';
    host.groupPosition = 'first';
    await page.waitForChanges();
    const cls = page.root.querySelector('button').className;
    expect(cls).toContain('btn-grouped-horizontal');
    expect(cls).toContain('btn-grouped-first-horizontal');
  });
});
