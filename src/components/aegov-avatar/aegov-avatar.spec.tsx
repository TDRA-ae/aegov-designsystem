import { newSpecPage } from '@stencil/core/testing';
import { AegovAvatar } from './aegov-avatar';

describe('aegov-avatar', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar></aegov-avatar>`,
      });
      expect(page.root).toBeTruthy();
    });

    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-base')).toBe(true);
      expect(avatar.classList.contains('avatar-rounded')).toBe(false);
    });

    it('should render with image src', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar src="https://example.com/avatar.jpg" alt="User Name"></aegov-avatar>`,
      });
      const img = page.root.querySelector('img');
      expect(img).toBeTruthy();
      expect(img.getAttribute('src')).toBe('https://example.com/avatar.jpg');
      expect(img.getAttribute('alt')).toBe('User Name');
    });

    it('should render fallback when no src provided', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar></aegov-avatar>`,
      });
      const fallback = page.root.querySelector('.avatar-fallback');
      expect(fallback).toBeTruthy();
      const icon = page.root.querySelector('.avatar-icon');
      expect(icon).toBeTruthy();
    });

    it('should render slot content when no src provided', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar><span id="custom">AB</span></aegov-avatar>`,
      });
      const customContent = page.root.querySelector('#custom');
      expect(customContent).toBeTruthy();
      expect(customContent.textContent).toBe('AB');
    });
  });

  describe('sizes', () => {
    it('should render xs size', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar size="xs"></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-xs')).toBe(true);
    });

    it('should render sm size', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar size="sm"></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-sm')).toBe(true);
    });

    it('should render base size (default)', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar size="base"></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-base')).toBe(true);
    });

    it('should render lg size', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar size="lg"></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-lg')).toBe(true);
    });

    it('should render xl size', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar size="xl"></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-xl')).toBe(true);
    });

    it('should render 2xl size', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar size="2xl"></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-2xl')).toBe(true);
    });

    it('should render 3xl size', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar size="3xl"></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-3xl')).toBe(true);
    });
  });

  describe('variants', () => {
    it('should render square variant (default)', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar variant="square"></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-rounded')).toBe(false);
    });

    it('should render rounded variant', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar variant="rounded"></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-rounded')).toBe(true);
    });
  });

  describe('status indicator', () => {
    it('should not render status indicator by default', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar></aegov-avatar>`,
      });
      const indicator = page.root.querySelector('.avatar-indicator');
      expect(indicator).toBeNull();
    });

    it('should render status indicator when status is true', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar status="true"></aegov-avatar>`,
      });
      const indicator = page.root.querySelector('.avatar-indicator');
      expect(indicator).toBeTruthy();
    });

    it('should render online status', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar status="true" status-type="online"></aegov-avatar>`,
      });
      const indicator = page.root.querySelector('.avatar-indicator');
      expect(indicator).toBeTruthy();
      expect(indicator.classList.contains('avatar-online')).toBe(true);
    });

    it('should render offline status', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar status="true" status-type="offline"></aegov-avatar>`,
      });
      const indicator = page.root.querySelector('.avatar-indicator');
      expect(indicator).toBeTruthy();
      expect(indicator.classList.contains('avatar-offline')).toBe(true);
    });

    it('should not render status indicator when statusType is none', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar status="true" status-type="none"></aegov-avatar>`,
      });
      const indicator = page.root.querySelector('.avatar-indicator');
      expect(indicator).toBeNull();
    });

    it('should have aria-label on status indicator', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar status="true" status-type="online"></aegov-avatar>`,
      });
      const indicator = page.root.querySelector('.avatar-indicator');
      expect(indicator.getAttribute('aria-label')).toBe('Status: online');
    });
  });

  describe('accessibility', () => {
    it('should have role="img" on avatar container', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.getAttribute('role')).toBe('img');
    });

    it('should have aria-label when alt is provided', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar alt="John Doe"></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.getAttribute('aria-label')).toBe('John Doe');
    });

    it('should have default aria-label when no alt provided', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.getAttribute('aria-label')).toBe('User avatar');
    });
  });

  describe('image error handling', () => {
    it('should show fallback when image fails to load', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar src="https://example.com/broken.jpg"></aegov-avatar>`,
      });

      const img = page.root.querySelector('img');
      expect(img).toBeTruthy();

      // Simulate image error
      const component = page.rootInstance as AegovAvatar;
      component['handleImageError']();
      await page.waitForChanges();

      const fallback = page.root.querySelector('.avatar-fallback');
      expect(fallback).toBeTruthy();
    });

    it('should add no-user class when image errors', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar src="https://example.com/broken.jpg"></aegov-avatar>`,
      });

      // Simulate image error
      const component = page.rootInstance as AegovAvatar;
      component['handleImageError']();
      await page.waitForChanges();

      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('no-user')).toBe(true);
    });
  });

  describe('combinations', () => {
    it('should render rounded avatar with status', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar variant="rounded" status="true" status-type="online"></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-rounded')).toBe(true);
      const indicator = page.root.querySelector('.avatar-indicator');
      expect(indicator).toBeTruthy();
    });

    it('should render large rounded avatar with image and status', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar size="lg" variant="rounded" src="https://example.com/avatar.jpg" status="true" status-type="offline"></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-lg')).toBe(true);
      expect(avatar.classList.contains('avatar-rounded')).toBe(true);

      const img = page.root.querySelector('img');
      expect(img).toBeTruthy();

      const indicator = page.root.querySelector('.avatar-indicator');
      expect(indicator).toBeTruthy();
      expect(indicator.classList.contains('avatar-offline')).toBe(true);
    });

    it('should render xs square avatar without status', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar size="xs" variant="square"></aegov-avatar>`,
      });
      const avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-xs')).toBe(true);
      expect(avatar.classList.contains('avatar-rounded')).toBe(false);

      const indicator = page.root.querySelector('.avatar-indicator');
      expect(indicator).toBeNull();
    });
  });

  describe('dynamic props', () => {
    it('should update when size changes', async () => {
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
      expect(avatar.classList.contains('avatar-sm')).toBe(false);
    });

    it('should update when variant changes', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar variant="square"></aegov-avatar>`,
      });

      let avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-rounded')).toBe(false);

      page.root.setAttribute('variant', 'rounded');
      await page.waitForChanges();

      avatar = page.root.querySelector('.aegov-avatar');
      expect(avatar.classList.contains('avatar-rounded')).toBe(true);
    });

    it('should update when status changes', async () => {
      const page = await newSpecPage({
        components: [AegovAvatar],
        html: `<aegov-avatar></aegov-avatar>`,
      });

      let indicator = page.root.querySelector('.avatar-indicator');
      expect(indicator).toBeNull();

      page.root.setAttribute('status', 'true');
      await page.waitForChanges();

      indicator = page.root.querySelector('.avatar-indicator');
      expect(indicator).toBeTruthy();
    });
  });
});
