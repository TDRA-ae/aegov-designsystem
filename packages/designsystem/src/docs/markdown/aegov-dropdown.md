# Dropdown

<p class="text-lg text-aeblack-500 mb-8">A Dropdown reveals a menu of actions or links from a trigger. Use it to collapse a set of related commands behind one control — a row's actions, an account menu, a language switcher. It is for <em>navigation and commands</em>, not for form values: choosing a value that gets submitted belongs in a <a href="aegov-select.html">Select</a>.</p>

## Introduction

Put the trigger in the default slot and the menu in the `dropdown-content` slot. The content is moved into a portal on `document.body` when the menu opens, so it is never clipped by a scrolling container or a table cell.

```html
<aegov-dropdown>
  <aegov-button appearance="outline">Actions</aegov-button>

  <div slot="dropdown-content">
    <a href="/view">View application</a>
    <a href="/edit">Edit details</a>
    <aegov-separator></aegov-separator>
    <a href="/withdraw">Withdraw application</a>
  </div>
</aegov-dropdown>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-dropdown field-id="dd-intro">
    <aegov-button appearance="outline">Actions</aegov-button>
    <div slot="dropdown-content">
      <a href="#">View application</a>
      <a href="#">Edit details</a>
      <a href="#">Download receipt</a>
      <aegov-separator></aegov-separator>
      <a href="#">Withdraw application</a>
    </div>
  </aegov-dropdown>
</div>

Only one dropdown can be open at a time. Opening a second closes the first.

---

## Trigger

`trigger` chooses how the menu opens.

| Value | Opens on |
| --- | --- |
| `click` | Click, `Enter`, `Space` or arrow keys. |
| `hover` | Pointer hover, after `delayStart`. Still opens on click and keyboard. |

```html
<aegov-dropdown trigger="click">…</aegov-dropdown>
<aegov-dropdown trigger="hover">…</aegov-dropdown>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-4">
    <aegov-dropdown field-id="dd-tc" trigger="click">
      <aegov-button appearance="outline" size="sm">Click to open</aegov-button>
      <div slot="dropdown-content"><a href="#">First item</a><a href="#">Second item</a></div>
    </aegov-dropdown>
    <aegov-dropdown field-id="dd-th" trigger="hover">
      <aegov-button appearance="outline" size="sm">Hover to open</aegov-button>
      <div slot="dropdown-content"><a href="#">First item</a><a href="#">Second item</a></div>
    </aegov-dropdown>
  </div>
</div>

Prefer `click`. Hover menus are unreachable by touch as a hover, fire accidentally when the pointer passes over, and are difficult for users with motor impairments to keep open. `hover` remains keyboard- and click-operable, but it should be a deliberate choice for desktop-first navigation, not a default.

`delayStart` (default 200ms) and `delayEnd` (default 0) control the hover open and close delays.

---

## Position and alignment

`position` picks the side, `align` picks the alignment along that side.

```html
<aegov-dropdown position="bottom" align="start">…</aegov-dropdown>
<aegov-dropdown position="bottom" align="end">…</aegov-dropdown>
<aegov-dropdown position="top" align="center">…</aegov-dropdown>
<aegov-dropdown position="right" align="start">…</aegov-dropdown>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-4">
    <aegov-dropdown field-id="dd-p1" position="bottom" align="start">
      <aegov-button size="sm" appearance="outline">bottom / start</aegov-button>
      <div slot="dropdown-content"><a href="#">Item one</a><a href="#">Item two</a></div>
    </aegov-dropdown>
    <aegov-dropdown field-id="dd-p2" position="bottom" align="end">
      <aegov-button size="sm" appearance="outline">bottom / end</aegov-button>
      <div slot="dropdown-content"><a href="#">Item one</a><a href="#">Item two</a></div>
    </aegov-dropdown>
    <aegov-dropdown field-id="dd-p3" position="top" align="center">
      <aegov-button size="sm" appearance="outline">top / center</aegov-button>
      <div slot="dropdown-content"><a href="#">Item one</a><a href="#">Item two</a></div>
    </aegov-dropdown>
    <aegov-dropdown field-id="dd-p4" position="right" align="start">
      <aegov-button size="sm" appearance="outline">right / start</aegov-button>
      <div slot="dropdown-content"><a href="#">Item one</a><a href="#">Item two</a></div>
    </aegov-dropdown>
  </div>
</div>

`gap` (default 8) sets the distance from the trigger; `offset` (default 0) nudges the menu along the alignment axis. Both are in pixels.

---

## Tab behaviour

`tabBehavior` selects which ARIA pattern the dropdown follows. This changes both the roles applied and what `Tab` does — get it right for the content you are putting in the menu.

| Value | Pattern | Roles | `Tab` |
| --- | --- | --- | --- |
| `menu-button` | WAI-ARIA Menu Button | `role="menu"` on the panel, `role="menuitem"` on items, `aria-haspopup` on the trigger | Closes the menu and moves focus to the next element on the page. |
| `disclosure` | WAI-ARIA Disclosure | `aria-expanded` only, no menu roles | Moves focus through the links inside the open menu. |

```html
<!-- A menu of commands -->
<aegov-dropdown tab-behavior="menu-button">…</aegov-dropdown>

<!-- A panel of navigation links -->
<aegov-dropdown tab-behavior="disclosure">…</aegov-dropdown>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-4">
    <aegov-dropdown field-id="dd-tb1" tab-behavior="menu-button">
      <aegov-button size="sm" appearance="outline">menu-button</aegov-button>
      <div slot="dropdown-content"><a href="#">Print</a><a href="#">Export</a><a href="#">Duplicate</a></div>
    </aegov-dropdown>
    <aegov-dropdown field-id="dd-tb2" tab-behavior="disclosure">
      <aegov-button size="sm" appearance="outline">disclosure</aegov-button>
      <div slot="dropdown-content"><a href="#">Services</a><a href="#">Open data</a><a href="#">About us</a></div>
    </aegov-dropdown>
  </div>
</div>

Rule of thumb: **commands are a menu, links are a disclosure.** A screen reader user hearing "menu, three items" expects to operate a menu with arrow keys; hearing that about a group of page links is misleading. `menu-button` is the default because the most common use is a row-actions menu.

---

## Menu content

The `dropdown-content` slot takes ordinary markup. Links, buttons and separators are all styled by the portal's injected CSS.

```html
<aegov-dropdown>
  <aegov-button appearance="outline">Account</aegov-button>

  <div slot="dropdown-content">
    <div class="px-4 py-2">
      <p class="font-semibold">Ahmed Al Mansouri</p>
      <p class="text-sm text-aeblack-500">ahmed@example.ae</p>
    </div>
    <aegov-separator></aegov-separator>
    <a href="/profile">My profile</a>
    <a href="/applications">My applications</a>
    <a href="/settings">Settings</a>
    <aegov-separator></aegov-separator>
    <button type="button">Sign out</button>
  </div>
</aegov-dropdown>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-dropdown field-id="dd-acct" align="end">
    <aegov-button appearance="outline">
      <aegov-avatar size="xs" alt="Ahmed Al Mansouri"></aegov-avatar>
      Account
    </aegov-button>
    <div slot="dropdown-content">
      <div class="px-4 py-2">
        <p class="font-semibold">Ahmed Al Mansouri</p>
        <p class="text-sm text-aeblack-500">ahmed@example.ae</p>
      </div>
      <aegov-separator></aegov-separator>
      <a href="#">My profile</a>
      <a href="#">My applications</a>
      <a href="#">Settings</a>
      <aegov-separator></aegov-separator>
      <button type="button">Sign out</button>
    </div>
  </aegov-dropdown>
</div>

Disabled items are respected: an `<a aria-disabled="true">` or a `<button disabled>` is styled as unavailable and skipped by keyboard navigation.

### Nested dropdowns

A dropdown can contain another dropdown, producing a submenu.

```html
<aegov-dropdown>
  <aegov-button appearance="outline">Export</aegov-button>
  <div slot="dropdown-content">
    <a href="#">Download PDF</a>
    <aegov-dropdown position="right" align="start">
      <a href="#" class="aegov-dropdown-trigger">More formats</a>
      <div slot="dropdown-content">
        <a href="#">CSV</a>
        <a href="#">JSON</a>
      </div>
    </aegov-dropdown>
  </div>
</aegov-dropdown>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-dropdown field-id="dd-nest">
    <aegov-button appearance="outline">Export</aegov-button>
    <div slot="dropdown-content">
      <a href="#">Download PDF</a>
      <a href="#">Download XLSX</a>
      <aegov-dropdown field-id="dd-nest-sub" position="right" align="start">
        <a href="#">More formats</a>
        <div slot="dropdown-content">
          <a href="#">CSV</a>
          <a href="#">JSON</a>
          <a href="#">XML</a>
        </div>
      </aegov-dropdown>
    </div>
  </aegov-dropdown>
</div>

Nesting works because the component re-establishes its portal when it is re-inserted into the DOM — the parent moving its content triggers a disconnect and reconnect on the nested dropdown, and it recovers. Keep nesting to one level: a second submenu is very difficult to operate on touch and with a keyboard.

Note the trigger inside a submenu carries `aria-haspopup` under the `menu-button` pattern, and items that open a submenu are deliberately not treated as activatable menu items.

---

## Disabled

```html
<aegov-dropdown is-disabled>
  <aegov-button appearance="outline" is-disabled>Actions</aegov-button>
  <div slot="dropdown-content">…</div>
</aegov-dropdown>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-dropdown field-id="dd-dis" is-disabled>
    <aegov-button appearance="outline" is-disabled>Actions</aegov-button>
    <div slot="dropdown-content"><a href="#">Item one</a></div>
  </aegov-dropdown>
</div>

Disable the trigger as well — `is-disabled` on the dropdown stops it opening, but the trigger still looks interactive without it.

---

## Controlling it in code

```js
await dropdown.toggle();          // pointer-style toggle
await dropdown.toggle(true);      // keyboard-style: focuses the first item on open
await dropdown.closeDropdown();
```

The `viaKeyboard` argument matters for accessibility: passing `true` moves focus into the menu on open, which is what the menu pattern requires for keyboard activation. Pass `false` — or omit it — from pointer handlers, where stealing focus would be wrong.

This is how an external control, such as a chevron inside an [`aegov-navbar-item`](aegov-navbar.html), can drive a dropdown that is otherwise hover-triggered.

---

## Composite example — table row actions

```html
<td class="text-end">
  <aegov-dropdown align="end">
    <aegov-button is-icon size="sm" appearance="soft" variant="neutral-max" aria-label="Actions for APP-2026-0041827">
      <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm5.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM14 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
      </svg>
    </aegov-button>

    <div slot="dropdown-content">
      <a href="/applications/41827">View</a>
      <a href="/applications/41827/edit">Edit</a>
      <a href="/applications/41827/receipt">Download receipt</a>
      <aegov-separator></aegov-separator>
      <button type="button" data-action="withdraw">Withdraw</button>
    </div>
  </aegov-dropdown>
</td>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <ul class="divide-y divide-aeblack-100 max-w-lg">
    <li class="flex items-center justify-between py-3">
      <div><p class="font-medium">APP-2026-0041827</p><p class="text-sm text-aeblack-500">Emirates ID renewal</p></div>
      <div class="flex items-center gap-3">
        <aegov-badge variant="aegreen">Active</aegov-badge>
        <aegov-dropdown field-id="dd-row-1" align="end">
          <aegov-button is-icon size="sm" appearance="soft" variant="neutral-max" aria-label="Actions for APP-2026-0041827">
            <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm5.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM14 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" /></svg>
          </aegov-button>
          <div slot="dropdown-content">
            <a href="#">View</a>
            <a href="#">Edit</a>
            <a href="#">Download receipt</a>
            <aegov-separator></aegov-separator>
            <button type="button">Withdraw</button>
          </div>
        </aegov-dropdown>
      </div>
    </li>
    <li class="flex items-center justify-between py-3">
      <div><p class="font-medium">APP-2026-0039114</p><p class="text-sm text-aeblack-500">Residency visa renewal</p></div>
      <div class="flex items-center gap-3">
        <aegov-badge variant="camel">Pending</aegov-badge>
        <aegov-dropdown field-id="dd-row-2" align="end">
          <aegov-button is-icon size="sm" appearance="soft" variant="neutral-max" aria-label="Actions for APP-2026-0039114">
            <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm5.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM14 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" /></svg>
          </aegov-button>
          <div slot="dropdown-content">
            <a href="#">View</a>
            <a href="#">Edit</a>
            <aegov-separator></aegov-separator>
            <button type="button">Withdraw</button>
          </div>
        </aegov-dropdown>
      </div>
    </li>
  </ul>
</div>

Note the `aria-label` on each icon trigger includes the row's reference. Ten identical "Actions" buttons in a list are indistinguishable to a screen reader user.

---

## RTL Support

The dropdown is direction-aware. Alignment is logical, so `align="start"` follows the reading direction, and the portal's injected CSS includes explicit `[dir="rtl"]` rules for text alignment inside the menu. Nested submenus open toward the reading direction.

**Set `dir` on `<html>`**, not on an inner wrapper. The menu content is moved into a portal on `document.body`, so it inherits direction from the document.

```html
<html dir="rtl" lang="ar">
  <aegov-dropdown align="start">
    <aegov-button appearance="outline">الإجراءات</aegov-button>
    <div slot="dropdown-content">
      <a href="#">عرض الطلب</a>
      <a href="#">تعديل البيانات</a>
      <aegov-separator></aegov-separator>
      <a href="#">سحب الطلب</a>
    </div>
  </aegov-dropdown>
</html>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-4">
    <aegov-dropdown field-id="dd-rtl-1" align="start">
      <aegov-button appearance="outline">الإجراءات</aegov-button>
      <div slot="dropdown-content">
        <a href="#">عرض الطلب</a>
        <a href="#">تعديل البيانات</a>
        <a href="#">تحميل الإيصال</a>
        <aegov-separator></aegov-separator>
        <a href="#">سحب الطلب</a>
      </div>
    </aegov-dropdown>
    <aegov-dropdown field-id="dd-rtl-2" align="end">
      <aegov-button appearance="outline" size="sm">الحساب</aegov-button>
      <div slot="dropdown-content">
        <a href="#">ملفي الشخصي</a>
        <a href="#">طلباتي</a>
        <aegov-separator></aegov-separator>
        <button type="button">تسجيل الخروج</button>
      </div>
    </aegov-dropdown>
  </div>
</div>

Directional icons in the trigger — a chevron, a caret — are yours to mirror if they point sideways. A down-chevron needs no change.

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID for the dropdown. Auto-generated when omitted, reflected. | `string` | _generated_ |
| `trigger` | `trigger` | How the menu opens. | `'click' \| 'hover'` | `'click'` |
| `tabBehavior` | `tab-behavior` | Which ARIA pattern to follow — see [Tab behaviour](#tab-behaviour). | `'menu-button' \| 'disclosure'` | `'menu-button'` |
| `position` | `position` | Which side of the trigger the menu appears on. | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` |
| `align` | `align` | Alignment along that side. Logical, so it follows text direction. | `'start' \| 'center' \| 'end'` | `'start'` |
| `gap` | `gap` | Distance from the trigger, in pixels. | `number` | `8` |
| `offset` | `offset` | Nudge along the alignment axis, in pixels. | `number` | `0` |
| `delayStart` | `delay-start` | Hover open delay, in milliseconds. | `number` | `200` |
| `delayEnd` | `delay-end` | Hover close delay, in milliseconds. | `number` | `0` |
| `isDisabled` | `is-disabled` | Prevents opening. | `boolean` | `false` |

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | The trigger. Usually an `aegov-button`, or a link inside a submenu. |
| `dropdown-content` | The menu. Links, buttons and separators. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovDropdownOpen` | `void` | The menu opened. |
| `aegovDropdownClose` | `void` | The menu closed. |

### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `toggle(viaKeyboard?, viaArrow?)` | `Promise<void>` | Opens or closes regardless of `trigger`. Pass `true` for `viaKeyboard` from keyboard handlers so focus moves into the menu. |
| `closeDropdown()` | `Promise<void>` | Closes the menu. |

### The portal — move, not clone

When the menu opens, the element in the `dropdown-content` slot is **physically moved** into a portal on `document.body`, and moved back on close.

This matters:

- **It is a move, not a copy.** Any element references you hold stay valid, and web components inside the menu keep their state. Cloning would double-render nested Stencil components, which is why moving is used.
- **Host styles do not reach the menu while open.** The portal injects its own CSS, including overrides for `<a>` display and dark-mode colours, because scoped component CSS cannot reach a body descendant.
- **`document.querySelector` inside your container will not find the open menu.** In tests, wait for `.aegov-dropdown-portal .aegov-dropdown`.
- **Direction is inherited from the document.**

| Selector | Element |
| --- | --- |
| `.aegov-dropdown-portal` | The portal container on the body. |
| `.aegov-dropdown` | The menu panel inside the portal. |
| `.aegov-dropdown-trigger` | The trigger wrapper in place. |
| `[data-state="open"]` | On the panel while open. |

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the trigger wrapper. Put `aria-label` on the trigger button itself for icon triggers. |
| `data-*` | Yes | Forwarded to the trigger wrapper. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host. The open menu is in the portal and unaffected. |

---

## Accessibility

### Built-in behaviour

- **The ARIA pattern follows `tabBehavior`.** Under `menu-button` the panel gets `role="menu"` with an accessible name, focusable children get `role="menuitem"`, and the trigger gets `aria-haspopup`. Under `disclosure` only `aria-expanded` is used — no menu roles, because a group of page links is not a menu.
- `aria-expanded` on the trigger tracks the open state in both patterns.
- The trigger is resolved intelligently: a real `<button>` or `[role="button"]` inside the slot is preferred over a navigating `<a>`, so `aria-haspopup` and `aria-expanded` land on the right element. A plain navigation link is deliberately left without `aria-haspopup` so screen readers do not announce a menu that is really a link.
- **Full keyboard operation**, including arrow keys, `Home`, `End` and typeahead-free item traversal — see the table below.
- Arrow-key opens always move focus into the menu. `Enter` and `Space` opens leave focus on the trigger in `disclosure` mode, per the WAI-ARIA Disclosure pattern.
- Only one dropdown is open at a time, so menus cannot pile up.
- Disabled items — `aria-disabled="true"` or `disabled` — are skipped by keyboard navigation.
- Focus returns to the trigger on close, using `preventScroll` so the page does not jump when a dropdown closes because the trigger scrolled out of view.
- Items that open a submenu are not treated as activatable, so `Enter` on them opens the submenu rather than firing an action.
- The portal keeps the menu out of any clipping ancestor, which also avoids WCAG 2.2 SC 2.4.11 failures where a focused item is hidden.

### Developer responsibilities

- **Choose `tabBehavior` deliberately.** Commands are a menu; links are a disclosure. The wrong choice misdescribes the content to screen reader users.
- **Give icon-only triggers a specific `aria-label`**, including the row or object they act on. Ten "Actions" buttons are indistinguishable.
- **Prefer `trigger="click"`.** Hover menus are unusable on touch and hostile to motor-impaired users.
- **Do not use a dropdown for form values.** Use [Select](aegov-select.html), which is form-associated and validated.
- **Keep menus short.** Beyond about ten items, use a page or a [Drawer](aegov-drawer.html).
- **Limit nesting to one level.**
- **Disable the trigger too** when you set `is-disabled`.
- **Set `dir` on `<html>`** for RTL, since the menu is portalled to the body.
- **Do not put form fields in a dropdown.** The menu roles conflict with form controls, and the portal move complicates focus. Use a [Popover](aegov-popover.html) for a small panel with inputs.
- **Mirror sideways-pointing trigger icons** in RTL.

### Keyboard support

| Key | Action |
| --- | --- |
| `Enter`, `Space` | Open the menu from the trigger, or activate the focused item. In `disclosure` mode, opening leaves focus on the trigger. |
| `ArrowDown` | Open the menu and focus the first item, or move to the next item. |
| `ArrowUp` | Open the menu and focus the last item, or move to the previous item. |
| `Home` | Move to the first item. |
| `End` | Move to the last item. |
| `Escape` | Close the menu and return focus to the trigger. |
| `Tab` | In `menu-button` mode, close the menu and move on. In `disclosure` mode, move through the items. |

---

## Where to next

- [Select](aegov-select.html) — for form values rather than commands.
- [Popover](aegov-popover.html) — for a small anchored panel that may contain fields.
- [Navbar](aegov-navbar.html) — which uses dropdowns for sub-navigation.
- [Button](aegov-button.html) — the usual trigger.
