/**
 * RTL detection utility.
 *
 * Resolves the effective text direction for an element by walking up to the
 * nearest ancestor with a `dir` attribute, falling back to `<html dir>`.
 *
 * Use this instead of duplicating `closest('[dir]')` logic per component.
 */
export function isRtl(el?: Element | null): boolean {
  if (el && typeof (el as Element).closest === 'function') {
    const parent = el.closest('[dir]');
    const parentDir = parent?.getAttribute('dir');
    if (parentDir) return parentDir === 'rtl';
  }
  if (typeof document !== 'undefined') {
    return document.documentElement.getAttribute('dir') === 'rtl';
  }
  return false;
}
