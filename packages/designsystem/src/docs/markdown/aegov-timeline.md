# Timeline

<p class="text-lg text-aeblack-500 mb-8">A timeline is a visual stepper that shows progress through a sequence of stages — application steps, document review status, multi-step forms — and clarifies what is complete, what is in progress, and what is still ahead. The <code>aegov-timeline</code> parent renders the surrounding region landmark and writes shared layout props onto each <code>aegov-timeline-step</code> child, so your markup only needs per-step <code>status</code> and label content.</p>

## Introduction

`aegov-timeline` composes a parent wrapper with one or more `aegov-timeline-step` children. The parent calculates step indices, first/last position, and connector state for each step, leaving you to author content. Two visual variants are available — the default numbered circles, and a compact dot variant for tighter contexts — and steps lay out either horizontally or vertically depending on the `orientation` property.

```html
<aegov-timeline>
  <aegov-timeline-step status="completed" description="Submitted">
    Application
  </aegov-timeline-step>
  <aegov-timeline-step status="completed" description="Verified">
    Documents
  </aegov-timeline-step>
  <aegov-timeline-step status="active" description="In review">
    Approval
  </aegov-timeline-step>
  <aegov-timeline-step status="pending">
    Issuance
  </aegov-timeline-step>
</aegov-timeline>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-timeline>
    <aegov-timeline-step status="completed" description="Submitted">
      Application
    </aegov-timeline-step>
    <aegov-timeline-step status="completed" description="Verified">
      Documents
    </aegov-timeline-step>
    <aegov-timeline-step status="active" description="In review">
      Approval
    </aegov-timeline-step>
    <aegov-timeline-step status="pending">
      Issuance
    </aegov-timeline-step>
  </aegov-timeline>
</div>

---

## Status

Each `aegov-timeline-step` requires a `status` of `completed`, `active`, or `pending`. The parent reads these values to colour the connectors between steps — a connector renders solid only when the step before it is `completed`, otherwise it is dashed.

```html
<aegov-timeline>
  <aegov-timeline-step status="completed">Identity</aegov-timeline-step>
  <aegov-timeline-step status="completed">Documents</aegov-timeline-step>
  <aegov-timeline-step status="active">Verification</aegov-timeline-step>
  <aegov-timeline-step status="pending">Approval</aegov-timeline-step>
  <aegov-timeline-step status="pending">Issuance</aegov-timeline-step>
</aegov-timeline>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-timeline>
    <aegov-timeline-step status="completed">Identity</aegov-timeline-step>
    <aegov-timeline-step status="completed">Documents</aegov-timeline-step>
    <aegov-timeline-step status="active">Verification</aegov-timeline-step>
    <aegov-timeline-step status="pending">Approval</aegov-timeline-step>
    <aegov-timeline-step status="pending">Issuance</aegov-timeline-step>
  </aegov-timeline>
</div>

---

## Step Description

Each step accepts an optional `description` property — a single supplementary line shown below the label. Use it for state subtext such as a date, status note, or short explanation.

```html
<aegov-timeline>
  <aegov-timeline-step status="completed" description="Submitted on 12 Mar">
    Application received
  </aegov-timeline-step>
  <aegov-timeline-step status="completed" description="Verified on 13 Mar">
    Documents reviewed
  </aegov-timeline-step>
  <aegov-timeline-step status="active" description="In review">
    Approval pending
  </aegov-timeline-step>
  <aegov-timeline-step status="pending" description="Estimated 18 Mar">
    Issuance
  </aegov-timeline-step>
</aegov-timeline>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-timeline>
    <aegov-timeline-step status="completed" description="Submitted on 12 Mar">
      Application received
    </aegov-timeline-step>
    <aegov-timeline-step status="completed" description="Verified on 13 Mar">
      Documents reviewed
    </aegov-timeline-step>
    <aegov-timeline-step status="active" description="In review">
      Approval pending
    </aegov-timeline-step>
    <aegov-timeline-step status="pending" description="Estimated 18 Mar">
      Issuance
    </aegov-timeline-step>
  </aegov-timeline>
</div>

---

## Variants

The `variant` property selects the visual style. `default` (numbered circles with checkmarks for completed steps) is the most informative; `compact` reduces each step to a small dot — useful inside cards or sidebars.

### Default (numbered circles)

```html
<aegov-timeline variant="default">
  <aegov-timeline-step status="completed">Apply</aegov-timeline-step>
  <aegov-timeline-step status="completed">Verify</aegov-timeline-step>
  <aegov-timeline-step status="active">Approve</aegov-timeline-step>
  <aegov-timeline-step status="pending">Issue</aegov-timeline-step>
</aegov-timeline>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-timeline variant="default">
    <aegov-timeline-step status="completed">Apply</aegov-timeline-step>
    <aegov-timeline-step status="completed">Verify</aegov-timeline-step>
    <aegov-timeline-step status="active">Approve</aegov-timeline-step>
    <aegov-timeline-step status="pending">Issue</aegov-timeline-step>
  </aegov-timeline>
</div>

### Compact (dots)

In horizontal compact mode the step labels are hidden visually but remain available to assistive technology. In vertical compact mode the labels are shown beside the dot.

```html
<aegov-timeline variant="compact">
  <aegov-timeline-step status="completed">Step 1</aegov-timeline-step>
  <aegov-timeline-step status="completed">Step 2</aegov-timeline-step>
  <aegov-timeline-step status="active">Step 3</aegov-timeline-step>
  <aegov-timeline-step status="pending">Step 4</aegov-timeline-step>
</aegov-timeline>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-timeline variant="compact">
    <aegov-timeline-step status="completed">Step 1</aegov-timeline-step>
    <aegov-timeline-step status="completed">Step 2</aegov-timeline-step>
    <aegov-timeline-step status="active">Step 3</aegov-timeline-step>
    <aegov-timeline-step status="pending">Step 4</aegov-timeline-step>
  </aegov-timeline>
</div>

---

## Orientation

The `orientation` property switches between `horizontal` (default — steps laid out left-to-right) and `vertical` (steps stacked top-to-bottom). Vertical works well for service-application sidebars and step-by-step instructions.

### Horizontal (default)

```html
<aegov-timeline orientation="horizontal">
  <aegov-timeline-step status="completed" description="3 Apr">
    Account created
  </aegov-timeline-step>
  <aegov-timeline-step status="completed" description="4 Apr">
    Profile completed
  </aegov-timeline-step>
  <aegov-timeline-step status="active" description="Today">
    Verification
  </aegov-timeline-step>
  <aegov-timeline-step status="pending">Activation</aegov-timeline-step>
</aegov-timeline>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-timeline orientation="horizontal">
    <aegov-timeline-step status="completed" description="3 Apr">
      Account created
    </aegov-timeline-step>
    <aegov-timeline-step status="completed" description="4 Apr">
      Profile completed
    </aegov-timeline-step>
    <aegov-timeline-step status="active" description="Today">
      Verification
    </aegov-timeline-step>
    <aegov-timeline-step status="pending">Activation</aegov-timeline-step>
  </aegov-timeline>
</div>

### Vertical

```html
<aegov-timeline orientation="vertical">
  <aegov-timeline-step status="completed" description="Submitted">
    Service request
  </aegov-timeline-step>
  <aegov-timeline-step status="completed" description="Reviewed">
    Documents verified
  </aegov-timeline-step>
  <aegov-timeline-step status="active" description="In progress">
    Approval pending
  </aegov-timeline-step>
  <aegov-timeline-step status="pending" description="Estimated 5 working days">
    Issuance
  </aegov-timeline-step>
  <aegov-timeline-step status="pending">
    Collection
  </aegov-timeline-step>
</aegov-timeline>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-timeline orientation="vertical">
    <aegov-timeline-step status="completed" description="Submitted">
      Service request
    </aegov-timeline-step>
    <aegov-timeline-step status="completed" description="Reviewed">
      Documents verified
    </aegov-timeline-step>
    <aegov-timeline-step status="active" description="In progress">
      Approval pending
    </aegov-timeline-step>
    <aegov-timeline-step status="pending" description="Estimated 5 working days">
      Issuance
    </aegov-timeline-step>
    <aegov-timeline-step status="pending">
      Collection
    </aegov-timeline-step>
  </aegov-timeline>
</div>

---

## Sizes

The `size` property sets the indicator size. Three tokens are available: `sm`, `base` (default), and `lg`. Label and description typography stays the same — only the indicator scales.

| Token  | Indicator size |
| ------ | -------------- |
| `sm`   | Compact        |
| `base` | Default        |
| `lg`   | Large          |

```html
<aegov-timeline size="sm">…</aegov-timeline>
<aegov-timeline size="base">…</aegov-timeline>
<aegov-timeline size="lg">…</aegov-timeline>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-timeline size="sm">
    <aegov-timeline-step status="completed">Apply</aegov-timeline-step>
    <aegov-timeline-step status="active">Review</aegov-timeline-step>
    <aegov-timeline-step status="pending">Approve</aegov-timeline-step>
  </aegov-timeline>

  <div class="my-6"></div>

  <aegov-timeline size="base">
    <aegov-timeline-step status="completed">Apply</aegov-timeline-step>
    <aegov-timeline-step status="active">Review</aegov-timeline-step>
    <aegov-timeline-step status="pending">Approve</aegov-timeline-step>
  </aegov-timeline>

  <div class="my-6"></div>

  <aegov-timeline size="lg">
    <aegov-timeline-step status="completed">Apply</aegov-timeline-step>
    <aegov-timeline-step status="active">Review</aegov-timeline-step>
    <aegov-timeline-step status="pending">Approve</aegov-timeline-step>
  </aegov-timeline>
</div>

### Responsive sizes

`size` accepts a Tailwind-style responsive string with the breakpoint prefixes `xs`, `sm`, `md`, `lg`, `xl`, and `2xl`. Each segment overrides smaller breakpoints.

```html
<aegov-timeline size="sm md:base xl:lg">
  <aegov-timeline-step status="completed">Apply</aegov-timeline-step>
  <aegov-timeline-step status="active">Review</aegov-timeline-step>
  <aegov-timeline-step status="pending">Approve</aegov-timeline-step>
</aegov-timeline>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-timeline size="sm md:base xl:lg">
    <aegov-timeline-step status="completed">Apply</aegov-timeline-step>
    <aegov-timeline-step status="active">Review</aegov-timeline-step>
    <aegov-timeline-step status="pending">Approve</aegov-timeline-step>
  </aegov-timeline>
</div>

---

## Custom Step Icon

Each step accepts an `icon` slot for replacing the default number / checkmark with a custom SVG. The icon is only rendered in the `default` variant — the compact dot variant ignores it. Make sure custom icons carry `aria-hidden="true"`; the screen-reader description is still provided automatically.

```html
<aegov-timeline>
  <aegov-timeline-step status="completed">
    <svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
    Identity verified
  </aegov-timeline-step>
  <aegov-timeline-step status="completed">
    <svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
    Documents uploaded
  </aegov-timeline-step>
  <aegov-timeline-step status="active">
    <svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
    Approval in progress
  </aegov-timeline-step>
</aegov-timeline>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-timeline>
    <aegov-timeline-step status="completed">
      <svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
      Identity verified
    </aegov-timeline-step>
    <aegov-timeline-step status="completed">
      <svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
      Documents uploaded
    </aegov-timeline-step>
    <aegov-timeline-step status="active">
      <svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
      Approval in progress
    </aegov-timeline-step>
  </aegov-timeline>
</div>

---

## Combined Example

A vertical, large-size timeline with descriptions and a mix of statuses — typical of a service-tracking sidebar.

```html
<aegov-timeline orientation="vertical" size="lg">
  <aegov-timeline-step status="completed" description="12 Mar 2026">
    Application submitted
  </aegov-timeline-step>
  <aegov-timeline-step status="completed" description="13 Mar 2026">
    Emirates ID verified
  </aegov-timeline-step>
  <aegov-timeline-step status="completed" description="14 Mar 2026">
    Supporting documents reviewed
  </aegov-timeline-step>
  <aegov-timeline-step status="active" description="In review by the issuing authority">
    Approval pending
  </aegov-timeline-step>
  <aegov-timeline-step status="pending" description="Estimated 18 Mar 2026">
    Permit issuance
  </aegov-timeline-step>
  <aegov-timeline-step status="pending" description="Pick up at the service centre">
    Collection
  </aegov-timeline-step>
</aegov-timeline>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-timeline orientation="vertical" size="lg">
    <aegov-timeline-step status="completed" description="12 Mar 2026">
      Application submitted
    </aegov-timeline-step>
    <aegov-timeline-step status="completed" description="13 Mar 2026">
      Emirates ID verified
    </aegov-timeline-step>
    <aegov-timeline-step status="completed" description="14 Mar 2026">
      Supporting documents reviewed
    </aegov-timeline-step>
    <aegov-timeline-step status="active" description="In review by the issuing authority">
      Approval pending
    </aegov-timeline-step>
    <aegov-timeline-step status="pending" description="Estimated 18 Mar 2026">
      Permit issuance
    </aegov-timeline-step>
    <aegov-timeline-step status="pending" description="Pick up at the service centre">
      Collection
    </aegov-timeline-step>
  </aegov-timeline>
</div>

---

## RTL Support

The timeline is direction-agnostic. When the document or any ancestor is set to `dir="rtl"`, the horizontal layout flips so step 1 sits on the right and steps progress leftward. Connector lines, indicator alignment, and label alignment all use logical properties so they mirror automatically. Vertical orientation is unchanged in RTL.

```html
<div dir="rtl">
  <aegov-timeline>
    <aegov-timeline-step status="completed" description="تم الاستلام">
      تقديم الطلب
    </aegov-timeline-step>
    <aegov-timeline-step status="completed" description="تم التحقق">
      التحقق من المستندات
    </aegov-timeline-step>
    <aegov-timeline-step status="active" description="قيد المراجعة">
      الموافقة
    </aegov-timeline-step>
    <aegov-timeline-step status="pending">
      الإصدار
    </aegov-timeline-step>
  </aegov-timeline>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-timeline>
    <aegov-timeline-step status="completed" description="تم الاستلام">
      تقديم الطلب
    </aegov-timeline-step>
    <aegov-timeline-step status="completed" description="تم التحقق">
      التحقق من المستندات
    </aegov-timeline-step>
    <aegov-timeline-step status="active" description="قيد المراجعة">
      الموافقة
    </aegov-timeline-step>
    <aegov-timeline-step status="pending">
      الإصدار
    </aegov-timeline-step>
  </aegov-timeline>
</div>

The same flow vertically, in RTL:

```html
<div dir="rtl">
  <aegov-timeline orientation="vertical">
    <aegov-timeline-step status="completed" description="١٢ مارس ٢٠٢٦">
      تقديم الطلب
    </aegov-timeline-step>
    <aegov-timeline-step status="completed" description="١٣ مارس ٢٠٢٦">
      التحقق من الهوية الإماراتية
    </aegov-timeline-step>
    <aegov-timeline-step status="active" description="قيد المراجعة">
      الموافقة
    </aegov-timeline-step>
    <aegov-timeline-step status="pending" description="مقدّر في ١٨ مارس ٢٠٢٦">
      إصدار التصريح
    </aegov-timeline-step>
  </aegov-timeline>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-timeline orientation="vertical">
    <aegov-timeline-step status="completed" description="١٢ مارس ٢٠٢٦">
      تقديم الطلب
    </aegov-timeline-step>
    <aegov-timeline-step status="completed" description="١٣ مارس ٢٠٢٦">
      التحقق من الهوية الإماراتية
    </aegov-timeline-step>
    <aegov-timeline-step status="active" description="قيد المراجعة">
      الموافقة
    </aegov-timeline-step>
    <aegov-timeline-step status="pending" description="مقدّر في ١٨ مارس ٢٠٢٦">
      إصدار التصريح
    </aegov-timeline-step>
  </aegov-timeline>
</div>

---

## API Reference

### aegov-timeline Properties

| Property      | Attribute     | Description                                                          | Type                          | Default        |
| ------------- | ------------- | -------------------------------------------------------------------- | ----------------------------- | -------------- |
| `fieldId`     | `field-id`    | DOM `id` for the rendered `<section>`. Auto-generated if omitted.    | `string`                      | _generated_    |
| `variant`     | `variant`     | Visual style of the indicators.                                      | `'default' \| 'compact'`      | `'default'`    |
| `size`        | `size`        | Indicator size token or responsive string.                           | `string`                      | `'base'`       |
| `orientation` | `orientation` | Layout direction of the step list.                                   | `'horizontal' \| 'vertical'`  | `'horizontal'` |

### aegov-timeline-step Properties

| Property            | Attribute             | Description                                                              | Type                                       | Default        |
| ------------------- | --------------------- | ------------------------------------------------------------------------ | ------------------------------------------ | -------------- |
| `status`            | `status`              | Visual state of the step.                                                | `'completed' \| 'active' \| 'pending'`     | `'pending'`    |
| `description`       | `description`         | Optional supplementary text shown below the label.                        | `string`                                   | `undefined`    |
| `variant`           | `variant`             | _Set by the parent._ Visual style.                                        | `'default' \| 'compact'`                   | `'default'`    |
| `size`              | `size`                | _Set by the parent._ Indicator size.                                      | `'sm' \| 'base' \| 'lg'`                   | `'base'`       |
| `orientation`       | `orientation`         | _Set by the parent._ Layout direction.                                    | `'horizontal' \| 'vertical'`               | `'horizontal'` |
| `stepIndex`         | `step-index`          | _Set by the parent._ Zero-based position in the list.                     | `number`                                   | `0`            |
| `stepCount`         | `step-count`          | _Set by the parent._ Total number of steps in the timeline.               | `number`                                   | `1`            |
| `isFirst`           | `is-first`            | _Set by the parent._ Whether this is the first step.                      | `boolean`                                  | `false`        |
| `isLast`            | `is-last`             | _Set by the parent._ Whether this is the last step.                       | `boolean`                                  | `false`        |
| `isConnectorSolid`  | `is-connector-solid`  | _Set by the parent._ Whether the leading connector renders solid.         | `boolean`                                  | `false`        |

> Properties marked _Set by the parent_ are written automatically by `aegov-timeline`. Setting them on a step directly will be overridden on the next sync.

### Slots

| Component               | Slot       | Description                                                              |
| ----------------------- | ---------- | ------------------------------------------------------------------------ |
| `aegov-timeline`        | _(default)_ | Place one or more `aegov-timeline-step` children here.                    |
| `aegov-timeline-step`   | _(default)_ | The step label text. Captured into a screen-reader description.           |
| `aegov-timeline-step`   | `icon`     | Optional icon replacing the default number / checkmark (default variant only). |

### Events

`aegov-timeline` and `aegov-timeline-step` do not emit any custom events — the timeline is a presentational, non-interactive component. To react to status changes, update the `status` prop of the relevant step from your application code.

### Pass-through Attributes

| Attribute group | Forwarded? | Where to apply                                                                       |
| --------------- | ---------- | ------------------------------------------------------------------------------------ |
| `aria-*`        | Yes        | Set on `<aegov-timeline>` — forwarded onto the rendered `<section>` element.         |
| `data-*`        | Yes        | Set on `<aegov-timeline>` — forwarded onto the rendered `<section>` element.         |
| `aria-*` / `data-*` on steps | No  | Apply directly to `<aegov-timeline-step>`; not forwarded automatically.              |
| `id`            | n/a        | Use `field-id` on `<aegov-timeline>`.                                                 |
| `class`, `style` | Allowed   | Applied to the host element.                                                          |

To override the default `aria-label="Timeline"` on the region landmark, set `aria-label` directly on `<aegov-timeline>` — it is forwarded to the rendered `<section>`.

---

## Accessibility

### Built-in behaviour

- The container renders as a `<section>` element whose `aria-label` defaults to `"Timeline"` in LTR contexts and `"الجدول الزمني"` in RTL — no developer translation needed. Pass `aria-label` on the host to override with a more specific description.
- Steps render as `<li>` items inside an `<ol>`, preserving order semantics.
- The currently active step's `<li>` carries `aria-current="step"` so screen readers announce the user's position.
- Each step includes a visually hidden description (`"Step N of M: <label> (current/completed)"` in English; `"الخطوة N من M: <label> (مكتمل/الحالية)"` in Arabic) that gives screen-reader users full context regardless of variant — including the compact dot variant where labels are visually hidden in horizontal mode. No developer translation needed.
- Decorative connectors and indicator graphics are marked `aria-hidden="true"`.

### Developer responsibilities

- Provide a meaningful label as default-slot text on every step. The screen-reader description depends on it.
- When using a custom `icon` slot, set `aria-hidden="true"` on the icon — the step's `sr-only` label is still rendered.
- Keep step ordering meaningful — the visual progression is what gives `aria-current="step"` value.
- Override the `aria-label` on `<aegov-timeline>` (via host attribute pass-through) when more specific context is needed, e.g. `aria-label="Application progress"` or `aria-label="مسار الطلب"`.

### Notes

- The timeline is a presentational component — it does not respond to keyboard or pointer input. If your flow needs clickable step navigation, wrap step content in a button or link, or build a separate interactive stepper.
- Connector colour is computed automatically: the connector before a step renders solid only when the previous step's status is `completed`.
