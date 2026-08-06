# Accordion

<p class="text-lg text-aeblack-500 mb-8">An Accordion collapses sections of content behind headings the user can expand. Use it for FAQs, long reference material, and optional detail that would otherwise make a page hard to scan. Unlike <a href="aegov-tabs.html">Tabs</a>, an accordion can have several sections open at once and scales to many more of them.</p>

## Introduction

`aegov-accordion` manages a set of `aegov-accordion-item` children. Each item has a heading and a content region.

```html
<aegov-accordion>
  <aegov-accordion-item heading="How long does an application take?">
    <p slot="accordion-item-content">Most applications are processed within five working days.</p>
  </aegov-accordion-item>

  <aegov-accordion-item heading="Can I track my application?">
    <p slot="accordion-item-content">Yes — sign in and open My applications.</p>
  </aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-accordion field-id="ac-intro">
    <aegov-accordion-item heading="How long does an application take?">
      <p slot="accordion-item-content">Most applications are processed within five working days. Applications needing additional documents may take longer.</p>
    </aegov-accordion-item>
    <aegov-accordion-item heading="Can I track my application?">
      <p slot="accordion-item-content">Yes — sign in and open <strong>My applications</strong> to see the current status.</p>
    </aegov-accordion-item>
    <aegov-accordion-item heading="What if my documents have expired?">
      <p slot="accordion-item-content">Upload current copies before submitting. Expired documents will delay your application.</p>
    </aegov-accordion-item>
  </aegov-accordion>
</div>

The parent cascades `icon`, `size` and `headingLevel` to every item, so set them once.

---

## Heading

Two ways to provide the heading:

```html
<!-- The heading property, for plain text -->
<aegov-accordion-item heading="How long does an application take?">
  <p slot="accordion-item-content">…</p>
</aegov-accordion-item>

<!-- The heading slot, for markup -->
<aegov-accordion-item>
  <span slot="accordion-item-heading">
    Fees <aegov-badge size="sm" variant="camel">Updated</aegov-badge>
  </span>
  <p slot="accordion-item-content">…</p>
</aegov-accordion-item>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-accordion field-id="ac-head">
    <aegov-accordion-item heading="Plain text heading">
      <p slot="accordion-item-content">Supplied through the heading property.</p>
    </aegov-accordion-item>
    <aegov-accordion-item>
      <span slot="accordion-item-heading">Fees <aegov-badge size="sm" variant="camel">Updated</aegov-badge></span>
      <p slot="accordion-item-content">Supplied through the heading slot, so it can contain markup.</p>
    </aegov-accordion-item>
  </aegov-accordion>
</div>

The slot takes precedence when both are present.

---

## Heading level

`headingLevel` sets which `<hN>` element wraps each item's trigger button, so the accordion slots into your document outline correctly. Default is `3`.

```html
<!-- Under an <h1> page title with an <h2> section heading above it -->
<aegov-accordion heading-level="3">…</aegov-accordion>
```

Choose the level from the accordion's position in the page outline, not from how large you want the text. This is the same rule as any heading.

**Nested accordions increment automatically.** An accordion inside another accordion's content raises its own heading level by one, capped at 6 — so the outline stays valid without you tracking it.

```html
<aegov-accordion heading-level="2">
  <aegov-accordion-item heading="Fees and payment">
    <div slot="accordion-item-content">
      <!-- This inner accordion uses level 3 automatically -->
      <aegov-accordion>
        <aegov-accordion-item heading="Card payments">
          <p slot="accordion-item-content">Visa and Mastercard are accepted.</p>
        </aegov-accordion-item>
      </aegov-accordion>
    </div>
  </aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-accordion field-id="ac-nest" heading-level="2" is-bordered>
    <aegov-accordion-item heading="Fees and payment">
      <div slot="accordion-item-content">
        <p class="mb-3">Fees vary by service. Payment is taken at the end of the application.</p>
        <aegov-accordion field-id="ac-nest-in">
          <aegov-accordion-item heading="Card payments">
            <p slot="accordion-item-content">Visa and Mastercard are accepted.</p>
          </aegov-accordion-item>
          <aegov-accordion-item heading="Bank transfer">
            <p slot="accordion-item-content">Allow three working days for the transfer to clear.</p>
          </aegov-accordion-item>
        </aegov-accordion>
      </div>
    </aegov-accordion-item>
    <aegov-accordion-item heading="Refunds">
      <p slot="accordion-item-content">Service fees are non-refundable once an application has been submitted.</p>
    </aegov-accordion-item>
  </aegov-accordion>
</div>

Keep nesting to one level. Two levels of collapsed content is very hard to navigate, particularly with a screen reader.

---

## Single or multiple open

By default opening one item closes the others. `isMultiple` allows several open at once.

```html
<aegov-accordion>…</aegov-accordion>
<aegov-accordion is-multiple>…</aegov-accordion>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-8">
    <div>
      <p class="text-sm text-aeblack-500 mb-2">Default — one at a time</p>
      <aegov-accordion field-id="ac-single">
        <aegov-accordion-item heading="First question"><p slot="accordion-item-content">Opening another closes this one.</p></aegov-accordion-item>
        <aegov-accordion-item heading="Second question"><p slot="accordion-item-content">Only one is open at a time.</p></aegov-accordion-item>
      </aegov-accordion>
    </div>
    <div>
      <p class="text-sm text-aeblack-500 mb-2">is-multiple</p>
      <aegov-accordion field-id="ac-multi" is-multiple>
        <aegov-accordion-item heading="First question"><p slot="accordion-item-content">This can stay open…</p></aegov-accordion-item>
        <aegov-accordion-item heading="Second question"><p slot="accordion-item-content">…while this one is also open.</p></aegov-accordion-item>
      </aegov-accordion>
    </div>
  </div>
</div>

Prefer `isMultiple` for reference content, where the user may want to compare two answers. The single-open default suits a compact list where vertical space is tight.

---

## Default open item

`defaultOpen` takes the **zero-based index** of the item to open initially.

```html
<aegov-accordion default-open="0">…</aegov-accordion>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-accordion field-id="ac-def" default-open="0">
    <aegov-accordion-item heading="Opened by default"><p slot="accordion-item-content">This item is open on load because default-open is 0.</p></aegov-accordion-item>
    <aegov-accordion-item heading="Closed"><p slot="accordion-item-content">Closed on load.</p></aegov-accordion-item>
  </aegov-accordion>
</div>

Note this is an index, unlike [Tabs](aegov-tabs.html) where `defaultOpen` takes an ID.

---

## Icon

```html
<aegov-accordion icon="chevron">…</aegov-accordion>
<aegov-accordion icon="plus">…</aegov-accordion>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-8">
    <aegov-accordion field-id="ac-ic-1" icon="chevron">
      <aegov-accordion-item heading="Chevron icon (default)"><p slot="accordion-item-content">Rotates when open.</p></aegov-accordion-item>
    </aegov-accordion>
    <aegov-accordion field-id="ac-ic-2" icon="plus">
      <aegov-accordion-item heading="Plus icon"><p slot="accordion-item-content">Becomes a minus when open.</p></aegov-accordion-item>
    </aegov-accordion>
  </div>
</div>

---

## Bordered

`isBordered` adds a border around the accordion and dividers between items, which helps when it sits directly on a page background rather than inside a card.

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-8">
    <aegov-accordion field-id="ac-b-1">
      <aegov-accordion-item heading="Without borders"><p slot="accordion-item-content">Default.</p></aegov-accordion-item>
      <aegov-accordion-item heading="Second item"><p slot="accordion-item-content">Default.</p></aegov-accordion-item>
    </aegov-accordion>
    <aegov-accordion field-id="ac-b-2" is-bordered>
      <aegov-accordion-item heading="With borders"><p slot="accordion-item-content">is-bordered.</p></aegov-accordion-item>
      <aegov-accordion-item heading="Second item"><p slot="accordion-item-content">is-bordered.</p></aegov-accordion-item>
    </aegov-accordion>
  </div>
</div>

---

## Sizes

Three tokens, controlling heading font size and padding. `size` accepts a responsive string.

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-6">
    <aegov-accordion field-id="ac-s-1" size="sm"><aegov-accordion-item heading="Small"><p slot="accordion-item-content">Small size.</p></aegov-accordion-item></aegov-accordion>
    <aegov-accordion field-id="ac-s-2" size="base"><aegov-accordion-item heading="Base"><p slot="accordion-item-content">Base size.</p></aegov-accordion-item></aegov-accordion>
    <aegov-accordion field-id="ac-s-3" size="lg"><aegov-accordion-item heading="Large"><p slot="accordion-item-content">Large size.</p></aegov-accordion-item></aegov-accordion>
  </div>
</div>

---

## Disabled items

```html
<aegov-accordion-item heading="Not yet available" is-disabled>
  <p slot="accordion-item-content">…</p>
</aegov-accordion-item>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-accordion field-id="ac-dis" is-bordered>
    <aegov-accordion-item heading="Available"><p slot="accordion-item-content">Open me.</p></aegov-accordion-item>
    <aegov-accordion-item heading="Available after your application is reviewed" is-disabled><p slot="accordion-item-content">Hidden until review completes.</p></aegov-accordion-item>
  </aegov-accordion>
</div>

Disabled items are skipped by keyboard navigation. Say why the section is unavailable in the heading itself.

---

## Reacting to toggles

Each item emits `aegovAccordionItemToggle`, which bubbles.

```html
<aegov-accordion id="faq">…</aegov-accordion>

<script type="module">
  document.querySelector('#faq').addEventListener('aegovAccordionItemToggle', (e) => {
    const item = e.target;
    if (e.detail.open) {
      analytics.track('faq_opened', { question: item.heading });
    }
  });
</script>
```

This is also the hook for lazy-loading a section's content the first time it opens.

---

## Composite example — service FAQ

```html
<h2>Frequently asked questions</h2>

<aegov-accordion is-multiple is-bordered heading-level="3" icon="plus">
  <aegov-accordion-item heading="How long does an Emirates ID renewal take?">
    <p slot="accordion-item-content">
      Most renewals are processed within five working days.
      <aegov-link href="/service-charter">See the service charter</aegov-link>.
    </p>
  </aegov-accordion-item>

  <aegov-accordion-item heading="What documents do I need?">
    <div slot="accordion-item-content">
      <ul class="list-disc ps-5 space-y-1">
        <li>A valid passport copy</li>
        <li>Your current Emirates ID</li>
        <li>A recent photograph</li>
      </ul>
    </div>
  </aegov-accordion-item>

  <aegov-accordion-item heading="Can I renew on behalf of a family member?">
    <p slot="accordion-item-content">Yes, with a signed authorisation and both Emirates ID copies.</p>
  </aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="text-h5 font-bold mb-4">Frequently asked questions</p>
  <aegov-accordion field-id="ac-cx" is-multiple is-bordered heading-level="3" icon="plus">
    <aegov-accordion-item heading="How long does an Emirates ID renewal take?">
      <p slot="accordion-item-content">Most renewals are processed within five working days. <aegov-link href="#">See the service charter</aegov-link>.</p>
    </aegov-accordion-item>
    <aegov-accordion-item heading="What documents do I need?">
      <div slot="accordion-item-content">
        <ul class="list-disc ps-5 space-y-1">
          <li>A valid passport copy</li>
          <li>Your current Emirates ID</li>
          <li>A recent photograph</li>
        </ul>
      </div>
    </aegov-accordion-item>
    <aegov-accordion-item heading="Can I renew on behalf of a family member?">
      <p slot="accordion-item-content">Yes, with a signed authorisation and copies of both Emirates IDs.</p>
    </aegov-accordion-item>
  </aegov-accordion>
</div>

Note `ps-5` on the list — a logical property, so the indent follows the reading direction.

---

## RTL Support

The accordion is direction-aware. In a `dir="rtl"` container the icon moves to the inline-start edge, headings and content align right, and the chevron rotates in the mirrored direction. Arrow-key navigation is vertical, so direction does not affect it.

```html
<div dir="rtl">
  <aegov-accordion is-multiple is-bordered icon="plus">
    <aegov-accordion-item heading="كم تستغرق عملية تجديد الهوية الإماراتية؟">
      <p slot="accordion-item-content">تُعالج معظم عمليات التجديد خلال خمسة أيام عمل.</p>
    </aegov-accordion-item>
    <aegov-accordion-item heading="ما المستندات المطلوبة؟">
      <div slot="accordion-item-content">
        <ul class="list-disc ps-5 space-y-1">
          <li>صورة جواز سفر صالح</li>
          <li>الهوية الإماراتية الحالية</li>
        </ul>
      </div>
    </aegov-accordion-item>
  </aegov-accordion>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-accordion field-id="ac-rtl" is-multiple is-bordered icon="plus">
    <aegov-accordion-item heading="كم تستغرق عملية تجديد الهوية الإماراتية؟">
      <p slot="accordion-item-content">تُعالج معظم عمليات التجديد خلال خمسة أيام عمل. <aegov-link href="#">راجع ميثاق الخدمة</aegov-link>.</p>
    </aegov-accordion-item>
    <aegov-accordion-item heading="ما المستندات المطلوبة؟">
      <div slot="accordion-item-content">
        <ul class="list-disc ps-5 space-y-1">
          <li>صورة جواز سفر صالح</li>
          <li>الهوية الإماراتية الحالية</li>
          <li>صورة شخصية حديثة</li>
        </ul>
      </div>
    </aegov-accordion-item>
    <aegov-accordion-item heading="هل يمكنني التجديد نيابة عن أحد أفراد الأسرة؟">
      <p slot="accordion-item-content">نعم، مع تفويض موقّع وصور من هويتي الطرفين.</p>
    </aegov-accordion-item>
  </aegov-accordion>
</div>

---

## API Reference

### aegov-accordion Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the wrapper. Auto-generated when omitted, reflected. | `string` | _generated_ |
| `isMultiple` | `is-multiple` | Allow several items open at once. | `boolean` | `false` |
| `defaultOpen` | `default-open` | **Zero-based index** of the item to open initially. | `number` | — |
| `icon` | `icon` | Expand indicator. Cascades to items. | `'chevron' \| 'plus'` | `'chevron'` |
| `isBordered` | `is-bordered` | Border around the accordion and dividers between items. | `boolean` | `false` |
| `size` | `size` | Size token or responsive string. Cascades to items. | `string` — `sm \| base \| lg` | `'base'` |
| `headingLevel` | `heading-level` | Heading level (1–6) wrapping each trigger. Auto-incremented in a nested accordion. | `number` | `3` |

### aegov-accordion-item Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `heading` | `heading` | Heading text. The `accordion-item-heading` slot takes precedence. | `string` | — |
| `isDisabled` | `is-disabled` | Cannot be opened, and skipped by arrow keys. | `boolean` | `false` |

Open state, icon, size, heading level and first/last position are managed by the parent.

### Slots

| Slot | On | Description |
| --- | --- | --- |
| _(default)_ | accordion | The `aegov-accordion-item` children. |
| `accordion-item-heading` | item | Heading markup. Takes precedence over the `heading` property. |
| `accordion-item-content` | item | The collapsible content. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovAccordionItemToggle` | `{ open: boolean }` | An item was opened or closed. Bubbles, so listen on the accordion. |

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the wrapper. |
| `data-*` | Yes | Forwarded to the wrapper. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host element. |

---

## Accessibility

### Built-in behaviour

- Each trigger is a real `<button>` wrapped in an `<hN>` element at the configured `headingLevel`, so the accordion appears in a screen reader's heading list and can be navigated by heading — which is the primary way users move through an FAQ.
- `aria-expanded` on each trigger tracks its state, and the trigger is associated with its content region.
- **Nested accordions increment `headingLevel` automatically**, capped at 6, so the document outline stays valid without manual bookkeeping.
- Disabled items report their state and are skipped by arrow-key navigation.
- Arrow-key navigation moves between item headers, with `Home` and `End` support.
- The expand icon is decorative and hidden from assistive technology.
- Layout uses logical properties, so the icon and content mirror under `dir="rtl"`.

### Developer responsibilities

- **Set `headingLevel` to match your page outline.** The default `3` assumes an `<h2>` section heading above. A wrong level breaks heading navigation, which is the main reason an accordion is usable at all.
- **Write headings that answer-in-brief.** "How long does renewal take?" is scannable; "Timing" is not.
- **Do not hide essential content.** Anything required to complete a task belongs on the page. Collapsed content is missed, is not searched by in-page find in some browsers, and does not print.
- **Do not put form fields in an accordion** where validation may fail inside a closed section. If you must, open the section containing the first error on submit.
- **Prefer `isMultiple` for reference content** so users can compare answers.
- **Keep nesting to one level.**
- **Say why a disabled item is unavailable**, in the heading.
- **Use logical spacing utilities** — `ps-*`, `pe-*` — in your content so it mirrors in RTL.
- **Consider whether the content should be collapsed at all.** For three short paragraphs, plain headings and text are better than an accordion.

### Keyboard support

| Key | Action |
| --- | --- |
| `Tab` | Move focus to the next accordion trigger, then into the open content. |
| `Enter`, `Space` | Toggle the focused item. |
| `ArrowDown` | Move focus to the next item's trigger. |
| `ArrowUp` | Move focus to the previous item's trigger. |
| `Home` | Move focus to the first trigger. |
| `End` | Move focus to the last trigger. |

Disabled items are skipped.

---

## Where to next

- [Tabs](aegov-tabs.html) — for a small number of parallel panels.
- [Navblock](aegov-navblock.html) — collapsible navigation rather than content.
- [Callout](aegov-callout.html) — for information that must not be collapsed.
- [Title](aegov-title.html) and [Text](aegov-text.html) — for content inside the panels.
