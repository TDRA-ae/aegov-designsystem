# Dropdown

<p class="text-lg text-aeblack-500 mb-8">A dropdown displays a panel of content or actions that appears on demand, positioned relative to a trigger element. Use it for menus, contextual options, and progressive disclosure of secondary choices.</p>

## Introduction

The `aegov-dropdown` component provides a flexible, accessible dropdown panel that can be triggered by a click or hover. It supports **4 positions**, **3 alignments**, configurable delays, nested dropdowns, and automatic viewport-aware repositioning. Content is rendered through a portal to `document.body`, avoiding overflow clipping from parent containers.

```html
<aegov-dropdown>
  <aegov-button>Open Menu</aegov-button>
  <div slot="dropdown-content">
    <button>Profile</button>
    <button>Settings</button>
    <button>Logout</button>
  </div>
</aegov-dropdown>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-dropdown>
    <aegov-button>Open Menu</aegov-button>
    <div slot="dropdown-content">
      <button>Profile</button>
      <button>Settings</button>
      <button>Logout</button>
    </div>
  </aegov-dropdown>
</div>

---

## Trigger Types

The `trigger-type` property controls how the dropdown is activated. There are two options.

### Click (Default)

The dropdown opens on click and closes when clicking outside, pressing Escape, or clicking the trigger again.

```html
<aegov-dropdown trigger-type="click">
  <aegov-button>Click Me</aegov-button>
  <div slot="dropdown-content">
    <a href="#">Option A</a>
    <a href="#">Option B</a>
  </div>
</aegov-dropdown>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-dropdown trigger-type="click">
    <aegov-button>Click Trigger</aegov-button>
    <div slot="dropdown-content">
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Option A</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Option B</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Option C</a>
    </div>
  </aegov-dropdown>
</div>

### Hover

The dropdown opens when the cursor enters the trigger area and closes when the cursor leaves both the trigger and the dropdown panel. A built-in grace period allows the cursor to cross the gap between trigger and panel without closing.

```html
<aegov-dropdown trigger-type="hover">
  <aegov-button variant="outline">Hover Me</aegov-button>
  <div slot="dropdown-content">
    <a href="#">Quick Link 1</a>
    <a href="#">Quick Link 2</a>
  </div>
</aegov-dropdown>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-dropdown trigger-type="hover">
    <aegov-button variant="outline">Hover Trigger</aegov-button>
    <div slot="dropdown-content">
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Quick Link 1</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Quick Link 2</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Quick Link 3</a>
    </div>
  </aegov-dropdown>
</div>

---

## Position

The `position` property sets where the dropdown panel appears relative to the trigger. The component automatically flips to the opposite side if there is not enough viewport space.

| Position  | Description                        |
|-----------|------------------------------------|
| `bottom`  | Default. Below the trigger.        |
| `top`     | Above the trigger.                 |
| `left`    | To the left of the trigger.        |
| `right`   | To the right of the trigger.       |

```html
<aegov-dropdown position="bottom">…</aegov-dropdown>
<aegov-dropdown position="top">…</aegov-dropdown>
<aegov-dropdown position="left">…</aegov-dropdown>
<aegov-dropdown position="right">…</aegov-dropdown>
```

<div class="flex flex-wrap items-center gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-dropdown position="bottom">
    <aegov-button size="sm">Bottom</aegov-button>
    <div slot="dropdown-content">
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Item 1</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Item 2</a>
    </div>
  </aegov-dropdown>
  <aegov-dropdown position="top">
    <aegov-button size="sm" variant="outline">Top</aegov-button>
    <div slot="dropdown-content">
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Item 1</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Item 2</a>
    </div>
  </aegov-dropdown>
  <aegov-dropdown position="left">
    <aegov-button size="sm" variant="soft">Left</aegov-button>
    <div slot="dropdown-content">
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Item 1</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Item 2</a>
    </div>
  </aegov-dropdown>
  <aegov-dropdown position="right">
    <aegov-button size="sm" appearance="secondary">Right</aegov-button>
    <div slot="dropdown-content">
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Item 1</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Item 2</a>
    </div>
  </aegov-dropdown>
</div>

---

## Alignment

The `align` property controls how the dropdown panel is aligned along the secondary axis relative to the trigger.

| Align    | Description                                                  |
|----------|--------------------------------------------------------------|
| `start`  | Default. Aligns the leading edge of the panel with the trigger. |
| `center` | Centres the panel relative to the trigger.                    |
| `end`    | Aligns the trailing edge of the panel with the trigger.       |

```html
<aegov-dropdown align="start">…</aegov-dropdown>
<aegov-dropdown align="center">…</aegov-dropdown>
<aegov-dropdown align="end">…</aegov-dropdown>
```

<div class="flex flex-wrap items-center gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-dropdown align="start">
    <aegov-button size="sm">Align Start</aegov-button>
    <div slot="dropdown-content">
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Dashboard</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Analytics</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Reports</a>
    </div>
  </aegov-dropdown>
  <aegov-dropdown align="center">
    <aegov-button size="sm" variant="outline">Align Center</aegov-button>
    <div slot="dropdown-content">
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Dashboard</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Analytics</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Reports</a>
    </div>
  </aegov-dropdown>
  <aegov-dropdown align="end">
    <aegov-button size="sm" variant="soft">Align End</aegov-button>
    <div slot="dropdown-content">
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Dashboard</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Analytics</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Reports</a>
    </div>
  </aegov-dropdown>
</div>

---

## Gap and Offset

The `gap` property controls the distance (in pixels) between the trigger and the dropdown panel. The default is `8`. The `offset` property shifts the panel along the secondary axis.

```html
<aegov-dropdown gap="16">…</aegov-dropdown>
<aegov-dropdown offset="20">…</aegov-dropdown>
```

<div class="flex flex-wrap items-center gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-dropdown gap="0">
    <aegov-button size="sm">Gap 0</aegov-button>
    <div slot="dropdown-content">
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Item 1</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Item 2</a>
    </div>
  </aegov-dropdown>
  <aegov-dropdown gap="16">
    <aegov-button size="sm" variant="outline">Gap 16</aegov-button>
    <div slot="dropdown-content">
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Item 1</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Item 2</a>
    </div>
  </aegov-dropdown>
  <aegov-dropdown offset="30">
    <aegov-button size="sm" variant="soft">Offset 30</aegov-button>
    <div slot="dropdown-content">
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Item 1</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Item 2</a>
    </div>
  </aegov-dropdown>
</div>

---

## Dropdown Content

The `dropdown-content` slot accepts any HTML. Common patterns include links, buttons, and dividers.

### Links and Buttons

Use `<a>` elements for navigation items and `<button>` elements for actions. Focusable elements inside the dropdown automatically receive `role="menuitem"`.

```html
<aegov-dropdown>
  <aegov-button>Actions</aegov-button>
  <div slot="dropdown-content">
    <a href="/profile">View Profile</a>
    <a href="/settings">Settings</a>
    <hr>
    <button onclick="alert('Deleted!')">Delete Account</button>
  </div>
</aegov-dropdown>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-dropdown>
    <aegov-button>Actions</aegov-button>
    <div slot="dropdown-content">
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">View Profile</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Settings</a>
      <hr>
      <button class="block w-full text-left px-3 py-2 text-sm text-aered-600 rounded hover:bg-aered-50 border-0 bg-transparent cursor-pointer">Delete Account</button>
    </div>
  </aegov-dropdown>
</div>

### Dividers

Use a standard `<hr>` element to visually separate groups of items. The dropdown portal automatically styles horizontal rules with a subtle border.

```html
<div slot="dropdown-content">
  <a href="#">Edit</a>
  <a href="#">Duplicate</a>
  <hr>
  <a href="#">Archive</a>
  <a href="#">Delete</a>
</div>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-dropdown>
    <aegov-button variant="outline">With Divider</aegov-button>
    <div slot="dropdown-content">
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Edit</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Duplicate</a>
      <hr>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Archive</a>
      <a href="#" class="block px-3 py-2 text-sm text-aered-600 rounded hover:bg-aered-50 no-underline">Delete</a>
    </div>
  </aegov-dropdown>
</div>

### Disabled Items

Add `aria-disabled="true"` to links or the `disabled` attribute to buttons to render them as non-interactive with reduced opacity.

```html
<div slot="dropdown-content">
  <a href="#">Active Item</a>
  <a href="#" aria-disabled="true">Disabled Link</a>
  <button disabled>Disabled Button</button>
</div>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-dropdown>
    <aegov-button variant="soft">Disabled Items</aegov-button>
    <div slot="dropdown-content">
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Active Item</a>
      <a href="#" aria-disabled="true" class="block px-3 py-2 text-sm text-aeblack-700 rounded no-underline">Disabled Link</a>
      <button disabled class="block w-full text-left px-3 py-2 text-sm text-aeblack-700 rounded border-0 bg-transparent">Disabled Button</button>
    </div>
  </aegov-dropdown>
</div>

---

## Show and Hide Delays

The `show-delay` property controls the delay (in milliseconds) before the dropdown appears. The default is `200`. The `hide-delay` property controls the delay before it closes. The default is `0`. For hover-triggered dropdowns, a minimum 100ms hide grace period is always enforced.

```html
<aegov-dropdown trigger-type="hover" show-delay="0" hide-delay="300">
  <aegov-button>Slow Close</aegov-button>
  <div slot="dropdown-content">…</div>
</aegov-dropdown>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-dropdown trigger-type="hover" show-delay="0">
    <aegov-button size="sm">Instant Show (hover)</aegov-button>
    <div slot="dropdown-content">
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Item 1</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Item 2</a>
    </div>
  </aegov-dropdown>
  <aegov-dropdown trigger-type="hover" show-delay="500">
    <aegov-button size="sm" variant="outline">500ms Delay (hover)</aegov-button>
    <div slot="dropdown-content">
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Item 1</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Item 2</a>
    </div>
  </aegov-dropdown>
</div>

---

## Disabled State

Set the `disabled` attribute to prevent the dropdown from opening. The trigger remains visible but interaction is blocked.

```html
<aegov-dropdown disabled>
  <aegov-button disabled>Disabled Dropdown</aegov-button>
  <div slot="dropdown-content">
    <a href="#">This won't show</a>
  </div>
</aegov-dropdown>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-dropdown disabled>
    <aegov-button disabled>Disabled Dropdown</aegov-button>
    <div slot="dropdown-content">
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">This won't show</a>
    </div>
  </aegov-dropdown>
</div>

---

## Custom Trigger

The default slot accepts any element as the trigger. You are not limited to buttons — use links, icons, avatars, or any interactive element.

```html
<aegov-dropdown>
  <aegov-avatar src="https://i.pravatar.cc/150?img=5" size="base"></aegov-avatar>
  <div slot="dropdown-content">
    <a href="#">My Account</a>
    <a href="#">Sign Out</a>
  </div>
</aegov-dropdown>
```

<div class="flex flex-wrap items-center gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-dropdown>
    <aegov-avatar src="https://i.pravatar.cc/150?img=5" size="base"></aegov-avatar>
    <div slot="dropdown-content">
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">My Account</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Preferences</a>
      <hr>
      <a href="#" class="block px-3 py-2 text-sm text-aered-600 rounded hover:bg-aered-50 no-underline">Sign Out</a>
    </div>
  </aegov-dropdown>
  <aegov-dropdown trigger-type="hover">
    <aegov-badge color="primary">Hover this badge</aegov-badge>
    <div slot="dropdown-content">
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Badge info</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Learn more</a>
    </div>
  </aegov-dropdown>
</div>

---

## Nested Dropdowns

Dropdowns can be nested inside the `dropdown-content` slot of a parent dropdown. The component tracks parent-child relationships to prevent premature closing.

```html
<aegov-dropdown>
  <aegov-button>Menu</aegov-button>
  <div slot="dropdown-content">
    <a href="#">Home</a>
    <aegov-dropdown position="right" trigger-type="hover">
      <a href="#">Services</a>
      <div slot="dropdown-content">
        <a href="#">Consulting</a>
        <a href="#">Development</a>
      </div>
    </aegov-dropdown>
    <a href="#">Contact</a>
  </div>
</aegov-dropdown>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-dropdown>
    <aegov-button>Menu with Sub-menu</aegov-button>
    <div slot="dropdown-content">
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Home</a>
      <aegov-dropdown position="right" trigger-type="hover">
        <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Services &rarr;</a>
        <div slot="dropdown-content">
          <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Consulting</a>
          <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Development</a>
          <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Support</a>
        </div>
      </aegov-dropdown>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">About</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Contact</a>
    </div>
  </aegov-dropdown>
</div>

---

## Singleton Behaviour

Only one dropdown can be open at a time (unless nested). Opening a new dropdown automatically closes the previously open one. This is managed at the module level and requires no additional configuration.

---

## Events

The component emits events when the dropdown opens and closes. Use these to synchronise external state or trigger side-effects.

```html
<aegov-dropdown id="event-demo">
  <aegov-button>Event Demo</aegov-button>
  <div slot="dropdown-content">
    <a href="#">Item 1</a>
    <a href="#">Item 2</a>
  </div>
</aegov-dropdown>

<script>
  const dd = document.getElementById('event-demo');
  dd.addEventListener('aegovDropdownOpen', () => {
    console.log('Dropdown opened');
  });
  dd.addEventListener('aegovDropdownClose', () => {
    console.log('Dropdown closed');
  });
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-dropdown id="event-demo-dd">
    <aegov-button>Event Demo</aegov-button>
    <div slot="dropdown-content">
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Item 1</a>
      <a href="#" class="block px-3 py-2 text-sm text-aeblack-700 rounded hover:bg-aeblack-100 no-underline">Item 2</a>
    </div>
  </aegov-dropdown>
  <p id="event-log-dd" class="mt-3 text-sm text-aeblack-500 font-mono">Interact with the dropdown to see events...</p>
  <script>
    (function() {
      var dd = document.getElementById('event-demo-dd');
      var log = document.getElementById('event-log-dd');
      if (dd && log) {
        dd.addEventListener('aegovDropdownOpen', function() {
          log.textContent = 'Event: aegovDropdownOpen fired';
        });
        dd.addEventListener('aegovDropdownClose', function() {
          log.textContent = 'Event: aegovDropdownClose fired';
        });
      }
    })();
  </script>
</div>

---

## API Reference

### Properties

| Property      | Attribute      | Description                                                  | Type                                        | Default    |
|---------------|----------------|--------------------------------------------------------------|---------------------------------------------|------------|
| `triggerType` | `trigger-type` | How the dropdown is activated                                | `'click'` \| `'hover'`                      | `'click'`  |
| `position`    | `position`     | Position of the panel relative to the trigger                | `'top'` \| `'right'` \| `'bottom'` \| `'left'` | `'bottom'` |
| `align`       | `align`        | Alignment of the panel along the secondary axis              | `'start'` \| `'center'` \| `'end'`         | `'start'`  |
| `gap`         | `gap`          | Distance between trigger and panel in pixels                 | `number`                                    | `8`        |
| `offset`      | `offset`       | Additional offset along the secondary axis in pixels         | `number`                                    | `0`        |
| `disabled`    | `disabled`     | Prevents the dropdown from opening                           | `boolean`                                   | `false`    |
| `showDelay`   | `show-delay`   | Delay before showing in milliseconds                         | `number`                                    | `200`      |
| `hideDelay`   | `hide-delay`   | Delay before hiding in milliseconds                          | `number`                                    | `0`        |

### Events

| Event                 | Description                      | Detail Type |
|-----------------------|----------------------------------|-------------|
| `aegovDropdownOpen`   | Emitted when the dropdown opens  | `void`      |
| `aegovDropdownClose`  | Emitted when the dropdown closes | `void`      |

#### Listening to Events

```html
<aegov-dropdown id="my-dd">
  <aegov-button>Menu</aegov-button>
  <div slot="dropdown-content">…</div>
</aegov-dropdown>

<script>
  document.getElementById('my-dd')
    .addEventListener('aegovDropdownOpen', () => {
      console.log('Opened');
    });
</script>
```

### Slots

| Slot               | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| (default)          | The trigger element — a button, link, avatar, or any interactive element.  |
| `dropdown-content` | The dropdown panel content — links, buttons, dividers, or any HTML.        |

### Methods

| Method            | Description                         | Signature       |
|-------------------|-------------------------------------|-----------------|
| `closeDropdown()` | Programmatically closes the dropdown | `() => void`    |

```html
<script>
  // Programmatically close a dropdown
  document.querySelector('aegov-dropdown').closeDropdown();
</script>
```

---

## Accessibility

The `aegov-dropdown` component is built with accessibility as a first-class concern. The following features are included out of the box.

### Built-in Features

- **`aria-haspopup="true"`** — set on the trigger wrapper to indicate that activating it will display a popup menu.
- **`aria-expanded`** — dynamically set to `"true"` when the dropdown is open and `"false"` when closed.
- **`aria-controls`** — links the trigger to the dropdown panel's `id` when open.
- **`role="menu"`** — applied to the dropdown panel container for correct screen reader announcement.
- **`role="menuitem"`** — automatically applied to focusable children (`<a>`, `<button>`, `[tabindex]`) that do not already have a `role` attribute.
- **`aria-labelledby`** — the dropdown panel references the trigger element's `id` so screen readers can announce the relationship.
- **Keyboard navigation** — `ArrowDown` and `ArrowUp` cycle through menu items, `Tab` moves focus forward, `Escape` closes the dropdown and returns focus to the trigger.
- **Focus management** — when the dropdown opens, focus moves to the first focusable item. When it closes, focus returns to the trigger element.
- **Disabled items** — links with `aria-disabled="true"` and buttons with `disabled` are rendered with reduced opacity and `pointer-events: none`.

### Developer Responsibilities

1. **Provide meaningful trigger labels.** If the trigger is an icon-only button, add `aria-label` to describe the dropdown's purpose.

   ```html
   <aegov-dropdown>
     <aegov-button icon aria-label="User menu">
       <svg>…</svg>
     </aegov-button>
     <div slot="dropdown-content">…</div>
   </aegov-dropdown>
   ```

2. **Use semantic content.** Use `<a>` for navigation items and `<button>` for actions. Avoid `<div>` or `<span>` for interactive items — they lack built-in keyboard and screen reader support.

3. **Mark disabled items correctly.** Use `aria-disabled="true"` on `<a>` elements and the native `disabled` attribute on `<button>` elements.

---

## Notes

- The `aegov-dropdown` component uses **`scoped: true`** encapsulation. This is required because the dropdown content is rendered through a **portal** — the panel is appended to `document.body` to avoid overflow clipping from parent containers. Scoped mode provides the event re-targeting needed for custom events to bubble correctly after the DOM portal move.
- Portal content is styled via JavaScript-injected `<style>` elements because Stencil's scoped CSS cannot reach elements outside the component's DOM tree.
- Only **one dropdown** can be open at a time at the same nesting level. Opening a new dropdown automatically closes any previously open one (singleton pattern). Nested dropdowns are an exception — a child dropdown can be open alongside its parent.
- The component listens for `scroll` and `resize` events on the window to reposition the panel dynamically. If the trigger scrolls completely out of the viewport, the dropdown closes automatically.
- The dropdown panel has a **minimum width of 12rem** (192px) and uses `width: auto` to accommodate its content.
- Position flipping is automatic — if the preferred position does not have enough viewport space, the panel flips to the opposite side.
- For **hover-triggered** dropdowns, a minimum 100ms grace period is enforced on hide, regardless of the `hide-delay` value. This ensures the cursor can cross the gap between the trigger and the portal panel without the dropdown closing prematurely.
- The `dropdown-content` slot is cloned into the portal when opened and removed when closed. Changes to the slot content after the dropdown opens will not be reflected until the next open cycle.
