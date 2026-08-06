# Avatar

<p class="text-lg text-aeblack-500 mb-8">An Avatar represents a person or an entity as a small image. It falls back gracefully when there is no picture — or when the picture fails to load — and can carry a presence indicator. Use it beside a name in a list, in an account menu, or in a comment thread.</p>

## Introduction

```html
<aegov-avatar src="/photos/ahmed.jpg" alt="Ahmed Al Mansouri"></aegov-avatar>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-4">
    <aegov-avatar field-id="av-intro-1" alt="Ahmed Al Mansouri"></aegov-avatar>
    <aegov-avatar field-id="av-intro-2" alt="Fatima Al Suwaidi" appearance="rounded"></aegov-avatar>
    <aegov-avatar field-id="av-intro-3" alt="Omar Al Hashimi" size="lg" status="online"></aegov-avatar>
  </div>
</div>

**`alt` is the accessible name.** The avatar renders `role="img"`, and `alt` becomes its label — so set it to the person's name. With no `alt` it falls back to a generic, translated "User avatar", which tells the user nothing useful.

---

## Fallback content

With no `src`, or when the image fails to load, the avatar shows fallback content. By default that is a generic person icon; the default slot replaces it — most commonly with initials.

```html
<!-- Default icon fallback -->
<aegov-avatar alt="Ahmed Al Mansouri"></aegov-avatar>

<!-- Initials -->
<aegov-avatar alt="Ahmed Al Mansouri">AM</aegov-avatar>

<!-- A broken image falls back automatically -->
<aegov-avatar src="/missing.jpg" alt="Fatima Al Suwaidi">FS</aegov-avatar>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-4">
    <aegov-avatar field-id="av-fb-1" alt="Unknown user"></aegov-avatar>
    <aegov-avatar field-id="av-fb-2" alt="Ahmed Al Mansouri">AM</aegov-avatar>
    <aegov-avatar field-id="av-fb-3" alt="Fatima Al Suwaidi">FS</aegov-avatar>
    <aegov-avatar field-id="av-fb-4" src="/deliberately-missing.jpg" alt="Omar Al Hashimi">OH</aegov-avatar>
    <aegov-avatar field-id="av-fb-5" alt="Ministry of Industry" appearance="rounded">MI</aegov-avatar>
  </div>
</div>

The fourth avatar above points at a file that does not exist — the component catches the load error and shows the initials instead of a broken-image icon. Always supply a fallback for avatars whose `src` comes from user data.

Note there is no `initials` property. Initials are slot content, which means you control how they are derived — and can put anything else there instead.

---

## Sizes

Seven tokens, from `xs` to `3xl`.

```html
<aegov-avatar size="xs" alt="…"></aegov-avatar>
<aegov-avatar size="base" alt="…"></aegov-avatar>
<aegov-avatar size="3xl" alt="…"></aegov-avatar>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-end gap-4">
    <div class="text-center"><aegov-avatar field-id="av-s1" size="xs" alt="Extra small">A</aegov-avatar><p class="text-xs text-aeblack-500 mt-1">xs</p></div>
    <div class="text-center"><aegov-avatar field-id="av-s2" size="sm" alt="Small">A</aegov-avatar><p class="text-xs text-aeblack-500 mt-1">sm</p></div>
    <div class="text-center"><aegov-avatar field-id="av-s3" size="base" alt="Base">A</aegov-avatar><p class="text-xs text-aeblack-500 mt-1">base</p></div>
    <div class="text-center"><aegov-avatar field-id="av-s4" size="lg" alt="Large">A</aegov-avatar><p class="text-xs text-aeblack-500 mt-1">lg</p></div>
    <div class="text-center"><aegov-avatar field-id="av-s5" size="xl" alt="Extra large">A</aegov-avatar><p class="text-xs text-aeblack-500 mt-1">xl</p></div>
    <div class="text-center"><aegov-avatar field-id="av-s6" size="2xl" alt="2xl">A</aegov-avatar><p class="text-xs text-aeblack-500 mt-1">2xl</p></div>
    <div class="text-center"><aegov-avatar field-id="av-s7" size="3xl" alt="3xl">A</aegov-avatar><p class="text-xs text-aeblack-500 mt-1">3xl</p></div>
  </div>
</div>

### Responsive sizes

`size` accepts a responsive string with the prefixes `xs`, `sm`, `md`, `lg`, `xl` and `2xl`.

```html
<aegov-avatar size="base md:lg lg:xl" alt="Ahmed Al Mansouri">AM</aegov-avatar>
```

Note the vocabulary overlap: `xs`, `sm`, `lg`, `xl` and `2xl` are all both size tokens and breakpoint prefixes.

---

## Appearance

```html
<aegov-avatar appearance="square" alt="…"></aegov-avatar>
<aegov-avatar appearance="rounded" alt="…"></aegov-avatar>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-6">
    <div class="text-center"><aegov-avatar field-id="av-a1" appearance="square" size="lg" alt="Square">AM</aegov-avatar><p class="text-xs text-aeblack-500 mt-1">square (default)</p></div>
    <div class="text-center"><aegov-avatar field-id="av-a2" appearance="rounded" size="lg" alt="Rounded">AM</aegov-avatar><p class="text-xs text-aeblack-500 mt-1">rounded</p></div>
  </div>
</div>

Pick one and use it consistently. Mixed shapes in a single list reads as a bug.

---

## Status indicator

`status` adds a presence dot. It accepts a named status, or `true` as a shorthand for `online`.

| Value | Meaning |
| --- | --- |
| `false` | Default. No indicator. |
| `true` | Shorthand for `online`. |
| `online`, `offline`, `away`, `busy`, `unavailable` | The named states. |

```html
<aegov-avatar alt="Ahmed Al Mansouri" status="online">AM</aegov-avatar>
<aegov-avatar alt="Fatima Al Suwaidi" status="busy">FS</aegov-avatar>
<aegov-avatar alt="Omar Al Hashimi" status></aegov-avatar>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-6">
    <div class="text-center"><aegov-avatar field-id="av-st1" size="lg" alt="Ahmed Al Mansouri" status="online">AM</aegov-avatar><p class="text-xs text-aeblack-500 mt-1">online</p></div>
    <div class="text-center"><aegov-avatar field-id="av-st2" size="lg" alt="Fatima Al Suwaidi" status="offline">FS</aegov-avatar><p class="text-xs text-aeblack-500 mt-1">offline</p></div>
    <div class="text-center"><aegov-avatar field-id="av-st3" size="lg" alt="Omar Al Hashimi" status="away">OH</aegov-avatar><p class="text-xs text-aeblack-500 mt-1">away</p></div>
    <div class="text-center"><aegov-avatar field-id="av-st4" size="lg" alt="Sara Al Ali" status="busy">SA</aegov-avatar><p class="text-xs text-aeblack-500 mt-1">busy</p></div>
    <div class="text-center"><aegov-avatar field-id="av-st5" size="lg" alt="Khalid Al Nuaimi" status="unavailable">KN</aegov-avatar><p class="text-xs text-aeblack-500 mt-1">unavailable</p></div>
  </div>
</div>

**The status is included in the accessible name.** The dot itself is `aria-hidden`, and the status is appended to the label instead — so a screen reader announces "Ahmed Al Mansouri, online" rather than a colour it cannot see. The status word is translated automatically in RTL contexts.

This is the right design, and it is worth knowing because it means you do **not** need to add your own status text for accessibility. You may still want visible text for sighted users, since a coloured dot alone is not sufficient under WCAG 2.2 SC 1.4.1.

---

## In context

```html
<ul class="divide-y divide-aeblack-100">
  <li class="flex items-center gap-3 py-3">
    <aegov-avatar size="sm" alt="Ahmed Al Mansouri" status="online">AM</aegov-avatar>
    <div>
      <p class="font-medium">Ahmed Al Mansouri</p>
      <p class="text-sm text-aeblack-500">Case officer · Available</p>
    </div>
  </li>
</ul>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <ul class="divide-y divide-aeblack-100 max-w-md">
    <li class="flex items-center gap-3 py-3">
      <aegov-avatar field-id="av-cx1" size="sm" alt="Ahmed Al Mansouri" status="online">AM</aegov-avatar>
      <div><p class="font-medium">Ahmed Al Mansouri</p><p class="text-sm text-aeblack-500">Case officer · Available</p></div>
    </li>
    <li class="flex items-center gap-3 py-3">
      <aegov-avatar field-id="av-cx2" size="sm" alt="Fatima Al Suwaidi" status="busy">FS</aegov-avatar>
      <div><p class="font-medium">Fatima Al Suwaidi</p><p class="text-sm text-aeblack-500">Reviewer · In a meeting</p></div>
    </li>
    <li class="flex items-center gap-3 py-3">
      <aegov-avatar field-id="av-cx3" size="sm" alt="Omar Al Hashimi" status="offline">OH</aegov-avatar>
      <div><p class="font-medium">Omar Al Hashimi</p><p class="text-sm text-aeblack-500">Supervisor · Offline</p></div>
    </li>
  </ul>
</div>

Note the visible status text beside each name. The avatar handles the screen reader announcement; the text handles sighted users who cannot distinguish the dot colours.

In an account menu, pair the avatar with a [Dropdown](aegov-dropdown.html):

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-dropdown field-id="av-dd" align="end">
    <aegov-button appearance="soft" variant="neutral-max" size="sm">
      <aegov-avatar size="xs" alt="Ahmed Al Mansouri">AM</aegov-avatar>
      Ahmed Al Mansouri
    </aegov-button>
    <div slot="dropdown-content">
      <a href="#">My profile</a>
      <a href="#">My applications</a>
      <aegov-separator></aegov-separator>
      <button type="button">Sign out</button>
    </div>
  </aegov-dropdown>
</div>

---

## Styling past the boundary

The avatar exposes three `part` names, so you can reach its internals from outside:

```css
aegov-avatar::part(avatar) { border: 2px solid var(--color-primary-600); }
aegov-avatar::part(image)  { filter: grayscale(1); }
aegov-avatar::part(status) { outline: 2px solid white; }
```

---

## RTL Support

The avatar is direction-aware. The shape is symmetrical, and the status indicator sits at the inline-end corner — so it moves to the left in a `dir="rtl"` container without any configuration. The status word appended to the accessible name is translated automatically, as is the fallback "User avatar" label.

```html
<div dir="rtl">
  <aegov-avatar alt="أحمد المنصوري" status="online">أم</aegov-avatar>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <ul class="divide-y divide-aeblack-100 max-w-md">
    <li class="flex items-center gap-3 py-3">
      <aegov-avatar field-id="av-rtl1" size="sm" alt="أحمد المنصوري" status="online">أم</aegov-avatar>
      <div><p class="font-medium">أحمد المنصوري</p><p class="text-sm text-aeblack-500">مسؤول الحالة · متاح</p></div>
    </li>
    <li class="flex items-center gap-3 py-3">
      <aegov-avatar field-id="av-rtl2" size="sm" alt="فاطمة السويدي" status="busy">فس</aegov-avatar>
      <div><p class="font-medium">فاطمة السويدي</p><p class="text-sm text-aeblack-500">مراجعة · في اجتماع</p></div>
    </li>
    <li class="flex items-center gap-3 py-3">
      <aegov-avatar field-id="av-rtl3" size="sm" alt="عمر الهاشمي" status="offline"></aegov-avatar>
      <div><p class="font-medium">عمر الهاشمي</p><p class="text-sm text-aeblack-500">مشرف · غير متصل</p></div>
    </li>
  </ul>
</div>

Initials in Arabic are your content — derive them however suits the language, and remember that two-letter initials are a Latin-script convention that does not always transfer.

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `src` | `src` | Image URL. On load failure the fallback is shown automatically. | `string` | — |
| `alt` | `alt` | **The accessible name.** Set it to the person or entity's name. Falls back to a translated "User avatar". | `string` | — |
| `size` | `size` | Size token or responsive string. | `string` — `xs \| sm \| base \| lg \| xl \| 2xl \| 3xl` | `'base'` |
| `appearance` | `appearance` | Shape. | `'square' \| 'rounded'` | `'square'` |
| `status` | `status` | Presence indicator. `true` means `online`. | `boolean \| 'online' \| 'offline' \| 'away' \| 'busy' \| 'unavailable'` | `false` |
| `fieldId` | `field-id` | ID applied to the avatar element. Auto-generated when omitted, reflected. | `string` | _generated_ |

There is no `initials` property — initials go in the default slot.

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | Fallback content shown when there is no image, or the image failed. Defaults to a generic person icon. |

### Parts

| Part | Description |
| --- | --- |
| `avatar` | The outer element carrying `role="img"`. |
| `image` | The `<img>`, when an image is shown. |
| `status` | The presence indicator. |

### Events

None.

### Methods

None.

### Pass-through Attributes

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `aria-*` | Yes | Forwarded — but note the component sets `role="img"` and computes `aria-label` from `alt` plus the status. |
| `data-*` | Yes | Forwarded. |
| Image attributes | Yes | Forwarded to the inner `<img>` when one is rendered — `loading`, `decoding`, `referrerpolicy` and similar. |
| `id` | n/a | Use `field-id`. |
| `class`, `style` | Allowed | Applied to the host. Use the `part` names to reach internals. |

---

## Accessibility

### Built-in behaviour

- The avatar element carries `role="img"` with an `aria-label` built from `alt`, so it is announced as a single image with a meaningful name rather than as a container of stray text.
- **The status is folded into the accessible name** — "Ahmed Al Mansouri, online" — and the indicator dot itself is `aria-hidden="true"`. That means presence is conveyed non-visually without you adding anything.
- The status word and the fallback "User avatar" label are translated automatically based on direction.
- The inner `<img>` is marked `alt=""` and `aria-hidden="true"`, because the accessible name lives on the wrapper. This avoids the image being announced twice.
- Image load failure is caught and the fallback rendered, so a dead URL never produces a broken-image icon.
- The status indicator sits at the inline-end corner using logical positioning, so it mirrors in RTL.

### Developer responsibilities

- **Always set `alt` to the person's name.** Without it, every avatar on the page is announced as "User avatar", which is worse than useless in a list.
- **Provide fallback content** — usually initials — for any avatar whose `src` comes from user data. The default icon is a last resort, not a design.
- **Do not rely on the status dot alone** (WCAG 2.2 SC 1.4.1). The colour is invisible to many users; add visible text beside the name, as the examples above do.
- **Do not use an avatar as a button.** It is not focusable and has no role for interaction — put it inside a [Button](aegov-button.html) or [Link](aegov-link.html), and make sure that control has its own accessible name.
- **Keep one `appearance` across a list.**
- **Do not put meaningful text only in the fallback slot.** Initials are a visual shorthand; the name belongs in `alt` and, usually, beside the avatar.
- **Use `loading="lazy"`** as a pass-through attribute for long lists of avatars.
- **Consider whether an avatar helps at all.** In a government service, a name and a role are usually more useful than a photograph, and a generic icon repeated forty times is pure noise.

---

## Where to next

- [Avatar Group](aegov-avatar-group.html) — for stacking several avatars with an overflow count.
- [Badge](aegov-badge.html) — for status as text rather than a dot.
- [Dropdown](aegov-dropdown.html) — account menus.
- [Aspect Ratio](aegov-aspect-ratio.html) — for general media rather than people.
