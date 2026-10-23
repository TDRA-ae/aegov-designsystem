import { newSpecPage } from '@stencil/core/testing';
import { q } from '../../utils/test-helpers';
import { AegovRange } from './aegov-range';

describe('aegov-range', () => {
  it('renders single mode by default', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range></aegov-range>`,
    });
    const wrapper = q(page.root, '.aegov-range');
    expect(wrapper).not.toBeNull();
    const input = q(page.root, 'input.range__input');
    expect(input).not.toBeNull();
    expect(input.getAttribute('type')).toBe('range');
    // No low/high inputs in single mode
    expect(q(page.root, '.range__input--low')).toBeNull();
    expect(q(page.root, '.range__input--high')).toBeNull();
  });

  it('reflects min/max/step/value to the native input', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range min="10" max="200" step="5" value="40"></aegov-range>`,
    });
    const input = q(page.root, 'input.range__input') as HTMLInputElement;
    expect(input.getAttribute('min')).toBe('10');
    expect(input.getAttribute('max')).toBe('200');
    expect(input.getAttribute('step')).toBe('5');
    expect(input.getAttribute('value')).toBe('40');
  });

  it('dual-thumb mode renders two native inputs (low + high)', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range mode="range" value-low="20" value-high="80"></aegov-range>`,
    });
    const low = q(page.root, '.range__input--low');
    const high = q(page.root, '.range__input--high');
    expect(low).not.toBeNull();
    expect(high).not.toBeNull();
    expect(low.getAttribute('value')).toBe('20');
    expect(high.getAttribute('value')).toBe('80');
    // There should be no single-mode-only input
    expect(q(page.root, 'input.range__input:not(.range__input--low):not(.range__input--high)')).toBeNull();
  });

  it('orientation horizontal/vertical reflects on wrapper class and input', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range orientation="vertical"></aegov-range>`,
    });
    expect(q(page.root, '.aegov-range').className).toContain('range--vertical');
    const input = q(page.root, 'input.range__input');
    expect(input.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('display modes apply expected classes', async () => {
    const tooltip = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range display="tooltip"></aegov-range>`,
    });
    expect(q(tooltip.root, '.range__tooltip')).not.toBeNull();

    const full = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range display="full" min="0" max="50"></aegov-range>`,
    });
    expect(q(full.root, '.range__label-min').textContent).toBe('0');
    expect(q(full.root, '.range__label-max').textContent).toBe('50');
    expect(q(full.root, '.aegov-range').className).toContain('range--display-full');
  });

  it('auto-generates fieldId when not provided', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range></aegov-range>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-range-\d+$/);
    const input = q(page.root, 'input.range__input') as HTMLInputElement;
    expect(input.id).toBe(page.rootInstance.fieldId);
  });

  it('respects user-provided field-id on single input', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range field-id="rng-1"></aegov-range>`,
    });
    const input = q(page.root, 'input.range__input') as HTMLInputElement;
    expect(input.id).toBe('rng-1');
  });

  it('range mode field IDs use -low / -high suffixes', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range mode="range" field-id="rng-2"></aegov-range>`,
    });
    expect((q(page.root, '.range__input--low') as HTMLInputElement).id).toBe('rng-2-low');
    expect((q(page.root, '.range__input--high') as HTMLInputElement).id).toBe('rng-2-high');
  });

  it('renders the optional label text', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range label="Volume"></aegov-range>`,
    });
    const label = q(page.root, '.range__label-text');
    expect(label).not.toBeNull();
    expect(label.textContent).toBe('Volume');
  });

  it('is-disabled propagates to native input(s) and adds disabled class', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range is-disabled></aegov-range>`,
    });
    const input = q(page.root, 'input.range__input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(q(page.root, '.aegov-range').className).toContain('aegov-range--disabled');
  });

  it('is-required is reflected on the single native input', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range is-required></aegov-range>`,
    });
    const input = q(page.root, 'input.range__input') as HTMLInputElement;
    expect(input.required).toBe(true);
  });

  it('forwards passthrough attributes (title, tabindex, autofocus, form) to the single input', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range title="Volume" tabindex="2" form="f1"></aegov-range>`,
    });
    const input = q(page.root, 'input.range__input');
    expect(input.getAttribute('title')).toBe('Volume');
    expect(input.getAttribute('tabindex')).toBe('2');
    expect(input.getAttribute('form')).toBe('f1');
  });

  it('emits aegovRangeInput when single input value changes', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range min="0" max="100" step="1"></aegov-range>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovRangeInput', spy);
    const input = q(page.root, 'input.range__input') as HTMLInputElement;
    input.value = '60';
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toEqual({ value: 60 });
  });

  it('emits aegovRangeChange with low/high payload in range mode', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range mode="range" min="0" max="100" step="1" value-low="20" value-high="80"></aegov-range>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovRangeChange', spy);
    const lowInput = q(page.root, '.range__input--low') as HTMLInputElement;
    lowInput.value = '30';
    lowInput.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toEqual(expect.objectContaining({ valueLow: 30 }));
    expect(spy.mock.calls[0][0].detail.valueHigh).toBe(80);
  });

  it('extra-class is appended to the wrapper', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range extra-class="my-range"></aegov-range>`,
    });
    expect(q(page.root, '.aegov-range').className).toContain('my-range');
  });

  // Validation surface (Layer 1) — see validation-engine-addon.md §2.8
  describe('validation surface', () => {
    it('toggles aria-invalid + host class when isInvalid', async () => {
      const page = await newSpecPage({
        components: [AegovRange],
        html: `<aegov-range is-invalid="true"></aegov-range>`,
      });
      expect(q(page.root, 'input[type="range"]').getAttribute('aria-invalid')).toBe('true');
      expect(page.root.classList.contains('is-invalid')).toBe(true);
    });

    it('renders errorMessage in error region', async () => {
      const page = await newSpecPage({
        components: [AegovRange],
        html: `<aegov-range is-invalid="true" error-message="Out of bounds"></aegov-range>`,
      });
      expect(q(page.root, '.aegov-range__error').textContent).toBe('Out of bounds');
    });

    it('renders hint when not invalid', async () => {
      const page = await newSpecPage({
        components: [AegovRange],
        html: `<aegov-range hint="0–100"></aegov-range>`,
      });
      expect(q(page.root, '.aegov-range__hint').textContent).toBe('0–100');
    });

    it('hides hint when error shown', async () => {
      const page = await newSpecPage({
        components: [AegovRange],
        html: `<aegov-range hint="h" is-invalid="true" error-message="err"></aegov-range>`,
      });
      expect(q(page.root, '.aegov-range__error')).not.toBeNull();
      expect(q(page.root, '.aegov-range__hint')).toBeNull();
    });

    it('aria-describedby includes error id', async () => {
      const page = await newSpecPage({
        components: [AegovRange],
        html: `<aegov-range field-id="rg1" is-invalid="true" error-message="msg"></aegov-range>`,
      });
      expect(q(page.root, 'input[type="range"]').getAttribute('aria-describedby')).toContain('rg1-error');
    });

    it('validate() resolves valid for default value', async () => {
      const page = await newSpecPage({
        components: [AegovRange],
        html: `<aegov-range></aegov-range>`,
      });
      const r = await page.rootInstance.validate('manual');
      expect(r.valid).toBe(true);
    });

    it('setCustomValidity("msg") sets invalid + error', async () => {
      const page = await newSpecPage({
        components: [AegovRange],
        html: `<aegov-range></aegov-range>`,
      });
      await page.rootInstance.setCustomValidity('Bad value');
      await page.waitForChanges();
      expect(page.rootInstance.isInvalid).toBe(true);
      expect(page.rootInstance.errorMessage).toBe('Bad value');
    });

    it('setCustomValidity("") clears state', async () => {
      const page = await newSpecPage({
        components: [AegovRange],
        html: `<aegov-range is-invalid="true" error-message="x"></aegov-range>`,
      });
      await page.rootInstance.setCustomValidity('');
      await page.waitForChanges();
      expect(page.rootInstance.isInvalid).toBe(false);
      expect(page.rootInstance.errorMessage).toBe('');
    });
  });
});
