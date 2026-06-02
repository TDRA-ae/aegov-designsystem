import { newSpecPage } from '@stencil/core/testing';
import { AegovLink } from './aegov-link';

describe('aegov-link', () => {
  it('renders an anchor with the href', async () => {
    const page = await newSpecPage({
      components: [AegovLink],
      html: `<aegov-link href="https://example.com">Visit</aegov-link>`,
    });
    const a = page.root.querySelector('a');
    expect(a).toBeTruthy();
    expect(a.getAttribute('href')).toBe('https://example.com');
  });

  it('auto-generates a fieldId when none provided', async () => {
    const page = await newSpecPage({
      components: [AegovLink],
      html: `<aegov-link href="/x">x</aegov-link>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-link-\d+$/);
    expect(page.root.querySelector('a').id).toBe(page.rootInstance.fieldId);
  });

  it('respects an explicit fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovLink],
      html: `<aegov-link field-id="my-link" href="/x">x</aegov-link>`,
    });
    expect(page.root.querySelector('a').id).toBe('my-link');
  });

  it('sets target attribute when provided', async () => {
    const page = await newSpecPage({
      components: [AegovLink],
      html: `<aegov-link href="/x" target="_blank">x</aegov-link>`,
    });
    expect(page.root.querySelector('a').getAttribute('target')).toBe('_blank');
  });

  it('sets rel to "noopener noreferrer" when target is _blank and rel not provided', async () => {
    const page = await newSpecPage({
      components: [AegovLink],
      html: `<aegov-link href="/x" target="_blank">x</aegov-link>`,
    });
    expect(page.root.querySelector('a').getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('uses provided rel attribute when supplied', async () => {
    const page = await newSpecPage({
      components: [AegovLink],
      html: `<aegov-link href="/x" target="_blank" rel="nofollow">x</aegov-link>`,
    });
    expect(page.root.querySelector('a').getAttribute('rel')).toBe('nofollow');
  });

  it('applies extraClass on the anchor', async () => {
    const page = await newSpecPage({
      components: [AegovLink],
      html: `<aegov-link href="/x" extra-class="my-extra">x</aegov-link>`,
    });
    expect(page.root.querySelector('a').classList.contains('my-extra')).toBe(true);
  });

  it('renders default slot content', async () => {
    const page = await newSpecPage({
      components: [AegovLink],
      html: `<aegov-link href="/x">Link Text</aegov-link>`,
    });
    expect(page.root.textContent).toContain('Link Text');
  });

  it('emits aegovLinkClick on click with href detail', async () => {
    const page = await newSpecPage({
      components: [AegovLink],
      html: `<aegov-link href="/x">x</aegov-link>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovLinkClick', spy);
    const a = page.root.querySelector('a') as HTMLAnchorElement;
    const ev = new MouseEvent('click', { bubbles: true, cancelable: true });
    a.dispatchEvent(ev);
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.href).toBe('/x');
  });

  it('passes through title and download attributes', async () => {
    const page = await newSpecPage({
      components: [AegovLink],
      html: `<aegov-link href="/x" title="hello" download="file.pdf">x</aegov-link>`,
    });
    const a = page.root.querySelector('a');
    expect(a.getAttribute('title')).toBe('hello');
    expect(a.getAttribute('download')).toBe('file.pdf');
  });

  // ── Button-style mode ──────────────────────────────────────

  it('default render does NOT apply button base class', async () => {
    const page = await newSpecPage({
      components: [AegovLink],
      html: `<aegov-link href="/x">x</aegov-link>`,
    });
    const a = page.root.querySelector('a');
    expect(a.classList.contains('aegov-btn')).toBe(false);
    expect(a.classList.contains('text-primary-600')).toBe(true);
  });

  it('applies button base + variant + appearance + size classes when variant set', async () => {
    const page = await newSpecPage({
      components: [AegovLink],
      html: `<aegov-link href="/x" variant="primary" appearance="solid" size="base">x</aegov-link>`,
    });
    const a = page.root.querySelector('a');
    expect(a.classList.contains('aegov-btn')).toBe(true);
    expect(a.classList.contains('btn-primary')).toBe(true);
    expect(a.classList.contains('btn-solid')).toBe(true);
    expect(a.classList.contains('btn-base')).toBe(true);
    // text-link default class must be absent in button-style mode
    expect(a.classList.contains('text-primary-600')).toBe(false);
  });

  it('opts into button styling when only appearance is set', async () => {
    const page = await newSpecPage({
      components: [AegovLink],
      html: `<aegov-link href="/x" appearance="outline">x</aegov-link>`,
    });
    const a = page.root.querySelector('a');
    expect(a.classList.contains('aegov-btn')).toBe(true);
    expect(a.classList.contains('btn-outline')).toBe(true);
  });

  it('applies w-full when isFull is set', async () => {
    const page = await newSpecPage({
      components: [AegovLink],
      html: `<aegov-link href="/x" variant="primary" appearance="solid" is-full>x</aegov-link>`,
    });
    expect(page.root.querySelector('a').classList.contains('w-full')).toBe(true);
  });

  it('applies btn-icon when isIcon is set', async () => {
    const page = await newSpecPage({
      components: [AegovLink],
      html: `<aegov-link href="/x" variant="primary" appearance="solid" is-icon aria-label="Settings">x</aegov-link>`,
    });
    expect(page.root.querySelector('a').classList.contains('btn-icon')).toBe(true);
  });

  it('applies font-semibold when isBold is set', async () => {
    const page = await newSpecPage({
      components: [AegovLink],
      html: `<aegov-link href="/x" variant="primary" appearance="solid" is-bold>x</aegov-link>`,
    });
    expect(page.root.querySelector('a').classList.contains('font-semibold')).toBe(true);
  });

  it('merges extraClass alongside button-style classes', async () => {
    const page = await newSpecPage({
      components: [AegovLink],
      html: `<aegov-link href="/x" variant="primary" appearance="solid" extra-class="my-extra">x</aegov-link>`,
    });
    const a = page.root.querySelector('a');
    expect(a.classList.contains('aegov-btn')).toBe(true);
    expect(a.classList.contains('my-extra')).toBe(true);
  });

  // ── Disabled polyfill ──────────────────────────────────────

  it('isDisabled strips href and target from rendered anchor', async () => {
    const page = await newSpecPage({
      components: [AegovLink],
      html: `<aegov-link href="/x" target="_blank" variant="primary" appearance="solid" is-disabled>x</aegov-link>`,
    });
    const a = page.root.querySelector('a');
    expect(a.hasAttribute('href')).toBe(false);
    expect(a.hasAttribute('target')).toBe(false);
  });

  it('isDisabled sets aria-disabled="true" and tabindex="-1"', async () => {
    const page = await newSpecPage({
      components: [AegovLink],
      html: `<aegov-link href="/x" variant="primary" appearance="solid" is-disabled>x</aegov-link>`,
    });
    const a = page.root.querySelector('a');
    expect(a.getAttribute('aria-disabled')).toBe('true');
    expect(a.getAttribute('tabindex')).toBe('-1');
  });

  it('isDisabled applies pointer-events-none + cursor-not-allowed', async () => {
    const page = await newSpecPage({
      components: [AegovLink],
      html: `<aegov-link href="/x" variant="primary" appearance="solid" is-disabled>x</aegov-link>`,
    });
    const a = page.root.querySelector('a');
    expect(a.classList.contains('pointer-events-none')).toBe(true);
    expect(a.classList.contains('cursor-not-allowed')).toBe(true);
  });

  it('isDisabled prevents click event and does NOT emit aegovLinkClick', async () => {
    const page = await newSpecPage({
      components: [AegovLink],
      html: `<aegov-link href="/x" variant="primary" appearance="solid" is-disabled>x</aegov-link>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovLinkClick', spy);
    const a = page.root.querySelector('a') as HTMLAnchorElement;
    const ev = new MouseEvent('click', { bubbles: true, cancelable: true });
    a.dispatchEvent(ev);
    await page.waitForChanges();
    expect(spy).not.toHaveBeenCalled();
    expect(ev.defaultPrevented).toBe(true);
  });

  it('isDisabled (without other button-style props) still opts into button styling', async () => {
    const page = await newSpecPage({
      components: [AegovLink],
      html: `<aegov-link href="/x" is-disabled>x</aegov-link>`,
    });
    const a = page.root.querySelector('a');
    expect(a.classList.contains('aegov-btn')).toBe(true);
  });

  // ── Click custom-event preventDefault ──────────────────────

  it('preventDefault on aegovLinkClick stops the underlying click event default', async () => {
    const page = await newSpecPage({
      components: [AegovLink],
      html: `<aegov-link href="/x">x</aegov-link>`,
    });
    page.root.addEventListener('aegovLinkClick', (e: any) => e.preventDefault());
    const a = page.root.querySelector('a') as HTMLAnchorElement;
    const ev = new MouseEvent('click', { bubbles: true, cancelable: true });
    a.dispatchEvent(ev);
    await page.waitForChanges();
    expect(ev.defaultPrevented).toBe(true);
  });
});
