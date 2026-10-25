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
export const ASPECT_RATIO_PRESETS = ['auto', 'square', 'video', '4/3', '3/2', '21/9'] as const;
export type AspectRatioPreset = typeof ASPECT_RATIO_PRESETS[number];

/**
 * Aspect ratio component object-fit types
 */
export const ASPECT_RATIO_FITS = ['cover', 'contain', 'fill', 'none', 'scale-down'] as const;
export type AspectRatioFit = typeof ASPECT_RATIO_FITS[number];

/**
 * Button component variant types (color scheme)
 */
export const BUTTON_VARIANTS = ['primary', 'secondary', 'danger', 'neutral-min', 'neutral-max'] as const;
export type ButtonVariant = typeof BUTTON_VARIANTS[number];

/**
 * Button component size types
 */
export const BUTTON_SIZES = ['xs', 'sm', 'base', 'lg', 'xl'] as const;
export type ButtonSize = typeof BUTTON_SIZES[number];

/**
 * Button component type attribute
 */
export const BUTTON_TYPES = ['button', 'submit', 'reset'] as const;
export type ButtonType = typeof BUTTON_TYPES[number];

/**
 * Button component appearance types (visual style)
 */
export const BUTTON_APPEARANCES = ['solid', 'outline', 'soft', 'link'] as const;
export type ButtonAppearance = typeof BUTTON_APPEARANCES[number];

/**
 * Button group component orientation types
 */
export const BUTTON_GROUP_ORIENTATIONS = ['horizontal', 'vertical'] as const;
export type ButtonGroupOrientation = typeof BUTTON_GROUP_ORIENTATIONS[number];

/**
 * Button group position types (set by button-group parent)
 */
export const BUTTON_GROUP_POSITIONS = ['first', 'middle', 'last', 'single'] as const;
export type ButtonGroupPosition = typeof BUTTON_GROUP_POSITIONS[number];

/**
 * Avatar component size types
 */
export const AVATAR_SIZES = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'] as const;
export type AvatarSize = typeof AVATAR_SIZES[number];

/**
 * Avatar component appearance types (shape)
 */
export const AVATAR_APPEARANCES = ['square', 'rounded'] as const;
export type AvatarAppearance = typeof AVATAR_APPEARANCES[number];

/**
 * Avatar component status types
 */
export const AVATAR_STATUSES = ['online', 'offline', 'away', 'unavailable', 'busy'] as const;
export type AvatarStatus = typeof AVATAR_STATUSES[number];

/**
 * Avatar group component variant types
 */
export const AVATAR_GROUP_VARIANTS = ['default', 'compact'] as const;
export type AvatarGroupVariant = typeof AVATAR_GROUP_VARIANTS[number];

/**
 * Blockquote component appearance types
 */
export const BLOCKQUOTE_APPEARANCES = ['primary', 'colored', 'coloured'] as const;
export type BlockquoteAppearance = typeof BLOCKQUOTE_APPEARANCES[number];

/**
 * Callout component variant types
 */
export const CALLOUT_VARIANTS = ['default', 'error', 'warning', 'success', 'info'] as const;
export type CalloutVariant = typeof CALLOUT_VARIANTS[number];

/**
 * Callout component appearance types
 */
export const CALLOUT_APPEARANCES = ['solid', 'soft'] as const;
export type CalloutAppearance = typeof CALLOUT_APPEARANCES[number];

/**
 * Callout component size types
 */
export const CALLOUT_SIZES = ['sm', 'base', 'lg'] as const;
export type CalloutSize = typeof CALLOUT_SIZES[number];

/**
 * Badge component size types
 */
export const BADGE_SIZES = ['sm', 'base', 'lg'] as const;
export type BadgeSize = typeof BADGE_SIZES[number];

/**
 * Badge component appearance types
 */
export const BADGE_APPEARANCES = ['solid', 'soft'] as const;
export type BadgeAppearance = typeof BADGE_APPEARANCES[number];

/**
 * Badge component color types
 */
export const BADGE_COLORS = [
  'default', 'primary', 'secondary', 'aegold', 'aered', 'aegreen', 'aeblack',
  'techblue', 'seablue', 'camel', 'desert', 'fuchsia', 'slate', 'purple',
  'pink', 'indigo', 'lime',
] as const;
export type BadgeColor = typeof BADGE_COLORS[number];

/**
 * Title component size types
 */
export const TITLE_SIZES = ['xs', 'sm', 'base', 'lg', 'xl','2xl', '3xl', 'text-h1', 'text-h2', 'text-h3', 'text-h4', 'text-h5', 'text-h6'] as const;
export type TitleSize = typeof TITLE_SIZES[number];

/**
 * Title component heading wrapper types.
 * Unset → renders <p> (default).
 */
export const TITLE_HEADING_TYPES = ['h2', 'h3', 'h4', 'h5', 'h6', 'p'] as const;
export type TitleHeadingType = typeof TITLE_HEADING_TYPES[number];

/**
 * Text component size types
 */
export const TEXT_SIZES = ['sm', 'base', 'lg'] as const;
export type TextSize = typeof TEXT_SIZES[number];

/**
 * Link component target types
 */
export const LINK_TARGETS = ['_blank', '_self', '_parent', '_top'] as const;
export type LinkTarget = typeof LINK_TARGETS[number];

/**
 * Breadcrumb component separator types
 */
export const BREADCRUMB_SEPARATORS = ['slash', 'chevron'] as const;
export type BreadcrumbSeparator = typeof BREADCRUMB_SEPARATORS[number];

/**
 * Form-wide colour family. Applied uniformly across all form components.
 * Drives idle border/ring, selected/checked fill, and value/accent text.
 * Focus ring (`primary-support-600` camel) and error tokens (`aered-*`) stay constant — not variant-affected.
 */
export const FORM_VARIANTS = ['primary', 'secondary', 'neutral-max', 'neutral-min'] as const;
export type FormVariant = typeof FORM_VARIANTS[number];

/**
 * Separator orientation
 */
export const SEPARATOR_ORIENTATIONS = ['horizontal', 'vertical'] as const;
export type SeparatorOrientation = typeof SEPARATOR_ORIENTATIONS[number];

/**
 * Separator appearance (line treatment)
 */
export const SEPARATOR_APPEARANCES = ['solid', 'light'] as const;
export type SeparatorAppearance = typeof SEPARATOR_APPEARANCES[number];

/**
 * Separator variant (colour family)
 */
export const SEPARATOR_VARIANTS = ['primary', 'secondary', 'neutral-max', 'neutral-min'] as const;
export type SeparatorVariant = typeof SEPARATOR_VARIANTS[number];

/**
 * Banner component position types
 */
export const BANNER_POSITIONS = ['top', 'bottom'] as const;
export type BannerPosition = typeof BANNER_POSITIONS[number];

/**
 * Banner component display types (CSS positioning)
 */
export const BANNER_DISPLAYS = ['fixed', 'sticky'] as const;
export type BannerDisplay = typeof BANNER_DISPLAYS[number];

/**
 * Banner component layout mode types
 */
export const BANNER_MODES = ['push', 'overlay'] as const;
export type BannerMode = typeof BANNER_MODES[number];

/**
 * Banner component ARIA role types
 */
export const BANNER_ROLES = ['region', 'alert', 'status'] as const;
export type BannerRole = typeof BANNER_ROLES[number];

/**
 * Banner component size types
 */
export const BANNER_SIZES = ['sm', 'base', 'lg'] as const;
export type BannerSize = typeof BANNER_SIZES[number];

/**
 * Accordion component icon types
 */
export const ACCORDION_ICONS = ['chevron', 'plus'] as const;
export type AccordionIcon = typeof ACCORDION_ICONS[number];

/**
 * Accordion component size types
 */
export const ACCORDION_SIZES = ['sm', 'base', 'lg'] as const;
export type AccordionSize = typeof ACCORDION_SIZES[number];

/**
 * Modal component position types
 */
export const MODAL_POSITIONS = ['center', 'top', 'bottom'] as const;
export type ModalPosition = typeof MODAL_POSITIONS[number];

/**
 * Modal component overlay opacity types
 */
export const MODAL_OVERLAY_OPACITIES = ['light', 'base', 'dark'] as const;
export type ModalOverlayOpacity = typeof MODAL_OVERLAY_OPACITIES[number];

/**
 * Modal component size types (drive padding + border-radius, mirroring card)
 */
export const MODAL_SIZES = ['sm', 'base', 'lg', 'xl'] as const;
export type ModalSize = typeof MODAL_SIZES[number];

/**
 * Tooltip component position types
 */
export const TOOLTIP_POSITIONS = ['top', 'right', 'bottom', 'left'] as const;
export type TooltipPosition = typeof TOOLTIP_POSITIONS[number];

/**
 * Tooltip component alignment types
 */
export const TOOLTIP_ALIGNS = ['start', 'center', 'end'] as const;
export type TooltipAlign = typeof TOOLTIP_ALIGNS[number];

/**
 * Tooltip component trigger types
 */
export const TOOLTIP_TRIGGERS = ['hover', 'click'] as const;
export type TooltipTrigger = typeof TOOLTIP_TRIGGERS[number];

/**
 * Dropdown component trigger types
 */
export const DROPDOWN_TRIGGERS = ['hover', 'click'] as const;
export type DropdownTrigger = typeof DROPDOWN_TRIGGERS[number];

/**
 * Dropdown component position types
 */
export const DROPDOWN_POSITIONS = ['top', 'right', 'bottom', 'left'] as const;
export type DropdownPosition = typeof DROPDOWN_POSITIONS[number];

/**
 * Dropdown component alignment types
 */
export const DROPDOWN_ALIGNS = ['start', 'center', 'end'] as const;
export type DropdownAlign = typeof DROPDOWN_ALIGNS[number];

/**
 * Pagination component size types
 */
export const PAGINATION_SIZES = ['sm', 'base', 'lg'] as const;
export type PaginationSize = typeof PAGINATION_SIZES[number];

/**
 * Pagination component variant types
 */
export const PAGINATION_VARIANTS = ['default', 'compact'] as const;
export type PaginationVariant = typeof PAGINATION_VARIANTS[number];

/**
 * Tabs component variant types
 */
export const TAB_VARIANTS = ['simple', 'segmented', 'pill'] as const;
export type TabVariant = typeof TAB_VARIANTS[number];

/**
 * Tabs component size types
 */
export const TAB_SIZES = ['sm', 'base', 'lg'] as const;
export type TabSize = typeof TAB_SIZES[number];

/**
 * Tabs component orientation types
 */
export const TAB_ORIENTATIONS = ['horizontal', 'vertical'] as const;
export type TabOrientation = typeof TAB_ORIENTATIONS[number];

/**
 * Toast component variant types
 */
export const TOAST_VARIANTS = ['default', 'error', 'warning', 'success', 'info'] as const;
export type ToastVariant = typeof TOAST_VARIANTS[number];

/**
 * Toast component appearance types
 */
export const TOAST_APPEARANCES = ['soft', 'solid'] as const;
export type ToastAppearance = typeof TOAST_APPEARANCES[number];

/**
 * Toast component position types
 */
export const TOAST_POSITIONS = [
  'top-right', 'top-left', 'top-center',
  'bottom-right', 'bottom-left', 'bottom-center',
] as const;
export type ToastPosition = typeof TOAST_POSITIONS[number];

/**
 * Toast component mode types
 */
export const TOAST_MODES = ['stack', 'rack'] as const;
export type ToastMode = typeof TOAST_MODES[number];

/**
 * Timeline component variant types
 */
export const TIMELINE_VARIANTS = ['default', 'compact'] as const;
export type TimelineVariant = typeof TIMELINE_VARIANTS[number];

/**
 * Timeline component size types
 */
export const TIMELINE_SIZES = ['sm', 'base', 'lg'] as const;
export type TimelineSize = typeof TIMELINE_SIZES[number];

/**
 * Timeline component orientation types
 */
export const TIMELINE_ORIENTATIONS = ['horizontal', 'vertical'] as const;
export type TimelineOrientation = typeof TIMELINE_ORIENTATIONS[number];

/**
 * Timeline step status types
 */
export const TIMELINE_STEP_STATUSES = ['completed', 'active', 'pending'] as const;
export type TimelineStepStatus = typeof TIMELINE_STEP_STATUSES[number];

/**
 * Card component border width types
 */
export const CARD_BORDER_WIDTHS = [1, 2, 3] as const;
export type CardBorderWidth = typeof CARD_BORDER_WIDTHS[number];

/**
 * Card component appearance types (border treatment)
 */
export const CARD_APPEARANCES = ['solid', 'light', 'creative'] as const;
export type CardAppearance = typeof CARD_APPEARANCES[number];

/**
 * Card component variant types (color family)
 */
export const CARD_VARIANTS = ['primary', 'secondary', 'neutral-max', 'neutral-min'] as const;
export type CardVariant = typeof CARD_VARIANTS[number];

/**
 * Card component hover effect types
 */
export const CARD_HOVERS = ['off', 'standard', 'glow'] as const;
export type CardHover = typeof CARD_HOVERS[number];

/**
 * Card component size types
 */
export const CARD_SIZES = ['sm', 'base', 'lg'] as const;
export type CardSize = typeof CARD_SIZES[number];

/**
 * Bento grid named gap sizes — map to Tailwind gap utilities.
 * none=0, xs=0.25rem, sm=0.5rem, md=1rem, lg=1.5rem, xl=2rem
 */
export const BENTO_GAPS = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const;
export type BentoGap = typeof BENTO_GAPS[number];

/**
 * Bento grid auto-flow modes.
 * - 'dense': browser fills holes left by larger spans (true bento packing)
 * - 'row':   strict DOM order, no backfilling
 */
export const BENTO_FLOWS = ['dense', 'row'] as const;
export type BentoFlow = typeof BENTO_FLOWS[number];

/**
 * Datepicker component mode types
 */
export const DATEPICKER_MODES = ['single', 'range'] as const;
export type DatepickerMode = typeof DATEPICKER_MODES[number];

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
] as const;
export type DatepickerPreset = typeof DATEPICKER_PRESETS[number];

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
export const INPUT_TYPES = [
  'text', 'email', 'password', 'tel', 'url', 'number', 'search',
  'date', 'time', 'datetime-local', 'month', 'week',
] as const;
export type InputType = typeof INPUT_TYPES[number];

/**
 * Input component size types
 */
export const INPUT_SIZES = ['xs', 'sm', 'base', 'lg', 'xl'] as const;
export type InputSize = typeof INPUT_SIZES[number];

/**
 * Textarea component size types (affects font size only)
 */
export const TEXTAREA_SIZES = ['xs', 'sm', 'base', 'lg', 'xl'] as const;
export type TextareaSize = typeof TEXTAREA_SIZES[number];

/**
 * Textarea component resize types
 */
export const TEXTAREA_RESIZES = ['none', 'vertical', 'horizontal', 'both', 'auto'] as const;
export type TextareaResize = typeof TEXTAREA_RESIZES[number];

/**
 * Select component variant types
 */
export const SELECT_VARIANTS = ['default', 'listbox'] as const;
export type SelectVariant = typeof SELECT_VARIANTS[number];

/**
 * Select component size types
 */
export const SELECT_SIZES = ['xs', 'sm', 'base', 'lg', 'xl'] as const;
export type SelectSize = typeof SELECT_SIZES[number];

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
export const CHECKBOX_SIZES = ['xs', 'sm', 'base', 'lg', 'xl'] as const;
export type CheckboxSize = typeof CHECKBOX_SIZES[number];

/**
 * Checkbox group variant types
 */
export const CHECKBOX_GROUP_VARIANTS = ['default', 'list', 'cards', 'pills'] as const;
export type CheckboxGroupVariant = typeof CHECKBOX_GROUP_VARIANTS[number];

/**
 * Checkbox group orientation types
 */
export const CHECKBOX_GROUP_ORIENTATIONS = ['vertical', 'horizontal'] as const;
export type CheckboxGroupOrientation = typeof CHECKBOX_GROUP_ORIENTATIONS[number];

/**
 * Radio component size types
 */
export const RADIO_SIZES = ['xs', 'sm', 'base', 'lg', 'xl'] as const;
export type RadioSize = typeof RADIO_SIZES[number];

/**
 * Radio group variant types
 */
export const RADIO_GROUP_VARIANTS = ['default', 'list', 'cards', 'pills'] as const;
export type RadioGroupVariant = typeof RADIO_GROUP_VARIANTS[number];

/**
 * Radio group orientation types
 */
export const RADIO_GROUP_ORIENTATIONS = ['vertical', 'horizontal'] as const;
export type RadioGroupOrientation = typeof RADIO_GROUP_ORIENTATIONS[number];

/**
 * Toggle component size types
 */
export const TOGGLE_SIZES = ['xs', 'sm', 'base', 'lg', 'xl'] as const;
export type ToggleSize = typeof TOGGLE_SIZES[number];

/**
 * File upload component variant types
 */
export const FILEUPLOAD_VARIANTS = ['default', 'button', 'dropzone'] as const;
export type FileuploadVariant = typeof FILEUPLOAD_VARIANTS[number];

/**
 * File upload component size types
 */
export const FILEUPLOAD_SIZES = ['xs', 'sm', 'base', 'lg', 'xl'] as const;
export type FileuploadSize = typeof FILEUPLOAD_SIZES[number];

/**
 * Range component size types (affects track height only)
 */
export const RANGE_SIZES = ['xs', 'sm', 'base', 'lg', 'xl'] as const;
export type RangeSize = typeof RANGE_SIZES[number];

/**
 * Range component display mode types
 */
export const RANGE_DISPLAYS = ['none', 'tooltip', 'thumb', 'full'] as const;
export type RangeDisplay = typeof RANGE_DISPLAYS[number];

/**
 * Range component orientation types
 */
export const RANGE_ORIENTATIONS = ['horizontal', 'vertical'] as const;
export type RangeOrientation = typeof RANGE_ORIENTATIONS[number];

/**
 * Range component mode types
 */
export const RANGE_MODES = ['single', 'range'] as const;
export type RangeMode = typeof RANGE_MODES[number];

/**
 * Progress component counter placement types
 */
export const PROGRESS_COUNTERS = ['trailing', 'top'] as const;
export type ProgressCounter = typeof PROGRESS_COUNTERS[number];

/**
 * OTP component visual variant types
 */
export const OTP_VARIANTS = ['continuous', 'individual'] as const;
export type OtpVariant = typeof OTP_VARIANTS[number];

/**
 * OTP component size types (maps to text size)
 */
export const OTP_SIZES = ['xs', 'sm', 'base', 'lg', 'xl', '2xl'] as const;
export type OtpSize = typeof OTP_SIZES[number];

/**
 * Popover component position types
 */
export const POPOVER_POSITIONS = ['top', 'right', 'bottom', 'left'] as const;
export type PopoverPosition = typeof POPOVER_POSITIONS[number];

/**
 * Popover component alignment types
 */
export const POPOVER_ALIGNS = ['start', 'center', 'end'] as const;
export type PopoverAlign = typeof POPOVER_ALIGNS[number];

/**
 * Popover component trigger types
 */
export const POPOVER_TRIGGERS = ['hover', 'click'] as const;
export type PopoverTrigger = typeof POPOVER_TRIGGERS[number];

/**
 * Drawer component position types
 */
export const DRAWER_POSITIONS = ['left', 'right', 'top', 'bottom'] as const;
export type DrawerPosition = typeof DRAWER_POSITIONS[number];

/**
 * Drawer component animation types
 */
export const DRAWER_ANIMATIONS = ['slide', 'fade', 'none'] as const;
export type DrawerAnimation = typeof DRAWER_ANIMATIONS[number];

/**
 * Drawer component backdrop opacity types
 */
export const DRAWER_OVERLAY_OPACITIES = ['light', 'base', 'dark'] as const;
export type DrawerOverlayOpacity = typeof DRAWER_OVERLAY_OPACITIES[number];

/**
 * Drawer component size types.
 * Controls the panel width (left/right drawers) or height (top/bottom drawers) plus padding
 * and, when unpinned, the edge gap and border-radius.
 * xs=320px, sm=384px, base=480px, lg=640px, xl=800px, full=100vw/100dvh.
 * On viewports <640px all left/right sizes collapse to full width.
 */
export const DRAWER_SIZES = ['xs', 'sm', 'base', 'lg', 'xl', 'full'] as const;
export type DrawerSize = typeof DRAWER_SIZES[number];

/**
 * Header component variant types
 */
export const HEADER_VARIANTS = ['ministry', 'authority'] as const;

/**
 * Breakpoints at which `aegov-header` may swap its navigation for the menu
 * toggle. Restricted to `md` and up: below 768px there is no viewport in which
 * a government navigation, the logo and the action buttons all fit on one row.
 */
export const HEADER_COLLAPSE_BREAKPOINTS = ['md', 'lg', 'xl', '2xl'] as const;
export type HeaderCollapseBreakpoint = typeof HEADER_COLLAPSE_BREAKPOINTS[number];
export type HeaderVariant = typeof HEADER_VARIANTS[number];

/**
 * aegov-header emblem colour tokens (authority variant). A closed set of brand
 * colours — the emblem is never tinted with arbitrary or inherited colours.
 */
export const HEADER_EMBLEM_COLORS = ['aeblack', 'aegold', 'whitely'] as const;
export type HeaderEmblemColor = typeof HEADER_EMBLEM_COLORS[number];

/**
 * Navbar component size types
 */
export const NAVBAR_SIZES = ['sm', 'base', 'lg'] as const;
export type NavbarSize = typeof NAVBAR_SIZES[number];

/**
 * Navblock component size types
 */
export const NAVBLOCK_SIZES = ['sm', 'base', 'lg'] as const;
export type NavblockSize = typeof NAVBLOCK_SIZES[number];

/**
 * Navblock component icon types (expand/collapse indicator)
 */
export const NAVBLOCK_ICONS = ['chevron', 'plus'] as const;
export type NavblockIcon = typeof NAVBLOCK_ICONS[number];

/**
 * Navblock component variant types
 */
export const NAVBLOCK_VARIANTS = ['collapsible', 'flat'] as const;
export type NavblockVariant = typeof NAVBLOCK_VARIANTS[number];

/**
 * Footer component nav-column variant types
 */
export const FOOTER_NAV_VARIANTS = ['collapsible', 'flat'] as const;
export type FooterNavVariant = typeof FOOTER_NAV_VARIANTS[number];

/**
 * Common component props
 */
export interface BaseComponentProps {
  /**
   * Additional CSS classes to apply (extra-class HTML attribute)
   */
  extraClass?: string;
}

// ────────────────────────────────────────────────────────────────────────────
// Validation surface (Layer 1)
// See: validation-engine-addon.md §2.1
// ────────────────────────────────────────────────────────────────────────────

/**
 * Validity snapshot mirroring the native `ValidityState` interface, but
 * synthesizable for custom controls (otp, datepicker, fileupload, listbox-select)
 * that don't expose a single inner native form element.
 */
export interface AegovValidityState {
  badInput: boolean;
  customError: boolean;
  patternMismatch: boolean;
  rangeOverflow: boolean;
  rangeUnderflow: boolean;
  stepMismatch: boolean;
  tooLong: boolean;
  tooShort: boolean;
  typeMismatch: boolean;
  valueMissing: boolean;
  valid: boolean;
}

/**
 * Trigger that caused a validation event to fire.
 * - `input` — fired during typing (mode: 'onInput')
 * - `change` — fired on value-change events
 * - `blur` — fired on blur (mode: 'onBlur', default)
 * - `submit` — fired during full-form validation on submit
 * - `manual` — fired by imperative `validate()` call
 */
export type AegovValidationTrigger = 'input' | 'change' | 'blur' | 'submit' | 'manual';

/**
 * Payload of the unified `aegovValidate` event emitted by every form component.
 * Generic `T` is the component-specific value type (string, boolean, File[],
 * ISO date string, etc.) — see validation-engine-addon.md §2.4.1 for the
 * canonical type per component.
 */
export interface AegovValidationDetail<T = unknown> {
  /** Field name from `name` attribute, or null if unnamed. */
  name: string | null;
  /** Current value at the time the event fires. */
  value: T;
  /** Mirrors native ValidityState; synthesized for custom controls. */
  validity: AegovValidityState;
  /** Human-readable validation message; empty if valid. */
  validationMessage: string;
  /** Custom error message set via `setCustomValidity()`; null if none. */
  customError: string | null;
  /** Trigger that caused the event. */
  trigger: AegovValidationTrigger;
}

/**
 * Return shape of the imperative `validate()` method on every form component.
 */
export interface AegovValidationResult {
  valid: boolean;
  message?: string;
  validity?: AegovValidityState;
}
