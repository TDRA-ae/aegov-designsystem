# Blockquote

<p class="text-lg text-aeblack-500 mb-8">A Blockquote presents quoted text with attribution — a statement from a minister, a testimonial, an excerpt from legislation. It renders semantic quote markup with a decorative quotation mark, and keeps the author and their title in a consistent position.</p>

## Introduction

```html
<aegov-blockquote author="H.E. Sarah Al Amiri" author-title="Minister of State for Public Education">
  Digital government is not about technology. It is about making services simple enough
  that people do not need to think about them.
</aegov-blockquote>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-xl">
    <aegov-blockquote author="H.E. Sarah Al Amiri" author-title="Minister of State for Public Education">
      Digital government is not about technology. It is about making services simple enough that people do not need to think about them.
    </aegov-blockquote>
  </div>
</div>

---

## Appearance

| Appearance | Look |
| --- | --- |
| `primary` | Default. The quotation mark and accents in the primary colour. |
| `colored` | A tinted panel treatment. |
| `coloured` | An alias for `colored`, accepting the British spelling. |

```html
<aegov-blockquote appearance="primary">…</aegov-blockquote>
<aegov-blockquote appearance="colored">…</aegov-blockquote>
<aegov-blockquote appearance="coloured">…</aegov-blockquote>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-xl space-y-8">
    <div>
      <p class="text-sm text-aeblack-500 mb-2">primary (default)</p>
      <aegov-blockquote appearance="primary" author="H.E. Sarah Al Amiri" author-title="Minister of State">
        Digital government is about making services simple enough that people do not need to think about them.
      </aegov-blockquote>
    </div>
    <div>
      <p class="text-sm text-aeblack-500 mb-2">colored</p>
      <aegov-blockquote appearance="colored" author="H.E. Sarah Al Amiri" author-title="Minister of State">
        Digital government is about making services simple enough that people do not need to think about them.
      </aegov-blockquote>
    </div>
  </div>
</div>

Both spellings resolve to the same treatment — the alias exists so neither convention is wrong. Pick one for your codebase.

---

## Attribution

`author` names the person; `authorTitle` gives their role. Both are optional, but a quote with no attribution is rarely useful in a government context.

```html
<!-- Full attribution -->
<aegov-blockquote author="Ahmed Al Mansouri" author-title="Director of Digital Services">…</aegov-blockquote>

<!-- Author only -->
<aegov-blockquote author="Ahmed Al Mansouri">…</aegov-blockquote>

<!-- No attribution -->
<aegov-blockquote>…</aegov-blockquote>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-xl space-y-8">
    <aegov-blockquote author="Ahmed Al Mansouri" author-title="Director of Digital Services">
      We reduced the renewal journey from eleven steps to four. The remaining four are the ones that actually need a person.
    </aegov-blockquote>
    <aegov-blockquote author="Fatima Al Suwaidi">
      The service told me exactly what I needed before I started. That is the whole difference.
    </aegov-blockquote>
    <aegov-blockquote>
      Every federal service should be usable on a phone, in either language, by anyone.
    </aegov-blockquote>
  </div>
</div>

---

## Citing a source

`cite` takes the URL of the source. It maps to the native `cite` attribute on the `<blockquote>` element.

```html
<aegov-blockquote
  cite="https://u.ae/en/about-the-uae/digital-uae"
  author="UAE Digital Government Strategy"
  author-title="2025–2030"
>
  All federal services will be delivered digitally by default, with in-person channels
  retained for those who need them.
</aegov-blockquote>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-xl">
    <aegov-blockquote cite="https://u.ae" author="UAE Digital Government Strategy" author-title="2025–2030">
      All federal services will be delivered digitally by default, with in-person channels retained for those who need them.
    </aegov-blockquote>
  </div>
</div>

Note that `cite` is **not visible** — it is machine-readable metadata, and browsers do not surface it. If you want the user to be able to reach the source, add a visible [link](aegov-link.html) after the quote as well:

```html
<aegov-blockquote cite="https://u.ae/…" author="UAE Digital Government Strategy">…</aegov-blockquote>
<aegov-text size="sm">
  <aegov-link href="https://u.ae/…">Read the full strategy</aegov-link>
</aegov-text>
```

---

## Extra classes

`extraClass` appends classes to the rendered element — for width, spacing or alignment.

```html
<aegov-blockquote extra-class="my-10 max-w-prose" author="…">…</aegov-blockquote>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-blockquote extra-class="max-w-prose" author="Ahmed Al Mansouri" author-title="Director of Digital Services">
    Constrained to a comfortable reading width with extra-class. Long quotations suffer from the same line-length problem as body copy — keep them between 60 and 100 characters per line.
  </aegov-blockquote>
</div>

---

## Composite example — service testimonial section

```html
<section>
  <aegov-title size="text-h4" heading-type="h2" extra-class="mb-6">
    What people said about the new service
  </aegov-title>

  <div class="grid gap-6 md:grid-cols-2">
    <aegov-card appearance="light" variant="neutral-min">
      <aegov-blockquote author="Fatima Al Suwaidi" author-title="Dubai">
        The service told me exactly what I needed before I started.
      </aegov-blockquote>
    </aegov-card>

    <aegov-card appearance="light" variant="neutral-min">
      <aegov-blockquote author="Omar Al Hashimi" author-title="Sharjah">
        I renewed my card from my phone in four minutes, in Arabic.
      </aegov-blockquote>
    </aegov-card>
  </div>
</section>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-title size="text-h5" heading-type="h2" extra-class="mb-6">What people said about the new service</aegov-title>
  <div class="grid gap-6 md:grid-cols-2">
    <aegov-card field-id="bq-cx-1" appearance="light" variant="neutral-min">
      <aegov-blockquote author="Fatima Al Suwaidi" author-title="Dubai">
        The service told me exactly what I needed before I started. That is the whole difference.
      </aegov-blockquote>
    </aegov-card>
    <aegov-card field-id="bq-cx-2" appearance="light" variant="neutral-min">
      <aegov-blockquote author="Omar Al Hashimi" author-title="Sharjah">
        I renewed my card from my phone in four minutes, in Arabic.
      </aegov-blockquote>
    </aegov-card>
  </div>
</div>

---

## RTL Support

The blockquote is direction-aware. The decorative quotation mark is positioned at the inline-start corner and is **horizontally flipped** in RTL, so it opens in the correct direction rather than appearing mirrored — the component applies that transform itself. Text and attribution align with the reading direction.

```html
<div dir="rtl">
  <aegov-blockquote author="سعادة سارة الأميري" author-title="وزيرة دولة للتعليم العام">
    الحكومة الرقمية ليست عن التقنية، بل عن جعل الخدمات بسيطة إلى حدٍّ لا يحتاج معه الناس إلى التفكير فيها.
  </aegov-blockquote>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-xl space-y-8">
    <aegov-blockquote author="سعادة سارة الأميري" author-title="وزيرة دولة للتعليم العام">
      الحكومة الرقمية ليست عن التقنية، بل عن جعل الخدمات بسيطة إلى حدٍّ لا يحتاج معه الناس إلى التفكير فيها.
    </aegov-blockquote>
    <aegov-blockquote appearance="colored" author="فاطمة السويدي" author-title="دبي">
      أخبرتني الخدمة بما أحتاجه بالضبط قبل أن أبدأ. هذا هو الفرق كله.
    </aegov-blockquote>
  </div>
</div>

Two things to handle yourself:

- **Use the correct Arabic quotation conventions** in your copy where you add your own punctuation. The decorative mark is graphical, not textual.
- **Mark a quote in a different language** with `lang` and `dir` so a screen reader switches voice (WCAG 2.2 SC 3.1.2):

```html
<aegov-blockquote lang="en" dir="ltr" author="…">An English quotation on an Arabic page.</aegov-blockquote>
```

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `appearance` | `appearance` | Visual treatment. `coloured` is an alias for `colored`. | `'primary' \| 'colored' \| 'coloured'` | `'primary'` |
| `author` | `author` | Name of the person or source quoted. | `string` | — |
| `authorTitle` | `author-title` | The author's role, organisation or location. | `string` | — |
| `cite` | `cite` | Source URL. Maps to the native `cite` attribute — **not visible**. | `string` | — |
| `extraClass` | `extra-class` | Extra classes on the rendered element. | `string` | — |

Note `authorTitle` rather than `title` — `title` is a reserved attribute name.

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | The quoted text. |

### Parts

| Part | Description |
| --- | --- |
| `blockquote` | The `<blockquote>` element, for styling past the boundary. |

### Events

None.

### Methods

None.

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the `<blockquote>`. |
| `data-*` | Yes | Forwarded. |
| `lang`, `dir` | Yes | Useful for a quotation in a different language from the page. |
| `class`, `style` | Allowed | Applied to the host. Use `extra-class` or `::part(blockquote)` for the inner element. |

---

## Accessibility

### Built-in behaviour

- The rendered element is a real `<blockquote>`, so the quotation is conveyed structurally rather than only visually — screen readers can announce the boundaries of quoted content.
- `cite` maps to the native attribute, keeping the source machine-readable.
- The decorative quotation mark is marked `aria-hidden="true"`, so it is not read as content.
- The quotation mark is horizontally flipped under `dir="rtl"`, so it opens correctly in Arabic rather than appearing reversed.
- Attribution is rendered inside the quote block in a consistent position, so it is never separated from the words it belongs to.

### Developer responsibilities

- **Attribute your quotes.** An unattributed quotation in a government context reads as an unsourced claim. Set `author`, and `authorTitle` where the role gives it weight.
- **Add a visible link to the source** when the user should be able to reach it — `cite` is invisible and browsers do not expose it.
- **Constrain the line length** to 60–100 characters, as with any prose. A full-width pull quote is harder to read than the body copy around it.
- **Do not use a blockquote for emphasis.** It is for quoted material. To highlight your own text, use a [Callout](aegov-callout.html); to make text larger, use [Text](aegov-text.html) with a size token.
- **Mark language changes** with `lang` and `dir` on the host.
- **Quote accurately**, and use an ellipsis for omissions. This is an editorial obligation rather than a technical one, but it is the main risk with the component.
- **Check contrast** with `appearance="colored"`, where the tinted panel sits behind the text — the 4.5:1 minimum of WCAG 2.2 SC 1.4.3 still applies.
- **Do not put interactive content inside the quote.** A link within quoted text is acceptable; a button is not — the quote is content, not a control surface.

---

## Where to next

- [Text](aegov-text.html) — body copy and line-length guidance.
- [Callout](aegov-callout.html) — for highlighting your own words rather than someone else's.
- [Card](aegov-card.html) — a common container for testimonials.
- [Title](aegov-title.html) — section headings above a set of quotes.
