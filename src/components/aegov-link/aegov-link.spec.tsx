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
});
