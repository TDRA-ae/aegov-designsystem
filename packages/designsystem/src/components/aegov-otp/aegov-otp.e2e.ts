import { newE2EPage } from '@stencil/core/testing';
import { themeColours } from '../../utils/e2e-theme';

describe('aegov-otp (e2e)', () => {
  it('renders the cells based on length', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp length="4"></aegov-otp>');
    const cells = await page.findAll('aegov-otp >>> .otp__cell');
    expect(cells.length).toBe(4);
  });

  it('typing into a cell auto-advances focus to the next cell', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp length="4"></aegov-otp>');
    const first = await page.find('aegov-otp >>> .otp__cell:nth-of-type(1)');
    await first.focus();
    await page.keyboard.type('1');
    await page.waitForChanges();
    const focusedClass = await page.evaluate(() =>
      // focus sits inside the shadow root; document.activeElement is the host
      (document.activeElement!.shadowRoot!.activeElement as HTMLElement).getAttribute('aria-label'),
    );
    expect(focusedClass).toBe('Character 2 of 4');
  });

  it('rejects non-numeric chars in numeric mode', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp length="4"></aegov-otp>');
    const first = await page.find('aegov-otp >>> .otp__cell:nth-of-type(1)');
    await first.focus();
    await page.keyboard.type('a');
    await page.waitForChanges();
    expect(await first.getProperty('value')).toBe('');
  });

  it('accepts letters when is-alphanumeric is set', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp is-alphanumeric length="4"></aegov-otp>');
    const first = await page.find('aegov-otp >>> .otp__cell:nth-of-type(1)');
    await first.focus();
    await page.keyboard.type('A');
    await page.waitForChanges();
    expect(await first.getProperty('value')).toBe('A');
  });

  it('Backspace on empty cell focuses previous cell and clears it', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp length="4"></aegov-otp>');
    const first = await page.find('aegov-otp >>> .otp__cell:nth-of-type(1)');
    await first.focus();
    await page.keyboard.type('12');
    await page.waitForChanges();
    // Now focus is on cell 3 (empty); backspace goes back to cell 2 and clears it
    await page.keyboard.press('Backspace');
    await page.waitForChanges();
    const cell2 = await page.find('aegov-otp >>> .otp__cell:nth-of-type(2)');
    expect(await cell2.getProperty('value')).toBe('');
  });

  it('emits aegovOtpChange on each character typed', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp length="4"></aegov-otp>');
    const host = await page.find('aegov-otp');
    const spy = await host.spyOnEvent('aegovOtpChange');
    const first = await page.find('aegov-otp >>> .otp__cell:nth-of-type(1)');
    await first.focus();
    await page.keyboard.type('12');
    await page.waitForChanges();
    expect(spy.events.length).toBeGreaterThanOrEqual(2);
  });

  it('emits aegovOtpComplete when all cells filled', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp length="4"></aegov-otp>');
    const host = await page.find('aegov-otp');
    const spy = await host.spyOnEvent('aegovOtpComplete');
    const first = await page.find('aegov-otp >>> .otp__cell:nth-of-type(1)');
    await first.focus();
    await page.keyboard.type('1234');
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
    expect(spy.lastEvent.detail).toEqual({ value: '1234' });
  });

  it('emits aegovValidate with patternMismatch when filled value fails pattern (replaces aegovOtpInvalid per §6.6)', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp length="4" pattern="^9999$"></aegov-otp>');
    const host = await page.find('aegov-otp');
    const validateSpy = await host.spyOnEvent('aegovValidate');
    const completeSpy = await host.spyOnEvent('aegovOtpComplete');
    const first = await page.find('aegov-otp >>> .otp__cell:nth-of-type(1)');
    await first.focus();
    await page.keyboard.type('1234');
    await page.waitForChanges();
    expect(completeSpy).toHaveReceivedEventTimes(0);
    // The change-trigger validate event reports patternMismatch
    const fired = validateSpy.events.filter((e: any) => e.detail?.validity?.patternMismatch === true);
    expect(fired.length).toBeGreaterThan(0);
  });

  it('ArrowLeft / ArrowRight move focus between cells', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp length="4"></aegov-otp>');
    const second = await page.find('aegov-otp >>> .otp__cell:nth-of-type(2)');
    await second.focus();
    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();
    let label = await page.evaluate(() =>
      // focus sits inside the shadow root; document.activeElement is the host
      (document.activeElement!.shadowRoot!.activeElement as HTMLElement).getAttribute('aria-label'),
    );
    expect(label).toBe('Character 3 of 4');

    await page.keyboard.press('ArrowLeft');
    await page.waitForChanges();
    label = await page.evaluate(() =>
      // focus sits inside the shadow root; document.activeElement is the host
      (document.activeElement!.shadowRoot!.activeElement as HTMLElement).getAttribute('aria-label'),
    );
    expect(label).toBe('Character 2 of 4');
  });

  it('clear() method empties all cells and updates value', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp length="4" value="1234"></aegov-otp>');
    const host = await page.find('aegov-otp');
    await host.callMethod('clear');
    await page.waitForChanges();
    const cells = await page.findAll('aegov-otp >>> .otp__cell');
    for (const c of cells) {
      expect(await c.getProperty('value')).toBe('');
    }
    expect(await host.getProperty('value')).toBe('');
  });

  it('disabled cells are not interactable', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp is-disabled length="4"></aegov-otp>');
    const first = await page.find('aegov-otp >>> .otp__cell:nth-of-type(1)');
    expect(await first.getProperty('disabled')).toBe(true);
  });
});

describe('aegov-otp (e2e) group blur', () => {
  it('moving between cells is not a blur; leaving the group is', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp length="4"></aegov-otp><button id="out">out</button>');
    const host = await page.find('aegov-otp');
    const spy = await host.spyOnEvent('aegovValidate');
    const cells = await page.findAll('aegov-otp >>> input');
    await cells[0].focus();
    await cells[1].focus();
    await cells[2].focus();
    await page.waitForChanges();
    expect(spy.events.filter((e: any) => e.detail.trigger === 'blur').length).toBe(0);
    await page.focus('#out');
    await page.waitForChanges();
    expect(spy.events.filter((e: any) => e.detail.trigger === 'blur').length).toBe(1);
  });
});

describe('aegov-otp (e2e) validation trigger', () => {
  it('reports partial entry as input and a complete code as change', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp length="3"></aegov-otp>');
    const host = await page.find('aegov-otp');
    const spy = await host.spyOnEvent('aegovValidate');
    const cells = await page.findAll('aegov-otp >>> input');
    await cells[0].focus();
    await page.keyboard.type('123');
    await page.waitForChanges();
    expect(spy.events.map((e: any) => [e.detail.trigger, e.detail.value])).toEqual([
      ['input', '1'],
      ['input', '12'],
      ['change', '123'],
    ]);
    await page.keyboard.press('Backspace');
    await page.waitForChanges();
    expect(spy.lastEvent.detail.trigger).toBe('input');
    expect(spy.lastEvent.detail.value).toBe('12');
  });

  // The individual-cell variant border is (0,4,0); invalid and disabled used
  // to lose to it and keep the variant colour.
  it('individual cells take the invalid and disabled borders, like the continuous row', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-otp id="ii" appearance="individual" is-invalid="true"></aegov-otp>
      <aegov-otp id="ci" appearance="continuous" is-invalid="true"></aegov-otp>
      <aegov-otp id="id" appearance="individual" is-disabled="true"></aegov-otp>
      <aegov-otp id="cd" appearance="continuous" is-disabled="true"></aegov-otp>
      <aegov-otp id="iv" appearance="individual"></aegov-otp>
    `);
    await page.waitForChanges();
    const border = (id: string, selector: string) => page.$eval(`#${id}`, (el: any, selector: string) =>
      getComputedStyle(el.shadowRoot.querySelector(selector)).borderTopColor, selector);
    const variantBorder = await border('iv', '.otp__cell');
    expect(await border('ii', '.otp__cell')).toBe(await border('ci', '.otp__wrapper--continuous'));
    expect(await border('ii', '.otp__cell')).not.toBe(variantBorder);
    expect(await border('id', '.otp__cell')).toBe(await border('cd', '.otp__wrapper--continuous'));
    expect(await border('id', '.otp__cell')).not.toBe(variantBorder);
    // Disabled digits keep the variant text colour (Figma).
    const text = (id: string) => page.$eval(`#${id}`, (el: any) => getComputedStyle(el.shadowRoot.querySelector('.otp__cell')).color);
    expect(await text('id')).toBe(await text('iv'));
  });
});

describe('aegov-otp (e2e) focused cell', () => {
  // DS-A11Y-otp-05 (WCAG 2.4.7): in the continuous appearance the wrapper ring
  // only says the field has focus; the focused cell itself must be marked too.
  it('continuous: marks the focused cell with an inset bar, not the others', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp aria-label="Code" length="4"></aegov-otp>');
    await page.addStyleTag({ content: themeColours() });
    const first = await page.find('aegov-otp >>> .otp__cell:nth-of-type(1)');
    await first.focus();
    await page.keyboard.type('1');
    await page.waitForChanges();
    // cells animate box-shadow for 150 ms
    await new Promise(resolve => setTimeout(resolve, 400));
    const shadows = await page.$eval('aegov-otp', (el: any) =>
      [...el.shadowRoot.querySelectorAll('.otp__cell')].map((cell: HTMLElement) => ({
        focused: cell === el.shadowRoot.activeElement,
        inset: getComputedStyle(cell).boxShadow.includes('inset'),
      })),
    );
    expect(shadows.filter(c => c.inset)).toEqual([{ focused: true, inset: true }]);
    expect(shadows[1]).toEqual({ focused: true, inset: true });
  });

  it('individual: unchanged, the focused cell keeps its own border ring and no inset bar', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp aria-label="Code" length="4" appearance="individual"></aegov-otp>');
    const first = await page.find('aegov-otp >>> .otp__cell:nth-of-type(1)');
    await first.focus();
    await page.waitForChanges();
    const inset = await page.$eval('aegov-otp', (el: any) => getComputedStyle(el.shadowRoot.activeElement).boxShadow.includes('inset'));
    expect(inset).toBe(false);
  });
});
