import { newSpecPage } from '@stencil/core/testing';
import { AegovFooter } from './aegov-footer';
import { AegovFooterHighlights } from '../aegov-footer-highlights/aegov-footer-highlights';
import { AegovLink } from '../aegov-link/aegov-link';

const GROUP = `
  <div class="aegov-footer__group">
    <h2>The Ministry</h2>
    <ul role="list"><li><a href="/about">About the ministry</a></li></ul>
  </div>
`;

describe('aegov-footer', () => {
  it('renders a top-level footer with a single nav landmark wrapping the groups', async () => {
    const page = await newSpecPage({
      components: [AegovFooter, AegovFooterHighlights, AegovLink],
      html: `<aegov-footer>${GROUP}</aegov-footer>`,
    });
    const footer = page.root.querySelector('footer.aegov-footer');
    expect(footer).not.toBeNull();
    expect(page.root.tagName).toBe('AEGOV-FOOTER');

    const navs = footer.querySelectorAll('nav');
    expect(navs.length).toBe(1);
    expect(navs[0].getAttribute('aria-label')).toBe('Footer navigation');
  });

  it('translates the nav label under an RTL ancestor', async () => {
    const page = await newSpecPage({
      components: [AegovFooter, AegovFooterHighlights, AegovLink],
      html: `<div dir="rtl"><aegov-footer>${GROUP}</aegov-footer></div>`,
    });
    const nav = page.body.querySelector('nav');
    expect(nav.getAttribute('aria-label')).toBe('التنقل في التذييل');
  });

  it('leaves the title as plain, untouched markup — no trigger, no button, no ARIA — when non-interactive (matchMedia unavailable in jsdom degrades desktop-safe)', async () => {
    const page = await newSpecPage({
      components: [AegovFooter, AegovFooterHighlights, AegovLink],
      html: `<aegov-footer nav-variant="flat">${GROUP}</aegov-footer>`,
    });
    const group = page.root.querySelector('.aegov-footer__group');
    const title = group.querySelector('h2');
    const panel = group.querySelector('.aegov-footer__group-panel');

    expect(title.textContent.trim()).toBe('The Ministry');
    expect(title.querySelector('button')).toBeNull();
    expect(group.querySelector('.aegov-footer__group-trigger')).toBeNull();
    expect(panel).not.toBeNull();
    expect(panel.hasAttribute('hidden')).toBe(false);
    expect(panel.hasAttribute('role')).toBe(false);
  });

  it('supports any tag for the title, not just h2', async () => {
    const page = await newSpecPage({
      components: [AegovFooter, AegovFooterHighlights, AegovLink],
      html: `<aegov-footer nav-variant="flat">
        <div class="aegov-footer__group">
          <h4>References</h4>
          <ul role="list"><li><a href="/x">X</a></li></ul>
        </div>
      </aegov-footer>`,
    });
    const title = page.root.querySelector('.aegov-footer__group h4');
    expect(title).not.toBeNull();
    expect(title.textContent.trim()).toBe('References');
  });

  it('interactive: synthesizes a trigger button around the title\'s own text, moves the list into a panel, and toggles on click', async () => {
    const page = await newSpecPage({
      components: [AegovFooter, AegovFooterHighlights, AegovLink],
      html: `<aegov-footer>${GROUP}</aegov-footer>`,
    });
    const group = page.root.querySelector('.aegov-footer__group');
    const title = group.querySelector('h2');
    const trigger = title.querySelector('.aegov-footer__group-trigger') as HTMLButtonElement;
    const panel = group.querySelector('.aegov-footer__group-panel') as HTMLElement;

    expect(trigger).not.toBeNull();
    expect(trigger.textContent.trim()).toBe('The Ministry');
    expect(trigger.tagName).toBe('BUTTON');
    expect(panel.querySelector('a[href="/about"]')).not.toBeNull();

    // First sync on an interactive (mobile-safe default) group: the first
    // (only, here) column starts OPEN, matching the reference footer block.
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(panel.hasAttribute('hidden')).toBe(false);
    expect(trigger.getAttribute('aria-controls')).toBe(panel.id);
    expect(panel.getAttribute('aria-labelledby')).toBe(trigger.id);

    trigger.click();
    await page.waitForChanges();
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(panel.hasAttribute('hidden')).toBe(true);
  });

  it('first sync with multiple columns: only the first starts open, the rest closed', async () => {
    const page = await newSpecPage({
      components: [AegovFooter, AegovFooterHighlights, AegovLink],
      html: `<aegov-footer>
        <div class="aegov-footer__group"><h2>The Ministry</h2><ul role="list"><li><a href="/a">A</a></li></ul></div>
        <div class="aegov-footer__group"><h2>Using the website</h2><ul role="list"><li><a href="/b">B</a></li></ul></div>
        <div class="aegov-footer__group"><h2>Information and support</h2><ul role="list"><li><a href="/c">C</a></li></ul></div>
      </aegov-footer>`,
    });
    const triggers = Array.from(page.root.querySelectorAll('.aegov-footer__group-trigger')) as HTMLButtonElement[];
    expect(triggers.map(t => t.getAttribute('aria-expanded'))).toEqual(['true', 'false', 'false']);
  });

  it('unwraps the trigger back to plain text when switching from interactive to non-interactive', async () => {
    const page = await newSpecPage({
      components: [AegovFooter, AegovFooterHighlights, AegovLink],
      html: `<aegov-footer>${GROUP}</aegov-footer>`,
    });
    const group = page.root.querySelector('.aegov-footer__group');
    expect(group.querySelector('.aegov-footer__group-trigger')).not.toBeNull();

    // Simulate a resize past `sm` — matchMedia isn't available in jsdom, so
    // drive the same code path directly via the prop that also gates it.
    page.root.setAttribute('nav-variant', 'flat');
    await page.waitForChanges();

    expect(group.querySelector('.aegov-footer__group-trigger')).toBeNull();
    expect(group.querySelector('h2').textContent.trim()).toBe('The Ministry');
  });

  it('defaults navVariant to collapsible and falls back on an invalid value', async () => {
    const page = await newSpecPage({
      components: [AegovFooter, AegovFooterHighlights, AegovLink],
      html: `<aegov-footer nav-variant="bogus">${GROUP}</aegov-footer>`,
    });
    expect(page.root.querySelector('nav').className).toContain('footer--collapsible');
  });

  it('embeds aegov-footer-highlights and forwards the highlights slot content into it', async () => {
    const page = await newSpecPage({
      components: [AegovFooter, AegovFooterHighlights, AegovLink],
      html: `<aegov-footer>${GROUP}<p slot="highlights">Sign up</p></aegov-footer>`,
    });
    const highlights = page.root.querySelector('aegov-footer-highlights');
    expect(highlights).not.toBeNull();
    expect(highlights.querySelector('p')?.textContent).toBe('Sign up');
  });

  it('forwards the entity-contact-* props to the embedded aegov-footer-highlights', async () => {
    const page = await newSpecPage({
      components: [AegovFooter, AegovFooterHighlights, AegovLink],
      html: `<aegov-footer entity-contact-number="800 8877" entity-contact-number-label="Hotline" entity-email="info@example.gov.ae" entity-email-label="Support email" entity-contact-href="/contact">${GROUP}</aegov-footer>`,
    });
    const highlights = page.root.querySelector('aegov-footer-highlights');
    expect(highlights.getAttribute('entity-contact-number')).toBe('800 8877');
    expect(highlights.getAttribute('entity-contact-number-label')).toBe('Hotline');
    expect(highlights.getAttribute('entity-email')).toBe('info@example.gov.ae');
    expect(highlights.getAttribute('entity-email-label')).toBe('Support email');
    expect(highlights.getAttribute('entity-contact-href')).toBe('/contact');
  });

  it('renders brand-slot content as the first item of the columns grid', async () => {
    const page = await newSpecPage({
      components: [AegovFooter, AegovFooterHighlights, AegovLink],
      html: `<aegov-footer><span slot="brand">Example Entity</span>${GROUP}</aegov-footer>`,
    });
    const brand = page.root.querySelector('.aegov-footer__brand');
    expect(brand).not.toBeNull();
    expect(brand.textContent.trim()).toBe('Example Entity');
  });

  it('renders legal-slot content inside the bottom bar', async () => {
    const page = await newSpecPage({
      components: [AegovFooter, AegovFooterHighlights, AegovLink],
      html: `<aegov-footer>${GROUP}<div slot="legal"><a href="/privacy">Privacy policy</a></div></aegov-footer>`,
    });
    const legal = page.root.querySelector('[slot="legal"]');
    expect(legal.querySelector('a[href="/privacy"]')).not.toBeNull();
  });

  it('wraps the legal slot\'s plain <a> tags in a synthesized <ul role="list"><li> structure', async () => {
    const page = await newSpecPage({
      components: [AegovFooter, AegovFooterHighlights, AegovLink],
      html: `<aegov-footer>${GROUP}<div slot="legal"><a href="/privacy">Privacy policy</a><a href="/accessibility-statement">Accessibility statement</a></div></aegov-footer>`,
    });
    const legal = page.root.querySelector('[slot="legal"]');
    expect(legal.tagName).toBe('UL');
    expect(legal.className).toBe('aegov-footer__legal');
    expect(legal.getAttribute('role')).toBe('list');
    const items = legal.querySelectorAll('li');
    expect(items.length).toBe(2);
    expect(items[0].querySelector('a[href="/privacy"]')).not.toBeNull();
    expect(items[1].querySelector('a[href="/accessibility-statement"]')).not.toBeNull();
    // No leftover author-authored <div> wrapper.
    expect(page.root.querySelector('div[slot="legal"]')).toBeNull();
  });

  it('warns when a brand-slot link has no accessible name', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    await newSpecPage({
      components: [AegovFooter, AegovFooterHighlights, AegovLink],
      html: `<aegov-footer>${GROUP}<div slot="brand"><a href="#"><svg aria-hidden="true"></svg></a></div></aegov-footer>`,
    });
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('no accessible name'));
    warnSpy.mockRestore();
  });

  it('does not warn when a brand-slot link has an aria-label', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    await newSpecPage({
      components: [AegovFooter, AegovFooterHighlights, AegovLink],
      html: `<aegov-footer>${GROUP}<div slot="brand"><a href="#" aria-label="Facebook"><svg aria-hidden="true"></svg></a></div></aegov-footer>`,
    });
    expect(warnSpy).not.toHaveBeenCalledWith(expect.stringContaining('no accessible name'));
    warnSpy.mockRestore();
  });

  it('renders no "Download our app" block when neither app-store-href nor google-play-href is set', async () => {
    const page = await newSpecPage({
      components: [AegovFooter, AegovFooterHighlights, AegovLink],
      html: `<aegov-footer>${GROUP}</aegov-footer>`,
    });
    expect(page.root.querySelector('.aegov-footer__apps')).toBeNull();
  });

  it('renders only the App Store badge when just app-store-href is set', async () => {
    const page = await newSpecPage({
      components: [AegovFooter, AegovFooterHighlights, AegovLink],
      html: `<aegov-footer app-store-href="https://apps.apple.com/example">${GROUP}</aegov-footer>`,
    });
    const apps = page.root.querySelector('.aegov-footer__apps');
    expect(apps).not.toBeNull();
    const badges = apps.querySelectorAll('.aegov-footer__apps-badges a');
    expect(badges.length).toBe(1);
    expect(badges[0].getAttribute('href')).toBe('https://apps.apple.com/example');
    expect(badges[0].textContent).toContain('App Store');
  });

  it('renders both badges in the brand column when both hrefs are set', async () => {
    const page = await newSpecPage({
      components: [AegovFooter, AegovFooterHighlights, AegovLink],
      html: `<aegov-footer app-store-href="https://apps.apple.com/example" google-play-href="https://play.google.com/example">${GROUP}</aegov-footer>`,
    });
    const brand = page.root.querySelector('.aegov-footer__brand');
    const apps = brand.querySelector('.aegov-footer__apps');
    expect(apps).not.toBeNull();
    const badges = apps.querySelectorAll('.aegov-footer__apps-badges a');
    expect(badges.length).toBe(2);
    expect(badges[0].getAttribute('href')).toBe('https://apps.apple.com/example');
    expect(badges[1].getAttribute('href')).toBe('https://play.google.com/example');
    expect(badges[1].textContent).toContain('Google Play');
  });

  it('translates the "Download our app" badge labels under an RTL ancestor', async () => {
    const page = await newSpecPage({
      components: [AegovFooter, AegovFooterHighlights, AegovLink],
      html: `<div dir="rtl"><aegov-footer app-store-href="https://apps.apple.com/example" google-play-href="https://play.google.com/example">${GROUP}</aegov-footer></div>`,
    });
    const apps = page.body.querySelector('.aegov-footer__apps');
    expect(apps.querySelector('.aegov-footer__apps-title').textContent).toBe('حمل تطبيقنا');
    expect(apps.textContent).toContain('آب ستور');
    expect(apps.textContent).toContain('جوجل بلاي');
  });
});
