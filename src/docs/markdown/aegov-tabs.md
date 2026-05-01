# aegov-tabs

A tab container that groups related views into a single surface. The `aegov-tabs` parent owns the active state, while `aegov-tab` triggers and `aegov-tab-panel` content elements are paired by matching `tab-id` values. The component supports three visual variants, two orientations, scrollable overflow, and full keyboard navigation that follows the WAI-ARIA tabs pattern.

## Properties

### default-open

The `tab-id` of the tab that should be active on first render. If omitted, the first non-disabled tab is activated automatically.

```html
<aegov-tabs default-open="overview">
  <aegov-tab slot="tabs" tab-id="overview">Overview</aegov-tab>
  <aegov-tab slot="tabs" tab-id="details">Details</aegov-tab>
  <aegov-tab-panel tab-id="overview">Overview content</aegov-tab-panel>
  <aegov-tab-panel tab-id="details">Details content</aegov-tab-panel>
</aegov-tabs>
```

### variant

Visual style for the tab triggers.

- `simple` (default): underline-style tabs.
- `segmented`: connected button-group tabs, ideal for view toggles.
- `pill`: pill-shaped individual tabs.

```html
<aegov-tabs variant="segmented" default-open="day">
  <aegov-tab slot="tabs" tab-id="day">Day</aegov-tab>
  <aegov-tab slot="tabs" tab-id="week">Week</aegov-tab>
  <aegov-tab-panel tab-id="day">Daily view</aegov-tab-panel>
  <aegov-tab-panel tab-id="week">Weekly view</aegov-tab-panel>
</aegov-tabs>
```

### size

Tab trigger size. Accepts `sm`, `base`, or `lg`. Also supports a Tailwind-style responsive string.

```html
<aegov-tabs size="lg" default-open="a">
  <aegov-tab slot="tabs" tab-id="a">A</aegov-tab>
  <aegov-tab-panel tab-id="a">A</aegov-tab-panel>
</aegov-tabs>
```

### orientation

Layout direction. `horizontal` (default) places tabs above panels; `vertical` places them to the side.

```html
<aegov-tabs orientation="vertical" default-open="profile">
  <aegov-tab slot="tabs" tab-id="profile">Profile</aegov-tab>
  <aegov-tab slot="tabs" tab-id="security">Security</aegov-tab>
  <aegov-tab-panel tab-id="profile">Profile</aegov-tab-panel>
  <aegov-tab-panel tab-id="security">Security</aegov-tab-panel>
</aegov-tabs>
```

### is-scrollable

Enables horizontal (or vertical) scrolling when tabs overflow, with a faded gradient edge to signal more content.

```html
<aegov-tabs is-scrollable="true" default-open="t1">
  <aegov-tab slot="tabs" tab-id="t1">Tab 1</aegov-tab>
  <aegov-tab slot="tabs" tab-id="t2">Tab 2</aegov-tab>
  <aegov-tab slot="tabs" tab-id="t3">Tab 3</aegov-tab>
  <aegov-tab slot="tabs" tab-id="t4">Tab 4</aegov-tab>
  <!-- panels... -->
</aegov-tabs>
```

### is-stretchable

Stretches each tab to fill the available width equally.

```html
<aegov-tabs is-stretchable="true" default-open="a">
  <aegov-tab slot="tabs" tab-id="a">A</aegov-tab>
  <aegov-tab slot="tabs" tab-id="b">B</aegov-tab>
  <aegov-tab-panel tab-id="a">A</aegov-tab-panel>
  <aegov-tab-panel tab-id="b">B</aegov-tab-panel>
</aegov-tabs>
```

### label-tablist

Accessible label for the `role="tablist"` element. Defaults to `"Tabs"`.

```html
<aegov-tabs label-tablist="Account sections">...</aegov-tabs>
```

### field-id

Auto-generated when omitted. Reflects to the outer container's `id`.

### Sub-component: aegov-tab

A single tab trigger. Place inside `aegov-tabs` with `slot="tabs"`. Uses `tab-id` to pair with its panel.

#### tab-id

Required. Must match a sibling `aegov-tab-panel`'s `tab-id`.

#### is-disabled

Disables the trigger and is skipped during keyboard navigation.

```html
<aegov-tab slot="tabs" tab-id="archive" is-disabled="true">Archive</aegov-tab>
```

#### Slots

`aegov-tab` exposes three slots:

- (default) — the tab label.
- `icon` — an icon placed before the label.
- `icon-end` — an icon placed after the label.

```html
<aegov-tab slot="tabs" tab-id="profile">
  <svg slot="icon" viewBox="0 0 24 24" width="16" height="16"><!-- ... --></svg>
  Profile
</aegov-tab>
```

### Sub-component: aegov-tab-panel

The content panel for a tab. Pair via matching `tab-id`. The parent toggles its `active` prop.

#### tab-id

Required. Must match the corresponding `aegov-tab`'s `tab-id`.

#### extra-class

Additional CSS classes merged onto the inner panel element.

```html
<aegov-tab-panel tab-id="overview" extra-class="prose">
  <p>Overview content...</p>
</aegov-tab-panel>
```

## Sizes

`size` accepts a single token or a responsive string using Tailwind-style breakpoint prefixes (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`).

```html
<aegov-tabs size="sm md:base lg:lg" default-open="a">
  <aegov-tab slot="tabs" tab-id="a">A</aegov-tab>
  <aegov-tab-panel tab-id="a">A</aegov-tab-panel>
</aegov-tabs>
```

| Token  | Trigger size |
| ------ | ------------ |
| `sm`   | Compact      |
| `base` | Default      |
| `lg`   | Large        |

## Examples

### Basic horizontal tabs

```html
<aegov-tabs default-open="overview">
  <aegov-tab slot="tabs" tab-id="overview">Overview</aegov-tab>
  <aegov-tab slot="tabs" tab-id="usage">Usage</aegov-tab>
  <aegov-tab slot="tabs" tab-id="api">API</aegov-tab>
  <aegov-tab-panel tab-id="overview">Overview content</aegov-tab-panel>
  <aegov-tab-panel tab-id="usage">Usage content</aegov-tab-panel>
  <aegov-tab-panel tab-id="api">API content</aegov-tab-panel>
</aegov-tabs>
```

### Segmented view-toggle

```html
<aegov-tabs variant="segmented" default-open="grid">
  <aegov-tab slot="tabs" tab-id="grid">Grid</aegov-tab>
  <aegov-tab slot="tabs" tab-id="list">List</aegov-tab>
  <aegov-tab-panel tab-id="grid">Grid view</aegov-tab-panel>
  <aegov-tab-panel tab-id="list">List view</aegov-tab-panel>
</aegov-tabs>
```

### Vertical tabs with icons

```html
<aegov-tabs orientation="vertical" default-open="profile">
  <aegov-tab slot="tabs" tab-id="profile">
    <svg slot="icon" width="16" height="16"><!-- ... --></svg>
    Profile
  </aegov-tab>
  <aegov-tab slot="tabs" tab-id="security">
    <svg slot="icon" width="16" height="16"><!-- ... --></svg>
    Security
  </aegov-tab>
  <aegov-tab-panel tab-id="profile">Profile content</aegov-tab-panel>
  <aegov-tab-panel tab-id="security">Security content</aegov-tab-panel>
</aegov-tabs>
```

### Scrollable overflow

```html
<aegov-tabs is-scrollable="true" default-open="m1">
  <aegov-tab slot="tabs" tab-id="m1">January</aegov-tab>
  <aegov-tab slot="tabs" tab-id="m2">February</aegov-tab>
  <aegov-tab slot="tabs" tab-id="m3">March</aegov-tab>
  <!-- ...more months -->
  <aegov-tab-panel tab-id="m1">January</aegov-tab-panel>
  <!-- ... -->
</aegov-tabs>
```

## RTL Behavior

`aegov-tabs` is direction-aware. In an RTL context (`dir="rtl"`):

- Horizontal tab order flows right-to-left so `ArrowLeft` advances and `ArrowRight` retreats.
- Vertical orientation is unaffected; arrow keys remain `ArrowUp`/`ArrowDown`.
- `Home` and `End` always jump to first/last tab regardless of direction.
- Scrollable fade gradients adjust to reflect scroll position from either edge.

## API Reference

### aegov-tabs Properties

| Property         | Attribute         | Description                                              | Type                                       | Default      |
| ---------------- | ----------------- | -------------------------------------------------------- | ------------------------------------------ | ------------ |
| `fieldId`        | `field-id`        | DOM `id` for the container. Auto-generated if omitted   | `string`                                   | generated    |
| `variant`        | `variant`         | Visual style                                             | `'simple' \| 'segmented' \| 'pill'`        | `'simple'`   |
| `defaultOpen`    | `default-open`    | `tab-id` of the initially active tab                     | `string`                                   | `''`         |
| `size`           | `size`            | Trigger size token or responsive string                  | `string`                                   | `'base'`     |
| `orientation`    | `orientation`     | Layout orientation                                       | `'horizontal' \| 'vertical'`               | `'horizontal'` |
| `isScrollable`   | `is-scrollable`   | Enable scroll-overflow with edge fade                    | `boolean`                                  | `false`      |
| `isStretchable`  | `is-stretchable`  | Stretch tabs to fill container                           | `boolean`                                  | `false`      |
| `labelTablist`   | `label-tablist`   | `aria-label` for the `role="tablist"` element            | `string`                                   | `'Tabs'`     |

### aegov-tab Properties

| Property        | Attribute         | Description                                       | Type      | Default     |
| --------------- | ----------------- | ------------------------------------------------- | --------- | ----------- |
| `tabId`         | `tab-id`          | Required. Matches the corresponding panel        | `string`  | (required)  |
| `isDisabled`    | `is-disabled`     | Disable this tab                                  | `boolean` | `false`     |
| `activeTabId`   | `active-tab-id`   | (managed by parent) currently active tab id       | `string`  | `''`        |
| `variant`       | `variant`         | (managed by parent)                               | enum      | `'simple'`  |
| `size`          | `size`            | (managed by parent)                               | `string`  | `'base'`    |
| `orientation`   | `orientation`     | (managed by parent)                               | enum      | `'horizontal'` |

### aegov-tab-panel Properties

| Property      | Attribute      | Description                                     | Type      | Default      |
| ------------- | -------------- | ----------------------------------------------- | --------- | ------------ |
| `tabId`       | `tab-id`       | Required. Matches the corresponding tab         | `string`  | (required)   |
| `active`      | `active`       | (managed by parent) is panel currently shown    | `boolean` | `false`      |
| `extraClass`  | `extra-class`  | Additional CSS classes on the panel element     | `string`  | `undefined`  |

### Pass-through Attributes

`aegov-tabs` forwards `aria-*` and `data-*` attributes set on the host onto the rendered container element. Pass-through is not enabled on `aegov-tab` or `aegov-tab-panel`.

### Events

| Event             | Component     | Detail   | Description                                        |
| ----------------- | ------------- | -------- | -------------------------------------------------- |
| `aegovTabChange`  | `aegov-tabs`  | `string` | Fires when the active tab changes (after the new tab is applied). Detail is the new active `tab-id`. |
| `aegovTabSelect`  | `aegov-tab`   | `string` | Bubbles up from a tab when clicked. The parent listens and updates state — consumers normally listen to `aegovTabChange` instead. |

### Event listening example

```html
<aegov-tabs id="settings" default-open="profile">
  <aegov-tab slot="tabs" tab-id="profile">Profile</aegov-tab>
  <aegov-tab slot="tabs" tab-id="security">Security</aegov-tab>
  <aegov-tab-panel tab-id="profile">Profile</aegov-tab-panel>
  <aegov-tab-panel tab-id="security">Security</aegov-tab-panel>
</aegov-tabs>

<script>
  document.querySelector('#settings').addEventListener('aegovTabChange', (e) => {
    console.log('Active tab is now', e.detail);
  });
</script>
```

### Slots

| Component         | Slot name | Description                                              |
| ----------------- | --------- | -------------------------------------------------------- |
| `aegov-tabs`      | `tabs`    | `aegov-tab` triggers (each must use `slot="tabs"`)       |
| `aegov-tabs`      | (default) | `aegov-tab-panel` elements                               |
| `aegov-tab`       | (default) | Tab label text                                           |
| `aegov-tab`       | `icon`    | Optional icon shown before the label                     |
| `aegov-tab`       | `icon-end`| Optional icon shown after the label                      |
| `aegov-tab-panel` | (default) | Panel content                                            |

## Accessibility

### Built-in

- The tablist uses `role="tablist"` with an `aria-label` (`labelTablist`) and `aria-orientation` reflecting `orientation`.
- Each tab is a real `<button>` with `role="tab"`, `aria-selected`, and `aria-controls` linking to its panel.
- Each panel uses `role="tabpanel"`, `aria-labelledby` linking to its tab, and `hidden` when inactive.
- Inactive tabs receive `tabindex="-1"`; the active tab uses `tabindex="0"` (roving tabindex pattern).
- Disabled tabs set both `disabled` and `aria-disabled="true"` and are skipped by keyboard navigation.

### Developer responsibilities

- Provide a unique, matching `tab-id` for each tab/panel pair.
- Ensure each tab has a meaningful accessible name through the default slot.
- When using only icons, provide accessible text via the default slot or visually hidden text.
- Override the default `label-tablist` when the tabs control more specific content.

### Keyboard support

| Key            | Horizontal           | Vertical             |
| -------------- | -------------------- | -------------------- |
| `ArrowRight`   | Move to next tab     | (no effect)          |
| `ArrowLeft`    | Move to previous tab | (no effect)          |
| `ArrowDown`    | (no effect)          | Move to next tab     |
| `ArrowUp`      | (no effect)          | Move to previous tab |
| `Home`         | Move to first tab    | Move to first tab    |
| `End`          | Move to last tab     | Move to last tab     |
| `Tab`          | Move into/out of tablist (focuses active tab on entry) | Same |

Arrow-key navigation is automatic, wraps around at the ends, and skips disabled tabs. RTL flips the horizontal arrow direction. Note that activation occurs on focus change (automatic activation) — moving focus also activates the tab.

### Notes

- Activation follows focus by design. If you need manual activation (focus moves but content does not change until `Enter`/`Space`), this is not currently supported.
- When `is-scrollable` is enabled, activating a tab smoothly scrolls it into view.
