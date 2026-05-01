import { newSpecPage } from '@stencil/core/testing';
import { AegovAccordion } from '../aegov-accordion/aegov-accordion';
import { AegovAccordionItem } from './aegov-accordion-item';

describe('aegov-accordion-item', () => {
  it('renders a header button and content region', async () => {
    const page = await newSpecPage({
      components: [AegovAccordion, AegovAccordionItem],
      html: `
        <aegov-accordion>
          <aegov-accordion-item heading="Title">Body content</aegov-accordion-item>
        </aegov-accordion>
      `,
    });
    const item = page.root.querySelector('aegov-accordion-item');
    const btn = item.querySelector('button.accordion-item__header');
    expect(btn).not.toBeNull();
    expect(btn.getAttribute('type')).toBe('button');
    expect(btn.getAttribute('aria-expanded')).toBe('false');
    const region = item.querySelector('[role="region"]');
    expect(region).not.toBeNull();
    expect(region.getAttribute('aria-labelledby')).toMatch(/-trigger$/);
  });

  it('throws when used standalone outside aegov-accordion', async () => {
    await expect(
      newSpecPage({
        components: [AegovAccordionItem],
        html: `<aegov-accordion-item heading="X">Standalone</aegov-accordion-item>`,
      })
    ).rejects.toThrow(/must be used inside <aegov-accordion>/);
  });

  it('renders the heading prop when no heading slot provided', async () => {
    const page = await newSpecPage({
      components: [AegovAccordion, AegovAccordionItem],
      html: `
        <aegov-accordion>
          <aegov-accordion-item heading="Section heading">Body</aegov-accordion-item>
        </aegov-accordion>
      `,
    });
    const heading = page.root.querySelector('.accordion-item__heading');
    expect(heading.textContent).toContain('Section heading');
  });

  it('uses the heading slot when present', async () => {
    const page = await newSpecPage({
      components: [AegovAccordion, AegovAccordionItem],
      html: `
        <aegov-accordion>
          <aegov-accordion-item heading="fallback">
            <span slot="accordion-item-heading">Custom heading</span>
            Body
          </aegov-accordion-item>
        </aegov-accordion>
      `,
    });
    const slotted = page.root.querySelector('span[slot="accordion-item-heading"]');
    expect(slotted).not.toBeNull();
    expect(slotted.textContent).toBe('Custom heading');
  });

  it('renders chevron icon by default', async () => {
    const page = await newSpecPage({
      components: [AegovAccordion, AegovAccordionItem],
      html: `
        <aegov-accordion>
          <aegov-accordion-item heading="A">Body</aegov-accordion-item>
        </aegov-accordion>
      `,
    });
    expect(page.root.querySelector('.accordion-item__icon-chevron')).not.toBeNull();
    expect(page.root.querySelector('.accordion-item__icon-plus')).toBeNull();
  });

  it('renders plus icon when icon=plus', async () => {
    const page = await newSpecPage({
      components: [AegovAccordion, AegovAccordionItem],
      html: `
        <aegov-accordion icon="plus">
          <aegov-accordion-item heading="A">Body</aegov-accordion-item>
        </aegov-accordion>
      `,
    });
    await page.waitForChanges();
    expect(page.root.querySelector('.accordion-item__icon-plus')).not.toBeNull();
  });

  it('emits aegovAccordionItemToggle on click', async () => {
    const page = await newSpecPage({
      components: [AegovAccordion, AegovAccordionItem],
      html: `
        <aegov-accordion>
          <aegov-accordion-item heading="A">Body</aegov-accordion-item>
        </aegov-accordion>
      `,
    });
    const item = page.root.querySelector('aegov-accordion-item');
    const spy = jest.fn();
    item.addEventListener('aegovAccordionItemToggle', spy);
    const btn = item.querySelector('button.accordion-item__header') as HTMLButtonElement;
    btn.click();
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toEqual({ open: true });
  });

  it('does not emit toggle when disabled', async () => {
    const page = await newSpecPage({
      components: [AegovAccordion, AegovAccordionItem],
      html: `
        <aegov-accordion>
          <aegov-accordion-item heading="A" is-disabled="true">Body</aegov-accordion-item>
        </aegov-accordion>
      `,
    });
    const item = page.root.querySelector('aegov-accordion-item');
    const spy = jest.fn();
    item.addEventListener('aegovAccordionItemToggle', spy);
    const btn = item.querySelector('button.accordion-item__header') as HTMLButtonElement;
    btn.click();
    await page.waitForChanges();
    expect(spy).not.toHaveBeenCalled();
  });

  it('reflects open state via class and aria-expanded', async () => {
    const page = await newSpecPage({
      components: [AegovAccordion, AegovAccordionItem],
      html: `
        <aegov-accordion default-open="0">
          <aegov-accordion-item heading="A">Body</aegov-accordion-item>
        </aegov-accordion>
      `,
    });
    await page.waitForChanges();
    const item = page.root.querySelector('aegov-accordion-item');
    const btn = item.querySelector('button.accordion-item__header');
    expect(btn.getAttribute('aria-expanded')).toBe('true');
    expect(item.querySelector('.aegov-accordion-item').className).toContain('accordion-item--open');
  });

  it('applies size class', async () => {
    const page = await newSpecPage({
      components: [AegovAccordion, AegovAccordionItem],
      html: `
        <aegov-accordion size="lg">
          <aegov-accordion-item heading="A">Body</aegov-accordion-item>
        </aegov-accordion>
      `,
    });
    await page.waitForChanges();
    const inner = page.root.querySelector('.aegov-accordion-item');
    expect(inner.className).toContain('accordion-item--lg');
  });
});
