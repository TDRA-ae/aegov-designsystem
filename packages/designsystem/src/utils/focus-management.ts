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
 * Query focusable elements from shadow DOM slot assigned elements.
 * Used by shadow DOM components (modal, drawer) where content is slotted.
 */
/**
 * Collect focusable elements from the shadow roots of an element and its
 * descendants. Custom elements only — a tag name containing a hyphen.
 */
function getShadowFocusableElements(root: Element, selector: string): HTMLElement[] {
  const candidates = [root, ...Array.from(root.querySelectorAll('*'))];
  const focusable: HTMLElement[] = [];

  candidates.forEach((candidate) => {
    if (!candidate.tagName.includes('-')) return;
    const shadowRoot = (candidate as HTMLElement).shadowRoot;
    if (!shadowRoot) return;
    focusable.push(...(Array.from(shadowRoot.querySelectorAll(selector)) as HTMLElement[]));
  });

  return focusable;
}

export function getSlottedFocusableElements(shadowRoot: ShadowRoot, selector: string = FOCUSABLE_SELECTORS): HTMLElement[] {
  const slot = shadowRoot.querySelector('slot');
  if (!slot) return [];

  const slottedElements = slot.assignedElements({ flatten: true });
  const focusable: HTMLElement[] = [];

  slottedElements.forEach((element) => {
    // Include the slotted element itself if it is directly focusable
    if ((element as HTMLElement).matches?.(selector)) {
      focusable.push(element as HTMLElement);
    }
    focusable.push(...(Array.from(element.querySelectorAll(selector)) as HTMLElement[]));
    // Descend into shadow DOM web components. A slotted `aegov-button` is not
    // itself focusable and `querySelectorAll` cannot see the native <button>
    // in its shadow root, so without this the control is missing from the
    // trap — invisible to Tab and to the initial focus.
    focusable.push(...getShadowFocusableElements(element, selector));
  });

  return focusable;
}

/**
 * Handle Tab key to wrap focus within a list of focusable elements.
 * Used by modal and drawer for focus trapping.
 *
 * @returns true if focus was wrapped (event should be prevented), false otherwise
 */
export function handleTabKeyWrap(event: KeyboardEvent, focusableElements: HTMLElement[]): boolean {
  if (!focusableElements.length) return false;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  const activeElement = document.activeElement;

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
