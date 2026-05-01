/**
 * AEGOV Design System - Type Definitions
 *
 * Shared TypeScript types and interfaces used across components.
 *
 * Each enum prop is defined as a readonly `as const` array and a type
 * derived from that array. This gives the runtime a single source of truth
 * for validation (see src/utils/prop-validator.ts) while keeping the
 * compile-time type identical to the previous literal unions.
 */
/**
 * Aspect ratio component ratio presets
 */
export const ASPECT_RATIO_PRESETS = ['auto', 'square', 'video', '4/3', '3/2', '21/9'];
/**
 * Aspect ratio component object-fit types
 */
export const ASPECT_RATIO_FITS = ['cover', 'contain', 'fill', 'none', 'scale-down'];
/**
 * Button component variant types (color scheme)
 */
export const BUTTON_VARIANTS = ['primary', 'secondary', 'danger', 'neutralMin', 'neutralMax'];
/**
 * Button component size types
 */
export const BUTTON_SIZES = ['xs', 'sm', 'base', 'lg', 'xl'];
/**
 * Button component type attribute
 */
export const BUTTON_TYPES = ['button', 'submit', 'reset'];
/**
 * Button component appearance types (visual style)
 */
export const BUTTON_APPEARANCES = ['solid', 'outline', 'soft', 'link'];
/**
 * Button group component orientation types
 */
export const BUTTON_GROUP_ORIENTATIONS = ['horizontal', 'vertical'];
/**
 * Button group position types (set by button-group parent)
 */
export const BUTTON_GROUP_POSITIONS = ['first', 'middle', 'last', 'single'];
/**
 * Avatar component size types
 */
export const AVATAR_SIZES = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'];
/**
 * Avatar component appearance types (shape)
 */
export const AVATAR_APPEARANCES = ['square', 'rounded'];
/**
 * Avatar component status types
 */
export const AVATAR_STATUSES = ['online', 'offline', 'away', 'unavailable', 'busy'];
/**
 * Avatar group component variant types
 */
export const AVATAR_GROUP_VARIANTS = ['default', 'compact'];
/**
 * Blockquote component appearance types
 */
export const BLOCKQUOTE_APPEARANCES = ['primary', 'colored', 'coloured'];
/**
 * Callout component variant types
 */
export const CALLOUT_VARIANTS = ['default', 'error', 'warning', 'success', 'info'];
/**
 * Callout component appearance types
 */
export const CALLOUT_APPEARANCES = ['solid', 'soft'];
/**
 * Callout component size types
 */
export const CALLOUT_SIZES = ['sm', 'base', 'lg'];
/**
 * Badge component size types
 */
export const BADGE_SIZES = ['sm', 'base', 'lg'];
/**
 * Badge component appearance types
 */
export const BADGE_APPEARANCES = ['solid', 'soft'];
/**
 * Badge component color types
 */
export const BADGE_COLORS = [
    'default', 'primary', 'secondary', 'aegold', 'aered', 'aegreen', 'aeblack',
    'techblue', 'seablue', 'camel', 'desert', 'fuchsia', 'slate', 'purple',
    'pink', 'indigo', 'lime',
];
/**
 * Title component size types
 */
export const TITLE_SIZES = ['sm', 'base', 'lg', 'xl', '2xl'];
/**
 * Title component heading wrapper types.
 * Unset → renders <p> (default).
 */
export const TITLE_HEADING_TYPES = ['h2', 'h3', 'h4', 'h5', 'h6', 'p'];
/**
 * Text component size types
 */
export const TEXT_SIZES = ['sm', 'base', 'lg'];
/**
 * Link component target types
 */
export const LINK_TARGETS = ['_blank', '_self', '_parent', '_top'];
/**
 * Breadcrumb component separator types
 */
export const BREADCRUMB_SEPARATORS = ['slash', 'chevron'];
/**
 * Banner component position types
 */
export const BANNER_POSITIONS = ['top', 'bottom'];
/**
 * Banner component display types (CSS positioning)
 */
export const BANNER_DISPLAYS = ['fixed', 'sticky'];
/**
 * Banner component layout mode types
 */
export const BANNER_MODES = ['push', 'overlay'];
/**
 * Banner component ARIA role types
 */
export const BANNER_ROLES = ['region', 'alert', 'status'];
/**
 * Banner component size types
 */
export const BANNER_SIZES = ['sm', 'base', 'lg'];
/**
 * Accordion component icon types
 */
export const ACCORDION_ICONS = ['chevron', 'plus'];
/**
 * Accordion component size types
 */
export const ACCORDION_SIZES = ['sm', 'base', 'lg'];
/**
 * Modal component position types
 */
export const MODAL_POSITIONS = ['center', 'top', 'bottom'];
/**
 * Modal component overlay opacity types
 */
export const MODAL_OVERLAY_OPACITIES = ['light', 'base', 'dark'];
/**
 * Modal component size types (drive padding + border-radius, mirroring card)
 */
export const MODAL_SIZES = ['sm', 'base', 'lg'];
/**
 * Tooltip component position types
 */
export const TOOLTIP_POSITIONS = ['top', 'right', 'bottom', 'left'];
/**
 * Tooltip component alignment types
 */
export const TOOLTIP_ALIGNS = ['start', 'center', 'end'];
/**
 * Tooltip component trigger types
 */
export const TOOLTIP_TRIGGERS = ['hover', 'click'];
/**
 * Dropdown component trigger types
 */
export const DROPDOWN_TRIGGERS = ['hover', 'click'];
/**
 * Dropdown component position types
 */
export const DROPDOWN_POSITIONS = ['top', 'right', 'bottom', 'left'];
/**
 * Dropdown component alignment types
 */
export const DROPDOWN_ALIGNS = ['start', 'center', 'end'];
/**
 * Pagination component size types
 */
export const PAGINATION_SIZES = ['sm', 'base', 'lg'];
/**
 * Pagination component variant types
 */
export const PAGINATION_VARIANTS = ['default', 'compact'];
/**
 * Tabs component variant types
 */
export const TAB_VARIANTS = ['simple', 'segmented', 'pill'];
/**
 * Tabs component size types
 */
export const TAB_SIZES = ['sm', 'base', 'lg'];
/**
 * Tabs component orientation types
 */
export const TAB_ORIENTATIONS = ['horizontal', 'vertical'];
/**
 * Toast component variant types
 */
export const TOAST_VARIANTS = ['default', 'error', 'warning', 'success', 'info'];
/**
 * Toast component appearance types
 */
export const TOAST_APPEARANCES = ['soft', 'solid'];
/**
 * Toast component position types
 */
export const TOAST_POSITIONS = [
    'top-right', 'top-left', 'top-center',
    'bottom-right', 'bottom-left', 'bottom-center',
];
/**
 * Toast component mode types
 */
export const TOAST_MODES = ['stack', 'rack'];
/**
 * Timeline component variant types
 */
export const TIMELINE_VARIANTS = ['default', 'compact'];
/**
 * Timeline component size types
 */
export const TIMELINE_SIZES = ['sm', 'base', 'lg'];
/**
 * Timeline component orientation types
 */
export const TIMELINE_ORIENTATIONS = ['horizontal', 'vertical'];
/**
 * Timeline step status types
 */
export const TIMELINE_STEP_STATUSES = ['completed', 'active', 'pending'];
/**
 * Card component border width types
 */
export const CARD_BORDER_WIDTHS = [1, 2, 3];
/**
 * Card component background types
 */
export const CARD_BGS = ['white', 'subtle'];
/**
 * Card component border style types
 */
export const CARD_BORDER_STYLES = ['standard', 'light', 'creative', 'highlight'];
/**
 * Card component hover effect types
 */
export const CARD_HOVERS = ['off', 'standard', 'glow'];
/**
 * Card component size types
 */
export const CARD_SIZES = ['sm', 'base', 'lg'];
/**
 * Datepicker component mode types
 */
export const DATEPICKER_MODES = ['single', 'range'];
/**
 * Datepicker range preset identifiers
 */
export const DATEPICKER_PRESETS = [
    'today', 'yesterday', 'tomorrow',
    'thisWeek', 'lastWeek', 'nextWeek',
    'last7Days', 'next7Days', 'last14Days', 'next14Days',
    'last30Days', 'next30Days',
    'thisMonth', 'lastMonth', 'nextMonth',
    'last3Months', 'next3Months', 'last6Months', 'next6Months',
    'thisQuarter', 'lastQuarter', 'nextQuarter',
    'thisYear', 'lastYear', 'nextYear',
    'yearToDate', 'allTime',
];
/**
 * Input component type attribute
 */
export const INPUT_TYPES = [
    'text', 'email', 'password', 'tel', 'url', 'number', 'search',
    'date', 'time', 'datetime-local', 'month', 'week',
];
/**
 * Input component size types
 */
export const INPUT_SIZES = ['xs', 'sm', 'base', 'lg', 'xl'];
/**
 * Textarea component size types (affects font size only)
 */
export const TEXTAREA_SIZES = ['xs', 'sm', 'base', 'lg', 'xl'];
/**
 * Textarea component resize types
 */
export const TEXTAREA_RESIZES = ['none', 'vertical', 'horizontal', 'both', 'auto'];
/**
 * Select component variant types
 */
export const SELECT_VARIANTS = ['default', 'listbox'];
/**
 * Select component size types
 */
export const SELECT_SIZES = ['xs', 'sm', 'base', 'lg', 'xl'];
/**
 * Checkbox component size types
 */
export const CHECKBOX_SIZES = ['xs', 'sm', 'base', 'lg', 'xl'];
/**
 * Checkbox group variant types
 */
export const CHECKBOX_GROUP_VARIANTS = ['default', 'list', 'cards', 'pills'];
/**
 * Checkbox group orientation types
 */
export const CHECKBOX_GROUP_ORIENTATIONS = ['vertical', 'horizontal'];
/**
 * Radio component size types
 */
export const RADIO_SIZES = ['xs', 'sm', 'base', 'lg', 'xl'];
/**
 * Radio group variant types
 */
export const RADIO_GROUP_VARIANTS = ['default', 'list', 'cards', 'pills'];
/**
 * Radio group orientation types
 */
export const RADIO_GROUP_ORIENTATIONS = ['vertical', 'horizontal'];
/**
 * Toggle component size types
 */
export const TOGGLE_SIZES = ['xs', 'sm', 'base', 'lg', 'xl'];
/**
 * File upload component variant types
 */
export const FILEUPLOAD_VARIANTS = ['default', 'button', 'dropzone'];
/**
 * File upload component size types
 */
export const FILEUPLOAD_SIZES = ['xs', 'sm', 'base', 'lg', 'xl'];
/**
 * Range component size types (affects track height only)
 */
export const RANGE_SIZES = ['xs', 'sm', 'base', 'lg', 'xl'];
/**
 * Range component display mode types
 */
export const RANGE_DISPLAYS = ['none', 'tooltip', 'thumb', 'full'];
/**
 * Range component orientation types
 */
export const RANGE_ORIENTATIONS = ['horizontal', 'vertical'];
/**
 * Range component mode types
 */
export const RANGE_MODES = ['single', 'range'];
/**
 * Progress component counter placement types
 */
export const PROGRESS_COUNTERS = ['trailing', 'top'];
/**
 * OTP component visual variant types
 */
export const OTP_VARIANTS = ['continuous', 'individual'];
/**
 * OTP component size types (maps to text size)
 */
export const OTP_SIZES = ['xs', 'sm', 'base', 'lg', 'xl', '2xl'];
/**
 * Popover component position types
 */
export const POPOVER_POSITIONS = ['top', 'right', 'bottom', 'left'];
/**
 * Popover component alignment types
 */
export const POPOVER_ALIGNS = ['start', 'center', 'end'];
/**
 * Popover component trigger types
 */
export const POPOVER_TRIGGERS = ['hover', 'click'];
/**
 * Drawer component position types
 */
export const DRAWER_POSITIONS = ['left', 'right', 'top', 'bottom'];
/**
 * Drawer component animation types
 */
export const DRAWER_ANIMATIONS = ['slide', 'fade', 'none'];
/**
 * Drawer component backdrop opacity types
 */
export const DRAWER_OVERLAY_OPACITIES = ['light', 'base', 'dark'];
/**
 * Drawer component size types (drive padding, plus gap + border-radius when unpinned). Mirrors aegov-card sizing tokens.
 */
export const DRAWER_SIZES = ['sm', 'base', 'lg'];
/**
 * Header component variant types
 */
export const HEADER_VARIANTS = ['ministry', 'authority'];
/**
 * Navbar component size types
 */
export const NAVBAR_SIZES = ['sm', 'base', 'lg'];
