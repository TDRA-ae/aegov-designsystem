# Developer Reference — aegov Design System

All commands are run from the **monorepo root** (`/aegov-designsystem3`) unless a directory is specified.

---

## Quick start

```bash
# 1. Install all dependencies across every package
npm install

# 2. Build everything (core + React + Vue + Angular wrappers)
npm run build

# 3. Start the Stencil dev server with hot reload
cd packages/designsystem
npm start
```

---

## Root commands (run from `/aegov-designsystem3`)

### Build

| Command | What it does |
|---|---|
| `npm run build` | Builds core + React + Vue + Angular wrappers in dependency order |
| `npm run build:all` | Builds every package in the monorepo (including test apps) |
| `npm run build:libs` | Builds core + React + Vue only (skips Angular) |
| `npm run build:affected` | Builds only library packages changed since `origin/master` |

### Development servers

| Command | What it does |
|---|---|
| `npm run dev` | Starts all framework test apps in parallel and opens browsers automatically |
| `npm run dev:all` | Starts every `dev` script across all packages in parallel |

### Test apps (individual)

| Command | What it does |
|---|---|
| `npm run test:html` | Starts the plain HTML test app (Vite, port varies) |
| `npm run test:react` | Starts the React test app (Vite) |
| `npm run test:vue` | Starts the Vue 3 test app (Vite) |
| `npm run test:angular` | Starts the Angular test app (ng serve, port 4300) |
| `npm run test:apps` | Starts all four test apps in parallel |

### Testing

| Command | What it does |
|---|---|
| `npm test` | Runs all test suites across every package |

### Utilities

| Command | What it does |
|---|---|
| `npm run clean` | Removes all `node_modules` across packages (does not remove `dist/`) |
| `npm run release` | Publishes all changed packages to npm via Lerna |
| `npm run graph` | Opens the Nx dependency graph in the browser |

---

## Core design system (`packages/designsystem`)

Run these from inside `packages/designsystem/`, or prefix with `cd packages/designsystem &&`.

### Build

| Command | What it does |
|---|---|
| `npm run build` | Full build: generates docs markdown → Stencil compile → Tailwind docs CSS → copies CSS to dist |
| `npm run build:prod` | Same as `build` but sets `NODE_ENV=production` (minified output) |
| `npm run build:docs-css` | Compiles `src/doc-style/doc-style.css` → `src/docs/doc-style.css` via Tailwind |
| `npm run build:docs-md` | Runs `scripts/build-docs.js` to generate component doc markdown files |
| `npm run build:copy-css` | Copies `src/styles/` and `src/global/` CSS files into `dist/` |
| `npm run test:build` | Builds then verifies `dist/` exists (used before publish) |
| `npm run verify:build` | Checks that `dist/` folder exists — throws if missing |

### Development

| Command | What it does |
|---|---|
| `npm start` | Starts Stencil dev server with hot reload + watches docs markdown + watches Tailwind CSS |

### Testing

| Command | What it does |
|---|---|
| `npm test` | Runs all Stencil unit tests (spec) and e2e tests |
| `npm run test:unit` | Runs unit/spec tests only |
| `npm run test:e2e` | Runs e2e tests only |
| `npm run test:watch` | Runs all tests in watch mode (re-runs on file save) |
| `npm run test:coverage` | Runs unit tests and generates a code coverage report |
| `npm run test:ci` | Runs all tests in CI mode (no interactivity, exits with code) |

### Accessibility (a11y) tests — Playwright

Run these from inside `packages/designsystem/` with the http-server running.

```bash
# Step 1 — start the static file server (required before running Playwright tests)
npx http-server www -p 3333 --cors

# Step 2 — run all a11y tests
npx playwright test tests/a11y/

# Run a single spec file
npx playwright test tests/a11y/accordion.a11y.spec.ts
npx playwright test tests/a11y/datepicker.a11y.spec.ts

# Run with browser UI visible (headed mode — useful for debugging)
npx playwright test tests/a11y/ --headed

# Run with Playwright inspector (step through each action)
npx playwright test tests/a11y/ --debug

# Show the last HTML test report
npx playwright show-report
```

### Component generation

```bash
# Interactive scaffold: creates component folder, TSX, CSS, spec, e2e files
npx stencil generate

# Or run from root
cd packages/designsystem && npx stencil generate
```

### Bundle size

| Command | What it does |
|---|---|
| `npm run size` | Runs `size-limit` to check the published bundle size against budget |

---

## Framework wrapper packages

### React wrapper (`packages/designsystem-react`)

| Command | What it does |
|---|---|
| `npm run build` | Cleans dist, then compiles TypeScript wrappers to `dist/` |
| `npm run tsc` | TypeScript compile only (no clean step) |
| `npm run clean` | Deletes `dist/` |
| `npm test` | Runs the React library integration test |

> Stencil auto-generates the React proxy components into `lib/components/stencil-generated/` during the core build. Run `npm run build` from root to regenerate them.

### Vue wrapper (`packages/designsystem-vue`)

| Command | What it does |
|---|---|
| `npm run build` | Cleans dist, then compiles TypeScript wrappers to `dist/` |
| `npm run tsc` | TypeScript compile only |
| `npm run clean` | Deletes `dist/` |

> Vue proxies are auto-generated into `lib/components.ts` during the core Stencil build.

### Angular wrapper (`packages/designsystem-angular`)

| Command | What it does |
|---|---|
| `npm run build` | Builds the Angular component library via ng-packagr |
| `npm run watch` | Builds Angular library in watch mode (development config) |
| `npm run start` | Starts the Angular demo app (`ng serve`) |
| `npm run test` | Runs Angular unit tests via `ng test` |

> Angular proxies are auto-generated into `projects/component-library/src/lib/stencil-generated/` during the core Stencil build.

---

## Test apps

Lightweight apps for manually verifying components in each framework. Not published to npm.

| App | Command | URL |
|---|---|---|
| Plain HTML | `cd test-apps/test-html && npm run dev` | `http://localhost:5173` (Vite default) |
| React | `cd test-apps/test-react && npm run dev` | `http://localhost:5173` |
| Vue 3 | `cd test-apps/test-vue && npm run dev` | `http://localhost:5173` |
| Angular | `cd test-apps/test-angular && npm run dev` | `http://localhost:4300` |

Each test app also has `npm run build` and `npm run preview` (HTML/React/Vue) to test production builds locally.

---

## Build pipeline — how it all connects

```
npm run build  (from root)
       │
       ├─ packages/designsystem        → dist/ + loader/
       │    ├─ angularOutputTarget      → packages/designsystem-angular/projects/component-library/src/lib/stencil-generated/
       │    ├─ reactOutputTarget        → packages/designsystem-react/lib/components/stencil-generated/
       │    └─ vueOutputTarget          → packages/designsystem-vue/lib/components.ts
       │
       ├─ packages/designsystem-react        → dist/   (tsc compile of auto-generated proxies)
       ├─ packages/designsystem-vue          → dist/   (tsc compile)
       └─ packages/designsystem-angular    → dist/   (ng-packagr)
```

Nx enforces this order automatically via `dependsOn: ["^build"]`. You never need to run wrapper builds manually — `npm run build` from root handles everything.

---

## Adding a new component

```bash
# 1. Scaffold the component (interactive)
cd packages/designsystem && npx stencil generate my-new-component

# 2. Implement in src/components/my-new-component/
#    - my-new-component.tsx  (template + logic)
#    - my-new-component.css  (scoped styles)

# 3. Build from root — framework wrappers are auto-generated
cd /aegov-designsystem3 && npm run build

# The component is now importable in all framework libraries
```

---

## Publishing to npm

```bash
# 1. Bump versions across all packages (creates git commit + tags automatically)
npx lerna version patch
# or: minor / major / specific version
npx lerna version minor
npx lerna version 1.0.0

# 2. Build everything
npm run build

# 3. Publish all changed packages
npm run release
# or manually for a single package:
cd packages/designsystem && npm publish
```

---

## Useful one-liners

```bash
# Check which packages have unpublished changes
npx lerna changed

# See exactly what files would be included in the npm publish
cd packages/designsystem && npm pack --dry-run

# Clear Nx build cache (fixes stale cache issues)
npx nx reset

# Check dependency graph in terminal
npx nx graph

# Run a command only for packages affected by your current changes
npx lerna run build --since=HEAD~1
npx lerna run build --since=origin/master
```
