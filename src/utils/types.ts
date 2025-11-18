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
 * Badge component size types
 */
export type BadgeSize = 'sm' | 'base' | 'lg';

/**
 * Badge component appearance types
 */
export type BadgeAppearance = 'solid' | 'soft';

/**
 * Badge component color types
 */
export type BadgeColor = 'default' | 'primary' | 'secondary' | 'aegold' | 'aered' | 'aegreen' | 'aeblack' | 'techblue' | 'seablue' | 'camel' | 'desert' | 'fuchsia' | 'slate' | 'purple' | 'pink' | 'indigo' | 'lime';

/**
 * Title component size types
 */
export type TitleSize = 'base' | 'lg' | 'xl' | '2xl';

/**
 * Text component size types
 */
export type TextSize = 'sm' | 'base' | 'lg';

/**
 * Link component target types
 */
export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

/**
 * Breadcrumb component separator types
 */
export type BreadcrumbSeparator = 'slash' | 'chevron';

/**
 * Banner component position types
 */
export type BannerPosition = 'top' | 'bottom';

/**
 * Banner component display types (CSS positioning)
 */
export type BannerDisplay = 'fixed' | 'sticky';

/**
 * Banner component layout mode types
 */
export type BannerMode = 'push' | 'overlay';

/**
 * Banner component ARIA role types
 */
export type BannerRole = 'region' | 'alert' | 'status';

/**
 * Accordion component icon types
 */
export type AccordionIcon = 'chevron' | 'plus';

/**
 * Modal component position types
 */
export type ModalPosition = 'center' | 'top' | 'bottom';

/**
 * Modal component backdrop opacity types
 */
export type ModalBackdropOpacity = 'light' | 'base' | 'dark';

/**
 * Common component props
 */
export interface BaseComponentProps {
  /**
   * Additional CSS classes to apply
   */
  class?: string;
}
