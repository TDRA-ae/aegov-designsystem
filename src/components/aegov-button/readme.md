# AEGov Button Component

A versatile, accessible button component for the AEGOV Design System built with StencilJS and Tailwind CSS v4.

## Overview

The `<aegov-button>` component provides a comprehensive button solution with multiple variants, sizes, and states. It supports both primary and secondary appearances, custom icons, loading states, and full accessibility features.

## Design Tokens

This component uses the following design tokens from the AEGOV Design System:

### Color Tokens

#### Primary Appearance
- `--color-primary-50` - Soft variant background
- `--color-primary-100` - Soft variant hover background
- `--color-primary-500` - Solid variant hover background
- `--color-primary-600` - Solid variant background, outline border, link text
- `--color-primary-700` - Soft variant text, outline text
- `--color-primary-support-600` - Focus ring color (Camel-600)

#### Secondary Appearance
- `--color-secondary-50` - Soft variant background, link hover background
- `--color-secondary-100` - Soft/outline hover background
- `--color-secondary-800` - Solid background, outline/link text
- `--color-secondary-950` - Solid hover background
- `--color-secondary-support-300` - Focus ring color (SeaBlue-300)

#### Neutral Colors
- `--color-whitely-50` - Solid button text color

### Transition Tokens
- `--transition-duration-slow` - Button state transitions (300ms)
- `--transition-timing-default` - Easing function (cubic-bezier(0.4, 0, 0.2, 1))

### Typography Tokens
- `--text-sm` - Extra small button text (0.75rem / 12px)
- `--text-base` - Small & base button text (1rem / 16px)
- `--text-lg` - Large button text (1.125rem / 18px)

## Properties

| Property | Attribute | Type | Default | Description |
|----------|-----------|------|---------|-------------|
| `variant` | `variant` | `'solid' \| 'outline' \| 'soft' \| 'link'` | `'solid'` | Visual style of the button |
| `appearance` | `appearance` | `'primary' \| 'secondary'` | `'primary'` | Color scheme of the button |
| `size` | `size` | `'xs' \| 'sm' \| 'base' \| 'lg'` | `'base'` | Button size |
| `disabled` | `disabled` | `boolean` | `false` | Disables the button |
| `loading` | `loading` | `boolean` | `false` | Shows loading spinner |
| `icon` | `icon` | `boolean` | `false` | Icon-only button (square shape) |
| `full` | `full` | `boolean` | `false` | Full-width button |

## Events

| Event | Description | Detail |
|-------|-------------|--------|
| `aegovButtonClick` | Emitted when button is clicked | Native `MouseEvent` |
| `aegovButtonFocus` | Emitted when button receives focus | Native `FocusEvent` |
| `aegovButtonBlur` | Emitted when button loses focus | Native `FocusEvent` |

## Size Specifications

| Size | Height | Padding X | Text Size | Icon Size |
|------|--------|-----------|-----------|-----------|
| `xs` | 32px (2rem) | 16px (1rem) | 14px (0.875rem) | 18px (1.125rem) |
| `sm` | 40px (2.5rem) | 20px (1.25rem) | 16px (1rem) | 20px (1.25rem) |
| `base` | 48px (3rem) | 24px (1.5rem) | 16px (1rem) | 24px (1.5rem) |
| `lg` | 52px (3.25rem) | 28px (1.75rem) | 18px (1.125rem) | 28px (1.75rem) |

## Variants

### Solid (Default)
- Filled background with primary/secondary color
- White text
- Best for primary actions

### Outline
- Transparent background
- Colored border (2px)
- Colored text
- Best for secondary actions

### Soft
- Light colored background
- Colored text
- Best for subtle actions

### Link
- No background or border
- Colored text
- Best for text-based actions

## Usage Examples

### Basic Usage

```html
<!-- Primary solid button (default) -->
<aegov-button>Click Me</aegov-button>

<!-- Secondary outline button -->
<aegov-button variant="outline" appearance="secondary">
  Cancel
</aegov-button>

<!-- Large primary button -->
<aegov-button size="lg">
  Submit
</aegov-button>
```

### With Icons

```html
<!-- Button with leading icon -->
<aegov-button>
  <svg><!-- icon SVG --></svg>
  Save
</aegov-button>

<!-- Icon-only button -->
<aegov-button icon>
  <svg><!-- icon SVG --></svg>
</aegov-button>

<!-- Button with two icons -->
<aegov-button>
  <svg><!-- left icon --></svg>
  <svg><!-- right icon --></svg>
</aegov-button>
```

### States

```html
<!-- Disabled button -->
<aegov-button disabled>
  Disabled
</aegov-button>

<!-- Loading button -->
<aegov-button loading>
  Loading...
</aegov-button>

<!-- Full-width button -->
<aegov-button full>
  Full Width
</aegov-button>
```

## Accessibility Features

- **Keyboard Support**: Full keyboard navigation support
- **Focus Management**: Visible focus ring using design system tokens
- **ARIA Attributes**: Proper ARIA attributes for disabled and loading states
- **Screen Reader Support**: Accessible labels and state announcements
- **Semantic HTML**: Uses native `<button>` element
- **Touch Targets**: Meets WCAG 2.1 minimum touch target size (44x44px minimum)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- iOS Safari (latest)
- Android Chrome (latest)

## Dependencies

- `@stencil/core`: ^4.38.3
- `tailwindcss`: ^4.1.17
- `stencil-tailwind-plugin`: ^2.0.3

## Related Components

- `<aegov-avatar>` - Can be used inside button with `variant="link"` and `icon` attributes

## License

Copyright © 2025 AEGOV Design System. All rights reserved.
