import { newE2EPage } from '@stencil/core/testing';

describe('aegov-form-field (e2e)', () => {
  it('renders with the form-field class', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-form-field></aegov-form-field>');
    const wrapper = await page.find('aegov-form-field div.aegov-form-field');
    expect(wrapper).not.toBeNull();
    expect(wrapper).toHaveClass('aegov-form-field');
  });

  it('renders slot content', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-form-field><span class="kid">hi</span></aegov-form-field>');
    const child = await page.find('aegov-form-field .kid');
    expect(child).not.toBeNull();
    expect(child.textContent).toBe('hi');
  });

  it('links aegov-label htmlFor to child aegov-input fieldId', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-form-field>
        <aegov-label>Name</aegov-label>
        <aegov-input field-id="name-input"></aegov-input>
      </aegov-form-field>
    `);
    await page.waitForChanges();
    const label = await page.find('aegov-form-field aegov-label');
    expect(await label.getProperty('htmlFor')).toBe('name-input');
  });

  it('links aegov-label htmlFor to child aegov-textarea fieldId', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-form-field>
        <aegov-label>Notes</aegov-label>
        <aegov-textarea field-id="notes-ta"></aegov-textarea>
      </aegov-form-field>
    `);
    await page.waitForChanges();
    const label = await page.find('aegov-form-field aegov-label');
    expect(await label.getProperty('htmlFor')).toBe('notes-ta');
  });

  it('reflects fieldId to wrapper id', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-form-field field-id="ff42"></aegov-form-field>');
    const wrapper = await page.find('aegov-form-field div.aegov-form-field');
    expect(wrapper.id).toBe('ff42');
  });

  it('forwards aria and data attributes to wrapper', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-form-field aria-label="form" data-foo="bar"></aegov-form-field>');
    const wrapper = await page.find('aegov-form-field div.aegov-form-field');
    expect(wrapper.getAttribute('aria-label')).toBe('form');
    expect(wrapper.getAttribute('data-foo')).toBe('bar');
  });
});
