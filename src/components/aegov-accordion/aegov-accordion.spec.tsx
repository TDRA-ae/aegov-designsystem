import { newSpecPage } from '@stencil/core/testing';
import { AegovAccordion } from './aegov-accordion';
import { AegovAccordionItem } from '../aegov-accordion-item/aegov-accordion-item';

describe('aegov-accordion', () => {
  it('renders default container with aegov-accordion class', async () => {
    const page = await newSpecPage({
      components: [AegovAccordion],
      html: `<aegov-accordion></aegov-accordion>`,
    });
    const wrapper = page.root.querySelector('div.aegov-accordion');
    expect(wrapper).not.toBeNull();
    expect(wrapper.className).not.toContain('aegov-accordion__bordered');
  });

  it('auto-generates fieldId when not provided', async () => {
    const page = await newSpecPage({
      components: [AegovAccordion],
      html: `<aegov-accordion></aegov-accordion>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-accordion-\d+$/);
    const wrapper = page.root.querySelector('div.aegov-accordion');
    expect(wrapper.id).toBe(page.rootInstance.fieldId);
  });

  it('respects user-provided fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovAccordion],
      html: `<aegov-accordion field-id="acc-1"></aegov-accordion>`,
    });
    expect(page.rootInstance.fieldId).toBe('acc-1');
    expect(page.root.querySelector('div.aegov-accordion').id).toBe('acc-1');
  });

  it('applies bordered modifier when is-bordered', async () => {
    const page = await newSpecPage({
      components: [AegovAccordion],
      html: `<aegov-accordion is-bordered="true"></aegov-accordion>`,
    });
    expect(page.root.querySelector('div.aegov-accordion').className).toContain('aegov-accordion__bordered');
  });

  it('syncs icon and size props onto child accordion-items', async () => {
    const page = await newSpecPage({
      components: [AegovAccordion, AegovAccordionItem],
      html: `
        <aegov-accordion icon="plus" size="lg">
          <aegov-accordion-item heading="A">Body A</aegov-accordion-item>
          <aegov-accordion-item heading="B">Body B</aegov-accordion-item>
        </aegov-accordion>
      `,
    });
    await page.waitForChanges();
    const items = page.root.querySelectorAll('aegov-accordion-item');
    expect((items[0] as any).icon).toBe('plus');
    expect((items[0] as any).size).toBe('lg');
    expect((items[1] as any).icon).toBe('plus');
  });

  it('marks first and last child accordion-items', async () => {
    const page = await newSpecPage({
      components: [AegovAccordion, AegovAccordionItem],
      html: `
        <aegov-accordion>
          <aegov-accordion-item heading="A">A</aegov-accordion-item>
          <aegov-accordion-item heading="B">B</aegov-accordion-item>
          <aegov-accordion-item heading="C">C</aegov-accordion-item>
        </aegov-accordion>
      `,
    });
    await page.waitForChanges();
    const items = page.root.querySelectorAll('aegov-accordion-item');
    expect((items[0] as any).isFirst).toBe(true);
    expect((items[0] as any).isLast).toBe(false);
    expect((items[2] as any).isFirst).toBe(false);
    expect((items[2] as any).isLast).toBe(true);
  });

  it('opens default-open index after load', async () => {
    const page = await newSpecPage({
      components: [AegovAccordion, AegovAccordionItem],
      html: `
        <aegov-accordion default-open="1">
          <aegov-accordion-item heading="A">A</aegov-accordion-item>
          <aegov-accordion-item heading="B">B</aegov-accordion-item>
        </aegov-accordion>
      `,
    });
    await page.waitForChanges();
    const items = page.root.querySelectorAll('aegov-accordion-item');
    expect((items[0] as any).isOpen).toBe(false);
    expect((items[1] as any).isOpen).toBe(true);
  });

  it('only one item open at a time when is-multiple is false', async () => {
    const page = await newSpecPage({
      components: [AegovAccordion, AegovAccordionItem],
      html: `
        <aegov-accordion>
          <aegov-accordion-item heading="A">A</aegov-accordion-item>
          <aegov-accordion-item heading="B">B</aegov-accordion-item>
        </aegov-accordion>
      `,
    });
    await page.waitForChanges();
    const items = page.root.querySelectorAll('aegov-accordion-item');
    // Open first
    items[0].dispatchEvent(new CustomEvent('aegovAccordionItemToggle', { detail: { open: true }, bubbles: true }));
    await page.waitForChanges();
    expect((items[0] as any).isOpen).toBe(true);
    // Open second — first should close
    items[1].dispatchEvent(new CustomEvent('aegovAccordionItemToggle', { detail: { open: true }, bubbles: true }));
    await page.waitForChanges();
    expect((items[0] as any).isOpen).toBe(false);
    expect((items[1] as any).isOpen).toBe(true);
  });

  it('allows multiple open items when is-multiple', async () => {
    const page = await newSpecPage({
      components: [AegovAccordion, AegovAccordionItem],
      html: `
        <aegov-accordion is-multiple="true">
          <aegov-accordion-item heading="A">A</aegov-accordion-item>
          <aegov-accordion-item heading="B">B</aegov-accordion-item>
        </aegov-accordion>
      `,
    });
    await page.waitForChanges();
    const items = page.root.querySelectorAll('aegov-accordion-item');
    items[0].dispatchEvent(new CustomEvent('aegovAccordionItemToggle', { detail: { open: true }, bubbles: true }));
    items[1].dispatchEvent(new CustomEvent('aegovAccordionItemToggle', { detail: { open: true }, bubbles: true }));
    await page.waitForChanges();
    expect((items[0] as any).isOpen).toBe(true);
    expect((items[1] as any).isOpen).toBe(true);
  });

  it('updates child icons via @Watch when icon prop changes', async () => {
    const page = await newSpecPage({
      components: [AegovAccordion, AegovAccordionItem],
      html: `
        <aegov-accordion icon="chevron">
          <aegov-accordion-item heading="A">A</aegov-accordion-item>
        </aegov-accordion>
      `,
    });
    await page.waitForChanges();
    page.rootInstance.icon = 'plus';
    await page.waitForChanges();
    const item = page.root.querySelector('aegov-accordion-item');
    expect((item as any).icon).toBe('plus');
  });
});
