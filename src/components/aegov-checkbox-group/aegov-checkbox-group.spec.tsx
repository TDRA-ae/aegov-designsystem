import { newSpecPage } from '@stencil/core/testing';
import { AegovCheckboxGroup } from './aegov-checkbox-group';
import { AegovCheckbox } from '../aegov-checkbox/aegov-checkbox';

describe('aegov-checkbox-group', () => {
  it('renders a fieldset', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `<aegov-checkbox-group></aegov-checkbox-group>`,
    });
    const fieldset = page.root.querySelector('fieldset');
    expect(fieldset).toBeTruthy();
  });

  it('renders with legend when label is provided', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `<aegov-checkbox-group label="Options"></aegov-checkbox-group>`,
    });
    const legend = page.root.querySelector('legend');
    expect(legend).toBeTruthy();
    expect(legend.textContent).toBe('Options');
  });

  it('does not render legend without label', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `<aegov-checkbox-group></aegov-checkbox-group>`,
    });
    const legend = page.root.querySelector('legend');
    expect(legend).toBeNull();
  });

  it('applies default variant class', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `<aegov-checkbox-group></aegov-checkbox-group>`,
    });
    const fieldset = page.root.querySelector('fieldset');
    expect(fieldset.classList.contains('aegov-checkbox-group')).toBe(true);
    expect(fieldset.classList.contains('checkbox-group--default')).toBe(false);
  });

  it('applies list variant class', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `<aegov-checkbox-group variant="list"></aegov-checkbox-group>`,
    });
    const fieldset = page.root.querySelector('fieldset');
    expect(fieldset.classList.contains('checkbox-group--list')).toBe(true);
  });

  it('applies cards variant class', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `<aegov-checkbox-group variant="cards"></aegov-checkbox-group>`,
    });
    const fieldset = page.root.querySelector('fieldset');
    expect(fieldset.classList.contains('checkbox-group--cards')).toBe(true);
  });

  it('applies pills variant class', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `<aegov-checkbox-group variant="pills"></aegov-checkbox-group>`,
    });
    const fieldset = page.root.querySelector('fieldset');
    expect(fieldset.classList.contains('checkbox-group--pills')).toBe(true);
  });

  it('applies horizontal orientation class', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `<aegov-checkbox-group orientation="horizontal"></aegov-checkbox-group>`,
    });
    const fieldset = page.root.querySelector('fieldset');
    expect(fieldset.classList.contains('checkbox-group--horizontal')).toBe(true);
  });

  it('does not apply horizontal class for vertical (default)', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `<aegov-checkbox-group></aegov-checkbox-group>`,
    });
    const fieldset = page.root.querySelector('fieldset');
    expect(fieldset.classList.contains('checkbox-group--horizontal')).toBe(false);
  });

  it('disables fieldset when disabled', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `<aegov-checkbox-group disabled></aegov-checkbox-group>`,
    });
    const fieldset = page.root.querySelector('fieldset');
    expect(fieldset.hasAttribute('disabled')).toBe(true);
  });

  it('applies custom classes', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `<aegov-checkbox-group extra-class="mt-6"></aegov-checkbox-group>`,
    });
    const fieldset = page.root.querySelector('fieldset');
    expect(fieldset.classList.contains('mt-6')).toBe(true);
  });

  it('renders slot content', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `
        <aegov-checkbox-group>
          <aegov-checkbox label="A" value="a"></aegov-checkbox>
          <aegov-checkbox label="B" value="b"></aegov-checkbox>
        </aegov-checkbox-group>
      `,
    });
    const checkboxes = page.root.querySelectorAll('aegov-checkbox');
    expect(checkboxes.length).toBe(2);
  });

  it('has checkbox-group__items container', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `<aegov-checkbox-group></aegov-checkbox-group>`,
    });
    const items = page.root.querySelector('.checkbox-group__items');
    expect(items).toBeTruthy();
  });

  it('emits aegovCheckboxGroupChange on child change', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `
        <aegov-checkbox-group>
          <aegov-checkbox label="A" value="a"></aegov-checkbox>
          <aegov-checkbox label="B" value="b"></aegov-checkbox>
        </aegov-checkbox-group>
      `,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovCheckboxGroupChange', spy);

    const cbA = page.root.querySelector('aegov-checkbox[value="a"]');
    const inputA = cbA.querySelector('input') as HTMLInputElement;
    inputA.checked = true;
    inputA.dispatchEvent(new Event('change', { bubbles: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail.values).toContain('a');
  });

  it('check-all toggles all regular checkboxes', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `
        <aegov-checkbox-group>
          <aegov-checkbox check-all label="Select All"></aegov-checkbox>
          <aegov-checkbox label="A" value="a"></aegov-checkbox>
          <aegov-checkbox label="B" value="b"></aegov-checkbox>
        </aegov-checkbox-group>
      `,
    });

    const checkAllCb = page.root.querySelector('aegov-checkbox[check-all]');
    const inputAll = checkAllCb.querySelector('input') as HTMLInputElement;
    inputAll.checked = true;
    inputAll.dispatchEvent(new Event('change', { bubbles: true }));
    await page.waitForChanges();

    const cbA = page.root.querySelector('aegov-checkbox[value="a"]') as HTMLAegovCheckboxElement;
    const cbB = page.root.querySelector('aegov-checkbox[value="b"]') as HTMLAegovCheckboxElement;
    expect(cbA.checked).toBe(true);
    expect(cbB.checked).toBe(true);
  });

  it('updates check-all to indeterminate when some items checked', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `
        <aegov-checkbox-group>
          <aegov-checkbox check-all label="Select All"></aegov-checkbox>
          <aegov-checkbox label="A" value="a"></aegov-checkbox>
          <aegov-checkbox label="B" value="b"></aegov-checkbox>
        </aegov-checkbox-group>
      `,
    });

    const cbA = page.root.querySelector('aegov-checkbox[value="a"]');
    const inputA = cbA.querySelector('input') as HTMLInputElement;
    inputA.checked = true;
    inputA.dispatchEvent(new Event('change', { bubbles: true }));
    await page.waitForChanges();

    const checkAllCb = page.root.querySelector('aegov-checkbox[check-all]') as HTMLAegovCheckboxElement;
    expect(checkAllCb.indeterminate).toBe(true);
  });

  it('check-all skips disabled checkboxes', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `
        <aegov-checkbox-group>
          <aegov-checkbox check-all label="Select All"></aegov-checkbox>
          <aegov-checkbox label="A" value="a"></aegov-checkbox>
          <aegov-checkbox label="B" value="b" disabled></aegov-checkbox>
        </aegov-checkbox-group>
      `,
    });

    const checkAllCb = page.root.querySelector('aegov-checkbox[check-all]');
    const inputAll = checkAllCb.querySelector('input') as HTMLInputElement;
    inputAll.checked = true;
    inputAll.dispatchEvent(new Event('change', { bubbles: true }));
    await page.waitForChanges();

    const cbA = page.root.querySelector('aegov-checkbox[value="a"]') as HTMLAegovCheckboxElement;
    const cbB = page.root.querySelector('aegov-checkbox[value="b"]') as HTMLAegovCheckboxElement;
    expect(cbA.checked).toBe(true);
    expect(cbB.checked).toBe(false);
  });

  it('sets check-all to checked when all items are checked', async () => {
    const page = await newSpecPage({
      components: [AegovCheckboxGroup, AegovCheckbox],
      html: `
        <aegov-checkbox-group>
          <aegov-checkbox check-all label="Select All"></aegov-checkbox>
          <aegov-checkbox label="A" value="a"></aegov-checkbox>
          <aegov-checkbox label="B" value="b"></aegov-checkbox>
        </aegov-checkbox-group>
      `,
    });

    // Check A
    const inputA = page.root.querySelector('aegov-checkbox[value="a"] input') as HTMLInputElement;
    inputA.checked = true;
    inputA.dispatchEvent(new Event('change', { bubbles: true }));
    await page.waitForChanges();

    // Check B
    const inputB = page.root.querySelector('aegov-checkbox[value="b"] input') as HTMLInputElement;
    inputB.checked = true;
    inputB.dispatchEvent(new Event('change', { bubbles: true }));
    await page.waitForChanges();

    const checkAllCb = page.root.querySelector('aegov-checkbox[check-all]') as HTMLAegovCheckboxElement;
    expect(checkAllCb.checked).toBe(true);
    expect(checkAllCb.indeterminate).toBe(false);
  });

  describe('invalid prop values', () => {
    let warnSpy: jest.SpyInstance;

    beforeEach(() => {
      warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    });

    afterEach(() => {
      warnSpy.mockRestore();
    });

    it('falls back to default variant (no variant class) when variant is invalid', async () => {
      const page = await newSpecPage({
        components: [AegovCheckboxGroup, AegovCheckbox],
        html: `<aegov-checkbox-group variant="weird"></aegov-checkbox-group>`,
      });
      const fieldset = page.root.querySelector('fieldset');
      // default variant has no modifier class
      expect(fieldset.className).not.toContain('checkbox-group--weird');
      expect(fieldset.className).toContain('aegov-checkbox-group');
    });

    it('falls back to default orientation (vertical) when orientation is invalid', async () => {
      const page = await newSpecPage({
        components: [AegovCheckboxGroup, AegovCheckbox],
        html: `<aegov-checkbox-group orientation="diagonal"></aegov-checkbox-group>`,
      });
      const fieldset = page.root.querySelector('fieldset');
      expect(fieldset.className).not.toContain('checkbox-group--horizontal');
    });

    it('warns with component name, prop name, invalid value, and fallback for variant', async () => {
      await newSpecPage({
        components: [AegovCheckboxGroup, AegovCheckbox],
        html: `<aegov-checkbox-group variant="weird"></aegov-checkbox-group>`,
      });
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const variantWarn = messages.find(m => m.includes('"variant"'));
      expect(variantWarn).toBeDefined();
      expect(variantWarn).toContain('[aegov-checkbox-group]');
      expect(variantWarn).toContain('"weird"');
      expect(variantWarn).toContain('default');
    });

    it('warns with component name, prop name, invalid value, and fallback for orientation', async () => {
      await newSpecPage({
        components: [AegovCheckboxGroup, AegovCheckbox],
        html: `<aegov-checkbox-group orientation="diagonal"></aegov-checkbox-group>`,
      });
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const orientationWarn = messages.find(m => m.includes('"orientation"'));
      expect(orientationWarn).toBeDefined();
      expect(orientationWarn).toContain('[aegov-checkbox-group]');
      expect(orientationWarn).toContain('"diagonal"');
      expect(orientationWarn).toContain('vertical');
    });

    it('warns with component name, prop name, invalid value, and fallback for size', async () => {
      await newSpecPage({
        components: [AegovCheckboxGroup, AegovCheckbox],
        html: `<aegov-checkbox-group size="huge"></aegov-checkbox-group>`,
      });
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const sizeWarn = messages.find(m => m.includes('"size"'));
      expect(sizeWarn).toBeDefined();
      expect(sizeWarn).toContain('[aegov-checkbox-group]');
      expect(sizeWarn).toContain('"huge"');
      expect(sizeWarn).toContain('base');
    });

    it('does not warn when all props are valid', async () => {
      await newSpecPage({
        components: [AegovCheckboxGroup, AegovCheckbox],
        html: `<aegov-checkbox-group size="lg" variant="cards" orientation="horizontal"></aegov-checkbox-group>`,
      });
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('warns again via @Watch when variant is updated to an invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovCheckboxGroup, AegovCheckbox],
        html: `<aegov-checkbox-group variant="default"></aegov-checkbox-group>`,
      });
      expect(warnSpy).not.toHaveBeenCalled();

      page.root.setAttribute('variant', 'nope');
      await page.waitForChanges();

      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const invalidWarn = messages.find(m => m.includes('[aegov-checkbox-group]') && m.includes('"nope"'));
      expect(invalidWarn).toBeDefined();
      expect(invalidWarn).toContain('"variant"');
    });
  });
});
