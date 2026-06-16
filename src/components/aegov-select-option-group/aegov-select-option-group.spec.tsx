import { newSpecPage } from '@stencil/core/testing';
import { AegovSelectOptionGroup } from './aegov-select-option-group';
import { AegovSelectOption } from '../aegov-select-option/aegov-select-option';
import { AegovSelect } from '../aegov-select/aegov-select';

describe('aegov-select-option-group', () => {
  it('renders with role=group and aria-label from label prop', async () => {
    const page = await newSpecPage({
      components: [AegovSelectOptionGroup],
      html: `<aegov-select-option-group label="Fruit"></aegov-select-option-group>`,
    });
    expect(page.root.getAttribute('role')).toBe('group');
    expect(page.root.getAttribute('aria-label')).toBe('Fruit');
    expect(page.root.getAttribute('data-group-label')).toBe('Fruit');
  });

  it('renders slotted children', async () => {
    const page = await newSpecPage({
      components: [AegovSelect, AegovSelectOptionGroup, AegovSelectOption],
      html: `<aegov-select>
        <aegov-select-option-group label="Fruit">
          <aegov-select-option value="a">Apple</aegov-select-option>
        </aegov-select-option-group>
      </aegov-select>`,
    });
    expect(page.root.querySelector('aegov-select-option')).not.toBeNull();
  });

  it('defaults label to empty string', async () => {
    const page = await newSpecPage({
      components: [AegovSelectOptionGroup],
      html: `<aegov-select-option-group></aegov-select-option-group>`,
    });
    expect(page.rootInstance.label).toBe('');
    expect(page.root.getAttribute('aria-label')).toBe('');
  });
});
