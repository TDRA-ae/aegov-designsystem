import { newSpecPage } from '@stencil/core/testing';
import { AegovRadioGroup } from './aegov-radio-group';
import { AegovRadio } from '../aegov-radio/aegov-radio';

describe('aegov-radio-group', () => {
  it('renders a fieldset with role radiogroup', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup, AegovRadio],
      html: `<aegov-radio-group name="test"></aegov-radio-group>`,
    });
    const fieldset = page.root.querySelector('fieldset');
    expect(fieldset).toBeTruthy();
    expect(fieldset.getAttribute('role')).toBe('radiogroup');
  });

  it('renders with legend when label is provided', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup, AegovRadio],
      html: `<aegov-radio-group name="test" label="Pick one"></aegov-radio-group>`,
    });
    const legend = page.root.querySelector('legend');
    expect(legend).toBeTruthy();
    expect(legend.textContent).toBe('Pick one');
  });

  it('does not render legend without label', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup, AegovRadio],
      html: `<aegov-radio-group name="test"></aegov-radio-group>`,
    });
    const legend = page.root.querySelector('legend');
    expect(legend).toBeNull();
  });

  it('applies default variant class', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup, AegovRadio],
      html: `<aegov-radio-group name="test"></aegov-radio-group>`,
    });
    const fieldset = page.root.querySelector('fieldset');
    expect(fieldset.classList.contains('aegov-radio-group')).toBe(true);
    expect(fieldset.classList.contains('radio-group--default')).toBe(false);
  });

  it('applies list variant class', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup, AegovRadio],
      html: `<aegov-radio-group name="test" variant="list"></aegov-radio-group>`,
    });
    const fieldset = page.root.querySelector('fieldset');
    expect(fieldset.classList.contains('radio-group--list')).toBe(true);
  });

  it('applies cards variant class', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup, AegovRadio],
      html: `<aegov-radio-group name="test" variant="cards"></aegov-radio-group>`,
    });
    const fieldset = page.root.querySelector('fieldset');
    expect(fieldset.classList.contains('radio-group--cards')).toBe(true);
  });

  it('applies pills variant class', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup, AegovRadio],
      html: `<aegov-radio-group name="test" variant="pills"></aegov-radio-group>`,
    });
    const fieldset = page.root.querySelector('fieldset');
    expect(fieldset.classList.contains('radio-group--pills')).toBe(true);
  });

  it('applies horizontal orientation class', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup, AegovRadio],
      html: `<aegov-radio-group name="test" orientation="horizontal"></aegov-radio-group>`,
    });
    const fieldset = page.root.querySelector('fieldset');
    expect(fieldset.classList.contains('radio-group--horizontal')).toBe(true);
  });

  it('does not apply horizontal class for vertical (default)', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup, AegovRadio],
      html: `<aegov-radio-group name="test"></aegov-radio-group>`,
    });
    const fieldset = page.root.querySelector('fieldset');
    expect(fieldset.classList.contains('radio-group--horizontal')).toBe(false);
  });

  it('disables fieldset when disabled', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup, AegovRadio],
      html: `<aegov-radio-group name="test" disabled></aegov-radio-group>`,
    });
    const fieldset = page.root.querySelector('fieldset');
    expect(fieldset.hasAttribute('disabled')).toBe(true);
  });

  it('applies custom classes', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup, AegovRadio],
      html: `<aegov-radio-group name="test" class="mt-6"></aegov-radio-group>`,
    });
    const fieldset = page.root.querySelector('fieldset');
    expect(fieldset.classList.contains('mt-6')).toBe(true);
  });

  it('renders slot content', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup, AegovRadio],
      html: `
        <aegov-radio-group name="color">
          <aegov-radio label="Red" value="red"></aegov-radio>
          <aegov-radio label="Blue" value="blue"></aegov-radio>
        </aegov-radio-group>
      `,
    });
    const radios = page.root.querySelectorAll('aegov-radio');
    expect(radios.length).toBe(2);
  });

  it('has radio-group__items container', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup, AegovRadio],
      html: `<aegov-radio-group name="test"></aegov-radio-group>`,
    });
    const items = page.root.querySelector('.radio-group__items');
    expect(items).toBeTruthy();
  });

  it('propagates name to child radios', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup, AegovRadio],
      html: `
        <aegov-radio-group name="fruit">
          <aegov-radio label="Apple" value="apple"></aegov-radio>
          <aegov-radio label="Banana" value="banana"></aegov-radio>
        </aegov-radio-group>
      `,
    });
    await page.waitForChanges();

    const radios = Array.from(page.root.querySelectorAll('aegov-radio')) as HTMLAegovRadioElement[];
    radios.forEach(radio => {
      expect(radio.name).toBe('fruit');
    });
  });

  it('propagates size to child radios', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup, AegovRadio],
      html: `
        <aegov-radio-group name="test" size="lg">
          <aegov-radio label="A" value="a"></aegov-radio>
          <aegov-radio label="B" value="b"></aegov-radio>
        </aegov-radio-group>
      `,
    });
    await page.waitForChanges();

    const radios = Array.from(page.root.querySelectorAll('aegov-radio')) as HTMLAegovRadioElement[];
    radios.forEach(radio => {
      expect(radio.size).toBe('lg');
    });
  });

  it('emits aegovRadioGroupChange on child change', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup, AegovRadio],
      html: `
        <aegov-radio-group name="color">
          <aegov-radio label="Red" value="red"></aegov-radio>
          <aegov-radio label="Blue" value="blue"></aegov-radio>
        </aegov-radio-group>
      `,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovRadioGroupChange', spy);

    const radioRed = page.root.querySelector('aegov-radio[value="red"]');
    const inputRed = radioRed.querySelector('input') as HTMLInputElement;
    inputRed.checked = true;
    inputRed.dispatchEvent(new Event('change', { bubbles: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail.value).toBe('red');
  });

  it('unchecks other radios when one is selected', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup, AegovRadio],
      html: `
        <aegov-radio-group name="color">
          <aegov-radio label="Red" value="red" checked></aegov-radio>
          <aegov-radio label="Blue" value="blue"></aegov-radio>
        </aegov-radio-group>
      `,
    });

    // Select blue
    const radioBlue = page.root.querySelector('aegov-radio[value="blue"]');
    const inputBlue = radioBlue.querySelector('input') as HTMLInputElement;
    inputBlue.checked = true;
    inputBlue.dispatchEvent(new Event('change', { bubbles: true }));
    await page.waitForChanges();

    const radioRed = page.root.querySelector('aegov-radio[value="red"]') as HTMLAegovRadioElement;
    expect(radioRed.checked).toBe(false);
    const radioBlueEl = page.root.querySelector('aegov-radio[value="blue"]') as HTMLAegovRadioElement;
    expect(radioBlueEl.checked).toBe(true);
  });

  it('emits undefined value when radio is unchecked', async () => {
    const page = await newSpecPage({
      components: [AegovRadioGroup, AegovRadio],
      html: `
        <aegov-radio-group name="color">
          <aegov-radio label="Red" value="red" checked></aegov-radio>
        </aegov-radio-group>
      `,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovRadioGroupChange', spy);

    // Simulate unchecked event (edge case)
    const radio = page.root.querySelector('aegov-radio[value="red"]');
    const input = radio.querySelector('input') as HTMLInputElement;
    input.checked = false;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail.value).toBeUndefined();
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
        components: [AegovRadioGroup, AegovRadio],
        html: `<aegov-radio-group name="t" variant="weird"></aegov-radio-group>`,
      });
      const fieldset = page.root.querySelector('fieldset');
      expect(fieldset.className).not.toContain('radio-group--weird');
      expect(fieldset.className).toContain('aegov-radio-group');
    });

    it('falls back to default orientation when orientation is invalid', async () => {
      const page = await newSpecPage({
        components: [AegovRadioGroup, AegovRadio],
        html: `<aegov-radio-group name="t" orientation="diagonal"></aegov-radio-group>`,
      });
      const fieldset = page.root.querySelector('fieldset');
      expect(fieldset.className).not.toContain('radio-group--horizontal');
    });

    it('warns for invalid variant', async () => {
      await newSpecPage({
        components: [AegovRadioGroup, AegovRadio],
        html: `<aegov-radio-group name="t" variant="weird"></aegov-radio-group>`,
      });
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const variantWarn = messages.find(m => m.includes('"variant"'));
      expect(variantWarn).toBeDefined();
      expect(variantWarn).toContain('[aegov-radio-group]');
      expect(variantWarn).toContain('"weird"');
      expect(variantWarn).toContain('default');
    });

    it('warns for invalid orientation', async () => {
      await newSpecPage({
        components: [AegovRadioGroup, AegovRadio],
        html: `<aegov-radio-group name="t" orientation="diagonal"></aegov-radio-group>`,
      });
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const orientationWarn = messages.find(m => m.includes('"orientation"'));
      expect(orientationWarn).toBeDefined();
      expect(orientationWarn).toContain('[aegov-radio-group]');
      expect(orientationWarn).toContain('"diagonal"');
      expect(orientationWarn).toContain('vertical');
    });

    it('warns for invalid size', async () => {
      await newSpecPage({
        components: [AegovRadioGroup, AegovRadio],
        html: `<aegov-radio-group name="t" size="huge"></aegov-radio-group>`,
      });
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const sizeWarn = messages.find(m => m.includes('"size"'));
      expect(sizeWarn).toBeDefined();
      expect(sizeWarn).toContain('[aegov-radio-group]');
      expect(sizeWarn).toContain('"huge"');
      expect(sizeWarn).toContain('base');
    });

    it('does not warn when all props are valid', async () => {
      await newSpecPage({
        components: [AegovRadioGroup, AegovRadio],
        html: `<aegov-radio-group name="t" size="lg" variant="cards" orientation="horizontal"></aegov-radio-group>`,
      });
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('warns again via @Watch when variant is updated to an invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovRadioGroup, AegovRadio],
        html: `<aegov-radio-group name="t" variant="default"></aegov-radio-group>`,
      });
      expect(warnSpy).not.toHaveBeenCalled();

      page.root.setAttribute('variant', 'nope');
      await page.waitForChanges();

      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const invalidWarn = messages.find(m => m.includes('[aegov-radio-group]') && m.includes('"nope"'));
      expect(invalidWarn).toBeDefined();
      expect(invalidWarn).toContain('"variant"');
    });
  });
});
