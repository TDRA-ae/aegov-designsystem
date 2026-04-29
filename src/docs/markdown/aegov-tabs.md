# Tabs

<p class="text-lg text-aeblack-500 mb-8">Tabs organise related content into separate panels, allowing users to switch between views without leaving the page. They reduce clutter and group information logically.</p>

## Introduction

The tabs component is built from three elements that work together: `<aegov-tabs>` (the container), `<aegov-tab>` (the clickable triggers), and `<aegov-tab-panel>` (the content panels). Each tab is linked to its panel via a matching `tab-id` attribute.

The `aegov-tabs` component provides **3 variants**, **3 sizes**, and supports scrollable overflow, stretched layout, vertical orientation, icons, disabled tabs, and full keyboard navigation out of the box.

```html
<aegov-tabs>
  <aegov-tab slot="tabs" tab-id="overview">Overview</aegov-tab>
  <aegov-tab slot="tabs" tab-id="details">Details</aegov-tab>
  <aegov-tab slot="tabs" tab-id="settings">Settings</aegov-tab>
  <aegov-tab-panel tab-id="overview">Overview content goes here.</aegov-tab-panel>
  <aegov-tab-panel tab-id="details">Details content goes here.</aegov-tab-panel>
  <aegov-tab-panel tab-id="settings">Settings content goes here.</aegov-tab-panel>
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tabs>
    <aegov-tab slot="tabs" tab-id="intro-overview">Overview</aegov-tab>
    <aegov-tab slot="tabs" tab-id="intro-details">Details</aegov-tab>
    <aegov-tab slot="tabs" tab-id="intro-settings">Settings</aegov-tab>
    <aegov-tab-panel tab-id="intro-overview">Overview content goes here.</aegov-tab-panel>
    <aegov-tab-panel tab-id="intro-details">Details content goes here.</aegov-tab-panel>
    <aegov-tab-panel tab-id="intro-settings">Settings content goes here.</aegov-tab-panel>
  </aegov-tabs>
</div>

---

## Variants

The `variant` property on `<aegov-tabs>` controls the visual style of the tab triggers. There are three variants available.

### Simple

The default variant. Tabs are rendered as text labels with an underline indicator on the active tab. Best for standard page-level navigation.

```html
<aegov-tabs variant="simple">
  <aegov-tab slot="tabs" tab-id="tab1">First</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab2">Second</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab3">Third</aegov-tab>
  <aegov-tab-panel tab-id="tab1">First panel content.</aegov-tab-panel>
  <aegov-tab-panel tab-id="tab2">Second panel content.</aegov-tab-panel>
  <aegov-tab-panel tab-id="tab3">Third panel content.</aegov-tab-panel>
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tabs variant="simple">
    <aegov-tab slot="tabs" tab-id="simple-1">First</aegov-tab>
    <aegov-tab slot="tabs" tab-id="simple-2">Second</aegov-tab>
    <aegov-tab slot="tabs" tab-id="simple-3">Third</aegov-tab>
    <aegov-tab-panel tab-id="simple-1">First panel content.</aegov-tab-panel>
    <aegov-tab-panel tab-id="simple-2">Second panel content.</aegov-tab-panel>
    <aegov-tab-panel tab-id="simple-3">Third panel content.</aegov-tab-panel>
  </aegov-tabs>
</div>

### Segmented

A button-group style where the active tab appears as a raised, white card within a neutral container. Ideal for toggling between compact views or filters.

```html
<aegov-tabs variant="segmented">
  <aegov-tab slot="tabs" tab-id="tab1">Grid</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab2">List</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab3">Map</aegov-tab>
  <aegov-tab-panel tab-id="tab1">Grid view content.</aegov-tab-panel>
  <aegov-tab-panel tab-id="tab2">List view content.</aegov-tab-panel>
  <aegov-tab-panel tab-id="tab3">Map view content.</aegov-tab-panel>
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tabs variant="segmented">
    <aegov-tab slot="tabs" tab-id="seg-1">Grid</aegov-tab>
    <aegov-tab slot="tabs" tab-id="seg-2">List</aegov-tab>
    <aegov-tab slot="tabs" tab-id="seg-3">Map</aegov-tab>
    <aegov-tab-panel tab-id="seg-1">Grid view content.</aegov-tab-panel>
    <aegov-tab-panel tab-id="seg-2">List view content.</aegov-tab-panel>
    <aegov-tab-panel tab-id="seg-3">Map view content.</aegov-tab-panel>
  </aegov-tabs>
</div>

### Pill

Individual pill-shaped tabs with rounded borders. The active tab receives a tinted primary background. Suitable for category filters or tag-like navigation.

```html
<aegov-tabs variant="pill">
  <aegov-tab slot="tabs" tab-id="tab1">All</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab2">Active</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab3">Archived</aegov-tab>
  <aegov-tab-panel tab-id="tab1">All items content.</aegov-tab-panel>
  <aegov-tab-panel tab-id="tab2">Active items content.</aegov-tab-panel>
  <aegov-tab-panel tab-id="tab3">Archived items content.</aegov-tab-panel>
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tabs variant="pill">
    <aegov-tab slot="tabs" tab-id="pill-1">All</aegov-tab>
    <aegov-tab slot="tabs" tab-id="pill-2">Active</aegov-tab>
    <aegov-tab slot="tabs" tab-id="pill-3">Archived</aegov-tab>
    <aegov-tab-panel tab-id="pill-1">All items content.</aegov-tab-panel>
    <aegov-tab-panel tab-id="pill-2">Active items content.</aegov-tab-panel>
    <aegov-tab-panel tab-id="pill-3">Archived items content.</aegov-tab-panel>
  </aegov-tabs>
</div>

---

## Sizes

The `size` property controls the padding and font size of the tab triggers. There are three sizes available.

| Size   | Font Size | Description              |
|--------|-----------|--------------------------|
| `sm`   | 14px      | Compact, space-efficient |
| `base` | 16px      | Default balanced size    |
| `lg`   | 18px      | Prominent, high emphasis |

```html
<aegov-tabs size="sm">…</aegov-tabs>
<aegov-tabs size="base">…</aegov-tabs>
<aegov-tabs size="lg">…</aegov-tabs>
```

<div class="space-y-8 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div>
    <p class="text-xs text-aeblack-400 mb-2">size="sm"</p>
    <aegov-tabs size="sm">
      <aegov-tab slot="tabs" tab-id="sz-sm-1">Overview</aegov-tab>
      <aegov-tab slot="tabs" tab-id="sz-sm-2">Details</aegov-tab>
      <aegov-tab slot="tabs" tab-id="sz-sm-3">Settings</aegov-tab>
      <aegov-tab-panel tab-id="sz-sm-1">Small size panel content.</aegov-tab-panel>
      <aegov-tab-panel tab-id="sz-sm-2">Details panel content.</aegov-tab-panel>
      <aegov-tab-panel tab-id="sz-sm-3">Settings panel content.</aegov-tab-panel>
    </aegov-tabs>
  </div>
  <div>
    <p class="text-xs text-aeblack-400 mb-2">size="base"</p>
    <aegov-tabs size="base">
      <aegov-tab slot="tabs" tab-id="sz-base-1">Overview</aegov-tab>
      <aegov-tab slot="tabs" tab-id="sz-base-2">Details</aegov-tab>
      <aegov-tab slot="tabs" tab-id="sz-base-3">Settings</aegov-tab>
      <aegov-tab-panel tab-id="sz-base-1">Base size panel content.</aegov-tab-panel>
      <aegov-tab-panel tab-id="sz-base-2">Details panel content.</aegov-tab-panel>
      <aegov-tab-panel tab-id="sz-base-3">Settings panel content.</aegov-tab-panel>
    </aegov-tabs>
  </div>
  <div>
    <p class="text-xs text-aeblack-400 mb-2">size="lg"</p>
    <aegov-tabs size="lg">
      <aegov-tab slot="tabs" tab-id="sz-lg-1">Overview</aegov-tab>
      <aegov-tab slot="tabs" tab-id="sz-lg-2">Details</aegov-tab>
      <aegov-tab slot="tabs" tab-id="sz-lg-3">Settings</aegov-tab>
      <aegov-tab-panel tab-id="sz-lg-1">Large size panel content.</aegov-tab-panel>
      <aegov-tab-panel tab-id="sz-lg-2">Details panel content.</aegov-tab-panel>
      <aegov-tab-panel tab-id="sz-lg-3">Settings panel content.</aegov-tab-panel>
    </aegov-tabs>
  </div>
</div>

### Responsive Size

The `size` prop accepts Tailwind-style responsive prefixes. Write a space-separated string where each token is either a plain value or `breakpoint:value`. The base value (no prefix) applies below the smallest specified breakpoint.

Available breakpoints: `xs` (480px), `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px), `3xl` (1680px).

```html
<aegov-tabs size="sm xl:lg">
  <aegov-tab slot="tabs" tab-id="tab1">Overview</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab2">Details</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab3">Settings</aegov-tab>
  <aegov-tab-panel tab-id="tab1">Overview content.</aegov-tab-panel>
  <aegov-tab-panel tab-id="tab2">Details content.</aegov-tab-panel>
  <aegov-tab-panel tab-id="tab3">Settings content.</aegov-tab-panel>
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tabs size="sm xl:lg">
    <aegov-tab slot="tabs" tab-id="resp-sz-1">Overview</aegov-tab>
    <aegov-tab slot="tabs" tab-id="resp-sz-2">Details</aegov-tab>
    <aegov-tab slot="tabs" tab-id="resp-sz-3">Settings</aegov-tab>
    <aegov-tab-panel tab-id="resp-sz-1">Overview content.</aegov-tab-panel>
    <aegov-tab-panel tab-id="resp-sz-2">Details content.</aegov-tab-panel>
    <aegov-tab-panel tab-id="resp-sz-3">Settings content.</aegov-tab-panel>
  </aegov-tabs>
</div>

> **Graceful degradation:** Unknown breakpoint names and invalid values are silently ignored. An unrecognised base value falls back to the component default.

---

## Default Active Tab

Use the `default-active-tab` property to specify which tab should be active on initial render. Pass the `tab-id` of the desired tab. If not provided, the first non-disabled tab is activated automatically.

```html
<aegov-tabs default-active-tab="details">
  <aegov-tab slot="tabs" tab-id="overview">Overview</aegov-tab>
  <aegov-tab slot="tabs" tab-id="details">Details</aegov-tab>
  <aegov-tab slot="tabs" tab-id="settings">Settings</aegov-tab>
  <aegov-tab-panel tab-id="overview">Overview content.</aegov-tab-panel>
  <aegov-tab-panel tab-id="details">Details content (active on load).</aegov-tab-panel>
  <aegov-tab-panel tab-id="settings">Settings content.</aegov-tab-panel>
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tabs default-active-tab="dat-details">
    <aegov-tab slot="tabs" tab-id="dat-overview">Overview</aegov-tab>
    <aegov-tab slot="tabs" tab-id="dat-details">Details</aegov-tab>
    <aegov-tab slot="tabs" tab-id="dat-settings">Settings</aegov-tab>
    <aegov-tab-panel tab-id="dat-overview">Overview content.</aegov-tab-panel>
    <aegov-tab-panel tab-id="dat-details">Details content (active on load).</aegov-tab-panel>
    <aegov-tab-panel tab-id="dat-settings">Settings content.</aegov-tab-panel>
  </aegov-tabs>
</div>

---

## Disabled Tabs

Set the `disabled` attribute on individual `<aegov-tab>` elements to prevent interaction. Disabled tabs are visually muted and cannot be activated by click or keyboard.

```html
<aegov-tabs>
  <aegov-tab slot="tabs" tab-id="tab1">Active Tab</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab2" disabled>Disabled Tab</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab3">Another Tab</aegov-tab>
  <aegov-tab-panel tab-id="tab1">First panel content.</aegov-tab-panel>
  <aegov-tab-panel tab-id="tab2">This panel cannot be reached.</aegov-tab-panel>
  <aegov-tab-panel tab-id="tab3">Third panel content.</aegov-tab-panel>
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tabs>
    <aegov-tab slot="tabs" tab-id="dis-1">Active Tab</aegov-tab>
    <aegov-tab slot="tabs" tab-id="dis-2" disabled>Disabled Tab</aegov-tab>
    <aegov-tab slot="tabs" tab-id="dis-3">Another Tab</aegov-tab>
    <aegov-tab-panel tab-id="dis-1">First panel content.</aegov-tab-panel>
    <aegov-tab-panel tab-id="dis-2">This panel cannot be reached.</aegov-tab-panel>
    <aegov-tab-panel tab-id="dis-3">Third panel content.</aegov-tab-panel>
  </aegov-tabs>
</div>

---

## Icons in Tabs

Tabs support optional icon slots. Use `slot="icon"` for a leading icon and `slot="icon-end"` for a trailing icon. Icons are automatically sized to match the current tab size.

```html
<aegov-tabs>
  <aegov-tab slot="tabs" tab-id="tab1">
    <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
    Home
  </aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab2">
    <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
    Profile
  </aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab3">
    <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
    Settings
  </aegov-tab>
  <aegov-tab-panel tab-id="tab1">Home content.</aegov-tab-panel>
  <aegov-tab-panel tab-id="tab2">Profile content.</aegov-tab-panel>
  <aegov-tab-panel tab-id="tab3">Settings content.</aegov-tab-panel>
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tabs>
    <aegov-tab slot="tabs" tab-id="icon-1">
      <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      Home
    </aegov-tab>
    <aegov-tab slot="tabs" tab-id="icon-2">
      <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      Profile
    </aegov-tab>
    <aegov-tab slot="tabs" tab-id="icon-3">
      <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
      Settings
    </aegov-tab>
    <aegov-tab-panel tab-id="icon-1">Home content.</aegov-tab-panel>
    <aegov-tab-panel tab-id="icon-2">Profile content.</aegov-tab-panel>
    <aegov-tab-panel tab-id="icon-3">Settings content.</aegov-tab-panel>
  </aegov-tabs>
</div>

Icons also work with segmented and pill variants:

<div class="flex flex-wrap gap-8 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div>
    <p class="text-xs text-aeblack-400 mb-2">Segmented with icons</p>
    <aegov-tabs variant="segmented">
      <aegov-tab slot="tabs" tab-id="iseg-1">
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        Grid
      </aegov-tab>
      <aegov-tab slot="tabs" tab-id="iseg-2">
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
        List
      </aegov-tab>
      <aegov-tab-panel tab-id="iseg-1">Grid view content.</aegov-tab-panel>
      <aegov-tab-panel tab-id="iseg-2">List view content.</aegov-tab-panel>
    </aegov-tabs>
  </div>
  <div>
    <p class="text-xs text-aeblack-400 mb-2">Pill with icons</p>
    <aegov-tabs variant="pill">
      <aegov-tab slot="tabs" tab-id="ipill-1">
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        Grid
      </aegov-tab>
      <aegov-tab slot="tabs" tab-id="ipill-2">
        <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
        List
      </aegov-tab>
      <aegov-tab-panel tab-id="ipill-1">Grid view content.</aegov-tab-panel>
      <aegov-tab-panel tab-id="ipill-2">List view content.</aegov-tab-panel>
    </aegov-tabs>
  </div>
</div>

---

## Stretched Tabs

Set the `stretch` attribute on `<aegov-tabs>` to distribute tabs evenly across the full width of the container. Each tab grows equally to fill available space.

```html
<aegov-tabs stretch>
  <aegov-tab slot="tabs" tab-id="tab1">Overview</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab2">Details</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab3">Settings</aegov-tab>
  <aegov-tab-panel tab-id="tab1">Overview panel.</aegov-tab-panel>
  <aegov-tab-panel tab-id="tab2">Details panel.</aegov-tab-panel>
  <aegov-tab-panel tab-id="tab3">Settings panel.</aegov-tab-panel>
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tabs stretch>
    <aegov-tab slot="tabs" tab-id="str-1">Overview</aegov-tab>
    <aegov-tab slot="tabs" tab-id="str-2">Details</aegov-tab>
    <aegov-tab slot="tabs" tab-id="str-3">Settings</aegov-tab>
    <aegov-tab-panel tab-id="str-1">Overview panel content.</aegov-tab-panel>
    <aegov-tab-panel tab-id="str-2">Details panel content.</aegov-tab-panel>
    <aegov-tab-panel tab-id="str-3">Settings panel content.</aegov-tab-panel>
  </aegov-tabs>
</div>

Stretch works with all variants:

<div class="space-y-8 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div>
    <p class="text-xs text-aeblack-400 mb-2">Segmented + stretch</p>
    <aegov-tabs variant="segmented" stretch>
      <aegov-tab slot="tabs" tab-id="strseg-1">Overview</aegov-tab>
      <aegov-tab slot="tabs" tab-id="strseg-2">Details</aegov-tab>
      <aegov-tab slot="tabs" tab-id="strseg-3">Settings</aegov-tab>
      <aegov-tab-panel tab-id="strseg-1">Overview content.</aegov-tab-panel>
      <aegov-tab-panel tab-id="strseg-2">Details content.</aegov-tab-panel>
      <aegov-tab-panel tab-id="strseg-3">Settings content.</aegov-tab-panel>
    </aegov-tabs>
  </div>
  <div>
    <p class="text-xs text-aeblack-400 mb-2">Pill + stretch</p>
    <aegov-tabs variant="pill" stretch>
      <aegov-tab slot="tabs" tab-id="strpill-1">Overview</aegov-tab>
      <aegov-tab slot="tabs" tab-id="strpill-2">Details</aegov-tab>
      <aegov-tab slot="tabs" tab-id="strpill-3">Settings</aegov-tab>
      <aegov-tab-panel tab-id="strpill-1">Overview content.</aegov-tab-panel>
      <aegov-tab-panel tab-id="strpill-2">Details content.</aegov-tab-panel>
      <aegov-tab-panel tab-id="strpill-3">Settings content.</aegov-tab-panel>
    </aegov-tabs>
  </div>
</div>

---

## Scrollable Tabs

When there are many tabs that overflow the container, set the `scrollable` attribute to enable horizontal scrolling. A faded gradient edge appears to indicate that more tabs are available.

```html
<aegov-tabs scrollable>
  <aegov-tab slot="tabs" tab-id="tab1">Dashboard</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab2">Analytics</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab3">Reports</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab4">Users</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab5">Permissions</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab6">Notifications</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab7">Integrations</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab8">Billing</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab9">Support</aegov-tab>
  <!-- panels omitted for brevity -->
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov" style="max-width: 500px;">
  <aegov-tabs scrollable>
    <aegov-tab slot="tabs" tab-id="scr-1">Dashboard</aegov-tab>
    <aegov-tab slot="tabs" tab-id="scr-2">Analytics</aegov-tab>
    <aegov-tab slot="tabs" tab-id="scr-3">Reports</aegov-tab>
    <aegov-tab slot="tabs" tab-id="scr-4">Users</aegov-tab>
    <aegov-tab slot="tabs" tab-id="scr-5">Permissions</aegov-tab>
    <aegov-tab slot="tabs" tab-id="scr-6">Notifications</aegov-tab>
    <aegov-tab slot="tabs" tab-id="scr-7">Integrations</aegov-tab>
    <aegov-tab slot="tabs" tab-id="scr-8">Billing</aegov-tab>
    <aegov-tab slot="tabs" tab-id="scr-9">Support</aegov-tab>
    <aegov-tab-panel tab-id="scr-1">Dashboard content.</aegov-tab-panel>
    <aegov-tab-panel tab-id="scr-2">Analytics content.</aegov-tab-panel>
    <aegov-tab-panel tab-id="scr-3">Reports content.</aegov-tab-panel>
    <aegov-tab-panel tab-id="scr-4">Users content.</aegov-tab-panel>
    <aegov-tab-panel tab-id="scr-5">Permissions content.</aegov-tab-panel>
    <aegov-tab-panel tab-id="scr-6">Notifications content.</aegov-tab-panel>
    <aegov-tab-panel tab-id="scr-7">Integrations content.</aegov-tab-panel>
    <aegov-tab-panel tab-id="scr-8">Billing content.</aegov-tab-panel>
    <aegov-tab-panel tab-id="scr-9">Support content.</aegov-tab-panel>
  </aegov-tabs>
</div>

> **Note:** The scrollbar is visually hidden but the tab list remains scrollable via mouse drag, trackpad, or touch. When a tab is activated via keyboard, it is automatically scrolled into view.

---

## Vertical Orientation

Set `orientation="vertical"` to display the tab list alongside the panels instead of above them. The tab triggers stack vertically with the panels to their right (or left in RTL).

```html
<aegov-tabs orientation="vertical">
  <aegov-tab slot="tabs" tab-id="tab1">General</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab2">Security</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab3">Notifications</aegov-tab>
  <aegov-tab-panel tab-id="tab1">General settings panel.</aegov-tab-panel>
  <aegov-tab-panel tab-id="tab2">Security settings panel.</aegov-tab-panel>
  <aegov-tab-panel tab-id="tab3">Notification settings panel.</aegov-tab-panel>
</aegov-tabs>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tabs orientation="vertical">
    <aegov-tab slot="tabs" tab-id="vert-1">General</aegov-tab>
    <aegov-tab slot="tabs" tab-id="vert-2">Security</aegov-tab>
    <aegov-tab slot="tabs" tab-id="vert-3">Notifications</aegov-tab>
    <aegov-tab-panel tab-id="vert-1">General settings content goes here. This panel appears to the right of the tab list in LTR layouts.</aegov-tab-panel>
    <aegov-tab-panel tab-id="vert-2">Security settings content goes here.</aegov-tab-panel>
    <aegov-tab-panel tab-id="vert-3">Notification preferences content goes here.</aegov-tab-panel>
  </aegov-tabs>
</div>

Vertical orientation works with all three variants:

<div class="space-y-8 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div>
    <p class="text-xs text-aeblack-400 mb-2">Segmented + vertical</p>
    <aegov-tabs variant="segmented" orientation="vertical">
      <aegov-tab slot="tabs" tab-id="vseg-1">General</aegov-tab>
      <aegov-tab slot="tabs" tab-id="vseg-2">Security</aegov-tab>
      <aegov-tab slot="tabs" tab-id="vseg-3">Notifications</aegov-tab>
      <aegov-tab-panel tab-id="vseg-1">General settings content.</aegov-tab-panel>
      <aegov-tab-panel tab-id="vseg-2">Security settings content.</aegov-tab-panel>
      <aegov-tab-panel tab-id="vseg-3">Notification settings content.</aegov-tab-panel>
    </aegov-tabs>
  </div>
  <div>
    <p class="text-xs text-aeblack-400 mb-2">Pill + vertical</p>
    <aegov-tabs variant="pill" orientation="vertical">
      <aegov-tab slot="tabs" tab-id="vpill-1">General</aegov-tab>
      <aegov-tab slot="tabs" tab-id="vpill-2">Security</aegov-tab>
      <aegov-tab slot="tabs" tab-id="vpill-3">Notifications</aegov-tab>
      <aegov-tab-panel tab-id="vpill-1">General settings content.</aegov-tab-panel>
      <aegov-tab-panel tab-id="vpill-2">Security settings content.</aegov-tab-panel>
      <aegov-tab-panel tab-id="vpill-3">Notification settings content.</aegov-tab-panel>
    </aegov-tabs>
  </div>
</div>

In vertical mode, keyboard navigation uses **Arrow Up** and **Arrow Down** instead of Arrow Left and Arrow Right.

---

## Tablist Label

Use the `tablist-label` property to provide a custom accessible label for the tablist. This helps screen readers distinguish between multiple tab groups on the same page.

```html
<aegov-tabs tablist-label="Account settings">
  <aegov-tab slot="tabs" tab-id="tab1">Profile</aegov-tab>
  <aegov-tab slot="tabs" tab-id="tab2">Password</aegov-tab>
  <aegov-tab-panel tab-id="tab1">Profile settings.</aegov-tab-panel>
  <aegov-tab-panel tab-id="tab2">Password settings.</aegov-tab-panel>
</aegov-tabs>
```

---

## Events

The `aegovTabChange` event is emitted on the `<aegov-tabs>` element whenever the active tab changes. The event detail contains the `tab-id` string of the newly active tab.

```html
<aegov-tabs id="my-tabs">
  <aegov-tab slot="tabs" tab-id="overview">Overview</aegov-tab>
  <aegov-tab slot="tabs" tab-id="details">Details</aegov-tab>
  <aegov-tab-panel tab-id="overview">Overview content.</aegov-tab-panel>
  <aegov-tab-panel tab-id="details">Details content.</aegov-tab-panel>
</aegov-tabs>

<script>
  document.getElementById('my-tabs')
    .addEventListener('aegovTabChange', (e) => {
      console.log('Active tab changed to:', e.detail);
    });
</script>
```

---

## RTL Support

The component fully supports right-to-left layouts. When the document or a parent element has `dir="rtl"`, the tab layout, scroll fades, keyboard navigation, and vertical border positions automatically mirror.

```html
<div dir="rtl">
  <aegov-tabs>
    <aegov-tab slot="tabs" tab-id="tab1">نظرة عامة</aegov-tab>
    <aegov-tab slot="tabs" tab-id="tab2">التفاصيل</aegov-tab>
    <aegov-tab slot="tabs" tab-id="tab3">الإعدادات</aegov-tab>
    <aegov-tab-panel tab-id="tab1">محتوى نظرة عامة.</aegov-tab-panel>
    <aegov-tab-panel tab-id="tab2">محتوى التفاصيل.</aegov-tab-panel>
    <aegov-tab-panel tab-id="tab3">محتوى الإعدادات.</aegov-tab-panel>
  </aegov-tabs>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tabs>
    <aegov-tab slot="tabs" tab-id="rtl-1">نظرة عامة</aegov-tab>
    <aegov-tab slot="tabs" tab-id="rtl-2">التفاصيل</aegov-tab>
    <aegov-tab slot="tabs" tab-id="rtl-3">الإعدادات</aegov-tab>
    <aegov-tab-panel tab-id="rtl-1">محتوى نظرة عامة.</aegov-tab-panel>
    <aegov-tab-panel tab-id="rtl-2">محتوى التفاصيل.</aegov-tab-panel>
    <aegov-tab-panel tab-id="rtl-3">محتوى الإعدادات.</aegov-tab-panel>
  </aegov-tabs>
</div>

No additional configuration is needed — keyboard arrow keys are automatically reversed in RTL mode.

---

## API Reference

### aegov-tabs Properties

| Property           | Attribute            | Description                                                                 | Type                                | Default          |
|--------------------|----------------------|-----------------------------------------------------------------------------|-------------------------------------|------------------|
| `variant`          | `variant`            | Visual style of the tab triggers                                           | `'simple'` \| `'segmented'` \| `'pill'` | `'simple'`       |
| `size`             | `size`               | Size of the tab triggers. Supports responsive strings (e.g. `'sm xl:lg'`). | `'sm'` \| `'base'` \| `'lg'`       | `'base'`         |
| `defaultActiveTab` | `default-active-tab` | The tab-id of the initially active tab                                     | `string`                            | `''`             |
| `scrollable`       | `scrollable`         | Enables horizontal scrolling when tabs overflow                            | `boolean`                           | `false`          |
| `stretch`          | `stretch`            | Distributes tabs evenly across full width                                  | `boolean`                           | `false`          |
| `orientation`      | `orientation`        | Layout direction of the tab list                                           | `'horizontal'` \| `'vertical'`     | `'horizontal'`   |
| `tablistLabel`     | `tablist-label`      | Accessible label for the tablist element                                   | `string`                            | `'Tabs'`         |

### aegov-tab Properties

| Property      | Attribute      | Description                                                      | Type                                | Default      |
|---------------|----------------|------------------------------------------------------------------|-------------------------------------|--------------|
| `tabId`       | `tab-id`       | Unique identifier matching the corresponding panel's tab-id      | `string`                            | **(required)** |
| `disabled`    | `disabled`     | Disables this tab so it cannot be activated                      | `boolean`                           | `false`      |
| `activeTabId` | `active-tab-id`| Currently active tab id (set automatically by parent)            | `string`                            | `''`         |
| `variant`     | `variant`      | Visual variant (set automatically by parent)                     | `'simple'` \| `'segmented'` \| `'pill'` | `'simple'`   |
| `size`        | `size`         | Size of the tab (set automatically by parent)                    | `'sm'` \| `'base'` \| `'lg'`       | `'base'`     |
| `orientation` | `orientation`  | Orientation (set automatically by parent)                        | `'horizontal'` \| `'vertical'`     | `'horizontal'` |

### aegov-tab-panel Properties

| Property | Attribute | Description                                                  | Type      | Default          |
|----------|-----------|--------------------------------------------------------------|-----------|------------------|
| `tabId`  | `tab-id`  | Unique identifier matching the corresponding tab's tab-id    | `string`  | **(required)**   |
| `active` | `active`  | Whether this panel is currently visible (set by parent)      | `boolean` | `false`          |

### Events

| Event            | Description                                       | Detail Type | Emitted by     |
|------------------|---------------------------------------------------|-------------|----------------|
| `aegovTabChange` | Emitted when the active tab changes               | `string`    | `aegov-tabs`   |
| `aegovTabSelect` | Emitted when a tab trigger is clicked (internal)  | `string`    | `aegov-tab`    |

> **Note:** The `aegovTabSelect` event is an internal event that bubbles from `<aegov-tab>` to `<aegov-tabs>`. Listen to `aegovTabChange` on the `<aegov-tabs>` element for tab change notifications.

### Slots

#### aegov-tabs

| Slot      | Description                                                          |
|-----------|----------------------------------------------------------------------|
| `tabs`    | Place `<aegov-tab>` elements here with `slot="tabs"`                |
| (default) | Place `<aegov-tab-panel>` elements here (no slot attribute needed)  |

#### aegov-tab

| Slot        | Description                        |
|-------------|------------------------------------|
| (default)   | Tab label text                     |
| `icon`      | Optional icon before the label     |
| `icon-end`  | Optional icon after the label      |

#### aegov-tab-panel

| Slot      | Description              |
|-----------|--------------------------|
| (default) | The panel content        |

---

## Accessibility

The `aegov-tabs` component implements the [WAI-ARIA Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) with full keyboard support.

### Built-in Features

- **`role="tablist"`** — the tab list container is marked with the tablist role. The `aria-label` is configurable via the `tablist-label` property.
- **`aria-orientation`** — set to `"horizontal"` or `"vertical"` based on the `orientation` property, so assistive technologies know the expected keyboard navigation direction.
- **`role="tab"`** — each tab trigger has the tab role with `aria-selected` set to `"true"` for the active tab and `"false"` for inactive ones.
- **`aria-controls`** — each tab trigger references its corresponding panel via `aria-controls="panel-{tab-id}"`.
- **`aria-disabled`** — set to `"true"` on disabled tabs along with the native `disabled` attribute.
- **`role="tabpanel"`** — each panel has the tabpanel role with `aria-labelledby="tab-{tab-id}"` linking back to its trigger.
- **`tabIndex` management** — only the active tab has `tabIndex="0"`. Inactive tabs have `tabIndex="-1"` so users can Tab past the entire tab list in one step, then use arrow keys to navigate between tabs.
- **`hidden` attribute** — inactive panels are hidden from both visual display and assistive technologies.

### Keyboard Navigation

| Key                  | Horizontal Tabs          | Vertical Tabs            |
|----------------------|--------------------------|--------------------------|
| **Arrow Right**      | Next tab                 | —                        |
| **Arrow Left**       | Previous tab             | —                        |
| **Arrow Down**       | —                        | Next tab                 |
| **Arrow Up**         | —                        | Previous tab             |
| **Home**             | First tab                | First tab                |
| **End**              | Last tab                 | Last tab                 |
| **Tab**              | Move to panel content    | Move to panel content    |

Arrow keys wrap around — pressing Right on the last tab moves focus to the first tab. Disabled tabs are skipped during keyboard navigation. In RTL mode, Arrow Right and Arrow Left are reversed.

### Developer Responsibilities

1. **Provide meaningful tab labels.** Each `<aegov-tab>` should contain descriptive text so that screen readers can announce the tab's purpose.

2. **Use `tablist-label` for multiple tab groups.** If a page contains more than one tabs component, give each a unique `tablist-label` so screen readers can distinguish them.

3. **Use icons with text, not alone.** Unlike buttons, tabs do not support `aria-label` directly. Always include visible text alongside icons in tabs.

---

## Notes

- The `<aegov-tabs>` component manages all state internally. You do not need to manually set `active` on panels or `activeTabId` on tabs — the parent component handles this automatically.
- The `tab-id` attribute must be unique within each `<aegov-tabs>` instance and must match between an `<aegov-tab>` and its corresponding `<aegov-tab-panel>`.
- Properties like `variant`, `size`, and `orientation` are set on the parent `<aegov-tabs>` and automatically propagated to all child `<aegov-tab>` elements. Do not set these on individual tabs.
- The `scrollable` and `stretch` properties are mutually exclusive in practice — stretching tabs to fill the width eliminates the need for scrolling.
- In scrollable mode, the native scrollbar is hidden for a clean appearance. Users can scroll via mouse drag, trackpad gestures, or touch input.
- When a tab is activated via keyboard in scrollable mode, the active tab is automatically scrolled into view with smooth animation.
- The `aegovTabSelect` event from `<aegov-tab>` is an internal event intercepted by `<aegov-tabs>`. Use the `aegovTabChange` event on the parent for external listeners.
- SVG icons placed in the `icon` and `icon-end` slots are automatically sized based on the current tab size (14px for sm, 16px for base, 20px for lg).
