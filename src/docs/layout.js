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
        { label: 'Installation', href: '/docs/pages/installation.html' },
      ],
    },
    {
      heading: 'Components',
      items: [
        { label: 'Accordion', href: '/docs/pages/aegov-accordion.html' },
        { label: 'Aspect Ratio', href: '/docs/pages/aegov-aspect-ratio.html' },
        { label: 'Avatar', href: '/docs/pages/aegov-avatar.html' },
        { label: 'Badge', href: '/docs/pages/aegov-badge.html' },
        { label: 'Banner', href: '/docs/pages/aegov-banner.html' },
        { label: 'Blockquote', href: '/docs/pages/aegov-blockquote.html' },
        { label: 'Breadcrumbs', href: '/docs/pages/aegov-breadcrumbs.html' },
        { label: 'Button', href: '/docs/pages/aegov-button.html' },
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
    {
      heading: 'Frameworks',
      items: [
        { label: 'Using React', href: '/docs/pages/using-with-react.html' },
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
      html += '<div class="mb-2 text-sm font-extrabold uppercase text-aeblack-400">' + section.heading + '</div>';
      html += '<ul class="list-none m-0 p-0 space-y-0.5">';
      for (var j = 0; j < section.items.length; j++) {
        var item = section.items[j];
        var active = isActive(item.href);
        var cls = active
          ? 'block px-3 py-1.5 text-sm font-medium rounded-md bg-aegold-100 text-aegold-900 no-underline'
          : 'block px-3 py-1.5 text-sm text-aeblack-600 rounded-md no-underline hover:bg-aeblack-50 hover:text-aeblack-900';
        html += '<li><a href="' + item.href + '" class="' + cls + '">' + item.label + '</a></li>';
      }
      html += '</ul></div>';
    }
    nav.innerHTML = html;
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
