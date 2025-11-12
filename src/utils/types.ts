/**
 * AEGOV Design System - Type Definitions
 *
 * Shared TypeScript types and interfaces used across components
 */

/**
 * Button component variant types
 */
export type ButtonVariant = 'solid' | 'outline' | 'soft' | 'link';

/**
 * Button component size types
 */
export type ButtonSize = 'xs' | 'sm' | 'base' | 'lg';

/**
 * Button component type attribute
 */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Button component appearance types (color scheme)
 */
export type ButtonAppearance = 'primary' | 'secondary';

/**
 * Avatar component size types
 */
export type AvatarSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';

/**
 * Avatar component variant types
 */
export type AvatarVariant = 'square' | 'rounded';

/**
 * Avatar component status types
 */
export type AvatarStatus = 'online' | 'offline' | 'none';

/**
 * Blockquote component variant types
 */
export type BlockquoteVariant = 'primary' | 'colored' | 'coloured';

/**
 * Callout component variant types
 */
export type CalloutVariant = 'default' | 'error' | 'warning' | 'success' | 'info';

/**
 * Callout component appearance types
 */
export type CalloutAppearance = 'solid' | 'soft';

/**
 * Common component props
 */
export interface BaseComponentProps {
  /**
   * Additional CSS classes to apply
   */
  class?: string;
}
