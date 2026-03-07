import { newE2EPage } from '@stencil/core/testing';

describe('aegov-checkbox e2e', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox label="Test"></aegov-checkbox>');
    const el = await page.find('aegov-checkbox');
    expect(el).not.toBeNull();
  });

  it('clicking checkbox toggles checked state', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox label="Test"></aegov-checkbox>');
    const input = await page.find('aegov-checkbox input');
    await input.click();
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(true);

    await input.click();
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(false);
  });

  it('clicking label toggles checkbox', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox label="Click me"></aegov-checkbox>');
    const label = await page.find('aegov-checkbox .checkbox__wrapper');
    await label.click();
    await page.waitForChanges();
    const input = await page.find('aegov-checkbox input');
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('disabled checkbox cannot be toggled', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox label="Test" disabled></aegov-checkbox>');
    const input = await page.find('aegov-checkbox input');
    await input.click();
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(false);
  });

  it('emits aegovCheckboxChange with checked=true', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox label="Test" value="v1"></aegov-checkbox>');
    const el = await page.find('aegov-checkbox');
    const spy = await el.spyOnEvent('aegovCheckboxChange');
    const input = await page.find('aegov-checkbox input');
    await input.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventDetail({ checked: true, value: 'v1' });
  });

  it('emits aegovCheckboxChange with checked=false on uncheck', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox label="Test" value="v1" checked></aegov-checkbox>');
    const el = await page.find('aegov-checkbox');
    const spy = await el.spyOnEvent('aegovCheckboxChange');
    const input = await page.find('aegov-checkbox input');
    await input.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventDetail({ checked: false, value: 'v1' });
  });

  it('renders label text', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox label="My Label"></aegov-checkbox>');
    const label = await page.find('aegov-checkbox .checkbox__label-text');
    expect(label.textContent).toBe('My Label');
  });

  it('renders description text', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox label="Title" description="Some description"></aegov-checkbox>');
    const desc = await page.find('aegov-checkbox .checkbox__description');
    expect(desc.textContent).toBe('Some description');
  });

  it('checkbox is keyboard accessible', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox label="Test"></aegov-checkbox>');
    const input = await page.find('aegov-checkbox input');
    await input.focus();
    await page.keyboard.press('Space');
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('renders with checked attribute', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox label="Pre-checked" checked></aegov-checkbox>');
    const input = await page.find('aegov-checkbox input');
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('renders without label wrapper when no label prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox></aegov-checkbox>');
    const wrapper = await page.find('aegov-checkbox label.checkbox__wrapper');
    expect(wrapper).toBeNull();
  });

  it('has correct name and value attributes', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox name="color" value="red"></aegov-checkbox>');
    const input = await page.find('aegov-checkbox input');
    expect(await input.getProperty('name')).toBe('color');
    expect(await input.getProperty('value')).toBe('red');
  });

  it('sets required attribute', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox label="Required" required></aegov-checkbox>');
    const input = await page.find('aegov-checkbox input');
    expect(await input.getProperty('required')).toBe(true);
  });

  it('works inside a form submission', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <form id="testform">
        <aegov-checkbox name="terms" value="accepted" label="Accept" checked></aegov-checkbox>
      </form>
    `);
    const formData = await page.evaluate(() => {
      const form = document.getElementById('testform') as HTMLFormElement;
      const data = new FormData(form);
      return data.get('terms');
    });
    expect(formData).toBe('accepted');
  });
});
