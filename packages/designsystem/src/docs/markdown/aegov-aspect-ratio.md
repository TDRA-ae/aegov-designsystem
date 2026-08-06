# Aspect Ratio

<p class="text-lg text-aeblack-500 mb-8">Aspect Ratio reserves a fixed shape for media before it loads. Wrapping an image, video or iframe in it stops the page reflowing when the media arrives — which is both a usability improvement and the main defence against a shifting layout under Cumulative Layout Shift.</p>

## Introduction

```html
<aegov-aspect-ratio ratio="video">
  <img src="/service-centre.jpg" alt="Reception at the Al Barsha service centre" />
</aegov-aspect-ratio>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-aspect-ratio ratio="video">
      <div class="size-full bg-primary-100 flex items-center justify-center text-primary-800">16 / 9</div>
    </aegov-aspect-ratio>
  </div>
</div>

The component sets the shape; the width comes from its container. Put it inside a sized wrapper — a card, a grid cell, a `max-w-*` container.

---

## Ratio

`ratio` accepts named presets or any `width/height` pair.

| Preset | Ratio |
| --- | --- |
| `auto` | Default. No ratio enforced — the content's own dimensions apply. |
| `square` | 1 / 1 |
| `video` | 16 / 9 |
| `4/3` | 4 / 3 |
| `3/2` | 3 / 2 |
| `21/9` | 21 / 9 |

```html
<aegov-aspect-ratio ratio="square">…</aegov-aspect-ratio>
<aegov-aspect-ratio ratio="video">…</aegov-aspect-ratio>
<aegov-aspect-ratio ratio="4/3">…</aegov-aspect-ratio>
<aegov-aspect-ratio ratio="21/9">…</aegov-aspect-ratio>

<!-- Any custom pair works -->
<aegov-aspect-ratio ratio="5/2">…</aegov-aspect-ratio>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-4 sm:grid-cols-2 max-w-xl">
    <div><p class="text-sm text-aeblack-500 mb-2">square</p><aegov-aspect-ratio ratio="square"><div class="size-full bg-primary-100 flex items-center justify-center text-primary-800 text-sm">1 / 1</div></aegov-aspect-ratio></div>
    <div><p class="text-sm text-aeblack-500 mb-2">video</p><aegov-aspect-ratio ratio="video"><div class="size-full bg-secondary-100 flex items-center justify-center text-secondary-800 text-sm">16 / 9</div></aegov-aspect-ratio></div>
    <div><p class="text-sm text-aeblack-500 mb-2">4/3</p><aegov-aspect-ratio ratio="4/3"><div class="size-full bg-techblue-100 flex items-center justify-center text-techblue-800 text-sm">4 / 3</div></aegov-aspect-ratio></div>
    <div><p class="text-sm text-aeblack-500 mb-2">3/2</p><aegov-aspect-ratio ratio="3/2"><div class="size-full bg-camel-100 flex items-center justify-center text-camel-800 text-sm">3 / 2</div></aegov-aspect-ratio></div>
  </div>
  <div class="mt-4 max-w-xl">
    <p class="text-sm text-aeblack-500 mb-2">21/9</p>
    <aegov-aspect-ratio ratio="21/9"><div class="size-full bg-aegreen-100 flex items-center justify-center text-aegreen-800 text-sm">21 / 9</div></aegov-aspect-ratio>
  </div>
</div>

### Responsive ratios

`ratio` accepts a responsive string, with the prefixes `xs`, `sm`, `md`, `lg`, `xl` and `2xl`. This is how you give a hero a tall shape on a phone and a wide one on a desktop.

```html
<aegov-aspect-ratio ratio="square md:video lg:21/9">
  <img src="/hero.jpg" alt="…" />
</aegov-aspect-ratio>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-aspect-ratio ratio="square md:video lg:21/9">
    <div class="size-full bg-primary-100 flex items-center justify-center text-primary-800">Square on mobile · 16/9 from md · 21/9 from lg</div>
  </aegov-aspect-ratio>
</div>

A 21/9 hero on a 320px viewport is about 137px tall, which is not enough for a legible image — a responsive ratio avoids that.

---

## Fit

`fit` controls how slotted media fills the box. It maps to `object-fit`, applied to `img`, `video` and `iframe` children.

| Value | Behaviour |
| --- | --- |
| `cover` | Default. Fills the box, cropping overflow. |
| `contain` | Fits entirely inside, leaving empty space. |
| `fill` | Stretches to fill, distorting the media. |
| `none` | Original size, cropped by the box. |
| `scale-down` | The smaller of `none` and `contain`. |

```html
<aegov-aspect-ratio ratio="video" fit="cover">…</aegov-aspect-ratio>
<aegov-aspect-ratio ratio="video" fit="contain">…</aegov-aspect-ratio>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-4 sm:grid-cols-2 max-w-xl">
    <div>
      <p class="text-sm text-aeblack-500 mb-2">fit="cover" — fills, crops</p>
      <aegov-aspect-ratio ratio="video" fit="cover">
        <img src="https://designsystem.gov.ae/assets/site-logo/AEGov-DesignSystem-Logo-Color.svg" alt="" class="bg-whitely-100" />
      </aegov-aspect-ratio>
    </div>
    <div>
      <p class="text-sm text-aeblack-500 mb-2">fit="contain" — fits, letterboxes</p>
      <aegov-aspect-ratio ratio="video" fit="contain">
        <img src="https://designsystem.gov.ae/assets/site-logo/AEGov-DesignSystem-Logo-Color.svg" alt="" class="bg-whitely-100" />
      </aegov-aspect-ratio>
    </div>
  </div>
</div>

Use `cover` for photographs, where cropping is acceptable. Use `contain` for logos, diagrams and screenshots, where cropping would remove meaning. Avoid `fill` — a distorted photograph of a person is worse than a cropped one.

---

## Video and iframes

The same wrapper works for embedded media, which is where a fixed ratio matters most — an iframe with no reserved space collapses to nothing until it loads.

```html
<aegov-aspect-ratio ratio="video">
  <iframe
    src="https://www.youtube.com/embed/…"
    title="How to renew your Emirates ID"
    allowfullscreen
  ></iframe>
</aegov-aspect-ratio>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-lg">
    <aegov-aspect-ratio ratio="video">
      <div class="size-full bg-aeblack-800 text-whitely-100 flex items-center justify-center">Video embed placeholder — 16/9</div>
    </aegov-aspect-ratio>
  </div>
</div>

Always give an `<iframe>` a `title`. It is the frame's accessible name, and without one a screen reader announces only "frame".

---

## Inside cards and grids

Combining this with [`aegov-card`](aegov-card.html) and `is-padding="false"` produces a media card with a flush image.

```html
<aegov-card is-padding="false" appearance="light">
  <aegov-aspect-ratio ratio="video">
    <img src="/service-centre.jpg" alt="Reception at the Al Barsha service centre" />
  </aegov-aspect-ratio>
  <div class="p-4">
    <aegov-title size="text-h6" heading-type="h3" extra-class="mb-1">
      <aegov-link href="/centres/al-barsha">Al Barsha service centre</aegov-link>
    </aegov-title>
    <aegov-text size="sm">Open until 22:00, seven days a week.</aegov-text>
  </div>
</aegov-card>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-4 sm:grid-cols-3">
    <aegov-card field-id="ar-c1" is-padding="false" appearance="light" variant="neutral-min" hover="standard">
      <aegov-aspect-ratio ratio="video"><div class="size-full bg-primary-100"></div></aegov-aspect-ratio>
      <div class="p-4">
        <aegov-title size="text-h6" heading-type="h3" extra-class="mb-1"><aegov-link href="#">Al Barsha</aegov-link></aegov-title>
        <aegov-text size="sm">Open until 22:00.</aegov-text>
      </div>
    </aegov-card>
    <aegov-card field-id="ar-c2" is-padding="false" appearance="light" variant="neutral-min" hover="standard">
      <aegov-aspect-ratio ratio="video"><div class="size-full bg-secondary-100"></div></aegov-aspect-ratio>
      <div class="p-4">
        <aegov-title size="text-h6" heading-type="h3" extra-class="mb-1"><aegov-link href="#">Al Karama</aegov-link></aegov-title>
        <aegov-text size="sm">Open until 20:00.</aegov-text>
      </div>
    </aegov-card>
    <aegov-card field-id="ar-c3" is-padding="false" appearance="light" variant="neutral-min" hover="standard">
      <aegov-aspect-ratio ratio="video"><div class="size-full bg-techblue-100"></div></aegov-aspect-ratio>
      <div class="p-4">
        <aegov-title size="text-h6" heading-type="h3" extra-class="mb-1"><aegov-link href="#">Al Majaz</aegov-link></aegov-title>
        <aegov-text size="sm">Closed today.</aegov-text>
      </div>
    </aegov-card>
  </div>
</div>

A consistent ratio across a grid of media cards is what makes the row line up — without it, images of different proportions produce ragged card heights.

---

## Arbitrary content

The wrapper is not limited to media. Any content can be given a fixed shape — a map placeholder, a colour swatch, a chart container.

```html
<aegov-aspect-ratio ratio="square">
  <div class="size-full bg-primary-50 flex items-center justify-center">
    <p>Map loading…</p>
  </div>
</aegov-aspect-ratio>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-xs">
    <aegov-aspect-ratio ratio="square">
      <div class="size-full bg-primary-50 border border-primary-200 rounded-md flex items-center justify-center">
        <aegov-text size="sm" extra-class="text-primary-800">Map loading…</aegov-text>
      </div>
    </aegov-aspect-ratio>
  </div>
</div>

Note `fit` only applies to `img`, `video` and `iframe` children — for other content, size it yourself with `size-full` or equivalent.

---

## RTL Support

Aspect Ratio is direction-agnostic. It sets a shape and nothing else — no padding, no borders, no directional spacing — so it behaves identically in both directions. Anything directional comes from the content inside.

```html
<div dir="rtl">
  <aegov-aspect-ratio ratio="video">
    <img src="/service-centre.jpg" alt="قاعة الاستقبال في مركز خدمة البرشاء" />
  </aegov-aspect-ratio>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid gap-4 sm:grid-cols-2 max-w-xl">
    <aegov-card field-id="ar-rtl-1" is-padding="false" appearance="light" variant="neutral-min">
      <aegov-aspect-ratio ratio="video"><div class="size-full bg-primary-100"></div></aegov-aspect-ratio>
      <div class="p-4">
        <aegov-title size="text-h6" heading-type="h3" extra-class="mb-1">مركز خدمة البرشاء</aegov-title>
        <aegov-text size="sm">مفتوح حتى الساعة ٢٢:٠٠.</aegov-text>
      </div>
    </aegov-card>
    <aegov-card field-id="ar-rtl-2" is-padding="false" appearance="light" variant="neutral-min">
      <aegov-aspect-ratio ratio="video"><div class="size-full bg-secondary-100"></div></aegov-aspect-ratio>
      <div class="p-4">
        <aegov-title size="text-h6" heading-type="h3" extra-class="mb-1">مركز خدمة الكرامة</aegov-title>
        <aegov-text size="sm">مفتوح حتى الساعة ٢٠:٠٠.</aegov-text>
      </div>
    </aegov-card>
  </div>
</div>

One thing to consider: an image containing text or a directional diagram may need a mirrored variant for Arabic. The component cannot know that — supply a different `src` per direction where the image itself is directional.

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `ratio` | `ratio` | Named preset, a `width/height` pair, or a responsive string. | `string` — `auto \| square \| video \| 4/3 \| 3/2 \| 21/9 \| n/m` | `'auto'` |
| `fit` | `fit` | `object-fit` applied to `img`, `video` and `iframe` children. | `'cover' \| 'contain' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` |
| `extraClass` | `extra-class` | Extra classes on the wrapper. | `string` | — |

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | The content to shape — an image, video, iframe, or arbitrary markup. |

### Events

None.

### Methods

None.

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the wrapper. |
| `data-*` | Yes | Forwarded to the wrapper. |
| `class`, `style` | Allowed | Applied to the host. Use `extra-class` for the wrapper. |

---

## Accessibility

### Built-in behaviour

- The wrapper is a plain container with no ARIA role, so it adds nothing to the accessibility tree and does not interfere with the semantics of the media inside it.
- Reserving the shape before the media loads prevents layout shift, which is a genuine accessibility benefit — content moving under the pointer or the reading position is disorienting, and particularly disruptive for screen magnifier users.
- Responsive ratios resolve at runtime, so the shape adapts to viewport changes and zoom.

### Developer responsibilities

- **Give every image an `alt`.** Descriptive for meaningful images, `alt=""` for decorative ones. The wrapper does not and cannot supply it.
- **Give every `<iframe>` a `title`.**
- **Choose `fit` for the content.** `cover` crops — never use it for a logo, diagram or screenshot where the cropped part carries meaning. `contain` is the safe choice for those.
- **Avoid `fill`.** It distorts, and a stretched photograph of a person or a document is both ugly and misleading.
- **Use a responsive `ratio` for hero media.** A 21/9 box is roughly 137px tall at 320px wide, which is too short to be legible.
- **Provide a mirrored image for RTL** when the image itself contains text or directional content.
- **Do not put essential text inside an image.** It does not scale, does not translate, and is not selectable — put it in the page and use the image as support.
- **Keep ratios consistent across a grid**, so rows align.

---

## Where to next

- [Card](aegov-card.html) — media cards with `is-padding="false"`.
- [Bento Grid](aegov-bento-grid.html) — grids of media tiles.
- [Avatar](aegov-avatar.html) — for people, which has its own sizing and fallback.
- [Installation](installation.html) — how responsive property strings are resolved.
