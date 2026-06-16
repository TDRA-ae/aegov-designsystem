import { newE2EPage } from '@stencil/core/testing';

describe('aegov-toast (e2e)', () => {
  it('renders nothing until show() is called', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="0">Hi</aegov-toast>');
    const inner = await page.find('aegov-toast .aegov-toast');
    expect(inner).toBeNull();
  });

  it('show() makes toast visible and emits aegovToastOpen', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="0">Hi</aegov-toast>');
    const el = await page.find('aegov-toast');
    const spy = await el.spyOnEvent('aegovToastOpen');
    await el.callMethod('show');
    await new Promise(resolve => setTimeout(resolve, 50));
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
    const inner = await page.find('aegov-toast .aegov-toast');
    expect(inner).not.toBeNull();
  });

  it('moves toast to portal container on show', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="0" position="top-right">Hi</aegov-toast>');
    const el = await page.find('aegov-toast');
    await el.callMethod('show');
    await page.waitForChanges();
    const inContainer = await page.find('.aegov-toast-container--top-right aegov-toast');
    expect(inContainer).not.toBeNull();
  });

  it('close() emits aegovToastClose after exit animation', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="0">Hi</aegov-toast>');
    const el = await page.find('aegov-toast');
    const spy = await el.spyOnEvent('aegovToastClose');
    await el.callMethod('show');
    await page.waitForChanges();
    await el.callMethod('close');
    await new Promise(resolve => setTimeout(resolve, 400));
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
  });

  it('dismiss button click emits dismiss and close events', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="0">Hi</aegov-toast>');
    const el = await page.find('aegov-toast');
    const dismissSpy = await el.spyOnEvent('aegovToastDismiss');
    const closeSpy = await el.spyOnEvent('aegovToastClose');
    await el.callMethod('show');
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    // The toast is portaled and animated; trigger the dismiss via a direct
    // DOM click rather than Puppeteer's hit-testing, which can fail during
    // the open animation.
    await page.evaluate(() => {
      const btn = document.querySelector('aegov-toast button.toast__dismiss') as HTMLButtonElement;
      btn?.click();
    });
    await new Promise(resolve => setTimeout(resolve, 400));
    await page.waitForChanges();
    expect(dismissSpy).toHaveReceivedEventTimes(1);
    expect(closeSpy).toHaveReceivedEventTimes(1);
  });

  it('renders title and actions slots', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-toast duration="0">
        <span slot="title">Saved</span>
        Your file was saved.
        <button slot="actions">Undo</button>
      </aegov-toast>
    `);
    const el = await page.find('aegov-toast');
    await el.callMethod('show');
    await page.waitForChanges();
    const title = await page.find('aegov-toast .toast__title');
    const actions = await page.find('aegov-toast .toast__actions');
    expect(title).not.toBeNull();
    expect(actions).not.toBeNull();
  });

  it('auto-closes after duration', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="200">Hi</aegov-toast>');
    const el = await page.find('aegov-toast');
    const closeSpy = await el.spyOnEvent('aegovToastClose');
    await el.callMethod('show');
    await new Promise(resolve => setTimeout(resolve, 700));
    await page.waitForChanges();
    expect(closeSpy).toHaveReceivedEventTimes(1);
  });

  it('progress bar renders when is-progress-enabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="3000" is-progress-enabled="true">Hi</aegov-toast>');
    const el = await page.find('aegov-toast');
    await el.callMethod('show');
    await page.waitForChanges();
    const progress = await page.find('aegov-toast .toast__progress');
    expect(progress).not.toBeNull();
  });

  it('creates persistent live region for screen readers', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toast duration="0">Hello world</aegov-toast>');
    const el = await page.find('aegov-toast');
    await el.callMethod('show');
    await page.waitForChanges();
    const live = await page.find('#aegov-toast-live-region');
    expect(live).not.toBeNull();
    expect(live.getAttribute('aria-live')).toBe('polite');
    expect(live.getAttribute('role')).toBe('status');
  });
});
