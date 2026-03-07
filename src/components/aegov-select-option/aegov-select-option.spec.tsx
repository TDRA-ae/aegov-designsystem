import { newSpecPage } from '@stencil/core/testing';
import { AegovSelectOption } from './aegov-select-option';

describe('aegov-select-option', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AegovSelectOption],
      html: '<aegov-select-option value="a">Option A</aegov-select-option>',
    });
    expect(page.root).toBeTruthy();
  });

  it('sets role="option" on host', async () => {
    const page = await newSpecPage({
      components: [AegovSelectOption],
      html: '<aegov-select-option value="a">Option A</aegov-select-option>',
    });
    expect(page.root.getAttribute('role')).toBe('option');
  });

  it('sets data-value attribute from value prop', async () => {
    const page = await newSpecPage({
      components: [AegovSelectOption],
      html: '<aegov-select-option value="test-val">Test</aegov-select-option>',
    });
    expect(page.root.getAttribute('data-value')).toBe('test-val');
  });

  it('sets data-label attribute from slot content', async () => {
    const page = await newSpecPage({
      components: [AegovSelectOption],
      html: '<aegov-select-option value="a">Option Alpha</aegov-select-option>',
    });
    expect(page.root.getAttribute('data-label')).toBe('Option Alpha');
  });

  it('defaults value to empty string', async () => {
    const page = await newSpecPage({
      components: [AegovSelectOption],
      html: '<aegov-select-option>Empty</aegov-select-option>',
    });
    expect(page.root.getAttribute('data-value')).toBe('');
  });

  it('sets aria-disabled when disabled', async () => {
    const page = await newSpecPage({
      components: [AegovSelectOption],
      html: '<aegov-select-option value="a" disabled>Disabled</aegov-select-option>',
    });
    expect(page.root.getAttribute('aria-disabled')).toBe('true');
  });

  it('does not set aria-disabled when not disabled', async () => {
    const page = await newSpecPage({
      components: [AegovSelectOption],
      html: '<aegov-select-option value="a">Enabled</aegov-select-option>',
    });
    expect(page.root.getAttribute('aria-disabled')).toBeNull();
  });

  it('trims whitespace from slot content for data-label', async () => {
    const page = await newSpecPage({
      components: [AegovSelectOption],
      html: '<aegov-select-option value="a">  Spaced  </aegov-select-option>',
    });
    expect(page.root.getAttribute('data-label')).toBe('Spaced');
  });

  it('renders slot content', async () => {
    const page = await newSpecPage({
      components: [AegovSelectOption],
      html: '<aegov-select-option value="a">Slot Content</aegov-select-option>',
    });
    expect(page.root.textContent).toContain('Slot Content');
  });

  it('handles empty content gracefully', async () => {
    const page = await newSpecPage({
      components: [AegovSelectOption],
      html: '<aegov-select-option value="a"></aegov-select-option>',
    });
    expect(page.root.getAttribute('data-label')).toBe('');
  });
});
