import { newSpecPage } from '@stencil/core/testing';
import { AegovTab } from './aegov-tab';
import { AegovTabs } from '../aegov-tabs/aegov-tabs';

// aegov-tabs propagates `variant`, `size`, `orientation`, `active-tab-id`, and
// `is-disabled` to its child <aegov-tab> elements via componentDidLoad. Tests
// configure these on the parent so the child receives the intended values.
const wrap = (inner: string, parentAttrs = '') =>
  `<aegov-tabs ${parentAttrs}>${inner}</aegov-tabs>`;
const COMPONENTS = [AegovTabs, AegovTab];
const tabBtn = (root: any) => root.querySelector('aegov-tab button');

describe('aegov-tab', () => {
  it('renders a button with role=tab and aria attributes', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-tab tab-id="one">Label</aegov-tab>`, 'default-open="__none__"'),
    });
    const btn = tabBtn(page.root);
    expect(btn).not.toBeNull();
    expect(btn.getAttribute('role')).toBe('tab');
    expect(btn.id).toBe('tab-one');
    expect(btn.getAttribute('aria-controls')).toBe('panel-one');
    expect(btn.getAttribute('aria-selected')).toBe('false');
  });

  it('marks active when tab-id matches active-tab-id', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-tab tab-id="one">Label</aegov-tab>`, 'default-open="one"'),
    });
    const btn = tabBtn(page.root);
    expect(btn.getAttribute('aria-selected')).toBe('true');
    expect(btn.getAttribute('tabindex')).toBe('0');
    expect(btn.className).toContain('tab__btn--active');
  });

  it('inactive tab has tabindex=-1', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-tab tab-id="one">Label</aegov-tab>`, 'default-open="two"'),
    });
    expect(tabBtn(page.root).getAttribute('tabindex')).toBe('-1');
  });

  it('disabled state reflects via disabled attr and aria-disabled', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-tab tab-id="one" is-disabled="true">Label</aegov-tab>`, 'default-open="__none__"'),
    });
    const btn = tabBtn(page.root);
    expect(btn.hasAttribute('disabled')).toBe(true);
    expect(btn.getAttribute('aria-disabled')).toBe('true');
    expect(btn.className).toContain('tab__btn--disabled');
  });

  it('emits aegovTabSelect when clicked', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-tab tab-id="alpha">Label</aegov-tab>`, 'default-open="__none__"'),
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovTabSelect', spy);
    tabBtn(page.root).click();
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toBe('alpha');
  });

  it('does not emit when disabled', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-tab tab-id="alpha" is-disabled="true">Label</aegov-tab>`, 'default-open="__none__"'),
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovTabSelect', spy);
    tabBtn(page.root).click();
    await page.waitForChanges();
    expect(spy).not.toHaveBeenCalled();
  });

  it('applies variant and size classes from parent', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-tab tab-id="x">Label</aegov-tab>`, 'variant="pill" size="lg"'),
    });
    const cls = tabBtn(page.root).className;
    expect(cls).toContain('tab__btn--pill');
    expect(cls).toContain('tab__btn--lg');
  });

  it('applies vertical orientation class from parent', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-tab tab-id="x">Label</aegov-tab>`, 'orientation="vertical"'),
    });
    expect(tabBtn(page.root).className).toContain('tab__btn--vertical');
  });

  it('accepts an icon slot child without breaking render', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-tab tab-id="x"><svg slot="icon"></svg>Label</aegov-tab>`),
    });
    expect(tabBtn(page.root)).toBeTruthy();
    expect(page.root.querySelector('svg[slot="icon"]')).toBeTruthy();
  });

  it('accepts an icon-end slot child without breaking render', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-tab tab-id="x"><svg slot="icon-end"></svg>Label</aegov-tab>`),
    });
    expect(tabBtn(page.root)).toBeTruthy();
    expect(page.root.querySelector('svg[slot="icon-end"]')).toBeTruthy();
  });

  it('throws when used outside aegov-tabs', async () => {
    await expect(
      newSpecPage({
        components: [AegovTab],
        html: `<aegov-tab tab-id="x">Label</aegov-tab>`,
      }),
    ).rejects.toThrow('must be used inside <aegov-tabs>');
  });
});
