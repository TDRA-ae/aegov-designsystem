/**
 * Shared focus management utilities for overlay/portal components.
 */
/**
 * Standard focusable element selectors for interactive components.
 */
export declare const FOCUSABLE_SELECTORS: string;
/**
 * Focusable selectors for menu-like components.
 * Includes role="menuitem" but excludes form elements not typical in menus.
 */
export declare const MENU_FOCUSABLE_SELECTORS: string;
/**
 * Query focusable elements within a container.
 */
export declare function getFocusableElements(container: Element, selector?: string): HTMLElement[];
/**
 * Query focusable elements from shadow DOM slot assigned elements.
 * Used by shadow DOM components (modal, drawer) where content is slotted.
 */
export declare function getSlottedFocusableElements(shadowRoot: ShadowRoot, selector?: string): HTMLElement[];
/**
 * Handle Tab key to wrap focus within a list of focusable elements.
 * Used by modal and drawer for focus trapping.
 *
 * @returns true if focus was wrapped (event should be prevented), false otherwise
 */
export declare function handleTabKeyWrap(event: KeyboardEvent, focusableElements: HTMLElement[]): boolean;
/**
 * Cycle focus through a list of elements by index.
 * Used by dropdown for arrow key / tab navigation.
 *
 * @returns The new focus index
 */
export declare function cycleFocus(focusableElements: HTMLElement[], currentIndex: number, reverse: boolean): number;
