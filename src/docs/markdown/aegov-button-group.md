# Button Group

<p class="text-lg text-aeblack-500 mb-8">A button group combines related buttons into a single horizontal or vertical toolbar. Adjacent buttons share borders and have their corner radii removed for a seamless, connected appearance.</p>

## Introduction

The `aegov-button-group` component wraps two or more `<aegov-button>` elements and visually connects them by collapsing internal borders and adjusting corner radii. It supports **horizontal** and **vertical** orientations and works with all button variants, appearances, and sizes.

The parent component automatically assigns positional flags (`first`, `middle`, `last`) to each child button so that the correct border and radius styles are applied.

```html
<aegov-button-group>
  <aegov-button>Left</aegov-button>
  <aegov-button>Centre</aegov-button>
  <aegov-button>Right</aegov-button>
</aegov-button-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button-group>
    <aegov-button>Left</aegov-button>
    <aegov-button>Centre</aegov-button>
    <aegov-button>Right</aegov-button>
  </aegov-button-group>
</div>

---

## Orientation

The `orientation` property controls how the buttons are laid out. There are two options.

### Horizontal

The default orientation. Buttons are placed side by side in a row. Internal corner radii are removed, and only the first and last buttons retain their start and end radii respectively.

```html
<aegov-button-group orientation="horizontal">
  <aegov-button>First</aegov-button>
  <aegov-button>Second</aegov-button>
  <aegov-button>Third</aegov-button>
</aegov-button-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button-group orientation="horizontal">
    <aegov-button>First</aegov-button>
    <aegov-button>Second</aegov-button>
    <aegov-button>Third</aegov-button>
  </aegov-button-group>
</div>

### Vertical

Buttons are stacked in a column. The first button retains its top radii and the last button retains its bottom radii, with middle buttons having no border radius.

```html
<aegov-button-group orientation="vertical">
  <aegov-button>Top</aegov-button>
  <aegov-button>Middle</aegov-button>
  <aegov-button>Bottom</aegov-button>
</aegov-button-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button-group orientation="vertical">
    <aegov-button>Top</aegov-button>
    <aegov-button>Middle</aegov-button>
    <aegov-button>Bottom</aegov-button>
  </aegov-button-group>
</div>

---

## Variants

Button groups work with all button variants. Each variant has tailored border-collapse behaviour to keep the connected appearance clean.

### Solid

```html
<aegov-button-group>
  <aegov-button appearance="solid">One</aegov-button>
  <aegov-button appearance="solid">Two</aegov-button>
  <aegov-button appearance="solid">Three</aegov-button>
</aegov-button-group>
```

<div class="flex flex-wrap gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button-group>
    <aegov-button appearance="solid">One</aegov-button>
    <aegov-button appearance="solid">Two</aegov-button>
    <aegov-button appearance="solid">Three</aegov-button>
  </aegov-button-group>
  <aegov-button-group>
    <aegov-button appearance="solid" variant="secondary">One</aegov-button>
    <aegov-button appearance="solid" variant="secondary">Two</aegov-button>
    <aegov-button appearance="solid" variant="secondary">Three</aegov-button>
  </aegov-button-group>
  <aegov-button-group>
    <aegov-button appearance="solid" variant="danger">One</aegov-button>
    <aegov-button appearance="solid" variant="danger">Two</aegov-button>
    <aegov-button appearance="solid" variant="danger">Three</aegov-button>
  </aegov-button-group>
</div>

### Outline

```html
<aegov-button-group>
  <aegov-button appearance="outline">One</aegov-button>
  <aegov-button appearance="outline">Two</aegov-button>
  <aegov-button appearance="outline">Three</aegov-button>
</aegov-button-group>
```

<div class="flex flex-wrap gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button-group>
    <aegov-button appearance="outline">One</aegov-button>
    <aegov-button appearance="outline">Two</aegov-button>
    <aegov-button appearance="outline">Three</aegov-button>
  </aegov-button-group>
  <aegov-button-group>
    <aegov-button appearance="outline" variant="secondary">One</aegov-button>
    <aegov-button appearance="outline" variant="secondary">Two</aegov-button>
    <aegov-button appearance="outline" variant="secondary">Three</aegov-button>
  </aegov-button-group>
  <aegov-button-group>
    <aegov-button appearance="outline" variant="danger">One</aegov-button>
    <aegov-button appearance="outline" variant="danger">Two</aegov-button>
    <aegov-button appearance="outline" variant="danger">Three</aegov-button>
  </aegov-button-group>
</div>

### Soft

```html
<aegov-button-group>
  <aegov-button appearance="soft">One</aegov-button>
  <aegov-button appearance="soft">Two</aegov-button>
  <aegov-button appearance="soft">Three</aegov-button>
</aegov-button-group>
```

<div class="flex flex-wrap gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button-group>
    <aegov-button appearance="soft">One</aegov-button>
    <aegov-button appearance="soft">Two</aegov-button>
    <aegov-button appearance="soft">Three</aegov-button>
  </aegov-button-group>
  <aegov-button-group>
    <aegov-button appearance="soft" variant="secondary">One</aegov-button>
    <aegov-button appearance="soft" variant="secondary">Two</aegov-button>
    <aegov-button appearance="soft" variant="secondary">Three</aegov-button>
  </aegov-button-group>
  <aegov-button-group>
    <aegov-button appearance="soft" variant="danger">One</aegov-button>
    <aegov-button appearance="soft" variant="danger">Two</aegov-button>
    <aegov-button appearance="soft" variant="danger">Three</aegov-button>
  </aegov-button-group>
</div>

---

## Sizes

All child buttons should use the same `size` for a consistent appearance. The border-radius collapse adapts to each size.

```html
<aegov-button-group>
  <aegov-button size="xs">XS</aegov-button>
  <aegov-button size="xs">XS</aegov-button>
  <aegov-button size="xs">XS</aegov-button>
</aegov-button-group>
```

<div class="flex flex-wrap items-center gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button-group>
    <aegov-button size="xs">XS</aegov-button>
    <aegov-button size="xs">XS</aegov-button>
    <aegov-button size="xs">XS</aegov-button>
  </aegov-button-group>
  <aegov-button-group>
    <aegov-button size="sm">SM</aegov-button>
    <aegov-button size="sm">SM</aegov-button>
    <aegov-button size="sm">SM</aegov-button>
  </aegov-button-group>
  <aegov-button-group>
    <aegov-button size="base">Base</aegov-button>
    <aegov-button size="base">Base</aegov-button>
    <aegov-button size="base">Base</aegov-button>
  </aegov-button-group>
  <aegov-button-group>
    <aegov-button size="lg">LG</aegov-button>
    <aegov-button size="lg">LG</aegov-button>
    <aegov-button size="lg">LG</aegov-button>
  </aegov-button-group>
</div>

---

## Icon Button Group

Combine the button `icon` property with a button group to create a compact toolbar of icon-only actions.

```html
<aegov-button-group>
  <aegov-button icon aria-label="Bold">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round"
         stroke-linejoin="round">
      <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z"/>
      <path d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"/>
    </svg>
  </aegov-button>
  <aegov-button icon aria-label="Italic">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round"
         stroke-linejoin="round">
      <line x1="19" y1="4" x2="10" y2="4"/>
      <line x1="14" y1="20" x2="5" y2="20"/>
      <line x1="15" y1="4" x2="9" y2="20"/>
    </svg>
  </aegov-button>
  <aegov-button icon aria-label="Underline">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round"
         stroke-linejoin="round">
      <path d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3"/>
      <line x1="4" y1="21" x2="20" y2="21"/>
    </svg>
  </aegov-button>
</aegov-button-group>
```

<div class="flex flex-wrap items-center gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button-group>
    <aegov-button icon appearance="outline" aria-label="Bold">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z"/><path d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"/></svg>
    </aegov-button>
    <aegov-button icon appearance="outline" aria-label="Italic">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>
    </aegov-button>
    <aegov-button icon appearance="outline" aria-label="Underline">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>
    </aegov-button>
  </aegov-button-group>
  <aegov-button-group>
    <aegov-button icon appearance="soft" aria-label="Align Left">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>
    </aegov-button>
    <aegov-button icon appearance="soft" aria-label="Align Centre">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="10" x2="6" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="18" y1="18" x2="6" y2="18"/></svg>
    </aegov-button>
    <aegov-button icon appearance="soft" aria-label="Align Right">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="10" x2="7" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="7" y2="18"/></svg>
    </aegov-button>
  </aegov-button-group>
</div>

> **Important:** Always provide an `aria-label` on each icon-only button so screen readers can announce its purpose.

---

## Mixed Variants and Appearances

You can mix different button variants or appearances within a single group to create visual hierarchy, such as a primary action alongside a secondary cancel action.

```html
<aegov-button-group>
  <aegov-button appearance="solid">Save</aegov-button>
  <aegov-button appearance="outline">Cancel</aegov-button>
</aegov-button-group>
```

<div class="flex flex-wrap gap-4 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button-group>
    <aegov-button appearance="solid">Save</aegov-button>
    <aegov-button appearance="outline">Cancel</aegov-button>
  </aegov-button-group>
  <aegov-button-group>
    <aegov-button appearance="solid" variant="danger">Delete</aegov-button>
    <aegov-button appearance="outline">Cancel</aegov-button>
  </aegov-button-group>
  <aegov-button-group>
    <aegov-button appearance="soft">Draft</aegov-button>
    <aegov-button appearance="solid">Publish</aegov-button>
  </aegov-button-group>
</div>

---

## RTL Support

The component fully supports right-to-left layouts. When the document or a parent element has `dir="rtl"`, the horizontal layout direction and border-radius logic automatically mirror. The CSS uses logical properties (`rounded-s-*`, `rounded-e-*`, `border-s-*`) so no additional configuration is needed.

```html
<div dir="rtl">
  <aegov-button-group>
    <aegov-button>الأول</aegov-button>
    <aegov-button>الثاني</aegov-button>
    <aegov-button>الثالث</aegov-button>
  </aegov-button-group>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button-group>
    <aegov-button>الأول</aegov-button>
    <aegov-button>الثاني</aegov-button>
    <aegov-button>الثالث</aegov-button>
  </aegov-button-group>
</div>

---

## API Reference

### Properties

| Property      | Attribute      | Description                          | Type                             | Default        |
|---------------|----------------|--------------------------------------|----------------------------------|----------------|
| `orientation` | `orientation`  | The layout direction of the group    | `'horizontal'` \| `'vertical'`  | `'horizontal'` |

### Slots

| Slot      | Description                                                              |
|-----------|--------------------------------------------------------------------------|
| (default) | Two or more `<aegov-button>` elements to be grouped together.           |

### Internal Child Props

The `aegov-button-group` component automatically sets the following internal properties on each child `<aegov-button>`. These are not intended to be set manually.

| Property           | Description                                   | Values                                    |
|--------------------|-----------------------------------------------|-------------------------------------------|
| `groupPosition`    | The button's position within the group        | `'first'` \| `'middle'` \| `'last'` \| `'single'` |
| `groupOrientation` | The orientation inherited from the parent     | `'horizontal'` \| `'vertical'`           |

---

## Accessibility

### Built-in Features

- **`role="group"`** — the inner container has the `group` role, telling assistive technologies that the buttons are related.
- **Keyboard navigation** — each child button is a native `<button>` element, so standard Tab key navigation works out of the box.
- **Focus indicators** — individual button focus rings are preserved within the group.

### Developer Responsibilities

1. **Provide context with `aria-label`.** When the purpose of the group is not obvious from the button labels alone, add an `aria-label` to the `<aegov-button-group>` element to describe the group.

   ```html
   <aegov-button-group aria-label="Text formatting">
     <aegov-button icon aria-label="Bold">…</aegov-button>
     <aegov-button icon aria-label="Italic">…</aegov-button>
   </aegov-button-group>
   ```

2. **Icon-only buttons need labels.** As with standalone icon buttons, always provide `aria-label` on each icon-only button inside a group.

3. **Do not nest button groups.** Placing a `<aegov-button-group>` inside another `<aegov-button-group>` produces invalid structure and confuses assistive technologies.

---

## Notes

- All direct children of `<aegov-button-group>` must be `<aegov-button>` elements. The component logs a console warning if non-button children are detected.
- The component assigns positional CSS classes (`btn-grouped-first-horizontal`, `btn-grouped-middle-horizontal`, `btn-grouped-last-horizontal`) to each child button. These classes handle border-radius removal and internal border collapse.
- For the outline variant, internal borders between buttons are removed (`border-s-0`) to avoid doubled borders. For solid and soft variants, a slightly darker or lighter separator border is used instead.
- The `orientation` property can be changed dynamically. The component recalculates button positions on every update.
- When a group contains only a single button, it receives the `single` position and retains its normal border radius.
- For consistent sizing, ensure all buttons in the group use the same `size` property. Mixing sizes is technically possible but produces uneven visual results.
