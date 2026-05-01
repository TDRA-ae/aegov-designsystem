import { newE2EPage } from '@stencil/core/testing';

describe('aegov-label e2e', () => {
  it('renders a <label> element', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-label>Email</aegov-label>`);
    const label = await page.find('aegov-label label');
    expect(label).not.toBeNull();
    expect(label.className).toContain('aegov-label');
  });

  it('auto-generates an id on the inner label', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-label>Email</aegov-label>`);
    const label = await page.find('aegov-label label');
    expect(label.id).toMatch(/^aegov-label-\d+$/);
  });

  it('reflects the for attribute', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-label for="my-input">Email</aegov-label>
      <input id="my-input" type="text" />
    `);
    const label = await page.find('aegov-label label');
    expect(label.getAttribute('for')).toBe('my-input');
  });

  it('clicking the label focuses the linked input (native browser behavior)', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-label for="my-input">Email</aegov-label>
      <input id="my-input" type="text" />
    `);
    const label = await page.find('aegov-label label');
    await label.click();
    await page.waitForChanges();
    const active = await page.evaluate(() => (document.activeElement as HTMLElement).id);
    expect(active).toBe('my-input');
  });

  it('renders slot content', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-label>Email address</aegov-label>`);
    const label = await page.find('aegov-label label');
    expect(label.textContent).toContain('Email address');
  });

  it('passes through aria-* attributes', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-label aria-label="custom-label">x</aegov-label>`);
    const label = await page.find('aegov-label label');
    expect(label.getAttribute('aria-label')).toBe('custom-label');
  });
});
