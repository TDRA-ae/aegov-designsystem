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
export declare const ASPECT_RATIO_PRESETS: readonly ["auto", "square", "video", "4/3", "3/2", "21/9"];
export type AspectRatioPreset = typeof ASPECT_RATIO_PRESETS[number];
/**
 * Aspect ratio component object-fit types
 */
export declare const ASPECT_RATIO_FITS: readonly ["cover", "contain", "fill", "none", "scale-down"];
export type AspectRatioFit = typeof ASPECT_RATIO_FITS[number];
/**
 * Button component variant types (color scheme)
 */
export declare const BUTTON_VARIANTS: readonly ["primary", "secondary", "danger", "neutralMin", "neutralMax"];
export type ButtonVariant = typeof BUTTON_VARIANTS[number];
/**
 * Button component size types
 */
export declare const BUTTON_SIZES: readonly ["xs", "sm", "base", "lg", "xl"];
export type ButtonSize = typeof BUTTON_SIZES[number];
/**
 * Button component type attribute
 */
export declare const BUTTON_TYPES: readonly ["button", "submit", "reset"];
export type ButtonType = typeof BUTTON_TYPES[number];
/**
 * Button component appearance types (visual style)
 */
export declare const BUTTON_APPEARANCES: readonly ["solid", "outline", "soft", "link"];
export type ButtonAppearance = typeof BUTTON_APPEARANCES[number];
/**
 * Button group component orientation types
 */
export declare const BUTTON_GROUP_ORIENTATIONS: readonly ["horizontal", "vertical"];
export type ButtonGroupOrientation = typeof BUTTON_GROUP_ORIENTATIONS[number];
/**
 * Button group position types (set by button-group parent)
 */
export declare const BUTTON_GROUP_POSITIONS: readonly ["first", "middle", "last", "single"];
export type ButtonGroupPosition = typeof BUTTON_GROUP_POSITIONS[number];
/**
 * Avatar component size types
 */
export declare const AVATAR_SIZES: readonly ["xs", "sm", "base", "lg", "xl", "2xl", "3xl"];
export type AvatarSize = typeof AVATAR_SIZES[number];
/**
 * Avatar component appearance types (shape)
 */
export declare const AVATAR_APPEARANCES: readonly ["square", "rounded"];
export type AvatarAppearance = typeof AVATAR_APPEARANCES[number];
/**
 * Avatar component status types
 */
export declare const AVATAR_STATUSES: readonly ["online", "offline", "away", "unavailable", "busy"];
export type AvatarStatus = typeof AVATAR_STATUSES[number];
/**
 * Avatar group component variant types
 */
export declare const AVATAR_GROUP_VARIANTS: readonly ["default", "compact"];
export type AvatarGroupVariant = typeof AVATAR_GROUP_VARIANTS[number];
/**
 * Blockquote component appearance types
 */
export declare const BLOCKQUOTE_APPEARANCES: readonly ["primary", "colored", "coloured"];
export type BlockquoteAppearance = typeof BLOCKQUOTE_APPEARANCES[number];
/**
 * Callout component variant types
 */
export declare const CALLOUT_VARIANTS: readonly ["default", "error", "warning", "success", "info"];
export type CalloutVariant = typeof CALLOUT_VARIANTS[number];
/**
 * Callout component appearance types
 */
export declare const CALLOUT_APPEARANCES: readonly ["solid", "soft"];
export type CalloutAppearance = typeof CALLOUT_APPEARANCES[number];
/**
 * Callout component size types
 */
export declare const CALLOUT_SIZES: readonly ["sm", "base", "lg"];
export type CalloutSize = typeof CALLOUT_SIZES[number];
/**
 * Badge component size types
 */
export declare const BADGE_SIZES: readonly ["sm", "base", "lg"];
export type BadgeSize = typeof BADGE_SIZES[number];
/**
 * Badge component appearance types
 */
export declare const BADGE_APPEARANCES: readonly ["solid", "soft"];
export type BadgeAppearance = typeof BADGE_APPEARANCES[number];
/**
 * Badge component color types
 */
export declare const BADGE_COLORS: readonly ["default", "primary", "secondary", "aegold", "aered", "aegreen", "aeblack", "techblue", "seablue", "camel", "desert", "fuchsia", "slate", "purple", "pink", "indigo", "lime"];
export type BadgeColor = typeof BADGE_COLORS[number];
/**
 * Title component size types
 */
export declare const TITLE_SIZES: readonly ["sm", "base", "lg", "xl", "2xl"];
export type TitleSize = typeof TITLE_SIZES[number];
/**
 * Title component heading wrapper types.
 * Unset → renders <p> (default).
 */
export declare const TITLE_HEADING_TYPES: readonly ["h2", "h3", "h4", "h5", "h6", "p"];
export type TitleHeadingType = typeof TITLE_HEADING_TYPES[number];
/**
 * Text component size types
 */
export declare const TEXT_SIZES: readonly ["sm", "base", "lg"];
export type TextSize = typeof TEXT_SIZES[number];
/**
 * Link component target types
 */
export declare const LINK_TARGETS: readonly ["_blank", "_self", "_parent", "_top"];
export type LinkTarget = typeof LINK_TARGETS[number];
/**
 * Breadcrumb component separator types
 */
export declare const BREADCRUMB_SEPARATORS: readonly ["slash", "chevron"];
export type BreadcrumbSeparator = typeof BREADCRUMB_SEPARATORS[number];
/**
 * Banner component position types
 */
export declare const BANNER_POSITIONS: readonly ["top", "bottom"];
export type BannerPosition = typeof BANNER_POSITIONS[number];
/**
 * Banner component display types (CSS positioning)
 */
export declare const BANNER_DISPLAYS: readonly ["fixed", "sticky"];
export type BannerDisplay = typeof BANNER_DISPLAYS[number];
/**
 * Banner component layout mode types
 */
export declare const BANNER_MODES: readonly ["push", "overlay"];
export type BannerMode = typeof BANNER_MODES[number];
/**
 * Banner component ARIA role types
 */
export declare const BANNER_ROLES: readonly ["region", "alert", "status"];
export type BannerRole = typeof BANNER_ROLES[number];
/**
 * Banner component size types
 */
export declare const BANNER_SIZES: readonly ["sm", "base", "lg"];
export type BannerSize = typeof BANNER_SIZES[number];
/**
 * Accordion component icon types
 */
export declare const ACCORDION_ICONS: readonly ["chevron", "plus"];
export type AccordionIcon = typeof ACCORDION_ICONS[number];
/**
 * Accordion component size types
 */
export declare const ACCORDION_SIZES: readonly ["sm", "base", "lg"];
export type AccordionSize = typeof ACCORDION_SIZES[number];
/**
 * Modal component position types
 */
export declare const MODAL_POSITIONS: readonly ["center", "top", "bottom"];
export type ModalPosition = typeof MODAL_POSITIONS[number];
/**
 * Modal component overlay opacity types
 */
export declare const MODAL_OVERLAY_OPACITIES: readonly ["light", "base", "dark"];
export type ModalOverlayOpacity = typeof MODAL_OVERLAY_OPACITIES[number];
/**
 * Modal component size types (drive padding + border-radius, mirroring card)
 */
export declare const MODAL_SIZES: readonly ["sm", "base", "lg"];
export type ModalSize = typeof MODAL_SIZES[number];
/**
 * Tooltip component position types
 */
export declare const TOOLTIP_POSITIONS: readonly ["top", "right", "bottom", "left"];
export type TooltipPosition = typeof TOOLTIP_POSITIONS[number];
/**
 * Tooltip component alignment types
 */
export declare const TOOLTIP_ALIGNS: readonly ["start", "center", "end"];
export type TooltipAlign = typeof TOOLTIP_ALIGNS[number];
/**
 * Tooltip component trigger types
 */
export declare const TOOLTIP_TRIGGERS: readonly ["hover", "click"];
export type TooltipTrigger = typeof TOOLTIP_TRIGGERS[number];
/**
 * Dropdown component trigger types
 */
export declare const DROPDOWN_TRIGGERS: readonly ["hover", "click"];
export type DropdownTrigger = typeof DROPDOWN_TRIGGERS[number];
/**
 * Dropdown component position types
 */
export declare const DROPDOWN_POSITIONS: readonly ["top", "right", "bottom", "left"];
export type DropdownPosition = typeof DROPDOWN_POSITIONS[number];
/**
 * Dropdown component alignment types
 */
export declare const DROPDOWN_ALIGNS: readonly ["start", "center", "end"];
export type DropdownAlign = typeof DROPDOWN_ALIGNS[number];
/**
 * Pagination component size types
 */
export declare const PAGINATION_SIZES: readonly ["sm", "base", "lg"];
export type PaginationSize = typeof PAGINATION_SIZES[number];
/**
 * Pagination component variant types
 */
export declare const PAGINATION_VARIANTS: readonly ["default", "compact"];
export type PaginationVariant = typeof PAGINATION_VARIANTS[number];
/**
 * Tabs component variant types
 */
export declare const TAB_VARIANTS: readonly ["simple", "segmented", "pill"];
export type TabVariant = typeof TAB_VARIANTS[number];
/**
 * Tabs component size types
 */
export declare const TAB_SIZES: readonly ["sm", "base", "lg"];
export type TabSize = typeof TAB_SIZES[number];
/**
 * Tabs component orientation types
 */
export declare const TAB_ORIENTATIONS: readonly ["horizontal", "vertical"];
export type TabOrientation = typeof TAB_ORIENTATIONS[number];
/**
 * Toast component variant types
 */
export declare const TOAST_VARIANTS: readonly ["default", "error", "warning", "success", "info"];
export type ToastVariant = typeof TOAST_VARIANTS[number];
/**
 * Toast component appearance types
 */
export declare const TOAST_APPEARANCES: readonly ["soft", "solid"];
export type ToastAppearance = typeof TOAST_APPEARANCES[number];
/**
 * Toast component position types
 */
export declare const TOAST_POSITIONS: readonly ["top-right", "top-left", "top-center", "bottom-right", "bottom-left", "bottom-center"];
export type ToastPosition = typeof TOAST_POSITIONS[number];
/**
 * Toast component mode types
 */
export declare const TOAST_MODES: readonly ["stack", "rack"];
export type ToastMode = typeof TOAST_MODES[number];
/**
 * Timeline component variant types
 */
export declare const TIMELINE_VARIANTS: readonly ["default", "compact"];
export type TimelineVariant = typeof TIMELINE_VARIANTS[number];
/**
 * Timeline component size types
 */
export declare const TIMELINE_SIZES: readonly ["sm", "base", "lg"];
export type TimelineSize = typeof TIMELINE_SIZES[number];
/**
 * Timeline component orientation types
 */
export declare const TIMELINE_ORIENTATIONS: readonly ["horizontal", "vertical"];
export type TimelineOrientation = typeof TIMELINE_ORIENTATIONS[number];
/**
 * Timeline step status types
 */
export declare const TIMELINE_STEP_STATUSES: readonly ["completed", "active", "pending"];
export type TimelineStepStatus = typeof TIMELINE_STEP_STATUSES[number];
/**
 * Card component border width types
 */
export declare const CARD_BORDER_WIDTHS: readonly [1, 2, 3];
export type CardBorderWidth = typeof CARD_BORDER_WIDTHS[number];
/**
 * Card component background types
 */
export declare const CARD_BGS: readonly ["white", "subtle"];
export type CardBg = typeof CARD_BGS[number];
/**
 * Card component border style types
 */
export declare const CARD_BORDER_STYLES: readonly ["standard", "light", "creative", "highlight"];
export type CardBorderStyle = typeof CARD_BORDER_STYLES[number];
/**
 * Card component hover effect types
 */
export declare const CARD_HOVERS: readonly ["off", "standard", "glow"];
export type CardHover = typeof CARD_HOVERS[number];
/**
 * Card component size types
 */
export declare const CARD_SIZES: readonly ["sm", "base", "lg"];
export type CardSize = typeof CARD_SIZES[number];
/**
 * Datepicker component mode types
 */
export declare const DATEPICKER_MODES: readonly ["single", "range"];
export type DatepickerMode = typeof DATEPICKER_MODES[number];
/**
 * Datepicker range preset identifiers
 */
export declare const DATEPICKER_PRESETS: readonly ["today", "yesterday", "tomorrow", "thisWeek", "lastWeek", "nextWeek", "last7Days", "next7Days", "last14Days", "next14Days", "last30Days", "next30Days", "thisMonth", "lastMonth", "nextMonth", "last3Months", "next3Months", "last6Months", "next6Months", "thisQuarter", "lastQuarter", "nextQuarter", "thisYear", "lastYear", "nextYear", "yearToDate", "allTime"];
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
export declare const INPUT_TYPES: readonly ["text", "email", "password", "tel", "url", "number", "search", "date", "time", "datetime-local", "month", "week"];
export type InputType = typeof INPUT_TYPES[number];
/**
 * Input component size types
 */
export declare const INPUT_SIZES: readonly ["xs", "sm", "base", "lg", "xl"];
export type InputSize = typeof INPUT_SIZES[number];
/**
 * Textarea component size types (affects font size only)
 */
export declare const TEXTAREA_SIZES: readonly ["xs", "sm", "base", "lg", "xl"];
export type TextareaSize = typeof TEXTAREA_SIZES[number];
/**
 * Textarea component resize types
 */
export declare const TEXTAREA_RESIZES: readonly ["none", "vertical", "horizontal", "both", "auto"];
export type TextareaResize = typeof TEXTAREA_RESIZES[number];
/**
 * Select component variant types
 */
export declare const SELECT_VARIANTS: readonly ["default", "listbox"];
export type SelectVariant = typeof SELECT_VARIANTS[number];
/**
 * Select component size types
 */
export declare const SELECT_SIZES: readonly ["xs", "sm", "base", "lg", "xl"];
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
export declare const CHECKBOX_SIZES: readonly ["xs", "sm", "base", "lg", "xl"];
export type CheckboxSize = typeof CHECKBOX_SIZES[number];
/**
 * Checkbox group variant types
 */
export declare const CHECKBOX_GROUP_VARIANTS: readonly ["default", "list", "cards", "pills"];
export type CheckboxGroupVariant = typeof CHECKBOX_GROUP_VARIANTS[number];
/**
 * Checkbox group orientation types
 */
export declare const CHECKBOX_GROUP_ORIENTATIONS: readonly ["vertical", "horizontal"];
export type CheckboxGroupOrientation = typeof CHECKBOX_GROUP_ORIENTATIONS[number];
/**
 * Radio component size types
 */
export declare const RADIO_SIZES: readonly ["xs", "sm", "base", "lg", "xl"];
export type RadioSize = typeof RADIO_SIZES[number];
/**
 * Radio group variant types
 */
export declare const RADIO_GROUP_VARIANTS: readonly ["default", "list", "cards", "pills"];
export type RadioGroupVariant = typeof RADIO_GROUP_VARIANTS[number];
/**
 * Radio group orientation types
 */
export declare const RADIO_GROUP_ORIENTATIONS: readonly ["vertical", "horizontal"];
export type RadioGroupOrientation = typeof RADIO_GROUP_ORIENTATIONS[number];
/**
 * Toggle component size types
 */
export declare const TOGGLE_SIZES: readonly ["xs", "sm", "base", "lg", "xl"];
export type ToggleSize = typeof TOGGLE_SIZES[number];
/**
 * File upload component variant types
 */
export declare const FILEUPLOAD_VARIANTS: readonly ["default", "button", "dropzone"];
export type FileuploadVariant = typeof FILEUPLOAD_VARIANTS[number];
/**
 * File upload component size types
 */
export declare const FILEUPLOAD_SIZES: readonly ["xs", "sm", "base", "lg", "xl"];
export type FileuploadSize = typeof FILEUPLOAD_SIZES[number];
/**
 * Range component size types (affects track height only)
 */
export declare const RANGE_SIZES: readonly ["xs", "sm", "base", "lg", "xl"];
export type RangeSize = typeof RANGE_SIZES[number];
/**
 * Range component display mode types
 */
export declare const RANGE_DISPLAYS: readonly ["none", "tooltip", "thumb", "full"];
export type RangeDisplay = typeof RANGE_DISPLAYS[number];
/**
 * Range component orientation types
 */
export declare const RANGE_ORIENTATIONS: readonly ["horizontal", "vertical"];
export type RangeOrientation = typeof RANGE_ORIENTATIONS[number];
/**
 * Range component mode types
 */
export declare const RANGE_MODES: readonly ["single", "range"];
export type RangeMode = typeof RANGE_MODES[number];
/**
 * Progress component counter placement types
 */
export declare const PROGRESS_COUNTERS: readonly ["trailing", "top"];
export type ProgressCounter = typeof PROGRESS_COUNTERS[number];
/**
 * OTP component visual variant types
 */
export declare const OTP_VARIANTS: readonly ["continuous", "individual"];
export type OtpVariant = typeof OTP_VARIANTS[number];
/**
 * OTP component size types (maps to text size)
 */
export declare const OTP_SIZES: readonly ["xs", "sm", "base", "lg", "xl", "2xl"];
export type OtpSize = typeof OTP_SIZES[number];
/**
 * Popover component position types
 */
export declare const POPOVER_POSITIONS: readonly ["top", "right", "bottom", "left"];
export type PopoverPosition = typeof POPOVER_POSITIONS[number];
/**
 * Popover component alignment types
 */
export declare const POPOVER_ALIGNS: readonly ["start", "center", "end"];
export type PopoverAlign = typeof POPOVER_ALIGNS[number];
/**
 * Popover component trigger types
 */
export declare const POPOVER_TRIGGERS: readonly ["hover", "click"];
export type PopoverTrigger = typeof POPOVER_TRIGGERS[number];
/**
 * Drawer component position types
 */
export declare const DRAWER_POSITIONS: readonly ["left", "right", "top", "bottom"];
export type DrawerPosition = typeof DRAWER_POSITIONS[number];
/**
 * Drawer component animation types
 */
export declare const DRAWER_ANIMATIONS: readonly ["slide", "fade", "none"];
export type DrawerAnimation = typeof DRAWER_ANIMATIONS[number];
/**
 * Drawer component backdrop opacity types
 */
export declare const DRAWER_OVERLAY_OPACITIES: readonly ["light", "base", "dark"];
export type DrawerOverlayOpacity = typeof DRAWER_OVERLAY_OPACITIES[number];
/**
 * Drawer component size types (drive padding, plus gap + border-radius when unpinned). Mirrors aegov-card sizing tokens.
 */
export declare const DRAWER_SIZES: readonly ["sm", "base", "lg"];
export type DrawerSize = typeof DRAWER_SIZES[number];
/**
 * Header component variant types
 */
export declare const HEADER_VARIANTS: readonly ["ministry", "authority"];
export type HeaderVariant = typeof HEADER_VARIANTS[number];
/**
 * Navbar component size types
 */
export declare const NAVBAR_SIZES: readonly ["sm", "base", "lg"];
export type NavbarSize = typeof NAVBAR_SIZES[number];
/**
 * Common component props
 */
export interface BaseComponentProps {
    /**
     * Additional CSS classes to apply (extra-class HTML attribute)
     */
    extraClass?: string;
}
