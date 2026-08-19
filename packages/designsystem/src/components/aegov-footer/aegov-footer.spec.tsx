import { newSpecPage } from '@stencil/core/testing';
import { AegovFooter } from './aegov-footer';

const GROUP = `
  <div class="aegov-footer__group">
    <h2>The Ministry</h2>
    <ul role="list"><li><a href="/about">About the ministry</a></li></ul>
  </div>
`;

describe('aegov-footer', () => {
  it('renders a top-level footer with a single nav landmark wrapping the groups', async () => {
    const page = await newSpecPage({
      components: [AegovFooter],
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
      components: [AegovFooter],
      html: `<div dir="rtl"><aegov-footer>${GROUP}</aegov-footer></div>`,
    });
    const nav = page.body.querySelector('nav');
    expect(nav.getAttribute('aria-label')).toBe('التنقل في التذييل');
  });

  it('leaves the title as plain, untouched markup — no trigger, no button, no ARIA — when non-interactive (matchMedia unavailable in jsdom degrades desktop-safe)', async () => {
    const page = await newSpecPage({
      components: [AegovFooter],
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
      components: [AegovFooter],
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
      components: [AegovFooter],
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
      components: [AegovFooter],
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
      components: [AegovFooter],
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

  it('renders the hardcoded Tawasul block by default with tel/whatsapp links, and no fixed toll-free line', async () => {
    const page = await newSpecPage({
      components: [AegovFooter],
      html: `<aegov-footer>${GROUP}</aegov-footer>`,
    });
    const tawasul = page.root.querySelector('.aegov-footer__tawasul');
    expect(tawasul).not.toBeNull();
    expect(tawasul.querySelector('a[href="tel:171"]')).not.toBeNull();
    expect(tawasul.querySelector('a[href="https://wa.me/97147771777"]')).not.toBeNull();
    expect(tawasul.querySelector('.aegov-footer__tawasul-tollfree')).toBeNull();
  });

  it('makes the entity toll-free number a tappable tel: link, sanitizing formatting characters', async () => {
    const page = await newSpecPage({
      components: [AegovFooter],
      html: `<aegov-footer entity-toll-free="600 522222">${GROUP}</aegov-footer>`,
    });
    const link = page.root.querySelector('.aegov-footer__entity-tollfree-link');
    expect(link).not.toBeNull();
    expect(link.getAttribute('href')).toBe('tel:600522222');
  });

  it('does not render an entity toll-free line when entityTollFree is not provided', async () => {
    const page = await newSpecPage({
      components: [AegovFooter],
      html: `<aegov-footer>${GROUP}</aegov-footer>`,
    });
    expect(page.root.querySelector('.aegov-footer__entity-tollfree')).toBeNull();
  });

  it('renders the entity toll-free number below the Tawasul block when provided', async () => {
    const page = await newSpecPage({
      components: [AegovFooter],
      html: `<aegov-footer entity-toll-free="600 522222">${GROUP}</aegov-footer>`,
    });
    const tawasul = page.root.querySelector('.aegov-footer__tawasul');
    const entityLine = page.root.querySelector('.aegov-footer__entity-tollfree');
    expect(entityLine).not.toBeNull();
    expect(entityLine.textContent).toContain('600 522222');
    // Rendered inside/after the Tawasul container, not standalone.
    expect(tawasul.contains(entityLine)).toBe(true);
  });

  it('defaults the entity toll-free label to the same bilingual "Toll free" text as Tawasul\'s own line', async () => {
    const page = await newSpecPage({
      components: [AegovFooter],
      html: `<aegov-footer entity-toll-free="600 522222">${GROUP}</aegov-footer>`,
    });
    const label = page.root.querySelector('.aegov-footer__entity-tollfree-label');
    expect(label.textContent.trim()).toBe('Toll free:');
  });

  it('overrides the entity toll-free label with entityTollFreeLabel', async () => {
    const page = await newSpecPage({
      components: [AegovFooter],
      html: `<aegov-footer entity-toll-free="600 522222" entity-toll-free-label="Hotline">${GROUP}</aegov-footer>`,
    });
    const label = page.root.querySelector('.aegov-footer__entity-tollfree-label');
    expect(label.textContent.trim()).toBe('Hotline:');
  });

  it('always renders the Tawasul block — it is required, not optional, and has no prop to hide it', async () => {
    const page = await newSpecPage({
      components: [AegovFooter],
      html: `<aegov-footer>${GROUP}</aegov-footer>`,
    });
    expect(page.root.querySelector('.aegov-footer__tawasul')).not.toBeNull();
    expect('isTawasul' in page.rootInstance).toBe(false);
  });

  it('always renders the fixed Tawasul logo — no slot to override it with', async () => {
    const page = await newSpecPage({
      components: [AegovFooter],
      html: `<aegov-footer>${GROUP}<img slot="tawasul-logo" src="tawasul.svg" alt="Custom" /></aegov-footer>`,
    });
    const mark = page.root.querySelector('.aegov-footer__tawasul-mark-svg');
    expect(mark).not.toBeNull();
    expect(mark.getAttribute('aria-hidden')).toBe('true');
    expect(mark.querySelector('svg')).not.toBeNull();
    // "Tawasul" is still announced to AT via a dedicated label, since the
    // logo graphic itself is aria-hidden.
    expect(page.root.querySelector('.aegov-footer__tawasul-mark .sr-only').textContent).toBe('Tawasul');
    // An img with slot="tawasul-logo" is just unslotted, inert light DOM now —
    // there is no slot left for it to project into.
    expect(page.root.querySelector('.aegov-footer__tawasul-logo img')).toBeNull();
    expect('hasTawasulLogoSlot' in page.rootInstance).toBe(false);
  });

  it('defaults navVariant to collapsible and falls back on an invalid value', async () => {
    const page = await newSpecPage({
      components: [AegovFooter],
      html: `<aegov-footer nav-variant="bogus">${GROUP}</aegov-footer>`,
    });
    expect(page.root.querySelector('nav').className).toContain('footer--collapsible');
  });

  it('warns when an actions-slot link has no accessible name', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    await newSpecPage({
      components: [AegovFooter],
      html: `<aegov-footer>${GROUP}<a slot="actions" href="#"><svg aria-hidden="true"></svg></a></aegov-footer>`,
    });
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('no accessible name'));
    warnSpy.mockRestore();
  });

  it('does not warn when an actions-slot link has an aria-label', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    await newSpecPage({
      components: [AegovFooter],
      html: `<aegov-footer>${GROUP}<a slot="actions" href="#" aria-label="Facebook"><svg aria-hidden="true"></svg></a></aegov-footer>`,
    });
    expect(warnSpy).not.toHaveBeenCalledWith(expect.stringContaining('no accessible name'));
    warnSpy.mockRestore();
  });
});
