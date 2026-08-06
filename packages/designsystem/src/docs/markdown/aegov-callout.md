# Callout

<p class="text-lg text-aeblack-500 mb-8">A Callout draws attention to a message inside the flow of a page — a validation summary above a form, a warning about a service outage, a note explaining what a user needs before they start. It stays in place and stays visible, which makes it the right component for information the user must not miss.</p>

## Introduction

`aegov-callout` renders a bordered panel with a variant icon, your message, and optional actions. Five variants map onto the meanings a government service actually needs.

```html
<aegov-callout>Applications are processed within five working days.</aegov-callout>
<aegov-callout variant="info">Your Emirates ID expires in 30 days.</aegov-callout>
<aegov-callout variant="success">Your application has been submitted.</aegov-callout>
<aegov-callout variant="warning">This service will be unavailable on Friday for maintenance.</aegov-callout>
<aegov-callout variant="error">We could not process your payment.</aegov-callout>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <aegov-callout>Applications are processed within five working days.</aegov-callout>
    <aegov-callout variant="info">Your Emirates ID expires in 30 days.</aegov-callout>
    <aegov-callout variant="success">Your application has been submitted successfully.</aegov-callout>
    <aegov-callout variant="warning">This service will be unavailable on Friday 12 September for scheduled maintenance.</aegov-callout>
    <aegov-callout variant="error">We could not process your payment. No money has been taken.</aegov-callout>
  </div>
</div>

Each variant supplies its own icon, so you do not need to provide one.

---

## Choosing between callout, banner and toast

These three components look similar and are not interchangeable.

| Component | Lives | Use for |
| --- | --- | --- |
| **Callout** | Inline, in the page flow | Information tied to the content around it — a form summary, a section note. Persistent. |
| [Banner](aegov-banner.html) | Fixed or sticky at a page edge | Site-wide announcements — outages, cookie notices, policy changes. Persistent across pages. |
| [Toast](aegov-toast.html) | Floating, temporary | Confirmation that an action just succeeded or failed. Transient. |

The test is scope and lifetime. If the message belongs to one part of one page and should stay until the situation changes, it is a callout.

---

## Variant

| Variant | Meaning |
| --- | --- |
| `default` | Neutral information with no urgency. |
| `info` | Helpful context the user benefits from knowing. |
| `success` | Something completed. |
| `warning` | Something needs attention but is not blocking. |
| `error` | Something failed or is blocking progress. |

The variant does more than change colour: `error` and `warning` are announced assertively by assistive technology, while the other three are announced politely. See [Accessibility](#accessibility).

---

## Appearance

`appearance` switches between a tinted panel and a filled one.

```html
<aegov-callout appearance="soft" variant="info">Soft appearance</aegov-callout>
<aegov-callout appearance="solid" variant="info">Solid appearance</aegov-callout>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <aegov-callout appearance="soft" variant="info">Soft — for messages inside a page body.</aegov-callout>
    <aegov-callout appearance="solid" variant="info">Solid — for stronger emphasis.</aegov-callout>
    <aegov-callout appearance="soft" variant="error">Soft error.</aegov-callout>
    <aegov-callout appearance="solid" variant="error">Solid error.</aegov-callout>
  </div>
</div>

`soft` is the default and the right choice for most in-page use. Reserve `solid` for a message that must dominate its surroundings.

---

## Sizes

Three tokens, controlling padding, font size and icon size.

```html
<aegov-callout size="sm" variant="info">Small</aegov-callout>
<aegov-callout size="base" variant="info">Base</aegov-callout>
<aegov-callout size="lg" variant="info">Large</aegov-callout>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <aegov-callout size="sm" variant="info">Small — for compact contexts such as a card footer.</aegov-callout>
    <aegov-callout size="base" variant="info">Base — the default.</aegov-callout>
    <aegov-callout size="lg" variant="info">Large — for a page-level message that should be read first.</aegov-callout>
  </div>
</div>

### Responsive sizes

`size` accepts a responsive string with the prefixes `xs`, `sm`, `md`, `lg`, `xl` and `2xl`.

```html
<aegov-callout size="sm md:base lg:lg" variant="info">Adapts to the viewport</aegov-callout>
```

---

## Titles and body text

Structure a longer message with a heading and paragraphs in the default slot.

```html
<aegov-callout variant="warning">
  <p class="font-semibold mb-1">Your documents are about to expire</p>
  <p>Your passport copy expires on 30 September 2026. Upload a current copy to avoid delays to your application.</p>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-callout variant="warning">
    <p class="font-semibold mb-1">Your documents are about to expire</p>
    <p>Your passport copy expires on 30 September 2026. Upload a current copy to avoid delays to your application.</p>
  </aegov-callout>
</div>

---

## Links and actions

Two slots offer next steps, and they are **mutually exclusive** — the component enforces this.

| Slot | Use for |
| --- | --- |
| `link` | A single inline link within the message flow. |
| `actions` | One or more buttons or links, in a wrapper element. |

```html
<aegov-callout variant="info">
  Your Emirates ID expires in 30 days.
  <aegov-link slot="link" href="/renew">Renew it now</aegov-link>
</aegov-callout>

<aegov-callout variant="error">
  We could not process your payment. No money has been taken.
  <div slot="actions">
    <aegov-button size="sm" variant="primary">Try again</aegov-button>
    <aegov-button size="sm" appearance="outline">Use a different card</aegov-button>
  </div>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <aegov-callout variant="info">
      Your Emirates ID expires in 30 days.
      <aegov-link slot="link" href="#">Renew it now</aegov-link>
    </aegov-callout>
    <aegov-callout variant="error">
      We could not process your payment. No money has been taken.
      <div slot="actions">
        <aegov-button size="sm" variant="primary">Try again</aegov-button>
        <aegov-button size="sm" appearance="outline">Use a different card</aegov-button>
      </div>
    </aegov-callout>
  </div>
</div>

### The component validates its own configuration

Two rules are checked at load, and breaking either replaces the callout with a visible configuration error rather than rendering something subtly wrong:

1. **You cannot use both `link` and `actions`.** Pick one.
2. **Children of the `actions` wrapper must be `aegov-button` or `aegov-link`.** Any other element is rejected, and the message names the offending tag.

```html
<!-- Renders a configuration error, not a callout -->
<aegov-callout variant="error">
  Message
  <aegov-link slot="link" href="/a">A link</aegov-link>
  <div slot="actions"><aegov-button>And actions</aegov-button></div>
</aegov-callout>
```

This is deliberate: a silently-ignored slot is far harder to notice in review than a loud error during development.

---

## Custom icon

The `icon` slot replaces the variant's default icon.

```html
<aegov-callout variant="info">
  <svg slot="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="2" /><path d="M8 2v4M16 2v4M3 10h18" />
  </svg>
  Appointments are available from 1 September.
</aegov-callout>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-callout variant="info">
    <svg slot="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M8 2v4M16 2v4M3 10h18" /></svg>
    Appointments are available from 1 September 2026.
  </aegov-callout>
</div>

Mark it `aria-hidden="true"` — the icon reinforces the variant visually, and the message carries the meaning.

---

## Dismissible callouts

`is-dismissible` adds a close button. The callout removes itself from view when dismissed, and emits `aegovCalloutDismiss`.

```html
<aegov-callout variant="info" is-dismissible>
  You can now book appointments up to 60 days in advance.
</aegov-callout>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <aegov-callout variant="info" is-dismissible>You can now book appointments up to 60 days in advance.</aegov-callout>
    <aegov-callout variant="success" is-dismissible>Your profile has been updated.</aegov-callout>
  </div>
</div>

Do not make an `error` callout dismissible when it explains why the user cannot continue — dismissing it removes the only explanation available. Dismissal suits informational notices the user has now read.

---

## Composite example — form error summary

The highest-value use of a callout: summarising what went wrong, above the form, with links that move focus to each field.

```html
<aegov-callout id="summary" variant="error" hidden>
  <p class="font-semibold mb-1">There are 3 problems with your application</p>
  <ul class="list-disc ps-5 space-y-1">
    <li><a href="#emirates-id">Emirates ID must be 15 digits</a></li>
    <li><a href="#email">Enter a valid email address</a></li>
    <li><a href="#terms">You must accept the terms of service</a></li>
  </ul>
</aegov-callout>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-lg">
    <aegov-callout variant="error">
      <p class="font-semibold mb-1">There are 3 problems with your application</p>
      <ul class="list-disc ps-5 space-y-1">
        <li><a href="#">Emirates ID must be 15 digits</a></li>
        <li><a href="#">Enter a valid email address</a></li>
        <li><a href="#">You must accept the terms of service</a></li>
      </ul>
    </aegov-callout>
  </div>
</div>

Because an `error` callout carries an assertive live role, revealing it after a failed submit announces the summary immediately — which is exactly the behaviour a screen reader user needs at that moment. See [Bring Your Own Validator](validation-byo.html) for the full pattern.

---

## RTL Support

The callout is direction-aware. In a `dir="rtl"` container the icon moves to the right, the dismiss button to the left, and text, lists and actions align with the text direction. The dismiss button's `aria-label` is translated automatically.

```html
<div dir="rtl">
  <aegov-callout variant="info">
    تنتهي صلاحية هويتك الإماراتية بعد ٣٠ يومًا.
    <aegov-link slot="link" href="/renew">جدّدها الآن</aegov-link>
  </aegov-callout>

  <aegov-callout variant="error">
    <p class="font-semibold mb-1">هناك ٣ مشكلات في طلبك</p>
    <ul class="list-disc ps-5 space-y-1">
      <li><a href="#">يجب أن تكون الهوية الإماراتية ١٥ رقمًا</a></li>
      <li><a href="#">أدخل بريدًا إلكترونيًا صحيحًا</a></li>
    </ul>
  </aegov-callout>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <aegov-callout variant="info">
      تنتهي صلاحية هويتك الإماراتية بعد ٣٠ يومًا.
      <aegov-link slot="link" href="#">جدّدها الآن</aegov-link>
    </aegov-callout>
    <aegov-callout variant="warning" is-dismissible>ستكون هذه الخدمة غير متاحة يوم الجمعة ١٢ سبتمبر للصيانة المجدولة.</aegov-callout>
    <aegov-callout variant="error">
      <p class="font-semibold mb-1">هناك ٣ مشكلات في طلبك</p>
      <ul class="list-disc ps-5 space-y-1">
        <li><a href="#">يجب أن تكون الهوية الإماراتية ١٥ رقمًا</a></li>
        <li><a href="#">أدخل بريدًا إلكترونيًا صحيحًا</a></li>
        <li><a href="#">يجب الموافقة على شروط الخدمة</a></li>
      </ul>
    </aegov-callout>
    <aegov-callout variant="success">
      تم إرسال طلبك بنجاح.
      <div slot="actions">
        <aegov-button size="sm" variant="primary">عرض الطلب</aegov-button>
      </div>
    </aegov-callout>
  </div>
</div>

Note the use of `ps-5` rather than `pl-5` on the list — a logical property, so the indent follows the reading direction. Use logical utilities for any spacing you add inside the slot.

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the callout element. Auto-generated when omitted, reflected. | `string` | _generated_ |
| `variant` | `variant` | Semantic meaning. Also decides the live-region politeness. | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` |
| `appearance` | `appearance` | Visual treatment. | `'soft' \| 'solid'` | `'soft'` |
| `size` | `size` | Size token or responsive string. | `string` — `sm \| base \| lg` | `'base'` |
| `isDismissible` | `is-dismissible` | Renders a close button. The callout hides itself on dismiss. | `boolean` | `false` |

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | The message. Plain text, or headings, paragraphs and lists. |
| `icon` | Replaces the variant's default icon. |
| `link` | A single inline link. **Cannot be combined with `actions`.** |
| `actions` | A wrapper containing `aegov-button` or `aegov-link` children only. **Cannot be combined with `link`.** |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovCalloutDismiss` | `void` | The dismiss button was activated. The callout has already hidden itself. |

```html
<aegov-callout id="notice" variant="info" is-dismissible>New booking window available.</aegov-callout>

<script type="module">
  document.querySelector('#notice').addEventListener('aegovCalloutDismiss', () => {
    localStorage.setItem('notice-seen', 'true');
  });
</script>
```

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the callout element. Note the component sets `role` itself. |
| `data-*` | Yes | Forwarded to the callout element. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host element. |

### CSS classes and data attributes

| Selector | Element |
| --- | --- |
| `.aegov-callout` | The panel. |
| `.callout__main`, `.callout__icon` | Layout regions. |
| `[data-aegov-callout]` | Present on every callout panel — a stable hook for tests. |
| `[data-dismissible="true"]` | Present when `is-dismissible` is set. |

---

## Accessibility

### Built-in behaviour

- **The live-region politeness is chosen from the variant**, which is the component's most important accessibility behaviour:
  - `error` and `warning` render `role="alert"` — announced assertively, interrupting the user, because a blocking problem must not wait.
  - `default`, `info` and `success` render `role="status"` — announced politely, when assistive technology is idle.
- The variant icon is decorative and hidden from assistive technology; the message text carries the meaning.
- The dismiss button is a real `<button type="button">` with a translated `aria-label` and an `aria-hidden` icon.
- Slot misuse produces a **visible configuration error** rather than silently dropping content — both the `link`/`actions` conflict and disallowed `actions` children are caught at load.
- Layout uses logical properties throughout, so the panel mirrors correctly under `dir="rtl"`.

### Developer responsibilities

- **Do not rely on colour alone** to convey the message type (WCAG 2.2 SC 1.4.1). The icon helps, but the text must state the situation: "We could not process your payment", not "Error".
- **Choose the variant for meaning, not for colour.** Using `error` because red looks right will interrupt every screen reader user on the page.
- **Insert the callout when the event happens.** A live region only announces content that appears *after* it is in the DOM — revealing a pre-rendered hidden callout with `hidden` works, but rendering it fresh is more reliable.
- **Do not stack live callouts.** Several assertive regions appearing at once produce an unusable announcement queue; use one summary callout instead.
- **Keep error callouts undismissable** when they explain why the user cannot proceed.
- **Say what to do next**, not just what happened. Pair the message with a `link` or `actions` where a next step exists.
- **Use logical spacing utilities** — `ps-*`, `pe-*`, `ms-*`, `me-*` — inside the slot so your own content mirrors in RTL.
- **Mark a custom `icon` as `aria-hidden="true"`.**
- **Prefer a [Banner](aegov-banner.html) for site-wide notices** and a [Toast](aegov-toast.html) for transient confirmations.

### Keyboard support

| Key | Action |
| --- | --- |
| `Tab` | Move focus through any links or buttons in the message, then to the dismiss button. |
| `Enter`, `Space` | Activate the focused control. |

The callout itself is not a focus stop — it is content, not a control.

---

## Where to next

- [Banner](aegov-banner.html) — for site-wide, edge-anchored announcements.
- [Toast](aegov-toast.html) — for transient confirmations.
- [Badge](aegov-badge.html) — for one-word status labels.
- [Bring Your Own Validator](validation-byo.html) — the form error summary pattern in full.
