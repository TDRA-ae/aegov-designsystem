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
 * Query focusable elements within a plain light-DOM container, piercing into any
 * descendant's own shadow root. Unlike `getSlottedFocusableElements` (which reads
 * a shadow-DOM host's own `<slot>` via `assignedElements()`), this walks a plain
 * container's regular children directly — for a `scoped` (non-shadow) component's
 * own wrapper element, whose slotted content already lives in ordinary light DOM
 * but may itself be a `shadow: true` component (e.g. `aegov-button`) whose real
 * interactive element a plain `querySelector`/`querySelectorAll` can never reach.
 */
export function getFocusableElementsDeep(container: Element, selector: string = FOCUSABLE_SELECTORS): HTMLElement[] {
  const focusable: HTMLElement[] = [];
  collectFocusableDeep(container, selector, focusable);
  return focusable;
}

/**
 * Resolves a stored focus-restoration target (e.g. "the element that was
 * focused before a menu/dialog opened") to whatever can actually receive
 * focus. A `shadow: true` component's host — `aegov-button` is the common
 * case — is often not itself focusable (no `delegatesFocus`, no reflected
 * `tabindex`): calling `.focus()` directly on it silently does nothing,
 * dropping focus to `<body>` instead of back where the user was. When the
 * stored element has its own shadow root, resolve to the first focusable
 * element inside it instead; otherwise the element itself is already the
 * right target.
 */
export function resolveFocusTarget(element: HTMLElement, selector: string = FOCUSABLE_SELECTORS): HTMLElement {
  if (element.shadowRoot) {
    const focusable: HTMLElement[] = [];
    collectFocusableDeep(element.shadowRoot, selector, focusable);
    if (focusable[0]) return focusable[0];
  }
  return element;
}

/**
 * Like `Element.contains()`, but correct when `el` is a DEEP element returned
 * by `getDeepActiveElement()` (i.e. it may live inside some shadow root).
 * Plain `.contains()` only traverses light DOM — it cannot see that a shadow
 * root's inner element is logically "inside" a light-DOM ancestor of its own
 * HOST. Walking up via each shadow root's `.host` once `container.contains()`
 * fails bridges that gap, re-checking containment one shadow level up each
 * time, until a plain light-DOM ancestor check succeeds or there's nowhere
 * left to climb.
 */
export function containsAcrossShadow(container: Element, el: Element | null): boolean {
  let current: Element | null = el;
  while (current) {
    if (container.contains(current)) return true;
    const root = current.getRootNode();
    current = root instanceof ShadowRoot ? root.host : null;
  }
  return false;
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
export function getDeepActiveElement(root: Document | ShadowRoot = document): Element | null {
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
