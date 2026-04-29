# Toggle

<p class="text-lg text-aeblack-500 mb-8">A toggle (also known as a switch) lets users turn a single option on or off instantly. It is the digital equivalent of a physical light switch.</p>

## Introduction

The `aegov-toggle` component renders an accessible on/off switch built on a native `<input type="checkbox" role="switch">` element. It supports **5 sizes**, optional **label** and **description** text, **custom icons** inside the thumb, and a **disabled** state out of the box.

```html
<aegov-toggle label="Notifications"></aegov-toggle>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-toggle label="Notifications"></aegov-toggle>
</div>

---

## Checked State

Set the `checked` attribute to render the toggle in its on position. The track colour changes from neutral grey to the primary brand colour.

```html
<aegov-toggle checked label="Enabled"></aegov-toggle>
<aegov-toggle label="Disabled feature"></aegov-toggle>
```

<div class="flex flex-wrap items-center gap-6 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-toggle checked label="Enabled"></aegov-toggle>
  <aegov-toggle label="Disabled feature"></aegov-toggle>
</div>

---

## Disabled

Set the `disabled` attribute to prevent interaction. The toggle becomes visually muted and unclickable.

```html
<aegov-toggle disabled label="Disabled off"></aegov-toggle>
<aegov-toggle disabled checked label="Disabled on"></aegov-toggle>
```

<div class="flex flex-wrap items-center gap-6 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-toggle disabled label="Disabled off"></aegov-toggle>
  <aegov-toggle disabled checked label="Disabled on"></aegov-toggle>
</div>

---

## Sizes

The `size` property controls the dimensions of the track, thumb, label font size, and description font size. There are five sizes available.

| Size   | Track      | Thumb  | Label Font | Description Font |
|--------|------------|--------|------------|------------------|
| `xs`   | 26 x 11px  | 16px   | 12px       | 10px             |
| `sm`   | 32 x 14px  | 20px   | 14px       | 12px             |
| `base` | 40 x 18px  | 24px   | 16px       | 14px             |
| `lg`   | 48 x 22px  | 28px   | 18px       | 16px             |
| `xl`   | 56 x 26px  | 32px   | 20px       | 18px             |

```html
<aegov-toggle size="xs" label="Extra Small"></aegov-toggle>
<aegov-toggle size="sm" label="Small"></aegov-toggle>
<aegov-toggle size="base" label="Base (default)"></aegov-toggle>
<aegov-toggle size="lg" label="Large"></aegov-toggle>
<aegov-toggle size="xl" label="Extra Large"></aegov-toggle>
```

<div class="flex flex-wrap items-center gap-6 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-toggle size="xs" label="Extra Small"></aegov-toggle>
  <aegov-toggle size="sm" label="Small"></aegov-toggle>
  <aegov-toggle size="base" label="Base (default)"></aegov-toggle>
  <aegov-toggle size="lg" label="Large"></aegov-toggle>
  <aegov-toggle size="xl" label="Extra Large"></aegov-toggle>
</div>

### Responsive Size

The `size` prop accepts Tailwind-style responsive prefixes. Write a space-separated string where each token is either a plain value or `breakpoint:value`. The base value (no prefix) applies below the smallest specified breakpoint.

Available breakpoints: `xs` (480px), `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px), `3xl` (1680px).

```html
<aegov-toggle size="sm xl:lg" label="Responsive Toggle"></aegov-toggle>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-toggle size="sm xl:lg" label="Responsive Toggle"></aegov-toggle>
</div>

> **Graceful degradation:** Unknown breakpoint names and invalid values are silently ignored. An unrecognised base value falls back to the component default.

---

## Label Text

The `label` property renders a text label inline with the toggle. The label is placed at the inline-end of the toggle control (to the right in LTR, to the left in RTL). When a label is provided, the entire row becomes a clickable `<label>` element.

```html
<aegov-toggle label="Dark mode"></aegov-toggle>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-toggle label="Dark mode"></aegov-toggle>
</div>

---

## Description

The `description` property renders helper text below the label. It is only displayed when a `label` is also provided. The description is linked to the native input via `aria-describedby` for screen readers.

```html
<aegov-toggle
  label="Email notifications"
  description="Receive updates about your account activity via email.">
</aegov-toggle>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-toggle label="Email notifications" description="Receive updates about your account activity via email."></aegov-toggle>
</div>

### Description with Different Sizes

```html
<aegov-toggle size="xs" label="Extra small toggle"
  description="Helper text for the extra small size."></aegov-toggle>
<aegov-toggle size="sm" label="Small toggle"
  description="Helper text for the small size."></aegov-toggle>
<aegov-toggle size="base" label="Base toggle"
  description="Helper text for the base size."></aegov-toggle>
<aegov-toggle size="lg" label="Large toggle"
  description="Helper text for the large size."></aegov-toggle>
<aegov-toggle size="xl" label="Extra large toggle"
  description="Helper text for the extra large size."></aegov-toggle>
```

<div class="flex flex-col gap-6 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-toggle size="xs" label="Extra small toggle" description="Helper text for the extra small size."></aegov-toggle>
  <aegov-toggle size="sm" label="Small toggle" description="Helper text for the small size."></aegov-toggle>
  <aegov-toggle size="base" label="Base toggle" description="Helper text for the base size."></aegov-toggle>
  <aegov-toggle size="lg" label="Large toggle" description="Helper text for the large size."></aegov-toggle>
  <aegov-toggle size="xl" label="Extra large toggle" description="Helper text for the extra large size."></aegov-toggle>
</div>

---

## Toggle without Label

When no `label` is provided, only the toggle control is rendered. This is useful when the toggle sits inside a layout that already provides a visible label.

```html
<aegov-toggle></aegov-toggle>
<aegov-toggle checked></aegov-toggle>
```

<div class="flex flex-wrap items-center gap-6 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-toggle></aegov-toggle>
  <aegov-toggle checked></aegov-toggle>
</div>

> **Important:** When using a toggle without a label, provide an `aria-label` attribute on the host element so screen readers can announce the toggle's purpose.

---

## Custom Icons in Thumb

The toggle supports two named slots for placing icons inside the thumb: `icon-checked` and `icon-unchecked`. Only the icon matching the current state is visible at any time — the transition between them is a smooth opacity fade.

Icons are automatically sized to match the current toggle size and colour-coded: grey when unchecked, primary brand colour when checked.

```html
<aegov-toggle checked label="With icons">
  <svg slot="icon-unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="3"
       stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
  <svg slot="icon-checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="3"
       stroke-linecap="round" stroke-linejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
</aegov-toggle>
```

<div class="flex flex-wrap items-center gap-6 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-toggle label="Off with icons">
    <svg slot="icon-unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    <svg slot="icon-checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  </aegov-toggle>
  <aegov-toggle checked label="On with icons">
    <svg slot="icon-unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    <svg slot="icon-checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  </aegov-toggle>
</div>

### Icons at All Sizes

```html
<aegov-toggle size="xs" checked label="Extra Small">
  <svg slot="icon-unchecked" ...>...</svg>
  <svg slot="icon-checked" ...>...</svg>
</aegov-toggle>
<aegov-toggle size="sm" checked label="Small">...</aegov-toggle>
<aegov-toggle size="base" checked label="Base">...</aegov-toggle>
<aegov-toggle size="lg" checked label="Large">...</aegov-toggle>
<aegov-toggle size="xl" checked label="Extra Large">...</aegov-toggle>
```

<div class="flex flex-wrap items-center gap-6 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-toggle size="xs" checked label="Extra Small">
    <svg slot="icon-unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    <svg slot="icon-checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  </aegov-toggle>
  <aegov-toggle size="sm" checked label="Small">
    <svg slot="icon-unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    <svg slot="icon-checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  </aegov-toggle>
  <aegov-toggle size="base" checked label="Base">
    <svg slot="icon-unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    <svg slot="icon-checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  </aegov-toggle>
  <aegov-toggle size="lg" checked label="Large">
    <svg slot="icon-unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    <svg slot="icon-checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  </aegov-toggle>
  <aegov-toggle size="xl" checked label="Extra Large">
    <svg slot="icon-unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    <svg slot="icon-checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  </aegov-toggle>
</div>

---

## Name and Value

The `name` and `value` properties map directly to the native `<input>` attributes, making the toggle compatible with standard HTML forms.

```html
<form>
  <aegov-toggle name="notifications" value="email" checked
    label="Email notifications"></aegov-toggle>
  <aegov-toggle name="notifications" value="sms"
    label="SMS notifications"></aegov-toggle>
</form>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div class="flex flex-col gap-4">
    <aegov-toggle name="notifications" value="email" checked label="Email notifications"></aegov-toggle>
    <aegov-toggle name="notifications" value="sms" label="SMS notifications"></aegov-toggle>
  </div>
</div>

---

## Required

Set the `required` attribute to mark the toggle as required. This adds `aria-required="true"` to the native input for accessibility and enables built-in browser validation.

```html
<aegov-toggle required label="I agree to the terms and conditions"></aegov-toggle>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-toggle required label="I agree to the terms and conditions"></aegov-toggle>
</div>

---

## Usage with Form Field

The toggle can be placed inside an `aegov-form-field` component for consistent form layout with other form elements.

```html
<aegov-form-field>
  <aegov-toggle label="Enable two-factor authentication"
    description="Adds an extra layer of security to your account.">
  </aegov-toggle>
</aegov-form-field>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-form-field>
    <aegov-toggle label="Enable two-factor authentication" description="Adds an extra layer of security to your account."></aegov-toggle>
  </aegov-form-field>
</div>

---

## Events

The toggle emits an `aegovToggleChange` event whenever the checked state changes. The event detail includes `checked` (boolean) and `value` (string, if set).

```html
<aegov-toggle id="my-toggle" label="Dark mode" value="dark"></aegov-toggle>

<script>
  document.getElementById('my-toggle')
    .addEventListener('aegovToggleChange', (e) => {
      console.log('Checked:', e.detail.checked);
      console.log('Value:', e.detail.value);
    });
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-toggle id="toggle-event-demo" label="Toggle me and check the console" value="demo"></aegov-toggle>
  <p class="mt-3 text-sm text-aeblack-500" id="toggle-event-output">State: off</p>
  <script>
    document.getElementById('toggle-event-demo')
      .addEventListener('aegovToggleChange', function(e) {
        document.getElementById('toggle-event-output').textContent =
          'State: ' + (e.detail.checked ? 'on' : 'off') + (e.detail.value ? ' (value: ' + e.detail.value + ')' : '');
      });
  </script>
</div>

---

## RTL Support

The component fully supports right-to-left layouts. When the document or a parent element has `dir="rtl"`, the thumb slides in the opposite direction and the label appears on the inline-start side (left in RTL).

```html
<div dir="rtl">
  <aegov-toggle checked label="الوضع الداكن"
    description="تفعيل المظهر الداكن للتطبيق."></aegov-toggle>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div class="flex flex-col gap-6">
    <aegov-toggle checked label="الوضع الداكن" description="تفعيل المظهر الداكن للتطبيق."></aegov-toggle>
    <aegov-toggle label="الإشعارات" description="تلقي الإشعارات عبر البريد الإلكتروني."></aegov-toggle>
    <aegov-toggle disabled checked label="معطل (مفعل)"></aegov-toggle>
  </div>
</div>

No additional configuration is needed — the component reads the inherited `dir` attribute and adjusts the thumb translation direction automatically.

---

## Field ID

The `field-id` property sets the `id` attribute on the native `<input>` element. If not provided, a unique ID is auto-generated. This is useful when you need to associate an external `<label>` with the toggle.

```html
<aegov-toggle field-id="custom-toggle-id" label="Custom ID"></aegov-toggle>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-toggle field-id="custom-toggle-id" label="Custom ID"></aegov-toggle>
</div>

---

## API Reference

### Properties

| Property      | Attribute     | Description                                                              | Type                            | Default     |
|---------------|---------------|--------------------------------------------------------------------------|---------------------------------|-------------|
| `checked`     | `checked`     | Whether the toggle is on                                                 | `boolean`                       | `false`     |
| `disabled`    | `disabled`    | Prevents interaction                                                     | `boolean`                       | `false`     |
| `required`    | `required`    | Marks the toggle as required for form validation                         | `boolean`                       | `false`     |
| `size`        | `size`        | The toggle size. Supports responsive strings (e.g. `'sm xl:lg'`).       | `'xs'` \| `'sm'` \| `'base'` \| `'lg'` \| `'xl'` | `'base'`    |
| `label`       | `label`       | Label text rendered inline with the toggle                               | `string`                        | `undefined` |
| `description` | `description` | Helper text below the label (only shown when label is provided)          | `string`                        | `undefined` |
| `name`        | `name`        | The name attribute for the native input                                  | `string`                        | `undefined` |
| `value`       | `value`       | The value attribute for the native input                                 | `string`                        | `undefined` |
| `fieldId`     | `field-id`    | Custom ID for the native input. Auto-generated if not provided.          | `string`                        | auto        |

### Events

| Event               | Description                                 | Detail Type                              |
|---------------------|---------------------------------------------|------------------------------------------|
| `aegovToggleChange` | Emitted when the checked state changes      | `{ checked: boolean; value?: string }`   |

#### Listening to Events

```html
<aegov-toggle id="my-toggle" label="Alerts" value="alerts"></aegov-toggle>

<script>
  document.getElementById('my-toggle')
    .addEventListener('aegovToggleChange', (e) => {
      console.log('Checked:', e.detail.checked);
      console.log('Value:', e.detail.value);
    });
</script>
```

### Slots

| Slot              | Description                                                            |
|-------------------|------------------------------------------------------------------------|
| `icon-unchecked`  | Icon shown inside the thumb when the toggle is **off**.                |
| `icon-checked`    | Icon shown inside the thumb when the toggle is **on**.                 |

Icons placed in these slots are automatically sized and colour-coded. Use SVG or `<img>` elements.

### Pass-Through Attributes

The component forwards the following attributes from the host element to the native `<input>`: `form`, `tabindex`, `autofocus`, `title`, and all `aria-*` and `data-*` attributes.

```html
<aegov-toggle aria-label="Enable feature" data-track="feature-toggle"
  tabindex="0"></aegov-toggle>
```

---

## Accessibility

The `aegov-toggle` component is built with accessibility as a first-class concern. The following features are included out of the box.

### Built-in Features

- **`role="switch"`** — the native input is rendered with `role="switch"`, which tells screen readers this is an on/off toggle rather than a standard checkbox.
- **`aria-checked`** — automatically set to `"true"` or `"false"` to reflect the current state, ensuring assistive technologies announce the toggle correctly.
- **`aria-required`** — automatically set to `"true"` when the `required` property is enabled.
- **`aria-describedby`** — when a `description` is provided, it is linked to the input via `aria-describedby` so screen readers announce the helper text.
- **Native `<input>` element** — a real checkbox input is used under the hood, providing built-in keyboard support (Space to toggle) and form participation.
- **Focus indicators** — clearly visible focus rings are applied on keyboard navigation via `focus-visible` styles using the primary support colour.
- **Disabled state** — adds `cursor-not-allowed` and reduced opacity so the toggle is both visually and functionally inert.
- **Clickable label** — when the `label` property is set, the entire label area acts as a click target via a native `<label>` wrapper.
- **Pass-through `aria-*` attributes** — any `aria-*` attribute placed on the host element is forwarded to the native input.

### Developer Responsibilities

1. **Toggles without a `label` must have an `aria-label`.** When a toggle has no visible label text, screen readers cannot determine its purpose. Always provide `aria-label` on the host element.

   ```html
   <aegov-toggle aria-label="Enable dark mode"></aegov-toggle>
   ```

2. **Colour contrast.** All built-in colour combinations meet WCAG 2.1 AA contrast ratios. If you override colours via custom CSS, verify that the new colours maintain at least a **3:1** contrast ratio for the track and thumb.

3. **Do not remove focus styles.** The built-in `focus-visible` outlines are essential for keyboard navigation. Avoid overriding them with `outline: none`.

---

## Notes

- The `aegov-toggle` component renders a native `<input type="checkbox" role="switch">` internally. This ensures full keyboard support and form compatibility without any extra JavaScript.
- The `checked` property is mutable and reflected. It updates automatically when the user interacts with the toggle. You can also set it programmatically to control the state.
- The `description` property only renders when a `label` is also provided. If you need a standalone description, use `aria-describedby` with an external element.
- The thumb intentionally protrudes beyond the track by 3px on each side. This is a deliberate design choice for visual prominence and touch-friendliness.
- Icons in the `icon-checked` and `icon-unchecked` slots transition with a smooth opacity fade (200ms). Only one icon is visible at a time.
- The component generates a unique ID automatically if `field-id` is not set. This ensures the `<label>` and `<input>` are always properly associated.
- Events are emitted even when the toggle is toggled programmatically via the `checked` property, as long as the change goes through the native input's `change` event.
