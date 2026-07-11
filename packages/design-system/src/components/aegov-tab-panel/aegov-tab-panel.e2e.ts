import { newE2EPage } from '@stencil/core/testing';

describe('aegov-tab-panel (e2e)', () => {
  it('renders tabpanel with id and aria-labelledby', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-tab-panel tab-id="x">Content</aegov-tab-panel>`);
    const panel = await page.find('aegov-tab-panel [role="tabpanel"]');
    expect(panel).not.toBeNull();
    expect(panel.id).toBe('panel-x');
    expect(panel.getAttribute('aria-labelledby')).toBe('tab-x');
  });

  it('is hidden when not active', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-tab-panel tab-id="x">Content</aegov-tab-panel>`);
    const panel = await page.find('aegov-tab-panel [role="tabpanel"]');
    expect(panel.getAttribute('hidden')).not.toBeNull();
  });

  it('is visible when active', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-tab-panel tab-id="x" active="true">Content</aegov-tab-panel>`);
    const panel = await page.find('aegov-tab-panel [role="tabpanel"]');
    expect(panel.getAttribute('hidden')).toBeNull();
    expect(panel.getAttribute('tabindex')).toBe('0');
  });

  it('renders the slotted content', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-tab-panel tab-id="x" active="true"><p class="t">Hello</p></aegov-tab-panel>`);
    const p = await page.find('aegov-tab-panel .t');
    expect(p.textContent).toBe('Hello');
  });

  it('merges extra-class', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-tab-panel tab-id="x" extra-class="custom">A</aegov-tab-panel>`);
    const panel = await page.find('aegov-tab-panel [role="tabpanel"]');
    expect(panel).toHaveClass('custom');
  });
});
