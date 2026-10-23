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

  it('uses role="alert" for variant="error" (assertive — implicit per WAI-ARIA 1.2, no explicit aria-live needed)', async () => {
    const page = await newSpecPage({
      components: [AegovBanner],
      html: `<aegov-banner variant="error">x</aegov-banner>`,
    });
    // APG alert example: "aria-live does not have to be declared — it is implicit in the alert role"
    expect(page.root.querySelector('.aegov-banner').getAttribute('role')).toBe('alert');
    expect(page.root.querySelector('.aegov-banner').getAttribute('aria-live')).toBeNull();
  });

  it('uses role="status" for variant="success" (polite — success is not an urgent interruption)', async () => {
    const page = await newSpecPage({
      components: [AegovBanner],
      html: `<aegov-banner variant="success">x</aegov-banner>`,
    });
    // WCAG 4.1.3: role="alert" is for errors/warnings; role="status" is for confirmations
    expect(page.root.querySelector('.aegov-banner').getAttribute('role')).toBe('status');
  });

  it('uses role="status" by default (polite — implicit per WAI-ARIA 1.2, no explicit aria-live needed)', async () => {
    const page = await newSpecPage({
      components: [AegovBanner],
      html: `<aegov-banner>x</aegov-banner>`,
    });
    // role="status" has implicit aria-live="polite" and aria-atomic="true" (WAI-ARIA 1.2)
    const banner = page.root.querySelector('.aegov-banner');
    expect(banner.getAttribute('role')).toBe('status');
    expect(banner.getAttribute('aria-live')).toBeNull();
  });

  it('host role attribute overrides auto-computed role', async () => {
    const page = await newSpecPage({
      components: [AegovBanner],
      html: `<aegov-banner role="status" variant="error">x</aegov-banner>`,
    });
    expect(page.root.querySelector('.aegov-banner').getAttribute('role')).toBe('status');
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
