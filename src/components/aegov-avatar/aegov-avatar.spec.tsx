import { newSpecPage } from '@stencil/core/testing';
import { AegovAvatar } from './aegov-avatar';

describe('aegov-avatar', () => {
  // ------------------------------------------------------------------ rendering
  describe('rendering', () => {
    it('renders the component', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar></aegov-avatar>`,
      });
      expect(page.root).toBeTruthy();
    });

    it('renders avatar container with aegov-avatar class', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar).not.toBeNull();
    });

    it('renders image when src is provided', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar src="https://example.com/avatar.jpg" alt="User Name"></aegov-avatar>`,
      });
      const img = page.root.querySelector('img');
      expect(img).toBeTruthy();
      expect(img.getAttribute('src')).toBe('https://example.com/avatar.jpg');
      expect(img.getAttribute('alt')).toBe('User Name');
    });

    it('renders fallback icon when no src', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar></aegov-avatar>`,
      });
      const fallback = page.root.querySelector('.avatar-fallback');
      expect(fallback).toBeTruthy();
      const icon = page.root.querySelector('.avatar-icon');
      expect(icon).toBeTruthy();
    });

    it('renders slot content when no src', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar><span id="custom">AB</span></aegov-avatar>`,
      });
      const custom = page.root.querySelector('#custom');
      expect(custom).toBeTruthy();
      expect(custom.textContent).toBe('AB');
    });
  });

  // ------------------------------------------------------------------ default props
  describe('default props', () => {
    it('defaults size to base', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar></aegov-avatar>`,
      });
      expect(page.rootInstance.size).toBe('base');
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-base')).toBe(true);
    });

    it('defaults variant to square', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar></aegov-avatar>`,
      });
      expect(page.rootInstance.appearance).toBe('square');
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-rounded')).toBe(false);
    });

    it('defaults status to none', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar></aegov-avatar>`,
      });
      expect(page.rootInstance.status).toBe('none');
    });
  });

  // ------------------------------------------------------------------ sizes
  describe('sizes', () => {
    const sizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'];
    sizes.forEach(size => {
      it(`applies avatar-${size} class for size=${size}`, async () => {
        const page = await newSpecPage({
          components: [AegovAvatar],
          html: `<aegov-avatar size="${size}"></aegov-avatar>`,
        });
        const avatar = page.root.querySelector('.aegov-avatar');
        expect(avatar.classList.contains(`avatar-${size}`)).toBe(true);
      });
    });
  });

  // ------------------------------------------------------------------ variants
  describe('variants', () => {
    it('does not apply avatar-rounded for square variant', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar appearance="square"></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-rounded')).toBe(false);
    });

    it('applies avatar-rounded for rounded variant', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar appearance="rounded"></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-rounded')).toBe(true);
    });
  });

  // ------------------------------------------------------------------ status indicator
  describe('status indicator', () => {
    it('does not render status indicator by default', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar></aegov-avatar>`,
      });
      const indicator = page.root.querySelector('.avatar-indicator');
      expect(indicator).toBeNull();
    });

    it('renders status indicator when status is online', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar status="online"></aegov-avatar>`,
      });
      const indicator = page.root.querySelector('.avatar-indicator');
      expect(indicator).toBeTruthy();
    });

    it('renders online status class', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar status="online"></aegov-avatar>`,
      });
      const indicator = page.root.querySelector('.avatar-indicator');
      expect(indicator.classList.contains('avatar-online')).toBe(true);
    });

    it('renders offline status class', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar status="offline"></aegov-avatar>`,
      });
      const indicator = page.root.querySelector('.avatar-indicator');
      expect(indicator.classList.contains('avatar-offline')).toBe(true);
    });

    it('does not render status when status is none', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar status="none"></aegov-avatar>`,
      });
      const indicator = page.root.querySelector('.avatar-indicator');
      expect(indicator).toBeNull();
    });

    it('has aria-label on status indicator', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar status="online"></aegov-avatar>`,
      });
      const indicator = page.root.querySelector('.avatar-indicator');
      expect(indicator.getAttribute('aria-label')).toBe('Status: online');
    });
  });

  // ------------------------------------------------------------------ accessibility
  describe('accessibility', () => {
    it('has role="img" on avatar container', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.getAttribute('role')).toBe('img');
    });

    it('uses alt text as aria-label when provided', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar alt="John Doe"></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.getAttribute('aria-label')).toBe('John Doe');
    });

    it('uses default aria-label when no alt', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.getAttribute('aria-label')).toBe('User avatar');
    });
  });

  // ------------------------------------------------------------------ image error
  describe('image error handling', () => {
    it('shows fallback when image fails to load', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar src="https://example.com/broken.jpg"></aegov-avatar>`,
      });
      expect(page.root.querySelector('img')).toBeTruthy();

      page.rootInstance['handleImageError']();
      await page.waitForChanges();

      expect(page.root.querySelector('.avatar-fallback')).toBeTruthy();
    });

    it('adds no-user class when image errors', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar src="https://example.com/broken.jpg"></aegov-avatar>`,
      });
      page.rootInstance['handleImageError']();
      await page.waitForChanges();

      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('no-user')).toBe(true);
    });

    it('adds no-user class when no src', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('no-user')).toBe(true);
    });
  });

  // ------------------------------------------------------------------ combinations
  describe('combinations', () => {
    it('renders rounded avatar with status', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar appearance="rounded" status="online"></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-rounded')).toBe(true);
      expect(page.root.querySelector('.avatar-indicator')).toBeTruthy();
    });

    it('renders large rounded avatar with image and offline status', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar size="lg" appearance="rounded" src="https://example.com/avatar.jpg" status="offline"></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-lg')).toBe(true);
      expect(avatar.classList.contains('avatar-rounded')).toBe(true);
      expect(page.root.querySelector('img')).toBeTruthy();
      const indicator = page.root.querySelector('.avatar-indicator');
      expect(indicator.classList.contains('avatar-offline')).toBe(true);
    });
  });

  // ------------------------------------------------------------------ dynamic props
  describe('dynamic props', () => {
    it('updates when size changes', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar size="sm"></aegov-avatar>`,
      });
      let avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-sm')).toBe(true);

      page.root.setAttribute('size', 'lg');
      await page.waitForChanges();

      avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-lg')).toBe(true);
    });

    it('updates when variant changes', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar appearance="square"></aegov-avatar>`,
      });
      let avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-rounded')).toBe(false);

      page.root.setAttribute('appearance', 'rounded');
      await page.waitForChanges();

      avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-rounded')).toBe(true);
    });
  });

  describe('invalid prop values', () => {
    let warnSpy: jest.SpyInstance;

    beforeEach(() => {
      warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    });

    afterEach(() => {
      warnSpy.mockRestore();
    });

    it('falls back to default size class when invalid', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar size="huge"></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.className).toContain('avatar-base');
    });

    it('falls back to default variant when invalid', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar appearance="weird"></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-rounded')).toBe(false);
    });

    it('warns with component name, prop name, invalid value, and fallback', async () => {
      await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar size="huge"></aegov-avatar>`,
      });
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const warn = messages.find(m => m.includes('"size"'));
      expect(warn).toBeDefined();
      expect(warn).toContain('[aegov-avatar]');
      expect(warn).toContain('"huge"');
      expect(warn).toContain('base');
    });

    it('does not warn when all props are valid', async () => {
      await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar size="lg" appearance="rounded"></aegov-avatar>`,
      });
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('warns again via @Watch when size is updated to invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar size="base"></aegov-avatar>`,
      });
      page.root.setAttribute('size', 'nope');
      await page.waitForChanges();
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const warn = messages.find(m => m.includes('[aegov-avatar]') && m.includes('"size"'));
      expect(warn).toBeDefined();
    });

    it('warns again via @Watch when variant is updated to invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar appearance="square"></aegov-avatar>`,
      });
      page.root.setAttribute('appearance', 'nope');
      await page.waitForChanges();
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const warn = messages.find(m => m.includes('[aegov-avatar]') && m.includes('"appearance"'));
      expect(warn).toBeDefined();
    });
  });
});
