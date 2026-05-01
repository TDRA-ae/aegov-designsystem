# aegov-pagination

Numbered pagination control for navigating multi-page lists, search results, or tables. Renders a semantic `<nav>` landmark with first / previous / page / next / last buttons, plus ellipsis collapsing for long ranges. The component is **controlled** — the consumer owns `pageCurrent` and updates it in response to each `aegovPaginationPageChange` event.

## Properties

### fieldId

Auto-generated id (`aegov-pagination-{n}`) reflected to the host attribute.

```html
<aegov-pagination field-id="results-pager" pages="20" page-current="1"></aegov-pagination>
```

### pages

Total page count (1-based). Required for the component to render.

```html
<aegov-pagination pages="42" page-current="1"></aegov-pagination>
```

### pageCurrent

Currently active page (1-indexed). Update this on every `aegovPaginationPageChange`.

```html
<aegov-pagination pages="20" page-current="7"></aegov-pagination>
```

### isEnabledFirstLast

Show First and Last navigation buttons in addition to Previous/Next.

```html
<aegov-pagination pages="50" page-current="10" is-enabled-first-last="true"></aegov-pagination>
```

### countSibling

How many sibling pages to show on each side of the current page. Defaults to `1`.

```html
<aegov-pagination pages="50" page-current="20" count-sibling="2"></aegov-pagination>
```

### countBoundary

How many pages to always show at each end of the list. Defaults to `1`.

```html
<aegov-pagination pages="50" page-current="20" count-boundary="2"></aegov-pagination>
```

### variant

`default` shows page numbers and prev/next. `compact` shows only prev/next plus a `current / total` indicator.

```html
<aegov-pagination variant="compact" pages="20" page-current="3"></aegov-pagination>
```

### isDisabled

Disables every button in the pagination. The page count is still announced.

```html
<aegov-pagination pages="10" page-current="3" is-disabled="true"></aegov-pagination>
```

### labelPrev / labelNext / labelFirst / labelLast

Override the visible button labels (defaults: `Previous`, `Next`, `First`, `Last`). Useful for localization.

```html
<aegov-pagination
  pages="20"
  page-current="5"
  is-enabled-first-last="true"
  label-prev="السابق"
  label-next="التالي"
  label-first="الأول"
  label-last="الأخير"
></aegov-pagination>
```

## Sizes

The `size` prop accepts `sm`, `base` (default), `lg` and supports responsive strings (e.g. `"sm md:base"`).

```html
<aegov-pagination size="sm" pages="10" page-current="1"></aegov-pagination>
<aegov-pagination size="base" pages="10" page-current="1"></aegov-pagination>
<aegov-pagination size="lg" pages="10" page-current="1"></aegov-pagination>

<!-- Responsive -->
<aegov-pagination size="sm md:base lg:lg" pages="20" page-current="1"></aegov-pagination>
```

## Examples

### Default with controlled state (HTML)

```html
<aegov-pagination id="pager" pages="20" page-current="1"></aegov-pagination>
<script>
  const pager = document.getElementById('pager');
  pager.addEventListener('aegovPaginationPageChange', (e) => {
    pager.pageCurrent = e.detail;
    // load data for the new page…
  });
</script>
```

### Compact variant for narrow layouts

```html
<aegov-pagination variant="compact" pages="50" page-current="3"></aegov-pagination>
```

### With First / Last buttons

```html
<aegov-pagination
  pages="100"
  page-current="50"
  is-enabled-first-last="true"
  count-sibling="2"
></aegov-pagination>
```

## RTL Behavior

The pagination uses Tailwind logical properties — directional icons (chevrons) flip automatically when the document or an ancestor has `dir="rtl"`. The button order is unchanged in DOM but renders right-to-left visually.

```html
<div dir="rtl">
  <aegov-pagination
    pages="20"
    page-current="3"
    label-prev="السابق"
    label-next="التالي"
  ></aegov-pagination>
</div>
```

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
|---|---|---|---|---|
| `fieldId` | `field-id` | Nav id (auto-generated). | `string` | `aegov-pagination-{n}` |
| `pages` | `pages` | Total page count. | `number` | `1` |
| `pageCurrent` | `page-current` | Currently active page (1-indexed). | `number` | `1` |
| `isEnabledFirstLast` | `is-enabled-first-last` | Show First/Last buttons. | `boolean` | `false` |
| `countSibling` | `count-sibling` | Sibling pages on each side of current. | `number` | `1` |
| `countBoundary` | `count-boundary` | Pages always visible at each end. | `number` | `1` |
| `variant` | `variant` | Display variant. | `'default' \| 'compact'` | `'default'` |
| `size` | `size` | Size token (responsive). | `'sm' \| 'base' \| 'lg'` | `'base'` |
| `isDisabled` | `is-disabled` | Disables all interaction. | `boolean` | `false` |
| `labelPrev` | `label-prev` | Previous button label. | `string` | `'Previous'` |
| `labelNext` | `label-next` | Next button label. | `string` | `'Next'` |
| `labelFirst` | `label-first` | First button label. | `string` | `'First'` |
| `labelLast` | `label-last` | Last button label. | `string` | `'Last'` |

### Pass-through Attributes

All `aria-*` and `data-*` attributes set on the host are forwarded to the inner `<nav>`.

### Events

| Event | Description | Detail |
|---|---|---|
| `aegovPaginationPageChange` | Fired when the user selects a different page. | `number` (the new 1-indexed page) |

### Event listening example

```html
<aegov-pagination id="pager" pages="20" page-current="1"></aegov-pagination>
<script>
  document.getElementById('pager').addEventListener('aegovPaginationPageChange', (e) => {
    console.log('User selected page', e.detail);
  });
</script>
```

### Slots

This component does not expose slots.

## Accessibility

### Built-in

- Wrapping element is a `<nav>` with `aria-label="Pagination"`.
- The active page button has `aria-current="page"` and a descriptive `aria-label` (e.g. `"Page 3, current page"`).
- Previous/Next/First/Last buttons each have explicit `aria-label`s.
- The compact variant exposes the page indicator inside a polite `aria-live` region so AT users hear the change.
- Disabled buttons set both `disabled` and `aria-disabled="true"`.

### Developer responsibilities

- Translate the `labelPrev`, `labelNext`, `labelFirst`, `labelLast` strings when rendering in non-English contexts.
- After a page change, move focus to (or scroll to) the updated content region for keyboard users.
- For very long lists, prefer the `compact` variant on small viewports rather than letting numbers wrap.

### Notes

- The component is fully controlled. If you do not update `pageCurrent` on the change event, the active page does not move.
- Setting `pages="0"` renders nothing.
- Setting `pages="1"` renders only the prev/next shells (both disabled).
