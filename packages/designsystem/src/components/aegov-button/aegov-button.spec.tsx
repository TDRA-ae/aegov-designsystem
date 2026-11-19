import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AegovButton } from './aegov-button';

/**
 * aegov-button uses a real shadow root (`delegatesFocus: true`), so the rendered
 * <button> lives in the shadow root. Queries must go through `page.root.shadowRoot`
 * — `page.root.querySelector('button')` returns null.
 */
const inner = (page: SpecPage): HTMLButtonElement =>
  page.root.shadowRoot.querySelector('button');

describe('aegov-button', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button>Click</aegov-button>`,
    });
    const btn = inner(page);
    expect(btn).not.toBeNull();
    expect(btn.className).toContain('aegov-btn');
    expect(btn.className).toContain('btn-primary');
    expect(btn.className).toContain('btn-solid');
    expect(btn.className).toContain('btn-base');
    expect(btn.getAttribute('type')).toBe('button');
    expect(page.root.textContent).toContain('Click');
  });

  it('exposes the inner button as the `button` part', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button>X</aegov-button>`,
    });
    expect(inner(page).getAttribute('part')).toBe('button');
  });

  it('auto-generates fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button>X</aegov-button>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-button-\d+$/);
    expect(inner(page).id).toBe(page.rootInstance.fieldId);
  });

  it('respects user-provided fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button field-id="my-btn">X</aegov-button>`,
    });
    expect(inner(page).id).toBe('my-btn');
  });

  it('applies variant class', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button variant="danger">X</aegov-button>`,
    });
    expect(inner(page).className).toContain('btn-danger');
  });

  it('applies appearance class', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button appearance="outline">X</aegov-button>`,
    });
    expect(inner(page).className).toContain('btn-outline');
  });

  it('applies size="sm" classes', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button size="sm">X</aegov-button>`,
    });
    expect(inner(page).className).toContain('btn-sm');
  });

  it('applies the btn-xl class (not btn-lg) for size="xl"', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button size="xl">X</aegov-button>`,
    });
    const classes = inner(page).classList;
    expect(classes.contains('btn-xl')).toBe(true);
    expect(classes.contains('btn-lg')).toBe(false);
  });

  it('reflects native type attribute', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button type="submit">X</aegov-button>`,
    });
    expect(inner(page).getAttribute('type')).toBe('submit');
  });

  it('applies disabled state', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button is-disabled="true">X</aegov-button>`,
    });
    // Native `disabled` is the state; `aria-disabled` is deliberately not set, since it
    // would be redundant on a genuinely disabled <button>.
    expect(inner(page).hasAttribute('disabled')).toBe(true);
  });

  it('applies loading state with spinner and aria-busy', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button is-loading="true">X</aegov-button>`,
    });
    const btn = inner(page);
    // Loading keeps the button focusable: aria-disabled, not native disabled.
    expect(btn.hasAttribute('disabled')).toBe(false);
    expect(btn.getAttribute('aria-disabled')).toBe('true');
    expect(btn.getAttribute('aria-busy')).toBe('true');
    expect(btn.querySelector('svg')).not.toBeNull();
  });

  it('announces the loading state to assistive technology', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button is-loading="true">X</aegov-button>`,
    });
    // DS-A11Y-button-02: the status sits outside the <button>, so "Loading" is
    // never part of the button's name, and follows the page language.
    const live = page.root.shadowRoot.querySelector('[role="status"]');
    expect(live).not.toBeNull();
    expect(live.getAttribute('aria-live')).toBe('polite');
    expect(live.textContent).toBe('Loading');
    expect(inner(page).querySelector('[role="status"], [aria-live]')).toBeNull();
    expect(inner(page).textContent).not.toContain('Loading');
  });

  it('says "Loading" in Arabic on an Arabic page, and nothing when not loading', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<div lang="ar" dir="rtl"><aegov-button is-loading="true">حفظ</aegov-button></div>`,
    });
    const button = page.body.querySelector('aegov-button');
    expect(button.shadowRoot.querySelector('[role="status"]').textContent).toBe('جارٍ التحميل');
    (button as any).isLoading = false;
    await page.waitForChanges();
    expect(button.shadowRoot.querySelector('[role="status"]').textContent).toBe('');
  });

  it('applies isFull class', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button is-full="true">X</aegov-button>`,
    });
    expect(inner(page).className).toContain('w-full');
  });

  it('reflects isFull to the is-full attribute when set as a JS property (regression test for issue #12)', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button>X</aegov-button>`,
    });
    (page.root as any).isFull = true;
    await page.waitForChanges();
    // Boolean prop reflection mirrors native HTML boolean attributes: present (empty
    // string) when true, absent when false — not the literal string "true".
    expect(page.root.hasAttribute('is-full')).toBe(true);
  });

  it('applies isIcon class', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button is-icon="true" aria-label="A"><svg></svg></aegov-button>`,
    });
    expect(inner(page).className).toContain('btn-icon');
  });

  it('emits aegovButtonClick when clicked', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button>X</aegov-button>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovButtonClick', spy);
    inner(page).click();
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('does not emit aegovButtonClick when disabled', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button is-disabled="true">X</aegov-button>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovButtonClick', spy);
    inner(page).click();
    await page.waitForChanges();
    expect(spy).not.toHaveBeenCalled();
  });

  it('does not emit aegovButtonClick when loading', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button is-loading="true">X</aegov-button>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovButtonClick', spy);
    inner(page).click();
    await page.waitForChanges();
    expect(spy).not.toHaveBeenCalled();
  });

  it('forwards aria-* and data-* attributes', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button aria-label="L" data-x="1">X</aegov-button>`,
    });
    const btn = inner(page);
    expect(btn.getAttribute('aria-label')).toBe('L');
    expect(btn.getAttribute('data-x')).toBe('1');
  });

  it('applies group position classes when groupPosition + groupOrientation set', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button>X</aegov-button>`,
    });
    const host = page.root as HTMLAegovButtonElement;
    host.groupOrientation = 'horizontal';
    host.groupPosition = 'first';
    await page.waitForChanges();
    const cls = inner(page).className;
    expect(cls).toContain('btn-grouped-horizontal');
    expect(cls).toContain('btn-grouped-first-horizontal');
  });

  /**
   * Form actions. The inner native <button> is in the shadow root, so it has no
   * form owner and the browser never submits/resets the light-DOM <form> for
   * it; the component does it itself (form.requestSubmit() / form.reset()),
   * after the click has finished dispatching.
   */
  describe('form actions', () => {
    const tick = () => new Promise(r => setTimeout(r, 0));
    const setup = async (html: string) => {
      const page = await newSpecPage({ components: [AegovButton], html });
      const form = page.body.querySelector('form') as HTMLFormElement | null;
      if (form) {
        (form as any).requestSubmit = jest.fn();
        (form as any).reset = jest.fn();
      }
      const host = page.body.querySelector('aegov-button') as HTMLElement;
      const btn = host.shadowRoot.querySelector('button') as HTMLButtonElement;
      return { page, form, host, btn };
    };

    it('type="submit" submits the owning form via requestSubmit()', async () => {
      const { page, form, host, btn } = await setup(`<form><aegov-button type="submit">Go</aegov-button></form>`);
      const clickSpy = jest.fn();
      host.addEventListener('aegovButtonClick', clickSpy);
      btn.click();
      await tick();
      await page.waitForChanges();
      expect(form.requestSubmit).toHaveBeenCalledTimes(1);
      expect(form.reset).not.toHaveBeenCalled();
      expect(clickSpy).toHaveBeenCalledTimes(1);
    });

    it('type="reset" resets the owning form', async () => {
      const { form, btn } = await setup(`<form><aegov-button type="reset">Reset</aegov-button></form>`);
      btn.click();
      await tick();
      expect(form.reset).toHaveBeenCalledTimes(1);
      expect(form.requestSubmit).not.toHaveBeenCalled();
    });

    it('type="button" (the default) does nothing to the form', async () => {
      const { form, btn } = await setup(`<form><aegov-button>Plain</aegov-button></form>`);
      btn.click();
      await tick();
      expect(form.requestSubmit).not.toHaveBeenCalled();
      expect(form.reset).not.toHaveBeenCalled();
    });

    it('does not submit when disabled or loading', async () => {
      for (const attr of ['is-disabled="true"', 'is-loading="true"']) {
        const { form, btn } = await setup(`<form><aegov-button type="submit" ${attr}>Go</aegov-button></form>`);
        btn.click();
        await tick();
        expect(form.requestSubmit).not.toHaveBeenCalled();
      }
    });

    it('does not submit when the click is default-prevented', async () => {
      const { form, host, btn } = await setup(`<form><aegov-button type="submit">Go</aegov-button></form>`);
      host.addEventListener('aegovButtonClick', (e: CustomEvent<MouseEvent>) => e.detail.preventDefault());
      btn.click();
      await tick();
      expect(form.requestSubmit).not.toHaveBeenCalled();
    });

    it('does nothing (and does not throw) outside a form', async () => {
      const { host, btn } = await setup(`<aegov-button type="submit">Go</aegov-button>`);
      const clickSpy = jest.fn();
      host.addEventListener('aegovButtonClick', clickSpy);
      expect(() => btn.click()).not.toThrow();
      await tick();
      expect(clickSpy).toHaveBeenCalledTimes(1);
    });

    it('is disabled by an ancestor <fieldset disabled> (formDisabledCallback)', async () => {
      const { page, form, btn } = await setup(`<form><aegov-button type="submit">Go</aegov-button></form>`);
      page.rootInstance.formDisabledCallback(true);
      await page.waitForChanges();
      expect(btn.hasAttribute('disabled')).toBe(true);
      btn.click();
      await tick();
      expect(form.requestSubmit).not.toHaveBeenCalled();
      page.rootInstance.formDisabledCallback(false);
      await page.waitForChanges();
      expect(btn.hasAttribute('disabled')).toBe(false);
    });
  });

  describe('icon-only name check', () => {
    const svg = '<svg viewBox="0 0 24 24"><path d="M3 6h18"/></svg>';
    let warn: jest.SpyInstance;
    beforeEach(() => { warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined); });
    afterEach(() => warn.mockRestore());

    it('accepts visually hidden text inside the button as its name and hides the icon', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button is-icon="true">${svg}<span class="sr-only">Search the UAE Design System</span></aegov-button>`,
      });
      expect(warn).not.toHaveBeenCalled();
      expect(page.root.querySelector('svg').getAttribute('aria-hidden')).toBe('true');
    });

    it('accepts aria-label and hides the icon', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button is-icon="true" aria-label="Search">${svg}</aegov-button>`,
      });
      expect(warn).not.toHaveBeenCalled();
      expect(page.root.querySelector('svg').getAttribute('aria-hidden')).toBe('true');
    });

    it('warns when the only content is the icon, and leaves the icon exposed', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button is-icon="true">${svg}</aegov-button>`,
      });
      expect(warn).toHaveBeenCalledTimes(1);
      expect(page.root.querySelector('svg').hasAttribute('aria-hidden')).toBe(false);
    });

    it('does not count text hidden from assistive technology', async () => {
      await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button is-icon="true">${svg}<span aria-hidden="true">Search</span><span hidden>Search</span></aegov-button>`,
      });
      expect(warn).toHaveBeenCalledTimes(1);
    });
  });
});
