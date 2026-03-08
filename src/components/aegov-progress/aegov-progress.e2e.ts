import { newE2EPage } from '@stencil/core/testing';

describe('aegov-progress e2e', () => {
  // ============================================
  // BASIC RENDERING
  // ============================================

  it('renders with value', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-progress value="50"></aegov-progress>`);
    const track = await page.find('aegov-progress .progress__track');
    expect(track).toBeTruthy();
    const fill = await page.find('aegov-progress .progress__fill');
    expect(fill).toBeTruthy();
  });

  it('renders native progress element', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-progress value="50"></aegov-progress>`);
    const native = await page.find('aegov-progress progress');
    expect(native).toBeTruthy();
  });

  // ============================================
  // INDETERMINATE
  // ============================================

  it('renders indeterminate when no value', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-progress></aegov-progress>`);
    const track = await page.find('aegov-progress .progress__track--indeterminate');
    expect(track).toBeTruthy();
    const fill = await page.find('aegov-progress .progress__fill');
    expect(fill).toBeNull();
  });

  // ============================================
  // HEIGHT
  // ============================================

  it('applies default height', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-progress value="50"></aegov-progress>`);
    const track = await page.find('aegov-progress .progress__track');
    const style = await track.getComputedStyle();
    // h-2 = 0.5rem = 8px
    expect(style.height).toBe('8px');
  });

  it('applies custom height', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-progress value="50" height="4"></aegov-progress>`);
    const track = await page.find('aegov-progress .progress__track');
    const style = await track.getComputedStyle();
    // h-4 = 1rem = 16px
    expect(style.height).toBe('16px');
  });

  // ============================================
  // COUNTER — TOP
  // ============================================

  it('shows top counter', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-progress value="42" counter="top"></aegov-progress>`);
    const counter = await page.find('aegov-progress .progress__counter--top');
    expect(counter).toBeTruthy();
    expect(counter.textContent).toBe('42');
  });

  it('shows top counter with suffix', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-progress value="42" counter="top" counter-suffix="%"></aegov-progress>`);
    const counter = await page.find('aegov-progress .progress__counter--top');
    expect(counter.textContent).toBe('42%');
  });

  // ============================================
  // COUNTER — TRAILING
  // ============================================

  it('shows trailing counter', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-progress value="75" counter="trailing"></aegov-progress>`);
    const counter = await page.find('aegov-progress .progress__counter--trailing');
    expect(counter).toBeTruthy();
    expect(counter.textContent).toBe('75');
  });

  it('shows trailing counter with suffix', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-progress value="75" counter="trailing" counter-suffix=" MB"></aegov-progress>`);
    const counter = await page.find('aegov-progress .progress__counter--trailing');
    expect(counter.textContent).toBe('75 MB');
  });

  it('does not show counter when indeterminate', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-progress counter="top" counter-suffix="%"></aegov-progress>`);
    const counter = await page.find('aegov-progress .progress__counter');
    expect(counter).toBeNull();
  });

  // ============================================
  // DESCRIPTION
  // ============================================

  it('renders description', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-progress value="50" description="Uploading..."></aegov-progress>`);
    const desc = await page.find('aegov-progress .progress__description');
    expect(desc).toBeTruthy();
    expect(desc.textContent).toBe('Uploading...');
  });

  it('does not render description when not provided', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-progress value="50"></aegov-progress>`);
    const desc = await page.find('aegov-progress .progress__description');
    expect(desc).toBeNull();
  });

  // ============================================
  // JAVASCRIPT VALUE UPDATE
  // ============================================

  it('updates fill when value changes via JS', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-progress value="20" counter="trailing" counter-suffix="%"></aegov-progress>`);

    // Initial state
    let counter = await page.find('aegov-progress .progress__counter--trailing');
    expect(counter.textContent).toBe('20%');

    // Update value via JS
    await page.$eval('aegov-progress', (el: any) => {
      el.value = 80;
    });
    await page.waitForChanges();

    counter = await page.find('aegov-progress .progress__counter--trailing');
    expect(counter.textContent).toBe('80%');
  });

  it('updates description via JS', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-progress value="20" description="Starting..."></aegov-progress>`);

    let desc = await page.find('aegov-progress .progress__description');
    expect(desc.textContent).toBe('Starting...');

    await page.$eval('aegov-progress', (el: any) => {
      el.description = 'Almost done!';
    });
    await page.waitForChanges();

    desc = await page.find('aegov-progress .progress__description');
    expect(desc.textContent).toBe('Almost done!');
  });

  // ============================================
  // PASS-THROUGH ATTRIBUTES
  // ============================================

  it('passes data attributes to native progress', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-progress value="50" data-testid="upload-bar"></aegov-progress>`);
    const native = await page.find('aegov-progress progress');
    expect(native.getAttribute('data-testid')).toBe('upload-bar');
  });

  it('passes aria-label to native progress', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-progress value="50" aria-label="Upload progress"></aegov-progress>`);
    const native = await page.find('aegov-progress progress');
    expect(native.getAttribute('aria-label')).toBe('Upload progress');
  });

  // ============================================
  // ACCESSIBILITY
  // ============================================

  it('visual track has aria-hidden', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-progress value="50"></aegov-progress>`);
    const track = await page.find('aegov-progress .progress__track');
    expect(track.getAttribute('aria-hidden')).toBe('true');
  });

  it('native progress is visually hidden', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-progress value="50"></aegov-progress>`);
    const native = await page.find('aegov-progress progress');
    const style = await native.getComputedStyle();
    expect(style.position).toBe('absolute');
    expect(style.overflow).toBe('hidden');
  });

  // ============================================
  // FULL SCENARIO
  // ============================================

  it('renders complete progress with all features', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-progress
        value="65"
        max="100"
        height="3"
        counter="top"
        counter-suffix="%"
        description="Uploading 13 of 20 files..."
      ></aegov-progress>
    `);

    const track = await page.find('aegov-progress .progress__track');
    expect(track).toBeTruthy();

    const counter = await page.find('aegov-progress .progress__counter--top');
    expect(counter.textContent).toBe('65%');

    const desc = await page.find('aegov-progress .progress__description');
    expect(desc.textContent).toBe('Uploading 13 of 20 files...');
  });
});
