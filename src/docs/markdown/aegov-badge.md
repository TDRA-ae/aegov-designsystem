# aegov-badge

A small, inline status or tag component. Use badges to label content, indicate counts, mark statuses, or annotate items in lists, headers, or table cells. Supports a wide colour palette, two appearance styles (soft/solid), three sizes, and an optional dismiss control.

## Properties

### appearance

Visual style of the badge. `soft` uses a tinted background with darker text; `solid` uses a fully filled colour.

```html
<aegov-badge appearance="soft" color="primary">Soft</aegov-badge>
<aegov-badge appearance="solid" color="primary">Solid</aegov-badge>
```

### color

Colour token applied to the badge. Defaults to `default`. The full palette includes brand and accent colours.

```html
<aegov-badge color="aered">Error</aegov-badge>
<aegov-badge color="aegreen">Success</aegov-badge>
<aegov-badge color="techblue">Info</aegov-badge>
```

### size

Controls font size, padding, and corner radius. Accepts `sm`, `base`, `lg`, or a responsive string.

```html
<aegov-badge size="sm">Small</aegov-badge>
<aegov-badge size="base">Base</aegov-badge>
<aegov-badge size="lg">Large</aegov-badge>
```

### is-dismissible

When set, renders a close button. Listen for `aegovBadgeDismiss` to handle removal.

```html
<aegov-badge is-dismissible>Removable</aegov-badge>
```

### field-id

Unique identifier reflected onto the inner `<span>`. Auto-generated as `aegov-badge-{n}` if not provided.

```html
<aegov-badge field-id="status-badge">Active</aegov-badge>
```

## Sizes

`size` accepts a single token or a Tailwind-style responsive string using breakpoint prefixes (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`).

```html
<!-- Static -->
<aegov-badge size="sm">Small</aegov-badge>
<aegov-badge size="base">Base</aegov-badge>
<aegov-badge size="lg">Large</aegov-badge>

<!-- Responsive: small on mobile, base from md, large from lg -->
<aegov-badge size="sm md:base lg:lg">Responsive</aegov-badge>
```

| Token | Font   | Padding         | Radius       |
| ----- | ------ | --------------- | ------------ |
| `sm`   | `text-xs` | `py-0.5 px-1.5` | `rounded-sm`  |
| `base` | `text-sm` | `py-0.5 px-1.5` | `rounded-md`  |
| `lg`   | `text-sm` | `py-1 px-2`     | `rounded-md`, `font-medium` |

## Examples

### Status indicator

```html
<aegov-badge color="aegreen" appearance="soft">Active</aegov-badge>
<aegov-badge color="aered" appearance="soft">Inactive</aegov-badge>
<aegov-badge color="camel" appearance="soft">Pending</aegov-badge>
```

### Counters

```html
<aegov-badge color="primary" appearance="solid" size="sm">3</aegov-badge>
<aegov-badge color="aered" appearance="solid" size="sm">12</aegov-badge>
```

### Dismissible tag

```html
<aegov-badge color="techblue" is-dismissible>
  Filter: Region
</aegov-badge>
<script>
  document.querySelector('aegov-badge').addEventListener('aegovBadgeDismiss', () => {
    console.log('Tag removed');
  });
</script>
```

### Inside a list

```html
<ul>
  <li>Service A <aegov-badge color="aegreen">Open</aegov-badge></li>
  <li>Service B <aegov-badge color="camel">Maintenance</aegov-badge></li>
</ul>
```

## RTL Behavior

The badge is a single inline span with logical padding utilities. The dismiss button sits at the inline end of the badge, which automatically flips to the left in `dir="rtl"` containers. No additional configuration is needed for RTL layouts.

## API Reference

### Properties

| Property         | Attribute         | Description                                                       | Type                                                                                                                                            | Default     |
| ---------------- | ----------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `fieldId`        | `field-id`        | Unique ID for the badge element. Auto-generated if not provided.  | `string`                                                                                                                                        | `undefined` |
| `appearance`     | `appearance`      | Visual style of the badge.                                        | `'soft' \| 'solid'`                                                                                                                              | `'soft'`    |
| `color`          | `color`           | Colour token.                                                     | `'default' \| 'primary' \| 'secondary' \| 'aegold' \| 'aered' \| 'aegreen' \| 'aeblack' \| 'techblue' \| 'seablue' \| 'camel' \| 'desert' \| 'fuchsia' \| 'slate' \| 'purple' \| 'pink' \| 'indigo' \| 'lime'` | `'default'` |
| `isDismissible`  | `is-dismissible`  | Whether to render a dismiss button.                               | `boolean`                                                                                                                                       | `false`     |
| `size`           | `size`            | Size token or responsive string.                                  | `string`                                                                                                                                        | `'base'`    |

### Pass-through Attributes

`aria-*` and `data-*` attributes set on the host are forwarded to the inner `<span>`.

### Events

| Event                 | Description                                | Detail Type |
| --------------------- | ------------------------------------------ | ----------- |
| `aegovBadgeDismiss`   | Emitted when the dismiss button is clicked. | `void`      |

#### Listening for events

```html
<aegov-badge id="b1" is-dismissible color="primary">Tag</aegov-badge>
<script>
  document.getElementById('b1').addEventListener('aegovBadgeDismiss', () => {
    document.getElementById('b1').remove();
  });
</script>
```

### Slots

| Slot      | Description                  |
| --------- | ---------------------------- |
| (default) | The badge label / contents.  |

## Accessibility

### Built-in

- The dismiss button is rendered as a real `<button type="button">` and is keyboard-accessible (Enter / Space).
- The dismiss button has `aria-label="Badge dismiss button"` so screen reader users know what it does.
- The dismiss SVG is marked `aria-hidden="true"`.

### Developer responsibilities

- Provide a meaningful text label inside the slot — colour alone is not sufficient to convey meaning.
- If the badge represents live status that changes over time, consider wrapping it (or the surrounding container) in `aria-live="polite"`.
- For badges acting as counters (e.g. unread messages), include a context word or set a more descriptive `aria-label` on the host: `<aegov-badge aria-label="3 unread messages">3</aegov-badge>`.

### Notes

- The dismiss-click handler calls `event.stopPropagation()`, so a parent click handler will not also fire when the badge is dismissed.
- Removing the badge from the DOM after dismiss is the consumer's responsibility — the component does not auto-remove itself.
