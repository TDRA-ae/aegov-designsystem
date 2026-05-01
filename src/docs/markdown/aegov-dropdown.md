# aegov-dropdown

A menu of actions or navigation items anchored to a trigger button or link. Use a dropdown for action lists, user menus, command groupings, and navigation. Choose `aegov-popover` instead when the panel is informational rather than a list of actions, and `aegov-tooltip` for short hover hints.

The dropdown content is rendered into a portal at `document.body` so it can escape ancestor clipping and stacking contexts.

## Properties

### `trigger`
`'click'` (default) or `'hover'`. Determines how the dropdown opens.

```html
<aegov-dropdown trigger="hover">…</aegov-dropdown>
```

### `position`
`'top'`, `'right'`, `'bottom'` (default), or `'left'`. Preferred placement relative to the trigger. The dropdown auto-flips to the opposite edge if there isn't room.

### `align`
`'start'` (default), `'center'`, or `'end'`. Cross-axis alignment.

### `gap`
Pixel distance between trigger and dropdown panel. Default `8`.

### `offset`
Additional pixel offset on the cross axis. Default `0`.

### `is-disabled`
When `true`, the trigger is inert and the dropdown won't open.

### `delay-start`
Milliseconds to wait before opening (mainly relevant for `trigger="hover"`). Default `200`.

### `delay-end`
Milliseconds to wait before closing on hover-out. Default `0`. A 100 ms grace period is enforced for hover triggers.

### `field-id`
Optional unique ID for the dropdown menu element. Auto-generated as `aegov-dropdown-{n}`. The trigger element receives `${fieldId}-trigger`.

## Examples

### Click dropdown menu

```html
<aegov-dropdown>
  <aegov-button variant="primary">Actions</aegov-button>
  <div slot="dropdown-content">
    <a href="#edit">Edit</a>
    <a href="#share">Share</a>
    <hr />
    <a href="#delete">Delete</a>
  </div>
</aegov-dropdown>
```

### Hover navigation menu

```html
<aegov-dropdown trigger="hover" position="bottom" align="start">
  <a href="#">Products</a>
  <div slot="dropdown-content">
    <a href="/a">Product A</a>
    <a href="/b">Product B</a>
  </div>
</aegov-dropdown>
```

### Aligned to end

```html
<aegov-dropdown align="end" position="bottom">
  <aegov-avatar src="me.jpg" alt="" />
  <div slot="dropdown-content">
    <a href="/profile">Profile</a>
    <a href="/logout">Sign out</a>
  </div>
</aegov-dropdown>
```

### Nested dropdowns

```html
<aegov-dropdown>
  <button>Top menu</button>
  <div slot="dropdown-content">
    <a href="#">Item 1</a>
    <aegov-dropdown trigger="hover" position="right">
      <a href="#">More ›</a>
      <div slot="dropdown-content">
        <a href="#">Sub A</a>
        <a href="#">Sub B</a>
      </div>
    </aegov-dropdown>
  </div>
</aegov-dropdown>
```

## RTL Behavior

`align="start"` resolves to the inline-start edge of the trigger — left in LTR, right in RTL. Position values (`top`/`bottom`/`left`/`right`) are physical and used as the preferred placement; viewport flipping ignores writing direction. Slot content inherits the host document's `dir`.

## API Reference

### Properties

| Property      | Attribute      | Type                                  | Default    |
| ------------- | -------------- | ------------------------------------- | ---------- |
| `fieldId`     | `field-id`     | `string`                              | auto       |
| `trigger`     | `trigger`      | `'click' \| 'hover'`                  | `'click'`  |
| `position`    | `position`     | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` |
| `align`       | `align`        | `'start' \| 'center' \| 'end'`        | `'start'`  |
| `gap`         | `gap`          | `number`                              | `8`        |
| `offset`      | `offset`       | `number`                              | `0`        |
| `isDisabled`  | `is-disabled`  | `boolean`                             | `false`    |
| `delayStart`  | `delay-start`  | `number`                              | `200`      |
| `delayEnd`    | `delay-end`    | `number`                              | `0`        |

### Pass-through Attributes

`aria-*` and `data-*` attributes set on `<aegov-dropdown>` are forwarded onto the trigger wrapper element.

### Events

| Event                 | Description                              | Detail |
| --------------------- | ---------------------------------------- | ------ |
| `aegovDropdownOpen`   | Fires when the dropdown opens.           | `void` |
| `aegovDropdownClose`  | Fires when the dropdown closes.          | `void` |

### Event listening example

```js
const dd = document.querySelector('aegov-dropdown');
dd.addEventListener('aegovDropdownOpen', () => analytics.track('menu_open'));
dd.addEventListener('aegovDropdownClose', () => console.log('closed'));
```

### Slots

| Slot                 | Description                                       |
| -------------------- | ------------------------------------------------- |
| (default)            | The trigger element (button, link, avatar, etc.). |
| `dropdown-content`   | Menu items. Anchors, buttons, and `<hr/>` are styled in the portal. |

### Methods

| Method                          | Description                                                   |
| ------------------------------- | ------------------------------------------------------------- |
| `toggle(viaKeyboard?: boolean)` | Toggle open/closed regardless of `trigger` type. Pass `true` from keyboard handlers so the first menu item gets focus. |

## Accessibility

**Built in**

- Trigger has `aria-haspopup="true"` and `aria-expanded` reflecting state.
- When open, the trigger gets `aria-controls` pointing at the menu.
- The menu has `role="menu"`; focusable children without an explicit `role` get `role="menuitem"`.
- Escape closes the dropdown.
- Tab and Arrow Up/Down cycle focus through menu items.
- Keyboard-triggered opens (Enter/Space on focused trigger) automatically move focus into the menu; pointer opens leave focus on the trigger (per the WAI-ARIA menu pattern).
- Focus returns to the trigger on close (with `preventScroll`, so the page doesn't jump).
- Only one dropdown is open at a time (siblings auto-close); nested dropdowns are exempt.
- Dropdown auto-closes if the trigger scrolls out of the viewport.

**Developer responsibilities**

- The trigger slot must contain a focusable element (button, link, etc.).
- Ensure menu items are keyboard activatable (links, buttons, or elements with `tabindex`).
- Provide an accessible name on the trigger (visible label or `aria-label`).

**Notes**

- `scoped: true` encapsulation: events from inside the menu re-target correctly through portal moves.
- The slot element is **moved** (not cloned) into the portal on open and moved back on close — this preserves Stencil hydration for nested web components.
- Anchor styles inside the portal are reset (`display: block; margin: 0`) to override unlayered global `<a>` styles.
