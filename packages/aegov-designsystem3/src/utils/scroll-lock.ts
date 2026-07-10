/**
 * Shared body scroll lock for overlay components (modal, drawer).
 * Uses a reference counter so nested overlays don't unlock prematurely.
 */

let lockCount = 0;

export function lockBodyScroll(): void {
  lockCount++;
  if (lockCount > 1) return; // Already locked

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
}

export function unlockBodyScroll(): void {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
}
