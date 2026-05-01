# aegov-avatar

A user-avatar component that renders an image when one is available and falls back to slotted content (initials, custom icon) or a default user silhouette when it is not. Supports seven sizes, square or rounded shapes, and an optional status indicator. The companion sub-component `aegov-avatar-group` lays out multiple avatars together with an optional "+N more" indicator.

## Properties

### src

Image URL. When set and the image loads successfully, the avatar shows the image. If the image fails to load, the component automatically falls back to slotted content or the default user icon.

```html
<aegov-avatar src="/photos/jane.jpg" alt="Jane Doe"></aegov-avatar>
```

### alt

Alt text used both as the image's `alt` attribute and as the host's `aria-label`. Always provide this when an image is set.

```html
<aegov-avatar src="/photos/jane.jpg" alt="Jane Doe"></aegov-avatar>
```

### size

Avatar size. Accepts `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, or a Tailwind-style responsive string.

```html
<aegov-avatar size="xs"></aegov-avatar>
<aegov-avatar size="lg"></aegov-avatar>
<aegov-avatar size="3xl"></aegov-avatar>
```

### appearance

Shape of the avatar — `square` (rounded corners) or `rounded` (full circle).

```html
<aegov-avatar appearance="square"></aegov-avatar>
<aegov-avatar appearance="rounded"></aegov-avatar>
```

### status

Status indicator. Accepts `'online'`, `'offline'`, `'away'`, `'unavailable'`, `'busy'`, or boolean (`true` maps to `'online'`, `false` hides the indicator). Defaults to `false`.

```html
<aegov-avatar status="online"></aegov-avatar>
<aegov-avatar status="busy" src="/photos/jane.jpg" alt="Jane"></aegov-avatar>
```

### field-id

Unique identifier reflected onto the inner avatar `<div>`. Auto-generated as `aegov-avatar-{n}` if not provided.

```html
<aegov-avatar field-id="me"></aegov-avatar>
```

## Sizes

`size` accepts a single token or a Tailwind-style responsive string.

```html
<!-- Static -->
<aegov-avatar size="xs"></aegov-avatar>
<aegov-avatar size="sm"></aegov-avatar>
<aegov-avatar size="base"></aegov-avatar>
<aegov-avatar size="lg"></aegov-avatar>
<aegov-avatar size="xl"></aegov-avatar>
<aegov-avatar size="2xl"></aegov-avatar>
<aegov-avatar size="3xl"></aegov-avatar>

<!-- Responsive: small on mobile, larger from md, largest from lg -->
<aegov-avatar size="sm md:base lg:lg"></aegov-avatar>
```

## Examples

### Image avatar

```html
<aegov-avatar src="/photos/jane.jpg" alt="Jane Doe" size="lg"></aegov-avatar>
```

### Initials fallback

```html
<aegov-avatar appearance="rounded">JD</aegov-avatar>
```

### Default silhouette fallback

```html
<aegov-avatar></aegov-avatar>
```

### Avatar with online status

```html
<aegov-avatar
  src="/photos/jane.jpg"
  alt="Jane Doe"
  status="online"
  appearance="rounded"
></aegov-avatar>
```

### Graceful fallback on broken image

```html
<!-- If /missing.jpg fails to load, the slot contents are shown instead -->
<aegov-avatar src="/missing.jpg" alt="Jane Doe">JD</aegov-avatar>
```

## RTL Behavior

The avatar is square/circular and direction-neutral — it renders identically in `dir="ltr"` and `dir="rtl"`. The status indicator's position is fixed relative to the avatar circle, so it stays in place regardless of direction. When used inside `aegov-avatar-group`, the natural source-order layout flips automatically in RTL.

## API Reference

### Properties

| Property       | Attribute     | Description                                                            | Type                                                                            | Default        |
| -------------- | ------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------- |
| `fieldId`      | `field-id`    | Unique ID for the avatar element. Auto-generated if not provided.      | `string`                                                                        | `undefined`    |
| `size`         | `size`        | Avatar size or responsive string.                                      | `string`                                                                        | `'base'`       |
| `appearance`   | `appearance`  | Avatar shape.                                                          | `'square' \| 'rounded'`                                                         | `'square'`     |
| `src`          | `src`         | Image source URL.                                                      | `string`                                                                        | `undefined`    |
| `alt`          | `alt`         | Alternative text for the image (also used as host `aria-label`).       | `string`                                                                        | `undefined`    |
| `status`       | `status`      | Status indicator (string, `true` = online, `false` = hidden).          | `'online' \| 'offline' \| 'away' \| 'unavailable' \| 'busy' \| boolean`         | `false`        |

### Pass-through Attributes

In addition to `aria-*` and `data-*`, the following native `<img>` attributes are forwarded to the inner image element when one is rendered:

| Attribute        | Description                                       |
| ---------------- | ------------------------------------------------- |
| `loading`        | Native lazy-loading hint (`lazy`, `eager`).       |
| `crossorigin`    | CORS settings for the image request.              |
| `referrerpolicy` | Referrer policy for the image request.            |
| `srcset`         | Responsive image sources.                         |
| `alt`            | Image alt text.                                   |
| `src`            | Image source URL.                                 |

### Slots

| Slot      | Description                                                                                  |
| --------- | -------------------------------------------------------------------------------------------- |
| (default) | Fallback content rendered when no `src` is set or when the image fails to load (e.g. initials). |

## Accessibility

### Built-in

- The avatar root has `role="img"` and an `aria-label` derived from `alt` (or the literal string `"User avatar"` when `alt` is missing).
- The image element receives the same `alt` text.
- The status indicator has `aria-label="Status: {status}"` so screen readers announce the user's state.
- Decorative SVG fallback is unlabelled and rendered inside the labelled root; nothing extra is announced.

### Developer responsibilities

- Always provide a meaningful `alt` when the avatar represents a real user. Without `alt`, the host falls back to the generic label `"User avatar"`, which is rarely useful in context.
- Initials inside the default slot are visual only — the `aria-label` on the host is what assistive technology announces. Make sure the `alt` matches the user's name.
- If a status indicator is informational beyond the visual cue, ensure that the surrounding context reflects the same state in text (e.g. "Jane (online)").

### Notes

- When the image errors, `imageError` flips to `true` and the fallback path renders. This prevents broken-image icons from ever showing.
- `status="false"` (default) renders no indicator at all — there is no "no status" dot.

## Sub-component: aegov-avatar-group

A layout wrapper that arranges multiple `aegov-avatar` children and optionally shows a "+N more" indicator. The group enforces a uniform `size` and forces every child avatar to `appearance="rounded"`.

### Properties

| Property     | Attribute     | Description                                                                  | Type                          | Default     |
| ------------ | ------------- | ---------------------------------------------------------------------------- | ----------------------------- | ----------- |
| `variant`    | `variant`     | Layout: `default` (spaced) or `compact` (overlapping).                       | `'default' \| 'compact'`      | `'default'` |
| `size`       | `size`        | Size enforced on all child avatars (any `aegov-avatar` size token).          | `string`                      | `'base'`    |
| `moreCount`  | `more-count`  | When greater than zero, renders a trailing "+N" button.                      | `number`                      | `0`         |
| `moreText`   | `more-text`   | Custom label for the more indicator. Defaults to `"{moreCount}+"`.           | `string`                      | `undefined` |

### Events

| Event                     | Description                                       | Detail Type |
| ------------------------- | ------------------------------------------------- | ----------- |
| `aegovAvatarGroupMore`    | Emitted when the "+N" button is clicked.          | `void`      |

### Example

```html
<aegov-avatar-group variant="compact" size="lg" more-count="3">
  <aegov-avatar src="/p/1.jpg" alt="Ava"></aegov-avatar>
  <aegov-avatar src="/p/2.jpg" alt="Ben"></aegov-avatar>
  <aegov-avatar>JD</aegov-avatar>
</aegov-avatar-group>
<script>
  document.querySelector('aegov-avatar-group').addEventListener('aegovAvatarGroupMore', () => {
    console.log('User wants to see all members');
  });
</script>
```

### Behaviour notes

- The group always renders rounded avatars regardless of each child's `appearance`.
- The `+N` button is keyboard-accessible (`type="button"`) and has `aria-label="Show {N} more users"`.
- The container has `role="group"` and `aria-label="Avatar group"` so screen readers announce the cluster as a single unit.
