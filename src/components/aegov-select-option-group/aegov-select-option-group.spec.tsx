import { newSpecPage } from '@stencil/core/testing';
import { AegovSelectOptionGroup } from './aegov-select-option-group';

describe('aegov-select-option-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AegovSelectOptionGroup],
      html: '<aegov-select-option-group label="Fruits"></aegov-select-option-group>',
    });
    expect(page.root).toBeTruthy();
  });

  it('sets role="group" on host', async () => {
    const page = await newSpecPage({
      components: [AegovSelectOptionGroup],
      html: '<aegov-select-option-group label="Fruits"></aegov-select-option-group>',
    });
    expect(page.root.getAttribute('role')).toBe('group');
  });

  it('sets aria-label from label prop', async () => {
    const page = await newSpecPage({
      components: [AegovSelectOptionGroup],
      html: '<aegov-select-option-group label="Fruits"></aegov-select-option-group>',
    });
    expect(page.root.getAttribute('aria-label')).toBe('Fruits');
  });

  it('sets data-group-label from label prop', async () => {
    const page = await newSpecPage({
      components: [AegovSelectOptionGroup],
      html: '<aegov-select-option-group label="Vegetables"></aegov-select-option-group>',
    });
    expect(page.root.getAttribute('data-group-label')).toBe('Vegetables');
  });

  it('defaults label to empty string', async () => {
    const page = await newSpecPage({
      components: [AegovSelectOptionGroup],
      html: '<aegov-select-option-group></aegov-select-option-group>',
    });
    expect(page.root.getAttribute('aria-label')).toBe('');
    expect(page.root.getAttribute('data-group-label')).toBe('');
  });

  it('renders slot content', async () => {
    const page = await newSpecPage({
      components: [AegovSelectOptionGroup],
      html: `
        <aegov-select-option-group label="Group">
          <span>Child content</span>
        </aegov-select-option-group>
      `,
    });
    expect(page.root.textContent).toContain('Child content');
  });
});
