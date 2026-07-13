# Changelog

All notable changes to the AEGOV Design System packages are documented here.

Format: `### Package` → what changed. Packages with no changes are marked as `no changes`.

---

## [0.2.1] — 2026-07-06

### @aegov/designsystem-react
- fix: disabled source maps to resolve ENOENT warning in consumer bundlers

### @aegov/designsystem-angular
- feat: add `DesignSystemModule` for module-based Angular apps (handles `defineCustomElements` via `APP_INITIALIZER`)
- feat: add `provideDesignSystem()` for standalone Angular apps (add to `appConfig.providers`)

### @aegov/designsystem
- no changes

### @aegov/designsystem-vue
- no changes

---

## [0.2.0] — 2026-07-03

### @aegov/designsystem
- Initial monorepo release under `aegov-new` Lerna workspace
- Stencil v4 web components with Tailwind CSS

### @aegov/designsystem-react
- React wrapper library with auto-generated Stencil proxies
- Added `clean` script using Node.js `fs.rmSync` (cross-platform, no extra deps)

### @aegov/designsystem-vue
- Vue 3 wrapper library with auto-generated Stencil proxies
- Added `clean` script using Node.js `fs.rmSync`
- Fixed duplicate `dist/lib/` output by setting `rootDir` in tsconfig

### @aegov/designsystem-angular
- Angular wrapper library with `DesignSystemModule` and `APP_INITIALIZER`
- Fixed `publishConfig.directory` to publish from `dist/component-library/` via Lerna
- Fixed peer dependency range to `>=18.0.0` for Angular 17+ compatibility

---

## [0.1.0] — 2026-06-30

### @aegov/designsystem
- Initial publish as private package under `@aegov` org

### @aegov/designsystem-react
- Initial publish

### @aegov/designsystem-vue
- Initial publish

### @aegov/designsystem-angular
- Initial publish
