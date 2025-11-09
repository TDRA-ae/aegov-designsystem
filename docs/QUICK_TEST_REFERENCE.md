# Quick Test Reference Card

## 🚀 Most Common Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Build and verify everything
npm run test:build
```

## 📋 All Test Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests (unit + E2E) |
| `npm run test:unit` | Run only unit tests |
| `npm run test:e2e` | Run only E2E tests |
| `npm run test:watch` | Watch mode (auto-rerun) |
| `npm run test:coverage` | Generate coverage report |
| `npm run test:ci` | CI-optimized run |
| `npm run verify:build` | Verify build output |
| `npm run test:build` | Build + verify |

## ✅ Quick Verification Checklist

### First Time Setup
```bash
npm install
npm run build
npm test
npm run verify:build
```

### Before Commit
```bash
npm run test:coverage  # Ensure coverage > 80%
npm run test:build     # Ensure build works
```

### CI/CD
```bash
npm run test:ci        # Optimized for automation
```

## 📊 Expected Results

### All Tests Pass
```
Test Suites: 2 passed, 2 total
Tests:       80 passed, 80 total
```

### Build Verification
```
✅ Build verification PASSED
Total checks: 25
Passed: 25
Success rate: 100.0%
```

### Coverage
```
All files: 95%+ coverage
```

## 🔍 Troubleshooting

### Tests failing?
```bash
rm -rf dist www .stencil node_modules
npm install
npm run build
npm test
```

### Build verification failing?
```bash
npm run build
npm run verify:build
```

### E2E tests timeout?
```bash
npm run test:e2e -- --timeout=10000
```

## 📚 Full Documentation

- `TESTING.md` - Complete testing guide
- `TEST_SUMMARY.md` - Test suite overview
- `src/components/*/readme.md` - Component docs

## 🎯 Success Indicators

✅ All 80+ tests pass
✅ All 25+ build checks pass
✅ Coverage exceeds 80% threshold
✅ No console errors or warnings
✅ Build artifacts generated correctly

---

**Keep this card handy for quick test execution!**
