import { newSpecPage } from '@stencil/core/testing';
import { AegovSelect } from './aegov-select';
import { AegovSelectOption } from '../aegov-select-option/aegov-select-option';
import { AegovSelectOptionGroup } from '../aegov-select-option-group/aegov-select-option-group';

describe('aegov-select', () => {
  describe('native appearance (default)', () => {
    it('renders a native <select> element', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select>
          <aegov-select-option value="a">Apple</aegov-select-option>
          <aegov-select-option value="b">Banana</aegov-select-option>
        </aegov-select>`,
      });
      const select = page.root.querySelector('select');
      expect(select).not.toBeNull();
      expect(select.className).toContain('aegov-select');
      expect(select.className).toContain('select--base');
    });

    it('renders option children parsed from light DOM', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select>
          <aegov-select-option value="a">Apple</aegov-select-option>
          <aegov-select-option value="b" is-disabled="true">Banana</aegov-select-option>
        </aegov-select>`,
      });
      const options = page.root.querySelectorAll('select option');
      // No placeholder, so 2 options
      expect(options.length).toBe(2);
      expect(options[0].getAttribute('value')).toBe('a');
      expect(options[0].textContent.trim()).toBe('Apple');
      expect(options[1].getAttribute('value')).toBe('b');
      expect((options[1] as HTMLOptionElement).hasAttribute("disabled")).toBe(true);
    });

    it('renders placeholder as a disabled first option', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select placeholder="Choose…">
          <aegov-select-option value="a">Apple</aegov-select-option>
        </aegov-select>`,
      });
      const options = page.root.querySelectorAll('select option');
      expect(options.length).toBe(2);
      expect(options[0].getAttribute('value')).toBe('');
      expect(options[0].textContent.trim()).toBe('Choose…');
      expect((options[0] as HTMLOptionElement).hasAttribute("disabled")).toBe(true);
    });

    it('renders option groups via <optgroup>', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption, AegovSelectOptionGroup],
        html: `<aegov-select>
          <aegov-select-option-group label="Fruit">
            <aegov-select-option value="a">Apple</aegov-select-option>
          </aegov-select-option-group>
        </aegov-select>`,
      });
      const optgroup = page.root.querySelector('select optgroup');
      expect(optgroup).not.toBeNull();
      expect(optgroup.getAttribute('label')).toBe('Fruit');
      expect(optgroup.querySelector('option').getAttribute('value')).toBe('a');
    });

    it('reflects isDisabled, isRequired, name on native select', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select is-disabled="true" is-required="true" name="fruit">
          <aegov-select-option value="a">A</aegov-select-option>
        </aegov-select>`,
      });
      const select = page.root.querySelector('select') as HTMLSelectElement;
      expect(select.hasAttribute("disabled")).toBe(true);
      expect(select.hasAttribute("required")).toBe(true);
      expect(select.getAttribute("name")).toBe('fruit');
    });

    it('emits aegovSelectChange on native change event', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select>
          <aegov-select-option value="a">Apple</aegov-select-option>
          <aegov-select-option value="b">Banana</aegov-select-option>
        </aegov-select>`,
      });
      const spy = jest.fn();
      page.root.addEventListener('aegovSelectChange', spy);
      const select = page.root.querySelector('select') as HTMLSelectElement;
      select.value = 'b';
      select.dispatchEvent(new Event('change'));
      await page.waitForChanges();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0].detail).toEqual({ value: 'b', label: 'Banana' });
    });

    it('forwards aria-* and data-* and pass-through attributes to native select', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select aria-label="Fruit" data-test="x" autofocus form="myForm">
          <aegov-select-option value="a">Apple</aegov-select-option>
        </aegov-select>`,
      });
      const select = page.root.querySelector('select');
      expect(select.getAttribute('aria-label')).toBe('Fruit');
      expect(select.getAttribute('data-test')).toBe('x');
      expect(select.hasAttribute('autofocus')).toBe(true);
      expect(select.getAttribute('form')).toBe('myForm');
    });
  });

  describe('listbox appearance', () => {
    it('renders a button with role=combobox instead of native select', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select appearance="listbox">
          <aegov-select-option value="a">Apple</aegov-select-option>
        </aegov-select>`,
      });
      expect(page.root.querySelector('select')).toBeNull();
      const trigger = page.root.querySelector('button[role="combobox"]');
      expect(trigger).not.toBeNull();
      expect(trigger.getAttribute('aria-haspopup')).toBe('listbox');
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });

    it('opens the listbox when trigger is clicked', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select appearance="listbox">
          <aegov-select-option value="a">Apple</aegov-select-option>
          <aegov-select-option value="b">Banana</aegov-select-option>
        </aegov-select>`,
      });
      const trigger = page.root.querySelector('button[role="combobox"]') as HTMLButtonElement;
      trigger.click();
      await page.waitForChanges();
      const listbox = page.root.querySelector('[role="listbox"]');
      expect(listbox).not.toBeNull();
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
      const options = page.root.querySelectorAll(`[role="listbox"] [role="option"]`);
      expect(options.length).toBe(2);
    });

    it('selects an option on click and emits aegovSelectChange', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select appearance="listbox">
          <aegov-select-option value="a">Apple</aegov-select-option>
          <aegov-select-option value="b">Banana</aegov-select-option>
        </aegov-select>`,
      });
      const spy = jest.fn();
      page.root.addEventListener('aegovSelectChange', spy);
      (page.root.querySelector('button[role="combobox"]') as HTMLButtonElement).click();
      await page.waitForChanges();
      const opt = page.root.querySelectorAll(`[role="listbox"] [role="option"]`)[1] as HTMLElement;
      opt.click();
      await page.waitForChanges();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0].detail).toEqual({ value: 'b', label: 'Banana' });
      expect(page.rootInstance.value).toBe('b');
    });

    it('does not select disabled options', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select appearance="listbox">
          <aegov-select-option value="a" is-disabled="true">Apple</aegov-select-option>
        </aegov-select>`,
      });
      const spy = jest.fn();
      page.root.addEventListener('aegovSelectChange', spy);
      (page.root.querySelector('button[role="combobox"]') as HTMLButtonElement).click();
      await page.waitForChanges();
      const opt = page.root.querySelector(`[role="listbox"] [role="option"]`) as HTMLElement;
      opt.click();
      await page.waitForChanges();
      expect(spy).not.toHaveBeenCalled();
    });

    it('renders search input when isSearchable and filters options', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select appearance="listbox" is-searchable="true">
          <aegov-select-option value="a">Apple</aegov-select-option>
          <aegov-select-option value="b">Banana</aegov-select-option>
          <aegov-select-option value="c">Cherry</aegov-select-option>
        </aegov-select>`,
      });
      (page.root.querySelector('button[role="combobox"]') as HTMLButtonElement).click();
      await page.waitForChanges();
      const search = page.root.querySelector('.select__search-input') as HTMLInputElement;
      expect(search).not.toBeNull();
      search.value = 'an';
      search.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      const visible = page.root.querySelectorAll(`[role="listbox"] [role="option"]`);
      expect(visible.length).toBe(1);
      expect(visible[0].textContent).toContain('Banana');
    });

    it('shows empty message when search has no results', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select appearance="listbox" is-searchable="true" empty-message="Nothing here">
          <aegov-select-option value="a">Apple</aegov-select-option>
        </aegov-select>`,
      });
      (page.root.querySelector('button[role="combobox"]') as HTMLButtonElement).click();
      await page.waitForChanges();
      const search = page.root.querySelector('.select__search-input') as HTMLInputElement;
      search.value = 'zzz';
      search.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      const empty = page.root.querySelector('.select__empty');
      expect(empty).not.toBeNull();
      expect(empty.textContent).toBe('Nothing here');
    });

    it('isMultiple toggles values on click and aria-multiselectable', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select is-multiple="true">
          <aegov-select-option value="a">Apple</aegov-select-option>
          <aegov-select-option value="b">Banana</aegov-select-option>
        </aegov-select>`,
      });
      const spy = jest.fn();
      page.root.addEventListener('aegovSelectChange', spy);
      (page.root.querySelector('button[role="combobox"]') as HTMLButtonElement).click();
      await page.waitForChanges();
      const listbox = page.root.querySelector('[role="listbox"]');
      expect(listbox.getAttribute('aria-multiselectable')).toBe('true');
      const opts = page.root.querySelectorAll(`[role="listbox"] [role="option"]`);
      (opts[0] as HTMLElement).click();
      await page.waitForChanges();
      (opts[1] as HTMLElement).click();
      await page.waitForChanges();
      expect(page.rootInstance.value).toBe('a,b');
      const last = spy.mock.calls[spy.mock.calls.length - 1][0].detail;
      expect(last.value).toEqual(['a', 'b']);
      expect(last.label).toEqual(['Apple', 'Banana']);
    });

    it('renders clear button when isClearable and a value is set; clears on click', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select appearance="listbox" is-clearable="true" value="a">
          <aegov-select-option value="a">Apple</aegov-select-option>
        </aegov-select>`,
      });
      const clear = page.root.querySelector('.select__clear') as HTMLElement;
      expect(clear).not.toBeNull();
      const spy = jest.fn();
      page.root.addEventListener('aegovSelectChange', spy);
      clear.click();
      await page.waitForChanges();
      expect(page.rootInstance.value).toBe('');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0].detail).toEqual({ value: '', label: '' });
    });

    it('does not render clear button when value is empty', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select appearance="listbox" is-clearable="true">
          <aegov-select-option value="a">Apple</aegov-select-option>
        </aegov-select>`,
      });
      expect(page.root.querySelector('.select__clear')).toBeNull();
    });

    it('shows placeholder text when nothing selected', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select appearance="listbox" placeholder="Pick one">
          <aegov-select-option value="a">Apple</aegov-select-option>
        </aegov-select>`,
      });
      const value = page.root.querySelector('.select__value');
      expect(value.textContent.trim()).toBe('Pick one');
      expect(page.root.querySelector('button[role="combobox"]').className).toContain('select--placeholder');
    });

    it('shows resolved label when value matches a parsed option', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select appearance="listbox" value="b">
          <aegov-select-option value="a">Apple</aegov-select-option>
          <aegov-select-option value="b">Banana</aegov-select-option>
        </aegov-select>`,
      });
      expect(page.root.querySelector('.select__value').textContent.trim()).toBe('Banana');
    });

    it('disables trigger when isDisabled', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select appearance="listbox" is-disabled="true">
          <aegov-select-option value="a">Apple</aegov-select-option>
        </aegov-select>`,
      });
      const trigger = page.root.querySelector('button[role="combobox"]') as HTMLButtonElement;
      expect(trigger.hasAttribute('disabled')).toBe(true);
      trigger.click();
      await page.waitForChanges();
      expect(page.rootInstance.isOpen).toBe(false);
    });

    it('uses ElementInternals for form submission (replaces hidden input per §2.5)', async () => {
      // Per validation-engine-addon.md §2.5: listbox upgraded to formAssociated: true.
      // Hidden input removed; ElementInternals.setFormValue() handles submission.
      // jsdom mock has no ElementInternals — assert hidden input gone and props tracked.
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select appearance="listbox" name="fruit" value="a">
          <aegov-select-option value="a">Apple</aegov-select-option>
        </aegov-select>`,
      });
      expect(page.root.querySelector('input[type="hidden"]')).toBeNull();
      expect(page.rootInstance.name).toBe('fruit');
      expect(page.rootInstance.value).toBe('a');
    });
  });

  describe('common behavior', () => {
    it('auto-generates fieldId when not provided', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select><aegov-select-option value="a">A</aegov-select-option></aegov-select>`,
      });
      expect(page.rootInstance.fieldId).toMatch(/^aegov-select-\d+$/);
    });

    it('respects user-provided fieldId', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select field-id="my-select"><aegov-select-option value="a">A</aegov-select-option></aegov-select>`,
      });
      expect(page.rootInstance.fieldId).toBe('my-select');
    });

    it('applies size class to native select', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select size="lg"><aegov-select-option value="a">A</aegov-select-option></aegov-select>`,
      });
      expect(page.root.querySelector('select').className).toContain('select--lg');
    });

    it('parses options into parsedOptions state', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption, AegovSelectOptionGroup],
        html: `<aegov-select appearance="listbox">
          <aegov-select-option-group label="Fruit">
            <aegov-select-option value="a">Apple</aegov-select-option>
          </aegov-select-option-group>
          <aegov-select-option value="z">Other</aegov-select-option>
        </aegov-select>`,
      });
      const opts = page.rootInstance.parsedOptions;
      expect(opts).toEqual([
        { value: 'a', label: 'Apple', disabled: false, group: 'Fruit' },
        { value: 'z', label: 'Other', disabled: false },
      ]);
    });
  });

  // Validation surface (Layer 1) — see validation-engine-addon.md §2.8
  describe('validation surface', () => {
    it('toggles aria-invalid on native select when isInvalid', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select is-invalid="true">
          <aegov-select-option value="a">A</aegov-select-option>
        </aegov-select>`,
      });
      expect(page.root.querySelector('select').getAttribute('aria-invalid')).toBe('true');
      expect(page.root.classList.contains('is-invalid')).toBe(true);
    });

    it('toggles aria-invalid on listbox button when isInvalid', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select appearance="listbox" is-invalid="true">
          <aegov-select-option value="a">A</aegov-select-option>
        </aegov-select>`,
      });
      expect(page.root.querySelector('button').getAttribute('aria-invalid')).toBe('true');
      expect(page.root.classList.contains('is-invalid')).toBe(true);
    });

    it('renders errorMessage in error region (native appearance)', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select is-invalid="true" error-message="Required">
          <aegov-select-option value="a">A</aegov-select-option>
        </aegov-select>`,
      });
      expect(page.root.querySelector('.aegov-select__error').textContent).toBe('Required');
    });

    it('renders hint when not invalid', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select hint="Pick one">
          <aegov-select-option value="a">A</aegov-select-option>
        </aegov-select>`,
      });
      expect(page.root.querySelector('.aegov-select__hint').textContent).toBe('Pick one');
    });

    it('hides hint when error shown', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select hint="h" is-invalid="true" error-message="err">
          <aegov-select-option value="a">A</aegov-select-option>
        </aegov-select>`,
      });
      expect(page.root.querySelector('.aegov-select__error')).not.toBeNull();
      expect(page.root.querySelector('.aegov-select__hint')).toBeNull();
    });

    it('validate() resolves valid for empty optional select', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select>
          <aegov-select-option value="a">A</aegov-select-option>
        </aegov-select>`,
      });
      const r = await page.rootInstance.validate('manual');
      expect(r.valid).toBe(true);
    });

    it('setCustomValidity("msg") sets invalid + error', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select>
          <aegov-select-option value="a">A</aegov-select-option>
        </aegov-select>`,
      });
      await page.rootInstance.setCustomValidity('Pick one');
      await page.waitForChanges();
      expect(page.rootInstance.isInvalid).toBe(true);
      expect(page.rootInstance.errorMessage).toBe('Pick one');
    });

    it('setCustomValidity("") clears state', async () => {
      const page = await newSpecPage({
        components: [AegovSelect, AegovSelectOption],
        html: `<aegov-select is-invalid="true" error-message="x">
          <aegov-select-option value="a">A</aegov-select-option>
        </aegov-select>`,
      });
      await page.rootInstance.setCustomValidity('');
      await page.waitForChanges();
      expect(page.rootInstance.isInvalid).toBe(false);
      expect(page.rootInstance.errorMessage).toBe('');
    });
  });
});

// aegov-select-option and aegov-select-option-group have their own spec files
// in their respective component directories.
