import { newE2EPage, E2EPage } from '@stencil/core/testing';

/**
 * Regression tests for the accessibility fixes made together in batch 1
 * (DS-A11Y-* ids from the accessibility QA tracker). Each test checks the
 * behaviour the fix introduced; the component's own spec/e2e files cover the
 * rest of its behaviour.
 */

/** Accessible-name helpers that read through shadow roots. */
const shadowAttr = (page: E2EPage, host: string, inner: string, attr: string) =>
  page.$eval(host, (el: any, i: string, a: string) => el.shadowRoot.querySelector(i)?.getAttribute(a) ?? null, inner, attr);

describe('fileupload', () => {
  it('fileupload-08: the default appearance name includes the visible "Browse"', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload label="Passport bio-data page"></aegov-fileupload>');
    const ids = await shadowAttr(page, 'aegov-fileupload', 'input[type=file]', 'aria-labelledby');
    const text = await page.$eval('aegov-fileupload', (el: any, list: string) =>
      list.split(' ').map(id => el.shadowRoot.getElementById(id)?.textContent.replace(/\s*\*\s*$/, '').trim()).join(' '), ids);
    expect(text).toBe('Passport bio-data page Browse');
  });

  it('fileupload-06: adding and removing files is announced in a status region', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload appearance="dropzone" label="Documents" is-multiple="true"></aegov-fileupload>');
    await page.$eval('aegov-fileupload', (el: any) => {
      const input = el.shadowRoot.querySelector('input[type=file]') as HTMLInputElement;
      const transfer = new DataTransfer();
      transfer.items.add(new File(['a'], 'report.pdf', { type: 'application/pdf' }));
      transfer.items.add(new File(['b'], 'photo.png', { type: 'image/png' }));
      input.files = transfer.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await new Promise(resolve => setTimeout(resolve, 300));
    await page.waitForChanges();
    const status = () => page.$eval('aegov-fileupload', (el: any) => el.shadowRoot.querySelector('[role=status]').textContent);
    expect(await status()).toBe('report.pdf, photo.png added (2 files)');
    await page.$eval('aegov-fileupload', (el: any) => el.shadowRoot.querySelector('.fileupload__remove-btn').click());
    await new Promise(resolve => setTimeout(resolve, 300));
    await page.waitForChanges();
    expect(await status()).toBe('report.pdf removed');
  });
});

describe('checkbox, radio, toggle', () => {
  it('checkbox-02: the name is the label only; the hint stays a description', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox label="Newsletter" hint="Monthly"></aegov-checkbox>
      <aegov-radio name="r" value="a" label="Express" hint="1 day"></aegov-radio>
      <aegov-toggle label="Alerts" hint="By email"></aegov-toggle>`);
    for (const tag of ['aegov-checkbox', 'aegov-radio', 'aegov-toggle']) {
      const names = await page.$eval(tag, (el: any) => {
        const input = el.shadowRoot.querySelector('input');
        const labelled = el.shadowRoot.getElementById(input.getAttribute('aria-labelledby'));
        return { name: labelled?.textContent.trim(), describedBy: input.getAttribute('aria-describedby') };
      });
      expect(names.name).toMatch(/^(Newsletter|Express|Alerts)$/);
      expect(names.describedBy).toContain('-hint');
    }
  });

  it('checkbox-03: required controls and groups show an aria-hidden asterisk', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox label="Terms" is-required="true"></aegov-checkbox>
      <aegov-checkbox-group label="Services" is-required="true"><aegov-checkbox label="Visa" value="v"></aegov-checkbox></aegov-checkbox-group>
      <aegov-radio-group label="Delivery" name="d" is-required="true"><aegov-radio value="a" label="A"></aegov-radio></aegov-radio-group>
      <aegov-checkbox label="Optional"></aegov-checkbox>`);
    const marks = await page.evaluate(() =>
      Array.from(document.querySelectorAll('body > aegov-checkbox, body > aegov-checkbox-group, body > aegov-radio-group')).map((el: any) => {
        const mark = el.shadowRoot.querySelector('[class$="__required"]');
        return mark ? `${mark.textContent.trim()}|${mark.getAttribute('aria-hidden')}` : null;
      }));
    expect(marks).toEqual(['*|true', '*|true', '*|true', null]);
  });

  it('checkbox-04 / toggle-04: toggle rows are at least 24 px tall and only as wide as their content', async () => {
    const page = await newE2EPage();
    await page.setContent('<div style="width:600px"><aegov-toggle size="xs" label="Location"></aegov-toggle><aegov-toggle size="sm" label="Sync"></aegov-toggle></div>');
    const rows = await page.$$eval('aegov-toggle', els => els.map((el: any) => {
      const r = el.shadowRoot.querySelector('.toggle__wrapper').getBoundingClientRect();
      return { height: r.height, width: r.width };
    }));
    for (const row of rows) {
      expect(row.height).toBeGreaterThanOrEqual(24);
      expect(row.width).toBeLessThan(300);
    }
  });

  it('checkbox-group-01: Arabic group text and message', async () => {
    const page = await newE2EPage();
    await page.setContent('<div lang="ar" dir="rtl"><aegov-checkbox-group label="الخدمات" is-required="true"><aegov-checkbox label="تأشيرة" value="v"></aegov-checkbox></aegov-checkbox-group></div>');
    const legend = await page.$eval('aegov-checkbox-group', (el: any) => el.shadowRoot.querySelector('legend').textContent);
    expect(legend).toContain('(مطلوب)');
    expect(legend).not.toContain('required');
    const result = await page.$eval('aegov-checkbox-group', (el: any) => el.validate('submit'));
    expect(result.message).toBe('هذا الحقل مطلوب');
  });
});

describe('radio-group', () => {
  const RADIOS = '<aegov-radio value="s" label="Small"></aegov-radio><aegov-radio value="m" label="Medium" is-checked="true"></aegov-radio><aegov-radio value="l" label="Large"></aegov-radio>';
  const tabStops = (page: E2EPage) => page.$$eval('aegov-radio', els => els.map((el: any) => el.shadowRoot.querySelector('input').tabIndex));
  const checked = (page: E2EPage) => page.$$eval('aegov-radio', els => els.filter((el: any) => el.isChecked).map((el: any) => el.getAttribute('value')));

  it('radio-group-01: a form reset moves the Tab stop back to the default radio', async () => {
    const page = await newE2EPage();
    await page.setContent(`<form><aegov-radio-group label="Size" name="size">${RADIOS}</aegov-radio-group></form>`);
    await page.$eval('aegov-radio[value=m]', (el: any) => el.shadowRoot.querySelector('input').focus());
    await page.keyboard.press('ArrowDown');
    await page.waitForChanges();
    expect(await checked(page)).toEqual(['l']);
    await page.$eval('form', (form: HTMLFormElement) => form.reset());
    await page.waitForChanges();
    expect(await checked(page)).toEqual(['m']);
    expect(await tabStops(page)).toEqual([-1, 0, -1]);
  });

  it('radio-group-01: setting isChecked from code keeps one radio selected and moves the Tab stop', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-radio-group label="Size" name="size">${RADIOS}</aegov-radio-group>`);
    await page.$eval('aegov-radio[value=s]', (el: any) => { el.isChecked = true; });
    await page.waitForChanges();
    expect(await checked(page)).toEqual(['s']);
    expect(await tabStops(page)).toEqual([0, -1, -1]);
  });

  it('radio-group-02: in RTL, ArrowRight moves to the option on the right (the previous one)', async () => {
    const page = await newE2EPage();
    await page.setContent(`<div dir="rtl"><aegov-radio-group label="Size" name="size" orientation="horizontal">${RADIOS}</aegov-radio-group></div>`);
    await page.$eval('aegov-radio[value=m]', (el: any) => el.shadowRoot.querySelector('input').focus());
    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();
    expect(await checked(page)).toEqual(['s']);
  });

  it('radio-group-03: Shift+Tab into a group with nothing selected lands on the last radio', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio-group label="Contact" name="c"><aegov-radio value="e" label="Email"></aegov-radio><aegov-radio value="p" label="Post"></aegov-radio></aegov-radio-group><button id="after">After</button>');
    await page.focus('#after');
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.up('Shift');
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement?.getAttribute('value'))).toBe('p');
  });

  it('radio-group-04: very fast arrow presses leave exactly one native input checked', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio-group label="Contact" name="c"><aegov-radio value="e" label="Email"></aegov-radio><aegov-radio value="s" label="SMS"></aegov-radio><aegov-radio value="p" label="Post"></aegov-radio></aegov-radio-group>');
    await page.$eval('aegov-radio[value=e]', (el: any) => el.shadowRoot.querySelector('input').focus());
    for (const key of ['ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'ArrowDown']) {
      await page.keyboard.press(key as any);
    }
    await page.waitForChanges();
    const native = await page.$$eval('aegov-radio', els => els.filter((el: any) => el.shadowRoot.querySelector('input').checked).length);
    expect(native).toBe(1);
  });
});

describe('otp', () => {
  it('otp-08: in RTL the cells stay in left-to-right order; ArrowLeft goes back', async () => {
    const page = await newE2EPage();
    await page.setContent('<div dir="rtl" lang="ar"><aegov-otp aria-label="رمز" length="4" value="1234"></aegov-otp></div>');
    const order = await page.$eval('aegov-otp', (el: any) => Array.from(el.shadowRoot.querySelectorAll('input'))
      .sort((a: any, b: any) => a.getBoundingClientRect().x - b.getBoundingClientRect().x).map((i: any) => i.value).join(''));
    expect(order).toBe('1234');
    await page.$eval('aegov-otp', (el: any) => el.shadowRoot.querySelectorAll('input')[2].focus());
    await page.keyboard.press('ArrowLeft');
    expect(await page.$eval('aegov-otp', (el: any) => el.shadowRoot.activeElement.getAttribute('aria-label'))).toBe('حرف 2 من 4');
  });

  it('otp-03: every cell is described by the error', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp aria-label="Code" length="4" is-invalid="true" error-message="Wrong code"></aegov-otp>');
    const described = await page.$eval('aegov-otp', (el: any) => Array.from(el.shadowRoot.querySelectorAll('input')).map((i: any) => i.getAttribute('aria-describedby')));
    expect(described.every(id => id && id.includes('-error'))).toBe(true);
  });

  it('otp-09: validation messages follow the page language', async () => {
    const page = await newE2EPage();
    await page.setContent('<div lang="ar" dir="rtl"><aegov-otp aria-label="رمز" length="6" is-required="true"></aegov-otp></div>');
    expect((await page.$eval('aegov-otp', (el: any) => el.validate('submit'))).message).toBe('هذا الحقل مطلوب');
    await page.$eval('aegov-otp', (el: any) => { el.value = '12'; });
    await page.waitForChanges();
    expect((await page.$eval('aegov-otp', (el: any) => el.validate('submit'))).message).toBe('أدخل 6 أحرف');
  });
});

describe('range', () => {
  it('range-03: on a vertical slider ArrowUp raises the value', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range aria-label="Volume" orientation="vertical" value="30"></aegov-range>');
    await page.$eval('aegov-range', (el: any) => el.shadowRoot.querySelector('input').focus());
    await page.keyboard.press('ArrowUp');
    await page.waitForChanges();
    expect(await page.$eval('aegov-range', (el: any) => Number(el.shadowRoot.querySelector('input').value))).toBe(31);
  });
});

describe('textarea and input', () => {
  it('textarea-01: copying says "Copied" in a status region', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-textarea aria-label="Ref" is-readonly="true" is-copyable="true" value="ABC"></aegov-textarea>');
    await page.$eval('aegov-textarea', (el: any) => {
      Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.resolve() }, configurable: true });
      el.shadowRoot.querySelector('.textarea__copy-btn').click();
    });
    await page.waitForChanges();
    expect(await page.$eval('aegov-textarea', (el: any) => el.shadowRoot.querySelector('.textarea__copy-status').textContent)).toBe('Copied');
    // Said once: the button's own name does not change as well.
    expect(await shadowAttr(page, 'aegov-textarea', '.textarea__copy-btn', 'aria-label')).toBe('Copy to clipboard');
  });

  it('textarea-01: the input copy button also keeps its name and announces through its status only', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-input aria-label="Ref" is-readonly="true" is-copyable="true" value="ABC"></aegov-input>');
    await page.$eval('aegov-input', (el: any) => {
      Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.resolve() }, configurable: true });
      el.shadowRoot.querySelector('button').click();
    });
    await page.waitForChanges();
    expect(await shadowAttr(page, 'aegov-input', 'button', 'aria-label')).toBe('Copy to clipboard');
    expect(await page.$eval('aegov-input', (el: any) => el.shadowRoot.querySelector('[role=status]').textContent)).toBe('Copied');
  });

  it('textarea-02: the visible counter is not a live region; a worded status follows a pause', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-textarea aria-label="Note" maxlength="20"></aegov-textarea>');
    expect(await shadowAttr(page, 'aegov-textarea', '.textarea__counter', 'aria-hidden')).toBe('true');
    expect(await shadowAttr(page, 'aegov-textarea', '.textarea__counter', 'aria-live')).toBeNull();
    await page.$eval('aegov-textarea', (el: any) => el.shadowRoot.querySelector('textarea').focus());
    await page.keyboard.type('hello');
    const status = () => page.$eval('aegov-textarea', (el: any) => el.shadowRoot.querySelector('.textarea__counter-status').textContent);
    expect(await status()).toBe('');
    await new Promise(resolve => setTimeout(resolve, 1300));
    await page.waitForChanges();
    expect(await status()).toBe('15 characters remaining');
  });

  it('input-05: built-in strings follow lang, not only dir', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div lang="ar"><aegov-input id="a" aria-label="x" is-readonly="true" is-copyable="true" value="1"></aegov-input></div>
      <div dir="rtl" lang="en"><aegov-input id="b" aria-label="y" is-readonly="true" is-copyable="true" value="1"></aegov-input></div>`);
    expect(await shadowAttr(page, '#a', 'button', 'aria-label')).toBe('نسخ إلى الحافظة');
    expect(await shadowAttr(page, '#b', 'button', 'aria-label')).toBe('Copy to clipboard');
  });
});

describe('button', () => {
  it('button-02: "Loading" is not part of the button name', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-button is-loading="true">Save</aegov-button>');
    const inner = await page.$eval('aegov-button', (el: any) => el.shadowRoot.querySelector('button').textContent.trim());
    expect(inner).not.toContain('Loading');
    expect(await page.$eval('aegov-button', (el: any) => el.shadowRoot.querySelector('[role=status]').textContent)).toBe('Loading');
  });

  it('button-03: Enter in a native text input submits through the aegov-button', async () => {
    const page = await newE2EPage();
    await page.setContent('<form onsubmit="event.preventDefault(); window.submits = (window.submits || 0) + 1"><input name="a"><input name="b"><aegov-button type="submit">Send</aegov-button></form>');
    await page.focus('input[name=a]');
    await page.keyboard.press('Enter');
    await new Promise(resolve => setTimeout(resolve, 200));
    expect(await page.evaluate(() => (window as any).submits)).toBe(1);
  });
});

describe('datepicker', () => {
  it('datepicker-10: a previewed end day is not announced or selected as the end date', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker aria-label="Stay" appearance="range" value="2024-06-10 / 2024-06-12"></aegov-datepicker>');
    await page.$eval('aegov-datepicker', (el: any) => { el.value = ''; });
    await page.waitForChanges();
    const host = await page.find('aegov-datepicker');
    await host.callMethod('open');
    await page.waitForChanges();
    await page.evaluate(() => (document.querySelector('.aegov-datepicker-portal .datepicker__day:not(.datepicker__day--outside)') as HTMLElement).click());
    await page.waitForChanges();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();
    const focused = await page.evaluate(() => {
      const button = document.activeElement as HTMLElement;
      return { label: button.getAttribute('aria-label'), selected: button.parentElement?.getAttribute('aria-selected') };
    });
    expect(focused.label).not.toMatch(/end date/);
    expect(focused.selected).toBe('false');
  });

  it('datepicker-13: a custom trigger gets aria-haspopup and aria-expanded', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker aria-label="Date"><button slot="trigger">Pick a date</button></aegov-datepicker>');
    await page.waitForChanges();
    expect(await page.$eval('button[slot=trigger]', el => [el.getAttribute('aria-haspopup'), el.getAttribute('aria-expanded')])).toEqual(['dialog', 'false']);
    const host = await page.find('aegov-datepicker');
    await host.callMethod('open');
    await page.waitForChanges();
    expect(await page.$eval('button[slot=trigger]', el => el.getAttribute('aria-expanded'))).toBe('true');
  });
});

describe('form-field', () => {
  it('form-field-03: the name skips aria-hidden content and keeps word boundaries', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-form-field><aegov-label>Emirates ID <span aria-hidden="true">*</span></aegov-label><aegov-input></aegov-input></aegov-form-field>');
    await page.waitForChanges();
    expect(await page.$eval('aegov-input', el => el.getAttribute('aria-label'))).toBe('Emirates ID');
  });

  it("form-field-04: the wrapper's slot=\"hint\" describes the control", async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-form-field><aegov-label>Reason</aegov-label><aegov-textarea></aegov-textarea><span slot="hint">Up to 500 characters.</span></aegov-form-field>');
    await page.waitForChanges();
    const hintId = await page.$eval('[slot=hint]', el => el.id);
    expect(hintId).toBeTruthy();
    expect(await page.$eval('aegov-textarea', el => el.getAttribute('aria-describedby'))).toContain(hintId);
  });
});
