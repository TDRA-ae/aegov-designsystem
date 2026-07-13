import { newSpecPage } from '@stencil/core/testing';
import { AegovRadioGroup } from './aegov-radio-group';
import { AegovRadio } from '../aegov-radio/aegov-radio';

describe('aegov-radio-group', () => {
  it('renders fieldset with role="radiogroup"', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup],
      html: `<aegov-radio-group name="g"></aegov-radio-group>`,
    });
    const fieldset = page.root.querySelector('fieldset.aegov-radio-group');
    expect(fieldset).not.toBeNull();
    expect(fieldset.getAttribute('role')).toBe('radiogroup');
  });

  it('renders legend when label is provided', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup],
      html: `<aegov-radio-group name="g" label="Pick one"></aegov-radio-group>`,
    });
    const legend = page.root.querySelector('legend.radio-group__legend');
    expect(legend).not.toBeNull();
    expect(legend.textContent).toContain('Pick one');
  });

  it('applies horizontal orientation class', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup],
      html: `<aegov-radio-group name="g" orientation="horizontal"></aegov-radio-group>`,
    });
    expect(page.root.querySelector('fieldset').className).toContain('radio-group--horizontal');
  });

  it('applies appearance class (cards)', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup],
      html: `<aegov-radio-group name="g" appearance="cards"></aegov-radio-group>`,
    });
    expect(page.root.querySelector('fieldset').className).toContain('radio-group--cards');
  });

  it('disables fieldset when is-disabled', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup],
      html: `<aegov-radio-group name="g" is-disabled></aegov-radio-group>`,
    });
    const fieldset = page.root.querySelector('fieldset') as HTMLFieldSetElement;
    expect(fieldset.hasAttribute("disabled")).toBe(true);
  });

  it('propagates name and resolved size to children', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup, AegovRadio],
      html: `
        <aegov-radio-group name="grp1" size="lg">
          <aegov-radio label="A" value="a"></aegov-radio>
          <aegov-radio label="B" value="b"></aegov-radio>
        </aegov-radio-group>
      `,
    });
    const radios = page.root.querySelectorAll('aegov-radio') as NodeListOf<HTMLAegovRadioElement>;
    radios.forEach(r => {
      expect(r.name).toBe('grp1');
      expect(r.size).toBe('lg');
    });
  });

  it('selecting one radio unselects siblings (Stencil state)', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup, AegovRadio],
      html: `
        <aegov-radio-group name="g">
          <aegov-radio label="A" value="a" is-checked></aegov-radio>
          <aegov-radio label="B" value="b"></aegov-radio>
        </aegov-radio-group>
      `,
    });
    const second = page.root.querySelector('aegov-radio[value="b"]') as HTMLAegovRadioElement;
    const secondInput = second.querySelector('input') as HTMLInputElement;
    secondInput.checked = true;
    secondInput.dispatchEvent(new Event('change', { bubbles: true }));
    await page.waitForChanges();

    const first = page.root.querySelector('aegov-radio[value="a"]') as HTMLAegovRadioElement;
    expect(first.isChecked).toBe(false);
    expect(second.isChecked).toBe(true);
  });

  it('emits aegovRadioGroupChange with the selected value', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup, AegovRadio],
      html: `
        <aegov-radio-group name="g">
          <aegov-radio label="A" value="a"></aegov-radio>
          <aegov-radio label="B" value="b"></aegov-radio>
        </aegov-radio-group>
      `,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovRadioGroupChange', spy);

    const first = page.root.querySelector('aegov-radio[value="a"]') as HTMLAegovRadioElement;
    const input = first.querySelector('input') as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toEqual({ value: 'a' });
  });

  // Validation surface (Layer 1) — see validation-engine-addon.md §2.8
  describe('validation surface', () => {
    it('toggles host is-invalid + aria-invalid on fieldset', async () => {
      const page = await newSpecPage({
        components: [AegovRadioGroup, AegovRadio],
        html: `<aegov-radio-group name="r" is-invalid="true">
          <aegov-radio value="a"></aegov-radio>
        </aegov-radio-group>`,
      });
      expect(page.root.classList.contains('is-invalid')).toBe(true);
      expect(page.root.querySelector('fieldset').getAttribute('aria-invalid')).toBe('true');
    });

    it('renders errorMessage in error region', async () => {
      const page = await newSpecPage({
        components: [AegovRadioGroup, AegovRadio],
        html: `<aegov-radio-group name="r" is-invalid="true" error-message="Pick one">
          <aegov-radio value="a"></aegov-radio>
        </aegov-radio-group>`,
      });
      expect(page.root.querySelector('.aegov-radio-group__error').textContent).toBe('Pick one');
    });

    it('renders hint when not invalid', async () => {
      const page = await newSpecPage({
        components: [AegovRadioGroup, AegovRadio],
        html: `<aegov-radio-group name="r" hint="Single choice">
          <aegov-radio value="a"></aegov-radio>
        </aegov-radio-group>`,
      });
      expect(page.root.querySelector('.aegov-radio-group__hint').textContent).toBe('Single choice');
    });

    it('hides hint when error shown', async () => {
      const page = await newSpecPage({
        components: [AegovRadioGroup, AegovRadio],
        html: `<aegov-radio-group name="r" hint="h" is-invalid="true" error-message="err">
          <aegov-radio value="a"></aegov-radio>
        </aegov-radio-group>`,
      });
      expect(page.root.querySelector('.aegov-radio-group__error')).not.toBeNull();
      expect(page.root.querySelector('.aegov-radio-group__hint')).toBeNull();
    });

    it('validate() resolves valid for optional empty group', async () => {
      const page = await newSpecPage({
        components: [AegovRadioGroup, AegovRadio],
        html: `<aegov-radio-group name="r">
          <aegov-radio value="a"></aegov-radio>
        </aegov-radio-group>`,
      });
      const r = await page.rootInstance.validate('manual');
      expect(r.valid).toBe(true);
    });

    it('valueMissing fires when isRequired and no radio checked', async () => {
      const page = await newSpecPage({
        components: [AegovRadioGroup, AegovRadio],
        html: `<aegov-radio-group name="r" is-required>
          <aegov-radio value="a"></aegov-radio>
        </aegov-radio-group>`,
      });
      const r = await page.rootInstance.validate('manual');
      expect(r.valid).toBe(false);
      expect(r.validity.valueMissing).toBe(true);
    });

    it('setCustomValidity("msg") sets invalid + error', async () => {
      const page = await newSpecPage({
        components: [AegovRadioGroup, AegovRadio],
        html: `<aegov-radio-group name="r">
          <aegov-radio value="a"></aegov-radio>
        </aegov-radio-group>`,
      });
      await page.rootInstance.setCustomValidity('Pick one');
      await page.waitForChanges();
      expect(page.rootInstance.isInvalid).toBe(true);
      expect(page.rootInstance.errorMessage).toBe('Pick one');
    });

    it('setCustomValidity("") clears state', async () => {
      const page = await newSpecPage({
        components: [AegovRadioGroup, AegovRadio],
        html: `<aegov-radio-group name="r" is-invalid="true" error-message="x">
          <aegov-radio value="a"></aegov-radio>
        </aegov-radio-group>`,
      });
      await page.rootInstance.setCustomValidity('');
      await page.waitForChanges();
      expect(page.rootInstance.isInvalid).toBe(false);
      expect(page.rootInstance.errorMessage).toBe('');
    });
  });
});
