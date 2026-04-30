import { newE2EPage } from '@stencil/core/testing';

describe('aegov-card e2e', () => {
  // ============================================
  // BASIC RENDERING
  // ============================================

  it('renders with slot content', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-card><p>Hello</p></aegov-card>`);
    const card = await page.find('aegov-card .aegov-card');
    expect(card).toBeTruthy();
    const text = await page.find('aegov-card p');
    expect(text).toBeTruthy();
    expect(await text.getProperty('textContent')).toBe('Hello');
  });

  // ============================================
  // BORDER WIDTHS
  // ============================================

  it('renders default border-width 2', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-card>Content</aegov-card>`);
    const card = await page.find('aegov-card .card-border-2');
    expect(card).toBeTruthy();
  });

  it('renders border-width 1', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-card border-width="1">Content</aegov-card>`);
    const card = await page.find('aegov-card .card-border-1');
    expect(card).toBeTruthy();
  });

  it('renders border-width 3', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-card border-width="3">Content</aegov-card>`);
    const card = await page.find('aegov-card .card-border-3');
    expect(card).toBeTruthy();
  });

  // ============================================
  // BACKGROUNDS
  // ============================================

  it('renders white background by default', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-card>Content</aegov-card>`);
    const card = await page.find('aegov-card .card-bg-white');
    expect(card).toBeTruthy();
  });

  it('renders subtle background', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-card background="subtle">Content</aegov-card>`);
    const card = await page.find('aegov-card .card-bg-subtle');
    expect(card).toBeTruthy();
  });

  // ============================================
  // PADDING
  // ============================================

  it('applies padding by default', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-card>Content</aegov-card>`);
    const card = await page.find('aegov-card .card--padded');
    expect(card).toBeTruthy();
  });

  it('removes padding when disallow-padding is set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-card disallow-padding>Content</aegov-card>`);
    const card = await page.find('aegov-card .card--padded');
    expect(card).toBeNull();
  });

  // ============================================
  // HOVER EFFECTS
  // ============================================

  it('renders hover-off by default', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-card>Content</aegov-card>`);
    const card = await page.find('aegov-card .card--hover-off');
    expect(card).toBeTruthy();
  });

  it('renders hover-standard class', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-card hover="standard">Content</aegov-card>`);
    const card = await page.find('aegov-card .card--hover-standard');
    expect(card).toBeTruthy();
  });

  it('renders hover-glow class', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-card hover="glow">Content</aegov-card>`);
    const card = await page.find('aegov-card .card--hover-glow');
    expect(card).toBeTruthy();
  });

  it('changes border color on hover with standard effect', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-card hover="standard">Content</aegov-card>`);
    const card = await page.find('aegov-card .aegov-card');
    const beforeStyles = await card.getComputedStyle();
    const borderBefore = beforeStyles['borderColor'];

    await card.hover();
    await page.waitForChanges();

    const afterStyles = await card.getComputedStyle();
    const borderAfter = afterStyles['borderColor'];

    // Border color should change on hover
    expect(borderBefore).not.toEqual(borderAfter);
  });

  it('adds box-shadow on hover with glow effect', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-card hover="glow">Content</aegov-card>`);
    const card = await page.find('aegov-card .aegov-card');

    await card.hover();
    await page.waitForChanges();

    const styles = await card.getComputedStyle();
    expect(styles['boxShadow']).not.toBe('none');
  });

  // ============================================
  // BORDER STYLE
  // ============================================

  it('renders standard border by default', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-card>Content</aegov-card>`);
    const card = await page.find('aegov-card .card-border-standard');
    expect(card).toBeTruthy();
  });

  it('renders creative gradient border', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-card border-style="creative">Content</aegov-card>`);
    const card = await page.find('aegov-card .card-border-creative');
    expect(card).toBeTruthy();
    const standard = await page.find('aegov-card .card-border-standard');
    expect(standard).toBeNull();
  });

  it('creative border has transparent border-color', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-card border-style="creative" border-width="2">Content</aegov-card>`);
    const card = await page.find('aegov-card .aegov-card');
    const styles = await card.getComputedStyle();
    // transparent border is rgba(0,0,0,0)
    expect(styles['borderColor']).toContain('0');
  });

  it('creative border with glow hover shows box-shadow', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-card border-style="creative" hover="glow">Content</aegov-card>`);
    const card = await page.find('aegov-card .aegov-card');
    await card.hover();
    await page.waitForChanges();
    const styles = await card.getComputedStyle();
    expect(styles['boxShadow']).not.toBe('none');
  });

  // ============================================
  // SIZE
  // ============================================

  it('renders size-base by default', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-card>Content</aegov-card>`);
    const card = await page.find('aegov-card .card--size-base');
    expect(card).toBeTruthy();
  });

  it('renders size-sm class', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-card size="sm">Content</aegov-card>`);
    const card = await page.find('aegov-card .card--size-sm');
    expect(card).toBeTruthy();
  });

  it('renders size-lg class', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-card size="lg">Content</aegov-card>`);
    const card = await page.find('aegov-card .card--size-lg');
    expect(card).toBeTruthy();
  });

  it('size-sm applies smaller padding (16px) and smaller border-radius (8px)', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1024, height: 768 });
    await page.setContent(`<aegov-card size="sm">Content</aegov-card>`);
    const card = await page.find('aegov-card .aegov-card');
    const styles = await card.getComputedStyle();
    expect(styles['padding']).toBe('16px');
    expect(styles['borderRadius']).toBe('8px');
  });

  it('size-base applies default padding (24px) and default border-radius (12px)', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1024, height: 768 });
    await page.setContent(`<aegov-card>Content</aegov-card>`);
    const card = await page.find('aegov-card .aegov-card');
    const styles = await card.getComputedStyle();
    expect(styles['padding']).toBe('24px');
    expect(styles['borderRadius']).toBe('12px');
  });

  it('size-lg applies larger padding (32px) and larger border-radius (16px)', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1024, height: 768 });
    await page.setContent(`<aegov-card size="lg">Content</aegov-card>`);
    const card = await page.find('aegov-card .aegov-card');
    const styles = await card.getComputedStyle();
    expect(styles['padding']).toBe('32px');
    expect(styles['borderRadius']).toBe('16px');
  });

  it('size affects radius even when padding is disallowed', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1024, height: 768 });
    await page.setContent(`<aegov-card size="lg" disallow-padding>Content</aegov-card>`);
    const card = await page.find('aegov-card .aegov-card');
    const styles = await card.getComputedStyle();
    expect(styles['padding']).toBe('0px');
    expect(styles['borderRadius']).toBe('16px');
  });

  it('size-base radius shrinks at md breakpoint (≤768px)', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 700, height: 800 });
    await page.setContent(`<aegov-card>Content</aegov-card>`);
    const card = await page.find('aegov-card .aegov-card');
    const styles = await card.getComputedStyle();
    expect(styles['borderRadius']).toBe('8px');
  });

  it('size-base radius shrinks further at xs breakpoint (≤480px)', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 400, height: 800 });
    await page.setContent(`<aegov-card>Content</aegov-card>`);
    const card = await page.find('aegov-card .aegov-card');
    const styles = await card.getComputedStyle();
    expect(styles['borderRadius']).toBe('6px');
  });

  it('size-sm radius shrinks at md breakpoint (≤768px)', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 700, height: 800 });
    await page.setContent(`<aegov-card size="sm">Content</aegov-card>`);
    const card = await page.find('aegov-card .aegov-card');
    const styles = await card.getComputedStyle();
    expect(styles['borderRadius']).toBe('6px');
  });

  it('size-lg radius shrinks at md breakpoint (≤768px)', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 700, height: 800 });
    await page.setContent(`<aegov-card size="lg">Content</aegov-card>`);
    const card = await page.find('aegov-card .aegov-card');
    const styles = await card.getComputedStyle();
    expect(styles['borderRadius']).toBe('12px');
  });

  // ============================================
  // COMBINATIONS
  // ============================================

  it('renders with all props combined', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-card border-width="3" background="subtle" hover="glow" size="lg">
        <h2>Full Card</h2>
        <p>With all props set</p>
      </aegov-card>
    `);
    const card = await page.find('aegov-card .aegov-card');
    expect(card).toBeTruthy();
    expect(card.classList.contains('card-border-3')).toBe(true);
    expect(card.classList.contains('card-bg-subtle')).toBe(true);
    expect(card.classList.contains('card--hover-glow')).toBe(true);
    expect(card.classList.contains('card--size-lg')).toBe(true);
    expect(card.classList.contains('card--padded')).toBe(true);
  });

  it('renders multiple cards independently', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-card hover="standard">Card 1</aegov-card>
      <aegov-card hover="glow" background="subtle">Card 2</aegov-card>
    `);
    const cards = await page.findAll('aegov-card .aegov-card');
    expect(cards.length).toBe(2);
    expect(cards[0].classList.contains('card--hover-standard')).toBe(true);
    expect(cards[1].classList.contains('card--hover-glow')).toBe(true);
    expect(cards[1].classList.contains('card-bg-subtle')).toBe(true);
  });
});
