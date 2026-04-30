# Banner

<p class="text-lg text-aeblack-500 mb-8">A full-width banner for site-wide announcements, alerts, and notifications. Banners attach to the top or bottom of the viewport and can push page content or float as an overlay.</p>

## Introduction

The `aegov-banner` component displays a prominent, full-width message strip designed for system-level communications such as maintenance notices, cookie consent, promotional announcements, or critical alerts. It supports **5 semantic variants**, **2 appearances** (soft and solid), **2 positions** (top and bottom), **2 display strategies** (fixed and sticky), and **2 layout modes** (push and overlay).

```html
<aegov-banner>This is a default banner notification.</aegov-banner>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-banner display="sticky" position="top" mode="overlay" style="position:relative;">This is a default banner notification.</aegov-banner>
</div>

---

## Variants

The `variant` property controls the colour scheme and semantic meaning of the banner. Five variants are available.

| Variant   | Purpose                                         | Colour   |
|-----------|--------------------------------------------------|----------|
| `default` | General announcements and informational notices. | Slate    |
| `error`   | Critical errors or system failures.              | AERed    |
| `warning` | Cautionary notices that need attention.          | Camel    |
| `success` | Confirmation of completed actions.               | AEGreen  |
| `info`    | Helpful tips or supplementary information.       | TechBlue |

```html
<aegov-banner variant="default">Default: General announcement.</aegov-banner>
<aegov-banner variant="error">Error: System outage detected.</aegov-banner>
<aegov-banner variant="warning">Warning: Scheduled maintenance tonight.</aegov-banner>
<aegov-banner variant="success">Success: Your changes have been saved.</aegov-banner>
<aegov-banner variant="info">Info: A new version is available.</aegov-banner>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-3 not-aegov">
  <aegov-banner variant="default" display="sticky" mode="overlay" style="position:relative;">Default: General announcement.</aegov-banner>
  <aegov-banner variant="error" display="sticky" mode="overlay" style="position:relative;">Error: System outage detected.</aegov-banner>
  <aegov-banner variant="warning" display="sticky" mode="overlay" style="position:relative;">Warning: Scheduled maintenance tonight.</aegov-banner>
  <aegov-banner variant="success" display="sticky" mode="overlay" style="position:relative;">Success: Your changes have been saved.</aegov-banner>
  <aegov-banner variant="info" display="sticky" mode="overlay" style="position:relative;">Info: A new version is available.</aegov-banner>
</div>

---

## Appearances

The `appearance` property controls the visual intensity of the banner. Two appearances are available.

### Soft (default)

A light, tinted background with darker text and a coloured border along the positioned edge. Suitable for non-urgent notices.

```html
<aegov-banner appearance="soft" variant="info">Soft info banner.</aegov-banner>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-3 not-aegov">
  <aegov-banner appearance="soft" variant="default" display="sticky" mode="overlay" style="position:relative;">Soft default banner.</aegov-banner>
  <aegov-banner appearance="soft" variant="error" display="sticky" mode="overlay" style="position:relative;">Soft error banner.</aegov-banner>
  <aegov-banner appearance="soft" variant="warning" display="sticky" mode="overlay" style="position:relative;">Soft warning banner.</aegov-banner>
  <aegov-banner appearance="soft" variant="success" display="sticky" mode="overlay" style="position:relative;">Soft success banner.</aegov-banner>
  <aegov-banner appearance="soft" variant="info" display="sticky" mode="overlay" style="position:relative;">Soft info banner.</aegov-banner>
</div>

### Solid

A bold, filled background with light text. Use for high-emphasis or critical announcements.

```html
<aegov-banner appearance="solid" variant="info">Solid info banner.</aegov-banner>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-3 not-aegov">
  <aegov-banner appearance="solid" variant="default" display="sticky" mode="overlay" style="position:relative;">Solid default banner.</aegov-banner>
  <aegov-banner appearance="solid" variant="error" display="sticky" mode="overlay" style="position:relative;">Solid error banner.</aegov-banner>
  <aegov-banner appearance="solid" variant="warning" display="sticky" mode="overlay" style="position:relative;">Solid warning banner.</aegov-banner>
  <aegov-banner appearance="solid" variant="success" display="sticky" mode="overlay" style="position:relative;">Solid success banner.</aegov-banner>
  <aegov-banner appearance="solid" variant="info" display="sticky" mode="overlay" style="position:relative;">Solid info banner.</aegov-banner>
</div>

---

## Position

The `position` property determines whether the banner attaches to the top or bottom of the viewport.

| Position | Description                                                        |
|----------|--------------------------------------------------------------------|
| `top`    | Default. Banner appears at the top with a bottom border and shadow. |
| `bottom` | Banner appears at the bottom with a top border.                    |

```html
<aegov-banner position="top">Top banner (default).</aegov-banner>
<aegov-banner position="bottom">Bottom banner.</aegov-banner>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-3 not-aegov">
  <aegov-banner position="top" variant="info" display="sticky" mode="overlay" style="position:relative;">Top-positioned banner (border on bottom edge).</aegov-banner>
  <aegov-banner position="bottom" variant="info" display="sticky" mode="overlay" style="position:relative;">Bottom-positioned banner (border on top edge).</aegov-banner>
</div>

---

## Display Strategy

The `display` property controls how the banner is positioned in the CSS layout.

| Display  | Description                                                                    |
|----------|--------------------------------------------------------------------------------|
| `fixed`  | Default. Banner stays fixed in the viewport regardless of scroll position.     |
| `sticky` | Banner scrolls with content until it reaches the viewport edge, then sticks.   |

```html
<aegov-banner display="fixed" position="top">Fixed to viewport top.</aegov-banner>
<aegov-banner display="sticky" position="top">Sticky at top on scroll.</aegov-banner>
```

> **Note:** In the live demos on this page, banners are shown inline (with `style="position:relative"`) so they do not obscure the documentation. In production, `fixed` and `sticky` positioning will anchor the banner to the viewport edge.

---

## Layout Mode

The `mode` property determines how the banner interacts with page content.

| Mode      | Description                                                                                                       |
|-----------|-------------------------------------------------------------------------------------------------------------------|
| `push`    | Default. The banner pushes page content by adding padding to the `<body>`. Only applies when `display="fixed"`.   |
| `overlay` | The banner floats over content. It emits the `aegovBannerHeightChange` event so you can offset content manually.  |

```html
<!-- Push mode: body gets padding-top equal to banner height -->
<aegov-banner mode="push" display="fixed">Push mode banner.</aegov-banner>

<!-- Overlay mode: banner floats, emits height change events -->
<aegov-banner mode="overlay" display="fixed">Overlay mode banner.</aegov-banner>
```

When using **push mode** with `display="fixed"`, the component automatically sets `padding-top` (or `padding-bottom`) on the `<body>` element equal to the banner height. This padding is updated via a `ResizeObserver` whenever the banner resizes and is cleaned up when the banner is dismissed or removed.

When using **overlay mode**, the component emits the `aegovBannerHeightChange` event with the banner height in pixels, allowing you to manually adjust your layout.

---

## Dismissible

By default, the banner includes a dismiss (close) button. Set `dismissible="false"` to remove it. When the dismiss button is clicked, the banner plays a slide-out animation, hides itself, and emits the `aegovBannerDismiss` event.

```html
<!-- Dismissible (default) -->
<aegov-banner>Dismissible banner — click the X to close.</aegov-banner>

<!-- Non-dismissible -->
<aegov-banner is-dismissible="false">This banner cannot be dismissed.</aegov-banner>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-3 not-aegov">
  <aegov-banner variant="info" display="sticky" mode="overlay" style="position:relative;">Dismissible banner — click the X to close.</aegov-banner>
  <aegov-banner variant="warning" is-dismissible="false" display="sticky" mode="overlay" style="position:relative;">This banner cannot be dismissed.</aegov-banner>
</div>

### Handling Dismiss Events

```html
<aegov-banner id="my-banner" variant="info">
  New feature available! Check it out.
</aegov-banner>

<script>
  document.getElementById('my-banner')
    .addEventListener('aegovBannerDismiss', () => {
      console.log('Banner dismissed');
    });
</script>
```

---

## Actions Slot

Use the `actions` named slot to add buttons or links to the banner. When actions are present, the banner text aligns left and the actions appear beside it.

```html
<aegov-banner variant="info" appearance="soft">
  A new version of the portal is available.
  <div slot="actions">
    <button class="btn-solid">Update Now</button>
    <button class="btn-outline">Later</button>
  </div>
</aegov-banner>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-3 not-aegov">
  <aegov-banner variant="info" appearance="soft" display="sticky" mode="overlay" style="position:relative;">
    A new version of the portal is available.
    <div slot="actions">
      <button class="btn-solid">Update Now</button>
      <button class="btn-outline">Later</button>
    </div>
  </aegov-banner>
  <aegov-banner variant="error" appearance="solid" display="sticky" mode="overlay" style="position:relative;">
    Your session is about to expire.
    <div slot="actions">
      <button class="btn-solid">Stay Logged In</button>
    </div>
  </aegov-banner>
  <aegov-banner variant="success" appearance="soft" display="sticky" mode="overlay" style="position:relative;">
    Your profile has been updated successfully.
    <div slot="actions">
      <button class="btn-outline">View Profile</button>
    </div>
  </aegov-banner>
</div>

Action buttons inside the slot are automatically styled to match the banner's variant and appearance. Use the `btn-solid` class for primary actions and `btn-outline` for secondary actions.

---

## Banner Title

The `heading` property provides an accessible label for the banner region. When set, the component adds an `aria-labelledby` attribute pointing to an internal title element.

```html
<aegov-banner heading="System Notice" variant="warning">
  Scheduled maintenance will occur this weekend.
</aegov-banner>
```

---

## Auto Focus

Set the `is-focusable` attribute to move keyboard focus to the banner when it mounts. This is appropriate only for critical alerts that require immediate attention — do not use it for routine announcements.

```html
<aegov-banner variant="error" is-focusable>
  Critical: Payment processing is currently offline.
</aegov-banner>
```

> **Important:** Only use `is-focusable` when the banner has an `alert` role (explicitly set or auto-computed from `variant="error"` or `variant="success"`). Moving focus unexpectedly can disorient users.

---

## ARIA Role

The `role` property overrides the automatically computed ARIA role. By default, the component assigns roles based on the variant:

| Variant              | Auto Role  | aria-live   |
|----------------------|------------|-------------|
| `error`, `success`   | `alert`    | `assertive` |
| All others           | `region`   | `polite`    |

```html
<!-- Override the role to "status" for a non-urgent success message -->
<aegov-banner variant="success" role="status">
  Your preferences have been saved.
</aegov-banner>
```

---

## Complete Variant x Appearance Matrix

The table below shows every combination of variant and appearance for visual QA and design review.

<div class="overflow-x-auto my-6">
<table class="w-full text-sm border-collapse">
  <thead>
    <tr class="bg-aeblack-50">
      <th class="text-left p-3 border border-aeblack-100 font-semibold">Variant</th>
      <th class="p-3 border border-aeblack-100 font-semibold">Soft</th>
      <th class="p-3 border border-aeblack-100 font-semibold">Solid</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>default</code></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-banner variant="default" appearance="soft" is-dismissible="false" display="sticky" mode="overlay" style="position:relative;">Default soft banner</aegov-banner></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-banner variant="default" appearance="solid" is-dismissible="false" display="sticky" mode="overlay" style="position:relative;">Default solid banner</aegov-banner></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>error</code></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-banner variant="error" appearance="soft" is-dismissible="false" display="sticky" mode="overlay" style="position:relative;">Error soft banner</aegov-banner></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-banner variant="error" appearance="solid" is-dismissible="false" display="sticky" mode="overlay" style="position:relative;">Error solid banner</aegov-banner></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>warning</code></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-banner variant="warning" appearance="soft" is-dismissible="false" display="sticky" mode="overlay" style="position:relative;">Warning soft banner</aegov-banner></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-banner variant="warning" appearance="solid" is-dismissible="false" display="sticky" mode="overlay" style="position:relative;">Warning solid banner</aegov-banner></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>success</code></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-banner variant="success" appearance="soft" is-dismissible="false" display="sticky" mode="overlay" style="position:relative;">Success soft banner</aegov-banner></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-banner variant="success" appearance="solid" is-dismissible="false" display="sticky" mode="overlay" style="position:relative;">Success solid banner</aegov-banner></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>info</code></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-banner variant="info" appearance="soft" is-dismissible="false" display="sticky" mode="overlay" style="position:relative;">Info soft banner</aegov-banner></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-banner variant="info" appearance="solid" is-dismissible="false" display="sticky" mode="overlay" style="position:relative;">Info solid banner</aegov-banner></td>
    </tr>
  </tbody>
</table>
</div>

---

## API Reference

### Properties

| Property       | Attribute       | Description                                                              | Type                                                              | Default      |
|----------------|-----------------|--------------------------------------------------------------------------|-------------------------------------------------------------------|--------------|
| `variant`      | `variant`       | The colour scheme / semantic meaning                                     | `'default'` \| `'error'` \| `'warning'` \| `'success'` \| `'info'` | `'default'`  |
| `appearance`   | `appearance`    | The visual intensity                                                     | `'soft'` \| `'solid'`                                             | `'soft'`     |
| `position`     | `position`      | Vertical position in the viewport                                        | `'top'` \| `'bottom'`                                             | `'top'`      |
| `display`      | `display`       | CSS positioning strategy                                                 | `'fixed'` \| `'sticky'`                                           | `'fixed'`    |
| `mode`         | `mode`          | Layout mode — push page content or overlay                               | `'push'` \| `'overlay'`                                           | `'push'`     |
| `dismissible`  | `dismissible`   | Whether the banner can be dismissed                                      | `boolean`                                                         | `true`       |
| pass-through `role`     | `role`     | ARIA role override (auto-computed from variant if omitted)               | `'region'` \| `'alert'` \| `'status'`                             | —            |
| `heading`  | `heading`  | Accessible label for the banner region via `aria-labelledby`             | `string`                                                          | —            |
| `isFocusable`    | `is-focusable`    | Auto-focus banner on mount (critical alerts only)                        | `boolean`                                                         | `false`      |

### Events

| Event                     | Description                                             | Detail Type |
|---------------------------|---------------------------------------------------------|-------------|
| `aegovBannerDismiss`      | Emitted after the dismiss animation completes            | `void`      |
| `aegovBannerHeightChange` | Emitted when banner height changes (overlay mode)        | `number`    |

#### Listening to Events

```html
<aegov-banner id="site-banner" variant="info">
  We use cookies to improve your experience.
</aegov-banner>

<script>
  const banner = document.getElementById('site-banner');

  banner.addEventListener('aegovBannerDismiss', () => {
    console.log('Banner dismissed');
    // Persist the user's choice
    localStorage.setItem('banner-dismissed', 'true');
  });

  banner.addEventListener('aegovBannerHeightChange', (e) => {
    console.log('Banner height:', e.detail, 'px');
  });
</script>
```

### Slots

| Slot        | Description                                              |
|-------------|----------------------------------------------------------|
| (default)   | The main banner content — text, links, or inline HTML.   |
| `actions`   | Action buttons displayed alongside the banner content.   |

### CSS Classes for Action Buttons

When placing buttons inside the `actions` slot, the following utility classes are available for consistent styling:

| Class          | Description                                     |
|----------------|-------------------------------------------------|
| `btn-solid`    | Solid-fill button matching the variant palette.  |
| `btn-outline`  | Outline button matching the variant palette.     |

```html
<aegov-banner variant="info">
  Important update available.
  <div slot="actions">
    <button class="btn-solid">Apply Update</button>
    <button class="btn-outline">Dismiss</button>
  </div>
</aegov-banner>
```

---

## Accessibility

The `aegov-banner` component is built with accessibility as a first-class concern.

### Built-in Features

- **Semantic ARIA role** — the banner is automatically assigned `role="alert"` for error and success variants, and `role="region"` for all others. This can be overridden with the pass-through `role` property.
- **`aria-live`** — automatically set to `"assertive"` for alert roles and `"polite"` for region/status roles, ensuring screen readers announce the banner content at the appropriate priority.
- **`aria-labelledby`** — when `heading` is provided, the banner region is labelled for assistive technology navigation.
- **Dismiss button `aria-label`** — the close button includes `aria-label="Close banner"` for screen reader identification.
- **Keyboard accessible** — the dismiss button is a native `<button>` element, focusable and activatable with Enter or Space.
- **Focus management** — the `isFocusable` property moves focus to the banner on mount for critical alerts.
- **Dismiss animation** — the banner uses a 300ms slide-out animation before hiding, giving users time to perceive the change.

### Developer Responsibilities

1. **Use `isFocusable` sparingly.** Automatically moving focus can disorient users. Only enable it for genuinely critical alerts (e.g. system outages, session expiry).

2. **Provide meaningful content.** If the banner conveys urgency through colour alone (e.g. red for error), ensure the text content also communicates the severity so colour-blind users are not excluded.

3. **Do not stack multiple alert-role banners.** Having multiple `role="alert"` elements announced simultaneously can overwhelm screen reader users. Use a single banner or set less urgent ones to `role="region"`.

4. **Colour contrast.** All built-in variant/appearance combinations meet WCAG 2.1 AA contrast ratios. If you override colours via CSS, verify that contrast is maintained.

---

## Notes

- The banner renders as a `<div>` with the appropriate ARIA role. It uses `display: block` on the host element and spans the full width of the viewport when using `fixed` or `sticky` positioning.
- In **push mode** with `display="fixed"`, the component automatically manages `padding-top` or `padding-bottom` on the `<body>` element. This padding is set via a `ResizeObserver` and cleaned up on dismiss or component removal.
- The dismiss animation lasts **300ms**. The `aegovBannerDismiss` event fires after the animation completes, not when the button is clicked.
- When the banner is dismissed, it renders `null` — it is fully removed from the DOM, not just hidden.
- The `display` property defaults to `"fixed"`. If you want the banner to participate in normal document flow until scrolled, use `display="sticky"`.
- The `mode="push"` option only has an effect when `display="fixed"`. With sticky positioning, the banner naturally takes up space in the document flow.
- Action buttons in the `actions` slot are automatically styled to match the current variant and appearance. Use `btn-solid` and `btn-outline` classes for consistent theming.
- The component uses a `ResizeObserver` to track height changes. This observer is disconnected when the component is removed from the DOM.
- When `variant="error"` or `variant="success"`, the auto-computed role is `alert`. For all other variants, the role defaults to `region`. Override with the pass-through `role` property if needed.
