# Accordion

<p class="text-lg text-aeblack-500 mb-8">An accordion is a vertically stacked set of collapsible sections. It lets users expand and collapse content on demand, keeping pages clean while making detailed information easily accessible.</p>

## Introduction

The `aegov-accordion` component uses a parent-child architecture. The `<aegov-accordion>` wrapper manages shared behaviour — single or multiple open panels, icon style, bordered appearance — while each `<aegov-accordion-item>` holds an individual collapsible section.

The component supports **2 icon styles**, a **bordered variant**, **single or multi-open** modes, **default-open** items, **disabled** items, and **full keyboard and screen-reader accessibility** out of the box.

```html
<aegov-accordion>
  <aegov-accordion-item heading="Section One">
    Content for the first section.
  </aegov-accordion-item>
  <aegov-accordion-item heading="Section Two">
    Content for the second section.
  </aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-accordion>
    <aegov-accordion-item heading="Section One">
      Content for the first section.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Section Two">
      Content for the second section.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Section Three">
      Content for the third section.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

---

## Icon Styles

The `icon` property on the parent controls the indicator shown on every item. Two styles are available.

### Chevron (default)

A downward-pointing chevron that rotates 180° when the section is open.

```html
<aegov-accordion icon="chevron">
  <aegov-accordion-item heading="Chevron Item">…</aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-accordion icon="chevron">
    <aegov-accordion-item heading="Chevron Item One">
      This section uses the default chevron icon.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Chevron Item Two">
      The chevron rotates 180 degrees when the section opens.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

### Plus

A plus sign that rotates 45° to become an × when the section is open.

```html
<aegov-accordion icon="plus">
  <aegov-accordion-item heading="Plus Item">…</aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-accordion icon="plus">
    <aegov-accordion-item heading="Plus Item One">
      This section uses the plus icon style.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Plus Item Two">
      The plus rotates 45 degrees to form an × when open.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

---

## Bordered Variant

Set the `bordered` attribute on the parent to wrap the entire accordion in a visible border with rounded corners. This also increases the horizontal padding inside each item.

```html
<aegov-accordion bordered>
  <aegov-accordion-item heading="Bordered Item One">…</aegov-accordion-item>
  <aegov-accordion-item heading="Bordered Item Two">…</aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-accordion bordered>
    <aegov-accordion-item heading="Bordered Item One">
      The accordion container has a visible border and rounded corners.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Bordered Item Two">
      Padding is automatically increased for a more spacious look.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Bordered Item Three">
      Works with both chevron and plus icon styles.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

Bordered with the plus icon:

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-accordion bordered icon="plus">
    <aegov-accordion-item heading="Bordered + Plus One">
      Combining the bordered variant with the plus icon style.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Bordered + Plus Two">
      The bordered and icon props are independent — mix them freely.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

---

## Allow Multiple Open

By default, only one accordion item can be open at a time — opening a new item automatically closes the previous one. Set `allow-multiple` to let users keep several sections open simultaneously.

```html
<aegov-accordion allow-multiple>
  <aegov-accordion-item heading="Section A">…</aegov-accordion-item>
  <aegov-accordion-item heading="Section B">…</aegov-accordion-item>
  <aegov-accordion-item heading="Section C">…</aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-accordion allow-multiple bordered>
    <aegov-accordion-item heading="Section A">
      Open this section, then open the others — they all stay open.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Section B">
      Multiple sections can be expanded at the same time.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Section C">
      Click any header again to collapse that individual section.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

---

## Default Open

Use the `default-open` attribute on the parent to specify which item should be expanded on initial render. The value is a zero-based index.

```html
<!-- Opens the second item (index 1) by default -->
<aegov-accordion default-open="1">
  <aegov-accordion-item heading="First">…</aegov-accordion-item>
  <aegov-accordion-item heading="Second (open)">…</aegov-accordion-item>
  <aegov-accordion-item heading="Third">…</aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-accordion default-open="1" bordered>
    <aegov-accordion-item heading="First Item">
      This item is collapsed by default.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Second Item (default open)">
      This item is automatically expanded when the page loads because the parent has default-open="1".
    </aegov-accordion-item>
    <aegov-accordion-item heading="Third Item">
      This item is also collapsed by default.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

---

## Disabled Items

Set the `disabled` attribute on an individual `<aegov-accordion-item>` to prevent it from being toggled. Disabled items appear visually muted and do not respond to clicks or keyboard input.

```html
<aegov-accordion>
  <aegov-accordion-item heading="Enabled">…</aegov-accordion-item>
  <aegov-accordion-item heading="Disabled" disabled>…</aegov-accordion-item>
  <aegov-accordion-item heading="Also Enabled">…</aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-accordion bordered>
    <aegov-accordion-item heading="Enabled Section">
      This section can be toggled normally.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Disabled Section" disabled>
      This section cannot be opened — clicking or pressing Enter has no effect.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Another Enabled Section">
      This section also works normally.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

---

## Heading Slot

By default, the heading text is provided via the `heading` prop. For richer content — icons, badges, formatted text — use the `accordion-item-heading` named slot instead. When both are provided, the slot takes precedence.

```html
<aegov-accordion>
  <aegov-accordion-item>
    <span slot="accordion-item-heading">
      <aegov-badge color="primary" size="sm">New</aegov-badge>
      Custom Heading with Badge
    </span>
    Content with a rich heading above.
  </aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-accordion bordered>
    <aegov-accordion-item heading="Plain heading via prop">
      This heading was set using the heading attribute.
    </aegov-accordion-item>
    <aegov-accordion-item>
      <span slot="accordion-item-heading">
        <aegov-badge color="primary" size="sm">New</aegov-badge>
        Rich heading with a badge
      </span>
      This heading uses the named slot for richer content.
    </aegov-accordion-item>
    <aegov-accordion-item>
      <span slot="accordion-item-heading">
        <strong>Bold heading</strong> — with inline HTML
      </span>
      The slot accepts any HTML content.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

---

## Sizes

The `size` attribute on the parent controls the heading font size for all items. Three sizes are available: `sm` (14 px), `base` (16 px, default), and `lg` (18 px).

### Small

```html
<aegov-accordion size="sm" bordered>
  <aegov-accordion-item heading="Small Heading">…</aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-accordion size="sm" bordered>
    <aegov-accordion-item heading="Small — What is digital transformation?">
      Digital transformation is the integration of digital technology into all areas of an organisation, fundamentally changing how it operates and delivers value.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Small — Who is this service for?">
      This service is available to all UAE residents and citizens.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Small — How do I apply?">
      Submit your application through the official portal using your UAE Pass credentials.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

### Base (default)

```html
<aegov-accordion bordered>
  <aegov-accordion-item heading="Base Heading">…</aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-accordion bordered>
    <aegov-accordion-item heading="Base — What is digital transformation?">
      Digital transformation is the integration of digital technology into all areas of an organisation, fundamentally changing how it operates and delivers value.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Base — Who is this service for?">
      This service is available to all UAE residents and citizens.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Base — How do I apply?">
      Submit your application through the official portal using your UAE Pass credentials.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

### Large

```html
<aegov-accordion size="lg" bordered>
  <aegov-accordion-item heading="Large Heading">…</aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-accordion size="lg" bordered>
    <aegov-accordion-item heading="Large — What is digital transformation?">
      Digital transformation is the integration of digital technology into all areas of an organisation, fundamentally changing how it operates and delivers value.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Large — Who is this service for?">
      This service is available to all UAE residents and citizens.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Large — How do I apply?">
      Submit your application through the official portal using your UAE Pass credentials.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

---

## Long Titles

When a heading exceeds 100 characters it wraps onto multiple lines. The trigger button stretches vertically to accommodate the full text, and the icon stays pinned to the top-right so it never overlaps the heading.

```html
<aegov-accordion bordered>
  <aegov-accordion-item heading="Understanding the Role of Digital Transformation in Modernising Government Services Across the UAE">
    Content for the long-title section.
  </aegov-accordion-item>
  <aegov-accordion-item heading="Standard Heading">
    Content for a normal section.
  </aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-accordion bordered>
    <aegov-accordion-item heading="Understanding the Role of Digital Transformation in Modernising Government Services Across the UAE">
      This item's heading is well over 100 characters. Notice how it wraps naturally across multiple lines while the chevron icon remains anchored to the top-right corner of the header, keeping the layout clean and readable.
    </aegov-accordion-item>
    <aegov-accordion-item heading="This is a second long-titled section covering the Implementation of Smart City Initiatives and Citizen-Centric Digital Platforms">
      A second item with an equally long heading to show consistent multi-line wrapping behaviour across multiple items in the same accordion.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Standard-length heading for comparison">
      A normal-length heading alongside the long ones, showing that both coexist without layout issues.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

The same behaviour applies with the `plus` icon and without the `bordered` variant:

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-accordion icon="plus">
    <aegov-accordion-item heading="Understanding the Role of Digital Transformation in Modernising Government Services Across the UAE">
      Long title with the plus icon style — the icon anchors to the top-right just as it does for the chevron.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Short title">
      Normal heading for comparison.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

---

## RTL Support

The component fully supports right-to-left layouts. When the document or a parent element has `dir="rtl"`, the header text alignment and layout automatically adjust.

```html
<div dir="rtl">
  <aegov-accordion bordered>
    <aegov-accordion-item heading="القسم الأول">
      محتوى القسم الأول
    </aegov-accordion-item>
    <aegov-accordion-item heading="القسم الثاني">
      محتوى القسم الثاني
    </aegov-accordion-item>
  </aegov-accordion>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-accordion bordered>
    <aegov-accordion-item heading="القسم الأول">
      محتوى القسم الأول يظهر هنا عند التوسيع.
    </aegov-accordion-item>
    <aegov-accordion-item heading="القسم الثاني">
      محتوى القسم الثاني يظهر هنا عند التوسيع.
    </aegov-accordion-item>
    <aegov-accordion-item heading="القسم الثالث">
      محتوى القسم الثالث يظهر هنا عند التوسيع.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

No additional configuration is needed — the component reads the inherited `dir` attribute and adjusts automatically.

---

## Listening to Events

Each `<aegov-accordion-item>` emits an `aegovAccordionItemToggle` event when toggled. The event detail contains `{ open: boolean }` indicating the requested state.

```html
<aegov-accordion id="my-accordion">
  <aegov-accordion-item heading="Click Me">
    Toggle content.
  </aegov-accordion-item>
</aegov-accordion>

<script>
  document.getElementById('my-accordion')
    .addEventListener('aegovAccordionItemToggle', (e) => {
      console.log('Item toggled, open:', e.detail.open);
    });
</script>
```

> **Note:** When `allow-multiple` is not set, the parent component intercepts toggle events and automatically closes other items. The event still fires so you can react to state changes in your application.

---

## API Reference

### aegov-accordion (Parent)

#### Properties

| Property        | Attribute        | Description                                       | Type                                | Default     |
|-----------------|------------------|---------------------------------------------------|-------------------------------------|-------------|
| `allowMultiple` | `allow-multiple` | Allow multiple items to be open simultaneously    | `boolean`                           | `false`     |
| `defaultOpen`   | `default-open`   | Index of the item to open by default (0-based)    | `number`                            | `undefined` |
| `icon`          | `icon`           | Icon style for all child items                    | `'chevron'` \| `'plus'`            | `'chevron'` |
| `bordered`      | `bordered`       | Show a border around the accordion                | `boolean`                           | `false`     |
| `size`          | `size`           | Heading font size for all child items             | `'sm'` \| `'base'` \| `'lg'`      | `'base'`    |

#### Slots

| Slot      | Description                                                        |
|-----------|--------------------------------------------------------------------|
| (default) | One or more `<aegov-accordion-item>` elements.                    |

### aegov-accordion-item (Child)

#### Properties

| Property   | Attribute  | Description                                       | Type      | Default |
|------------|------------|---------------------------------------------------|-----------|---------|
| `heading`  | `heading`  | Heading text (alternative to the named slot)      | `string`  | —       |
| `open`     | `open`     | Whether the item is expanded                      | `boolean` | `false` |
| `disabled` | `disabled` | Prevents the item from being toggled              | `boolean` | `false` |

> Properties `icon`, `isFirst`, and `isLast` are set internally by the parent and should not be set manually.

#### Events

| Event                       | Description                          | Detail Type           |
|-----------------------------|--------------------------------------|-----------------------|
| `aegovAccordionItemToggle`  | Emitted when the item is toggled     | `{ open: boolean }`   |

The event is not emitted when the item is `disabled`.

#### Slots

| Slot                       | Description                                          |
|----------------------------|------------------------------------------------------|
| (default)                  | The collapsible content of the item.                |
| `accordion-item-heading`   | Rich heading content (takes precedence over `heading` prop). |

---

## Accessibility

The `aegov-accordion` component is built with accessibility as a first-class concern.

### Built-in Features

- **Semantic `<button>` trigger** — each item header is a native `<button>` element, keyboard-focusable and announced correctly by screen readers.
- **`aria-expanded`** — automatically set to `"true"` or `"false"` on the trigger button to reflect open/closed state.
- **`aria-controls`** — links the trigger button to the collapsible content panel via matching IDs.
- **`role="region"`** — the content panel is marked as a region, labelled by the trigger button via `aria-labelledby`.
- **Keyboard navigation** — supports Enter and Space to toggle items. Tab moves focus between items naturally.
- **Disabled state** — sets the native `disabled` attribute on the button, removing it from the interaction flow and announcing it as disabled to assistive technologies.
- **Animated height** — content opens and closes with a smooth height transition using `ResizeObserver` to track content size changes.

### Developer Responsibilities

1. **Provide meaningful headings.** Every accordion item should have a clear, descriptive heading — either via the `heading` prop or the `accordion-item-heading` slot. Avoid generic labels like "Click here".

2. **Do not nest interactive elements in headings.** The heading is rendered inside a `<button>`. Nesting other buttons, links, or form controls inside it creates invalid HTML and confuses assistive technologies.

3. **Colour contrast.** The built-in colour scheme meets WCAG 2.1 AA contrast requirements. If you override colours via CSS, verify that the new colours maintain at least a **4.5:1** contrast ratio for text.

---

## Notes

- The `<aegov-accordion-item>` component **must** be used inside `<aegov-accordion>`. Using it standalone will throw an error.
- The `icon` property is set on the **parent** and applies to all child items. You cannot set different icon styles per item.
- The `bordered` property adds a border around the entire accordion and increases internal padding. Individual items do not have a bordered option.
- When `allow-multiple` is `false` (the default), opening a new item automatically closes the currently open one. The parent manages this behaviour by listening to toggle events from its direct children.
- The `default-open` index is applied once on initial render. Changing it after the component has loaded has no effect.
- The content panel uses a height transition for smooth animation. A `ResizeObserver` watches for content size changes, which keeps the animation accurate even when content inside the panel changes dynamically (e.g. nested accordions opening).
- The last item in the accordion does not render a bottom border, maintaining a clean visual edge — especially important for the bordered variant.
