import { newSpecPage } from '@stencil/core/testing';
import { q } from '../../utils/test-helpers';
import { AegovTextarea } from './aegov-textarea';

describe('aegov-textarea', () => {
  it('renders a native textarea with default classes', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea></aegov-textarea>`,
    });
    const ta = q(page.root, 'textarea');
    expect(ta).not.toBeNull();
    expect(ta.className).toContain('aegov-textarea');
    expect(ta.className).toContain('textarea--base');
    expect(ta.className).toContain('textarea--resize-vertical');
  });

  it('auto-generates fieldId when not provided', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea></aegov-textarea>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-textarea-\d+$/);
    expect(q(page.root, 'textarea').id).toBe(page.rootInstance.fieldId);
  });

  it('respects user-provided fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea field-id="t1"></aegov-textarea>`,
    });
    expect(q(page.root, 'textarea').id).toBe('t1');
  });

  it('applies size class', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea size="lg"></aegov-textarea>`,
    });
    expect(q(page.root, 'textarea').className).toContain('textarea--lg');
  });

  it('applies resize class', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea resize="none"></aegov-textarea>`,
    });
    expect(q(page.root, 'textarea').className).toContain('textarea--resize-none');
  });

  it('disables the textarea when is-disabled', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea is-disabled="true"></aegov-textarea>`,
    });
    expect(q(page.root, 'textarea').hasAttribute('disabled')).toBe(true);
  });

  it('marks readonly when is-readonly', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea is-readonly="true"></aegov-textarea>`,
    });
    expect(q(page.root, 'textarea').hasAttribute('readonly')).toBe(true);
  });

  it('marks required when is-required', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea is-required="true"></aegov-textarea>`,
    });
    expect(q(page.root, 'textarea').hasAttribute('required')).toBe(true);
  });

  it('applies placeholder, value, name', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea placeholder="ph" value="hi" name="msg"></aegov-textarea>`,
    });
    const ta = q(page.root, 'textarea');
    expect(ta.getAttribute("placeholder")).toBe("ph");
    expect(ta.getAttribute("value")).toBe("hi");
    // FACE owns submission: name stays on the host, never on the shadow-internal control.
    expect(page.root.getAttribute('name')).toBe("msg");
    expect(ta.hasAttribute('name')).toBe(false);
  });

  it('emits aegovTextareaValue on input event', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea></aegov-textarea>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovTextareaValue', spy);
    const ta = q(page.root, 'textarea');
    ta.value = 'abc';
    ta.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.value).toBe('abc');
  });

  it('emits aegovTextareaChange on change event', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea></aegov-textarea>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovTextareaChange', spy);
    const ta = q(page.root, 'textarea');
    ta.value = 'done';
    ta.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.value).toBe('done');
  });

  it('emits focus and blur events', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea></aegov-textarea>`,
    });
    const focusSpy = jest.fn();
    const blurSpy = jest.fn();
    page.root.addEventListener('aegovTextareaFocus', focusSpy);
    page.root.addEventListener('aegovTextareaBlur', blurSpy);
    const ta = q(page.root, 'textarea');
    ta.dispatchEvent(new FocusEvent('focus'));
    ta.dispatchEvent(new FocusEvent('blur'));
    await page.waitForChanges();
    expect(focusSpy).toHaveBeenCalledTimes(1);
    expect(blurSpy).toHaveBeenCalledTimes(1);
  });

  it('renders character counter when maxlength is set', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea maxlength="10" value="hi"></aegov-textarea>`,
    });
    const counter = q(page.root, '.textarea__counter');
    expect(counter).not.toBeNull();
    expect(counter.textContent).toContain('2 / 10');
  });

  it('marks counter as over when exceeded', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea maxlength="2" value="abcde"></aegov-textarea>`,
    });
    const counter = q(page.root, '.textarea__counter');
    expect(counter.className).toContain('textarea__counter--over');
  });

  it('links aria-describedby to counter when maxlength is set', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea field-id="ta" maxlength="5"></aegov-textarea>`,
    });
    const ta = q(page.root, 'textarea');
    expect(ta.getAttribute('aria-describedby')).toBe('ta-counter');
  });

  it('does not render copy button without is-readonly', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea is-copyable="true"></aegov-textarea>`,
    });
    expect(q(page.root, '.textarea__copy-btn')).toBeNull();
  });

  it('renders copy button when is-readonly and is-copyable', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea is-readonly="true" is-copyable="true" value="x"></aegov-textarea>`,
    });
    expect(q(page.root, '.textarea__copy-btn')).not.toBeNull();
  });

  it('forwards aria-* and data-* attributes', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea aria-label="msg" data-test="y"></aegov-textarea>`,
    });
    const ta = q(page.root, 'textarea');
    expect(ta.getAttribute('aria-label')).toBe('msg');
    expect(ta.getAttribute('data-test')).toBe('y');
  });

  it('forwards declared pass-through attrs (rows, cols)', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea rows="6" cols="40"></aegov-textarea>`,
    });
    const ta = q(page.root, 'textarea');
    expect(ta.getAttribute('rows')).toBe('6');
    expect(ta.getAttribute('cols')).toBe('40');
  });

  // Validation surface (Layer 1) — see validation-engine-addon.md §2.8
  describe('validation surface', () => {
    it('toggles aria-invalid when isInvalid is true', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea is-invalid="true"></aegov-textarea>`,
      });
      expect(q(page.root, 'textarea').getAttribute('aria-invalid')).toBe('true');
      expect(page.root.classList.contains('is-invalid')).toBe(true);
    });

    it('renders errorMessage in error region when isInvalid', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea is-invalid="true" error-message="Bad value"></aegov-textarea>`,
      });
      const error = q(page.root, '.aegov-textarea__error');
      expect(error).not.toBeNull();
      expect(error.textContent).toBe('Bad value');
    });

    it('renders hint region when hint set and not invalid', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea hint="Helper text"></aegov-textarea>`,
      });
      const hint = q(page.root, '.aegov-textarea__hint');
      expect(hint).not.toBeNull();
      expect(hint.textContent).toBe('Helper text');
    });

    it('keeps the hint visible alongside the error (DS-A11Y-input-08)', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea is-invalid="true" error-message="Err" hint="Hint"></aegov-textarea>`,
      });
      expect(q(page.root, '.aegov-textarea__error')).not.toBeNull();
      expect(q(page.root, '.aegov-textarea__hint')).not.toBeNull();
    });

    it('aria-describedby chains counter + error ids', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea field-id="x" maxlength="10" is-invalid="true" error-message="msg"></aegov-textarea>`,
      });
      const desc = q(page.root, 'textarea').getAttribute('aria-describedby');
      expect(desc).toContain('x-counter');
      expect(desc).toContain('x-error');
    });

    it('validate() resolves valid for empty optional textarea', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea></aegov-textarea>`,
      });
      const result = await page.rootInstance.validate('manual');
      expect(result.valid).toBe(true);
    });

    it('setCustomValidity("msg") sets invalid + error', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea></aegov-textarea>`,
      });
      await page.rootInstance.setCustomValidity('Custom err');
      await page.waitForChanges();
      expect(page.rootInstance.isInvalid).toBe(true);
      expect(page.rootInstance.errorMessage).toBe('Custom err');
    });

    it('setCustomValidity("") clears invalid + error', async () => {
      const page = await newSpecPage({
        components: [AegovTextarea],
        html: `<aegov-textarea is-invalid="true" error-message="x"></aegov-textarea>`,
      });
      await page.rootInstance.setCustomValidity('');
      await page.waitForChanges();
      expect(page.rootInstance.isInvalid).toBe(false);
      expect(page.rootInstance.errorMessage).toBe('');
    });
  });
});
