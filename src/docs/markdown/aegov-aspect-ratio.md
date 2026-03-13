# Aspect Ratio

<p class="text-lg text-aeblack-500 mb-8">A layout component that enforces a specific aspect ratio on images, videos, iframes, or any slotted content. Supports responsive breakpoints via Tailwind utility classes.</p>

## Introduction

The `aegov-aspect-ratio` component wraps content in a container with a fixed aspect ratio, powered by the native CSS `aspect-ratio` property. It ensures that images and videos maintain consistent proportions regardless of the available width.

The component supports named presets (`square`, `video`), common ratios (`4/3`, `3/2`, `21/9`), and fully custom values. Media elements (img, video, iframe) automatically fill the container with configurable `object-fit` behaviour.

```html
<aegov-aspect-ratio ratio="video">
  <img src="https://picsum.photos/800/800" alt="Demo image" />
</aegov-aspect-ratio>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div style="max-width: 480px;">
    <aegov-aspect-ratio ratio="video">
      <img src="https://picsum.photos/800/800" alt="Demo image" />
    </aegov-aspect-ratio>
  </div>
</div>

---

## Ratio Presets

The `ratio` prop accepts several named presets for common aspect ratios.

### Auto (default)

The content uses its natural aspect ratio.

```html
<aegov-aspect-ratio ratio="auto">
  <img src="https://picsum.photos/600/400" alt="Auto ratio" />
</aegov-aspect-ratio>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div style="max-width: 300px;">
    <aegov-aspect-ratio ratio="auto">
      <img src="https://picsum.photos/600/400" alt="Auto ratio" />
    </aegov-aspect-ratio>
  </div>
</div>

### Square (1:1)

```html
<aegov-aspect-ratio ratio="square">
  <img src="https://picsum.photos/600/400" alt="Square" />
</aegov-aspect-ratio>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div style="max-width: 200px;">
    <aegov-aspect-ratio ratio="square">
      <img src="https://picsum.photos/600/400" alt="Square" />
    </aegov-aspect-ratio>
  </div>
</div>

### Video (16:9)

The standard widescreen video ratio.

```html
<aegov-aspect-ratio ratio="video">
  <img src="https://picsum.photos/800/450" alt="Video ratio" />
</aegov-aspect-ratio>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div style="max-width: 480px;">
    <aegov-aspect-ratio ratio="video">
      <img src="https://picsum.photos/800/450" alt="Video ratio" />
    </aegov-aspect-ratio>
  </div>
</div>

### All Presets

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
    <div>
      <p class="text-sm font-semibold text-aeblack-700 mb-2">square (1:1)</p>
      <aegov-aspect-ratio ratio="square" inner-class="rounded-lg">
        <img src="https://picsum.photos/400/400?random=1" alt="Square" />
      </aegov-aspect-ratio>
    </div>
    <div>
      <p class="text-sm font-semibold text-aeblack-700 mb-2">video (16:9)</p>
      <aegov-aspect-ratio ratio="video" inner-class="rounded-lg">
        <img src="https://picsum.photos/800/450?random=2" alt="Video" />
      </aegov-aspect-ratio>
    </div>
    <div>
      <p class="text-sm font-semibold text-aeblack-700 mb-2">4/3</p>
      <aegov-aspect-ratio ratio="4/3" inner-class="rounded-lg">
        <img src="https://picsum.photos/800/600?random=3" alt="4/3" />
      </aegov-aspect-ratio>
    </div>
    <div>
      <p class="text-sm font-semibold text-aeblack-700 mb-2">3/2</p>
      <aegov-aspect-ratio ratio="3/2" inner-class="rounded-lg">
        <img src="https://picsum.photos/600/400?random=4" alt="3/2" />
      </aegov-aspect-ratio>
    </div>
    <div>
      <p class="text-sm font-semibold text-aeblack-700 mb-2">21/9 (Ultra-wide)</p>
      <aegov-aspect-ratio ratio="21/9" inner-class="rounded-lg">
        <img src="https://picsum.photos/840/360?random=5" alt="21/9" />
      </aegov-aspect-ratio>
    </div>
    <div>
      <p class="text-sm font-semibold text-aeblack-700 mb-2">auto (natural)</p>
      <aegov-aspect-ratio ratio="auto" inner-class="rounded-lg">
        <img src="https://picsum.photos/500/300?random=6" alt="Auto" />
      </aegov-aspect-ratio>
    </div>
  </div>
</div>

---

## Custom Ratios

Pass any `W/H` string to the `ratio` prop for ratios not covered by the presets.

```html
<aegov-aspect-ratio ratio="5/4">
  <img src="https://picsum.photos/500/400" alt="5:4 ratio" />
</aegov-aspect-ratio>

<aegov-aspect-ratio ratio="2/1">
  <img src="https://picsum.photos/800/400" alt="2:1 panoramic" />
</aegov-aspect-ratio>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
    <div>
      <p class="text-sm font-semibold text-aeblack-700 mb-2">5/4</p>
      <aegov-aspect-ratio ratio="5/4" inner-class="rounded-lg">
        <img src="https://picsum.photos/500/400?random=7" alt="5:4" />
      </aegov-aspect-ratio>
    </div>
    <div>
      <p class="text-sm font-semibold text-aeblack-700 mb-2">2/1 (Panoramic)</p>
      <aegov-aspect-ratio ratio="2/1" inner-class="rounded-lg">
        <img src="https://picsum.photos/800/400?random=8" alt="2:1" />
      </aegov-aspect-ratio>
    </div>
  </div>
</div>

---

## Object Fit

The `fit` prop controls how media elements (img, video, iframe) fill the aspect-ratio container. This maps directly to the CSS `object-fit` property.

### Cover (default)

The media fills the entire container, cropping as needed to maintain the ratio.

```html
<aegov-aspect-ratio ratio="square" fit="cover">
  <img src="https://picsum.photos/800/400" alt="Cover fit" />
</aegov-aspect-ratio>
```

### Contain

The media fits inside the container without cropping, potentially leaving empty space.

```html
<aegov-aspect-ratio ratio="square" fit="contain">
  <img src="https://picsum.photos/800/400" alt="Contain fit" />
</aegov-aspect-ratio>
```

### All Fit Options

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
    <div>
      <p class="text-sm font-semibold text-aeblack-700 mb-2">cover</p>
      <aegov-aspect-ratio ratio="square" fit="cover" inner-class="rounded-lg bg-slate-200">
        <img src="https://picsum.photos/800/400?random=10" alt="Cover" />
      </aegov-aspect-ratio>
    </div>
    <div>
      <p class="text-sm font-semibold text-aeblack-700 mb-2">contain</p>
      <aegov-aspect-ratio ratio="square" fit="contain" inner-class="rounded-lg bg-slate-200">
        <img src="https://picsum.photos/800/400?random=11" alt="Contain" />
      </aegov-aspect-ratio>
    </div>
    <div>
      <p class="text-sm font-semibold text-aeblack-700 mb-2">fill</p>
      <aegov-aspect-ratio ratio="square" fit="fill" inner-class="rounded-lg bg-slate-200">
        <img src="https://picsum.photos/800/400?random=12" alt="Fill" />
      </aegov-aspect-ratio>
    </div>
    <div>
      <p class="text-sm font-semibold text-aeblack-700 mb-2">none</p>
      <aegov-aspect-ratio ratio="square" fit="none" inner-class="rounded-lg bg-slate-200">
        <img src="https://picsum.photos/800/400?random=13" alt="None" />
      </aegov-aspect-ratio>
    </div>
    <div>
      <p class="text-sm font-semibold text-aeblack-700 mb-2">scale-down</p>
      <aegov-aspect-ratio ratio="square" fit="scale-down" inner-class="rounded-lg bg-slate-200">
        <img src="https://picsum.photos/800/400?random=14" alt="Scale-down" />
      </aegov-aspect-ratio>
    </div>
  </div>
</div>

---

## Video Content

The component works with `<video>` elements just like images.

```html
<aegov-aspect-ratio ratio="video" fit="cover">
  <video controls>
    <source src="clip.mp4" type="video/mp4" />
  </video>
</aegov-aspect-ratio>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div style="max-width: 480px;">
    <aegov-aspect-ratio ratio="video" inner-class="rounded-lg bg-aeblack-900">
      <video controls poster="https://picsum.photos/800/450?random=20">
        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm" />
      </video>
    </aegov-aspect-ratio>
  </div>
</div>

---

## Iframe Content

Embed iframes (maps, videos, etc.) with consistent aspect ratios.

```html
<aegov-aspect-ratio ratio="video">
  <iframe src="https://www.openstreetmap.org/export/embed.html" allowfullscreen></iframe>
</aegov-aspect-ratio>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div style="max-width: 480px;">
    <aegov-aspect-ratio ratio="video" inner-class="rounded-lg">
      <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=55.1%2C25.1%2C55.4%2C25.3&layer=mapnik" style="border: 0;"></iframe>
    </aegov-aspect-ratio>
  </div>
</div>

---

## Inner Class

The `inner-class` prop adds CSS classes to the inner container. Use it for rounded corners, backgrounds, shadows, or responsive breakpoint overrides.

```html
<aegov-aspect-ratio ratio="square" inner-class="rounded-full shadow-lg bg-slate-100">
  <img src="https://picsum.photos/400/400" alt="Rounded" />
</aegov-aspect-ratio>

<aegov-aspect-ratio ratio="video" inner-class="rounded-2xl shadow-xl">
  <img src="https://picsum.photos/800/450" alt="Styled" />
</aegov-aspect-ratio>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; align-items: start;">
    <div>
      <p class="text-sm font-semibold text-aeblack-700 mb-2">rounded-full (circular)</p>
      <aegov-aspect-ratio ratio="square" inner-class="rounded-full shadow-lg">
        <img src="https://picsum.photos/400/400?random=30" alt="Circular" />
      </aegov-aspect-ratio>
    </div>
    <div>
      <p class="text-sm font-semibold text-aeblack-700 mb-2">rounded-2xl + shadow</p>
      <aegov-aspect-ratio ratio="video" inner-class="rounded-2xl shadow-xl">
        <img src="https://picsum.photos/800/450?random=31" alt="Styled" />
      </aegov-aspect-ratio>
    </div>
    <div>
      <p class="text-sm font-semibold text-aeblack-700 mb-2">bg-slate-200 + contain</p>
      <aegov-aspect-ratio ratio="square" fit="contain" inner-class="rounded-lg bg-slate-200">
        <img src="https://picsum.photos/800/400?random=32" alt="Contain with bg" />
      </aegov-aspect-ratio>
    </div>
  </div>
</div>

---

## Responsive Breakpoints

Override the aspect ratio at different viewport sizes using Tailwind responsive classes on the host element or via the `inner-class` prop.

### Using host classes

Apply Tailwind `aspect-*` utilities directly on the component for responsive overrides. The inline `aspect-ratio` style from the `ratio` prop serves as the base, and Tailwind responsive utilities can override at larger breakpoints.

```html
<aegov-aspect-ratio ratio="square" class="md:aspect-video lg:aspect-[21/9]">
  <img src="https://picsum.photos/800/450" alt="Responsive" />
</aegov-aspect-ratio>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <p class="text-sm text-aeblack-500 mb-4">Resize your browser window to see the ratio change: <strong>square</strong> → <strong>video (md)</strong> → <strong>21:9 (lg)</strong></p>
  <aegov-aspect-ratio ratio="square" class="md:[&_.aegov-aspect-ratio]:aspect-video lg:[&_.aegov-aspect-ratio]:aspect-[21/9]" inner-class="rounded-lg">
    <img src="https://picsum.photos/800/450?random=40" alt="Responsive" />
  </aegov-aspect-ratio>
</div>

### Using inner-class

Pass responsive Tailwind classes via the `inner-class` prop for a cleaner attribute.

```html
<aegov-aspect-ratio ratio="square" inner-class="md:aspect-video lg:aspect-[21/9] rounded-lg">
  <img src="https://picsum.photos/800/450" alt="Responsive inner" />
</aegov-aspect-ratio>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <p class="text-sm text-aeblack-500 mb-4">Resize your browser to see the ratio change via inner-class: <strong>square</strong> → <strong>video (md)</strong> → <strong>21:9 (lg)</strong></p>
  <aegov-aspect-ratio ratio="square" inner-class="md:aspect-video lg:aspect-[21/9] rounded-lg">
    <img src="https://picsum.photos/800/450?random=41" alt="Responsive inner" />
  </aegov-aspect-ratio>
</div>

---

## Image Gallery

A practical example showing an image gallery with consistent aspect ratios.

```html
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
  <aegov-aspect-ratio ratio="square" inner-class="rounded-lg">
    <img src="photo1.jpg" alt="Gallery 1" />
  </aegov-aspect-ratio>
  <aegov-aspect-ratio ratio="square" inner-class="rounded-lg">
    <img src="photo2.jpg" alt="Gallery 2" />
  </aegov-aspect-ratio>
  <aegov-aspect-ratio ratio="square" inner-class="rounded-lg">
    <img src="photo3.jpg" alt="Gallery 3" />
  </aegov-aspect-ratio>
</div>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem;">
    <aegov-aspect-ratio ratio="square" inner-class="rounded-lg">
      <img src="https://picsum.photos/400/400?random=50" alt="Gallery 1" />
    </aegov-aspect-ratio>
    <aegov-aspect-ratio ratio="square" inner-class="rounded-lg">
      <img src="https://picsum.photos/400/400?random=51" alt="Gallery 2" />
    </aegov-aspect-ratio>
    <aegov-aspect-ratio ratio="square" inner-class="rounded-lg">
      <img src="https://picsum.photos/400/400?random=52" alt="Gallery 3" />
    </aegov-aspect-ratio>
    <aegov-aspect-ratio ratio="square" inner-class="rounded-lg">
      <img src="https://picsum.photos/400/400?random=53" alt="Gallery 4" />
    </aegov-aspect-ratio>
    <aegov-aspect-ratio ratio="square" inner-class="rounded-lg">
      <img src="https://picsum.photos/400/400?random=54" alt="Gallery 5" />
    </aegov-aspect-ratio>
    <aegov-aspect-ratio ratio="square" inner-class="rounded-lg">
      <img src="https://picsum.photos/400/400?random=55" alt="Gallery 6" />
    </aegov-aspect-ratio>
    <aegov-aspect-ratio ratio="square" inner-class="rounded-lg">
      <img src="https://picsum.photos/400/400?random=56" alt="Gallery 7" />
    </aegov-aspect-ratio>
    <aegov-aspect-ratio ratio="square" inner-class="rounded-lg">
      <img src="https://picsum.photos/400/400?random=57" alt="Gallery 8" />
    </aegov-aspect-ratio>
  </div>
</div>

---

## Video Thumbnail Grid

A video thumbnail grid using the `video` ratio preset.

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
    <div>
      <aegov-aspect-ratio ratio="video" inner-class="rounded-lg bg-aeblack-900">
        <img src="https://picsum.photos/800/450?random=60" alt="Video 1" />
      </aegov-aspect-ratio>
      <p class="text-sm font-medium text-aeblack-700 mt-2">Introduction to Components</p>
    </div>
    <div>
      <aegov-aspect-ratio ratio="video" inner-class="rounded-lg bg-aeblack-900">
        <img src="https://picsum.photos/800/450?random=61" alt="Video 2" />
      </aegov-aspect-ratio>
      <p class="text-sm font-medium text-aeblack-700 mt-2">Design Tokens Deep Dive</p>
    </div>
    <div>
      <aegov-aspect-ratio ratio="video" inner-class="rounded-lg bg-aeblack-900">
        <img src="https://picsum.photos/800/450?random=62" alt="Video 3" />
      </aegov-aspect-ratio>
      <p class="text-sm font-medium text-aeblack-700 mt-2">Building Accessible UIs</p>
    </div>
  </div>
</div>

---

## API Reference

### Properties

| Property | Attribute | Type | Default | Description |
|----------|-----------|------|---------|-------------|
| `ratio` | `ratio` | `'auto' \| 'square' \| 'video' \| '4/3' \| '3/2' \| '21/9' \| string` | `'auto'` | The aspect ratio to apply. Accepts named presets or custom `W/H` strings. |
| `fit` | `fit` | `'cover' \| 'contain' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` | How media elements fill the container. Maps to CSS `object-fit`. |
| `innerClass` | `inner-class` | `string` | `undefined` | Additional CSS classes for the inner container. Useful for responsive overrides, rounded corners, backgrounds, etc. |

### Slots

| Name | Description |
|------|-------------|
| (default) | The content to display inside the aspect-ratio container. Typically `<img>`, `<video>`, `<iframe>`, or any HTML element. |

### CSS Classes

| Class | Purpose |
|-------|---------|
| `.aegov-aspect-ratio` | Inner container with the aspect ratio applied. |
| `[data-fit]` | Data attribute controlling `object-fit` on direct child media elements. |

### Ratio Preset Reference

| Preset | CSS Value | Common Use |
|--------|-----------|------------|
| `auto` | `auto` | Natural content dimensions |
| `square` | `1 / 1` | Profile pictures, thumbnails, icons |
| `video` | `16 / 9` | Video embeds, hero banners |
| `4/3` | `4 / 3` | Classic photo format, presentations |
| `3/2` | `3 / 2` | DSLR photo format |
| `21/9` | `21 / 9` | Ultra-wide cinema, panoramic banners |

---

## Accessibility

- The component itself is purely presentational and adds no semantic meaning.
- Always provide `alt` attributes on images for screen reader support.
- Video elements should include `controls` and appropriate `<track>` elements for captions.
- Iframes should include a `title` attribute describing their content.

---

## Notes

- The component uses the native CSS `aspect-ratio` property, supported in all modern browsers.
- The `ratio` prop sets an inline `aspect-ratio` style. Responsive Tailwind `aspect-*` classes on the inner container (via `inner-class`) or on the host element will override this at the specified breakpoints.
- Media elements (`img`, `video`, `iframe`) that are direct children of the container automatically receive `width: 100%`, `height: 100%`, and the specified `object-fit`.
- For non-media content, the container enforces the ratio but child elements are not automatically sized — use your own styles as needed.
