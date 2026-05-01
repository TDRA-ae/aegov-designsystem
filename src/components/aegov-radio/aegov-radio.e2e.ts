import { newE2EPage } from '@stencil/core/testing';

describe('aegov-radio e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio></aegov-radio>');
    const el = await page.find('aegov-radio');
    expect(el).not.toBeNull();
  });

  it('clicking radio checks it', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio label="Option A" value="a"></aegov-radio>');
    const input = await page.find('aegov-radio input');
    await input.click();
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('clicking label checks radio', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio label="Option A" value="a"></aegov-radio>');
    const label = await page.find('aegov-radio .radio__wrapper');
    await label.click();
    await page.waitForChanges();
    const input = await page.find('aegov-radio input');
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('disabled radio cannot be checked', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio label="Option A" value="a" is-disabled></aegov-radio>');
    const input = await page.find('aegov-radio input');
    await input.click();
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(false);
  });

  it('emits aegovRadioChange with checked=true', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio label="Option A" value="a"></aegov-radio>');
    const el = await page.find('aegov-radio');
    const spy = await el.spyOnEvent('aegovRadioChange');
    const input = await page.find('aegov-radio input');
    await input.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventDetail({ checked: true, value: 'a' });
  });

  it('renders label text', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio label="My Label"></aegov-radio>');
    const label = await page.find('aegov-radio .radio__label-text');
    expect(label.textContent).toBe('My Label');
  });

  it('renders description text', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio label="Title" description="Some description"></aegov-radio>');
    const desc = await page.find('aegov-radio .radio__description');
    expect(desc.textContent).toBe('Some description');
  });

  it('renders without label wrapper when no label prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio></aegov-radio>');
    const wrapper = await page.find('aegov-radio label.radio__wrapper');
    expect(wrapper).toBeNull();
  });

  it('radio is keyboard accessible', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio label="Test"></aegov-radio>');
    const input = await page.find('aegov-radio input');
    await input.focus();
    await page.keyboard.press('Space');
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('renders with checked attribute', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio label="Pre-checked" is-checked></aegov-radio>');
    const input = await page.find('aegov-radio input');
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('has correct name and value attributes', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio name="color" value="red"></aegov-radio>');
    const input = await page.find('aegov-radio input');
    expect(await input.getProperty('name')).toBe('color');
    expect(await input.getProperty('value')).toBe('red');
  });

  it('sets required attribute', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio label="Required" is-required></aegov-radio>');
    const input = await page.find('aegov-radio input');
    expect(await input.getProperty('required')).toBe(true);
  });

  it('applies size class', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio size="lg"></aegov-radio>');
    const wrapper = await page.find('aegov-radio .aegov-radio');
    expect(wrapper).toHaveClass('radio--lg');
  });

  it('applies sm size class', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio size="sm"></aegov-radio>');
    const wrapper = await page.find('aegov-radio .aegov-radio');
    expect(wrapper).toHaveClass('radio--sm');
  });

  it('auto-generates a unique field ID', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio></aegov-radio>');
    const input = await page.find('aegov-radio input');
    const id = await input.getProperty('id');
    expect(id).toMatch(/^aegov-radio-\d+$/);
  });

  it('uses provided field-id', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio field-id="custom-id"></aegov-radio>');
    const input = await page.find('aegov-radio input');
    expect(await input.getProperty('id')).toBe('custom-id');
  });

  it('works inside a form submission', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <form id="testform">
        <aegov-radio name="choice" value="yes" label="Yes" is-checked></aegov-radio>
      </form>
    `);
    const formData = await page.evaluate(() => {
      const form = document.getElementById('testform') as HTMLFormElement;
      const data = new FormData(form);
      return data.get('choice');
    });
    expect(formData).toBe('yes');
  });
});
