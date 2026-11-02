import { pushZIndex, popZIndex, isTopOverlay } from './z-index-manager';

describe('z-index-manager overlay stack', () => {
  it('tracks the most recently opened overlay as the top one, whatever order they close in', () => {
    const a = document.createElement('div');
    const b = document.createElement('div');
    pushZIndex(a);
    expect(isTopOverlay(a)).toBe(true);
    pushZIndex(b);
    expect(isTopOverlay(a)).toBe(false);
    expect(isTopOverlay(b)).toBe(true);
    popZIndex(a);
    expect(isTopOverlay(b)).toBe(true);
    popZIndex(b);
    expect(isTopOverlay(b)).toBe(false);
  });
});
