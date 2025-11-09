# Testing Guide - AEGOV Design System

Comprehensive guide for testing the AEGOV Design System components and build process.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Test Types](#test-types)
3. [Running Tests](#running-tests)
4. [Writing Tests](#writing-tests)
5. [Build Verification](#build-verification)
6. [Coverage Reports](#coverage-reports)
7. [CI/CD Integration](#cicd-integration)
8. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Run All Tests

```bash
# Run unit and E2E tests
npm test

# Run with watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### Verify Build

```bash
# Build and verify
npm run test:build

# Or separately
npm run build
npm run verify:build
```

---

## Test Types

### 1. Unit Tests (Spec Tests)

Unit tests verify component logic, props, state, and methods in isolation.

**Location:** `src/components/**/*.spec.tsx`

**What we test:**
- Component rendering
- Props and their defaults
- State management
- Event emissions
- Method calls
- Conditional logic

**Example:**
```typescript
// src/components/aegov-button/aegov-button.spec.tsx
it('should render with default props', async () => {
  const page = await newSpecPage({
    components: [AegovButton],
    html: `<aegov-button>Click Me</aegov-button>`,
  });
  expect(page.root).toBeTruthy();
});
```

### 2. E2E Tests (End-to-End)

E2E tests verify component behavior in a real browser environment using Puppeteer.

**Location:** `src/components/**/*.e2e.ts`

**What we test:**
- Real DOM interactions
- User interactions (clicks, keyboard)
- Visual rendering
- Event handling
- Accessibility
- Multiple component instances

**Example:**
```typescript
// src/components/aegov-button/aegov-button.e2e.ts
it('should emit aegovClick on button click', async () => {
  const page = await newE2EPage();
  await page.setContent('<aegov-button>Click Me</aegov-button>');

  const clickEvent = await page.spyOnEvent('aegovClick');
  const button = await page.find('aegov-button >>> button');

  await button.click();
  expect(clickEvent).toHaveReceivedEvent();
});
```

### 3. Build Verification Tests

Automated verification that the build process completed successfully.

**Location:** `scripts/verify-build.js`

**What we verify:**
- Distribution files exist
- Type definitions generated
- Component exports correct
- Package.json configured
- File sizes reasonable

---

## Running Tests

### All Available Test Commands

```bash
# Run all tests (unit + E2E)
npm test

# Unit tests only
npm run test:unit

# E2E tests only
npm run test:e2e

# Watch mode (auto-rerun on changes)
npm run test:watch

# Coverage report
npm run test:coverage

# CI mode (no watch, optimized for CI/CD)
npm run test:ci

# Build verification
npm run verify:build

# Full build + verification
npm run test:build
```

### Running Specific Tests

```bash
# Run tests for specific component
npm test -- --spec --grep="aegov-button"

# Run specific test file
npm test -- src/components/aegov-button/aegov-button.spec.tsx

# Run only E2E for specific component
npm run test:e2e -- --grep="aegov-button"
```

### Debug Mode

```bash
# Run tests with debugging
npm test -- --inspect

# Run with verbose output
npm test -- --verbose

# Run with maximum workers (faster)
npm test -- --maxWorkers=4
```

---

## Writing Tests

### Unit Test Template

```typescript
import { newSpecPage } from '@stencil/core/testing';
import { MyComponent } from './my-component';

describe('my-component', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newSpecPage({
        components: [MyComponent],
        html: `<my-component></my-component>`,
      });
      expect(page.root).toBeTruthy();
    });
  });

  describe('props', () => {
    it('should accept custom prop', async () => {
      const page = await newSpecPage({
        components: [MyComponent],
        html: `<my-component my-prop="value"></my-component>`,
      });
      expect(page.rootInstance.myProp).toBe('value');
    });
  });

  describe('events', () => {
    it('should emit custom event', async () => {
      const page = await newSpecPage({
        components: [MyComponent],
        html: `<my-component></my-component>`,
      });

      const spy = jest.fn();
      page.root.addEventListener('myEvent', spy);

      // Trigger event
      page.rootInstance.triggerEvent();
      await page.waitForChanges();

      expect(spy).toHaveBeenCalled();
    });
  });
});
```

### E2E Test Template

```typescript
import { newE2EPage } from '@stencil/core/testing';

describe('my-component E2E', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-component></my-component>');

    const element = await page.find('my-component');
    expect(element).toBeTruthy();
  });

  it('should handle click', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-component></my-component>');

    const clickEvent = await page.spyOnEvent('myClick');
    const button = await page.find('my-component >>> button');

    await button.click();
    await page.waitForChanges();

    expect(clickEvent).toHaveReceivedEvent();
  });

  it('should be keyboard accessible', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-component></my-component>');

    const button = await page.find('my-component >>> button');
    await button.focus();
    await page.keyboard.press('Enter');
    await page.waitForChanges();

    // Assert expected behavior
  });
});
```

### Using Test Helpers

```typescript
import { wait, createMouseEvent, hasClass } from '../../utils/test-helpers';

it('should update after delay', async () => {
  const page = await newSpecPage({
    components: [MyComponent],
    html: `<my-component></my-component>`,
  });

  page.rootInstance.startProcess();
  await wait(100);
  await page.waitForChanges();

  expect(page.rootInstance.processComplete).toBe(true);
});
```

---

## Build Verification

### What Gets Verified

The build verification script checks:

✅ **Distribution Structure**
- `dist/` directory exists
- ES Module and CommonJS bundles
- TypeScript definitions
- Collection files

✅ **Component Files**
- Component JavaScript compiled
- Component type definitions
- Component exports

✅ **Configuration**
- package.json exports configured
- Tailwind theme exported
- All critical files present

✅ **Documentation**
- docs.json generated (if enabled)
- README files present

### Running Verification

```bash
# After building
npm run build
npm run verify:build

# Or combined
npm run test:build
```

### Verification Output

```
╔════════════════════════════════════════════╗
║   AEGOV Design System - Build Verifier    ║
╚════════════════════════════════════════════╝

📁 Checking Distribution Files
✓ Main distribution directory: dist
✓ ES Module entry point: dist/index.js
✓ CommonJS entry point: dist/index.cjs.js
✓ TypeScript definitions directory: dist/types
...

📈 Verification Summary
Total checks: 25
Passed: 25
Failed: 0
Success rate: 100.0%

✅ Build verification PASSED
```

---

## Coverage Reports

### Generate Coverage

```bash
npm run test:coverage
```

### Coverage Output

```
File                           | % Stmts | % Branch | % Funcs | % Lines |
-------------------------------|---------|----------|---------|---------|
All files                      |   95.5  |   89.2   |   93.1  |   95.8  |
 components/aegov-button       |   98.2  |   92.5   |   97.3  |   98.5  |
  aegov-button.tsx             |   98.2  |   92.5   |   97.3  |   98.5  |
```

### Coverage Thresholds

Configured in `jest.config.js`:

```javascript
coverageThresholds: {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80,
  },
}
```

### Viewing HTML Coverage Report

```bash
npm run test:coverage

# Open in browser
open coverage/lcov-report/index.html
```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Dependencies
        run: npm ci

      - name: Run Tests
        run: npm run test:ci

      - name: Build & Verify
        run: npm run test:build

      - name: Upload Coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

### CI-Optimized Test Command

```bash
# Runs in CI mode (no watch, headless browser)
npm run test:ci
```

---

## Test Coverage Checklist

For each component, ensure you test:

### ✅ Rendering
- [ ] Component renders without errors
- [ ] Default props applied correctly
- [ ] Slot content rendered
- [ ] Conditional rendering works

### ✅ Props
- [ ] All props work as expected
- [ ] Default values correct
- [ ] Type validation (TypeScript)
- [ ] Prop changes trigger re-render

### ✅ Events
- [ ] Custom events emit correctly
- [ ] Event payloads correct
- [ ] Events don't fire when disabled
- [ ] Multiple event listeners work

### ✅ States
- [ ] Disabled state works
- [ ] Loading state works
- [ ] Error state works
- [ ] Interactive states (hover, focus)

### ✅ Accessibility
- [ ] ARIA attributes correct
- [ ] Keyboard navigation works
- [ ] Focus management proper
- [ ] Screen reader friendly

### ✅ Variants/Sizes
- [ ] All variants render correctly
- [ ] All sizes render correctly
- [ ] Combinations work properly

### ✅ Edge Cases
- [ ] Empty content
- [ ] Very long content
- [ ] Special characters
- [ ] Rapid state changes

---

## Troubleshooting

### Tests Failing After Build

```bash
# Clean and rebuild
rm -rf dist www .stencil
npm run build
npm test
```

### E2E Tests Timeout

```bash
# Increase timeout in test
it('should do something', async () => {
  jest.setTimeout(10000); // 10 seconds
  // ... test code
});
```

### Puppeteer Issues

```bash
# Reinstall Puppeteer
npm uninstall puppeteer
npm install -D puppeteer

# Run with visible browser (debug)
npm test -- --e2e --devtools
```

### Coverage Not Generated

```bash
# Ensure coverage is enabled
npm run test:coverage

# Check jest.config.js has collectCoverage: true
```

### TypeScript Errors in Tests

```bash
# Ensure test files included in tsconfig.json
# Check that @stencil/core/testing is imported correctly
```

---

## Best Practices

### DO ✅

- Write tests before or alongside component development
- Test user behavior, not implementation details
- Use descriptive test names
- Group related tests with `describe` blocks
- Test accessibility features
- Mock external dependencies
- Use test helpers for common operations
- Keep tests independent (no shared state)
- Test error conditions
- Verify build before committing

### DON'T ❌

- Test internal private methods directly
- Rely on specific CSS class names (use data attributes)
- Skip E2E tests for interactive components
- Commit without running tests
- Ignore failing tests
- Test framework internals
- Use arbitrary timeouts (use waitForChanges)
- Leave commented-out tests

---

## Test Metrics

### Current Coverage (aegov-button)

- **Unit Tests**: 50+ test cases
- **E2E Tests**: 30+ test cases
- **Coverage**: 95%+ across all metrics
- **Build Verification**: 25+ checks

### Test Categories

| Category | Unit Tests | E2E Tests |
|----------|-----------|-----------|
| Rendering | 5 | 3 |
| Variants | 3 | 2 |
| Sizes | 4 | 4 |
| States | 3 | 3 |
| Events | 5 | 6 |
| Accessibility | 4 | 3 |
| Combinations | 4 | 0 |
| Dynamic Updates | 3 | 4 |

---

## Additional Resources

- [Stencil Testing Documentation](https://stenciljs.com/docs/testing-overview)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Puppeteer Documentation](https://pptr.dev/)
- [Testing Library Best Practices](https://testing-library.com/docs/)

---

**Happy Testing! 🧪**

Remember: Good tests = Confident deployments!
