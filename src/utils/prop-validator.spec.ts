import { validateEnumProp, warnIfInvalidEnumProp } from './prop-validator';

const SIZES = ['xs', 'sm', 'base', 'lg'] as const;
const CTX = { component: 'aegov-test', prop: 'size' };

describe('validateEnumProp', () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation();
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  it('returns the value when it is in the allowed list', () => {
    expect(validateEnumProp('lg', SIZES, 'base', CTX)).toBe('lg');
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('returns the fallback when the value is not in the allowed list', () => {
    expect(validateEnumProp('huge', SIZES, 'base', CTX)).toBe('base');
  });

  it('warns once with component, prop, invalid value, and fallback', () => {
    validateEnumProp('huge', SIZES, 'base', CTX);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    const msg = warnSpy.mock.calls[0][0] as string;
    expect(msg).toContain('[aegov-test]');
    expect(msg).toContain('"size"');
    expect(msg).toContain('"huge"');
    expect(msg).toContain('base');
    expect(msg).toContain('xs, sm, base, lg');
  });

  it('stays quiet when value is undefined, null, or empty string', () => {
    validateEnumProp(undefined, SIZES, 'base', CTX);
    validateEnumProp(null, SIZES, 'base', CTX);
    validateEnumProp('', SIZES, 'base', CTX);
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('falls back and warns on non-string inputs', () => {
    expect(validateEnumProp(42, SIZES, 'base', CTX)).toBe('base');
    expect(validateEnumProp({}, SIZES, 'base', CTX)).toBe('base');
    expect(validateEnumProp(true, SIZES, 'base', CTX)).toBe('base');
    expect(warnSpy).toHaveBeenCalledTimes(3);
  });
});

describe('warnIfInvalidEnumProp', () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation();
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  it('warns on invalid value', () => {
    warnIfInvalidEnumProp('huge', SIZES, 'base', CTX);
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });

  it('does not warn on valid value', () => {
    warnIfInvalidEnumProp('sm', SIZES, 'base', CTX);
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('returns void (no return value)', () => {
    expect(warnIfInvalidEnumProp('lg', SIZES, 'base', CTX)).toBeUndefined();
  });
});
