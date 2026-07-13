# Banner

<p class="text-lg text-aeblack-500 mb-8">A Banner is a page-level notification pinned to the top or bottom of the viewport. Use it for messages that apply to the whole site or service — scheduled maintenance, regional alerts, cookie consent, ministry-wide announcements, or critical system errors that must remain visible while users scroll. Banners are persistent and intentionally interrupt the normal page flow when needed.</p>

## Introduction

The `aegov-banner` component renders a full-width container fixed to the top or bottom of the viewport. It supports four severity variants, two visual treatments, fixed and sticky positioning, and two layout modes — `push` (banner reserves space and the body content is offset) or `overlay` (banner floats above content and emits its height for downstream layout adjustments). The dismiss button is built in.

```html
<aegov-banner variant="info" position="top">
  Scheduled maintenance: Government services will be briefly unavailable on Friday 03:00–05:00 GST.
</aegov-banner>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="relative h-32 overflow-hidden rounded">
    <aegov-banner variant="info" display="sticky" mode="overlay">
      Scheduled maintenance: Government services will be briefly unavailable on Friday 03:00&ndash;05:00 GST.
    </aegov-banner>
  </div>
  <p class="text-sm text-aeblack-500 mt-3">The banner above is a real <code>&lt;aegov-banner&gt;</code> rendered inside a bounded container so it stays in place for the demo.</p>
</div>

> The demos on this page use `display="sticky" mode="overlay"` and are placed inside bounded containers so the banners don't pin to the page viewport or add padding to `<body>`. In production you typically want `display="fixed" mode="push"` instead.

---

## Variants

The `variant` property sets the colour scheme and the implicit ARIA role.

| Variant | ARIA role | Announcement | Why |
|---|---|---|---|
| `error` | `role="alert"` | Assertive — interrupts immediately | Blocking error that the user must act on now (WAI-ARIA 1.2 implicit `aria-live="assertive"`) |
| `success`, `info`, `warning`, `default` | `role="status"` | Polite — announced when AT is idle | Non-urgent notification; does not interrupt the user's current task (WAI-ARIA 1.2 implicit `aria-live="polite"`) |

Both roles carry their `aria-live` value **implicitly** — the component does not set an explicit `aria-live` attribute, which is correct per the [APG Alert pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/examples/alert/).

```html
<aegov-banner variant="default">A neutral, informational message.</aegov-banner>
<aegov-banner variant="info">Useful information about the service.</aegov-banner>
<aegov-banner variant="success">Your application has been received.</aegov-banner>
<aegov-banner variant="warning">Action required before the deadline.</aegov-banner>
<aegov-banner variant="error">The service is currently unavailable.</aegov-banner>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov space-y-3">
  <aegov-banner variant="default" display="sticky" mode="overlay" is-dismissible="false">A neutral, informational message.</aegov-banner>
  <aegov-banner variant="info"    display="sticky" mode="overlay" is-dismissible="false">Useful information about your service.</aegov-banner>
  <aegov-banner variant="success" display="sticky" mode="overlay" is-dismissible="false">Your Emirates ID renewal application has been received.</aegov-banner>
  <aegov-banner variant="warning" display="sticky" mode="overlay" is-dismissible="false">Your residency permit expires in 14 days &mdash; renew before 15 May.</aegov-banner>
  <aegov-banner variant="error"   display="sticky" mode="overlay" is-dismissible="false">The payment gateway is temporarily unavailable. Please try again shortly.</aegov-banner>
</div>

---

## Appearance

The `appearance` property switches between two styles. `soft` (default) uses a tinted background suitable for ongoing notices. `solid` uses a fully saturated colour panel, suitable for high-priority alerts that must dominate the viewport.

```html
<aegov-banner appearance="soft" variant="warning">
  Scheduled maintenance window starts at 22:00 tonight.
</aegov-banner>

<aegov-banner appearance="solid" variant="error">
  Critical: identity verification service outage.
</aegov-banner>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov space-y-3">
  <aegov-banner appearance="soft"  variant="warning" display="sticky" mode="overlay" is-dismissible="false">Soft &mdash; scheduled maintenance window starts at 22:00 tonight.</aegov-banner>
  <aegov-banner appearance="solid" variant="error"   display="sticky" mode="overlay" is-dismissible="false">Solid &mdash; critical: identity verification service outage.</aegov-banner>
</div>

---

## Position

The `position` property pins the banner to the `top` (default) or `bottom` of the viewport. Top is the conventional spot for service-wide notices; bottom is typical for cookie consent and lower-priority informational banners.

```html
<aegov-banner position="top" variant="info">
  We have updated our privacy policy. Read the changes.
</aegov-banner>

<aegov-banner position="bottom" variant="default" is-dismissible="false">
  We use cookies to improve your experience. By continuing you accept our cookie policy.
</aegov-banner>
```

---

## Display strategy

The `display` property selects the CSS positioning mechanism.

- `fixed` (default) — the banner stays glued to the chosen edge regardless of scroll.
- `sticky` — the banner participates in normal page flow until it reaches the chosen edge, then sticks. Useful when you want the banner to scroll away once the user has scrolled past its natural position.

```html
<aegov-banner display="fixed" variant="warning">Always visible.</aegov-banner>
<aegov-banner display="sticky" variant="warning">Sticks once scrolled into place.</aegov-banner>
```

---

## Mode

The `mode` property chooses between two layout strategies:

- `push` (default) — when combined with `display="fixed"`, the banner adds matching padding to `<body>` so the page content is pushed down (or up) and the banner does not cover the page header.
- `overlay` — the banner floats above the page content and emits an `aegovBannerHeightChange` event whenever its height changes. Use this when your application wants to reserve its own space (for example, with a custom layout grid).

```html
<aegov-banner mode="push" position="top" variant="info">
  This banner pushes the page content down.
</aegov-banner>

<aegov-banner mode="overlay" position="top" variant="info" id="floatBanner">
  This banner floats over content; subscribe to height changes for layout sync.
</aegov-banner>

<script>
  document.getElementById('floatBanner')
    .addEventListener('aegovBannerHeightChange', e => {
      document.body.style.setProperty('--banner-height', e.detail + 'px');
    });
</script>
```

---

## Sizes

The `size` property scales font size and vertical padding. Three tokens are available: `sm`, `base` (default), and `lg`. Use `sm` for low-priority notices, `lg` for prominent announcements that need extra breathing room.

```html
<aegov-banner size="sm" variant="info">Small banner</aegov-banner>
<aegov-banner size="base" variant="info">Base banner</aegov-banner>
<aegov-banner size="lg" variant="info">Large banner</aegov-banner>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov space-y-3">
  <aegov-banner variant="info" display="sticky" mode="overlay" size="sm"   is-dismissible="false">Small &mdash; UAE Pass authentication is now available for citizens and residents.</aegov-banner>
  <aegov-banner variant="info" display="sticky" mode="overlay" size="base" is-dismissible="false">Base &mdash; UAE Pass authentication is now available for citizens and residents.</aegov-banner>
  <aegov-banner variant="info" display="sticky" mode="overlay" size="lg"   is-dismissible="false">Large &mdash; UAE Pass authentication is now available for citizens and residents.</aegov-banner>
</div>

### Responsive sizes

`size` accepts a Tailwind-style responsive string with breakpoint prefixes (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`).

```html
<aegov-banner size="sm md:base xl:lg" variant="info">
  Adapts size with the viewport.
</aegov-banner>
```

---

## Actions

The `actions` slot holds buttons aligned to the trailing edge of the banner. When the actions slot has content, the message text aligns to the leading edge instead of being centred. This is the standard pattern for cookie consent or call-to-action banners.

```html
<aegov-banner variant="info" position="bottom" is-dismissible="false">
  We use cookies to improve your experience on the UAE Government services portal.
  <div slot="actions">
    <aegov-button size="sm">Accept all</aegov-button>
    <aegov-button size="sm" appearance="outline">Manage preferences</aegov-button>
  </div>
</aegov-banner>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-banner variant="info" display="sticky" mode="overlay" is-dismissible="false">
    We use cookies to improve your experience on the UAE Government services portal.
    <div slot="actions">
      <aegov-button size="sm">Accept all</aegov-button>
      <aegov-button size="sm" appearance="outline">Manage preferences</aegov-button>
    </div>
  </aegov-banner>
</div>

---

## Dismiss control

By default banners include a close button. Set `is-dismissible="false"` for messages that the user is not allowed to dismiss (legal notices, mandatory cookie consent, ongoing critical alerts).

The close button triggers a 300 ms exit animation; the `aegovBannerDismiss` event fires after the animation completes.

```html
<aegov-banner id="cookieBanner" position="bottom" variant="default" is-dismissible="false">
  Mandatory notice — cannot be dismissed.
</aegov-banner>

<aegov-banner id="alertBanner" variant="warning">
  Dismissible reminder — your residency expires in 14 days.
</aegov-banner>

<script>
  document.getElementById('alertBanner')
    .addEventListener('aegovBannerDismiss', () => {
      console.log('User dismissed the renewal reminder');
    });
</script>
```

---

## Critical alerts (focusable)

For alerts that demand immediate user attention, set `is-focusable="true"`. When the variant resolves to `role="alert"` (i.e. `error` or `success`), the banner is focused on mount so screen reader users hear the announcement and keyboard users can act on it without hunting for it.

Use this sparingly — it interrupts the user's keyboard focus, which is disruptive if used for routine notifications.

```html
<aegov-banner
  variant="error"
  is-focusable="true"
  heading="Service interruption"
>
  The Emirates ID renewal service is temporarily offline. Please try again in 30 minutes.
</aegov-banner>
```

---

## Heading

The `heading` property sets up `aria-labelledby` on the banner. The component derives a heading id of `${fieldId}-heading`. Render the visible heading inside the default slot using the same id so the relationship resolves correctly.

```html
<aegov-banner field-id="maintenance" heading="Maintenance window">
  <strong id="maintenance-heading">Maintenance window</strong>
  Government services will be briefly unavailable on Friday 03:00&ndash;05:00 GST.
</aegov-banner>
```

---

## RTL Support

The banner is direction-agnostic. Internal spacing uses logical properties; the dismiss button and actions slot automatically swap sides under `dir="rtl"`. Pass real Arabic content into the slots and the layout flips correctly.

```html
<div dir="rtl">
  <aegov-banner variant="warning" position="top">
    تذكير: تنتهي صلاحية بطاقة الهوية الإماراتية الخاصة بك خلال 14 يوماً. يُرجى تجديدها قبل 15 مايو لتفادي رسوم التأخير.
    <div slot="actions">
      <aegov-button size="sm">جدّد الآن</aegov-button>
      <aegov-button size="sm" appearance="outline">تذكيري لاحقاً</aegov-button>
    </div>
  </aegov-banner>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-banner variant="warning" display="sticky" mode="overlay">
    تذكير: تنتهي صلاحية بطاقة الهوية الإماراتية الخاصة بك خلال 14 يوماً. يُرجى تجديدها قبل 15 مايو لتفادي رسوم التأخير.
    <div slot="actions">
      <aegov-button size="sm">جدّد الآن</aegov-button>
      <aegov-button size="sm" appearance="outline">تذكيري لاحقاً</aegov-button>
    </div>
  </aegov-banner>
</div>

---

## API Reference

### Properties

| Property        | Attribute        | Description                                                                                  | Type                                                          | Default     |
| --------------- | ---------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ----------- |
| `fieldId`       | `field-id`       | Unique ID for the banner. Auto-generated if not provided.                                    | `string`                                                      | _generated_ |
| `variant`       | `variant`        | Colour scheme and implicit ARIA role.                                                        | `'default' \| 'error' \| 'warning' \| 'success' \| 'info'`    | `'default'` |
| `appearance`    | `appearance`     | Visual style — `soft` (tinted) or `solid` (filled).                                          | `'soft' \| 'solid'`                                           | `'soft'`    |
| `position`      | `position`       | Banner edge of the viewport.                                                                 | `'top' \| 'bottom'`                                           | `'top'`     |
| `display`       | `display`        | CSS positioning strategy.                                                                    | `'fixed' \| 'sticky'`                                         | `'fixed'`   |
| `mode`          | `mode`           | Layout strategy — `push` adds body padding, `overlay` floats and emits height events.        | `'push' \| 'overlay'`                                         | `'push'`    |
| `size`          | `size`           | Size token (`sm`, `base`, `lg`) or responsive string.                                        | `string`                                                      | `'base'`    |
| `isDismissible` | `is-dismissible` | When `true`, renders a close button.                                                         | `boolean`                                                     | `true`      |
| `isFocusable`   | `is-focusable`   | When `true` and the resolved role is `alert`, focuses the banner on mount.                   | `boolean`                                                     | `false`     |
| `heading`       | `heading`        | Heading text used by `aria-labelledby`. Derives id `${fieldId}-heading`.                     | `string`                                                      | `undefined` |

### Slots

| Slot        | Description                                                                  |
| ----------- | ---------------------------------------------------------------------------- |
| _(default)_ | Banner message content.                                                      |
| `actions`   | Action buttons aligned to the trailing edge.                                 |
| `icon`      | Optional custom icon shown next to the content.                              |

### Events

| Event                       | Detail              | Description                                                                       |
| --------------------------- | ------------------- | --------------------------------------------------------------------------------- |
| `aegovBannerDismiss`        | `void`              | Fires after the dismiss animation completes (~300 ms after the user clicks close). |
| `aegovBannerHeightChange`   | `number` (pixels)   | Fires in `mode="overlay"` whenever the banner's height changes.                   |

#### Listening for events

```html
<aegov-banner id="maintenanceBanner" mode="overlay" variant="info">
  Brief maintenance starts in 30 minutes.
</aegov-banner>

<script>
  const banner = document.getElementById('maintenanceBanner');

  banner.addEventListener('aegovBannerDismiss', () => {
    console.log('User dismissed the maintenance banner');
  });

  banner.addEventListener('aegovBannerHeightChange', (e) => {
    document.body.style.setProperty('--banner-height', e.detail + 'px');
  });
</script>
```

### Pass-through Attributes

| Attribute group  | Forwarded? | Notes                                                                                              |
| ---------------- | ---------- | -------------------------------------------------------------------------------------------------- |
| `aria-*`         | Yes        | Forwarded to the banner element.                                                                   |
| `data-*`         | Yes        | Forwarded to the banner element.                                                                   |
| `role`           | Yes        | When set on the host, **overrides** the auto-computed role (e.g. downgrade `alert` to `status`).   |
| `id`             | n/a        | Use `field-id` on the host. The heading id is derived as `${fieldId}-heading`.                     |
| `class`, `style` | Allowed    | Applied to the host element only.                                                                  |

---

## Accessibility

### Built-in behaviour

- The banner auto-computes a `role` based on the variant. `error` and `success` resolve to `role="alert"` (assertive); `info`, `warning`, and `default` resolve to `role="region"` (polite).
- A `role` attribute set on the host **overrides** the auto-computed role, so consumers can downgrade noisy variants to `status` if needed.
- `aria-live` is set automatically based on the resolved role: `alert` → `assertive`; `region`/`status` → `polite`.
- When `heading` is provided, `aria-labelledby` references the derived `${fieldId}-heading` id.
- A built-in variant icon (error / warning / success / info / default) is rendered automatically alongside the text, satisfying WCAG SC 1.4.1 — severity is conveyed by shape and text, not colour alone. Supply a custom `<… slot="icon">` to override the default.
- The icon column is marked `aria-hidden="true"` — the text content inside the default slot is the sole accessible announcement.
- The dismiss button has a minimum touch target of **24 × 24 CSS px** on all sizes (sm, base, lg), satisfying WCAG SC 2.5.8.
- The dismiss button has `aria-label="Close banner"` (`"إغلاق الشريط"` in RTL). Its SVG icon is `aria-hidden="true"`.
- In `display="fixed" mode="push"`, the body padding is adjusted automatically so page content is never hidden under the banner. A `ResizeObserver` keeps the padding in sync as the banner resizes.
- In `mode="overlay"`, the `aegovBannerHeightChange` event is emitted whenever the banner's height changes so consumers can adjust their own layout.

### Developer responsibilities

- Choose the `variant` thoughtfully — `role="alert"` is announced assertively and can interrupt screen reader users. For non-critical content, prefer `info`, `warning`, or `default`.
- The `heading` prop only sets the `aria-labelledby` relationship; the heading content itself is **not** rendered automatically. Render it inside the default slot using the derived id so the relationship resolves.
- Use `is-focusable="true"` only for genuinely critical alerts that warrant interrupting keyboard focus on mount.
- When the banner requires user response (cookie consent, mandatory notice), provide an `actions` slot with clear, well-labelled buttons.
- Body padding is cleared on dismiss and on disconnect; if you remove the banner element through a different mechanism, ensure the padding is also cleared manually.

### Keyboard support

| Key              | Action                                                                          |
| ---------------- | ------------------------------------------------------------------------------- |
| `Tab`            | Move focus into the banner (dismiss button and any controls in the actions slot). |
| `Enter`, `Space` | Activate the focused control.                                                   |
| `Shift + Tab`    | Move focus backwards.                                                           |
