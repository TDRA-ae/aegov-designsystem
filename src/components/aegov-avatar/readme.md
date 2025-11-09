# AEGov Avatar Component

A flexible, accessible avatar component for the AEGOV Design System built with StencilJS and Tailwind CSS v4.

## Overview

The `<aegov-avatar>` component displays user profile images with support for multiple sizes, shapes, status indicators, and fallback content. It includes proper accessibility features and graceful image error handling.

## Design Tokens

This component uses the following design tokens from the AEGOV Design System:

### Color Tokens

#### Background Colors
- `--color-aeblack-100` - Fallback background color

#### Ring Colors
- `--color-camel-600` - Avatar ring color
- `--color-whitely-50` - Status indicator ring color (white)

#### Status Indicator Colors
- `--color-aegreen-500` - Online status (green)
- `--color-aered-500` - Offline status (red)

### Size Tokens

All sizes use Tailwind's spacing scale:

| Size | Dimensions | Value |
|------|------------|-------|
| `xs` | 24px × 24px | `size-6` |
| `sm` | 32px × 32px | `size-8` |
| `base` | 40px × 40px | `size-10` |
| `lg` | 48px × 48px | `size-12` |
| `xl` | 56px × 56px | `size-14` |
| `2xl` | 64px × 64px | `size-16` |
| `3xl` | 80px × 80px | `size-20` |

## Properties

| Property | Attribute | Type | Default | Description |
|----------|-----------|------|---------|-------------|
| `src` | `src` | `string` | `undefined` | Image URL for the avatar |
| `alt` | `alt` | `string` | `'User avatar'` | Alternative text for the image |
| `size` | `size` | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` | `'base'` | Avatar size |
| `variant` | `variant` | `'square' \| 'rounded'` | `'square'` | Avatar shape |
| `status` | `status` | `boolean` | `false` | Show status indicator |
| `statusType` | `status-type` | `'online' \| 'offline' \| 'none'` | `'online'` | Type of status indicator |

## Size Specifications

| Size | Avatar | Status Indicator | Border Radius (lg+) |
|------|--------|------------------|---------------------|
| `xs` | 24×24px | 6×6px | Default (0.25rem) |
| `sm` | 32×32px | 8×8px | Default (0.25rem) |
| `base` | 40×40px | 10×10px | Default (0.25rem) |
| `lg` | 48×48px | 12×12px | Medium (0.375rem) |
| `xl` | 56×56px | 14×14px | Medium (0.375rem) |
| `2xl` | 64×64px | 16×16px | Large (0.5rem) |
| `3xl` | 80×80px | 20×20px | Large (0.5rem) |

## Variants

### Square (Default)
- Rounded corners (0.25rem for xs-base, increases for lg+)
- Professional appearance
- Best for corporate/formal contexts

### Rounded
- Fully circular shape
- Friendly appearance
- Best for social/casual contexts
- Status indicator positioned at top-right

## Status Indicators

### Online
- Green dot (`--color-aegreen-500`)
- Indicates user is active/available

### Offline
- Red dot (`--color-aered-500`)
- Indicates user is inactive/away

### None
- No indicator shown
- Default when `status="false"`

## Usage Examples

### Basic Usage

```html
<!-- Basic avatar with image -->
<aegov-avatar
  src="https://example.com/user.jpg"
  alt="John Doe">
</aegov-avatar>

<!-- Rounded avatar -->
<aegov-avatar
  variant="rounded"
  src="https://example.com/user.jpg"
  alt="Jane Smith">
</aegov-avatar>

<!-- Large avatar -->
<aegov-avatar
  size="lg"
  src="https://example.com/user.jpg"
  alt="User Name">
</aegov-avatar>
```

### With Status Indicators

```html
<!-- Online status -->
<aegov-avatar
  src="https://example.com/user.jpg"
  alt="Active User"
  status="true"
  status-type="online">
</aegov-avatar>

<!-- Offline status -->
<aegov-avatar
  src="https://example.com/user.jpg"
  alt="Away User"
  status="true"
  status-type="offline">
</aegov-avatar>
```

### Interactive Avatar Button

```html
<!-- Clickable avatar for user menu -->
<aegov-button variant="link" icon>
  <aegov-avatar
    size="base"
    variant="rounded"
    status="true"
    status-type="online"
    src="https://example.com/user.jpg"
    alt="User Menu">
  </aegov-avatar>
</aegov-button>

<!-- Profile button with different sizes -->
<aegov-button variant="link" icon>
  <aegov-avatar size="sm" variant="rounded" alt="Small Profile"></aegov-avatar>
</aegov-button>
<aegov-button variant="link" icon>
  <aegov-avatar size="base" variant="rounded" alt="Base Profile"></aegov-avatar>
</aegov-button>
<aegov-button variant="link" icon>
  <aegov-avatar size="lg" variant="rounded" alt="Large Profile"></aegov-avatar>
</aegov-button>
```

## Common Use Cases

### User Profile Header
```html
<aegov-avatar
  size="3xl"
  variant="rounded"
  status="true"
  status-type="online"
  src="/profile.jpg"
  alt="John Doe">
</aegov-avatar>
```

### Comment Section
```html
<aegov-avatar
  size="base"
  variant="square"
  src="/commenter.jpg"
  alt="Jane Smith">
</aegov-avatar>
```

### Team Members List
```html
<aegov-avatar size="sm" variant="rounded" status="true" status-type="online" alt="Member 1"></aegov-avatar>
<aegov-avatar size="sm" variant="rounded" status="true" status-type="online" alt="Member 2"></aegov-avatar>
<aegov-avatar size="sm" variant="rounded" status="true" status-type="offline" alt="Member 3"></aegov-avatar>
```

### Chat Messages
```html
<aegov-avatar size="xs" variant="rounded" src="/user.jpg" alt="Chat User"></aegov-avatar>
```

## Accessibility Features

- **ARIA Attributes**:
  - `role="img"` on avatar container
  - `aria-label` with descriptive text (uses `alt` prop or defaults to "User avatar")
  - Status indicator has `aria-label="Status: online/offline"`

- **Image Alt Text**: Required `alt` attribute for screen readers

- **Keyboard Navigation**: Properly structured for keyboard navigation

- **Fallback Support**: Graceful degradation when image fails to load

- **Semantic HTML**: Uses appropriate HTML elements

## Image Error Handling

The component handles image loading errors gracefully:

1. If image fails to load, displays fallback content
2. If no fallback content provided, shows built-in user icon
3. Adds `no-user` class for styling failed images

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

- `<aegov-button>` - Can contain avatar with `variant="link"` and `icon` attributes

## License

Copyright © 2025 AEGOV Design System. All rights reserved.
