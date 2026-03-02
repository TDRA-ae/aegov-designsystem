import { newE2EPage } from '@stencil/core/testing';

describe('aegov-avatar E2E', () => {
  const testImageSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

  describe('rendering', () => {
    it('should render', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar></aegov-avatar>');
      const element = await page.find('aegov-avatar');
      expect(element).toBeTruthy();
      expect(element).toHaveClass('hydrated');
    });

    it('should render avatar container', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar></aegov-avatar>');
      const avatar = await page.find('aegov-avatar .aegov-avatar');
      expect(avatar).toBeTruthy();
    });

    it('should render with image', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-avatar src="${testImageSrc}" alt="Test User"></aegov-avatar>`);
      const img = await page.find('aegov-avatar img');
      expect(img).toBeTruthy();
    });

    it('should render fallback when no src', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar></aegov-avatar>');
      const fallback = await page.find('aegov-avatar .avatar-fallback');
      expect(fallback).toBeTruthy();
      const icon = await page.find('aegov-avatar .avatar-icon');
      expect(icon).toBeTruthy();
    });
  });

  describe('sizes', () => {
    const sizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'];
    sizes.forEach(size => {
      it(`should apply avatar-${size} class`, async () => {
        const page = await newE2EPage();
        await page.setContent(`<aegov-avatar size="${size}"></aegov-avatar>`);
        const avatar = await page.find('aegov-avatar .aegov-avatar');
        const classes = await avatar.getProperty('className');
        expect(classes).toContain(`avatar-${size}`);
      });
    });
  });

  describe('variants', () => {
    it('should apply square variant (default)', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar variant="square"></aegov-avatar>');
      const avatar = await page.find('aegov-avatar .aegov-avatar');
      const classes = await avatar.getProperty('className');
      expect(classes).not.toContain('avatar-rounded');
    });

    it('should apply rounded variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar variant="rounded"></aegov-avatar>');
      const avatar = await page.find('aegov-avatar .aegov-avatar');
      const classes = await avatar.getProperty('className');
      expect(classes).toContain('avatar-rounded');
    });
  });

  describe('status indicator', () => {
    it('should not render status by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar></aegov-avatar>');
      const indicator = await page.find('aegov-avatar .avatar-indicator');
      expect(indicator).toBeNull();
    });

    it('should render status when enabled', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar status="true"></aegov-avatar>');
      const indicator = await page.find('aegov-avatar .avatar-indicator');
      expect(indicator).toBeTruthy();
    });

    it('should render online status', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar status="true" status-type="online"></aegov-avatar>');
      const indicator = await page.find('aegov-avatar .avatar-indicator');
      const classes = await indicator.getProperty('className');
      expect(classes).toContain('avatar-online');
    });

    it('should render offline status', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar status="true" status-type="offline"></aegov-avatar>');
      const indicator = await page.find('aegov-avatar .avatar-indicator');
      const classes = await indicator.getProperty('className');
      expect(classes).toContain('avatar-offline');
    });

    it('should not render status when type is none', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar status="true" status-type="none"></aegov-avatar>');
      const indicator = await page.find('aegov-avatar .avatar-indicator');
      expect(indicator).toBeNull();
    });
  });

  describe('accessibility', () => {
    it('should have role="img"', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar></aegov-avatar>');
      const avatar = await page.find('aegov-avatar .aegov-avatar');
      expect(await avatar.getAttribute('role')).toBe('img');
    });

    it('should have aria-label with alt text', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar alt="John Doe"></aegov-avatar>');
      const avatar = await page.find('aegov-avatar .aegov-avatar');
      expect(await avatar.getAttribute('aria-label')).toBe('John Doe');
    });

    it('should have default aria-label when no alt', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar></aegov-avatar>');
      const avatar = await page.find('aegov-avatar .aegov-avatar');
      expect(await avatar.getAttribute('aria-label')).toBe('User avatar');
    });

    it('should have aria-label on status indicator', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar status="true" status-type="online"></aegov-avatar>');
      const indicator = await page.find('aegov-avatar .avatar-indicator');
      expect(await indicator.getAttribute('aria-label')).toBe('Status: online');
    });
  });

  describe('dynamic updates', () => {
    it('should update when size changes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar size="sm"></aegov-avatar>');
      const element = await page.find('aegov-avatar');
      const avatar = await page.find('aegov-avatar .aegov-avatar');

      let classes = await avatar.getProperty('className');
      expect(classes).toContain('avatar-sm');

      element.setProperty('size', 'lg');
      await page.waitForChanges();

      classes = await avatar.getProperty('className');
      expect(classes).toContain('avatar-lg');
    });

    it('should update when variant changes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar variant="square"></aegov-avatar>');
      const element = await page.find('aegov-avatar');
      const avatar = await page.find('aegov-avatar .aegov-avatar');

      let classes = await avatar.getProperty('className');
      expect(classes).not.toContain('avatar-rounded');

      element.setProperty('variant', 'rounded');
      await page.waitForChanges();

      classes = await avatar.getProperty('className');
      expect(classes).toContain('avatar-rounded');
    });
  });

  describe('combinations', () => {
    it('should render large rounded avatar with image and status', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-avatar size="lg" variant="rounded" status="true" status-type="online" src="${testImageSrc}" alt="Test User"></aegov-avatar>
      `);
      const avatar = await page.find('aegov-avatar .aegov-avatar');
      const classes = await avatar.getProperty('className');
      expect(classes).toContain('avatar-lg');
      expect(classes).toContain('avatar-rounded');

      const img = await page.find('aegov-avatar img');
      expect(img).toBeTruthy();

      const indicator = await page.find('aegov-avatar .avatar-indicator');
      expect(indicator).toBeTruthy();
    });
  });
});
