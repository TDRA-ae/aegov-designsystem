import { newE2EPage } from '@stencil/core/testing';

describe('aegov-select-option e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-select-option value="a">Option A</aegov-select-option>');
    const el = await page.find('aegov-select-option');
    expect(el).not.toBeNull();
  });

  it('has role="option" attribute', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-select-option value="a">Option A</aegov-select-option>');
    const el = await page.find('aegov-select-option');
    expect(el.getAttribute('role')).toBe('option');
  });

  it('has data-value attribute', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-select-option value="test">Test</aegov-select-option>');
    const el = await page.find('aegov-select-option');
    expect(el.getAttribute('data-value')).toBe('test');
  });

  it('has data-label attribute from text content', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-select-option value="a">My Label</aegov-select-option>');
    const el = await page.find('aegov-select-option');
    expect(el.getAttribute('data-label')).toBe('My Label');
  });

  it('sets aria-disabled when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-select-option value="a" disabled>Disabled</aegov-select-option>');
    const el = await page.find('aegov-select-option');
    expect(el.getAttribute('aria-disabled')).toBe('true');
  });

  it('does not set aria-disabled when enabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-select-option value="a">Enabled</aegov-select-option>');
    const el = await page.find('aegov-select-option');
    expect(el.getAttribute('aria-disabled')).toBeNull();
  });

  it('works as a child of aegov-select', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-select placeholder="Choose">
        <aegov-select-option value="a">Alpha</aegov-select-option>
        <aegov-select-option value="b">Beta</aegov-select-option>
      </aegov-select>
    `);
    const options = await page.findAll('aegov-select-option');
    expect(options.length).toBe(2);
  });
});
