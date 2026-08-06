# Button

<p class="text-lg text-aeblack-500 mb-8">A Button triggers an action. Use it to submit a form, confirm a decision, open a dialog, or start a process — anything that changes state rather than navigating somewhere. Buttons carry the strongest interaction affordance in the system, so the number of them on a screen, and their relative weight, is how a user works out what they are meant to do next.</p>

## Introduction

`aegov-button` renders a real `<button>` inside a shadow root and projects your content into it. Two properties do most of the work: `variant` chooses the semantic colour and `appearance` chooses the visual treatment. Everything else — size, loading, icon-only, full width — layers on top.

```html
<aegov-button>Submit application</aegov-button>
<aegov-button variant="secondary">Save draft</aegov-button>
<aegov-button appearance="outline">Cancel</aegov-button>
<aegov-button appearance="soft">Learn more</aegov-button>
<aegov-button variant="danger">Delete request</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-button>Submit application</aegov-button>
    <aegov-button variant="secondary">Save draft</aegov-button>
    <aegov-button appearance="outline">Cancel</aegov-button>
    <aegov-button appearance="soft">Learn more</aegov-button>
    <aegov-button variant="danger">Delete request</aegov-button>
  </div>
</div>

Because the component wraps a native `<button>`, keyboard activation, form submission, and the button role all come from the platform rather than being re-implemented.

---

## Variant

`variant` sets the semantic colour. It answers "how important is this, and is it destructive?" — never "what should it look like".

| Variant | Use for |
| --- | --- |
| `primary` | The main action on the screen. One per view, as a rule. |
| `secondary` | A supporting action of real importance — "Save draft" next to "Submit". |
| `neutral-max` | High-contrast neutral, for toolbars and dense UI where colour would be noise. |
| `neutral-min` | Low-contrast neutral, for the quietest actions in a group. |
| `danger` | Destructive and irreversible actions — delete, withdraw, cancel a submitted request. |

```html
<aegov-button variant="primary">Primary</aegov-button>
<aegov-button variant="secondary">Secondary</aegov-button>
<aegov-button variant="neutral-max">Neutral max</aegov-button>
<aegov-button variant="neutral-min">Neutral min</aegov-button>
<aegov-button variant="danger">Danger</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-button variant="primary">Primary</aegov-button>
    <aegov-button variant="secondary">Secondary</aegov-button>
    <aegov-button variant="neutral-max">Neutral max</aegov-button>
    <aegov-button variant="neutral-min">Neutral min</aegov-button>
    <aegov-button variant="danger">Danger</aegov-button>
  </div>
</div>

---

## Appearance

`appearance` sets the visual treatment at a given variant. Weight descends from `solid` to `link`, which is how you build a visual hierarchy without changing colour.

| Appearance | Treatment | Use for |
| --- | --- | --- |
| `solid` | Filled panel with a subtle inset highlight and a 1px border. | The action you want taken. |
| `outline` | Transparent fill, 2px border. | A secondary action that still needs a clear boundary. |
| `soft` | Tinted fill, no border. | Quiet actions inside dense surfaces such as cards and table rows. |
| `link` | No fill, no border, underline on hover. | The lightest possible action, when a button must sit inline with text. |

```html
<aegov-button appearance="solid">Solid</aegov-button>
<aegov-button appearance="outline">Outline</aegov-button>
<aegov-button appearance="soft">Soft</aegov-button>
<aegov-button appearance="link">Link</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="font-medium mb-3">Primary</p>
  <div class="flex flex-wrap items-center gap-3 mb-6">
    <aegov-button appearance="solid">Solid</aegov-button>
    <aegov-button appearance="outline">Outline</aegov-button>
    <aegov-button appearance="soft">Soft</aegov-button>
    <aegov-button appearance="link">Link</aegov-button>
  </div>
  <p class="font-medium mb-3">Secondary</p>
  <div class="flex flex-wrap items-center gap-3 mb-6">
    <aegov-button variant="secondary" appearance="solid">Solid</aegov-button>
    <aegov-button variant="secondary" appearance="outline">Outline</aegov-button>
    <aegov-button variant="secondary" appearance="soft">Soft</aegov-button>
    <aegov-button variant="secondary" appearance="link">Link</aegov-button>
  </div>
  <p class="font-medium mb-3">Danger</p>
  <div class="flex flex-wrap items-center gap-3 mb-6">
    <aegov-button variant="danger" appearance="solid">Solid</aegov-button>
    <aegov-button variant="danger" appearance="outline">Outline</aegov-button>
    <aegov-button variant="danger" appearance="soft">Soft</aegov-button>
    <aegov-button variant="danger" appearance="link">Link</aegov-button>
  </div>
  <p class="font-medium mb-3">Neutral max / Neutral min</p>
  <div class="flex flex-wrap items-center gap-3">
    <aegov-button variant="neutral-max" appearance="solid">Solid</aegov-button>
    <aegov-button variant="neutral-max" appearance="outline">Outline</aegov-button>
    <aegov-button variant="neutral-min" appearance="solid">Solid</aegov-button>
    <aegov-button variant="neutral-min" appearance="outline">Outline</aegov-button>
  </div>
</div>

### Choosing a combination

The pairing carries meaning, so keep it consistent across a service:

- **One `primary` + `solid` per view.** Two competing solid primaries force the user to decide which one you meant.
- **Pair the primary action with an `outline` or `soft` sibling**, not a second solid.
- **`danger` + `solid`** only when the destructive action is the expected one — a confirmation dialog. In a list of rows, `danger` + `soft` or `outline` reads better and misfires less.

---

## Sizes

`size` controls height, horizontal padding, gap, font size and corner radius together.

| Token | Height | Radius | Padding | Font |
| --- | --- | --- | --- | --- |
| `xs` | `h-9` (36px) | `rounded-md` | `px-2.5` | `text-sm` |
| `sm` | `h-10` (40px) | `rounded-md` | `px-3` | `text-base` |
| `base` | `h-11` (44px) | `rounded-md` | `px-3.5` | `text-base` |
| `lg` | `h-12` (48px) | `rounded-lg` | `px-4` | `text-lg` |
| `xl` | `h-13` (52px) | `rounded-lg` | `px-4.5` | `text-lg` |

```html
<aegov-button size="xs">Extra small</aegov-button>
<aegov-button size="sm">Small</aegov-button>
<aegov-button size="base">Base</aegov-button>
<aegov-button size="lg">Large</aegov-button>
<aegov-button size="xl">Extra large</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-button size="xs">Extra small</aegov-button>
    <aegov-button size="sm">Small</aegov-button>
    <aegov-button size="base">Base</aegov-button>
    <aegov-button size="lg">Large</aegov-button>
    <aegov-button size="xl">Extra large</aegov-button>
  </div>
</div>

Form controls share this scale, so a button placed beside an input at the same size token lines up exactly. Use `lg` for both when building the primary path through a service form.

### Responsive sizes

`size` accepts a Tailwind-style responsive string. The first token is the base value and each `breakpoint:value` segment takes over at that breakpoint and above. Available prefixes are `xs`, `sm`, `md`, `lg`, `xl` and `2xl`.

```html
<aegov-button size="sm md:base xl:lg">Adapts to the viewport</aegov-button>
<aegov-button size="base lg:xl" is-full>Full width, grows on desktop</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button size="sm md:base xl:lg">Adapts to the viewport</aegov-button>
</div>

Resolution happens at runtime through `matchMedia`, so the size changes live as the viewport changes. An unrecognised token is ignored rather than throwing, and the base value is used.

---

## States

### Disabled

`is-disabled` sets the native `disabled` attribute on the inner button, so it leaves the tab order and stops emitting events. `aegovButtonClick` is not emitted while disabled.

```html
<aegov-button is-disabled>Submit application</aegov-button>
<aegov-button appearance="outline" is-disabled>Cancel</aegov-button>
<aegov-button variant="danger" is-disabled>Delete</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-button is-disabled>Submit application</aegov-button>
    <aegov-button appearance="outline" is-disabled>Cancel</aegov-button>
    <aegov-button appearance="soft" is-disabled>Soft</aegov-button>
    <aegov-button variant="danger" is-disabled>Delete</aegov-button>
  </div>
</div>

Prefer not to use a disabled submit button as the only signal that a form is incomplete — a disabled control gives a keyboard or screen reader user nothing to act on and no explanation of what is missing. Let them submit and then tell them what failed. See [Bring Your Own Validator](validation-byo.html).

### Loading

`is-loading` swaps in a spinner ahead of the label and disables the button for the duration. The button reports `aria-busy="true"`, the spinner itself is `aria-hidden`, and a visually hidden live region announces "Loading" — so the state reaches assistive technology without the spinner being read as content.

```html
<aegov-button is-loading>Submitting…</aegov-button>
<aegov-button variant="secondary" is-loading>Saving</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-button is-loading>Submitting…</aegov-button>
    <aegov-button variant="secondary" is-loading>Saving</aegov-button>
    <aegov-button appearance="outline" is-loading>Checking</aegov-button>
  </div>
</div>

Drive it around your async work and always restore it in a `finally`, so a failed request does not leave a permanently spinning button:

```html
<aegov-button id="submit" variant="primary" size="lg">Submit application</aegov-button>

<script type="module">
  const button = document.querySelector('#submit');

  button.addEventListener('aegovButtonClick', async () => {
    button.isLoading = true;
    try {
      await api.submitApplication();
      showToast('Application submitted');
    } catch {
      showToast('Submission failed. Try again.', 'error');
    } finally {
      button.isLoading = false;
    }
  });
</script>
```

Keep the label stable, or change it to a present-tense equivalent — do not empty it. The label is the accessible name, and a spinner with no text is an unnamed button.

---

## Buttons with icons

Slot an inline `<svg>` before or after the label. The button lays out its content with a flex gap sized to the `size` token, so no positioning is needed. Mark decorative icons `aria-hidden="true"` — the label is the accessible name.

```html
<aegov-button>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5" aria-hidden="true">
    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
  </svg>
  New application
</aegov-button>

<aegov-button appearance="outline">
  Download receipt
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5" aria-hidden="true">
    <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.19L6.28 7.97a.75.75 0 0 0-1.06 1.06l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0-1.06-1.06l-2.97 2.97V2.75Z" />
    <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
  </svg>
</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-button>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5" aria-hidden="true"><path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" /></svg>
      New application
    </aegov-button>
    <aegov-button appearance="outline">
      Download receipt
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5" aria-hidden="true"><path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.19L6.28 7.97a.75.75 0 0 0-1.06 1.06l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0-1.06-1.06l-2.97 2.97V2.75Z" /><path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" /></svg>
    </aegov-button>
    <aegov-button variant="secondary" appearance="soft">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" /></svg>
      Mark as complete
    </aegov-button>
  </div>
</div>

### Icon-only buttons

`is-icon` makes the button square at the current size. An icon-only button has no text to act as its accessible name, so you **must** supply `aria-label` — it is forwarded to the inner button.

```html
<aegov-button is-icon aria-label="Print application">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5" aria-hidden="true">
    <path fill-rule="evenodd" d="M5 2.75A2.75 2.75 0 0 1 7.75 0h4.5A2.75 2.75 0 0 1 15 2.75v.5h.25A3.75 3.75 0 0 1 19 7v4.25a2.75 2.75 0 0 1-2.75 2.75H15v2.75A2.75 2.75 0 0 1 12.25 20h-4.5A2.75 2.75 0 0 1 5 17.25V14H3.75A2.75 2.75 0 0 1 1 11.25V7a3.75 3.75 0 0 1 3.75-3.75H5v-.5Z" clip-rule="evenodd" />
  </svg>
</aegov-button>

<aegov-button is-icon appearance="outline" aria-label="Edit details">…</aegov-button>
<aegov-button is-icon variant="danger" appearance="soft" aria-label="Delete draft">…</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-button is-icon aria-label="Add">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5" aria-hidden="true"><path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" /></svg>
    </aegov-button>
    <aegov-button is-icon appearance="outline" aria-label="Edit details">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5" aria-hidden="true"><path d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-.793.793-2.828-2.828.793-.793ZM11.379 5.793 3 14.172V17h2.828l8.38-8.379-2.83-2.828Z" /></svg>
    </aegov-button>
    <aegov-button is-icon variant="danger" appearance="soft" aria-label="Delete draft">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5" aria-hidden="true"><path fill-rule="evenodd" d="M8.75 1a1.75 1.75 0 0 0-1.75 1.75V3.5H4.25a.75.75 0 0 0 0 1.5h11.5a.75.75 0 0 0 0-1.5H13v-.75A1.75 1.75 0 0 0 11.25 1h-2.5ZM5.5 6.5h9l-.63 9.44A2.25 2.25 0 0 1 11.63 18H8.37a2.25 2.25 0 0 1-2.24-2.06L5.5 6.5Z" clip-rule="evenodd" /></svg>
    </aegov-button>
    <aegov-button is-icon size="sm" appearance="soft" aria-label="More options">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5" aria-hidden="true"><path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm5.5 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM14 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" /></svg>
    </aegov-button>
  </div>
</div>

Note that at `xs` the button is 36 × 36 CSS px and at `sm` it is 40 × 40, both comfortably above the 24 × 24 minimum target size required by WCAG 2.2 SC 2.5.8. If you shrink an icon button with your own CSS, do not go below that floor.

---

## Full width

`is-full` stretches the button to fill its container. Useful on mobile layouts and inside narrow cards.

```html
<aegov-button is-full size="lg">Continue to payment</aegov-button>
<aegov-button is-full appearance="outline">Back</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-sm space-y-3">
    <aegov-button is-full size="lg">Continue to payment</aegov-button>
    <aegov-button is-full appearance="outline">Back</aegov-button>
  </div>
</div>

A common responsive pattern is full width on small screens only, which you get by combining `is-full` with your own utility on the host:

```html
<aegov-button is-full class="sm:w-auto">Continue</aegov-button>
```

---

## Font weight

Labels are semibold by default. Set `is-bold="false"` for a lighter label where a button sits in dense, text-heavy UI.

```html
<aegov-button>Bold label (default)</aegov-button>
<aegov-button is-bold="false">Regular label</aegov-button>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-button>Bold label (default)</aegov-button>
    <aegov-button is-bold="false">Regular label</aegov-button>
  </div>
</div>

---

## Button type and forms

`type` maps to the native attribute: `button` (default), `submit` or `reset`. Because the inner element is a real `<button>`, `type="submit"` submits the surrounding form with no wiring on your part.

```html
<form id="application">
  <aegov-input name="fullName" is-required></aegov-input>

  <aegov-button type="submit" variant="primary">Submit</aegov-button>
  <aegov-button type="reset" appearance="outline">Clear form</aegov-button>
</form>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-md">
    <aegov-input field-id="btn-form-name" name="fullName" placeholder="Full name"></aegov-input>
    <div class="flex gap-3 mt-4">
      <aegov-button type="submit" variant="primary">Submit</aegov-button>
      <aegov-button type="reset" appearance="outline">Clear form</aegov-button>
    </div>
  </div>
</div>

The default is deliberately `button`, not `submit` — so a button dropped into a form does not submit it by accident. Set `type="submit"` explicitly on the one that should.

---

## Composite example — service action bar

```html
<div class="flex flex-wrap items-center justify-between gap-4">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-button variant="primary" size="lg">Submit application</aegov-button>
    <aegov-button variant="secondary" appearance="outline" size="lg">Save draft</aegov-button>
  </div>

  <div class="flex flex-wrap items-center gap-2">
    <aegov-button appearance="soft" size="sm">
      <svg class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">…</svg>
      Print
    </aegov-button>
    <aegov-button variant="danger" appearance="link" size="sm">Withdraw request</aegov-button>
  </div>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center justify-between gap-4">
    <div class="flex flex-wrap items-center gap-3">
      <aegov-button variant="primary" size="lg">Submit application</aegov-button>
      <aegov-button variant="secondary" appearance="outline" size="lg">Save draft</aegov-button>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <aegov-button appearance="soft" size="sm">
        <svg class="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5 2.75A1.75 1.75 0 0 1 6.75 1h6.5A1.75 1.75 0 0 1 15 2.75v1.5h.5A2.5 2.5 0 0 1 18 6.75v4.5a2.5 2.5 0 0 1-2.5 2.5H15v3.5A1.75 1.75 0 0 1 13.25 19h-6.5A1.75 1.75 0 0 1 5 17.25v-3.5h-.5A2.5 2.5 0 0 1 2 11.25v-4.5a2.5 2.5 0 0 1 2.5-2.5H5v-1.5Z" clip-rule="evenodd" /></svg>
        Print
      </aegov-button>
      <aegov-button variant="danger" appearance="link" size="sm">Withdraw request</aegov-button>
    </div>
  </div>
</div>

Note the hierarchy: one solid primary, an outline sibling, and the low-stakes utilities dropped to `soft` and `link`. The destructive action is present but deliberately the lightest thing on the row.

---

## RTL Support

The button is direction-agnostic. Content is laid out with flexbox and logical spacing, so slotted icons and labels reverse automatically in a `dir="rtl"` container — a leading icon becomes a trailing one visually without any change to your markup. The loading spinner follows the same flow.

```html
<div dir="rtl">
  <aegov-button variant="primary" size="lg">إرسال الطلب</aegov-button>
  <aegov-button variant="secondary" appearance="outline" size="lg">حفظ كمسودة</aegov-button>
  <aegov-button is-loading>جارٍ الإرسال…</aegov-button>
  <aegov-button variant="danger" appearance="soft">سحب الطلب</aegov-button>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3 mb-6">
    <aegov-button variant="primary" size="lg">إرسال الطلب</aegov-button>
    <aegov-button variant="secondary" appearance="outline" size="lg">حفظ كمسودة</aegov-button>
    <aegov-button appearance="soft">اعرف المزيد</aegov-button>
    <aegov-button variant="danger" appearance="soft">سحب الطلب</aegov-button>
  </div>
  <div class="flex flex-wrap items-center gap-3">
    <aegov-button is-loading>جارٍ الإرسال…</aegov-button>
    <aegov-button>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5" aria-hidden="true"><path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" /></svg>
      طلب جديد
    </aegov-button>
  </div>
</div>

Directional icons are the one thing to check yourself. An arrow that means "next" points right in English and left in Arabic; a chevron in a "back" button mirrors too. Either use a logical icon that reads the same both ways, or swap the glyph based on direction — the component cannot know which of your icons are directional.

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `fieldId` | `field-id` | ID applied to the inner `<button>`. Auto-generated when omitted, and reflected to the host. | `string` | _generated_ |
| `variant` | `variant` | Semantic colour. | `'primary' \| 'secondary' \| 'danger' \| 'neutral-min' \| 'neutral-max'` | `'primary'` |
| `appearance` | `appearance` | Visual treatment. | `'solid' \| 'outline' \| 'soft' \| 'link'` | `'solid'` |
| `size` | `size` | Size token, or a responsive string such as `"sm md:base xl:lg"`. | `string` | `'base'` |
| `type` | `type` | Native button type. | `'button' \| 'submit' \| 'reset'` | `'button'` |
| `isDisabled` | `is-disabled` | Disables the inner button and suppresses events. | `boolean` | `false` |
| `isLoading` | `is-loading` | Shows a spinner, sets `aria-busy`, and disables the button. | `boolean` | `false` |
| `isIcon` | `is-icon` | Renders a square, icon-only button. Requires `aria-label`. | `boolean` | `false` |
| `isFull` | `is-full` | Stretches the button to the container width. | `boolean` | `false` |
| `isBold` | `is-bold` | Semibold label. | `boolean` | `true` |

Invalid values for `variant`, `appearance` and `type` fall back to the default and log a console warning in development rather than throwing.

Position within an `aegov-button-group` is handled by internal properties that the group sets automatically — you never set them yourself. See [Button Group](aegov-button-group.html).

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | Button content — label text, and optionally inline `<svg>` icons before or after it. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovButtonClick` | `MouseEvent` | Fired on click. **Not** emitted while `is-disabled` or `is-loading`. |
| `aegovButtonFocus` | `FocusEvent` | Fired when the inner button receives focus. |
| `aegovButtonBlur` | `FocusEvent` | Fired when the inner button loses focus. |

```html
<aegov-button id="confirm" variant="primary">Confirm</aegov-button>

<script type="module">
  const button = document.querySelector('#confirm');
  button.addEventListener('aegovButtonClick', (e) => {
    console.log('clicked', e.detail);   // the original MouseEvent
  });
</script>
```

The native `click` event still bubbles from the host as well, so a delegated listener on an ancestor keeps working. Prefer `aegovButtonClick` in component code because it is suppressed correctly during loading and disabled states.

### Parts

| Part | Description |
| --- | --- |
| `button` | The inner `<button>` element. Target it with `::part(button)` when you need to reach past the shadow boundary. |

```css
aegov-button::part(button) {
  letter-spacing: 0.01em;
}
```

### Pass-through Attributes

`aegov-button` uses shadow DOM, so pass-through matters more here than elsewhere: attributes you set on the host are forwarded to the inner `<button>` where they can take effect.

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the inner `<button>`. This is how `aria-label`, `aria-expanded`, `aria-controls` and `aria-haspopup` reach the real control. |
| `data-*` | Yes | Forwarded to the inner `<button>` for analytics and testing hooks. |
| `id` | n/a | Use `field-id`. It lands on the inner `<button>` and is reflected on the host. |
| `class`, `style` | Allowed | Applied to the host element only — they cannot restyle the shadow internals. Use `::part(button)` for that. |
| `type`, `disabled` | n/a | Use the `type` and `is-disabled` properties. |

---

## Accessibility

### Built-in behaviour

- The inner element is a real `<button>`, so the button role, `Enter` / `Space` activation, focus behaviour and form participation all come from the platform.
- `is-disabled` sets the native `disabled` attribute — the button leaves the tab order and stops firing events, rather than merely looking inactive.
- `is-loading` sets `aria-busy="true"` on the button, keeps the label in place, marks the spinner `aria-hidden="true"`, and adds a visually hidden `aria-live="polite"` region announcing "Loading".
- `aria-*` attributes on the host are forwarded to the inner button, so ARIA relationships you declare actually apply to the focusable element.
- A visible focus ring is rendered with a 2px outline in a per-variant colour chosen to meet the 3:1 non-text contrast requirement of WCAG 2.2 SC 1.4.11 against each variant's own background.
- Every size token is at least 36 CSS px tall, above the 24 × 24 minimum target size of WCAG 2.2 SC 2.5.8.

### Developer responsibilities

- **Give icon-only buttons an `aria-label`.** With `is-icon` there is no text to name the button, and an unnamed button is unusable with a screen reader.
- **Mark decorative icons `aria-hidden="true"`** so they are not announced alongside the label.
- **Keep the label meaningful in isolation.** "Submit application" works out of context; "Submit", "Click here" and "OK" do not. Screen reader users often navigate by a list of buttons with no surrounding text.
- **Do not use colour alone to convey that an action is destructive** (WCAG 2.2 SC 1.4.1). `variant="danger"` is a reinforcement of the word "Delete", not a replacement for it.
- **Keep the label stable during loading.** Replacing it with an empty spinner removes the accessible name mid-interaction.
- **Use a button for actions and a link for navigation.** If it changes the URL, it should be an [`aegov-link`](aegov-link.html), which gives the user middle-click, right-click and copy-link behaviour that a button cannot.
- **Declare `aria-expanded` and `aria-controls` yourself** when a button toggles a disclosure you built by hand. Components that own their own disclosure — dropdown, popover, accordion — already do this.
- **Check that a focused button is not obscured** by sticky headers or banners (WCAG 2.2 SC 2.4.11).

### Keyboard support

| Key | Action |
| --- | --- |
| `Tab` | Move focus to the button. Skipped when `is-disabled` or `is-loading`. |
| `Shift` + `Tab` | Move focus to the previous focusable element. |
| `Enter` | Activate the button. |
| `Space` | Activate the button. |

---

## Where to next

- [Button Group](aegov-button-group.html) — joining related buttons into a single segmented control.
- [Link](aegov-link.html) — navigation, including links styled to look exactly like buttons.
- [Input](aegov-input.html) — the matching size scale for form controls.
- [Modal](aegov-modal.html) and [Drawer](aegov-drawer.html) — components a button commonly opens.
