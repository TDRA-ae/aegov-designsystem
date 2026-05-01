# aegov-aspect-ratio

A layout component that enforces a specific aspect ratio on its slotted content. Use it when wrapping images, videos, iframes (maps, embeds), or any container that should hold a consistent shape regardless of viewport size — preventing layout shift and reflow as media loads.

## Properties

### ratio

Aspect ratio to enforce. Accepts named presets (`auto`, `square`, `video`) or any custom ratio string of the form `n/m` (e.g. `'4/3'`, `'21/9'`, `'2.35/1'`). Supports a Tailwind-style responsive string with breakpoint prefixes.

```html
<aegov-aspect-ratio ratio="square"></aegov-aspect-ratio>
<aegov-aspect-ratio ratio="video"></aegov-aspect-ratio>
<aegov-aspect-ratio ratio="21/9"></aegov-aspect-ratio>
```

### fit

Controls how slotted media fits inside the container. Mirrors CSS `object-fit`. Accepts `cover`, `contain`, `fill`, `none`, or `scale-down`.

```html
<aegov-aspect-ratio ratio="video" fit="contain">
  <img src="..." alt="..." />
</aegov-aspect-ratio>
```

### extra-class

Additional CSS classes applied to the inner container.

```html
<aegov-aspect-ratio ratio="square" extra-class="rounded-lg overflow-hidden">
  <img src="..." alt="..." />
</aegov-aspect-ratio>
```

## Sizes

`aegov-aspect-ratio` doesn't have a `size` prop, but the `ratio` prop accepts a responsive string using Tailwind-style breakpoints to switch ratios at different viewport widths.

```html
<!-- Square on mobile, video on tablets, ultrawide on desktop -->
<aegov-aspect-ratio ratio="square md:video lg:21/9">
  <img src="..." alt="..." />
</aegov-aspect-ratio>
```

| Token         | Resolved CSS aspect-ratio |
| ------------- | ------------------------- |
| `auto`        | `auto`                    |
| `square`      | `1 / 1`                   |
| `video`       | `16 / 9`                  |
| `n/m` (custom) | `n / m`                  |

## Examples

### Image with 16:9 aspect

```html
<aegov-aspect-ratio ratio="video">
  <img src="/images/banner.jpg" alt="Banner" />
</aegov-aspect-ratio>
```

### Square avatar tile

```html
<aegov-aspect-ratio ratio="square" extra-class="rounded-lg overflow-hidden">
  <img src="/images/photo.jpg" alt="Profile" />
</aegov-aspect-ratio>
```

### Embedded video

```html
<aegov-aspect-ratio ratio="video">
  <iframe src="https://www.youtube.com/embed/..." title="Video"></iframe>
</aegov-aspect-ratio>
```

### Responsive ratio for hero image

```html
<aegov-aspect-ratio ratio="square md:video lg:21/9">
  <img src="/images/hero.jpg" alt="Hero" />
</aegov-aspect-ratio>
```

## RTL Behavior

The component is purely a sizing wrapper — it has no directional layout. It works identically in LTR and RTL contexts.

## API Reference

### Properties

| Property      | Attribute      | Description                                                                              | Type     | Default   |
| ------------- | -------------- | ---------------------------------------------------------------------------------------- | -------- | --------- |
| `ratio`       | `ratio`        | Aspect ratio: `auto`, `square`, `video`, or custom `n/m`. Supports a responsive string.  | `string` | `'auto'`  |
| `fit`         | `fit`          | `object-fit` value applied to slotted media.                                             | `"cover" \| "contain" \| "fill" \| "none" \| "scale-down"` | `'cover'` |
| `extraClass`  | `extra-class`  | Additional CSS classes on the inner container.                                           | `string` | `undefined` |

### Pass-through Attributes

`aria-*` and `data-*` attributes set on the host pass through to the host element (no explicit pass-through list is configured).

### Slots

| Slot      | Description                                                       |
| --------- | ----------------------------------------------------------------- |
| (default) | Media or content to be sized to the configured aspect ratio. |

## Accessibility

### Built-in

- The component does not introduce any roles or ARIA attributes — it is purely a layout primitive.
- Slotted content (e.g., `<img>`, `<iframe>`, `<video>`) retains its native semantics.

### Developer responsibilities

- Ensure slotted media has appropriate `alt`, `title`, or `aria-label` attributes.
- For decorative images, set `alt=""` so screen readers skip the image.
- For videos and iframes, provide accessible captions and titles.

### Notes

- The `auto` ratio falls back to natural content sizing — useful when the slotted content already has its own intrinsic ratio.
- Invalid `ratio` strings (e.g. `"not-a-ratio"`) silently fall back to `auto`. Invalid `fit` values fall back to `cover` and emit a console warning.
