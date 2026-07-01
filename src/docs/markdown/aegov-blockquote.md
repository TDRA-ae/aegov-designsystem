# Blockquote

<p class="text-lg text-aeblack-500 mb-8">A Blockquote is a semantic component for displaying pulled quotes, testimonials, or attributed statements. Use it whenever you need to visually emphasise a quoted passage with optional attribution to an author, role, or external source. The component renders a native <code>&lt;blockquote&gt;</code> element so assistive technology can recognise the quoted content.</p>

## Introduction

The `aegov-blockquote` component supports two visual styles. The default `primary` appearance pulls the quote out of the surrounding text with a decorative quote-mark icon and generous start-side padding. The `colored` appearance fills the block with a primary-tint background and colour-codes the start border, giving testimonial-style emphasis. Both styles render the underlying `<blockquote>` semantically and can carry an attribution (`author`, `author-title`) and a citation URL (`cite`).

```html
<aegov-blockquote
  author="Sheikh Mohammed bin Rashid Al Maktoum"
  author-title="Vice President and Prime Minister of the UAE">
  We do not wait for change, we make change.
</aegov-blockquote>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-blockquote
    author="Sheikh Mohammed bin Rashid Al Maktoum"
    author-title="Vice President and Prime Minister of the UAE">
    We do not wait for change, we make change.
  </aegov-blockquote>
</div>

---

## Appearance

The `appearance` property controls visual style. `primary` (default) renders an inline quote-mark SVG and uses indented padding. `colored` (or the British spelling `coloured`) replaces the icon with a tinted panel and a 10 px coloured start border — useful for testimonial cards, customer stories, or pull-quotes inside long-form content.

### Primary (default)

```html
<aegov-blockquote appearance="primary">
  The future of government services is intelligent, integrated, and citizen-centred.
</aegov-blockquote>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-blockquote appearance="primary">
    The future of government services is intelligent, integrated, and citizen-centred.
  </aegov-blockquote>
</div>

### Coloured testimonial

```html
<aegov-blockquote
  appearance="colored"
  author="Mariam Al Suwaidi"
  author-title="Director of Digital Services, MOI">
  Issuing a new Emirates ID used to take three trips to a service centre. With the new portal, my residents now finish the whole process in under ten minutes.
</aegov-blockquote>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-blockquote
    appearance="colored"
    author="Mariam Al Suwaidi"
    author-title="Director of Digital Services, MOI">
    Issuing a new Emirates ID used to take three trips to a service centre. With the new portal, my residents now finish the whole process in under ten minutes.
  </aegov-blockquote>
</div>

> Tip: both `colored` (US) and `coloured` (UK) spellings are accepted and behave identically.

---

## Attribution

Use `author` and `author-title` to render an attribution footer below the quote. The footer appears only when at least one of the two is supplied; both are optional.

```html
<aegov-blockquote
  author="Khalid Al Mansoori"
  author-title="Resident, Abu Dhabi">
  The new appointment booking flow saved me an entire morning. Everything I needed for my passport renewal was in one place.
</aegov-blockquote>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-blockquote
    author="Khalid Al Mansoori"
    author-title="Resident, Abu Dhabi">
    The new appointment booking flow saved me an entire morning. Everything I needed for my passport renewal was in one place.
  </aegov-blockquote>
</div>

---

## Citation Source

The `cite` property is reflected onto the underlying `<blockquote>` as the native `cite` attribute. It accepts a URL pointing at the canonical source of the quote and is read by some assistive technologies and search engines for provenance.

```html
<aegov-blockquote cite="https://u.ae/about-the-uae/leaders-of-the-uae">
  In the race for excellence there is no finish line.
</aegov-blockquote>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-blockquote
    cite="https://u.ae/about-the-uae/leaders-of-the-uae"
    author="Sheikh Mohammed bin Rashid Al Maktoum">
    In the race for excellence there is no finish line.
  </aegov-blockquote>
</div>

---

## Rich Content

The default slot accepts arbitrary HTML — paragraphs, emphasised text, or inline links. Long quotes spanning multiple paragraphs should wrap each paragraph in `<p>` tags so the underlying blockquote remains semantically correct.

```html
<aegov-blockquote
  author="Dr. Aisha Al Hammadi"
  author-title="Chief Architect, Federal Authority for Identity and Citizenship">
  <p>Identity is the foundation of every digital service we deliver to residents and citizens.</p>
  <p>The systems we are building today must be <em>resilient</em>, <em>private</em>, and <em>accessible</em> by every person in the UAE.</p>
</aegov-blockquote>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-blockquote
    author="Dr. Aisha Al Hammadi"
    author-title="Chief Architect, Federal Authority for Identity and Citizenship">
    <p class="mb-3">Identity is the foundation of every digital service we deliver to residents and citizens.</p>
    <p>The systems we are building today must be <em>resilient</em>, <em>private</em>, and <em>accessible</em> by every person in the UAE.</p>
  </aegov-blockquote>
</div>

---

## RTL Support

The component uses Tailwind logical-property utilities (`ps-*`, `pe-*`, `border-s-*`, `start-0`) for padding, the coloured start border, and the SVG icon's positioning, so everything mirrors automatically in RTL contexts. The decorative quote-mark SVG also includes `rtl:-scale-x-100` so its visual direction flips correctly.

```html
<div dir="rtl">
  <aegov-blockquote
    author="الشيخ محمد بن راشد آل مكتوم"
    author-title="نائب رئيس الدولة، رئيس مجلس الوزراء، حاكم دبي">
    إن دولة الإمارات تؤمن بأن خدمة الناس هي جوهر العمل الحكومي.
  </aegov-blockquote>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-blockquote
    author="الشيخ محمد بن راشد آل مكتوم"
    author-title="نائب رئيس الدولة، رئيس مجلس الوزراء، حاكم دبي">
    إن دولة الإمارات تؤمن بأن خدمة الناس هي جوهر العمل الحكومي.
  </aegov-blockquote>
</div>

The same blockquote in the coloured appearance, in RTL:

```html
<div dir="rtl">
  <aegov-blockquote
    appearance="colored"
    author="مريم السويدي"
    author-title="مديرة الخدمات الرقمية، وزارة الداخلية">
    أصبح إصدار الهوية الإماراتية تجربة مبسّطة بالكامل عبر الإنترنت، وهذا ما يبحث عنه المتعاملون.
  </aegov-blockquote>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-blockquote
    appearance="colored"
    author="مريم السويدي"
    author-title="مديرة الخدمات الرقمية، وزارة الداخلية">
    أصبح إصدار الهوية الإماراتية تجربة مبسّطة بالكامل عبر الإنترنت، وهذا ما يبحث عنه المتعاملون.
  </aegov-blockquote>
</div>

---

## API Reference

### Properties

| Property      | Attribute      | Description                                                                                | Type                                   | Default     |
| ------------- | -------------- | ------------------------------------------------------------------------------------------ | -------------------------------------- | ----------- |
| `appearance`  | `appearance`   | Visual style. `primary` shows a quote icon; `colored` / `coloured` uses a tinted panel.    | `'primary' \| 'colored' \| 'coloured'` | `'primary'` |
| `cite`        | `cite`         | URL of the source. Reflected as the native `cite` attribute on the inner `<blockquote>`.   | `string`                               | `undefined` |
| `author`      | `author`       | Author's name. Rendered in the attribution footer.                                         | `string`                               | `undefined` |
| `authorTitle` | `author-title` | Author's title or role. Rendered in the footer below the author name.                      | `string`                               | `undefined` |
| `extraClass`  | `extra-class`  | Additional CSS classes merged onto the inner `<blockquote>` element.                       | `string`                               | `undefined` |

### Slots

| Slot        | Description                                                              |
| ----------- | ------------------------------------------------------------------------ |
| _(default)_ | The quoted content. Accepts plain text or rich HTML (paragraphs, links). |

### Parts

| Part         | Description                          |
| ------------ | ------------------------------------ |
| `blockquote` | The native `<blockquote>` element.   |

### Events

The component emits no custom events.

### Pass-through Attributes

| Attribute group  | Forwarded?                          | Where to apply                                                                                |
| ---------------- | ----------------------------------- | --------------------------------------------------------------------------------------------- |
| `aria-*`         | Yes — to inner `<blockquote>`        | Set on `<aegov-blockquote>`; forwarded automatically.                                          |
| `data-*`         | Yes — to inner `<blockquote>`        | Set on `<aegov-blockquote>`; forwarded automatically.                                          |
| `title`          | Yes — to inner `<blockquote>`        | Set on `<aegov-blockquote>` to provide a tooltip on the inner element.                          |
| `class`, `style` | Allowed — host element               | Use `extra-class` to add classes to the inner `<blockquote>`.                                  |
| `id`             | Allowed — host element               | Apply to host. The inner `<blockquote>` does not receive an `id`.                              |

---

## Accessibility

### Built-in behaviour

- Renders the native semantic `<blockquote>` element so assistive technology recognises the quoted content as a distinct structural region.
- When `cite` is supplied, the native `cite` attribute is set on the underlying `<blockquote>` element. This is a machine-readable URL for the source document — it is not announced by most screen readers, but it is available to tools that inspect the DOM.
- Author attribution is wrapped in a `<footer>` element (the HTML spec's recommended pattern for in-blockquote attribution), and the author name is wrapped in a `<cite>` element, conveying the structural relationship programmatically (WCAG SC 1.3.1).
- The decorative quote-mark SVG has `aria-hidden="true"` so assistive technology skips it.
- Pass-through attributes (including `aria-*` and `data-*`) are forwarded to the inner `<blockquote>` element.

### Developer responsibilities

- Provide either `cite` (a URL) or `author` / `author-title` so the source of the quote is discoverable by users and by assistive technology.
- The `cite` attribute accepts a URL only — do not pass a person's name to `cite`. Use the `author` prop for the person's name.
- Keep the quoted text faithful to the source. If the quote spans multiple paragraphs, wrap each in a `<p>` tag inside the slot.
- For long quotes, ensure the surrounding context introduces who is being quoted and why — the blockquote itself does not provide a heading.
