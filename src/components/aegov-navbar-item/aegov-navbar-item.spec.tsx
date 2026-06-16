import { newSpecPage } from '@stencil/core/testing';
import { AegovNavbarItem } from './aegov-navbar-item';
import { AegovNavbar } from '../aegov-navbar/aegov-navbar';

// aegov-navbar propagates `size` to its child items via componentDidLoad. Tests
// that depend on a specific size should set it on the parent.
const wrap = (inner: string, parentAttrs = '') =>
  `<aegov-navbar ${parentAttrs}>${inner}</aegov-navbar>`;
const COMPONENTS = [AegovNavbar, AegovNavbarItem];

describe('aegov-navbar-item', () => {
  it('renders as link when href provided', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-navbar-item href="/page">Page</aegov-navbar-item>`),
    });
    const a = page.root.querySelector('aegov-navbar-item a');
    expect(a).not.toBeNull();
    expect(a.getAttribute('href')).toBe('/page');
    expect(a.className).toContain('aegov-navbar-item__link');
  });

  it('renders as span when no href', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-navbar-item>Plain</aegov-navbar-item>`),
    });
    expect(page.root.querySelector('aegov-navbar-item a')).toBeNull();
    expect(page.root.querySelector('aegov-navbar-item span.aegov-navbar-item__link')).not.toBeNull();
  });

  it('renders disabled span with aria-disabled when isDisabled', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-navbar-item href="/x" is-disabled="true">D</aegov-navbar-item>`),
    });
    expect(page.root.querySelector('aegov-navbar-item a')).toBeNull();
    const span = page.root.querySelector('aegov-navbar-item span.aegov-navbar-item__link');
    expect(span.getAttribute('aria-disabled')).toBe('true');
  });

  it('marks active item with aria-current="page"', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-navbar-item href="/x" is-active="true">A</aegov-navbar-item>`),
    });
    expect(page.root.querySelector('aegov-navbar-item a').getAttribute('aria-current')).toBe('page');
  });

  it('applies size class from parent', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-navbar-item href="/">A</aegov-navbar-item>`, 'size="lg"'),
    });
    const li = page.root.querySelector('aegov-navbar-item li');
    expect(li.className).toContain('aegov-navbar-item--lg');
  });

  it('applies active state class', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-navbar-item href="/" is-active="true">A</aegov-navbar-item>`),
    });
    expect(page.root.querySelector('aegov-navbar-item li').className).toContain('aegov-navbar-item--active');
  });

  it('applies disabled state class', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-navbar-item is-disabled="true">D</aegov-navbar-item>`),
    });
    expect(page.root.querySelector('aegov-navbar-item li').className).toContain('aegov-navbar-item--disabled');
  });

  it('renders icon-start slot when present', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-navbar-item href="/"><svg slot="icon-start"></svg>Page</aegov-navbar-item>`),
    });
    const iconWrap = page.root.querySelector('.aegov-navbar-item__icon');
    expect(iconWrap).not.toBeNull();
  });

  it('renders label inside aegov-navbar-item__label span', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-navbar-item href="/">Hello</aegov-navbar-item>`),
    });
    const label = page.root.querySelector('.aegov-navbar-item__label');
    expect(label).not.toBeNull();
  });

  it('forwards target and rel on the anchor', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-navbar-item href="/" target="_blank" rel="noopener">X</aegov-navbar-item>`),
    });
    const a = page.root.querySelector('aegov-navbar-item a');
    expect(a.getAttribute('target')).toBe('_blank');
    expect(a.getAttribute('rel')).toBe('noopener');
  });

  it('throws when used outside aegov-navbar', async () => {
    await expect(
      newSpecPage({
        components: [AegovNavbarItem],
        html: `<aegov-navbar-item>X</aegov-navbar-item>`,
      }),
    ).rejects.toThrow('must be used inside <aegov-navbar>');
  });
});
