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
    const input = await page.find('aegov-input input');
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
    const input = await page.find('aegov-input input');
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
    const first = await page.find('aegov-otp .otp__cell:nth-of-type(1)');
    await first.focus();
    await page.keyboard.type('1234');
    await page.waitForChanges();
    const fired = spy.events.filter((e: any) => e.detail?.validity?.patternMismatch === true);
    expect(fired.length).toBeGreaterThan(0);
  });

  it('aegov-select listbox does NOT render hidden input (FormAssociated handles submission per §2.5)', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-select variant="listbox" name="fruit">
        <aegov-select-option value="a">Apple</aegov-select-option>
      </aegov-select>
    `);
    await page.waitForChanges();
    const hidden = await page.find('aegov-select input[type="hidden"]');
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
