import { newE2EPage } from '@stencil/core/testing';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('aegov-toast e2e', () => {
  // ============================================
  // BASIC RENDERING
  // ============================================

  it('renders and is not visible by default', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast>Hello</aegov-toast>');
    const toast = await page.find('aegov-toast .toast');
    expect(toast).toBeNull();
  });

  it('becomes visible after show() is called', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="0">Hello</aegov-toast>');
    const el = await page.find('aegov-toast');
    await el.callMethod('show');
    await page.waitForChanges();
    const toast = await page.find('aegov-toast .toast');
    expect(toast).toBeTruthy();
  });

  // ============================================
  // EVENTS
  // ============================================

  it('emits aegovToastOpen when shown', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="0">Hello</aegov-toast>');
    const openEvent = await page.spyOnEvent('aegovToastOpen');
    const el = await page.find('aegov-toast');
    await el.callMethod('show');
    await page.waitForChanges();
    await wait(100);
    expect(openEvent).toHaveReceivedEvent();
  });

  it('emits aegovToastDismiss when dismiss button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="0">Hello</aegov-toast>');
    const dismissEvent = await page.spyOnEvent('aegovToastDismiss');
    const el = await page.find('aegov-toast');
    await el.callMethod('show');
    await page.waitForChanges();
    await wait(100);

    const btn = await page.find('aegov-toast .toast__dismiss');
    await btn.click();
    expect(dismissEvent).toHaveReceivedEvent();
  });

  it('close() hides the toast after animation', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="0">Hello</aegov-toast>');
    const el = await page.find('aegov-toast');
    await el.callMethod('show');
    await page.waitForChanges();
    await wait(100);

    let toast = await page.find('aegov-toast .toast');
    expect(toast).toBeTruthy();

    await el.callMethod('close');
    await wait(400);
    await page.waitForChanges();

    toast = await page.find('aegov-toast .toast');
    expect(toast).toBeNull();
  });

  // ============================================
  // DISMISS BUTTON
  // ============================================

  it('shows dismiss button when dismissible is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="0" dismissible="true">Hello</aegov-toast>');
    const el = await page.find('aegov-toast');
    await el.callMethod('show');
    await page.waitForChanges();
    const btn = await page.find('aegov-toast .toast__dismiss');
    expect(btn).toBeTruthy();
    expect(await btn.getAttribute('aria-label')).toBe('Close toast');
  });

  it('hides dismiss button when dismissible is false', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="0" dismissible="false">Hello</aegov-toast>');
    const el = await page.find('aegov-toast');
    await el.callMethod('show');
    await page.waitForChanges();
    const btn = await page.find('aegov-toast .toast__dismiss');
    expect(btn).toBeNull();
  });

  // ============================================
  // VARIANTS
  // ============================================

  it('renders all variant classes', async () => {
    const variants = ['default', 'error', 'warning', 'success', 'info'];
    for (const variant of variants) {
      const page = await newE2EPage();
      await page.setContent(`<aegov-toast variant="${variant}" duration="0">Message</aegov-toast>`);
      const el = await page.find('aegov-toast');
      await el.callMethod('show');
      await page.waitForChanges();
      const toast = await page.find(`aegov-toast .toast--${variant}`);
      expect(toast).toBeTruthy();
    }
  });

  // ============================================
  // APPEARANCES
  // ============================================

  it('renders soft and solid appearances', async () => {
    for (const appearance of ['soft', 'solid']) {
      const page = await newE2EPage();
      await page.setContent(`<aegov-toast appearance="${appearance}" duration="0">Message</aegov-toast>`);
      const el = await page.find('aegov-toast');
      await el.callMethod('show');
      await page.waitForChanges();
      const toast = await page.find(`aegov-toast .toast--${appearance}`);
      expect(toast).toBeTruthy();
    }
  });

  // ============================================
  // ICON
  // ============================================

  it('shows icon by default', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="0">Hello</aegov-toast>');
    const el = await page.find('aegov-toast');
    await el.callMethod('show');
    await page.waitForChanges();
    const icon = await page.find('aegov-toast .toast__icon');
    expect(icon).toBeTruthy();
  });

  it('hides icon when show-icon="false"', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="0" show-icon="false">Hello</aegov-toast>');
    const el = await page.find('aegov-toast');
    await el.callMethod('show');
    await page.waitForChanges();
    const icon = await page.find('aegov-toast .toast__icon');
    expect(icon).toBeNull();
  });

  // ============================================
  // PROGRESS BAR
  // ============================================

  it('shows progress bar when show-progress is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="5000" show-progress="true">Hello</aegov-toast>');
    const el = await page.find('aegov-toast');
    await el.callMethod('show');
    await page.waitForChanges();
    const progress = await page.find('aegov-toast .toast__progress');
    expect(progress).toBeTruthy();
  });

  it('does not show progress bar by default', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="5000">Hello</aegov-toast>');
    const el = await page.find('aegov-toast');
    await el.callMethod('show');
    await page.waitForChanges();
    const progress = await page.find('aegov-toast .toast__progress');
    expect(progress).toBeNull();
  });

  // ============================================
  // AUTO-DISMISS
  // ============================================

  it('auto-dismisses after duration', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="500">Hello</aegov-toast>');
    const el = await page.find('aegov-toast');
    await el.callMethod('show');
    await page.waitForChanges();
    await wait(100);

    // Verify visible
    let toast = await page.find('aegov-toast .toast');
    expect(toast).toBeTruthy();

    // Wait for duration + close animation + buffer
    await wait(1200);
    await page.waitForChanges();

    toast = await page.find('aegov-toast .toast');
    expect(toast).toBeNull();
  });

  it('does not auto-dismiss when duration is 0', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="0">Hello</aegov-toast>');
    const closeEvent = await page.spyOnEvent('aegovToastClose');
    const el = await page.find('aegov-toast');
    await el.callMethod('show');
    await page.waitForChanges();
    await wait(1000);
    expect(closeEvent).not.toHaveReceivedEvent();
  });

  // ============================================
  // SHOW/CLOSE METHODS
  // ============================================

  it('close() can be called multiple times safely', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="0">Hello</aegov-toast>');
    const el = await page.find('aegov-toast');
    await el.callMethod('show');
    await page.waitForChanges();
    await wait(100);

    // Call close twice — second call should be ignored
    await el.callMethod('close');
    await el.callMethod('close');
    await wait(400);
    await page.waitForChanges();

    const toast = await page.find('aegov-toast .toast');
    expect(toast).toBeNull();
  });

  // ============================================
  // PORTAL CONTAINERS
  // ============================================

  it('creates portal container on show', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="0" position="top-right">Hello</aegov-toast>');
    const el = await page.find('aegov-toast');
    await el.callMethod('show');
    await page.waitForChanges();
    await wait(100);

    const container = await page.find('.aegov-toast-container--top-right');
    expect(container).toBeTruthy();
  });

  it('creates container for bottom-left position', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="0" position="bottom-left">Hello</aegov-toast>');
    const el = await page.find('aegov-toast');
    await el.callMethod('show');
    await page.waitForChanges();
    await wait(100);

    const container = await page.find('.aegov-toast-container--bottom-left');
    expect(container).toBeTruthy();
  });

  // ============================================
  // STACKING
  // ============================================

  it('stacks multiple toasts at same position', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-toast id="t1" duration="0" position="top-right">Toast 1</aegov-toast>
      <aegov-toast id="t2" duration="0" position="top-right">Toast 2</aegov-toast>
    `);

    const t1 = await page.find('#t1');
    const t2 = await page.find('#t2');
    await t1.callMethod('show');
    await page.waitForChanges();
    await t2.callMethod('show');
    await page.waitForChanges();
    await wait(100);

    const container = await page.find('.aegov-toast-container--top-right');
    expect(container).toBeTruthy();

    const toasts = await page.findAll('.aegov-toast-container--top-right aegov-toast');
    expect(toasts.length).toBe(2);
  });

  it('non-stackable replaces previous toast', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-toast id="t1" duration="0" stackable="false" position="top-right">Toast 1</aegov-toast>
      <aegov-toast id="t2" duration="0" stackable="false" position="top-right">Toast 2</aegov-toast>
    `);

    const t1 = await page.find('#t1');
    const t2 = await page.find('#t2');

    await t1.callMethod('show');
    await page.waitForChanges();
    await wait(100);

    await t2.callMethod('show');
    await page.waitForChanges();
    // Wait for first toast's close animation
    await wait(400);
    await page.waitForChanges();

    // After close animation, only second toast should remain visible
    const toasts = await page.findAll('.aegov-toast-container--top-right aegov-toast .toast');
    expect(toasts.length).toBe(1);
  });

  // ============================================
  // ACCESSIBILITY
  // ============================================

  it('has role="status" and aria-live="polite"', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="0">Hello</aegov-toast>');
    const el = await page.find('aegov-toast');
    await el.callMethod('show');
    await page.waitForChanges();

    const toast = await page.find('aegov-toast .toast');
    expect(await toast.getAttribute('role')).toBe('status');
    expect(await toast.getAttribute('aria-live')).toBe('polite');
  });

  it('dismiss button has accessible label', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="0">Hello</aegov-toast>');
    const el = await page.find('aegov-toast');
    await el.callMethod('show');
    await page.waitForChanges();

    const btn = await page.find('aegov-toast .toast__dismiss');
    expect(await btn.getAttribute('aria-label')).toBe('Close toast');
  });

  // ============================================
  // GLOBAL HELPER
  // ============================================

  it('showToast() via page.evaluate creates a toast', async () => {
    const page = await newE2EPage();
    await page.setContent('<div id="app"></div>');
    await wait(200);

    // Create toast programmatically
    await page.evaluate(() => {
      const toast = document.createElement('aegov-toast') as any;
      toast.variant = 'success';
      toast.duration = 0;
      toast.innerHTML = 'Created via JS';
      document.body.appendChild(toast);
      toast.show();
    });

    await page.waitForChanges();
    await wait(200);

    const toast = await page.find('aegov-toast');
    expect(toast).toBeTruthy();
  });
});
