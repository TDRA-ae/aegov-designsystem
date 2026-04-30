# Drawer

<p class="text-lg text-aeblack-500 mb-8">A drawer is an overlay panel that slides in from the edge of the viewport. Use it for navigation menus, filters, detail views, or any supplementary content that should not permanently occupy screen space.</p>

## Introduction

The `aegov-drawer` component is a full-featured side panel that supports **4 positions** (left, right, top, bottom), **3 animation styles** (slide, fade, none), configurable backdrop overlay, focus trapping, body scroll locking, and keyboard dismissal. It uses **Shadow DOM** for complete style encapsulation.

Open and close the drawer programmatically using the `show()`, `close()`, and `toggle()` methods, or by setting the `open` property directly.

```html
<aegov-button id="open-intro" variant="solid">Open Drawer</aegov-button>

<aegov-drawer id="drawer-intro">
  <div style="padding: 1.5rem; width: 320px;">
    <h3 style="margin-top: 0;">Drawer Title</h3>
    <p>This is a basic drawer that slides in from the right.</p>
    <aegov-button id="close-intro" variant="outline" size="sm">Close</aegov-button>
  </div>
</aegov-drawer>

<script>
  document.getElementById('open-intro').addEventListener('aegovButtonClick', () => {
    document.getElementById('drawer-intro').show();
  });
  document.getElementById('close-intro').addEventListener('aegovButtonClick', () => {
    document.getElementById('drawer-intro').close();
  });
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="open-intro" variant="solid">Open Drawer</aegov-button>
  <aegov-drawer id="drawer-intro">
    <div style="padding: 1.5rem; width: 320px;">
      <h3 style="margin-top: 0;">Drawer Title</h3>
      <p>This is a basic drawer that slides in from the right.</p>
      <aegov-button id="close-intro" variant="outline" size="sm">Close</aegov-button>
    </div>
  </aegov-drawer>
  <script>
    document.getElementById('open-intro').addEventListener('aegovButtonClick', () => {
      document.getElementById('drawer-intro').show();
    });
    document.getElementById('close-intro').addEventListener('aegovButtonClick', () => {
      document.getElementById('drawer-intro').close();
    });
  </script>
</div>

---

## Position

The `position` property controls which edge the drawer slides from. There are four positions available.

| Position | Description                    |
|----------|--------------------------------|
| `right`  | Default. Slides from the right edge. |
| `left`   | Slides from the left edge.     |
| `top`    | Slides down from the top edge. |
| `bottom` | Slides up from the bottom edge.|

### Right (default)

```html
<aegov-drawer position="right">
  <div style="padding: 1.5rem; width: 320px;">Right drawer content</div>
</aegov-drawer>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="open-right" variant="solid" size="sm">Open Right</aegov-button>
  <aegov-drawer id="drawer-right" position="right">
    <div style="padding: 1.5rem; width: 320px;">
      <h3 style="margin-top: 0;">Right Drawer</h3>
      <p>This drawer slides in from the right edge of the viewport.</p>
      <aegov-button id="close-right" variant="outline" size="sm">Close</aegov-button>
    </div>
  </aegov-drawer>
  <script>
    document.getElementById('open-right').addEventListener('aegovButtonClick', () => {
      document.getElementById('drawer-right').show();
    });
    document.getElementById('close-right').addEventListener('aegovButtonClick', () => {
      document.getElementById('drawer-right').close();
    });
  </script>
</div>

### Left

```html
<aegov-drawer position="left">
  <div style="padding: 1.5rem; width: 320px;">Left drawer content</div>
</aegov-drawer>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="open-left" variant="solid" size="sm">Open Left</aegov-button>
  <aegov-drawer id="drawer-left" position="left">
    <div style="padding: 1.5rem; width: 320px;">
      <h3 style="margin-top: 0;">Left Drawer</h3>
      <p>This drawer slides in from the left edge of the viewport.</p>
      <aegov-button id="close-left" variant="outline" size="sm">Close</aegov-button>
    </div>
  </aegov-drawer>
  <script>
    document.getElementById('open-left').addEventListener('aegovButtonClick', () => {
      document.getElementById('drawer-left').show();
    });
    document.getElementById('close-left').addEventListener('aegovButtonClick', () => {
      document.getElementById('drawer-left').close();
    });
  </script>
</div>

### Top

```html
<aegov-drawer position="top">
  <div style="padding: 1.5rem;">Top drawer content</div>
</aegov-drawer>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="open-top" variant="solid" size="sm">Open Top</aegov-button>
  <aegov-drawer id="drawer-top" position="top">
    <div style="padding: 1.5rem;">
      <h3 style="margin-top: 0;">Top Drawer</h3>
      <p>This drawer slides down from the top edge of the viewport.</p>
      <aegov-button id="close-top" variant="outline" size="sm">Close</aegov-button>
    </div>
  </aegov-drawer>
  <script>
    document.getElementById('open-top').addEventListener('aegovButtonClick', () => {
      document.getElementById('drawer-top').show();
    });
    document.getElementById('close-top').addEventListener('aegovButtonClick', () => {
      document.getElementById('drawer-top').close();
    });
  </script>
</div>

### Bottom

```html
<aegov-drawer position="bottom">
  <div style="padding: 1.5rem;">Bottom drawer content</div>
</aegov-drawer>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="open-bottom" variant="solid" size="sm">Open Bottom</aegov-button>
  <aegov-drawer id="drawer-bottom" position="bottom">
    <div style="padding: 1.5rem;">
      <h3 style="margin-top: 0;">Bottom Drawer</h3>
      <p>This drawer slides up from the bottom edge of the viewport.</p>
      <aegov-button id="close-bottom" variant="outline" size="sm">Close</aegov-button>
    </div>
  </aegov-drawer>
  <script>
    document.getElementById('open-bottom').addEventListener('aegovButtonClick', () => {
      document.getElementById('drawer-bottom').show();
    });
    document.getElementById('close-bottom').addEventListener('aegovButtonClick', () => {
      document.getElementById('drawer-bottom').close();
    });
  </script>
</div>

---

## Animation

The `animation` property controls the transition style used when opening and closing the drawer.

| Animation | Description                                                    |
|-----------|----------------------------------------------------------------|
| `slide`   | Default. The drawer slides in from the edge defined by `position`. |
| `fade`    | The drawer fades in and out with an opacity transition.        |
| `none`    | The drawer appears and disappears instantly with no transition.|

```html
<aegov-drawer animation="slide">…</aegov-drawer>
<aegov-drawer animation="fade">…</aegov-drawer>
<aegov-drawer animation="none">…</aegov-drawer>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="open-anim-slide" variant="solid" size="sm">Slide (default)</aegov-button>
  <aegov-button id="open-anim-fade" variant="outline" size="sm">Fade</aegov-button>
  <aegov-button id="open-anim-none" variant="soft" size="sm">None</aegov-button>

  <aegov-drawer id="drawer-anim-slide" animation="slide">
    <div style="padding: 1.5rem; width: 320px;">
      <h3 style="margin-top: 0;">Slide Animation</h3>
      <p>This drawer uses the default slide animation.</p>
      <aegov-button id="close-anim-slide" variant="outline" size="sm">Close</aegov-button>
    </div>
  </aegov-drawer>

  <aegov-drawer id="drawer-anim-fade" animation="fade">
    <div style="padding: 1.5rem; width: 320px;">
      <h3 style="margin-top: 0;">Fade Animation</h3>
      <p>This drawer fades in and out.</p>
      <aegov-button id="close-anim-fade" variant="outline" size="sm">Close</aegov-button>
    </div>
  </aegov-drawer>

  <aegov-drawer id="drawer-anim-none" animation="none">
    <div style="padding: 1.5rem; width: 320px;">
      <h3 style="margin-top: 0;">No Animation</h3>
      <p>This drawer appears and disappears instantly.</p>
      <aegov-button id="close-anim-none" variant="outline" size="sm">Close</aegov-button>
    </div>
  </aegov-drawer>

  <script>
    ['slide', 'fade', 'none'].forEach(function(anim) {
      document.getElementById('open-anim-' + anim).addEventListener('aegovButtonClick', function() {
        document.getElementById('drawer-anim-' + anim).show();
      });
      document.getElementById('close-anim-' + anim).addEventListener('aegovButtonClick', function() {
        document.getElementById('drawer-anim-' + anim).close();
      });
    });
  </script>
</div>

---

## Pinned vs Unpinned

By default the drawer panel is **pinned** flush to the viewport edge. Set `pinned="false"` to add a gap around the panel and apply rounded corners, giving the drawer a floating appearance.

```html
<!-- Pinned (default) — flush to edge -->
<aegov-drawer is-pinned>…</aegov-drawer>

<!-- Unpinned — gap + rounded corners -->
<aegov-drawer is-pinned="false">…</aegov-drawer>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="open-pinned" variant="solid" size="sm">Pinned (default)</aegov-button>
  <aegov-button id="open-unpinned" variant="outline" size="sm">Unpinned</aegov-button>

  <aegov-drawer id="drawer-pinned">
    <div style="padding: 1.5rem; width: 320px;">
      <h3 style="margin-top: 0;">Pinned Drawer</h3>
      <p>This drawer is flush to the right edge of the viewport with no gap or rounded corners.</p>
      <aegov-button id="close-pinned" variant="outline" size="sm">Close</aegov-button>
    </div>
  </aegov-drawer>

  <aegov-drawer id="drawer-unpinned" is-pinned="false">
    <div style="padding: 1.5rem; width: 320px;">
      <h3 style="margin-top: 0;">Unpinned Drawer</h3>
      <p>This drawer has a small gap from the viewport edges and rounded corners for a floating look.</p>
      <aegov-button id="close-unpinned" variant="outline" size="sm">Close</aegov-button>
    </div>
  </aegov-drawer>

  <script>
    document.getElementById('open-pinned').addEventListener('aegovButtonClick', function() {
      document.getElementById('drawer-pinned').show();
    });
    document.getElementById('close-pinned').addEventListener('aegovButtonClick', function() {
      document.getElementById('drawer-pinned').close();
    });
    document.getElementById('open-unpinned').addEventListener('aegovButtonClick', function() {
      document.getElementById('drawer-unpinned').show();
    });
    document.getElementById('close-unpinned').addEventListener('aegovButtonClick', function() {
      document.getElementById('drawer-unpinned').close();
    });
  </script>
</div>

---

## Size

The `size` property scales the drawer's inner padding. It mirrors the `aegov-card` sizing tokens. When `pinned="false"`, `size` also controls the **edge gap** and **border-radius**. When pinned, no border-radius is applied regardless of size.

| Size     | Padding | Unpinned gap | Unpinned radius |
|----------|---------|--------------|-----------------|
| `sm`     | `1rem` (16px)   | `0.25rem` (4px)  | `0.5rem` (8px)  |
| `base`   | `1.25rem` (20px) | `0.5rem` (8px)   | `0.75rem` (12px) — default |
| `lg`     | `1.5rem` (24px) | `0.75rem` (12px) | `1rem` (16px)   |

```html
<aegov-button id="open-size-sm" variant="outline">Small</aegov-button>
<aegov-button id="open-size-base" variant="outline">Base</aegov-button>
<aegov-button id="open-size-lg" variant="outline">Large</aegov-button>

<aegov-drawer id="drawer-size" size="base" is-pinned="false" aria-label="Sized drawer">
  <h3 style="margin-top: 0;">Sized Drawer</h3>
  <p>Padding, gap, and radius scale with the <code>size</code> prop.</p>
  <aegov-button id="close-size" variant="outline" size="sm">Close</aegov-button>
</aegov-drawer>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
    <aegov-button id="open-size-sm-demo" variant="outline">Small</aegov-button>
    <aegov-button id="open-size-base-demo" variant="outline">Base</aegov-button>
    <aegov-button id="open-size-lg-demo" variant="outline">Large</aegov-button>
  </div>
  <aegov-drawer id="drawer-size-demo" size="base" is-pinned="false" aria-label="Sized drawer">
    <h3 style="margin-top: 0;">Sized Drawer</h3>
    <p>Padding, gap, and radius scale with the <code>size</code> prop.</p>
    <aegov-button id="close-size-demo" variant="outline" size="sm">Close</aegov-button>
  </aegov-drawer>
  <script>
    (function() {
      var d = document.getElementById('drawer-size-demo');
      function openWith(sz) { d.size = sz; d.show(); }
      document.getElementById('open-size-sm-demo').addEventListener('aegovButtonClick', function() { openWith('sm'); });
      document.getElementById('open-size-base-demo').addEventListener('aegovButtonClick', function() { openWith('base'); });
      document.getElementById('open-size-lg-demo').addEventListener('aegovButtonClick', function() { openWith('lg'); });
      document.getElementById('close-size-demo').addEventListener('aegovButtonClick', function() { d.close(); });
    })();
  </script>
</div>

### Disallow padding

Set `is-padding` to remove inner padding entirely — useful when the slotted content provides its own structural spacing (e.g. a header / body / footer pattern).

```html
<aegov-drawer is-padding="false" aria-label="Edge-to-edge drawer">
  <!-- content controls its own padding -->
</aegov-drawer>
```

---

## Backdrop Overlay

The `is-overlay` property controls whether a semi-transparent backdrop is rendered behind the drawer. The `overlayOpacity` property adjusts the darkness of the backdrop.

| Opacity  | Description                           |
|----------|---------------------------------------|
| `light`  | 30% opacity — subtle dim.            |
| `base`   | Default. 50% opacity — standard dim. |
| `dark`   | 70% opacity — heavy dim.             |

```html
<aegov-drawer is-overlay overlay-opacity="light">…</aegov-drawer>
<aegov-drawer is-overlay overlay-opacity="base">…</aegov-drawer>
<aegov-drawer is-overlay overlay-opacity="dark">…</aegov-drawer>
<aegov-drawer is-overlay="false">…</aegov-drawer>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="open-ov-light" variant="solid" size="sm">Light Overlay</aegov-button>
  <aegov-button id="open-ov-base" variant="solid" size="sm">Base Overlay</aegov-button>
  <aegov-button id="open-ov-dark" variant="solid" size="sm">Dark Overlay</aegov-button>
  <aegov-button id="open-ov-none" variant="outline" size="sm">No Overlay</aegov-button>

  <aegov-drawer id="drawer-ov-light" overlay-opacity="light">
    <div style="padding: 1.5rem; width: 320px;">
      <h3 style="margin-top: 0;">Light Overlay</h3>
      <p>The backdrop uses 30% opacity for a subtle dim effect.</p>
      <aegov-button id="close-ov-light" variant="outline" size="sm">Close</aegov-button>
    </div>
  </aegov-drawer>

  <aegov-drawer id="drawer-ov-base" overlay-opacity="base">
    <div style="padding: 1.5rem; width: 320px;">
      <h3 style="margin-top: 0;">Base Overlay</h3>
      <p>The backdrop uses 50% opacity (default).</p>
      <aegov-button id="close-ov-base" variant="outline" size="sm">Close</aegov-button>
    </div>
  </aegov-drawer>

  <aegov-drawer id="drawer-ov-dark" overlay-opacity="dark">
    <div style="padding: 1.5rem; width: 320px;">
      <h3 style="margin-top: 0;">Dark Overlay</h3>
      <p>The backdrop uses 70% opacity for a heavy dim effect.</p>
      <aegov-button id="close-ov-dark" variant="outline" size="sm">Close</aegov-button>
    </div>
  </aegov-drawer>

  <aegov-drawer id="drawer-ov-none" is-overlay="false">
    <div style="padding: 1.5rem; width: 320px;">
      <h3 style="margin-top: 0;">No Overlay</h3>
      <p>No backdrop is rendered. The page behind remains fully visible. Click outside still closes the drawer because <code>close-with-backdrop</code> defaults to <code>true</code>.</p>
      <aegov-button id="close-ov-none" variant="outline" size="sm">Close</aegov-button>
    </div>
  </aegov-drawer>

  <script>
    ['light', 'base', 'dark', 'none'].forEach(function(v) {
      document.getElementById('open-ov-' + v).addEventListener('aegovButtonClick', function() {
        document.getElementById('drawer-ov-' + v).show();
      });
      document.getElementById('close-ov-' + v).addEventListener('aegovButtonClick', function() {
        document.getElementById('drawer-ov-' + v).close();
      });
    });
  </script>
</div>

---

## Close Behaviour

### Backdrop Click

By default, clicking the backdrop (or the area outside the drawer when `is-overlay` is `false`) closes the drawer. Set `is-close-with-overlay="false"` to disable this.

```html
<!-- Backdrop click closes (default) -->
<aegov-drawer is-close-with-overlay>…</aegov-drawer>

<!-- Backdrop click does NOT close -->
<aegov-drawer is-close-with-overlay="false">…</aegov-drawer>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="open-no-bd-close" variant="solid" size="sm">Backdrop Click Disabled</aegov-button>
  <aegov-drawer id="drawer-no-bd-close" is-close-with-overlay="false">
    <div style="padding: 1.5rem; width: 320px;">
      <h3 style="margin-top: 0;">Persistent Drawer</h3>
      <p>Clicking the backdrop will <strong>not</strong> close this drawer. You must use the close button or press Escape.</p>
      <aegov-button id="close-no-bd-close" variant="outline" size="sm">Close</aegov-button>
    </div>
  </aegov-drawer>
  <script>
    document.getElementById('open-no-bd-close').addEventListener('aegovButtonClick', function() {
      document.getElementById('drawer-no-bd-close').show();
    });
    document.getElementById('close-no-bd-close').addEventListener('aegovButtonClick', function() {
      document.getElementById('drawer-no-bd-close').close();
    });
  </script>
</div>

### Escape Key

Pressing the **Escape** key always closes the drawer and emits the `aegovDrawerEscapePress` event. This behaviour cannot be disabled.

### Cancellable Close

The `aegovDrawerBeforeClose` event fires before the drawer actually closes. Call `preventDefault()` on the event detail to cancel the close. This is useful for confirming unsaved changes.

```html
<aegov-drawer id="drawer-confirm">…</aegov-drawer>

<script>
  var drawer = document.getElementById('drawer-confirm');
  drawer.addEventListener('aegovDrawerBeforeClose', function(e) {
    if (!confirm('You have unsaved changes. Close anyway?')) {
      e.detail.preventDefault();
    }
  });
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="open-confirm" variant="solid" size="sm">Open (with confirmation)</aegov-button>
  <aegov-drawer id="drawer-confirm">
    <div style="padding: 1.5rem; width: 320px;">
      <h3 style="margin-top: 0;">Confirm Before Close</h3>
      <p>Try clicking the backdrop or pressing Escape. A confirmation dialog will appear before the drawer closes.</p>
      <aegov-button id="close-confirm" variant="outline" size="sm">Close</aegov-button>
    </div>
  </aegov-drawer>
  <script>
    document.getElementById('open-confirm').addEventListener('aegovButtonClick', function() {
      document.getElementById('drawer-confirm').show();
    });
    document.getElementById('close-confirm').addEventListener('aegovButtonClick', function() {
      document.getElementById('drawer-confirm').close();
    });
    document.getElementById('drawer-confirm').addEventListener('aegovDrawerBeforeClose', function(e) {
      if (!confirm('You have unsaved changes. Close anyway?')) {
        e.detail.preventDefault();
      }
    });
  </script>
</div>

---

## Body Scroll Lock

By default the drawer locks body scrolling when open. Set `is-prevent-scroll="false"` to allow the page to scroll behind the drawer.

```html
<!-- Body scroll locked (default) -->
<aegov-drawer is-prevent-scroll>…</aegov-drawer>

<!-- Body scroll allowed -->
<aegov-drawer is-prevent-scroll="false">…</aegov-drawer>
```

---

## Programmatic Methods

The drawer exposes three public methods for programmatic control.

| Method     | Description                             |
|------------|-----------------------------------------|
| `show()`   | Opens the drawer.                       |
| `close()`  | Closes the drawer (fires `aegovDrawerBeforeClose` first). |
| `toggle()` | Toggles the drawer open or closed.      |

```html
<aegov-drawer id="my-drawer">…</aegov-drawer>

<script>
  var drawer = document.getElementById('my-drawer');

  // Open
  drawer.show();

  // Close
  drawer.close();

  // Toggle
  drawer.toggle();
</script>
```

You can also control the drawer by setting the `open` property directly:

```html
<script>
  document.getElementById('my-drawer').open = true;   // open
  document.getElementById('my-drawer').open = false;  // close
</script>
```

---

## Events

The drawer emits several events during its lifecycle.

```html
<aegov-drawer id="drawer-events">…</aegov-drawer>

<script>
  var drawer = document.getElementById('drawer-events');

  drawer.addEventListener('aegovDrawerOpen', function() {
    console.log('Drawer opened');
  });

  drawer.addEventListener('aegovDrawerClose', function() {
    console.log('Drawer closed');
  });

  drawer.addEventListener('aegovDrawerBeforeClose', function(e) {
    console.log('Drawer about to close');
    // e.detail.preventDefault();  // cancel close if needed
  });

  drawer.addEventListener('aegovDrawerBackdropClick', function() {
    console.log('Backdrop clicked');
  });

  drawer.addEventListener('aegovDrawerEscapePress', function() {
    console.log('Escape key pressed');
  });
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="open-events" variant="solid" size="sm">Open Event Demo</aegov-button>
  <div id="events-log" style="margin-top: 1rem; padding: 0.75rem; background: white; border: 1px solid #e2e8f0; border-radius: 0.375rem; font-family: monospace; font-size: 0.8rem; max-height: 160px; overflow-y: auto;"></div>
  <aegov-drawer id="drawer-events">
    <div style="padding: 1.5rem; width: 320px;">
      <h3 style="margin-top: 0;">Event Demo</h3>
      <p>Open the browser console or watch the log below. Try clicking the backdrop or pressing Escape.</p>
      <aegov-button id="close-events" variant="outline" size="sm">Close</aegov-button>
    </div>
  </aegov-drawer>
  <script>
    (function() {
      var log = document.getElementById('events-log');
      var drawer = document.getElementById('drawer-events');
      function addLog(msg) {
        var line = document.createElement('div');
        line.textContent = new Date().toLocaleTimeString() + ' — ' + msg;
        log.prepend(line);
      }
      document.getElementById('open-events').addEventListener('aegovButtonClick', function() {
        drawer.show();
      });
      document.getElementById('close-events').addEventListener('aegovButtonClick', function() {
        drawer.close();
      });
      drawer.addEventListener('aegovDrawerOpen', function() { addLog('aegovDrawerOpen'); });
      drawer.addEventListener('aegovDrawerClose', function() { addLog('aegovDrawerClose'); });
      drawer.addEventListener('aegovDrawerBeforeClose', function() { addLog('aegovDrawerBeforeClose'); });
      drawer.addEventListener('aegovDrawerBackdropClick', function() { addLog('aegovDrawerBackdropClick'); });
      drawer.addEventListener('aegovDrawerEscapePress', function() { addLog('aegovDrawerEscapePress'); });
    })();
  </script>
</div>

---

## Slotted Content Patterns

The drawer uses a single default slot. You are responsible for structuring the content inside it. Below are common layout patterns. Set `is-padding` so the slotted structure controls its own spacing.

### Header, Body, and Footer

```html
<aegov-drawer id="structured-drawer" is-padding="false" aria-label="Structured drawer">
  <div style="display: flex; flex-direction: column; height: 100%; width: 360px;">
    <!-- Header -->
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; border-bottom: 1px solid #e2e8f0;">
      <h2 style="margin: 0; font-size: 1.25rem;">Drawer Title</h2>
      <aegov-button icon variant="soft" appearance="neutralMax" aria-label="Close" id="close-structured">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </aegov-button>
    </div>
    <!-- Body -->
    <div style="flex: 1; padding: 1.5rem; overflow-y: auto;">
      <p style="margin: 0; color: #64748b;">Place your main content here — forms, text, lists, or any HTML.</p>
    </div>
    <!-- Footer -->
    <div style="display: flex; justify-content: flex-end; gap: 0.5rem; padding: 1.5rem; border-top: 1px solid #e2e8f0;">
      <aegov-button variant="outline" id="cancel-structured">Cancel</aegov-button>
      <aegov-button id="save-structured">Save Changes</aegov-button>
    </div>
  </div>
</aegov-drawer>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="open-structured-demo">Open Structured Drawer</aegov-button>
  <aegov-drawer id="structured-drawer-demo" is-padding="false" aria-label="Structured drawer">
    <div style="display: flex; flex-direction: column; height: 100%; width: 360px;">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; border-bottom: 1px solid #e2e8f0;">
        <h2 style="margin: 0; font-size: 1.25rem;">Drawer Title</h2>
        <aegov-button icon variant="soft" appearance="neutralMax" size="sm" aria-label="Close" id="close-structured-demo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </aegov-button>
      </div>
      <div style="flex: 1; padding: 1.5rem; overflow-y: auto;">
        <p style="margin: 0; color: #64748b;">Place your main content here — forms, text, lists, or any HTML.</p>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 0.5rem; padding: 1.5rem; border-top: 1px solid #e2e8f0;">
        <aegov-button variant="outline" id="cancel-structured-demo">Cancel</aegov-button>
        <aegov-button id="save-structured-demo">Save Changes</aegov-button>
      </div>
    </div>
  </aegov-drawer>
  <script>
    (function() {
      const drawer = document.getElementById('structured-drawer-demo');
      document.getElementById('open-structured-demo').addEventListener('aegovButtonClick', () => drawer.show());
      document.getElementById('close-structured-demo').addEventListener('aegovButtonClick', () => drawer.close());
      document.getElementById('cancel-structured-demo').addEventListener('aegovButtonClick', () => drawer.close());
      document.getElementById('save-structured-demo').addEventListener('aegovButtonClick', () => drawer.close());
    })();
  </script>
</div>

---

## Practical Example — Navigation Sidebar

A common use case is a responsive navigation menu that opens as a drawer on mobile.

```html
<aegov-button id="open-nav" icon aria-label="Open menu">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" stroke-linecap="round"
       stroke-linejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
</aegov-button>

<aegov-drawer id="nav-drawer" position="left" aria-label="Navigation">
  <nav style="padding: 1.5rem; width: 280px;">
    <h3 style="margin-top: 0;">Menu</h3>
    <ul style="list-style: none; padding: 0; margin: 0;">
      <li style="padding: 0.5rem 0;"><aegov-link href="#">Home</aegov-link></li>
      <li style="padding: 0.5rem 0;"><aegov-link href="#">Services</aegov-link></li>
      <li style="padding: 0.5rem 0;"><aegov-link href="#">About</aegov-link></li>
      <li style="padding: 0.5rem 0;"><aegov-link href="#">Contact</aegov-link></li>
    </ul>
  </nav>
</aegov-drawer>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="open-nav" icon aria-label="Open menu">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  </aegov-button>
  <aegov-drawer id="nav-drawer" position="left" aria-label="Navigation">
    <nav style="padding: 1.5rem; width: 280px;">
      <h3 style="margin-top: 0;">Menu</h3>
      <ul style="list-style: none; padding: 0; margin: 0;">
        <li style="padding: 0.5rem 0;"><aegov-link href="#">Home</aegov-link></li>
        <li style="padding: 0.5rem 0;"><aegov-link href="#">Services</aegov-link></li>
        <li style="padding: 0.5rem 0;"><aegov-link href="#">About</aegov-link></li>
        <li style="padding: 0.5rem 0;"><aegov-link href="#">Contact</aegov-link></li>
      </ul>
    </nav>
  </aegov-drawer>
  <script>
    document.getElementById('open-nav').addEventListener('aegovButtonClick', function() {
      document.getElementById('nav-drawer').show();
    });
  </script>
</div>

---

## API Reference

### Properties

| Property             | Attribute              | Description                                              | Type                                            | Default    |
|----------------------|------------------------|----------------------------------------------------------|-------------------------------------------------|------------|
| `open`               | `open`                 | Whether the drawer is currently open                     | `boolean`                                       | `false`    |
| `position`           | `position`             | Which edge the drawer slides from                        | `'left'` \| `'right'` \| `'top'` \| `'bottom'` | `'right'`  |
| `animation`          | `animation`            | Animation strategy for open/close transitions            | `'slide'` \| `'fade'` \| `'none'`              | `'slide'`  |
| `is-pinned`             | `is-pinned`               | Whether the drawer is flush to edges or floating         | `boolean`                                       | `true`     |
| `is-overlay`            | `is-overlay`              | Whether to show a backdrop overlay behind the drawer     | `boolean`                                       | `true`     |
| `overlayOpacity`     | `overlay-opacity`      | Backdrop overlay opacity level                           | `'light'` \| `'base'` \| `'dark'`              | `'base'`   |
| `closeWithBackdrop`  | `is-close-with-overlay`  | Whether clicking the backdrop closes the drawer          | `boolean`                                       | `true`     |
| `preventBodyScroll`  | `is-prevent-scroll`  | Whether to prevent body scrolling when drawer is open    | `boolean`                                       | `true`     |
| `size`               | `size`                 | Inner padding scale; also drives gap + radius when unpinned | `'sm'` \| `'base'` \| `'lg'`                | `'base'`   |
| `isPadding`    | `is-padding`     | Disables inner content padding                            | `boolean`                                       | `false`    |

### Events

| Event                       | Description                                                  | Detail Type                            |
|-----------------------------|--------------------------------------------------------------|----------------------------------------|
| `aegovDrawerOpen`           | Emitted when the drawer is opened                            | `void`                                 |
| `aegovDrawerClose`          | Emitted when the drawer has finished closing                 | `void`                                 |
| `aegovDrawerBeforeClose`    | Emitted before the drawer closes (cancellable)               | `{ preventDefault: () => void }`       |
| `aegovDrawerBackdropClick`  | Emitted when the backdrop is clicked                         | `MouseEvent`                           |
| `aegovDrawerEscapePress`    | Emitted when the Escape key is pressed                       | `KeyboardEvent`                        |

### Methods

| Method     | Signature               | Description                        |
|------------|--------------------------|------------------------------------|
| `show()`   | `show(): Promise<void>`  | Programmatically open the drawer.  |
| `close()`  | `close(): Promise<void>` | Programmatically close the drawer. |
| `toggle()` | `toggle(): Promise<void>`| Toggle the drawer open or closed.  |

### Slots

| Slot      | Description                                      |
|-----------|--------------------------------------------------|
| (default) | The drawer content — any HTML or components.     |

### Pass-Through Attributes

The component forwards `aria-*`, `data-*`, and `id` attributes from the host element to the inner dialog container. This allows you to set accessibility labels and tracking attributes.

```html
<aegov-drawer aria-label="Settings panel" data-analytics="settings-drawer">
  …
</aegov-drawer>
```

---

## Accessibility

The `aegov-drawer` component is built with accessibility as a first-class concern. The following features are included out of the box.

### Built-in Features

- **`role="dialog"`** — the drawer panel is announced as a dialog to assistive technologies.
- **`aria-modal="true"`** — indicates that the drawer is modal and content behind it is inert.
- **Focus trapping** — when the drawer opens, focus is moved to the first focusable element inside the drawer. Pressing Tab cycles through focusable elements without escaping to the page behind.
- **Focus restoration** — when the drawer closes, focus returns to the element that triggered the drawer.
- **Escape key** — pressing Escape closes the drawer, following the standard dialog dismissal pattern.
- **Body scroll lock** — the page behind the drawer cannot be scrolled, preventing disorientation.
- **Reduced motion** — when `prefers-reduced-motion: reduce` is active, all animations are disabled and the drawer appears/disappears instantly.
- **Pass-through `aria-*` attributes** — any `aria-*` attribute placed on the host element is forwarded to the dialog container.

### Developer Responsibilities

The following items require action from the developer implementing the component:

1. **Provide an accessible label.** Every drawer should have either an `aria-label` or `aria-labelledby` attribute so screen readers can announce the drawer's purpose.

   ```html
   <aegov-drawer aria-label="Filter options">…</aegov-drawer>

   <!-- Or reference a visible heading -->
   <aegov-drawer aria-labelledby="drawer-heading">
     <h2 id="drawer-heading">Filters</h2>
     …
   </aegov-drawer>
   ```

2. **Include a close mechanism.** Always provide a visible close button inside the drawer so that pointer and touch users can dismiss it without relying on the backdrop or Escape key.

3. **Ensure focusable content.** The focus trap requires at least one focusable element inside the drawer (a button, link, or input). If the drawer has no interactive elements, add a close button.

4. **Do not nest drawers.** While the z-index manager supports stacking, nesting drawers creates a confusing user experience. Use a single drawer at a time.

---

## Notes

- The `aegov-drawer` component uses **Shadow DOM** (`shadow: true`). Styles inside the drawer's internal structure are fully encapsulated. Content you place in the default slot is projected via a `<slot>` element and remains in the light DOM, so your own styles apply to it normally.
- The drawer is **portalled to `document.body`** on `connectedCallback()` to ensure correct stacking above all other content. This means the drawer's position in your source HTML does not affect its visual position.
- The `open` property is **reflected** to an attribute, so you can use CSS selectors like `aegov-drawer[open]` for conditional styling if needed.
- The drawer panel uses `overflow-y: auto`, so content that exceeds the drawer height will scroll within the panel. Custom scrollbar styling is applied for WebKit browsers.
- The **z-index** is managed automatically via an internal stack. Multiple overlay components (drawers, modals) will layer correctly.
- The `close()` method fires `aegovDrawerBeforeClose` before actually closing. If the event is cancelled via `preventDefault()`, the drawer remains open.
- When `is-overlay` is `false` but `closeWithBackdrop` is `true`, an invisible full-screen element is rendered to catch clicks outside the drawer.
- Animation duration is 300ms for the drawer panel and 200ms for the backdrop. These values are defined as CSS custom properties (`--drawer-duration` and `--drawer-backdrop-duration`) on the `:host` element.
