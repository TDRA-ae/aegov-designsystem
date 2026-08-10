import { useState, useEffect } from 'react';
import {
  AegovToggle, AegovSeparator, AegovBadge,
  AegovButton,
  AegovInput,
  AegovTextarea,
  AegovSelect, AegovSelectOption,
  AegovCheckbox, AegovCheckboxGroup,
  AegovRadio, AegovRadioGroup,
  AegovRange,
  AegovOtp,
  AegovFileupload,
  AegovDatepicker,
  AegovFormField, AegovLabel,
  AegovTabs, AegovTab, AegovTabPanel,
} from '@aegov/designsystem-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [formResult, setFormResult] = useState('Submit form to see FormData result');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = isRtl ? 'ar' : 'en';
  }, [isRtl]);

  // Scrollspy
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
            });
          }
        });
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-aeblack-100 dark:bg-aeblack-950 text-aeblack-800 dark:text-whitely-100 transition-colors duration-200">

      {/* ── Topbar ─────────────────────────────────────── */}
      <header className="sticky top-0 z-50 flex items-center gap-4 border-b border-aeblack-200 dark:border-aeblack-700 bg-white/95 dark:bg-aeblack-900/95 backdrop-blur px-5 py-2.5">
        <div className="flex items-center gap-2 me-4">
          <AegovBadge color="primary" appearance="solid">AEGOV DS</AegovBadge>
          <span className="text-sm font-medium text-aeblack-600 dark:text-aeblack-400">Test App — React</span>
        </div>

        <AegovSeparator orientation="vertical" />

        <AegovToggle
          fieldId="dark-mode"
          label="Dark Mode"
          isChecked={isDark}
          onAegovToggleChange={(e) => setIsDark(e.detail.checked)}
        />

        <AegovSeparator orientation="vertical" />

        <AegovToggle
          fieldId="rtl-mode"
          label="RTL عربي"
          isChecked={isRtl}
          onAegovToggleChange={(e) => setIsRtl(e.detail.checked)}
        />

        <div className="ms-auto flex items-center gap-2">
          <AegovBadge color={isDark ? 'purple' : 'aeblack'}>{isDark ? 'Dark' : 'Light'}</AegovBadge>
          <AegovBadge color={isRtl ? 'aegold' : 'techblue'}>{isRtl ? 'RTL' : 'LTR'}</AegovBadge>
        </div>
      </header>

      {/* ── Page layout ───────────────────────────────── */}
      <div className="flex">

        {/* ── Sidebar ─────────────────────────────────── */}
        <aside className="sticky top-[53px] h-[calc(100vh-53px)] w-52 shrink-0 overflow-y-auto border-e border-aeblack-200 dark:border-aeblack-700 bg-white dark:bg-aeblack-900 px-3 py-5 hidden md:block">
          <p className="px-2 mb-1 text-[10px] font-bold uppercase tracking-widest text-aeblack-400 dark:text-aeblack-600">Foundation</p>
          <ul className="space-y-0.5 mb-4">
            <li><a href="#typography" className="nav-link">Typography</a></li>
            <li><a href="#colors" className="nav-link">Color Palette</a></li>
          </ul>
          <p className="px-2 mb-1 text-[10px] font-bold uppercase tracking-widest text-aeblack-400 dark:text-aeblack-600">Components</p>
          <ul className="space-y-0.5 mb-4">
            <li><a href="#buttons" className="nav-link">Buttons</a></li>
            <li><a href="#button-sizes" className="nav-link">Button Sizes</a></li>
            <li><a href="#badges" className="nav-link">Badges</a></li>
            <li><a href="#badge-appearances" className="nav-link">Badge Appearances</a></li>
          </ul>
          <p className="px-2 mb-1 text-[10px] font-bold uppercase tracking-widest text-aeblack-400 dark:text-aeblack-600">Form Components</p>
          <ul className="space-y-0.5 mb-4">
            <li><a href="#inputs" className="nav-link">Input</a></li>
            <li><a href="#textarea" className="nav-link">Textarea</a></li>
            <li><a href="#select" className="nav-link">Select</a></li>
            <li><a href="#checkbox" className="nav-link">Checkbox</a></li>
            <li><a href="#checkbox-group" className="nav-link">Checkbox Group</a></li>
            <li><a href="#toggle" className="nav-link">Toggle</a></li>
            <li><a href="#radio-group" className="nav-link">Radio Group</a></li>
            <li><a href="#range" className="nav-link">Range</a></li>
            <li><a href="#otp" className="nav-link">OTP</a></li>
            <li><a href="#fileupload" className="nav-link">File Upload</a></li>
            <li><a href="#datepicker" className="nav-link">Datepicker</a></li>
            <li><a href="#form-field" className="nav-link">Form Field</a></li>
          </ul>
          <p className="px-2 mb-1 text-[10px] font-bold uppercase tracking-widest text-aeblack-400 dark:text-aeblack-600">Other</p>
          <ul className="space-y-0.5 mb-4">
            <li><a href="#tabs" className="nav-link">Tabs</a></li>
          </ul>
          <p className="px-2 mb-1 text-[10px] font-bold uppercase tracking-widest text-aeblack-400 dark:text-aeblack-600">Testing</p>
          <ul className="space-y-0.5 mb-4">
            <li><a href="#states" className="nav-link">Component States</a></li>
          </ul>
          <p className="px-2 mb-1 text-[10px] font-bold uppercase tracking-widest text-aeblack-400 dark:text-aeblack-600">Theming</p>
          <ul className="space-y-0.5">
            <li><a href="#dark-mode" className="nav-link">Dark Mode</a></li>
            <li><a href="#rtl" className="nav-link">RTL / Arabic</a></li>
          </ul>
        </aside>

        {/* ── Main content ─────────────────────────────── */}
        <main className="flex-1 min-w-0 px-6 py-6 space-y-6 max-w-4xl">

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-h4 font-extrabold text-aeblack-900 dark:text-whitely-100">AEGOV Design System</h1>
              <p className="text-sm text-aeblack-500 dark:text-aeblack-400 mt-1">All components · React 18 + Tailwind v4 + Vite</p>
            </div>
            <AegovBadge color="aegreen" appearance="soft">v0.0.3</AegovBadge>
          </div>

          {/* ══ TYPOGRAPHY ══ */}
          <section id="typography">
            <div className="section-card">
              <div className="section-card-header flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Typography</h2>
                  <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">Semantic heading elements and utility-class equivalents</p>
                </div>
                <AegovBadge color="primary" appearance="soft">Foundation</AegovBadge>
              </div>
              <div className="section-card-body">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-aeblack-400 dark:text-aeblack-500 mb-3">Semantic elements</p>
                    <div className="preview-box space-y-1.5">
                      <h1>Heading 1 — The quick brown fox</h1>
                      <h2>Heading 2 — The quick brown fox</h2>
                      <h3>Heading 3 — The quick brown fox</h3>
                      <h4>Heading 4 — The quick brown fox</h4>
                      <h5>Heading 5 — The quick brown fox</h5>
                      <h6>Heading 6 — The quick brown fox</h6>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-aeblack-400 dark:text-aeblack-500 mb-3">Utility classes <code className="font-mono text-[10px] bg-aeblack-100 dark:bg-aeblack-800 px-1 rounded">text-h1…h6</code></p>
                    <div className="preview-box space-y-1.5">
                      <div className="text-h1">Heading 1 — The quick brown fox</div>
                      <div className="text-h2">Heading 2 — The quick brown fox</div>
                      <div className="text-h3">Heading 3 — The quick brown fox</div>
                      <div className="text-h4">Heading 4 — The quick brown fox</div>
                      <div className="text-h5">Heading 5 — The quick brown fox</div>
                      <div className="text-h6">Heading 6 — The quick brown fox</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══ COLOR PALETTE ══ */}
          <section id="colors">
            <div className="section-card">
              <div className="section-card-header flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Color Palette</h2>
                  <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">All 18 theme color families — 50 to 950 shades</p>
                </div>
                <AegovBadge color="primary" appearance="soft">Foundation</AegovBadge>
              </div>
              <div className="section-card-body space-y-2.5">
                {([
                  { name: 'aeblack', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
                    bg: {'50':'bg-aeblack-50','100':'bg-aeblack-100','200':'bg-aeblack-200','300':'bg-aeblack-300','400':'bg-aeblack-400','500':'bg-aeblack-500','600':'bg-aeblack-600','700':'bg-aeblack-700','800':'bg-aeblack-800','900':'bg-aeblack-900','950':'bg-aeblack-950'} },
                  { name: 'aegold', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
                    bg: {'50':'bg-aegold-50','100':'bg-aegold-100','200':'bg-aegold-200','300':'bg-aegold-300','400':'bg-aegold-400','500':'bg-aegold-500','600':'bg-aegold-600','700':'bg-aegold-700','800':'bg-aegold-800','900':'bg-aegold-900','950':'bg-aegold-950'} },
                  { name: 'aegreen', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
                    bg: {'50':'bg-aegreen-50','100':'bg-aegreen-100','200':'bg-aegreen-200','300':'bg-aegreen-300','400':'bg-aegreen-400','500':'bg-aegreen-500','600':'bg-aegreen-600','700':'bg-aegreen-700','800':'bg-aegreen-800','900':'bg-aegreen-900','950':'bg-aegreen-950'} },
                  { name: 'aered', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
                    bg: {'50':'bg-aered-50','100':'bg-aered-100','200':'bg-aered-200','300':'bg-aered-300','400':'bg-aered-400','500':'bg-aered-500','600':'bg-aered-600','700':'bg-aered-700','800':'bg-aered-800','900':'bg-aered-900','950':'bg-aered-950'} },
                  { name: 'primary', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
                    bg: {'50':'bg-primary-50','100':'bg-primary-100','200':'bg-primary-200','300':'bg-primary-300','400':'bg-primary-400','500':'bg-primary-500','600':'bg-primary-600','700':'bg-primary-700','800':'bg-primary-800','900':'bg-primary-900','950':'bg-primary-950'} },
                  { name: 'primary-support', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
                    bg: {'50':'bg-primary-support-50','100':'bg-primary-support-100','200':'bg-primary-support-200','300':'bg-primary-support-300','400':'bg-primary-support-400','500':'bg-primary-support-500','600':'bg-primary-support-600','700':'bg-primary-support-700','800':'bg-primary-support-800','900':'bg-primary-support-900','950':'bg-primary-support-950'} },
                  { name: 'secondary', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
                    bg: {'50':'bg-secondary-50','100':'bg-secondary-100','200':'bg-secondary-200','300':'bg-secondary-300','400':'bg-secondary-400','500':'bg-secondary-500','600':'bg-secondary-600','700':'bg-secondary-700','800':'bg-secondary-800','900':'bg-secondary-900','950':'bg-secondary-950'} },
                  { name: 'secondary-support', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
                    bg: {'50':'bg-secondary-support-50','100':'bg-secondary-support-100','200':'bg-secondary-support-200','300':'bg-secondary-support-300','400':'bg-secondary-support-400','500':'bg-secondary-support-500','600':'bg-secondary-support-600','700':'bg-secondary-support-700','800':'bg-secondary-support-800','900':'bg-secondary-support-900','950':'bg-secondary-support-950'} },
                  { name: 'techblue', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
                    bg: {'50':'bg-techblue-50','100':'bg-techblue-100','200':'bg-techblue-200','300':'bg-techblue-300','400':'bg-techblue-400','500':'bg-techblue-500','600':'bg-techblue-600','700':'bg-techblue-700','800':'bg-techblue-800','900':'bg-techblue-900','950':'bg-techblue-950'} },
                  { name: 'seablue', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
                    bg: {'50':'bg-seablue-50','100':'bg-seablue-100','200':'bg-seablue-200','300':'bg-seablue-300','400':'bg-seablue-400','500':'bg-seablue-500','600':'bg-seablue-600','700':'bg-seablue-700','800':'bg-seablue-800','900':'bg-seablue-900','950':'bg-seablue-950'} },
                  { name: 'camel', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
                    bg: {'50':'bg-camel-50','100':'bg-camel-100','200':'bg-camel-200','300':'bg-camel-300','400':'bg-camel-400','500':'bg-camel-500','600':'bg-camel-600','700':'bg-camel-700','800':'bg-camel-800','900':'bg-camel-900','950':'bg-camel-950'} },
                  { name: 'desert', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
                    bg: {'50':'bg-desert-50','100':'bg-desert-100','200':'bg-desert-200','300':'bg-desert-300','400':'bg-desert-400','500':'bg-desert-500','600':'bg-desert-600','700':'bg-desert-700','800':'bg-desert-800','900':'bg-desert-900','950':'bg-desert-950'} },
                  { name: 'fuchsia', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
                    bg: {'50':'bg-fuchsia-50','100':'bg-fuchsia-100','200':'bg-fuchsia-200','300':'bg-fuchsia-300','400':'bg-fuchsia-400','500':'bg-fuchsia-500','600':'bg-fuchsia-600','700':'bg-fuchsia-700','800':'bg-fuchsia-800','900':'bg-fuchsia-900','950':'bg-fuchsia-950'} },
                  { name: 'purple', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
                    bg: {'50':'bg-purple-50','100':'bg-purple-100','200':'bg-purple-200','300':'bg-purple-300','400':'bg-purple-400','500':'bg-purple-500','600':'bg-purple-600','700':'bg-purple-700','800':'bg-purple-800','900':'bg-purple-900','950':'bg-purple-950'} },
                  { name: 'pink', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
                    bg: {'50':'bg-pink-50','100':'bg-pink-100','200':'bg-pink-200','300':'bg-pink-300','400':'bg-pink-400','500':'bg-pink-500','600':'bg-pink-600','700':'bg-pink-700','800':'bg-pink-800','900':'bg-pink-900','950':'bg-pink-950'} },
                  { name: 'indigo', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
                    bg: {'50':'bg-indigo-50','100':'bg-indigo-100','200':'bg-indigo-200','300':'bg-indigo-300','400':'bg-indigo-400','500':'bg-indigo-500','600':'bg-indigo-600','700':'bg-indigo-700','800':'bg-indigo-800','900':'bg-indigo-900','950':'bg-indigo-950'} },
                  { name: 'slate', split: 4, shades: ['50','100','200','300','400','500','600','700','800','900','950'],
                    bg: {'50':'bg-slate-50','100':'bg-slate-100','200':'bg-slate-200','300':'bg-slate-300','400':'bg-slate-400','500':'bg-slate-500','600':'bg-slate-600','700':'bg-slate-700','800':'bg-slate-800','900':'bg-slate-900','950':'bg-slate-950'} },
                  { name: 'whitely', split: 5, shades: ['50','100','200','300','400','500'],
                    bg: {'50':'bg-whitely-50','100':'bg-whitely-100','200':'bg-whitely-200','300':'bg-whitely-300','400':'bg-whitely-400','500':'bg-whitely-500'} },
                ] as { name: string; split: number; shades: string[]; bg: Record<string, string> }[]).map(({ name, shades, split, bg }) => (
                  <div key={name} className="space-y-1">
                    <span className="font-mono text-[11px] font-semibold text-aeblack-500 dark:text-aeblack-400">{name}</span>
                    <div className="flex rounded-lg overflow-hidden h-9">
                      {shades.map((shade, i) => (
                        <div key={shade} className={`flex-1 grid place-items-center ${bg[shade]}`}>
                          <span className={`text-[9px] font-mono ${i <= split ? 'text-aeblack-700' : 'text-white'}`}>{shade}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══ BUTTONS ══ */}
          <section id="buttons">
            <div className="section-card">
              <div className="section-card-header flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Buttons</h2>
                  <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">All variants — primary, secondary, danger, neutral-min, neutral-max</p>
                </div>
                <AegovBadge color="techblue" appearance="soft">Component</AegovBadge>
              </div>
              <div className="section-card-body">
                <div className="preview-box flex gap-3 flex-wrap items-center">
                  <AegovButton variant="primary">Primary</AegovButton>
                  <AegovButton variant="secondary">Secondary</AegovButton>
                  <AegovButton variant="danger">Danger</AegovButton>
                  <AegovButton variant="neutral-min">Neutral Min</AegovButton>
                  <AegovButton variant="neutral-max">Neutral Max</AegovButton>
                  <AegovButton variant="primary" isDisabled>Disabled</AegovButton>
                  <AegovButton
                    variant="primary"
                    isLoading={isLoading}
                    onAegovButtonClick={async () => {
                      setIsLoading(true);
                      await new Promise((r) => setTimeout(r, 2000));
                      setIsLoading(false);
                    }}
                  >
                    {isLoading ? 'Loading…' : 'Click → Loading'}
                  </AegovButton>
                </div>
              </div>
            </div>
          </section>

          {/* ══ BUTTON SIZES ══ */}
          <section id="button-sizes">
            <div className="section-card">
              <div className="section-card-header flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Button Sizes</h2>
                  <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">All 5 variants × all 5 sizes — xs, sm, base, lg, xl</p>
                </div>
                <AegovBadge color="techblue" appearance="soft">Component</AegovBadge>
              </div>
              <div className="section-card-body overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-aeblack-100 dark:border-aeblack-700">
                      {['Variant','xs','sm','base','lg','xl'].map(h => (
                        <th key={h} className="py-2 pe-5 text-start text-[11px] font-semibold uppercase tracking-wide text-aeblack-400 dark:text-aeblack-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-aeblack-50 dark:divide-aeblack-800">
                    {(['primary','secondary','danger','neutral-min','neutral-max'] as const).map(variant => (
                      <tr key={variant}>
                        <td className="py-3 pe-5 font-mono text-[11px] text-aeblack-400 dark:text-aeblack-500">{variant}</td>
                        {(['xs','sm','base','lg','xl'] as const).map(size => (
                          <td key={size} className="py-3 pe-5">
                            <AegovButton variant={variant} size={size}>Button</AegovButton>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ══ BADGES ══ */}
          <section id="badges">
            <div className="section-card">
              <div className="section-card-header flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Badges</h2>
                  <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">All 17 color values</p>
                </div>
                <AegovBadge color="techblue" appearance="soft">Component</AegovBadge>
              </div>
              <div className="section-card-body">
                <div className="preview-box flex gap-2 flex-wrap">
                  {(['default','primary','secondary','aegreen','aegold','aered','aeblack','techblue','seablue','camel','desert','fuchsia','slate','purple','pink','indigo','lime'] as const).map(color => (
                    <AegovBadge key={color} color={color}>{color}</AegovBadge>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══ BADGE APPEARANCES ══ */}
          <section id="badge-appearances">
            <div className="section-card">
              <div className="section-card-header flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Badge Appearances</h2>
                  <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">Soft (default) vs Solid</p>
                </div>
                <AegovBadge color="techblue" appearance="soft">Component</AegovBadge>
              </div>
              <div className="section-card-body">
                <div className="grid grid-cols-2 gap-5">
                  {(['soft','solid'] as const).map(appearance => (
                    <div key={appearance} className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-aeblack-400 dark:text-aeblack-500 capitalize">{appearance}</p>
                      <div className="preview-box flex flex-wrap gap-2">
                        {(['default','primary','secondary','aegreen','aegold','aered','aeblack','techblue','seablue','camel','fuchsia','purple','pink','lime'] as const).map(color => (
                          <AegovBadge key={color} color={color} appearance={appearance}>{color}</AegovBadge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══ INPUT ══ */}
          <section id="inputs">
            <div className="section-card">
              <div className="section-card-header flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Input</h2>
                  <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">Text, email, password — <code className="font-mono text-[11px]">fieldId</code> (camelCase in React)</p>
                </div>
                <AegovBadge color="techblue" appearance="soft">Component</AegovBadge>
              </div>
              <div className="section-card-body">
                <div className="preview-box grid grid-cols-2 gap-4 max-w-2xl">
                  <AegovInput fieldId="inp-name" placeholder="Full name" />
                  <AegovInput fieldId="inp-email" placeholder="Email address" type="email" isRequired />
                  <AegovInput fieldId="inp-pass" placeholder="Password" type="password" isRevealable />
                  <AegovInput fieldId="inp-hint" placeholder="With hint text" hint="This is a helpful hint" />
                </div>
              </div>
            </div>
          </section>

          {/* ══ SELECT ══ */}
          <section id="select">
            <div className="section-card">
              <div className="section-card-header flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Select</h2>
                  <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">Single, searchable, clearable</p>
                </div>
                <AegovBadge color="techblue" appearance="soft">Component</AegovBadge>
              </div>
              <div className="section-card-body">
                <div className="preview-box grid grid-cols-2 gap-4 max-w-2xl">
                  <AegovSelect fieldId="sel-status" placeholder="Select a status">
                    <AegovSelectOption value="active">Active</AegovSelectOption>
                    <AegovSelectOption value="pending">Pending</AegovSelectOption>
                    <AegovSelectOption value="closed">Closed</AegovSelectOption>
                  </AegovSelect>
                  <AegovSelect fieldId="sel-search" placeholder="Searchable + clearable" isSearchable isClearable>
                    <AegovSelectOption value="ae">United Arab Emirates</AegovSelectOption>
                    <AegovSelectOption value="sa">Saudi Arabia</AegovSelectOption>
                    <AegovSelectOption value="eg">Egypt</AegovSelectOption>
                    <AegovSelectOption value="jo">Jordan</AegovSelectOption>
                  </AegovSelect>
                </div>
              </div>
            </div>
          </section>

          {/* ══ CHECKBOX ══ */}
          <section id="checkbox">
            <div className="section-card">
              <div className="section-card-header flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Checkbox</h2>
                  <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5"><code className="font-mono text-[11px]">isChecked</code> (camelCase in React)</p>
                </div>
                <AegovBadge color="techblue" appearance="soft">Component</AegovBadge>
              </div>
              <div className="section-card-body">
                <div className="preview-box flex flex-wrap gap-6">
                  <AegovCheckbox fieldId="chk-agree" label="I agree to the terms and conditions" />
                  <AegovCheckbox fieldId="chk-news" label="Subscribe to newsletter" isChecked />
                  <AegovCheckbox fieldId="chk-hint" label="With hint text" hint="This is a helpful description" />
                </div>
              </div>
            </div>
          </section>

          {/* ══ TEXTAREA ══ */}
          <section id="textarea">
            <div className="section-card">
              <div className="section-card-header flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Textarea</h2>
                  <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">Multi-line text · resize modes · copyable</p>
                </div>
                <AegovBadge color="techblue" appearance="soft">Component</AegovBadge>
              </div>
              <div className="section-card-body">
                <div className="grid grid-cols-2 gap-4 max-w-2xl">
                  <AegovTextarea fieldId="ta-basic" placeholder="Basic textarea" />
                  <AegovTextarea fieldId="ta-hint" placeholder="With hint text" hint="Max 500 characters" />
                  <AegovTextarea fieldId="ta-required" placeholder="Required field" isRequired />
                  <AegovTextarea fieldId="ta-copy" placeholder="Copyable textarea" value="Copy me!" isCopyable />
                  <AegovTextarea fieldId="ta-disabled" placeholder="Disabled textarea" isDisabled />
                  <AegovTextarea fieldId="ta-invalid" placeholder="Invalid textarea" isInvalid errorMessage="This field has an error" />
                </div>
              </div>
            </div>
          </section>

          {/* ══ CHECKBOX GROUP ══ */}
          <section id="checkbox-group">
            <div className="section-card">
              <div className="section-card-header flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Checkbox Group</h2>
                  <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">Grouped checkboxes · vertical / horizontal</p>
                </div>
                <AegovBadge color="techblue" appearance="soft">Component</AegovBadge>
              </div>
              <div className="section-card-body">
                <div className="grid grid-cols-2 gap-6 max-w-2xl">
                  <AegovCheckboxGroup label="Vertical (default)" hint="Select all that apply">
                    <AegovCheckbox fieldId="cg-a" name="interests" value="design" label="Design" />
                    <AegovCheckbox fieldId="cg-b" name="interests" value="dev" label="Development" isChecked />
                    <AegovCheckbox fieldId="cg-c" name="interests" value="qa" label="QA / Testing" />
                  </AegovCheckboxGroup>
                  <AegovCheckboxGroup label="Horizontal" orientation="horizontal">
                    <AegovCheckbox fieldId="cg-h1" name="days" value="mon" label="Mon" isChecked />
                    <AegovCheckbox fieldId="cg-h2" name="days" value="tue" label="Tue" />
                    <AegovCheckbox fieldId="cg-h3" name="days" value="wed" label="Wed" isChecked />
                    <AegovCheckbox fieldId="cg-h4" name="days" value="thu" label="Thu" />
                  </AegovCheckboxGroup>
                </div>
              </div>
            </div>
          </section>

          {/* ══ TOGGLE ══ */}
          <section id="toggle">
            <div className="section-card">
              <div className="section-card-header flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Toggle</h2>
                  <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">On/off switch · variants · sizes</p>
                </div>
                <AegovBadge color="techblue" appearance="soft">Component</AegovBadge>
              </div>
              <div className="section-card-body">
                <div className="space-y-4 max-w-md">
                  <div className="flex flex-wrap gap-6">
                    <AegovToggle fieldId="tg-off" label="Off state" />
                    <AegovToggle fieldId="tg-on" label="On state" isChecked />
                    <AegovToggle fieldId="tg-disabled" label="Disabled" isDisabled />
                    <AegovToggle fieldId="tg-disabled-on" label="Disabled + On" isDisabled isChecked />
                  </div>
                  <div className="flex flex-wrap gap-6">
                    {(['primary', 'secondary', 'neutral-max', 'neutral-min'] as const).map((v) => (
                      <AegovToggle key={v} fieldId={`tg-v-${v}`} label={v} variant={v} isChecked />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══ RADIO GROUP ══ */}
          <section id="radio-group">
            <div className="section-card">
              <div className="section-card-header flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Radio Group</h2>
                  <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">Single-selection · vertical / horizontal</p>
                </div>
                <AegovBadge color="techblue" appearance="soft">Component</AegovBadge>
              </div>
              <div className="section-card-body">
                <div className="grid grid-cols-2 gap-6 max-w-2xl">
                  <AegovRadioGroup name="plan" label="Subscription plan" hint="Choose one plan">
                    <AegovRadio fieldId="rg-free" value="free" label="Free" isChecked />
                    <AegovRadio fieldId="rg-pro" value="pro" label="Pro" />
                    <AegovRadio fieldId="rg-enterprise" value="enterprise" label="Enterprise" />
                  </AegovRadioGroup>
                  <AegovRadioGroup name="size" label="Size (horizontal)" orientation="horizontal">
                    <AegovRadio fieldId="rg-sm" value="sm" label="S" isChecked />
                    <AegovRadio fieldId="rg-md" value="md" label="M" />
                    <AegovRadio fieldId="rg-lg" value="lg" label="L" />
                    <AegovRadio fieldId="rg-xl" value="xl" label="XL" />
                  </AegovRadioGroup>
                  <AegovRadioGroup name="notify" label="Required" isRequired isInvalid errorMessage="Please select an option">
                    <AegovRadio fieldId="rg-email" value="email" label="Email" />
                    <AegovRadio fieldId="rg-sms" value="sms" label="SMS" />
                    <AegovRadio fieldId="rg-none" value="none" label="None" />
                  </AegovRadioGroup>
                  <AegovRadioGroup name="tier-dis" label="Disabled group" isDisabled>
                    <AegovRadio fieldId="rg-d1" value="a" label="Option A" isChecked />
                    <AegovRadio fieldId="rg-d2" value="b" label="Option B" />
                  </AegovRadioGroup>
                </div>
              </div>
            </div>
          </section>

          {/* ══ RANGE ══ */}
          <section id="range">
            <div className="section-card">
              <div className="section-card-header flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Range</h2>
                  <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">Single · dual (min/max) · display modes</p>
                </div>
                <AegovBadge color="techblue" appearance="soft">Component</AegovBadge>
              </div>
              <div className="section-card-body">
                <div className="space-y-6 max-w-lg">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-aeblack-400 mb-2">Single — no label</p>
                    <AegovRange fieldId="rng-single" value={40} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-aeblack-400 mb-2">Single — with tooltip display</p>
                    <AegovRange fieldId="rng-tooltip" label="Volume" value={60} display="tooltip" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-aeblack-400 mb-2">Dual/range (price range)</p>
                    <AegovRange fieldId="rng-dual" label="Price range" mode="range" valueLow={20} valueHigh={80} display="tooltip" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-aeblack-400 mb-2">Disabled</p>
                    <AegovRange fieldId="rng-disabled" label="Disabled" value={50} isDisabled />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══ OTP ══ */}
          <section id="otp">
            <div className="section-card">
              <div className="section-card-header flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-aeblack-900 dark:text-whitely-100">OTP</h2>
                  <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">One-time password · continuous / segmented</p>
                </div>
                <AegovBadge color="techblue" appearance="soft">Component</AegovBadge>
              </div>
              <div className="section-card-body">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-aeblack-400 mb-2">Continuous (default, 5 digits)</p>
                    <AegovOtp fieldId="otp-cont" length={5} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-aeblack-400 mb-2">Individual (6 digits)</p>
                    <AegovOtp fieldId="otp-seg" appearance="individual" length={6} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-aeblack-400 mb-2">Alphanumeric · invalid state</p>
                    <AegovOtp fieldId="otp-alpha" length={4} isAlphanumeric isInvalid errorMessage="Invalid code, please try again" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══ FILE UPLOAD ══ */}
          <section id="fileupload">
            <div className="section-card">
              <div className="section-card-header flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-aeblack-900 dark:text-whitely-100">File Upload</h2>
                  <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">Default · dropzone · multiple files</p>
                </div>
                <AegovBadge color="techblue" appearance="soft">Component</AegovBadge>
              </div>
              <div className="section-card-body">
                <div className="space-y-6 max-w-lg">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-aeblack-400 mb-2">Default (button)</p>
                    <AegovFileupload fieldId="fu-default" label="Upload document" hint="PDF, DOC up to 10 MB" accept=".pdf,.doc,.docx" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-aeblack-400 mb-2">Dropzone</p>
                    <AegovFileupload fieldId="fu-drop" appearance="dropzone" label="Drop files here" hint="Images only · max 5 MB each" accept="image/*" isMultiple />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-aeblack-400 mb-2">Required · invalid</p>
                    <AegovFileupload fieldId="fu-invalid" label="Required upload" isRequired isInvalid errorMessage="Please upload a file to continue" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══ DATEPICKER ══ */}
          <section id="datepicker">
            <div className="section-card">
              <div className="section-card-header flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Datepicker</h2>
                  <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">Single · range · clearable</p>
                </div>
                <AegovBadge color="techblue" appearance="soft">Component</AegovBadge>
              </div>
              <div className="section-card-body">
                <div className="grid grid-cols-2 gap-4 max-w-2xl">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-aeblack-400 mb-2">Single date</p>
                    <AegovDatepicker placeholder="Select a date" isClearable />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-aeblack-400 mb-2">Date range</p>
                    <AegovDatepicker appearance="range" labelRangeStart="From" labelRangeEnd="To" isClearable />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-aeblack-400 mb-2">Disabled</p>
                    <AegovDatepicker placeholder="Disabled datepicker" isDisabled />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-aeblack-400 mb-2">Required</p>
                    <AegovDatepicker placeholder="Required date" isRequired />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══ FORM FIELD ══ */}
          <section id="form-field">
            <div className="section-card">
              <div className="section-card-header flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Form Field</h2>
                  <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">Wrapper that adds label + hint + error to any form component</p>
                </div>
                <AegovBadge color="techblue" appearance="soft">Component</AegovBadge>
              </div>
              <div className="section-card-body">
                <div className="space-y-4 max-w-lg">
                  <AegovFormField fieldId="ff-name" hint="As shown on your ID">
                    <AegovLabel htmlFor="ff-name">Full name <span aria-hidden="true" style={{color:'var(--color-aered-600)'}}>*</span></AegovLabel>
                    <AegovInput fieldId="ff-name" name="fullname" placeholder="Enter your full name" isRequired />
                  </AegovFormField>
                  <AegovFormField fieldId="ff-country">
                    <AegovLabel htmlFor="ff-country">Country</AegovLabel>
                    <AegovSelect fieldId="ff-country" placeholder="Select a country">
                      <AegovSelectOption value="ae">United Arab Emirates</AegovSelectOption>
                      <AegovSelectOption value="sa">Saudi Arabia</AegovSelectOption>
                      <AegovSelectOption value="eg">Egypt</AegovSelectOption>
                    </AegovSelect>
                  </AegovFormField>
                  <AegovFormField fieldId="ff-bio" hint="Tell us about yourself">
                    <AegovLabel htmlFor="ff-bio">Bio</AegovLabel>
                    <AegovTextarea fieldId="ff-bio" name="bio" placeholder="Enter a short bio..." />
                  </AegovFormField>
                  <AegovFormField fieldId="ff-dob" errorMessage="Date of birth is required" isInvalid>
                    <AegovLabel htmlFor="ff-dob">Date of birth <span aria-hidden="true" style={{color:'var(--color-aered-600)'}}>*</span></AegovLabel>
                    <AegovDatepicker placeholder="Select date" isClearable />
                  </AegovFormField>
                </div>
              </div>
            </div>
          </section>

          {/* ══ TABS ══ */}
          <section id="tabs">
            <div className="section-card">
              <div className="section-card-header flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Tabs</h2>
                  <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5"><code className="font-mono text-[11px]">tabId</code> (camelCase in React) — required prop</p>
                </div>
                <AegovBadge color="techblue" appearance="soft">Component</AegovBadge>
              </div>
              <div className="section-card-body">
                <AegovTabs defaultOpen="overview">
                  <AegovTab slot="tabs" tabId="overview">Overview</AegovTab>
                  <AegovTab slot="tabs" tabId="details">Details</AegovTab>
                  <AegovTab slot="tabs" tabId="history">History</AegovTab>
                  <AegovTabPanel tabId="overview">
                    <div className="p-4">
                      <p className="text-sm text-aeblack-600 dark:text-aeblack-400">Overview panel — <code className="font-mono text-[11px] bg-aeblack-100 dark:bg-aeblack-800 px-1 rounded">tabId</code> is camelCase in React.</p>
                    </div>
                  </AegovTabPanel>
                  <AegovTabPanel tabId="details">
                    <div className="p-4"><p className="text-sm text-aeblack-600 dark:text-aeblack-400">Details panel.</p></div>
                  </AegovTabPanel>
                  <AegovTabPanel tabId="history">
                    <div className="p-4"><p className="text-sm text-aeblack-600 dark:text-aeblack-400">History panel.</p></div>
                  </AegovTabPanel>
                </AegovTabs>
              </div>
            </div>
          </section>

          {/* ══ COMPONENT STATES ══ */}
          <section id="states">
            <div className="section-card">
              <div className="section-card-header flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Component States</h2>
                  <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">Normal · Disabled · Readonly · Required</p>
                </div>
                <AegovBadge color="aegold" appearance="soft">Testing</AegovBadge>
              </div>
              <div className="section-card-body space-y-6">
                <div className="space-y-2">
                  <AegovSeparator text="Input" />
                  <div className="preview-box grid grid-cols-2 gap-4 max-w-2xl">
                    {[
                      { id: 'n', label: 'Normal', props: {} },
                      { id: 'd', label: 'Disabled', props: { isDisabled: true } },
                      { id: 'r', label: 'Readonly', props: { isReadonly: true } },
                      { id: 'req', label: 'Required', props: { isRequired: true } },
                    ].map(({ id, label, props }) => (
                      <div key={id} className="space-y-1">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-aeblack-400 dark:text-aeblack-500">{label}</p>
                        <AegovInput fieldId={`st-inp-${id}`} placeholder={`${label} input`} {...props} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <AegovSeparator text="Select" />
                  <div className="preview-box grid grid-cols-2 gap-4 max-w-2xl">
                    {[
                      { id: 'n', label: 'Normal', props: {} },
                      { id: 'd', label: 'Disabled', props: { isDisabled: true } },
                      { id: 'req', label: 'Required', props: { isRequired: true } },
                      { id: 's', label: 'Searchable', props: { isSearchable: true, isClearable: true } },
                    ].map(({ id, label, props }) => (
                      <div key={id} className="space-y-1">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-aeblack-400 dark:text-aeblack-500">{label}</p>
                        <AegovSelect fieldId={`st-sel-${id}`} placeholder={`${label} select`} {...props}>
                          <AegovSelectOption value="a">Option A</AegovSelectOption>
                          <AegovSelectOption value="b">Option B</AegovSelectOption>
                        </AegovSelect>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <AegovSeparator text="Checkbox" />
                  <div className="preview-box flex flex-wrap gap-6">
                    {[
                      { id: 'n', label: 'Normal', props: {} },
                      { id: 'c', label: 'Checked', props: { isChecked: true } },
                      { id: 'd', label: 'Disabled', props: { isDisabled: true } },
                      { id: 'dc', label: 'Disabled + Checked', props: { isDisabled: true, isChecked: true } },
                    ].map(({ id, label, props }) => (
                      <div key={id} className="space-y-1">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-aeblack-400 dark:text-aeblack-500">{label}</p>
                        <AegovCheckbox fieldId={`st-cb-${id}`} label={label} {...props} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══ DARK MODE ══ */}
          <section id="dark-mode">
            <div className="section-card">
              <div className="section-card-header flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Dark Mode</h2>
                  <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5"><code className="font-mono text-[11px]">.dark</code> on <code className="font-mono text-[11px]">&lt;html&gt;</code> — use the toggle in the top bar</p>
                </div>
                <AegovBadge color="purple" appearance="soft">Theming</AegovBadge>
              </div>
              <div className="section-card-body">
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-xl p-4 space-y-2 bg-whitely-50 dark:bg-aeblack-800 border border-aeblack-200 dark:border-aeblack-600 transition-colors duration-200">
                    <p className="text-sm font-semibold text-aeblack-800 dark:text-whitely-100">Surface</p>
                    <p className="text-xs text-aeblack-500 dark:text-aeblack-400">Secondary text</p>
                    <AegovButton variant="primary" size="sm">Action</AegovButton>
                  </div>
                  <div className="rounded-xl p-4 space-y-2 bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 transition-colors duration-200">
                    <p className="text-sm font-semibold text-primary-800 dark:text-primary-200">Primary tint</p>
                    <p className="text-xs text-primary-600 dark:text-primary-400">Semantic text</p>
                    <div className="flex gap-1.5">
                      <AegovBadge color="primary" appearance="soft">Active</AegovBadge>
                      <AegovBadge color="aegreen" appearance="soft">Online</AegovBadge>
                    </div>
                  </div>
                  <div className="rounded-xl p-4 space-y-2 bg-aeblack-800 dark:bg-whitely-100 border border-aeblack-700 dark:border-aeblack-200 transition-colors duration-200">
                    <p className="text-sm font-semibold text-white dark:text-aeblack-900">Inverted</p>
                    <p className="text-xs text-aeblack-300 dark:text-aeblack-600">Intentionally flips</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══ RTL ══ */}
          <section id="rtl">
            <div className="section-card">
              <div className="section-card-header flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-aeblack-900 dark:text-whitely-100">RTL / Arabic</h2>
                  <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">Toggle RTL in the top bar — flips layout + Noto Kufi Arabic font</p>
                </div>
                <AegovBadge color="purple" appearance="soft">Theming</AegovBadge>
              </div>
              <div className="section-card-body">
                <div className="preview-box space-y-4">
                  <p className="text-sm text-aeblack-600 dark:text-aeblack-300">هذا النص يظهر باللغة العربية. عند تفعيل وضع RTL، يُعكس تخطيط الصفحة بالكامل وتُستخدم خطوط "نوتو كوفي عربي".</p>
                  <div className="flex gap-3 flex-wrap">
                    <AegovButton variant="primary">زر رئيسي</AegovButton>
                    <AegovButton variant="secondary">زر ثانوي</AegovButton>
                    <AegovButton variant="danger">تحذير</AegovButton>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <AegovBadge color="aegreen">نشط</AegovBadge>
                    <AegovBadge color="aegold">قيد الانتظار</AegovBadge>
                    <AegovBadge color="aered">مرفوض</AegovBadge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 max-w-lg">
                    <AegovInput fieldId="rtl-name" placeholder="الاسم الكامل" />
                    <AegovSelect fieldId="rtl-status" placeholder="اختر الحالة">
                      <AegovSelectOption value="active">نشط</AegovSelectOption>
                      <AegovSelectOption value="pending">قيد الانتظار</AegovSelectOption>
                    </AegovSelect>
                  </div>
                  <AegovCheckbox fieldId="rtl-agree" label="أوافق على الشروط والأحكام" />
                </div>
              </div>
            </div>
          </section>

          {/* ══ FORM SHADOW TEST ══ */}
          <section id="form-shadow-test">
            <div className="section-card">
              <div className="section-card-header flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-aeblack-900 dark:text-whitely-100">Form Shadow Test</h2>
                  <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mt-0.5">aegov-input with shadow:true — testing label association &amp; form submission</p>
                </div>
                <AegovBadge color="aered" appearance="soft">shadow:true</AegovBadge>
              </div>
              <div className="section-card-body">
                <div className="preview-box space-y-8">

                  {/* Test 1: Label association */}
                  <div>
                    <p className="text-sm font-semibold text-aeblack-800 dark:text-whitely-200 mb-1">Test 1 — Label association</p>
                    <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mb-3">Click the label text → the input should get focus</p>
                    <AegovFormField fieldId="react-shadow-label-test" className="max-w-sm">
                      <AegovLabel htmlFor="react-shadow-label-test" style={{cursor:'pointer',textDecoration:'underline',color:'var(--color-primary-600)'}}>▶ Click this label (aegov-label)</AegovLabel>
                      <AegovInput fieldId="react-shadow-label-test" placeholder="Did focus land here?" />
                    </AegovFormField>
                  </div>

                  {/* Test 2: Form submission */}
                  <div>
                    <p className="text-sm font-semibold text-aeblack-800 dark:text-whitely-200 mb-1">Test 2 — Form submission (FormData)</p>
                    <p className="text-xs text-aeblack-500 dark:text-aeblack-400 mb-3">Type values, click Submit → missing fields mean form submission is broken</p>
                    <form className="space-y-3 max-w-sm" onSubmit={(e) => {
                      e.preventDefault();
                      const data = new FormData(e.currentTarget);
                      const result: Record<string, string> = {};
                      data.forEach((v, k) => { result[k] = v as string; });
                      const keys = Object.keys(result);
                      setFormResult(keys.length === 0
                        ? '❌ FormData is EMPTY — form submission broken with shadow:true'
                        : '✅ FormData captured:\n' + JSON.stringify(result, null, 2));
                    }}>
                      <AegovInput fieldId="react-shadow-email" name="email" placeholder="Email address" />
                      <AegovInput fieldId="react-shadow-username" name="username" placeholder="Username" />
                      <AegovButton type="submit" variant="primary">Submit Form</AegovButton>
                    </form>
                    <pre className="mt-4 p-3 rounded-md bg-aeblack-50 dark:bg-aeblack-900 border border-aeblack-200 dark:border-aeblack-700 text-xs text-aeblack-700 dark:text-aeblack-300 font-mono whitespace-pre-wrap">{formResult}</pre>
                  </div>

                </div>
              </div>
            </div>
          </section>

          <div className="h-16" />
        </main>
      </div>
    </div>
  );
}
