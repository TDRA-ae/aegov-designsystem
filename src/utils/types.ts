/**
 * AEGOV Design System - Type Definitions
 *
 * Shared TypeScript types and interfaces used across components
 */

/**
 * Aspect ratio component ratio presets
 */
export type AspectRatioPreset = 'auto' | 'square' | 'video' | '4/3' | '3/2' | '21/9';

/**
 * Aspect ratio component object-fit types
 */
export type AspectRatioFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

/**
 * Button component variant types
 */
export type ButtonVariant = 'solid' | 'outline' | 'soft' | 'link';

/**
 * Button component size types
 */
export type ButtonSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

/**
 * Button component type attribute
 */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Button component appearance types (color scheme)
 */
export type ButtonAppearance = 'primary' | 'secondary' | 'danger' | 'neutralMin' | 'neutralMax';

/**
 * Button group component orientation types
 */
export type ButtonGroupOrientation = 'horizontal' | 'vertical';

/**
 * Button group position types (set by button-group parent)
 */
export type ButtonGroupPosition = 'first' | 'middle' | 'last' | 'single';

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
 * Avatar group component mode types
 */
export type AvatarGroupMode = 'default' | 'compact';

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
 * Tooltip component position types
 */
export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

/**
 * Tooltip component alignment types
 */
export type TooltipAlign = 'start' | 'center' | 'end';

/**
 * Tooltip component trigger types
 */
export type TooltipTrigger = 'hover' | 'click';

/**
 * Dropdown component trigger types
 */
export type DropdownTrigger = 'hover' | 'click';

/**
 * Dropdown component position types
 */
export type DropdownPosition = 'top' | 'right' | 'bottom' | 'left';

/**
 * Dropdown component alignment types
 */
export type DropdownAlign = 'start' | 'center' | 'end';

/**
 * Pagination component size types
 */
export type PaginationSize = 'sm' | 'base' | 'lg';

/**
 * Pagination component variant types
 */
export type PaginationVariant = 'default' | 'compact';

/**
 * Tabs component variant types
 */
export type TabVariant = 'simple' | 'segmented' | 'pill';

/**
 * Tabs component size types
 */
export type TabSize = 'sm' | 'base' | 'lg';

/**
 * Tabs component orientation types
 */
export type TabOrientation = 'horizontal' | 'vertical';

/**
 * Toast component variant types
 */
export type ToastVariant = 'default' | 'error' | 'warning' | 'success' | 'info';

/**
 * Toast component appearance types
 */
export type ToastAppearance = 'soft' | 'solid';

/**
 * Toast component position types
 */
export type ToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';

/**
 * Toast component mode types
 */
export type ToastMode = 'stack' | 'rack';

/**
 * Timeline component variant types
 */
export type TimelineVariant = 'default' | 'compact';

/**
 * Timeline component size types
 */
export type TimelineSize = 'sm' | 'base' | 'lg';

/**
 * Timeline component orientation types
 */
export type TimelineOrientation = 'horizontal' | 'vertical';

/**
 * Timeline step status types
 */
export type TimelineStepStatus = 'completed' | 'active' | 'pending';

/**
 * Card component border width types
 */
export type CardBorderWidth = 1 | 2 | 3;

/**
 * Card component background types
 */
export type CardBackground = 'white' | 'transparent' | 'subtle';

/**
 * Card component border style types
 */
export type CardBorderStyle = 'standard' | 'light' | 'creative';

/**
 * Card component hover effect types
 */
export type CardHover = 'off' | 'standard' | 'glow';

/**
 * Datepicker component mode types
 */
export type DatepickerMode = 'single' | 'range';

/**
 * Datepicker range preset identifiers
 */
export type DatepickerPreset =
  | 'today' | 'yesterday' | 'tomorrow'
  | 'thisWeek' | 'lastWeek' | 'nextWeek'
  | 'last7Days' | 'next7Days' | 'last14Days' | 'next14Days'
  | 'last30Days' | 'next30Days'
  | 'thisMonth' | 'lastMonth' | 'nextMonth'
  | 'last3Months' | 'next3Months' | 'last6Months' | 'next6Months'
  | 'thisQuarter' | 'lastQuarter' | 'nextQuarter'
  | 'thisYear' | 'lastYear' | 'nextYear'
  | 'yearToDate' | 'allTime';

/**
 * Datepicker change event detail
 */
export interface DatepickerChangeDetail {
  /** Formatted date string (or "start / end" for range mode) */
  value: string;
  /** Selected date (single mode) */
  date: Date | null;
  /** Range start date (range mode) */
  startDate?: Date | null;
  /** Range end date (range mode) */
  endDate?: Date | null;
}

/**
 * Datepicker month change event detail
 */
export interface DatepickerMonthChangeDetail {
  month: number;
  year: number;
}

/**
 * Input component type attribute
 */
export type InputType = 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week';

/**
 * Input component size types
 */
export type InputSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

/**
 * Textarea component size types (affects font size only)
 */
export type TextareaSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

/**
 * Textarea component resize types
 */
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both' | 'auto';

/**
 * Select component variant types
 */
export type SelectVariant = 'default' | 'listbox';

/**
 * Select component size types
 */
export type SelectSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

/**
 * Select change event detail
 */
export interface SelectChangeDetail {
  /** Selected value (string for single, string[] for multiple) */
  value: string | string[];
  /** Selected label (string for single, string[] for multiple) */
  label: string | string[];
}

/**
 * Checkbox component size types
 */
export type CheckboxSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

/**
 * Checkbox group variant types
 */
export type CheckboxGroupVariant = 'default' | 'list' | 'cards' | 'pills';

/**
 * Checkbox group orientation types
 */
export type CheckboxGroupOrientation = 'vertical' | 'horizontal';

/**
 * Radio component size types
 */
export type RadioSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

/**
 * Radio group variant types
 */
export type RadioGroupVariant = 'default' | 'list' | 'cards' | 'pills';

/**
 * Radio group orientation types
 */
export type RadioGroupOrientation = 'vertical' | 'horizontal';

/**
 * Toggle component size types
 */
export type ToggleSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

/**
 * File upload component variant types
 */
export type FileuploadVariant = 'default' | 'button' | 'dropzone';

/**
 * File upload component size types
 */
export type FileuploadSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

/**
 * Range component size types (affects track height only)
 */
export type RangeSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

/**
 * Range component display mode types
 */
export type RangeDisplay = 'none' | 'tooltip' | 'thumb' | 'full';

/**
 * Range component orientation types
 */
export type RangeOrientation = 'horizontal' | 'vertical';

/**
 * Range component mode types
 */
export type RangeMode = 'single' | 'range';

/**
 * Progress component counter placement types
 */
export type ProgressCounter = 'trailing' | 'top';

/**
 * OTP component visual variant types
 */
export type OtpVariant = 'continuous' | 'individual';

/**
 * OTP component size types (maps to text size)
 */
export type OtpSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';

/**
 * Popover component position types
 */
export type PopoverPosition = 'top' | 'right' | 'bottom' | 'left';

/**
 * Popover component alignment types
 */
export type PopoverAlign = 'start' | 'center' | 'end';

/**
 * Popover component trigger types
 */
export type PopoverTrigger = 'hover' | 'click';

/**
 * Drawer component position types
 */
export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

/**
 * Drawer component animation types
 */
export type DrawerAnimation = 'slide' | 'fade' | 'none';

/**
 * Drawer component backdrop opacity types
 */
export type DrawerOverlayOpacity = 'light' | 'base' | 'dark';

/**
 * Header component variant types
 */
export type HeaderVariant = 'ministry' | 'authority';

/**
 * Common component props
 */
export interface BaseComponentProps {
  /**
   * Additional CSS classes to apply
   */
  class?: string;
}
