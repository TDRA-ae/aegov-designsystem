import { newSpecPage } from '@stencil/core/testing';
import { AegovProgress } from './aegov-progress';

describe('aegov-progress', () => {
  // ============================================
  // RENDERING
  // ============================================

  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="50"></aegov-progress>`,
    });
    expect(page.root).toBeTruthy();
    const track = page.root.querySelector('.progress__track');
    expect(track).toBeTruthy();
  });

  it('renders native progress element', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="50"></aegov-progress>`,
    });
    const native = page.root.querySelector('progress');
    expect(native).toBeTruthy();
    expect(native.getAttribute('value')).toBe('50');
    expect(native.getAttribute('max')).toBe('100');
  });

  it('auto-generates fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="50"></aegov-progress>`,
    });
    const native = page.root.querySelector('progress');
    expect(native.id).toContain('aegov-progress-');
  });

  it('uses custom fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress field-id="my-progress" value="50"></aegov-progress>`,
    });
    const native = page.root.querySelector('progress');
    expect(native.id).toBe('my-progress');
  });

  // ============================================
  // VALUE & MAX
  // ============================================

  it('renders fill at correct percentage', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="25" max="100"></aegov-progress>`,
    });
    const fill = page.root.querySelector('.progress__fill') as HTMLElement;
    expect(fill).toBeTruthy();
    expect(fill.style.width).toBe('25%');
  });

  it('renders fill at 100% when value equals max', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="100" max="100"></aegov-progress>`,
    });
    const fill = page.root.querySelector('.progress__fill') as HTMLElement;
    expect(fill.style.width).toBe('100%');
  });

  it('renders fill at 0% when value is 0', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="0" max="100"></aegov-progress>`,
    });
    const fill = page.root.querySelector('.progress__fill') as HTMLElement;
    expect(fill.style.width).toBe('0%');
  });

  it('clamps fill to 100% when value exceeds max', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="150" max="100"></aegov-progress>`,
    });
    const fill = page.root.querySelector('.progress__fill') as HTMLElement;
    expect(fill.style.width).toBe('100%');
  });

  it('handles custom max value', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="5" max="10"></aegov-progress>`,
    });
    const fill = page.root.querySelector('.progress__fill') as HTMLElement;
    expect(fill.style.width).toBe('50%');
    const native = page.root.querySelector('progress');
    expect(native.getAttribute('max')).toBe('10');
  });

  // ============================================
  // INDETERMINATE STATE
  // ============================================

  it('shows indeterminate state when no value is set', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress></aegov-progress>`,
    });
    const track = page.root.querySelector('.progress__track');
    expect(track.classList.contains('progress__track--indeterminate')).toBe(true);
    const fill = page.root.querySelector('.progress__fill');
    expect(fill).toBeNull();
  });

  it('does not show indeterminate when value is 0', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="0"></aegov-progress>`,
    });
    const track = page.root.querySelector('.progress__track');
    expect(track.classList.contains('progress__track--indeterminate')).toBe(false);
    const fill = page.root.querySelector('.progress__fill');
    expect(fill).toBeTruthy();
  });

  it('native progress has no value attribute when indeterminate', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress></aegov-progress>`,
    });
    const native = page.root.querySelector('progress');
    expect(native.hasAttribute('value')).toBe(false);
  });

  // ============================================
  // HEIGHT
  // ============================================

  it('applies default height (h-2 = 0.5rem)', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="50"></aegov-progress>`,
    });
    const track = page.root.querySelector('.progress__track') as HTMLElement;
    expect(track.style.height).toBe('0.5rem');
  });

  it('applies custom height', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="50" height="4"></aegov-progress>`,
    });
    const track = page.root.querySelector('.progress__track') as HTMLElement;
    expect(track.style.height).toBe('1rem');
  });

  it('applies decimal height', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="50" height="1.5"></aegov-progress>`,
    });
    const track = page.root.querySelector('.progress__track') as HTMLElement;
    expect(track.style.height).toBe('0.375rem');
  });

  it('applies large height', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="50" height="8"></aegov-progress>`,
    });
    const track = page.root.querySelector('.progress__track') as HTMLElement;
    expect(track.style.height).toBe('2rem');
  });

  // ============================================
  // COUNTER — TOP
  // ============================================

  it('does not show counter by default', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="50"></aegov-progress>`,
    });
    expect(page.root.querySelector('.progress__counter')).toBeNull();
  });

  it('shows top counter', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="50" counter="top"></aegov-progress>`,
    });
    const counter = page.root.querySelector('.progress__counter--top');
    expect(counter).toBeTruthy();
    expect(counter.textContent).toBe('50');
  });

  it('shows top counter with suffix', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="50" counter="top" counter-suffix="%"></aegov-progress>`,
    });
    const counter = page.root.querySelector('.progress__counter--top');
    expect(counter.textContent).toBe('50%');
  });

  // ============================================
  // COUNTER — TRAILING
  // ============================================

  it('shows trailing counter', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="75" counter="trailing"></aegov-progress>`,
    });
    const counter = page.root.querySelector('.progress__counter--trailing');
    expect(counter).toBeTruthy();
    expect(counter.textContent).toBe('75');
  });

  it('shows trailing counter with suffix', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="75" counter="trailing" counter-suffix=" MB"></aegov-progress>`,
    });
    const counter = page.root.querySelector('.progress__counter--trailing');
    expect(counter.textContent).toBe('75 MB');
  });

  it('adds trailing row class when counter is trailing', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="50" counter="trailing"></aegov-progress>`,
    });
    const row = page.root.querySelector('.progress__row');
    expect(row.classList.contains('progress__row--trailing')).toBe(true);
  });

  it('hides counter when indeterminate', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress counter="top"></aegov-progress>`,
    });
    expect(page.root.querySelector('.progress__counter')).toBeNull();
  });

  // ============================================
  // DESCRIPTION
  // ============================================

  it('renders description when provided', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="50" description="Loading files..."></aegov-progress>`,
    });
    const desc = page.root.querySelector('.progress__description');
    expect(desc).toBeTruthy();
    expect(desc.textContent).toBe('Loading files...');
  });

  it('does not render description when not provided', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="50"></aegov-progress>`,
    });
    expect(page.root.querySelector('.progress__description')).toBeNull();
  });

  // ============================================
  // CUSTOM CLASS
  // ============================================

  it('applies custom class', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="50" class="my-custom"></aegov-progress>`,
    });
    const wrapper = page.root.querySelector('.aegov-progress');
    expect(wrapper.classList.contains('my-custom')).toBe(true);
  });

  // ============================================
  // PASS-THROUGH ATTRIBUTES
  // ============================================

  it('passes through data attributes to native progress', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="50" data-testid="my-bar"></aegov-progress>`,
    });
    const native = page.root.querySelector('progress');
    expect(native.getAttribute('data-testid')).toBe('my-bar');
  });

  it('passes through aria attributes to native progress', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="50" aria-label="File upload progress"></aegov-progress>`,
    });
    const native = page.root.querySelector('progress');
    expect(native.getAttribute('aria-label')).toBe('File upload progress');
  });

  // ============================================
  // ACCESSIBILITY
  // ============================================

  it('visual track has aria-hidden', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="50"></aegov-progress>`,
    });
    const track = page.root.querySelector('.progress__track');
    expect(track.getAttribute('aria-hidden')).toBe('true');
  });

  it('native progress is sr-only', async () => {
    const page = await newSpecPage({
      components: [AegovProgress],
      html: `<aegov-progress value="50"></aegov-progress>`,
    });
    const native = page.root.querySelector('progress');
    expect(native.classList.contains('progress__native')).toBe(true);
  });
});
