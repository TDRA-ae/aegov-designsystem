<template>
  <div class="min-h-screen bg-aeblack-100 dark:bg-aeblack-950 text-aeblack-800 dark:text-whitely-100 transition-colors duration-200">

    <!-- Topbar -->
    <header class="sticky top-0 z-50 flex items-center gap-4 border-b border-aeblack-200 dark:border-aeblack-700 bg-white/95 dark:bg-aeblack-900/95 backdrop-blur px-5 py-2.5">
      <div class="flex items-center gap-2 me-4">
        <aegov-badge color="primary" appearance="solid">AEGOV DS</aegov-badge>
        <span class="text-sm font-medium text-aeblack-600 dark:text-aeblack-400">Test App — Vue 3</span>
      </div>

      <aegov-separator orientation="vertical"></aegov-separator>

      <aegov-toggle
        field-id="dark-mode"
        label="Dark Mode"
        :is-checked="isDark"
        @aegov-toggle-change="onDarkToggle"
      ></aegov-toggle>

      <aegov-separator orientation="vertical"></aegov-separator>

      <aegov-toggle
        field-id="rtl-mode"
        label="RTL عربي"
        :is-checked="isRtl"
        @aegov-toggle-change="onRtlToggle"
      ></aegov-toggle>

      <div class="ms-auto flex items-center gap-2">
        <aegov-badge :color="isDark ? 'purple' : 'aeblack'">{{ isDark ? 'Dark' : 'Light' }}</aegov-badge>
        <aegov-badge :color="isRtl ? 'aegold' : 'techblue'">{{ isRtl ? 'RTL' : 'LTR' }}</aegov-badge>
      </div>
    </header>

    <!-- Page layout -->
    <div class="flex">

      <!-- Sidebar -->
      <aside class="sticky top-[53px] h-[calc(100vh-53px)] w-52 shrink-0 overflow-y-auto border-e border-aeblack-200 dark:border-aeblack-700 bg-white dark:bg-aeblack-900 px-3 py-5 hidden md:block">
        <p class="px-2 mb-1 text-[10px] font-bold uppercase tracking-widest text-aeblack-400 dark:text-aeblack-600">Foundation</p>
        <ul class="space-y-0.5 mb-4">
          <li><a href="#typography" class="nav-link">Typography</a></li>
          <li><a href="#colors" class="nav-link">Color Palette</a></li>
        </ul>
        <p class="px-2 mb-1 text-[10px] font-bold uppercase tracking-widest text-aeblack-400 dark:text-aeblack-600">Components</p>
        <ul class="space-y-0.5 mb-4">
          <li><a href="#buttons" class="nav-link">Buttons</a></li>
          <li><a href="#button-sizes" class="nav-link">Button Sizes</a></li>
          <li><a href="#badges" class="nav-link">Badges</a></li>
          <li><a href="#badge-appearances" class="nav-link">Badge Appearances</a></li>
          <li><a href="#inputs" class="nav-link">Input</a></li>
          <li><a href="#select" class="nav-link">Select</a></li>
          <li><a href="#checkbox" class="nav-link">Checkbox</a></li>
          <li><a href="#tabs" class="nav-link">Tabs</a></li>
        </ul>
        <p class="px-2 mb-1 text-[10px] font-bold uppercase tracking-widest text-aeblack-400 dark:text-aeblack-600">Testing</p>
        <ul class="space-y-0.5 mb-4">
          <li><a href="#states" class="nav-link">Component States</a></li>
        </ul>
        <p class="px-2 mb-1 text-[10px] font-bold uppercase tracking-widest text-aeblack-400 dark:text-aeblack-600">Theming</p>
        <ul class="space-y-0.5">
          <li><a href="#dark-mode-section" class="nav-link">Dark Mode</a></li>
          <li><a href="#rtl" class="nav-link">RTL / Arabic</a></li>
        </ul>
      </aside>

      <!-- Main content -->
      <main class="flex-1 min-w-0 px-6 py-6 space-y-6 max-w-4xl">

        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-h4 font-extrabold text-aeblack-900 dark:text-whitely-100">AEGOV Design System</h1>
            <p class="text-sm text-aeblack-500 dark:text-aeblack-400 mt-1">All components · Vue 3 + Tailwind v4 + Vite</p>
          </div>
          <aegov-badge color="aegreen" appearance="soft">v0.0.3</aegov-badge>
        </div>

        <!-- TYPOGRAPHY -->
        <section id="typography">
          <div class="section-card">
            <div class="section-card-header flex items-start justify-between gap-4">
              <div>
                <h2 class="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Typography</h2>
                <p class="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">Semantic heading elements and utility-class equivalents</p>
              </div>
              <aegov-badge color="primary" appearance="soft">Foundation</aegov-badge>
            </div>
            <div class="section-card-body">
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-wide text-aeblack-400 dark:text-aeblack-500 mb-3">Semantic elements</p>
                  <div class="preview-box space-y-1.5">
                    <h1>Heading 1 — The quick brown fox</h1>
                    <h2>Heading 2 — The quick brown fox</h2>
                    <h3>Heading 3 — The quick brown fox</h3>
                    <h4>Heading 4 — The quick brown fox</h4>
                    <h5>Heading 5 — The quick brown fox</h5>
                    <h6>Heading 6 — The quick brown fox</h6>
                  </div>
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-wide text-aeblack-400 dark:text-aeblack-500 mb-3">Utility classes <code class="font-mono text-[10px] bg-aeblack-100 dark:bg-aeblack-800 px-1 rounded">text-h1…h6</code></p>
                  <div class="preview-box space-y-1.5">
                    <div class="text-h1">Heading 1 — The quick brown fox</div>
                    <div class="text-h2">Heading 2 — The quick brown fox</div>
                    <div class="text-h3">Heading 3 — The quick brown fox</div>
                    <div class="text-h4">Heading 4 — The quick brown fox</div>
                    <div class="text-h5">Heading 5 — The quick brown fox</div>
                    <div class="text-h6">Heading 6 — The quick brown fox</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- COLOR PALETTE -->
        <section id="colors">
          <div class="section-card">
            <div class="section-card-header flex items-start justify-between gap-4">
              <div>
                <h2 class="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Color Palette</h2>
                <p class="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">All 18 theme color families — 50 to 950 shades</p>
              </div>
              <aegov-badge color="primary" appearance="soft">Foundation</aegov-badge>
            </div>
            <div class="section-card-body space-y-2.5">
              <div v-for="palette in colorPalettes" :key="palette.name" class="space-y-1">
                <span class="font-mono text-[11px] font-semibold text-aeblack-500 dark:text-aeblack-400">{{ palette.name }}</span>
                <div class="flex rounded-lg overflow-hidden h-9">
                  <div
                    v-for="(shade, i) in palette.shades"
                    :key="shade"
                    :class="`flex-1 grid place-items-center ${palette.bg[shade]}`"
                  >
                    <span :class="`text-[9px] font-mono ${i <= palette.split ? 'text-aeblack-700' : 'text-white'}`">{{ shade }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- BUTTONS -->
        <section id="buttons">
          <div class="section-card">
            <div class="section-card-header flex items-start justify-between gap-4">
              <div>
                <h2 class="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Buttons</h2>
                <p class="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">All variants — primary, secondary, danger, neutral-min, neutral-max</p>
              </div>
              <aegov-badge color="techblue" appearance="soft">Component</aegov-badge>
            </div>
            <div class="section-card-body">
              <div class="preview-box flex gap-3 flex-wrap items-center">
                <aegov-button variant="primary">Primary</aegov-button>
                <aegov-button variant="secondary">Secondary</aegov-button>
                <aegov-button variant="danger">Danger</aegov-button>
                <aegov-button variant="neutral-min">Neutral Min</aegov-button>
                <aegov-button variant="neutral-max">Neutral Max</aegov-button>
                <aegov-button variant="primary" is-disabled="true">Disabled</aegov-button>
                <aegov-button variant="primary" :is-loading="isLoading" @aegov-button-click="handleButtonClick">
                  {{ isLoading ? 'Loading…' : 'Click → Loading' }}
                </aegov-button>
              </div>
            </div>
          </div>
        </section>

        <!-- BUTTON SIZES -->
        <section id="button-sizes">
          <div class="section-card">
            <div class="section-card-header flex items-start justify-between gap-4">
              <div>
                <h2 class="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Button Sizes</h2>
                <p class="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">All 5 variants × all 5 sizes</p>
              </div>
              <aegov-badge color="techblue" appearance="soft">Component</aegov-badge>
            </div>
            <div class="section-card-body overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-aeblack-100 dark:border-aeblack-700">
                    <th v-for="h in ['Variant','xs','sm','base','lg','xl']" :key="h" class="py-2 pe-5 text-start text-[11px] font-semibold uppercase tracking-wide text-aeblack-400 dark:text-aeblack-500">{{ h }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-aeblack-50 dark:divide-aeblack-800">
                  <tr v-for="variant in ['primary','secondary','danger','neutral-min','neutral-max']" :key="variant">
                    <td class="py-3 pe-5 font-mono text-[11px] text-aeblack-400 dark:text-aeblack-500">{{ variant }}</td>
                    <td v-for="size in ['xs','sm','base','lg','xl']" :key="size" class="py-3 pe-5">
                      <aegov-button :variant="variant" :size="size">Button</aegov-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- BADGES -->
        <section id="badges">
          <div class="section-card">
            <div class="section-card-header flex items-start justify-between gap-4">
              <div>
                <h2 class="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Badges</h2>
                <p class="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">All 17 color values</p>
              </div>
              <aegov-badge color="techblue" appearance="soft">Component</aegov-badge>
            </div>
            <div class="section-card-body">
              <div class="preview-box flex gap-2 flex-wrap">
                <aegov-badge v-for="color in badgeColors" :key="color" :color="color">{{ color }}</aegov-badge>
              </div>
            </div>
          </div>
        </section>

        <!-- BADGE APPEARANCES -->
        <section id="badge-appearances">
          <div class="section-card">
            <div class="section-card-header flex items-start justify-between gap-4">
              <div>
                <h2 class="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Badge Appearances</h2>
                <p class="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">Soft (default) vs Solid</p>
              </div>
              <aegov-badge color="techblue" appearance="soft">Component</aegov-badge>
            </div>
            <div class="section-card-body">
              <div class="grid grid-cols-2 gap-5">
                <div v-for="appearance in ['soft','solid']" :key="appearance" class="space-y-2">
                  <p class="text-xs font-semibold uppercase tracking-wide text-aeblack-400 dark:text-aeblack-500 capitalize">{{ appearance }}</p>
                  <div class="preview-box flex flex-wrap gap-2">
                    <aegov-badge v-for="color in badgeColors.slice(0, 14)" :key="color" :color="color" :appearance="appearance">{{ color }}</aegov-badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- INPUT -->
        <section id="inputs">
          <div class="section-card">
            <div class="section-card-header flex items-start justify-between gap-4">
              <div>
                <h2 class="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Input</h2>
                <p class="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">Use <code class="font-mono text-[11px]">field-id</code> (kebab-case in Vue)</p>
              </div>
              <aegov-badge color="techblue" appearance="soft">Component</aegov-badge>
            </div>
            <div class="section-card-body">
              <div class="preview-box grid grid-cols-2 gap-4 max-w-2xl">
                <aegov-input field-id="inp-name" placeholder="Full name"></aegov-input>
                <aegov-input field-id="inp-email" placeholder="Email address" type="email" is-required="true"></aegov-input>
                <aegov-input field-id="inp-pass" placeholder="Password" type="password" is-revealable="true"></aegov-input>
                <aegov-input field-id="inp-hint" placeholder="With hint text" hint="This is a helpful hint"></aegov-input>
              </div>
            </div>
          </div>
        </section>

        <!-- SELECT -->
        <section id="select">
          <div class="section-card">
            <div class="section-card-header flex items-start justify-between gap-4">
              <div>
                <h2 class="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Select</h2>
                <p class="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">Single, searchable, clearable</p>
              </div>
              <aegov-badge color="techblue" appearance="soft">Component</aegov-badge>
            </div>
            <div class="section-card-body">
              <div class="preview-box grid grid-cols-2 gap-4 max-w-2xl">
                <aegov-select field-id="sel-status" placeholder="Select a status">
                  <aegov-select-option value="active">Active</aegov-select-option>
                  <aegov-select-option value="pending">Pending</aegov-select-option>
                  <aegov-select-option value="closed">Closed</aegov-select-option>
                </aegov-select>
                <aegov-select field-id="sel-search" placeholder="Searchable + clearable" is-searchable="true" is-clearable="true">
                  <aegov-select-option value="ae">United Arab Emirates</aegov-select-option>
                  <aegov-select-option value="sa">Saudi Arabia</aegov-select-option>
                  <aegov-select-option value="eg">Egypt</aegov-select-option>
                </aegov-select>
              </div>
            </div>
          </div>
        </section>

        <!-- CHECKBOX -->
        <section id="checkbox">
          <div class="section-card">
            <div class="section-card-header flex items-start justify-between gap-4">
              <div>
                <h2 class="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Checkbox</h2>
                <p class="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">Use <code class="font-mono text-[11px]">is-checked</code> (kebab-case in Vue)</p>
              </div>
              <aegov-badge color="techblue" appearance="soft">Component</aegov-badge>
            </div>
            <div class="section-card-body">
              <div class="preview-box flex flex-wrap gap-6">
                <aegov-checkbox field-id="chk-agree" label="I agree to the terms and conditions"></aegov-checkbox>
                <aegov-checkbox field-id="chk-news" label="Subscribe to newsletter" is-checked="true"></aegov-checkbox>
                <aegov-checkbox field-id="chk-hint" label="With hint text" hint="This is a helpful description"></aegov-checkbox>
              </div>
            </div>
          </div>
        </section>

        <!-- TABS -->
        <section id="tabs">
          <div class="section-card">
            <div class="section-card-header flex items-start justify-between gap-4">
              <div>
                <h2 class="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Tabs</h2>
                <p class="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5"><code class="font-mono text-[11px]">tab-id</code> (kebab-case in Vue) — required prop</p>
              </div>
              <aegov-badge color="techblue" appearance="soft">Component</aegov-badge>
            </div>
            <div class="section-card-body">
              <aegov-tabs default-open="overview">
                <aegov-tab slot="tabs" tab-id="overview">Overview</aegov-tab>
                <aegov-tab slot="tabs" tab-id="details">Details</aegov-tab>
                <aegov-tab slot="tabs" tab-id="history">History</aegov-tab>
                <aegov-tab-panel tab-id="overview">
                  <div class="p-4"><p class="text-sm text-aeblack-600 dark:text-aeblack-400">Overview — <code class="font-mono text-[11px] bg-aeblack-100 dark:bg-aeblack-800 px-1 rounded">tab-id</code> is kebab-case in Vue.</p></div>
                </aegov-tab-panel>
                <aegov-tab-panel tab-id="details">
                  <div class="p-4"><p class="text-sm text-aeblack-600 dark:text-aeblack-400">Details panel.</p></div>
                </aegov-tab-panel>
                <aegov-tab-panel tab-id="history">
                  <div class="p-4"><p class="text-sm text-aeblack-600 dark:text-aeblack-400">History panel.</p></div>
                </aegov-tab-panel>
              </aegov-tabs>
            </div>
          </div>
        </section>

        <!-- COMPONENT STATES -->
        <section id="states">
          <div class="section-card">
            <div class="section-card-header flex items-start justify-between gap-4">
              <div>
                <h2 class="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Component States</h2>
                <p class="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">Normal · Disabled · Readonly · Required</p>
              </div>
              <aegov-badge color="aegold" appearance="soft">Testing</aegov-badge>
            </div>
            <div class="section-card-body space-y-6">
              <div class="space-y-2">
                <aegov-separator text="Input"></aegov-separator>
                <div class="preview-box grid grid-cols-2 gap-4 max-w-2xl">
                  <div class="space-y-1"><p class="text-[11px] font-semibold uppercase tracking-wide text-aeblack-400 dark:text-aeblack-500">Normal</p><aegov-input field-id="st-n" placeholder="Normal input"></aegov-input></div>
                  <div class="space-y-1"><p class="text-[11px] font-semibold uppercase tracking-wide text-aeblack-400 dark:text-aeblack-500">Disabled</p><aegov-input field-id="st-d" placeholder="Disabled input" is-disabled="true"></aegov-input></div>
                  <div class="space-y-1"><p class="text-[11px] font-semibold uppercase tracking-wide text-aeblack-400 dark:text-aeblack-500">Readonly</p><aegov-input field-id="st-r" placeholder="Readonly input" is-readonly="true"></aegov-input></div>
                  <div class="space-y-1"><p class="text-[11px] font-semibold uppercase tracking-wide text-aeblack-400 dark:text-aeblack-500">Required</p><aegov-input field-id="st-req" placeholder="Required input" is-required="true"></aegov-input></div>
                </div>
              </div>
              <div class="space-y-2">
                <aegov-separator text="Select"></aegov-separator>
                <div class="preview-box grid grid-cols-2 gap-4 max-w-2xl">
                  <div class="space-y-1"><p class="text-[11px] font-semibold uppercase tracking-wide text-aeblack-400 dark:text-aeblack-500">Normal</p>
                    <aegov-select field-id="sts-n" placeholder="Normal"><aegov-select-option value="a">Option A</aegov-select-option></aegov-select></div>
                  <div class="space-y-1"><p class="text-[11px] font-semibold uppercase tracking-wide text-aeblack-400 dark:text-aeblack-500">Disabled</p>
                    <aegov-select field-id="sts-d" placeholder="Disabled" is-disabled="true"><aegov-select-option value="a">Option A</aegov-select-option></aegov-select></div>
                  <div class="space-y-1"><p class="text-[11px] font-semibold uppercase tracking-wide text-aeblack-400 dark:text-aeblack-500">Required</p>
                    <aegov-select field-id="sts-req" placeholder="Required" is-required="true"><aegov-select-option value="a">Option A</aegov-select-option></aegov-select></div>
                  <div class="space-y-1"><p class="text-[11px] font-semibold uppercase tracking-wide text-aeblack-400 dark:text-aeblack-500">Searchable</p>
                    <aegov-select field-id="sts-s" placeholder="Searchable" is-searchable="true" is-clearable="true"><aegov-select-option value="a">Option A</aegov-select-option></aegov-select></div>
                </div>
              </div>
              <div class="space-y-2">
                <aegov-separator text="Checkbox"></aegov-separator>
                <div class="preview-box flex flex-wrap gap-6">
                  <div class="space-y-1"><p class="text-[11px] font-semibold uppercase tracking-wide text-aeblack-400 dark:text-aeblack-500">Normal</p><aegov-checkbox field-id="stc-n" label="Normal"></aegov-checkbox></div>
                  <div class="space-y-1"><p class="text-[11px] font-semibold uppercase tracking-wide text-aeblack-400 dark:text-aeblack-500">Checked</p><aegov-checkbox field-id="stc-c" label="Checked" is-checked="true"></aegov-checkbox></div>
                  <div class="space-y-1"><p class="text-[11px] font-semibold uppercase tracking-wide text-aeblack-400 dark:text-aeblack-500">Disabled</p><aegov-checkbox field-id="stc-d" label="Disabled" is-disabled="true"></aegov-checkbox></div>
                  <div class="space-y-1"><p class="text-[11px] font-semibold uppercase tracking-wide text-aeblack-400 dark:text-aeblack-500">Disabled + Checked</p><aegov-checkbox field-id="stc-dc" label="Dis + Checked" is-disabled="true" is-checked="true"></aegov-checkbox></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- DARK MODE -->
        <section id="dark-mode-section">
          <div class="section-card">
            <div class="section-card-header flex items-start justify-between gap-4">
              <div>
                <h2 class="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Dark Mode</h2>
                <p class="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5"><code class="font-mono text-[11px]">.dark</code> on <code class="font-mono text-[11px]">&lt;html&gt;</code> — use the toggle above</p>
              </div>
              <aegov-badge color="purple" appearance="soft">Theming</aegov-badge>
            </div>
            <div class="section-card-body">
              <div class="grid grid-cols-3 gap-4">
                <div class="rounded-xl p-4 space-y-2 bg-whitely-50 dark:bg-aeblack-800 border border-aeblack-200 dark:border-aeblack-600 transition-colors duration-200">
                  <p class="text-sm font-semibold text-aeblack-800 dark:text-whitely-100">Surface</p>
                  <p class="text-xs text-aeblack-500 dark:text-aeblack-400">Secondary text</p>
                  <aegov-button variant="primary" size="sm">Action</aegov-button>
                </div>
                <div class="rounded-xl p-4 space-y-2 bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 transition-colors duration-200">
                  <p class="text-sm font-semibold text-primary-800 dark:text-primary-200">Primary tint</p>
                  <p class="text-xs text-primary-600 dark:text-primary-400">Semantic text</p>
                  <div class="flex gap-1.5">
                    <aegov-badge color="primary" appearance="soft">Active</aegov-badge>
                    <aegov-badge color="aegreen" appearance="soft">Online</aegov-badge>
                  </div>
                </div>
                <div class="rounded-xl p-4 space-y-2 bg-aeblack-800 dark:bg-whitely-100 border border-aeblack-700 dark:border-aeblack-200 transition-colors duration-200">
                  <p class="text-sm font-semibold text-white dark:text-aeblack-900">Inverted</p>
                  <p class="text-xs text-aeblack-300 dark:text-aeblack-600">Intentionally flips</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- RTL -->
        <section id="rtl">
          <div class="section-card">
            <div class="section-card-header flex items-start justify-between gap-4">
              <div>
                <h2 class="text-base font-semibold text-aeblack-900 dark:text-whitely-100">RTL / Arabic</h2>
                <p class="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">Toggle RTL in the top bar — flips layout + Noto Kufi Arabic font</p>
              </div>
              <aegov-badge color="purple" appearance="soft">Theming</aegov-badge>
            </div>
            <div class="section-card-body">
              <div class="preview-box space-y-4">
                <p class="text-sm text-aeblack-600 dark:text-aeblack-300">هذا النص يظهر باللغة العربية. عند تفعيل وضع RTL، يُعكس تخطيط الصفحة بالكامل وتُستخدم خطوط "نوتو كوفي عربي".</p>
                <div class="flex gap-3 flex-wrap">
                  <aegov-button variant="primary">زر رئيسي</aegov-button>
                  <aegov-button variant="secondary">زر ثانوي</aegov-button>
                  <aegov-button variant="danger">تحذير</aegov-button>
                </div>
                <div class="flex gap-2 flex-wrap">
                  <aegov-badge color="aegreen">نشط</aegov-badge>
                  <aegov-badge color="aegold">قيد الانتظار</aegov-badge>
                  <aegov-badge color="aered">مرفوض</aegov-badge>
                </div>
                <div class="grid grid-cols-2 gap-3 max-w-lg">
                  <aegov-input field-id="rtl-name" placeholder="الاسم الكامل"></aegov-input>
                  <aegov-select field-id="rtl-status" placeholder="اختر الحالة">
                    <aegov-select-option value="active">نشط</aegov-select-option>
                    <aegov-select-option value="pending">قيد الانتظار</aegov-select-option>
                  </aegov-select>
                </div>
                <aegov-checkbox field-id="rtl-agree" label="أوافق على الشروط والأحكام"></aegov-checkbox>
              </div>
            </div>
          </div>
        </section>

        <!-- ══ FORM SHADOW TEST ══ -->
        <section id="form-shadow-test">
          <div class="section-card">
            <div class="section-card-header flex items-start justify-between gap-4">
              <div>
                <h2 class="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Form Shadow Test</h2>
                <p class="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">aegov-input with shadow:true — testing label association &amp; form submission</p>
              </div>
              <aegov-badge color="aered" appearance="soft">shadow:true</aegov-badge>
            </div>
            <div class="section-card-body">
              <div class="preview-box space-y-8">

                <!-- Test 1: Label association -->
                <div>
                  <p class="text-sm font-semibold text-aeblack-800 dark:text-whitely-200 mb-1">Test 1 — Label association</p>
                  <p class="text-xs text-aeblack-500 dark:text-aeblack-400 mb-3">Click the label text → the input should get focus</p>
                  <div class="space-y-2 max-w-sm">
                    <label for="vue-shadow-label-test" class="block text-sm font-medium text-primary-600 dark:text-primary-400 cursor-pointer underline">
                      ▶ Click this native label (for="vue-shadow-label-test")
                    </label>
                    <aegov-input field-id="vue-shadow-label-test" placeholder="Did focus land here?"></aegov-input>
                  </div>
                </div>

                <!-- Test 2: Form submission -->
                <div>
                  <p class="text-sm font-semibold text-aeblack-800 dark:text-whitely-200 mb-1">Test 2 — Form submission (FormData)</p>
                  <p class="text-xs text-aeblack-500 dark:text-aeblack-400 mb-3">Type values, click Submit → missing fields mean form submission is broken</p>
                  <form class="space-y-3 max-w-sm" @submit.prevent="handleFormSubmit">
                    <aegov-input field-id="vue-shadow-email" name="email" placeholder="Email address"></aegov-input>
                    <aegov-input field-id="vue-shadow-username" name="username" placeholder="Username"></aegov-input>
                    <button type="submit" class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm font-medium">Submit Form</button>
                  </form>
                  <pre class="mt-4 p-3 rounded-md bg-aeblack-50 dark:bg-aeblack-900 border border-aeblack-200 dark:border-aeblack-700 text-xs text-aeblack-700 dark:text-aeblack-300 font-mono whitespace-pre-wrap">{{ vueFormResult }}</pre>
                </div>

              </div>
            </div>
          </div>
        </section>

        <div class="h-16"></div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const isLoading = ref(false);
const isDark = ref(false);
const isRtl = ref(false);

const badgeColors = [
  'default','primary','secondary','aegreen','aegold','aered','aeblack',
  'techblue','seablue','camel','desert','fuchsia','slate','purple','pink','indigo','lime',
];

const colorPalettes = [
  { name: 'aeblack', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
    bg: {'50':'bg-aeblack-50','100':'bg-aeblack-100','200':'bg-aeblack-200','300':'bg-aeblack-300','400':'bg-aeblack-400','500':'bg-aeblack-500','600':'bg-aeblack-600','700':'bg-aeblack-700','800':'bg-aeblack-800','900':'bg-aeblack-900','950':'bg-aeblack-950'} },
  { name: 'aegold', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
    bg: {'50':'bg-aegold-50','100':'bg-aegold-100','200':'bg-aegold-200','300':'bg-aegold-300','400':'bg-aegold-400','500':'bg-aegold-500','600':'bg-aegold-600','700':'bg-aegold-700','800':'bg-aegold-800','900':'bg-aegold-900','950':'bg-aegold-950'} },
  { name: 'aegreen', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
    bg: {'50':'bg-aegreen-50','100':'bg-aegreen-100','200':'bg-aegreen-200','300':'bg-aegreen-300','400':'bg-aegreen-400','500':'bg-aegreen-500','600':'bg-aegreen-600','700':'bg-aegreen-700','800':'bg-aegreen-800','900':'bg-aegreen-900','950':'bg-aegreen-950'} },
  { name: 'aered', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
    bg: {'50':'bg-aered-50','100':'bg-aered-100','200':'bg-aered-200','300':'bg-aered-300','400':'bg-aered-400','500':'bg-aered-500','600':'bg-aered-600','700':'bg-aered-700','800':'bg-aered-800','900':'bg-aered-900','950':'bg-aered-950'} },
  { name: 'primary', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
    bg: {'50':'bg-primary-50','100':'bg-primary-100','200':'bg-primary-200','300':'bg-primary-300','400':'bg-primary-400','500':'bg-primary-500','600':'bg-primary-600','700':'bg-primary-700','800':'bg-primary-800','900':'bg-primary-900','950':'bg-primary-950'} },
  { name: 'primary-support', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
    bg: {'50':'bg-primary-support-50','100':'bg-primary-support-100','200':'bg-primary-support-200','300':'bg-primary-support-300','400':'bg-primary-support-400','500':'bg-primary-support-500','600':'bg-primary-support-600','700':'bg-primary-support-700','800':'bg-primary-support-800','900':'bg-primary-support-900','950':'bg-primary-support-950'} },
  { name: 'secondary', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
    bg: {'50':'bg-secondary-50','100':'bg-secondary-100','200':'bg-secondary-200','300':'bg-secondary-300','400':'bg-secondary-400','500':'bg-secondary-500','600':'bg-secondary-600','700':'bg-secondary-700','800':'bg-secondary-800','900':'bg-secondary-900','950':'bg-secondary-950'} },
  { name: 'secondary-support', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
    bg: {'50':'bg-secondary-support-50','100':'bg-secondary-support-100','200':'bg-secondary-support-200','300':'bg-secondary-support-300','400':'bg-secondary-support-400','500':'bg-secondary-support-500','600':'bg-secondary-support-600','700':'bg-secondary-support-700','800':'bg-secondary-support-800','900':'bg-secondary-support-900','950':'bg-secondary-support-950'} },
  { name: 'techblue', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
    bg: {'50':'bg-techblue-50','100':'bg-techblue-100','200':'bg-techblue-200','300':'bg-techblue-300','400':'bg-techblue-400','500':'bg-techblue-500','600':'bg-techblue-600','700':'bg-techblue-700','800':'bg-techblue-800','900':'bg-techblue-900','950':'bg-techblue-950'} },
  { name: 'seablue', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
    bg: {'50':'bg-seablue-50','100':'bg-seablue-100','200':'bg-seablue-200','300':'bg-seablue-300','400':'bg-seablue-400','500':'bg-seablue-500','600':'bg-seablue-600','700':'bg-seablue-700','800':'bg-seablue-800','900':'bg-seablue-900','950':'bg-seablue-950'} },
  { name: 'camel', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
    bg: {'50':'bg-camel-50','100':'bg-camel-100','200':'bg-camel-200','300':'bg-camel-300','400':'bg-camel-400','500':'bg-camel-500','600':'bg-camel-600','700':'bg-camel-700','800':'bg-camel-800','900':'bg-camel-900','950':'bg-camel-950'} },
  { name: 'desert', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
    bg: {'50':'bg-desert-50','100':'bg-desert-100','200':'bg-desert-200','300':'bg-desert-300','400':'bg-desert-400','500':'bg-desert-500','600':'bg-desert-600','700':'bg-desert-700','800':'bg-desert-800','900':'bg-desert-900','950':'bg-desert-950'} },
  { name: 'fuchsia', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
    bg: {'50':'bg-fuchsia-50','100':'bg-fuchsia-100','200':'bg-fuchsia-200','300':'bg-fuchsia-300','400':'bg-fuchsia-400','500':'bg-fuchsia-500','600':'bg-fuchsia-600','700':'bg-fuchsia-700','800':'bg-fuchsia-800','900':'bg-fuchsia-900','950':'bg-fuchsia-950'} },
  { name: 'purple', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
    bg: {'50':'bg-purple-50','100':'bg-purple-100','200':'bg-purple-200','300':'bg-purple-300','400':'bg-purple-400','500':'bg-purple-500','600':'bg-purple-600','700':'bg-purple-700','800':'bg-purple-800','900':'bg-purple-900','950':'bg-purple-950'} },
  { name: 'pink', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
    bg: {'50':'bg-pink-50','100':'bg-pink-100','200':'bg-pink-200','300':'bg-pink-300','400':'bg-pink-400','500':'bg-pink-500','600':'bg-pink-600','700':'bg-pink-700','800':'bg-pink-800','900':'bg-pink-900','950':'bg-pink-950'} },
  { name: 'indigo', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
    bg: {'50':'bg-indigo-50','100':'bg-indigo-100','200':'bg-indigo-200','300':'bg-indigo-300','400':'bg-indigo-400','500':'bg-indigo-500','600':'bg-indigo-600','700':'bg-indigo-700','800':'bg-indigo-800','900':'bg-indigo-900','950':'bg-indigo-950'} },
  { name: 'slate', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
    bg: {'50':'bg-slate-50','100':'bg-slate-100','200':'bg-slate-200','300':'bg-slate-300','400':'bg-slate-400','500':'bg-slate-500','600':'bg-slate-600','700':'bg-slate-700','800':'bg-slate-800','900':'bg-slate-900','950':'bg-slate-950'} },
  { name: 'whitely', split: 5, shades: ['50','100','200','300','400','500'],
    bg: {'50':'bg-whitely-50','100':'bg-whitely-100','200':'bg-whitely-200','300':'bg-whitely-300','400':'bg-whitely-400','500':'bg-whitely-500'} },
] as { name: string; split: number; shades: string[]; bg: Record<string, string> }[];

watch(isDark, (val) => document.documentElement.classList.toggle('dark', val));
watch(isRtl, (val) => {
  document.documentElement.dir = val ? 'rtl' : 'ltr';
  document.documentElement.lang = val ? 'ar' : 'en';
});

const vueFormResult = ref('Submit the form to see FormData result here');

function handleFormSubmit(e: Event) {
  const form = e.target as HTMLFormElement;
  const data = new FormData(form);
  const result: Record<string, string> = {};
  data.forEach((v, k) => { result[k] = v as string; });
  const keys = Object.keys(result);
  vueFormResult.value = keys.length === 0
    ? '❌ FormData is EMPTY — form submission broken with shadow:true'
    : '✅ FormData captured:\n' + JSON.stringify(result, null, 2);
}

async function handleButtonClick() {
  isLoading.value = true;
  await new Promise((r) => setTimeout(r, 2000));
  isLoading.value = false;
}

function onDarkToggle(e: CustomEvent<{ checked: boolean }>) {
  isDark.value = e.detail.checked;
}

function onRtlToggle(e: CustomEvent<{ checked: boolean }>) {
  isRtl.value = e.detail.checked;
}

// Scrollspy
onMounted(() => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    },
    { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
  );
  sections.forEach((s) => observer.observe(s));
});
</script>
