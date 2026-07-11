import { newSpecPage } from '@stencil/core/testing';
import { AegovBanner } from './aegov-banner';

describe('aegov-banner', () => {
  it('renders the banner with default classes', async () => {
    const page = await newSpecPage({
      components: [AegovBanner],
      html: `<aegov-banner>Hello</aegov-banner>`,
    });
    expect(page.root).toBeTruthy();
    const banner = page.root.querySelector('.aegov-banner');
    expect(banner).toBeTruthy();
    expect(banner.classList.contains('banner--top')).toBe(true);
    expect(banner.classList.contains('banner--fixed')).toBe(true);
    expect(banner.classList.contains('banner--push')).toBe(true);
    expect(banner.classList.contains('banner--soft')).toBe(true);
    expect(banner.classList.contains('banner--default')).toBe(true);
    expect(banner.classList.contains('banner--base')).toBe(true);
  });

  it('auto-generates a fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovBanner],
      html: `<aegov-banner>x</aegov-banner>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-banner-\d+$/);
  });

  it('applies variant class', async () => {
    const page = await newSpecPage({
      components: [AegovBanner],
      html: `<aegov-banner variant="error">x</aegov-banner>`,
    });
    expect(page.root.querySelector('.aegov-banner').classList.contains('banner--error')).toBe(true);
  });

  it('applies appearance="solid" class', async () => {
    const page = await newSpecPage({
      components: [AegovBanner],
      html: `<aegov-banner appearance="solid">x</aegov-banner>`,
    });
    expect(page.root.querySelector('.aegov-banner').classList.contains('banner--solid')).toBe(true);
  });

  it('applies position="bottom" class', async () => {
    const page = await newSpecPage({
      components: [AegovBanner],
      html: `<aegov-banner position="bottom">x</aegov-banner>`,
    });
    expect(page.root.querySelector('.aegov-banner').classList.contains('banner--bottom')).toBe(true);
  });

  it('applies display="sticky" class', async () => {
    const page = await newSpecPage({
      components: [AegovBanner],
      html: `<aegov-banner display="sticky">x</aegov-banner>`,
    });
    expect(page.root.querySelector('.aegov-banner').classList.contains('banner--sticky')).toBe(true);
  });

  it('applies mode="overlay" class', async () => {
    const page = await newSpecPage({
      components: [AegovBanner],
      html: `<aegov-banner mode="overlay">x</aegov-banner>`,
    });
    expect(page.root.querySelector('.aegov-banner').classList.contains('banner--overlay')).toBe(true);
  });

  it('applies size="lg" class', async () => {
    const page = await newSpecPage({
      components: [AegovBanner],
      html: `<aegov-banner size="lg">x</aegov-banner>`,
    });
    expect(page.root.querySelector('.aegov-banner').classList.contains('banner--lg')).toBe(true);
  });

  it('renders dismiss button when isDismissible is true (default)', async () => {
    const page = await newSpecPage({
      components: [AegovBanner],
      html: `<aegov-banner>x</aegov-banner>`,
    });
    const btn = page.root.querySelector('.banner__dismiss');
    expect(btn).toBeTruthy();
    expect(btn.getAttribute('aria-label')).toBe('Close banner');
  });

  it('hides dismiss button when isDismissible is false', async () => {
    const page = await newSpecPage({
      components: [AegovBanner],
      html: `<aegov-banner is-dismissible="false">x</aegov-banner>`,
    });
    expect(page.root.querySelector('.banner__dismiss')).toBeNull();
  });

  it('uses role="alert" for variant="error"', async () => {
    const page = await newSpecPage({
      components: [AegovBanner],
      html: `<aegov-banner variant="error">x</aegov-banner>`,
    });
    expect(page.root.querySelector('.aegov-banner').getAttribute('role')).toBe('alert');
    expect(page.root.querySelector('.aegov-banner').getAttribute('aria-live')).toBe('assertive');
  });

  it('uses role="region" by default', async () => {
    const page = await newSpecPage({
      components: [AegovBanner],
      html: `<aegov-banner>x</aegov-banner>`,
    });
    const banner = page.root.querySelector('.aegov-banner');
    expect(banner.getAttribute('role')).toBe('region');
    expect(banner.getAttribute('aria-live')).toBe('polite');
  });

  it('host role attribute overrides auto-computed role', async () => {
    const page = await newSpecPage({
      components: [AegovBanner],
      html: `<aegov-banner role="status" variant="error">x</aegov-banner>`,
    });
    expect(page.root.querySelector('.aegov-banner').getAttribute('role')).toBe('status');
  });

  it('sets aria-labelledby when heading is provided', async () => {
    const page = await newSpecPage({
      components: [AegovBanner],
      html: `<aegov-banner field-id="b1" heading="Notice">x</aegov-banner>`,
    });
    expect(page.root.querySelector('.aegov-banner').getAttribute('aria-labelledby')).toBe('b1-heading');
  });

  it('emits aegovBannerDismiss when dismiss button is clicked', async () => {
    const page = await newSpecPage({
      components: [AegovBanner],
      html: `<aegov-banner>x</aegov-banner>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovBannerDismiss', spy);
    const btn = page.root.querySelector('.banner__dismiss') as HTMLButtonElement;
    btn.click();
    await new Promise(resolve => setTimeout(resolve, 350));
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('renders default slot content', async () => {
    const page = await newSpecPage({
      components: [AegovBanner],
      html: `<aegov-banner>Banner content</aegov-banner>`,
    });
    expect(page.root.textContent).toContain('Banner content');
  });
});
