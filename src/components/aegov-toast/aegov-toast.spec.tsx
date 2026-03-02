import { newSpecPage } from '@stencil/core/testing';
import { AegovToast } from './aegov-toast';

describe('aegov-toast', () => {
  // ============================================
  // RENDERING
  // ============================================

  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast>Test message</aegov-toast>`,
    });
    expect(page.root).toBeTruthy();
    // Not visible by default (must call show())
    const toast = page.root.querySelector('.aegov-toast');
    expect(toast).toBeNull();
  });

  it('renders toast content after show() is called', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="0">Test message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    const toast = page.root.querySelector('.aegov-toast');
    expect(toast).toBeTruthy();
  });

  it('does not put role="status" on the visual toast (live region handles announcements)', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="0">Test message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    const toast = page.root.querySelector('.aegov-toast');
    expect(toast.getAttribute('role')).toBeNull();
    expect(toast.getAttribute('aria-live')).toBeNull();
  });

  // ============================================
  // VARIANTS
  // ============================================

  it('renders default variant', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast variant="default" duration="0">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast--default')).toBeTruthy();
  });

  it('renders error variant', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast variant="error" duration="0">Error!</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast--error')).toBeTruthy();
  });

  it('renders warning variant', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast variant="warning" duration="0">Warning!</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast--warning')).toBeTruthy();
  });

  it('renders success variant', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast variant="success" duration="0">Success!</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast--success')).toBeTruthy();
  });

  it('renders info variant', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast variant="info" duration="0">Info</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast--info')).toBeTruthy();
  });

  // ============================================
  // APPEARANCES
  // ============================================

  it('renders soft appearance by default', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="0">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast--soft')).toBeTruthy();
  });

  it('renders solid appearance', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast appearance="solid" duration="0">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast--solid')).toBeTruthy();
  });

  it('renders error variant with solid appearance', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast variant="error" appearance="solid" duration="0">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    const toast = page.root.querySelector('.aegov-toast');
    expect(toast.classList.contains('toast--error')).toBe(true);
    expect(toast.classList.contains('toast--solid')).toBe(true);
  });

  // ============================================
  // ICON
  // ============================================

  it('shows icon by default', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="0">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    const icon = page.root.querySelector('.toast__icon');
    expect(icon).toBeTruthy();
    expect(icon.querySelector('svg')).toBeTruthy();
  });

  it('hides icon when show-icon is false', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast show-icon="false" duration="0">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast__icon')).toBeNull();
  });

  it('renders icon for each variant', async () => {
    const variants = ['default', 'error', 'warning', 'success', 'info'];
    for (const variant of variants) {
      const page = await newSpecPage({
        components: [AegovToast],
        html: `<aegov-toast variant="${variant}" duration="0">Msg</aegov-toast>`,
      });
      await page.rootInstance.show();
      await page.waitForChanges();
      expect(page.root.querySelector('.toast__icon svg')).toBeTruthy();
    }
  });

  it('renders custom icon slot when provided', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="0"><span slot="icon">★</span>Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    const iconContainer = page.root.querySelector('.toast__icon');
    expect(iconContainer).toBeTruthy();
    const customIcon = page.root.querySelector('[slot="icon"]');
    expect(customIcon).toBeTruthy();
    expect(customIcon.textContent).toBe('★');
  });

  // ============================================
  // DISMISS BUTTON
  // ============================================

  it('shows dismiss button by default', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="0">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    const btn = page.root.querySelector('.toast__dismiss');
    expect(btn).toBeTruthy();
    expect(btn.getAttribute('aria-label')).toBe('Close toast');
  });

  it('hides dismiss button when dismissible is false', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast dismissible="false" duration="0">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast__dismiss')).toBeNull();
  });

  // ============================================
  // PROGRESS BAR
  // ============================================

  it('does not show progress bar by default', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="0">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast__progress')).toBeNull();
  });

  it('shows progress bar when show-progress is true', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast show-progress="true" duration="5000">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    const progress = page.root.querySelector('.toast__progress');
    expect(progress).toBeTruthy();
  });

  it('sets animation duration on progress bar', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast show-progress="true" duration="3000">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    const progress = page.root.querySelector('.toast__progress') as HTMLElement;
    expect(progress.style.animationDuration).toBe('3000ms');
  });

  it('does not show progress bar when duration is 0', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast show-progress="true" duration="0">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast__progress')).toBeNull();
  });

  // ============================================
  // POSITION CLASSES
  // ============================================

  it('applies right direction class for top-right', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast position="top-right" duration="0">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast--right')).toBeTruthy();
  });

  it('applies left direction class for top-left', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast position="top-left" duration="0">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast--left')).toBeTruthy();
  });

  it('applies center+top classes for top-center', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast position="top-center" duration="0">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    const toast = page.root.querySelector('.aegov-toast');
    expect(toast.classList.contains('toast--center')).toBe(true);
    expect(toast.classList.contains('toast--top')).toBe(true);
  });

  it('applies center+bottom classes for bottom-center', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast position="bottom-center" duration="0">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    const toast = page.root.querySelector('.aegov-toast');
    expect(toast.classList.contains('toast--center')).toBe(true);
    expect(toast.classList.contains('toast--bottom')).toBe(true);
  });

  it('applies left direction for bottom-left', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast position="bottom-left" duration="0">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast--left')).toBeTruthy();
  });

  it('applies right direction for bottom-right', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast position="bottom-right" duration="0">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast--right')).toBeTruthy();
  });

  // ============================================
  // SHOW / CLOSE METHODS
  // ============================================

  it('show() sets isVisible to true', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="0">Message</aegov-toast>`,
    });
    expect(page.rootInstance.isVisible).toBe(false);
    await page.rootInstance.show();
    expect(page.rootInstance.isVisible).toBe(true);
  });

  it('show() does nothing if already visible', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="0">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.rootInstance.show();
    expect(page.rootInstance.isVisible).toBe(true);
  });

  it('close() triggers exiting state', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="0">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    await page.rootInstance.close();
    expect(page.rootInstance.isExiting).toBe(true);
  });

  it('close() does nothing if not visible', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="0">Message</aegov-toast>`,
    });
    await page.rootInstance.close();
    expect(page.rootInstance.isVisible).toBe(false);
  });

  // ============================================
  // EVENTS
  // ============================================

  it('emits aegovToastDismiss when dismiss button is clicked', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="0">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();

    const dismissSpy = jest.fn();
    page.root.addEventListener('aegovToastDismiss', dismissSpy);

    const btn = page.root.querySelector('.toast__dismiss') as HTMLElement;
    btn.click();
    expect(dismissSpy).toHaveBeenCalledTimes(1);
  });

  // ============================================
  // ACTIONS SLOT
  // ============================================

  it('renders actions slot when provided', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="0"><button slot="actions">Undo</button>Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast__actions')).toBeTruthy();
  });

  it('does not render actions container when no actions slot', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="0">Message only</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();
    expect(page.root.querySelector('.toast__actions')).toBeNull();
  });

  // ============================================
  // DEFAULT PROPS
  // ============================================

  it('has correct default props', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast>Message</aegov-toast>`,
    });
    const instance = page.rootInstance;
    expect(instance.variant).toBe('default');
    expect(instance.appearance).toBe('soft');
    expect(instance.position).toBe('top-right');
    expect(instance.duration).toBe(5000);
    expect(instance.dismissible).toBe(true);
    expect(instance.mode).toBe('stack');
    expect(instance.showIcon).toBe(true);
    expect(instance.showProgress).toBe(false);
  });

  // ============================================
  // MODE PROP
  // ============================================

  it('defaults mode to stack', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast>Message</aegov-toast>`,
    });
    expect(page.rootInstance.mode).toBe('stack');
  });

  it('accepts rack mode', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast mode="rack">Message</aegov-toast>`,
    });
    expect(page.rootInstance.mode).toBe('rack');
  });

  // ============================================
  // DISCONNECTED CALLBACK
  // ============================================

  it('clears timer on disconnect', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="50000">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();

    // Should not throw on disconnect
    page.rootInstance.disconnectedCallback();
  });

  // ============================================
  // ANIMATION STATE
  // ============================================

  it('adds entering class on show', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="0">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    expect(page.rootInstance.isEntering).toBe(true);
  });

  // ============================================
  // HOVER PAUSE / RESUME
  // ============================================

  it('isPaused defaults to false', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="5000">Message</aegov-toast>`,
    });
    expect(page.rootInstance.isPaused).toBe(false);
  });

  it('pauses timer on mouseenter when duration > 0', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="5000">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();

    const toast = page.root.querySelector('.aegov-toast') as HTMLElement;
    toast.dispatchEvent(new Event('mouseenter'));
    expect(page.rootInstance.isPaused).toBe(true);
  });

  it('resumes timer on mouseleave', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="5000">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();

    const toast = page.root.querySelector('.aegov-toast') as HTMLElement;
    toast.dispatchEvent(new Event('mouseenter'));
    expect(page.rootInstance.isPaused).toBe(true);

    toast.dispatchEvent(new Event('mouseleave'));
    expect(page.rootInstance.isPaused).toBe(false);
  });

  it('does not pause when duration is 0 (persistent)', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="0">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();

    const toast = page.root.querySelector('.aegov-toast') as HTMLElement;
    toast.dispatchEvent(new Event('mouseenter'));
    expect(page.rootInstance.isPaused).toBe(false);
  });

  it('pauses progress bar animation on hover', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="5000" show-progress="true">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();

    const toast = page.root.querySelector('.aegov-toast') as HTMLElement;
    toast.dispatchEvent(new Event('mouseenter'));
    await page.waitForChanges();

    const progress = page.root.querySelector('.toast__progress') as HTMLElement;
    expect(progress.style.animationPlayState).toBe('paused');
  });

  it('resumes progress bar animation on mouse leave', async () => {
    const page = await newSpecPage({
      components: [AegovToast],
      html: `<aegov-toast duration="5000" show-progress="true">Message</aegov-toast>`,
    });
    await page.rootInstance.show();
    await page.waitForChanges();

    const toast = page.root.querySelector('.aegov-toast') as HTMLElement;
    toast.dispatchEvent(new Event('mouseenter'));
    await page.waitForChanges();
    toast.dispatchEvent(new Event('mouseleave'));
    await page.waitForChanges();

    const progress = page.root.querySelector('.toast__progress') as HTMLElement;
    expect(progress.style.animationPlayState).toBe('running');
  });
});
