# Avatar Group

<p class="text-lg text-aeblack-500 mb-8">An Avatar Group shows several people as a compact row of overlapping avatars, with an optional count for the ones that do not fit. Use it to indicate who is involved in something — the officers assigned to a case, the members of a team — where the individual names matter less than the group at a glance.</p>

## Introduction

`aegov-avatar-group` wraps [`aegov-avatar`](aegov-avatar.html) children and cascades its resolved `size` to each of them.

```html
<aegov-avatar-group>
  <aegov-avatar alt="Ahmed Al Mansouri">AM</aegov-avatar>
  <aegov-avatar alt="Fatima Al Suwaidi">FS</aegov-avatar>
  <aegov-avatar alt="Omar Al Hashimi">OH</aegov-avatar>
</aegov-avatar-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-avatar-group>
    <aegov-avatar alt="Ahmed Al Mansouri">AM</aegov-avatar>
    <aegov-avatar alt="Fatima Al Suwaidi">FS</aegov-avatar>
    <aegov-avatar alt="Omar Al Hashimi">OH</aegov-avatar>
    <aegov-avatar alt="Sara Al Ali">SA</aegov-avatar>
  </aegov-avatar-group>
</div>

Set `size` on the group rather than on each avatar — it propagates, and mismatched sizes break the overlap.

---

## Variant

| Variant | Overlap |
| --- | --- |
| `default` | A moderate overlap, with each face clearly visible. |
| `compact` | A tighter overlap, for narrow spaces. |

```html
<aegov-avatar-group variant="default">…</aegov-avatar-group>
<aegov-avatar-group variant="compact">…</aegov-avatar-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-6">
    <div>
      <p class="text-sm text-aeblack-500 mb-2">default</p>
      <aegov-avatar-group variant="default">
        <aegov-avatar alt="Ahmed Al Mansouri">AM</aegov-avatar>
        <aegov-avatar alt="Fatima Al Suwaidi">FS</aegov-avatar>
        <aegov-avatar alt="Omar Al Hashimi">OH</aegov-avatar>
      </aegov-avatar-group>
    </div>
    <div>
      <p class="text-sm text-aeblack-500 mb-2">compact</p>
      <aegov-avatar-group variant="compact">
        <aegov-avatar alt="Ahmed Al Mansouri">AM</aegov-avatar>
        <aegov-avatar alt="Fatima Al Suwaidi">FS</aegov-avatar>
        <aegov-avatar alt="Omar Al Hashimi">OH</aegov-avatar>
      </aegov-avatar-group>
    </div>
  </div>
</div>

---

## Sizes

`size` takes the full avatar scale and cascades to every child.

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-5">
    <div class="flex items-center gap-4"><span class="text-xs text-aeblack-500 w-10">xs</span><aegov-avatar-group size="xs"><aegov-avatar alt="A">A</aegov-avatar><aegov-avatar alt="B">B</aegov-avatar><aegov-avatar alt="C">C</aegov-avatar></aegov-avatar-group></div>
    <div class="flex items-center gap-4"><span class="text-xs text-aeblack-500 w-10">sm</span><aegov-avatar-group size="sm"><aegov-avatar alt="A">A</aegov-avatar><aegov-avatar alt="B">B</aegov-avatar><aegov-avatar alt="C">C</aegov-avatar></aegov-avatar-group></div>
    <div class="flex items-center gap-4"><span class="text-xs text-aeblack-500 w-10">base</span><aegov-avatar-group size="base"><aegov-avatar alt="A">A</aegov-avatar><aegov-avatar alt="B">B</aegov-avatar><aegov-avatar alt="C">C</aegov-avatar></aegov-avatar-group></div>
    <div class="flex items-center gap-4"><span class="text-xs text-aeblack-500 w-10">lg</span><aegov-avatar-group size="lg"><aegov-avatar alt="A">A</aegov-avatar><aegov-avatar alt="B">B</aegov-avatar><aegov-avatar alt="C">C</aegov-avatar></aegov-avatar-group></div>
    <div class="flex items-center gap-4"><span class="text-xs text-aeblack-500 w-10">xl</span><aegov-avatar-group size="xl"><aegov-avatar alt="A">A</aegov-avatar><aegov-avatar alt="B">B</aegov-avatar><aegov-avatar alt="C">C</aegov-avatar></aegov-avatar-group></div>
  </div>
</div>

### Responsive sizes

`size` accepts a responsive string with the prefixes `xs`, `sm`, `md`, `lg`, `xl` and `2xl`.

```html
<aegov-avatar-group size="xs md:sm lg:base">…</aegov-avatar-group>
```

---

## Overflow count

`moreCount` adds a final tile showing how many people are not displayed. `moreText` overrides its text.

```html
<aegov-avatar-group more-count="12">
  <aegov-avatar alt="Ahmed Al Mansouri">AM</aegov-avatar>
  <aegov-avatar alt="Fatima Al Suwaidi">FS</aegov-avatar>
  <aegov-avatar alt="Omar Al Hashimi">OH</aegov-avatar>
</aegov-avatar-group>

<aegov-avatar-group more-count="12" more-text="+12 more">…</aegov-avatar-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-6">
    <div>
      <p class="text-sm text-aeblack-500 mb-2">more-count="12"</p>
      <aegov-avatar-group more-count="12">
        <aegov-avatar alt="Ahmed Al Mansouri">AM</aegov-avatar>
        <aegov-avatar alt="Fatima Al Suwaidi">FS</aegov-avatar>
        <aegov-avatar alt="Omar Al Hashimi">OH</aegov-avatar>
      </aegov-avatar-group>
    </div>
    <div>
      <p class="text-sm text-aeblack-500 mb-2">more-count="99" with a custom more-text</p>
      <aegov-avatar-group more-count="99" more-text="+99">
        <aegov-avatar alt="Ahmed Al Mansouri">AM</aegov-avatar>
        <aegov-avatar alt="Fatima Al Suwaidi">FS</aegov-avatar>
      </aegov-avatar-group>
    </div>
  </div>
</div>

The overflow tile is a real button, and activating it emits `aegovAvatarGroupMore` — so it can open the full list. Its accessible label is generated from the count and translated automatically, so a screen reader announces something like "Show 12 more" rather than "+12".

```html
<aegov-avatar-group id="assignees" more-count="12">…</aegov-avatar-group>
<aegov-drawer id="all-assignees" label="All assignees" position="right">…</aegov-drawer>

<script type="module">
  const group = document.querySelector('#assignees');
  const drawer = document.querySelector('#all-assignees');

  group.addEventListener('aegovAvatarGroupMore', () => drawer.show());
</script>
```

If you do not handle the event, the tile is a button that does nothing — so either wire it up or leave `moreCount` unset and show the count as plain text beside the group instead.

---

## Composite example — case assignees

```html
<div class="flex items-center justify-between">
  <div class="flex items-center gap-3">
    <aegov-avatar-group size="sm" more-count="4">
      <aegov-avatar alt="Ahmed Al Mansouri">AM</aegov-avatar>
      <aegov-avatar alt="Fatima Al Suwaidi">FS</aegov-avatar>
      <aegov-avatar alt="Omar Al Hashimi">OH</aegov-avatar>
    </aegov-avatar-group>
    <aegov-text size="sm" extra-class="text-aeblack-500">7 officers assigned</aegov-text>
  </div>

  <aegov-button size="sm" appearance="outline">Manage assignees</aegov-button>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="max-w-lg space-y-6">
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <aegov-avatar-group size="sm" more-count="4">
          <aegov-avatar alt="Ahmed Al Mansouri">AM</aegov-avatar>
          <aegov-avatar alt="Fatima Al Suwaidi">FS</aegov-avatar>
          <aegov-avatar alt="Omar Al Hashimi">OH</aegov-avatar>
        </aegov-avatar-group>
        <aegov-text size="sm" extra-class="text-aeblack-500">7 officers assigned</aegov-text>
      </div>
      <aegov-button size="sm" appearance="outline">Manage</aegov-button>
    </div>
    <aegov-card field-id="ag-cx-card" appearance="light" variant="neutral-min">
      <div class="flex items-start justify-between gap-4">
        <div>
          <aegov-title size="text-h6" heading-type="h3" extra-class="mb-1">APP-2026-0041827</aegov-title>
          <aegov-text size="sm" extra-class="text-aeblack-500">Emirates ID renewal</aegov-text>
        </div>
        <aegov-badge variant="camel">Under review</aegov-badge>
      </div>
      <aegov-separator gap="4" appearance="light" variant="neutral-min"></aegov-separator>
      <div class="flex items-center gap-3">
        <aegov-avatar-group size="xs" more-count="2">
          <aegov-avatar alt="Ahmed Al Mansouri">AM</aegov-avatar>
          <aegov-avatar alt="Fatima Al Suwaidi">FS</aegov-avatar>
        </aegov-avatar-group>
        <aegov-text size="sm" extra-class="text-aeblack-500">4 reviewers</aegov-text>
      </div>
    </aegov-card>
  </div>
</div>

Note the visible count text beside each group. A row of overlapping faces is decorative shorthand — the number is what actually carries the information, and it should be readable without hovering or counting.

---

## RTL Support

The group is direction-aware. In a `dir="rtl"` container the avatars stack from the right, with the overlap and the overflow tile mirrored, so the first avatar in the DOM appears on the right. The group's own accessible label and the overflow button's label are both translated automatically.

```html
<div dir="rtl">
  <aegov-avatar-group size="sm" more-count="4">
    <aegov-avatar alt="أحمد المنصوري">أم</aegov-avatar>
    <aegov-avatar alt="فاطمة السويدي">فس</aegov-avatar>
    <aegov-avatar alt="عمر الهاشمي">عه</aegov-avatar>
  </aegov-avatar-group>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-6 max-w-lg">
    <div class="flex items-center gap-3">
      <aegov-avatar-group size="sm" more-count="4">
        <aegov-avatar alt="أحمد المنصوري">أم</aegov-avatar>
        <aegov-avatar alt="فاطمة السويدي">فس</aegov-avatar>
        <aegov-avatar alt="عمر الهاشمي">عه</aegov-avatar>
      </aegov-avatar-group>
      <aegov-text size="sm" extra-class="text-aeblack-500">٧ موظفين معنيين</aegov-text>
    </div>
    <aegov-avatar-group variant="compact" size="base">
      <aegov-avatar alt="أحمد المنصوري">أم</aegov-avatar>
      <aegov-avatar alt="فاطمة السويدي">فس</aegov-avatar>
      <aegov-avatar alt="سارة العلي">سع</aegov-avatar>
    </aegov-avatar-group>
  </div>
</div>

Counts in your own text are content — use Arabic-Indic numerals where the rest of your Arabic copy does, as above. Note the overflow tile's own number comes from `moreCount` and renders as a Western digit unless you override it with `moreText`.

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `variant` | `variant` | Overlap tightness. | `'default' \| 'compact'` | `'default'` |
| `size` | `size` | Size token or responsive string. Propagated to every child avatar. | `string` — `xs \| sm \| base \| lg \| xl \| 2xl \| 3xl` | `'base'` |
| `moreCount` | `more-count` | How many people are not shown. Renders an overflow button when greater than 0. | `number` | `0` |
| `moreText` | `more-text` | Overrides the overflow tile's visible text. | `string` | — |

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | The `aegov-avatar` children. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovAvatarGroupMore` | `void` | The overflow button was activated. |

### Methods

None.

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded to the group wrapper, which carries `role="group"` and a translated default label. |
| `data-*` | Yes | Forwarded. |
| `class`, `style` | Allowed | Applied to the host element. |

---

## Accessibility

### Built-in behaviour

- The wrapper carries `role="group"` with a translated accessible name, so the avatars are announced as a related set rather than as loose images.
- Each child avatar keeps its own `role="img"` and `alt`-derived name — see [Avatar](aegov-avatar.html#accessibility).
- **The overflow tile is a real `<button>`** with a translated, count-aware `aria-label` such as "Show 12 more", rather than an unlabelled "+12".
- Size is propagated from the group, so the overlap geometry stays correct.
- Stacking order and the overflow position use logical properties, so the group mirrors under `dir="rtl"`.

### Developer responsibilities

- **Give every child avatar an `alt`.** In a group this matters more than usual — without it a screen reader user hears "User avatar" repeated once per person.
- **Show the total as visible text** beside the group. A row of overlapping faces plus a "+12" tile is not a readable count; "7 officers assigned" is.
- **Handle `aegovAvatarGroupMore`**, or do not set `moreCount`. An overflow button that does nothing is a focusable dead end.
- **Keep the visible set small.** Three to five avatars before the overflow is the practical limit; beyond that the overlap hides the faces it is meant to show.
- **Do not use an avatar group as the only route to a list of people.** It is a summary; provide a real list — in a [Drawer](aegov-drawer.html) or on a page — for anyone who needs the names.
- **Set `size` on the group, not the children.**
- **Override `moreText`** if your page uses Arabic-Indic numerals, since the generated count is a Western digit.
- **Reconsider the pattern for accessibility-first pages.** Overlapping avatars are decorative by nature; a plain list of names is more useful to more people, and in a government service it is often the better default.

### Keyboard support

| Key | Action |
| --- | --- |
| `Tab` | Move focus to the overflow button, when present. Individual avatars are not focusable. |
| `Enter`, `Space` | Activate the overflow button. |

---

## Where to next

- [Avatar](aegov-avatar.html) — the child component, its fallback and status behaviour.
- [Drawer](aegov-drawer.html) — a good home for the full list behind the overflow button.
- [Badge](aegov-badge.html) — for a count as a labelled chip instead.
- [Card](aegov-card.html) — where assignee groups commonly sit.
