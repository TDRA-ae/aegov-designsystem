# Header

<p class="text-lg text-aeblack-500 mb-8">The Header is the standardised top-of-page banner used across UAE Federal Government websites. It anchors the page in the official government identity — pairing the prime statement, the national emblem, and the entity's own logo and search — so that citizens can recognise an official <code>gov.ae</code> service at a glance. Use one header per page, immediately above the main navigation.</p>

## Introduction

The `aegov-header` component is composed of two stacked rows: a slim top bar carrying the official prime statement plus accessibility and language quick links, and a head row that surfaces the entity's logo and an optional search field. The `Learn more` trigger in the top bar opens an expandable panel showing the entity name, domain, and the UAE national emblem so visitors can verify they are on a genuine government site. The component is fully self-contained — supply two required props (`entity-name` and `entity-domain`) and it renders the rest.

```html
<aegov-header
  entity-name="Ministry of Industry and Advanced Technology"
  entity-domain="https://moiat.gov.ae"
>
  <img
    slot="logo"
    src="https://moiat.gov.ae/-/media/site/moiat/identity/logo/moiat_logo_eng.ashx?iar=0&hash=42716B005DAA289F20DE7B83B575605A"
    alt="Ministry of Industry and Advanced Technology logo"
  />
  <aegov-input slot="search" type="search" placeholder="Search the ministry…" size="base">
    <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  </aegov-input>


  <nav slot="actions" class="hidden sm:inline">
    <ul class="flex justify-end items-center gap-6 list-none m-0 p-0">
      <li><a href="#" class="text-sm! text-aeblack-100! focus-visible:text-aeblack-800! no-underline">
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><polyline points="104 72 104 136 192 136 224 200 248 192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="104" cy="48" r="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M168,96H112a64,64,0,0,0,0,128c29.82,0,56.9-20.4,64-48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
        <span class="hidden lg:inline">Accessibility</span>
      </a></li>
      <li><a href="#" class="text-sm! text-aeblack-100! focus-visible:text-aeblack-800! no-underline">
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M168,128c0,64-40,96-40,96s-40-32-40-96,40-96,40-96S168,64,168,128Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="37.46" y1="96" x2="218.54" y2="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="37.46" y1="160" x2="218.54" y2="160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
        <span class="hidden lg:inline">Language</span>
      </a></li>
    </ul>
  </nav>


</aegov-header>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-header
    entity-name="Ministry of Industry and Advanced Technology"
    entity-domain="https://moiat.gov.ae"
  >
    <img
      slot="logo"
      src="https://moiat.gov.ae/-/media/site/moiat/identity/logo/moiat_logo_eng.ashx?iar=0&hash=42716B005DAA289F20DE7B83B575605A"
      alt="Ministry of Industry and Advanced Technology logo"
    />
    <aegov-input slot="search" type="search" placeholder="Search the ministry…" size="base">
      <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
    </aegov-input>
  </aegov-header>
</div>

---

## Variants

The `variant` property selects the visual treatment for the entity tier. `ministry` (default) is intended for federal ministries; `authority` is intended for federal authorities, councils, and regulators. Both variants share the same official top bar — only the head row treatment changes.

### Ministry

Use this variant for ministry-level entities such as the Ministry of Foreign Affairs or the Ministry of Interior.

```html
<aegov-header
  variant="ministry"
  entity-name="Ministry of Foreign Affairs"
  entity-domain="https://www.mofa.gov.ae"
>
  <img
    slot="logo"
    src="https://designsystem.gov.ae/assets/site-logo/AEGov-DesignSystem-Logo-Color.svg"
    alt="Ministry of Foreign Affairs logo"
  />
</aegov-header>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-header
    variant="ministry"
    entity-name="Ministry of Foreign Affairs"
    entity-domain="https://www.mofa.gov.ae"
  >
    <img
      slot="logo"
      src="https://designsystem.gov.ae/assets/site-logo/AEGov-DesignSystem-Logo-Color.svg"
      alt="Ministry of Foreign Affairs logo"
    />
  </aegov-header>
</div>

### Authority

Use this variant for authority-level entities such as the Telecommunications and Digital Government Regulatory Authority (TDRA) or Emirates Health Services.

```html
<aegov-header
  variant="authority"
  entity-name="Emirates Health Services"
  entity-domain="https://www.ehs.gov.ae"
>
  <img
    slot="logo"
    src="https://www.ehs.gov.ae/app_themes/fg21001/images/ehs-logo.svg"
    alt="Emirates Health Services logo"
  />
</aegov-header>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-header
    variant="authority"
    entity-name="Emirates Health Services"
    entity-domain="https://www.ehs.gov.ae"
  >
    <img
      slot="logo"
      src="https://www.ehs.gov.ae/app_themes/fg21001/images/ehs-logo.svg"
      alt="Emirates Health Services logo"
    />
  </aegov-header>
</div>

---

## Required Branding Properties

Both `entity-name` and `entity-domain` are required. The header uses them to populate the official-website panel that opens from the top bar, and `entity-domain` becomes the link target wrapping the logo. If either is omitted, the embedded `aegov-header-banner` sub-component renders an inline error block in place of the banner — making the misconfiguration obvious during development. The outer `aegov-header` (logo/search row) still renders.

```html
<aegov-header
  entity-name="Telecommunications and Digital Government Regulatory Authority"
  entity-domain="https://tdra.gov.ae"
>
  <img
    slot="logo"
    src="https://designsystem.gov.ae/assets/site-logo/AEGov-DesignSystem-Logo-Color.svg"
    alt="TDRA logo"
  />
</aegov-header>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-header
    variant="authority"
    entity-name="Telecommunications and Digital Government Regulatory Authority"
    entity-domain="https://tdra.gov.ae"
  >
    <img
      slot="logo"
      src="https://designsystem.gov.ae/assets/site-logo/AEGov-DesignSystem-Logo-Color.svg"
      alt="TDRA logo"
    />
  </aegov-header>
</div>

If you remove the required props, the component shows the configuration error in place of the banner:

```html
<!-- Missing entity-domain — renders an inline error block -->
<aegov-header entity-name="Federal Authority for Identity, Citizenship, Customs and Port Security"></aegov-header>
```

---

## Logo Slot

The `logo` slot accepts any markup, but a single `<img>` or inline SVG is the most common choice. The slotted element is wrapped in an anchor pointing to `entity-domain`, so it always returns the visitor to the entity homepage.

```html
<aegov-header
  entity-name="Federal Authority for Identity, Citizenship, Customs and Port Security"
  entity-domain="https://icp.gov.ae"
>
  <img
    slot="logo"
    src="https://designsystem.gov.ae/assets/site-logo/AEGov-DesignSystem-Logo-Color.svg"
    alt="ICP logo"
  />
</aegov-header>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-header
    variant="authority"
    entity-name="Federal Authority for Identity, Citizenship, Customs and Port Security"
    entity-domain="https://icp.gov.ae"
  >
    <img
      slot="logo"
      src="https://designsystem.gov.ae/assets/site-logo/AEGov-DesignSystem-Logo-Color.svg"
      alt="ICP logo"
    />
  </aegov-header>
</div>

---

## Search Slot

Place an `aegov-input` (or any search affordance) in the `search` slot. The slot is hidden below the `md` breakpoint to keep small screens uncluttered — provide a search trigger inside your navigation for mobile.

```html
<aegov-header
  entity-name="Ministry of Climate Change and Environment"
  entity-domain="https://www.moccae.gov.ae"
>
  <img
    slot="logo"
    src="https://designsystem.gov.ae/assets/site-logo/AEGov-DesignSystem-Logo-Color.svg"
    alt="MOCCAE logo"
  />
  <aegov-input slot="search" type="search" placeholder="Search services…" size="base">
    <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  </aegov-input>
</aegov-header>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-header
    entity-name="Ministry of Climate Change and Environment"
    entity-domain="https://www.moccae.gov.ae"
  >
    <img
      slot="logo"
      src="https://designsystem.gov.ae/assets/site-logo/AEGov-DesignSystem-Logo-Color.svg"
      alt="MOCCAE logo"
    />
    <aegov-input slot="search" type="search" placeholder="Search services…" size="base">
      <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
    </aegov-input>
  </aegov-header>
</div>

---

## Skip to Content

Set `skip-content-container` to the selector or id of the page's main landmark (with or without the leading `#`). The component injects a visually-hidden `Skip to content` link as the very first focusable element in the document — the standard keyboard-user shortcut for jumping past the masthead and navigation. The link is automatically translated when the page is in RTL.

```html
<aegov-header
  entity-name="Ministry of Interior"
  entity-domain="https://www.moi.gov.ae"
  skip-content-container="#main"
>
  <img slot="logo" src="https://designsystem.gov.ae/assets/site-logo/AEGov-DesignSystem-Logo-Color.svg" alt="MOI logo" />
</aegov-header>

<main id="main">
  …
</main>
```

> Tab to focus the page. The first stop will be the `Skip to content` link before the header.

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-header
    entity-name="Ministry of Interior"
    entity-domain="https://www.moi.gov.ae"
    skip-content-container="#header-demo-main"
  >
    <img slot="logo" src="https://designsystem.gov.ae/assets/site-logo/AEGov-DesignSystem-Logo-Color.svg" alt="MOI logo" />
  </aegov-header>
  <main id="header-demo-main" class="pt-8">
    <p class="text-sm text-aeblack-500">Page content begins here.</p>
  </main>
</div>

---

## Learn More Panel

The `Learn more` link in the top bar reveals an in-context panel that confirms the visitor is on an official UAE Federal Government website. It shows the entity name, the entity domain, the official-website paragraph, and the UAE national emblem. The panel is built into the component — no configuration is required, and it cannot be disabled.

```html
<aegov-header
  entity-name="Ministry of Foreign Affairs"
  entity-domain="https://www.mofa.gov.ae"
>
  <img slot="logo" src="https://designsystem.gov.ae/assets/site-logo/AEGov-DesignSystem-Logo-Color.svg" alt="MOFA logo" />
</aegov-header>
```

> Click `Learn more` in the top bar of the demo above to see the panel. Press <kbd>Escape</kbd> or the close button to dismiss it — focus returns to the trigger automatically.

---

## Composing a Full Page Header

A typical UAE Government page header pairs the `aegov-header` banner with a primary navigation row immediately below it. This composite is the most-visible element on every government site — keep it consistent across your pages.

```html
<aegov-header
  entity-name="Ministry of Industry and Advanced Technology"
  entity-domain="https://moiat.gov.ae"
  skip-content-container="#main"
>
  <img slot="logo" src="https://moiat.gov.ae/-/media/site/moiat/identity/logo/moiat_logo_eng.ashx?iar=0&hash=42716B005DAA289F20DE7B83B575605A" alt="MOIAT logo" />
  <aegov-input slot="search" type="search" placeholder="Search…" size="base">
    <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  </aegov-input>
</aegov-header>

<div class="aegov-container">
  <aegov-navbar label-nav="Main navigation" gap="gap-6">
    <aegov-navbar-item href="/" is-active="true">Home</aegov-navbar-item>
    <aegov-navbar-item href="/services">Services</aegov-navbar-item>
    <aegov-navbar-item href="/awareness">Awareness centre</aegov-navbar-item>
    <aegov-navbar-item href="/open-data">Open data</aegov-navbar-item>
    <aegov-navbar-item href="/about">About</aegov-navbar-item>
  </aegov-navbar>
</div>

<main id="main">…</main>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-header
    entity-name="Ministry of Industry and Advanced Technology"
    entity-domain="https://moiat.gov.ae"
  >
    <img slot="logo" src="https://moiat.gov.ae/-/media/site/moiat/identity/logo/moiat_logo_eng.ashx?iar=0&hash=42716B005DAA289F20DE7B83B575605A" alt="MOIAT logo" />
    <aegov-input slot="search" type="search" placeholder="Search…" size="base">
      <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
    </aegov-input>
  </aegov-header>
  <div class="aegov-container py-2">
    <aegov-navbar label-nav="Main navigation" gap="gap-6">
      <aegov-navbar-item href="#" is-active="true">Home</aegov-navbar-item>
      <aegov-navbar-item href="#">Services</aegov-navbar-item>
      <aegov-navbar-item href="#">Awareness centre</aegov-navbar-item>
      <aegov-navbar-item href="#">Open data</aegov-navbar-item>
      <aegov-navbar-item href="#">About</aegov-navbar-item>
    </aegov-navbar>
  </div>
</div>

---

## RTL Support

The header detects right-to-left mode by reading the closest `[dir]` ancestor or the `<html>` element. When RTL is active, all built-in copy — the prime statement, the `Accessibility` and `Language` quick links, the `Learn more` trigger, the close button, the official-website paragraph, and the `Skip to content` link — automatically swap to their Arabic translations. Layout, padding, and chevron rotation are mirrored through CSS logical properties.

```html
<div dir="rtl">
  <aegov-header
    entity-name="وزارة الخارجية"
    entity-domain="https://www.mofa.gov.ae"
  >
    <img slot="logo" src="https://designsystem.gov.ae/assets/site-logo/AEGov-DesignSystem-Logo-Color.svg" alt="شعار وزارة الخارجية" />
    <aegov-input slot="search" type="search" placeholder="ابحث في الخدمات…" size="base">
      <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
    </aegov-input>
  </aegov-header>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-header
    entity-name="وزارة الخارجية"
    entity-domain="https://www.mofa.gov.ae"
  >
    <img slot="logo" src="https://designsystem.gov.ae/assets/site-logo/AEGov-DesignSystem-Logo-Color.svg" alt="شعار وزارة الخارجية" />
    <aegov-input slot="search" type="search" placeholder="ابحث في الخدمات…" size="base">
      <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
    </aegov-input>
  </aegov-header>
</div>

The same composite header, in Arabic, with the navigation bar below:

```html
<div dir="rtl">
  <aegov-header
    variant="authority"
    entity-name="هيئة الإمارات للخدمات الصحية"
    entity-domain="https://www.ehs.gov.ae"
  >
    <img slot="logo" src="https://www.ehs.gov.ae/app_themes/fg21001/images/ehs-logo.svg" alt="شعار هيئة الإمارات للخدمات الصحية" />
  </aegov-header>
  <div class="aegov-container">
    <aegov-navbar label-nav="التنقل الرئيسي" gap="gap-6">
      <aegov-navbar-item href="/" is-active="true">الرئيسية</aegov-navbar-item>
      <aegov-navbar-item href="/services">الخدمات</aegov-navbar-item>
      <aegov-navbar-item href="/news">الأخبار</aegov-navbar-item>
      <aegov-navbar-item href="/contact">اتصل بنا</aegov-navbar-item>
    </aegov-navbar>
  </div>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-header
    variant="authority"
    entity-name="هيئة الإمارات للخدمات الصحية"
    entity-domain="https://www.ehs.gov.ae"
  >
    <img slot="logo" src="https://www.ehs.gov.ae/app_themes/fg21001/images/ehs-logo.svg" alt="شعار هيئة الإمارات للخدمات الصحية" />
  </aegov-header>
  <div class="aegov-container py-2">
    <aegov-navbar label-nav="التنقل الرئيسي" gap="gap-6">
      <aegov-navbar-item href="#" is-active="true">الرئيسية</aegov-navbar-item>
      <aegov-navbar-item href="#">الخدمات</aegov-navbar-item>
      <aegov-navbar-item href="#">الأخبار</aegov-navbar-item>
      <aegov-navbar-item href="#">اتصل بنا</aegov-navbar-item>
    </aegov-navbar>
  </div>
</div>

---

## API Reference

### Properties

| Property                 | Attribute                  | Description                                                                                                       | Type                          | Default     |
| ------------------------ | -------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------- | ----------- |
| `variant`                | `variant`                  | Visual treatment for the entity tier.                                                                             | `'ministry' \| 'authority'`   | `'ministry'`|
| `entityName`             | `entity-name`              | _Required._ Full name of the government entity. Shown in the `Learn more` panel.                                  | `string`                      | `undefined` |
| `entityDomain`           | `entity-domain`            | _Required._ Official `gov.ae` URL of the entity. Wraps the logo and is shown in the `Learn more` panel.           | `string`                      | `undefined` |
| `skipContentContainer`   | `skip-content-container`   | Selector or id (with or without `#`) of the page's main landmark. Adds a `Skip to content` link to `document.body`. | `string`                    | `undefined` |
| `logoLabel`              | `logo-label`               | Accessible label (aria-label) for the logo anchor element.                                                        | `string`                      | `undefined` |

> Omitting `entity-name` or `entity-domain` causes the embedded `aegov-header-banner` sub-component to render an inline error block in place of the banner. The outer `aegov-header` (logo/search row) still renders.

### Slots

| Slot     | Description                                                                                                       |
| -------- | ----------------------------------------------------------------------------------------------------------------- |
| `logo`    | The entity logo (typically an `<img>` or inline SVG). Wrapped in an anchor pointing to `entity-domain`.                                                                                                  |
| `search`  | Optional search field shown in the head row from the `md` breakpoint up. Use `aegov-input` for consistent styling.                                                                                       |
| `actions` | Forwarded to the embedded `aegov-header-banner`'s actions slot. Use for language switchers, accessibility links, or other utility controls placed in the top-right area of the banner. |

### Events

The header does not emit any custom events.

---

### `aegov-header-banner` Sub-component

`aegov-header` embeds an `aegov-header-banner` internally. The following properties and slots belong to that sub-component and are passed through from the outer `aegov-header`.

#### Properties

| Property               | Attribute                | Description                                                                      | Type      | Default     |
| ---------------------- | ------------------------ | -------------------------------------------------------------------------------- | --------- | ----------- |
| `entityName`           | `entity-name`            | The Arabic/English entity name shown in the banner.                              | `string`  | `undefined` (required) |
| `entityDomain`         | `entity-domain`          | The entity's domain shown below the name.                                        | `string`  | `undefined` (required) |
| `skipContentContainer` | `skip-content-container` | When present, renders a `Skip to content` link at the top of the banner.         | `string`  | `undefined` |

#### Slots

| Slot      | Description                                                                                                                                               |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `actions` | Content for the top-right area of the banner. Falls back to built-in UAE-flag quick links when empty. |

### Pass-through Attributes

The header uses Shadow DOM for full style isolation. It does not forward arbitrary attributes to internal elements — apply attributes directly to the host element where they are needed.

| Attribute group   | Forwarded? | Where to apply                                                                                  |
| ----------------- | ---------- | ----------------------------------------------------------------------------------------------- |
| `aria-*`          | No         | Apply directly to `<aegov-header>` if you need to add an aria attribute to the host.             |
| `data-*`          | No         | Apply directly to `<aegov-header>`.                                                              |
| `class`, `style`  | Allowed    | Applied to the host element. Internal styles cannot be overridden from the page CSS.             |
| `id`              | Allowed    | Applied to the host element. Internal element ids are managed by the component.                  |

---

## Accessibility

### Built-in behaviour

- The `Learn more` trigger is a real anchor with `aria-expanded` and `aria-controls` linking it to the panel it opens.
- When the panel opens, focus moves to the close button. When it closes, focus returns to the trigger.
- `Tab` and `Shift + Tab` are trapped inside the open panel until the user dismisses it.
- `Escape` closes the open panel and restores focus to the trigger.
- Decorative SVGs (chevron, accessibility, language) are marked `aria-hidden` so screen readers do not announce them.
- Built-in copy auto-localises between English and Arabic based on the resolved `dir`.
- The optional `Skip to content` link is appended to `document.body` so it is the very first focusable element on the page.

### Developer responsibilities

- Provide a meaningful `alt` on the slotted logo image.
- If you use the `search` slot, ensure the input has an associated label (the slotted `aegov-input` already supports `aria-label` and `placeholder` — set one or the other).
- When using `skip-content-container`, give the target element a heading or landmark so the user can orient after focus jumps.
- Render only one `aegov-header` per page — it is a banner landmark.
- Set `lang` and `dir` on the `<html>` element when serving Arabic, so the auto-localised copy is announced correctly by screen readers.

### Keyboard support

| Key            | Action                                                                                  |
| -------------- | --------------------------------------------------------------------------------------- |
| `Tab`          | Move focus to the next focusable element (or the next field inside the open panel).      |
| `Shift + Tab`  | Move focus to the previous focusable element. Trapped while the `Learn more` panel is open. |
| `Enter`        | Activate the focused link or button (`Learn more`, close, accessibility, language).      |
| `Escape`       | Close the open `Learn more` panel and return focus to the trigger.                       |

### Notes

- The component uses Shadow DOM, so host-page CSS cannot leak into the header. Use the host element's `class` or `style` for outer-level changes; deeper theming requires CSS custom properties exposed by the component.
- The header is presentational — it does not fetch any branding from `entity-domain`. You are responsible for providing the correct logo image.

---

## Responsive Previews

Because the header occupies the full viewport width, the easiest way to inspect its responsive behaviour is to render it at fixed widths in an iframe. The previews below load the dedicated demo pages — `aegov-header-ministry.html` and `aegov-header-authority.html` — at common screen sizes.

### Ministry variant

<section class="mb-8 not-aegov">
  <p class="mb-4 text-sm text-aeblack-500">Screen size: 1680px</p>
  <iframe src="/docs/pages/aegov-header-ministry.html" width="1680" class="block border border-aeblack-100 h-60 rounded-md max-w-full" title="Ministry header preview at 1680px"></iframe>
</section>

<section class="mb-8 not-aegov">
  <p class="mb-4 text-sm text-aeblack-500">Screen size: 1366px</p>
  <iframe src="/docs/pages/aegov-header-ministry.html" width="1366" class="block border border-aeblack-100 h-60 rounded-md max-w-full" title="Ministry header preview at 1366px"></iframe>
</section>

<section class="mb-8 not-aegov">
  <p class="mb-4 text-sm text-aeblack-500">Screen size: 1024px</p>
  <iframe src="/docs/pages/aegov-header-ministry.html" width="1024" class="block border border-aeblack-100 h-60 rounded-md max-w-full" title="Ministry header preview at 1024px"></iframe>
</section>

<section class="mb-8 not-aegov">
  <p class="mb-4 text-sm text-aeblack-500">Screen size: 768px</p>
  <iframe src="/docs/pages/aegov-header-ministry.html" width="768" class="block border border-aeblack-100 h-60 rounded-md max-w-full" title="Ministry header preview at 768px"></iframe>
</section>

<section class="mb-8 not-aegov">
  <p class="mb-4 text-sm text-aeblack-500">Screen size: 640px</p>
  <iframe src="/docs/pages/aegov-header-ministry.html" width="640" class="block border border-aeblack-100 h-80 rounded-md max-w-full" title="Ministry header preview at 640px"></iframe>
</section>

### Authority variant

<section class="mb-8 not-aegov">
  <p class="mb-4 text-sm text-aeblack-500">Screen size: 1680px</p>
  <iframe src="/docs/pages/aegov-header-authority.html" width="1680" class="block border border-aeblack-100 h-60 rounded-md max-w-full" title="Authority header preview at 1680px"></iframe>
</section>

<section class="mb-8 not-aegov">
  <p class="mb-4 text-sm text-aeblack-500">Screen size: 1366px</p>
  <iframe src="/docs/pages/aegov-header-authority.html" width="1366" class="block border border-aeblack-100 h-60 rounded-md max-w-full" title="Authority header preview at 1366px"></iframe>
</section>

<section class="mb-8 not-aegov">
  <p class="mb-4 text-sm text-aeblack-500">Screen size: 1024px</p>
  <iframe src="/docs/pages/aegov-header-authority.html" width="1024" class="block border border-aeblack-100 h-60 rounded-md max-w-full" title="Authority header preview at 1024px"></iframe>
</section>

<section class="mb-8 not-aegov">
  <p class="mb-4 text-sm text-aeblack-500">Screen size: 768px</p>
  <iframe src="/docs/pages/aegov-header-authority.html" width="768" class="block border border-aeblack-100 h-60 rounded-md max-w-full" title="Authority header preview at 768px"></iframe>
</section>

<section class="mb-8 not-aegov">
  <p class="mb-4 text-sm text-aeblack-500">Screen size: 640px</p>
  <iframe src="/docs/pages/aegov-header-authority.html" width="640" class="block border border-aeblack-100 h-80 rounded-md max-w-full" title="Authority header preview at 640px"></iframe>
</section>
