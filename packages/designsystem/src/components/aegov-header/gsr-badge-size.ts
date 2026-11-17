/**
 * Intrinsic size of the Global Star Rating badge artwork (`gsr-badge.ts`).
 *
 * Kept apart from the artwork on purpose: `aegov-header` imports these
 * statically to size the badge box, while the ~40KB artwork module is only
 * reached through a dynamic import. Importing anything from `gsr-badge.ts`
 * statically would pull the artwork into the header's main chunk.
 */
export const GSR_BADGE_WIDTH = 912;
export const GSR_BADGE_HEIGHT = 964;
