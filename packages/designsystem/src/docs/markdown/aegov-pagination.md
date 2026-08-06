# Pagination

<p class="text-lg text-aeblack-500 mb-8">Pagination splits a long list of results across pages and lets the user move between them. It reports the page the user asked for and nothing else — the component holds no data and fetches nothing, so you stay in control of how results load.</p>

## Introduction

Set `pages` to the total and `pageCurrent` to the page being shown. The component works out which page numbers to render and emits `aegovPaginationPageChange` when the user picks one.

```html
<aegov-pagination id="pager" pages="12" page-current="1"></aegov-pagination>

<script type="module">
  const pager = document.querySelector('#pager');

  pager.addEventListener('aegovPaginationPageChange', async (e) => {
    const page = e.detail;
    await loadResults(page);
    pager.pageCurrent = page;        // the component does not assume the load succeeded
  });
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-pagination field-id="pg-intro" pages="12" page-current="1"></aegov-pagination>
</div>

Note that `pageCurrent` is **not** updated for you. The component reports the intent; you update it once your data has actually loaded. That way a failed request leaves the pagination showing the page the user is really on.

---

## Page window

Two properties shape which numbers appear, so a long list stays a single row.

| Property | Controls |
| --- | --- |
| `countSibling` | How many pages to show either side of the current one. |
| `countBoundary` | How many pages to always show at each end. |

```html
<aegov-pagination pages="30" page-current="15" count-sibling="1" count-boundary="1"></aegov-pagination>
<aegov-pagination pages="30" page-current="15" count-sibling="2" count-boundary="1"></aegov-pagination>
<aegov-pagination pages="30" page-current="15" count-sibling="0" count-boundary="2"></aegov-pagination>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-6">
    <div><p class="text-sm text-aeblack-500 mb-2">sibling 1, boundary 1 (defaults)</p><aegov-pagination field-id="pg-w-1" pages="30" page-current="15" count-sibling="1" count-boundary="1"></aegov-pagination></div>
    <div><p class="text-sm text-aeblack-500 mb-2">sibling 2, boundary 1</p><aegov-pagination field-id="pg-w-2" pages="30" page-current="15" count-sibling="2" count-boundary="1"></aegov-pagination></div>
    <div><p class="text-sm text-aeblack-500 mb-2">sibling 0, boundary 2</p><aegov-pagination field-id="pg-w-3" pages="30" page-current="15" count-sibling="0" count-boundary="2"></aegov-pagination></div>
  </div>
</div>

Gaps in the sequence render as an ellipsis. The defaults suit most result lists; raise `countSibling` only when users genuinely jump between nearby pages.

---

## First and last

`isEnabledFirstLast` adds jump-to-first and jump-to-last controls, which is worth having once the total runs into double figures.

```html
<aegov-pagination pages="48" page-current="12" is-enabled-first-last></aegov-pagination>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-6">
    <div><p class="text-sm text-aeblack-500 mb-2">Without first/last</p><aegov-pagination field-id="pg-fl-1" pages="48" page-current="12"></aegov-pagination></div>
    <div><p class="text-sm text-aeblack-500 mb-2">With first/last</p><aegov-pagination field-id="pg-fl-2" pages="48" page-current="12" is-enabled-first-last></aegov-pagination></div>
  </div>
</div>

---

## Variant

| Variant | Renders |
| --- | --- |
| `default` | Numbered pages with previous and next controls. |
| `compact` | Previous and next only, with a position indicator. |

```html
<aegov-pagination variant="default" pages="12" page-current="4"></aegov-pagination>
<aegov-pagination variant="compact" pages="12" page-current="4"></aegov-pagination>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-6">
    <div><p class="text-sm text-aeblack-500 mb-2">default</p><aegov-pagination field-id="pg-v-1" variant="default" pages="12" page-current="4"></aegov-pagination></div>
    <div><p class="text-sm text-aeblack-500 mb-2">compact</p><aegov-pagination field-id="pg-v-2" variant="compact" pages="12" page-current="4"></aegov-pagination></div>
  </div>
</div>

`compact` suits narrow columns and mobile layouts, at the cost of the user not being able to jump. A common pattern is `compact` on small viewports and `default` above, switched from a media query in your own code.

---

## Sizes

Three tokens, and `size` accepts a responsive string.

```html
<aegov-pagination size="sm" pages="8" page-current="3"></aegov-pagination>
<aegov-pagination size="base" pages="8" page-current="3"></aegov-pagination>
<aegov-pagination size="lg" pages="8" page-current="3"></aegov-pagination>
<aegov-pagination size="sm md:base" pages="8" page-current="3"></aegov-pagination>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-6">
    <div><p class="text-sm text-aeblack-500 mb-2">sm</p><aegov-pagination field-id="pg-s-1" size="sm" pages="8" page-current="3"></aegov-pagination></div>
    <div><p class="text-sm text-aeblack-500 mb-2">base</p><aegov-pagination field-id="pg-s-2" size="base" pages="8" page-current="3"></aegov-pagination></div>
    <div><p class="text-sm text-aeblack-500 mb-2">lg</p><aegov-pagination field-id="pg-s-3" size="lg" pages="8" page-current="3"></aegov-pagination></div>
  </div>
</div>

Keep page targets comfortably above the 24 × 24 CSS px minimum of WCAG 2.2 SC 2.5.8 — `sm` is close to the floor, so prefer `base` on touch-first pages.

---

## Disabled

`isDisabled` disables the whole control, which is the right state while results are loading.

```html
<aegov-pagination pages="12" page-current="4" is-disabled></aegov-pagination>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-pagination field-id="pg-dis" pages="12" page-current="4" is-disabled></aegov-pagination>
</div>

The previous control on page 1 and the next control on the last page are disabled automatically — you do not need to manage those.

---

## Custom labels

Four properties override the built-in control labels, which are otherwise supplied and translated by the component.

| Property | Control |
| --- | --- |
| `labelPrev` | Previous page |
| `labelNext` | Next page |
| `labelFirst` | First page |
| `labelLast` | Last page |

```html
<aegov-pagination
  pages="12"
  page-current="4"
  is-enabled-first-last
  label-prev="Previous results"
  label-next="More results"
></aegov-pagination>
```

Only set these when your own wording is genuinely clearer — the defaults are already translated, and overriding them means you own the translation.

---

## Composite example — results list

```html
<div class="flex items-center justify-between mb-4">
  <p id="summary" class="text-sm text-aeblack-500" aria-live="polite">
    Showing 1–10 of 118 service centres
  </p>
</div>

<ul id="results">…</ul>

<div class="mt-6 flex justify-center">
  <aegov-pagination id="pager" pages="12" page-current="1" is-enabled-first-last></aegov-pagination>
</div>

<script type="module">
  const pager = document.querySelector('#pager');
  const summary = document.querySelector('#summary');
  const results = document.querySelector('#results');

  pager.addEventListener('aegovPaginationPageChange', async (page) => {
    pager.isDisabled = true;

    try {
      const { items, total } = await api.serviceCentres({ page: page.detail, perPage: 10 });

      results.replaceChildren(...items.map(renderRow));

      const from = (page.detail - 1) * 10 + 1;
      const to = Math.min(page.detail * 10, total);
      summary.textContent = `Showing ${from}–${to} of ${total} service centres`;

      pager.pageCurrent = page.detail;
      results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch {
      window.aegovToast.show({ message: 'We could not load that page.', variant: 'error' });
    } finally {
      pager.isDisabled = false;
    }
  });
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-lg">
    <p class="text-sm text-aeblack-500 mb-3">Showing 1–3 of 118 service centres</p>
    <ul class="divide-y divide-aeblack-100 mb-6">
      <li class="py-3"><p class="font-medium">Abu Dhabi — Al Bahia</p><p class="text-sm text-aeblack-500">Open until 20:00</p></li>
      <li class="py-3"><p class="font-medium">Dubai — Al Barsha</p><p class="text-sm text-aeblack-500">Open until 22:00</p></li>
      <li class="py-3"><p class="font-medium">Sharjah — Al Majaz</p><p class="text-sm text-aeblack-500">Closed</p></li>
    </ul>
    <div class="flex justify-center">
      <aegov-pagination field-id="pg-cx" pages="12" page-current="1" is-enabled-first-last></aegov-pagination>
    </div>
  </div>
</div>

Two details worth copying: the `aria-live` summary announces the new range after each load, which is the only way a screen reader user learns the page changed; and focus or scroll is moved back to the results, so the user is not left at the bottom of the page.

---

## RTL Support

Pagination is direction-aware. In a `dir="rtl"` container the page numbers run right to left and **the previous and next arrows mirror**, so "next" points left — matching the reading direction. The `<nav>` label and all four control labels are translated automatically.

```html
<div dir="rtl">
  <aegov-pagination pages="12" page-current="4" is-enabled-first-last></aegov-pagination>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-6">
    <aegov-pagination field-id="pg-rtl-1" pages="12" page-current="4" is-enabled-first-last></aegov-pagination>
    <aegov-pagination field-id="pg-rtl-2" variant="compact" pages="12" page-current="4"></aegov-pagination>
  </div>
</div>

Page **numerals** render as Western digits. If your Arabic pages use Arabic-Indic numerals throughout, that inconsistency is visible here and cannot be configured — raise it as a design decision rather than working around it per page.

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the `<nav>`. Auto-generated when omitted, reflected. | `string` | _generated_ |
| `pages` | `pages` | Total number of pages. | `number` | `1` |
| `pageCurrent` | `page-current` | The page currently shown. **You update this**, after your data loads. | `number` | `1` |
| `countSibling` | `count-sibling` | Pages shown either side of the current one. | `number` | `1` |
| `countBoundary` | `count-boundary` | Pages always shown at each end. | `number` | `1` |
| `isEnabledFirstLast` | `is-enabled-first-last` | Adds first and last jump controls. | `boolean` | `false` |
| `variant` | `variant` | Numbered pages, or previous/next only. | `'default' \| 'compact'` | `'default'` |
| `size` | `size` | Size token or responsive string. | `string` — `sm \| base \| lg` | `'base'` |
| `isDisabled` | `is-disabled` | Disables every control. | `boolean` | `false` |
| `labelPrev` | `label-prev` | Overrides the previous-page label. | `string` | `''` |
| `labelNext` | `label-next` | Overrides the next-page label. | `string` | `''` |
| `labelFirst` | `label-first` | Overrides the first-page label. | `string` | `''` |
| `labelLast` | `label-last` | Overrides the last-page label. | `string` | `''` |

### Slots

None. Pagination is driven entirely by properties.

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovPaginationPageChange` | `number` | The user asked for this page. The detail is the page number itself, not an object. |

### Methods

None.

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the `<nav>`. Note the component sets its own `aria-label`. |
| `data-*` | Yes | Forwarded to the `<nav>`. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host element. |

### CSS classes

| Class | Element |
| --- | --- |
| `.aegov-pagination` | The `<nav>`. |
| `.pagination--sm` … `.pagination--lg` | Size modifier. |
| `.pagination--compact` | Added for the compact variant. |
| `.pagination__icon`, `.pagination__icon--dir` | Control icons. Marked `aria-hidden`. |

---

## Accessibility

### Built-in behaviour

- The control is a real `<nav>` with a translated `aria-label`, so it appears as a named landmark.
- Every control has a descriptive, translated accessible name — "Go to first page", "Next page" — rather than relying on an arrow glyph.
- Control icons are marked `aria-hidden="true"`.
- Unavailable controls report `aria-disabled="true"` — previous on page 1, next on the last page — rather than disappearing, so the layout stays stable and the state is announced.
- Directional arrows mirror under `dir="rtl"`.

### Developer responsibilities

- **Announce the change.** The component reports the page but does not announce the new results. Put an `aria-live="polite"` summary near the list — "Showing 11–20 of 118" — or a screen reader user gets no feedback that anything happened.
- **Move focus or scroll back to the results** after a page change. Leaving the user at the bottom of the page with new content above them is disorienting.
- **Update `pageCurrent` yourself**, and only after the data has loaded. That way a failed request does not leave the pagination lying about which page is shown.
- **Disable while loading** and re-enable in a `finally`, so a failure does not leave the control permanently inert.
- **Give the page a meaningful title or URL per page** where possible, so a page of results can be linked and returned to.
- **Prefer `base` size on touch pages**, since `sm` approaches the 24 × 24 minimum target size of WCAG 2.2 SC 2.5.8.
- **Consider whether pagination is right at all.** For a short list, show everything. For a feed, "load more" avoids the problem of a moving window.
- **Own the translation** if you override the label properties.

### Keyboard support

| Key | Action |
| --- | --- |
| `Tab` | Move focus through the controls. |
| `Shift` + `Tab` | Move focus backwards. |
| `Enter`, `Space` | Activate the focused control. |

Arrow keys deliberately do not move between pages — each control is an independent link-like target, and arrow navigation would conflict with scrolling the results.

---

## Where to next

- [Select](aegov-select.html) — for a results-per-page control beside the pagination.
- [Breadcrumbs](aegov-breadcrumbs.html) — hierarchy rather than sequence.
- [Progress](aegov-progress.html) — for reporting a load in progress.
- [Toast](aegov-toast.html) — for reporting a failed page load.
