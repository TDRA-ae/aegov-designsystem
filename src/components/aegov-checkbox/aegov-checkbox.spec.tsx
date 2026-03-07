import { newSpecPage } from '@stencil/core/testing';
import { AegovCheckbox } from './aegov-checkbox';

describe('aegov-checkbox', () => {
  it('renders a basic checkbox', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox></aegov-checkbox>',
    });
    const input = page.root.querySelector('input[type="checkbox"]');
    expect(input).toBeTruthy();
  });

  it('auto-generates a fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox></aegov-checkbox>',
    });
    const input = page.root.querySelector('input');
    expect(input.id).toMatch(/^aegov-checkbox-\d+$/);
  });

  it('uses provided fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox field-id="my-cb"></aegov-checkbox>',
    });
    const input = page.root.querySelector('input');
    expect(input.id).toBe('my-cb');
  });

  it('renders with label', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox label="Accept terms"></aegov-checkbox>',
    });
    const label = page.root.querySelector('label.checkbox__wrapper');
    expect(label).toBeTruthy();
    const labelText = page.root.querySelector('.checkbox__label-text');
    expect(labelText.textContent).toBe('Accept terms');
  });

  it('renders with label and description', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox label="Newsletter" description="Weekly digest"></aegov-checkbox>',
    });
    const desc = page.root.querySelector('.checkbox__description');
    expect(desc).toBeTruthy();
    expect(desc.textContent).toBe('Weekly digest');
  });

  it('does not render description without label', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox description="Some desc"></aegov-checkbox>',
    });
    const desc = page.root.querySelector('.checkbox__description');
    expect(desc).toBeNull();
    const label = page.root.querySelector('label');
    expect(label).toBeNull();
  });

  it('renders without label wrapper when no label prop', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox></aegov-checkbox>',
    });
    const wrapper = page.root.querySelector('label.checkbox__wrapper');
    expect(wrapper).toBeNull();
  });

  it('sets name attribute', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox name="agree"></aegov-checkbox>',
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('name')).toBe('agree');
  });

  it('sets value attribute', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox value="yes"></aegov-checkbox>',
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('value')).toBe('yes');
  });

  it('reflects checked state', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox checked></aegov-checkbox>',
    });
    const input = page.root.querySelector('input');
    expect(input.checked).toBe(true);
  });

  it('applies disabled state', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox disabled></aegov-checkbox>',
    });
    const input = page.root.querySelector('input');
    expect(input.disabled).toBe(true);
  });

  it('applies required attribute', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox required></aegov-checkbox>',
    });
    const input = page.root.querySelector('input');
    expect(input.required).toBe(true);
  });

  it('sets aria-required when required', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox required></aegov-checkbox>',
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('aria-required')).toBe('true');
  });

  it('does not set aria-required when not required', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox></aegov-checkbox>',
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('aria-required')).toBeNull();
  });

  it('sets aria-describedby when description is provided', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox label="Terms" description="You must agree" field-id="cb1"></aegov-checkbox>',
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('aria-describedby')).toBe('cb1-desc');
    const desc = page.root.querySelector('.checkbox__description');
    expect(desc.id).toBe('cb1-desc');
  });

  it('does not set aria-describedby without description', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox label="Terms"></aegov-checkbox>',
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('aria-describedby')).toBeNull();
  });

  it('reflects check-all attribute', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox check-all label="Select All"></aegov-checkbox>',
    });
    expect(page.root.getAttribute('check-all')).not.toBeNull();
  });

  it('applies custom classes', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox class="mt-4"></aegov-checkbox>',
    });
    const wrapper = page.root.querySelector('.aegov-checkbox');
    expect(wrapper.classList.contains('mt-4')).toBe(true);
  });

  it('passes through data attributes', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox data-testid="cb-1"></aegov-checkbox>',
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('data-testid')).toBe('cb-1');
  });

  it('passes through aria attributes', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox aria-describedby="help-text"></aegov-checkbox>',
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('aria-describedby')).toBe('help-text');
  });

  it('passes through form attribute', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox form="myform"></aegov-checkbox>',
    });
    const input = page.root.querySelector('input');
    expect(input.getAttribute('form')).toBe('myform');
  });

  it('emits aegovCheckboxChange on change', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox value="test"></aegov-checkbox>',
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovCheckboxChange', spy);
    const input = page.root.querySelector('input');
    input.checked = true;
    input.dispatchEvent(new Event('change'));
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toEqual({ checked: true, value: 'test' });
  });

  it('clears indeterminate on change', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox></aegov-checkbox>',
    });
    const component = page.rootInstance as AegovCheckbox;
    component.indeterminate = true;
    await page.waitForChanges();
    const input = page.root.querySelector('input');
    input.checked = true;
    input.dispatchEvent(new Event('change'));
    expect(component.indeterminate).toBe(false);
  });

  it('has aegov-checkbox wrapper class', async () => {
    const page = await newSpecPage({
      components: [AegovCheckbox],
      html: '<aegov-checkbox></aegov-checkbox>',
    });
    const wrapper = page.root.querySelector('.aegov-checkbox');
    expect(wrapper).toBeTruthy();
  });
});
