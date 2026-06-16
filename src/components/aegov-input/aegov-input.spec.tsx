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

  // ───────────────────────────────────────────────────────────────────
  // Validation surface (Layer 1)
  // See: validation-engine-addon.md §2.8
  // ───────────────────────────────────────────────────────────────────

  describe('validation surface', () => {
    it('toggles aria-invalid when isInvalid is true', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input is-invalid="true"></aegov-input>`,
      });
      expect(page.root.querySelector('input').getAttribute('aria-invalid')).toBe('true');
      expect(page.root.classList.contains('is-invalid')).toBe(true);
    });

    it('does not set aria-invalid when isInvalid is false', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input></aegov-input>`,
      });
      expect(page.root.querySelector('input').getAttribute('aria-invalid')).toBeNull();
      expect(page.root.classList.contains('is-invalid')).toBe(false);
    });

    it('renders errorMessage in error region when isInvalid', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input is-invalid="true" error-message="Bad value"></aegov-input>`,
      });
      const error = page.root.querySelector('.aegov-input__error');
      expect(error).not.toBeNull();
      expect(error.textContent).toBe('Bad value');
    });

    it('does not render error region when isInvalid is false', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input error-message="Hidden"></aegov-input>`,
      });
      expect(page.root.querySelector('.aegov-input__error')).toBeNull();
    });

    it('renders hint region when hint prop set and not invalid', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input hint="Helper text"></aegov-input>`,
      });
      const hint = page.root.querySelector('.aegov-input__hint');
      expect(hint).not.toBeNull();
      expect(hint.textContent).toBe('Helper text');
    });

    it('hides hint when error is shown (error wins)', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input is-invalid="true" error-message="Err" hint="Hint"></aegov-input>`,
      });
      expect(page.root.querySelector('.aegov-input__error')).not.toBeNull();
      expect(page.root.querySelector('.aegov-input__hint')).toBeNull();
    });

    it('aria-describedby points at error region id when error shown', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input field-id="x" is-invalid="true" error-message="msg"></aegov-input>`,
      });
      expect(page.root.querySelector('input').getAttribute('aria-describedby')).toBe('x-error');
    });

    it('aria-describedby points at hint region id when hint shown', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input field-id="x" hint="help"></aegov-input>`,
      });
      expect(page.root.querySelector('input').getAttribute('aria-describedby')).toBe('x-hint');
    });

    it('preserves author-supplied aria-describedby and appends our IDs (gap §7.8)', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input field-id="x" aria-describedby="extra-help" is-invalid="true" error-message="err" hint="h"></aegov-input>`,
      });
      // hint hides because error wins; chain is "extra-help x-error"
      expect(page.root.querySelector('input').getAttribute('aria-describedby')).toBe('extra-help x-error');
    });

    it('error slot present overrides errorMessage prop (slot wins)', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input is-invalid="true" error-message="prop"><span slot="error">slotted</span></aegov-input>`,
      });
      const errorRegion = page.root.querySelector('.aegov-input__error');
      expect(errorRegion).not.toBeNull();
      // Error region should NOT contain the prop string when slot is present
      // (it renders <slot name="error" /> instead)
      expect(errorRegion.textContent).not.toContain('prop');
      // Slotted child remains in the host's light DOM
      expect(page.root.querySelector('span[slot="error"]')?.textContent).toBe('slotted');
    });

    it('validate() resolves with valid:true for empty optional input', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input></aegov-input>`,
      });
      const result = await page.rootInstance.validate('manual');
      expect(result.valid).toBe(true);
      expect(result.message).toBe('');
      expect(result.validity?.valid).toBe(true);
    });

    it('setCustomValidity("msg") flips isInvalid + errorMessage', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input></aegov-input>`,
      });
      await page.rootInstance.setCustomValidity('Custom error');
      await page.waitForChanges();
      expect(page.rootInstance.isInvalid).toBe(true);
      expect(page.rootInstance.errorMessage).toBe('Custom error');
      expect(page.root.querySelector('input').getAttribute('aria-invalid')).toBe('true');
    });

    it('setCustomValidity("") clears isInvalid + errorMessage', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input is-invalid="true" error-message="x"></aegov-input>`,
      });
      await page.rootInstance.setCustomValidity('');
      await page.waitForChanges();
      expect(page.rootInstance.isInvalid).toBe(false);
      expect(page.rootInstance.errorMessage).toBe('');
    });

    it('error region has no role/aria-live before first blur (gap §7.10)', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input is-invalid="true" error-message="err"></aegov-input>`,
      });
      const region = page.root.querySelector('.aegov-input__error');
      expect(region.getAttribute('role')).toBeNull();
      expect(region.getAttribute('aria-live')).toBeNull();
    });

    it('error region gains role=alert after first blur', async () => {
      const page = await newSpecPage({
        components: [AegovInput],
        html: `<aegov-input is-invalid="true" error-message="err"></aegov-input>`,
      });
      page.rootInstance.hasBlurredOnce = true;
      await page.waitForChanges();
      const region = page.root.querySelector('.aegov-input__error');
      expect(region.getAttribute('role')).toBe('alert');
      expect(region.getAttribute('aria-live')).toBe('polite');
    });
  });
});
