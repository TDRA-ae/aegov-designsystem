# Dropdown

<p class="text-lg text-aeblack-500 mb-8">A Dropdown reveals a menu of actions, navigation links, or grouped commands anchored to a trigger element. It is ideal for user account menus, bulk-action lists, ministry switchers, and secondary navigation. Content is rendered into a portal at the document body so the menu can escape ancestor clipping and stacking contexts.</p>

## Introduction

The `aegov-dropdown` component pairs a trigger (placed in the default slot) with a `dropdown-content` slot containing the menu items. When the dropdown opens, the content slot is moved into a fixed-position portal at `document.body`, positioned relative to the trigger, and animated in. Only one dropdown can be open at a time — opening another automatically closes the previous one (nested dropdowns are exempt).

```html
<aegov-dropdown>
  <aegov-button variant="primary" appearance="outline">Account actions</aegov-button>
  <div slot="dropdown-content">
    <a href="#profile">View profile</a>
    <a href="#settings">Account settings</a>
    <hr />
    <a href="#signout">Sign out</a>
  </div>
</aegov-dropdown>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-dropdown>
    <aegov-button variant="primary" appearance="outline">Account actions</aegov-button>
    <div slot="dropdown-content">
      <a href="#profile">View profile</a>
      <a href="#settings">Account settings</a>
      <hr />
      <a href="#signout">Sign out</a>
    </div>
  </aegov-dropdown>
</div>

---

## Trigger Type

The `trigger` property controls how the dropdown opens. `click` (default) toggles the dropdown on click and closes it on outside click or `Escape`. `hover` opens on pointer-enter after `delay-start` and closes on pointer-leave with a 100 ms grace period so the cursor can cross the gap between trigger and panel.

### Click trigger (default)

```html
<aegov-dropdown trigger="click">
  <aegov-button variant="primary">Service actions</aegov-button>
  <div slot="dropdown-content">
    <a href="#renew">Renew application</a>
    <a href="#duplicate">Request duplicate</a>
    <a href="#cancel">Cancel application</a>
  </div>
</aegov-dropdown>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-dropdown trigger="click">
    <aegov-button variant="primary">Service actions</aegov-button>
    <div slot="dropdown-content">
      <a href="#renew">Renew application</a>
      <a href="#duplicate">Request duplicate</a>
      <a href="#cancel">Cancel application</a>
    </div>
  </aegov-dropdown>
</div>

### Hover trigger

```html
<aegov-dropdown trigger="hover" position="bottom" align="start">
  <aegov-button variant="secondary" appearance="soft">Services</aegov-button>
  <div slot="dropdown-content">
    <a href="/visa">Visa services</a>
    <a href="/passport">Passport services</a>
    <a href="/emirates-id">Emirates ID services</a>
  </div>
</aegov-dropdown>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-dropdown trigger="hover" position="bottom" align="start">
    <aegov-button variant="secondary" appearance="soft">Services</aegov-button>
    <div slot="dropdown-content">
      <a href="/visa">Visa services</a>
      <a href="/passport">Passport services</a>
      <a href="/emirates-id">Emirates ID services</a>
    </div>
  </aegov-dropdown>
</div>

---

## Position

`position` sets the preferred placement of the panel relative to the trigger: `top`, `right`, `bottom` (default), or `left`. If there isn't enough room on the preferred edge, the dropdown auto-flips to the opposite edge.

```html
<aegov-dropdown position="top">
  <aegov-button>Top</aegov-button>
  <div slot="dropdown-content">
    <a href="#a">First option</a>
    <a href="#b">Second option</a>
  </div>
</aegov-dropdown>

<aegov-dropdown position="right">
  <aegov-button>Right</aegov-button>
  <div slot="dropdown-content">
    <a href="#a">First option</a>
    <a href="#b">Second option</a>
  </div>
</aegov-dropdown>

<aegov-dropdown position="bottom">
  <aegov-button>Bottom</aegov-button>
  <div slot="dropdown-content">
    <a href="#a">First option</a>
    <a href="#b">Second option</a>
  </div>
</aegov-dropdown>

<aegov-dropdown position="left">
  <aegov-button>Left</aegov-button>
  <div slot="dropdown-content">
    <a href="#a">First option</a>
    <a href="#b">Second option</a>
  </div>
</aegov-dropdown>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-4">
    <aegov-dropdown position="top">
      <aegov-button>Top</aegov-button>
      <div slot="dropdown-content">
        <a href="#a">First option</a>
        <a href="#b">Second option</a>
      </div>
    </aegov-dropdown>
    <aegov-dropdown position="right">
      <aegov-button>Right</aegov-button>
      <div slot="dropdown-content">
        <a href="#a">First option</a>
        <a href="#b">Second option</a>
      </div>
    </aegov-dropdown>
    <aegov-dropdown position="bottom">
      <aegov-button>Bottom</aegov-button>
      <div slot="dropdown-content">
        <a href="#a">First option</a>
        <a href="#b">Second option</a>
      </div>
    </aegov-dropdown>
    <aegov-dropdown position="left">
      <aegov-button>Left</aegov-button>
      <div slot="dropdown-content">
        <a href="#a">First option</a>
        <a href="#b">Second option</a>
      </div>
    </aegov-dropdown>
  </div>
</div>

---

## Alignment

The `align` property positions the panel along the cross axis of the placement. For `position="bottom"` and `position="top"` this is horizontal alignment; for `position="left"` and `position="right"` it is vertical alignment.

| Value     | Behaviour                                                          |
| --------- | ------------------------------------------------------------------ |
| `start`   | Aligns to the inline-start edge of the trigger (default).          |
| `center`  | Centres the panel against the trigger.                             |
| `end`     | Aligns to the inline-end edge — useful for right-anchored avatars. |

```html
<aegov-dropdown align="end" position="bottom">
  <aegov-avatar src="/profile.jpg" alt="Hassan Al Mansoori" size="sm"></aegov-avatar>
  <div slot="dropdown-content">
    <a href="/profile">My profile</a>
    <a href="/applications">My applications</a>
    <hr />
    <a href="/signout">Sign out</a>
  </div>
</aegov-dropdown>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex justify-end">
    <aegov-dropdown align="end" position="bottom">
      <aegov-avatar initials="HM" size="sm"></aegov-avatar>
      <div slot="dropdown-content">
        <a href="/profile">My profile</a>
        <a href="/applications">My applications</a>
        <hr />
        <a href="/signout">Sign out</a>
      </div>
    </aegov-dropdown>
  </div>
</div>

---

## Gap and Offset

`gap` controls the pixel distance between the trigger and the panel along the placement axis. `offset` shifts the panel along the cross axis without affecting alignment.

```html
<aegov-dropdown gap="16" offset="0">
  <aegov-button>Wider gap</aegov-button>
  <div slot="dropdown-content">
    <a href="#">Notifications</a>
    <a href="#">Messages</a>
  </div>
</aegov-dropdown>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-dropdown gap="16" offset="0">
    <aegov-button>Wider gap (16 px)</aegov-button>
    <div slot="dropdown-content">
      <a href="#">Notifications</a>
      <a href="#">Messages</a>
    </div>
  </aegov-dropdown>
</div>

---

## Disabled State

Set `is-disabled="true"` to make the trigger inert. The dropdown will not open via click, hover, or keyboard until the property is removed.

```html
<aegov-dropdown is-disabled="true">
  <aegov-button>Unavailable actions</aegov-button>
  <div slot="dropdown-content">
    <a href="#">This menu is disabled</a>
  </div>
</aegov-dropdown>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-dropdown is-disabled="true">
    <aegov-button is-disabled="true">Unavailable actions</aegov-button>
    <div slot="dropdown-content">
      <a href="#">This menu is disabled</a>
    </div>
  </aegov-dropdown>
</div>

---

## User Profile Menu

A real-world example anchored to an avatar in the header. Use `align="end"` so the panel hugs the right edge of the trigger, and `position="bottom"` so it drops below.

```html
<aegov-dropdown align="end" position="bottom">
  <aegov-button appearance="soft">
    <aegov-avatar src="https://i.pravatar.cc/150?img=47" alt="Fatima Al Hammadi" size="sm" appearance="rounded"></aegov-avatar>
    Fatima Al Hammadi
  </aegov-button>
  <div slot="dropdown-content">
    <a href="/profile">My profile</a>
    <a href="/applications">My applications</a>
    <a href="/notifications">Notifications</a>
    <hr />
    <a href="/help">Help &amp; support</a>
    <a href="/signout">Sign out</a>
  </div>
</aegov-dropdown>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex justify-end">
    <aegov-dropdown align="end" position="bottom">
      <aegov-button appearance="soft">
        <aegov-avatar src="https://i.pravatar.cc/150?img=47" alt="Fatima Al Hammadi" size="sm" appearance="rounded"></aegov-avatar>
        Fatima Al Hammadi
      </aegov-button>
      <div slot="dropdown-content">
        <a href="/profile">My profile</a>
        <a href="/applications">My applications</a>
        <a href="/notifications">Notifications</a>
        <hr />
        <a href="/help">Help &amp; support</a>
        <a href="/signout">Sign out</a>
      </div>
    </aegov-dropdown>
  </div>
</div>

---

## Action Menu on a Table Row

Bulk action menus are a common pattern in administrative views. Anchor the dropdown to a kebab-style icon button at the end of each row.

```html
<aegov-dropdown align="end" position="bottom">
  <aegov-button appearance="soft" size="sm" aria-label="Row actions">
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="3" cy="8" r="1.5" fill="currentColor"/>
      <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
      <circle cx="13" cy="8" r="1.5" fill="currentColor"/>
    </svg>
  </aegov-button>
  <div slot="dropdown-content">
    <a href="#view">View details</a>
    <a href="#edit">Edit application</a>
    <a href="#download">Download receipt</a>
    <hr />
    <a href="#cancel">Cancel application</a>
  </div>
</aegov-dropdown>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex items-center justify-between border border-aeblack-200 rounded p-4">
    <div>
      <div class="font-medium">Passport renewal &mdash; APP-2026-00482</div>
      <div class="text-sm text-aeblack-500">Submitted 12 April 2026</div>
    </div>
    <aegov-dropdown align="end" position="bottom">
      <aegov-button appearance="soft" size="sm" aria-label="Row actions">
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="3" cy="8" r="1.5" fill="currentColor"/>
          <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
          <circle cx="13" cy="8" r="1.5" fill="currentColor"/>
        </svg>
      </aegov-button>
      <div slot="dropdown-content">
        <a href="#view">View details</a>
        <a href="#edit">Edit application</a>
        <a href="#download">Download receipt</a>
        <hr />
        <a href="#cancel">Cancel application</a>
      </div>
    </aegov-dropdown>
  </div>
</div>

---

## Nested Dropdowns

A nested dropdown is a child `aegov-dropdown` placed inside the `dropdown-content` slot of a parent. The component supports any depth: opening a nested dropdown does not close its parent, and the parent stays open while the cursor is over the child or its panel. Each level is rendered into its own portal.

```html
<aegov-dropdown>
  <aegov-button variant="primary">Apply for service</aegov-button>
  <div slot="dropdown-content">
    <a href="#new">New application</a>
    <aegov-dropdown trigger="hover" position="right">
      <a href="#">Visa services &rsaquo;</a>
      <div slot="dropdown-content">
        <a href="/visa/visit">Visit visa</a>
        <a href="/visa/work">Work visa</a>
        <a href="/visa/golden">Golden visa</a>
      </div>
    </aegov-dropdown>
    <aegov-dropdown trigger="hover" position="right">
      <a href="#">Passport services &rsaquo;</a>
      <div slot="dropdown-content">
        <a href="/passport/new">Issue new passport</a>
        <a href="/passport/renew">Renew passport</a>
        <a href="/passport/replace">Replace lost passport</a>
      </div>
    </aegov-dropdown>
    <hr />
    <a href="#status">Check application status</a>
  </div>
</aegov-dropdown>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-dropdown>
    <aegov-button variant="primary">Apply for service</aegov-button>
    <div slot="dropdown-content">
      <a href="#new">New application</a>
      <aegov-dropdown trigger="hover" position="right">
        <a href="#">Visa services &rsaquo;</a>
        <div slot="dropdown-content">
          <a href="/visa/visit">Visit visa</a>
          <a href="/visa/work">Work visa</a>
          <a href="/visa/golden">Golden visa</a>
        </div>
      </aegov-dropdown>
      <aegov-dropdown trigger="hover" position="right">
        <a href="#">Passport services &rsaquo;</a>
        <div slot="dropdown-content">
          <a href="/passport/new">Issue new passport</a>
          <a href="/passport/renew">Renew passport</a>
          <a href="/passport/replace">Replace lost passport</a>
        </div>
      </aegov-dropdown>
      <hr />
      <a href="#status">Check application status</a>
    </div>
  </aegov-dropdown>
</div>

---

## Programmatic Control

Call the public `toggle()` method on the host element to open or close the dropdown from your own code. Pass `true` if the call originated from a keyboard handler so the first menu item receives focus per the WAI-ARIA menu pattern.

```html
<aegov-dropdown id="ministry-switcher" align="end">
  <aegov-button variant="secondary">Switch ministry</aegov-button>
  <div slot="dropdown-content">
    <a href="#moi">Ministry of Interior</a>
    <a href="#mofa">Ministry of Foreign Affairs</a>
    <a href="#moh">Ministry of Health</a>
  </div>
</aegov-dropdown>

<aegov-button variant="secondary" id="open-from-outside">Open ministry switcher</aegov-button>

<script>
  document.getElementById('open-from-outside').addEventListener('click', async () => {
    const dd = document.getElementById('ministry-switcher');
    await dd.toggle(false);
  });

  const dd = document.getElementById('ministry-switcher');
  dd.addEventListener('aegovDropdownOpen', () => console.log('Opened'));
  dd.addEventListener('aegovDropdownClose', () => console.log('Closed'));
</script>
```

---

## RTL Support

Dropdowns are direction-agnostic. When the document or any ancestor is `dir="rtl"`, `align="start"` resolves to the right edge of the trigger and `align="end"` to the left edge. Position values (`top`/`bottom`/`left`/`right`) remain physical — they describe the preferred edge, not the inline/block axis. Slot content inherits the host document's direction, including text alignment inside menu items.

```html
<div dir="rtl">
  <aegov-dropdown align="end" position="bottom">
    <aegov-button variant="primary">إجراءات الحساب</aegov-button>
    <div slot="dropdown-content">
      <a href="/profile">الملف الشخصي</a>
      <a href="/applications">طلباتي</a>
      <a href="/notifications">الإشعارات</a>
      <hr />
      <a href="/signout">تسجيل الخروج</a>
    </div>
  </aegov-dropdown>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-dropdown align="end" position="bottom">
    <aegov-button variant="primary">إجراءات الحساب</aegov-button>
    <div slot="dropdown-content">
      <a href="/profile">الملف الشخصي</a>
      <a href="/applications">طلباتي</a>
      <a href="/notifications">الإشعارات</a>
      <hr />
      <a href="/signout">تسجيل الخروج</a>
    </div>
  </aegov-dropdown>
</div>

The same dropdown with a hover trigger and nested submenu, in RTL:

```html
<div dir="rtl">
  <aegov-dropdown trigger="hover">
    <aegov-button>الخدمات</aegov-button>
    <div slot="dropdown-content">
      <a href="/visa">خدمات التأشيرات</a>
      <aegov-dropdown trigger="hover" position="right">
        <a href="#">خدمات الجوازات &rsaquo;</a>
        <div slot="dropdown-content">
          <a href="/passport/new">إصدار جواز جديد</a>
          <a href="/passport/renew">تجديد جواز السفر</a>
        </div>
      </aegov-dropdown>
      <a href="/eid">خدمات الهوية الإماراتية</a>
    </div>
  </aegov-dropdown>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-dropdown trigger="hover">
    <aegov-button>الخدمات</aegov-button>
    <div slot="dropdown-content">
      <a href="/visa">خدمات التأشيرات</a>
      <aegov-dropdown trigger="hover" position="right">
        <a href="#">خدمات الجوازات &rsaquo;</a>
        <div slot="dropdown-content">
          <a href="/passport/new">إصدار جواز جديد</a>
          <a href="/passport/renew">تجديد جواز السفر</a>
        </div>
      </aegov-dropdown>
      <a href="/eid">خدمات الهوية الإماراتية</a>
    </div>
  </aegov-dropdown>
</div>

---

## API Reference

### Properties

| Property      | Attribute      | Description                                                                                       | Type                                       | Default     |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------ | ----------- |
| `fieldId`     | `field-id`     | DOM `id` for the menu element. Auto-generated if omitted. The trigger receives `${fieldId}-trigger`. | `string`                                   | _generated_ |
| `trigger`     | `trigger`      | How the dropdown opens.                                                                            | `'click' \| 'hover'`                       | `'click'`   |
| `position`    | `position`     | Preferred placement relative to the trigger. Auto-flips if there isn't room.                      | `'top' \| 'right' \| 'bottom' \| 'left'`   | `'bottom'`  |
| `align`       | `align`        | Cross-axis alignment of the panel against the trigger.                                            | `'start' \| 'center' \| 'end'`             | `'start'`   |
| `gap`         | `gap`          | Pixel distance between the trigger and the panel along the placement axis.                        | `number`                                   | `8`         |
| `offset`      | `offset`       | Additional pixel offset along the cross axis.                                                     | `number`                                   | `0`         |
| `isDisabled`  | `is-disabled`  | When `true`, the trigger is inert and the dropdown will not open.                                 | `boolean`                                  | `false`     |
| `delayStart`  | `delay-start`  | Milliseconds to wait before opening (mainly relevant for `trigger="hover"`).                      | `number`                                   | `200`       |
| `delayEnd`    | `delay-end`    | Milliseconds to wait before closing on hover-out. A 100 ms grace period applies to hover.         | `number`                                   | `0`         |

### Slots

| Slot                | Description                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| _(default)_         | Trigger element. Should be a single focusable element such as `aegov-button`, `<button>`, link, or avatar.    |
| `dropdown-content`  | Menu contents. Use anchors, buttons, `<hr>` separators, or any HTML. Moved into the portal on open.           |

### Events

| Event                  | Detail | Description                                                |
| ---------------------- | ------ | ---------------------------------------------------------- |
| `aegovDropdownOpen`    | `void` | Fired when the dropdown opens.                              |
| `aegovDropdownClose`   | `void` | Fired when the dropdown closes (any reason).                |

#### Listening for events

```html
<aegov-dropdown id="account-menu">
  <aegov-button>Account</aegov-button>
  <div slot="dropdown-content">
    <a href="/profile">Profile</a>
    <a href="/signout">Sign out</a>
  </div>
</aegov-dropdown>

<script>
  const dd = document.querySelector('#account-menu');
  dd.addEventListener('aegovDropdownOpen', () => analytics.track('account_menu_open'));
  dd.addEventListener('aegovDropdownClose', () => console.log('Closed'));
</script>
```

### Methods

| Method                                 | Returns         | Description                                                                                                                |
| -------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `toggle(viaKeyboard?: boolean)`        | `Promise<void>` | Toggle the dropdown open/closed regardless of `trigger`. Pass `true` from keyboard handlers so the first item receives focus. |

### Pass-through Attributes

`aria-*` and `data-*` attributes set on `<aegov-dropdown>` are forwarded onto the trigger wrapper element so they can describe the trigger semantically.

| Attribute group  | Forwarded? | Where it lands                                                                          |
| ---------------- | ---------- | --------------------------------------------------------------------------------------- |
| `aria-*`         | Yes        | Applied to the trigger wrapper (`.aegov-dropdown-trigger`).                              |
| `data-*`         | Yes        | Applied to the trigger wrapper.                                                          |
| `id`             | n/a        | Use `field-id` instead — it sets the menu id and derives the trigger id.                 |
| `class`, `style` | Allowed    | Applied to the host element.                                                             |

---

## Accessibility

### Built-in behaviour

- The first focusable element inside the trigger slot (e.g. `<aegov-button>`) automatically receives `aria-haspopup="menu"`, `aria-expanded`, and `aria-controls` (pointing at the menu's `id` when open). These attributes are set imperatively so they live on the element AT actually reads, not the wrapper div.
- The menu element has `role="menu"` and `aria-labelledby` linking back to the trigger wrapper's `id`.
- Focusable children inside the menu without an explicit `role` automatically receive `role="menuitem"`.
- `Escape` closes the dropdown; `Tab` and `Arrow Up` / `Arrow Down` cycle focus through menu items.
- Keyboard-triggered opens (`Enter`/`Space` on the focused trigger) move focus into the menu; pointer opens leave focus on the trigger, matching the WAI-ARIA menu pattern.
- Focus returns to the trigger on close using `preventScroll`, so the page does not jump if the trigger has scrolled out of view.
- Only one dropdown is open at a time. Nested dropdowns are exempt — opening a child does not close its parent.
- The dropdown auto-closes if the trigger scrolls out of the viewport.

### Developer responsibilities

- Place a single focusable element in the default slot (button, link, avatar with role/tabindex).
- Provide an accessible name on the trigger — visible text, `aria-label`, or `aria-labelledby`.
- Ensure menu items are keyboard activatable (links, buttons, or elements with `tabindex`).
- For destructive items (delete, cancel) include text that makes the consequence clear; do not rely on colour alone.

### Keyboard support

| Key                          | Action                                                              |
| ---------------------------- | ------------------------------------------------------------------- |
| `Enter`, `Space`             | Toggle the dropdown when the trigger has focus.                     |
| `Escape`                     | Close the open dropdown and return focus to the trigger.            |
| `Tab`                        | Move focus to the next menu item; cycles within the open menu.      |
| `Shift + Tab`                | Move focus to the previous menu item.                               |
| `Arrow Down`                 | Move focus to the next menu item.                                   |
| `Arrow Up`                   | Move focus to the previous menu item.                               |

### Implementation notes

- `scoped: true` encapsulation: events from inside the menu re-target correctly even after the slot is moved into the portal.
- The `dropdown-content` element is **moved** (not cloned) into the portal on open and moved back to a hidden host wrapper on close. This preserves Stencil hydration for nested web components.
- Inside the portal, `<a>` styles are reset (`display: block; margin: 0`) to override unlayered global anchor styles.
- A nested dropdown re-creates its portal in `connectedCallback()` because its parent's portal-move triggers `disconnectedCallback` then `connectedCallback` on the child.
