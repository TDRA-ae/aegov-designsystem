# Drawer

<p class="text-lg text-aeblack-500 mb-8">A Drawer is a panel that slides in from the edge of the viewport — left, right, top, or bottom — to surface secondary content without leaving the current page. Use it for filter panels, navigation menus, settings, shopping baskets, or supplementary detail views where the underlying page should remain visible and easy to return to.</p>

## Introduction

The `aegov-drawer` component renders a panel anchored to one edge of the viewport, optionally over a backdrop. Like the modal, it uses Shadow DOM, is moved to `document.body` for correct stacking, traps focus inside, and locks body scroll while open. The drawer offers a richer animation and pinning model than the modal — choose `slide` or `fade` motion, attach the panel flush to the edge or float it with rounded corners, and optionally render without an overlay for non-blocking experiences.

```html
<aegov-button id="open-filters">Filters</aegov-button>

<aegov-drawer id="filters-drawer" position="right" aria-labelledby="filters-title">
  <h3 id="filters-title" class="text-xl font-bold mb-4">Filter services</h3>
  <p class="text-aeblack-500 mb-6">Refine the list of available government services.</p>

  <aegov-checkbox-group label="Service category" class="mb-6">
    <aegov-checkbox value="identity">Identity &amp; residency</aegov-checkbox>
    <aegov-checkbox value="health">Health</aegov-checkbox>
    <aegov-checkbox value="transport">Transport</aegov-checkbox>
    <aegov-checkbox value="business">Business &amp; licensing</aegov-checkbox>
  </aegov-checkbox-group>

  <div class="flex justify-end gap-3 mt-8">
    <aegov-button variant="secondary" id="filters-clear">Clear all</aegov-button>
    <aegov-button id="filters-apply">Apply filters</aegov-button>
  </div>
</aegov-drawer>

<script>
  const drawer = document.querySelector('#filters-drawer');
  document.querySelector('#open-filters').addEventListener('click', () => drawer.show());
  document.querySelector('#filters-clear').addEventListener('click', () => drawer.close());
  document.querySelector('#filters-apply').addEventListener('click', () => drawer.close());
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button id="demo-open-filters">
    <span>Filters</span>
  </aegov-button>

  <aegov-drawer id="demo-filters-drawer" position="right" aria-labelledby="demo-filters-title">
    <h3 id="demo-filters-title" class="text-xl font-bold mb-4">Filter services</h3>
    <p class="text-aeblack-500 mb-6">Refine the list of available government services.</p>
    <aegov-checkbox-group label="Service category" class="mb-6">
      <aegov-checkbox value="identity">Identity &amp; residency</aegov-checkbox>
      <aegov-checkbox value="health">Health</aegov-checkbox>
      <aegov-checkbox value="transport">Transport</aegov-checkbox>
      <aegov-checkbox value="business">Business &amp; licensing</aegov-checkbox>
    </aegov-checkbox-group>
    <div class="flex justify-end gap-3 mt-8">
      <aegov-button variant="secondary" id="demo-filters-clear">Clear all</aegov-button>
      <aegov-button id="demo-filters-apply">Apply filters</aegov-button>
    </div>
  </aegov-drawer>

  <script>
    (function() {
      const drawer = document.querySelector('#demo-filters-drawer');
      document.querySelector('#demo-open-filters').addEventListener('click', () => drawer.show());
      document.querySelector('#demo-filters-clear').addEventListener('click', () => drawer.close());
      document.querySelector('#demo-filters-apply').addEventListener('click', () => drawer.close());
    })();
  </script>
</div>

---

## Position

The `position` property selects which edge the drawer slides from. `right` is the default and is conventional for filters and detail panels; `left` is conventional for primary navigation; `top` and `bottom` work well on mobile or for transient toolbars.

```html
<aegov-drawer position="right" is-open="true">…</aegov-drawer>
<aegov-drawer position="left" is-open="true">…</aegov-drawer>
<aegov-drawer position="top" is-open="true">…</aegov-drawer>
<aegov-drawer position="bottom" is-open="true">…</aegov-drawer>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-3">
    <aegov-button id="demo-pos-right-btn">Right</aegov-button>
    <aegov-button id="demo-pos-left-btn">Left</aegov-button>
    <aegov-button id="demo-pos-top-btn">Top</aegov-button>
    <aegov-button id="demo-pos-bottom-btn">Bottom</aegov-button>
  </div>

  <aegov-drawer id="demo-drawer-right" position="right" aria-label="Right drawer">
    <h3 class="text-xl font-bold mb-2">Right-side drawer</h3>
    <p class="mb-6">Slides in from the right — best for filters and detail panels.</p>
    <aegov-button id="demo-drawer-right-close">Close</aegov-button>
  </aegov-drawer>

  <aegov-drawer id="demo-drawer-left" position="left" aria-label="Left drawer">
    <h3 class="text-xl font-bold mb-2">Left-side drawer</h3>
    <p class="mb-6">Slides in from the left — best for primary navigation.</p>
    <aegov-button id="demo-drawer-left-close">Close</aegov-button>
  </aegov-drawer>

  <aegov-drawer id="demo-drawer-top" position="top" aria-label="Top drawer">
    <h3 class="text-xl font-bold mb-2">Top drawer</h3>
    <p class="mb-6">Drops in from the top — useful for transient toolbars and announcements.</p>
    <aegov-button id="demo-drawer-top-close">Close</aegov-button>
  </aegov-drawer>

  <aegov-drawer id="demo-drawer-bottom" position="bottom" aria-label="Bottom drawer">
    <h3 class="text-xl font-bold mb-2">Bottom drawer</h3>
    <p class="mb-6">Slides in from the bottom — common on mobile for action sheets.</p>
    <aegov-button id="demo-drawer-bottom-close">Close</aegov-button>
  </aegov-drawer>

  <script>
    (function() {
      ['right','left','top','bottom'].forEach(p => {
        const d = document.querySelector('#demo-drawer-' + p);
        document.querySelector('#demo-pos-' + p + '-btn').addEventListener('click', () => d.show());
        document.querySelector('#demo-drawer-' + p + '-close').addEventListener('click', () => d.close());
      });
    })();
  </script>
</div>

---

## Sizes

The `size` property controls inner padding and, when `is-pinned="false"`, the gap between the panel and the viewport edge plus the corner radius.

```html
<aegov-drawer size="sm" is-open="true">…</aegov-drawer>
<aegov-drawer size="base" is-open="true">…</aegov-drawer>
<aegov-drawer size="lg" is-open="true">…</aegov-drawer>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-3">
    <aegov-button id="demo-drawer-size-sm-btn">Small</aegov-button>
    <aegov-button id="demo-drawer-size-base-btn">Base</aegov-button>
    <aegov-button id="demo-drawer-size-lg-btn">Large</aegov-button>
  </div>

  <aegov-drawer id="demo-drawer-size-sm" size="sm" aria-label="Small drawer">
    <h3 class="text-lg font-bold mb-2">Compact drawer</h3>
    <p class="mb-6">Compact padding for short content.</p>
    <aegov-button id="demo-drawer-size-sm-close" size="sm">Close</aegov-button>
  </aegov-drawer>

  <aegov-drawer id="demo-drawer-size-base" size="base" aria-label="Base drawer">
    <h3 class="text-xl font-bold mb-2">Standard drawer</h3>
    <p class="mb-6">Default padding for most use cases.</p>
    <aegov-button id="demo-drawer-size-base-close">Close</aegov-button>
  </aegov-drawer>

  <aegov-drawer id="demo-drawer-size-lg" size="lg" aria-label="Large drawer">
    <h3 class="text-2xl font-bold mb-2">Spacious drawer</h3>
    <p class="mb-6">Generous padding for long-form content like settings pages or rich detail views.</p>
    <aegov-button id="demo-drawer-size-lg-close">Close</aegov-button>
  </aegov-drawer>

  <script>
    (function() {
      ['sm','base','lg'].forEach(s => {
        const d = document.querySelector('#demo-drawer-size-' + s);
        document.querySelector('#demo-drawer-size-' + s + '-btn').addEventListener('click', () => d.show());
        document.querySelector('#demo-drawer-size-' + s + '-close').addEventListener('click', () => d.close());
      });
    })();
  </script>
</div>

---

## Pinned vs. Floating

`is-pinned="true"` (the default) attaches the drawer flush against the edge with no border-radius. Set `is-pinned="false"` to float the panel with a small gap and rounded corners — a softer, more contained look that pairs well with `size="lg"`.

```html
<aegov-drawer is-pinned="true" is-open="true">Pinned (default)</aegov-drawer>
<aegov-drawer is-pinned="false" is-open="true">Floating with gap</aegov-drawer>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-3">
    <aegov-button id="demo-pinned-btn">Pinned</aegov-button>
    <aegov-button id="demo-unpinned-btn">Floating</aegov-button>
  </div>

  <aegov-drawer id="demo-drawer-pinned" is-pinned="true" aria-label="Pinned drawer">
    <h3 class="text-xl font-bold mb-2">Pinned drawer</h3>
    <p class="mb-6">Flush against the edge — the default style.</p>
    <aegov-button id="demo-pinned-close">Close</aegov-button>
  </aegov-drawer>

  <aegov-drawer id="demo-drawer-unpinned" is-pinned="false" size="lg" aria-label="Floating drawer">
    <h3 class="text-xl font-bold mb-2">Floating drawer</h3>
    <p class="mb-6">A small gap from the viewport edge with rounded corners. Pairs well with size="lg".</p>
    <aegov-button id="demo-unpinned-close">Close</aegov-button>
  </aegov-drawer>

  <script>
    (function() {
      const p = document.querySelector('#demo-drawer-pinned');
      const u = document.querySelector('#demo-drawer-unpinned');
      document.querySelector('#demo-pinned-btn').addEventListener('click', () => p.show());
      document.querySelector('#demo-unpinned-btn').addEventListener('click', () => u.show());
      document.querySelector('#demo-pinned-close').addEventListener('click', () => p.close());
      document.querySelector('#demo-unpinned-close').addEventListener('click', () => u.close());
    })();
  </script>
</div>

---

## Animation

The `animation` property controls the open/close transition. `slide` (default) uses a directional translate matching the drawer's edge; `fade` cross-fades the panel; `none` disables transitions entirely — useful for tests or when motion should be suppressed at the OS level.

```html
<aegov-drawer animation="slide" is-open="true">…</aegov-drawer>
<aegov-drawer animation="fade" is-open="true">…</aegov-drawer>
<aegov-drawer animation="none" is-open="true">…</aegov-drawer>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-3">
    <aegov-button id="demo-anim-slide-btn">Slide</aegov-button>
    <aegov-button id="demo-anim-fade-btn">Fade</aegov-button>
    <aegov-button id="demo-anim-none-btn">None</aegov-button>
  </div>

  <aegov-drawer id="demo-drawer-anim-slide" animation="slide" aria-label="Slide animation drawer">
    <h3 class="text-xl font-bold mb-2">Slide animation</h3>
    <p class="mb-6">The panel translates in from the drawer's edge — the default transition.</p>
    <aegov-button id="demo-anim-slide-close">Close</aegov-button>
  </aegov-drawer>

  <aegov-drawer id="demo-drawer-anim-fade" animation="fade" aria-label="Fade animation drawer">
    <h3 class="text-xl font-bold mb-2">Fade animation</h3>
    <p class="mb-6">The panel cross-fades in without directional motion.</p>
    <aegov-button id="demo-anim-fade-close">Close</aegov-button>
  </aegov-drawer>

  <aegov-drawer id="demo-drawer-anim-none" animation="none" aria-label="No animation drawer">
    <h3 class="text-xl font-bold mb-2">No animation</h3>
    <p class="mb-6">The panel appears and disappears instantly — no transition.</p>
    <aegov-button id="demo-anim-none-close">Close</aegov-button>
  </aegov-drawer>

  <script>
    (function() {
      ['slide','fade','none'].forEach(a => {
        const d = document.querySelector('#demo-drawer-anim-' + a);
        document.querySelector('#demo-anim-' + a + '-btn').addEventListener('click', () => d.show());
        document.querySelector('#demo-anim-' + a + '-close').addEventListener('click', () => d.close());
      });
    })();
  </script>
</div>

---

## No Overlay

Set `is-overlay="false"` to render the drawer without a dimming backdrop. The page behind remains fully visible and (with `is-prevent-scroll="false"`) scrollable. This is useful for inspector-style panels that should not interrupt the user's workflow.

```html
<aegov-drawer is-overlay="false" is-prevent-scroll="false" is-pinned="false" position="right">
  <h3 class="text-lg font-bold mb-2">Quick info</h3>
  <p>This panel coexists with the page — no backdrop, no scroll lock.</p>
</aegov-drawer>
```

> Even without the visible overlay, clicking outside still closes the drawer when `is-close-with-overlay="true"` (the default), via an invisible click-catching layer.

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button id="demo-no-overlay-open">Open inspector panel</aegov-button>

  <aegov-drawer id="demo-no-overlay-drawer" is-overlay="false" is-prevent-scroll="false" is-pinned="false" position="right" aria-label="No overlay drawer">
    <h3 class="text-lg font-bold mb-2">Quick info</h3>
    <p class="mb-6">This panel coexists with the page — no backdrop, no scroll lock.</p>
    <aegov-button id="demo-no-overlay-close">Close</aegov-button>
  </aegov-drawer>

  <script>
    (function() {
      const d = document.querySelector('#demo-no-overlay-drawer');
      document.querySelector('#demo-no-overlay-open').addEventListener('click', () => d.show());
      document.querySelector('#demo-no-overlay-close').addEventListener('click', () => d.close());
    })();
  </script>
</div>

---

## Overlay Opacity

The `overlay-opacity` attribute controls how dark the backdrop appears when `is-overlay="true"`. Use `light` for a subtle hint, `base` (the default) for standard dimming, and `dark` for maximum focus on the drawer panel.

```html
<aegov-drawer overlay-opacity="light" is-open="true">…</aegov-drawer>
<aegov-drawer overlay-opacity="base" is-open="true">…</aegov-drawer>
<aegov-drawer overlay-opacity="dark" is-open="true">…</aegov-drawer>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-3">
    <aegov-button id="demo-opacity-light-btn">Light</aegov-button>
    <aegov-button id="demo-opacity-base-btn">Base</aegov-button>
    <aegov-button id="demo-opacity-dark-btn">Dark</aegov-button>
  </div>

  <aegov-drawer id="demo-drawer-opacity-light" overlay-opacity="light" aria-label="Light overlay drawer">
    <h3 class="text-xl font-bold mb-2">Light overlay</h3>
    <p class="mb-6">A subtle dim — the page behind remains quite visible.</p>
    <aegov-button id="demo-opacity-light-close">Close</aegov-button>
  </aegov-drawer>

  <aegov-drawer id="demo-drawer-opacity-base" overlay-opacity="base" aria-label="Base overlay drawer">
    <h3 class="text-xl font-bold mb-2">Base overlay</h3>
    <p class="mb-6">The default dimming level.</p>
    <aegov-button id="demo-opacity-base-close">Close</aegov-button>
  </aegov-drawer>

  <aegov-drawer id="demo-drawer-opacity-dark" overlay-opacity="dark" aria-label="Dark overlay drawer">
    <h3 class="text-xl font-bold mb-2">Dark overlay</h3>
    <p class="mb-6">A strong dim — focuses maximum attention on the drawer panel.</p>
    <aegov-button id="demo-opacity-dark-close">Close</aegov-button>
  </aegov-drawer>

  <script>
    (function() {
      ['light','base','dark'].forEach(o => {
        const d = document.querySelector('#demo-drawer-opacity-' + o);
        document.querySelector('#demo-opacity-' + o + '-btn').addEventListener('click', () => d.show());
        document.querySelector('#demo-opacity-' + o + '-close').addEventListener('click', () => d.close());
      });
    })();
  </script>
</div>

---

## Composite Example — Service Detail Panel

A right-side drawer used to surface the full detail of a government service from a list view, complete with a heading, structured content, and a primary action.

```html
<aegov-button id="open-detail">View service details</aegov-button>

<aegov-drawer id="detail-drawer" position="right" size="lg" is-pinned="false" aria-labelledby="detail-title">
  <header class="mb-6 pb-6 border-b border-aeblack-100">
    <aegov-badge variant="success" size="sm" class="mb-2">Available online</aegov-badge>
    <h3 id="detail-title" class="text-2xl font-bold">Renew Emirates ID</h3>
    <p class="text-aeblack-500">Federal Authority for Identity, Citizenship, Customs &amp; Port Security</p>
  </header>

  <dl class="space-y-4 mb-6">
    <div>
      <dt class="text-sm font-semibold text-aeblack-500">Processing time</dt>
      <dd>3 to 5 working days</dd>
    </div>
    <div>
      <dt class="text-sm font-semibold text-aeblack-500">Fees</dt>
      <dd>AED 270 (5 years) · AED 370 (10 years)</dd>
    </div>
    <div>
      <dt class="text-sm font-semibold text-aeblack-500">Required documents</dt>
      <dd>Existing Emirates ID, recent personal photo, proof of residence.</dd>
    </div>
  </dl>

  <div class="flex justify-end gap-3">
    <aegov-button variant="secondary" id="detail-close">Close</aegov-button>
    <aegov-button id="detail-start">Start application</aegov-button>
  </div>
</aegov-drawer>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button id="demo-open-detail">View service details</aegov-button>

  <aegov-drawer id="demo-detail-drawer" position="right" size="lg" is-pinned="false" aria-labelledby="demo-detail-title">
    <header class="mb-6 pb-6 border-b border-aeblack-100">
      <aegov-badge variant="success" size="sm" class="mb-2">Available online</aegov-badge>
      <h3 id="demo-detail-title" class="text-2xl font-bold">Renew Emirates ID</h3>
      <p class="text-aeblack-500">Federal Authority for Identity, Citizenship, Customs &amp; Port Security</p>
    </header>
    <dl class="space-y-4 mb-6">
      <div>
        <dt class="text-sm font-semibold text-aeblack-500">Processing time</dt>
        <dd>3 to 5 working days</dd>
      </div>
      <div>
        <dt class="text-sm font-semibold text-aeblack-500">Fees</dt>
        <dd>AED 270 (5 years) · AED 370 (10 years)</dd>
      </div>
      <div>
        <dt class="text-sm font-semibold text-aeblack-500">Required documents</dt>
        <dd>Existing Emirates ID, recent personal photo, proof of residence.</dd>
      </div>
    </dl>
    <div class="flex justify-end gap-3">
      <aegov-button variant="secondary" id="demo-detail-close">Close</aegov-button>
      <aegov-button id="demo-detail-start">Start application</aegov-button>
    </div>
  </aegov-drawer>

  <script>
    (function() {
      const d = document.querySelector('#demo-detail-drawer');
      document.querySelector('#demo-open-detail').addEventListener('click', () => d.show());
      document.querySelector('#demo-detail-close').addEventListener('click', () => d.close());
      document.querySelector('#demo-detail-start').addEventListener('click', () => d.close());
    })();
  </script>
</div>

---

## RTL Support

The drawer is direction-agnostic. The `position` values are absolute viewport edges (`left`, `right`, `top`, `bottom`), so a drawer with `position="right"` always slides in from the visual right of the screen, regardless of `dir`. The internal layout, text alignment, and any nested form controls automatically adapt to `dir="rtl"`.

```html
<div dir="rtl">
  <aegov-button id="rtl-open">عرض تفاصيل الخدمة</aegov-button>
  <aegov-drawer id="rtl-drawer" position="right" aria-labelledby="rtl-title">
    <h3 id="rtl-title" class="text-xl font-bold mb-4">تجديد الهوية الإماراتية</h3>
    <p class="text-aeblack-500 mb-6">
      الهيئة الاتحادية للهوية والجنسية والجمارك وأمن المنافذ
    </p>
    <dl class="space-y-4 mb-6">
      <div>
        <dt class="text-sm font-semibold text-aeblack-500">مدة الإنجاز</dt>
        <dd>من 3 إلى 5 أيام عمل</dd>
      </div>
      <div>
        <dt class="text-sm font-semibold text-aeblack-500">الرسوم</dt>
        <dd>270 درهماً (5 سنوات) · 370 درهماً (10 سنوات)</dd>
      </div>
    </dl>
    <div class="flex justify-end gap-3">
      <aegov-button variant="secondary" id="rtl-close">إغلاق</aegov-button>
      <aegov-button id="rtl-start">بدء الطلب</aegov-button>
    </div>
  </aegov-drawer>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button id="demo-rtl-drawer-open">عرض تفاصيل الخدمة</aegov-button>
  <aegov-drawer id="demo-rtl-drawer" position="right" aria-labelledby="demo-rtl-drawer-title">
    <h3 id="demo-rtl-drawer-title" class="text-xl font-bold mb-4">تجديد الهوية الإماراتية</h3>
    <p class="text-aeblack-500 mb-6">
      الهيئة الاتحادية للهوية والجنسية والجمارك وأمن المنافذ
    </p>
    <dl class="space-y-4 mb-6">
      <div>
        <dt class="text-sm font-semibold text-aeblack-500">مدة الإنجاز</dt>
        <dd>من 3 إلى 5 أيام عمل</dd>
      </div>
      <div>
        <dt class="text-sm font-semibold text-aeblack-500">الرسوم</dt>
        <dd>270 درهماً (5 سنوات) · 370 درهماً (10 سنوات)</dd>
      </div>
    </dl>
    <div class="flex justify-end gap-3">
      <aegov-button variant="secondary" id="demo-rtl-drawer-close">إغلاق</aegov-button>
      <aegov-button id="demo-rtl-drawer-start">بدء الطلب</aegov-button>
    </div>
  </aegov-drawer>
  <script>
    (function() {
      const d = document.querySelector('#demo-rtl-drawer');
      document.querySelector('#demo-rtl-drawer-open').addEventListener('click', () => d.show());
      document.querySelector('#demo-rtl-drawer-close').addEventListener('click', () => d.close());
      document.querySelector('#demo-rtl-drawer-start').addEventListener('click', () => d.close());
    })();
  </script>
</div>

---

## API Reference

### Properties

| Property              | Attribute                | Description                                                                                       | Type                                       | Default     |
| --------------------- | ------------------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------ | ----------- |
| `fieldId`             | `field-id`               | DOM `id` for the dialog element. Auto-generated if omitted.                                       | `string`                                   | _generated_ |
| `isOpen`              | `is-open`                | Whether the drawer is currently visible.                                                          | `boolean`                                  | `false`     |
| `position`            | `position`               | Edge from which the drawer slides in.                                                             | `'left' \| 'right' \| 'top' \| 'bottom'`   | `'right'`   |
| `animation`           | `animation`              | Open/close transition style.                                                                      | `'slide' \| 'fade' \| 'none'`              | `'slide'`   |
| `isPinned`            | `is-pinned`              | Pin to the edge (no gap, no border-radius). Set to `false` for a floating panel.                  | `boolean`                                  | `true`      |
| `isOverlay`           | `is-overlay`             | Show a dimming backdrop behind the drawer.                                                        | `boolean`                                  | `true`      |
| `overlayOpacity`      | `overlay-opacity`        | Backdrop dim level (only applies when `is-overlay="true"`).                                       | `'light' \| 'base' \| 'dark'`              | `'base'`    |
| `isCloseWithOverlay`  | `is-close-with-overlay`  | Close the drawer when the backdrop is clicked. Works even when `is-overlay="false"`.              | `boolean`                                  | `true`      |
| `isPreventScroll`     | `is-prevent-scroll`      | Lock body scroll while the drawer is open.                                                        | `boolean`                                  | `true`      |
| `size`                | `size`                   | Padding scale; also drives the gap and corner radius when `is-pinned="false"`.                    | `'sm' \| 'base' \| 'lg'`                   | `'base'`    |
| `isPadding`           | `is-padding`             | Apply inner content padding. Turn off for full-bleed content.                                     | `boolean`                                  | `true`      |
| `label`               | `label`                  | Accessible label for the drawer dialog. Prefer `aria-labelledby` pointing at a heading inside the drawer; use `label` only when no visible heading is present. | `string` | `undefined` |

### Slots

| Slot          | Description                                                                  |
| ------------- | ---------------------------------------------------------------------------- |
| _(default)_   | The drawer content. Structure your own header, body, and action area inside. |

### Events

| Event                       | Detail                              | Description                                                                                  |
| --------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------- |
| `aegovDrawerOpen`           | `void`                              | Fired immediately when the drawer begins opening.                                            |
| `aegovDrawerClose`          | `void`                              | Fired after the close animation completes and focus has been returned.                       |
| `aegovDrawerBeforeClose`    | `{ preventDefault: () => void }`    | Fired before the drawer closes. Call `preventDefault()` to keep it open.                     |
| `aegovDrawerBackdropClick`  | `MouseEvent`                        | Fired when the backdrop receives a click, regardless of whether dismissal is allowed.        |
| `aegovDrawerEscapePress`    | `KeyboardEvent`                     | Fired when the user presses `Escape` while the drawer is open.                               |

### Methods

| Method     | Returns          | Description                                                |
| ---------- | ---------------- | ---------------------------------------------------------- |
| `show()`   | `Promise<void>`  | Open the drawer.                                           |
| `close()`  | `Promise<void>`  | Close the drawer (fires `aegovDrawerBeforeClose` first).   |
| `toggle()` | `Promise<void>`  | Flip the open state.                                       |

### Pass-through Attributes

ARIA and `data-*` attributes set on `<aegov-drawer>` are forwarded onto the inner dialog element so screen readers and analytics receive the correct labels. Always provide either `aria-label` or `aria-labelledby`.

| Attribute group          | Forwarded? | Where it lands                                                    |
| ------------------------ | ---------- | ----------------------------------------------------------------- |
| `aria-label`             | Yes        | Applied to the inner `[role="dialog"]` element.                   |
| `aria-labelledby`        | Yes        | Applied to the inner `[role="dialog"]` element.                   |
| `aria-describedby`       | Yes        | Applied to the inner `[role="dialog"]` element.                   |
| Other `aria-*`           | Yes        | Applied to the inner `[role="dialog"]` element.                   |
| `data-*`                 | Yes        | Applied to the inner `[role="dialog"]` element.                   |
| `id`                     | n/a        | Use `field-id` — sets the `id` of the dialog element.            |
| `class`, `style`         | Allowed    | Applied to the host element (limited reach due to Shadow DOM).    |

> **Shadow DOM note.** Because `aegov-drawer` uses Shadow DOM, page-level CSS does not reach the backdrop and panel elements. Style customisation is limited to the host element and any CSS custom properties exposed by the component.

---

## Accessibility

### Built-in behaviour

- The panel renders with `role="dialog"` and `aria-modal="true"`.
- Focus is trapped inside the drawer while it is open. `Tab` and `Shift + Tab` cycle through focusable elements.
- On open, the first focusable element in the panel receives focus.
- On close, focus is returned to the element that opened the drawer.
- Body scroll is locked while the drawer is open (reference-counted across nested overlays).
- `Escape` always closes the drawer.
- The component is moved to `document.body`, ensuring correct stacking above the rest of the page.

### Developer responsibilities

- **Always label the drawer.** Provide either `aria-label` or `aria-labelledby` pointing at the visible heading inside the panel. Without one, screen readers announce only "dialog".
- For navigation drawers, use `<nav>` inside the panel and ensure each link is keyboard-reachable.
- Prefer the right-edge drawer for filter and detail panels in LTR, and the left-edge drawer for primary navigation. The convention is mirrored automatically in RTL by your overall page layout.
- Keep the drawer's primary action visible — long lists should scroll inside the panel rather than push the action out of view.
- Listen for `aegovDrawerBeforeClose` and call `preventDefault()` if the panel contains unsaved changes.

### Keyboard support

| Key              | Action                                                          |
| ---------------- | --------------------------------------------------------------- |
| `Escape`         | Close the drawer and return focus to the trigger element.       |
| `Tab`            | Move focus to the next focusable element inside the panel.      |
| `Shift + Tab`    | Move focus to the previous focusable element inside the panel.  |
| `Enter`, `Space` | Activate the focused button or control.                         |
