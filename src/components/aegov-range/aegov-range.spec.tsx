import { newSpecPage } from '@stencil/core/testing';
import { AegovRange } from './aegov-range';

describe('aegov-range', () => {
  // ── Rendering ──────────────────────────────────────────

  it('renders with defaults', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range></aegov-range>`,
    });
    const el = page.root;
    expect(el).toBeTruthy();
    expect(el.querySelector('.aegov-range')).toBeTruthy();
    expect(el.querySelector('.range--base')).toBeTruthy();
    expect(el.querySelector('.range--horizontal')).toBeTruthy();
    expect(el.querySelector('input[type="range"]')).toBeTruthy();
  });

  it('renders a single thumb by default', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range></aegov-range>`,
    });
    const thumbs = page.root.querySelectorAll('.range__thumb');
    expect(thumbs.length).toBe(1);
    expect(page.root.querySelector('.range__thumb--single')).toBeTruthy();
  });

  it('renders two thumbs in range mode', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range mode="range"></aegov-range>`,
    });
    const thumbs = page.root.querySelectorAll('.range__thumb');
    expect(thumbs.length).toBe(2);
    expect(page.root.querySelector('.range__thumb--low')).toBeTruthy();
    expect(page.root.querySelector('.range__thumb--high')).toBeTruthy();
  });

  it('renders two native inputs in range mode', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range mode="range"></aegov-range>`,
    });
    const inputs = page.root.querySelectorAll('input[type="range"]');
    expect(inputs.length).toBe(2);
  });

  it('renders track and fill elements', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range></aegov-range>`,
    });
    expect(page.root.querySelector('.range__track')).toBeTruthy();
    expect(page.root.querySelector('.range__fill')).toBeTruthy();
  });

  // ── Auto ID ──────────────────────────────────────────

  it('auto-generates an ID', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range></aegov-range>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.id).toMatch(/^aegov-range-\d+$/);
  });

  it('uses provided field-id', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range field-id="my-range"></aegov-range>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.id).toBe('my-range');
  });

  it('appends -low and -high to field-id in range mode', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range field-id="price" mode="range"></aegov-range>`,
    });
    const inputs = page.root.querySelectorAll('input[type="range"]');
    expect(inputs[0].id).toBe('price-low');
    expect(inputs[1].id).toBe('price-high');
  });

  // ── Sizes ──────────────────────────────────────────────

  it('renders size sm', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range size="sm"></aegov-range>`,
    });
    expect(page.root.querySelector('.range--sm')).toBeTruthy();
  });

  it('renders size base by default', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range></aegov-range>`,
    });
    expect(page.root.querySelector('.range--base')).toBeTruthy();
  });

  it('renders size lg', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range size="lg"></aegov-range>`,
    });
    expect(page.root.querySelector('.range--lg')).toBeTruthy();
  });

  // ── Props ──────────────────────────────────────────────

  it('sets min/max/step on native input', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range min="10" max="200" step="5"></aegov-range>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.min).toBe('10');
    expect(input.max).toBe('200');
    expect(input.step).toBe('5');
  });

  it('sets value on native input', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range value="75"></aegov-range>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('75');
  });

  it('sets name attribute on input', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range name="volume"></aegov-range>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.name).toBe('volume');
  });

  it('sets name-low and name-high in range mode', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range name="price" mode="range"></aegov-range>`,
    });
    const inputs = page.root.querySelectorAll('input[type="range"]') as NodeListOf<HTMLInputElement>;
    expect(inputs[0].name).toBe('price-low');
    expect(inputs[1].name).toBe('price-high');
  });

  it('sets disabled attribute on input', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range disabled></aegov-range>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(page.root.querySelector('.aegov-range--disabled')).toBeTruthy();
  });

  it('sets required attribute on input', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range required></aegov-range>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.required).toBe(true);
  });

  // ── Orientation ────────────────────────────────────────

  it('renders horizontal by default', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range></aegov-range>`,
    });
    expect(page.root.querySelector('.range--horizontal')).toBeTruthy();
  });

  it('renders vertical orientation', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range orientation="vertical"></aegov-range>`,
    });
    expect(page.root.querySelector('.range--vertical')).toBeTruthy();
  });

  it('sets aria-orientation on native input', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range orientation="vertical"></aegov-range>`,
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('aria-orientation')).toBe('vertical');
  });

  // ── Display modes ─────────────────────────────────────

  it('renders no decorations in display=none (default)', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range></aegov-range>`,
    });
    expect(page.root.querySelector('.range__tooltip')).toBeNull();
    expect(page.root.querySelector('.range__thumb-value')).toBeNull();
    expect(page.root.querySelector('.range__label-min')).toBeNull();
    expect(page.root.querySelector('.range__label-max')).toBeNull();
  });

  it('renders tooltip in display=tooltip', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range display="tooltip"></aegov-range>`,
    });
    expect(page.root.querySelector('.range__tooltip')).toBeTruthy();
    expect(page.root.querySelector('.range__thumb-value')).toBeNull();
  });

  it('renders thumb value in display=thumb', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range display="thumb"></aegov-range>`,
    });
    expect(page.root.querySelector('.range__thumb-value')).toBeTruthy();
    expect(page.root.querySelector('.range__thumb--display-thumb')).toBeTruthy();
    expect(page.root.querySelector('.range__label-min')).toBeNull();
  });

  it('renders thumb value + min/max labels in display=full', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range display="full" min="0" max="100"></aegov-range>`,
    });
    expect(page.root.querySelector('.range__thumb-value')).toBeTruthy();
    expect(page.root.querySelector('.range__label-min')).toBeTruthy();
    expect(page.root.querySelector('.range__label-max')).toBeTruthy();
    expect(page.root.querySelector('.range__label-min').textContent).toBe('0');
    expect(page.root.querySelector('.range__label-max').textContent).toBe('100');
  });

  it('shows correct value in tooltip', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range display="tooltip" value="42"></aegov-range>`,
    });
    const tooltip = page.root.querySelector('.range__tooltip');
    expect(tooltip.textContent).toBe('42');
  });

  it('shows correct value inside thumb', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range display="thumb" value="88"></aegov-range>`,
    });
    const thumbVal = page.root.querySelector('.range__thumb-value');
    expect(thumbVal.textContent).toBe('88');
  });

  it('shows two thumb values in range mode with display=thumb', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range mode="range" display="thumb" value-low="20" value-high="80"></aegov-range>`,
    });
    const thumbVals = page.root.querySelectorAll('.range__thumb-value');
    expect(thumbVals.length).toBe(2);
    expect(thumbVals[0].textContent).toBe('20');
    expect(thumbVals[1].textContent).toBe('80');
  });

  // ── Label ─────────────────────────────────────────────

  it('renders without label wrapper when no label', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range></aegov-range>`,
    });
    expect(page.root.querySelector('.range__wrapper')).toBeNull();
  });

  it('renders label when provided', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range label="Volume"></aegov-range>`,
    });
    const label = page.root.querySelector('.range__label-text');
    expect(label).toBeTruthy();
    expect(label.textContent).toBe('Volume');
    expect(page.root.querySelector('.range__wrapper')).toBeTruthy();
  });

  // ── Events ─────────────────────────────────────────────

  it('emits aegovRangeInput on native input event (single)', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range value="50"></aegov-range>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovRangeInput', spy);

    const input = page.root.querySelector('input') as HTMLInputElement;
    input.value = '60';
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.value).toBeDefined();
  });

  it('emits aegovRangeChange on native change event (single)', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range value="50"></aegov-range>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovRangeChange', spy);

    const input = page.root.querySelector('input') as HTMLInputElement;
    input.value = '70';
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.value).toBeDefined();
  });

  it('emits aegovRangeInput with valueLow/valueHigh in range mode', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range mode="range" value-low="20" value-high="80"></aegov-range>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovRangeInput', spy);

    const inputs = page.root.querySelectorAll('input[type="range"]');
    const lowInput = inputs[0] as HTMLInputElement;
    lowInput.value = '30';
    lowInput.dispatchEvent(new Event('input'));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.valueLow).toBeDefined();
    expect(spy.mock.calls[0][0].detail.valueHigh).toBeDefined();
  });

  // ── Accessibility ─────────────────────────────────────

  it('sets aria-valuemin, aria-valuemax, aria-valuenow on native input', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range min="10" max="90" value="50"></aegov-range>`,
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('aria-valuemin')).toBe('10');
    expect(input.getAttribute('aria-valuemax')).toBe('90');
    expect(input.getAttribute('aria-valuenow')).toBe('50');
  });

  it('sets aria-orientation on native input', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range orientation="horizontal"></aegov-range>`,
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('sets aria-label on dual mode inputs', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range mode="range"></aegov-range>`,
    });
    const inputs = page.root.querySelectorAll('input[type="range"]');
    expect(inputs[0].getAttribute('aria-label')).toBe('Range minimum');
    expect(inputs[1].getAttribute('aria-label')).toBe('Range maximum');
  });

  it('sets correct aria bounds on dual mode inputs', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range mode="range" min="0" max="100" value-low="25" value-high="75"></aegov-range>`,
    });
    const inputs = page.root.querySelectorAll('input[type="range"]');
    // Low input: min=0, max=valueHigh
    expect(inputs[0].getAttribute('aria-valuemin')).toBe('0');
    expect(inputs[0].getAttribute('aria-valuemax')).toBe('75');
    expect(inputs[0].getAttribute('aria-valuenow')).toBe('25');
    // High input: min=valueLow, max=100
    expect(inputs[1].getAttribute('aria-valuemin')).toBe('25');
    expect(inputs[1].getAttribute('aria-valuemax')).toBe('100');
    expect(inputs[1].getAttribute('aria-valuenow')).toBe('75');
  });

  // ── Pass-through attributes ───────────────────────────

  it('passes through data attributes', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range data-testid="my-range"></aegov-range>`,
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('data-testid')).toBe('my-range');
  });

  it('passes through aria-label', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range aria-label="Volume control"></aegov-range>`,
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('aria-label')).toBe('Volume control');
  });

  it('passes through tabindex', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range tabindex="-1"></aegov-range>`,
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('tabindex')).toBe('-1');
  });

  // ── Value calculation ─────────────────────────────────

  it('calculates fill percentage correctly', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range min="0" max="100" value="50"></aegov-range>`,
    });
    const container = page.root.querySelector('.range__container') as HTMLElement;
    expect(container.style.getPropertyValue('--range-fill-end')).toBe('50%');
  });

  it('calculates fill percentage with custom min/max', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range min="200" max="400" value="300"></aegov-range>`,
    });
    const container = page.root.querySelector('.range__container') as HTMLElement;
    expect(container.style.getPropertyValue('--range-fill-end')).toBe('50%');
  });

  it('calculates dual fill percentages correctly', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range mode="range" min="0" max="100" value-low="25" value-high="75"></aegov-range>`,
    });
    const container = page.root.querySelector('.range__container') as HTMLElement;
    expect(container.style.getPropertyValue('--range-fill-start')).toBe('25%');
    expect(container.style.getPropertyValue('--range-fill-end')).toBe('75%');
  });

  // ── CSS custom property classes ───────────────────────

  it('adds display class for thumb mode', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range display="thumb"></aegov-range>`,
    });
    expect(page.root.querySelector('.range--display-thumb')).toBeTruthy();
  });

  it('adds display class for full mode', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range display="full"></aegov-range>`,
    });
    expect(page.root.querySelector('.range--display-full')).toBeTruthy();
  });

  it('does not add display class for none or tooltip', async () => {
    const page = await newSpecPage({
      components: [AegovRange],
      html: `<aegov-range display="tooltip"></aegov-range>`,
    });
    expect(page.root.querySelector('.range--display-tooltip')).toBeNull();
  });
});
