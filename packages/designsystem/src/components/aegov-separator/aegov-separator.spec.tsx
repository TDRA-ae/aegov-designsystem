import { newSpecPage } from '@stencil/core/testing';
import { AegovSeparator } from './aegov-separator';

describe('aegov-separator', () => {
  it('renders an <hr> by default with role="presentation"', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator></aegov-separator>`,
    });
    const hr = page.root.querySelector('hr');
    expect(hr).toBeTruthy();
    expect(hr.getAttribute('role')).toBe('presentation');
    // aria-orientation is only valid on role="separator", so it is deliberately omitted
    // on a decorative separator.
    expect(hr.getAttribute('aria-orientation')).toBeNull();
  });

  it('renders with role="separator" when isDecorative is false', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator is-decorative="false"></aegov-separator>`,
    });
    const hr = page.root.querySelector('hr');
    expect(hr.getAttribute('role')).toBe('separator');
  });

  it('renders text-bearing variant when text prop is provided', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator text="Or"></aegov-separator>`,
    });
    expect(page.root.querySelector('hr')).toBeNull();
    const span = page.root.querySelector('.separator__text');
    expect(span).toBeTruthy();
    expect(span.textContent).toContain('Or');
    expect(page.root.querySelectorAll('.separator__line').length).toBe(2);
  });

  it('renders text-bearing variant when slot has content', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator>OR</aegov-separator>`,
    });
    expect(page.root.querySelector('hr')).toBeNull();
    expect(page.root.querySelector('.separator__text')).toBeTruthy();
  });

  it('renders text-bearing (labeled) variant when the slot has element-only content with no text nodes', async () => {
    // The default slot "accepts arbitrary HTML" per docs — a bare icon with no text
    // nodes previously failed to trigger the labeled layout at all, so the <slot>
    // never rendered and the icon dangled as an unstyled sibling before a plain <hr>.
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator><svg class="my-icon"></svg></aegov-separator>`,
    });
    expect(page.root.querySelector('hr')).toBeNull();
    expect(page.root.querySelector('.separator__text')).toBeTruthy();
    expect(page.root.querySelector('.separator__text svg.my-icon')).toBeTruthy();
  });

  it('applies vertical orientation class', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator orientation="vertical"></aegov-separator>`,
    });
    const hr = page.root.querySelector('hr');
    expect(hr.classList.contains('separator--vertical')).toBe(true);
    // Decorative by default, so no aria-orientation — see the default-render test.
    expect(hr.getAttribute('aria-orientation')).toBeNull();
  });

  it('applies appearance class', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator appearance="light"></aegov-separator>`,
    });
    const hr = page.root.querySelector('hr');
    expect(hr.classList.contains('separator-appearance-light')).toBe(true);
  });

  it('defaults to solid appearance and primary variant', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator></aegov-separator>`,
    });
    const hr = page.root.querySelector('hr');
    expect(hr.classList.contains('separator-appearance-solid')).toBe(true);
    expect(hr.classList.contains('separator-variant-primary')).toBe(true);
  });

  it('applies variant class for all 4 variants', async () => {
    for (const v of ['primary', 'secondary', 'neutral-max', 'neutral-min']) {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator variant="${v}"></aegov-separator>`,
      });
      expect(page.root.querySelector('hr').classList.contains(`separator-variant-${v}`)).toBe(true);
    }
  });

  it('applies separator--with-text when text exists', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator text="Or"></aegov-separator>`,
    });
    const wrapper = page.root.querySelector('div.aegov-separator');
    expect(wrapper.classList.contains('separator--with-text')).toBe(true);
  });

  it('appends extraClass to the rendered element', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator extra-class="my-extra"></aegov-separator>`,
    });
    expect(page.root.querySelector('hr').classList.contains('my-extra')).toBe(true);
  });

  it('always includes aegov-separator base class', async () => {
    const page = await newSpecPage({
      components: [AegovSeparator],
      html: `<aegov-separator></aegov-separator>`,
    });
    expect(page.root.querySelector('hr').classList.contains('aegov-separator')).toBe(true);
  });
});
