# Header

<p class="text-lg text-aeblack-500 mb-8">The Header is the top band of a UAE federal government site. It combines the official government trust banner — the emblem, the entity name, and the statement that confirms this is a genuine <code>gov.ae</code> entity — with the entity's own logo and search. It is the one component with a mandated appearance, because it is what tells a citizen the site is authentic.</p>

## Introduction

`aegov-header` renders the trust banner and the entity band together. It embeds [`aegov-header-banner`](#the-trust-banner) internally, so you configure both through one element.

```html
<aegov-header
  entity-name="Ministry of Industry and Advanced Technology"
  entity-domain="https://moiat.gov.ae"
  skip-content-container="#main"
>
  <img slot="logo" src="/logo.svg" alt="Ministry of Industry and Advanced Technology" />

  <aegov-input slot="search" type="search" placeholder="Search the ministry…">
    <svg slot="icon-start" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  </aegov-input>

  <nav slot="actions" aria-label="Utility navigation">…</nav>
</aegov-header>

<main id="main">…</main>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <iframe src="/docs/pages/aegov-header-ministry.html" width="1366" class="block border border-aeblack-100 h-60 rounded-md max-w-full" title="Ministry header preview"></iframe>
</div>

The header is full-width and portals a skip link to the top of the document, so it cannot be previewed inline the way other components can. The previews on this page load it in an iframe instead.

---

## Variant

`variant` selects the layout for the entity's tier of government.

| Variant | For |
| --- | --- |
| `ministry` | Default. Ministry-level entities. |
| `authority` | Authority-level entities. |

```html
<aegov-header variant="ministry" entity-name="…" entity-domain="…">…</aegov-header>
<aegov-header variant="authority" entity-name="…" entity-domain="…">…</aegov-header>
```

### Ministry

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <p class="text-sm text-aeblack-500">1366px</p>
    <iframe src="/docs/pages/aegov-header-ministry.html" width="1366" class="block border border-aeblack-100 h-60 rounded-md max-w-full" title="Ministry header preview at 1366px"></iframe>
    <p class="text-sm text-aeblack-500">768px</p>
    <iframe src="/docs/pages/aegov-header-ministry.html" width="768" class="block border border-aeblack-100 h-60 rounded-md max-w-full" title="Ministry header preview at 768px"></iframe>
    <p class="text-sm text-aeblack-500">640px</p>
    <iframe src="/docs/pages/aegov-header-ministry.html" width="640" class="block border border-aeblack-100 h-80 rounded-md max-w-full" title="Ministry header preview at 640px"></iframe>
  </div>
</div>

### Authority

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <p class="text-sm text-aeblack-500">1366px</p>
    <iframe src="/docs/pages/aegov-header-authority.html" width="1366" class="block border border-aeblack-100 h-60 rounded-md max-w-full" title="Authority header preview at 1366px"></iframe>
    <p class="text-sm text-aeblack-500">768px</p>
    <iframe src="/docs/pages/aegov-header-authority.html" width="768" class="block border border-aeblack-100 h-60 rounded-md max-w-full" title="Authority header preview at 768px"></iframe>
  </div>
</div>

An invalid value falls back to `ministry` and logs a console warning in development.

---

## Entity name and domain

Both properties are effectively required, and both feed the trust banner.

| Property | Purpose |
| --- | --- |
| `entityName` | The entity's full official name, shown in the trust banner. |
| `entityDomain` | The entity's `gov.ae` URL. Shown in the banner **and** used as the logo link's destination. |

```html
<aegov-header
  entity-name="Ministry of Industry and Advanced Technology"
  entity-domain="https://moiat.gov.ae"
>…</aegov-header>
```

Use the entity's **full official name**, not an abbreviation. The banner's purpose is verification, and "MoIAT" verifies nothing to a citizen who does not already know the abbreviation.

`entityDomain` must be the real `gov.ae` domain. It is what the trust statement is asserting.

---

## The trust banner

The top band is `aegov-header-banner`, rendered inside the header. You do not normally use it directly — the header embeds it and forwards `entityName`, `entityDomain` and `skipContentContainer` to it.

It provides, without any configuration:

- The **UAE emblem**.
- The **entity name and domain**.
- An expandable **trust panel** carrying the official statement — "Official UAE Federal Government Entity", and an explanation that federal websites, apps and portals use a `gov.ae` domain to confirm identity. Both strings are built in and **translated automatically** based on page direction.
- A **skip-to-content link**, when `skipContentContainer` is set.
- The `actions` slot, forwarded from the header.

The trust panel is collapsed by default and expands from a control that reports `aria-expanded` and `aria-controls`, so its state is exposed to assistive technology.

**Do not reproduce this band yourself, and do not restyle it.** Its wording, emblem and behaviour are what make it a verification signal; a lookalike undermines the thing it exists to do.

---

## Skip to content

`skipContentContainer` takes the selector or ID of your main content element. When set, the banner **injects a skip link as the first element of `document.body`** — before the header itself — so it is the first thing a keyboard user reaches.

```html
<aegov-header skip-content-container="#main" entity-name="…" entity-domain="…">…</aegov-header>

<main id="main" tabindex="-1">…</main>
```

The leading `#` is optional — `skip-content-container="main"` and `skip-content-container="#main"` both work.

The injected link uses the global `.aegov-skip-content` class, which keeps it visually hidden until focused and then pins it to the top of the viewport. Because the link is injected into `document.body` rather than into the component, that class lives in the global stylesheet — which is one of the reasons `@aegov/designsystem/base` must be imported. See [Installation](installation.html).

Two things you must do:

- **Make sure the target exists.** A skip link pointing at a missing element is worse than none.
- **Add `tabindex="-1"` to the target** so focus actually moves there in every browser. Without it, some browsers scroll but leave focus behind.

Set this on every page. It is the single highest-value keyboard accessibility feature a site has, and it costs one attribute.

---

## Slots

| Slot | Renders |
| --- | --- |
| `logo` | The entity's logo, inside a link to `entityDomain`. |
| `search` | A search control in the entity band. Hidden below the `md` breakpoint. |
| `actions` | Utility links — accessibility, language, sign in. Forwarded to the trust banner. |

### Logo

```html
<aegov-header entity-name="…" entity-domain="https://moiat.gov.ae">
  <img slot="logo" src="/logo.svg" alt="Ministry of Industry and Advanced Technology" />
</aegov-header>
```

The logo is wrapped in a link to `entityDomain`. That link needs an accessible name, and the component checks for one: if the slotted content has neither an `img` with a non-empty `alt` nor any text, it logs a console warning at load.

Supply the name in one of two ways:

```html
<!-- Preferred: a real alt on the image -->
<img slot="logo" src="/logo.svg" alt="Ministry of Industry and Advanced Technology" />

<!-- Or name the link itself, for an inline SVG or a decorative image -->
<aegov-header logo-label="Ministry of Industry and Advanced Technology, home">
  <svg slot="logo" aria-hidden="true">…</svg>
</aegov-header>
```

`logoLabel` sets `aria-label` on the anchor. Use it when the logo is an inline `<svg>`, or when you want the link's name to say "home" rather than just repeating the entity name.

### Search

```html
<aegov-input slot="search" type="search" placeholder="Search the ministry…">
  <svg slot="icon-start" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
</aegov-input>
```

**The search slot is hidden below the `md` breakpoint.** That is deliberate — there is no room for it in the band on a phone. If search matters on mobile, provide it separately: in the page, or behind a button that opens a [Drawer](aegov-drawer.html). Do not rely on this slot alone.

Wrap the input in a `<form>` with a real action so search works without JavaScript, and give the input an accessible name — a placeholder is not one:

```html
<form slot="search" action="/search" role="search">
  <aegov-input type="search" name="q" aria-label="Search the ministry"></aegov-input>
</form>
```

### Actions

```html
<nav slot="actions" aria-label="Utility navigation">
  <ul class="flex items-center gap-6 list-none m-0 p-0">
    <li><a href="/accessibility">Accessibility</a></li>
    <li><a href="/ar" lang="ar">العربية</a></li>
    <li><a href="/sign-in">Sign in</a></li>
  </ul>
</nav>
```

Keep this short — three or four items. The band is narrow, and it competes with the trust statement for attention.

Mark a language switcher with `lang` on the link, so a screen reader pronounces "العربية" in Arabic rather than attempting it in English.

---

## Composite example — full site shell

```html
<aegov-header
  entity-name="Ministry of Industry and Advanced Technology"
  entity-domain="https://moiat.gov.ae"
  skip-content-container="#main"
>
  <img slot="logo" src="/logo.svg" alt="Ministry of Industry and Advanced Technology" />

  <form slot="search" action="/search" role="search">
    <aegov-input type="search" name="q" aria-label="Search the ministry" placeholder="Search…">
      <svg slot="icon-start" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
      </svg>
    </aegov-input>
  </form>

  <nav slot="actions" aria-label="Utility navigation">
    <ul class="flex items-center gap-6 list-none m-0 p-0">
      <li><a href="/accessibility">Accessibility</a></li>
      <li><a href="/ar" lang="ar">العربية</a></li>
    </ul>
  </nav>
</aegov-header>

<div class="aegov-container">
  <aegov-navbar label-nav="Main navigation">
    <aegov-navbar-item href="/" is-active>Home</aegov-navbar-item>
    <aegov-navbar-item href="/services">Services</aegov-navbar-item>
    <aegov-navbar-item href="/about">About us</aegov-navbar-item>
  </aegov-navbar>
</div>

<main id="main" tabindex="-1" class="aegov-container">
  <aegov-breadcrumbs separator="chevron">
    <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
    <aegov-breadcrumbs-item>Services</aegov-breadcrumbs-item>
  </aegov-breadcrumbs>

  <h1 class="text-h2">Services</h1>
</main>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <iframe src="/docs/pages/aegov-header-ministry.html" width="1366" class="block border border-aeblack-100 h-60 rounded-md max-w-full mb-4" title="Header in a full page shell"></iframe>
  <div class="border border-aeblack-100 rounded-md p-4 bg-whitely-50">
    <aegov-navbar label-nav="Main navigation" gap="gap-6">
      <aegov-navbar-item href="#" is-active>Home</aegov-navbar-item>
      <aegov-navbar-item href="#">Services</aegov-navbar-item>
      <aegov-navbar-item href="#">About us</aegov-navbar-item>
    </aegov-navbar>
    <div class="mt-4">
      <aegov-breadcrumbs field-id="hd-cx-bc" separator="chevron">
        <aegov-breadcrumbs-item href="#">Home</aegov-breadcrumbs-item>
        <aegov-breadcrumbs-item>Services</aegov-breadcrumbs-item>
      </aegov-breadcrumbs>
    </div>
    <p class="text-h4 font-extrabold mt-4">Services</p>
  </div>
</div>

The order matters: header, then [Navbar](aegov-navbar.html), then [Breadcrumbs](aegov-breadcrumbs.html), then the `<h1>`. Each names a different level of context.

If you also use a [Banner](aegov-banner.html) for a site-wide notice, put it above the header in `push` mode so it does not cover the trust band or the skip link.

---

## RTL Support

The header is fully direction-aware. In an RTL document the emblem, entity name, logo and search swap sides, the trust panel's expand control mirrors, and **the built-in trust statement switches to Arabic automatically** — both the "Official UAE Federal Government Entity" title and the explanatory sentence about `gov.ae` domains are built in in both languages.

Set the direction on the document:

```html
<html dir="rtl" lang="ar">
  <aegov-header
    entity-name="وزارة الصناعة والتكنولوجيا المتقدمة"
    entity-domain="https://moiat.gov.ae"
    skip-content-container="#main"
  >
    <img slot="logo" src="/logo-ar.svg" alt="وزارة الصناعة والتكنولوجيا المتقدمة" />
    <aegov-input slot="search" type="search" aria-label="ابحث في الوزارة" placeholder="ابحث…"></aegov-input>
  </aegov-header>
</html>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="space-y-4">
    <p class="text-sm text-aeblack-500">Ministry header in RTL — 1366px</p>
    <iframe src="/docs/pages/aegov-header-ministry.html?dir=rtl" width="1366" class="block border border-aeblack-100 h-60 rounded-md max-w-full" title="Ministry header preview in right-to-left at 1366px"></iframe>
    <p class="text-sm text-aeblack-500">Authority header in RTL — 1366px</p>
    <iframe src="/docs/pages/aegov-header-authority.html?dir=rtl" width="1366" class="block border border-aeblack-100 h-60 rounded-md max-w-full" title="Authority header preview in right-to-left at 1366px"></iframe>
  </div>
</div>

Three things you supply:

- **A translated `entityName`.** The component translates its own trust copy, not your entity's name.
- **An Arabic logo**, where the entity has one. Pass a different `src` per language.
- **Translated `actions` content and the search field's accessible name.**

Because the skip link is injected into `document.body`, set `dir` on `<html>` rather than on an inner wrapper — otherwise the link will not inherit the page direction.

---

## API Reference

### aegov-header Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `variant` | `variant` | Layout for the entity's tier of government. | `'ministry' \| 'authority'` | `'ministry'` |
| `entityName` | `entity-name` | The entity's full official name. Forwarded to the trust banner. | `string` | — |
| `entityDomain` | `entity-domain` | The entity's `gov.ae` URL. Shown in the banner and used as the logo link target. | `string` | — |
| `skipContentContainer` | `skip-content-container` | Selector or ID of the main content element. Injects a skip link into `document.body`. | `string` | — |
| `logoLabel` | `logo-label` | `aria-label` for the logo link. Use when the logo has no text or `alt`. | `string` | — |

### aegov-header-banner Properties

Normally configured through `aegov-header`, which forwards all three.

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `entityName` | `entity-name` | The entity's full official name. | `string` | — |
| `entityDomain` | `entity-domain` | The entity's `gov.ae` URL. | `string` | — |
| `skipContentContainer` | `skip-content-container` | Selector or ID for the injected skip link. | `string` | — |

### Slots

| Slot | On | Description |
| --- | --- | --- |
| `logo` | header | The entity logo, wrapped in a link to `entityDomain`. |
| `search` | header | A search control. **Hidden below the `md` breakpoint.** |
| `actions` | header | Utility links. Forwarded to the trust banner's own `actions` slot. |

### Events

Neither component emits events.

### Methods

None.

### Pass-through Attributes

Both components use **shadow DOM**.

| Attribute group | Forwarded? | Notes |
| --- | --- | --- |
| `class`, `style` | Allowed | Applied to the host only — they cannot restyle shadow internals, and the trust band should not be restyled. |
| `dir`, `lang` | Inherited | Set these on `<html>`, since the skip link is injected into `document.body`. |

### Shadow DOM

Both components use shadow DOM, so the trust band's internals cannot be reached or overridden from your stylesheet. That is intentional: the band is a verification signal, and its appearance is fixed.

The one thing rendered outside the shadow root is the injected skip link, which is a `document.body` child styled by the global `.aegov-skip-content` class.

In E2E tests, pierce the shadow root: `page.find('aegov-header >>> .aegov-header')`.

---

## Accessibility

### Built-in behaviour

- The component renders a real `<header>` element, so it is exposed as a banner landmark.
- **The skip link is injected as the first child of `document.body`**, ahead of the header itself, so it is the very first tab stop on the page — which is the only position where a skip link is actually useful.
- The trust panel's expand control reports `aria-expanded` and `aria-controls`, so its state and target are exposed.
- The emblem and the trust panel's status icons are marked `aria-hidden="true"`; the trust statement is real text.
- The trust title and explanatory text are provided in **both English and Arabic** and selected from the page direction, so the verification message is never left untranslated.
- The logo link is checked for an accessible name at load, and a console warning is logged when neither an `img[alt]` nor text content is present.
- The layout mirrors under `dir="rtl"` throughout.

### Developer responsibilities

- **Set `skipContentContainer` on every page**, and give the target `tabindex="-1"` so focus lands there reliably. This is the highest-value keyboard feature on the page.
- **Give the logo an accessible name** — an `alt` on the image, or `logoLabel` on the header. Watch the console for the warning.
- **Use the entity's full official name** in `entityName`, and the real `gov.ae` domain in `entityDomain`. The band is a verification signal; an abbreviation or a staging URL defeats it.
- **Do not restyle or reproduce the trust band.** Its appearance and wording are what make it trustworthy.
- **Provide search on mobile another way.** The `search` slot is hidden below `md`.
- **Give the search input a real accessible name**, not just a placeholder, and wrap it in a `<form role="search">` with a working action.
- **Mark a language switcher with `lang`** on the link.
- **Keep `actions` to three or four items.**
- **Add a [Navbar](aegov-navbar.html) with its own `labelNav`** — the header is not navigation, and a page with only a header has no way to move around.
- **Put a site-wide [Banner](aegov-banner.html) above the header in `push` mode**, so it never covers the trust band or the skip link (WCAG 2.2 SC 2.4.11).
- **Translate `entityName`, the logo, `actions` and the search label** for Arabic pages; the component only translates its own copy.
- **Set `dir` and `lang` on `<html>`.**

### Keyboard support

| Key | Action |
| --- | --- |
| `Tab` | Move focus to the skip link first, then the trust panel's expand control, the logo link, search, and the `actions` links. |
| `Enter` | Follow the focused link, or expand the trust panel. |
| `Space` | Expand the trust panel when its control has focus. |

---

## Where to next

- [Navbar](aegov-navbar.html) — the primary navigation that sits below the header.
- [Breadcrumbs](aegov-breadcrumbs.html) — hierarchy below the navigation.
- [Banner](aegov-banner.html) — site-wide notices, and how to place one above the header.
- [Installation](installation.html) — the global stylesheet that styles the injected skip link.
