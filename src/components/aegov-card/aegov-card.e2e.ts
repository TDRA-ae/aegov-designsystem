import { newE2EPage } from '@stencil/core/testing';

describe('aegov-card (e2e)', () => {
  it('renders with default classes', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-card>Body</aegov-card>');
    const div = await page.find('aegov-card div');
    expect(div).not.toBeNull();
    expect(div).toHaveClass('aegov-card');
    expect(div).toHaveClass('card-border-2');
    expect(div).toHaveClass('card-bg-white');
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

  it('applies borderStyle, bg, hover and size variants', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-card border-style="creative" bg="subtle" hover="glow" size="lg" border-width="3"></aegov-card>');
    const div = await page.find('aegov-card div');
    expect(div).toHaveClass('card-border-creative');
    expect(div).toHaveClass('card-bg-subtle');
    expect(div).toHaveClass('card__hover-glow');
    expect(div).toHaveClass('card-size-lg');
    expect(div).toHaveClass('card-border-3');
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
