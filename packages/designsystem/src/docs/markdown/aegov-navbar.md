# Navbar

<p class="text-lg text-aeblack-500 mb-8">The Navbar is the horizontal primary navigation that sits directly under an <code>aegov-header</code> on every UAE Government page. It composes one or more <code>aegov-navbar-item</code> children — plain links, links with leading icons, or links paired with a dropdown sub-menu — and owns the keyboard navigation between them. The parent navbar cascades a single resolved size token to every child so the entire bar scales together across breakpoints.</p>

## Introduction

The `aegov-navbar` component is a `<nav>` landmark wrapping a `<ul>` of `aegov-navbar-item` children. Each item renders as either an `<a>` (when `href` is set) or a non-link `<span>`. Items can carry a leading icon via the `icon-start` slot, can be marked as the current page with `is-active`, and can host a sub-menu via the `dropdown` slot — in which case a chevron toggle is injected automatically and the entire item rect becomes the dropdown trigger.

```html
<aegov-navbar label-nav="Main navigation" gap="gap-6">
  <aegov-navbar-item href="/" is-active="true">Home</aegov-navbar-item>
  <aegov-navbar-item href="/services">Services</aegov-navbar-item>
  <aegov-navbar-item href="/awareness">Awareness centre</aegov-navbar-item>
  <aegov-navbar-item href="/open-data">Open data</aegov-navbar-item>
  <aegov-navbar-item href="/about">About</aegov-navbar-item>
</aegov-navbar>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-navbar label-nav="Main navigation" gap="gap-6">
    <aegov-navbar-item href="#" is-active="true">Home</aegov-navbar-item>
    <aegov-navbar-item href="#">Services</aegov-navbar-item>
    <aegov-navbar-item href="#">Awareness centre</aegov-navbar-item>
    <aegov-navbar-item href="#">Open data</aegov-navbar-item>
    <aegov-navbar-item href="#">About</aegov-navbar-item>
  </aegov-navbar>
</div>

---

## Sizes

The `size` property selects the typographic scale and item padding. Three tokens are available — `sm`, `base` (default), and `lg`. The parent navbar resolves the size and cascades it to every `aegov-navbar-item` child, so individual items always match their siblings.

| Token  | Use case                                                  |
| ------ | --------------------------------------------------------- |
| `sm`   | Compact site shells, secondary navigation, or footers.     |
| `base` | Default size for primary navigation under the header.      |
| `lg`   | Marketing pages, landing pages, and wide layouts.          |

```html
<aegov-navbar size="sm">…</aegov-navbar>
<aegov-navbar size="base">…</aegov-navbar>
<aegov-navbar size="lg">…</aegov-navbar>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov space-y-6">
  <aegov-navbar size="sm" gap="gap-4">
    <aegov-navbar-item href="#" is-active="true">Home</aegov-navbar-item>
    <aegov-navbar-item href="#">Services</aegov-navbar-item>
    <aegov-navbar-item href="#">News</aegov-navbar-item>
    <aegov-navbar-item href="#">About</aegov-navbar-item>
  </aegov-navbar>
  <aegov-navbar size="base" gap="gap-6">
    <aegov-navbar-item href="#" is-active="true">Home</aegov-navbar-item>
    <aegov-navbar-item href="#">Services</aegov-navbar-item>
    <aegov-navbar-item href="#">News</aegov-navbar-item>
    <aegov-navbar-item href="#">About</aegov-navbar-item>
  </aegov-navbar>
  <aegov-navbar size="lg" gap="gap-8">
    <aegov-navbar-item href="#" is-active="true">Home</aegov-navbar-item>
    <aegov-navbar-item href="#">Services</aegov-navbar-item>
    <aegov-navbar-item href="#">News</aegov-navbar-item>
    <aegov-navbar-item href="#">About</aegov-navbar-item>
  </aegov-navbar>
</div>

### Responsive sizes

`size` also accepts a Tailwind-style responsive string. Each segment overrides smaller breakpoints, so the example below is `sm` on phones, `base` from the `md` breakpoint up, and `lg` from `xl` up.

```html
<aegov-navbar size="sm md:base xl:lg" gap="gap-6">
  <aegov-navbar-item href="/" is-active="true">Home</aegov-navbar-item>
  <aegov-navbar-item href="/services">Services</aegov-navbar-item>
  <aegov-navbar-item href="/news">News</aegov-navbar-item>
  <aegov-navbar-item href="/about">About</aegov-navbar-item>
</aegov-navbar>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-navbar size="sm md:base xl:lg" gap="gap-6">
    <aegov-navbar-item href="#" is-active="true">Home</aegov-navbar-item>
    <aegov-navbar-item href="#">Services</aegov-navbar-item>
    <aegov-navbar-item href="#">News</aegov-navbar-item>
    <aegov-navbar-item href="#">About</aegov-navbar-item>
  </aegov-navbar>
</div>

---

## Gap Between Items

The `gap` property accepts any Tailwind `gap-*` utility class — the default is `gap-3`. Increase the gap on wider layouts and reduce it on dense administrative interfaces.

```html
<aegov-navbar gap="gap-10">
  <aegov-navbar-item href="/">Home</aegov-navbar-item>
  <aegov-navbar-item href="/services">Services</aegov-navbar-item>
  <aegov-navbar-item href="/news">News</aegov-navbar-item>
  <aegov-navbar-item href="/contact">Contact</aegov-navbar-item>
</aegov-navbar>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-navbar gap="gap-10">
    <aegov-navbar-item href="#" is-active="true">Home</aegov-navbar-item>
    <aegov-navbar-item href="#">Services</aegov-navbar-item>
    <aegov-navbar-item href="#">News</aegov-navbar-item>
    <aegov-navbar-item href="#">Contact</aegov-navbar-item>
  </aegov-navbar>
</div>

---

## Active Item

Set `is-active="true"` on exactly one item per route. The component sets `aria-current="page"` on the inner link so assistive technologies announce the visitor's current location, and a visual treatment is applied so sighted users can see it too.

```html
<aegov-navbar label-nav="Main navigation" gap="gap-6">
  <aegov-navbar-item href="/">Home</aegov-navbar-item>
  <aegov-navbar-item href="/services" is-active="true">Services</aegov-navbar-item>
  <aegov-navbar-item href="/news">News</aegov-navbar-item>
  <aegov-navbar-item href="/about">About</aegov-navbar-item>
</aegov-navbar>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-navbar label-nav="Main navigation" gap="gap-6">
    <aegov-navbar-item href="#">Home</aegov-navbar-item>
    <aegov-navbar-item href="#" is-active="true">Services</aegov-navbar-item>
    <aegov-navbar-item href="#">News</aegov-navbar-item>
    <aegov-navbar-item href="#">About</aegov-navbar-item>
  </aegov-navbar>
</div>

---

## Disabled Items

Set `is-disabled="true"` to mark an item as unavailable. The item is rendered as a non-clickable span with `aria-disabled="true"` and is skipped by the arrow-key cycle, so keyboard users do not get stuck on it.

```html
<aegov-navbar label-nav="Main navigation" gap="gap-6">
  <aegov-navbar-item href="/" is-active="true">Home</aegov-navbar-item>
  <aegov-navbar-item href="/services">Services</aegov-navbar-item>
  <aegov-navbar-item is-disabled="true">Open data (coming soon)</aegov-navbar-item>
  <aegov-navbar-item href="/about">About</aegov-navbar-item>
</aegov-navbar>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-navbar label-nav="Main navigation" gap="gap-6">
    <aegov-navbar-item href="#" is-active="true">Home</aegov-navbar-item>
    <aegov-navbar-item href="#">Services</aegov-navbar-item>
    <aegov-navbar-item is-disabled="true">Open data (coming soon)</aegov-navbar-item>
    <aegov-navbar-item href="#">About</aegov-navbar-item>
  </aegov-navbar>
</div>

---

## Items with Leading Icons

Place an SVG (or any inline element) in the `icon-start` slot of an `aegov-navbar-item` to render a leading icon next to the label. Icons are useful for orientation in long navigation bars but should remain optional and consistent — avoid mixing items with and without icons in the same group.

```html
<aegov-navbar gap="gap-8">
  <aegov-navbar-item href="/" is-active="true">
    <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><path fill="currentColor" d="M218.83 103.77 138.83 26.61a16 16 0 0 0-21.66 0l-80 77.16A16 16 0 0 0 32 115.55V208a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16v-56h32v56a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16v-92.45a16 16 0 0 0-5.17-11.78"/></svg>
    Home
  </aegov-navbar-item>
  <aegov-navbar-item href="/services">
    <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><path fill="currentColor" d="M227.32 73.37 182.63 28.69A16 16 0 0 0 171.31 24H32a8 8 0 0 0-8 8v192a8 8 0 0 0 8 8h192a8 8 0 0 0 8-8V84.69a16 16 0 0 0-4.68-11.32"/></svg>
    Services
  </aegov-navbar-item>
  <aegov-navbar-item href="/news">
    <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><path fill="currentColor" d="M224 48H32a8 8 0 0 0-8 8v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a8 8 0 0 0-8-8M88 176H56a8 8 0 0 1 0-16h32a8 8 0 0 1 0 16m0-32H56a8 8 0 0 1 0-16h32a8 8 0 0 1 0 16m112 32h-80a8 8 0 0 1 0-16h80a8 8 0 0 1 0 16m0-32h-80a8 8 0 0 1 0-16h80a8 8 0 0 1 0 16m0-40H56a8 8 0 0 1 0-16h144a8 8 0 0 1 0 16"/></svg>
    News
  </aegov-navbar-item>
  <aegov-navbar-item href="/contact">
    <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><path fill="currentColor" d="M224 48H32a8 8 0 0 0-8 8v136a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a8 8 0 0 0-8-8m-96 85.15L52.57 64h150.86Z"/></svg>
    Contact
  </aegov-navbar-item>
</aegov-navbar>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-navbar gap="gap-8">
    <aegov-navbar-item href="#" is-active="true">
      <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><path fill="currentColor" d="M218.83 103.77 138.83 26.61a16 16 0 0 0-21.66 0l-80 77.16A16 16 0 0 0 32 115.55V208a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16v-56h32v56a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16v-92.45a16 16 0 0 0-5.17-11.78"/></svg>
      Home
    </aegov-navbar-item>
    <aegov-navbar-item href="#">
      <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><path fill="currentColor" d="M227.32 73.37 182.63 28.69A16 16 0 0 0 171.31 24H32a8 8 0 0 0-8 8v192a8 8 0 0 0 8 8h192a8 8 0 0 0 8-8V84.69a16 16 0 0 0-4.68-11.32"/></svg>
      Services
    </aegov-navbar-item>
    <aegov-navbar-item href="#">
      <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><path fill="currentColor" d="M224 48H32a8 8 0 0 0-8 8v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a8 8 0 0 0-8-8M88 176H56a8 8 0 0 1 0-16h32a8 8 0 0 1 0 16m0-32H56a8 8 0 0 1 0-16h32a8 8 0 0 1 0 16m112 32h-80a8 8 0 0 1 0-16h80a8 8 0 0 1 0 16m0-32h-80a8 8 0 0 1 0-16h80a8 8 0 0 1 0 16m0-40H56a8 8 0 0 1 0-16h144a8 8 0 0 1 0 16"/></svg>
      News
    </aegov-navbar-item>
    <aegov-navbar-item href="#">
      <svg slot="icon-start" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><path fill="currentColor" d="M224 48H32a8 8 0 0 0-8 8v136a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a8 8 0 0 0-8-8m-96 85.15L52.57 64h150.86Z"/></svg>
      Contact
    </aegov-navbar-item>
  </aegov-navbar>
</div>

---

## Items with a Sub-menu

Place an `aegov-dropdown` in the `dropdown` slot of an item to add a sub-menu. The navbar item automatically injects a chevron toggle button next to the label and routes the entire item rect as the dropdown trigger. Set `trigger="hover"` on the dropdown to open on hover, or leave it as `click` for keyboard-friendly toggling.

```html
<aegov-navbar label-nav="Main navigation" gap="gap-8">
  <aegov-navbar-item href="/" is-active="true">Home</aegov-navbar-item>
  <aegov-navbar-item href="/services">
    Services
    <aegov-dropdown slot="dropdown" trigger="hover">
      <div slot="dropdown-content">
        <a href="/services/visas">Visas and entry permits</a>
        <a href="/services/passports">Passports</a>
        <a href="/services/emirates-id">Emirates ID</a>
        <a href="/services/customs">Customs declarations</a>
      </div>
    </aegov-dropdown>
  </aegov-navbar-item>
  <aegov-navbar-item href="/about">
    About
    <aegov-dropdown slot="dropdown" trigger="hover">
      <div slot="dropdown-content">
        <a href="/about/leadership">Our leadership</a>
        <a href="/about/strategy">Strategy 2031</a>
        <a href="/about/contact">Contact us</a>
      </div>
    </aegov-dropdown>
  </aegov-navbar-item>
  <aegov-navbar-item href="/news">News</aegov-navbar-item>
</aegov-navbar>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-navbar label-nav="Main navigation" gap="gap-8">
    <aegov-navbar-item href="#" is-active="true">Home</aegov-navbar-item>
    <aegov-navbar-item href="#">
      Services
      <aegov-dropdown slot="dropdown" trigger="hover">
        <div slot="dropdown-content">
          <a href="#">Visas and entry permits</a>
          <a href="#">Passports</a>
          <a href="#">Emirates ID</a>
          <a href="#">Customs declarations</a>
        </div>
      </aegov-dropdown>
    </aegov-navbar-item>
    <aegov-navbar-item href="#">
      About
      <aegov-dropdown slot="dropdown" trigger="hover">
        <div slot="dropdown-content">
          <a href="#">Our leadership</a>
          <a href="#">Strategy 2031</a>
          <a href="#">Contact us</a>
        </div>
      </aegov-dropdown>
    </aegov-navbar-item>
    <aegov-navbar-item href="#">News</aegov-navbar-item>
  </aegov-navbar>
</div>

When an item has both an `href` and a dropdown, clicking the link navigates to the destination, while clicking the chevron (or pressing <kbd>Enter</kbd> / <kbd>Space</kbd> / <kbd>ArrowDown</kbd> on the chevron) toggles the menu. Both behaviours coexist by design so that the parent landing page remains directly reachable.

---

## Composing with the Header

The navbar is most often paired with `aegov-header` to form the standard top of a UAE Government page. The composite below is a realistic primary navigation for a ministry site.

```html
<aegov-header
  entity-name="Ministry of Industry and Advanced Technology"
  entity-domain="https://moiat.gov.ae"
  skip-content-container="#main"
>
  <img slot="logo" src="https://moiat.gov.ae/-/media/site/moiat/identity/logo/moiat_logo_eng.ashx?iar=0&hash=42716B005DAA289F20DE7B83B575605A" alt="MOIAT logo" />
</aegov-header>

<div class="aegov-container">
  <aegov-navbar label-nav="Main navigation" gap="gap-6" size="sm md:base">
    <aegov-navbar-item href="/" is-active="true">Home</aegov-navbar-item>
    <aegov-navbar-item href="/services">
      Services
      <aegov-dropdown slot="dropdown" trigger="hover">
        <div slot="dropdown-content">
          <a href="/services/business">Business licensing</a>
          <a href="/services/industry">Industrial registration</a>
          <a href="/services/standards">Standards and metrology</a>
        </div>
      </aegov-dropdown>
    </aegov-navbar-item>
    <aegov-navbar-item href="/awareness">Awareness centre</aegov-navbar-item>
    <aegov-navbar-item href="/open-data">Open data</aegov-navbar-item>
    <aegov-navbar-item href="/media">Media centre</aegov-navbar-item>
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
  </aegov-header>
  <div class="aegov-container py-2">
    <aegov-navbar label-nav="Main navigation" gap="gap-6" size="sm md:base">
      <aegov-navbar-item href="#" is-active="true">Home</aegov-navbar-item>
      <aegov-navbar-item href="#">
        Services
        <aegov-dropdown slot="dropdown" trigger="hover">
          <div slot="dropdown-content">
            <a href="#">Business licensing</a>
            <a href="#">Industrial registration</a>
            <a href="#">Standards and metrology</a>
          </div>
        </aegov-dropdown>
      </aegov-navbar-item>
      <aegov-navbar-item href="#">Awareness centre</aegov-navbar-item>
      <aegov-navbar-item href="#">Open data</aegov-navbar-item>
      <aegov-navbar-item href="#">Media centre</aegov-navbar-item>
      <aegov-navbar-item href="#">About</aegov-navbar-item>
    </aegov-navbar>
  </div>
</div>

---

## RTL Support

The navbar reads `dir="rtl"` from the closest `[dir]` ancestor or the document root. In RTL mode, <kbd>ArrowLeft</kbd> and <kbd>ArrowRight</kbd> swap roles so that pressing the right arrow always moves to the next visual item from the user's perspective. Layout, gaps, the active-item indicator, and the dropdown chevron rotation are all mirrored automatically through CSS logical properties.

```html
<div dir="rtl">
  <aegov-navbar label-nav="التنقل الرئيسي" gap="gap-6">
    <aegov-navbar-item href="/" is-active="true">الرئيسية</aegov-navbar-item>
    <aegov-navbar-item href="/services">
      الخدمات
      <aegov-dropdown slot="dropdown" trigger="hover">
        <div slot="dropdown-content">
          <a href="/services/visas">التأشيرات وتصاريح الدخول</a>
          <a href="/services/passports">جوازات السفر</a>
          <a href="/services/emirates-id">الهوية الإماراتية</a>
        </div>
      </aegov-dropdown>
    </aegov-navbar-item>
    <aegov-navbar-item href="/news">الأخبار</aegov-navbar-item>
    <aegov-navbar-item href="/about">عنّا</aegov-navbar-item>
    <aegov-navbar-item href="/contact">اتصل بنا</aegov-navbar-item>
  </aegov-navbar>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-navbar label-nav="التنقل الرئيسي" gap="gap-6">
    <aegov-navbar-item href="#" is-active="true">الرئيسية</aegov-navbar-item>
    <aegov-navbar-item href="#">
      الخدمات
      <aegov-dropdown slot="dropdown" trigger="hover">
        <div slot="dropdown-content">
          <a href="#">التأشيرات وتصاريح الدخول</a>
          <a href="#">جوازات السفر</a>
          <a href="#">الهوية الإماراتية</a>
        </div>
      </aegov-dropdown>
    </aegov-navbar-item>
    <aegov-navbar-item href="#">الأخبار</aegov-navbar-item>
    <aegov-navbar-item href="#">عنّا</aegov-navbar-item>
    <aegov-navbar-item href="#">اتصل بنا</aegov-navbar-item>
  </aegov-navbar>
</div>

The same navigation paired with the Arabic header for a full bilingual top-of-page composite:

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
      <aegov-navbar-item href="/centers">المراكز الصحية</aegov-navbar-item>
      <aegov-navbar-item href="/about">عنّا</aegov-navbar-item>
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
      <aegov-navbar-item href="#">المراكز الصحية</aegov-navbar-item>
      <aegov-navbar-item href="#">عنّا</aegov-navbar-item>
    </aegov-navbar>
  </div>
</div>

---

## API Reference

### aegov-navbar Properties

| Property    | Attribute    | Description                                                                                                          | Type     | Default            |
| ----------- | ------------ | -------------------------------------------------------------------------------------------------------------------- | -------- | ------------------ |
| `size`      | `size`       | Size token cascaded to every child item. Accepts a single token (`sm`, `base`, `lg`) or a Tailwind-style responsive string. | `string` | `'base'`           |
| `gap`       | `gap`        | Tailwind gap utility class applied between items, e.g. `gap-3`, `gap-6`, `gap-10`.                                   | `string` | `'gap-3'`          |
| `labelNav`  | `label-nav`  | Accessible label for the inner `<nav>` landmark.                                                                     | `string` | `''`               |

### aegov-navbar-item Properties

| Property      | Attribute      | Description                                                                                            | Type                                              | Default     |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------- | ----------- |
| `href`        | `href`         | URL the item links to. Omit to render a non-link span.                                                 | `string`                                          | `undefined` |
| `target`      | `target`       | Anchor `target` attribute, forwarded to the inner link.                                                | `'_blank' \| '_self' \| '_parent' \| '_top'`      | `undefined` |
| `rel`         | `rel`          | Anchor `rel` attribute, forwarded to the inner link.                                                   | `string`                                          | `undefined` |
| `isActive`    | `is-active`    | Marks the item as the current page. Sets `aria-current="page"` on the inner link.                      | `boolean`                                         | `false`     |
| `isDisabled`  | `is-disabled`  | Visually disables the item, sets `aria-disabled="true"`, and removes it from the arrow-key cycle.       | `boolean`                                         | `false`     |
| `size`        | `size`         | _Set by the parent navbar._ Size token applied to the item.                                             | `string`                                          | `'base'`    |

> The item must be used inside `<aegov-navbar>` — if it is rendered standalone the component throws a runtime error.

### Slots

| Component            | Slot          | Description                                                                                              |
| -------------------- | ------------- | -------------------------------------------------------------------------------------------------------- |
| `aegov-navbar`       | _(default)_   | Place one or more `aegov-navbar-item` children here.                                                      |
| `aegov-navbar-item`  | _(default)_   | The item label text.                                                                                      |
| `aegov-navbar-item`  | `icon-start`  | Optional leading icon (typically an inline SVG).                                                          |
| `aegov-navbar-item`  | `dropdown`    | Optional `aegov-dropdown` element used as a sub-menu. Triggers the chevron toggle and full-rect trigger.  |

### Events

Neither the navbar nor its items emit custom events. Listen for native events on the inner anchor when you need click handling:

```html
<aegov-navbar id="primary-nav">
  <aegov-navbar-item href="/about">About</aegov-navbar-item>
  <aegov-navbar-item href="/contact">Contact</aegov-navbar-item>
</aegov-navbar>

<script>
  document.querySelectorAll('#primary-nav aegov-navbar-item a').forEach((a) => {
    a.addEventListener('click', (event) => {
      console.log('Navigated to', a.href);
    });
  });
</script>
```

### Pass-through Attributes

| Component            | Attribute group               | Forwarded? | Where applied                                                                                       |
| -------------------- | ----------------------------- | ---------- | --------------------------------------------------------------------------------------------------- |
| `aegov-navbar`       | `aria-*`, `data-*`            | No         | Apply directly to the host `<aegov-navbar>` element.                                                 |
| `aegov-navbar`       | `class`, `style`, `id`        | Allowed    | Applied to the host element.                                                                         |
| `aegov-navbar-item`  | `aria-*`, `data-*`            | Yes        | Forwarded to the inner `<li>` host (handled by `getPassThroughAttributes`).                           |
| `aegov-navbar-item`  | `target`, `rel`, `referrerpolicy` | Yes    | Forwarded to the inner `<a>` link element.                                                            |
| `aegov-navbar-item`  | `class`, `style`, `id`        | Allowed    | Applied to the host element.                                                                         |

---

## Accessibility

### Built-in behaviour

- The navbar renders as a `<nav>` landmark with the configurable `aria-label` you provide via `label-nav`.
- Items render as semantic `<li>` children of an inner `<ul>` so the structure is exposed to assistive technologies.
- The active item sets `aria-current="page"` on its inner link.
- Disabled items set `aria-disabled="true"` and are skipped by the arrow-key cycle.
- Roving focus among items via <kbd>ArrowLeft</kbd>, <kbd>ArrowRight</kbd>, <kbd>Home</kbd>, and <kbd>End</kbd> — direction-aware in RTL.
- When an item has a dropdown, the injected chevron is a real `<button>` with `aria-label="Open <label> submenu"` so screen-reader users hear what it controls.
- <kbd>Enter</kbd>, <kbd>Space</kbd>, and <kbd>ArrowDown</kbd> on the chevron all open the sub-menu, after which focus moves into the dropdown menu.

### Developer responsibilities

- Mark exactly one item per route with `is-active="true"`.
- Provide a meaningful `label-nav` whenever the page contains more than one navigation landmark (for example, a primary navbar plus a footer navbar).
- Keep item labels short — long labels can break the horizontal layout on smaller viewports.
- For dropdowns, follow the `aegov-dropdown` accessibility guidance — focus management inside the menu is owned by the dropdown.
- When supplying icons via `icon-start`, mark them as decorative (`aria-hidden="true"`) so the label remains the single accessible name.

### Keyboard support

| Key                             | Action                                                                            |
| ------------------------------- | --------------------------------------------------------------------------------- |
| `Tab`                           | Move focus into and out of the navbar.                                            |
| `ArrowRight`                    | Move focus to the next item or chevron. In RTL, moves to the previous element.    |
| `ArrowLeft`                     | Move focus to the previous item or chevron. In RTL, moves to the next element.    |
| `Home`                          | Move focus to the first focusable item.                                           |
| `End`                           | Move focus to the last focusable item.                                            |
| `Enter`                         | Activate the focused link, or toggle the focused chevron.                         |
| `Space`                         | Toggle the focused chevron.                                                       |
| `ArrowDown` (on chevron)        | Open the sub-menu and move focus into it.                                         |

### Notes

- An unknown `size` token falls back to `base` and emits a development-time warning.
- An item with both an `href` and a dropdown is intentional: the link navigates and the chevron toggles the menu — both interactions coexist.
- `aegov-navbar-item` cannot be used outside of `<aegov-navbar>` — doing so throws a runtime error during initialisation.
