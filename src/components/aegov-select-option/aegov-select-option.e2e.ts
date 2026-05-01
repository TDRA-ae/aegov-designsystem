import { newE2EPage } from '@stencil/core/testing';

const wrap = (inner: string) => `<aegov-select>${inner}</aegov-select>`;

describe('aegov-select-option (e2e)', () => {
  it('renders with role=option and data attributes', async () => {
    const page = await newE2EPage();
    await page.setContent(wrap(`<aegov-select-option value="a">Apple</aegov-select-option>`));
    const el = await page.find('aegov-select-option');
    expect(el).toEqualAttribute('role', 'option');
    expect(el).toEqualAttribute('data-value', 'a');
    expect(el).toEqualAttribute('data-label', 'Apple');
  });

  it('reflects is-disabled via aria-disabled', async () => {
    const page = await newE2EPage();
    await page.setContent(wrap(`<aegov-select-option value="a" is-disabled="true">A</aegov-select-option>`));
    const el = await page.find('aegov-select-option');
    expect(el).toEqualAttribute('aria-disabled', 'true');
  });

  it('renders slot content', async () => {
    const page = await newE2EPage();
    await page.setContent(wrap(`<aegov-select-option value="a">Apple</aegov-select-option>`));
    const el = await page.find('aegov-select-option');
    expect((await el.getProperty('textContent')).trim()).toBe('Apple');
  });
});
