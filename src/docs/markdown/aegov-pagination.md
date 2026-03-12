# Pagination

<p class="text-lg text-aeblack-500 mb-8">Pagination lets users navigate through large sets of content split across multiple pages, providing clear page indicators and directional controls.</p>

## Introduction

The `aegov-pagination` component renders a fully accessible page navigation bar with numbered page buttons, ellipsis indicators for large page ranges, and previous/next navigation. It supports a **compact** variant for tight layouts, **three sizes**, customisable sibling and boundary counts, optional first/last buttons, and full RTL support.

The component follows a **controlled** pattern — you must update the `current-page` property in response to the `aegovPaginationPageChange` event.

```html
<aegov-pagination total-pages="10" current-page="1"></aegov-pagination>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-pagination total-pages="10" current-page="1"></aegov-pagination>
</div>

---

## Current Page

The `current-page` property controls which page is highlighted as active. It is **1-indexed**. When a user clicks a page button, the component emits an `aegovPaginationPageChange` event with the new page number — you must update `current-page` in response.

```html
<aegov-pagination total-pages="10" current-page="5"></aegov-pagination>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-pagination total-pages="10" current-page="5"></aegov-pagination>
</div>

---

## Total Pages

The `total-pages` property sets the number of pages available. The component automatically calculates which page numbers and ellipsis tokens to display based on this value combined with `sibling-count` and `boundary-count`.

```html
<aegov-pagination total-pages="5" current-page="3"></aegov-pagination>
<aegov-pagination total-pages="20" current-page="10"></aegov-pagination>
<aegov-pagination total-pages="100" current-page="50"></aegov-pagination>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-4 not-aegov">
  <aegov-pagination total-pages="5" current-page="3"></aegov-pagination>
  <aegov-pagination total-pages="20" current-page="10"></aegov-pagination>
  <aegov-pagination total-pages="100" current-page="50"></aegov-pagination>
</div>

---

## Sibling Count

The `sibling-count` property controls how many page numbers appear on each side of the current page. The default is `1`.

```html
<!-- 1 sibling (default) -->
<aegov-pagination total-pages="20" current-page="10" sibling-count="1"></aegov-pagination>

<!-- 2 siblings -->
<aegov-pagination total-pages="20" current-page="10" sibling-count="2"></aegov-pagination>

<!-- 3 siblings -->
<aegov-pagination total-pages="20" current-page="10" sibling-count="3"></aegov-pagination>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-4 not-aegov">
  <aegov-pagination total-pages="20" current-page="10" sibling-count="1"></aegov-pagination>
  <aegov-pagination total-pages="20" current-page="10" sibling-count="2"></aegov-pagination>
  <aegov-pagination total-pages="20" current-page="10" sibling-count="3"></aegov-pagination>
</div>

---

## Boundary Count

The `boundary-count` property controls how many pages are always visible at the start and end of the range. The default is `1`.

```html
<!-- 1 boundary page (default) -->
<aegov-pagination total-pages="20" current-page="10" boundary-count="1"></aegov-pagination>

<!-- 2 boundary pages -->
<aegov-pagination total-pages="20" current-page="10" boundary-count="2"></aegov-pagination>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-4 not-aegov">
  <aegov-pagination total-pages="20" current-page="10" boundary-count="1"></aegov-pagination>
  <aegov-pagination total-pages="20" current-page="10" boundary-count="2"></aegov-pagination>
</div>

---

## Sizes

The `size` property controls the height, padding, and font size of all pagination buttons.

| Size   | Height | Font Size |
|--------|--------|-----------|
| `sm`   | 32px   | 12px      |
| `base` | 40px   | 14px      |
| `lg`   | 48px   | 16px      |

```html
<aegov-pagination total-pages="10" current-page="3" size="sm"></aegov-pagination>
<aegov-pagination total-pages="10" current-page="3" size="base"></aegov-pagination>
<aegov-pagination total-pages="10" current-page="3" size="lg"></aegov-pagination>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-4 not-aegov">
  <aegov-pagination total-pages="10" current-page="3" size="sm"></aegov-pagination>
  <aegov-pagination total-pages="10" current-page="3" size="base"></aegov-pagination>
  <aegov-pagination total-pages="10" current-page="3" size="lg"></aegov-pagination>
</div>

---

## Compact Variant

Set `variant="compact"` to hide the numbered page buttons and display only the previous/next controls with a page indicator ("3 / 10"). This is useful in tight layouts such as mobile views or table footers.

```html
<aegov-pagination variant="compact" total-pages="10" current-page="3"></aegov-pagination>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-pagination variant="compact" total-pages="10" current-page="3"></aegov-pagination>
</div>

### Compact with First / Last Buttons

```html
<aegov-pagination variant="compact" total-pages="10" current-page="5" show-first-last></aegov-pagination>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-pagination variant="compact" total-pages="10" current-page="5" show-first-last></aegov-pagination>
</div>

### Compact Sizes

```html
<aegov-pagination variant="compact" total-pages="10" current-page="3" size="sm"></aegov-pagination>
<aegov-pagination variant="compact" total-pages="10" current-page="3" size="base"></aegov-pagination>
<aegov-pagination variant="compact" total-pages="10" current-page="3" size="lg"></aegov-pagination>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-4 not-aegov">
  <aegov-pagination variant="compact" total-pages="10" current-page="3" size="sm"></aegov-pagination>
  <aegov-pagination variant="compact" total-pages="10" current-page="3" size="base"></aegov-pagination>
  <aegov-pagination variant="compact" total-pages="10" current-page="3" size="lg"></aegov-pagination>
</div>

---

## First / Last Buttons

Set the `show-first-last` attribute to add "First" and "Last" navigation buttons alongside the previous/next controls. These buttons jump directly to the first or last page.

```html
<aegov-pagination total-pages="20" current-page="10" show-first-last></aegov-pagination>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-pagination total-pages="20" current-page="10" show-first-last></aegov-pagination>
</div>

---

## Custom Labels

The navigation button labels can be customised using the `prev-label`, `next-label`, `first-label`, and `last-label` properties. This is especially useful for localisation.

```html
<aegov-pagination
  total-pages="10"
  current-page="5"
  show-first-last
  first-label="Start"
  prev-label="Back"
  next-label="Forward"
  last-label="End"
></aegov-pagination>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-pagination total-pages="10" current-page="5" show-first-last first-label="Start" prev-label="Back" next-label="Forward" last-label="End"></aegov-pagination>
</div>

---

## Disabled State

Set the `disabled` attribute to prevent all pagination interaction. All buttons become visually muted and unclickable.

```html
<aegov-pagination total-pages="10" current-page="3" disabled></aegov-pagination>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-pagination total-pages="10" current-page="3" disabled></aegov-pagination>
</div>

---

## Events

The `aegovPaginationPageChange` event is emitted whenever the user selects a page. The event `detail` contains the new page number (1-indexed). Because the component is **controlled**, you must update the `current-page` property yourself.

```html
<aegov-pagination id="demo-pagination" total-pages="10" current-page="1"></aegov-pagination>
<p id="demo-output" class="mt-3 text-sm text-aeblack-600">Current page: 1</p>

<script>
  const pag = document.getElementById('demo-pagination');
  const out = document.getElementById('demo-output');
  pag.addEventListener('aegovPaginationPageChange', (e) => {
    pag.currentPage = e.detail;
    out.textContent = 'Current page: ' + e.detail;
  });
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-pagination id="demo-pagination" total-pages="10" current-page="1"></aegov-pagination>
  <p id="demo-output" class="mt-3 text-sm text-aeblack-600">Current page: 1</p>
  <script>
    (function() {
      var pag = document.getElementById('demo-pagination');
      var out = document.getElementById('demo-output');
      pag.addEventListener('aegovPaginationPageChange', function(e) {
        pag.currentPage = e.detail;
        out.textContent = 'Current page: ' + e.detail;
      });
    })();
  </script>
</div>

---

## RTL Support

The component fully supports right-to-left layouts. When the document or a parent element has `dir="rtl"`, the directional icons (previous, next, first, last) automatically mirror horizontally.

```html
<div dir="rtl">
  <aegov-pagination
    total-pages="10"
    current-page="5"
    show-first-last
    prev-label="السابق"
    next-label="التالي"
    first-label="الأول"
    last-label="الأخير"
  ></aegov-pagination>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-pagination total-pages="10" current-page="5" show-first-last prev-label="السابق" next-label="التالي" first-label="الأول" last-label="الأخير"></aegov-pagination>
</div>

No additional configuration is needed — the component reads the inherited `dir` attribute and adjusts automatically.

---

## API Reference

### Properties

| Property         | Attribute          | Description                                                                 | Type                          | Default       |
|------------------|--------------------|-----------------------------------------------------------------------------|-------------------------------|---------------|
| `totalPages`     | `total-pages`      | Total number of pages                                                       | `number`                      | `1`           |
| `currentPage`    | `current-page`     | Currently active page (1-indexed). Must be updated on every page change event | `number`                      | `1`           |
| `variant`        | `variant`          | Display variant                                                             | `'default'` \| `'compact'`   | `'default'`   |
| `size`           | `size`             | Size of the pagination buttons                                              | `'sm'` \| `'base'` \| `'lg'` | `'base'`      |
| `siblingCount`   | `sibling-count`    | Number of sibling pages shown on each side of the current page              | `number`                      | `1`           |
| `boundaryCount`  | `boundary-count`   | Number of pages always visible at each boundary                             | `number`                      | `1`           |
| `showFirstLast`  | `show-first-last`  | Show First and Last navigation buttons                                      | `boolean`                     | `false`        |
| `disabled`       | `disabled`         | Disables all pagination interaction                                         | `boolean`                     | `false`        |
| `prevLabel`      | `prev-label`       | Label for the Previous button                                               | `string`                      | `'Previous'`  |
| `nextLabel`      | `next-label`       | Label for the Next button                                                   | `string`                      | `'Next'`      |
| `firstLabel`     | `first-label`      | Label for the First button (visible when `showFirstLast` is true)           | `string`                      | `'First'`     |
| `lastLabel`      | `last-label`       | Label for the Last button (visible when `showFirstLast` is true)            | `string`                      | `'Last'`      |

### Events

| Event                        | Description                                    | Detail Type |
|------------------------------|------------------------------------------------|-------------|
| `aegovPaginationPageChange`  | Emitted when a page is selected                | `number`    |

The event detail is the new page number (1-indexed). Update `current-page` in response to this event. The event is **not** emitted when the component is `disabled`, when the clicked page equals the current page, or when the page number is out of range.

#### Listening to Events

```html
<aegov-pagination id="my-pag" total-pages="20" current-page="1"></aegov-pagination>

<script>
  const pag = document.getElementById('my-pag');
  pag.addEventListener('aegovPaginationPageChange', (e) => {
    pag.currentPage = e.detail;
    console.log('Page changed to', e.detail);
  });
</script>
```

---

## Accessibility

The `aegov-pagination` component is built with accessibility as a first-class concern. The following features are included out of the box.

### Built-in Features

- **Semantic `<nav>` element** — the pagination is wrapped in a `<nav>` element with `aria-label="Pagination"`, allowing screen readers to identify it as a navigation landmark.
- **Ordered list structure** — page items are rendered inside a `<ul>` / `<li>` structure for proper list semantics.
- **`aria-current="page"`** — automatically set on the active page button so screen readers announce it as the current page.
- **`aria-label` on buttons** — each button has a descriptive label: "Go to page 3", "Go to previous page", "Go to first page", or "Page 5, current page" for the active button.
- **`aria-disabled`** — automatically set to `"true"` on previous/next/first/last buttons when they are at the boundary, and on all buttons when the component is `disabled`.
- **`aria-hidden` icons** — all SVG directional icons are marked `aria-hidden="true"` so they are not announced by screen readers.
- **Compact indicator** — in the compact variant, the page indicator uses `aria-live="polite"` and `aria-atomic="true"` so screen readers announce page changes.
- **Focus indicators** — clearly visible focus rings are applied via `focus-visible` styles.

### Developer Responsibilities

1. **Update `current-page` on events.** The component is controlled — if you do not update the `current-page` property when `aegovPaginationPageChange` fires, the UI will not reflect the user's selection.

2. **Provide context for the pagination.** If the page contains multiple pagination components (e.g. top and bottom of a list), consider adding a more specific `aria-label` to distinguish them.

3. **Colour contrast.** All built-in colour combinations meet WCAG 2.1 AA contrast ratios. If you override styles, verify that the new colours maintain at least a **4.5:1** contrast ratio.

---

## Notes

- The `aegov-pagination` component follows a **controlled pattern**. It does not internally track the current page — you must set `current-page` in response to the `aegovPaginationPageChange` event.
- When `total-pages` is `0` or negative, the component renders nothing.
- When `total-pages` is `1`, only a single page button is shown with navigation buttons disabled.
- The ellipsis indicators (`...`) are non-interactive and are hidden from screen readers with `aria-hidden="true"`.
- The algorithm for computing the page range ensures that boundary pages are always visible and that ellipsis tokens only appear when they would replace at least two page numbers.
- Navigation buttons (previous, next, first, last) are automatically disabled when the user is at the corresponding boundary — for example, the "Previous" button is disabled on page 1.
- Directional icons (chevrons) automatically flip horizontally in RTL layouts using CSS `transform: scaleX(-1)`.
- The `disabled` property disables **all** buttons in the component, including page number buttons and navigation buttons.
