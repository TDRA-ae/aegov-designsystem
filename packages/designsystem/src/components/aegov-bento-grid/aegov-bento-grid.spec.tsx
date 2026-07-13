import { newSpecPage } from '@stencil/core/testing';
import { AegovBentoGrid } from './aegov-bento-grid';
import { AegovCard } from '../aegov-card/aegov-card';

describe('aegov-bento-grid', () => {
  it('renders wrapper with default classes and role', async () => {
    const page = await newSpecPage({
      components: [AegovBentoGrid],
      html: `<aegov-bento-grid></aegov-bento-grid>`,
    });
    const wrap = page.root.querySelector('div');
    expect(wrap).not.toBeNull();
    expect(wrap.className).toBe('aegov-bento-grid');
    expect(wrap.getAttribute('role')).toBe('group');
  });

  it('auto-generates fieldId when not provided', async () => {
    const page = await newSpecPage({
      components: [AegovBentoGrid],
      html: `<aegov-bento-grid></aegov-bento-grid>`,
    });
    const wrap = page.root.querySelector('div');
    expect(wrap.id).toMatch(/^aegov-bento-grid-/);
  });

  it('honors author-supplied fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovBentoGrid],
      html: `<aegov-bento-grid field-id="my-grid"></aegov-bento-grid>`,
    });
    expect(page.root.querySelector('div').id).toBe('my-grid');
  });

  it('sets --bento-cols custom property from numeric cols', async () => {
    const page = await newSpecPage({
      components: [AegovBentoGrid],
      html: `<aegov-bento-grid cols="4"></aegov-bento-grid>`,
    });
    const wrap = page.root.querySelector('div') as HTMLElement;
    expect(wrap.style.getPropertyValue('--bento-cols')).toBe('4');
  });

  it('clamps cols to max 12', async () => {
    const page = await newSpecPage({
      components: [AegovBentoGrid],
      html: `<aegov-bento-grid cols="99"></aegov-bento-grid>`,
    });
    const wrap = page.root.querySelector('div') as HTMLElement;
    expect(wrap.style.getPropertyValue('--bento-cols')).toBe('12');
  });

  it('falls back to 1 column for invalid cols values', async () => {
    const page = await newSpecPage({
      components: [AegovBentoGrid],
      html: `<aegov-bento-grid cols="garbage"></aegov-bento-grid>`,
    });
    const wrap = page.root.querySelector('div') as HTMLElement;
    expect(wrap.style.getPropertyValue('--bento-cols')).toBe('1');
  });

  it('maps named gap sizes to rem values', async () => {
    const page = await newSpecPage({
      components: [AegovBentoGrid],
      html: `<aegov-bento-grid gap="lg"></aegov-bento-grid>`,
    });
    const wrap = page.root.querySelector('div') as HTMLElement;
    expect(wrap.style.getPropertyValue('--bento-gap')).toBe('1.5rem');
  });

  it('falls back to md gap for invalid gap values', async () => {
    const page = await newSpecPage({
      components: [AegovBentoGrid],
      html: `<aegov-bento-grid gap="bogus"></aegov-bento-grid>`,
    });
    const wrap = page.root.querySelector('div') as HTMLElement;
    expect(wrap.style.getPropertyValue('--bento-gap')).toBe('1rem');
  });

  it('sets --bento-flow from flow prop (dense default)', async () => {
    const page = await newSpecPage({
      components: [AegovBentoGrid],
      html: `<aegov-bento-grid></aegov-bento-grid>`,
    });
    expect(
      (page.root.querySelector('div') as HTMLElement).style.getPropertyValue('--bento-flow'),
    ).toBe('dense');
  });

  it('respects flow="row"', async () => {
    const page = await newSpecPage({
      components: [AegovBentoGrid],
      html: `<aegov-bento-grid flow="row"></aegov-bento-grid>`,
    });
    expect(
      (page.root.querySelector('div') as HTMLElement).style.getPropertyValue('--bento-flow'),
    ).toBe('row');
  });

  it('passes through aria-label on inner div', async () => {
    const page = await newSpecPage({
      components: [AegovBentoGrid],
      html: `<aegov-bento-grid aria-label="Feature grid"></aegov-bento-grid>`,
    });
    expect(page.root.querySelector('div').getAttribute('aria-label')).toBe('Feature grid');
  });

  it('applies col-span inline style on direct children', async () => {
    const page = await newSpecPage({
      components: [AegovBentoGrid, AegovCard],
      html: `
        <aegov-bento-grid cols="4">
          <aegov-card data-col-span="2">A</aegov-card>
          <aegov-card>B</aegov-card>
        </aegov-bento-grid>
      `,
    });
    await page.waitForChanges();
    const cards = page.root.querySelectorAll('aegov-card');
    expect((cards[0] as HTMLElement).style.gridColumn).toBe('span 2 / span 2');
    expect((cards[1] as HTMLElement).style.gridColumn).toBe('');
  });

  it('applies row-span inline style on direct children', async () => {
    const page = await newSpecPage({
      components: [AegovBentoGrid, AegovCard],
      html: `
        <aegov-bento-grid cols="3">
          <aegov-card data-row-span="2">A</aegov-card>
        </aegov-bento-grid>
      `,
    });
    await page.waitForChanges();
    const card = page.root.querySelector('aegov-card') as HTMLElement;
    expect(card.style.gridRow).toBe('span 2 / span 2');
  });

  it('clamps col-span to current cols (cols=2 caps spans at 2)', async () => {
    const page = await newSpecPage({
      components: [AegovBentoGrid, AegovCard],
      html: `
        <aegov-bento-grid cols="2">
          <aegov-card data-col-span="4">A</aegov-card>
        </aegov-bento-grid>
      `,
    });
    await page.waitForChanges();
    const card = page.root.querySelector('aegov-card') as HTMLElement;
    expect(card.style.gridColumn).toBe('span 2 / span 2');
  });

  it('neutralizes col-span when single column (cols=1)', async () => {
    const page = await newSpecPage({
      components: [AegovBentoGrid, AegovCard],
      html: `
        <aegov-bento-grid cols="1">
          <aegov-card data-col-span="3">A</aegov-card>
          <aegov-card data-col-span="2">B</aegov-card>
        </aegov-bento-grid>
      `,
    });
    await page.waitForChanges();
    const cards = page.root.querySelectorAll('aegov-card');
    cards.forEach(c => {
      expect((c as HTMLElement).style.gridColumn).toBe('');
    });
  });

  it('clamps row-span to max 6', async () => {
    const page = await newSpecPage({
      components: [AegovBentoGrid, AegovCard],
      html: `
        <aegov-bento-grid cols="3">
          <aegov-card data-row-span="99">A</aegov-card>
        </aegov-bento-grid>
      `,
    });
    await page.waitForChanges();
    const card = page.root.querySelector('aegov-card') as HTMLElement;
    expect(card.style.gridRow).toBe('span 6 / span 6');
  });

  it('skips invalid (non-positive-int) data-col-span values', async () => {
    const page = await newSpecPage({
      components: [AegovBentoGrid, AegovCard],
      html: `
        <aegov-bento-grid cols="4">
          <aegov-card data-col-span="abc">A</aegov-card>
        </aegov-bento-grid>
      `,
    });
    await page.waitForChanges();
    const card = page.root.querySelector('aegov-card') as HTMLElement;
    expect(card.style.gridColumn).toBe('');
  });

  it('reapplies spans on cols re-render', async () => {
    const page = await newSpecPage({
      components: [AegovBentoGrid, AegovCard],
      html: `
        <aegov-bento-grid cols="2">
          <aegov-card data-col-span="3">A</aegov-card>
        </aegov-bento-grid>
      `,
    });
    await page.waitForChanges();
    const card = page.root.querySelector('aegov-card') as HTMLElement;
    // Initially clamped to cols=2
    expect(card.style.gridColumn).toBe('span 2 / span 2');

    // Updating cols to a larger value re-runs applyChildSpans via componentDidUpdate
    (page.root as HTMLAegovBentoGridElement).cols = '4';
    await page.waitForChanges();
    expect(card.style.gridColumn).toBe('span 3 / span 3');
  });

  it('only spans direct children, ignores nested cards', async () => {
    const page = await newSpecPage({
      components: [AegovBentoGrid, AegovCard],
      html: `
        <aegov-bento-grid cols="3">
          <aegov-card data-col-span="2">
            <aegov-card data-col-span="3">nested</aegov-card>
          </aegov-card>
        </aegov-bento-grid>
      `,
    });
    await page.waitForChanges();
    const cards = page.root.querySelectorAll('aegov-card');
    // Outer card (direct child) spans 2
    expect((cards[0] as HTMLElement).style.gridColumn).toBe('span 2 / span 2');
    // Inner card was NOT processed by parent's applyChildSpans — its inline
    // style remains unset
    expect((cards[1] as HTMLElement).style.gridColumn).toBe('');
  });
});
