/**
 * Shared portal element lifecycle for components that append content to document.body.
 * Used by dropdown, toast, datepicker, and similar portal-based components.
 */

/**
 * Create a portal div on document.body with the given CSS class name.
 */
export function createPortal(className: string): HTMLDivElement {
  const el = document.createElement('div');
  el.className = className;
  document.body.appendChild(el);
  return el;
}

/**
 * Remove a portal div from document.body and return undefined (for easy assignment).
 */
export function removePortal(el: HTMLDivElement | undefined): undefined {
  if (el && el.parentNode === document.body) {
    document.body.removeChild(el);
  }
  return undefined;
}
