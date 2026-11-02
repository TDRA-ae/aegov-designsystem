import { newSpecPage } from '@stencil/core/testing';
import { q, qa } from '../../utils/test-helpers';
import { AegovDatepicker } from './aegov-datepicker';

describe('aegov-datepicker', () => {
  it('renders the single-mode trigger by default', async () => {
    const page = await newSpecPage({
      components: [AegovDatepicker],
      html: `<aegov-datepicker></aegov-datepicker>`,
    });
    const trigger = q(page.root, '.datepicker__trigger');
    expect(trigger).not.toBeNull();
    const wrapper = q(page.root, '.datepicker__input-wrapper');
    expect(wrapper).not.toBeNull();
    expect(wrapper.className).not.toContain('datepicker__input-wrapper--range');
    const inputs = qa(page.root, 'input.datepicker__input');
    expect(inputs.length).toBe(1);
  });

  it('renders two inputs in range appearance', async () => {
    const page = await newSpecPage({
      components: [AegovDatepicker],
      html: `<aegov-datepicker appearance="range"></aegov-datepicker>`,
    });
    const wrapper = q(page.root, '.datepicker__input-wrapper');
    expect(wrapper.className).toContain('datepicker__input-wrapper--range');
    expect(q(page.root, '.datepicker__input--range-start')).not.toBeNull();
    expect(q(page.root, '.datepicker__input--range-end')).not.toBeNull();
  });

  it('uses placeholder for the single input', async () => {
    const page = await newSpecPage({
      components: [AegovDatepicker],
      html: `<aegov-datepicker placeholder="Pick a date"></aegov-datepicker>`,
    });
    const input = q(page.root, 'input.datepicker__input') as HTMLInputElement;
    expect(input.placeholder).toBe('Pick a date');
    expect(input.getAttribute('aria-label')).toBe('Pick a date');
  });

  it('uses labelRangeStart / labelRangeEnd as range placeholders', async () => {
    const page = await newSpecPage({
      components: [AegovDatepicker],
      html: `<aegov-datepicker appearance="range" label-range-start="From" label-range-end="To"></aegov-datepicker>`,
    });
    const start = q(page.root, '.datepicker__input--range-start') as HTMLInputElement;
    const end = q(page.root, '.datepicker__input--range-end') as HTMLInputElement;
    expect(start.placeholder).toBe('From');
    expect(end.placeholder).toBe('To');
  });

  it('input has aria-haspopup=dialog and reflects aria-expanded', async () => {
    const page = await newSpecPage({
      components: [AegovDatepicker],
      html: `<aegov-datepicker></aegov-datepicker>`,
    });
    const input = q(page.root, 'input.datepicker__input') as HTMLInputElement;
    expect(input.getAttribute('aria-haspopup')).toBe('dialog');
    expect(input.getAttribute('aria-expanded')).toBe('false');
  });

  it('input is readOnly so the OS keyboard does not show a typing affordance', async () => {
    const page = await newSpecPage({
      components: [AegovDatepicker],
      html: `<aegov-datepicker></aegov-datepicker>`,
    });
    const input = q(page.root, 'input.datepicker__input') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  it('renders pre-selected single value formatted via the format prop', async () => {
    const page = await newSpecPage({
      components: [AegovDatepicker],
      html: `<aegov-datepicker value="2024-06-15" format="YYYY-MM-DD"></aegov-datepicker>`,
    });
    const input = q(page.root, 'input.datepicker__input') as HTMLInputElement;
    expect(input.value).toBe('2024-06-15');
  });

  it('renders pre-selected range value across both inputs', async () => {
    const page = await newSpecPage({
      components: [AegovDatepicker],
      html: `<aegov-datepicker appearance="range" value="2024-01-01 / 2024-01-10" format="YYYY-MM-DD"></aegov-datepicker>`,
    });
    const start = q(page.root, '.datepicker__input--range-start') as HTMLInputElement;
    const end = q(page.root, '.datepicker__input--range-end') as HTMLInputElement;
    expect(start.value).toBe('2024-01-01');
    expect(end.value).toBe('2024-01-10');
  });

  it('shows the clear button when a value is set and is-clearable (default true)', async () => {
    const page = await newSpecPage({
      components: [AegovDatepicker],
      html: `<aegov-datepicker value="2024-06-15"></aegov-datepicker>`,
    });
    expect(q(page.root, '.datepicker__clear-btn')).not.toBeNull();
  });

  it('does not show clear button when no value is set', async () => {
    const page = await newSpecPage({
      components: [AegovDatepicker],
      html: `<aegov-datepicker></aegov-datepicker>`,
    });
    expect(q(page.root, '.datepicker__clear-btn')).toBeNull();
  });

  it('hides the clear button when is-clearable=false', async () => {
    const page = await newSpecPage({
      components: [AegovDatepicker],
      html: `<aegov-datepicker value="2024-06-15" is-clearable="false"></aegov-datepicker>`,
    });
    expect(q(page.root, '.datepicker__clear-btn')).toBeNull();
  });

  it('disables the input when is-disabled', async () => {
    const page = await newSpecPage({
      components: [AegovDatepicker],
      html: `<aegov-datepicker is-disabled></aegov-datepicker>`,
    });
    const input = q(page.root, 'input.datepicker__input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('reflects is-required onto the native input', async () => {
    const page = await newSpecPage({
      components: [AegovDatepicker],
      html: `<aegov-datepicker is-required></aegov-datepicker>`,
    });
    const input = q(page.root, 'input.datepicker__input') as HTMLInputElement;
    expect(input.required).toBe(true);
    expect(input.getAttribute('aria-required')).toBe('true');
  });

  it('forwards passthrough attributes (title, tabindex, autofocus, autocomplete, form)', async () => {
    const page = await newSpecPage({
      components: [AegovDatepicker],
      html: `<aegov-datepicker title="When?" tabindex="3" autocomplete="off" form="f1"></aegov-datepicker>`,
    });
    const input = q(page.root, 'input.datepicker__input');
    expect(input.getAttribute('title')).toBe('When?');
    expect(input.getAttribute('tabindex')).toBe('3');
    expect(input.getAttribute('autocomplete')).toBe('off');
    expect(input.getAttribute('form')).toBe('f1');
  });

  it('forwards aria/data attributes from host to the inner input', async () => {
    const page = await newSpecPage({
      components: [AegovDatepicker],
      html: `<aegov-datepicker aria-label="event date" data-test="dp"></aegov-datepicker>`,
    });
    const input = q(page.root, 'input.datepicker__input');
    // aria-label is also explicitly assigned but data-* should be forwarded
    expect(input.getAttribute('data-test')).toBe('dp');
  });

  it('renders the custom slotted trigger when a [slot=trigger] is provided', async () => {
    const page = await newSpecPage({
      components: [AegovDatepicker],
      html: `<aegov-datepicker><button slot="trigger">Pick</button></aegov-datepicker>`,
    });
    expect(page.rootInstance.hasTriggerSlot).toBe(true);
    // Default datepicker__input markup should NOT be rendered when slot is present
    expect(q(page.root, 'input.datepicker__input')).toBeNull();
  });

  it('open() / close() methods toggle isOpen', async () => {
    const page = await newSpecPage({
      components: [AegovDatepicker],
      html: `<aegov-datepicker></aegov-datepicker>`,
    });
    expect(page.rootInstance.isOpen).toBe(false);
    await page.rootInstance.open();
    expect(page.rootInstance.isOpen).toBe(true);
    await page.rootInstance.close();
    expect(page.rootInstance.isOpen).toBe(false);
  });

  it('open() does not open when is-disabled', async () => {
    const page = await newSpecPage({
      components: [AegovDatepicker],
      html: `<aegov-datepicker is-disabled></aegov-datepicker>`,
    });
    await page.rootInstance.open();
    expect(page.rootInstance.isOpen).toBe(false);
  });

  it('clear() clears value and emits clear + change', async () => {
    const page = await newSpecPage({
      components: [AegovDatepicker],
      html: `<aegov-datepicker value="2024-06-15"></aegov-datepicker>`,
    });
    const clearSpy = jest.fn();
    const changeSpy = jest.fn();
    page.root.addEventListener('aegovDatepickerClear', clearSpy);
    page.root.addEventListener('aegovDatepickerChange', changeSpy);

    await page.rootInstance.clear();
    await page.waitForChanges();

    expect(page.rootInstance.value).toBe('');
    expect(clearSpy).toHaveBeenCalled();
    expect(changeSpy).toHaveBeenCalled();
  });

  it('getValue() returns the current formatted value', async () => {
    const page = await newSpecPage({
      components: [AegovDatepicker],
      html: `<aegov-datepicker value="2024-06-15"></aegov-datepicker>`,
    });
    const v = await page.rootInstance.getValue();
    expect(v).toBe('2024-06-15');
  });

  it('getStartDate / getEndDate return false in single mode', async () => {
    const page = await newSpecPage({
      components: [AegovDatepicker],
      html: `<aegov-datepicker value="2024-06-15"></aegov-datepicker>`,
    });
    expect(await page.rootInstance.getStartDate()).toBe(false);
    expect(await page.rootInstance.getEndDate()).toBe(false);
  });

  it('getStartDate / getEndDate return formatted strings in range mode', async () => {
    const page = await newSpecPage({
      components: [AegovDatepicker],
      html: `<aegov-datepicker appearance="range" value="2024-01-01 / 2024-01-10"></aegov-datepicker>`,
    });
    expect(await page.rootInstance.getStartDate()).toBe('2024-01-01');
    expect(await page.rootInstance.getEndDate()).toBe('2024-01-10');
  });

  it('auto-generates an internal datepickerId', async () => {
    const page = await newSpecPage({
      components: [AegovDatepicker],
      html: `<aegov-datepicker></aegov-datepicker>`,
    });
    expect(page.rootInstance['datepickerId']).toMatch(/^aegov-datepicker-\d+$/);
  });

  // Validation surface (Layer 1) — see validation-engine-addon.md §2.8
  describe('validation surface', () => {
    it('toggles host is-invalid class', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker is-invalid="true"></aegov-datepicker>`,
      });
      expect(page.root.classList.contains('is-invalid')).toBe(true);
    });

    it('renders errorMessage in error region', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker is-invalid="true" error-message="Pick date"></aegov-datepicker>`,
      });
      expect(q(page.root, '.aegov-datepicker__error').textContent).toBe('Pick date');
    });

    it('renders hint when not invalid', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker hint="Future dates only"></aegov-datepicker>`,
      });
      expect(q(page.root, '.aegov-datepicker__hint').textContent).toBe('Future dates only');
    });

    it('hides hint when error shown', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker hint="h" is-invalid="true" error-message="err"></aegov-datepicker>`,
      });
      expect(q(page.root, '.aegov-datepicker__error')).not.toBeNull();
      expect(q(page.root, '.aegov-datepicker__hint')).toBeNull();
    });

    it('aria-describedby on trigger includes error id', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker field-id="dp1" is-invalid="true" error-message="msg"></aegov-datepicker>`,
      });
      expect(q(page.root, '.datepicker__trigger').getAttribute('aria-describedby')).toContain('dp1-error');
    });

    it('validate() resolves valid for empty optional datepicker', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker></aegov-datepicker>`,
      });
      const r = await page.rootInstance.validate('manual');
      expect(r.valid).toBe(true);
    });

    it('setCustomValidity("msg") sets invalid + error', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker></aegov-datepicker>`,
      });
      await page.rootInstance.setCustomValidity('Holiday blocked');
      await page.waitForChanges();
      expect(page.rootInstance.isInvalid).toBe(true);
      expect(page.rootInstance.errorMessage).toBe('Holiday blocked');
    });

    it('setCustomValidity("") clears state', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker is-invalid="true" error-message="x"></aegov-datepicker>`,
      });
      await page.rootInstance.setCustomValidity('');
      await page.waitForChanges();
      expect(page.rootInstance.isInvalid).toBe(false);
      expect(page.rootInstance.errorMessage).toBe('');
    });

    it('a value on a blackout date is invalid (customError) with a message', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker blackout="2026-09-03" value="2026-09-03"></aegov-datepicker>`,
      });
      const r = await page.rootInstance.validate('manual');
      expect(r.valid).toBe(false);
      expect(r.validity.customError).toBe(true);
      expect(r.message).toBe('2026-09-03 is not available. Choose another date');
    });

    it('re-validates against blackout when the value or the blackout list changes', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker blackout="2026-09-03" value="2026-09-01"></aegov-datepicker>`,
      });
      expect((await page.rootInstance.validate('manual')).valid).toBe(true);
      page.root.value = '2026-09-03';
      await page.waitForChanges();
      expect((await page.rootInstance.validate('manual')).valid).toBe(false);
      page.root.blackout = '2026-10-10';
      await page.waitForChanges();
      expect((await page.rootInstance.validate('manual')).valid).toBe(true);
    });

    it('a blacked-out range endpoint is invalid', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker appearance="range" blackout="2026-09-09" value="2026-09-05 / 2026-09-09"></aegov-datepicker>`,
      });
      expect((await page.rootInstance.validate('manual')).validity.customError).toBe(true);
    });

    it('a value set from code emits no aegovValidate or aegovDatepickerChange', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker value="2026-09-01"></aegov-datepicker>`,
      });
      const validateSpy = jest.fn();
      const changeSpy = jest.fn();
      page.root.addEventListener('aegovValidate', validateSpy);
      page.root.addEventListener('aegovDatepickerChange', changeSpy);
      page.root.value = '2026-09-12';
      await page.waitForChanges();
      expect(validateSpy).not.toHaveBeenCalled();
      expect(changeSpy).not.toHaveBeenCalled();
    });

    it('valueMissing fires when isRequired and empty', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker is-required></aegov-datepicker>`,
      });
      const r = await page.rootInstance.validate('manual');
      expect(r.valid).toBe(false);
      expect(r.validity.valueMissing).toBe(true);
    });
  });

  describe('UI language', () => {
    const placeholderOf = (page: { root?: HTMLElement }) => (q(page.root, 'input.datepicker__input') as HTMLInputElement).placeholder;

    it('follows an Arabic locale on an LTR page, including validation messages', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<div dir="ltr"><aegov-datepicker locale="ar-AE" is-required min="2026-01-10"></aegov-datepicker></div>`,
      });
      expect(placeholderOf(page)).toBe('اختر التاريخ');
      expect(q(page.root, '.datepicker__trigger').getAttribute('lang')).toBe('ar');
      expect((await page.rootInstance.validate('manual')).message).toBe('مطلوب');
      page.root.value = '2026-01-05';
      await page.waitForChanges();
      expect((await page.rootInstance.validate('manual')).message).toBe('اختر تاريخاً في 2026-01-10 أو بعده');
    });

    it('follows an English locale inside dir="rtl"', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<div dir="rtl"><aegov-datepicker locale="en-GB" appearance="range" is-required></aegov-datepicker></div>`,
      });
      expect((q(page.root, '.datepicker__input--range-start') as HTMLInputElement).placeholder).toBe('Start date');
      expect((await page.rootInstance.validate('manual')).message).toBe('Required');
    });

    it('follows the text direction when locale is not set', async () => {
      const rtl = await newSpecPage({
        components: [AegovDatepicker],
        html: `<div dir="rtl"><aegov-datepicker is-required></aegov-datepicker></div>`,
      });
      expect(placeholderOf(rtl)).toBe('اختر التاريخ');
      expect((await rtl.rootInstance.validate('manual')).message).toBe('مطلوب');
      const ltr = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker is-required></aegov-datepicker>`,
      });
      expect(placeholderOf(ltr)).toBe('Select date');
      expect((await ltr.rootInstance.validate('manual')).message).toBe('Required');
      expect(q(ltr.root, '.datepicker__trigger').hasAttribute('lang')).toBe(false);
    });

    it('follows the text direction for a locale other than Arabic or English, and formats dates in English when unset', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<div dir="rtl"><aegov-datepicker locale="fr" value="2026-03-05" format="D MMMM YYYY"></aegov-datepicker></div>`,
      });
      expect((q(page.root, 'input.datepicker__input') as HTMLInputElement).value).toBe('5 mars 2026');
      expect(q(page.root, 'input.datepicker__input').getAttribute('aria-label')).toMatch(/^تغيير التاريخ, /);
      page.root.locale = undefined;
      await page.waitForChanges();
      expect((q(page.root, 'input.datepicker__input') as HTMLInputElement).value).toBe('5 March 2026');
    });

    it('updates its text when locale changes at runtime', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker is-required></aegov-datepicker>`,
      });
      expect(placeholderOf(page)).toBe('Select date');
      page.root.locale = 'ar';
      await page.waitForChanges();
      expect(placeholderOf(page)).toBe('اختر التاريخ');
      expect((await page.rootInstance.validate('manual')).message).toBe('مطلوب');
      page.root.locale = 'en';
      await page.waitForChanges();
      expect(placeholderOf(page)).toBe('Select date');
    });
  });
});
