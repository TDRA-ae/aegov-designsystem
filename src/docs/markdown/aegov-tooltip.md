# Tooltip

<p class="text-lg text-aeblack-500 mb-8">A tooltip is a small overlay that displays additional context or helpful information when a user hovers over, clicks, or focuses on a trigger element. Tooltips are ideal for providing brief descriptions, labels, or hints without cluttering the UI.</p>

## Introduction

Tooltips surface supplementary information on demand. They are anchored to a trigger element and appear in one of four positions — top, bottom, left, or right — with configurable alignment. The `aegov-tooltip` component supports hover and click triggers, show/hide delays, an interactive mode for rich content, and automatic viewport-aware repositioning.

The `aegov-tooltip` component provides **4 positions**, **3 alignments**, **2 trigger types**, and supports interactive content, custom delays, and RTL layouts out of the box.

```html
<aegov-tooltip content="This is a tooltip">
  <aegov-button>Hover me</aegov-button>
</aegov-tooltip>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tooltip content="This is a tooltip">
    <aegov-button>Hover me</aegov-button>
  </aegov-tooltip>
</div>

---

## Positions

The `position` property controls where the tooltip appears relative to its trigger element. There are four positions available.

### Top

The default position. The tooltip appears above the trigger.

```html
<aegov-tooltip content="Tooltip on top" position="top">
  <aegov-button variant="outline">Top</aegov-button>
</aegov-tooltip>
```

<div class="flex flex-wrap justify-center gap-3 p-12 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tooltip content="Tooltip on top" position="top">
    <aegov-button variant="outline">Top</aegov-button>
  </aegov-tooltip>
</div>

### Bottom

The tooltip appears below the trigger.

```html
<aegov-tooltip content="Tooltip on bottom" position="bottom">
  <aegov-button variant="outline">Bottom</aegov-button>
</aegov-tooltip>
```

<div class="flex flex-wrap justify-center gap-3 p-12 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tooltip content="Tooltip on bottom" position="bottom">
    <aegov-button variant="outline">Bottom</aegov-button>
  </aegov-tooltip>
</div>

### Left

The tooltip appears to the left of the trigger.

```html
<aegov-tooltip content="Tooltip on left" position="left">
  <aegov-button variant="outline">Left</aegov-button>
</aegov-tooltip>
```

<div class="flex flex-wrap justify-center gap-3 p-12 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tooltip content="Tooltip on left" position="left">
    <aegov-button variant="outline">Left</aegov-button>
  </aegov-tooltip>
</div>

### Right

The tooltip appears to the right of the trigger.

```html
<aegov-tooltip content="Tooltip on right" position="right">
  <aegov-button variant="outline">Right</aegov-button>
</aegov-tooltip>
```

<div class="flex flex-wrap justify-center gap-3 p-12 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tooltip content="Tooltip on right" position="right">
    <aegov-button variant="outline">Right</aegov-button>
  </aegov-tooltip>
</div>

### All Positions

```html
<aegov-tooltip content="Top" position="top">
  <aegov-button size="sm">Top</aegov-button>
</aegov-tooltip>
<aegov-tooltip content="Bottom" position="bottom">
  <aegov-button size="sm">Bottom</aegov-button>
</aegov-tooltip>
<aegov-tooltip content="Left" position="left">
  <aegov-button size="sm">Left</aegov-button>
</aegov-tooltip>
<aegov-tooltip content="Right" position="right">
  <aegov-button size="sm">Right</aegov-button>
</aegov-tooltip>
```

<div class="flex flex-wrap justify-center items-center gap-6 p-12 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tooltip content="Top" position="top">
    <aegov-button size="sm">Top</aegov-button>
  </aegov-tooltip>
  <aegov-tooltip content="Bottom" position="bottom">
    <aegov-button size="sm">Bottom</aegov-button>
  </aegov-tooltip>
  <aegov-tooltip content="Left" position="left">
    <aegov-button size="sm">Left</aegov-button>
  </aegov-tooltip>
  <aegov-tooltip content="Right" position="right">
    <aegov-button size="sm">Right</aegov-button>
  </aegov-tooltip>
</div>

---

## Alignment

The `align` property controls how the tooltip aligns along the cross-axis relative to the trigger. There are three alignment options.

| Alignment | Description                                                        |
|-----------|--------------------------------------------------------------------|
| `center`  | Default. The tooltip is centred against the trigger.               |
| `start`   | The tooltip aligns to the start edge of the trigger.               |
| `end`     | The tooltip aligns to the end edge of the trigger.                 |

```html
<aegov-tooltip content="Aligned to start" position="top" align="start">
  <aegov-button variant="outline" size="sm">Start</aegov-button>
</aegov-tooltip>
<aegov-tooltip content="Aligned to center" position="top" align="center">
  <aegov-button variant="outline" size="sm">Center</aegov-button>
</aegov-tooltip>
<aegov-tooltip content="Aligned to end" position="top" align="end">
  <aegov-button variant="outline" size="sm">End</aegov-button>
</aegov-tooltip>
```

<div class="flex flex-wrap justify-center items-center gap-6 p-12 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tooltip content="Aligned to start" position="top" align="start">
    <aegov-button variant="outline" size="sm">Start</aegov-button>
  </aegov-tooltip>
  <aegov-tooltip content="Aligned to center" position="top" align="center">
    <aegov-button variant="outline" size="sm">Center</aegov-button>
  </aegov-tooltip>
  <aegov-tooltip content="Aligned to end" position="top" align="end">
    <aegov-button variant="outline" size="sm">End</aegov-button>
  </aegov-tooltip>
</div>

---

## Trigger Types

The `trigger` property controls how the tooltip is activated.

### Hover (Default)

The tooltip appears when the user hovers over the trigger element and hides when the cursor leaves.

```html
<aegov-tooltip content="I appear on hover" trigger="hover">
  <aegov-button>Hover me</aegov-button>
</aegov-tooltip>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tooltip content="I appear on hover" trigger="hover">
    <aegov-button>Hover me</aegov-button>
  </aegov-tooltip>
</div>

### Click

The tooltip toggles on click and dismisses when the user clicks outside or presses Escape.

```html
<aegov-tooltip content="I appear on click" trigger="click">
  <aegov-button variant="outline">Click me</aegov-button>
</aegov-tooltip>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tooltip content="I appear on click" trigger="click">
    <aegov-button variant="outline">Click me</aegov-button>
  </aegov-tooltip>
</div>

---

## Content

### Using the `content` Property

The simplest way to set tooltip text is with the `content` property. This is ideal for short, plain-text tooltips.

```html
<aegov-tooltip content="Save your changes before leaving">
  <aegov-button>Save</aegov-button>
</aegov-tooltip>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tooltip content="Save your changes before leaving">
    <aegov-button>Save</aegov-button>
  </aegov-tooltip>
</div>

### Using the `tooltip-content` Slot

For rich or structured content, use the `tooltip-content` named slot. This allows you to include HTML markup inside the tooltip.

```html
<aegov-tooltip>
  <aegov-button variant="outline">Rich content</aegov-button>
  <div slot="tooltip-content">
    <strong>Tip:</strong> You can use <em>HTML</em> inside the tooltip.
  </div>
</aegov-tooltip>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tooltip>
    <aegov-button variant="outline">Rich content</aegov-button>
    <div slot="tooltip-content">
      <strong>Tip:</strong> You can use <em>HTML</em> inside the tooltip.
    </div>
  </aegov-tooltip>
</div>

---

## Interactive Tooltips

Set the `interactive` property to allow users to hover over and interact with the tooltip content. When interactive, the tooltip does not auto-hide when the cursor moves from the trigger to the tooltip itself. The tooltip is also assigned `role="dialog"` instead of `role="tooltip"`.

```html
<aegov-tooltip trigger="hover">
  <aegov-button>Interactive tooltip</aegov-button>
  <div slot="tooltip-content">
    <p class="mb-2">This tooltip has interactive content.</p>
    <aegov-button size="xs" variant="outline" appearance="neutralMin">Learn more</aegov-button>
  </div>
</aegov-tooltip>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tooltip trigger="hover">
    <aegov-button>Interactive tooltip</aegov-button>
    <div slot="tooltip-content">
      <p style="margin-bottom: 8px; color: white;">This tooltip has interactive content.</p>
      <aegov-button size="xs" variant="outline" appearance="neutralMin">Learn more</aegov-button>
    </div>
  </aegov-tooltip>
</div>

---

## Show and Hide Delay

The `delay-start` and `delay-end` properties control the time in milliseconds before the tooltip appears or disappears. This is useful for preventing accidental tooltip triggers or for keeping the tooltip visible while the user moves between elements.

```html
<!-- 500ms delay before showing -->
<aegov-tooltip content="I take 500ms to appear" delay-start="500">
  <aegov-button variant="outline">Slow show</aegov-button>
</aegov-tooltip>

<!-- 300ms delay before hiding -->
<aegov-tooltip content="I take 300ms to hide" delay-end="300">
  <aegov-button variant="outline">Slow hide</aegov-button>
</aegov-tooltip>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tooltip content="I take 500ms to appear" delay-start="500">
    <aegov-button variant="outline">Slow show (500ms)</aegov-button>
  </aegov-tooltip>
  <aegov-tooltip content="I take 300ms to hide" delay-end="300">
    <aegov-button variant="outline">Slow hide (300ms)</aegov-button>
  </aegov-tooltip>
</div>

---

## Gap and Offset

The `gap` property controls the space in pixels between the trigger and the tooltip. The `offset` property shifts the tooltip along the cross-axis.

```html
<!-- Larger gap -->
<aegov-tooltip content="16px gap" gap="16">
  <aegov-button variant="outline">Large gap</aegov-button>
</aegov-tooltip>

<!-- With offset -->
<aegov-tooltip content="Offset by 20px" offset="20">
  <aegov-button variant="outline">With offset</aegov-button>
</aegov-tooltip>
```

<div class="flex flex-wrap gap-3 p-12 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tooltip content="16px gap" gap="16">
    <aegov-button variant="outline">Large gap (16px)</aegov-button>
  </aegov-tooltip>
  <aegov-tooltip content="Offset by 20px" offset="20">
    <aegov-button variant="outline">With offset (20px)</aegov-button>
  </aegov-tooltip>
</div>

---

## Disabled

Set the `disabled` property to prevent the tooltip from appearing. The trigger element remains visible and interactive but the tooltip will not show.

```html
<aegov-tooltip content="You will not see this" is-disabled>
  <aegov-button>Disabled tooltip</aegov-button>
</aegov-tooltip>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tooltip content="You will not see this" is-disabled>
    <aegov-button>Disabled tooltip</aegov-button>
  </aegov-tooltip>
</div>

---

## RTL Support

The component fully supports right-to-left layouts. When the document or a parent element has `dir="rtl"`, the `left` and `right` positions are automatically mirrored, and alignment directions (`start`/`end`) swap accordingly.

```html
<div dir="rtl">
  <aegov-tooltip content="تلميح الأدوات" position="left">
    <aegov-button>يسار (يُصبح يمين)</aegov-button>
  </aegov-tooltip>
</div>
```

<div dir="rtl" class="flex flex-wrap gap-3 p-12 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-tooltip content="تلميح الأدوات" position="left">
    <aegov-button>يسار (يُصبح يمين)</aegov-button>
  </aegov-tooltip>
  <aegov-tooltip content="أعلى التلميح" position="top">
    <aegov-button variant="outline">أعلى</aegov-button>
  </aegov-tooltip>
</div>

No additional configuration is needed — the component reads the computed `direction` style and adjusts positioning automatically.

---

## API Reference

### Properties

| Property     | Attribute     | Description                                                                 | Type                                               | Default    |
|--------------|---------------|-----------------------------------------------------------------------------|----------------------------------------------------|------------|
| `content`    | `content`     | Tooltip text (alternative to the `tooltip-content` slot)                   | `string`                                            | `undefined`|
| `position`   | `position`    | Position of the tooltip relative to the trigger                            | `'top'` \| `'right'` \| `'bottom'` \| `'left'`     | `'top'`    |
| `align`      | `align`       | Alignment of the tooltip along the cross-axis                              | `'start'` \| `'center'` \| `'end'`                 | `'center'` |
| `trigger`    | `trigger`     | How the tooltip is activated                                               | `'hover'` \| `'click'`                              | `'hover'`  |
| `gap`        | `gap`         | Space between the tooltip and the trigger (in pixels)                      | `number`                                            | `8`        |
| `offset`     | `offset`      | Additional offset along the cross-axis (in pixels)                         | `number`                                            | `0`        |
| `disabled`   | `disabled`    | Prevents the tooltip from appearing                                        | `boolean`                                           | `false`    |
| `interactive`| `interactive` | Allows users to hover over and interact with tooltip content               | `boolean`                                           | `false`    |
| `delayStart`  | `delay-start`  | Delay before showing the tooltip (in milliseconds)                         | `number`                                            | `200`      |
| `delayEnd`  | `delay-end`  | Delay before hiding the tooltip (in milliseconds)                          | `number`                                            | `0`        |

### Slots

| Slot              | Description                                                                              |
|-------------------|------------------------------------------------------------------------------------------|
| (default)         | The trigger element — a button, link, icon, or any element the tooltip should anchor to. |
| `tooltip-content` | Rich HTML content for the tooltip body. Use this instead of the `content` prop when you need markup inside the tooltip. |

---

## Accessibility

The `aegov-tooltip` component is built with accessibility as a first-class concern. The following features are included out of the box.

### Built-in Features

- **`role="tooltip"`** — the tooltip element is assigned the `tooltip` role, allowing assistive technologies to announce it as supplementary content.
- **`role="dialog"`** — when the `interactive` property is set, the role changes to `dialog` to indicate that the tooltip contains interactive elements.
- **`aria-describedby`** — the trigger element is automatically linked to the tooltip via `aria-describedby` when the tooltip is visible. This association lets screen readers announce the tooltip text in context.
- **`aria-expanded`** — when using `trigger="click"`, the trigger element receives `aria-expanded` to communicate the open/closed state.
- **Keyboard dismissal** — pressing `Escape` closes any open tooltip, giving keyboard users a way to dismiss the overlay without moving focus.
- **Click-outside dismissal** — for click-triggered tooltips, clicking anywhere outside the tooltip and its trigger closes the tooltip.
- **Viewport clamping** — the tooltip is repositioned to stay within the visible viewport, preventing content from being hidden off-screen.

### Developer Responsibilities

The following items require action from the developer implementing the component:

1. **Trigger elements must be focusable.** The tooltip anchors to the default slot content. Ensure the trigger element is keyboard-focusable (e.g. a `<button>` or an element with `tabindex="0"`). Non-focusable triggers are inaccessible to keyboard and screen reader users.

2. **Keep tooltip text concise.** Tooltips should contain brief, supplementary information. Long paragraphs or complex layouts are better suited for popovers or modals.

3. **Interactive tooltips should contain focusable content.** When using `interactive` mode, ensure that the tooltip content includes at least one focusable element so keyboard users can interact with it.

4. **Do not rely on tooltips for critical information.** Tooltip content is hidden by default and may not be discovered by all users. Essential information should be visible in the UI at all times.

---

## Notes

- The tooltip uses `position: fixed` and dynamically calculates its coordinates relative to the viewport. It repositions on scroll and window resize to stay visible.
- The arrow indicator automatically points toward the trigger element and adjusts its position based on the `position` property.
- When both the `content` prop and the `tooltip-content` slot are provided, the slot takes precedence.
- The `delayStart` defaults to `200ms` to prevent tooltips from flickering during normal mouse movement. Set it to `0` if you need instant display.
- The `delayEnd` defaults to `0` for immediate dismissal. Increase it when using `interactive` mode so the user has time to move their cursor into the tooltip.
- The tooltip has a maximum width of `320px` (`max-w-80`) and text wraps automatically. For wider content, apply custom styles.
- The component listens for `Escape` key presses globally while visible, so pressing Escape from anywhere on the page will close an open tooltip.
- In RTL mode, the `left` and `right` positions are automatically swapped. The `start` and `end` alignments also mirror to match the text direction.
