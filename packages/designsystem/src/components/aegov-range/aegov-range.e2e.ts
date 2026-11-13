import { newE2EPage } from '@stencil/core/testing';

describe('aegov-range (e2e)', () => {
  it('renders single mode by default with one native range input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range value="40"></aegov-range>');
    const input = await page.find('aegov-range >>> input.range__input');
    expect(input).not.toBeNull();
    expect(await input.getProperty('type')).toBe('range');
    expect(await input.getProperty('value')).toBe('40');
    const low = await page.find('aegov-range >>> .range__input--low');
    expect(low).toBeNull();
  });

  it('renders two native inputs in range mode', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range mode="range" value-low="20" value-high="80"></aegov-range>');
    const inputs = await page.findAll('aegov-range >>> input[type="range"]');
    expect(inputs.length).toBe(2);
  });

  it('emits aegovRangeInput when value changes via the native input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range min="0" max="100" step="1" value="50"></aegov-range>');
    const host = await page.find('aegov-range');
    const spy = await host.spyOnEvent('aegovRangeInput');

    await page.evaluate(() => {
      const input = document.querySelector('aegov-range')!.shadowRoot!.querySelector('input.range__input') as HTMLInputElement;
      input.value = '70';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await page.waitForChanges();

    expect(spy.events.length).toBeGreaterThanOrEqual(1);
    expect(spy.lastEvent.detail).toEqual({ value: 70 });
  });

  it('emits aegovRangeChange on commit (change event)', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range min="0" max="100" step="1" value="50"></aegov-range>');
    const host = await page.find('aegov-range');
    const spy = await host.spyOnEvent('aegovRangeChange');

    await page.evaluate(() => {
      const input = document.querySelector('aegov-range')!.shadowRoot!.querySelector('input.range__input') as HTMLInputElement;
      input.value = '88';
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventTimes(1);
    expect(spy.lastEvent.detail).toEqual({ value: 88 });
  });

  it('keyboard ArrowRight increments single value', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range min="0" max="100" step="1" value="50"></aegov-range>');
    const host = await page.find('aegov-range');
    const spy = await host.spyOnEvent('aegovRangeInput');
    const input = await page.find('aegov-range >>> input.range__input');
    await input.focus();
    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();
    expect(spy.events.length).toBeGreaterThanOrEqual(1);
    expect(await host.getProperty('value')).toBe(51);
  });

  it('range mode keeps low < high (low cannot exceed high - step)', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range mode="range" min="0" max="100" step="1" value-low="20" value-high="40"></aegov-range>');
    await page.evaluate(() => {
      const low = document.querySelector('aegov-range')!.shadowRoot!.querySelector('.range__input--low') as HTMLInputElement;
      low.value = '90';
      low.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await page.waitForChanges();
    const host = await page.find('aegov-range');
    expect(await host.getProperty('valueLow')).toBe(39); // clamped to high - step
    expect(await host.getProperty('valueHigh')).toBe(40);
  });

  it('renders a label text element when label is provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range label="Volume"></aegov-range>');
    const label = await page.find('aegov-range >>> .range__label-text');
    expect(label).not.toBeNull();
    expect(await label.getProperty('textContent')).toBe('Volume');
  });

  it('is-disabled prevents input from being editable', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range is-disabled value="50"></aegov-range>');
    const input = await page.find('aegov-range >>> input.range__input');
    expect(await input.getProperty('disabled')).toBe(true);
  });

  it('display="full" renders min and max labels', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range display="full" min="0" max="50"></aegov-range>');
    const min = await page.find('aegov-range >>> .range__label-min');
    const max = await page.find('aegov-range >>> .range__label-max');
    expect(await min.getProperty('textContent')).toBe('0');
    expect(await max.getProperty('textContent')).toBe('50');
  });

  it('forwards aria/data attributes to the host wrapper', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range data-testid="rg" value="50"></aegov-range>');
    const host = await page.find('aegov-range');
    expect(host.getAttribute('data-testid')).toBe('rg');
  });
});

// DS-A11Y-range-02 (WCAG 2.4.7): in range mode only the thumb whose input has
// focus shows the focus ring; the single-thumb slider keeps its ring.
describe('aegov-range (e2e) focus ring', () => {
  const ringedThumbs = (page: any, id: string) =>
    page.$eval(`#${id}`, (el: any) =>
      [...el.shadowRoot.querySelectorAll('.range__thumb')]
        .filter((t: HTMLElement) => getComputedStyle(t).outlineStyle !== 'none' && parseFloat(getComputedStyle(t).outlineWidth) > 0)
        .map((t: HTMLElement) => t.className.match(/range__thumb--(low|high|single)/)![1]));

  it('range mode: only the focused thumb is ringed', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range id="r" mode="range" aria-label="Price" value="20,60"></aegov-range>');
    await page.keyboard.press('Tab');
    await page.waitForChanges();
    expect(await ringedThumbs(page, 'r')).toEqual(['low']);
    await page.keyboard.press('Tab');
    await page.waitForChanges();
    expect(await ringedThumbs(page, 'r')).toEqual(['high']);
  });

  it('single mode: the thumb is ringed', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range id="s" aria-label="Volume" value="40"></aegov-range>');
    await page.keyboard.press('Tab');
    await page.waitForChanges();
    expect(await ringedThumbs(page, 's')).toEqual(['single']);
  });
});
