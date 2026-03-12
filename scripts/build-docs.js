#!/usr/bin/env node

/**
 * build-docs.js
 *
 * Reads each .md file in src/docs/markdown/, converts it to HTML via `marked`,
 * and injects the result into the matching src/docs/pages/<name>.html file
 * inside the element with id="content-area".
 *
 * Usage:
 *   node scripts/build-docs.js           # one-shot build
 *   node scripts/build-docs.js --watch   # watch for .md changes
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const hljs = require('highlight.js');

const MD_DIR = path.resolve(__dirname, '../src/docs/markdown');
const PAGES_DIR = path.resolve(__dirname, '../src/docs/pages');
const DOCS_DIR = path.resolve(__dirname, '../src/docs');

// Custom renderer: syntax-highlight code blocks via highlight.js
var renderer = new marked.Renderer();
renderer.code = function ({ text, lang }) {
  var highlighted;
  if (lang && hljs.getLanguage(lang)) {
    highlighted = hljs.highlight(text, { language: lang }).value;
  } else {
    highlighted = hljs.highlightAuto(text).value;
  }
  return '<pre><code class="hljs language-' + (lang || '') + '">' + highlighted + '</code></pre>';
};

// Configure marked: GFM enabled, raw HTML passthrough, custom renderer
marked.setOptions({ breaks: false, gfm: true, renderer: renderer });

var MARKER_START = '<!-- DOC:START -->';
var MARKER_END = '<!-- DOC:END -->';

/**
 * Inject rendered HTML into the #content-area of the matching .html file.
 *
 * On first run the element may contain placeholder content (no markers).
 * The script clears everything inside #content-area and writes fresh
 * content wrapped in DOC:START / DOC:END markers. On subsequent runs
 * only the region between the markers is replaced, which is safe even
 * when the rendered markdown contains </section> or </div> tags.
 *
 * Returns true if the file was updated, false otherwise.
 */
function processFile(mdFilename) {
  const baseName = path.basename(mdFilename, '.md');
  const mdPath = path.join(MD_DIR, mdFilename);
  const htmlPath = path.join(PAGES_DIR, baseName + '.html');

  if (!fs.existsSync(htmlPath)) {
    console.warn('[build-docs] No matching HTML file for ' + mdFilename + ', skipping.');
    return false;
  }

  const mdContent = fs.readFileSync(mdPath, 'utf-8');
  const rendered = marked.parse(mdContent);
  const wrapped = MARKER_START + '\n' + rendered + MARKER_END;

  let html = fs.readFileSync(htmlPath, 'utf-8');

  // If markers already exist, replace everything between them (greedy — safe
  // because the markers are unique HTML comments that won't appear in content).
  var markerRegex = new RegExp(MARKER_START + '[\\s\\S]*?' + MARKER_END);
  if (markerRegex.test(html)) {
    var newHtml = html.replace(markerRegex, wrapped);
    if (newHtml === html) return false;
    fs.writeFileSync(htmlPath, newHtml, 'utf-8');
    console.log('[build-docs] ' + mdFilename + ' -> ' + baseName + '.html');
    return true;
  }

  // First run — no markers yet. Find the #content-area opening tag and
  // replace everything up to its corresponding close tag.
  // Strategy: locate the opening tag, then find the LAST </section> or
  // </div> that closes it by counting nesting depth.
  var openRegex = /(<(?:section|div)[^>]*id\s*=\s*["']content-area["'][^>]*>)/i;
  var openMatch = html.match(openRegex);
  if (!openMatch) {
    console.warn('[build-docs] #content-area not found in ' + baseName + '.html, skipping.');
    return false;
  }

  var openTag = openMatch[1];
  var tagName = openTag.match(/^<(\w+)/)[1]; // "section" or "div"
  var startIdx = html.indexOf(openTag);
  var innerStart = startIdx + openTag.length;

  // Walk forward from innerStart, counting open/close of the same tag
  // to find the matching close tag.
  var depth = 1;
  var cursor = innerStart;
  var openPattern = new RegExp('<' + tagName + '\\b', 'gi');
  var closePattern = new RegExp('</' + tagName + '\\s*>', 'gi');
  var combined = new RegExp('<(/?)' + tagName + '(?:\\b|\\s*>)', 'gi');
  combined.lastIndex = cursor;

  var m;
  while ((m = combined.exec(html)) !== null) {
    if (m[1] === '/') {
      depth--;
      if (depth === 0) {
        // m.index is the start of the closing tag
        var newHtml = html.substring(0, innerStart) + '\n' + wrapped + '\n' + html.substring(m.index);
        fs.writeFileSync(htmlPath, newHtml, 'utf-8');
        console.log('[build-docs] ' + mdFilename + ' -> ' + baseName + '.html');
        return true;
      }
    } else {
      depth++;
    }
  }

  console.warn('[build-docs] Could not find closing </' + tagName + '> for #content-area in ' + baseName + '.html');
  return false;
}

/**
 * Process all .md files in the markdown directory.
 */
function buildAll() {
  if (!fs.existsSync(MD_DIR)) {
    console.warn('[build-docs] Markdown directory not found: ' + MD_DIR);
    return;
  }

  const files = fs.readdirSync(MD_DIR).filter(function (f) {
    return f.endsWith('.md');
  });

  if (files.length === 0) {
    console.log('[build-docs] No .md files found.');
    return;
  }

  var count = 0;
  for (var i = 0; i < files.length; i++) {
    if (processFile(files[i])) count++;
  }
  console.log('[build-docs] Done. ' + count + ' file(s) updated.');
}

/**
 * Watch mode: rebuild on .md file changes.
 */
function watch() {
  console.log('[build-docs] Watching ' + MD_DIR + ' for changes...');

  fs.watch(MD_DIR, function (eventType, filename) {
    if (!filename || !filename.endsWith('.md')) return;
    console.log('[build-docs] Change detected: ' + filename);
    processFile(filename);
  });
}

// --- Main ---
buildAll();

if (process.argv.includes('--watch')) {
  watch();
}
