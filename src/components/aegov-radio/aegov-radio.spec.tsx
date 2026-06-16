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

  it('renders hint with aria-describedby linking', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: `<aegov-radio label="A" hint="Helper"></aegov-radio>`,
    });
    const hint = page.root.querySelector('.radio__hint');
    expect(hint).not.toBeNull();
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.getAttribute('aria-describedby')).toBe(hint.id);
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

  // Validation surface (Layer 1) — see validation-engine-addon.md §2.8
  describe('validation surface', () => {
    it('toggles aria-invalid + host class when isInvalid', async () => {
      const page = await newSpecPage({
        components: [AegovRadio],
        html: `<aegov-radio is-invalid="true"></aegov-radio>`,
      });
      expect(page.root.querySelector('input').getAttribute('aria-invalid')).toBe('true');
      expect(page.root.classList.contains('is-invalid')).toBe(true);
    });

    it('renders errorMessage in error region', async () => {
      const page = await newSpecPage({
        components: [AegovRadio],
        html: `<aegov-radio is-invalid="true" error-message="Pick one"></aegov-radio>`,
      });
      expect(page.root.querySelector('.aegov-radio__error').textContent).toBe('Pick one');
    });

    it('renders hint on label', async () => {
      const page = await newSpecPage({
        components: [AegovRadio],
        html: `<aegov-radio label="X" hint="helper"></aegov-radio>`,
      });
      expect(page.root.querySelector('.radio__hint').textContent).toBe('helper');
    });

    it('hides hint when error shown', async () => {
      const page = await newSpecPage({
        components: [AegovRadio],
        html: `<aegov-radio label="X" hint="h" is-invalid="true" error-message="err"></aegov-radio>`,
      });
      expect(page.root.querySelector('.aegov-radio__error')).not.toBeNull();
      expect(page.root.querySelector('.radio__hint')).toBeNull();
    });

    it('aria-describedby includes error id', async () => {
      const page = await newSpecPage({
        components: [AegovRadio],
        html: `<aegov-radio field-id="r1" is-invalid="true" error-message="msg"></aegov-radio>`,
      });
      expect(page.root.querySelector('input').getAttribute('aria-describedby')).toContain('r1-error');
    });

    it('validate() resolves valid for unchecked optional', async () => {
      const page = await newSpecPage({
        components: [AegovRadio],
        html: `<aegov-radio></aegov-radio>`,
      });
      const r = await page.rootInstance.validate('manual');
      expect(r.valid).toBe(true);
    });

    it('setCustomValidity("msg") sets invalid + error', async () => {
      const page = await newSpecPage({
        components: [AegovRadio],
        html: `<aegov-radio></aegov-radio>`,
      });
      await page.rootInstance.setCustomValidity('Required');
      await page.waitForChanges();
      expect(page.rootInstance.isInvalid).toBe(true);
      expect(page.rootInstance.errorMessage).toBe('Required');
    });

    it('setCustomValidity("") clears state', async () => {
      const page = await newSpecPage({
        components: [AegovRadio],
        html: `<aegov-radio is-invalid="true" error-message="x"></aegov-radio>`,
      });
      await page.rootInstance.setCustomValidity('');
      await page.waitForChanges();
      expect(page.rootInstance.isInvalid).toBe(false);
      expect(page.rootInstance.errorMessage).toBe('');
    });
  });
});
