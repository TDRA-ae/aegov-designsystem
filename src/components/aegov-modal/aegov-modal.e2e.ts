import { newE2EPage } from '@stencil/core/testing';

describe('aegov-modal E2E', () => {
  describe('rendering', () => {
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
  });

  describe('position variants', () => {
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
  });

  describe('backdrop opacity variants', () => {
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
  });

  describe('public methods', () => {
    it('should open modal via show() method', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-modal><div>Content</div></aegov-modal>`);

      const modal = await page.find('aegov-modal');

      let backdrop = await page.find('aegov-modal >>> .modal-backdrop');
      expect(backdrop).toBeNull();

      await modal.callMethod('show');
      await page.waitForChanges();

      backdrop = await page.find('aegov-modal >>> .modal-backdrop');
      expect(backdrop).toBeTruthy();
    });

    it('should close modal via close() method', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-modal open><div>Content</div></aegov-modal>`);

      const modal = await page.find('aegov-modal');

      let backdrop = await page.find('aegov-modal >>> .modal-backdrop');
      expect(backdrop).toBeTruthy();

      await modal.callMethod('close');
      await page.waitForChanges();

      const modalState = await modal.getAttribute('data-state');
      expect(['closing', 'closed']).toContain(modalState);
    });

    it('should toggle modal via toggle() method', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-modal><div>Content</div></aegov-modal>`);

      const modal = await page.find('aegov-modal');

      let backdrop = await page.find('aegov-modal >>> .modal-backdrop');
      expect(backdrop).toBeNull();

      await modal.callMethod('toggle');
      await page.waitForChanges();
      backdrop = await page.find('aegov-modal >>> .modal-backdrop');
      expect(backdrop).toBeTruthy();

      await modal.callMethod('toggle');
      await page.waitForChanges();
      await new Promise(resolve => setTimeout(resolve, 350));
      await page.waitForChanges();

      const modalState = await modal.getAttribute('data-state');
      expect(['closing', 'closed', null]).toContain(modalState);
    });
  });

  describe('events', () => {
    it('should emit aegovModalOpen event when opened', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-modal><div>Content</div></aegov-modal>`);

      const modal = await page.find('aegov-modal');
      const openEvent = await modal.spyOnEvent('aegovModalOpen');

      await modal.callMethod('show');
      await page.waitForChanges();

      expect(openEvent).toHaveReceivedEvent();
    });

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
  });

  describe('backdrop click', () => {
    it('should close modal when backdrop is clicked', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-modal open><div>Content</div></aegov-modal>`);

      let backdrop = await page.find('aegov-modal >>> .modal-backdrop');
      expect(backdrop).toBeTruthy();

      await backdrop.click();
      await page.waitForChanges();

      const modalEl = await page.find('aegov-modal');
      const state = await modalEl.getAttribute('data-state');
      expect(['closing', 'closed']).toContain(state);
    });

    it('should NOT close modal when closeWithBackdrop is false', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-modal open close-with-backdrop="false"><div>Content</div></aegov-modal>`);

      let backdrop = await page.find('aegov-modal >>> .modal-backdrop');
      expect(backdrop).toBeTruthy();

      await backdrop.click();
      await page.waitForChanges();

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

      let backdrop = await page.find('aegov-modal >>> .modal-backdrop');
      expect(backdrop).toBeTruthy();

      const content = await page.find('aegov-modal >>> .modal-content');
      await content.click();
      await page.waitForChanges();

      backdrop = await page.find('aegov-modal >>> .modal-backdrop');
      expect(backdrop).toBeTruthy();
    });
  });

  describe('keyboard', () => {
    it('should close modal when ESC key is pressed', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-modal open><div>Content</div></aegov-modal>`);

      let backdrop = await page.find('aegov-modal >>> .modal-backdrop');
      expect(backdrop).toBeTruthy();

      await page.keyboard.press('Escape');
      await page.waitForChanges();

      const modalEl = await page.find('aegov-modal');
      const state = await modalEl.getAttribute('data-state');
      expect(['closing', 'closed']).toContain(state);
    });
  });

  describe('accessibility', () => {
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
  });

  describe('pass-through attributes', () => {
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
  });
});
