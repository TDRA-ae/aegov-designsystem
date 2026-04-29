# Callout

<p class="text-lg text-aeblack-500 mb-8">A callout is a prominent notification banner used to communicate important messages, feedback, or contextual information. Callouts draw attention to warnings, errors, successes, and general notices within a page.</p>

## Introduction

The `aegov-callout` component displays a coloured notification box with an icon, message content, and optional actions. It supports **5 semantic variants**, **2 appearances** (soft and solid), **3 sizes** (sm, base, lg), named slots for icons, content, links, and actions, and **dismissible** functionality.

```html
<aegov-callout>
  <span slot="content">This is a default callout message.</span>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-callout>
    <span slot="content">This is a default callout message.</span>
  </aegov-callout>
</div>

---

## Variants

The `variant` property controls the colour scheme and the default icon displayed. There are five semantic variants, each conveying a different level of importance.

### Default

A neutral callout using the slate palette — suitable for general-purpose notices.

```html
<aegov-callout variant="default">
  <span slot="content">This is a general information notice.</span>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-callout variant="default">
    <span slot="content">This is a general information notice.</span>
  </aegov-callout>
</div>

### Error

A red callout for critical errors or failures that require immediate attention.

```html
<aegov-callout variant="error">
  <span slot="content">An error occurred while processing your request.</span>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-callout variant="error">
    <span slot="content">An error occurred while processing your request.</span>
  </aegov-callout>
</div>

### Warning

A camel-coloured callout for cautionary messages that the user should be aware of.

```html
<aegov-callout variant="warning">
  <span slot="content">Your session will expire in 5 minutes.</span>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-callout variant="warning">
    <span slot="content">Your session will expire in 5 minutes.</span>
  </aegov-callout>
</div>

### Success

A green callout for positive confirmations and successful operations.

```html
<aegov-callout variant="success">
  <span slot="content">Your changes have been saved successfully.</span>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-callout variant="success">
    <span slot="content">Your changes have been saved successfully.</span>
  </aegov-callout>
</div>

### Info

A blue callout for helpful, non-critical information or tips.

```html
<aegov-callout variant="info">
  <span slot="content">You can update your profile settings at any time.</span>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-callout variant="info">
    <span slot="content">You can update your profile settings at any time.</span>
  </aegov-callout>
</div>

---

## Appearances

The `appearance` property controls the visual intensity. Two appearances are available.

### Soft (default)

A subtle, tinted background with darker text — ideal for inline notifications that should not overwhelm the page.

```html
<aegov-callout variant="info" appearance="soft">
  <span slot="content">Soft appearance — blends with the page.</span>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-3 not-aegov">
  <aegov-callout variant="default" appearance="soft">
    <span slot="content">Default soft callout.</span>
  </aegov-callout>
  <aegov-callout variant="error" appearance="soft">
    <span slot="content">Error soft callout.</span>
  </aegov-callout>
  <aegov-callout variant="warning" appearance="soft">
    <span slot="content">Warning soft callout.</span>
  </aegov-callout>
  <aegov-callout variant="success" appearance="soft">
    <span slot="content">Success soft callout.</span>
  </aegov-callout>
  <aegov-callout variant="info" appearance="soft">
    <span slot="content">Info soft callout.</span>
  </aegov-callout>
</div>

### Solid

A bold, filled background with light text — use for high-emphasis alerts that demand attention.

```html
<aegov-callout variant="error" appearance="solid">
  <span slot="content">Solid appearance — high visual priority.</span>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-3 not-aegov">
  <aegov-callout variant="default" appearance="solid">
    <span slot="content">Default solid callout.</span>
  </aegov-callout>
  <aegov-callout variant="error" appearance="solid">
    <span slot="content">Error solid callout.</span>
  </aegov-callout>
  <aegov-callout variant="warning" appearance="solid">
    <span slot="content">Warning solid callout.</span>
  </aegov-callout>
  <aegov-callout variant="success" appearance="solid">
    <span slot="content">Success solid callout.</span>
  </aegov-callout>
  <aegov-callout variant="info" appearance="solid">
    <span slot="content">Info solid callout.</span>
  </aegov-callout>
</div>

---

## Sizes

The `size` property controls font size, icon size, and padding. Three sizes are available — `sm`, `base` (default), and `lg`.

### Small (`sm`)

14px font, 20px icon, reduced padding.

```html
<aegov-callout size="sm" variant="info">
  <span slot="content">Small callout — compact, less visual weight.</span>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-3 not-aegov">
  <aegov-callout size="sm" variant="default">
    <span slot="content">Small default callout.</span>
  </aegov-callout>
  <aegov-callout size="sm" variant="error">
    <span slot="content">Small error callout.</span>
  </aegov-callout>
  <aegov-callout size="sm" variant="info">
    <span slot="content">Small info callout.</span>
  </aegov-callout>
</div>

### Base (`base`)

16px font, 24px icon, standard padding. This is the default.

```html
<aegov-callout size="base" variant="info">
  <span slot="content">Base callout — default size.</span>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-3 not-aegov">
  <aegov-callout size="base" variant="default">
    <span slot="content">Base default callout.</span>
  </aegov-callout>
  <aegov-callout size="base" variant="error">
    <span slot="content">Base error callout.</span>
  </aegov-callout>
  <aegov-callout size="base" variant="info">
    <span slot="content">Base info callout.</span>
  </aegov-callout>
</div>

### Large (`lg`)

18px font, 28px icon, increased padding.

```html
<aegov-callout size="lg" variant="info">
  <span slot="content">Large callout — more prominent, higher visual weight.</span>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-3 not-aegov">
  <aegov-callout size="lg" variant="default">
    <span slot="content">Large default callout.</span>
  </aegov-callout>
  <aegov-callout size="lg" variant="error">
    <span slot="content">Large error callout.</span>
  </aegov-callout>
  <aegov-callout size="lg" variant="info">
    <span slot="content">Large info callout.</span>
  </aegov-callout>
</div>

> **Note:** The `size` prop does not affect buttons placed in the `actions` slot — control their size directly via the `size` prop on `<aegov-button>`.

### Responsive Size

The `size` prop accepts Tailwind-style responsive prefixes. Write a space-separated string where each token is either a plain value or `breakpoint:value`. The base value (no prefix) applies below the smallest specified breakpoint.

Available breakpoints: `xs` (480px), `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px), `3xl` (1680px).

```html
<aegov-callout size="sm md:base xl:lg" variant="info">
  <span slot="content">Responsive callout — small on mobile, large on desktop.</span>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-callout size="sm md:base xl:lg" variant="info"><span slot="content">Responsive callout — small on mobile, large on desktop.</span></aegov-callout>
</div>

> **Graceful degradation:** Unknown breakpoint names and invalid values are silently ignored. An unrecognised base value falls back to the component default.

---

## Custom Icon

By default, the callout renders a variant-appropriate icon (e.g. an exclamation triangle for warnings, a checkmark circle for success). You can override the default icon by placing your own SVG or image in the `icon` slot.

```html
<aegov-callout variant="info">
  <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="176" y1="24" x2="176" y2="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="80" y1="24" x2="80" y2="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="40" y1="88" x2="216" y2="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="128" cy="132" r="12"/><circle cx="172" cy="132" r="12"/><circle cx="84" cy="172" r="12"/><circle cx="128" cy="172" r="12"/><circle cx="172" cy="172" r="12"/></svg>
  <span slot="content">Callout with a custom icon.</span>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-callout variant="info">
    <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="176" y1="24" x2="176" y2="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="80" y1="24" x2="80" y2="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="40" y1="88" x2="216" y2="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="128" cy="132" r="12"/><circle cx="172" cy="132" r="12"/><circle cx="84" cy="172" r="12"/><circle cx="128" cy="172" r="12"/><circle cx="172" cy="172" r="12"/></svg>
    <span slot="content">Callout with a custom icon.</span>
  </aegov-callout>
</div>

---

## Action Link

Use the `link` slot to place an action link on the right side of the callout. This is useful for linking to more details, documentation, or related pages.

```html
<aegov-callout variant="info">
  <span slot="content">A new version of the API is available.</span>
  <a slot="link" href="#">View changelog</a>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-3 not-aegov">
  <aegov-callout variant="info">
    <span slot="content">A new version of the API is available.</span>
    <a slot="link" href="#">View changelog</a>
  </aegov-callout>
  <aegov-callout variant="warning" appearance="solid">
    <span slot="content">Your subscription is about to expire.</span>
    <a slot="link" href="#">Renew now</a>
  </aegov-callout>
</div>

---

## Actions Slot

Use the `actions` slot to embed buttons or other interactive elements below the callout content. This is ideal for confirmations, undo actions, or multi-step flows. Buttons placed inside the actions slot are automatically styled to match the callout's variant and appearance.

```html
<aegov-callout variant="error">
  <span slot="content">Failed to submit your application. Please review and try again.</span>
  <div slot="actions">
    <aegov-button size="sm">Try Again</aegov-button>
    <aegov-button size="sm" variant="outline">Cancel</aegov-button>
  </div>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-3 not-aegov">
  <aegov-callout variant="error">
    <span slot="content">Failed to submit your application. Please review and try again.</span>
    <div slot="actions">
      <aegov-button size="sm">Try Again</aegov-button>
      <aegov-button size="sm" variant="outline">Cancel</aegov-button>
    </div>
  </aegov-callout>
  <aegov-callout variant="success">
    <span slot="content">Your report has been generated successfully.</span>
    <div slot="actions">
      <aegov-button size="sm">Download</aegov-button>
      <aegov-button size="sm" variant="link">View Online</aegov-button>
    </div>
  </aegov-callout>
</div>

---

## Dismissible

Set the `dismissible` attribute to show a close button. When clicked, the callout hides itself and emits the `aegovCalloutDismiss` event.

```html
<aegov-callout variant="success" dismissible>
  <span slot="content">Your profile has been updated.</span>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-3 not-aegov">
  <aegov-callout variant="default" dismissible>
    <span slot="content">This is a dismissible default callout.</span>
  </aegov-callout>
  <aegov-callout variant="error" dismissible>
    <span slot="content">This is a dismissible error callout.</span>
  </aegov-callout>
  <aegov-callout variant="warning" dismissible>
    <span slot="content">This is a dismissible warning callout.</span>
  </aegov-callout>
  <aegov-callout variant="success" dismissible>
    <span slot="content">This is a dismissible success callout.</span>
  </aegov-callout>
  <aegov-callout variant="info" dismissible>
    <span slot="content">This is a dismissible info callout.</span>
  </aegov-callout>
</div>

### Handling Dismiss Events

```html
<aegov-callout id="my-callout" variant="info" dismissible>
  <span slot="content">Click the close button to dismiss.</span>
</aegov-callout>

<script>
  document.getElementById('my-callout')
    .addEventListener('aegovCalloutDismiss', () => {
      console.log('Callout dismissed');
    });
</script>
```

> **Note:** Unlike the badge component, the callout automatically hides itself when dismissed by setting internal visibility state to `false`. The `aegovCalloutDismiss` event is still emitted so you can run additional logic such as updating application state or logging analytics.

---

## Combined Features

Callouts support combining multiple features together — dismissible with action links, bordered with actions, and so on.

```html
<aegov-callout variant="warning" appearance="soft" bordered dismissible>
  <span slot="content">Your account requires verification before proceeding.</span>
  <a slot="link" href="#">Verify now</a>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-3 not-aegov">
  <aegov-callout variant="warning" appearance="soft" bordered dismissible>
    <span slot="content">Your account requires verification before proceeding.</span>
    <a slot="link" href="#">Verify now</a>
  </aegov-callout>
  <aegov-callout variant="info" appearance="solid" dismissible>
    <span slot="content">Scheduled maintenance will occur on Friday at 22:00 UTC.</span>
    <div slot="actions">
      <aegov-button size="sm">Acknowledge</aegov-button>
      <aegov-button size="sm" variant="link">Learn More</aegov-button>
    </div>
  </aegov-callout>
</div>

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
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-callout variant="default" appearance="soft"><span slot="content">Default soft callout</span></aegov-callout></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-callout variant="default" appearance="solid"><span slot="content">Default solid callout</span></aegov-callout></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>error</code></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-callout variant="error" appearance="soft"><span slot="content">Error soft callout</span></aegov-callout></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-callout variant="error" appearance="solid"><span slot="content">Error solid callout</span></aegov-callout></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>warning</code></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-callout variant="warning" appearance="soft"><span slot="content">Warning soft callout</span></aegov-callout></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-callout variant="warning" appearance="solid"><span slot="content">Warning solid callout</span></aegov-callout></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>success</code></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-callout variant="success" appearance="soft"><span slot="content">Success soft callout</span></aegov-callout></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-callout variant="success" appearance="solid"><span slot="content">Success solid callout</span></aegov-callout></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium"><code>info</code></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-callout variant="info" appearance="soft"><span slot="content">Info soft callout</span></aegov-callout></td>
      <td class="p-3 border border-aeblack-100 not-aegov"><aegov-callout variant="info" appearance="solid"><span slot="content">Info solid callout</span></aegov-callout></td>
    </tr>
  </tbody>
</table>
</div>

---

## API Reference

### Properties

| Property      | Attribute     | Description                                      | Type                                                          | Default     |
|---------------|---------------|--------------------------------------------------|---------------------------------------------------------------|-------------|
| `variant`     | `variant`     | The semantic variant controlling colour scheme   | `'default'` \| `'error'` \| `'warning'` \| `'success'` \| `'info'` | `'default'` |
| `appearance`  | `appearance`  | The visual intensity                             | `'soft'` \| `'solid'`                                         | `'soft'`    |
| `size`        | `size`        | Controls font size, icon size, and padding. Supports responsive strings (e.g. `'sm xl:lg'`). | `'sm'` \| `'base'` \| `'lg'`                                  | `'base'`    |
| `dismissible` | `dismissible` | Shows a close button and enables dismiss         | `boolean`                                                     | `false`     |

### Events

| Event                 | Description                                  | Detail Type |
|-----------------------|----------------------------------------------|-------------|
| `aegovCalloutDismiss` | Emitted when the dismiss button is clicked   | `void`      |

The event is only emitted when `dismissible` is `true`.

#### Listening to Events

```html
<aegov-callout id="alert" variant="warning" dismissible>
  <span slot="content">Session expiring soon.</span>
</aegov-callout>

<script>
  document.getElementById('alert')
    .addEventListener('aegovCalloutDismiss', () => {
      console.log('Callout was dismissed');
    });
</script>
```

### Slots

| Slot        | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| `content`   | The main message text of the callout.                                       |
| `icon`      | Custom icon to replace the default variant icon. Place an SVG or image.     |
| `link`      | An action link displayed on the right side of the callout.                  |
| `actions`   | Buttons or interactive elements displayed below the callout content.        |

### Pass-Through Attributes

The component forwards `id` attributes from the host element to the inner container via a pass-through mechanism. All standard `aria-*` and `data-*` attributes placed on the host element are also forwarded.

```html
<aegov-callout id="main-alert" variant="error">
  <span slot="content">Something went wrong.</span>
</aegov-callout>
```

---

## Accessibility

The `aegov-callout` component is built with accessibility as a first-class concern.

### Built-in Features

- **`role="alert"`** — the callout container uses the `alert` role, which causes screen readers to announce the content immediately when it appears in the DOM.
- **Variant-specific icons** — each variant renders an appropriate SVG icon (error: X circle, warning: triangle, success: checkmark, info: info circle) with `aria-hidden="true"` since they are decorative.
- **Dismiss button `aria-label`** — the close button includes `aria-label="Close callout"` for screen reader identification.
- **Keyboard accessible** — the dismiss button is a native `<button>` element, focusable and activatable with Enter or Space.
- **Focus indicators** — the dismiss button and action links have visible `focus-visible` outlines matching the variant's colour scheme.

### Developer Responsibilities

1. **Provide meaningful content.** The callout should always contain a clear, descriptive message in the `content` slot. Avoid using colour alone to convey meaning — the text should explain the situation.

2. **Action links should be descriptive.** If using the `link` slot, ensure the link text clearly describes the destination or action (e.g. "View changelog" rather than "Click here").

3. **Colour contrast.** All built-in variant and appearance combinations meet WCAG 2.1 AA contrast ratios. If you override colours via CSS, verify that the new colours maintain at least a **4.5:1** contrast ratio for text.

4. **Do not remove focus styles.** The built-in `focus-visible` outlines are essential for keyboard navigation. Avoid overriding them with `outline: none`.

---

## Notes

- The callout renders a `<div>` with `role="alert"` internally. Screen readers will announce new callouts automatically when they are added to the DOM.
- The `dismissible` property both shows a close button and manages internal visibility. When dismissed, the callout sets `isVisible` to `false` and renders nothing. The `aegovCalloutDismiss` event is emitted so you can run cleanup logic.
- The default icon is determined by the `variant` property using the shared `getVariantIcon` utility. To replace it, use the `icon` slot — when content is detected in this slot, the default icon is hidden.
- Buttons placed in the `actions` slot are automatically styled to match the callout's current variant and appearance through CSS descendant selectors targeting `aegov-button` inner elements.
- The `bordered` property adds a 1px border. The border colour is inherited from the variant's colour scheme (e.g. `border-aered-700` for the error variant in soft appearance).
- The host element uses `display: block` with a 16px bottom margin for consistent vertical spacing between stacked callouts.
- The callout uses `@container` queries internally, making it responsive to its own container width.
