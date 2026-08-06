# Drawer

<p class="text-lg text-aeblack-500 mb-8">A Drawer slides in from an edge of the screen to show content alongside the page rather than on top of it. Use it for filters, secondary navigation, a details panel, or a form that is too long for a modal. Unlike a modal, a drawer can be shown without an overlay, letting the user keep working with the page behind it.</p>

## Introduction

`aegov-drawer` uses shadow DOM and relocates itself to `document.body`, so it renders above the page regardless of where you declared it.

```html
<aegov-button id="open-filters">Filters</aegov-button>

<aegov-drawer id="filters" label="Search filters" position="right">
  <h2>Filters</h2>
  <aegov-checkbox-group label="Emirate">
    <aegov-checkbox name="emirate" value="AZ" label="Abu Dhabi"></aegov-checkbox>
    <aegov-checkbox name="emirate" value="DU" label="Dubai"></aegov-checkbox>
  </aegov-checkbox-group>
  <aegov-button variant="primary">Apply filters</aegov-button>
</aegov-drawer>

<script type="module">
  const drawer = document.querySelector('#filters');
  document.querySelector('#open-filters').addEventListener('aegovButtonClick', () => drawer.show());
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button id="dr-demo-open">Filters</aegov-button>
  <aegov-drawer field-id="dr-demo" label="Search filters" position="right">
    <h2 class="text-h6 font-bold mb-4">Filters</h2>
    <aegov-checkbox-group label="Emirate" appearance="list">
      <aegov-checkbox name="dr-emirate" value="AZ" label="Abu Dhabi"></aegov-checkbox>
      <aegov-checkbox name="dr-emirate" value="DU" label="Dubai"></aegov-checkbox>
      <aegov-checkbox name="dr-emirate" value="SH" label="Sharjah"></aegov-checkbox>
    </aegov-checkbox-group>
    <div class="mt-6 flex gap-3">
      <aegov-button variant="primary" onclick="document.querySelector('#dr-demo').close()">Apply filters</aegov-button>
      <aegov-button appearance="outline" onclick="document.querySelector('#dr-demo').close()">Cancel</aegov-button>
    </div>
  </aegov-drawer>
  <script>document.querySelector('#dr-demo-open').addEventListener('aegovButtonClick', () => document.querySelector('#dr-demo').show());</script>
</div>

Set `label` — it becomes the dialog's accessible name.

---

## Drawer or modal?

| Use a **drawer** when | Use a [**modal**](aegov-modal.html) when |
| --- | --- |
| The content is long or has many fields. | The content is a short question. |
| The user may want to see the page behind it. | The user must deal with it before anything else. |
| It is a panel — filters, navigation, details. | It is a decision — confirm, accept, delete. |
| It may stay open while the user works. | It must be dismissed to continue. |

---

## Position

`position` sets the edge the drawer slides from.

```html
<aegov-drawer position="right" label="Right">…</aegov-drawer>
<aegov-drawer position="left" label="Left">…</aegov-drawer>
<aegov-drawer position="top" label="Top">…</aegov-drawer>
<aegov-drawer position="bottom" label="Bottom">…</aegov-drawer>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-3">
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#dr-pr').show()">right</aegov-button>
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#dr-pl').show()">left</aegov-button>
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#dr-pt').show()">top</aegov-button>
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#dr-pb').show()">bottom</aegov-button>
  </div>
  <aegov-drawer field-id="dr-pr" position="right" label="Right drawer"><p class="mb-4">Slides in from the right — the default, and conventional for filters and details.</p><aegov-button size="sm" onclick="document.querySelector('#dr-pr').close()">Close</aegov-button></aegov-drawer>
  <aegov-drawer field-id="dr-pl" position="left" label="Left drawer"><p class="mb-4">Slides in from the left — conventional for navigation.</p><aegov-button size="sm" onclick="document.querySelector('#dr-pl').close()">Close</aegov-button></aegov-drawer>
  <aegov-drawer field-id="dr-pt" position="top" label="Top drawer"><p class="mb-4">Slides down from the top.</p><aegov-button size="sm" onclick="document.querySelector('#dr-pt').close()">Close</aegov-button></aegov-drawer>
  <aegov-drawer field-id="dr-pb" position="bottom" label="Bottom drawer"><p class="mb-4">Slides up from the bottom — reads as a sheet on mobile.</p><aegov-button size="sm" onclick="document.querySelector('#dr-pb').close()">Close</aegov-button></aegov-drawer>
</div>

Conventions worth following: `left` for navigation, `right` for filters and detail panels, `bottom` for mobile sheets. Note these are physical edges, not logical ones — see [RTL Support](#rtl-support).

---

## Size

Three tokens, controlling width for side drawers and height for top and bottom ones.

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-3">
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#dr-ssm').show()">sm</aegov-button>
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#dr-sb').show()">base</aegov-button>
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#dr-slg').show()">lg</aegov-button>
  </div>
  <aegov-drawer field-id="dr-ssm" size="sm" label="Small drawer"><p class="mb-4">Small — a narrow panel.</p><aegov-button size="sm" onclick="document.querySelector('#dr-ssm').close()">Close</aegov-button></aegov-drawer>
  <aegov-drawer field-id="dr-sb" size="base" label="Base drawer"><p class="mb-4">Base — the default.</p><aegov-button size="sm" onclick="document.querySelector('#dr-sb').close()">Close</aegov-button></aegov-drawer>
  <aegov-drawer field-id="dr-slg" size="lg" label="Large drawer"><p class="mb-4">Large — for forms and dense content.</p><aegov-button size="sm" onclick="document.querySelector('#dr-slg').close()">Close</aegov-button></aegov-drawer>
</div>

---

## Pinned

`isPinned` — on by default — sits the drawer flush against the viewport edges. Setting it to `false` insets it slightly and rounds its corners, so it reads as a floating panel.

```html
<aegov-drawer is-pinned label="Flush to the edge">…</aegov-drawer>
<aegov-drawer is-pinned="false" label="Floating panel">…</aegov-drawer>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-3">
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#dr-pin').show()">Pinned (default)</aegov-button>
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#dr-unpin').show()">Unpinned</aegov-button>
  </div>
  <aegov-drawer field-id="dr-pin" is-pinned label="Pinned drawer"><p class="mb-4">Flush against the viewport edges.</p><aegov-button size="sm" onclick="document.querySelector('#dr-pin').close()">Close</aegov-button></aegov-drawer>
  <aegov-drawer field-id="dr-unpin" is-pinned="false" label="Unpinned drawer"><p class="mb-4">Inset with rounded corners — reads as a floating panel.</p><aegov-button size="sm" onclick="document.querySelector('#dr-unpin').close()">Close</aegov-button></aegov-drawer>
</div>

---

## Overlay

`isOverlay` — on by default — dims the page behind. **Turning it off is what makes a drawer non-blocking**, letting the user interact with the page while the drawer stays open.

```html
<!-- A filter panel the user can work alongside -->
<aegov-drawer
  label="Filters"
  is-overlay="false"
  is-prevent-scroll="false"
>…</aegov-drawer>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-3">
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#dr-ov').show()">With overlay (default)</aegov-button>
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#dr-noov').show()">Without overlay</aegov-button>
  </div>
  <aegov-drawer field-id="dr-ov" label="With overlay"><p class="mb-4">The page behind is dimmed and inert.</p><aegov-button size="sm" onclick="document.querySelector('#dr-ov').close()">Close</aegov-button></aegov-drawer>
  <aegov-drawer field-id="dr-noov" label="Without overlay" is-overlay="false" is-prevent-scroll="false"><p class="mb-4">The page behind stays visible and scrollable.</p><aegov-button size="sm" onclick="document.querySelector('#dr-noov').close()">Close</aegov-button></aegov-drawer>
</div>

Pair `is-overlay="false"` with `is-prevent-scroll="false"` — leaving scroll locked while the page is visibly available is confusing.

Note that the drawer still declares `aria-modal="true"` and traps focus even without an overlay, so assistive technology treats it as modal regardless. If you genuinely need a non-modal panel that the user can tab out of, a drawer is the wrong component — build an inline panel instead.

`overlayOpacity` sets the dim strength: `light`, `base` or `dark`.

---

## Animation

```html
<aegov-drawer animation="slide" label="Slide">…</aegov-drawer>
<aegov-drawer animation="fade" label="Fade">…</aegov-drawer>
<aegov-drawer animation="none" label="Instant">…</aegov-drawer>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-3">
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#dr-as').show()">slide</aegov-button>
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#dr-af').show()">fade</aegov-button>
    <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#dr-an').show()">none</aegov-button>
  </div>
  <aegov-drawer field-id="dr-as" animation="slide" label="Slide animation"><p class="mb-4">Transforms in from the edge.</p><aegov-button size="sm" onclick="document.querySelector('#dr-as').close()">Close</aegov-button></aegov-drawer>
  <aegov-drawer field-id="dr-af" animation="fade" label="Fade animation"><p class="mb-4">Fades in place.</p><aegov-button size="sm" onclick="document.querySelector('#dr-af').close()">Close</aegov-button></aegov-drawer>
  <aegov-drawer field-id="dr-an" animation="none" label="No animation"><p class="mb-4">Appears instantly.</p><aegov-button size="sm" onclick="document.querySelector('#dr-an').close()">Close</aegov-button></aegov-drawer>
</div>

`slide` is the default and reinforces where the panel came from, which helps orientation. Use `none` where motion is undesirable — though note this is a per-instance choice, not a substitute for respecting `prefers-reduced-motion` globally.

---

## Opening and closing

```js
await drawer.show();
await drawer.close();
await drawer.toggle();
```

`isOpen` is reflected and mutable, so declarative control works too:

```html
<aegov-drawer is-open label="Filters">…</aegov-drawer>
```

### Preventing close

`aegovDrawerBeforeClose` carries a `preventDefault` function **in its detail**:

```js
drawer.addEventListener('aegovDrawerBeforeClose', (e) => {
  if (hasUnsavedChanges()) {
    e.detail.preventDefault();          // note: on the detail, not the event
    window.aegovToast.show({ message: 'Save or discard your changes first', variant: 'warning' });
  }
});
```

**This differs from [Modal](aegov-modal.html)**, whose equivalent event is cancellable in the normal DOM way:

```js
// Drawer — cancel via the detail
drawer.addEventListener('aegovDrawerBeforeClose', (e) => e.detail.preventDefault());

// Modal — cancel on the event
modal.addEventListener('aegovModalBeforeClose', (e) => e.preventDefault());
```

Copying a handler from one to the other fails silently. Check which component you are on.

---

## Padding

`isPadding` — on by default — applies standard internal padding. Turn it off for content that manages its own, such as a full-bleed list.

---

## Composite example — filter panel

```html
<div class="flex items-center justify-between">
  <p class="text-sm text-aeblack-500">248 service centres</p>
  <aegov-button id="open-filters" size="sm" appearance="outline">
    Filters
    <aegov-badge appearance="solid" variant="primary" size="sm">3</aegov-badge>
  </aegov-button>
</div>

<aegov-drawer
  id="filters"
  label="Filter service centres"
  position="right"
  size="base"
>
  <h2 class="text-h6 font-bold mb-5">Filters</h2>

  <aegov-checkbox-group label="Emirate" appearance="list">
    <aegov-checkbox name="emirate" value="AZ" label="Abu Dhabi" is-checked></aegov-checkbox>
    <aegov-checkbox name="emirate" value="DU" label="Dubai" is-checked></aegov-checkbox>
    <aegov-checkbox name="emirate" value="SH" label="Sharjah"></aegov-checkbox>
  </aegov-checkbox-group>

  <aegov-range name="radius" label="Within (km)" min="1" max="50" value="10" display="full"></aegov-range>

  <div class="mt-6 flex flex-wrap gap-3">
    <aegov-button variant="primary">Show results</aegov-button>
    <aegov-button appearance="link">Clear all</aegov-button>
  </div>
</aegov-drawer>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex items-center justify-between max-w-md">
    <p class="text-sm text-aeblack-500">248 service centres</p>
    <aegov-button id="dr-cx-open" size="sm" appearance="outline">Filters <aegov-badge appearance="solid" variant="primary" size="sm">3</aegov-badge></aegov-button>
  </div>
  <aegov-drawer field-id="dr-cx" label="Filter service centres" position="right" size="base">
    <h2 class="text-h6 font-bold mb-5">Filters</h2>
    <aegov-checkbox-group label="Emirate" appearance="list">
      <aegov-checkbox name="dr-cx-em" value="AZ" label="Abu Dhabi" is-checked></aegov-checkbox>
      <aegov-checkbox name="dr-cx-em" value="DU" label="Dubai" is-checked></aegov-checkbox>
      <aegov-checkbox name="dr-cx-em" value="SH" label="Sharjah"></aegov-checkbox>
    </aegov-checkbox-group>
    <div class="mt-6">
      <aegov-range field-id="dr-cx-rad" name="radius" label="Within (km)" min="1" max="50" value="10" display="full"></aegov-range>
    </div>
    <div class="mt-6 flex flex-wrap gap-3">
      <aegov-button variant="primary" onclick="document.querySelector('#dr-cx').close()">Show results</aegov-button>
      <aegov-button appearance="link" onclick="document.querySelector('#dr-cx').close()">Clear all</aegov-button>
    </div>
  </aegov-drawer>
  <script>document.querySelector('#dr-cx-open').addEventListener('aegovButtonClick', () => document.querySelector('#dr-cx').show());</script>
</div>

---

## RTL Support

Content inside the drawer is direction-aware — headings, form fields and action rows all align with the text direction, and the close affordance moves to the inline-start corner.

**`position` is physical, not logical.** `position="right"` means the right edge of the viewport in both directions. For a navigation drawer that should come from the reading-start edge, swap the position with direction:

```js
const isRtl = document.documentElement.dir === 'rtl';
navDrawer.position = isRtl ? 'right' : 'left';
```

Because the drawer relocates itself to `document.body`, **set `dir` on `<html>`** rather than on an inner wrapper.

```html
<html dir="rtl" lang="ar">
  <aegov-drawer label="تصفية مراكز الخدمة" position="left">
    <h2>الفلاتر</h2>
    …
  </aegov-drawer>
</html>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button id="dr-rtl-open">الفلاتر</aegov-button>
  <aegov-drawer field-id="dr-rtl" label="تصفية مراكز الخدمة" position="left">
    <h2 class="text-h6 font-bold mb-5">الفلاتر</h2>
    <aegov-checkbox-group label="الإمارة" appearance="list">
      <aegov-checkbox name="dr-rtl-em" value="AZ" label="أبوظبي" is-checked></aegov-checkbox>
      <aegov-checkbox name="dr-rtl-em" value="DU" label="دبي"></aegov-checkbox>
      <aegov-checkbox name="dr-rtl-em" value="SH" label="الشارقة"></aegov-checkbox>
    </aegov-checkbox-group>
    <div class="mt-6 flex flex-wrap gap-3">
      <aegov-button variant="primary" onclick="document.querySelector('#dr-rtl').close()">إظهار النتائج</aegov-button>
      <aegov-button appearance="link" onclick="document.querySelector('#dr-rtl').close()">مسح الكل</aegov-button>
    </div>
  </aegov-drawer>
  <script>document.querySelector('#dr-rtl-open').addEventListener('aegovButtonClick', () => document.querySelector('#dr-rtl').show());</script>
</div>

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the drawer content. Auto-generated when omitted, reflected. | `string` | _generated_ |
| `isOpen` | `is-open` | Open state. Mutable and reflected. | `boolean` | `false` |
| `label` | `label` | Accessible name for the dialog. **Set this.** | `string` | — |
| `position` | `position` | Which **physical** edge the drawer slides from. | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` |
| `size` | `size` | Width for side drawers, height for top and bottom. | `'sm' \| 'base' \| 'lg'` | `'base'` |
| `animation` | `animation` | Entry and exit transition. | `'slide' \| 'fade' \| 'none'` | `'slide'` |
| `isPinned` | `is-pinned` | Flush to the viewport edges. `false` insets and rounds it. | `boolean` | `true` |
| `isOverlay` | `is-overlay` | Dims the page behind. | `boolean` | `true` |
| `overlayOpacity` | `overlay-opacity` | Dim strength. | `'light' \| 'base' \| 'dark'` | `'base'` |
| `isCloseWithOverlay` | `is-close-with-overlay` | Clicking the overlay closes the drawer. | `boolean` | `true` |
| `isPreventScroll` | `is-prevent-scroll` | Locks page scroll while open. | `boolean` | `true` |
| `isPadding` | `is-padding` | Applies standard internal padding. | `boolean` | `true` |

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | The drawer content. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovDrawerOpen` | `void` | The drawer opened. |
| `aegovDrawerClose` | `void` | The drawer closed. |
| `aegovDrawerBeforeClose` | `{ preventDefault: () => void }` | Cancel by calling `event.detail.preventDefault()` — **not** `event.preventDefault()`. |
| `aegovDrawerBackdropClick` | `MouseEvent` | The overlay was clicked. |
| `aegovDrawerEscapePress` | `KeyboardEvent` | `Escape` was pressed. |

### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `show()` | `Promise<void>` | Opens the drawer. |
| `close()` | `Promise<void>` | Closes the drawer, running the before-close event first. |
| `toggle()` | `Promise<void>` | Opens or closes. |

### Pass-through Attributes

The drawer uses **shadow DOM**.

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the `role="dialog"` element. Use `aria-labelledby` here to reference a visible heading instead of `label`. |
| `data-*` | Yes | Forwarded to the dialog element. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host only — they cannot restyle shadow internals. |

### Shadow DOM and stacking

- The component **relocates itself to `document.body`** on initialisation, so no ancestor can clip or mis-stack it.
- Drawers use their own z-index counter, separate from modals, incrementing per open drawer so stacked drawers layer correctly.
- Internals are in shadow DOM. In E2E tests, pierce it: `page.find('aegov-drawer >>> [role="dialog"]')`.

---

## Accessibility

### Built-in behaviour

- The panel carries `role="dialog"` and `aria-modal="true"`, and `label` becomes its accessible name.
- **Focus is trapped** inside the drawer while open, collected from the slotted content so your own controls participate.
- Focus moves into the drawer on open and returns to the trigger on close.
- `Escape` closes the drawer.
- Page scroll is locked while open by default, using a reference-counted lock so nested overlays behave.
- Relocating to `document.body` prevents an ancestor `overflow` or `transform` from clipping the panel, which also avoids WCAG 2.2 SC 2.4.11 failures where a focused control is hidden.
- The animation is CSS-driven, so it is cheap and interruptible.

### Developer responsibilities

- **Always set `label`**, or provide `aria-labelledby` pointing at a visible heading.
- **Include a visible heading** as the first content — the accessible name is not visible.
- **Provide an explicit close control.** `Escape` and the overlay are not discoverable.
- **Swap `position` for RTL** when the edge is semantically "start" rather than physically right or left.
- **Set `dir` on `<html>`** for RTL, since the drawer lives on the body.
- **Pair `is-overlay="false"` with `is-prevent-scroll="false"`.** A visible but unscrollable page reads as broken.
- **Do not expect a non-modal drawer.** Even without an overlay the drawer is `aria-modal` and traps focus; if the user must be able to tab out to the page, build an inline panel instead.
- **Respect reduced motion globally.** `animation="none"` is a per-instance setting, not a `prefers-reduced-motion` implementation.
- **Cancel closing only with an explanation.** If you call `event.detail.preventDefault()`, say why immediately.
- **Keep the trigger's state honest.** If the drawer is a filter panel, reflect the active filter count on the trigger so its effect is visible once closed.

### Keyboard support

| Key | Action |
| --- | --- |
| `Escape` | Close the drawer. |
| `Tab` | Move to the next focusable element inside the drawer, cycling at the end. |
| `Shift` + `Tab` | Move backwards, cycling at the start. |
| `Enter`, `Space` | Activate the focused control. |

---

## Where to next

- [Modal](aegov-modal.html) — for short, blocking decisions.
- [Popover](aegov-popover.html) — for small anchored panels.
- [Navblock](aegov-navblock.html) — commonly placed inside a navigation drawer.
- [Checkbox](aegov-checkbox.html) and [Range](aegov-range.html) — the usual contents of a filter drawer.
