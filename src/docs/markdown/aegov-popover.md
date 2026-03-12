# Popover

<p class="text-lg text-aeblack-500 mb-8">A popover displays rich content in a floating panel with an arrow marker, positioned relative to a trigger element. Use it for contextual details, inline forms, supplementary information, or any content that needs more space than a tooltip but less commitment than a modal.</p>

## Introduction

The `aegov-popover` component provides a positioned floating panel with an arrow that points to its trigger element. It supports **4 positions**, **3 alignments**, **2 trigger types** (click and hover), focus trapping, and automatic viewport-aware repositioning. Content is rendered through a portal to `document.body`, avoiding overflow clipping from parent containers.

Unlike a tooltip (which is primarily for brief text labels), popovers support rich, interactive content — including buttons, links, forms, and other web components. Unlike a dropdown (which uses `role="menu"` for action lists), popovers use `role="dialog"` and are suited for supplementary content panels.

```html
<aegov-popover>
  <aegov-button>Show Details</aegov-button>
  <div slot="popover-content">
    <p class="text-sm text-aeblack-700">This is a popover with rich content.</p>
    <aegov-button size="sm" variant="outline">Action</aegov-button>
  </div>
</aegov-popover>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-popover>
    <aegov-button>Show Details</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-700 mb-3">This is a popover with rich content and interactive elements.</p>
      <aegov-button size="sm" variant="outline">Action</aegov-button>
    </div>
  </aegov-popover>
</div>

---

## Trigger Types

The `trigger-type` property controls how the popover is activated. There are two options.

### Click (Default)

The popover opens on click and closes when clicking outside, pressing Escape, or clicking the trigger again.

```html
<aegov-popover trigger-type="click">
  <aegov-button>Click Me</aegov-button>
  <div slot="popover-content">
    <p class="font-semibold text-sm mb-2">Account Info</p>
    <p class="text-sm text-aeblack-600">You are logged in as admin@example.com</p>
  </div>
</aegov-popover>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-popover trigger-type="click">
    <aegov-button>Click Trigger</aegov-button>
    <div slot="popover-content">
      <p class="font-semibold text-sm mb-2">Account Info</p>
      <p class="text-sm text-aeblack-600 mb-0">You are logged in as admin@example.com</p>
    </div>
  </aegov-popover>
</div>

### Hover

The popover opens when the cursor enters the trigger area and closes when the cursor leaves both the trigger and the popover panel. A built-in grace period (minimum 100ms) allows the cursor to cross the gap between trigger and panel without closing.

```html
<aegov-popover trigger-type="hover">
  <aegov-button variant="outline">Hover Me</aegov-button>
  <div slot="popover-content">
    <p class="text-sm text-aeblack-600">This appears on hover and stays open while you interact.</p>
  </div>
</aegov-popover>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-popover trigger-type="hover">
    <aegov-button variant="outline">Hover Trigger</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">This appears on hover and stays open while you interact with the content.</p>
    </div>
  </aegov-popover>
</div>

---

## Position

The `position` property sets where the popover panel appears relative to the trigger. The component automatically flips to the opposite side if there is not enough viewport space.

| Position  | Description                        |
|-----------|------------------------------------|
| `bottom`  | Default. Below the trigger.        |
| `top`     | Above the trigger.                 |
| `left`    | To the left of the trigger.        |
| `right`   | To the right of the trigger.       |

```html
<aegov-popover position="bottom">…</aegov-popover>
<aegov-popover position="top">…</aegov-popover>
<aegov-popover position="left">…</aegov-popover>
<aegov-popover position="right">…</aegov-popover>
```

### Bottom (Default)

<div class="flex flex-wrap justify-center gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-popover position="bottom">
    <aegov-button size="sm">Bottom</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">Popover positioned below the trigger. The arrow points upward.</p>
    </div>
  </aegov-popover>
</div>

### Top

<div class="flex flex-wrap justify-center gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-popover position="top">
    <aegov-button size="sm" variant="outline">Top</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">Popover positioned above the trigger. The arrow points downward.</p>
    </div>
  </aegov-popover>
</div>

### Left

<div class="flex flex-wrap justify-center gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-popover position="left">
    <aegov-button size="sm" variant="soft">Left</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">Popover positioned to the left. The arrow points right.</p>
    </div>
  </aegov-popover>
</div>

### Right

<div class="flex flex-wrap justify-center gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-popover position="right">
    <aegov-button size="sm" appearance="secondary">Right</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">Popover positioned to the right. The arrow points left.</p>
    </div>
  </aegov-popover>
</div>

### All Positions Together

<div class="flex flex-wrap items-center justify-center gap-3 p-12 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-popover position="top">
    <aegov-button size="sm">Top</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">Arrow points down</p>
    </div>
  </aegov-popover>
  <aegov-popover position="bottom">
    <aegov-button size="sm">Bottom</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">Arrow points up</p>
    </div>
  </aegov-popover>
  <aegov-popover position="left">
    <aegov-button size="sm">Left</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">Arrow points right</p>
    </div>
  </aegov-popover>
  <aegov-popover position="right">
    <aegov-button size="sm">Right</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">Arrow points left</p>
    </div>
  </aegov-popover>
</div>

---

## Alignment

The `align` property controls how the popover panel is aligned along the secondary axis relative to the trigger.

| Align    | Description                                                  |
|----------|--------------------------------------------------------------|
| `start`  | Aligns the leading edge of the panel with the trigger.       |
| `center` | Default. Centres the panel relative to the trigger.          |
| `end`    | Aligns the trailing edge of the panel with the trigger.      |

```html
<aegov-popover align="start">…</aegov-popover>
<aegov-popover align="center">…</aegov-popover>
<aegov-popover align="end">…</aegov-popover>
```

<div class="flex flex-wrap items-center gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-popover align="start">
    <aegov-button size="sm">Align Start</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">Panel starts at the trigger's leading edge. Arrow tracks trigger center.</p>
    </div>
  </aegov-popover>
  <aegov-popover align="center">
    <aegov-button size="sm" variant="outline">Align Center</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">Panel centred on the trigger. Arrow is centred too.</p>
    </div>
  </aegov-popover>
  <aegov-popover align="end">
    <aegov-button size="sm" variant="soft">Align End</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">Panel ends at the trigger's trailing edge. Arrow tracks trigger center.</p>
    </div>
  </aegov-popover>
</div>

### Combined Position and Alignment

<div class="flex flex-wrap items-center gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-popover position="top" align="start">
    <aegov-button size="sm" variant="soft">Top Start</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">position="top" align="start"</p>
    </div>
  </aegov-popover>
  <aegov-popover position="top" align="end">
    <aegov-button size="sm" variant="soft">Top End</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">position="top" align="end"</p>
    </div>
  </aegov-popover>
  <aegov-popover position="right" align="start">
    <aegov-button size="sm" variant="soft">Right Start</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">position="right" align="start"</p>
    </div>
  </aegov-popover>
  <aegov-popover position="right" align="end">
    <aegov-button size="sm" variant="soft">Right End</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">position="right" align="end"</p>
    </div>
  </aegov-popover>
</div>

---

## Arrow Marker

Every popover includes an arrow element that visually connects the panel to its trigger. The arrow automatically adjusts its position based on the trigger's centre point and the current popover position. Border sides facing the panel interior are hidden for a clean appearance.

| Position | Arrow location   | Arrow points |
|----------|------------------|--------------|
| `top`    | Bottom of panel  | Downward     |
| `bottom` | Top of panel     | Upward       |
| `left`   | Right of panel   | Rightward    |
| `right`  | Left of panel    | Leftward     |

The arrow's offset is clamped to stay within the panel's rounded corners, so it never overflows even when the panel is repositioned due to viewport constraints.

<div class="flex flex-wrap justify-center gap-6 p-12 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-popover position="top">
    <aegov-button variant="outline" size="sm">Arrow Down</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">Arrow at the bottom pointing down</p>
    </div>
  </aegov-popover>
  <aegov-popover position="bottom">
    <aegov-button variant="outline" size="sm">Arrow Up</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">Arrow at the top pointing up</p>
    </div>
  </aegov-popover>
  <aegov-popover position="left">
    <aegov-button variant="outline" size="sm">Arrow Right</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">Arrow on the right pointing right</p>
    </div>
  </aegov-popover>
  <aegov-popover position="right">
    <aegov-button variant="outline" size="sm">Arrow Left</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">Arrow on the left pointing left</p>
    </div>
  </aegov-popover>
</div>

---

## Gap and Offset

The `gap` property controls the distance (in pixels) between the trigger and the popover panel. The default is `10`. The `offset` property shifts the panel along the secondary axis.

```html
<aegov-popover gap="0">…</aegov-popover>
<aegov-popover gap="20">…</aegov-popover>
<aegov-popover offset="30">…</aegov-popover>
```

<div class="flex flex-wrap items-center gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-popover gap="0">
    <aegov-button size="sm">Gap 0</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">Flush with the trigger — no space between them.</p>
    </div>
  </aegov-popover>
  <aegov-popover gap="10">
    <aegov-button size="sm" variant="outline">Gap 10 (default)</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">Default 10px gap between trigger and panel.</p>
    </div>
  </aegov-popover>
  <aegov-popover gap="24">
    <aegov-button size="sm" variant="soft">Gap 24</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">Generous 24px gap for breathing room.</p>
    </div>
  </aegov-popover>
  <aegov-popover offset="40">
    <aegov-button size="sm" appearance="secondary">Offset 40</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">Shifted 40px along the secondary axis.</p>
    </div>
  </aegov-popover>
</div>

---

## Popover Content

The `popover-content` slot accepts any HTML. Because popovers use `role="dialog"` rather than `role="menu"`, they are suited for rich, structured content panels rather than simple action lists.

### Simple Text

```html
<aegov-popover>
  <aegov-button>Info</aegov-button>
  <div slot="popover-content">
    <p class="font-semibold text-sm mb-1">What is a Popover?</p>
    <p class="text-sm text-aeblack-500">A popover is a floating panel anchored to a trigger. It provides supplementary information or interactive controls.</p>
  </div>
</aegov-popover>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-popover>
    <aegov-button>Info</aegov-button>
    <div slot="popover-content" style="width: 18rem;">
      <p class="font-semibold text-sm mb-1">What is a Popover?</p>
      <p class="text-sm text-aeblack-500 mb-0">A popover is a floating panel anchored to a trigger. It provides supplementary information or interactive controls.</p>
    </div>
  </aegov-popover>
</div>

### With Components

Popovers fully support Stencil web components inside the `popover-content` slot — including buttons, separators, avatars, badges, and more. The original slot content is **moved** (not cloned) into the portal, so components initialise correctly without double-rendering.

```html
<aegov-popover>
  <aegov-button>User Profile</aegov-button>
  <div slot="popover-content" style="width: 20rem;">
    <div class="flex items-center gap-3 mb-3">
      <aegov-avatar size="lg">JD</aegov-avatar>
      <div>
        <p class="font-semibold text-sm mb-0">Jane Doe</p>
        <p class="text-xs text-aeblack-500 mb-0">jane.doe@example.com</p>
      </div>
    </div>
    <aegov-separator variant="subtle"></aegov-separator>
    <div class="flex gap-2 mt-3">
      <aegov-button size="sm" variant="outline">View Profile</aegov-button>
      <aegov-button size="sm" variant="soft" appearance="danger">Sign Out</aegov-button>
    </div>
  </div>
</aegov-popover>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-popover>
    <aegov-button>User Profile</aegov-button>
    <div slot="popover-content" style="width: 20rem;">
      <div class="flex items-center gap-3 mb-3">
        <aegov-avatar size="lg">JD</aegov-avatar>
        <div>
          <p class="font-semibold text-sm mb-0">Jane Doe</p>
          <p class="text-xs text-aeblack-500 mb-0">jane.doe@example.com</p>
        </div>
      </div>
      <aegov-separator variant="subtle"></aegov-separator>
      <div class="flex gap-2 mt-3">
        <aegov-button size="sm" variant="outline">View Profile</aegov-button>
        <aegov-button size="sm" variant="soft" appearance="danger">Sign Out</aegov-button>
      </div>
    </div>
  </aegov-popover>
</div>

### With Links and Actions

```html
<aegov-popover>
  <aegov-button variant="outline">Quick Actions</aegov-button>
  <div slot="popover-content" style="width: 16rem;">
    <p class="text-xs font-semibold text-aeblack-400 uppercase tracking-wider mb-2">Navigation</p>
    <a href="#" class="block px-2 py-1.5 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Dashboard</a>
    <a href="#" class="block px-2 py-1.5 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Analytics</a>
    <a href="#" class="block px-2 py-1.5 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Reports</a>
    <aegov-separator variant="subtle"></aegov-separator>
    <a href="#" class="block px-2 py-1.5 text-sm text-aered-600 rounded hover:bg-aered-50 no-underline">Sign Out</a>
  </div>
</aegov-popover>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-popover>
    <aegov-button variant="outline">Quick Actions</aegov-button>
    <div slot="popover-content" style="width: 16rem;">
      <p class="text-xs font-semibold text-aeblack-400 uppercase tracking-wider mb-2 mt-0">Navigation</p>
      <a href="#" class="block px-2 py-1.5 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Dashboard</a>
      <a href="#" class="block px-2 py-1.5 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Analytics</a>
      <a href="#" class="block px-2 py-1.5 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Reports</a>
      <aegov-separator variant="subtle"></aegov-separator>
      <a href="#" class="block px-2 py-1.5 text-sm text-aered-600 rounded hover:bg-aered-50 no-underline">Sign Out</a>
    </div>
  </aegov-popover>
</div>

### Rich Multi-Section Panel

Set an inline `style="width: ..."` on the slotted container to override the default minimum width for wider layouts.

```html
<aegov-popover>
  <aegov-button>Services</aegov-button>
  <div slot="popover-content" style="width: 32rem;">
    <p class="text-xs font-semibold text-aeblack-400 uppercase tracking-wider mb-2">Platform</p>
    <div class="grid grid-cols-2 gap-1">
      <a href="#" class="p-3 rounded-lg hover:bg-aeblack-50 no-underline">
        <p class="font-semibold text-sm text-aeblack-800">Analytics</p>
        <p class="text-xs text-aeblack-500 mt-0.5">Track performance and insights</p>
      </a>
      <!-- …more items -->
    </div>
    <aegov-separator variant="subtle"></aegov-separator>
    <p class="text-xs font-semibold text-aeblack-400 uppercase tracking-wider mb-2">Resources</p>
    <a href="#" class="p-3 rounded-lg hover:bg-aeblack-50 no-underline">
      <p class="font-semibold text-sm text-aeblack-800">Documentation</p>
      <p class="text-xs text-aeblack-500 mt-0.5">Guides, references, and tutorials</p>
    </a>
  </div>
</aegov-popover>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-popover>
    <aegov-button>Services</aegov-button>
    <div slot="popover-content" style="width: 32rem;">
      <p class="text-xs font-semibold text-aeblack-400 uppercase tracking-wider mb-2 mt-0">Platform</p>
      <div class="grid grid-cols-2 gap-1">
        <a href="#" class="p-3 rounded-lg hover:bg-aeblack-50 no-underline">
          <p class="font-semibold text-sm text-aeblack-800 mt-0 mb-0">Analytics</p>
          <p class="text-xs text-aeblack-500 mt-0.5 mb-0">Track performance and insights</p>
        </a>
        <a href="#" class="p-3 rounded-lg hover:bg-aeblack-50 no-underline">
          <p class="font-semibold text-sm text-aeblack-800 mt-0 mb-0">Automation</p>
          <p class="text-xs text-aeblack-500 mt-0.5 mb-0">Workflows and scheduled tasks</p>
        </a>
        <a href="#" class="p-3 rounded-lg hover:bg-aeblack-50 no-underline">
          <p class="font-semibold text-sm text-aeblack-800 mt-0 mb-0">Integrations</p>
          <p class="text-xs text-aeblack-500 mt-0.5 mb-0">Connect third-party services</p>
        </a>
        <a href="#" class="p-3 rounded-lg hover:bg-aeblack-50 no-underline">
          <p class="font-semibold text-sm text-aeblack-800 mt-0 mb-0">Security</p>
          <p class="text-xs text-aeblack-500 mt-0.5 mb-0">Permissions, audit logs, and SSO</p>
        </a>
      </div>
      <aegov-separator variant="subtle"></aegov-separator>
      <p class="text-xs font-semibold text-aeblack-400 uppercase tracking-wider mb-2 mt-0">Resources</p>
      <a href="#" class="p-3 rounded-lg hover:bg-aeblack-50 no-underline">
        <p class="font-semibold text-sm text-aeblack-800 mt-0 mb-0">Documentation</p>
        <p class="text-xs text-aeblack-500 mt-0.5 mb-0">Guides, references, and tutorials</p>
      </a>
      <a href="#" class="p-3 rounded-lg hover:bg-aeblack-50 no-underline">
        <p class="font-semibold text-sm text-aeblack-800 mt-0 mb-0">API Reference</p>
        <p class="text-xs text-aeblack-500 mt-0.5 mb-0">Endpoints, authentication, and SDKs</p>
      </a>
    </div>
  </aegov-popover>
</div>

### Notification Panel

```html
<aegov-popover position="bottom" align="end">
  <aegov-button variant="outline" size="sm">Notifications</aegov-button>
  <div slot="popover-content" style="width: 22rem;">
    <div class="flex items-center justify-between mb-3">
      <p class="font-semibold text-sm mb-0">Notifications</p>
      <aegov-badge color="primary" size="sm">3 new</aegov-badge>
    </div>
    <div class="space-y-2">
      <div class="p-2 rounded bg-primary-50">
        <p class="text-sm font-medium mb-0">New deployment ready</p>
        <p class="text-xs text-aeblack-500 mb-0">2 minutes ago</p>
      </div>
      <div class="p-2 rounded bg-primary-50">
        <p class="text-sm font-medium mb-0">Review requested</p>
        <p class="text-xs text-aeblack-500 mb-0">1 hour ago</p>
      </div>
      <div class="p-2 rounded hover:bg-aeblack-50">
        <p class="text-sm font-medium mb-0">Weekly report available</p>
        <p class="text-xs text-aeblack-500 mb-0">Yesterday</p>
      </div>
    </div>
    <aegov-separator variant="subtle"></aegov-separator>
    <a href="#" class="block text-center text-sm text-primary-600 no-underline hover:underline">View all notifications</a>
  </div>
</aegov-popover>
```

<div class="flex justify-end p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-popover position="bottom" align="end">
    <aegov-button variant="outline" size="sm">Notifications</aegov-button>
    <div slot="popover-content" style="width: 22rem;">
      <div class="flex items-center justify-between mb-3">
        <p class="font-semibold text-sm mb-0 mt-0">Notifications</p>
        <aegov-badge color="primary" size="sm">3 new</aegov-badge>
      </div>
      <div class="space-y-2">
        <div class="p-2 rounded bg-primary-50">
          <p class="text-sm font-medium mb-0 mt-0">New deployment ready</p>
          <p class="text-xs text-aeblack-500 mb-0 mt-0">2 minutes ago</p>
        </div>
        <div class="p-2 rounded bg-primary-50">
          <p class="text-sm font-medium mb-0 mt-0">Review requested</p>
          <p class="text-xs text-aeblack-500 mb-0 mt-0">1 hour ago</p>
        </div>
        <div class="p-2 rounded hover:bg-aeblack-50">
          <p class="text-sm font-medium mb-0 mt-0">Weekly report available</p>
          <p class="text-xs text-aeblack-500 mb-0 mt-0">Yesterday</p>
        </div>
      </div>
      <aegov-separator variant="subtle"></aegov-separator>
      <a href="#" class="block text-center text-sm text-primary-600 no-underline hover:underline">View all notifications</a>
    </div>
  </aegov-popover>
</div>

---

## Show and Hide Delays

The `show-delay` property controls the delay (in milliseconds) before the popover appears. The default is `200`. The `hide-delay` property controls the delay before it closes. The default is `0`. For hover-triggered popovers, a minimum 100ms hide grace period is always enforced.

```html
<aegov-popover trigger-type="hover" show-delay="0">
  <aegov-button>Instant Show</aegov-button>
  <div slot="popover-content">…</div>
</aegov-popover>

<aegov-popover trigger-type="hover" show-delay="500">
  <aegov-button>Slow Show (500ms)</aegov-button>
  <div slot="popover-content">…</div>
</aegov-popover>

<aegov-popover trigger-type="hover" hide-delay="500">
  <aegov-button>Slow Close (500ms)</aegov-button>
  <div slot="popover-content">…</div>
</aegov-popover>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-popover trigger-type="hover" show-delay="0">
    <aegov-button size="sm">Instant Show (hover)</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">show-delay="0" — appears immediately on hover</p>
    </div>
  </aegov-popover>
  <aegov-popover trigger-type="hover" show-delay="500">
    <aegov-button size="sm" variant="outline">500ms Show Delay (hover)</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">show-delay="500" — waits half a second before appearing</p>
    </div>
  </aegov-popover>
  <aegov-popover trigger-type="hover" hide-delay="500">
    <aegov-button size="sm" variant="soft">500ms Hide Delay (hover)</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">hide-delay="500" — stays open for 500ms after cursor leaves</p>
    </div>
  </aegov-popover>
</div>

---

## Disabled State

Set the `disabled` attribute to prevent the popover from opening. The trigger remains visible but interaction is blocked.

```html
<aegov-popover disabled>
  <aegov-button disabled>Disabled Popover</aegov-button>
  <div slot="popover-content">
    <p class="text-sm">This won't show</p>
  </div>
</aegov-popover>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-popover disabled>
    <aegov-button disabled>Disabled Popover</aegov-button>
    <div slot="popover-content">
      <p class="text-sm mb-0">This won't show</p>
    </div>
  </aegov-popover>
</div>

---

## Custom Trigger

The default slot accepts any element as the trigger. You are not limited to buttons — use links, icons, avatars, badges, or any interactive element.

```html
<aegov-popover>
  <aegov-avatar src="https://i.pravatar.cc/150?img=5" size="base"></aegov-avatar>
  <div slot="popover-content" style="width: 16rem;">
    <p class="font-semibold text-sm mb-1">Ahmed Al Mansouri</p>
    <p class="text-xs text-aeblack-500 mb-2">Senior Product Designer</p>
    <aegov-button size="sm" variant="outline">View Profile</aegov-button>
  </div>
</aegov-popover>
```

<div class="flex flex-wrap items-center gap-6 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-popover>
    <aegov-avatar src="https://i.pravatar.cc/150?img=5" size="base"></aegov-avatar>
    <div slot="popover-content" style="width: 16rem;">
      <p class="font-semibold text-sm mb-1 mt-0">Ahmed Al Mansouri</p>
      <p class="text-xs text-aeblack-500 mb-2 mt-0">Senior Product Designer</p>
      <aegov-button size="sm" variant="outline">View Profile</aegov-button>
    </div>
  </aegov-popover>
  <aegov-popover trigger-type="hover">
    <aegov-badge color="techblue">Hover this badge</aegov-badge>
    <div slot="popover-content" style="width: 14rem;">
      <p class="text-sm text-aeblack-600 mb-0">Badges can also serve as popover triggers for supplementary details.</p>
    </div>
  </aegov-popover>
  <aegov-popover trigger-type="hover">
    <span class="inline-flex items-center justify-center size-8 rounded-full bg-aeblack-100 text-aeblack-600 cursor-pointer text-sm font-semibold">?</span>
    <div slot="popover-content" style="width: 16rem;">
      <p class="font-semibold text-sm mb-1 mt-0">Need help?</p>
      <p class="text-sm text-aeblack-500 mb-0">Hover over any element with a help icon to learn more about it.</p>
    </div>
  </aegov-popover>
</div>

---

## Singleton Behaviour

Only one popover can be open at a time. Opening a new popover automatically closes the previously open one. This is managed at the module level and requires no additional configuration.

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-popover>
    <aegov-button size="sm">Popover A</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">Opening Popover B will close this one.</p>
    </div>
  </aegov-popover>
  <aegov-popover>
    <aegov-button size="sm" variant="outline">Popover B</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">Opening Popover A will close this one.</p>
    </div>
  </aegov-popover>
  <aegov-popover>
    <aegov-button size="sm" variant="soft">Popover C</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">Only one popover can be open at a time.</p>
    </div>
  </aegov-popover>
</div>

---

## Events

The component emits events when the popover opens and closes. Use these to synchronise external state or trigger side-effects.

```html
<aegov-popover id="event-demo">
  <aegov-button>Event Demo</aegov-button>
  <div slot="popover-content">
    <p class="text-sm">Open and close to see events fire.</p>
  </div>
</aegov-popover>

<script>
  const popover = document.getElementById('event-demo');
  popover.addEventListener('aegovPopoverOpen', () => {
    console.log('Popover opened');
  });
  popover.addEventListener('aegovPopoverClose', () => {
    console.log('Popover closed');
  });
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-popover id="event-demo-popover">
    <aegov-button>Event Demo</aegov-button>
    <div slot="popover-content">
      <p class="text-sm text-aeblack-600 mb-0">Open and close me to see events in the log below.</p>
    </div>
  </aegov-popover>
  <p id="event-log-popover" class="mt-3 text-sm text-aeblack-500 font-mono">Interact with the popover to see events...</p>
  <script>
    (function() {
      var el = document.getElementById('event-demo-popover');
      var log = document.getElementById('event-log-popover');
      if (el && log) {
        el.addEventListener('aegovPopoverOpen', function() {
          log.textContent = new Date().toLocaleTimeString() + ' — aegovPopoverOpen fired';
        });
        el.addEventListener('aegovPopoverClose', function() {
          log.textContent = new Date().toLocaleTimeString() + ' — aegovPopoverClose fired';
        });
      }
    })();
  </script>
</div>

---

## API Reference

### Properties

| Property      | Attribute      | Description                                              | Type                                             | Default     |
|---------------|----------------|----------------------------------------------------------|--------------------------------------------------|-------------|
| `triggerType` | `trigger-type` | How the popover is activated                             | `'click'` \| `'hover'`                           | `'click'`   |
| `position`    | `position`     | Position of the panel relative to the trigger            | `'top'` \| `'right'` \| `'bottom'` \| `'left'`  | `'bottom'`  |
| `align`       | `align`        | Alignment of the panel along the secondary axis          | `'start'` \| `'center'` \| `'end'`              | `'center'`  |
| `gap`         | `gap`          | Distance between trigger and panel in pixels             | `number`                                         | `10`        |
| `offset`      | `offset`       | Additional offset along the secondary axis in pixels     | `number`                                         | `0`         |
| `disabled`    | `disabled`     | Prevents the popover from opening                        | `boolean`                                        | `false`     |
| `showDelay`   | `show-delay`   | Delay before showing in milliseconds                     | `number`                                         | `200`       |
| `hideDelay`   | `hide-delay`   | Delay before hiding in milliseconds                      | `number`                                         | `0`         |

### Events

| Event                | Description                     | Detail Type |
|----------------------|---------------------------------|-------------|
| `aegovPopoverOpen`   | Emitted when the popover opens  | `void`      |
| `aegovPopoverClose`  | Emitted when the popover closes | `void`      |

#### Listening to Events

```html
<aegov-popover id="my-popover">
  <aegov-button>Trigger</aegov-button>
  <div slot="popover-content">…</div>
</aegov-popover>

<script>
  document.getElementById('my-popover')
    .addEventListener('aegovPopoverOpen', () => {
      console.log('Opened');
    });
</script>
```

### Slots

| Slot               | Description                                                                     |
|--------------------|---------------------------------------------------------------------------------|
| (default)          | The trigger element — a button, link, avatar, badge, or any interactive element. |
| `popover-content`  | The popover panel content — text, links, buttons, components, or any HTML.       |

### Methods

| Method           | Description                        | Signature    |
|------------------|------------------------------------|--------------|
| `closePopover()` | Programmatically closes the popover | `() => void` |

```html
<script>
  // Programmatically close a popover
  document.querySelector('aegov-popover').closePopover();
</script>
```

---

## Accessibility

The `aegov-popover` component is built with accessibility as a first-class concern. The following features are included out of the box.

### Built-in Features

- **`role="dialog"`** — applied to the popover panel. Unlike dropdown (`role="menu"`), popover uses `dialog` because its content is supplementary information rather than an action list.
- **`aria-haspopup="dialog"`** — set on the trigger wrapper to indicate that activating it will display a dialog.
- **`aria-expanded`** — dynamically set to `"true"` when the popover is open and `"false"` when closed.
- **`aria-controls`** — links the trigger to the popover panel's `id` when open.
- **`aria-labelledby`** — the popover panel references the trigger element's `id` so screen readers can announce the relationship.
- **Keyboard navigation** — `ArrowDown` and `ArrowUp` cycle through focusable items, `Tab` moves focus forward, `Shift+Tab` moves backward, `Escape` closes the popover and returns focus to the trigger.
- **Focus trapping** — when the popover opens, focus moves to the first focusable item. Focus cycles within the popover and does not escape to the page behind it.
- **Focus restoration** — when the popover closes (via Escape or outside click), focus returns to the trigger element using `preventScroll` to avoid page jumps.

### Developer Responsibilities

1. **Provide meaningful trigger labels.** If the trigger is an icon-only button, add `aria-label` to describe the popover's purpose.

   ```html
   <aegov-popover>
     <aegov-button aria-label="View notifications">
       <svg>…</svg>
     </aegov-button>
     <div slot="popover-content">…</div>
   </aegov-popover>
   ```

2. **Use semantic content.** Use `<a>` for navigation, `<button>` for actions, and semantic HTML elements for structure. Avoid `<div>` or `<span>` for interactive items.

3. **Consider content width.** Set an explicit `width` via inline styles on the `popover-content` slot for wider layouts. The default minimum width is 12rem (192px).

---

## Popover vs Tooltip vs Dropdown

| Feature              | Tooltip                      | Popover                    | Dropdown                   |
|----------------------|------------------------------|----------------------------|----------------------------|
| **ARIA role**        | `tooltip` (or `dialog`)      | `dialog`                   | `menu`                     |
| **Content**          | Brief text labels            | Rich, interactive content  | Action lists               |
| **Arrow**            | Yes (dark bg)                | Yes (white bg)             | No                         |
| **Focus trapping**   | No (except interactive mode) | Yes                        | Yes                        |
| **Default trigger**  | `hover`                      | `click`                    | `click`                    |
| **Nesting**          | No                           | No (singleton)             | Yes (nested dropdowns)     |
| **Portal**           | No (positioned in DOM)       | Yes (document.body)        | Yes (document.body)        |

---

## Notes

- The `aegov-popover` component uses **`scoped: true`** encapsulation. This is required because the popover content is rendered through a **portal** — the panel is appended to `document.body` to avoid overflow clipping from parent containers. Scoped mode provides the event re-targeting needed for custom events to bubble correctly after the DOM portal move.
- Portal content is styled via JavaScript-injected `<style>` elements because Stencil's scoped CSS cannot reach elements outside the component's DOM tree.
- Only **one popover** can be open at a time. Opening a new popover automatically closes any previously open one (singleton pattern). Unlike dropdown, popovers do not support nesting.
- The component listens for `scroll` and `resize` events on the window to reposition the panel dynamically. If the trigger scrolls completely out of the viewport, the popover closes automatically.
- The popover panel has a **minimum width of 12rem** (192px), `1rem` padding, and uses `width: auto` to accommodate its content. Override with an inline style on the slot container for wider layouts.
- Position flipping is automatic — if the preferred position does not have enough viewport space, the panel flips to the opposite side.
- The **arrow** is a 10px rotated square element. Per position, the two border sides facing the panel interior are removed for a clean look. The arrow's offset tracks the trigger's centre point, clamped between 8px from the panel edges to stay within rounded corners.
- For **hover-triggered** popovers, a minimum 100ms grace period is enforced on hide, regardless of the `hide-delay` value. This ensures the cursor can cross the gap between the trigger and the portal panel without the popover closing prematurely.
- The `popover-content` slot content is **moved** (not cloned) into the portal when opened and moved back when closed. This allows Stencil web components inside the slot to work correctly without double-rendering. Changes to the slot content after the popover opens will not be reflected until the next open cycle.
