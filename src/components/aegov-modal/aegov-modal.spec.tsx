import { newSpecPage } from '@stencil/core/testing';
import { AegovModal } from './aegov-modal';

describe('aegov-modal', () => {
  // ============================================
  // Basic Rendering
  // ============================================

  it('should render with default props', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal><div>Modal content</div></aegov-modal>`,
    });

    expect(page.root).toBeTruthy();
    expect(page.root?.shadowRoot).toBeTruthy();
  });

  it('should not render when closed', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal open="false"><div>Modal content</div></aegov-modal>`,
    });

    const backdrop = page.root?.shadowRoot?.querySelector('.modal-backdrop');
    expect(backdrop).toBeNull();
  });

  it('should render when open is true', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal open="true"><div>Modal content</div></aegov-modal>`,
    });

    await page.waitForChanges();
    const backdrop = page.root?.shadowRoot?.querySelector('.modal-backdrop');
    expect(backdrop).toBeTruthy();
  });

  it('should use shadow DOM', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal open="true"><div>Modal content</div></aegov-modal>`,
    });

    expect(page.root?.shadowRoot).toBeTruthy();
  });

  // ============================================
  // Props - Default Values
  // ============================================

  it('should have default open value of false', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal><div>Content</div></aegov-modal>`,
    });

    expect(page.rootInstance.open).toBe(false);
  });

  it('should have default closeWithBackdrop value of true', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal><div>Content</div></aegov-modal>`,
    });

    expect(page.rootInstance.closeWithBackdrop).toBe(true);
  });

  it('should have default preventBodyScroll value of true', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal><div>Content</div></aegov-modal>`,
    });

    expect(page.rootInstance.preventBodyScroll).toBe(true);
  });

  it('should have default backdropOpacity value of base', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal><div>Content</div></aegov-modal>`,
    });

    expect(page.rootInstance.backdropOpacity).toBe('base');
  });

  it('should have default position value of center', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal><div>Content</div></aegov-modal>`,
    });

    expect(page.rootInstance.position).toBe('center');
  });

  // ============================================
  // Props - Custom Values
  // ============================================

  it('should accept custom closeWithBackdrop prop', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal close-with-backdrop="false"><div>Content</div></aegov-modal>`,
    });

    expect(page.rootInstance.closeWithBackdrop).toBe(false);
  });

  it('should accept custom preventBodyScroll prop', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal prevent-body-scroll="false"><div>Content</div></aegov-modal>`,
    });

    expect(page.rootInstance.preventBodyScroll).toBe(false);
  });

  it('should accept backdropOpacity="light"', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal backdrop-opacity="light" open="true"><div>Content</div></aegov-modal>`,
    });

    await page.waitForChanges();
    const backdrop = page.root?.shadowRoot?.querySelector('.modal-backdrop--light');
    expect(backdrop).toBeTruthy();
  });

  it('should accept backdropOpacity="dark"', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal backdrop-opacity="dark" open="true"><div>Content</div></aegov-modal>`,
    });

    await page.waitForChanges();
    const backdrop = page.root?.shadowRoot?.querySelector('.modal-backdrop--dark');
    expect(backdrop).toBeTruthy();
  });

  it('should accept position="top"', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal position="top" open="true"><div>Content</div></aegov-modal>`,
    });

    await page.waitForChanges();
    const container = page.root?.shadowRoot?.querySelector('.modal-container--top');
    expect(container).toBeTruthy();
  });

  it('should accept position="bottom"', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal position="bottom" open="true"><div>Content</div></aegov-modal>`,
    });

    await page.waitForChanges();
    const container = page.root?.shadowRoot?.querySelector('.modal-container--bottom');
    expect(container).toBeTruthy();
  });

  // ============================================
  // ARIA Attributes
  // ============================================

  it('should render with role="dialog"', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal open="true"><div>Content</div></aegov-modal>`,
    });

    await page.waitForChanges();
    const content = page.root?.shadowRoot?.querySelector('[role="dialog"]');
    expect(content).toBeTruthy();
  });

  it('should render with aria-modal="true"', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal open="true"><div>Content</div></aegov-modal>`,
    });

    await page.waitForChanges();
    const content = page.root?.shadowRoot?.querySelector('[aria-modal="true"]');
    expect(content).toBeTruthy();
  });

  // ============================================
  // Pass-Through Attributes
  // ============================================

  it('should pass through id attribute', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal id="my-modal" open="true"><div>Content</div></aegov-modal>`,
    });

    await page.waitForChanges();
    const content = page.root?.shadowRoot?.querySelector('#my-modal');
    expect(content).toBeTruthy();
  });

  it('should pass through data-* attributes', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal data-testid="modal-test" open="true"><div>Content</div></aegov-modal>`,
    });

    await page.waitForChanges();
    const content = page.root?.shadowRoot?.querySelector('[data-testid="modal-test"]');
    expect(content).toBeTruthy();
  });

  it('should pass through aria-* attributes', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal aria-live="polite" open="true"><div>Content</div></aegov-modal>`,
    });

    await page.waitForChanges();
    const content = page.root?.shadowRoot?.querySelector('[aria-live="polite"]');
    expect(content).toBeTruthy();
  });

  // ============================================
  // Public Methods
  // ============================================

  it('should open modal via show() method', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal><div>Content</div></aegov-modal>`,
    });

    expect(page.rootInstance.open).toBe(false);

    await page.rootInstance.show();
    await page.waitForChanges();

    expect(page.rootInstance.open).toBe(true);
  });

  it('should close modal via close() method', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal open="true"><div>Content</div></aegov-modal>`,
    });

    expect(page.rootInstance.open).toBe(true);

    await page.rootInstance.close();
    await page.waitForChanges();

    // Note: close() triggers animation, so open becomes false after timeout
    // In unit tests, we can't wait for setTimeout, so we check the method was called
    expect(page.rootInstance.animationState).toBe('closing');
  });

  it('should toggle modal via toggle() method', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal><div>Content</div></aegov-modal>`,
    });

    expect(page.rootInstance.open).toBe(false);

    await page.rootInstance.toggle();
    await page.waitForChanges();

    expect(page.rootInstance.open).toBe(true);

    await page.rootInstance.toggle();
    await page.waitForChanges();

    expect(page.rootInstance.open).toBe(false);
  });

  // ============================================
  // Events
  // ============================================

  it('should emit aegovModalOpen event when opened', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal><div>Content</div></aegov-modal>`,
    });

    const openSpy = jest.fn();
    page.root?.addEventListener('aegovModalOpen', openSpy);

    await page.rootInstance.show();
    await page.waitForChanges();

    expect(openSpy).toHaveBeenCalled();
  });

  it('should emit aegovModalClose event when closed', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal open="true"><div>Content</div></aegov-modal>`,
    });

    const closeSpy = jest.fn();
    page.root?.addEventListener('aegovModalClose', closeSpy);

    // Manually trigger close complete since we can't wait for setTimeout
    page.rootInstance.open = false;
    page.rootInstance['handleCloseComplete']();
    await page.waitForChanges();

    expect(closeSpy).toHaveBeenCalled();
  });

  it('should emit aegovModalBeforeClose event before closing', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal open="true"><div>Content</div></aegov-modal>`,
    });

    const beforeCloseSpy = jest.fn();
    page.root?.addEventListener('aegovModalBeforeClose', beforeCloseSpy);

    await page.rootInstance.close();
    await page.waitForChanges();

    expect(beforeCloseSpy).toHaveBeenCalled();
  });

  it('should allow preventing modal close via aegovModalBeforeClose', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal open="true"><div>Content</div></aegov-modal>`,
    });

    page.root?.addEventListener('aegovModalBeforeClose', (event: any) => {
      event.detail.preventDefault();
    });

    await page.rootInstance.close();
    await page.waitForChanges();

    // Modal should still be open because preventDefault was called
    expect(page.rootInstance.open).toBe(true);
  });

  // ============================================
  // Animation States
  // ============================================

  it('should have animationState="closed" initially', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal><div>Content</div></aegov-modal>`,
    });

    expect(page.rootInstance.animationState).toBe('closed');
  });

  it('should set animationState="opening" when opening', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal><div>Content</div></aegov-modal>`,
    });

    await page.rootInstance.show();
    await page.waitForChanges();

    expect(page.rootInstance.animationState).toBe('opening');
  });

  it('should set animationState="closing" when closing', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal open="true"><div>Content</div></aegov-modal>`,
    });

    await page.rootInstance.close();
    await page.waitForChanges();

    expect(page.rootInstance.animationState).toBe('closing');
  });

  // ============================================
  // Z-Index Stacking
  // ============================================

  it('should set z-index based on modal count', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal open="true"><div>Content</div></aegov-modal>`,
    });

    await page.waitForChanges();

    // Z-index should be set as CSS variable
    const style = page.root?.getAttribute('style');
    expect(style).toContain('--modal-z-index');
  });

  // ============================================
  // Slot Content
  // ============================================

  it('should render slotted content', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal open="true"><div class="test-content">Test Content</div></aegov-modal>`,
    });

    await page.waitForChanges();
    const slot = page.root?.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });
});
