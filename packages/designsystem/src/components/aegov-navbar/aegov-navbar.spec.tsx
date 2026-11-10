import { newSpecPage } from '@stencil/core/testing';
import { AegovNavbar } from './aegov-navbar';
import { AegovNavbarItem } from '../aegov-navbar-item/aegov-navbar-item';

describe('aegov-navbar', () => {
  it('renders nav with default label and base size', async () => {
    const page = await newSpecPage({
      components: [AegovNavbar, AegovNavbarItem],
      html: `<aegov-navbar><aegov-navbar-item href="/">Home</aegov-navbar-item></aegov-navbar>`,
    });
    const nav = page.root.querySelector('nav');
    expect(nav).not.toBeNull();
    expect(nav.getAttribute('aria-label')).toBe('Main navigation');
    expect(nav.className).toContain('aegov-navbar');
    expect(nav.className).toContain('aegov-navbar-base');
  });

  it('uses custom labelNav', async () => {
    const page = await newSpecPage({
      components: [AegovNavbar, AegovNavbarItem],
      html: `<aegov-navbar label-nav="Site nav"><aegov-navbar-item href="/">A</aegov-navbar-item></aegov-navbar>`,
    });
    expect(page.root.querySelector('nav').getAttribute('aria-label')).toBe('Site nav');
  });

  it('applies custom gap class to the list', async () => {
    const page = await newSpecPage({
      components: [AegovNavbar, AegovNavbarItem],
      html: `<aegov-navbar gap="gap-10"><aegov-navbar-item href="/">A</aegov-navbar-item></aegov-navbar>`,
    });
    const list = page.root.querySelector('.aegov-navbar-list');
    expect(list.className).toContain('gap-10');
  });

  it('cascades resolved size to child navbar items', async () => {
    const page = await newSpecPage({
      components: [AegovNavbar, AegovNavbarItem],
      html: `<aegov-navbar size="lg">
        <aegov-navbar-item href="/">A</aegov-navbar-item>
        <aegov-navbar-item href="/b">B</aegov-navbar-item>
      </aegov-navbar>`,
    });
    const items = page.root.querySelectorAll('aegov-navbar-item');
    expect((items[0] as any).size).toBe('lg');
    expect((items[1] as any).size).toBe('lg');
  });

  it('applies size class to nav element', async () => {
    const page = await newSpecPage({
      components: [AegovNavbar, AegovNavbarItem],
      html: `<aegov-navbar size="sm"><aegov-navbar-item href="/">A</aegov-navbar-item></aegov-navbar>`,
    });
    expect(page.root.querySelector('nav').className).toContain('aegov-navbar-sm');
  });

  it('renders a role="list" whose direct children are the role="listitem" item hosts', async () => {
    const page = await newSpecPage({
      components: [AegovNavbar, AegovNavbarItem],
      html: `<aegov-navbar>
        <aegov-navbar-item href="/">A</aegov-navbar-item>
        <aegov-navbar-item href="/b">B</aegov-navbar-item>
      </aegov-navbar>`,
    });
    const list = page.root.querySelector('.aegov-navbar-list');
    expect(list.getAttribute('role')).toBe('list');
    // A <ul>/<li> pair would be split by the custom-element host (A-01).
    expect(page.root.querySelector('ul, ol, li')).toBeNull();
    const items = Array.from(list.children).filter(c => c.tagName === 'AEGOV-NAVBAR-ITEM');
    expect(items.length).toBe(2);
    items.forEach(item => expect(item.getAttribute('role')).toBe('listitem'));
  });
});
