import { newE2EPage } from '@stencil/core/testing';

describe('aegov-avatar (e2e)', () => {
  it('renders fallback when no src', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-avatar></aegov-avatar>');
    const inner = await page.find('aegov-avatar [part="avatar"]');
    expect(inner).toHaveClass('aegov-avatar');
    expect(inner).toHaveClass('avatar-base');
    expect(inner).toHaveClass('no-user');
    const fallback = await page.find('aegov-avatar .avatar-fallback');
    expect(fallback).not.toBeNull();
  });

  it('renders an image when src is provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-avatar src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" alt="Person"></aegov-avatar>');
    const img = await page.find('aegov-avatar img');
    expect(img).not.toBeNull();
    expect(img.getAttribute('alt')).toBe('Person');
  });

  it('uses alt as inner aria-label', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-avatar alt="Jane"></aegov-avatar>');
    const inner = await page.find('aegov-avatar [part="avatar"]');
    expect(inner.getAttribute('aria-label')).toBe('Jane');
  });

  it('applies size and rounded appearance classes', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-avatar size="lg" appearance="rounded"></aegov-avatar>');
    const inner = await page.find('aegov-avatar [part="avatar"]');
    expect(inner).toHaveClass('avatar-lg');
    expect(inner).toHaveClass('avatar-rounded');
  });

  it('renders a status indicator when status set', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-avatar status="online"></aegov-avatar>');
    const dot = await page.find('aegov-avatar [part="status"]');
    expect(dot).not.toBeNull();
    expect(dot).toHaveClass('avatar-online');
    expect(dot.getAttribute('aria-label')).toBe('Status: online');
  });

  it('does not render status by default', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-avatar></aegov-avatar>');
    const dot = await page.find('aegov-avatar [part="status"]');
    expect(dot).toBeNull();
  });

  it('renders slot content as fallback', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-avatar>JD</aegov-avatar>');
    const el = await page.find('aegov-avatar');
    expect(el.textContent).toContain('JD');
  });
});
