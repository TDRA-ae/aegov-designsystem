/**
 * Shared focus management utilities for overlay/portal components.
 */

/**
 * Standard focusable element selectors for interactive components.
 */
export const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Focusable selectors for menu-like components.
 * Includes role="menuitem" but excludes form elements not typical in menus.
 */
export const MENU_FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[role="menuitem"]:not([aria-disabled="true"])',
].join(',');

/**
 * Query focusable elements within a container.
 */
export function getFocusableElements(container: Element, selector: string = FOCUSABLE_SELECTORS): HTMLElement[] {
  return Array.from(container.querySelectorAll(selector)) as HTMLElement[];
}

/**
 * Depth-first walk that finds every element matching `selector`, piercing into
 * any descendant's OWN shadow root along the way. A plain `querySelectorAll`
 * only searches an element's light-DOM descendants — it cannot see inside a
 * `shadow: true` child like `aegov-button` (used as the action buttons in
 * nearly every documented modal/drawer example), whose real `<button>` lives
 * in its own shadow root. Recursing into `child.shadowRoot` when present
 * (falling back to the element's own light-DOM children otherwise) mirrors
 * what's actually rendered, so focus order matches visual order.
 */
function collectFocusableDeep(root: Element | ShadowRoot, selector: string, results: HTMLElement[]): void {
  const children = Array.from(root.children) as HTMLElement[];
  for (const child of children) {
    if (child.matches(selector)) {
      results.push(child);
    }
    if (child.shadowRoot) {
      collectFocusableDeep(child.shadowRoot, selector, results);
    } else {
      collectFocusableDeep(child, selector, results);
    }
  }
}

/**
 * Query focusable elements from shadow DOM slot assigned elements.
 * Used by shadow DOM components (modal, drawer) where content is slotted.
 */
export function getSlottedFocusableElements(shadowRoot: ShadowRoot, selector: string = FOCUSABLE_SELECTORS): HTMLElement[] {
  const slot = shadowRoot.querySelector('slot');
  if (!slot) return [];

  const slottedElements = slot.assignedElements({ flatten: true }) as HTMLElement[];
  const focusable: HTMLElement[] = [];

  slottedElements.forEach((element) => {
    // Include the slotted element itself if it is directly focusable
    if (element.matches?.(selector)) {
      focusable.push(element);
    }
    if (element.shadowRoot) {
      collectFocusableDeep(element.shadowRoot, selector, focusable);
    } else {
      collectFocusableDeep(element, selector, focusable);
    }
  });

  return focusable;
}

/**
 * Handle Tab key to wrap focus within a list of focusable elements.
 * Used by modal and drawer for focus trapping.
 *
 * @returns true if focus was wrapped (event should be prevented), false otherwise
 */
/**
 * `document.activeElement` stops at the first shadow boundary it would have to
 * cross — if the truly-focused element lives inside e.g. `aegov-button`'s own
 * shadow root, `document.activeElement` reports the `<aegov-button>` HOST, not
 * the inner `<button>` that `getSlottedFocusableElements` actually collected
 * and focused. Drill down through each shadow root's own `activeElement`
 * (recursively, in case of further nesting) to find the true focused element,
 * so comparisons against `focusableElements` (which stores the deep, real
 * targets) can actually match.
 */
function getDeepActiveElement(root: Document | ShadowRoot = document): Element | null {
  let active = root.activeElement;
  while (active && active.shadowRoot && active.shadowRoot.activeElement) {
    active = active.shadowRoot.activeElement;
  }
  return active;
}

export function handleTabKeyWrap(event: KeyboardEvent, focusableElements: HTMLElement[]): boolean {
  if (!focusableElements.length) return false;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  const activeElement = getDeepActiveElement();

  if (event.shiftKey) {
    if (activeElement === firstElement || !focusableElements.includes(activeElement as HTMLElement)) {
      lastElement.focus();
      event.preventDefault();
      return true;
    }
  } else {
    if (activeElement === lastElement || !focusableElements.includes(activeElement as HTMLElement)) {
      firstElement.focus();
      event.preventDefault();
      return true;
    }
  }

  return false;
}

/**
 * Cycle focus through a list of elements by index.
 * Used by dropdown for arrow key / tab navigation.
 *
 * @returns The new focus index
 */
export function cycleFocus(focusableElements: HTMLElement[], currentIndex: number, reverse: boolean): number {
  if (focusableElements.length === 0) return -1;

  let newIndex: number;
  if (reverse) {
    newIndex = currentIndex - 1;
    if (newIndex < 0) {
      newIndex = focusableElements.length - 1;
    }
  } else {
    newIndex = currentIndex + 1;
    if (newIndex >= focusableElements.length) {
      newIndex = 0;
    }
  }

  focusableElements[newIndex].focus();
  return newIndex;
}
