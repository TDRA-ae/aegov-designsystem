# Changelog

All notable changes to the AEGOV Design System packages are documented here.

Format: `### Package` → what changed. Packages with no changes are marked as `no changes`.

---

## [0.2.1] — 2026-07-06

### @aegov/designsystem-react-testing
- fix: disabled source maps to resolve ENOENT warning in consumer bundlers

### @aegov/designsystem-angular-testing
- feat: add `DesignSystemModule` for module-based Angular apps (handles `defineCustomElements` via `APP_INITIALIZER`)
- feat: add `provideDesignSystem()` for standalone Angular apps (add to `appConfig.providers`)

### @aegov/designsystem-testing
- no changes

### @aegov/designsystem-vue-testing
- no changes

---

## [0.2.0] — 2026-07-03

### @aegov/designsystem-testing
- Initial monorepo release under `aegov-new` Lerna workspace
- Stencil v4 web components with Tailwind CSS

### @aegov/designsystem-react-testing
- React wrapper library with auto-generated Stencil proxies
- Added `clean` script using Node.js `fs.rmSync` (cross-platform, no extra deps)

### @aegov/designsystem-vue-testing
- Vue 3 wrapper library with auto-generated Stencil proxies
- Added `clean` script using Node.js `fs.rmSync`
- Fixed duplicate `dist/lib/` output by setting `rootDir` in tsconfig

### @aegov/designsystem-angular-testing
- Angular wrapper library with `DesignSystemModule` and `APP_INITIALIZER`
- Fixed `publishConfig.directory` to publish from `dist/component-library/` via Lerna
- Fixed peer dependency range to `>=18.0.0` for Angular 17+ compatibility

---

## [0.1.0] — 2026-06-30

### @aegov/designsystem-testing
- Initial publish as private package under `@aegov` org

### @aegov/designsystem-react-testing
- Initial publish

### @aegov/designsystem-vue-testing
- Initial publish

### @aegov/designsystem-angular-testing
- Initial publish
