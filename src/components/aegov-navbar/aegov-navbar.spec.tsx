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

  it('applies custom gap class to ul', async () => {
    const page = await newSpecPage({
      components: [AegovNavbar, AegovNavbarItem],
      html: `<aegov-navbar gap="gap-10"><aegov-navbar-item href="/">A</aegov-navbar-item></aegov-navbar>`,
    });
    const ul = page.root.querySelector('ul');
    expect(ul.className).toContain('gap-10');
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

  it('renders ul with role list semantics', async () => {
    const page = await newSpecPage({
      components: [AegovNavbar, AegovNavbarItem],
      html: `<aegov-navbar>
        <aegov-navbar-item href="/">A</aegov-navbar-item>
        <aegov-navbar-item href="/b">B</aegov-navbar-item>
      </aegov-navbar>`,
    });
    const ul = page.root.querySelector('ul');
    expect(ul).not.toBeNull();
    expect(ul.querySelectorAll('aegov-navbar-item').length).toBe(2);
  });
});
