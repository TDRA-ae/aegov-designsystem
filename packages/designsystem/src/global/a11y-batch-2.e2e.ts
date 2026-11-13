import { newE2EPage } from '@stencil/core/testing';

/**
 * Regression tests for the accessibility fixes made together in batch 2
 * (DS-A11Y-* ids from the accessibility QA tracker).
 */

describe('button', () => {
  it('button-04: an icon-only button without a name warns; a named one hides its SVG', async () => {
    const page = await newE2EPage();
    const warnings: string[] = [];
    page.on('console', message => { if (message.type() === 'warn') warnings.push(message.text()); });
    await page.setContent(`
      <aegov-button id="nameless" is-icon="true"><svg viewBox="0 0 24 24"><path d="M3 6h18v2H3z"/></svg></aegov-button>
      <aegov-button id="named" is-icon="true" aria-label="Menu"><svg viewBox="0 0 24 24"><path d="M3 6h18v2H3z"/></svg></aegov-button>`);
    await page.waitForChanges();
    expect(warnings.some(text => text.includes('icon-only button (is-icon) needs an accessible name'))).toBe(true);
    expect(await page.$eval('#named svg', el => el.getAttribute('aria-hidden'))).toBe('true');
  });

  it('button-08: is-disabled-focusable keeps the button focusable, aria-disabled and inert', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-button is-disabled="true" is-disabled-focusable="true">Submit</aegov-button>');
    const host = await page.find('aegov-button');
    const clicks = await host.spyOnEvent('aegovButtonClick');
    const state = await page.$eval('aegov-button', (el: any) => {
      const button = el.shadowRoot.querySelector('button');
      return { disabled: button.disabled, ariaDisabled: button.getAttribute('aria-disabled') };
    });
    expect(state).toEqual({ disabled: false, ariaDisabled: 'true' });
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement?.tagName)).toBe('AEGOV-BUTTON');
    expect(clicks).not.toHaveReceivedEvent();
  });

  it('button-08: plain is-disabled is unchanged (native disabled)', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-button is-disabled="true">Submit</aegov-button>');
    expect(await page.$eval('aegov-button', (el: any) => el.shadowRoot.querySelector('button').disabled)).toBe(true);
  });
});

describe('datepicker', () => {
  it('datepicker-15: a preset is announced as a range', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker aria-label="Period" appearance="range" presets="last7Days"></aegov-datepicker>');
    const host = await page.find('aegov-datepicker');
    await host.callMethod('open');
    await page.waitForChanges();
    await page.evaluate(() => (document.querySelector('.aegov-datepicker-portal .datepicker__preset-btn') as HTMLElement).click());
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    const live = await page.$eval('aegov-datepicker', (el: any) => Array.from(el.shadowRoot.querySelectorAll('[aria-live]')).map((n: any) => n.textContent).join(''));
    expect(live).toMatch(/\d{4} to .+\d{4}$/);
  });

  it('datepicker-16: moving within the month does not repeat the day in the live region', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker aria-label="Date" value="2024-06-12"></aegov-datepicker>');
    const host = await page.find('aegov-datepicker');
    await host.callMethod('open');
    await page.waitForChanges();
    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(await page.$eval('.datepicker__live-region', el => el.textContent)).toBe('');
  });

  it('datepicker-17: the field has no raw format-token description', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker aria-label="Date" format="DD MMM YYYY"></aegov-datepicker>');
    const describedBy = await page.$eval('aegov-datepicker', (el: any) => el.shadowRoot.querySelector('input').getAttribute('aria-describedby'));
    expect(describedBy ?? '').not.toContain('format-hint');
  });

  it('datepicker-18: unavailable days are struck through', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker aria-label="Date" value="2024-06-12" blackout="2024-06-14"></aegov-datepicker>');
    const host = await page.find('aegov-datepicker');
    await host.callMethod('open');
    await page.waitForChanges();
    const decoration = await page.$eval('.datepicker__day[data-date="2024-06-14"]', el => getComputedStyle(el).textDecorationLine);
    expect(decoration).toBe('line-through');
  });
});

describe('fileupload', () => {
  const addFiles = (page: any, names: string[]) =>
    page.$eval('aegov-fileupload', (el: any, list: string[]) => {
      const input = el.shadowRoot.querySelector('input[type=file]') as HTMLInputElement;
      const transfer = new DataTransfer();
      list.forEach(name => transfer.items.add(new File(['x'], name, { type: 'application/pdf', lastModified: 1700000000000 })));
      input.files = transfer.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }, names);

  it('fileupload-10: long names wrap instead of being cut with an ellipsis', async () => {
    const page = await newE2EPage();
    await page.setContent('<div style="width:300px"><aegov-fileupload appearance="dropzone" label="Docs" is-multiple="true"></aegov-fileupload></div>');
    await addFiles(page, ['Emirates-ID-front-and-back-scan-2026-final-version.pdf']);
    await page.waitForChanges();
    const name = await page.$eval('aegov-fileupload', (el: any) => {
      const n = el.shadowRoot.querySelector('.fileupload__file-name');
      return { clipped: n.scrollWidth > n.clientWidth, overflow: getComputedStyle(n).textOverflow };
    });
    expect(name.clipped).toBe(false);
    expect(name.overflow).not.toBe('ellipsis');
  });

  it('fileupload-14: picking the same file again replaces it instead of adding it twice', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload appearance="button" label="Passport" is-multiple="true"></aegov-fileupload>');
    await addFiles(page, ['passport.pdf']);
    await page.waitForChanges();
    await addFiles(page, ['passport.pdf']);
    await page.waitForChanges();
    expect(await page.$eval('aegov-fileupload', (el: any) => el.shadowRoot.querySelectorAll('.fileupload__file-item').length)).toBe(1);
  });

  it('fileupload-11: the hint stays visible while an error shows', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-fileupload label="Docs" hint="PDF only" is-invalid="true" error-message="Wrong type"></aegov-fileupload>');
    expect(await page.$eval('aegov-fileupload', (el: any) => !!el.shadowRoot.querySelector('.fileupload__hint'))).toBe(true);
  });
});

describe('header-banner', () => {
  it('header-banner-01: the web address uses the body font and wraps', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-header-banner entity-name="Authority" entity-domain="https://designsystem.gov.ae"></aegov-header-banner>');
    await page.waitForChanges();
    const style = await page.$eval('aegov-header-banner', (el: any) => {
      const domain = (el.shadowRoot || el).querySelector('.header__entity-domain');
      return domain ? { font: getComputedStyle(domain).fontFamily, wrap: getComputedStyle(domain).overflowWrap } : null;
    });
    expect(style).not.toBeNull();
    expect(style!.font).not.toMatch(/mono/i);
    expect(style!.wrap).toBe('anywhere');
  });
});

describe('otp', () => {
  it('otp-10: Home/End go to the first/last cell; a whole code inserted into a later cell fills from the start', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp aria-label="Code" length="4"></aegov-otp>');
    await page.$eval('aegov-otp', (el: any) => el.shadowRoot.querySelectorAll('input')[1].focus());
    await page.keyboard.press('End');
    expect(await page.$eval('aegov-otp', (el: any) => el.shadowRoot.activeElement.getAttribute('aria-label'))).toBe('Character 4 of 4');
    await page.keyboard.press('Home');
    expect(await page.$eval('aegov-otp', (el: any) => el.shadowRoot.activeElement.getAttribute('aria-label'))).toBe('Character 1 of 4');
    await page.$eval('aegov-otp', (el: any) => el.shadowRoot.querySelectorAll('input')[2].focus());
    await page.keyboard.sendCharacter('5678');
    await page.waitForChanges();
    expect(await page.$eval('aegov-otp', (el: any) => Array.from(el.shadowRoot.querySelectorAll('input')).map((i: any) => i.value).join(''))).toBe('5678');
  });
});

describe('range', () => {
  it('range-05: each thumb reports the limit it can really reach', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range aria-label="Price" mode="range" value="20,60"></aegov-range>');
    const limits = await page.$eval('aegov-range', (el: any) => Array.from(el.shadowRoot.querySelectorAll('input')).map((i: any) => [i.getAttribute('aria-valuemin'), i.getAttribute('aria-valuemax')]));
    const [low, high] = await page.$eval('aegov-range', (el: any) => [el.valueLow, el.valueHigh]);
    expect(limits).toEqual([['0', String(high - 1)], [String(low + 1), '100']]);
  });

  it('range-06: the visual numbers are hidden from assistive technology', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-range aria-label="Volume" value="30" display="full"></aegov-range>');
    const hidden = await page.$eval('aegov-range', (el: any) =>
      Array.from(el.shadowRoot.querySelectorAll('.range__tooltip, .range__thumb-value, .range__label-min, .range__label-max')).map((n: any) => n.getAttribute('aria-hidden')));
    expect(hidden.length).toBeGreaterThan(0);
    expect(hidden.every(value => value === 'true')).toBe(true);
  });
});
