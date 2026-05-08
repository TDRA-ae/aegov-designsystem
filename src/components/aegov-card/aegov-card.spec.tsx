import { newSpecPage } from '@stencil/core/testing';
import { AegovCard } from './aegov-card';

describe('aegov-card', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card>Body</aegov-card>`,
    });
    const div = page.root.querySelector('div');
    expect(div).not.toBeNull();
    expect(div.className).toContain('aegov-card');
    expect(div.className).toContain('card-border-2');
    expect(div.className).toContain('card-appearance-solid');
    expect(div.className).toContain('card-variant-primary');
    expect(div.className).toContain('card__hover-off');
    expect(div.className).toContain('card-size-base');
    expect(div.className).toContain('card--padded');
  });

  it('auto-generates fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card></aegov-card>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-card-\d+$/);
  });

  it('respects user-provided fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card field-id="card-1"></aegov-card>`,
    });
    expect(page.root.querySelector('div').id).toBe('card-1');
  });

  it('removes padded class when is-padding="false"', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card is-padding="false"></aegov-card>`,
    });
    expect(page.root.querySelector('div').className).not.toContain('card--padded');
  });

  it('applies borderWidth class', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card border-width="3"></aegov-card>`,
    });
    expect(page.root.querySelector('div').className).toContain('card-border-3');
  });

  it('applies appearance class', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card appearance="creative"></aegov-card>`,
    });
    expect(page.root.querySelector('div').className).toContain('card-appearance-creative');
  });

  it('applies variant class for all 4 variants', async () => {
    for (const v of ['primary', 'secondary', 'neutral-max', 'neutral-min']) {
      const page = await newSpecPage({
        components: [AegovCard],
        html: `<aegov-card variant="${v}"></aegov-card>`,
      });
      expect(page.root.querySelector('div').className).toContain(`card-variant-${v}`);
    }
  });

  it('applies combined variant + appearance classes', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card variant="secondary" appearance="creative"></aegov-card>`,
    });
    const cls = page.root.querySelector('div').className;
    expect(cls).toContain('card-variant-secondary');
    expect(cls).toContain('card-appearance-creative');
  });

  it('respects consumer-supplied background utility class on host', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card class="bg-aegreen-400"></aegov-card>`,
    });
    expect(page.root.className).toContain('bg-aegreen-400');
  });

  it('applies hover class', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card hover="glow"></aegov-card>`,
    });
    expect(page.root.querySelector('div').className).toContain('card__hover-glow');
  });

  it('applies size class', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card size="lg"></aegov-card>`,
    });
    expect(page.root.querySelector('div').className).toContain('card-size-lg');
  });

  it('renders default slot content', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card>Card body content</aegov-card>`,
    });
    expect(page.root.textContent).toContain('Card body content');
  });

  it('falls back to defaults for invalid enum props', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card appearance="bogus" variant="bogus" hover="??" size="xxl"></aegov-card>`,
    });
    const cls = page.root.querySelector('div').className;
    expect(cls).toContain('card-appearance-solid');
    expect(cls).toContain('card-variant-primary');
    expect(cls).toContain('card__hover-off');
    expect(cls).toContain('card-size-base');
  });

  it('forwards aria-* and data-* attributes', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card aria-label="card" data-id="x"></aegov-card>`,
    });
    const div = page.root.querySelector('div');
    expect(div.getAttribute('aria-label')).toBe('card');
    expect(div.getAttribute('data-id')).toBe('x');
  });
});
