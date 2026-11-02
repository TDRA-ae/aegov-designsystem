import { newE2EPage } from '@stencil/core/testing';

describe('aegov-accordion-item (e2e)', () => {
  it('scales the toggle icon alongside the heading text at each size (regression test for issue #15)', async () => {
    const widths: Record<string, number> = {};
    for (const size of ['sm', 'base', 'lg']) {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion size="${size}">
          <aegov-accordion-item heading="Title">Body</aegov-accordion-item>
        </aegov-accordion>
      `);
      // The accordion hands its size to the item after the first render, and the icon
      // animates to its new size (transition-all), so measure only once the size class is
      // on the item and the icon has finished animating.
      await page.waitForFunction((size: string) => {
        const icon = document.querySelector(`aegov-accordion-item .accordion-item--${size} .accordion-item__icon`);
        return icon && icon.getAnimations().length === 0;
      }, {}, size);
      widths[size] = await page.evaluate(() => {
        const icon = document.querySelector('aegov-accordion-item .accordion-item__icon');
        return icon.getBoundingClientRect().width;
      });
    }
    // sm (size-5 = 20px) < base (size-6 = 24px) < lg (size-6.5 = 26px) — previously all three were
    // identical (24px) because the size-variant CSS rules never targeted .accordion-item__icon.
    expect(widths.sm).toBeLessThan(widths.base);
    expect(widths.base).toBeLessThan(widths.lg);
  });

  it('renders header with aria attributes linking to content', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-accordion>
        <aegov-accordion-item heading="Title">Body</aegov-accordion-item>
      </aegov-accordion>
    `);
    const btn = await page.find('aegov-accordion-item button.accordion-item__header');
    const region = await page.find('aegov-accordion-item [role="region"]');
    expect(btn).not.toBeNull();
    expect(region).not.toBeNull();
    expect(btn.getAttribute('aria-controls')).toEqual(region.id);
  });

  it('emits aegovAccordionItemToggle on click', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-accordion>
        <aegov-accordion-item heading="A">Body</aegov-accordion-item>
      </aegov-accordion>
    `);
    const item = await page.find('aegov-accordion-item');
    const spy = await item.spyOnEvent('aegovAccordionItemToggle');
    const btn = await page.find('aegov-accordion-item button.accordion-item__header');
    await btn.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
    expect(spy).toHaveReceivedEventDetail({ open: true });
  });

  it('does not emit when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-accordion>
        <aegov-accordion-item heading="A" is-disabled="true">Body</aegov-accordion-item>
      </aegov-accordion>
    `);
    const item = await page.find('aegov-accordion-item');
    const spy = await item.spyOnEvent('aegovAccordionItemToggle');
    const btn = await page.find('aegov-accordion-item button.accordion-item__header');
    await btn.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(0);
  });

  it('keyboard Enter toggles state', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-accordion>
        <aegov-accordion-item heading="A">Body</aegov-accordion-item>
      </aegov-accordion>
    `);
    const btn = await page.find('aegov-accordion-item button.accordion-item__header');
    await btn.focus();
    await page.keyboard.press('Enter');
    await page.waitForChanges();
    expect(btn.getAttribute('aria-expanded')).toBe('true');
  });

  it('renders heading slot content when provided', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-accordion>
        <aegov-accordion-item>
          <span slot="accordion-item-heading">Slotted heading</span>
          Content
        </aegov-accordion-item>
      </aegov-accordion>
    `);
    const heading = await page.find('aegov-accordion-item .accordion-item__heading');
    expect(heading.textContent).toContain('Slotted heading');
  });
});
