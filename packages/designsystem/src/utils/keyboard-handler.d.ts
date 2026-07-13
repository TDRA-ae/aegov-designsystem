/**
 * Configurable keyboard event handler for popup/menu components.
 * Eliminates duplicate switch/case blocks across dropdown and similar components.
 */
export interface KeyboardHandlerConfig {
    /** Called on Escape key */
    onEscape?: () => void;
    /** Called on Tab key. Receives true if Shift+Tab (reverse). */
    onTab?: (reverse: boolean) => void;
    /** Called on ArrowDown key */
    onArrowDown?: () => void;
    /** Called on ArrowUp key */
    onArrowUp?: () => void;
    /** Called on Enter key */
    onEnter?: () => void;
    /** Called on Space key */
    onSpace?: () => void;
    /** Called on Home key */
    onHome?: () => void;
    /** Called on End key */
    onEnd?: () => void;
}
/**
 * Create a keyboard event handler from a config object.
 * Each configured key is automatically `preventDefault()`-ed when handled.
 *
 * Usage:
 * ```ts
 * private keyHandler = createKeyboardHandler({
 *   onEscape: () => { this.isOpen = false; },
 *   onArrowDown: () => { this.focusNextElement(false); },
 *   onArrowUp: () => { this.focusNextElement(true); },
 *   onTab: (reverse) => { this.focusNextElement(reverse); },
 * });
 *
 * @Listen('keydown', { target: 'document' })
 * handleKeyDown(event: KeyboardEvent) {
 *   if (!this.isOpen) return;
 *   this.keyHandler(event);
 * }
 * ```
 */
export declare function createKeyboardHandler(config: KeyboardHandlerConfig): (event: KeyboardEvent) => void;
