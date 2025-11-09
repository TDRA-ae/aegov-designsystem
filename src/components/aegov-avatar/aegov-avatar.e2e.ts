import { newE2EPage } from '@stencil/core/testing';

describe('aegov-avatar E2E', () => {
  // Use a data URI for a 1x1 transparent PNG to avoid external network requests
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
      expect(await img.getProperty('src')).toContain('data:image');
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
    it('should apply xs size class', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar size="xs"></aegov-avatar>');

      const avatar = await page.find('aegov-avatar .aegov-avatar');
      const classes = await avatar.getProperty('className');

      expect(classes).toContain('aegov-avatar');
      expect(classes).toContain('avatar-xs');
    });

    it('should apply sm size class', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar size="sm"></aegov-avatar>');

      const avatar = await page.find('aegov-avatar .aegov-avatar');
      const classes = await avatar.getProperty('className');

      expect(classes).toContain('aegov-avatar');
      expect(classes).toContain('avatar-sm');
    });

    it('should apply base size class', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar size="base"></aegov-avatar>');

      const avatar = await page.find('aegov-avatar .aegov-avatar');
      const classes = await avatar.getProperty('className');

      expect(classes).toContain('avatar-base');
    });

    it('should apply lg size class', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar size="lg"></aegov-avatar>');

      const avatar = await page.find('aegov-avatar .aegov-avatar');
      const classes = await avatar.getProperty('className');

      expect(classes).toContain('avatar-lg');
    });

    it('should apply xl size class', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar size="xl"></aegov-avatar>');

      const avatar = await page.find('aegov-avatar .aegov-avatar');
      const classes = await avatar.getProperty('className');

      expect(classes).toContain('avatar-xl');
    });

    it('should apply 2xl size class', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar size="2xl"></aegov-avatar>');

      const avatar = await page.find('aegov-avatar .aegov-avatar');
      const classes = await avatar.getProperty('className');

      expect(classes).toContain('avatar-2xl');
    });

    it('should apply 3xl size class', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar size="3xl"></aegov-avatar>');

      const avatar = await page.find('aegov-avatar .aegov-avatar');
      const classes = await avatar.getProperty('className');

      expect(classes).toContain('avatar-3xl');
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
    it('should render status indicator when enabled', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar status="true"></aegov-avatar>');

      const indicator = await page.find('aegov-avatar .avatar-indicator');
      expect(indicator).toBeTruthy();
    });

    it('should not render status indicator by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar></aegov-avatar>');

      const indicator = await page.find('aegov-avatar .avatar-indicator');
      expect(indicator).toBeNull();
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
      const role = await avatar.getAttribute('role');

      expect(role).toBe('img');
    });

    it('should have aria-label with alt text', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar alt="John Doe"></aegov-avatar>');

      const avatar = await page.find('aegov-avatar .aegov-avatar');
      const ariaLabel = await avatar.getAttribute('aria-label');

      expect(ariaLabel).toBe('John Doe');
    });

    it('should have default aria-label when no alt', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar></aegov-avatar>');

      const avatar = await page.find('aegov-avatar .aegov-avatar');
      const ariaLabel = await avatar.getAttribute('aria-label');

      expect(ariaLabel).toBe('User avatar');
    });

    it('should have aria-label on status indicator', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar status="true" status-type="online"></aegov-avatar>');

      const indicator = await page.find('aegov-avatar .avatar-indicator');
      const ariaLabel = await indicator.getAttribute('aria-label');

      expect(ariaLabel).toBe('Status: online');
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

    it('should update when status changes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar></aegov-avatar>');

      const element = await page.find('aegov-avatar');

      let indicator = await page.find('aegov-avatar .avatar-indicator');
      expect(indicator).toBeNull();

      element.setProperty('status', true);
      await page.waitForChanges();

      indicator = await page.find('aegov-avatar .avatar-indicator');
      expect(indicator).toBeTruthy();
    });
  });

  describe('combinations', () => {
    it('should render large rounded avatar with status', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-avatar
          size="lg"
          variant="rounded"
          status="true"
          status-type="online"
          src="${testImageSrc}"
          alt="Test User"
        ></aegov-avatar>
      `);

      const avatar = await page.find('aegov-avatar .aegov-avatar');
      const classes = await avatar.getProperty('className');

      expect(classes).toContain('avatar-lg');
      expect(classes).toContain('avatar-rounded');

      const img = await page.find('aegov-avatar img');
      expect(img).toBeTruthy();

      const indicator = await page.find('aegov-avatar .avatar-indicator');
      expect(indicator).toBeTruthy();

      const indicatorClasses = await indicator.getProperty('className');
      expect(indicatorClasses).toContain('avatar-online');
    });

    it('should render xs square avatar without image', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-avatar size="xs" variant="square"></aegov-avatar>');

      const avatar = await page.find('aegov-avatar .aegov-avatar');
      const classes = await avatar.getProperty('className');

      expect(classes).toContain('avatar-xs');
      expect(classes).not.toContain('avatar-rounded');

      const fallback = await page.find('aegov-avatar .avatar-fallback');
      expect(fallback).toBeTruthy();
    });
  });
});
