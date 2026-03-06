import { newSpecPage } from '@stencil/core/testing';
import { AegovSelect } from './aegov-select';
import { AegovSelectOption } from '../aegov-select-option/aegov-select-option';
import { AegovSelectOptionGroup } from '../aegov-select-option-group/aegov-select-option-group';

describe('aegov-select', () => {
  const components = [AegovSelect, AegovSelectOption, AegovSelectOptionGroup];

  describe('rendering - default variant', () => {
    it('renders a native select element', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select>
          <aegov-select-option value="1">One</aegov-select-option>
        </aegov-select>`,
      });
      const select = page.root.querySelector('select');
      expect(select).not.toBeNull();
    });

    it('renders with aegov-select class', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select>
          <aegov-select-option value="1">One</aegov-select-option>
        </aegov-select>`,
      });
      const select = page.root.querySelector('select');
      expect(select.className).toContain('aegov-select');
    });

    it('renders options from aegov-select-option children', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select>
          <aegov-select-option value="a">Alpha</aegov-select-option>
          <aegov-select-option value="b">Beta</aegov-select-option>
        </aegov-select>`,
      });
      const options = page.root.querySelectorAll('select option:not([disabled])');
      expect(options.length).toBe(2);
    });

    it('renders placeholder as disabled option', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select placeholder="Pick one">
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>`,
      });
      const placeholder = page.root.querySelector('select option[disabled]');
      expect(placeholder).not.toBeNull();
      expect(placeholder.textContent).toBe('Pick one');
    });

    it('renders option groups as optgroup', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select>
          <aegov-select-option-group label="Group A">
            <aegov-select-option value="1">One</aegov-select-option>
          </aegov-select-option-group>
        </aegov-select>`,
      });
      const optgroup = page.root.querySelector('select optgroup');
      expect(optgroup).not.toBeNull();
      expect(optgroup.getAttribute('label')).toBe('Group A');
    });

    it('renders disabled options', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select>
          <aegov-select-option value="a" disabled>Alpha</aegov-select-option>
        </aegov-select>`,
      });
      const opt = page.root.querySelector('select option[value="a"]');
      expect(opt.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('default props', () => {
    it('defaults variant to default', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select><aegov-select-option value="1">One</aegov-select-option></aegov-select>`,
      });
      expect(page.rootInstance.variant).toBe('default');
    });

    it('defaults size to base', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select><aegov-select-option value="1">One</aegov-select-option></aegov-select>`,
      });
      expect(page.rootInstance.size).toBe('base');
    });

    it('defaults multiple to false', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select><aegov-select-option value="1">One</aegov-select-option></aegov-select>`,
      });
      expect(page.rootInstance.multiple).toBe(false);
    });

    it('defaults disabled to false', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select><aegov-select-option value="1">One</aegov-select-option></aegov-select>`,
      });
      expect(page.rootInstance.disabled).toBe(false);
    });
  });

  describe('ID generation', () => {
    it('auto-generates a unique ID', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select><aegov-select-option value="1">One</aegov-select-option></aegov-select>`,
      });
      expect(page.root.getAttribute('field-id')).toMatch(/^aegov-select-\d+$/);
    });

    it('uses provided field-id', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select field-id="my-select"><aegov-select-option value="1">One</aegov-select-option></aegov-select>`,
      });
      const select = page.root.querySelector('select');
      expect(select.id).toBe('my-select');
    });
  });

  describe('size prop - default variant', () => {
    it('applies select--sm class', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select size="sm"><aegov-select-option value="1">One</aegov-select-option></aegov-select>`,
      });
      const select = page.root.querySelector('select');
      expect(select.className).toContain('select--sm');
    });

    it('applies select--base class', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select size="base"><aegov-select-option value="1">One</aegov-select-option></aegov-select>`,
      });
      const select = page.root.querySelector('select');
      expect(select.className).toContain('select--base');
    });

    it('applies select--lg class', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select size="lg"><aegov-select-option value="1">One</aegov-select-option></aegov-select>`,
      });
      const select = page.root.querySelector('select');
      expect(select.className).toContain('select--lg');
    });
  });

  describe('disabled prop - default variant', () => {
    it('sets disabled attribute on native select', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select disabled><aegov-select-option value="1">One</aegov-select-option></aegov-select>`,
      });
      const select = page.root.querySelector('select');
      expect(select.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('name prop - default variant', () => {
    it('sets name attribute on native select', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select name="country"><aegov-select-option value="1">One</aegov-select-option></aegov-select>`,
      });
      const select = page.root.querySelector('select');
      expect(select.getAttribute('name')).toBe('country');
    });
  });

  describe('required prop - default variant', () => {
    it('sets required attribute on native select', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select required><aegov-select-option value="1">One</aegov-select-option></aegov-select>`,
      });
      const select = page.root.querySelector('select');
      expect(select.hasAttribute('required')).toBe(true);
    });
  });

  describe('pass-through attributes', () => {
    it('passes data-* attributes to native select', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select data-testid="my-select"><aegov-select-option value="1">One</aegov-select-option></aegov-select>`,
      });
      const select = page.root.querySelector('select');
      expect(select.getAttribute('data-testid')).toBe('my-select');
    });

    it('passes aria-* attributes to native select', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select aria-describedby="help"><aegov-select-option value="1">One</aegov-select-option></aegov-select>`,
      });
      const select = page.root.querySelector('select');
      expect(select.getAttribute('aria-describedby')).toBe('help');
    });
  });

  describe('rendering - listbox variant', () => {
    it('renders a button trigger instead of native select', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox">
          <aegov-select-option value="1">One</aegov-select-option>
        </aegov-select>`,
      });
      const button = page.root.querySelector('button.aegov-select');
      expect(button).not.toBeNull();
      expect(page.root.querySelector('select')).toBeNull();
    });

    it('renders combobox role on trigger', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox">
          <aegov-select-option value="1">One</aegov-select-option>
        </aegov-select>`,
      });
      const button = page.root.querySelector('button');
      expect(button.getAttribute('role')).toBe('combobox');
      expect(button.getAttribute('aria-haspopup')).toBe('listbox');
    });

    it('shows placeholder text when nothing selected', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox" placeholder="Choose...">
          <aegov-select-option value="1">One</aegov-select-option>
        </aegov-select>`,
      });
      const value = page.root.querySelector('.select__value');
      expect(value.textContent).toBe('Choose...');
    });

    it('shows selected label when value is set', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox" value="1">
          <aegov-select-option value="1">One</aegov-select-option>
          <aegov-select-option value="2">Two</aegov-select-option>
        </aegov-select>`,
      });
      const value = page.root.querySelector('.select__value');
      expect(value.textContent).toBe('One');
    });

    it('renders arrow icon', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox">
          <aegov-select-option value="1">One</aegov-select-option>
        </aegov-select>`,
      });
      const arrow = page.root.querySelector('.select__arrow');
      expect(arrow).not.toBeNull();
    });

    it('does not show dropdown initially', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox">
          <aegov-select-option value="1">One</aegov-select-option>
        </aegov-select>`,
      });
      const listbox = page.root.querySelector('.select__listbox');
      expect(listbox).toBeNull();
    });

    it('opens dropdown on trigger click', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox">
          <aegov-select-option value="1">One</aegov-select-option>
        </aegov-select>`,
      });
      const button = page.root.querySelector('button') as HTMLButtonElement;
      button.click();
      await page.waitForChanges();
      const listbox = page.root.querySelector('.select__listbox');
      expect(listbox).not.toBeNull();
    });

    it('renders options in dropdown', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox">
          <aegov-select-option value="a">Alpha</aegov-select-option>
          <aegov-select-option value="b">Beta</aegov-select-option>
        </aegov-select>`,
      });
      const button = page.root.querySelector('button') as HTMLButtonElement;
      button.click();
      await page.waitForChanges();
      const options = page.root.querySelectorAll('.select__option');
      expect(options.length).toBe(2);
    });

    it('renders group labels in dropdown', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox">
          <aegov-select-option-group label="Fruits">
            <aegov-select-option value="apple">Apple</aegov-select-option>
          </aegov-select-option-group>
        </aegov-select>`,
      });
      const button = page.root.querySelector('button') as HTMLButtonElement;
      button.click();
      await page.waitForChanges();
      const groupLabel = page.root.querySelector('.select__group-label');
      expect(groupLabel).not.toBeNull();
      expect(groupLabel.textContent).toBe('Fruits');
    });

    it('selects option on click and closes dropdown', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox">
          <aegov-select-option value="a">Alpha</aegov-select-option>
          <aegov-select-option value="b">Beta</aegov-select-option>
        </aegov-select>`,
      });
      const button = page.root.querySelector('button') as HTMLButtonElement;
      button.click();
      await page.waitForChanges();
      const option = page.root.querySelector('.select__option[data-value="b"]') as HTMLDivElement;
      option.click();
      await page.waitForChanges();
      expect(page.rootInstance.value).toBe('b');
      // Dropdown should be closed for single select
      expect(page.root.querySelector('.select__listbox')).toBeNull();
    });

    it('does not select disabled options', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox">
          <aegov-select-option value="a" disabled>Alpha</aegov-select-option>
        </aegov-select>`,
      });
      const button = page.root.querySelector('button') as HTMLButtonElement;
      button.click();
      await page.waitForChanges();
      const option = page.root.querySelector('.select__option') as HTMLDivElement;
      option.click();
      await page.waitForChanges();
      expect(page.rootInstance.value).toBe('');
    });
  });

  describe('size prop - listbox variant', () => {
    it('applies select--sm to trigger', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox" size="sm">
          <aegov-select-option value="1">One</aegov-select-option>
        </aegov-select>`,
      });
      const button = page.root.querySelector('button');
      expect(button.className).toContain('select--sm');
    });

    it('applies select--lg to trigger', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox" size="lg">
          <aegov-select-option value="1">One</aegov-select-option>
        </aegov-select>`,
      });
      const button = page.root.querySelector('button');
      expect(button.className).toContain('select--lg');
    });
  });

  describe('multiple selection', () => {
    it('forces listbox rendering when multiple is set', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select multiple>
          <aegov-select-option value="1">One</aegov-select-option>
        </aegov-select>`,
      });
      const button = page.root.querySelector('button.aegov-select');
      expect(button).not.toBeNull();
      expect(page.root.querySelector('select')).toBeNull();
    });

    it('shows checkboxes for options', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select multiple>
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>`,
      });
      const button = page.root.querySelector('button') as HTMLButtonElement;
      button.click();
      await page.waitForChanges();
      const checkbox = page.root.querySelector('.select__checkbox');
      expect(checkbox).not.toBeNull();
    });

    it('keeps dropdown open after selecting in multiple mode', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select multiple>
          <aegov-select-option value="a">Alpha</aegov-select-option>
          <aegov-select-option value="b">Beta</aegov-select-option>
        </aegov-select>`,
      });
      const button = page.root.querySelector('button') as HTMLButtonElement;
      button.click();
      await page.waitForChanges();
      const option = page.root.querySelector('.select__option[data-value="a"]') as HTMLDivElement;
      option.click();
      await page.waitForChanges();
      // Dropdown should remain open
      expect(page.root.querySelector('.select__listbox')).not.toBeNull();
    });

    it('shows count in trigger for multiple selections', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select multiple value="a,b">
          <aegov-select-option value="a">Alpha</aegov-select-option>
          <aegov-select-option value="b">Beta</aegov-select-option>
          <aegov-select-option value="c">Gamma</aegov-select-option>
        </aegov-select>`,
      });
      const value = page.root.querySelector('.select__value');
      expect(value.textContent).toBe('2 selected');
    });

    it('toggles selection on repeated clicks', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select multiple>
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>`,
      });
      const button = page.root.querySelector('button') as HTMLButtonElement;
      button.click();
      await page.waitForChanges();
      const option = page.root.querySelector('.select__option[data-value="a"]') as HTMLDivElement;
      // Select
      option.click();
      await page.waitForChanges();
      expect(page.rootInstance.value).toBe('a');
      // Deselect
      option.click();
      await page.waitForChanges();
      expect(page.rootInstance.value).toBe('');
    });
  });

  describe('searchable', () => {
    it('renders search input when searchable and listbox', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox" searchable>
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>`,
      });
      const button = page.root.querySelector('button') as HTMLButtonElement;
      button.click();
      await page.waitForChanges();
      const searchInput = page.root.querySelector('.select__search-input');
      expect(searchInput).not.toBeNull();
    });

    it('filters options based on search query', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox" searchable>
          <aegov-select-option value="a">Alpha</aegov-select-option>
          <aegov-select-option value="b">Beta</aegov-select-option>
        </aegov-select>`,
      });
      const button = page.root.querySelector('button') as HTMLButtonElement;
      button.click();
      await page.waitForChanges();

      // Type in search
      page.rootInstance.searchQuery = 'alp';
      await page.waitForChanges();

      const options = page.root.querySelectorAll('.select__option');
      expect(options.length).toBe(1);
      expect(options[0].textContent.trim()).toContain('Alpha');
    });

    it('shows empty message when no results', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox" searchable empty-message="Nothing found">
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>`,
      });
      const button = page.root.querySelector('button') as HTMLButtonElement;
      button.click();
      await page.waitForChanges();

      page.rootInstance.searchQuery = 'xyz';
      await page.waitForChanges();

      const empty = page.root.querySelector('.select__empty');
      expect(empty).not.toBeNull();
      expect(empty.textContent).toBe('Nothing found');
    });
  });

  describe('clearable', () => {
    it('shows clear button when clearable and has value', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox" clearable value="a">
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>`,
      });
      const clear = page.root.querySelector('.select__clear');
      expect(clear).not.toBeNull();
    });

    it('does not show clear button when no value', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox" clearable>
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>`,
      });
      const clear = page.root.querySelector('.select__clear');
      expect(clear).toBeNull();
    });

    it('clears value on clear button click', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox" clearable value="a">
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>`,
      });
      const clear = page.root.querySelector('.select__clear') as HTMLSpanElement;
      clear.click();
      await page.waitForChanges();
      expect(page.rootInstance.value).toBe('');
    });
  });

  describe('events', () => {
    it('emits aegovSelectChange on native select change', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select>
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>`,
      });
      const spy = jest.fn();
      page.root.addEventListener('aegovSelectChange', spy);
      const select = page.root.querySelector('select');
      select.value = 'a';
      select.dispatchEvent(new Event('change'));
      expect(spy).toHaveBeenCalled();
    });

    it('emits aegovSelectChange on listbox option click', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox">
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>`,
      });
      const spy = jest.fn();
      page.root.addEventListener('aegovSelectChange', spy);
      const button = page.root.querySelector('button') as HTMLButtonElement;
      button.click();
      await page.waitForChanges();
      const option = page.root.querySelector('.select__option') as HTMLDivElement;
      option.click();
      await page.waitForChanges();
      expect(spy).toHaveBeenCalled();
    });

    it('emits aegovSelectOpen when dropdown opens', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox">
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>`,
      });
      const spy = jest.fn();
      page.root.addEventListener('aegovSelectOpen', spy);
      const button = page.root.querySelector('button') as HTMLButtonElement;
      button.click();
      await page.waitForChanges();
      expect(spy).toHaveBeenCalled();
    });

    it('emits aegovSelectClose when dropdown closes', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox">
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>`,
      });
      const spy = jest.fn();
      page.root.addEventListener('aegovSelectClose', spy);
      // Open then close
      const button = page.root.querySelector('button') as HTMLButtonElement;
      button.click();
      await page.waitForChanges();
      button.click();
      await page.waitForChanges();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('disabled state - listbox variant', () => {
    it('disables the trigger button', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox" disabled>
          <aegov-select-option value="1">One</aegov-select-option>
        </aegov-select>`,
      });
      const button = page.root.querySelector('button');
      expect(button.hasAttribute('disabled')).toBe(true);
    });

    it('adds select--disabled class', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox" disabled>
          <aegov-select-option value="1">One</aegov-select-option>
        </aegov-select>`,
      });
      const button = page.root.querySelector('button');
      expect(button.className).toContain('select--disabled');
    });
  });

  describe('form submission', () => {
    it('renders hidden input with name and value for listbox', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox" name="country" value="ae">
          <aegov-select-option value="ae">UAE</aegov-select-option>
        </aegov-select>`,
      });
      const hidden = page.root.querySelector('input[type="hidden"]');
      expect(hidden).not.toBeNull();
      expect(hidden.getAttribute('name')).toBe('country');
      expect(hidden.getAttribute('value')).toBe('ae');
    });
  });

  describe('custom class', () => {
    it('merges custom class on native select', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select class="my-class"><aegov-select-option value="1">One</aegov-select-option></aegov-select>`,
      });
      const select = page.root.querySelector('select');
      expect(select.className).toContain('my-class');
    });

    it('merges custom class on listbox trigger', async () => {
      const page = await newSpecPage({
        components,
        html: `<aegov-select variant="listbox" class="my-class"><aegov-select-option value="1">One</aegov-select-option></aegov-select>`,
      });
      const button = page.root.querySelector('button');
      expect(button.className).toContain('my-class');
    });
  });
});
