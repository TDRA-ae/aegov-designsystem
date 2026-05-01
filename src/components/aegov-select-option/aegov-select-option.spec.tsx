import { newSpecPage } from '@stencil/core/testing';
import { AegovSelectOption } from './aegov-select-option';
import { AegovSelect } from '../aegov-select/aegov-select';

const wrap = (inner: string) => `<aegov-select>${inner}</aegov-select>`;
const COMPONENTS = [AegovSelect, AegovSelectOption];
const opt = (root: any) => root.querySelector('aegov-select-option');

describe('aegov-select-option', () => {
  it('renders with role=option and slot content', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-select-option value="a">Apple</aegov-select-option>`),
    });
    const o = opt(page.root);
    expect(o.getAttribute('role')).toBe('option');
    expect(o.getAttribute('data-value')).toBe('a');
    expect(o.getAttribute('data-label')).toBe('Apple');
    expect(o.textContent.trim()).toBe('Apple');
  });

  it('captures slot content into slotContent state (trimmed)', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-select-option value="x">  Hello world  </aegov-select-option>`),
    });
    const inst = (opt(page.root) as any).component;
    // Stencil's spec mode exposes the instance via a private field; fall back
    // to data-label which mirrors the captured slot content.
    expect(opt(page.root).getAttribute('data-label')).toBe('Hello world');
    if (inst) expect(inst.slotContent).toBe('Hello world');
  });

  it('reflects isDisabled via aria-disabled', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-select-option value="a" is-disabled="true">A</aegov-select-option>`),
    });
    expect(opt(page.root).getAttribute('aria-disabled')).toBe('true');
  });

  it('omits aria-disabled when not disabled', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-select-option value="a">A</aegov-select-option>`),
    });
    expect(opt(page.root).getAttribute('aria-disabled')).toBeNull();
  });

  it('defaults value to empty string', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: wrap(`<aegov-select-option>Free</aegov-select-option>`),
    });
    expect(opt(page.root).getAttribute('data-value')).toBe('');
  });

  it('throws when used outside aegov-select', async () => {
    await expect(
      newSpecPage({
        components: [AegovSelectOption],
        html: `<aegov-select-option value="a">A</aegov-select-option>`,
      }),
    ).rejects.toThrow('must be used inside <aegov-select>');
  });
});
