# Button Group

<p class="text-lg text-aeblack-500 mb-8">A Button Group joins a set of related buttons into a single visual unit with collapsed borders and shared corner radii. Use it when several actions belong to the same decision — switching a view, choosing a format, or offering a short row of alternatives — so the group reads as one control rather than as scattered buttons.</p>

## Introduction

`aegov-button-group` wraps `aegov-button` children. It works out each button's position in the row — first, middle, last, or the only one — and tells the button, which then collapses the shared borders and squares off the inner corners. You do not set any of that yourself; add buttons and the group handles the seams.

```html
<aegov-button-group>
  <aegov-button appearance="outline">Day</aegov-button>
  <aegov-button appearance="outline">Week</aegov-button>
  <aegov-button appearance="outline">Month</aegov-button>
</aegov-button-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button-group>
    <aegov-button appearance="outline">Day</aegov-button>
    <aegov-button appearance="outline">Week</aegov-button>
    <aegov-button appearance="outline">Month</aegov-button>
  </aegov-button-group>
</div>

The group is a presentational container: it renders a `role="group"` wrapper and nothing else. Each child remains a fully independent button with its own events and state.

---

## Orientation

`orientation` switches the group between a row and a column. The seams follow — a horizontal group collapses left/right borders and a vertical group collapses top/bottom.

```html
<aegov-button-group orientation="horizontal">
  <aegov-button appearance="outline">Day</aegov-button>
  <aegov-button appearance="outline">Week</aegov-button>
  <aegov-button appearance="outline">Month</aegov-button>
</aegov-button-group>

<aegov-button-group orientation="vertical">
  <aegov-button appearance="outline">Newest first</aegov-button>
  <aegov-button appearance="outline">Oldest first</aegov-button>
  <aegov-button appearance="outline">Status</aegov-button>
</aegov-button-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="font-medium mb-3">Horizontal (default)</p>
  <div class="mb-8">
    <aegov-button-group orientation="horizontal">
      <aegov-button appearance="outline">Day</aegov-button>
      <aegov-button appearance="outline">Week</aegov-button>
      <aegov-button appearance="outline">Month</aegov-button>
    </aegov-button-group>
  </div>
  <p class="font-medium mb-3">Vertical</p>
  <aegov-button-group orientation="vertical">
    <aegov-button appearance="outline">Newest first</aegov-button>
    <aegov-button appearance="outline">Oldest first</aegov-button>
    <aegov-button appearance="outline">Status</aegov-button>
  </aegov-button-group>
</div>

Vertical groups suit narrow columns and mobile layouts. On a horizontal group, remember that the row does not wrap — if you need wrapping behaviour, use plain buttons in a flex container instead, because a wrapped group's collapsed borders would break visually.

---

## Variant and appearance

The group does not impose a colour or treatment. Set `variant` and `appearance` on each button, and keep them consistent across the group — mixing appearances inside one group breaks the illusion of a single control.

```html
<aegov-button-group>
  <aegov-button variant="primary">Approve</aegov-button>
  <aegov-button variant="primary">Request changes</aegov-button>
  <aegov-button variant="primary">Reject</aegov-button>
</aegov-button-group>

<aegov-button-group>
  <aegov-button variant="neutral-max" appearance="outline">List</aegov-button>
  <aegov-button variant="neutral-max" appearance="outline">Grid</aegov-button>
  <aegov-button variant="neutral-max" appearance="outline">Map</aegov-button>
</aegov-button-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <p class="font-medium mb-3">Solid</p>
  <div class="mb-6">
    <aegov-button-group>
      <aegov-button variant="primary">Approve</aegov-button>
      <aegov-button variant="primary">Request changes</aegov-button>
      <aegov-button variant="primary">Reject</aegov-button>
    </aegov-button-group>
  </div>
  <p class="font-medium mb-3">Outline</p>
  <div class="mb-6">
    <aegov-button-group>
      <aegov-button variant="neutral-max" appearance="outline">List</aegov-button>
      <aegov-button variant="neutral-max" appearance="outline">Grid</aegov-button>
      <aegov-button variant="neutral-max" appearance="outline">Map</aegov-button>
    </aegov-button-group>
  </div>
  <p class="font-medium mb-3">Soft</p>
  <aegov-button-group>
    <aegov-button variant="secondary" appearance="soft">English</aegov-button>
    <aegov-button variant="secondary" appearance="soft">العربية</aegov-button>
  </aegov-button-group>
</div>

`appearance="outline"` is the most legible choice for a group, because the collapsed borders are what communicate that the buttons belong together.

---

## Sizes

Size is a per-button property. Set the same token on every child so the seams align.

```html
<aegov-button-group>
  <aegov-button size="sm" appearance="outline">Day</aegov-button>
  <aegov-button size="sm" appearance="outline">Week</aegov-button>
  <aegov-button size="sm" appearance="outline">Month</aegov-button>
</aegov-button-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <aegov-button-group>
      <aegov-button size="xs" appearance="outline">Day</aegov-button>
      <aegov-button size="xs" appearance="outline">Week</aegov-button>
      <aegov-button size="xs" appearance="outline">Month</aegov-button>
    </aegov-button-group>
    <div>
      <aegov-button-group>
        <aegov-button size="sm" appearance="outline">Day</aegov-button>
        <aegov-button size="sm" appearance="outline">Week</aegov-button>
        <aegov-button size="sm" appearance="outline">Month</aegov-button>
      </aegov-button-group>
    </div>
    <div>
      <aegov-button-group>
        <aegov-button size="base" appearance="outline">Day</aegov-button>
        <aegov-button size="base" appearance="outline">Week</aegov-button>
        <aegov-button size="base" appearance="outline">Month</aegov-button>
      </aegov-button-group>
    </div>
    <div>
      <aegov-button-group>
        <aegov-button size="lg" appearance="outline">Day</aegov-button>
        <aegov-button size="lg" appearance="outline">Week</aegov-button>
        <aegov-button size="lg" appearance="outline">Month</aegov-button>
      </aegov-button-group>
    </div>
  </div>
</div>

Mixed sizes inside one group produce uneven heights and misaligned borders. If the buttons need different sizes, they are not one control — use separate buttons.

---

## Icon groups

Icon-only buttons make a compact toolbar. Each still needs its own `aria-label`.

```html
<aegov-button-group>
  <aegov-button is-icon appearance="outline" aria-label="Align left">…</aegov-button>
  <aegov-button is-icon appearance="outline" aria-label="Align centre">…</aegov-button>
  <aegov-button is-icon appearance="outline" aria-label="Align right">…</aegov-button>
</aegov-button-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button-group>
    <aegov-button is-icon appearance="outline" variant="neutral-max" aria-label="Align left">
      <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M3 4.75A.75.75 0 0 1 3.75 4h12.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 4.75Zm0 4A.75.75 0 0 1 3.75 8h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 8.75Zm0 4a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" /></svg>
    </aegov-button>
    <aegov-button is-icon appearance="outline" variant="neutral-max" aria-label="Align centre">
      <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M3 4.75A.75.75 0 0 1 3.75 4h12.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 4.75Zm2.5 4A.75.75 0 0 1 6.25 8h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 5.5 8.75Zm-1.5 4a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75a.75.75 0 0 1-.75-.75Z" /></svg>
    </aegov-button>
    <aegov-button is-icon appearance="outline" variant="neutral-max" aria-label="Align right">
      <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M3 4.75A.75.75 0 0 1 3.75 4h12.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 4.75Zm5.5 4A.75.75 0 0 1 9.25 8h7a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1-.75-.75Zm-3 4a.75.75 0 0 1 .75-.75h10a.75.75 0 0 1 0 1.5h-10a.75.75 0 0 1-.75-.75Z" /></svg>
    </aegov-button>
  </aegov-button-group>
</div>

---

## Managing a selected option

The group has no selection state of its own — it is a layout and border-collapse container, not a radio group. If the buttons represent a choice, hold the selection in your application and reflect it on the buttons.

```html
<aegov-button-group id="view-switch">
  <aegov-button appearance="solid"  variant="neutral-max" data-view="list">List</aegov-button>
  <aegov-button appearance="outline" variant="neutral-max" data-view="grid">Grid</aegov-button>
  <aegov-button appearance="outline" variant="neutral-max" data-view="map">Map</aegov-button>
</aegov-button-group>

<script type="module">
  const group = document.querySelector('#view-switch');
  const buttons = [...group.querySelectorAll('aegov-button')];

  group.addEventListener('aegovButtonClick', (e) => {
    const clicked = e.target.closest('aegov-button');
    if (!clicked) return;

    for (const b of buttons) {
      const selected = b === clicked;
      b.appearance = selected ? 'solid' : 'outline';
      b.setAttribute('aria-pressed', String(selected));
    }

    render(clicked.dataset.view);
  });
</script>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button-group>
    <aegov-button appearance="solid" variant="neutral-max" aria-pressed="true">List</aegov-button>
    <aegov-button appearance="outline" variant="neutral-max" aria-pressed="false">Grid</aegov-button>
    <aegov-button appearance="outline" variant="neutral-max" aria-pressed="false">Map</aegov-button>
  </aegov-button-group>
</div>

`aegovButtonClick` bubbles, so one listener on the group is enough. `aria-pressed` is what tells assistive technology which option is active — the appearance change alone is invisible to a screen reader.

If the choice controls which panel of content is visible, reach for [Tabs](aegov-tabs.html) instead. Tabs already implement the roles, arrow-key navigation and panel association that pattern requires.

---

## Composite example — results toolbar

```html
<div class="flex flex-wrap items-center justify-between gap-4">
  <div>
    <p class="text-sm text-aeblack-500">248 applications</p>
  </div>

  <div class="flex flex-wrap items-center gap-3">
    <aegov-button-group>
      <aegov-button size="sm" appearance="outline" variant="neutral-max">Newest</aegov-button>
      <aegov-button size="sm" appearance="outline" variant="neutral-max">Oldest</aegov-button>
      <aegov-button size="sm" appearance="outline" variant="neutral-max">Status</aegov-button>
    </aegov-button-group>

    <aegov-button-group>
      <aegov-button size="sm" is-icon appearance="outline" variant="neutral-max" aria-label="List view">…</aegov-button>
      <aegov-button size="sm" is-icon appearance="outline" variant="neutral-max" aria-label="Grid view">…</aegov-button>
    </aegov-button-group>
  </div>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center justify-between gap-4">
    <p class="text-sm text-aeblack-500">248 applications</p>
    <div class="flex flex-wrap items-center gap-3">
      <aegov-button-group>
        <aegov-button size="sm" appearance="solid" variant="neutral-max" aria-pressed="true">Newest</aegov-button>
        <aegov-button size="sm" appearance="outline" variant="neutral-max" aria-pressed="false">Oldest</aegov-button>
        <aegov-button size="sm" appearance="outline" variant="neutral-max" aria-pressed="false">Status</aegov-button>
      </aegov-button-group>
      <aegov-button-group>
        <aegov-button size="sm" is-icon appearance="outline" variant="neutral-max" aria-label="List view">
          <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M3 4.75A.75.75 0 0 1 3.75 4h12.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 4.75Zm0 5a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 5a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" /></svg>
        </aegov-button>
        <aegov-button size="sm" is-icon appearance="outline" variant="neutral-max" aria-label="Grid view">
          <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M4 4h5v5H4V4Zm7 0h5v5h-5V4ZM4 11h5v5H4v-5Zm7 0h5v5h-5v-5Z" /></svg>
        </aegov-button>
      </aegov-button-group>
    </div>
  </div>
</div>

---

## RTL Support

The group is direction-agnostic. Border collapsing uses logical inline properties, so in a `dir="rtl"` container the first button takes the rounded corners on the right and the last on the left — the reading order and the visual order stay in agreement with no change to your markup. Vertical groups are unaffected by direction.

```html
<div dir="rtl">
  <aegov-button-group>
    <aegov-button appearance="outline">يوم</aegov-button>
    <aegov-button appearance="outline">أسبوع</aegov-button>
    <aegov-button appearance="outline">شهر</aegov-button>
  </aegov-button-group>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="mb-6">
    <aegov-button-group>
      <aegov-button appearance="outline">يوم</aegov-button>
      <aegov-button appearance="outline">أسبوع</aegov-button>
      <aegov-button appearance="outline">شهر</aegov-button>
    </aegov-button-group>
  </div>
  <aegov-button-group orientation="vertical">
    <aegov-button appearance="outline">الأحدث أولاً</aegov-button>
    <aegov-button appearance="outline">الأقدم أولاً</aegov-button>
    <aegov-button appearance="outline">الحالة</aegov-button>
  </aegov-button-group>
</div>

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `orientation` | `orientation` | Lays the group out as a row or a column, and decides which borders collapse. | `'horizontal' \| 'vertical'` | `'horizontal'` |

An invalid value falls back to `'horizontal'` and logs a console warning in development.

Each child button's position in the group is set by the group itself through internal properties. Those are not part of the public API — do not set them by hand.

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | The `aegov-button` children to be joined. A wrapping `<div>` is tolerated, but any other element type logs a console warning. |

### Events

The group emits no events of its own. Each child button emits `aegovButtonClick`, `aegovButtonFocus` and `aegovButtonBlur`, and those bubble — so a single listener on the group can serve every button in it. See [Button](aegov-button.html#events).

### Pass-through Attributes

Pass-through attributes set on `<aegov-button-group>` are forwarded to the inner wrapper element, which is the element carrying `role="group"`.

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the `role="group"` wrapper. This is how you attach `aria-label` to name the group. |
| `data-*` | Yes | Forwarded to the wrapper for analytics or styling hooks. |
| `class`, `style` | Allowed | Applied to the host element only. |

### CSS classes

| Class | Element |
| --- | --- |
| `.aegov-button-group` | The wrapper element. |
| `.button-group--horizontal` | Added when `orientation="horizontal"`. |
| `.button-group--vertical` | Added when `orientation="vertical"`. |

---

## Accessibility

### Built-in behaviour

- The wrapper carries `role="group"`, so assistive technology announces the buttons as a related set rather than as unconnected controls.
- `aria-*` attributes on the host are forwarded to that wrapper, so a group label applies to the group and not to a decorative container.
- Only **direct** `aegov-button` children are treated as members. A button nested inside another button group is left to its own group, so seams never collide.
- Each child keeps its own native `<button>` semantics, focus ring and keyboard behaviour — the group adds no focus management of its own.
- Non-button children log a development console warning, because a stray element inside the group breaks both the visual seam and the announced grouping.

### Developer responsibilities

- **Name the group** with `aria-label`, or associate a visible heading with `aria-labelledby`. `role="group"` without a name tells the user there is a boundary but not what it is for.
- **Use `aria-pressed`** on each button when the group represents a selected option, and keep it in sync. Changing only the `appearance` communicates the selection to sighted users and to nobody else (WCAG 2.2 SC 1.4.1).
- **Give every icon-only button an `aria-label`.** In a toolbar of icons this is the entire accessible content of the control.
- **Use the same `size` and `appearance` on all children.** Beyond looking wrong, mismatched heights make the group's boundary ambiguous.
- **Reach for [Tabs](aegov-tabs.html) if the group switches visible panels**, and for [Radio Group](aegov-radio.html) if it is a form value. Both provide roles and arrow-key navigation that a button group deliberately does not.
- **Keep groups short.** Beyond about five buttons a group becomes hard to scan; a [Select](aegov-select.html) or [Dropdown](aegov-dropdown.html) serves better.

### Keyboard support

The group adds no key handling. Each button is an independent tab stop with the standard button behaviour:

| Key | Action |
| --- | --- |
| `Tab` | Move focus to the next button in the group. |
| `Shift` + `Tab` | Move focus to the previous button. |
| `Enter` | Activate the focused button. |
| `Space` | Activate the focused button. |

Arrow keys deliberately do not move focus between the buttons. A `role="group"` of independent actions is expected to be tabbable; roving-tabindex arrow navigation belongs to `toolbar`, `tablist` and `radiogroup` patterns. If you need that behaviour, use [Tabs](aegov-tabs.html) or [Radio Group](aegov-radio.html).

---

## Where to next

- [Button](aegov-button.html) — the child component, its variants, sizes and events.
- [Tabs](aegov-tabs.html) — for switching between panels of content.
- [Radio Group](aegov-radio.html) — for a single choice submitted with a form.
- [Dropdown](aegov-dropdown.html) — for collapsing many actions behind one trigger.
