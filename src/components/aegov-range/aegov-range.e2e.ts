import { newE2EPage } from '@stencil/core/testing';

describe('aegov-range e2e', () => {
  // ── Rendering ──────────────────────────────────────────

  it('renders in the DOM', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range></aegov-range>');
    const el = await page.find('aegov-range');
    expect(el).not.toBeNull();
  });

  it('renders track and thumb', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range></aegov-range>');
    const track = await page.find('aegov-range .range__track');
    const thumb = await page.find('aegov-range .range__thumb');
    expect(track).not.toBeNull();
    expect(thumb).not.toBeNull();
  });

  it('renders two thumbs in range mode', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range mode="range"></aegov-range>');
    const thumbs = await page.findAll('aegov-range .range__thumb');
    expect(thumbs.length).toBe(2);
  });

  // ── Sizes ──────────────────────────────────────────────

  it('applies size sm class', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range size="sm"></aegov-range>');
    const el = await page.find('aegov-range .range--sm');
    expect(el).not.toBeNull();
  });

  it('applies size lg class', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range size="lg"></aegov-range>');
    const el = await page.find('aegov-range .range--lg');
    expect(el).not.toBeNull();
  });

  // ── Display modes ─────────────────────────────────────

  it('shows tooltip in display=tooltip', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range display="tooltip" value="42"></aegov-range>');
    const tooltip = await page.find('aegov-range .range__tooltip');
    expect(tooltip).not.toBeNull();
    expect(tooltip.textContent).toBe('42');
  });

  it('shows value inside thumb in display=thumb', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range display="thumb" value="88"></aegov-range>');
    const thumbVal = await page.find('aegov-range .range__thumb-value');
    expect(thumbVal).not.toBeNull();
    expect(thumbVal.textContent).toBe('88');
  });

  it('shows min/max labels in display=full', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range display="full" min="0" max="200"></aegov-range>');
    const minLabel = await page.find('aegov-range .range__label-min');
    const maxLabel = await page.find('aegov-range .range__label-max');
    expect(minLabel.textContent).toBe('0');
    expect(maxLabel.textContent).toBe('200');
  });

  // ── Vertical ──────────────────────────────────────────

  it('renders vertically', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range orientation="vertical"></aegov-range>');
    const el = await page.find('aegov-range .range--vertical');
    expect(el).not.toBeNull();
  });

  // ── Events ────────────────────────────────────────────

  it('emits aegovRangeChange on native input change', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range value="50"></aegov-range>');
    const el = await page.find('aegov-range');
    const spy = await el.spyOnEvent('aegovRangeChange');

    await page.$eval('aegov-range input[type="range"]', (input: HTMLInputElement) => {
      input.value = '70';
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.waitForChanges();

    expect(spy).toHaveReceivedEvent();
  });

  it('emits aegovRangeInput on native input event', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range value="50"></aegov-range>');
    const el = await page.find('aegov-range');
    const spy = await el.spyOnEvent('aegovRangeInput');

    await page.$eval('aegov-range input[type="range"]', (input: HTMLInputElement) => {
      input.value = '60';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await page.waitForChanges();

    expect(spy).toHaveReceivedEvent();
  });

  it('emits range events in dual mode', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range mode="range" value-low="20" value-high="80"></aegov-range>');
    const el = await page.find('aegov-range');
    const spy = await el.spyOnEvent('aegovRangeChange');

    await page.$eval('aegov-range .range__input--high', (input: HTMLInputElement) => {
      input.value = '90';
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.waitForChanges();

    expect(spy).toHaveReceivedEvent();
    expect(spy.firstEvent.detail.valueHigh).toBeDefined();
  });

  // ── Disabled ──────────────────────────────────────────

  it('applies disabled class and disables input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range disabled></aegov-range>');
    const disabledClass = await page.find('aegov-range .aegov-range--disabled');
    expect(disabledClass).not.toBeNull();

    const disabled = await page.$eval('aegov-range input', (el: HTMLInputElement) => el.disabled);
    expect(disabled).toBe(true);
  });

  it('does not emit events when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range disabled value="50"></aegov-range>');
    const el = await page.find('aegov-range');
    const spy = await el.spyOnEvent('aegovRangeChange');

    // Try clicking the track area
    const track = await page.find('aegov-range .range__track-wrapper');
    await track.click();
    await page.waitForChanges();

    expect(spy).not.toHaveReceivedEvent();
  });

  // ── Label ─────────────────────────────────────────────

  it('renders label text', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range label="Volume"></aegov-range>');
    const label = await page.find('aegov-range .range__label-text');
    expect(label.textContent).toBe('Volume');
  });

  // ── Accessibility ─────────────────────────────────────

  it('has correct aria attributes on native input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range min="0" max="100" value="50"></aegov-range>');

    const ariaMin = await page.$eval('aegov-range input', (el: Element) => el.getAttribute('aria-valuemin'));
    const ariaMax = await page.$eval('aegov-range input', (el: Element) => el.getAttribute('aria-valuemax'));
    const ariaNow = await page.$eval('aegov-range input', (el: Element) => el.getAttribute('aria-valuenow'));

    expect(ariaMin).toBe('0');
    expect(ariaMax).toBe('100');
    expect(ariaNow).toBe('50');
  });

  it('has aria-label on dual mode inputs', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range mode="range"></aegov-range>');

    const labelLow = await page.$eval('aegov-range .range__input--low', (el: Element) => el.getAttribute('aria-label'));
    const labelHigh = await page.$eval('aegov-range .range__input--high', (el: Element) => el.getAttribute('aria-label'));

    expect(labelLow).toBe('Range minimum');
    expect(labelHigh).toBe('Range maximum');
  });

  // ── Keyboard interaction ──────────────────────────────

  it('responds to keyboard arrow keys', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range value="50" step="1"></aegov-range>');
    const el = await page.find('aegov-range');
    const spy = await el.spyOnEvent('aegovRangeInput');

    // Focus the native input and press arrow right
    await page.focus('aegov-range input[type="range"]');
    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();

    expect(spy).toHaveReceivedEvent();
  });

  // ── Pass-through attributes ───────────────────────────

  it('passes through data attributes to native input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range data-testid="vol-slider"></aegov-range>');

    const attr = await page.$eval('aegov-range input', (el: Element) => el.getAttribute('data-testid'));
    expect(attr).toBe('vol-slider');
  });

  // ── Value update reflects in display ──────────────────

  it('updates tooltip value after native input change', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range display="tooltip" value="50"></aegov-range>');

    await page.$eval('aegov-range input[type="range"]', (input: HTMLInputElement) => {
      input.value = '75';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await page.waitForChanges();

    const tooltip = await page.find('aegov-range .range__tooltip');
    expect(tooltip.textContent).toBe('75');
  });
});
