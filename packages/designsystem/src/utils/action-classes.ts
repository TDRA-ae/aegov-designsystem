/**
 * Shared class-string builder for any element that should look like an aegov-button.
 *
 * Used by both `aegov-button` (renders <button>) and `aegov-link` (renders <a>)
 * so that button-styled anchors do not have to duplicate Tailwind utility lists.
 *
 * Keep this file the single source of truth for button visual styles —
 * any tweak here is automatically picked up by every component consuming it.
 */
import {
  BUTTON_APPEARANCES,
  BUTTON_GROUP_ORIENTATIONS,
  BUTTON_GROUP_POSITIONS,
  BUTTON_VARIANTS,
} from './types';
import type {
  ButtonAppearance,
  ButtonGroupOrientation,
  ButtonGroupPosition,
  ButtonSize,
  ButtonVariant,
} from './types';

export interface ActionClassOptions {
  variant?: ButtonVariant;
  appearance?: ButtonAppearance;
  size?: ButtonSize;
  isIcon?: boolean;
  isFull?: boolean;
  isBold?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  groupPosition?: ButtonGroupPosition;
  groupOrientation?: ButtonGroupOrientation;
}

const BASE_CLASSES = 'aegov-btn relative inline-flex shrink-0 cursor-pointer select-none flex-wrap items-center justify-center whitespace-nowrap no-underline transition-all duration-200 ease-in-out active:scale-[0.98] focus-visible:outline-2 disabled:cursor-default disabled:pointer-events-none disabled:cursor-not-allowed';

const SIZE_CLASSES: Record<ButtonSize, string[]> = {
  xs: ['btn-xs', 'h-9', 'rounded-md', 'gap-1.5', 'px-2.5', 'text-sm'],
  sm: ['btn-sm', 'h-10', 'rounded-md', 'gap-2', 'px-3', 'text-base'],
  base: ['btn-base', 'h-11', 'rounded-md', 'gap-2', 'px-3.5', 'text-base'],
  lg: ['btn-lg', 'h-12', 'rounded-lg', 'gap-3', 'px-4', 'text-lg'],
  xl: ['btn-lg', 'h-13', 'rounded-lg', 'gap-3', 'px-4.5', 'text-lg'],
};

const VARIANT_CLASSES: Record<ButtonVariant, string[]> = {
  // NOTE: focus-ring color is defined per-variant in aegov-button-shared.css
  // (via @apply outline-*), NOT here. Runtime class strings from this file are
  // not scanned by the Stencil Tailwind plugin, so outline-color utilities added
  // here never get generated into the button's (shadow) stylesheet.
  'primary': ['btn-primary'],
  'secondary': ['btn-secondary'],
  'danger': ['btn-danger'],
  'neutral-min': ['btn-neutral-min'],
  'neutral-max': ['btn-neutral-max'],
};

const APPEARANCE_CLASSES: Record<ButtonAppearance, string[]> = {
  solid: ['btn-solid', 'shadow-[inset_0px_1px_--theme(--color-whitely-50/.2)]', 'active:shadow-none', 'border-1', 'focus-visible:outline-offset-2', 'disabled:opacity-30'],
  outline: ['btn-outline', 'bg-transparent', 'border-2', 'focus-visible:outline-offset-0', 'disabled:opacity-50'],
  soft: ['btn-soft', 'border-0', 'focus-visible:outline-offset-2', 'disabled:opacity-50'],
  link: ['btn-link', 'bg-transparent', 'border-0', 'hover:underline', 'hover:decoration-2', 'hover:underline-offset-2', 'focus-visible:outline-offset-2', 'disabled:opacity-50'],
};

/**
 * Build the Tailwind class string for an action element (button or anchor)
 * styled like an aegov-button.
 *
 * Unknown enum values fall back to defaults (primary / solid / base) — same
 * tolerant behavior as `aegov-button` itself.
 */
export function getActionClasses(opts: ActionClassOptions = {}): string {
  const classes: string[] = [BASE_CLASSES];

  const size: ButtonSize = opts.size || 'base';
  const variant: ButtonVariant = (BUTTON_VARIANTS as readonly string[]).includes(opts.variant as string)
    ? (opts.variant as ButtonVariant)
    : 'primary';
  const appearance: ButtonAppearance = (BUTTON_APPEARANCES as readonly string[]).includes(opts.appearance as string)
    ? (opts.appearance as ButtonAppearance)
    : 'solid';

  classes.push(...(SIZE_CLASSES[size] || SIZE_CLASSES.base));
  classes.push(...VARIANT_CLASSES[variant]);
  classes.push(...APPEARANCE_CLASSES[appearance]);

  if (opts.isDisabled || opts.isLoading) {
    classes.push('cursor-not-allowed', 'pointer-events-none');
  }

  if (opts.isIcon) classes.push('btn-icon');
  if (opts.isFull) classes.push('w-full');
  if (opts.isBold) classes.push('font-semibold');

  const groupOrientation = (BUTTON_GROUP_ORIENTATIONS as readonly string[]).includes(opts.groupOrientation as string)
    ? (opts.groupOrientation as ButtonGroupOrientation)
    : undefined;
  const groupPosition = (BUTTON_GROUP_POSITIONS as readonly string[]).includes(opts.groupPosition as string)
    ? (opts.groupPosition as ButtonGroupPosition)
    : undefined;

  if (groupPosition && groupOrientation) {
    classes.push(`btn-grouped-${groupOrientation}`);
    if (groupPosition === 'single') {
      classes.push('btn-grouped-single');
    } else {
      classes.push(`btn-grouped-${groupPosition}-${groupOrientation}`);
    }
  }

  return classes.join(' ');
}
