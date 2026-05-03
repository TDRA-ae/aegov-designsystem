import { newSpecPage } from '@stencil/core/testing';
import { AegovToggle } from './aegov-toggle';

describe('aegov-toggle', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle></aegov-toggle>`,
    });
    const wrapper = page.root.querySelector('div.aegov-toggle');
    expect(wrapper).not.toBeNull();
    expect(wrapper.className).toContain('toggle--base');
    const input = page.root.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.getAttribute('role')).toBe('switch');
    expect(input.checked).toBe(false);
  });

  it('auto-generates fieldId when not provided', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle></aegov-toggle>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-toggle-\d+$/);
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.id).toBe(page.rootInstance.fieldId);
  });

  it('respects user-provided fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle field-id="t-1"></aegov-toggle>`,
    });
    expect((page.root.querySelector('input') as HTMLInputElement).id).toBe('t-1');
  });

  it('renders label inside wrapping <label>', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle label="Notifications"></aegov-toggle>`,
    });
    const label = page.root.querySelector('label.toggle__wrapper');
    expect(label).not.toBeNull();
    expect(label.textContent).toContain('Notifications');
    expect(label.querySelector('input[type="checkbox"]')).not.toBeNull();
  });

  it('renders hint with aria-describedby linking', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle label="A" hint="Helper"></aegov-toggle>`,
    });
    const hint = page.root.querySelector('.toggle__hint');
    expect(hint).not.toBeNull();
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.getAttribute('aria-describedby')).toBe(hint.id);
  });

  it('reflects is-checked to native checked and aria-checked', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle is-checked></aegov-toggle>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.checked).toBe(true);
    expect(input.getAttribute('aria-checked')).toBe('true');
  });

  it('aria-checked is "false" when not checked', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle></aegov-toggle>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.getAttribute('aria-checked')).toBe('false');
  });

  it('reflects is-disabled to native disabled', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle is-disabled></aegov-toggle>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('reflects is-required and sets aria-required', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle is-required></aegov-toggle>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.required).toBe(true);
    expect(input.getAttribute('aria-required')).toBe('true');
  });

  it('applies size class', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle size="lg"></aegov-toggle>`,
    });
    expect(page.root.querySelector('div.aegov-toggle').className).toContain('toggle--lg');
  });

  it('applies name and value to native input', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle name="nm" value="vl"></aegov-toggle>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.name).toBe('nm');
    expect(input.value).toBe('vl');
  });

  it('emits aegovToggleChange on change', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle value="on"></aegov-toggle>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovToggleChange', spy);
    const input = page.root.querySelector('input') as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toEqual({ checked: true, value: 'on' });
  });

  it('renders track and thumb decoration', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle></aegov-toggle>`,
    });
    expect(page.root.querySelector('.toggle__track')).not.toBeNull();
    expect(page.root.querySelector('.toggle__thumb')).not.toBeNull();
  });

  it('renders icon slot wrappers when icon-checked slot is provided', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle><span slot="icon-checked">on</span></aegov-toggle>`,
    });
    expect(page.root.querySelector('.toggle__icon')).not.toBeNull();
    expect(page.root.querySelector('.toggle__thumb--has-icon')).not.toBeNull();
  });

  it('forwards pass-through attributes', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle aria-label="notify" data-test="x"></aegov-toggle>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.getAttribute('aria-label')).toBe('notify');
    expect(input.getAttribute('data-test')).toBe('x');
  });
});
