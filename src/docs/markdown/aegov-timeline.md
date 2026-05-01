# aegov-timeline

A visual representation of progress through a sequence of steps. Use it for multi-stage flows (forms, applications, status tracking) where the user needs context about what's complete, in progress, and still pending. The `aegov-timeline` parent renders the surrounding `<nav>` / `<ol>` and writes shared layout props onto each `aegov-timeline-step` child — your markup only needs to set per-step `status` and content.

## Properties

### variant

Visual style. `default` shows numbered circle indicators with labels; `compact` shows minimal dot indicators.

```html
<aegov-timeline variant="default">
  <aegov-timeline-step status="completed">Application</aegov-timeline-step>
  <aegov-timeline-step status="active">Review</aegov-timeline-step>
  <aegov-timeline-step status="pending">Approval</aegov-timeline-step>
</aegov-timeline>
```

```html
<aegov-timeline variant="compact">
  <aegov-timeline-step status="completed">A</aegov-timeline-step>
  <aegov-timeline-step status="active">B</aegov-timeline-step>
</aegov-timeline>
```

### size

Step indicator size. Accepts `sm`, `base`, or `lg`. Also supports a Tailwind-style responsive string.

```html
<aegov-timeline size="lg">
  <aegov-timeline-step status="active">Step</aegov-timeline-step>
</aegov-timeline>
```

### orientation

Layout direction. `horizontal` (default) lays steps left-to-right; `vertical` stacks steps top-to-bottom.

```html
<aegov-timeline orientation="vertical">
  <aegov-timeline-step status="completed">Step 1</aegov-timeline-step>
  <aegov-timeline-step status="active">Step 2</aegov-timeline-step>
</aegov-timeline>
```

### field-id

Auto-generated when omitted. Reflects to the timeline `<nav>` element's `id`.

### Sub-component: aegov-timeline-step

Each step represents one stage in the sequence. Most layout props (`variant`, `size`, `orientation`, `step-index`, `step-count`, `is-first`, `is-last`, `is-connector-solid`) are written by the parent and should not be set manually.

#### status

Required visual state. One of `completed`, `active`, `pending`. Defaults to `pending`.

```html
<aegov-timeline-step status="completed">Identity</aegov-timeline-step>
<aegov-timeline-step status="active">Verification</aegov-timeline-step>
<aegov-timeline-step status="pending">Approval</aegov-timeline-step>
```

#### description

Optional supplementary text shown below the label.

```html
<aegov-timeline-step status="active" description="In progress">
  Document review
</aegov-timeline-step>
```

#### Slots

- (default) — The step label text. Captured into a screen-reader description.
- `icon` — Optional icon replacing the default number/checkmark. Only shown in `default` (non-compact) variant.

```html
<aegov-timeline-step status="active">
  <svg slot="icon" width="16" height="16" viewBox="0 0 24 24"><!-- ... --></svg>
  Custom icon step
</aegov-timeline-step>
```

## Sizes

`size` accepts a single token or a responsive string using Tailwind-style breakpoint prefixes (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`).

```html
<aegov-timeline size="sm md:base lg:lg">
  <aegov-timeline-step status="active">Responsive</aegov-timeline-step>
</aegov-timeline>
```

| Token  | Indicator size |
| ------ | -------------- |
| `sm`   | Compact        |
| `base` | Default        |
| `lg`   | Large          |

## Examples

### Application progress (horizontal)

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

### Vertical stepper

```html
<aegov-timeline orientation="vertical">
  <aegov-timeline-step status="completed">Account created</aegov-timeline-step>
  <aegov-timeline-step status="completed">Profile completed</aegov-timeline-step>
  <aegov-timeline-step status="active">Verification</aegov-timeline-step>
  <aegov-timeline-step status="pending">Activation</aegov-timeline-step>
</aegov-timeline>
```

### Compact dots

```html
<aegov-timeline variant="compact">
  <aegov-timeline-step status="completed">Step 1</aegov-timeline-step>
  <aegov-timeline-step status="completed">Step 2</aegov-timeline-step>
  <aegov-timeline-step status="active">Step 3</aegov-timeline-step>
  <aegov-timeline-step status="pending">Step 4</aegov-timeline-step>
</aegov-timeline>
```

### Step with custom icon

```html
<aegov-timeline>
  <aegov-timeline-step status="completed">
    <svg slot="icon" width="16" height="16" viewBox="0 0 24 24"><!-- check --></svg>
    Identity verified
  </aegov-timeline-step>
  <aegov-timeline-step status="active">Approval pending</aegov-timeline-step>
</aegov-timeline>
```

## RTL Behavior

When the surrounding context is `dir="rtl"`:

- Horizontal step order flows right-to-left so step 1 appears on the right.
- Vertical orientation is unchanged.
- Connector lines, indicator alignment, and label alignment use logical properties so they mirror automatically.

## API Reference

### aegov-timeline Properties

| Property      | Attribute     | Description                                              | Type                         | Default        |
| ------------- | ------------- | -------------------------------------------------------- | ---------------------------- | -------------- |
| `fieldId`     | `field-id`    | DOM `id` for the `<nav>`. Auto-generated if omitted     | `string`                     | generated      |
| `variant`     | `variant`     | Visual style                                             | `'default' \| 'compact'`     | `'default'`    |
| `size`        | `size`        | Indicator size token or responsive string                | `string`                     | `'base'`       |
| `orientation` | `orientation` | Layout orientation                                       | `'horizontal' \| 'vertical'` | `'horizontal'` |

### aegov-timeline-step Properties

| Property            | Attribute             | Description                                                          | Type                                       | Default        |
| ------------------- | --------------------- | -------------------------------------------------------------------- | ------------------------------------------ | -------------- |
| `status`            | `status`              | Step state                                                           | `'completed' \| 'active' \| 'pending'`     | `'pending'`    |
| `description`       | `description`         | Optional supplementary text below the label                          | `string`                                   | `undefined`    |
| `variant`           | `variant`             | (managed by parent)                                                  | enum                                       | `'default'`    |
| `size`              | `size`                | (managed by parent)                                                  | enum                                       | `'base'`       |
| `orientation`       | `orientation`         | (managed by parent)                                                  | enum                                       | `'horizontal'` |
| `stepIndex`         | `step-index`          | (managed by parent) zero-based position                              | `number`                                   | `0`            |
| `stepCount`         | `step-count`          | (managed by parent) total number of steps                            | `number`                                   | `1`            |
| `isFirst`           | `is-first`            | (managed by parent) whether this is the first step                   | `boolean`                                  | `false`        |
| `isLast`            | `is-last`             | (managed by parent) whether this is the last step                    | `boolean`                                  | `false`        |
| `isConnectorSolid`  | `is-connector-solid`  | (managed by parent) whether the leading connector renders solid      | `boolean`                                  | `false`        |

### Pass-through Attributes

`aegov-timeline` forwards `aria-*` and `data-*` attributes set on the host onto the rendered `<nav>`. Pass-through is not enabled on `aegov-timeline-step`.

### Events

`aegov-timeline` and `aegov-timeline-step` do not emit custom events — the timeline is a presentational, non-interactive component.

### Slots

| Component               | Slot name | Description                                                  |
| ----------------------- | --------- | ------------------------------------------------------------ |
| `aegov-timeline`        | (default) | Place `aegov-timeline-step` children here                    |
| `aegov-timeline-step`   | (default) | The step label text                                          |
| `aegov-timeline-step`   | `icon`    | Optional icon replacing the number/checkmark (default variant only) |

## Accessibility

### Built-in

- The container renders a `<nav>` with `aria-label="Timeline"` so assistive technologies announce it as a navigation landmark.
- Steps render as `<li>` items inside an `<ol>`, preserving order semantics.
- The active step's `<li>` carries `aria-current="step"` so screen readers announce the user's current position.
- Each step includes a visually hidden description (`Step N of M: <label> (current/completed)`) that gives screen reader users full context regardless of variant.
- Decorative connectors and indicator graphics are marked `aria-hidden="true"`.

### Developer responsibilities

- Provide a meaningful label as default slot text on every step. The screen reader description depends on it.
- When using a custom `icon` slot in place of the number/check, ensure the icon itself is `aria-hidden="true"` (the step still gets its `sr-only` label).
- Keep step ordering meaningful — the visual progression is what gives `aria-current="step"` value.
- If you need to override the `aria-label` on the timeline, set `aria-label` directly on the host (it forwards to `<nav>`).

### Notes

- The timeline is not interactive — it does not respond to keyboard or pointer input. If your flow needs clickable step navigation, wrap step content in a button/link or build a separate interactive stepper.
- The connector before a step renders solid only when the previous step's status is `completed`; this is handled automatically by the parent.
