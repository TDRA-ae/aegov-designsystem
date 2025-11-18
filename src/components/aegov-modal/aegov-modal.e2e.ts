import { newE2EPage } from '@stencil/core/testing';

describe('aegov-modal E2E', () => {
  // ============================================
  // Basic Rendering
  // ============================================

  it('should render with shadow DOM', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal open><div>Modal content</div></aegov-modal>`);

    const modal = await page.find('aegov-modal');
    expect(modal).toBeTruthy();
    expect(modal.shadowRoot).toBeTruthy();
  });

  it('should not display modal when closed', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal><div>Modal content</div></aegov-modal>`);

    const backdrop = await page.find('aegov-modal >>> .modal-backdrop');
    expect(backdrop).toBeNull();
  });

  it('should display modal when open', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal open><div>Modal content</div></aegov-modal>`);

    const backdrop = await page.find('aegov-modal >>> .modal-backdrop');
    expect(backdrop).toBeTruthy();
  });

  it('should render slotted content', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-modal open>
        <div class="test-content">Test Content</div>
      </aegov-modal>
    `);

    const content = await page.find('.test-content');
    expect(content).toBeTruthy();
    expect(content.textContent).toBe('Test Content');
  });

  // ============================================
  // Position Variants
  // ============================================

  it('should render with center position by default', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal open><div>Content</div></aegov-modal>`);

    const container = await page.find('aegov-modal >>> .modal-container--center');
    expect(container).toBeTruthy();
  });

  it('should render with top position', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal open position="top"><div>Content</div></aegov-modal>`);

    const container = await page.find('aegov-modal >>> .modal-container--top');
    expect(container).toBeTruthy();
  });

  it('should render with bottom position', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal open position="bottom"><div>Content</div></aegov-modal>`);

    const container = await page.find('aegov-modal >>> .modal-container--bottom');
    expect(container).toBeTruthy();
  });

  // ============================================
  // Backdrop Opacity Variants
  // ============================================

  it('should render with base backdrop opacity by default', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal open><div>Content</div></aegov-modal>`);

    const backdrop = await page.find('aegov-modal >>> .modal-backdrop--base');
    expect(backdrop).toBeTruthy();
  });

  it('should render with light backdrop opacity', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal open backdrop-opacity="light"><div>Content</div></aegov-modal>`);

    const backdrop = await page.find('aegov-modal >>> .modal-backdrop--light');
    expect(backdrop).toBeTruthy();
  });

  it('should render with dark backdrop opacity', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal open backdrop-opacity="dark"><div>Content</div></aegov-modal>`);

    const backdrop = await page.find('aegov-modal >>> .modal-backdrop--dark');
    expect(backdrop).toBeTruthy();
  });

  // ============================================
  // Public Methods
  // ============================================

  it('should open modal via show() method', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal><div>Content</div></aegov-modal>`);

    const modal = await page.find('aegov-modal');

    // Initially closed
    let backdrop = await page.find('aegov-modal >>> .modal-backdrop');
    expect(backdrop).toBeNull();

    // Call show()
    await modal.callMethod('show');
    await page.waitForChanges();

    // Now should be open
    backdrop = await page.find('aegov-modal >>> .modal-backdrop');
    expect(backdrop).toBeTruthy();
  });

  it('should close modal via close() method', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal open><div>Content</div></aegov-modal>`);

    const modal = await page.find('aegov-modal');

    // Initially open
    let backdrop = await page.find('aegov-modal >>> .modal-backdrop');
    expect(backdrop).toBeTruthy();

    // Call close()
    await modal.callMethod('close');
    await page.waitForChanges();

    // Modal should be in closing/closed state
    const modalState = await modal.getAttribute('data-state');
    expect(['closing', 'closed']).toContain(modalState);
  });

  it('should toggle modal via toggle() method', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal><div>Content</div></aegov-modal>`);

    const modal = await page.find('aegov-modal');

    // Initially closed
    let backdrop = await page.find('aegov-modal >>> .modal-backdrop');
    expect(backdrop).toBeNull();

    // Toggle to open
    await modal.callMethod('toggle');
    await page.waitForChanges();
    backdrop = await page.find('aegov-modal >>> .modal-backdrop');
    expect(backdrop).toBeTruthy();

    // Toggle to close
    await modal.callMethod('toggle');
    await page.waitForChanges();

    // Verify modal is closing/closed
    const modalState = await modal.getAttribute('data-state');
    expect(['closing', 'closed']).toContain(modalState);
  });

  // ============================================
  // Events
  // ============================================

  it('should emit aegovModalOpen event when opened', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal><div>Content</div></aegov-modal>`);

    const modal = await page.find('aegov-modal');
    const openEvent = await modal.spyOnEvent('aegovModalOpen');

    await modal.callMethod('show');
    await page.waitForChanges();

    expect(openEvent).toHaveReceivedEvent();
  });

  // Note: aegovModalClose event test skipped for E2E because it fires after
  // a setTimeout delay which is difficult to reliably test in E2E context.
  // The event emission is tested thoroughly in unit tests.

  it('should emit aegovModalBeforeClose event before closing', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal open><div>Content</div></aegov-modal>`);

    const modal = await page.find('aegov-modal');
    const beforeCloseEvent = await modal.spyOnEvent('aegovModalBeforeClose');

    await modal.callMethod('close');
    await page.waitForChanges();

    expect(beforeCloseEvent).toHaveReceivedEvent();
  });

  it('should emit aegovModalBackdropClick event when backdrop is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal open><div>Content</div></aegov-modal>`);

    const modal = await page.find('aegov-modal');
    const backdropClickEvent = await modal.spyOnEvent('aegovModalBackdropClick');

    const backdrop = await page.find('aegov-modal >>> .modal-backdrop');
    await backdrop.click();
    await page.waitForChanges();

    expect(backdropClickEvent).toHaveReceivedEvent();
  });

  // ============================================
  // User Interactions - Backdrop Click
  // ============================================

  it('should close modal when backdrop is clicked (default behavior)', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal open><div>Content</div></aegov-modal>`);

    // Initially open
    let backdrop = await page.find('aegov-modal >>> .modal-backdrop');
    expect(backdrop).toBeTruthy();

    // Click backdrop
    await backdrop.click();
    await page.waitForChanges();

    // Verify modal is closed or closing
    const modalEl = await page.find('aegov-modal');
    const state = await modalEl.getAttribute('data-state');
    expect(['closing', 'closed']).toContain(state);
  });

  it('should NOT close modal when backdrop is clicked if closeOnBackdropClick is false', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal open close-on-backdrop-click="false"><div>Content</div></aegov-modal>`);

    // Initially open
    let backdrop = await page.find('aegov-modal >>> .modal-backdrop');
    expect(backdrop).toBeTruthy();

    // Click backdrop
    await backdrop.click();
    await page.waitForChanges();

    // Should still be open
    backdrop = await page.find('aegov-modal >>> .modal-backdrop');
    expect(backdrop).toBeTruthy();
  });

  it('should NOT close modal when modal content is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-modal open>
        <div class="modal-inner">Content</div>
      </aegov-modal>
    `);

    // Initially open
    let backdrop = await page.find('aegov-modal >>> .modal-backdrop');
    expect(backdrop).toBeTruthy();

    // Click modal content (not backdrop)
    const content = await page.find('aegov-modal >>> .modal-content');
    await content.click();
    await page.waitForChanges();

    // Should still be open
    backdrop = await page.find('aegov-modal >>> .modal-backdrop');
    expect(backdrop).toBeTruthy();
  });

  // ============================================
  // User Interactions - Keyboard
  // ============================================

  // Note: ESC key event test skipped for E2E because keyboard events on document
  // are difficult to test reliably in Puppeteer E2E context.
  // The event emission is tested thoroughly in unit tests.

  it('should close modal when ESC key is pressed (default behavior)', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal open><div>Content</div></aegov-modal>`);

    // Initially open
    let backdrop = await page.find('aegov-modal >>> .modal-backdrop');
    expect(backdrop).toBeTruthy();

    // Press ESC
    await page.keyboard.press('Escape');
    await page.waitForChanges();

    // Verify modal is closed or closing
    const modalEl = await page.find('aegov-modal');
    const state = await modalEl.getAttribute('data-state');
    expect(['closing', 'closed']).toContain(state);
  });

  it('should NOT close modal when ESC is pressed if closeOnEscape is false', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal open close-on-escape="false"><div>Content</div></aegov-modal>`);

    // Initially open
    let backdrop = await page.find('aegov-modal >>> .modal-backdrop');
    expect(backdrop).toBeTruthy();

    // Press ESC
    await page.keyboard.press('Escape');
    await page.waitForChanges();

    // Should still be open
    backdrop = await page.find('aegov-modal >>> .modal-backdrop');
    expect(backdrop).toBeTruthy();
  });

  // ============================================
  // ARIA Attributes
  // ============================================

  it('should have role="dialog" on modal content', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal open><div>Content</div></aegov-modal>`);

    const content = await page.find('aegov-modal >>> [role="dialog"]');
    expect(content).toBeTruthy();
  });

  it('should have aria-modal="true" on modal content', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal open><div>Content</div></aegov-modal>`);

    const content = await page.find('aegov-modal >>> [aria-modal="true"]');
    expect(content).toBeTruthy();
  });

  it('should apply custom aria-label', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal open aria-label="My Modal"><div>Content</div></aegov-modal>`);

    const content = await page.find('aegov-modal >>> [aria-label="My Modal"]');
    expect(content).toBeTruthy();
  });

  it('should apply custom aria-labelledby', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-modal open aria-labelledby="modal-title">
        <h2 id="modal-title">Title</h2>
      </aegov-modal>
    `);

    const content = await page.find('aegov-modal >>> [aria-labelledby="modal-title"]');
    expect(content).toBeTruthy();
  });

  it('should apply custom aria-describedby', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-modal open aria-describedby="modal-desc">
        <p id="modal-desc">Description</p>
      </aegov-modal>
    `);

    const content = await page.find('aegov-modal >>> [aria-describedby="modal-desc"]');
    expect(content).toBeTruthy();
  });

  // ============================================
  // Pass-Through Attributes
  // ============================================

  it('should pass through id attribute', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal open id="custom-modal"><div>Content</div></aegov-modal>`);

    const content = await page.find('aegov-modal >>> #custom-modal');
    expect(content).toBeTruthy();
  });

  it('should pass through data-* attributes', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-modal open data-testid="my-modal"><div>Content</div></aegov-modal>`);

    const content = await page.find('aegov-modal >>> [data-testid="my-modal"]');
    expect(content).toBeTruthy();
  });

  it('should pass through multiple data-* attributes', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-modal open data-testid="modal" data-category="dialog">
        <div>Content</div>
      </aegov-modal>
    `);

    const content = await page.find('aegov-modal >>> [data-testid="modal"][data-category="dialog"]');
    expect(content).toBeTruthy();
  });

  // Note: Animation state tests (opening/closing) are omitted from E2E
  // because the states transition too quickly to reliably test in a real browser.
  // These states are thoroughly tested in unit tests where we have better timing control.
});
