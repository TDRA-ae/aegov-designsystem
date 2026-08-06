# Tabs

<p class="text-lg text-aeblack-500 mb-8">Tabs divide related content into panels and show one at a time. Use them when the content is genuinely parallel — different views of the same record, different sections of a document — and when the user does not need to compare panels side by side. Tabs hide content by design, so anything essential to a task should not be behind one.</p>

## Introduction

Three components work together. `aegov-tabs` owns the active state, `aegov-tab` elements are the triggers, and `aegov-tab-panel` elements hold the content. Triggers go in the `tabs` slot; panels go in the default slot. Each pair is joined by a matching `tab-id`.

```html
<aegov-tabs default-open="overview">
  <aegov-tab slot="tabs" tab-id="overview">Overview</aegov-tab>
  <aegov-tab slot="tabs" tab-id="documents">Documents</aegov-tab>
  <aegov-tab slot="tabs" tab-id="history">History</aegov-tab>

  <aegov-tab-panel tab-id="overview">Application overview content.</aegov-tab-panel>
  <aegov-tab-panel tab-id="documents">Uploaded documents.</aegov-tab-panel>
  <aegov-tab-panel tab-id="history">Status history.</aegov-tab-panel>
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-tabs field-id="tb-intro" default-open="overview">
    <aegov-tab slot="tabs" tab-id="overview">Overview</aegov-tab>
    <aegov-tab slot="tabs" tab-id="documents">Documents</aegov-tab>
    <aegov-tab slot="tabs" tab-id="history">History</aegov-tab>
    <aegov-tab-panel tab-id="overview"><p class="py-4">Application <strong>APP-2026-0041827</strong> for Emirates ID renewal. Submitted 14 March 2026.</p></aegov-tab-panel>
    <aegov-tab-panel tab-id="documents"><p class="py-4">Passport copy, Emirates ID copy and tenancy contract uploaded.</p></aegov-tab-panel>
    <aegov-tab-panel tab-id="history"><p class="py-4">Submitted → Under review → Awaiting documents.</p></aegov-tab-panel>
  </aegov-tabs>
</div>

`tabId` is **required** on both `aegov-tab` and `aegov-tab-panel`. In Angular it must be written camelCase or you get `NG8008` — see [Using with Angular](using-with-angular.html).

The parent cascades `variant`, `size` and `orientation` to its children, so set them once on `aegov-tabs`.

---

## Variants

```html
<aegov-tabs variant="simple">…</aegov-tabs>
<aegov-tabs variant="segmented">…</aegov-tabs>
<aegov-tabs variant="pill">…</aegov-tabs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-10">
    <div>
      <p class="text-sm text-aeblack-500 mb-2">simple (default) — underlined</p>
      <aegov-tabs field-id="tb-v1" variant="simple" default-open="a">
        <aegov-tab slot="tabs" tab-id="a">Overview</aegov-tab>
        <aegov-tab slot="tabs" tab-id="b">Documents</aegov-tab>
        <aegov-tab-panel tab-id="a"><p class="py-3">Overview panel.</p></aegov-tab-panel>
        <aegov-tab-panel tab-id="b"><p class="py-3">Documents panel.</p></aegov-tab-panel>
      </aegov-tabs>
    </div>
    <div>
      <p class="text-sm text-aeblack-500 mb-2">segmented — joined control</p>
      <aegov-tabs field-id="tb-v2" variant="segmented" default-open="a">
        <aegov-tab slot="tabs" tab-id="a">Overview</aegov-tab>
        <aegov-tab slot="tabs" tab-id="b">Documents</aegov-tab>
        <aegov-tab-panel tab-id="a"><p class="py-3">Overview panel.</p></aegov-tab-panel>
        <aegov-tab-panel tab-id="b"><p class="py-3">Documents panel.</p></aegov-tab-panel>
      </aegov-tabs>
    </div>
    <div>
      <p class="text-sm text-aeblack-500 mb-2">pill — filled active state</p>
      <aegov-tabs field-id="tb-v3" variant="pill" default-open="a">
        <aegov-tab slot="tabs" tab-id="a">Overview</aegov-tab>
        <aegov-tab slot="tabs" tab-id="b">Documents</aegov-tab>
        <aegov-tab-panel tab-id="a"><p class="py-3">Overview panel.</p></aegov-tab-panel>
        <aegov-tab-panel tab-id="b"><p class="py-3">Documents panel.</p></aegov-tab-panel>
      </aegov-tabs>
    </div>
  </div>
</div>

`simple` is the default and the most conventional. `segmented` reads as a single control and suits switching a view. `pill` is the loudest — use it where the tab strip needs to stand apart from surrounding content.

---

## Default active tab

`defaultOpen` takes the `tab-id` of the tab to open initially. Without it, the first tab is used.

```html
<aegov-tabs default-open="documents">…</aegov-tabs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-tabs field-id="tb-def" default-open="documents">
    <aegov-tab slot="tabs" tab-id="overview">Overview</aegov-tab>
    <aegov-tab slot="tabs" tab-id="documents">Documents</aegov-tab>
    <aegov-tab slot="tabs" tab-id="history">History</aegov-tab>
    <aegov-tab-panel tab-id="overview"><p class="py-3">Overview panel.</p></aegov-tab-panel>
    <aegov-tab-panel tab-id="documents"><p class="py-3">Documents panel — opened by default.</p></aegov-tab-panel>
    <aegov-tab-panel tab-id="history"><p class="py-3">History panel.</p></aegov-tab-panel>
  </aegov-tabs>
</div>

---

## Orientation

```html
<aegov-tabs orientation="horizontal">…</aegov-tabs>
<aegov-tabs orientation="vertical">…</aegov-tabs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-tabs field-id="tb-vert" orientation="vertical" default-open="personal">
    <aegov-tab slot="tabs" tab-id="personal">Personal details</aegov-tab>
    <aegov-tab slot="tabs" tab-id="contact">Contact</aegov-tab>
    <aegov-tab slot="tabs" tab-id="documents">Documents</aegov-tab>
    <aegov-tab slot="tabs" tab-id="payment">Payment</aegov-tab>
    <aegov-tab-panel tab-id="personal"><p class="p-4">Personal details panel.</p></aegov-tab-panel>
    <aegov-tab-panel tab-id="contact"><p class="p-4">Contact panel.</p></aegov-tab-panel>
    <aegov-tab-panel tab-id="documents"><p class="p-4">Documents panel.</p></aegov-tab-panel>
    <aegov-tab-panel tab-id="payment"><p class="p-4">Payment panel.</p></aegov-tab-panel>
  </aegov-tabs>
</div>

Vertical tabs suit longer labels and settings-style layouts. The orientation is reported through `aria-orientation`, which changes which arrow keys move between tabs — see [Keyboard support](#keyboard-support).

---

## Sizes

```html
<aegov-tabs size="sm">…</aegov-tabs>
<aegov-tabs size="base">…</aegov-tabs>
<aegov-tabs size="lg">…</aegov-tabs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-8">
    <aegov-tabs field-id="tb-s1" size="sm" default-open="a"><aegov-tab slot="tabs" tab-id="a">Small</aegov-tab><aegov-tab slot="tabs" tab-id="b">Second</aegov-tab><aegov-tab-panel tab-id="a"><p class="py-2 text-sm">Small tabs.</p></aegov-tab-panel><aegov-tab-panel tab-id="b"><p class="py-2 text-sm">Second.</p></aegov-tab-panel></aegov-tabs>
    <aegov-tabs field-id="tb-s2" size="base" default-open="a"><aegov-tab slot="tabs" tab-id="a">Base</aegov-tab><aegov-tab slot="tabs" tab-id="b">Second</aegov-tab><aegov-tab-panel tab-id="a"><p class="py-2">Base tabs.</p></aegov-tab-panel><aegov-tab-panel tab-id="b"><p class="py-2">Second.</p></aegov-tab-panel></aegov-tabs>
    <aegov-tabs field-id="tb-s3" size="lg" default-open="a"><aegov-tab slot="tabs" tab-id="a">Large</aegov-tab><aegov-tab slot="tabs" tab-id="b">Second</aegov-tab><aegov-tab-panel tab-id="a"><p class="py-2">Large tabs.</p></aegov-tab-panel><aegov-tab-panel tab-id="b"><p class="py-2">Second.</p></aegov-tab-panel></aegov-tabs>
  </div>
</div>

### Responsive sizes

`size` accepts a responsive string with the prefixes `xs`, `sm`, `md`, `lg`, `xl` and `2xl`.

```html
<aegov-tabs size="sm md:base lg:lg">…</aegov-tabs>
```

---

## Stretchable and scrollable

Two properties for fitting the tab strip to its container.

| Property | Effect |
| --- | --- |
| `isStretchable` | Tabs share the full width equally. |
| `isScrollable` | The strip scrolls horizontally instead of wrapping. |

```html
<aegov-tabs is-stretchable>…</aegov-tabs>
<aegov-tabs is-scrollable>…</aegov-tabs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-10">
    <div>
      <p class="text-sm text-aeblack-500 mb-2">is-stretchable</p>
      <aegov-tabs field-id="tb-str" is-stretchable variant="segmented" default-open="a">
        <aegov-tab slot="tabs" tab-id="a">Day</aegov-tab>
        <aegov-tab slot="tabs" tab-id="b">Week</aegov-tab>
        <aegov-tab slot="tabs" tab-id="c">Month</aegov-tab>
        <aegov-tab-panel tab-id="a"><p class="py-3">Day view.</p></aegov-tab-panel>
        <aegov-tab-panel tab-id="b"><p class="py-3">Week view.</p></aegov-tab-panel>
        <aegov-tab-panel tab-id="c"><p class="py-3">Month view.</p></aegov-tab-panel>
      </aegov-tabs>
    </div>
    <div>
      <p class="text-sm text-aeblack-500 mb-2">is-scrollable</p>
      <aegov-tabs field-id="tb-scr" is-scrollable default-open="a">
        <aegov-tab slot="tabs" tab-id="a">Personal details</aegov-tab>
        <aegov-tab slot="tabs" tab-id="b">Contact information</aegov-tab>
        <aegov-tab slot="tabs" tab-id="c">Supporting documents</aegov-tab>
        <aegov-tab slot="tabs" tab-id="d">Payment and fees</aegov-tab>
        <aegov-tab slot="tabs" tab-id="e">Status history</aegov-tab>
        <aegov-tab-panel tab-id="a"><p class="py-3">Personal details.</p></aegov-tab-panel>
        <aegov-tab-panel tab-id="b"><p class="py-3">Contact information.</p></aegov-tab-panel>
        <aegov-tab-panel tab-id="c"><p class="py-3">Supporting documents.</p></aegov-tab-panel>
        <aegov-tab-panel tab-id="d"><p class="py-3">Payment and fees.</p></aegov-tab-panel>
        <aegov-tab-panel tab-id="e"><p class="py-3">Status history.</p></aegov-tab-panel>
      </aegov-tabs>
    </div>
  </div>
</div>

`isScrollable` keeps the strip on one line, but tabs scrolled out of view are easy to miss. Beyond about five tabs, reconsider the structure — an [Accordion](aegov-accordion.html) or separate pages usually serve better.

---

## Disabled tabs

```html
<aegov-tab slot="tabs" tab-id="payment" is-disabled>Payment</aegov-tab>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-tabs field-id="tb-dis" default-open="a">
    <aegov-tab slot="tabs" tab-id="a">Details</aegov-tab>
    <aegov-tab slot="tabs" tab-id="b">Documents</aegov-tab>
    <aegov-tab slot="tabs" tab-id="c" is-disabled>Payment — available after review</aegov-tab>
    <aegov-tab-panel tab-id="a"><p class="py-3">Details panel.</p></aegov-tab-panel>
    <aegov-tab-panel tab-id="b"><p class="py-3">Documents panel.</p></aegov-tab-panel>
    <aegov-tab-panel tab-id="c"><p class="py-3">Payment panel.</p></aegov-tab-panel>
  </aegov-tabs>
</div>

A disabled tab is skipped by arrow-key navigation. Say why it is unavailable — in the label itself, as above, or nearby.

---

## Tabs with icons

`aegov-tab` has `icon` and `icon-end` slots.

```html
<aegov-tab slot="tabs" tab-id="documents">
  <svg slot="icon" class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">…</svg>
  Documents
  <aegov-badge slot="icon-end" size="sm" variant="primary">3</aegov-badge>
</aegov-tab>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-tabs field-id="tb-icons" default-open="a">
    <aegov-tab slot="tabs" tab-id="a">
      <svg slot="icon" class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.5a.75.75 0 0 0-1.5 0v.5a.75.75 0 0 0 1.5 0v-.5Zm0 3.25a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 1.5 0v-3.5Z" clip-rule="evenodd" /></svg>
      Overview
    </aegov-tab>
    <aegov-tab slot="tabs" tab-id="b">
      <svg slot="icon" class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.3a1.5 1.5 0 0 1 1.06.44l3.7 3.7A1.5 1.5 0 0 1 16 7.2v9.3a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 16.5v-13Z" /></svg>
      Documents
      <aegov-badge slot="icon-end" size="sm" variant="primary">3</aegov-badge>
    </aegov-tab>
    <aegov-tab-panel tab-id="a"><p class="py-3">Overview panel.</p></aegov-tab-panel>
    <aegov-tab-panel tab-id="b"><p class="py-3">Documents panel.</p></aegov-tab-panel>
  </aegov-tabs>
</div>

Mark icons `aria-hidden="true"` — the tab's text is its accessible name. A count badge in `icon-end` is content, so leave it readable.

---

## Reacting to tab changes

```html
<aegov-tabs id="record" default-open="overview">…</aegov-tabs>

<script type="module">
  document.querySelector('#record').addEventListener('aegovTabChange', (e) => {
    const tabId = e.detail;                 // the detail is the tab-id string
    if (tabId === 'history' && !historyLoaded) loadHistory();
  });
</script>
```

`aegovTabChange` fires on the parent with the newly active `tab-id`. This is the hook for lazy-loading a panel's content the first time it is opened.

Individual tabs also emit `aegovTabSelect`, which the parent listens for internally — prefer `aegovTabChange` in application code.

---

## Composite example — application record

```html
<aegov-tabs default-open="overview" variant="simple" size="base">
  <aegov-tab slot="tabs" tab-id="overview">Overview</aegov-tab>
  <aegov-tab slot="tabs" tab-id="documents">
    Documents
    <aegov-badge slot="icon-end" size="sm" variant="primary">3</aegov-badge>
  </aegov-tab>
  <aegov-tab slot="tabs" tab-id="history">History</aegov-tab>
  <aegov-tab slot="tabs" tab-id="payment" is-disabled>Payment — after review</aegov-tab>

  <aegov-tab-panel tab-id="overview">
    <dl class="py-4 space-y-2">
      <div class="flex justify-between"><dt>Reference</dt><dd>APP-2026-0041827</dd></div>
      <div class="flex justify-between"><dt>Status</dt><dd><aegov-badge variant="camel">Under review</aegov-badge></dd></div>
    </dl>
  </aegov-tab-panel>

  <aegov-tab-panel tab-id="documents">…</aegov-tab-panel>
  <aegov-tab-panel tab-id="history">…</aegov-tab-panel>
  <aegov-tab-panel tab-id="payment">…</aegov-tab-panel>
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-tabs field-id="tb-cx" default-open="overview">
    <aegov-tab slot="tabs" tab-id="overview">Overview</aegov-tab>
    <aegov-tab slot="tabs" tab-id="documents">Documents <aegov-badge slot="icon-end" size="sm" variant="primary">3</aegov-badge></aegov-tab>
    <aegov-tab slot="tabs" tab-id="history">History</aegov-tab>
    <aegov-tab slot="tabs" tab-id="payment" is-disabled>Payment — after review</aegov-tab>
    <aegov-tab-panel tab-id="overview">
      <dl class="py-4 space-y-2 max-w-sm">
        <div class="flex justify-between"><dt class="text-aeblack-500">Reference</dt><dd>APP-2026-0041827</dd></div>
        <div class="flex justify-between"><dt class="text-aeblack-500">Submitted</dt><dd>14 March 2026</dd></div>
        <div class="flex justify-between items-center"><dt class="text-aeblack-500">Status</dt><dd><aegov-badge variant="camel">Under review</aegov-badge></dd></div>
      </dl>
    </aegov-tab-panel>
    <aegov-tab-panel tab-id="documents">
      <ul class="py-4 divide-y divide-aeblack-100 max-w-sm">
        <li class="py-2">Passport copy</li>
        <li class="py-2">Emirates ID copy</li>
        <li class="py-2">Tenancy contract</li>
      </ul>
    </aegov-tab-panel>
    <aegov-tab-panel tab-id="history"><p class="py-4">Submitted → Under review → Awaiting documents.</p></aegov-tab-panel>
    <aegov-tab-panel tab-id="payment"><p class="py-4">Payment becomes available after review.</p></aegov-tab-panel>
  </aegov-tabs>
</div>

---

## RTL Support

Tabs are direction-aware. In a `dir="rtl"` container the strip runs right to left, the active underline and segmented borders mirror, and slotted icons swap sides. **Arrow-key navigation follows the visual order**, so `ArrowRight` moves to the tab on the right — which is the previous tab in RTL. That is correct platform behaviour and what users expect.

```html
<div dir="rtl">
  <aegov-tabs default-open="overview">
    <aegov-tab slot="tabs" tab-id="overview">نظرة عامة</aegov-tab>
    <aegov-tab slot="tabs" tab-id="documents">المستندات</aegov-tab>
    <aegov-tab slot="tabs" tab-id="history">السجل</aegov-tab>
    <aegov-tab-panel tab-id="overview">تفاصيل الطلب.</aegov-tab-panel>
    <aegov-tab-panel tab-id="documents">المستندات المرفقة.</aegov-tab-panel>
    <aegov-tab-panel tab-id="history">سجل الحالة.</aegov-tab-panel>
  </aegov-tabs>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-10">
    <aegov-tabs field-id="tb-rtl-1" default-open="overview">
      <aegov-tab slot="tabs" tab-id="overview">نظرة عامة</aegov-tab>
      <aegov-tab slot="tabs" tab-id="documents">المستندات <aegov-badge slot="icon-end" size="sm" variant="primary">٣</aegov-badge></aegov-tab>
      <aegov-tab slot="tabs" tab-id="history">السجل</aegov-tab>
      <aegov-tab-panel tab-id="overview"><p class="py-3">الطلب APP-2026-0041827 لتجديد الهوية الإماراتية.</p></aegov-tab-panel>
      <aegov-tab-panel tab-id="documents"><p class="py-3">صورة جواز السفر، صورة الهوية، وعقد الإيجار.</p></aegov-tab-panel>
      <aegov-tab-panel tab-id="history"><p class="py-3">تم الإرسال → قيد المراجعة.</p></aegov-tab-panel>
    </aegov-tabs>
    <aegov-tabs field-id="tb-rtl-2" variant="segmented" is-stretchable default-open="a">
      <aegov-tab slot="tabs" tab-id="a">يوم</aegov-tab>
      <aegov-tab slot="tabs" tab-id="b">أسبوع</aegov-tab>
      <aegov-tab slot="tabs" tab-id="c">شهر</aegov-tab>
      <aegov-tab-panel tab-id="a"><p class="py-3">عرض اليوم.</p></aegov-tab-panel>
      <aegov-tab-panel tab-id="b"><p class="py-3">عرض الأسبوع.</p></aegov-tab-panel>
      <aegov-tab-panel tab-id="c"><p class="py-3">عرض الشهر.</p></aegov-tab-panel>
    </aegov-tabs>
  </div>
</div>

---

## API Reference

### aegov-tabs Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the wrapper. Auto-generated when omitted, reflected. | `string` | _generated_ |
| `defaultOpen` | `default-open` | `tab-id` of the tab to open initially. Falls back to the first tab. | `string` | `''` |
| `variant` | `variant` | Visual treatment. Cascades to children. | `'simple' \| 'segmented' \| 'pill'` | `'simple'` |
| `size` | `size` | Size token or responsive string. Cascades to children. | `string` — `sm \| base \| lg` | `'base'` |
| `orientation` | `orientation` | Strip direction. Cascades to children and sets `aria-orientation`. | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `isStretchable` | `is-stretchable` | Tabs share the full width equally. | `boolean` | `false` |
| `isScrollable` | `is-scrollable` | The strip scrolls horizontally instead of wrapping. | `boolean` | `false` |
| `labelTablist` | `label-tablist` | Accessible name for the tab strip. | `string` | `''` |

### aegov-tab Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `tabId` | `tab-id` | **Required.** Must match a panel's `tabId`. | `string` | — |
| `isDisabled` | `is-disabled` | Unselectable, and skipped by arrow keys. | `boolean` | `false` |
| `variant`, `size`, `orientation`, `activeTabId` | — | Cascaded from the parent. | — | — |

### aegov-tab-panel Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `tabId` | `tab-id` | **Required.** Must match a tab's `tabId`. | `string` | — |
| `active` | `active` | Visibility. Set by the parent. | `boolean` | `false` |
| `extraClass` | `extra-class` | Extra classes on the panel. | `string` | — |

### Slots

| Slot | On | Description |
| --- | --- | --- |
| `tabs` | `aegov-tabs` | The `aegov-tab` triggers. |
| _(default)_ | `aegov-tabs` | The `aegov-tab-panel` elements. |
| _(default)_ | `aegov-tab` | The tab label. |
| `icon` | `aegov-tab` | Leading icon. |
| `icon-end` | `aegov-tab` | Trailing icon or badge. |
| _(default)_ | `aegov-tab-panel` | The panel content. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovTabChange` | `string` — the new `tab-id` | Fired by `aegov-tabs` when the active tab changes. **Use this one.** |
| `aegovTabSelect` | `string` — the `tab-id` | Fired by an individual `aegov-tab`. Consumed by the parent. |

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the wrapper. Use `labelTablist` for the strip's name rather than `aria-label` on the host. |
| `data-*` | Yes | Forwarded to the wrapper. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host. Use `extra-class` on a panel for its content wrapper. |

---

## Accessibility

### Built-in behaviour

- The strip is a real `role="tablist"`, each trigger is `role="tab"`, and each panel is `role="tabpanel"` — the full WAI-ARIA Tabs pattern.
- `aria-selected` tracks the active tab; `aria-controls` links each tab to its panel; each panel is `aria-labelledby` its tab. The relationship is bidirectional, so a screen reader can move between them.
- `aria-orientation` reflects the `orientation` property, which tells assistive technology which arrow keys apply.
- `aria-disabled` is set on disabled tabs, and they are skipped by arrow navigation rather than being focusable dead ends.
- The tab strip is a **single tab stop**: `Tab` moves into the active tab, then out to the panel — arrow keys move between tabs. This is the expected pattern and the main difference from a row of buttons.
- Arrow navigation follows the visual order, so it mirrors under `dir="rtl"`.
- Slotted icons sit alongside the label without becoming part of the accessible name, provided you mark them `aria-hidden`.

### Developer responsibilities

- **Set `labelTablist`.** A tablist with no accessible name tells the user there is a set of tabs but not what they select between.
- **Match every `tabId`.** A tab whose panel is missing renders a trigger that controls nothing, and the ARIA relationship points at a non-existent element.
- **Keep labels short and parallel.** Tabs are compared at a glance; mixed lengths and grammar make that harder.
- **Do not hide essential content behind a tab.** Anything required to complete a task should be on the page. This is especially true for form validation — errors in an unopened panel are invisible.
- **Do not use tabs for sequential steps.** A wizard needs [Timeline](aegov-timeline.html) plus real navigation; tabs imply the panels are independent and freely browsable.
- **Reconsider beyond five tabs.** `isScrollable` hides tabs off-screen; an [Accordion](aegov-accordion.html) or separate pages scale better.
- **Say why a disabled tab is unavailable.**
- **Mark decorative icons `aria-hidden="true"`.**
- **Consider reflecting the active tab in the URL** so a panel can be linked and survives a reload.
- **Use camelCase `tabId` in Angular** — kebab-case raises `NG8008`.

### Keyboard support

| Key | Action |
| --- | --- |
| `Tab` | Move focus into the active tab, or out of the strip to the panel. |
| `ArrowRight` / `ArrowLeft` | Move between tabs in a horizontal strip. Follows visual order, so it reverses under `dir="rtl"`. |
| `ArrowDown` / `ArrowUp` | Move between tabs in a vertical strip. |
| `Home` | Move to the first tab. |
| `End` | Move to the last tab. |
| `Enter`, `Space` | Activate the focused tab. |

Disabled tabs are skipped.

---

## Where to next

- [Accordion](aegov-accordion.html) — for many sections, or where several may be open at once.
- [Timeline](aegov-timeline.html) — for sequential steps.
- [Button Group](aegov-button-group.html) — for switching a view without panels.
- [Badge](aegov-badge.html) — for counts in the `icon-end` slot.
