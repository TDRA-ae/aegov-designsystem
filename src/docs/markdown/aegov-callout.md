# aegov-callout

A bordered, attention-drawing block for inline messaging — system notices, validation summaries, contextual help, success confirmations, etc. Each callout has a leading icon, a content area, optional actions, an optional inline link, and an optional dismiss button. Use the `variant` prop to convey severity (info, success, warning, error) and `appearance` to choose between a softer tinted style and a fully solid-coloured style.

## Properties

### variant

Sets the colour scheme and the default leading icon. Defaults to `default` (neutral, no icon glyph).

```html
<aegov-callout variant="info"><p slot="content">Heads up.</p></aegov-callout>
<aegov-callout variant="success"><p slot="content">Saved.</p></aegov-callout>
<aegov-callout variant="warning"><p slot="content">Check your input.</p></aegov-callout>
<aegov-callout variant="error"><p slot="content">Something went wrong.</p></aegov-callout>
```

### appearance

`soft` uses a tinted background with full-saturation text; `solid` uses a fully filled colour panel.

```html
<aegov-callout appearance="soft" variant="info">
  <p slot="content">Soft variant.</p>
</aegov-callout>
<aegov-callout appearance="solid" variant="info">
  <p slot="content">Solid variant.</p>
</aegov-callout>
```

### size

Controls font size, icon size, and padding. Accepts `sm`, `base`, `lg`, or a responsive string.

```html
<aegov-callout size="sm"><p slot="content">Compact callout.</p></aegov-callout>
<aegov-callout size="lg"><p slot="content">Prominent callout.</p></aegov-callout>
```

### is-dismissible

When set, a close button appears on the trailing side. Clicking it emits `aegovCalloutDismiss` and removes the callout from view.

```html
<aegov-callout variant="info" is-dismissible>
  <p slot="content">Tip: you can collapse this notice.</p>
</aegov-callout>
```

### field-id

Unique identifier reflected onto the callout root. Auto-generated as `aegov-callout-{n}` if not provided.

```html
<aegov-callout field-id="onboarding-tip" variant="info">
  <p slot="content">Welcome.</p>
</aegov-callout>
```

## Sizes

`size` accepts a single token or a Tailwind-style responsive string using breakpoint prefixes.

```html
<!-- Static -->
<aegov-callout size="sm"></aegov-callout>
<aegov-callout size="base"></aegov-callout>
<aegov-callout size="lg"></aegov-callout>

<!-- Responsive -->
<aegov-callout size="sm md:base lg:lg"></aegov-callout>
```

| Token   | Text       | Padding       | Icon       |
| ------- | ---------- | ------------- | ---------- |
| `sm`    | `text-sm`  | `px-4 py-3`   | `size-5`   |
| `base`  | `text-base`| `px-5 py-4`   | `size-6`   |
| `lg`    | `text-lg`  | `px-6 py-5`   | `size-7`   |

## Examples

### Inline form validation summary

```html
<aegov-callout variant="error">
  <p slot="content">Please fix the highlighted fields before submitting.</p>
</aegov-callout>
```

### Success confirmation with actions

```html
<aegov-callout variant="success" appearance="soft" is-dismissible>
  <p slot="content">Your application has been received.</p>
  <div slot="actions">
    <aegov-button size="sm">View application</aegov-button>
    <aegov-button size="sm" variant="secondary">Download PDF</aegov-button>
  </div>
</aegov-callout>
```

### Custom icon

```html
<aegov-callout variant="info">
  <svg slot="icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" />
  </svg>
  <p slot="content">Use a custom icon for branded contexts.</p>
</aegov-callout>
```

### Inline link on the trailing side

```html
<aegov-callout variant="info">
  <p slot="content">A new policy is in effect.</p>
  <a slot="link" href="/policies">Learn more</a>
</aegov-callout>
```

## RTL Behavior

The callout uses Tailwind logical utilities. The icon sits at the inline-start edge, content runs in the middle, and the link/dismiss area sits at the inline-end. In `dir="rtl"` containers the icon and dismiss button automatically swap sides — no additional configuration is required.

## API Reference

### Properties

| Property         | Attribute         | Description                                                | Type                                                            | Default     |
| ---------------- | ----------------- | ---------------------------------------------------------- | --------------------------------------------------------------- | ----------- |
| `fieldId`        | `field-id`        | Unique ID for the callout element. Auto-generated if not.  | `string`                                                        | `undefined` |
| `variant`        | `variant`         | Visual variant / severity.                                 | `'default' \| 'error' \| 'warning' \| 'success' \| 'info'`     | `'default'` |
| `appearance`     | `appearance`      | Style treatment.                                           | `'soft' \| 'solid'`                                             | `'soft'`    |
| `size`           | `size`            | Size token or responsive string.                           | `string`                                                        | `'base'`    |
| `isDismissible`  | `is-dismissible`  | Whether to render a dismiss button.                        | `boolean`                                                       | `false`     |

### Pass-through Attributes

`aria-*` and `data-*` attributes set on the host are forwarded to the callout root element.

### Events

| Event                  | Description                                | Detail Type |
| ---------------------- | ------------------------------------------ | ----------- |
| `aegovCalloutDismiss`  | Emitted when the dismiss button is clicked. | `void`      |

#### Listening for events

```html
<aegov-callout id="c1" variant="info" is-dismissible>
  <p slot="content">Notice</p>
</aegov-callout>
<script>
  document.getElementById('c1').addEventListener('aegovCalloutDismiss', () => {
    console.log('User dismissed the callout');
  });
</script>
```

### Slots

| Slot      | Description                                                                    |
| --------- | ------------------------------------------------------------------------------ |
| `icon`    | Custom leading icon. When omitted, a variant-specific default icon is rendered. |
| `content` | The main message content (paragraph, headings, etc).                           |
| `actions` | Action buttons rendered below the content.                                     |
| `link`    | Inline link rendered on the trailing side, before the dismiss button.          |

## Accessibility

### Built-in

- The callout root has `role="alert"`, so assistive technology announces its content as soon as it appears in the DOM.
- The dismiss button is a real `<button type="button">` with `aria-label="Close callout"` and is keyboard-accessible.
- Decorative SVGs (default variant icon, dismiss glyph) are marked `aria-hidden="true"`.

### Developer responsibilities

- Provide content that conveys meaning without relying on colour alone — pair the variant with explicit text.
- Use `variant="error"` only for genuine errors. For non-blocking informational content, prefer `variant="info"` so that screen readers do not over-announce severity.
- If you slot a custom icon, ensure it is marked `aria-hidden="true"` (or has a meaningful `aria-label` if it conveys unique information not present in the text).
- Action buttons inside the `actions` slot must have visible labels and meet contrast requirements against the chosen `appearance`.

### Notes

- `role="alert"` triggers screen-reader announcements only when the callout is added or made visible — re-rendering a hidden callout does not re-announce.
- Calling dismiss removes the callout from the DOM via internal state (`isVisible = false`); to control visibility externally, manage the element directly rather than using `is-dismissible`.
