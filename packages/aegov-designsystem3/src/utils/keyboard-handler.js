/**
 * Configurable keyboard event handler for popup/menu components.
 * Eliminates duplicate switch/case blocks across dropdown and similar components.
 */
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
export function createKeyboardHandler(config) {
    return (event) => {
        let handler;
        switch (event.key) {
            case 'Escape':
                handler = config.onEscape;
                break;
            case 'Tab':
                if (config.onTab) {
                    event.preventDefault();
                    config.onTab(event.shiftKey);
                    return;
                }
                break;
            case 'ArrowDown':
                handler = config.onArrowDown;
                break;
            case 'ArrowUp':
                handler = config.onArrowUp;
                break;
            case 'Enter':
                handler = config.onEnter;
                break;
            case ' ':
                handler = config.onSpace;
                break;
            case 'Home':
                handler = config.onHome;
                break;
            case 'End':
                handler = config.onEnd;
                break;
        }
        if (handler) {
            event.preventDefault();
            handler();
        }
    };
}
