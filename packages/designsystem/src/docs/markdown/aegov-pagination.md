# Pagination

<p class="text-lg text-aeblack-500 mb-8">Pagination breaks long lists — search results, service tickets, news archives, document libraries — into navigable pages. It gives users a clear sense of how much content is available, where they are in the set, and a quick way to jump backward or forward. The component is fully controlled, so you decide which page is current and update it on every change event.</p>

## Introduction

The `aegov-pagination` component renders a semantic `<nav>` landmark containing the previous/next buttons, the active page, sibling pages around it, boundary pages at each end, and ellipsis tokens in between. It is **controlled** — when the user clicks a page, the component emits `aegovPaginationPageChange` with the new page number, and your application is responsible for updating `pageCurrent` (and loading the data for that page).

```html
<aegov-pagination id="pager" pages="10" page-current="1"></aegov-pagination>

<script>
  const pager = document.getElementById('pager');
  pager.addEventListener('aegovPaginationPageChange', (e) => {
    pager.pageCurrent = e.detail;
    // load data for the new page…
  });
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-pagination id="demo-pager-intro" pages="10" page-current="1"></aegov-pagination>
  <script>
    (function() {
      const p = document.getElementById('demo-pager-intro');
      if (p) p.addEventListener('aegovPaginationPageChange', (e) => { p.pageCurrent = e.detail; });
    })();
  </script>
</div>

---

## Total Pages and Current Page

`pages` is the total number of pages and `page-current` is the active page (1-indexed). Both are required for a useful render. When `pages` is `1`, the component renders only a disabled previous/next pair. When `pages` is `0` or less, nothing is rendered.

```html
<aegov-pagination pages="6" page-current="3"></aegov-pagination>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-pagination id="demo-pager-cur" pages="6" page-current="3"></aegov-pagination>
  <script>
    (function() {
      const p = document.getElementById('demo-pager-cur');
      if (p) p.addEventListener('aegovPaginationPageChange', (e) => { p.pageCurrent = e.detail; });
    })();
  </script>
</div>

---

## First and Last Buttons

Set `is-enabled-first-last="true"` to show explicit "First" and "Last" buttons alongside Previous and Next. Useful for very long lists — service ticket archives or document libraries — where the user wants to jump straight to either end.

```html
<aegov-pagination
  pages="50"
  page-current="12"
  is-enabled-first-last="true"
></aegov-pagination>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-pagination id="demo-pager-fl" pages="50" page-current="12" is-enabled-first-last="true"></aegov-pagination>
  <script>
    (function() {
      const p = document.getElementById('demo-pager-fl');
      if (p) p.addEventListener('aegovPaginationPageChange', (e) => { p.pageCurrent = e.detail; });
    })();
  </script>
</div>

---

## Sibling and Boundary Counts

`count-sibling` controls how many pages appear on each side of the current page. `count-boundary` controls how many pages always remain visible at the start and end of the list. Both default to `1`. Increase them when you have plenty of horizontal space and want users to see more of the surrounding context.

```html
<!-- Default: 1 sibling each side, 1 boundary each end -->
<aegov-pagination pages="50" page-current="20"></aegov-pagination>

<!-- 2 siblings each side -->
<aegov-pagination pages="50" page-current="20" count-sibling="2"></aegov-pagination>

<!-- 2 siblings + 2 boundary pages -->
<aegov-pagination pages="50" page-current="20" count-sibling="2" count-boundary="2"></aegov-pagination>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="text-sm text-aeblack-500 mb-2">Default (1 sibling, 1 boundary):</p>
  <aegov-pagination id="demo-pager-sib1" pages="50" page-current="20"></aegov-pagination>

  <p class="text-sm text-aeblack-500 mt-6 mb-2">2 siblings each side:</p>
  <aegov-pagination id="demo-pager-sib2" pages="50" page-current="20" count-sibling="2"></aegov-pagination>

  <p class="text-sm text-aeblack-500 mt-6 mb-2">2 siblings + 2 boundary pages:</p>
  <aegov-pagination id="demo-pager-sib3" pages="50" page-current="20" count-sibling="2" count-boundary="2"></aegov-pagination>
  <script>
    (function() {
      ['demo-pager-sib1','demo-pager-sib2','demo-pager-sib3'].forEach(id => {
        const p = document.getElementById(id);
        if (p) p.addEventListener('aegovPaginationPageChange', (e) => { p.pageCurrent = e.detail; });
      });
    })();
  </script>
</div>

---

## Compact Variant

The `compact` variant hides individual page numbers and shows only Previous, Next, and a "current page of total" indicator (e.g. "Page 3 of 10"). This is the recommended layout for narrow viewports, sidebars, and any context where horizontal space is limited.

```html
<aegov-pagination variant="compact" pages="20" page-current="3"></aegov-pagination>

<aegov-pagination
  variant="compact"
  pages="20"
  page-current="3"
  is-enabled-first-last="true"
></aegov-pagination>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="text-sm text-aeblack-500 mb-2">Compact:</p>
  <aegov-pagination id="demo-pager-cmp1" variant="compact" pages="20" page-current="3"></aegov-pagination>

  <p class="text-sm text-aeblack-500 mt-6 mb-2">Compact with First/Last:</p>
  <aegov-pagination id="demo-pager-cmp2" variant="compact" pages="20" page-current="3" is-enabled-first-last="true"></aegov-pagination>
  <script>
    (function() {
      ['demo-pager-cmp1','demo-pager-cmp2'].forEach(id => {
        const p = document.getElementById(id);
        if (p) p.addEventListener('aegovPaginationPageChange', (e) => { p.pageCurrent = e.detail; });
      });
    })();
  </script>
</div>

---

## Sizes

The `size` property accepts `sm`, `base` (default), and `lg`. It also accepts a Tailwind-style responsive string with the breakpoint prefixes `xs`, `sm`, `md`, `lg`, `xl`, and `2xl` — for example `"sm md:base lg:lg"` renders small on phones, base from `md` up, and large from `lg` up.

```html
<aegov-pagination size="sm" pages="10" page-current="1"></aegov-pagination>
<aegov-pagination size="base" pages="10" page-current="1"></aegov-pagination>
<aegov-pagination size="lg" pages="10" page-current="1"></aegov-pagination>

<!-- Responsive -->
<aegov-pagination size="sm md:base lg:lg" pages="20" page-current="3"></aegov-pagination>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="text-sm text-aeblack-500 mb-2">Small:</p>
  <aegov-pagination id="demo-pager-sm" size="sm" pages="10" page-current="3"></aegov-pagination>

  <p class="text-sm text-aeblack-500 mt-6 mb-2">Base (default):</p>
  <aegov-pagination id="demo-pager-bs" size="base" pages="10" page-current="3"></aegov-pagination>

  <p class="text-sm text-aeblack-500 mt-6 mb-2">Large:</p>
  <aegov-pagination id="demo-pager-lg" size="lg" pages="10" page-current="3"></aegov-pagination>

  <p class="text-sm text-aeblack-500 mt-6 mb-2">Responsive (<code>sm md:base lg:lg</code>) — resize the viewport:</p>
  <aegov-pagination id="demo-pager-rs" size="sm md:base lg:lg" pages="20" page-current="3"></aegov-pagination>
  <script>
    (function() {
      ['demo-pager-sm','demo-pager-bs','demo-pager-lg','demo-pager-rs'].forEach(id => {
        const p = document.getElementById(id);
        if (p) p.addEventListener('aegovPaginationPageChange', (e) => { p.pageCurrent = e.detail; });
      });
    })();
  </script>
</div>

---

## Disabled State

Set `is-disabled="true"` to disable every interactive button. The current page is still announced for screen readers, but no clicks emit events. Typical use cases include freezing the pager during data loading or after a server error.

```html
<aegov-pagination pages="10" page-current="3" is-disabled="true"></aegov-pagination>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-pagination pages="10" page-current="3" is-disabled="true"></aegov-pagination>
</div>

---

## Custom Labels for Localization

Override the visible button labels with `label-prev`, `label-next`, `label-first`, and `label-last`. The defaults are English (`Previous`, `Next`, `First`, `Last`); supply translated strings for other languages or for service journeys with bespoke wording.

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

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-pagination
    id="demo-pager-loc"
    pages="20"
    page-current="5"
    is-enabled-first-last="true"
    label-prev="السابق"
    label-next="التالي"
    label-first="الأول"
    label-last="الأخير"
  ></aegov-pagination>
  <script>
    (function() {
      const p = document.getElementById('demo-pager-loc');
      if (p) p.addEventListener('aegovPaginationPageChange', (e) => { p.pageCurrent = e.detail; });
    })();
  </script>
</div>

---

## Practical Example: Service Tickets List

This example combines the pager with a simple results region. The change event updates `pageCurrent` and rewrites the visible record range. In a real service this is where you would call your API to fetch the next batch of tickets.

```html
<div id="tickets" class="p-6 border border-aeblack-200 rounded-lg">
  <h3 class="text-lg font-semibold mb-4">My service requests</h3>
  <p class="text-aeblack-500 mb-4">Showing records <span id="tickets-range">1 – 10</span> of 47</p>
  <ul class="text-aeblack-700">
    <li>SR-2026-0001 — Vehicle registration renewal</li>
    <li>SR-2026-0002 — Family residence visa</li>
    <li>SR-2026-0003 — Trade licence amendment</li>
  </ul>
</div>

<div class="mt-4">
  <aegov-pagination
    id="tickets-pager"
    pages="5"
    page-current="1"
    count-sibling="1"
  ></aegov-pagination>
</div>

<script>
  const total = 47;
  const perPage = 10;
  const pager = document.getElementById('tickets-pager');
  const rangeEl = document.getElementById('tickets-range');

  pager.addEventListener('aegovPaginationPageChange', (e) => {
    pager.pageCurrent = e.detail;
    const start = (e.detail - 1) * perPage + 1;
    const end = Math.min(e.detail * perPage, total);
    rangeEl.textContent = `${start} – ${end}`;
  });
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div id="demo-tickets" class="p-6 border border-aeblack-200 rounded-lg bg-whitely-50">
    <h3 class="text-lg font-semibold mb-4">My service requests</h3>
    <p class="text-aeblack-500 mb-4">Showing records <span id="demo-tickets-range">1 – 10</span> of 47</p>
    <ul class="text-aeblack-700 list-disc ml-5">
      <li>SR-2026-0001 — Vehicle registration renewal</li>
      <li>SR-2026-0002 — Family residence visa</li>
      <li>SR-2026-0003 — Trade licence amendment</li>
    </ul>
  </div>
  <div class="mt-4">
    <aegov-pagination id="demo-tickets-pager" pages="5" page-current="1" count-sibling="1"></aegov-pagination>
  </div>
  <script>
    (function() {
      const total = 47;
      const perPage = 10;
      const pager = document.getElementById('demo-tickets-pager');
      const rangeEl = document.getElementById('demo-tickets-range');
      if (!pager || !rangeEl) return;
      pager.addEventListener('aegovPaginationPageChange', (e) => {
        pager.pageCurrent = e.detail;
        const start = (e.detail - 1) * perPage + 1;
        const end = Math.min(e.detail * perPage, total);
        rangeEl.textContent = `${start} – ${end}`;
      });
    })();
  </script>
</div>

---

## RTL Support

The pagination is direction-agnostic. When the document or any ancestor has `dir="rtl"`, the chevron icons in the previous, next, first, and last buttons mirror automatically, and the list visually flows right-to-left. Pair RTL with translated labels for an Arabic-first experience.

```html
<div dir="rtl">
  <aegov-pagination
    pages="12"
    page-current="4"
    is-enabled-first-last="true"
    label-prev="السابق"
    label-next="التالي"
    label-first="الأول"
    label-last="الأخير"
  ></aegov-pagination>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-pagination
    id="demo-pager-rtl"
    pages="12"
    page-current="4"
    is-enabled-first-last="true"
    label-prev="السابق"
    label-next="التالي"
    label-first="الأول"
    label-last="الأخير"
  ></aegov-pagination>
  <script>
    (function() {
      const p = document.getElementById('demo-pager-rtl');
      if (p) p.addEventListener('aegovPaginationPageChange', (e) => { p.pageCurrent = e.detail; });
    })();
  </script>
</div>

The compact variant is especially useful in RTL on mobile sidebars:

```html
<div dir="rtl">
  <aegov-pagination
    variant="compact"
    pages="12"
    page-current="4"
    label-prev="السابق"
    label-next="التالي"
  ></aegov-pagination>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-pagination
    id="demo-pager-rtl-cmp"
    variant="compact"
    pages="12"
    page-current="4"
    label-prev="السابق"
    label-next="التالي"
  ></aegov-pagination>
  <script>
    (function() {
      const p = document.getElementById('demo-pager-rtl-cmp');
      if (p) p.addEventListener('aegovPaginationPageChange', (e) => { p.pageCurrent = e.detail; });
    })();
  </script>
</div>

---

## API Reference

### Properties

| Property              | Attribute                | Description                                                                                          | Type                       | Default     |
| --------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------- | -------------------------- | ----------- |
| `fieldId`             | `field-id`               | DOM `id` for the inner `<nav>` element. Auto-generated as `aegov-pagination-{n}` if omitted.          | `string`                   | _generated_ |
| `pages`               | `pages`                  | Total number of pages (1-indexed). The component renders nothing when `pages <= 0`.                  | `number`                   | `1`         |
| `pageCurrent`         | `page-current`           | Currently active page (1-indexed). Update this in response to every `aegovPaginationPageChange`.     | `number`                   | `1`         |
| `isEnabledFirstLast`  | `is-enabled-first-last`  | Show explicit First and Last buttons alongside Previous and Next.                                    | `boolean`                  | `false`     |
| `countSibling`        | `count-sibling`          | Number of sibling pages shown on each side of the current page.                                      | `number`                   | `1`         |
| `countBoundary`       | `count-boundary`         | Number of pages always visible at each boundary (start and end of the list).                         | `number`                   | `1`         |
| `variant`             | `variant`                | Display variant. `default` shows page numbers; `compact` shows prev/next plus a "current page of total" indicator.     | `'default' \| 'compact'`   | `'default'` |
| `size`                | `size`                   | Size token. Accepts a single value or a Tailwind-style responsive string.                            | `string`                   | `'base'`    |
| `isDisabled`          | `is-disabled`            | Disables every button in the pagination.                                                             | `boolean`                  | `false`     |
| `labelPrev`           | `label-prev`             | Visible label on the Previous button. Defaults to locale string (`'Previous'` / `'السابق'`) when empty. | `string`              | `''`        |
| `labelNext`           | `label-next`             | Visible label on the Next button. Defaults to locale string (`'Next'` / `'التالي'`) when empty.         | `string`              | `''`        |
| `labelFirst`          | `label-first`            | Visible label on the First button. Defaults to locale string (`'First'` / `'الأول'`) when empty.        | `string`              | `''`        |
| `labelLast`           | `label-last`             | Visible label on the Last button. Defaults to locale string (`'Last'` / `'الأخير'`) when empty.         | `string`              | `''`        |

### Slots

This component does not expose any slots — its layout is fully driven by props.

### Events

| Event                         | Detail                | Description                                                                                                  |
| ----------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------ |
| `aegovPaginationPageChange`   | `number`              | Fired when the user clicks any navigation button. The detail is the new 1-indexed page. Update `pageCurrent` in your handler. |

#### Listening for change events

```html
<aegov-pagination id="pager" pages="20" page-current="1"></aegov-pagination>

<script>
  document.querySelector('#pager').addEventListener('aegovPaginationPageChange', (e) => {
    console.log('User selected page', e.detail);
  });
</script>
```

### Pass-through Attributes

| Attribute group | Forwarded to | Notes                                                                                          |
| --------------- | ------------ | ---------------------------------------------------------------------------------------------- |
| `aria-*`        | inner `<nav>`| Useful for adding `aria-label` overrides or describing the pagination's purpose.                |
| `data-*`        | inner `<nav>`| Useful for analytics hooks.                                                                    |
| `class`, `style`| host         | Applied to the host element directly.                                                          |
| `id`            | n/a          | Use `field-id` to set the inner `<nav>` id.                                                    |

---

## Accessibility

### Built-in behaviour

- The component renders as a `<nav>` landmark with `aria-label="Pagination"` (Arabic: "ترقيم الصفحات") so screen readers announce it among site landmarks.
- The active page button has `aria-current="page"` and a descriptive `aria-label` such as `"Page 3, current page"` (Arabic: "الصفحة 3، الصفحة الحالية").
- Previous, Next, First, and Last buttons carry bilingual `aria-label`s automatically — English when the page direction is LTR, Arabic when `dir="rtl"` is detected. No developer translation needed.
- The compact variant renders the position indicator as plain text — "Page 3 of 10" (English) or "الصفحة 3 من 10" (Arabic) — inside a polite `aria-live` region so assistive technology announces the current position whenever the page changes.
- Disabled buttons set both the native `disabled` attribute and `aria-disabled="true"`.
- Ellipsis tokens are decorative — marked `aria-hidden="true"` so they are not announced.

### Developer responsibilities

- Always update `pageCurrent` in response to `aegovPaginationPageChange`. The component is fully controlled — without the update, clicking does nothing.
- After a page change, move keyboard focus to (or scroll to) the updated content region so keyboard users do not lose their place.
- Prefer the `compact` variant on narrow viewports rather than allowing page numbers to wrap.
- For very long lists (>50 pages), enable `is-enabled-first-last` so users can jump to the ends in one click.

### Keyboard support

| Key             | Action                                                   |
| --------------- | -------------------------------------------------------- |
| `Tab`           | Move focus to the next pagination button.                |
| `Shift + Tab`   | Move focus to the previous pagination button.            |
| `Enter`, `Space`| Activate the focused button.                             |
