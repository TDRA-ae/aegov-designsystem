# Callout

<p class="text-lg text-aeblack-500 mb-8">A Callout is a highlighted message block used to draw attention to important inline information — system notices, validation summaries, contextual help, success confirmations, and warnings about consequential actions. Each callout pairs a leading icon with a content area and optional actions, so users immediately understand both the severity and the next step.</p>

## Introduction

The `aegov-callout` component renders a bordered block with four severity variants (`info`, `success`, `warning`, `error`), two visual treatments (`soft`, `solid`), and three sizes. The leading icon is chosen automatically from the variant, but you can replace it with your own SVG via the `icon` slot. Action buttons go in the `actions` slot, and an inline link can be placed on the trailing side via the `link` slot.

```html
<aegov-callout variant="info">
  <p>Submit your Emirates ID renewal at least two weeks before the expiry date to allow time for processing.</p>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-callout variant="info">
    <p>Submit your Emirates ID renewal at least two weeks before the expiry date to allow time for processing.</p>
  </aegov-callout>
</div>

---

## Variants

The `variant` property sets the colour scheme and the default leading icon. Use variants to communicate severity at a glance.

- `default` — neutral grey for general notices.
- `info` — blue for informational tips.
- `success` — green for confirmations and positive outcomes.
- `warning` — amber for cautions and reversible issues.
- `error` — red for blocking errors and validation failures.

```html
<aegov-callout variant="default">
  <p>A neutral notice with no severity attached.</p>
</aegov-callout>

<aegov-callout variant="info">
  <p>UAE Pass authentication is now available for all government services.</p>
</aegov-callout>

<aegov-callout variant="success">
  <p>Your application has been received. You will receive an SMS confirmation shortly.</p>
</aegov-callout>

<aegov-callout variant="warning">
  <p>Your residency permit expires in 14 days. Renew before 15 May to avoid late fees.</p>
</aegov-callout>

<aegov-callout variant="error">
  <p>We could not verify your Emirates ID. Please check the number and try again.</p>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-callout variant="default" class="mb-4">
    <p>A neutral notice with no severity attached.</p>
  </aegov-callout>
  <aegov-callout variant="info" class="mb-4">
    <p>UAE Pass authentication is now available for all government services.</p>
  </aegov-callout>
  <aegov-callout variant="success" class="mb-4">
    <p>Your application has been received. You will receive an SMS confirmation shortly.</p>
  </aegov-callout>
  <aegov-callout variant="warning" class="mb-4">
    <p>Your residency permit expires in 14 days. Renew before 15 May to avoid late fees.</p>
  </aegov-callout>
  <aegov-callout variant="error">
    <p>We could not verify your Emirates ID. Please check the number and try again.</p>
  </aegov-callout>
</div>

---

## Appearance

The `appearance` property switches between two visual treatments. `soft` (default) uses a tinted background with full-saturation text — the standard treatment for inline notices that should not dominate the page. `solid` uses a fully filled colour panel — louder, suitable for blocking errors or hero confirmations.

```html
<aegov-callout appearance="soft" variant="success">
  <p>Soft success — your service request has been logged.</p>
</aegov-callout>

<aegov-callout appearance="solid" variant="success">
  <p>Solid success — your payment was processed successfully.</p>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-callout appearance="soft" variant="info" class="mb-3">
    <p>Soft info — your application is being reviewed by the issuing authority.</p>
  </aegov-callout>
  <aegov-callout appearance="solid" variant="info" class="mb-6">
    <p>Solid info — your application is being reviewed by the issuing authority.</p>
  </aegov-callout>
  <aegov-callout appearance="soft" variant="success" class="mb-3">
    <p>Soft success — your service request has been logged.</p>
  </aegov-callout>
  <aegov-callout appearance="solid" variant="success" class="mb-6">
    <p>Solid success — your payment was processed successfully.</p>
  </aegov-callout>
  <aegov-callout appearance="soft" variant="warning" class="mb-3">
    <p>Soft warning — please verify your contact number before submitting.</p>
  </aegov-callout>
  <aegov-callout appearance="solid" variant="warning" class="mb-6">
    <p>Solid warning — please verify your contact number before submitting.</p>
  </aegov-callout>
  <aegov-callout appearance="soft" variant="error" class="mb-3">
    <p>Soft error — three of the documents you uploaded could not be opened.</p>
  </aegov-callout>
  <aegov-callout appearance="solid" variant="error">
    <p>Solid error — the payment gateway is temporarily unavailable. Please try again shortly.</p>
  </aegov-callout>
</div>

---

## Sizes

The `size` property scales font size, icon size, and padding together. Three tokens are available: `sm`, `base` (default), and `lg`.

| Token  | Text        | Padding      | Icon     |
| ------ | ----------- | ------------ | -------- |
| `sm`   | `text-sm`   | `px-4 py-3`  | `size-5` |
| `base` | `text-base` | `px-5 py-4`  | `size-6` |
| `lg`   | `text-lg`   | `px-6 py-5`  | `size-7` |

```html
<aegov-callout size="sm" variant="info">
  <p>Compact callout, suitable for dense forms and side panels.</p>
</aegov-callout>

<aegov-callout size="base" variant="info">
  <p>Default size, suitable for most page contexts.</p>
</aegov-callout>

<aegov-callout size="lg" variant="info">
  <p>Prominent callout for landing pages and hero confirmations.</p>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-callout size="sm" variant="info" class="mb-3">
    <p>Compact callout, suitable for dense forms and side panels.</p>
  </aegov-callout>
  <aegov-callout size="base" variant="info" class="mb-3">
    <p>Default size, suitable for most page contexts.</p>
  </aegov-callout>
  <aegov-callout size="lg" variant="info">
    <p>Prominent callout for landing pages and hero confirmations.</p>
  </aegov-callout>
</div>

### Responsive sizes

`size` accepts a Tailwind-style responsive string with breakpoint prefixes (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`).

```html
<aegov-callout size="sm md:base xl:lg" variant="info">
  <p>Resizes with the viewport across the sm, md, and xl breakpoints.</p>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-callout size="sm md:base xl:lg" variant="info">
    <p>Resize your browser to see the callout scale across the <code>sm</code>, <code>md</code>, and <code>xl</code> breakpoints.</p>
  </aegov-callout>
</div>

---

## Dismissible Callout

Set `is-dismissible` to render a close button on the trailing side. Clicking it hides the callout (sets internal `isVisible` to `false`) and emits the `aegovCalloutDismiss` event. Listen for the event to update your application state — for example, to remember that the user dismissed an onboarding tip.

```html
<aegov-callout id="onboardingTip" variant="info" is-dismissible>
  <p>Tip: you can save your progress at any time by clicking the floppy disk icon at the bottom of the page.</p>
</aegov-callout>

<script>
  document.getElementById('onboardingTip').addEventListener('aegovCalloutDismiss', () => {
    localStorage.setItem('onboarding-tip-dismissed', 'true');
  });
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-callout variant="info" is-dismissible>
    <p>Tip: you can save your progress at any time by clicking the floppy disk icon at the bottom of the page.</p>
  </aegov-callout>
</div>

---

## Action buttons

The `actions` slot holds buttons rendered below the content. Use it when the message requires the user to make a decision — confirming an outcome, opening a related task, or downloading a generated document.

```html
<aegov-callout variant="success" appearance="soft">
  <p>
    <strong>Application received.</strong> Your Emirates ID renewal request has been logged with reference <code>EID-2026-049381</code>. You will receive an SMS once it has been approved.
  </p>
  <div slot="actions">
    <aegov-button size="sm">View application</aegov-button>
    <aegov-button size="sm" appearance="outline">Download receipt (PDF)</aegov-button>
  </div>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-callout variant="info" appearance="solid">
    <p>
      <strong>Application received.</strong> Your Emirates ID renewal request has been logged with reference <code>EID-2026-049381</code>. You will receive an SMS once it has been approved.
    </p>
    <div slot="actions">
      <aegov-button size="sm">View application</aegov-button>
      <aegov-button size="sm" appearance="outline">Download receipt</aegov-button>
    </div>
  </aegov-callout>
</div>

---

## Inline link

The `link` slot renders an inline link on the trailing side, before the dismiss button. Use it when the callout points the user to a related page or policy and a full action button would be too heavy.

```html
<aegov-callout variant="info">
  <p>A new privacy policy is in effect from 1 May 2026.</p>
  <a slot="link" href="/policies/privacy">Read the policy</a>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-callout variant="info">
    <p>A new privacy policy is in effect from 1 May 2026.</p>
    <a slot="link" href="#">Read the policy</a>
  </aegov-callout>
</div>

---

## Custom icon

When the variant icon does not fit your message — for example, a ministry-specific glyph or a service-specific symbol — slot in your own SVG via the `icon` slot. The slotted icon entirely replaces the default variant icon.

```html
<aegov-callout variant="info">
  <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="size-6" aria-hidden="true">
    <path d="M232,128a104,104,0,1,1-104-104A104.13,104.13,0,0,1,232,128Zm-40-12a4,4,0,1,1-4-4A4,4,0,0,1,192,116Zm-32-32a4,4,0,1,1-4-4A4,4,0,0,1,160,84Zm-72,8a4,4,0,1,1-4-4A4,4,0,0,1,88,92Zm-8,40a4,4,0,1,1-4-4A4,4,0,0,1,80,132Zm32,40a4,4,0,1,1-4-4A4,4,0,0,1,112,172Z" fill="currentColor"/>
  </svg>
  <p>A custom icon adds branded context without losing the variant colour scheme.</p>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-callout variant="info">
    <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24" aria-hidden="true">
      <path d="M232,128a104,104,0,1,1-104-104A104.13,104.13,0,0,1,232,128Zm-40-12a4,4,0,1,1-4-4A4,4,0,0,1,192,116Zm-32-32a4,4,0,1,1-4-4A4,4,0,0,1,160,84Zm-72,8a4,4,0,1,1-4-4A4,4,0,0,1,88,92Zm-8,40a4,4,0,1,1-4-4A4,4,0,0,1,80,132Zm32,40a4,4,0,1,1-4-4A4,4,0,0,1,112,172Z" fill="currentColor"/>
    </svg>
    <p>A custom icon adds branded context without losing the variant colour scheme.</p>
  </aegov-callout>
</div>

---

## Combined Example

This example combines all the available slots — variant icon (default), content, actions, dismiss button, and inline link — to build a rich service-status callout.

```html
<aegov-callout variant="warning" appearance="soft" is-dismissible>
  <p>
    <strong>Action required.</strong> Three documents in your residency renewal application are missing. Please upload them by 30 May to keep your application active.
  </p>
  <div slot="actions">
    <aegov-button size="sm">Resume application</aegov-button>
    <aegov-button size="sm" appearance="outline">Save for later</aegov-button>
  </div>
  <a slot="link" href="/help/required-documents">Which documents?</a>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-callout variant="warning" appearance="soft" is-dismissible>
    <p>
      <strong>Action required.</strong> Three documents in your residency renewal application are missing. Please upload them by 30 May to keep your application active.
    </p>
    <div slot="actions">
      <aegov-button size="sm">Resume application</aegov-button>
      <aegov-button size="sm" appearance="outline">Save for later</aegov-button>
    </div>
    <a slot="link" href="#">Which documents?</a>
  </aegov-callout>
</div>

---

## RTL Support

The callout is direction-agnostic. The icon sits at the inline-start edge, content runs in the middle, and the link/dismiss area sits at the inline-end. In `dir="rtl"` containers the icon and dismiss button automatically swap sides — no additional configuration is required.

```html
<div dir="rtl">
  <aegov-callout variant="warning" is-dismissible>
    <p>
      <strong>إجراء مطلوب.</strong> ثلاث وثائق ناقصة في طلب تجديد الإقامة الخاص بك. يُرجى رفعها قبل 30 مايو للحفاظ على فاعلية الطلب.
    </p>
    <div slot="actions">
      <aegov-button size="sm">استئناف الطلب</aegov-button>
      <aegov-button size="sm" appearance="outline">حفظ للاستكمال لاحقاً</aegov-button>
    </div>
  </aegov-callout>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-callout variant="success" class="mb-4">
    <p>تم استلام طلبك بنجاح. ستصلك رسالة نصية للتأكيد خلال دقائق.</p>
  </aegov-callout>
  <aegov-callout variant="warning" is-dismissible>
    <p>
      <strong>إجراء مطلوب.</strong> ثلاث وثائق ناقصة في طلب تجديد الإقامة الخاص بك. يُرجى رفعها قبل 30 مايو للحفاظ على فاعلية الطلب.
    </p>
    <div slot="actions">
      <aegov-button size="sm">استئناف الطلب</aegov-button>
      <aegov-button size="sm" appearance="outline">حفظ للاستكمال لاحقاً</aegov-button>
    </div>
  </aegov-callout>
</div>

---

## API Reference

### Properties

| Property        | Attribute        | Description                                                          | Type                                                          | Default     |
| --------------- | ---------------- | -------------------------------------------------------------------- | ------------------------------------------------------------- | ----------- |
| `fieldId`       | `field-id`       | Unique ID for the callout root. Auto-generated if not provided.      | `string`                                                      | _generated_ |
| `variant`       | `variant`        | Severity / colour scheme. Also chooses the default leading icon.     | `'default' \| 'error' \| 'warning' \| 'success' \| 'info'`    | `'default'` |
| `appearance`    | `appearance`     | Visual style — `soft` (tinted) or `solid` (filled).                  | `'soft' \| 'solid'`                                           | `'soft'`    |
| `size`          | `size`           | Size token (`sm`, `base`, `lg`) or responsive string.                | `string`                                                      | `'base'`    |
| `isDismissible` | `is-dismissible` | When `true`, renders a dismiss button on the trailing side.          | `boolean`                                                     | `false`     |

### Slots

| Slot      | Description                                                                                  |
| --------- | -------------------------------------------------------------------------------------------- |
| `icon`    | Custom leading icon. When omitted, a variant-specific default icon is rendered automatically. |
| `content` | The main message content (paragraphs, headings, inline formatting).                          |
| `actions` | Action buttons rendered below the content.                                                   |
| `link`    | Inline link rendered on the trailing side, before the dismiss button.                        |

### Events

| Event                  | Detail | Description                                |
| ---------------------- | ------ | ------------------------------------------ |
| `aegovCalloutDismiss`  | `void` | Emitted when the dismiss button is clicked. |

#### Listening for dismiss events

```html
<aegov-callout id="renewalNotice" variant="warning" is-dismissible>
  <p>Your residency permit expires in 14 days.</p>
</aegov-callout>

<script>
  document.getElementById('renewalNotice').addEventListener('aegovCalloutDismiss', () => {
    // Remember the dismiss for this session so the notice doesn't reappear
    sessionStorage.setItem('renewal-notice-dismissed', 'true');
  });
</script>
```

### Pass-through Attributes

| Attribute group  | Forwarded? | Notes                                                                |
| ---------------- | ---------- | -------------------------------------------------------------------- |
| `aria-*`         | Yes        | Forwarded to the callout root element.                               |
| `data-*`         | Yes        | Forwarded to the callout root element.                               |
| `id`             | n/a        | Use `field-id` on the host. The root reflects that value.            |
| `class`, `style` | Allowed    | Applied to the host element only.                                    |

---

## Accessibility

### Built-in behaviour

- The callout root is an ARIA live region whose role is determined by the variant:
  - `variant="error"` and `variant="warning"` → `role="alert"` (assertive — AT announces immediately, interrupting the current reading flow).
  - `variant="info"`, `variant="success"`, and `variant="default"` → `role="status"` (polite — AT waits for an idle moment before announcing).
- The dismiss button is a real `<button type="button">` with a bilingual `aria-label` (`"Close callout"` in English, `"إغلاق الإشعار"` in Arabic, resolved from the nearest `dir="rtl"` ancestor).
- Default variant icons are decorative and marked `aria-hidden="true"`.
- The dismiss SVG is also marked `aria-hidden="true"`.
- The dismiss button touch target is 24 × 24 CSS px (SC 2.5.8).

### Developer responsibilities

- Pair the variant with explicit text — colour alone is not sufficient to convey severity (SC 1.4.1). Users with low vision or colour-blindness rely on the wording.
- Use `variant="error"` only for genuine, blocking errors. Avoid `error` or `warning` for informational notices — the assertive live region interrupts AT users immediately.
- If you slot a custom icon, ensure it is marked `aria-hidden="true"` (or has a meaningful `aria-label` if it conveys unique information not present in the text).
- Action buttons inside the `actions` slot must have visible labels and meet contrast requirements against the chosen `appearance`.
- Live region announcements trigger only when the callout is added or made visible — re-rendering an already-visible callout does not re-announce.
- Calling dismiss removes the callout from view via internal state. To control visibility externally, manage the element directly rather than relying on `is-dismissible`.

### Keyboard support

| Key              | Action                                                          |
| ---------------- | --------------------------------------------------------------- |
| `Tab`            | Move focus into the callout (action buttons, link, dismiss).    |
| `Enter`, `Space` | Activate the focused control.                                   |
| `Shift + Tab`    | Move focus backwards.                                           |
