# Avatar

<p class="text-lg text-aeblack-500 mb-8">An avatar is a visual representation of a user or entity. It displays a profile image, initials, or a default placeholder icon within a consistently sized container.</p>

## Introduction

The `aegov-avatar` component renders a compact visual identifier for a user. It supports **7 sizes**, **2 shape variants**, **5 presence statuses** (`online`, `offline`, `away`, `unavailable`, `busy`), image sources with automatic fallback, and custom slot content for initials or icons.

```html
<aegov-avatar></aegov-avatar>
```

<div class="flex flex-wrap items-center gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-avatar></aegov-avatar>
</div>

When no `src` is provided, a default user silhouette icon is displayed.

---

## Sizes

The `size` property controls the dimensions of the avatar. Seven sizes are available, ranging from extra small to triple extra large.

| Size   | Dimensions |
|--------|------------|
| `xs`   | 24 × 24px  |
| `sm`   | 32 × 32px  |
| `base` | 40 × 40px  |
| `lg`   | 48 × 48px  |
| `xl`   | 56 × 56px  |
| `2xl`  | 64 × 64px  |
| `3xl`  | 80 × 80px  |

```html
<aegov-avatar size="xs"></aegov-avatar>
<aegov-avatar size="sm"></aegov-avatar>
<aegov-avatar size="base"></aegov-avatar>
<aegov-avatar size="lg"></aegov-avatar>
<aegov-avatar size="xl"></aegov-avatar>
<aegov-avatar size="2xl"></aegov-avatar>
<aegov-avatar size="3xl"></aegov-avatar>
```

<div class="flex flex-wrap items-end gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-avatar size="xs"></aegov-avatar>
  <aegov-avatar size="sm"></aegov-avatar>
  <aegov-avatar size="base"></aegov-avatar>
  <aegov-avatar size="lg"></aegov-avatar>
  <aegov-avatar size="xl"></aegov-avatar>
  <aegov-avatar size="2xl"></aegov-avatar>
  <aegov-avatar size="3xl"></aegov-avatar>
</div>

### Responsive Size

The `size` prop accepts Tailwind-style responsive prefixes. Write a space-separated string where each token is either a plain value or `breakpoint:value`. The base value (no prefix) applies below the smallest specified breakpoint.

Available breakpoints: `xs` (480px), `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px), `3xl` (1680px).

```html
<aegov-avatar size="sm xl:2xl" src="https://i.pravatar.cc/150?img=1" alt="User"></aegov-avatar>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-avatar size="sm xl:2xl" src="https://i.pravatar.cc/150?img=1" alt="User"></aegov-avatar>
</div>

> **Graceful degradation:** Unknown breakpoint names and invalid values are silently ignored. An unrecognised base value falls back to the component default.

---

## Variants

The `appearance` property controls the shape of the avatar. Two variants are available.

### Square (default)

A square avatar with slightly rounded corners. Larger sizes (`lg` and above) use progressively larger border radii.

```html
<aegov-avatar appearance="square"></aegov-avatar>
```

<div class="flex flex-wrap items-end gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-avatar appearance="square" size="xs"></aegov-avatar>
  <aegov-avatar appearance="square" size="sm"></aegov-avatar>
  <aegov-avatar appearance="square" size="base"></aegov-avatar>
  <aegov-avatar appearance="square" size="lg"></aegov-avatar>
  <aegov-avatar appearance="square" size="xl"></aegov-avatar>
  <aegov-avatar appearance="square" size="2xl"></aegov-avatar>
  <aegov-avatar appearance="square" size="3xl"></aegov-avatar>
</div>

### Rounded

A fully circular avatar, ideal for user profile pictures.

```html
<aegov-avatar appearance="rounded"></aegov-avatar>
```

<div class="flex flex-wrap items-end gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-avatar appearance="rounded" size="xs"></aegov-avatar>
  <aegov-avatar appearance="rounded" size="sm"></aegov-avatar>
  <aegov-avatar appearance="rounded" size="base"></aegov-avatar>
  <aegov-avatar appearance="rounded" size="lg"></aegov-avatar>
  <aegov-avatar appearance="rounded" size="xl"></aegov-avatar>
  <aegov-avatar appearance="rounded" size="2xl"></aegov-avatar>
  <aegov-avatar appearance="rounded" size="3xl"></aegov-avatar>
</div>

---

## Image Source

Set the `src` property to display a user's profile picture. The image is rendered with `object-cover` to fill the container without distortion. Always provide an `alt` attribute for accessibility.

```html
<aegov-avatar src="https://i.pravatar.cc/150?img=1" alt="Ahmed"></aegov-avatar>
<aegov-avatar src="https://i.pravatar.cc/150?img=5" alt="Sara" variant="rounded"></aegov-avatar>
```

<div class="flex flex-wrap items-center gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-avatar src="https://i.pravatar.cc/150?img=1" alt="Ahmed" size="lg"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=5" alt="Sara" size="lg" variant="rounded"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="Khalid" size="lg"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="Fatima" size="lg" variant="rounded"></aegov-avatar>
</div>

### Image Fallback

If the image fails to load (broken URL, network error), the component automatically falls back to the default placeholder icon or any content provided via the slot.

```html
<!-- Broken URL — fallback icon will appear -->
<aegov-avatar src="https://invalid-url.example/photo.jpg" alt="User"></aegov-avatar>
```

<div class="flex flex-wrap items-center gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-avatar src="https://invalid-url.example/photo.jpg" alt="User" size="lg"></aegov-avatar>
  <aegov-avatar src="https://invalid-url.example/photo.jpg" alt="User" size="lg" variant="rounded"></aegov-avatar>
</div>

---

## Custom Slot Content

When no `src` is provided, the default slot is used for fallback content. This is useful for displaying initials, custom icons, or other visual identifiers.

```html
<aegov-avatar>
  <span style="font-weight: 600; font-size: 14px; color: #555;">AK</span>
</aegov-avatar>
```

<div class="flex flex-wrap items-center gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-avatar size="base">
    <span style="font-weight: 600; font-size: 12px; color: #555;">AK</span>
  </aegov-avatar>
  <aegov-avatar size="lg" variant="rounded">
    <span style="font-weight: 600; font-size: 14px; color: #555;">SM</span>
  </aegov-avatar>
  <aegov-avatar size="xl">
    <span style="font-weight: 600; font-size: 16px; color: #555;">FA</span>
  </aegov-avatar>
  <aegov-avatar size="2xl" variant="rounded">
    <span style="font-weight: 600; font-size: 18px; color: #555;">KH</span>
  </aegov-avatar>
</div>

---

## Status Indicator

The `status` property adds a small coloured dot to the avatar indicating presence. The indicator is positioned at the top-right corner. Omit the property (or set it to `false`) to hide the indicator.

| Status          | Colour          | Meaning                  |
|-----------------|-----------------|--------------------------|
| `online`        | aegreen-500     | User is active           |
| `offline`       | aered-500       | User is offline          |
| `away`          | camel-400       | User is temporarily away |
| `unavailable`   | aeblack-400     | User cannot be reached   |
| `busy`          | aered-800       | User is busy             |

```html
<aegov-avatar status="online"></aegov-avatar>
<aegov-avatar status="offline"></aegov-avatar>
<aegov-avatar status="away"></aegov-avatar>
<aegov-avatar status="unavailable"></aegov-avatar>
<aegov-avatar status="busy"></aegov-avatar>
```

<div class="flex flex-wrap items-center gap-6 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-avatar status="online" size="lg"></aegov-avatar>
  <aegov-avatar status="offline" size="lg"></aegov-avatar>
  <aegov-avatar status="away" size="lg"></aegov-avatar>
  <aegov-avatar status="unavailable" size="lg"></aegov-avatar>
  <aegov-avatar status="busy" size="lg"></aegov-avatar>
</div>

<div class="flex flex-wrap items-center gap-6 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-avatar status="online" size="lg" appearance="rounded"></aegov-avatar>
  <aegov-avatar status="offline" size="lg" appearance="rounded"></aegov-avatar>
  <aegov-avatar status="away" size="lg" appearance="rounded"></aegov-avatar>
  <aegov-avatar status="unavailable" size="lg" appearance="rounded"></aegov-avatar>
  <aegov-avatar status="busy" size="lg" appearance="rounded"></aegov-avatar>
</div>

Status indicators with images:

<div class="flex flex-wrap items-center gap-6 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-avatar src="https://i.pravatar.cc/150?img=3" alt="Online user" status="online" size="lg"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=8" alt="Offline user" status="offline" size="lg"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=11" alt="Away user" status="away" size="lg" appearance="rounded"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=20" alt="Unavailable user" status="unavailable" size="lg" appearance="rounded"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=15" alt="Busy user" status="busy" size="lg" appearance="rounded"></aegov-avatar>
</div>

> **Tip:** The `status` property also accepts a boolean — `true` maps to `"online"` and `false` (the default) hides the indicator.

---

## Size × Variant Matrix

The table below shows every combination of size and variant for visual reference.

<div class="overflow-x-auto my-6">
<table class="w-full text-sm border-collapse">
  <thead>
    <tr class="bg-aeblack-50">
      <th class="text-left p-3 border border-aeblack-100 font-semibold">Size</th>
      <th class="p-3 border border-aeblack-100 font-semibold">Square</th>
      <th class="p-3 border border-aeblack-100 font-semibold">Rounded</th>
      <th class="p-3 border border-aeblack-100 font-semibold">Square (image)</th>
      <th class="p-3 border border-aeblack-100 font-semibold">Rounded (image)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium">xs</td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="xs"></aegov-avatar></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="xs" variant="rounded"></aegov-avatar></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="xs" src="https://i.pravatar.cc/150?img=1" alt="User"></aegov-avatar></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="xs" variant="rounded" src="https://i.pravatar.cc/150?img=1" alt="User"></aegov-avatar></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium">sm</td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="sm"></aegov-avatar></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="sm" variant="rounded"></aegov-avatar></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="sm" src="https://i.pravatar.cc/150?img=5" alt="User"></aegov-avatar></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="sm" variant="rounded" src="https://i.pravatar.cc/150?img=5" alt="User"></aegov-avatar></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium">base</td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="base"></aegov-avatar></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="base" variant="rounded"></aegov-avatar></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="base" src="https://i.pravatar.cc/150?img=12" alt="User"></aegov-avatar></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="base" variant="rounded" src="https://i.pravatar.cc/150?img=12" alt="User"></aegov-avatar></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium">lg</td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="lg"></aegov-avatar></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="lg" variant="rounded"></aegov-avatar></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="lg" src="https://i.pravatar.cc/150?img=32" alt="User"></aegov-avatar></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="lg" variant="rounded" src="https://i.pravatar.cc/150?img=32" alt="User"></aegov-avatar></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium">xl</td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="xl"></aegov-avatar></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="xl" variant="rounded"></aegov-avatar></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="xl" src="https://i.pravatar.cc/150?img=44" alt="User"></aegov-avatar></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="xl" variant="rounded" src="https://i.pravatar.cc/150?img=44" alt="User"></aegov-avatar></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium">2xl</td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="2xl"></aegov-avatar></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="2xl" variant="rounded"></aegov-avatar></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="2xl" src="https://i.pravatar.cc/150?img=49" alt="User"></aegov-avatar></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="2xl" variant="rounded" src="https://i.pravatar.cc/150?img=49" alt="User"></aegov-avatar></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium">3xl</td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="3xl"></aegov-avatar></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="3xl" variant="rounded"></aegov-avatar></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="3xl" src="https://i.pravatar.cc/150?img=56" alt="User"></aegov-avatar></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-avatar size="3xl" variant="rounded" src="https://i.pravatar.cc/150?img=56" alt="User"></aegov-avatar></td>
    </tr>
  </tbody>
</table>
</div>

---

## API Reference

### Properties

| Property  | Attribute | Description                                          | Type                                                                    | Default    |
|-----------|-----------|------------------------------------------------------|-------------------------------------------------------------------------|------------|
| `size`    | `size`    | The avatar dimensions. Supports responsive strings (e.g. `'sm xl:2xl'`). | `'xs'` \| `'sm'` \| `'base'` \| `'lg'` \| `'xl'` \| `'2xl'` \| `'3xl'` | `'base'`   |
| `appearance` | `appearance` | The avatar shape                                     | `'square'` \| `'rounded'`                                              | `'square'` |
| `src`     | `src`     | Image source URL                                     | `string`                                                                | —          |
| `alt`     | `alt`     | Alternative text for the image                       | `string`                                                                | —          |
| `status`  | `status`  | Status indicator. Use `false` (or omit) to hide. `true` maps to `'online'`. | `'online'` \| `'offline'` \| `'away'` \| `'unavailable'` \| `'busy'` \| `boolean` | `false`    |

### Slots

| Slot      | Description                                                                       |
|-----------|-----------------------------------------------------------------------------------|
| (default) | Fallback content shown when no `src` is provided (e.g. initials, custom icons).  |

### Shadow Parts

| Part     | Description                            |
|----------|----------------------------------------|
| `avatar` | The outer avatar container element.    |
| `image`  | The `<img>` element (when `src` is set). |
| `status` | The status indicator dot.              |

```css
/* Example: add a custom border to all avatars */
aegov-avatar::part(avatar) {
  border: 2px solid gold;
}
```

---

## Accessibility

The `aegov-avatar` component is built with accessibility in mind.

### Built-in Features

- **`role="img"`** — the avatar container is marked as an image for assistive technologies.
- **`aria-label`** — automatically set to the `alt` prop value, or "User avatar" when no `alt` is provided.
- **Status `aria-label`** — the status indicator includes an `aria-label` describing the current status (e.g. "Status: online").
- **Image fallback** — if the image fails to load, the component gracefully falls back to slot content or a default icon without breaking the layout.

### Developer Responsibilities

1. **Always provide `alt` text.** When displaying a user's image, set the `alt` prop to their name or a meaningful description so screen readers can announce who the avatar represents.

2. **Initials should have labels.** If using the slot for initials, consider adding an `aria-label` on the host element since two-letter abbreviations are not always meaningful to screen readers.

3. **Colour contrast for status.** All status indicator colours meet WCAG 2.1 AA contrast against a white background. If you change the surrounding background, verify contrast is maintained.

---

## Notes

- The default shape is `square` with `rounded` corners (not sharp). The rounding increases for larger sizes — `lg` and above use `rounded-md` or `rounded-lg`.
- The `status` property accepts both string and boolean values. `true` maps to `"online"`, while `false` (the default) or omission hides the indicator.
- When `src` is set but the image fails to load, the component sets an internal `imageError` state and falls back to slot content or the default user icon.
- The avatar uses `object-cover` on images, so non-square profile pictures are cropped to fill the container without distortion.
- The host element uses `display: inline-block`, so avatars can be placed inline with text or inside flex containers.
- For grouping multiple avatars with overlap or "+N more" indicators, use the companion [`aegov-avatar-group`](/docs/pages/aegov-avatar-group.html) component.
