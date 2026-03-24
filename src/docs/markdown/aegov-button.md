# Button

<p class="text-lg text-aeblack-500 mb-8">A button is a clickable UI component designed to trigger a specific action or event. Essential in web interfaces, buttons guide user interactions from form submissions to navigation.</p>

## Introduction

A button is perhaps the most important and a key component in a design system. It can form the basis of every other component's design. The button defines the ability to communicate an action and is very useful in the ability to accept submissions and guide the user through the website.

The `aegov-button` component provides **4 variants**, **5 appearances**, **5 sizes**, and supports loading, disabled, icon-only, and full-width states out of the box.

```html
<aegov-button>Default Button</aegov-button>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button>Default Button</aegov-button>
</div>

---

## Variants

The `variant` property controls the visual style of the button. There are four variants available.

### Solid

The default variant. A filled button with a solid background colour — best for primary calls-to-action.

```html
<aegov-button variant="solid">Solid Button</aegov-button>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button variant="solid">Solid</aegov-button>
  <aegov-button variant="solid" appearance="secondary">Secondary Solid</aegov-button>
  <aegov-button variant="solid" appearance="danger">Danger Solid</aegov-button>
  <aegov-button variant="solid" appearance="neutralMax">Neutral Max Solid</aegov-button>
  <aegov-button variant="solid" appearance="neutralMin">Neutral Min Solid</aegov-button>
</div>

### Outline

A bordered button with a transparent background — ideal for secondary actions.

```html
<aegov-button variant="outline">Outline Button</aegov-button>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button variant="outline">Outline</aegov-button>
  <aegov-button variant="outline" appearance="secondary">Secondary Outline</aegov-button>
  <aegov-button variant="outline" appearance="danger">Danger Outline</aegov-button>
  <aegov-button variant="outline" appearance="neutralMax">Neutral Max Outline</aegov-button>
  <aegov-button variant="outline" appearance="neutralMin">Neutral Min Outline</aegov-button>
</div>

### Soft

A subtle button with a tinted background — suitable for less prominent actions within a group of buttons.

```html
<aegov-button variant="soft">Soft Button</aegov-button>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button variant="soft">Soft</aegov-button>
  <aegov-button variant="soft" appearance="secondary">Secondary Soft</aegov-button>
  <aegov-button variant="soft" appearance="danger">Danger Soft</aegov-button>
  <aegov-button variant="soft" appearance="neutralMax">Neutral Max Soft</aegov-button>
  <aegov-button variant="soft" appearance="neutralMin">Neutral Min Soft</aegov-button>
</div>

### Link

A button that looks like a text link — use for tertiary actions or inline triggers that need button semantics.

```html
<aegov-button variant="link">Link Button</aegov-button>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button variant="link">Link</aegov-button>
  <aegov-button variant="link" appearance="secondary">Secondary Link</aegov-button>
  <aegov-button variant="link" appearance="danger">Danger Link</aegov-button>
  <aegov-button variant="link" appearance="neutralMax">Neutral Max Link</aegov-button>
  <aegov-button variant="link" appearance="neutralMin">Neutral Min Link</aegov-button>
</div>

---

## Appearances

The `appearance` property controls the colour scheme applied to the button. There are five appearances available, each designed for a specific semantic purpose.

| Appearance     | Purpose                                      |
|----------------|----------------------------------------------|
| `primary`      | Default. Main actions using the brand gold.  |
| `secondary`    | Supporting actions using the camel palette.  |
| `danger`       | Destructive or critical actions (red).       |
| `neutralMax`   | Dark neutral — high-contrast on light pages. |
| `neutralMin`   | Light neutral — low-contrast, subdued.       |

```html
<aegov-button appearance="primary">Primary</aegov-button>
<aegov-button appearance="secondary">Secondary</aegov-button>
<aegov-button appearance="danger">Danger</aegov-button>
<aegov-button appearance="neutralMax">Neutral Max</aegov-button>
<aegov-button appearance="neutralMin">Neutral Min</aegov-button>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button appearance="primary">Primary</aegov-button>
  <aegov-button appearance="secondary">Secondary</aegov-button>
  <aegov-button appearance="danger">Danger</aegov-button>
  <aegov-button appearance="neutralMax">Neutral Max</aegov-button>
  <aegov-button appearance="neutralMin">Neutral Min</aegov-button>
</div>

---

## Sizes

The `size` property controls the height, padding, font size, and icon dimensions of the button.

| Size   | Height | Font Size | Icon Size |
|--------|--------|-----------|-----------|
| `xs`   | 36px   | 14px      | 20px      |
| `sm`   | 40px   | 16px      | 20px      |
| `base` | 44px   | 16px      | 24px      |
| `lg`   | 48px   | 18px      | 28px      |
| `xl`   | 52px   | 18px      | 28px      |

```html
<aegov-button size="xs">Extra Small</aegov-button>
<aegov-button size="sm">Small</aegov-button>
<aegov-button size="base">Base</aegov-button>
<aegov-button size="lg">Large</aegov-button>
<aegov-button size="xl">Extra Large</aegov-button>
```

<div class="flex flex-wrap items-center gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button size="xs">Extra Small</aegov-button>
  <aegov-button size="sm">Small</aegov-button>
  <aegov-button size="base">Base</aegov-button>
  <aegov-button size="lg">Large</aegov-button>
  <aegov-button size="xl">Extra Large</aegov-button>
</div>

---

## States

### Disabled

Set the `disabled` attribute to prevent interaction. The button becomes visually muted and unclickable.

```html
<aegov-button disabled>Disabled</aegov-button>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button disabled>Disabled Solid</aegov-button>
  <aegov-button variant="outline" disabled>Disabled Outline</aegov-button>
  <aegov-button variant="soft" disabled>Disabled Soft</aegov-button>
  <aegov-button variant="link" disabled>Disabled Link</aegov-button>
</div>

### Loading

Set the `loading` attribute to show a spinner and disable interaction. Use this during asynchronous operations such as form submissions or API calls.

```html
<aegov-button loading>Submitting…</aegov-button>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button loading>Loading Solid</aegov-button>
  <aegov-button variant="outline" loading>Loading Outline</aegov-button>
  <aegov-button variant="soft" loading>Loading Soft</aegov-button>
  <aegov-button variant="link" loading>Loading Link</aegov-button>
</div>

---

## Full Width

Set the `full` attribute to make the button span the entire width of its parent container. Useful within forms or card layouts.

```html
<aegov-button full>Full Width Button</aegov-button>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-3 not-aegov">
  <aegov-button full>Full Width Solid</aegov-button>
  <aegov-button variant="outline" full>Full Width Outline</aegov-button>
</div>

---

## Icon Button

Set the `icon` attribute when the button contains only an icon and no text label. This applies equal width and height and removes horizontal padding for a square shape.

```html
<aegov-button icon aria-label="Settings">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" stroke-linecap="round"
       stroke-linejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83
             2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33
             1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09
             A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06
             a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06
             A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3
             a2 2 0 010-4h.09A1.65 1.65 0 004.6 9
             a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83
             2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.6
             a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09
             a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06
             a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06
             a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21
             a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
  </svg>
</aegov-button>
```

<div class="flex flex-wrap items-center gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button icon size="xs" aria-label="Close">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  </aegov-button>
  <aegov-button icon size="sm" aria-label="Close">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  </aegov-button>
  <aegov-button icon size="base" aria-label="Close">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  </aegov-button>
  <aegov-button icon size="lg" aria-label="Close">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  </aegov-button>
  <aegov-button icon size="xl" aria-label="Close">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  </aegov-button>
</div>

> **Important:** Always provide an `aria-label` when using icon-only buttons so that screen readers can announce the button's purpose.

---

## Button with Icon and Text

Icons can be placed before or after the button label by adding an `<svg>` or `<img>` element inside the slot.

```html
<!-- Leading icon -->
<aegov-button>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" stroke-linecap="round"
       stroke-linejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
  Continue
</aegov-button>

<!-- Trailing icon -->
<aegov-button>
  Download
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" stroke-linecap="round"
       stroke-linejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
</aegov-button>
```

<div class="flex flex-wrap items-center gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    Continue
  </aegov-button>
  <aegov-button variant="outline">
    Download
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
  </aegov-button>
</div>

---

## Bold Text

By default, button text is rendered with `font-medium`. Set `bold="false"` to use the normal font weight.

```html
<aegov-button bold="false">Normal Weight</aegov-button>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button>Bold (default)</aegov-button>
  <aegov-button bold="false">Normal Weight</aegov-button>
</div>

---

## Button Type

The `type` property maps to the native HTML `type` attribute. Use `submit` for forms and `reset` to clear form fields.

```html
<aegov-button type="submit">Submit Form</aegov-button>
<aegov-button type="reset" variant="outline">Reset Form</aegov-button>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button type="submit">Submit</aegov-button>
  <aegov-button type="reset" variant="outline">Reset</aegov-button>
  <aegov-button type="button" variant="soft">Button (default)</aegov-button>
</div>

---

## RTL Support

The component fully supports right-to-left layouts. When the document or a parent element has `dir="rtl"`, icons, padding, and grouped border logic automatically mirror.

```html
<div dir="rtl">
  <aegov-button>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round"
         stroke-linejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
    متابعة
  </aegov-button>
  <aegov-button variant="outline">إلغاء</aegov-button>
</div>
```

<div dir="rtl" class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    متابعة
  </aegov-button>
  <aegov-button variant="outline">إلغاء</aegov-button>
  <aegov-button variant="soft" appearance="danger">حذف</aegov-button>
  <aegov-button variant="link">تفاصيل أكثر</aegov-button>
</div>

No additional configuration is needed — the component reads the inherited `dir` attribute and adjusts automatically.

---

## Complete Variant × Appearance Matrix

The table below shows every combination of variant and appearance. This is useful for visual QA and design review.

<div class="overflow-x-auto my-6">
<table class="w-full text-sm border-collapse">
  <thead>
    <tr class="bg-aeblack-50">
      <th class="text-left p-3 border border-aeblack-100 font-semibold">Appearance</th>
      <th class="p-3 border border-aeblack-100 font-semibold">Solid</th>
      <th class="p-3 border border-aeblack-100 font-semibold">Outline</th>
      <th class="p-3 border border-aeblack-100 font-semibold">Soft</th>
      <th class="p-3 border border-aeblack-100 font-semibold">Link</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium">Primary</td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button variant="solid" appearance="primary" size="sm">Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button variant="outline" appearance="primary" size="sm">Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button variant="soft" appearance="primary" size="sm">Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button variant="link" appearance="primary" size="sm">Button</aegov-button></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium">Secondary</td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button variant="solid" appearance="secondary" size="sm">Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button variant="outline" appearance="secondary" size="sm">Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button variant="soft" appearance="secondary" size="sm">Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button variant="link" appearance="secondary" size="sm">Button</aegov-button></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium">Danger</td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button variant="solid" appearance="danger" size="sm">Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button variant="outline" appearance="danger" size="sm">Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button variant="soft" appearance="danger" size="sm">Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button variant="link" appearance="danger" size="sm">Button</aegov-button></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium">Neutral Max</td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button variant="solid" appearance="neutralMax" size="sm">Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button variant="outline" appearance="neutralMax" size="sm">Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button variant="soft" appearance="neutralMax" size="sm">Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button variant="link" appearance="neutralMax" size="sm">Button</aegov-button></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium">Neutral Min</td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button variant="solid" appearance="neutralMin" size="sm">Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button variant="outline" appearance="neutralMin" size="sm">Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button variant="soft" appearance="neutralMin" size="sm">Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button variant="link" appearance="neutralMin" size="sm">Button</aegov-button></td>
    </tr>
  </tbody>
</table>
</div>

---

## Complete Size × Icon Matrix

The table below shows every size with different icon configurations — text only, leading icon, trailing icon, and icon only. All examples use the `primary` appearance.

<div class="overflow-x-auto my-6">
<table class="w-full text-sm border-collapse">
  <thead>
    <tr class="bg-aeblack-50">
      <th class="text-left p-3 border border-aeblack-100 font-semibold">Size</th>
      <th class="p-3 border border-aeblack-100 font-semibold">Text Only</th>
      <th class="p-3 border border-aeblack-100 font-semibold">Leading Icon</th>
      <th class="p-3 border border-aeblack-100 font-semibold">Trailing Icon</th>
      <th class="p-3 border border-aeblack-100 font-semibold">Icon Only</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium">xs</td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button size="xs">Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button size="xs"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button size="xs">Button<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button size="xs" icon aria-label="Next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></aegov-button></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium">sm</td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button size="sm">Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button size="sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button size="sm">Button<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button size="sm" icon aria-label="Next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></aegov-button></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium">base</td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button size="base">Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button size="base"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button size="base">Button<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button size="base" icon aria-label="Next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></aegov-button></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium">lg</td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button size="lg">Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button size="lg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button size="lg">Button<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button size="lg" icon aria-label="Next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></aegov-button></td>
    </tr>
    <tr>
      <td class="p-3 border border-aeblack-100 font-medium">xl</td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button size="xl">Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button size="xl"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>Button</aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button size="xl">Button<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></aegov-button></td>
      <td class="p-3 border border-aeblack-100 text-center not-aegov"><aegov-button size="xl" icon aria-label="Next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></aegov-button></td>
    </tr>
  </tbody>
</table>
</div>

---

## API Reference

### Properties

| Property     | Attribute    | Description                              | Type                                                               | Default     |
|--------------|-------------|------------------------------------------|--------------------------------------------------------------------|-------------|
| `variant`    | `variant`    | The visual style of the button          | `'solid'` \| `'outline'` \| `'soft'` \| `'link'`                  | `'solid'`   |
| `appearance` | `appearance` | The colour scheme                       | `'primary'` \| `'secondary'` \| `'danger'` \| `'neutralMin'` \| `'neutralMax'` | `'primary'` |
| `size`       | `size`       | The button size                         | `'xs'` \| `'sm'` \| `'base'` \| `'lg'` \| `'xl'`                 | `'base'`    |
| `type`       | `type`       | The native HTML button type             | `'button'` \| `'submit'` \| `'reset'`                             | `'button'`  |
| `disabled`   | `disabled`   | Prevents interaction                    | `boolean`                                                          | `false`     |
| `loading`    | `loading`    | Shows a spinner and disables the button | `boolean`                                                          | `false`     |
| `icon`       | `icon`       | Applies square icon-only dimensions     | `boolean`                                                          | `false`     |
| `full`       | `full`       | Makes the button full-width             | `boolean`                                                          | `false`     |
| `bold`       | `bold`       | Applies medium font weight              | `boolean`                                                          | `true`      |

### Events

| Event               | Description                           | Detail Type  |
|---------------------|---------------------------------------|-------------|
| `aegovButtonClick`  | Emitted when the button is clicked    | `MouseEvent` |
| `aegovButtonFocus`  | Emitted when the button gains focus   | `FocusEvent` |
| `aegovButtonBlur`   | Emitted when the button loses focus   | `FocusEvent` |

Events are not emitted when the button is `disabled` or `loading`.

#### Listening to Events

```html
<aegov-button id="my-btn">Click Me</aegov-button>

<script>
  document.getElementById('my-btn')
    .addEventListener('aegovButtonClick', (e) => {
      console.log('Button clicked', e.detail);
    });
</script>
```

### Slots

| Slot      | Description                                                          |
|-----------|----------------------------------------------------------------------|
| (default) | The button content — text, icons, or a combination of both.         |

### Shadow Parts

| Part     | Description                                        |
|----------|----------------------------------------------------|
| `button` | The inner native `<button>` element for custom CSS. |

```css
aegov-button::part(button) {
  text-transform: uppercase;
}
```

### Pass-Through Attributes

The component forwards all `aria-*` and `data-*` attributes from the host element to the inner `<button>`. This allows you to pass additional accessibility or tracking attributes without extra configuration.

```html
<aegov-button aria-label="Submit form" data-analytics="cta-submit">
  Submit
</aegov-button>
```

---

## Accessibility

The `aegov-button` component is built with accessibility as a first-class concern. The following features are included out of the box.

### Built-in Features

- **Native `<button>` element** — renders a semantic HTML button inside the component, which is keyboard-focusable and announced correctly by screen readers by default.
- **`aria-disabled`** — automatically set to `"true"` when the button is `disabled` or `loading`.
- **`aria-busy`** — automatically set to `"true"` when the button is in a `loading` state, informing assistive technologies that the button is processing.
- **Focus indicators** — clearly visible focus rings are applied on keyboard navigation via `focus-visible` styles. Each appearance has its own focus colour to maintain sufficient contrast.
- **Disabled state** — adds `pointer-events: none` and `cursor-not-allowed` so the button is both visually and functionally inert.
- **Pass-through `aria-*` attributes** — any `aria-*` attribute placed on the host element is automatically forwarded to the inner native button.

### Developer Responsibilities

The following items require action from the developer implementing the component:

1. **Icon-only buttons must have an `aria-label`.** When a button has no visible text, screen readers cannot determine its purpose. Always provide `aria-label` on the host element.

   ```html
   <aegov-button icon aria-label="Delete item">
     <svg>…</svg>
   </aegov-button>
   ```

2. **Loading buttons should include context.** If the button label changes during loading (e.g. from "Submit" to "Submitting…"), the text alone communicates the state. If the label does not change, consider adding `aria-label` to describe the pending action.

3. **Colour contrast.** All built-in colour combinations meet WCAG 2.1 AA contrast ratios. If you override colours using `::part(button)`, verify that the new colours maintain at least a **4.5:1** contrast ratio for text.

4. **Do not remove focus styles.** The built-in `focus-visible` outlines are essential for keyboard navigation. Avoid overriding them with `outline: none`.

---

## Notes

- The `aegov-button` component renders a native `<button>` element internally. Do **not** wrap it inside another `<button>` — this creates invalid HTML and breaks accessibility.
- The `loading` property disables the button and shows a spinner. You do **not** need to also set `disabled` when using `loading`.
- The `full` property changes the host element's display from `inline-block` to `block` so the button can stretch to the full width of its container.
- SVG and image icons placed inside the slot are automatically sized to match the current button size. You do not need to set width or height on them.
- The `bold` property defaults to `true`. Set it explicitly to `false` only if your design requires a lighter font weight.
- The component supports pass-through of `data-*` attributes, which makes it compatible with analytics libraries that rely on data attributes for event tracking.
- When using buttons inside a form, set `type="submit"` for the primary action and `type="reset"` if you need a form-reset button. The default type is `"button"`, which does **not** trigger form submission.
