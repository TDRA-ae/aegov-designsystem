/**
 * Shared portal element lifecycle for components that append content to document.body.
 * Used by dropdown, toast, datepicker, and similar portal-based components.
 */
/**
 * Create a portal div on document.body with the given CSS class name.
 */
export declare function createPortal(className: string): HTMLDivElement;
/**
 * Remove a portal div from document.body and return undefined (for easy assignment).
 */
export declare function removePortal(el: HTMLDivElement | undefined): undefined;
