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
export function getFocusableElements(container, selector = FOCUSABLE_SELECTORS) {
    return Array.from(container.querySelectorAll(selector));
}
/**
 * Query focusable elements from shadow DOM slot assigned elements.
 * Used by shadow DOM components (modal, drawer) where content is slotted.
 */
export function getSlottedFocusableElements(shadowRoot, selector = FOCUSABLE_SELECTORS) {
    const slot = shadowRoot.querySelector('slot');
    if (!slot)
        return [];
    const slottedElements = slot.assignedElements({ flatten: true });
    const focusable = [];
    slottedElements.forEach((element) => {
        focusable.push(...Array.from(element.querySelectorAll(selector)));
    });
    return focusable;
}
/**
 * Handle Tab key to wrap focus within a list of focusable elements.
 * Used by modal and drawer for focus trapping.
 *
 * @returns true if focus was wrapped (event should be prevented), false otherwise
 */
export function handleTabKeyWrap(event, focusableElements) {
    if (!focusableElements.length)
        return false;
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;
    if (event.shiftKey) {
        if (activeElement === firstElement || !focusableElements.includes(activeElement)) {
            lastElement.focus();
            event.preventDefault();
            return true;
        }
    }
    else {
        if (activeElement === lastElement || !focusableElements.includes(activeElement)) {
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
export function cycleFocus(focusableElements, currentIndex, reverse) {
    if (focusableElements.length === 0)
        return -1;
    let newIndex;
    if (reverse) {
        newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = focusableElements.length - 1;
        }
    }
    else {
        newIndex = currentIndex + 1;
        if (newIndex >= focusableElements.length) {
            newIndex = 0;
        }
    }
    focusableElements[newIndex].focus();
    return newIndex;
}
