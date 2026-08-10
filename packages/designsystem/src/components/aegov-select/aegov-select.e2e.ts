import { newE2EPage } from '@stencil/core/testing';

describe('aegov-select (e2e)', () => {
  describe('native appearance', () => {
    it('renders a native select with parsed options', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select>
          <aegov-select-option value="a">Apple</aegov-select-option>
          <aegov-select-option value="b">Banana</aegov-select-option>
        </aegov-select>
      `);
      const select = await page.find('aegov-select select');
      expect(select).not.toBeNull();
      const options = await page.findAll('aegov-select select option');
      expect(options.length).toBe(2);
    });

    it('emits aegovSelectChange when user changes the native select', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select>
          <aegov-select-option value="a">Apple</aegov-select-option>
          <aegov-select-option value="b">Banana</aegov-select-option>
        </aegov-select>
      `);
      const el = await page.find('aegov-select');
      const spy = await el.spyOnEvent('aegovSelectChange');
      await page.$eval('aegov-select select', (s: HTMLSelectElement) => {
        s.value = 'b';
        s.dispatchEvent(new Event('change', { bubbles: true }));
      });
      await page.waitForChanges();
      expect(spy).toHaveReceivedEventTimes(1);
      expect(spy.lastEvent.detail).toEqual({ value: 'b', label: 'Banana' });
    });

    it('forwards autofocus and form pass-through attributes', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select autofocus="true" form="myForm">
          <aegov-select-option value="a">A</aegov-select-option>
        </aegov-select>
      `);
      const select = await page.find('aegov-select select');
      expect(select.getAttribute('form')).toBe('myForm');
      expect(select.getAttribute('autofocus')).not.toBeNull();
    });
  });

  describe('listbox appearance', () => {
    it('opens the dropdown on trigger click', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select appearance="listbox">
          <aegov-select-option value="a">Apple</aegov-select-option>
          <aegov-select-option value="b">Banana</aegov-select-option>
        </aegov-select>
      `);
      const trigger = await page.find('aegov-select button[role="combobox"]');
      expect(await trigger.getAttribute('aria-expanded')).toBe('false');
      await trigger.click();
      await page.waitForChanges();
      expect(await trigger.getAttribute('aria-expanded')).toBe('true');
      const listbox = await page.find('aegov-select [role="listbox"]');
      expect(listbox).not.toBeNull();
    });

    it('selecting an option emits aegovSelectChange and closes', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select appearance="listbox">
          <aegov-select-option value="a">Apple</aegov-select-option>
          <aegov-select-option value="b">Banana</aegov-select-option>
        </aegov-select>
      `);
      const el = await page.find('aegov-select');
      const spy = await el.spyOnEvent('aegovSelectChange');
      const trigger = await page.find('aegov-select button[role="combobox"]');
      await trigger.click();
      await page.waitForChanges();
      const opts = await page.findAll('aegov-select [role="listbox"] [role="option"]');
      await opts[1].click();
      await page.waitForChanges();
      expect(spy).toHaveReceivedEventTimes(1);
      expect(spy.lastEvent.detail).toEqual({ value: 'b', label: 'Banana' });
      expect(await trigger.getAttribute('aria-expanded')).toBe('false');
    });

    it('search input filters options', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select appearance="listbox" is-searchable="true">
          <aegov-select-option value="a">Apple</aegov-select-option>
          <aegov-select-option value="b">Banana</aegov-select-option>
          <aegov-select-option value="c">Cherry</aegov-select-option>
        </aegov-select>
      `);
      const trigger = await page.find('aegov-select button[role="combobox"]');
      await trigger.click();
      await page.waitForChanges();
      const search = await page.find('aegov-select .select__search-input');
      await search.type('an');
      await page.waitForChanges();
      const opts = await page.findAll('aegov-select [role="listbox"] [role="option"]');
      expect(opts.length).toBe(1);
      expect(await opts[0].getProperty('textContent')).toContain('Banana');
    });

    it('multi-select toggles selections without closing', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select is-multiple="true">
          <aegov-select-option value="a">Apple</aegov-select-option>
          <aegov-select-option value="b">Banana</aegov-select-option>
        </aegov-select>
      `);
      const trigger = await page.find('aegov-select button[role="combobox"]');
      await trigger.click();
      await page.waitForChanges();
      const opts = await page.findAll('aegov-select [role="listbox"] [role="option"]');
      await opts[0].click();
      await page.waitForChanges();
      await opts[1].click();
      await page.waitForChanges();
      expect(await trigger.getAttribute('aria-expanded')).toBe('true');
      const el = await page.find('aegov-select');
      expect(await el.getProperty('value')).toBe('a,b');
      const selected = await page.findAll('aegov-select [aria-selected="true"]');
      expect(selected.length).toBe(2);
    });

    it('keyboard navigation: ArrowDown opens, ArrowDown moves, Enter selects', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select appearance="listbox">
          <aegov-select-option value="a">Apple</aegov-select-option>
          <aegov-select-option value="b">Banana</aegov-select-option>
        </aegov-select>
      `);
      const el = await page.find('aegov-select');
      const spy = await el.spyOnEvent('aegovSelectChange');
      const trigger = await page.find('aegov-select button[role="combobox"]');
      await trigger.focus();
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();
      expect(await trigger.getAttribute('aria-expanded')).toBe('true');
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();
      await page.keyboard.press('Enter');
      await page.waitForChanges();
      expect(spy).toHaveReceivedEventTimes(1);
      expect(spy.lastEvent.detail.value).toBe('b');
    });

    it('Escape closes the listbox', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select appearance="listbox">
          <aegov-select-option value="a">Apple</aegov-select-option>
        </aegov-select>
      `);
      const trigger = await page.find('aegov-select button[role="combobox"]');
      await trigger.click();
      await page.waitForChanges();
      expect(await trigger.getAttribute('aria-expanded')).toBe('true');
      await page.keyboard.press('Escape');
      await page.waitForChanges();
      expect(await trigger.getAttribute('aria-expanded')).toBe('false');
    });

    it('clear button resets the selection', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select appearance="listbox" is-clearable="true" value="a">
          <aegov-select-option value="a">Apple</aegov-select-option>
        </aegov-select>
      `);
      const el = await page.find('aegov-select');
      const spy = await el.spyOnEvent('aegovSelectChange');
      const clear = await page.find('aegov-select .select__clear');
      expect(clear).not.toBeNull();
      await clear.click();
      await page.waitForChanges();
      expect(await el.getProperty('value')).toBe('');
      expect(spy).toHaveReceivedEventTimes(1);
    });

    it('renders option groups with role=group and group label', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select appearance="listbox">
          <aegov-select-option-group label="Fruit">
            <aegov-select-option value="a">Apple</aegov-select-option>
          </aegov-select-option-group>
        </aegov-select>
      `);
      const trigger = await page.find('aegov-select button[role="combobox"]');
      await trigger.click();
      await page.waitForChanges();
      const groupLabel = await page.find('aegov-select .select__group-label');
      expect(groupLabel).not.toBeNull();
      expect(await groupLabel.getProperty('textContent')).toBe('Fruit');
    });

    it('document click outside closes the listbox', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <div><aegov-select appearance="listbox">
          <aegov-select-option value="a">Apple</aegov-select-option>
        </aegov-select></div>
        <button id="outside">outside</button>
      `);
      const trigger = await page.find('aegov-select button[role="combobox"]');
      await trigger.click();
      await page.waitForChanges();
      expect(await trigger.getAttribute('aria-expanded')).toBe('true');
      const outside = await page.find('#outside');
      await outside.click();
      await page.waitForChanges();
      expect(await trigger.getAttribute('aria-expanded')).toBe('false');
    });

    it('disabled select cannot be opened', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select appearance="listbox" is-disabled="true">
          <aegov-select-option value="a">Apple</aegov-select-option>
        </aegov-select>
      `);
      const trigger = await page.find('aegov-select button[role="combobox"]');
      await trigger.click();
      await page.waitForChanges();
      expect(await trigger.getAttribute('aria-expanded')).toBe('false');
    });
  });
});
