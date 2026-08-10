# Accordion

<p class="text-lg text-aeblack-500 mb-8">An Accordion is a dynamic user interface component that helps effectively manage and organize content in an interactive, user-friendly manner. It enables content to be collapsed into separate sections that can be expanded upon user interaction. This design is especially beneficial in environments with limited screen space, enhancing readability and providing a clean, organized layout for information presentation.</p>

## Introduction

The `aegov-accordion` component composes a parent wrapper with one or more `aegov-accordion-item` children. The parent owns shared configuration — icon style, heading size, single-open vs. multi-open behaviour, and first/last positioning — and propagates it to each item automatically. You only need to author content inside each item; everything else is wired up for you.

```html
<aegov-accordion default-open="0">
  <aegov-accordion-item heading="What is the UAE Design System?">
    A shared library of UI components built to a common visual and accessibility standard, used by UAE Government services to deliver consistent digital experiences.
  </aegov-accordion-item>
  <aegov-accordion-item heading="Where can I report bugs?">
    File an issue on the project repository, or contact the design system team via your usual support channel.
  </aegov-accordion-item>
  <aegov-accordion-item heading="Is the design system free to use?">
    Yes. The design system is open and available to all UAE federal and local government entities at no cost.
  </aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-accordion default-open="0">
    <aegov-accordion-item heading="What is the UAE Design System?">
      A shared library of UI components built to a common visual and accessibility standard, used by UAE Government services to deliver consistent digital experiences.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Where can I report bugs?">
      File an issue on the project repository, or contact the design system team via your usual support channel.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Is the design system free to use?">
      Yes. The design system is open and available to all UAE federal and local government entities at no cost.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

---

## Single item opened vs. Multiple item opened

By default the accordion behaves like a radio group — opening one item collapses the rest. Set `is-multiple="true"` to allow any number of items to be expanded at once.

### Single item (default)

```html
<aegov-accordion>
  <aegov-accordion-item heading="Application requirements">
    Valid Emirates ID, recent utility bill, and proof of residence.
  </aegov-accordion-item>
  <aegov-accordion-item heading="Processing times">
    Most applications are processed within three business days.
  </aegov-accordion-item>
  <aegov-accordion-item heading="Fees and payment">
    Service fees are payable online through the secure payment gateway.
  </aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-accordion>
    <aegov-accordion-item heading="Application requirements">
      Valid Emirates ID, recent utility bill, and proof of residence.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Processing times">
      Most applications are processed within three business days.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Fees and payment">
      Service fees are payable online through the secure payment gateway.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

### Multiple items

```html
<aegov-accordion is-multiple="true">
  <aegov-accordion-item heading="Eligibility">
    Open to UAE nationals and residents aged 18 and over.
  </aegov-accordion-item>
  <aegov-accordion-item heading="Documents">
    Upload a clear copy of both sides of your Emirates ID.
  </aegov-accordion-item>
  <aegov-accordion-item heading="Confirmation">
    A confirmation message is sent by SMS once your request is received.
  </aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-accordion is-multiple="true">
    <aegov-accordion-item heading="Eligibility">
      Open to UAE nationals and residents aged 18 and over.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Documents">
      Upload a clear copy of both sides of your Emirates ID.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Confirmation">
      A confirmation message is sent by SMS once your request is received.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

---

## Default Open Item

Use `default-open` with a zero-based index to expand a specific item on initial render. This is useful for highlighting the most important question in an FAQ.

```html
<aegov-accordion default-open="1">
  <aegov-accordion-item heading="Section A">
    First section content.
  </aegov-accordion-item>
  <aegov-accordion-item heading="Section B (open by default)">
    Second section content — open on initial render.
  </aegov-accordion-item>
  <aegov-accordion-item heading="Section C">
    Third section content.
  </aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-accordion default-open="1">
    <aegov-accordion-item heading="Section A">
      First section content.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Section B (open by default)">
      Second section content — open on initial render.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Section C">
      Third section content.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

---

## Toggle Icon

The `icon` property selects the visual indicator next to each heading. `chevron` (default) rotates downward as the item expands; `plus` swaps to a minus sign when open.

### Chevron (default)

```html
<aegov-accordion icon="chevron">
  <aegov-accordion-item heading="Privacy policy">…</aegov-accordion-item>
  <aegov-accordion-item heading="Terms of service">…</aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-accordion icon="chevron">
    <aegov-accordion-item heading="Privacy policy">We collect only the data necessary to provide the service.</aegov-accordion-item>
    <aegov-accordion-item heading="Terms of service">By using this service you agree to the terms set out in the official agreement.</aegov-accordion-item>
  </aegov-accordion>
</div>

### Plus / minus

```html
<aegov-accordion icon="plus">
  <aegov-accordion-item heading="Privacy policy">…</aegov-accordion-item>
  <aegov-accordion-item heading="Terms of service">…</aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-accordion icon="plus">
    <aegov-accordion-item heading="Privacy policy">We collect only the data necessary to provide the service.</aegov-accordion-item>
    <aegov-accordion-item heading="Terms of service">By using this service you agree to the terms set out in the official agreement.</aegov-accordion-item>
  </aegov-accordion>
</div>

---

## Bordered Container

Set `is-bordered="true"` to wrap the entire accordion in a rounded outline. Use this when the accordion sits on a page background that needs a visible boundary; omit it when the surrounding card already provides a container.

```html
<aegov-accordion is-bordered="true">
  <aegov-accordion-item heading="Bordered item one">First item content.</aegov-accordion-item>
  <aegov-accordion-item heading="Bordered item two">Second item content.</aegov-accordion-item>
  <aegov-accordion-item heading="Bordered item three">Third item content.</aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-accordion is-bordered="true">
    <aegov-accordion-item heading="Bordered item one">First item content.</aegov-accordion-item>
    <aegov-accordion-item heading="Bordered item two">Second item content.</aegov-accordion-item>
    <aegov-accordion-item heading="Bordered item three">Third item content.</aegov-accordion-item>
  </aegov-accordion>
</div>

---

## Sizes

The `size` property sets the heading typography. Three tokens are available: `sm`, `base` (default), and `lg`. The body content keeps its inherited size — only the trigger heading scales.

| Token  | Heading size   |
| ------ | -------------- |
| `sm`   | 14 px          |
| `base` | 16 px (default) |
| `lg`   | 18 px          |

```html
<aegov-accordion size="sm">…</aegov-accordion>
<aegov-accordion size="base">…</aegov-accordion>
<aegov-accordion size="lg">…</aegov-accordion>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-accordion size="sm">
    <aegov-accordion-item heading="Small heading (14 px)">Compact size suits dense administrative interfaces.</aegov-accordion-item>
    <aegov-accordion-item heading="Another small heading">Compact size suits dense administrative interfaces.</aegov-accordion-item>
  </aegov-accordion>
  <aegov-accordion size="base">
    <aegov-accordion-item heading="Base heading (16 px)">The default size, suitable for most page contexts.</aegov-accordion-item>
    <aegov-accordion-item heading="Another base heading">The default size, suitable for most page contexts.</aegov-accordion-item>
  </aegov-accordion>
  <aegov-accordion size="lg">
    <aegov-accordion-item heading="Large heading (18 px)">Large size works well as a primary FAQ on a landing page.</aegov-accordion-item>
    <aegov-accordion-item heading="Another large heading">Large size works well as a primary FAQ on a landing page.</aegov-accordion-item>
  </aegov-accordion>
</div>

### Responsive sizes

`size` also accepts a Tailwind-style responsive string with the breakpoint prefixes `xs`, `sm`, `md`, `lg`, `xl`, and `2xl`. Each segment overrides smaller breakpoints, so the example below is `sm` on phones, `base` from the `md` breakpoint up, and `lg` from `xl` up.

```html
<aegov-accordion size="sm md:base xl:lg">
  <aegov-accordion-item heading="Resizes with the viewport">
    Resize your browser to see the heading scale.
  </aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-accordion size="sm md:base xl:lg">
    <aegov-accordion-item heading="Resizes with the viewport">
      Resize your browser to see the heading scale across the <code>sm</code>, <code>md</code>, and <code>xl</code> breakpoints.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Same item at every size">
      Body content stays the same — only the trigger heading scales.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

---

## Heading Level

The `heading-level` property controls which HTML heading element (`<h1>`–`<h6>`) wraps each trigger button. Setting the correct level keeps the page outline meaningful for screen readers. The default is `h3`; use `heading-level="2"` when the accordion is the primary content structure on a page, or a higher number when it sits inside an existing heading hierarchy.

```html
<!-- Triggers render inside <h2> elements -->
<aegov-accordion heading-level="2">
  <aegov-accordion-item heading="Trade licence application">
    Submit your application through the business licensing portal.
  </aegov-accordion-item>
  <aegov-accordion-item heading="Processing details">
    Standard applications are processed within 5–7 working days.
  </aegov-accordion-item>
</aegov-accordion>

<!-- Default heading level (h3) -->
<aegov-accordion>
  <aegov-accordion-item heading="Contact information">
    Reach us on 800-UAE-GOV or visit any service centre.
  </aegov-accordion-item>
</aegov-accordion>

<!-- Triggers render inside <h4> elements — inside an h3 section -->
<aegov-accordion heading-level="4">
  <aegov-accordion-item heading="Eligibility criteria">
    All UAE residents and nationals aged 18 and above are eligible.
  </aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="text-sm font-semibold text-aeblack-500 mb-3">heading-level="2"</p>
  <aegov-accordion heading-level="2">
    <aegov-accordion-item heading="Trade licence application">Submit your application through the business licensing portal.</aegov-accordion-item>
    <aegov-accordion-item heading="Processing details">Standard applications are processed within 5–7 working days.</aegov-accordion-item>
  </aegov-accordion>
  <p class="text-sm font-semibold text-aeblack-500 mt-8 mb-3">heading-level="3" (default)</p>
  <aegov-accordion>
    <aegov-accordion-item heading="Contact information">Reach us on 800-UAE-GOV or visit any service centre.</aegov-accordion-item>
  </aegov-accordion>
  <p class="text-sm font-semibold text-aeblack-500 mt-8 mb-3">heading-level="4"</p>
  <aegov-accordion heading-level="4">
    <aegov-accordion-item heading="Eligibility criteria">All UAE residents and nationals aged 18 and above are eligible.</aegov-accordion-item>
  </aegov-accordion>
</div>

---

## Custom Heading Slot

When the trigger needs richer markup — formatting, an inline icon, a status badge — use the `accordion-item-heading` slot instead of the `heading` property. The slot replaces the plain text heading entirely.

```html
<aegov-accordion>
  <aegov-accordion-item>
    <span slot="accordion-item-heading">
      <strong>Step 1.</strong> Verify your identity
      <aegov-badge variant="success" size="sm">Required</aegov-badge>
    </span>
    Use your Emirates ID to confirm your identity before proceeding.
  </aegov-accordion-item>
  <aegov-accordion-item>
    <span slot="accordion-item-heading">
      <strong>Step 2.</strong> Submit your documents
    </span>
    Upload the supporting documents listed in the application form.
  </aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-accordion>
    <aegov-accordion-item>
      <span slot="accordion-item-heading">
        <strong>Step 1.</strong> Verify your identity
        <aegov-badge variant="success" size="sm">Required</aegov-badge>
      </span>
      Use your Emirates ID to confirm your identity before proceeding.
    </aegov-accordion-item>
    <aegov-accordion-item>
      <span slot="accordion-item-heading">
        <strong>Step 2.</strong> Submit your documents
      </span>
      Upload the supporting documents listed in the application form.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

---

## Disabled Items

Set `is-disabled="true"` on an individual item to prevent it from being opened. The trigger renders as visually muted and remains focusable, but is marked with `aria-disabled="true"` to communicate its disabled state to assistive technology.

```html
<aegov-accordion>
  <aegov-accordion-item heading="Active service">
    This service is currently accepting applications.
  </aegov-accordion-item>
  <aegov-accordion-item heading="Coming soon" is-disabled="true">
    This section is not yet available.
  </aegov-accordion-item>
  <aegov-accordion-item heading="Active service">
    This service is currently accepting applications.
  </aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-accordion>
    <aegov-accordion-item heading="Active service">
      This service is currently accepting applications.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Coming soon" is-disabled="true">
      This section is not yet available.
    </aegov-accordion-item>
    <aegov-accordion-item heading="Active service">
      This service is currently accepting applications.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

---

## Combined Example

This example combines `is-multiple`, `icon="plus"`, `is-bordered`, and `default-open` to build a bordered FAQ card that lets users open several questions at once.

```html
<aegov-accordion is-multiple="true" icon="plus" is-bordered="true" default-open="0">
  <aegov-accordion-item heading="How do I create an account?">
    Visit the registration page and verify your Emirates ID. Account activation is instant.
  </aegov-accordion-item>
  <aegov-accordion-item heading="How do I reset my password?">
    Use the &ldquo;Forgot password&rdquo; link on the sign-in page. A reset link is sent to your registered email.
  </aegov-accordion-item>
  <aegov-accordion-item heading="How do I update my contact information?">
    Sign in, open your profile, and edit your phone number or email under <em>Personal details</em>.
  </aegov-accordion-item>
  <aegov-accordion-item heading="How do I delete my account?">
    Contact support — account deletion requires identity verification and cannot be reversed.
  </aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-accordion is-multiple="true" icon="plus" is-bordered="true" default-open="0">
    <aegov-accordion-item heading="How do I create an account?">
      Visit the registration page and verify your Emirates ID. Account activation is instant.
    </aegov-accordion-item>
    <aegov-accordion-item heading="How do I reset my password?">
      Use the &ldquo;Forgot password&rdquo; link on the sign-in page. A reset link is sent to your registered email.
    </aegov-accordion-item>
    <aegov-accordion-item heading="How do I update my contact information?">
      Sign in, open your profile, and edit your phone number or email under <em>Personal details</em>.
    </aegov-accordion-item>
    <aegov-accordion-item heading="How do I delete my account?">
      Contact support — account deletion requires identity verification and cannot be reversed.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

---

## Nested accordion

A nested accordion is the ablity to place a single accordion element inside the item of a parent accordion.

```html
<aegov-accordion is-bordered="true">
    <aegov-accordion-item heading="How can I get a passport">
      <p>To receive a passport, you must follow the steps mentioned here</p>
      <aegov-accordion icon="plus">
        <aegov-accordion-item heading="Privacy policy">We collect only the data necessary to provide the service.</aegov-accordion-item>
        <aegov-accordion-item heading="Terms of service">By using this service you agree to the terms set out in the official agreement.</aegov-accordion-item>
      </aegov-accordion>
    </aegov-accordion-item>
    <aegov-accordion-item heading="Documents required">Second item content.</aegov-accordion-item>
    <aegov-accordion-item heading="Appointment booking">Third item content.</aegov-accordion-item>
  </aegov-accordion>
```
<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-accordion is-bordered="true">
    <aegov-accordion-item heading="How can I get a passport">
      <p>To receive a passport, you must follow the steps mentioned here</p>
      <aegov-accordion icon="plus">
        <aegov-accordion-item heading="Privacy policy">We collect only the data necessary to provide the service.</aegov-accordion-item>
        <aegov-accordion-item heading="Terms of service">By using this service you agree to the terms set out in the official agreement.</aegov-accordion-item>
      </aegov-accordion>
    </aegov-accordion-item>
    <aegov-accordion-item heading="Documents required">Second item content.</aegov-accordion-item>
    <aegov-accordion-item heading="Appointment booking">Third item content.</aegov-accordion-item>
  </aegov-accordion>
</div>

---

## Rich Text Content

The default slot of `aegov-accordion-item` accepts any HTML — lists, paragraphs, tables, or nested components. The content panel expands to fit whatever you place inside it.

```html
<aegov-accordion>
  <aegov-accordion-item heading="Required documents">
    <p>Submit the following when applying for a trade licence:</p>
    <ul>
      <li>Completed application form</li>
      <li>Emirates ID (both sides)</li>
      <li>Passport copy</li>
      <li>Proof of business address</li>
    </ul>
    <p>Additional documents may be requested depending on the business activity type.</p>
  </aegov-accordion-item>
  <aegov-accordion-item heading="Processing time">
    Standard applications are processed within <strong>5–7 working days</strong>.
    Priority processing reduces this to <strong>2–3 working days</strong> for an additional fee.
  </aegov-accordion-item>
</aegov-accordion>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-accordion>
    <aegov-accordion-item heading="Required documents">
      <p>Submit the following when applying for a trade licence:</p>
      <ul>
        <li>Completed application form</li>
        <li>Emirates ID (both sides)</li>
        <li>Passport copy</li>
        <li>Proof of business address</li>
      </ul>
      <p>Additional documents may be requested depending on the business activity type.</p>
    </aegov-accordion-item>
    <aegov-accordion-item heading="Processing time">
      Standard applications are processed within <strong>5–7 working days</strong>.
      Priority processing reduces this to <strong>2–3 working days</strong> for an additional fee.
    </aegov-accordion-item>
  </aegov-accordion>
</div>


---

## RTL Support

The accordion is direction-agnostic. When the document or any ancestor is set to `dir="rtl"` the layout, heading alignment, and toggle icon position mirror automatically. The component uses CSS logical properties for padding, borders, and the expand animation, so no additional configuration is required.

```html
<div dir="rtl">
  <aegov-accordion is-bordered="true" default-open="0">
    <aegov-accordion-item heading="ما هو نظام التصميم الإماراتي؟">
      مكتبة مشتركة من مكوّنات واجهة المستخدم مبنية وفق معيار بصري وإمكانية وصول موحّدة، تستخدمها الجهات الحكومية في دولة الإمارات لتقديم تجربة رقمية متّسقة.
    </aegov-accordion-item>
    <aegov-accordion-item heading="كيف يمكنني الإبلاغ عن خطأ؟">
      افتح طلب دعم على مستودع المشروع، أو تواصل مع فريق نظام التصميم عبر قنوات الدعم المعتمدة لديك.
    </aegov-accordion-item>
    <aegov-accordion-item heading="هل النظام متاح مجاناً؟">
      نعم. نظام التصميم متاح مجاناً لجميع الجهات الحكومية الاتحادية والمحلية في دولة الإمارات.
    </aegov-accordion-item>
  </aegov-accordion>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-accordion is-bordered="true" default-open="0">
    <aegov-accordion-item heading="ما هو نظام التصميم الإماراتي؟">
      مكتبة مشتركة من مكوّنات واجهة المستخدم مبنية وفق معيار بصري وإمكانية وصول موحّدة، تستخدمها الجهات الحكومية في دولة الإمارات لتقديم تجربة رقمية متّسقة.
    </aegov-accordion-item>
    <aegov-accordion-item heading="كيف يمكنني الإبلاغ عن خطأ؟">
      افتح طلب دعم على مستودع المشروع، أو تواصل مع فريق نظام التصميم عبر قنوات الدعم المعتمدة لديك.
    </aegov-accordion-item>
    <aegov-accordion-item heading="هل النظام متاح مجاناً؟">
      نعم. نظام التصميم متاح مجاناً لجميع الجهات الحكومية الاتحادية والمحلية في دولة الإمارات.
    </aegov-accordion-item>
  </aegov-accordion>
</div>

The same accordion with the plus icon and multi-open behaviour, in RTL:

```html
<div dir="rtl">
  <aegov-accordion is-multiple="true" icon="plus">
    <aegov-accordion-item heading="الفقرة الأولى">المحتوى الأول.</aegov-accordion-item>
    <aegov-accordion-item heading="الفقرة الثانية">المحتوى الثاني.</aegov-accordion-item>
    <aegov-accordion-item heading="الفقرة الثالثة">المحتوى الثالث.</aegov-accordion-item>
  </aegov-accordion>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-accordion is-multiple="true" icon="plus">
    <aegov-accordion-item heading="الفقرة الأولى">المحتوى الأول.</aegov-accordion-item>
    <aegov-accordion-item heading="الفقرة الثانية">المحتوى الثاني.</aegov-accordion-item>
    <aegov-accordion-item heading="الفقرة الثالثة">المحتوى الثالث.</aegov-accordion-item>
  </aegov-accordion>
</div>

---

## API Reference

### aegov-accordion Properties

| Property      | Attribute      | Description                                                                | Type                  | Default     |
| ------------- | -------------- | -------------------------------------------------------------------------- | --------------------- | ----------- |
| `fieldId`     | `field-id`     | DOM `id` for the accordion wrapper element. Auto-generated if omitted.     | `string`              | _generated_ |
| `isMultiple`  | `is-multiple`  | When `true`, multiple items can be open at the same time.                  | `boolean`             | `false`     |
| `defaultOpen` | `default-open` | Zero-based index of the item to open on initial render.                    | `number`              | `undefined` |
| `icon`        | `icon`         | Toggle indicator style — `chevron` rotates, `plus` swaps to a minus.        | `'chevron' \| 'plus'` | `'chevron'` |
| `isBordered`  | `is-bordered`  | Adds an outer border and rounded corners around the entire accordion.       | `boolean`             | `false`     |
| `size`        | `size`         | Heading typography size. Accepts a single token or a responsive string.     | `string`              | `'base'`    |
| `headingLevel` | `heading-level` | HTML heading element (1–6) wrapping each trigger button. Cascaded to all items. | `number`         | `3`         |

### aegov-accordion-item Properties

| Property     | Attribute     | Description                                                              | Type                       | Default     |
| ------------ | ------------- | ------------------------------------------------------------------------ | -------------------------- | ----------- |
| `heading`    | `heading`     | Trigger text. Ignored when the `accordion-item-heading` slot is used.    | `string`                   | `undefined` |
| `isOpen`     | `is-open`     | Reflects whether the item is currently expanded. Managed by the parent.  | `boolean`                  | `false`     |
| `isDisabled` | `is-disabled` | Disables the trigger so the item cannot be opened or closed.             | `boolean`                  | `false`     |
| `icon`       | `icon`        | _Set by the parent._ Toggle indicator style.                              | `'chevron' \| 'plus'`      | `'chevron'` |
| `isFirst`    | `is-first`    | _Set by the parent._ Whether this is the first item in the group.         | `boolean`                  | `false`     |
| `isLast`     | `is-last`     | _Set by the parent._ Whether this is the last item in the group.          | `boolean`                  | `false`     |
| `size`       | `size`        | _Set by the parent._ Heading typography size.                             | `'sm' \| 'base' \| 'lg'`   | `'base'`    |
| `headingLevel` | `heading-level` | Heading element (1–6) wrapping the trigger button. Cascaded from the parent; can be overridden per-item. | `number` | `3` |

> Properties marked _Set by the parent_ are written automatically by `aegov-accordion`. Setting them on an item directly will be overridden on the next sync.

### Slots

| Component               | Slot                       | Description                                                              |
| ----------------------- | -------------------------- | ------------------------------------------------------------------------ |
| `aegov-accordion`       | _(default)_                | Place one or more `aegov-accordion-item` children here.                   |
| `aegov-accordion-item`  | `accordion-item-heading`   | Custom heading content. Overrides the `heading` property when supplied.   |
| `aegov-accordion-item`  | _(default)_                | Body content shown when the item is expanded.                             |

### Events

| Event                       | Component               | Detail              | Description                                                                                              |
| --------------------------- | ----------------------- | ------------------- | -------------------------------------------------------------------------------------------------------- |
| `aegovAccordionItemToggle`  | `aegov-accordion-item`  | `{ open: boolean }` | Fired when an item requests open or close. The parent intercepts this event and updates `isOpen`.        |

#### Listening for toggle events

```html
<aegov-accordion id="faq">
  <aegov-accordion-item id="faq-a" heading="A">A</aegov-accordion-item>
  <aegov-accordion-item id="faq-b" heading="B">B</aegov-accordion-item>
</aegov-accordion>

<script>
  // aegovAccordionItemToggle has bubbles: false, so listen on each item directly.
  document.querySelectorAll('#faq aegov-accordion-item').forEach((item) => {
    item.addEventListener('aegovAccordionItemToggle', (e) => {
      console.log('Item toggle requested, open =', e.detail.open);
    });
  });
</script>
```

### Pass-through Attributes

The accordion does not forward any attributes to inner elements — set attributes directly on the host element where they are needed.

| Attribute group | Forwarded? | Where to apply                                                              |
| --------------- | ---------- | --------------------------------------------------------------------------- |
| `aria-*`        | No         | Apply directly to `<aegov-accordion>` or `<aegov-accordion-item>`.           |
| `data-*`        | No         | Apply directly to `<aegov-accordion>` or `<aegov-accordion-item>`.           |
| `id`            | n/a        | Use `field-id` on `<aegov-accordion>`. The trigger and panel use generated IDs. |
| `class`, `style`| Allowed    | Applied to the host element.                                                 |

---

## Accessibility

### Built-in behaviour

- Each trigger is a real `<button>` with `aria-expanded` reflecting the open state and `aria-controls` linked to its panel.
- Each panel uses `role="region"` and `aria-labelledby` pointing at its trigger so screen readers announce the heading–content relationship.
- `Enter` and `Space` toggle the focused item.
- Arrow-key navigation (`ArrowUp` / `ArrowDown` / `Home` / `End`) moves focus between item triggers, matching the [WAI-ARIA Accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/).
- Collapsed panels have the HTML `inert` attribute applied to their content wrapper. This removes all child elements — buttons, links, inputs — from both the keyboard tab sequence and the accessibility tree simultaneously, so there is no focus leakage into hidden content.
- Disabled items set `aria-disabled="true"` on the trigger (rather than the native `disabled` attribute) and do not emit toggle events.

### Developer responsibilities

- Provide a meaningful `heading` (or heading slot) on every item — without it the trigger announces as just "button".
- Focusable controls nested inside a collapsed panel are automatically excluded from the tab order via `inert`. You do not need to manually disable or hide them.
- When using `default-open`, ensure the index points to a real child item.

### Keyboard support

| Key              | Action                                                   |
| ---------------- | -------------------------------------------------------- |
| `Enter`, `Space` | Toggle the focused accordion item.                       |
| `ArrowDown`      | Move focus to the next accordion trigger.                |
| `ArrowUp`        | Move focus to the previous accordion trigger.            |
| `Home`           | Move focus to the first accordion trigger.               |
| `End`            | Move focus to the last accordion trigger.                |
| `Tab`            | Move focus to the next focusable element on the page.    |
| `Shift + Tab`    | Move focus to the previous focusable element on the page.|
