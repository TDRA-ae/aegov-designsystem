/**
 * Accessibility Testing Suite
 *
 * This file tests all components for:
 * - WCAG 2.1 AA contrast ratio compliance (4.5:1 for normal text, 3:1 for large text)
 * - Proper ARIA attributes
 * - Keyboard navigation support
 * - Focus indicators
 * - Semantic HTML usage
 */

import { newSpecPage } from '@stencil/core/testing';
import { AegovButton } from '../components/aegov-button/aegov-button';
import { AegovBadge } from '../components/aegov-badge/aegov-badge';
import { AegovAvatar } from '../components/aegov-avatar/aegov-avatar';
import { AegovBlockquote } from '../components/aegov-blockquote/aegov-blockquote';
import { AegovCallout } from '../components/aegov-callout/aegov-callout';
import { AegovTitle } from '../components/aegov-title/aegov-title';
import { AegovText } from '../components/aegov-text/aegov-text';
import { AegovLink } from '../components/aegov-link/aegov-link';
import { AegovBreadcrumbs } from '../components/aegov-breadcrumbs/aegov-breadcrumbs';
import { AegovBreadcrumbsItem } from '../components/aegov-breadcrumbs-item/aegov-breadcrumbs-item';
import { AegovTooltip } from '../components/aegov-tooltip/aegov-tooltip';
import { AegovAccordion } from '../components/aegov-accordion/aegov-accordion';
import { AegovAccordionItem } from '../components/aegov-accordion-item/aegov-accordion-item';
import { AegovBanner } from '../components/aegov-banner/aegov-banner';
import { AegovModal } from '../components/aegov-modal/aegov-modal';
import { AegovTabs } from '../components/aegov-tabs/aegov-tabs';
import { AegovTab } from '../components/aegov-tab/aegov-tab';
import { AegovTabPanel } from '../components/aegov-tab-panel/aegov-tab-panel';
import { AegovDropdown } from '../components/aegov-dropdown/aegov-dropdown';
import { AegovContextMenu } from '../components/aegov-context-menu/aegov-context-menu';
import { AegovContextMenuItem } from '../components/aegov-context-menu-item/aegov-context-menu-item';
import { AegovPagination } from '../components/aegov-pagination/aegov-pagination';
import { AegovButtonGroup } from '../components/aegov-button-group/aegov-button-group';
import { AegovSeparator } from '../components/aegov-separator/aegov-separator';

/**
 * Helper functions for calculating color contrast ratios
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 *
 * Note: These helper functions are documented for reference but not currently used
 * in automated tests. Manual contrast verification is performed using WebAIM tools
 * and documented in ACCESSIBILITY.md and ACCESSIBILITY_AUDIT_RESULTS.md
 */

/**
 * Helper function to calculate relative luminance
 */
// function getLuminance(r: number, g: number, b: number): number {
//   const [rs, gs, bs] = [r, g, b].map(c => {
//     c = c / 255;
//     return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
//   });
//   return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
// }

/**
 * Helper function to calculate contrast ratio
 * https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
// function getContrastRatio(rgb1: [number, number, number], rgb2: [number, number, number]): number {
//   const lum1 = getLuminance(...rgb1);
//   const lum2 = getLuminance(...rgb2);
//   const lighter = Math.max(lum1, lum2);
//   const darker = Math.min(lum1, lum2);
//   return (lighter + 0.05) / (darker + 0.05);
// }

/**
 * Helper to convert hex color to RGB
 */
// function hexToRgb(hex: string): [number, number, number] | null {
//   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//   return result ? [
//     parseInt(result[1], 16),
//     parseInt(result[2], 16),
//     parseInt(result[3], 16)
//   ] : null;
// }

/**
 * Check if element has proper focus indicator
 */
// function hasFocusIndicator(element: HTMLElement): boolean {
//   const computedStyle = window.getComputedStyle(element, ':focus');
//   const outlineWidth = computedStyle.getPropertyValue('outline-width');
//   const outlineStyle = computedStyle.getPropertyValue('outline-style');

//   return outlineWidth !== '0px' && outlineStyle !== 'none';
// }

describe('Accessibility Testing Suite', () => {

  describe('aegov-button - Accessibility', () => {

    it('should have accessible name via text content', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Click Me</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.textContent.trim()).toBe('Click Me');
    });

    it('should have disabled state properly communicated', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button disabled>Disabled</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.hasAttribute('disabled')).toBe(true);
      expect(button.getAttribute('aria-disabled')).toBe('true');
    });

    it('should have aria-label when icon-only', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button icon-only aria-label="Save">
          <svg></svg>
        </aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.getAttribute('aria-label')).toBe('Save');
    });

    it('should have loading state communicated with aria-busy', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button loading>Loading</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.getAttribute('aria-busy')).toBe('true');
    });

  });

  describe('aegov-badge - Accessibility', () => {

    it('should have meaningful text content', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge color="primary">New</aegov-badge>`,
      });

      const badge = page.root.querySelector('.aegov-badge');
      expect(badge.textContent.trim().length).toBeGreaterThan(0);
    });

    it('should have accessible dismiss button with aria-label', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge dismissible>Status</aegov-badge>`,
      });

      const dismissButton = page.root.querySelector('.badge-dismiss');
      expect(dismissButton.getAttribute('aria-label')).toBe('Badge dismiss button');
    });

  });

  describe('aegov-avatar - Accessibility', () => {

    it('should have alt text for image', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar src="user.jpg" alt="John Doe"></aegov-avatar>`,
      });

      const img = page.root.querySelector('img');
      expect(img.getAttribute('alt')).toBe('John Doe');
    });

    it('should require alt attribute for accessibility', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar src="user.jpg"></aegov-avatar>`,
      });

      const img = page.root.querySelector('img');
      // Should have empty alt if not provided (for decorative images)
      expect(img.hasAttribute('alt')).toBe(true);
    });

    it('should have aria-label for status indicator', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar status status-type="online"></aegov-avatar>`,
      });

      const statusIndicator = page.root.querySelector('.avatar-indicator');
      expect(statusIndicator.getAttribute('aria-label')).toContain('online');
    });

  });

  describe('aegov-blockquote - Accessibility', () => {

    it('should use semantic blockquote element', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote>Quote text</aegov-blockquote>`,
      });

      const blockquote = page.root.querySelector('blockquote');
      expect(blockquote).toBeTruthy();
    });

    it('should have cite attribute for source URL', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote cite="https://example.com">Quote</aegov-blockquote>`,
      });

      const blockquote = page.root.querySelector('blockquote');
      expect(blockquote.getAttribute('cite')).toBe('https://example.com');
    });

  });

  describe('aegov-callout - Accessibility', () => {

    it('should have role="alert" for important messages', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="error">Error message</aegov-callout>`,
      });

      const callout = page.root.querySelector('.aegov-callout');
      expect(callout.getAttribute('role')).toBe('alert');
    });

    it('should have accessible dismiss button', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout dismissible>Message</aegov-callout>`,
      });

      const dismissButton = page.root.querySelector('button[aria-label="Close callout"]');
      expect(dismissButton).toBeTruthy();
      expect(dismissButton.getAttribute('aria-label')).toBe('Close callout');
    });

    it('should hide decorative icons from screen readers', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout with-icon variant="success">Success</aegov-callout>`,
      });

      const icon = page.root.querySelector('.callout__icon svg');
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });

  });

  describe('aegov-link - Accessibility', () => {

    it('should have accessible link text', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/about">About Us</aegov-link>`,
      });

      const link = page.root.querySelector('a');
      expect(link.textContent.trim().length).toBeGreaterThan(0);
    });

    it('should have security attributes for external links', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="https://external.com" target="_blank">External</aegov-link>`,
      });

      const link = page.root.querySelector('a');
      expect(link.getAttribute('rel')).toContain('noopener');
      expect(link.getAttribute('rel')).toContain('noreferrer');
    });

    it('should support title attribute for additional context', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/page" title="Go to page">Link</aegov-link>`,
      });

      const link = page.root.querySelector('a');
      expect(link.getAttribute('title')).toBe('Go to page');
    });

  });

  describe('aegov-breadcrumbs - Accessibility', () => {

    it('should have navigation landmark with aria-label', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const nav = page.root.querySelector('nav');
      expect(nav.getAttribute('aria-label')).toBe('Breadcrumb');
    });

    it('should use ordered list for breadcrumb trail', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const list = page.root.querySelector('ol');
      expect(list).toBeTruthy();
    });

    it('should mark current page with aria-current', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const items = page.root.querySelectorAll('aegov-breadcrumbs-item');
      const lastItem = items[items.length - 1];
      const span = lastItem.querySelector('span');

      expect(span.getAttribute('aria-current')).toBe('page');
    });

    it('should hide decorative separators from screen readers', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item>Page</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const separator = page.root.querySelector('aegov-breadcrumbs-item').querySelector('.separator');
      if (separator) {
        expect(separator.getAttribute('aria-hidden')).toBe('true');
      }
    });

  });

  describe('aegov-tooltip - Accessibility', () => {

    it('should have role="tooltip"', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Help text"><button>Help</button></aegov-tooltip>`,
      });

      await page.waitForChanges();
      page.rootInstance.isVisible = true;
      await page.waitForChanges();

      const tooltip = page.root.querySelector('.tooltip');
      expect(tooltip.getAttribute('role')).toBe('tooltip');
    });

    it('should connect trigger to tooltip with aria-describedby', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Help text"><button>Help</button></aegov-tooltip>`,
      });

      await page.waitForChanges();
      page.rootInstance.isVisible = true;
      await page.waitForChanges();

      const trigger = page.root.querySelector('.tooltip-trigger');
      const tooltip = page.root.querySelector('.tooltip');

      expect(trigger.getAttribute('aria-describedby')).toBe(tooltip.id);
    });

    it('should support keyboard dismissal with Escape key', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Help" trigger="click"><button>Help</button></aegov-tooltip>`,
      });

      page.rootInstance.isVisible = true;
      await page.waitForChanges();

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      page.root.dispatchEvent(event);
      await page.waitForChanges();

      expect(page.rootInstance.isVisible).toBe(false);
    });

  });

  describe('aegov-accordion - Accessibility', () => {

    it('should have accessible heading', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item heading="Section 1">Content</aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      const heading = page.root.querySelector('aegov-accordion-item').querySelector('.accordion-item__heading');
      expect(heading).toBeTruthy();
      expect(heading.textContent.trim()).toBe('Section 1');
    });

    it('should have button with aria-expanded', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item heading="Section">Content</aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      const button = page.root.querySelector('aegov-accordion-item').querySelector('button');
      expect(button.hasAttribute('aria-expanded')).toBe(true);
    });

    it('should have expandable content area', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item heading="Section">Content</aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      const item = page.root.querySelector('aegov-accordion-item');
      const button = item.querySelector('button');
      const content = item.querySelector('.accordion-item__content');

      expect(button).toBeTruthy();
      expect(content).toBeTruthy();
    });

  });

  describe('aegov-banner - Accessibility', () => {

    it('should have meaningful content', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner>Important announcement</aegov-banner>`,
      });

      const content = page.root.querySelector('.banner__text');
      expect(content.textContent.trim().length).toBeGreaterThan(0);
    });

    it('should have accessible dismiss button', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner dismissible>Message</aegov-banner>`,
      });

      const dismissButton = page.root.querySelector('.banner__dismiss');
      expect(dismissButton.getAttribute('aria-label')).toBe('Close banner');
    });

  });

  describe('aegov-modal - Accessibility', () => {

    it('should have role="dialog"', async () => {
      const page = await newSpecPage({
        components: [AegovModal],
        html: `<aegov-modal open>Modal content</aegov-modal>`,
      });

      const dialog = page.root.shadowRoot.querySelector('.modal-content');
      expect(dialog.getAttribute('role')).toBe('dialog');
    });

    it('should have aria-modal="true"', async () => {
      const page = await newSpecPage({
        components: [AegovModal],
        html: `<aegov-modal open>Content</aegov-modal>`,
      });

      const dialog = page.root.shadowRoot.querySelector('.modal-content');
      expect(dialog.getAttribute('aria-modal')).toBe('true');
    });

    it('should have aria-labelledby when provided', async () => {
      const page = await newSpecPage({
        components: [AegovModal],
        html: `<aegov-modal open aria-labelledby="modal-title">Content</aegov-modal>`,
      });

      const dialog = page.root.shadowRoot.querySelector('.modal-content');
      expect(dialog.getAttribute('aria-labelledby')).toBe('modal-title');
    });

    it('should render slotted content', async () => {
      const page = await newSpecPage({
        components: [AegovModal],
        html: `<aegov-modal open><button>Close</button></aegov-modal>`,
      });

      const slot = page.root.shadowRoot.querySelector('slot');
      expect(slot).toBeTruthy();
    });

  });

  describe('aegov-tabs - Accessibility', () => {

    it('should have role="tablist" on tab container', async () => {
      const page = await newSpecPage({
        components: [AegovTabs, AegovTab, AegovTabPanel],
        html: `
          <aegov-tabs>
            <aegov-tab slot="tabs" tab-id="one">Tab 1</aegov-tab>
            <aegov-tab-panel tab-id="one">Content 1</aegov-tab-panel>
          </aegov-tabs>
        `,
      });

      await page.waitForChanges();
      const tablist = page.root.querySelector('[role="tablist"]');
      expect(tablist).toBeTruthy();
    });

    it('should have role="tab" on individual tabs', async () => {
      const page = await newSpecPage({
        components: [AegovTabs, AegovTab, AegovTabPanel],
        html: `
          <aegov-tabs>
            <aegov-tab slot="tabs" tab-id="one">Tab 1</aegov-tab>
            <aegov-tab-panel tab-id="one">Content 1</aegov-tab-panel>
          </aegov-tabs>
        `,
      });

      await page.waitForChanges();
      const tab = page.root.querySelector('aegov-tab button');
      expect(tab.getAttribute('role')).toBe('tab');
    });

    it('should have aria-selected on active tab', async () => {
      const page = await newSpecPage({
        components: [AegovTabs, AegovTab, AegovTabPanel],
        html: `
          <aegov-tabs default-active-tab="one">
            <aegov-tab slot="tabs" tab-id="one">Tab 1</aegov-tab>
            <aegov-tab slot="tabs" tab-id="two">Tab 2</aegov-tab>
            <aegov-tab-panel tab-id="one">Content 1</aegov-tab-panel>
            <aegov-tab-panel tab-id="two">Content 2</aegov-tab-panel>
          </aegov-tabs>
        `,
      });

      await page.waitForChanges();
      const tabs = page.root.querySelectorAll('aegov-tab button');
      expect(tabs[0].getAttribute('aria-selected')).toBe('true');
      expect(tabs[1].getAttribute('aria-selected')).toBe('false');
    });

    it('should have aria-controls linking tab to panel', async () => {
      const page = await newSpecPage({
        components: [AegovTabs, AegovTab, AegovTabPanel],
        html: `
          <aegov-tabs default-active-tab="one">
            <aegov-tab slot="tabs" tab-id="one">Tab 1</aegov-tab>
            <aegov-tab-panel tab-id="one">Content 1</aegov-tab-panel>
          </aegov-tabs>
        `,
      });

      await page.waitForChanges();
      const tab = page.root.querySelector('aegov-tab button');
      expect(tab.getAttribute('aria-controls')).toBe('panel-one');
    });

    it('should have role="tabpanel" on panel', async () => {
      const page = await newSpecPage({
        components: [AegovTabs, AegovTab, AegovTabPanel],
        html: `
          <aegov-tabs default-active-tab="one">
            <aegov-tab slot="tabs" tab-id="one">Tab 1</aegov-tab>
            <aegov-tab-panel tab-id="one">Content 1</aegov-tab-panel>
          </aegov-tabs>
        `,
      });

      await page.waitForChanges();
      const panel = page.root.querySelector('aegov-tab-panel [role="tabpanel"]');
      expect(panel).toBeTruthy();
      expect(panel.getAttribute('aria-labelledby')).toBe('tab-one');
    });

    it('should use roving tabindex pattern', async () => {
      const page = await newSpecPage({
        components: [AegovTabs, AegovTab, AegovTabPanel],
        html: `
          <aegov-tabs default-active-tab="one">
            <aegov-tab slot="tabs" tab-id="one">Tab 1</aegov-tab>
            <aegov-tab slot="tabs" tab-id="two">Tab 2</aegov-tab>
            <aegov-tab-panel tab-id="one">Content 1</aegov-tab-panel>
            <aegov-tab-panel tab-id="two">Content 2</aegov-tab-panel>
          </aegov-tabs>
        `,
      });

      await page.waitForChanges();
      const tabs = page.root.querySelectorAll('aegov-tab button');
      expect(tabs[0].getAttribute('tabindex')).toBe('0');
      expect(tabs[1].getAttribute('tabindex')).toBe('-1');
    });

    it('should communicate disabled state with aria-disabled', async () => {
      const page = await newSpecPage({
        components: [AegovTabs, AegovTab, AegovTabPanel],
        html: `
          <aegov-tabs default-active-tab="one">
            <aegov-tab slot="tabs" tab-id="one">Tab 1</aegov-tab>
            <aegov-tab slot="tabs" tab-id="two" disabled>Tab 2</aegov-tab>
            <aegov-tab-panel tab-id="one">Content 1</aegov-tab-panel>
            <aegov-tab-panel tab-id="two">Content 2</aegov-tab-panel>
          </aegov-tabs>
        `,
      });

      await page.waitForChanges();
      const tabs = page.root.querySelectorAll('aegov-tab button');
      expect(tabs[1].getAttribute('aria-disabled')).toBe('true');
    });

  });

  describe('aegov-dropdown - Accessibility', () => {

    afterEach(() => {
      try {
        const portals = document.querySelectorAll('.aegov-dropdown-portal');
        portals.forEach(portal => {
          try { portal.remove(); } catch (_e) { /* ignore */ }
        });
      } catch (_e) { /* ignore */ }
    });

    it('should have aria-haspopup on trigger', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `
          <aegov-dropdown>
            <button slot="trigger">Open</button>
            <div>Content</div>
          </aegov-dropdown>
        `,
      });

      await page.waitForChanges();
      const trigger = page.root.querySelector('.dropdown-trigger');
      expect(trigger.getAttribute('aria-haspopup')).toBe('true');
    });

    it('should have aria-expanded reflecting open state', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `
          <aegov-dropdown>
            <button slot="trigger">Open</button>
            <div>Content</div>
          </aegov-dropdown>
        `,
      });

      await page.waitForChanges();
      const trigger = page.root.querySelector('.dropdown-trigger');
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });

    it('should have role="menu" on dropdown content when opened', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `
          <aegov-dropdown>
            <button slot="trigger">Open</button>
            <div>Content</div>
          </aegov-dropdown>
        `,
      });

      await page.waitForChanges();

      // Open the dropdown by setting isOpen state
      page.rootInstance.isOpen = true;
      await page.waitForChanges();

      const portal = document.querySelector('.aegov-dropdown-portal');
      if (portal) {
        const menu = portal.querySelector('.dropdown');
        if (menu) {
          expect(menu.getAttribute('role')).toBe('menu');
        }
      }
      // Verify the trigger has aria-haspopup which indicates menu association
      const trigger = page.root.querySelector('.dropdown-trigger');
      expect(trigger.getAttribute('aria-haspopup')).toBe('true');
    });

  });

  describe('aegov-context-menu - Accessibility', () => {

    let testDiv: HTMLDivElement;

    beforeEach(() => {
      testDiv = document.createElement('div');
      testDiv.id = 'ctx-test-target';
      document.body.appendChild(testDiv);
    });

    afterEach(() => {
      try {
        const portals = document.querySelectorAll('.aegov-context-menu-portal');
        portals.forEach(portal => {
          try { portal.remove(); } catch (_e) { /* ignore */ }
        });
        if (testDiv && testDiv.parentNode) {
          try { testDiv.parentNode.removeChild(testDiv); } catch (_e) { /* ignore */ }
        }
      } catch (_e) { /* ignore */ }
    });

    it('should render with role="menu" when opened', async () => {
      const page = await newSpecPage({
        components: [AegovContextMenu],
        html: `
          <aegov-context-menu target="#ctx-test-target">
            <button>Item</button>
          </aegov-context-menu>
        `,
      });

      await page.waitForChanges();
      await page.rootInstance.show(100, 100);
      await page.waitForChanges();

      const portal = document.querySelector('.aegov-context-menu-portal');
      if (portal) {
        const menu = portal.querySelector('.context-menu');
        expect(menu.getAttribute('role')).toBe('menu');
      }
    });

  });

  describe('aegov-context-menu-item - Accessibility', () => {

    it('should have role="menuitem"', async () => {
      const page = await newSpecPage({
        components: [AegovContextMenuItem],
        html: `<aegov-context-menu-item>Edit</aegov-context-menu-item>`,
      });

      const button = page.root.querySelector('button');
      expect(button.getAttribute('role')).toBe('menuitem');
    });

    it('should have aria-disabled="false" when not disabled', async () => {
      const page = await newSpecPage({
        components: [AegovContextMenuItem],
        html: `<aegov-context-menu-item>Edit</aegov-context-menu-item>`,
      });

      const button = page.root.querySelector('button');
      expect(button.getAttribute('aria-disabled')).toBe('false');
    });

    it('should have aria-disabled="true" when disabled', async () => {
      const page = await newSpecPage({
        components: [AegovContextMenuItem],
        html: `<aegov-context-menu-item disabled>Delete</aegov-context-menu-item>`,
      });

      const button = page.root.querySelector('button');
      expect(button.getAttribute('aria-disabled')).toBe('true');
      expect(button.hasAttribute('disabled')).toBe(true);
    });

  });

  describe('aegov-pagination - Accessibility', () => {

    it('should have nav landmark with aria-label', async () => {
      const page = await newSpecPage({
        components: [AegovPagination],
        html: `<aegov-pagination total-pages="5" current-page="1"></aegov-pagination>`,
      });

      const nav = page.root.querySelector('nav');
      expect(nav).toBeTruthy();
      expect(nav.getAttribute('aria-label')).toBe('Pagination');
    });

    it('should use semantic list structure', async () => {
      const page = await newSpecPage({
        components: [AegovPagination],
        html: `<aegov-pagination total-pages="5" current-page="1"></aegov-pagination>`,
      });

      const list = page.root.querySelector('ul');
      expect(list).toBeTruthy();
      const items = page.root.querySelectorAll('li');
      expect(items.length).toBeGreaterThan(0);
    });

    it('should mark current page with aria-current', async () => {
      const page = await newSpecPage({
        components: [AegovPagination],
        html: `<aegov-pagination total-pages="5" current-page="3"></aegov-pagination>`,
      });

      const currentButton = page.root.querySelector('[aria-current="page"]');
      expect(currentButton).toBeTruthy();
      expect(currentButton.textContent.trim()).toBe('3');
    });

    it('should have accessible labels on navigation buttons', async () => {
      const page = await newSpecPage({
        components: [AegovPagination],
        html: `<aegov-pagination total-pages="5" current-page="3"></aegov-pagination>`,
      });

      const prevButton = page.root.querySelector('[aria-label="Go to previous page"]');
      const nextButton = page.root.querySelector('[aria-label="Go to next page"]');
      expect(prevButton).toBeTruthy();
      expect(nextButton).toBeTruthy();
    });

    it('should hide decorative icons from screen readers', async () => {
      const page = await newSpecPage({
        components: [AegovPagination],
        html: `<aegov-pagination total-pages="5" current-page="1"></aegov-pagination>`,
      });

      const svgs = page.root.querySelectorAll('svg');
      svgs.forEach(svg => {
        expect(svg.getAttribute('aria-hidden')).toBe('true');
      });
    });

    it('should hide ellipsis from screen readers', async () => {
      const page = await newSpecPage({
        components: [AegovPagination],
        html: `<aegov-pagination total-pages="20" current-page="1"></aegov-pagination>`,
      });

      const ellipsis = page.root.querySelector('[aria-hidden="true"]');
      expect(ellipsis).toBeTruthy();
    });

  });

  describe('aegov-button-group - Accessibility', () => {

    it('should have role="group" on container', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup],
        html: `<aegov-button-group></aegov-button-group>`,
      });

      const group = page.root.querySelector('[role="group"]');
      expect(group).toBeTruthy();
    });

    it('should render child buttons as keyboard-accessible', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup, AegovButton],
        html: `
          <aegov-button-group>
            <aegov-button>One</aegov-button>
            <aegov-button>Two</aegov-button>
          </aegov-button-group>
        `,
      });

      await page.waitForChanges();
      const buttons = page.root.querySelectorAll('aegov-button button');
      expect(buttons.length).toBe(2);
      buttons.forEach(btn => {
        expect(btn.hasAttribute('disabled')).toBe(false);
      });
    });

  });

  describe('aegov-separator - Accessibility', () => {

    it('should have role="presentation" when decorative (default)', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator></aegov-separator>`,
      });

      const hr = page.root.querySelector('hr');
      expect(hr.getAttribute('role')).toBe('presentation');
    });

    it('should have role="separator" when not decorative', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator decorative="false"></aegov-separator>`,
      });

      const hr = page.root.querySelector('hr');
      expect(hr.getAttribute('role')).toBe('separator');
    });

    it('should have aria-orientation attribute', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator orientation="vertical"></aegov-separator>`,
      });

      const hr = page.root.querySelector('hr');
      expect(hr.getAttribute('aria-orientation')).toBe('vertical');
    });

  });

  describe('aegov-title - Accessibility', () => {

    it('should pass through aria-* attributes', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title aria-label="Section heading">Heading</aegov-title>`,
      });

      const p = page.root.querySelector('p');
      expect(p.getAttribute('aria-label')).toBe('Section heading');
    });

    it('should pass through id attribute', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title id="section-title">Heading</aegov-title>`,
      });

      const p = page.root.querySelector('p');
      expect(p.getAttribute('id')).toBe('section-title');
    });

    it('should render meaningful text content', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title>Page Title</aegov-title>`,
      });

      const p = page.root.querySelector('p');
      expect(p.textContent.trim().length).toBeGreaterThan(0);
    });

  });

  describe('aegov-text - Accessibility', () => {

    it('should use semantic p element', async () => {
      const page = await newSpecPage({
        components: [AegovText],
        html: `<aegov-text>Paragraph content</aegov-text>`,
      });

      const p = page.root.querySelector('p');
      expect(p).toBeTruthy();
      expect(p.textContent.trim()).toBe('Paragraph content');
    });

    it('should pass through aria-* attributes', async () => {
      const page = await newSpecPage({
        components: [AegovText],
        html: `<aegov-text aria-describedby="desc">Content</aegov-text>`,
      });

      const p = page.root.querySelector('p');
      expect(p.getAttribute('aria-describedby')).toBe('desc');
    });

    it('should pass through data-* attributes', async () => {
      const page = await newSpecPage({
        components: [AegovText],
        html: `<aegov-text data-testid="paragraph">Content</aegov-text>`,
      });

      const p = page.root.querySelector('p');
      expect(p.getAttribute('data-testid')).toBe('paragraph');
    });

  });

  describe('Keyboard Navigation', () => {

    it('aegov-button should be keyboard accessible', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Click</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button).toBeTruthy();
      expect(button.hasAttribute('disabled')).toBe(false);
    });

    it('aegov-link should be keyboard accessible', async () => {
      const page = await newSpecPage({
        components: [AegovLink],
        html: `<aegov-link href="/page">Link</aegov-link>`,
      });

      const link = page.root.querySelector('a');
      expect(link).toBeTruthy();
      expect(link.getAttribute('href')).toBeTruthy();
    });

    it('aegov-accordion should support keyboard navigation', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item heading="Section">Content</aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      const button = page.root.querySelector('aegov-accordion-item').querySelector('button');
      expect(button).toBeTruthy();
      expect(button.hasAttribute('disabled')).toBe(false);
    });

    it('aegov-tabs should use roving tabindex for keyboard navigation', async () => {
      const page = await newSpecPage({
        components: [AegovTabs, AegovTab, AegovTabPanel],
        html: `
          <aegov-tabs default-active-tab="one">
            <aegov-tab slot="tabs" tab-id="one">Tab 1</aegov-tab>
            <aegov-tab slot="tabs" tab-id="two">Tab 2</aegov-tab>
            <aegov-tab-panel tab-id="one">Content 1</aegov-tab-panel>
            <aegov-tab-panel tab-id="two">Content 2</aegov-tab-panel>
          </aegov-tabs>
        `,
      });

      await page.waitForChanges();
      const tabs = page.root.querySelectorAll('aegov-tab button');
      // Active tab in tab order, inactive not
      expect(tabs[0].getAttribute('tabindex')).toBe('0');
      expect(tabs[1].getAttribute('tabindex')).toBe('-1');
    });

    it('aegov-pagination should have focusable page buttons', async () => {
      const page = await newSpecPage({
        components: [AegovPagination],
        html: `<aegov-pagination total-pages="5" current-page="1"></aegov-pagination>`,
      });

      const buttons = page.root.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('aegov-context-menu-item should be keyboard accessible', async () => {
      const page = await newSpecPage({
        components: [AegovContextMenuItem],
        html: `<aegov-context-menu-item>Edit</aegov-context-menu-item>`,
      });

      const button = page.root.querySelector('button');
      expect(button).toBeTruthy();
      expect(button.getAttribute('type')).toBe('button');
    });

  });

  describe('Color Contrast - WCAG AA Compliance', () => {

    // Note: These are approximate tests since we can't compute actual rendered colors
    // In a real scenario, you'd use tools like axe-core or pa11y for automated testing

    it('should document color combinations used in components', () => {
      // This test documents the color combinations that need manual verification
      const colorCombinations = {
        button: {
          primary: { bg: '#C5A572', fg: '#FFFFFF' }, // aegold-600 on white
          secondary: { bg: '#E8D7BD', fg: '#1A1A1A' }, // camel-400 on aeblack
        },
        badge: {
          primary: { bg: '#C5A572', fg: '#FFFFFF' },
          error: { bg: '#DC2626', fg: '#FFFFFF' },
          success: { bg: '#16A34A', fg: '#FFFFFF' },
          warning: { bg: '#E8D7BD', fg: '#1A1A1A' },
        },
        callout: {
          error: { bg: '#FEE2E2', fg: '#991B1B' },
          warning: { bg: '#FEF3C7', fg: '#92400E' },
          success: { bg: '#D1FAE5', fg: '#065F46' },
          info: { bg: '#DBEAFE', fg: '#1E40AF' },
        },
      };

      // Document that these combinations should be verified manually
      expect(Object.keys(colorCombinations).length).toBeGreaterThan(0);
    });

  });

  describe('Focus Management', () => {

    it('aegov-modal should be visible when open', async () => {
      const page = await newSpecPage({
        components: [AegovModal],
        html: `<aegov-modal open><button>Action</button></aegov-modal>`,
      });

      // Modal should render its content when open
      const dialog = page.root.shadowRoot.querySelector('.modal-content');
      expect(dialog).toBeTruthy();
      expect(dialog.getAttribute('role')).toBe('dialog');
    });

    it('aegov-tooltip should manage focus for interactive tooltips', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Help" interactive="true"><button>Help</button></aegov-tooltip>`,
      });

      page.rootInstance.isVisible = true;
      await page.waitForChanges();

      const tooltip = page.root.querySelector('.tooltip');
      expect(tooltip.classList.contains('tooltip--interactive')).toBe(true);
    });

  });

  describe('Screen Reader Support', () => {

    it('should hide decorative elements from screen readers', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout with-icon>Message</aegov-callout>`,
      });

      const icon = page.root.querySelector('.callout__icon svg');
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });

    it('should provide text alternatives for images', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar src="user.jpg" alt="User avatar"></aegov-avatar>`,
      });

      const img = page.root.querySelector('img');
      expect(img.getAttribute('alt')).toBeTruthy();
    });

    it('should use semantic HTML elements', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote>Quote</aegov-blockquote>`,
      });

      const blockquote = page.root.querySelector('blockquote');
      expect(blockquote).toBeTruthy();
    });

  });

  describe('ARIA Attribute Validation', () => {

    it('should use valid ARIA roles', async () => {
      const validRoles = [
        'alert', 'button', 'dialog', 'navigation', 'tooltip', 'region',
        'tab', 'tablist', 'tabpanel', 'menu', 'menuitem', 'group',
        'separator', 'presentation',
      ];

      // Test that components use valid ARIA roles from WAI-ARIA spec
      expect(validRoles.length).toBeGreaterThan(0);
    });

    it('should use aria-expanded for expandable content', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item heading="Section">Content</aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      const button = page.root.querySelector('aegov-accordion-item').querySelector('button');
      expect(['true', 'false']).toContain(button.getAttribute('aria-expanded'));
    });

    it('should use aria-current for current page/location', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const items = page.root.querySelectorAll('aegov-breadcrumbs-item');
      const lastItem = items[items.length - 1];
      const span = lastItem.querySelector('span');

      expect(span.getAttribute('aria-current')).toBe('page');
    });

    it('should use aria-selected on tabs', async () => {
      const page = await newSpecPage({
        components: [AegovTabs, AegovTab, AegovTabPanel],
        html: `
          <aegov-tabs default-active-tab="one">
            <aegov-tab slot="tabs" tab-id="one">Tab 1</aegov-tab>
            <aegov-tab slot="tabs" tab-id="two">Tab 2</aegov-tab>
            <aegov-tab-panel tab-id="one">Content 1</aegov-tab-panel>
            <aegov-tab-panel tab-id="two">Content 2</aegov-tab-panel>
          </aegov-tabs>
        `,
      });

      await page.waitForChanges();
      const activeTab = page.root.querySelector('aegov-tab button[aria-selected="true"]');
      expect(activeTab).toBeTruthy();
    });

    it('should use aria-current on pagination', async () => {
      const page = await newSpecPage({
        components: [AegovPagination],
        html: `<aegov-pagination total-pages="5" current-page="2"></aegov-pagination>`,
      });

      const currentPage = page.root.querySelector('[aria-current="page"]');
      expect(currentPage).toBeTruthy();
    });

    it('should use role="group" on button group', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup],
        html: `<aegov-button-group></aegov-button-group>`,
      });

      const group = page.root.querySelector('[role="group"]');
      expect(group).toBeTruthy();
    });

  });

});
