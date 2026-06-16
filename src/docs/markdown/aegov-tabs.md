# Tabs

<p class="text-lg text-aeblack-500 mb-8">Tabs let users switch between related views inside a single surface — service details, account sections, dashboard breakdowns — without leaving the page. The <code>aegov-tabs</code> parent owns the active state and pairs each <code>aegov-tab</code> trigger with its <code>aegov-tab-panel</code> via a matching <code>tab-id</code>. The component supports three visual variants, both horizontal and vertical orientations, scrollable overflow, and the full WAI-ARIA tabs keyboard pattern.</p>

## Introduction

`aegov-tabs` is a composite of three elements: the parent container, the trigger (`aegov-tab`), and the content panel (`aegov-tab-panel`). The parent writes shared configuration — variant, size, orientation, and the currently active tab — onto its children, so individual tabs and panels rarely need props beyond their `tab-id`. Place triggers in the `slot="tabs"` slot and panels in the default slot.

```html
<aegov-tabs default-open="overview">
  <aegov-tab slot="tabs" tab-id="overview">Overview</aegov-tab>
  <aegov-tab slot="tabs" tab-id="eligibility">Eligibility</aegov-tab>
  <aegov-tab slot="tabs" tab-id="documents">Documents</aegov-tab>

  <aegov-tab-panel tab-id="overview">
    Apply online for a residency permit. Most applications are processed within three working days.
  </aegov-tab-panel>
  <aegov-tab-panel tab-id="eligibility">
    Open to UAE nationals and residents aged 18 and over with a valid Emirates ID.
  </aegov-tab-panel>
  <aegov-tab-panel tab-id="documents">
    Upload a clear copy of your Emirates ID, recent utility bill, and proof of residence.
  </aegov-tab-panel>
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-tabs default-open="overview">
    <aegov-tab slot="tabs" tab-id="overview">Overview</aegov-tab>
    <aegov-tab slot="tabs" tab-id="eligibility">Eligibility</aegov-tab>
    <aegov-tab slot="tabs" tab-id="documents">Documents</aegov-tab>

    <aegov-tab-panel tab-id="overview">
      Apply online for a residency permit. Most applications are processed within three working days.
    </aegov-tab-panel>
    <aegov-tab-panel tab-id="eligibility">
      Open to UAE nationals and residents aged 18 and over with a valid Emirates ID.
    </aegov-tab-panel>
    <aegov-tab-panel tab-id="documents">
      Upload a clear copy of your Emirates ID, recent utility bill, and proof of residence.
    </aegov-tab-panel>
  </aegov-tabs>
</div>

---

## Variants

The `variant` property selects the visual style of the trigger row. Three variants are available: `simple` (default underline), `segmented` (a connected button group), and `pill` (rounded individual chips).

### Simple (default)

The underline variant is the most discreet style and works best for content sections inside a card or page region.

```html
<aegov-tabs variant="simple" default-open="services">
  <aegov-tab slot="tabs" tab-id="services">Services</aegov-tab>
  <aegov-tab slot="tabs" tab-id="payments">Payments</aegov-tab>
  <aegov-tab slot="tabs" tab-id="history">History</aegov-tab>
  <aegov-tab-panel tab-id="services">A list of services available to UAE residents.</aegov-tab-panel>
  <aegov-tab-panel tab-id="payments">Outstanding fees and recent payments.</aegov-tab-panel>
  <aegov-tab-panel tab-id="history">Your application and request history.</aegov-tab-panel>
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-tabs variant="simple" default-open="services">
    <aegov-tab slot="tabs" tab-id="services">Services</aegov-tab>
    <aegov-tab slot="tabs" tab-id="payments">Payments</aegov-tab>
    <aegov-tab slot="tabs" tab-id="history">History</aegov-tab>
    <aegov-tab-panel tab-id="services">A list of services available to UAE residents.</aegov-tab-panel>
    <aegov-tab-panel tab-id="payments">Outstanding fees and recent payments.</aegov-tab-panel>
    <aegov-tab-panel tab-id="history">Your application and request history.</aegov-tab-panel>
  </aegov-tabs>
</div>

### Segmented

A connected button-group style, ideal for view toggles where the options are mutually exclusive (e.g. day / week / month).

```html
<aegov-tabs variant="segmented" default-open="day">
  <aegov-tab slot="tabs" tab-id="day">Day</aegov-tab>
  <aegov-tab slot="tabs" tab-id="week">Week</aegov-tab>
  <aegov-tab slot="tabs" tab-id="month">Month</aegov-tab>
  <aegov-tab-panel tab-id="day">Daily appointment schedule.</aegov-tab-panel>
  <aegov-tab-panel tab-id="week">Weekly appointment schedule.</aegov-tab-panel>
  <aegov-tab-panel tab-id="month">Monthly appointment schedule.</aegov-tab-panel>
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-tabs variant="segmented" default-open="day">
    <aegov-tab slot="tabs" tab-id="day">Day</aegov-tab>
    <aegov-tab slot="tabs" tab-id="week">Week</aegov-tab>
    <aegov-tab slot="tabs" tab-id="month">Month</aegov-tab>
    <aegov-tab-panel tab-id="day">Daily appointment schedule.</aegov-tab-panel>
    <aegov-tab-panel tab-id="week">Weekly appointment schedule.</aegov-tab-panel>
    <aegov-tab-panel tab-id="month">Monthly appointment schedule.</aegov-tab-panel>
  </aegov-tabs>
</div>

### Pill

Pill-shaped individual chips. Useful when the tab row needs to look like filter pills rather than a structural section divider.

```html
<aegov-tabs variant="pill" default-open="all">
  <aegov-tab slot="tabs" tab-id="all">All requests</aegov-tab>
  <aegov-tab slot="tabs" tab-id="open">Open</aegov-tab>
  <aegov-tab slot="tabs" tab-id="closed">Closed</aegov-tab>
  <aegov-tab-panel tab-id="all">Every service request raised on your account.</aegov-tab-panel>
  <aegov-tab-panel tab-id="open">Requests still in progress.</aegov-tab-panel>
  <aegov-tab-panel tab-id="closed">Requests that have been resolved.</aegov-tab-panel>
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-tabs variant="pill" default-open="all">
    <aegov-tab slot="tabs" tab-id="all">All requests</aegov-tab>
    <aegov-tab slot="tabs" tab-id="open">Open</aegov-tab>
    <aegov-tab slot="tabs" tab-id="closed">Closed</aegov-tab>
    <aegov-tab-panel tab-id="all">Every service request raised on your account.</aegov-tab-panel>
    <aegov-tab-panel tab-id="open">Requests still in progress.</aegov-tab-panel>
    <aegov-tab-panel tab-id="closed">Requests that have been resolved.</aegov-tab-panel>
  </aegov-tabs>
</div>

---

## Default Active Tab

Use `default-open` with the `tab-id` of the tab you want active on first render. If omitted, the first non-disabled tab is activated automatically.

```html
<aegov-tabs default-open="payments">
  <aegov-tab slot="tabs" tab-id="profile">Profile</aegov-tab>
  <aegov-tab slot="tabs" tab-id="payments">Payments</aegov-tab>
  <aegov-tab slot="tabs" tab-id="security">Security</aegov-tab>
  <aegov-tab-panel tab-id="profile">Personal details and contact information.</aegov-tab-panel>
  <aegov-tab-panel tab-id="payments">Outstanding fees and saved payment methods.</aegov-tab-panel>
  <aegov-tab-panel tab-id="security">Password, two-factor authentication, and trusted devices.</aegov-tab-panel>
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-tabs default-open="payments">
    <aegov-tab slot="tabs" tab-id="profile">Profile</aegov-tab>
    <aegov-tab slot="tabs" tab-id="payments">Payments</aegov-tab>
    <aegov-tab slot="tabs" tab-id="security">Security</aegov-tab>
    <aegov-tab-panel tab-id="profile">Personal details and contact information.</aegov-tab-panel>
    <aegov-tab-panel tab-id="payments">Outstanding fees and saved payment methods.</aegov-tab-panel>
    <aegov-tab-panel tab-id="security">Password, two-factor authentication, and trusted devices.</aegov-tab-panel>
  </aegov-tabs>
</div>

---

## Orientation

The `orientation` property switches the tab row between `horizontal` (default — tabs above the panels) and `vertical` (tabs to the side). Vertical orientation also swaps the keyboard arrow keys from `ArrowLeft` / `ArrowRight` to `ArrowUp` / `ArrowDown`.

### Horizontal (default)

```html
<aegov-tabs orientation="horizontal" default-open="overview">
  <aegov-tab slot="tabs" tab-id="overview">Overview</aegov-tab>
  <aegov-tab slot="tabs" tab-id="fees">Fees</aegov-tab>
  <aegov-tab slot="tabs" tab-id="contact">Contact</aegov-tab>
  <aegov-tab-panel tab-id="overview">A summary of the service.</aegov-tab-panel>
  <aegov-tab-panel tab-id="fees">Service fees and refund policy.</aegov-tab-panel>
  <aegov-tab-panel tab-id="contact">How to reach the responsible team.</aegov-tab-panel>
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-tabs orientation="horizontal" default-open="overview">
    <aegov-tab slot="tabs" tab-id="overview">Overview</aegov-tab>
    <aegov-tab slot="tabs" tab-id="fees">Fees</aegov-tab>
    <aegov-tab slot="tabs" tab-id="contact">Contact</aegov-tab>
    <aegov-tab-panel tab-id="overview">A summary of the service.</aegov-tab-panel>
    <aegov-tab-panel tab-id="fees">Service fees and refund policy.</aegov-tab-panel>
    <aegov-tab-panel tab-id="contact">How to reach the responsible team.</aegov-tab-panel>
  </aegov-tabs>
</div>

### Vertical

```html
<aegov-tabs orientation="vertical" default-open="profile">
  <aegov-tab slot="tabs" tab-id="profile">Profile</aegov-tab>
  <aegov-tab slot="tabs" tab-id="emirates-id">Emirates ID</aegov-tab>
  <aegov-tab slot="tabs" tab-id="addresses">Addresses</aegov-tab>
  <aegov-tab slot="tabs" tab-id="security">Security</aegov-tab>
  <aegov-tab-panel tab-id="profile">Name, date of birth, and primary contact details.</aegov-tab-panel>
  <aegov-tab-panel tab-id="emirates-id">Emirates ID number, expiry date, and renewal status.</aegov-tab-panel>
  <aegov-tab-panel tab-id="addresses">Residential and mailing addresses on record.</aegov-tab-panel>
  <aegov-tab-panel tab-id="security">Password, recovery email, and active sessions.</aegov-tab-panel>
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-tabs orientation="vertical" default-open="profile">
    <aegov-tab slot="tabs" tab-id="profile">Profile</aegov-tab>
    <aegov-tab slot="tabs" tab-id="emirates-id">Emirates ID</aegov-tab>
    <aegov-tab slot="tabs" tab-id="addresses">Addresses</aegov-tab>
    <aegov-tab slot="tabs" tab-id="security">Security</aegov-tab>
    <aegov-tab-panel tab-id="profile">Name, date of birth, and primary contact details.</aegov-tab-panel>
    <aegov-tab-panel tab-id="emirates-id">Emirates ID number, expiry date, and renewal status.</aegov-tab-panel>
    <aegov-tab-panel tab-id="addresses">Residential and mailing addresses on record.</aegov-tab-panel>
    <aegov-tab-panel tab-id="security">Password, recovery email, and active sessions.</aegov-tab-panel>
  </aegov-tabs>
</div>

---

## Sizes

The `size` property sets the trigger size. Three tokens are available: `sm`, `base` (default), and `lg`. Panel content is unaffected — only the trigger row scales.

| Token  | Trigger size |
| ------ | ------------ |
| `sm`   | Compact      |
| `base` | Default      |
| `lg`   | Large        |

```html
<aegov-tabs size="sm" default-open="a">…</aegov-tabs>
<aegov-tabs size="base" default-open="a">…</aegov-tabs>
<aegov-tabs size="lg" default-open="a">…</aegov-tabs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-tabs size="sm" default-open="a">
    <aegov-tab slot="tabs" tab-id="a">Small</aegov-tab>
    <aegov-tab slot="tabs" tab-id="b">Compact triggers</aegov-tab>
    <aegov-tab-panel tab-id="a">Compact size suits dense administrative dashboards.</aegov-tab-panel>
    <aegov-tab-panel tab-id="b">Use this when vertical space is tight.</aegov-tab-panel>
  </aegov-tabs>

  <div class="my-4"></div>

  <aegov-tabs size="base" default-open="a">
    <aegov-tab slot="tabs" tab-id="a">Base</aegov-tab>
    <aegov-tab slot="tabs" tab-id="b">Default triggers</aegov-tab>
    <aegov-tab-panel tab-id="a">The default size, suitable for most page contexts.</aegov-tab-panel>
    <aegov-tab-panel tab-id="b">Reach for this unless you have a specific reason not to.</aegov-tab-panel>
  </aegov-tabs>

  <div class="my-4"></div>

  <aegov-tabs size="lg" default-open="a">
    <aegov-tab slot="tabs" tab-id="a">Large</aegov-tab>
    <aegov-tab slot="tabs" tab-id="b">Prominent triggers</aegov-tab>
    <aegov-tab-panel tab-id="a">Large size works well as a top-level page navigation.</aegov-tab-panel>
    <aegov-tab-panel tab-id="b">Pair with a hero or main content area.</aegov-tab-panel>
  </aegov-tabs>
</div>

### Responsive sizes

`size` also accepts a Tailwind-style responsive string with the breakpoint prefixes `xs`, `sm`, `md`, `lg`, `xl`, and `2xl`. Each segment overrides smaller breakpoints.

```html
<aegov-tabs size="sm md:base xl:lg" default-open="a">
  <aegov-tab slot="tabs" tab-id="a">Resizes</aegov-tab>
  <aegov-tab slot="tabs" tab-id="b">Across breakpoints</aegov-tab>
  <aegov-tab-panel tab-id="a">Resize the browser to see the trigger size scale.</aegov-tab-panel>
  <aegov-tab-panel tab-id="b">Panel content stays the same — only the trigger row changes.</aegov-tab-panel>
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-tabs size="sm md:base xl:lg" default-open="a">
    <aegov-tab slot="tabs" tab-id="a">Resizes</aegov-tab>
    <aegov-tab slot="tabs" tab-id="b">Across breakpoints</aegov-tab>
    <aegov-tab-panel tab-id="a">Resize the browser to see the trigger size scale.</aegov-tab-panel>
    <aegov-tab-panel tab-id="b">Panel content stays the same — only the trigger row changes.</aegov-tab-panel>
  </aegov-tabs>
</div>

---

## Stretchable Tabs

Set `is-stretchable="true"` to distribute the tabs evenly across the full width of the container. Useful for two- or three-tab toolbars where each option carries equal weight.

```html
<aegov-tabs variant="segmented" is-stretchable="true" default-open="grid">
  <aegov-tab slot="tabs" tab-id="grid">Grid view</aegov-tab>
  <aegov-tab slot="tabs" tab-id="list">List view</aegov-tab>
  <aegov-tab-panel tab-id="grid">Services arranged as cards in a grid.</aegov-tab-panel>
  <aegov-tab-panel tab-id="list">Services arranged as a vertical list.</aegov-tab-panel>
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-tabs variant="segmented" is-stretchable="true" default-open="grid">
    <aegov-tab slot="tabs" tab-id="grid">Grid view</aegov-tab>
    <aegov-tab slot="tabs" tab-id="list">List view</aegov-tab>
    <aegov-tab-panel tab-id="grid">Services arranged as cards in a grid.</aegov-tab-panel>
    <aegov-tab-panel tab-id="list">Services arranged as a vertical list.</aegov-tab-panel>
  </aegov-tabs>
</div>

---

## Scrollable Tabs

Set `is-scrollable="true"` to let the tab row scroll horizontally when triggers exceed the container width. A faded gradient at the start and end edge signals scrollable content; activating a tab smoothly scrolls it into view.

```html
<aegov-tabs is-scrollable="true" default-open="jan">
  <aegov-tab slot="tabs" tab-id="jan">January</aegov-tab>
  <aegov-tab slot="tabs" tab-id="feb">February</aegov-tab>
  <aegov-tab slot="tabs" tab-id="mar">March</aegov-tab>
  <aegov-tab slot="tabs" tab-id="apr">April</aegov-tab>
  <aegov-tab slot="tabs" tab-id="may">May</aegov-tab>
  <aegov-tab slot="tabs" tab-id="jun">June</aegov-tab>
  <aegov-tab slot="tabs" tab-id="jul">July</aegov-tab>
  <aegov-tab slot="tabs" tab-id="aug">August</aegov-tab>
  <aegov-tab slot="tabs" tab-id="sep">September</aegov-tab>
  <aegov-tab slot="tabs" tab-id="oct">October</aegov-tab>
  <aegov-tab slot="tabs" tab-id="nov">November</aegov-tab>
  <aegov-tab slot="tabs" tab-id="dec">December</aegov-tab>
  <aegov-tab-panel tab-id="jan">Statement for January.</aegov-tab-panel>
  <!-- additional panels … -->
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-tabs is-scrollable="true" default-open="jan">
    <aegov-tab slot="tabs" tab-id="jan">January</aegov-tab>
    <aegov-tab slot="tabs" tab-id="feb">February</aegov-tab>
    <aegov-tab slot="tabs" tab-id="mar">March</aegov-tab>
    <aegov-tab slot="tabs" tab-id="apr">April</aegov-tab>
    <aegov-tab slot="tabs" tab-id="may">May</aegov-tab>
    <aegov-tab slot="tabs" tab-id="jun">June</aegov-tab>
    <aegov-tab slot="tabs" tab-id="jul">July</aegov-tab>
    <aegov-tab slot="tabs" tab-id="aug">August</aegov-tab>
    <aegov-tab slot="tabs" tab-id="sep">September</aegov-tab>
    <aegov-tab slot="tabs" tab-id="oct">October</aegov-tab>
    <aegov-tab slot="tabs" tab-id="nov">November</aegov-tab>
    <aegov-tab slot="tabs" tab-id="dec">December</aegov-tab>
    <aegov-tab-panel tab-id="jan">Statement for January.</aegov-tab-panel>
    <aegov-tab-panel tab-id="feb">Statement for February.</aegov-tab-panel>
    <aegov-tab-panel tab-id="mar">Statement for March.</aegov-tab-panel>
    <aegov-tab-panel tab-id="apr">Statement for April.</aegov-tab-panel>
    <aegov-tab-panel tab-id="may">Statement for May.</aegov-tab-panel>
    <aegov-tab-panel tab-id="jun">Statement for June.</aegov-tab-panel>
    <aegov-tab-panel tab-id="jul">Statement for July.</aegov-tab-panel>
    <aegov-tab-panel tab-id="aug">Statement for August.</aegov-tab-panel>
    <aegov-tab-panel tab-id="sep">Statement for September.</aegov-tab-panel>
    <aegov-tab-panel tab-id="oct">Statement for October.</aegov-tab-panel>
    <aegov-tab-panel tab-id="nov">Statement for November.</aegov-tab-panel>
    <aegov-tab-panel tab-id="dec">Statement for December.</aegov-tab-panel>
  </aegov-tabs>
</div>

---

## Disabled Tabs

Set `is-disabled="true"` on an individual `aegov-tab` to render it as muted and remove it from the keyboard tab order. Disabled tabs are skipped by arrow-key navigation and do not emit a select event.

```html
<aegov-tabs default-open="active">
  <aegov-tab slot="tabs" tab-id="active">Active applications</aegov-tab>
  <aegov-tab slot="tabs" tab-id="archive" is-disabled="true">Archive</aegov-tab>
  <aegov-tab slot="tabs" tab-id="drafts">Drafts</aegov-tab>
  <aegov-tab-panel tab-id="active">Applications currently in review.</aegov-tab-panel>
  <aegov-tab-panel tab-id="archive">Archive is not yet available.</aegov-tab-panel>
  <aegov-tab-panel tab-id="drafts">Saved drafts you have not submitted yet.</aegov-tab-panel>
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-tabs default-open="active">
    <aegov-tab slot="tabs" tab-id="active">Active applications</aegov-tab>
    <aegov-tab slot="tabs" tab-id="archive" is-disabled="true">Archive</aegov-tab>
    <aegov-tab slot="tabs" tab-id="drafts">Drafts</aegov-tab>
    <aegov-tab-panel tab-id="active">Applications currently in review.</aegov-tab-panel>
    <aegov-tab-panel tab-id="archive">Archive is not yet available.</aegov-tab-panel>
    <aegov-tab-panel tab-id="drafts">Saved drafts you have not submitted yet.</aegov-tab-panel>
  </aegov-tabs>
</div>

---

## Tabs with Icons

`aegov-tab` exposes two extra slots — `icon` (before the label) and `icon-end` (after the label) — for adding visual indicators to triggers.

```html
<aegov-tabs default-open="profile">
  <aegov-tab slot="tabs" tab-id="profile">
    <svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
    Profile
  </aegov-tab>
  <aegov-tab slot="tabs" tab-id="documents">
    <svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
    Documents
  </aegov-tab>
  <aegov-tab slot="tabs" tab-id="security">
    <svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
    Security
  </aegov-tab>

  <aegov-tab-panel tab-id="profile">Personal details and contact information.</aegov-tab-panel>
  <aegov-tab-panel tab-id="documents">Identity and supporting documents.</aegov-tab-panel>
  <aegov-tab-panel tab-id="security">Password and authentication settings.</aegov-tab-panel>
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-tabs default-open="profile">
    <aegov-tab slot="tabs" tab-id="profile">
      <svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
      Profile
    </aegov-tab>
    <aegov-tab slot="tabs" tab-id="documents">
      <svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
      Documents
    </aegov-tab>
    <aegov-tab slot="tabs" tab-id="security">
      <svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
      Security
    </aegov-tab>
    <aegov-tab-panel tab-id="profile">Personal details and contact information.</aegov-tab-panel>
    <aegov-tab-panel tab-id="documents">Identity and supporting documents.</aegov-tab-panel>
    <aegov-tab-panel tab-id="security">Password and authentication settings.</aegov-tab-panel>
  </aegov-tabs>
</div>

---

## Listening for Tab Changes

`aegov-tabs` emits `aegovTabChange` when the active tab changes. The event detail is the new active `tab-id` as a string. Use this to lazily load panel content, sync URL state, or send analytics.

```html
<aegov-tabs id="account-tabs" default-open="profile">
  <aegov-tab slot="tabs" tab-id="profile">Profile</aegov-tab>
  <aegov-tab slot="tabs" tab-id="security">Security</aegov-tab>
  <aegov-tab-panel tab-id="profile">Profile content</aegov-tab-panel>
  <aegov-tab-panel tab-id="security">Security content</aegov-tab-panel>
</aegov-tabs>

<script>
  document.querySelector('#account-tabs').addEventListener('aegovTabChange', (e) => {
    console.log('Active tab is now:', e.detail);
  });
</script>
```

---

## RTL Support

`aegov-tabs` is direction-aware. When the document or any ancestor is set to `dir="rtl"`, the horizontal layout flows right-to-left and the keyboard arrow keys flip — `ArrowLeft` advances and `ArrowRight` retreats. Vertical orientation, `Home`, and `End` always behave the same regardless of direction. Scrollable fade gradients adjust to the document's edge naturally.

```html
<div dir="rtl">
  <aegov-tabs default-open="overview">
    <aegov-tab slot="tabs" tab-id="overview">نظرة عامة</aegov-tab>
    <aegov-tab slot="tabs" tab-id="eligibility">الأهلية</aegov-tab>
    <aegov-tab slot="tabs" tab-id="documents">المستندات</aegov-tab>

    <aegov-tab-panel tab-id="overview">
      تقدّم بطلب للحصول على تأشيرة الإقامة عبر الإنترنت. تُعالَج معظم الطلبات خلال ثلاثة أيام عمل.
    </aegov-tab-panel>
    <aegov-tab-panel tab-id="eligibility">
      هذه الخدمة متاحة لمواطني دولة الإمارات والمقيمين فيها ممن أتمّوا الثامنة عشرة من العمر ولديهم هوية إماراتية سارية.
    </aegov-tab-panel>
    <aegov-tab-panel tab-id="documents">
      حمّل نسخة واضحة من الهوية الإماراتية، وفاتورة خدمات حديثة، وما يثبت محل الإقامة.
    </aegov-tab-panel>
  </aegov-tabs>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-tabs default-open="overview">
    <aegov-tab slot="tabs" tab-id="overview">نظرة عامة</aegov-tab>
    <aegov-tab slot="tabs" tab-id="eligibility">الأهلية</aegov-tab>
    <aegov-tab slot="tabs" tab-id="documents">المستندات</aegov-tab>
    <aegov-tab-panel tab-id="overview">
      تقدّم بطلب للحصول على تأشيرة الإقامة عبر الإنترنت. تُعالَج معظم الطلبات خلال ثلاثة أيام عمل.
    </aegov-tab-panel>
    <aegov-tab-panel tab-id="eligibility">
      هذه الخدمة متاحة لمواطني دولة الإمارات والمقيمين فيها ممن أتمّوا الثامنة عشرة من العمر ولديهم هوية إماراتية سارية.
    </aegov-tab-panel>
    <aegov-tab-panel tab-id="documents">
      حمّل نسخة واضحة من الهوية الإماراتية، وفاتورة خدمات حديثة، وما يثبت محل الإقامة.
    </aegov-tab-panel>
  </aegov-tabs>
</div>

The same tabs in the segmented variant, in RTL:

```html
<div dir="rtl">
  <aegov-tabs variant="segmented" default-open="day">
    <aegov-tab slot="tabs" tab-id="day">اليوم</aegov-tab>
    <aegov-tab slot="tabs" tab-id="week">الأسبوع</aegov-tab>
    <aegov-tab slot="tabs" tab-id="month">الشهر</aegov-tab>
    <aegov-tab-panel tab-id="day">جدول المواعيد اليومي.</aegov-tab-panel>
    <aegov-tab-panel tab-id="week">جدول المواعيد الأسبوعي.</aegov-tab-panel>
    <aegov-tab-panel tab-id="month">جدول المواعيد الشهري.</aegov-tab-panel>
  </aegov-tabs>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-tabs variant="segmented" default-open="day">
    <aegov-tab slot="tabs" tab-id="day">اليوم</aegov-tab>
    <aegov-tab slot="tabs" tab-id="week">الأسبوع</aegov-tab>
    <aegov-tab slot="tabs" tab-id="month">الشهر</aegov-tab>
    <aegov-tab-panel tab-id="day">جدول المواعيد اليومي.</aegov-tab-panel>
    <aegov-tab-panel tab-id="week">جدول المواعيد الأسبوعي.</aegov-tab-panel>
    <aegov-tab-panel tab-id="month">جدول المواعيد الشهري.</aegov-tab-panel>
  </aegov-tabs>
</div>

---

## API Reference

### aegov-tabs Properties

| Property        | Attribute        | Description                                                                  | Type                                  | Default        |
| --------------- | ---------------- | ---------------------------------------------------------------------------- | ------------------------------------- | -------------- |
| `fieldId`       | `field-id`       | DOM `id` for the outer container. Auto-generated if omitted.                 | `string`                              | _generated_    |
| `variant`       | `variant`        | Visual style of the tab triggers.                                            | `'simple' \| 'segmented' \| 'pill'`   | `'simple'`     |
| `defaultOpen`   | `default-open`   | `tab-id` of the tab to activate on initial render.                           | `string`                              | `''`           |
| `size`          | `size`           | Trigger size token or responsive string.                                     | `string`                              | `'base'`       |
| `orientation`   | `orientation`    | Layout orientation of the tab row.                                           | `'horizontal' \| 'vertical'`          | `'horizontal'` |
| `isScrollable`  | `is-scrollable`  | Enable horizontal/vertical scrolling with edge fade when triggers overflow.  | `boolean`                             | `false`        |
| `isStretchable` | `is-stretchable` | Distribute triggers evenly across the container width.                       | `boolean`                             | `false`        |
| `labelTablist`  | `label-tablist`  | `aria-label` applied to the `role="tablist"` element.                        | `string`                              | `'Tabs'`       |

### aegov-tab Properties

| Property      | Attribute       | Description                                                          | Type                                  | Default        |
| ------------- | --------------- | -------------------------------------------------------------------- | ------------------------------------- | -------------- |
| `tabId`       | `tab-id`        | **Required.** Identifier matched against the corresponding panel.    | `string`                              | _(required)_   |
| `isDisabled`  | `is-disabled`   | Disables this tab and its panel.                                     | `boolean`                             | `false`        |
| `activeTabId` | `active-tab-id` | _Set by the parent._ The currently active tab id.                    | `string`                              | `''`           |
| `variant`     | `variant`       | _Set by the parent._ Visual style of the trigger.                    | `'simple' \| 'segmented' \| 'pill'`   | `'simple'`     |
| `size`        | `size`          | _Set by the parent._ Trigger size.                                   | `string`                              | `'base'`       |
| `orientation` | `orientation`   | _Set by the parent._ Layout orientation.                             | `'horizontal' \| 'vertical'`          | `'horizontal'` |

### aegov-tab-panel Properties

| Property     | Attribute     | Description                                                          | Type      | Default       |
| ------------ | ------------- | -------------------------------------------------------------------- | --------- | ------------- |
| `tabId`      | `tab-id`      | **Required.** Must match the corresponding tab's `tab-id`.           | `string`  | _(required)_  |
| `active`     | `active`      | _Set by the parent._ Whether this panel is currently visible.        | `boolean` | `false`       |
| `extraClass` | `extra-class` | Additional CSS classes merged onto the inner panel element.          | `string`  | `undefined`   |

> Properties marked _Set by the parent_ are written automatically by `aegov-tabs`. Setting them on a child directly will be overridden on the next sync.

### Slots

| Component         | Slot       | Description                                                          |
| ----------------- | ---------- | -------------------------------------------------------------------- |
| `aegov-tabs`      | `tabs`     | Place `aegov-tab` triggers here. Each must use `slot="tabs"`.        |
| `aegov-tabs`      | _(default)_ | Place `aegov-tab-panel` elements here.                                |
| `aegov-tab`       | _(default)_ | The tab label text.                                                   |
| `aegov-tab`       | `icon`     | Optional icon shown before the label.                                |
| `aegov-tab`       | `icon-end` | Optional icon shown after the label.                                 |
| `aegov-tab-panel` | _(default)_ | The panel content shown when the tab is active.                       |

### Events

| Event              | Component       | Detail   | Description                                                                                                                |
| ------------------ | --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| `aegovTabChange`   | `aegov-tabs`    | `string` | Fired after the active tab changes. Detail is the new active `tab-id`.                                                     |
| `aegovTabSelect`   | `aegov-tab`     | `string` | Bubbles up from a tab when clicked. The parent listens and updates state — consumers normally listen to `aegovTabChange`.  |

### Pass-through Attributes

| Attribute group | Forwarded? | Where to apply                                                                              |
| --------------- | ---------- | ------------------------------------------------------------------------------------------- |
| `aria-*`        | Yes        | Set on `<aegov-tabs>` — forwarded onto the rendered container element.                      |
| `data-*`        | Yes        | Set on `<aegov-tabs>` — forwarded onto the rendered container element.                      |
| `aria-*` / `data-*` on children | No  | Apply directly to `<aegov-tab>` or `<aegov-tab-panel>`; not forwarded automatically.        |
| `id`            | n/a        | Use `field-id` on `<aegov-tabs>`. Tabs and panels use generated `tab-{id}` / `panel-{id}`.  |
| `class`, `style` | Allowed   | Applied to the host element.                                                                |

---

## Accessibility

### Built-in behaviour

- The trigger row uses `role="tablist"` with the configured `aria-label` (defaults to `"Tabs"`) and `aria-orientation` reflecting `orientation`.
- Each trigger is a real `<button>` with `role="tab"`, `aria-selected`, and `aria-controls` linking to its panel.
- Each panel has `role="tabpanel"`, `aria-labelledby` pointing at its trigger, and the native `hidden` attribute when inactive.
- A roving tabindex pattern is used: only the active trigger is tab-focusable (`tabindex="0"`); the rest use `tabindex="-1"`.
- Disabled tabs set both the native `disabled` attribute and `aria-disabled="true"` and are skipped by arrow-key navigation.

### Developer responsibilities

- Provide a unique, matching `tab-id` for every tab/panel pair.
- Give every trigger a meaningful accessible name in the default slot. If you only render an icon, include visually hidden text.
- Override `label-tablist` when the tabs control a more specific region (e.g. `"Account sections"`).
- When a panel contains heavy assets, consider lazy-loading them only when the panel becomes active by listening for `aegovTabChange`.

### Keyboard support

| Key            | Horizontal           | Vertical             |
| -------------- | -------------------- | -------------------- |
| `ArrowRight`   | Move to next tab     | _(no effect)_        |
| `ArrowLeft`    | Move to previous tab | _(no effect)_        |
| `ArrowDown`    | _(no effect)_        | Move to next tab     |
| `ArrowUp`      | _(no effect)_        | Move to previous tab |
| `Home`         | Move to first tab    | Move to first tab    |
| `End`          | Move to last tab     | Move to last tab     |
| `Tab`          | Move focus into / out of the tablist (focuses the active trigger on entry) | Same |

Arrow-key navigation wraps at the ends and skips disabled tabs. In RTL contexts the horizontal arrows flip — `ArrowLeft` advances and `ArrowRight` retreats. Activation follows focus by design: moving focus also activates the tab and reveals its panel.
