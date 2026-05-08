import { newE2EPage } from '@stencil/core/testing';

describe('aegov-card (e2e)', () => {
  it('renders with default classes', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-card>Body</aegov-card>');
    const div = await page.find('aegov-card div');
    expect(div).not.toBeNull();
    expect(div).toHaveClass('aegov-card');
    expect(div).toHaveClass('card-border-2');
    expect(div).toHaveClass('card-size-base');
    expect(div).toHaveClass('card--padded');
  });

  it('renders default slot content', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-card><p>Hello</p></aegov-card>');
    const el = await page.find('aegov-card');
    expect(el.textContent).toContain('Hello');
  });

  it('removes padded class when is-padding="false"', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-card is-padding="false"></aegov-card>');
    const div = await page.find('aegov-card div');
    expect(div).not.toHaveClass('card--padded');
  });

  it('applies appearance, variant, hover and size variants', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-card appearance="creative" variant="secondary" hover="glow" size="lg" border-width="3"></aegov-card>');
    const div = await page.find('aegov-card div');
    expect(div).toHaveClass('card-appearance-creative');
    expect(div).toHaveClass('card-variant-secondary');
    expect(div).toHaveClass('card__hover-glow');
    expect(div).toHaveClass('card-size-lg');
    expect(div).toHaveClass('card-border-3');
  });

  it('forwards consumer bg utility class on host', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-card class="bg-aegreen-400"></aegov-card>');
    const host = await page.find('aegov-card');
    expect(host).toHaveClass('bg-aegreen-400');
  });

  it('reflects fieldId on inner div id', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-card field-id="cardX"></aegov-card>');
    const div = await page.find('aegov-card div');
    expect(div.id).toBe('cardX');
  });

  it('forwards aria and data attributes', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-card aria-label="info" data-x="1"></aegov-card>');
    const div = await page.find('aegov-card div');
    expect(div.getAttribute('aria-label')).toBe('info');
    expect(div.getAttribute('data-x')).toBe('1');
  });
});
