# Popover

<p class="text-lg text-aeblack-500 mb-8">A Popover is a small floating panel anchored to a trigger element with a directional arrow. Use it for short, contextual content — definitions, helper text, mini-forms, or quick actions — that benefits from a clear visual connection back to the control that opened it. For short hover-only labels, use a Tooltip; for blocking dialogs, use a Modal.</p>

## Introduction

The `aegov-popover` component wraps a trigger element and renders its `popover-content` slot into a portal at `document.body`, so the panel can escape any clipping or stacking context on the page. By default the popover opens on click, focus is trapped inside while it is open, and `Escape`, outside-click, or scrolling the trigger out of view all close it. Only one popover can be open at a time.

```html
<aegov-popover position="bottom" align="center">
  <aegov-button variant="secondary">Quick actions</aegov-button>
  <div slot="popover-content">
    <h4 class="text-base font-semibold mb-2">Service shortcuts</h4>
    <ul class="space-y-1 text-sm">
      <li><a href="#" class="text-primary-600 hover:underline">Renew Emirates ID</a></li>
      <li><a href="#" class="text-primary-600 hover:underline">Pay traffic fines</a></li>
      <li><a href="#" class="text-primary-600 hover:underline">Track application</a></li>
    </ul>
  </div>
</aegov-popover>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex justify-center py-12">
    <aegov-popover position="bottom" align="center">
      <aegov-button variant="secondary">Quick actions</aegov-button>
      <div slot="popover-content">
        <h4 class="text-base font-semibold mb-2">Service shortcuts</h4>
        <ul class="space-y-1 text-sm">
          <li><a href="#" class="text-primary-600 hover:underline">Renew Emirates ID</a></li>
          <li><a href="#" class="text-primary-600 hover:underline">Pay traffic fines</a></li>
          <li><a href="#" class="text-primary-600 hover:underline">Track application</a></li>
        </ul>
      </div>
    </aegov-popover>
  </div>
</div>

---

## Position

The `position` property sets which side of the trigger the popover prefers. If there is not enough space on the chosen side, the popover automatically flips to the opposite side so it stays inside the viewport.

```html
<aegov-popover position="top">
  <aegov-button variant="secondary">Top</aegov-button>
  <div slot="popover-content">Popover content above the trigger.</div>
</aegov-popover>

<aegov-popover position="right">
  <aegov-button variant="secondary">Right</aegov-button>
  <div slot="popover-content">Popover content to the right.</div>
</aegov-popover>

<aegov-popover position="bottom">
  <aegov-button variant="secondary">Bottom</aegov-button>
  <div slot="popover-content">Popover content below the trigger.</div>
</aegov-popover>

<aegov-popover position="left">
  <aegov-button variant="secondary">Left</aegov-button>
  <div slot="popover-content">Popover content to the left.</div>
</aegov-popover>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-12 items-center justify-center py-16">
    <aegov-popover position="top">
      <aegov-button variant="secondary">Top</aegov-button>
      <div slot="popover-content"><strong>Top.</strong> The popover appears above the trigger and points down.</div>
    </aegov-popover>
    <aegov-popover position="right">
      <aegov-button variant="secondary">Right</aegov-button>
      <div slot="popover-content"><strong>Right.</strong> The popover appears to the right of the trigger.</div>
    </aegov-popover>
    <aegov-popover position="bottom">
      <aegov-button variant="secondary">Bottom</aegov-button>
      <div slot="popover-content"><strong>Bottom.</strong> The popover appears below the trigger.</div>
    </aegov-popover>
    <aegov-popover position="left">
      <aegov-button variant="secondary">Left</aegov-button>
      <div slot="popover-content"><strong>Left.</strong> The popover appears to the left of the trigger.</div>
    </aegov-popover>
  </div>
</div>

---

## Alignment

`align` shifts the popover along its cross-axis relative to the trigger. For a `bottom`-positioned popover this means horizontal alignment; for a `left`-positioned popover it means vertical alignment.

```html
<aegov-popover position="bottom" align="start">
  <aegov-button variant="secondary">Start</aegov-button>
  <div slot="popover-content">Anchored to the start edge of the trigger.</div>
</aegov-popover>

<aegov-popover position="bottom" align="center">
  <aegov-button variant="secondary">Centre</aegov-button>
  <div slot="popover-content">Centred on the trigger.</div>
</aegov-popover>

<aegov-popover position="bottom" align="end">
  <aegov-button variant="secondary">End</aegov-button>
  <div slot="popover-content">Anchored to the end edge of the trigger.</div>
</aegov-popover>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-12 items-center justify-center py-12">
    <aegov-popover position="bottom" align="start">
      <aegov-button variant="secondary">Start</aegov-button>
      <div slot="popover-content">Anchored to the start edge of the trigger.</div>
    </aegov-popover>
    <aegov-popover position="bottom" align="center">
      <aegov-button variant="secondary">Centre</aegov-button>
      <div slot="popover-content">Centred on the trigger.</div>
    </aegov-popover>
    <aegov-popover position="bottom" align="end">
      <aegov-button variant="secondary">End</aegov-button>
      <div slot="popover-content">Anchored to the end edge of the trigger.</div>
    </aegov-popover>
  </div>
</div>

---

## Trigger

By default the popover opens on click and stays open until the user clicks elsewhere or presses `Escape`. Set `trigger="hover"` to open on hover with a short grace period, so users can move their cursor onto the popover content without it closing.

```html
<aegov-popover trigger="click" position="bottom">
  <aegov-button variant="secondary">Click to open</aegov-button>
  <div slot="popover-content">Click triggers are best for popovers users will read or interact with.</div>
</aegov-popover>

<aegov-popover trigger="hover" position="bottom">
  <aegov-button variant="secondary">Hover to open</aegov-button>
  <div slot="popover-content">Hover triggers suit transient information that does not need a click.</div>
</aegov-popover>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-6 items-center justify-center py-8">
    <aegov-popover trigger="click" position="bottom">
      <aegov-button variant="secondary">Click to open</aegov-button>
      <div slot="popover-content">Click triggers are best for popovers users will read or interact with.</div>
    </aegov-popover>
    <aegov-popover trigger="hover" position="bottom">
      <aegov-button variant="secondary">Hover to open</aegov-button>
      <div slot="popover-content">Hover triggers suit transient information that does not need a click.</div>
    </aegov-popover>
  </div>
</div>

---

## Delay

When the popover is set to `trigger="hover"`, `delay-start` (default 200 ms) controls how long the user must hover before it appears, and `delay-end` (default 0 ms) adds a brief delay before it hides — giving the user time to move into the popover.

```html
<aegov-popover trigger="hover" delay-start="500" position="top">
  <aegov-button variant="secondary">Slow appearance</aegov-button>
  <div slot="popover-content">Appears after 500 ms of sustained hover.</div>
</aegov-popover>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-6 items-center justify-center py-8">
    <aegov-popover trigger="hover" delay-start="200" position="bottom">
      <aegov-button variant="secondary">Default delay (200 ms)</aegov-button>
      <div slot="popover-content">Opens after the default 200 ms hover delay.</div>
    </aegov-popover>
    <aegov-popover trigger="hover" delay-start="500" position="bottom">
      <aegov-button variant="secondary">Slow appearance (500 ms)</aegov-button>
      <div slot="popover-content">Appears after 500 ms of sustained hover.</div>
    </aegov-popover>
    <aegov-popover trigger="hover" delay-start="0" delay-end="300" position="bottom">
      <aegov-button variant="secondary">Slow hide (300 ms)</aegov-button>
      <div slot="popover-content">Stays open for 300 ms after the cursor leaves.</div>
    </aegov-popover>
  </div>
</div>

---

## Gap and Offset

`gap` (pixels, default 10) controls the distance between the trigger and the popover. `offset` (default 0) shifts the popover along its cross-axis — useful when the trigger has visual padding that the popover should not appear to overlap.

```html
<aegov-popover position="bottom" gap="2">
  <aegov-button variant="secondary">Tight</aegov-button>
  <div slot="popover-content">Snug to the trigger.</div>
</aegov-popover>

<aegov-popover position="bottom" gap="20">
  <aegov-button variant="secondary">Loose</aegov-button>
  <div slot="popover-content">A larger gap from the trigger.</div>
</aegov-popover>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-8 items-center justify-center py-8">
    <aegov-popover position="bottom" gap="2">
      <aegov-button variant="secondary">Tight (gap 2)</aegov-button>
      <div slot="popover-content">Snug to the trigger — only 2 px gap.</div>
    </aegov-popover>
    <aegov-popover position="bottom" gap="10">
      <aegov-button variant="secondary">Default (gap 10)</aegov-button>
      <div slot="popover-content">The default 10 px gap from the trigger.</div>
    </aegov-popover>
    <aegov-popover position="bottom" gap="20">
      <aegov-button variant="secondary">Loose (gap 20)</aegov-button>
      <div slot="popover-content">A larger 20 px gap from the trigger.</div>
    </aegov-popover>
    <aegov-popover position="bottom" gap="10" offset="40">
      <aegov-button variant="secondary">Offset (40)</aegov-button>
      <div slot="popover-content">Shifted 40 px along the cross-axis with offset.</div>
    </aegov-popover>
  </div>
</div>

---

## Disabled State

Set `is-disabled` to prevent the popover from opening at all. The trigger is still rendered and remains in the tab order — only the popover behaviour is suppressed. Use this when the action the popover supports is conditionally unavailable, for example while a form section is locked or a permission is missing.

```html
<!-- Popover is fully functional -->
<aegov-popover position="bottom">
  <aegov-button variant="secondary">Enabled</aegov-button>
  <div slot="popover-content">This popover opens normally.</div>
</aegov-popover>

<!-- Popover is disabled — clicking or hovering has no effect -->
<aegov-popover position="bottom" is-disabled>
  <aegov-button variant="secondary" disabled>Disabled</aegov-button>
  <div slot="popover-content">This content is never shown.</div>
</aegov-popover>
```

You can also toggle the property programmatically:

```js
const popover = document.querySelector('aegov-popover');
popover.isDisabled = true;   // suppress
popover.isDisabled = false;  // re-enable
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-6 items-center justify-center py-8">
    <aegov-popover position="bottom">
      <aegov-button variant="secondary">Enabled popover</aegov-button>
      <div slot="popover-content">This popover opens normally — click or hover.</div>
    </aegov-popover>
    <aegov-popover position="bottom" is-disabled>
      <aegov-button variant="secondary" disabled>Disabled popover</aegov-button>
      <div slot="popover-content">This content is never shown while is-disabled is set.</div>
    </aegov-popover>
  </div>
</div>

---

## Composite Example — Help Text on a Form Field

A popover is well-suited to in-context help — clicking an info icon next to a field opens a short explanation that may include a link to a fuller article. Because the popover is interactive, the link inside the panel is keyboard-reachable; a tooltip would not allow that.

```html
<div class="max-w-md">
  <div class="flex items-center gap-2 mb-2">
    <label for="iban" class="font-semibold">IBAN</label>
    <aegov-popover position="top" align="start">
      <aegov-button is-icon appearance="soft" size="xs" aria-label="What is an IBAN?">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4M12 8h.01"></path></svg>
      </aegov-button>
      <div slot="popover-content" class="max-w-xs">
        <h4 class="text-base font-semibold mb-2">International Bank Account Number</h4>
        <p class="text-sm mb-2">A UAE IBAN is 23 characters long and starts with <strong>AE</strong>. You will find it on the front of your bank card or on a recent bank statement.</p>
        <a href="#" class="text-sm text-primary-600 hover:underline">Read full guidance</a>
      </div>
    </aegov-popover>
  </div>
  <aegov-input field-id="iban" placeholder="AE07 0331 2345 6789 0123 456"></aegov-input>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <div class="flex items-center gap-2 mb-2">
      <label for="demo-iban" class="font-semibold">IBAN</label>
      <aegov-popover position="top" align="start">
        <aegov-button is-icon appearance="soft" size="xs" aria-label="What is an IBAN?">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4M12 8h.01"></path></svg>
        </aegov-button>
        <div slot="popover-content" class="max-w-xs">
          <h4 class="text-base font-semibold mb-2">International Bank Account Number</h4>
          <p class="text-sm mb-2">A UAE IBAN is 23 characters long and starts with <strong>AE</strong>. You will find it on the front of your bank card or on a recent bank statement.</p>
          <a href="#" class="text-sm text-primary-600 hover:underline">Read full guidance</a>
        </div>
      </aegov-popover>
    </div>
    <aegov-input field-id="demo-iban" placeholder="AE07 0331 2345 6789 0123 456"></aegov-input>
  </div>
</div>

---

## Composite Example — Quick Actions Menu

Popovers are also useful for compact action menus attached to a row, card, or service tile. Because content inside is fully focusable, links and buttons all work with the keyboard.

```html
<div class="bg-white border border-aeblack-100 rounded-lg p-4 flex items-center justify-between max-w-md">
  <div>
    <h4 class="font-semibold">Application #AE-2026-0419-3128</h4>
    <p class="text-sm text-aeblack-500">Submitted 12 March 2026</p>
  </div>
  <aegov-popover position="bottom" align="end">
    <aegov-button variant="ghost" aria-label="More actions">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"></circle><circle cx="12" cy="12" r="2"></circle><circle cx="19" cy="12" r="2"></circle></svg>
    </aegov-button>
    <div slot="popover-content" class="min-w-[12rem]">
      <ul class="space-y-1 text-sm">
        <li><a href="#" class="block px-2 py-1 hover:bg-aeblack-50 rounded">View details</a></li>
        <li><a href="#" class="block px-2 py-1 hover:bg-aeblack-50 rounded">Download receipt</a></li>
        <li><a href="#" class="block px-2 py-1 hover:bg-aeblack-50 rounded">Track status</a></li>
        <li><a href="#" class="block px-2 py-1 hover:bg-aeblack-50 rounded text-aered-600">Cancel application</a></li>
      </ul>
    </div>
  </aegov-popover>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="bg-white border border-aeblack-100 rounded-lg p-4 flex items-center justify-between max-w-md">
    <div>
      <h4 class="font-semibold">Application #AE-2026-0419-3128</h4>
      <p class="text-sm text-aeblack-500">Submitted 12 March 2026</p>
    </div>
    <aegov-popover position="bottom" align="end">
      <aegov-button variant="ghost" aria-label="More actions">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"></circle><circle cx="12" cy="12" r="2"></circle><circle cx="19" cy="12" r="2"></circle></svg>
      </aegov-button>
      <div slot="popover-content" class="min-w-[12rem]">
        <ul class="space-y-1 text-sm">
          <li><a href="#" class="block px-2 py-1 hover:bg-aeblack-50 rounded">View details</a></li>
          <li><a href="#" class="block px-2 py-1 hover:bg-aeblack-50 rounded">Download receipt</a></li>
          <li><a href="#" class="block px-2 py-1 hover:bg-aeblack-50 rounded">Track status</a></li>
          <li><a href="#" class="block px-2 py-1 hover:bg-aeblack-50 rounded text-aered-600">Cancel application</a></li>
        </ul>
      </div>
    </aegov-popover>
  </div>
</div>

---

## RTL Support

The popover follows the document direction. The internal layout of the panel mirrors automatically when `dir="rtl"` is set on an ancestor, and `align="start"` / `align="end"` follow the reading direction. The `position` values remain absolute viewport directions (`top`, `right`, `bottom`, `left`).

```html
<div dir="rtl">
  <aegov-popover position="bottom" align="start">
    <aegov-button variant="secondary">إجراءات سريعة</aegov-button>
    <div slot="popover-content">
      <h4 class="text-base font-semibold mb-2">اختصارات الخدمات</h4>
      <ul class="space-y-1 text-sm">
        <li><a href="#" class="text-primary-600 hover:underline">تجديد الهوية الإماراتية</a></li>
        <li><a href="#" class="text-primary-600 hover:underline">دفع المخالفات المرورية</a></li>
        <li><a href="#" class="text-primary-600 hover:underline">متابعة الطلب</a></li>
      </ul>
    </div>
  </aegov-popover>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex justify-center py-12">
    <aegov-popover position="bottom" align="start">
      <aegov-button variant="secondary">إجراءات سريعة</aegov-button>
      <div slot="popover-content">
        <h4 class="text-base font-semibold mb-2">اختصارات الخدمات</h4>
        <ul class="space-y-1 text-sm">
          <li><a href="#" class="text-primary-600 hover:underline">تجديد الهوية الإماراتية</a></li>
          <li><a href="#" class="text-primary-600 hover:underline">دفع المخالفات المرورية</a></li>
          <li><a href="#" class="text-primary-600 hover:underline">متابعة الطلب</a></li>
        </ul>
      </div>
    </aegov-popover>
  </div>
</div>

---

## API Reference

### Properties

| Property      | Attribute     | Description                                                                              | Type                                       | Default     |
| ------------- | ------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------ | ----------- |
| `fieldId`     | `field-id`    | DOM `id` for the popover panel. The trigger receives `${fieldId}-trigger` for ARIA linkage. Auto-generated if omitted. | `string`                                   | _generated_ |
| `trigger`     | `trigger`     | How the popover is opened.                                                               | `'click' \| 'hover'`                       | `'click'`   |
| `position`    | `position`    | Preferred side of the trigger. The popover auto-flips when there is no room.             | `'top' \| 'right' \| 'bottom' \| 'left'`   | `'bottom'`  |
| `align`       | `align`       | Alignment along the popover's cross-axis.                                                | `'start' \| 'center' \| 'end'`             | `'center'`  |
| `gap`         | `gap`         | Distance in pixels between the trigger and the popover.                                  | `number`                                   | `10`        |
| `offset`      | `offset`      | Additional offset along the cross-axis, in pixels.                                       | `number`                                   | `0`         |
| `isDisabled`  | `is-disabled` | Suppress opening the popover entirely.                                                   | `boolean`                                  | `false`     |
| `delayStart`  | `delay-start` | Delay before showing on hover, in milliseconds.                                          | `number`                                   | `200`       |
| `delayEnd`    | `delay-end`   | Delay before hiding on hover, in milliseconds. (A minimum 100 ms grace is always applied for hover.) | `number`                                   | `0`         |

### Slots

| Slot                | Description                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------- |
| _(default)_         | The trigger element — typically a button or icon button.                                 |
| `popover-content`   | The popover body. Any HTML or other components are accepted.                             |

### Events

| Event                  | Detail | Description                                          |
| ---------------------- | ------ | ---------------------------------------------------- |
| `aegovPopoverOpen`     | `void` | Fired when the popover transitions to the open state. |
| `aegovPopoverClose`    | `void` | Fired when the popover transitions to the closed state. |

### Methods

| Method             | Returns         | Description                                      |
| ------------------ | --------------- | ------------------------------------------------ |
| `closePopover()`   | `Promise<void>` | Programmatically close the popover if it is open. |

### Pass-through Attributes

The popover does not currently forward host-element attributes through to the panel — apply ARIA on the trigger element you place in the default slot, or on the host. The component sets `role`, `aria-haspopup`, `aria-expanded`, `aria-controls`, and `aria-labelledby` automatically.

| Attribute group     | Forwarded? | Where to apply                                                                  |
| ------------------- | ---------- | ------------------------------------------------------------------------------- |
| `aria-*`            | No         | Apply directly to the trigger you slot in, or to `<aegov-popover>`.             |
| `data-*`            | No         | Apply directly to the trigger you slot in, or to `<aegov-popover>`.             |
| `aria-haspopup`     | Managed    | Set to `dialog` on the first focusable child inside the trigger slot.           |
| `aria-expanded`     | Managed    | Reflects the open state on the first focusable child inside the trigger slot.   |
| `aria-controls`     | Managed    | Set on the first focusable child; points to the popover panel while open.       |
| `aria-labelledby`   | Managed    | The panel is labelled by the trigger wrapper element (contains trigger text).   |
| `class`, `style`    | Allowed    | Applied to the host element.                                                    |

> **Portal note.** Popover content is moved (not cloned) into a portal at `document.body` while open, and returned to its original location when closed. Avoid wrapping `<aegov-popover>` content with CSS that depends on the parent layout — once portalled, the panel only inherits styles from `:root`.

---

## Accessibility

### Built-in behaviour

- `aria-haspopup="dialog"` and `aria-expanded` are propagated imperatively to the first focusable element inside the trigger slot (the element AT reads), not just the wrapper div.
- The portalled panel renders with `role="dialog"` and is labelled by the trigger via `aria-labelledby`.
- When the popover opens, focus moves to the first focusable element inside the panel. If the panel has no focusable children, the panel container itself receives focus (`tabindex="-1"`) so AT announces the dialog immediately.
- `Tab`, `Shift + Tab`, `ArrowUp`, and `ArrowDown` cycle focus through the focusable elements inside the panel.
- `Escape` closes the popover and returns focus to the trigger (with `preventScroll` so the page does not jump).
- When `trigger="hover"`, the popover also opens on keyboard **focus** and closes on **blur** (SC 2.1.1) — hover-only interaction is never the sole access path.
- Clicking outside the trigger and panel closes the popover.
- If the trigger scrolls out of the viewport, the popover closes automatically.
- Only one popover may be open at a time; opening a new popover automatically closes any other.

### Developer responsibilities

- **Provide an accessible name on the trigger.** A button with only an icon needs an `aria-label`. The popover panel is then labelled by that trigger automatically.
- Keep popover content compact and self-contained. Long forms or multi-step flows belong in `aegov-modal` or `aegov-drawer`.
- For list-style content, mark up the list with `<ul>` / `<li>` and link items so keyboard users can move through them naturally.
- Be mindful when nesting popovers inside scrollable regions — the popover closes when the trigger scrolls out of view, which is usually the right behaviour but can be disorienting if the user did not intend to scroll the trigger away.

### Keyboard support

| Key                       | Action                                                                            |
| ------------------------- | --------------------------------------------------------------------------------- |
| `Enter`, `Space`          | Open the popover when the trigger is focused (click trigger).                     |
| `Tab` (into trigger)      | Opens the popover when `trigger="hover"` (focus = hover equivalent, SC 2.1.1).   |
| `Escape`                  | Close the popover and return focus to the trigger.                                |
| `Tab` / `Shift + Tab`     | Cycle through focusable elements inside the popover panel.                        |
| `ArrowDown` / `ArrowUp`   | Move to the next/previous focusable element inside the popover panel.             |
