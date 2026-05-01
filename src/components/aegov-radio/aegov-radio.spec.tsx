import { newSpecPage } from '@stencil/core/testing';
import { AegovRadio } from './aegov-radio';

describe('aegov-radio', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: `<aegov-radio></aegov-radio>`,
    });
    const wrapper = page.root.querySelector('div.aegov-radio');
    expect(wrapper).not.toBeNull();
    expect(wrapper.className).toContain('radio--base');
    const input = page.root.querySelector('input[type="radio"]') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.checked).toBe(false);
  });

  it('auto-generates fieldId when not provided', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: `<aegov-radio></aegov-radio>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-radio-\d+$/);
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.id).toBe(page.rootInstance.fieldId);
  });

  it('respects user-provided fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: `<aegov-radio field-id="r-1"></aegov-radio>`,
    });
    expect((page.root.querySelector('input') as HTMLInputElement).id).toBe('r-1');
  });

  it('renders label inside wrapping <label>', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: `<aegov-radio label="Option A"></aegov-radio>`,
    });
    const label = page.root.querySelector('label.radio__wrapper');
    expect(label).not.toBeNull();
    expect(label.textContent).toContain('Option A');
    expect(label.querySelector('input[type="radio"]')).not.toBeNull();
  });

  it('renders description with aria-describedby linking', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: `<aegov-radio label="A" description="Helper"></aegov-radio>`,
    });
    const desc = page.root.querySelector('.radio__description');
    expect(desc).not.toBeNull();
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.getAttribute('aria-describedby')).toBe(desc.id);
  });

  it('reflects is-checked to native checked', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: `<aegov-radio is-checked></aegov-radio>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('reflects is-disabled to native disabled', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: `<aegov-radio is-disabled></aegov-radio>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('reflects is-required and sets aria-required', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: `<aegov-radio is-required></aegov-radio>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.required).toBe(true);
    expect(input.getAttribute('aria-required')).toBe('true');
  });

  it('applies size class', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: `<aegov-radio size="sm"></aegov-radio>`,
    });
    expect(page.root.querySelector('div.aegov-radio').className).toContain('radio--sm');
  });

  it('applies extra-class', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: `<aegov-radio extra-class="custom-r"></aegov-radio>`,
    });
    expect(page.root.querySelector('div.aegov-radio').className).toContain('custom-r');
  });

  it('applies name and value to native input', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: `<aegov-radio name="g" value="v"></aegov-radio>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.name).toBe('g');
    expect(input.value).toBe('v');
  });

  it('emits aegovRadioChange on change', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: `<aegov-radio value="opt1"></aegov-radio>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovRadioChange', spy);
    const input = page.root.querySelector('input') as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toEqual({ checked: true, value: 'opt1' });
  });

  it('forwards pass-through attributes (aria-*, data-*)', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: `<aegov-radio aria-label="opt" data-test="x"></aegov-radio>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.getAttribute('aria-label')).toBe('opt');
    expect(input.getAttribute('data-test')).toBe('x');
  });
});
