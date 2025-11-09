# AEGOV Design System - Design Tokens & Variables

Complete reference for colors, typography, spacing, and other design tokens used in the AEGOV Design System.

---

## Table of Contents

1. [Color System](#color-system)
2. [Typography](#typography)
3. [Transitions](#transitions)
4. [Custom Utilities](#custom-utilities)
5. [Global Styles](#global-styles)
6. [Usage in Components](#usage-in-components)

---

## Color System

The AEGOV Design System uses **OKLCH color space** for all color definitions, providing better perceptual uniformity and color manipulation capabilities compared to RGB/HSL.

### Primary Brand Colors

#### AEGold (Primary)
Gold color palette - the primary brand color for AEGOV.

```css
--color-aegold-50:  oklch(0.975 0.013 97.4)  /* Lightest */
--color-aegold-100: oklch(0.940 0.039 97.4)
--color-aegold-200: oklch(0.879 0.071 94.2)
--color-aegold-300: oklch(0.802 0.104 91.1)
--color-aegold-400: oklch(0.734 0.121 85.9)
--color-aegold-500: oklch(0.660 0.114 80.7)
--color-aegold-600: oklch(0.570 0.097 84.4)  /* Default brand color */
--color-aegold-700: oklch(0.501 0.084 81.0)
--color-aegold-800: oklch(0.428 0.069 57.1)
--color-aegold-900: oklch(0.387 0.058 52.0)
--color-aegold-950: oklch(0.264 0.043 46.9)  /* Darkest */
```

**Primary Alias:**
```css
--color-primary-50 through --color-primary-950
/* Maps to aegold-50 through aegold-950 */
```

**Usage:**
- `bg-primary-600` - Default brand background
- `text-primary-700` - Brand text color
- `border-primary-600` - Brand borders

---

#### AEBlack (Secondary)
Neutral black/gray palette - used for secondary elements and text.

```css
--color-aeblack-50:  oklch(0.976 0.000 0.0)    /* Near white */
--color-aeblack-100: oklch(0.915 0.003 247.9)
--color-aeblack-200: oklch(0.826 0.008 260.7)
--color-aeblack-300: oklch(0.711 0.011 261.8)
--color-aeblack-400: oklch(0.592 0.014 259.8)
--color-aeblack-500: oklch(0.502 0.016 262.3)
--color-aeblack-600: oklch(0.427 0.016 266.5)
--color-aeblack-700: oklch(0.372 0.011 271.1)
--color-aeblack-800: oklch(0.264 0.006 258.4)  /* Default text color */
--color-aeblack-900: oklch(0.230 0.008 264.4)
--color-aeblack-950: oklch(0.169 0.006 271.0)  /* Darkest */
```

**Secondary Alias:**
```css
--color-secondary-50 through --color-secondary-950
/* Maps to aeblack-50 through aeblack-950 */
```

**Usage:**
- `text-aeblack-800` - Default body text color
- `bg-aeblack-50` - Light backgrounds
- `border-aeblack-300` - Subtle borders

---

#### AERed
Alert and error color palette.

```css
--color-aered-50:  oklch(0.971 0.013 17.4)
--color-aered-100: oklch(0.939 0.028 20.4)
--color-aered-200: oklch(0.889 0.055 21.0)
--color-aered-300: oklch(0.815 0.095 21.7)
--color-aered-400: oklch(0.719 0.151 24.0)
--color-aered-500: oklch(0.640 0.192 26.3)
--color-aered-600: oklch(0.584 0.199 27.5)  /* Default error color */
--color-aered-700: oklch(0.504 0.181 28.0)
--color-aered-800: oklch(0.443 0.151 27.4)
--color-aered-900: oklch(0.397 0.124 26.4)
--color-aered-950: oklch(0.258 0.082 26.8)
```

**Usage:**
- `bg-aered-600` - Error backgrounds
- `text-aered-700` - Error messages
- `border-aered-500` - Error borders

---

#### AEGreen
Success and positive feedback color palette.

```css
--color-aegreen-50:  oklch(0.978 0.011 149.9)
--color-aegreen-100: oklch(0.952 0.024 151.2)
--color-aegreen-200: oklch(0.902 0.046 150.1)
--color-aegreen-300: oklch(0.825 0.080 150.7)
--color-aegreen-400: oklch(0.722 0.112 149.8)
--color-aegreen-500: oklch(0.627 0.126 148.7)
--color-aegreen-600: oklch(0.581 0.122 148.5)  /* Default success color */
--color-aegreen-700: oklch(0.461 0.090 149.4)
--color-aegreen-800: oklch(0.397 0.067 149.9)
--color-aegreen-900: oklch(0.351 0.056 150.0)
--color-aegreen-950: oklch(0.238 0.040 151.6)
```

**Usage:**
- `bg-aegreen-600` - Success backgrounds
- `text-aegreen-700` - Success messages
- `border-aegreen-500` - Success borders

---

### Neutral Colors

#### Whitely
Pure white to off-white gradations.

```css
--color-whitely-50:  oklch(1.000 0.000 0.0)  /* Pure white */
--color-whitely-100: oklch(0.991 0.000 0.0)
--color-whitely-200: oklch(0.976 0.000 0.0)
--color-whitely-300: oklch(0.961 0.000 0.0)
--color-whitely-400: oklch(0.946 0.000 0.0)
--color-whitely-500: oklch(0.931 0.000 0.0)
```

**Usage:**
- `bg-whitely-50` - Pure white backgrounds
- `bg-whitely-100` - Slightly off-white backgrounds

---

### Support Colors

#### Camel
Warm brown/tan palette for accents.

```css
--color-camel-50:  oklch(0.987 0.021 95.3)
--color-camel-100: oklch(0.963 0.058 97.7)
--color-camel-200: oklch(0.923 0.113 96.6)
--color-camel-300: oklch(0.879 0.152 92.8)
--color-camel-400: oklch(0.836 0.163 86.0)
--color-camel-500: oklch(0.767 0.162 71.6)  /* Default/Focus ring */
--color-camel-600: oklch(0.665 0.154 60.2)
--color-camel-700: oklch(0.555 0.142 50.4)
--color-camel-800: oklch(0.472 0.121 47.0)
--color-camel-900: oklch(0.414 0.103 46.7)
--color-camel-950: oklch(0.279 0.072 46.6)
```

**Usage:**
- `outline-camel-500` - Focus rings
- `bg-camel-600` - Warm accent backgrounds

---

#### Slate
Cool gray palette.

```css
--color-slate-50:  oklch(0.984 0.003 247.9)
--color-slate-100: oklch(0.968 0.007 247.9)
--color-slate-200: oklch(0.929 0.013 255.5)
--color-slate-300: oklch(0.869 0.020 252.9)
--color-slate-400: oklch(0.711 0.035 256.8)
--color-slate-500: oklch(0.554 0.041 257.4)
--color-slate-600: oklch(0.446 0.037 257.3)
--color-slate-700: oklch(0.372 0.039 257.3)
--color-slate-800: oklch(0.279 0.037 260.0)
--color-slate-900: oklch(0.208 0.040 265.8)
--color-slate-950: oklch(0.129 0.041 264.7)
```

---

#### Fuchsia
Vibrant magenta/purple for UI accents.

```css
--color-fuchsia-50:  oklch(0.977 0.017 320.1)
--color-fuchsia-100: oklch(0.952 0.036 318.9)
--color-fuchsia-200: oklch(0.903 0.073 319.6)
--color-fuchsia-300: oklch(0.833 0.132 321.4)
--color-fuchsia-400: oklch(0.748 0.207 322.2)
--color-fuchsia-500: oklch(0.667 0.259 322.1)
--color-fuchsia-600: oklch(0.591 0.257 322.9)
--color-fuchsia-700: oklch(0.518 0.226 323.9)
--color-fuchsia-800: oklch(0.452 0.192 324.6)
--color-fuchsia-900: oklch(0.401 0.160 325.6)
--color-fuchsia-950: oklch(0.293 0.131 325.7)
```

---

#### TechBlue
Technology-themed blue for tech/digital elements.

```css
--color-techblue-50:  oklch(0.963 0.020 238.7)
--color-techblue-100: oklch(0.933 0.037 238.1)
--color-techblue-200: oklch(0.873 0.067 243.9)
--color-techblue-300: oklch(0.792 0.110 248.6)
--color-techblue-400: oklch(0.682 0.169 257.4)
--color-techblue-500: oklch(0.581 0.229 262.8)
--color-techblue-600: oklch(0.498 0.283 264.1)
--color-techblue-700: oklch(0.496 0.284 263.9)
--color-techblue-800: oklch(0.406 0.229 263.9)
--color-techblue-900: oklch(0.383 0.187 264.2)
--color-techblue-950: oklch(0.265 0.122 264.9)
```

---

#### SeaBlue
Ocean-inspired blue for calm UI elements.

```css
--color-seablue-50:  oklch(0.978 0.013 226.6)
--color-seablue-100: oklch(0.952 0.027 232.7)
--color-seablue-200: oklch(0.908 0.060 224.6)
--color-seablue-300: oklch(0.843 0.107 223.4)
--color-seablue-400: oklch(0.785 0.143 226.9)
--color-seablue-500: oklch(0.699 0.147 234.4)
--color-seablue-600: oklch(0.623 0.143 240.2)
--color-seablue-700: oklch(0.530 0.122 240.4)
--color-seablue-800: oklch(0.465 0.105 238.9)
--color-seablue-900: oklch(0.410 0.088 238.0)
--color-seablue-950: oklch(0.306 0.066 239.6)
```

---

#### Desert
Earth-toned orange/brown for warm accents.

```css
--color-desert-50:  oklch(0.975 0.013 60.6)
--color-desert-100: oklch(0.945 0.031 64.3)
--color-desert-200: oklch(0.883 0.064 59.1)
--color-desert-300: oklch(0.804 0.107 53.9)
--color-desert-400: oklch(0.714 0.153 45.8)
--color-desert-500: oklch(0.657 0.186 40.5)
--color-desert-600: oklch(0.624 0.198 36.0)
--color-desert-700: oklch(0.521 0.172 33.7)
--color-desert-800: oklch(0.446 0.141 32.0)
--color-desert-900: oklch(0.387 0.116 31.7)
--color-desert-950: oklch(0.253 0.074 29.3)
```

---

## Typography

### Font Families

```css
--font-roboto:     'Roboto', ui-sans-serif, system-ui, -apple-system, ...
--font-inter:      'Inter', ui-sans-serif, system-ui, sans-serif
--font-notokufi:   'Noto Kufi Arabic', ui-sans-serif, sans-serif
--font-alexandria: 'Alexandria', ui-sans-serif, system-ui, sans-serif
```

**Usage:**
- **Default body text (LTR):** `font-roboto`
- **Headings (LTR):** `font-inter`
- **Body text (RTL):** `font-notokufi`
- **Headings (RTL):** `font-alexandria`

### Font Sizes

```css
/* Standard Text Sizes */
--text-xs:      0.75rem    /* 12px */
--text-sm:      0.875rem   /* 14px */
--text-base:    1rem       /* 16px - Default */
--text-lg:      1.125rem   /* 18px */
--text-xl:      1.25rem    /* 20px */
--text-2xl:     1.5rem     /* 24px */
--text-3xl:     1.875rem   /* 30px */

/* Display & Heading Sizes */
--text-display: 4.75rem    /* 76px - Hero display text */
--text-h1:      3.875rem   /* 62px */
--text-h2:      3rem       /* 48px */
--text-h3:      2.5rem     /* 40px */
--text-h4:      2rem       /* 32px */
--text-h5:      1.625rem   /* 26px */
--text-h6:      1.25rem    /* 20px */
```

**Tailwind Classes:**
- `text-xs` through `text-3xl` - Standard sizes
- `text-display` - Hero/display text
- `text-h1` through `text-h6` - Heading sizes

---

## Transitions

### Duration

```css
--transition-duration-fast: 150ms
--transition-duration-base: 200ms  /* Default */
--transition-duration-slow: 300ms
```

### Timing Function

```css
--transition-timing-default: cubic-bezier(0.4, 0, 0.2, 1)  /* Ease-in-out */
```

**Usage:**
- Fast: Quick hovers, small animations
- Base: Default for most interactions
- Slow: Complex animations, state changes

---

## Custom Utilities

### Focus Ring

Provides consistent focus outline across all interactive elements.

```css
@utility focus-ring {
  outline: 2px solid var(--color-camel-500);
  outline-offset: 2px;
}
```

**Usage:**
```html
<button class="focus-ring">Button</button>
```

**Result:**
- 2px camel-500 colored outline
- 2px offset from element

---

### Button Transition

Smooth transitions for all button properties.

```css
@utility button-transition {
  transition-property: color, background-color, border-color,
                       opacity, box-shadow, transform;
  transition-duration: var(--transition-duration-base);
  transition-timing-function: var(--transition-timing-default);
}
```

**Usage:**
```html
<button class="button-transition bg-primary-600 hover:bg-primary-700">
  Hover me
</button>
```

**Animates:**
- Color changes
- Background changes
- Border changes
- Opacity
- Shadows
- Transforms

---

## Global Styles

Applied globally across the entire application via `src/global/global.css`.

### Box Sizing

```css
* {
  box-sizing: border-box;
}
```

All elements use `border-box` sizing model.

---

### HTML Element

```css
html {
  -webkit-tap-highlight-color: transparent;
  @apply scroll-smooth md:scroll-auto;
}
```

**Features:**
- Removes tap highlight on mobile
- Smooth scrolling on small screens
- Auto scrolling on medium+ screens

---

### Body Element

```css
body {
  color: var(--color-aeblack-800);  /* Default text color */
  @apply font-roboto m-0 p-0 text-base antialiased;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}
```

**Default Styles:**
- **Text color:** `aeblack-800` (dark gray)
- **Font family:** Roboto (LTR)
- **Font size:** `text-base` (16px)
- **Font smoothing:** Antialiased
- **Print colors:** Exact (no browser adjustments)
- **Margins/Padding:** Reset to 0

---

### RTL (Right-to-Left) Support

```css
body[dir="rtl"] {
  @apply font-notokufi;
  p {
    @apply leading-relaxed;
  }
}
```

**When `dir="rtl"` is set:**
- Font switches to Noto Kufi Arabic
- Paragraphs get relaxed line-height for better Arabic readability

---

### Headings (h1-h6)

#### LTR (Default)

```css
h1, h2, h3, h4, h5, h6 {
  @apply font-inter;  /* Inter font for all headings */
}

h1 { @apply text-h1 font-extrabold; }  /* 62px, weight 800 */
h2 { @apply text-h2 font-extrabold; }  /* 48px, weight 800 */
h3 { @apply text-h3 font-extrabold; }  /* 40px, weight 800 */
h4 { @apply text-h4 font-bold; }       /* 32px, weight 700 */
h5 { @apply text-h5 font-bold; }       /* 26px, weight 700 */
h6 { @apply text-h6 font-semibold; }   /* 20px, weight 600 */
```

#### RTL Support

```css
[dir="rtl"] h1,
[dir="rtl"] h2,
[dir="rtl"] h3,
[dir="rtl"] h4,
[dir="rtl"] h5,
[dir="rtl"] h6 {
  @apply font-alexandria;  /* Alexandria font for Arabic headings */
}
```

**Font Weights:**
- h1-h3: Extrabold (800)
- h4-h5: Bold (700)
- h6: Semibold (600)

---

### Paragraphs

```css
p {
  @apply mb-8 text-base;

  &.text-sm {
    @apply mb-7;
  }

  &.text-xs {
    @apply mb-6;
  }
}
```

**Default:**
- Bottom margin: `mb-8` (2rem / 32px)
- Font size: `text-base` (16px)

**Size-specific margins:**
- `text-sm`: `mb-7` (1.75rem / 28px)
- `text-xs`: `mb-6` (1.5rem / 24px)

---

## Usage in Components

### Accessing Colors

```tsx
// In component CSS
.my-element {
  color: var(--color-primary-600);
  background: var(--color-aeblack-50);
}

// In Tailwind classes
<div className="bg-primary-600 text-white">
  Brand colored background
</div>
```

### Using Typography

```tsx
// Font families
<body className="font-roboto">...</body>
<body dir="rtl" className="font-notokufi">...</body>
<h1 className="font-inter">Heading</h1>

// Font sizes
<p className="text-base">Default paragraph</p>
<h1 className="text-h1 font-extrabold">Large heading</h1>
<span className="text-xs">Small text</span>
```

### Using Transitions

```tsx
// Button with smooth transitions
<button className="button-transition bg-primary-600 hover:bg-primary-700">
  Click me
</button>

// Custom timing
<div
  className="transition-all"
  style={{ transitionDuration: 'var(--transition-duration-slow)' }}
>
  Slow animation
</div>
```

### Focus States

```tsx
// Standard focus ring
<input className="focus-ring" />

// Custom focus with brand color
<button className="focus:outline-none focus:ring-2 focus:ring-primary-500">
  Custom focus
</button>
```

---

## Important Notes

### OKLCH Color Space

All colors use OKLCH (Oklab Lightness Chroma Hue) format:

```css
oklch(L C H)
```

- **L (Lightness):** 0-1 (0 = black, 1 = white)
- **C (Chroma):** 0+ (saturation intensity)
- **H (Hue):** 0-360 degrees

**Benefits:**
- Perceptually uniform
- Better interpolation
- More vibrant colors
- Future-proof (CSS standard)

### Browser Support

OKLCH is supported in:
- ✅ Chrome 111+
- ✅ Safari 15.4+
- ✅ Firefox 113+
- ✅ Edge 111+

For older browsers, consider adding a fallback or polyfill.

---


## Customization for Consuming Projects

When using this design system, consuming projects can:

1. **Import the theme:**
```css
@import "@aegov/design-system/tailwind.css";
```

2. **Override design tokens:**
```css
@theme {
  /* Override primary color */
  --color-primary-600: oklch(0.5 0.2 180);

  /* Override font size */
  --text-base: 1.125rem;
}
```

3. **Extend with custom colors:**
```css
@theme {
  /* Add new brand color */
  --color-brand-50: oklch(0.95 0.05 200);
  --color-brand-500: oklch(0.6 0.15 200);
}
```

4. **Use Tailwind classes:**
```html
<aegov-button variant="solid" class="bg-primary-600 text-white">
  Click Me
</aegov-button>
```

The Tailwind processor in the consuming project will see these classes and generate the final CSS.

---

**Last Updated:** November 2025
**Version:** 0.1.0
**Status:** Production Ready
