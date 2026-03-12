# Timeline

<p class="text-lg text-aeblack-500 mb-8">A timeline displays a sequence of steps or events in a linear progression. It supports horizontal and vertical orientations, numbered or compact dot indicators, and three step statuses to communicate progress.</p>

## Introduction

The `aegov-timeline` component is a parent-child pair: `<aegov-timeline>` wraps one or more `<aegov-timeline-step>` elements. The parent controls layout orientation, visual variant, and indicator size, while each step manages its own status and label content.

The component provides **2 variants** (default numbered circles and compact dots), **2 orientations** (horizontal and vertical), **3 sizes**, and **3 step statuses** out of the box.

```html
<aegov-timeline>
  <aegov-timeline-step status="completed">Account Created</aegov-timeline-step>
  <aegov-timeline-step status="active">Verification</aegov-timeline-step>
  <aegov-timeline-step status="pending">Approval</aegov-timeline-step>
</aegov-timeline>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 w-full not-aegov">
  <aegov-timeline>
    <aegov-timeline-step status="completed">Created</aegov-timeline-step>
    <aegov-timeline-step status="active">Verified</aegov-timeline-step>
    <aegov-timeline-step status="pending">Approval</aegov-timeline-step>
  </aegov-timeline>
</div>

---

## Orientation

The `orientation` property controls the layout direction of the timeline. There are two options.

### Horizontal

The default orientation. Steps are arranged in a row with connectors between them. Labels appear below the indicators. On screens narrower than 640px, labels are visually hidden but remain accessible to screen readers.

```html
<aegov-timeline orientation="horizontal">
  <aegov-timeline-step status="completed">Step 1</aegov-timeline-step>
  <aegov-timeline-step status="active">Step 2</aegov-timeline-step>
  <aegov-timeline-step status="pending">Step 3</aegov-timeline-step>
  <aegov-timeline-step status="pending">Step 4</aegov-timeline-step>
</aegov-timeline>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-timeline orientation="horizontal">
    <aegov-timeline-step status="completed">Step 1</aegov-timeline-step>
    <aegov-timeline-step status="active">Step 2</aegov-timeline-step>
    <aegov-timeline-step status="pending">Step 3</aegov-timeline-step>
    <aegov-timeline-step status="pending">Step 4</aegov-timeline-step>
  </aegov-timeline>
</div>

### Vertical

Steps are stacked top-to-bottom with connectors running vertically between indicators. Labels appear to the right of each indicator.

```html
<aegov-timeline orientation="vertical">
  <aegov-timeline-step status="completed">Account Created</aegov-timeline-step>
  <aegov-timeline-step status="completed">Email Verified</aegov-timeline-step>
  <aegov-timeline-step status="active">Document Upload</aegov-timeline-step>
  <aegov-timeline-step status="pending">Review</aegov-timeline-step>
  <aegov-timeline-step status="pending">Approval</aegov-timeline-step>
</aegov-timeline>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-timeline orientation="vertical">
    <aegov-timeline-step status="completed">Account Created</aegov-timeline-step>
    <aegov-timeline-step status="completed">Email Verified</aegov-timeline-step>
    <aegov-timeline-step status="active">Document Upload</aegov-timeline-step>
    <aegov-timeline-step status="pending">Review</aegov-timeline-step>
    <aegov-timeline-step status="pending">Approval</aegov-timeline-step>
  </aegov-timeline>
</div>

---

## Variants

The `variant` property on the parent controls the visual style of step indicators.

### Default

The default variant displays numbered circles for each step. Completed steps show a checkmark icon instead of a number.

```html
<aegov-timeline variant="default">
  <aegov-timeline-step status="completed">Details</aegov-timeline-step>
  <aegov-timeline-step status="active">Payment</aegov-timeline-step>
  <aegov-timeline-step status="pending">Confirmation</aegov-timeline-step>
</aegov-timeline>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-timeline variant="default">
    <aegov-timeline-step status="completed">Details</aegov-timeline-step>
    <aegov-timeline-step status="active">Payment</aegov-timeline-step>
    <aegov-timeline-step status="pending">Confirmation</aegov-timeline-step>
  </aegov-timeline>
</div>

### Compact

The compact variant replaces numbered circles with small dots. In horizontal mode, labels are hidden (screen-reader only) to keep the layout minimal. In vertical mode, labels remain visible.

```html
<aegov-timeline variant="compact">
  <aegov-timeline-step status="completed">Step 1</aegov-timeline-step>
  <aegov-timeline-step status="completed">Step 2</aegov-timeline-step>
  <aegov-timeline-step status="active">Step 3</aegov-timeline-step>
  <aegov-timeline-step status="pending">Step 4</aegov-timeline-step>
  <aegov-timeline-step status="pending">Step 5</aegov-timeline-step>
</aegov-timeline>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-timeline variant="compact">
    <aegov-timeline-step status="completed">Step 1</aegov-timeline-step>
    <aegov-timeline-step status="completed">Step 2</aegov-timeline-step>
    <aegov-timeline-step status="active">Step 3</aegov-timeline-step>
    <aegov-timeline-step status="pending">Step 4</aegov-timeline-step>
    <aegov-timeline-step status="pending">Step 5</aegov-timeline-step>
  </aegov-timeline>
</div>

Compact variant in vertical orientation (labels are visible):

```html
<aegov-timeline variant="compact" orientation="vertical">
  <aegov-timeline-step status="completed">Registration</aegov-timeline-step>
  <aegov-timeline-step status="active">Processing</aegov-timeline-step>
  <aegov-timeline-step status="pending">Complete</aegov-timeline-step>
</aegov-timeline>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-timeline variant="compact" orientation="vertical">
    <aegov-timeline-step status="completed">Registration</aegov-timeline-step>
    <aegov-timeline-step status="active">Processing</aegov-timeline-step>
    <aegov-timeline-step status="pending">Complete</aegov-timeline-step>
  </aegov-timeline>
</div>

---

## Step Status

Each `<aegov-timeline-step>` has a `status` property that controls its visual state and the connector style.

| Status      | Indicator                              | Connector After           |
|-------------|----------------------------------------|---------------------------|
| `completed` | Filled primary circle with checkmark   | Solid primary line        |
| `active`    | White circle with primary border       | Dashed grey line          |
| `pending`   | Grey circle with grey number           | Dashed grey line          |

Connectors between steps reflect the status of the preceding step: a solid line follows a completed step, and a dashed line follows an active or pending step.

```html
<aegov-timeline>
  <aegov-timeline-step status="completed">Submitted</aegov-timeline-step>
  <aegov-timeline-step status="completed">Under Review</aegov-timeline-step>
  <aegov-timeline-step status="active">Approved</aegov-timeline-step>
  <aegov-timeline-step status="pending">Published</aegov-timeline-step>
</aegov-timeline>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-timeline>
    <aegov-timeline-step status="completed">Submitted</aegov-timeline-step>
    <aegov-timeline-step status="completed">Under Review</aegov-timeline-step>
    <aegov-timeline-step status="active">Approved</aegov-timeline-step>
    <aegov-timeline-step status="pending">Published</aegov-timeline-step>
  </aegov-timeline>
</div>

---

## Sizes

The `size` property on the parent controls the dimensions of the step indicators. All child steps inherit the same size for visual consistency.

| Size   | Indicator Diameter | Dot Diameter | Font Size  |
|--------|--------------------|-------------|------------|
| `sm`   | 1.7rem (27px)      | 0.5rem      | 0.625rem   |
| `base` | 2.125rem (34px)    | 0.625rem    | 0.75rem    |
| `lg`   | 2.5rem (40px)      | 0.75rem     | 0.875rem   |

```html
<aegov-timeline size="sm">
  <aegov-timeline-step status="completed">Small</aegov-timeline-step>
  <aegov-timeline-step status="active">Steps</aegov-timeline-step>
  <aegov-timeline-step status="pending">Here</aegov-timeline-step>
</aegov-timeline>
```

<div class="flex flex-col gap-8 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div>
    <p class="text-xs text-aeblack-400 mb-2">size="sm"</p>
    <aegov-timeline size="sm">
      <aegov-timeline-step status="completed">Details</aegov-timeline-step>
      <aegov-timeline-step status="active">Payment</aegov-timeline-step>
      <aegov-timeline-step status="pending">Confirmation</aegov-timeline-step>
    </aegov-timeline>
  </div>
  <div>
    <p class="text-xs text-aeblack-400 mb-2">size="base" (default)</p>
    <aegov-timeline size="base">
      <aegov-timeline-step status="completed">Details</aegov-timeline-step>
      <aegov-timeline-step status="active">Payment</aegov-timeline-step>
      <aegov-timeline-step status="pending">Confirmation</aegov-timeline-step>
    </aegov-timeline>
  </div>
  <div>
    <p class="text-xs text-aeblack-400 mb-2">size="lg"</p>
    <aegov-timeline size="lg">
      <aegov-timeline-step status="completed">Details</aegov-timeline-step>
      <aegov-timeline-step status="active">Payment</aegov-timeline-step>
      <aegov-timeline-step status="pending">Confirmation</aegov-timeline-step>
    </aegov-timeline>
  </div>
</div>

---

## Descriptions

Each step can display a description below the label using the `description` property. Descriptions provide additional context about the step.

```html
<aegov-timeline orientation="vertical">
  <aegov-timeline-step status="completed" description="Jan 15, 2026">Application Submitted</aegov-timeline-step>
  <aegov-timeline-step status="completed" description="Jan 18, 2026">Documents Verified</aegov-timeline-step>
  <aegov-timeline-step status="active" description="In progress">Under Review</aegov-timeline-step>
  <aegov-timeline-step status="pending" description="Estimated: Feb 1, 2026">Decision</aegov-timeline-step>
</aegov-timeline>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-timeline orientation="vertical">
    <aegov-timeline-step status="completed" description="Jan 15, 2026">Application Submitted</aegov-timeline-step>
    <aegov-timeline-step status="completed" description="Jan 18, 2026">Documents Verified</aegov-timeline-step>
    <aegov-timeline-step status="active" description="In progress">Under Review</aegov-timeline-step>
    <aegov-timeline-step status="pending" description="Estimated: Feb 1, 2026">Decision</aegov-timeline-step>
  </aegov-timeline>
</div>

Descriptions also work in horizontal orientation:

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-timeline orientation="horizontal">
    <aegov-timeline-step status="completed" description="Done">Order Placed</aegov-timeline-step>
    <aegov-timeline-step status="completed" description="Done">Processing</aegov-timeline-step>
    <aegov-timeline-step status="active" description="In transit">Shipping</aegov-timeline-step>
    <aegov-timeline-step status="pending" description="Pending">Delivered</aegov-timeline-step>
  </aegov-timeline>
</div>

---

## Custom Icons

Use the `icon` named slot on `<aegov-timeline-step>` to replace the default number or checkmark with a custom icon. This works for all statuses.

```html
<aegov-timeline orientation="vertical">
  <aegov-timeline-step status="completed">
    <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
         width="16" height="16">
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2"/>
      <circle cx="9" cy="7" r="4"/>
    </svg>
    Registration
  </aegov-timeline-step>
  <aegov-timeline-step status="active">
    <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
         width="16" height="16">
      <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
    Document Upload
  </aegov-timeline-step>
  <aegov-timeline-step status="pending">
    <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
         width="16" height="16">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    Approval
  </aegov-timeline-step>
</aegov-timeline>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-timeline orientation="vertical">
    <aegov-timeline-step status="completed">
      <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/></svg>
      Registration
    </aegov-timeline-step>
    <aegov-timeline-step status="active">
      <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
      Document Upload
    </aegov-timeline-step>
    <aegov-timeline-step status="pending">
      <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="20 6 9 17 4 12"/></svg>
      Approval
    </aegov-timeline-step>
  </aegov-timeline>
</div>

> **Note:** Custom icons via the `icon` slot only work with the `default` variant. The `compact` variant always renders dots regardless of slotted content.

---

## Connectors

Connectors between steps visually indicate progress. The style of each connector depends on the status of the step it follows:

- **Solid connector** — appears after a completed step, using the primary colour.
- **Dashed connector** — appears after an active or pending step, using a muted grey.

In horizontal mode, the first step has a transparent spacer on its left and the last step has a transparent spacer on its right to keep indicators properly centred.

```html
<aegov-timeline>
  <aegov-timeline-step status="completed">Completed</aegov-timeline-step>
  <aegov-timeline-step status="completed">Completed</aegov-timeline-step>
  <aegov-timeline-step status="active">Active</aegov-timeline-step>
  <aegov-timeline-step status="pending">Pending</aegov-timeline-step>
  <aegov-timeline-step status="pending">Pending</aegov-timeline-step>
</aegov-timeline>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-timeline>
    <aegov-timeline-step status="completed">Completed</aegov-timeline-step>
    <aegov-timeline-step status="completed">Completed</aegov-timeline-step>
    <aegov-timeline-step status="active">Active</aegov-timeline-step>
    <aegov-timeline-step status="pending">Pending</aegov-timeline-step>
    <aegov-timeline-step status="pending">Pending</aegov-timeline-step>
  </aegov-timeline>
</div>

---

## Combined Examples

### Vertical Default with Descriptions

A common real-world pattern for application tracking:

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-timeline orientation="vertical" size="lg">
    <aegov-timeline-step status="completed" description="Completed on March 1, 2026">Application Received</aegov-timeline-step>
    <aegov-timeline-step status="completed" description="Completed on March 3, 2026">Identity Verification</aegov-timeline-step>
    <aegov-timeline-step status="completed" description="Completed on March 5, 2026">Document Review</aegov-timeline-step>
    <aegov-timeline-step status="active" description="Currently in progress">Committee Approval</aegov-timeline-step>
    <aegov-timeline-step status="pending" description="Awaiting previous step">Licence Issued</aegov-timeline-step>
  </aegov-timeline>
</div>

### Compact Horizontal Progress

A minimal progress indicator for a multi-step form:

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-timeline variant="compact">
    <aegov-timeline-step status="completed">Step 1</aegov-timeline-step>
    <aegov-timeline-step status="completed">Step 2</aegov-timeline-step>
    <aegov-timeline-step status="completed">Step 3</aegov-timeline-step>
    <aegov-timeline-step status="active">Step 4</aegov-timeline-step>
    <aegov-timeline-step status="pending">Step 5</aegov-timeline-step>
    <aegov-timeline-step status="pending">Step 6</aegov-timeline-step>
  </aegov-timeline>
</div>

### All Sizes — Vertical Compact

<div class="flex flex-wrap gap-12 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div>
    <p class="text-xs text-aeblack-400 mb-2">sm</p>
    <aegov-timeline variant="compact" orientation="vertical" size="sm">
      <aegov-timeline-step status="completed">Done</aegov-timeline-step>
      <aegov-timeline-step status="active">Current</aegov-timeline-step>
      <aegov-timeline-step status="pending">Next</aegov-timeline-step>
    </aegov-timeline>
  </div>
  <div>
    <p class="text-xs text-aeblack-400 mb-2">base</p>
    <aegov-timeline variant="compact" orientation="vertical" size="base">
      <aegov-timeline-step status="completed">Done</aegov-timeline-step>
      <aegov-timeline-step status="active">Current</aegov-timeline-step>
      <aegov-timeline-step status="pending">Next</aegov-timeline-step>
    </aegov-timeline>
  </div>
  <div>
    <p class="text-xs text-aeblack-400 mb-2">lg</p>
    <aegov-timeline variant="compact" orientation="vertical" size="lg">
      <aegov-timeline-step status="completed">Done</aegov-timeline-step>
      <aegov-timeline-step status="active">Current</aegov-timeline-step>
      <aegov-timeline-step status="pending">Next</aegov-timeline-step>
    </aegov-timeline>
  </div>
</div>

---

## API Reference

### `aegov-timeline` Properties

| Property      | Attribute     | Description                             | Type                              | Default        |
|---------------|---------------|-----------------------------------------|-----------------------------------|----------------|
| `variant`     | `variant`     | Visual style of step indicators         | `'default'` \| `'compact'`       | `'default'`    |
| `size`        | `size`        | Size of step indicators                 | `'sm'` \| `'base'` \| `'lg'`    | `'base'`       |
| `orientation` | `orientation` | Layout direction of the timeline        | `'horizontal'` \| `'vertical'`   | `'horizontal'` |

### `aegov-timeline-step` Properties

| Property      | Attribute     | Description                              | Type                                         | Default     |
|---------------|---------------|------------------------------------------|----------------------------------------------|-------------|
| `status`      | `status`      | The visual status of the step            | `'completed'` \| `'active'` \| `'pending'`  | `'pending'` |
| `description` | `description` | Optional text shown below the label      | `string`                                     | —           |

> **Note:** The `variant`, `size`, `orientation`, `stepIndex`, `stepCount`, `isFirst`, `isLast`, and `connectorSolid` properties on `aegov-timeline-step` are set internally by the parent component. Do not set them manually.

### Slots

#### `aegov-timeline`

| Slot      | Description                                                     |
|-----------|-----------------------------------------------------------------|
| (default) | One or more `<aegov-timeline-step>` elements to display.       |

#### `aegov-timeline-step`

| Slot      | Description                                                                 |
|-----------|-----------------------------------------------------------------------------|
| (default) | The step label text.                                                       |
| `icon`    | Custom icon to replace the default number or checkmark (default variant only). |

---

## Accessibility

The `aegov-timeline` component is built with accessibility as a first-class concern.

### Built-in Features

- **Semantic `<nav>` element** — the timeline is wrapped in a `<nav>` with `aria-label="Timeline"` so assistive technologies can identify it as a navigation landmark.
- **Ordered list** — steps are rendered inside an `<ol>` element, conveying the sequential nature of the content to screen readers.
- **`aria-current="step"`** — automatically set on the step with `status="active"` so screen readers announce it as the current step.
- **Screen-reader text** — each step indicator includes visually hidden text that announces "Step N of M" along with the step label and status (e.g. "completed" or "current").
- **Decorative connectors** — all connector lines are marked with `aria-hidden="true"` so they do not generate noise for screen reader users.
- **Responsive labels** — in horizontal mode, labels are visually hidden on small screens (under 640px) but remain accessible via screen-reader-only text.

### Developer Responsibilities

1. **Provide meaningful step labels.** Each `<aegov-timeline-step>` should contain a clear, concise text label that describes the step. Screen readers rely on this text.

2. **Update statuses dynamically.** When the user progresses through steps, update the `status` attribute on each step so that the visual and accessible state remain in sync.

3. **Compact horizontal variant relies on SR text.** In compact horizontal mode, labels are not visible. The built-in screen-reader-only text ensures accessibility, but consider using the vertical orientation or default variant if visible labels are needed for your audience.

---

## Notes

- The `<aegov-timeline-step>` component **must** be used inside an `<aegov-timeline>`. Using it as a standalone component will throw an error.
- The parent component sets `variant`, `size`, `orientation`, and positional properties on all child steps during its lifecycle hooks. Do not set these manually on individual steps.
- In the **compact** variant with **horizontal** orientation, step labels are hidden visually but remain accessible to screen readers via `sr-only` text.
- In the **compact** variant with **vertical** orientation, labels remain visible next to each dot.
- Connectors use a **solid** primary-coloured line after completed steps and a **dashed** grey line after active or pending steps.
- The first and last steps in horizontal mode use invisible spacers instead of connectors on their outer edges, keeping the indicators properly centred within their column.
- All horizontal steps share equal width (`flex: 1 1 0%`) so the timeline distributes space evenly regardless of label length.
- The `icon` slot replaces the default number or checkmark in the **default** variant. It has no effect in the **compact** variant.
- Step descriptions are shown below the label in both orientations using the `description` property.
