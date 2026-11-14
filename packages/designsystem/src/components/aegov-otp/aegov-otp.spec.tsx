import { newSpecPage } from '@stencil/core/testing';
import { q, qa } from '../../utils/test-helpers';
import { AegovOtp } from './aegov-otp';

describe('aegov-otp', () => {
  it('renders with default props (5 cells, continuous)', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp></aegov-otp>`,
    });
    const wrapper = q(page.root, '.aegov-otp');
    expect(wrapper).not.toBeNull();
    const otpWrap = q(page.root, '.otp__wrapper');
    expect(otpWrap.className).toContain('otp__wrapper--continuous');
    const cells = qa(page.root, '.otp__cell');
    expect(cells.length).toBe(5);
  });

  it('renders specified number of cells (length=6)', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp length="6"></aegov-otp>`,
    });
    expect(qa(page.root, '.otp__cell').length).toBe(6);
  });

  it('individual appearance has no dividers', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp appearance="individual" length="4"></aegov-otp>`,
    });
    expect(q(page.root, '.otp__wrapper').className).toContain('otp__wrapper--individual');
    expect(qa(page.root, '.otp__divider').length).toBe(0);
  });

  it('continuous appearance adds dividers between cells', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp appearance="continuous" length="4"></aegov-otp>`,
    });
    const dividers = qa(page.root, '.otp__divider');
    expect(dividers.length).toBe(3); // n-1 dividers
  });

  it('auto-generates fieldId on first cell when none provided', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp></aegov-otp>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-otp-\d+$/);
    const firstCell = q(page.root, '.otp__cell') as HTMLInputElement;
    expect(firstCell.id).toBe(page.rootInstance.fieldId);
  });

  it('respects user-provided field-id', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp field-id="otp-1"></aegov-otp>`,
    });
    expect(page.rootInstance.fieldId).toBe('otp-1');
    const firstCell = q(page.root, '.otp__cell') as HTMLInputElement;
    expect(firstCell.id).toBe('otp-1');
  });

  it('first cell has autocomplete=one-time-code', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp></aegov-otp>`,
    });
    const cells = qa(page.root, '.otp__cell');
    expect(cells[0].getAttribute('autocomplete')).toBe('one-time-code');
    expect(cells[1].getAttribute('autocomplete')).toBe('off');
  });

  it('inputMode is numeric by default; text when alphanumeric', async () => {
    const page1 = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp></aegov-otp>`,
    });
    expect(q(page1.root, '.otp__cell').getAttribute('inputmode')).toBe('numeric');

    const page2 = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp is-alphanumeric></aegov-otp>`,
    });
    expect(q(page2.root, '.otp__cell').getAttribute('inputmode')).toBe('text');
  });

  it('disables all cells when is-disabled', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp is-disabled></aegov-otp>`,
    });
    const cells = qa(page.root, '.otp__cell') as HTMLInputElement[];
    cells.forEach((c) => expect(c.disabled).toBe(true));
  });

  it('aria-label per cell announces position', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp length="4"></aegov-otp>`,
    });
    const cells = qa(page.root, '.otp__cell');
    expect(cells[0].getAttribute('aria-label')).toBe('Character 1 of 4');
    expect(cells[3].getAttribute('aria-label')).toBe('Character 4 of 4');
  });

  it('initial value distributes across cells on load', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp length="4" value="1234"></aegov-otp>`,
    });
    const cells = qa(page.root, '.otp__cell') as HTMLInputElement[];
    expect(cells[0].value).toBe('1');
    expect(cells[1].value).toBe('2');
    expect(cells[2].value).toBe('3');
    expect(cells[3].value).toBe('4');
  });

  it('keeps name + value on host for FormAssociated submission (replaces hidden input)', async () => {
    // Per validation-engine-addon.md §2.4: aegov-otp upgraded to formAssociated: true.
    // ElementInternals.setFormValue() handles submission in browser; jsdom mock has no
    // ElementInternals so we just assert the props are tracked on the component.
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp name="otp-code" value="12"></aegov-otp>`,
    });
    expect(page.rootInstance.name).toBe('otp-code');
    expect(page.rootInstance.value).toBe('12');
    expect(q(page.root, 'input[type="hidden"]')).toBeNull();
  });

  it('forwards aria/data attributes to the otp__wrapper group', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp aria-label="security code" data-test="otp"></aegov-otp>`,
    });
    const grp = q(page.root, '.otp__wrapper');
    expect(grp.getAttribute('aria-label')).toBe('security code');
    expect(grp.getAttribute('data-test')).toBe('otp');
    expect(grp.getAttribute('role')).toBe('group');
  });

  it('extra-class is appended to wrapper', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp extra-class="my-extra"></aegov-otp>`,
    });
    const wrapper = q(page.root, '.aegov-otp');
    expect(wrapper.className).toContain('my-extra');
  });

  it('clear() method empties cells and emits change with empty value', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp length="4" value="1234"></aegov-otp>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovOtpChange', spy);

    await page.rootInstance.clear();
    await page.waitForChanges();

    expect(page.rootInstance.value).toBe('');
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[spy.mock.calls.length - 1][0].detail).toEqual({ value: '' });
  });

  // Validation surface (Layer 1) — see validation-engine-addon.md §2.8
  describe('validation surface', () => {
    it('toggles host is-invalid class', async () => {
      const page = await newSpecPage({
        components: [AegovOtp],
        html: `<aegov-otp length="4" is-invalid="true"></aegov-otp>`,
      });
      expect(page.root.classList.contains('is-invalid')).toBe(true);
    });

    it('renders errorMessage in error region', async () => {
      const page = await newSpecPage({
        components: [AegovOtp],
        html: `<aegov-otp length="4" is-invalid="true" error-message="Bad code"></aegov-otp>`,
      });
      expect(q(page.root, '.aegov-otp__error').textContent).toBe('Bad code');
    });

    it('renders hint when not invalid', async () => {
      const page = await newSpecPage({
        components: [AegovOtp],
        html: `<aegov-otp length="4" hint="6 digits"></aegov-otp>`,
      });
      expect(q(page.root, '.aegov-otp__hint').textContent).toBe('6 digits');
    });

    it('keeps the hint visible alongside the error (DS-A11Y-input-08)', async () => {
      const page = await newSpecPage({
        components: [AegovOtp],
        html: `<aegov-otp length="4" hint="h" is-invalid="true" error-message="err"></aegov-otp>`,
      });
      expect(q(page.root, '.aegov-otp__error')).not.toBeNull();
      expect(q(page.root, '.aegov-otp__hint')).not.toBeNull();
    });

    it('aria-describedby on the first cell includes error id', async () => {
      const page = await newSpecPage({
        components: [AegovOtp],
        html: `<aegov-otp field-id="o1" length="4" is-invalid="true" error-message="msg"></aegov-otp>`,
      });
      // aria-describedby is attached to the first cell only — repeating it on every cell
      // would make the hint and error be read once per cell.
      const firstCell = q(page.root, 'input');
      expect(firstCell.getAttribute('aria-describedby')).toContain('o1-error');
    });

    it('validate() resolves valid for empty optional otp', async () => {
      const page = await newSpecPage({
        components: [AegovOtp],
        html: `<aegov-otp length="4"></aegov-otp>`,
      });
      const r = await page.rootInstance.validate('manual');
      expect(r.valid).toBe(true);
    });

    it('setCustomValidity("msg") sets invalid + error', async () => {
      const page = await newSpecPage({
        components: [AegovOtp],
        html: `<aegov-otp length="4"></aegov-otp>`,
      });
      await page.rootInstance.setCustomValidity('Expired');
      await page.waitForChanges();
      expect(page.rootInstance.isInvalid).toBe(true);
      expect(page.rootInstance.errorMessage).toBe('Expired');
    });

    it('setCustomValidity("") clears state', async () => {
      const page = await newSpecPage({
        components: [AegovOtp],
        html: `<aegov-otp length="4" is-invalid="true" error-message="x"></aegov-otp>`,
      });
      await page.rootInstance.setCustomValidity('');
      await page.waitForChanges();
      expect(page.rootInstance.isInvalid).toBe(false);
      expect(page.rootInstance.errorMessage).toBe('');
    });
  });
});
