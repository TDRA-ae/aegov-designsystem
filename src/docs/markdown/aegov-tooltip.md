# Tooltip

<p class="text-lg text-aeblack-500 mb-8">A Tooltip is a small, non-interactive label that appears next to a control on hover or focus to clarify its purpose. Use a tooltip for icon-button labels, abbreviations, and short hints — anything the user can take or leave. For interactive content, longer descriptions, or controls, use a Popover instead.</p>

## Introduction

The `aegov-tooltip` component wraps any trigger element — typically a button, link, or icon — and shows a short message in one of four positions when the user hovers or clicks the trigger. Position is automatically clamped to the viewport, the tooltip is hidden on `Escape`, and `aria-describedby` is wired automatically while the tooltip is visible so screen readers announce the helper text alongside the trigger.

```html
<aegov-tooltip content="Print the current page" position="top">
  <aegov-button variant="secondary" aria-label="Print">
      Print
  </aegov-button>
</aegov-tooltip>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-tooltip content="Print the current page" position="top">
    <aegov-button variant="secondary" aria-label="Print">Print</aegov-button>
  </aegov-tooltip>
</div>

---

## Position

The `position` property selects which side of the trigger the tooltip appears on. The component flips the layout automatically in RTL — `left` and `right` swap so the visual relationship to the trigger is preserved.

```html
<aegov-tooltip content="Tooltip on top" position="top">
  <aegov-button variant="secondary">Top</aegov-button>
</aegov-tooltip>

<aegov-tooltip content="Tooltip on right" position="right">
  <aegov-button variant="secondary">Right</aegov-button>
</aegov-tooltip>

<aegov-tooltip content="Tooltip on bottom" position="bottom">
  <aegov-button variant="secondary">Bottom</aegov-button>
</aegov-tooltip>

<aegov-tooltip content="Tooltip on left" position="left">
  <aegov-button variant="secondary">Left</aegov-button>
</aegov-tooltip>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-12 items-center justify-center py-12">
    <aegov-tooltip content="Tooltip on top" position="top">
      <aegov-button variant="secondary">Top</aegov-button>
    </aegov-tooltip>
    <aegov-tooltip content="Tooltip on right" position="right">
      <aegov-button variant="secondary">Right</aegov-button>
    </aegov-tooltip>
    <aegov-tooltip content="Tooltip on bottom" position="bottom">
      <aegov-button variant="secondary">Bottom</aegov-button>
    </aegov-tooltip>
    <aegov-tooltip content="Tooltip on left" position="left">
      <aegov-button variant="secondary">Left</aegov-button>
    </aegov-tooltip>
  </div>
</div>

---

## Alignment

When the tooltip is positioned `top` or `bottom`, the `align` property shifts it horizontally relative to the trigger. When the tooltip is `left` or `right`, alignment shifts it vertically. Use `start` to anchor to the leading edge, `center` (default), or `end` to anchor to the trailing edge.

```html
<aegov-tooltip content="Aligned to start" position="bottom" align="start">
  <aegov-button variant="secondary">Start</aegov-button>
</aegov-tooltip>

<aegov-tooltip content="Aligned to centre" position="bottom" align="center">
  <aegov-button variant="secondary">Centre</aegov-button>
</aegov-tooltip>

<aegov-tooltip content="Aligned to end" position="bottom" align="end">
  <aegov-button variant="secondary">End</aegov-button>
</aegov-tooltip>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-12 items-center justify-center py-12">
    <aegov-tooltip content="Aligned to start" position="bottom" align="start">
      <aegov-button variant="secondary">Start</aegov-button>
    </aegov-tooltip>
    <aegov-tooltip content="Aligned to centre" position="bottom" align="center">
      <aegov-button variant="secondary">Centre</aegov-button>
    </aegov-tooltip>
    <aegov-tooltip content="Aligned to end" position="bottom" align="end">
      <aegov-button variant="secondary">End</aegov-button>
    </aegov-tooltip>
  </div>
</div>

---

## Trigger

By default, the tooltip shows on hover and on keyboard focus. Set `trigger="click"` to instead toggle the tooltip on click and dismiss it when the user clicks outside or presses `Escape`. Click triggers are useful on touch devices where there is no hover state.

```html
<aegov-tooltip content="Click triggers can be useful on touch devices." trigger="click" position="top">
  <aegov-button variant="secondary">Click me</aegov-button>
</aegov-tooltip>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex justify-center py-8">
    <aegov-tooltip content="Click triggers can be useful on touch devices." trigger="click" position="top">
      <aegov-button variant="secondary">Click me</aegov-button>
    </aegov-tooltip>
  </div>
</div>

---

## Delay

`delay-start` (default 200 ms) and `delay-end` (default 0 ms) tune how long the tooltip waits before showing or hiding. Increase the start delay for less prominent hints to avoid distraction; increase the end delay slightly when users may need to move their cursor through the tooltip area.

```html
<aegov-tooltip content="Shows after 600 ms" delay-start="600" position="top">
  <aegov-button variant="secondary">Slow start</aegov-button>
</aegov-tooltip>

<aegov-tooltip content="Lingers for 400 ms after you leave" delay-end="400" position="top">
  <aegov-button variant="secondary">Slow end</aegov-button>
</aegov-tooltip>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-6 items-center justify-center py-8">
    <aegov-tooltip content="Shows after 600 ms" delay-start="600" position="top">
      <aegov-button variant="secondary">Slow start</aegov-button>
    </aegov-tooltip>
    <aegov-tooltip content="Lingers for 400 ms after you leave" delay-end="400" position="top">
      <aegov-button variant="secondary">Slow end</aegov-button>
    </aegov-tooltip>
  </div>
</div>

---

## Gap and Offset

`gap` controls the distance between the trigger and the tooltip (in pixels, default 8). `offset` shifts the tooltip along its alignment axis — useful when the trigger has visual padding that the tooltip should not appear to overlap.

```html
<aegov-tooltip content="Closer to the trigger" gap="2" position="top">
  <aegov-button variant="secondary">Tight</aegov-button>
</aegov-tooltip>

<aegov-tooltip content="Far from the trigger" gap="20" position="top">
  <aegov-button variant="secondary">Loose</aegov-button>
</aegov-tooltip>
```

---

## Rich Content with the Slot

For content that needs more than plain text — emphasis, abbreviations, or inline icons — provide a `tooltip-content` slot instead of the `content` property. Keep tooltip content short and read-only; if the user needs to interact with anything inside it, use `aegov-popover`.

```html
<aegov-tooltip position="top">
  <aegov-button variant="secondary">Status</aegov-button>
  <span slot="tooltip-content">
    <strong>Last updated:</strong> 2 minutes ago
  </span>
</aegov-tooltip>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex justify-center py-8">
    <aegov-tooltip position="top">
      <aegov-button variant="secondary">Status</aegov-button>
      <span slot="tooltip-content">
        <strong>Last updated:</strong> 2 minutes ago
      </span>
    </aegov-tooltip>
  </div>
</div>

---

## Disabled

Set `is-disabled="true"` to suppress the tooltip without removing the wrapping element. Useful when a feature is enabled or disabled by application state and you want the trigger element to remain interactive while the helper text is suppressed.

```html
<aegov-tooltip content="You will not see this." is-disabled="true" position="top">
  <aegov-button variant="secondary">Tooltip suppressed</aegov-button>
</aegov-tooltip>
```

---

## Composite Example — Form Helper Text

A common pattern: pair an input label with an info icon that reveals additional guidance on hover or focus. Using a tooltip here keeps the form short while still giving the user the detail they need.

```html
<div class="max-w-md">
  <div class="flex items-center gap-2 mb-2">
    <label for="trade-licence" class="font-semibold">Trade licence number</label>
    <aegov-tooltip content="Your 6- to 8-digit licence number is printed on the top right of your DED licence document." position="top" align="start">
      <aegov-button is-icon appearance="soft" size="xs" aria-label="What is this?">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4M12 8h.01"></path></svg>
      </aegov-button>
    </aegov-tooltip>
  </div>
  <aegov-input field-id="trade-licence" placeholder="e.g. 123456"></aegov-input>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <div class="flex items-center gap-2 mb-2">
      <label for="demo-trade-licence" class="font-semibold">Trade licence number</label>
      <aegov-tooltip content="Your 6- to 8-digit licence number is printed on the top right of your DED licence document." position="top" align="start">
        <aegov-button is-icon appearance="soft" size="xs" aria-label="What is this?">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4M12 8h.01"></path></svg>
        </aegov-button>
      </aegov-tooltip>
    </div>
    <aegov-input field-id="demo-trade-licence" placeholder="e.g. 123456"></aegov-input>
  </div>
</div>

---

## RTL Support

The tooltip is direction-aware. When the document or any ancestor is set to `dir="rtl"`, the `left` and `right` positions swap so the visual relationship to the trigger is preserved, and `align="start"` / `align="end"` flip to follow the reading direction.

```html
<div dir="rtl">
  <aegov-tooltip content="طباعة الصفحة الحالية" position="top">
    <aegov-button variant="secondary">طباعة</aegov-button>
  </aegov-tooltip>

  <aegov-tooltip content="مساعدة" position="left">
    <aegov-button variant="secondary">مساعدة</aegov-button>
  </aegov-tooltip>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap gap-12 items-center justify-center py-12">
    <aegov-tooltip content="طباعة الصفحة الحالية" position="top">
      <aegov-button variant="secondary">طباعة</aegov-button>
    </aegov-tooltip>
    <aegov-tooltip content="عرض المساعدة" position="left">
      <aegov-button variant="secondary">مساعدة</aegov-button>
    </aegov-tooltip>
    <aegov-tooltip content="تنزيل المستند" position="bottom">
      <aegov-button variant="secondary">تنزيل</aegov-button>
    </aegov-tooltip>
  </div>
</div>

---

## API Reference

### Properties

| Property      | Attribute     | Description                                                                                | Type                                       | Default     |
| ------------- | ------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------ | ----------- |
| `content`     | `content`     | Plain-text tooltip body. Ignored when the `tooltip-content` slot has content.              | `string`                                   | `undefined` |
| `position`    | `position`    | Side of the trigger the tooltip appears on. Mirrored automatically in RTL.                 | `'top' \| 'right' \| 'bottom' \| 'left'`   | `'top'`     |
| `align`       | `align`       | Alignment of the tooltip along its cross-axis.                                             | `'start' \| 'center' \| 'end'`             | `'center'`  |
| `trigger`     | `trigger`     | How the tooltip is shown — on hover/focus or on click.                                     | `'hover' \| 'click'`                       | `'hover'`   |
| `gap`         | `gap`         | Distance in pixels between the trigger and the tooltip.                                    | `number`                                   | `8`         |
| `offset`      | `offset`      | Additional offset along the alignment axis, in pixels.                                     | `number`                                   | `0`         |
| `isDisabled`  | `is-disabled` | Suppress the tooltip without removing the wrapper from the DOM.                            | `boolean`                                  | `false`     |
| `delayStart`  | `delay-start` | Delay before showing the tooltip, in milliseconds.                                         | `number`                                   | `200`       |
| `delayEnd`    | `delay-end`   | Delay before hiding the tooltip, in milliseconds.                                          | `number`                                   | `0`         |

### Slots

| Slot                | Description                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------- |
| _(default)_         | The trigger element — typically a button or link.                                        |
| `tooltip-content`   | Tooltip body. When present, takes precedence over the `content` property.                |

### Events

The tooltip does not emit custom events.

### Pass-through Attributes

ARIA and `data-*` attributes set on `<aegov-tooltip>` are forwarded onto the inner trigger wrapper element. The component automatically manages `aria-describedby` (linking the trigger to the tooltip while it is visible) and `aria-expanded` (when `trigger="click"`) — do not set these yourself.

| Attribute group     | Forwarded? | Where it lands                                                |
| ------------------- | ---------- | ------------------------------------------------------------- |
| `aria-*`            | Yes        | Applied to the inner trigger wrapper (`.aegov-tooltip-trigger`). |
| `data-*`            | Yes        | Applied to the inner trigger wrapper.                         |
| `aria-describedby`  | Managed    | Set automatically while the tooltip is visible.               |
| `aria-expanded`     | Managed    | Set directly on the first focusable element inside the trigger slot when `trigger="click"`. |
| `class`, `style`    | Allowed    | Applied to the host element.                                  |

---

## Accessibility

### Built-in behaviour

- The tooltip element renders with `role="tooltip"` and a stable `id`.
- `aria-describedby` is set on the trigger wrapper while the tooltip is visible, so screen readers announce the tooltip text together with the trigger's accessible name.
- When `trigger="click"`, `aria-expanded` is set directly on the first focusable element inside the trigger slot (the button, link, or other focusable element), so assistive technology correctly announces the expanded state.
- The tooltip appears when the trigger gains keyboard focus (via `Tab`) and closes when focus leaves the component.
- `Escape` hides the tooltip immediately (SC 1.4.13 dismissable).
- The tooltip remains open when the pointer moves from the trigger onto the tooltip itself, allowing users to read or copy the tooltip text (SC 1.4.13 hoverable).
- The tooltip closes when the trigger loses focus or when the user clicks outside (in click-trigger mode).

### Developer responsibilities

- **The trigger must have its own accessible name.** A tooltip describes a control — it does not name it. Buttons and links should already be labelled (visible text or `aria-label`); the tooltip then supplements that label, not replaces it.
- Keep tooltip content short — one short sentence at most. For richer help text, use `aegov-popover`.
- Avoid placing interactive controls (links, buttons, form fields) inside tooltip content. Tooltips are not focusable and content inside them cannot be reached with the keyboard. If users need to interact, use `aegov-popover` or `aegov-dropdown`.
- On touch devices, hover does not exist. Provide an alternative pattern (a click-triggered tooltip, an info icon next to the field, or persistent helper text) for any tooltip whose content is essential.

### Keyboard support

| Key       | Action                                                                                  |
| --------- | --------------------------------------------------------------------------------------- |
| `Tab`     | Move focus to the trigger; the tooltip appears on focus when `trigger="hover"`.         |
| `Enter`, `Space` | Toggle the tooltip when `trigger="click"` and the trigger is a button.            |
| `Escape`  | Hide the tooltip if it is currently visible.                                            |
