import { newE2EPage } from '@stencil/core/testing';

/**
 * aegov-modal and aegov-drawer must share one overlay palette:
 * aeblack-900 at 30 / 50 / 70 % (light / base / dark), and in dark mode
 * aeblack-950 at 50 / 70 / 85 %. The modal previously used slate-900,
 * which is outside the AEGOV palette.
 */

type Opacity = 'light' | 'base' | 'dark';
const OPACITIES: Opacity[] = ['light', 'base', 'dark'];
const EXPECTED_ALPHA: Record<'light' | 'darkMode', Record<Opacity, number>> = {
  light: { light: 0.3, base: 0.5, dark: 0.7 },
  darkMode: { light: 0.5, base: 0.7, dark: 0.85 },
};

async function backdropColours(isDarkMode: boolean, opacity: Opacity) {
  const page = await newE2EPage();
  await page.setContent(`
    <aegov-modal is-open="true" overlay-opacity="${opacity}"><p>Modal</p></aegov-modal>
    <aegov-drawer is-open="true" overlay-opacity="${opacity}" animation="none"><p>Drawer</p></aegov-drawer>
  `);
  if (isDarkMode) {
    await page.evaluate(() => document.documentElement.classList.add('dark'));
  }
  await page.waitForChanges();
  return page.evaluate(() => {
    const bg = (host: string, sel: string) => {
      const el = document.querySelector(host)!.shadowRoot!.querySelector(sel) as HTMLElement;
      return getComputedStyle(el).backgroundColor;
    };
    return {
      modal: bg('aegov-modal', '.aegov-modal-backdrop'),
      drawer: bg('aegov-drawer', '.aegov-drawer-backdrop'),
    };
  });
}

/** Alpha channel of any computed colour string (rgb/rgba/oklch/color()). */
function alphaOf(colour: string): number {
  const m = colour.match(/\/\s*([\d.]+)\s*\)$/) || colour.match(/,\s*([\d.]+)\s*\)$/);
  return m ? parseFloat(m[1]) : 1;
}

describe('modal / drawer overlay parity (e2e)', () => {
  for (const opacity of OPACITIES) {
    it(`light mode: modal and drawer backdrops are identical at overlay-opacity="${opacity}"`, async () => {
      const { modal, drawer } = await backdropColours(false, opacity);
      expect(modal).toBe(drawer);
      expect(alphaOf(modal)).toBeCloseTo(EXPECTED_ALPHA.light[opacity], 2);
    });

    it(`dark mode: modal and drawer backdrops are identical at overlay-opacity="${opacity}"`, async () => {
      const { modal, drawer } = await backdropColours(true, opacity);
      expect(modal).toBe(drawer);
      expect(alphaOf(modal)).toBeCloseTo(EXPECTED_ALPHA.darkMode[opacity], 2);
    });
  }

  // Pin the actual token too, so a regression that changes BOTH components
  // (e.g. both back to slate) still fails.
  for (const host of ['aegov-modal', 'aegov-drawer']) {
    it(`${host} base backdrop is aeblack-900 at 50%`, async () => {
      const page = await newE2EPage();
      await page.setContent(`<${host} is-open="true" overlay-opacity="base" animation="none"><p>x</p></${host}>`);
      await page.waitForChanges();
      const { actual, expected } = await page.evaluate((tag: string) => {
        const root = document.querySelector(tag)!.shadowRoot!;
        const backdrop = root.querySelector('[class*="-backdrop--base"]') as HTMLElement;
        // Probe in the same shadow root so it resolves the same theme variables.
        // Tailwind emits var(--color-aeblack-900, <value>); the fallback is the
        // aeblack-900 value from src/styles/tailwind.css.
        const probe = document.createElement('div');
        probe.style.backgroundColor =
          'color-mix(in oklab, var(--color-aeblack-900, oklch(22.6% 0.0083 264.39)) 50%, transparent)';
        root.appendChild(probe);
        return {
          actual: getComputedStyle(backdrop).backgroundColor,
          expected: getComputedStyle(probe).backgroundColor,
        };
      }, host);
      expect(expected).not.toBe('rgba(0, 0, 0, 0)');
      expect(actual).toBe(expected);
    });
  }
});
