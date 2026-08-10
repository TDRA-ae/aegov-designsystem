/**
 * AEGOV Design System — Shared Documentation Layout
 *
 * Injects: left sidebar nav, mobile hamburger, TOC right sidebar.
 * Each page only needs to provide an <article id="doc-content"> with its content.
 *
 * Usage (in every doc page):
 *   <script src="/docs/layout.js" defer></script>
 */

(() => {
  /* -------------------------------------------------- */
  /*  Component navigation list                         */
  /* -------------------------------------------------- */

  const NAV_SECTIONS = [
    {
      heading: 'Getting Started',
      items: [
        { label: 'Installation (HTML)', href: '/docs/pages/installation.html' },
        { label: 'Using with React', href: '/docs/pages/using-with-react.html' },
        { label: 'Using with Vue', href: '/docs/pages/using-with-vue.html' },
        { label: 'Using with Angular', href: '/docs/pages/using-with-angular.html' },
      ],
    },
    {
      heading: 'Components',
      items: [
        { label: 'Accordion', href: '/docs/pages/aegov-accordion.html' },
        { label: 'Aspect Ratio', href: '/docs/pages/aegov-aspect-ratio.html' },
        { label: 'Avatar', href: '/docs/pages/aegov-avatar.html' },
        { label: 'Avatar Group', href: '/docs/pages/aegov-avatar-group.html' },
        { label: 'Badge', href: '/docs/pages/aegov-badge.html' },
        { label: 'Banner', href: '/docs/pages/aegov-banner.html' },
        { label: 'Blockquote', href: '/docs/pages/aegov-blockquote.html' },
        { label: 'Breadcrumbs', href: '/docs/pages/aegov-breadcrumbs.html' },
        { label: 'Button', href: '/docs/pages/aegov-button.html' },
        { label: 'Button Group', href: '/docs/pages/aegov-button-group.html' },
        { label: 'Callout', href: '/docs/pages/aegov-callout.html' },
        { label: 'Card', href: '/docs/pages/aegov-card.html' },
        { label: 'Drawer', href: '/docs/pages/aegov-drawer.html' },
        { label: 'Dropdown', href: '/docs/pages/aegov-dropdown.html' },
        { label: 'Link', href: '/docs/pages/aegov-link.html' },
        { label: 'Modal', href: '/docs/pages/aegov-modal.html' },
        { label: 'Navbar', href: '/docs/pages/aegov-navbar.html' },
        { label: 'Navblock', href: '/docs/pages/aegov-navblock.html' },
        { label: 'Pagination', href: '/docs/pages/aegov-pagination.html' },
        { label: 'Popover', href: '/docs/pages/aegov-popover.html' },
        { label: 'Progress', href: '/docs/pages/aegov-progress.html' },
        { label: 'Separator', href: '/docs/pages/aegov-separator.html' },
        { label: 'Tabs', href: '/docs/pages/aegov-tabs.html' },
        { label: 'Timeline', href: '/docs/pages/aegov-timeline.html' },
        { label: 'Toast', href: '/docs/pages/aegov-toast.html' },
        { label: 'Tooltip', href: '/docs/pages/aegov-tooltip.html' },
      ],
    },
    {
      heading: 'Form Elements',
      items: [
        { label: 'Checkbox', href: '/docs/pages/aegov-checkbox.html' },
        { label: 'Datepicker', href: '/docs/pages/aegov-datepicker.html' },
        { label: 'File Upload', href: '/docs/pages/aegov-fileupload.html' },
        { label: 'Form Field', href: '/docs/pages/aegov-form-field.html' },
        { label: 'Input', href: '/docs/pages/aegov-input.html' },
        { label: 'Label', href: '/docs/pages/aegov-label.html' },
        { label: 'OTP', href: '/docs/pages/aegov-otp.html' },
        { label: 'Radio', href: '/docs/pages/aegov-radio.html' },
        { label: 'Range', href: '/docs/pages/aegov-range.html' },
        { label: 'Select', href: '/docs/pages/aegov-select.html' },
        { label: 'Textarea', href: '/docs/pages/aegov-textarea.html' },
        { label: 'Toggle', href: '/docs/pages/aegov-toggle.html' },
      ],
    },
    {
      heading: 'Typography',
      items: [
        { label: 'Text', href: '/docs/pages/aegov-text.html' },
        { label: 'Title', href: '/docs/pages/aegov-title.html' },
      ],
    },
    {
      heading: 'Layout',
      items: [
        { label: 'Bento Grid', href: '/docs/pages/aegov-bento-grid.html' },
        { label: 'Header', href: '/docs/pages/aegov-header.html' },
      ],
    },
    {
      heading: 'Validation',
      items: [
        { label: 'Validation overview', href: '/docs/pages/validation-overview.html' },
        { label: 'Build your own', href: '/docs/pages/validation-byo.html' },
      ],
    },
  ];

  /* -------------------------------------------------- */
  /*  Helpers                                           */
  /* -------------------------------------------------- */

  var currentPath = window.location.pathname;

  function isActive(href) {
    return currentPath === href || currentPath.endsWith(href);
  }

  /* -------------------------------------------------- */
  /*  Build and inject sidebar navigation               */
  /* -------------------------------------------------- */

  function buildNav() {
    var nav = document.getElementById('primary-nav');
    if (!nav) return;

    var html = '';
    for (var i = 0; i < NAV_SECTIONS.length; i++) {
      var section = NAV_SECTIONS[i];
      html += '<div class="mb-6">';
      html += '<div class="mb-2 text-sm font-extrabold uppercase text-aeblack-400 dark:text-aeblack-300">' + section.heading + '</div>';
      html += '<ul class="list-none m-0 p-0 space-y-0.5">';
      for (var j = 0; j < section.items.length; j++) {
        var item = section.items[j];
        var active = isActive(item.href);
        var cls = active
          ? 'block px-3 py-1.5 text-sm font-medium rounded-md bg-aegold-100 text-aegold-900 no-underline dark:bg-aegold-900 dark:text-aegold-100'
          : 'block px-3 py-1.5 text-sm text-aeblack-600 rounded-md no-underline hover:bg-aeblack-50 hover:text-aeblack-900 dark:text-aeblack-300 dark:hover:bg-aeblack-800 dark:hover:text-whitely-100';
        html += '<li><a href="' + item.href + '" class="' + cls + '">' + item.label + '</a></li>';
      }
      html += '</ul></div>';
    }
    nav.innerHTML = html;
  }

  /* -------------------------------------------------- */
  /*  Theme toggle (light / dark)                       */
  /* -------------------------------------------------- */

  var THEME_KEY = 'aegov-docs-theme';

  function applyTheme(theme) {
    var root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  function getStoredTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }

  function setStoredTheme(theme) {
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }

  function initTheme() {
    var stored = getStoredTheme();
    var theme = stored || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(theme);
  }

  function buildThemeToggle() {
    if (document.getElementById('aegov-docs-theme-toggle')) return;
    var btn = document.createElement('button');
    btn.id = 'aegov-docs-theme-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle light/dark theme');
    btn.className = 'fixed top-4 end-4 z-50 inline-flex items-center justify-center w-10 h-10 rounded-full border border-aeblack-200 bg-whitely-50 text-aeblack-700 shadow-md hover:bg-whitely-100 hover:text-aeblack-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors dark:bg-aeblack-800 dark:border-aeblack-700 dark:text-aeblack-200 dark:hover:bg-aeblack-700 dark:hover:text-whitely-100';
    btn.innerHTML = '<svg class="w-5 h-5 dark:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
      + '<svg class="w-5 h-5 hidden dark:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    btn.addEventListener('click', function () {
      var isDark = document.documentElement.classList.contains('dark');
      var next = isDark ? 'light' : 'dark';
      applyTheme(next);
      setStoredTheme(next);
    });
    document.body.appendChild(btn);
  }

  /* -------------------------------------------------- */
  /*  Copy-to-clipboard on code blocks                  */
  /* -------------------------------------------------- */

  function initCodeCopy() {
    var blocks = document.querySelectorAll('pre:has(code.hljs)');

    for (var i = 0; i < blocks.length; i++) {
      var pre = blocks[i];
      pre.style.position = 'relative';

      var btn = document.createElement('button');
      btn.className = 'hljs-copy-btn';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy code to clipboard');
      pre.appendChild(btn);

      btn.addEventListener('click', (function (preEl, btnEl) {
        return function () {
          var code = preEl.querySelector('code');
          if (!code) return;
          navigator.clipboard.writeText(code.textContent).then(function () {
            btnEl.textContent = 'Copied!';
            setTimeout(function () { btnEl.textContent = 'Copy'; }, 2000);
          });
        };
      })(pre, btn));
    }
  }

  /* -------------------------------------------------- */
  /*  Init                                              */
  /* -------------------------------------------------- */

  function init() {
    buildNav();
    initCodeCopy();
    buildThemeToggle();
  }

  /* Apply theme as early as possible to avoid FOUC */
  initTheme();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
