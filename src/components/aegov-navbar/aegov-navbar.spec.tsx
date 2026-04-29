import { newSpecPage } from '@stencil/core/testing';
import { AegovNavbar } from './aegov-navbar';
import { AegovNavbarItem } from '../aegov-navbar-item/aegov-navbar-item';

describe('aegov-navbar', () => {
  describe('rendering', () => {
    it('renders', async () => {
      const page = await newSpecPage({
        components: [AegovNavbar, AegovNavbarItem],
        html: `
          <aegov-navbar>
            <aegov-navbar-item href="/">Home</aegov-navbar-item>
          </aegov-navbar>
        `,
      });
      expect(page.root).toBeTruthy();
    });

    it('renders <nav> with default aria-label', async () => {
      const page = await newSpecPage({
        components: [AegovNavbar, AegovNavbarItem],
        html: `<aegov-navbar><aegov-navbar-item href="/">A</aegov-navbar-item></aegov-navbar>`,
      });
      const nav = page.root.querySelector('nav');
      expect(nav).toBeTruthy();
      expect(nav.getAttribute('aria-label')).toBe('Main navigation');
    });

    it('renders <ul> list with default gap class', async () => {
      const page = await newSpecPage({
        components: [AegovNavbar, AegovNavbarItem],
        html: `<aegov-navbar><aegov-navbar-item href="/">A</aegov-navbar-item></aegov-navbar>`,
      });
      const ul = page.root.querySelector('ul.aegov-navbar__list');
      expect(ul).toBeTruthy();
      expect(ul.classList.contains('gap-6')).toBe(true);
    });

    it('applies custom gap class', async () => {
      const page = await newSpecPage({
        components: [AegovNavbar, AegovNavbarItem],
        html: `<aegov-navbar gap="gap-10"><aegov-navbar-item href="/">A</aegov-navbar-item></aegov-navbar>`,
      });
      const ul = page.root.querySelector('ul.aegov-navbar__list');
      expect(ul.classList.contains('gap-10')).toBe(true);
    });

    it('applies custom navLabel', async () => {
      const page = await newSpecPage({
        components: [AegovNavbar, AegovNavbarItem],
        html: `<aegov-navbar nav-label="Site nav"><aegov-navbar-item href="/">A</aegov-navbar-item></aegov-navbar>`,
      });
      expect(page.root.querySelector('nav').getAttribute('aria-label')).toBe('Site nav');
    });

    it('applies size class on nav', async () => {
      const page = await newSpecPage({
        components: [AegovNavbar, AegovNavbarItem],
        html: `<aegov-navbar size="lg"><aegov-navbar-item href="/">A</aegov-navbar-item></aegov-navbar>`,
      });
      expect(page.root.querySelector('nav').classList.contains('aegov-navbar--lg')).toBe(true);
    });
  });

  describe('size cascading', () => {
    it('pushes size to children on load', async () => {
      const page = await newSpecPage({
        components: [AegovNavbar, AegovNavbarItem],
        html: `
          <aegov-navbar size="lg">
            <aegov-navbar-item href="/">A</aegov-navbar-item>
            <aegov-navbar-item href="/b">B</aegov-navbar-item>
          </aegov-navbar>
        `,
      });
      const items = page.root.querySelectorAll('aegov-navbar-item');
      items.forEach(item => {
        expect((item as HTMLAegovNavbarItemElement).size).toBe('lg');
      });
    });

    it('updates child sizes when parent size changes', async () => {
      const page = await newSpecPage({
        components: [AegovNavbar, AegovNavbarItem],
        html: `<aegov-navbar><aegov-navbar-item href="/">A</aegov-navbar-item></aegov-navbar>`,
      });
      const navbar = page.root as HTMLAegovNavbarElement;
      navbar.size = 'sm';
      await page.waitForChanges();
      const item = page.root.querySelector('aegov-navbar-item') as HTMLAegovNavbarItemElement;
      expect(item.size).toBe('sm');
    });
  });
});
