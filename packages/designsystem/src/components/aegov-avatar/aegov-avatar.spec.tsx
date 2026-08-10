import { newSpecPage } from '@stencil/core/testing';
import { AegovAvatar } from './aegov-avatar';

describe('aegov-avatar', () => {
  it('renders with default props (no image, fallback shown)', async () => {
    const page = await newSpecPage({
      components: [AegovAvatar],
      html: `<aegov-avatar></aegov-avatar>`,
    });
    const inner = page.root.querySelector('[part="avatar"]');
    expect(inner).not.toBeNull();
    expect(inner.className).toContain('aegov-avatar');
    expect(inner.className).toContain('avatar-base');
    expect(inner.className).toContain('no-user');
    expect(inner.getAttribute('role')).toBe('img');
    expect(inner.getAttribute('aria-label')).toBe('User avatar');
    expect(page.root.querySelector('.avatar-fallback')).not.toBeNull();
  });

  it('auto-generates fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovAvatar],
      html: `<aegov-avatar></aegov-avatar>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-avatar-\d+$/);
  });

  it('respects user-provided fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovAvatar],
      html: `<aegov-avatar field-id="a1"></aegov-avatar>`,
    });
    expect(page.root.querySelector('[part="avatar"]').id).toBe('a1');
  });

  it('renders an image when src is provided', async () => {
    const page = await newSpecPage({
      components: [AegovAvatar],
      html: `<aegov-avatar src="/x.jpg" alt="Person"></aegov-avatar>`,
    });
    const img = page.root.querySelector('img');
    expect(img).not.toBeNull();
    expect(img.getAttribute('src')).toBe('/x.jpg');
    // The accessible name lives on the wrapper's aria-label; the inner <img> is
    // deliberately alt="" and aria-hidden so the avatar is not announced twice.
    expect(img.getAttribute('alt')).toBe('');
    expect(img.getAttribute('aria-hidden')).toBe('true');
    expect(page.root.querySelector('[part="avatar"]').getAttribute('aria-label')).toBe('Person');
    expect(page.root.querySelector('[part="avatar"]').className).not.toContain('no-user');
  });

  it('uses alt as host aria-label when provided', async () => {
    const page = await newSpecPage({
      components: [AegovAvatar],
      html: `<aegov-avatar src="/x.jpg" alt="Jane Doe"></aegov-avatar>`,
    });
    expect(page.root.querySelector('[part="avatar"]').getAttribute('aria-label')).toBe('Jane Doe');
  });

  it('falls back when image errors out', async () => {
    const page = await newSpecPage({
      components: [AegovAvatar],
      html: `<aegov-avatar src="/x.jpg" alt="X"></aegov-avatar>`,
    });
    page.rootInstance.imageError = true;
    await page.waitForChanges();
    expect(page.root.querySelector('img')).toBeNull();
    expect(page.root.querySelector('.avatar-fallback')).not.toBeNull();
    expect(page.root.querySelector('[part="avatar"]').className).toContain('no-user');
  });

  it('applies size class', async () => {
    const page = await newSpecPage({
      components: [AegovAvatar],
      html: `<aegov-avatar size="lg"></aegov-avatar>`,
    });
    expect(page.root.querySelector('[part="avatar"]').className).toContain('avatar-lg');
  });

  it('applies rounded appearance class', async () => {
    const page = await newSpecPage({
      components: [AegovAvatar],
      html: `<aegov-avatar appearance="rounded"></aegov-avatar>`,
    });
    expect(page.root.querySelector('[part="avatar"]').className).toContain('avatar-rounded');
  });

  it('does not render status by default', async () => {
    const page = await newSpecPage({
      components: [AegovAvatar],
      html: `<aegov-avatar></aegov-avatar>`,
    });
    expect(page.root.querySelector('[part="status"]')).toBeNull();
  });

  it('renders status indicator when status is set', async () => {
    const page = await newSpecPage({
      components: [AegovAvatar],
      html: `<aegov-avatar status="online"></aegov-avatar>`,
    });
    const dot = page.root.querySelector('[part="status"]');
    expect(dot).not.toBeNull();
    expect(dot.className).toContain('avatar-indicator');
    expect(dot.className).toContain('avatar-online');
    // The dot is decorative; the status is folded into the wrapper's accessible name so
    // it is conveyed without relying on the indicator colour.
    expect(dot.getAttribute('aria-hidden')).toBe('true');
    expect(page.root.querySelector('[part="avatar"]').getAttribute('aria-label'))
      .toBe('User avatar, status: online');
  });

  it('does not render status when set to an unknown value', async () => {
    const page = await newSpecPage({
      components: [AegovAvatar],
      html: `<aegov-avatar status="bogus"></aegov-avatar>`,
    });
    expect(page.root.querySelector('[part="status"]')).toBeNull();
  });

  it('renders custom fallback slot content when no src', async () => {
    const page = await newSpecPage({
      components: [AegovAvatar],
      html: `<aegov-avatar>JD</aegov-avatar>`,
    });
    expect(page.root.textContent).toContain('JD');
  });

  it('forwards img-specific pass-through attrs (loading, srcset)', async () => {
    const page = await newSpecPage({
      components: [AegovAvatar],
      html: `<aegov-avatar src="/x.jpg" alt="X" loading="lazy" srcset="/x@2x.jpg 2x"></aegov-avatar>`,
    });
    const img = page.root.querySelector('img');
    expect(img.getAttribute('loading')).toBe('lazy');
    expect(img.getAttribute('srcset')).toBe('/x@2x.jpg 2x');
  });
});
