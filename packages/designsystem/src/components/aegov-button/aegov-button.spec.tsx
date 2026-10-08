import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AegovButton } from './aegov-button';

/**
 * aegov-button uses a real shadow root (`delegatesFocus: true`), so the rendered
 * <button> lives in the shadow root. Queries must go through `page.root.shadowRoot`
 * — `page.root.querySelector('button')` returns null.
 */
const inner = (page: SpecPage): HTMLButtonElement =>
  page.root.shadowRoot.querySelector('button');

describe('aegov-button', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button>Click</aegov-button>`,
    });
    const btn = inner(page);
    expect(btn).not.toBeNull();
    expect(btn.className).toContain('aegov-btn');
    expect(btn.className).toContain('btn-primary');
    expect(btn.className).toContain('btn-solid');
    expect(btn.className).toContain('btn-base');
    expect(btn.getAttribute('type')).toBe('button');
    expect(page.root.textContent).toContain('Click');
  });

  it('exposes the inner button as the `button` part', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button>X</aegov-button>`,
    });
    expect(inner(page).getAttribute('part')).toBe('button');
  });

  it('auto-generates fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button>X</aegov-button>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-button-\d+$/);
    expect(inner(page).id).toBe(page.rootInstance.fieldId);
  });

  it('respects user-provided fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button field-id="my-btn">X</aegov-button>`,
    });
    expect(inner(page).id).toBe('my-btn');
  });

  it('applies variant class', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button variant="danger">X</aegov-button>`,
    });
    expect(inner(page).className).toContain('btn-danger');
  });

  it('applies appearance class', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button appearance="outline">X</aegov-button>`,
    });
    expect(inner(page).className).toContain('btn-outline');
  });

  it('applies size="sm" classes', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button size="sm">X</aegov-button>`,
    });
    expect(inner(page).className).toContain('btn-sm');
  });

  it('reflects native type attribute', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button type="submit">X</aegov-button>`,
    });
    expect(inner(page).getAttribute('type')).toBe('submit');
  });

  it('applies disabled state', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button is-disabled="true">X</aegov-button>`,
    });
    // Native `disabled` is the state; `aria-disabled` is deliberately not set, since it
    // would be redundant on a genuinely disabled <button>.
    expect(inner(page).hasAttribute('disabled')).toBe(true);
  });

  it('applies loading state with spinner and aria-busy', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button is-loading="true">X</aegov-button>`,
    });
    const btn = inner(page);
    expect(btn.hasAttribute('disabled')).toBe(true);
    expect(btn.getAttribute('aria-busy')).toBe('true');
    expect(btn.querySelector('svg')).not.toBeNull();
  });

  it('announces the loading state to assistive technology', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button is-loading="true">X</aegov-button>`,
    });
    const live = inner(page).querySelector('.sr-only');
    expect(live).not.toBeNull();
    expect(live.getAttribute('aria-live')).toBe('polite');
  });

  it('applies isFull class', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button is-full="true">X</aegov-button>`,
    });
    expect(inner(page).className).toContain('w-full');
  });

  it('reflects isFull to the is-full attribute when set as a JS property (regression test for issue #12)', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button>X</aegov-button>`,
    });
    (page.root as any).isFull = true;
    await page.waitForChanges();
    // Boolean prop reflection mirrors native HTML boolean attributes: present (empty
    // string) when true, absent when false — not the literal string "true".
    expect(page.root.hasAttribute('is-full')).toBe(true);
  });

  it('applies isIcon class', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button is-icon="true" aria-label="A"><svg></svg></aegov-button>`,
    });
    expect(inner(page).className).toContain('btn-icon');
  });

  it('emits aegovButtonClick when clicked', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button>X</aegov-button>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovButtonClick', spy);
    inner(page).click();
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
    inner(page).click();
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
    inner(page).click();
    await page.waitForChanges();
    expect(spy).not.toHaveBeenCalled();
  });

  it('forwards aria-* and data-* attributes', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button aria-label="L" data-x="1">X</aegov-button>`,
    });
    const btn = inner(page);
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
    const cls = inner(page).className;
    expect(cls).toContain('btn-grouped-horizontal');
    expect(cls).toContain('btn-grouped-first-horizontal');
  });
});
