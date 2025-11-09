#!/usr/bin/env node

/**
 * Build Verification Script
 *
 * This script verifies that the build process completed successfully
 * and all necessary files and directories were generated correctly.
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Logging utilities
const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.cyan}${msg}${colors.reset}`),
};

// Track verification results
let hasErrors = false;
let totalChecks = 0;
let passedChecks = 0;

/**
 * Check if a file or directory exists
 */
function checkExists(filepath, description, isRequired = true) {
  totalChecks++;
  const fullPath = path.join(process.cwd(), filepath);
  const exists = fs.existsSync(fullPath);

  if (exists) {
    passedChecks++;
    log.success(`${description}: ${filepath}`);
    return true;
  } else {
    if (isRequired) {
      hasErrors = true;
      log.error(`${description} not found: ${filepath}`);
    } else {
      log.warning(`${description} not found (optional): ${filepath}`);
    }
    return false;
  }
}

/**
 * Check if a file contains specific content
 */
function checkFileContent(filepath, searchString, description) {
  totalChecks++;
  const fullPath = path.join(process.cwd(), filepath);

  if (!fs.existsSync(fullPath)) {
    hasErrors = true;
    log.error(`${description}: File not found - ${filepath}`);
    return false;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  if (content.includes(searchString)) {
    passedChecks++;
    log.success(`${description}`);
    return true;
  } else {
    hasErrors = true;
    log.error(`${description}: Content not found in ${filepath}`);
    return false;
  }
}

/**
 * Check directory and count files
 */
function checkDirectoryContents(dirpath, minFiles, description) {
  totalChecks++;
  const fullPath = path.join(process.cwd(), dirpath);

  if (!fs.existsSync(fullPath)) {
    hasErrors = true;
    log.error(`${description}: Directory not found - ${dirpath}`);
    return false;
  }

  const files = fs.readdirSync(fullPath, { recursive: true });
  const fileCount = files.filter(f => {
    const stat = fs.statSync(path.join(fullPath, f));
    return stat.isFile();
  }).length;

  if (fileCount >= minFiles) {
    passedChecks++;
    log.success(`${description}: ${fileCount} files found in ${dirpath}`);
    return true;
  } else {
    hasErrors = true;
    log.error(`${description}: Expected at least ${minFiles} files, found ${fileCount} in ${dirpath}`);
    return false;
  }
}

/**
 * Get file size in KB
 */
function getFileSize(filepath) {
  const fullPath = path.join(process.cwd(), filepath);
  if (!fs.existsSync(fullPath)) return null;
  const stats = fs.statSync(fullPath);
  return (stats.size / 1024).toFixed(2);
}

/**
 * Main verification function
 */
function verifyBuild() {
  console.log(`
╔════════════════════════════════════════════╗
║   AEGOV Design System - Build Verifier    ║
╚════════════════════════════════════════════╝
  `);

  // 1. Check dist directory structure
  log.section('📁 Checking Distribution Files');
  checkExists('dist', 'Main distribution directory');
  checkExists('dist/index.js', 'ES Module entry point');
  checkExists('dist/index.cjs.js', 'CommonJS entry point');
  checkExists('dist/types', 'TypeScript definitions directory');
  checkExists('dist/types/index.d.ts', 'Main type definitions');
  checkExists('dist/types/components.d.ts', 'Component type definitions');
  checkDirectoryContents('dist/collection', 1, 'Collection files');

  // 2. Check loader directory
  log.section('📦 Checking Loader Files');
  checkExists('loader', 'Loader directory');
  checkExists('loader/index.js', 'Loader entry point', false);

  // 3. Check component-specific files
  log.section('🎨 Checking Component Files');
  checkExists('dist/collection/components/aegov-button/aegov-button.js', 'Button component JS');
  checkFileContent(
    'dist/types/components/aegov-button/aegov-button.d.ts',
    'AegovButton',
    'Button component type definitions'
  );

  // 4. Check custom elements build
  log.section('🔧 Checking Custom Elements Build');
  checkExists('dist/components', 'Custom elements directory', false);

  // 5. Check documentation
  log.section('📚 Checking Documentation');
  checkExists('dist/docs.json', 'Documentation JSON', false);

  // 6. Check package.json exports
  log.section('📋 Checking Package Configuration');
  const packageJson = require(path.join(process.cwd(), 'package.json'));

  totalChecks++;
  if (packageJson.exports && packageJson.exports['.']) {
    passedChecks++;
    log.success('Package.json has exports field configured');
  } else {
    hasErrors = true;
    log.error('Package.json missing exports field');
  }

  totalChecks++;
  if (packageJson.exports && packageJson.exports['./tailwind.css']) {
    passedChecks++;
    log.success('Tailwind theme export configured');
  } else {
    hasErrors = true;
    log.error('Tailwind theme export not configured');
  }

  // 7. Check critical files
  log.section('🔍 Checking Critical Files');
  checkExists('src/styles/tailwind.css', 'Tailwind theme file');
  checkExists('stencil.config.ts', 'Stencil configuration');
  checkExists('tsconfig.json', 'TypeScript configuration');
  checkExists('postcss.config.js', 'PostCSS configuration');

  // 8. Verify component exports
  log.section('📤 Checking Component Exports');
  checkFileContent(
    'dist/types/components.d.ts',
    'AegovButton',
    'Button component exported in types'
  );
  checkFileContent(
    'dist/types/components.d.ts',
    'aegov-button',
    'Button tag name in type definitions'
  );

  // 9. File size checks
  log.section('📊 File Size Information');
  const indexSize = getFileSize('dist/index.js');
  if (indexSize) {
    log.info(`Main bundle size: ${indexSize} KB`);
  }

  const typesSize = getFileSize('dist/types/index.d.ts');
  if (typesSize) {
    log.info(`Type definitions size: ${typesSize} KB`);
  }

  // 10. Final summary
  log.section('📈 Verification Summary');
  console.log(`\nTotal checks: ${totalChecks}`);
  console.log(`Passed: ${colors.green}${passedChecks}${colors.reset}`);
  console.log(`Failed: ${colors.red}${totalChecks - passedChecks}${colors.reset}`);

  const percentage = ((passedChecks / totalChecks) * 100).toFixed(1);
  console.log(`Success rate: ${percentage}%`);

  if (hasErrors) {
    console.log(`\n${colors.red}❌ Build verification FAILED${colors.reset}`);
    console.log('Please check the errors above and rebuild the project.\n');
    process.exit(1);
  } else {
    console.log(`\n${colors.green}✅ Build verification PASSED${colors.reset}`);
    console.log('All required files are present and correctly configured.\n');
    process.exit(0);
  }
}

// Run verification
try {
  verifyBuild();
} catch (error) {
  log.error(`Verification failed with error: ${error.message}`);
  console.error(error);
  process.exit(1);
}
