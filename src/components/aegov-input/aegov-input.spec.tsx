import { newSpecPage } from '@stencil/core/testing';
import { AegovInput } from './aegov-input';

describe('aegov-input', () => {
  it('renders a native input with default type=text', async () => {
    const page = await newSpecPage({
      components: [AegovInput],
      html: `<aegov-input></aegov-input>`,
    });
    const input = page.root.querySelector('input');
    expect(input).not.toBeNull();
    expect(input.type).toBe('text');
    expect(input.className).toContain('aegov-input');
    expect(input.className).toContain('input--base');
  });

  it('auto-generates fieldId when not provided', async () => {
    const page = await newSpecPage({
      components: [AegovInput],
      html: `<aegov-input></aegov-input>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-input-\d+$/);
    expect(page.root.querySelector('input').id).toBe(page.rootInstance.fieldId);
  });

  it('respects user-provided fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovInput],
      html: `<aegov-input field-id="my-input"></aegov-input>`,
    });
    expect(page.rootInstance.fieldId).toBe('my-input');
    expect(page.root.querySelector('input').id).toBe('my-input');
  });

  it('applies type prop to native input', async () => {
    const page = await newSpecPage({
      components: [AegovInput],
      html: `<aegov-input type="email"></aegov-input>`,
    });
    expect(page.root.querySelector('input').type).toBe('email');
  });

  it('applies size class', async () => {
    const page = await newSpecPage({
      components: [AegovInput],
      html: `<aegov-input size="lg"></aegov-input>`,
    });
    expect(page.root.querySelector('input').className).toContain('input--lg');
  });

  it('disables the native input when is-disabled', async () => {
    const page = await newSpecPage({
      components: [AegovInput],
      html: `<aegov-input is-disabled="true"></aegov-input>`,
    });
    expect(page.root.querySelector('input').disabled).toBe(true);
  });

  it('makes the input readonly when is-readonly', async () => {
    const page = await newSpecPage({
      components: [AegovInput],
      html: `<aegov-input is-readonly="true"></aegov-input>`,
    });
    expect(page.root.querySelector('input').readOnly).toBe(true);
  });

  it('applies required when is-required', async () => {
    const page = await newSpecPage({
      components: [AegovInput],
      html: `<aegov-input is-required="true"></aegov-input>`,
    });
    expect(page.root.querySelector('input').required).toBe(true);
  });

  it('applies placeholder, value, and name', async () => {
    const page = await newSpecPage({
      components: [AegovInput],
      html: `<aegov-input placeholder="enter" value="hi" name="field"></aegov-input>`,
    });
    const input = page.root.querySelector('input');
    expect(input.placeholder).toBe('enter');
    expect(input.value).toBe('hi');
    expect(input.name).toBe('field');
  });

  it('emits aegovInputInput on input event', async () => {
    const page = await newSpecPage({
      components: [AegovInput],
      html: `<aegov-input></aegov-input>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovInputInput', spy);
    const input = page.root.querySelector('input');
    input.value = 'abc';
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.value).toBe('abc');
  });

  it('emits aegovInputChange on change event', async () => {
    const page = await newSpecPage({
      components: [AegovInput],
      html: `<aegov-input></aegov-input>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovInputChange', spy);
    const input = page.root.querySelector('input');
    input.value = 'done';
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.value).toBe('done');
  });

  it('emits aegovInputFocus and aegovInputBlur', async () => {
    const page = await newSpecPage({
      components: [AegovInput],
      html: `<aegov-input></aegov-input>`,
    });
    const focusSpy = jest.fn();
    const blurSpy = jest.fn();
    page.root.addEventListener('aegovInputFocus', focusSpy);
    page.root.addEventListener('aegovInputBlur', blurSpy);
    const input = page.root.querySelector('input');
    input.dispatchEvent(new FocusEvent('focus'));
    input.dispatchEvent(new FocusEvent('blur'));
    await page.waitForChanges();
    expect(focusSpy).toHaveBeenCalledTimes(1);
    expect(blurSpy).toHaveBeenCalledTimes(1);
  });

  it('does not render reveal button when type is not password', async () => {
    const page = await newSpecPage({
      components: [AegovInput],
      html: `<aegov-input is-revealable="true"></aegov-input>`,
    });
    expect(page.root.querySelector('.input__revealable')).toBeNull();
  });

  it('renders reveal button when type=password and is-revealable', async () => {
    const page = await newSpecPage({
      components: [AegovInput],
      html: `<aegov-input type="password" is-revealable="true"></aegov-input>`,
    });
    const btn = page.root.querySelector('.input__revealable');
    expect(btn).not.toBeNull();
    expect(btn.getAttribute('aria-label')).toBe('Show password');
  });

  it('toggles password visibility on reveal click', async () => {
    const page = await newSpecPage({
      components: [AegovInput],
      html: `<aegov-input type="password" is-revealable="true"></aegov-input>`,
    });
    const btn = page.root.querySelector('.input__revealable') as HTMLButtonElement;
    btn.click();
    await page.waitForChanges();
    expect(page.root.querySelector('input').type).toBe('text');
    expect(page.root.querySelector('.input__revealable').getAttribute('aria-label')).toBe('Hide password');
  });

  it('does not render copy button without is-readonly', async () => {
    const page = await newSpecPage({
      components: [AegovInput],
      html: `<aegov-input is-copyable="true"></aegov-input>`,
    });
    expect(page.root.querySelector('.input__copy-btn')).toBeNull();
  });

  it('renders copy button when is-readonly and is-copyable', async () => {
    const page = await newSpecPage({
      components: [AegovInput],
      html: `<aegov-input is-readonly="true" is-copyable="true" value="text"></aegov-input>`,
    });
    expect(page.root.querySelector('.input__copy-btn')).not.toBeNull();
  });

  it('forwards aria-* and data-* attributes', async () => {
    const page = await newSpecPage({
      components: [AegovInput],
      html: `<aegov-input aria-describedby="hint" data-test="x"></aegov-input>`,
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('aria-describedby')).toBe('hint');
    expect(input.getAttribute('data-test')).toBe('x');
  });

  it('forwards declared pass-through attrs (maxlength, autocomplete)', async () => {
    const page = await newSpecPage({
      components: [AegovInput],
      html: `<aegov-input maxlength="5" autocomplete="email"></aegov-input>`,
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('maxlength')).toBe('5');
    expect(input.getAttribute('autocomplete')).toBe('email');
  });

  it('renders icon-start slot wrapper when slot is provided', async () => {
    const page = await newSpecPage({
      components: [AegovInput],
      html: `<aegov-input><svg slot="icon-start"></svg></aegov-input>`,
    });
    expect(page.root.querySelector('.input__icon--start')).not.toBeNull();
    expect(page.root.querySelector('input').className).toContain('input--has-icon-start');
  });

  it('applies extra-class', async () => {
    const page = await newSpecPage({
      components: [AegovInput],
      html: `<aegov-input extra-class="custom"></aegov-input>`,
    });
    expect(page.root.querySelector('input').className).toContain('custom');
  });
});
