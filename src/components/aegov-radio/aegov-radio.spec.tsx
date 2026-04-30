import { newSpecPage } from '@stencil/core/testing';
import { AegovRadio } from './aegov-radio';

describe('aegov-radio', () => {
  it('renders a basic radio', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio></aegov-radio>',
    });
    const input = page.root.querySelector('input[type="radio"]');
    expect(input).toBeTruthy();
  });

  it('auto-generates a fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio></aegov-radio>',
    });
    const input = page.root.querySelector('input');
    expect(input.id).toMatch(/^aegov-radio-\d+$/);
  });

  it('uses provided fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio field-id="my-radio"></aegov-radio>',
    });
    const input = page.root.querySelector('input');
    expect(input.id).toBe('my-radio');
  });

  it('renders with label', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio label="Option A"></aegov-radio>',
    });
    const label = page.root.querySelector('label.radio__wrapper');
    expect(label).toBeTruthy();
    const labelText = page.root.querySelector('.radio__label-text');
    expect(labelText.textContent).toBe('Option A');
  });

  it('renders with label and description', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio label="Option A" description="Details about A"></aegov-radio>',
    });
    const desc = page.root.querySelector('.radio__description');
    expect(desc).toBeTruthy();
    expect(desc.textContent).toBe('Details about A');
  });

  it('does not render description without label', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio description="Some desc"></aegov-radio>',
    });
    const desc = page.root.querySelector('.radio__description');
    expect(desc).toBeNull();
    const label = page.root.querySelector('label');
    expect(label).toBeNull();
  });

  it('renders without label wrapper when no label prop', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio></aegov-radio>',
    });
    const wrapper = page.root.querySelector('label.radio__wrapper');
    expect(wrapper).toBeNull();
  });

  it('sets name attribute', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio name="color"></aegov-radio>',
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('name')).toBe('color');
  });

  it('sets value attribute', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio value="red"></aegov-radio>',
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('value')).toBe('red');
  });

  it('reflects checked state', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio checked></aegov-radio>',
    });
    const input = page.root.querySelector('input');
    expect(input.checked).toBe(true);
  });

  it('applies disabled state', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio disabled></aegov-radio>',
    });
    const input = page.root.querySelector('input');
    expect(input.disabled).toBe(true);
  });

  it('applies required attribute', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio required></aegov-radio>',
    });
    const input = page.root.querySelector('input');
    expect(input.required).toBe(true);
  });

  it('sets aria-required when required', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio required></aegov-radio>',
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('aria-required')).toBe('true');
  });

  it('does not set aria-required when not required', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio></aegov-radio>',
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('aria-required')).toBeNull();
  });

  it('sets aria-describedby when description is provided', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio label="Opt" description="Help text" field-id="r1"></aegov-radio>',
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('aria-describedby')).toBe('r1-desc');
    const desc = page.root.querySelector('.radio__description');
    expect(desc.id).toBe('r1-desc');
  });

  it('does not set aria-describedby without description', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio label="Opt"></aegov-radio>',
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('aria-describedby')).toBeNull();
  });

  it('applies custom classes', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio extra-class="mt-4"></aegov-radio>',
    });
    const wrapper = page.root.querySelector('.aegov-radio');
    expect(wrapper.classList.contains('mt-4')).toBe(true);
  });

  it('applies size class', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio size="lg"></aegov-radio>',
    });
    const wrapper = page.root.querySelector('.aegov-radio');
    expect(wrapper.classList.contains('radio--lg')).toBe(true);
  });

  it('passes through data attributes', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio data-testid="radio-1"></aegov-radio>',
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('data-testid')).toBe('radio-1');
  });

  it('passes through aria attributes', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio aria-label="Choose option"></aegov-radio>',
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('aria-label')).toBe('Choose option');
  });

  it('passes through form attribute', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio form="myform"></aegov-radio>',
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('form')).toBe('myform');
  });

  it('emits aegovRadioChange on change', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio value="opt1"></aegov-radio>',
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovRadioChange', spy);
    const input = page.root.querySelector('input');
    input.checked = true;
    input.dispatchEvent(new Event('change'));
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toEqual({ checked: true, value: 'opt1' });
  });

  it('has aegov-radio wrapper class', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio></aegov-radio>',
    });
    const wrapper = page.root.querySelector('.aegov-radio');
    expect(wrapper).toBeTruthy();
  });

  it('defaults to base size', async () => {
    const page = await newSpecPage({
      components: [AegovRadio],
      html: '<aegov-radio></aegov-radio>',
    });
    const wrapper = page.root.querySelector('.aegov-radio');
    expect(wrapper.classList.contains('radio--base')).toBe(true);
  });

  // ── Invalid prop values ────────────────────────────────

  describe('invalid prop values', () => {
    let warnSpy: jest.SpyInstance;

    beforeEach(() => {
      warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    });

    afterEach(() => {
      warnSpy.mockRestore();
    });

    it('falls back to default size class when size is invalid', async () => {
      const page = await newSpecPage({
        components: [AegovRadio],
        html: `<aegov-radio size="huge"></aegov-radio>`,
      });
      expect(page.root.querySelector('.radio--base')).toBeTruthy();
    });

    it('warns with component name, prop name, invalid value, and fallback', async () => {
      await newSpecPage({
        components: [AegovRadio],
        html: `<aegov-radio size="huge"></aegov-radio>`,
      });
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const sizeWarn = messages.find(m => m.includes('[aegov-radio]') && m.includes('"huge"'));
      expect(sizeWarn).toBeDefined();
      expect(sizeWarn).toContain('"size"');
    });

    it('does not warn when all props are valid', async () => {
      await newSpecPage({
        components: [AegovRadio],
        html: `<aegov-radio size="lg"></aegov-radio>`,
      });
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('warns again via @Watch when size is updated to an invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovRadio],
        html: `<aegov-radio size="base"></aegov-radio>`,
      });
      expect(warnSpy).not.toHaveBeenCalled();

      page.root.setAttribute('size', 'nope');
      await page.waitForChanges();

      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const invalidWarn = messages.find(m => m.includes('[aegov-radio]') && m.includes('"nope"'));
      expect(invalidWarn).toBeDefined();
      expect(invalidWarn).toContain('"size"');
    });
  });
});
