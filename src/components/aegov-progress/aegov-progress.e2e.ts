import { newE2EPage } from '@stencil/core/testing';

describe('aegov-progress (e2e)', () => {
  it('renders with the progress class', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-progress value="50"></aegov-progress>');
    const wrapper = await page.find('aegov-progress div.aegov-progress');
    expect(wrapper).not.toBeNull();
    const track = await page.find('aegov-progress .progress__track');
    expect(track).not.toBeNull();
  });

  it('renders fill width from value', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-progress value="60" max="100"></aegov-progress>');
    const width = await page.evaluate(() => {
      const fill = document.querySelector('aegov-progress .progress__fill') as HTMLElement;
      return fill?.style.width;
    });
    expect(width).toBe('60%');
  });

  it('renders indeterminate state when value is missing', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-progress></aegov-progress>');
    const track = await page.find('aegov-progress .progress__track');
    expect(track).toHaveClass('progress__track--indeterminate');
  });

  it('renders trailing counter with suffix', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-progress value="33" counter="trailing" counter-suffix="%"></aegov-progress>');
    const counter = await page.find('aegov-progress .progress__counter--trailing');
    expect(counter).not.toBeNull();
    expect(counter.textContent).toBe('33%');
  });

  it('renders description when provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-progress value="50" description="Loading"></aegov-progress>');
    const desc = await page.find('aegov-progress .progress__description');
    expect(desc).not.toBeNull();
    expect(desc.textContent).toBe('Loading');
  });

  it('reflects fieldId to native progress id', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-progress value="50" field-id="pp1"></aegov-progress>');
    const native = await page.find('aegov-progress progress');
    expect(native.id).toBe('pp1');
  });

  it('forwards aria and data attributes to host', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-progress value="50" aria-label="upload" data-foo="bar"></aegov-progress>');
    const host = await page.find('aegov-progress');
    expect(host.getAttribute('aria-label')).toBe('upload');
    expect(host.getAttribute('data-foo')).toBe('bar');
  });
});
