# Timeline

<p class="text-lg text-aeblack-500 mb-8">A Timeline shows a sequence of steps and where the user is in it — an application's stages, a multi-step form, the progress of a request through review. Unlike a <a href="aegov-progress.html">Progress</a> bar, it names each step, so the user can see what has happened and what is coming.</p>

## Introduction

`aegov-timeline` manages a set of `aegov-timeline-step` children, cascading `variant`, `size` and `orientation` to each, and telling every step its index, the total count, and whether it is first or last — which is how the connectors between steps are drawn.

```html
<aegov-timeline>
  <aegov-timeline-step status="completed" description="14 March 2026">Submitted</aegov-timeline-step>
  <aegov-timeline-step status="active" description="In progress">Under review</aegov-timeline-step>
  <aegov-timeline-step status="pending">Decision</aegov-timeline-step>
  <aegov-timeline-step status="pending">Card issued</aegov-timeline-step>
</aegov-timeline>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-timeline field-id="tl-intro">
    <aegov-timeline-step status="completed" description="14 March 2026">Submitted</aegov-timeline-step>
    <aegov-timeline-step status="active" description="In progress">Under review</aegov-timeline-step>
    <aegov-timeline-step status="pending">Decision</aegov-timeline-step>
    <aegov-timeline-step status="pending">Card issued</aegov-timeline-step>
  </aegov-timeline>
</div>

The component was renamed from an earlier `aegov-progress` to avoid confusion with the native `<progress>` element, which is now [`aegov-progress`](aegov-progress.html).

---

## Status

Every step carries one of three statuses. Together they tell the story of the sequence.

| Status | Means | Renders |
| --- | --- | --- |
| `completed` | Done. | A checkmark, and a solid connector to the next step. |
| `active` | The current step. | An emphasised marker. |
| `pending` | Not yet reached. | A muted marker and a dashed connector. |

```html
<aegov-timeline-step status="completed">Submitted</aegov-timeline-step>
<aegov-timeline-step status="active">Under review</aegov-timeline-step>
<aegov-timeline-step status="pending">Decision</aegov-timeline-step>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-timeline field-id="tl-status">
    <aegov-timeline-step status="completed">Completed</aegov-timeline-step>
    <aegov-timeline-step status="completed">Completed</aegov-timeline-step>
    <aegov-timeline-step status="active">Active</aegov-timeline-step>
    <aegov-timeline-step status="pending">Pending</aegov-timeline-step>
  </aegov-timeline>
</div>

Mark exactly one step `active`. Two active steps make the sequence unreadable, and none leaves the user unsure where they are.

---

## Orientation

```html
<aegov-timeline orientation="horizontal">…</aegov-timeline>
<aegov-timeline orientation="vertical">…</aegov-timeline>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-10">
    <div>
      <p class="text-sm text-aeblack-500 mb-3">horizontal (default)</p>
      <aegov-timeline field-id="tl-o1" orientation="horizontal">
        <aegov-timeline-step status="completed" description="14 March">Submitted</aegov-timeline-step>
        <aegov-timeline-step status="active" description="In progress">Under review</aegov-timeline-step>
        <aegov-timeline-step status="pending">Decision</aegov-timeline-step>
      </aegov-timeline>
    </div>
    <div>
      <p class="text-sm text-aeblack-500 mb-3">vertical</p>
      <aegov-timeline field-id="tl-o2" orientation="vertical">
        <aegov-timeline-step status="completed" description="14 March 2026, 09:12">Application submitted</aegov-timeline-step>
        <aegov-timeline-step status="completed" description="14 March 2026, 11:40">Documents verified</aegov-timeline-step>
        <aegov-timeline-step status="active" description="Expected within 3 working days">Under review</aegov-timeline-step>
        <aegov-timeline-step status="pending">Decision issued</aegov-timeline-step>
      </aegov-timeline>
    </div>
  </div>
</div>

Horizontal suits a short sequence at the top of a page. Vertical suits longer sequences and detailed descriptions, and it reflows far better on narrow viewports — a horizontal timeline with five steps is usually unusable on a phone.

---

## Variant

| Variant | Renders |
| --- | --- |
| `default` | Full markers with labels and descriptions. |
| `compact` | Reduced markers and tighter spacing. |

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-10">
    <div>
      <p class="text-sm text-aeblack-500 mb-3">default</p>
      <aegov-timeline field-id="tl-v1" variant="default">
        <aegov-timeline-step status="completed" description="14 March">Submitted</aegov-timeline-step>
        <aegov-timeline-step status="active">Under review</aegov-timeline-step>
        <aegov-timeline-step status="pending">Decision</aegov-timeline-step>
      </aegov-timeline>
    </div>
    <div>
      <p class="text-sm text-aeblack-500 mb-3">compact</p>
      <aegov-timeline field-id="tl-v2" variant="compact">
        <aegov-timeline-step status="completed">Submitted</aegov-timeline-step>
        <aegov-timeline-step status="active">Under review</aegov-timeline-step>
        <aegov-timeline-step status="pending">Decision</aegov-timeline-step>
      </aegov-timeline>
    </div>
  </div>
</div>

---

## Sizes

Three tokens, and `size` accepts a responsive string — useful for shrinking a horizontal timeline on small screens.

```html
<aegov-timeline size="sm md:base lg:lg">…</aegov-timeline>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-8">
    <aegov-timeline field-id="tl-s1" size="sm"><aegov-timeline-step status="completed">Small</aegov-timeline-step><aegov-timeline-step status="active">Active</aegov-timeline-step><aegov-timeline-step status="pending">Pending</aegov-timeline-step></aegov-timeline>
    <aegov-timeline field-id="tl-s2" size="base"><aegov-timeline-step status="completed">Base</aegov-timeline-step><aegov-timeline-step status="active">Active</aegov-timeline-step><aegov-timeline-step status="pending">Pending</aegov-timeline-step></aegov-timeline>
    <aegov-timeline field-id="tl-s3" size="lg"><aegov-timeline-step status="completed">Large</aegov-timeline-step><aegov-timeline-step status="active">Active</aegov-timeline-step><aegov-timeline-step status="pending">Pending</aegov-timeline-step></aegov-timeline>
  </div>
</div>

---

## Descriptions

`description` renders secondary text under a step's label — a date, an expected duration, a short explanation.

```html
<aegov-timeline-step status="completed" description="14 March 2026, 09:12">
  Application submitted
</aegov-timeline-step>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-timeline field-id="tl-desc" orientation="vertical">
    <aegov-timeline-step status="completed" description="14 March 2026, 09:12">Application submitted</aegov-timeline-step>
    <aegov-timeline-step status="completed" description="14 March 2026, 11:40">Documents verified</aegov-timeline-step>
    <aegov-timeline-step status="active" description="A decision is expected within 3 working days">Under review by the issuing authority</aegov-timeline-step>
    <aegov-timeline-step status="pending" description="You will be notified by email and SMS">Decision issued</aegov-timeline-step>
  </aegov-timeline>
</div>

Descriptions are where a timeline earns its place over a progress bar. "Under review" tells the user very little; "Under review — a decision is expected within 3 working days" answers the question they actually have.

---

## Custom step icons

The `icon` slot replaces a step's marker glyph.

```html
<aegov-timeline-step status="completed">
  <svg slot="icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">…</svg>
  Payment received
</aegov-timeline-step>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-timeline field-id="tl-icons" orientation="vertical">
    <aegov-timeline-step status="completed" description="14 March 2026">
      <svg slot="icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.3a1.5 1.5 0 0 1 1.06.44l3.7 3.7A1.5 1.5 0 0 1 16 7.2v9.3a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 16.5v-13Z" /></svg>
      Documents uploaded
    </aegov-timeline-step>
    <aegov-timeline-step status="completed" description="AED 270 · Visa ending 6411">
      <svg slot="icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h11A2.5 2.5 0 0 1 18 6.5V8H2V6.5ZM2 9.5h16v4A2.5 2.5 0 0 1 15.5 16h-11A2.5 2.5 0 0 1 2 13.5v-4Z" /></svg>
      Payment received
    </aegov-timeline-step>
    <aegov-timeline-step status="active" description="Expected within 3 working days">Under review</aegov-timeline-step>
    <aegov-timeline-step status="pending">Card issued</aegov-timeline-step>
  </aegov-timeline>
</div>

Mark the icon `aria-hidden="true"` — the step's label carries the meaning, and the status is communicated separately.

---

## Composite example — application status page

```html
<div class="rounded-lg border border-aeblack-100 p-6">
  <div class="flex items-start justify-between mb-6">
    <div>
      <h2 class="text-h5 font-bold">Emirates ID renewal</h2>
      <p class="text-sm text-aeblack-500">APP-2026-0041827</p>
    </div>
    <aegov-badge variant="camel">Under review</aegov-badge>
  </div>

  <aegov-timeline orientation="vertical" size="base">
    <aegov-timeline-step status="completed" description="14 March 2026, 09:12">
      Application submitted
    </aegov-timeline-step>
    <aegov-timeline-step status="completed" description="14 March 2026, 11:40">
      Documents verified
    </aegov-timeline-step>
    <aegov-timeline-step status="active" description="A decision is expected within 3 working days">
      Under review
    </aegov-timeline-step>
    <aegov-timeline-step status="pending" description="You will be notified by email and SMS">
      Decision issued
    </aegov-timeline-step>
    <aegov-timeline-step status="pending" description="Delivered to your registered address">
      Card issued
    </aegov-timeline-step>
  </aegov-timeline>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-lg rounded-lg border border-aeblack-100 bg-whitely-50 p-6">
    <div class="flex items-start justify-between mb-6">
      <div>
        <p class="text-h6 font-bold">Emirates ID renewal</p>
        <p class="text-sm text-aeblack-500">APP-2026-0041827</p>
      </div>
      <aegov-badge variant="camel">Under review</aegov-badge>
    </div>
    <aegov-timeline field-id="tl-cx" orientation="vertical" size="base">
      <aegov-timeline-step status="completed" description="14 March 2026, 09:12">Application submitted</aegov-timeline-step>
      <aegov-timeline-step status="completed" description="14 March 2026, 11:40">Documents verified</aegov-timeline-step>
      <aegov-timeline-step status="active" description="A decision is expected within 3 working days">Under review</aegov-timeline-step>
      <aegov-timeline-step status="pending" description="You will be notified by email and SMS">Decision issued</aegov-timeline-step>
      <aegov-timeline-step status="pending" description="Delivered to your registered address">Card issued</aegov-timeline-step>
    </aegov-timeline>
  </div>
</div>

Note the [Badge](aegov-badge.html) repeating the current status at the top. A user scanning the page reads the badge; a user who wants the detail reads the timeline.

---

## RTL Support

The timeline is direction-aware. In a `dir="rtl"` container a horizontal timeline runs right to left with the connectors and completed checkmarks mirrored, and a vertical timeline places its markers and connectors on the right with labels aligned to the reading direction.

```html
<div dir="rtl">
  <aegov-timeline orientation="vertical">
    <aegov-timeline-step status="completed" description="١٤ مارس ٢٠٢٦، ٠٩:١٢">تم إرسال الطلب</aegov-timeline-step>
    <aegov-timeline-step status="completed" description="١٤ مارس ٢٠٢٦، ١١:٤٠">تم التحقق من المستندات</aegov-timeline-step>
    <aegov-timeline-step status="active" description="يُتوقع القرار خلال ٣ أيام عمل">قيد المراجعة</aegov-timeline-step>
    <aegov-timeline-step status="pending">إصدار القرار</aegov-timeline-step>
  </aegov-timeline>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-10">
    <aegov-timeline field-id="tl-rtl-1" orientation="horizontal">
      <aegov-timeline-step status="completed" description="١٤ مارس">تم الإرسال</aegov-timeline-step>
      <aegov-timeline-step status="active" description="قيد الإنجاز">قيد المراجعة</aegov-timeline-step>
      <aegov-timeline-step status="pending">القرار</aegov-timeline-step>
    </aegov-timeline>
    <aegov-timeline field-id="tl-rtl-2" orientation="vertical">
      <aegov-timeline-step status="completed" description="١٤ مارس ٢٠٢٦، ٠٩:١٢">تم إرسال الطلب</aegov-timeline-step>
      <aegov-timeline-step status="completed" description="١٤ مارس ٢٠٢٦، ١١:٤٠">تم التحقق من المستندات</aegov-timeline-step>
      <aegov-timeline-step status="active" description="يُتوقع القرار خلال ٣ أيام عمل">قيد المراجعة</aegov-timeline-step>
      <aegov-timeline-step status="pending" description="سيتم إشعارك بالبريد الإلكتروني والرسائل النصية">إصدار القرار</aegov-timeline-step>
    </aegov-timeline>
  </div>
</div>

Dates and times in descriptions are your content — use Arabic-Indic numerals where the rest of your Arabic copy does, as above.

---

## API Reference

### aegov-timeline Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the wrapper. Auto-generated when omitted, reflected. | `string` | _generated_ |
| `variant` | `variant` | Marker and spacing treatment. Cascades to steps. | `'default' \| 'compact'` | `'default'` |
| `size` | `size` | Size token or responsive string. Cascades to steps. | `string` — `sm \| base \| lg` | `'base'` |
| `orientation` | `orientation` | Layout direction. Cascades to steps. | `'horizontal' \| 'vertical'` | `'horizontal'` |

### aegov-timeline-step Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `status` | `status` | The step's state. | `'completed' \| 'active' \| 'pending'` | `'pending'` |
| `description` | `description` | Secondary text under the label. | `string` | — |

Index, total count, first/last position, connector style, variant, size and orientation are all set by the parent — you never set them yourself.

### Slots

| Slot | On | Description |
| --- | --- | --- |
| _(default)_ | timeline | The `aegov-timeline-step` children. |
| _(default)_ | step | The step label. |
| `icon` | step | Replaces the step's marker glyph. |

### Events

Neither component emits events. A timeline reports state; it is not interactive.

### Methods

None.

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the wrapper. |
| `data-*` | Yes | Forwarded to the wrapper. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host element. |

### CSS classes

| Class | Element |
| --- | --- |
| `.aegov-timeline` | The wrapper. |
| `.timeline__list` | The list of steps. |
| `.aegov-step` | An individual step. |
| `.step__checkmark` | The completed marker. Marked `aria-hidden`. |
| `.step__connector`, `.step__spacer` | Connectors between steps. Marked `aria-hidden`. |

---

## Accessibility

### Built-in behaviour

- The timeline renders a `<section>` with an accessible label — a landmark region — containing the steps as an ordered list, so a screen reader announces how many steps there are and which one is being read.
- Connectors, spacers and the completed checkmark are all marked `aria-hidden="true"`. They are visual scaffolding; the status is carried by the step's own content.
- The parent supplies each step its index and the total, so the connector logic never depends on you counting correctly.
- Layout uses logical properties, so both orientations mirror under `dir="rtl"`.

### Developer responsibilities

- **Do not rely on the marker alone to convey status** (WCAG 2.2 SC 1.4.1). A checkmark and a colour are visual; include the state in the text where it matters — "Under review", "Completed 14 March" — or add a visually hidden note:

  ```html
  <aegov-timeline-step status="completed" description="14 March 2026">
    Submitted <span class="sr-only">(completed)</span>
  </aegov-timeline-step>
  ```

  This is the single most important thing to get right on this component: a screen reader user reading "Submitted, Under review, Decision" learns the step names but not which one you are on.
- **Mark exactly one step `active`.**
- **Use `description` to answer "what happens next".** A named step with no timing is only marginally better than a progress bar.
- **Prefer `vertical` for more than three or four steps**, and for anything with descriptions — a horizontal timeline with long labels does not reflow at 320px, failing WCAG 2.2 SC 1.4.10.
- **Announce changes.** If the timeline updates live — a status polled from the server — put the change in an `aria-live="polite"` region, or the update is silent.
- **Do not make steps interactive.** A timeline reports state; if a step should be navigable, put a [Link](aegov-link.html) in its label rather than making the marker clickable.
- **Mark custom step icons `aria-hidden="true"`.**
- **Use [Progress](aegov-progress.html) instead** when the steps have no names worth showing, and [Tabs](aegov-tabs.html) when the user should be able to move between them freely.

### Keyboard support

The timeline is not interactive and is not a focus stop. If you place links inside step labels, they are ordinary tab stops in document order.

---

## Where to next

- [Progress](aegov-progress.html) — a bar, when the steps do not need names.
- [Badge](aegov-badge.html) — for repeating the current status at a glance.
- [Tabs](aegov-tabs.html) — for freely browsable panels rather than a sequence.
- [Callout](aegov-callout.html) — for explaining a blocked or failed step.
