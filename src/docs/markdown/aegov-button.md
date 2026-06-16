# Button

<p class="text-lg text-aeblack-500 mb-8">A Button is the primary call-to-action element of any UAE Government service — submit an application, confirm a payment, cancel a request, or move to the next step. The <code>aegov-button</code> component renders a real native <code>&lt;button&gt;</code> internally and exposes a rich set of properties for variant, appearance, size, icon, loading, disabled, and grouping behaviour, so a single component covers every action style in the design system.</p>

## Introduction

The `aegov-button` component composes a single native `<button>` element with full keyboard, focus, and screen-reader support. Its visual style is driven by three orthogonal properties: `variant` (the colour family — primary, secondary, danger, neutral), `appearance` (the visual treatment — solid, outline, soft, link), and `size` (`xs` through `xl`). Additional state props handle loading, disabled, full-width, icon-only, and group positioning.

```html
<aegov-button>Submit application</aegov-button>
<aegov-button variant="secondary" appearance="outline">Save as draft</aegov-button>
<aegov-button variant="danger" appearance="soft">Cancel request</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-wrap gap-3">
  <aegov-button>Submit application</aegov-button>
  <aegov-button variant="secondary" appearance="outline">Save as draft</aegov-button>
  <aegov-button variant="danger" appearance="soft">Cancel request</aegov-button>
</div>

---

## Variants

The `variant` property selects the colour family. Use `primary` for the main positive action on a screen, `secondary` for supporting actions, `danger` for destructive actions, and the two neutral variants when the button needs to recede on a dense interface.

| Variant       | Typical use                                                                              |
| ------------- | ---------------------------------------------------------------------------------------- |
| `primary`     | The single most important action on the screen (Submit, Pay, Continue).                  |
| `secondary`   | Supporting actions on the same screen (Save draft, Add another).                         |
| `danger`      | Irreversible or destructive actions (Delete, Cancel application).                        |
| `neutral-min`  | Low-emphasis utility action that should fade into the background.                        |
| `neutral-max`  | Low-emphasis action with slightly stronger visual weight than `neutral-min`.              |

```html
<aegov-button variant="primary">Primary</aegov-button>
<aegov-button variant="secondary">Secondary</aegov-button>
<aegov-button variant="danger">Danger</aegov-button>
<aegov-button variant="neutral-min">Neutral min</aegov-button>
<aegov-button variant="neutral-max">Neutral max</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-wrap gap-3">
  <aegov-button variant="primary">Primary</aegov-button>
  <aegov-button variant="secondary">Secondary</aegov-button>
  <aegov-button variant="danger">Danger</aegov-button>
  <aegov-button variant="neutral-min">Neutral min</aegov-button>
  <aegov-button variant="neutral-max">Neutral max</aegov-button>
</div>

---

## Appearances

The `appearance` property selects the visual treatment that wraps the variant colour. Each variant works with every appearance — pair the variant with the appearance that matches the button's emphasis on the page.

| Appearance | Treatment                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------ |
| `solid`    | Filled background, white text. Highest emphasis. Use for the primary action only.           |
| `outline`  | Transparent background with a 2px border in the variant colour. Strong but not dominant.    |
| `soft`     | Light tinted background with the variant colour text. Friendly and lower-emphasis.          |
| `link`     | Text-only with an underline on hover. Use when the button must look like inline text.       |

```html
<aegov-button appearance="solid">Solid</aegov-button>
<aegov-button appearance="outline">Outline</aegov-button>
<aegov-button appearance="soft">Soft</aegov-button>
<aegov-button appearance="link">Link</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-wrap gap-3 items-center">
  <aegov-button appearance="solid">Solid</aegov-button>
  <aegov-button appearance="outline">Outline</aegov-button>
  <aegov-button appearance="soft">Soft</aegov-button>
  <aegov-button appearance="link">Link</aegov-button>
</div>

### Variant + appearance matrix

Every combination of `variant` (5) × `appearance` (4) produces a distinct visual style. Use this matrix to pick the right button for each context — rows fix the semantic intent (variant), columns fix the visual weight (appearance).

```html
<aegov-button variant="primary" appearance="solid">Save</aegov-button>
<aegov-button variant="danger"  appearance="outline">Delete</aegov-button>
<aegov-button variant="neutral-max" appearance="link">Learn more</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov overflow-x-auto">
  <div class="grid gap-3 items-center" style="grid-template-columns: 9rem repeat(4, minmax(8rem, 1fr));">
    <div class="text-xs font-bold uppercase tracking-wide text-aeblack-500"></div>
    <div class="text-xs font-bold uppercase tracking-wide text-aeblack-500">solid</div>
    <div class="text-xs font-bold uppercase tracking-wide text-aeblack-500">outline</div>
    <div class="text-xs font-bold uppercase tracking-wide text-aeblack-500">soft</div>
    <div class="text-xs font-bold uppercase tracking-wide text-aeblack-500">link</div>
    <div class="text-xs font-bold uppercase tracking-wide text-aeblack-500">primary</div>
    <aegov-button variant="primary" appearance="solid">Action</aegov-button>
    <aegov-button variant="primary" appearance="outline">Action</aegov-button>
    <aegov-button variant="primary" appearance="soft">Action</aegov-button>
    <aegov-button variant="primary" appearance="link">Action</aegov-button>
    <div class="text-xs font-bold uppercase tracking-wide text-aeblack-500">secondary</div>
    <aegov-button variant="secondary" appearance="solid">Action</aegov-button>
    <aegov-button variant="secondary" appearance="outline">Action</aegov-button>
    <aegov-button variant="secondary" appearance="soft">Action</aegov-button>
    <aegov-button variant="secondary" appearance="link">Action</aegov-button>
    <div class="text-xs font-bold uppercase tracking-wide text-aeblack-500">danger</div>
    <aegov-button variant="danger" appearance="solid">Action</aegov-button>
    <aegov-button variant="danger" appearance="outline">Action</aegov-button>
    <aegov-button variant="danger" appearance="soft">Action</aegov-button>
    <aegov-button variant="danger" appearance="link">Action</aegov-button>
    <div class="text-xs font-bold uppercase tracking-wide text-aeblack-500">neutral-min</div>
    <aegov-button variant="neutral-min" appearance="solid">Action</aegov-button>
    <aegov-button variant="neutral-min" appearance="outline">Action</aegov-button>
    <aegov-button variant="neutral-min" appearance="soft">Action</aegov-button>
    <aegov-button variant="neutral-min" appearance="link">Action</aegov-button>
    <div class="text-xs font-bold uppercase tracking-wide text-aeblack-500">neutral-max</div>
    <aegov-button variant="neutral-max" appearance="solid">Action</aegov-button>
    <aegov-button variant="neutral-max" appearance="outline">Action</aegov-button>
    <aegov-button variant="neutral-max" appearance="soft">Action</aegov-button>
    <aegov-button variant="neutral-max" appearance="link">Action</aegov-button>
  </div>
</div>

---

## Sizes

The `size` property accepts `xs`, `sm`, `base` (default), `lg`, and `xl`. It also accepts a Tailwind-style responsive string with the breakpoint prefixes `xs`, `sm`, `md`, `lg`, `xl`, and `2xl`.

| Token   | Height            | Typical use                                                       |
| ------- | ----------------- | ----------------------------------------------------------------- |
| `xs`    | 36 px (`h-9`)     | Compact toolbars, table-row inline actions.                       |
| `sm`    | 40 px (`h-10`)    | Dense forms; matches `aegov-input size="sm"`.                     |
| `base`  | 44 px (`h-11`)    | Default for most page-level actions.                              |
| `lg`    | 48 px (`h-12`)    | Hero sections; matches `aegov-input size="base"`.                 |
| `xl`    | 52 px (`h-13`)    | Marketing landing pages; pairs with `aegov-input size="lg"`.      |

```html
<aegov-button size="xs">XS</aegov-button>
<aegov-button size="sm">SM</aegov-button>
<aegov-button size="base">Base</aegov-button>
<aegov-button size="lg">LG</aegov-button>
<aegov-button size="xl">XL</aegov-button>

<!-- Responsive: small on phones, base from md, large from xl -->
<aegov-button size="sm md:base xl:lg">Resize me</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-wrap gap-3 items-center">
  <aegov-button size="xs">XS</aegov-button>
  <aegov-button size="sm">SM</aegov-button>
  <aegov-button size="base">Base</aegov-button>
  <aegov-button size="lg">LG</aegov-button>
  <aegov-button size="xl">XL</aegov-button>
</div>

### Responsive sizes

```html
<aegov-button size="sm md:base xl:lg">Sized to viewport</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button size="sm md:base xl:lg">Resize the viewport to see the size adapt</aegov-button>
</div>

---

## Buttons with Icons

The default slot accepts any inline content, including SVG icons. Place an icon before the label for a "leading" icon, after the label for a "trailing" icon, or use `is-icon` to render a square icon-only button.

### Leading icon

```html
<aegov-button>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  Contact support
</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    Contact support
  </aegov-button>
</div>

### Trailing icon

```html
<aegov-button appearance="outline">
  Continue
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button appearance="outline">
    Continue
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  </aegov-button>
</div>

### Icon-only

Set `is-icon="true"` to render a square button. Always supply an `aria-label` so screen readers announce the button's purpose.

```html
<aegov-button is-icon="true" aria-label="Open settings" appearance="outline">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex gap-3">
  <aegov-button is-icon="true" aria-label="Open settings" appearance="outline">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
  </aegov-button>
  <aegov-button is-icon="true" aria-label="Download receipt" variant="secondary" appearance="soft">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
  </aegov-button>
  <aegov-button is-icon="true" aria-label="Delete request" variant="danger" appearance="outline">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>
  </aegov-button>
</div>

---

## Loading State

Set `is-loading="true"` to show a spinner, disable the button, and set `aria-busy="true"`. Use this during asynchronous operations such as form submission or payment processing. The button remains in place — its width does not change — so the surrounding layout stays stable.

```html
<aegov-button is-loading="true">Submitting…</aegov-button>
<aegov-button is-loading="true" appearance="outline">Saving draft…</aegov-button>
<aegov-button is-loading="true" variant="danger">Cancelling…</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-wrap gap-3">
  <aegov-button is-loading="true">Submitting…</aegov-button>
  <aegov-button is-loading="true" appearance="outline">Saving draft…</aegov-button>
  <aegov-button is-loading="true" variant="danger">Cancelling…</aegov-button>
</div>

---

## Disabled State

Set `is-disabled="true"` to prevent interaction. The native `disabled` attribute is applied, `aria-disabled="true"` is set, and click events are suppressed. Use this when the action is contextually unavailable — for example, a "Pay now" button with no items in the cart.

```html
<aegov-button is-disabled="true">Continue</aegov-button>
<aegov-button is-disabled="true" appearance="outline">Cancel</aegov-button>
<aegov-button is-disabled="true" variant="danger" appearance="soft">Delete</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-wrap gap-3">
  <aegov-button is-disabled="true">Continue</aegov-button>
  <aegov-button is-disabled="true" appearance="outline">Cancel</aegov-button>
  <aegov-button is-disabled="true" variant="danger" appearance="soft">Delete</aegov-button>
</div>

---

## Full Width

Set `is-full="true"` to stretch the button to the full width of its container. This is the recommended layout for primary actions in mobile forms, modals, and authentication flows.

```html
<aegov-button is-full="true">Sign in to UAE Pass</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov max-w-sm">
  <aegov-button is-full="true">Sign in to UAE Pass</aegov-button>
  <div class="mt-3">
    <aegov-button is-full="true" appearance="outline">Create new account</aegov-button>
  </div>
</div>

---

## Bold vs Regular Weight

Buttons are bold (semibold) by default. Set `is-bold="false"` for normal-weight text — useful when the button must blend into surrounding text, particularly with the `link` appearance.

```html
<aegov-button is-bold="false" appearance="link">Read the privacy policy</aegov-button>
<aegov-button is-bold="true" appearance="link">Read the privacy policy</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-wrap gap-4 items-center">
  <aegov-button is-bold="false" appearance="link">Regular weight</aegov-button>
  <aegov-button is-bold="true" appearance="link">Bold weight (default)</aegov-button>
</div>

---

## Form Submission

Set `type="submit"` to submit the parent form, or `type="reset"` to reset it. The default is `type="button"` so the button never submits a form unintentionally.

```html
<form>
  <input type="email" name="email" placeholder="Email address" />
  <aegov-button type="submit">Submit</aegov-button>
  <aegov-button type="reset" appearance="outline">Reset</aegov-button>
</form>
```

---

## Practical Example: Multi-Step Service Workflow

A typical UAE Government service journey ends with a confirmation screen — the user reviews their details, then confirms or goes back to edit. Combine `variant`, `appearance`, and a leading icon to give the primary action clear visual emphasis.

```html
<div class="rounded-lg border border-aeblack-200 p-6 bg-whitely-50">
  <h3 class="text-xl font-semibold mb-2">Confirm your application</h3>
  <p class="text-aeblack-500 mb-6">
    Service: Driving licence renewal · Fee: AED 300 · Channel: Card
  </p>
  <div class="flex flex-wrap gap-3">
    <aegov-button variant="primary">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      Confirm and pay
    </aegov-button>
    <aegov-button variant="secondary" appearance="outline">Edit details</aegov-button>
    <aegov-button variant="danger" appearance="link">Cancel application</aegov-button>
  </div>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="rounded-lg border border-aeblack-200 p-6 bg-whitely-50">
    <h3 class="text-xl font-semibold mb-2">Confirm your application</h3>
    <p class="text-aeblack-500 mb-6">
      Service: Driving licence renewal · Fee: AED 300 · Channel: Card
    </p>
    <div class="flex flex-wrap gap-3">
      <aegov-button variant="primary">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Confirm and pay
      </aegov-button>
      <aegov-button variant="secondary" appearance="outline">Edit details</aegov-button>
      <aegov-button variant="danger" appearance="link">Cancel application</aegov-button>
    </div>
  </div>
</div>

---

## Sub-component: aegov-button-group

The `aegov-button-group` component visually joins two or more `aegov-button` children edge-to-edge by collapsing internal borders and adjusting corner radii. It supports horizontal (default) and vertical orientations, and works with every variant, appearance, and size. The group automatically writes a `groupPosition` (`first` / `middle` / `last` / `single`) and `groupOrientation` (`horizontal` / `vertical`) onto each direct child button so the correct border and radius styles are applied.

### Basic group

```html
<aegov-button-group>
  <aegov-button>Day</aegov-button>
  <aegov-button>Week</aegov-button>
  <aegov-button>Month</aegov-button>
</aegov-button-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button-group>
    <aegov-button>Day</aegov-button>
    <aegov-button>Week</aegov-button>
    <aegov-button>Month</aegov-button>
  </aegov-button-group>
</div>

### Vertical orientation

```html
<aegov-button-group orientation="vertical">
  <aegov-button appearance="soft">Edit details</aegov-button>
  <aegov-button appearance="soft">Duplicate request</aegov-button>
  <aegov-button appearance="soft" variant="danger">Delete request</aegov-button>
</aegov-button-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button-group orientation="vertical">
    <aegov-button appearance="soft">Edit details</aegov-button>
    <aegov-button appearance="soft">Duplicate request</aegov-button>
    <aegov-button appearance="soft" variant="danger">Delete request</aegov-button>
  </aegov-button-group>
</div>

### Group of icon buttons (toolbar)

Combine `is-icon` with a button group to create a compact toolbar. Always provide an `aria-label` on each icon-only button so screen readers can announce its purpose, and an `aria-label` on the group to describe the toolbar.

```html
<aegov-button-group aria-label="Text formatting">
  <aegov-button is-icon="true" appearance="outline" aria-label="Bold">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>
  </aegov-button>
  <aegov-button is-icon="true" appearance="outline" aria-label="Italic">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>
  </aegov-button>
  <aegov-button is-icon="true" appearance="outline" aria-label="Underline">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>
  </aegov-button>
</aegov-button-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button-group aria-label="Text formatting">
    <aegov-button is-icon="true" appearance="outline" aria-label="Bold">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>
    </aegov-button>
    <aegov-button is-icon="true" appearance="outline" aria-label="Italic">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>
    </aegov-button>
    <aegov-button is-icon="true" appearance="outline" aria-label="Underline">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>
    </aegov-button>
  </aegov-button-group>
</div>

### Mixed appearances within a group

You can mix variants and appearances inside a group to create visual hierarchy — for example, a primary "Publish" button next to an outline "Save draft" button.

```html
<aegov-button-group>
  <aegov-button appearance="outline">Save draft</aegov-button>
  <aegov-button appearance="solid">Publish</aegov-button>
</aegov-button-group>

<aegov-button-group>
  <aegov-button appearance="outline">Cancel</aegov-button>
  <aegov-button appearance="solid" variant="danger">Delete request</aegov-button>
</aegov-button-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-wrap gap-4">
  <aegov-button-group>
    <aegov-button appearance="outline">Save draft</aegov-button>
    <aegov-button appearance="solid">Publish</aegov-button>
  </aegov-button-group>
  <aegov-button-group>
    <aegov-button appearance="outline">Cancel</aegov-button>
    <aegov-button appearance="solid" variant="danger">Delete request</aegov-button>
  </aegov-button-group>
</div>

---

## Listening for Events

The button emits three events. The most common is `aegovButtonClick`, which fires on every click except when the button is disabled or loading. `aegovButtonFocus` and `aegovButtonBlur` fire when the inner `<button>` gains or loses focus.

```html
<aegov-button id="cta">Submit application</aegov-button>

<script>
  const cta = document.getElementById('cta');
  cta.addEventListener('aegovButtonClick', () => {
    console.log('User clicked Submit');
  });
  cta.addEventListener('aegovButtonFocus', () => {
    console.log('Button focused');
  });
  cta.addEventListener('aegovButtonBlur', () => {
    console.log('Button blurred');
  });
</script>
```

---

## RTL Support

The button is direction-agnostic. When the document or any ancestor has `dir="rtl"`, leading and trailing icons swap visually, gap and padding flip via CSS logical properties, and grouped border radii mirror correctly. Provide Arabic labels and the layout adapts.

```html
<div dir="rtl">
  <aegov-button>تأكيد الطلب</aegov-button>
  <aegov-button variant="secondary" appearance="outline">حفظ كمسودة</aegov-button>
  <aegov-button variant="danger" appearance="soft">إلغاء الطلب</aegov-button>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-wrap gap-3">
  <aegov-button>تأكيد الطلب</aegov-button>
  <aegov-button variant="secondary" appearance="outline">حفظ كمسودة</aegov-button>
  <aegov-button variant="danger" appearance="soft">إلغاء الطلب</aegov-button>
</div>

A button group in RTL — the first button retains its start radii on the right, and the last button retains its end radii on the left:

```html
<div dir="rtl">
  <aegov-button-group>
    <aegov-button>اليوم</aegov-button>
    <aegov-button>الأسبوع</aegov-button>
    <aegov-button>الشهر</aegov-button>
  </aegov-button-group>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button-group>
    <aegov-button>اليوم</aegov-button>
    <aegov-button>الأسبوع</aegov-button>
    <aegov-button>الشهر</aegov-button>
  </aegov-button-group>
</div>

---

## API Reference

### aegov-button Properties

| Property            | Attribute            | Description                                                                                              | Type                                                                       | Default     |
| ------------------- | -------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------- |
| `fieldId`           | `field-id`           | DOM `id` for the inner `<button>` element. Auto-generated as `aegov-button-{n}` if omitted.               | `string`                                                                   | _generated_ |
| `variant`           | `variant`            | Colour family.                                                                                           | `'primary' \| 'secondary' \| 'danger' \| 'neutral-min' \| 'neutral-max'`     | `'primary'` |
| `appearance`        | `appearance`         | Visual treatment.                                                                                        | `'solid' \| 'outline' \| 'soft' \| 'link'`                                 | `'solid'`   |
| `size`              | `size`               | Size token. Accepts a single token or a Tailwind-style responsive string.                                | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl'`                                   | `'base'`    |
| `type`              | `type`               | Native `type` attribute on the inner `<button>`.                                                         | `'button' \| 'submit' \| 'reset'`                                          | `'button'`  |
| `isDisabled`        | `is-disabled`        | Disables interaction. Sets `disabled` and `aria-disabled="true"`.                                        | `boolean`                                                                  | `false`     |
| `isLoading`         | `is-loading`         | Shows a spinner, disables the button, and sets `aria-busy="true"`.                                       | `boolean`                                                                  | `false`     |
| `isIcon`            | `is-icon`            | Renders the button as a square icon-only button. Always pair with `aria-label`.                          | `boolean`                                                                  | `false`     |
| `isFull`            | `is-full`            | Stretches the button to the full width of its container.                                                 | `boolean`                                                                  | `false`     |
| `isBold`            | `is-bold`            | Bold (semibold) text. Set to `false` for normal weight.                                                  | `boolean`                                                                  | `true`      |
| `groupPosition`     | `group-position`     | _Set by `aegov-button-group`._ The button's position within the group.                                    | `'first' \| 'middle' \| 'last' \| 'single'`                                | `undefined` |
| `groupOrientation`  | `group-orientation`  | _Set by `aegov-button-group`._ The orientation of the surrounding group.                                  | `'horizontal' \| 'vertical'`                                               | `undefined` |

> Properties marked _Set by `aegov-button-group`_ are written automatically by the parent group. Setting them on a button directly will be overridden on the next sync.

### aegov-button-group Properties

| Property      | Attribute     | Description                       | Type                              | Default        |
| ------------- | ------------- | --------------------------------- | --------------------------------- | -------------- |
| `orientation` | `orientation` | Layout direction of the group.     | `'horizontal' \| 'vertical'`      | `'horizontal'` |

### Slots

| Component             | Slot        | Description                                                                                  |
| --------------------- | ----------- | -------------------------------------------------------------------------------------------- |
| `aegov-button`        | _(default)_ | Button content — text, an inline icon, or a combination.                                     |
| `aegov-button-group`  | _(default)_ | Two or more direct `aegov-button` children. Non-button children produce a console warning.   |

### Shadow Parts

| Component       | Part     | Description                                  |
| --------------- | -------- | -------------------------------------------- |
| `aegov-button`  | `button` | The inner native `<button>` element.         |

```css
/* Customise the inner button — for example uppercase its text */
aegov-button::part(button) {
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
```

### Events

| Event              | Component       | Detail        | Description                                                                                  |
| ------------------ | --------------- | ------------- | -------------------------------------------------------------------------------------------- |
| `aegovButtonClick` | `aegov-button`  | `MouseEvent`  | Fired when the button is clicked. Suppressed when the button is disabled or loading.         |
| `aegovButtonFocus` | `aegov-button`  | `FocusEvent`  | Fired when the inner button receives focus.                                                  |
| `aegovButtonBlur`  | `aegov-button`  | `FocusEvent`  | Fired when the inner button loses focus.                                                     |

`aegov-button-group` emits no events of its own.

#### Listening for click events

```html
<aegov-button id="confirm" variant="primary">Confirm</aegov-button>

<script>
  document.querySelector('#confirm').addEventListener('aegovButtonClick', (e) => {
    console.log('Confirmed at', new Date().toISOString());
  });
</script>
```

### Pass-through Attributes

| Attribute group  | Forwarded to       | Notes                                                                                              |
| ---------------- | ------------------ | -------------------------------------------------------------------------------------------------- |
| `aria-*`         | inner `<button>`   | Use `aria-label` on icon-only buttons; use `aria-describedby` to link to additional descriptions.   |
| `data-*`         | inner `<button>`   | Useful for analytics hooks.                                                                        |
| `class`, `style` | host element       | Applied to the host `<aegov-button>` element directly.                                             |
| `id`             | n/a                | Use `field-id` to set the inner `<button>` id; the host `id` is reflected from `field-id`.          |

`aegov-button-group` does not forward attributes — set `aria-*` and `data-*` directly on the host. The wrapping `<div>` always carries `role="group"`.

---

## Accessibility

### Built-in behaviour

- Renders a real `<button>` element inside, so it is focusable, keyboard-activatable, and exposed correctly to assistive technologies by default.
- Sets `aria-disabled` to match the disabled or loading state.
- Sets `aria-busy="true"` while loading so screen readers announce the in-progress state.
- Visible `focus-visible` outline tuned per appearance — solid and soft buttons get an offset outline, outline buttons get an inset outline.
- All `aria-*` attributes set on the host are forwarded to the inner button.
- The button-group wrapper has `role="group"` so assistive tech announces the buttons as a related set.

### Developer responsibilities

- Provide an `aria-label` on every icon-only button (`is-icon="true"`).
- For loading buttons whose visible label does not change ("Save" → "Save"), update the label to describe what is happening (`Saving…`) or supply an `aria-label`.
- Verify colour contrast if you override colours via `::part(button)` or custom CSS.
- Do not wrap `aegov-button` inside another `<button>` — nesting interactive elements is invalid HTML.
- For `aegov-button-group`, supply an `aria-label` describing the group's purpose when it is not obvious from the labels alone (e.g. `aria-label="View range"` for a Day/Week/Month toolbar).
- Use a real anchor (`<a>`) for navigation. The `link` appearance still renders a `<button>` and emits click events — it does not navigate on its own.
- Inside a button group, every direct child must be an `aegov-button`. Other elements produce a console warning and are not styled as part of the group.

### Keyboard support

| Key             | Action                                                              |
| --------------- | ------------------------------------------------------------------- |
| `Tab`           | Move focus to the button (or to the next button in a group).        |
| `Shift + Tab`   | Move focus to the previous focusable element.                       |
| `Enter`         | Activate the focused button.                                        |
| `Space`         | Activate the focused button.                                        |

### Notes

- The loading state already disables interaction — you do not also need to set `is-disabled`.
- Icons placed inside the slot inherit the current text size automatically.
- Nesting an `aegov-button-group` inside another `aegov-button-group` produces invalid structure and is not supported.
- For consistent visuals inside a group, use the same `size` on every child button. Mixed sizes are technically allowed but produce uneven results.
