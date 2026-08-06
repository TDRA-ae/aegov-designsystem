# Tooltip

<p class="text-lg text-aeblack-500 mb-8">A Tooltip shows a short text label on hover or focus. Use it to name an icon-only control or to expand an abbreviation — nothing more. A tooltip cannot hold links, buttons or anything a user needs to reach, because its content is unreachable by pointer and by touch. When you need interactive content, use a <a href="aegov-popover.html">Popover</a>.</p>

## Introduction

Wrap the trigger in the default slot and give the tooltip its text with the `content` property.

```html
<aegov-tooltip content="Print this application">
  <aegov-button is-icon appearance="soft" aria-label="Print this application">
    <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">…</svg>
  </aegov-button>
</aegov-tooltip>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-tooltip content="Print this application">
      <aegov-button is-icon appearance="soft" variant="neutral-max" aria-label="Print this application">
        <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5 2.75A1.75 1.75 0 0 1 6.75 1h6.5A1.75 1.75 0 0 1 15 2.75v1.5h.5A2.5 2.5 0 0 1 18 6.75v4.5a2.5 2.5 0 0 1-2.5 2.5H15v3.5A1.75 1.75 0 0 1 13.25 19h-6.5A1.75 1.75 0 0 1 5 17.25v-3.5h-.5A2.5 2.5 0 0 1 2 11.25v-4.5a2.5 2.5 0 0 1 2.5-2.5H5v-1.5Z" clip-rule="evenodd" /></svg>
      </aegov-button>
    </aegov-tooltip>
    <aegov-tooltip content="Download a PDF receipt">
      <aegov-button is-icon appearance="soft" variant="neutral-max" aria-label="Download a PDF receipt">
        <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.19L6.28 7.97a.75.75 0 0 0-1.06 1.06l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0-1.06-1.06l-2.97 2.97V2.75Z" /><path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" /></svg>
      </aegov-button>
    </aegov-tooltip>
    <aegov-tooltip content="Share a link to this page">
      <aegov-button is-icon appearance="soft" variant="neutral-max" aria-label="Share a link to this page">
        <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M13 4.5a2.5 2.5 0 1 1 .7 1.74l-6.2 3.1a2.5 2.5 0 0 1 0 1.32l6.2 3.1a2.5 2.5 0 1 1-.67 1.34l-6.2-3.1a2.5 2.5 0 1 1 0-3.99l6.2-3.1A2.5 2.5 0 0 1 13 4.5Z" /></svg>
      </aegov-button>
    </aegov-tooltip>
  </div>
</div>

The tooltip sets `aria-describedby` on your trigger, pointing at the tooltip text, so the description reaches assistive technology.

Note the trigger also has its own `aria-label`. That is deliberate — see [Accessibility](#accessibility).

---

## What a tooltip cannot do

| Requirement | Use instead |
| --- | --- |
| A link or button inside | [Popover](aegov-popover.html) |
| Content the user must read to proceed | The page itself, or a [Callout](aegov-callout.html) |
| A form field's guidance | The field's own `hint` — see [Input](aegov-input.html) |
| A menu of actions | [Dropdown](aegov-dropdown.html) |
| Rich formatting or multiple paragraphs | [Popover](aegov-popover.html) |

Tooltips are also unavailable on touch devices in their primary interaction: there is no hover. Never put information in a tooltip that a mobile user needs.

---

## Content

Either the `content` property for plain text, or the `tooltip-content` slot for markup.

```html
<aegov-tooltip content="Emirates Identity Authority">
  <abbr>EIDA</abbr>
</aegov-tooltip>

<aegov-tooltip>
  <span slot="tooltip-content">Last updated <strong>14 March 2026</strong></span>
  <aegov-button size="sm" appearance="link">Updated recently</aegov-button>
</aegov-tooltip>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-6">
    <p>Issued by <aegov-tooltip content="Emirates Identity Authority"><abbr class="underline decoration-dotted cursor-help">EIDA</abbr></aegov-tooltip> in 2026.</p>
    <aegov-tooltip>
      <span slot="tooltip-content">Last updated <strong>14 March 2026</strong></span>
      <aegov-button size="sm" appearance="link">Updated recently</aegov-button>
    </aegov-tooltip>
  </div>
</div>

Keep it to a few words. A tooltip that wraps to three lines is a [Popover](aegov-popover.html).

---

## Position and alignment

```html
<aegov-tooltip position="top" content="Above">…</aegov-tooltip>
<aegov-tooltip position="right" content="To the right">…</aegov-tooltip>
<aegov-tooltip position="bottom" content="Below">…</aegov-tooltip>
<aegov-tooltip position="left" content="To the left">…</aegov-tooltip>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-4">
    <aegov-tooltip position="top" content="Above the trigger"><aegov-button size="sm" appearance="outline">top</aegov-button></aegov-tooltip>
    <aegov-tooltip position="right" content="To the right"><aegov-button size="sm" appearance="outline">right</aegov-button></aegov-tooltip>
    <aegov-tooltip position="bottom" content="Below the trigger"><aegov-button size="sm" appearance="outline">bottom</aegov-button></aegov-tooltip>
    <aegov-tooltip position="left" content="To the left"><aegov-button size="sm" appearance="outline">left</aegov-button></aegov-tooltip>
  </div>
</div>

`align` positions the tooltip along the chosen side — `start`, `center` (the default) or `end`. `gap` (default 8) sets the distance from the trigger and `offset` (default 0) nudges it along the alignment axis, both in pixels.

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-4">
    <aegov-tooltip position="top" align="start" content="Aligned to the start"><aegov-button size="sm" appearance="outline">align start</aegov-button></aegov-tooltip>
    <aegov-tooltip position="top" align="center" content="Centred"><aegov-button size="sm" appearance="outline">align center</aegov-button></aegov-tooltip>
    <aegov-tooltip position="top" align="end" content="Aligned to the end"><aegov-button size="sm" appearance="outline">align end</aegov-button></aegov-tooltip>
  </div>
</div>

---

## Trigger

| Value | Shows on |
| --- | --- |
| `hover` | Pointer hover and keyboard focus. The default. |
| `click` | Click. Useful on touch, where hover does not exist. |

```html
<aegov-tooltip trigger="hover" content="Shows on hover and focus">…</aegov-tooltip>
<aegov-tooltip trigger="click" content="Shows on click — reachable on touch">…</aegov-tooltip>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-4">
    <aegov-tooltip trigger="hover" content="Shows on hover and focus"><aegov-button size="sm" appearance="outline">hover</aegov-button></aegov-tooltip>
    <aegov-tooltip trigger="click" content="Shows on click — reachable on touch"><aegov-button size="sm" appearance="outline">click</aegov-button></aegov-tooltip>
  </div>
</div>

`hover` also shows the tooltip on keyboard focus, which is required — a hover-only tooltip is invisible to keyboard users.

---

## Delays

`delayStart` (default 200ms) prevents tooltips flashing as the pointer crosses a toolbar. `delayEnd` (default 0) keeps it visible briefly after the pointer leaves.

```html
<aegov-tooltip content="Appears after 500ms" delay-start="500">…</aegov-tooltip>
<aegov-tooltip content="Lingers for 300ms" delay-end="300">…</aegov-tooltip>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-4">
    <aegov-tooltip content="Appears immediately" delay-start="0"><aegov-button size="sm" appearance="outline">no delay</aegov-button></aegov-tooltip>
    <aegov-tooltip content="Appears after 200ms" delay-start="200"><aegov-button size="sm" appearance="outline">200ms (default)</aegov-button></aegov-tooltip>
    <aegov-tooltip content="Appears after 700ms" delay-start="700"><aegov-button size="sm" appearance="outline">700ms</aegov-button></aegov-tooltip>
  </div>
</div>

A short `delayEnd` helps users with tremor, who may briefly leave the trigger. WCAG 2.2 SC 1.4.13 requires that hoverable content remain visible while the pointer moves toward it — if you make the tooltip content hoverable in any way, a non-zero `delayEnd` is part of meeting that.

---

## Disabled

```html
<aegov-tooltip content="Never shown" is-disabled>
  <aegov-button size="sm" appearance="outline">No tooltip</aegov-button>
</aegov-tooltip>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-tooltip content="Never shown" is-disabled>
    <aegov-button size="sm" appearance="outline">Tooltip disabled</aegov-button>
  </aegov-tooltip>
</div>

Useful for suppressing a tooltip conditionally — for instance when the label is already visible at wider viewports.

---

## Composite example — icon toolbar

```html
<div class="flex items-center gap-1">
  <aegov-tooltip content="Print">
    <aegov-button is-icon size="sm" appearance="soft" variant="neutral-max" aria-label="Print">…</aegov-button>
  </aegov-tooltip>
  <aegov-tooltip content="Download PDF">
    <aegov-button is-icon size="sm" appearance="soft" variant="neutral-max" aria-label="Download PDF">…</aegov-button>
  </aegov-tooltip>
  <aegov-tooltip content="Share">
    <aegov-button is-icon size="sm" appearance="soft" variant="neutral-max" aria-label="Share">…</aegov-button>
  </aegov-tooltip>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex items-center gap-1">
    <aegov-tooltip content="Print">
      <aegov-button is-icon size="sm" appearance="soft" variant="neutral-max" aria-label="Print">
        <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5 2.75A1.75 1.75 0 0 1 6.75 1h6.5A1.75 1.75 0 0 1 15 2.75v1.5h.5A2.5 2.5 0 0 1 18 6.75v4.5a2.5 2.5 0 0 1-2.5 2.5H15v3.5A1.75 1.75 0 0 1 13.25 19h-6.5A1.75 1.75 0 0 1 5 17.25v-3.5h-.5A2.5 2.5 0 0 1 2 11.25v-4.5a2.5 2.5 0 0 1 2.5-2.5H5v-1.5Z" clip-rule="evenodd" /></svg>
      </aegov-button>
    </aegov-tooltip>
    <aegov-tooltip content="Download PDF">
      <aegov-button is-icon size="sm" appearance="soft" variant="neutral-max" aria-label="Download PDF">
        <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.19L6.28 7.97a.75.75 0 0 0-1.06 1.06l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0-1.06-1.06l-2.97 2.97V2.75Z" /><path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" /></svg>
      </aegov-button>
    </aegov-tooltip>
    <aegov-tooltip content="Share">
      <aegov-button is-icon size="sm" appearance="soft" variant="neutral-max" aria-label="Share">
        <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M13 4.5a2.5 2.5 0 1 1 .7 1.74l-6.2 3.1a2.5 2.5 0 0 1 0 1.32l6.2 3.1a2.5 2.5 0 1 1-.67 1.34l-6.2-3.1a2.5 2.5 0 1 1 0-3.99l6.2-3.1A2.5 2.5 0 0 1 13 4.5Z" /></svg>
      </aegov-button>
    </aegov-tooltip>
    <aegov-separator orientation="vertical"></aegov-separator>
    <aegov-tooltip content="Withdraw application">
      <aegov-button is-icon size="sm" appearance="soft" variant="danger" aria-label="Withdraw application">
        <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M8.75 1a1.75 1.75 0 0 0-1.75 1.75V3.5H4.25a.75.75 0 0 0 0 1.5h11.5a.75.75 0 0 0 0-1.5H13v-.75A1.75 1.75 0 0 0 11.25 1h-2.5ZM5.5 6.5h9l-.63 9.44A2.25 2.25 0 0 1 11.63 18H8.37a2.25 2.25 0 0 1-2.24-2.06L5.5 6.5Z" clip-rule="evenodd" /></svg>
      </aegov-button>
    </aegov-tooltip>
  </div>
</div>

---

## RTL Support

The tooltip is direction-aware. `align` is logical, so `start` follows the reading direction, and the tooltip text aligns with it.

**`position` is physical** — `position="right"` is the right of the trigger in both directions. In a toolbar this rarely matters, since `top` and `bottom` are unaffected. Where you use `left` or `right` semantically, swap it with direction:

```js
const isRtl = document.documentElement.dir === 'rtl';
tooltip.position = isRtl ? 'left' : 'right';
```

Unlike [Dropdown](aegov-dropdown.html) and [Popover](aegov-popover.html), the tooltip is **not** portalled — it renders inside the component, so it inherits direction from its own container. A `dir="rtl"` on an ancestor is enough.

```html
<div dir="rtl">
  <aegov-tooltip content="طباعة الطلب">
    <aegov-button is-icon appearance="soft" aria-label="طباعة الطلب">…</aegov-button>
  </aegov-tooltip>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-tooltip content="طباعة الطلب">
      <aegov-button is-icon appearance="soft" variant="neutral-max" aria-label="طباعة الطلب">
        <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5 2.75A1.75 1.75 0 0 1 6.75 1h6.5A1.75 1.75 0 0 1 15 2.75v1.5h.5A2.5 2.5 0 0 1 18 6.75v4.5a2.5 2.5 0 0 1-2.5 2.5H15v3.5A1.75 1.75 0 0 1 13.25 19h-6.5A1.75 1.75 0 0 1 5 17.25v-3.5h-.5A2.5 2.5 0 0 1 2 11.25v-4.5a2.5 2.5 0 0 1 2.5-2.5H5v-1.5Z" clip-rule="evenodd" /></svg>
      </aegov-button>
    </aegov-tooltip>
    <aegov-tooltip content="تحميل إيصال PDF">
      <aegov-button is-icon appearance="soft" variant="neutral-max" aria-label="تحميل إيصال PDF">
        <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.19L6.28 7.97a.75.75 0 0 0-1.06 1.06l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0-1.06-1.06l-2.97 2.97V2.75Z" /><path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" /></svg>
      </aegov-button>
    </aegov-tooltip>
    <aegov-tooltip content="الهيئة الاتحادية للهوية والجنسية"><abbr class="underline decoration-dotted cursor-help">ICP</abbr></aegov-tooltip>
  </div>
</div>

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `content` | `content` | The tooltip text. Use the `tooltip-content` slot for markup. | `string` | — |
| `position` | `position` | Which **physical** side of the trigger the tooltip appears on. | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` |
| `align` | `align` | Alignment along that side. Logical, so it follows text direction. | `'start' \| 'center' \| 'end'` | `'center'` |
| `trigger` | `trigger` | How the tooltip is shown. `hover` also responds to keyboard focus. | `'hover' \| 'click'` | `'hover'` |
| `gap` | `gap` | Distance from the trigger, in pixels. | `number` | `8` |
| `offset` | `offset` | Nudge along the alignment axis, in pixels. | `number` | `0` |
| `delayStart` | `delay-start` | Delay before showing, in milliseconds. | `number` | `200` |
| `delayEnd` | `delay-end` | Delay before hiding, in milliseconds. | `number` | `0` |
| `isDisabled` | `is-disabled` | Prevents the tooltip from showing. | `boolean` | `false` |

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | The trigger element. |
| `tooltip-content` | Tooltip content as markup. Takes precedence over `content`. |

### Events

None.

### Methods

None. Show and hide are driven entirely by the `trigger` property.

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the trigger wrapper. |
| `data-*` | Yes | Forwarded to the trigger wrapper. |
| `class`, `style` | Allowed | Applied to the host element. |

### CSS classes

| Class | Element |
| --- | --- |
| `.aegov-tooltip` | The tooltip bubble. |
| `.aegov-tooltip-trigger` | The trigger wrapper. |

Note the tooltip is **not portalled** — it renders inside the component, positioned relative to the trigger. That means it can be clipped by an ancestor with `overflow: hidden`. If a tooltip is being cut off, the ancestor is the cause; either remove the clipping or use a [Popover](aegov-popover.html), which is portalled.

---

## Accessibility

### Built-in behaviour

- The bubble carries `role="tooltip"`.
- **The component sets `aria-describedby` on your slotted trigger**, pointing at the tooltip text, and removes it when the tooltip is not present — so the description is associated with the control rather than floating unattached.
- `hover` also shows the tooltip on **keyboard focus**, so it is not pointer-only.
- `Escape` dismisses the tooltip while it is showing, as WCAG 2.2 SC 1.4.13 requires for content triggered by hover or focus.
- Positioning is measured against the trigger and viewport at show time, so the bubble is placed within the visible area.
- Alignment is logical, so the tooltip mirrors correctly in RTL.

### Developer responsibilities

- **Never put a control inside a tooltip.** Links and buttons in a tooltip are unreachable — the content is not hoverable in a sustained way and disappears on blur. Use a [Popover](aegov-popover.html).
- **Give the trigger its own accessible name.** A tooltip is a *description* (`aria-describedby`), not a label. An icon-only button still needs `aria-label` — otherwise the button is unnamed, and screen readers may skip descriptions entirely in some modes. This is why the examples above have both.
- **Never put essential information in a tooltip.** It is invisible on touch devices, invisible in print, and easy to miss. Guidance for a form field belongs in the field's `hint` — see [Input](aegov-input.html).
- **Keep it to a few words.** Long text belongs in a popover or the page.
- **Do not attach a tooltip to a non-focusable element** if the information matters — a `<span>` with a tooltip is unreachable by keyboard. Attach it to a button, a link, or use an `<abbr>` where the information is genuinely supplementary.
- **Use `trigger="click"` on touch-first interfaces**, or repeat the information visibly.
- **Set a non-zero `delayEnd`** where users may need to move the pointer, and never rely on the tooltip staying open.
- **Check for clipping ancestors.** The tooltip is not portalled; `overflow: hidden` on a parent will cut it off.
- **Do not duplicate the visible label.** A tooltip that repeats the button's own text is noise.

### Keyboard support

| Key | Action |
| --- | --- |
| `Tab` | Move focus to the trigger. With `trigger="hover"`, this shows the tooltip. |
| `Escape` | Dismiss the tooltip while keeping focus on the trigger. |
| `Enter`, `Space` | Activate the trigger — the tooltip does not intercept activation. |

---

## Where to next

- [Popover](aegov-popover.html) — for content with links, buttons or multiple paragraphs.
- [Button](aegov-button.html) — icon-only buttons and their labelling requirements.
- [Input](aegov-input.html) — `hint` text, which is where field guidance belongs.
- [Dropdown](aegov-dropdown.html) — for menus of commands.
