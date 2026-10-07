import { getPassThroughAttributes } from './attributes';

function elWithAttrs(attrs: Record<string, string>): HTMLElement {
  const el = document.createElement('div');
  Object.entries(attrs).forEach(([name, value]) => el.setAttribute(name, value));
  return el;
}

describe('getPassThroughAttributes', () => {
  it('collects aria-* and data-* attributes by default', () => {
    const el = elWithAttrs({ 'aria-label': 'hello', 'data-foo': 'bar', id: 'ignored' });
    expect(getPassThroughAttributes(el)).toEqual({ 'aria-label': 'hello', 'data-foo': 'bar' });
  });

  it('collects additional named attributes', () => {
    const el = elWithAttrs({ title: 'tip', tabindex: '-1', id: 'ignored' });
    expect(getPassThroughAttributes(el, new Set(['title', 'tabindex']))).toEqual({
      title: 'tip',
      tabindex: '-1',
    });
  });

  it('returns true for a bare boolean-reflected attribute (empty string value)', () => {
    const el = elWithAttrs({ autofocus: '' });
    expect(getPassThroughAttributes(el, new Set(['autofocus']))).toEqual({ autofocus: true });
  });

  it('returns true for a boolean-reflected attribute set to "true" or "autofocus"', () => {
    const trueEl = elWithAttrs({ autofocus: 'true' });
    const namedEl = elWithAttrs({ autofocus: 'autofocus' });
    expect(getPassThroughAttributes(trueEl, new Set(['autofocus']))).toEqual({ autofocus: true });
    expect(getPassThroughAttributes(namedEl, new Set(['autofocus']))).toEqual({ autofocus: true });
  });

  it('returns true for a boolean-reflected attribute set to "false" (HTML presence semantics)', () => {
    const el = elWithAttrs({ autofocus: 'false' });
    expect(getPassThroughAttributes(el, new Set(['autofocus']))).toEqual({ autofocus: true });
  });

  it('omits a boolean-reflected attribute entirely when absent', () => {
    const el = elWithAttrs({ id: 'ignored' });
    expect(getPassThroughAttributes(el, new Set(['autofocus']))).toEqual({});
  });

  it('applies the same boolean handling to "multiple"', () => {
    const el = elWithAttrs({ multiple: '' });
    expect(getPassThroughAttributes(el, new Set(['multiple']))).toEqual({ multiple: true });
  });

  it('preserves the string value of a non-boolean additional attribute, even when empty', () => {
    const el = elWithAttrs({ title: '' });
    expect(getPassThroughAttributes(el, new Set(['title']))).toEqual({ title: '' });
  });

  it('returns an empty object when the element is null', () => {
    expect(getPassThroughAttributes(null as unknown as HTMLElement)).toEqual({});
  });
});
