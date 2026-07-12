# Changelog

All notable changes to the AEGOV Design System packages are documented here.

Format: `### Package` → what changed. Packages with no changes are marked as `no changes`.

---

## [0.2.1] — 2026-07-06

### @aegov/design-system-react
- fix: disabled source maps to resolve ENOENT warning in consumer bundlers

### @aegov/design-system-angular
- feat: add `DesignSystemModule` for module-based Angular apps (handles `defineCustomElements` via `APP_INITIALIZER`)
- feat: add `provideDesignSystem()` for standalone Angular apps (add to `appConfig.providers`)

### @aegov/design-system
- no changes

### @aegov/design-system-vue
- no changes

---

## [0.2.0] — 2026-07-03

### @aegov/design-system
- Initial monorepo release under `aegov-new` Lerna workspace
- Stencil v4 web components with Tailwind CSS

### @aegov/design-system-react
- React wrapper library with auto-generated Stencil proxies
- Added `clean` script using Node.js `fs.rmSync` (cross-platform, no extra deps)

### @aegov/design-system-vue
- Vue 3 wrapper library with auto-generated Stencil proxies
- Added `clean` script using Node.js `fs.rmSync`
- Fixed duplicate `dist/lib/` output by setting `rootDir` in tsconfig

### @aegov/design-system-angular
- Angular wrapper library with `DesignSystemModule` and `APP_INITIALIZER`
- Fixed `publishConfig.directory` to publish from `dist/component-library/` via Lerna
- Fixed peer dependency range to `>=18.0.0` for Angular 17+ compatibility

---

## [0.1.0] — 2026-06-30

### @aegov/design-system
- Initial publish as private package under `@aegov` org

### @aegov/design-system-react
- Initial publish

### @aegov/design-system-vue
- Initial publish

### @aegov/design-system-angular
- Initial publish
