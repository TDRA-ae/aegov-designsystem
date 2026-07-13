'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert').strict;

const distDir = path.resolve(__dirname, '../dist');
const componentsFile = path.join(distDir, 'components/stencil-generated/components.js');
const indexFile = path.join(distDir, 'index.js');

// dist/ folder exists after build
assert.ok(fs.existsSync(distDir), 'dist/ folder missing — run npm run build first');

// main entry exists
assert.ok(fs.existsSync(indexFile), 'dist/index.js missing');

// stencil-generated components file exists
assert.ok(fs.existsSync(componentsFile), 'dist/components/stencil-generated/components.js missing');

// key components are exported
const contents = fs.readFileSync(componentsFile, 'utf8');
const expectedExports = [
  'AegovButton',
  'AegovAccordion',
  'AegovModal',
  'AegovInput',
  'AegovSelect',
];
for (const name of expectedExports) {
  assert.ok(contents.includes(name), `Expected export "${name}" not found in components.js`);
}

console.info('react-library tests passed');
