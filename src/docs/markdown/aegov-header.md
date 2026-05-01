# aegov-header

Standardized UAE Federal Government website header. Renders the official top bar (English/Arabic prime text, accessibility & language quick links, expandable "Learn more" panel with the UAE national emblem) and a head section with slots for the entity logo and an optional search component. Uses Shadow DOM to fully isolate its styles from the host page.

## Properties

### entityName

Required. The full name of the government entity, shown inside the expanded "Learn more" panel.

```html
<aegov-header entity-name="Ministry of Example" entity-domain="https://example.gov.ae"></aegov-header>
```

### entityDomain

Required. The official `gov.ae` URL of the entity. Shown in the expanded panel and used as the link wrapping the logo slot. If either `entityName` or `entityDomain` is missing the component renders an inline error block instead of the header.

```html
<aegov-header entity-name="MOE" entity-domain="https://moe.gov.ae"></aegov-header>
```

### variant

`ministry` (default) or `authority`. Controls the layout/styling for ministry-level vs authority-level entities.

```html
<aegov-header variant="authority" entity-name="Telecom Authority" entity-domain="https://tdra.gov.ae"></aegov-header>
```

### skipContentContainer

Selector or id (with or without `#`) of the page's main content container. When provided, the component creates a "Skip to content" link in the document body — visible only on focus — to support keyboard users.

```html
<aegov-header
  entity-name="MOE"
  entity-domain="https://moe.gov.ae"
  skip-content-container="#main"
></aegov-header>
<main id="main">…</main>
```

## Examples

### Basic ministry header with logo and search

```html
<aegov-header entity-name="Ministry of Example" entity-domain="https://example.gov.ae">
  <img slot="logo" src="/assets/logo.svg" alt="Ministry logo" />
  <aegov-input slot="search" type="search" placeholder="Search…"></aegov-input>
</aegov-header>
```

### Authority variant with skip link

```html
<aegov-header
  variant="authority"
  entity-name="Telecom & Digital Government Regulatory Authority"
  entity-domain="https://tdra.gov.ae"
  skip-content-container="#main"
>
  <img slot="logo" src="/assets/tdra.svg" alt="TDRA logo" />
</aegov-header>
<main id="main">…</main>
```

## RTL Behavior

The header detects RTL by reading the nearest `[dir]` ancestor or the document root. When `dir="rtl"`, all built-in copy (prime statement, accessibility/language links, official-website paragraph, close button, skip link) automatically swaps to its Arabic translation. Layout flows right-to-left thanks to Tailwind logical properties.

```html
<html dir="rtl">
  <aegov-header
    entity-name="وزارة الموارد البشرية والتوطين"
    entity-domain="https://mohre.gov.ae"
  >
    <img slot="logo" src="/logo.svg" alt="شعار" />
  </aegov-header>
</html>
```

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
|---|---|---|---|---|
| `variant` | `variant` | Header style. | `'ministry' \| 'authority'` | `'ministry'` |
| `entityName` | `entity-name` | Required. Government entity name. | `string` | `undefined` |
| `entityDomain` | `entity-domain` | Required. Entity website URL. | `string` | `undefined` |
| `skipContentContainer` | `skip-content-container` | Optional. Selector for the main content target. Adds a "Skip to content" link to `document.body`. | `string` | `undefined` |

### Pass-through Attributes

This component uses Shadow DOM and does not forward arbitrary attributes. Place attributes directly on the host element only when they target the host itself.

### Events

This component emits no custom events.

### Slots

| Slot | Description |
|---|---|
| `logo` | The entity logo (typically an `<img>` or inline SVG). Wrapped in an anchor pointing to `entityDomain`. |
| `search` | Optional search field shown in the head row on `md` breakpoints and up. |

### Keyboard

- `Escape` (while the "Learn more" panel is open) closes the panel and returns focus to the trigger.
- `Tab` is trapped within the open panel until it is dismissed.

## Accessibility

### Built-in

- The expand/collapse trigger uses `aria-expanded` and `aria-controls`.
- Focus is moved into the expanded panel (close button) on open, and back to the trigger on close.
- An `aria-hidden`-decorated SVG indicates the expand affordance.
- The optional skip link is the first focusable element in the document — essential for keyboard users.
- Built-in copy auto-localizes between English and Arabic based on `dir`.

### Developer responsibilities

- Provide an `alt` for the logo image.
- If you use a search slot, ensure your input has an associated label (e.g. `aria-label="Search"`).
- When using `skipContentContainer`, give the target element a meaningful heading or landmark so the user knows where focus has moved.
- Render only one `aegov-header` per page.

### Notes

- The component is Shadow-DOMed (`shadow: true`); CSS in the host page does not leak in. Use CSS custom properties or `::part` if you need to theme it.
- The component is purely presentational — it does not attempt to fetch any branding from `entityDomain`.
- The "Skip to content" link is appended to `document.body` (not the shadow root) so default browser focus order treats it as the very first focusable element on the page.
