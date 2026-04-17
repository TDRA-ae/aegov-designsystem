import { newSpecPage } from '@stencil/core/testing';
import { AegovOtp } from './aegov-otp';

describe('aegov-otp', () => {
  // ============================================
  // RENDERING
  // ============================================

  it('renders with defaults', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp></aegov-otp>`,
    });
    expect(page.root).toBeTruthy();
    const wrapper = page.root.querySelector('.otp__wrapper');
    expect(wrapper).toBeTruthy();
  });

  it('renders 5 cells by default', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp></aegov-otp>`,
    });
    const cells = page.root.querySelectorAll('.otp__cell');
    expect(cells.length).toBe(5);
  });

  it('renders custom length', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp length="4"></aegov-otp>`,
    });
    const cells = page.root.querySelectorAll('.otp__cell');
    expect(cells.length).toBe(4);
  });

  it('renders 6-digit length', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp length="6"></aegov-otp>`,
    });
    const cells = page.root.querySelectorAll('.otp__cell');
    expect(cells.length).toBe(6);
  });

  it('auto-generates fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp></aegov-otp>`,
    });
    const firstCell = page.root.querySelector('.otp__cell');
    expect(firstCell.id).toContain('aegov-otp-');
  });

  it('uses custom fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp field-id="my-otp"></aegov-otp>`,
    });
    const firstCell = page.root.querySelector('.otp__cell');
    expect(firstCell.id).toBe('my-otp');
  });

  it('only first cell has id', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp field-id="my-otp"></aegov-otp>`,
    });
    const cells = page.root.querySelectorAll('.otp__cell');
    expect(cells[0].id).toBe('my-otp');
    expect(cells[1].id).toBe('');
    expect(cells[2].id).toBe('');
  });

  // ============================================
  // VARIANTS
  // ============================================

  it('renders continuous variant with dividers', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp variant="continuous"></aegov-otp>`,
    });
    const wrapper = page.root.querySelector('.otp__wrapper--continuous');
    expect(wrapper).toBeTruthy();
    const dividers = page.root.querySelectorAll('.otp__divider');
    expect(dividers.length).toBe(4); // 5 cells = 4 dividers
  });

  it('renders individual variant without dividers', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp variant="individual"></aegov-otp>`,
    });
    const wrapper = page.root.querySelector('.otp__wrapper--individual');
    expect(wrapper).toBeTruthy();
    const dividers = page.root.querySelectorAll('.otp__divider');
    expect(dividers.length).toBe(0);
  });

  it('defaults to continuous variant', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp></aegov-otp>`,
    });
    const wrapper = page.root.querySelector('.otp__wrapper--continuous');
    expect(wrapper).toBeTruthy();
  });

  it('continuous has correct divider count for length 3', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp length="3"></aegov-otp>`,
    });
    const dividers = page.root.querySelectorAll('.otp__divider');
    expect(dividers.length).toBe(2);
  });

  // ============================================
  // SIZES
  // ============================================

  it('applies default size class (base)', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp></aegov-otp>`,
    });
    const cell = page.root.querySelector('.otp__cell');
    expect(cell.classList.contains('otp__cell--base')).toBe(true);
  });

  it('applies xs size', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp size="xs"></aegov-otp>`,
    });
    const cell = page.root.querySelector('.otp__cell');
    expect(cell.classList.contains('otp__cell--xs')).toBe(true);
  });

  it('applies 2xl size', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp size="2xl"></aegov-otp>`,
    });
    const cell = page.root.querySelector('.otp__cell');
    expect(cell.classList.contains('otp__cell--2xl')).toBe(true);
  });

  // ============================================
  // INPUT MODE
  // ============================================

  it('sets numeric inputMode by default', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp></aegov-otp>`,
    });
    const cell = page.root.querySelector('.otp__cell');
    expect(cell.getAttribute('inputmode')).toBe('numeric');
  });

  it('sets text inputMode when alphanumeric', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp alphanumeric></aegov-otp>`,
    });
    const cell = page.root.querySelector('.otp__cell');
    expect(cell.getAttribute('inputmode')).toBe('text');
  });

  // ============================================
  // DISABLED
  // ============================================

  it('applies disabled to all cells', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp disabled></aegov-otp>`,
    });
    const cells = page.root.querySelectorAll('.otp__cell');
    cells.forEach(cell => {
      expect(cell.hasAttribute('disabled')).toBe(true);
    });
  });

  // ============================================
  // HIDDEN INPUT
  // ============================================

  it('renders hidden input', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp></aegov-otp>`,
    });
    const hidden = page.root.querySelector('input[type="hidden"]');
    expect(hidden).toBeTruthy();
  });

  it('hidden input has name attribute', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp name="otp-code"></aegov-otp>`,
    });
    const hidden = page.root.querySelector('input[type="hidden"]');
    expect(hidden.getAttribute('name')).toBe('otp-code');
  });

  // ============================================
  // CUSTOM CLASS
  // ============================================

  it('applies custom class', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp class="my-custom"></aegov-otp>`,
    });
    const wrapper = page.root.querySelector('.aegov-otp');
    expect(wrapper.classList.contains('my-custom')).toBe(true);
  });

  // ============================================
  // ACCESSIBILITY
  // ============================================

  it('cells have aria-label', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp length="4"></aegov-otp>`,
    });
    const cells = page.root.querySelectorAll('.otp__cell');
    expect(cells[0].getAttribute('aria-label')).toBe('Character 1 of 4');
    expect(cells[3].getAttribute('aria-label')).toBe('Character 4 of 4');
  });

  it('dividers have aria-hidden', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp></aegov-otp>`,
    });
    const dividers = page.root.querySelectorAll('.otp__divider');
    dividers.forEach(d => {
      expect(d.getAttribute('aria-hidden')).toBe('true');
    });
  });

  it('wrapper has role group', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp></aegov-otp>`,
    });
    const wrapper = page.root.querySelector('.otp__wrapper');
    expect(wrapper.getAttribute('role')).toBe('group');
  });

  it('first cell has autocomplete one-time-code', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp></aegov-otp>`,
    });
    const cells = page.root.querySelectorAll('.otp__cell');
    expect(cells[0].getAttribute('autocomplete')).toBe('one-time-code');
    expect(cells[1].getAttribute('autocomplete')).toBe('off');
  });

  // ============================================
  // PASS-THROUGH ATTRIBUTES
  // ============================================

  it('passes aria-label to wrapper', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp aria-label="Verification code"></aegov-otp>`,
    });
    const wrapper = page.root.querySelector('.otp__wrapper');
    expect(wrapper.getAttribute('aria-label')).toBe('Verification code');
  });

  it('passes data attributes to wrapper', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp data-testid="otp-field"></aegov-otp>`,
    });
    const wrapper = page.root.querySelector('.otp__wrapper');
    expect(wrapper.getAttribute('data-testid')).toBe('otp-field');
  });

  // ============================================
  // VALUE
  // ============================================

  it('distributes initial value to cells', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp value="12345"></aegov-otp>`,
    });
    const cells = page.root.querySelectorAll('.otp__cell') as NodeListOf<HTMLInputElement>;
    expect(cells[0].value).toBe('1');
    expect(cells[1].value).toBe('2');
    expect(cells[2].value).toBe('3');
    expect(cells[3].value).toBe('4');
    expect(cells[4].value).toBe('5');
  });

  it('distributes partial value', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp value="12"></aegov-otp>`,
    });
    const cells = page.root.querySelectorAll('.otp__cell') as NodeListOf<HTMLInputElement>;
    expect(cells[0].value).toBe('1');
    expect(cells[1].value).toBe('2');
    expect(cells[2].value).toBe('');
    expect(cells[3].value).toBe('');
    expect(cells[4].value).toBe('');
  });

  it('hidden input reflects initial value', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp value="12345"></aegov-otp>`,
    });
    const hidden = page.root.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hidden.value).toBe('12345');
  });

  // ============================================
  // ALL CELLS TYPE TEXT
  // ============================================

  it('all cells are type text', async () => {
    const page = await newSpecPage({
      components: [AegovOtp],
      html: `<aegov-otp></aegov-otp>`,
    });
    const cells = page.root.querySelectorAll('.otp__cell');
    cells.forEach(cell => {
      expect(cell.getAttribute('type')).toBe('text');
    });
  });

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
        components: [AegovOtp],
        html: `<aegov-otp size="huge"></aegov-otp>`,
      });
      const cell = page.root.querySelector('.otp__cell');
      expect(cell.className).toContain('otp__cell--base');
    });

    it('falls back to default variant (continuous) when variant is invalid', async () => {
      const page = await newSpecPage({
        components: [AegovOtp],
        html: `<aegov-otp variant="weird"></aegov-otp>`,
      });
      const wrapper = page.root.querySelector('.otp__wrapper');
      expect(wrapper.className).toContain('otp__wrapper--continuous');
    });

    it('warns for invalid size', async () => {
      await newSpecPage({
        components: [AegovOtp],
        html: `<aegov-otp size="huge"></aegov-otp>`,
      });
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const warn = messages.find(m => m.includes('"size"'));
      expect(warn).toBeDefined();
      expect(warn).toContain('[aegov-otp]');
      expect(warn).toContain('"huge"');
      expect(warn).toContain('base');
    });

    it('warns for invalid variant', async () => {
      await newSpecPage({
        components: [AegovOtp],
        html: `<aegov-otp variant="weird"></aegov-otp>`,
      });
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const warn = messages.find(m => m.includes('"variant"'));
      expect(warn).toBeDefined();
      expect(warn).toContain('[aegov-otp]');
      expect(warn).toContain('"weird"');
      expect(warn).toContain('continuous');
    });

    it('does not warn when all props are valid', async () => {
      await newSpecPage({
        components: [AegovOtp],
        html: `<aegov-otp size="lg" variant="individual"></aegov-otp>`,
      });
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('warns again via @Watch when variant is updated to an invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovOtp],
        html: `<aegov-otp variant="continuous"></aegov-otp>`,
      });
      expect(warnSpy).not.toHaveBeenCalled();

      page.root.setAttribute('variant', 'nope');
      await page.waitForChanges();

      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const invalidWarn = messages.find(m => m.includes('[aegov-otp]') && m.includes('"nope"'));
      expect(invalidWarn).toBeDefined();
      expect(invalidWarn).toContain('"variant"');
    });
  });
});
