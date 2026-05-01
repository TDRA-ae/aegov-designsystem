/**
 * Shared z-index stacking manager for overlay components (modal, drawer).
 * Each push() returns the next z-index; pop() decrements the count.
 */
/**
 * Push a new overlay onto the stack and return its z-index.
 */
export declare function pushZIndex(): number;
/**
 * Pop an overlay off the stack.
 */
export declare function popZIndex(): void;
/**
 * Returns the current number of open overlays.
 */
export declare function getOpenOverlayCount(): number;
