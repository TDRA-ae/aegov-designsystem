/**
 * Shared z-index stacking manager for overlay components (modal, drawer).
 * Each push() returns the next z-index; pop() decrements the count.
 */

const BASE_Z_INDEX = 50;
const Z_INDEX_INCREMENT = 10;

let openCount = 0;

/** Open overlays, in the order they opened — the last one is on top. */
const openOverlays: HTMLElement[] = [];

/**
 * Push a new overlay onto the stack and return its z-index.
 */
export function pushZIndex(overlay?: HTMLElement): number {
  if (overlay) openOverlays.push(overlay);
  openCount++;
  return BASE_Z_INDEX + (openCount - 1) * Z_INDEX_INCREMENT;
}

/**
 * Pop an overlay off the stack.
 */
export function popZIndex(overlay?: HTMLElement): void {
  const index = overlay ? openOverlays.lastIndexOf(overlay) : -1;
  if (index !== -1) openOverlays.splice(index, 1);
  openCount = Math.max(0, openCount - 1);
}

/**
 * Whether `overlay` is the most recently opened overlay still open. Each open
 * overlay listens for keys on `document`, so only the top one may act on
 * Escape (closing just itself, not every overlay under it) and on Tab (its
 * focus trap, not the trap of the overlay that opened it).
 */
export function isTopOverlay(overlay: HTMLElement): boolean {
  return openOverlays.length > 0 && openOverlays[openOverlays.length - 1] === overlay;
}

/**
 * Returns the current number of open overlays.
 */
export function getOpenOverlayCount(): number {
  return openCount;
}
