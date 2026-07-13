/**
 * Shared z-index stacking manager for overlay components (modal, drawer).
 * Each push() returns the next z-index; pop() decrements the count.
 */
const BASE_Z_INDEX = 50;
const Z_INDEX_INCREMENT = 10;
let openCount = 0;
/**
 * Push a new overlay onto the stack and return its z-index.
 */
export function pushZIndex() {
    openCount++;
    return BASE_Z_INDEX + (openCount - 1) * Z_INDEX_INCREMENT;
}
/**
 * Pop an overlay off the stack.
 */
export function popZIndex() {
    openCount = Math.max(0, openCount - 1);
}
/**
 * Returns the current number of open overlays.
 */
export function getOpenOverlayCount() {
    return openCount;
}
