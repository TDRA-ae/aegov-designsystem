# aegov-link

A styled inline anchor component for navigation links and external references. Use it for in-content links that should follow the design system's link colors and transitions, including automatic safe-rel handling for external targets and a custom click event for SPA-style routing.

## Properties

### href (required)

The URL the link points to.

```html
<aegov-link href="https://u.ae">UAE Government</aegov-link>
```

### target

Standard anchor `target` attribute. Accepts `_blank`, `_self`, `_parent`, or `_top`.

```html
<aegov-link href="https://u.ae" target="_blank">Open in new tab</aegov-link>
```

### rel

Standard anchor `rel` attribute. When omitted with `target="_blank"`, the component automatically applies `rel="noopener noreferrer"`.

```html
<aegov-link href="https://example.com" target="_blank" rel="nofollow">External</aegov-link>
```

### field-id

Unique ID for the inner anchor. Auto-generated if not provided.

```html
<aegov-link field-id="contact-link" href="/contact">Contact us</aegov-link>
```

### extra-class

Additional CSS classes merged onto the anchor.

```html
<aegov-link href="/x" extra-class="font-semibold">Bold link</aegov-link>
```

## Examples

### Internal link

```html
<aegov-link href="/services">View services</aegov-link>
```

### External link (auto rel)

```html
<aegov-link href="https://u.ae" target="_blank">UAE Portal</aegov-link>
<!-- Renders: <a target="_blank" rel="noopener noreferrer" ...> -->
```

### Intercept navigation for SPA routing

```html
<aegov-link href="/dashboard" id="spa-link">Dashboard</aegov-link>
<script>
  document.getElementById('spa-link').addEventListener('aegovLinkClick', (e) => {
    e.detail.event.preventDefault();
    router.push(e.detail.href);
  });
</script>
```

### Download link

```html
<aegov-link href="/files/report.pdf" download="report.pdf">
  Download report
</aegov-link>
```

## RTL Behavior

`aegov-link` renders inline content. Direction follows the surrounding `dir` attribute. The component itself contains no directional layout logic, so links flow naturally with the document's reading direction.

## API Reference

### Properties

| Property      | Attribute      | Description                                                                       | Type                                       | Default     |
| ------------- | -------------- | --------------------------------------------------------------------------------- | ------------------------------------------ | ----------- |
| `href`        | `href`         | The URL the link points to. **Required.**                                         | `string`                                   | —           |
| `target`      | `target`       | Anchor target attribute.                                                          | `"_blank" \| "_self" \| "_parent" \| "_top"` | `undefined` |
| `rel`         | `rel`          | Anchor rel attribute. Auto-set to `"noopener noreferrer"` when `target="_blank"` and not provided. | `string`                          | `undefined` |
| `fieldId`     | `field-id`     | Unique ID for the anchor. Auto-generated if not provided.                         | `string`                                   | `undefined` |
| `extraClass`  | `extra-class`  | Additional classes applied to the anchor.                                          | `string`                                   | `undefined` |

### Pass-through Attributes

In addition to `aria-*` and `data-*`, the following attributes are forwarded to the inner `<a>`:

| Attribute        |
| ---------------- |
| `title`          |
| `referrerpolicy` |
| `hreflang`       |
| `rel`            |
| `target`         |
| `download`       |
| `type`           |

### Events

| Event             | Description                                                                                                | Detail Type                                       |
| ----------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `aegovLinkClick`  | Fires when the link is clicked. Call `event.detail.event.preventDefault()` (or the custom event's own `preventDefault()`) to stop default navigation. | `{ href: string; event: MouseEvent }` |

#### Event listening example

```html
<aegov-link href="/page" id="my-link">Open</aegov-link>
<script>
  document.getElementById('my-link').addEventListener('aegovLinkClick', (e) => {
    console.log('Navigating to', e.detail.href);
  });
</script>
```

### Slots

| Slot      | Description           |
| --------- | --------------------- |
| (default) | The link text content |

## Accessibility

### Built-in

- Renders a real `<a>` element so it is keyboard-focusable and recognized by assistive technology as a link.
- Automatically sets `rel="noopener noreferrer"` when `target="_blank"` to prevent reverse-tabnabbing security issues.
- Pass-through attributes allow `aria-label`, `aria-describedby`, `title`, etc. to be forwarded.

### Developer responsibilities

- Provide descriptive link text. Avoid generic text like "click here". The slot content should describe the destination.
- For icon-only links, provide an `aria-label` so screen readers announce the destination.
- Use `target="_blank"` sparingly — opening new tabs unexpectedly is disorienting for many users.

### Notes

- The `aegovLinkClick` event fires before navigation. To intercept SPA navigation, call `preventDefault()` on `event.detail.event` from your handler.
