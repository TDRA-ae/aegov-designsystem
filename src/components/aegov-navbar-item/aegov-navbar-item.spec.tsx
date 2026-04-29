import { newSpecPage } from '@stencil/core/testing';
import { AegovNavbar } from '../aegov-navbar/aegov-navbar';
import { AegovNavbarItem } from './aegov-navbar-item';

describe('aegov-navbar-item', () => {
  describe('rendering', () => {
    it('renders <a> when href is set', async () => {
      const page = await newSpecPage({
        components: [AegovNavbar, AegovNavbarItem],
        html: `<aegov-navbar><aegov-navbar-item href="/x">X</aegov-navbar-item></aegov-navbar>`,
      });
      const link = page.root.querySelector('aegov-navbar-item a.aegov-navbar-item__link');
      expect(link).toBeTruthy();
      expect((link as HTMLAnchorElement).getAttribute('href')).toBe('/x');
    });

    it('renders <span> when href is missing', async () => {
      const page = await newSpecPage({
        components: [AegovNavbar, AegovNavbarItem],
        html: `<aegov-navbar><aegov-navbar-item>X</aegov-navbar-item></aegov-navbar>`,
      });
      const link = page.root.querySelector('aegov-navbar-item span.aegov-navbar-item__link');
      expect(link).toBeTruthy();
      expect(page.root.querySelector('aegov-navbar-item a.aegov-navbar-item__link')).toBeNull();
    });

    it('sets aria-current="page" when active', async () => {
      const page = await newSpecPage({
        components: [AegovNavbar, AegovNavbarItem],
        html: `<aegov-navbar><aegov-navbar-item href="/x" active>X</aegov-navbar-item></aegov-navbar>`,
      });
      const link = page.root.querySelector('aegov-navbar-item a.aegov-navbar-item__link');
      expect(link.getAttribute('aria-current')).toBe('page');
    });

    it('omits aria-current when not active', async () => {
      const page = await newSpecPage({
        components: [AegovNavbar, AegovNavbarItem],
        html: `<aegov-navbar><aegov-navbar-item href="/x">X</aegov-navbar-item></aegov-navbar>`,
      });
      const link = page.root.querySelector('aegov-navbar-item a.aegov-navbar-item__link');
      expect(link.getAttribute('aria-current')).toBeNull();
    });

    it('renders disabled span with aria-disabled', async () => {
      const page = await newSpecPage({
        components: [AegovNavbar, AegovNavbarItem],
        html: `<aegov-navbar><aegov-navbar-item href="/x" disabled>X</aegov-navbar-item></aegov-navbar>`,
      });
      expect(page.root.querySelector('aegov-navbar-item a.aegov-navbar-item__link')).toBeNull();
      const span = page.root.querySelector('aegov-navbar-item span.aegov-navbar-item__link');
      expect(span).toBeTruthy();
      expect(span.getAttribute('aria-disabled')).toBe('true');
    });

    it('applies size class to <li>', async () => {
      const page = await newSpecPage({
        components: [AegovNavbar, AegovNavbarItem],
        html: `<aegov-navbar size="sm"><aegov-navbar-item href="/x">X</aegov-navbar-item></aegov-navbar>`,
      });
      const li = page.root.querySelector('aegov-navbar-item li');
      expect(li.classList.contains('aegov-navbar-item--sm')).toBe(true);
    });

    it('renders icon-start slot wrapper when icon is present', async () => {
      const page = await newSpecPage({
        components: [AegovNavbar, AegovNavbarItem],
        html: `
          <aegov-navbar>
            <aegov-navbar-item href="/x">
              <svg slot="icon-start"></svg>
              X
            </aegov-navbar-item>
          </aegov-navbar>
        `,
      });
      const iconWrap = page.root.querySelector('aegov-navbar-item .aegov-navbar-item__icon');
      expect(iconWrap).toBeTruthy();
    });

    it('omits icon wrapper when no icon-start slot', async () => {
      const page = await newSpecPage({
        components: [AegovNavbar, AegovNavbarItem],
        html: `<aegov-navbar><aegov-navbar-item href="/x">X</aegov-navbar-item></aegov-navbar>`,
      });
      expect(page.root.querySelector('aegov-navbar-item .aegov-navbar-item__icon')).toBeNull();
    });

    it('marks li with --has-dropdown when aegov-dropdown is slotted', async () => {
      const page = await newSpecPage({
        components: [AegovNavbar, AegovNavbarItem],
        html: `
          <aegov-navbar>
            <aegov-navbar-item href="/x">
              X
              <aegov-dropdown slot="dropdown"></aegov-dropdown>
            </aegov-navbar-item>
          </aegov-navbar>
        `,
      });
      const li = page.root.querySelector('aegov-navbar-item li');
      expect(li.classList.contains('aegov-navbar-item--has-dropdown')).toBe(true);
    });

    it('does not render --has-dropdown when no dropdown slotted', async () => {
      const page = await newSpecPage({
        components: [AegovNavbar, AegovNavbarItem],
        html: `<aegov-navbar><aegov-navbar-item href="/x">X</aegov-navbar-item></aegov-navbar>`,
      });
      const li = page.root.querySelector('aegov-navbar-item li');
      expect(li.classList.contains('aegov-navbar-item--has-dropdown')).toBe(false);
    });
  });
});
