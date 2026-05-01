# aegov-accordion

A vertical stack of collapsible content sections. Use it to progressively disclose related groups of information without consuming screen real estate. Compose `aegov-accordion` with one or more `aegov-accordion-item` children — the parent wires up shared icon style, sizing, first/last positioning, and the single-open vs. multi-open behavior.

## Properties

### is-multiple

When `true`, multiple items can be open at the same time. By default only one item is open at a time and opening another closes the rest.

```html
<aegov-accordion is-multiple="true">
  <aegov-accordion-item heading="One">A</aegov-accordion-item>
  <aegov-accordion-item heading="Two">B</aegov-accordion-item>
</aegov-accordion>
```

### default-open

Zero-based index of the item that should be open on initial render.

```html
<aegov-accordion default-open="1">
  <aegov-accordion-item heading="First">A</aegov-accordion-item>
  <aegov-accordion-item heading="Second">B</aegov-accordion-item>
</aegov-accordion>
```

### icon

Toggle indicator style. `chevron` (default) rotates a chevron; `plus` swaps a plus for a minus.

```html
<aegov-accordion icon="plus">
  <aegov-accordion-item heading="One">A</aegov-accordion-item>
</aegov-accordion>
```

### is-bordered

Adds an outer border and rounded corners around the entire accordion.

```html
<aegov-accordion is-bordered="true">
  <aegov-accordion-item heading="Bordered">A</aegov-accordion-item>
</aegov-accordion>
```

### size

Sets the heading typography size. Accepts `sm`, `base`, or `lg`. Also supports a Tailwind-style responsive string.

```html
<aegov-accordion size="lg">
  <aegov-accordion-item heading="Larger heading">A</aegov-accordion-item>
</aegov-accordion>
```

### field-id

Auto-generated when omitted. Reflects to the accordion wrapper element's `id`.

### Sub-component: aegov-accordion-item

Each item exposes its own props. `icon`, `size`, `is-first`, and `is-last` are written by the parent and should not be set manually.

#### heading

Text shown in the trigger when no `accordion-item-heading` slot is provided.

```html
<aegov-accordion-item heading="Privacy">Body...</aegov-accordion-item>
```

#### is-disabled

Disables the trigger so the item cannot be opened or closed.

```html
<aegov-accordion-item heading="Coming soon" is-disabled="true">...</aegov-accordion-item>
```

#### is-open

Reflects the current open state. The parent accordion mutates this value in response to user interaction.

## Sizes

`size` accepts a single token or a responsive string using Tailwind-style breakpoint prefixes (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`).

```html
<!-- Static -->
<aegov-accordion size="sm"></aegov-accordion>
<aegov-accordion size="base"></aegov-accordion>
<aegov-accordion size="lg"></aegov-accordion>

<!-- Responsive -->
<aegov-accordion size="sm md:base lg:lg"></aegov-accordion>
```

| Token  | Heading size |
| ------ | ------------ |
| `sm`   | 14px |
| `base` | 16px (default) |
| `lg`   | 18px |

## Examples

### Basic FAQ

```html
<aegov-accordion default-open="0">
  <aegov-accordion-item heading="What is the design system?">
    A shared library of UAE Government UI components.
  </aegov-accordion-item>
  <aegov-accordion-item heading="Where can I report bugs?">
    File an issue on the project repository.
  </aegov-accordion-item>
</aegov-accordion>
```

### Multi-open with plus icon

```html
<aegov-accordion is-multiple="true" icon="plus" is-bordered="true">
  <aegov-accordion-item heading="Section A">A...</aegov-accordion-item>
  <aegov-accordion-item heading="Section B">B...</aegov-accordion-item>
</aegov-accordion>
```

### Custom heading slot

```html
<aegov-accordion>
  <aegov-accordion-item>
    <span slot="accordion-item-heading">
      <strong>Custom</strong> heading content
    </span>
    Body content...
  </aegov-accordion-item>
</aegov-accordion>
```

### Disabled item

```html
<aegov-accordion>
  <aegov-accordion-item heading="Available">A</aegov-accordion-item>
  <aegov-accordion-item heading="Disabled" is-disabled="true">B</aegov-accordion-item>
</aegov-accordion>
```

## RTL Behavior

The accordion lays out vertically and is direction-agnostic. Headings and triggers respect the document direction, and the chevron/plus icon position flips automatically when the surrounding context is `dir="rtl"`. Content slot rendering uses logical properties so padding, borders, and animation behave correctly in both directions.

## API Reference

### aegov-accordion Properties

| Property      | Attribute      | Description                                                   | Type                  | Default    |
| ------------- | -------------- | ------------------------------------------------------------- | --------------------- | ---------- |
| `fieldId`     | `field-id`     | DOM `id` for the accordion wrapper. Auto-generated if omitted | `string`              | generated  |
| `isMultiple`  | `is-multiple`  | Allow multiple items open at once                             | `boolean`             | `false`    |
| `defaultOpen` | `default-open` | Index of item to open on initial render                       | `number`              | `undefined`|
| `icon`        | `icon`         | Toggle indicator style                                        | `'chevron' \| 'plus'` | `'chevron'`|
| `isBordered`  | `is-bordered`  | Add an outer border around the accordion                      | `boolean`             | `false`    |
| `size`        | `size`         | Heading size token or responsive string                       | `string`              | `'base'`   |

### aegov-accordion-item Properties

| Property     | Attribute      | Description                                              | Type                  | Default    |
| ------------ | -------------- | -------------------------------------------------------- | --------------------- | ---------- |
| `heading`    | `heading`      | Trigger text (used if no heading slot)                   | `string`              | `undefined`|
| `isOpen`     | `is-open`      | Whether the item is currently expanded (managed)         | `boolean`             | `false`    |
| `isDisabled` | `is-disabled`  | Disable user interaction with the trigger                | `boolean`             | `false`    |
| `icon`       | `icon`         | (managed by parent) toggle indicator style               | `'chevron' \| 'plus'` | `'chevron'`|
| `isFirst`    | `is-first`     | (managed by parent) whether this is the first item       | `boolean`             | `false`    |
| `isLast`     | `is-last`      | (managed by parent) whether this is the last item        | `boolean`             | `false`    |
| `size`       | `size`         | (managed by parent) heading size token                   | `'sm' \| 'base' \| 'lg'` | `'base'` |

### Pass-through Attributes

`aria-*` and `data-*` attributes are not forwarded by `aegov-accordion`. Place them directly on the host element if needed; native HTML attributes still apply.

### Events

| Event                       | Component               | Detail              | Description                              |
| --------------------------- | ----------------------- | ------------------- | ---------------------------------------- |
| `aegovAccordionItemToggle`  | `aegov-accordion-item`  | `{ open: boolean }` | Fired when an item requests open/close. The parent intercepts this event and updates `isOpen` accordingly. |

### Event listening example

```html
<aegov-accordion id="faq">
  <aegov-accordion-item heading="A">A</aegov-accordion-item>
</aegov-accordion>

<script>
  document.querySelector('#faq').addEventListener('aegovAccordionItemToggle', (e) => {
    console.log('Item toggle requested, open =', e.detail.open);
  });
</script>
```

### Slots

| Component                | Slot name                  | Description                                  |
| ------------------------ | -------------------------- | -------------------------------------------- |
| `aegov-accordion`        | (default)                  | Place `aegov-accordion-item` children here   |
| `aegov-accordion-item`   | `accordion-item-heading`   | Custom heading content (overrides `heading`) |
| `aegov-accordion-item`   | (default)                  | Body content shown when expanded             |

## Accessibility

### Built-in

- Each trigger is a real `<button>` with `aria-expanded` reflecting the open state and `aria-controls` linking to the panel.
- Each panel uses `role="region"` and `aria-labelledby` pointing at its trigger so screen readers announce the relationship.
- `Enter` and `Space` toggle the focused item.
- Disabled items set both `disabled` and skip toggle emission.

### Developer responsibilities

- Provide a meaningful `heading` (or heading slot) on every item so the trigger reads as more than just "button".
- Avoid placing focusable controls inside a collapsed item that should remain off the tab order — use `is-disabled` or omit them when collapsed.
- When using `default-open`, ensure the index points at a real child item.

### Keyboard support

| Key            | Action                                          |
| -------------- | ----------------------------------------------- |
| `Enter`, `Space` | Toggle the focused accordion item             |
| `Tab`          | Move focus to the next focusable element        |
| `Shift+Tab`    | Move focus to the previous focusable element    |

### Notes

- The accordion does not currently provide arrow-key navigation between item triggers; users move between triggers with `Tab`. If full WAI-ARIA accordion pattern keyboard support (`ArrowUp`/`ArrowDown`/`Home`/`End` between triggers) is required for your use case, treat this as a known gap.
