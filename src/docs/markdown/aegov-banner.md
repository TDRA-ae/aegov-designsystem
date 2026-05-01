# aegov-banner

A page-level notification banner pinned to the top or bottom of the viewport. Use it for system-wide messages such as service outages, scheduled maintenance, cookie consent, regional announcements, or critical alerts that must be visible across all pages. Supports color variants, fixed/sticky positioning, push (reflows page) and overlay (floats over content) modes, and an automatic body-padding adjustment so content doesn't hide behind the banner.

## Properties

### variant

Color scheme. Accepts `default`, `error`, `warning`, `success`, `info`. The `error` and `success` variants automatically apply `role="alert"` for assistive technology.

```html
<aegov-banner variant="info">Maintenance scheduled tonight.</aegov-banner>
<aegov-banner variant="error">Service is currently unavailable.</aegov-banner>
```

### appearance

Visual style. Accepts `soft` (light tint) or `solid` (saturated background).

```html
<aegov-banner appearance="solid" variant="warning">x</aegov-banner>
```

### position

Banner edge. Accepts `top` (default) or `bottom`.

```html
<aegov-banner position="bottom">x</aegov-banner>
```

### display

CSS positioning strategy. Accepts `fixed` (always pinned to viewport) or `sticky` (scrolls with page until reaching the edge, then sticks).

```html
<aegov-banner display="sticky">x</aegov-banner>
```

### mode

Layout strategy. Accepts `push` (banner takes up space; the body is padded so content isn't hidden) or `overlay` (banner floats above content, emitting height changes).

```html
<aegov-banner mode="overlay">x</aegov-banner>
```

### size

Banner size. Accepts `sm`, `base`, or `lg`. Also supports a Tailwind-style responsive string.

```html
<aegov-banner size="sm">x</aegov-banner>
<aegov-banner size="sm md:base lg:lg">x</aegov-banner>
```

### is-dismissible

When `true` (default), renders a close button. When `false`, the banner cannot be closed by the user.

```html
<aegov-banner is-dismissible="false">Permanent notice</aegov-banner>
```

### is-focusable

When `true` and the banner has `role="alert"`, focuses the banner on mount. Use only for critical, immediately-actionable alerts.

```html
<aegov-banner variant="error" is-focusable="true">Critical error</aegov-banner>
```

### heading

Heading text used to set `aria-labelledby`. The component derives a heading id of `${fieldId}-heading` for the relationship.

```html
<aegov-banner heading="Maintenance window">Details about the maintenance...</aegov-banner>
```

### field-id

Unique ID for the banner element. Auto-generated if not provided.

```html
<aegov-banner field-id="cookie-banner">Cookie message...</aegov-banner>
```

## Sizes

`size` accepts a single token or a responsive string using Tailwind-style breakpoint prefixes.

```html
<aegov-banner size="sm"></aegov-banner>
<aegov-banner size="base"></aegov-banner>
<aegov-banner size="lg"></aegov-banner>

<!-- Responsive: small on mobile, large on xl screens -->
<aegov-banner size="sm xl:lg"></aegov-banner>
```

| Token  | Effective class    | Use case                       |
| ------ | ------------------ | ------------------------------ |
| `sm`   | `banner--sm`       | Compact, low-priority messages |
| `base` | `banner--base`     | Default                        |
| `lg`   | `banner--lg`       | High-visibility announcements  |

## Examples

### Cookie consent banner (fixed bottom, push)

```html
<aegov-banner position="bottom" mode="push" variant="info" is-dismissible="false">
  We use cookies to improve your experience.
  <div slot="actions">
    <aegov-button>Accept</aegov-button>
    <aegov-button appearance="outline">Reject</aegov-button>
  </div>
</aegov-banner>
```

### Critical service alert (focusable, top, push)

```html
<aegov-banner variant="error" position="top" mode="push" is-focusable="true" heading="Service unavailable">
  Our services are temporarily unavailable. Try again in a few minutes.
</aegov-banner>
```

### Maintenance notice (sticky, soft)

```html
<aegov-banner display="sticky" variant="warning" appearance="soft">
  Scheduled maintenance tonight from 22:00 to 02:00.
</aegov-banner>
```

### Overlay banner with height change listener

```html
<aegov-banner mode="overlay" id="b1">Floating notice</aegov-banner>
<script>
  document.getElementById('b1').addEventListener('aegovBannerHeightChange', e => {
    document.body.style.setProperty('--banner-height', e.detail + 'px');
  });
</script>
```

## RTL Behavior

The banner uses Tailwind logical properties for spacing internally; the dismiss button placement follows the document direction automatically. The banner spans the full width regardless of direction, and the inner text/actions layout flips correctly under `dir="rtl"`.

## API Reference

### Properties

| Property         | Attribute         | Description                                                                          | Type                                                  | Default     |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------- | ----------- |
| `fieldId`        | `field-id`        | Unique ID for the banner. Auto-generated if not provided.                            | `string`                                              | `undefined` |
| `variant`        | `variant`         | Color scheme.                                                                        | `"default" \| "error" \| "warning" \| "success" \| "info"` | `'default'` |
| `appearance`     | `appearance`      | Visual style.                                                                        | `"solid" \| "soft"`                                   | `'soft'`    |
| `position`       | `position`        | Banner edge.                                                                         | `"top" \| "bottom"`                                   | `'top'`     |
| `display`        | `display`         | CSS positioning.                                                                     | `"fixed" \| "sticky"`                                 | `'fixed'`   |
| `mode`           | `mode`            | Layout strategy.                                                                     | `"push" \| "overlay"`                                 | `'push'`    |
| `isDismissible`  | `is-dismissible`  | Whether the banner can be dismissed.                                                 | `boolean`                                             | `true`      |
| `heading`        | `heading`         | Heading text used by `aria-labelledby`.                                              | `string`                                              | `undefined` |
| `size`           | `size`            | Size token (`sm`, `base`, `lg`) or responsive string.                                | `string`                                              | `'base'`    |
| `isFocusable`    | `is-focusable`    | Auto-focus the banner on mount (use only for `role="alert"` banners).                | `boolean`                                             | `false`     |

### Pass-through Attributes

`aria-*` and `data-*` attributes set on the host pass through to the banner element. The `role` attribute on the host **overrides** the auto-computed role.

### Events

| Event                       | Description                                                          | Detail Type            |
| --------------------------- | -------------------------------------------------------------------- | ---------------------- |
| `aegovBannerDismiss`        | Fires after the dismiss animation completes (~300ms after click).    | `CustomEvent<void>`    |
| `aegovBannerHeightChange`   | Fires in `mode="overlay"` whenever the banner's height changes.      | `CustomEvent<number>`  |

#### Event listening example

```html
<aegov-banner id="b1">Banner</aegov-banner>
<script>
  document.getElementById('b1').addEventListener('aegovBannerDismiss', () => {
    console.log('Banner dismissed');
  });
</script>
```

### Slots

| Slot        | Description                                                              |
| ----------- | ------------------------------------------------------------------------ |
| (default)   | Banner message content.                                                  |
| `actions`   | Action buttons (e.g. "Accept", "Learn more"). Aligned to the trailing edge. |
| `icon`      | Optional custom icon shown next to the content.                          |

## Accessibility

### Built-in

- Auto-computes `role` based on `variant`: `error`/`success` → `alert` (assertive), other variants → `region` (polite).
- A host `role` attribute overrides the auto-computed value so consumers can downgrade noisy variants to `status` if needed.
- Sets `aria-live` based on the resolved role: `alert` → `assertive`, `status`/`region` → `polite`.
- Sets `aria-labelledby` to `${fieldId}-heading` when a `heading` prop is provided.
- The dismiss button has `aria-label="Close banner"` for screen readers.
- In `mode="push"` with `display="fixed"`, the body padding is adjusted automatically so page content isn't hidden under the banner.
- A `ResizeObserver` keeps the body padding (push mode) and emitted height (overlay mode) in sync as the banner resizes.

### Developer responsibilities

- Choose the `variant` thoughtfully — `error` and `success` set `role="alert"` which is assertively announced and can be disruptive. For non-critical updates use `info`/`warning`/`default`.
- Provide a `heading` for `aria-labelledby` when the banner contains substantial content. Note: the `heading` prop only sets the labelledby relationship; the heading content itself is **not** rendered by the component — render it inside the default slot (e.g. inside a `<strong>` or `<aegov-title>`) using the same id (`${fieldId}-heading`).
- Use `is-focusable="true"` only for critical, immediately-actionable alerts that warrant interrupting keyboard focus.
- Provide an action slot when the banner requires user response (e.g. cookie consent).

### Notes

- `display="fixed"` + `mode="push"` automatically adjusts `document.body` padding via inline style. The padding is cleared on dismiss or component disconnect.
- Dismiss is animated (~300ms). The `aegovBannerDismiss` event fires after the animation completes, not at click time.
- Banner is rendered in light DOM (no Shadow DOM), so global styles cascade in.
