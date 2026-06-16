import { newE2EPage } from '@stencil/core/testing';

describe('aegov-accordion-item (e2e)', () => {
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
