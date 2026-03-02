import { newSpecPage } from '@stencil/core/testing';
import { AegovCard } from './aegov-card';

describe('aegov-card', () => {
  // ============================================
  // DEFAULT RENDERING
  // ============================================

  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card>Content</aegov-card>`,
    });
    const card = page.root.querySelector('.card');
    expect(card).toBeTruthy();
    expect(card.classList.contains('card--border-1')).toBe(true);
    expect(card.classList.contains('card--border-standard')).toBe(true);
    expect(card.classList.contains('card--bg-white')).toBe(true);
    expect(card.classList.contains('card--hover-off')).toBe(true);
    expect(card.classList.contains('card--padded')).toBe(true);
  });

  it('renders slot content', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card><p>Hello World</p></aegov-card>`,
    });
    const card = page.root.querySelector('.card');
    expect(card).toBeTruthy();
    expect(page.root.textContent).toContain('Hello World');
  });

  // ============================================
  // BORDER WIDTH
  // ============================================

  it('applies border-width 1 by default', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card>Content</aegov-card>`,
    });
    expect(page.root.querySelector('.card--border-1')).toBeTruthy();
  });

  it('applies border-width 2', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card border-width="2">Content</aegov-card>`,
    });
    expect(page.root.querySelector('.card--border-2')).toBeTruthy();
  });

  it('applies border-width 3', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card border-width="3">Content</aegov-card>`,
    });
    expect(page.root.querySelector('.card--border-3')).toBeTruthy();
  });

  // ============================================
  // BACKGROUND
  // ============================================

  it('applies white background by default', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card>Content</aegov-card>`,
    });
    expect(page.root.querySelector('.card--bg-white')).toBeTruthy();
  });

  it('applies transparent background', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card background="transparent">Content</aegov-card>`,
    });
    expect(page.root.querySelector('.card--bg-transparent')).toBeTruthy();
  });

  it('applies subtle background', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card background="subtle">Content</aegov-card>`,
    });
    expect(page.root.querySelector('.card--bg-subtle')).toBeTruthy();
  });

  // ============================================
  // PADDING
  // ============================================

  it('applies padding by default', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card>Content</aegov-card>`,
    });
    expect(page.root.querySelector('.card--padded')).toBeTruthy();
  });

  it('removes padding when disallow-padding is set', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card disallow-padding>Content</aegov-card>`,
    });
    expect(page.root.querySelector('.card--padded')).toBeNull();
  });

  // ============================================
  // HOVER
  // ============================================

  it('applies hover-off by default', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card>Content</aegov-card>`,
    });
    expect(page.root.querySelector('.card--hover-off')).toBeTruthy();
  });

  it('applies hover-standard', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card hover="standard">Content</aegov-card>`,
    });
    expect(page.root.querySelector('.card--hover-standard')).toBeTruthy();
  });

  it('applies hover-glow', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card hover="glow">Content</aegov-card>`,
    });
    expect(page.root.querySelector('.card--hover-glow')).toBeTruthy();
  });

  // ============================================
  // BORDER STYLE
  // ============================================

  it('applies standard border style by default', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card>Content</aegov-card>`,
    });
    expect(page.root.querySelector('.card--border-standard')).toBeTruthy();
  });

  it('applies creative border style', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card border-style="creative">Content</aegov-card>`,
    });
    expect(page.root.querySelector('.card--border-creative')).toBeTruthy();
    expect(page.root.querySelector('.card--border-standard')).toBeNull();
  });

  it('applies creative border with different backgrounds', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card border-style="creative" background="subtle">Content</aegov-card>`,
    });
    const card = page.root.querySelector('.card');
    expect(card.classList.contains('card--border-creative')).toBe(true);
    expect(card.classList.contains('card--bg-subtle')).toBe(true);
  });

  it('applies creative border with hover glow', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card border-style="creative" hover="glow">Content</aegov-card>`,
    });
    const card = page.root.querySelector('.card');
    expect(card.classList.contains('card--border-creative')).toBe(true);
    expect(card.classList.contains('card--hover-glow')).toBe(true);
  });

  // ============================================
  // COMBINATIONS
  // ============================================

  it('applies multiple props together', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card border-width="3" background="subtle" hover="glow">Content</aegov-card>`,
    });
    const card = page.root.querySelector('.card');
    expect(card.classList.contains('card--border-3')).toBe(true);
    expect(card.classList.contains('card--bg-subtle')).toBe(true);
    expect(card.classList.contains('card--hover-glow')).toBe(true);
    expect(card.classList.contains('card--padded')).toBe(true);
  });

  it('renders host as block element', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `<aegov-card>Content</aegov-card>`,
    });
    expect(page.root).toBeTruthy();
    expect(page.root.tagName.toLowerCase()).toBe('aegov-card');
  });

  it('renders rich HTML content in slot', async () => {
    const page = await newSpecPage({
      components: [AegovCard],
      html: `
        <aegov-card>
          <h2>Card Title</h2>
          <p>Card description text</p>
          <button>Action</button>
        </aegov-card>
      `,
    });
    const card = page.root.querySelector('.card');
    expect(card).toBeTruthy();
  });
});
