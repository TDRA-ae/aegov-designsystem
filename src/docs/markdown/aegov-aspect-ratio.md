# Aspect Ratio

<p class="text-lg text-aeblack-500 mb-8">An Aspect Ratio component enforces a specific width-to-height ratio on its slotted content. Use it to wrap images, videos, iframes (maps, embeds), or arbitrary containers that should hold a consistent shape regardless of viewport size — preventing layout shift and reflow as media loads. It is a layout primitive with no visual styling of its own.</p>

## Introduction

The `aegov-aspect-ratio` component wraps any media or content and constrains it to a chosen ratio using the native CSS `aspect-ratio` property. It accepts named presets (`auto`, `square`, `video`) or any custom `n/m` ratio string, and exposes a `fit` property that mirrors the CSS `object-fit` values — making it a drop-in solution for responsive imagery and embedded video.

```html
<aegov-aspect-ratio ratio="video">
  <img src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200" alt="Skyline of Abu Dhabi at dusk" />
</aegov-aspect-ratio>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-aspect-ratio ratio="video">
    <img src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200" alt="Skyline of Abu Dhabi at dusk" />
  </aegov-aspect-ratio>
</div>

---

## Named Presets

Three named presets cover the most common cases. `auto` lets the slotted content size itself naturally; `square` enforces a 1:1 box; `video` enforces the standard 16:9 widescreen ratio.

| Preset   | Resolved CSS aspect-ratio |
| -------- | ------------------------- |
| `auto`   | `auto`                    |
| `square` | `1 / 1`                   |
| `video`  | `16 / 9`                  |

```html
<aegov-aspect-ratio ratio="square">
  <img src="https://images.unsplash.com/photo-1546412414-e1885259563a?w=600" alt="Sheikh Zayed Grand Mosque dome detail" />
</aegov-aspect-ratio>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <aegov-aspect-ratio ratio="square">
      <img src="https://images.unsplash.com/photo-1546412414-e1885259563a?w=600" alt="Sheikh Zayed Grand Mosque dome" />
    </aegov-aspect-ratio>
    <aegov-aspect-ratio ratio="video">
      <img src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800" alt="Abu Dhabi skyline" />
    </aegov-aspect-ratio>
    <aegov-aspect-ratio ratio="4/3">
      <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600" alt="Dubai cityscape" />
    </aegov-aspect-ratio>
  </div>
</div>

---

## Custom Ratios

Any custom ratio of the form `n/m` is supported — useful for ultrawide hero images, banner crops, or cinematic media. The component validates the format and falls back to `auto` if the string is malformed.

```html
<aegov-aspect-ratio ratio="21/9">
  <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600" alt="Panoramic view of the Burj Khalifa at night" />
</aegov-aspect-ratio>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-aspect-ratio ratio="21/9">
    <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600" alt="Panoramic view of the Burj Khalifa at night" />
  </aegov-aspect-ratio>
</div>

---

## Fit Modes

The `fit` property controls how slotted media is sized inside the container. It maps directly to CSS `object-fit` and accepts `cover` (default), `contain`, `fill`, `none`, and `scale-down`. Use `cover` for hero imagery that should fill the box and crop as needed; use `contain` to show the full image with letterboxing when the source ratio differs.

```html
<aegov-aspect-ratio ratio="square" fit="cover">
  <img src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600" alt="Cover fit" />
</aegov-aspect-ratio>

<aegov-aspect-ratio ratio="square" fit="contain">
  <img src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600" alt="Contain fit" />
</aegov-aspect-ratio>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <p class="text-sm text-aeblack-600 mb-2">fit="cover" — fills the box, crops as needed</p>
      <aegov-aspect-ratio ratio="square" fit="cover" extra-class="bg-aeblack-100 rounded-lg">
        <img src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600" alt="Cover fit example" />
      </aegov-aspect-ratio>
    </div>
    <div>
      <p class="text-sm text-aeblack-600 mb-2">fit="contain" — shows the whole image, letterboxes</p>
      <aegov-aspect-ratio ratio="square" fit="contain" extra-class="bg-aeblack-100 rounded-lg">
        <img src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600" alt="Contain fit example" />
      </aegov-aspect-ratio>
    </div>
  </div>
</div>

---

## Embedded Video and Iframes

The component is the recommended way to embed responsive video players, YouTube embeds, and Google Maps iframes. It guarantees the embed fills its container at the chosen ratio without the legacy padding-bottom hack.

```html
<aegov-aspect-ratio ratio="video">
  <iframe
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    title="Embedded video"
    allowfullscreen></iframe>
</aegov-aspect-ratio>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-aspect-ratio ratio="video">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57804.81244422895!2d54.30796434863281!3d24.466667099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e66b51c4b8a91%3A0x9c8b9f5fcb6b5c5a!2sAbu%20Dhabi!5e0!3m2!1sen!2sae" title="Map of Abu Dhabi" allowfullscreen></iframe>
  </aegov-aspect-ratio>
</div>

---

## Responsive Ratios

The `ratio` property accepts a Tailwind-style responsive string with the breakpoint prefixes `xs`, `sm`, `md`, `lg`, `xl`, and `2xl`. Each segment overrides smaller breakpoints, so the example below renders as `square` on phones, `video` from the `md` breakpoint up, and `21/9` from `lg` up — perfect for a hero banner that adapts from mobile portrait to desktop ultrawide.

```html
<aegov-aspect-ratio ratio="square md:video lg:21/9">
  <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600" alt="Hero image" />
</aegov-aspect-ratio>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="text-sm text-aeblack-600 mb-3">Resize the browser to see the ratio adapt.</p>
  <aegov-aspect-ratio ratio="square md:video lg:21/9" extra-class="rounded-lg">
    <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600" alt="Burj Khalifa panoramic" />
  </aegov-aspect-ratio>
</div>

---

## Avatar Tile

Combine `extra-class` with rounded corners to produce square avatar tiles for staff directories or service team listings.

```html
<aegov-aspect-ratio ratio="square" extra-class="rounded-lg">
  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400" alt="Staff portrait" />
</aegov-aspect-ratio>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <aegov-aspect-ratio ratio="square" extra-class="rounded-lg">
      <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400" alt="Staff portrait" />
    </aegov-aspect-ratio>
    <aegov-aspect-ratio ratio="square" extra-class="rounded-lg">
      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" alt="Staff portrait" />
    </aegov-aspect-ratio>
    <aegov-aspect-ratio ratio="square" extra-class="rounded-lg">
      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" alt="Staff portrait" />
    </aegov-aspect-ratio>
    <aegov-aspect-ratio ratio="square" extra-class="rounded-lg">
      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400" alt="Staff portrait" />
    </aegov-aspect-ratio>
  </div>
</div>

---

## RTL Support

Aspect ratio is a purely geometric wrapper — it has no directional layout, no padding, and no margin of its own. It renders identically inside `dir="rtl"` containers. This example shows a media card in an Arabic context.

```html
<div dir="rtl">
  <aegov-aspect-ratio ratio="video" extra-class="rounded-lg">
    <img src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200" alt="منظر أبوظبي عند المساء" />
  </aegov-aspect-ratio>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <h3 class="text-lg font-semibold mb-3">معرض الخدمات الحكومية</h3>
  <aegov-aspect-ratio ratio="video" extra-class="rounded-lg">
    <img src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200" alt="منظر أبوظبي عند المساء" />
  </aegov-aspect-ratio>
  <p class="mt-3 text-sm text-aeblack-600">صورة بانورامية لمدينة أبوظبي تستخدم نسبة العرض إلى الارتفاع 16:9.</p>
</div>

---

## API Reference

### Properties

| Property     | Attribute     | Description                                                                                                          | Type                                                       | Default     |
| ------------ | ------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ----------- |
| `ratio`      | `ratio`       | Aspect ratio to apply. Named preset (`auto`, `square`, `video`) or any custom `n/m` string. Accepts a responsive string. | `string`                                                   | `'auto'`    |
| `fit`        | `fit`         | How slotted media (`<img>`, `<video>`, `<iframe>`) fits inside the container. Mirrors CSS `object-fit`.              | `'cover' \| 'contain' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'`   |
| `extraClass` | `extra-class` | Additional CSS classes merged onto the inner aspect-ratio container.                                                  | `string`                                                   | `undefined` |

### Slots

| Slot        | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| _(default)_ | Media or content to be sized to the configured aspect ratio. |

### Events

The component emits no custom events — it is a layout primitive.

### Pass-through Attributes

| Attribute group | Forwarded? | Where to apply                                                                                |
| --------------- | ---------- | --------------------------------------------------------------------------------------------- |
| `aria-*`        | No         | Apply to the host `<aegov-aspect-ratio>` if needed for the wrapping element.                  |
| `data-*`        | No         | Apply to the host `<aegov-aspect-ratio>`.                                                     |
| `class`, `style`| Allowed    | Applied to the host. Use `extra-class` to add classes to the inner container.                 |
| `id`            | Allowed    | Applied to the host element.                                                                  |

---

## Accessibility

### Built-in behaviour

- The component introduces no roles, landmarks, or ARIA attributes — it is purely a layout primitive.
- Slotted content (`<img>`, `<iframe>`, `<video>`) retains its native semantics.
- Invalid `ratio` strings silently fall back to `auto`; invalid `fit` values fall back to `cover` and emit a console warning.
- The inner container uses `overflow: clip` with `overflow-clip-margin: 4px` instead of `overflow: hidden`. This means focus rings on slotted interactive elements remain visible up to 4 px outside the clipping boundary, satisfying WCAG SC 2.4.11 (Focus Not Obscured). Unlike `overflow: hidden`, `overflow: clip` does not create a scroll container or a new stacking context.
- At `componentDidLoad`, the component checks all slotted `<iframe>` elements for a `title` attribute and emits a `console.warn` if any are missing. This surfaces the WCAG SC 4.1.2 requirement during development without breaking the page.

### Developer responsibilities

- Provide meaningful `alt` text on slotted `<img>` elements. For purely decorative imagery use `alt=""` so screen readers skip the image.
- Provide a `title` attribute on every embedded `<iframe>` (maps, video players) so assistive technology can announce the embed. The component will warn in the browser console if this is missing.
- Provide accessible captions or transcripts for `<video>` content where required.
- Focus rings on slotted interactive elements remain visible up to 4 px outside the container boundary thanks to `overflow-clip-margin`. Controls that need focus rings wider than 4 px should increase their own `outline-offset` accordingly.
