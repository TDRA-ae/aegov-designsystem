import { newSpecPage } from '@stencil/core/testing';
import { q, qa } from '../../utils/test-helpers';
import { AegovCheckboxGroup } from './aegov-checkbox-group';
import { AegovCheckbox } from '../aegov-checkbox/aegov-checkbox';

describe('aegov-checkbox-group', () => {
  it('renders a fieldset with default classes', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup],
      html: `<aegov-checkbox-group></aegov-checkbox-group>`,
    });
    const fieldset = q(page.root, 'fieldset.aegov-checkbox-group');
    expect(fieldset).not.toBeNull();
  });

  it('renders legend when label is provided', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup],
      html: `<aegov-checkbox-group label="Choose"></aegov-checkbox-group>`,
    });
    const legend = q(page.root, 'legend.checkbox-group__legend');
    expect(legend).not.toBeNull();
    expect(legend.textContent).toContain('Choose');
  });

  it('applies horizontal orientation class', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup],
      html: `<aegov-checkbox-group orientation="horizontal"></aegov-checkbox-group>`,
    });
    expect(q(page.root, 'fieldset').className).toContain('checkbox-group--horizontal');
  });

  it('applies appearance class (cards)', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup],
      html: `<aegov-checkbox-group appearance="cards"></aegov-checkbox-group>`,
    });
    expect(q(page.root, 'fieldset').className).toContain('checkbox-group--cards');
  });

  it('disables fieldset when is-disabled', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup],
      html: `<aegov-checkbox-group is-disabled></aegov-checkbox-group>`,
    });
    const fieldset = q(page.root, 'fieldset') as HTMLFieldSetElement;
    expect(fieldset.hasAttribute("disabled")).toBe(true);
  });

  it('propagates resolved size to child checkboxes', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `
        <aegov-checkbox-group size="lg">
          <aegov-checkbox label="A" value="a"></aegov-checkbox>
          <aegov-checkbox label="B" value="b"></aegov-checkbox>
        </aegov-checkbox-group>
      `,
    });
    const checkboxes = qa(page.root, 'aegov-checkbox') as HTMLAegovCheckboxElement[];
    checkboxes.forEach(cb => expect(cb.size).toBe('lg'));
  });

  it('cascades is-disabled to child checkboxes (group always wins)', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `
        <aegov-checkbox-group is-disabled="true">
          <aegov-checkbox label="A" value="a"></aegov-checkbox>
          <aegov-checkbox label="B" value="b" is-disabled="false"></aegov-checkbox>
        </aegov-checkbox-group>
      `,
    });
    const checkboxes = qa(page.root, 'aegov-checkbox') as HTMLAegovCheckboxElement[];
    checkboxes.forEach(cb => expect(cb.isDisabled).toBe(true));
  });

  it('re-enables child checkboxes when the group is-disabled toggles back off', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `
        <aegov-checkbox-group is-disabled="true">
          <aegov-checkbox label="A" value="a"></aegov-checkbox>
        </aegov-checkbox-group>
      `,
    });
    const group = page.root as HTMLAegovCheckboxGroupElement;
    group.isDisabled = false;
    await page.waitForChanges();
    const cb = q(page.root, 'aegov-checkbox') as HTMLAegovCheckboxElement;
    expect(cb.isDisabled).toBe(false);
  });

  it('check-all checkbox toggles all regular checkboxes', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `
        <aegov-checkbox-group>
          <aegov-checkbox is-check-all label="All"></aegov-checkbox>
          <aegov-checkbox label="A" value="a"></aegov-checkbox>
          <aegov-checkbox label="B" value="b"></aegov-checkbox>
        </aegov-checkbox-group>
      `,
    });
    const all = q(page.root, 'aegov-checkbox[is-check-all]') as HTMLAegovCheckboxElement;
    const allInput = q(all, 'input') as HTMLInputElement;
    allInput.checked = true;
    allInput.dispatchEvent(new Event('change', { bubbles: true }));
    await page.waitForChanges();

    const regulars = Array.from(qa(page.root, 'aegov-checkbox')).filter(
      cb => !(cb as HTMLAegovCheckboxElement).isCheckAll,
    ) as HTMLAegovCheckboxElement[];
    regulars.forEach(cb => expect(cb.isChecked).toBe(true));
  });

  it('check-all becomes indeterminate when some children are checked', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `
        <aegov-checkbox-group>
          <aegov-checkbox is-check-all label="All"></aegov-checkbox>
          <aegov-checkbox label="A" value="a"></aegov-checkbox>
          <aegov-checkbox label="B" value="b"></aegov-checkbox>
        </aegov-checkbox-group>
      `,
    });
    const first = qa(page.root, 'aegov-checkbox')[1] as HTMLAegovCheckboxElement;
    const firstInput = q(first, 'input') as HTMLInputElement;
    firstInput.checked = true;
    firstInput.dispatchEvent(new Event('change', { bubbles: true }));
    await page.waitForChanges();

    const all = q(page.root, 'aegov-checkbox[is-check-all]') as HTMLAegovCheckboxElement;
    expect(all.isIndeterminate).toBe(true);
    expect(all.isChecked).toBe(false);
  });

  it('check-all becomes checked when all children are checked', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `
        <aegov-checkbox-group>
          <aegov-checkbox is-check-all label="All"></aegov-checkbox>
          <aegov-checkbox label="A" value="a"></aegov-checkbox>
          <aegov-checkbox label="B" value="b"></aegov-checkbox>
        </aegov-checkbox-group>
      `,
    });
    const regulars = Array.from(qa(page.root, 'aegov-checkbox')).filter(
      cb => !(cb as HTMLAegovCheckboxElement).isCheckAll,
    ) as HTMLAegovCheckboxElement[];

    for (const cb of regulars) {
      const input = q(cb, 'input') as HTMLInputElement;
      input.checked = true;
      input.dispatchEvent(new Event('change', { bubbles: true }));
      await page.waitForChanges();
    }

    const all = q(page.root, 'aegov-checkbox[is-check-all]') as HTMLAegovCheckboxElement;
    expect(all.isChecked).toBe(true);
    expect(all.isIndeterminate).toBe(false);
  });

  it('emits aegovCheckboxGroupChange with current values', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `
        <aegov-checkbox-group>
          <aegov-checkbox label="A" value="a"></aegov-checkbox>
          <aegov-checkbox label="B" value="b"></aegov-checkbox>
        </aegov-checkbox-group>
      `,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovCheckboxGroupChange', spy);

    const first = q(page.root, 'aegov-checkbox') as HTMLAegovCheckboxElement;
    const input = q(first, 'input') as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toEqual({ values: ['a'] });
  });

  it('check-all toggle skips disabled children', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `
        <aegov-checkbox-group>
          <aegov-checkbox is-check-all label="All"></aegov-checkbox>
          <aegov-checkbox label="A" value="a"></aegov-checkbox>
          <aegov-checkbox label="B" value="b" is-disabled></aegov-checkbox>
        </aegov-checkbox-group>
      `,
    });
    const all = q(page.root, 'aegov-checkbox[is-check-all]') as HTMLAegovCheckboxElement;
    const allInput = q(all, 'input') as HTMLInputElement;
    allInput.checked = true;
    allInput.dispatchEvent(new Event('change', { bubbles: true }));
    await page.waitForChanges();

    const a = q(page.root, 'aegov-checkbox[value="a"]') as HTMLAegovCheckboxElement;
    const b = q(page.root, 'aegov-checkbox[value="b"]') as HTMLAegovCheckboxElement;
    expect(a.isChecked).toBe(true);
    expect(b.isChecked).toBe(false);
  });

  // Validation surface (Layer 1) — see validation-engine-addon.md §2.8
  describe('validation surface', () => {
    it('toggles host is-invalid + aria-invalid on fieldset', async () => {
      const page = await newSpecPage({
        components: [AegovCheckboxGroup, AegovCheckbox],
        html: `<aegov-checkbox-group is-invalid="true">
          <aegov-checkbox value="a"></aegov-checkbox>
        </aegov-checkbox-group>`,
      });
      expect(page.root.classList.contains('is-invalid')).toBe(true);
      expect(q(page.root, 'fieldset').getAttribute('aria-invalid')).toBe('true');
    });

    it('renders errorMessage in error region', async () => {
      const page = await newSpecPage({
        components: [AegovCheckboxGroup, AegovCheckbox],
        html: `<aegov-checkbox-group is-invalid="true" error-message="Pick at least 1">
          <aegov-checkbox value="a"></aegov-checkbox>
        </aegov-checkbox-group>`,
      });
      expect(q(page.root, '.aegov-checkbox-group__error').textContent).toBe('Pick at least 1');
    });

    it('renders hint when not invalid', async () => {
      const page = await newSpecPage({
        components: [AegovCheckboxGroup, AegovCheckbox],
        html: `<aegov-checkbox-group hint="Multiple OK">
          <aegov-checkbox value="a"></aegov-checkbox>
        </aegov-checkbox-group>`,
      });
      expect(q(page.root, '.aegov-checkbox-group__hint').textContent).toBe('Multiple OK');
    });

    it('hides hint when error shown', async () => {
      const page = await newSpecPage({
        components: [AegovCheckboxGroup, AegovCheckbox],
        html: `<aegov-checkbox-group hint="h" is-invalid="true" error-message="err">
          <aegov-checkbox value="a"></aegov-checkbox>
        </aegov-checkbox-group>`,
      });
      expect(q(page.root, '.aegov-checkbox-group__error')).not.toBeNull();
      expect(q(page.root, '.aegov-checkbox-group__hint')).toBeNull();
    });

    it('validate() resolves valid for optional empty group', async () => {
      const page = await newSpecPage({
        components: [AegovCheckboxGroup, AegovCheckbox],
        html: `<aegov-checkbox-group>
          <aegov-checkbox value="a"></aegov-checkbox>
        </aegov-checkbox-group>`,
      });
      const r = await page.rootInstance.validate('manual');
      expect(r.valid).toBe(true);
    });

    it('valueMissing fires when isRequired and no children checked', async () => {
      const page = await newSpecPage({
        components: [AegovCheckboxGroup, AegovCheckbox],
        html: `<aegov-checkbox-group is-required>
          <aegov-checkbox value="a"></aegov-checkbox>
        </aegov-checkbox-group>`,
      });
      const r = await page.rootInstance.validate('manual');
      expect(r.valid).toBe(false);
      expect(r.validity.valueMissing).toBe(true);
    });

    it('setCustomValidity("msg") sets invalid + error', async () => {
      const page = await newSpecPage({
        components: [AegovCheckboxGroup, AegovCheckbox],
        html: `<aegov-checkbox-group>
          <aegov-checkbox value="a"></aegov-checkbox>
        </aegov-checkbox-group>`,
      });
      await page.rootInstance.setCustomValidity('At least 1');
      await page.waitForChanges();
      expect(page.rootInstance.isInvalid).toBe(true);
      expect(page.rootInstance.errorMessage).toBe('At least 1');
    });

    it('setCustomValidity("") clears state', async () => {
      const page = await newSpecPage({
        components: [AegovCheckboxGroup, AegovCheckbox],
        html: `<aegov-checkbox-group is-invalid="true" error-message="x">
          <aegov-checkbox value="a"></aegov-checkbox>
        </aegov-checkbox-group>`,
      });
      await page.rootInstance.setCustomValidity('');
      await page.waitForChanges();
      expect(page.rootInstance.isInvalid).toBe(false);
      expect(page.rootInstance.errorMessage).toBe('');
    });
  });

  it("keeps the author's aria-describedby alongside the hint and error ids", async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `<p id="ext">External help</p><aegov-checkbox-group label="G" aria-describedby="ext" hint="Hint"><aegov-checkbox value="1" label="a"></aegov-checkbox></aegov-checkbox-group>`,
    });
    const host = page.body.querySelector('aegov-checkbox-group') as HTMLAegovCheckboxGroupElement;
    // DS-A11Y-input-01: the external text is held in a hidden span in the shadow root.
    expect(q(host, 'fieldset').getAttribute('aria-describedby')).toMatch(/^aegov-checkbox-group-\d+-host-desc aegov-checkbox-group-\d+-hint$/);
    host.isInvalid = true;
    host.errorMessage = 'Err';
    await page.waitForChanges();
    expect(q(host, 'fieldset').getAttribute('aria-describedby')).toMatch(/^aegov-checkbox-group-\d+-host-desc aegov-checkbox-group-\d+-error$/);
    expect(q(host, '[id$="-host-desc"]').textContent).toBe('External help');
  });
});
