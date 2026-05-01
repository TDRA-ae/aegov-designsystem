import { newSpecPage } from '@stencil/core/testing';
import { AegovInputGroup } from './aegov-input-group';
import { AegovInput } from '../aegov-input/aegov-input';

describe('aegov-input-group', () => {
  it('renders with default base size class', async () => {
    const page = await newSpecPage({
      components: [AegovInputGroup],
      html: `<aegov-input-group></aegov-input-group>`,
    });
    const wrapper = page.root.querySelector('div.aegov-input-group');
    expect(wrapper).not.toBeNull();
    expect(wrapper.className).toContain('input-group--base');
  });

  it('applies size class', async () => {
    const page = await newSpecPage({
      components: [AegovInputGroup],
      html: `<aegov-input-group size="lg"></aegov-input-group>`,
    });
    expect(page.root.querySelector('div.aegov-input-group').className).toContain('input-group--lg');
  });

  it('renders addon-prefix', async () => {
    const page = await newSpecPage({
      components: [AegovInputGroup],
      html: `<aegov-input-group addon-prefix="$"></aegov-input-group>`,
    });
    const prefix = page.root.querySelector('.input-group__addon--prefix');
    expect(prefix).not.toBeNull();
    expect(prefix.textContent).toBe('$');
  });

  it('renders addon-suffix', async () => {
    const page = await newSpecPage({
      components: [AegovInputGroup],
      html: `<aegov-input-group addon-suffix=".com"></aegov-input-group>`,
    });
    const suffix = page.root.querySelector('.input-group__addon--suffix');
    expect(suffix).not.toBeNull();
    expect(suffix.textContent).toBe('.com');
  });

  it('does not render addons when not specified', async () => {
    const page = await newSpecPage({
      components: [AegovInputGroup],
      html: `<aegov-input-group></aegov-input-group>`,
    });
    expect(page.root.querySelector('.input-group__addon--prefix')).toBeNull();
    expect(page.root.querySelector('.input-group__addon--suffix')).toBeNull();
  });

  it('applies extra-class', async () => {
    const page = await newSpecPage({
      components: [AegovInputGroup],
      html: `<aegov-input-group extra-class="custom"></aegov-input-group>`,
    });
    expect(page.root.querySelector('div.aegov-input-group').className).toContain('custom');
  });

  it('propagates size to child aegov-input', async () => {
    const page = await newSpecPage({
      components: [AegovInputGroup, AegovInput],
      html: `<aegov-input-group size="lg"><aegov-input></aegov-input></aegov-input-group>`,
    });
    await page.waitForChanges();
    const input = page.root.querySelector('aegov-input') as any;
    expect(input.size).toBe('lg');
  });

  it('forwards aria-* and data-* attributes to host', async () => {
    const page = await newSpecPage({
      components: [AegovInputGroup],
      html: `<aegov-input-group aria-label="amount" data-test="x"></aegov-input-group>`,
    });
    expect(page.root.getAttribute('aria-label')).toBe('amount');
    expect(page.root.getAttribute('data-test')).toBe('x');
  });
});
