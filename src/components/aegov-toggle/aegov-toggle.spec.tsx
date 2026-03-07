import { newSpecPage } from '@stencil/core/testing';
import { AegovToggle } from './aegov-toggle';

describe('aegov-toggle', () => {
  // ── Rendering ──────────────────────────────────────────

  it('renders with defaults', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle></aegov-toggle>`,
    });
    const el = page.root;
    expect(el).toBeTruthy();
    expect(el.querySelector('.aegov-toggle')).toBeTruthy();
    expect(el.querySelector('.toggle--base')).toBeTruthy();
    expect(el.querySelector('input[type="checkbox"]')).toBeTruthy();
    expect(el.querySelector('input[role="switch"]')).toBeTruthy();
  });

  it('renders unchecked by default', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle></aegov-toggle>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.checked).toBe(false);
  });

  it('renders checked when prop is set', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle checked></aegov-toggle>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('auto-generates an ID', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle></aegov-toggle>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.id).toMatch(/^aegov-toggle-\d+$/);
  });

  it('uses provided field-id', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle field-id="my-toggle"></aegov-toggle>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.id).toBe('my-toggle');
  });

  // ── Sizes ──────────────────────────────────────────────

  it('renders size sm', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle size="sm"></aegov-toggle>`,
    });
    expect(page.root.querySelector('.toggle--sm')).toBeTruthy();
  });

  it('renders size base by default', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle></aegov-toggle>`,
    });
    expect(page.root.querySelector('.toggle--base')).toBeTruthy();
  });

  it('renders size lg', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle size="lg"></aegov-toggle>`,
    });
    expect(page.root.querySelector('.toggle--lg')).toBeTruthy();
  });

  // ── Props ──────────────────────────────────────────────

  it('sets name attribute on input', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle name="notifications"></aegov-toggle>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.name).toBe('notifications');
  });

  it('sets value attribute on input', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle value="on"></aegov-toggle>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('on');
  });

  it('sets disabled attribute on input', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle disabled></aegov-toggle>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('sets required attribute on input', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle required></aegov-toggle>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    expect(input.required).toBe(true);
    expect(input.getAttribute('aria-required')).toBe('true');
  });

  // ── Label & description ────────────────────────────────

  it('renders without label wrapper when no label', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle></aegov-toggle>`,
    });
    expect(page.root.querySelector('.toggle__wrapper')).toBeNull();
    expect(page.root.querySelector('label')).toBeNull();
  });

  it('renders label when provided', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle label="Enable notifications"></aegov-toggle>`,
    });
    const label = page.root.querySelector('.toggle__label-text');
    expect(label).toBeTruthy();
    expect(label.textContent).toBe('Enable notifications');
  });

  it('wraps in label element when label is set', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle label="Test"></aegov-toggle>`,
    });
    expect(page.root.querySelector('label.toggle__wrapper')).toBeTruthy();
  });

  it('renders description when label and description are set', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle label="Sync" description="Sync data automatically"></aegov-toggle>`,
    });
    const desc = page.root.querySelector('.toggle__description');
    expect(desc).toBeTruthy();
    expect(desc.textContent).toBe('Sync data automatically');
  });

  it('links description via aria-describedby', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle field-id="t1" label="Sync" description="Details"></aegov-toggle>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    const desc = page.root.querySelector('.toggle__description');
    expect(input.getAttribute('aria-describedby')).toBe('t1-desc');
    expect(desc.id).toBe('t1-desc');
  });

  it('does not render description without label', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle description="Some text"></aegov-toggle>`,
    });
    expect(page.root.querySelector('.toggle__description')).toBeNull();
  });

  // ── Events ─────────────────────────────────────────────

  it('emits aegovToggleChange on change', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle value="dark"></aegov-toggle>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovToggleChange', spy);

    const input = page.root.querySelector('input') as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toEqual({ checked: true, value: 'dark' });
  });

  it('updates checked state on change', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle></aegov-toggle>`,
    });
    const input = page.root.querySelector('input') as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();

    expect(page.rootInstance.checked).toBe(true);
  });

  // ── Accessibility ──────────────────────────────────────

  it('has role="switch" on input', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle></aegov-toggle>`,
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('role')).toBe('switch');
  });

  it('renders track with aria-hidden', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle></aegov-toggle>`,
    });
    const track = page.root.querySelector('.toggle__track');
    expect(track.getAttribute('aria-hidden')).toBe('true');
  });

  it('passes through aria-label', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle aria-label="Dark mode"></aegov-toggle>`,
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('aria-label')).toBe('Dark mode');
  });

  // ── Pass-through attributes ────────────────────────────

  it('passes through data attributes', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle data-testid="my-toggle"></aegov-toggle>`,
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('data-testid')).toBe('my-toggle');
  });

  it('passes through tabindex', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle tabindex="-1"></aegov-toggle>`,
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('tabindex')).toBe('-1');
  });

  // ── Icon slots ─────────────────────────────────────────

  it('renders icon slots when provided', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle>
        <svg slot="icon-unchecked"><circle r="5"/></svg>
        <svg slot="icon-checked"><rect width="5" height="5"/></svg>
      </aegov-toggle>`,
    });
    expect(page.root.querySelector('.toggle__thumb--has-icon')).toBeTruthy();
    expect(page.root.querySelector('.toggle__icon')).toBeTruthy();
  });

  it('does not render icon container when no icon slots', async () => {
    const page = await newSpecPage({
      components: [AegovToggle],
      html: `<aegov-toggle></aegov-toggle>`,
    });
    expect(page.root.querySelector('.toggle__thumb--has-icon')).toBeNull();
    expect(page.root.querySelector('.toggle__icon')).toBeNull();
  });
});
