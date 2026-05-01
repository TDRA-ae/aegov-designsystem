import { newSpecPage } from '@stencil/core/testing';
import { AegovTextarea } from './aegov-textarea';

describe('aegov-textarea', () => {
  it('renders a native textarea with default classes', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea></aegov-textarea>`,
    });
    const ta = page.root.querySelector('textarea');
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
    expect(page.root.querySelector('textarea').id).toBe(page.rootInstance.fieldId);
  });

  it('respects user-provided fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea field-id="t1"></aegov-textarea>`,
    });
    expect(page.root.querySelector('textarea').id).toBe('t1');
  });

  it('applies size class', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea size="lg"></aegov-textarea>`,
    });
    expect(page.root.querySelector('textarea').className).toContain('textarea--lg');
  });

  it('applies resize class', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea resize="none"></aegov-textarea>`,
    });
    expect(page.root.querySelector('textarea').className).toContain('textarea--resize-none');
  });

  it('disables the textarea when is-disabled', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea is-disabled="true"></aegov-textarea>`,
    });
    expect(page.root.querySelector('textarea').hasAttribute('disabled')).toBe(true);
  });

  it('marks readonly when is-readonly', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea is-readonly="true"></aegov-textarea>`,
    });
    expect(page.root.querySelector('textarea').hasAttribute('readonly')).toBe(true);
  });

  it('marks required when is-required', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea is-required="true"></aegov-textarea>`,
    });
    expect(page.root.querySelector('textarea').hasAttribute('required')).toBe(true);
  });

  it('applies placeholder, value, name', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea placeholder="ph" value="hi" name="msg"></aegov-textarea>`,
    });
    const ta = page.root.querySelector('textarea');
    expect(ta.getAttribute("placeholder")).toBe("ph");
    expect(ta.getAttribute("value")).toBe("hi");
    expect(ta.getAttribute("name")).toBe("msg");
  });

  it('emits aegovTextareaInput on input event', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea></aegov-textarea>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovTextareaInput', spy);
    const ta = page.root.querySelector('textarea');
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
    const ta = page.root.querySelector('textarea');
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
    const ta = page.root.querySelector('textarea');
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
    const counter = page.root.querySelector('.textarea__counter');
    expect(counter).not.toBeNull();
    expect(counter.textContent).toContain('2 / 10');
  });

  it('marks counter as over when exceeded', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea maxlength="2" value="abcde"></aegov-textarea>`,
    });
    const counter = page.root.querySelector('.textarea__counter');
    expect(counter.className).toContain('textarea__counter--over');
  });

  it('links aria-describedby to counter when maxlength is set', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea field-id="ta" maxlength="5"></aegov-textarea>`,
    });
    const ta = page.root.querySelector('textarea');
    expect(ta.getAttribute('aria-describedby')).toBe('ta-counter');
  });

  it('does not render copy button without is-readonly', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea is-copyable="true"></aegov-textarea>`,
    });
    expect(page.root.querySelector('.textarea__copy-btn')).toBeNull();
  });

  it('renders copy button when is-readonly and is-copyable', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea is-readonly="true" is-copyable="true" value="x"></aegov-textarea>`,
    });
    expect(page.root.querySelector('.textarea__copy-btn')).not.toBeNull();
  });

  it('forwards aria-* and data-* attributes', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea aria-label="msg" data-test="y"></aegov-textarea>`,
    });
    const ta = page.root.querySelector('textarea');
    expect(ta.getAttribute('aria-label')).toBe('msg');
    expect(ta.getAttribute('data-test')).toBe('y');
  });

  it('forwards declared pass-through attrs (rows, cols)', async () => {
    const page = await newSpecPage({
      components: [AegovTextarea],
      html: `<aegov-textarea rows="6" cols="40"></aegov-textarea>`,
    });
    const ta = page.root.querySelector('textarea');
    expect(ta.getAttribute('rows')).toBe('6');
    expect(ta.getAttribute('cols')).toBe('40');
  });
});
