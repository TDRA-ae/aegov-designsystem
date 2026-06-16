import { newSpecPage } from '@stencil/core/testing';
import { AegovToast } from './aegov-toast';

describe('aegov-toast', () => {
  it('renders nothing by default (not visible)', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast>Hi</aegov-toast>`,
    });
    expect(page.root.querySelector('.aegov-toast')).toBeNull();
  });

  it('show() makes the toast visible and emits aegovToastOpen', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="0">Hi</aegov-toast>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovToastOpen', spy);
    await page.rootInstance.show();
    await page.waitForChanges();
    // Two RAF wait for emit
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r as any)));
    await page.waitForChanges();
    expect(page.root.querySelector('.aegov-toast')).not.toBeNull();
  });

  it('applies variant class when shown', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast variant="error" duration="0">Err</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    const el = page.root.querySelector('.aegov-toast');
    expect(el.className).toContain('toast--error');
  });

  it('applies appearance class', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast appearance="solid" duration="0">x</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.aegov-toast').className).toContain('toast--solid');
  });

  it('applies position direction class', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast position="top-left" duration="0">x</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.aegov-toast').className).toContain('toast--left');
  });

  it('renders dismiss button by default', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="0">x</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast__dismiss')).not.toBeNull();
  });

  it('omits dismiss button when is-dismissible=false', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast is-dismissible="false" duration="0">x</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast__dismiss')).toBeNull();
  });

  it('dismiss button click emits aegovToastDismiss', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="0">x</aegov-toast>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovToastDismiss', spy);
    await page.rootInstance.show();
    await page.waitForChanges();
    const btn = page.root.querySelector('.toast__dismiss') as HTMLButtonElement;
    btn.click();
    await page.waitForChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('renders title slot when provided', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="0"><span slot="title">Title</span>Body</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast__title')).not.toBeNull();
  });

  it('renders icon slot when provided', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="0"><span slot="icon">★</span>Body</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast__icon')).not.toBeNull();
  });

  it('renders actions slot when provided', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="0">Body<button slot="actions">Undo</button></aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast__actions')).not.toBeNull();
  });

  it('renders progress bar when is-progress-enabled and duration > 0', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="3000" is-progress-enabled="true">x</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast__progress')).not.toBeNull();
  });

  it('does not render progress bar when duration=0', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="0" is-progress-enabled="true">x</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast__progress')).toBeNull();
  });

  it('dismiss button has aria-label including variant', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast variant="success" duration="0">x</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    const btn = page.root.querySelector('.toast__dismiss') as HTMLButtonElement;
    expect(btn.getAttribute('aria-label')).toBe('Close success notification');
  });
});
