import { newE2EPage } from '@stencil/core/testing';

describe('aegov-input-group (e2e)', () => {
  it('renders with the input-group class', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-input-group></aegov-input-group>');
    const wrapper = await page.find('aegov-input-group div.aegov-input-group');
    expect(wrapper).not.toBeNull();
    expect(wrapper).toHaveClass('input-group--base');
  });

  it('renders addon prefix and suffix', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-input-group addon-prefix="$" addon-suffix=".com"></aegov-input-group>');
    const prefix = await page.find('aegov-input-group .input-group__addon--prefix');
    const suffix = await page.find('aegov-input-group .input-group__addon--suffix');
    expect(prefix.textContent).toBe('$');
    expect(suffix.textContent).toBe('.com');
  });

  it('propagates size to inner aegov-input', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-input-group size="lg">
        <aegov-input></aegov-input>
      </aegov-input-group>
    `);
    await page.waitForChanges();
    const childInput = await page.find('aegov-input-group aegov-input');
    expect(await childInput.getProperty('size')).toBe('lg');
  });

  it('renders slot content', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-input-group>
        <aegov-input></aegov-input>
      </aegov-input-group>
    `);
    const child = await page.find('aegov-input-group aegov-input');
    expect(child).not.toBeNull();
  });

  it('applies extra-class', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-input-group extra-class="custom-cls"></aegov-input-group>');
    const wrapper = await page.find('aegov-input-group div.aegov-input-group');
    expect(wrapper).toHaveClass('custom-cls');
  });

  it('forwards aria-* and data-* attributes', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-input-group aria-label="combo" data-foo="bar"></aegov-input-group>');
    const host = await page.find('aegov-input-group');
    expect(host.getAttribute('aria-label')).toBe('combo');
    expect(host.getAttribute('data-foo')).toBe('bar');
  });

  // Regression coverage for #49. `variant` previously defaulted to 'primary',
  // the same string used for "explicitly chose primary" — so a child that
  // deliberately set variant="primary" was indistinguishable from one that
  // never touched it, and got silently overridden to match the group.
  it("does not override a child's explicit variant=\"primary\" (#49)", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-input-group variant="secondary">
        <aegov-input id="explicit-primary" variant="primary"></aegov-input>
      </aegov-input-group>
      <aegov-input-group variant="secondary">
        <aegov-input id="unset"></aegov-input>
      </aegov-input-group>
    `);
    await page.waitForChanges();

    const explicitPrimary = await page.find('#explicit-primary');
    const unset = await page.find('#unset');

    expect(await explicitPrimary.getProperty('variant')).toBe('primary');
    expect(await unset.getProperty('variant')).toBe('secondary');
  });

  // Disabled keys off the child's real disabled state, not a markup-only
  // [is-disabled] attribute: it follows a property set from JS both ways.
  it('dims when the child input is disabled by property, and un-dims on re-enable', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-input-group id="g"><aegov-input id="i"></aegov-input></aegov-input-group>
      <aegov-input-group id="m"><aegov-input id="j" is-disabled="true"></aegov-input></aegov-input-group>
    `);
    await page.waitForChanges();
    const opacity = (id: string) => page.$eval(`#${id} .aegov-input-group`, (el: Element) => getComputedStyle(el).opacity);
    expect(await opacity('g')).toBe('1');
    expect(await opacity('m')).toBe('0.4');

    await page.$eval('#i', (el: any) => { el.isDisabled = true; });
    await page.$eval('#j', (el: any) => { el.isDisabled = false; });
    await page.waitForChanges();
    expect(await opacity('g')).toBe('0.4');
    expect(await opacity('m')).toBe('1');
  });
});
