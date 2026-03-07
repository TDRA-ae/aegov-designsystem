import { newE2EPage } from '@stencil/core/testing';

describe('aegov-toggle e2e', () => {
  // ── Rendering ──────────────────────────────────────────

  it('renders in the DOM', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle></aegov-toggle>');
    const el = await page.find('aegov-toggle');
    expect(el).not.toBeNull();
  });

  it('renders a hidden checkbox with role switch', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle></aegov-toggle>');
    const input = await page.find('aegov-toggle input[type="checkbox"][role="switch"]');
    expect(input).not.toBeNull();
  });

  it('renders track and thumb', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle></aegov-toggle>');
    const track = await page.find('aegov-toggle .toggle__track');
    const thumb = await page.find('aegov-toggle .toggle__thumb');
    expect(track).not.toBeNull();
    expect(thumb).not.toBeNull();
  });

  // ── Toggling ───────────────────────────────────────────

  it('toggles checked state on click', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle></aegov-toggle>');
    const toggle = await page.find('aegov-toggle .toggle__control');

    await toggle.click();
    await page.waitForChanges();

    const input = await page.find('aegov-toggle input');
    const checked = await input.getProperty('checked');
    expect(checked).toBe(true);
  });

  it('toggles off when clicked again', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle checked></aegov-toggle>');
    const toggle = await page.find('aegov-toggle .toggle__control');

    await toggle.click();
    await page.waitForChanges();

    const input = await page.find('aegov-toggle input');
    const checked = await input.getProperty('checked');
    expect(checked).toBe(false);
  });

  it('emits aegovToggleChange event', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle value="test"></aegov-toggle>');

    const changeSpy = await page.spyOnEvent('aegovToggleChange');
    const toggle = await page.find('aegov-toggle .toggle__control');

    await toggle.click();
    await page.waitForChanges();

    expect(changeSpy).toHaveReceivedEventTimes(1);
    expect(changeSpy).toHaveReceivedEventDetail({ checked: true, value: 'test' });
  });

  // ── Disabled ───────────────────────────────────────────

  it('does not toggle when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle disabled></aegov-toggle>');
    const toggle = await page.find('aegov-toggle .toggle__control');

    await toggle.click();
    await page.waitForChanges();

    const input = await page.find('aegov-toggle input');
    const checked = await input.getProperty('checked');
    expect(checked).toBe(false);
  });

  it('does not emit event when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle disabled></aegov-toggle>');

    const changeSpy = await page.spyOnEvent('aegovToggleChange');
    const toggle = await page.find('aegov-toggle .toggle__control');

    await toggle.click();
    await page.waitForChanges();

    expect(changeSpy).not.toHaveReceivedEvent();
  });

  // ── Sizes ──────────────────────────────────────────────

  it('renders sm size', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle size="sm"></aegov-toggle>');
    const wrapper = await page.find('aegov-toggle .toggle--sm');
    expect(wrapper).not.toBeNull();
  });

  it('renders base size by default', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle></aegov-toggle>');
    const wrapper = await page.find('aegov-toggle .toggle--base');
    expect(wrapper).not.toBeNull();
  });

  it('renders lg size', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle size="lg"></aegov-toggle>');
    const wrapper = await page.find('aegov-toggle .toggle--lg');
    expect(wrapper).not.toBeNull();
  });

  // ── Label & description ────────────────────────────────

  it('renders label text', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle label="Notifications"></aegov-toggle>');
    const label = await page.find('aegov-toggle .toggle__label-text');
    expect(label).not.toBeNull();
    expect(label.textContent).toBe('Notifications');
  });

  it('renders description', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle label="Sync" description="Auto-sync your data"></aegov-toggle>');
    const desc = await page.find('aegov-toggle .toggle__description');
    expect(desc).not.toBeNull();
    expect(desc.textContent).toBe('Auto-sync your data');
  });

  it('clicking label toggles the switch', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle label="Enable"></aegov-toggle>');
    const labelText = await page.find('aegov-toggle .toggle__label-text');

    await labelText.click();
    await page.waitForChanges();

    const input = await page.find('aegov-toggle input');
    const checked = await input.getProperty('checked');
    expect(checked).toBe(true);
  });

  // ── Keyboard ───────────────────────────────────────────

  it('toggles with Space key', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle></aegov-toggle>');
    const input = await page.find('aegov-toggle input');

    await input.focus();
    await page.keyboard.press('Space');
    await page.waitForChanges();

    const checked = await input.getProperty('checked');
    expect(checked).toBe(true);
  });

  // ── Icon slots ─────────────────────────────────────────

  it('renders icon slots inside thumb', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-toggle>
        <svg slot="icon-unchecked" class="sun-icon"><circle r="5"/></svg>
        <svg slot="icon-checked" class="moon-icon"><rect width="5" height="5"/></svg>
      </aegov-toggle>
    `);
    const thumb = await page.find('aegov-toggle .toggle__thumb--has-icon');
    expect(thumb).not.toBeNull();

    const iconContainer = await page.find('aegov-toggle .toggle__icon');
    expect(iconContainer).not.toBeNull();
  });

  // ── Accessibility ──────────────────────────────────────

  it('supports aria-label for unlabelled toggles', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle aria-label="Dark mode toggle"></aegov-toggle>');
    const input = await page.find('aegov-toggle input');
    expect(await input.getAttribute('aria-label')).toBe('Dark mode toggle');
  });

  it('has aria-hidden on track', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle></aegov-toggle>');
    const track = await page.find('aegov-toggle .toggle__track');
    expect(await track.getAttribute('aria-hidden')).toBe('true');
  });
});
