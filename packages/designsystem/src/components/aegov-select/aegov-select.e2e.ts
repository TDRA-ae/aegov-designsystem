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
      const select = await page.find('aegov-select >>> select');
      expect(select).not.toBeNull();
      const options = await page.findAll('aegov-select >>> select option');
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
      await page.$eval('aegov-select >>> select', (s: HTMLSelectElement) => {
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
      const select = await page.find('aegov-select >>> select');
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
      const trigger = await page.find('aegov-select >>> button[role="combobox"]');
      expect(await trigger.getAttribute('aria-expanded')).toBe('false');
      await trigger.click();
      await page.waitForChanges();
      expect(await trigger.getAttribute('aria-expanded')).toBe('true');
      const listbox = await page.find('aegov-select >>> [role="listbox"]');
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
      const trigger = await page.find('aegov-select >>> button[role="combobox"]');
      await trigger.click();
      await page.waitForChanges();
      const opts = await page.findAll('aegov-select >>> [role="listbox"] [role="option"]');
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
      const trigger = await page.find('aegov-select >>> button[role="combobox"]');
      await trigger.click();
      await page.waitForChanges();
      const search = await page.find('aegov-select >>> .select__search-input');
      await search.type('an');
      await page.waitForChanges();
      const opts = await page.findAll('aegov-select >>> [role="listbox"] [role="option"]');
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
      const trigger = await page.find('aegov-select >>> button[role="combobox"]');
      await trigger.click();
      await page.waitForChanges();
      const opts = await page.findAll('aegov-select >>> [role="listbox"] [role="option"]');
      await opts[0].click();
      await page.waitForChanges();
      await opts[1].click();
      await page.waitForChanges();
      expect(await trigger.getAttribute('aria-expanded')).toBe('true');
      const el = await page.find('aegov-select');
      expect(await el.getProperty('value')).toBe('a,b');
      const selected = await page.findAll('aegov-select >>> [aria-selected="true"]');
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
      const trigger = await page.find('aegov-select >>> button[role="combobox"]');
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
      const trigger = await page.find('aegov-select >>> button[role="combobox"]');
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
      const clear = await page.find('aegov-select >>> .select__clear');
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
      const trigger = await page.find('aegov-select >>> button[role="combobox"]');
      await trigger.click();
      await page.waitForChanges();
      const groupLabel = await page.find('aegov-select >>> .select__group-label');
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
      const trigger = await page.find('aegov-select >>> button[role="combobox"]');
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
      const trigger = await page.find('aegov-select >>> button[role="combobox"]');
      await trigger.click();
      await page.waitForChanges();
      expect(await trigger.getAttribute('aria-expanded')).toBe('false');
    });

    // Regression coverage for #63. parseOptions() used to read
    // getAttribute('value')/hasAttribute('is-disabled') — the raw DOM
    // attribute — which is never set when a consumer (e.g. the React
    // wrapper's generated createComponent() runtime) assigns the prop only
    // as a JS property. This broke selection entirely, not just disabling.
    it('selects correctly when an option\'s value/is-disabled are set via JS property only, not literal attributes', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select appearance="listbox">
          <aegov-select-option>Apple</aegov-select-option>
          <aegov-select-option>Banana</aegov-select-option>
        </aegov-select>
      `);
      // Simulate exactly what @lit/react's createComponent() does internally:
      // node[name] = value, never setAttribute().
      await page.evaluate(() => {
        const options = document.querySelectorAll('aegov-select-option') as NodeListOf<HTMLAegovSelectOptionElement>;
        (options[0] as any).value = 'a';
        (options[1] as any).value = 'b';
        (options[1] as any).isDisabled = true;
      });
      await page.waitForChanges();

      const hasValueAttr = await page.evaluate(() =>
        document.querySelectorAll('aegov-select-option')[0].hasAttribute('value'));
      expect(hasValueAttr).toBe(false);

      const trigger = await page.find('aegov-select >>> button[role="combobox"]');
      const el = await page.find('aegov-select');
      const spy = await el.spyOnEvent('aegovSelectChange');
      await trigger.click();
      await page.waitForChanges();

      // The disabled option (set via JS property only) must actually be inert.
      const disabledOption = await page.find('aegov-select >>> [data-value="b"]');
      expect(disabledOption.getAttribute('aria-disabled')).toBe('true');
      await disabledOption.click();
      await page.waitForChanges();
      expect(spy).toHaveReceivedEventTimes(0);

      // Selecting the enabled option must commit the real value, not ''.
      const enabledOption = await page.find('aegov-select >>> [data-value="a"]');
      await enabledOption.click();
      await page.waitForChanges();
      expect(spy).toHaveReceivedEventTimes(1);
      expect(spy.lastEvent.detail).toEqual({ value: 'a', label: 'Apple' });
      expect(await el.getProperty('value')).toBe('a');
    });

    it('resolves a pre-set value to its label when options are configured via JS property only', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select appearance="listbox" value="ad">
          <aegov-select-option>Abu Dhabi</aegov-select-option>
          <aegov-select-option>Dubai</aegov-select-option>
        </aegov-select>
      `);
      await page.evaluate(() => {
        const options = document.querySelectorAll('aegov-select-option') as NodeListOf<HTMLAegovSelectOptionElement>;
        (options[0] as any).value = 'ad';
        (options[1] as any).value = 'dubai';
      });
      await page.waitForChanges();

      const trigger = await page.find('aegov-select >>> button[role="combobox"]');
      expect(await trigger.getProperty('textContent')).toContain('Abu Dhabi');
    });

    it('propagates an option-group\'s label set via JS property only, not a literal attribute', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select appearance="listbox">
          <aegov-select-option-group>
            <aegov-select-option value="a">Apple</aegov-select-option>
          </aegov-select-option-group>
        </aegov-select>
      `);
      await page.evaluate(() => {
        const group = document.querySelector('aegov-select-option-group') as any;
        group.label = 'Fruit';
      });
      await page.waitForChanges();

      const trigger = await page.find('aegov-select >>> button[role="combobox"]');
      await trigger.click();
      await page.waitForChanges();
      const groupLabel = await page.find('aegov-select >>> .select__group-label');
      expect(groupLabel).not.toBeNull();
      expect(await groupLabel.getProperty('textContent')).toBe('Fruit');
    });
  });

  /**
   * W3C APG select-only combobox conformance for the listbox appearance
   * (https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/).
   */
  describe('listbox appearance: APG select-only combobox', () => {
    const OPTIONS = `
      <aegov-select-option value="ad">Abu Dhabi</aegov-select-option>
      <aegov-select-option value="dxb">Dubai</aegov-select-option>
      <aegov-select-option value="shj" is-disabled="true">Sharjah</aegov-select-option>
      <aegov-select-option value="ajm">Ajman</aegov-select-option>
      <aegov-select-option value="rak">Ras Al Khaimah</aegov-select-option>
      <aegov-select-option value="fuj">Fujairah</aegov-select-option>
      <aegov-select-option value="uaq">Umm Al Quwain</aegov-select-option>
      <aegov-select-option value="o8">Option 8</aegov-select-option>
      <aegov-select-option value="o9">Option 9</aegov-select-option>
      <aegov-select-option value="o10">Option 10</aegov-select-option>`;

    /** State read from inside the shadow root. */
    const state = (page: any, id = 's') => page.evaluate((id: string) => {
      const host = document.getElementById(id) as any;
      const root = host.shadowRoot as ShadowRoot;
      const trigger = root.querySelector('button[role="combobox"]') as HTMLElement;
      const activeId = trigger.getAttribute('aria-activedescendant');
      const active = activeId ? root.getElementById(activeId) : null;
      const scroller = root.querySelector('[role="listbox"]') as HTMLElement | null;
      let inView: boolean | null = null;
      if (active && scroller) {
        const a = active.getBoundingClientRect();
        const s = scroller.getBoundingClientRect();
        inView = a.top >= s.top - 1 && a.bottom <= s.bottom + 1;
      }
      const focused = root.activeElement as HTMLElement | null;
      return {
        open: trigger.getAttribute('aria-expanded') === 'true',
        active: active ? active.textContent.trim() : null,
        inView,
        value: host.value,
        focus: focused ? (focused.getAttribute('role') || focused.className) : (document.activeElement as HTMLElement)?.id || null,
      };
    }, id);
    const focusTrigger = (page: any, id = 's') => page.evaluate((id: string) => {
      (document.getElementById(id).shadowRoot.querySelector('button[role="combobox"]') as HTMLElement).focus();
    }, id);

    it('names the combobox and the listbox from the aegov-form-field label', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-form-field><aegov-label>Emirate</aegov-label>
          <aegov-select id="s" appearance="listbox">${OPTIONS}</aegov-select>
        </aegov-form-field>`);
      await page.waitForChanges();
      await focusTrigger(page);
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();
      const names = await page.evaluate(() => {
        const root = document.getElementById('s').shadowRoot;
        return [root.querySelector('[role="combobox"]').getAttribute('aria-label'), root.querySelector('[role="listbox"]').getAttribute('aria-label')];
      });
      expect(names).toEqual(['Emirate', 'Emirate']);
    });

    it('names the combobox from aria-label and from aria-labelledby on the host', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <p id="ext">Region</p>
        <aegov-select id="a" appearance="listbox" aria-label="Emirate">${OPTIONS}</aegov-select>
        <aegov-select id="b" appearance="listbox" aria-labelledby="ext">${OPTIONS}</aegov-select>`);
      await page.waitForChanges();
      const names = await page.evaluate(() => ['a', 'b'].map(id => document.getElementById(id).shadowRoot.querySelector('[role="combobox"]').getAttribute('aria-label')));
      expect(names).toEqual(['Emirate', 'Region']);
      // A label added later is picked up too.
      await page.evaluate(() => document.getElementById('a').setAttribute('aria-label', 'Home emirate'));
      await page.waitForChanges();
      expect(await page.evaluate(() => document.getElementById('a').shadowRoot.querySelector('[role="combobox"]').getAttribute('aria-label'))).toBe('Home emirate');
    });

    it('closed: Home, End and typing open the popup and move to the matching option', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-select id="s" appearance="listbox" aria-label="Emirate">${OPTIONS}</aegov-select>`);
      for (const [key, expected] of [['End', 'Option 10'], ['Home', 'Abu Dhabi'], ['r', 'Ras Al Khaimah']] as const) {
        await focusTrigger(page);
        await page.keyboard.press(key);
        await page.waitForChanges();
        const s = await state(page);
        expect(s.open).toBe(true);
        expect(s.active).toBe(expected);
        expect(s.focus).toBe('combobox');
        await page.keyboard.press('Escape');
        await page.waitForChanges();
      }
    });

    it('keeps the active option scrolled into view', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-select id="s" appearance="listbox" aria-label="Emirate" visible-items="3">${OPTIONS}</aegov-select>`);
      await focusTrigger(page);
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();
      for (let i = 0; i < 6; i++) {
        await page.keyboard.press('ArrowDown');
        await page.waitForChanges();
        expect((await state(page)).inView).toBe(true);
      }
      await page.keyboard.press('End');
      await page.waitForChanges();
      expect(await state(page)).toMatchObject({ active: 'Option 10', inView: true });
    });

    it('Alt+ArrowUp and Tab choose the active option; Tab then moves on, not to <body>', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-select id="s" appearance="listbox" aria-label="Emirate">${OPTIONS}</aegov-select><input id="next">`);
      await focusTrigger(page);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.down('Alt');
      await page.keyboard.press('ArrowUp');
      await page.keyboard.up('Alt');
      await page.waitForChanges();
      expect(await state(page)).toMatchObject({ open: false, value: 'dxb' });

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Tab');
      await page.waitForChanges();
      expect(await state(page)).toMatchObject({ open: false, value: 'ajm' });
      expect(await page.evaluate(() => document.activeElement.id)).toBe('next');
    });

    it('when an option gets DOM focus (screen reader cursor), it becomes active and the arrows move focus with it', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-select id="s" appearance="listbox" aria-label="Emirate">${OPTIONS}</aegov-select><input id="next">`);
      await focusTrigger(page);
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();
      await page.evaluate(() => (document.getElementById('s').shadowRoot.querySelector('[data-value="ajm"]') as HTMLElement).focus());
      await page.waitForChanges();
      expect(await state(page)).toMatchObject({ active: 'Ajman', focus: 'option' });
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();
      expect(await state(page)).toMatchObject({ active: 'Ras Al Khaimah', focus: 'option' });
      await page.keyboard.press('Tab');
      await page.waitForChanges();
      expect(await state(page)).toMatchObject({ open: false, value: 'rak' });
      expect(await page.evaluate(() => document.activeElement.id)).toBe('next');
    });

    it('single select: aria-selected marks the highlighted option (APG), the check icon marks the saved value', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-select id="s" appearance="listbox" aria-label="Emirate" value="dxb">${OPTIONS}</aegov-select>`);
      await focusTrigger(page);
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();
      const read = () => page.evaluate(() => {
        const root = document.getElementById('s').shadowRoot;
        return {
          ariaSelected: Array.from(root.querySelectorAll('[role="option"][aria-selected="true"]')).map(o => o.textContent.trim()),
          checked: Array.from(root.querySelectorAll('.select__option--selected')).map(o => o.textContent.trim()),
        };
      });
      expect(await read()).toEqual({ ariaSelected: ['Dubai'], checked: ['Dubai'] });
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();
      expect(await read()).toEqual({ ariaSelected: ['Ajman'], checked: ['Dubai'] });
    });

    it('shows the focus fill only for keyboard use (like :focus-visible); a click makes the clicked option active', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-select id="s" is-multiple aria-label="Languages" value="ad">${OPTIONS}</aegov-select>`);
      const kb = () => page.evaluate(() => document.getElementById('s').shadowRoot.querySelector('.select__listbox').classList.contains('select__listbox--keyboard'));
      const trigger = await page.find('aegov-select >>> button[role="combobox"]');
      await trigger.click();
      await page.waitForChanges();
      expect(await kb()).toBe(false);
      const fuj = await page.find('aegov-select >>> div.select__option[data-value="fuj"]');
      await fuj.click();
      await page.waitForChanges();
      expect(await state(page)).toMatchObject({ active: 'Fujairah', open: true });
      expect(await kb()).toBe(false);
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();
      expect(await state(page)).toMatchObject({ active: 'Umm Al Quwain' });
      expect(await kb()).toBe(true);
    });

    it('the listbox is the scroll container and is not a Tab stop', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-select id="s" appearance="listbox" aria-label="Emirate">${OPTIONS}</aegov-select>`);
      await focusTrigger(page);
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();
      const attrs = await page.evaluate(() => {
        const lb = document.getElementById('s').shadowRoot.querySelector('[role="listbox"]');
        return { cls: lb.className, tabindex: lb.getAttribute('tabindex'), optionTabindex: lb.querySelector('[role="option"]').getAttribute('tabindex') };
      });
      expect(attrs).toEqual({ cls: 'select__options', tabindex: '-1', optionTabindex: '-1' });
    });

    it('stays open when focus passes through the page on its way to an option (VoiceOver), closes when focus really leaves', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-select id="s" appearance="listbox" aria-label="Emirate">${OPTIONS}</aegov-select><input id="next">`);
      await focusTrigger(page);
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();
      // What Chrome does for VoiceOver: focus leaves to the document first, then lands on the option.
      await page.evaluate(() => {
        const root = document.getElementById('s').shadowRoot;
        (root.querySelector('button[role="combobox"]') as HTMLElement).blur();
        (root.querySelector('[data-value="dxb"]') as HTMLElement).focus();
      });
      await new Promise(r => setTimeout(r, 50));
      await page.waitForChanges();
      expect(await state(page)).toMatchObject({ open: true, active: 'Dubai', focus: 'option' });
      // Focus on nothing at all also keeps it open.
      await page.evaluate(() => (document.getElementById('s').shadowRoot.activeElement as HTMLElement).blur());
      await new Promise(r => setTimeout(r, 50));
      await page.waitForChanges();
      expect((await state(page)).open).toBe(true);
      // Focus really moving elsewhere closes it.
      await page.evaluate(() => (document.getElementById('next') as HTMLElement).focus());
      await new Promise(r => setTimeout(r, 50));
      await page.waitForChanges();
      expect((await state(page)).open).toBe(false);
      expect(await page.evaluate(() => document.activeElement.id)).toBe('next');
    });

    it('an outside click closes the popup without pulling focus back', async () => {
      const page = await newE2EPage();
      await page.setContent(`<input id="other"><aegov-select id="s" appearance="listbox" aria-label="Emirate">${OPTIONS}</aegov-select>`);
      await focusTrigger(page);
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();
      await page.click('#other');
      await page.waitForChanges();
      expect((await state(page)).open).toBe(false);
      expect(await page.evaluate(() => document.activeElement.id)).toBe('other');
    });

    it('Escape closes the popup without reaching a surrounding listener (e.g. a modal)', async () => {
      const page = await newE2EPage();
      await page.setContent(`<div id="wrap"><aegov-select id="s" appearance="listbox" aria-label="Emirate">${OPTIONS}</aegov-select></div>`);
      await page.evaluate(() => { (window as any).escapes = 0; document.getElementById('wrap').addEventListener('keydown', e => { if (e.key === 'Escape') (window as any).escapes++; }); });
      await focusTrigger(page);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Escape');
      await page.waitForChanges();
      expect((await state(page)).open).toBe(false);
      expect(await page.evaluate(() => (window as any).escapes)).toBe(0);
    });

    it('groups are named in normal case, sit directly in the listbox, and their visible heading is not read twice', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-select id="s" appearance="listbox" aria-label="Emirate">
          <aegov-select-option-group label="Federal capital"><aegov-select-option value="ad">Abu Dhabi</aegov-select-option></aegov-select-option-group>
          <aegov-select-option-group label="Northern Emirates"><aegov-select-option value="dxb">Dubai</aegov-select-option></aegov-select-option-group>
        </aegov-select>`);
      await focusTrigger(page);
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();
      const groups = await page.evaluate(() => Array.from(document.getElementById('s').shadowRoot.querySelectorAll('[role="group"]')).map(g => ({
        name: g.getAttribute('aria-label'),
        parentRole: g.parentElement.getAttribute('role'),
        headingHidden: g.querySelector('.select__group-label').getAttribute('aria-hidden'),
      })));
      expect(groups).toEqual([
        { name: 'Federal capital', parentRole: 'listbox', headingHidden: 'true' },
        { name: 'Northern Emirates', parentRole: 'listbox', headingHidden: 'true' },
      ]);
    });

    it('searchable: the search field is outside the listbox, Home/End stay in the field, and "no results" is in a live region', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-select id="s" appearance="listbox" is-searchable aria-label="Nationality">${OPTIONS}</aegov-select>`);
      await focusTrigger(page);
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();
      await page.waitForFunction(() => document.getElementById('s').shadowRoot.activeElement?.classList.contains('select__search-input'));
      await page.keyboard.type('du');
      await page.keyboard.press('Home');
      await page.waitForChanges();
      const info = await page.evaluate(() => {
        const root = document.getElementById('s').shadowRoot;
        const input = root.querySelector('.select__search-input') as HTMLInputElement;
        return { caret: input.selectionStart, insideListbox: !!input.closest('[role="listbox"]') };
      });
      expect(info).toEqual({ caret: 0, insideListbox: false });
      await page.keyboard.type('zz');
      await page.waitForChanges();
      expect(await page.evaluate(() => document.getElementById('s').shadowRoot.querySelector('[role="status"]').textContent)).toBe('No results found');
    });

    it('searchable: Tab from the search field closes and moves to the next field, not to <body>', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-select id="s" appearance="listbox" is-searchable aria-label="Nationality">${OPTIONS}</aegov-select><input id="next">`);
      await focusTrigger(page);
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();
      await page.waitForFunction(() => document.getElementById('s').shadowRoot.activeElement?.classList.contains('select__search-input'));
      await page.keyboard.press('Tab');
      await page.waitForChanges();
      expect((await state(page)).open).toBe(false);
      expect(await page.evaluate(() => document.activeElement.id)).toBe('next');
    });

    it('clear button: a separate 24x24 button, operable by keyboard, focus returns to the combobox', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-select id="s" appearance="listbox" aria-label="Status" is-clearable value="ad">${OPTIONS}</aegov-select>`);
      await page.waitForChanges();
      const info = await page.evaluate(() => {
        const c = document.getElementById('s').shadowRoot.querySelector('.select__clear') as HTMLElement;
        const r = c.getBoundingClientRect();
        return { nested: !!c.closest('[role="combobox"]'), w: r.width, h: r.height, label: c.getAttribute('aria-label') };
      });
      expect(info).toEqual({ nested: false, w: 24, h: 24, label: 'Clear selection, Status' });
      await page.evaluate(() => (document.getElementById('s').shadowRoot.querySelector('.select__clear') as HTMLElement).focus());
      await page.keyboard.press('Enter');
      await page.waitForChanges();
      expect(await state(page)).toMatchObject({ open: false, value: '', focus: 'combobox' });
    });

    it('multiple: the "N selected" summary follows the page language', async () => {
      const page = await newE2EPage();
      await page.setContent(`<div dir="rtl" lang="ar"><aegov-select id="s" is-multiple value="ad,dxb" aria-label="الإمارات">${OPTIONS}</aegov-select></div>`);
      await page.waitForChanges();
      expect(await page.evaluate(() => document.getElementById('s').shadowRoot.querySelector('.select__value').textContent)).toBe('تم اختيار 2');
    });

    // DS-A11Y-select-19: the panel height includes group headings, so a search
    // that leaves one option under a heading still shows that option; with no
    // matches, the "No results found" message stays inside the panel.
    const GROUPED = `<aegov-select-option-group label="Federal capital"><aegov-select-option value="auh">Abu Dhabi</aegov-select-option></aegov-select-option-group><aegov-select-option-group label="Northern Emirates"><aegov-select-option value="dxb">Dubai</aegov-select-option><aegov-select-option value="shj">Sharjah</aegov-select-option><aegov-select-option value="ajm">Ajman</aegov-select-option><aegov-select-option value="rak">Ras Al Khaimah</aegov-select-option></aegov-select-option-group>`;
    const searchGrouped = async (query: string) => {
      const page = await newE2EPage();
      await page.setViewport({ width: 800, height: 900 });
      await page.setContent(`<aegov-select id="s" appearance="listbox" is-searchable aria-label="Emirate">${GROUPED}</aegov-select>`);
      await focusTrigger(page);
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();
      await page.waitForFunction(() => document.getElementById('s').shadowRoot.activeElement?.classList.contains('select__search-input'));
      await page.keyboard.type(query);
      await page.waitForChanges();
      await new Promise(r => setTimeout(r, 100));
      return page.evaluate(() => {
        const root = document.getElementById('s').shadowRoot;
        const panel = root.querySelector('.select__listbox').getBoundingClientRect();
        const list = root.querySelector('.select__options').getBoundingClientRect();
        const inside = (r: DOMRect, box: DOMRect) => r.height > 0 && r.top >= box.top - 0.5 && r.bottom <= box.bottom + 0.5;
        const options = Array.from(root.querySelectorAll('[role="option"]'));
        const empty = root.querySelector('.select__empty');
        return {
          matches: options.map(o => o.textContent.trim()),
          allVisible: options.every(o => inside(o.getBoundingClientRect(), list)),
          emptyInsidePanel: empty ? inside(empty.getBoundingClientRect(), panel) : null,
        };
      });
    };

    it('grouped + searchable: one match under a group heading is visible, not hidden below the heading', async () => {
      expect(await searchGrouped('abu')).toEqual({ matches: ['Abu Dhabi'], allVisible: true, emptyInsidePanel: null });
    });

    it('grouped + searchable: all matches across groups are visible when they fit the visible-items limit', async () => {
      const r = await searchGrouped('a');
      expect(r.matches.length).toBe(5);
      expect(r.allVisible).toBe(true);
    });

    it('searchable with no matches: "No results found" is inside the panel', async () => {
      expect(await searchGrouped('zzz')).toEqual({ matches: [], allVisible: true, emptyInsidePanel: true });
    });
  });
});
