import { newSpecPage } from '@stencil/core/testing';
import { AegovCheckbox } from './aegov-checkbox';

describe('aegov-checkbox', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: `<aegov-checkbox></aegov-checkbox>`,
    });
    const wrapper = page.root.querySelector('div.aegov-checkbox');
    expect(wrapper).not.toBeNull();
    expect(wrapper.className).toContain('checkbox--base');
    const input = page.root.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.checked).toBe(false);
    expect(input.disabled).toBe(false);
  });

  it('auto-generates fieldId when not provided', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: `<aegov-checkbox></aegov-checkbox>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-checkbox-\d+$/);
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.id).toBe(page.rootInstance.fieldId);
  });

  it('respects user-provided fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: `<aegov-checkbox field-id="cb-1"></aegov-checkbox>`,
    });
    expect(page.rootInstance.fieldId).toBe('cb-1');
    expect((page.root.querySelector('input') as HTMLInputElement).id).toBe('cb-1');
  });

  it('renders label and links it to input via wrapping <label>', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: `<aegov-checkbox label="Accept terms"></aegov-checkbox>`,
    });
    const label = page.root.querySelector('label.checkbox__wrapper');
    expect(label).not.toBeNull();
    expect(label.textContent).toContain('Accept terms');
    expect(label.querySelector('input[type="checkbox"]')).not.toBeNull();
  });

  it('renders hint with aria-describedby linking', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: `<aegov-checkbox label="Marketing" hint="Receive emails"></aegov-checkbox>`,
    });
    const hint = page.root.querySelector('.checkbox__hint');
    expect(hint).not.toBeNull();
    expect(hint.textContent).toContain('Receive emails');
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.getAttribute('aria-describedby')).toBe(hint.id);
  });

  it('reflects is-checked to native checked', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: `<aegov-checkbox is-checked></aegov-checkbox>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('reflects is-disabled to native disabled', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: `<aegov-checkbox is-disabled></aegov-checkbox>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('reflects is-required and sets aria-required', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: `<aegov-checkbox is-required></aegov-checkbox>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.required).toBe(true);
    expect(input.getAttribute('aria-required')).toBe('true');
  });

  it('applies size class', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: `<aegov-checkbox size="lg"></aegov-checkbox>`,
    });
    expect(page.root.querySelector('div.aegov-checkbox').className).toContain('checkbox--lg');
  });

  it('applies extra-class', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: `<aegov-checkbox extra-class="custom-cb"></aegov-checkbox>`,
    });
    expect(page.root.querySelector('div.aegov-checkbox').className).toContain('custom-cb');
  });

  it('reflects is-check-all attribute on host', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: `<aegov-checkbox is-check-all></aegov-checkbox>`,
    });
    expect(page.root.hasAttribute('is-check-all')).toBe(true);
  });

  it('sets indeterminate on the native input', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: `<aegov-checkbox is-indeterminate="true"></aegov-checkbox>`,
    });
    await page.waitForChanges();
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
  });

  it('emits aegovCheckboxChange on input change', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: `<aegov-checkbox value="opt1"></aegov-checkbox>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovCheckboxChange', spy);
    const input = page.root.querySelector('input') as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toEqual({ checked: true, value: 'opt1' });
  });

  it('forwards pass-through attributes (aria-*, data-*, tabindex)', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: `<aegov-checkbox aria-label="agree" data-test="x" tabindex="2"></aegov-checkbox>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.getAttribute('aria-label')).toBe('agree');
    expect(input.getAttribute('data-test')).toBe('x');
    expect(input.getAttribute('tabindex')).toBe('2');
  });

  it('applies name and value to the native input', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: `<aegov-checkbox name="agree" value="yes"></aegov-checkbox>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.name).toBe('agree');
    expect(input.value).toBe('yes');
  });

  // Validation surface (Layer 1) — see validation-engine-addon.md §2.8
  describe('validation surface', () => {
    it('toggles aria-invalid + host class when isInvalid', async () => {
      const page = await newSpecPage({
        components: [AegovCheckbox],
        html: `<aegov-checkbox is-invalid="true"></aegov-checkbox>`,
      });
      expect(page.root.querySelector('input').getAttribute('aria-invalid')).toBe('true');
      expect(page.root.classList.contains('is-invalid')).toBe(true);
    });

    it('renders errorMessage in error region when isInvalid', async () => {
      const page = await newSpecPage({
        components: [AegovCheckbox],
        html: `<aegov-checkbox is-invalid="true" error-message="Required"></aegov-checkbox>`,
      });
      expect(page.root.querySelector('.aegov-checkbox__error').textContent).toBe('Required');
    });

    it('renders hint via prop on label', async () => {
      const page = await newSpecPage({
        components: [AegovCheckbox],
        html: `<aegov-checkbox label="X" hint="helper"></aegov-checkbox>`,
      });
      expect(page.root.querySelector('.checkbox__hint').textContent).toBe('helper');
    });

    it('hides hint when error shown', async () => {
      const page = await newSpecPage({
        components: [AegovCheckbox],
        html: `<aegov-checkbox label="X" hint="h" is-invalid="true" error-message="err"></aegov-checkbox>`,
      });
      expect(page.root.querySelector('.aegov-checkbox__error')).not.toBeNull();
      expect(page.root.querySelector('.checkbox__hint')).toBeNull();
    });

    it('aria-describedby points at error id', async () => {
      const page = await newSpecPage({
        components: [AegovCheckbox],
        html: `<aegov-checkbox field-id="cb1" is-invalid="true" error-message="msg"></aegov-checkbox>`,
      });
      expect(page.root.querySelector('input').getAttribute('aria-describedby')).toContain('cb1-error');
    });

    it('validate() resolves valid for unchecked optional', async () => {
      const page = await newSpecPage({
        components: [AegovCheckbox],
        html: `<aegov-checkbox></aegov-checkbox>`,
      });
      const r = await page.rootInstance.validate('manual');
      expect(r.valid).toBe(true);
    });

    it('setCustomValidity("msg") sets invalid + error', async () => {
      const page = await newSpecPage({
        components: [AegovCheckbox],
        html: `<aegov-checkbox></aegov-checkbox>`,
      });
      await page.rootInstance.setCustomValidity('You must agree');
      await page.waitForChanges();
      expect(page.rootInstance.isInvalid).toBe(true);
      expect(page.rootInstance.errorMessage).toBe('You must agree');
    });

    it('setCustomValidity("") clears state', async () => {
      const page = await newSpecPage({
        components: [AegovCheckbox],
        html: `<aegov-checkbox is-invalid="true" error-message="x"></aegov-checkbox>`,
      });
      await page.rootInstance.setCustomValidity('');
      await page.waitForChanges();
      expect(page.rootInstance.isInvalid).toBe(false);
      expect(page.rootInstance.errorMessage).toBe('');
    });
  });
});
