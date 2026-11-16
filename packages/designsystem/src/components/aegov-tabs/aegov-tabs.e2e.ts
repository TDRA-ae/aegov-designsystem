import { newE2EPage } from '@stencil/core/testing';

const baseHtml = `
  <aegov-tabs default-open="one">
    <aegov-tab slot="tabs" tab-id="one">One</aegov-tab>
    <aegov-tab slot="tabs" tab-id="two">Two</aegov-tab>
    <aegov-tab slot="tabs" tab-id="three">Three</aegov-tab>
    <aegov-tab-panel tab-id="one">Panel One</aegov-tab-panel>
    <aegov-tab-panel tab-id="two">Panel Two</aegov-tab-panel>
    <aegov-tab-panel tab-id="three">Panel Three</aegov-tab-panel>
  </aegov-tabs>
`;

describe('aegov-tabs (e2e)', () => {
  it('renders tablist and panels', async () => {
    const page = await newE2EPage();
    await page.setContent(baseHtml);
    const tablist = await page.find('aegov-tabs [role="tablist"]');
    expect(tablist).not.toBeNull();
    const panels = await page.findAll('aegov-tabs aegov-tab-panel');
    expect(panels.length).toBe(3);
  });

  it('clicking a tab activates it and emits aegovTabChange', async () => {
    const page = await newE2EPage();
    await page.setContent(baseHtml);
    const tabsEl = await page.find('aegov-tabs');
    const spy = await tabsEl.spyOnEvent('aegovTabChange');

    const secondTabBtn = await page.find('aegov-tab[tab-id="two"] button');
    await secondTabBtn.click();
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventTimes(1);
    expect(spy).toHaveReceivedEventDetail('two');
    expect(secondTabBtn.getAttribute('aria-selected')).toBe('true');
  });

  it('only the active panel is visible', async () => {
    const page = await newE2EPage();
    await page.setContent(baseHtml);
    const panels = await page.findAll('aegov-tabs aegov-tab-panel [role="tabpanel"]');
    expect(panels[0].getAttribute('hidden')).toBeNull();
    expect(panels[1].getAttribute('hidden')).not.toBeNull();
  });

  it('disabled tab does not emit on click', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-tabs default-open="a">
        <aegov-tab slot="tabs" tab-id="a">A</aegov-tab>
        <aegov-tab slot="tabs" tab-id="b" is-disabled="true">B</aegov-tab>
        <aegov-tab-panel tab-id="a">A</aegov-tab-panel>
        <aegov-tab-panel tab-id="b">B</aegov-tab-panel>
      </aegov-tabs>
    `);
    const tabsEl = await page.find('aegov-tabs');
    const spy = await tabsEl.spyOnEvent('aegovTabChange');
    const btnB = await page.find('aegov-tab[tab-id="b"] button');
    await btnB.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(0);
  });

  it('ArrowRight cycles to next enabled tab', async () => {
    const page = await newE2EPage();
    await page.setContent(baseHtml);
    const firstBtn = await page.find('aegov-tab[tab-id="one"] button');
    await firstBtn.focus();
    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();
    const secondBtn = await page.find('aegov-tab[tab-id="two"] button');
    expect(secondBtn.getAttribute('aria-selected')).toBe('true');
  });

  it('ArrowLeft cycles to previous enabled tab and wraps', async () => {
    const page = await newE2EPage();
    await page.setContent(baseHtml);
    const firstBtn = await page.find('aegov-tab[tab-id="one"] button');
    await firstBtn.focus();
    await page.keyboard.press('ArrowLeft');
    await page.waitForChanges();
    const lastBtn = await page.find('aegov-tab[tab-id="three"] button');
    expect(lastBtn.getAttribute('aria-selected')).toBe('true');
  });

  it('Home jumps to first tab', async () => {
    const page = await newE2EPage();
    await page.setContent(baseHtml);
    const lastBtn = await page.find('aegov-tab[tab-id="three"] button');
    await lastBtn.focus();
    // first activate it
    await lastBtn.click();
    await page.waitForChanges();
    await page.keyboard.press('Home');
    await page.waitForChanges();
    const firstBtn = await page.find('aegov-tab[tab-id="one"] button');
    expect(firstBtn.getAttribute('aria-selected')).toBe('true');
  });

  it('End jumps to last tab', async () => {
    const page = await newE2EPage();
    await page.setContent(baseHtml);
    const firstBtn = await page.find('aegov-tab[tab-id="one"] button');
    await firstBtn.focus();
    await page.keyboard.press('End');
    await page.waitForChanges();
    const lastBtn = await page.find('aegov-tab[tab-id="three"] button');
    expect(lastBtn.getAttribute('aria-selected')).toBe('true');
  });

  it('vertical orientation uses ArrowDown/ArrowUp', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-tabs orientation="vertical" default-open="one">
        <aegov-tab slot="tabs" tab-id="one">One</aegov-tab>
        <aegov-tab slot="tabs" tab-id="two">Two</aegov-tab>
        <aegov-tab-panel tab-id="one">A</aegov-tab-panel>
        <aegov-tab-panel tab-id="two">B</aegov-tab-panel>
      </aegov-tabs>
    `);
    const firstBtn = await page.find('aegov-tab[tab-id="one"] button');
    await firstBtn.focus();
    await page.keyboard.press('ArrowDown');
    await page.waitForChanges();
    const secondBtn = await page.find('aegov-tab[tab-id="two"] button');
    expect(secondBtn.getAttribute('aria-selected')).toBe('true');
  });

  it('applies variant and orientation classes', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-tabs variant="segmented" orientation="vertical"></aegov-tabs>`);
    const root = await page.find('aegov-tabs .aegov-tabs');
    expect(root).toHaveClass('tabs--segmented');
    expect(root).toHaveClass('tabs--vertical');
  });

  describe('scroll fades (is-scrollable)', () => {
    const scrollableHtml = (wrapperStyle = '') => `
      <div style="width: 160px; ${wrapperStyle}">
        <aegov-tabs is-scrollable="true" default-open="t1">
          ${[1, 2, 3, 4, 5, 6].map(i => `<aegov-tab slot="tabs" tab-id="t${i}">Long tab label ${i}</aegov-tab>`).join('')}
          ${[1, 2, 3, 4, 5, 6].map(i => `<aegov-tab-panel tab-id="t${i}">P${i}</aegov-tab-panel>`).join('')}
        </aegov-tabs>
      </div>
    `;

    const endFade = (page: any) =>
      page.$eval('aegov-tabs .tabs__list-wrapper--scrollable', (el: HTMLElement) => {
        const cs = getComputedStyle(el, '::after');
        return { image: cs.backgroundImage, opacity: cs.opacity, hasEndFade: el.classList.contains('has-end-fade') };
      });

    /** First colour stop of a computed linear-gradient string. */
    const firstStop = (image: string) => {
      const m = image.match(/linear-gradient\((?:to [a-z ]+,\s*)?((?:rgba?|oklch|oklab|color)\([^)]*\))/);
      return m ? m[1] : null;
    };

    it('light mode: the end fade is visible and painted with a non-transparent colour', async () => {
      const page = await newE2EPage();
      await page.setContent(scrollableHtml());
      await page.waitForChanges();
      // The fade opacity transitions over 200ms once has-end-fade is applied.
      await page.waitForFunction(() => {
        const el = document.querySelector('aegov-tabs .tabs__list-wrapper--scrollable');
        return !!el && getComputedStyle(el, '::after').opacity === '1';
      }, { timeout: 2000 }).catch(() => undefined);
      const fade = await endFade(page);
      expect(fade.hasEndFade).toBe(true);
      expect(fade.opacity).toBe('1');
      // An undefined --tab-fade-color used to invalidate the whole declaration,
      // leaving `none` here and no visible fade.
      expect(fade.image).not.toBe('none');
      const stop = firstStop(fade.image);
      expect(stop).not.toBeNull();
      expect(stop).not.toBe('rgba(0, 0, 0, 0)');
    });

    it('dark mode: the fade uses a different (dark) colour', async () => {
      const page = await newE2EPage();
      await page.setContent(scrollableHtml());
      await page.waitForChanges();
      const light = firstStop((await endFade(page)).image);
      await page.evaluate(() => document.documentElement.classList.add('dark'));
      await page.waitForChanges();
      const dark = firstStop((await endFade(page)).image);
      expect(dark).not.toBeNull();
      expect(dark).not.toBe('rgba(0, 0, 0, 0)');
      expect(dark).not.toBe(light);
    });

    it('consumers can override --tab-fade-color on an ancestor', async () => {
      const page = await newE2EPage();
      await page.setContent(scrollableHtml('--tab-fade-color: rgb(255, 0, 0);'));
      await page.waitForChanges();
      expect(firstStop((await endFade(page)).image)).toBe('rgb(255, 0, 0)');
    });
  });

  // A11Y-FINAL-22: in a scrollable tab list the arrow keys bring the new tab fully into view.
  describe('scrollable: keyboard scrolls the focused tab into view', () => {
    const markup = (dir: string) => `<div dir="${dir}" style="width:300px">
      <aegov-tabs is-scrollable="true">
        <aegov-tab slot="tabs" tab-id="a">Design and research</aegov-tab>
        <aegov-tab slot="tabs" tab-id="b">Development and DevOps</aegov-tab>
        <aegov-tab slot="tabs" tab-id="c">Content and communication</aegov-tab>
        <aegov-tab slot="tabs" tab-id="d">Quality assurance</aegov-tab>
        <aegov-tab-panel tab-id="a">A</aegov-tab-panel><aegov-tab-panel tab-id="b">B</aegov-tab-panel>
        <aegov-tab-panel tab-id="c">C</aegov-tab-panel><aegov-tab-panel tab-id="d">D</aegov-tab-panel>
      </aegov-tabs></div>`;
    const inView = (page) => page.evaluate(() => {
      const btn = document.activeElement as HTMLElement;
      const list = btn.closest('aegov-tabs').querySelector('[role="tablist"]') ?? (btn.closest('aegov-tabs') as HTMLElement).shadowRoot.querySelector('[role="tablist"]');
      const r = btn.getBoundingClientRect(), l = list.getBoundingClientRect();
      return { tab: btn.textContent.trim(), fullyIn: r.left >= l.left - 1 && r.right <= l.right + 1 };
    });

    for (const [dir, key] of [['ltr', 'ArrowRight'], ['rtl', 'ArrowLeft']]) {
      it(`${dir}: ${key} and End`, async () => {
        const page = await newE2EPage();
        await page.setViewport({ width: 340, height: 600 });
        await page.setContent(markup(dir));
        await page.waitForChanges();
        await page.$eval('aegov-tab button', (b: HTMLElement) => b.focus());
        for (const k of [key, key, 'End']) {
          await page.keyboard.press(k);
          await page.waitForChanges();
          await new Promise(r => setTimeout(r, 700));
          const v = await inView(page);
          expect(v.fullyIn).toBe(true);
        }
      });
    }
  });
});
