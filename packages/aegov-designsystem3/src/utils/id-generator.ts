let counter = 0;

/**
 * Generate a unique ID with the given prefix.
 * Uses a shared module-level counter to ensure uniqueness across all components.
 *
 * @param prefix - The component prefix (e.g., 'aegov-input', 'aegov-checkbox')
 * @returns A unique string ID (e.g., 'aegov-input-1', 'aegov-checkbox-2')
 */
export function generateId(prefix: string): string {
  return `${prefix}-${++counter}`;
}
