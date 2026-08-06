# Popover

<p class="text-lg text-aeblack-500 mb-8">A Popover shows a small panel of content anchored to a trigger. Use it for supplementary detail that would clutter the page — an explanation of a fee, a preview of a record, a short set of controls. It sits between a <a href="aegov-tooltip.html">Tooltip</a>, which holds only a short label, and a <a href="aegov-modal.html">Modal</a>, which blocks the page.</p>

## Introduction

Put the trigger in the default slot and the panel in the `popover-content` slot. The panel is portalled to `document.body` on open, so it is never clipped by a scrolling container.

```html
<aegov-popover>
  <aegov-button appearance="outline">What is this fee?</aegov-button>

  <div slot="popover-content">
    <p class="font-semibold mb-1">Service fee</p>
    <p>AED 270 covers processing and card issuance. It is non-refundable once your
    application has been submitted.</p>
  </div>
</aegov-popover>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-popover field-id="pv-intro">
    <aegov-button appearance="outline">What is this fee?</aegov-button>
    <div slot="popover-content">
      <p class="font-semibold mb-1">Service fee</p>
      <p>AED 270 covers processing and card issuance. It is non-refundable once your application has been submitted.</p>
    </div>
  </aegov-popover>
</div>

The panel includes a small arrow pointing back at the trigger, which the component positions for you.

---

## Popover, tooltip or modal?

| Component | Content | Focusable content | Blocks the page |
| --- | --- | --- | --- |
| [Tooltip](aegov-tooltip.html) | A short label or hint. Text only. | No | No |
| **Popover** | A paragraph, a list, small controls. | Yes | No |
| [Modal](aegov-modal.html) | A decision or a form. | Yes | Yes |

If the content contains a link or a button, it must be a popover — a tooltip's content cannot be reached by keyboard or touch. If the user must deal with it before continuing, it is a modal.

---

## Trigger

| Value | Opens on |
| --- | --- |
| `click` | Click, `Enter` or `Space`. |
| `hover` | Pointer hover after `delayStart`. Still opens on click and keyboard. |

```html
<aegov-popover trigger="click">…</aegov-popover>
<aegov-popover trigger="hover">…</aegov-popover>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-4">
    <aegov-popover field-id="pv-tc" trigger="click">
      <aegov-button size="sm" appearance="outline">Click to open</aegov-button>
      <div slot="popover-content"><p>Opened by click. Press Escape to close.</p></div>
    </aegov-popover>
    <aegov-popover field-id="pv-th" trigger="hover">
      <aegov-button size="sm" appearance="outline">Hover to open</aegov-button>
      <div slot="popover-content"><p>Opened by hover, after a short delay.</p></div>
    </aegov-popover>
  </div>
</div>

**Use `click` whenever the panel contains anything interactive.** A hover popover with a link inside is a trap: moving the pointer toward the link may close the panel, and touch users cannot hover at all.

`delayStart` (default 200ms) and `delayEnd` (default 0) control hover timing.

---

## Position and alignment

```html
<aegov-popover position="top" align="center">…</aegov-popover>
<aegov-popover position="right" align="start">…</aegov-popover>
<aegov-popover position="bottom" align="end">…</aegov-popover>
<aegov-popover position="left" align="center">…</aegov-popover>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-4">
    <aegov-popover field-id="pv-pt" position="top">
      <aegov-button size="sm" appearance="outline">top</aegov-button>
      <div slot="popover-content"><p>Above the trigger.</p></div>
    </aegov-popover>
    <aegov-popover field-id="pv-pr" position="right">
      <aegov-button size="sm" appearance="outline">right</aegov-button>
      <div slot="popover-content"><p>To the right of the trigger.</p></div>
    </aegov-popover>
    <aegov-popover field-id="pv-pb" position="bottom">
      <aegov-button size="sm" appearance="outline">bottom</aegov-button>
      <div slot="popover-content"><p>Below the trigger — the default.</p></div>
    </aegov-popover>
    <aegov-popover field-id="pv-pl" position="left">
      <aegov-button size="sm" appearance="outline">left</aegov-button>
      <div slot="popover-content"><p>To the left of the trigger.</p></div>
    </aegov-popover>
  </div>
</div>

`align` positions the panel along the chosen side — `start`, `center` (the default) or `end`. `gap` (default 10) sets the distance from the trigger and `offset` (default 0) nudges it along the alignment axis, both in pixels.

The arrow follows the resolved position automatically.

---

## Content

The `popover-content` slot takes ordinary markup, including interactive elements.

```html
<aegov-popover trigger="click" position="bottom" align="start">
  <aegov-button appearance="soft" size="sm">Ahmed Al Mansouri</aegov-button>

  <div slot="popover-content">
    <div class="flex items-center gap-3 mb-3">
      <aegov-avatar size="base" alt="Ahmed Al Mansouri"></aegov-avatar>
      <div>
        <p class="font-semibold">Ahmed Al Mansouri</p>
        <p class="text-sm text-aeblack-500">Applicant · APP-2026-0041827</p>
      </div>
    </div>
    <aegov-separator></aegov-separator>
    <div class="flex gap-2 mt-3">
      <aegov-button size="sm" variant="primary">View application</aegov-button>
      <aegov-button size="sm" appearance="outline">Message</aegov-button>
    </div>
  </div>
</aegov-popover>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-popover field-id="pv-card" trigger="click" position="bottom" align="start">
    <aegov-button appearance="soft" size="sm">Ahmed Al Mansouri</aegov-button>
    <div slot="popover-content">
      <div class="flex items-center gap-3 mb-3">
        <aegov-avatar size="base" alt="Ahmed Al Mansouri"></aegov-avatar>
        <div>
          <p class="font-semibold">Ahmed Al Mansouri</p>
          <p class="text-sm text-aeblack-500">Applicant · APP-2026-0041827</p>
        </div>
      </div>
      <aegov-separator></aegov-separator>
      <div class="flex gap-2 mt-3">
        <aegov-button size="sm" variant="primary">View application</aegov-button>
        <aegov-button size="sm" appearance="outline">Message</aegov-button>
      </div>
    </div>
  </aegov-popover>
</div>

Keep the panel small. A popover with a scrollbar is a [Drawer](aegov-drawer.html) or a [Modal](aegov-modal.html) in the wrong component.

---

## Disabled

```html
<aegov-popover is-disabled>
  <aegov-button appearance="outline" is-disabled>Details</aegov-button>
  <div slot="popover-content">…</div>
</aegov-popover>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-popover field-id="pv-dis" is-disabled>
    <aegov-button appearance="outline" is-disabled>Details</aegov-button>
    <div slot="popover-content"><p>Never shown.</p></div>
  </aegov-popover>
</div>

---

## Closing it in code

```js
await popover.closePopover();
```

Useful when an action inside the panel should dismiss it:

```html
<aegov-popover id="confirm-popover" trigger="click">
  <aegov-button appearance="outline" size="sm">Withdraw</aegov-button>
  <div slot="popover-content">
    <p class="mb-3">Withdraw this application?</p>
    <div class="flex gap-2">
      <aegov-button id="yes" size="sm" variant="danger">Yes, withdraw</aegov-button>
      <aegov-button id="no" size="sm" appearance="outline">Cancel</aegov-button>
    </div>
  </div>
</aegov-popover>

<script type="module">
  const popover = document.querySelector('#confirm-popover');

  document.querySelector('#no').addEventListener('aegovButtonClick', () => popover.closePopover());

  document.querySelector('#yes').addEventListener('aegovButtonClick', async () => {
    await api.withdraw();
    await popover.closePopover();
    window.aegovToast.show({ message: 'Application withdrawn.', variant: 'success' });
  });
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-popover field-id="pv-confirm" trigger="click">
    <aegov-button appearance="outline" size="sm" variant="danger">Withdraw</aegov-button>
    <div slot="popover-content">
      <p class="mb-3">Withdraw this application?</p>
      <div class="flex gap-2">
        <aegov-button size="sm" variant="danger" onclick="document.querySelector('#pv-confirm').closePopover()">Yes, withdraw</aegov-button>
        <aegov-button size="sm" appearance="outline" onclick="document.querySelector('#pv-confirm').closePopover()">Cancel</aegov-button>
      </div>
    </div>
  </aegov-popover>
</div>

For a genuinely destructive action, prefer a [Modal](aegov-modal.html) — a popover can be dismissed by clicking away, which makes it easy to lose the confirmation without noticing.

---

## Composite example — inline explanations

```html
<dl class="space-y-3">
  <div class="flex items-center justify-between">
    <dt class="flex items-center gap-1">
      Service fee
      <aegov-popover position="top">
        <aegov-button is-icon size="xs" appearance="link" aria-label="About the service fee">
          <svg class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">…</svg>
        </aegov-button>
        <div slot="popover-content">
          <p>AED 270 covers processing and card issuance. Non-refundable once submitted.</p>
        </div>
      </aegov-popover>
    </dt>
    <dd>AED 270.00</dd>
  </div>
</dl>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <dl class="space-y-3 max-w-sm">
    <div class="flex items-center justify-between">
      <dt class="flex items-center gap-1">
        Service fee
        <aegov-popover field-id="pv-cx-1" position="top">
          <aegov-button is-icon size="xs" appearance="link" aria-label="About the service fee">
            <svg class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0Zm-8-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm.75 3.5a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0v-4Z" clip-rule="evenodd" /></svg>
          </aegov-button>
          <div slot="popover-content"><p>AED 270 covers processing and card issuance. Non-refundable once submitted.</p></div>
        </aegov-popover>
      </dt>
      <dd>AED 270.00</dd>
    </div>
    <div class="flex items-center justify-between">
      <dt class="flex items-center gap-1">
        Urgent processing
        <aegov-popover field-id="pv-cx-2" position="top">
          <aegov-button is-icon size="xs" appearance="link" aria-label="About urgent processing">
            <svg class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0Zm-8-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm.75 3.5a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0v-4Z" clip-rule="evenodd" /></svg>
          </aegov-button>
        </aegov-popover>
      </dt>
      <dd>AED 100.00</dd>
    </div>
    <aegov-separator></aegov-separator>
    <div class="flex items-center justify-between font-semibold">
      <dt>Total</dt>
      <dd>AED 370.00</dd>
    </div>
  </dl>
</div>

Note the second popover has no content slot — it renders nothing. Always provide `popover-content`.

---

## RTL Support

The popover is direction-aware. `align` is logical, so `start` follows the reading direction, and the portal's injected CSS includes `[dir="rtl"]` rules for content alignment. The arrow follows the resolved position.

**`position` is physical** — `position="right"` is the right side of the trigger in both directions. Where the side is semantically "after the trigger", swap it with direction:

```js
const isRtl = document.documentElement.dir === 'rtl';
popover.position = isRtl ? 'left' : 'right';
```

**Set `dir` on `<html>`**, since the panel is portalled to `document.body`.

```html
<html dir="rtl" lang="ar">
  <aegov-popover position="top">
    <aegov-button appearance="outline">ما هذه الرسوم؟</aegov-button>
    <div slot="popover-content">
      <p class="font-semibold mb-1">رسوم الخدمة</p>
      <p>تغطي ٢٧٠ درهمًا المعالجة وإصدار البطاقة، وهي غير قابلة للاسترداد بعد إرسال الطلب.</p>
    </div>
  </aegov-popover>
</html>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-4">
    <aegov-popover field-id="pv-rtl-1" position="top">
      <aegov-button appearance="outline">ما هذه الرسوم؟</aegov-button>
      <div slot="popover-content">
        <p class="font-semibold mb-1">رسوم الخدمة</p>
        <p>تغطي ٢٧٠ درهمًا المعالجة وإصدار البطاقة، وهي غير قابلة للاسترداد بعد إرسال الطلب.</p>
      </div>
    </aegov-popover>
    <aegov-popover field-id="pv-rtl-2" trigger="click" align="start">
      <aegov-button appearance="soft" size="sm">أحمد المنصوري</aegov-button>
      <div slot="popover-content">
        <p class="font-semibold">أحمد المنصوري</p>
        <p class="text-sm text-aeblack-500 mb-3">مُقدّم الطلب · APP-2026-0041827</p>
        <aegov-button size="sm" variant="primary">عرض الطلب</aegov-button>
      </div>
    </aegov-popover>
  </div>
</div>

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID for the popover. Auto-generated when omitted, reflected. | `string` | _generated_ |
| `trigger` | `trigger` | How the panel opens. | `'click' \| 'hover'` | `'click'` |
| `position` | `position` | Which **physical** side of the trigger the panel appears on. | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` |
| `align` | `align` | Alignment along that side. Logical, so it follows text direction. | `'start' \| 'center' \| 'end'` | `'center'` |
| `gap` | `gap` | Distance from the trigger, in pixels. | `number` | `10` |
| `offset` | `offset` | Nudge along the alignment axis, in pixels. | `number` | `0` |
| `delayStart` | `delay-start` | Hover open delay, in milliseconds. | `number` | `200` |
| `delayEnd` | `delay-end` | Hover close delay, in milliseconds. | `number` | `0` |
| `isDisabled` | `is-disabled` | Prevents opening. | `boolean` | `false` |

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | The trigger. |
| `popover-content` | The panel content. May contain interactive elements. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovPopoverOpen` | `void` | The panel opened. |
| `aegovPopoverClose` | `void` | The panel closed. |

### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `closePopover()` | `Promise<void>` | Closes the panel. |

### The portal

The panel is portalled to `document.body` on open:

| Selector | Element |
| --- | --- |
| `.aegov-popover-portal` | The portal container on the body. |
| `.aegov-popover` | The panel. |
| `.aegov-popover__arrow` | The arrow, positioned from `data-position`. |
| `[data-state="open"]` | On the panel while open. |
| `[data-position]` | The resolved side, driving arrow placement. |

Consequences:

- **Host styles do not reach the open panel.** The portal injects its own CSS, including dark-mode colours and `<a>` overrides, because scoped component CSS cannot reach a body descendant.
- **`document.querySelector` inside your container will not find the panel.** In tests, wait for `.aegov-popover-portal .aegov-popover`.
- **Direction is inherited from the document.**

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the trigger wrapper. Put `aria-label` on the trigger button itself for icon triggers. |
| `data-*` | Yes | Forwarded to the trigger wrapper. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host. The open panel is in the portal and unaffected. |

---

## Accessibility

### Built-in behaviour

- The trigger reports `aria-expanded`, so the open state is exposed rather than only visible.
- The panel is associated with its trigger, so assistive technology can relate the two.
- `Escape` closes the panel and returns focus to the trigger.
- Clicking outside closes the panel.
- Focus returns to the trigger on close using `preventScroll`, so the page does not jump when a popover closes because the trigger scrolled out of view.
- The panel is portalled out of any clipping ancestor, which also prevents WCAG 2.2 SC 2.4.11 failures where a focused control inside the panel would be hidden.
- The arrow is decorative and not announced.
- Layout uses logical alignment, so the panel mirrors correctly in RTL.

### Developer responsibilities

- **Use `trigger="click"` when the panel contains anything interactive.** A hover panel with a link cannot be reached reliably by pointer and not at all by touch.
- **Give icon-only triggers an `aria-label`** that says what the popover explains — "About the service fee", not "Info".
- **Always provide `popover-content`.** A popover with an empty slot is a trigger that does nothing.
- **Keep the panel short.** If it scrolls, use a [Drawer](aegov-drawer.html) or [Modal](aegov-modal.html).
- **Do not put a form in a popover.** Validation messages need room, and dismissal by clicking away loses input silently.
- **Do not use a popover for a destructive confirmation** — clicking away dismisses it, so the user can miss it entirely. Use a [Modal](aegov-modal.html).
- **Do not put essential information only in a popover.** It is hidden by default; anything required to complete a task belongs in the page.
- **Swap `position` for RTL** when the side is semantically directional.
- **Set `dir` on `<html>`** for RTL, since the panel is portalled.
- **Do not nest popovers.**

### Keyboard support

| Key | Action |
| --- | --- |
| `Enter`, `Space` | Open the panel from the trigger. |
| `Tab` | Move into and through the panel's focusable content. |
| `Escape` | Close the panel and return focus to the trigger. |

---

## Where to next

- [Tooltip](aegov-tooltip.html) — for a short text label with no interactive content.
- [Dropdown](aegov-dropdown.html) — for a menu of commands or links.
- [Modal](aegov-modal.html) — when the user must respond.
- [Drawer](aegov-drawer.html) — for larger panels.
