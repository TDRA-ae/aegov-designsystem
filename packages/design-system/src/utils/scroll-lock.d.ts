/**
 * Shared body scroll lock for overlay components (modal, drawer).
 * Uses a reference counter so nested overlays don't unlock prematurely.
 */
export declare function lockBodyScroll(): void;
export declare function unlockBodyScroll(): void;
