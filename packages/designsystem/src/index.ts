/**
 * AEGOV Design System
 *
 * Main entry point for the design system library.
 *
 * Usage:
 *   // Lazy-loading (recommended for most apps):
 *   import { defineCustomElements } from '@aegov/designsystem/loader';
 *   defineCustomElements();
 *
 *   // Tree-shakeable individual imports:
 *   import { AegovButton } from '@aegov/designsystem/dist/components/aegov-button.js';
 */

// Re-export shared utility types for TypeScript consumers
export type {
  AccordionIcon,
  AvatarAppearance,
  AvatarGroupVariant,
  AvatarSize,
  AvatarStatus,
  BadgeAppearance,
  BadgeColor,
  BadgeSize,
  BannerDisplay,
  BannerMode,
  BannerPosition,
  BannerRole,
  BlockquoteAppearance,
  BreadcrumbSeparator,
  ButtonAppearance,
  ButtonGroupOrientation,
  ButtonGroupPosition,
  ButtonSize,
  ButtonType,
  ButtonVariant,
  CalloutAppearance,
  CalloutVariant,
  CardAppearance,
  CardBorderWidth,
  CardHover,
  CardVariant,
  CheckboxGroupOrientation,
  CheckboxGroupVariant,
  CheckboxSize,
  DatepickerChangeDetail,
  DatepickerMode,
  DatepickerMonthChangeDetail,
  DrawerAnimation,
  DrawerOverlayOpacity,
  DrawerPosition,
  DrawerSize,
  DropdownAlign,
  DropdownPosition,
  DropdownTrigger,
  FileuploadSize,
  FileuploadVariant,
  FormVariant,
  FooterNavVariant,
  InputSize,
  InputType,
  LinkTarget,
  ModalOverlayOpacity,
  ModalPosition,
  ModalSize,
  OtpSize,
  OtpVariant,
  PaginationSize,
  PaginationVariant,
  ProgressCounter,
  RadioGroupOrientation,
  RadioGroupVariant,
  RadioSize,
  RangeDisplay,
  RangeMode,
  RangeOrientation,
  RangeSize,
  SelectChangeDetail,
  SelectSize,
  SelectVariant,
  SeparatorAppearance,
  SeparatorOrientation,
  SeparatorVariant,
  TabOrientation,
  TabSize,
  TabVariant,
  TextareaResize,
  TextareaSize,
  TextSize,
  TimelineOrientation,
  TimelineSize,
  TimelineStepStatus,
  TimelineVariant,
  TitleSize,
  ToastAppearance,
  ToastMode,
  ToastPosition,
  ToastVariant,
  ToggleSize,
  TooltipAlign,
  TooltipPosition,
  TooltipTrigger,
} from './utils/types';

// Validation surface (Layer 1)
export type {
  AegovValidityState,
  AegovValidationDetail,
  AegovValidationTrigger,
  AegovValidationResult,
} from './utils/types';

// Validation value types per component (Layer 1)
export type { AegovRangeValue } from './components/aegov-range/aegov-range';
export type { AegovSelectValue } from './components/aegov-select/aegov-select';
export type { AegovDatepickerValue } from './components/aegov-datepicker/aegov-datepicker';
