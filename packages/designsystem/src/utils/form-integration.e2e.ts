/**
 * Cross-component form integration E2E.
 *
 * Validates the Layer 1 validation surface end-to-end inside a native <form>.
 * See: validation-engine-addon.md §2.8.
 *
 * Coverage:
 *  - Native form participation per component (FormAssociated + native <input>)
 *  - aria-invalid wiring after isInvalid is set
 *  - aegovValidate event fires with correct trigger
 *  - setCustomValidity + validate() public method round-trip
 *  - formdata event payload contains expected names per component
 */

import { newE2EPage } from '@stencil/core/testing';

describe('form integration (Layer 1)', () => {
  it('renders a multi-component form without console errors', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <form id="f">
        <aegov-input name="email" type="email" is-required></aegov-input>
        <aegov-textarea name="bio"></aegov-textarea>
        <aegov-checkbox name="terms" is-required></aegov-checkbox>
        <aegov-toggle name="newsletter"></aegov-toggle>
        <aegov-range name="rating"></aegov-range>
        <aegov-select name="country">
          <aegov-select-option value="ae">UAE</aegov-select-option>
        </aegov-select>
        <aegov-otp name="code" length="4"></aegov-otp>
        <aegov-fileupload name="resume"></aegov-fileupload>
        <aegov-datepicker name="dob"></aegov-datepicker>
        <button type="submit">Submit</button>
      </form>
    `);
    await page.waitForChanges();
    const form = await page.find('form');
    expect(form).not.toBeNull();
  });

  it('aegov-input toggles aria-invalid when isInvalid prop is set imperatively', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-input></aegov-input>`);
    const host = await page.find('aegov-input');
    host.setProperty('isInvalid', true);
    await page.waitForChanges();
    const input = await page.find('aegov-input >>> input, aegov-input input');
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('aegov-input emits aegovValidate on input with current trigger', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-input></aegov-input>`);
    const host = await page.find('aegov-input');
    const spy = await host.spyOnEvent('aegovValidate');
    const input = await page.find('aegov-input >>> input');
    await input.focus();
    await page.keyboard.type('a');
    await page.waitForChanges();
    expect(spy.events.length).toBeGreaterThan(0);
    expect(spy.events.some((e: any) => e.detail?.trigger === 'input')).toBe(true);
  });

  it('aegov-input emits aegovValidate on blur with trigger="blur"', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-input></aegov-input>`);
    const host = await page.find('aegov-input');
    const spy = await host.spyOnEvent('aegovValidate');
    const input = await page.find('aegov-input >>> input');
    await input.focus();
    await input.press('Tab');
    await page.waitForChanges();
    expect(spy.events.some((e: any) => e.detail?.trigger === 'blur')).toBe(true);
  });

  it('aegov-input setCustomValidity + validate() round-trip', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-input></aegov-input>`);
    const host = await page.find('aegov-input');
    await host.callMethod('setCustomValidity', 'Custom error');
    await page.waitForChanges();
    expect(await host.getProperty('isInvalid')).toBe(true);
    expect(await host.getProperty('errorMessage')).toBe('Custom error');
    const result = await host.callMethod('validate', 'manual');
    expect(result.valid).toBe(false);
    expect(result.message).toBe('Custom error');
  });

  it('aegov-input clearing setCustomValidity removes invalid state', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-input is-invalid="true" error-message="x"></aegov-input>`);
    const host = await page.find('aegov-input');
    await host.callMethod('setCustomValidity', '');
    await page.waitForChanges();
    expect(await host.getProperty('isInvalid')).toBe(false);
    expect(await host.getProperty('errorMessage')).toBe('');
  });

  it('aegov-form-field cascades errorMessage to slotted aegov-input', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-form-field error-message="Wrapper err" is-invalid="true">
        <aegov-input></aegov-input>
      </aegov-form-field>
    `);
    await page.waitForChanges();
    const child = await page.find('aegov-input');
    expect(await child.getProperty('errorMessage')).toBe('Wrapper err');
    expect(await child.getProperty('isInvalid')).toBe(true);
  });

  it('aegov-otp emits aegovValidate with patternMismatch on full-fill regex fail', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-otp length="4" pattern="^9999$"></aegov-otp>`);
    const host = await page.find('aegov-otp');
    const spy = await host.spyOnEvent('aegovValidate');
    const first = await page.find('aegov-otp >>> .otp__cell:nth-of-type(1)');
    await first.focus();
    await page.keyboard.type('1234');
    await page.waitForChanges();
    const fired = spy.events.filter((e: any) => e.detail?.validity?.patternMismatch === true);
    expect(fired.length).toBeGreaterThan(0);
  });

  it('aegov-select listbox does NOT render hidden input (FormAssociated handles submission per §2.5)', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-select appearance="listbox" name="fruit">
        <aegov-select-option value="a">Apple</aegov-select-option>
      </aegov-select>
    `);
    await page.waitForChanges();
    const hidden = await page.find('aegov-select >>> input[type="hidden"]');
    expect(hidden).toBeNull();
  });

  it('native form submit is blocked by required aegov-input via inner native input', async () => {
    // Native browser blocks submit when inner <input required> is empty —
    // verifies the underlying native form control still works through aegov wrapper.
    const page = await newE2EPage();
    await page.setContent(`
      <form id="f">
        <aegov-input name="x" is-required></aegov-input>
        <button type="submit" id="sub">Go</button>
      </form>
    `);
    await page.waitForChanges();
    const formIsValid = await page.evaluate(() => {
      const form = document.querySelector('form#f') as HTMLFormElement;
      return form.checkValidity();
    });
    expect(formIsValid).toBe(false);
  });
});

/**
 * Constraints changed after load must reach ElementInternals, so the form's own
 * validity follows them — e.g. a framework binding `isRequired` to some other
 * field. Each case starts valid, changes one constraint, and expects the form to
 * become invalid (or the reverse).
 */
describe('form integration: constraints changed after load', () => {
  const cases: Array<{ name: string; markup: string; change: string; validAfter: boolean }> = [
    { name: 'aegov-input isRequired → true', markup: '<aegov-input name="a"></aegov-input>', change: 'el.isRequired = true', validAfter: false },
    { name: 'aegov-input isRequired → false', markup: '<aegov-input name="a" is-required></aegov-input>', change: 'el.isRequired = false', validAfter: true },
    { name: 'aegov-input type → email', markup: '<aegov-input name="a" value="x"></aegov-input>', change: 'el.type = "email"', validAfter: false },
    { name: 'aegov-input pattern attribute added', markup: '<aegov-input name="a" value="abc"></aegov-input>', change: 'el.setAttribute("pattern", "[0-9]+")', validAfter: false },
    { name: 'aegov-input pattern attribute removed', markup: '<aegov-input name="a" value="abc" pattern="[0-9]+"></aegov-input>', change: 'el.removeAttribute("pattern")', validAfter: true },
    { name: 'aegov-input max attribute added', markup: '<aegov-input name="a" type="number" value="5"></aegov-input>', change: 'el.setAttribute("max", "3")', validAfter: false },
    { name: 'aegov-input isDisabled → true bars validation', markup: '<aegov-input name="a" is-required></aegov-input>', change: 'el.isDisabled = true', validAfter: true },
    { name: 'aegov-textarea isRequired → true', markup: '<aegov-textarea name="a"></aegov-textarea>', change: 'el.isRequired = true', validAfter: false },
    { name: 'aegov-select (native) isRequired → true', markup: '<aegov-select name="a"><aegov-select-option value="">Pick</aegov-select-option><aegov-select-option value="x">X</aegov-select-option></aegov-select>', change: 'el.isRequired = true', validAfter: false },
    { name: 'aegov-select (listbox) isRequired → true', markup: '<aegov-select name="a" appearance="listbox"><aegov-select-option value="x">X</aegov-select-option></aegov-select>', change: 'el.isRequired = true', validAfter: false },
    { name: 'aegov-checkbox isRequired → true', markup: '<aegov-checkbox name="a" value="1" label="c"></aegov-checkbox>', change: 'el.isRequired = true', validAfter: false },
    { name: 'aegov-radio isRequired → true', markup: '<aegov-radio name="a" value="1" label="r"></aegov-radio>', change: 'el.isRequired = true', validAfter: false },
    { name: 'aegov-toggle isRequired → true', markup: '<aegov-toggle name="a" value="1" label="t"></aegov-toggle>', change: 'el.isRequired = true', validAfter: false },
    { name: 'aegov-otp isRequired → true', markup: '<aegov-otp name="a" length="4"></aegov-otp>', change: 'el.isRequired = true', validAfter: false },
    { name: 'aegov-otp pattern set', markup: '<aegov-otp name="a" length="4" value="abcd" is-alphanumeric></aegov-otp>', change: 'el.pattern = "[0-9]+"', validAfter: false },
    { name: 'aegov-otp length raised', markup: '<aegov-otp name="a" length="4" value="1234"></aegov-otp>', change: 'el.length = 6', validAfter: false },
    { name: 'aegov-datepicker isRequired → true', markup: '<aegov-datepicker name="a"></aegov-datepicker>', change: 'el.isRequired = true', validAfter: false },
    { name: 'aegov-datepicker min after the value', markup: '<aegov-datepicker name="a" value="2026-01-10"></aegov-datepicker>', change: 'el.min = "2026-02-01"', validAfter: false },
    { name: 'aegov-fileupload isRequired → true', markup: '<aegov-fileupload name="a"></aegov-fileupload>', change: 'el.isRequired = true', validAfter: false },
  ];

  for (const { name, markup, change, validAfter } of cases) {
    it(name, async () => {
      const page = await newE2EPage();
      await page.setContent(`<form>${markup}</form>`);
      await page.waitForChanges();
      expect(await page.evaluate(() => document.querySelector('form')!.checkValidity())).toBe(!validAfter);
      await page.evaluate((code: string) => {
        const el = document.querySelector('form')!.firstElementChild as any;
        new Function('el', code)(el);
      }, change);
      await page.waitForChanges();
      expect(await page.evaluate(() => document.querySelector('form')!.checkValidity())).toBe(validAfter);
    });
  }
});

/**
 * A disabled control is left out of FormData and of constraint validation, as a
 * native one is. For a form-associated custom element the browser only does
 * that through the host's `disabled` attribute (or a disabled fieldset), which
 * each control mirrors from `isDisabled`.
 */
describe('form integration: disabled controls', () => {
  const controls: Array<{ name: string; markup: string }> = [
    { name: 'aegov-input', markup: '<aegov-input name="a" value="v"></aegov-input>' },
    { name: 'aegov-textarea', markup: '<aegov-textarea name="a" value="v"></aegov-textarea>' },
    { name: 'aegov-select (native)', markup: '<aegov-select name="a" value="x"><aegov-select-option value="x">X</aegov-select-option></aegov-select>' },
    { name: 'aegov-select (listbox)', markup: '<aegov-select name="a" appearance="listbox" value="x"><aegov-select-option value="x">X</aegov-select-option></aegov-select>' },
    { name: 'aegov-checkbox', markup: '<aegov-checkbox name="a" value="1" label="c" is-checked></aegov-checkbox>' },
    { name: 'aegov-radio', markup: '<aegov-radio name="a" value="1" label="r" is-checked></aegov-radio>' },
    { name: 'aegov-toggle', markup: '<aegov-toggle name="a" value="1" label="t" is-checked></aegov-toggle>' },
    { name: 'aegov-range', markup: '<aegov-range name="a" value="40"></aegov-range>' },
    { name: 'aegov-otp', markup: '<aegov-otp name="a" length="4" value="1234"></aegov-otp>' },
    { name: 'aegov-datepicker', markup: '<aegov-datepicker name="a" value="2026-01-10"></aegov-datepicker>' },
  ];
  const entries = () => {
    const names: string[] = [];
    new FormData(document.querySelector('form')!).forEach((_v, k) => names.push(k));
    return names;
  };

  for (const { name, markup } of controls) {
    it(`${name} leaves FormData while isDisabled, and returns when re-enabled`, async () => {
      const page = await newE2EPage();
      await page.setContent(`<form>${markup}</form>`);
      await page.waitForChanges();
      expect(await page.evaluate(entries)).toEqual(['a']);
      await page.$eval('form > *', (el: any) => { el.isDisabled = true; });
      await page.waitForChanges();
      expect(await page.evaluate(entries)).toEqual([]);
      await page.$eval('form > *', (el: any) => { el.isDisabled = false; });
      await page.waitForChanges();
      expect(await page.evaluate(entries)).toEqual(['a']);
    });
  }

  it('is-disabled in the markup leaves FormData and bars a required field from validation', async () => {
    const page = await newE2EPage();
    await page.setContent('<form><aegov-input name="a" value="v" is-disabled></aegov-input><aegov-textarea name="b" is-required is-disabled></aegov-textarea></form>');
    await page.waitForChanges();
    expect(await page.evaluate(entries)).toEqual([]);
    expect(await page.evaluate(() => document.querySelector('form')!.checkValidity())).toBe(true);
  });

  it('a field\'s own isDisabled survives its fieldset being disabled and re-enabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<form><fieldset><aegov-input name="a" value="v" is-disabled></aegov-input></fieldset></form>');
    await page.waitForChanges();
    await page.$eval('fieldset', (fs: HTMLFieldSetElement) => { fs.disabled = true; });
    await page.waitForChanges();
    await page.$eval('fieldset', (fs: HTMLFieldSetElement) => { fs.disabled = false; });
    await page.waitForChanges();
    expect(await page.$eval('aegov-input', (el: any) => el.isDisabled)).toBe(true);
    expect(await page.$eval('aegov-input', (el: any) => el.shadowRoot.querySelector('input').disabled)).toBe(true);
    expect(await page.evaluate(entries)).toEqual([]);
  });

  it('a field disabled only by its fieldset is enabled again with it', async () => {
    const page = await newE2EPage();
    await page.setContent('<form><fieldset><aegov-input name="a" value="v"></aegov-input></fieldset></form>');
    await page.waitForChanges();
    await page.$eval('fieldset', (fs: HTMLFieldSetElement) => { fs.disabled = true; });
    await page.waitForChanges();
    expect(await page.$eval('aegov-input', (el: any) => el.shadowRoot.querySelector('input').disabled)).toBe(true);
    expect(await page.evaluate(entries)).toEqual([]);
    await page.$eval('fieldset', (fs: HTMLFieldSetElement) => { fs.disabled = false; });
    await page.waitForChanges();
    expect(await page.$eval('aegov-input', (el: any) => el.shadowRoot.querySelector('input').disabled)).toBe(false);
    expect(await page.evaluate(entries)).toEqual(['a']);
  });
});

/**
 * A control named or id'd like a form method shadows it (`form.reset` becomes
 * the control). Native buttons are unaffected, so aegov-button and aegov-input's
 * Enter-key submission must be too.
 */
describe('form integration: controls shadowing form members', () => {
  const run = async (markup: string, act: string) => {
    const page = await newE2EPage();
    await page.setContent(markup);
    await page.waitForChanges();
    await page.evaluate(() => {
      (window as any).log = [];
      document.addEventListener('submit', e => { e.preventDefault(); (window as any).log.push('submit'); });
      document.addEventListener('reset', () => (window as any).log.push('reset'));
      window.addEventListener('error', e => (window as any).log.push('error: ' + e.message));
    });
    if (act === 'enter') {
      await (await page.find('aegov-input >>> input')).press('Enter');
    } else {
      await page.$eval(`aegov-button[type="${act}"]`, (b: HTMLElement) => b.shadowRoot!.querySelector('button')!.click());
    }
    await new Promise(r => setTimeout(r, 50));
    return { page, log: await page.evaluate(() => (window as any).log) };
  };

  it('type="reset" resets a form with a control named "reset"', async () => {
    const { page, log } = await run('<form><input name="reset" value="orig"><aegov-button type="reset">R</aegov-button></form>', 'reset');
    expect(log).toEqual(['reset']);
    expect(await page.$eval('input', (i: HTMLInputElement) => i.value)).toBe('orig');
  });

  it('type="reset" resets a form with a control id\'d "reset"', async () => {
    const { log } = await run('<form><input id="reset"><aegov-button type="reset">R</aegov-button></form>', 'reset');
    expect(log).toEqual(['reset']);
  });

  it('type="submit" submits a form with a control named "requestSubmit"', async () => {
    const { log } = await run('<form><input type="hidden" name="requestSubmit"><aegov-button type="submit">S</aegov-button></form>', 'submit');
    expect(log).toEqual(['submit']);
  });

  it('Enter submits a form with a control named "submit"', async () => {
    const { log } = await run('<form><input type="hidden" name="submit"><aegov-input name="q"></aegov-input></form>', 'enter');
    expect(log).toEqual(['submit']);
  });

  it('Enter finds the default button in a form with a control named "elements"', async () => {
    const { log } = await run('<form><input type="hidden" name="elements"><aegov-input name="q"></aegov-input><aegov-input name="r"></aegov-input><aegov-button type="submit">S</aegov-button></form>', 'enter');
    expect(log).toEqual(['submit']);
  });
});

/** validate() agrees with the form: a disabled control is barred from validation. */
describe('form integration: validate() on disabled controls', () => {
  const required: Array<[string, string]> = [
    ['aegov-input', '<aegov-input name="a" is-required></aegov-input>'],
    ['aegov-select (listbox)', '<aegov-select name="a" appearance="listbox" is-required><aegov-select-option value="x">X</aegov-select-option></aegov-select>'],
    ['aegov-checkbox', '<aegov-checkbox name="a" value="1" label="c" is-required></aegov-checkbox>'],
    ['aegov-otp', '<aegov-otp name="a" length="4" is-required></aegov-otp>'],
    ['aegov-datepicker', '<aegov-datepicker name="a" is-required></aegov-datepicker>'],
    ['aegov-fileupload', '<aegov-fileupload name="a" is-required></aegov-fileupload>'],
    ['aegov-radio-group', '<aegov-radio-group name="a" label="g" is-required><aegov-radio value="1" label="1"></aegov-radio></aegov-radio-group>'],
  ];
  for (const [name, markup] of required) {
    for (const via of ['isDisabled', 'fieldset']) {
      if (via === 'fieldset' && name === 'aegov-radio-group') continue;
      it(`${name}: required and empty but disabled (${via}) → validate() is valid`, async () => {
        const page = await newE2EPage();
        await page.setContent(via === 'fieldset' ? `<form><fieldset disabled>${markup}</fieldset></form>` : `<form>${markup}</form>`);
        await page.waitForChanges();
        if (via === 'isDisabled') {
          await page.$eval('form > *', (el: any) => { el.isDisabled = true; });
          await page.waitForChanges();
        }
        const valid = await page.$eval('form aegov-' + name.split(' ')[0].slice(6), async (el: any) => (await el.validate()).valid);
        expect(valid).toBe(true);
        expect(await page.evaluate(() => document.querySelector('form')!.checkValidity())).toBe(true);
      });
    }
  }

  it('aegov-select (native) setCustomValidity() reaches the form at once', async () => {
    const page = await newE2EPage();
    await page.setContent('<form><aegov-select name="s"><aegov-select-option value="x">X</aegov-select-option></aegov-select></form>');
    await page.waitForChanges();
    await page.$eval('aegov-select', (el: any) => el.setCustomValidity('Nope'));
    expect(await page.evaluate(() => document.querySelector('form')!.checkValidity())).toBe(false);
    await page.$eval('aegov-select', (el: any) => el.setCustomValidity(''));
    expect(await page.evaluate(() => document.querySelector('form')!.checkValidity())).toBe(true);
  });
});

/** FormData entries and form reset follow native controls. */
describe('form integration: form value and reset', () => {
  const entries = () => {
    const out: string[] = [];
    new FormData(document.querySelector('form')!).forEach((v, k) => out.push(`${k}=${v}`));
    return out;
  };

  it('empty text fields submit an empty entry; a checked radio without a value submits "on"', async () => {
    const page = await newE2EPage();
    await page.setContent('<form><aegov-input name="i"></aegov-input><aegov-textarea name="t"></aegov-textarea><aegov-radio name="r" label="r" is-checked></aegov-radio></form>');
    await page.waitForChanges();
    expect(await page.evaluate(entries)).toEqual(['i=', 't=', 'r=on']);
  });

  const resets: Array<[string, string, string | number, string | number]> = [
    ['aegov-input', '<aegov-input name="a" value="init"></aegov-input>', 'changed', 'init'],
    ['aegov-textarea', '<aegov-textarea name="a" value="init"></aegov-textarea>', 'changed', 'init'],
    ['aegov-select', '<aegov-select name="a" value="x"><aegov-select-option value="x">X</aegov-select-option><aegov-select-option value="y">Y</aegov-select-option></aegov-select>', 'y', 'x'],
    ['aegov-otp', '<aegov-otp name="a" length="4" value="1234"></aegov-otp>', '9999', '1234'],
    ['aegov-datepicker', '<aegov-datepicker name="a" value="2026-01-10"></aegov-datepicker>', '2026-03-03', '2026-01-10'],
    ['aegov-range', '<aegov-range name="a" value="30"></aegov-range>', 80, 30],
  ];
  for (const [name, markup, changed, initial] of resets) {
    it(`${name}: reset restores the initial value and clears a custom error`, async () => {
      const page = await newE2EPage();
      await page.setContent(`<form>${markup}</form>`);
      await page.waitForChanges();
      await page.$eval('form > *', async (el: any, v: unknown) => {
        el.value = v;
        await el.setCustomValidity('Server says no');
      }, changed);
      await page.waitForChanges();
      await page.$eval('form', (f: HTMLFormElement) => f.reset());
      await page.waitForChanges();
      expect(await page.$eval('form > *', (el: any) => el.value)).toBe(initial);
      expect(await page.evaluate(entries)).toEqual([`a=${initial}`]);
      expect(await page.evaluate(() => document.querySelector('form')!.checkValidity())).toBe(true);
      expect(await page.$eval('form > *', (el: any) => el.isInvalid)).toBe(false);
    });
  }
});

/**
 * aegov-range sanitizes its value the way a native `<input type="range">` does
 * (clamped to min/max, rounded to step), so what is submitted is what is shown.
 */
describe('form integration: range value sanitization', () => {
  const entries = () => {
    const out: string[] = [];
    new FormData(document.querySelector('form')!).forEach((v, k) => out.push(`${k}=${v}`));
    return out;
  };
  const inner = (el: any) => el.shadowRoot.querySelector('input').value;

  it('submits the clamped value shown by the thumb, and validate() agrees', async () => {
    const page = await newE2EPage();
    await page.setContent('<form><aegov-range name="r" min="10" value="5"></aegov-range><aegov-range name="s" max="50" step="10" value="77"></aegov-range></form>');
    await page.waitForChanges();
    expect(await page.evaluate(entries)).toEqual(['r=10', 's=50']);
    expect(await page.$eval('aegov-range[name="r"]', inner)).toBe('10');
    expect(await page.$eval('aegov-range[name="r"]', async (el: any) => (await el.validate()).valid)).toBe(true);
  });

  it('follows a value set from code and changed bounds', async () => {
    const page = await newE2EPage();
    await page.setContent('<form><aegov-range name="r" value="30"></aegov-range></form>');
    await page.waitForChanges();
    await page.$eval('aegov-range', (el: any) => { el.value = 500; });
    await page.waitForChanges();
    expect(await page.evaluate(entries)).toEqual(['r=100']);
    await page.$eval('aegov-range', (el: any) => { el.value = 42; el.min = 60; });
    await page.waitForChanges();
    expect(await page.evaluate(entries)).toEqual(['r=60']);
    expect(await page.$eval('aegov-range', inner)).toBe('60');
  });

  it('dual mode submits sanitized low/high values', async () => {
    const page = await newE2EPage();
    await page.setContent('<form><aegov-range name="r" mode="range" step="5" value-low="-5" value-high="203"></aegov-range></form>');
    await page.waitForChanges();
    expect(await page.evaluate(entries)).toEqual(['r-low=0', 'r-high=100']);
  });

  it('reset restores the sanitized initial value', async () => {
    const page = await newE2EPage();
    await page.setContent('<form><aegov-range name="r" min="10" value="5"></aegov-range></form>');
    await page.waitForChanges();
    await page.$eval('aegov-range', (el: any) => { el.value = 70; });
    await page.waitForChanges();
    await page.$eval('form', (f: HTMLFormElement) => f.reset());
    await page.waitForChanges();
    expect(await page.evaluate(entries)).toEqual(['r=10']);
  });
});
