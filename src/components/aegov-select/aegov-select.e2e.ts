import { newE2EPage } from '@stencil/core/testing';

describe('aegov-select E2E', () => {
  describe('rendering - default variant', () => {
    it('should render a native select', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select>
          <aegov-select-option value="a">Alpha</aegov-select-option>
          <aegov-select-option value="b">Beta</aegov-select-option>
        </aegov-select>
      `);
      const select = await page.find('aegov-select select');
      expect(select).toBeTruthy();
    });

    it('should have aegov-select class', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select>
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>
      `);
      const select = await page.find('aegov-select select');
      expect(await select.getAttribute('class')).toContain('aegov-select');
    });

    it('should render options from children', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select>
          <aegov-select-option value="a">Alpha</aegov-select-option>
          <aegov-select-option value="b">Beta</aegov-select-option>
        </aegov-select>
      `);
      const options = await page.findAll('aegov-select select option:not([disabled])');
      expect(options.length).toBe(2);
    });

    it('should render placeholder', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select placeholder="Pick one">
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>
      `);
      const placeholder = await page.find('aegov-select select option[disabled]');
      expect(placeholder).toBeTruthy();
      expect(await placeholder.innerText).toContain('Pick one');
    });

    it('should render optgroup from option groups', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select>
          <aegov-select-option-group label="Group A">
            <aegov-select-option value="1">One</aegov-select-option>
          </aegov-select-option-group>
        </aegov-select>
      `);
      const optgroup = await page.find('aegov-select select optgroup');
      expect(optgroup).toBeTruthy();
      expect(await optgroup.getAttribute('label')).toBe('Group A');
    });
  });

  describe('size prop', () => {
    it('should apply select--sm class', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select size="sm">
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>
      `);
      const select = await page.find('aegov-select select');
      expect(await select.getAttribute('class')).toContain('select--sm');
    });

    it('should apply select--lg class', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select size="lg">
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>
      `);
      const select = await page.find('aegov-select select');
      expect(await select.getAttribute('class')).toContain('select--lg');
    });
  });

  describe('ID generation', () => {
    it('should auto-generate ID on native select', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select>
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>
      `);
      const select = await page.find('aegov-select select');
      expect(await select.getAttribute('id')).toMatch(/^aegov-select-\d+$/);
    });

    it('should use provided field-id', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select field-id="my-sel">
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>
      `);
      const select = await page.find('aegov-select select');
      expect(await select.getAttribute('id')).toBe('my-sel');
    });
  });

  describe('events - default variant', () => {
    it('should emit aegovSelectChange on native change', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select>
          <aegov-select-option value="a">Alpha</aegov-select-option>
          <aegov-select-option value="b">Beta</aegov-select-option>
        </aegov-select>
      `);
      const changeEvent = await page.spyOnEvent('aegovSelectChange');
      await page.select('aegov-select select', 'b');
      expect(changeEvent).toHaveReceivedEvent();
    });
  });

  describe('listbox variant', () => {
    it('should render a button trigger', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select variant="listbox">
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>
      `);
      const button = await page.find('aegov-select button.aegov-select');
      expect(button).toBeTruthy();
    });

    it('should open dropdown on click', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select variant="listbox">
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>
      `);
      const button = await page.find('aegov-select button');
      await button.click();
      await page.waitForChanges();
      const listbox = await page.find('aegov-select .select__listbox');
      expect(listbox).toBeTruthy();
    });

    it('should render options in dropdown', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select variant="listbox">
          <aegov-select-option value="a">Alpha</aegov-select-option>
          <aegov-select-option value="b">Beta</aegov-select-option>
        </aegov-select>
      `);
      const button = await page.find('aegov-select button');
      await button.click();
      await page.waitForChanges();
      const options = await page.findAll('aegov-select .select__option');
      expect(options.length).toBe(2);
    });

    it('should select option and close dropdown', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select variant="listbox">
          <aegov-select-option value="a">Alpha</aegov-select-option>
          <aegov-select-option value="b">Beta</aegov-select-option>
        </aegov-select>
      `);
      const changeEvent = await page.spyOnEvent('aegovSelectChange');
      const button = await page.find('aegov-select button');
      await button.click();
      await page.waitForChanges();
      const option = await page.find('aegov-select .select__option[data-value="b"]');
      await option.click();
      await page.waitForChanges();
      expect(changeEvent).toHaveReceivedEvent();
      // Dropdown should be closed
      const listbox = await page.find('aegov-select .select__listbox');
      expect(listbox).toBeNull();
    });

    it('should show selected label in trigger', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select variant="listbox">
          <aegov-select-option value="a">Alpha</aegov-select-option>
          <aegov-select-option value="b">Beta</aegov-select-option>
        </aegov-select>
      `);
      const button = await page.find('aegov-select button');
      await button.click();
      await page.waitForChanges();
      const option = await page.find('aegov-select .select__option[data-value="b"]');
      await option.click();
      await page.waitForChanges();
      const value = await page.find('aegov-select .select__value');
      expect(await value.innerText).toBe('Beta');
    });

    it('should close dropdown on Escape', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select variant="listbox">
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>
      `);
      const button = await page.find('aegov-select button');
      await button.click();
      await page.waitForChanges();
      await page.keyboard.press('Escape');
      await page.waitForChanges();
      const listbox = await page.find('aegov-select .select__listbox');
      expect(listbox).toBeNull();
    });

    it('should close on outside click', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <div id="outside" style="height:50px;"></div>
        <aegov-select variant="listbox">
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>
      `);
      const button = await page.find('aegov-select button');
      await button.click();
      await page.waitForChanges();
      await page.click('#outside');
      await page.waitForChanges();
      const listbox = await page.find('aegov-select .select__listbox');
      expect(listbox).toBeNull();
    });
  });

  describe('multiple selection', () => {
    it('should force listbox when multiple is set', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select multiple>
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>
      `);
      const button = await page.find('aegov-select button.aegov-select');
      expect(button).toBeTruthy();
    });

    it('should keep dropdown open after selecting in multiple mode', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select multiple>
          <aegov-select-option value="a">Alpha</aegov-select-option>
          <aegov-select-option value="b">Beta</aegov-select-option>
        </aegov-select>
      `);
      const button = await page.find('aegov-select button');
      await button.click();
      await page.waitForChanges();
      const option = await page.find('aegov-select .select__option[data-value="a"]');
      await option.click();
      await page.waitForChanges();
      const listbox = await page.find('aegov-select .select__listbox');
      expect(listbox).toBeTruthy();
    });

    it('should show selection count in trigger', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select multiple>
          <aegov-select-option value="a">Alpha</aegov-select-option>
          <aegov-select-option value="b">Beta</aegov-select-option>
        </aegov-select>
      `);
      const button = await page.find('aegov-select button');
      await button.click();
      await page.waitForChanges();
      // Select first
      const optA = await page.find('aegov-select .select__option[data-value="a"]');
      await optA.click();
      await page.waitForChanges();
      // Select second
      const optB = await page.find('aegov-select .select__option[data-value="b"]');
      await optB.click();
      await page.waitForChanges();
      const value = await page.find('aegov-select .select__value');
      expect(await value.innerText).toBe('2 selected');
    });

    it('should render checkboxes in multiple mode', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select multiple>
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>
      `);
      const button = await page.find('aegov-select button');
      await button.click();
      await page.waitForChanges();
      const checkbox = await page.find('aegov-select .select__checkbox');
      expect(checkbox).toBeTruthy();
    });
  });

  describe('searchable', () => {
    it('should render search input in dropdown', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select variant="listbox" searchable>
          <aegov-select-option value="a">Alpha</aegov-select-option>
          <aegov-select-option value="b">Beta</aegov-select-option>
        </aegov-select>
      `);
      const button = await page.find('aegov-select button');
      await button.click();
      await page.waitForChanges();
      const searchInput = await page.find('aegov-select .select__search-input');
      expect(searchInput).toBeTruthy();
    });

    it('should filter options as user types', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select variant="listbox" searchable>
          <aegov-select-option value="a">Alpha</aegov-select-option>
          <aegov-select-option value="b">Beta</aegov-select-option>
          <aegov-select-option value="g">Gamma</aegov-select-option>
        </aegov-select>
      `);
      const button = await page.find('aegov-select button');
      await button.click();
      await page.waitForChanges();
      const searchInput = await page.find('aegov-select .select__search-input');
      await searchInput.type('alp');
      await page.waitForChanges();
      const options = await page.findAll('aegov-select .select__option');
      expect(options.length).toBe(1);
    });

    it('should show empty message when no matches', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select variant="listbox" searchable empty-message="Nothing here">
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>
      `);
      const button = await page.find('aegov-select button');
      await button.click();
      await page.waitForChanges();
      const searchInput = await page.find('aegov-select .select__search-input');
      await searchInput.type('xyz');
      await page.waitForChanges();
      const empty = await page.find('aegov-select .select__empty');
      expect(empty).toBeTruthy();
      expect(await empty.innerText).toContain('Nothing here');
    });
  });

  describe('clearable', () => {
    it('should show clear button when value is set', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select variant="listbox" clearable value="a">
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>
      `);
      const clear = await page.find('aegov-select .select__clear');
      expect(clear).toBeTruthy();
    });

    it('should clear value on clear click', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select variant="listbox" clearable value="a">
          <aegov-select-option value="a">Alpha</aegov-select-option>
        </aegov-select>
      `);
      const changeEvent = await page.spyOnEvent('aegovSelectChange');
      const clear = await page.find('aegov-select .select__clear');
      await clear.click();
      await page.waitForChanges();
      expect(changeEvent).toHaveReceivedEvent();
      const value = await page.find('aegov-select .select__value');
      // Should show placeholder or empty
      expect(await value.innerText).not.toBe('Alpha');
    });
  });

  describe('form-field integration', () => {
    it('should link label to select in aegov-form-field', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-form-field>
          <aegov-label>Country</aegov-label>
          <aegov-select field-id="country-field">
            <aegov-select-option value="ae">UAE</aegov-select-option>
          </aegov-select>
        </aegov-form-field>
      `);
      await page.waitForChanges();
      const label = await page.find('aegov-form-field aegov-label label');
      expect(await label.getAttribute('for')).toBe('country-field');
    });
  });
});
